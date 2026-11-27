/**
 * Build-time page index for WebMCP.
 *
 * Writes `page-index.json` to the build output with one small record per
 * published documentation page: its title, clean route and the Markdown copy
 * that vitepress-plugin-llms emits next to it. `list_pages` and
 * `navigate_to_page` read only this file, and `get_page` fetches one Markdown
 * copy on demand, so no tool downloads the whole `llms-full.txt` corpus.
 *
 * node:fs APIs only: this module is bundled into VitePress's config, where the
 * Bun global is not defined.
 */
import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

export interface PageIndexEntry {
  /** Page title, taken from the first `# ` heading of the Markdown copy. */
  title: string
  /** Clean, base-relative page route, for example `/` or `/rooting-guides/`. */
  route: string
  /** Base-relative path of the page's Markdown copy, for example `/rooting-guides.md`. */
  markdown: string
}

/**
 * Published pages that must not be offered to agents: the 404 page is not
 * documentation, and the count page is a maintainer-only build output.
 */
export const UNLISTED_PAGES: readonly string[] = ['404.md', 'count.md']

/** Map a source page (`rooting-guides/index.md`) to its route and Markdown copy. */
export function pageLocations(relativePath: string): Omit<PageIndexEntry, 'title'> {
  if (relativePath === 'index.md') return { route: '/', markdown: '/index.md' }
  const section = /^(.+)\/index\.md$/.exec(relativePath)?.[1]
  // vitepress-plugin-llms writes `<dir>/index.md` pages as `<dir>.md`.
  if (section) return { route: `/${section}/`, markdown: `/${section}.md` }
  return { route: `/${relativePath.replace(/\.md$/, '')}`, markdown: `/${relativePath}` }
}

/** First level-one heading outside the frontmatter and code fences. */
export function markdownTitle(markdown: string): string | undefined {
  const body = markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
  let inFence = false
  for (const line of body.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    else if (!inFence) {
      const title = /^#\s+(.+?)\s*$/.exec(line)?.[1]
      if (title) return title
    }
  }
  return undefined
}

/** Frontmatter `title`, used when a page has no `# ` heading (the home page). */
export function frontmatterTitle(markdown: string): string | undefined {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---/.exec(markdown)?.[1] ?? ''
  const value = /^title:\s*(.+?)\s*$/m.exec(frontmatter)?.[1]
  return value?.replace(/^(['"])(.*)\1$/, '$2') || undefined
}

export async function buildPageIndex(outDir: string, srcDir: string, pages: readonly string[]): Promise<PageIndexEntry[]> {
  const entries: PageIndexEntry[] = []
  for (const relativePath of pages.toSorted()) {
    if (UNLISTED_PAGES.includes(relativePath)) continue
    const { route, markdown } = pageLocations(relativePath)
    const copy = await readFile(join(outDir, markdown), 'utf8').catch(() => null)
    // get_page fetches this file, so a missing copy is a broken tool, not a skip.
    if (copy === null) throw new Error(`Page index: ${relativePath} has no Markdown copy at ${markdown}`)
    const title = markdownTitle(copy)
      ?? frontmatterTitle(await readFile(join(srcDir, relativePath), 'utf8').catch(() => ''))
      ?? route
    entries.push({ title, route, markdown })
  }
  return entries
}

export async function writePageIndex(outDir: string, srcDir: string, pages: readonly string[]): Promise<number> {
  const entries = await buildPageIndex(outDir, srcDir, pages)
  await writeFile(join(outDir, 'page-index.json'), `${JSON.stringify({ pages: entries })}\n`)
  return entries.length
}
