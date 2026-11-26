import type { Theme } from 'vitepress'
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import PwaReload from './PwaReload.tsx'
import BackToTop from './BackToTop.tsx'
import WebMcp from './WebMcp.tsx'
import StoreLink from './components/StoreLink.tsx'
import LandingIcon from './components/LandingIcon.tsx'
import BrandIcon from './components/BrandIcon.tsx'
import ThemeToggle from './components/ThemeToggle.tsx'
import PagefindSearch from './components/PagefindSearch.tsx'
import MarkdownActions from './components/MarkdownActions.tsx'

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
