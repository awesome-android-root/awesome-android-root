import { expect, test } from 'bun:test'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { buildPageIndex, pageLocations } from '../../scripts/page-index.ts'

test('maps source pages to clean routes and the Markdown copies llms emits', () => {
  expect(pageLocations('index.md')).toEqual({ route: '/', markdown: '/index.md' })
  expect(pageLocations('rooting-guides/index.md')).toEqual({ route: '/rooting-guides/', markdown: '/rooting-guides.md' })
  expect(pageLocations('rooting-guides/magisk-guide.md')).toEqual({ route: '/rooting-guides/magisk-guide', markdown: '/rooting-guides/magisk-guide.md' })
})

test('indexes listed pages only and fails when a Markdown copy is missing', async () => {
  const outDir = mkdtempSync(join(tmpdir(), 'aar-page-index-'))
  const srcDir = mkdtempSync(join(tmpdir(), 'aar-page-src-'))
  try {
    writeFileSync(join(outDir, 'index.md'), '---\nurl: /index.md\n---\n\n## Start')
    writeFileSync(join(outDir, 'faqs.md'), '```md\n# Not this\n```\n# FAQ')
    writeFileSync(join(outDir, '404.md'), '# 404')
    writeFileSync(join(outDir, 'count.md'), '# Count')
    writeFileSync(join(srcDir, 'index.md'), '---\ntitle: Home Page\n---\n')
    expect(await buildPageIndex(outDir, srcDir, ['index.md', 'faqs.md', '404.md', 'count.md'])).toEqual([
      { title: 'FAQ', route: '/faqs', markdown: '/faqs.md' },
      { title: 'Home Page', route: '/', markdown: '/index.md' }
    ])
    await expect(buildPageIndex(outDir, srcDir, ['missing.md'])).rejects.toThrow('no Markdown copy')
  } finally {
    rmSync(outDir, { recursive: true, force: true })
    rmSync(srcDir, { recursive: true, force: true })
  }
})
