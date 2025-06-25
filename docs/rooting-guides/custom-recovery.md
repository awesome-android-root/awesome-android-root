---
layout: doc
title: Custom Recovery Installation Guide 2025 | Awesome Android Root
description: "Complete custom recovery installation guide for 2025. Learn to install TWRP, OrangeFox, and SKYHAWK Recovery with step-by-step instructions for all Android devices. Essential for rooting and ROM flashing."
head:
  - - link
    - rel: canonical
      href: https://awesome-root.org/rooting-guides/custom-recovery
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Custom Recovery Installation Guide 2025 - TWRP, OrangeFox, SKYHAWK
  - - meta
    - property: og:description
      content: Master custom recovery installation with our comprehensive 2025 guide covering TWRP, OrangeFox, and SKYHAWK Recovery. Step-by-step instructions with troubleshooting for all Android devices.
  - - meta
    - property: og:url
      content: https://awesome-root.org/rooting-guides/custom-recovery
  - - meta
    - property: og:image
      content: https://awesome-root.org/images/og.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Custom Recovery Installation Guide 2025 - TWRP, OrangeFox, SKYHAWK
  - - meta
    - name: twitter:description
      content: Master custom recovery installation with comprehensive guides for TWRP, OrangeFox, and SKYHAWK Recovery on all Android devices.
  - - meta
    - name: keywords
      content: custom recovery guide 2025, TWRP installation, OrangeFox recovery, SKYHAWK recovery, custom recovery flash, fastboot flash recovery, android custom recovery, twrp 3.7.1, orangefox download, shrp recovery, recovery mode android, flash recovery img, custom recovery tutorial, android recovery installation, twrp guide, recovery flashing guide
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Custom Recovery
  - - meta
    - property: article:tag
      content: Custom Recovery
  - - meta
    - property: article:tag
      content: TWRP
  - - meta
    - property: article:tag
      content: OrangeFox
  - - meta
    - property: article:tag
      content: SKYHAWK Recovery
  - - meta
    - property: article:tag
      content: Recovery Installation
  - - meta
    - property: article:tag
      content: Fastboot Flash
  - - meta
    - property: article:tag
      content: Android Recovery
  - - meta
    - property: article:tag
      content: ROM Flashing
  - - meta
    - property: article:tag
      content: Android Modification
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: viewport
      content: width=device-width, initial-scale=1.0
  - - meta
    - property: article:published_time
      content: 2025-01-01T00:00:00Z
  - - meta
    - property: article:modified_time
      content: 2025-06-25T00:00:00Z
---

# Custom Recovery Installation Guide

Complete guide to installing custom recovery on Android devices - your gateway to advanced modifications, custom ROMs, and powerful system management tools.

## Table of Contents
- [Quick Start](#quick-start)
- [What is Custom Recovery?](#what-is-custom-recovery)
- [Recovery Options Comparison](#recovery-options-comparison)
  - [TWRP - Team Win Recovery Project](#twrp---team-win-recovery-project)
  - [OrangeFox Recovery](#orangefox-recovery)
  - [SKYHAWK Recovery Project (SHRP)](#skyhawk-recovery-project-shrp)
- [Before You Begin](#before-you-begin)
  - [Prerequisites](#prerequisites)
  - [Important Warnings](#important-warnings)
- [Universal Installation Steps](#universal-installation-steps)
- [Post-Installation Setup](#post-installation-setup)
- [Using Your Custom Recovery](#using-your-custom-recovery)
- [Troubleshooting](#troubleshooting)
- [Advanced Topics](#advanced-topics)

## Quick Start

**Ready to install custom recovery?** Follow this roadmap:

1. 🔓 **[Unlock bootloader](./bootloader-unlocking.md)** - Essential prerequisite
2. 🔍 **[Choose recovery](#recovery-options-comparison)** - TWRP, OrangeFox, or SKYHAWK
3. 📋 **[Check prerequisites](#prerequisites)** - Ensure you have everything ready
4. 📱 **[Find your device](#finding-recovery-for-your-device)** - Download correct recovery image
5. 🛠️ **[Install recovery](#universal-installation-steps)** - Flash using fastboot
6. ✅ **[Verify installation](#post-installation-setup)** - Test recovery functionality

::: tip 🚀 Prerequisites Check
Before starting, ensure you have completed [bootloader unlocking](./bootloader-unlocking.md) and have ADB/Fastboot tools ready. Custom recovery installation requires an unlocked bootloader.
:::

## What is Custom Recovery?

**Custom recovery** is a specialized environment that replaces your device's stock recovery mode, providing advanced system management capabilities:

### Key Functions
- 📦 **Flash Custom ROMs** - Install LineageOS, Pixel Experience, and other custom Android versions  
- 🔧 **Install Root Solutions** - Flash Magisk, KernelSU, and APatch packages
- 💾 **Complete System Backups** - Create and restore NANDroid backups of entire system
- 🗂️ **Advanced File Management** - Mount partitions and manage system files
- 🧹 **System Maintenance** - Wipe cache, dalvik, and perform factory resets
- 🔄 **Update Management** - Install OTA updates and custom firmware

### Stock vs Custom Recovery

| **Stock Recovery** | **Custom Recovery** |
|-------------------|-------------------|
| ✅ Factory reset and cache wipes | ✅ All stock features plus advanced options |
| ✅ Official OTA updates | ✅ Custom ROM and kernel installation |
| ❌ No custom ROM support | ✅ Complete system backups (NANDroid) |
| ❌ Limited file management | ✅ Advanced file manager with root access |
| ❌ No root package installation | ✅ Flash Magisk, KernelSU, and custom packages |
| ❌ Basic interface | ✅ Touch-friendly modern interface |

## Recovery Options Comparison

### TWRP - Team Win Recovery Project

**[TWRP](https://twrp.me/)** - The most popular and widely supported custom recovery

#### Latest Version: 3.7.1 (February 2024)

**Pros:**
- ✅ **Widest Device Support** - Largest compatibility across Android devices
- ✅ **Mature and Stable** - Years of development and testing
- ✅ **Extensive Documentation** - Comprehensive guides and community support
- ✅ **Touch Interface** - Full touchscreen navigation
- ✅ **Active Community** - Large user base and developer community

**Cons:**
- ❌ **Basic Interface** - Older, less modern design
- ❌ **Limited Theming** - Minimal customization options
- ❌ **Development Slowing** - Updates less frequent recently

**Best For:** 
- First-time users seeking maximum compatibility
- Devices with official TWRP support
- Users wanting proven stability

**Device Support:** [Check TWRP Device Database](https://twrp.me/Devices/)

### OrangeFox Recovery

**[OrangeFox Recovery](https://orangefox.download/)** - Modern TWRP-based recovery with enhanced features

**Pros:**
- ✅ **Modern Interface** - Beautiful, intuitive design with Material Design elements
- ✅ **Enhanced Features** - Additional tools and utilities beyond standard TWRP
- ✅ **Regular Updates** - Active development with frequent improvements
- ✅ **TWRP Compatibility** - Full compatibility with TWRP scripts and functions
- ✅ **Advanced File Manager** - Improved file management capabilities

**Cons:**
- ❌ **Limited Device Support** - Fewer officially supported devices than TWRP
- ❌ **Newer Project** - Less long-term stability testing
- ❌ **Larger Size** - More storage space required

**Best For:**
- Users wanting modern interface and enhanced features  
- Devices with official OrangeFox support
- Advanced users appreciating extra utilities

**Device Support:** [Check OrangeFox Downloads](https://orangefox.download/)

### SKYHAWK Recovery Project (SHRP)

**[SKYHAWK Recovery](https://skyhawkrecovery.github.io/)** - Feature-rich recovery with dashboard interface

#### Latest Version: 3.1

**Pros:**
- ✅ **Dashboard Interface** - Unique dashboard design for easy navigation
- ✅ **Built-in Tools** - Integrated Magisk installer, Camera2API enabler
- ✅ **Security Features** - Password lock protection for recovery access
- ✅ **Theming Support** - Multiple theme options (Dark, Black, White)
- ✅ **Modern Design** - Clean, contemporary interface

**Cons:**
- ❌ **Newest Project** - Least mature of the three options
- ❌ **Limited Device Support** - Smallest device compatibility list
- ❌ **Less Documentation** - Fewer guides and community resources

**Best For:**
- Users wanting cutting-edge features and modern design
- Devices with official SHRP support  
- Power users who appreciate integrated tools

**Device Support:** [Check SHRP Devices](https://skyhawkrecovery.github.io/Devices.html)

## Before You Begin

### Prerequisites

::: danger ⚠️ ESSENTIAL REQUIREMENTS
**You MUST have these completed before proceeding:**

1. **[🔓 Unlocked Bootloader](./bootloader-unlocking.md)** - Custom recovery requires unlocked bootloader
2. **📱 ADB/Fastboot Tools** - [Setup guide here](./bootloader-unlocking.md#step-3-set-up-adb-and-fastboot)
3. **💻 USB Debugging Enabled** - [Enable in Developer Options](./bootloader-unlocking.md#step-2-enable-critical-developer-settings)
:::

#### Additional Requirements
- ✅ **Device Drivers** - Proper USB drivers installed (Windows)
- ✅ **Recovery Image** - Correct recovery file for your exact device model
- ✅ **Backup** - Complete device backup before proceeding
- ✅ **Battery** - At least 50% charge on device
- ✅ **Stable Connection** - Quality USB cable and reliable computer

### Important Warnings

::: warning ⚠️ CRITICAL WARNINGS
**Read these warnings carefully:**

- **📱 DEVICE-SPECIFIC**: Using wrong recovery image can brick your device
- **🔄 IRREVERSIBLE**: Some devices cannot return to stock recovery easily  
- **⚡ POWER LOSS**: Interruption during flashing can cause serious issues
- **🔒 WARRANTY**: Further voids warranty beyond bootloader unlocking
- **🛡️ SECURITY**: Custom recovery provides root-level system access
:::

## Universal Installation Steps

These steps apply to all custom recovery installations:

### Step 1: Download Recovery Image

#### Finding Recovery for Your Device

1. **Identify Your Device:**
   - Find exact model number: Settings → About Phone → Model Number
   - Note Android version and build number
   - Identify device codename (important for downloads)

2. **Download from Official Sources:**
   
   **For TWRP:**
   - Visit [TWRP.me](https://twrp.me/Devices/)
   - Search for your device model
   - Download latest stable version

   **For OrangeFox:**
   - Visit [OrangeFox Downloads](https://orangefox.download/)
   - Use search to find your device
   - Download latest stable build

   **For SKYHAWK (SHRP):**
   - Visit [SHRP Devices](https://skyhawkrecovery.github.io/Devices.html)
   - Find your device in supported list
   - Download from official channels

::: tip 💡 Device Not Listed?
If your device isn't officially supported:
- Check XDA Developers forum for unofficial builds
- Look for Telegram groups for your device
- Consider TWRP first as it has widest support
:::

### Step 2: Prepare for Installation

1. **Place Recovery File:**
   - Move downloaded `.img` file to ADB/Fastboot folder
   - Rename to simple name: `recovery.img`

2. **Enable USB Debugging:**
   - Ensure USB Debugging is still enabled
   - Connect device to computer

3. **Test ADB Connection:**
```bash
adb devices
```
Expected output: `[device_serial] device`

### Step 3: Boot to Fastboot Mode

Choose your method:

**Method 1: ADB Command (Recommended)**
```bash
adb reboot bootloader
```

**Method 2: Hardware Keys**
- Power off device completely
- Hold Volume Down + Power until fastboot screen appears
- (Key combination varies by manufacturer)

**Method 3: Fastboot Command (if in fastboot already)**
```bash
fastboot devices
```
Verify device is detected: `[device_serial] fastboot`

### Step 4: Flash Custom Recovery

::: warning ⚠️ CRITICAL STEP
**Double-check you have the correct recovery image for your exact device model before proceeding!**
:::

**Flash the recovery:**
```bash
fastboot flash recovery recovery.img
```

**Expected output:**
```
Sending 'recovery' (xxxxx KB)...
OKAY [  x.xxxs]
Writing 'recovery'...
OKAY [  x.xxxs]
Finished. Total time: x.xxxs
```

### Step 5: Boot to Recovery (Important!)

**Immediately boot to recovery to prevent stock recovery restoration:**

**Method 1: Fastboot Command**
```bash
fastboot boot recovery.img
```

**Method 2: Hardware Keys**
- Use Volume buttons to navigate to "Recovery Mode"
- Press Power to select
- Device should boot directly to custom recovery

::: tip 💡 Why Boot Immediately?
Some devices automatically restore stock recovery on first normal boot. Booting to custom recovery first prevents this restoration.
:::

## Post-Installation Setup

### Step 1: Verify Installation

1. **Boot to Recovery:**
   - Power off device
   - Use hardware key combination to enter recovery
   - Should boot to custom recovery interface

2. **Test Basic Functions:**
   - Navigate through menus
   - Test backup function (create test backup)
   - Verify file manager works

### Step 2: Create System Backup

::: tip 💾 CRITICAL: Create Backup Immediately
**Create a NANDroid backup before making any modifications!**
:::

**In Custom Recovery:**
1. Navigate to **Backup** section
2. Select partitions to backup:
   - ✅ **Boot** (essential)
   - ✅ **System** (essential)  
   - ✅ **Data** (user data - optional but recommended)
   - ✅ **Recovery** (to restore current recovery if needed)
3. Start backup process
4. Wait for completion (may take 10-30 minutes)

### Step 3: Configure Recovery Settings

**Recommended Settings:**
- **Enable** screen timeout extension
- **Set** default backup location
- **Configure** advanced features as needed
- **Test** restore functionality with small backup

## Using Your Custom Recovery

### Essential Operations

#### Installing Packages (.zip files)
1. Download files to internal storage or SD card
2. Boot to recovery
3. Select **Install** (or **Flash** in some recoveries)
4. Navigate to file location
5. Select package and swipe to confirm
6. Reboot when complete

#### Creating Backups
1. Go to **Backup** section
2. Select partitions to backup
3. Choose backup location
4. Start backup process
5. Store backup safely

#### Restoring Backups
1. Go to **Restore** section  
2. Select backup location
3. Choose backup to restore
4. Select partitions to restore
5. Confirm and wait for completion

#### Wiping Partitions
1. Go to **Wipe** section
2. Select wipe type:
   - **Factory Reset** - Data and cache
   - **Advanced Wipe** - Choose specific partitions
   - **Format Data** - Complete data partition format

## Troubleshooting

### Common Issues and Solutions

#### Recovery Won't Boot / Bootloop
**Symptoms:** Device stuck on boot screen or boot loops

**Solutions:**
1. **Boot to Fastboot:**
   - Use hardware keys to enter fastboot mode
   - Reflash recovery image
   ```bash
   fastboot flash recovery recovery.img
   ```

2. **Flash Stock Recovery (Emergency):**
   - Download stock recovery for your device
   - Flash using fastboot
   ```bash
   fastboot flash recovery stock_recovery.img
   ```

#### "No OS Installed" Message
**Meaning:** Recovery doesn't detect bootable system

**Solutions:**
1. **Install ROM:**
   - Flash custom ROM if intended
   - Or restore system backup if available

2. **Boot to System:**
   - Try rebooting to system anyway
   - May boot normally despite message

#### Touch Not Working in Recovery
**Causes:** Incompatible recovery image or driver issues

**Solutions:**
1. **Try Different Recovery:**
   - Download different recovery version
   - Try different recovery project (TWRP vs OrangeFox)

2. **Use Hardware Keys:**
   - Volume keys for navigation
   - Power key for selection
   - Check if hardware navigation works

#### Recovery Gets Replaced by Stock
**Symptoms:** Custom recovery disappears after reboot

**Solutions:**
1. **Disable Recovery Replacement:**
   - Root device first
   - Install Magisk to prevent stock recovery restoration

2. **Flash Recovery Again:**
   - Reflash custom recovery
   - Boot directly to recovery after flashing

### Emergency Recovery Procedures

#### Soft Brick Recovery
1. **Boot to Fastboot Mode:**
   ```bash
   fastboot devices  # Verify device detected
   ```

2. **Flash Stock Recovery:**
   ```bash
   fastboot flash recovery stock_recovery.img
   ```

3. **Flash Stock ROM:**
   ```bash
   fastboot flashall  # If fastboot ROM available
   ```

#### Complete Recovery Process
1. **Download stock firmware** for your exact device
2. **Use manufacturer tools:**
   - **Samsung:** Odin + stock firmware
   - **Xiaomi:** Mi Flash Tool + fastboot ROM
   - **OnePlus:** MSM Download Tool
   - **Google Pixel:** Flash factory images

## Advanced Topics

### Custom Recovery Development

**Building Recovery for Unsupported Devices:**
- Requires device tree knowledge
- Android source code compilation
- Testing on actual hardware
- Community contribution process

### Recovery Modifications

**Themes and Customization:**
- Custom themes for supported recoveries
- Icon packs and layout modifications
- Language translations

### Integration with Root Solutions

**Magisk Integration:**
- Automatic Magisk installation from recovery
- Magisk module flashing
- SafetyNet considerations

**KernelSU/APatch Integration:**
- Recovery compatibility with kernel-based solutions
- Module management from recovery

---

## 🗺️ Next Steps

**Successfully installed custom recovery?** Here's what you can do next:

### Immediate Actions
1. **[📋 Create System Backup](#step-2-create-system-backup)** - Essential safety measure
2. **[🔧 Root Your Device](./index.md#root-solutions-comparison)** - Install Magisk, KernelSU, or APatch
3. **[📱 Test Recovery Functions](#using-your-custom-recovery)** - Familiarize yourself with interface

### Advanced Modifications
1. **[🎨 Install Custom ROMs](./custom-rom-installation.md)** - Complete guide to LineageOS, GrapheneOS, Pixel Experience, and more
2. **[🔧 Flash Custom Kernels](./index.md#advanced-framework-solutions)** - Performance and feature enhancements
3. **[📦 Install Recovery Modules](./index.md#advanced-framework-solutions)** - Add-ons and utilities

::: tip 🚀 What's Next After Custom Recovery?
With custom recovery installed, you're ready for advanced Android modifications:

- **[📱 Root Your Device](./index.md#root-solutions-comparison)** - Install Magisk, KernelSU, or APatch for system-level access
- **[🌟 Install Custom ROMs](./custom-rom-installation.md)** - Transform your Android experience with privacy-focused, feature-rich operating systems
- **[🔧 Advanced Customization](./index.md#advanced-framework-solutions)** - LSPosed modules, custom kernels, and system tweaks
:::

### Community Resources
- **💬 XDA Developers** - Device-specific forums and development
- **📱 Telegram Groups** - Real-time help and updates
- **📚 Recovery Documentation** - Official guides and tutorials

::: tip 🎯 Success Tips
- Always backup before major changes
- Use recovery from official sources only
- Join your device's community for support
- Keep stock recovery/firmware as safety net
:::

**Need Help?** Check our [troubleshooting section](#troubleshooting) or join the community discussions for device-specific support!
