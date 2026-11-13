<template>
  <div
    class="pwa-toast"
    :class="{ 'pwa-toast--offline': isOffline, 'pwa-toast--hidden': !isOffline }"
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
/* Kept in the DOM so the live region exists before a status change. */
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
  max-width: 90vw;
  width: auto;
  min-width: 300px;
}

.pwa-toast--hidden {
  width: 1px;
  height: 1px;
  min-width: 0;
  padding: 0;
  margin: -1px;
  border: 0;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
}

.pwa-toast--offline {
  background: var(--warn-soft);
  color: var(--warn);
  border-color: var(--warn);
  animation: slideUp 0.3s ease-out;
}

.pwa-toast--offline .pwa-toast__icon {
  color: var(--warn);
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
  color: var(--warn);
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

  .pwa-toast--hidden {
    left: 0;
    right: auto;
    width: 1px;
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

/* Reduce motion */
@media (prefers-reduced-motion: reduce) {
  .pwa-toast--offline {
    animation: none;
  }
}
</style>
