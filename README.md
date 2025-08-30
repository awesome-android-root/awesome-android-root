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
[![Total Entries](https://img.shields.io/badge/Apps%20%26%20Modules-300%2B-blue?style=for-the-badge&logo=android&cacheSeconds=3600)](#root-apps-and-modules)
[![X (formerly Twitter) Follow](https://img.shields.io/badge/%20%20-Follow%20US-blue?logo=X&logoColor=white&style=for-the-badge&label=&#8203;)](https://x.com/awsm_and_root)
<br>
[![Website](https://img.shields.io/badge/Website-awesome--android--root.org-orange?style=for-the-badge&logo=googlechrome)](https://awesome-android-root.org)

</div>

<div align="center" class="quick-nav">

🚀 Quick Links: [Introduction](#introduction) | [Pre-Root Checklist](#pre-root-checklist) | [Rooting Guides](#rooting-guides) | [Apps & Modules](#root-apps-and-modules) | [Support](#resources-and-support)

</div>

---

## 📚 Table of Contents

- [Introduction](#introduction)
- [Pre-Root Checklist](#pre-root-checklist)
- [Rooting Guides](#rooting-guides)
- [Root Apps & Modules](#root-apps-and-modules)
- [Resources & Support](#resources-and-support)
- [Community & Contributing](#-community-and-contributing)
- [Legal & Safety](#legal--safety)

---

## Introduction

### What is Android Rooting?
Rooting grants **superuser (admin) access** to your Android device, enabling deep system modifications — removing bloatware, enhancing privacy, boosting performance, and unlocking advanced customization.

Think of it like gaining **Administrator rights** on Windows or **sudo access** on Linux.

### Why Root?

| Benefit | Description |
|-------|-------------|
| 🔒 **Control** | Remove preinstalled bloat, disable telemetry |
| ⚡ **Performance** | Tune CPU, GPU, battery, animations |
| 🛡️ **Privacy** | Block trackers, restrict app permissions |
| 🎨 **Customization** | Change UI, fonts, boot animations, navigation |
| 💾 **True Backups** | Backup app data and system settings |

### Benefits vs Risks

| ✅ Benefits | ⚠️ Risks & Considerations |
|:--|:--|
| System-wide ad blocking | May void warranty |
| Full app control | Security exposure if misused |
| Performance tuning | Instability/bootloops possible |
| Deep customization | OTA update friction |
| True backups (app data) | App integrity checks may fail (banking/DRM) |


---

## Pre-Root Checklist

**⚡ Follow all steps from [fynks.github.io/check-list](https://fynks.github.io/check-list/), ensure you’re fully prepared.**

---

## Rooting Guides

### The 4-Step Rooting Process

Follow this proven path:

1. **Unlock Bootloader**  
   → [Bootloader Unlock Guide](docs/android-root-guides/how-to-unlock-bootloader.md)  
   *Required for most root methods*

2. **Install Custom Recovery**  
   → [TWRP / OrangeFox Guide](docs/android-root-guides/how-to-install-custom-recovery.md)  
   *Needed to flash root and mods*

3. **Choose & Install Root Method**  
   → [Compare Magisk, KernelSU, APatch](#root-methods-comparison)

4. **Post-Root Setup**  
   → Install [essential apps and modules](./docs/android-root-apps/index.md#featured-apps-the-essentials)  
   → Configure root hiding, backups, ad blockers

> 📢 **Note for Android 14/15:** Play Integrity is stricter. Root hiding may break apps. Stay updated.

---

### Root Methods Comparison

| Method | Best For | Key Features | Guide |
|:---|:---|:---|:---|
| **Magisk** | Most users | Systemless root, Zygisk, rich module ecosystem | [Magisk Guide](docs/android-root-guides/magisk-guide.md) |
| **KernelSU** | Kernel-savvy users | Kernel-level root, better isolation, no patching | [KernelSU Guide](docs/android-root-guides/kernelsu-guide.md) |
| **APatch** | Locked or complex devices | No kernel rebuild, modern alternative | [APatch Guide](docs/android-root-guides/apatch-guide.md) |
| **LSPosed** | Xposed lovers | Run modules without system mods | [LSPosed Guide](docs/android-root-guides/lsposed-guide.md) |

> You can checkout complete comparison here: **[Root Solutions Comparison](./docs/android-root-guides/index.md#root-solutions-comparison)

---

### Device-Specific Guides

| Brand | Guide | Notes |
|:---|:---|:---|
| **Google Pixel** | [Root Guide](docs/android-root-guides/how-to-root-pixel-phone.md) | A/B partition, AVB/verity handling |
| **Samsung** | [Root Guide](docs/android-root-guides/how-to-root-samsung-phone.md) | Odin flashing, Knox implications |
| **Xiaomi/HyperOS** | [Root Guide](docs/android-root-guides/how-to-root-xiaomi-phone.md) | Mi Unlock wait, fastbootd quirks |
| **OnePlus** | [Root Guide](docs/android-root-guides/how-to-root-oneplus-phone.md) | OxygenOS/ColorOS transition |
| **Nothing Phone** | [Root Guide](docs/android-root-guides/how-to-root-nothing-phone.md) | Firmware slotting, custom recovery |
| **Motorola** | [Root Guide](docs/android-root-guides/how-to-root-motorola-phone.md) | Fastboot token, minimal recovery |

---

### Additional Guides

| Topic | Guide |
|:---|:---|
| **Custom ROMs** | [ROM Installation Guide](docs/android-root-guides/custom-rom-installation.md) |
| **All Rooting Tutorials** | [Rooting Guides Index](docs/android-root-guides/index.md) |

---

## Root Apps and Modules

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

### 🛠️ Essential Tools

| Tool | Purpose | Guide | Source |
|:---|:---|:---|:---|
| **Magisk** | Systemless root | [Guide](docs/android-root-guides/magisk-guide.md) | [GitHub](https://github.com/topjohnwu/Magisk) |
| **TWRP/Orange Fox** | Custom recovery | [Recovery Guide](docs/android-root-guides/how-to-install-custom-recovery.md) | [twrp.me](https://twrp.me)/ <br> [OrangeFox](https://orangefox.download/)  |
| **ADB/Fastboot** | Flashing & debugging | [Platform Tools](https://developer.android.com/studio/releases/platform-tools) | [Android Devs](https://developer.android.com/studio/releases/platform-tools) |
| **Odin** | Samsung flashing | [Samsung Guide](docs/android-root-guides/how-to-root-samsung-phone.md) | [SamFw](https://samfw.com) |
| **Mi Flash** | Xiaomi flashing | [Xiaomi Guide](docs/android-root-guides/how-to-root-xiaomi-phone.md) | [Xiaomi Flash Tool](https://xiaomiflashtool.com) |

---

### 📦 Stock Firmware Sources

| Brand | Official Sources |
|:---|:---|
| **Google Pixel** | [Google Factory Images](https://developers.google.com/android/images) |
| **Samsung** | [SamMobile](https://www.sammobile.com/firmwares/) / [SamFw](https://samfw.com) |
| **Xiaomi** | [MIUI Download](https://c.mi.com/global/miuidownload/index) / [Xiaomi Firmware Updater](https://xiaomifirmwareupdater.com) |
| **Nothing** | [GitHub Archive](https://github.com/spike0en/nothing_archive) |
| **Motorola** | [Lolinet Mirrors](https://mirrors.lolinet.com/firmware/moto/) |

---

### 📘 Learning & How-Tos

| Guide | Purpose | Link |
|:---|:---|:---|
| **Ad Blocking** | Block ads system-wide | [Ad Blocking Guide](docs/guides/android-adblocking.md) |
| **Debloating** | Remove bloat safely | [Debloat Guide](docs/guides/android-apps-debloating.md) |
| **Backup & Restore** | Full app + data backup | [Backup Guide](docs/guides/app-backup-restore-using-root.md) |
| **Stop Auto-Updates** | Control Play Store | [Disable Auto-Update](docs/guides/stop-android-app-auto-updates-play-store.md) |

---

### Emergency & Recovery

| Issue | Solution | Guide |
|:---|:---|:---|
| **Bootloop** | Disable modules, wipe cache | [Bootloop Fix](docs/faqs.md#device-wont-boot) |
| **Root Not Detected** | Re-flash root method | [Root Issues](docs/faqs.md#root-not-working) |
| **Banking Apps Fail** | Enable root hiding | [Play Integrity Fix](docs/faqs.md#play-integrity-and-banking-apps) |
| **Hard Brick** | Use fastboot/ODIN to restore | [Brick Recovery](docs/faqs.md#bricked-device-recovery) |

---

### 🌐 Communities & Forums

| Platform | Focus | Link |
|:---|:---|:---|
| **XDA Developers** | ROMs, rooting, development | [Forum](https://forum.xda-developers.com/) |
| **r/AndroidRoot** | General rooting help | [Reddit](https://reddit.com/r/AndroidRoot) |
| **r/Magisk** | Magisk modules & issues | [Reddit](https://reddit.com/r/Magisk) |
| **r/LineageOS** | Custom ROM support | [Reddit](https://reddit.com/r/LineageOS) |

---

### 🎥 Educational Channels

| Channel | Focus | Link |
|:---|:---|:---|
| **XDA Developers** | Tutorials & news | [YouTube](https://www.youtube.com/user/xdadevelopers) |
| **Android Authority** | Reviews & guides | [YouTube](https://www.youtube.com/user/AndroidAuthority) |

> 💡 **Pro Tip**: Always cross-check video tutorials with our [written guides](docs/android-root-guides/index.md) for accuracy.

---

## 🤝 Community and Contributing

### Official Channels
| Platform | Purpose | Link |
|:---|:---|:---|
| **Website** | Browse apps & modules | [awesome-android-root.org](https://awesome-android-root.org) |
| **GitHub** | Source & issues | [GitHub Repo](https://github.com/awesome-android-root/awesome-android-root) |
| **X/Twitter** | Updates & news | [@awsm_and_root](https://x.com/awsm_and_root) |

### How You Can Help
- ⭐ [Star the repo](https://github.com/awesome-android-root/awesome-android-root)  
- 🐛 [Report issues](https://github.com/awesome-android-root/awesome-android-root/issues)  
- 💡 [Suggest new apps/modules](https://github.com/awesome-android-root/awesome-android-root/issues)  
- 📝 [Submit PRs](docs/contributing.md)  
- 💖 [Sponsor the project](https://opencollective.com/awesome-android-root-official)

---

## 💖 Support the Project

Your contributions keep this resource alive:

[![Become a Sponsor](https://img.shields.io/badge/%20💖-Become%20a%20Sponsor-ff69b4?style=for-the-badge)](https://opencollective.com/awesome-android-root-official)
[![Star the Repo](https://img.shields.io/badge/%20⭐-Star%20this%20Repo-yellow?style=for-the-badge)](https://github.com/awesome-android-root/awesome-android-root)
[![Share Project](https://img.shields.io/badge/%20📢-Share%20Project-blue?style=for-the-badge)](https://twitter.com/intent/tweet?text=Check%20out%20this%20amazing%20Android%20rooting%20resource!&url=https://awesome-android-root.org)

---

## Legal & Safety

> ⚠️ **This project is for educational purposes only.**  
Rooting can **void warranty**, **brick your device**, or **erase data**. Proceed at your own risk. Always back up and research your device.

### Key Safety Rules:
- Always **back up** before flashing
- Verify **file checksums**
- Understand **AVB, verity, and dynamic partitions**
- Keep **ADB/Fastboot tools** ready
- Have a **recovery plan**

Respect app ToS and local laws.

---

<div align="center">

**⚡ Built with ❤️ by [Awesome Android Root](https://github.com/awesome-android-root/awesome-android-root)**

---

[![X Follow](https://img.shields.io/badge/Follow%20US-000?logo=X&logoColor=fff&style=for-the-badge)](https://x.com/awsm_and_root)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Fawesome-android-root.org%2F&style=for-the-badge)](https://awesome-android-root.org/)

</div>
