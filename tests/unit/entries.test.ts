import { expect, test } from 'bun:test'
import { entryAnchor, parseEntryLine } from '../../docs/.vitepress/shared/entries.ts'

test('one parser splits entry lines for the linter, app index and search anchors', () => {
  expect(parseEntryLine('- **[⭐ AdAway](https://github.com/AdAway/AdAway)** - Blocks ads. `FOSS` | [🌱](https://f-droid.org/packages/org.adaway)')).toEqual({
    rawName: '⭐ AdAway',
    url: 'https://github.com/AdAway/AdAway',
    rest: 'Blocks ads. `FOSS` | [🌱](https://f-droid.org/packages/org.adaway)'
  })
  for (const line of [
    '- [Plain link](https://example.com) - Not bold.',
    '- **[Unclosed](https://example.com) - Missing bold close.',
    '- **[Space in URL](https://example.com/a b)** - Bad URL.'
  ]) expect(parseEntryLine(line)).toBeNull()
})

test('entry anchors are public URLs and must not change when a star is added or removed', () => {
  const plain = parseEntryLine('- **[AdAway](https://github.com/AdAway/AdAway)** - Ads.')!
  const starred = parseEntryLine('- **[⭐ AdAway](https://github.com/AdAway/AdAway)** - Ads.')!
  expect(entryAnchor(starred.rawName, starred.url)).toBe(entryAnchor(plain.rawName, plain.url))
})
