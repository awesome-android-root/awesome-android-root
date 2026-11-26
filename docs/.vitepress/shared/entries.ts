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

// Shared identity must not depend on entry order, recommendations or punctuation.
export function entryAnchor(name: string, url: string): string {
  let hash = 2166136261
  for (const char of url) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619)
  return 'app-' + [...name.replace(/⭐\uFE0F?/gu, '').trim().toLowerCase()]
    .map((char) => /[a-z0-9-]/.test(char) ? char : `_${char.codePointAt(0)!.toString(16)}_`).join('') + '-' + (hash >>> 0).toString(36)
}
