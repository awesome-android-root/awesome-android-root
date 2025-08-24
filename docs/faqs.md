---
layout: doc
title: Android Rooting FAQ & Troubleshooting
description: "Complete Android rooting FAQ with step-by-step solutions and emergency fixes for beginners and experts. Updated for Android 14/15 in 2025."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/faqs
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Android Rooting FAQ & Troubleshooting Guide 2025 - Complete Solutions
  - - meta
    - property: og:description
      content: Complete Android rooting FAQ with emergency fixes, app compatibility tips, and troubleshooting guide for beginners and experts. Updated for 2025 with latest methods.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/faqs
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og.png
  - - meta
    - property: og:site_name
      content: Awesome Android Root
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Android Rooting FAQ & Troubleshooting Guide 2025
  - - meta
    - name: twitter:description
      content: Complete FAQ and troubleshooting solutions for Android rooting with emergency fixes and app compatibility tips.
  - - meta
    - name: keywords
      content: android rooting faq 2025, android 15 root, rooting troubleshooting guide, bootloop fix, magisk troubleshooting, kernelsu, apatch, play integrity, root detection, adb fastboot, bootloader unlock, emergency android recovery
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Rooting Support
  - - meta
    - property: article:tag
      content: Android Root FAQ
  - - meta
    - property: article:tag
      content: Rooting Troubleshooting
  - - meta
    - property: article:tag
      content: Emergency Recovery
  - - meta
    - property: article:tag
      content: App Compatibility
  - - meta
    - property: article:tag
      content: Play Integrity
  - - meta
    - property: article:published_time
      content: 2024-01-05T12:00:00Z
  - - meta
    - property: article:modified_time
      content: 2025-08-24T10:00:00Z
  - - meta
    - name: robots
      content: index, follow, max-image-preview:large
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "name": "Android Rooting FAQ & Troubleshooting Guide",
        "description": "Comprehensive FAQ and troubleshooting solutions for Android rooting.",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Android rooting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Rooting gives you administrator (superuser) access to your Android device, unlocking system-level customization and control."
            }
          },
          {
            "@type": "Question",
            "name": "Is rooting safe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Rooting is safe when you follow device-specific guides, use trusted tools, and keep backups. It can void warranty, may affect app compatibility, and carries some risk."
            }
          },
          {
            "@type": "Question",
            "name": "Why won't my device boot after rooting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Most bootloops are caused by incompatible modules, kernels, or mismatched images. Boot into recovery, disable modules, or flash the correct stock boot/init_boot image."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use banking or DRM apps on rooted devices?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Some apps check device integrity and may not run on rooted/unlocked devices. Passing basic checks is often possible with proper configuration, but strong hardware-backed checks typically cannot be bypassed on unlocked bootloaders."
            }
          },
          {
            "@type": "Question",
            "name": "Do I flash boot.img or init_boot.img?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Devices shipping with Android 13+ often use init_boot.img for ramdisk. Pixels 7/8/9 series require patching and flashing init_boot, not boot. Older devices commonly patch boot.img."
            }
          }
        ]
      }
---

# Android Rooting FAQ & Troubleshooting Guide 2025

Your complete Android rooting resource — emergency solutions, expert answers, and step-by-step fixes for common and advanced scenarios. Updated for Android 14/15, AVB/dynamic partitions, Play Integrity, and modern devices (Pixel 6–9, Galaxy S21–S24/S25, OnePlus 9–12, Xiaomi 12–14/Redmi/POCO, Nothing Phone 1/2/2a, etc.).

::: tip 🚨 Emergency Quick Navigation
Device won't boot? → [Emergency Bootloop Fix](#device-wont-boot) • Root not working? → [Root Access Issues](#root-not-working) • App blocked? → [Play Integrity & App Compatibility](#play-integrity-and-banking-apps) • Hard brick? → [Recovery Options](#bricked-device-recovery) • New to rooting? → [Complete Rooting Guide](./android-root-guides/index.md)
:::

## Table of Contents

### 🚨 Emergency Help (Start Here)
- [Device Won't Boot (Bootloop)](#device-wont-boot)
- [Root Not Working](#root-not-working)
- [Play Integrity & Banking Apps](#play-integrity-and-banking-apps)
- [Bricked Device Recovery](#bricked-device-recovery)

### 🔰 Beginner Guide
- [What is Rooting?](#what-is-rooting)
- [Is Rooting Safe?](#is-rooting-safe)
- [Which Root Method Should I Use?](#which-root-method-should-i-use)
- [Rooting Process Overview](#rooting-process-overview)

### 🔧 Technical Solutions
- [Root Methods Comparison](#root-methods-comparison)
- [Bootloader & Recovery](#bootloader-and-recovery)
- [Advanced Troubleshooting](#advanced-troubleshooting)
- [Device-Specific Notes](#device-specific-notes)

---

## Emergency Help

### Device Won't Boot

Symptoms: device stuck on boot logo, loops endlessly, or only boots to recovery/fastboot.

#### Immediate Quick Fixes (try first)

1. Disable Magisk modules (Magisk installed)
   - Try holding Volume Up during early boot to trigger module safe mode (works on many devices/Magisk builds).
   - If you can access recovery/adb:
     - ADB in recovery: `adb shell magisk --remove-modules`
     - Or delete module folders: `adb shell rm -rf /data/adb/modules/*` then reboot.

2. Boot to recovery/bootloader
   - Power + Volume combo varies:
     - Pixel: Power + Volume Down → select Recovery
     - Samsung: Power + Volume Up (+ Bixby on older models) while USB connected
     - Most others: Power + Volume Up (recovery), Power + Volume Down (bootloader)
   - Detailed instructions: [Custom Recovery Installation](./android-root-guides/how-to-install-custom-recovery.md)

3. Wipe Dalvik/ART cache
   - Custom recovery: Wipe → Advanced wipe → Dalvik/ART cache + Cache.
   - Stock recovery: If available, “Wipe cache partition.” (Some devices removed this option.)

4. Undo the last change
   - Remove the last module/kernel/ROM you flashed.
   - Restore the last NANDroid backup if available.

#### Advanced Recovery Steps

1. Restore a full backup (custom recovery)
   - TWRP/OrangeFox → Restore → System + Boot + Data → Reboot.

2. Flash the correct stock image for your partition scheme
   - For devices shipping with Android 13+ (e.g., Pixel 7/8/9, some Samsung/OnePlus/Xiaomi GKI2):
     - Patch/flash init_boot.img (not boot.img).
   - For older devices:
     - Patch/flash boot.img.
   - Commands (A/B example):
     ```bash
     # Bootloader/fastboot mode
     fastboot devices
     # Flash patched image to both slots if needed
     fastboot flash init_boot_a magisk_patched.img
     fastboot flash init_boot_b magisk_patched.img
     fastboot reboot
     ```
   - If returning to stock:
     ```bash
     fastboot flash init_boot stock_init_boot.img   # or boot.img for older devices
     fastboot reboot
     ```

3. Flash full stock firmware
   - Pixel: Use Android Flash Tool (web) or factory image scripts.
   - Samsung: Odin with full firmware (AP/BL/CP/CSC). Use HOME_CSC to preserve data (if possible). KNOX remains tripped once bootloader is unlocked.
   - Xiaomi/POCO/Redmi: Mi Flash Tool with fastboot ROM (mind Anti-Rollback).
   - OnePlus: MSMDownloadTool/OP Local Update or fastboot packages (availability varies by model/region).
   - Device-specific guides: [Pixel](./android-root-guides/how-to-root-pixel-phone.md) • [Samsung](./android-root-guides/how-to-root-samsung-phone.md) • [Xiaomi](./android-root-guides/how-to-root-xiaomi-phone.md) • [OnePlus](./android-root-guides/how-to-root-oneplus-phone.md)

4. Factory reset (last resort)
   - Stock recovery: Wipe data/factory reset.
   - Fastboot: `fastboot -w` then `fastboot reboot`.
   - Warning: erases all user data.

#### 📱 Emergency Commands Reference

```bash
# Reboot to different modes
adb reboot bootloader
adb reboot recovery
fastboot reboot fastboot   # userspace fastboot (fastbootd) for dynamic partitions

# Boot a recovery image without flashing
fastboot boot recovery.img

# Disable all Magisk modules (from recovery/adb)
adb shell magisk --remove-modules

# Flash original images (choose boot or init_boot as appropriate)
fastboot flash boot stock_boot.img
fastboot flash init_boot stock_init_boot.img

# Switch active slot (A/B devices)
fastboot getvar current-slot
fastboot set-active a    # or b

# Full wipe (last resort)
fastboot -w
```

Pro tips:
- Always keep a copy of stock boot/init_boot images and your last patched image.
- On A/B devices, prefer Magisk’s “Install to Inactive Slot (After OTA)” to keep OTA survival.
- Don’t mix images from different builds. Build fingerprint must match.

---

### Root Not Working

Symptoms: apps report “no root,” superuser prompts don’t appear, or the manager shows N/A.

#### Basic Verification

- Root manager status
  - Magisk: App opens, shows App and Magisk versions. “Installed” should display. If N/A, installation failed.
  - KernelSU: App shows kernel supported/enabled. If unsupported, flash a KSU-enabled kernel.
- Check with a simple root app (e.g., Termux + `su`, or a reputable root checker).
- Confirm you didn’t restore an OTA without re-installing root to the current slot.

#### Fixes by Method

Magisk:
1. Reinstall app and re-install to current slot
   - Install latest Magisk APK (from official GitHub).
   - Open → Install → Direct Install (or “Install to Inactive Slot (After OTA)” if applicable).
   - Reboot.
2. Ensure correct target image
   - Android 13+ devices often require patching init_boot.img (not boot.img).
   - Extract from your exact firmware build (use payload-dumper-go for payload.bin, or extract AP tar on Samsung).
3. Zygisk and DenyList
   - Settings → Enable Zygisk (if you need module/hide features that depend on it).
   - Configure DenyList for apps that mustn’t see root.
   - Reboot after changes.
4. Module conflicts
   - Disable all modules (see Emergency) and re-enable one by one.

KernelSU:
- Confirm your kernel has KSU integrated for your exact build.
- Use the official KernelSU Manager.
- If switching kernels, match your ROM/firmware version and vendor partition.

APatch:
- Ensure device/kernel is supported (ARM64 only, specific kernel ranges).
- Follow the project’s official documentation for your exact device/ROM.

#### Clean Re-install (Magisk)

Method A: Patch and flash
```bash
# 1) Extract the correct image from your current firmware (boot.img or init_boot.img)
# 2) Patch with Magisk (on-device)
# 3) Flash with fastboot to both slots if A/B
fastboot flash init_boot_a magisk_patched.img
fastboot flash init_boot_b magisk_patched.img
fastboot reboot
```

Method B: Recovery flash (legacy devices with custom recovery)
- Boot to TWRP/OrangeFox.
- Flash the Magisk ZIP/APK (if supported).
- Reboot; install Magisk app if needed.

---

### Play Integrity and Banking Apps

Many apps now use Google Play Integrity (replacing SafetyNet). There are multiple levels:
- BASIC: Device appears unmodified at a basic level.
- DEVICE: Device passes device-level integrity.
- STRONG: Hardware-backed. Typically fails on unlocked bootloaders.

Important:
- We don’t provide instructions to bypass security requirements of protected apps. This section focuses on legitimate compatibility best practices.

Best practices to improve compatibility:
- Keep firmware and Play Services up to date.
- Use Magisk’s DenyList to limit root visibility to sensitive apps.
- Avoid granting root to unnecessary apps.
- Clear data for Google Play Store and Play Services after major changes; reboot:
  - Settings → Apps → Google Play Services → Storage → Clear cache/data.
  - Settings → Apps → Google Play Store → Storage → Clear cache/data.
  - Reboot; check Play Store “Device is certified.”
- Some apps will not run on unlocked bootloaders regardless of configuration (they require STRONG integrity). Consider:
  - A secondary unmodified device for critical apps.
  - Work profile separation (e.g., Shelter) without attempting to circumvent security.

Testing tools:
- Play Integrity API Checker (from reputable sources).
- YASNAC is legacy (SafetyNet) and no longer authoritative; prefer Play Integrity testers.

---

### Bricked Device Recovery

Determine brick type:

- Soft brick (recoverable): can reach fastboot/download/recovery; device shows signs of life. High recovery chance.
- Hard brick: no response, no LEDs, not detected by PC. Recovery depends on SoC and tools; professional help may be required.

#### Soft Brick

1. Enter recovery/bootloader (try all key combos; see Emergency).
2. Flash exact stock firmware for your model/region.
   - Pixel: Factory images/Android Flash Tool.
   - Samsung: Odin with full firmware. OEM unlock must be enabled; KNOX 0x1 is permanent once tripped.
   - Xiaomi: Mi Flash Tool (fastboot ROMs). Beware Anti-Rollback. Some operations require authorized Mi accounts.
   - OnePlus: MSMDownloadTool or fastboot ROMs (varies by generation).
3. Factory reset if system is corrupted:
   ```bash
   fastboot -w
   fastboot reboot
   ```

#### Hard Brick

Options vary by SoC/manufacturer:
- Qualcomm EDL (9008): Requires test points or special cable; many devices require authorized accounts to flash.
- OnePlus MSM tools (legacy models): Full unbrick to factory state where available.
- Samsung Smart Switch Emergency Recovery: Limited success, model-dependent.
- Professional services: JTAG/ISP/board-level repair for valuable devices.

Prevention:
- Confirm firmware/build numbers match exactly.
- Keep device charged; don’t interrupt flash.
- Always back up before flashing.

---

## Beginner Guide

### What is Rooting?

Rooting grants superuser access (su) so apps and scripts can perform privileged operations. It’s like admin on a PC.

What you can do:
- Systemless ad blocking, debloat, advanced backups, automation, theming, kernel tuning, firewall, host-based filters.
- Power-user tools: AppOps, file system access, task automation, per-app network controls.
- Advanced frameworks: [LSPosed Framework Guide](./android-root-guides/lsposed-guide.md) for Xposed modules
- Explore apps: [Essential Root Apps](./android-root-apps/index.md#featured-apps-the-essentials) • [Backup & Restore Tools](./android-root-apps/index.md#backup-and-restore)

Alternatives without root:
- Shizuku/Sui, ADB-based tweaks, DNS-based ad blocking, work profiles. Great for many tasks without unlocking.
- General guides: [Android Tips & Tricks](./guides/index.md) • [Android Ad Blocking](./guides/android-adblocking.md) • [App Debloating](./guides/android-apps-debloating.md)

Learn more: [What is Root Access?](./android-root-guides/index.md#understanding-root-access)

### Is Rooting Safe?

- Safe when you follow device-specific, up-to-date guides and use trusted sources.
- Risks:
  - Warranty voiding and irreversible flags (e.g., Samsung KNOX 0x1).
  - Data wipe when unlocking bootloader.
  - App compatibility issues (integrity checks).
  - Potential soft/hard bricks if flashing wrong images.

Safety tips:
- Back up before every major change.
- Verify images against your exact build fingerprint.
- Read your device’s XDA/Telegram threads before flashing.

### Which Root Method Should I Use?

- Magisk (recommended for most): Widest compatibility, active development, Zygisk, DenyList, robust OTA flow.
- KernelSU: Kernel-integrated su; excellent for custom-kernel ROMs; device/kernel support required.
- APatch: Kernel patching approach for supported devices; best for advanced users/developers.
- Learn about Custom ROMs: [Custom ROM Installation Guide](./android-root-guides/custom-rom-installation.md)

See: [Root Solutions Comparison](./android-root-guides/index.md#root-solutions-comparison)

### Rooting Process Overview

1) Prep
- Confirm bootloader unlock support; charge >50%; back up; enable Developer Options.

2) Unlock bootloader
- Enable OEM unlocking.
- Reboot to bootloader → `fastboot flashing unlock`
- Some devices require additional step: `fastboot flashing unlock_critical`
- Unlock wipes data.
- Complete guide: [How to Unlock Bootloader](./android-root-guides/how-to-unlock-bootloader.md)

3) Patch the correct image
- Extract from your exact firmware build:
  - Android 13+ devices (e.g., Pixel 7/8/9): patch init_boot.img.
  - Older devices: patch boot.img.
- Patch with Magisk on-device.

4) Flash
```bash
# A/B example
fastboot flash init_boot_a magisk_patched.img
fastboot flash init_boot_b magisk_patched.img
fastboot reboot
```

5) Verify and set up
- Open Magisk → verify installed.
- Configure DenyList if needed.
- Test with a simple root app.

Full guide: [Master Rooting Guide](./android-root-guides/index.md)

---

## Technical Guide

### Root Methods Comparison

Magisk
- How: Patches boot or init_boot; systemless mods; Zygisk runtime.
- Pros: Mature, OTA-friendly, DenyList, big ecosystem.
- Notes: MagiskHide was removed; use DenyList and compatible modules instead.

KernelSU
- How: su integrated in kernel.
- Pros: Strong isolation; performance; module ecosystem growing.
- Notes: Requires a KSU-enabled kernel matched to your ROM/firmware.

APatch
- How: Kernel patching with inline hooks (ARM64); broad kernel version coverage where supported.
- Pros: Powerful for advanced scenarios.
- Notes: Limited device support; follow official docs closely.

Installation links: [Root Solutions](./android-root-guides/index.md#root-solutions-comparison)

### Bootloader and Recovery

Bootloader unlocking
- Why: Needed for most root/custom ROM/kernel operations.
- Steps:
  1) Developer options → enable OEM unlocking.
  2) Bootloader mode → `fastboot flashing unlock` (and possibly `unlock_critical`).
  3) Data wipe occurs; set up device again.
- Complete guide: [How to Unlock Bootloader](./android-root-guides/how-to-unlock-bootloader.md)
- Warnings:
  - Samsung: KNOX 0x1 permanently trips; U.S. carrier models are often not unlockable.
  - Xiaomi: Requires Mi Unlock tool and waiting period; beware Anti-Rollback.
  - Some carrier variants on any brand may be permanently locked.

Custom recovery and fastbootd
- Custom recovery options:
  - TWRP, OrangeFox (availability varies on Android 12+ with dynamic partitions/FBE).
- Installation guide: [Custom Recovery Installation](./android-root-guides/how-to-install-custom-recovery.md)
- Userspace fastboot (fastbootd):
  - `adb reboot fastboot` for dynamic partitions flashing.
- Install/boot examples:
  ```bash
  fastboot boot recovery.img          # test without flashing
  fastboot flash recovery recovery.img
  ```

Guides: 
- [How to Unlock Bootloader](./android-root-guides/how-to-unlock-bootloader.md)
- [Custom Recovery Installation](./android-root-guides/how-to-install-custom-recovery.md)

### Advanced Troubleshooting

Magisk install issues
```bash
# Verify Magisk in shell (if su works)
adb shell su -c "magisk --version"

# Re-patch the correct image from your current build
# For Pixels: extract from factory image or OTA payload.bin (payload-dumper-go)
```

OTA survival (A/B devices)
- Install OTA via system updater.
- In Magisk → Install → “Install to Inactive Slot (After OTA)”.
- Reboot when prompted by Magisk, not before.

AVB / vbmeta
- Most Magisk installs do NOT require disabling verity/verification.
- Only disable AVB if your device/ROM/kernel documentation explicitly says so.

Module conflicts
- Use module safe mode (see Emergency).
- Remove problematic module folders under `/data/adb/modules/`.
- Check Magisk logs.

Logs to collect for help
```bash
adb logcat -b all -d > logcat.txt
adb shell dmesg > dmesg.txt
adb shell getprop > props.txt
```

Performance tuning (rooted)
- Battery: tune governors, block wakelocks, disable bloat, use per-app standby.
- Performance: schedutil/interactive governors, zram tuning, I/O schedulers where available.
- Gaming: thermal profiles, GPU policies (device dependent).
- Always test stability and thermals after changes.
- Root apps for optimization: [Performance & Gaming](./android-root-apps/index.md#performance-and-gaming) • [Battery Management](./android-root-apps/index.md#battery-and-power-management)

---

## Device-Specific Notes

Google Pixel (6/6a/6 Pro, 7/7a/7 Pro, 8/8a/8 Pro, 9 series)
- Patch init_boot.img (Android 13+). Boot.img patching will fail to root.
- Use factory images or PixelFlasher; prefer “Install to Inactive Slot” for OTA.
- Stock recovery has minimal options; use fastbootd for dynamic partitions.

Samsung Galaxy (S21–S25, Fold/Flip)
- Root via Odin: patch AP tar with Magisk, flash BL/AP/CP/CSC (HOME_CSC to keep data when appropriate).
- KNOX 0x1 is permanent; Samsung Wallet/Health secured features may be impacted.
- U.S. carrier models are typically bootloader-locked (no official root).

Xiaomi/Redmi/POCO
- Mi Unlock with wait period; unlock wipes data.
- Use Mi Flash Tool with fastboot ROMs; heed Anti-Rollback (ARB).
- Some devices require AVB flags for custom kernels/ROMs—follow device threads carefully.

OnePlus
- Older models: MSMDownloadTool available; newer models vary.
- OOS/ColorOS merges changed partitioning; follow device-specific guides.
- Some regional SKUs have restrictions.
- Complete guide: [How to Root OnePlus Phone](./android-root-guides/how-to-root-oneplus-phone.md)

Nothing Phone
- Unlock officially supported; patch boot/init_boot per build; TWRP availability varies.
- Complete guide: [How to Root Nothing Phone](./android-root-guides/how-to-root-nothing-phone.md)

Sony, Motorola, ASUS, others
- Check OEM unlock policies (DRM keys on Sony may be affected).
- Use official flashing tools where provided.
- Motorola guide: [How to Root Motorola Phone](./android-root-guides/how-to-root-motorola-phone.md)

Community threads for your exact model are essential.

---

## Advanced Topics

### Magisk Modules (safe usage)

- Install one at a time; reboot and test after each.
- Keep a recovery plan: know how to remove modules via adb/recovery.
- Prefer well-maintained, open-source modules with active support.
- Remember: Some modules are firmware/ROM/version sensitive.
- Browse modules: [Root Apps Collection](./android-root-apps/index.md)

Module management paths:
- Installed at `/data/adb/modules/`
- Remove by deleting a module’s folder or using `magisk --remove-modules`.

### Performance Optimization

Battery
- Reduce wakeups (wakelock control), tune schedutil, limit background apps, refine doze.
- Monitor with BetterBatteryStats or Battery Historian.
- Root tools: [Battery & Power Management](./android-root-apps/index.md#battery-and-power-management)

Performance
- Kernel-level tuning where supported; verify with CPU/GPU stress tests.
- Keep thermal safety intact; avoid permanent performance modes for daily use.
- Optimization apps: [Performance & Gaming](./android-root-apps/index.md#performance-and-gaming)

Resource links:
- [Battery Management](../README.md#battery-management)
- [Performance Improvements](../README.md#performance-improvements)

---

## Community Resources

XDA Developers
- Device forums, ROM/kernel threads, unbrick guides, and Q&A.
- https://forum.xda-developers.com/

Reddit
- r/AndroidRoot, r/Magisk, r/LineageOS, r/Awesome_Android_Root

Telegram
- @MagiskUpdates (news), @KernelSU (discussions), device-specific groups.

Getting quality help
Provide complete info:
```
Device: OnePlus 9 Pro LE2125
Build: OxygenOS 14.0.0.600 (Android 14) / Build number & security patch date
Bootloader: Unlocked (Y/N)
Root: Magisk 27.x / KernelSU x.x.x / APatch <commit or build>
What happened: detailed steps and error messages
What you tried: steps + results
Logs: logcat.txt, dmesg.txt, screenshots if relevant
```

Best practices
- Search your device thread first.
- Post in the correct section with logs.
- Follow up with results to help others.

Contribute
- Write or improve guides.
- Report bugs with clear reproduction steps.
- Donate to tool and ROM developers.
- Help expand our collection: [Contributing Guidelines](./contributing.md)

More: [Community & Resources](../README.md#community--resources) | [About This Project](./about.md)

---

## 🔗 Quick Navigation

### 📚 Essential Guides
- **[Complete Rooting Guide](./android-root-guides/index.md)** - Start here for new users
- **[Magisk Guide](./android-root-guides/magisk-guide.md)** • **[KernelSU Guide](./android-root-guides/kernelsu-guide.md)** • **[APatch Guide](./android-root-guides/apatch-guide.md)**
- **[Bootloader Unlock](./android-root-guides/how-to-unlock-bootloader.md)** • **[Custom Recovery](./android-root-guides/how-to-install-custom-recovery.md)** • **[Custom ROM Installation](./android-root-guides/custom-rom-installation.md)**

### 📱 Device-Specific Guides
**[Pixel](./android-root-guides/how-to-root-pixel-phone.md)** • **[Samsung](./android-root-guides/how-to-root-samsung-phone.md)** • **[Xiaomi](./android-root-guides/how-to-root-xiaomi-phone.md)** • **[OnePlus](./android-root-guides/how-to-root-oneplus-phone.md)** • **[Nothing](./android-root-guides/how-to-root-nothing-phone.md)** • **[Motorola](./android-root-guides/how-to-root-motorola-phone.md)**

### 🛠️ Root Apps & Tools
- **[Featured Root Apps](./android-root-apps/index.md#featured-apps-the-essentials)** - Start with these essentials
- **[Ad Blockers](./android-root-apps/index.md#ads-and-tracking-blockers)** • **[App Management](./android-root-apps/index.md#app-management)** • **[Customization](./android-root-apps/index.md#customization)**
- **[Performance](./android-root-apps/index.md#performance-and-gaming)** • **[Privacy & Security](./android-root-apps/index.md#privacy-and-security)** • **[Backup Tools](./android-root-apps/index.md#backup-and-restore)**

### 📖 General Android Guides
**[Android Ad Blocking](./guides/android-adblocking.md)** • **[App Debloating](./guides/android-apps-debloating.md)** • **[App Backup & Restore](./guides/app-backup-restore-using-root.md)** • **[Stop Auto-Updates](./guides/stop-android-app-auto-updates-play-store.md)**

---

Notes and policy
- This guide prioritizes safety, accuracy, and respect for app developers’ security requirements. Some integrity checks (e.g., hardware-backed STRONG integrity) cannot be passed on unlocked devices. Consider a separate non-rooted device for sensitive apps.
- Always consult your device’s most active development threads for model-specific changes that may supersede the guidance above.