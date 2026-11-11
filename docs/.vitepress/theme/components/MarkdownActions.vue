<script setup>
import CopyOrDownloadAsMarkdownButtons from 'vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue'
</script>

<template>
  <!-- v1.15.0 does not default the component's optional showDownload prop to true. -->
  <CopyOrDownloadAsMarkdownButtons :show-download="true" />
</template>
