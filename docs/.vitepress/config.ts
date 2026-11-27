import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { writePageIndex } from '../../scripts/page-index.ts'
import { buildSearchIndex } from '../../scripts/search-index.ts'
import { markdownOptions } from './markdown/index.ts'
import { SITE_NAME } from './site/constants.ts'
import { pwa } from './site/pwa.ts'
import { head, sitemap, transformHead } from './site/seo.ts'
import { nav, sidebar } from './site/sidebar.ts'
import { vite } from './site/vite.ts'

// Composition only: site constants, SEO, navigation, PWA and Vite settings live
// in ./site/, and the Markdown pipeline lives in ./markdown/.
export default withPwa(defineConfig({
  lang: 'en-US',
  base: process.env.SITE_BASE || '/',
  async buildEnd(site) {
    await buildSearchIndex(site.outDir, site.srcDir)
    const pages = await writePageIndex(site.outDir, site.srcDir, site.pages)
    console.log(`WebMCP page index: ${pages} pages in ${site.outDir}/page-index.json`)
  },
  title: SITE_NAME,
  ignoreDeadLinks: false,
  cleanUrls: true,
  lastUpdated: true,
  sitemap,
  transformHead,
  vite,
  pwa,
  markdown: markdownOptions,
  head,

  themeConfig: {
    logo: {
      light: '/images/logo.svg',
      dark: '/images/logo_dark.svg',
      alt: 'Awesome Android Root Logo'
    },

    nav,
    sidebar,

    footer: {
      message: `
        <div class="vp-footer-links">
          <a href="/contributing">Contribute</a>
          <span class="vp-footer-sep" aria-hidden="true">•</span>
          <a href="/legal-disclaimer">Legal</a>
          <span class="vp-footer-sep" aria-hidden="true">•</span>
          <a href="https://github.com/awesome-android-root/awesome-android-root">GitHub</a>
        </div>
      `,
      copyright: `Copyright © ${new Date().getFullYear()} Awesome Android Root Project`
    },

    editLink: {
      pattern: 'https://github.com/awesome-android-root/awesome-android-root/edit/main/docs/:path',
      text: 'Suggest an edit on GitHub'
    },

    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    socialLinks: [
      { icon: 'x', link: 'https://x.com/awsm_and_root' },
      { icon: 'github', link: 'https://github.com/awesome-android-root/awesome-android-root' }
    ],
  },
}))
