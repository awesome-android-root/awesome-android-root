import { defineComponent, ref } from 'vue'
import { withBase } from 'vitepress'
import LandingIcon from './LandingIcon.tsx'
import { data as counts } from './categories.data.ts'

const categories = [
  ['root-management', 'Root management', 'key-round', 'Root managers, frameworks and modules.'],
  ['app-modifications', 'App modifications', 'puzzle', 'Patch and customize your apps.'],
  ['system', 'System and app management', 'sliders-horizontal', 'Manage packages, permissions and system settings.'],
  ['customization', 'Customization', 'palette', 'Change themes, display and interface.'],
  ['performance', 'Performance and battery', 'gauge', 'Tune performance, kernels and power.'],
  ['ad-blocking', 'Ad blocking', 'shield-check', 'Block ads and trackers with hosts and DNS.'],
  ['development', 'Development and automation', 'square-terminal', 'Terminals, ADB and automation tools.'],
  ['privacy', 'Privacy', 'eye-off', 'Control identifiers, location and isolation.'],
  ['security', 'Security and firewalls', 'lock', 'Control network access and protect your device.'],
  ['networking', 'Networking', 'network', 'VPN, Wi-Fi and network tools.'],
  ['file-management', 'File management', 'folder-tree', 'Browse and manage files and partitions.'],
  ['audio', 'Audio', 'audio-waveform', 'Audio effects, routing and enhancements.'],
  ['backup', 'Backup and restore', 'database-backup', 'Back up apps and data.'],
  ['debloating', 'Debloating', 'eraser', 'Remove unwanted system apps.'],
  ['gaming', 'Gaming', 'gamepad-2', 'Gaming tweaks and tools.'],
  ['utilities', 'General utilities', 'package', 'Sharing, power and other tools.']
] as const

export default defineComponent(() => {
  const expanded = ref(false)
  return () => <div class="home-router">
    <section class="home-start" aria-labelledby="start-title">
      <p class="section-kicker">Find your path</p><h2 id="start-title">Where are you starting?</h2>
      <div class="start-options">
        <a href={withBase('/rooting-guides/')}><span>01 / Learn</span><strong>Complete beginner</strong><p>Understand root, risks and preparation.</p><b>Start learning <span aria-hidden="true">→</span></b></a>
        <a href={withBase('/rooting-guides/#device-specific-guides')}><span>02 / Prepare</span><strong>Ready to root</strong><p>Find instructions for your device.</p><b>Find your guide <span aria-hidden="true">→</span></b></a>
        <a href={withBase('/apps-and-modules/')}><span>03 / Explore</span><strong>Already rooted</strong><p>Find tools for what you want to do.</p><b>Browse apps <span aria-hidden="true">→</span></b></a>
      </div>
    </section>
    <section class="home-categories" aria-labelledby="categories-title">
      <div class="section-heading"><div><p class="section-kicker">The directory</p><h2 id="categories-title">Explore by category</h2><p>Find the right tool for the job.</p></div><a href={withBase('/apps-and-modules/')}>View directory <span aria-hidden="true">→</span></a></div>
      <div class="category-grid">{categories.slice(0, expanded.value ? categories.length : 6).map(([slug, name, icon, description]) => <a class="category-tile" href={withBase(`/apps-and-modules/${slug}`)}>
        <span class="category-icon"><LandingIcon name={icon} size={20} /></span><span class="category-body"><strong>{name}</strong><span>{description}</span></span><span class="category-count">{counts[slug] ?? 0} <span>entries</span></span>
      </a>)}</div>
      <button type="button" class="show-categories" aria-expanded={expanded.value} onClick={() => { expanded.value = !expanded.value }}>{expanded.value ? 'Show fewer categories' : `Show all ${categories.length} categories`}</button>
    </section>
    <section class="home-sponsor" aria-label="Sponsor"><span>Sponsored</span><a href="https://addy.io/?ref=awesome-android-root"><strong>addy.io</strong> <span>A different email address for every website.</span> <span aria-hidden="true">↗</span></a></section>
  </div>
})
