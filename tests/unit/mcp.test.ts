import { expect, test } from 'bun:test'
import { toolInput, stringInput, resultLimit, pageRoute, parsePageIndex, findPage } from '../../docs/.vitepress/theme/utils/mcp.ts'

test('MCP rejects invalid caller input', () => {
  for (const value of [null, [], 'query', 7]) expect(() => toolInput(value)).toThrow()
  expect(() => stringInput({ query: 4 }, 'query', 160)).toThrow()
  expect(() => stringInput({ query: ' ' }, 'query', 160)).toThrow()
  expect(() => stringInput({ query: 'x'.repeat(161) }, 'query', 160)).toThrow()
  for (const maxResults of [null, 0, 11, NaN, 1.5, '5']) expect(() => resultLimit({ maxResults })).toThrow()
  expect(resultLimit({})).toBe(5)
})

test('pageRoute normalizes home, nested index, base, hash and Markdown URLs', () => {
  for (const url of ['/', '/index.md', '/#top']) expect(pageRoute(url)).toBe('/')
  for (const url of ['/rooting-guides/', '/rooting-guides.md', '/rooting-guides/index.md']) expect(pageRoute(url)).toBe('/rooting-guides')
  expect(pageRoute('/android-root', '/android-root/')).toBe('/')
  expect(pageRoute('/android-root/apps-and-modules/ad-blocking.md', '/android-root/')).toBe('/apps-and-modules/ad-blocking')
  expect(pageRoute('/android-root/apps-and-modules/ad-blocking#app-adaway', '/android-root/')).toBe('/apps-and-modules/ad-blocking')
})

test('the page index never offers 404, count or unsafe records, and resolves either URL form', () => {
  for (const payload of [null, [], {}, { pages: 'x' }]) expect(() => parsePageIndex(payload)).toThrow()
  const pages = parsePageIndex({
    pages: [
      { title: 'Home', route: '/', markdown: '/index.md' },
      { title: 'Rooting Guides', route: '/rooting-guides/', markdown: '/rooting-guides.md' },
      { title: '404', route: '/404', markdown: '/404.md' },
      { title: 'Count', route: '/count', markdown: '/count.md' },
      { title: 'External', route: '//evil.test/a', markdown: '/a.md' },
      { title: 'Not Markdown', route: '/a', markdown: '/a.html' }
    ]
  })
  expect(pages.map((page) => page.route)).toEqual(['/', '/rooting-guides/'])
  expect(findPage(pages, '/index.md')?.route).toBe('/')
  expect(findPage(pages, '/android-root/rooting-guides#x', '/android-root/')?.markdown).toBe('/rooting-guides.md')
  for (const url of ['/404.md', '/count', '/missing']) expect(findPage(pages, url)).toBeUndefined()
})
