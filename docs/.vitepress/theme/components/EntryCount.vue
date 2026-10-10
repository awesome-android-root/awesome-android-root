<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()
const count = computed(() => Number(theme.value.entryCount ?? 0).toLocaleString('en-US'))
</script>

<template>
  <span class="entry-count">{{ count }}</span>
</template>
