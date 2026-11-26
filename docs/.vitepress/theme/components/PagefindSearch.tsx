import { defineComponent, defineAsyncComponent, onMounted, onUnmounted, ref } from 'vue'
import './PagefindSearch.css'

export default defineComponent(() => {
  const SearchDialog = defineAsyncComponent(() => import('./SearchDialog.tsx'))
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

  return () => (
    <div class="aar-search">
      <button ref={trigger} type="button" class="aar-search-button" aria-label="Search" aria-haspopup="dialog" aria-keyshortcuts="/ Control+k Meta+k" onClick={open}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7.5" /><path d="m16 16 5 5" /></svg>
        <span>Search</span><kbd>Ctrl K</kbd>
      </button>
      {loaded.value && <SearchDialog opened={opened.value} onClose={() => { opened.value = false }} />}
    </div>
  )
})
