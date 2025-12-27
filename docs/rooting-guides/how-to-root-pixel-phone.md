---
layout: doc
title: Google Pixel Root Guide 2026
description: Complete guide to root Google Pixel devices. All models from Pixel 1 to Pixel 10 Pro. Bootloader unlock, Magisk installation, and OTA handling.
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/rooting-guides/how-to-root-pixel-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Google Pixel Root Guide 2026
  - - meta
    - property: og:description
      content: Root any Google Pixel device with comprehensive guide covering bootloader unlock, factory images, and Magisk installation.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/rooting-guides/how-to-root-pixel-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/google-pixel.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: keywords
      content: pixel root 2026, pixel 9 root, pixel 8 root, google pixel magisk, pixel bootloader unlock
  - - meta
    - name: robots
      content: index, follow
---

# Google Pixel Root Guide

Root any Google Pixel device with the easiest rooting process in Android. Clean bootloader unlock, official factory images, and Magisk support.

::: tip QUICK START
**For experienced users:** Jump to [Pixel Flasher (GUI Tool)](#method-0-pixel-flasher-gui-tool-easiest) for the easiest one-click rooting method.
:::

## Quick Navigation

- [Prerequisites](#prerequisites)
- [Supported Devices](#supported-devices)
- [Bootloader Unlock](#unlock-bootloader)
- [Root Methods](#root-installation-methods)
  - [Pixel Flasher (Easiest)](#method-0-pixel-flasher-gui-tool-easiest)
  - [Manual Patching](#method-1-manual-boot-image-patching)
  - [Temporary Root](#method-2-temporary-root-test)
- [Post-Root Setup](#post-root-setup)
- [OTA Updates](#ota-updates-with-root)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Universal rooting concepts
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Detailed unlock guide
- [Magisk Guide](./magisk-guide.md) - Complete Magisk documentation
- [KernelSU Guide](./kernelsu-guide.md) - Alternative root method

---

## Prerequisites

::: danger DATA WIPE WARNING
Unlocking bootloader **erases everything** on your device. Backup all data first!
:::

### Quick Checklist

**Hardware:**
- ✅ Google Pixel device (any model)
- ✅ USB-C cable (quality matters)
- ✅ Computer (Windows/macOS/Linux)
- ✅ 50%+ battery charge

**Software Downloads:**
1. **[Android Platform Tools](https://developer.android.com/studio/releases/platform-tools)** - ADB/Fastboot
2. **[Google USB Drivers](https://developer.android.com/studio/run/win-usb)** - Windows only
3. **[Magisk APK](https://github.com/topjohnwu/Magisk/releases)** - Latest stable
4. **[Pixel Flasher](https://github.com/badabing2005/PixelFlasher)** - GUI tool (optional)

### Enable Developer Options

1. **Settings** → **About phone** → Tap **Build number** 7 times
2. **Settings** → **Developer options** → Enable:
   - ✅ **OEM unlocking** (critical)
   - ✅ **USB debugging**

### Test ADB Connection

```bash
# Connect device via USB, accept debugging prompt
adb devices
# Should show device serial number
```

---

## Supported Devices

<details><summary>📱 All Supported Pixel Models</summary>

### Modern Pixels (Use init_boot.img)
- **Pixel 10 Series** (2026) - Pro XL, Pro, Standard
- **Pixel 9 Series** (2024) - Pro XL, Pro, Standard, Pro Fold
- **Pixel 8 Series** (2023) - Pro, Standard, 8a
- **Pixel 7 Series** (2022) - Pro, Standard, 7a
- **Pixel 6 Series** (2021) - Pro, Standard, 6a (Android 13+)

### Legacy Pixels (Use boot.img)
- **Pixel 6 Series** (Android 12 only)
- **Pixel 5 Series** - 5a 5G, 5
- **Pixel 4 Series** - XL, Standard, 4a 5G, 4a
- **Pixel 3 Series** - XL, Standard, 3a XL, 3a
- **Pixel 2 Series** - XL, Standard
- **Pixel 1 Series** - XL, Standard

::: warning CARRIER LOCKS
Verizon and some carrier models may have OEM unlock disabled. Verify before purchase.
:::

</details>

---

## Unlock Bootloader

### Step 1: Enter Fastboot
```bash
adb reboot bootloader
# OR manually: Power off → Hold Volume Down + Power
```

### Step 2: Unlock
```bash
fastboot flashing unlock
```
- Use Volume keys to select **"UNLOCK THE BOOTLOADER"**
- Press Power to confirm
- Device wipes and reboots automatically

::: tip UNLOCK TIME
Process takes 30-60 seconds. Device will show unlocked bootloader warning on every boot (normal).
:::

### Step 3: Re-enable USB Debugging
After setup, re-enable Developer Options and USB Debugging

---

## Root Installation Methods

### Know Your Image Type

| Device | Android Version | Image to Patch |
|--------|-----------------|----------------|
| Pixel 7/8/9/10 | All versions | **init_boot.img** |
| Pixel 6 | Android 13+ | **init_boot.img** |
| Pixel 6 | Android 12 | **boot.img** |
| Pixel 5 and older | All versions | **boot.img** |

::: tip QUICK CHECK
Open Magisk app → Check "Ramdisk" field:
- **Yes** = Use boot.img
- **No** = Use init_boot.img
:::

---

### Method 0: Pixel Flasher (GUI Tool) - EASIEST

**Perfect for beginners - One-click rooting with GUI interface**

**[Pixel Flasher](https://github.com/badabing2005/PixelFlasher)** automates the entire rooting process:

**Features:**
- ✅ Automatic boot image extraction
- ✅ Automatic Magisk patching
- ✅ OTA installation with root preservation
- ✅ Module management
- ✅ Backup/restore functionality
- ✅ Works on Windows, macOS, Linux

**Quick Steps:**

1. **Download and Install**
   - Get latest release from [GitHub](https://github.com/badabing2005/PixelFlasher/releases)
   - Run installer for your OS

2. **Connect Device**
   - Enable USB debugging
   - Connect via USB
   - Pixel Flasher auto-detects device

3. **Root Device**
   - Click "Process Firmware"
   - Select factory image or let tool download
   - Choose "Patch boot with Magisk"
   - Click "Flash"
   - Tool handles everything automatically

4. **Verify Root**
   - Device reboots rooted
   - Open Magisk to verify

::: tip PIXEL FLASHER ADVANTAGES
- No command line needed
- Automatic version detection
- Built-in safety checks
- OTA update support
- Batch operations support
:::

---

### Method 1: Manual Boot Image Patching

**For users who prefer manual control**

#### Step 1: Get Factory Image
1. Visit [Google Factory Images](https://developers.google.com/android/images)
2. Find your exact device and build number
3. Download matching factory image

#### Step 2: Extract Boot Image
```bash
# Extract factory ZIP
unzip pixel-factory-image.zip
cd extracted-folder/
unzip image-pixel-*.zip

# You now have boot.img or init_boot.img
```

#### Step 3: Patch with Magisk
```bash
# Transfer to device
adb push init_boot.img /sdcard/Download/  # Or boot.img

# Install Magisk APK on device
# Open Magisk → Install → Select and Patch a File
# Select the transferred image
# Result: magisk_patched_*.img
```

#### Step 4: Flash Patched Image
```bash
# Pull patched image
adb pull /sdcard/Download/magisk_patched_*.img

# Flash it
adb reboot bootloader
fastboot flash init_boot magisk_patched_*.img  # Or "boot" for older devices
fastboot reboot
```

---

### Method 2: Temporary Root Test

**Test root without permanent changes**

```bash
adb reboot bootloader
fastboot boot magisk_patched_*.img  # Temporary boot
# Device boots with temporary root
# If satisfied, use Method 1 to flash permanently
```

---

## Post-Root Setup

### Essential Magisk Configuration

**Settings:**
- ✅ **Hide Magisk app** - For banking apps
- ✅ **Zygisk** - Enable for modules
- ✅ **Enforce DenyList** - Root hiding

**DenyList Apps:**
- Google Play Services
- Banking apps
- Payment apps (Google Pay)
- Streaming apps (Netflix)

### Recommended Modules

1. **[Shamiko](https://github.com/LSPosed/LSPosed.github.io)** - Enhanced hiding
2. **[LSPosed](https://github.com/LSPosed/LSPosed)** - Xposed framework
3. **[AdAway](https://adaway.org/)** - System-wide ad blocking

---

## OTA Updates with Root

### Automatic Method (Pixel Flasher)

1. Open Pixel Flasher
2. Select "Process OTA"
3. Tool preserves root automatically

### Manual Method (Magisk)

1. **Download OTA** in Settings (don't reboot)
2. **Open Magisk** → Install → **Install to Inactive Slot**
3. **Reboot** when prompted
4. Root preserved through update

---

## Troubleshooting

<details><summary>🔧 Common Issues & Fixes</summary>

### OEM Unlocking Greyed Out
- Remove all Google accounts
- Wait 7 days after reset
- Check carrier lock status

### Bootloop After Root
```bash
# Flash stock image
fastboot flash boot stock_boot.img  # Or init_boot
fastboot reboot
```

### SafetyNet/Play Integrity Fails
1. Enable Zygisk
2. Configure DenyList
3. Install Universal SafetyNet Fix
4. Hide Magisk app
5. Clear Google Play Services data

### Lost Root After OTA
- Extract new boot image
- Patch with Magisk
- Flash patched image

</details>

---

## Unroot / Factory Reset

### Remove Root Only
```bash
adb reboot bootloader
fastboot flash init_boot stock_init_boot.img  # Or boot.img
fastboot reboot
```

### Complete Stock Restore

**Option 1: Pixel Flash Tool (Web)**
- Visit [flash.android.com](https://flash.android.com/)
- Connect device → Select build → Install

**Option 2: Flash-all Script**
```bash
# Extract factory image
./flash-all.sh  # Linux/Mac
flash-all.bat   # Windows
```

### Relock Bootloader
::: danger
Only relock when COMPLETELY stock!
:::
```bash
fastboot flashing lock
```

---

## Quick Reference

### Essential Links

**Official Google:**
- [Factory Images](https://developers.google.com/android/images)
- [OTA Images](https://developers.google.com/android/ota)
- [Web Flash Tool](https://flash.android.com/)
- [USB Drivers](https://developer.android.com/studio/run/win-usb)

**Tools:**
- [Pixel Flasher](https://github.com/badabing2005/PixelFlasher) - GUI rooting tool
- [Platform Tools](https://developer.android.com/studio/releases/platform-tools) - ADB/Fastboot
- [Magisk](https://github.com/topjohnwu/Magisk/releases) - Root solution

**Community:**
- [XDA Pixel Forums](https://xdaforums.com/c/google.11976/)
- [r/GooglePixel](https://www.reddit.com/r/GooglePixel/)
- [GrapheneOS](https://grapheneos.org/) - Privacy ROM
- [CalyxOS](https://calyxos.org/) - Privacy ROM

### Command Cheat Sheet

```bash
# Bootloader
adb reboot bootloader          # Enter fastboot
fastboot flashing unlock       # Unlock bootloader
fastboot flashing lock         # Lock bootloader

# Flashing
fastboot flash boot image.img       # Flash boot (old Pixels)
fastboot flash init_boot image.img  # Flash init_boot (new Pixels)
fastboot boot image.img             # Temporary boot

# Verification
adb shell su -c id             # Check root access
```

---

## Next Steps

After rooting your Pixel:


1. **Explore Root Apps:**
   - [Root Apps Collection](../apps-and-modules/)
   - [LSPosed Guide](./lsposed-guide.md)

2. **Optimize Performance:**
   - [Debloating Guide](../general-guides/android-apps-debloating.md)
   - [Ad Blocking Guide](../general-guides/android-adblocking.md)

3. **Consider custom ROMs:**
   - [Custom ROM Guide](./custom-rom-installation.md) - Installation steps
   - GrapheneOS for maximum privacy
   - CalyxOS for balanced privacy
   - LineageOS for customization

---

::: tip SUCCESS
Your Pixel is now rooted! Remember to keep Magisk updated and always backup before major changes.
:::