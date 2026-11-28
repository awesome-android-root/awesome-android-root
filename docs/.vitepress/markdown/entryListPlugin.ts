import type MarkdownIt from 'markdown-it'
import { parseEntryLine } from '../shared/entries.ts'

const labels: Record<string, string> = {
  '[M]': 'Magisk', '[K]': 'KernelSU', '[A]': 'APatch', '[LSP]': 'LSPosed',
  FOSS: 'FOSS', Proprietary: 'Proprietary'
}

/** Decorate only validated directory entries, leaving the authoring format intact. */
export function entryListPlugin(md: MarkdownIt): void {
  md.core.ruler.push('entry-list', (state) => {
    const path = (state.env as { relativePath?: string }).relativePath
    if (!path?.startsWith('apps-and-modules/') || path === 'apps-and-modules/index.md') return
    const lines = state.src.split('\n')
    const tokens = state.tokens
    const title = tokens.findIndex((token) => token.type === 'heading_open' && token.tag === 'h1')
    const introEnd = tokens.findIndex((token, index) => index > title && token.type === 'paragraph_close')
    if (title >= 0 && introEnd >= 0) {
      const filter = new state.Token('html_block', '', 0)
      filter.content = '<FilterBar />\n'
      tokens.splice(introEnd + 1, 0, filter)
    }
    for (let i = 0; i < tokens.length; i++) {
      const item = tokens[i]
      if (item.type !== 'list_item_open' || !item.map) continue
      const entry = parseEntryLine(lines[item.map[0]] ?? '')
      if (!entry) continue
      item.attrJoin('class', 'directory-entry')
      const badges = [...entry.rest.matchAll(/`(FOSS|Proprietary|\[M\]|\[K\]|\[A\]|\[LSP\])`/g)].map((match) => labels[match[1]])
      item.attrSet('data-frameworks', badges.join(' '))
      item.attrSet('data-license', badges.find((badge) => badge === 'FOSS' || badge === 'Proprietary') ?? '')
      const inline = tokens.slice(i + 1).find((token) => token.type === 'inline')
      if (!inline?.children) continue
      const children = inline.children
      const strongClose = children.findIndex((token) => token.type === 'strong_close')
      if (strongClose < 0) continue
      for (const child of children) {
        if (child.type !== 'code_inline' || !labels[child.content]) continue
        const label = labels[child.content]
        child.type = 'html_inline'
        child.content = `<span class="entry-chip entry-chip--${label.toLowerCase()}">${label}</span>`
      }

    }
  })
}
