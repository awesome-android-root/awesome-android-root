import { describe, expect, test } from 'bun:test'
import { createSearchSession, rankTitles } from '../docs/.vitepress/theme/utils/search.ts'
import type { PagefindBrowser, SearchResult } from '../docs/.vitepress/theme/utils/search.ts'

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
})
