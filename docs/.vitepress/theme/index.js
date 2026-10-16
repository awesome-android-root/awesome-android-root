// https://vitepress.dev/guide/custom-theme
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
import CopyOrDownloadAsMarkdownButtons from 'vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue'

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
    try {
      app.component('StoreLink', StoreLink)
      app.component('LandingIcon', LandingIcon)
      app.component('BrandIcon', BrandIcon)
      app.component('home', Home)
      app.component('CopyOrDownloadAsMarkdownButtons', CopyOrDownloadAsMarkdownButtons)
    } catch (error) {
      console.error('Failed to register components:', error)
    }

    // Global error handler - only verbose in development
    app.config.errorHandler = (err, instance, info) => {
      if (import.meta.env.DEV) {
        console.error('Global error:', err)
        console.error('Error info:', info)
        console.error('Component instance:', instance)
      }
    }
  }
}
