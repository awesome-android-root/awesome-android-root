<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { FILTER_OPTIONS, filterQuery, matchesEntry, readFilters, toggleFilterSelection } from './filterState.mjs'

const { page } = useData()
const filterOptions = FILTER_OPTIONS
const selected = ref([])
const summary = ref('')
const visible = computed(() => {
  const path = page.value.relativePath ?? ''
  return path.startsWith('apps-and-modules/') && path !== 'apps-and-modules/index.md'
})

let frame = 0

function filtersFromUrl() {
  if (typeof window === 'undefined') return []
  return readFilters(window.location.search)
}

function updateUrl() {
  if (typeof window === 'undefined') return
  const url = new URL(window.location.href)
  const query = filterQuery(selected.value)
  if (query) url.searchParams.set('f', query)
  else url.searchParams.delete('f')
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
}

function updateSectionHeadings(documentRoot) {
  for (const heading of documentRoot.querySelectorAll('h2')) {
    const entries = []
    let sibling = heading.nextElementSibling

    while (sibling && !['H1', 'H2'].includes(sibling.tagName)) {
      entries.push(...sibling.querySelectorAll('.aar-entry'))
      sibling = sibling.nextElementSibling
    }

    if (entries.length) heading.hidden = entries.every((entry) => entry.hidden)
  }
}

function applyFilters() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  if (frame) window.cancelAnimationFrame(frame)

  frame = window.requestAnimationFrame(() => {
    const documentRoot = document.querySelector('.VPDoc .vp-doc')
    if (!documentRoot) return

    const entries = [...documentRoot.querySelectorAll('.aar-entry')]
    let shown = 0

    for (const entry of entries) {
      const matches = matchesEntry(entry.dataset, selected.value)
      entry.hidden = !matches
      if (matches) shown += 1
    }

    updateSectionHeadings(documentRoot)
    summary.value = `Showing ${shown.toLocaleString('en-US')} of ${entries.length.toLocaleString('en-US')}`
  })
}

function toggleFilter(key) {
  selected.value = toggleFilterSelection(selected.value, key)
  updateUrl()
  applyFilters()
}

function restoreFromUrl() {
  selected.value = filtersFromUrl()
  applyFilters()
}

async function onPageChange() {
  await nextTick()
  selected.value = filtersFromUrl()
  applyFilters()
}

watch(() => page.value.relativePath, onPageChange, { immediate: true })

onMounted(() => {
  window.addEventListener('popstate', restoreFromUrl)
  onPageChange()
})

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return
  window.removeEventListener('popstate', restoreFromUrl)
  if (frame) window.cancelAnimationFrame(frame)
})
</script>

<template>
  <section v-if="visible" class="entry-filter-bar" aria-label="Filter app and module entries">
    <div class="entry-filter-scroll">
      <button
        class="entry-filter-chip"
        type="button"
        :aria-pressed="selected.length === 0"
        @click="toggleFilter('all')"
      >
        All
      </button>
      <button
        v-for="option in filterOptions"
        :key="option.key"
        class="entry-filter-chip"
        type="button"
        :aria-pressed="selected.includes(option.key)"
        @click="toggleFilter(option.key)"
      >
        {{ option.label }}
      </button>
    </div>
    <div class="entry-filter-status">
      <p aria-live="polite" aria-atomic="true">{{ summary }}</p>
      <button v-if="selected.length" class="entry-filter-clear" type="button" @click="toggleFilter('all')">
        Clear
      </button>
    </div>
  </section>
</template>
