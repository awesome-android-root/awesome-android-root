---
layout: doc
title: Custom ROM Installation Guide 2025
description: "Complete step-by-step custom ROM installation guide for 2025 for installing LineageOS,CalyxOS GrapheneOS, Pixel Experience & more. "
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/custom-rom-installation
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Custom ROM Installation Guide 2025 - LineageOS, GrapheneOS & More
  - - meta
    - property: og:description
      content: Master custom ROM installation with our comprehensive 2025 guide. Compare Android-based OS options, install LineageOS, GrapheneOS, Pixel Experience with step-by-step instructions.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/custom-rom-installation
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/custom-rom.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Custom ROM Installation Guide 2025 - Android-based OS
  - - meta
    - name: twitter:description
      content: Complete guide to install custom ROMs like LineageOS, GrapheneOS, Pixel Experience. Compare privacy & security features across Android distributions.
  - - meta
    - name: keywords
      content: custom rom installation guide 2025, lineageos installation, grapheneos guide, pixel experience rom, android based operating systems, custom rom comparison, aosp distribution, android privacy roms, security focused android, degoogled android, custom android firmware
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/fynks/awesome-android-root
  - - meta
    - property: article:section
      content: Rooting Guides
  - - meta
    - property: article:tag
      content: Custom ROM
  - - meta
    - property: article:tag
      content: LineageOS
  - - meta
    - property: article:tag
      content: GrapheneOS
  - - meta
    - property: article:tag
      content: Android Privacy
  - - meta
    - property: article:published_time
      content: 2025-06-25
  - - meta
    - property: article:modified_time
      content: 2025-06-25
  - - meta
    - name: robots
      content: index, follow, max-image-preview:large
---

# Custom ROM Installation Guide

Complete guide to installing custom Android ROMs - Transform your device with privacy-focused, security-enhanced Android distributions.

## Table of Contents
- [Quick Start](#quick-start)
- [What are Custom ROMs?](#what-are-custom-roms)
- [Popular ROM Comparison](#popular-rom-comparison)
- [Installation Steps](#installation-steps)
- [ROM-Specific Guides](#rom-specific-guides)
- [Finding ROMs](#finding-roms)
- [Setup & Troubleshooting](#setup--troubleshooting)

## Quick Start

**Ready to transform your Android?** Here's your complete roadmap:

1. **Unlock bootloader** → [Guide](./how-to-unlock-bootloader.md)
2. **Install custom recovery** → [Guide](./how-to-install-custom-recovery.md)
3. **Choose your ROM** → [Comparison](#popular-rom-comparison)
4. **Find device support** → [ROM Database](#finding-roms)
5. **Backup everything** → Recovery backup
6. **Flash ROM** → [Steps](#installation-steps)
7. **Setup & optimize** → [Post-install](#setup--troubleshooting)

**Prerequisites Check:**
✅ Bootloader unlocked  
✅ Custom recovery installed (TWRP/OrangeFox)  
✅ ADB/Fastboot tools ready  
✅ Device charged 70%+  

**Related Guides:**
- [Complete Rooting Guide](./index.md) - Master rooting guide
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Required step
- [Custom Recovery](./how-to-install-custom-recovery.md) - Required step
- [FAQ & Troubleshooting](../faqs.md) - Support guide

## What are Custom ROMs?

**Custom ROMs** are modified versions of Android that replace your device's stock firmware. Think of them as alternative Android distributions, similar to different Linux distributions.

### Why Choose Custom ROMs?

**✅ Benefits:**
- Extended device lifespan with continued updates
- Enhanced privacy and security controls
- Minimal or no bloatware
- Deep customization options
- Better performance and battery life
- Optional Google services integration

**❌ Trade-offs:**
- Warranty void (usually reversible)
- Banking apps may require extra setup
- Potential stability issues on newer ROMs
- Learning curve for setup and maintenance

### Stock vs Custom ROM Comparison

| **Stock Android** | **Custom ROMs** |
|-------------------|-----------------|
| Official support, guaranteed updates | Community-driven, extended support |
| Limited customization | Extensive customization freedom |
| Bloatware included | Clean, minimal experience |
| Forced Google integration | Optional Google services |
| Banking apps work seamlessly | May require root hiding |

**Best for:** Privacy-conscious users, developers, those wanting to revive older devices, or users seeking maximum customization control.

## Popular ROM Comparison

### Privacy & Security Focused

#### GrapheneOS - Maximum Security
- **Focus:** Hardened security for Google Pixel devices only
- **Key Features:** Hardware-verified boot, sandboxed Google Play, enhanced permissions
- **Best For:** Security professionals, privacy advocates
- **Device Support:** Google Pixel devices only

#### CalyxOS - Privacy with Usability  
- **Focus:** Privacy-focused with better app compatibility
- **Key Features:** microG integration, built-in firewall, F-Droid integration
- **Best For:** Privacy users needing app compatibility
- **Device Support:** Primarily Google Pixel devices

### General Use ROMs

#### LineageOS - Most Popular
- **Focus:** Clean Android experience with essential features
- **Key Features:** Widest device support (300+ devices), Privacy Guard, regular updates
- **Best For:** General users wanting stock Android with enhancements
- **Device Support:** Check [CustomROMBay.org](https://customrombay.org/)

#### Pixel Experience - Stock Google Feel
- **Focus:** Authentic Google Pixel UI on non-Pixel devices
- **Key Features:** Pixel UI, Google features, monthly updates
- **Best For:** Users wanting genuine Pixel experience
- **Device Support:** Popular devices with official builds

### Customization-Focused

#### crDroid - Feature-Rich
- **Focus:** Extensive customization based on LineageOS
- **Key Features:** Advanced customization, performance optimizations
- **Best For:** Power users wanting maximum control
- **Device Support:** Growing LineageOS-based support

#### EvolutionX - Pixel + Customization
- **Focus:** Pixel UI with additional customization options
- **Key Features:** Pixel base with theming, performance focus
- **Best For:** Users wanting Pixel experience with customization
- **Device Support:** Growing list of supported devices

**📊 Complete Comparison:** [Android OS Comparison Chart](https://eylenburg.github.io/android_comparison.htm) - Detailed privacy, security, and feature analysis.

## Prerequisites

### Essential Requirements
✅ **[Unlocked Bootloader](./how-to-unlock-bootloader.md)** - Required for all custom ROMs  
✅ **[Custom Recovery](./how-to-install-custom-recovery.md)** - TWRP or similar installed  
✅ **ADB/Fastboot Tools** - Platform tools for device communication  
✅ **70%+ Battery** - Prevent interruptions during installation  
✅ **Stable USB Connection** - Quality cable and reliable computer  
✅ **Compatible ROM** - Verified support for your exact device model  

### Critical Safety Steps
⚠️ **BACKUP EVERYTHING** - Create complete NANDroid backup via custom recovery  
⚠️ **VERIFY DEVICE** - Match exact device codename and region  
⚠️ **DOWNLOAD STOCK ROM** - Keep original firmware for emergency recovery  

**Double-check device compatibility** - Installing wrong ROM can brick your device!

## Installation Steps

### Step 1: Prepare Files
1. **Verify Device Compatibility**
   ```bash
   adb shell getprop ro.product.device  # Check device codename
   ```

2. **Download Required Files**
   - Custom ROM zip for your specific device
   - GApps package (if ROM doesn't include Google services)
   - Transfer files to device storage/SD card

### Step 2: Create Full Backup
1. **Boot to Recovery**
   ```bash
   adb reboot recovery
   ```

2. **Create NANDroid Backup**
   - Recovery → Backup → Select all partitions
   - Name with date and current ROM info
   - Wait 10-30 minutes for completion

### Step 3: Wipe Device
⚠️ **This erases all data - ensure backup is complete!**

1. **Factory Reset**
   - Wipe → Factory Reset
   - Wipe Dalvik/Cache
   - Advanced Wipe → System (for clean install)

### Step 4: Flash ROM
1. **Install ROM**
   - Install → Select ROM zip file
   - Swipe to confirm flash
   - Wait 5-15 minutes

2. **Flash Additional Packages** (if needed)
   - GApps (immediately after ROM)
   - Magisk (for root access)
   - Custom kernels or mods

### Step 5: First Boot
1. **Reboot System**
   - First boot takes 5-15 minutes
   - Don't interrupt the process!

2. **Initial Setup**
   - Complete Android setup wizard
   - Configure accounts and preferences

## ROM-Specific Installation

### GrapheneOS (Pixel Devices Only)
**Uses web installer instead of custom recovery**

1. **Visit [GrapheneOS Install Page](https://grapheneos.org/install/)**
2. **Use Chrome/Chromium browser** with WebUSB support
3. **Connect device** with USB debugging enabled
4. **Follow web installer** - automatic process handles everything
5. **Complete setup** with privacy-focused configuration

**Benefits:** Maximum security, hardware-verified boot, sandboxed Google Play

### LineageOS (Most Devices)
**Standard custom recovery method**

1. **Find ROM at [LineageOS Downloads](https://download.lineageos.org/)**
2. **Download** LineageOS zip + GApps (optional)
3. **Follow standard installation steps** above
4. **Flash GApps immediately** after ROM (if desired)

**Benefits:** Widest device support, clean Android experience, regular updates

### Pixel Experience (Popular Devices)
**Brings Pixel features to non-Pixel devices**

1. **Download from [Pixel Experience](https://download.pixelexperience.org/)**
2. **Choose Plus** (includes GApps) or Regular version
3. **Follow standard installation steps**
4. **Setup Pixel features** during initial configuration

**Benefits:** Authentic Pixel UI, Google integration, monthly updates

## Finding ROMs

### Best ROM Databases

#### 1. CustomROMBay.org
🔗 **[CustomROMBay.org](https://customrombay.org/)** - Most comprehensive database

- **811 supported devices** across all manufacturers
- **Organized by brand** (Samsung, Xiaomi, OnePlus, etc.)
- **Direct download links** - no complicated navigation
- **Multiple ROM options** for each device
- **Update status** shown for each ROM

**How to use:**
1. Visit [CustomROMBay.org](https://customrombay.org/)
2. Find your device manufacturer
3. Select your device model
4. Browse available ROMs
5. Download with direct links

#### 2. Official ROM Websites
- **LineageOS:** [download.lineageos.org](https://download.lineageos.org/)
- **GrapheneOS:** [grapheneos.org/releases](https://grapheneos.org/releases)
- **Pixel Experience:** [download.pixelexperience.org](https://download.pixelexperience.org/)
- **CalyxOS:** [calyxos.org/get](https://calyxos.org/get/)

#### 3. XDA Developers Forums
- Device-specific discussions and support
- Developer releases and beta ROMs
- Community troubleshooting

### Compatibility Verification

**Before downloading, verify:**
- **Exact device codename** (e.g., `vayu` for POCO X3 Pro)
- **Region variant** (some devices have region-specific builds)
- **Architecture** (ARM64/ARM32)
- **Bootloader version** requirements

**Check device info:**
```bash
adb shell getprop ro.product.device    # Device codename
adb shell getprop ro.product.cpu.abi   # Architecture
adb shell getprop ro.bootloader        # Bootloader version
```

## Setup & Troubleshooting

### Post-Installation Setup

#### Essential Configuration
1. **Complete setup wizard** - Configure basic Android settings
2. **Restore app data** - Reinstall apps or restore from backup
3. **Configure accounts** - Add Google/other accounts as needed
4. **Privacy settings** - Review and adjust permissions

#### Privacy & Security (For Privacy ROMs)
- **Review app permissions** - Audit carefully
- **Configure firewall** - Set up network controls
- **Disable telemetry** - Turn off data collection
- **Private DNS** - Configure DNS over HTTPS/TLS

#### Performance Optimization
- **Battery optimization** - Configure adaptive battery
- **Background limits** - Restrict background apps
- **Storage management** - Set up automatic cleanup

### Common Issues & Solutions

#### Boot Problems
**Device stuck on boot logo/bootloop:**
1. Boot to recovery → Clear cache/dalvik cache
2. Reflash ROM (wipe system first)
3. Check GApps compatibility
4. Restore NANDroid backup as last resort

**"System UI stopped" errors:**
1. Clear System UI cache (Apps → System UI → Storage → Clear Cache)
2. Wipe cache partition in recovery
3. Disable custom themes
4. Factory reset if other methods fail

#### Banking Apps Not Working
1. **Enable DenyList** in Magisk (hide root from banking apps)
2. **Install SafetyNet fix** modules
3. **Use work profile** to isolate banking apps
4. **Consider stock ROM** for apps requiring strict validation

#### Performance Issues
**Poor battery life:**
1. Check background apps and limit activity
2. Disable unused features
3. Adjust performance profile/CPU governor
4. Consider custom kernel for better power management

**System lag:**
1. Clear cache partition in recovery
2. Reduce animations in developer options
3. Ensure sufficient free storage (>15%)
4. Close unnecessary background apps

### Recovery Options

#### Complete System Recovery
1. **Boot to recovery mode**
2. **Restore NANDroid backup** - Select backup → Choose all partitions → Wait 15-30 minutes

#### Return to Stock ROM
1. **Download stock firmware** for your device
2. **Use manufacturer tools** (Odin for Samsung, MiFlash for Xiaomi)
3. **Flash via download/fastboot mode**
4. **Follow device-specific instructions**

### Recommended Apps

#### Open Source Essentials
- **F-Droid** - Open source app store
- **Aurora Store** - Play Store alternative
- **Shelter** - Work profile management
- **NetGuard** - Network firewall

#### Privacy Tools
- **Signal** - Secure messaging
- **Tor Browser** - Anonymous browsing
- **Bitwarden** - Password manager
- **ProtonMail** - Encrypted email

## What's Next?

**Congratulations!** You've successfully installed a custom ROM. Here's your next steps:

### Advanced Customization
- **[Add Root Access](./index.md#root-solutions-comparison)** - Install Magisk, KernelSU, or APatch
- **[Custom Kernels](./index.md#advanced-framework-solutions)** - Optimize performance and features
- **[LSPosed Modules](./index.md#lsposed-framework)** - Deep system modifications

### Resources & Community
- **[CustomROMBay.org](https://customrombay.org/)** - ROMs for 811 devices
- **[FAQ & Troubleshooting](../faqs.md)** - Common issues and solutions
- **[Join Community](../about.md#community--resources)** - Connect with other users

### Security & Privacy
- **Regular Updates** - Keep ROM updated with latest security patches
- **Privacy Audits** - Regularly review app permissions and data usage
- **Backup Strategy** - Maintain current NANDroid backups

**Need help?** Check XDA Developers forums for device-specific support or visit our [FAQ section](../faqs.md) for common issues.
