---
layout: doc
title: Complete APatch Root Guide
description: "Master APatch rooting with a practical 2026 guide: compatibility checks, safe install flow, OTA survival, and recovery steps."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/rooting-guides/apatch-guide
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete APatch Root Guide - Modern Kernel-Based Android Rooting
  - - meta
    - property: og:description
      content: Install APatch safely with updated boot/init_boot guidance, OTA handling, module basics, and troubleshooting.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/rooting-guides/apatch-guide
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
      content: Updated APatch setup for modern Android devices: compatibility, install, OTA, and recovery.
  - - meta
    - name: keywords
      content: apatch guide 2026, android root apatch, kernel root, init_boot patch, boot image patch, a/b ota root
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
    - property: article:modified_time
      content: 2026-02-21T00:00:00Z
  - - meta
    - name: robots
      content: index, follow
---

# APatch Root Installation Guide

APatch is a kernel-based root solution for modern Android devices. This guide focuses on a safe, repeatable workflow: verify compatibility first, patch the correct image, test boot if possible, then flash permanently.

## Quick Navigation

- [What is APatch](#understanding-apatch)
- [Compatibility and Requirements](#compatibility-and-requirements)
- [Boot vs Init Boot](#boot-vs-init-boot-what-to-patch)
- [Installation Steps](#installation-steps)
- [Post-Install Security Setup](#post-installation-setup)
- [Modules](#managing-modules)
- [OTA Updates](#ota-handling)
- [Troubleshooting and Recovery](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Rooting overview and framework selection
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Required first step
- [Root Framework Comparison](./root-framework-comparison.md) - APatch vs Magisk vs KernelSU
- [General Troubleshooting](../troubleshooting.md)
- [FAQs](../faqs.md)

---

## Understanding APatch

APatch patches your boot chain image (`boot.img` or `init_boot.img`) and provides kernel-level root access with systemless-style behavior.

### Core Characteristics

- **Kernel-space root model** - root control comes from kernel-side components
- **System partition remains untouched** - no `/system` remount required
- **Modern Android friendly** - especially useful on recent devices using `init_boot`
- **Module support** - APModule ecosystem plus partial cross-compatibility with some other module styles

### APatch vs Other Root Solutions

| Feature | APatch | Magisk | KernelSU |
|---------|--------|--------|----------|
| Architecture | Kernel-based | Userspace root stack | Kernel-based |
| Typical setup | Patch + flash boot chain image | Patch + flash image | Kernel-dependent install methods |
| Module model | APModule (plus some compatibility) | Magisk modules | KSU modules |
| Zygisk-style workflow | Via community alternatives | Native | Via alternatives |
| OTA workflow | Repatch updated image | Built-in paths + manual recovery cases | Slot/image aware workflows |

> [!CAUTION]
> Do **not** run APatch together with Magisk or KernelSU on the same active slot. Use one root stack at a time.

---

## Compatibility and Requirements

### Officially Relevant Compatibility Signals

Based on APatch upstream docs and repository notes:

- **Architecture:** ARM64 only
- **Kernel range:** Linux kernel 3.18 to 6.12 (upstream stated range)
- **Practical Android target:** modern Android builds (Android 10+ is the common baseline in community usage)

### Must-Have Prerequisites

::: danger ESSENTIAL REQUIREMENTS
**Unlocked bootloader** - mandatory before any APatch install.

**Exact matching stock firmware** - image must match your current build fingerprint.

**Complete backup** - failed flashes can force full restore.

**Battery 50%+** - avoid interruptions during patch/flash.
:::

### Tools You Need

**Computer:**
- [Android Platform Tools](https://developer.android.com/tools/releases/platform-tools) (latest `adb`/`fastboot`)
- OEM USB drivers (Windows)
- Image extraction tools (for payload/Firmware archives)

**Device:**
- Latest APatch manager from [GitHub Releases](https://github.com/bmax121/APatch/releases/latest) or [F-Droid](https://f-droid.org/packages/me.bmax.apatch/)
- File manager
- 500MB+ free storage

---

## Boot vs Init Boot: What to Patch

Flashing the wrong target is a top cause of bootloops.

### `boot.img`

- Traditional boot partition
- Common on many older devices and many Android 12-and-below builds

### `init_boot.img`

- Newer boot chain layout used by many Android 13+ devices
- Common on Pixel 7/8/9 generation and many newer OEM builds

### How to Identify Correct Target

**Method 1 (recommended):** APatch app detection
1. Install/open APatch
2. Start install flow
3. Check which partition/image APatch expects

**Method 2:** inspect block names

```bash
adb shell ls -l /dev/block/by-name/ | grep -E "boot|init_boot"
```

Presence of `init_boot` often indicates modern split-ramdisk layout.

::: tip SAFETY RULE
Always patch the image extracted from the **same build currently running on your phone**.
:::

---

## Installation Steps

## Step 1: Extract the Correct Stock Image

You need `boot.img` or `init_boot.img` from your exact current firmware build.

### Pixel

1. Download factory image from [Google Factory Images](https://developers.google.com/android/images)
2. Extract outer archive
3. Extract inner `image-*.zip`
4. Grab `boot.img` or `init_boot.img`

### OnePlus/OPPO/Realme (payload OTA)

1. Download full OTA package
2. Extract `payload.bin`
3. Use payload dumper to extract images

### Xiaomi/Redmi/POCO

1. Download full fastboot ROM
2. Extract archive
3. Use image from the `images/` directory

### Samsung

Samsung often uses Odin pipelines and compressed images (`*.lz4`). APatch workflows are less straightforward and device-specific. Proceed only with a tested model-specific method.

## Step 2: Patch the Image in APatch

```bash
adb push boot.img /sdcard/Download/
# or
adb push init_boot.img /sdcard/Download/
```

In APatch manager:
1. Open APatch
2. Tap install/patch image
3. Select your stock `boot.img` or `init_boot.img`
4. Wait for patch completion

Patched output is saved to storage (usually Download folder).

## Step 3: Test Boot First (When Supported)

```bash
adb pull /sdcard/Download/apatch_patched*.img ./
adb reboot bootloader
fastboot devices
fastboot boot apatch_patched_xxxxx.img
```

If temporary boot succeeds and root works, continue to permanent flash.

> [!WARNING]
> Some devices/bootloaders do not support `fastboot boot`. If unsupported, skip test boot and keep a stock image ready for immediate recovery.

## Step 4: Flash Permanently

```bash
adb reboot bootloader

# patch target is boot
fastboot flash boot apatch_patched_xxxxx.img

# or patch target is init_boot
fastboot flash init_boot apatch_patched_xxxxx.img

fastboot reboot
```

### A/B Slot Awareness

```bash
fastboot getvar current-slot
```

If needed, target explicit slot partitions:

```bash
fastboot flash boot_a apatch_patched_xxxxx.img
# or
fastboot flash init_boot_b apatch_patched_xxxxx.img
```

::: warning VERIFIED BOOT NOTE
Do not disable AVB as a default APatch setup step. APatch workflows are designed to operate without broadly disabling verification.
:::

## Step 5: Verify Root

1. Boot may take longer on first startup
2. Open APatch manager and confirm installed status
3. Validate shell root:

```bash
adb shell
su
id
```

Expected output includes `uid=0(root)`.

---

## Post-Installation Setup

### Recommended Security Baseline

In APatch settings:
- Default SU action: prompt
- Short prompt timeout (for accidental requests)
- Biometric or device authentication for approvals
- Enable root access logs

### Root Permission Hygiene

- Grant only to trusted apps
- Revoke old/unused grants regularly
- Check logs after new module installs

### Manager Hiding and Sensitive Apps

If your build supports manager hiding/repackaging, use it carefully and test critical apps one-by-one after changes.

---

## Managing Modules

### Module Reality Check

- APatch module support changes quickly
- Not every Magisk or KernelSU module is compatible
- Start with well-maintained modules with recent updates

### Safe Module Workflow

1. Install one module at a time
2. Reboot and test system stability
3. Keep a known-good boot image for rollback
4. Avoid stacking many behavior-changing modules at once

### If a Module Causes Boot Problems

1. Boot to bootloader
2. Flash stock `boot`/`init_boot` to recover
3. Boot system and remove problematic module
4. Repatch and reinstall only necessary modules

---

## OTA Handling

Root survival with APatch is image-based, so OTAs usually require repatching the updated boot chain image.

### A/B Devices

1. Download OTA
2. Extract updated `boot.img` or `init_boot.img` from that OTA
3. Patch new image with APatch
4. Flash patched image to the correct target slot/partition
5. Reboot and verify root

### Non-A/B Devices

1. Install update
2. Extract updated boot chain image for current build
3. Patch and flash again

::: tip OTA RULE
Always patch image from the **newly installed build**, not from an older firmware package.
:::

---

## Root Hiding and Play Integrity

Play Integrity behavior changes frequently server-side. There is no permanent bypass guarantee.

### Practical Expectations

- **Basic integrity:** sometimes passable with careful setup
- **Device/strong integrity:** commonly fails on unlocked/rooted devices
- Banking/payment app behavior varies by region, app version, and backend policy

### Safer Strategy

- Keep root access denied for sensitive apps
- Use minimum module set required for your use case
- Re-test after every OTA or major app update

---

## Uninstallation

Most reliable path: restore stock boot chain image.

```bash
adb reboot bootloader

fastboot flash boot stock_boot.img
# or
fastboot flash init_boot stock_init_boot.img

fastboot reboot
```

If you need fully clean state, flash full stock firmware for your device.

---

## Device-Specific Notes

### Pixel

- Pixel 7/8/9: commonly patch `init_boot`
- Pixel 6 and older: commonly patch `boot`

### OnePlus/OPPO/Realme

- Newer Android builds frequently use `init_boot`
- OTA extraction usually revolves around `payload.bin`

### Xiaomi/Redmi/POCO

- Newer HyperOS/MIUI builds may use `init_boot`
- Respect anti-rollback constraints when changing firmware

### Samsung

- Odin-based pipeline, no standard fastboot flashing on many models
- Knox trip is permanent once rooted/unlocked
- Use Samsung-specific methods only

---

## Troubleshooting

<details><summary>👉 Click to expand details</summary><br>

### Bootloop After Flash

Common causes:
- Wrong partition target (`boot` vs `init_boot`)
- Image from wrong firmware build
- Wrong slot on A/B devices

Recovery:

```bash
fastboot flash boot stock_boot.img
# or
fastboot flash init_boot stock_init_boot.img
fastboot reboot
```

### APatch Fails to Patch Image

- Update APatch manager to latest stable release
- Re-extract image from original firmware package
- Verify image is not corrupted/renamed incorrectly
- Ensure enough free storage on device

### `fastboot` Cannot Detect Device

- Update platform-tools
- Change cable/USB port
- Verify OEM unlock and bootloader mode
- Reinstall drivers on Windows

### Root Lost After OTA

- Extract updated image from installed OTA build
- Repatch and flash correct partition/slot

</details>

---

## Next Steps

1. Install only essential modules first
2. Keep stock images and notes for your exact build/slot
3. Explore practical root use cases:
   - [Android Ad Blocking](../general-guides/android-adblocking.md)
   - [Android Debloating](../general-guides/android-apps-debloating.md)
   - [Root Apps Collection](../apps-and-modules/)

---

## Community Resources

**Official:**
- [APatch Docs](https://apatch.dev/)
- [APatch GitHub](https://github.com/bmax121/APatch)
- [Latest Releases](https://github.com/bmax121/APatch/releases/latest)
- [Official Telegram Channel](https://t.me/APatchChannel)

**Project Help:**
- [Troubleshooting Guide](../troubleshooting.md)
- [FAQs](../faqs.md)

When requesting help, include:
- Device model and build number
- Android version
- APatch manager version
- Patched partition (`boot`/`init_boot`)
- Current slot (`a`/`b`) on A/B devices
- Exact error text and steps already tried
