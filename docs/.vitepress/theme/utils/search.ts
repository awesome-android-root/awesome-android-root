/** Minimal contract for the generated Pagefind browser module, not its Node API. */
export interface SearchResult {
  url: string
  excerpt: string
  plain_excerpt?: string
  meta: { title?: string }
  sub_results?: { title: string; url: string; excerpt: string }[]
}
export interface SearchResponse {
  results: { id: string; data(): Promise<SearchResult> }[]
}
export interface PagefindBrowser {
  init(): Promise<void>
  destroy(): Promise<void>
  options(options: { baseUrl: string; excerptLength: number }): Promise<void>
  search(query: string): Promise<SearchResponse>
}

/** Isolate loader state so a late failed import cannot evict a fresh Retry. */
export function createPagefindLoader(importModule: (path: string) => Promise<PagefindBrowser>) {
  let importAttempts = 0
  let pagefindPromise: Promise<PagefindBrowser> | undefined
  return {
    load(base: string): Promise<PagefindBrowser> {
      if (!pagefindPromise) {
        const suffix = importAttempts++ ? `?retry=${importAttempts}` : ''
        const path = `${base}pagefind/pagefind.js${suffix}`
        const pending = importModule(path).then(async (module) => {
          await module.options({ baseUrl: base, excerptLength: 32 })
          return module
        }).catch((error: unknown) => {
          if (pagefindPromise === pending) pagefindPromise = undefined
          throw error
        })
        pagefindPromise = pending
      }
      return pagefindPromise
    },
    /** Drop failed worker/chunk promises before an explicit UI retry. */
    async reset(): Promise<void> {
      const previous = pagefindPromise
      pagefindPromise = undefined
      try { await (await previous)?.destroy() } catch { /* A failed import has no instance to destroy. */ }
    }
  }
}

const loader = createPagefindLoader((path) => import(/* @vite-ignore */ path))
export const loadPagefind = loader.load
export const resetPagefind = loader.reset

/** Exact titles win over incidental mentions, without distorting Pagefind's
 * corpus-wide relevance weights. Prefix ties prefer the more focused title. */
export function rankTitles(results: SearchResult[], query: string): SearchResult[] {
  const normalize = (text: string) => text.toLocaleLowerCase().replace(/[^\p{L}\p{N}+#]+/gu, ' ').trim()
  const term = normalize(query)
  if (!term) return results
  const rank = (result: SearchResult) => {
    const title = normalize(result.meta.title || '')
    return title === term ? 2 : title.startsWith(term) ? 1 : 0
  }
  return results.toSorted((a, b) => rank(b) - rank(a) || (rank(a) === 1
    ? (a.meta.title?.length || 0) - (b.meta.title?.length || 0) : 0))
}

/** Guards async searches, including fragment fetches, against stale responses. */
export function createSearchSession() {
  let revision = 0
  return {
    cancel() { revision++ },
    async run(engine: PagefindBrowser, query: string, limit = 12): Promise<SearchResult[] | null> {
      const current = ++revision
      if (!query.trim()) return []
      const response = await engine.search(query.trim())
      if (current !== revision) return null
      const results = await Promise.all(response.results.slice(0, limit).map((result) => result.data()))
      return current === revision ? rankTitles(results, query) : null
    }
  }
}
