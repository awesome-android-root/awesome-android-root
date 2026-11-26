<script setup lang="ts">
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useData, useRouter } from 'vitepress'
import { createSearchSession, loadPagefind, resetPagefind } from '../utils/search'
import type { SearchResult } from '../utils/search'

const props = defineProps<{ opened: boolean }>()
const emit = defineEmits<{ close: [] }>()
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
</script>

<template>
  <Teleport to="body">
    <dialog ref="dialog" class="aar-search-dialog" aria-label="Search documentation" closedby="any" @cancel="emit('close')" @close="onNativeClose" @click="(event) => { if (event.target === dialog) close() }">
      <div class="search-panel">
        <div class="search-controls">
          <label for="aar-search-input" class="search-label">Search</label>
          <input id="aar-search-input" ref="input" v-model="query" type="text" inputmode="search" enterkeyhint="search" placeholder="Search apps, modules and guides" autocomplete="off" autofocus role="combobox" aria-autocomplete="list" aria-controls="aar-search-results" :aria-expanded="results.length > 0" :aria-activedescendant="selected >= 0 ? `search-result-${selected}` : undefined" @keydown="keyboard" />
          <button v-if="query" type="button" aria-label="Reset search" @click="query = ''; input?.focus()">Clear</button>
          <button type="button" aria-label="Close search" @click="close">Esc</button>
        </div>
        <p class="search-status" role="status" aria-live="polite">
          <template v-if="status === 'idle'">Search Android root apps, modules and documentation.</template>
          <template v-else-if="status === 'loading'">Searching…</template>
          <template v-else-if="status === 'error'">Search is unavailable. <button type="button" @click="retry">Retry</button>. For local search, build the site and use docs:preview.</template>
          <template v-else-if="!results.length">No results for “{{ query }}”. Try a shorter name or another spelling.</template>
          <template v-else>Showing up to {{ results.length }} top results</template>
        </p>
        <ul id="aar-search-results" role="listbox" aria-label="Search results">
          <li v-for="(result, index) in results" :id="`search-result-${index}`" :key="result.url" role="option" :aria-selected="selected === index">
            <a :href="result.url" @click.prevent="navigate(result)" @focus="selected = index">
              <strong>{{ result.meta.title || result.url }}</strong>
              <!-- Pagefind's excerpt is HTML-escaped by its API, with only mark tags added. -->
              <span class="search-excerpt" v-html="result.excerpt" />
            </a>
          </li>
        </ul>
        <footer>↑↓ to navigate · Enter to select · Esc to close</footer>
      </div>
    </dialog>
  </Teleport>
</template>

<style scoped>
.aar-search-dialog { box-sizing: border-box; width: min(640px, calc(100vw - 32px)); max-height: min(80dvh, 800px); margin: 12dvh auto auto; padding: 0; border: 1px solid var(--vp-c-divider); border-radius: 12px; background: var(--vp-c-bg); color: var(--vp-c-text-1); box-shadow: var(--vp-shadow-3); }
.aar-search-dialog:modal { overscroll-behavior: contain; }
.aar-search-dialog::backdrop { background: rgb(0 0 0 / 60%); overflow: hidden; overscroll-behavior: contain; }
.search-panel { padding: 16px; }
.search-controls { display: flex; align-items: center; gap: 8px; }
.search-label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); }
input { box-sizing: border-box; width: 100%; min-width: 0; padding: 12px; border: 2px solid var(--vp-c-brand-1); border-radius: 6px; font-size: 16px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); }
button { padding: 4px; color: var(--vp-c-text-2); font-size: 12px; }
.search-status { padding: 12px 0; font-size: 13px; color: var(--vp-c-text-2); white-space: normal; }
ul { list-style: none; margin: 0; padding: 0; }
li { margin-bottom: 8px; border: 1px solid var(--vp-c-divider); border-radius: 6px; }
li[aria-selected="true"], li:hover { background: var(--vp-c-brand-soft); border-color: var(--vp-c-brand-1); }
a { display: block; padding: 12px; color: inherit; text-decoration: none; }
strong { display: block; color: var(--vp-c-brand-1); font-size: 16px; }
.search-excerpt { display: block; margin-top: 6px; font-size: 14px; line-height: 1.6; overflow-wrap: anywhere; }
.search-excerpt :deep(mark) { background: var(--vp-c-brand-soft); color: var(--vp-c-text-1); font-weight: 600; }
footer { padding-top: 8px; font-size: 12px; color: var(--vp-c-text-2); }
a:focus-visible, button:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 2px; }
@media (max-width: 640px) { .aar-search-dialog { margin-top: 16px; width: calc(100vw - 16px); max-height: calc(100dvh - 32px); } .search-panel { padding: 12px; } footer { font-size: 11px; } }
</style>
