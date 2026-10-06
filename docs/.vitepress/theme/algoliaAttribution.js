const AOS_URL = 'https://www.algolia.com/?utm_medium=AOS-referral'
const LOGO_SELECTOR = '.DocSearch-Logo a, .DocSearch-Footer a[href*="algolia.com"]'

function patch(root) {
  if (!root || typeof root.querySelectorAll !== 'function') return
  for (const link of root.querySelectorAll(LOGO_SELECTOR)) {
    if (link.dataset.aosAttribution === 'true') continue
    link.href = AOS_URL
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
    link.setAttribute('aria-label', 'Search by Algolia')
    link.dataset.aosAttribution = 'true'
  }
}

export function setupAlgoliaAttribution() {
  if (typeof window === 'undefined' || typeof MutationObserver === 'undefined') return

  patch(document)

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === 1) patch(node)
      }
    }
  })

  observer.observe(document.body, { childList: true })
}
