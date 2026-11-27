import { expect, test } from 'bun:test'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { checkLinks } from '../../scripts/check-links.ts'
import { entryAnchor } from '../../docs/.vitepress/shared/entries.ts'

async function fixture(files: Record<string, string>, run: (root: string) => Promise<void>) {
  const root = mkdtempSync(join(tmpdir(), 'aar-links-'))
  try {
    for (const [file, contents] of Object.entries(files)) {
      const path = join(root, file)
      mkdirSync(join(path, '..'), { recursive: true })
      writeFileSync(path, contents)
    }
    await run(root)
  } finally { rmSync(root, { recursive: true, force: true }) }
}

test('shared VitePress anchors, references, encoded clean URLs, assets and entry links resolve under a base', async () => {
  const name = 'AdAway'
  const url = 'https://github.com/AdAway/AdAway'
  await fixture({
    'index.md': `---
description: "[not a link](missing.md)"
---
# Home
[formatted heading](/android-root/guide%20name.html?view=1#root-guide)
[duplicate heading][guide]

[guide]: ./guide%20name.md#root-guide-1
[explicit h1](guide%20name.md#manual)
[HTML id](guide%20name.md#custom)
[linked heading](guide%20name.md#api-guide)
[module](/android-root/apps-and-modules/tools#${entryAnchor(name, url)})
![logo](/android-root/images/logo.svg)
[hub](/android-root/rooting-guides/)
[sitemap](/android-root/sitemap.xml)
\`[inline example](missing.md)\`
\`\`\`\`md
\`\`\`
[example, not a real link](missing.md)
\`\`\`\`
`,
    'guide name.md': '# Manual {#manual}\n## **Root** Guide\n## **Root** Guide\n## [API](https://example.org) Guide\n<span id="custom"></span>\n',
    'apps-and-modules/tools.md': `# Tools\n- **[${name}](${url})** - Blocks ads. \`FOSS\`\n`,
    'rooting-guides/index.md': '# Guides\n',
    'public/images/logo.svg': '<svg></svg>'
  }, async (root) => {
    const result = await checkLinks(root, '/android-root/')
    expect(result.errors).toEqual([])
    expect(result.checked).toBe(9)
  })
})

test('missing references, anchors, images and traversal fail instead of being silently allowed', async () => {
  await fixture({
    'index.md': '# Home\n[broken][ref]\n\n[ref]: missing.md\n\n[local](#absent)\n[other](guide.html#absent)\n![image](/images/missing.svg)\n[escape](../outside.md)\n',
    'guide.md': '## Existing\n'
  }, async (root) => {
    const result = await checkLinks(root)
    expect(result.errors).toHaveLength(5)
    expect(result.errors.join('\n')).toContain('missing anchor #absent on guide.md')
    expect(result.errors.join('\n')).toContain('broken link "/images/missing.svg"')
    expect(result.errors.every((error) => /^index\.md:\d+:/.test(error))).toBe(true)
  })
})
