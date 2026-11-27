import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import './PwaReload.css'

export default defineComponent(() => {
  const isOffline = ref(false)

  function updateOnlineStatus() {
    isOffline.value = !navigator.onLine
  }

  onMounted(() => {
    updateOnlineStatus()
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
  })

  onUnmounted(() => {
    window.removeEventListener('online', updateOnlineStatus)
    window.removeEventListener('offline', updateOnlineStatus)
  })

  return () => (
    <div class={['pwa-toast', { 'pwa-toast--offline': isOffline.value, 'pwa-toast--hidden': !isOffline.value }]} role="status" aria-live="polite" aria-atomic="true">
      {isOffline.value && <div class="pwa-toast__content">
        <svg class="pwa-toast__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9V5h2v4H9zm0 4v-2h2v2H9z" fill="currentColor" /></svg>
        <span class="pwa-toast__message">You're offline. Pages need a connection; cached images may still load.</span>
      </div>}
    </div>
  )
})
