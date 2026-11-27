import { expect, test } from 'bun:test'
import { createMarkdownRenderer } from 'vitepress'
import { markdownOptions } from '../../docs/.vitepress/markdown/index.ts'

// Verify store rendering, not the underlying Markdown library's parser itself.
test('store badges render through the shared site pipeline and reject lookalike hosts', async () => {
  const md = await createMarkdownRenderer(new URL('../../docs', import.meta.url).pathname, markdownOptions)
  expect(md.render('[🌱 **F-Droid**](https://f-droid.org/packages/a)')).toContain('<StoreLink store="fdroid"')
  expect(md.render('[🌱](https://f-droid.org.evil.test/a)')).not.toContain('StoreLink')
  expect(md.render('[Read more](https://f-droid.org/)')).not.toContain('StoreLink')
})
