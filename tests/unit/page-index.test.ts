import { expect, test } from 'bun:test'
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildPageIndex, frontmatterTitle, markdownTitle, pageLocations, writePageIndex } from '../../scripts/page-index.ts'

function fixture(files: Record<string, string>) {
  const root = mkdtempSync(join(tmpdir(), 'aar-page-index-'))
  for (const [file, contents] of Object.entries(files)) {
    mkdirSync(join(root, file, '..'), { recursive: true })
    writeFileSync(join(root, file), contents)
  }
  return root
}

test('maps source pages to clean routes and the Markdown copies llms emits', () => {
  expect(pageLocations('index.md')).toEqual({ route: '/', markdown: '/index.md' })
  expect(pageLocations('rooting-guides/index.md')).toEqual({ route: '/rooting-guides/', markdown: '/rooting-guides.md' })
  expect(pageLocations('rooting-guides/magisk-guide.md')).toEqual({ route: '/rooting-guides/magisk-guide', markdown: '/rooting-guides/magisk-guide.md' })
  expect(pageLocations('faqs.md')).toEqual({ route: '/faqs', markdown: '/faqs.md' })
})

test('titles come from the first h1 outside frontmatter and fences, then frontmatter', () => {
  expect(markdownTitle('---\nurl: /a.md\n---\n\n```md\n# Not this\n```\n# Real Title\n# Second')).toBe('Real Title')
  expect(markdownTitle('## Only h2')).toBeUndefined()
  expect(frontmatterTitle('---\ntitle: "Quoted: Title"\n---\n')).toBe('Quoted: Title')
  expect(frontmatterTitle('# No frontmatter')).toBeUndefined()
})

test('indexes listed pages only and fails when a Markdown copy is missing', async () => {
  const outDir = fixture({
    'index.md': '---\nurl: /index.md\n---\n\n## Start',
    'faqs.md': '# FAQ',
    'rooting-guides.md': '# Rooting Guides',
    '404.md': '# 404',
    'count.md': '# Count'
  })
  const srcDir = fixture({ 'index.md': '---\ntitle: Home Page\n---\n' })
  try {
    const pages = ['rooting-guides/index.md', 'index.md', 'faqs.md', '404.md', 'count.md']
    expect(await buildPageIndex(outDir, srcDir, pages)).toEqual([
      { title: 'FAQ', route: '/faqs', markdown: '/faqs.md' },
      { title: 'Home Page', route: '/', markdown: '/index.md' },
      { title: 'Rooting Guides', route: '/rooting-guides/', markdown: '/rooting-guides.md' }
    ])
    expect(await writePageIndex(outDir, srcDir, pages)).toBe(3)
    const written: { pages: unknown[] } = JSON.parse(readFileSync(join(outDir, 'page-index.json'), 'utf8'))
    expect(written.pages).toHaveLength(3)
    await expect(buildPageIndex(outDir, srcDir, ['missing.md'])).rejects.toThrow('no Markdown copy')
  } finally {
    rmSync(outDir, { recursive: true, force: true })
    rmSync(srcDir, { recursive: true, force: true })
  }
})
