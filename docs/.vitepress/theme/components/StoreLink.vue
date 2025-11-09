<template>
  <a :href="href" class="store-badge" :class="store" target="_blank" rel="noopener noreferrer" :aria-label="ariaLabel">
    <span class="store-icon" v-html="icon"></span>
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

const ariaLabel = computed(() => {
  if (props.store === 'fdroid') return 'Download on F-Droid'
  if (props.store === 'playstore') return 'Get it on Play Store'
  return ''
})

const icon = computed(() => {
  if (props.store === 'fdroid') {
    return `<svg fill="currentColor" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.5 10H3.5A1.5 1.5 0 0 0 2 11.5V22a1.5 1.5 0 0 0 1.5 1.5h17A1.5 1.5 0 0 0 22 22V11.5A1.5 1.5 0 0 0 20.5 10zM12 22a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0-10a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 7.5a3 3 0 0 1-3-3h1.5c.3.6.9 1 1.5 1 .8 0 1.5-.7 1.5-1.5S12.8 15 12 15c-.6 0-1.1.3-1.4.8H9.1a3 3 0 0 1 5.8 1.2 3 3 0 0 1-3 3zM23.5.5l-.5.6-1.5 2a1.5 1.5 0 0 0-.5-.1h-17c-.2 0-.4 0-.5.1l-1.5-2L1 .5a.5.5 0 0 0 0 .7l1.9 2.5A1.5 1.5 0 0 0 2 4.5v3A1.5 1.5 0 0 0 3.5 9h17A1.5 1.5 0 0 0 22 7.5v-3c0-.3 0-.5-.1-.8L23.9 1.2a.5.5 0 0 0 0-.7zM7 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm10 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
    </svg>`
  } else if (props.store === 'playstore') {
    return `<svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2.5">
      <path d="M9.3,5.52a7,7,0,0,1,2,.76L32.52,18l-5.87,6L7.68,5.9A2.46,2.46,0,0,1,9.3,5.52ZM7.68,5.9l19,18.1L7.7,42.07c-.7-.56-1.07-1.69-1.07-3.36V9.29c0-1.67.36-2.82,1-3.38ZM32.52,18l7,3.87c2.49,1.38,2.49,2.84,0,4.22l-7,3.87-5.87-6,5.87-6Zm0,12L11.34,41.72c-1.16.64-2.72,1.19-3.64.35L26.65,24Z" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  }
  return ''
})
</script>

<style scoped>
.store-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 3px;
  cursor: pointer;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease;
  vertical-align: middle;
  margin: 0 2px;
  border: none;
  background: transparent;
  box-sizing: border-box;
}

.store-badge:hover {
  transform: translateY(-1px) scale(1.1);
  text-decoration: none;
}

.store-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  width: 100%;
  height: 100%;
}

.store-icon :deep(svg) {
  display: block;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
  transition: filter 0.2s ease;
}

.store-badge:hover .store-icon :deep(svg) {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15));
}

/* F-Droid styling - Light mode */
.store-badge.fdroid {
  color: #1565c0;
}

.store-badge.fdroid:hover {
  color: #0d47a1;
}

/* Play Store styling - Light mode */
.store-badge.playstore {
  color: #1565c0;
}

.store-badge.playstore:hover {
  color: #0d47a1;
}

/* Dark mode adjustments */
html.dark .store-badge.fdroid {
  color: #64b5f6;
}

html.dark .store-badge.fdroid:hover {
  color: #90caf9;
}

html.dark .store-badge.playstore {
  color: #64b5f6;
}

html.dark .store-badge.playstore:hover {
  color: #90caf9;
}

html.dark .store-icon :deep(svg) {
  filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.3));
}

html.dark .store-badge:hover .store-icon :deep(svg) {
  filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4));
}

/* Responsive sizing */
@media (max-width: 768px) {
  .store-badge {
    width: 22px;
    height: 22px;
    padding: 2px;
  }
}
</style>
