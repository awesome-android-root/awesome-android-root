import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { APP_CATEGORIES } from '../docs/.vitepress/categoryData.mjs'
import { countCategoryEntries } from '../docs/.vitepress/markdown/entryRows.mjs'

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const docsDirectory = path.join(rootDirectory, 'docs')
const buildDirectory = path.join(docsDirectory, '.vitepress/dist')
const appsDirectory = path.join(docsDirectory, 'apps-and-modules')
const readFile = (filePath) => readFileSync(filePath, 'utf8')

assert.ok(existsSync(buildDirectory), 'Build output was not found. Run `bun run docs:build` first.')

const stats = countCategoryEntries(appsDirectory, APP_CATEGORIES, (filePath) => readFile(filePath))
const rowPattern = /<li\b(?=[^>]*\bclass="[^"]*\baar-entry\b)[^>]*>/g
let renderedTotal = 0

for (const category of stats.categories) {
  const pagePath = path.join(buildDirectory, 'apps-and-modules', `${category.slug}.html`)
  assert.ok(existsSync(pagePath), `Missing built category page: ${category.slug}`)
  const html = readFile(pagePath)
  const renderedRows = html.match(rowPattern) ?? []
  assert.equal(
    renderedRows.length,
    category.count,
    `${category.slug} renders ${renderedRows.length} entry rows; source contains ${category.count}`
  )
  assert.equal((html.match(/class="entry-filter-chip"/g) ?? []).length, 7, `${category.slug} should render all seven filter chips`)
  assert.match(html, /aria-live="polite"/, `${category.slug} is missing the filter status live region`)
  assert.match(html, /aria-pressed="true"/, `${category.slug} is missing the selected All filter state`)
  renderedTotal += renderedRows.length
}

assert.equal(renderedTotal, stats.total, 'Rendered category rows do not match the derived source total')
assert.equal(stats.total, 663, 'Update the fixture assertion when the curated dataset intentionally changes')

const homePath = path.join(buildDirectory, 'index.html')
const categoryIndexPath = path.join(buildDirectory, 'apps-and-modules/index.html')
for (const pagePath of [homePath, categoryIndexPath]) {
  assert.ok(existsSync(pagePath), `Missing built page: ${path.relative(buildDirectory, pagePath)}`)
  const html = readFile(pagePath)
  assert.ok(html.includes(`<span class="entry-count">${stats.total}</span>`), `${path.relative(buildDirectory, pagePath)} does not render the derived total`)
}

const offlinePath = path.join(buildDirectory, 'offline.html')
assert.ok(existsSync(offlinePath), 'PWA offline fallback was not emitted')
assert.ok(statSync(offlinePath).size > 0, 'PWA offline fallback is empty')

console.log(`Verified ${renderedTotal} rendered entry rows across ${stats.categories.length} category pages; derived total ${stats.total}.`)
