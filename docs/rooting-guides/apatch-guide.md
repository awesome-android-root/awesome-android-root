---
layout: doc
title: Complete APatch Root Guide
description: "Master APatch rooting with a practical guide: compatibility checks, safe install flow, OTA survival, and recovery steps."
head:
  - - meta
    - property: og:title
      content: Complete APatch Root Guide - Modern Kernel-Based Android Rooting
  - - meta
    - property: og:description
      content: Install APatch using the correct boot image, with compatibility checks, OTA handling, module basics, and troubleshooting.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/apatch-guide.png
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: Complete APatch Root Guide
  - - meta
    - name: twitter:description
      content: "Updated APatch setup for modern Android devices: compatibility, install, OTA, and recovery."
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/apatch-guide.png
  - - meta
    - name: twitter:image:alt
      content: APatch Installation Guide - Modern Kernel-Based Android Rooting
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

APatch is a kernel-based root solution for modern Android devices. This guide covers compatibility checks, patching, installation and recovery.

> [!CAUTION]
> APatch patches the kernel in **`boot.img`**. Do not patch or flash `init_boot` or another partition for an APatch installation, even if your device has a separate `init_boot`. See the [official installation instructions](https://github.com/AndroidPatch/APatchDocs/blob/main/docs/install.md#preparations). If you already flashed a different partition by mistake, see [Uninstallation](#uninstallation) for recovery guidance.

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

APatch patches the kernel in `boot.img` and provides kernel-level root access with systemless-style behavior.

### Core Characteristics

- **Kernel-space root model** - root control comes from kernel-side components
- **System partition remains untouched** - no `/system` remount required
- **Separate ramdisk support** - still patches `boot.img` when a device also has an `init_boot` partition
- **Module support** - APModule ecosystem plus partial cross-compatibility with some other module styles

### APatch vs Other Root Solutions

| Feature | APatch | Magisk | KernelSU |
|---------|--------|--------|----------|
| Architecture | Kernel-based | Userspace root stack | Kernel-based |
| Typical setup | Patch + flash `boot.img` | Patch + flash image | Kernel-dependent install methods |
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
- **Kernel configuration:** `CONFIG_KALLSYMS=y`; see [upstream requirements](https://github.com/AndroidPatch/APatchDocs/blob/main/docs/install.md#install-requirements) for `CONFIG_KALLSYMS_ALL` and device limitations
- **Kernel 6.6:** upstream says it has only been tested on Xiaomi and OnePlus devices; other brands need additional verification
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
- Latest APatch manager from [GitHub Releases](https://github.com/bmax121/APatch/releases/latest)
- File manager
- 500MB+ free storage

---

## Boot vs Init Boot: What to Patch

Flashing the wrong target can prevent the device from booting.

### `boot.img`

- Contains the kernel that APatch patches, including on devices with a separate `init_boot` partition.
- Use the stock image from the exact firmware build and keep an unmodified backup outside the phone.

### `init_boot.img`

- On devices that use it, this partition contains the generic ramdisk, not the kernel APatch patches.
- Another root method may use it, but it is not an APatch patching or flashing target.

### How to Identify Correct Target

1. Identify the exact model, region and firmware build in your device settings. `adb shell getprop ro.build.fingerprint` can help identify the running build.
2. Obtain the stock `boot.img` from matching firmware. Do not use an image already patched by another root manager.
3. Check your device-specific instructions for the supported flashing method and, if applicable, the correct slot. The presence of `init_boot` does not change APatch's target.

::: tip SAFETY RULE
Patch a copy of the stock **`boot.img`** for the build you intend to boot, and keep the original available for recovery.
:::

---

## Installation Steps

## Step 1: Extract the Correct Stock Image

Extract the stock `boot.img` from your exact current firmware build and keep an unmodified copy for recovery.

### Pixel

1. Download factory image from [Google Factory Images](https://developers.google.com/android/images)
2. Extract outer archive
3. Extract inner `image-*.zip`
4. Extract `boot.img`

### OnePlus/OPPO/Realme (payload OTA)

1. Download full OTA package
2. Extract `payload.bin`
3. Use a payload dumper to extract `boot.img`

### Xiaomi/Redmi/POCO

1. Download full fastboot ROM
2. Extract archive
3. Extract `boot.img` from the `images/` directory

### Samsung

Samsung often uses Odin and compressed images (`*.lz4`), not the generic fastboot workflow below. APatch lists support for Samsung devices with security protection as planned; check current upstream and model-specific support before proceeding.

## Step 2: Patch the Image in APatch

```bash
adb push boot.img /sdcard/Download/
```

In APatch manager:
1. Open APatch and choose the option to patch a boot image
2. Select the matching stock `boot.img`
3. Set a strong SuperKey according to the manager's rules; keep it private
4. Wait for patch completion and note the exact output path shown by the manager

The patched output is saved to device storage. Preserve the original stock `boot.img` separately.

## Step 3: Test Boot First (When Supported)

Use this only if your device supports `fastboot boot` for its boot image. In this and the following examples, `apatch_patched.img` is a placeholder: replace it with the exact filename and path reported by APatch.

```bash
adb pull /sdcard/Download/apatch_patched.img ./
adb reboot bootloader
fastboot devices
fastboot boot apatch_patched.img
```

This boots the image temporarily without flashing it. Check APatch in the manager before deciding whether to flash. If the test fails, investigate rather than flashing it. If your device does not support test boot, check its documented installation and recovery options before deciding whether to proceed.

## Step 4: Flash Permanently

The example below is only for devices whose documented APatch installation uses fastboot. Confirm the device, build, bootloader state and target slot first. Use the patched file from the previous step, not an image made for another device or build.

```bash
adb reboot bootloader
fastboot devices
fastboot flash boot apatch_patched.img
fastboot reboot
```

### A/B Slot Awareness

On devices that support it, check the active slot:

```bash
fastboot getvar current-slot
```

Use the result alongside your device's instructions to identify the correct `boot` slot and matching image. If explicit `boot_a` or `boot_b` targeting is required, follow the documented procedure for that device. Do not flash both slots or switch slots blindly; Samsung and some other devices use different tools.

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

1. Try [APatch's module rescue procedure](https://github.com/AndroidPatch/APatchDocs/blob/main/docs/rescue-bootloop.md) to disable modules.
2. If that does not work, follow your device's recovery instructions to restore the matching stock `boot.img` to the affected slot. See [Uninstallation](#uninstallation) if a different partition was also flashed.
3. Once the device is working, use the documented recovery or manager procedure to remove the problematic module. Restoring stock boot also removes active APatch root, so the manager may not be able to remove it until root is restored safely.

---

## OTA Handling

An OTA may replace APatch's boot image. Follow your device's update instructions and keep matching stock images and a recovery plan. Some updates require the original stock `boot.img` to be restored before installation.

### A/B Devices

1. Back up your data and check the update and slot procedure for your device. Restore the current build's stock boot image first if the updater requires it.
2. Install the OTA using the device's documented process and boot the updated build.
3. Extract the updated build's stock `boot.img`, patch it with APatch, and use the documented method to flash the correct boot slot.
4. Reboot and verify root; keep the updated stock boot image for recovery.

APatch also documents an [inactive-slot post-OTA option](https://github.com/AndroidPatch/APatchDocs/blob/main/docs/update.md#ota-update-with-apatch-retention), but upstream warns that it can be unstable. Use it only when the device-specific procedure and recovery options are understood.

### Non-A/B Devices

1. Follow the device's update instructions, restoring the current stock boot image first if required.
2. After booting the updated build, extract its stock `boot.img`, patch it and flash the boot partition using the device's documented method.

::: tip OTA RULE
Patch the stock **`boot.img` for the build on the slot you intend to boot**, not an image from an older or different build. Never use `init_boot` as the APatch target.
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
- Follow the module stack in
  [Play Integrity and Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps)

---

## Uninstallation

To remove a normal APatch installation, restore the unmodified `boot.img` matching the firmware on the affected boot slot. This removes the active APatch boot modification, but other files or settings may remain. If more than one slot was modified, each needs the stock image matching its own firmware and the device-specific recovery procedure. The following example applies only when your device's documented recovery method uses fastboot. Verify the target slot first and replace `stock_boot.img` with the matching stock image:

```bash
adb reboot bootloader
fastboot flash boot stock_boot.img
fastboot reboot
```

If Android cannot boot, use your device's documented hardware-key or recovery procedure instead of `adb reboot bootloader`.

> [!WARNING]
> If an APatch-patched image was previously flashed to `init_boot` or another partition by mistake, restoring `boot` alone will not repair that partition. Follow the manufacturer or device-specific recovery procedure to restore the correct **stock** image to every affected partition and slot, and seek help if unsure. Do not relock the bootloader until the complete firmware is restored and verified.

For a fully stock state, follow the manufacturer or device-specific instructions for restoring firmware. A working fastboot connection does not guarantee recovery.

---

## Device-Specific Notes

### Pixel

- For APatch, patch `boot.img` even on Pixel models with a separate `init_boot` partition.
- Use the factory image matching the exact device and installed build.

### OnePlus/OPPO/Realme

- Extract the matching `boot.img` from the appropriate firmware package; many OTAs use `payload.bin`.
- Unlocking and recovery procedures vary by model and region.

### Xiaomi/Redmi/POCO

- Patch `boot.img` for APatch, even if the device also has `init_boot`.
- Respect anti-rollback constraints. Some updates require the stock boot image first; see [upstream's update notes](https://github.com/AndroidPatch/APatchDocs/blob/main/docs/update.md#ota-update-with-apatch-retention).

### Samsung

- Many models use Odin rather than standard fastboot. Upstream lists support for Samsung devices with security protection as planned.
- Unlocking or flashing custom binaries can permanently trip Knox. Use only a verified model-specific method and recovery plan.

---

## Troubleshooting

<details><summary>👉 Click to expand details</summary><br>

### Bootloop After Flash

Common causes:
- An image flashed to the wrong partition
- Image from the wrong firmware build
- Wrong slot on A/B devices
- An incompatible kernel or module

For a normal APatch installation, restore the exact-build stock `boot.img` to the affected boot slot using your device's documented method; see [Uninstallation](#uninstallation). If another partition was written by mistake, that partition also needs the appropriate stock image and device-specific recovery procedure. Do not relock the bootloader while modified or mismatched images remain.

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

- Extract stock `boot.img` from the installed OTA build
- Repatch it and flash the documented boot partition and slot

</details>

---

## Next Steps

Start with only essential modules, and keep the stock image plus your exact build and slot notes for recovery. Browse the [root apps and modules collection](../apps-and-modules/), [ad-blocking guide](../general-guides/android-adblocking.md), and [debloating guide](../general-guides/android-apps-debloating.md) for common uses.

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
- Partition actually flashed (normally `boot`), including any accidental changes to other partitions
- Current slot (`a`/`b`) on A/B devices
- Exact error text and steps already tried
