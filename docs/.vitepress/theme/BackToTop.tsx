import { defineComponent, Transition, vShow, withDirectives, ref, onMounted, onBeforeUnmount } from 'vue'
import './BackToTop.css'

export default defineComponent(() => {
  const visible = ref(false)
  let ticking = false

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        visible.value = window.scrollY > 450
        ticking = false
      })
      ticking = true
    }
  }

  function scrollToTop() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return () => (
    <Transition name="back-to-top-fade">{() => withDirectives(
      <button class="back-to-top" type="button" aria-label="Back to top" title="Back to top" onClick={scrollToTop}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15l7-7 7 7" /></svg>
        <span class="sr-only">Back to top</span>
      </button>, [[vShow, visible.value]])}</Transition>
  )
})
