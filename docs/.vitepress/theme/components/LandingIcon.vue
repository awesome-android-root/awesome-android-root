<script setup>
import { computed } from 'vue'
import AudioWaveform from '@lucide/vue/dist/esm/icons/audio-waveform.mjs'
import BookOpen from '@lucide/vue/dist/esm/icons/book-open.mjs'
import CircleHelp from '@lucide/vue/dist/esm/icons/circle-question-mark.mjs'
import Cog from '@lucide/vue/dist/esm/icons/cog.mjs'
import DatabaseBackup from '@lucide/vue/dist/esm/icons/database-backup.mjs'
import Eraser from '@lucide/vue/dist/esm/icons/eraser.mjs'
import EyeOff from '@lucide/vue/dist/esm/icons/eye-off.mjs'
import FolderTree from '@lucide/vue/dist/esm/icons/folder-tree.mjs'
import Gamepad2 from '@lucide/vue/dist/esm/icons/gamepad-2.mjs'
import Gauge from '@lucide/vue/dist/esm/icons/gauge.mjs'
import Ghost from '@lucide/vue/dist/esm/icons/ghost.mjs'
import HardDriveDownload from '@lucide/vue/dist/esm/icons/hard-drive-download.mjs'
import KeyRound from '@lucide/vue/dist/esm/icons/key-round.mjs'
import LibraryBig from '@lucide/vue/dist/esm/icons/library-big.mjs'
import Lock from '@lucide/vue/dist/esm/icons/lock.mjs'
import Network from '@lucide/vue/dist/esm/icons/network.mjs'
import Package from '@lucide/vue/dist/esm/icons/package.mjs'
import Palette from '@lucide/vue/dist/esm/icons/palette.mjs'
import Puzzle from '@lucide/vue/dist/esm/icons/puzzle.mjs'
import Rocket from '@lucide/vue/dist/esm/icons/rocket.mjs'
import Scale from '@lucide/vue/dist/esm/icons/scale.mjs'
import ShieldCheck from '@lucide/vue/dist/esm/icons/shield-check.mjs'
import ShieldHalf from '@lucide/vue/dist/esm/icons/shield-half.mjs'
import SlidersHorizontal from '@lucide/vue/dist/esm/icons/sliders-horizontal.mjs'
import Sprout from '@lucide/vue/dist/esm/icons/sprout.mjs'
import SquareTerminal from '@lucide/vue/dist/esm/icons/square-terminal.mjs'
import Trophy from '@lucide/vue/dist/esm/icons/trophy.mjs'
import Unlock from '@lucide/vue/dist/esm/icons/lock-open.mjs'
import VenetianMask from '@lucide/vue/dist/esm/icons/venetian-mask.mjs'
import WandSparkles from '@lucide/vue/dist/esm/icons/wand-sparkles.mjs'
import Wrench from '@lucide/vue/dist/esm/icons/wrench.mjs'

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

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 22 },
  strokeWidth: { type: [Number, String], default: 1.75 }
})

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
