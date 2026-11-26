<script setup lang="ts">
import { computed } from 'vue'
import {
  AudioWaveform,
  BookOpen,
  CircleQuestionMark as CircleHelp,
  Cog,
  DatabaseBackup,
  Eraser,
  EyeOff,
  FolderTree,
  Gamepad2,
  Gauge,
  Ghost,
  HardDriveDownload,
  KeyRound,
  LibraryBig,
  Lock,
  Network,
  Package,
  Palette,
  Puzzle,
  Rocket,
  Scale,
  ShieldCheck,
  ShieldHalf,
  SlidersHorizontal,
  Sprout,
  SquareTerminal,
  Trophy,
  LockOpen as Unlock,
  VenetianMask,
  WandSparkles,
  Wrench
} from '@lucide/vue'

const ICONS = {
  'audio-waveform': AudioWaveform,
  'book-open': BookOpen,
  'circle-help': CircleHelp,
  cog: Cog,
  'database-backup': DatabaseBackup,
  eraser: Eraser,
  'eye-off': EyeOff,
  'folder-tree': FolderTree,
  'gamepad-2': Gamepad2,
  gauge: Gauge,
  ghost: Ghost,
  'hard-drive-download': HardDriveDownload,
  'key-round': KeyRound,
  'library-big': LibraryBig,
  lock: Lock,
  network: Network,
  package: Package,
  palette: Palette,
  puzzle: Puzzle,
  rocket: Rocket,
  scale: Scale,
  'shield-check': ShieldCheck,
  'shield-half': ShieldHalf,
  'sliders-horizontal': SlidersHorizontal,
  sprout: Sprout,
  'square-terminal': SquareTerminal,
  trophy: Trophy,
  unlock: Unlock,
  'venetian-mask': VenetianMask,
  'wand-sparkles': WandSparkles,
  wrench: Wrench
}

const props = withDefaults(defineProps<{
  name: keyof typeof ICONS
  size?: number | string
  strokeWidth?: number | string
}>(), { size: 22, strokeWidth: 1.75 })

const icon = computed(() => ICONS[props.name])
</script>

<template>
  <component
    :is="icon"
    v-if="icon"
    class="landing-icon"
    :size="size"
    :stroke-width="strokeWidth"
    aria-hidden="true"
  />
</template>
