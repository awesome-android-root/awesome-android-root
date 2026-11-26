import { expect, test } from '@playwright/test'
import type { ModelTool } from '../docs/.vitepress/theme/utils/mcp'
import type { PagefindBrowser, SearchResult } from '../docs/.vitepress/theme/utils/search'

declare global { interface Window { testMcpTools?: ModelTool[] } }

const base = process.env.SITE_BASE || '/'

test('Pagefind relevance against actual directory content', async ({ page }) => {
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

test('lazy loading, shortcuts, keyboard selection, anchors and focus restoration', async ({ page }) => {
  const requests: string[] = []
  page.on('request', (request) => { if (request.url().includes('/pagefind/')) requests.push(request.url()) })
  await page.goto('./')
  const trigger = page.getByRole('button', { name: 'Search', exact: true })
  await expect(trigger).toBeVisible()
  expect(requests).toEqual([])
  await page.keyboard.press('Control+k')
  const dialog = page.getByRole('dialog', { name: 'Search documentation' })
  await expect(dialog).toBeVisible()
  const input = page.getByRole('combobox', { name: 'Search', exact: true })
  await expect(input).toBeFocused()
  await input.fill('AdAway')
  const first = dialog.getByRole('option').first()
  await expect(first).toContainText('AdAway')
  await expect(first.locator('mark').first()).toBeVisible()
  await input.press('ArrowDown')
  await expect(first).toHaveAttribute('aria-selected', 'true')
  await input.press('Enter')
  await expect(dialog).not.toBeVisible()
  await expect(page).toHaveURL(/ad-blocking#app-adaway-/)
  const anchor = new URL(page.url()).hash.slice(1)
  await expect(page.locator(`[id="${anchor}"]`)).toContainText('AdAway')
  expect(requests.filter((url) => url.endsWith('/pagefind.js'))).toHaveLength(1)
  await trigger.click()
  await input.press('Escape')
  await expect(dialog).not.toBeVisible()
  await expect(trigger).toBeFocused()
  await page.keyboard.press('/')
  await expect(dialog).toBeVisible()
  await page.getByRole('button', { name: 'Close search' }).click()
  await expect(trigger).toBeFocused()
})

test('empty, no results, reset and rapid consecutive input', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  const dialog = page.getByRole('dialog')
  const input = page.getByRole('combobox')
  await expect(dialog.getByRole('status')).toContainText('Search Android')
  await input.fill('AdAway')
  await page.waitForTimeout(200) // deliberately start the first async search
  await input.fill('Magisk')
  await input.fill('AdAway')
  await expect(dialog.getByRole('option').first()).toContainText('AdAway')
  await input.fill('"zzzxqnevermatch"')
  await expect(dialog.getByRole('status')).toContainText('No results')
  await page.getByRole('button', { name: 'Reset search' }).click()
  await expect(input).toBeFocused()
  await expect(dialog.getByRole('option')).toHaveCount(0)
  await expect(dialog.getByRole('status')).toContainText('Search Android')
})

test('index request failure is recoverable', async ({ page }) => {
  await page.route(/\/pagefind\/pagefind\.js(?:\?.*)?$/, (route) => route.abort())
  await page.goto('./')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await page.getByRole('combobox').fill('AdAway')
  await expect(page.getByRole('status').filter({ hasText: 'Search is unavailable' })).toBeVisible()
  await page.unroute(/\/pagefind\/pagefind\.js(?:\?.*)?$/)
  await page.getByRole('button', { name: 'Retry' }).click()
  await expect(page.getByRole('option').first()).toContainText('AdAway')
})

test('mobile layout and touch result navigation in dark mode', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, colorScheme: 'dark' })
  const page = await context.newPage()
  await page.goto(`http://127.0.0.1:4173${base}`)
  await page.getByRole('button', { name: 'Search', exact: true }).tap()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await page.getByRole('combobox').fill('AdAway')
  const link = dialog.getByRole('link').first()
  await expect(link).toContainText('AdAway')
  const rect = await dialog.boundingBox()
  expect(rect!.width).toBeLessThanOrEqual(390)
  expect(rect!.x).toBeGreaterThanOrEqual(0)
  await link.tap()
  await expect(page).toHaveURL(/ad-blocking#app-adaway-/)
  await expect(dialog).not.toBeVisible()
  await context.close()
})

test('WebMCP shares Pagefind, validates input and retains page retrieval/navigation', async ({ page }) => {
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
  await expect(page).toHaveURL(/ad-blocking#app-adaway-/)
})

test('fragment failure can retry without reloading the page', async ({ page }) => {
  await page.route('**/*.pf_fragment', (route) => route.abort())
  await page.goto('./')
  await page.getByRole('button', { name: 'Search', exact: true }).click()
  await page.getByRole('combobox').fill('AdAway')
  await expect(page.getByRole('status').filter({ hasText: 'Search is unavailable' })).toBeVisible()
  await page.unroute('**/*.pf_fragment')
  await page.getByRole('button', { name: 'Retry' }).click()
  await expect(page.getByRole('option').first()).toContainText('AdAway')
})
