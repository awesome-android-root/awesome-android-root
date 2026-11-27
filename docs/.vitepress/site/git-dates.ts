import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = fileURLToPath(new URL('../../..', import.meta.url))
let firstPublishedDates: Map<string, Date> | null = null

function loadFirstPublishedDates() {
  if (firstPublishedDates) return firstPublishedDates
  firstPublishedDates = new Map()
  try {
    const output = execFileSync(
      'git',
      [
        'log',
        '--reverse',
        '--format=@@%aI',
        '--name-status',
        '-M',
        '-C',
        '--find-copies-harder',
        '--',
        '.'
      ],
      {
        cwd: REPO_ROOT,
        encoding: 'utf-8',
        stdio: ['ignore', 'pipe', 'ignore'],
        maxBuffer: 64 * 1024 * 1024
      }
    )
    let date: Date | null = null
    for (const line of output.split('\n')) {
      if (!line) continue
      if (line.startsWith('@@')) {
        const parsed = new Date(line.slice(2))
        date = Number.isNaN(parsed.getTime()) ? null : parsed
        continue
      }
      if (!date) continue

      const [status, first, second] = line.split('\t')
      if (!status) continue
      const isRenameOrCopy = status.startsWith('R') || status.startsWith('C')
      const path = isRenameOrCopy ? second : first
      if (!path || firstPublishedDates.has(path)) continue

      const inherited = isRenameOrCopy ? firstPublishedDates.get(first) : undefined
      firstPublishedDates.set(path, inherited ?? date)
    }
  } catch {
    // Git history is unavailable (shallow clone or source export); dates stay unknown.
  }
  return firstPublishedDates
}

/** First commit date for a page, used as datePublished when no frontmatter date exists. */
export function firstPublishedDate(relativePath: string) {
  return loadFirstPublishedDates().get(`docs/${relativePath}`) ?? null
}
