import { defineComponent, Teleport, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useData, useRouter } from 'vitepress'
import { createSearchSession, loadPagefind, resetPagefind } from '../utils/search'
import type { SearchResult } from '../utils/search'
import './SearchDialog.css'

export default defineComponent({
  props: { opened: { type: Boolean, required: true } },
  emits: { close: () => true },
  setup(props, { emit }) {
    const { site } = useData()
    const router = useRouter()
    const dialog = ref<HTMLDialogElement>()
    const input = ref<HTMLInputElement>()
    const query = ref('')
    const results = ref<SearchResult[]>([])
    const status = ref<'idle' | 'loading' | 'ready' | 'error'>('idle')
    const selected = ref(-1)
    const session = createSearchSession()
    let timer: ReturnType<typeof setTimeout> | undefined
    let generation = 0

    function cancel() {
      generation++
      clearTimeout(timer)
      session.cancel()
    }
    function close() {
      cancel()
      dialog.value?.close()
      emit('close')
    }
    function onNativeClose() {
      // A queued close event may arrive after the user has reopened the dialog.
      if (!dialog.value?.open) { cancel(); emit('close') }
    }
    watch(() => props.opened, async (opened) => {
      await nextTick()
      if (opened !== props.opened) return
      if (opened) {
        dialog.value?.showModal()
        input.value?.focus()
        input.value?.select()
        // Warm only engine/metadata on interaction, never the complete corpus.
        // Report failures when a query is submitted, with the normal Retry state.
        void loadPagefind(site.value.base).then((engine) => engine.init()).catch(() => {})
        if (query.value.trim()) scheduleSearch()
      } else dialog.value?.close()
    }, { immediate: true })

    function scheduleSearch() {
      cancel()
      selected.value = -1
      results.value = []
      if (!query.value.trim()) { status.value = 'idle'; return }
      status.value = 'loading'
      const current = generation
      timer = setTimeout(async () => {
        try {
          const pagefind = await loadPagefind(site.value.base)
          if (current !== generation) return
          const found = await session.run(pagefind, query.value)
          if (found === null || current !== generation) return
          results.value = found
          status.value = 'ready'
        } catch {
          if (current === generation) status.value = 'error'
        }
      }, 180)
    }
    watch(query, scheduleSearch)
    onBeforeUnmount(cancel)

    async function retry() {
      cancel()
      status.value = 'loading'
      await resetPagefind()
      if (props.opened) scheduleSearch()
    }

    async function navigate(result: SearchResult) {
      close()
      await router.go(result.url)
    }
    function keyboard(event: KeyboardEvent) {
      if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && results.value.length) {
        event.preventDefault()
        selected.value = (selected.value + (event.key === 'ArrowDown' ? 1 : -1) + results.value.length) % results.value.length
        document.getElementById(`search-result-${selected.value}`)?.scrollIntoView({ block: 'nearest' })
      } else if (event.key === 'Enter' && results.value.length) {
        event.preventDefault()
        void navigate(results.value[Math.max(0, selected.value)])
      }
    }

    return () => (
      <Teleport to="body">
        <dialog
          ref={dialog} class="aar-search-dialog" aria-label="Search documentation" closedby="any"
          onCancel={() => emit('close')} onClose={onNativeClose}
          onClick={(event) => { if (event.target === dialog.value) close() }}
        >
          <div class="search-panel">
            <div class="search-controls">
              <label for="aar-search-input" class="search-label">Search</label>
              <input
                id="aar-search-input" ref={input} value={query.value}
                onInput={(event) => { if (event.currentTarget instanceof HTMLInputElement) query.value = event.currentTarget.value }}
                type="text" inputmode="search" enterkeyhint="search" placeholder="Search apps, modules and guides"
                autocomplete="off" autofocus role="combobox" aria-autocomplete="list" aria-controls="aar-search-results"
                aria-expanded={results.value.length > 0}
                aria-activedescendant={selected.value >= 0 ? `search-result-${selected.value}` : undefined}
                onKeydown={keyboard}
              />
              {query.value && <button type="button" aria-label="Reset search" onClick={() => { query.value = ''; input.value?.focus() }}>Clear</button>}
              <button type="button" aria-label="Close search" onClick={close}>Esc</button>
            </div>
            <p class="search-status" role="status" aria-live="polite">
              {status.value === 'idle' ? 'Search Android root apps, modules and documentation.'
                : status.value === 'loading' ? 'Searching…'
                : status.value === 'error' ? <>Search is unavailable. <button type="button" onClick={retry}>Retry</button>. For local search, build the site and use docs:preview.</>
                : !results.value.length ? `No results for “${query.value}”. Try a shorter name or another spelling.`
                : `Showing up to ${results.value.length} top results`}
            </p>
            <ul id="aar-search-results" role="listbox" aria-label="Search results">
              {results.value.map((result, index) => <li id={`search-result-${index}`} key={result.url} role="option" aria-selected={selected.value === index}>
                <a href={result.url} onClick={(event) => { event.preventDefault(); void navigate(result) }} onFocus={() => { selected.value = index }}>
                  <strong>{result.meta.title || result.url}</strong>
                  {/* Pagefind's excerpt is HTML-escaped by its API, with only mark tags added. */}
                  <span class="search-excerpt" innerHTML={result.excerpt} />
                </a>
              </li>)}
            </ul>
            <footer>↑↓ to navigate · Enter to select · Esc to close</footer>
          </div>
        </dialog>
      </Teleport>
    )
  }
})
