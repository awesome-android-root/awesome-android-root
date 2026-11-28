/** One record of the build-time `page-index.json` (see scripts/page-index.ts). */
export interface PageRecord { title: string; route: string; markdown: string }
export type ToolErrorCode = 'INVALID_INPUT' | 'SEARCH_UNAVAILABLE' | 'PAGE_INDEX_UNAVAILABLE' | 'PAGE_NOT_FOUND' | 'PAGE_FETCH_FAILED' | 'INTERNAL_ERROR'
export interface ToolError { error: { code: ToolErrorCode; message: string; status?: number } }
export type ToolResult =
  | ToolError
  | { results: { title: string; url: string; excerpt: string }[] }
  | { pages: { title: string; url: string; route: string }[] }
  | { title: string; url: string; markdown: string }
  | { navigatedTo: string }
export interface ToolContext { signal: AbortSignal }
export interface ModelTool {
  name: string
  title: string
  description: string
  inputSchema: Record<string, unknown>
  outputSchema?: Record<string, unknown>
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean }
  execute(input: unknown, context: ToolContext): Promise<ToolResult>
}
export interface ModelContext {
  registerTool(tool: ModelTool, options: { signal: AbortSignal }): Promise<void>
  waitForToolsUntil?(promise: Promise<unknown>): void
}
declare global {
  interface Document { modelContext?: ModelContext }
}

/** Not documentation (404) or maintainer-only (count); never offered to agents. */
const UNLISTED_ROUTES = new Set(['/404', '/count'])

/** Same-site, base-relative path without a hash, query, backslash or whitespace. */
function isLocalPath(value: unknown): value is string {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') && !/[\\\s#?]/.test(value)
}

/** Validate the fetched page index; the payload is untrusted runtime input. */
export function parsePageIndex(payload: unknown): PageRecord[] {
  const pages = payload && typeof payload === 'object' ? (payload as { pages?: unknown }).pages : undefined
  if (!Array.isArray(pages)) throw new TypeError('Page index must be an object with a pages array')
  return pages.flatMap((page: unknown) => {
    if (!page || typeof page !== 'object') return []
    const { title, route, markdown } = page as Record<string, unknown>
    if (typeof title !== 'string' || !title.trim() || !isLocalPath(route) || !isLocalPath(markdown) || !markdown.endsWith('.md')) return []
    if (UNLISTED_ROUTES.has(pageRoute(route))) return []
    return [{ title: title.trim(), route, markdown }]
  })
}

export function toolInput(input: unknown): Record<string, unknown> {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new TypeError('input must be an object')
  return input as Record<string, unknown>
}
export function stringInput(input: Record<string, unknown>, key: string, max: number): string {
  const value = input[key]
  if (typeof value !== 'string' || !value.trim() || value.length > max) {
    throw new TypeError(`${key} must be a non-empty string of at most ${max} characters`)
  }
  return value.trim()
}
export function resultLimit(input: Record<string, unknown>): number {
  const value = input.maxResults === undefined ? 5 : input.maxResults
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1 || value > 10) {
    throw new TypeError('maxResults must be an integer from 1 to 10')
  }
  return value
}

/**
 * Comparison key for page URLs: strips the hash, query, configured base,
 * `.md`/`.html`, a trailing `index` and trailing slashes, so `/index.md`, `/`,
 * `/rooting-guides.md`, `/rooting-guides/` and `/rooting-guides/index.md` match
 * the routes in the page index and the clean URLs Pagefind returns.
 */
export function pageRoute(url: string, base = '/'): string {
  let path = url.split('#')[0].split('?')[0]
  if (base !== '/') {
    if (`${path}/` === base) path = '/'
    else if (path.startsWith(base)) path = `/${path.slice(base.length)}`
  }
  return path.replace(/\.(md|html)$/, '').replace(/(^|\/)index$/, '$1').replace(/\/+$/, '') || '/'
}

/** The listed page a caller URL refers to, in either route or Markdown form. */
export function findPage(pages: readonly PageRecord[], url: string, base = '/'): PageRecord | undefined {
  const key = pageRoute(url, base)
  return pages.find((page) => pageRoute(page.route) === key)
}

/** The `#fragment` of a URL, including the `#`, or an empty string. */
export function urlHash(url: string): string {
  const index = url.indexOf('#')
  return index === -1 ? '' : url.slice(index)
}
