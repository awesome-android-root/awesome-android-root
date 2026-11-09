---
layout: doc
title: Google Pixel Root Guide
description: "Root eligible Google Pixel devices with model-specific bootloader, factory-image, Magisk, OTA and recovery guidance."
head:
  - - meta
    - property: og:title
      content: "Google Pixel Root Guide"
  - - meta
    - property: og:description
      content: "Root eligible Google Pixel devices with model-specific bootloader, factory-image, Magisk, OTA and recovery guidance."
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/google-pixel.png
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: "Google Pixel Root Guide"
  - - meta
    - name: twitter:description
      content: "Root eligible Google Pixel devices with model-specific bootloader, factory-image, Magisk, OTA and recovery guidance."
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/google-pixel.png
  - - meta
    - name: twitter:image:alt
      content: Google Pixel Root Guide - Bootloader Unlock & Magisk Installation
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
      content: Google Pixel
  - - meta
    - property: article:tag
      content: Magisk
  - - meta
    - property: article:tag
      content: Bootloader Unlock
  - - meta
    - property: article:tag
      content: Android Rooting
  - - meta
    - name: robots
      content: index, follow
---

# Google Pixel Root Guide

::: danger BEFORE FLASHING
Unlocking erases your data. Back up first and obtain stock firmware for the exact model and build. Verify the Magisk image, target partition, slot and recovery procedure before writing anything. Google publishes [model- and update-specific anti-rollback instructions](https://developers.google.com/android/images); follow them before flashing or switching slots.
:::

This page describes Magisk. Other root methods can require different images; see the [KernelSU](./kernelsu-guide.md) and [APatch](./apatch-guide.md) guides.

This guide covers bootloader unlocking, official factory images and Magisk on eligible Google Pixel devices.

::: tip QUICK START
**For experienced users:** See [Pixel Flasher](#method-0-pixel-flasher-gui-tool-easiest) for a GUI workflow, or use the manual steps below.
:::

## Quick Navigation

- [Prerequisites](#prerequisites)
- [Device Compatibility](#device-compatibility)
- [Bootloader Unlock](#unlock-bootloader)
- [Root Methods](#root-installation-methods)
  - [Pixel Flasher](#method-0-pixel-flasher-gui-tool-easiest)
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
- ✅ Eligible Google Pixel device
- ✅ USB-C cable (quality matters)
- ✅ Computer (Windows/macOS/Linux)
- ✅ 50%+ battery charge

**Software Downloads:**
1. **[Android Platform Tools](https://developer.android.com/studio/releases/platform-tools)** - ADB/Fastboot
2. **[Google USB Drivers](https://developer.android.com/studio/run/win-usb)** - Windows only
3. **[Magisk APK](https://github.com/topjohnwu/Magisk/releases)** - Latest stable
    - **First-generation Pixel / Pixel XL:** a [reported issue](https://github.com/topjohnwu/Magisk/issues/9808) describes an oversized image on Pixel XL with v30.7; a commenter reports success with [v30.6](https://github.com/topjohnwu/Magisk/releases/tag/v30.6). Check the discussion and patched image size for your device; do not assume later releases have fixed it.
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

## Device Compatibility

Many Pixel devices can be unlocked and rooted, but carrier policy and the exact variant matter. Confirm OEM unlocking and a recovery path for your device first.

### Incompatible Devices

::: warning CARRIER LOCKS
**Verizon and some carrier-locked models** may have OEM unlocking permanently disabled. Always verify "OEM unlocking" is available in Developer Options before purchasing a device for rooting.
:::

::: tip 💡 Rather not unlock at all?
**Root My Pixel** uses the GhostLock kernel bug (CVE-2026-43499) to give supported Pixel devices **temporary, session-only root without unlocking the bootloader** - staged on-device via Shizuku. A full reboot ends active root, though files or settings changed during the session may remain. See [Root Without Unlocking the Bootloader](./root-without-unlocking-bootloader.md).
:::

### Image Type Quick Reference

| Device | Magisk image examples |
|---|---|
| Pixel 6, 6 Pro and 6a | Commonly `boot.img`, including after an Android 13 upgrade. |
| Pixel 7, 8, 9 and 10 series | Commonly `init_boot.img`. |
| Other models or custom firmware | Verify the actual ramdisk image and target partition for the exact build. |

These are examples, not a substitute for checking the firmware and device instructions. Android 13 upgrades do not necessarily change the original partition layout ([AOSP](https://source.android.com/docs/core/architecture/partitions/generic-boot)); see also [PixelFlasher's image-selection notes](https://github.com/badabing2005/PixelFlasher#usage). Magisk's Ramdisk field or the mere presence of `init_boot.img` does not by itself identify the right target.

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

Use the [quick reference](#image-type-quick-reference) as a starting point, then confirm the image, partition and slot for the exact model and installed build. See [Magisk's installation instructions](https://topjohnwu.github.io/Magisk/install.html#getting-started) for other layouts, including `vendor_boot` or recovery.

---

### Method 0: Pixel Flasher (GUI Tool) {#method-0-pixel-flasher-gui-tool-easiest}

[PixelFlasher](https://github.com/badabing2005/PixelFlasher) is a third-party GUI for processing factory images or full OTAs, patching images and flashing supported Pixels. Follow its [current workflow](https://github.com/badabing2005/PixelFlasher#usage):

1. Install Platform Tools and the tool, and connect the device with USB debugging authorized.
2. Select firmware for the exact Pixel model and intended build. Process the package and verify the selected stock image and the image patched on this device.
3. Review the flash mode, slot and all prompts before confirming. Factory-image modes can wipe data; an OTA is not the same operation as flashing one patched image. Root preservation is not guaranteed.
4. After booting, open Magisk and verify the installed status and superuser access.

Keep a separate backup and follow Google's model-specific anti-rollback instructions even when using a GUI.

---

### Method 1: Manual Boot Image Patching

#### Step 1: Get Factory Image

Download the [Google factory image](https://developers.google.com/android/images) for the exact Pixel variant and installed build. Retain the original firmware and a copy of the selected stock image for recovery. Read Google's model- and update-specific anti-rollback notes before continuing.

#### Step 2: Extract Boot Image

Extract the outer factory archive and its inner `image-*.zip`. Select the verified `boot.img` or `init_boot.img` for this device; do not infer the choice solely from Android version. If a newer package has a different layout, use the matching device instructions or the supported package-selection method in Magisk rather than guessing.

#### Step 3: Patch with Magisk

1. Transfer the verified stock image to the phone. For example, if the target is `boot.img`:

   ```bash
   adb push boot.img /sdcard/Download/
   ```

2. Install the official [Magisk app](https://github.com/topjohnwu/Magisk/releases) on the **same device**. Open **Install > Patch firmware / image > Select from storage** and select the image. Current Magisk can also extract supported factory or OTA packages itself; older versions may use different menu labels.
3. Note the patched output filename in Download. Never use an image patched on another phone or downloaded pre-patched.

#### Step 4: Flash Patched Image

Replace `magisk_patched-EXAMPLE.img` below with the actual output filename. On an A/B device, check the current slot and follow the exact device's slot instructions. Do not flash both slots or switch slots blindly: Google's [factory-image notes](https://developers.google.com/android/images) describe anti-rollback hazards.

```bash
adb pull /sdcard/Download/magisk_patched-EXAMPLE.img .
adb reboot bootloader
fastboot devices
fastboot getvar current-slot
```

On standard A/B devices, unsuffixed `fastboot flash` commands for a slotted partition target the current active slot by default ([AOSP](https://source.android.com/docs/core/ota/ab/ab_implement#kernel-slot-arguments)); `fastboot getvar current-slot` reports the slot selected for the next boot. Use these examples only if that is the intended slot and the image matches its firmware. For a different slot, follow the exact-device procedure instead.

Run **only one** of the following commands, for the verified image and intended slot. If the target is not `boot` or `init_boot`, stop and use the [Magisk guide](./magisk-guide.md#step-3-flash-patched-image) and model-specific instructions instead.

If you patched the verified `boot.img`:

```bash
fastboot flash boot magisk_patched-EXAMPLE.img
```

If you patched the verified `init_boot.img`:

```bash
fastboot flash init_boot magisk_patched-EXAMPLE.img
```

```bash
fastboot reboot
```

Open Magisk and complete any requested setup after Android boots.

---

### Method 2: Temporary Root Test

`fastboot boot` requires an unlocked bootloader and support from the exact device. Only use it with a compatible, bootable `boot` image when the device-specific instructions explicitly support the method. An `init_boot` image is not a standalone bootable image. A temporary boot can still fail, and software run during the session can make persistent changes.

If the exact model supports booting the **patched `boot.img`**, use its instructions and actual filename. A successful temporary boot is not a permanent installation; Magisk's Direct Install is an additional write and must also be supported by that device.

This is different from [temporary root without unlocking](./root-without-unlocking-bootloader.md).

---

## Post-Root Setup

### Essential Magisk Configuration

- In current Magisk, use **Superuser** to explicitly grant trusted apps access before they request `su`. To test with ADB, grant **ADB shell** first, then run `adb shell su -c id`; revoke the shell grant when finished. Older releases, including the version noted for the first-generation Pixel above, may instead show interactive request prompts.
- Enable **Zygisk** only when a trusted module needs it. **DenyList** can revert Magisk modifications in selected processes, but it does not guarantee that apps will accept a rooted device.
- Current Magisk releases do not offer the old **Hide the Magisk app** rename option. See the [Magisk guide](./magisk-guide.md#root-hiding-and-play-integrity) for current limitations.

### Recommended Modules

Install only modules needed for your setup, and verify their device and Android compatibility. See the [app and module catalog](../apps-and-modules/) and [Play Integrity guidance](../troubleshooting.md#play-integrity-and-banking-apps). No module guarantees that a banking or payment app will work.

---

## OTA Updates with Root

### Automatic Method (Pixel Flasher)

PixelFlasher supports full OTA and factory-image workflows. Follow its [documentation](https://github.com/badabing2005/PixelFlasher#usage), verify the package and flash mode, and review whether it will patch or flash an image. Do not assume root will be preserved or that every mode keeps data.

### Manual Method (Magisk)

For supported A/B Pixel updates, [Magisk's OTA guide](https://topjohnwu.github.io/Magisk/ota.html) describes this order:

1. If the update requires stock images, choose **Uninstall > Restore Images** in Magisk before starting the OTA. Do not reboot. Magisk says this restore is normally unnecessary on Pixel when Google serves a full OTA for modified partitions. If a required stock backup is unavailable, stop and follow an exact-build recovery plan.
2. Apply the system OTA and wait for installation and optimization to finish. **Do not restart yet.**
3. In Magisk, select **Install > Install to Inactive Slot (After OTA)** and wait for it to finish.
4. Return to the system update screen and choose **Restart now**. Verify Magisk after boot.

The OTA may fail if read-only partitions such as `system` or `vendor` were modified. If the method or option is not supported, follow the device's update instructions and patch the new build's image after updating. Root retention is not guaranteed.

---

## Troubleshooting

<details><summary>🔧 Common Issues & Fixes</summary>

### OEM Unlocking Greyed Out

Check the model and carrier policy. A reset or waiting period is not a guaranteed unlock; do not flash if the bootloader cannot be unlocked.

### Bootloop After Root

Return to the bootloader using the device's key combination. If the only change was the Magisk image, follow the device-specific recovery instructions to restore the matching stock image to **every affected partition and slot**. Restoring `boot` does not repair an accidental write to `init_boot` or another partition. If the affected slot or images are uncertain, or other partitions were changed, use Google's [factory-image recovery instructions](https://developers.google.com/android/images), including its anti-rollback notes. A full factory restore erases data.

### Play Integrity Fails
Follow the module stack and configuration order in
[Play Integrity and Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps).

### Lost Root After OTA

Check the now-installed build and active slot, obtain the matching stock image, and follow the verified patching steps above. Do not reuse an image patched for the previous build.

</details>

---

## Unroot / Factory Reset

### Remove Root Only

If Android boots and Magisk has the needed backups, use **Uninstall > Complete Uninstall** in the app. **Restore Images** alone is an OTA preparation step, not a complete uninstall. If the app cannot restore the installation, use the exact-build, partition and slot recovery plan above. Removing root does not relock the bootloader or necessarily undo other changes.

### Complete Stock Restore

Google offers the [Android Flash Tool](https://flash.android.com/) and [factory images](https://developers.google.com/android/images). Follow Google's instructions for the exact model, build and anti-rollback state. The factory-image `flash-all` scripts normally erase data; back up first and do not assume that a full firmware flash preserves it. Google's [full OTA instructions](https://developers.google.com/android/ota) are another stock update option, but do not assume an OTA repairs every manually modified partition.

### Relock Bootloader

::: danger RELOCK WARNING
Relocking can erase data and can leave the device unbootable if any required partition, slot or verified-boot state is not compatible stock. Only consider it after a complete stock restore and successful boot, following Google's instructions for the exact device and build. Check Google's anti-rollback notes before changing slots.
:::

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
adb devices                    # Verify an authorized connection
adb reboot bootloader          # Enter the bootloader
fastboot devices               # Verify the fastboot connection
fastboot getvar current-slot   # Check the active slot on an A/B device
```

For flashing, use the conditional commands in [Manual Boot Image Patching](#method-1-manual-boot-image-patching), not a command chosen by Android version alone.

---

## Next Steps

- **Root setup:** **[Post-root configuration](./index.md#step-4-post-root-configuration)**
- **Tools:** **[Apps and modules](../apps-and-modules/)**
- **Common tasks:** **[Debloating](../general-guides/android-apps-debloating.md)** · **[Ad blocking](../general-guides/android-adblocking.md)**
- **Optional extensions:** **[LSPosed](./lsposed-guide.md)** · **[Custom ROM installation](./custom-rom-installation.md)**

::: warning
First-generation Pixel owners should check the [patched-image size issue](https://github.com/topjohnwu/Magisk/issues/9808) and its current status before flashing.
:::
