#!/usr/bin/env node
/**
 * Lint the entries in docs/apps-and-modules/*.md.
 *
 * Checks each list entry against the format documented in docs/contributing.md
 * and the PR template. This script never rewrites or reorders entries, it only
 * reports `file:line` for every problem it finds.
 *
 * Usage: node scripts/lint-entries.mjs
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const DIR = join(ROOT, 'docs', 'apps-and-modules')

const ALLOWED_TAGS = new Set(['FOSS', 'Proprietary', '[M]', '[K]', '[A]', '[LSP]'])
const FDROID_ICON = '\u{1F331}'
const PLAY_ICON = '\u{25B6}\uFE0F'
const STORE_ICONS = new Set([FDROID_ICON, '\u{25B6}'])
const STAR_RE = /\u2B50\uFE0F?/gu
const ENTRY_RE = /^-\s+\*\*\[([^\]]+)\]\(([^)\s]+)\)\*\*\s*-?\s*(.*)$/u
const BADGE_RE = new RegExp(
  '`([^`]+)`|\\[(\\u{1F331}|\\u{25B6}\\uFE0F?)\\]\\(([^)\\s]+)\\)',
  'gu'
)
const TRAILING_BADGE_RE = new RegExp(
  '(?:`[^`]+`|\\|\\s*\\[(?:\\u{1F331}|\\u{25B6}\\uFE0F?)\\]\\([^)]+\\))\\s*$',
  'u'
)

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
    for (const m of token.matchAll(BADGE_RE)) {
      badges.push(m[1] !== undefined
        ? { kind: 'tag', value: m[1] }
        : { kind: 'store', value: m[2].replace(/\uFE0F/g, ''), url: m[3] })
    }
  }
  return { badges, description: tail }
}

const errors = []
const warnings = []
const seenUrls = new Map()

function error(file, line, message) {
  errors.push(`${file}:${line} ${message}`)
}

function warn(file, line, message) {
  warnings.push(`${file}:${line} ${message}`)
}

function parseEntry(file, lineNo, raw, section) {
  const match = ENTRY_RE.exec(raw)
  if (!match) {
    error(file, lineNo, 'does not match the format "- **[Name](url)** - Description."')
    return null
  }

  const [, rawName, url, rest] = match
  const starred = STAR_RE.test(rawName)
  STAR_RE.lastIndex = 0
  const name = rawName.replace(STAR_RE, '').trim()

  if (!name) error(file, lineNo, 'entry has an empty name')
  if (!rest.trim()) error(file, lineNo, 'entry has no description')

  const normalized = url.replace(/\/+$/, '').toLowerCase()
  if (seenUrls.has(normalized)) {
    error(file, lineNo, `duplicate URL "${url}", already used at ${seenUrls.get(normalized)}`)
  } else {
    seenUrls.set(normalized, `${file}:${lineNo}`)
  }

  const { badges, description } = extractBadges(rest)

  const licenses = badges.filter(
    (b) => b.kind === 'tag' && (b.value === 'FOSS' || b.value === 'Proprietary')
  )
  if (licenses.length === 0) error(file, lineNo, 'missing the `FOSS` or `Proprietary` badge')
  else if (licenses.length > 1) error(file, lineNo, 'has both `FOSS` and `Proprietary` badges')

  for (const badge of badges) {
    if (badge.kind === 'tag' && !ALLOWED_TAGS.has(badge.value)) {
      error(file, lineNo, `unknown badge \`${badge.value}\`, allowed: ${[...ALLOWED_TAGS].join(' ')}`)
    }
    if (badge.kind === 'store' && !badge.url.startsWith('http')) {
      error(file, lineNo, `store icon "${badge.value}" needs an http(s) link`)
    }
  }

  if (description.length < 25) {
    warn(file, lineNo, `description is only ${description.length} characters`)
  }

  return { name, starred, section, line: lineNo }
}

function lintFile(fileName) {
  const file = relative(ROOT, join(DIR, fileName)).replaceAll('\\', '/')
  const lines = readFileSync(join(DIR, fileName), 'utf8').split('\n')

  let section = null
  let inFence = false
  const entries = []

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    if (/^\s*```/.test(raw)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const heading = /^(#{2,3})\s+(.+?)\s*$/.exec(raw)
    if (heading) {
      section = heading[2].trim()
      continue
    }
    if (!raw.startsWith('- **')) continue

    const entry = parseEntry(file, i + 1, raw, section)
    if (entry) entries.push(entry)
  }

  const bySection = new Map()
  for (const entry of entries) {
    const key = entry.section ?? ''
    if (!bySection.has(key)) bySection.set(key, [])
    bySection.get(key).push(entry)
  }

  for (const [name, group] of bySection) {
    let sawPlain = false
    for (const entry of group) {
      if (entry.starred && sawPlain) {
        error(file, entry.line, `starred entry is after unstarred entries in "${name}"`)
      }
      if (!entry.starred) sawPlain = true
    }

    let previous = null
    for (const entry of group) {
      if (previous && previous.starred === entry.starred) {
        if (entry.name.toLowerCase() < previous.name.toLowerCase()) {
          error(
            file,
            entry.line,
            `not alphabetical in "${name}": "${entry.name}" should come before "${previous.name}"`
          )
        }
      }
      previous = entry
    }
  }
}

for (const fileName of readdirSync(DIR).sort()) {
  if (!fileName.endsWith('.md') || fileName === 'index.md') continue
  lintFile(fileName)
}

for (const message of warnings) console.log(`warning: ${message}`)
for (const message of errors) console.log(`error: ${message}`)

console.log(`\n${errors.length} error(s), ${warnings.length} warning(s).`)
process.exit(errors.length ? 1 : 0)