import { defineComponent } from 'vue'
import { withBase } from 'vitepress'

export default defineComponent(() => () => <div class="home-search-area">
  <button type="button" class="home-search" aria-haspopup="dialog" onClick={() => window.dispatchEvent(new Event('aar:open-search'))}>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/></svg>
    <span>Search apps, modules and guides</span><kbd>/</kbd>
  </button>
  <div class="quick-links"><span>Quick links</span><a href={withBase('/rooting-guides/magisk-guide')}>Root with Magisk</a><a href={withBase('/rooting-guides/kernelsu-guide')}>Root with KernelSU</a><a href={withBase('/rooting-guides/root-without-unlocking-bootloader')}>Temp root without unlock</a><a href={withBase('/troubleshooting')}>Troubleshooting</a></div>
</div>)
