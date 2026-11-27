import type MarkdownIt from 'markdown-it'
import { entryAnchor, parseEntryLine } from '../shared/entries.ts'

/** Give directory entries stable deep links and avoid indexing them twice. */
export function entrySearchPlugin(md: MarkdownIt): void {
  md.core.ruler.push('entry-search', (state) => {
    const env: { relativePath?: string } = state.env
    if (!env.relativePath?.startsWith('apps-and-modules/') || env.relativePath === 'apps-and-modules/index.md') return
    const lines = state.src.split('\n')
    const seen = new Set<string>()
    for (const token of state.tokens) {
      if (token.type !== 'list_item_open' || !token.map) continue
      const entry = parseEntryLine(lines[token.map[0]] ?? '')
      if (!entry) continue
      const id = entryAnchor(entry.rawName, entry.url)
      if (seen.has(id)) throw new Error(`Duplicate search anchor ${id} in ${env.relativePath}`)
      seen.add(id)
      token.attrSet('id', id)
      token.attrSet('data-pagefind-ignore', 'all')
    }
  })
}
