<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import tools from '../../../rooting-guides/data/locked-root-tools.json'
import { columns, selectTools } from './lockedRootTable.mjs'

const ready = ref(false)
onMounted(() => { ready.value = true })
const filters = reactive({ query: '', category: '', bootloader: '', android: '', evidence: '', status: '' })
const sortKey = ref('name')
const direction = ref('asc')
const visibleTools = computed(() => selectTools(tools, filters, sortKey.value, direction.value))
const options = key => [...new Set(tools.map(tool => tool[key]))].sort()
const androidVersions = [...new Set(tools.flatMap(tool => tool.android))].sort((a, b) => a - b)
function sort(key) {
  direction.value = sortKey.value === key && direction.value === 'asc' ? 'desc' : 'asc'
  sortKey.value = key
}
function reset() {
  Object.keys(filters).forEach(key => { filters[key] = '' })
  sortKey.value = 'name'
  direction.value = 'asc'
}
</script>

<template>
  <section class="root-reference" aria-label="Searchable rooting tools reference">
    <div class="root-controls">
      <label class="root-search">Search tools, devices, builds or keywords
        <input v-model="filters.query" type="search" :disabled="!ready" placeholder="e.g. SM-A175F, 6.12.38, DirtyFrag" aria-controls="root-tools-table">
      </label>
      <div v-for="[key, label] in [['category', 'Category'], ['bootloader', 'Bootloader requirement'], ['evidence', 'Verification'], ['status', 'Project status']]" :key="key" class="root-field">
        <label :for="`root-filter-${key}`">{{ label }}</label>
        <select :id="`root-filter-${key}`" v-model="filters[key]" :disabled="!ready" aria-controls="root-tools-table">
          <option value="">All</option>
          <option v-for="option in options(key)" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>
      <div class="root-field">
        <label for="root-filter-android">Documented Android OS version</label>
        <select id="root-filter-android" v-model="filters.android" :disabled="!ready" aria-controls="root-tools-table">
          <option value="">All / not specified</option>
          <option v-for="version in androidVersions" :key="version" :value="String(version)">Android {{ version }}</option>
          <option value="Unknown">Unknown / not documented</option>
        </select>
      </div>
      <button type="button" class="root-reset" :disabled="!ready" @click="reset">Reset search and filters</button>
    </div>
    <p class="root-results" role="status" aria-live="polite" aria-atomic="true">{{ visibleTools.length }} of {{ tools.length }} tools. Sorted by {{ columns.find(([key]) => key === sortKey)[1] }}, {{ direction === 'asc' ? 'ascending' : 'descending' }}.</p>
    <p id="root-scroll-help" class="root-help">Scroll horizontally to read all ten columns. Select a column heading to sort. Expand source profiles for exact upstream pairs. Unknown OS versions are not inferred from KMI names.</p>
    <noscript>Search and filters require JavaScript. The complete reference remains readable below.</noscript>
    <div class="root-table-scroll" tabindex="0" role="region" aria-label="Rooting tools table, scroll horizontally" aria-describedby="root-scroll-help">
      <table id="root-tools-table">
        <caption>Apps, payloads, research-only candidates and explicitly excluded bootloader workflows. Last source review: 2026-10-14.</caption>
        <thead><tr>
          <th v-for="[key, label] in columns" :key="key" scope="col" :aria-sort="sortKey === key ? (direction === 'asc' ? 'ascending' : 'descending') : 'none'">
            <button type="button" :disabled="!ready" @click="sort(key)">{{ label }}<span aria-hidden="true">{{ sortKey === key ? (direction === 'asc' ? ' ↑' : ' ↓') : ' ↕' }}</span></button>
          </th>
        </tr></thead>
        <tbody>
          <tr v-for="tool in visibleTools" :key="tool.id">
            <th scope="row"><a :href="tool.source">{{ tool.name }}</a><small>Developer/project: {{ tool.developer }}</small></th>
            <td>{{ tool.category }}</td>
            <td>{{ tool.devices }}<details v-if="tool.profiles.length"><summary>Source profiles ({{ tool.profiles.length }})</summary><ul><li v-for="(profile, index) in tool.profiles" :key="index">{{ profile }}</li></ul></details></td>
            <td>{{ tool.firmware }}<small>Android OS: {{ tool.android.length ? tool.android.join(', ') : 'Unknown / not documented' }}</small></td>
            <td>{{ tool.bootloader }}</td>
            <td>{{ tool.root }}</td>
            <td>{{ tool.requirements }}</td>
            <td><strong class="root-evidence">{{ tool.evidence }}</strong><small>{{ tool.status }}</small><small>Last push: {{ tool.lastActivity }}</small><small v-if="tool.note">{{ tool.note }}</small></td>
            <td><a :href="tool.source">Original repository</a><small>No APK safety endorsement</small></td>
            <td><a :href="tool.documentation">Reviewed documentation</a><small>{{ tool.revision ? `Snapshot ${tool.revision.slice(0, 7)}` : 'Author documentation; no Git revision' }}<br>Reviewed {{ tool.lastVerified }}</small><a v-if="tool.evidenceSource" :href="tool.evidenceSource">Device evidence</a></td>
          </tr>
          <tr v-if="!visibleTools.length"><td colspan="10" class="root-empty">No results match your search and filters. Try a model codename, kernel version, or reset the filters.</td></tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.root-reference { margin: 1.5rem 0; }
.root-controls { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
.root-controls label, .root-field { display: flex; flex-direction: column; gap: 4px; font-size: 14px; font-weight: 500; }
.root-search { grid-column: 1 / -1; }
.root-controls input, .root-controls select, .root-reset { border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); color: var(--vp-c-text-1); border-radius: 6px; padding: 8px 10px; font: inherit; min-height: 44px; width: 100%; }
.root-controls select option { background: var(--vp-c-bg); color: var(--vp-c-text-1); }
.root-reset { align-self: end; cursor: pointer; }
.root-results, .root-help { font-size: 14px; }
.root-table-scroll { max-width: 100%; overflow-x: auto; border: 1px solid var(--vp-c-divider); border-radius: 8px; }
.root-table-scroll table { display: table; width: 2200px; margin: 0; border-collapse: separate; border-spacing: 0; font-size: 14px; }
.root-table-scroll caption { text-align: left; padding: 12px; color: var(--vp-c-text-2); }
.root-table-scroll th, .root-table-scroll td { vertical-align: top; text-align: left; min-width: 130px; max-width: 360px; padding: 12px; overflow-wrap: anywhere; }
.root-table-scroll th:first-child { position: sticky; left: 0; z-index: 1; min-width: 170px; max-width: 210px; background: var(--vp-c-bg); box-shadow: 1px 0 var(--vp-c-divider); }
.root-table-scroll thead th { background: var(--vp-c-bg-soft); }
.root-table-scroll thead th:first-child { z-index: 2; background: var(--vp-c-bg-soft); }
.root-table-scroll thead button { font: inherit; font-weight: 600; color: var(--vp-c-text-1); text-align: left; cursor: pointer; min-height: 44px; }
.root-reference small { display: block; margin-top: 8px; font-size: 12px; color: var(--vp-c-text-2); line-height: 1.5; }
.root-evidence { font-size: 13px; }
.root-reference details { margin-top: 12px; }
.root-reference summary { cursor: pointer; color: var(--vp-c-brand-1); }
.root-reference details ul { padding-left: 16px; }
.root-reference details li { margin-bottom: 8px; }
.root-reference :is(input, select, button, summary, a):focus-visible, .root-table-scroll:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
.root-empty { padding: 24px !important; }
@media (max-width: 600px) {
  .root-controls { grid-template-columns: 1fr; }
  .root-table-scroll th:first-child { min-width: 140px; max-width: 160px; }
}
</style>

<style>
#apps-tools { scroll-margin-top: calc(var(--vp-nav-height, 64px) + 64px); }
</style>
