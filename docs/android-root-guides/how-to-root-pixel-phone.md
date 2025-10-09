---
layout: doc
title: Google Pixel Root Guide 2025
description: Complete guide to root Google Pixel devices. All models from Pixel 1 to Pixel 10 Pro. Bootloader unlock, Magisk installation, and OTA handling.
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-root-pixel-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Google Pixel Root Guide 2025
  - - meta
    - property: og:description
      content: Root any Google Pixel device with comprehensive guide covering bootloader unlock, factory images, and Magisk installation.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/how-to-root-pixel-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/google-pixel.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: keywords
      content: pixel root 2025, pixel 9 root, pixel 8 root, google pixel magisk, pixel bootloader unlock
  - - meta
    - name: robots
      content: index, follow
---

# Google Pixel Root Guide

Root any Google Pixel device with the easiest rooting process in Android. Clean bootloader unlock, official factory images, and Magisk support.

## Quick Navigation

- [Why Root Pixels](#why-root-pixel-devices)
- [Supported Devices](#supported-devices)
- [Prerequisites](#prerequisites)
- [Bootloader Unlock](#unlock-bootloader)
- [Root Installation](#root-installation)
- [OTA Updates](#ota-handling)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Universal rooting concepts
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Detailed unlock guide
- [Magisk Guide](./magisk-guide.md) - Complete Magisk documentation
- [KernelSU Guide](./kernelsu-guide.md) - Alternative root method

---

## Why Root Pixel Devices

Google Pixel phones are the easiest and safest Android devices to root.

### Pixel Advantages

- **Developer-Friendly Design:** - No OEM approval required, Direct bootloader unlock, No waiting periods
- **Official Support:** - Factory images from Google, Complete firmware packages
- **Best Custom ROM Support:** - LineageOS, GrapheneOS, CalyxOS support
- **Recovery Tools:** - Pixel Flash Tool (web-based), Android Flash Tool, Official rescue images, Easy unbrick process

### Root Benefits for Pixels
- Remove Google bloat apps
- System-wide ad blocking
- Full backup capabilities
- Camera enhancements (GCam mods)
- Kernel tweaking
- Custom ROMs (GrapheneOS, CalyxOS)
- Advanced privacy controls

---

## Supported Devices

<details><summary>Click to expand all supported Pixel models</summary>

### All Google Pixel Models

**Pixel 10 Series (2025):**
- Pixel 10 Pro XL
- Pixel 10 Pro
- Pixel 10

**Pixel 9 Series (2024):**
- Pixel 9 Pro XL
- Pixel 9 Pro
- Pixel 9
- Pixel 9 Pro Fold

**Pixel 8 Series (2023):**
- Pixel 8 Pro
- Pixel 8
- Pixel 8a

**Pixel 7 Series (2022):**
- Pixel 7 Pro
- Pixel 7
- Pixel 7a

**Pixel 6 Series (2021):**
- Pixel 6 Pro
- Pixel 6
- Pixel 6a

**Pixel 5 Series (2020):**
- Pixel 5a 5G
- Pixel 5

**Pixel 4 Series (2019):**
- Pixel 4 XL
- Pixel 4
- Pixel 4a 5G
- Pixel 4a

**Older Pixels:**
- Pixel 3 XL / 3 / 3a XL / 3a
- Pixel 2 XL / 2
- Pixel XL / Pixel

### Version-Specific Notes

**Pixel 7, 8, 9 Series (Android 13+):**
- Use **init_boot.img** for patching
- Tensor chip architecture
- Enhanced security features

**Pixel 6 Series:**
- First with Tensor chip
- Use **init_boot.img** (Android 13+)
- Use **boot.img** (Android 12)

**Pixel 5 and Older:**
- Use **boot.img** for patching
- Qualcomm Snapdragon chips
- Traditional rooting method

::: warning CARRIER VARIANTS
Some US carrier models (especially Verizon) have OEM unlock disabled. Verify your model can be unlocked before purchasing.
:::

---

</details>

## Prerequisites

### Critical Requirements

::: danger BEFORE YOU START
**Full Data Wipe:** Unlocking bootloader erases everything on device including internal storage.

**Backup Everything:** Photos, contacts, messages, app data, authenticator codes.

**Verify Unlock Capability:** Settings > Developer Options > OEM Unlocking must be available and enabled.
:::

### Hardware Requirements

- Google Pixel device (any model)
- Quality USB-C to USB-A/C cable
- Computer (Windows, macOS, or Linux)
- 50%+ battery charge

### Software Requirements

**On Computer:**

1. **Platform Tools** (ADB/Fastboot)
   - Download: [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools)
   - Extract to easy location (C:\platform-tools\ on Windows)

2. **USB Drivers** (Windows only)
   - Download: [Google USB Drivers](https://developer.android.com/studio/run/win-usb)
   - Install before connecting device

3. **Factory Image** for your device
   - Download: [Google Factory Images](https://developers.google.com/android/images)
   - Find exact model and build number

**On Device:**

1. **Magisk APK**
   - Download: [Magisk GitHub](https://github.com/topjohnwu/Magisk/releases)
   - Latest stable version

2. **File Manager**
   - Pre-installed Files app works
   - Or download from Play Store

### Device Preparation

**Step 1: Enable Developer Options**

1. Settings > About phone
2. Tap "Build number" 7 times
3. Enter PIN/password
4. "You are now a developer!" appears

**Step 2: Enable Required Settings**

Developer Options:
- **OEM unlocking**: Enable (critical)
- **USB debugging**: Enable

**Step 3: Verify ADB Connection**

```bash
# Connect device via USB
# On device: Accept USB debugging prompt

# Test ADB
adb devices

# Should show:
# List of devices attached
# ABC123456789    device
```

---

## Unlock Bootloader

Simplest bootloader unlock process in Android.

### Step 1: Enter Fastboot Mode

**Method 1: ADB Command**
```bash
adb reboot bootloader
```

**Method 2: Hardware Keys**
1. Power off device completely
2. Hold Volume Down + Power
3. Release when fastboot screen appears

### Step 2: Verify Fastboot Connection

```bash
fastboot devices

# Should show device serial number
# Example: ABC123456789    fastboot
```

### Step 3: Unlock Bootloader

```bash
fastboot flashing unlock
```

**On Device:**
1. Warning screen appears
2. Use Volume keys to navigate
3. Select "UNLOCK THE BOOTLOADER"
4. Press Power to confirm
5. Device automatically wipes and reboots

::: tip UNLOCK TIME
Process takes 30-60 seconds. Device will show unlocked bootloader warning on every boot (normal).
:::

### Step 4: Complete Setup Again

After automatic reboot:
1. Complete initial Android setup
2. Skip most options for speed
3. Re-enable Developer Options (Build Number × 7)
4. Re-enable USB Debugging
5. Reconnect via ADB

---

## Root Installation

### Determine Correct Image

**Critical decision: boot.img vs init_boot.img**

| Device | Android Version | Image to Patch |
|--------|-----------------|----------------|
| Pixel 9 series | Android 14/15 | init_boot.img |
| Pixel 8 series | Android 14/15 | init_boot.img |
| Pixel 7 series | Android 13+ | init_boot.img |
| Pixel 6 series | Android 13+ | init_boot.img |
| Pixel 6 series | Android 12 | boot.img |
| Pixel 5 and older | All versions | boot.img |

**Quick Check in Magisk:**
- Install Magisk app first
- Open app
- Check "Ramdisk" field:
  - **Ramdisk: Yes** → Patch boot.img
  - **Ramdisk: No** → Patch init_boot.img

### Method 1: Boot Image Patching (Recommended)

**Step 1: Download Factory Image**

1. Visit [Google Factory Images](https://developers.google.com/android/images)
2. Find your exact device model
3. Find your exact build number (Settings > About phone)
4. Download matching factory image ZIP

**Example:**
- Device: Pixel 8 Pro
- Build: AP31.240517.015
- File: husky-ap31.240517.015-factory-abc12345.zip

**Step 2: Extract Boot Image**

```bash
# Extract outer ZIP
unzip husky-ap31.240517.015-factory-abc12345.zip

# Navigate to extracted folder
cd husky-ap31.240517.015/

# Extract inner image ZIP
unzip image-husky-ap31.240517.015.zip

# For Pixel 7/8/9: init_boot.img is now available
# For Pixel 6 and older: boot.img is now available
```

**Step 3: Transfer to Device**

```bash
# For Pixel 7/8/9
adb push init_boot.img /sdcard/Download/

# For Pixel 6 and older
adb push boot.img /sdcard/Download/
```

**Step 4: Install Magisk and Patch**

1. Transfer Magisk APK to device:
```bash
adb push Magisk.apk /sdcard/Download/
```

2. Install Magisk APK on device
3. Open Magisk app
4. Tap "Install" next to Magisk
5. Select "Select and Patch a File"
6. Navigate to Download folder
7. Select boot.img or init_boot.img
8. Tap "Let's Go"
9. Wait for patching (30-60 seconds)

**Output:** `magisk_patched_[random].img` in Download folder

**Step 5: Transfer Patched Image to Computer**

```bash
adb pull /sdcard/Download/magisk_patched_xxxxx.img ./
```

**Step 6: Flash Patched Image**

```bash
# Boot to fastboot
adb reboot bootloader

# Verify connection
fastboot devices

# For Pixel 7/8/9 (init_boot)
fastboot flash init_boot magisk_patched_xxxxx.img

# For Pixel 6 and older (boot)
fastboot flash boot magisk_patched_xxxxx.img

# Reboot
fastboot reboot
```

**Step 7: Verify Root**

1. First boot takes 2-5 minutes (normal)
2. Open Magisk app
3. Should show:
   - Magisk: Installed (version)
   - App: Latest (version)

Test root:
```bash
adb shell
su
id
# Should show: uid=0(root) gid=0(root)
```

::: tip SUCCESS!
If Magisk shows installed and su works, you're successfully rooted!
:::

---

### Method 2: Fastboot Boot (Temporary Root)

Test root without permanent changes.

```bash
# Boot to fastboot
adb reboot bootloader

# Boot patched image (temporary)
fastboot boot magisk_patched_xxxxx.img

# Device boots with temporary root
# Test root functionality
# If satisfied, use Method 1 to flash permanently
```

---

### Method 3: Custom Recovery (Legacy)

Not recommended for modern Pixels. Recovery-based installation deprecated. Use Method 1 instead.

---

## Post-Root Setup

### Configure Magisk

**Step 1: Basic Settings**

Magisk > Settings:
- **Update channel**: Stable
- **Hide Magisk app**: Recommended for banking
- **Zygisk**: Enable (for advanced modules)
- **Enforce DenyList**: Enable (for root hiding)

**Step 2: Configure DenyList**

Add to DenyList:
- Google Play Services (all components)
- Google Play Store
- Banking apps
- Payment apps (Google Pay, etc.)
- SafetyNet-sensitive apps

**Step 3: Install Essential Modules**

Recommended for Pixels:
- **Universal SafetyNet Fix** - Banking app compatibility
- **Shamiko** - Enhanced root hiding
- **LSPosed (Zygisk)** - Xposed framework
- **Systemless Hosts** - Ad blocking

### Root Verification

Test with root checker app:
- Download Root Checker from Play Store
- Run verification
- Should pass all tests

---

## OTA Handling

Preserve root when updating Pixel devices.

### For A/B Devices (All Modern Pixels)

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

1. System boots to updated version
2. Magisk still installed
3. Root preserved
4. Modules still active

::: tip MAGISK MAGIC
Magisk's "Install to Inactive Slot" handles everything automatically for Pixels!
:::

### Manual OTA Method

If automatic method fails:

1. Extract boot/init_boot from new factory image
2. Patch with Magisk
3. After OTA installs, flash patched image
4. Reboot to updated system with root

---

## Troubleshooting

<details><summary>Click to expand common issues and fixes</summary>

### Bootloader Issues

**"OEM Unlocking" Greyed Out**

Causes:
- Carrier-locked device (Verizon often locks)
- Device protection not cleared
- Account lock active

Solutions:
1. Remove all Google accounts
2. Wait 7 days after factory reset
3. Check if device is carrier-locked
4. Contact carrier to unlock if needed

**Fastboot Not Detecting Device**

Solutions:
- Update Platform Tools to latest
- Reinstall USB drivers (Windows)
- Try different USB port (USB 2.0)
- Try different USB cable
- Disable USB debugging, re-enable
- Try different computer

### Installation Issues

**Magisk Shows "N/A" After Flashing**

Causes:
- Wrong image patched (boot vs init_boot)
- Image doesn't match current build
- Patched wrong partition

Solutions:
1. Verify correct image for your device
2. Check build numbers match exactly
3. Re-extract and patch correct image
4. Flash to correct partition

**Device Bootloops After Root**

Solutions:
1. Boot to fastboot: Hold Volume Down + Power
2. Flash stock boot/init_boot:
```bash
fastboot flash boot stock_boot.img
# Or
fastboot flash init_boot stock_init_boot.img
fastboot reboot
```
3. Verify exact build match
4. Try patching again

### Root Access Issues

**Apps Not Detecting Root**

Solutions:
1. Open Magisk and check status
2. Grant root to shell: `adb shell su`
3. Reinstall Magisk via Direct Install
4. Check module conflicts
5. Clear Magisk app data and reconfigure

**SafetyNet/Play Integrity Fails**

Solutions:
1. Enable Zygisk in Magisk
2. Enable and configure DenyList
3. Add Google Play Services to DenyList
4. Hide Magisk app
5. Install Universal SafetyNet Fix module
6. Install Shamiko module
7. Clear Google Play Services data
8. Reboot device

### OTA Issues

**"Install to Inactive Slot" Option Missing**

Causes:
- Not an A/B device (very old Pixel)
- Magisk version too old

Solutions:
1. Update Magisk to latest version
2. Use manual OTA method instead

**Lost Root After OTA**

Solution:
1. Extract boot/init_boot from new build
2. Patch with Magisk
3. Flash patched image
4. Root restored

</details>

---

## Factory Reset / Unroot

### Remove Root (Keep Unlocked Bootloader)

```bash
# Flash stock boot image
adb reboot bootloader

fastboot flash boot stock_boot.img
# Or for Pixel 7/8/9
fastboot flash init_boot stock_init_boot.img

fastboot reboot
```

Root removed, bootloader still unlocked.

### Complete Stock Restore

**Method 1: Flash Full Factory Image**

```bash
# Extract factory image
# Run flash-all script

# Windows:
flash-all.bat

# Linux/Mac:
./flash-all.sh
```

Device completely restored to stock.

**Method 2: Pixel Flash Tool**

1. Visit [Pixel Flash Tool](https://flash.android.com/)
2. Connect device in fastboot mode
3. Select device and build
4. Click "Install"
5. Web tool flashes complete stock firmware

### Relock Bootloader (Optional)

::: danger RELOCK WARNING
Only relock when completely stock. Relocking with modified system will brick device!
:::

```bash
# Verify completely stock first
# Boot to fastboot
adb reboot bootloader

# Relock
fastboot flashing lock

# Confirm on device
# Device will factory reset again
```

---

## Pixel-Specific Tips

### GrapheneOS (Privacy-Focused ROM)

Pixel-exclusive custom ROM with enhanced security:
- Visit [GrapheneOS.org](https://grapheneos.org/)
- Web-based installer
- Enhanced privacy features
- Regular security updates
- Only available for Pixels

### CalyxOS (Privacy ROM)

Another privacy-focused option:
- Visit [CalyxOS.org](https://calyxos.org/)
- microG instead of Google Services
- Built-in VPN
- Excellent Pixel support

---

## Best Practices

### Security Recommendations

1. **Keep Magisk hidden** for banking apps
2. **Configure DenyList** for all sensitive apps
3. **Only install trusted modules**
4. **Keep Magisk updated**
5. **Backup working boot image** always

### Module Management

1. **Test modules individually**
2. **Avoid conflicting modules**
3. **Keep essential modules only**
4. **Update modules cautiously**
5. **Have stock boot.img ready**

---

## Community Resources

**Official Google Resources:**
- [Factory Images](https://developers.google.com/android/images) - Stock firmware
- [OTA Images](https://developers.google.com/android/ota) - Update packages
- [Pixel Flash Tool](https://flash.android.com/) - Web flasher
- [Driver Downloads](https://developer.android.com/studio/run/win-usb) - USB drivers

**Community Forums:**
- [XDA Pixel Forums](https://forum.xda-developers.com/c/google-pixel.12391/) - Device discussions
- [Reddit r/GooglePixel](https://www.reddit.com/r/GooglePixel/) - General Pixel community
- [Reddit r/PixelROM](https://www.reddit.com/r/PixelROM/) - Custom ROM discussions

**Custom ROM Resources:**
- [GrapheneOS](https://grapheneos.org/) - Privacy-focused ROM
- [CalyxOS](https://calyxos.org/) - Privacy ROM with microG
- [LineageOS](https://lineageos.org/) - Classic custom ROM

### Getting Help

**When asking for help, provide:**
- Exact Pixel model (Pixel 8 Pro, etc.)
- Android version and build number
- Which image you patched (boot/init_boot)
- Exact error messages
- Steps already attempted
- Magisk version installed

---

## Next Steps

**After Rooting Your Pixel:**

1. **Install essential apps:**
   - [Root Apps Collection](../android-root-apps/) - Curated list

2. **Enhance your experience:**
   - [Ad Blocking Guide](../guides/android-adblocking.md) - System-wide blocking
   - [Debloating Guide](../guides/android-apps-debloating.md) - Remove Google bloat
   - [LSPosed Guide](./lsposed-guide.md) - App modifications

3. **Consider custom ROMs:**
   - [Custom ROM Guide](./custom-rom-installation.md) - Installation steps
   - GrapheneOS for maximum privacy
   - CalyxOS for balanced privacy
   - LineageOS for customization