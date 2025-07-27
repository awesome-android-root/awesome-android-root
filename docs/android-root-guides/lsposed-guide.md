---
layout: doc
title: Complete LSPosed Framework Guide
description: "Master LSPosed framework - the modern Xposed implementation. Comprehensive installation guide with module management and customization."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/lsposed-guide
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete LSPosed Framework Guide - Modern Xposed Implementation
  - - meta
    - property: og:description
      content: Install LSPosed framework with our comprehensive guide. Modern Xposed implementation with Zygisk integration and advanced module management.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/lsposed-guide
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/lsposed-guide.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete LSPosed Framework Guide
  - - meta
    - name: twitter:description
      content: Modern Xposed framework implementation with LSPosed. Advanced Android customization and module management.
  - - meta
    - name: keywords
      content: lsposed guide, xposed framework, zygisk modules, lsposed installation, android customization, xposed modules
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Customization
  - - meta
    - property: article:tag
      content: LSPosed
  - - meta
    - property: article:tag
      content: Xposed Framework
  - - meta
    - property: article:tag
      content: Android Customization
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: article:tag
      content: Android Customization
  - - meta
    - property: article:tag
      content: Zygisk
  - - meta
    - name: robots
      content: index, follow
---

# Complete LSPosed Framework Guide

**The modern Xposed implementation** - Master LSPosed framework for advanced Android customization and app modifications.

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md)** - Universal rooting principles and device preparation
- **[⚡ Magisk Guide](./magisk-guide.md)** - Required root solution with Zygisk
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - Installation method option
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions for common issues

## ⚡ What is LSPosed?

LSPosed revolutionizes Android customization as the modern successor to the original Xposed framework, providing powerful app modification capabilities:

### Core Innovation
- **ART Hooking Technology** - Direct Android Runtime method interception
- **Zygisk Integration** - Seamless operation within Magisk ecosystem
- **Modern Architecture** - Optimized for Android 8.0+ with enhanced stability
- **Scope Management** - Granular control over module application per app
- **Active Development** - Continuously updated with latest Android support

### LSPosed vs Traditional Xposed

| Feature | LSPosed | Original Xposed | EdXposed |
|---------|---------|-----------------|----------|
| **Android Support** | 8.0+ (active) | 5.0-10 (discontinued) | 8.0-11 (deprecated) |
| **Installation Method** | Zygisk module | System integration | Magisk module |
| **Stability** | High | Variable | Moderate |
| **Module Compatibility** | Modern APIs | Legacy support | Mixed |
| **Performance Impact** | Minimal | Moderate | Variable |

## ✅ Prerequisites & Requirements

### Essential Requirements
- **[⚡ Magisk Root](./magisk-guide.md)** - Latest version with Zygisk enabled
- **Android 8.0+** - Minimum supported version
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - For installation (optional)
- **Developer Knowledge** - Understanding of app modification concepts

### Critical Configuration
::: warning ⚠️ MAGISK ZYGISK REQUIRED
**LSPosed requires Zygisk enabled in Magisk settings!**
- Open Magisk Manager
- Settings → Enable Zygisk
- Reboot device before installing LSPosed
:::

### Compatibility Check
1. **Verify Magisk Version**
   - Magisk 24.0+ recommended
   - Zygisk functionality confirmed
   
2. **System Requirements**
   - ARM64 or ARM32 architecture
   - Android 8.0+ (API level 26+)
   - Root access via Magisk


### 🎯 **Why Choose LSPosed?**
- **Modern Android support** - Works with Android 14+
- **Better stability** - Fewer crashes and bootloops
- **Systemless design** - Doesn't modify system partition
- **Active development** - Regular updates and improvements
- **Module ecosystem** - Access to thousands of Xposed modules

## Requirements

### 📋 **Essential Prerequisites**
- ✅ **Rooted Android device** - [Magisk Guide](./magisk-guide.md) or [KernelSU Guide](./kernelsu-guide.md)
- ✅ **Magisk v24.0+** - Latest version recommended
- ✅ **Zygisk enabled** - Required for LSPosed functionality
- ✅ **Android 8.1 - 15** - Supported Android versions
- ✅ **Compatible architecture** - arm64-v8a or x86_64

### 🔧 **Magisk Configuration**
Before installing LSPosed, ensure Magisk is properly configured:

```bash
# Check Magisk version
magisk --version
# Should show v24.0 or newer

# Verify Zygisk is enabled
# Magisk Manager → Settings → Zygisk → Enable
```

### 📱 **Device Compatibility**
- **Supported:** Most AOSP-based ROMs, stock Android
- **Limited support:** Heavily modified ROMs (MIUI, EMUI older versions)
- **Not supported:** Android Go edition, some custom kernels

::: warning ⚠️ Important
LSPosed **requires** Zygisk to function. Make sure Zygisk is enabled in Magisk settings before installation.
:::

## Installation Guide

::: warning ⚠️ Important
We are using [LSPosed fork by JingMatrix](https://github.com/JingMatrix/LSPosed/) as original LSPosed framework developement has ceased
:::

### Method 1: Magisk Manager Installation (Recommended)

**Best for:** Most users, simplest installation process

#### **Step 1: Enable Zygisk**
1. **Open Magisk Manager**
2. **Settings** → **Zygisk** → **Enable**
3. **Reboot device** to activate Zygisk

#### **Step 2: Install LSPosed Module**
1. **Download LSPosed** from [GitHub Actions](https://github.com/JingMatrix/LSPosed/actions/workflows/core.yml?query=branch%3Amaster)
2. **Open Magisk Manager** → **Modules**
3. **Install from storage** → Select LSPosed ZIP
4. **Reboot device** when installation completes

#### **Step 3: Access LSPosed Manager**
1. **Check notifications** - LSPosed notification should appear
2. **Tap notification** to open LSPosed Manager
3. **Grant permissions** when prompted

### Method 2: Custom Recovery Installation

**Best for:** Users without access to Magisk Manager

#### **Installation Steps**
1. **Download LSPosed ZIP** (Zygisk release)
2. **Boot to custom recovery** (TWRP recommended)
3. **Flash LSPosed ZIP** like any Magisk module
4. **Reboot system**
5. **Access via notification** after boot

## First Time Setup

### 🎯 **Initial Configuration**

#### **1. Verify Installation**
After reboot, you should see:
- **Notification** - "LSPosed is activated"
- **Logs** - No error messages in LSPosed logs
- **Manager access** - App opens without crashes

#### **2. Basic Settings**
1. **Open LSPosed Manager** from notification
2. **Grant root permissions** when prompted
3. **Review settings:**
   - **Enable resources hook** - For theming modules
   - **Verbose logs** - Helpful for troubleshooting
   - **Enable modules for system framework** - Advanced functionality

#### **3. Security Setup**
- **Set manager shortcut** - Create convenient access method
- **Configure authentication** - Biometric lock for manager access
- **Backup module list** - Export configuration for easy restore

### 📊 **Status Check**
```bash
# Verify LSPosed is running
adb shell su -c "ps -ef | grep lspd"

# Check Zygisk status
adb shell su -c "magisk --status"

# View LSPosed logs
# LSPosed Manager → Logs
```

## LSPosed Manager

### 🏠 **Interface Overview**

#### **Main Tabs**
- **Status** - Framework status and device info
- **Modules** - Installed modules management
- **Logs** - Debug information and error messages
- **Settings** - Framework configuration options

### 📱 **Status Tab**

#### **Framework Information**
- **LSPosed version** - Currently installed version
- **API level** - Xposed API compatibility level
- **Framework loaded** - Confirms successful activation
- **Zygisk status** - Shows if Zygisk is working

#### **Device Information**
- **Android version** - OS version and API level
- **Architecture** - Device CPU architecture
- **SELinux status** - Security policy enforcement mode

### ⚙️ **Settings Configuration**

#### **Core Settings**
```yaml
Enable resources hook: ON     # Required for theming modules
Verbose logs: ON             # Detailed debugging information
Disable verbose logs: OFF    # Keep enabled for troubleshooting
```

#### **Advanced Options**
- **Enable modules for system framework** - System-level modifications
- **Delay for framework initialization** - Compatibility with slow devices
- **White list mode** - Only hook specified apps (advanced)

#### **Manager Settings**
- **Hide manager icon** - Prevent app detection
- **Require authentication** - Biometric/PIN protection
- **Theme selection** - Light/dark/automatic themes

## Installing Modules

### 📦 **Module Sources**

#### **Official Repository**
- **[LSPosed Module Repository](https://modules.lsposed.org/)** - Curated, safe modules
- **Quality control** - Tested for compatibility and safety
- **Easy installation** - One-click install from manager

#### **Third-Party Sources**
- **GitHub releases** - Developer repositories
- **XDA Forums** - Community-developed modules
- **Telegram channels** - Beta and experimental modules

::: warning ⚠️ Safety Notice
Only install modules from trusted sources. Malicious modules can compromise device security or cause instability.
:::

### 📥 **Installation Methods**

#### **Method 1: LSPosed Repository**
1. **Open LSPosed Manager** → **Repository** tab
2. **Browse available modules** by category
3. **Select module** → **Install**
4. **Configure scope** (select target apps)
5. **Reboot device** (if required)

#### **Method 2: Manual APK Installation**
1. **Download module APK** from trusted source
2. **Install APK** normally
3. **Open LSPosed Manager** → **Modules**
4. **Enable module** toggle
5. **Configure scope** for target applications

#### **Method 3: Import from File**
1. **Download module APK** to device
2. **LSPosed Manager** → **Modules** → **+** button
3. **Select APK file** from storage
4. **Install and configure**

### 🎯 **Module Configuration**

#### **Scope Management**
**Scope** determines which apps a module affects:

1. **Select module** in LSPosed Manager
2. **Tap "Scope"** or gear icon
3. **Choose target apps:**
   - **System Framework** - System-wide changes
   - **Specific apps** - Target individual applications
   - **All apps** - Universal application (use carefully)

#### **Module Settings**
Many modules have their own settings accessible through:
- **Module's own app** - Dedicated settings interface
- **LSPosed Manager** - Basic enable/disable controls
- **In-app configuration** - Settings within target apps

## Popular Modules

### 🔥 **Essential Modules**

#### **App Modifications**
- **[⭐ ChromeXt](https://github.com/JingMatrix/ChromeXt)** - Chrome browser enhancement
- **[⭐ WA Enhancer](https://github.com/Dev4Mod/WaEnhancer)** - WhatsApp feature additions
- **[RevancedXposed](https://github.com/chsbuffer/RevancedXposed)** - YouTube ad blocking and features

#### **Social Media**
- **[InstaEclipse](https://github.com/ReSo7200/InstaEclipse/)** - Instagram customization
- **[Re-Telegram](https://github.com/Sakion-Team/Re-Telegram/)** - Telegram enhancements
- **[QAuxiliary](https://github.com/cinit/QAuxiliary)** - QQ messenger modifications

::: tip 
Visit our [Root Apps and Modules Section](../android-root-apps/index.md) for more than 300+ apps and modules
:::

## Troubleshooting

### 🚨 **Common Issues**

#### **LSPosed Not Loading**
**Symptoms:** No notification, modules don't work
```bash
# Solutions:
1. Verify Zygisk is enabled in Magisk
2. Check Magisk version (v24.0+ required)
3. Reinstall LSPosed module
4. Check logs for error messages
```

#### **Modules Not Working**
**Symptoms:** Modules enabled but no effect
```bash
# Troubleshooting:
1. Verify module scope configuration
2. Check target app version compatibility
3. Review module logs for errors
4. Test with simple modules first
```

#### **App Crashes with Modules**
**Symptoms:** Target apps crash when modules enabled
```bash
# Fixes:
1. Disable modules one by one to identify culprit
2. Update modules to latest versions
3. Check module compatibility with app version
4. Report issues to module developers
```

#### **LSPosed Manager Not Opening**
**Symptoms:** Can't access LSPosed Manager
```bash
# Solutions:
1. Clear notification and wait for new one
2. Reboot device
3. Check if manager app is hidden/disabled
4. Reinstall LSPosed framework
```

### 🔧 **Advanced Debugging**

#### **Safe Mode Boot**
```bash
# Boot without LSPosed (emergency)
# Method 1: Disable Zygisk temporarily
# Magisk Manager → Settings → Zygisk → Disable

# Method 2: Remove LSPosed module
adb shell su -c "rm -rf /data/adb/modules/lsposed"
```

### 📊 **Performance Optimization**

#### **Reduce Module Load**
- **Minimize scope** - Only target necessary apps
- **Disable unused modules** - Remove modules you don't need
- **Update regularly** - Keep modules current for efficiency

#### **Memory Management**
- **Monitor RAM usage** - Some modules consume significant memory
- **Avoid redundant modules** - Don't install multiple modules for same function
- **Regular cleanup** - Remove old/unused modules

## Uninstallation

### 🗑️ **Complete Removal**

#### **Method 1: Magisk Manager**
1. **Open Magisk Manager** → **Modules**
2. **Find LSPosed module** → **Remove**
3. **Reboot device**
4. **Verify removal** - No LSPosed notification

#### **Method 2: Manual Removal**
```bash
# Remove LSPosed module files
adb shell su -c "rm -rf /data/adb/modules/lsposed*"

# Clean LSPosed data
adb shell su -c "rm -rf /data/adb/lspd"

# Reboot device
adb reboot
```

#### **Method 3: Recovery Removal**
1. **Boot to custom recovery**
2. **File Manager** → Navigate to `/data/adb/modules/`
3. **Delete LSPosed folder**
4. **Reboot system**

### 🧹 **Clean Module Removal**
```bash
# Remove all modules
adb shell su -c "pm uninstall [module.package.name]"

# Clear module data
adb shell su -c "rm -rf /data/data/[module.package.name]"
```

::: tip 💡 Pro Tips
- **Start small** - Begin with simple, trusted modules
- **Test individually** - Install modules one at a time
- **Keep backups** - Backup working configurations
- **Stay updated** - Follow module developers for updates
- **Join communities** - LSPosed Telegram group for support
- **Read documentation** - Each module has specific requirements
:::

## Next Steps

🎯 **Enhance Your Setup:**
- **[Popular Root Apps](../android-root-apps/)** - Best apps for rooted devices
- **[KernelSU Guide](./kernelsu-guide.md)** - Alternative root solution
- **[Custom ROM Installation](./custom-rom-installation.md)** - Transform your Android experience
- **[Advanced Customization Tips](./index.md)** - Take customization further

---

**Need help?** Join the [LSPosed Telegram community](https://t.me/LSPosed) or check our [FAQ section](../faqs.md) for common questions and solutions.