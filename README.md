<div align="center">

<picture>
  <source media="(prefers-color-scheme: light)" srcset="docs/public/images/logo.svg">
  <source media="(prefers-color-scheme: dark)" srcset="docs/public/images/logo_dark.svg">
  <img src="docs/public/images/logo.svg" alt="Awesome Android Root Logo" width="120" height="120" />
</picture>


# Awesome Android Root

**🛡️ The Ultimate Android Rooting Hub**

<sub>Discover 300+ top root apps, Magisk/KernelSU/LSPosed modules, and step-by-step guides for every device.</sub>

[![GitHub Repo stars](https://img.shields.io/github/stars/awesome-android-root/awesome-android-root?logo=github&style=for-the-badge&color=blue&cacheSeconds=3600)](https://github.com/awesome-android-root/awesome-android-root?ref=awesome-root.org)
[![Total Entries](https://img.shields.io/badge/Apps%20&%20Modules-300+-blue?style=for-the-badge&logo=android&cacheSeconds=3600)](#root-apps)
[![X (formerly Twitter) Follow](https://img.shields.io/badge/%20%20-Follow%20US-blue?logo=X&logoColor=white&style=for-the-badge&label=&#8203;)](https://x.com/awsm_and_root)<br>
[![Website](https://img.shields.io/badge/Website-awesome--android--root.org-orange?style=for-the-badge&logo=googlechrome)](https://awesome-android-root.org)

</div>

<div align="center" class="quick-nav">

🚀 Quick Links: [Introduction](#introduction) | [Root Guides](#-rooting-guides) | [Apps & Modules](#-root-apps-and-modules) | [Resources & Tools](#resources-and-support) | [Community](#-community-and-contributing)

</div>

---

## Table of Contents

- [Introduction](#introduction)
- [Rooting Guides](#-rooting-guides)
- [Root Apps & Modules](#-root-apps-and-modules)
- [Resources & Support](#resources-and-support)
- [Community & Contributing](#-community-and-contributing)


## Introduction

### What is Android Rooting?
Rooting grants superuser access on Android so you can modify system components, remove bloat, run powerful tools, and customize deeply—similar to admin rights on a desktop OS.

### Why root?
- 🔒 Freedom & control: Remove OEM limits and tailor your device
- ⚡ Performance: Tune CPU/GPU, battery, and system services
- 🛡️ Privacy/Security: Granular control over permissions and network access
- 🎨 Customization: Themes, UI tweaks, system mods

### Benefits vs Risks

| ✅ Benefits | ⚠️ Risks & Considerations |
|:--|:--|
| System-wide ad blocking | May void warranty |
| Full app control | Security exposure if misused |
| Performance tuning | Instability/bootloops possible |
| Deep customization | OTA update friction |
| True backups (app data) | App integrity checks may fail (banking/DRM) |


> **🚨 CRITICAL:** Before you start, run through this preflight: [✨ Safety Checklist ✨](https://fynks.github.io/check-list/)


## 📚 Rooting Guides

### Complete Rooting Process

Follow this proven 4-step process used successfully by thousands of users:

### Quickstart (4 steps)
1) 🔓 Unlock bootloader  
→ [Unlock Guide](docs/android-root-guides/how-to-unlock-bootloader.md)

2) 🛠️ (Optional) Install a custom recovery  
→ [Recovery Guide](docs/android-root-guides/how-to-install-custom-recovery.md)

3) ⚡ Pick your root method  
→ [Compare Magisk, KernelSU, APatch](docs/android-root-guides/index.md#root-methods-comparison)

4) 🎯 First-boot setup + essentials  
→ [Starter Apps](docs/android-root-apps/index.md#featured-apps-the-essentials)

### Root Methods Comparison

| Method | Best For | Highlights | Guide |
|:--|:--|:--|:--|
| **Magisk** | Most users | Systemless root, modules, Zygisk | [Magisk Guide](docs/android-root-guides/magisk-guide.md) |
| **KernelSU** | Power users with supported kernels | Kernel-level root, strong isolation | [KernelSU Guide](docs/android-root-guides/kernelsu-guide.md) |
| **APatch** | Devices with limited options | Modern approach; no custom kernel required | [APatch Guide](docs/android-root-guides/apatch-guide.md) |
| **LSPosed** | Framework mods | Xposed modules support | [LSPosed Guide](docs/android-root-guides/lsposed-guide.md) |

### Device-specific Guides

| Brand | Guide | Notes |
|:--|:--|:--|
| **Google Pixel** | [Pixel Root Guide](docs/android-root-guides/how-to-root-pixel-phone.md) | Straightforward A/B, AVB/verity nuances |
| **Samsung** | [Samsung Root Guide](docs/android-root-guides/how-to-root-samsung-phone.md) | Patched AP via Odin; One UI caveats |
| **Xiaomi/HyperOS** | [Xiaomi Root Guide](docs/android-root-guides/how-to-root-xiaomi-phone.md) | Mi Unlock wait times; fastbootd usage |
| **OnePlus** | [OnePlus Root Guide](docs/android-root-guides/how-to-root-oneplus-phone.md) | OxygenOS/ColorOS merges |
| **Nothing Phone** | [Nothing Root Guide](docs/android-root-guides/how-to-root-nothing-phone.md) | Slotting/firmware specifics |
| **Motorola** | [Motorola Root Guide](docs/android-root-guides/how-to-root-motorola-phone.md) | Bootloader tokens, fastboot quirks |

### Additional Guides

| Topic | Guide | Description |
|:---|:---|:---|
| **Custom ROMs** | [ROM Installation Guide](docs/android-root-guides/custom-rom-installation.md) | Transform your Android experience |
| **Complete Overview** | [Rooting Guides Index](docs/android-root-guides/index.md)| All rooting tutorials in one place |

> Heads-up for Android 14/15: Play Integrity has tightened; hiding/unlocking is a moving target. Expect breakage and updates.


## 📱 Root Apps and Modules

> 🚀 **[Browse our complete collection of 300+ Root Apps & Modules](docs/android-root-apps/index.md)**

### 🏆 Starter Pack (Essentials)

| App | Category | Why |
|:--|:--|:--|
| [Magisk](https://github.com/topjohnwu/Magisk) | Root Manager | De-facto systemless root and modules |
| [App Manager](https://github.com/MuntashirAkon/AppManager) | App Control | Inspect, freeze, export, block trackers |
| [MiXplorer](https://mixplorer.com/) | File Manager | Full-featured with root access |
| [AdAway](https://adaway.org/) | Ad Blocking | Open-source, system-wide blocking |
| [Droid-ify](https://f-droid.org/packages/com.looker.droidify) | App Updates | Clean F-Droid client for OSS apps |

### Apps by Category

#### 🛠️ Root & System Management
| Subcategory | Key Apps |
|:---|:---|
| **[Root Managers](docs/android-root-apps/index.md#root-managers)** | Magisk, KernelSU, APatch |
| **[Zygisk Implementations](docs/android-root-apps/index.md#zygisk-implementations)** | Zygisk Next, ReZygisk |
| **[Root Hiding & Integrity](docs/android-root-apps/index.md#root-hiding-and-integrity)** | Shamiko, HMAL, SUSFS |
| **[Root Detection Tools](docs/android-root-apps/index.md#root-detection-tools)** | RootBeer, Root Checker |
| **[Bootloop Protection](docs/android-root-apps/index.md#bootloop-protection)** | Anti-Bootloop Mod, TWRP |

#### 🔐 Security & Privacy
| Subcategory | Key Apps |
|:---|:---|
| **[Privacy & Security](docs/android-root-apps/index.md#privacy-and-security)** | Privacy Dashboard, AppOps |
| **[Ad & Tracking Blockers](docs/android-root-apps/index.md#ads-and-tracking-blockers)** | AdAway, Blokada, PersonalDNSFilter |
| **[Firewall Tools](docs/android-root-apps/index.md#firewall-tools)** | AFWall+, NetGuard |
| **[DNS Tools](docs/android-root-apps/index.md#dns-tools)** | DNS66, Nebulo, RethinkDNS |

#### 📦 App Management & Control
| Subcategory | Key Apps |
|:---|:---|
| **[App Managers & Control](docs/android-root-apps/index.md#app-managers-and-control)** | App Manager, Neo Backup, Inure |
| **[App Isolation & Cloning](docs/android-root-apps/index.md#app-isolation-and-cloning)** | Island, Shelter |
| **[App Permissions](docs/android-root-apps/index.md#app-permissions)** | Permission Ruler, App Ops |
| **[App Stores](docs/android-root-apps/index.md#app-stores)** | F-Droid, Aurora Store, Droid-ify |

#### 🧹 System Optimization & Cleanup
| Subcategory | Key Apps |
|:---|:---|
| **[System Optimization](docs/android-root-apps/index.md#system-optimization)** | L Speed, 3C All-in-One Toolbox |
| **[Debloating & System App Removal](docs/android-root-apps/index.md#debloating-and-system-app-removal)** | Canta, System App Remover |
| **[Memory & Storage Management](docs/android-root-apps/index.md#memory-and-storage-management)** | FolderSync, DiskUsage |
| **[Cleaning & Maintenance](docs/android-root-apps/index.md#cleaning-and-maintenance)** | SD Maid 2/SE, Cleaner |
| **[Battery & Power Management](docs/android-root-apps/index.md#battery-and-power-management)** | Greenify, Wakelock Detector |

#### 🎨 Customization & UI
| Subcategory | Key Apps |
|:---|:---|
| **[Themes & UI](docs/android-root-apps/index.md#themes-and-ui)** | Substratum, Swift Installer |
| **[Launchers](docs/android-root-apps/index.md#launchers)** | Nova Launcher, Lawnchair |
| **[Boot Animations](docs/android-root-apps/index.md#boot-animations)** | Boot Animations for Superuser |
| **[Fonts & Typography](docs/android-root-apps/index.md#fonts-and-typography)** | iFont, HiFont, Emoji Switcher |
| **[Navigation](docs/android-root-apps/index.md#navigation)** | Navigation Gestures, Button Mapper |
| **[Screen & Display](docs/android-root-apps/index.md#screen-and-display)** | Screen Shift, Resolution Changer |
| **[OS Specific Mods](docs/android-root-apps/index.md#os-specific-mods)** | HyperCeiler, PixelXpert, OneUI mods |

#### 🔧 App Modifications & Patches
| Subcategory | Key Apps |
|:---|:---|
| **[General App Mods](docs/android-root-apps/index.md#general-app-mods)** | Lucky Patcher, Zygisk Detach |
| **[Patching Tools](docs/android-root-apps/index.md#patching-tools)** | ReVanced Manager, Lucky Patcher |
| **[ReVanced](docs/android-root-apps/index.md#revanced)** | ReVanced Manager, ReVanced Extended |
| **[Social Media Mods](docs/android-root-apps/index.md#modded-apps--tweaks)** | Instagram mods, WhatsApp mods, Telegram X |
| **[Entertainment & Media Mods](docs/android-root-apps/index.md#modded-apps--tweaks)** | YouTube mods, Spotify mods, Discord mods |
| **[Regional App Mods](docs/android-root-apps/index.md#modded-apps--tweaks)** | WeChat mods, QQ mods, Bilibili mods |

#### ⚡ Performance & Gaming
| Subcategory | Key Apps |
|:---|:---|
| **[Performance & Gaming](docs/android-root-apps/index.md#performance-and-gaming)** | Game Booster, FPS Meter |
| **[Kernel Management](docs/android-root-apps/index.md#kernel-management)** | Franco Kernel Manager, EX Kernel Manager |
| **[System Modifications](docs/android-root-apps/index.md#system-modifications)** | Xposed Edge Pro, GravityBox |
| **[Automation](docs/android-root-apps/index.md#automation)** | Tasker, Automate, MacroDroid |

#### 🗃️ Data & Storage
| Subcategory | Key Apps |
|:---|:---|
| **[File Management](docs/android-root-apps/index.md#file-management)** | MiXplorer, Solid Explorer |
| **[Backup & Restore](docs/android-root-apps/index.md#backup-and-restore)** | Titanium Backup, Swift Backup |

#### 🌐 Network & Connectivity
| Subcategory | Key Apps |
|:---|:---|
| **[Wi‑Fi Tools](docs/android-root-apps/index.md#wi‑fi-tools)** | WiFi Analyzer, WiFi Password Recovery |
| **[Hotspot/Tether](docs/android-root-apps/index.md#hotspot-tools)** | WiFi Tether Router, PdaNet+ |
| **[Location & GPS](docs/android-root-apps/index.md#location-and-gps)** | Fake GPS Location, GPS Status |
| **[NFC & Cards](docs/android-root-apps/index.md#nfc-tools)** | NFC Tools, TagInfo |

#### 📞 Communication & Contacts
| Subcategory | Key Apps |
|:---|:---|
| **[Call Recording](docs/android-root-apps/index.md#call-recording)** | Call Recorder, ACR |
| **[Contact Management](docs/android-root-apps/index.md#contact-management)** | Contact Optimizer, Duplicate Contacts |
| **[SMS Management](docs/android-root-apps/index.md#sms-management)** | SMS Backup & Restore |

#### 🎵 Audio & Media
| Subcategory | Key Apps |
|:---|:---|
| **[Audio & Media](docs/android-root-apps/index.md#audio-and-media)** | Viper4Android, Dolby Atmos |

#### 🛠️ Developer & Technical Tools
| Subcategory | Key Apps |
|:---|:---|
| **[Development & Debugging](docs/android-root-apps/index.md#development-and-debugging)** | aLogcat, Android Terminal |
| **[Device Controls & Hardware](docs/android-root-apps/index.md#device-control-and-hardware)** | SetCPU, Device Control |
| **[Terminal & Shell](docs/android-root-apps/index.md#terminal-and-shell-tools)** | Termux, Terminal Emulator |

#### ♿ Accessibility & Utilities
| Subcategory | Key Apps |
|:---|:---|
| **[Accessibility Tools](docs/android-root-apps/index.md#accessibility-tools)** | Voice Access, Switch Access |

---

### Project Statistics

![Total Entries](https://img.shields.io/badge/Total%20Entries-303-blue?style=flat-square&logo=android)
![Root Apps](https://img.shields.io/badge/Root%20Apps-112-blue?style=flat-square&logo=android)
![Magisk Modules](https://img.shields.io/badge/Magisk%20Modules-105-orange?style=flat-square)
![KernelSU Modules](https://img.shields.io/badge/KernelSU%20Modules-16-green?style=flat-square)
![LSPosed Modules](https://img.shields.io/badge/LSPosed%20Modules-84-purple?style=flat-square)


## Resources and Support

### 🛠️ Essential Tools & Software

| Tool | Category | Purpose | Guide | Source |
| :--- | :--- | :--- | :--- | :--- |
| **Magisk** | Root | Systemless root &amp; modules | [Guide](docs/android-root-guides/magisk-guide.md) | [GitHub](https://github.com/topjohnwu/Magisk) |
| **KernelSU** | Root | Kernel-level root | [Guide](docs/android-root-guides/kernelsu-guide.md) | [GitHub](https://github.com/tiann/KernelSU) |
| **APatch** | Root | Alternative root approach | [Guide](docs/android-root-guides/apatch-guide.md) | [GitHub](https://github.com/bmax121/APatch) |
| **LSPosed** | Framework | Zygisk/Riru module framework | [Guide](docs/android-root-guides/lsposed-guide.md) | [GitHub](https://github.com/LSPosed/LSPosed) |
| **Platform Tools** | ADB/Fastboot | Core CLI (adb/fastboot/fastbootd) | [Bootloader Unlock](docs/android-root-guides/how-to-unlock-bootloader.md) | [Android Devs](https://developer.android.com/studio/releases/platform-tools) |
| **TWRP** | Recovery | Custom recovery | [Recovery Guide](docs/android-root-guides/how-to-install-custom-recovery.md) | [TWRP](https://twrp.me/) |
| **OrangeFox** | Recovery | Custom recovery (A/B-friendly) | [Recovery Guide](docs/android-root-guides/how-to-install-custom-recovery.md) | [OrangeFox](https://orangefox.download/) |
| **Odin (Windows)** | Flashing (Samsung) | Flash AP/BL/CP/CSC | [Samsung Guide](docs/android-root-guides/how-to-root-samsung-phone.md) | [SamFw](https://samfw.com/blog/download-odin-all-version) |
| **Mi Flash** | Flashing (Xiaomi) | Fastboot firmware | [Xiaomi Guide](docs/android-root-guides/how-to-root-xiaomi-phone.md) | [Xiaomi](https://xiaomiflashtool.com/) |
| **SP Flash Tool** | Flashing (MediaTek) | MTK firmware | [Device Guides](docs/android-root-guides/index.md) | [SP Flash Tool](https://spflashtool.com/) |


### Firmware/Stock Rom downloading
| Brand | Sources |
| :--- | :--- |
| **Samsung/One UI** | https://samfw.com/blog/download-odin-all-version |
| **Xiaomi/HyperOS** | https://c.mi.com/global/miuidownload/index |
| **NothingOS** | https://github.com/spike0en/nothing_archive |
| **Google Pixel** | https://developers.google.com/android/images |
| **Motorola** | https://mirrors.lolinet.com/firmware/lenomola/ |


### 📚 How‑to Guides & Learning

| Topic | Why it matters | Link |
|:--|:--|:--|
| **All Rooting Tutorials** | Methods, device quirks | [Guides Index](docs/android-root-guides/index.md) |
| **Brand‑specific** | OEM expectations | [Device Index](docs/android-root-guides/index.md#device-specific-guides) |
| **Ad Blocking** | Clean browsing & apps | [Ad Blocking Guide](docs/guides/android-adblocking.md) |
| **Debloating** | Performance & privacy | [Debloat Guide](docs/guides/android-apps-debloating.md) |
| **Backups** | Real, restorable backups | [Backup & Restore](docs/guides/app-backup-restore-using-root.md) |
| **App Updates** | Control Play Store | [Stop Auto‑Updates](docs/guides/stop-android-app-auto-updates-play-store.md) |

### 👥 Communities & Forums

| Community | Focus | Members | Best For |
|:---|:---|:---|:---|
| **[XDA Developers](https://forum.xda-developers.com/)** | Android development & modding | 2M+ | Device-specific help, ROMs, development |
| **[r/AndroidRoot](https://reddit.com/r/AndroidRoot)** | General rooting discussions | 150K+ | Quick help, troubleshooting |
| **[r/Magisk](https://reddit.com/r/Magisk)** | Magisk-specific support | 80K+ | Magisk modules, issues, updates |
| **[r/LineageOS](https://reddit.com/r/LineageOS)** | LineageOS custom ROM | 100K+ | Custom ROM discussions |

### Device-Specific Resources

| Brand/ROM | Type | Bootloader/Download | Stock Firmware | Our Guide |
|:---|:---|:---|:---|:---|
| **Google Pixel** | Manufacturer | [Google Developers](https://developers.google.com/android/images) | [Factory Images](https://developers.google.com/android/images) | [Pixel Root Guide](docs/android-root-guides/how-to-root-pixel-phone.md) |
| **Samsung** | Manufacturer | [Samsung Developers](https://developer.samsung.com/) | [SamMobile](https://www.sammobile.com/firmwares/) | [Samsung Root Guide](docs/android-root-guides/how-to-root-samsung-phone.md) |
| **Xiaomi** | Manufacturer | [Mi Unlock](https://en.miui.com/unlock/) | [Xiaomi Firmware](https://xiaomifirmwareupdater.com/) | [Xiaomi Root Guide](docs/android-root-guides/how-to-root-xiaomi-phone.md) |
| **OnePlus** | Manufacturer | [OnePlus Support](https://www.oneplus.com/support) | [Oxygen Updater](https://oxygenupdater.com/) | [OnePlus Root Guide](docs/android-root-guides/how-to-root-oneplus-phone.md) |
| **Nothing** | Manufacturer | [Nothing Support](https://nothing.tech/support) | [Nothing Firmware](https://nothing.tech/support) | [Nothing Root Guide](docs/android-root-guides/how-to-root-nothing-phone.md) |
| **Motorola** | Manufacturer | [Motorola Support](https://motorola-global-portal.custhelp.com/) | [Lolinet](https://mirrors.lolinet.com/firmware/moto/) | [Motorola Root Guide](docs/android-root-guides/how-to-root-motorola-phone.md) |
| **LineageOS** | Custom ROM | [lineageos.org](https://lineageos.org/) | Privacy-focused AOSP (200+ devices) | [ROM Installation Guide](docs/android-root-guides/custom-rom-installation.md) |
| **Pixel Experience** | Custom ROM | [pixelexperience.org](https://pixelexperience.org/) | Pixel-like experience (Popular devices) | [ROM Installation Guide](docs/android-root-guides/custom-rom-installation.md) |
| **Paranoid Android** | Custom ROM | [paranoidandroid.co](https://paranoidandroid.co/) | Feature-rich (Flagship devices) | [ROM Installation Guide](docs/android-root-guides/custom-rom-installation.md) |

### Emergency & Recovery Resources

| Issue/Tool | Quick Solution/Purpose | Platform/Guide Link |
|:---|:---|:---|
| **Device Won't Boot** | Disable modules, restore backup | **[→ Bootloop Fix](docs/faqs.md#device-wont-boot)** |
| **Root Not Working** | Reinstall root method | **[→ Root Issues](docs/faqs.md#root-not-working)** |
| **Banking Apps Blocked** | Configure root hiding | **[→ App Compatibility](docs/faqs.md#play-integrity-and-banking-apps)** |
| **Hard Brick** | Recovery options | **[→ Recovery Guide](docs/faqs.md#bricked-device-recovery)** |

### 📖 Help & Documentation

| Resource | Description | Quick Access |
|:---|:---|:---|
| **FAQ & Troubleshooting** | Common questions and solutions | **[→ Get Help](docs/faqs.md)** |
| **About This Project** | Learn about our mission | **[→ About Us](docs/about.md)** |
| **Contributing** | Help improve this resource | **[→ Contribute](docs/contributing.md)** |

### 🎥 Educational Channels

| Channel | Focus | Platform |
|:---|:---|:---|
| **XDA Developers** | Android tutorials & development | [YouTube](https://www.youtube.com/user/xdadevelopers) |
| **Android Authority** | Android guides & reviews | [YouTube](https://www.youtube.com/user/AndroidAuthority) |

> **💡 Pro Tip:** Always verify video tutorials with our [written guides](docs/android-root-guides/index.md) for the most up-to-date instructions.


## 🤝 Community and Contributing

### Official Channels

| Platform | Purpose | Link |
|:---|:---|:---|
| **🌐 Website** | Browse apps with filtering | **[awesome-android-root.org](https://awesome-android-root.org)** |
| **📱 GitHub** | Source code & issues | **[GitHub Repository](https://github.com/awesome-android-root/awesome-android-root)** |
| **🐦 Twitter/X** | Updates & highlights | **[@awsm_and_root](https://x.com/awsm_and_root)** |

### Ways to Help
- ⭐ [Star the repo](https://github.com/awesome-android-root/awesome-android-root) to boost visibility  
- 🐛 [File issues](https://github.com/awesome-android-root/awesome-android-root/issues) for fixes/updates  
- 💡 [Suggest new apps/modules  ](https://github.com/awesome-android-root/awesome-android-root/issues)
- 📝 Send PRs (see [Contributing](docs/contributing.md))  
- 💖 **[Sponsor ongoing work](https://opencollective.com/awesome-android-root-official)**

---

## Support the Project

Your support funds curation, testing, documentation, and community upkeep.

[![Become a Sponsor](https://img.shields.io/badge/💖-Become%20a%20Sponsor-ff69b4?style=for-the-badge)](https://opencollective.com/awesome-android-root-official)
[![GitHub Stars](https://img.shields.io/badge/⭐-Star%20this%20Repo-yellow?style=for-the-badge)](https://github.com/awesome-android-root/awesome-android-root)
[![Share Project](https://img.shields.io/badge/📢-Share%20Project-blue?style=for-the-badge)](https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20Android%20rooting%20resource!&url=https://awesome-android-root.org)

---

## Legal & Safety

> ⚠️ Educational use only. Rooting and flashing can void warranties, erase data, or brick devices. You are responsible for any outcomes. Respect local laws and app terms.

Essentials:
- Back up your data before any change
- Research device‑specific quirks (AVB/verity, dynamic partitions)
- Understand risks and prepare a recovery path
- Keep a computer with ADB/Fastboot handy

---

<div align="center">

**⚡ Built with ❤️ by [Awesome Android Root](https://github.com/awesome-android-root/awesome-android-root)**

---

[![X Follow](https://img.shields.io/badge/Follow%20US-000?logo=X&logoColor=fff&style=for-the-badge)](https://x.com/awsm_and_root)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fawesome-android-root.org%2F&style=for-the-badge)](https://awesome-android-root.org/)

</div>