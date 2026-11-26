import { describe, expect, test } from 'bun:test'
import MarkdownIt from 'markdown-it'
import { storeLinkPlugin } from '../docs/.vitepress/markdown/storeLinkPlugin.ts'
import { entrySearchPlugin } from '../docs/.vitepress/markdown/entrySearchPlugin.ts'
import { entryAnchor } from '../docs/.vitepress/shared/entries.ts'
import { parseEntries, extractBadges } from './app-entries.ts'
import { developerTerms } from './search-index.ts'
import { parsePageIndex, toolInput, stringInput, resultLimit, pageRoute } from '../docs/.vitepress/theme/utils/mcp.ts'
import { createSearchSession, rankTitles } from '../docs/.vitepress/theme/utils/search.ts'
import type { PagefindBrowser, SearchResult } from '../docs/.vitepress/theme/utils/search.ts'
import { onRequest } from '../functions/_middleware.ts'

describe('directory contracts', () => {
  test('real entries parse, have unique anchors per page and keep inline code', () => {
    const files = parseEntries()
    let count = 0
    for (const { fileName, records } of files) {
      if (fileName === 'index.md') continue
      const seen = new Set<string>()
      for (const entry of records) {
        expect(entry.malformed).not.toBe(true)
        if (entry.malformed) continue
        const anchor = entryAnchor(entry.name, entry.url)
        expect(seen.has(anchor)).toBe(false)
        seen.add(anchor)
        count++
      }
      if (fileName === 'ad-blocking.md') expect(records.some((r) => !r.malformed && r.name === 'AdAway')).toBe(true)
    }
    expect(count).toBeGreaterThan(800)
    expect(extractBadges('Uses `Android/data` safely. `FOSS` `[M]`').description).toBe('Uses `Android/data` safely.')
  })
  test('anchors survive recommendations but distinguish projects with the same name', () => {
    expect(entryAnchor('⭐ App Manager', 'https://example.org/a')).toBe(entryAnchor('App Manager', 'https://example.org/a'))
    expect(entryAnchor('App Manager', 'https://example.org/a')).not.toBe(entryAnchor('App Manager', 'https://example.org/b'))
  })
  test('developer/repository aliases retain original and split words', () => {
    expect(developerTerms('https://github.com/topjohnwu/Magisk')).toBe('topjohnwu Magisk')
    expect(developerTerms('https://github.com/AdAway/AdAway')).toContain('Ad Away')
    expect(developerTerms('https://example.org/user/repo')).toBe('')
    expect(developerTerms('invalid')).toBe('')
  })
})

describe('Markdown plugins', () => {
  test('store links handle inline markup, reject lookalike hosts and escape attributes', () => {
    const md = new MarkdownIt().use(storeLinkPlugin)
    expect(md.render('[🌱 **F-Droid**](https://f-droid.org/packages/a)')).toContain('<StoreLink store="fdroid"')
    expect(md.render('[🌱](https://f-droid.org.evil.test/a)')).not.toContain('StoreLink')
    expect(md.render('[Read more](https://f-droid.org/)')).not.toContain('StoreLink')
    expect(md.render('[▶️](https://play.google.com/store/apps?id=a&x=b)')).toContain('store="playstore"')
    expect(md.render('[🌱](https://izzyondroid.org/a)')).toContain('store="izzy"')
  })
  test('directory links are additive, excluded from double indexing, and do not leak between renders', () => {
    const md = new MarkdownIt().use(entrySearchPlugin)
    const content = '- **[⭐ AdAway](https://github.com/AdAway/AdAway)** - Blocks ads. `FOSS`'
    const html = md.render(content, { relativePath: 'apps-and-modules/ad-blocking.md' })
    expect(html).toContain(`id="${entryAnchor('AdAway', 'https://github.com/AdAway/AdAway')}"`)
    expect(html).toContain('data-pagefind-ignore="all"')
    expect(md.render(content, { relativePath: 'contributing.md' })).not.toContain('data-pagefind-ignore')
    expect(md.render(content, { relativePath: 'apps-and-modules/ad-blocking.md' })).toBe(html)
  })
})

describe('WebMCP runtime validation', () => {
  test('normalizes base-aware Markdown and search URLs for navigation', () => {
    expect(pageRoute('/android-root/apps-and-modules/ad-blocking.md', '/android-root/')).toBe('/apps-and-modules/ad-blocking')
    expect(pageRoute('/android-root/apps-and-modules/ad-blocking#app-adaway', '/android-root/')).toBe('/apps-and-modules/ad-blocking')
    expect(pageRoute('/rooting-guides/')).toBe('/rooting-guides')
    expect(pageRoute('/')).toBe('/')
  })
  test('parses local pages and rejects external/protocol-relative URLs', () => {
    const text = '---\nurl: /rooting-guides/\n---\n# Rooting\nBody\n---\nurl: //evil.test/\n---\n# Bad\n'
    expect(parsePageIndex(text)).toEqual([{ url: '/rooting-guides/', title: 'Rooting', content: '# Rooting\nBody' }])
  })
  test('does not trust schema validation by the caller', () => {
    for (const value of [null, [], 'query', 7]) expect(() => toolInput(value)).toThrow()
    expect(() => stringInput({ query: 4 }, 'query', 160)).toThrow()
    expect(() => stringInput({ query: ' ' }, 'query', 160)).toThrow()
    expect(() => stringInput({ query: 'x'.repeat(161) }, 'query', 160)).toThrow()
    for (const maxResults of [0, 11, NaN, 1.5, '5']) expect(() => resultLimit({ maxResults })).toThrow()
    expect(resultLimit({})).toBe(5)
  })
})

const result: SearchResult = { url: '/adaway', excerpt: '<mark>AdAway</mark>', meta: { title: 'AdAway' } }
function deferred<T>() {
  let resolve!: (value: T) => void
  const promise = new Promise<T>((done) => { resolve = done })
  return { promise, resolve }
}

describe('search race protection', () => {
  test('exact and focused prefix titles beat incidental mentions', () => {
    const titles = ['Android Ad Blocking Guide', 'AdAway Helper', 'AdAway']
      .map((title) => ({ ...result, meta: { title } }))
    expect(rankTitles(titles, 'adaway')[0].meta.title).toBe('AdAway')
    expect(rankTitles(titles, 'AdAw')[0].meta.title).toBe('AdAway')
    expect(rankTitles(titles, 'hosts')).toEqual(titles)
  })
  test('ignores older search completions', async () => {
    const first = deferred<{ results: [] }>()
    const engine: PagefindBrowser = { init: async () => {}, destroy: async () => {}, options: async () => {}, search: (query) => query === 'old' ? first.promise : Promise.resolve({ results: [{ id: 'new', data: async () => result }] }) }
    const session = createSearchSession()
    const old = session.run(engine, 'old')
    expect(await session.run(engine, 'new')).toEqual([result])
    first.resolve({ results: [] })
    expect(await old).toBeNull()
  })
  test('ignores stale fragment fetches and cancels on empty queries', async () => {
    const fragment = deferred<SearchResult>()
    const engine: PagefindBrowser = { init: async () => {}, destroy: async () => {}, options: async () => {}, search: async () => ({ results: [{ id: 'old', data: () => fragment.promise }] }) }
    const session = createSearchSession()
    const old = session.run(engine, 'old')
    await Promise.resolve()
    expect(await session.run(engine, '  ')).toEqual([])
    fragment.resolve(result)
    expect(await old).toBeNull()
    const canceled = session.run(engine, 'cancel')
    session.cancel()
    expect(await canceled).toBeNull()
  })
  test('propagates failures for the UI error/retry state', async () => {
    const engine: PagefindBrowser = { init: async () => {}, destroy: async () => {}, options: async () => {}, search: async () => { throw new Error('offline') } }
    await expect(createSearchSession().run(engine, 'AdAway')).rejects.toThrow('offline')
  })
})

describe('Cloudflare Markdown negotiation', () => {
  test('preserves HTML requests and negotiates Markdown', async () => {
    const next = async () => new Response('HTML')
    const env = { ASSETS: { fetch: async () => new Response('# Guide') } }
    const request = new Request('https://example.org/rooting-guides/', { headers: { Accept: 'text/markdown' } })
    const response = await onRequest({ request, env, next })
    expect(response.headers.get('Content-Type')).toBe('text/markdown; charset=utf-8')
    expect(response.headers.get('Vary')).toBe('Accept')
    expect(await response.text()).toBe('# Guide')
    const html = await onRequest({ request: new Request(request.url), env, next })
    expect(await html.text()).toBe('HTML')
  })
  test('does not negotiate rejected MIME types or search assets', async () => {
    const next = async () => new Response('asset')
    const env = { ASSETS: { fetch: async () => { throw new Error('unexpected fetch') } } }
    for (const [path, accept] of [['/guide', 'text/markdown;q=0'], ['/pagefind/pagefind.js', 'text/markdown']]) {
      expect(await (await onRequest({ request: new Request(`https://example.org${path}`, { headers: { Accept: accept } }), env, next })).text()).toBe('asset')
    }
  })
})
