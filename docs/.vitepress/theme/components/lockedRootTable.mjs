// Shared by the page-local Vue component and its dependency-free tests.
export const columns = [
  ['name', 'App / Tool'], ['category', 'Category'], ['devices', 'Supported Devices'],
  ['firmware', 'Android / Firmware'], ['bootloader', 'Bootloader Requirement'],
  ['root', 'Root Access'], ['requirements', 'Requirements'], ['status', 'Status'],
  ['source', 'Source / Download'], ['documentation', 'Documentation']
]

export function selectTools(tools, filters = {}, sortKey = 'name', direction = 'asc') {
  const terms = (filters.query || '').trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
  return tools.filter(tool => {
    const searchable = JSON.stringify(tool).toLocaleLowerCase()
    return terms.every(term => searchable.includes(term)) &&
      (!filters.category || tool.category === filters.category) &&
      (!filters.bootloader || tool.bootloader === filters.bootloader) &&
      (!filters.android || (filters.android === 'Unknown' ? !tool.android.length : tool.android.includes(Number(filters.android)))) &&
      (!filters.evidence || tool.evidence === filters.evidence) &&
      (!filters.status || tool.status === filters.status)
  }).sort((a, b) => {
    const key = columns.some(([key]) => key === sortKey) ? sortKey : 'name'
    const result = String(a[key]).localeCompare(String(b[key]), 'en', { numeric: true }) || a.id.localeCompare(b.id)
    return direction === 'desc' ? -result : result
  })
}
