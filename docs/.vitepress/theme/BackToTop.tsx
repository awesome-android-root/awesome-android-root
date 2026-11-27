import { defineComponent, Transition, vShow, withDirectives, ref, onMounted, onBeforeUnmount } from 'vue'
import './BackToTop.css'

/** Distance from the top of the document, in px, after which the button shows. */
const SHOW_AFTER = 450

export default defineComponent(() => {
  const visible = ref(false)
  let observer: IntersectionObserver | undefined
  let sentinel: HTMLElement | undefined

  function scrollToTop() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      window.scrollTo(0, 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  onMounted(() => {
    // A 1px marker whose bottom edge sits SHOW_AFTER px down the document. It
    // stops intersecting (edge contact still counts) exactly when
    // scrollY > SHOW_AFTER, so no handler runs on every scroll frame.
    sentinel = document.createElement('div')
    sentinel.className = 'back-to-top-sentinel'
    sentinel.setAttribute('aria-hidden', 'true')
    sentinel.style.top = `${SHOW_AFTER - 1}px`
    document.body.append(sentinel)
    observer = new IntersectionObserver(([entry]) => {
      visible.value = !entry.isIntersecting && entry.boundingClientRect.top < 0
    })
    observer.observe(sentinel)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    sentinel?.remove()
  })

  return () => (
    <Transition name="back-to-top-fade">{() => withDirectives(
      <button class="back-to-top" type="button" aria-label="Back to top" title="Back to top" onClick={scrollToTop}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 15l7-7 7 7" /></svg>
        <span class="sr-only">Back to top</span>
      </button>, [[vShow, visible.value]])}</Transition>
  )
})
