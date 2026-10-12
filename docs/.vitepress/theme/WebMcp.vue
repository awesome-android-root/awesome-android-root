<template>
  <span hidden aria-hidden="true"></span>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vitepress'

const router = useRouter()
const registrationController = new AbortController()
let pageIndexPromise

function parsePageIndex(markdown) {
  return markdown.split(/(?=^---\nurl:\s*\/)/m).flatMap((section) => {
    const frontmatterEnd = section.indexOf('\n---\n', 4)
    if (frontmatterEnd === -1) return []

    const frontmatter = section.slice(4, frontmatterEnd)
    const content = section.slice(frontmatterEnd + 5).trim()
    const url = frontmatter.match(/^url:\s*(\/[^\n]+)$/m)?.[1]
    if (!url) return []

    return [{
      url,
      title: content.match(/^#\s+(.+)$/m)?.[1] ?? url,
      content
    }]
  })
}

async function getPageIndex(signal) {
  if (signal.aborted) throw signal.reason

  if (!pageIndexPromise) {
    pageIndexPromise = fetch('/llms-full.txt')
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

function assertActive(signal) {
  if (signal.aborted) throw signal.reason
}

function registerTools(modelContext) {
  const tools = [
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
      execute: async ({ query, maxResults = 5 }, { signal }) => {
        const normalizedQuery = query.trim().toLowerCase()
        if (!normalizedQuery) throw new TypeError('query must not be empty')

        const pages = await getPageIndex(signal)
        const results = pages.flatMap((page) => {
          const matchIndex = page.content.toLowerCase().indexOf(normalizedQuery)
          if (matchIndex === -1) return []

          const start = Math.max(0, matchIndex - 180)
          const end = Math.min(page.content.length, matchIndex + normalizedQuery.length + 260)
          return [{
            title: page.title,
            url: page.url,
            excerpt: page.content.slice(start, end).replace(/\s+/g, ' ').trim()
          }]
        })

        assertActive(signal)
        return { results: results.slice(0, Math.min(maxResults, 10)) }
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
      execute: async ({ url }, { signal }) => {
        const pages = await getPageIndex(signal)
        const page = pages.find((entry) => entry.url === url)
        if (!page) throw new TypeError('url must match a documentation page from list_pages')

        const response = await fetch(page.url, { signal })
        if (!response.ok) throw new Error(`Page request failed: ${response.status}`)
        return { title: page.title, url: page.url, markdown: await response.text() }
      }
    },
    {
      name: 'navigate_to_page',
      title: 'Navigate to a documentation page',
      description: 'Open a documentation page on this site. The URL must match a page listed by list_pages, or be / for the homepage.',
      inputSchema: {
        type: 'object',
        properties: { url: { type: 'string', minLength: 1, maxLength: 256 } },
        required: ['url'],
        additionalProperties: false
      },
      execute: async ({ url }, { signal }) => {
        const pages = await getPageIndex(signal)
        assertActive(signal)
        if (url !== '/' && !pages.some((page) => page.url === url)) {
          throw new TypeError('url must match a documentation page from list_pages, or be /')
        }

        await router.go(url)
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
  const modelContext = navigator.modelContext ?? document.modelContext
  if (modelContext?.registerTool) registerTools(modelContext)
})

onUnmounted(() => registrationController.abort())
</script>