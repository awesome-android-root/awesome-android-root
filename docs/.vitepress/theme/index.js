// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import PwaReload from './PwaReload.vue'
import BackToTop from './BackToTop.vue'
import StoreLink from './components/StoreLink.vue'
import AppSearch from './components/AppSearch.vue'
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
      // Provide both PWA reload + BackToTop in bottom layout slot
      'layout-bottom': () => [
        h(PwaReload),
        h(BackToTop)
      ]
    })
  },

  enhanceApp({ app, router }) {
    // Register global components
    try {
      app.component('StoreLink', StoreLink)
      app.component('AppSearch', AppSearch)
      app.component('CopyOrDownloadAsMarkdownButtons', CopyOrDownloadAsMarkdownButtons)
    } catch (error) {
      console.error('Failed to register components:', error)
    }

    // Client-side only enhancements. VitePress replaces the rendered content
    // on every SPA navigation, so the ARIA labels are (re)applied after each
    // route change.
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

/**
 * Add ARIA labels for improved accessibility.
 *
 * Only augments what VitePress' default theme does not already provide.
 * In VitePress 2 the mobile hamburger, search button and social links already
 * ship with native aria-* attributes, so those are no longer patched here.
 * Each guard skips elements that already define the attribute, making this
 * safe to re-run after every route change.
 */
function addAriaLabels() {
  // ARIA label for the sidebar (the <aside> landmark has no accessible name)
  const sidebar = document.querySelector('.VPSidebar')
  if (sidebar && !sidebar.hasAttribute('aria-label')) {
    sidebar.setAttribute('aria-label', 'Page navigation sidebar')
  }

  // ARIA label for the table-of-contents aside (VitePress 2: .VPDocAside)
  const aside = document.querySelector('.VPDocAside')
  if (aside && !aside.hasAttribute('aria-label')) {
    aside.setAttribute('aria-label', 'Table of contents')
  }

  // ARIA labels for the top navigation links / dropdown triggers
  const navLinks = document.querySelectorAll('.VPNavBarMenuLink > a, .VPNavBarMenuGroup > button')
  navLinks.forEach((link) => {
    if (link.hasAttribute('aria-label')) return
    const text = link.textContent?.trim()
    if (!text) return
    if (link.tagName === 'BUTTON') {
      link.setAttribute('aria-label', `${text} menu`)
      link.setAttribute('aria-haspopup', 'true')
    } else {
      link.setAttribute('aria-label', `Navigate to ${text}`)
    }
  })

  // Descriptive labels for social links (defaults are just "github"/"x")
  const socialLinks = document.querySelectorAll('.VPSocialLink')
  socialLinks.forEach((link) => {
    if (link.dataset.aarLabeled === 'true') return
    const href = link.getAttribute('href') || ''
    let label = null
    if (href.includes('github.com')) {
      label = 'View source code on GitHub'
    } else if (href.includes('twitter.com') || href.includes('x.com')) {
      label = 'Follow us on Twitter/X'
    }
    if (label) {
      link.setAttribute('aria-label', label)
      link.dataset.aarLabeled = 'true'
    }
  })

  // Dark-mode toggle: VitePress 2 gives it role="switch" + aria-checked but no
  // accessible name. The toggle is the .VPSwitch button itself.
  const appearanceToggle = document.querySelector('.VPSwitchAppearance')
  if (appearanceToggle && !appearanceToggle.hasAttribute('aria-label')) {
    appearanceToggle.setAttribute('aria-label', 'Toggle dark mode')
  }

  // ARIA labels for prev/next pagination
  const prevLink = document.querySelector('.pager-link.prev')
  const nextLink = document.querySelector('.pager-link.next')

  if (prevLink && !prevLink.hasAttribute('aria-label')) {
    const prevText = prevLink.querySelector('.desc')?.textContent || 'previous page'
    prevLink.setAttribute('aria-label', `Go to ${prevText}`)
  }

  if (nextLink && !nextLink.hasAttribute('aria-label')) {
    const nextText = nextLink.querySelector('.desc')?.textContent || 'next page'
    nextLink.setAttribute('aria-label', `Go to ${nextText}`)
  }

  // ARIA labels for outline (on-this-page) links
  const outlineLinks = document.querySelectorAll('.VPDocOutlineItem a')
  outlineLinks.forEach((link) => {
    if (link.hasAttribute('aria-label')) return
    const text = link.textContent?.trim()
    if (text) {
      link.setAttribute('aria-label', `Jump to section: ${text}`)
    }
  })

  // The content container is a <div>, so expose it as the main landmark
  const content = document.querySelector('.VPContent')
  if (content && !content.hasAttribute('role')) {
    content.setAttribute('role', 'main')
    content.setAttribute('aria-label', 'Main content')
  }

  // ARIA labels for footer links
  const footerLinks = document.querySelectorAll('.VPFooter a')
  footerLinks.forEach((link) => {
    if (link.hasAttribute('aria-label')) return
    const text = link.textContent?.trim()
    if (text) {
      link.setAttribute('aria-label', text)
    }
  })
}
