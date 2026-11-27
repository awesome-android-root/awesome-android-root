import { expect, test } from 'bun:test'
import { ENTRY_RE, entryAnchor, parseEntryLine } from '../../docs/.vitepress/shared/entries.ts'
import type { EntryIndex } from '../../docs/.vitepress/shared/entries.ts'
import { indexIsCurrent, serializeIndex } from '../../scripts/app-entries.ts'

test('parses names, stars, primary URLs and descriptions with badges', () => {
  expect(parseEntryLine('- **[⭐ AdAway](https://github.com/AdAway/AdAway)** - Blocks ads using the hosts file. `FOSS` | [🌱](https://f-droid.org/packages/org.adaway)')).toEqual({
    rawName: '⭐ AdAway',
    url: 'https://github.com/AdAway/AdAway',
    rest: 'Blocks ads using the hosts file. `FOSS` | [🌱](https://f-droid.org/packages/org.adaway)'
  })
  expect(parseEntryLine('- **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** Detaches apps. `FOSS` `[M]`')).toEqual({
    rawName: 'Zygisk Detach',
    url: 'https://github.com/j-hc/zygisk-detach',
    rest: 'Detaches apps. `FOSS` `[M]`'
  })
  expect(parseEntryLine('- **[No Description](https://example.com)**')?.rest).toBe('')
})

test('rejects lines that are not entries', () => {
  for (const line of [
    '- [Plain link](https://example.com) - Not bold.',
    '- **[Unclosed](https://example.com) - Missing bold close.',
    '- **[Space in URL](https://example.com/a b)** - Bad URL.',
    '* **[Star bullet](https://example.com)** - Wrong bullet.',
    '## Heading'
  ]) expect(parseEntryLine(line)).toBeNull()
  expect(ENTRY_RE.flags).toContain('u')
})

test('search anchors ignore the recommended star', () => {
  const plain = parseEntryLine('- **[AdAway](https://github.com/AdAway/AdAway)** - Ads.')!
  const starred = parseEntryLine('- **[⭐ AdAway](https://github.com/AdAway/AdAway)** - Ads.')!
  expect(entryAnchor(starred.rawName, starred.url)).toBe(entryAnchor(plain.rawName, plain.url))
})

test('the check mode detects a stale or missing committed index', () => {
  const payload: EntryIndex = { source: 'docs/apps-and-modules/*.md', count: 1, pages: { audio: 1 }, entries: [{ n: 'A', u: 'https://a.test', a: ['https://a.test'], t: ['FOSS'], p: 'audio', s: 'Audio' }] }
  expect(indexIsCurrent(payload, serializeIndex(payload))).toBe(true)
  expect(indexIsCurrent(payload, serializeIndex({ ...payload, count: 2 }))).toBe(false)
  expect(indexIsCurrent(payload, null)).toBe(false)
})
