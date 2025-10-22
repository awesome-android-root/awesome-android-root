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
   * Initialize the observer
   */
  init() {
    if (typeof window === 'undefined' || this.observer) return

    this.observer = new MutationObserver((mutations) => {
      // Batch DOM reads/writes using requestAnimationFrame
      requestAnimationFrame(() => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.processImages(node)
            }
          })
        })
      })
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
      }
      
      // Cleanup on page unload
      window.addEventListener('beforeunload', () => {
        imageOptimizer.destroy()
      })
      
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