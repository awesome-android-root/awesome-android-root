---
layout: doc
title: Nothing & CMF Phone Rooting Guide
description: "Root eligible Nothing and CMF phones with model-specific bootloader checks, firmware selection, Magisk installation and recovery guidance."
head:
  - - meta
    - property: og:title
      content: "Nothing & CMF Phone Rooting Guide"
  - - meta
    - property: og:description
      content: "Root eligible Nothing and CMF phones with model-specific bootloader checks, firmware selection, Magisk installation and recovery guidance."
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/nothing.png
  - - meta
    - name: twitter:title
      content: "Nothing & CMF Phone Rooting Guide"
  - - meta
    - name: twitter:description
      content: "Root eligible Nothing and CMF phones with model-specific bootloader checks, firmware selection, Magisk installation and recovery guidance."
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/nothing.png
  - - meta
    - name: twitter:image:alt
      content: "Nothing & CMF Phone Rooting Guide with model-specific requirements"
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

::: danger BEFORE FLASHING
Unlocking wipes data. Back up first, obtain stock firmware for the exact model, region and installed build, and verify the Magisk image, target partition, slot and recovery method. Do not disable verified boot or relock a modified device as a generic fix.
:::

These steps use Magisk. [KernelSU](./kernelsu-guide.md) and [APatch](./apatch-guide.md) have different image and compatibility requirements.

This guide covers Magisk on eligible Nothing and CMF phones. Verify the exact model and firmware before unlocking or flashing.

## Quick Navigation
- [Device Compatibility](#device-compatibility)
- [Prerequisites](#prerequisites)
- [Bootloader Unlock](#unlock-bootloader)
- [Root Installation](#root-installation)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Universal rooting concepts
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Detailed unlock guide
- [Magisk Guide](./magisk-guide.md) - Complete Magisk documentation

---


## Device Compatibility

Unlock eligibility and flashing instructions depend on the exact model and firmware. Check OEM unlocking and a device-specific recovery path rather than assuming every variant is supported.

**Examples of codenames for firmware identification:**
- Phone (1): `Spacewar` · Phone (2): `Pong` · Phone (2a): `Pacman` · Phone (2a) Plus: `PacmanPro`
- Phone (3): `Metroid` · Phone (3a): `Asteroids` · Phone (3a) Pro: `AsteroidsPro`
- CMF Phone (1): `Tetris` · CMF Phone (2) Pro: `Galaga`

The community-maintained [Nothing Archive device index](https://github.com/spike0en/nothing_archive/blob/main/website/docs/devices.md) lists model numbers and firmware links; verify region and build as well as codename.

> [!TIP]
> **Don't want to unlock?** [Root My Nothing](https://github.com/ang3lo-azevedo/root-my-nothing) lists its Nothing Phone (1) GhostLock port as **in progress**, with an end-to-end exploit still unchecked. Do not assume the model is supported; check its upstream status and the sister project's [Nothing section](https://awesome-temporary-root.pages.dev/guide/#xiaomi-asus-nothing-and-honor).

---

## Prerequisites

### Critical Requirements

::: danger BEFORE YOU START
**Data Wipe:** Unlocking bootloader erases everything including internal storage.

**Backup Everything:** Photos, contacts, messages, app data, authenticator codes.

**Warranty:** Unlocking may affect warranty and service eligibility; check the terms for your region.

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
   - The community-maintained [Nothing Archive](https://github.com/spike0en/nothing_archive) indexes firmware and OTA packages. Verify model, region and exact installed build before using a file.
   - [Nothing Support](https://support.nothing.tech/hc/en-us/articles/43114751704209-How-do-I-download-the-latest-firmware) describes the normal system-update path. An OTA package is not necessarily a complete factory recovery package.

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

Verify the command for the exact device. For example, LineageOS documents `fastboot flashing unlock` for the Nothing Phone [(1)](https://wiki.lineageos.org/devices/Spacewar/install/) and [(2)](https://wiki.lineageos.org/devices/Pong/install/). Follow the on-device confirmation. **Unlocking wipes data.** Do not try a different unlock command as a generic fallback if it fails; check the model's instructions and eligibility.

### Step 3: Complete Setup

After automatic factory reset:
1. Complete Android setup
2. Re-enable Developer options
3. Re-enable USB debugging

---

## Root Installation

### Determine Correct Image

The image depends on the exact phone and firmware, not the currently running Android version. For example:

- **Phone (1):** community reports describe patching `boot.img`, including on [Android 15](https://github.com/broisnees/phone).
- **Phone (2), model A065:** a [device-specific community discussion](https://xdaforums.com/t/guide-unlock-bootloader-root-with-magisk-stock-and-patched-boot-images-model-a065-eea.4605979/page-32) identifies `boot.img`, despite its Android 13 launch.

Other Nothing/CMF models may use `init_boot` or another layout. Check the exact model, build, ramdisk image, partition and slot with [Magisk upstream](https://topjohnwu.github.io/Magisk/install.html#getting-started) and a trusted device-specific source. Magisk's Ramdisk field or the presence of a file named `init_boot.img` alone does not determine the target.

### Method 1: Boot Image Patching

**Step 1: Obtain the stock image**

Get a full firmware or OTA package matching the exact model, region and installed build, for example through the community [Nothing Archive](https://github.com/spike0en/nothing_archive). Keep a separate copy of the original firmware and the verified image. Some packages contain `payload.bin`; [payload-dumper-go](https://github.com/ssut/payload-dumper-go#usage) can extract supported payloads:

```bash
payload-dumper-go -o extracted payload.bin
```

An incremental OTA may need the exact base images and the extractor's `-old` option. If the correct image or a supported recovery path is unavailable, stop instead of using another build.

**Step 2: Patch with Magisk**

Transfer the verified image to the phone. On the **same device**, install the [official Magisk APK](https://github.com/topjohnwu/Magisk/releases), then select **Install > Patch firmware / image > Select from storage** and patch the image. Never flash an image patched on another device. Note the actual output filename.

**Step 3: Flash the patched image**

Replace the example filename below with the actual output. Check the active slot on A/B devices and follow the exact model's instructions for the intended slot. Do not flash both slots or change slots blindly.

```bash
adb pull /sdcard/Download/magisk_patched-EXAMPLE.img .
adb reboot bootloader
fastboot devices
```

On standard A/B devices, unsuffixed `fastboot flash` commands for a slotted partition target the current active slot by default ([AOSP](https://source.android.com/docs/core/ota/ab/ab_implement#kernel-slot-arguments)); `fastboot getvar current-slot` reports the slot selected for the next boot. Use these examples only if that is the intended slot and the image matches its firmware. For a different slot, follow the exact-device procedure instead.

Run **only one** command matching the verified original image and target partition:

If you patched the verified `boot.img`:

```bash
fastboot flash boot magisk_patched-EXAMPLE.img
```

If you patched the verified `init_boot.img`:

```bash
fastboot flash init_boot magisk_patched-EXAMPLE.img
```

For `vendor_boot` or recovery, follow the [Magisk guide](./magisk-guide.md#step-3-flash-patched-image) and the exact-device instructions instead. A recovery-based installation requires its recovery boot sequence to enable Magisk. For the `boot` or `init_boot` examples above, reboot with `fastboot reboot` and complete any Magisk setup prompt.

**Step 4: Verify root**

Check that Magisk reports installed. Grant a trusted app root in **Superuser** before testing, or grant **ADB shell** before running `adb shell su -c id`. Revoke the shell grant when it is not needed.

---

## Post-Root Setup

### Configure Magisk

Grant root only to trusted apps in **Superuser**. Enable Zygisk only when a trusted module needs it. Enforced DenyList reverts Magisk modifications in selected processes; it does not guarantee banking or payment app compatibility. The old **Hide the Magisk app** rename option is no longer present in current releases. See [Magisk configuration](./magisk-guide.md#post-installation-setup) and [Play Integrity guidance](../troubleshooting.md#play-integrity-and-banking-apps).

KernelSU is an alternative only if the exact device and kernel are supported. See the [KernelSU guide](./kernelsu-guide.md) before switching; do not install it over Magisk.

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

Install only modules needed for your setup, and verify their device and Android compatibility. See the [app and module catalog](../apps-and-modules/) and [Play Integrity guidance](../troubleshooting.md#play-integrity-and-banking-apps). No module guarantees that a banking or payment app will work.

---

## OTA Handling

### For supported A/B devices {#for-a-b-devices-all-nothing-phones}

[Magisk's A/B OTA workflow](https://topjohnwu.github.io/Magisk/ota.html) was tested on Pixel and other devices can differ. Use this order only if the exact Nothing/CMF device and update method support it:

1. If the OTA requires stock images, choose **Uninstall > Restore Images** in Magisk before applying it. Do not reboot. If a required backup is unavailable, stop and use a verified exact-device update or recovery plan.
2. Apply the system OTA and wait for installation to finish. **Do not restart yet.** Modified read-only partitions can cause verification to fail.
3. In Magisk choose **Install > Install to Inactive Slot (After OTA)** and wait for completion.
4. Return to the system update screen and select **Restart now**. Verify root after boot.

If the option is unavailable or the update fails, follow the device-specific stock update instructions and patch an image from the new build if desired. Root preservation is not guaranteed.

---

## Troubleshooting

<details><summary> Tap to expand common issues and fixes</summary>

### Bootloader Issues

**OEM Unlocking Greyed Out**

Check the exact model and unlock eligibility. A factory reset or waiting period is not a guaranteed fix; do not flash if unlocking is unavailable.

**Fastboot Not Detecting**

Solutions:
- Update Platform Tools
- Try USB 2.0 port
- Different cable
- Reinstall drivers

### Installation Issues

**Magisk Shows N/A**

Verify the exact firmware, selected image, target partition and slot against the device-specific instructions. If the device needs Magisk in recovery, use its required boot sequence. Do not select an image solely from Android version or reflash blindly.

**Bootloop After Root**

If only the Magisk image was changed, restore the matching stock image to every affected partition and slot using the exact-device recovery procedure. Restoring `boot` alone does not fix a mistaken write to `init_boot` or another partition. If other partitions were changed or the slot/build is uncertain, use a verified full-firmware recovery method for that model or contact [Nothing Support](https://nothing.tech/support). Recovery can erase data; do not change slots blindly.

### Glyph Interface Issues

**Glyph Not Working After Root**

Check Glyph-related modules and the ROM maintainer's support for the exact model. If a stock restore is necessary, use the [device-specific recovery guidance](#flash-stock-firmware); a full restore may erase data.

</details>

---

## Unroot and Restore

### Remove Root

If Android boots and the required stock backups exist, use **Uninstall > Complete Uninstall** in Magisk. **Restore Images** is an OTA preparation step, not a complete uninstall. Other modifications or affected slots may still need stock recovery; the bootloader remains unlocked.

### Flash Stock Firmware

Obtain the complete compatible firmware and recovery procedure for the exact model, region and build. The community [Nothing Archive](https://github.com/spike0en/nothing_archive) indexes device-specific packages and guides; an OTA or a pair of `boot` images is not necessarily a complete stock restore. A full restore may wipe data. If the correct method is unclear, contact [Nothing Support](https://nothing.tech/support) rather than flashing every image blindly.

### Relock Bootloader

::: danger RELOCK WARNING
Relocking a modified or incompatible device can make it unbootable and may erase data. Only consider it after restoring compatible stock firmware and verified-boot state for every required partition and slot, successfully booting, and confirming a manufacturer or exact-model procedure. Do not assume the same lock command applies to every model.
:::

---

## Custom ROMs

### Available ROMs

**LineageOS:**
- Official builds for Nothing Phone (1) and (2)
- Available for Phone (3a) series (unofficial)

**crDroid:**
- Available for Phone (3a) series
- Based on LineageOS 23

**/e/OS:**
- Privacy-focused option
- Available for Phone (2)

**OrangeFox Recovery:**
- Available for Phone (2), (3), and (3a) series
- Alternative to TWRP

**Note:** Glyph Interface support varies by ROM! Most custom ROMs have limited or no Glyph support.

---

## Device-Specific Notes

### Nothing Phone (3) Series

**Nothing Phone (3):**
- Released July 2025
- Snapdragon 8s Gen 4
- Android 15/16
- Monochrome LED display (489 LEDs)
- IP68 water resistance
- 5 major Android upgrades promised

**Nothing Phone (3a/3a Pro):**
- Released March 2025
- Snapdragon 7s Gen 3
- Android 15/16
- 3 major Android upgrades promised
- IP64 water resistance
- Device codenames: `Asteroids` and `AsteroidsPro` (the firmware archive groups them under `Asteroids`)

### CMF Phone (2) Pro
- Released April 2025
- Dimensity 7300 Pro chipset
- No Glyph Interface (CMF brand)

---

## Best Practices

### Security

1. **Grant root only to trusted apps**
2. **Use DenyList where appropriate**, without assuming it bypasses app checks
3. **Install only trusted modules**
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

- **Root setup:** **[Post-root configuration](./index.md#step-4-post-root-configuration)**
- **Tools:** **[Apps and modules](../apps-and-modules/)**
- **Common tasks:** **[Debloating](../general-guides/android-apps-debloating.md)** · **[Ad blocking](../general-guides/android-adblocking.md)**
- **Optional extensions:** **[LSPosed](./lsposed-guide.md)** · **[Custom ROM installation](./custom-rom-installation.md)**

> Before switching to a custom ROM, verify Glyph support for your exact device and ROM.
