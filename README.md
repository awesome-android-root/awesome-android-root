<div align="center" class="intro-header">

<picture>
  <source media="(prefers-color-scheme: light)" srcset="docs/public/images/logo.svg">
  <source media="(prefers-color-scheme: dark)" srcset="docs/public/images/logo_dark.svg">
  <img src="docs/public/images/logo.svg" alt="Awesome Android Root Logo" width="120" height="120" />
</picture>

# Awesome Android Root

**🛡️ The Ultimate Android Rooting Hub**

<sub>Discover 430+ top root apps, Magisk/ KernelSU/ LSPosed(xposed) modules & step-by-step guides for every device.</sub>

[![GitHub Repo stars](https://img.shields.io/github/stars/awesome-android-root/awesome-android-root?logo=github&style=for-the-badge&color=blue&cacheSeconds=3600)](https://github.com/awesome-android-root/awesome-android-root) [![Total Entries](https://img.shields.io/badge/Apps%20%26%20Modules-430+-blue?style=for-the-badge&logo=android&cacheSeconds=3600)](#root-apps-and-modules) [![X Follow](https://img.shields.io/badge/%20%20-Follow%20US-blue?logo=X&logoColor=white&style=for-the-badge&label=&#8203;)](https://x.com/awsm_and_root)

</div>
<div align="center" class="quick-nav">

[Introduction](#introduction) | [Rooting Guides](#rooting-guides) | [Apps & Modules](#root-apps-and-modules) | [Support](#resources-and-help)

</div>
<div class="mob-tip">

> 💡 **Mobile Users:** Visit **[awesome-android-root.org](https://awesome-android-root.org)** for better navigation and search.

</div><br>

### Table of Contents

<details>
<summary>👉 Tap to expand complete navigation</summary>

<div class="toc-overview">

### 📚 Overview
- [Introduction](#introduction)
- [Rooting Guides](#rooting-guides)
- [Device-Specific Guides](#device-specific-guides)
- [Additional Guides](#additional-guides)

</div>

### 📚 Glossary
- [Glossary](#glossary)

### ⭐ Featured Essentials
- [Starter Kit: Must have Apps](#starter-kit-must-have-apps)

### 📱 Root Apps by Category

#### 🛡️ **Privacy & Security**
- [Ads and Tracking Blockers](#ads-and-tracking-blockers)
- [Privacy and Security](#privacy-and-security)

#### 📦 **App Control and Management**
- [App Management and Control](#app-management-and-control)
  - [App Isolation and Cloning](#app-isolation-and-cloning)
  - [App Managers](#app-managers)
  - [App Update Control](#app-update-control)
  - [Freeze Apps](#freeze-apps)
  - [Package Management and Installation](#package-management-and-installation)
  - [App Stores](#app-stores)
  - [App Permissions and Control](#app-permissions-and-control)
  - [Signature and Verification](#signature-and-verification)

#### 🔧 **App Modifications and Extensions**
- [Modded Apps and Tweaks](#modded-apps-and-tweaks)
  - [General Mods](#general-mods)
  - [Social Media Mods](#social-media-mods)
- [ReVanced](#revanced)

#### ⚡ **Performance and System**
- [Automation and Scheduling](#automation-and-scheduling)
- [Battery and Power Management](#battery-and-power-management)
  - [Battery Optimization](#battery-optimization)
  - [Background App Control](#background-app-control)
  - [Charging and Power Control](#charging-and-power-control)
  - [Google Services Optimization](#google-services-optimization)
- [Performance and Optimization](#performance-and-optimization)
- [Kernel Management](#kernel-management)
- [System Modifications](#system-modifications)

#### 🗃️ **Data & Storage**
- [File Management](#file-management)
- [Backup and Restore](#backup-and-restore)
- [Debloating and Cleaning](#debloating-and-cleaning)

#### 🎨 **Interface and Customization**
- [Boot and Startup](#boot-and-startup)
- [Customization and Theming](#customization-and-theming)
  - [Digital Assistants](#digital-assistants)
  - [Fonts](#fonts)
  - [Emojis](#emojis)
  - [Themes and Visual Mods](#themes-and-visual-mods)
- [Launchers and Home Screen](#launchers-and-home-screen)
- [Gestures and Navigation](#gestures-and-navigation)
- [Notifications and UI Elements](#notifications-and-ui-elements)
- [OS-Specific Customization](#os-specific-customization)

#### 🎵 **Audio and Media**
- [Audio and Media](#audio-and-media)
  - [Audio Enhancement](#audio-enhancement)
  - [Audio Control and Management](#audio-control-and-management)
  - [Audio Configuration](#audio-configuration)

#### 🌐 **Network and Communication**
- [Network and Connectivity](#network-and-connectivity)
- [Location and GPS](#location-and-gps)
- [Communication and Messaging](#communication-and-messaging)

#### 🛠️ **Root and System Management**
- [Root Management](#root-management)
  - [Root Managers](#root-managers)
  - [Module Managers](#module-managers)
  - [Zygisk Implementations](#zygisk-implementations)
  - [Root Hiding and Integrity](#root-hiding-and-play-integrity)
  - [Root Detection Tools](#root-detection-tools)
  - [Bootloop Protection](#bootloop-protection)

#### 📥 **Frameworks and Advanced**
- [LSPosed Framework](#lsposed-framework)
- [Development and Debugging](#development-and-debugging)
- [Hardware and Sensors](#hardware-and-sensors)
- [Terminal and Shell Tools](#terminal-and-shell-tools)

#### 🖥️ **Display and Accessibility**
- [Screen and Display](#screen-and-display)
- [Accessibility Tools](#accessibility-tools)

#### 🌐 **Browser Tools**
- [Browser and Web Tools](#browser-and-web-tools)
  - [Browser Extensions](#browser-extensions)
  - [Webview Mods](#webview-mods)

### 🧰 System Tools
- [Utilities and System Tools](#utilities-and-system-tools)
  - [NFC and Wireless](#nfc-and-wireless)
  - [Cloud and Remote Storage](#cloud-and-remote-storage)
  - [Device Information](#device-information)
  - [Task Managers](#task-managers)
  - [Translation and Localization](#translation-and-localization)
  - [Miscellaneous Utilities](#miscellaneous-utilities)

### 📚 Support and Safety
- [Resources and Help](#resources-and-help)
- [Legal and Safety](#legal-and-safety)
- [Support us](#support-the-project)

</details>

---

<div class="root-intro">

## Introduction

### What is Android Rooting?
Rooting grants **superuser (admin) access** to your Android device, enabling deep system modifications — removing bloatware, enhancing privacy, boosting performance, and unlocking advanced customization.

Think of it like gaining **Administrator rights** on Windows or **sudo access** on Linux.

### Why Root?

- **Control** - [Remove preinstalled bloat](./docs/general-guides/android-apps-debloating.md), disable telemetry
- **Performance** - Tune CPU, GPU, battery, animations with [optimization tools](#performance-and-optimization)
- **Privacy** - [Block trackers](./docs/general-guides/android-adblocking.md), restrict app permissions
- **Customization** - Change UI, fonts, [boot animations](#boot-and-startup), navigation
- **True Backups** - [Backup app data](#backup-and-restore) and system settings

### Benefits vs Risks

| Benefits | Risks & Considerations |
|:--|:--|
| System-wide ad blocking | May void warranty |
| Full app control | Security exposure if misused |
| Performance tuning | Instability/bootloops possible |
| Deep customization | OTA update friction |
| True backups (app data) | App integrity checks may fail (banking/DRM) |

---

</div>

<div align="center" class="readme-guides">
<br><br>

# Rooting Guides

[![Master-rooting-guide](https://img.shields.io/badge/Master--Rooting-Guide-blue?style=for-the-badge&cacheSeconds=3600)](./docs/rooting-guides/index.md)

> Follow all steps from "[fynks.github.io/check-list](https://fynks.github.io/check-list/)", ensure you’re fully prepared.

</div><br>

<div class="readme-guides-steps">

## The 4-Step Rooting Process

Follow this path:

### Step 1: Unlock Bootloader
   → **[Bootloader Unlock Guide](docs/rooting-guides/how-to-unlock-bootloader.md)**  
   *(Required for most root methods)*

### Step 2: Install Custom Recovery
   → **[TWRP / OrangeFox Guide](docs/rooting-guides/how-to-install-custom-recovery.md)**  
   *(Needed to flash root and mods)*

### Step 3: Choose and Install Root Method  

| Method | Best for | Guide |
| :--- | :--- | :--- |
| Magisk | Most users | [Magisk Guide](docs/rooting-guides/magisk-guide.md) |
| KernelSU | Kernel-savvy users | [KernelSU Guide](docs/rooting-guides/kernelsu-guide.md) |
| APatch | Devices with tricky firmware | [APatch Guide](docs/rooting-guides/apatch-guide.md) |

> [!TIP]
> You can check out the complete comparison here: **[Root Solutions Comparison](./docs/rooting-guides/index.md#root-solutions-comparison)**

### Step 4: **Post-Root Setup**  
1. Install [essential apps and modules](#starter-kit-must-have-apps)
2. Block Ads and trackers: [Ad Blocking Guide](./docs/general-guides/android-adblocking.md)
3. [Debloat your phone](./docs/general-guides/android-apps-debloating.md) to improve performance
4. Configure [root hiding](#root-hiding-and-play-integrity) for banking apps
5. Set up [LSPosed Framework](./docs/rooting-guides/lsposed-guide.md) for advanced customization

> [!NOTE]
> **For Android 14/15:** Play Integrity is stricter. Root hiding may break apps. Stay updated.

## Device-Specific Guides

**Choose your device:**
- [Google Pixel Root Guide](docs/rooting-guides/how-to-root-pixel-phone.md)
- [Samsung Root Guide](docs/rooting-guides/how-to-root-samsung-phone.md)
- [Xiaomi/HyperOS Root Guide](docs/rooting-guides/how-to-root-xiaomi-phone.md)
- [OnePlus Root Guide](docs/rooting-guides/how-to-root-oneplus-phone.md)
- [Nothing Phone Root Guide](docs/rooting-guides/how-to-root-nothing-phone.md)
- [Motorola Root Guide](docs/rooting-guides/how-to-root-motorola-phone.md)


## Additional Guides

- [LSPosed Framework Guide](docs/rooting-guides/lsposed-guide.md)
- [Custom ROMs Guide](docs/rooting-guides/custom-rom-installation.md)

> **[📚 All Rooting Tutorials ➞](docs/rooting-guides/index.md)**

[↑ Back to top](#table-of-contents)

---

</div>

<div align="center" class="readme-apps-intro">
<br><br>

# Root Apps and Modules

![Apps & Modules](https://img.shields.io/badge/Apps%20&%20Modules%20&#8203;-430+-blue?style=for-the-badge&logo=stackblitz&cacheSeconds=3600)

</div><br />

> [!TIP]
> **Start with our [Complete Rooting Guide](../rooting-guides/) before exploring apps below.**

> [!TIP]
> For privacy-friendly and convenient installs, we **recommend using the F-Droid** ecosystem, for example, install the Droid-ify client **and enable the IzzyOnDroid repo**:
> - Droid-ify: https://github.com/Droid-ify/client/releases (modern F-Droid client)
> - IzzyOnDroid: https://apt.izzysoft.de/fdroid/ (additional F-Droid repo with many packages)

> [!NOTE]
> Clicking on App/Module entry point to **Source Code page** (Github/Gitlab etc) *in case of `FOSS` apps* otherwise link points to **Google Play Store**.

---

## Glossary

| Symbol | Meaning |
|:----|:---|
| ⭐ | Community-recommended (most popular/trusted in category) |
| `FOSS` | Free and Open Source Software (source code available) |
| `Proprietary` | Closed-source software or unclear licensing |
| 🌱 | Available on F-Droid |
| ▶️ | Available on Google Play Store |

> [!NOTE]
> Some Apps/Modules may have mislabelled licenses. We try our best to verify them, but please double-check before use.


**Root Framework Badges:**
- `[M]` = Magisk Module (requires [Magisk framework](../rooting-guides/magisk-guide.md))
- `[K]` = KernelSU Module (requires [KernelSU framework](../rooting-guides/kernelsu-guide.md)) 
- `[LSP]` = LSPosed Module (requires [LSPosed framework](../rooting-guides/lsposed-guide.md))
- `[R]` = ReVanced Patch (requires [ReVanced Manager](https://github.com/ReVanced/revanced-manager))

<details>
<summary><b>📚 Common Rooting Terms</b></summary>

- **Bootloader** - Low-level software that starts your OS (must be unlocked for root)
- **Recovery** - Special mode for system modifications (TWRP, CWM)
- **Systemless Root** - Root method that doesn't modify system partition
- **Zygisk** - Magisk feature for advanced app hooking and hiding
- **DenyList** - Magisk feature to hide root from specific apps
- **Play Integrity** - Google's security check (replacing SafetyNet)
- **Knox** - Samsung's security platform (trips when bootloader unlocked)

<br>
</details>

**How Apps are Organized:**  
In a category/sub-category, apps are sorted in following order: `⭐ (Community-recommended) Apps > Alphabetically`

---

## Starter Kit: Must have Apps

**Just rooted your device?** Start with these must-have applications that form the foundation of a great root experience.

| App  | Why it's essential |
| :---: | :--- |
| **[Magisk](https://github.com/topjohnwu/Magisk)** <br><small> `Root Management` </small> | If you chose Magisk, this is your manager. |
| **[App Manager](https://github.com/MuntashirAkon/AppManager)** <br><small> `App Control` </small> | Inspect and manage apps with root privileges. |
| **[MiXplorer](https://mixplorer.com/)** <br><small> `File Management` </small> | A powerful file manager with full root access. |
| **[AdAway](https://adaway.org/)** <br><small> `Ad Blocking` </small> | Open-source system-wide ad blocker. |
| **[Droid-ify](https://f-droid.org/packages/com.looker.droidify)** <br><small> `F-Droid client` </small> | A modern F-Droid client for installing open-source apps. |

[↑ Back to top](#table-of-contents)

---

## Accessibility Tools
- **[Do Not Try Accessibility](https://github.com/Nitsuya/DoNotTryAccessibility)** - Hook System Framework makes the app think that accessibility services are not enabled. `FOSS` `[LSP]`
- **[GreaseMilkyway](https://play.google.com/store/apps/details?id=net.kollnig.greasemilkyway)** - Android accessibility service designed to help people with attention-related conditions (such as ADHD) manage their digital environment and focus on what matters. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

---

## Ads and Tracking Blockers

- **[⭐ AdAway](https://github.com/AdAway/AdAway)** – Open-source ad blocker using the hosts file. Blocks ads without permissions. `FOSS` | [🌱](https://f-droid.org/packages/org.adaway)
- **[⭐ bindhosts](https://github.com/bindhosts/bindhosts)** - Systemless hosts for APatch, KernelSU and Magisk that is fully standalone and self-updating. `FOSS` `[M]` `[K]`
- **[AdClose](https://github.com/Xposed-Modules-Repo/com.close.hook.ads/)** - Prevents the initial loading of the advertising SDK within the application and intercepts application advertising requests to block ads. `Proprietary` `[LSP]`
- **[AdGuard](https://adguard.com/en/adguard-android/overview.html)** - Comprehensive ad blocking solution. `Proprietary` 
- **[AdGuardHome for Root](https://github.com/twoone-3/AdGuardHomeForRoot/blob/main/README_en.md#adguardhome-for-root)** - A module to easily execute AdGuardHome on Android. `FOSS` `[M]`
- **[BlockAds](https://github.com/pantsufan/BlockAds)** - BlockAds is an advertisement blocking Magisk module. `FOSS` `[M]`
- **[Blokada](https://blokada.org/)** - Advanced ad blocker with VPN functionality. `Proprietary`
- **[Cubic-AdBlock](https://github.com/Vaz15k/Cubic-AdBlock)** - A simple AdBlock module based on the hosts file. `FOSS` `[M]`
- **[F*ck AD](https://github.com/hujiayucc/Fuck-AD)** - Ad-blocking Xposed module. `FOSS` `[LSP]`
- **[Magical Protection](https://github.com/programminghoch10/MagicalProtection)** - Magisk-only completely systemless adblocking. `FOSS` `[M]`
- **[Magisk Ad Blocking Module](https://github.com/pantsufan/Magisk-Ad-Blocking-Module)** - Block ads on android. `FOSS` `[M]`
- **[Pi-hole-for-Android](https://github.com/DesktopECHO/Pi-hole-for-Android)** - Pi-hole/Unbound Raspbian APK installer for Android 5.0+ devices. `FOSS`
- **[Re-Malwack](https://github.com/Magisk-Modules-Alt-Repo/Re-Malwack)** - A fully-fledged ad-block module. Contains all your needs. `FOSS` `[M]`
- **[StevenBlock](https://github.com/mikropsoft/StevenBlock)** - Ad Blocking Module for Android supporting Magisk, KernelSU and APatch. `FOSS` `[M]`
- **[systemless-adblocker](https://github.com/Magisk-Modules-Alt-Repo/systemless-adblocker)** - Ultimate adblocker module derived from gloeyisk/systemless-hosts. `FOSS` `[M]`
- **[Systemless hosts KernelSU module](https://github.com/symbuzzer/systemless-hosts-KernelSU-module)** - Required module to use applications such as AdAway on KernelSU and APatch. `FOSS` `[K]`

> [!NOTE]
> **Related Guide**: [Complete Android Ad Blocking Tutorial](./docs/general-guides/android-adblocking.md)

> [!TIP]
> For network-level blocking, also check [DNS Tools](#dns-tools) and [Firewall Tools](#firewall-tools)

[↑ Back to top](#table-of-contents)

---

## App Management and Control

### App Isolation and Cloning
- **[Insular](https://gitlab.com/secure-system/Insular)** - Isolate your big brother app. A fork based on the excellent Island. `FOSS` | [🌱](https://f-droid.org/packages/com.oasisfeng.island.fdroid)
- **[Island](https://github.com/oasisfeng/island/tree/dev)** - App isolation and cloning. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=com.oasisfeng.island)
- **[Shelter](https://gitea.angry.im/PeterCxy/Shelter)** - Isolate and clone apps. `FOSS` | [🌱](https://f-droid.org/app/net.typeblog.shelter)

### App Managers
- **[⭐ App Manager](https://github.com/MuntashirAkon/AppManager)** - A full-featured package manager and viewer for Android. `FOSS` | [🌱](https://f-droid.org/packages/io.github.muntashirakon.AppManager/)
- **[AppDash: App Manager & Backup](https://play.google.com/store/apps/details?id=flar2.appdashboard&hl=en)** - Makes it easy to manage APKs and apps installed on your device. `Proprietary`
- **[App Manager](https://play.google.com/store/apps/details?id=com.lb.app_manager)** - A feature rich app manager with batch operation support. `Proprietary`
- **[Inure](https://github.com/Hamza417/Inure)** - An elegant and beautiful premium Android app manager for rooted and non-rooted devices. `FOSS` | [🌱](https://f-droid.org/en/packages/app.simple.inure/) | [▶️](https://play.google.com/store/apps/details?id=app.simple.inure.play)
- **[Thor](https://github.com/trinadhthatakula/Thor)** - Android App Manager and App Installer utility. `FOSS` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/com.valhalla.thor) | [▶️](https://play.google.com/store/apps/details?id=com.valhalla.thor)
- **[Package Manager](https://github.com/SmartPack/PackageManager)** - A highly powerful app to manage both system and user apps installed on an Android device. `FOSS` | [🌱](https://f-droid.org/packages/com.smartpack.packagemanager) | [▶️](https://play.google.com/store/apps/details?id=com.smartpack.packagemanager)

### App Update Control
- **[⭐ Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Zygisk module to detach installed apps from Play Store, hooking binder. Also check out [📖 Zygisk Detach Guide](./docs/general-guides/stop-android-app-auto-updates-play-store.md). Requires [Zygisk implementation](#zygisk-implementations). `FOSS` `[M]`
- **[Play Version Spoofer](https://github.com/byemaxx/PlayVersionSpoofer)** - Prevents the Google Play Store from automatically updating itself. `FOSS` `[LSP]`
- **[Update Locker](https://github.com/Xposed-Modules-Repo/ru.mike.updatelocker/)** - Block updates (and auto-updates) selected apps via popular markets including Google Play Market, Huawei AppGallery and Samsung Galaxy Store. `Proprietary`

### Freeze Apps
- **[⭐ Hail](https://github.com/aistra0528/Hail)** - Disable / Hide / Suspend / Uninstall Android apps. `FOSS` | [🌱](https://f-droid.org/packages/com.aistra.hail/)
- **[Ice Box](https://play.google.com/store/apps/details?id=com.catchingnow.icebox)** - Freeze and hide apps rarely used. `Proprietary`

### Package Management and Installation
- **[⭐ Disable Target API Block](https://github.com/buttercookie42/DisableTargetAPIBlock)** - Disable Android 14's installation block for old apps. `FOSS` `[LSP]`
- **[Auto Uninstaller](https://github.com/MeRaazi/auto-uninstaller)** - Automatically uninstall blacklisted apps. `FOSS` `[K]`
- **[BanUninstall](https://github.com/TinyHai/BanUninstall/)** - Prevents apps from being uninstalled or apps' data from being cleared. `FOSS` `[LSP]`
- **[BetterKnownInstalled](https://github.com/Pixel-Props/BetterKnownInstalled)** - Patches packages to fix DroidGuard UNKNOWN_INSTALLED issues. `FOSS` `[LSP]`
- **[InstallerX-Revived](https://github.com/wxxsfxyzm/InstallerX-Revived)** - A modern and functional Android app installer. `FOSS` `[LSP]`
- **[Let Me Downgrade](https://github.com/DavidBerdik/Let-Me-Downgrade)** - Add support for downgrading apps on Android 12 through 15 QPR1. `FOSS` `[LSP]` | [🌱](https://f-droid.org/packages/com.berdik.letmedowngrade/) | [▶️](https://play.google.com/store/apps/details?id=com.berdik.letmedowngrade)
- **[Play Store Self Update Blocker](https://github.com/himanshujjp/PlayStoreSelfUpdateBlocker)** - Prevents the Google Play Store from auto-updating itself. Useful for users trying to maintain valid device attestation under the newer Play Integrity API rules. `FOSS` `[M]` `[K]`

> [!TIP]
> You can also try [Install with Options](https://github.com/zacharee/InstallWithOptions) which needs `Shizuku` to work. It allows installing, uninstalling, and updating apps with various options like allowing downgrades, ignoring version checks, etc.

### App Stores
- **[⭐ Droid-ify](https://github.com/Droid-ify/client)** - F-Droid client with Material UI and auto updating apps using root. `FOSS` | [🌱](https://f-droid.org/packages/com.looker.droidify)
- **[Aurora Store](https://github.com/whyorean/AuroraStore)** - A Google Play Store client to search, view app details, and download APKs directly to your device. `FOSS` | [🌱](https://f-droid.org/packages/com.aurora.store/)
- **[F-Droid Privileged Extension](https://gitlab.com/fdroid/privileged-extension)** - Eables F-Droid to install and delete apps without needing "Unknown Sources" & install updates in the background. `FOSS` | [🌱](https://f-droid.org/en/packages/org.fdroid.fdroid.privileged/)
- **[Neo Store](https://github.com/NeoApplications/Neo-Store)** - An F-Droid client with modern UI and an arsenal of extra features. `FOSS` | [🌱](https://f-droid.org/packages/com.machiav3lli.fdroid)

### App Permissions and Control
- **[AppOps](https://play.google.com/store/apps/details?id=rikka.appops)** - Control the hidden appops conveniently. `Proprietary`
- **[Net Switch](https://github.com/Rem01Gaming/net-switch)** - Isolate any app from Internet access. `FOSS` `[M]`
- **[Permission Ruler](https://play.google.com/store/apps/details?id=com.stefanosiano.permissionruler&hl=en)** - Automatically manages app permissions when the screen is off for enhanced privacy. `Proprietary`
- **[PermissionManagerX](https://github.com/mirfatif/PermissionManagerX)** - eXtended Permission Manager for Android to view and set Manifest Permissions and AppOps. `FOSS` | [🌱](https://f-droid.org/packages/com.mirfatif.permissionmanagerx) | [▶️](https://play.google.com/store/apps/details?id=com.mirfatif.permissionmanagerx)
- **[Thanox](https://github.com/Tornaco/Thanox)** - A system management tool that provide convenient functions like application startup management, background management, permission management etc. `FOSS` `[LSP]` | [▶️](https://play.google.com/store/apps/details?id=github.tornaco.android.thanos.pro&hl=en&gl=US)

### Signature and Verification
- **[⭐ CorePatch](https://github.com/LSPosed/CorePatch)** - Disable signature verification For Android. `FOSS` `[LSP]`
- **[⭐ Pairipfix](https://github.com/ahmedmani/pairipfix)** - Bypasses the "Get this app from Play" screen that appears when installing Android apps as an APK instead of from the Google Play Store. `FOSS` `[LSP]`
- **[Apk Protection Patch](https://github.com/Mods-Center/Apk-Protection-Patch)** - Removes signature verification restrictions on AOSP and OEM ROMs (HyperOS, ColorOS, etc.), allowing installation of modified APKs. `Proprietary` `[M]` `[K]`
- **[XSpoofSignatures](https://github.com/rushiiMachine/XSpoofSignatures)** - Spoof package signatures. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

---

## App Modifications

### General Mods

#### Cake Mods
- **[Cake - Learn English & Korean Patches](https://github.com/hoo-dles/revanced-custom-patches)** - Enable Plus . `FOSS` `[R]`

#### Duolingo Mods
- **[Duolingo Regret](https://github.com/TigerBeanst/Duolingo-Regret)** - Change Duolingo's time zone to any arbitrary time zone, makes it easier to go back and finish forgotten streaks. `FOSS` `[LSP]`
- **[Duolingo Patches](https://github.com/hoo-dles/revanced-custom-patches)** - Disable practice reminder banner, Unlock licensed songs, Unlock Super Duolingo features. `FOSS` `[R]`

#### Solid Explorer
- **[F**k Solid Explorer](https://github.com/fzer0x/dev.fzer0x.fucksolidexplorer)** - Unlock premium features and remove advertisements from Solid Explorer. `FOSS` `[LSP]`

#### Google KeyBoard Mods
- **[GboardHook](https://github.com/chenyue404/GboardHook)** - Modifies the number of clipboard items displayed and their expiration time. `FOSS` `[LSP]`
- **[Gboard Material Expressive Black](https://github.com/hxreborn/gboard-material-expressive-black)** - Enables pitch black Gboard background on Android 16 dynamic theme. `FOSS` `[LSP]`

#### Google Photos Mods
- **[LimitlessPhotos](https://github.com/daglaroglou/LimitlessPhotos)** - Unlock unlimited, original-quality backup plan on Google Photos. `FOSS` `[LSP]`
- **[XposedPhotosFix](https://github.com/RevealedSoulEven/XposedPhotosFIX)** - Prevents Google Photos app from merging all folders in Camera folder and creates separate albums for each folder, useful for backups. `FOSS` `[LSP]`

#### Google News Mods
- **[G-News Control](https://github.com/mango0oo/G-News-Control)** - Magisk / KernelSU module for control the Google News on the home screen. `Proprietary` `[M]` `[K]`

#### Maps Mods
- **[Maps Tweaks](https://github.com/Xposed-Modules-Repo/ru.mike.mapstweaks)** - Collection of maps UI tweaks for Google Maps, Yandex Maps and Yandex Navi. `Proprietary` `[LSP]`
- **[Yandex Maps Patcher](https://github.com/Xposed-Modules-Repo/ru.bluecat.yandexmapspatcher)** - Hides ads and intrusive services in the Yandex Maps app. `Proprietary` `[LSP]`

#### Ozon App
- **[NoAdsPlus](https://github.com/igormsc/ai.noads.NoAdsPlus)** - Removes ads from the Ozon app. `FOSS` `[LSP]`

#### Spotify
- **[ReVancedXposed_Spotify](https://github.com/chsbuffer/ReVancedXposed_Spotify)** - Unlocks premium features of Spotify.  `FOSS` `[LSP]`

#### Via Brower Mods
- **[BetterVia](https://github.com/JiGuroLGC/BetterVia)** - Bypass whitelist restrictions, Screenshot protection, Block components, One-tap theme switching etc. `FOSS` `[LSP]`

#### Yandex Music Mods
- **[Yandex Music Downloader](https://github.com/errorman-awful/YMDownloaderXposed)** - Download flac Music from Yandex Music app. `Proprietary` `[LSP]`


### Social Media Mods
#### Bilibili Mods
- **[MBGA](https://github.com/cledwynl/mbga/)** - Add various features to Bilibili. `FOSS` `[LSP]`

#### Discord Mods
- **[BunnyXposed](https://github.com/bunny-mod/BunnyXposed)** - A mod for Discord's mobile apps. `FOSS` `[LSP]`
- **[Revenge](https://github.com/revenge-mod/revenge-bundle-next)** - Revenge is a client modification for Discord Android. `FOSS`

#### Facebook Mods
- **[Chat Head Enabler](https://github.com/NeonOrbit/ChatHeadEnabler)** - Lets you choose between chat head and bubble in Facebook Messenger. `FOSS` `[LSP]`

#### Instagram Mods
- **[InstaEclipse](https://github.com/ReSo7200/InstaEclipse/)** - Adds Features like Developer Options, Ghost Mode, Ad-Free browsing, and Distraction-Free Mode to Instagram. `FOSS` `[LSP]`

#### Line Mods
- **[LineXtra](https://github.com/yagiyuu/LineXtra)** - Removes Ads and Tabs from the LINE. `FOSS` `[LSP]`

#### QQ Mods
- **[NewQStory](https://github.com/Xposed-Modules-Repo/lin.xposed/)** - Xposed QQ module. `Proprietary` `[LSP]`
- **[QAuxiliary](https://github.com/cinit/QAuxiliary)** - Xposed module based on QNotified. `FOSS` `[LSP]`
- **[TCQT Module](https://github.com/callng/TCQT)** - An Xposed module designed for Android QQ/TIM clients, which is used to intercept and retain messages that would otherwise be "retracted". `FOSS` `[LSP]`
- **[XAutoDaily](https://github.com/LuckyPray/XAutoDaily)** - Various tweaks for QQ. `FOSS` `[LSP]`

#### Reddit Mods
- **[Patcheddit](https://github.com/wchill/patcheddit)** - Custom patches with features like view: deleted Reddit posts & comments,Banned subreddits etc. Requires [Morphe App ↗](https://morphe.software/). `FOSS`
- **[Reddidn’t](https://modules.lsposed.org/module/com.wizpizz.reddidnt/)** - Dynamically finds methods within the Reddit app responsible for displaying ads and blocks them. [Warning](https://github.com/awesome-android-root/awesome-android-root/issues/71#issue-3327852351) `Proprietary` `[LSP]`

#### Telegram Mods
- **[Re-Telegram](https://github.com/Sakion-Team/Re-Telegram/)** - Adds features like AntiAntiForward, AntiRecall, NoSponsoredMessages, ProhibitChannelSwitching and many more to various Telegram clients. `FOSS` `[LSP]`
- **[Telegram Speed Hook](https://github.com/araafroyall/Telegram-Speed-Hook)** - Increase Telegram speed. `FOSS` `[LSP]`
- **[Telegram Tweaks](https://github.com/Xposed-Modules-Repo/ru.mike.sidestories)** - Remove action bar stories in the Telegram messenger (+block unmute button). `Proprietary` `[LSP]`
- **[TeleVip](https://github.com/Xposed-Modules-Repo/com.my.televip/)** - A module for modifying Telegram with hide seen status, unlocking channel restrictions etc. `Proprietary` `[LSP]`
- **[TMoe](https://github.com/cinit/TMoe)** - Adds various tweaks to various Telegram clients. `FOSS` `[LSP]`

#### WeChat Mods
- **[MaskWechat](https://github.com/Mingyueyixi/MaskWechat)** - Hide the chat records of specific users to prevent private chats from being peeked by third parties. `FOSS` `[LSP]`
- **[NewMiko](https://modules.lsposed.org/module/im.mingxi.miko/)** - Various tweaks related to  WeChat app. `Proprietary` `[LSP]`
- **[WeChat Auxiliary](https://github.com/HdShare/WAuxiliary_Public)** - Various tweaks for WeChat. `Proprietary` `[LSP]`
- **[WePadBridge](https://github.com/libingtong/WePadBridge)** - Enables tablet interface and features in WeChat Work mobile app. `FOSS` `[LSP]`
- **[X](https://github.com/Xposed-Modules-Repo/cn.android.x)** - Add extra features to WeChat. `Proprietary` `[LSP]`

#### Weibo Mods
- **[WeiboHelper](https://github.com/Xposed-Modules-Repo/com.skyhand.sinahelper)** - Remove all available advertisements and recommendations from Weibo. `Proprietary` `[LSP]`

#### WhatsApp Mods
- **[⭐ WA Enhancer](https://github.com/Dev4Mod/WaEnhancer)** - Enhances your WhatsApp experience. `FOSS` `[LSP]`
- **[WA Revamp](https://github.com/Xposed-Modules-Repo/its.madruga.warevamp)** - Add various functions like download status and view once, hide read messages, statuses and archived chats to official WhatsApp. `Proprietary` `[LSP]`

#### X/Twitter Mods
- **[⭐ Hachidori](https://github.com/Xposed-Modules-Repo/com.twifucker.hachidori/)** - Adds downloading media, hiding ads and other privacy features to X (formerly Twitter). `Proprietary` `[LSP]`

#### YouTube, YT Music Mods
- **[RevancedXposed](https://github.com/chsbuffer/RevancedXposed)** - YouTube, YT Music block ads, background playback, sponsorblock and much more. Also unlocks premium features of Strava and Photomath. Unlimited Google Photos backup. `FOSS` `[LSP]`
> Also check out [Revanced section](#revanced)

[↑ Back to top](#table-of-contents)

### Keyboard Mods
- **[Keyboard GPT](https://github.com/Mino260806/KeyboardGPT)** - Lets you integrate Generative AI like ChatGPT in keyboard. `FOSS` `[LSP]`
- **[Rboard Theme Manager](https://github.com/DerTyp7214/RboardThemeManagerV3)** - A customizable manager app for Google Gboard that allows users to download, apply, and manage various themes and sound settings. `FOSS` `[LSP]`

### Patching Tools
- **[Lucky Patcher](https://www.luckypatchers.com/)** - App patcher and modifier (use with caution). `Proprietary`


### Morphe

> [!IMPORTANT]
> Recently a lot of revanced original dev have left the project due to internal conflicts and new project called **[Morphe](https://morphe.software/)** has been started by some of the original revanced devs. We recommend checking out Morphe as well for future updates.

- **[⭐ Morphe](https://morphe.software/)** - A next-generation app patcher built by some of the original ReVanced developers. It offers a modern interface, enhanced stability, and a growing list of supported apps and features. `FOSS`


<details>
<summary>For more details click me</summary>

- [What happened](https://www.reddit.com/r/BoostForReddit/comments/1q2he9s/fyi_migration_to_morphe/)
- [Announcement](https://www.reddit.com/r/Piracy/comments/1q1we4e/the_revanced_situation_is_crazy_a_new_project/)
- [More info here](https://www.reddit.com/r/revancedextended/comments/1q1rjdd/do_you_want_to_know_what_happened_to_inotia/)

</details><br>


### ReVanced

> [!NOTE]
> ReVanced allows you to patch apps without root, but root access enables additional features like mounting patched apps as system apps.

- **[Awesome ReVanced](https://github.com/Jman-Github/Awesome-ReVanced)** - A curated list of awesome ReVanced patches, resources and projects. `FOSS` `[R]`
- **[Privacy ReVanced Patches](https://github.com/jkennethcarino/privacy-revanced-patches)** - Privacy Patches for ReVanced to disable ads, trackers and analytics, always open Gboard in incognito mode, and much more. Enhances your [privacy](#privacy-and-security). `FOSS` `[R]`
- **[ReVanced Manager](https://github.com/ReVanced/revanced-manager)** - Modify YouTube, YouTube Music, Spotify and many more with additional features. `FOSS` `[R]`
- **[ReVancedRepackaged](https://github.com/programminghoch10/ReVancedRepackaged)** - This magisk module contains only the ReVanced Patcher.It will patch any installed ReVanced compatible app right on your device during installation. `FOSS` `[M]` `[R]`

### Misc App Mods
- **[Boosteroid+](https://github.com/nitanmarcel/BoosteroidPlus)** - Customize advanced settings for the Boosteroid app, including frame rate, bitrate, and resolution options. `FOSS` `[LSP]`
- **[EDS NG Crack](https://github.com/dumbasPL/EDS-NG-crack)** - Unlocks all features in in [EDS NG](https://play.google.com/store/apps/details?id=com.sovworks.projecteds&hl=en_US). `FOSS` `[M]`
- **[E-Government Liberator](https://github.com/Crazyphil/digitales-amt-liberator)** - Removes root and bootloader checks from e-government apps. `FOSS` `[LSP]`
- **[Freely module](https://modules.lsposed.org/module/me.build/)** - Compatible with mainstream social and short video applications (such as WeChat, Tik Tok, Soul, etc.), and is designed to improve the user experience and functional freedom. `Proprietary` `[LSP]`
- **[F*ck for VIP](https://github.com/bug-bit/fckvip)** - A module to unlock some software memberships and remove ads. Check releases section for list of supported apps. `Proprietary` `[LSP]`
- **[JunZi Xposed Hook](https://github.com/Xposed-Modules-Repo/junzi.xposed.hook/)** - Software hooks in PicsArt, AudioLab, ES File Explorer, Cosmic Toolbox etc. `Proprietary` `[LSP]`
- **[NewHookVip](https://github.com/Xposed-Modules-Repo/top.hookvip.pro)** - Unlock some app memberships and adding some extended functions. Check releases section for list of supported apps. `Proprietary` `[LSP]`
- **[Smule Mod](https://github.com/michei69/SmuleXposed)** - A Smule Xposed module which enables free VIP and many other features. `FOSS` `[LSP]`
- **[Wallet Tweaks](https://github.com/Xposed-Modules-Repo/ru.mike.wallettweaks/releases)** - UI tweaks for Google Wallet. `Proprietary` `[LSP]`

[↑ Back to top](#table-of-contents)

---


## Audio and Media

**Audio Enhancement:**
- **[Audio Modification Library Ryuki Mod](https://github.com/reiryuki/Audio-Modification-Library-Ryuki-Mod-Magisk-Module)** - Enables supported audio mods to share the same needed files, such as audio_effects. `FOSS` `[M]`
- **[JamesDSP](https://github.com/james34602/JamesDSPManager)** - Audio DSP effects built on the Android system framework layer. This repository contains a pack of high-quality DSP algorithms specialized for audio processing. `FOSS` `[M]`
- **[NLSound](https://github.com/Briclyaz/NLSound_module_QCom)** - Magisk module for improving audio and microphone quality in your Snapdragon SoC device. `FOSS` `[M]`
- **[ViPER4Android FX Redesign](https://github.com/WSTxda/ViperFX-RE-Releases)** - Allows improving the audio quality by offering features such as equalizer settings, surround sound effects, bass boost, and more. `Proprietary` `[M]`
- **[ViPER4AndroidRepackaged](https://github.com/programminghoch10/ViPER4AndroidRepackaged)** - Contains many usability enhancements and all the major fixes needed to run ViPER4Android on modern ROMs effortlessly. `FOSS` `[M]`

**Audio Control and Management:**
- **[Audio jitter silencer](https://github.com/Magisk-Modules-Alt-Repo/audio-jitter-silencer)** - For avoiding distortion on all digital audio outputs, it disables audio jitter generators (w.r.t. battery draining and optimizations, and wireless connectivity). `FOSS` `[M]`
- **[DisableAudioFocus](https://github.com/auag0/DisableAudioFocus)** - Allows you to disable audio focus, enabling you to play multiple videos and audios simultaneously. `FOSS` `[LSP]`
- **[LibrePods](https://github.com/kavishdevar/librepods)** - Unlocks Apple's exclusive premium AirPods features on non-Apple devices. `FOSS` `[LSP]` `[M]` `[K]`
- **[Lower Minimum Volume](https://github.com/dxwil/Lower-Minimum-Volume)** - Lower the minimum volume of media from the device's speakers. `FOSS` `[M]`
- **[XAudioCapture](https://github.com/Xposed-Modules-Repo/io.github.wzhy.xaudiocapture)** - Lets you capture any audio stream you desire, bypassing these restrictions. `Proprietary` `[LSP]`

**Audio Configuration:**
- **[Audio Misc Settings](https://github.com/Magisk-Modules-Alt-Repo/audio-misc-settings)** - For setting miscellaneous audio configuration values (media audio volume steps (100 steps), raising the resampling quality, disabling the effects framework, etc.) `FOSS` `[M]`
- **[Audio SampleRate Changer](https://github.com/Magisk-Modules-Alt-Repo/audio-samplerate-changer)** - A Magisk module changing audio sample rates at the system-wide mixer for the best Hi-Fi experience. `FOSS` `[M]`
- **[Hi-Res Audio Enabler](https://github.com/reiryuki/Hi-Res-Audio-Enabler-Magisk-Module)** - Enables high resolution 24 or 32-bit width audio output if device is supported. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)

---

## Automation and Scheduling
- **[⭐ MacroDroid](https://play.google.com/store/search?q=macrodroid&c=apps)** - Easy to use automation app. `Proprietary`
- **[⭐ Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)** - An advanced and powerful automation app. `Proprietary`
- **[Automate](https://play.google.com/store/apps/details?id=com.llamalab.automate)** - Lets you create custom automation workflows using flowcharts, enabling seamless management of tasks, files, and device settings. `Proprietary`
- **[crond4Android](https://github.com/powerAn2020/crond4android)** - The Crond program that supports running on KernelSU, APatch and Magisk. `FOSS` `[M]` `[K]`

[↑ Back to top](#table-of-contents)

---

## Backup and Restore
- **[DataBackup](https://github.com/XayahSuSuSu/Android-DataBackup)** - DataBackup for Android 7.0+. `FOSS` | [🌱](https://f-droid.org/zh_Hans/packages/com.xayah.databackup.foss/)
- **[DiskDigger](https://play.google.com/store/apps/details?id=com.defianttech.diskdigger)** - A powerful data recovery tool for Android devices. `Proprietary`
- **[Dumpster: Photo/Video Recovery](https://play.google.com/store/apps/details?id=com.baloota.dumpster)** - You can recover deleted videos, restore photos, undelete recently deleted apps, and other files. `Proprietary`
- **[Neo Backup](https://github.com/NeoApplications/Neo-Backup)** - Powerful open-source backup solution. `FOSS` | [🌱](https://f-droid.org/packages/com.machiav3lli.backup/)
- **[Partition Backup](https://github.com/rhythmcache/partition-backup)** - This Utility Allows You To Save Android Device Partition. `FOSS` `[M]`
- **[Swift Backup](https://play.google.com/store/apps/details?id=org.swiftapps.swiftbackup)** - Modern backup solution with cloud support. `Proprietary`

[↑ Back to top](#table-of-contents)

---

## Battery and Power Management

### Battery Optimization
- **[Battery Guru](https://play.google.com/store/apps/details?id=com.paget96.batteryguru)** - Battery optimization and monitoring. `Proprietary`
- **[Battery Honey](https://github.com/kaminarich/BatteryHoney)** - Optimize Battery Saving when screen OFF. `FOSS` `[M]`
- **[Doze Disabler](https://github.com/draumaz/dozedisabler)** - A Magisk module that disables Doze battery optimizations at boot time. `FOSS` `[M]`
- **[Drowser](https://gitlab.com/juanitobananas/drowser)** - Drowser is a simple app that kills the apps you select when the screen turns off. `FOSS` | [🌱](https://f-droid.org/app/com.jarsilio.android.drowser)
- **[EnforceDoze](https://github.com/farfromrefug/EnforceDoze)** - Enable Doze mode immediately after screen off and turn off motion sensing to get best battery life. `FOSS` | [🌱](https://f-droid.org/packages/com.akylas.enforcedoze/)
- **[LSPDoze](https://github.com/Xposed-Modules-Repo/com.op.lspdoze)** - Optimizes your standby battery life. `Proprietary` `[LSP]`
- **[NoWakeLock](https://github.com/NoWakeLock/NoWakeLock)** - An application that controls Android wakelocks can run on Android N and later. `FOSS` `[LSP]`
- **[Plus Plus Battery](https://github.com/dijia1124/plusplusbattery)** - Real-time battery stats & health estimator for OnePlus/Oppo/Realme phones. `FOSS` | [🌱](https://f-droid.org/en/packages/com.dijia1124.plusplusbattery/)
- **[Realme-GT3-neo5-CPU-limiter](https://github.com/Quantom2/Realme-GT3-neo5-CPU-limiter)** - A Magisk/KSU based module to slow down your CPU to make your screen time better. `FOSS` `[M]` `[K]`
- **[SaverTuner](https://codeberg.org/s1m/savertuner)** - Allows you to take advantage of this built-in battery saver. You can now set different profiles that save the battery more or less aggressively. [Does not work on Xiaomi](https://codeberg.org/s1m/savertuner/issues/98#issuecomment-5777054). `FOSS` | [🌱](https://f-droid.org/packages/s1m.savertuner/)
- **[Xtreme-Battery-Saver](https://github.com/Magisk-Modules-Alt-Repo/Xtreme-Battery-Saver)** - An extreme battery saver Magisk Module for users who want to really stretch their battery life. `FOSS` `[M]`

### Background App Control
- **[Background App Slayer (BAS)](https://github.com/UNKNUW/Background-App-Slayer)** - Automatic Killing Background apps. `FOSS` `[M]`
- **[DeepSuppressor](https://github.com/Aurora-Nasa-1/DeepSuppressor)** - Background process management tool to monitor and control application processes. `FOSS` `[M]`
- **[Greenify4Magisk/KSU Reborn](https://github.com/Drsexo/Greenify4Magisk-KSU-Reborn)** - Integrates Greenify as a privileged system app to enable Boost Mode, enhancing hibernation performance without modifying the ROM. `FOSS` `[M]` `[K]`
- **[Shappky](https://github.com/YasserNull/shappky)** - A simple app to boost performance by stopping background apps, relying on Root/Shizuku permissions. `FOSS` `[M]`

### Charging and Power Control
- **[AccA](https://github.com/VR-25/acc)** - Advanced Charging Controller app. `FOSS`
- **[Charging Bypass](https://github.com/AbhishekTor55/charging-bypass-magisk)** - Disables charging when screen is ON and re-enables when OFF. Useful for gaming/dev use. `FOSS` `[M]`
- **[FastCharge Next](https://github.com/Dev97633/Fastcharge-next)** - Boost charging speed with smart tweaks. `FOSS` `[M]`

### Google Services Optimization
- **[⭐ Universal GMS Doze](https://github.com/gloeyisk/universal-gms-doze)** - Patches Google Play services app and certain processes/services to be able to use battery optimization. `FOSS` `[M]`
- **[Extreme GMS Doze](https://github.com/Skyghost090/Extreme-Gms-Doze)** - Intelligently kills Google Play Services when your screen is turned off, dramatically boosting battery life. `FOSS` `[M]`
- **[GhostGMS](https://github.com/kaushikieeee/GhostGMS)** - Optimize Google Mobile Services for better battery life, privacy, and performance. `FOSS` `[M]`
- **[OOSGMS-OPTIMISER](https://github.com/epicmann24/OOSGMS-OPTIMISER)** - Optimise and remove trackers for GMS and OOS. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)

---


## Browser and Web Tools

### Browser Extensions
- **[⭐ ChromeXt](https://github.com/JingMatrix/ChromeXt)** - UserScript and DevTools support for Chromium-based and WebView-based browsers. `FOSS` `[LSP]`
- **[FoldDevtools](https://github.com/achyuki/FoldDevtools)** - Using chrome devtools to debug webview on Android. `FOSS` `[LSP]`

### Webview Mods

<details><summary><strong>What is Webview in Android?</strong></summary>

- It is a system component that **allows Android apps to display web content directly within the application**, essentially embedding a mini-browser within the app itself.

</details>

- **[AnyWebView](https://github.com/neoblackxt/AnyWebView)** - Tries to detect all system webviews and add them to the developer options -> WebView implementation list. `FOSS` `[LSP]`
- **[Open WebView](https://github.com/Magisk-Modules-Alt-Repo/open_webview)** - Helps you to replace your system webview through Magisk. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)

---

## Communication and Messaging

### Call Recording
- **[Basic Call Recorder](https://github.com/chenxiaolong/BCR)** - A Basic Call Recorder for rooted Android devices. Also check out [GUI for BCR ↗](https://github.com/nicorac/bcr-gui). `FOSS` `[M]` `[K]`
- **[Call Recorder - SKVALEX](https://github.com/Magisk-Modules-Repo/callrecorder-skvalex)** - Call recording app to record both sides from the line with a power of root and magisk. `FOSS` `[M]`

### Contact Management
- **[Contacts Sync](https://play.google.com/store/apps/details?id=com.lb.contacts_sync)** - Uses root to sync your address book with high-quality contacts photos from WhatsApp. `Proprietary`

### SMS and Messaging
- **[NekoSMS](https://github.com/apsun/NekoSMS)** - A pattern-based text message blocker for Android. `FOSS` `[LSP]`
- **[XposedForwardSms](https://github.com/XiaoMiHongZhaJi/XposedForwardSms)** - Forward text messages. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

---

## Customization and Theming

### Boot and Startup
- **[Bootanimation](https://github.com/Bitterneko/Bootanimation)** - A custom boot animation for Android. `Proprietary` `[M]`
- **[Live Boot](https://play.google.com/store/apps/details?id=eu.chainfire.liveboot)** - Get a Linux-like live boot screen on Android. `Proprietary`
- **[Live Boot Module](https://github.com/symbuzzer/livebootmodule)** - Enables unix-style (verbose) boot animation for Android devices. `FOSS` `[M]` `[K]`
- **[Samsung Boot Animation Module](https://github.com/John0n1/SMbootFX)** - Custom boot animations for Samsung devices via Magisk. `FOSS` `[M]`
- **[video-to-bootanimation](https://github.com/Magisk-Modules-Alt-Repo/video-to-bootanimation)** - A Magisk Module Which Can Set Videos as Android Device BootAnimation. `FOSS` `[M]`


### Digital Assistants
- **[SwitchAI – Switch AI Digital Assistant](https://github.com/WSTxda/SwitchAI)** - Easily select, start, and manage your preferred AI digital assistants. `FOSS`

### Fonts
- **[EvilFont](https://github.com/dedeadend/EvilFont)** - Cange your Arabic/Persian font to Teshrin + IOS emojis. `FOSS` `[M]` `[K]`
- **[FontCraft Pro](https://github.com/RipperHybrid/FontCraft)** - Stylish fonts & emojis for a personalized experience. `FOSS` `[M]` `[K]`
- **[FontLoader](https://github.com/JingMatrix/FontLoader)** - Modifying fonts is a common scenario using the Magisk module. `FOSS` `[M]`
- **[Font Manager](https://play.google.com/store/apps/details?id=com.androidacy.fontmanager)** - A great font and emoji changer by Androidacy. `Proprietary`
- **[G-Font Installer](https://xdaforums.com/t/development-magisk-module-g-font-installer.4617743/)** - Install Official Google font that is used in most Google apps like Google play and Google Pixel phones right to your phone. `Proprietary` `[M]`
- **[JetBrains Font](https://github.com/Mars-Wave/jetbrains-font-magisk-module)** - Make your phone prettier with jetbrains mono and magisk. `FOSS` `[M]`
- **[Magisk Fonts](https://github.com/JingMatrix/MagiskFonts)** - Add custom fonts to Android for system-wise usage. `FOSS` `[M]`
- **[Magisk-Minecraft-Font](https://github.com/DethByte64/Magisk-Minecraft-Font)** - A Magisk Module that changes your default font to the Minecraft font. `FOSS` `[M]`
- **[MiSans](https://github.com/adivenxnataly/MiSans)** - Enhance your font devices with MiSans. `FOSS` `[M]`
- **[Nastaliq Urdu Font](https://xdaforums.com/t/module-font-nastaliq-urdu-font.4645787/)** - Nastaleeq Font Module for Urdu Users. `FOSS` `[M]`
- **[Unicode Font Set](https://github.com/Losketch/UnicodeFontSet-magisk-module/blob/main/README.en.md)** - Installs a comprehensive Unicode font set and configuration files via the Magisk framework. `FOSS` `[M]`
- **[zFont 3](https://play.google.com/store/apps/details?id=com.htetznaing.zfont2&hl=en)** - Change custom font styles on Samsung, Vivo, iQOO, LG, Huawei, Honor, OnePlus, ASUS, OPPO, Realme, Xiaomi, Tecno, and Infinix devices. `Proprietary`

### Emojis
- **[Emoji Replacer](https://play.google.com/work/apps/details?id=com.htetz.emojireplacer)** - Swap system emojis with styles from iOS 16.4, Samsung, Google, JoyPixels, Facebook, Twemoji etc. `Proprietary`
- **[KernelSU-iOS-Emoji](https://github.com/n4bi10p/Ios-emoji)** - Systemlessly replaces emoji font with iOS Emoji. `FOSS` `[K]`
- **[Magisk-iOS-Emoji](https://github.com/Keinta15/Magisk-iOS-Emoji)** - Systemlessly replaces the emoji font with iOS Emoji. `FOSS` `[M]`
- **[OneUI Emoji Pack](https://github.com/aloozchips/OneUIEmojiPack)** - Systemlessly replaces the AOSP emoji pack with the OneUI emoji pack. `FOSS` `[M]` `[K]`
- **[Twemoji-Remastered](https://codeberg.org/Snowy/Twemoji-Remastered)** - Systemlessly replaces your phone emojis with Twemoji (Twitter Emoji). `FOSS` `[M]`

### Themes and Visual Mods
- **[ColorBlendr](https://github.com/Mahmud0808/ColorBlendr)** - Customize Material You colors of your device. `FOSS` | [🌱](https://f-droid.org/en/packages/com.drdisagree.colorblendr/)
- **[Global Icon Pack](https://github.com/RichardLuo0/global-icon-pack-android)** - Apply icon packs globally. `FOSS` `[LSP]`
- **[Iconify](https://github.com/Mahmud0808/Iconify)** - Customize your Android 12+ device easily. `FOSS` `[M]` `[EOL]`
- **[Project Themer](https://play.google.com/store/apps/details?id=com.drsants.eggproject)** - Provides tools and features for rooted devices. `Proprietary` `[M]`

[↑ Back to top](#table-of-contents)

---

## Launchers and Home Screen

- **[⭐ Lawnchair](https://github.com/Goooler/LawnchairRelease/)** - A customizable launcher offering a Pixel-like experience. `FOSS`
- **[Google Shortcuts Launcher](https://github.com/WSTxda/Google-Shortcuts-Launcher)** - Easily access essential Google apps features directly from your launcher app drawer. `FOSS`
- **[Pixel Launcher Enhanced](https://github.com/Mahmud0808/PixelLauncherEnhanced)** - Unlock a variety of exciting features including customizing the look to adding more functionality and many more. `FOSS` `[LSP]`
- **[Pixel Launcher Mods](https://github.com/KieronQuinn/PixelLauncherMods/)** - Mods for enhancing the Pixel Launcher experience. `FOSS`
- **[Root Activity Launcher](https://play.google.com/store/apps/details?id=tk.zwander.rootactivitylauncher)** - Launch activities directly from your home screen with root access. `Proprietary`
- **[NovaInstaller](https://github.com/Minionguyjpro/NovaInstaller/)** - Installs Nova Launcher to /system/app/ on Android. `FOSS`
  
[↑ Back to top](#table-of-contents)

---

## Gestures and Navigation

- **[Hide Navbar Keyboard](https://github.com/UNKNUW/Hide-Navbar-Keyboard)** - Hide navbar when keyboard appears. Supports Android 10 -15+. `FOSS` `[M]`
- **[NavTweaks](https://github.com/Magisk-Modules-Alt-Repo/HideNavBar)** - Fullscreen/Immersive Gesture Tweaks for Android 10-14. `FOSS` `[M]`
- **[QS Boundless Tiles](https://github.com/hxreborn/qs-boundless-tiles)** - Keeps third-party Quick Settings tiles responsive on Android 13+. `FOSS` `[LSP]`
- **[Three-Finger-Screenshot](https://github.com/MeowDump/Three-Finger-Screenshot)**- 3-Finger Screenshot Gesture KSU/Magisk Module. `FOSS` `[M]` `[K]`
- **[Volume Key Track Control Module](https://github.com/Hepolise/VolumeKeyTrackControlModule)** - Allows to skip and play/pause track with volume keys. `FOSS` `[LSP]`
- **[Volume Scroll](https://github.com/farfromrefug/VolumeScroll)** -  Android app to scroll using volume keys. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)

---

## Notifications and UI Elements

- **[Notification Code](https://gitlab.com/n00byara/NotificationCode)** - Automatically extracting authentication codes and other useful information from notifications. `FOSS` `[LSP]`
- **[Notification Icon Fix](https://github.com/Xposed-Modules-Repo/io.github.howard20181.notificationiconfix/)** - A module for AOSP, MIUI and HyperOS. Using an algorithm to convert white notification icons into recognizable icons. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

---

## OS-Specific Customization

|  | | | | | | | |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| [AOSP](#aosp-android-open-source-project) | [ColorOS](#coloros-oppo) | [HyperOS](#hyperos-xiaomi) | [NothingOS](#nothingos) | [OneUI](#one-ui-samsung) | [Onyx](#onyx) | [OxygenOS](#oxygen-os-oneplus) | [ZUI](#zui) |
|  | | | | | | | |

#### AOSP (Android Open Source Project)
- **[⭐ PixelXpert](https://github.com/siavash79/PixelXpert)** - A mixed Xposed+Magisk module, which is made to allow customizations that are not originally designed in AOSP. `FOSS` `[M]` `[LSP]`
- **[PIXELIFY NEXT](https://github.com/BasGame1/Pixelify-Next)** - A Magisk Module which enables Pixel UI and some exclusive features. `FOSS` `[M]`
- **[PixelUpdater](https://github.com/PixelUpdater/PixelUpdater)** - Pixel Updater is an app for installing Android A/B OTA updates from Google's OTA server. `FOSS` `[M]`

#### ColorOS (Oppo)
- **[Breeno Source Changer](https://github.com/Xposed-Modules-Repo/com.niki.breeno.openai/tree/main)** - Allows ColorOS's Breeno Assistant to change its AI model source and customize large language model (LLM) APIs. `FOSS` `[LSP]`
- **[OPCameraPro](https://github.com/Xposed-Modules-Repo/com.tlsu.opluscamerapro)** - ColorOS and realmeUI module providing various AI functions, enhancing cameras and other photo related tweaks. `Proprietary` `[LSP]`
- **[ColorOS Feature Enhance](https://github.com/ItosEO/ColorFeatureEnhance)** - Visually edit and managing ColorOS feature switches. `FOSS` `[LSP]`
- **[LuckyTool](https://github.com/Xposed-Modules-Repo/com.luckyzyx.luckytool/blob/main/README_EN.md)** - Extended functionality and optimization module for ColorOS. `Proprietary` `[LSP]`
- **[Oplus Launcher Radius Optimization](https://github.com/Qjj7679/Oplus-Luncher-RadiusOptimization)** - Optimize the rounded corners of the recent tasks card on the ColorOS system desktop. `FOSS` `[LSP]`
- **[OPPO/OnePlus side button enhancement](https://github.com/ItosEO/OplusKey)** - Customize the side button behavior on Oppo and OnePlus devices. `Proprietary` `[M]`
- **[OShin](https://github.com/suqi8/OShin/blob/master/README_EN.md)** - Auxiliary module deeply integrated with ColorOS, designed to enhance and optimize your operating system experience. `FOSS` `[LSP]`

#### HyperOS (Xiaomi)
- **[⭐ HyperCeiler](https://github.com/ReChronoRain/HyperCeiler/blob/main/README_en-US.md)** - Extensive customizations for HyperOS. `FOSS` `[LSP]`
- **[Better Miui Express](https://github.com/Robotxm/BetterMiuiExpress)** - Prevents MIUI/HyperOS's express widget from jumping to third-party applications such as Taobao and Cainiao, and uses a customized interface to display express details. `FOSS` `[LSP]`
- **[ClipboardList](https://github.com/HChenX/ClipboardList/blob/master/README-en.md)** - Remove the 20-item limit and time limit for the Clipboard and Phrases feature. Only for MIUI and HyperOS. `FOSS` `[LSP]`
- **[ColorOS_Control_Center](https://github.com/Mods-Center/ColorOS_Control_Center)** - Replace HyperOS control panel with ColorOS-style quick settings, featuring customizable and squared tiles. `Proprietary`
- **[GreenDotHide](https://github.com/Dorian399/GreenDotHide)** - Hides the green dot indicating sensitive permission use. Works only on MIUI/HyperOS. `FOSS` `[LSP]`
- **[Hyper Monet Icon Theme](https://github.com/AcardiaX/HyperMonetIconTheme/blob/main/README_en.md)** - Enables Material You Monet style icons for HyperOS. `FOSS` `[M]`
- **[Hyper 5G Switch](https://github.com/buffcow/Hyper5GSwitch)** - Add a 5G switch to the mobile network panel, only for devices that support 5G net and equipped with HyperOS. `FOSS` `[LSP]`
- **[Hyper Helper](https://github.com/HowieHChen/XiaomiHelper/blob/master/README_EN-US.md)** - Lightweight customization module for HyperOS only. `FOSS` `[LSP]`
- **[Hyper Optimize](https://github.com/TatshSiow/HyperOptimize)** - Tune HyperOS System and Kernel parameters to reduce power consumption. `FOSS` `[M]`
- **[HyperStar](https://github.com/YunZiA/HyperStar/blob/master/README_EN-US.md)** - An LSPosed module mainly designed to customize the Xiaomi HyperOS Control Center, along with some features. `FOSS` `[LSP]`
- **[Hyper Unlocked](https://github.com/ukriu/HyperUnlocked)** - Unlock all high-end features possible to be unlocked on low-end xiaomi devices. `FOSS` `[M]`
- **[Lite Blur Control Center For HyperOS2](https://github.com/fakerieh/Lite-Blur-Control-Center-For-HyperOS2)** - Control Center Blur for HyperOS2 but LIGHTER. `FOSS` `[M]`
- **[MiNavBarImmerse](https://github.com/Ianzb/MiNavBarImmerse)** - Optimizes the Xiaomi NavBar immersion by replacing the NavBar configuration file of third-party applications built into Xiaomi HyperOS 2.2. `FOSS` `[LSP]`
- **[MIUIPerfSaver](https://github.com/rdtoy/MIUIPerfSaver)** -  Remove MIUI's performance limit, run app at maximum FPS. `FOSS` `[LSP]`
- **[Pengeek](https://github.com/monwf/customiuizer)** - Customize your HyperOS to your liking. For HyperOS based on Android 14. `FOSS` `[LSP]`

##### HyperOS Mods
- **[HyperOS App Vault](https://github.com/Mods-Center/HyperOS-App-Vault)** - Enhanced HyperOS App Vault with unlocked widgets, high-end device features, blur adjustments, and scrolling animations.  `Proprietary` `[M]` `[K]`
- **[HyperOS AOD](https://github.com/Mods-Center/HyperOS-AOD)** - Enhanced HyperOS AOD and Lock Screen Editor app with unlocked features. `Proprietary` `[M]` `[K]`
- **[HyperOS Launcher](https://github.com/Mods-Center/HyperOS-Launcher#hyperos-launcher-v5)** - Enhanced HyperOS Launcher with features from high-end devices, including customizable app drawer, icon packs, and more. `Proprietary` `[M]` `[K]`
- **[HyperOS Security Center](https://github.com/Mods-Center/HyperOS-Security-Center)** - Advanced app info tools, system app Wi-Fi management, removal of root/account restrictions etc. `Proprietary` `[M]` `[K]`
- **[HyperOS Theme Manager](https://github.com/Mods-Center/HyperOS-Theme-Manager)** - Multi-theme servers, premium themes, AI wallpapers, third-party imports, super icons/widgets etc. `Proprietary` `[M]` `[K]`
- **[FPS Limitations Patcher](https://github.com/Mods-Center/FPS-Limitation-Patcher)** - Removes FPS limitations in system apps and games on HyperOS. `Proprietary` `[M]` `[K]`

> [!TIP]
> Check this resource for more [HyperOS Mods ↗](https://github.com/ImKKingshuk/Awesome-HyperOS)

#### NothingOS
- **[Nothing EUICC Force Enabler](https://github.com/reindex-ot/nothing-euicc#note-english)** - Forcibly enables eSIM on Nothing devices that do not officially support it. `FOSS` `[M]`

#### One UI (Samsung)
- **[⭐ KnoxPatch](https://github.com/salvogiangri/KnoxPatch)** - Get Samsung apps/features working again in your rooted Galaxy device. For better experience, please also [read this ↗](https://github.com/salvogiangri/KnoxPatch?tab=readme-ov-file#knoxpatch-enhancer) . `FOSS` `[LSP]`
- **[Samsung Dex Standalone Mode](https://github.com/supermarsx/magisk-samsung-dex-standalone-mode)** - Systemlessly enable Samsung DeX standalone mode. `FOSS` `[M]`

#### Onyx
- **[OnyxTweaks](https://github.com/timschneeb/OnyxTweaks)** -  Xposed module for Onyx Boox e-Ink devices with Android 12.It adds other mods to the SystemUI, Android Framework, and Onyx Launcher. `FOSS` `[LSP]`
  
#### Oxygen OS (OnePlus)
- **[Enable local installation for OPlus OTA updates](https://github.com/Houvven/OLocalnstall)** - Enable local installation for OPlus OTA updates. `Proprietary` `[LSP]`
- **[OnePlusPlusLauncher](https://github.com/wizpizz/OnePlusPlusLauncher)** - An XPosed module for the System Launcher on OnePlus' OxygenOS 15, providing extra useful features. `FOSS` `[LSP]`
- **[Oplus16 Hide Zoom Window](https://github.com/jhl337/Oplus16_HideZoomWindow)** - Hides small windows from screenshots and screen recordings (designed for ColorOS 16). `FOSS` `[LSP]`
- **[OnePlus 8 Series and 9R Camera Unlocker](https://github.com/Magisk-Modules-Alt-Repo/oneplus-8series-9r-camera-unlocker)** - Enables 48MP RAW10 capture support, both on the main (8/8T/9R) and ultra wide (8 Pro) lenses and much more. `FOSS` `[M]`
- **[OnePlus Flash Control](https://github.com/Bartixxx32/Opflashcontrol-app)** - Precise control over the brightness of the dual-tone and quad-tone LED flashes for OnePlus devices. `FOSS`
- **[Oxygen-Customizer](https://github.com/DHD2280/Oxygen-Customizer/)** - Open-source Oxygen OS customizer application. `FOSS` `[LSP]`

#### Universal
- **[SystemUI Tuner](https://github.com/zacharee/Tweaker?tab=readme-ov-file)** - View and modify hidden settings on Android devices. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)

#### ZUI
- **[Unfuck ZUI Tablet](https://github.com/Xposed-Modules-Repo/xyz.cirno.unfuckzui/)** - Adjust notification icon size, restore AOSP-style installers/permissions, enforce screen rotation persistence, and allow package querying etc. `Proprietary` `[LSP]`

[↑ Back to top](#table-of-contents)

---

## Debloating and Cleaning

> [!NOTE]
> **Related Guide**: [Complete Debloating Tutorial](../general-guides/android-apps-debloating.md)

**Cleaning Apps:**
- **[⭐ SD Maid 2/SE](https://github.com/d4rken-org/sdmaid-se)** - A file management tool for Android that specializes in maintenance. Its core purpose is freeing up space and removing unwanted data. `FOSS` | [🌱](https://f-droid.org/en/packages/eu.darken.sdmse/) | [▶️](https://play.google.com/store/apps/details?id=eu.darken.sdmse)
- **[AutoPurge Pro](https://github.com/S123123sd/SmartClear)** - Junk cleaning automation tool that provides deep cleaning and resource management capabilities for Android devices. `FOSS` `[M]` `[K]`
- **[Basic Cleaner](https://github.com/WeirdMidas/BasicCleaner)** - A magisk/KSU module that applies a set of cleanups and fixups every 7-15-30 days. `FOSS` `[M]` `[K]`
- **[Cache Cleaner Widget](https://gitlab.com/Zinaro/CacheCleanerWidget)** - A root-based widget with no UI that clears all app caches in one tap. `FOSS` | [🌱](https://f-droid.org/packages/com.zinaro.cachecleanerwidget/)
- **[Cleaner Royall](https://github.com/araafroyall/Cleaner-Royall)** - A lightweight but ultra-fast and powerful cleaner for Android. `Proprietary` `[LSP]`
- **[ClearBox](https://github.com/FLYCOM-E/ClearBox)** - Can delete all software caches, installation packages, compressed packages, garbage, empty folders etc. `Proprietary` `[M]` `[K]`
- **[Risk](https://github.com/rakarmp/Risk)** - Clean RAM Cache And Stop Background Apps, Google Apps, Third Party Apps. `FOSS` `[M]`

**Debloating Tools (Remove system Apps):**
- **[⭐ Canta](https://github.com/samolego/Canta)** - Uninstall any app without root using Shizuku (Needs [Shizuku](https://shizuku.rikka.app/) to be installed and running). `FOSS` | [🌱](https://f-droid.org/en/packages/io.github.samolego.canta/) | [▶️](https://play.google.com/store/apps/details?id=io.github.samolego.canta)
- **[De-Bloater](https://github.com/sunilpaulmathew/De-Bloater)** - An application using the power of Magisk to debloat unwanted system apps!. `FOSS` | [🌱](https://f-droid.org/packages/com.sunilpaulmathew.debloater) | [▶️](https://play.google.com/store/apps/details?id=com.sunilpaulmathew.debloater)
- **[EXA System App Remover](https://play.google.com/store/apps/details?id=exa.free.saux)** - Remove Bloatware, clear memory and speed up your phone now by uninstalling unused system apps. `Proprietary`
- **[System App Nuker](https://github.com/ChiseWaguri/systemapp_nuker)** - A module to debloat system apps with WebUI Interface. `FOSS` `[M]`
- **[System app remover](https://play.google.com/store/apps/details?id=com.jumobile.manager.systemapp)** - A system app remover and user app uninstaller, move app to sdcard, move app to phone, apk on sdcard scan/install/delete. `Proprietary`

[↑ Back to top](#table-of-contents)

---

## Development and Debugging
- **[⭐ Shizuku](https://github.com/RikkaApps/Shizuku)** - Use system APIs directly with ADB/root privileges. `FOSS` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/moe.shizuku.privileged.api) | [▶️](https://play.google.com/store/search?q=shizuku&c=apps)
- **[Bluetooth Hook](https://github.com/jingyu233/bluetoothhook#english)** - Inject virtual BLE devices into Android system Bluetooth scan results, facilitating Bluetooth application debugging for developers. `FOSS` `[LSP]`
- **[Chroot Distro](https://github.com/Magisk-Modules-Alt-Repo/chroot-distro)** - Install Gnu/Linux distributions on Android. `FOSS` `[M]`
- **[Disable usb debugging](https://github.com/Aakif17/disable_usb_debugging)** - Disables USB Debugging after every reboot. `FOSS` `[M]`
- **[Debug Assistant](https://github.com/ThePedroo/DebugAssistant)** - The simplest yet powerful logcat capture system as Magisk module. `FOSS` `[M]`
- **[Dhizuku API for Xposed](https://github.com/iamr0s/Dhizuku-API-Xposed)** - Force applications to support Dhizuku. `FOSS` `[LSP]`
- **[Disable Log Request](https://github.com/QueallyTech/DisableLogRequest)** - Automatic approve for app to access device logs (Android 13+). `FOSS` `[LSP]`
- **[IAmNotADeveloper](https://github.com/xfqwdsj/IAmNotADeveloper)** - Hide Android developer-related switches status. `FOSS` `[LSP]`
- **[Magisk Docker](https://github.com/mgksu/dockerd)** - Magisk and KernelSU module for running Docker on rooted Android devices. `FOSS` `[M]` `[K]`
- **[Py2Droid](https://github.com/Mrakorez/py2droid)** - Install Python 3 on Android, including the standard library (STDLIB). `FOSS` `[M]`
- **[Stealth Debug](https://github.com/sp11xy/StealthDebug)** - Hide USB-Debugging properties. `FOSS` `[M]`
- **[Termux](https://termux.com/)** - Advanced terminal emulator and Linux environment. `FOSS` - **[More on Termux ↓](#terminal-and-shell-tools)**
- **[Trixie.apk](https://github.com/DesktopECHO/trixie.apk)** - Debian 13 (Trixie) Server/Desktop container for rooted Android 5.0+ devices. `FOSS`
- **[Wireless ADB Switch](https://github.com/Smooth-E/wireless-adb-switch)** - Quickly enable or disable Android's Wireless Debugging feature. Includes widgets and a quick settings tile for convenience.  `FOSS` | [🌱](https://f-droid.org/ru/packages/com.smoothie.wirelessDebuggingSwitch)

[↑ Back to top](#table-of-contents)

---

## File Management
- **[⭐ MiXplorer](https://mixplorer.com/)** - Feature-rich file manager. `Proprietary`
- **[AnExplorer](https://github.com/1hakr/AnExplorer)** - A simple, Small, Fast and Efficient File Explorer. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=dev.dworks.apps.anexplorer)
- **[File Manager](https://play.google.com/store/apps/details?id=com.alphainventor.filemanager&hl=en)** - Easy and powerful file explorer for Android devices. It’s free, fast and full-featured. Because of its simple UI, it’s extremely easy to use. `Proprietary`
- **[File Manager - File Browser](https://play.google.com/store/apps/details?id=com.alc.filemanager)** - Manage your files (file explorer) like you do on your desktop or laptop using Multiple Select, Cut/Copy/Paste, Move, Create, Delete, Rename, Search etc. `Proprietary`
- **[Fossify File Manager](https://github.com/FossifyOrg/File-Manager)** - Easy app for managing your files without ads, respecting your privacy and security. `FOSS` | [🌱](https://f-droid.org/packages/org.fossify.filemanager/) | [▶️](https://play.google.com/store/apps/details?id=org.fossify.filemanager)
- **[Material Files](https://github.com/zhanghai/MaterialFiles)** - Modern file manager with root capabilities. `FOSS` | [🌱](https://f-droid.org/packages/me.zhanghai.android.files)| [▶️](https://play.google.com/store/apps/details?id=me.zhanghai.android.files)
- **[MT Manager](https://mt2.cn/)** - File Management and Reverse Engineering Tool for Android. `Proprietary`
- **[Root Explorer](https://play.google.com/store/apps/details?id=com.speedsoftware.rootexplorer)** - File manager with root access. `Proprietary`
- **[Remember My Sort](https://github.com/hxreborn/remember-my-sort)** - Forces the native Android file picker to remember your sorting preferences. `FOSS` `[LSP]` | [🌱](https://apt.izzysoft.de/packages/eu.hxreborn.remembermysort)
- **[RS File Manager File Explorer](https://play.google.com/store/apps/details?id=com.rs.explorer.filemanager)** - Free, Safe, Simple, Manage your files efficiently and easily with RS File Manager. `Proprietary`
- **[Solid Explorer](https://play.google.com/store/apps/details?id=pl.solidexplorer2)** - Powerful file manager with root support. `Proprietary`
- **[Sortify](https://github.com/xCaptaiN09/Sortify)** - Automatically organizes files in your Download folder. `FOSS` `[M]` `[K]`
- **[Total Commander](https://play.google.com/store/apps/details?id=com.ghisler.android.TotalCommander)** - A feature rich file manager for Android supporting root and shizuku. For  a better experience, please read [this](https://www.ghisler.ch/board/viewforum.php?f=22). `Proprietary`
- **[ZArchiver](https://play.google.com/store/apps/details?id=ru.zdevs.zarchiver)** - A program for archive management (including managing of application backups in archives). `Proprietary`

[↑ Back to top](#table-of-contents)

---

## Hardware and Sensors

### Control device Sensors
- **[GyroHook Project](https://github.com/AFan4724/GyroHook)** - Allows users to modify the gyroscope sensor data of Android devices. `FOSS` `[M]`
- **[Turn Off Sensors](https://github.com/KatelynTheStargazer/TurnOffSensors-Magisk)** - Disables device sensors on startup via the sensor_privacy service on Android. `FOSS` `[M]`
- **[SensorsOff](https://github.com/theLlamaNet/SensorsOff)** - Simple app to enable or disable privacy sensors(camera and microphone) on Miui/HyperOS. `Proprietary`

### Input Devices and Controllers
- **[HID Gadget Module](https://github.com/kelexine/hid-gadget-module)** - Enables Human Interface Device (HID) emulation/support on Android Devices. `FOSS` `[M]`
- **[JoyCon Droid](https://joycondroid.gitbook.io/joycondroid)** - Allows you to turn your Android device into a controller for your Nintendo Switch. `FOSS`
- **[USB HID Client](https://github.com/Arian04/android-hid-client)** - Use your phone as a keyboard and mouse without any software on the other end. `FOSS` | [🌱](https://apt.izzysoft.de/packages/me.arianb.usb_hid_client)

[↑ Back to top](#table-of-contents)

---

## Kernel Management
- **[EX Kernel Manager](https://play.google.com/store/apps/details?id=flar2.exkernelmanager)** - Root tool for backup and flashing kernels, tweaking color, sound, gestures and other kernel settings. `Proprietary`
- **[Franco Kernel Manager](https://play.google.com/store/apps/details?id=com.franco.kernel)** - A complete toolbox for all devices with a rich interface that combines everything you need to manage, tweak and empower your device. `Proprietary`
- **[Kernel Enhancer](https://github.com/RAAJK20Pro/KernelEnhancer)** - A Simple Kernel Parameters Optimization for all devices. `FOSS` `[M]`
- **[Kernel Flasher](https://github.com/fatalcoder524/KernelFlasher)** - An Android app to flash (AK3 files), backup, and restore kernels. `FOSS`
- **[Rv Kernel Manager](https://github.com/Rve27/RvKernel-Manager)** - A modern Kernel Manager with Material 3 Expressive Design. `FOSS` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/com.rve.rvkernelmanager)
- **[SmartPack-Kernel-Manager](https://github.com/SmartPack/SmartPack-Kernel-Manager)** - A Kernel Manager. `FOSS` | [🌱](https://f-droid.org/packages/com.smartpack.kernelmanager)
- **[Zuan Kernel Manager](https://github.com/ZUANVFX01/ZKM/)** - Advanced Android kernel management tool, rebuilt from the Rve Kernel Manager project base. `FOSS`

[↑ Back to top](#table-of-contents)

---

## Location and GPS
- **[GPS Setter](https://github.com/jqssun/android-gps-setter)** - Allows to mock locations for any specific app or entire system. `FOSS` `[LSP]` | [🌱](https://f-droid.org/packages/io.github.jqssun.gpssetter)
- **[Location Indicator Whitelist](https://github.com/gilbsgilbs/LocationIndicatorWhitelist)** - Prevents applications from spamming the annoying location notification dot on Android 12 +. `FOSS` `[LSP]`
- **[Hide Mock Location](https://github.com/auag0/HideMockLocation)** - Hide Mock Location Settings. `FOSS` `[LSP]`
- **[XposedFakeLocation](https://github.com/noobexon1/XposedFakeLocation)** - Allows you to spoof your device's location globally or for specific apps without using "mock location" from the developer options. `FOSS` `[LSP]`

> [!TIP]
> Also check out: [Maps Mods section](#maps-mods)

[↑ Back to top](#table-of-contents)

---

## LSPosed Framework

> [!NOTE]
> LSPosed requires root access and a [Zygisk implementation](#zygisk-implementations). See our [LSPosed installation guide](./docs/rooting-guides/lsposed-guide.md) for setup instructions.

<details><summary><strong>What is LSPosed? (Tap to expand)</strong></summary>

LSPosed allows you to use Xposed modules, which are small add-ons that can modify or extend the functionality of your Android system and apps. These modules can add features, tweak settings, and enhance the overall usability of your device.

</details>

- **[LSPosed Original](https://github.com/LSPosed/LSPosed)** - A Riru / Zygisk module trying to provide an ART hooking framework which delivers consistent APIs with the OG Xposed, leveraging LSPlant hooking framework. *Development of LSPosed has been stagnated for quite a while*
- **[LSPosed Fork(JingMatrix)](https://github.com/JingMatrix/LSPosed)** - **FORK** of original LSPosed with Android 15 & 16 support along with other improvements.
- **[ReLSPosed](https://github.com/ThePedroo/ReLSPosed)** - Fork of JingMatrix's Fork of LSPosed framework.



[↑ Back to top](#table-of-contents)

---

## Network and Connectivity

### DNS Tools
- **[ForceDNS Cloudflare](https://github.com/LuferOS/forcedns_Magisk-kernelsu)** - Forces all standard DNS traffic (port 53) to use 1.1.1.1 via iptables. Overrides network DNS. `FOSS` `[M]` `[K]`
- **[personalDNSfilter](https://github.com/IngoZenz/personaldnsfilter)** - A DNS filter proxy that provides local filtering of ads, malware, and tracking servers, supporting secure DNS protocols like DOH and DOT for enhanced privacy. `FOSS` | [🌱](https://f-droid.org/packages/dnsfilter.android/)

### Firewall Tools
- **[AFWall+](https://github.com/ukanth/afwall)** - Iptables-based firewall. `FOSS` | [🌱](https://f-droid.org/packages/dev.ukanth.ufirewall/) | [▶️](https://play.google.com/store/apps/details?id=dev.ukanth.ufirewall)
- **[Athena](https://github.com/Kin69/Athena)** - Material You (Material 3) firewall and ad blocker that works seamlessly on both rooted and non-rooted devices. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=com.kin.athena)
- **[De1984 Firewall](https://github.com/dorumrr/de1984)** - A privacy-focused Firewall and Package Manager for Android devices. `FOSS` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/io.github.dorumrr.de1984)
- **[Fyrypt](https://github.com/mirfatif/Fyrypt)** - Android firewall with UID + PID rules, dnscrypt-proxy management, and per-app live network monitoring. `Proprietary`
- **[NetGuard](https://github.com/M66B/NetGuard)** - Block access to the internet. Apps and addresses can individually be allowed or denied access to your Wi-Fi and/or mobile connection. `FOSS`

### Hotspot Tools
- **[Unlimited Hotspot](https://github.com/felikcat/unlimited-hotspot)** - Remove speed restrictions on your hotspot internet and allows hotspots on any plan. `FOSS` `[M]`
- **[VPN Hotspot](https://github.com/Mygod/VPNHotspot)** - Share your VPN connection over hotspot or repeater. `FOSS`

### Proxy Tools
- **[Aurora](https://github.com/Tkocean/Aurora)** - This project deploys sing-box, mihome proxies via Magisk, KernelSU, or APatch. `FOSS` `[M]` `[K]`
- **[Box for Root](https://github.com/taamarin/box_for_magisk)** - Box for Root (BFR) is a Magisk, KernelSU, APatch, module that provides a suite of proxy tools, including clash, sing-box, v2ray, hysteria and xray. It allows you to configure a transparent proxy on Android devices with root access. `FOSS` `[M]` `[K]`
- **[NetProxy-Magisk](https://github.com/Fanju6/NetProxy-Magisk)** - Magisk proxy module based on Xray kernel, supports one-click start/stop transparent proxy. `FOSS` `[M]`

### SSL and certificates
- **[Always Trust User Certs](https://github.com/NVISOsecurity/AlwaysTrustUserCerts)** - A Magisk/KernelSU module that automatically adds user certificates to the system root CA store. `FOSS` `[M]` `[K]`
- **[Cert-Fixer](https://github.com/pwnlogs/cert-fixer)** - Installs custom CA certificates to Android's system certificate store. `FOSS` `[M]`
- **[Just Trust Me Pro](https://github.com/hang666/JustTrustMePro)** - Disables SSL certificate checking for the purposes of auditing an app with cert pinning. `FOSS` `[M]`
- **[SSL Killer](https://github.com/Xposed-Modules-Repo/com.simo.ssl.killer)** - Bypass multiple ssl pinning implementations. `Proprietary` `[LSP]`

### Wi‑Fi Tools
- **[DriFiCrack](https://github.com/ZeltNamizake/DriFiCrack)** - Brute Force Tool to Crack Wi-Fi Passwords. `FOSS` `[M]`
- **[Magisk-WiFiADB](https://github.com/mrh929/magisk-wifiadb)** - Enable WiFi ADB automatically. `FOSS` `[M]`
- **[Wi‑Fi Passwords Exporter](https://github.com/mlm-games/wifi-exporter)** - Android app that exports wifi passwords. `FOSS`
- **[WiFi Password Viewer for MMRL](https://github.com/Googlers-Repo/wpd)** - WiFi Password Viewer for MMRL. `FOSS`

### Misc Network Tools
- **[Hosts Manager Lite](https://play.google.com/store/apps/details?id=awais.hostsmanager.lite)** - Advanced /etc/hosts editor. `Proprietary`
- **[Magisk LAN Auto Switch](https://github.com/NewFuture/magisk-modules/tree/main/magisk-lan-auto-switch)** - Automatically switch LAN and WiFi based on eth0 connection status. `FOSS` `[M]`
- **[Network Switch](https://github.com/aunchagaonkar/NetworkSwitch#installation)** - Modern Android app for 4G/5G network mode switching. `FOSS` | [🌱](https://apt.izzysoft.de/packages/com.supernova.networkswitch)
- **[Network Utilities](https://play.google.com/store/apps/details?id=com.myprog.netutils)** - Application contains a set of tools for networks diagnostics. `Proprietary`
- **[PCAPdroid](https://github.com/emanuele-f/PCAPdroid#pcapdroid)** - Lets you track, analyze and block the connections made by the other apps in your device. `FOSS` | [🌱](https://f-droid.org/packages/com.emanuelef.remote_capture) | [▶️](https://play.google.com/store/apps/details?id=com.emanuelef.remote_capture)
- **[SimbaDroid](https://github.com/buttercookie42/SimbaDroid)** - A simple SMB file server for Android. `FOSS` | [🌱](https://f-droid.org/packages/de.buttercookie.simbadroid)
- **[TCP Optimiser Module](https://github.com/fatalcoder524/TCP_Optimiser_Module)** - Change tcp congestion algorithm based on current active internet type and some network enhancements. `FOSS` `[M]` `[K]`
- **[TTLChanger](https://github.com/aleksey-saenko/TTLChanger)** - Allows you to modify the default TTL (Time to Live) value. `FOSS` | [🌱](https://f-droid.org/en/packages/com.mrsep.ttlchanger/)
- **[ZeroTier for Magisk](https://github.com/eventlOwOp/zerotier-magisk)** - Run zerotier in the background after booting with no conflicts with other Android VPN services. Use Android App to control ZeroTier. `FOSS` `[M]`
- **[ZDT&D Magisk Module](https://github.com/GAME-OVER-op/ZDT-D)** - Bypass DPI (Deep Packet Inspection) on the internet. It helps bypass service blocks and throttling for platforms like Discord, YouTube, and others. `FOSS` `[M]`

> [!TIP]
> For ad blocking at network level, combine these tools with our [ad blockers](#ads-and-tracking-blockers). See the [ad blocking guide](./docs/general-guides/android-adblocking.md).

[↑ Back to top](#table-of-contents)

---

## Performance and Optimization

> [!TIP]
> For CPU/GPU management, see [Kernel Management](#kernel-management). For memory optimization, check [Memory Management](#memory-management).

### All-in-One Performance Optimizers
- **[⭐ 3C All-in-One Toolbox](https://play.google.com/store/apps/details?id=ccc71.at.free)** - A comprehensive utility that offers a wide range of tools for monitoring, controlling, and optimizing device performance in a user-friendly interface. `Proprietary`
- **[Bye Blur](https://github.com/Magisk-Modules-Alt-Repo/Bye-Blur)** - Disable the blur effect, this improves performance by discarding this complex visual effect. `FOSS` `[M]`
- **[COPG](https://github.com/AlirezaParsi/COPG)** - Spoof your device to enjoy premium features, max performance, and exclusive benefits. `FOSS` `[M]`
- **[Dynamic System Tweaks Magisk Module](https://github.com/PS2ClassicsVault/Dynamic-System-Tweaks-Magisk-Module)** - Improves overall System performance without overheating and losing battery power for armeabi-v7a devices. `FOSS` `[M]`
- **[FDE.AI](https://github.com/feravolt/FDE.AI-docs)** - All-in-One ultimate optimizer for all devices running Android OS. `Proprietary` `[LSP]`
- **[Hydrostellaire](https://github.com/AestasBritannia/Hydro-Br-leur)** - A magisk module for devices running on Dimensity flagship platforms and OnePlus, Realme devices. `FOSS` `[M]`
- **[MAGNETAR](https://github.com/Kyliekyler/MAGNETAR)** - Device Performance Optimizer — Aims To Provide An Optimal Experience At Every Usage Scenario. `FOSS` `[M]`
- **[SpeedCool](https://github.com/Llucs/SpeedCool-Magisk-Module)** - Boost, cool down, and optimize your Android with SpeedCool: less lag, more performance, and a cooler system. `FOSS` `[M]`
- **[SuperMario Tweaker](https://github.com/mrx7014/SuperMario-Tweaker)** - A tweaker module that can improve any device performance and stability (Gaming, Daily Usage, etc). `FOSS` `[M]`
- **[TNF Tweaker](https://github.com/topnotchfreaks/tnf_tweaker)** - Optimization tool designed exclusively for devices running the TopNotchFreaks and Zephyr kernels. `FOSS` `[K]`
- **[Uperf-Game-Turbo](https://github.com/yinwanxi/Uperf-Game-Turbo)** - Userspace performance controller for Android. `FOSS` `[M]`

### Gaming Tweaks
- **[AsoulOpt](https://github.com/nakixii/Magisk_AsoulOpt)** - Game threads tweaker for Android, suitable for mainstream games and some niche games. `FOSS` `[M]`
- **[Encore Tweaks](https://github.com/Rem01Gaming/encore)** - Enhance device performance during gaming sessions, while keeping battery life optimized for normal use. `Proprietary` `[M]`
- **[EnCorinVest](https://github.com/LoggingNewMemory/EnCorinVest)** - Performance Module, Collaboration between CorinXMTKVest and Encore Tweaks. `FOSS` `[M]`
- **[FPS Unlocker](https://github.com/yadavnikhil03/GameUnlocker#fps-unlocker)** - Enables 90 FPS options in BGMI and PUBG and other Games as well for smoother gameplay on low-end devices. `FOSS` `[M]`
- **[GameResChange](https://github.com/Xposed-Modules-Repo/com.game.reschange)** - Change the resolution of any app/game on Android 13+. `Proprietary` `[LSP]`
- **[Gaming-X Magisk Module](https://github.com/JordanTweaks/Gaming-X-Magisk-Module)** - Tweaking CPU, GPU, memory, and system settings for maximum FPS and responsiveness. `FOSS` `[M]`
- **[PerfGame](https://github.com/adivenxnataly/PerfGame)** - Enable custom resolution and frame-rate mechanism for your games. `FOSS` `[M]`
- **[TMPAD: Per App Downscale](https://github.com/Osanosa/ThemedManager/tree/main/PerAppDownscale)** - Allows users with root or shizuku to run games at lower resolutions to get better performance and change other related settings. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=pro.themed.perappdownscale)

### Graphics Optimization
- **[iUnlocker GLTool](https://github.com/i-Taylo/iUnlockerGL)** - Designed to spoof GPU information, allowing users to modify GPU information for unlocking graphics in games and testing. `FOSS` `[M]`
- **[KonaBess](https://github.com/libxzr/KonaBess)** - A straightforward application designed to customize GPU frequency and voltage tables without the need for kernel recompilation. `FOSS` 
- **[PerfMTK](https://github.com/JUANIMAN/PerfMTK)** - Designed to optimize performance and power efficiency on MediaTek devices with Mali GPUs. `FOSS` `[M]`

### Memory Management
- **[Magisk Swapspace](https://github.com/chickendrop89/magisk-swapspace)** - This module allows for creating a persistent swap space on android. `FOSS` `[M]`
- **[SkyScene Add-on](https://github.com/WeirdMidas/SkySceneAddon)** - Optimizations for most memory management subsystems, as well as integrated intelligent memory expansion, a way to expand memory that mimics OEMs like Ram Plus. `FOSS` `[M]` `[K]`
- **[Swap Disabler](https://github.com/rompelhd/Swap-Disabler)** - Disable swap at system startup. `FOSS` `[M]`
- **[SwapBoost Pro](https://github.com/yadavnikhil03/SwapBoost-Pro)** - Optimizes your device's memory performance through persistent zRAM + Swapfile optimization with VM tweaks. `FOSS` `[M]`
- **[ZRAM Module](https://github.com/FurLC/ZRAM-Module)** -  A Magisk/KernelSU module that provides ZRAM compression algorithm support for Android devices. `FOSS` `[M]` `[K]`

[↑ Back to top](#table-of-contents)

---

## Privacy and Security

### Device ID and Spoofing Tools
- **[DeviceID/SSAID Changer](https://github.com/sidex15/deviceidchanger)** - A simple WebUI Module to change SSAID/DeviceID on Rooted Android Devices with Apatch, KSU (And its forks), or Magisk. `FOSS` `[M]` `[K]`
- **[Geergit](https://github.com/pyshivam/geergit-discussion)** - Change (MASKE) the various IDs in the Phone. `Proprietary` `[LSP]`
- **[MACsposed](https://github.com/DavidBerdik/MACsposed)** - Adds support for MAC Address spoofing to Android 12 through 15. `FOSS` `[LSP]`
- **[SIM Spoof](https://github.com/UhExooHw/sim-spoof)** - Advanced SIM spoofing utility for Android. `Proprietary` `[M]` `[K]`
- **[XPL-EX](https://github.com/0bbedCode/XPL-EX)** - Really simple to use privacy manager for Android 6.0 Marshmallow and later. `FOSS` `[LSP]`
- **[Telephony Spoofer](https://github.com/BrianWalczak/TelephonySpoofer)** - Spoof cellular information, including eSIM compatibility. `FOSS` `[LSP]`

### Flag Secure Patchers

<details><summary><strong>What is FLAG_SECURE</strong></summary>

- It is a window-level security flag in Android that **prevents the window's content from appearing in screenshots**, being viewed on non-secure displays like projectors or TVs, or being captured during screen recordings.

<br>
</details>

- **[⭐ Enable Screenshot](https://github.com/LSPosed/DisableFlagSecure)** - Enabling screenshots in apps that normally wouldn't allow it, and disabling screenshot(Android 14+) and screen record(Android 15+) detection. `FOSS` `[LSP]`
- **[⭐ Flag Secure Patcher](https://github.com/j-hc/FlagSecurePatcher)** - Patch service.jar on device to disable secure lock and screenshot listeners. `FOSS` `[M]`
- **[CaptureSposed](https://github.com/99keshav99/CaptureSposed)** - Disables the newly introduced screenshot detection API in Android 14. `FOSS` `[LSP]`
- **[Simple Flag Secure](https://github.com/ShivamXD6/Simple-Flag-Secure)** - Disable Secure Flag and allow taking screenshots/screen recording in apps supports KSU/APatch . `FOSS` `[M]` `[K]`

### Hide Files
- **[⭐ Amarok](https://github.com/deltazefiro/Amarok-Hider)** - Android application which enables you to hide your private files and apps with a single click. `FOSS` | [🌱](https://f-droid.org/zh_Hans/packages/deltazero.amarok.foss/)
- **[Image Copy Hide](https://github.com/cookieof/ImageCopyHide)** - Automatically copy and hide files from /sdcard/DCIM/Camera to /sdcard/wot/cptp. `FOSS` `[M]` 

### Privacy Tools
- **[PrivacyFlip](https://github.com/dorumrr/privacyflip)** - Automatically disables/enables Wi-Fi, Bluetooth, mobile data, location services, NFC, and even camera/microphone sensors based on lock/unlock state. `FOSS` | [🌱](https://f-droid.org/packages/io.github.dorumrr.privacyflip/)

### Security and Pentesting Tools
- **[AlternativeUnlockXposed](https://github.com/leohearts/AlternativeUnlockXposed)** - Unlock your Android phone with an alternative PIN. `FOSS` `[LSP]`
- **[Biometric Bypass Module](https://github.com/hxreborn/biometric-bypass)** - Fast-forwards face unlock by skipping the biometric confirmation step in System UI on Android 10+. `FOSS` `[LSP]` | [🌱](https://f-droid.org/packages/eu.rafareborn.biometricbypass)
- **[JEZAIL](https://github.com/zahidaz/jezail)** - Android pentesting toolkit running fully on rooted devices. `FOSS`

### Url Cleaners
- **[Tarnhelm](https://github.com/lz233/Tarnhelm)** - The magic to clean sharing links up. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

---


## Root Management

### Root Managers
- **[⭐ Magisk Manager](https://github.com/topjohnwu/Magisk)** - Manage Magisk modules and root permissions. `FOSS`
- **[⭐ SukiSU-Ultra](https://github.com/SukiSU-Ultra/SukiSU-Ultra)** - A kernel-based root solution for Android devices, forked from `KernelSU` with some useful changes.
- **[APatch](https://github.com/bmax121/APatch)** - The patching of Android kernel and Android system. `FOSS` | [🌱](https://f-droid.org/packages/me.bmax.apatch/)
- **[KernelSU](https://github.com/tiann/KernelSU)** - A Kernel based root solution for Android. `FOSS`
- **[KernelSU-next](https://github.com/KernelSU-Next/KernelSU-Next)** - An advanced Kernel based root solution for Android.

### Module Managers

- **[⭐ MMRL](https://github.com/DerGoogler/MMRL)** - An Android app that helps manage your own modules repository. `FOSS` | [🌱](https://f-droid.org/en/packages/com.dergoogler.mmrl/) | [▶️](https://play.google.com/store/apps/details?id=com.dergoogler.mmrl)
- **[Magisk Manager for Recovery Mode](https://github.com/Rikj000/Magisk-Manager-for-Recovery-Mode)** - Easily manage your Magisk Modules from a terminal session in your custom recovery. `FOSS` `[M]`

<details>

<summary><strong>What are Metamodules?</strong></summary>

- A metamodule is a special type of KernelSU module that provides core infrastructure for the module system. Unlike regular modules that modify system files, metamodules control how regular modules are installed and mounted.
- **Fresh KernelSU installations require a metamodule for modules to function.** Without a metamodule, modules will NOT be mounted.
- Only one metamodule can be installed at a time.

<br>
</details>

- **[⭐ Meta-overlayfs](https://github.com/KernelSU-Modules-Repo/meta-overlayfs)** - Official reference implementation using OverlayFS for most users and standard setup. `FOSS` `[K]`
- **[⭐ Mountify](https://github.com/backslashxx/mountify)** - OverlayFS with tmpfs/ext4 sparse support for reduced detection, works on APatch/Magisk too. `FOSS` `[M]` `[K]`
- **[Meta-magic_mount](https://github.com/7a72/meta-magic_mount)** ([Mirror](https://codeberg.org/ovo/meta-magic_mount)) - Magic Mount implementation in C with WebUI support for Magisk-style mounting. `FOSS` `[K]`
- **[Meta-magic_mount (Rust)](https://github.com/Tools-cx-app/meta-magic_mount)** - Rust-based Magic Mount with WebUI and active development for enhanced performance. `FOSS` `[K]`
- **[Meta-hybrid_mount](https://github.com/YuzakiKokuban/meta-hybrid_mount)** - Advanced dual engine (OverlayFS + Magic Mount) with conflict monitor, diagnostics, auto-fallback, and EROFS storage backend support. `FOSS` `[K]`


> [!TIP]
> For most users, **meta-overlayfs** (official) or **Mountify** are recommended starting points. If you need advanced features like automatic fallback, diagnostics, or better stealth, try **meta-hybrid_mount**.

### Bootloop Protection
- **[AshReXcue - Bootloop Protector](https://github.com/RipperHybrid/AshLooper)** - Prevent boot loops caused by problematic modules installed via KernelSU or Magisk. `FOSS` `[M]` `[K]`
- **[Anti bootloop](https://github.com/Magisk-Modules-Alt-Repo/abootloop)** - Protect from bootloops. `FOSS` `[M]`
- **[YetAnotherBootloopProtector](https://github.com/Magisk-Modules-Alt-Repo/YetAnotherBootloopProtector)** - Monitor and fix potential Bootloops and SystemUI failures. `FOSS` `[M]`

### Zygisk Implementations

> [!TIP]
> Zygisk is essential for advanced [root hiding](#root-hiding-and-play-integrity) and many [LSPosed modules](#lsposed-framework).

<details>

<summary><strong>What is Zygisk?</strong></summary>

- Zygisk is a feature that allows modules to inject code directly into the Zygote process in Android. This enables **powerful system-level modifications**, such as **hiding root**, patching app behavior, and more, with minimal impact on device stability and performance.

<br>
</details>

- **[⭐ Zygisk Next](https://github.com/Dr-TSNG/ZygiskNext)**  
  Advanced standalone Zygisk implementation, supporting KernelSU and replacing Magisk's built-in Zygisk. `Proprietary` `[M]` `[K]`
- **[NeoZygisk](https://github.com/JingMatrix/NeoZygisk)**  
  Zygote injection module implemented using ptrace, providing Zygisk API support for APatch and KernelSU. Serves as a replacement for Magisk's built-in Zygisk. `FOSS` `[M]`
- **[ReZygisk](https://github.com/PerformanC/ReZygisk)**  
  Standalone and open-source Zygisk implementation, offering Zygisk API support for KernelSU and as a drop-in replacement for Magisk's Zygisk. `FOSS` `[M]` `[K]`


<details><summary><strong>Comparison:</strong></summary><br>


#### Main Feature Comparison

| Feature | **Magisk Built-in Zygisk** | **NeoZygisk** | **Zygisk Next** | **ReZygisk** |
|---------|---------------------------|---------------|-----------------|--------------|
| **License** | Open Source (GPL-3.0) | Open Source (FOSS) | Closed Source (Proprietary) | Open Source (FOSS) |
| **Root Support** | Magisk only | Magisk, KernelSU, APatch | Magisk, KernelSU, APatch | Magisk, KernelSU, APatch |
| **Implementation** | Built into Magisk core, PLT hooks | Ptrace injection | Standalone module | Standalone module |
| **Performance** | Baseline | Minimal overhead | Enhanced, stable | ~20% faster than built-in |
| **Root Detection Evasion** | Basic hiding | Advanced stealth with trace cleaning | Superior hiding (#1 ranked) | Good stealth capabilities |
| **Module API** | Full Zygisk API | Full Zygisk API compatibility | Full API + extra features | Good compatibility, some limitations |
| **Architecture** | arm64, arm32, x64, x86 | arm64, x86_64, armeabi-v7a | arm64, x86_64, armeabi-v7a | arm64, x86_64, armeabi-v7a |
| **Updates** | Tied to Magisk releases | Active development | Regular updates | Most frequent updates |
| **Community** | Official Magisk support | Growing community | Established but proprietary | Strong open-source community |
| **Special Features** | Native Magisk integration | Trace cleaning, minimalistic | ZN Module system, advanced injection | KernelSU/APatch optimization |

### Strengths and Trade-offs

| Implementation | **Strengths** | **Trade-offs** |
|---------------|--------------|---------------|
| **Magisk Built-in** | ✅ Official support<br>✅ Stable<br>✅ Well-documented | ❌ Limited to Magisk<br>❌ Baseline root hiding |
| **NeoZygisk** | ✅ High stealth<br>✅ Multi-root compatibility<br>✅ Lightweight | ❌ Smaller community<br>❌ Some module compatibility issues |
| **Zygisk Next** | ✅ Best detection evasion<br>✅ Advanced features<br>✅ Complete module support | ❌ Closed source<br>❌ Trust concerns |
| **ReZygisk** | ✅ Open-source<br>✅ High performance<br>✅ Transparent | ❌ Less mature<br>❌ Some feature limitations |

<br>
</details><br>

> [!TIP]
> Use these modules if you need Zygisk features on alternative root frameworks (KernelSU, APatch), or want more control over Zygisk behavior than Magisk's built-in implementation provides.

### Root Detection Tools
- **[⭐ Android-Native-Root-Detector](https://github.com/reveny/Android-Native-Root-Detector)** - A tool for detecting root on android. `FOSS`
- **[MagiskDetection](https://github.com/apkunpacker/MagiskDetection)** - Collection of Some publicly Available POC Apps to Detect Root/Magisk presence. `FOSS` `Proprietary`
- **[Play Integrity API Checker](https://github.com/1nikolas/play-integrity-checker-app)** - This app shows info about your device integrity as reported by Google Play Services. If any of this fails could mean your device is rooted or tampered in a way. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=gr.nikolasspyr.integritycheck)

### Root Hiding and Play Integrity

> [!TIP]
> Having trouble with banking apps? Check our [troubleshooting guide](./docs/troubleshooting.md) and [FAQs](./docs/faqs.md).

<details><summary><strong>What is Play Integrity?</strong></summary>

- It is an Android API that allows app developers to verify that an app is genuine, is installed from the Google Play Store and that it is running on a genuine and secure Android device. Primarily **used to detect and prevent fraud, cheating, and modifications**. 

<br>
</details>

<details><summary><strong>Why even hide root?</strong></summary>

- Because you may encounter issues where system or third-party applications (especially Banking Apps) detect the root status and refuse to operate

<br>
</details>

> [TheUnrealZaka's Guide for Hiding Root](https://gist.github.com/TheUnrealZaka/042040a1700ad869d54e781507a9ba4f)

- **[⭐ Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)** - Hide Magisk. `Proprietary` `[M]`
- **[⭐ SUSFS Module](https://github.com/sidex15/susfs4ksu-module)** - An addon root hiding service for KernelSU. `FOSS` `[M]`
- **[Hide My Applist](https://github.com/Dr-TSNG/Hide-My-Applist)** - Intercept applist detections. `Proprietary` `[LSP]`
- **[HMAL Fork](https://github.com/pumPCin/HMAL)** - FOSS version of Hide My Applist with no Google Services, ads, logcat logs, filtered counters, network activity. `FOSS` `[LSP]`
- **[Komodo Build Props](https://github.com/Elcapitanoe/Komodo-Build-Prop#komodo-build-props)** - Spoof your Android device as the Pixel 9 Pro XL (komodo/komodo_beta). `FOSS` `[M]`
- **[Mountify](https://github.com/backslashxx/mountify)** - Globally mounted modules via OverlayFS. `FOSS` `[M]`
- **[NoHello](https://github.com/MhmRdd/NoHello)** -  A Zygisk module to hide root. `FOSS` `[M]`
- **[PlaycurlNEXT](https://github.com/daboynb/playcurlNEXT)** - Fix Play Integrity (and SafetyNet) verdicts, allowing custom fields and props. `FOSS` `[M]` `[K]`
- **[Play Integrity Fork](https://github.com/osm0sis/PlayIntegrityFork)** - A fork of PIF that fixes "MEETS_DEVICE_INTEGRITY" for Android <13 "deviceRecognitionVerdict" with the Play Integrity API. `FOSS` `[M]`
- **[Sensitive_Props Mod](https://github.com/Pixel-Props/sensitive-props)** - Helps you bypass SafetyNet and Play Integrity on rooted Android devices by modifying system properties and applying device-specific fixes. `FOSS` `[M]`
- **[TrickyStore](https://github.com/5ec1cff/TrickyStore)** - Modifying the certificate chain generated for android key attestation. `Proprietary` `[M]` `[K]`
- **[Tricky Addon - Update Target List](https://github.com/KOWX712/Tricky-Addon-Update-Target-List)** - A KSU WebUI to configure Tricky Store target.txt. `FOSS` `[K]`
- **[Tricky Store OSS](https://github.com/beakthoven/TrickyStoreOSS)** - Open source alternative to proprietary Tricky Store module. `[M]` `[K]`
- **[YuriKey](https://github.com/dpejoh/yurikey)** - A systemless module to get strong integrity easily. `FOSS` `[M]` `[K]`
- **[Zygisk-Assistant](https://github.com/snake-4/Zygisk-Assistant)** - A Zygisk module to hide root for KernelSU, Magisk and APatch. `FOSS` `[M]`

> [!WARNING]
>❗Root hiding is a constant cat‑and‑mouse game. These methods might break with updates to Google Play Services or specific apps. Stay updated with our [community resources](./docs/resources.md).

> [!TIP]
> Combine multiple tools from this list with proper [Zygisk implementations](#zygisk-implementations) for best results.

[↑ Back to top](#table-of-contents)

---

## Screen and Display

- **[Adaptive Theme: Auto Dark Mode by Ambient Light](https://github.com/xLexip/Adaptive-Theme)** - Automatically switches between Light and Dark mode using the ambient light sensor. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=dev.lexip.hecate)
- **[AlwaysOn](https://github.com/Domi04151309/AlwaysOn)** - Adds an always-on display with various customization options regarding watch face, behavior, and background. `FOSS` `[LSP]`
- **[Anti Brightness Change](https://github.com/binarynoise/XposedModulets)** - Prevents every app from changing the screen brightness. `FOSS` `[LSP]` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/com.programminghoch10.AntiBrightnessChange)
- **[AutoNight](https://github.com/Chilly-Blaze/autonight)** - Controlling Android's Dark Mode through environmental brightness. `FOSS`
- **[Disable Rotation Button](https://github.com/JavaCakeGames/disable-rotation-button)** - App to disable Android's floating rotation button. `FOSS`
- **[Pointer Replacer](https://github.com/thesandipv/pointer_replacer)** - Replaces a dot appears when user touch the screen [Require Show Touches to be enabled in Developer Options]. `FOSS` `[LSP]`
- **[Pseudo DC Dimming](https://github.com/dantmnf/PseudoDCDimming)** - Enable alternative dimming mode (likely DC-like) on low brightness for some OLED displays by using software brightness gain. `FOSS` [LSP]`
- **[Rotation Suggestions Closed](https://github.com/Astoritin/RotationSuggestionsClosed)** - Stop showing rotation suggestion button as rotating screen. `FOSS` `[M]`
- **[SecondScreen](https://github.com/farmerbb/SecondScreen)** - Advanced solution to connect your Android device to external displays. `FOSS` | [🌱](https://f-droid.org/packages/com.farmerbb.secondscreen.free/) | [▶️](https://play.google.com/store/apps/details?id=com.farmerbb.secondscreen.free)

[↑ Back to top](#table-of-contents)

---

## System Modifications

- **[Classic Power Menu](https://github.com/KieronQuinn/ClassicPowerMenu)** - Power Menu Replacement for Android 11+, with the main aim being restoring power menu options (Device Controls and Quick Access Wallet) on Android 12. `FOSS`
- **[Disable Low Ram Flag](https://github.com/Magisk-Modules-Alt-Repo/disable-low-ram)** - Disable Low‑RAM flag on Android Go devices. `FOSS` `[M]`
- **[Multi Userui Enabler](https://github.com/InsertX2k/multiuseruienabler)** -  Magisk module that tries to enable Multi-User UI. `FOSS` `[M]`
- **[Noogle Magisk](https://github.com/SelfRef/noogle-magisk)** - Magisk modules for removing/replacing Google applications on stock Android 11-15. `FOSS` `[M]`
- **[Secure Element Access](https://github.com/jqssun/android-se-access)** - Enable access to secure element for trusted apps. `FOSS`
- **[TWRP A/B Retention Script](https://github.com/Magisk-Modules-Repo/twrp-keep)** - Keep TWRP installed after an A/B OTA. `FOSS` `[M]`
- **[zapret for Magisk](https://github.com/sevcator/zapret-magisk)** - DPI bypass on Android with additional features. `FOSS` `[M]`

### VBMeta Mods

<details><summary><strong>What is VBMeta</strong></summary>

- VBMeta is a critical component of Android Verified Boot (AVB), a security feature designed to **ensure the integrity of the software running on an Android device during the boot process**.

<br>
</details>

- **[Android VBMeta Fixer](https://github.com/reveny/Android-VBMeta-Fixer)** - A Magisk/KernelSU/Apatch module to fix VBMeta detections on Android. `FOSS` `[M]` `[K]`
- **[VBMeta Disguiser](https://github.com/Astoritin/VBMetaDisguiser)** - Disguises the properties of vbmeta. `FOSS` `[M]` `[K]`

[↑ Back to top](#table-of-contents)

---

## Terminal and Shell Tools
### Shell Tools
- **[Android 16 Linux Terminal VM Persistence](https://github.com/DigijEth/VM_Magisk_Module)** - Keeps Androids Linux terminal running in the background. `FOSS` `[M]` 
- **[aShell You](https://github.com/DP-Hridayan/aShellYou)** - Android shell utility app with Material Design 3 UI, letting you run ADB, root and shell commands. `FOSS` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/in.hridayan.ashell)
- **[LADB](https://github.com/tytydraco/LADB)** - Local ADB shell. `FOSS` | [LADB Free Build ↗](https://github.com/hyperio546/ladb-builds) | [▶️](https://play.google.com/store/apps/details?id=com.draco.ladb)

### Termux
- **[⭐ Termux](https://github.com/termux/termux-app)** - A terminal emulator application for Android OS extendible by variety of packages. `FOSS` | [🌱](https://f-droid.org/en/packages/com.termux)
- **[TermuxRootMods](https://github.com/rompelhd/TermuxRootMods)** - A Magisk module that enhances the Termux experience for rooted devices. `FOSS` `[M]`
- **[Termux-Root-Recovery-Tool](https://github.com/Ishu43642/Termux-Root-Recovery-Tool)** - Install GSi Rom , Flashing Fastboot Rom, install Twrp Recovery, Boot.img & vbmeta.img files. `FOSS` 
- **[Termux:API](https://github.com/termux/termux-api)** - Termux add-on app which exposes device functionality as API to command line programs. `FOSS`
- **[Termux:Boot](https://github.com/termux/termux-boot)** - Run scripts at device boot. `FOSS`
- **[Termux:Float](https://github.com/termux/termux-float)** - Run Termux in a floating window. `FOSS`
- **[Termux:Styling](https://github.com/termux/termux-styling)** - A Termux add-on app to customize the terminal font and color theme. `FOSS`
- **[Termux:Tasker](https://github.com/termux/termux-tasker)** - Termux add-on app for integration with [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm). `FOSS`
- **[Termux:Widget](https://github.com/termux/termux-widget)** - Termux add-on app which adds shortcuts to commands on the home screen. `FOSS`

[↑ Back to top](#table-of-contents)

---

## Utilities and System Tools

### NFC and Wireless
- **[NFC Card Emulator Pro (Root)](https://play.google.com/store/apps/details?id=com.yuanwofei.cardemulator.pro)** - An NFC Card Emulator that simulates various types of cards, e.g., access cards, elevator cards, factory (meal) cards, school (meal) cards, some library cards, and other IC cards. `Proprietary`
- **[NFCGate](https://github.com/nfcgate/nfcgate)** - Android application meant to capture, analyze, or modify NFC traffic. `FOSS` `[LSP]` | [🌱](https://f-droid.org/packages/de.tu_darmstadt.seemoo.nfcgate/)
- **[NfcScreenOff](https://github.com/Jon8RFC/NfcScreenOff)** - Read NFC tags when screen is off and disable NFC tagging sound. `FOSS` `[M]`

### Cloud and Remote Storage
- **[Magisk Tailscaled](https://github.com/mgksu/tailscaled)** - Module for running Tailscale on rooted Android devices. `FOSS` `[M]`
- **[Rclone Magisk Module](https://github.com/NewFuture/rclone-fuse3-magisk)** - Integrates Rclone with FUSE support into Android, allowing you to manage remote storage mounts seamlessly. `FOSS` `[M]`
- **[Rsync Magisk](https://github.com/KatelynTheStargazer/rsync-magisk)** - static rsync binary for magisk. `FOSS` `[M]`

### Device Information
- **[Castro - system info](https://play.google.com/store/apps/details?id=com.itemstudio.castro)** - A huge collection of information about your device and a set of tools for monitoring its status. `Proprietary`
- **[Device Info HW](https://play.google.com/store/apps/details?id=ru.andr7e.deviceinfohw)** - A hardware and software information app for Android devices. `Proprietary`
- **[Infamick Script](https://github.com/Infamousmick/Infamick-script/)** - A powerful system utility script that provides easy access to various system information and settings. `FOSS` `[M]`

### Task Managers
- **[Operator](https://github.com/by-architect/Operator)** - Matrix-inspired Android Task Manager that lets you monitor, manage, and terminate processes directly from your device. `FOSS` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/com.byarchitect.operator)
- **[TaskManager](https://github.com/RohitKushvaha01/TaskManager)** - Task Manager inspired from gnome system monitor for android.Must read [F-Droid inclusion](https://github.com/RohitKushvaha01/TaskManager/issues/24) `FOSS` | [▶️](https://play.google.com/store/apps/details?id=com.rk.taskmanager)

### Translation and Localization
- **[AllTrans](https://github.com/pbzinwindows/AllTrans)** - Replaces ALL TEXT IN AN APP from one language to another at runtime. `FOSS` `[LSP]`
- **[Xposed Translate Text](https://github.com/tianci-sh/XPTranslateText)** - Translate text by MLKit / gemini2.0 / google api. `FOSS` `[LSP]`

### Miscellaneous Utilities
- **[MagiskGapps](https://github.com/wacko1805/MagiskGapps)** - Convert a regular GApps package into a Magisk flashable package using a simple website. `FOSS` `[M]`
- **[MicroGPlus](https://bitgapps.io/extra)** - Installs MicroG services and other useful apps. `Proprietary` `[M]` `[K]`
- **[No Photo Picker API](https://github.com/yureitzk/NoPhotoPickerAPI)** - Bypasses the Android Photo Picker API and lets apps use the classic document/file picker. `FOSS` `[LSP]`
- **[SD Flasher](https://github.com/theblazehen/sd_flasher)** - Flash disk images (.img, .img.gz, .img.xz, .zip) directly to SD cards from your Android device. `FOSS`
- **[System Tools Android](https://play.google.com/store/apps/details?id=com.redhome.sta)** - A true utility processor that includes many small utilities for finer work with the system (including root utilities). `Proprietary`
- **[UotanToolbox NT](https://github.com/Uotan-Dev/UotanToolboxNT)** - A modern toolbox for geeks. `FOSS`
- **[XposedModulets](https://github.com/binarynoise/XposedModulets)** - A collection of many small useful Xposed Modules. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

---

<div align="center">
<br>

# Resources and Help

[![X (formerly Twitter) Follow](https://img.shields.io/badge/%20%20-Follow%20US-blue?logo=X&logoColor=white&style=for-the-badge&label=&#8203;)](https://x.com/awsm_and_root)

</div>

### Official Channels
| Platform | Purpose | Link |
|:---|:---|:---|
|🌐 **Website** | Browse apps, modules & guides | [awesome-android-root.org](https://awesome-android-root.org) |
|📂 **GitHub** | Source, discussions & issues | [GitHub Repo](https://github.com/awesome-android-root/awesome-android-root) |
|𝕏 **X/Twitter** | Updates & news | [@awsm_and_root](https://x.com/awsm_and_root) |

### Quick Help Paths
- First time here? Start at the [Introduction](#introduction) & [The 4-Step Rooting Process](#the-4-step-rooting-process)
- Unsure about a term? Open the [Glossary](#glossary)
- Want tools? Jump to [Root Apps and Modules](#root-apps-and-modules)
- Need a walkthrough? Browse the [Rooting Guides Index](./docs/rooting-guides/index.md)
- Common questions? Check the FAQs: [faqs.md](./docs/faqs.md)

### Resource Hub
Extended references & external reading: [resources.md](./docs/resources.md)

### Contribute and Participate
- ⭐ Star the repo (boosts discovery)
- 🐛 Report or triage [issues](https://github.com/awesome-android-root/awesome-android-root/issues)
- 💡 Suggest new apps/modules (1 per issue for clarity)
- 🧹 Improve formatting / dead link cleanup
- 📝 Read [contributing guide](docs/contributing.md) before major PRs
- 🗂️ Large edits? Organize commits per category
- 💖 Sponsor ongoing maintenance via [Open Collective](https://opencollective.com/awesome-android-root-official)

---

## Legal and Safety

> [!IMPORTANT]
> **⚠️ Educational reference only.**
> You accept all risk. Rooting / modifying firmware can void warranty, reduce security, break OTA updates, or trigger anti‑tamper (Knox, Play Integrity, DRM failures, banking app lockouts).

### Core Principles
- Research device specifics (A/B slots, dynamic partitions, AVB state) first
- Change one variable at a time; test between steps
- Favor systemless approaches before invasive modification

### Pre‑Flash Checklist
1. Full backup (apps + internal storage; partition images if possible)
2. Download matching factory firmware / boot / vbmeta images
3. Verify SHA256 hashes of critical images/modules
4. Install latest platform‑tools (adb / fastboot) & confirm detection
5. Ensure alternate access path (custom recovery / second device)

### Risk Mitigation
- Keep a pristine boot + vbmeta copy untouched
- Avoid stacking overlapping modules (e.g. multiple host-based ad blockers)
- Review open issues of a module before flashing
- Monitor first boot logs (logcat | grep -i magisk\|zygisk)
- Keep a change log for easy rollback

### Avoid Proceeding If
- Corporate / MDM‑managed or mission‑critical device
- Reliance on unpatchable banking / DRM / enterprise apps
- You can’t afford data loss & have no backup

<div align="center">

```
Respect licenses, ToS, and local laws. Don’t use root to unlawfully bypass paid features.
```

</div><br>

[↑ Back to top](#table-of-contents)

---

<div align="center">
<br><br>


# Support the Project

[![Become a Sponsor](https://img.shields.io/badge/%20💖-Become%20a%20Sponsor-ff69b4?style=for-the-badge)](https://opencollective.com/awesome-android-root-official)
[![Star the Repo](https://img.shields.io/badge/%20⭐-Star%20this%20Repo-yellow?style=for-the-badge)](https://github.com/awesome-android-root/awesome-android-root)
[![Share Project](https://img.shields.io/badge/%20📢-Share%20Project-blue?style=for-the-badge)](https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20Android%20rooting%20resource!&url=https://awesome-android-root.org)

**Sponsorships fund: app status verification, guide refresh, categorization improvements, automation & docs infra.**

</div>

Non‑financial impact ideas:
- Replace dead or redirected links with active sources/forks
- Mark unmaintained / archived projects (add note)
- Suggest safer open‑source alternatives for proprietary tools
- Improve clarity for beginners (simplify phrasing / add warnings)

---

<div align="center">

**⚡ Built with ❤️ by [Awesome Android Root](https://github.com/awesome-android-root/awesome-android-root)**

[![X Follow](https://img.shields.io/badge/%20%20-Follow%20US-blue?logo=X&logoColor=white&style=for-the-badge&label=&#8203;)](https://x.com/awsm_and_root)
[![Website](https://img.shields.io/badge/%20-Website-green?logo=google-chrome&logoColor=white&style=for-the-badge&label=&#8203;)](https://awesome-android-root.org)
[![Back to Top](https://img.shields.io/badge/%20↑-Back%20to%20Top-blue?style=for-the-badge&color=blue)](#table-of-contents)

</div>
