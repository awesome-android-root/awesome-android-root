// https://vitepress.dev/guide/custom-theme
import { defineAsyncComponent, h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import './custom.css'
import PwaReload from './PwaReload.vue'
import StoreLink from './components/StoreLink.vue'
import CategoryGrid from './components/CategoryGrid.vue'
import EntryCount from './components/EntryCount.vue'
import HomeSearch from './components/HomeSearch.vue'
import CopyOrDownloadAsMarkdownButtons from 'vitepress-plugin-llms/vitepress-components/CopyOrDownloadAsMarkdownButtons.vue'

const FilterBar = defineAsyncComponent(() => import('./components/FilterBar.vue'))

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,

  Layout: () => {
    const { page } = useData()
    const relativePath = page.value.relativePath ?? ''
    const showFilters = relativePath.startsWith('apps-and-modules/') && relativePath !== 'apps-and-modules/index.md'

    return h(DefaultTheme.Layout, null, {
      'doc-before': () => showFilters ? h(FilterBar) : null,
      'layout-bottom': () => h(PwaReload)
    })
  },

  enhanceApp({ app }) {
    app.component('StoreLink', StoreLink)
    app.component('CategoryGrid', CategoryGrid)
    app.component('EntryCount', EntryCount)
    app.component('HomeSearch', HomeSearch)
    app.component('CopyOrDownloadAsMarkdownButtons', CopyOrDownloadAsMarkdownButtons)
  }
}
