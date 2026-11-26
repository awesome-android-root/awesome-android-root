import { defineComponent, ref, watchPostEffect } from 'vue'
import { Moon } from '@lucide/vue'
import { Sun } from '@lucide/vue'
import { useData } from 'vitepress'

export default defineComponent(() => {
  const { isDark, theme } = useData()

  // resolved after mount so SSG markup, which always assumes light, never mismatches on hydration
  const title = ref('')
  watchPostEffect(() => {
    title.value = isDark.value
      ? theme.value.lightModeSwitchTitle || 'Switch to light theme'
      : theme.value.darkModeSwitchTitle || 'Switch to dark theme'
  })

  function toggle() {
    isDark.value = !isDark.value
  }

  return () => (
    <button type="button" class="theme-toggle" role="switch" title={title.value || undefined} aria-label={theme.value.darkModeSwitchLabel || 'Appearance'} aria-checked={isDark.value} onClick={toggle}>
      <Sun class="theme-icon-sun" aria-hidden="true" />
      <Moon class="theme-icon-moon" aria-hidden="true" />
    </button>
  )
})
