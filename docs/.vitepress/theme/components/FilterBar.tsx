import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData, withBase } from 'vitepress'

const frameworks = ['Magisk', 'KernelSU', 'APatch', 'LSPosed']

export default defineComponent(() => {
  const { page } = useData()
  const query = ref('')
  const selected = ref<string[]>([])
  const license = ref('')
  const featured = ref(false)
  const count = ref(0)
  const total = ref(0)
  const ready = ref(false)
  const dialog = ref<HTMLDialogElement>()
  let entries: HTMLElement[] = []
  let headings: HTMLElement[] = []
  let restoring = false

  function restore() {
    const params = new URLSearchParams(location.search)
    restoring = true
    query.value = params.get('q') ?? ''
    selected.value = (params.get('framework') ?? '').split(',').filter((value) => frameworks.includes(value))
    license.value = ['FOSS', 'Proprietary'].includes(params.get('license') ?? '') ? params.get('license')! : ''
    featured.value = params.get('featured') === '1'
    restoring = false
    apply(false)
  }
  function apply(updateUrl = true) {
    const search = query.value.trim().toLowerCase()
    for (const entry of entries) {
      const tags = (entry.dataset.frameworks ?? '').split(' ')
      entry.hidden = !(entry.textContent?.toLowerCase().includes(search) &&
        (!selected.value.length || selected.value.some((tag) => tags.includes(tag))) &&
        (!license.value || entry.dataset.license === license.value) &&
        (!featured.value || entry.dataset.featured === 'true'))
    }
    count.value = entries.filter((entry) => !entry.hidden).length
    for (const heading of headings) {
      let sibling = heading.nextElementSibling
      const sectionEntries: HTMLElement[] = []
      while (sibling && !(sibling instanceof HTMLHeadingElement && Number(sibling.tagName[1]) <= Number(heading.tagName[1]))) {
        if (sibling instanceof HTMLElement) sectionEntries.push(...sibling.querySelectorAll<HTMLElement>('.directory-entry'))
        sibling = sibling.nextElementSibling
      }
      if (sectionEntries.length) heading.hidden = sectionEntries.every((entry) => entry.hidden)
    }
    if (updateUrl && !restoring) {
      const url = new URL(location.href)
      for (const key of ['q', 'framework', 'license', 'featured']) url.searchParams.delete(key)
      if (query.value.trim()) url.searchParams.set('q', query.value.trim())
      if (selected.value.length) url.searchParams.set('framework', selected.value.join(','))
      if (license.value) url.searchParams.set('license', license.value)
      if (featured.value) url.searchParams.set('featured', '1')
      history.replaceState(history.state, '', url)
    }
  }
  function clear() { query.value = ''; selected.value = []; license.value = ''; featured.value = false }
  async function setupPage() {
    await nextTick()
    entries = [...document.querySelectorAll<HTMLElement>('.vp-doc .directory-entry')]
    headings = [...document.querySelectorAll<HTMLElement>('.vp-doc h2, .vp-doc h3, .vp-doc h4')]
    total.value = entries.length
    for (const entry of entries) {
      const description = entry.querySelector<HTMLElement>('.entry-description')
      // Do not visually clip interactive links in descriptions.
      if (!description || description.querySelector('a, button') || entry.querySelector('.entry-expand')) continue
      description.classList.add('entry-description--clamped')
      if (description.scrollHeight <= description.clientHeight + 1) { description.classList.remove('entry-description--clamped'); continue }
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'entry-expand'
      button.textContent = 'Show more'
      button.setAttribute('aria-expanded', 'false')
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true'
        description.classList.toggle('entry-description--clamped', expanded)
        button.setAttribute('aria-expanded', String(!expanded))
        button.textContent = expanded ? 'Show more' : 'Show less'
      })
      description.after(button)
    }
    restore()
    ready.value = true
  }
  watch([query, selected, license, featured], () => apply(), { flush: 'sync' })
  watch(() => page.value.relativePath, setupPage)
  onMounted(() => { void setupPage(); window.addEventListener('popstate', restore) })
  onBeforeUnmount(() => { window.removeEventListener('popstate', restore); entries.forEach((entry) => { entry.hidden = false }); headings.forEach((heading) => { heading.hidden = false }) })

  const controls = () => <>
    <label class="filter-search">Filter entries<input type="search" value={query.value} placeholder="Name or description" onInput={(event) => { query.value = (event.currentTarget as HTMLInputElement).value }} /></label>
    <fieldset><legend>Framework</legend><div class="filter-options">{frameworks.map((framework) => <label class="filter-chip"><input type="checkbox" checked={selected.value.includes(framework)} onChange={(event) => { selected.value = (event.currentTarget as HTMLInputElement).checked ? [...selected.value, framework] : selected.value.filter((item) => item !== framework) }} />{framework}</label>)}</div></fieldset>
    <label class="filter-license">License<select value={license.value} onChange={(event) => { license.value = (event.currentTarget as HTMLSelectElement).value }}><option value="">Any license</option><option value="FOSS">FOSS</option><option value="Proprietary">Proprietary</option></select></label>
    <label class="filter-featured"><input type="checkbox" checked={featured.value} onChange={(event) => { featured.value = (event.currentTarget as HTMLInputElement).checked }} /> Featured only</label>
    <button type="button" class="filter-clear" onClick={clear}>Clear filters</button>
  </>
  return () => <div class="directory-filter">
    <p class="directory-legend">Chips show frameworks and licenses. Featured marks a recommended entry. <a href={withBase('/apps-and-modules/#glossary')}>Read the glossary</a>.</p>
    <div class="filter-desktop" aria-label="Filter entries">{controls()}</div>
    <button class="filter-mobile-button" type="button" onClick={() => dialog.value?.showModal()}>Filter entries</button>
    <dialog ref={dialog} class="filter-dialog" aria-label="Filter entries" onClick={(event) => { if (event.target === dialog.value) dialog.value?.close() }}>
      <div class="filter-dialog-content"><div class="filter-dialog-header"><strong>Filter entries</strong><button type="button" onClick={() => dialog.value?.close()}>Done</button></div>{controls()}</div>
    </dialog>
    <p class="filter-count" role="status" aria-live="polite">{!ready.value ? 'Loading filters' : <>{count.value} of {total.value} results{total.value > 0 && count.value === 0 && <>. No matches. <button type="button" onClick={clear}>Clear filters.</button></>}</>}</p>
  </div>
})
