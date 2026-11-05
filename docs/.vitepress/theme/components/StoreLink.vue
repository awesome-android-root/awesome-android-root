<template>
  <a
    :href="href"
    class="store-badge"
    :class="store"
    target="_blank"
    rel="noopener noreferrer"
    :aria-label="ariaLabel"
    :title="title"
  >
    <svg
      class="store-icon"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path :d="meta.icon" />
    </svg>
    <span class="store-label">{{ meta.label }}</span>
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
    validator: (value) => ['fdroid', 'izzy', 'playstore'].includes(value)
  }
})

// F-Droid and Google Play marks come from Simple Icons (CC0).
// IzzyOnDroid has no bundled official mark, so its badge uses a generic
// package glyph plus a text label instead of an altered trademarked logo.
const STORES = {
  fdroid: {
    label: 'F-Droid',
    name: 'F-Droid',
    host: 'f-droid.org',
    icon:
      'M20.472 10.081H3.528c-.877 0-1.589.711-1.589 1.589v10.59c0 .877.711 1.589 1.589 1.589h16.944c.877 0 1.589-.711 1.589-1.589V11.67c0-.878-.712-1.589-1.589-1.589zM12 22.525c-3.066 0-5.56-2.494-5.56-5.56s2.494-5.56 5.56-5.56c3.066 0 5.56 2.494 5.56 5.56s-2.494 5.56-5.56 5.56zm0-10.114c-2.511 0-4.554 2.043-4.554 4.554s2.043 4.554 4.554 4.554 4.554-2.043 4.554-4.554-2.043-4.554-4.554-4.554zm0 7.863c-1.563 0-2.881-1.103-3.221-2.568h1.67c.275.581.859.979 1.551.979.96 0 1.721-.761 1.721-1.721s-.761-1.721-1.721-1.721c-.649 0-1.2.352-1.493.874H8.805c.378-1.412 1.669-2.462 3.195-2.462 1.818 0 3.309 1.491 3.309 3.309s-1.491 3.31-3.309 3.31zM23.849.396l-.002.003-.006-.005.004-.004c-.116-.137-.279-.231-.519-.238-.202.005-.391.097-.512.259l-1.818 2.353c-.164-.058-.339-.095-.523-.095H3.528c-.184 0-.358.038-.523.095L1.187.41c-.121-.162-.31-.253-.512-.259-.24.006-.403.1-.519.238l.004.004c-.002.002-.004.003-.006.005l-.002-.003C.085.474-.146.822.139 1.22l1.909 2.471c-.067.176-.108.366-.108.566v3.707c0 .877.711 1.589 1.589 1.589h16.944c.877 0 1.589-.711 1.589-1.589V4.257c0-.2-.041-.39-.109-.566l1.909-2.471C24.146.822 23.915.474 23.849.396zM6.904 8.228c-.987 0-1.787-.8-1.787-1.787s.8-1.787 1.787-1.787 1.787.8 1.787 1.787-.8 1.787-1.787 1.787zm10.325 0c-.987 0-1.787-.8-1.787-1.787s.8-1.787 1.787-1.787 1.787.8 1.787 1.787-.8 1.787-1.787 1.787z'
  },
  izzy: {
    label: 'IzzyOnDroid',
    name: 'IzzyOnDroid',
    host: 'apt.izzysoft.de',
    icon:
      'M12 2 3 6.5v11L12 22l9-4.5v-11L12 2zm0 2.2 6.4 3.2L12 10.6 5.6 7.4 12 4.2zM5 9.2l6 3v6.9l-6-3V9.2zm8 9.9v-6.9l6-3v6.9l-6 3z'
  },
  playstore: {
    label: 'Google Play',
    name: 'Google Play',
    host: 'play.google.com',
    icon:
      'M22.018 13.298l-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594zM1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924zm12.207 10.065l3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973zm0 2.067l-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z'
  }
}

const meta = computed(() => STORES[props.store] ?? STORES.fdroid)
const ariaLabel = computed(
  () => `${meta.value.name} listing, opens in a new tab`
)
const title = computed(
  () => `Open ${meta.value.name} listing on ${meta.value.host}`
)
</script>

<style scoped>
.store-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  min-height: 26px;
  margin: 0 2px;
  padding: 0 8px 0 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.8em;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;
  vertical-align: middle;
  transition:
    color 0.15s ease,
    background-color 0.15s ease,
    border-color 0.15s ease;
}

.store-badge:hover,
.store-badge:focus-visible {
  color: var(--vp-c-brand-1);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 45%, var(--vp-c-divider));
  background: var(--vp-c-brand-soft);
  text-decoration: none;
}

.store-badge:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.store-icon {
  width: 15px;
  height: 15px;
  flex: none;
}

.store-label {
  white-space: nowrap;
}
</style>
