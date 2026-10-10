---
layout: doc
title: Complete custom recovery installation guide
description: "Master guide to install custom recovery - TWRP, OrangeFox, SKYHAWK. Gateway to rooting, custom ROMs, and advanced Android modifications."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.xyz/rooting-guides/how-to-install-custom-recovery
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
      content: https://awesome-android-root.xyz/rooting-guides/how-to-install-custom-recovery
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og.png
  - - meta
    - property: og:locale
      content: en_US
  - - meta
    - property: og:site_name
      content: Awesome Android Root
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
    - name: twitter:site
      content: "@awsm_and_root"
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og.png
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
    - property: article:published_time
      content: 2026-09-27T00:00:00Z
  - - meta
    - property: article:modified_time
      content: 2026-09-27T00:00:00Z
  - - meta
    - name: robots
      content: index, follow
---


# Custom recovery installation guide

Install custom recovery to unlock advanced Android modifications including rooting, custom ROMs, and comprehensive system backups.

## Quick navigation

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

## Understanding custom recovery

Custom recovery replaces Android's stock recovery with enhanced software providing advanced system management capabilities.

### What recovery enables
- Complete device backups (NANDroid)
- Root installation (Magisk, KernelSU, APatch)
- Custom ROM installation
- System-level modifications
- Module and mod installation
- File system access
- ADB sideload support
- System repair tools

### Requirements

Custom recovery requires:
1. **Unlocked bootloader** - [Unlock guide](./how-to-unlock-bootloader.md)
2. **Correct recovery image** - Device-specific
3. **ADB/Fastboot tools** - [Platform Tools](https://developer.android.com/studio/releases/platform-tools)

### Modern vs legacy devices

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

## Choosing recovery software

Three primary custom recovery options exist, each with distinct features.

### TWRP (team win recovery project)

**Most popular and widely supported**

- Broadest device support
- Extensive documentation
- Large community
- Mature, stable codebase
- Basic interface design
- Decryption issues on some newer devices

**Best for:** Most users, maximum compatibility

**Download:** [twrp.me/Devices](https://twrp.me/Devices/)

### OrangeFox recovery

**Modern TWRP-based alternative**

- Material Design interface
- Additional features over TWRP
- Good device support
- Active development
- Smaller device list than TWRP
- Some unofficial builds

**Best for:** Users wanting modern interface on supported devices

**Download:** [orangefox.download](https://orangefox.download/)

### SKYHAWK recovery (SHRP)

**Feature-rich recovery with advanced capabilities**

- Dashboard-style interface
- Built-in security features
- Theme support
- Additional tools
- Limited device support
- Smaller community

**Best for:** Enthusiasts on supported devices

**Download:** [skyhawkrecovery.github.io](https://skyhawkrecovery.github.io/)


> [!NOTE]
>  **💡 Quick Decision Guide**
> - New to custom recovery? → Choose TWRP
> - Want modern interface? → Choose OrangeFox
> - Need advanced features? → Choose SKYHAWK
> - Device not supported? → Check XDA Forums for unofficial builds

---

## Prerequisites

### Critical warnings

::: danger ESSENTIAL REQUIREMENTS
**Unlocked Bootloader** - Custom recovery requires unlocked bootloader. Complete [bootloader unlocking](./how-to-unlock-bootloader.md) first.

**Device Match** - Installing wrong recovery image can brick your device. Verify exact model and codename.

**Data Safety** - While recovery installation shouldn't erase data, always backup important files first.

**Warranty** - Installing custom recovery typically voids manufacturer warranty.
:::

### Essential requirements

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

### Identify your device

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

### Determine partition scheme

**Check if A/B device:**
```bash
adb reboot bootloader
fastboot getvar current-slot
```

If returns "a" or "b": A/B device
If returns error: A-only device

**Check recovery partition:**
```bash
fastboot getvar has-slot:recovery
```

Returns "yes": Dedicated recovery partition
Returns "no": Recovery in boot/vendor_boot/init_boot

### Download correct recovery

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

## Installation guide

Installation method depends on your device's partition scheme. Follow the appropriate path.

### Step 1: preparation

1. Place recovery.img in platform-tools folder

2. Enable USB Debugging on device
   - Settings > Developer Options > USB Debugging

3. Connect device to computer

4. Verify ADB connection:
```bash
adb devices
```

Device should appear in list

### Step 2: boot to fastboot

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

### Step 3: installation methods

Choose method based on your device type:

#### Method A: legacy devices (dedicated recovery partition)

For devices with separate recovery partition (typically Android 9 and older).

**Flash recovery:**
```bash
fastboot flash recovery recovery.img
```

**Reboot to recovery immediately:**
```bash
fastboot reboot recovery
```

Or use hardware keys after flashing to prevent stock recovery restoration.

#### Method B: modern A/B devices (no dedicated recovery)

For devices with A/B partitions and no dedicated recovery (Android 10+).

**Step 1: Boot recovery temporarily**
```bash
fastboot boot recovery.img
```

Device boots to recovery without permanent installation.

**Step 2: Install permanently from recovery**

Option 1: Using installer ZIP
1. Transfer recovery installer ZIP to device
2. In recovery: Install > Select ZIP > Swipe to confirm
3. Reboot to recovery

Option 2: Install to correct partition
1. In recovery: Install > Install Image
2. Select recovery.img file
3. Choose correct partition:
   - Boot (most common)
   - Vendor_Boot (some devices)
   - Init_Boot (Android 13+ GKI devices)
4. Swipe to confirm

**Step 3: Verify installation**
```bash
fastboot reboot recovery
```

Device should boot to custom recovery.

#### Method C: Samsung devices (Odin method)

Samsung devices require Odin tool instead of fastboot.

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

### Step 4: first boot to recovery

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

## Post-installation

### Verify installation

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

### Create backup

::: info CRITICAL FIRST STEP
Create complete backup before making any modifications. This allows safe recovery if something goes wrong.
:::

**Recommended backup partitions:**

Essential:
- Boot (or vendor_boot/init_boot on modern devices)
- Data (contains all user files and apps)

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

### Test essential features

**File access:**
- Check if internal storage visible
- If encrypted and not decrypting: use ADB sideload or OTG

**ADB sideload:**
1. In recovery: Advanced > ADB Sideload
2. On computer: `adb sideload test.zip`

**Mount options:**
- Verify system, data, cache mount correctly
- Check if USB OTG works for external storage

### Handle encryption

Modern devices use File-Based Encryption (FBE) which recovery may not decrypt.

**If storage appears encrypted:**

Option 1: Use ADB
```bash
adb push file.zip /sdcard/
```

Option 2: Use OTG storage
- Connect USB drive via OTG adapter
- Install from OTG in recovery

Option 3: Format data (last resort)
- Removes encryption and all data
- Wipe > Format Data
- Type "yes" to confirm
- Complete data loss

---

## Essential operations

### Installing ZIP files

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

### Managing backups

**Create backup:**
- Backup > Select partitions > Swipe to confirm
- Store in safe location off-device

**Restore backup:**
- Restore > Select backup > Choose partitions > Swipe to confirm
- Device returns to backed up state

**Delete old backups:**
- Use recovery file manager or ADB
- Free up storage space regularly

### Wiping operations

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

## Modern device considerations

### A/B partition scheme

**Characteristics:**
- Two system slots (A and B)
- A/B OTA updates
- No dedicated recovery partition
- Recovery in boot/vendor_boot/init_boot

**Implications:**
- Must use temporary boot or installer ZIP
- OTA updates may remove custom recovery
- Need to reinstall after updates

**Check active slot:**
```bash
fastboot getvar current-slot
```

**Switch slots if needed:**
```bash
fastboot set_active a
# or
fastboot set_active b
```

### Dynamic partitions

**Characteristics:**
- Flexible partition sizing
- Super partition contains system, vendor, product
- Introduced in Android 10

**Implications:**
- Larger backup sizes
- Different flashing procedures
- Some recoveries may not fully support

### Android verified boot (AVB)

**With unlocked bootloader:**
- AVB verification disabled
- Custom recovery and modifications allowed
- No need to flash vbmeta typically

**If issues occur:**
- Check device-specific instructions
- Some devices may need vbmeta modifications

### Fastbootd mode

**Userspace fastboot for dynamic partitions:**

Enter fastbootd:
```bash
fastboot reboot fastboot
```

Used for:
- Flashing dynamic partitions
- Some ROM installations
- Not typically needed for recovery

### GKI devices (generic kernel image)

**Android 12+ devices with GKI:**
- Recovery may be in init_boot partition
- Check device instructions carefully
- Use appropriate partition for flashing

---

## Troubleshooting

### Recovery won't boot

**Symptoms:** Device stuck on logo or bootloops after recovery flash

**Solutions:**

1. Boot recovery temporarily to test:
```bash
fastboot boot recovery.img
```

2. Verify correct recovery for your device and Android version

3. Flash to correct partition (check device instructions):
```bash
fastboot flash boot recovery.img
# or
fastboot flash vendor_boot recovery.img
# or
fastboot flash init_boot recovery.img
```

4. Restore stock image:
```bash
fastboot flash boot stock_boot.img
```

### Recovery disappears after reboot

**Cause:** Device restored stock recovery on first normal boot

**Solution:**

Boot to custom recovery immediately after flashing:
```bash
fastboot reboot recovery
```

Or install root solution (Magisk) which prevents restoration.

### Touch not working

**Solutions:**

1. Try different recovery version (newer or older)
2. Use hardware buttons to navigate
3. Check device page for known touch issues
4. Try alternative recovery (OrangeFox if using TWRP)

### Cannot see internal storage

**Cause:** Recovery cannot decrypt device encryption

**Solutions:**

Option 1: Use ADB sideload
```bash
adb sideload file.zip
```

Option 2: Use OTG storage
- Connect USB drive
- Install from OTG

Option 3: Format Data (data loss)
- Wipe > Format Data
- Type "yes" to confirm
- Removes encryption and all data

### Fastboot not detecting device

**Solutions:**

1. Install/reinstall USB drivers (Windows)
2. Try USB 2.0 port instead of 3.0
3. Use different USB cable
4. Run as administrator (Windows)
5. Check device appears: `fastboot devices`

### "No os installed" warning

**Cause:** Recovery detects no operating system

**If you didn't wipe system:**
- Warning is false positive
- Reboot System should work

**If you wiped system:**
- Install custom ROM now
- Or restore from backup
- Device won't boot without OS

### Slot issues (A/B devices)

**Boot fails after recovery installation:**

Check active slot:
```bash
fastboot getvar current-slot
```

Try other slot:
```bash
fastboot set_active a
fastboot reboot
```

Or:
```bash
fastboot set_active b
fastboot reboot
```

### Installation errors

**"Remote: Flashing not allowed"**
- Bootloader not fully unlocked
- Some devices need: `fastboot flashing unlock_critical`

**"Remote: Partition doesn't exist"**
- Wrong partition name for your device
- Check device-specific instructions

**"Failed to flash"**
- Corrupt download - redownload recovery
- Wrong recovery variant for device
- USB connection issue - try different port/cable

---

## Emergency recovery

### Device won't boot to any mode

1. Try emergency download mode (varies by manufacturer):
   - Qualcomm: EDL mode (test point or special key combo)
   - Samsung: Download mode (Volume Down + Power)
   - Xiaomi: EDL mode (Volume Down + Power while connecting)

2. Use manufacturer unbrick tools:
   - Google: Flash full factory image
   - Samsung: Odin with stock firmware
   - Xiaomi: Mi Flash Tool
   - OnePlus: MSM Download Tool

3. Seek device-specific help on XDA Forums

### Backup bootloader access

**Always maintain ability to:**
- Boot to fastboot/bootloader
- Boot to download/EDL mode
- Flash stock firmware

**Keep downloaded:**
- Stock firmware for your device
- Emergency flashing tools
- Device drivers

---

## Next steps

Custom recovery successfully installed. Choose your path forward:

### For rooting

**Install root solution:**
- [Magisk Guide](./magisk-guide.md) - Most popular, extensive modules
- [KernelSU Guide](./kernelsu-guide.md) - Kernel-based, better hiding
- [APatch Guide](./apatch-guide.md) - Alternative approach

**Essential root apps:**
- [Root Apps Collection](../apps-and-modules/) - Curated list of root apps

### For custom ROMs

**Install custom ROM:**
- [Custom ROM Installation Guide](./custom-rom-installation.md) - Complete process
- LineageOS, Pixel Experience, Paranoid Android, etc.

### For learning

**Practice operations:**
- Create and restore backups
- Install simple mods
- Learn ADB sideload
- Experiment safely with backups

### For support

**Get help:**
- [FAQ](../faqs.md) - Common questions
- [Troubleshooting Guide](../troubleshooting.md)
- [XDA Forums](https://forum.xda-developers.com/) - Device-specific help
- [GitHub Issues](https://github.com/awesome-android-root/awesome-android-root/issues) - Report problems

---

## Additional resources

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

---

## Safety reminders

**Before making changes:**
- Create complete backup
- Verify you have correct files
- Understand what you're doing
- Have recovery plan ready

**When experimenting:**
- Start with small changes
- Test one thing at a time
- Keep backups current
- Document what you do

### If problems occur:
- [🌐 GitHub](https://github.com/awesome-android-root/awesome-android-root): Contribute to the project's source and development.
- [𝕏 Twitter](https://x.com/awsm_and_root): Stay updated with the latest news and community highlights.
- [Complete FAQ](../faqs.md)
- XDA Forums - Device-specific help and threads

---

::: info Congratulations!
You’ve installed custom recovery or set up a safe temporary-boot flow. Always back up before major changes, and follow device-specific instructions for best results.
:::
