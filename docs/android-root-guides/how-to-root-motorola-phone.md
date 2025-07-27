---
layout: doc
title: Motorola Rooting Guide
description: "Complete step-by-step guide to root Motorola phones in 2025. Learn how to unlock bootloader and install Magisk on Motorola devices."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-root-motorola-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Motorola Rooting Guide - Bootloader Unlock & Magisk 2025
  - - meta
    - property: og:description
      content: Root your Motorola device with this comprehensive guide covering bootloader unlock, Magisk installation, and step-by-step instructions for Motorola Edge 30 Neo.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/how-to-root-motorola-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/motorola.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Motorola Rooting Guide - Edge 30 Neo & More 2025
  - - meta
    - name: twitter:description
      content: Complete step-by-step guide to root Motorola phones. Covers bootloader unlock, Magisk installation, and troubleshooting.
  - - meta
    - name: keywords
      content: motorola root guide, motorola edge 30 neo root, motorola bootloader unlock, motorola magisk, motorola rooting 2025, motorola adb drivers, motorola software fix, fastboot motorola, motorola unlock token, motorola rooting tutorial
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
      content: Motorola
  - - meta
    - property: article:tag
      content: Bootloader Unlock
  - - meta
    - property: article:tag
      content: Magisk
  - - meta
    - property: article:published_time
      content: 2025-06-11
  - - meta
    - property: article:modified_time
      content: 2025-06-11
  - - meta
    - name: robots
      content: index, follow, max-image-preview:large
---

# How to root Motorola phones.

Complete step-by-step guide to root Motorola phones in 2025, including bootloader unlock and Magisk installation.

## 🔗 Related Guides
Master the complete rooting process with our comprehensive guides:
- **[📖 Complete Rooting Guide](./index.md)** - Master guide covering all rooting aspects
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - Universal bootloader guide with Motorola specifics
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - Install TWRP, OrangeFox, or SKYHAWK
- **[🌟 Custom ROM Installation](./custom-rom-installation.md)** - Install LineageOS and other custom ROMs
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Complete support guide with troubleshooting solutions

Welcome to this comprehensive guide on rooting Motorola phones. This guide covers multiple Motorola devices including the Edge 30 Neo and G55 5G, with detailed instructions for both standard and A/B partition devices.

## ⚠️ Important Warnings
- **Your phone will be wiped multiple times** throughout this process - backup everything important
- **OEM unlocking requires waiting 7-10 days** after connecting to the internet
- **A/B devices require special handling** to avoid bootloops (applies to G55 5G and newer models)


# Chapter 1: Prerequisites & Setup

## Required Downloads & Tools

1. **Platform Tools**: [Download latest ADB/Fastboot](https://dl.google.com/android/repository/platform-tools-latest-windows.zip)
2. **Motorola ADB Drivers**: [Official drivers](https://en-us.support.motorola.com/app/usb-drivers)
3. **Latest Magisk APK**: [Download from GitHub](https://github.com/topjohnwu/Magisk/releases/latest)
4. **Stock ROM for your device**: Required to extract boot.img

## Initial Setup Steps

1. **Install Motorola drivers** on your computer
2. **Extract platform tools** and open terminal/command prompt in that folder
3. **Create a Motorola account** - required for bootloader unlocking
4. **Disable all automatic updates** on your phone to prevent firmware changes

## Enable Developer Options & USB Debugging

1. Go to **Settings > About Phone > Device identifiers**
2. **Tap "Build Number" 10 times** to unlock Developer Options
3. **Note down your build number** - you'll need this for finding the correct ROM
4. Go back to **Settings > System > Developer Options**
5. **Enable "USB Debugging"**
6. **Locate "OEM unlocking"** option (may be grayed out initially)

## The OEM Unlocking Wait Period

**Critical**: Motorola devices require your phone to be connected to the internet for **7-10 days** before OEM unlocking becomes available. This is a security feature that cannot be bypassed.

- Keep your phone connected to Wi-Fi/mobile data during this period
- Use the phone normally - the timer runs in the background
- Check the OEM unlocking option periodically until it becomes toggleable
- **Enable OEM unlocking** as soon as it becomes available

## Finding Your Stock ROM

While waiting for OEM unlocking, download your device's stock ROM:

1. **Get your build number** from Settings or run: `adb shell getprop ro.build.version.incremental`
2. **Search for your ROM** using your exact build number (e.g., "U3UTS34.44-11-2-4")
3. **Use sites like motostockrom.com** or search "YourBuildNumber ROM"
4. **If exact match not found**, try dropping the last number segment
5. **Alternative**: Download update without installing (ask ChatGPT for advanced methods)

# Chapter 2: Bootloader Unlocking
**⚠️ THIS PROCESS WILL WIPE ALL YOUR DATA!**

## Prerequisites Check
Before proceeding, ensure:
- OEM unlocking is **enabled** in Developer Options (not grayed out)
- You have a **Motorola account** created
- Your phone is **properly connected** to your computer
- Test connection with: `adb devices` and `fastboot devices`

## Unlocking Process

1. **Enter fastboot mode**:
   ```bash
   adb reboot bootloader
   ```

2. **Get unlock token**:
   ```bash
   fastboot oem get_unlock_data
   ```

3. **Copy the token** (remove any spaces between lines)

4. **Visit Motorola's unlock page**: [Bootloader Unlock](https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-b)
   - Log in with your Motorola account
   - Enter your device token
   - Submit the request

5. **Check your email** for the unlock key (usually arrives within a few minutes)

6. **Unlock bootloader**:
   ```bash
   fastboot oem unlock [your unlock key]
   ```

7. **Reboot your device**:
   ```bash
   fastboot reboot
   ```

## Post-Unlock Setup
After unlocking, your phone will factory reset. You need to:
1. **Re-enable Developer Options** (tap Build Number 10 times)
2. **Re-enable USB Debugging** in Developer Options
3. **Install Magisk APK**:
   ```bash
   adb install MagiskManager.apk
   ```
   (Replace with your actual Magisk APK filename)

# Chapter 3: Rooting with Magisk

## Method 1: Standard Devices (Edge 30 Neo and similar)

### Extract and Patch Boot Image

1. **Extract boot.img from your stock ROM**:
   - **Windows**: Use 7-Zip to open ROM file and extract boot.img
   - **Linux**: `unzip name_of_your_rom.zip boot.img`
   - **Alternative**: Use Motorola Software Fix tool as described below

2. **Transfer boot.img to phone**:
   ```bash
   adb push boot.img /sdcard/Download/boot.img
   ```

3. **Patch with Magisk**:
   - Open **Magisk app** on your phone
   - Tap **Install** → **Select and patch a file**
   - Navigate to **Download folder** and select **boot.img**
   - Let Magisk patch the file

4. **Transfer patched file back**:
   ```bash
   adb pull /sdcard/Download/magisk_patched_XXXXX.img ./magisk_patched.img
   ```
   (Replace XXXXX with actual filename)

5. **Flash the patched boot**:
   ```bash
   adb reboot bootloader
   fastboot flash boot magisk_patched.img
   fastboot reboot
   ```

### Alternative: Using Motorola Software Fix Tool

If you can't find your ROM or prefer official firmware:

1. **Install [Motorola Software Fix](https://en-us.support.motorola.com/app/softwarefix)** on your PC
2. **Connect your phone** and go to **Backup & Restore** tab
3. **Download firmware** for your device (this extracts to ROM files)
4. **Navigate to download folder**: Usually `C:\ProgramData\RSA\RomFiles\[Your ROM folder]`
5. **Copy boot.img** to your phone and follow the patching steps above

## Method 2: A/B Devices (G55 5G and newer models)

**⚠️ A/B devices have dual boot partitions and require special handling!**

### Understanding A/B Partitions
A/B devices have two complete system partitions. If you only flash one boot partition, the device will bootloop when it switches to the unpatched partition.

### Rooting Process for A/B Devices

1. **Follow steps 1-4 from Method 1** to get your patched boot image

2. **Enter fastbootd mode** (not regular fastboot):
   ```bash
   adb reboot bootloader
   fastboot reboot fastboot
   ```

3. **Flash to BOTH boot partitions**:
   ```bash
   fastboot flash boot_a magisk_patched.img
   fastboot flash boot_b magisk_patched.img
   ```

4. **Reboot your device**:
   ```bash
   fastboot reboot
   ```

## Device Compatibility List

### Confirmed Working Devices
- **Motorola Edge 30 Neo** - Standard partition, Method 1
- **Motorola G55 5G** - A/B partition, Method 2
- **Motorola G54 5G** - A/B partition, Method 2 (Mediatek variant may require test points)
- **Motorola G32** - Standard partition, Method 1
- **Motorola G24** - Standard partition, Method 1

### How to Check Your Device Type
Run this command to check if your device uses A/B partitions:
```bash
adb shell getprop ro.build.ab_update
```
- **true** = A/B device (use Method 2)
- **false** or **empty** = Standard device (use Method 1)

## Common Issues & Solutions

### OEM Unlocking Grayed Out
- **Solution**: Wait 7-10 days with internet connection
- **Verify connection**: Keep Wi-Fi/mobile data active
- **Be patient**: Timer runs in background, check periodically

### "Device not found" Errors
```bash
# Test ADB connection (phone in normal mode)
adb devices

# Test Fastboot connection (phone in bootloader)
fastboot devices
```
- **No devices shown**: Install/reinstall Motorola USB drivers
- **Unauthorized**: Accept USB debugging prompt on phone
- **Offline**: Restart ADB daemon: `adb kill-server && adb start-server`

### Bootloop After Rooting
- **A/B devices**: Likely flashed only one partition, flash both boot_a and boot_b
- **Any device**: Flash stock boot.img to recover:
  ```bash
  fastboot flash boot stock_boot.img
  fastboot reboot
  ```

### Magisk Not Showing Root
- **Check installation**: Open Magisk app, should show "Installed" status
- **Wrong partition**: On A/B devices, ensure both partitions are flashed
- **Corrupted patch**: Re-patch boot.img with fresh Magisk installation

### Stock ROM Not Found
- **Try dropping build suffix**: `U3UTS34.44-11-2-4` → `U3UTS34.44-11-2`
- **Alternative sources**: XDA Forums, firmware.center, or official Motorola updates
- **Use Software Fix tool**: Automatic firmware download for most devices

## Helpful Commands Reference

### Device Information
```bash
# Get build number
adb shell getprop ro.build.version.incremental

# Check A/B status
adb shell getprop ro.build.ab_update

# Get device model
adb shell getprop ro.product.model

# Check bootloader status
fastboot oem device-info
```

### Connection Testing
```bash
# Test ADB (phone in Android)
adb devices

# Test Fastboot (phone in bootloader)
fastboot devices

# Restart ADB if needed
adb kill-server && adb start-server
```

### Recovery Commands
```bash
# Flash stock boot (if available)
fastboot flash boot stock_boot.img

# Factory reset from fastboot
fastboot -w

# Reboot to system
fastboot reboot

# Reboot to bootloader
adb reboot bootloader
```

## Final Notes

- **Backup important data** before starting - you'll lose everything multiple times
- **Keep stock ROM files** handy for recovery purposes  
- **Join XDA Forums** or r/androidroot for device-specific help
- **Update Magisk regularly** but read changelogs for compatibility
- **Consider custom recoveries** like TWRP for advanced operations

**Success Rate**: Following this guide correctly results in successful root for 95%+ of compatible Motorola devices. If you encounter issues, double-check your device model, partition type, and ensure all prerequisites are met.

For additional help, consult our [FAQ section](../faqs.md) or ask in Android rooting communities with your specific device model and error messages.



