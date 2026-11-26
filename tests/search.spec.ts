import { afterAll, afterEach, beforeAll, beforeEach, expect, setDefaultTimeout, test } from 'bun:test'
import type { HTTPRequest, Page } from 'puppeteer-core'
import { baseURL, startBrowser } from './browser.ts'

setDefaultTimeout(30_000)
let suite: Awaited<ReturnType<typeof startBrowser>>
let page: Page
let browserErrors: string[]
beforeAll(async () => { suite = await startBrowser() })
afterAll(async () => { await suite?.stop() })
beforeEach(async () => {
  const context = await suite.browser.createBrowserContext()
  page = await context.newPage()
  page.setDefaultTimeout(5_000)
  browserErrors = []
  page.on('pageerror', (error) => browserErrors.push(error instanceof Error ? error.message : String(error)))
  page.on('console', (message) => { if (message.text().startsWith('[Vue warn]')) browserErrors.push(message.text()) })
})
afterEach(async () => {
  await page?.browserContext().close()
  expect(browserErrors).toEqual([])
})

test('built search loads only on use and supports keyboard navigation to an entry', async () => {
  const requests: string[] = []
  page.on('request', (request) => { if (request.url().includes('/pagefind/')) requests.push(request.url()) })
  await page.goto(baseURL)
  await page.waitForSelector('.aar-search-button', { visible: true })
  expect(requests).toEqual([])
  await page.keyboard.down('Control')
  await page.keyboard.press('k')
  await page.keyboard.up('Control')
  await page.waitForFunction(() => document.activeElement?.id === 'aar-search-input')
  await page.locator('#aar-search-input').fill('AdAway')
  await page.waitForSelector('[role="option"] strong')
  expect(await page.$eval('[role="option"] strong', (node) => node.textContent)).toBe('AdAway')
  expect(await page.$('[role="option"] mark')).not.toBeNull()

  await page.keyboard.press('ArrowDown')
  await page.waitForSelector('[role="option"][aria-selected="true"]')
  await page.keyboard.press('Enter')
  await page.waitForFunction(() => location.hash.startsWith('#app-adaway-') && !document.querySelector('dialog')?.open)
  expect(new URL(page.url()).pathname).toBe(new URL('apps-and-modules/ad-blocking', baseURL).pathname)
  // VitePress updates the URL before its asynchronously loaded page mounts.
  await page.waitForFunction(() => document.getElementById(location.hash.slice(1)) !== null)
  expect(await page.evaluate(() => document.getElementById(location.hash.slice(1))?.textContent)).toContain('AdAway')
  expect(requests.filter((url) => url.endsWith('/pagefind.js'))).toHaveLength(1)

  await page.locator('.aar-search-button').click()
  await page.waitForFunction(() => document.activeElement?.id === 'aar-search-input')
  await page.keyboard.press('Escape')
  await page.waitForFunction(() => !document.querySelector('dialog')?.open && document.activeElement?.classList.contains('aar-search-button'))
})

test('a failed search engine request can retry without reloading the page', async () => {
  const blockEngine = (request: HTTPRequest) => {
    if (/\/pagefind\/pagefind\.js(?:\?.*)?$/.test(request.url())) void request.abort()
    else void request.continue()
  }
  await page.setRequestInterception(true)
  page.on('request', blockEngine)
  await page.goto(baseURL)
  await page.locator('.aar-search-button').click()
  await page.locator('#aar-search-input').fill('AdAway')
  await page.waitForFunction(() => document.querySelector('.search-status')?.textContent?.includes('Search is unavailable'))
  page.off('request', blockEngine)
  await page.setRequestInterception(false)
  await page.locator('.search-status button').click()
  await page.waitForSelector('[role="option"] strong')
  expect(await page.$eval('[role="option"] strong', (node) => node.textContent)).toBe('AdAway')
  expect(page.url()).toBe(baseURL)
  expect(await page.evaluate(() => document.activeElement?.id)).toBe('aar-search-input')
})
