import { afterAll, afterEach, beforeAll, beforeEach, expect, setDefaultTimeout, test } from 'bun:test'
import type { HTTPRequest, Page } from 'puppeteer-core'
import type { ModelTool } from '../docs/.vitepress/theme/utils/mcp.ts'
import { baseURL, startBrowser } from './browser.ts'

declare global {
  interface Window {
    mcpTest: {
      tools: Record<string, ModelTool>
      signals: AbortSignal[]
      ready?: Promise<unknown>
      release?: () => void
      settled: boolean
    }
  }
}

setDefaultTimeout(30_000)
let suite: Awaited<ReturnType<typeof startBrowser>>
let page: Page
beforeAll(async () => { suite = await startBrowser() })
afterAll(async () => { await suite?.stop() })
beforeEach(async () => {
  page = await (await suite.browser.createBrowserContext()).newPage()
  // Isolate request interception from cached modules and service workers.
  await page.setCacheEnabled(false)
  await page.setBypassServiceWorker(true)
  page.setDefaultTimeout(5_000)
  page.setDefaultNavigationTimeout(10_000)
})
afterEach(async () => { await page?.browserContext().close() })

async function installContext(options: { delayed?: boolean; fail?: boolean; noWait?: boolean } = {}) {
  await page.evaluateOnNewDocument((options) => {
    const state: Window['mcpTest'] = { tools: {}, signals: [], settled: false }
    window.mcpTest = state
    const delay = new Promise<void>((resolve) => { state.release = resolve })
    const modelContext = {
      async registerTool(tool: ModelTool, { signal }: { signal: AbortSignal }) {
        state.tools[tool.name] = tool
        state.signals.push(signal)
        if (options.delayed && tool.name === 'search_site') await delay
        if (options.fail && tool.name === 'list_pages') throw new Error('registration rejected')
      },
      ...(options.noWait ? {} : { waitForToolsUntil(promise: Promise<unknown>) {
        state.ready = promise
        void promise.then(() => { state.settled = true })
      } })
    }
    Object.defineProperty(document, 'modelContext', { value: modelContext, configurable: true })
  }, options)
  await page.goto(baseURL)
  await page.waitForFunction(() => Object.keys(window.mcpTest.tools).length === 4)
}

test('unsupported document does not load the component, even with a legacy navigator API', async () => {
  const requests: string[] = []
  const errors: string[] = []
  page.on('request', (request) => { requests.push(request.url()) })
  page.on('pageerror', (error) => { errors.push(String(error)) })
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(document, 'modelContext', { value: undefined, configurable: true })
    Object.defineProperty(navigator, 'modelContext', { value: { registerTool() { throw new Error('legacy used') } }, configurable: true })
  })
  await page.goto(baseURL, { waitUntil: 'networkidle0' })
  expect(requests.some((url) => /\/WebMcp\.[^/]+\.js/.test(url))).toBe(false)
  expect(errors).toEqual([])
})

test('a non-callable registerTool is treated as unsupported', async () => {
  const requests: string[] = []
  page.on('request', (request) => { requests.push(request.url()) })
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(document, 'modelContext', { value: { registerTool: true }, configurable: true })
  })
  await page.goto(baseURL, { waitUntil: 'networkidle0' })
  expect(requests.some((url) => /\/WebMcp\.[^/]+\.js/.test(url))).toBe(false)
})

test('readiness covers the lazy component import as well as registration', async () => {
  let notifyHeld: (() => void) | undefined
  const held = new Promise<void>((resolve) => { notifyHeld = resolve })
  const requests: HTTPRequest[] = []
  let released = false
  await page.setRequestInterception(true)
  page.on('request', (request) => {
    if (!released && /\/WebMcp\.[^/]+\.js/.test(request.url())) {
      requests.push(request)
      notifyHeld?.()
    } else void request.continue()
  })
  const installation = installContext({ delayed: true })
  void installation.catch(() => {})
  // Do not leave intercepted requests or navigation hanging if this assertion fails.
  let timeout: ReturnType<typeof setTimeout> | undefined
  try {
    await Promise.race([held, new Promise<never>((_resolve, reject) => {
      timeout = setTimeout(() => reject(new Error('WebMCP component request did not start')), 8_000)
    })])
    await page.waitForFunction(() => !!window.mcpTest.ready)
    expect(await page.evaluate(() => window.mcpTest.settled)).toBe(false)
  } finally {
    clearTimeout(timeout)
    released = true
    await Promise.all(requests.map((request) => request.continue()))
  }
  await installation
  expect(await page.evaluate(() => window.mcpTest.settled)).toBe(false)
  await page.evaluate(async () => { window.mcpTest.release?.(); await window.mcpTest.ready })
  expect(await page.evaluate(() => window.mcpTest.settled)).toBe(true)
})

test('registers tool contracts, tracks all attempts, and aborts registrations on disposal', async () => {
  await installContext({ delayed: true, fail: true })
  const contracts = await page.evaluate(() => Object.values(window.mcpTest.tools).map(({ name, inputSchema, outputSchema, annotations }) => ({ name, inputSchema, outputSchema, annotations })))
  expect(contracts.map((tool) => tool.name)).toEqual(['search_site', 'list_pages', 'get_page', 'navigate_to_page'])
  expect(contracts.map((tool) => tool.annotations)).toEqual([
    { readOnlyHint: true, untrustedContentHint: true }, { readOnlyHint: true },
    { readOnlyHint: true, untrustedContentHint: true }, undefined
  ])
  expect(contracts.map((tool) => !!tool.outputSchema)).toEqual([true, true, false, false])
  for (const [tool, field, itemFields] of [[contracts[0], 'results', ['title', 'url', 'excerpt']], [contracts[1], 'pages', ['title', 'url', 'route']]] as const) {
    const schema = tool.outputSchema as { oneOf: [{ properties: Record<string, { items: { required: string[] } }> }, { properties: { error: { required: string[] } } }] }
    expect(schema.oneOf[0].properties[field].items.required).toEqual([...itemFields])
    expect(schema.oneOf[1].properties.error.required).toEqual(['code', 'message'])
  }
  const searchSchema = contracts[0].inputSchema as { properties: { query: { description: string }; maxResults: { description: string; default: number } } }
  expect(searchSchema.properties.query.description).toBeTruthy()
  expect(searchSchema.properties.maxResults.description).toBeTruthy()
  expect(searchSchema.properties.maxResults.default).toBe(5)
  for (const tool of contracts.slice(2)) {
    const schema = tool.inputSchema as { properties: { url: { description: string } } }
    expect(schema.properties.url.description).toContain('fragment')
  }
  expect(await page.evaluate(() => !!window.mcpTest.ready && !window.mcpTest.settled)).toBe(true)
  await page.evaluate(async () => { window.mcpTest.release?.(); await window.mcpTest.ready })
  expect(await page.evaluate(() => window.mcpTest.settled)).toBe(true)
  expect(await page.evaluate(() => {
    const root = document.querySelector('#app') as HTMLElement & { __vue_app__?: { unmount(): void } }
    root.__vue_app__?.unmount()
    return window.mcpTest.signals.length === 4 && window.mcpTest.signals.every((signal) => signal.aborted)
  })).toBe(true)
})

test('disposal aborts registrations but readiness still waits for started attempts', async () => {
  await installContext({ delayed: true })
  expect(await page.evaluate(() => {
    const root = document.querySelector('#app') as HTMLElement & { __vue_app__?: { unmount(): void } }
    root.__vue_app__?.unmount()
    return window.mcpTest.signals.every((signal) => signal.aborted) && !window.mcpTest.settled
  })).toBe(true)
  await page.evaluate(async () => { window.mcpTest.release?.(); await window.mcpTest.ready })
  expect(await page.evaluate(() => window.mcpTest.settled)).toBe(true)
})

test('actual callbacks search directly, list, read, validate, cancel and navigate', async () => {
  await installContext({ noWait: true })
  const result = await page.evaluate(async () => {
    const tools = window.mcpTest.tools
    const base = location.pathname
    const context = { signal: new AbortController().signal }
    const search = await tools.search_site.execute({ query: 'AdAway' }, context)
    const invalid = await tools.search_site.execute({ query: 'AdAway', maxResults: null }, context)
    const pages = await tools.list_pages.execute({}, context)
    const markdown = await tools.get_page.execute({ url: `${base}rooting-guides.md#quick-navigation` }, context)
    const route = await tools.get_page.execute({ url: `${base}rooting-guides/` }, context)
    const missing = await tools.get_page.execute({ url: 'https://example.org/unknown' }, context)
    return { search, invalid, pages, markdown, route, missing }
  })
  expect('results' in result.search && result.search.results.some((item) => item.title.includes('AdAway'))).toBe(true)
  expect(result.invalid).toEqual({ error: { code: 'INVALID_INPUT', message: 'Provide an integer maxResults from 1 to 10.' } })
  expect('pages' in result.pages && result.pages.pages.length > 0).toBe(true)
  expect('pages' in result.pages && result.pages.pages.some((item) => ['/404', '/count'].includes(item.route.replace(new URL(baseURL).pathname.slice(0, -1), '')))).toBe(false)
  expect('markdown' in result.markdown && result.markdown.markdown.length > 0).toBe(true)
  expect(result.route).toEqual(result.markdown)
  expect(result.missing).toEqual({ error: { code: 'PAGE_NOT_FOUND', message: 'Page not found. Use a URL from list_pages.' } })

  const cancelled = await page.evaluate(async () => {
    const originalFetch = window.fetch
    let fetchedSignal: AbortSignal | null | undefined
    let notifyFetch: (() => void) | undefined
    const fetchStarted = new Promise<void>((resolve) => { notifyFetch = resolve })
    window.fetch = Object.assign((input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input).endsWith('/rooting-guides.md')) {
        fetchedSignal = init?.signal
        notifyFetch?.()
        return new Promise<Response>((_resolve, reject) => init?.signal?.addEventListener('abort', () => reject(init.signal?.reason)))
      }
      return originalFetch(input, init)
    }, { preconnect: originalFetch.preconnect })
    const controller = new AbortController()
    const pending = window.mcpTest.tools.get_page.execute({ url: `${location.pathname}rooting-guides/` }, { signal: controller.signal })
    let timeout: ReturnType<typeof setTimeout> | undefined
    try {
      await Promise.race([fetchStarted, new Promise<never>((_resolve, reject) => {
        timeout = setTimeout(() => reject(new Error('Markdown fetch did not start')), 5_000)
      })])
    } finally { clearTimeout(timeout) }
    controller.abort()
    try { await pending; return false }
    catch { return !!fetchedSignal?.aborted && fetchedSignal === controller.signal }
    finally { window.fetch = originalFetch }
  })
  expect(cancelled).toBe(true)
  const navigation = await page.evaluate(async () => window.mcpTest.tools.navigate_to_page.execute({ url: `${location.pathname}rooting-guides.md#quick-navigation` }, { signal: new AbortController().signal }))
  const target = new URL('rooting-guides/#quick-navigation', baseURL)
  expect(navigation).toEqual({ navigatedTo: target.pathname + target.hash })
  expect(new URL(page.url()).pathname).toBe(target.pathname)
  expect(new URL(page.url()).hash).toBe(target.hash)
  expect(await page.evaluate(() => !!document.getElementById('quick-navigation'))).toBe(true)
})

test('tool failures return actionable errors and index failures can be retried', async () => {
  await installContext()
  const failures = await page.evaluate(async () => {
    const originalFetch = window.fetch
    let indexAttempts = 0
    window.fetch = Object.assign((input: RequestInfo | URL, init?: RequestInit) => {
      if (String(input).endsWith('/page-index.json') && indexAttempts++ === 0) return Promise.resolve(new Response('', { status: 503 }))
      if (String(input).endsWith('/rooting-guides.md')) return Promise.resolve(new Response('', { status: 404 }))
      return originalFetch(input, init)
    }, { preconnect: originalFetch.preconnect })
    const context = { signal: new AbortController().signal }
    try {
      const index = await window.mcpTest.tools.list_pages.execute({}, context)
      const page = await window.mcpTest.tools.get_page.execute({ url: `${location.pathname}rooting-guides/` }, context)
      const invalid = await window.mcpTest.tools.navigate_to_page.execute({ url: 42 }, context)
      return { index, page, invalid, indexAttempts }
    } finally { window.fetch = originalFetch }
  })
  expect(failures.index).toEqual({ error: { code: 'PAGE_INDEX_UNAVAILABLE', message: 'Page index unavailable. Try again later.', status: 503 } })
  expect(failures.page).toEqual({ error: { code: 'PAGE_FETCH_FAILED', message: 'Could not fetch the documentation page. Try again later.', status: 404 } })
  expect(failures.invalid).toEqual({ error: { code: 'INVALID_INPUT', message: 'Provide a non-empty url of at most 256 characters.' } })
  expect(failures.indexAttempts).toBe(2)
})

test('search reports an unavailable Pagefind without exposing the exception', async () => {
  await page.setRequestInterception(true)
  page.on('request', (request) => {
    if (request.url().includes('/pagefind/')) void request.abort()
    else void request.continue()
  })
  await installContext()
  const result = await page.evaluate(async () => window.mcpTest.tools.search_site.execute({ query: 'AdAway' }, { signal: new AbortController().signal }))
  expect(result).toEqual({ error: { code: 'SEARCH_UNAVAILABLE', message: 'Search is unavailable. Try again later.' } })
})

test('unexpected search errors are logged but not exposed to the agent', async () => {
  await page.setRequestInterception(true)
  page.on('request', (request) => {
    if (request.url().includes('/pagefind/pagefind.js')) {
      void request.respond({
        status: 200, contentType: 'text/javascript',
        body: `export async function options() {};
          export async function search() { return { results: [{ id: 'bad', data: async () => ({ meta: null }) }] }; }`
      })
    } else void request.continue()
  })
  await installContext()
  const outcome = await page.evaluate(async () => {
    const logged: string[] = []
    const original = console.error
    console.error = (...args: unknown[]) => { logged.push(args.map(String).join(' ')) }
    try {
      const result = await window.mcpTest.tools.search_site.execute({ query: 'test' }, { signal: new AbortController().signal })
      const invalid = await window.mcpTest.tools.search_site.execute({ query: '' }, { signal: new AbortController().signal })
      const controller = new AbortController()
      controller.abort()
      try { await window.mcpTest.tools.search_site.execute({ query: 'test' }, { signal: controller.signal }) } catch { /* cancellation is not an error result */ }
      return { result, invalid, logged }
    } finally { console.error = original }
  })
  expect(outcome.result).toEqual({ error: { code: 'INTERNAL_ERROR', message: 'The tool failed unexpectedly. Try again.' } })
  expect('error' in outcome.invalid && outcome.invalid.error.code).toBe('INVALID_INPUT')
  expect(outcome.logged).toHaveLength(1)
  expect(outcome.logged[0]).toContain('WebMCP tool search_site failed:')
  expect(outcome.logged[0]).toContain('TypeError')
})

test('Pagefind search failures remain actionable availability errors', async () => {
  await page.setRequestInterception(true)
  page.on('request', (request) => {
    if (request.url().includes('/pagefind/pagefind.js')) {
      void request.respond({
        status: 200, contentType: 'text/javascript',
        body: `export async function options() {};
          export async function search(query) {
            if (query === 'data') return { results: [{ id: 'broken', data: async () => { throw new Error('private fragment failure'); } }] };
            throw new Error('private Pagefind failure');
          }`
      })
    } else void request.continue()
  })
  await installContext()
  const results = await page.evaluate(async () => {
    const context = { signal: new AbortController().signal }
    return Promise.all(['test', 'data'].map((query) => window.mcpTest.tools.search_site.execute({ query }, context)))
  })
  for (const result of results) expect(result).toEqual({ error: { code: 'SEARCH_UNAVAILABLE', message: 'Search is unavailable. Try again later.' } })
})
