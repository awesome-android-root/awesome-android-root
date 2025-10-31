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
    this.mutationTimeout = null
    this.pendingMutations = []
  }

  /**
   * Process image elements for lazy loading
   * @param {Element} element - DOM element to process
   */
  processImages(element) {
    if (!element?.querySelectorAll) return

    // Process all images within the element
    const images = element.querySelectorAll('img')
    
    images.forEach(img => {
      // Skip if already processed
      if (this.processedImages.has(img)) return
      
      // Mark as processed
      this.processedImages.add(img)
      
      // Skip if loading attribute already set
      if (img.hasAttribute('loading')) return
      
      // Determine loading strategy based on image source
      const isShieldsBadge = img.src?.includes('img.shields.io')
      const isAboveFold = this.isAboveFold(img)
      
      // Set appropriate loading strategy
      img.setAttribute('loading', (isShieldsBadge || isAboveFold) ? 'eager' : 'lazy')
      img.setAttribute('decoding', 'async')
      
      // Add fetchpriority for critical images
      if (isAboveFold && !isShieldsBadge) {
        img.setAttribute('fetchpriority', 'high')
      }
    })
  }

  /**
   * Check if element is above the fold
   * @param {Element} element - Element to check
   * @returns {boolean}
   */
  isAboveFold(element) {
    const rect = element.getBoundingClientRect()
    return rect.top < window.innerHeight && rect.bottom > 0
  }

  /**
   * Process pending mutations in batches
   */
  processPendingMutations() {
    if (this.pendingMutations.length === 0) return
    
    // Batch process all pending mutations
    requestAnimationFrame(() => {
      const mutations = this.pendingMutations.splice(0)
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            this.processImages(node)
          }
        })
      })
    })
  }

  /**
   * Initialize the observer
   */
  init() {
    if (typeof window === 'undefined' || this.observer) return

    this.observer = new MutationObserver((mutations) => {
      // Collect mutations and debounce processing
      this.pendingMutations.push(...mutations)
      
      // Clear existing timeout
      clearTimeout(this.mutationTimeout)
      
      // Debounce mutations to avoid excessive processing
      this.mutationTimeout = setTimeout(() => {
        this.processPendingMutations()
      }, 100)
    })

    // Observe with optimized options
    this.observer.observe(document.body, {
      childList: true,
      subtree: true,
      // Only observe element additions, not attributes or character data
      attributes: false,
      characterData: false
    })

    // Process existing images on initialization
    this.processImages(document.body)
  }

  /**
   * Cleanup observer
   */
  destroy() {
    if (this.observer) {
      this.observer.disconnect()
      this.observer = null
    }
    
    // Clear any pending timeouts
    clearTimeout(this.mutationTimeout)
    
    // Clear pending mutations
    this.pendingMutations = []
    
    // Reset processed images
    this.processedImages = new WeakSet()
  }
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
      
      // Initialize after app is mounted
      app.config.globalProperties.$onMounted = () => {
        // Delay initialization to ensure DOM is ready
        setTimeout(() => imageOptimizer.init(), 0)
      }
      
      // Properly handle route changes
      router.onBeforeRouteChange = () => {
        // Cleanup before route change
        imageOptimizer.destroy()
      }
      
      router.onAfterRouteChanged = () => {
        // Reinitialize after route change
        setTimeout(() => imageOptimizer.init(), 100)
        
        // Add ARIA labels for accessibility
        addAriaLabels()
      }
      
      // Cleanup on page unload
      window.addEventListener('beforeunload', () => {
        imageOptimizer.destroy()
      })
      
      // Add ARIA labels on initial load
      setTimeout(() => addAriaLabels(), 500)
      
      // Optional: Add performance monitoring
      if (import.meta.env.DEV) {
        window.__IMAGE_OPTIMIZER__ = imageOptimizer
        console.log('[Theme] Image optimizer initialized')
      }
    }
    
    // Optional: Add global error handler
    app.config.errorHandler = (err, instance, info) => {
      console.error('Global error:', err)
      if (import.meta.env.DEV) {
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
      } else if (href.includes('opencollective.com')) {
        label = 'Support the project on Open Collective'
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
