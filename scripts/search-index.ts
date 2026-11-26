import { readFile, readdir, rename, rm } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { createMarkdownRenderer } from 'vitepress'
import { markdownOptions } from '../docs/.vitepress/markdown/index.ts'
import { close, createIndex } from 'pagefind'
import type { PagefindIndex } from 'pagefind'
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

/** Stage output so failed indexing/cleanup never publishes a partial index. */
export async function buildSearchIndex(outDir: string, srcDir: string): Promise<void> {
  const outputPath = join(outDir, 'pagefind')
  const stagingPath = join(outDir, '.pagefind-staging')
  await rm(outputPath, { recursive: true, force: true })
  await rm(stagingPath, { recursive: true, force: true })
  try {
    const counts = await writeSearchIndex(stagingPath, outDir, srcDir)
    await rename(stagingPath, outputPath)
    console.log(`Pagefind: indexed ${counts.pages} documentation pages and ${counts.entries} verified entry destinations in ${relative(process.cwd(), outputPath)}`)
  } finally {
    await rm(stagingPath, { recursive: true, force: true })
  }
}

async function writeSearchIndex(outputPath: string, outDir: string, srcDir: string) {
  let index: PagefindIndex | undefined
  let pages = 0
  let entries = 0
  const urls = new Set<string>()
  const entryTargets = new Map<string, Set<string>>()
  const excludedFiles = new Set<string>()
  const claimUrl = (url: string) => {
    if (urls.has(url)) throw new Error(`Duplicate search URL: ${url}`)
    urls.add(url)
  }
  try {
    const markdown = await createMarkdownRenderer(srcDir, markdownOptions)
    const created = await createIndex({
      rootSelector: '.vp-doc',
      forceLanguage: 'en',
      includeCharacters: '+#',
      excludeSelectors: ['.header-anchor', '.store-badge', '.store-separator', '.markdown-copy-buttons', 'svg', 'button']
    })
    index = created.index
    checkErrors(created)
    if (!index) throw new Error('Pagefind did not create an index')
    // Explicit clean URLs, not Pagefind's default .html URLs. All paths remain
    // base-relative; the browser supplies VitePress's base via Pagefind.options.
    for (const file of await readdir(outDir, { recursive: true })) {
      if (!file.endsWith('.html') || file === '404.html') continue
      const source = join(srcDir, file.replace(/\.html$/, '.md'))
      let markdown: string
      try { markdown = await readFile(source, 'utf8') } catch { continue }
      const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? ''
      if (/^search:\s*false\s*$/m.test(frontmatter) || /^layout:\s*home\s*$/m.test(frontmatter)) {
        excludedFiles.add(file)
        continue
      }
      const html = await readFile(join(outDir, file), 'utf8')
      if (!html.includes('vp-doc')) continue
      const url = '/' + file.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '')
      claimUrl(url)
      // Check the rendered output, not another reconstruction of Markdown.
      // Every synthetic entry must consume exactly one ignored real <li> ID.
      if (file.startsWith('apps-and-modules/')) {
        const ids = new Set<string>()
        for (const [tag] of html.matchAll(/<li\b[^>]*>/g)) {
          const id = tag.match(/\sid="(app-[^"]+)"/)?.[1]
          if (!id) continue
          if (ids.has(id)) throw new Error(`Duplicate rendered entry anchor ${id} in ${file}`)
          if (!/\sdata-pagefind-ignore="all"(?:\s|>)/.test(tag)) {
            throw new Error(`Entry ${id} in ${file} is not excluded from category indexing`)
          }
          ids.add(id)
        }
        entryTargets.set(file, ids)
      }
      const result = await index.addHTMLFile({ url, content: html })
      checkErrors(result)
      if (result.file.url !== url) throw new Error(`Pagefind changed URL ${url} to ${result.file.url}`)
      if (result.file.uniqueWords === 0) throw new Error(`Empty search page: ${file}`)
      pages++
    }
    for (const { fileName, records } of parseEntries()) {
      if (fileName === 'index.md') continue
      const targetFile = `apps-and-modules/${fileName.replace(/\.md$/, '.html')}`
      if (excludedFiles.has(targetFile)) continue
      const ids = entryTargets.get(targetFile)
      if (!ids) throw new Error(`Entry category was not rendered/indexed: ${targetFile}`)
      for (const record of records) {
        if (record.malformed) throw new Error(`Malformed entry at ${record.file}:${record.line}`)
        const { description } = extractBadges(record.rest)
        const category = fileName.replace(/\.md$/, '').replace(/-/g, ' ')
        const frameworks = record.tags.map((tag) => ({
          '[M]': 'Magisk', '[K]': 'KernelSU', '[A]': 'APatch', '[LSP]': 'LSPosed Xposed'
        })[tag] ?? '').filter(Boolean).join(' ')
        const id = entryAnchor(record.name, record.url)
        if (!ids.delete(id)) throw new Error(`Missing or reused rendered entry anchor ${id} in ${targetFile}`)
        const url = `/apps-and-modules/${fileName.replace(/\.md$/, '')}#${id}`
        claimUrl(url)
        const title = escapeHtml(record.name)
        // Preserve Pagefind's default h1 title weight (7), rather than globally
        // boosting all directory pages. Description/aliases remain normal text.
        const result = await index.addHTMLFile({
          url,
          content: `<html lang="en"><body><article class="vp-doc"><h1 data-pagefind-meta="title">${title}</h1><p>${markdown.renderInline(description)}</p><p data-pagefind-weight="0.5">${escapeHtml(category)} ${escapeHtml(record.indexSection)} ${frameworks}</p><p data-pagefind-weight="0.5">${escapeHtml(developerTerms(record.url))}</p></article></body></html>`
        })
        checkErrors(result)
        if (result.file.url !== url || result.file.uniqueWords === 0) {
          throw new Error(`Invalid Pagefind entry result for ${url}`)
        }
        entries++
      }
    }
    for (const [file, ids] of entryTargets) {
      if (ids.size) throw new Error(`Rendered entries missing from search in ${file}: ${[...ids].join(', ')}`)
    }
    checkErrors(await index.writeFiles({ outputPath }))
    // The custom Vue UI needs the engine/worker/index, not Pagefind's bundled
    // alternative UIs or its optional on-page highlighting script.
    for (const file of await readdir(outputPath)) {
      if (/^pagefind-(?:ui|modular-ui|component-ui)\.(?:js|css)$/.test(file) || file === 'pagefind-highlight.js') {
        await rm(join(outputPath, file))
      }
    }
    return { pages, entries }
  } finally {
    try { await index?.deleteIndex() }
    finally { await close() }
  }
}
