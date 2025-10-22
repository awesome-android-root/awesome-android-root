<template>
  <!-- Mobile Floating Filter Button -->
  <transition name="filter-button-fade">
    <button
      v-show="isMobile && !showMobileFilter"
      class="floating-filter-btn"
      @click="openMobileFilter"
      aria-label="Filter apps"
      title="Filter apps"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
      <span v-if="activeFilters.length > 0" class="filter-active-indicator">{{ activeFilters.length }}</span>
    </button>
  </transition>

  <!-- Mobile Filter Overlay -->
  <transition name="mobile-filter-fade">
    <div v-if="isMobile && showMobileFilter" class="mobile-filter-overlay" @click="closeMobileFilter">
      <div class="mobile-filter-panel" @click.stop>
        <div class="mobile-filter-header">
          <h3>Filter Apps & Modules</h3>
          <button class="close-mobile-filter" @click="closeMobileFilter" aria-label="Close filters">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="filter-box mobile">
          <!-- Filter Pills -->
          <div class="filter-pills">
            <button 
              v-for="filter in quickFilters" 
              :key="filter.value"
              class="filter-pill"
              :class="{ active: activeFilters.includes(filter.value) }"
              @click="toggleFilter(filter.value)"
            >
              <span class="pill-icon">{{ filter.icon }}</span>
              <span class="pill-label">{{ filter.label }}</span>
            </button>
          </div>

          <!-- Filter Stats -->
          <div v-if="activeFilters.length > 0" class="filter-stats">
            <span class="stats-text">
              Showing <strong>{{ visibleCount }}</strong> of <strong>{{ totalCount }}</strong> entries
            </span>
            <button 
              class="clear-filters-btn"
              @click="clearFilters"
            >
              Clear all
            </button>
          </div>
          
          <div v-else class="filter-hint">
            <p>Select badges to filter apps and modules</p>
          </div>
        </div>
      </div>
    </div>
  </transition>

  <!-- Desktop Filter Bar -->
  <div v-if="!isMobile" class="app-filter-container" :class="{ sticky: isSticky }">
    <div class="filter-box">
      <div class="filter-header">
        <div class="filter-header-left">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
          <span class="filter-title">Filter</span>
          <span v-if="activeFilters.length > 0" class="filter-badge">{{ activeFilters.length }}</span>
        </div>
        
        <div class="filter-header-right">
          <label class="sticky-toggle" title="Keep filter bar visible while scrolling">
            <input type="checkbox" v-model="isSticky" />
            <span class="toggle-text">Pin</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="17" x2="12" y2="22"></line>
              <path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24Z"></path>
            </svg>
          </label>
          <button 
            v-if="activeFilters.length > 0"
            class="clear-all-btn"
            @click="clearFilters"
            title="Clear all filters"
          >
            Clear
          </button>
        </div>
      </div>
      
      <!-- Filter Pills -->
      <div class="filter-pills">
        <button 
          v-for="filter in quickFilters" 
          :key="filter.value"
          class="filter-pill"
          :class="{ active: activeFilters.includes(filter.value) }"
          @click="toggleFilter(filter.value)"
          :title="`Filter by ${filter.label}`"
        >
          <span class="pill-icon">{{ filter.icon }}</span>
          <span class="pill-label">{{ filter.label }}</span>
        </button>
      </div>

      <!-- Filter Stats -->
      <transition name="stats-fade">
        <div v-if="activeFilters.length > 0" class="filter-stats">
          <span class="stats-text">
            <strong>{{ visibleCount }}</strong> / {{ totalCount }} entries
          </span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'

const activeFilters = ref([])
const visibleCount = ref(0)
const totalCount = ref(0)
const isMobile = ref(false)
const showMobileFilter = ref(false)
const isSticky = ref(false)

const quickFilters = [
  { label: 'Featured ⭐', value: '⭐', icon: '⭐' },
  { label: 'FOSS', value: 'FOSS', icon: '🔓' },
  { label: 'Proprietary', value: 'Proprietary', icon: '🔒' },
  { label: 'Magisk [M]', value: '[M]', icon: '🧲' },
  { label: 'KernelSU [K]', value: '[K]', icon: '🔧' },
  { label: 'LSPosed [LSP]', value: '[LSP]', icon: '⚡' },
]

const toggleFilter = (filterValue) => {
  const index = activeFilters.value.indexOf(filterValue)
  if (index > -1) {
    activeFilters.value.splice(index, 1)
  } else {
    activeFilters.value.push(filterValue)
  }
  applyFilters()
}

const clearFilters = () => {
  activeFilters.value = []
  applyFilters()
}

const openMobileFilter = () => {
  showMobileFilter.value = true
}

const closeMobileFilter = () => {
  showMobileFilter.value = false
}

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768
}

const applyFilters = () => {
  const filters = activeFilters.value
  
  // Get all app entries (list items containing apps)
  const appSections = document.querySelectorAll('.app-search-content h2, .app-search-content h3, .app-search-content ul')
  const allListItems = document.querySelectorAll('.app-search-content ul li')
  
  totalCount.value = allListItems.length
  let visible = 0
  
  // If no filters, show all
  if (filters.length === 0) {
    allListItems.forEach(item => {
      item.style.display = ''
    })
    appSections.forEach(section => {
      section.style.display = ''
    })
    visibleCount.value = totalCount.value
    return
  }
  
  // Apply filters
  allListItems.forEach(item => {
    const text = item.textContent.toLowerCase()
    const innerHTML = item.innerHTML
    
    // Check filters (OR logic - must match at least one filter)
    const hasAnyFilter = filters.some(filter => {
      // For badges like [M], [K], [LSP], check the exact format in code blocks
      if (filter.startsWith('[') && filter.endsWith(']')) {
        return innerHTML.includes(`<code>${filter}</code>`)
      }
      // For FOSS, Proprietary, check in code blocks
      if (filter === 'FOSS' || filter === 'Proprietary') {
        return innerHTML.includes(`<code>${filter}</code>`)
      }
      // For star, check directly in text
      if (filter === '⭐') {
        return text.includes('⭐')
      }
      return false
    })
    
    if (hasAnyFilter) {
      item.style.display = ''
      visible++
    } else {
      item.style.display = 'none'
    }
  })
  
  // Show/hide section headers based on whether they have visible items
  appSections.forEach(section => {
    if (section.tagName === 'UL') {
      const hasVisibleItems = Array.from(section.children).some(li => li.style.display !== 'none')
      section.style.display = hasVisibleItems ? '' : 'none'
    } else if (section.tagName === 'H2' || section.tagName === 'H3') {
      // Check if the next sibling (or any following element until next heading) has visible items
      let nextElement = section.nextElementSibling
      let hasVisibleContent = false
      
      while (nextElement && nextElement.tagName !== 'H2' && nextElement.tagName !== 'H3') {
        if (nextElement.tagName === 'UL' && nextElement.style.display !== 'none') {
          hasVisibleContent = true
          break
        }
        if (nextElement.tagName === 'H4') {
          // Check subsections
          let subElement = nextElement.nextElementSibling
          while (subElement && subElement.tagName !== 'H2' && subElement.tagName !== 'H3' && subElement.tagName !== 'H4') {
            if (subElement.tagName === 'UL' && subElement.style.display !== 'none') {
              hasVisibleContent = true
              break
            }
            subElement = subElement.nextElementSibling
          }
        }
        nextElement = nextElement.nextElementSibling
      }
      
      section.style.display = hasVisibleContent ? '' : 'none'
    }
  })
  
  visibleCount.value = visible
}

// Initialize on mount
onMounted(() => {
  // Check if mobile
  checkMobile()
  window.addEventListener('resize', checkMobile)
  
  // Wait for content to be rendered
  setTimeout(() => {
    const allListItems = document.querySelectorAll('.app-search-content ul li')
    totalCount.value = allListItems.length
    visibleCount.value = allListItems.length
  }, 500)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
/* Desktop Filter Container */
.app-filter-container {
  position: relative;
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  padding: 0.75rem 0;
  margin: 1rem 0 1.25rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.app-filter-container.sticky {
  position: sticky;
  top: var(--vp-nav-height);
  z-index: 10;
  margin-top: 0;
  border-radius: 0 0 12px 12px;
  border-top: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.filter-box {
  max-width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.625rem;
  gap: 1rem;
}

.filter-header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-header-left svg {
  color: var(--vp-c-brand-1);
  flex-shrink: 0;
}

.filter-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  letter-spacing: 0.02em;
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: var(--vp-c-brand-1);
  color: white;
  font-size: 11px;
  font-weight: 700;
  border-radius: 10px;
  line-height: 1;
}

.filter-header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sticky-toggle {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.3125rem 0.625rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  user-select: none;
}

.sticky-toggle:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.sticky-toggle input[type="checkbox"] {
  width: 14px;
  height: 14px;
  margin: 0;
  cursor: pointer;
  accent-color: var(--vp-c-brand-1);
}

.toggle-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  line-height: 1;
}

.sticky-toggle svg {
  color: var(--vp-c-text-3);
  flex-shrink: 0;
}

.sticky-toggle:hover .toggle-text,
.sticky-toggle:hover svg {
  color: var(--vp-c-brand-1);
}

.clear-all-btn {
  padding: 0.3125rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.clear-all-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

/* Filter Pills */
.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-pill {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.4375rem 0.75rem;
  font-size: 0.8125rem;
  font-weight: 500;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--vp-c-text-2);
}

.filter-pill:hover {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
}

.filter-pill.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
  box-shadow: 0 2px 8px rgba(var(--vp-c-brand-1), 0.25);
}

.filter-pill.active:hover {
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(var(--vp-c-brand-1), 0.35);
}

.pill-icon {
  font-size: 0.9375rem;
  line-height: 1;
}

.pill-label {
  white-space: nowrap;
  line-height: 1;
  font-weight: 600;
}

/* Filter Stats */
.stats-fade-enter-active,
.stats-fade-leave-active {
  transition: all 0.3s ease;
}

.stats-fade-enter-from,
.stats-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.filter-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.625rem;
  padding: 0.4375rem 0.75rem;
  background: var(--vp-c-brand-soft);
  border-radius: 6px;
}

.stats-text {
  color: var(--vp-c-text-2);
  font-size: 0.8125rem;
}

.stats-text strong {
  color: var(--vp-c-brand-1);
  font-weight: 700;
}

.clear-filters-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 5px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  white-space: nowrap;
}

.clear-filters-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.filter-hint {
  margin-top: 0.75rem;
  padding: 0.625rem 0.875rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  text-align: center;
}

.filter-hint p {
  margin: 0;
  color: var(--vp-c-text-3);
  font-size: 0.8125rem;
}

/* Floating Filter Button (Mobile) */
.floating-filter-btn {
  position: fixed;
  bottom: 5.5rem;
  right: 1.25rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--vp-c-brand-3);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--vp-c-brand-2);
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  z-index: 9999;
  backdrop-filter: blur(4px);
}

.floating-filter-btn:hover {
  background: var(--vp-c-brand-2);
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
  transform: translateY(-2px);
}

.floating-filter-btn:active {
  transform: translateY(0);
}

.filter-active-indicator {
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  font-size: 11px;
  font-weight: 600;
  color: white;
  background: #ef4444;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  border: 2px solid var(--vp-c-bg);
}

.filter-button-fade-enter-active,
.filter-button-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.filter-button-fade-enter-from,
.filter-button-fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}

/* Mobile Filter Overlay */
.mobile-filter-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: flex-end;
}

.mobile-filter-panel {
  width: 100%;
  max-height: 70vh;
  background: var(--vp-c-bg);
  border-radius: 16px 16px 0 0;
  overflow-y: auto;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.2);
}

.mobile-filter-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  position: sticky;
  top: 0;
  background: var(--vp-c-bg);
  z-index: 1;
}

.mobile-filter-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.close-mobile-filter {
  padding: 0.5rem;
  background: var(--vp-c-bg-soft);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-mobile-filter:hover {
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-1);
}

.filter-box.mobile {
  padding: 1.25rem 1.25rem 1.75rem;
}

.filter-box.mobile .filter-pills {
  gap: 0.625rem;
}

.filter-box.mobile .filter-pill {
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
}

.filter-box.mobile .pill-icon {
  font-size: 1.0625rem;
}

.filter-box.mobile .filter-stats {
  margin-top: 0.875rem;
  padding: 0.625rem 0.875rem;
}

.filter-box.mobile .stats-text {
  font-size: 0.875rem;
}

.filter-box.mobile .clear-filters-btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.8125rem;
}

.mobile-filter-fade-enter-active {
  transition: opacity 0.3s ease;
}

.mobile-filter-fade-leave-active {
  transition: opacity 0.2s ease;
}

.mobile-filter-fade-enter-from,
.mobile-filter-fade-leave-to {
  opacity: 0;
}

.mobile-filter-fade-enter-active .mobile-filter-panel {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.mobile-filter-fade-leave-active .mobile-filter-panel {
  transition: transform 0.25s cubic-bezier(0.4, 0, 0.6, 1);
}

.mobile-filter-fade-enter-from .mobile-filter-panel {
  transform: translateY(100%);
}

.mobile-filter-fade-leave-to .mobile-filter-panel {
  transform: translateY(100%);
}

/* Responsive design */
@media (max-width: 768px) {
  .app-filter-container {
    display: none;
  }
  
  .floating-filter-btn {
    bottom: 5rem;
    right: 1rem;
    width: 40px;
    height: 40px;
  }
}

@media (min-width: 769px) {
  .floating-filter-btn {
    display: none;
  }
  
  .mobile-filter-overlay {
    display: none;
  }
}

/* Dark mode enhancements */
@media (prefers-color-scheme: dark) {
  .search-input {
    background: var(--vp-c-bg-elv);
  }
  
  .search-input:focus {
    background: var(--vp-c-bg);
  }
  
  .mobile-search-overlay {
    background: rgba(0, 0, 0, 0.7);
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .floating-search-btn,
  .search-button-fade-enter-active,
  .search-button-fade-leave-active,
  .mobile-search-fade-enter-active,
  .mobile-search-fade-leave-active,
  .mobile-search-fade-enter-active .mobile-search-panel,
  .mobile-search-fade-leave-active .mobile-search-panel {
    transition: none;
  }
}
</style>
