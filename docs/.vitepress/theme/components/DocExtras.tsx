import { defineComponent, nextTick, onBeforeUnmount, onMounted, watch } from 'vue'
import { useData, withBase } from 'vitepress'

export default defineComponent(() => {
  const { page } = useData()
  let disposed = false
  async function addCopyLinks() {
    await nextTick()
    if (disposed) return
    for (const heading of document.querySelectorAll<HTMLElement>('.vp-doc h2[id], .vp-doc h3[id]')) {
      if (heading.querySelector('.copy-section-link')) continue
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'copy-section-link'
      button.textContent = 'Copy link'
      button.setAttribute('aria-label', `Copy link to ${heading.textContent?.replace(/^#\s*/, '').trim() ?? 'section'}`)
      button.addEventListener('click', async () => {
        try {
          const url = new URL(location.href)
          url.hash = heading.id
          await navigator.clipboard.writeText(url.href)
          button.textContent = 'Copied'
          setTimeout(() => { button.textContent = 'Copy link' }, 1600)
        } catch { button.textContent = 'Copy failed' }
      })
      heading.append(button)
    }
  }
  onMounted(() => { void addCopyLinks() })
  onBeforeUnmount(() => { disposed = true })
  watch(() => page.value.relativePath, addCopyLinks)
  return () => {
    const path = page.value.relativePath
    const group = path.startsWith('apps-and-modules/') ? ['Apps and modules', '/apps-and-modules/'] : path.startsWith('rooting-guides/') ? ['Rooting guides', '/rooting-guides/'] : path.startsWith('general-guides/') ? ['General guides', '/general-guides/'] : null
    const updated = page.value.lastUpdated ? new Date(page.value.lastUpdated).toISOString().slice(0, 10) : ''
    return <>{group && !path.endsWith('/index.md') && <nav class="doc-breadcrumb" aria-label="Breadcrumb"><a href={withBase('/')}>Home</a><span aria-hidden="true">/</span><a href={withBase(group[1])}>{group[0]}</a><span aria-hidden="true">/</span><span aria-current="page">{page.value.title}</span></nav>}{updated && <p class="doc-updated">Last updated: <time datetime={updated}>{updated}</time></p>}</>
  }
})
