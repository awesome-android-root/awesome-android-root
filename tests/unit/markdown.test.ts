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

test('directory entries gain labeled metadata without changing anchors or other lists', async () => {
  const md = await createMarkdownRenderer(new URL('../../docs', import.meta.url).pathname, markdownOptions)
  const source = '# Category\n\nIntro.\n\n## Tools\n\n- **[⭐ Example](https://example.com)** - A useful tool. `FOSS` `[M]` `[K]` | [🌱](https://f-droid.org/packages/a)\n'
  const rendered = md.render(source, { relativePath: 'apps-and-modules/test.md' })
  expect(rendered).toContain('<FilterBar />')
  expect(rendered).toContain('class="directory-entry"')
  expect(rendered).toContain('data-frameworks="FOSS Magisk KernelSU"')
  expect(rendered).toContain('⭐ Example</a>')
  expect(rendered).toContain('</strong> - A useful tool.')
  expect(rendered).toContain('class="entry-chip entry-chip--magisk">Magisk')
  expect(rendered).toContain('<StoreLink store="fdroid"')
  expect(md.render(source, { relativePath: 'rooting-guides/test.md' })).not.toContain('directory-entry')
})
