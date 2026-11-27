import { expect, test } from 'bun:test'
import { pwa } from '../../docs/.vitepress/site/pwa.ts'

type Rule = {
  urlPattern: (context: { request: { destination: string }; url: URL; sameOrigin: boolean }) => boolean
  options: { cacheName: string; plugins?: { cacheKeyWillBeUsed?: (context: { request: Request }) => Promise<string> }[] }
}
const rules = (pwa.generateSW?.runtimeCaching ?? []) as unknown as Rule[]
const SITE = 'https://awesome-android-root.xyz'

function cacheFor(href: string, destination = 'image') {
  const url = new URL(href)
  return rules.find((rule) => rule.urlPattern({ request: { destination }, url, sameOrigin: url.origin === SITE }))?.options.cacheName
}

test('only images the app renders are cached; social and structured-data images never are', () => {
  expect(pwa.generateSW?.globPatterns?.join(' ')).not.toMatch(/\*|images\/og|og\.png|logo\.png/)
  expect(cacheFor(`${SITE}/images/fdroid.svg`)).toBe('aar-images-v1')
  for (const path of ['/images/og.png', '/images/og/magisk-guide.png', '/images/logo.png', '/android-root/images/og/samsung.png']) {
    expect(cacheFor(`${SITE}${path}`)).toBeUndefined()
  }
  expect(cacheFor(`${SITE}/images/fdroid.svg`, 'document')).toBeUndefined()
  expect(cacheFor('https://raw.githubusercontent.com/a/b/main/shot.png')).toBeUndefined()
})

test('badges are cached per 4-hour window', async () => {
  const badge = 'https://img.shields.io/github/v/release/topjohnwu/Magisk?label=stable'
  expect(cacheFor(badge)).toBe('aar-badges')
  const keyFor = rules.find((rule) => rule.options.cacheName === 'aar-badges')!.options.plugins![0].cacheKeyWillBeUsed!
  const realNow = Date.now
  try {
    const at = async (ms: number) => { Date.now = () => ms; return keyFor({ request: new Request(badge) }) }
    const window = 4 * 60 * 60 * 1000
    expect(await at(window * 100)).toBe(await at(window * 101 - 1))
    expect(await at(window * 101)).not.toBe(await at(window * 100))
    expect(new URL(await at(window * 100)).searchParams.get('label')).toBe('stable')
  } finally { Date.now = realNow }
})
