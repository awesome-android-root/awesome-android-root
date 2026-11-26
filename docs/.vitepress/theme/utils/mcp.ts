export interface PageRecord { url: string; title: string; content: string }
export type ToolResult =
  | { results: { title: string; url: string; excerpt: string }[] }
  | { pages: { title: string; url: string }[] }
  | { title: string; url: string; markdown: string }
  | { navigatedTo: string }
export interface ToolContext { signal: AbortSignal }
export interface ModelTool {
  name: string
  title: string
  description: string
  inputSchema: Record<string, unknown>
  annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean }
  execute(input: unknown, context: ToolContext): Promise<ToolResult>
}
export interface ModelContext {
  registerTool(tool: ModelTool, options: { signal: AbortSignal }): Promise<void>
}
declare global {
  interface Document { modelContext?: ModelContext }
  interface Navigator { modelContext?: ModelContext }
}

export function parsePageIndex(markdown: string): PageRecord[] {
  return markdown.split(/(?=^---\nurl:\s*\/)/m).flatMap((section) => {
    const frontmatterEnd = section.indexOf('\n---\n', 4)
    if (frontmatterEnd === -1) return []
    const frontmatter = section.slice(4, frontmatterEnd)
    const content = section.slice(frontmatterEnd + 5).trim()
    const url = frontmatter.match(/^url:\s*(\/[^\n]+)$/m)?.[1]
    // Only same-site paths, not protocol-relative or malformed external URLs.
    if (!url || url.startsWith('//') || /[\\\s]/.test(url)) return []
    return [{ url, title: content.match(/^#\s+(.+)$/m)?.[1] ?? url, content }]
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
  const value = input.maxResults ?? 5
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1 || value > 10) {
    throw new TypeError('maxResults must be an integer from 1 to 10')
  }
  return value
}

/** Compare Markdown listing URLs with clean Pagefind URLs, including subpaths. */
export function pageRoute(url: string, base = '/'): string {
  const path = url.split('#')[0]
  const local = base !== '/' && path.startsWith(base) ? '/' + path.slice(base.length) : path
  return local.replace(/\.md$/, '').replace(/\/$/, '') || '/'
}
