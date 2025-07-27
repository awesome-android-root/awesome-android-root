---
layout: doc
title: Complete Custom Recovery Installation Guide
description: "Master guide to install custom recovery - TWRP, OrangeFox, SKYHAWK. Gateway to rooting, custom ROMs, and advanced Android modifications."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-install-custom-recovery
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Custom Recovery Installation Guide - TWRP & More
  - - meta
    - property: og:description
      content: Install custom recovery with our comprehensive guide covering TWRP, OrangeFox, and SKYHAWK for Android rooting and ROM installation.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/how-to-install-custom-recovery
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/custom-recovery.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Custom Recovery Installation Guide
  - - meta
    - name: twitter:description
      content: Install TWRP, OrangeFox, and SKYHAWK custom recovery for Android rooting and customization.
  - - meta
    - name: keywords
      content: custom recovery installation, twrp installation, orangefox recovery, skyhawk recovery, android recovery mode, custom recovery guide
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Modification
  - - meta
    - property: article:tag
      content: Custom Recovery
  - - meta
    - property: article:tag
      content: TWRP
  - - meta
    - property: article:tag
      content: Android Rooting  
  - - meta
    - name: robots
      content: index, follow
---

# Complete Custom Recovery Installation Guide

**Your gateway to Android customization** - Install custom recovery to unlock rooting, custom ROMs, and advanced system management.

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md)** - Universal rooting principles and safety
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - Required prerequisite
- **[📱 Custom ROM Installation](./custom-rom-installation.md)** - Next step after recovery
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions for common issues

## ⚡ What is Custom Recovery?

Custom recovery replaces Android's stock recovery with an enhanced system that unlocks advanced modification capabilities:

### Core Advantages
- **Complete NANDroid Backups** - Full system snapshots for safe experimentation
- **Custom ROM Installation** - Gateway to LineageOS, GrapheneOS, Pixel Experience
- **Root Solution Management** - Install Magisk, KernelSU, APatch efficiently
- **Advanced File Operations** - Partition management and system repair tools
- **Enhanced ADB Access** - Powerful debugging and troubleshooting capabilities

### Requirements Path
1. 🔓 **[Unlock bootloader](./how-to-unlock-bootloader.md)** ← Start here
2. 🛠️ **Install custom recovery** (this guide)
3. ⚡ **[Install root solution](./index.md)** ← Next step

::: danger ⚠️ ESSENTIAL PREREQUISITE
**Unlocked bootloader required!** Complete [bootloader unlocking](./how-to-unlock-bootloader.md) first.
:::

## Recovery Options

Choose the best recovery for your needs:

### TWRP (Recommended for Beginners)
**[Team Win Recovery Project](https://twrp.me/)** - Most popular and stable

- ✅ **Widest device support** and extensive documentation
- ✅ **Proven stability** with large community
- ✅ **Touch interface** with easy navigation
- ❌ Basic interface design
- **Best for:** First-time users, maximum compatibility

### OrangeFox (Best Interface)
**[OrangeFox Recovery](https://orangefox.download/)** - Modern TWRP-based recovery

- ✅ **Beautiful modern interface** with Material Design
- ✅ **Enhanced features** and improved file manager
- ✅ **TWRP compatible** with regular updates
- ❌ Limited device support vs TWRP
- **Best for:** Users wanting modern UI and extra features

### SKYHAWK/SHRP (Advanced Features)
**[SKYHAWK Recovery](https://skyhawkrecovery.github.io/)** - Feature-rich with dashboard

- ✅ **Unique dashboard interface** with built-in tools
- ✅ **Security features** (password protection)
- ✅ **Integrated Magisk installer** and theming
- ❌ Newest project with smallest device support
- **Best for:** Power users wanting cutting-edge features

::: tip 💡 Quick Decision Guide
- **New to custom recovery?** → Choose TWRP
- **Want modern interface?** → Choose OrangeFox  
- **Need advanced features?** → Choose SKYHAWK
- **Device not supported?** → Check XDA Forums for unofficial builds
:::

## ✅ Prerequisites & Preparation

### Essential Requirements
- **[🔓 Unlocked Bootloader](./how-to-unlock-bootloader.md)** - Mandatory prerequisite
- **Platform Tools** - [Download ADB/Fastboot](https://developer.android.com/studio/releases/platform-tools)
- **USB Drivers** - Manufacturer-specific drivers installed
- **Recovery Image** - Device-specific file from official sources
- **Quality USB Cable** - Data transfer capable

### Critical Safety Checks
::: danger ⚠️ ESSENTIAL WARNINGS
- **Device Model Match** - Wrong recovery = potential brick
- **Battery Level 50%+** - Prevent interruption during flash
- **Backup Creation** - Full system backup recommended
- **Warranty Impact** - Process voids manufacturer warranty
:::

### Preparation Steps
1. **Verify Device Information**
   - Settings → About Phone → Model Number
   - Note exact model and Android version
   
2. **Download Recovery Sources**
   - **TWRP:** [twrp.me/Devices](https://twrp.me/Devices/) (Universal compatibility)
   - **OrangeFox:** [orangefox.download](https://orangefox.download/) (Modern interface)
   - **SKYHAWK:** [skyhawkrecovery.github.io](https://skyhawkrecovery.github.io/Devices.html) (Advanced features)

## 🚀 Installation Process

### Step 1: Download & Prepare Recovery
1. **Download Recovery Image**
   - Visit official source for your chosen recovery
   - Select your exact device model
   - Download latest `.img` file

2. **Setup Working Directory**
   - Place recovery file in platform-tools folder
   - Rename to simple name: `recovery.img`
   - Open terminal/command prompt in this folder

### Step 2: Enter Fastboot Mode
**ADB Method (Recommended):**
```bash
adb reboot bootloader
```

**Hardware Keys Method:**
- Power off device completely
- Hold Volume Down + Power until fastboot appears
- (Key combination varies by manufacturer)

**Verify Connection:**
```bash
fastboot devices
```
*Expected: Device serial number displayed*

### Step 3: Flash Custom Recovery
::: warning ⚠️ CRITICAL VERIFICATION
**Double-check device model compatibility before flashing!**
:::

**Flash Command:**
```bash
fastboot flash recovery recovery.img
```

**Success Indicators:**
- `Sending 'recovery'` message
- `Writing 'recovery'` confirmation  
- `OKAY` status with timing info

### Step 4: Boot to Recovery (Essential!)
**Immediately boot to prevent stock recovery restoration:**

```bash
fastboot boot recovery.img
```

*Or use hardware keys: Volume Up + Power (varies by device)*

::: tip 💡 Why Boot Immediately?
Some devices automatically restore stock recovery on first normal boot. Booting to custom recovery first prevents this restoration.
:::

## Post-Installation

### 1. Verify Installation
- Boot to recovery using hardware keys (Volume Up + Power)
- Navigate through menus to test touch/button response
- Check if all features load properly

### 2. Create NANDroid Backup (Critical!)
::: tip 💾 CREATE BACKUP FIRST
**Always create a complete backup before making any system changes!**
:::

**In recovery interface:**
1. Go to **Backup** section
2. Select partitions:
   - ✅ **Boot** (essential)
   - ✅ **System** (essential)
   - ✅ **Data** (recommended)
   - ✅ **Recovery** (for safety)
3. Start backup (takes 10-30 minutes)
4. Store backup files safely

### 3. Test Basic Functions
- **File manager** - Browse system folders
- **Flash test** - Try flashing a simple zip
- **Wipe functions** - Test cache wipe (safe)

## Essential Operations

### Installing ZIP Files
1. Download `.zip` file to device storage
2. Boot to recovery
3. **Install** → Navigate to file → **Swipe to confirm**
4. **Reboot System** when complete

### Managing Backups
- **Create:** Backup → Select partitions → Start
- **Restore:** Restore → Select backup → Choose partitions → Confirm
- **Store safely:** Copy backups to computer/cloud storage

### Wiping System
- **Factory Reset:** Wipe → Factory Reset (keeps internal storage) 
- **Advanced Wipe:** Choose specific partitions (System, Data, Cache, etc.)
- **Format Data:** Complete data partition wipe (loses encryption)

::: warning ⚠️ Wipe Warnings
- **System wipe** removes Android OS - have ROM ready to flash
- **Data wipe** removes all user data and apps
- **Format Data** removes encryption - requires password/PIN reset
:::

## Troubleshooting

### Common Issues

#### Recovery Won't Boot
**Problem:** Device stuck on boot screen or bootloop
**Solutions:**
1. **Re-flash recovery:**
   ```bash
   fastboot flash recovery recovery.img
   ```
2. **Try different recovery version** or different recovery project
3. **Emergency: Flash stock recovery** if available

#### "No OS Installed" Warning
**Problem:** Recovery shows system not detected
**Solutions:**
1. **Ignore and reboot** - often boots normally anyway
2. **Flash custom ROM** if this was your intention
3. **Restore system backup** if available

#### Touch Not Working
**Problem:** Cannot navigate recovery with touch
**Solutions:**
1. **Use hardware keys** - Volume keys navigate, Power selects
2. **Try different recovery** - Some have better touch support
3. **Check device compatibility** - May need specific build

#### Recovery Disappears
**Problem:** Custom recovery replaced by stock after reboot
**Solutions:**
1. **Install root solution** (Magisk) to prevent replacement
2. **Boot to recovery immediately** after flashing
3. **Avoid normal boot** until root is installed

### Emergency Recovery

If recovery is completely broken:

1. **Boot to fastboot:**
   ```bash
   fastboot devices
   ```

2. **Flash stock recovery:**
   ```bash
   fastboot flash recovery stock_recovery.img
   ```

3. **Flash stock ROM if needed:**
   - Samsung: Use Odin + stock firmware
   - Xiaomi: Mi Flash Tool + fastboot ROM  
   - OnePlus: MSM Download Tool
   - Google: Factory images

### Advanced Troubleshooting

**Fastboot not working:**
- Check USB drivers (Windows)
- Try different USB port/cable
- Enable OEM unlocking again
- Use different computer

**Recovery crashes:**
- Wrong recovery for device variant
- Corrupted download - re-download
- Hardware incompatibility

---

## Next Steps

**Recovery installed successfully!** Choose your path:

### For Beginners
1. **[Install Magisk](./index.md)** - Most popular root solution
2. **Practice with recovery** - Create backups, flash simple mods
3. **Read FAQ** - Common questions answered

### For Advanced Users  
1. **[Try KernelSU/APatch](./index.md)** - Kernel-based root alternatives
2. **[Install custom ROM](./custom-rom-installation.md)** - Complete Android replacement
3. **[Set up development environment](./index.md)** - For ROM building

### Need Help?
- **[Complete FAQ](../faqs.md)** - Troubleshooting guide
- **[Join community](../about.md)** - Get support from other users
- **XDA Forums** - Device-specific help

::: tip 🎉 Congratulations!
You've successfully installed custom recovery! This unlocks the full potential of Android modification. Take time to explore the interface and always backup before making changes.
:::
