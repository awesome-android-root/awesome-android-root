<script setup>

import { useData } from 'vitepress'
import { VPHomeHero, VPHomeFeatures, VPHomeContent } from 'vitepress/theme'

const { frontmatter, theme } = useData()
</script>

<template>
  <main
    id="main-content"
    class="VPHome"
    :class="{ 'external-link-icon-enabled': theme.externalLinkIcon }"
  >
    <VPHomeHero />

    <VPHomeFeatures />

    <VPHomeContent v-if="frontmatter.markdownStyles !== false">
      <Content />
    </VPHomeContent>
    <Content v-else />
  </main>
</template>

<style scoped>

.VPHome {
  overflow-x: clip;
  margin-bottom: 6rem;
}

@media (min-width: 48rem) {
  .VPHome {
    margin-bottom: 8rem;
  }
}
</style>
