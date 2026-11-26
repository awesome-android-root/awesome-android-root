<script setup lang="ts">
import { defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'

const SearchDialog = defineAsyncComponent(() => import('./SearchDialog.vue'))
const opened = ref(false)
const loaded = ref(false)
const trigger = ref<HTMLButtonElement>()
function open() {
  loaded.value = true
  opened.value = true
}
function shortcut(event: KeyboardEvent) {
  const target = event.target
  const editing = target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
  if ((event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey)) || (event.key === '/' && !editing)) {
    event.preventDefault()
    // Give native dialog focus restoration a concrete invoker for shortcuts.
    trigger.value?.focus()
    open()
  }
}
onMounted(() => window.addEventListener('keydown', shortcut))
onUnmounted(() => window.removeEventListener('keydown', shortcut))
</script>

<template>
  <div class="aar-search">
    <button ref="trigger" type="button" class="aar-search-button" aria-label="Search" aria-haspopup="dialog" aria-keyshortcuts="/ Control+k Meta+k" @click="open">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7.5" /><path d="m16 16 5 5" /></svg>
      <span>Search</span><kbd>Ctrl K</kbd>
    </button>
    <SearchDialog v-if="loaded" :opened="opened" @close="opened = false" />
  </div>
</template>

<style scoped>
.aar-search { display: flex; align-items: center; margin-inline: 16px auto; }
.aar-search-button { display: flex; align-items: center; gap: 8px; min-height: 40px; padding: 0 10px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); font-size: 13px; }
kbd { border: 1px solid var(--vp-c-divider); border-radius: 4px; padding: 0 4px; font-size: 11px; }
.aar-search-button:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-text-1); }
.aar-search-button:focus-visible { outline: 2px solid var(--vp-c-brand-1); outline-offset: 3px; }
@media (max-width: 767px) { .aar-search { margin-inline: auto 12px; } .aar-search-button { border: 0; background: transparent; } .aar-search-button span, kbd { display: none; } }
</style>
