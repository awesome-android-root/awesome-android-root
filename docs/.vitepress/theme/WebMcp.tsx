import { defineComponent, onMounted, onUnmounted } from 'vue'
import { useRouter, withBase } from 'vitepress'
import { parsePageIndex, toolInput, stringInput, resultLimit, pageRoute } from './utils/mcp'
import { createSearchSession, loadPagefind } from './utils/search'
import type { PageRecord, ModelContext, ModelTool } from './utils/mcp'

export default defineComponent(() => {
  const router = useRouter()
  const registrationController = new AbortController()
  let pageIndexPromise: Promise<PageRecord[]> | undefined

  async function getPageIndex(signal: AbortSignal) {
    if (signal.aborted) throw signal.reason

    if (!pageIndexPromise) {
      pageIndexPromise = fetch(withBase('/llms-full.txt'))
        .then((response) => {
          if (!response.ok) throw new Error(`Page index request failed: ${response.status}`)
          return response.text()
        })
        .then(parsePageIndex)
        .catch((error) => {
          pageIndexPromise = undefined
          throw error
        })
    }

    const pages = await pageIndexPromise
    if (signal.aborted) throw signal.reason
    return pages
  }

  function assertActive(signal: AbortSignal) {
    if (signal.aborted) throw signal.reason
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
            query: { type: 'string', minLength: 1, maxLength: 160 },
            maxResults: { type: 'integer', minimum: 1, maximum: 10 }
          },
          required: ['query'],
          additionalProperties: false
        },
        annotations: { readOnlyHint: true, untrustedContentHint: true },
        execute: async (rawInput, { signal }) => {
          const input = toolInput(rawInput)
          const query = stringInput(input, 'query', 160)
          const maxResults = resultLimit(input)
          const engine = await loadPagefind(withBase('/'))
          assertActive(signal)
          const results = await createSearchSession().run(engine, query, maxResults)
          assertActive(signal)
          return { results: (results ?? []).map((result) => ({
            title: result.meta.title || result.url,
            url: result.url,
            excerpt: result.plain_excerpt || result.excerpt.replace(/<\/?mark>/g, '')
          })) }
        }
      },
      {
        name: 'list_pages',
        title: 'List documentation pages',
        description: 'List available Android rooting documentation pages with their titles and Markdown URLs.',
        inputSchema: { type: 'object', properties: {}, additionalProperties: false },
        annotations: { readOnlyHint: true },
        execute: async (_input, { signal }) => {
          const pages = await getPageIndex(signal)
          assertActive(signal)
          return { pages: pages.map(({ title, url }) => ({ title, url })) }
        }
      },
      {
        name: 'get_page',
        title: 'Read a documentation page',
        description: 'Retrieve the Markdown for a page listed by list_pages.',
        inputSchema: {
          type: 'object',
          properties: { url: { type: 'string', minLength: 1, maxLength: 256 } },
          required: ['url'],
          additionalProperties: false
        },
        annotations: { readOnlyHint: true, untrustedContentHint: true },
        execute: async (rawInput, { signal }) => {
          const url = stringInput(toolInput(rawInput), 'url', 256)
          const pages = await getPageIndex(signal)
          const page = pages.find((entry) => entry.url === url)
          if (!page) throw new TypeError('url must match a documentation page from list_pages')

          assertActive(signal)
          // The index already holds every page body, so no second request is needed.
          return { title: page.title, url: page.url, markdown: page.content }
        }
      },
      {
        name: 'navigate_to_page',
        title: 'Navigate to a documentation page',
        description: 'Open a documentation page on this site. The URL must match a page listed by list_pages, or a search result on a listed page, or be / for the homepage.',
        inputSchema: {
          type: 'object',
          properties: { url: { type: 'string', minLength: 1, maxLength: 256 } },
          required: ['url'],
          additionalProperties: false
        },
        execute: async (rawInput, { signal }) => {
          const url = stringInput(toolInput(rawInput), 'url', 256)
          const pages = await getPageIndex(signal)
          assertActive(signal)
          if (pageRoute(url, withBase('/')) !== '/' && !pages.some((page) => pageRoute(page.url, withBase('/')) === pageRoute(url, withBase('/')))) {
            throw new TypeError('url must match a documentation page from list_pages, or be /')
          }

          const hash = url.includes('#') ? '#' + url.split('#').slice(1).join('#') : ''
          await router.go(withBase(pageRoute(url, withBase('/')) + hash))
          return { navigatedTo: url }
        }
      }
    ]

    for (const tool of tools) {
      modelContext.registerTool(tool, { signal: registrationController.signal }).catch((error) => {
        if (!registrationController.signal.aborted) {
          console.error(`Failed to register WebMCP tool ${tool.name}:`, error)
        }
      })
    }
  }

  onMounted(() => {
    const modelContext = document.modelContext ?? navigator.modelContext
    if (modelContext?.registerTool) registerTools(modelContext)
  })

  onUnmounted(() => registrationController.abort())

  return () => (
    <span hidden aria-hidden="true"></span>
  )
})
