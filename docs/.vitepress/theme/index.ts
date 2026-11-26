import type { Theme } from 'vitepress'
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import PwaReload from './PwaReload.vue'
import BackToTop from './BackToTop.vue'
import WebMcp from './WebMcp.vue'
import StoreLink from './components/StoreLink.vue'
import LandingIcon from './components/LandingIcon.vue'
import BrandIcon from './components/BrandIcon.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import PagefindSearch from './components/PagefindSearch.vue'
import MarkdownActions from './components/MarkdownActions.vue'

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
