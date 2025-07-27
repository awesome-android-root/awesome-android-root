---
layout: doc
title: Complete Nothing Phone Rooting Guide
description: "Master guide to root all Nothing Phone models - Phone 1, 2, 2a, 3 series with bootloader unlock and Magisk installation for Nothing OS."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-root-nothing-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Nothing Phone Rooting Guide - All Models
  - - meta
    - property: og:description
      content: Root any Nothing Phone with our comprehensive guide covering bootloader unlock, custom recovery, and Magisk installation for Nothing OS.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/how-to-root-nothing-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/nothing.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Nothing Phone Rooting Guide - All Models
  - - meta
    - name: twitter:description
      content: Root any Nothing Phone with bootloader unlock and Magisk installation guide.
  - - meta
    - name: keywords
      content: nothing phone root, nothing os root, nothing phone bootloader unlock, nothing phone magisk, twrp nothing phone, nothing phone 1 root, nothing phone 2 root, nothing phone 2a root, nothing phone 3 root
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Device Rooting
  - - meta
    - property: article:tag
      content: Nothing Phone
  - - meta
    - property: article:tag
      content: Nothing OS
  - - meta
    - property: article:tag
      content: Bootloader Unlock
  - - meta
    - property: article:tag
      content: Magisk Installation
  - - meta
    - name: robots
      content: index, follow
---

# Complete Nothing Phone Rooting Guide

**Root any Nothing Phone model** - Phone 1, 2, 2a, 3 series with bootloader unlock and Magisk installation.

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md)** - Universal rooting principles and safety
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - General bootloader concepts
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - TWRP installation guide
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions for common issues

## Critical Warnings

::: danger ⚠️ Nothing-Specific Considerations
- **Warranty void** - Unlocking bootloader voids Nothing warranty
- **Complete data erasure** - All personal data will be wiped
- **Banking app issues** - Some financial apps may detect root
- **Nothing OS integrity** - Modifications may affect unique Nothing features
:::

## Supported Devices

**All Nothing Phone models supported:**
- **Nothing Phone (1)** - Codename: `Spacewar`
- **Nothing Phone (2)** - Codename: `Pong`
- **Nothing Phone (2a)** - Codename: `Pacman`
- **Nothing Phone (2a) Plus** - Codename: `PacmanPlus`
- **Nothing Phone (3)** - Codename: `Asteroids`
- **Nothing Phone (3a)** - Codename: `AsteroidsPlus`

## Prerequisites & Setup

### Required Tools
1. **[Platform Tools](https://developer.android.com/studio/releases/platform-tools)** - ADB/Fastboot
2. **[Magisk APK](https://github.com/topjohnwu/Magisk/releases)** - Latest release
3. **Stock firmware** for your device model (for boot.img extraction)
4. **Custom recovery** (optional) - TWRP or OrangeFox

### Device Preparation
1. **Enable Developer Options** - Settings → About Phone → Tap Build Number 7 times
2. **Configure Developer Settings:**
   - Enable **USB Debugging**
   - Enable **OEM Unlocking**
3. **Backup all data** - Photos, contacts, apps, settings
4. **Charge to 50%+** - Ensure sufficient battery

### Connection Verification
```bash
# Test ADB connection
adb devices

# Should show your device with "device" status
# If "unauthorized", accept USB debugging prompt on phone
```

## Bootloader Unlocking

::: warning ⚠️ Data Erasure Warning
Unlocking bootloader **COMPLETELY WIPES** your device. Ensure all important data is backed up.
:::

### Enter Fastboot Mode
```bash
# Method 1: ADB command
adb reboot bootloader

# Method 2: Hardware keys
# Power off device → Hold Volume Down + Power buttons
```

### Verify Connection
```bash
fastboot devices
# Should show your device listed
```

### Unlock Bootloader
```bash
fastboot flashing unlock
```

**On your device:**
- Use Volume keys to navigate to **"Unlock the bootloader"**
- Press Power button to confirm
- Device will erase and reboot automatically

### Complete Initial Setup
After automatic factory reset:
1. Complete initial device setup
2. Re-enable Developer Options (Build Number × 7)
3. Re-enable USB Debugging

## Root Installation Methods

### Method A: Boot Image Patching (Recommended)

#### Step 1: Extract Boot Image
1. **Download stock firmware** for your exact device model and version
2. **Extract firmware package** using 7-Zip or similar tool
3. **Locate boot.img** file within extracted files
4. **Copy boot.img** to easily accessible location

#### Step 2: Patch Boot Image
1. **Transfer boot.img to device:**
   ```bash
   adb push boot.img /sdcard/Download/
   ```

2. **Install Magisk APK** on device:
   ```bash
   adb install Magisk-v[version].apk
   ```

3. **Patch boot image:**
   - Open Magisk app on device
   - Tap **Install** → **Select and patch a file**
   - Navigate to Downloads and select boot.img
   - Wait for patching to complete

4. **Retrieve patched image:**
   ```bash
   adb pull /sdcard/Download/magisk_patched_[hash].img ./
   ```

#### Step 3: Flash Patched Boot
1. **Boot to fastboot mode:**
   ```bash
   adb reboot bootloader
   ```

2. **Flash patched boot:**
   ```bash
   fastboot flash boot magisk_patched_[hash].img
   ```

3. **Reboot system:**
   ```bash
   fastboot reboot
   ```

### Method B: Custom Recovery Installation

#### Step 1: Install Custom Recovery
1. **Download recovery image** for your specific Nothing Phone model
2. **Flash recovery:**
   ```bash
   fastboot flash recovery recovery.img
   ```

3. **Boot to recovery:**
   ```bash
   fastboot reboot recovery
   # Or: Volume Up + Power after powering off
   ```

#### Step 2: Install Magisk via Recovery
1. **Transfer Magisk ZIP** to device storage
2. **In recovery interface:**
   - **TWRP:** Install → Select Magisk ZIP → Swipe to confirm
   - **OrangeFox:** Files → Select Magisk ZIP → Install
3. **Reboot system**

## Verification & Setup

### Confirm Root Access
1. **Open Magisk app** - Should show "Magisk" and "Zygisk" as installed
2. **Test root access** - Use Root Checker app or terminal `su` command
3. **Grant permissions** - Approve root requests from apps as needed

### Configure Security Settings
1. **Enable Zygisk** - Magisk → Settings → Enable Zygisk
2. **Configure DenyList** - Add banking apps, Netflix, etc.
3. **Install bypass modules** - For Play Integrity if needed
4. **Create backup** - TWRP NANDroid or Magisk backup

## Alternative Root Solutions

### KernelSU (Enhanced Security)
**Ideal for advanced users seeking better banking app compatibility**

1. **Check kernel compatibility** at [KernelSU.org](https://kernelsu.org/)
2. **Flash KernelSU-supported kernel** for your device
3. **Install KernelSU Manager** app
4. **Configure App Profiles** for granular control

### APatch (Experimental)
**For developers and testing purposes**

1. **Check device compatibility** at [APatch GitHub](https://github.com/bmax121/APatch)
2. **Follow installation documentation** carefully
3. **Requires advanced knowledge** for troubleshooting

## Troubleshooting

### Common Issues

#### Fastboot Not Recognized
- **Install proper USB drivers** (Windows)
- **Try different USB ports/cables** (preferably original Nothing cable)
- **Use USB 2.0 ports** if USB 3.0 causes issues

#### Bootloop After Root
```bash
# Flash stock boot image to recover
fastboot flash boot stock_boot.img
```

#### Banking Apps Not Working
1. **Enable Zygisk** in Magisk settings
2. **Configure DenyList** properly
3. **Install bypass modules:** Universal SafetyNet Fix, Shamiko
4. **Clear banking app data** and re-setup

#### Recovery Not Booting
- **Ensure correct recovery** for your exact model
- **Try temporary boot first:**
  ```bash
  fastboot boot recovery.img
  ```

### Emergency Recovery Commands
```bash
# Flash complete stock firmware
fastboot update firmware.zip

# Factory reset via fastboot
fastboot -w

# Flash individual partitions
fastboot flash boot boot.img
fastboot flash recovery recovery.img
```

## Restore to Stock

### Unroot Process
1. **Uninstall Magisk** - Magisk → Settings → Complete Uninstall
2. **Flash stock firmware** - Use official Nothing firmware
3. **Factory reset** - Ensure clean restoration

### Lock Bootloader (Optional)
```bash
fastboot flashing lock
```
::: danger ⚠️ Critical Warning
Only lock bootloader with completely stock firmware. Locking with custom firmware can permanently brick your device.
:::

## Banking App Compatibility

### Modern Play Integrity Solutions
1. **Tricky Store Module** - Latest bypass method
2. **Enable Zygisk** - Required for modern bypasses
3. **Configure DenyList** - Hide root from specific apps
4. **Test with Play Integrity Checker** - Verify bypass success

### Configuration Steps
1. Install bypass modules through Magisk
2. Enable Zygisk in Magisk settings
3. Add problematic apps to DenyList
4. Clear app data for banking/payment apps
5. Re-login and test functionality

---

## Success! Your Nothing Phone is Rooted

**Congratulations!** Your Nothing Phone now has root access. Here's what to do next:

### Immediate Next Steps
1. **[Browse Root Apps](../android-root-apps/#root-apps)** - Discover 300+ curated applications
2. **[Setup Banking App Bypass](../faqs.md#play-integrity-and-banking-apps)** - Configure root hiding
3. **[Install Essential Apps](../android-root-apps/#featured-apps-the-essentials)** - Start with recommended apps

### Advanced Customization
- **[Custom Recovery](./how-to-install-custom-recovery.md)** - Install TWRP for advanced features
- **[Custom ROM](./custom-rom-installation.md)** - Explore LineageOS and other ROMs
- **[LSPosed Framework](./lsposed-guide.md)** - Enable Xposed modules

**Welcome to unlimited Nothing Phone customization!** 🚀
