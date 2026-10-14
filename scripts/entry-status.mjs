#!/usr/bin/env node
/**
 * Weekly status report for the GitHub repositories linked from
 * docs/apps-and-modules/*.md.
 *
 * For every repo it reports:
 *   - archived repositories
 *   - repositories with no push in the last 24 months
 *   - license mismatches (entry says FOSS but no OSI license,
 *     or entry says Proprietary but an OSI license is declared)
 *
 * It never edits entries. Set GITHUB_TOKEN to raise the API rate limit.
 *
 * Usage: node scripts/entry-status.mjs
 *        node scripts/entry-status.mjs --format=markdown
 */
import { readFileSync, readdirSync } from 'node:fs'
import { join, resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const DIR = join(ROOT, 'docs', 'apps-and-modules')

const MONTHS_STALE = 24
const STALE_MS = MONTHS_STALE * 30.44 * 24 * 60 * 60 * 1000
const API = 'https://api.github.com'
const TOKEN = process.env.GITHUB_TOKEN

const ENTRY_RE = /^-\s+\*\*\[[^\]]+\]\((https?:\/\/[^)\s]+)\)\*\*(.*)$/
const GITHUB_RE = /^https?:\/\/github\.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?(?:#.*)?(?:\/.*)?$/

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'awesome-android-root-entry-status',
  'X-GitHub-Api-Version': '2022-11-28'
}
if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`

function collectEntries() {
  const entries = []
  for (const name of readdirSync(DIR).sort()) {
    if (!name.endsWith('.md') || name === 'index.md') continue
    const file = `docs/apps-and-modules/${name}`
    const lines = readFileSync(join(DIR, name), 'utf8').split('\n')
    let inFence = false
    lines.forEach((raw, index) => {
      if (/^\s*```/.test(raw)) inFence = !inFence
      if (inFence) return
      const match = ENTRY_RE.exec(raw)
      if (!match) return
      const repo = GITHUB_RE.exec(match[1])
      if (!repo) return
      const name = match[0].match(/^\-\s+\*\*\[([^\]]+)\]/)[1].replace(/⭐️?/gu, '').trim()
      entries.push({
        file,
        line: index + 1,
        name,
        url: match[1],
        repo: `${repo[1]}/${repo[2]}`,
        foss: match[2].includes('`FOSS`'),
        proprietary: match[2].includes('`Proprietary`')
      })
    })
  }
  return entries
}

async function fetchRepo(repo) {
  const response = await fetch(`${API}/repos/${repo}`, { headers })
  if (response.status === 404) return { missing: true }
  if (response.status === 403 || response.status === 429) {
    const remaining = response.headers.get('x-ratelimit-remaining')
    return { rateLimited: remaining === '0' }
  }
  if (!response.ok) return { error: `HTTP ${response.status}` }
  return { data: await response.json() }
}

/**
 * OSI-approved SPDX identifiers that turn up in Android root projects.
 * The GitHub repository API no longer returns an `osi_approved` flag, so the
 * license is matched against this list instead.
 */
const OSI_LICENSES = new Set([
  '0BSD', 'AGPL-3.0', 'AGPL-3.0-only', 'AGPL-3.0-or-later', 'Apache-1.1',
  'Apache-2.0', 'Artistic-2.0', 'BSD-2-Clause', 'BSD-3-Clause', 'BSD-3-Clause-Clear',
  'BSD-4-Clause', 'BSL-1.0', 'CC0-1.0', 'CC-BY-4.0', 'CC-BY-SA-4.0', 'ECL-2.0',
  'EPL-1.0', 'EPL-2.0', 'EUPL-1.2', 'GPL-2.0', 'GPL-2.0-only',
  'GPL-2.0-or-later', 'GPL-3.0', 'GPL-3.0-only', 'GPL-3.0-or-later', 'ISC',
  'LGPL-2.1', 'LGPL-2.1-only', 'LGPL-2.1-or-later', 'LGPL-3.0', 'LGPL-3.0-only',
  'LGPL-3.0-or-later', 'MIT', 'MIT-0', 'MPL-1.1', 'MPL-2.0', 'MS-PL', 'NCSA',
  'OSL-3.0', 'PostgreSQL', 'Python-2.0', 'Unlicense', 'UPL-1.0', 'WTFPL',
  'X11', 'Zlib', 'ZPL-2.1'
])

function isOsiLicense(license) {
  return Boolean(license && OSI_LICENSES.has(license.spdx_id))
}

function formatDate(value) {
  return value ? value.slice(0, 10) : 'unknown'
}

async function main() {
  const entries = collectEntries()
  const unique = [...new Set(entries.map((e) => e.repo))]

  const archived = []
  const stale = []
  const mismatches = []
  const missing = []
  let rateLimited = false
  let checked = 0

  for (const repo of unique) {
    let result
    try {
      result = await fetchRepo(repo)
    } catch (error) {
      console.warn(`warn: ${repo} could not be reached: ${error.message}`)
      continue
    }

    if (result.rateLimited) {
      rateLimited = true
      console.warn('warn: GitHub API rate limit reached, stopping early')
      break
    }
    if (result.missing) {
      missing.push(repo)
      continue
    }
    if (result.error) {
      console.warn(`warn: ${repo} ${result.error}`)
      continue
    }
    checked++

    const data = result.data
    const linked = entries.filter((e) => e.repo === repo)

    if (data.archived) {
      archived.push({ repo, entries: linked, archived_at: formatDate(data.archived_at) })
    }

    const pushedAt = data.pushed_at ? Date.parse(data.pushed_at) : 0
    if (pushedAt && Date.now() - pushedAt > STALE_MS) {
      stale.push({ repo, entries: linked, pushed_at: formatDate(data.pushed_at) })
    }

    const osi = isOsiLicense(data.license)
    for (const entry of linked) {
      if (entry.foss && !osi) {
        mismatches.push({
          entry,
          reason: 'entry says FOSS but GitHub reports no OSI-approved license',
          license: data.license ? data.license.spdx_id : null
        })
      }
      if (entry.proprietary && osi) {
        mismatches.push({
          entry,
          reason: 'entry says Proprietary but GitHub reports an OSI-approved license',
          license: data.license.spdx_id
        })
      }
    }
  }

  const markdown = process.argv.includes('--format=markdown')
  const out = []
  const push = (line) => out.push(markdown ? line : line.replace(/^#+\s*/, '- '))

  push('# Entry status report')
  push('')
  push(`Checked ${checked} of ${unique.length} GitHub repositories referenced from \`docs/apps-and-modules/\`.`)
  push('')

  const section = (title, rows, render) => {
    push(`## ${title}`)
    push('')
    if (!rows.length) {
      push('None found.')
    } else {
      for (const row of rows) push(render(row))
    }
    push('')
  }

  section('Archived repositories', archived,
    (r) => `- \`${r.repo}\` (archived ${r.archived_at}) - ${r.entries.map((e) => `${e.name} (${e.file}:${e.line})`).join(', ')}`)
  section('No push in the last 24 months', stale,
    (r) => `- \`${r.repo}\` (last push ${r.pushed_at}) - ${r.entries.map((e) => `${e.name} (${e.file}:${e.line})`).join(', ')}`)
  section('License mismatches', mismatches,
    (r) => `- ${r.entry.name} (${r.entry.file}:${r.entry.line}) - ${r.reason}${r.license ? ` (GitHub: ${r.license})` : ''}`)
  section('Repositories not found', missing, (repo) => `- \`${repo}\``)

  if (rateLimited) {
    push('> GitHub API rate limit was reached, so this report is incomplete.')
    push('')
  }
  push('_Generated by `scripts/entry-status.mjs`. Entries are never edited automatically._')

  console.log(out.join('\n'))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})