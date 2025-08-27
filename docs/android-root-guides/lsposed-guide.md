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

**The modern Xposed implementation** – Master **LSPosed Framework** for advanced Android customization and app modifications.

---

## 🔗 Essential Resources

- **[Main Rooting Guide](./index.md)** – Universal rooting principles and device preparation  
- **[Magisk Guide](./magisk-guide.md)** – Required root solution with Zygisk  
- **[Custom Recovery](./how-to-install-custom-recovery.md)** – Installation method option  
- **[FAQ & Troubleshooting](../faqs.md)** – Solutions for common issues  
- **[Popular LSPosed Modules](../android-root-apps/index.md)** – Ready-to-use modules list  

---

## What is LSPosed?

**LSPosed** is the modern successor to the classic Xposed framework, reimagined for Android 8.0+ with a focus on **stability**, **performance**, and **compatibility**. It leverages **Zygisk** and **Magisk** to hook into the Android system and apps without modifying the system partition.

### Core Features

- **Zygisk-based Hooking** – Runs securely inside Magisk's Zygisk module
- **Scoped Hooking** – Choose which apps modules affect
- **Modern API Support** – Compatible with Android 8.1–14+
- **Active Development** – Regular updates and bug fixes
- **Lightweight & Stable** – Minimal performance overhead

---

## Prerequisites & Requirements

### Essential Requirements

- ✅ **Rooted Android device** – via [Magisk](./magisk-guide.md) or [KernelSU](./kernelsu-guide.md)
- ✅ **Magisk v24.0+** – Latest version with Zygisk enabled
- ✅ **Zygisk Enabled** – Must be turned ON in Magisk settings
- ✅ **Android 8.1–14+** – Supported versions
- ✅ **Architecture Support** – arm64-v8a, x86_64, or arm32 (limited)

### Magisk Configuration

```bash
# Check Magisk version
magisk --version
# Should return v24.0 or higher

# Confirm Zygisk status
magisk --status
# Look for "Zygisk: enabled"
```

::: warning ⚠️ Important
**LSPosed requires Zygisk to function.** Make sure it is enabled in Magisk Manager before proceeding.
:::

### Device Compatibility

- ✅ **Supported:** Pixel, Nexus, OnePlus, Samsung (stock OneUI), AOSP-based ROMs
- ⚠️ **Limited:** MIUI, EMUI (especially older versions)
- ❌ **Not Supported:** Android Go, Fire OS

---

## Installation Guide

::: warning ⚠️ Important
We are using the **[JingMatrix fork of LSPosed](https://github.com/JingMatrix/LSPosed)**, as the original LSPosed development has ceased.
:::

### Method 1: Magisk Manager (Recommended)

**Best for:** Most users, especially beginners

#### Step 1: Enable Zygisk
1. Open **Magisk Manager**
2. Go to **Settings** → **Zygisk** → **Enable**
3. **Reboot** your device

#### Step 2: Install LSPosed Module
1. Download the **latest LSPosed ZIP** from [GitHub Actions](https://github.com/JingMatrix/LSPosed/actions/workflows/core.yml?query=branch%3Amaster)
2. In Magisk Manager, go to **Modules** → **Install from Storage**
3. Select the downloaded ZIP file
4. Reboot your device

#### Step 3: Access LSPosed Manager
1. After reboot, you should see a **notification** from LSPosed
2. Tap the notification to open the **LSPosed Manager**
3. Grant **root permissions** when prompted

### Method 2: Custom Recovery Installation (TWRP)

**Best for:** Devices without Magisk Manager access

#### Steps:
1. Download the **Zygisk-compatible LSPosed ZIP**
2. Boot into **Custom Recovery (TWRP)**
3. Flash the ZIP as a **Magisk module**
4. Reboot and check for the LSPosed notification

---

## First Time Setup

### Verify Installation

After reboot, you should see:
- ✅ LSPosed notification in the status bar
- ✅ LSPosed Manager app should open without errors
- ✅ No critical errors in the **Logs** tab

### Basic Configuration

1. Open **LSPosed Manager**
2. Grant **root permissions**
3. Go to **Settings** and enable:
   - **Enable resources hook** – For theming and UI mods
   - **Verbose logs** – For troubleshooting
   - **Enable modules for system framework** – For system-level mods

4. Set up **manager shortcut** and optional **biometric lock**

### Status Check via ADB

```bash
# Check if LSPosed is running
adb shell su -c "ps -ef | grep lspd"

# Check Magisk Zygisk status
adb shell su -c "magisk --status"

# View LSPosed logs
# Open LSPosed Manager → Logs
```

---

## Installing Modules

### Module Sources

- ✅ **Official Repository**: [https://modules.lsposed.org/](https://modules.lsposed.org/)
- ⚠️ **GitHub Releases**
- ⚠️ **XDA Developers**
- ⚠️ **Telegram Channels**

::: warning ⚠️ Safety Notice
Only install modules from **trusted developers**. Malicious modules can cause crashes, security issues, or data loss.
:::

### Installation Methods

#### 1. From LSPosed Repository
1. Open **LSPosed Manager** → **Repository**
2. Browse and select a module
3. Tap **Install**
4. Configure **Scope** (target apps)
5. Reboot if needed

#### 2. Manual APK Installation
1. Download module APK
2. Install it normally
3. Go to **LSPosed Manager** → **Modules**
4. Enable the module
5. Set scope

#### 3. Import from File
1. Download APK
2. Open LSPosed Manager → **Modules** → **+**
3. Select APK file
4. Install and configure

### Scope Management

Scope defines which apps a module affects:
- System Framework
- Specific apps
- All apps (use with caution)

To configure:
1. Open **LSPosed Manager**
2. Go to **Modules**
3. Tap the module
4. Adjust scope (app list or system-wide)

---

## Popular Modules

### App Enhancements
- **[ChromeXt](https://github.com/JingMatrix/ChromeXt)** – Chrome customization
- **[WA Enhancer](https://github.com/Dev4Mod/WaEnhancer)** – WhatsApp feature pack
- **[RevancedXposed](https://github.com/chsbuffer/RevancedXposed)** – YouTube ad remover

### Social Media
- **[InstaEclipse](https://github.com/ReSo7200/InstaEclipse/)** – Instagram customization
- **[Re-Telegram](https://github.com/Sakion-Team/Re-Telegram/)** – Telegram enhancements
- **[QAuxiliary](https://github.com/cinit/QAuxiliary)** – QQ modifications

::: tip 💡 Pro Tip
Check out our [Root Apps & Modules Guide](../android-root-apps/index.md) for over **300+ tested modules**.
:::

---

## 🛠️ Troubleshooting

### LSPosed Not Loading

**Checklist:**
1. Ensure **Zygisk is enabled**
2. Use **Magisk v24.0+**
3. Reinstall LSPosed module
4. Clear LSPosed data:  
   ```bash
   adb shell su -c "rm -rf /data/data/org.lsposed.manager"
   ```

### Modules Not Working

**Troubleshooting Steps:**
1. Check module **scope settings**
2. Ensure target app is supported
3. Update module to latest version
4. Enable **verbose logs** and check for errors

### App Crashes with Modules

**Fixes:**
1. Disable modules one by one
2. Check app version compatibility
3. Report issues to module devs
4. Use **Safe Mode** to isolate issues

### LSPosed Manager Not Opening

**Solutions:**
1. Clear notification and wait for new one
2. Reboot device
3. Check if manager app is **disabled**
4. Reinstall LSPosed module

---

## Uninstallation Guide

### Method 1: Magisk Manager
1. Open **Magisk Manager** → **Modules**
2. Find and **remove LSPosed module**
3. Reboot device

### Method 2: Manual Removal

```bash
adb shell su -c "rm -rf /data/adb/modules/lsposed*"
adb shell su -c "rm -rf /data/adb/lspd"
adb reboot
```

### Method 3: Recovery Removal
1. Boot into **TWRP**
2. Go to `/data/adb/modules/`
3. Delete **LSPosed folder**
4. Reboot device

### Clean Module Removal

```bash
adb shell su -c "pm uninstall [module.package.name]"
adb shell su -c "rm -rf /data/data/[module.package.name]"
```

---

## Pro Tips

💡 **Best Practices:**
- Start with **one module at a time**
- Use **verbose logs** for debugging
- Join the **[LSPosed Telegram Group](https://t.me/LSPosed)**
- Follow module developers on **GitHub/XDA**
- Backup working configurations
- Always read **module changelogs**

---

## Next Steps

**Explore More:**
- **[Popular Root Apps & Modules](../android-root-apps/)** – Over 300+ tested modules
- **[Custom ROM Installation Guide](./custom-rom-installation.md)**
- **[KernelSU Root Guide](./kernelsu-guide.md)**
- **[FAQ & Troubleshooting](../faqs.md)**

---

**Need help?** check our **[FAQ section](../faqs.md)** for solutions.