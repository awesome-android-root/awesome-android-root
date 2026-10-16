<script setup>
import { computed } from 'vue'
import { Moon, Sun } from '@lucide/vue'
import { useData } from 'vitepress'

const { isDark, theme } = useData()

const label = computed(() =>
  isDark.value
    ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
    : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
)

function toggle() {
  isDark.value = !isDark.value
}
</script>

<template>
  <button type="button" class="theme-toggle" :title="label" :aria-label="label" @click="toggle">
    <Transition name="theme-icon" mode="out-in">
      <Sun v-if="isDark" key="sun" aria-hidden="true" />
      <Moon v-else key="moon" aria-hidden="true" />
    </Transition>
  </button>
</template>