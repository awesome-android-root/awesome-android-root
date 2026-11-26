import type MarkdownIt from 'markdown-it'
import { entryAnchor } from '../shared/entries.ts'

/** Give directory entries stable deep links and avoid indexing them twice. */
export function entrySearchPlugin(md: MarkdownIt): void {
  md.core.ruler.push('entry-search', (state) => {
    const env: { relativePath?: string } = state.env
    if (!env.relativePath?.startsWith('apps-and-modules/') || env.relativePath === 'apps-and-modules/index.md') return
    const lines = state.src.split('\n')
    const seen = new Set<string>()
    for (const token of state.tokens) {
      if (token.type !== 'list_item_open' || !token.map) continue
      const match = lines[token.map[0]]?.match(/^-\s+\*\*\[([^\]]+)\]\(([^)\s]+)\)/u)
      if (!match) continue
      const id = entryAnchor(match[1], match[2])
      if (seen.has(id)) throw new Error(`Duplicate search anchor ${id} in ${env.relativePath}`)
      seen.add(id)
      token.attrSet('id', id)
      token.attrSet('data-pagefind-ignore', 'all')
    }
  })
}
