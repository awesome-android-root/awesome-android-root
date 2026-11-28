import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'

const frameworks = ['Magisk', 'KernelSU', 'APatch', 'LSPosed']
const PIN_STORAGE_KEY = 'aar:directory-filters-pinned'

export default defineComponent(() => {
  const { page } = useData()
  const query = ref('')
  const selected = ref<string[]>([])
  const license = ref('')
  const count = ref(0)
  const total = ref(0)
  const ready = ref(false)
  const dialog = ref<HTMLDialogElement>()
  const dialogOpen = ref(false)
  const pinned = ref(false)
  const activeFilters = computed(() => [
    ...selected.value,
    ...(license.value ? [license.value] : [])
  ])
  const hasFilters = computed(() => !!query.value.trim() || activeFilters.value.length > 0)
  let entries: { element: HTMLElement; text: string; tags: string[]; license: string }[] = []
  let sections: { heading: HTMLElement; entries: HTMLElement[] }[] = []
  let restoring = false

  function restore() {
    const params = new URLSearchParams(location.search)
    restoring = true
    query.value = params.get('q') ?? ''
    // URLSearchParams decodes + as a space; accept old comma-separated links too.
    selected.value = [...new Set((params.get('framework') ?? '').split(/[\s,]+/).filter((value) => frameworks.includes(value)))]
    license.value = ['FOSS', 'Proprietary'].includes(params.get('license') ?? '') ? params.get('license')! : ''
    // Remove the retired filter from links shared before the star was restored.
    if (params.has('featured')) {
      const url = new URL(location.href)
      url.searchParams.delete('featured')
      history.replaceState(history.state, '', url)
    }
    restoring = false
    apply(false)
  }
  function apply(updateUrl = true) {
    const search = query.value.trim().toLowerCase()
    let visible = 0
    for (const entry of entries) {
      entry.element.hidden = !(entry.text.includes(search) &&
        (!selected.value.length || selected.value.some((tag) => entry.tags.includes(tag))) &&
        (!license.value || entry.license === license.value))
      if (!entry.element.hidden) visible++
    }
    count.value = visible
    for (const section of sections) {
      section.heading.hidden = section.entries.every((entry) => entry.hidden)
    }
    if (updateUrl && !restoring) {
      const url = new URL(location.href)
      for (const key of ['q', 'framework', 'license', 'featured']) url.searchParams.delete(key)
      if (query.value.trim()) url.searchParams.set('q', query.value.trim())
      if (selected.value.length) url.searchParams.set('framework', selected.value.join(' '))
      if (license.value) url.searchParams.set('license', license.value)
      history.replaceState(history.state, '', url)
    }
  }
  function clear() {
    restoring = true
    query.value = ''; selected.value = []; license.value = ''
    restoring = false
    apply()
  }
  async function setupPage() {
    await nextTick()
    entries = [...document.querySelectorAll<HTMLElement>('.vp-doc .directory-entry')].map((element) => ({
      element,
      text: (element.textContent ?? '').toLowerCase(),
      tags: (element.dataset.frameworks ?? '').split(' '),
      license: element.dataset.license ?? ''
    }))
    sections = [...document.querySelectorAll<HTMLElement>('.vp-doc h2, .vp-doc h3, .vp-doc h4')].flatMap((heading) => {
      let sibling = heading.nextElementSibling
      const sectionEntries: HTMLElement[] = []
      while (sibling && !(sibling instanceof HTMLHeadingElement && Number(sibling.tagName[1]) <= Number(heading.tagName[1]))) {
        sectionEntries.push(...sibling.querySelectorAll<HTMLElement>('.directory-entry'))
        sibling = sibling.nextElementSibling
      }
      return sectionEntries.length ? [{ heading, entries: sectionEntries }] : []
    })
    total.value = entries.length
    restore()
    ready.value = true
  }
  watch([query, selected, license], () => { if (!restoring) apply() }, { flush: 'sync' })
  watch(() => page.value.relativePath, setupPage)
  onMounted(() => {
    try { pinned.value = localStorage.getItem(PIN_STORAGE_KEY) === 'true' } catch { /* Pinning still works for this page. */ }
    void setupPage()
    window.addEventListener('popstate', restore)
  })
  watch(pinned, (value) => { try { localStorage.setItem(PIN_STORAGE_KEY, String(value)) } catch { /* Storage is optional. */ } })
  onBeforeUnmount(() => { window.removeEventListener('popstate', restore); entries.forEach((entry) => { entry.element.hidden = false }); sections.forEach(({ heading }) => { heading.hidden = false }) })

  function openDialog() {
    dialog.value?.showModal()
    dialogOpen.value = !!dialog.value?.open
  }

  return () => <>
    <p class="directory-legend">Chips show frameworks and licenses. A star marks a recommended entry. <a href={withBase('/apps-and-modules/#glossary')}>Read the glossary</a>.</p>
    <div class={['directory-filter', { 'directory-filter--pinned': pinned.value }]} aria-label="Filter entries">
      <div class="filter-toolbar">
        <label class="filter-search"><span class="filter-visually-hidden">Filter entries by name or description</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/></svg>
          <input type="search" value={query.value} placeholder="Search" onInput={(event) => { query.value = (event.currentTarget as HTMLInputElement).value }} />
        </label>
        <button class="filter-trigger" type="button" aria-haspopup="dialog" aria-controls="directory-filter-dialog" aria-expanded={dialogOpen.value} onClick={openDialog}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M7 12h10M10 17h4"/></svg>
          Filters{activeFilters.value.length > 0 && <span class="filter-badge" aria-label={`${activeFilters.value.length} active filters`}>{activeFilters.value.length}</span>}
        </button>
        <button type="button" class={['filter-pin', { 'filter-pin--active': pinned.value }]} aria-pressed={pinned.value} aria-label="Keep filters visible while scrolling" title={pinned.value ? 'Unpin filters' : 'Pin filters while scrolling'} onClick={() => { pinned.value = !pinned.value }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 3 21 8l-3 1-3 5v3l-2 2-4-4-5 5 5-5-4-4 2-2h3l5-3z"/></svg>
          {pinned.value ? 'Pinned' : 'Pin'}
        </button>
      </div>
      <div class="filter-meta">
        <p class="filter-count" role="status" aria-live="polite">{!ready.value ? 'Loading filters' : `${count.value} of ${total.value} results`}</p>
        {activeFilters.value.length > 0 && <p class="filter-active" title={activeFilters.value.join(', ')}><span class="filter-visually-hidden">Active filters: </span>{activeFilters.value.join(' · ')}</p>}
        {hasFilters.value && <button type="button" class="filter-clear" onClick={clear}>Clear</button>}
      </div>
      {ready.value && total.value > 0 && count.value === 0 && <p class="filter-empty" role="status">No matches. <button type="button" onClick={clear}>Clear filters.</button></p>}
    </div>
    <dialog id="directory-filter-dialog" ref={dialog} class="filter-dialog" aria-labelledby="filter-dialog-title" onClose={() => { dialogOpen.value = false }} onClick={(event) => { if (event.target === dialog.value) dialog.value?.close() }}>
      <div class="filter-dialog-content">
        <div class="filter-dialog-header"><div><strong id="filter-dialog-title">Filter entries</strong><p>Choose the tags that match your setup.</p></div><button type="button" onClick={() => dialog.value?.close()}>Done</button></div>
        <fieldset><legend>Framework <span>Match any</span></legend><div class="filter-options">{frameworks.map((framework) => <label class="filter-chip"><input type="checkbox" checked={selected.value.includes(framework)} onChange={(event) => { selected.value = (event.currentTarget as HTMLInputElement).checked ? [...selected.value, framework] : selected.value.filter((item) => item !== framework) }} />{framework}</label>)}</div></fieldset>
        <label class="filter-license">License<select value={license.value} onChange={(event) => { license.value = (event.currentTarget as HTMLSelectElement).value }}><option value="">Any license</option><option value="FOSS">FOSS</option><option value="Proprietary">Proprietary</option></select></label>
        <div class="filter-dialog-footer"><button type="button" disabled={!hasFilters.value} onClick={clear}>Clear filters</button><span>{ready.value ? `${count.value} of ${total.value} results` : 'Loading filters'}</span></div>
      </div>
    </dialog>
  </>
})
