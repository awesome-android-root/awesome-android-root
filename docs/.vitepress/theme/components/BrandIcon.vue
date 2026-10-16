<script setup>
import { computed } from 'vue'
import { siGithub, siX } from 'simple-icons'

const BRANDS = {
  github: siGithub,
  x: siX
}

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 }
})

const brand = computed(() => BRANDS[props.name])
</script>

<template>
  <svg
    v-if="brand"
    class="landing-icon"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path :d="brand.path" />
  </svg>
</template>
