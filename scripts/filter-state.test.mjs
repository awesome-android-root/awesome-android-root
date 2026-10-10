import assert from 'node:assert/strict'
import { test } from 'node:test'
import {
  FILTER_OPTIONS,
  filterQuery,
  matchesEntry,
  readFilters,
  toggleFilterSelection
} from '../docs/.vitepress/theme/components/filterState.mjs'

const keys = FILTER_OPTIONS.map(({ key }) => key)

test('restores only valid URL filters in the documented order', () => {
  assert.deepEqual(readFilters('?f=m,unknown,foss,m,lsp'), ['foss', 'm', 'lsp'])
  assert.deepEqual(readFilters('?f='), [])
  assert.deepEqual(readFilters('?other=foss'), [])
})

test('filter chips toggle, preserve canonical order, and clear all', () => {
  assert.deepEqual(toggleFilterSelection([], 'm'), ['m'])
  assert.deepEqual(toggleFilterSelection(['m'], 'foss'), ['foss', 'm'])
  assert.deepEqual(toggleFilterSelection(['foss', 'm'], 'foss'), ['m'])
  assert.deepEqual(toggleFilterSelection(['foss', 'm'], 'all'), [])
  assert.deepEqual(toggleFilterSelection(['m'], 'not-a-filter'), ['m'])
})

test('serializes shareable filter state without unknown values', () => {
  assert.equal(filterQuery(['m', 'foss', 'invalid']), 'foss,m')
  assert.equal(filterQuery([]), '')
  assert.deepEqual(readFilters(`?f=${encodeURIComponent(filterQuery(keys))}`), keys)
})

test('matches multiple filters with AND semantics', () => {
  const entry = { foss: 'true', m: 'true', k: 'false' }
  assert.equal(matchesEntry(entry, []), true)
  assert.equal(matchesEntry(entry, ['foss']), true)
  assert.equal(matchesEntry(entry, ['foss', 'm']), true)
  assert.equal(matchesEntry(entry, ['foss', 'k']), false)
})
