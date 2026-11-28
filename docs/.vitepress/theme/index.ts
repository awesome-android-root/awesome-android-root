import type { Theme } from 'vitepress'
import { defineAsyncComponent, defineComponent, h, onMounted, onUnmounted, ref } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import './custom.css'
import FilterBar from './components/FilterBar.tsx'
import DocExtras from './components/DocExtras.tsx'
import Callout from './components/Callout.tsx'
import StepChecklist from './components/StepChecklist.tsx'
import PwaReload from './PwaReload.tsx'
import BackToTop from './BackToTop.tsx'
import StoreLink from './components/StoreLink.tsx'
import LandingIcon from './components/LandingIcon.tsx'
import BrandIcon from './components/BrandIcon.tsx'
import ThemeToggle from './components/ThemeToggle.tsx'
import PagefindSearch from './components/PagefindSearch.tsx'
import MarkdownActions from './components/MarkdownActions.tsx'

// Browsers without WebMCP do not need its integration code or helpers.
// Check support after mount to keep browser globals out of SSR.
const WebMcp = defineComponent(() => {
  const supported = ref(false)
  // Cover the lazy import as well as the registrations performed by the child.
  let finishReadiness: () => void = () => {}
  const ready = new Promise<void>((resolve) => { finishReadiness = resolve })
  let registrationStarted = false
  function onRegistration(pending: Promise<void>) {
    registrationStarted = true
    void pending.then(() => finishReadiness(), () => finishReadiness())
  }
  const Tools = defineAsyncComponent(async () => {
    try { return await import('./WebMcp.tsx') }
    catch (error) { finishReadiness(); throw error }
  })
  onMounted(() => {
    const modelContext = document.modelContext
    if (typeof modelContext?.registerTool !== 'function') return
    if (typeof modelContext.waitForToolsUntil === 'function') modelContext.waitForToolsUntil(ready)
    supported.value = true
  })
  onUnmounted(() => { if (!registrationStarted) finishReadiness() })
  return () => supported.value ? h(Tools, { onRegistration }) : null
})

export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h(DocExtras),
      'nav-bar-content-before': () => h(PagefindSearch),
      'nav-bar-content-after': () => [h(ThemeToggle)],
      'layout-bottom': () => [
        h(PwaReload),
        h(BackToTop),
        h(WebMcp)
      ]
    })
  },

  enhanceApp({ app }) {
    app.component('Callout', Callout)
    app.component('StepChecklist', StepChecklist)
    app.component('FilterBar', FilterBar)
    app.component('StoreLink', StoreLink)
    app.component('LandingIcon', LandingIcon)
    app.component('BrandIcon', BrandIcon)
    app.component('MarkdownActions', MarkdownActions)
  }
} satisfies Theme
