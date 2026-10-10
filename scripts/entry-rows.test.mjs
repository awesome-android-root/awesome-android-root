import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import MarkdownIt from 'markdown-it'
import { APP_CATEGORIES } from '../docs/.vitepress/categoryData.mjs'
import {
  countCategoryEntries,
  countMarkdownEntries,
  entryRowsPlugin,
  isEntryLine
} from '../docs/.vitepress/markdown/entryRows.mjs'

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const appsDirectory = path.join(rootDirectory, 'docs/apps-and-modules')
const readCategory = (filePath) => readFileSync(filePath, 'utf8')

test('counts only entries with a linked name and a non-empty description', () => {
  assert.equal(isEntryLine('- **[Example](https://example.com)** - Description `FOSS`'), true)
  assert.equal(isEntryLine('- **[Example](https://example.com)**'), false)
  assert.equal(isEntryLine('- **Example** - Description'), false)
  assert.equal(countMarkdownEntries([
    '- **[One](https://one.example)** - First entry',
    '- **[Two](https://two.example)** - Second entry',
    '- **[Incomplete](https://example.com)**'
  ].join('\n')), 2)
})

test('derived category totals match the Markdown source', () => {
  const stats = countCategoryEntries(appsDirectory, APP_CATEGORIES, (filePath) => readCategory(filePath))
  assert.equal(stats.categories.length, APP_CATEGORIES.length)
  assert.equal(stats.total, stats.categories.reduce((sum, category) => sum + category.count, 0))
  assert.equal(stats.total, 663)
})

test('all curated entries keep the documented format and description length', () => {
  const namePattern = /^[ \t]*-[ \t]+\*\*\[[^\]\r\n]+\]\([^\r\n]*\)\*\*/
  const suffixPattern = /`(?:FOSS|Proprietary|\[(?:M|K|A|LSP)\])`|\|[ \t]*\[(?:🌱|▶️)\]/
  let total = 0

  for (const category of APP_CATEGORIES) {
    const lines = readCategory(path.join(appsDirectory, `${category.slug}.md`)).split(/\r?\n/)
    for (const line of lines.filter(isEntryLine)) {
      total += 1
      const nameMatch = line.match(namePattern)
      assert.ok(nameMatch, `${category.slug} has an entry with an invalid name format: ${line}`)
      const rest = line.slice(nameMatch[0].length)
      const separator = rest.match(/^[ \t]+-[ \t]*/)
      assert.ok(separator, `${category.slug} is missing the required dash separator: ${line}`)
      let description = rest.slice(separator[0].length)
      const suffixIndex = description.search(suffixPattern)
      if (suffixIndex >= 0) description = description.slice(0, suffixIndex)
      const visibleText = description
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/`([^`]*)`/g, '$1')
        .replace(/[*_~]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
      assert.ok(visibleText.length > 0, `${category.slug} has an empty entry description: ${line}`)
      assert.ok(Array.from(visibleText).length <= 140, `${category.slug} entry exceeds 140 characters: ${visibleText}`)
    }
  }

  assert.equal(total, 663)
})

test('entry Markdown is transformed into accessible filterable rows', () => {
  const markdown = [
    '- **[⭐ Example app](https://example.com)** - A short description. `FOSS` `[M]` `[K]`',
    '- **[Plain app](https://plain.example)** - A second description.',
    '- This ordinary list item stays untouched.'
  ].join('\n')
  const html = new MarkdownIt().use(entryRowsPlugin).render(markdown)

  assert.match(html, /<li[^>]*class="aar-entry"[^>]*data-foss="true"[^>]*data-m="true"[^>]*data-k="true"/)
  assert.match(html, /data-rec="true"/)
  assert.match(html, /class="entry-recommended"[^>]*aria-hidden="true"/)
  assert.match(html, /Recommended: /)
  assert.match(html, /class="entry-badge entry-badge-m"[^>]*aria-hidden="true"/)
  assert.match(html, /<span class="visually-hidden">Magisk<\/span>/)
  assert.match(html, /<li[^>]*class="aar-entry"[^>]*><span class="entry-main">/)
  assert.equal((html.match(/class="aar-entry"/g) ?? []).length, 2)
})
