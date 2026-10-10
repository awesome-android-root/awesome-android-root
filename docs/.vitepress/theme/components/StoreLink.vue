<template>
  <a
    :href="href"
    class="store-badge"
    :class="store"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="ariaLabel"
  >
    {{ label }}
  </a>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  href: {
    type: String,
    required: true
  },
  store: {
    type: String,
    required: true,
    validator: (value) => ['fdroid', 'playstore'].includes(value)
  }
})

const label = computed(() => props.store === 'fdroid' ? 'F-Droid ↗' : 'Play Store ↗')
const ariaLabel = computed(() => props.store === 'fdroid' ? 'Open F-Droid listing' : 'Open Play Store listing')
</script>

<style scoped>
.store-badge {
  display: inline-flex;
  align-items: center;
  min-height: 24px;
  padding: 0 4px;
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
  line-height: 1.4;
  text-decoration: none;
  transition: color 140ms ease-out;
}

.store-badge:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 2px;
}

.store-badge:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
</style>
