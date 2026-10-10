<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { theme } = useData()
const categories = computed(() => theme.value.categories ?? [])

function formatCount(count) {
  return `${Number(count).toLocaleString('en-US')} ${count === 1 ? 'entry' : 'entries'}`
}
</script>

<template>
  <ul class="category-grid">
    <li v-for="category in categories" :key="category.slug">
      <a class="category-link" :href="`/apps-and-modules/${category.slug}`">
        <span class="category-title">{{ category.title }}</span>
        <span class="category-description">{{ category.description }}</span>
        <span class="category-count">{{ formatCount(category.count) }}</span>
      </a>
    </li>
  </ul>
</template>
