/** Top navigation and per-section sidebars. `icon` keys become inline SVG via withIcons. */
import { withIcons } from '../icons.ts'

/** Shared sidebar for standalone pages such as policies, contact, and project info. */
const STANDALONE_PAGE_SIDEBAR = [
  {
    text: 'Project', icon: 'file-text',
    items: [
      { text: 'About', link: '/about' },
      { text: 'Contributing', link: '/contributing' },
      { text: 'Contact', link: '/contact' },
      { text: 'Privacy', link: '/privacy' },
      { text: 'Legal Disclaimer', link: '/legal-disclaimer' }
    ]
  },
  {
    text: 'Help', icon: 'circle-question-mark',
    items: [
      { text: 'FAQ', link: '/faqs' },
      { text: 'Troubleshooting', link: '/troubleshooting' },
      { text: 'Resources', link: '/resources' },
      { text: 'Non-Root Alternatives', link: '/non-root-alternatives' }
    ]
  }
]

export const nav = withIcons([
  { text: 'Home', link: '/' },
  {
    text: 'Apps & Modules',
    link: '/apps-and-modules/',
    activeMatch: '^/apps-and-modules/'
  },
  {
    text: 'Rooting Guides',
    link: '/rooting-guides/',
    activeMatch: '^/rooting-guides/'
  },
  {
    text: 'Tutorials',
    link: '/general-guides/',
    activeMatch: '^/general-guides/'
  },
  {
    text: 'Help',
    items: [
      {
        text: 'Support',
        items: [
          { text: 'FAQ', link: '/faqs' },
          { text: 'Troubleshooting', link: '/troubleshooting' },
          { text: 'Resources', link: '/resources' },
          { text: 'Non-Root Alternatives', link: '/non-root-alternatives' }
        ]
      },
      {
        text: 'Project',
        items: [
          { text: 'About', link: '/about' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'Contact', link: '/contact' },
          { text: 'Privacy', link: '/privacy' },
          { text: 'Legal Disclaimer', link: '/legal-disclaimer' }
        ]
      }
    ],
  },
])

export const sidebar = withIcons({
  // Rooting Guides Sidebar
  '/rooting-guides/': [
    {
      text: 'Guide Overview', icon: 'book-open',
      collapsed: false,
      items: [
        { text: 'Table of Contents', link: '/rooting-guides/' },
        { text: 'Understanding Root', link: '/rooting-guides/#understanding-root-access' },
        { text: 'Benefits vs Risks', link: '/rooting-guides/#benefits-vs-risks' },
        { text: 'Safety First', link: '/rooting-guides/#prerequisites-and-safety' }
      ]
    },
    {
      text: 'Root Methods',
      items: [
        { text: 'Compare Methods', link: '/rooting-guides/root-framework-comparison' },
        { text: 'Magisk (Recommended)', link: '/rooting-guides/magisk-guide' },
        { text: 'KernelSU', link: '/rooting-guides/kernelsu-guide' },
        { text: 'SUSFS Root Hiding', link: '/rooting-guides/susfs-guide' },
        { text: 'APatch', link: '/rooting-guides/apatch-guide' },
        { text: 'Temporary Root, No Unlock', link: '/rooting-guides/root-without-unlocking-bootloader' }
      ]
    },
    {
      text: 'Locked-Bootloader Options', icon: 'lock',
      collapsed: true,
      items: [
        { text: 'DirtyFrag & GhostLock', link: '/rooting-guides/root-without-unlocking-bootloader' },
        { text: 'Bootloader Mods & Temp Root', link: '/rooting-guides/temporary-root-solutions' }
      ]
    },
    {
      text: 'Step-by-Step Process', icon: 'wrench',
      collapsed: false,
      items: [
        { text: '1️⃣ Unlock Bootloader', link: '/rooting-guides/how-to-unlock-bootloader' },
        { text: '2️⃣ Install Custom Recovery', link: '/rooting-guides/how-to-install-custom-recovery' },
        { text: '3️⃣ Root Your Device', link: '/rooting-guides/#universal-rooting-process' },
        { text: '4️⃣ Install LSPosed Framework', link: '/rooting-guides/lsposed-guide' },
        { text: '5️⃣ Install Custom ROM (Optional)', link: '/rooting-guides/custom-rom-installation' }
      ]
    },
    {
      text: 'Device-Specific Guides', icon: 'smartphone',
      collapsed: true,
      items: [
        { text: 'All Supported Devices', icon: 'clipboard-list', link: '/rooting-guides/#device-specific-guides' },
        {
          text: 'Popular Brands', icon: 'trophy',
          items: [
            { text: 'Google Pixel Phones', link: '/rooting-guides/how-to-root-pixel-phone' },
            { text: 'Samsung Galaxy Devices', link: '/rooting-guides/how-to-root-samsung-phone' },
            { text: 'Xiaomi/Redmi/POCO', link: '/rooting-guides/how-to-root-xiaomi-phone' },
            { text: 'OnePlus Smartphones', link: '/rooting-guides/how-to-root-oneplus-phone' },
            { text: 'Motorola Phones', link: '/rooting-guides/how-to-root-motorola-phone' },
            { text: 'Nothing Phone Series', link: '/rooting-guides/how-to-root-nothing-phone' }
          ]
        }
      ]
    },
    {
      text: 'Help & Support',
      collapsed: true,
      items: [
        { text: 'Troubleshooting Guide', link: '/troubleshooting' },
        { text: 'Frequently Asked Questions', link: '/faqs' },
        { text: 'Community Help & Resources', link: '/rooting-guides/#community-and-support' },
        { text: 'Rooting Glossary', link: '/apps-and-modules/#glossary' }
      ]
    }
  ],

  // Apps and Modules Sidebar
  '/apps-and-modules/': [
    {
      text: 'Quick Access', icon: 'star',
      collapsed: false,
      items: [
        { text: 'Category Overview', link: '/apps-and-modules/' },
        { text: 'Must-Have Apps', icon: 'star', link: '/apps-and-modules/#starter-kit-must-have-apps' },
        { text: 'Glossary & Badges', icon: 'book', link: '/apps-and-modules/#glossary' },
        { text: 'Safety Checklist', icon: 'shield', link: '/apps-and-modules/#safety-legal' }
      ]
    },
    {
      text: 'Root Management', icon: 'wrench',
      link: '/apps-and-modules/root-management',
      collapsed: true,
      items: [
        { text: 'Root Managers', link: '/apps-and-modules/root-management#root-managers' },
        { text: 'Temporary Root (Locked Bootloader)', link: '/apps-and-modules/root-management#temporary-root-locked-bootloader' },
        { text: 'Module Managers', link: '/apps-and-modules/root-management#module-managers' },
        { text: 'Metamodules', link: '/apps-and-modules/root-management#metamodules' },
        { text: 'LSPosed & Xposed', link: '/apps-and-modules/root-management#lsposed-xposed' },
        { text: 'Zygisk', link: '/apps-and-modules/root-management#zygisk' },
        { text: 'Root Hiding & Play Integrity', link: '/apps-and-modules/root-management#root-hiding-play-integrity' },
        { text: 'Susfs', link: '/apps-and-modules/root-management#susfs' },
        { text: 'Bootloop Protection', link: '/apps-and-modules/root-management#bootloop-protection' },
        { text: 'Root Detection & Testing', link: '/apps-and-modules/root-management#root-detection-testing' },
      ]
    },
    {
      text: 'System', icon: 'settings',
      link: '/apps-and-modules/system',
      collapsed: true,
      items: [
        { text: 'System Tweaks', link: '/apps-and-modules/system#system-tweaks' },
        { text: 'VBMeta Mods', link: '/apps-and-modules/system#vbmeta-mods' },
        { text: 'System UI & Framework', link: '/apps-and-modules/system#system-ui-framework' },
        { text: 'AOSP (Android Open Source Project)', link: '/apps-and-modules/system#aosp-android-open-source-project' },
        { text: 'ColorOS (Oppo)', link: '/apps-and-modules/system#coloros-oppo' },
        { text: 'Flyme (Meizu)', link: '/apps-and-modules/system#flyme-meizu' },
        { text: 'HyperOS (Xiaomi)', link: '/apps-and-modules/system#hyperos-xiaomi' },
        { text: 'NothingOS', link: '/apps-and-modules/system#nothingos' },
        { text: 'One UI (Samsung)', link: '/apps-and-modules/system#one-ui-samsung' },
        { text: 'Onyx', link: '/apps-and-modules/system#onyx' },
        { text: 'Oxygen OS (OnePlus)', link: '/apps-and-modules/system#oxygen-os-oneplus' },
        { text: 'ZUI', link: '/apps-and-modules/system#zui' },
        { text: 'Boot & Startup', link: '/apps-and-modules/system#boot-startup' },
        { text: 'App & Package Management', link: '/apps-and-modules/system#app-package-management' },
        { text: 'Permissions & AppOps', link: '/apps-and-modules/system#permissions-appops' },
        { text: 'System Information & Diagnostics', link: '/apps-and-modules/system#system-information-diagnostics' },
      ]
    },
    {
      text: 'Performance & Battery', icon: 'zap',
      link: '/apps-and-modules/performance',
      collapsed: true,
      items: [
        { text: 'Performance Optimization', link: '/apps-and-modules/performance#performance-optimization' },
        { text: 'Kernel Management', link: '/apps-and-modules/performance#kernel-management' },
        { text: 'Memory & RAM', link: '/apps-and-modules/performance#memory-ram' },
        { text: 'Battery Optimization', link: '/apps-and-modules/performance#battery-optimization' },
        { text: 'Charging & Power', link: '/apps-and-modules/performance#charging-power' },
        { text: 'Task & Process Management', link: '/apps-and-modules/performance#task-process-management' },
      ]
    },
    {
      text: 'Privacy', icon: 'eye-off',
      link: '/apps-and-modules/privacy',
      collapsed: true,
      items: [
        { text: 'Privacy Tools', link: '/apps-and-modules/privacy#privacy-tools' },
        { text: 'Device ID & Spoofing', link: '/apps-and-modules/privacy#device-id-spoofing' },
        { text: 'App Isolation', link: '/apps-and-modules/privacy#app-isolation' },
        { text: 'Location & GPS', link: '/apps-and-modules/privacy#location-gps' },
      ]
    },
    {
      text: 'Security', icon: 'lock-keyhole',
      link: '/apps-and-modules/security',
      collapsed: true,
      items: [
        { text: 'Security Tools', link: '/apps-and-modules/security#security-tools' },
        { text: 'Firewalls & Filtering', link: '/apps-and-modules/security#firewalls-filtering' },
      ]
    },
    {
      text: 'Ad Blocking', icon: 'shield-off',
      link: '/apps-and-modules/ad-blocking',
      collapsed: true,
      items: [
        { text: 'Ad & Tracker Blocking', link: '/apps-and-modules/ad-blocking#ad-tracker-blocking' },
        { text: 'DNS & Network Filtering', link: '/apps-and-modules/ad-blocking#dns-network-filtering' },
      ]
    },
    {
      text: 'App Modifications', icon: 'puzzle',
      link: '/apps-and-modules/app-modifications',
      collapsed: true,
      items: [
        { text: 'App Patchers', link: '/apps-and-modules/app-modifications#app-patchers' },
        { text: 'App Mods', link: '/apps-and-modules/app-modifications#app-mods' },
        { text: 'Social Media Mods', link: '/apps-and-modules/app-modifications#social-media-mods' },
        { text: 'Browser Mods', link: '/apps-and-modules/app-modifications#browser-mods' },
        { text: 'Media & Camera Mods', link: '/apps-and-modules/app-modifications#media-camera-mods' },
        { text: 'Signature & Verification', link: '/apps-and-modules/app-modifications#signature-verification' },
      ]
    },
    {
      text: 'Debloating', icon: 'eraser',
      link: '/apps-and-modules/debloating',
      collapsed: true,
      items: [
        { text: 'Debloating Apps & Modules', link: '/apps-and-modules/debloating#debloating-apps-modules' },
      ]
    },
    {
      text: 'File Management', icon: 'folder-tree',
      link: '/apps-and-modules/file-management',
      collapsed: true,
      items: [
        { text: 'File Managers', link: '/apps-and-modules/file-management#file-managers' },
        { text: 'Cleaning', link: '/apps-and-modules/file-management#cleaning' },
        { text: 'File & Partition Tools', link: '/apps-and-modules/file-management#file-partition-tools' },
      ]
    },
    {
      text: 'Backup & Restore', icon: 'database-backup',
      link: '/apps-and-modules/backup',
      collapsed: true,
      items: [
        { text: 'Backup & Restore', link: '/apps-and-modules/backup#backup-restore' },
      ]
    },
    {
      text: 'Customization', icon: 'palette',
      link: '/apps-and-modules/customization',
      collapsed: true,
      items: [
        { text: 'Themes & Visual Mods', link: '/apps-and-modules/customization#themes-visual-mods' },
        { text: 'Launchers & Home Screen', link: '/apps-and-modules/customization#launchers-home-screen' },
        { text: 'Status Bar & Navigation', link: '/apps-and-modules/customization#status-bar-navigation' },
        { text: 'Gestures & Controls', link: '/apps-and-modules/customization#gestures-controls' },
        { text: 'Fonts & Emojis', link: '/apps-and-modules/customization#fonts-emojis' },
        { text: 'Notifications', link: '/apps-and-modules/customization#notifications' },
        { text: 'Lockscreen & AOD', link: '/apps-and-modules/customization#lockscreen-aod' },
        { text: 'Screen & Display', link: '/apps-and-modules/customization#screen-display' },
      ]
    },
    {
      text: 'Audio', icon: 'audio-lines',
      link: '/apps-and-modules/audio',
      collapsed: true,
      items: [
        { text: 'Audio Enhancement', link: '/apps-and-modules/audio#audio-enhancement' },
        { text: 'Audio Control', link: '/apps-and-modules/audio#audio-control' },
        { text: 'Audio Effects', link: '/apps-and-modules/audio#audio-effects' },
      ]
    },
    {
      text: 'Networking', icon: 'globe',
      link: '/apps-and-modules/networking',
      collapsed: true,
      items: [
        { text: 'VPN & Proxy', link: '/apps-and-modules/networking#vpn-proxy' },
        { text: 'Network Tools', link: '/apps-and-modules/networking#network-tools' },
        { text: 'Wi-Fi & Mobile Data', link: '/apps-and-modules/networking#wi-fi-mobile-data' },
        { text: 'Bluetooth & NFC', link: '/apps-and-modules/networking#bluetooth-nfc' },
      ]
    },
    {
      text: 'Gaming', icon: 'gamepad-2',
      link: '/apps-and-modules/gaming',
      collapsed: true,
      items: [
        { text: 'Gaming Optimization', link: '/apps-and-modules/gaming#gaming-optimization' },
        { text: 'Game Modifications & Tools', link: '/apps-and-modules/gaming#game-modifications-tools' },
      ]
    },
    {
      text: 'Development & Automation', icon: 'square-terminal',
      link: '/apps-and-modules/development',
      collapsed: true,
      items: [
        { text: 'Terminal & Shell', link: '/apps-and-modules/development#terminal-shell' },
        { text: 'ADB & Debugging', link: '/apps-and-modules/development#adb-debugging' },
        { text: 'Developer Tools', link: '/apps-and-modules/development#developer-tools' },
        { text: 'Linux Environments', link: '/apps-and-modules/development#linux-environments' },
        { text: 'Automation', link: '/apps-and-modules/development#automation' },
        { text: 'Hardware & Sensors', link: '/apps-and-modules/development#hardware-sensors' },
      ]
    },
    {
      text: 'General Utilities', icon: 'box',
      link: '/apps-and-modules/utilities',
      collapsed: true,
      items: [
        { text: 'Sync & File Transfer', link: '/apps-and-modules/utilities#sync-file-transfer' },
        { text: 'Reboot & Power', link: '/apps-and-modules/utilities#reboot-power' },
        { text: 'Sharing & Intent Tools', link: '/apps-and-modules/utilities#sharing-intent-tools' },
        { text: 'Communication & Messaging', link: '/apps-and-modules/utilities#communication-messaging' },
        { text: 'General Toolboxes', link: '/apps-and-modules/utilities#general-toolboxes' },
      ]
    },
    {
      text: 'More Resources', icon: 'book-open',
      collapsed: true,
      items: [
        { text: 'Rooting Guides', link: '/rooting-guides/' },
        { text: 'General Guides', link: '/general-guides/' },
        { text: 'Troubleshooting', link: '/troubleshooting' },
        { text: 'FAQs', link: '/faqs' },
        { text: 'Community Resources', link: '/resources' }
      ]
    }
  ],

  // General Guides Sidebar
  '/general-guides/': [
    {
      text: 'General Guides', icon: 'book-open',
      collapsed: false,
      items: [
        { text: 'Overview', link: '/general-guides/' },
        { text: 'Privacy & Ad Blocking', link: '/general-guides/#privacy-ad-blocking' },
        { text: 'App Management', link: '/general-guides/#app-management' },
        { text: 'Related Documentation', link: '/general-guides/#related-documentation' }
      ]
    },
    {
      text: 'Privacy & Ad Blocking', icon: 'shield',
      collapsed: false,
      items: [
        { text: 'Android Ad Blocking', link: '/general-guides/android-adblocking' }
      ]
    },
    {
      text: 'App Management', icon: 'box',
      collapsed: false,
      items: [
        { text: 'Safely Debloat Android Apps', link: '/general-guides/android-apps-debloating' },
        { text: 'Stop Play Store Auto-Updates', link: '/general-guides/stop-android-app-auto-updates-play-store' }
      ]
    },
    {
      text: 'More Documentation',
      collapsed: true,
      items: [
        { text: 'Non-root Alternatives', link: '/non-root-alternatives' },
        { text: 'Rooting Guides', link: '/rooting-guides/' },
        { text: 'Troubleshooting', link: '/troubleshooting' },
        { text: 'FAQs', link: '/faqs' },
        { text: 'Apps & Modules', link: '/apps-and-modules/' }
      ]
    }
  ],

  // Standalone pages sidebars
  '/troubleshooting': [
    {
      text: 'Troubleshooting',
      items: [
        { text: 'Emergency Recovery', link: '/troubleshooting#emergency-recovery' },
        { text: 'Magisk Troubleshooting', link: '/troubleshooting#magisk-troubleshooting' },
        { text: 'KernelSU Troubleshooting', link: '/troubleshooting#kernelsu-troubleshooting' },
        { text: 'APatch Troubleshooting', link: '/troubleshooting#apatch-troubleshooting' },
        { text: 'Bootloader & Fastboot', link: '/troubleshooting#bootloader-and-fastboot-issues' },
        { text: 'Play Integrity', link: '/troubleshooting#play-integrity-and-banking-apps' }
      ]
    },
    {
      text: 'Related',
      items: [
        { text: 'Back to Guides', link: '/rooting-guides/' },
        { text: 'FAQ', link: '/faqs' },
        { text: 'Community Help', link: '/resources' }
      ]
    }
  ],

  '/faqs': [
    {
      text: 'FAQ',
      items: [
        { text: 'Getting Started', link: '/faqs#getting-started' },
        { text: 'Technical Questions', link: '/faqs#technical-questions' },
        { text: 'Compatibility', link: '/faqs#compatibility' },
        { text: 'After Rooting', link: '/faqs#after-rooting' },
        { text: 'Community and Support', link: '/faqs#community-and-support' }
      ]
    },
    {
      text: 'Related',
      items: [
        { text: 'Back to Guides', link: '/rooting-guides/' },
        { text: 'Troubleshooting', link: '/troubleshooting' },
        { text: 'Resources', link: '/resources' }
      ]
    }
  ],

  '/resources': [
    {
      text: 'Resources',
      items: [
        { text: 'Core Tooling', link: '/resources#core-tooling' },
        { text: 'Learning and Reference', link: '/resources#learning-and-reference' },
        { text: 'Communities and Support', link: '/resources#communities-and-support' },
        { text: 'Firmware and Device Data', link: '/resources#firmware-and-device-data' },
        { text: 'Emergency and Recovery', link: '/resources#emergency-and-recovery' },
        { text: 'Advanced Engineering', link: '/resources#advanced-engineering' }
      ]
    },
    {
      text: 'Quick Links',
      items: [
        { text: 'Rooting Guides', link: '/rooting-guides/' },
        { text: 'Browse Apps', link: '/apps-and-modules/' },
        { text: 'FAQ', link: '/faqs' }
      ]
    }
  ],

  '/about': [
    {
      text: 'About',
      items: [
        { text: 'Overview', link: '/about' },
        { text: 'What the Project Covers', link: '/about#what-the-project-covers' },
        { text: 'Getting Started', link: '/about#getting-started' },
        { text: 'Community & Contributions', link: '/about#community-and-contributions' }
      ]
    },
    {
      text: 'Get Involved',
      items: [
        { text: 'Contribute', link: '/contributing' },
        { text: 'GitHub', link: 'https://github.com/awesome-android-root/awesome-android-root' }
      ]
    }
  ],

  '/contributing': [
    {
      text: 'Contributing',
      items: [
        { text: 'Add an App or Module', link: '/contributing#add-an-app-or-module' },
        { text: 'Entry Format', link: '/contributing#entry-format' },
        { text: 'Badges', link: '/contributing#badges' },
        { text: 'Quality Checklist', link: '/contributing#quality-checklist' },
        { text: 'Before Opening a PR', link: '/contributing#before-opening-a-pr' },
        { text: 'Other Contributions', link: '/contributing#other-contributions' }
      ]
    },
    {
      text: 'Resources',
      items: [
        { text: 'GitHub Issues', link: 'https://github.com/awesome-android-root/awesome-android-root/issues' },
        { text: 'Discussions', link: 'https://github.com/awesome-android-root/awesome-android-root/discussions' },
        { text: 'Project Home', link: '/' }
      ]
    }
  ],

  '/non-root-alternatives': [
    {
      text: 'Non-Root Alternatives',
      items: [
        { text: 'Overview', link: '/non-root-alternatives' },
        { text: 'Quick Assessment', link: '/non-root-alternatives#quick-assessment' },
        { text: 'Foundation Technologies', link: '/non-root-alternatives#foundation-technologies' },
        { text: 'Solutions by Need', link: '/non-root-alternatives#solutions-by-need' },
        { text: 'Non-Root Toolkit', link: '/non-root-alternatives#non-root-toolkit' },
        { text: 'Key ADB Commands', link: '/non-root-alternatives#key-adb-commands' },
        { text: 'Limitations', link: '/non-root-alternatives#limitations' },
        { text: 'Decision Guide', link: '/non-root-alternatives#decision-guide' },
        { text: 'Quick Start Guide', link: '/non-root-alternatives#quick-start-guide' },
        { text: 'Resources', link: '/non-root-alternatives#resources' }
      ]
    },
    {
      text: 'Related',
      items: [
        { text: 'Benefits vs Risks', link: '/rooting-guides/#benefits-vs-risks' },
        { text: 'Root Apps', link: '/apps-and-modules/' },
        { text: 'Home', link: '/' }
      ]
    }
  ],

  '/contact': STANDALONE_PAGE_SIDEBAR,
  '/privacy': STANDALONE_PAGE_SIDEBAR,
  '/legal-disclaimer': STANDALONE_PAGE_SIDEBAR,

  // Fallback sidebar for routes without a dedicated entry.
  // Keep this key last: VitePress keeps config order when route prefixes
  // match equally, so the standalone page entries above must be checked first.
  '/': [
    {
      text: 'Quick Start', icon: 'rocket',
      collapsed: false,
      items: [
        { text: 'What is Android Root?', link: '/rooting-guides/#understanding-root-access' },
        { text: 'Complete Rooting Guide', link: '/rooting-guides/' },
        { text: 'Browse All Apps & Modules', link: '/apps-and-modules/' },
        { text: 'Essential Must-Have Apps', link: '/apps-and-modules/#starter-kit-must-have-apps' }
      ]
    },
    {
      text: 'Root Methods', icon: 'trophy',
      collapsed: false,
      items: [
        { text: 'Compare Root Methods', icon: 'scale', link: '/rooting-guides/root-framework-comparison' },
        { text: 'Magisk (Recommended)', icon: 'medal', link: '/rooting-guides/magisk-guide' },
        { text: 'KernelSU', icon: 'zap', link: '/rooting-guides/kernelsu-guide' },
        { text: 'APatch', icon: 'bot', link: '/rooting-guides/apatch-guide' },
        { text: 'LSPosed Framework', icon: 'settings', link: '/rooting-guides/lsposed-guide' },
        { text: 'Temporary Root (No Unlock)', icon: 'ghost', link: '/rooting-guides/root-without-unlocking-bootloader' }
      ]
    },
    {
      text: 'Device Guides', icon: 'smartphone',
      collapsed: true,
      items: [
        { text: 'Google Pixel', icon: 'smartphone', link: '/rooting-guides/how-to-root-pixel-phone' },
        { text: 'Samsung Galaxy', icon: 'smartphone', link: '/rooting-guides/how-to-root-samsung-phone' },
        { text: 'Xiaomi/Redmi/POCO', icon: 'smartphone', link: '/rooting-guides/how-to-root-xiaomi-phone' },
        { text: 'OnePlus', icon: 'smartphone', link: '/rooting-guides/how-to-root-oneplus-phone' },
        { text: 'Nothing Phone', icon: 'smartphone', link: '/rooting-guides/how-to-root-nothing-phone' },
        { text: 'Motorola', icon: 'smartphone', link: '/rooting-guides/how-to-root-motorola-phone' },
        { text: 'View All Devices', icon: 'clipboard-list', link: '/rooting-guides/#device-specific-guides' }
      ]
    },
    {
      text: 'Help & Resources', icon: 'book-open',
      collapsed: true,
      items: [
        { text: 'Frequently Asked Questions', icon: 'circle-question-mark', link: '/faqs' },
        { text: 'Troubleshooting Guide', icon: 'wrench', link: '/troubleshooting' },
        { text: 'Rooting Glossary', icon: 'book-open', link: '/apps-and-modules/#glossary' },
        { text: 'Community Resources', icon: 'globe', link: '/resources' },
        { text: 'Non-Root Alternatives', icon: 'shuffle', link: '/non-root-alternatives' }
      ]
    }
  ]
})
