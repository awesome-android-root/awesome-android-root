/**
 * Single Starlight sidebar, ported from the VitePress per-route sidebars
 * (docs/.vitepress/config.mjs @ migrate/astro-starlight~1).
 *
 * VitePress displayed a different sidebar per route prefix; Starlight uses
 * one global sidebar. The sections below preserve the old labels, order,
 * nesting, links (including deep fragment links) and collapsed states, merged
 * without duplication. The per-page "on this page" TOCs that some old
 * sidebars repeated are provided natively by Starlight's right-hand table of
 * contents.
 *
 * This module is also consumed by the LLM export integration so llms.txt
 * groups stay in sync with the on-site navigation.
 */

export const sidebar = [
	{
		label: '🚀 Quick Start',
		collapsed: false,
		items: [
			{ label: 'What is Android Root?', link: '/rooting-guides#understanding-root-access' },
			{ label: 'Complete Rooting Guide', link: '/rooting-guides' },
			{ label: 'Browse All Apps & Modules', link: '/apps-and-modules' },
			{ label: 'Essential Must-Have Apps', link: '/apps-and-modules#starter-kit-must-have-apps' },
		],
	},
	{
		label: '🏆 Root Methods',
		collapsed: false,
		items: [
			{ label: '⚖️ Compare Root Methods', link: '/rooting-guides/root-framework-comparison' },
			{ label: '🏅 Magisk (Recommended)', link: '/rooting-guides/magisk-guide' },
			{ label: '⚡ KernelSU', link: '/rooting-guides/kernelsu-guide' },
			{ label: '🤖 APatch', link: '/rooting-guides/apatch-guide' },
			{ label: '⚙️ LSPosed Framework', link: '/rooting-guides/lsposed-guide' },
			{ label: '👻 Root Without Unlocking (GhostLock)', link: '/rooting-guides/root-without-unlocking-bootloader' },
		],
	},
	{
		label: '🔒 Locked-Bootloader Options',
		collapsed: true,
		items: [
			{ label: 'GhostLock Temporary Root', link: '/rooting-guides/root-without-unlocking-bootloader' },
			{ label: 'Bootloader Mods & Temp Root', link: '/rooting-guides/temporary-root-solutions' },
		],
	},
	{
		label: '🔧 Step-by-Step Process',
		collapsed: false,
		items: [
			{ label: '1️⃣ Unlock Bootloader', link: '/rooting-guides/how-to-unlock-bootloader' },
			{ label: '2️⃣ Install Custom Recovery', link: '/rooting-guides/how-to-install-custom-recovery' },
			{ label: '3️⃣ Root Your Device', link: '/rooting-guides#universal-rooting-process' },
			{ label: '4️⃣ Install LSPosed Framework', link: '/rooting-guides/lsposed-guide' },
			{ label: '5️⃣ Install Custom ROM (Optional)', link: '/rooting-guides/custom-rom-installation' },
		],
	},
	{
		label: '📱 Device Guides',
		collapsed: true,
		items: [
			{ label: '🔷 Google Pixel', link: '/rooting-guides/how-to-root-pixel-phone' },
			{ label: '🔷 Samsung Galaxy', link: '/rooting-guides/how-to-root-samsung-phone' },
			{ label: '🔷 Xiaomi/Redmi/POCO', link: '/rooting-guides/how-to-root-xiaomi-phone' },
			{ label: '🔷 OnePlus', link: '/rooting-guides/how-to-root-oneplus-phone' },
			{ label: '🔷 Nothing Phone', link: '/rooting-guides/how-to-root-nothing-phone' },
			{ label: '🔷 Motorola', link: '/rooting-guides/how-to-root-motorola-phone' },
			{ label: '📋 View All Devices', link: '/rooting-guides#device-specific-guides' },
		],
	},
	{
		label: '📚 Tutorials & Guides',
		collapsed: true,
		items: [
			{ label: 'All Tutorials', link: '/general-guides' },
			{ label: '🛡️ System-Wide Ad Blocking', link: '/general-guides/android-adblocking' },
			{ label: '📦 Debloat Your Device', link: '/general-guides/android-apps-debloating' },
			{ label: '⏹️ Stop Play Store Auto Updates', link: '/general-guides/stop-android-app-auto-updates-play-store' },
			{ label: '💾 Custom Recovery Installation', link: '/rooting-guides/how-to-install-custom-recovery' },
			{ label: '🔓 Unlock Bootloader', link: '/rooting-guides/how-to-unlock-bootloader' },
			{ label: '📲 Custom ROM Installation', link: '/rooting-guides/custom-rom-installation' },
			{ label: '👻 Bootloader Mods & Temp Root', link: '/rooting-guides/temporary-root-solutions' },
		],
	},
	{
		label: '⭐ Apps & Modules',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules' },
			{ label: '⭐ Must-Have Apps', link: '/apps-and-modules#starter-kit-must-have-apps' },
			{ label: '📘 Glossary & Badges', link: '/apps-and-modules#glossary' },
			{ label: '🛡️ Safety Checklist', link: '/apps-and-modules#safety-legal' },
		],
	},
	{
		label: '🛠️ Root Management',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/root-management' },
			{ label: 'Root Managers', link: '/apps-and-modules/root-management#root-managers' },
			{ label: 'Temporary Root (Locked Bootloader)', link: '/apps-and-modules/root-management#temporary-root-locked-bootloader' },
			{ label: 'Module Managers', link: '/apps-and-modules/root-management#module-managers' },
			{ label: 'Metamodules', link: '/apps-and-modules/root-management#metamodules' },
			{ label: 'LSPosed & Xposed', link: '/apps-and-modules/root-management#lsposed-xposed' },
			{ label: 'Zygisk', link: '/apps-and-modules/root-management#zygisk' },
			{ label: 'Root Hiding & Play Integrity', link: '/apps-and-modules/root-management#root-hiding-play-integrity' },
			{ label: 'Susfs', link: '/apps-and-modules/root-management#susfs' },
			{ label: 'Bootloop Protection', link: '/apps-and-modules/root-management#bootloop-protection' },
			{ label: 'Root Detection & Testing', link: '/apps-and-modules/root-management#root-detection-testing' },
		],
	},
	{
		label: '⚙️ System',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/system' },
			{ label: 'System Tweaks', link: '/apps-and-modules/system#system-tweaks' },
			{ label: 'VBMeta Mods', link: '/apps-and-modules/system#vbmeta-mods' },
			{ label: 'System UI & Framework', link: '/apps-and-modules/system#system-ui-framework' },
			{ label: 'AOSP (Android Open Source Project)', link: '/apps-and-modules/system#aosp-android-open-source-project' },
			{ label: 'ColorOS (Oppo)', link: '/apps-and-modules/system#coloros-oppo' },
			{ label: 'HyperOS (Xiaomi)', link: '/apps-and-modules/system#hyperos-xiaomi' },
			{ label: 'NothingOS', link: '/apps-and-modules/system#nothingos' },
			{ label: 'One UI (Samsung)', link: '/apps-and-modules/system#one-ui-samsung' },
			{ label: 'Onyx', link: '/apps-and-modules/system#onyx' },
			{ label: 'Oxygen OS (OnePlus)', link: '/apps-and-modules/system#oxygen-os-oneplus' },
			{ label: 'ZUI', link: '/apps-and-modules/system#zui' },
			{ label: 'Boot & Startup', link: '/apps-and-modules/system#boot-startup' },
			{ label: 'App & Package Management', link: '/apps-and-modules/system#app-package-management' },
			{ label: 'Permissions & AppOps', link: '/apps-and-modules/system#permissions-appops' },
			{ label: 'System Information & Diagnostics', link: '/apps-and-modules/system#system-information-diagnostics' },
		],
	},
	{
		label: '⚡ Performance & Battery',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/performance' },
			{ label: 'Performance Optimization', link: '/apps-and-modules/performance#performance-optimization' },
			{ label: 'Kernel Management', link: '/apps-and-modules/performance#kernel-management' },
			{ label: 'Memory & RAM', link: '/apps-and-modules/performance#memory-ram' },
			{ label: 'Battery Optimization', link: '/apps-and-modules/performance#battery-optimization' },
			{ label: 'Charging & Power', link: '/apps-and-modules/performance#charging-power' },
			{ label: 'Task & Process Management', link: '/apps-and-modules/performance#task-process-management' },
		],
	},
	{
		label: '🕵️ Privacy',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/privacy' },
			{ label: 'Privacy Tools', link: '/apps-and-modules/privacy#privacy-tools' },
			{ label: 'Device ID & Spoofing', link: '/apps-and-modules/privacy#device-id-spoofing' },
			{ label: 'App Isolation', link: '/apps-and-modules/privacy#app-isolation' },
			{ label: 'Location & GPS', link: '/apps-and-modules/privacy#location-gps' },
		],
	},
	{
		label: '🔐 Security',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/security' },
			{ label: 'Security Tools', link: '/apps-and-modules/security#security-tools' },
			{ label: 'Firewalls & Filtering', link: '/apps-and-modules/security#firewalls-filtering' },
		],
	},
	{
		label: '🚫 Ad Blocking',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/ad-blocking' },
			{ label: 'Ad & Tracker Blocking', link: '/apps-and-modules/ad-blocking#ad-tracker-blocking' },
			{ label: 'DNS & Network Filtering', link: '/apps-and-modules/ad-blocking#dns-network-filtering' },
		],
	},
	{
		label: '🧩 App Modifications',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/app-modifications' },
			{ label: 'App Patchers', link: '/apps-and-modules/app-modifications#app-patchers' },
			{ label: 'App Mods', link: '/apps-and-modules/app-modifications#app-mods' },
			{ label: 'Social Media Mods', link: '/apps-and-modules/app-modifications#social-media-mods' },
			{ label: 'Browser Mods', link: '/apps-and-modules/app-modifications#browser-mods' },
			{ label: 'YouTube & Media Mods', link: '/apps-and-modules/app-modifications#youtube-media-mods' },
			{ label: 'Signature & Verification', link: '/apps-and-modules/app-modifications#signature-verification' },
		],
	},
	{
		label: '🧹 Debloating',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/debloating' },{ label: 'Debloating Tools & Modules', link: '/apps-and-modules/debloating#debloating' }],
	},
	{
		label: '🗂️ File Management',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/file-management' },
			{ label: 'File Managers', link: '/apps-and-modules/file-management#file-managers' },
			{ label: 'Cleaning', link: '/apps-and-modules/file-management#cleaning' },
			{ label: 'File & Partition Tools', link: '/apps-and-modules/file-management#file-partition-tools' },
		],
	},
	{
		label: '💾 Backup & Restore',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/backup' },{ label: 'Backup & Restore', link: '/apps-and-modules/backup#backup-restore' }],
	},
	{
		label: '🎨 Customization',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/customization' },
			{ label: 'Themes & Visual Mods', link: '/apps-and-modules/customization#themes-visual-mods' },
			{ label: 'Launchers & Home Screen', link: '/apps-and-modules/customization#launchers-home-screen' },
			{ label: 'Status Bar & Navigation', link: '/apps-and-modules/customization#status-bar-navigation' },
			{ label: 'Gestures & Controls', link: '/apps-and-modules/customization#gestures-controls' },
			{ label: 'Fonts & Emojis', link: '/apps-and-modules/customization#fonts-emojis' },
			{ label: 'Notifications', link: '/apps-and-modules/customization#notifications' },
			{ label: 'Lockscreen & AOD', link: '/apps-and-modules/customization#lockscreen-aod' },
			{ label: 'Screen & Display', link: '/apps-and-modules/customization#screen-display' },
		],
	},
	{
		label: '🎵 Audio',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/audio' },
			{ label: 'Audio Enhancement', link: '/apps-and-modules/audio#audio-enhancement' },
			{ label: 'Audio Control', link: '/apps-and-modules/audio#audio-control' },
			{ label: 'Audio Effects', link: '/apps-and-modules/audio#audio-effects' },
		],
	},
	{
		label: '🌐 Networking',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/networking' },
			{ label: 'VPN & Proxy', link: '/apps-and-modules/networking#vpn-proxy' },
			{ label: 'Network Tools', link: '/apps-and-modules/networking#network-tools' },
			{ label: 'Wi-Fi & Mobile Data', link: '/apps-and-modules/networking#wi-fi-mobile-data' },
			{ label: 'Bluetooth & NFC', link: '/apps-and-modules/networking#bluetooth-nfc' },
		],
	},
	{
		label: '🎮 Gaming',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/gaming' },
			{ label: 'Gaming Optimization', link: '/apps-and-modules/gaming#gaming-optimization' },
			{ label: 'Game Modifications & Tools', link: '/apps-and-modules/gaming#game-modifications-tools' },
		],
	},
	{
		label: '🧑‍💻 Development & Automation',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/development' },
			{ label: 'Terminal & Shell', link: '/apps-and-modules/development#terminal-shell' },
			{ label: 'ADB & Debugging', link: '/apps-and-modules/development#adb-debugging' },
			{ label: 'Developer Tools', link: '/apps-and-modules/development#developer-tools' },
			{ label: 'Linux Environments', link: '/apps-and-modules/development#linux-environments' },
			{ label: 'Automation', link: '/apps-and-modules/development#automation' },
			{ label: 'Hardware & Sensors', link: '/apps-and-modules/development#hardware-sensors' },
		],
	},
	{
		label: '🧰 General Utilities',
		collapsed: true,
		items: [
			{ label: 'Overview', link: '/apps-and-modules/utilities' },
			{ label: 'Sync & File Transfer', link: '/apps-and-modules/utilities#sync-file-transfer' },
			{ label: 'Reboot & Power', link: '/apps-and-modules/utilities#reboot-power' },
			{ label: 'Sharing & Intent Tools', link: '/apps-and-modules/utilities#sharing-intent-tools' },
			{ label: 'Communication & Messaging', link: '/apps-and-modules/utilities#communication-messaging' },
			{ label: 'General Toolboxes', link: '/apps-and-modules/utilities#general-toolboxes' },
		],
	},
	{
		label: '📖 Help & Resources',
		collapsed: true,
		items: [
			{ label: '❓ Frequently Asked Questions', link: '/faqs' },
			{ label: '🔧 Troubleshooting Guide', link: '/troubleshooting' },
			{ label: '📖 Rooting Glossary', link: '/apps-and-modules#glossary' },
			{ label: '🌐 Community Resources', link: '/resources' },
			{ label: '🔀 Non-Root Alternatives', link: '/non-root-alternatives' },
			{ label: 'ℹ️ About the Project', link: '/about' },
			{ label: '🤝 Contributing', link: '/contributing' },
			{ label: '⚖️ Legal Disclaimer', link: '/legal-disclaimer' },
		],
	},
];
