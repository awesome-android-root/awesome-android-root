---
layout: doc
title: Complete Magisk Root Guide 2025
description: "Master Magisk rooting with our comprehensive guide. Install systemless root, modules, and advanced root management for all Android devices safely."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/magisk-guide
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Magisk Root Guide 2025 - Universal Android Rooting Solution
  - - meta
    - property: og:description
      content: Install Magisk root with our comprehensive guide. Master systemless rooting with advanced module system, root hiding, and complete device management.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/magisk-guide
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/magisk-guide.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Magisk Root Guide 2025 - Universal Systemless Root
  - - meta
    - name: twitter:description
      content: Master Magisk installation with systemless rooting, module support, and advanced root management for all Android devices.
  - - meta
    - name: keywords
      content: magisk root guide 2025, systemless root installation, magisk modules, android rooting, zygisk magisk, magisk manager, root hiding, play integrity fix, magisk delta, magisk boot image patching, magisk installation tutorial, android root 2025, magisk denylist, magisk shamiko
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Rooting Solutions
  - - meta
    - property: article:tag
      content: Magisk Root 2025
  - - meta
    - property: article:tag
      content: Systemless Root
  - - meta
    - property: article:tag
      content: Android Rooting
  - - meta
    - property: article:tag
      content: Magisk Modules
  - - meta
    - property: article:tag
      content: Root Management
  - - meta
    - property: article:tag
      content: Play Integrity Fix
  - - meta
    - property: article:published_time
      content: 2024-01-20T09:00:00Z
  - - meta
    - property: article:modified_time
      content: 2025-01-30T14:00:00Z
  - - meta
    - name: robots
      content: index, follow, max-image-preview:large
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Complete Magisk Root Installation Guide",
        "description": "Step-by-step guide to install Magisk systemless root on Android devices",
        "totalTime": "PT45M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD", 
          "value": "0"
        },
        "tool": [
          {"@type": "HowToTool", "name": "Android Device with Unlocked Bootloader"},
          {"@type": "HowToTool", "name": "Computer with ADB/Fastboot"},
          {"@type": "HowToTool", "name": "Magisk APK"},
          {"@type": "HowToTool", "name": "Stock Boot Image"}
        ],
        "step": [
          {
            "@type": "HowToStep",
            "name": "Download Required Files",
            "text": "Download latest Magisk APK and extract boot.img from device firmware"
          },
          {
            "@type": "HowToStep",
            "name": "Patch Boot Image",
            "text": "Use Magisk app to patch the stock boot image creating magisk_patched.img"
          },
          {
            "@type": "HowToStep",
            "name": "Flash Patched Boot",
            "text": "Use fastboot to flash the patched boot image to device"
          },
          {
            "@type": "HowToStep",
            "name": "Install Magisk Manager",
            "text": "Install Magisk app for root management and module installation"
          }
        ]
      }
---

# Complete Magisk Root Guide

The universal systemless root solution - Master Magisk installation, modules, and management for comprehensive Android customization without system modifications.

::: tip 🔗 Essential Navigation
**Prerequisites:** [Bootloader Unlocked](./how-to-unlock-bootloader.md) | **Main Guide:** [Android Rooting Master Guide](./index.md) | **Alternatives:** [KernelSU Guide](./kernelsu-guide.md) | **Support:** [FAQ & Troubleshooting](../faqs.md)
:::

## Table of Contents

### 🚀 Getting Started
- [What is Magisk?](#what-is-magisk)
- [Why Choose Magisk?](#why-choose-magisk)
- [Prerequisites & Compatibility](#prerequisites-and-compatibility)

### ⚙️ Installation Process
- [Method 1: Boot Image Patching](#method-1-boot-image-patching-recommended)
- [Method 2: Custom Recovery Installation](#method-2-custom-recovery-installation)
- [Method 3: Direct Installation](#method-3-direct-installation-advanced)

### 🔧 Configuration & Management
- [Post-Installation Setup](#post-installation-setup)
- [Root Hiding & Banking Apps](#root-hiding--banking-apps)
- [Module Management](#magisk-modules-ecosystem)

### 🛠️ Advanced Topics
- [Updates and Maintenance](#updates-and-maintenance)
- [Troubleshooting Guide](#troubleshooting)

---

## What is Magisk?

Magisk is a systemless root solution that modifies only boot-related partitions, not /system. This preserves seamless updates and lets you add features via modules without permanently altering system files.

### Core Innovations

- **Magic Mount overlays**: Virtualizes changes over read-only partitions (including EROFS on Android 13+)
- **Boot/init_boot patching**: Modifies the boot chain (not /system)
- **Zygisk**: Injects code into the Zygote process to enable powerful user-space modules
- **Reversible**: Uninstall to fully restore stock images (if you kept originals)

### Magisk vs Alternatives

| Feature | Magisk | Traditional Root | KernelSU |
|---|---|---|---|
| **System modifications** | Systemless (overlay) | Edits /system | Kernel-level hooks |
| **Installation** | Patch boot/init_boot | Replace system files | Flash kernel or patch boot |
| **OTA updates** | Supported with steps | Often break | Supported with steps |
| **Root hiding** | DenyList + modules | Weak | Good (different model) |
| **Module ecosystem** | Very mature (Zygisk) | N/A | Growing |
| **Recovery dependency** | None required | Often required | Optional |
| **Community docs** | Extensive | Fragmented | Smaller, active |

::: warning Notes:
- **MagiskHide was removed**; use DenyList and third-party modules if needed.
- **SafetyNet is deprecated**; Play Integrity is what matters now (see “Root Hiding & Banking Apps”).
:::

---

## Why Choose Magisk?

- Works across a wide range of devices (Android 6.0–15)
- Systemless design survives OTAs with minimal steps
- Rich Zygisk module ecosystem (LSPosed, ad-blocking, privacy tools, props, etc.)
- No permanent system changes; easy to revert if you keep stock images

---

## Prerequisites and Compatibility

### Essential Requirements

**Device Prerequisites:**
- ✅ **Unlocked bootloader** - [Complete unlock guide](./how-to-unlock-bootloader.md)
- ✅ **Android 6.0+** (API level 23+) - Magisk supports wide version range
- ✅ **50%+ battery** - Prevents interruption during installation
- ✅ **Custom recovery** (recommended) - TWRP, OrangeFox, or equivalent

**Computer Requirements:**
- ✅ **ADB/Fastboot tools** - [Download Platform Tools](https://developer.android.com/studio/releases/platform-tools)
- ✅ **USB drivers** - Device-specific drivers installed
- ✅ **Stock firmware** - For boot image extraction
- ✅ **Backup solution** - Complete device backup created

### 📱 Device Compatibility Matrix

| Android Version | Magisk Support | Notes |
|---|---|---|
| Android 15 | Supported | Use latest stable; Zygisk works |
| Android 14 | Supported | Play Integrity is stricter |
| Android 13 | Supported | Many devices use init_boot |
| Android 12 | Supported | Zygisk-era features mature |
| Android 11–6 | Supported | Use appropriate Magisk version if very old |

::: tip Tip: 
In Magisk > Install, check “Ramdisk: Yes/No” to know which partition to patch. On Android 13+ devices (especially Google Tensor/Pixel 7/8/9), you usually patch init_boot, not boot.
:::
---

## Method 1: Boot Image Patching (Recommended)

**Recommended for:** Most users and all modern devices

*This is the official, safest, and most compatible method.*

### Phase 1: Prepare & Download

1. **Latest Magisk APK:**
   - Visit [Magisk GitHub Releases](https://github.com/topjohnwu/Magisk/releases)
   - Download `Magisk-vx.x.apk` (latest version)
   - Rename to `Magisk.apk` for easier handling

2. **Stock Boot Image:**
- For most devices **pre-A13** or “Ramdisk: Yes” → boot.img
- For many **A13+ devices** (Pixel 7/8/9, some others) or “Ramdisk: No” → init_boot.img
- **Samsung:** patch the full AP_xxx.tar (special process below)
- If no factory images are available, extract from your current firmware OTA (payload.bin) using payload-dumper-go

3. Verify tools and connectivity:
```bash
adb devices
adb reboot bootloader
fastboot devices
fastboot getvar current-slot
```

### Phase 2: Patch the image

1. Install the Magisk app (enable “Install unknown apps”).
2.  Copy your stock boot.img or init_boot.img (or Samsung AP tar) to the device.
3. Open Magisk → Install → Select and Patch a File → choose the image (or AP tar for Samsung).
4) Wait for success; note output path (e.g., /Download/magisk_patched-xxxx.img or magisk_patched-xxxx.tar on Samsung).

### Phase 3: Flash the patched image

**Non-Samsung (fastboot devices):**
1. Reboot to bootloader:
```bash
adb reboot bootloader
fastboot devices
```
2. Flash to the same partition you patched:
- If you patched boot.img:
```bash
fastboot flash boot magisk_patched.img
```
- If you patched init_boot.img (Android 13+ on many devices, e.g., recent Pixels):
```bash
fastboot flash init_boot magisk_patched.img
```
Note: Flash the partition for the slot currently in use. Do not blindly flash both slots; mismatched slots can soft-brick after OTAs.

3. Reboot:
```bash
fastboot reboot
```

**Samsung (Odin devices):**
1. Copy the generated magisk_patched-xxxxx.tar to PC.
2.  Open Odin (Windows), load the patched TAR into AP.
3. Untick “Auto Reboot”, start flash. When done, force reboot to recovery (Power + Vol Up while disconnecting USB) and factory reset if required (VaultKeeper behavior; first unlock already wiped data).
4) First boot will be slower; open Magisk to finalize. KNOX is permanently tripped; Samsung Pay/Secure Folder may not work again.

### Verify
- Open Magisk → the top card should show Magisk installed and version.
- Optionally verify with a root checker app.
- In Magisk settings, confirm Zygisk is available on your Android version.

Pro tip: If your fastboot supports it, you can test-run without flashing:
```bash
fastboot boot magisk_patched.img
```
Once booted with temporary root, open Magisk → Install → Direct Install to make it permanent.

---

## Method 2: Custom Recovery Installation (Legacy/Deprecated)

Recommended for: **Legacy devices** that still rely on recovery flashing. Not officially supported on modern Magisk. Do not use on A13+ or recent devices.

What changed:
- The classic flashable Magisk ZIP has been discontinued for years.
- Official installation is via image patching only.

If you insist on recovery usage:
- Patch the image with the Magisk app as in Method 1.
- Boot to recovery and flash the patched image (not a ZIP):
  - In TWRP: Install → Install Image → select magisk_patched.img → choose the correct partition (boot or init_boot) → Swipe to flash → Reboot System.

Use recovery mostly for backups and module recovery (deleting bad modules), not for installing Magisk.

---

## Method 3: Direct Installation (Advanced)

Scenario A: **Already rooted** with another solution
- Install the latest Magisk APK.
- Open Magisk → Install → Direct Install (recommended).
- Reboot.

Scenario B: Temporary-boot method (no permanent flash first)
- Obtain and patch stock boot/init_boot as in Method 1.
- Temporarily boot it:
```bash
fastboot boot magisk_patched.img
```
- Once booted, open Magisk → Install → Direct Install → Reboot.
- This keeps the risk lower if you’re unsure about flashing to the wrong slot.

Scenario C: Dump image from device (if firmware is hard to find)
- Requires temporary root or recovery shell access:
```bash
adb shell su -c "dd if=/dev/block/by-name/boot of=/sdcard/boot.img"
# or for Android 13+ devices where applicable
adb shell su -c "dd if=/dev/block/by-name/init_boot of=/sdcard/init_boot.img"
```
- Patch and proceed as above.

---

## Post-Installation Setup

1. Verify root:
- Open Magisk, confirm installed version.
- Test with a root app.

2.  **Configure Magisk:**
- Repackage the app (Hide the Magisk app) to change its package name.
- Enable Zygisk (recommended on Android 11+).
- Enforce DenyList (then configure the app list).
- Mount Namespace Mode: Isolated (recommended for stronger separation on Android 13+).

3. **Security hygiene:**
- Require PIN/biometrics for superuser requests.
- Review granted apps regularly; revoke unused permissions.
- Keep a copy of your original boot/init_boot image for easy restore.

4) **Optional backup:**
- Use recovery or ADB to back up important partitions/data.

---

## Root Hiding & Banking Apps

**Reality in 2025:**
- SafetyNet is deprecated; Google Play Integrity (Basic/Device/Strong) is used.
- With an unlocked bootloader, passing Device/Strong Integrity is often impossible on many devices (especially Pixels/Tensor) due to hardware-backed attestation. Some banks now require Device Integrity.
- You can still hide root from many apps and often pass Basic Integrity. Results vary per device/app.

**Baseline steps:**
1. Repackage Magisk app (Settings → Hide the Magisk app).
2.  Enable Zygisk.
3. Enable and configure DenyList (Settings → Configure DenyList) for banking apps, Google Play Services, and Google Play Store. Toggle “Enforce DenyList”.
4) Clear data for:
   - Google Play Services
   - Google Play Store
   - Problematic banking apps
   - Reboot, then re-open apps.

**Optional modules that may help (no guarantees):**
> Check our [Root hiding section](./../android-root-apps/index.md#root-hiding-and-integrity)
- Shamiko (by LSPosed): Enhances hiding beyond DenyList. Requires Zygisk and DenyList NOT enforced for that app list (Shamiko manages it). Use responsibly.
- Play Integrity Fix (community-maintained forks): Attempts to adjust attestation to pass Basic/Device on some devices/ROMs. Compatibility changes over time.


**Testing tools:**
- Play Integrity API Checker (community apps on GitHub) to see Basic/Device/Strong.
- Root checker to confirm root interface.
- Remember: Passing Strong Integrity with an unlocked bootloader is effectively not possible.

**Compliance note: Bypassing app protections can violate TOS. Use at your own risk.**

---

## Magisk Modules Ecosystem

Where to get modules now:
- The in-app online repo was discontinued. Install from storage.
- Trusted sources: project GitHubs, reputable developers, and community-maintained indices. Consider using a community module manager (e.g., [Magisk Module Manager](https://github.com/MMRLApp/MMRL)) to browse verified modules.

**Install:**
1. Magisk → Modules tab → Install from storage → pick ZIP.
2.  Reboot.
3. Verify functionality; add to DenyList if needed.

**Guidelines:**
- Prefer Zygisk-aware modules (Riru is legacy).
- Install one at a time; reboot and test.
- Keep a record of what you installed and when.
- To uninstall a broken module:
  - Boot recovery and delete ```/data/adb/modules/module_name```
  - Or use ADB during boot: adb wait-for-device shell magisk --remove-modules

**Popular categories:**
- [LSPosed (Zygisk)](./lsposed-guide.md) for app-level tweaks
- [Ad-blocking/private](./../android-root-apps/index.md#-ad--tracking-blocking) DNS modules
- [Performance/tweaks (ensure device/version compatibility)](./../android-root-apps/index.md#-performance--system)

---

## Updates and Maintenance

### Updating Magisk
- In-app: Settings → Update Channel (Stable/Canary). Stable recommended for daily drivers.
- To update:
  1. Update the Magisk app (APK over the top).
  2.  Open Magisk → Install → Direct Install.
  3. Reboot and verify.

### OTA Survival (A/B devices)
Typical Pixel/modern workflow:
1. In Settings → System update: Download and Install, but DO NOT reboot.
2.  Open Magisk → Install → Install to Inactive Slot (After OTA).
3. When done, reboot.
4) Verify Magisk is intact after update.

::: warning Notes:
- If your device uses init_boot: Magisk handles it automatically with “Install to Inactive Slot,” otherwise you may need to re-flash a newly patched init_boot if things changed significantly.
- Samsung: Use patched AP for each firmware update (Odin flash). Dirty OTA from settings usually won’t work with root.
:::

::: tip Maintenance tips:
- Update modules cautiously; read changelogs.
- Monthly review of granted superuser apps.
- Keep a local copy of your original and current boot/init_boot images per build.
:::

---

## Troubleshooting Guide

### Installation issues:
- Magisk shows “N/A” after flashing:
  - You flashed the wrong partition (boot vs init_boot).
  - Wrong image (mismatch with your exact build/slot).
  - For A/B, you flashed the inactive slot’s image. Re-flash to the active slot (or use “Install to Inactive Slot” during OTAs).
- Fastboot errors:
  - Update Platform Tools.
  - Use USB 2.0 port/cable.
  - On Windows, install device-specific USB drivers.

### Bootloops after install:
- Flash back your original boot/init_boot:
```bash
fastboot flash boot stock_boot.img      # or
fastboot flash init_boot stock_init_boot.img
fastboot reboot
```
- Or temporarily boot stock image (if supported), then fix from Android.
- Check if a wrong slot was flashed; correct it.

### Root access denied:
- Open Magisk → Superuser → ensure the app is listed and allowed.
- Some apps need Zygisk; confirm it’s enabled.
- Conflicting modules may break su; disable them and retry.

### Banking app issues:
- Clear app data and Google Play Services/Store data; reboot.
- Verify DenyList config for both the banking app and its dependencies (often include Google Play Services, GMSCore processes).
- Try Shamiko (with DenyList not enforced), then re-test.
- Understand that some apps now require Device/Strong Integrity and will never work rooted/unlocked.

### Module problems:
- Bootloop from a module:
  - Recovery: ```delete /data/adb/modules/module```
  - Or:
```bash
adb wait-for-device shell magisk --remove-modules
```
- Modules not working:
  - Ensure Zygisk is enabled if needed.
  - Confirm Android version support.
  - Read module logs (often in ```/data/adb/modules/module```).

### Advanced recovery:
- Full Magisk removal:
  - In-app: Uninstall → Restore Images → Complete Uninstall.
  - Manual: flash stock boot/init_boot, then remove /data/adb/magisk*.
- If AVB prevents boot with other mods:
  - Restore stock vbmeta or, for certain custom ROM workflows, flash vbmeta with disabled verification (not needed for plain Magisk installs; don’t do this unless you know why).

---

## Community & Resources

### Official:
- **[Magisk GitHub](https://github.com/topjohnwu/Magisk)** - Official source code and releases
- **[Magisk Documentation](https://topjohnwu.github.io/Magisk/)** - Official documentation
### Community:
- **[XDA device forums](https://xdaforums.com/xda-devices/basic-search)** - for device-specific images and quirks
- **[r/Magisk](https://www.reddit.com/r/Magisk/)** - on Reddit for community Q&A
- **[LSPosed project](https://github.com/JingMatrix/LSPosed) (Zygisk framework and Shamiko module)**

### Getting Help
**When seeking help, provide:**
- Device model and Android version
- Magisk version installed
- Installation method used
- Exact error messages
- Logs from Magisk app

---


::: tip 🎉 Congratulations on Your Successful Root!
**You now have complete control over your Android device!** 

**Next recommended steps:**
- **[Explore Root Apps](../android-root-apps/index.md#root-apps)** - Discover 300+ curated applications
- **[Try LSPosed Framework](./lsposed-guide.md)** - Advanced app modifications
- **[Install Custom ROM](./custom-rom-installation.md)** - Transform your Android experience
- **[Read Security Guide](../guides/)** - Maintain device security
:::

**Continue Your Journey:**
- **[Essential Magisk Modules](../android-root-apps/#starter-kit-must-have-apps)**
- **[Banking App Solutions](../faqs.md#play-integrity-and-banking-apps)**
- **[Advanced Root Management](../android-root-apps/#root-management)**
- **[Need Help?](../faqs.md)**

