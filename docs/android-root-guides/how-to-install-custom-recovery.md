---
layout: doc
title: Complete Custom Recovery Installation Guide
description: "Master guide to install custom recovery - TWRP, OrangeFox, SKYHAWK. Gateway to rooting, custom ROMs, and advanced Android modifications."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-install-custom-recovery
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Custom Recovery Installation Guide - TWRP & More
  - - meta
    - property: og:description
      content: Install custom recovery with our comprehensive guide covering TWRP, OrangeFox, and SKYHAWK for Android rooting and ROM installation.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/how-to-install-custom-recovery
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/custom-recovery.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Custom Recovery Installation Guide
  - - meta
    - name: twitter:description
      content: Install TWRP, OrangeFox, and SKYHAWK custom recovery for Android rooting and customization.
  - - meta
    - name: keywords
      content: custom recovery installation, twrp installation, orangefox recovery, skyhawk recovery, android recovery mode, custom recovery guide
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Modification
  - - meta
    - property: article:tag
      content: Custom Recovery
  - - meta
    - property: article:tag
      content: TWRP
  - - meta
    - property: article:tag
      content: Android Rooting  
  - - meta
    - name: robots
      content: index, follow
---

# Complete Custom Recovery Installation Guide

Your gateway to Android customization — Install custom recovery to unlock rooting, custom ROMs, and advanced system management.

## 🔗 Essential Resources
- [📖 Main Rooting Guide](./index.md) — Universal rooting principles and safety
- [🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md) — Required prerequisite
- [📱 Custom ROM Installation](./custom-rom-installation.md) — Next step after recovery
- [❓ FAQ & Troubleshooting](../faqs.md) — Solutions for common issues

## ⚡ What is Custom Recovery?

Custom recovery replaces Android's stock recovery with an enhanced system that unlocks advanced modification capabilities:

### Core Advantages
- Complete NANDroid Backups — Full system snapshots for safe experimentation
- Custom ROM Installation — Gateway to LineageOS, Pixel Experience, etc.
- Root Solution Management — Install Magisk, KernelSU, APatch efficiently
- Advanced File Operations — Partition management and system repair tools
- Enhanced ADB Access — Powerful debugging and troubleshooting capabilities

### Requirements Path
1. 🔓 [Unlock bootloader](./how-to-unlock-bootloader.md) ← Start here
2. 🛠️ Install custom recovery (this guide)
3. ⚡ [Install root solution](./index.md#root-solutions-comparison) ← Next step

::: danger ⚠️ ESSENTIAL PREREQUISITE
Unlocked bootloader required! Complete [bootloader unlocking](./how-to-unlock-bootloader.md) first.
:::

## Recovery Options

Choose the best recovery for your needs:

### TWRP (Recommended for Most)
[Team Win Recovery Project](https://twrp.me/) — Most popular and actively maintained

- ✅ Broad device support and documentation
- ✅ Reliable, mature codebase
- ✅ Touch interface with familiar workflows
- ❌ Decryption may lag behind latest Android releases on some devices
- Best for: Most users and most devices

### OrangeFox (Modern TWRP-based)
[OrangeFox Recovery](https://orangefox.download/) — Modern interface and features

- ✅ Material-style UI and UX enhancements
- ✅ Additional quality-of-life features
- ✅ Generally keeps up with modern devices
- ❌ Smaller device list vs TWRP
- Best for: Users wanting a modern UI on supported devices

### SKYHAWK/SHRP (Feature-rich)
[SkyHawk Recovery Project](https://skyhawkrecovery.github.io/) — Advanced features and theming

- ✅ Dashboard UI with built-in tools
- ✅ Security features (password lock)
- ✅ Integrations (theming, scripts)
- ❌ Smallest device support
- Best for: Enthusiasts on supported devices

::: tip 💡 Quick Decision Guide
- New to custom recovery? → Choose TWRP
- Want modern interface? → Choose OrangeFox
- Need advanced features? → Choose SKYHAWK
- Device not supported? → Check XDA Forums for unofficial builds
:::

## ✅ Prerequisites & Preparation

### Essential Requirements
- [🔓 Unlocked Bootloader](./how-to-unlock-bootloader.md) — Mandatory prerequisite
- Platform Tools — [Download ADB/Fastboot](https://developer.android.com/studio/releases/platform-tools) (use the latest)
- USB Drivers — Install OEM drivers (Windows) or set up udev rules (Linux)
- Recovery Image — Device-specific file from official sources
- Quality USB Cable — Data transfer capable (USB 2.0 port often more reliable)

### Critical Safety Checks
::: danger ⚠️ ESSENTIAL WARNINGS
- **Device Model Match** — Flashing the wrong image can brick your device
- **Battery 50%+** — Prevent interruption during flash
- **Backup Important Data** — Unlocking/flashing can wipe data
- **Warranty Impact** — May void manufacturer warranty
:::

### Integrity & Environment Checks
- **Verify downloads:**
  - Windows (PowerShell): Get-FileHash .\recovery.img -Algorithm SHA256
  - macOS/Linux: shasum -a 256 recovery.img
- **Confirm platform-tools version:**
  - fastboot --version (keep it current; older fastboot can fail on new devices)
- **Windows driver basics:**
  - Use manufacturer ADB/Fastboot drivers (e.g., Google USB Driver, Xiaomi, etc.)
  - If fastboot shows “waiting for any device,” reinstall drivers or try a different port/cable

### Preparation Steps
1. **Verify Device Information**
   - Settings → About Phone → Model number, exact variant, and Android version
2. **Download Recovery Sources**
   - TWRP: https://twrp.me/Devices/
   - OrangeFox: https://orangefox.download/
   - SKYHAWK: https://skyhawkrecovery.github.io/Devices.html
3. **Identify Your Partition Layout (important from Android 10+)**
   - Reboot to bootloader, then:
     - fastboot getvar current-slot (should print a/b on A/B devices)
     - fastboot getvar has-slot:recovery (yes/no)
     - fastboot getvar is-logical:recovery (yes/no)
   - General rules in 2023–2025:
     - Many devices are A/B with dynamic partitions (no separate recovery partition)
     - Recovery is embedded in boot, vendor_boot, or init_boot (Android 12+ with GKI)
     - Some devices still have a separate recovery partition (often older or specific OEMs)
   - Always read the recovery’s device page; it tells you exactly where to flash (boot, vendor_boot, init_boot, or use an installer ZIP)

## 🚀 Installation Process

Because device partition schemes vary, pick the path that matches your device. If unsure, follow the “A/B or dynamic partitions” path and boot recovery temporarily first.

### Step 1: Download & Prepare Recovery
1. Download the correct .img for your exact device/Android version from the official recovery page or the ROM maintainer’s thread.
2. Place recovery.img in your platform-tools folder.
3. Open a terminal/command prompt in that folder.

### Step 2: Enter Bootloader/Fastboot Mode
ADB method (recommended):
```bash
adb reboot bootloader
```

Hardware keys method:
- Power off device
- Hold the OEM-specific combo (often Volume Down + Power) to enter bootloader/fastboot

Verify connection:
```bash
fastboot devices
```
Expected: Device serial number is listed.

### Step 3: Install Method — Choose Your Path

::: warning ⚠️ READ BEFORE FLASHING
On many modern devices (A/B, dynamic partitions), “fastboot flash recovery recovery.img” is incorrect and can break boot. Always follow the device page instructions. When in doubt: fastboot boot first, then install from within recovery using the installer ZIP or “Install image” to the correct partition (boot/vendor_boot/init_boot).
:::

#### Path A: Devices WITH a separate recovery partition (legacy/A-only)
- You confirmed has-slot:recovery = no and a physical “recovery” partition exists.

Commands:
```bash
fastboot flash recovery recovery.img
fastboot reboot recovery
```

If your bootloader auto-reboots, use hardware keys to force-boot into recovery immediately after flashing.

#### Path B: A/B or dynamic partition devices (most Android 10–15 devices)
- No dedicated recovery partition; recovery resides in boot, vendor_boot, or init_boot.

1) Temporarily boot recovery (safe, recommended):
```bash
fastboot boot recovery.img
```

2) Permanently install from within recovery using one of:
- **TWRP Installer ZIP (if provided for your device):**
  - Copy the ZIP to your device or use ADB sideload
  - In TWRP: Install → select installer ZIP → Swipe to confirm
- **Install Image to the correct partition:**
  - Install → Install Image → select recovery.img
  - Choose the partition indicated by the device page (Boot, Vendor_Boot, or Init_Boot)
  - Confirm flash
- **If and only if the device page says to use fastboot:**
  - fastboot flash boot recovery.img
  - or fastboot flash vendor_boot recovery.img
  - or fastboot flash init_boot recovery.img
  - Follow the exact target partition from the maintainer’s instructions.

Then:
```bash
fastboot reboot recovery
```

Notes:
- On Android 12+ with GKI, many devices use vendor_boot or init_boot instead of boot.
- If decryption isn’t supported in your recovery, use ADB sideload or USB-OTG to move files.

#### Path C: Samsung devices (no fastboot; use Odin)
- Download the .tar recovery package from the official device page.
- Boot to Download Mode (Power + Volume Down + connect USB, or OEM-specific combo).
- On Odin (Windows):
  - AP: select the TWRP .tar file
  - Uncheck “Auto Reboot”
  - Start
- After “PASS,” manually reboot to recovery immediately:
  - Hold Volume Up + Power (and USB connected as needed) to enter TWRP
- If internal storage is encrypted and not decrypting, you may need to “Format Data” in TWRP (data loss).
- Samsung Knox tripping is irreversible and voids warranty.

### Step 4: Boot to Recovery (First Boot Is Essential)
Immediately boot to the flashed recovery to prevent stock recovery restoration and verify installation.

- Generic:
```bash
fastboot reboot recovery
```
- Or:
```bash
fastboot boot recovery.img
```
- Or use hardware keys (varies by OEM)

::: tip 💡 Why Boot Immediately?
Some devices restore stock recovery on first normal boot. Booting to custom recovery first prevents this.
:::

## Post-Installation

### 1) Verify Installation
- Boot to recovery (hardware keys or fastboot reboot recovery)
- Ensure touch works and storage is accessible
- For A/B: confirm recovery persists across slots if your installer handles both

### 2) Create a Backup (Recommended)
::: tip 💾 CREATE A BACKUP FIRST
Always create a backup before major changes. On dynamic-partition devices, full “system” image backups can be very large. At minimum, back up Boot/Vendor_Boot/Init_Boot and Data. If available, back up EFS/Modem/Persist partitions (critical for IMEI, calibration).
:::
In recovery:
- Backup → Select partitions:
  - Boot (and Vendor_Boot or Init_Boot, if present)
  - Data (recommended; large)
  - EFS/Modem/Persist (if listed)
- Store backups off-device (PC/external drive/cloud)

### 3) Test Essentials
- File Manager access (or MTP)
- ADB Sideload: Advanced → ADB Sideload
- Simple flash test (e.g., small module) if desired

### 4) Encryption/Decryption Notes (Android 12–15)
- If your recovery cannot decrypt FBE v2, internal storage may appear scrambled.
- Use one of:
  - ADB sideload to install ZIPs
  - ADB push to /sdcard while recovery is running
  - USB-OTG storage
- As a last resort, “Format Data” to remove encryption (this wipes internal storage).

## Essential Operations

### Installing ZIP Files
1. Place the ZIP on internal storage/OTG or use ADB sideload:
   - adb sideload file.zip
2. In recovery:
   - Install → choose ZIP → Swipe to confirm
3. Reboot System when complete

### Managing Backups
- Create: Backup → choose partitions → Start
- Restore: Restore → select backup → choose partitions → Confirm
- Offload: Copy backups to PC/cloud; don’t rely solely on internal storage

### Wiping System/Data
- Factory Reset: Wipe → Factory Reset (keeps internal storage on some devices)
- Advanced Wipe: Select partitions (System/Product/Vendor/Cache/Data as applicable)
- Format Data: Removes all user data and encryption (required in some Samsung/TWRP setups after first install)

::: warning ⚠️ Wipe Warnings
- Wiping System/Product/Vendor removes your OS → have a ROM ready
- Wiping Data removes all apps/files
- Formatting Data removes encryption and requires setting up device from scratch
:::

## Modern Device Considerations

- **A/B and Dynamic Partitions:**
  - Many devices have no standalone recovery partition.
  - Use fastboot boot and then install via installer ZIP or to vendor_boot/init_boot as instructed.
- **Fastbootd (userspace fastboot):**
  - Some ROM flashing steps require fastbootd: fastboot reboot fastboot
  - Not typically needed just to install recovery.
- **AVB (Android Verified Boot):**
  - With an unlocked bootloader, you generally do NOT need to flash a “disable-verity” vbmeta on modern Pixels. Only do vbmeta changes if your device instructions explicitly say so.
- **OTA Survival:**
  - Permanent custom recovery may break seamless OTAs.
  - Best practice on A/B devices: only boot recovery when needed; keep stock boot/vendor_boot/init_boot for OTAs, then re-apply custom recovery if desired.
- **Pixel 6–8 series and newer devices:**
  - Recovery/decryption support can lag. Use ADB sideload/OTG if storage isn’t visible.
  - Many ROMs ship their own recovery image; use those for installation instructions.

## Troubleshooting

### Common Issues

#### Recovery Won’t Boot / Bootloops
Possible causes and fixes:
1. Wrong target partition or wrong image for your device/Android version
2. Reboot bootloader and temporarily boot:
   ```bash
   fastboot boot recovery.img
   ```
3. If device page says so, re-flash to correct partition:
   - fastboot flash vendor_boot recovery.img
   - fastboot flash init_boot recovery.img
   - or use the TWRP installer ZIP from within recovery
4. Last resort: flash stock boot/vendor_boot/init_boot from factory images

#### “No OS Installed” Warning
- Often benign. If you did not wipe System/Product/Vendor, try Reboot System.
- If you wiped OS, flash a ROM now or restore a backup.

#### Touch Not Working in Recovery
- Try a different recovery build/version (official vs unofficial)
- Temporarily boot another recovery image
- Navigate with hardware keys meanwhile

#### Recovery Disappears After Reboot
- You didn’t boot to recovery immediately after flashing, or the device restored stock.
- Solution: fastboot boot recovery.img and install from within recovery (installer ZIP or proper partition target).
- Consider installing root (e.g., Magisk) as your next step to manage modifications: [Install root solution](./index.md)

#### Can’t See Internal Storage (Encryption)
- Recovery can’t decrypt your current FBE
- Use ADB sideload/ADB push/OTG
- If necessary, Format Data (data loss)

#### Fastboot/ADB Not Detecting Device
- Windows: reinstall USB drivers; use a rear USB 2.0 port; try another cable
- Linux: set up udev rules; try sudo
- macOS: use Homebrew’s platform-tools; try different cable/port
- Confirm: adb devices, fastboot devices

#### Slot/Active Slot Issues (A/B)
- If boot fails on one slot:
  ```bash
  fastboot getvar current-slot
  fastboot set_active a
  # or
  fastboot set_active b
  ```
  Then reboot.

### Emergency Recovery

1. Bootloader/Fastboot check:
   ```bash
   fastboot devices
   ```
2. Flash stock partitions as needed:
   - Google: fastboot flash from factory images (boot, vendor_boot, init_boot)
   - Xiaomi: Mi Flash Tool + fastboot ROM
   - OnePlus: MSM Download Tool (Qualcomm EDL)
   - Samsung: Odin + stock firmware
3. If recovery is completely broken and no fastboot:
   - Use OEM’s emergency mode/EDL/Download mode with official tools

### Advanced Troubleshooting

- FAILED (remote: ‘Flashing is not allowed’): Bootloader not fully unlocked (some require fastboot flashing unlock_critical)
- Corrupt downloads: Re-download and verify SHA256
- Wrong variant: Double-check device codename and variant (e.g., regional models)
- Persistent bootloops after recovery flash:
  - Restore stock boot/vendor_boot/init_boot, then only “fastboot boot” recovery for operations
  - Check ROM/recovery thread for known issues on your Android version

---

## Next Steps

Recovery installed successfully! Choose your path:

### For Beginners
1. [Install Root](./index.md#️-root-solutions) — Popular root solution
2. Practice with recovery — Backups, ADB sideload, basic mods
3. Read FAQ — Common questions answered: [FAQ](../faqs.md)

### For Advanced Users
1. [Try KernelSU/APatch](./index.md#root-solutions-comparison) — Kernel-based alternatives
2. [Install custom ROM](./custom-rom-installation.md) — Full system replacement

### Need Help?
- [🌐 GitHub](https://github.com/awesome-android-root/awesome-android-root): Contribute to the project's source and development.
- [𝕏 Twitter](https://x.com/awsm_and_root): Stay updated with the latest news and community highlights.
- [Complete FAQ](../faqs.md)
- XDA Forums — Device-specific help and threads

::: tip 🎉 Congratulations!
You’ve installed custom recovery or set up a safe temporary-boot flow. This unlocks serious Android customization. Always back up before major changes, and follow device-specific instructions for best results.
:::