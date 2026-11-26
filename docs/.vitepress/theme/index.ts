import type { Theme } from 'vitepress'
import { defineAsyncComponent, defineComponent, h, onMounted, ref } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
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
  const Tools = defineAsyncComponent(() => import('./WebMcp.tsx'))
  onMounted(() => {
    supported.value = !!(document.modelContext ?? navigator.modelContext)?.registerTool
  })
  return () => supported.value ? h(Tools) : null
})

export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
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
    app.component('StoreLink', StoreLink)
    app.component('LandingIcon', LandingIcon)
    app.component('BrandIcon', BrandIcon)
    app.component('MarkdownActions', MarkdownActions)
  }
} satisfies Theme
