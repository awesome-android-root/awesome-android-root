---
layout: doc
title: Complete Magisk Root Guide
description: "Master Magisk rooting - the universal systemless root solution. Comprehensive installation guide with modules, management, and troubleshooting."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/magisk-guide
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Magisk Root Guide - Universal Android Rooting
  - - meta
    - property: og:description
      content: Install Magisk root with our comprehensive guide. Systemless rooting solution with advanced module system and root management.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/magisk-guide
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/magisk-guide.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Magisk Root Guide
  - - meta
    - name: twitter:description
      content: Universal systemless Android rooting with Magisk. Advanced module support and root management.
  - - meta
    - name: keywords
      content: magisk root guide, systemless root, magisk installation, magisk modules, android rooting, zygisk, magisk manager
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Rooting
  - - meta
    - property: article:tag
      content: Magisk
  - - meta
    - property: article:tag
      content: Systemless Root
  - - meta
    - property: article:tag
      content: Android Rooting
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: article:tag
      content: Systemless Root
  - - meta
    - property: article:tag
      content: Magisk Modules
  - - meta
    - name: robots
      content: index, follow
---

# Complete Magisk Root Guide

**The universal systemless root solution** - Master Magisk installation, modules, and management for comprehensive Android customization.

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md)** - Universal rooting principles and device preparation
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - Required prerequisite
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - Installation method option
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions for common issues

## ⚡ What is Magisk?

Magisk revolutionizes Android rooting with its systemless approach, providing comprehensive root access while maintaining system integrity:

### Core Innovation
- **Systemless Architecture** - Root without modifying system partition
- **Magic Mount Technology** - Dynamic file system overlays
- **Universal Compatibility** - Works across Android versions and devices
- **Reversible Changes** - Complete uninstallation capability
- **Advanced Module System** - Extensible plugin architecture

### Magisk vs Traditional Root Methods

| Feature | Magisk | Traditional Root | KernelSU |
|---------|--------|------------------|----------|
| **System Modification** | None (systemless) | Direct system changes | Kernel-level |
| **SafetyNet** | Can pass with setup | Usually fails | Variable |
| **OTA Updates** | Survives with steps | Breaks updates | Complex |
| **Module System** | Advanced ecosystem | Limited | Growing |
| **Reversibility** | Complete removal | Requires reflash | Partial |

## ✅ Prerequisites & Compatibility

### Essential Requirements
- **[🔓 Unlocked Bootloader](./how-to-unlock-bootloader.md)** - Mandatory prerequisite
- **Android 5.0+** - Minimum supported version
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - TWRP, OrangeFox, or SKYHAWK
- **Platform Tools** - [Download ADB/Fastboot](https://developer.android.com/studio/releases/platform-tools)
- **Stock Boot Image** - For direct patching method

### Installation Method Options
1. **Custom Recovery Method** (Recommended for beginners)
   - Flash Magisk ZIP through TWRP/OrangeFox
   - Safest and most universal approach
   
2. **Boot Patching Method** (Advanced users)
   - Patch boot.img directly with Magisk app
   - Requires stock firmware extraction

## Features & Benefits

### 🔥 **Core Features**
- **MagiskSU** - Full root access for applications
- **Magisk Modules** - Systemless modifications via OverlayFS
- **MagiskBoot** - Complete tool for boot image manipulation
- **Zygisk** - Run code in every Android app's process
- **DenyList** - Hide root from specific apps

## Requirements

### 📋 **Essential Prerequisites**
- ✅ **Unlocked bootloader** - [Bootloader unlock guide](./how-to-unlock-bootloader.md)
- ✅ **Custom recovery** (TWRP recommended) - [Recovery installation guide](./how-to-install-custom-recovery.md)
- ✅ **Stock boot.img** - Original boot image for your firmware
- ✅ **Computer with ADB/Fastboot** - [Platform Tools](https://developer.android.com/studio/releases/platform-tools)
- ✅ **40%+ battery** - Sufficient power for installation

### 💾 **Required Downloads**
- **[Magisk APK](https://github.com/topjohnwu/Magisk/releases/latest)** (Latest: v29.0)
- **Stock firmware** for your device (for boot.img extraction)
- **Custom recovery** compatible with your device

::: warning ⚠️ Important
Always download Magisk from the **official GitHub repository only**. Fake versions may contain malware or cause bootloops.
:::

## Installation Methods

### Method 1: Custom Recovery Installation (Recommended)

**Best for:** First-time users, most reliable method

#### **Step 1: Prepare Files**
```bash
# Download latest Magisk APK
# Rename .apk to .zip (e.g., Magisk-v29.0.apk → Magisk-v29.0.zip)
```

#### **Step 2: Flash via Recovery**
1. **Boot to recovery** - Power + Volume Down/Up (device dependent)
2. **Backup current ROM** - Always create nandroid backup first
3. **Flash Magisk**:
   - Select "Install" or "Install ZIP"
   - Navigate to renamed Magisk ZIP file
   - Swipe to confirm flash
4. **Reboot system** - Do not install TWRP app if prompted

#### **Step 3: Install Magisk Manager**
1. **Install APK** - Install the original Magisk APK file
2. **Grant permissions** - Allow all requested permissions
3. **Verify installation** - Check if root access is working

### Method 2: Boot Image Patching (Advanced)

**Best for:** Devices without custom recovery, A/B partition devices

#### **Step 1: Extract Boot Image**
```bash
# From stock firmware ZIP
unzip firmware.zip boot.img

# Or from device (requires root)
adb shell
su
dd if=/dev/block/bootdevice/by-name/boot of=/sdcard/boot.img
```

#### **Step 2: Patch Boot Image**
1. **Install Magisk APK** on your device
2. **Open Magisk Manager** 
3. **Tap "Install"** → "Select and Patch a File"
4. **Select boot.img** you extracted
5. **Wait for patching** - Creates magisk_patched_[random].img
6. **Copy patched image** to computer

#### **Step 3: Flash Patched Boot**
```bash
# Boot to fastboot mode
adb reboot bootloader

# Flash patched boot image
fastboot flash boot magisk_patched_[random].img

# Reboot device
fastboot reboot
```

### Method 3: Direct Installation (Magisk Already Installed)

**For updating Magisk or switching installation methods**

1. **Open Magisk Manager**
2. **Tap "Install"** next to Magisk
3. **Choose method:**
   - "Direct Install" - Updates existing installation
   - "Install to Inactive Slot" - For A/B devices
4. **Reboot when prompted**

## First Time Setup

### 🎯 **Initial Configuration**

#### **1. Verify Installation**
```bash
# Check via ADB
adb shell
su
# Should show root shell (#)
```

#### **2. Configure Magisk Manager**
- **Update channel:** Stable (recommended) or Beta
- **Auto-update:** Enable for security updates
- **Restart system:** After major updates

#### **3. Basic Settings**
- **Multiuser mode:** Disable (unless needed)
- **Mount namespace mode:** Global (default)
- **Automatic response:** Grant (for trusted apps)

### 🔐 **Root Permission Management**

#### **Grant Root Access**
1. **App requests root** - Popup appears
2. **Review request** - Check app legitimacy
3. **Choose duration:**
   - Forever (trusted apps)
   - Session only (testing)
   - Deny (suspicious apps)

#### **Root Access Logs**
- **Access history** - See which apps used root
- **Detailed logs** - Commands executed by root apps
- **Security monitoring** - Detect unauthorized access

## Magisk Manager

### 🏠 **Main Interface**

#### **Status Section**
- **Magisk version** - Currently installed version
- **SafetyNet status** - Pass/Fail for banking apps
- **Device info** - Android version, security patch

#### **Quick Actions**
- **Install** - Update or install Magisk
- **Modules** - Manage installed modules
- **Superuser** - Root permission management
- **Logs** - Debug and error information

### ⚙️ **Settings Configuration**

#### **Update Settings**
- **Update channel:** Stable vs Beta releases
- **Auto-update:** Automatic security updates
- **Download via:** WiFi only vs Mobile data

#### **Magisk Core Settings**
- **Zygisk:** Enable for advanced module features
- **Enforce DenyList:** Hide root from specified apps
- **Systemless hosts:** Enable system-wide ad blocking

#### **App Settings**
- **Hide Magisk app:** Rename to avoid detection
- **Biometric authentication:** Secure manager access
- **Language:** Interface localization

## Magisk Modules

### 📦 **What are Modules?**

Magisk modules are systemless modifications that add features or modify system behavior without touching the actual system partition.

#### **Module Structure**
```
module_root/
├── META-INF/
│   └── com/google/android/
│       ├── update-binary
│       └── updater-script
├── module.prop          # Module metadata
├── service.sh          # Boot service script
├── post-fs-data.sh     # Early boot script
└── system/             # System modifications
```

### 🔥 **Popular Modules**

#### **Performance & Battery**
- **[Universal GMS Doze](https://github.com/gloeyisk/universal-gms-doze)** - Optimize Google Play Services
- **[Extreme Battery Saver](https://github.com/Magisk-Modules-Alt-Repo/Xtreme-Battery-Saver)** - Aggressive power saving

#### **Privacy & Security**
- **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Detach apps from Play Store
- **[Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)** - Advanced root hiding

::: tip 
Visit our [Root Apps and Modules Section](../android-root-apps/index.md) for more than 290+ apps and modules
:::

### 📥 **Installing Modules**

#### **Method 1: Magisk Manager Repository**
1. **Open Magisk Manager**
2. **Tap "Modules"** tab
3. **Browse available modules**
4. **Tap module** → "Install"
5. **Reboot** when installation completes

#### **Method 2: Manual ZIP Installation**
1. **Download module ZIP** from trusted source
2. **Open Magisk Manager** → "Modules"
3. **Tap "Install from storage"**
4. **Select ZIP file**
5. **Reboot** to activate

#### **Method 3: Recovery Installation**
1. **Boot to custom recovery**
2. **Flash module ZIP** like any other ZIP
3. **Reboot system**

### 🛠️ **Module Management**

#### **Enable/Disable Modules**
- **Toggle switch** - Enable/disable without removing
- **Remove button** - Completely uninstall module
- **Update check** - Keep modules current

#### **Module Troubleshooting**
```bash
# Disable all modules (emergency)
adb shell touch /data/adb/modules/.disable_all

# Remove specific module
adb shell rm -rf /data/adb/modules/module_name

# Safe mode boot
# Boot without any modules loaded
```

## Zygisk & DenyList

### 🔍 **Zygisk Explained**

**Zygisk** (Zygote + Magisk) allows Magisk to run code in every Android application's process, enabling advanced features like root hiding and app hooking.

#### **Key Features**
- **Process injection** - Run code in app contexts
- **Root hiding** - Make root invisible to specific apps
- **Module enhancement** - Advanced module capabilities
- **Improved compatibility** - Better app support

### 🛡️ **DenyList Configuration**

DenyList hides root access from apps that shouldn't detect it (banking apps, games, streaming services).

#### **Enable DenyList**
1. **Open Magisk Manager**
2. **Settings** → "Zygisk" → **Enable**
3. **Settings** → "Enforce DenyList" → **Enable**
4. **Reboot device**

#### **Configure DenyList**
1. **Magisk Manager** → "DenyList"
2. **Find target app** (e.g., banking app)
3. **Enable checkbox** for the app
4. **Select processes** to hide root from
5. **Test app** - Should no longer detect root

#### **Advanced DenyList**
```bash
# Command line DenyList management
magisk --denylist add com.app.package
magisk --denylist rm com.app.package
magisk --denylist ls
```

### 📱 **Common Apps for DenyList**
- **Banking:** Chase, Bank of America, Wells Fargo
- **Payment:** Google Pay, Samsung Pay, PayPal
- **Streaming:** Netflix, Disney+, Hulu
- **Games:** Pokémon GO, Call of Duty Mobile
- **Work:** Microsoft Intune, enterprise apps

## Troubleshooting

### 🚨 **Common Issues**

#### **Installation Failed**
**Symptoms:** Magisk won't install or bootloop after installation
```bash
# Solutions:
1. Verify bootloader is unlocked
2. Use correct boot.img for your firmware
3. Try different installation method
4. Check recovery compatibility
```

#### **Root Not Working**
**Symptoms:** Apps can't get root access
```bash
# Fixes:
1. Reinstall Magisk Manager APK
2. Check Superuser settings
3. Clear Magisk Manager data
4. Reflash Magisk ZIP
```

#### **SafetyNet Failing**
**Symptoms:** Banking apps detect root
```bash
# Solutions:
1. Enable Zygisk + DenyList
2. Install Universal SafetyNet Fix module
3. Hide Magisk Manager (rename app)
4. Add banking apps to DenyList
```

#### **Modules Not Working**
**Symptoms:** Installed modules have no effect
```bash
# Troubleshooting:
1. Ensure Zygisk is enabled (if module requires it)
2. Check module compatibility with Android version
3. Verify module installation in /data/adb/modules/
4. Reboot after module installation
```

### 🔧 **Emergency Recovery**

#### **Boot Loop Fix**
```bash
# Method 1: Disable modules
adb shell touch /data/adb/modules/.disable_all
adb reboot

# Method 2: Remove problematic module
adb shell rm -rf /data/adb/modules/problem_module

# Method 3: Magisk Safe Mode
# Hold Volume Up during boot (device dependent)
```

#### **Complete Magisk Removal**
```bash
# Via recovery (if accessible)
1. Flash Magisk uninstaller ZIP
2. Or restore clean boot.img backup

# Via fastboot (last resort)
fastboot flash boot stock_boot.img
fastboot reboot
```

### 📊 **Debug Information**

#### **Collect Logs**
1. **Magisk Manager** → "Logs"
2. **Save logs** before reporting issues
3. **Include device info** and steps to reproduce

#### **Useful Commands**
```bash
# Check Magisk status
magisk --version

# List modules
ls /data/adb/modules/

# Check SELinux status
getenforce

# Verify mount points
mount | grep magisk
```

## Uninstallation

### 🗑️ **Complete Removal**

#### **Method 1: Magisk Manager**
1. **Open Magisk Manager**
2. **Tap "Uninstall"** → "Complete Uninstall"
3. **Confirm removal**
4. **Reboot device**

#### **Method 2: Recovery Method**
1. **Download Magisk uninstaller** from GitHub releases
2. **Boot to recovery**
3. **Flash uninstaller ZIP**
4. **Reboot system**

#### **Method 3: Fastboot Method**
```bash
# Flash original boot image
fastboot flash boot stock_boot.img
fastboot reboot
```

### 🧹 **Clean Removal**
```bash
# Remove all traces
adb shell rm -rf /data/adb/magisk*
adb shell rm -rf /data/adb/modules
adb shell rm -rf /data/magisk*
```

::: tip 💡 Pro Tips
- Always backup your working setup before making changes
- Test modules one at a time to identify problems
- Keep stock firmware files for emergency recovery
- Join Magisk community forums for help and updates
- Regularly update Magisk for security and compatibility
:::

## Next Steps

🎯 **Continue Your Android Journey:**
- **[LSPosed Guide](./lsposed-guide.md)** - Advanced Xposed framework
- **[KernelSU Guide](./kernelsu-guide.md)** - Alternative kernel-based root
- **[Custom ROM Installation](./custom-rom-installation.md)** - Transform your Android experience
- **[Root Apps Collection](../android-root-apps/)** - Best apps for rooted devices

---

**Need help?** Join our community discussions or check the [FAQ section](../faqs.md) for common questions and solutions.