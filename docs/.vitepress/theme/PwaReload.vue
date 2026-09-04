<template>
  <div
    v-if="showReload || isOffline"
    class="pwa-toast"
    :class="{ 'pwa-toast--offline': isOffline }"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <!-- Offline notification -->
    <div v-if="isOffline" class="pwa-toast__content">
      <svg class="pwa-toast__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9V5h2v4H9zm0 4v-2h2v2H9z" fill="currentColor"/>
      </svg>
      <span class="pwa-toast__message">You're offline - Some features may be limited</span>
    </div>
    
    <!-- Update notification -->
    <div v-else-if="showReload" class="pwa-toast__content">
      <svg class="pwa-toast__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm3.707 5.293L9 12l-2.707-2.707 1.414-1.414L9 9.172l3.293-3.293 1.414 1.414z" fill="currentColor"/>
      </svg>
      <span class="pwa-toast__message">{{ updateMessage }}</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const showReload = ref(false)
const isOffline = ref(false)
const updateMessage = ref('New content available!')

let registration = null
let updateCheckInterval = null

const checkForUpdates = async () => {
  if (!registration?.update) return

  try {
    await registration.update()
  } catch (error) {
    console.error('SW update check failed:', error)
  }
}

const handleServiceWorkerReload = () => {
  showReload.value = true
  updateMessage.value = 'App updated! Refreshing...'
  window.setTimeout(() => {
    window.location.reload()
  }, 300)
}


const updateOnlineStatus = () => {
  isOffline.value = !navigator.onLine

  if (isOffline.value) {
    showReload.value = false
  }
}


const handleVisibilityChange = () => {
  if (!document.hidden && navigator.onLine) {
    checkForUpdates()
  }
}

onMounted(async () => {
  if (!('serviceWorker' in navigator)) {
    return
  }

  try {
    const { registerSW } = await import('virtual:pwa-register')

    registerSW({
      immediate: true,
      onNeedReload: handleServiceWorkerReload,
      onRegistered: (registered) => {
        registration = registered
      },
      onRegisterError: (error) => {
        console.error('PWA registration error:', error)
      }
    })

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    updateOnlineStatus()
    
    updateCheckInterval = setInterval(checkForUpdates, 60 * 60 * 1000)
    
    await navigator.serviceWorker.ready
    registration = await navigator.serviceWorker.getRegistration()
    await checkForUpdates()
  } catch (error) {
    console.error('PWA initialization error:', error)
  }
})

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
  document.removeEventListener('visibilitychange', handleVisibilityChange)

  if (updateCheckInterval) {
    clearInterval(updateCheckInterval)
  }
})
</script>

<style scoped>
.pwa-toast {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  padding: 12px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideUp 0.3s ease-out;
  max-width: 90vw;
  width: auto;
  min-width: 300px;
}

.pwa-toast--offline {
  background: #ff6b6b;
  color: white;
  border-color: #ff5252;
}

.pwa-toast--offline .pwa-toast__icon {
  color: white;
}

.pwa-toast__content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pwa-toast__icon {
  flex-shrink: 0;
  color: var(--vp-c-brand);
}

.pwa-toast__message {
  flex: 1;
  font-size: 14px;
  line-height: 1.4;
  color: var(--vp-c-text-1);
}

.pwa-toast--offline .pwa-toast__message {
  color: white;
}

.pwa-toast__button {
  flex-shrink: 0;
  padding: 4px 12px;
  margin-left: 8px;
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;
}

.pwa-toast__button:hover {
  opacity: 0.9;
}

.pwa-toast__button:active {
  transform: scale(0.98);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Mobile responsive */
@media (max-width: 640px) {
  .pwa-toast {
    bottom: 10px;
    left: 10px;
    right: 10px;
    transform: none;
    max-width: none;
    width: auto;
  }
  
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

/* Dark mode adjustments */
.dark .pwa-toast {
  background: var(--vp-c-bg-elv);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
}

.dark .pwa-toast--offline {
  background: #c53030;
}

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .pwa-toast {
    animation: none;
  }
  
  .pwa-toast__button:active {
    transform: none;
  }
}
</style>
