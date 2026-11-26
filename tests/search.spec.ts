import { afterAll, afterEach, beforeAll, beforeEach, expect, setDefaultTimeout, test } from 'bun:test'
import { expect as browserExpect } from '@playwright/test'
import type { Page } from '@playwright/test'
import { baseURL, startBrowser } from './browser.ts'
import type { ModelTool } from '../docs/.vitepress/theme/utils/mcp'
import type { PagefindBrowser, SearchResult } from '../docs/.vitepress/theme/utils/search'

declare global { interface Window { testMcpTools?: ModelTool[] } }

const base = process.env.SITE_BASE || '/'
setDefaultTimeout(30_000)
let suite: Awaited<ReturnType<typeof startBrowser>>
let page: Page
let browserErrors: string[]
beforeAll(async () => { suite = await startBrowser() })
afterAll(async () => { await suite?.stop() })
beforeEach(async () => {
  const context = await suite.browser.newContext({ baseURL })
  page = await context.newPage()
  browserErrors = []
  page.on('pageerror', (error) => browserErrors.push(error.message))
  page.on('console', (message) => { if (message.text().startsWith('[Vue warn]')) browserErrors.push(message.text()) })
})
afterEach(async () => {
  await page?.context().close()
  expect(browserErrors).toEqual([])
})

test('Pagefind relevance against actual directory content', async () => {
  await page.goto('./')
  const found = await page.evaluate(async (base) => {
    const pf: PagefindBrowser = await import(/* @vite-ignore */ `${base}pagefind/pagefind.js`)
    await pf.options({ baseUrl: base, excerptLength: 32 })
    const output: Record<string, SearchResult[]> = {}
    for (const query of ['AdAway', 'AdAw', 'topjohnwu', 'hosts', 'privacy', 'Zygisk', 'Play Integrity', 'adaway', 'AdAwayy', 'C++', '"zzzxqnevermatch"', '']) {
      const response = await pf.search(query)
      output[query] = await Promise.all(response.results.slice(0, 5).map((result) => result.data()))
    }
    return output
  }, base)
  expect(found.AdAway.some((result) => result.meta.title === 'AdAway')).toBe(true)
  expect(found.AdAw.some((result) => result.meta.title === 'AdAway')).toBe(true)
  expect(found.adaway[0].url).toBe(found.AdAway[0].url)
  expect(found.AdAwayy.some((result) => result.meta.title === 'AdAway')).toBe(true) // Pagefind inverse-prefix fallback, not edit-distance fuzziness
  expect(found.topjohnwu[0].meta.title).toBe('Magisk')
  for (const query of ['hosts', 'privacy', 'Zygisk', 'Play Integrity']) expect(found[query].length).toBeGreaterThan(0)
  expect(found['C++'].some((result) => /YukiSU|Kknd Root Detector/.test(result.meta.title || ''))).toBe(true)
  expect(found['"zzzxqnevermatch"']).toEqual([])
  expect(found['']).toEqual([])
  expect(found.AdAway[0].excerpt).toContain('<mark>')
  expect(found.AdAway.find((result) => result.meta.title === 'AdAway')?.excerpt).toContain('hosts')
  expect(found.AdAway.find((result) => result.meta.title === 'AdAway')?.url).toMatch(new RegExp(`^${base}apps-and-modules/ad-blocking#app-adaway-`))
})

test('lazy loading, shortcuts, keyboard selection, anchors and focus restoration', async () => {
  const requests: string[] = []
  page.on('request', (request) => { if (request.url().includes('/pagefind/')) requests.push(request.url()) })
  await page.goto('./')
  const trigger = page.getByRole('button', { name: 'Search', exact: true })
  await browserExpect(trigger).toBeVisible()
  expect(requests).toEqual([])
  await page.keyboard.press('Control+k')
  const dialog = page.getByRole('dialog', { name: 'Search documentation' })
  await browserExpect(dialog).toBeVisible()
  const input = page.getByRole('combobox', { name: 'Search', exact: true })
  await browserExpect(input).toBeFocused()
  await browserExpect(dialog.getByRole('status')).toContainText('Search Android')
  await input.fill('"zzzxqnevermatch"')
  await browserExpect(dialog.getByRole('status')).toContainText('No results')
  await page.getByRole('button', { name: 'Reset search' }).click()
  await browserExpect(input).toBeFocused()
  await browserExpect(dialog.getByRole('option')).toHaveCount(0)
  await browserExpect(dialog.getByRole('status')).toContainText('Search Android')
  await input.fill('AdAway')
  const first = dialog.getByRole('option').first()
  await browserExpect(first).toContainText('AdAway')
  await browserExpect(first.locator('mark').first()).toBeVisible()
  await input.press('ArrowDown')
  await browserExpect(first).toHaveAttribute('aria-selected', 'true')
  await input.press('Enter')
  await browserExpect(dialog).not.toBeVisible()
  await browserExpect(page).toHaveURL(/ad-blocking#app-adaway-/)
  const anchor = new URL(page.url()).hash.slice(1)
  await browserExpect(page.locator(`[id="${anchor}"]`)).toContainText('AdAway')
  expect(requests.filter((url) => url.endsWith('/pagefind.js'))).toHaveLength(1)
  await trigger.click()
  await input.press('Escape')
  await browserExpect(dialog).not.toBeVisible()
  await browserExpect(trigger).toBeFocused()
  await page.keyboard.press('/')
  await browserExpect(dialog).toBeVisible()
  await page.getByRole('button', { name: 'Close search' }).click()
  await browserExpect(trigger).toBeFocused()
})

test('index request failure is recoverable', async () => {
  await page.route(/\/pagefind\/pagefind\.js(?:\?.*)?$/, (route) => route.abort())
  await page.goto('./')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await page.getByRole('combobox').fill('AdAway')
  await browserExpect(page.getByRole('status').filter({ hasText: 'Search is unavailable' })).toBeVisible()
  await page.unroute(/\/pagefind\/pagefind\.js(?:\?.*)?$/)
  await page.getByRole('button', { name: 'Retry' }).click()
  await browserExpect(page.getByRole('option').first()).toContainText('AdAway')
})

test('mobile layout and touch result navigation in dark mode', async () => {
  const context = await suite.browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, colorScheme: 'dark' })
  const page = await context.newPage()
  await page.goto(baseURL)
  await page.getByRole('button', { name: 'Search', exact: true }).tap()
  const dialog = page.getByRole('dialog')
  await browserExpect(dialog).toBeVisible()
  await page.getByRole('combobox').fill('AdAway')
  const link = dialog.getByRole('link').first()
  await browserExpect(link).toContainText('AdAway')
  const rect = await dialog.boundingBox()
  expect(rect!.width).toBeLessThanOrEqual(390)
  expect(rect!.x).toBeGreaterThanOrEqual(0)
  await link.tap()
  await browserExpect(page).toHaveURL(/ad-blocking#app-adaway-/)
  await browserExpect(dialog).not.toBeVisible()
  await context.close()
})

test('WebMCP shares Pagefind, validates input and retains page retrieval/navigation', async () => {
  await page.addInitScript(() => {
    const tools: ModelTool[] = []
    window.testMcpTools = tools
    document.modelContext = { registerTool: async (tool) => { tools.push(tool) } }
  })
  await page.goto('./')
  const state = await page.evaluate(async () => {
    const tools = window.testMcpTools
    if (!tools) throw new Error('WebMCP was not registered')
    const context = { signal: new AbortController().signal }
    const search = tools.find((tool) => tool.name === 'search_site')!
    const result = await search.execute({ query: 'AdAway', maxResults: 3 }, context)
    const rejected = await search.execute({ query: 5 }, context).then(() => false, () => true)
    const listing = await tools.find((tool) => tool.name === 'list_pages')!.execute({}, context)
    if (!('pages' in listing)) throw new Error('Wrong list_pages result')
    const page = listing.pages.find((page) => page.url.includes('ad-blocking'))!
    const content = await tools.find((tool) => tool.name === 'get_page')!.execute({ url: page.url }, context)
    if (!('results' in result)) throw new Error('Wrong search result')
    await tools.find((tool) => tool.name === 'navigate_to_page')!.execute({ url: result.results[0].url }, context)
    return { result, rejected, content, pageCount: listing.pages.length }
  })
  expect(state.rejected).toBe(true)
  expect(state.result.results[0].title).toBe('AdAway')
  expect(state.pageCount).toBeGreaterThan(40)
  expect(state.content).toHaveProperty('markdown')
  await browserExpect(page).toHaveURL(/ad-blocking#app-adaway-/)
})

test('fragment failure can retry without reloading the page', async () => {
  await page.route('**/*.pf_fragment', (route) => route.abort())
  await page.goto('./')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await page.getByRole('combobox').fill('AdAway')
  await browserExpect(page.getByRole('status').filter({ hasText: 'Search is unavailable' })).toBeVisible()
  await page.unroute('**/*.pf_fragment')
  await page.getByRole('button', { name: 'Retry' }).click()
  await browserExpect(page.getByRole('option').first()).toContainText('AdAway')
})


test('Vue theme controls, badges and status components retain their behavior', async () => {
  await page.goto('./')
  await browserExpect(page.locator('.landing-icon').first()).toBeVisible()
  const toggle = page.getByRole('switch', { name: 'Appearance' })
  const initial = await toggle.getAttribute('aria-checked')
  await toggle.click()
  await browserExpect(toggle).toHaveAttribute('aria-checked', initial === 'true' ? 'false' : 'true')
  await toggle.click()
  await browserExpect(toggle).toHaveAttribute('aria-checked', initial!)

  await page.goto('apps-and-modules/ad-blocking')
  const badge = page.locator('a.store-badge.fdroid').first()
  await browserExpect(badge).toBeVisible()
  await browserExpect(badge).toHaveAttribute('href', /^https:\/\/f-droid\.org\//)
  await browserExpect(badge).toHaveAttribute('target', '_blank')
  await browserExpect(badge.locator('.store-icon path')).toHaveAttribute('d', /M/)
  await browserExpect(page.getByRole('button', { name: /Copy page/i }).first()).toBeVisible()

  // Reduced motion gives a deterministic instant back-to-top action.
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.evaluate(() => window.scrollTo(0, 900))
  const backToTop = page.getByRole('button', { name: 'Back to top' })
  await browserExpect(backToTop).toBeVisible()
  await backToTop.click()
  await browserExpect(backToTop).not.toBeVisible()
  expect(await page.evaluate(() => window.scrollY)).toBe(0)

  await page.context().setOffline(true)
  await browserExpect(page.locator('.pwa-toast')).toContainText("You're offline")
  await page.context().setOffline(false)
  await browserExpect(page.locator('.pwa-toast')).toHaveClass(/pwa-toast--hidden/)
})
