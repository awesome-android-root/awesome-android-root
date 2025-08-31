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

# Complete APatch Root Guide

Kernel-based, systemless root for modern Android. APatch integrates at the kernel layer, offering powerful root with minimal system partition changes and an evolving module ecosystem.

## 🔗 Essential Resources
- [📖 Main Rooting Guide](./index.md) — Universal concepts and prep
- [🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md) — Required prerequisite
- [🛠️ Custom Recovery](./how-to-install-custom-recovery.md) — Optional/alternative flows
- [❓ FAQ & Troubleshooting](../faqs.md) — Common fixes

## What is APatch?

APatch is a kernel-based rooting solution for Android 10+ that patches your boot or init_boot image to add an in-kernel superuser (su) implementation and systemless features.

### Core advantages
- Kernel-level integration — root originates in the kernel, not via init hijack
- Systemless by design — no need to remount or modify /system
- Plays well with AVB — no need to disable verity or verification
- OTA-friendly workflow — with correct slot handling and image matching
- Evolving module ecosystem — designed for modern Android releases

### APatch vs other root solutions

| Feature | APatch | Magisk | KernelSU |
|---|---|---|---|
| Integration layer | Kernel-based | Init/ramdisk + userspace | Kernel-based |
| Android support | 10+ | 5.0+ | 11+ (varies) |
| Modules | APatch modules (growing) | Mature Magisk modules + Zygisk | KSU modules (growing) |
| Zygisk/Xposed | Not Magisk Zygisk; use compatible alternatives (app-level or APatch modules) | Zygisk + LSPosed widely used | No Zygisk; KSU-compatible alternatives |
| OTA retention | Manual (patch inactive slot) | Built-in “Install to Inactive Slot” | Manual (patch inactive slot) |
| Setup complexity | Moderate | Beginner | Moderate–Advanced |

Notes:
- Do not install APatch and Magisk/KernelSU simultaneously. Choose one.
- Many Magisk modules (especially Zygisk-based) are not compatible with APatch. Use APatch- or KSU-compatible modules.

## ✅ Prerequisites & Compatibility

### Essential requirements
- [Unlocked bootloader](./how-to-unlock-bootloader.md) (mandatory)
- Android 10 or newer
- Compatible device/kernel (check APatch repo for notes and issues)
- Platform Tools (ADB/Fastboot): https://developer.android.com/studio/releases/platform-tools
- Matching stock firmware for your exact build (to extract boot/init_boot)

### Critical safety checks
::: danger ⚠️ ESSENTIAL WARNINGS
- Unlocking wipes all data (including internal storage and eSIM).
- Rooting can void warranty and may impact device security/DRM.
- Flashing the wrong image will bootloop or brick your device.
- OTAs require extra steps to preserve root.
- Samsung support is limited/experimental; follow device-specific documentation (Odin required, fastboot is not available).
:::

### Preparation
1) Verify device/build
- Settings → About phone → note model and build.
- Confirm boot or init_boot partition usage (see below).
- Review APatch GitHub issues for your device/SoC.

2) Download required files
- APatch app (official releases): https://github.com/bmax121/APatch/releases
- Your exact firmware/OTA:
  - Pixels: Factory image ZIP (google factory images)
  - OnePlus/OPPO/realme: Full OTA (payload.bin)
  - Xiaomi/Redmi/POCO: Fastboot ROM (tgz) or full OTA (payload.bin)
  - Samsung: Full firmware (AP.tar, BL.tar, etc.) via Frija/SamFirm (support varies)
- Platform Tools (ADB/Fastboot)

3) Enable developer options
- Settings → About phone → tap Build number 7×
- In Developer options: enable OEM unlocking and USB debugging.
- Charge to 50%+ and back up your data.

## Step-by-Step: Root with APatch

### Step 1: Unlock the bootloader
- Enter fastboot: adb reboot bootloader (or key combo)
- Verify: fastboot devices
- Unlock (data wipe):
  - Most devices: fastboot flashing unlock
  - Some older/alt: fastboot oem unlock
  - Xiaomi: requires account binding + waiting period
  - Samsung: uses Download Mode/Odin (no fastboot), follow OEM guide
- Reboot, set up Android again, re-enable USB debugging.

### Step 2: Get the correct image (boot or init_boot)
You need the stock image that matches your current build.

- Which one to patch?
  - If your device has ramdisk in boot → patch boot.img
  - If not (e.g., many Android 13+ devices and Pixels 7/8) → patch init_boot.img
  - Quick check:
    - Presence of a dedicated init_boot partition often means you should patch init_boot.
    - APatch app typically indicates which image to use.

- How to extract:
  - payload.bin (OnePlus/OPPO/realme, many Xiaomi):
    - Use payload-dumper-go or Neo-Payload-Dumper to extract boot.img and/or init_boot.img.
  - Pixel factory images:
    - Extract image-*.zip → boot.img and (for some devices) init_boot.img are included.
  - Xiaomi fastboot ROM:
    - Extract tgz → find boot.img and (if present) init_boot.img in images/ directory.
  - Samsung:
    - Firmware is in AP.tar; extract boot.img(lz4) and possibly init_boot.img(lz4), then decompress with lz4.
    - APatch support is limited on Samsung; use device-specific guides.

Copy the needed image to your phone:
```bash
adb push boot_or_init_boot.img /sdcard/Download/
```

### Step 3: Patch the image with APatch
1) Install the APatch APK on your device.
2) Open APatch → Patch Image / Install → select boot_or_init_boot.img.
3) Wait for patching; output will be something like:
   - /sdcard/Download/apatch_patched-XXXX.img
4) Pull the patched image to your computer:
```bash
adb pull /sdcard/Download/apatch_patched-*.img ./
```

If patching fails:
- Ensure the image matches your exact build and partition (boot vs init_boot).
- Some kernels may need specific configs; consult APatch issues/README for your device.

### Step 4: First boot safely, then flash
Best practice is to test-boot the patched image first (if your device supports fastboot boot).

```bash
adb reboot bootloader
# Optional: see active slot
fastboot getvar current-slot

# Test boot (temporary, no flashing):
fastboot boot apatch_patched-*.img
```

If the system boots:
- Open APatch app → complete setup → verify root.
- Then perform a permanent install:
  - Either use APatch’s in-app direct install (if supported)
  - Or flash the correct partition for your device and active slot:

```bash
# If you patched boot:
fastboot flash boot apatch_patched-*.img
# If you patched init_boot:
fastboot flash init_boot apatch_patched-*.img

fastboot reboot
```

Notes
- Do not disable AVB or flash vbmeta with --disable-verity/verification for APatch; it’s unnecessary and risky.
- A/B devices: normally flash only the active slot’s partition. You will handle OTAs by patching the inactive slot later.

If fastboot boot is not supported:
- Flash directly (as above), ensuring you target the correct partition and slot.

Samsung
- Use Odin to flash a repacked AP.tar containing the patched image (advanced and device-specific). APatch support is limited; follow Samsung-specific documentation.

### Step 5: Set up APatch and verify root
- Open APatch → complete initialization, configure superuser prompts.
- Verify:
```bash
adb shell su -c id
# Expect uid=0(root) gid=0(root) ...
```
- Optionally install a root checker app.
- Explore APatch-compatible modules (see module section below).

🎉 You’re rooted with APatch.

## Post-Rooting Tips

- **[⚡ Explore our collection of 300+ Root Apps & MOdules](../../README.md#root-apps)**

- Root hiding/Play Integrity:
  - Configure per-app deny/allow in APatch manager.
  - Use only APatch/KSU-compatible integrity modules; Magisk Zygisk modules will not work as-is.
  - Passing Play Integrity is an arms race; results vary by region/app/version.

- Modules:
  - Prefer modules explicitly labeled as APatch- or KernelSU-compatible.
  - Typical needs: systemless hosts (ad-block), busybox, init tweaks, overlay mounts.

- Updates/OTAs (A/B devices):
  - Install OTA in Settings (it installs to the inactive slot but don’t reboot yet).
  - Extract the new build’s boot/init_boot from the OTA payload.
  - Patch with APatch on-device or off-device.
  - Flash to the inactive slot explicitly:
    - Example if inactive slot is b: fastboot flash boot_b apatch_patched-*.img (or init_boot_b)
  - Reboot to finish OTA with root preserved.
  - If you already rebooted and lost root, just patch the new image and flash the active slot again.

- Unroot:
  - Flash stock boot/init_boot for your current build:
    - fastboot flash boot stock_boot.img
    - or fastboot flash init_boot stock_init_boot.img
  - Optionally re-lock bootloader (only when fully stock):
    - fastboot flashing lock

## Device-specific notes

- Pixels:
  - Pixel 7/8/9 (Android 13+): patch init_boot.img.
  - Older Pixels: patch boot.img (unless your device/build explicitly uses init_boot).
- OnePlus/OPPO/realme (ColorOS/OxygenOS 12+):
  - Often use init_boot; confirm by checking partitions or APatch guidance.
  - Full OTAs ship as payload.bin.
- Xiaomi/Redmi/POCO:
  - Many Android 13+ builds use init_boot; otherwise boot.
  - Anti-rollback (ARB) applies to Xiaomi; never downgrade firmware across ARB boundaries.
- Samsung:
  - Uses Odin (AP/BL/CP/CSC). Fastboot is not available.
  - Image handling involves AP.tar and lz4; support varies and may be experimental for APatch.

## Troubleshooting

- Bootloop or no boot:
  - Flash back the stock image for the partition you modified (boot/init_boot on the correct slot).
  - Ensure the patched image matches your exact build number and partition type.

- APatch app crashes or fails to patch:
  - Update to the latest APatch APK.
  - Clear app data and retry.
  - Verify kernel compatibility for your device/SoC and Android version.

- Fastboot can’t see device:
  - Use latest platform-tools, try a different USB port/cable.
  - Windows: install Google USB driver; Linux: set up udev rules.

- Lost root after OTA:
  - Extract the new boot/init_boot, patch, flash to the active slot.
  - For next OTA, follow the “patch inactive slot before reboot” method.

- SafetyNet/Play Integrity fails:
  - Use APatch/KSU-compatible integrity modules and configure per-app hiding.
  - Do not expect guaranteed success; policies change frequently.

- Stuck in fastboot/recovery:
  - fastboot reboot, or long-press Power to force reboot.
  - As a last resort, flash full stock firmware for your device.

## Quick reference commands

```bash
# Check connection
adb devices
fastboot devices

# Enter fastboot
adb reboot bootloader

# Active slot
fastboot getvar current-slot

# Test-boot patched image (if supported)
fastboot boot apatch_patched-*.img

# Flash permanently (choose correct partition)
fastboot flash boot apatch_patched-*.img
fastboot flash init_boot apatch_patched-*.img

# Slot-specific flash if preserving OTA
fastboot flash boot_b apatch_patched-*.img
fastboot flash init_boot_b apatch_patched-*.img

# Reboot
fastboot reboot
```

## Resources
- **Official APatch Website:** https://apatch.dev/
- **Ofiicial APatch Github:** https://github.com/bmax121/APatch
- **Official APatch instalation Guide:** https://apatch.dev/install.html
- **Official APatch Telegram:** https://t.me/APatchChannel

::: tip 💡 Best practices for APatch
- Always patch the correct partition: boot vs init_boot.
- Prefer fastboot boot for a safe first run when supported.
- Keep a clean copy of stock boot/init_boot for your current build.
- Don’t disable AVB; APatch works with verified boot.
- Don’t mix APatch with Magisk or KernelSU on the same build.
- Read device-specific threads (XDA/GitHub) before major OTAs or Android version jumps.
:::

---
Need help? Check the [FAQ](./../faqs.md), and when asking for support include device model, region, exact build number, which partition you patched, and logs/screenshots from APatch.