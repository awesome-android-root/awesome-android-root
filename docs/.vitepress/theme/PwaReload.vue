<script setup>
import { computed, shallowRef, onMounted } from 'vue'

// SSR-safe: dynamically import virtual module on client only
const sw = shallowRef(null)

onMounted(async () => {
  const { useRegisterSW } = await import('virtual:pwa-register/vue')
  sw.value = useRegisterSW({ immediate: true })
})

const show = computed(() => !!sw.value && (sw.value.offlineReady.value || sw.value.needRefresh.value))

const reload = () => {
  if (sw.value) sw.value.updateServiceWorker()
}

const close = () => {
  if (!sw.value) return
  sw.value.offlineReady.value = false
  sw.value.needRefresh.value = false
}
</script>

<template>
  <div v-if="show" class="pwa-toast" role="status" aria-live="polite">
    <div class="pwa-message">
      <span v-if="sw?.offlineReady?.value">App is ready to work offline.</span>
      <span v-else>New content available, click reload to update.</span>
    </div>
    <div class="pwa-actions">
      <button v-if="sw?.needRefresh?.value" class="pwa-btn primary" @click="reload">Reload</button>
      <button class="pwa-btn" @click="close">Close</button>
    </div>
  </div>
</template>

<style scoped>
.pwa-toast {
  position: fixed;
  right: 16px;
  bottom: 16px;
  left: 16px;
  margin: 0 auto;
  max-width: 560px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  box-shadow: 0 6px 30px rgba(0,0,0,.12);
  z-index: 1000;
}
.pwa-message { font-size: 14px; }
.pwa-actions { display: flex; gap: 8px; }
.pwa-btn {
  appearance: none;
  font: inherit;
  font-size: 13px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: transparent;
  color: var(--vp-c-text-1);
}
.pwa-btn.primary {
  background: var(--vp-c-brand-1);
  color: var(--vp-c-bg);
  border-color: var(--vp-c-brand-1);
}
.pwa-btn:hover { filter: brightness(1.05); }
</style>
