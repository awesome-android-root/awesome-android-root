import type { MarkdownOptions } from 'vitepress'
import { copyOrDownloadAsMarkdownButtons } from 'vitepress-plugin-llms'
import { storeLinkPlugin } from './storeLinkPlugin.ts'
import { entrySearchPlugin } from './entrySearchPlugin.ts'

/** One Markdown/anchor pipeline for VitePress, search records and link checks. */
export const markdownOptions: MarkdownOptions = {
  cache: true,
  anchor: { level: [2, 3, 4] },
  image: { lazyLoad: true },
  config(md) {
    md.use(storeLinkPlugin)
    md.use(entrySearchPlugin)
    md.use(copyOrDownloadAsMarkdownButtons, { componentName: 'MarkdownActions' })
  }
}
