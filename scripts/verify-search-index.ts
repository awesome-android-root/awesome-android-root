import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { gunzipSync } from 'node:zlib'
import { parseEntries } from './app-entries.ts'
import { entryAnchor } from '../docs/.vitepress/shared/entries.ts'

const dist = join(import.meta.dirname, '../docs/.vitepress/dist')
const assets = readdirSync(join(dist, 'assets'), { recursive: true })
assert.ok(!assets.some((file) => typeof file === 'string' && /localSearchIndex|VPLocalSearchBox/.test(file)), 'Obsolete MiniSearch chunks were emitted')
const directory = join(dist, 'pagefind')
const manifest: unknown = JSON.parse(readFileSync(join(directory, 'pagefind-entry.json'), 'utf8'))
assert.ok(manifest && typeof manifest === 'object' && 'languages' in manifest)
const fragments = readdirSync(join(directory, 'fragment'))
const urls = new Set<string>()
const contents = new Map<string, string>()
for (const fragment of fragments) {
  // Pagefind 1.x fragments are gzipped JSON with a pagefind_dcd marker.
  const raw = gunzipSync(readFileSync(join(directory, 'fragment', fragment))).toString()
  assert.ok(raw.startsWith('pagefind_dcd'))
  const data: unknown = JSON.parse(raw.slice('pagefind_dcd'.length))
  assert.ok(data && typeof data === 'object' && 'url' in data && 'content' in data && 'meta' in data)
  assert.equal(typeof data.url, 'string')
  assert.equal(typeof data.content, 'string')
  const url = String(data.url)
  const content = String(data.content)
  assert.ok(content.trim(), `Empty fragment: ${url}`)
  assert.ok(!urls.has(url), `Duplicate fragment: ${url}`)
  urls.add(url)
  contents.set(url, content)
  assert.ok(!/\.html(?:#|$)/.test(url), `Non-clean URL: ${url}`)
  assert.ok(!content.includes('Suggest an edit on GitHub'), `Edit UI indexed: ${url}`)
  assert.ok(!content.includes('to navigate · Enter to select'), `Search UI indexed: ${url}`)
  assert.ok(!/Copyright © \d{4} Awesome Android Root Project/.test(content), `Footer indexed: ${url}`)
  if (!url.includes('#app-')) {
    const file = url.endsWith('/') ? `${url}index.html` : `${url}.html`
    assert.ok(readFileSync(join(dist, file), 'utf8').includes('vp-doc'))
  }
}
let expected = 0
for (const { fileName, records } of parseEntries()) {
  if (fileName === 'index.md') continue
  const html = readFileSync(join(dist, 'apps-and-modules', fileName.replace(/\.md$/, '.html')), 'utf8')
  for (const record of records) {
    assert.ok(!record.malformed)
    const anchor = entryAnchor(record.name, record.url)
    const url = `/apps-and-modules/${fileName.replace(/\.md$/, '')}#${anchor}`
    assert.ok(urls.has(url), `Missing search record: ${record.name}`)
    assert.ok(html.includes(`id="${anchor}"`), `Missing destination: ${record.name}`)
    expected++
  }
}
for (const file of readdirSync(join(dist, '../../'), { recursive: true })) {
  // Frontmatter exclusions are verified from sources, not a hand-maintained list.
  if (typeof file !== 'string' || !file.endsWith('.md') || file.startsWith('.vitepress/') || file.startsWith('public/')) continue
  const markdown = readFileSync(join(dist, '../../', file), 'utf8')
  const frontmatter = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || ''
  if (/^search:\s*false\s*$/m.test(frontmatter)) {
    const url = '/' + file.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
    assert.ok(!urls.has(url), `Excluded page indexed: ${url}`)
  }
}
assert.ok(!urls.has('/404'))
assert.ok(contents.get('/apps-and-modules/ad-blocking')?.includes('AdAway.') === false, 'Directory entries were indexed twice')
console.log(`Index verification passed: ${expected} entry anchors, ${urls.size - expected} pages, no duplicate/empty fragments or excluded UI.`)
