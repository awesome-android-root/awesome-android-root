---
layout: doc
title: Complete APatch Root Guide
description: "Master APatch rooting — a modern kernel-based root solution. Step‑by‑step installation and configuration Guide."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/apatch-guide
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete APatch Root Guide - Next-Generation Android Rooting
  - - meta
    - property: og:description
      content: Install APatch root with our comprehensive guide. Kernel-based rooting solution for Android 10+ with module support and modern security practices.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/apatch-guide
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/apatch-guide.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete APatch Root Guide
  - - meta
    - name: twitter:description
      content: Modern kernel-based Android rooting with APatch. Evolving module support and practical security.
  - - meta
    - name: keywords
      content: apatch root guide, kernel-based root, android 10 root, apatch installation, kernel patching, init_boot, boot.img, A/B slots
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Rooting
  - - meta
    - property: article:tag
      content: APatch
  - - meta
    - property: article:tag
      content: Kernel Root
  - - meta
    - property: article:tag
      content: Android Rooting
  - - meta
    - name: robots
      content: index, follow
---

# APatch Root Installation Guide

Modern kernel-based root solution for Android 10+. Install APatch for systemless root with minimal system modifications and evolving module ecosystem.

## Quick Navigation

- [What is APatch](#understanding-apatch)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-steps)
- [Post-Installation](#post-installation-setup)
- [Module Management](#managing-modules)
- [OTA Updates](#ota-handling)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Complete rooting overview
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Required first step
- [Root Comparison](./root-framework-comparison.md) - Compare with Magisk and KernelSU
- [TroubleShooting Guide](../troubleshooting.md)
- [FAQ](../faqs.md) - Common questions

---

## Understanding APatch

APatch is a kernel-based rooting solution for Android 10+ that patches your boot or init_boot image to add an in-kernel superuser (su) implementation and systemless features.

### Core Features

- **Kernel-Level Integration** - root originates in the kernel, not via init hijack
- **Systemless Design** -  no need to remount or modify /system
- **OTA Friendly** - with correct slot handling and image matching
- **Growing Module System** - designed for modern Android releases

### APatch vs Alternatives

| Feature | APatch | Magisk | KernelSU |
|---------|--------|---------|----------|
| Architecture | Kernel-based | Userspace overlay | Kernel-based |
| Android Support | 10+ | 6.0+ | 11+ (GKI 2.0) |
| Setup Complexity | Moderate | Easy | Moderate-Advanced |
| Module Ecosystem | Growing (50+) | Mature (1000+) | Growing (300+) |
| Zygisk Support | No (alternatives exist) | Yes | No (ZygiskNext) |
| Root Hiding | Good | Good | Excellent |
| OTA Method | Manual slot flash | Built-in installer | Manual slot flash |

**Choose APatch if:**
- You want kernel-based security
- You have Android 10+ device
- You prefer modern architecture
- Magisk/KernelSU unsupported on your device
- You want AVB compatibility

> [!CAUTION] COMPATIBILITY NOTE
> Do not install APatch alongside Magisk or KernelSU. Choose one root solution only.

> [!TIP]
> Detailed comaprison with other root solutions: [Root Comparison](./root-framework-comparison.md)


---

## Prerequisites

### Critical Requirements

::: danger ESSENTIAL PREREQUISITES
**Unlocked Bootloader** - APatch requires unlocked bootloader. Complete [bootloader unlocking](./how-to-unlock-bootloader.md) first.

**Stock Firmware** - Download exact firmware matching your current build for image extraction.

**Complete Backup** - Backup all data. Unlocking bootloader wipes device completely.

**Battery 50%+** - Ensure sufficient battery to prevent interruption.
:::

### Hardware Requirements

- Android device with unlocked bootloader
- Android 10 or newer
- 50% or higher battery charge
- Quality USB cable (data-capable)
- Computer (Windows, macOS, or Linux)

### Software Requirements

**On Computer:**
- [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) (ADB/Fastboot)
- Device-specific USB drivers (Windows only)
- Payload dumper tool (for OTA extraction)
- Stock firmware for your device

**On Device:**
- Latest APatch APK from [GitHub](https://github.com/bmax121/APatch/releases)
- File manager app
- At least 500MB free storage

### Compatibility Check

**Android Version Support:**

| Android Version | APatch Support | Notes |
|-----------------|----------------|-------|
| Android 15 | Yes | Full support |
| Android 14 | Yes | Full support |
| Android 13 | Yes | Often uses init_boot |
| Android 12 | Yes | Full support |
| Android 11 | Yes | May use init_boot |
| Android 10 | Yes | Minimum supported |
| Android 9 and older | No | Not supported |

**Device Compatibility:**
- Check [APatch GitHub Issues](https://github.com/bmax121/APatch/issues) for your device
- Verify boot or init_boot partition usage
- Confirm stock firmware availability

---

## Understanding Boot vs Init Boot

Critical to know which image to patch for your device.

### What's the Difference?

**boot.img (Traditional):**
- Contains kernel and ramdisk
- Used by most older devices
- Android 12 and older (typically)

**init_boot.img (Modern):**
- Separate ramdisk partition
- Used by many Android 13+ devices
- Google Pixel 7/8/9 use init_boot
- Part of Generic Kernel Image (GKI) design

### How to Determine?

**Method 1: Check APatch App**
1. Install APatch APK
2. Open app
3. App will indicate which partition to use

**Method 2: Check Partitions**
```bash
adb shell ls -l /dev/block/by-name/ | grep -E "boot|init_boot"
```

If you see `init_boot`, your device likely uses it.

**Method 3: Device-Specific Rules**

| Device | Image to Patch | Notes |
|--------|----------------|-------|
| Google Pixel 7/8/9 | init_boot | Android 13+ |
| Google Pixel 6 and older | boot | Traditional |
| OnePlus (Android 13+) | Usually init_boot | Check partitions |
| Xiaomi (Android 13+) | Usually init_boot | Varies by model |
| Samsung | boot | Complex, see Samsung notes |
| Most Android 12 and older | boot | Traditional method |

::: tip CRITICAL DECISION
Patching wrong image will cause bootloop. Always verify before proceeding!
:::

---

## Installation Steps

### Step 1: Extract Stock Boot Image

You need stock boot.img or init_boot.img matching your current build.

**For Pixel Devices:**

1. Download factory image from [Google Developers](https://developers.google.com/android/images)
2. Extract ZIP file
3. Extract inner `image-*.zip`
4. Find `boot.img` or `init_boot.img`

**For OnePlus/OPPO/Realme (Payload.bin OTA):**

1. Download full OTA for your device
2. Extract payload.bin from OTA ZIP
3. Use payload-dumper-go to extract:

```bash
# Download payload-dumper-go
# Extract images
./payload-dumper-go -o extracted payload.bin

# boot.img and init_boot.img will be in extracted/
```

**For Xiaomi/Redmi/POCO:**

1. Download fastboot ROM (tgz) from Xiaomi
2. Extract archive
3. Navigate to images/ directory
4. Find boot.img or init_boot.img

**For Samsung (Advanced):**

1. Download firmware via Frija or SamFirm
2. Extract AP.tar file
3. Find boot.img.lz4 or init_boot.img.lz4
4. Decompress with lz4:

```bash
lz4 -d boot.img.lz4 boot.img
```

**Note:** Samsung requires Odin (not fastboot) and has limited APatch support.

**From Device (If Already Rooted):**

```bash
# Extract boot partition
adb shell su -c "dd if=/dev/block/by-name/boot of=/sdcard/boot.img"
adb pull /sdcard/boot.img

# Or for init_boot
adb shell su -c "dd if=/dev/block/by-name/init_boot of=/sdcard/init_boot.img"
adb pull /sdcard/init_boot.img
```

### Step 2: Patch Image with APatch

**Transfer Image to Device:**

```bash
# Transfer extracted boot or init_boot image
adb push boot.img /sdcard/Download/
# Or
adb push init_boot.img /sdcard/Download/
```

**Patch with APatch App:**

1. Install APatch APK on device
2. Enable "Install Unknown Apps" for file manager
3. Install APatch
4. Open APatch app
5. Tap "Patch Image" or "Install"
6. Select boot.img or init_boot.img
7. Wait for patching (30-60 seconds)

**Output file:** `apatch_patched_[random].img` in Download folder

### Step 3: Test Boot (Recommended)

Before permanent installation, test boot patched image.

**Transfer Patched Image to Computer:**

```bash
adb pull /sdcard/Download/apatch_patched_*.img ./
```

**Test Boot (Temporary):**

```bash
# Reboot to fastboot
adb reboot bootloader

# Verify fastboot connection
fastboot devices

# Boot patched image (NOT flashing)
fastboot boot apatch_patched_xxxxx.img
```

**Device will boot temporarily with APatch.**

If device boots successfully:
- Open APatch app
- Verify root working
- Proceed to permanent installation

If device bootloops:
- Force power off
- Boot normally (returns to stock)
- Verify you patched correct image
- Try different APatch version

### Step 4: Flash Permanently

Once test boot succeeds, flash permanently.

**Reboot to Fastboot:**

```bash
adb reboot bootloader
```

**Flash Appropriate Partition:**

For boot.img:
```bash
fastboot flash boot apatch_patched_xxxxx.img
```

For init_boot.img:
```bash
fastboot flash init_boot apatch_patched_xxxxx.img
```

**Check Active Slot (A/B Devices):**

```bash
# Check current slot
fastboot getvar current-slot
# Returns: a or b

# Flash to active slot specifically
fastboot flash boot_a apatch_patched_xxxxx.img
# Or
fastboot flash init_boot_b apatch_patched_xxxxx.img
```

**Reboot System:**

```bash
fastboot reboot
```

::: warning IMPORTANT
Do NOT disable AVB or flash vbmeta with verification disabled. APatch works with verified boot enabled.
:::

### Step 5: Verify Installation

**After Reboot:**

1. First boot may take 2-5 minutes
2. Open APatch app
3. Should show:
   - APatch: Installed (version)
   - Root access available

**Test Root Access:**

```bash
adb shell
su
id
# Should return: uid=0(root) gid=0(root)
```

Or install root checker app from Play Store.

---

## Post-Installation Setup

### Initial Configuration

**1. Configure Superuser Access**

Open APatch > Settings:

**Access Control:**
- Default response: Prompt (recommended)
- Timeout: 10 seconds
- Require authentication: Enable biometric
- Root logging: Enable

**Notifications:**
- Superuser requests: Enable
- Module updates: Enable
- Error alerts: Enable

**2. Hide APatch Manager**

For banking apps:
1. APatch > Settings
2. "Hide Manager"
3. Enter custom name
4. App repackages with new icon

**3. Security Settings**

- Enable biometric authentication
- Set automatic timeout
- Review superuser logs regularly
- Keep APatch updated

### Root Permission Management

**Grant Root Access:**
- Apps request root like normal
- Prompt appears with app info
- Grant or deny access
- All access logged

**Manage Permissions:**
- APatch > Superuser tab
- View all granted apps
- Revoke access anytime
- Review access history

---

## Managing Modules

### Module System Overview

**APatch Modules:**
- APatch-specific format
- Some KernelSU compatibility
- Systemless modifications
- Growing ecosystem (50+)

**Compatibility:**
- APatch native modules: Full support
- KernelSU modules: Many compatible
- Magisk modules: Limited (especially Zygisk)
- Check module documentation

### Installing Modules

**Method 1: Manager Installation**

1. Download module ZIP from trusted source
2. Open APatch > Modules
3. Tap "Install from storage"
4. Select module ZIP
5. Wait for installation
6. Reboot when prompted

**Method 2: Command Line**

```bash
# Install module via ADB
adb push module.zip /sdcard/Download/
adb shell
su
apatch module install /sdcard/Download/module.zip

# List installed modules
apatch module list

# Enable/disable module
apatch module enable module_id
apatch module disable module_id

# Remove module
apatch module remove module_id
```

### Module Troubleshooting

**Module Causes Bootloop:**

```bash
# Boot to fastboot
# Flash stock boot image
fastboot flash boot stock_boot.img
fastboot reboot

# Or remove modules via ADB
adb wait-for-device shell
rm -rf /data/adb/modules/[module_name]
```

**Module Not Working:**

1. Verify module is APatch-compatible
2. Check APatch version requirements
3. Review module logs
4. Reinstall module
5. Contact module developer

---

## OTA Handling

### OTA Updates for A/B Devices

Most modern devices use A/B partitions. Preserve root across OTAs:

**Step 1: Download OTA**

Settings > System > Update

Download OTA but DO NOT reboot yet.

**Step 2: Extract New Boot Image**

1. OTA file located in: `/data/ota_package/` or similar
2. Extract payload.bin from OTA
3. Use payload-dumper-go to extract new boot/init_boot
4. New image matches updated system

**Step 3: Patch New Image**

1. Transfer new boot/init_boot to device
2. Open APatch
3. Patch the new image
4. Pull patched image to computer

**Step 4: Flash to Inactive Slot**

```bash
# Check current slot
fastboot getvar current-slot
# Returns: a

# OTA installed to slot b (inactive)
# Flash patched image to slot b
fastboot flash boot_b apatch_patched_new.img
# Or
fastboot flash init_boot_b apatch_patched_new.img

# Reboot
fastboot reboot
```

**Step 5: Verify After Update**

1. System boots to updated slot (b)
2. APatch still installed and working
3. Verify root access

### OTA Updates for Non-A/B Devices

**Method:**

1. Extract new boot/init_boot from OTA
2. Patch with APatch
3. Flash to boot/init_boot partition
4. Modules may need reinstallation

---

## Root Hiding and Play Integrity

### Configure Root Hiding

**Step 1: Hide Manager**

1. APatch > Settings
2. Hide Manager with custom name
3. App repackaged

**Step 2: Per-App Deny**

1. APatch > Superuser
2. Configure per-app root access
3. Deny for banking/payment apps

**Step 3: Install Integrity Modules**

1. Play Integrity Fix (APatch-compatible version)
2. Download from trusted source
3. Install via APatch
4. Configure device fingerprint
5. Reboot device

**Step 4: Clear App Data**

After setup:
1. Settings > Apps
2. Clear data for:
   - Google Play Services
   - Google Play Store
   - Banking apps
3. Reboot
4. Reopen apps

### Testing Play Integrity

**Testing Apps:**
- YASNAC - SafetyNet checker
- Play Integrity API Checker - Official
- TB Checker - Comprehensive

**Expected Results:**
- Basic Integrity: PASS (possible)
- Device Integrity: FAIL (unlocked bootloader)
- Strong Integrity: FAIL (hardware attestation)

::: warning REALITY CHECK
Play Integrity is increasingly strict. Even with APatch, some banking apps may detect root. Results vary.
:::

---

## Uninstallation

### Complete APatch Removal

**Method 1: Flash Stock Image**

```bash
# Most reliable method
adb reboot bootloader

# Flash stock boot or init_boot
fastboot flash boot stock_boot.img
# Or
fastboot flash init_boot stock_init_boot.img

# Reboot
fastboot reboot
```

**Method 2: Via Recovery**

1. Boot to custom recovery (if installed)
2. Flash stock boot/init_boot image
3. Wipe cache
4. Reboot system

**Method 3: Full Firmware Flash**

For complete clean install:
1. Download full stock firmware
2. Flash via fastboot or manufacturer tool
3. All modifications removed

### Clean App Data

```bash
# Uninstall APatch app
adb shell pm uninstall apatch.package.name

# Clear remaining data
adb shell rm -rf /data/adb/apatch
```

---

## Device-Specific Notes

### Google Pixel

**Pixel 7/8/9 (Android 13+):**
- Patch init_boot.img
- Full AVB support
- Factory images easily available

**Pixel 6 and Older:**
- Patch boot.img
- Traditional method

### OnePlus/OPPO/Realme

**ColorOS/OxygenOS 12+:**
- Often use init_boot
- OTA as payload.bin
- Check partitions first

### Xiaomi/Redmi/POCO

**HyperOS/MIUI:**
- Android 13+ often use init_boot
- Fastboot ROM available
- Anti-rollback protection (ARB)
- Never downgrade across ARB versions

### Samsung

**Special Considerations:**
- Uses Odin (no fastboot)
- AP.tar contains images
- Images compressed with lz4
- Limited APatch support
- Follow Samsung-specific guides

::: danger SAMSUNG WARNING
Samsung root support is experimental with APatch. Proceed with extreme caution. Knox will be tripped permanently.
:::

---

## Troubleshooting

<details><summary>👉 Click to expand details</summary><br>

### Installation Issues

**Device Bootloops After Flashing**

Causes:
- Wrong image patched (boot vs init_boot)
- Image doesn't match current build
- Flashed to wrong partition

Solutions:
1. Boot to fastboot immediately
2. Flash stock image:
```bash
fastboot flash boot stock_boot.img
fastboot reboot
```
3. Verify correct partition and image
4. Re-extract and patch correct image

**APatch App Fails to Patch**

Solutions:
1. Update to latest APatch APK
2. Clear app data and retry
3. Verify image is correct format
4. Check kernel compatibility
5. Try different image extraction method

**Fastboot Not Detecting Device**

Solutions:
- Update Platform Tools
- Try different USB port (USB 2.0)
- Reinstall device drivers (Windows)
- Check USB cable quality
- Try different computer

### Root Access Issues

**Apps Not Getting Root**

Solutions:
1. Verify APatch shows "Installed"
2. Grant root to shell: `adb shell su`
3. Check superuser access logs
4. Reinstall APatch via direct install
5. Clear app requesting root

**Root Lost After Reboot**

Solutions:
1. Verify boot/init_boot still patched
2. Check for system updates that overwrote image
3. Re-flash patched image
4. Check for module conflicts

### OTA Issues

**Lost Root After OTA**

Solution:
1. Extract boot/init_boot from new build
2. Patch with APatch
3. Flash to current active slot
4. Root restored

**OTA Won't Install**

Causes:
- Modified system partition
- Disabled AVB (shouldn't be)
- Corrupted OTA file

Solutions:
1. APatch should NOT modify system
2. Don't disable AVB with APatch
3. Re-download OTA
4. Flash full stock firmware if needed

</details>

---

## Next Steps

**After Installing APatch:**

1. **Install essential modules:**
   - Systemless hosts for ad blocking
   - Play Integrity Fix for banking
   - Busybox for enhanced commands

2. **Explore root apps:**
   - [Root Apps Collection](../android-root-apps/) - Curated apps

3. **Learn advanced techniques:**
   - [Ad Blocking Guide](../guides/android-adblocking.md) - System-wide blocking
   - [Debloating Guide](../guides/android-apps-debloating.md) - Remove bloat
   - [Custom ROMs](./custom-rom-installation.md) - Next level

4. **Join community:**
   - Share experiences
   - Help others
   - Stay updated on development

---

## Community Resources

**Official Resources:**
- [APatch Website](https://apatch.dev/) - Official documentation
- [APatch GitHub](https://github.com/bmax121/APatch) - Source code and releases
- [APatch Telegram](https://t.me/APatchChannel) - Official community

**Support Communities:**
- [Reddit r/ApatchRoot](https://www.reddit.com/r/ApatchRoot/) - Community discussions
- [XDA APatch Forum](https://forum.xda-developers.com/) - Device-specific help

### Getting Help

**Awesome Android Root help resources**
- [Troubleshooting Guide](../troubleshooting.md)
- [FAQs](../faqs.md)

**When asking for help, provide:**
- Device model and Android version
- Build number (Settings > About)
- APatch version installed
- Which partition patched (boot/init_boot)
- Which slot (A/B devices)
- Exact error messages
- APatch logs from Manager
- Steps already attempted
