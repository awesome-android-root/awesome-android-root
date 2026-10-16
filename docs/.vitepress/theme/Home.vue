<script setup>
// Custom home layout.
//
// Mirrors VitePress' VPHome, which is not exported as a public component, with
// two changes: the content is wrapped in a <main> landmark and the hero image
// gets fetchpriority="high" so the LCP request is prioritized.
import { useData } from 'vitepress'
import { VPHomeHero, VPHomeFeatures, VPHomeContent, VPImage } from 'vitepress/theme'

const { frontmatter, theme } = useData()
</script>

<template>
  <main
    id="main-content"
    class="VPHome"
    :class="{ 'external-link-icon-enabled': theme.externalLinkIcon }"
  >
    <VPHomeHero>
      <template #home-hero-image>
        <VPImage
          v-if="frontmatter.hero?.image"
          class="image-src"
          :image="frontmatter.hero.image"
          fetchpriority="high"
          decoding="async"
        />
      </template>
    </VPHomeHero>

    <VPHomeFeatures />

    <VPHomeContent v-if="frontmatter.markdownStyles !== false">
      <Content />
    </VPHomeContent>
    <Content v-else />
  </main>
</template>

<style scoped>
/* VPHome's own styles are scoped to the VitePress component, so replicate the
   layout-relevant rules here. The background gradient comes from style.css. */
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
