<script setup>
function openSearch() {
  document.querySelector('.VPNavBarSearchButton')?.click()
}
</script>

<template>
  <button class="home-search-trigger" type="button" @click="openSearch">
    <span class="home-search-copy">
      <svg class="home-search-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="10.8" cy="10.8" r="6.8" fill="none" stroke="currentColor" stroke-width="1.7" />
        <path d="m16 16 4.2 4.2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" />
      </svg>
      <span class="home-search-label">Search apps, modules, guides</span>
    </span>
    <kbd aria-hidden="true">⌘K</kbd>
    <span class="visually-hidden">Open site search</span>
  </button>
</template>
