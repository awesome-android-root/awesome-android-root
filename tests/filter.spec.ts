import { afterAll, afterEach, beforeAll, beforeEach, expect, setDefaultTimeout, test } from 'bun:test'
import type { Page } from 'puppeteer-core'
import { baseURL, startBrowser } from './browser.ts'

setDefaultTimeout(30_000)
let suite: Awaited<ReturnType<typeof startBrowser>>
let page: Page
let errors: string[]
beforeAll(async () => { suite = await startBrowser() })
afterAll(async () => { await suite?.stop() })
beforeEach(async () => {
  const context = await suite.browser.createBrowserContext()
  page = await context.newPage()
  page.setDefaultTimeout(5_000)
  errors = []
  page.on('pageerror', (error) => errors.push(error instanceof Error ? error.message : String(error)))
  page.on('console', (message) => { if (message.text().startsWith('[Vue warn]')) errors.push(message.text()) })
})
afterEach(async () => {
  await page?.browserContext().close()
  expect(errors).toEqual([])
})

test('home keeps the original sections and the three starting paths', async () => {
  await page.goto(baseURL)
  expect(await page.$$('.landing-features .feature-card')).toHaveLength(16)
  expect(await page.$$('.custom-journey-selector .journey-card')).toHaveLength(3)
  expect(await page.$$('.custom-journey-selector .journey-card .icon svg[aria-hidden="true"]')).toHaveLength(3)
  expect(await page.$$('.custom-journey-selector .journey-btn')).toHaveLength(3)
  expect(await page.$$('.custom-journey-selector .journey-card li')).toHaveLength(9)
  expect(await page.$('.VPHero .image')).not.toBeNull()
  expect(await page.$('#major-guides')).not.toBeNull()
  expect(await page.$('#community')).not.toBeNull()
  await page.setViewport({ width: 360, height: 800 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test('section headings keep permalinks without added copy-link buttons', async () => {
  await page.goto(new URL('apps-and-modules/ad-blocking', baseURL).href)
  await page.waitForSelector('.directory-entry')
  expect(await page.$('.copy-section-link')).toBeNull()
  expect(await page.$('.vp-doc h2 .header-anchor')).not.toBeNull()
  expect(await page.$('.markdown-copy-buttons')).not.toBeNull()
  await page.locator('a[href*="android-adblocking"]').click()
  await page.waitForFunction(() => location.pathname.includes('general-guides/android-adblocking'))
  await page.waitForSelector('.vp-doc h2 .header-anchor')
  expect(await page.$('.copy-section-link')).toBeNull()
  expect(await page.$('.markdown-copy-buttons')).not.toBeNull()
})

test('starred entries keep their stars and old featured links no longer filter results', async () => {
  await page.goto(new URL('apps-and-modules/ad-blocking?featured=1&other=keep', baseURL).href)
  await page.waitForFunction(() => document.querySelector('.filter-count')?.textContent?.includes('24 of 24'))
  expect(await page.$eval('.directory-entry strong a', (node) => node.textContent)).toContain('⭐ AdAway')
  const entryLayout = await page.$eval('.directory-entry', (entry) => {
    const list = entry.parentElement!
    const style = getComputedStyle(entry)
    return {
      listStyle: getComputedStyle(list).listStyleType,
      display: style.display,
      borderWidth: style.borderTopWidth,
      text: entry.textContent,
      hasDescriptionWrapper: !!entry.querySelector('.entry-description'),
      hasTag: !!entry.querySelector('.entry-chip--foss')
    }
  })
  expect(entryLayout.listStyle).toBe('disc')
  expect(entryLayout.display).toBe('list-item')
  expect(entryLayout.borderWidth).toBe('0px')
  expect(entryLayout.text).toContain('⭐ AdAway - Blocks ads')
  expect(entryLayout.hasDescriptionWrapper).toBe(false)
  expect(entryLayout.hasTag).toBe(true)
  expect(await page.$('.entry-featured')).toBeNull()
  expect(new URL(page.url()).searchParams.has('featured')).toBe(false)
  expect(new URL(page.url()).searchParams.get('other')).toBe('keep')
})

test('compact filters preserve URL state and the pin preference', async () => {
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(new URL('apps-and-modules/ad-blocking', baseURL).href)
  await page.waitForFunction(() => document.querySelector('.filter-count')?.textContent?.includes('24 of 24'))
  expect(await page.$eval('.directory-filter', (node) => node.getBoundingClientRect().height)).toBeLessThanOrEqual(76)
  expect(await page.$eval('.filter-search input', (node) => node.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44)
  await page.focus('.filter-search input')
  expect(await page.$eval('.filter-search', (node) => getComputedStyle(node, '::before').outlineStyle)).toBe('solid')
  expect(await page.$eval('.filter-pin', (node) => node.getAttribute('aria-pressed'))).toBe('false')
  await page.locator('.filter-pin').click()
  expect(await page.$eval('.filter-pin', (node) => node.getAttribute('aria-pressed'))).toBe('true')
  await page.evaluate(() => window.scrollTo(0, 800))
  expect(await page.$eval('.directory-filter', (node) => node.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0)
  expect(await page.$eval('.directory-filter', (node) => node.getBoundingClientRect().top)).toBeLessThan(100)
  await page.locator('.filter-trigger').click()
  await page.locator('.filter-chip').click()
  await page.waitForFunction(() => new URLSearchParams(location.search).get('framework') === 'Magisk')
  await page.locator('.filter-dialog-header button').click()
  await page.locator('.filter-search input').fill('Bindhosts')
  await page.waitForFunction(() => document.querySelector('.filter-count')?.textContent?.includes('1 of 24'))
  expect(await page.$eval('.filter-active', (node) => node.textContent)).toContain('Magisk')
  await page.reload()
  await page.waitForFunction(() => document.querySelector('.filter-count')?.textContent?.includes('1 of 24'))
  expect(await page.$eval('.filter-pin', (node) => node.getAttribute('aria-pressed'))).toBe('true')
  expect(await page.$eval('.filter-search input', (node) => (node as HTMLInputElement).value)).toBe('Bindhosts')
  await page.locator('.filter-clear').click()
  await page.locator('.filter-pin').click()
  await page.evaluate(() => window.scrollTo(0, 800))
  expect(await page.$eval('.directory-filter', (node) => node.getBoundingClientRect().bottom)).toBeLessThan(0)
  await page.reload()
  expect(await page.$eval('.filter-pin', (node) => node.getAttribute('aria-pressed'))).toBe('false')
})

test('mobile filter sheet is operable and has no horizontal overflow', async () => {
  await page.setViewport({ width: 360, height: 800, isMobile: true, hasTouch: true })
  await page.goto(new URL('apps-and-modules/ad-blocking', baseURL).href)
  await page.waitForFunction(() => document.querySelector('.filter-count')?.textContent?.includes('24 of 24'))
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  expect(await page.$eval('.directory-filter', (node) => node.getBoundingClientRect().height)).toBeLessThanOrEqual(76)
  expect(await page.$eval('.filter-search input', (node) => node.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44)
  await page.locator('.filter-trigger').click()
  expect(await page.$eval('.filter-dialog', (node) => (node as HTMLDialogElement).open)).toBe(true)
  await page.select('.filter-license select', 'Proprietary')
  expect(await page.$('.filter-featured')).toBeNull()
  await page.keyboard.press('Escape')
  await page.waitForFunction(() => !document.querySelector<HTMLDialogElement>('.filter-dialog')?.open)
  await page.locator('.filter-search input').fill('no-such-entry')
  await page.waitForFunction(() => document.querySelector('.filter-count')?.textContent?.includes('0 of 24'))
  expect(await page.$eval('.filter-empty', (node) => node.textContent)).toContain('No matches.')
  await page.locator('.filter-empty button').click()
  await page.waitForFunction(() => document.querySelector('.filter-count')?.textContent?.includes('24 of 24'))
  await page.locator('.filter-pin').click()
  await page.evaluate(() => window.scrollTo(0, 800))
  expect(await page.$eval('.directory-filter', (node) => node.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0)
  expect(await page.$eval('.directory-filter', (node) => node.getBoundingClientRect().top)).toBeLessThan(100)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
