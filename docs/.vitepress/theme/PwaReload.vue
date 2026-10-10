<template>
  <div v-if="isOffline" class="pwa-offline-status" role="status" aria-live="polite" aria-atomic="true">
    You're offline. Previously visited pages and cached assets may still be available.
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

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
.pwa-offline-status {
  position: fixed;
  z-index: 10000;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  width: fit-content;
  max-width: min(68ch, calc(100vw - 2rem));
  margin-inline: auto;
  border: 1px solid var(--border);
  border-left: 2px solid var(--warn);
  border-radius: 6px;
  padding: 0.75rem 1rem;
  background: var(--surface);
  color: var(--text);
  font-size: 0.875rem;
  line-height: 1.45;
}
</style>
