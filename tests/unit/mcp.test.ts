import { describe, expect, test } from 'bun:test'
import { toolInput, stringInput, resultLimit, pageRoute, parsePageIndex, findPage, urlHash } from '../../docs/.vitepress/theme/utils/mcp.ts'

test('MCP rejects invalid caller input and normalizes base-aware search URLs', () => {
  for (const value of [null, [], 'query', 7]) expect(() => toolInput(value)).toThrow()
  expect(() => stringInput({ query: 4 }, 'query', 160)).toThrow()
  expect(() => stringInput({ query: ' ' }, 'query', 160)).toThrow()
  expect(() => stringInput({ query: 'x'.repeat(161) }, 'query', 160)).toThrow()
  for (const maxResults of [0, 11, NaN, 1.5, '5']) expect(() => resultLimit({ maxResults })).toThrow()
  expect(resultLimit({})).toBe(5)
  expect(pageRoute('/android-root/apps-and-modules/ad-blocking.md', '/android-root/')).toBe('/apps-and-modules/ad-blocking')
  expect(pageRoute('/android-root/apps-and-modules/ad-blocking#app-adaway', '/android-root/')).toBe('/apps-and-modules/ad-blocking')
})

describe('pageRoute', () => {
  test('maps the home page Markdown copy to /, never /index', () => {
    expect(pageRoute('/index.md')).toBe('/')
    expect(pageRoute('/')).toBe('/')
    expect(pageRoute('/index.html')).toBe('/')
  })

  test('nested index pages match in route, Markdown-copy and source form', () => {
    for (const url of ['/rooting-guides/', '/rooting-guides', '/rooting-guides.md', '/rooting-guides/index.md']) {
      expect(pageRoute(url)).toBe('/rooting-guides')
    }
  })

  test('strips a configured base, including the bare base itself', () => {
    expect(pageRoute('/android-root/', '/android-root/')).toBe('/')
    expect(pageRoute('/android-root', '/android-root/')).toBe('/')
    expect(pageRoute('/android-root/index.md', '/android-root/')).toBe('/')
    expect(pageRoute('/android-root/rooting-guides/', '/android-root/')).toBe('/rooting-guides')
  })

  test('drops hashes and queries', () => {
    expect(pageRoute('/faqs#getting-started')).toBe('/faqs')
    expect(pageRoute('/faqs.md?x=1#a')).toBe('/faqs')
    expect(pageRoute('/#top')).toBe('/')
  })

  test('only strips index as a whole path segment', () => {
    expect(pageRoute('/reindex')).toBe('/reindex')
  })
})

describe('parsePageIndex', () => {
  const index = {
    pages: [
      { title: 'Home', route: '/', markdown: '/index.md' },
      { title: 'Rooting Guides', route: '/rooting-guides/', markdown: '/rooting-guides.md' },
      { title: 'FAQ', route: '/faqs', markdown: '/faqs.md' },
      { title: '404', route: '/404', markdown: '/404.md' },
      { title: 'Count', route: '/count', markdown: '/count.md' }
    ]
  }

  test('keeps documentation pages and drops 404 and the maintainer-only count page', () => {
    expect(parsePageIndex(index).map((page) => page.route)).toEqual(['/', '/rooting-guides/', '/faqs'])
  })

  test('rejects malformed payloads and skips unsafe or incomplete records', () => {
    for (const payload of [null, 'x', [], {}, { pages: 'x' }]) expect(() => parsePageIndex(payload)).toThrow()
    expect(parsePageIndex({
      pages: [
        null,
        { title: 'No route', markdown: '/a.md' },
        { title: ' ', route: '/a', markdown: '/a.md' },
        { title: 'External', route: '//evil.test/a', markdown: '/a.md' },
        { title: 'Hash', route: '/a#x', markdown: '/a.md' },
        { title: 'Not Markdown', route: '/a', markdown: '/a.html' },
        { title: 'Space', route: '/a b', markdown: '/a b.md' },
        { title: ' Valid ', route: '/a', markdown: '/a.md' }
      ]
    })).toEqual([{ title: 'Valid', route: '/a', markdown: '/a.md' }])
  })

  test('findPage resolves route, Markdown and base-prefixed URLs to the listed page', () => {
    const pages = parsePageIndex(index)
    expect(findPage(pages, '/')?.markdown).toBe('/index.md')
    expect(findPage(pages, '/index.md')?.route).toBe('/')
    expect(findPage(pages, '/rooting-guides.md')?.route).toBe('/rooting-guides/')
    expect(findPage(pages, '/android-root/rooting-guides#x', '/android-root/')?.route).toBe('/rooting-guides/')
    expect(findPage(pages, '/404.md')).toBeUndefined()
    expect(findPage(pages, '/count')).toBeUndefined()
    expect(findPage(pages, '/missing')).toBeUndefined()
  })

  test('urlHash keeps the whole fragment', () => {
    expect(urlHash('/faqs#a#b')).toBe('#a#b')
    expect(urlHash('/faqs')).toBe('')
  })
})
