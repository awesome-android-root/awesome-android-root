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
import Home from './Home.vue'
import MarkdownActions from './components/MarkdownActions.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
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
    app.component('home', Home)
    app.component('MarkdownActions', MarkdownActions)
  }
}
