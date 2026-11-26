---
layout: doc
title: Custom Recovery Installation Guide
description: "Master guide to install custom recovery - TWRP, OrangeFox, SKYHAWK. Gateway to rooting, custom ROMs, and advanced Android modifications."
head:
  - - meta
    - property: og:title
      content: Custom Recovery Installation Guide - TWRP & More
  - - meta
    - property: og:description
      content: Install custom recovery with our comprehensive guide covering TWRP, OrangeFox, and SKYHAWK for Android rooting and ROM installation.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/custom-recovery.png
  - - meta
    - name: twitter:title
      content: Custom Recovery Installation Guide
  - - meta
    - name: twitter:description
      content: Install TWRP, OrangeFox, and SKYHAWK custom recovery for Android rooting and customization.
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/custom-recovery.png
  - - meta
    - name: twitter:image:alt
      content: Custom Recovery Installation Guide - TWRP, OrangeFox, SKYHAWK
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


# Custom Recovery Installation Guide

Install custom recovery to unlock advanced Android modifications including rooting, custom ROMs, and comprehensive system backups.

## Quick Navigation

- [Understanding Custom Recovery](#understanding-custom-recovery)
- [Recovery Options](#choosing-recovery-software)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-guide)
- [Post-Installation](#post-installation)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Complete rooting overview
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Required first step
- [Magisk Installation](./magisk-guide.md) - Root with custom recovery
- [FAQ](../faqs.md) - Common issues and solutions

---

## Understanding Custom Recovery

Custom recovery replaces Android's stock recovery with enhanced software providing advanced system management capabilities.

### What Recovery Enables
- ⚡ Complete device backups (NANDroid)
- ⚡ Root installation (Magisk, KernelSU, APatch)
- ⚡ Custom ROM installation
- ⚡ System-level modifications
- ⚡ Module and mod installation
- ⚡ File system access
- ⚡ ADB sideload support
- ⚡ System repair tools

### Requirements

Custom recovery requires:
1. **Unlocked bootloader** - [Unlock guide](./how-to-unlock-bootloader.md)
2. **Correct recovery image** - Device-specific
3. **ADB/Fastboot tools** - [Platform Tools](https://developer.android.com/studio/releases/platform-tools)

### Modern vs Legacy Devices

**Legacy Devices (Android 9 and older):**
- Dedicated recovery partition exists
- Simple fastboot flash process
- Recovery persists easily

**Modern Devices (Android 10+):**
- A/B partition scheme (dual slots)
- Dynamic partitions (no dedicated recovery)
- Recovery embedded in boot/vendor_boot/init_boot
- Requires temporary boot or installer ZIP method

---

## Choosing Recovery Software

Three primary custom recovery options exist, each with distinct features.

### TWRP (Team Win Recovery Project)

**Most popular and widely supported**

- ✅ Broadest device support
- ✅ Extensive documentation
- ✅ Large community
- ✅ Mature, stable codebase
- ❌ Basic interface design
- ❌ Decryption issues on some newer devices

**Best for:** Most users, maximum compatibility

**Download:** [twrp.me/Devices](https://twrp.me/Devices/)

### OrangeFox Recovery

**Modern TWRP-based alternative**

- ✅ Material Design interface
- ✅ Additional features over TWRP
- ✅ Good device support
- ✅ Active development
- ❌ Smaller device list than TWRP
- ❌ Some unofficial builds

**Best for:** Users wanting modern interface on supported devices

**Download:** [orangefox.download](https://orangefox.download/)

### SKYHAWK Recovery (SHRP)

**Feature-rich recovery with advanced capabilities**

- ✅ Dashboard-style interface
- ✅ Built-in security features
- ✅ Theme support
- ✅ Additional tools
- ❌ Limited device support
- ❌ Smaller community

**Best for:** Enthusiasts on supported devices

**Download:** [skyhawkrecovery.github.io](https://skyhawkrecovery.github.io/)


> [!TIP]
>  **💡 Quick Decision Guide**
> - New to custom recovery? → Choose TWRP
> - Want modern interface? → Choose OrangeFox
> - Need advanced features? → Choose SKYHAWK
> - Device not supported? → Check XDA Forums for unofficial builds

---

## Prerequisites

### Critical Warnings

::: danger ⚠️ ESSENTIAL REQUIREMENTS
- **Device-specific images:** verify the exact model, regional variant, firmware and supported recovery build. A similar codename is not enough.
- **Boot failure and damage:** flashing the wrong image or partition can prevent booting or require device-specific recovery. Keep matching stock firmware and a tested recovery plan off-device.
- **Partition layout:** modern devices may have no dedicated recovery partition. `boot`, `vendor_boot` and `init_boot` are not interchangeable recovery targets.
- **Data loss:** bootloader unlocking normally wipes user data. Complete the [bootloader guide](./how-to-unlock-bootloader.md) and [preparation checklist](./index.md#prerequisites-and-safety) first; back up before unlocking or flashing.
:::

### Essential Requirements

**Hardware**
- Android device with unlocked bootloader
- 50% or higher battery charge
- Quality USB cable (data-capable)
- Computer (Windows, macOS, or Linux)

**Software**
- [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) (latest version)
- Device-specific USB drivers (Windows only)
- Custom recovery image for your exact device
- Stock firmware backup (emergency recovery)

**Knowledge**
- Device model and codename
- Partition scheme (A/B or A-only)
- Basic command line usage

### Identify Your Device

**Find device codename:**

Method 1: ADB command
```bash
adb shell getprop ro.product.device
```

Method 2: Device information
- Settings > About Phone > Model
- Compare with device page on recovery website

Method 3: CPU-Z app
- Install CPU-Z from Play Store
- Check "Device" tab for codename

### Determine Partition Scheme

Use the recovery maintainer's device page to establish the installation method and partition layout. Android version or A/B support alone cannot determine the recovery partition.

```bash
fastboot getvar current-slot
```

A supported response reports the selected slot. An error does **not** prove the device is A-only. Likewise, `has-slot:recovery` reports whether that partition is slotted, not whether a recovery partition exists. Do not use either result to choose a flash target.

### Download Correct Recovery

1. Visit recovery website (TWRP, OrangeFox, or SKYHAWK)
2. Search for your device codename
3. Download latest version for your Android version
4. Verify SHA256 checksum if provided

**Verify download (optional but recommended):**

Windows PowerShell:
```powershell
Get-FileHash recovery.img -Algorithm SHA256
```

Linux/macOS:
```bash
shasum -a 256 recovery.img
```

---

## Installation Guide

Use only the installation method documented for the exact device and recovery build. The examples below are conditional, not alternative partitions to try.

### Step 1: Preparation

1. Place recovery.img in platform-tools folder

2. Enable USB Debugging on device
   - Settings > Developer Options > USB Debugging

3. Connect device to computer

4. Verify ADB connection:
```bash
adb devices
```

Device should appear in list

### Step 2: Boot to Fastboot

**Method 1: ADB command (recommended)**
```bash
adb reboot bootloader
```

**Method 2: Hardware keys**
- Power off device
- Hold Power + Volume Down (varies by manufacturer)

**Verify fastboot connection:**
```bash
fastboot devices
```

Device serial should appear

### Step 3: Installation Methods

Choose method based on your device type:

#### Method A: Legacy Devices (Dedicated Recovery Partition)

Only for a device whose recovery maintainer explicitly documents a dedicated `recovery` partition and the following fastboot method. Back up first; flashing an image for another device or partition can prevent booting.

**Flash recovery:**
```bash
fastboot flash recovery recovery.img
```

**Reboot to recovery immediately:**
```bash
fastboot reboot recovery
```

Or use hardware keys after flashing to prevent stock recovery restoration.

#### Method B: Modern A/B Devices (No Dedicated Recovery)

1. Verify that the recovery project officially supports the **exact device, firmware and recovery build** you intend to use. Read its device page and known limitations, including encryption support.
2. Follow that build's installation instructions. They may specify temporary boot, an installer ZIP or a particular boot-related image; A/B support does not determine which method applies. If the device instead has a dedicated recovery partition, use its documented method rather than this assumed layout.
3. Only boot an image or flash a partition **explicitly named by the recovery maintainer**. Do not try `boot`, `vendor_boot` or `init_boot` as alternatives, and do not infer the destination from Android version or GKI status.
4. Follow the documented first-boot sequence and verify recovery before further changes. Keep the original images for all affected partitions and slots available off-device.

::: danger NO GENERIC FALLBACK
If no supported installation method exists for your exact device and build, stop. Do not flash a recovery image into a boot-critical partition to experiment.
:::

#### Method C: Samsung Devices (Odin Method)

Use this path only if the recovery maintainer documents Odin installation for the exact Samsung model and firmware. Confirm unlock eligibility, the required TAR package and Download Mode sequence in that device guide before proceeding.

**Requirements:**
- Odin tool (Windows only)
- Recovery in .tar format
- Samsung USB drivers

**Steps:**

1. Download Odin from XDA or Samsung Firmware websites

2. Boot to Download Mode:
   - Power off device
   - Hold Volume Down + Power (or Volume Down + Bixby + Power)
   - When warning appears, press Volume Up

3. Connect device to computer

4. Open Odin

5. Click "AP" button and select recovery .tar file

6. Uncheck "Auto Reboot" option

7. Click "Start" button

8. When "PASS" appears, manually reboot to recovery:
   - Hold Volume Up + Power while connected

**Note:** Samsung Knox will permanently trip. Cannot be reversed.

### Step 4: First Boot to Recovery

**Critical:** Boot to custom recovery immediately after installation to prevent stock recovery restoration on some devices.

**Boot methods:**

Fastboot command:
```bash
fastboot reboot recovery
```

Hardware keys (common combinations):
- Power + Volume Up
- Power + Volume Up + Bixby (Samsung)
- Power + Volume Down (some OnePlus)

Verify recovery loaded correctly with touch interface working.

---

## Post-Installation

### Verify Installation

**Check recovery features:**
- Touch interface responds
- Storage accessible (or shows encrypted)
- Main menu displays correctly
- Device information shows custom recovery version

**Test ADB access:**

In recovery, enable ADB sideload or check:
```bash
adb devices
```

Should show device in recovery mode.

### Create Backup

::: tip CRITICAL FIRST STEP
Back up before making modifications, and verify what the recovery can actually restore on your device. A recovery backup is not a substitute for exact-build stock firmware and an off-device copy of personal files.
:::

**Recommended backup partitions:**

Essential:
- Original images for the partitions identified by the device maintainer (not interchangeable targets)
- Data, only where the recovery supports backup/restore. Internal shared storage (`/data/media`, including photos and downloads) is commonly excluded and must be copied separately.

Important:
- EFS/Modem (IMEI and carrier data)
- Persist (sensor calibration)

Optional:
- System (large, can be restored from ROM)
- Vendor (usually included with ROM)

**Create backup in recovery:**

1. Select "Backup" in recovery main menu
2. Choose partitions to backup
3. Swipe to begin backup
4. Wait for completion (Data backup can be large and slow)

**Transfer backup off-device:**

Using ADB:
```bash
adb pull /sdcard/TWRP/BACKUPS/ backup_folder/
```

Or connect USB and copy via file manager.

**Store backup safely:**
- External hard drive
- Cloud storage
- Multiple locations recommended

### Test Essential Features

**File access:**
- Check if internal storage visible
- If encrypted and not decrypting: use ADB sideload or OTG

**ADB sideload:**
1. In recovery: Advanced > ADB Sideload
2. On computer: `adb sideload test.zip`

**Mount options:**
- Verify system, data, cache mount correctly
- Check if USB OTG works for external storage

### Handle Encryption

Modern devices use File-Based Encryption (FBE) which recovery may not decrypt.

**If storage appears encrypted:**

Option 1: Use ADB
```bash
adb push file.zip /sdcard/
```

Option 2: Use OTG storage
- Connect USB drive via OTG adapter
- Install from OTG in recovery

Option 3: Format Data only if the exact-device installation instructions require it
- **Erases user data**, including internal storage; back up off-device first
- Recreates the data filesystem; it does not guarantee that recovery will support the device's encryption afterward
- Do not format merely to test whether decryption starts working

---

## Essential Operations

### Installing ZIP Files

**Method 1: From internal storage**

1. Copy ZIP to device internal storage
2. In recovery: Install
3. Navigate to ZIP file
4. Swipe to confirm installation
5. Reboot when complete

**Method 2: ADB sideload**

1. In recovery: Advanced > ADB Sideload
2. On computer:
```bash
adb sideload file.zip
```
3. Wait for installation completion
4. Reboot System

**Method 3: OTG storage**

1. Connect USB drive via OTG
2. In recovery: Install
3. Select "USB OTG" storage
4. Navigate to ZIP
5. Swipe to confirm

### Managing Backups

**Create backup:**
- Backup > Select partitions > Swipe to confirm
- Store in safe location off-device

**Restore backup:**
- Restore > Select backup > Choose partitions > Swipe to confirm
- Device returns to backed up state

**Delete old backups:**
- Use recovery file manager or ADB
- Free up storage space regularly

### Wiping Operations

**Factory reset:**
- Wipe > Factory Reset
- Clears data but keeps internal storage on most devices

**Advanced wipe:**
- Wipe > Advanced Wipe
- Select specific partitions:
  - Cache (safe, clears temporary files)
  - Dalvik/ART Cache (safe, rebuilds on boot)
  - Data (removes all apps and settings)
  - System (removes operating system)

::: danger WIPE WARNINGS
**System Wipe** - Removes your operating system. Have ROM ready to install.

**Data Wipe** - Removes all apps, settings, and files.

**Format Data** - Removes encryption and all data. Requires device setup from scratch.
:::

---

## Modern Device Considerations

### A/B Partition Scheme

A/B devices have two boot slots, but recovery placement and persistence depend on the device. Some have a dedicated recovery partition and others integrate recovery into boot-related images. Use the maintainer's method, including any required OTA reinstall procedure.

```bash
fastboot getvar current-slot
```

Record the selected slot before changes. Do not switch slots to experiment: the other slot may contain incompatible firmware or an incomplete update.

### Dynamic Partitions

**Characteristics:**
- Flexible partition sizing
- Super partition contains system, vendor, product
- Introduced in Android 10

**Implications:**
- Larger backup sizes
- Different flashing procedures
- Some recoveries may not fully support

### Android Verified Boot (AVB)

An unlocked bootloader does not mean every AVB or rollback check is disabled. Only modify `vbmeta` or verification settings when the exact-device instructions explicitly require it. Do not relock with unsupported custom images.

### Fastbootd Mode

**Userspace fastboot for dynamic partitions:**

Enter fastbootd:
```bash
fastboot reboot fastboot
```

Used for:
- Flashing dynamic partitions
- Some ROM installations
- Not typically needed for recovery

### GKI Devices (Generic Kernel Image)

GKI status does not establish a recovery installation target. A separate `init_boot` can hold a generic ramdisk, but its presence does not authorize flashing a recovery image there. Follow the recovery's device-specific instructions.

---

## Troubleshooting

### Recovery Won't Boot

Stop flashing and compare the image, firmware, partition and slot with the recovery maintainer's instructions. Do not try the same image on another partition. Temporary boot is an option only if the exact recovery build explicitly supports it.

Restore the original images for the affected partitions and slots using the device's documented restore procedure. Samsung devices may require a full firmware restore rather than individual images. See [emergency recovery](../troubleshooting.md#emergency-recovery) if the documented restore path is unavailable.

### Recovery Disappears After Reboot

**Cause:** Device restored stock recovery on first normal boot

**Solution:**

Boot to custom recovery immediately after flashing:
```bash
fastboot reboot recovery
```

Use only the recovery maintainer's documented persistence method; installing Magisk is not a universal solution.

### Touch Not Working

**Solutions:**

1. Try different recovery version (newer or older)
2. Use hardware buttons to navigate
3. Check device page for known touch issues
4. Try alternative recovery (OrangeFox if using TWRP)

### Cannot See Internal Storage

**Cause:** Recovery cannot decrypt device encryption

**Solutions:**

Option 1: Use ADB sideload
```bash
adb sideload file.zip
```

Option 2: Use OTG storage
- Connect USB drive
- Install from OTG

Option 3: Format Data only when required by the exact-device guide
- **Erases user data and internal storage**; back up off-device first
- Not a generic solution for unsupported recovery decryption

### Fastboot Not Detecting Device

**Solutions:**

1. Install/reinstall USB drivers (Windows)
2. Try USB 2.0 port instead of 3.0
3. Use different USB cable
4. Run as administrator (Windows)
5. Check device appears: `fastboot devices`

### "No OS Installed" Warning

**Cause:** Recovery detects no operating system

**If you didn't wipe system:**
- Warning is false positive
- Reboot System should work

**If you wiped system:**
- Install custom ROM now
- Or restore from backup
- Device won't boot without OS

### Slot Issues (A/B Devices)

Record `fastboot getvar current-slot` and compare it with the slot used by the documented installer. Do not blindly activate the other slot: it may have mismatched firmware or an incomplete OTA. Follow the exact-device recovery procedure to restore a consistent set of images.

### Installation Errors

**"Remote: Flashing not allowed"**
- Bootloader not fully unlocked
- Do not unlock additional critical partitions as a generic fix; check the exact-device requirements

**"Remote: Partition doesn't exist"**
- Wrong partition name for your device
- Check device-specific instructions

**"Failed to flash"**
- Corrupt download - redownload recovery
- Wrong recovery variant for device
- USB connection issue - try different port/cable

---

## Emergency Recovery

### Device Won't Boot to Any Mode

Follow the manufacturer's exact-model recovery procedure or seek authorized service. Download Mode, EDL access and restore-tool eligibility vary by chipset, model and authorization; there is no universal key combination or unbrick tool. Do not short test points or flash a loader from another model based on a generic guide.

See [emergency recovery](../troubleshooting.md#emergency-recovery) and your [manufacturer guide](./index.md#device-specific-guides) for the next step.

### Backup Bootloader Access

**Always maintain ability to:**
- Boot to fastboot/bootloader
- Boot to download/EDL mode
- Flash stock firmware

**Keep downloaded:**
- Stock firmware for your device
- Emergency flashing tools
- Device drivers

---

## Additional Resources

**Official Recovery Sites:**
- [TWRP](https://twrp.me/) - Official TWRP site
- [OrangeFox](https://orangefox.download/) - OrangeFox downloads
- [SKYHAWK](https://skyhawkrecovery.github.io/) - SKYHAWK recovery

**Community Resources:**
- [XDA Developers](https://forum.xda-developers.com/) - Device-specific guides
- [Reddit r/AndroidRoot](https://www.reddit.com/r/androidroot/) - Community support

**Related Guides:**
- [Main Rooting Guide](./index.md) - Complete overview
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Required prerequisite
- [Root Framework Comparison](./root-framework-comparison.md) - Choose root method
- [Root apps and modules](../apps-and-modules/) - Browse tools by task
- [Custom ROM Installation](./custom-rom-installation.md) - Optional operating-system replacement

---

## Safety Reminders

- Back up first, verify the image and device, and keep a recovery plan.
- Make one change at a time, test it, and record what changed.
- If recovery fails, consult the [troubleshooting guide](../troubleshooting.md), [FAQ](../faqs.md), or your device's [XDA forum](https://forum.xda-developers.com/).
