#!/usr/bin/env node
/**
 * Entry tool for the Apps & Modules database.
 *
 * Lints the entries of docs/apps-and-modules/*.md and regenerates their URL
 * index in a single parse pass over the files.
 *
 * The lint pass checks each list entry against the format documented in
 * docs/contributing.md and the PR template. It never rewrites or reorders
 * entries, it only reports `file:line` for every problem it finds.
 *
 * The index exports every entry to docs/public/app-index.json, with the
 * category page, its section heading and every URL found on the entry line.
 * The file is committed so other tools can read it without building the site:
 *
 *   https://raw.githubusercontent.com/awesome-android-root/awesome-android-root/main/docs/public/app-index.json
 *
 * Entry fields (short keys keep the file small):
 *   n  entry name, without the recommended star
 *   u  primary link of the entry
 *   a  all links on the line (primary link first)
 *   t  badges and store icons (`FOSS`, `[LSP]`, ...)
 *   p  category page, without the .md extension
 *   s  section heading inside that page
 *
 * Exit code never reflects the lint result; run the script to regenerate the
 * index whenever an entry changes.
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const DIR = join(ROOT, 'docs', 'apps-and-modules')
const OUT_FILE = join(ROOT, 'docs', 'public', 'app-index.json')

// ---- Parsing (shared by the lint and the index builder) ---------------------

// Entry format used by every category page, see docs/contributing.md.
const ENTRY_RE = /^-\s+\*\*\[([^\]]+)\]\(([^)\s]+)\)\*\*\s*-?\s*(.*)$/u
const LINK_RE = /\]\(([^)\s]+)\)/gu
const BADGE_RE = /`([^`]+)`/gu
const STAR_RE = /\u2B50\uFE0F?/gu
const HEADING_RE = /^(#{2,4})\s+(.+?)\s*$/u
const STORE_BADGE_RE = new RegExp(
  '`([^`]+)`|\\[(\\u{1F331}|\\u{25B6}\\uFE0F?)\\]\\(([^)\\s]+)\\)',
  'gu'
)
const TRAILING_BADGE_RE = new RegExp(
  '(?:`[^`]+`|\\|\\s*\\[(?:\\u{1F331}|\\u{25B6}\\uFE0F?)\\]\\([^)]+\\))\\s*$',
  'u'
)
const ALLOWED_TAGS = new Set(['FOSS', 'Proprietary', '[M]', '[K]', '[A]', '[LSP]'])

/**
 * Collect the trailing run of badges and store icons.
 * Only the tail of the line is a badge run, so inline code used inside the
 * description (`Android/data`, `zygote_next`, ...) is not mistaken for a badge.
 */
function extractBadges(rest) {
  let tail = rest.trimEnd()
  const found = []
  for (;;) {
    const match = TRAILING_BADGE_RE.exec(tail)
    if (!match) break
    found.unshift(match[0].trim())
    tail = tail.slice(0, match.index).trimEnd()
  }
  const badges = []
  for (const token of found) {
    for (const m of token.matchAll(STORE_BADGE_RE)) {
      badges.push(m[1] !== undefined
        ? { kind: 'tag', value: m[1] }
        : { kind: 'store', value: m[2].replace(/\uFE0F/g, ''), url: m[3] })
    }
  }
  return { badges, description: tail }
}

/**
 * Parse one category page once. Returns the index records together with the
 * data lint needs (line numbers, stars, sections and malformed lines).
 */
function parseFile(fileName) {
  const file = relative(ROOT, join(DIR, fileName)).replaceAll('\\', '/')
  const records = []
  let section = null // last h2/h3 heading, used for lint grouping
  let lastHeading = '' // last h2/h3/h4 heading, recorded in the index
  let inFence = false

  const lines = readFileSync(join(DIR, fileName), 'utf8').split('\n')
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]

    // Example entries inside code fences are documentation, not entries.
    if (/^\s*(```|~~~)/.test(raw)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const heading = HEADING_RE.exec(raw)
    if (heading) {
      lastHeading = heading[2].trim()
      if (heading[1].length <= 3) section = lastHeading
      continue
    }
    if (!raw.startsWith('- **')) continue

    const match = ENTRY_RE.exec(raw)
    if (!match) {
      records.push({ file, line: i + 1, malformed: true })
      continue
    }

    const [, rawName, url, rest] = match
    STAR_RE.lastIndex = 0
    const starred = STAR_RE.test(rawName)
    const name = rawName.replace(STAR_RE, '').trim()

    records.push({
      file,
      line: i + 1,
      name,
      starred,
      url,
      rest,
      links: [...raw.matchAll(LINK_RE)].map((link) => link[1]),
      tags: [...rest.matchAll(BADGE_RE)].map((badge) => badge[1]),
      lintSection: section,
      indexSection: lastHeading
    })
  }
  return records
}

// ---- Lint -------------------------------------------------------------------

const errors = []
const warnings = []
const seenUrls = new Map()

function error(file, line, message) {
  errors.push(`${file}:${line} ${message}`)
}

function warn(file, line, message) {
  warnings.push(`${file}:${line} ${message}`)
}

function lintRecord(record) {
  const { file, line } = record
  if (record.malformed) {
    error(file, line, 'does not match the format "- **[Name](url)** - Description."')
    return
  }

  const { name, url, rest } = record
  if (!name) error(file, line, 'entry has an empty name')
  if (!rest.trim()) error(file, line, 'entry has no description')

  const normalized = url.replace(/\/+$/, '').toLowerCase()
  if (seenUrls.has(normalized)) {
    error(file, line, `duplicate URL "${url}", already used at ${seenUrls.get(normalized)}`)
  } else {
    seenUrls.set(normalized, `${file}:${line}`)
  }

  const { badges, description } = extractBadges(rest)

  const licenses = badges.filter(
    (b) => b.kind === 'tag' && (b.value === 'FOSS' || b.value === 'Proprietary')
  )
  if (licenses.length === 0) error(file, line, 'missing the `FOSS` or `Proprietary` badge')
  else if (licenses.length > 1) error(file, line, 'has both `FOSS` and `Proprietary` badges')

  for (const badge of badges) {
    if (badge.kind === 'tag' && !ALLOWED_TAGS.has(badge.value)) {
      error(file, line, `unknown badge \`${badge.value}\`, allowed: ${[...ALLOWED_TAGS].join(' ')}`)
    }
    if (badge.kind === 'store' && !badge.url.startsWith('http')) {
      error(file, line, `store icon "${badge.value}" needs an http(s) link`)
    }
  }

  if (description.length < 25) {
    warn(file, line, `description is only ${description.length} characters`)
  }
}

function lintRecords(records) {
  const bySection = new Map()
  for (const record of records) {
    const key = record.lintSection ?? ''
    if (!bySection.has(key)) bySection.set(key, [])
    bySection.get(key).push(record)
  }

  for (const [name, group] of bySection) {
    let sawPlain = false
    for (const record of group) {
      if (record.starred && sawPlain) {
        error(record.file, record.line, `starred entry is after unstarred entries in "${name}"`)
      }
      if (!record.starred) sawPlain = true
    }

    let previous = null
    for (const record of group) {
      if (previous && previous.starred === record.starred) {
        if (record.name.toLowerCase() < previous.name.toLowerCase()) {
          error(
            record.file,
            record.line,
            `not alphabetical in "${name}": "${record.name}" should come before "${previous.name}"`
          )
        }
      }
      previous = record
    }
  }
}

function lint() {
  for (const fileName of readdirSync(DIR).sort()) {
    if (!fileName.endsWith('.md')) continue
    const records = parseFile(fileName)
    if (fileName !== 'index.md') {
      for (const record of records) lintRecord(record)
      lintRecords(records)
    }
  }

  for (const message of warnings) console.log(`warning: ${message}`)
  for (const message of errors) console.log(`error: ${message}`)
  console.log(`\n${errors.length} error(s), ${warnings.length} warning(s).`)
}

// ---- Index ------------------------------------------------------------------

function buildIndex() {
  const files = readdirSync(DIR).filter((file) => file.endsWith('.md')).sort()
  const entries = []
  const pages = {}

  for (const fileName of files) {
    const page = fileName.replace(/\.md$/, '')
    for (const record of parseFile(fileName)) {
      if (record.malformed) continue
      entries.push({
        n: record.name,
        u: record.url,
        a: [...new Set(record.links)],
        t: record.tags,
        p: page,
        s: record.indexSection
      })
      pages[page] = (pages[page] ?? 0) + 1
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    source: 'docs/apps-and-modules/*.md',
    count: entries.length,
    pages,
    entries
  }
}

function writeIndex(payload) {
  writeFileSync(OUT_FILE, `${JSON.stringify(payload, null, 0)}\n`)
  console.log(`App index: ${payload.count} entries from ${Object.keys(payload.pages).length} category pages`)
  for (const [page, count] of Object.entries(payload.pages)) console.log(`  ${page}: ${count}`)
  console.log(`Written to ${OUT_FILE}`)
}

// ---- Main -------------------------------------------------------------------

lint()

writeIndex(buildIndex())
