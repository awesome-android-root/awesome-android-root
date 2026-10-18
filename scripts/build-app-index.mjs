#!/usr/bin/env node
/**
 * Build the URL index of the Apps & Modules database.
 *
 * Every entry in docs/apps-and-modules/*.md is exported to
 * docs/public/app-index.json, with the category page, its section heading and
 * every URL found on the entry line. The file is committed so other tools can
 * read it without building the site:
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
 * Usage:
 *   node scripts/build-app-index.mjs           write docs/public/app-index.json
 *   node scripts/build-app-index.mjs --check   fail if the committed file is stale
 */
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const DIR = join(ROOT, 'docs', 'apps-and-modules')
const OUT_FILE = join(ROOT, 'docs', 'public', 'app-index.json')

// Entry format used by every category page, see docs/contributing.md.
const ENTRY_RE = /^- \*\*\[([^\]]+)\]\(([^)\s]+)\)\*\*\s*-?\s*(.*)$/u
const LINK_RE = /\]\(([^)\s]+)\)/gu
const BADGE_RE = /`([^`]+)`/gu
const STAR_RE = /\u2B50\uFE0F?/gu
const HEADING_RE = /^(#{2,4})\s+(.+?)\s*$/u

function parsePage(markdown, page) {
  const entries = []
  let section = ''
  let inFence = false

  for (const line of markdown.split('\n')) {
    // Example entries inside code fences are documentation, not entries.
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence
      continue
    }
    if (inFence) continue

    const heading = HEADING_RE.exec(line)
    if (heading) {
      section = heading[2].trim()
      continue
    }

    const match = ENTRY_RE.exec(line)
    if (!match) continue

    const [, rawName, url, rest] = match
    const links = [...line.matchAll(LINK_RE)].map((link) => link[1])

    entries.push({
      n: rawName.replace(STAR_RE, '').trim(),
      u: url,
      a: [...new Set(links)],
      t: [...rest.matchAll(BADGE_RE)].map((badge) => badge[1]),
      p: page,
      s: section
    })
  }

  return entries
}

function build() {
  const files = readdirSync(DIR)
    .filter((file) => file.endsWith('.md'))
    .sort()

  const entries = []
  for (const file of files) {
    const page = file.replace(/\.md$/, '')
    const markdown = readFileSync(join(DIR, file), 'utf8')
    entries.push(...parsePage(markdown, page))
  }

  const pages = {}
  for (const entry of entries) pages[entry.p] = (pages[entry.p] ?? 0) + 1

  return {
    generatedAt: new Date().toISOString(),
    source: 'docs/apps-and-modules/*.md',
    count: entries.length,
    pages,
    entries
  }
}

const payload = build()

if (process.argv.includes('--check')) {
  let current = ''
  try {
    current = readFileSync(OUT_FILE, 'utf8')
  } catch {
    console.error(`${OUT_FILE} is missing. Run: node scripts/build-app-index.mjs`)
    process.exit(1)
  }

  // generatedAt is excluded so a rebuild with unchanged entries still passes.
  const { generatedAt, ...expected } = payload
  const parse = (text) => {
    const { generatedAt, ...rest } = JSON.parse(text)
    return rest
  }

  if (JSON.stringify(parse(current)) !== JSON.stringify(expected)) {
    console.error(`${OUT_FILE} is out of date. Run: node scripts/build-app-index.mjs`)
    process.exit(1)
  }

  console.log(`App index is up to date: ${payload.count} entries`)
  process.exit(0)
}

writeFileSync(OUT_FILE, `${JSON.stringify(payload, null, 0)}\n`)

console.log(`App index: ${payload.count} entries from ${Object.keys(payload.pages).length} category pages`)
for (const [page, count] of Object.entries(payload.pages)) console.log(`  ${page}: ${count}`)
console.log(`Written to ${OUT_FILE}`)