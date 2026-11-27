import { expect, test } from 'bun:test'
import type { TransformContext } from 'vitepress'
import { sitemap, transformHead } from '../../docs/.vitepress/site/seo.ts'

test('the maintainer-only count page is noindex and kept out of the sitemap', async () => {
  const robots = (relativePath: string) => transformHead({ pageData: { relativePath, title: 'T', description: 'D', frontmatter: {} } } as unknown as TransformContext)
    .find(([tag, attrs]) => tag === 'meta' && attrs.name === 'robots')?.[1].content
  expect(robots('count.md')).toBe('noindex, follow')
  expect(robots('faqs.md')).toBeUndefined()

  const kept = await sitemap?.transformItems?.(['404', 'count', 'count.html', 'faqs', ''].map((url) => ({ url })))
  expect(kept?.map((item) => item.url)).toEqual(['faqs', ''])
})
