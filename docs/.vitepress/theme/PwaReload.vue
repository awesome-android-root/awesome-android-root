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
      <button 
        v-if="!isAutoUpdate" 
        @click="reload" 
        class="pwa-toast__button"
        aria-label="Reload page"
      >
        Reload
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// State
const showReload = ref(false)
const isOffline = ref(false)
const updateMessage = ref('New content available!')
const isAutoUpdate = ref(true) // Since you're using autoUpdate

// Service worker registration
let registration = null
let updateCheckInterval = null
let updateHideTimer = null
let swUpdateFoundHandler = null
let swControllerChangeHandler = null
let swMessageHandler = null
let installingWorker = null
let installingWorkerStateHandler = null

const clearUpdateTimer = () => {
  if (updateHideTimer) {
    clearTimeout(updateHideTimer)
    updateHideTimer = null
  }
}

const scheduleReloadToastHide = (delayMs) => {
  clearUpdateTimer()
  updateHideTimer = setTimeout(() => {
    showReload.value = false
    updateHideTimer = null
  }, delayMs)
}

// Check for updates
const checkForUpdates = async () => {
  if (registration?.waiting) {
    showUpdateNotification()
  } else if (registration?.active) {
    try {
      await registration.update()
    } catch (error) {
      console.error('SW update check failed:', error)
    }
  }
}

// Show update notification
const showUpdateNotification = () => {
  // With autoUpdate, just show a brief notification
  showReload.value = true
  updateMessage.value = 'App updated! Refreshing...'
  
  // Auto-hide after 3 seconds for autoUpdate
  if (isAutoUpdate.value) {
    scheduleReloadToastHide(3000)
  }
}

// Reload the page
const reload = () => {
  if (registration?.waiting) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' })
  }
  window.location.reload()
}

// Handle online/offline status
const updateOnlineStatus = () => {
  isOffline.value = !navigator.onLine

  // Prioritize offline status and avoid stale update prompts while disconnected.
  if (isOffline.value) {
    showReload.value = false
    clearUpdateTimer()
  }
}

// Handle visibility change
const handleVisibilityChange = () => {
  if (!document.hidden && navigator.onLine) {
    // Check for updates when page becomes visible
    checkForUpdates()
  }
}

onMounted(async () => {
  // Check if service worker is supported
  if (!('serviceWorker' in navigator)) {
    return
  }

  try {
    // Get service worker registration
    registration = await navigator.serviceWorker.getRegistration()
    
    if (!registration) {
      // Wait for registration
      navigator.serviceWorker.ready.then(reg => {
        registration = reg
        setupServiceWorkerListeners()
      })
    } else {
      setupServiceWorkerListeners()
    }

    // Setup network status listeners
    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    
    // Initial status check
    updateOnlineStatus()
    
    // Check for updates every 60 minutes (less aggressive than 30 minutes)
    updateCheckInterval = setInterval(checkForUpdates, 60 * 60 * 1000)
    
    // Check for updates on mount
    await checkForUpdates()
    
  } catch (error) {
    console.error('PWA initialization error:', error)
  }
})

// Setup service worker event listeners
const setupServiceWorkerListeners = () => {
  if (!registration || swUpdateFoundHandler) return

  // Listen for waiting service worker
  swUpdateFoundHandler = () => {
    installingWorker = registration.installing

    if (!installingWorker) return

    installingWorkerStateHandler = () => {
      if (installingWorker?.state === 'installed' && navigator.serviceWorker.controller) {
        showUpdateNotification()
      }
    }

    installingWorker.addEventListener('statechange', installingWorkerStateHandler)
  }

  registration.addEventListener('updatefound', swUpdateFoundHandler)

  // Listen for controller change (autoUpdate)
  swControllerChangeHandler = () => {
    // With autoUpdate, the page will reload automatically
    // Show a brief notification
    updateMessage.value = 'App updated successfully!'
    showReload.value = true
    scheduleReloadToastHide(2000)
  }

  navigator.serviceWorker.addEventListener('controllerchange', swControllerChangeHandler)

  // Listen for messages from service worker
  swMessageHandler = (event) => {
    if (event.data?.type === 'CACHE_UPDATED') {
      console.log('Cache updated:', event.data.updatedCache)
    }
  }

  navigator.serviceWorker.addEventListener('message', swMessageHandler)
}

onUnmounted(() => {
  // Clean up listeners
  window.removeEventListener('online', updateOnlineStatus)
  window.removeEventListener('offline', updateOnlineStatus)
  document.removeEventListener('visibilitychange', handleVisibilityChange)

  if (registration && swUpdateFoundHandler) {
    registration.removeEventListener('updatefound', swUpdateFoundHandler)
    swUpdateFoundHandler = null
  }

  if (navigator.serviceWorker && swControllerChangeHandler) {
    navigator.serviceWorker.removeEventListener('controllerchange', swControllerChangeHandler)
    swControllerChangeHandler = null
  }

  if (navigator.serviceWorker && swMessageHandler) {
    navigator.serviceWorker.removeEventListener('message', swMessageHandler)
    swMessageHandler = null
  }

  if (installingWorker && installingWorkerStateHandler) {
    installingWorker.removeEventListener('statechange', installingWorkerStateHandler)
    installingWorkerStateHandler = null
  }

  installingWorker = null
  clearUpdateTimer()
  
  // Clear interval
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