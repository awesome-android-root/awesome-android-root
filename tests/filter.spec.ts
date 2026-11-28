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

async function waitForAllEntries() {
  await page.waitForFunction(() => {
    const total = document.querySelectorAll('.directory-entry').length
    return total > 0 && document.querySelector('.filter-count')?.textContent?.includes(`${total} of ${total}`)
  })
}

test('home keeps the original sections and the three starting paths', async () => {
  await page.goto(baseURL)
  expect(await page.$$('.custom-journey-selector .journey-card')).toHaveLength(3)
  expect(await page.$('.VPHero .image')).not.toBeNull()
  expect(await page.$('#major-guides')).not.toBeNull()
  expect(await page.$('#community')).not.toBeNull()
  await page.setViewport({ width: 360, height: 800 })
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})

test('directory entries keep their layout, links, stars and readable badges', async () => {
  await page.goto(new URL('apps-and-modules/ad-blocking?featured=1&other=keep', baseURL).href)
  await waitForAllEntries()
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
  expect(await page.$('.copy-section-link')).toBeNull()
  expect(await page.$('.vp-doc h2 .header-anchor')).not.toBeNull()
  expect(await page.$('.markdown-copy-buttons')).not.toBeNull()
  for (const dark of [false, true]) {
    const badges = await page.evaluate((dark) => {
      document.documentElement.classList.toggle('dark', dark)
      const context = document.createElement('canvas').getContext('2d')!
      function rgb(color: string) {
        context.clearRect(0, 0, 1, 1)
        context.fillStyle = color
        context.fillRect(0, 0, 1, 1)
        return [...context.getImageData(0, 0, 1, 1).data].slice(0, 3)
      }
      function luminance(color: number[]) {
        const [r, g, b] = color.map((value) => {
          const c = value / 255
          return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
        })
        return 0.2126 * r + 0.7152 * g + 0.0722 * b
      }
      const background = luminance(rgb(getComputedStyle(document.body).backgroundColor))
      return ['magisk', 'kernelsu', 'apatch', 'lsposed', 'foss', 'proprietary'].map((name) => {
        const chip = document.querySelector<HTMLElement>(`.entry-chip--${name}`)!
        const style = getComputedStyle(chip)
        const text = luminance(rgb(style.color))
        return { contrast: (Math.max(background, text) + 0.05) / (Math.min(background, text) + 0.05), label: chip.textContent, border: style.borderTopColor, color: style.color }
      })
    }, dark)
    for (const badge of badges) {
      expect(badge.label).toBeTruthy()
      expect(badge.contrast).toBeGreaterThanOrEqual(4.5)
      expect(badge.border).not.toBe(badge.color)
    }
  }
})

test('SUSFS dropdown body has the same inset as its heading', async () => {
  for (const width of [1440, 360]) {
    await page.setViewport({ width, height: 800 })
    await page.goto(new URL('apps-and-modules/root-management?framework=Magisk%2CKernelSU#susfs', baseURL).href)
    await page.waitForFunction(() => document.querySelector('.filter-active')?.textContent?.includes('KernelSU'))
    const details = '#susfs + details'
    await page.locator(`${details} summary`).click()
    const layout = await page.$eval(details, (node) => {
      const summary = node.querySelector('summary')!
      const paragraph = node.querySelector('p')!
      const box = node.getBoundingClientRect()
      const header = summary.getBoundingClientRect()
      const body = paragraph.getBoundingClientRect()
      return {
        open: (node as HTMLDetailsElement).open,
        text: paragraph.textContent,
        headerInset: parseFloat(getComputedStyle(summary).paddingLeft),
        bodyInset: body.left - box.left - parseFloat(getComputedStyle(node).borderLeftWidth),
        topGap: body.top - header.bottom,
        bottomGap: box.bottom - body.bottom,
        nextTag: node.nextElementSibling?.tagName,
        overflow: document.documentElement.scrollWidth > window.innerWidth
      }
    })
    expect(layout.open).toBe(true)
    expect(layout.text).toContain('SUSFS (Systemless User Space File System)')
    expect(layout.bodyInset).toBe(layout.headerInset)
    expect(layout.topGap).toBeGreaterThan(0)
    expect(layout.bottomGap).toBeGreaterThan(0)
    expect(layout.nextTag).toBe('UL')
    expect(layout.overflow).toBe(false)
    await page.locator(`${details} summary`).click()
    expect(await page.$eval(details, (node) => (node as HTMLDetailsElement).open)).toBe(false)
  }
})

test('directory filters preserve URL state and the pin preference', async () => {
  await page.setViewport({ width: 1440, height: 900 })
  await page.goto(new URL('apps-and-modules/ad-blocking?other=keep#dns-network-filtering', baseURL).href)
  await waitForAllEntries()
  await page.locator('.filter-trigger').click()
  await page.locator('.filter-chip:nth-child(1)').click()
  await page.locator('.filter-chip:nth-child(2)').click()
  await page.waitForFunction(() => location.search.includes('framework=Magisk+KernelSU'))
  expect(new URL(page.url()).searchParams.get('framework')).toBe('Magisk KernelSU')
  expect(new URL(page.url()).searchParams.get('other')).toBe('keep')
  expect(new URL(page.url()).hash).toBe('#dns-network-filtering')
  expect(await page.$$eval('.directory-entry:not([hidden])', (entries) => entries.every((entry) => /(?:^| )(?:Magisk|KernelSU)(?: |$)/.test((entry as HTMLElement).dataset.frameworks ?? '')))).toBe(true)
  const count = await page.$eval('.filter-count', (node) => node.textContent)
  await page.reload()
  await page.waitForFunction((count) => document.querySelector('.filter-count')?.textContent === count, {}, count)
  await page.locator('.filter-trigger').click()
  expect(await page.$$eval('.filter-chip input', (inputs) => inputs.map((input) => (input as HTMLInputElement).checked))).toEqual([true, true, false, false])
  await page.locator('.filter-dialog-header button').click()
  await page.locator('.filter-search input').fill('C++')
  await page.waitForFunction(() => new URLSearchParams(location.search).get('q') === 'C++')
  expect(new URL(page.url()).searchParams.get('framework')).toBe('Magisk KernelSU')
  await page.goto(new URL('apps-and-modules/ad-blocking?framework=Magisk%2CKernelSU&other=keep', baseURL).href)
  await page.waitForFunction((count) => document.querySelector('.filter-count')?.textContent === count, {}, count)
  await page.locator('.filter-trigger').click()
  expect(await page.$$eval('.filter-chip input', (inputs) => inputs.map((input) => (input as HTMLInputElement).checked))).toEqual([true, true, false, false])
  await page.locator('.filter-chip:nth-child(3)').click()
  await page.waitForFunction(() => location.search.includes('framework=Magisk+KernelSU+APatch'))
  expect(new URL(page.url()).searchParams.get('other')).toBe('keep')
  await page.locator('.filter-dialog-footer button').click()
  await waitForAllEntries()
  await page.locator('.filter-dialog-header button').click()
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
  await page.waitForFunction(() => document.querySelector('.filter-count')?.textContent?.startsWith('1 of '))
  expect(await page.$eval('#ad-tracker-blocking', (node) => (node as HTMLElement).hidden)).toBe(false)
  expect(await page.$eval('#dns-network-filtering', (node) => (node as HTMLElement).hidden)).toBe(true)
  expect(await page.$eval('.filter-active', (node) => node.textContent)).toContain('Magisk')
  await page.reload()
  await page.waitForFunction(() => document.querySelector('.filter-count')?.textContent?.startsWith('1 of '))
  expect(await page.$eval('.filter-pin', (node) => node.getAttribute('aria-pressed'))).toBe('true')
  expect(await page.$eval('.filter-search input', (node) => (node as HTMLInputElement).value)).toBe('Bindhosts')
  await page.locator('.filter-clear').click()
  await waitForAllEntries()
  expect(await page.$eval('#dns-network-filtering', (node) => (node as HTMLElement).hidden)).toBe(false)
  await page.locator('.filter-pin').click()
  await page.evaluate(() => window.scrollTo(0, 800))
  expect(await page.$eval('.directory-filter', (node) => node.getBoundingClientRect().bottom)).toBeLessThan(0)
  await page.reload()
  expect(await page.$eval('.filter-pin', (node) => node.getAttribute('aria-pressed'))).toBe('false')

  await page.locator('.filter-search input').fill('Bindhosts')
  await page.waitForFunction(() => document.querySelector('.filter-count')?.textContent?.startsWith('1 of '))
  await page.locator('.VPSidebar a[href$="/apps-and-modules/system"]').click()
  await page.waitForFunction(() => location.pathname.endsWith('/apps-and-modules/system'))
  await waitForAllEntries()
  await page.locator('.filter-search input').fill('VBMeta Disguiser')
  await page.waitForFunction(() => document.querySelector('.filter-count')?.textContent?.startsWith('1 of '))
  expect(await page.$eval('#system-tweaks', (node) => (node as HTMLElement).hidden)).toBe(false)
  expect(await page.$eval('#vbmeta-mods', (node) => (node as HTMLElement).hidden)).toBe(false)
  expect(await page.$eval('#system-ui-framework', (node) => (node as HTMLElement).hidden)).toBe(true)
  await page.locator('.filter-clear').click()
  await waitForAllEntries()
  expect(await page.$eval('#system-ui-framework', (node) => (node as HTMLElement).hidden)).toBe(false)
})

test('mobile filter sheet is operable and has no horizontal overflow', async () => {
  await page.setViewport({ width: 360, height: 800, isMobile: true, hasTouch: true })
  await page.goto(new URL('apps-and-modules/ad-blocking', baseURL).href)
  await waitForAllEntries()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
  expect(await page.$eval('.directory-filter', (node) => node.getBoundingClientRect().height)).toBeLessThanOrEqual(76)
  expect(await page.$eval('.filter-search input', (node) => node.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44)
  await page.locator('.filter-trigger').click()
  expect(await page.$eval('.filter-dialog', (node) => (node as HTMLDialogElement).open)).toBe(true)
  await page.select('.filter-license select', 'Proprietary')
  await page.waitForFunction(() => new URLSearchParams(location.search).get('license') === 'Proprietary')
  const licenseResults = await page.$$eval('.directory-entry', (entries) => ({
    total: entries.length,
    visible: entries.filter((entry) => !(entry as HTMLElement).hidden).map((entry) => (entry as HTMLElement).dataset.license)
  }))
  expect(licenseResults.visible.length).toBeGreaterThan(0)
  expect(licenseResults.visible.length).toBeLessThan(licenseResults.total)
  expect(licenseResults.visible.every((license) => license === 'Proprietary')).toBe(true)
  expect(await page.$('.filter-featured')).toBeNull()
  await page.keyboard.press('Escape')
  await page.waitForFunction(() => !document.querySelector<HTMLDialogElement>('.filter-dialog')?.open)
  await page.locator('.filter-search input').fill('no-such-entry')
  await page.waitForFunction(() => document.querySelector('.filter-count')?.textContent?.startsWith('0 of '))
  expect(await page.$eval('.filter-empty', (node) => node.textContent)).toContain('No matches.')
  await page.locator('.filter-empty button').click()
  await waitForAllEntries()
  await page.locator('.filter-pin').click()
  await page.evaluate(() => window.scrollTo(0, 800))
  expect(await page.$eval('.directory-filter', (node) => node.getBoundingClientRect().top)).toBeGreaterThanOrEqual(0)
  expect(await page.$eval('.directory-filter', (node) => node.getBoundingClientRect().top)).toBeLessThan(100)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
})
