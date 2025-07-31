<div align="center" class="aar-intro">

# Awesome Android Root
🛡️ ***The ultimate hub for Android Rooting***

Community-curated Ultimate collection of best root apps, **Magisk**, **KernelSU** & **LSPosed(Xposed)** modules and how to **rooting guides** for Android customization, performance enhancement, debloating and system optimization.

---

[![GitHub Repo stars](https://img.shields.io/github/stars/awesome-android-root/awesome-android-root?logo=github&style=for-the-badge&color=green)](https://github.com/awesome-android-root/awesome-android-root?ref=awesome-root.org)
[![Total Entries](https://img.shields.io/badge/Total%20Entries-330+-blue?style=for-the-badge&logo=android)](#root-apps)
[![Support via Open Collective](https://img.shields.io/badge/Support%20via-Open%20Collective-blue?style=for-the-badge&logo=opencollective)](https://opencollective.com/awesome-android-root-official)

🚀 Quick Links: [**New to Root?**](#what-is-root-access) | [**Root Apps**](#root-apps) | [**Android Guides**](#essential-android-guides) | [**Full Index**](#table-of-contents) | [**Community**](#community--resources)


</div>

## Table of Contents
<details>
<summary>👉 Tap to expand navigation</summary>

### 📚 Getting Started
- [What is Root Access?](#what-is-root-access)
- [Root Guide and Solutions](#root-guide-and-solutions)
  - [Device-Specific Root Guides](#device-specific-root-guides)
- [Essential Android Guides](#essential-android-guides)
- [Glossary](#glossary)

### 📱 Root Apps
#### 🚫 Ad & Content Blocking
- [Ad Blocking](#ad-blocking)

#### 📦 App Management & Control
- [App Management](#app-management)
  - [App Isolation and Cloning](#app-isolation-and-cloning)
  - [App Managers](#app-managers)
  - [App Markets](#app-markets)
  - [App Permissions](#app-permissions)

#### 🔧 App Modifications
- [App Mods](#app-mods)
  - [Social Media Mods](#social-media-mods)
    - [Bilibili](#bilibili) • [Discord](#discord) • [Duolingo](#duolingo) • [Grindr](#grindr)
    - [Instagram](#instagram) • [Reddit](#reddit) • [QQ](#qq)
    - [WeChat](#wechat) • [Weibo](#weibo) • [WhatsApp](#whatsapp) 
    - [X/Twitter](#xtwitter) • [TikTok](#tiktok) • [Telegram](#telegram)
    - [YouTube, Spotify, Google Photos](#youtube-spotify-google-photos)
  - [Other App Mods](#other-app-mods)
  - [Patching](#patching)

#### 🎵 Audio & Media
- [Audio Enhancement](#audio-enhancement)

#### ⚡ System & Performance
- [Automation](#automation)
- [Battery Management](#battery-management)
- [Performance Improvements](#performance-improvements)

#### 🗂️ Data & Storage
- [Backup and Restore](#backup-and-restore)
- [Cleaning Apps](#cleaning-apps)
- [File Management](#file-management)

#### 📞 Communication
- [Communication Tools](#communication-tools)
  - [Call Recorders](#call-recorders)
  - [Contacts](#contacts)
  - [SMS](#sms)

#### 🎨 Customization & Theming
- [Customizations](#customizations)
  - [Boot Animations](#boot-animations)
  - [Fonts](#fonts)
  - [Launchers](#launchers)
  - [Navigation](#navigation)
  - [OS Customizations](#os-customizations)
    - [AOSP](#aosp-android-open-source-project) • [ColorOS](#coloros-oppo) • [Global](#global)
    - [HyperOS](#hyperos-xiaomi) • [One UI](#one-ui-samsung) • [Onyx](#onyx)
    - [Oxygen OS](#oxygen-os-oneplus)
  - [Theming](#theming)

#### 🧹 System Optimization
- [Debloating](#debloating)
- [Kernel Management](#kernel-management)
- [System Modifications](#system-modifications)

#### 🛠️ Development & Tools
- [Development and Debugging](#development-and-debugging)
- [Device Control and Hardware](#device-control-and-hardware)
- [Terminal & Shell Environments](#terminal--shell-environments)
- [Tools](#tools)

#### 🌐 Network & Connectivity
- [Location and GPS](#location-and-gps)
- [Network Tools](#network-tools)
- [NFC Tools](#nfc-tools)

#### 🛡️ Security & Privacy
- [Privacy and Security](#privacy-and-security)
- [ReVanced](#revanced)

#### 🔓 Root Management
- [Root Management](#root-management)
  - [Managers](#managers)
  - [Root Hiding & Integrity](#root-hiding--integrity)
  - [Root Detection](#root-detection)
  - [Bootloop Protection](#bootloop-protection)

#### 📺 Display & Interface
- [Screen and Display](#screen-and-display)

### 📖 Resources & Help
- [Essential Android Guides](#essential-android-guides)
- [Important Notes](#important-notes)
- [FAQ & Troubleshooting](#faqs)
- [About This Project](./docs/about.md)
- [Community & Resources](#community--resources)
- [Contributing](#contributing)
- [Stats](#stats)
- [Support](#support-this-project)

</details>

## What is Root Access?

Android rooting gives you **privileged administrative control** over your device's subsystems - essentially becoming the "superuser" of your own device, similar to having administrator rights on a computer.

### Why Root Your Android Device?
- 🔓 **Freedom & Control** - Remove restrictions and customize everything
- ⚡ **Enhanced Performance** - Optimize system performance and battery life
- 🛡️ **Advanced Security & Privacy** - Control app permissions and data access
- 🎨 **Complete Customization** - Themes, system modifications, and UI changes

### ⚠️ Important Considerations

> **🚨 Warning**: Rooting **voids your warranty** and carries risks including potential bootloops, security vulnerabilities, and inability to receive OTA updates. Always research your specific device and backup your data before proceeding.

<details>
<summary><strong>📝 Essential Prerequisites Checklist</strong></summary>

- ✅ **Backup all important data** (photos, contacts, apps)
- ✅ **Verify device compatibility** with rooting methods
- ✅ **Research device-specific instructions** thoroughly
- ✅ **Download necessary tools and drivers** beforehand
- ✅ **Ensure sufficient battery charge** (70%+)
- ✅ **Enable Developer Options** and USB Debugging
- ✅ **Have recovery plan ready** in case something goes wrong

</details>

## Root Guide and Solutions


### Step-by-Step Process

1. **[🔓 Unlock Bootloader](./docs/android-root-guides/how-to-unlock-bootloader.md)** - Essential first step for all modifications

2. **[🛠️ Install Custom Recovery](./docs/android-root-guides/how-to-install-custom-recovery.md)** - TWRP, OrangeFox, or SKYHAWK recovery

3. **[⚡ Root Your Device](./docs/android-root-guides/index.md#root-methods-comparison)** - Choose your method:
   - **[Magisk](./docs/android-root-guides/magisk-guide.md)** - Most popular, systemless root with modules
   - **[KernelSU](./docs/android-root-guides/kernelsu-guide.md)** - Kernel-level root solution
   - **[APatch](./docs/android-root-guides/apatch-guide.md)** - Alternative root method

4. **[🌟 Install Custom ROM](./docs/android-root-guides/custom-rom-installation.md)** _(Optional)_ - Transform your Android experience

### Device-Specific Root Guides
Choose your device for tailored rooting instructions:
- **[📱 Google Pixel](./docs/android-root-guides/how-to-root-pixel-phone.md)** - Comprehensive Pixel rooting guide
- **[📱 Samsung Galaxy](./docs/android-root-guides/how-to-root-samsung-phone.md)** - Navigate Samsung's Knox security
- **[📱 Xiaomi/MIUI](./docs/android-root-guides/how-to-root-xiaomi-phone.md)** - Handle MIUI-specific challenges
- **[📱 OnePlus](./docs/android-root-guides/how-to-root-oneplus-phone.md)** - OxygenOS rooting walkthrough
- **[📱 Nothing Phone](./docs/android-root-guides/how-to-root-nothing-phone.md)** - Root the transparent revolution
- **[📱 Motorola](./docs/android-root-guides/how-to-root-motorola-phone.md)** - Motorola-specific root methods

**[📖 Read the Complete Rooting Master Guide →](./docs/android-root-guides/index.md)**

## Glossary
- **⭐** = Community recommended (most popular/trusted in category)
- **`FOSS`** = Free and Open Source Software (source code available)
- **`Proprietary`** = Closed-source software or unclear licensing
- **`[M]`** = Magisk Module (requires [_Magisk framework_](./docs/android-root-guides/magisk-guide.md))
- **`[K]`** = KernelSU Module (requires [_KernelSU framework_](./docs/android-root-guides/kernelsu-guide.md)) 
- **`[LSP]`** = LSPosed Module (requires [_LSPosed framework_](./docs/android-root-guides/lsposed-guide.md))

> _Apps are organized in alphabetical order within each category._

## Root Apps

> - **We Strongly recommend to install *[Droid-ify](https://github.com/Droid-ify/client/releases)* for private and easier app install from this list.**

> - Clicking on the app name directs to F-Droid(FOSS) or Google Play Store(Proprietary) app page.
> - If an app is available both on F-Droid & Google Play Store, **F-Droid link will be prefered**.


### Featured Apps: The Essentials

If you've just rooted your device, start with these must-have applications. They form the foundation of a great root experience.

| App | Category | Why it's essential |
| :--- | :--- | :--- |
| **[Magisk](https://github.com/topjohnwu/Magisk)** | Root Management | The standard for systemless rooting, managing permissions, and installing modules. |
| **[MiXplorer](https://mixplorer.com/)** | File Management | The most powerful file manager for Android, with full root access capabilities. |
| **[Neo Backup](https://github.com/NeoApplications/Neo-Backup)** | Backup & Restore | An open-source powerhouse for backing up your apps, data, and settings. |
| **[AdAway](https://adaway.org/)** | Ad Blocking | The classic, open-source ad blocker that uses the hosts file for system-wide blocking. |
| **[App Manager](https://github.com/MuntashirAkon/AppManager)** | App Control | A feature-packed tool to inspect, manage, and control every app on your device. |
| **[SD Maid SE](https://github.com/d4rken-org/sdmaid-se)** | System Cleaning | The best tool for cleaning up leftover files and keeping your system tidy. |

[↑ Back to top](#table-of-contents)

---

## Essential Android Guides

Beyond rooting, master these essential Android techniques for better device management and optimization:

### 🚫 Privacy & Security Guides
- **[Android Ad Blocking Guide](./docs/guides/android-adblocking.md)** - Complete guide to blocking ads across your Android device
- **[Android App Debloating](./docs/guides/android-apps-debloating.md)** - Remove bloatware and optimize your device performance
- **[Stop Auto-Updates in Play Store](./docs/guides/stop-android-app-auto-updates-play-store.md)** - Take control of app updates

### 💾 Data Management Guides  
- **[App Backup & Restore Using Root](./docs/guides/app-backup-restore-using-root.md)** - Comprehensive backup solutions for rooted devices

**[📖 View All General Android Guides →](./docs/guides/index.md)**

> 💡 **New to Android Rooting?** Start with our [complete rooting guide](./docs/android-root-guides/index.md) before exploring the apps below.

-----

### Ad Blocking
> 📚 **Related Guide**: [Complete Android Ad Blocking Tutorial](./docs/guides/android-adblocking.md)

- **[⭐ AdAway](https://f-droid.org/packages/org.adaway/)** - Open-source ad blocker using hosts file. `FOSS` | [📦 Source](https://github.com/AdAway/AdAway)
- **[AdClose](https://github.com/Xposed-Modules-Repo/com.close.hook.ads/)** - Prevents the initial loading of the advertising SDK within the application and intercepts application advertising requests to block ads. `Proprietary` `[LSP]`
- **[AdGuard](https://adguard.com/en/adguard-android/overview.html)** - Comprehensive ad blocking solution. `Proprietary`
- **[bindhosts](https://github.com/bindhosts/bindhosts)** - Systemless hosts for APatch, KernelSU and Magisk that is fully standalone & self-updating. `FOSS` `[M]` `[K]`
- **[BlockAds](https://github.com/pantsufan/BlockAds)** - BlockAds is an advertisement blocking Magisk module. `FOSS` `[M]`
- **[Blokada](https://blokada.org/)** - Advanced ad blocker with VPN functionality. `Proprietary`
- **[Cubic-AdBlock](https://github.com/Vaz15k/Cubic-AdBlock)** - A simple AdBlock module based on the hosts file. `FOSS` `[M]`
- **[F*ck AD](https://github.com/hujiayucc/Fuck-AD)** - As the name implies, this is an ad-blocking Xposed module. `FOSS` `[LSP]`
- **[Magical Protection](https://github.com/programminghoch10/MagicalProtection)** - Magisk-only completely systemless adblocking. `FOSS` `[M]`
- **[Magisk Ad Blocking Module](https://github.com/pantsufan/Magisk-Ad-Blocking-Module)** - Magisk module to block ads on android. `FOSS` `[M]`
- **[Re-Malwack](https://github.com/Magisk-Modules-Alt-Repo/Re-Malwack)** - A fully-fledged ad-block module. Contains all your needs ✨ `FOSS` `[M]`
- **[StevenBlock](https://github.com/mikropsoft/StevenBlock)** - Ad Blocking Module for Android supporting Magisk, KernelSU & APatch. `FOSS` `[M]`
- **[systemless-adblocker](https://github.com/Magisk-Modules-Alt-Repo/systemless-adblocker)** - Ultimate adblocker module derived from gloeyisk/systemless-hosts. `FOSS` `[M]`
- **[Systemless hosts KernelSU module](https://github.com/symbuzzer/systemless-hosts-KernelSU-module)** - Required module to use applications such as AdAway on KernelSU and APatch. `FOSS` `[K]`

[↑ Back to top](#table-of-contents)

---

### App Management
#### App Isolation and Cloning
- **[Insular](https://f-droid.org/packages/com.oasisfeng.island.fdroid)** - Isolate your big brother app. A fork based on the excellent Island. `FOSS` | [📦 Source](https://gitlab.com/secure-system/Insular)
- **[Island](https://play.google.com/store/apps/details?id=com.oasisfeng.island)** - App isolation and cloning. `FOSS` | [📦 Source](https://github.com/oasisfeng/island/tree/dev)
- **[Shelter](https://f-droid.org/app/net.typeblog.shelter)** - Isolate and clone apps. `FOSS` | [📦 Source](https://gitea.angry.im/PeterCxy/Shelter)

#### App Managers
- **[⭐ App Manager](https://github.com/MuntashirAkon/AppManager)** - A full-featured package manager and viewer for Android. `FOSS` | [📦 Source](https://github.com/MuntashirAkon/AppManager)
- **[App Manager](https://play.google.com/store/apps/details?id=com.lb.app_manager)** - A feature rich app manager with batch operation support. `Proprietary`
- **[AppOps](https://play.google.com/store/apps/details?id=rikka.appops)** - Control the hidden appops conveniently. `Proprietary`
- **[BanUninstall](https://github.com/TinyHai/BanUninstall/)** - A Xposed Module that prevents apps be uninstalled or apps' data be cleared. `FOSS` `[LSP]`
- **[⭐ Hail](https://f-droid.org/packages/com.aistra.hail/)** - Disable / Hide / Suspend / Uninstall Android apps. `FOSS` | [📦 Source](https://github.com/aistra0528/Hail)
- **[Ice Box](https://play.google.com/store/apps/details?id=com.catchingnow.icebox)** - Freeze and hide apps rarely used. `Proprietary`
- **[Inure](https://play.google.com/store/apps/details?id=app.simple.inure.play)** - An elegant and beautiful premium Android app manager for rooted and non-rooted devices. `FOSS` | [📦 Source](https://github.com/Hamza417/Inure)
- **[Let Me Downgrade](https://github.com/DavidBerdik/Let-Me-Downgrade)** - Add support for downgrading apps on Android 12 through 15 QPR1. `FOSS` `[LSP]`
- **[Package Manager](https://f-droid.org/packages/com.smartpack.packagemanager)** - A highly powerful app to manage both system and user apps installed on an Android device. `FOSS` | [📦 Source](https://github.com/SmartPack/PackageManager)
- **[Thor](https://play.google.com/store/apps/details?id=com.valhalla.thor)** - Android App Manager and App Installer utility. `FOSS` | [📦 Source](https://github.com/SmartPack/PackageManager)
- **[Update Locker](https://github.com/Xposed-Modules-Repo/ru.mike.updatelocker/)** - Block updates (and auto-updates) selected apps via popular markets including Google Play Market, Huawei AppGallery & Samsung Galaxy Store.
- **[⭐ Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Zygisk module to detach installed apps from Play Store, hooking binder. `FOSS` `[M]` → [📖 Setup Guide](./docs/guides/stop-android-app-auto-updates-play-store.md)


#### App Markets
- **[Aurora Store](https://f-droid.org/packages/com.aurora.store/)** - A Google Play Store client to search, view app details, and download APKs directly to your device. `FOSS` | [📦 Source](https://github.com/whyorean/AuroraStore)
- **[⭐ Droid-ify](https://f-droid.org/packages/com.looker.droidify)** - F-Droid client with Material UI and auto updating apps using root. `FOSS` | [📦 Source](https://github.com/Droid-ify/client)
- **[Neo Store](https://github.com/NeoApplications/Neo-Store)** - An F-Droid client with modern UI and an arsenal of extra features. `FOSS` | [📦 Source](https://github.com/NeoApplications/Neo-Store)

#### App Permissions
- **[Net Switch](https://github.com/Rem01Gaming/net-switch)** - Magisk Module to isolate any app from Internet access. `FOSS` `[M]`
- **[Permission Ruler](https://play.google.com/store/apps/details?id=com.stefanosiano.permissionruler&hl=en)** - Automatically manages app permissions when the screen is off for enhanced privacy. `Proprietary`
- **[PermissionManagerX](https://f-droid.org/packages/com.mirfatif.permissionmanagerx)** - eXtended Permission Manager for Android to view and set Manifest Permissions and AppOps. `FOSS` | [📦 Source](https://github.com/mirfatif/PermissionManagerX)
- **[Thanox](https://apt.izzysoft.de/fdroid/index/apk/github.tornaco.android.thanos)** - A system management tool that provide convenient functions like application startup management, background management, permission management etc. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

---

### App Mods

#### Social Media Mods
##### Bilibili
- **[MBGA](https://github.com/cledwynl/mbga/)** - A Xposed module to Make Bilibili Great Again. `FOSS` `[LSP]`

##### Discord
- **[BunnyXposed](https://github.com/bunny-mod/BunnyXposed)** - An Xposed module to inject Bunny, a mod for Discord's mobile apps. `FOSS` `[M]`
- **[Revenge](https://github.com/revenge-mod/revenge-bundle-next)** - Revenge is a client modification for Discord Android. `FOSS`

##### Duolingo
- **[Duolingo Regret](https://github.com/TigerBeanst/Duolingo-Regret)** - Change Duolingo's time zone to any arbitrary time zone, makes it easier to go back and finish forgotten streaks. `FOSS` `[LSP]`

##### Grindr
- **[Grindr Plus](https://github.com/R0rt1z2/GrindrPlus)** - Unlocks and adds unique features to the Grindr app, enhancing user experience. `FOSS` `[LSP]` 

##### Reddit
- **[Reddidn’t](https://modules.lsposed.org/module/com.wizpizz.reddidnt/)** - Dynamically finds methods within the Reddit app responsible for displaying ads and blocks them. `Proprietary` `[LSP]`

##### Instagram
- **[⭐ InstaEclipse](https://github.com/ReSo7200/InstaEclipse/)** - Adds Features like Developer Options, Ghost Mode, Ad-Free browsing, and Distraction-Free Mode to Instagram. `FOSS` `[LSP]`

##### Line
- **[LineXtra](https://github.com/yagiyuu/LineXtra)** - Removes Ads and Tabs from the LINE. `FOSS` `[LSP]`

##### Maps
- **[Maps Tweaks](https://github.com/Xposed-Modules-Repo/ru.mike.mapstweaks)** - Collection of maps UI tweaks for Google Maps, Yandex Maps and Yandex Navi. `Proprietary` `[LSP]`
- **[Yandex Maps Patcher](https://github.com/Xposed-Modules-Repo/ru.bluecat.yandexmapspatcher)** - Hides ads and intrusive services in the Yandex Maps app. `Proprietary` `[LSP]`


##### QQ
- **[NewQStory](https://github.com/Xposed-Modules-Repo/lin.xposed/)** - Xposed QQ module. `Proprietary` `[LSP]`
- **[QAuxiliary](https://github.com/cinit/QAuxiliary)** - Xposed module based on QNotified. `FOSS` `[LSP]`
- **[TCQT Module](https://github.com/callng/TCQT)** - An Xposed module designed for Android QQ/TIM clients, which is used to intercept and retain messages that would otherwise be "retracted". `FOSS` `[LSP]`
- **[XAutoDaily](github.com/LuckyPray/XAutoDaily)** - Various tweaks for QQ. `FOSS` `[LSP]`

##### TikTok
- **[TikTok Tracker Blocks Magisk Module](https://github.com/Scott-Nx/TikTok-Tracker-Blocks_Magisk)** - A simple Magisk module to block TikTok tracking domains on Android devices. `FOSS` `[M]`

##### Telegram
- **[Re-Telegram](https://github.com/Sakion-Team/Re-Telegram/)** - Adds features like AntiAntiForward, AntiRecall, NoSponsoredMessages, ProhibitChannelSwitching and many more to various Telegram clients. `FOSS` `[LSP]`
- **[Telegram Speed Hook](https://github.com/araafroyall/Telegram-Speed-Hook)** - An Xposed Module to increase Telegram speed. `FOSS` `[LSP]`
- **[Telegram Tweaks](https://github.com/Xposed-Modules-Repo/ru.mike.sidestories)** - Remove action bar stories in the Telegram messenger (+block unmute button). `Proprietary` `[LSP]`
- **[TeleVip](https://github.com/Xposed-Modules-Repo/com.my.televip/)** - A module for modifying Telegram with hide seen status, unlocking channel restrictions etc. `Proprietary` `[LSP]`
- **[TMoe](https://github.com/cinit/TMoe)** - Adds various tweaks to various Telegram clients. `FOSS` `[LSP]`

##### WeChat
- **[MaskWechat](https://github.com/Mingyueyixi/MaskWechat)** - A WeChat Xposed module that can hide the chat records of specific users to prevent private chats from being peeked by third parties. `FOSS` `[LSP]`
- **[NewMiko](https://modules.lsposed.org/module/im.mingxi.miko/)** - Various tweaks related to  WeChat app. `Proprietary` `[LSP]`
- **[WeChat Auxiliary](https://github.com/HdShare/WAuxiliary_Public)** - Various tweaks for WeChat. `Proprietary` `[LSP]`
- **[X](https://github.com/Xposed-Modules-Repo/cn.android.x)** - Add extra features to WeChat. `Proprietary` `[LSP]`

##### Weibo
- **[WeiboHelper](https://github.com/Xposed-Modules-Repo/com.skyhand.sinahelper)** - Remove all available advertisements and recommendations from Weibo. `Proprietary` `[LSP]`

##### WhatsApp
- **[⭐ WA Enhancer](https://github.com/Dev4Mod/WaEnhancer)** - A Xposed module that enhances your WhatsApp experience. `FOSS` `[LSP]`
- **[WA Revamp](https://github.com/Xposed-Modules-Repo/its.madruga.warevamp)** - Add various functions like download status and view once, hide read messages, statuses and archived chats to official WhatsApp. `Proprietary` `[LSP]`

##### X/Twitter
- **[Hachidori](https://github.com/Xposed-Modules-Repo/com.twifucker.hachidori/)** - Adds downloading media, hiding ads and other privacy features to X (formerly Twitter). `Proprietary` `[LSP]`

##### YouTube, Spotify, Google Photos
- **[RevancedXposed](https://github.com/chsbuffer/RevancedXposed)** - YouTube, Spotify & YT Music block ads and background playback, Google Photos unlimited backup Xposed module. `FOSS` `[LSP]`
- **[XposedPhotosFix](https://github.com/RevealedSoulEven/XposedPhotosFIX)** - Prevents Google Photos app from merging all folders in Camera folder and creates separate albums for each folder, useful for backup. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

#### Other App Mods
- **[⭐ ChromeXt](https://github.com/JingMatrix/ChromeXt)** - UserScript and DevTools support for Chromium-based and WebView-based browsers. `FOSS` `[LSP]`
- **[Freely module](https://modules.lsposed.org/module/me.build/)** - Compatible with mainstream social and short video applications (such as WeChat, Tik Tok, Soul, etc.), and is designed to improve the user experience and functional freedom. `Proprietary` `[LSP]`
- **[F*ck for VIP](https://github.com/bug-bit/fckvip)** - A module to unlock some software memberships and remove ads. Check releases section for list of supported apps. `Proprietary` `[LSP]`
- **[Keyboard GPT](https://github.com/Mino260806/KeyboardGPT)** - Lets you integrate Generative AI like ChatGPT in keyboard. `FOSS` `[LSP]`
- **[NewHookVip](https://github.com/Xposed-Modules-Repo/top.hookvip.pro)** - Xposed module for unlocking some app memberships and adding some extended functions. Check releases section for list of supported apps. `Proprietary` `[LSP]`
- **[Rboard Theme Manager](https://github.com/DerTyp7214/RboardThemeManagerV3)** - A customizable manager app for Google Gboard that allows users to download, apply, and manage various themes and sound settings. `FOSS` `[LSP]`
- **[Smule Mod](https://github.com/michei69/SmuleXposed)** - A Smule Xposed module which enables free VIP and many other features. `FOSS` `[LSP]`
- **[Wallet Tweaks](https://github.com/Xposed-Modules-Repo/ru.mike.wallettweaks/releases)** - UI tweaks for Google Wallet. `Proprietary` `[LSP]`


#### Patching
- **[Lucky Patcher](https://www.luckypatchers.com/)** - App patcher and modifier (use with caution). `Proprietary`

[↑ Back to top](#table-of-contents)

---

### Audio Enhancement
- **[Audio Modification Library Ryuki Mod](https://github.com/reiryuki/Audio-Modification-Library-Ryuki-Mod-Magisk-Module)** - Enables supported audio mods to share the same needed files sudo as audio_effects. `FOSS` `[M]`
- **[Audio jitter silencer](https://github.com/Magisk-Modules-Alt-Repo/audio-jitter-silencer)** - For avoiding distortion on all digital audio outputs, it disables audio jitter generators (w.r.t. battery draining & optimizations, and wireless connectivity). `FOSS` `[M]`
- **[Audio Misc Settings](https://github.com/Magisk-Modules-Alt-Repo/audio-misc-settings)** - For setting miscellaneous audio configuration values (media audio volume steps (100 steps), raising the resampling quality, disabling the effects framework, etc.) `FOSS` `[M]`
- **[Audio SampleRate Changer](https://github.com/Magisk-Modules-Alt-Repo/audio-samplerate-changer)** - A Magisk module changing audio sample rates at the system-wide mixer for the best Hi-Fi experience. `FOSS` `[M]`
- **[DisableAudioFocus](https://github.com/auag0/DisableAudioFocus)** - Allows you to disable audio focus, enabling you to play multiple videos and audios simultaneously. `FOSS` `[LSP]`
- **[Hi-Res Audio Enabler](https://github.com/reiryuki/Hi-Res-Audio-Enabler-Magisk-Module)** - Enables high resolution 24 or 32-bit width audio output if device is supported. `FOSS` `[M]`
- **[JamesDSP](https://github.com/james34602/JamesDSPManager)** - Audio DSP effects build on Android system framework layer. This is a repository contains a pack of high quality DSP algorithms specialized for audio processing. `FOSS` `[M]`
- **[NLSound](https://github.com/Briclyaz/NLSound_module_QCom)** - Magisk module for improving audio and microphone quality in your Snapdragon SoC device. `FOSS` `[M]`
- **[ViPER4Android FX Redesign](https://github.com/WSTxda/ViperFX-RE-Releases)** - Allows improving the audio quality by offering features such as equalizer settings, surround sound effects, bass boost, and more. `Proprietary` `[M]`
- **[ViPER4AndroidRepackaged](https://github.com/programminghoch10/ViPER4AndroidRepackaged)** - Contains many useability enhancements and all the major fixes needed to run ViPER4Android on modern ROMs effortlessly. `FOSS` `[M]`
- **[XAudioCapture](https://github.com/Xposed-Modules-Repo/io.github.wzhy.xaudiocapture)** - Lets you capture any audio stream you desire, bypassing these restrictions. `Proprietary` `[LSP]`

---

### Automation
- **[Automate](https://play.google.com/store/apps/details?id=com.llamalab.automate)** - Lets you create custom automation workflows using flowcharts, enabling seamless management of tasks, files, and device settings. `Proprietary`
- **[⭐ MacroDroid](https://play.google.com/store/search?q=macrodroid&c=apps)** - Easy to use automation app. `Proprietary`
- **[Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)** - An advanced and powerful automation app. `Proprietary`

[↑ Back to top](#table-of-contents)

---

### Backup and Restore
> 📚 **Related Guide**: [App Backup & Restore Using Root](./docs/guides/app-backup-restore-using-root.md)

- **[DataBackup](https://f-droid.org/zh_Hans/packages/com.xayah.databackup.foss/)** - DataBackup for Android 7.0+. `FOSS` | [📦 Source](https://github.com/XayahSuSuSu/Android-DataBackup)
- **[DiskDigger](https://play.google.com/store/apps/details?id=com.defianttech.diskdigger)** - A powerful data recovery tool for Android devices. `Proprietary`
- **[Dumpster: Photo/Video Recovery](https://play.google.com/store/apps/details?id=com.baloota.dumpster)** - You can recover deleted videos, restore photos, undelete recently deleted apps, and other files. `Proprietary`
- **[Neo Backup](https://f-droid.org/packages/com.machiav3lli.backup/)** - Powerful open-source backup solution. `FOSS` | [📦 Source](https://github.com/NeoApplications/Neo-Backup)
- **[Swift Backup](https://play.google.com/store/apps/details?id=org.swiftapps.swiftbackup)** - Modern backup solution with cloud support. `Proprietary`

[↑ Back to top](#table-of-contents)

---

### Battery Management
- **[AccA](https://github.com/VR-25/acc)** - Advanced Charging Controller app. `FOSS`
- **[Background App Slayer (BAS)](https://github.com/UNKNUW/Background-App-Slayer)** - Automatic Killing Background apps. `FOSS` `[M]`
- **[Battery Guru](https://play.google.com/store/apps/details?id=com.paget96.batteryguru)** - Battery optimization and monitoring. `Proprietary`
- **[Drowser](https://gitlab.com/juanitobananas/drowser)** - Drowser is a simple app that kills the apps you select when the screen turns off. `FOSS` | [📦 Source](https://gitlab.com/juanitobananas/drowser)
- **[EnforceDoze](https://f-droid.org/packages/com.akylas.enforcedoze/)** - Enable Doze mode immediately after screen off and turn off motion sensing to get best battery life. `FOSS`  | [📦 Source](https://github.com/farfromrefug/EnforceDoze)
- **[Extreme GMS Doze](https://github.com/Skyghost090/Extreme-Gms-Doze)** - Intelligently kills Google Play Services when your screen is turned off, dramatically boosting battery life. `FOSS` `[M]`
- **[NoWakeLock](https://github.com/NoWakeLock/NoWakeLock)** - An application that controls Android wakelocks can run on Android N and later. `FOSS` `[LSP]`
- **[SaverTuner](https://f-droid.org/packages/s1m.savertuner/)** - Allows you to take advantage of this built-in battery saver. You can now set different profiles that save the battery more or less aggressively. `FOSS` | [📦 Source](https://codeberg.org/s1m/savertuner)
- **[Universal GMS Doze](https://github.com/gloeyisk/universal-gms-doze)** - Patches Google Play services app and certain processes/services to be able to use battery optimization. `FOSS` `[M]`
- **[Xtreme-Battery-Saver](https://github.com/Magisk-Modules-Alt-Repo/Xtreme-Battery-Saver)** - An extreme battery saver Magisk Module for users who want to really stretch their battery life. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)

---

### Cleaning Apps
- **[Cleaner Royall](https://github.com/araafroyall/Cleaner-Royall)** - A Light weight but Ultra Fast & Powerful cleaner for Android. `Proprietary` `[LSP]`
- **[DirCleaner](https://www.dircleaner.com/)** - A simple and practical cleaning tool. `Proprietary`
- **[Risk](https://github.com/rakarmp/Risk)** - Clean RAM Cache And Stop Background Apps, Google Apps, Third Party Apps. `FOSS` `[M]`
- **[⭐ SD Maid 2/SE](https://f-droid.org/en/packages/eu.darken.sdmse/)** - A file management tool for Android that specialises in maintenance. Its core purpose is freeing up space and removing unwanted data. `FOSS` | [📦 Source](https://github.com/d4rken-org/sdmaid-se)

[↑ Back to top](#table-of-contents)

---

### Communication Tools
#### Call Recorders
- **[Basic Call Recorder](https://github.com/chenxiaolong/BCR)** - A Basic Call Recorder for rooted Android devices.[GUI for BCR](https://github.com/nicorac/bcr-gui) `FOSS` `[M]` `[K]`
- **[Call Recorder - SKVALEX](https://github.com/Magisk-Modules-Repo/callrecorder-skvalex)** - Call recording app to record both sides from the line with a power of root and magisk. `FOSS` `[M]`
- **[Call Recording Google Dialer](https://modules.lsposed.org/module/io.github.vvb2060.callrecording)** - Allows call recorder for google dialer for all regions and without notifying sound. `FOSS` `[LSP]`

#### Contacts
- **[Contacts Sync](https://play.google.com/store/apps/details?id=com.lb.contacts_sync)** - Uses root to sync your address book with high-quality contacts photos from WhatsApp. `Proprietary`

#### SMS
- **[NekoSMS](https://github.com/apsun/NekoSMS)** - A pattern-based text message blocker for Android. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

---

### Customizations
#### Boot Animations
- **[Bootanimation](https://github.com/Bitterneko/Bootanimation)** - A custom boot animation for Android. `Proprietary` `[M]`
- **[Live Boot](https://play.google.com/store/apps/details?id=eu.chainfire.liveboot)** - Get a Linux-like live boot screen on Android. `Proprietary`
- **[video-to-bootanimation](https://github.com/Magisk-Modules-Alt-Repo/video-to-bootanimation)** - A Magisk Module Which Can Set Videos as Android Device BootAnimation. `FOSS` `[M]`

#### Fonts
- **[Font Manager](https://play.google.com/store/apps/details?id=com.androidacy.fontmanager)** - A great font and emoji changer by Androidacy. `Proprietary`
- **[G-Font Installer](https://xdaforums.com/t/development-magisk-module-g-font-installer.4617743/)** - Install Official Google font that is used in most Google apps (Like Google play) and Google Pixel phones right to your phone. `Proprietary` `[M]`
- **[Magisk Fonts](https://github.com/JingMatrix/MagiskFonts)** - Add custom fonts to Android for system-wise usage. `FOSS` `[M]`
- **[Magisk-iOS-Emoji](https://github.com/Keinta15/Magisk-iOS-Emoji)** - Systemlessly replaces the emoji font with iOS Emoji. `FOSS` `[M]`
- **[MiSans](https://github.com/adivenxnataly/MiSans)** - Enhance your font devices with MiSans. `FOSS` `[M]`
- **[Nastaliq Urdu Font](https://xdaforums.com/t/module-font-nastaliq-urdu-font.4645787/)** - Nastaleeq Font Module for Urdu Users. `FOSS` `[M]`
- **[Twemoji-Remastered](https://codeberg-org/Snowy/Twemoji-Remastered)** - This is Magisk module to systemlessly to replace your phone emojis with Twemoji (Twitter Emoji). `FOSS` `[M]`
- **[zFont 3](https://play.google.com/store/apps/details?id=com.htetznaing.zfont2&hl=en)** - Change custom font styles on Samsung, Vivo, iQOO, LG, Huawei, Honor, OnePlus, ASUS, OPPO, Realme, Xiaomi, Tecno, and Infinix devices. `Proprietary`

#### Launchers
- **[Pixel Launcher Enhanced](https://github.com/Mahmud0808/PixelLauncherEnhanced)** - Xposed module designed to unlock a variety of exciting features inluding customizing the look to adding more functionality and many more. `FOSS` `[LSP]`
- **[Pixel Launcher Mods](https://github.com/KieronQuinn/PixelLauncherMods/releases)** - Mods for enhancing the Pixel Launcher experience. `FOSS` | [📦 Source](https://github.com/KieronQuinn/PixelLauncherMods)
- **[Lawnchair](https://github.com/Goooler/LawnchairRelease/releases/latest)** - A customizable launcher offering a Pixel-like experience. `FOSS` | [📦 Source](https://github.com/Goooler/LawnchairRelease)
- **[NovaInstaller](https://github.com/Minionguyjpro/NovaInstaller/releases)** - Installs Nova Launcher to /system/app/ on Android. `FOSS` | [📦 Source](https://github.com/Minionguyjpro/NovaInstaller/)
  
#### Navigation
- **[NavTweaks](https://github.com/Magisk-Modules-Alt-Repo/HideNavBar)** - Fullscreen/Immersive Gesture Tweaks for Android 10-14. `FOSS` `[M]`
- **[Volume Key Track Control Module](https://github.com/Hepolise/VolumeKeyTrackControlModule)** - An Xposed module that allows to skip and play/pause track with volume keys. `FOSS` `[LSP]`

#### OS Customizations
##### AOSP (Android Open Source Project)
- **[PixelUpdater](https://github.com/PixelUpdater/PixelUpdater)** - Pixel Updater is an app for installing Android A/B OTA updates from Google's OTA server. `FOSS` `[M]`
- **[PixelXpert](https://github.com/siavash79/PixelXpert)** - A mixed Xposed+Magisk module, which is made to allow customizations that are not originally designed in AOSP. `FOSS` `[M]` `[LSP]`

##### ColorOS (Oppo)
- **[Breeno Source Changer](https://github.com/Xposed-Modules-Repo/com.niki.breeno.openai/tree/main)** - Allows ColorOS's Breeno Assistant to change its AI model source and customize large language model (LLM) APIs. `FOSS` `[LSP]`
- **[OPCameraPro](https://github.com/Xposed-Modules-Repo/com.tlsu.opluscamerapro)** - Xposed module for ColorOS and realmeUI providing various AI functions, enhancing cameras and other photo related tweaks. `Proprietary` `[LSP]`
- **[ColorOS Notify Icon](https://github.com/fankes/ColorOSNotifyIcon)** - Optimize notification icons for ColorOS and adapt to native notification icon specifications. `FOSS` `[LSP]`
- **[LuckyTool](https://github.com/Xposed-Modules-Repo/com.luckyzyx.luckytool/blob/main/README_EN.md)** - Extended and optimized Xposed module for ColorOS. `Proprietary` `[LSP]`

##### Global
- **[Disable Target API Block](https://github.com/buttercookie42/DisableTargetAPIBlock)** - An Xposed module for disabling Android 14's installation block for old apps. `FOSS` `[LSP]`
- **[SystemUI Tuner](https://github.com/zacharee/Tweaker?tab=readme-ov-file)** - View and modify hidden settings on Android devices. `FOSS` `[M]`

##### HyperOS (Xiaomi)
- **[ClipboardList](https://github.com/HChenX/ClipboardList)** - Remove the 20-item limit and time limit for the Clipboard and Phrases feature.Only for MIUI & HyperOS. `FOSS` `[LSP]`
- **[GreenDotHide](https://github.com/Dorian399/GreenDotHide)** - Hides the green dot indicating sensitive permission use. Works only on MIUI/HyperOS. `FOSS` `[LSP]`
- **[⭐ HyperCeiler](https://github.com/ReChronoRain/HyperCeiler/blob/main/README_en-US.md)** - Extensive customizations for HyperOS. `FOSS` `[LSP]`
- **[Hyper Helper](https://github.com/HowieHChen/XiaomiHelper/blob/master/README_EN-US.md)** - Lightweight customization module for HyperOS only. `FOSS` `[LSP]`
- **[Hyper Optimize](https://github.com/TatshSiow/HyperOptimize)** - Tune HyperOS System and Kernel parameters to reduce power consumption. `FOSS` `[M]`
- **[HyperStar](https://github.com/YunZiA/HyperStar/blob/master/README_EN-US.md)** - An LSPosed module mainly designed to customize the Xiaomi HyperOS Control Center, along with some features. `FOSS` `[LSP]` 
- **[Hyper Unlocked](https://github.com/ukriu/HyperUnlocked)** - Unlock all high-end features possible to be unlocked on low-end xiaomi devices. `FOSS` `[M]`
- **[Lite Blur Control Center For HyperOS2](https://github.com/fakerieh/Lite-Blur-Control-Center-For-HyperOS2)** - Control Center Blur for HyperOS2 but LIGHTER. `FOSS` `[M]`
- **[MIUIqol](https://github.com/Xposed-Modules-Repo/io.github.chsbuffer.miuihelper/blob/main/README_EN.md)** - Improves my experience of MIUI 12 to 14 and HyperOS. `Proprietary` `[LSP]`
- **[Pengeek](https://github.com/monwf/customiuizer)** - Customize your HyperOS to your liking. For HyperOS based on Android 14. `FOSS` `[LSP]`
  
##### One UI (Samsung)
- **[KnoxPatch](https://github.com/salvogiangri/KnoxPatch)** - Get Samsung apps/features working again in your rooted Galaxy device. For better experience, please also read [this](https://github.com/salvogiangri/KnoxPatch?tab=readme-ov-file#knoxpatch-enhancer) . `FOSS` `[LSP]`

##### Onyx
- **[OnyxTweaks](https://github.com/timschneeb/OnyxTweaks)** -  Xposed module for Onyx Boox e-Ink devices with Android 12.It adds other mods to the SystemUI, Android Framework, and Onyx Launcher. `FOSS` `[LSP]`
  
##### Oxygen OS (OnePlus)
- **[Enable local installation for OPlus OTA updates](https://github.com/Houvven/OLocalnstall)** - Enable local installation for OPlus OTA updates. `Proprietary` `[LSP]`
- **[OnePlusPlusLauncher](https://github.com/wizpizz/OnePlusPlusLauncher)** - An XPosed module for the System Launcher on OnePlus' OxygenOS 15, providing extra useful features. `FOSS` `[LSP]`
- **[OnePlus 8 Series & 9R Camera Unlocker](https://github.com/Magisk-Modules-Alt-Repo/oneplus-8series-9r-camera-unlocker)** - Enables 48MP RAW10 capture support, both on the main (8/8T/9R) and ultra wide (8 Pro) lenses and much more. `FOSS` `[M]`
- **[Oxygen-Customizer](https://github.com/DHD2280/Oxygen-Customizer/)** - Open-source Oxygen OS customizer application. `FOSS` `[LSP]`


#### Theming
- **[ColorBlendr](https://f-droid.org/en/packages/com.drdisagree.colorblendr/)** - Customize Material You colors of your device. `FOSS` | [📦 Source](https://github.com/Mahmud0808/ColorBlendr)
- **[Global Icon Pack](https://github.com/RichardLuo0/global-icon-pack-android)** - An Xposed module for applying icon packs globally. `FOSS` `[LSP]`
- **[Iconify](https://github.com/Mahmud0808/Iconify)** - Customize your Android 12+ device easily. `FOSS` `[M]`
- **[Project Themer](https://play.google.com/store/apps/details?id=com.drsants.eggproject)** - Provides tools and features for rooted devices. `Proprietary` `[M]`

[↑ Back to top](#table-of-contents)

---

### Debloating
> 📚 **Related Guide**: [Android Apps Debloating Guide](./docs/guides/android-apps-debloating.md)

- **[⭐ Canta](https://f-droid.org/en/packages/io.github.samolego.canta/)** -  Uninstall any app without root using Shizuku (Needs [Shizuku](https://shizuku.rikka.app/) to be installed and running). `FOSS`  | [📦 Source](https://github.com/samolego/Canta)
- **[De-Bloater](https://f-droid.org/packages/com.sunilpaulmathew.debloater)** - An application using the power of Magisk to debloat unwanted system apps!. `FOSS` | [📦 Source](https://github.com/sunilpaulmathew/De-Bloater)
- **[EXA System App Remover](https://play.google.com/store/apps/details?id=exa.free.saux)** - Remove Bloatware, clear memory and speed up your phone now by uninstalling unused system apps. `Proprietary`
- **[System App Nuker](https://github.com/ChiseWaguri/systemapp_nuker)** - A module to debloat system apps with WebUI Interface. `FOSS` `[M]`
- **[System app remover](https://play.google.com/store/apps/details?id=com.jumobile.manager.systemapp)** - A system app remover and user app uninstaller, move app to sdcard, move app to phone, apk on sdcard scan/install/delete. `Proprietary`

[↑ Back to top](#table-of-contents)

---

### Development and Debugging
- **[IAmNotADeveloper](https://github.com/xfqwdsj/IAmNotADeveloper)** - A Xposed module for hiding Android developer-related switches status. `FOSS` `[LSP]`
- **[Chroot Distro](https://github.com/Magisk-Modules-Alt-Repo/chroot-distro)** - Install Gnu/Linux distributions on Android. `FOSS` `[M]`
- **[⭐ Shizuku](https://apt.izzysoft.de/fdroid/index/apk/moe.shizuku.privileged.api)** - Use system APIs directly with ADB/root privileges. `FOSS` | [📦 Source](https://github.com/RikkaApps/Shizuku)
- **[Magisk Docker](https://github.com/mgksu/dockerd)** - Magisk and KernelSU module for running Docker on rooted Android devices. `FOSS` `[M]` `[K]`
- **[Magisk Tailscaled](https://github.com/mgksu/tailscaled)** - Magisk and KernelSU module for running Tailscale on rooted Android devices. `FOSS` `[M]` `[K]`
- **[Py2Droid](https://github.com/Mrakorez/py2droid)** - A Magisk module to install Python 3 on Android, including the standard library (STDLIB). `FOSS` `[M]`
- **[Termux](https://termux.com/)** - Advanced terminal emulator and Linux environment. `FOSS` - **[More on Termux](#terminal--shell-environments)**
- **[Wireless ADB Switch](https://f-droid.org/ru/packages/com.smoothie.wirelessDebuggingSwitch)** - Quickly enable or disable Android's Wireless Debugging feature. Includes widgets and a quick settings tile for convenience. `FOSS` | [📦 Source](https://github.com/Smooth-E/wireless-adb-switch)
- **[ZRAM Module](https://github.com/FurLC/ZRAM-Module)** -  A Magisk/KernelSU module that provides ZRAM compression algorithm support for Android devices. `FOSS` `[M]` `[K]`

[↑ Back to top](#table-of-contents)

---

### Device Control and Hardware
- **[Classic Power Menu](https://github.com/KieronQuinn/ClassicPowerMenu)** - Power Menu Replacement for Android 11+, with the main aim being restoring power menu options (Device Controls & Quick Access Wallet) on Android 12. `FOSS`
- **[OnePlus Flash Control](https://github.com/Bartixxx32/Opflashcontrol-app)** - Precise control over the brightness of the dual-tone and quad-tone LED flashes for OnePlus devices. `FOSS`
- **[Root Activity Launcher](https://play.google.com/store/apps/details?id=tk.zwander.rootactivitylauncher)** - Launch activities directly from your home screen with root access. `Proprietary`
- **[SecondScreen](https://github.com/farmerbb/SecondScreen)** - Advanced solution to connect your Android device to external displays. `FOSS` | [📦 Source](https://github.com/farmerbb/SecondScreen)
- **[SensorsOff](https://github.com/theLlamaNet/SensorsOff)** - Simple app to enable or disable privacy sensors(camera and microphone) on Miui/HyperOS. `Proprietary`
- **[USB HID Client](https://apt.izzysoft.de/packages/me.arianb.usb_hid_client)** - Use your phone as a keyboard and mouse **without** any software on the other end. `FOSS` | [📦 Source](https://github.com/Arian04/android-hid-client)
- **[JoyCon Droid](https://joycondroid.gitbook.io/joycondroid)** - Allows you to turn your Android device into a controller for your Nintendo Switch. `FOSS`

---

### File Management
- **[AnExplorer](https://play.google.com/store/apps/details?id=dev.dworks.apps.anexplorer)** - A is Simple, Small, Fast and Efficient File Explorer. `FOSS` | [📦 Source](https://github.com/1hakr/AnExplorer)
- **[Fossify File Manager](https://f-droid.org/packages/org.fossify.filemanager/)** - Easy app for managing your files without ads, respecting your privacy & security. `FOSS` | [📦 Source](https://github.com/FossifyOrg/File-Manager)
- **[Material Files](https://f-droid.org/packages/me.zhanghai.android.files)** - Modern file manager with root capabilities. `FOSS` | [📦 Source](https://github.com/zhanghai/MaterialFiles)
- **[⭐ MiXplorer](https://mixplorer.com/)** - Feature-rich file manager. `Proprietary`
- **[MT Manager](https://mt2.cn/)** - File Management & Reverse Engineering Tool for Android. `Proprietary`
- **[Root Explorer](https://play.google.com/store/apps/details?id=com.speedsoftware.rootexplorer)** - File manager with root access. `Proprietary`
- **[Solid Explorer](https://play.google.com/store/apps/details?id=pl.solidexplorer2)** - Powerful file manager with root support. `Proprietary`
- **[Total Commander](https://play.google.com/store/apps/details?id=com.ghisler.android.TotalCommander)** - A feature rich file manager for Android supporting root and shizuku.For  a better experience, please read [this](https://www.ghisler.ch/board/viewforum.php?f=22). `Proprietary`
- **[Xplore File Manager](https://play.google.com/store/apps/details?id=com.lonelycatgames.Xplore)** - A file manager with root support. `Proprietary` 
- **[ZArchiver](https://play.google.com/store/apps/details?id=ru.zdevs.zarchiver)** - A program for archive management (including managing of application backups in archives). `Proprietary`

[↑ Back to top](#table-of-contents)

---

### Kernel Management
- **[EX Kernel Manager](https://play.google.com/store/apps/details?id=flar2.exkernelmanager)** - Root tool for backup and flashing kernels, tweaking color, sound, gestures and other kernel settings. `Proprietary`
- **[Franco Kernel Manager](https://play.google.com/store/apps/details?id=com.franco.kernel)** - A complete toolbox for all devices with a rich interface that combines everything you need to manage, tweak and empower your device. `Proprietary`
- **[Kernel Flasher](https://github.com/fatalcoder524/KernelFlasher)** - An Android app to flash (AK3 files), backup, and restore kernels. `FOSS`
- **[SmartPack-Kernel-Manager](https://f-droid.org/packages/com.smartpack.kernelmanager)** - A Kernel Manager. `FOSS` | [📦 Source](https://github.com/SmartPack/SmartPack-Kernel-Manager)

[↑ Back to top](#table-of-contents)

---

### Location and GPS
- **[GPS Optimization](https://github.com/DEMONICCA/GPS-Optimization)** - Module designed to improve GPS performance and stability on Android devices. `FOSS` `[M]`
- **[GPS Setter](https://github.com/Xposed-Modules-Repo/com.android1500.gpssetter)** - Allows to mock locations for any specific app or entire system. `Proprietary` `[LSP]`
- **[Location Indicator Whitelist](https://github.com/gilbsgilbs/LocationIndicatorWhitelist)** - Prevents applications from spamming the annoying location notification dot on Android 12 +. `FOSS` `[LSP]`
- **[Hide Mock Location](https://github.com/auag0/HideMockLocation)** - Xposed Module to Hide Mock Location Settings. `FOSS` `[LSP]`
- **[XposedFakeLocation](https://github.com/noobexon1/XposedFakeLocation)** - Allows you to spoof your device's location globally or for specific apps without using "mock location" from the developer options. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

---

### Network Tools
- **[Box for Root](https://github.com/taamarin/box_for_magisk)** - Box for Root (BFR) is a Magisk, KernelSU, APatch, module that provides a suite of proxy tools, including clash, sing-box, v2ray, hysteria and xray. It allows you to configure a transparent proxy on Android devices with root access. `FOSS` `[M]` `[K]`
- **[DNS Accelerator](https://github.com/DEMONICCA/DNS-Accelerator)** - Module designed to improve system performance and network connectivity on Android devices. `FOSS` `[M]`
- **[DriFiCrack](https://github.com/ZeltNamizake/DriFiCrack)** - Brute Force Tool to Crack Wi-Fi Passwords. `FOSS` `[M]`
- **[MACsposed](https://github.com/DavidBerdik/MACsposed)** - Adds support for MAC Address spoofing to Android 12 through 15. `FOSS` `[LSP]`
- **[Magisk-WiFiADB](https://github.com/mrh929/magisk-wifiadb)** - A Magisk module to enable WiFi ADB automatically. `FOSS` `[M]`
- **[NetGuard](https://github.com/M66B/NetGuard)** - Block access to the internet. Apps and addresses can individually be allowed or denied access to your Wi-Fi and/or mobile connection. `FOSS`
- **[personalDNSfilter](https://f-droid.org/packages/dnsfilter.android/)** - A DNS filter proxy that provides local filtering of ads, malware, and tracking servers, supporting secure DNS protocols like DOH and DOT for enhanced privacy. `FOSS` | [📦 Source](https://github.com/IngoZenz/personaldnsfilter)
- **[SimbaDroid](https://f-droid.org/packages/de.buttercookie.simbadroid)** - A simple SMB file server for Android. `FOSS` | [📦 Source](https://github.com/buttercookie42/SimbaDroid)
- **[TTLChanger](https://f-droid.org/en/packages/com.mrsep.ttlchanger/)** - Allows you to modify the default TTL (Time to Live) value. `FOSS` | [📦 Source](https://github.com/aleksey-saenko/TTLChanger)
- **[Unlimited Hotspot](https://github.com/felikcat/unlimited-hotspot)** - Remove speed restrictions on your hotspot internet and allows hotspots on any plan. `FOSS` `[M]`
- **[VPN Hotspot](https://github.com/Mygod/VPNHotspot)** - Share your VPN connection over hotspot or repeater. `FOSS`
- **[WiFi Password Viewer for MMRL](https://github.com/Googlers-Repo/wpd)** - WiFi Password Viewer for MMRL. `FOSS`

[↑ Back to top](#table-of-contents)

---

### NFC Tools
- **[NFC Card Emulator Pro (Root)](https://play.google.com/store/apps/details?id=com.yuanwofei.cardemulator.pro)** - An NFC Card Emulator that simulates various types of cards, e.g., access cards, elevator cards, factory (meal) cards, school (meal) cards, some library cards, and other IC cards. `Proprietary`
- **[NfcScreenOff](https://github.com/Jon8RFC/NfcScreenOff)** - Read NFC tags when screen is off & disable NFC tagging sound. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)

---

### Performance Improvements

#### Performance & Gaming
- **[AsoulOpt](https://github.com/nakixii/Magisk_AsoulOpt)** - Game threads tweaker for Android, suitable for mainstream games and some niche games. `FOSS` `[M]`
- **[FPS Unlocker](https://github.com/yadavnikhil03/GameUnlocker#fps-unlocker)** - Enables 90 FPS options in BGMI and PUBG and other Games as well for smoother gameplay on low-end devices. `FOSS` `[M]`
- **[GameResChange](https://github.com/Xposed-Modules-Repo/com.game.reschange)** - Change the resolution of any app/game on Android 13+. `Proprietary` `[LSP]`
- **[PerfGame](https://github.com/adivenxnataly/PerfGame)** - Enable custom resolution & frame-rate mechanism for your games. `FOSS` `[M]`
- **[iUnlocker GLTool](https://github.com/i-Taylo/iUnlockerGL)** - Designed to spoof GPU information, allowing users to modify GPU information for unlocking graphics in games and testing. `FOSS` `[M]`
- **[Uperf-Game-Turbo](https://github.com/yinwanxi/Uperf-Game-Turbo)** - Userspace performance controller for Android. `FOSS` `[M]`

#### System Optimization
- **[3C All-in-One Toolbox](https://play.google.com/store/apps/details?id=ccc71.at.free)** - A comprehensive utility that offers a wide range of tools for monitoring, controlling, and optimizing device performance in a user-friendly interface. `Proprietary`
- **[Bye Blur](https://github.com/Magisk-Modules-Alt-Repo/Bye-Blur)** - Disable the blur effect, this improves performance by discarding this complex visual effect. `FOSS` `[M]`
- **[COPG](https://github.com/AlirezaParsi/COPG)** - Spoof your device to enjoy premium features, max performance, and exclusive benefits. `FOSS` `[M]`
- **[Dex2OAT Optimizer](https://github.com/DEMONICCA/Dex2OAT-Optimizer)** - Optimizes Android system performance by recompiling Dalvik/ART files (dex2oat), clearing caches, and applying customized Dalvik properties for speed and efficiency. `FOSS` `[M]`
- **[Dynamic System Tweaks Magisk Module](https://github.com/PS2ClassicsVault/Dynamic-System-Tweaks-Magisk-Module)** - Improves overall System performance without overheating and losing battery power for armeabi-v7a devices. `FOSS` `[M]`
- **[Encore Tweaks](https://github.com/Rem01Gaming/encore)** - Enhance device performance during gaming sessions, while keeping battery life optimized for normal use. `Proprietary` `[M]`
- **[EnCorinVest](https://github.com/LoggingNewMemory/EnCorinVest)** - Performance Module, Collaboration between CorinXMTKVest and Encore Tweaks.`FOSS` `[M]`
- **[FDE.AI](https://github.com/feravolt/FDE.AI-docs)** - All-in-One ultimate optimizer for all devices running Android OS. `FOSS` `[LSP]`
- **[God Speed Mode](https://github.com/White9shadow/God-Speed-Mode)** - This Is a Magisk Module Aimed To Boost Android Performance. `FOSS` `[M]`
- **[Hydrostellaire](https://github.com/AestasBritannia/Hydro-Br-leur)** - A magisk module for devices running on Dimensity flagship platforms and OnePlus, Realme devices. `FOSS` `[M]`
- **[KonaBess](https://github.com/libxzr/KonaBess)** - A straightforward application designed to customize GPU frequency and voltage tables without the need for kernel recompilation. `FOSS` 
- **[MAGNETAR](https://github.com/Kyliekyler/MAGNETAR)** - Device Performance Optimizer — Aims To Provide An Optimal Experience At Every Usage Scenario. `FOSS` `[M]`
- **[PerfMTK](https://github.com/JUANIMAN/PerfMTK)** - Designed to optimize performance and power efficiency on MediaTek devices with Mali GPUs. `FOSS` `[M]`
- **[SpeedCool](https://github.com/Llucs/SpeedCool-Magisk-Module)** - Boost, cool down, and optimize your Android with SpeedCool: less lag, more performance, and a cooler system. `FOSS` `[M]`
- **[SuperMario Tweaker](https://github.com/mrx7014/SuperMario-Tweaker)** - A tweaker module that can improve any device performance and stability (Gaming, Daily Useage, etc). `FOSS` `[M]`
- **[TNF Tweaker](https://github.com/topnotchfreaks/tnf_tweaker)** - Optimization tool designed exclusively for devices running the TopNotchFreaks and Zephyr kernels. `FOSS` `[K]`

#### Memory & Storage Management
- **[Magisk Swapspace](https://github.com/chickendrop89/magisk-swapspace)** - This module allows for creating a persistent swap space on android. `FOSS` `[M]`
- **[SwapBoost Pro](https://github.com/yadavnikhil03/SwapBoost-Pro)** - Optimizes your device's memory performance through persistent zRAM + Swapfile optimization with VM tweaks. `FOSS` `[M]`
- **[Swap Disabler](https://github.com/rompelhd/Swap-Disabler)** - Disable swap at system startup. `FOSS` `[M]`
- **[SkyScene Add-on](https://github.com/WeirdMidas/SkySceneAddon)** - Optimizations for most memory management subsystems, as well as integrated intelligent memory expansion, a way to expand memory that mimics OEMs like Ram Plus. `FOSS` `[M]` `[K]`

[↑ Back to top](#table-of-contents)

---

### Privacy and Security
- **[AFWall+](https://f-droid.org/packages/dev.ukanth.ufirewall/)** - iptables-based firewall. `FOSS` | [📦 Source](https://github.com/ukanth/afwall)
- **[AlternativeUnlockXposed](https://github.com/leohearts/AlternativeUnlockXposed)** - Unlock your Android phone with an alternative PIN. `FOSS` `[LSP]`
- **[Always Trust User Certs](https://github.com/NVISOsecurity/AlwaysTrustUserCerts)** - A Magisk/KernelSU module that automatically adds user certificates to the system root CA store. `FOSS` `[M]` `[K]`
- **[⭐ Amarok](https://f-droid.org/zh_Hans/packages/deltazero.amarok.foss/)** - Android application which enables you to hide your private files & apps with a single click. `FOSS` | [📦 Source](https://github.com/deltazefiro/Amarok-Hider)
- **[Fyrypt](https://github.com/mirfatif/Fyrypt)** - Android firewall with UID + PID rules, dnscrypt-proxy management, and per-app live network monitoring. `Proprietary`
- **[Geergit](https://github.com/pyshivam/geergit-discussion)** - Xposed Module For Changing (MASKING) the various IDs in the Phone. `Proprietary` `[LSP]`
- **[Tarnhelm](https://github.com/lz233/Tarnhelm)** - The magic to clean sharing links up. `FOSS` `[LSP]`
- **[XPL-EX](https://github.com/0bbedCode/XPL-EX)** - Really simple to use privacy manager for Android 6.0 Marshmallow and later. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

---

### ReVanced
- **[Awesome ReVanced](https://github.com/Jman-Github/Awesome-ReVanced)** - A curated list of awesome ReVanced patches, resources and projects. `FOSS`
- **[Privacy ReVanced Patches](https://github.com/jkennethcarino/privacy-revanced-patches)** - Privacy Patches for ReVanced to disable ads, trackers and analytics, always open Gboard in incognito mode, and much more. `FOSS`
- **[ReVanced Manager](https://github.com/ReVanced/revanced-manager)** - Modify YouTube, YouTube Music, Spotify and many more with additional features. `FOSS`
- **[ReVancedRepackaged](https://github.com/programminghoch10/ReVancedRepackaged)** - This magisk module contains only the ReVanced Patcher.It will patch any installed ReVanced compatible app right on your device during installation. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)

---


### **Root Management**

### Managers
- **[APatch](https://f-droid.org/packages/me.bmax.apatch/)** - The patching of Android kernel and Android system. `FOSS` | [📦 Source](https://github.com/bmax121/APatch)
- **[KernelSU](https://github.com/tiann/KernelSU)** - A Kernel based root solution for Android. `FOSS`
- **[KernelSU-next](https://github.com/KernelSU-Next/KernelSU-Next)** - An advanced Kernel based root solution for Android.
- **[⭐ Magisk Manager](https://github.com/topjohnwu/Magisk)** - Manage Magisk modules and root permissions. `FOSS`
- **[Magisk Manager for Recovery Mode](https://github.com/Rikj000/Magisk-Manager-for-Recovery-Mode)** - Easily manage your Magisk Modules from a terminal session in your custom recovery. `FOSS` `[M]`
- **[⭐ MMRL](https://play.google.com/store/apps/details?id=com.dergoogler.mmrl)** - An Android app that helps manage your own modules repository. `FOSS` | [📦 Source](https://github.com/DerGoogler/MMRL)

### Root Hiding & Integrity
> [TheUnrealZaka's Guide for Hiding Root](https://gist.github.com/TheUnrealZaka/042040a1700ad869d54e781507a9ba4f)

- **[Android VBMeta Fixer](https://github.com/reveny/Android-VBMeta-Fixer)** - A Magisk/KernelSU/Apatch module to fix VBMeta detections on Android. `FOSS` `[M]` `[K]`
- **[Hide My Applist](https://github.com/Dr-TSNG/Hide-My-Applist)** - An Xposed module to intercept applist detections.[Moded Fork](https://github.com/pumPCin/HMAL). `FOSS` `[LSP]`
- **[Komodo Build Props](https://github.com/Elcapitanoe/Komodo-Build-Prop#komodo-build-props)** - Spoof your Android device as the Pixel 9 Pro XL (komodo/komodo_beta). `FOSS` `[M]`
- **[Mountify](https://github.com/backslashxx/mountify)** - Globally mounted modules via OverlayFS. `FOSS` `[M]`
- **[NeoZygisk](https://github.com/JingMatrix/NeoZygisk)** - Zygote injection module implemented using ptrace, which provides Zygisk API support for APatch/KernelSU and serves as a replacement of Magisk's built-in Zygisk. `FOSS` `[M]`
- **[NoHello](https://github.com/MhmRdd/NoHello)** -  A Zygisk module to hide root. `FOSS` `[M]`
- **[PlaycurlNEXT](https://github.com/daboynb/playcurlNEXT)** - Fix Play Integrity (and SafetyNet) verdicts, allowing custom fields and props. `FOSS` `[M]` `[K]`
- **[Play Integrity Fork](https://github.com/osm0sis/PlayIntegrityFork)** - A fork of PIF that fixes "MEETS_DEVICE_INTEGRITY" for Android <13 "deviceRecognitionVerdict" with the Play Integrity API. `FOSS` `[M]`
- **[ReZygisk](https://github.com/PerformanC/ReZygisk)** - A standalone and open-source Zygisk implementation, providing Zygisk API support for KernelSU and a replacement for Magisk's built-in Zygisk. `FOSS` `[M]` `[K]`
- **[Sensitive_Props Mod](https://github.com/Pixel-Props/sensitive-props)** - Helps you bypass SafetyNet and Play Integrity on rooted Android devices by modifying system properties and applying device-specific fixes. `FOSS` `[M]`
- **[⭐ Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)** - Hide Magisk. `Proprietary` `[M]`
- **[SUSFS Module](https://github.com/sidex15/susfs4ksu-module)** - An addon root hiding service for KernelSU. `FOSS` `[M]`
- **[TrickyStore](https://github.com/5ec1cff/TrickyStore)** - Modifying the certificate chain generated for android key attestation. `Proprietary` `[M]` `[K]`
- **[Tricky Addon - Update Target List](https://github.com/KOWX712/Tricky-Addon-Update-Target-List)** - A KSU WebUI to configure Tricky Store target.txt. `FOSS` `[K]`
- **[YuriKey](https://github.com/dpejoh/yurikey)** - A systemless module to get strong integrity easily. `FOSS` `[M]` `[K]`
- **[Zygisk-Assistant](https://github.com/snake-4/Zygisk-Assistant)** - A Zygisk module to hide root for KernelSU, Magisk and APatch. `FOSS` `[M]`
- **[Zygisk Next](https://github.com/Dr-TSNG/ZygiskNext)** - Standalone implementation of Zygisk, providing Zygisk API support for KernelSU and a replacement of Magisk's built-in Zygisk. `Proprietary` `[M]` `[K]`

:exclamation: Root hiding is a constant cat-and-mouse game. These methods might break with updates to Google Play Services or specific apps.

### Root Detection Tools
- **[Android-Native-Root-Detector](https://github.com/reveny/Android-Native-Root-Detector)** - A tool for detecting root on android. `FOSS`
- **[MagiskDetection](https://github.com/apkunpacker/MagiskDetection)** - Collection of Some publicaly Available POC Apps to Detect Root/Magisk presence. `FOSS` `Proprietary`
- **[Play Integrity API Checker](https://play.google.com/store/apps/details?id=gr.nikolasspyr.integritycheck)** - This app shows info about your device integrity as reported by Google Play Services. If any of this fails could mean your device is rooted or tampered in a way. `FOSS` | [📦 Source](https://github.com/1nikolas/play-integrity-checker-app)

After hiding root, you can check whether hiding works via root detection apps, see [rushiranpise/detection](https://github.com/rushiranpise/detection).

### Bootloop Protection
- **[Anti bootloop](https://github.com/Magisk-Modules-Alt-Repo/abootloop)** - A Magisk Module to protect from bootloops. `FOSS` `[M]`
- **[YetAnotherBootloopProtector](https://github.com/Magisk-Modules-Alt-Repo/YetAnotherBootloopProtector)** - A Magisk Module to monitor and fix potential Bootloops and SystemUI failures. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)

---

### Screen and Display
- **[AlwaysOn](https://github.com/Domi04151309/AlwaysOn)** - Adds an always-on display with various customization options regarding watch face, behavior, and background. `FOSS` `[LSP]`
- **[CaptureSposed](https://github.com/99keshav99/CaptureSposed)** - Xposed module that effectively disables the newly introduced screenshot detection API in Android 14. `FOSS` `[LSP]`
- **[Disable Rotation Button](https://github.com/JavaCakeGames/disable-rotation-button)** - App to disable Android's floating rotation button. `FOSS`
- **[⭐ Enable Screenshot](https://github.com/LSPosed/DisableFlagSecure)** - Enabling screenshots in apps that normally wouldn't allow it, and disabling screenshot(Android 14+) & screen record(Android 15+) detection. `FOSS` `[LSP]`
- **[⭐ Flag Secure Patcher](https://github.com/j-hc/FlagSecurePatcher)** - Magisk module to patch service.jar on device to disable secure lock and screenshot listeners. `FOSS` `[M]`
- **[Pointer Replacer](https://github.com/thesandipv/pointer_replacer)** - Replaces a dot appears when user touch the screen [Require Show Touches to be enabled in Developer Options]. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

---

### System Modifications
- **[AnyWebView](https://github.com/neoblackxt/AnyWebView)** - Tries to detect all system webviews and add them to the developer options -> WebView implementation list. `FOSS` `[LSP]`
- **[AutoNight](https://github.com/Chilly-Blaze/autonight)** - Controlling Android's Dark Mode through environmental brightness. `FOSS`
- **[BetterKnownInstalled](https://github.com/Pixel-Props/BetterKnownInstalled)** - Patches packages to fix DroidGuard UNKNOWN_INSTALLED issues. `FOSS` `[LSP]`
- **[Castro - system info](https://play.google.com/store/apps/details?id=com.itemstudio.castro)** - A huge collection of information about your device and a set of tools for monitoring its status. `Proprietary`
- **[CorePatch](https://github.com/LSPosed/CorePatch)** - Disable signature verification For Android. `FOSS` `[LSP]`
- **[Device Info HW](https://play.google.com/store/apps/details?id=ru.andr7e.deviceinfohw)** - A hardware and software information app for Android devices. `Proprietary`
- **[Disable Low Ram Flag](https://github.com/Magisk-Modules-Alt-Repo/disable-low-ram)** - Magisk module to disable Low-Ram flag on Android Go devices. `FOSS` `[M]`n
- **[Google Play System Update Uninstaller](https://github.com/daoquan1002/GPSU-Uninstaller)** - This module is used to uninstall Google Play System Update when the device encounters various issues (like Zygisk). `FOSS` `[M]`
- **[Infamick Script](https://github.com/Infamousmick/Infamick-script/)** - A powerful system utility script that provides easy access to various system information and settings. `FOSS` `[M]`
- **[Multi Userui Enabler](https://github.com/InsertX2k/multiuseruienabler)** -  Magisk module that tries to enable Multi-User UI. `FOSS` `[M]`
- **[Notification Icon Fix](https://github.com/Xposed-Modules-Repo/io.github.howard20181.notificationiconfix/)** - A module for AOSP, MIUI and HyperOS. Using an algorithm to convert white notification icons into recognizable icons. `FOSS` `[LSP]`
- **[Open WebView](https://github.com/Magisk-Modules-Alt-Repo/open_webview)** - Helps you to replace your system webview through Magisk. `FOSS` `[M]`
- **[Pairipfix](https://github.com/ahmedmani/pairipfix)** - Bypasses the "Get this app from Play" screen that appears when installing Android apps as an APK instead of from the Google Play Store. `FOSS` `[LSP]`
- **[Rotation Suggestions Closed](https://github.com/Astoritin/RotationSuggestionsClosed)** - A Magisk module to stop showing rotation suggestion button as rotating screen. `FOSS` `[M]`
- **[System Tools Android](https://play.google.com/store/apps/details?id=com.redhome.sta)** - A true utility processor that includes many small utilities for finer work with the system (including root utilities). `Proprietary`
- **[XSpoofSignatures](https://github.com/rushiiMachine/XSpoofSignatures)** - Xposed module to spoof package signatures. `FOSS` `[LSP]`
- **[zapret for Magisk](https://github.com/sevcator/zapret-magisk)** - DPI bypass on Android with additional features. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)

---

### Terminal & Shell Environments
- **[aShell You](https://apt.izzysoft.de/fdroid/index/apk/in.hridayan.ashell)** - Android shell utility app with Material Design 3 UI, letting you run ADB, root and shell commands. `FOSS` | [📦 Source](https://github.com/DP-Hridayan/aShellYou)
- **[LADB](https://play.google.com/store/apps/details?id=com.draco.ladb)** - Local ADB shell. `FOSS` | [📦 Source](https://github.com/tytydraco/LADB) - [LADB Free Build](https://github.com/hyperio546/ladb-builds)
- **[Termux](https://f-droid.org/en/packages/com.termux)** - A terminal emulator application for Android OS extendible by variety of packages. `FOSS` | [📦 Source](https://github.com/termux/termux-app)
- **[TermuxRootMods](https://github.com/rompelhd/TermuxRootMods)** - A Magisk module that enhances the Termux experience for rooted devices. `FOSS` `[M]`
- **[Termux:API](https://github.com/termux/termux-api)** - Termux add-on app which exposes device functionality as API to command line programs. `FOSS`
- **[Termux:Boot](https://github.com/termux/termux-boot)** - Run scripts at device boot. `FOSS`
- **[Termux:Float](https://github.com/termux/termux-float)** - Run Termux in a floating window. `FOSS`
- **[Termux:Styling](https://github.com/termux/termux-styling)** - A Termux add-on app to customize the terminal font and color theme. `FOSS`
- **[Termux:Tasker](https://github.com/termux/termux-tasker)** - Termux add-on app for integration with [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm). `FOSS`
- **[Termux:Widget](https://github.com/termux/termux-widget)** - Termux add-on app which adds shortcuts to commands on the home screen. `FOSS`

[↑ Back to top](#table-of-contents)

---

### Tools
- **[AdGuardHome for Root](https://github.com/twoone-3/AdGuardHomeForRoot/blob/main/README_en.md#adguardhome-for-root)** - A module to easily execute AdGuardHome on Android. `FOSS` `[M]`
- **[⭐ GreaseMilkyway](https://play.google.com/store/apps/details?id=net.kollnig.greasemilkyway)** - Android accessibility service designed to help people with attention-related conditions (such as ADHD) manage their digital environment and focus on what matters. `FOSS` `[LSP]`
- **[MagiskGapps](https://github.com/wacko1805/MagiskGapps)** - Convert a regular GApps package into a Magisk flashable package using a simple website. `FOSS` `[M]`
- **[Magisk Tailscaled](https://github.com/mgksu/tailscaled)** - Module for running Tailscale on rooted Android devices. `FOSS` `[M]`
- **[Pi-hole-for-Android](https://github.com/DesktopECHO/Pi-hole-for-Android)** - Pi-hole/Unbound Raspbian APK installer for Android 5.0+ devices. `FOSS`
- **[ROM Toolbox Lite](https://play.google.com/store/apps/details?id=com.jrummy.liberty.toolbox)** - Combines several powerful apps to customize and enhance the performance of your device into one app. `Proprietary`
- **[UotanToolbox NT](https://github.com/Uotan-Dev/UotanToolboxNT)** - A modern toolbox for geeks. `FOSS`
- **[XposedModulets](https://github.com/binarynoise/XposedModulets)** - A collection of many small useful Xposed Modules. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

---

### Utilities
- **[crond4Android](https://github.com/powerAn2020/crond4android)** - he Crond program that supports running on KernelSU, APatch and Magisk. `FOSS` `[M]` `[K]`
- **[Hosts Manager Lite](https://play.google.com/store/apps/details?id=awais.hostsmanager.lite)** - Advanced /etc/hosts editor. `Proprietary`


## Important Notes

> ⚠️ **Warning: Proceed with Extreme Caution**  
> Root apps possess the power to fundamentally alter your Android system. Incorrect usage can lead to serious issues, including data loss, system instability, and rendering your device unusable (bricking).

### Key Considerations:

*   🚨 **System Modification Risks:** These apps can modify core system files, potentially causing boot loops, crashes, or other malfunctions.
*   💾 **Data Loss Potential:** Mistakes or incompatible modifications can result in the loss of your personal data. *Always back up your device before using root apps.* → [📖 Backup Guide](./docs/guides/app-backup-restore-using-root.md)
*   🔒 **Security Implications:** Granting root access can increase your device's vulnerability to malware and other security threats.
*   ℹ️ **Community-Sourced Information:** This list is a collection of community suggestions. We do not guarantee the safety, functionality, or suitability of every app.
*   👤 **User Responsibility:** You are solely responsible for any consequences resulting from the use of these applications. Use them at your own risk.
*   💡 **Recommendation:** Thoroughly research any root app before installation and understand its purpose and potential side effects.

**Essential Reading Before You Start:**
- 📚 [Complete Android Rooting Guide](./docs/android-root-guides/index.md) - Master the fundamentals
- ❓ [FAQ & Troubleshooting](./docs/faqs.md) - Common issues and solutions
- 🤝 [Contributing Guidelines](./docs/contributing.md) - Help improve this resource

[↑ Back to top](#table-of-contents)

## FAQs

Complete support resource with expert troubleshooting solutions:

[**View Complete FAQ & Troubleshooting Guide** →](./docs/faqs.md)

[↑ Back to top](#table-of-contents)

## Community & Resources

### **Premier Android Communities**
- **[XDA Developers](https://forum.xda-developers.com/)** - The ultimate Android development and modding community

### **Reddit Communities**
- **[r/AndroidRoot](https://reddit.com/r/AndroidRoot)** - General rooting discussions and troubleshooting
- **[r/Magisk](https://reddit.com/r/Magisk)** - Magisk modules, updates, and support
- **[r/Android](https://reddit.com/r/Android)** - Main Android community (1M+ members)

### **Official Project Resources**
- **[GitHub Repository](https://github.com/awesome-android-root/awesome-android-root)** - Source code, issues, and contributions
- **[𝕏 / Twitter @awsm_and_root](https://x.com/awsm_and_root)** - Updates, tips, and community highlights
- **[r/AwesomeAndroidRoot](https://reddit.com/r/AwesomeAndroidRoot)** - Our official community
- **[GitHub Discussions](https://github.com/awesome-android-root/awesome-android-root/discussions)** - Feature requests and feedback


[↑ Back to top](#table-of-contents)

## Contributing

We welcome contributions from the community! Here's how you can help:

### Quick Actions
- **⭐ Star this repository** if it helped you
- **🐛 Report issues** for broken links or outdated apps
- **💡 Suggest new apps** via [GitHub issues](https://github.com/awesome-android-root/awesome-android-root/issues)

### Detailed Guidelines
For comprehensive contribution instructions, including formatting standards and submission requirements:

**[📖 Read Full Contribution Guidelines →](./docs/contributing.md)**

[↑ Back to top](#table-of-contents)

## Stats

<div class="img-cnt">

![Total Entries](https://img.shields.io/badge/Total%20Entries-328-blue?style=for-the-badge&logo=android)
![Root Apps](https://img.shields.io/badge/Root%20Apps-124-blue?style=for-the-badge&logo=android)
![Magisk Modules](https://img.shields.io/badge/Magisk%20Modules-113-orange?style=for-the-badge&logo=magisk&logoColor=white)
![LSPosed Modules](https://img.shields.io/badge/LSPosed%20Modules-91-purple?style=for-the-badge&logo=local&logoColor=white)

</div>

## Support This Project

<div align="center">

### 💖 Help Us Grow

<div class="img-cnt">

[![Become a Sponsor](https://img.shields.io/badge/💖-Become%20a%20Sponsor-ff69b4?style=for-the-badge)](https://opencollective.com/awesome-android-root-official)
[![GitHub Stars](https://img.shields.io/badge/⭐-Star%20this%20Repo-yellow?style=for-the-badge)](https://github.com/awesome-android-root/awesome-android-root?ref=awesome-root.org)
[![Report Issue](https://img.shields.io/badge/🐛-Report%20Issue-green?style=for-the-badge)](https://github.com/awesome-android-root/awesome-android-root/issues)

</div>
</div>

### 🚀 Your Support Enables Us To:
- ✅ Keep this list updated with the latest apps & modules
- ✅ Maintain comprehensive documentation & guides
- ✅ Improve project infrastructure & development tools
- ✅ Grow the open-source Android rooting community

## 🏆 Hall of Fame

Special thanks to our top contributors and supporters:

<div align="center">

[![Contributors](https://contrib.rocks/image?repo=awesome-android-root/awesome-android-root)](https://github.com/awesome-android-root/awesome-android-root/graphs/contributors)

</div>

---

<div align="center">

**⚡ Made with ❤️ by [Awesome Android Root](https://github.com/awesome-android-root/awesome-android-root)**

</div>
