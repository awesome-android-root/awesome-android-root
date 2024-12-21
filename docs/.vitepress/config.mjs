import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: "en-US",
  title: "Awesome Android Root",
  description: "Ultimate list of best android root apps,rooting guides, tips, tricks and tools.",
  ignoreDeadLinks: true,
  cleanUrls: true,
  sitemap: {
    hostname: 'https://awesome-android-root.pages.dev/'
  },
  head: [
    // Favicons
    ['link', { rel: 'icon', type:'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['link', { rel: 'canonical', href: 'https://awesome-android-root.pages.dev//' }],

    // Preconnects and Prefetches
    ['link', { rel: 'dns-prefetch', href: 'https://awesome.re' }],
    ['link', { rel: 'preconnect', href: 'https://awesome.re' }],
    ['link', { rel: 'dns-prefetch', href: 'https://profile-counter.glitch.me/' }],
    ['link', { rel: 'preconnect', href: 'https://profile-counter.glitch.me/' }],
        
    // OpenGraph Meta Tags
    ['meta', { property: 'og:title', content: 'Awesome Android Root' }],
    ['meta', { property: 'og:description', content: 'Ultimate list of best android root apps,rooting guides, tips, tricks and tools.' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://raw.githubusercontent.com/fynks/awesome-android-root/refs/heads/main/docs/public/images/og.png' }],
    ['meta', { property: 'og:url', content: 'https://awesome-android-root.pages.dev//' }],
    ['meta', { property: 'og:site_name', content: 'Awesome Android Root' }],
    
    // Twitter Card Meta Tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Awesome Android Root' }],
    ['meta', { name: 'twitter:description', content: 'Ultimate list of best android root apps,rooting guides, tips, tricks and tools.' }],
    ['meta', { name: 'twitter:image', content: 'https://raw.githubusercontent.com/fynks/awesome-android-root/refs/heads/main/docs/public/images/og.png' }],

    // SEO Meta Tags
    ['meta', { name: 'keywords', content: 'android root, root apps, magisk modules, xposed modules, android customization, android tools, root utilities, android mods, cool rooted android apps, android root tool, root apk for android, adb debugging toolreddit, root apps for android, android tweaking toolbox without root, android os netlify, termux android root, how to root android in termux, android root app, how to get root access in termux without rooting your android root, awesome android root, android rooten, how to root magisk any samsung devices android 14 2024, app root for android, sdf tools android root, how to use terminal emulator in android device root, android jailbreak rooter, android root software, how to root android termux, lsposed zygisk, android root nobody, app root android, how to install parrot os on android without root youtube, debloating solution, awesome root android, android root jar, android run an app as root, awesome android kotlin apps, how to root andoid in temux, kernelsu, install parrot os on android termux non root youtube, android root file name, andid oot, android root tools, install kali linux on android without root andronix termux youtube, termux root android hilfe, adb macrodroid, android root modify app classification, toop 5 root application on android, root genes android, awesome android, aandroid root tool, best apps for rooted android reddit, root android app apk, youtube netlify lite app, git awesome android rot, start android app with root, andri root, apps to root android, root and other apps android, apps for rooting android from play store, rooted andoid 15, xposed installer 官网, apatch root, install hydra on termux in android without root youtube, qmqm.netlify.app, root, they like the applications to be integrated in the android root, android permissions list, tools to root android device, run termux command from kernel mamager, how to install termux on android no root, root package manager android, android hilfe rooten' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    ['meta', { name: 'author', content: 'Fynks' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'language', content: 'English' }]

    ],
  themeConfig: {
    logo: {
      light: '/images/logo.svg',
      dark: '/images/logo_dark.svg',
      alt: 'Site Logo'
    },
    search: {
      provider: 'local',
      options: {
        detailedView: true,
        translations: {
          button: {
            buttonText: 'Search',
            buttonAriaLabel: 'Search documentation'
          }
        }
      }
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Apps', link: '/apps' },
      { 
        text: 'Guides',
        items: [
          { text: 'Rooting Guide', link: '/rooting-guides/' },
          { text: 'Troubleshooting', link: '/troubleshooting/' }
        ]
      },
      { text: 'FAQs', link: '/faqs' },
      { text: 'Contribute', link: '/contributing' }
    ],
    sidebar: [
      {
        text: 'Rooting Guides',
        collapsed: false,
        items: [
          { text: 'Basic Concepts', link: '/rooting-guides/' },
          { text: 'Xiaomi Devices', link: '/rooting-guides/xiaomi' },
          { text: 'Samsung Devices', link: '/rooting-guides/samsung' },
          { text: 'Pixel Devices', link: '/rooting-guides/pixel' }
        ]
      },{
        text: 'Troubleshooting',
        collapsed: false,
        items: [
          { text: 'Common Issues', link: '/troubleshooting/' },
          { text: 'WhatsApp Fix', link: '/troubleshooting/whatsapp' }
        ]
      },
      {
        text: 'Resources',
        collapsed: true,
        items: [
          { text: 'Apps List', link: '/apps' },
          { text: 'FAQs', link: '/faqs' },
          { text: 'How to Contribute', link: '/contributing' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/fynks/awesome-android-root' }
    ],
    footer: {
      message: "Released under the UnLicense.",
      copyright: "Copyright © 2024-present"
    },
        outline: {
      level: [2, 3],
      label: 'On this page'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    }
  }
})
