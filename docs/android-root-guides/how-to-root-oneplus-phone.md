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

# Complete OnePlus Rooting Guide

Root any OnePlus device — OnePlus 12/11/10/Nord series with simple bootloader unlock and Magisk

- Works for: Global/Indian/Europe variants of OnePlus 5 → 12/Nord series
- Not ideal for: Certain carrier variants (see warnings)
- Approach: Unlock bootloader → Patch and boot/flash boot or init_boot with Magisk → Preserve root across OTAs

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md)** - Universal rooting principles and safety
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - General bootloader concepts
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - TWRP installation guide
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions for common issues

::: tip Required Tools
### Additional tools you’ll likely need:
- Platform Tools (ADB/Fastboot): https://developer.android.com/studio/releases/platform-tools
- Magisk (latest release): https://github.com/topjohnwu/Magisk/releases
- Payload extractor (to get boot/init_boot from payload.bin):
  - payload-dumper-go: https://github.com/ssut/payload-dumper-go
- Optional local update enabler (for OxygenOS/ColorOS): “OPLocalUpdate” APK (varies by major Android version)
- Windows USB drivers (Qualcomm + Google): OnePlus/Qualcomm/Google signed packages
  
**You can use this link for downloads**: [Click Me](https://droidwin.com/download-msm-download-tool-unbrick-any-oneplus-device/)
:::

## Why OnePlus Devices Are Ideal for Rooting
- Simple bootloader unlock (no OEM token for most non-carrier variants)
- Active custom ROM/kernel scene (especially 5/6/7/8/9 and Nord lines)
- Seamless A/B updates make root retention predictable via Magisk
- Generally developer-friendly policies and unlockable bootloaders

Notes that changed recently:
- MSM Download Tool (EDL unbrick) is widely available up to ~OnePlus 9 series. For OnePlus 10/11/12 and newer, EDL flashing may require authorized accounts (public MSM packages are often unavailable). Plan recovery accordingly.

## Critical Warnings

> ⚠️ OnePlus-specific considerations
- Unlocking wipes everything (including internal storage and eSIM). Back up first.
- Warranty/after-sales may be affected in your region.
- Some carrier variants are bootloader-locked and/or not unlockable:
  - Verizon OnePlus 8 5G UW and similar “UW” SKUs: typically not unlockable
  - Some T‑Mobile variants: require SIM unlock first; some older models required an unlock token
- OTAs can fail if partitions are modified beyond boot/init_boot (keep system partitions stock for smooth OTAs).
- ColorOS/OxygenOS unification on newer devices changes recovery/EDL behaviors; TWRP support is sparse on 2022+ models.
- Widevine may drop to L3 on some devices after unlock/root; bank/DRM apps may need extra steps (see Play Integrity section).

## Supported Devices
All OnePlus devices with unlockable bootloaders.

- Flagship: OnePlus 12, 11, 10/10 Pro, 9/9 Pro, 8/8 Pro/8T, 7/7 Pro/7T/7T Pro
- Nord series: Nord 3/2/2T, Nord CE/CE 2/CE 3, Nord N series (varies by region)
- Legacy: OnePlus 6/6T, 5/5T
- Newer flagships (e.g., 13) follow similar principles, but always verify partition layout (boot vs init_boot) and OTA mechanics for your exact build.

> Tip: Carrier/region variants can differ. Always check your exact model (Settings → About phone → Model/Build).

## Prerequisites & Setup

### Required Tools
1) Platform Tools (ADB/Fastboot)
2) Magisk APK
3) Full OTA/firmware for your exact build (to extract stock boot/init_boot)
4) Payload dumper utility
5) USB Drivers (Windows) or udev rules (Linux)

### Device Preparation
1) Enable Developer Options: Settings → About phone → tap Build number 7×
2) In Developer options:
   - Enable OEM unlocking
   - Enable USB debugging
3) Backup everything (this process wipes your device when unlocking)
4) Charge to 50%+

> Note: On newer OOS/ColorOS builds, OEM unlocking may appear only when the device is online and has contacted Google/OnePlus servers.

### Connection Verification
```bash
adb devices
# Accept the debugging prompt on the phone if asked
```

## Bootloader Unlocking
Applies to global/unlocked variants. Carrier devices may differ.

### Enter Fastboot Mode
- Easiest: adb reboot bootloader
- Hardware: Power off → hold Volume Up + Power until you see Fastboot; or Power off → hold both Volume keys, then plug into USB (varies by model)

Verify:
```bash
fastboot devices
```

### Unlock
Most modern OnePlus devices:
```bash
fastboot flashing unlock
```
Confirm on device → this wipes data.

If you see a prompt/denial about “critical partitions,” some older models support:
```bash
fastboot flashing unlock_critical
```
Only use unlock_critical if you actually need to flash critical partitions (not required for Magisk root).

After reboot, set up the device again and re-enable USB debugging.

> Don’t use fastboot oem unlock on recent devices; fastboot flashing unlock is the current standard.

## Root Installation Methods

### Method A: Patch boot/init_boot with Magisk (Recommended)

Why this method?
- Works on all modern OnePlus devices
- Keeps system partitions untouched for OTA friendliness
- Safest when combined with fastboot boot + Magisk Direct Install

Step 1 — Get the right image
1) Download the full OTA/firmware that exactly matches your current build.
2) Extract payload.bin, then dump:
   - boot.img
   - init_boot.img (if present on your device/build)
   - vendor_boot.img (do not patch/flash for Magisk)
3) Which one to patch?
   - Open Magisk → Check “Ramdisk”:
     - Ramdisk = Yes → patch boot.img
     - Ramdisk = No → patch init_boot.img
   - If uncertain and you see an init_boot partition, patch init_boot.img.

Step 2 — Patch with Magisk
```bash
adb push boot_or_init_boot.img /sdcard/Download/
adb install Magisk-v[version].apk
```
On phone: Magisk → Install → “Select and patch a file” → choose the image you pushed.
Pull the patched image back:
```bash
adb pull /sdcard/Download/magisk_patched-*.img ./
```

Step 3 — Safest first run: fastboot boot (temporary boot)
```bash
adb reboot bootloader
fastboot boot magisk_patched-*.img
```
- This boots once with Magisk without flashing anything. If it boots fine:
  - Open Magisk → Install → “Direct Install (Recommended)” to patch the active slot permanently → Reboot.

If fastboot boot is not supported on your device:
- Flash the correct partition directly (use the one you patched: boot OR init_boot):
```bash
fastboot getvar current-slot
# Suppose current-slot is a
fastboot flash boot magisk_patched-*.img        # if you patched boot.img
# or
fastboot flash init_boot magisk_patched-*.img   # if you patched init_boot.img
fastboot reboot
```

> Important:
> - Do NOT flash/disable vbmeta with “--disable-verity/verification” for Magisk. Magisk works with AVB; disabling AVB is unnecessary and risky.
> - A/B slots: You only need to patch the active slot. For OTAs, use Magisk’s “Install to Inactive Slot (After OTA).”

### Method B: Custom Recovery (limited on 2022+ devices)
- Modern OnePlus devices (10/11/12 and many Nord CE/N) often lack stable TWRP with FBE v2 decryption due to dynamic/virtual A/B and ColorOS changes.
- If your device has a maintained TWRP/OrangeFox:
  - Prefer fastboot boot recovery.img (temporary) over flashing a non-existent recovery partition.
  - Then Install → flash the Magisk APK renamed to .zip (Magisk-vXX.apk → Magisk-vXX.zip).
  - Reboot system → open Magisk to finalize.

> If your device does not have a stable custom recovery, stick to Method A.

## OnePlus-Specific Troubleshooting

### Unbrick/EDL
- MSM Download Tool is commonly available up to OnePlus 9 series. For 10/11/12 and newer, EDL flashing typically requires an authorized account (public MSM packages may be unavailable).
- If you hard brick on newer models without MSM access, your best options are:
  - Working fastboot/fastbootd to flash stock images
  - Service center assistance
  - Community EDL services (ensure trustworthiness)

Enter EDL (varies): Power off → hold both Volume keys while connecting USB (device shows as Qualcomm HS-USB QDLoader 9008 in Device Manager).

### Bootloops after modules
- Disable all Magisk modules without wiping:
  - If you can get ADB after boot completes:
    ```bash
    adb shell su -c "magisk --remove-modules"
    ```
  - Or from recovery/adb shell, delete module folders:
    /data/adb/modules/*
- As a last resort, fastboot boot a stock boot/init_boot to get into system, then fix modules and re-root properly.

### OTA update strategy on rooted devices
- Best practice (A/B seamless):
  1) System Settings → Download OTA (do NOT reboot yet)
  2) Open Magisk → Install → “Install to Inactive Slot (After OTA)”
  3) Return to System Updater → Reboot
- If you took the OTA already and lost root:
  - Extract the new build’s boot/init_boot, patch with Magisk, and flash/boot as before.
- If OTA fails:
  - Use a full OTA instead of incremental, keep partitions stock (don’t modify system/vendor), and avoid custom recoveries for OTAs on modern devices.

### OxygenOS vs ColorOS (unified base)
- On OnePlus 10/11/12 and most new Nord devices, OOS is ColorOS-based under the hood.
- Root steps remain the same (boot vs init_boot decision is the key).
- Local update UI may be hidden; use the “OPLocalUpdate” APK for sideloading full OTA zips when needed.

## Performance & Modules

Recommended Magisk setup on OnePlus:
- Enable Zygisk in Magisk settings
- Configure DenyList for sensitive apps
- Play Integrity fix: Use a maintained module for BASIC/DEVICE integrity (e.g., “Play Integrity Fix” — community maintained; project names/forks change over time)
- LSPosed (Zygisk) for module ecosystem
- Optional privacy/root-hiding layer like Shamiko (where legal/allowed; requires Zygisk and DenyList not in enforcement mode)

Custom kernels (device-dependent):
- Gains: power efficiency, sched/tuning, sometimes GPU/perf or sound features
- Ensure kernel is built for your exact build and supports Magisk/KernelSU if you use them

> Note: Passing Google Play Integrity on rooted devices is an arms race; results may vary by region, app, and time.

## Alternative Root Methods

### Method C: Direct partition backup (advanced)
Useful to save a clean copy before you start:
```bash
# After first root or from recovery shell
adb shell su -c "dd if=/dev/block/bootdevice/by-name/boot_a of=/sdcard/boot_a.img"
adb shell su -c "dd if=/dev/block/bootdevice/by-name/boot_b of=/sdcard/boot_b.img"
# If present:
adb shell su -c "dd if=/dev/block/bootdevice/by-name/init_boot_a of=/sdcard/init_boot_a.img"
adb shell su -c "dd if=/dev/block/bootdevice/by-name/init_boot_b of=/sdcard/init_boot_b.img"
```

### Method D: Custom recovery first (older devices)
- On 5/5T/6/6T/7/7T/8/9 (varies by maintainer), you can install TWRP then flash Magisk.
- On dynamic/virtual A/B devices, prefer “fastboot boot twrp.img” and install from within TWRP instead of flashing recovery to a non-existent partition.

## Success Verification

- Open Magisk → should show “Installed” with version
- ADB root check:
```bash
adb shell su -c "id"
# uid=0(root) gid=0(root) ...
```
- Play Integrity/SafetyNet:
  - Use a Play Integrity checker app; with proper configuration, BASIC and sometimes DEVICE integrity can pass.
  - Configure DenyList for banking/wallet/DRM apps.

## Staying Updated

- Wait for community confirmations before major OTAs (esp. Android version jumps).
- Prefer full OTAs and the Magisk “Install to Inactive Slot (After OTA)” workflow.
- Custom ROMs (LineageOS/etc.) can provide newer Android versions sooner, but recovery/root procedures change—follow each ROM’s specific instructions.

## Community Resources
- OnePlus @ XDA: https://xdaforums.com/c/oneplus.11993/
- Official OnePlus Community: https://forums.oneplus.com/
- r/OnePlus on Reddit: https://reddit.com/r/oneplus
- Telegram channels/groups for device-specific updates (e.g., @OnePlusUpdates) and boot image shares

---

::: tip 💡 OnePlus Root Success Tips
- Prefer “fastboot boot” the patched image first; then use Magisk’s Direct Install. It’s safer than flashing right away.
- Do not disable AVB (vbmeta) for Magisk; it’s unnecessary and can cause issues.
- Keep a copy of your stock boot/init_boot matching your current build.
- MSM/EDL unbrick is not guaranteed on newer models; avoid risky flashes.
- Use the exact firmware build for your device and region. Mismatches cause boot loops.
:::

**Need help? See the [FAQ](../faqs.md) and the [universal guide](./index.md).**