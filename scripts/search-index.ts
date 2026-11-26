import { readFile, readdir, rm } from 'node:fs/promises'
import { join, relative } from 'node:path'
import MarkdownIt from 'markdown-it'
import { close, createIndex } from 'pagefind'
import { parseEntries, extractBadges } from './app-entries.ts'
import { entryAnchor } from '../docs/.vitepress/shared/entries.ts'

const escapeHtml = (text: string): string => text.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]!)

export function developerTerms(url: string): string {
  try {
    const parsed = new URL(url)
    if (parsed.hostname !== 'github.com' && parsed.hostname !== 'gitlab.com') return ''
    const parts = parsed.pathname.split('/').filter(Boolean).slice(0, 2).map(decodeURIComponent)
    return [...new Set(parts.flatMap((part) => [part, part.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/[-_]/g, ' ')]))].join(' ')
  } catch { return '' }
}

function checkErrors(response: { errors: string[] }): void {
  if (response.errors.length) throw new Error(`Pagefind: ${response.errors.join('\n')}`)
}

/** VitePress buildEnd runs after rendering, including for non-root base paths. */
export async function buildSearchIndex(outDir: string, srcDir: string): Promise<void> {
  const markdown = new MarkdownIt({ html: false })
  const outputPath = join(outDir, 'pagefind')
  await rm(outputPath, { recursive: true, force: true })
  const created = await createIndex({
    rootSelector: '.vp-doc',
    forceLanguage: 'en',
    includeCharacters: '+#',
    excludeSelectors: ['.header-anchor', '.store-badge', '.store-separator', '.markdown-copy-buttons', 'svg', 'button']
  })
  checkErrors(created)
  const index = created.index
  if (!index) throw new Error('Pagefind did not create an index')
  let pages = 0
  let entries = 0
  try {
    // Explicit clean URLs, not Pagefind's default .html URLs. All paths remain
    // base-relative; the browser supplies VitePress's base via Pagefind.options.
    for (const file of await readdir(outDir, { recursive: true })) {
      if (!file.endsWith('.html') || file === '404.html') continue
      const source = join(srcDir, file.replace(/\.html$/, '.md'))
      let markdown: string
      try { markdown = await readFile(source, 'utf8') } catch { continue }
      const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
      if (/^search:\s*false\s*$/m.test(frontmatter) || /^layout:\s*home\s*$/m.test(frontmatter)) continue
      const html = await readFile(join(outDir, file), 'utf8')
      if (!html.includes('vp-doc')) continue
      const url = '/' + file.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '')
      const result = await index.addHTMLFile({ url, content: html })
      checkErrors(result)
      if (result.file.uniqueWords === 0) throw new Error(`Empty search page: ${file}`)
      pages++
    }
    for (const { fileName, records } of parseEntries()) {
      if (fileName === 'index.md') continue
      for (const record of records) {
        if (record.malformed) throw new Error(`Malformed entry at ${record.file}:${record.line}`)
        const { description } = extractBadges(record.rest)
        const category = fileName.replace(/\.md$/, '').replace(/-/g, ' ')
        const frameworks = record.tags.map((tag) => ({
          '[M]': 'Magisk', '[K]': 'KernelSU', '[A]': 'APatch', '[LSP]': 'LSPosed Xposed'
        })[tag] ?? '').filter(Boolean).join(' ')
        const title = escapeHtml(record.name)
        // Preserve Pagefind's default h1 title weight (7), rather than globally
        // boosting all directory pages. Description/aliases remain normal text.
        const result = await index.addHTMLFile({
          url: `/apps-and-modules/${fileName.replace(/\.md$/, '')}#${entryAnchor(record.name, record.url)}`,
          content: `<html lang="en"><body><article class="vp-doc"><h1 data-pagefind-meta="title">${title}</h1><p>${markdown.renderInline(description)}</p><p data-pagefind-weight="0.5">${escapeHtml(category)} ${escapeHtml(record.indexSection)} ${frameworks}</p><p data-pagefind-weight="0.5">${escapeHtml(developerTerms(record.url))}</p></article></body></html>`
        })
        checkErrors(result)
        entries++
      }
    }
    checkErrors(await index.writeFiles({ outputPath }))
    // The custom Vue UI needs the engine/worker/index, not Pagefind's bundled
    // alternative UIs or its optional on-page highlighting script.
    for (const file of await readdir(outputPath)) {
      if (/^pagefind-(?:ui|modular-ui|component-ui)\.(?:js|css)$/.test(file) || file === 'pagefind-highlight.js') {
        await rm(join(outputPath, file))
      }
    }
    console.log(`Pagefind: indexed ${pages} documentation pages and ${entries} entries in ${relative(process.cwd(), outputPath)}`)
  } finally {
    await index.deleteIndex()
    await close()
  }
}
