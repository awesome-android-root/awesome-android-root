<template>
  <div
    v-if="isOffline"
    class="pwa-toast"
    :class="{ 'pwa-toast--offline': isOffline }"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <div v-if="isOffline" class="pwa-toast__content">
      <svg class="pwa-toast__icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9 9V5h2v4H9zm0 4v-2h2v2H9z" fill="currentColor"/>
      </svg>
      <span class="pwa-toast__message">You're offline - Some features may be limited</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
