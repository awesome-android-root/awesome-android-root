// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import PwaReload from './PwaReload.vue'
import BackToTop from './BackToTop.vue'

/** @type {import('vitepress').Theme} */
export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // Provide both PWA reload + BackToTop in bottom layout slot
      'layout-bottom': () => [h(PwaReload), h(BackToTop)]
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Performance optimization: Add image loading attributes
    if (typeof window !== 'undefined') {
      // Add loading="lazy" to images after mount
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) { // Element node
              // Add loading attributes to shields.io images
              const images = node.querySelectorAll?.('img[src*="img.shields.io"]') || [];
              images.forEach(img => {
                if (!img.hasAttribute('loading')) {
                  img.setAttribute('loading', 'eager'); // Keep badges as eager loading
                  img.setAttribute('decoding', 'async');
                }
              });
              
              // Add loading attributes to other images
              const otherImages = node.querySelectorAll?.('img:not([src*="img.shields.io"])') || [];
              otherImages.forEach(img => {
                if (!img.hasAttribute('loading')) {
                  img.setAttribute('loading', 'lazy');
                  img.setAttribute('decoding', 'async');
                }
              });
            }
          });
        });
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
      
      // Disconnect observer on route change
      router.onAfterRouteChanged = () => {
        observer.disconnect();
      };
    }
  }
}
