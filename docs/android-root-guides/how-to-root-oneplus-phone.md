---
layout: doc
title: Complete OnePlus Rooting Guide
description: "Master guide to root all OnePlus devices - OnePlus 12, 11, 10, Nord series with bootloader unlock and Magisk installation for OxygenOS."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-root-oneplus-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete OnePlus Rooting Guide - All Models Supported
  - - meta
    - property: og:description
      content: Root any OnePlus device with our comprehensive guide covering bootloader unlock, MSM tool, custom recovery and Magisk installation for OxygenOS.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/how-to-root-oneplus-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/oneplus.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete OnePlus Rooting Guide - All Models
  - - meta
    - name: twitter:description
      content: Root any OnePlus phone with bootloader unlock and Magisk installation guide.
  - - meta
    - name: keywords
      content: oneplus root guide, oneplus rooting, oneplus bootloader unlock, oneplus magisk guide, oneplus custom recovery, oneplus 12 root, oneplus 11 root, oneplus 10 root, oxygenos root, oneplus msm tool, oneplus nord root
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
      content: OnePlus Root
  - - meta
    - property: article:tag
      content: OxygenOS
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

# OnePlus Root Guide

Root OnePlus devices with straightforward bootloader unlock. Covers OxygenOS and ColorOS, OnePlus 12, 11, 10, 9, Nord series, and legacy devices.

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

<details><summary>Click to expand device list</summary>

### OnePlus Flagship Series

**OnePlus 12 (2024):**
- ColorOS/OxygenOS 14
- Snapdragon 8 Gen 3
- Uses init_boot.img
- Active development

**OnePlus 11 (2023):**
- OxygenOS 13
- Snapdragon 8 Gen 2
- Uses init_boot.img
- Excellent support

**OnePlus 10 Pro/10T (2022):**
- ColorOS-based OxygenOS
- Snapdragon 8 Gen 1/+
- Transition to OPPO codebase
- Good community support

**OnePlus 9 Series (2021):**
- OnePlus 9 Pro / 9 / 9R
- OxygenOS 11/12
- Excellent custom ROM options
- Strong TWRP support

**OnePlus 8 Series (2020):**
- OnePlus 8 Pro / 8 / 8T
- Mature rooting support
- Many ROMs available
- Stable TWRP

**Older Flagships:**
- OnePlus 7/7 Pro/7T
- OnePlus 6/6T
- OnePlus 5/5T
- OnePlus 3/3T
- Full custom ROM support

### OnePlus Nord Series

**Nord 3/2T/2 (2023-2022):**
- Mid-range with good support
- ColorOS-based
- Growing development

**Nord CE 3/2/1 (Various):**
- Budget-friendly
- Basic root support
- Limited ROMs

**Nord N Series:**
- Entry-level OnePlus
- Varies by region
- Check XDA for support

### Regional Variants

**Global/International:**
- Best developer support
- Easiest to root
- Most ROMs available

**T-Mobile (US):**
- Some models locked
- Verify unlock capability
- May require SIM unlock

**China/India:**
- Different firmware
- May need conversion
- Check compatibility

</details>

## Prerequisites

### Critical Requirements

::: danger BEFORE YOU START
**Data Wipe:** Unlocking bootloader erases everything including internal storage.

**Backup Everything:** Photos, contacts, messages, app data, authenticator codes.

**No Waiting Period:** Unlike Xiaomi, OnePlus unlock is immediate once enabled.

**OEM Unlocking:** Must be available in Developer Options. Some T-Mobile models cannot unlock.
:::

### Hardware Requirements

- OnePlus device (any supported model)
- Quality USB-C cable
- Computer (Windows, macOS, or Linux)
- 50%+ battery charge

### Software Requirements

**On Computer:**

1. **Platform Tools** (ADB/Fastboot)
   - Download: [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools)
   - Extract to easy location

2. **OnePlus USB Drivers** (Windows)
   - Usually auto-install with ADB
   - Or download from OnePlus site

3. **Stock Firmware** (for recovery)
   - Download from [OnePlus Downloads](https://www.oneplus.com/support)
   - Or [XDA Forums](https://xdaforums.com/)

**On Device:**

1. **Magisk APK**
   - Download: [Magisk GitHub](https://github.com/topjohnwu/Magisk/releases)
   - Latest stable version

2. **File Manager**
   - OxygenOS Files app
   - Or any from Play Store

### Device Preparation

**Step 1: Enable Developer Options**

1. Settings > About device
2. Tap "Build number" 7 times
3. Enter PIN/password
4. "Developer options unlocked" appears

**Step 2: Enable Required Settings**

Settings > System > Developer options:
- **OEM unlocking**: Enable (critical)
- **USB debugging**: Enable
- **Advanced reboot**: Enable (optional)

**Step 3: Verify ADB Connection**

```bash
adb devices
# Accept USB debugging prompt on device
# Should show device with "device" status
```

---

## Unlock Bootloader

OnePlus has one of simplest unlock processes.

### Step 1: Enter Fastboot Mode

**Method 1: ADB Command**
```bash
adb reboot bootloader
```

**Method 2: Hardware Keys**
1. Power off device
2. Hold Volume Up + Volume Down + Power
3. Release when fastboot screen appears

### Step 2: Verify Fastboot Connection

```bash
fastboot devices
# Should show device serial number
```

### Step 3: Unlock Bootloader

```bash
fastboot oem unlock
```

**On Device:**
1. Warning screen appears
2. Use Volume keys to navigate
3. Select "UNLOCK THE BOOTLOADER"
4. Press Power to confirm
5. Device automatically wipes and reboots

::: tip INSTANT UNLOCK
Unlike Xiaomi, OnePlus unlock is immediate. No waiting period!
:::

### Step 4: Verify Unlock Status

After automatic factory reset:

```bash
adb reboot bootloader
fastboot getvar unlocked
# Should return: yes
```

Or check on device boot:
- "The bootloader is unlocked" warning (normal)

---

## Root Installation

### Determine Correct Image

| Device | Android Version | Image to Patch | Notes |
|--------|-----------------|----------------|-------|
| OnePlus 12 | Android 14 | init_boot.img | ColorOS base |
| OnePlus 11 | Android 13 | init_boot.img | OxygenOS 13 |
| OnePlus 10 series | Android 12/13 | init_boot.img | ColorOS transition |
| OnePlus 9 series | Android 11+ | boot.img or init_boot.img | Check Magisk app |
| OnePlus 8 series | Android 10/11 | boot.img | OxygenOS 11 |
| Older OnePlus | Android 10 and below | boot.img | Legacy OxygenOS |

**Quick Check in Magisk:**
- Install Magisk app first
- Check "Ramdisk" field
- "Yes" = boot.img, "No" = init_boot.img

### Method 1: Boot Image Patching (Recommended)

**Step 1: Download Stock Firmware**

For OxygenOS:
1. Visit [OnePlus Downloads](https://www.oneplus.com/support)
2. Find your model
3. Download OxygenOS ROM (Full Package)
4. Extract payload.bin

For ColorOS:
1. Visit OnePlus Downloads or XDA
2. Download matching firmware
3. Extract payload.bin

**Step 2: Extract Boot Image**

Use payload-dumper-go:
```bash
# Download payload-dumper-go
# Extract images
./payload-dumper-go -o extracted payload.bin

# Find boot.img or init_boot.img in extracted/
```

**Step 3: Transfer to Device**

```bash
# For newer devices (OnePlus 10+)
adb push init_boot.img /sdcard/Download/

# For older devices
adb push boot.img /sdcard/Download/
```

**Step 4: Install Magisk and Patch**

```bash
# Install Magisk APK
adb install Magisk-v27.0.apk
```

On device:
1. Open Magisk app
2. Tap "Install" next to Magisk
3. Select "Select and Patch a File"
4. Choose boot.img or init_boot.img
5. Wait for patching

**Output:** `magisk_patched_[random].img`

**Step 5: Transfer Patched Image**

```bash
adb pull /sdcard/Download/magisk_patched_xxxxx.img ./
```

**Step 6: Flash Patched Image**

```bash
# Boot to fastboot
adb reboot bootloader

# Verify connection
fastboot devices

# For newer devices (init_boot)
fastboot flash init_boot magisk_patched_xxxxx.img

# For older devices (boot)
fastboot flash boot magisk_patched_xxxxx.img

# Reboot
fastboot reboot
```

**Step 7: Verify Root**

1. First boot takes 2-5 minutes
2. Open Magisk app
3. Should show:
   - Magisk: Installed (version)
   - App: Latest (version)

Test root:
```bash
adb shell
su
id
# Should return: uid=0(root)
```

---

### Method 2: TWRP Recovery (Older Devices)

For OnePlus 8 series and older with TWRP:

**Step 1: Download TWRP**

1. Visit [TWRP OnePlus](https://twrp.me/Devices/OnePlus/)
2. Find your device
3. Download TWRP image

**Step 2: Boot TWRP**

```bash
fastboot boot twrp.img
```

**Step 3: Flash Magisk**

1. Download Magisk ZIP
2. Push to device:
```bash
adb push Magisk-v27.0.zip /sdcard/
```
3. In TWRP: Install > Select ZIP
4. Swipe to flash
5. Reboot system

**Note:** OnePlus 10+ devices generally lack TWRP support.

---

## Post-Root Setup

### Configure Magisk

**Step 1: Basic Settings**

Magisk > Settings:
- **Zygisk**: Enable
- **Enforce DenyList**: Enable
- **Hide Magisk app**: Recommended for banking

**Step 2: Configure DenyList**

Add to DenyList:
- Google Play Services (all)
- Google Play Store
- Banking apps
- Payment apps (Google Pay, etc.)
- SafetyNet-sensitive apps

**Step 3: Install Essential Modules**

Recommended for OnePlus:
- **Universal SafetyNet Fix** - Banking compatibility
- **Shamiko** - Enhanced root hiding
- **LSPosed (Zygisk)** - Framework
- **Systemless Hosts** - Ad blocking

### OxygenOS/ColorOS Optimization

**Battery Optimization:**
1. Settings > Battery > Battery optimization
2. Find Magisk and root apps
3. Set to "Don't optimize"

**Autostart Permission:**
1. Settings > Apps > Manage apps
2. Magisk and root apps
3. Enable "Autostart"

**Background Restrictions:**
1. Settings > Apps > Manage apps
2. Magisk and root apps
3. Disable "Restrict background activity"

---

## OTA Handling

### For A/B Devices (All Modern OnePlus)

**Step 1: Download OTA**

Settings > System > System update

Download update but **DO NOT reboot**

**Step 2: Install with Magisk**

1. Open Magisk app
2. Tap "Install" next to Magisk
3. Select "Install to Inactive Slot (After OTA)"
4. Wait for installation
5. Tap "Reboot" when prompted

**Step 3: Verify After Update**

- System boots to updated version
- Magisk still installed
- Root preserved

---

## Troubleshooting

<details><summary>Click to expand troubleshooting tips</summary>

### Bootloader Issues

**"OEM Unlocking" Greyed Out**

Causes:
- Device protection active
- Carrier-locked (T-Mobile)
- Account lock

Solutions:
1. Remove all accounts
2. Factory reset device
3. Wait 24 hours after setup
4. Try again

If still grey: Device may be carrier-locked

**Fastboot Not Detecting**

Solutions:
- Update Platform Tools
- Try USB 2.0 port
- Different USB cable
- Reinstall drivers (Windows)
- Try different computer

### Installation Issues

**Magisk Shows "N/A"**

Causes:
- Wrong image patched
- Wrong partition flashed

Solutions:
1. Verify correct image (boot vs init_boot)
2. Check Android version
3. Re-extract and patch correct image
4. Flash to correct partition

**Device Bootloop**

Solutions:
```bash
# Flash stock image
fastboot flash boot stock_boot.img
# Or
fastboot flash init_boot stock_init_boot.img
fastboot reboot
```

### Root Access Issues

**Apps Not Getting Root**

Solutions:
1. Open Magisk, check status
2. Grant root to shell: `adb shell su`
3. Reinstall via Direct Install
4. Clear Magisk app data

**SafetyNet Fails**

Solutions:
1. Enable Zygisk
2. Configure DenyList
3. Hide Magisk app
4. Install SafetyNet Fix module
5. Clear Google Play Services
6. Reboot

---

</details>

## Unroot and Restore

### Remove Root Only

```bash
# Magisk > Uninstall > Restore Images
# Root removed, bootloader still unlocked
```

### Flash Stock Firmware

**Method 1: Fastboot ROM**

1. Download fastboot ROM
2. Extract and run flash script:
```bash
# Windows
flash-all.bat

# Linux/Mac
./flash-all.sh
```

**Method 2: MSM Download Tool**

For complete restore and unbrick:
1. Download MSM tool for your device (XDA)
2. Boot to EDL mode
3. Run MSM tool
4. Complete stock restoration

### Relock Bootloader (Optional)

::: danger RELOCK WARNING
Only relock when completely stock. Relocking with modified system will brick!
:::

```bash
fastboot oem lock
```

---


## Best Practices

### Security

1. **Hide Magisk** for banking apps
2. **Configure DenyList** properly
3. **Only install trusted modules**
4. **Keep Magisk updated**
5. **Backup stock images**
6. **Use strong device security** (PIN, password, biometrics)

---

## Community Resources

**Official OnePlus:**
- [OnePlus Downloads](https://www.oneplus.com/support) - Stock firmware
- [OnePlus Forums](https://forums.oneplus.com/) - Official community

**Developer Community:**
- [XDA OnePlus Forums](https://xdaforums.com/c/oneplus.11993/) - Device discussions
- [Reddit r/OnePlus](https://www.reddit.com/r/oneplus/) - Community help

### Getting Help

**When asking for help, provide:**
- Exact OnePlus model
- OxygenOS/ColorOS version
- Android version
- Which image patched
- Exact error messages
- Steps attempted

---

## Next Steps

**After Rooting Your OnePlus:**

1. **Essential apps:**
   - [Root Apps Collection](../android-root-apps/) - Curated list

2. **Enhance experience:**
   - [Ad Blocking Guide](../guides/android-adblocking.md) - System-wide blocking
   - [Debloating Guide](../guides/android-apps-debloating.md) - Remove bloat
   - [LSPosed Guide](./lsposed-guide.md) - App modifications

3. **Explore ROMs:**
   - [Custom ROM Guide](./custom-rom-installation.md) - Installation guide
   - LineageOS for stability
   - Pixel Experience for clean look

