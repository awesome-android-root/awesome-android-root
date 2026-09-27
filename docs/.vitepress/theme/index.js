// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import PwaReload from './PwaReload.vue'
import BackToTop from './BackToTop.vue'
import StoreLink from './components/StoreLink.vue'
import CopyOrDownloadAsMarkdownButtons from 'vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue'

function runAfterRender(callback) {
  requestAnimationFrame(() => {
    requestAnimationFrame(callback)
  })
}

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'layout-bottom': () => [
        h(PwaReload),
        h(BackToTop)
      ]
    })
  },

  enhanceApp({ app, router }) {
    try {
      app.component('StoreLink', StoreLink)
      app.component('CopyOrDownloadAsMarkdownButtons', CopyOrDownloadAsMarkdownButtons)
    } catch (error) {
      console.error('Failed to register components:', error)
    }

    if (typeof window !== 'undefined') {
      router.onAfterRouteChanged = () => {
        runAfterRender(addAriaLabels)
      }

      // Initialize on first load
      runAfterRender(addAriaLabels)
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
