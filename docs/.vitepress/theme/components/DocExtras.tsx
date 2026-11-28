import { defineComponent } from 'vue'
import { useData, withBase } from 'vitepress'

export default defineComponent(() => {
  const { page } = useData()
  return () => {
    const path = page.value.relativePath
    const group = path.startsWith('apps-and-modules/') ? ['Apps and modules', '/apps-and-modules/'] : path.startsWith('rooting-guides/') ? ['Rooting guides', '/rooting-guides/'] : path.startsWith('general-guides/') ? ['General guides', '/general-guides/'] : null
    const updated = page.value.lastUpdated ? new Date(page.value.lastUpdated).toISOString().slice(0, 10) : ''
    return <>{group && !path.endsWith('/index.md') && <nav class="doc-breadcrumb" aria-label="Breadcrumb"><a href={withBase('/')}>Home</a><span aria-hidden="true">/</span><a href={withBase(group[1])}>{group[0]}</a><span aria-hidden="true">/</span><span aria-current="page">{page.value.title}</span></nav>}{updated && <p class="doc-updated">Last updated: <time datetime={updated}>{updated}</time></p>}</>
  }
})
