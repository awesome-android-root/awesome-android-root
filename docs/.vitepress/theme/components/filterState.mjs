export const FILTER_OPTIONS = Object.freeze([
  { key: 'rec', label: 'Recommended' },
  { key: 'foss', label: 'FOSS' },
  { key: 'm', label: 'Magisk' },
  { key: 'k', label: 'KernelSU' },
  { key: 'a', label: 'APatch' },
  { key: 'lsp', label: 'LSPosed' }
])

const FILTER_KEYS = FILTER_OPTIONS.map(({ key }) => key)
const ALLOWED_FILTERS = new Set(FILTER_KEYS)

export function readFilters(search) {
  const requested = new URLSearchParams(search).get('f')
  if (!requested) return []
  const values = new Set(requested.split(',').filter((key) => ALLOWED_FILTERS.has(key)))
  return FILTER_KEYS.filter((key) => values.has(key))
}

export function toggleFilterSelection(selected, key) {
  if (key === 'all') return []
  if (!ALLOWED_FILTERS.has(key)) return FILTER_KEYS.filter((candidate) => selected.includes(candidate))
  const next = new Set(selected)
  if (next.has(key)) next.delete(key)
  else next.add(key)
  return FILTER_KEYS.filter((candidate) => next.has(candidate))
}

export function matchesEntry(dataset, selected) {
  return selected.every((key) => dataset[key] === 'true')
}

export function filterQuery(filters) {
  const ordered = FILTER_KEYS.filter((key) => filters.includes(key))
  return ordered.length ? ordered.join(',') : ''
}
