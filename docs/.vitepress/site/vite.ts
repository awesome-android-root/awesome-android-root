import { rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import type { DefaultTheme, UserConfig } from 'vitepress'
import type { Plugin } from 'vite'
import llmstxt from 'vitepress-plugin-llms'
import { UNLISTED_PAGES } from '../../../scripts/page-index.ts'

const isLlmPageLink = (link: unknown): link is string =>
  typeof link === 'string' && link.startsWith('/') && link !== '/' && !link.includes('#')

const systemFontsPlugin: Plugin = {
  name: 'aar-system-fonts',
  enforce: 'pre',
  resolveId(source, importer) {
    if (importer?.includes('theme-default') && /(^|\/)styles\/fonts\.css$/.test(source)) {
      return fileURLToPath(new URL('../theme/fonts.css', import.meta.url))
    }
    return null
  }
}

/**
 * docs/public/app-index.json stays fetchable through raw.githubusercontent.com,
 * but it is not part of the deployed site, so remove the copy Vite emits.
 */
const dropAppIndexFromDist: Plugin = {
  name: 'aar-drop-app-index',
  apply: 'build',
  enforce: 'post',
  closeBundle() {
    rmSync(fileURLToPath(new URL('../dist/app-index.json', import.meta.url)), { force: true })
  }
}

function llmsSidebar(sidebar: DefaultTheme.Sidebar = []): DefaultTheme.Sidebar {
  const sanitizeItems = (items: DefaultTheme.SidebarItem[] = []): DefaultTheme.SidebarItem[] => items.flatMap((item) => {
    const nestedItems = item.items ? sanitizeItems(item.items) : undefined
    const link = isLlmPageLink(item.link) ? item.link : undefined
    if (!link && (!nestedItems || nestedItems.length === 0)) return []
    const sanitized = { ...item }
    if (typeof sanitized.text === 'string') sanitized.text = sanitized.text.replace(/<[^>]+>/g, '').trim()
    if (link) sanitized.link = link
    else delete sanitized.link
    if (nestedItems) sanitized.items = nestedItems
    else delete sanitized.items
    return [sanitized]
  })
  if (Array.isArray(sidebar)) return sanitizeItems(sidebar)
  return Object.fromEntries(Object.entries(sidebar).map(([route, value]) => [
    route, Array.isArray(value) ? sanitizeItems(value) : { ...value, items: sanitizeItems(value.items) }
  ]))
}

export const vite: UserConfig['vite'] = {
  plugins: [
    llmstxt({
      sidebar: llmsSidebar,
      excludeIndexPage: false,
      includeUnlistedPages: true,
      // Keep 404 and the maintainer-only count page out of llms.txt and
      // llms-full.txt. Their per-page Markdown copies are still emitted, so
      // Accept: text/markdown keeps working for every published route.
      ignoreFilesPerOutput: { llmsTxt: [...UNLISTED_PAGES], llmsFullTxt: [...UNLISTED_PAGES] }
    }),
    systemFontsPlugin,
    dropAppIndexFromDist
  ],
  build: {
    target: 'es2024',
    chunkSizeWarningLimit: 1000,
  },
  server: {
    warmup: { clientFiles: ['.vitepress/theme/**/*.{ts,tsx}'] },
    allowedHosts: true,
  },
  oxc: {
    jsx: { runtime: 'automatic', importSource: 'vue' },
    target: 'es2024'
  },

}
