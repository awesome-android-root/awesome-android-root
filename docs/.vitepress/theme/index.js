// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import PwaReload from './PwaReload.vue'
import BackToTop from './BackToTop.vue'
import StoreLink from './components/StoreLink.vue'
import AppSearch from './components/AppSearch.vue'

/**
 * Image optimization utility
 */
class ImageOptimizer {
  constructor() {
    this.observer = null
    this.processedImages = new WeakSet()
  }

  /**
   * Process image elements for lazy loading
   * @param {Element} element - DOM element to process
   */
  processImages(element) {
    if (!element?.querySelectorAll) return

    const images = element.querySelectorAll('img')

    images.forEach(img => {
      if (this.processedImages.has(img)) return
      this.processedImages.add(img)

      // Don't override explicit loading hints
      if (img.hasAttribute('loading')) return

      const isShieldsBadge = img.src?.includes('img.shields.io')
      const isAboveFold = this.isAboveFold(img)

      img.setAttribute('loading', (isShieldsBadge || isAboveFold) ? 'eager' : 'lazy')
      img.setAttribute('decoding', 'async')

      // Only boost priority for images currently visible in the viewport,
      // not those already scrolled past.
      if (isAboveFold && !isShieldsBadge) {
        img.setAttribute('fetchpriority', 'high')
      }
    })
  }

  /**
   * Check if element is currently visible in the viewport
   * (not scrolled past, not scrolled below).
   */
  isAboveFold(element) {
    const rect = element.getBoundingClientRect()
    return rect.top >= 0 && rect.top < window.innerHeight
  }

  /**
   * Initialize the MutationObserver.  When called again with a new root
   * element (e.g. after a client-side route change), the existing observer
   * is simply reconnected to the new root — no full destroy/recreate.
   */
  init(rootElement = document.querySelector('.VPContent') || document.body) {
    if (typeof window === 'undefined') return

    // If we already have an observer, just reconnect it to the new root.
    // VitePress replaces the entire .VPContent subtree on navigation, so
    // the old root is detached and observing it is harmless but wasteful.
    if (this.observer) {
      this.observer.disconnect()
      this.observer.observe(rootElement, { childList: true, subtree: true, attributes: false, characterData: false })
      this.processImages(rootElement)
      return
    }

    let pendingMutations = []
    let mutationTimeout = null

    this.observer = new MutationObserver((mutations) => {
      pendingMutations.push(...mutations)
      clearTimeout(mutationTimeout)
      mutationTimeout = setTimeout(() => {
        if (pendingMutations.length === 0) return
        requestAnimationFrame(() => {
          const batch = pendingMutations.splice(0)
          batch.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
              if (node.nodeType === Node.ELEMENT_NODE) {
                this.processImages(node)
              }
            })
          })
        })
      }, 100)
    })

    this.observer.observe(rootElement, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    })

    this.processImages(rootElement)
  }

  /**
   * Cleanup observer (page unload only — route changes use reconnect).
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
    this.processedImages = new WeakSet()
  }
}

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
  
  enhanceApp({ app, router, siteData }) {
    // Register global components with error handling
    try {
      app.component('StoreLink', StoreLink)
      app.component('AppSearch', AppSearch)
    } catch (error) {
      console.error('Failed to register components:', error)
    }
    
    // Client-side only enhancements
    if (typeof window !== 'undefined') {
      const imageOptimizer = new ImageOptimizer()
      let ariaLabelsSet = false

      const initializeClientEnhancements = () => {
        const contentRoot = document.querySelector('.VPContent') || document.body
        imageOptimizer.init(contentRoot)
        if (!ariaLabelsSet) {
          addAriaLabels()
          ariaLabelsSet = true
        }
      }

      // Cleanup observer before VitePress tears down the old content area
      router.onBeforeRouteChange = () => {
        imageOptimizer.destroy()
      }

      router.onAfterRouteChanged = () => {
        runAfterRender(initializeClientEnhancements)
      }

      window.addEventListener('beforeunload', () => imageOptimizer.destroy())

      // Initialize on first load
      runAfterRender(initializeClientEnhancements)

      if (import.meta.env.DEV) {
        window.__IMAGE_OPTIMIZER__ = imageOptimizer
        console.log('[Theme] Image optimizer initialized')
      }
    }

    // Global error handler — only verbose in development
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
 * Add ARIA labels for improved accessibility
 */
function addAriaLabels() {
  // Add ARIA label to main navigation
  const nav = document.querySelector('.VPNav')
  if (nav && !nav.hasAttribute('aria-label')) {
    nav.setAttribute('aria-label', 'Main navigation')
  }
  
  // Add ARIA label to menu items
  const navMenu = document.querySelector('.VPMenu')
  if (navMenu && !navMenu.hasAttribute('aria-label')) {
    navMenu.setAttribute('aria-label', 'Primary navigation menu')
  }
  
  // Add ARIA label to sidebar
  const sidebar = document.querySelector('.VPSidebar')
  if (sidebar && !sidebar.hasAttribute('aria-label')) {
    sidebar.setAttribute('aria-label', 'Page navigation sidebar')
  }
  
  // Add ARIA label to table of contents
  const aside = document.querySelector('.VPAside')
  if (aside && !aside.hasAttribute('aria-label')) {
    aside.setAttribute('aria-label', 'Table of contents')
  }
  
  // Add ARIA labels to navigation links
  const navLinks = document.querySelectorAll('.VPNavBarMenuLink > a, .VPNavBarMenuGroup > button')
  navLinks.forEach((link, index) => {
    if (!link.hasAttribute('aria-label')) {
      const text = link.textContent?.trim()
      if (text) {
        if (link.tagName === 'BUTTON') {
          link.setAttribute('aria-label', `${text} menu`)
          link.setAttribute('aria-haspopup', 'true')
        } else {
          link.setAttribute('aria-label', `Navigate to ${text}`)
        }
      }
    }
  })
  
  // Add ARIA labels to social links
  const socialLinks = document.querySelectorAll('.VPSocialLink')
  socialLinks.forEach(link => {
    if (!link.hasAttribute('aria-label')) {
      const href = link.getAttribute('href') || ''
      let label = 'Social link'
      
      if (href.includes('github.com')) {
        label = 'View source code on GitHub'
      } else if (href.includes('twitter.com') || href.includes('x.com')) {
        label = 'Follow us on Twitter/X'
      }
      link.setAttribute('aria-label', label)
    }
  })
  
  // Add ARIA labels to search button
  const searchButton = document.querySelector('.DocSearch-Button')
  if (searchButton && !searchButton.hasAttribute('aria-label')) {
    searchButton.setAttribute('aria-label', 'Search documentation')
  }
  
  // Add ARIA labels to mobile menu toggle
  const menuToggle = document.querySelector('.VPNavBarHamburger')
  if (menuToggle && !menuToggle.hasAttribute('aria-label')) {
    menuToggle.setAttribute('aria-label', 'Toggle navigation menu')
    menuToggle.setAttribute('aria-expanded', 'false')
  }

  if (menuToggle && menuToggle.dataset.aarBoundExpanded !== 'true') {
    menuToggle.dataset.aarBoundExpanded = 'true'

    // Update aria-expanded on click
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true'
      menuToggle.setAttribute('aria-expanded', (!expanded).toString())
    })
  }
  
  // Add ARIA labels to appearance toggle (dark mode)
  const appearanceToggle = document.querySelector('.VPSwitch')
  if (appearanceToggle) {
    const button = appearanceToggle.querySelector('button')
    if (button && !button.hasAttribute('aria-label')) {
      button.setAttribute('aria-label', 'Toggle dark mode')
    }
  }
  
  // Add ARIA labels to pagination
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
  
  // Add ARIA labels to outline links
  const outlineLinks = document.querySelectorAll('.VPDocOutlineItem a')
  outlineLinks.forEach(link => {
    if (!link.hasAttribute('aria-label')) {
      const text = link.textContent?.trim()
      if (text) {
        link.setAttribute('aria-label', `Jump to section: ${text}`)
      }
    }
  })
  
  // Add role and ARIA labels to main content
  const content = document.querySelector('.VPContent')
  if (content && !content.hasAttribute('role')) {
    content.setAttribute('role', 'main')
    content.setAttribute('aria-label', 'Main content')
  }
  
  // Add ARIA labels to footer links
  const footerLinks = document.querySelectorAll('.VPFooter a')
  footerLinks.forEach(link => {
    if (!link.hasAttribute('aria-label')) {
      const text = link.textContent?.trim()
      if (text) {
        link.setAttribute('aria-label', text)
      }
    }
  })
}
