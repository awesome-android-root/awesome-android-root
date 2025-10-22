<template>
  <div class="app-search-container">
    <div class="search-box">
      <div class="search-input-wrapper">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="Search apps, modules... (try: FOSS, [M], AdAway)"
          @input="handleSearch"
        />
        <div class="input-actions">
          <button 
            class="filter-toggle-btn" 
            @click="showFilters = !showFilters"
            :class="{ active: showFilters || activeFilters.length > 0 }"
            aria-label="Toggle filters"
            :title="showFilters ? 'Hide filters' : 'Show filters'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span v-if="activeFilters.length > 0" class="filter-count">{{ activeFilters.length }}</span>
          </button>
          <button 
            v-if="searchQuery" 
            class="clear-btn" 
            @click="clearSearch"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Filter Pills -->
      <transition name="slide-fade">
        <div v-if="showFilters" class="filter-pills">
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
      </transition>

      <!-- Search Stats -->
      <div v-if="searchQuery || activeFilters.length > 0" class="search-stats">
        <span class="stats-text">
          <strong>{{ visibleCount }}</strong> / <strong>{{ totalCount }}</strong>
        </span>
        <button 
          v-if="activeFilters.length > 0" 
          class="clear-filters-btn"
          @click="clearFilters"
        >
          Clear filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'

const searchQuery = ref('')
const activeFilters = ref([])
const showFilters = ref(false)
const visibleCount = ref(0)
const totalCount = ref(0)

const quickFilters = [
  { label: 'FOSS', value: 'FOSS', icon: '🔓' },
  { label: 'Proprietary', value: 'Proprietary', icon: '🔒' },
  { label: 'Magisk', value: '[M]', icon: '🧲' },
  { label: 'KernelSU', value: '[K]', icon: '🔧' },
  { label: 'LSPosed', value: '[LSP]', icon: '⚡' },
  { label: 'Featured', value: '⭐', icon: '⭐' },
]

// Debounce timer
let debounceTimer = null

const toggleFilter = (filterValue) => {
  const index = activeFilters.value.indexOf(filterValue)
  if (index > -1) {
    activeFilters.value.splice(index, 1)
  } else {
    activeFilters.value.push(filterValue)
  }
  handleSearch()
}

const clearFilters = () => {
  activeFilters.value = []
  handleSearch()
}

const clearSearch = () => {
  searchQuery.value = ''
  handleSearch()
}

const handleSearch = () => {
  // Debounce search for performance
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    performSearch()
  }, 150)
}

const performSearch = () => {
  const query = searchQuery.value.toLowerCase().trim()
  const filters = activeFilters.value
  
  // Get all app entries (list items containing apps)
  const appSections = document.querySelectorAll('.app-search-content h2, .app-search-content h3, .app-search-content ul')
  const allListItems = document.querySelectorAll('.app-search-content ul li')
  
  totalCount.value = allListItems.length
  let visible = 0
  
  // Hide all sections initially
  const allSections = new Set()
  
  allListItems.forEach(item => {
    const text = item.textContent.toLowerCase()
    const innerHTML = item.innerHTML
    
    let matches = true
    
    // Check search query
    if (query && !text.includes(query)) {
      matches = false
    }
    
    // Check filters (AND logic - must match all active filters)
    if (filters.length > 0) {
      const hasAllFilters = filters.every(filter => {
        const filterLower = filter.toLowerCase()
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
        return text.includes(filterLower)
      })
      
      if (!hasAllFilters) {
        matches = false
      }
    }
    
    if (matches) {
      item.style.display = ''
      visible++
      
      // Mark the parent section as having visible items
      let currentElement = item.parentElement
      while (currentElement && currentElement !== document.body) {
        if (currentElement.tagName === 'UL') {
          allSections.add(currentElement)
        }
        currentElement = currentElement.parentElement
      }
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
  
  // Scroll to first result if searching
  if (query || filters.length > 0) {
    nextTick(() => {
      const firstVisible = document.querySelector('.app-search-content ul li:not([style*="display: none"])')
      if (firstVisible) {
        firstVisible.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    })
  }
}

// Initialize search on mount
onMounted(() => {
  // Wait for content to be rendered
  setTimeout(() => {
    const allListItems = document.querySelectorAll('.app-search-content ul li')
    totalCount.value = allListItems.length
    visibleCount.value = allListItems.length
  }, 500)
  
  // Restore scroll position after search
  const savedScroll = sessionStorage.getItem('appSearchScroll')
  if (savedScroll) {
    window.scrollTo(0, parseInt(savedScroll))
    sessionStorage.removeItem('appSearchScroll')
  }
})

onUnmounted(() => {
  clearTimeout(debounceTimer)
})
</script>

<style scoped>
.app-search-container {
  position: sticky;
  top: var(--vp-nav-height);
  z-index: 10;
  background: var(--vp-c-bg);
  padding: 1rem 0;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.search-box {
  max-width: 800px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 0.875rem;
  color: var(--vp-c-text-2);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 5.5rem 0.75rem 2.75rem;
  font-size: 0.9375rem;
  border: 2px solid var(--vp-c-divider);
  border-radius: 10px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
  outline: none;
}

.search-input:focus {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
  box-shadow: 0 0 0 3px var(--vp-c-brand-soft);
}

.search-input::placeholder {
  color: var(--vp-c-text-3);
}

.input-actions {
  position: absolute;
  right: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.filter-toggle-btn,
.clear-btn {
  position: relative;
  padding: 0.375rem;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-toggle-btn:hover,
.clear-btn:hover {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.filter-toggle-btn.active {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.filter-count {
  position: absolute;
  top: -2px;
  right: -2px;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  font-size: 10px;
  font-weight: 600;
  color: white;
  background: var(--vp-c-brand-1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

/* Transition for filter pills */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-5px);
  opacity: 0;
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
  padding: 0.625rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
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
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--vp-c-text-2);
}

.filter-pill:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
  transform: translateY(-1px);
}

.filter-pill.active {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.pill-icon {
  font-size: 0.9375rem;
  line-height: 1;
}

.pill-label {
  white-space: nowrap;
  line-height: 1;
}

.search-stats {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.75rem;
  padding: 0.5rem 0.875rem;
  background: var(--vp-c-bg-soft);
  border-radius: 6px;
  font-size: 0.8125rem;
}

.stats-text {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
}

.stats-text strong {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.clear-filters-btn {
  padding: 0.3125rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: transparent;
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

/* Responsive design */
@media (max-width: 768px) {
  .app-search-container {
    padding: 0.75rem 0;
    margin-bottom: 1rem;
  }
  
  .search-input {
    padding: 0.625rem 5rem 0.625rem 2.5rem;
    font-size: 0.875rem;
    border-radius: 8px;
  }
  
  .search-icon {
    left: 0.75rem;
    width: 18px;
    height: 18px;
  }
  
  .input-actions {
    right: 0.375rem;
  }
  
  .filter-toggle-btn svg,
  .clear-btn svg {
    width: 16px;
    height: 16px;
  }
  
  .filter-pills {
    gap: 0.375rem;
    margin-top: 0.625rem;
    padding: 0.5rem;
  }
  
  .filter-pill {
    padding: 0.375rem 0.625rem;
    font-size: 0.75rem;
  }
  
  .pill-icon {
    font-size: 0.875rem;
  }
  
  .search-stats {
    flex-direction: row;
    gap: 0.5rem;
    margin-top: 0.625rem;
    padding: 0.4375rem 0.75rem;
  }
  
  .stats-text {
    font-size: 0.75rem;
  }
  
  .clear-filters-btn {
    font-size: 0.6875rem;
    padding: 0.25rem 0.625rem;
  }
}

/* Extra small screens */
@media (max-width: 480px) {
  .search-input::placeholder {
    font-size: 0.8125rem;
  }
  
  .filter-pill .pill-label {
    font-size: 0.6875rem;
  }
  
  .pill-icon {
    font-size: 0.8125rem;
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
}
</style>
