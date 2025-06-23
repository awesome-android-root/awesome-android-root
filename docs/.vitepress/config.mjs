import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: "en-US",
  title: "Awesome Android Root",
  ignoreDeadLinks: true,
  cleanUrls: true,

  head: [
    // Favicons with improved metadata
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'AAR' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],

    // Additional browser compatibility meta tags
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['meta', { name: 'color-scheme', content: 'light dark' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0, viewport-fit=cover' }],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'AAR' }],
    ['meta', { name: 'application-name', content: 'Awesome Android Root' }],
    ['meta', { name: 'mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }],

    // SEO Meta Tags
    ['meta', { name: 'keywords', content: 'awesome android root, android root 2025, best magisk modules, lsposed framework, android rooting guide, kernelsu modules, root apps collection, android customization, xposed modules, bootloader unlock, android mods, root tools, custom rom, android tweaks, system modifications' }],

    ['meta', { name: 'author', content: 'Fynks' }],
    ['meta', { name: 'publisher', content: 'Awesome Android Root Project' }],
    ['meta', { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1' }],
    ['meta', { name: 'googlebot', content: 'index, follow, max-image-preview:large' }],
    ['meta', { name: 'language', content: 'en-US' }],
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
        miniSearch: {
          searchOptions: {
            fuzzy: 0.2,
            prefix: true,
            boost: { title: 4, text: 2, titles: 1 }
          }
        },
        translations: {
          button: {
            buttonText: 'Search apps, modules & guides',
            buttonAriaLabel: 'Search root resources'
          },
          modal: {
            displayDetails: 'Display detailed list',
            resetButtonTitle: 'Reset search',
            backButtonTitle: 'Close search',
            noResultsText: 'No results for',
            footer: {
              selectText: 'to select',
              navigateText: 'to navigate',
              closeText: 'to close'
            }
          }
        }
      }
    },
    nav: [
      {
        text: 'Home',
        link: '/',
        ariaLabel: 'Go to homepage'
      },
      {
        text: 'Root Apps & Modules',
        items: [
          {
            text: 'Popular Categories',
            items: [
              { text: '🛡️ Ad Blocking', link: '/#ad-blocking' },
              { text: '📱 App Management', link: '/#app-management' },
              { text: '🎯 App Modifications', link: '/#app-mods' },
              { text: '🎨 Customization', link: '/#customization' }
            ]
          },
          {
            text: 'System & Performance',
            items: [
              { text: '⚡ Performance', link: '/#performance-improvements' },
              { text: '🔧 System Tools', link: '/#system-tools' },
              { text: '🎵 Audio Enhancement', link: '/#audio-enhancement' },
              { text: '🔋 Battery Management', link: '/#battery-management' }
            ]
          },
          {
            text: 'Browse All',
            items: [
              { text: '📋 All Categories', link: '/#root-apps' }
            ]
          }
        ]
      },
      {
        text: 'Guides',
        items: [
          {
            text: 'Rooting Guides',
            items: [
              { text: '📖 Prerequisites', link: '/rooting-guides/#prerequisites-and-preparations' },
              { text: '❓ Should I Root?', link: '/rooting-guides/##should-you-root-your-device' },
              { text: '📖 Complete Rooting Guide', link: '/rooting-guides/' },
              { text: '📚 Device Specific Guides', link: '/rooting-guides/#device-specific-guides' }
            ]
          },
          {
            text: 'Help & Troubleshooting',
            items: [
              { text: '❓ FAQ', link: '/faqs' },
              { text: '📚 Glossary', link: '/#glossary' },
              { text: '🆘 Troubleshooting', link: '/faqs#troubleshooting' }
            ]
          }
        ]
      },
      {
        text: 'Resources',
        items: [
          {
            text: 'Documentation',
            items: [
              { text: '📚 Getting Started', link: '/#what-is-root-access' },
              { text: '📖 Contributing Guide', link: '/contributing' },
              { text: '⚠️ Important Notes', link: '/#important-notes' },
              { text: '📊 Project Stats', link: '/#stats' }
            ]
          },
          {
            text: 'Community',
            items: [
              { text: '💬 Community & Forums', link: '/#community-resources' },
              { text: '🐛 Report Issues', link: 'https://github.com/awesome-android-root/awesome-android-root/issues' },
              { text: '💡 Feature Requests', link: 'https://github.com/awesome-android-root/awesome-android-root/discussions' }
            ]
          }
        ]
      },
      {
        text: 'Links',
        items: [
          {
            text: 'Project Links',
            items: [
              { text: '🏠 Main Website', link: 'https://awesome-android-root.org' },
              { text: '📱 GitHub Repository', link: 'https://github.com/awesome-android-root/awesome-android-root' },
              { text: '💖 Support Project', link: 'https://opencollective.com/awesome-android-root-official' }
            ]
          },
          {
            text: 'Mirror Sites',
            items: [
              { text: '☁️ Cloudflare Pages', link: 'https://awesome-android-root.pages.dev/' },
              { text: '🌐 Netlify Mirror', link: 'https://awesome-android-root.netlify.app/' }
            ]
          }
        ]
      }
    ],
    sidebar: [
      {
        text: '🚀 Getting Started',
        collapsed: false,
        items: [
          { text: 'What is Root Access?', link: '/#what-is-root-access' },
          { text: 'Root Guide & Solutions', link: '/rooting-guides/' },
          { text: 'Glossary', link: '/#glossary' }
        ]
      },
       { text: '📋 Browse all Categories', link: '/#root-apps' },
      {
        text: '🎨 Customization',
        collapsed: true,
        items: [
          { text: 'OS Customizations', link: '/#os-customizations' },
          { text: 'Theming', link: '/#theming' },
          { text: 'Launchers', link: '/#launchers' },
          { text: 'Boot Animations', link: '/#boot-animations' },
          { text: 'Font Managers', link: '/#font-managers' },
          { text: 'Navigation', link: '/#navigation' }
        ]
      },
      {
        text: '🎯 App Modifications',
        collapsed: true,
        items: [
          { text: 'Social Media Mods', link: '/#social-media-mods' },
          { text: 'Other App Mods', link: '/#other-app-mods' },
          { text: 'Patching', link: '/#patching' },
          { text: 'ReVanced', link: '/#revanced' }
        ]
      }, {
        text: '🔧 System Tools',
        collapsed: true,
        items: [
          { text: 'File Management', link: '/#file-management' },
          { text: 'Backup & Restore', link: '/#backup-and-restore' },
          { text: 'Cleaning Apps', link: '/#cleaning-apps' },
          { text: 'Development & Debugging', link: '/#development-and-debugging' },
          { text: 'Termux', link: '/#termux' },
          { text: 'Tools', link: '/#tools' }
        ]
      },
      {
        text: '🛡️ Security & Blocking',
        collapsed: true,
        items: [
          { text: 'Ad Blocking', link: '/#ad-blocking' },
          { text: 'Privacy & Security', link: '/#privacy-and-security' },
          { text: 'Hide Root', link: '/#hide-root' }
        ]
      },
      {
        text: '📱 App Management',
        collapsed: true,
        items: [
          { text: 'App Managers', link: '/#app-managers' },
          { text: 'App Markets', link: '/#app-markets' },
          { text: 'App Permissions', link: '/#app-permissions' },
          { text: 'App Isolation & Cloning', link: '/#app-isolation-and-cloning' }
        ]
      },
      {
        text: '⚡ Performance & System',
        collapsed: true,
        items: [
          { text: 'Performance Improvements', link: '/#performance-improvements' },
          { text: 'Battery Management', link: '/#battery-management' },
          { text: 'System Modifications', link: '/#system-modifications' },
          { text: 'Kernel Management', link: '/#kernel-management' },
          { text: 'Debloating', link: '/#debloating' }
        ]
      },
      {
        text: '🎵 Media & Hardware',
        collapsed: true,
        items: [
          { text: 'Audio Enhancement', link: '/#audio-enhancement' },
          { text: 'Screen & Display', link: '/#screen-and-display' },
          { text: 'Device Control & Hardware', link: '/#device-control-and-hardware' },
          { text: 'NFC Tools', link: '/#nfc-tools' }
        ]
      },
      {
        text: '📚 Help & Community',
        collapsed: true,
        items: [
          { text: 'FAQ', link: '/faqs' },
          { text: 'Important Notes', link: '/#important-notes' },
          { text: 'Community & Resources', link: '/#community--resources' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Stats', link: '/#stats' }
        ]
      }
    ],
    footer: {
      message: "Made with ❤️ for the Android Root community",
      copyright: `Copyright © ${new Date().getFullYear()} Awesome Android Root Project`
    },
    outline: {
      level: [2, 3],
      label: 'On this page'
    },
    lastUpdated: {
      text: 'Updated at',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'short'
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/awesome-android-root/awesome-android-root' },
      { icon: 'reddit', link: 'https://www.reddit.com/r/Awesome_Android_Root/' } 
    ],
  }
})
