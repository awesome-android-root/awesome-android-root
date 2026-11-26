import { expect, test } from 'bun:test'
import { toolInput, stringInput, resultLimit, pageRoute } from '../docs/.vitepress/theme/utils/mcp.ts'

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
