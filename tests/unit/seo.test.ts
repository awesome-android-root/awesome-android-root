import { expect, test } from 'bun:test'
import type { HeadConfig, TransformContext } from 'vitepress'
import { sitemap, transformHead } from '../../docs/.vitepress/site/seo.ts'

function headFor(relativePath: string): HeadConfig[] {
  const pageData = { relativePath, title: 'Title', description: 'Description', frontmatter: {}, headers: [], filePath: relativePath }
  // transformHead only reads pageData; the rest of the render context is irrelevant here.
  return transformHead({ pageData } as unknown as TransformContext)
}

const robots = (head: HeadConfig[]) => head.find(([tag, attrs]) => tag === 'meta' && attrs.name === 'robots')?.[1].content

test('the maintainer-only count page is noindex, other pages keep the global robots meta', () => {
  expect(robots(headFor('count.md'))).toBe('noindex, follow')
  expect(robots(headFor('faqs.md'))).toBeUndefined()
  expect(robots(headFor('index.md'))).toBeUndefined()
})

test('the sitemap drops 404 and /count but keeps documentation pages', async () => {
  const urls = ['404', '404.html', 'count', 'count.html', 'faqs', 'rooting-guides/', '']
  const kept = await sitemap?.transformItems?.(urls.map((url) => ({ url })))
  expect(kept?.map((item) => item.url)).toEqual(['faqs', 'rooting-guides/', ''])
})
