---
layout: doc
title: Complete Bootloader Unlocking Guide
description: "Master bootloader unlocking for all Android manufacturers. Step-by-step instructions for Google Pixel, Xiaomi, Samsung, OnePlus, Motorola, and more."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-unlock-bootloader
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Bootloader Unlocking Guide - All Android Manufacturers
  - - meta
    - property: og:description
      content: Master Android bootloader unlocking with comprehensive guides for all major manufacturers including Google Pixel, Xiaomi, Samsung, OnePlus, and Motorola.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/how-to-unlock-bootloader
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/bootoader.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Bootloader Unlocking Guide - All Manufacturers
  - - meta
    - name: twitter:description
      content: Master bootloader unlocking for all Android manufacturers with step-by-step instructions.
  - - meta
    - name: keywords
      content: bootloader unlock guide, android bootloader unlock, fastboot unlock bootloader, xiaomi mi unlock tool, samsung bootloader unlock, google pixel unlock, oneplus bootloader unlock, motorola unlock code, sony bootloader unlock, oem unlocking, fastboot commands, adb fastboot guide
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Bootloader Unlocking
  - - meta
    - property: article:tag
      content: Bootloader Unlock
  - - meta
    - property: article:tag
      content: Android Bootloader
  - - meta
    - property: article:tag
      content: Fastboot
  - - meta
    - property: article:tag
      content: OEM Unlocking
  - - meta
    - name: robots
      content: index, follow
---

# Complete Bootloader Unlocking Guide

**The essential first step for Android customization** - Unlock bootloaders safely across all major manufacturers.

## Understanding Bootloaders

**A bootloader** is your device's startup manager - the first program that runs when powering on, responsible for loading the operating system and enforcing security policies.

### Why Unlock Your Bootloader?

**Unlocking enables:**
- **Custom recovery installation** (TWRP, OrangeFox)
- **Root access** via Magisk, KernelSU
- **Custom ROM installation** (LineageOS, GrapheneOS)
- **Kernel modifications** for performance tuning
- **Advanced system modifications** and tweaks

### Critical Trade-offs

| **Benefits** | **Consequences** |
|--------------|------------------|
| ✅ Complete customization freedom | ❌ Warranty void (usually permanent) |
| ✅ Install custom ROMs & recovery | ❌ Banking apps may refuse to work |
| ✅ Advanced root capabilities | ❌ Reduced device security |
| ✅ Performance optimizations | ❌ OTA updates may fail |
| ✅ Privacy enhancements | ❌ Potential for device bricking |

::: danger ⚠️ Irreversible Consequences
**DATA ERASURE:** Unlocking bootloader **COMPLETELY WIPES** your device. **BACKUP EVERYTHING** before proceeding.
**WARRANTY VOID:** Most manufacturers permanently void warranty. Some devices show permanent "unlocked" warnings.
:::

## Table of Contents
- [Understanding Bootloaders](#what-is-a-bootloader)
- [Before You Begin](#before-you-begin)
- [Universal Preparation](#universal-preparation)
- [Manufacturer Guides](#manufacturer-guides)
- [Post-Unlock Steps](#post-unlock-steps)
- [Troubleshooting](#troubleshooting)
- [Wall of Shame](#bootloader-unlock-wall-of-shame)

## What is a Bootloader?

A **bootloader** is a small program that runs when your Android device powers on. Think of it as the gatekeeper that:

- **Starts the operating system** - Loads Android when you turn on your device
- **Verifies system integrity** - Checks that the software hasn't been tampered with
- **Controls what can run** - Determines which operating systems and recovery modes are allowed
- **Manages security** - Enforces manufacturer restrictions and security policies

### Locked vs Unlocked Bootloaders

| **Locked Bootloader** | **Unlocked Bootloader** |
|------------------------|--------------------------|
| ✅ Maximum security | ✅ Full customization freedom |
| ✅ Official updates work seamlessly | ✅ Can install custom ROMs |
| ✅ Banking apps work without issues | ✅ Can install custom recovery |
| ❌ No custom modifications allowed | ✅ Advanced root access possible |
| ❌ Cannot install custom recovery | ❌ Voids manufacturer warranty |
| ❌ Limited customization options | ❌ Potential security risks |

## Before You Begin

::: danger ⚠️ CRITICAL WARNINGS
- **🗑️ DATA LOSS**: Unlocking bootloader **WILL ERASE ALL DATA** on your device
- **🔒 WARRANTY VOID**: Most manufacturers void warranty when bootloader is unlocked
- **🏦 BANKING APPS**: Some banking and financial apps may stop working
- **🔐 SECURITY RISK**: Unlocked bootloaders reduce device security
- **📱 BRICK RISK**: Improper procedures can render your device unusable
:::

### What You Need
**Device Requirements:**
- ✅ Supported device (check [Wall of Shame](#bootloader-unlock-wall-of-shame) first)
- ✅ 50%+ battery charge
- ✅ Complete data backup

**Software & Tools:**
- **ADB/Fastboot**: [Platform Tools](https://developer.android.com/studio/releases/platform-tools) or [Minimal ADB](https://androidfilehost.com/?fid=746010030569952951)
- **USB Drivers**: Manufacturer-specific (Windows)
- **Manufacturer Tools**: Mi Unlock Tool (Xiaomi), Odin (Samsung), etc.

**Knowledge & Time:**
- Basic Android/command line familiarity
- 1-3 hours depending on manufacturer

## Universal Preparation

**These steps apply to ALL devices:**

### 1. Enable Developer Options
**Settings** → **About Phone** → Tap **Build Number** 7 times → Enter PIN/password

### 2. Enable Critical Settings
**Settings** → **Developer Options**:
- ✅ **USB Debugging** - Allows computer communication
- ✅ **OEM Unlocking** - Essential for bootloader unlock
- ✅ **USB Debugging (Security Settings)** - If available

::: tip 💡 OEM Unlocking Missing?
- Connect to WiFi and wait 24-48 hours
- Some carriers permanently block this option
- Device may not support unlocking
:::

### 3. Install ADB/Fastboot
**Windows**: Download [Platform Tools](https://developer.android.com/studio/releases/platform-tools), extract to `C:\platform-tools\`

**macOS/Linux**:
```bash
# macOS
brew install android-platform-tools

# Ubuntu/Debian  
sudo apt install android-tools-adb android-tools-fastboot

# Arch Linux
sudo pacman -S android-tools
```

### 4. Test Connection
1. Connect device via USB (select "File Transfer" mode)
2. Allow USB debugging when prompted
3. Test: `adb devices` (should show your device)

### 5. Boot to Fastboot
```bash
adb reboot bootloader
```
**Hardware method** (if ADB fails): Power + Volume Down (most devices)

## Manufacturer Guides

::: warning ⚠️ Device-Specific Process
Each manufacturer has different requirements. Using the wrong method can brick your device.
:::

### Google Pixel 

#### Steps
1. Complete [Universal Preparation](#universal-preparation)
2. Boot to fastboot mode:
```bash
adb reboot bootloader
```
3. Unlock bootloader:
```bash
fastboot flashing unlock
```
4. Use volume keys to select **"UNLOCK THE BOOTLOADER"**
5. Press power button to confirm
6. Device will factory reset and reboot

#### Verification
```bash
fastboot getvar unlocked
# Should return: unlocked: yes
```

### Xiaomi
**Requirements**: 
- Mi Account logged in device for 7+ days
- Official Mi Unlock Tool
- 7-30 day waiting period

**Steps**:
1. **Apply for Unlock Permission**
   - Settings → Additional Settings → Developer Options
   - Mi Unlock Status → Add account and device
   - Wait for SMS approval (7-30 days)

2. **Download Mi Unlock Tool**
   - Visit [official Xiaomi unlock page](https://en.miui.com/unlock/)
   - Download latest Mi Unlock Tool
   - Install on Windows computer

3. **Unlock Process**
   - Boot device to fastboot mode
   - Connect to computer
   - Launch Mi Unlock Tool
   - Sign in with same Mi Account
   - Click "Unlock" and follow prompts

### OnePlus
**Compatibility**: Most OnePlus models (T-Mobile variants may be restricted)

**Steps**:
1. Complete [Universal Preparation](#universal-preparation)
2. Boot to fastboot mode:
```bash
adb reboot bootloader
```
3. Unlock bootloader:
```bash
fastboot oem unlock
```
4. Use volume keys to navigate menu
5. Select **"UNLOCK THE BOOTLOADER"**
6. Confirm with power button

#### Alternative Method (newer devices)
```bash
fastboot flashing unlock
```

### Samsung
**Critical**: US Snapdragon models generally **CANNOT** be unlocked

**Compatibility Check**:
- Install "Phone INFO ★SAM★" app
- Check "OEM Lock" status
- "ON (U)" = permanently locked ❌
- "OFF" = may be unlockable ✅

**Steps (Exynos only)**:
1. Complete [Universal Preparation](#universal-preparation)
2. Power off → Enter download mode (Volume Down + Power)
3. Long press Volume Up to unlock
4. Follow warnings → Device factory resets
5. Shows "Custom" on boot (Knox permanently triggered)

### Motorola
**Steps**:
1. **Get Unlock Code**
   - Visit [Motorola Bootloader Unlock](https://motorola-global-portal.custhelp.com/app/standalone/bootloader/unlock-your-device-a)
   - Enter device information
   - Receive unlock code via email

2. **Unlock Process**
   - Boot to fastboot mode
   - Get bootloader info:
```bash
fastboot oem get_unlock_data
```
   - Submit this data to Motorola website
   - Receive unique unlock key
   - Apply unlock key:
```bash
fastboot oem unlock [UNIQUE_KEY]
```

### Sony
**Steps**:
1. **Check Device Compatibility**
   - Visit [Sony Developer Portal](https://developer.sony.com/develop/open-devices/get-started/unlock-bootloader/)
   - Enter IMEI to check if unlocking is allowed

2. **Get Unlock Code**
   - Create Sony Developer account
   - Submit device details
   - Receive unlock code

3. **Unlock Process**
   - Boot to fastboot mode
   - Apply unlock code:
```bash
fastboot oem unlock 0x[UNLOCK_CODE]
```

## Post-Unlock Steps

**After successful unlocking:**

### 1. Initial Setup
- Device boots to setup wizard (data was wiped)
- Re-enable Developer Options and USB Debugging
- Set up strong screen lock for security

### 2. Verify Unlock
```bash
adb reboot bootloader
fastboot getvar unlocked
# Should return: unlocked: yes
```

### 3. Next Steps
**Recommended progression:**
1. **[🛠️ Install Custom Recovery](./how-to-install-custom-recovery.md)** - TWRP, OrangeFox, or SKYHAWK
2. **[🔧 Root Your Device](./index.md#root-solutions-comparison)** - Magisk, KernelSU, or APatch  
3. **[🎨 Install Custom ROMs](./custom-rom-installation.md)** - LineageOS, Pixel Experience, etc.

::: tip 📋 Important: Boot to Recovery First
After installing custom recovery, **boot directly to recovery mode** before normal boot to prevent stock recovery restoration.
:::

### 4. Security Considerations
- Test banking apps and have alternatives ready
- Be cautious with app installations from unknown sources
- Only install trusted root solutions and modules

## Troubleshooting

### Common Issues

**"OEM Unlocking" Missing/Grayed Out**
- Connect to WiFi and wait 24-48 hours
- Try different network (mobile vs WiFi)
- Some carriers permanently block this option

**Fastboot Not Recognized**
- Install proper USB drivers (Windows)
- Try different USB ports/cables
- Disable antivirus temporarily
- Use different computer if available

**"Remote: Not Allowed" Error**
- Verify device supports unlocking (check Wall of Shame)
- Ensure OEM Unlocking is enabled
- Some carrier variants block unlocking

**Device Won't Boot After Unlock**
1. Don't panic - often normal after unlock
2. Hold power button 10+ seconds to force restart
3. Try booting to recovery mode
4. Boot to fastboot and re-flash stock firmware if needed

### Emergency Recovery
**Soft Brick Recovery**:
1. Boot to fastboot mode (hardware keys)
2. Flash stock boot: `fastboot flash boot boot.img`
3. Restart: `fastboot reboot`

**Prevention**: Always have stock firmware downloaded and know your device's emergency download mode.

## Bootloader Unlock: Wall of Shame

This community-maintained [repository](https://github.com/melontini/bootloader-unlock-wall-of-shame) tracks companies that make bootloader unlocking difficult or impossible:

### 🚫 Most Restrictive (Avoid for Unlocking)
- **Samsung US (Snapdragon)** - Permanently locked, no official method
- **Huawei/Honor (2018+)** - Discontinued official unlocking  
- **Verizon Devices** - Most models have locked bootloaders
- **AT&T Devices** - Many models restrict unlocking

### ⚠️ Partially Restrictive
- **Xiaomi** - Requires waiting period (7-30 days) and approval
- **Oppo/OnePlus (newer)** - Increasingly restrictive policies
- **Realme** - Limited official support
- **Carrier Variants** - Often more restrictive than unlocked models

### ✅ Developer-Friendly (Recommended)
- **Google Pixel** - Easy official unlocking, excellent custom ROM support
- **Sony** - Official developer support, good documentation
- **Motorola** - Official unlock portal, generally supportive
- **OnePlus (older models)** - Traditionally developer-friendly
- **Essential Phone** - Developer-focused (discontinued)

### 🔄 Policy Changes
Manufacturer policies change frequently. Always check current status before purchasing if bootloader unlocking is important to you.

::: tip 💡 Before Buying
Check the Wall of Shame repository and recent community discussions before purchasing. Newer models may have different restrictions than older ones from the same manufacturer.
:::

---

### Need Help?
- **[❓ FAQ](../faqs.md)** - Common questions and solutions
- **[💬 Community](../about.md#community--resources)** - Connect with other users
- **[📖 Main Guide](./index.md)** - Complete Android rooting guide
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - Next step after unlocking

