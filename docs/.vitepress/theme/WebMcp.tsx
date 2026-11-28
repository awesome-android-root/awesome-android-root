import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useRouter, withBase } from 'vitepress'
import { parsePageIndex, toolInput, stringInput, resultLimit, findPage, urlHash } from './utils/mcp'
import { createSearchSession, loadPagefind } from './utils/search'
import type { PageRecord, ModelContext, ModelTool, ToolError, ToolErrorCode, ToolResult } from './utils/mcp'

class ToolFailure extends Error {
  constructor(readonly code: ToolErrorCode, message: string, readonly status?: number) { super(message) }
}

function errorSchema(codes: ToolErrorCode[]) {
  return {
    type: 'object',
    properties: {
      error: {
        type: 'object',
        properties: {
          code: { type: 'string', enum: codes },
          message: { type: 'string' },
          status: { type: 'integer' }
        },
        required: ['code', 'message'], additionalProperties: false
      }
    },
    required: ['error'], additionalProperties: false
  }
}

function collectionSchema(key: string, properties: Record<string, unknown>, codes: ToolErrorCode[]) {
  return { oneOf: [
    { type: 'object', properties: { [key]: { type: 'array', items: {
      type: 'object', properties, required: Object.keys(properties), additionalProperties: false
    } } }, required: [key], additionalProperties: false },
    errorSchema(codes)
  ] }
}

function validateInput(raw: unknown, keys: string[]) {
  try {
    const input = toolInput(raw)
    if (Object.keys(input).some((key) => !keys.includes(key))) throw new TypeError()
    return input
  } catch {
    throw new ToolFailure('INVALID_INPUT', 'Provide an input object with the documented properties.')
  }
}

function validateString(input: Record<string, unknown>, key: string, max: number) {
  try { return stringInput(input, key, max) }
  catch { throw new ToolFailure('INVALID_INPUT', `Provide a non-empty ${key} of at most ${max} characters.`) }
}

function validateLimit(input: Record<string, unknown>) {
  try { return resultLimit(input) }
  catch { throw new ToolFailure('INVALID_INPUT', 'Provide an integer maxResults from 1 to 10.') }
}

// Pagefind worker errors lose their original type, so do not infer availability
// from arbitrary exceptions. Probe the module only after loading fails.
async function searchEngine(signal: AbortSignal) {
  try { return await loadPagefind(withBase('/')) }
  catch (error) {
    signal.throwIfAborted()
    const url = withBase('/pagefind/pagefind.js')
    let response: Response
    try { response = await fetch(url, { signal }) }
    catch (probeError) {
      signal.throwIfAborted()
      // Fetch rejects with TypeError if this fixed same-origin request cannot be made.
      if (probeError instanceof TypeError) throw new ToolFailure('SEARCH_UNAVAILABLE', 'Search is unavailable. Try again later.')
      throw probeError
    }
    if (!response.ok) throw new ToolFailure('SEARCH_UNAVAILABLE', 'Search is unavailable. Try again later.')
    // The module is reachable: preserve the original error for internal diagnostics.
    throw error
  }
}

function executeTool(name: string, execute: ModelTool['execute']): ModelTool['execute'] {
  return async (input, context): Promise<ToolResult> => {
    try {
      context.signal.throwIfAborted()
      const result = await execute(input, context)
      context.signal.throwIfAborted()
      return result
    } catch (error) {
      context.signal.throwIfAborted()
      if (!(error instanceof ToolFailure)) console.error(`WebMCP tool ${name} failed:`, error)
      const failure = error instanceof ToolFailure ? error : new ToolFailure('INTERNAL_ERROR', 'The tool failed unexpectedly. Try again.')
      const result: ToolError = { error: { code: failure.code, message: failure.message } }
      if (failure.status !== undefined) result.error.status = failure.status
      return result
    }
  }
}

export default defineComponent((props: { onRegistration: (ready: Promise<void>) => void }) => {
  const router = useRouter()
  const registrationController = new AbortController()
  let pageIndexPromise: Promise<PageRecord[]> | undefined

  async function getPageIndex(signal: AbortSignal) {
    signal.throwIfAborted()
    if (!pageIndexPromise) {
      // Shared across executions so cancelling one does not cancel another's index fetch.
      pageIndexPromise = fetch(withBase('/page-index.json'))
        .then((response) => {
          if (!response.ok) throw new ToolFailure('PAGE_INDEX_UNAVAILABLE', 'Page index unavailable. Try again later.', response.status)
          return response.json() as Promise<unknown>
        })
        .then(parsePageIndex)
        .catch((error: unknown) => {
          pageIndexPromise = undefined
          if (error instanceof ToolFailure) throw error
          throw new ToolFailure('PAGE_INDEX_UNAVAILABLE', 'Page index unavailable. Try again later.')
        })
    }
    const pages = await pageIndexPromise
    signal.throwIfAborted()
    return pages
  }

  function registerTools(modelContext: ModelContext) {
    const tools: ModelTool[] = [
      {
        name: 'search_site',
        title: 'Search site content',
        description: 'Search the Android rooting guides, troubleshooting articles, and app/module directory.',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', minLength: 1, maxLength: 160, description: 'Words to search for in site documentation and app/module entries.' },
            maxResults: { type: 'integer', minimum: 1, maximum: 10, default: 5, description: 'Maximum number of search results to return.' }
          },
          required: ['query'], additionalProperties: false
        },
        outputSchema: collectionSchema('results', { title: { type: 'string' }, url: { type: 'string' }, excerpt: { type: 'string' } }, ['INVALID_INPUT', 'SEARCH_UNAVAILABLE', 'INTERNAL_ERROR']),
        annotations: { readOnlyHint: true, untrustedContentHint: true },
        execute: executeTool('search_site', async (rawInput, { signal }) => {
          const input = validateInput(rawInput, ['query', 'maxResults'])
          const query = validateString(input, 'query', 160)
          const maxResults = validateLimit(input)
          const engine = await searchEngine(signal)
          signal.throwIfAborted()
          const results = await createSearchSession().run(engine, query, maxResults)
          signal.throwIfAborted()
          return { results: (results ?? []).map((result) => ({
            title: result.meta.title || result.url,
            url: result.url,
            excerpt: result.plain_excerpt || result.excerpt.replace(/<\/?mark>/g, '')
          })) }
        })
      },
      {
        name: 'list_pages',
        title: 'List documentation pages',
        description: 'List available Android rooting documentation pages with their titles, Markdown URLs and page routes.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        outputSchema: collectionSchema('pages', { title: { type: 'string' }, url: { type: 'string' }, route: { type: 'string' } }, ['INVALID_INPUT', 'PAGE_INDEX_UNAVAILABLE', 'INTERNAL_ERROR']),
        annotations: { readOnlyHint: true },
        execute: executeTool('list_pages', async (input, { signal }) => {
          validateInput(input, [])
          const pages = await getPageIndex(signal)
          return { pages: pages.map(({ title, route, markdown }) => ({ title, url: withBase(markdown), route: withBase(route) })) }
        })
      },
      {
        name: 'get_page',
        title: 'Read a documentation page',
        description: 'Retrieve the Markdown for a page listed by list_pages, by its Markdown URL or page route.',
        inputSchema: {
          type: 'object',
          properties: { url: { type: 'string', minLength: 1, maxLength: 256, description: 'A listed Markdown URL or clean page route; a heading fragment is ignored.' } },
          required: ['url'], additionalProperties: false
        },
        annotations: { readOnlyHint: true, untrustedContentHint: true },
        execute: executeTool('get_page', async (rawInput, { signal }) => {
          const url = validateString(validateInput(rawInput, ['url']), 'url', 256)
          const pages = await getPageIndex(signal)
          const page = findPage(pages, url, withBase('/'))
          if (!page) throw new ToolFailure('PAGE_NOT_FOUND', 'Page not found. Use a URL from list_pages.')

          let response: Response
          try { response = await fetch(withBase(page.markdown), { signal }) }
          catch (error) {
            signal.throwIfAborted()
            throw new ToolFailure('PAGE_FETCH_FAILED', 'Could not fetch the documentation page. Try again later.')
          }
          if (!response.ok) throw new ToolFailure('PAGE_FETCH_FAILED', 'Could not fetch the documentation page. Try again later.', response.status)
          let markdown: string
          try { markdown = await response.text() }
          catch (error) {
            signal.throwIfAborted()
            throw new ToolFailure('PAGE_FETCH_FAILED', 'Could not read the documentation page. Try again later.')
          }
          return { title: page.title, url: withBase(page.markdown), markdown }
        })
      },
      {
        name: 'navigate_to_page',
        title: 'Navigate to a documentation page',
        description: 'Open a documentation page on this site. The URL must match a page listed by list_pages, or a search result on a listed page, or be / for the homepage.',
        inputSchema: {
          type: 'object',
          properties: { url: { type: 'string', minLength: 1, maxLength: 256, description: 'A listed Markdown URL, clean page route or search result URL; heading fragments are preserved.' } },
          required: ['url'], additionalProperties: false
        },
        execute: executeTool('navigate_to_page', async (rawInput, { signal }) => {
          const url = validateString(validateInput(rawInput, ['url']), 'url', 256)
          const pages = await getPageIndex(signal)
          const page = findPage(pages, url, withBase('/'))
          if (!page) throw new ToolFailure('PAGE_NOT_FOUND', 'Page not found. Use a URL from list_pages or search_site.')

          const target = withBase(page.route) + urlHash(url)
          signal.throwIfAborted()
          await router.go(target)
          return { navigatedTo: target }
        })
      }
    ]

    // Catch synchronous throws as well as promise rejections, independently for each tool.
    return Promise.all(tools.map(async (tool) => {
      try { await modelContext.registerTool(tool, { signal: registrationController.signal }) }
      catch (error) {
        if (!registrationController.signal.aborted) console.error(`Failed to register WebMCP tool ${tool.name}:`, error)
      }
    })).then(() => {})
  }

  onMounted(() => {
    const modelContext = document.modelContext
    if (typeof modelContext?.registerTool === 'function') props.onRegistration(registerTools(modelContext))
    else props.onRegistration(Promise.resolve())
  })

  onUnmounted(() => registrationController.abort())

  return () => (
    <span hidden aria-hidden="true"></span>
  )
}, { props: ['onRegistration'] })
