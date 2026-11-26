<script setup lang="ts">
import { ref, watchPostEffect } from 'vue'
import { Moon } from '@lucide/vue'
import { Sun } from '@lucide/vue'
import { useData } from 'vitepress'

const { isDark, theme } = useData()

// resolved after mount so SSG markup, which always assumes light, never mismatches on hydration
const title = ref('')
watchPostEffect(() => {
  title.value = isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
})

function toggle() {
  isDark.value = !isDark.value
}
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    role="switch"
    :title="title || undefined"
    :aria-label="theme.darkModeSwitchLabel || 'Appearance'"
    :aria-checked="isDark"
    @click="toggle"
  >
    <Sun class="theme-icon-sun" aria-hidden="true" />
    <Moon class="theme-icon-moon" aria-hidden="true" />
  </button>
</template>
