/** Contracts shared by the Markdown renderer, entry linter and search indexer. */
export type Store = 'fdroid' | 'izzy' | 'playstore'
export interface Entry {
  file: string
  line: number
  malformed?: false
  name: string
  starred: boolean
  url: string
  rest: string
  links: string[]
  tags: string[]
  lintSection: string | null
  indexSection: string
}
export type ParsedRecord = Entry | { file: string; line: number; malformed: true }
export interface ParsedFile { fileName: string; records: ParsedRecord[] }
export type Badge = { kind: 'tag'; value: string } | { kind: 'store'; value: string; url: string }
export interface EntryIndex {
  source: string
  count: number
  pages: Record<string, number>
  entries: { n: string; u: string; a: string[]; t: string[]; p: string; s: string }[]
}

/**
 * Entry line format used by every category page, see docs/contributing.md:
 * `- **[Name](url)** - Description. `FOSS` ...`. The linter, the app index,
 * the Markdown anchor plugin and the search indexer all parse lines with this.
 */
export const ENTRY_RE = /^-\s+\*\*\[([^\]]+)\]\(([^)\s]+)\)\*\*\s*-?\s*(.*)$/u

/** Split an entry line into its raw name (star included), primary URL and the rest. */
export function parseEntryLine(line: string): { rawName: string; url: string; rest: string } | null {
  const match = ENTRY_RE.exec(line)
  return match ? { rawName: match[1], url: match[2], rest: match[3] } : null
}

// Shared identity must not depend on entry order, recommendations or punctuation.
export function entryAnchor(name: string, url: string): string {
  let hash = 2166136261
  for (const char of url) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619)
  return 'app-' + [...name.replace(/⭐\uFE0F?/gu, '').trim().toLowerCase()]
    .map((char) => /[a-z0-9-]/.test(char) ? char : `_${char.codePointAt(0)!.toString(16)}_`).join('') + '-' + (hash >>> 0).toString(36)
}
