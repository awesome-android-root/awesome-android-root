---
layout: doc
title: Nothing & CMF Phone Rooting Guide
description: "Master guide to root all Nothing & CMF by Nothing Phone models with bootloader unlock and Magisk installation for Nothing OS."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/rooting-guides/how-to-root-nothing-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Nothing & CMF by Nothing Phone Rooting Guide - All Models
  - - meta
    - property: og:description
      content: Root any Nothing Phone with our comprehensive guide covering bootloader unlock, custom recovery, and Magisk installation for Nothing OS.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/rooting-guides/how-to-root-nothing-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/nothing.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Nothing & CMF by Nothing Phone Rooting Guide - All Models
  - - meta
    - name: twitter:description
      content: Root any Nothing & CMF by Nothing Phone with bootloader unlock and Magisk installation guide.
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

# Nothing & CMF Phone Root Guide

Root Nothing Phone devices with straightforward process. 

## Quick Navigation
- [Supported Devices](#supported-devices)
- [Prerequisites](#prerequisites)
- [Bootloader Unlock](#unlock-bootloader)
- [Root Installation](#root-installation)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Universal rooting concepts
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Detailed unlock guide
- [Magisk Guide](./magisk-guide.md) - Complete Magisk documentation

---


## Supported Devices

**All Nothing Phone models supported:**
- **Nothing Phone (1)** - Codename: `Spacewar`
- **Nothing Phone (2)** - Codename: `Pong`
- **Nothing Phone (2a)** - Codename: `Pacman`
- **Nothing Phone (2a) Plus** - Codename: `PacmanPro`
- **Nothing Phone (3a) Series** - Codename: `Asteroids`
- **Nothing Phone (3)** - Codename: `Metroid`

**All CMF by Nothing Phone models supported:**
- **CMF Phone (1)** - Codename: `Tetris`
- **CMF Phone (2) Pro** - Codename: `Galaga`

> [!NOTE]
> **Note:** All Nothing Phones are unlockable globally. No regional restrictions.

---

## Prerequisites

### Critical Requirements

::: danger BEFORE YOU START
**Data Wipe:** Unlocking bootloader erases everything including internal storage.

**Backup Everything:** Photos, contacts, messages, app data, authenticator codes.

**Warranty Void:** Bootloader unlock voids manufacturer warranty permanently.

**Glyph Interface:** May not work on some custom ROMs. Test before full switch.
:::

### Hardware Requirements

- Nothing Phone device (any model)
- Quality USB-C cable
- Computer (Windows, macOS, or Linux)
- 50%+ battery charge

### Software Requirements

**On Computer:**

1. **Platform Tools** (ADB/Fastboot)
   - Download: [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools)

2. **USB Drivers** (Windows)
   - Usually auto-install
   - Or download generic Android drivers

3. **Stock Firmware** (for recovery)
   - Download from [Github](https://github.com/spike0en/nothing_archive)
   - Official updates via OTA

**On Device:**

1. **Magisk APK**
   - Download: [Magisk GitHub](https://github.com/topjohnwu/Magisk/releases)

### Device Preparation

**Step 1: Enable Developer Options**

1. Settings > About phone
2. Tap "Build number" 7 times
3. Enter PIN/password

**Step 2: Enable Required Settings**

Settings > System > Developer options:
- **OEM unlocking**: Enable
- **USB debugging**: Enable

**Step 3: Verify ADB**

```bash
adb devices
# Accept debugging prompt
# Should show "device" status
```

---

## Unlock Bootloader

### Step 1: Enter Fastboot Mode

**Method 1: ADB**
```bash
adb reboot bootloader
```

**Method 2: Hardware Keys**
1. Power off
2. Hold Volume Down + Power
3. Release at fastboot screen

### Step 2: Unlock Bootloader

```bash
# Verify connection
fastboot devices

# Unlock bootloader
fastboot flashing unlock

# Alternatively (if first doesn't work)
fastboot oem unlock
```

**On Device:**
1. Warning screen appears
2. Use Volume keys to navigate
3. Select "UNLOCK THE BOOTLOADER"
4. Press Power to confirm
5. Device wipes and reboots

### Step 3: Complete Setup

After automatic factory reset:
1. Complete Android setup
2. Re-enable Developer options
3. Re-enable USB debugging

---

## Root Installation

### Determine Correct Image

| Device | Android Version | Image to Patch |
|--------|-----------------|----------------|
| Nothing Phone (2a) | Android 14 | init_boot.img |
| Nothing Phone (2) | Android 13/14 | init_boot.img |
| Nothing Phone (1) | Android 13/14 | init_boot.img |
| Nothing Phone (1) | Android 12 | boot.img |

**Check in Magisk app "Ramdisk" field if unsure.**

### Method 1: Boot Image Patching

**Step 1: Extract Boot Image**

For Nothing Phone (2) and (2a):
1. Download OTA update or firmware
2. Extract payload.bin
3. Use payload-dumper-go:
```bash
./payload-dumper-go -o extracted payload.bin
```
4. Find init_boot.img in extracted/

For Nothing Phone (1):
- Check current Android version
- Android 13+ uses init_boot.img
- Android 12 uses boot.img

**Step 2: Transfer to Device**

```bash
adb push init_boot.img /sdcard/Download/
# Or
adb push boot.img /sdcard/Download/
```

**Step 3: Install Magisk and Patch**

```bash
adb install Magisk-v27.0.apk
```

On device:
1. Open Magisk
2. Install > Select and Patch a File
3. Choose boot/init_boot image
4. Wait for patching

**Step 4: Transfer Patched Image**

```bash
adb pull /sdcard/Download/magisk_patched_xxxxx.img ./
```

**Step 5: Flash Patched Image**

```bash
adb reboot bootloader

# For Android 13/14
fastboot flash init_boot magisk_patched_xxxxx.img

# For Android 12
fastboot flash boot magisk_patched_xxxxx.img

fastboot reboot
```

**Step 6: Verify Root**

1. Open Magisk app
2. Should show:
   - Magisk: Installed
   - App: Latest

Test:
```bash
adb shell
su
id
# Returns: uid=0(root)
```

---

## Post-Root Setup

### Configure Magisk

**Settings:**
- **Zygisk**: Enable
- **Enforce DenyList**: Enable
- **Hide Magisk app**: For banking apps

**DenyList Configuration:**
- Google Play Services
- Google Play Store
- Banking apps
- Payment apps

### Nothing OS Optimization

**Battery Optimization:**
1. Settings > Battery
2. Find Magisk and root apps
3. Set to "Unrestricted"

**Background Activity:**
1. Settings > Apps
2. Magisk and root apps
3. Allow background activity

### Recommended Modules

- **Universal SafetyNet Fix**
- **Shamiko** - Root hiding
- **LSPosed** - Framework
- **Systemless Hosts** - Ad blocking

---

## OTA Handling

### For A/B Devices (All Nothing Phones)

**Step 1: Download OTA**

Settings > System > System update

Download but don't reboot yet

**Step 2: Magisk Installation**

1. Magisk > Install
2. "Install to Inactive Slot (After OTA)"
3. Wait for completion
4. Reboot when prompted

Root preserved after update!

---

## Troubleshooting

<details><summary> Tap to expand common issues and fixes</summary>

### Bootloader Issues

**OEM Unlocking Greyed Out**

Solutions:
1. Remove all accounts
2. Factory reset
3. Wait 24 hours
4. Try again

**Fastboot Not Detecting**

Solutions:
- Update Platform Tools
- Try USB 2.0 port
- Different cable
- Reinstall drivers

### Installation Issues

**Magisk Shows N/A**

Solutions:
1. Verify correct image
2. Check Android version
3. Re-patch correct image
4. Flash to correct partition

**Bootloop After Root**

```bash
fastboot flash init_boot stock_init_boot.img
# Or
fastboot flash boot stock_boot.img
fastboot reboot
```

### Glyph Interface Issues

**Glyph Not Working After Root**

Usually continues working with Magisk. If issues:
1. Check for Glyph-related modules
2. Reinstall Nothing OS stock
3. Some custom ROMs may not support Glyph

</details>

---

## Unroot and Restore

### Remove Root

```bash
# Magisk > Uninstall > Restore Images
```

### Flash Stock Firmware

Via fastboot:
```bash
# Flash stock images
fastboot flash boot stock_boot.img
fastboot flash init_boot stock_init_boot.img
fastboot reboot
```

### Relock Bootloader

::: danger RELOCK WARNING
Only when completely stock!
:::

```bash
fastboot flashing lock
```

---

## Custom ROMs

### Available ROMs

**LineageOS:**
- Official builds for Nothing Phone (1)
- Community builds for Phone (2)

**Pixel Experience:**
- Growing support
- Pixel-like interface

**Evolution X:**
- Feature-rich
- Good performance

**Note:** Glyph Interface support varies by ROM!

---

## Best Practices

### Security

1. **Hide Magisk** for sensitive apps
2. **Configure DenyList** properly
3. **Only trusted modules**
4. **Keep Magisk updated**

---

## Community Resources

**Official Nothing:**
- [Nothing Support](https://nothing.tech/support) - Official site
- [Nothing Community](https://nothing.community/) - Forums

**Developer Community:**
- [XDA Nothing Forums](https://xdaforums.com/c/nothing.12583/) - Development
- [Reddit r/NothingTech](https://www.reddit.com/r/NothingTech/) - Community

**Awesome Android Root Resources:**
- [FAQs](../faqs)
- [Troubleshooting Guide](../troubleshooting) 

### Getting Help

**Provide:**
- Exact Nothing Phone model
- Nothing OS version
- Android version
- Error messages
- Steps attempted

---

## Next Steps

**After Rooting:**

1. **Essential apps:**
   - [Root Apps Collection](../apps-and-modules/)

2. **Enhance experience:**
   - [Ad Blocking Guide](../general-guides/android-adblocking.md)
   - [Debloating Guide](../general-guides/android-apps-debloating.md)
   - [LSPosed Guide](./lsposed-guide.md)

3. **Explore ROMs:**
   - [Custom ROM Guide](./custom-rom-installation.md)
   - Test Glyph support before switching

