import { describe, expect, test } from 'bun:test'
import { createPagefindLoader, createSearchSession, rankTitles } from '../../docs/.vitepress/theme/utils/search.ts'
import type { PagefindBrowser, SearchResult } from '../../docs/.vitepress/theme/utils/search.ts'

const result: SearchResult = { url: '/adaway', excerpt: '<mark>AdAway</mark>', meta: { title: 'AdAway' } }
function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (reason: unknown) => void
  const promise = new Promise<T>((done, fail) => { resolve = done; reject = fail })
  return { promise, resolve, reject }
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


test('a late rejected import cannot evict a fresh engine; reset destroys the active instance', async () => {
  const first = deferred<PagefindBrowser>()
  const paths: string[] = []
  let destroyed = 0
  const engine: PagefindBrowser = {
    init: async () => {}, options: async () => {},
    destroy: async () => { destroyed++ }, search: async () => ({ results: [] })
  }
  const loader = createPagefindLoader((path) => {
    paths.push(path)
    return paths.length === 1 ? first.promise : Promise.resolve(engine)
  })
  const failure = new Error('old request failed')
  const old = loader.load('/android-root/').catch((error: unknown) => error)
  const reset = loader.reset()
  expect(await loader.load('/android-root/')).toBe(engine)
  first.reject(failure)
  await reset
  expect(await old).toBe(failure)
  expect(await loader.load('/android-root/')).toBe(engine)
  expect(paths).toEqual(['/android-root/pagefind/pagefind.js', '/android-root/pagefind/pagefind.js?retry=2'])
  await loader.reset()
  expect(destroyed).toBe(1)
})
