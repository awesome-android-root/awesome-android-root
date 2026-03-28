---
layout: doc
title: Troubleshooting Guide
description: "Step-by-step diagnostic procedures for Android rooting problems including bootloops, detection issues, and installation failures organized by root method."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/troubleshooting
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:site_name
      content: Awesome Android Root
  - - meta
    - property: og:title
      content: Android Root Troubleshooting Guide - Fix Bootloops, Detection & Installation Errors
  - - meta
    - property: og:description
      content: Step-by-step diagnostic procedures for Android rooting problems including bootloops, detection issues, and installation failures organized by root method.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/troubleshooting
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og.png
  - - meta
    - property: og:image:secure_url
      content: https://awesome-android-root.org/images/og.png
  - - meta
    - property: og:image:alt
      content: Android Root Troubleshooting Guide - Fix Common Rooting Issues
  - - meta
    - property: og:image:width
      content: '1200'
  - - meta
    - property: og:image:height
      content: '630'
  - - meta
    - property: og:image:type
      content: image/png
  - - meta
    - property: og:locale
      content: en_US
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:site
      content: "@awsm_and_root"
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: Android Root Troubleshooting Guide - Fix Bootloops & Errors
  - - meta
    - name: twitter:description
      content: Comprehensive solutions for Android rooting problems - bootloops, detection issues, installation failures organized by root method.
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.org/images/og.png
  - - meta
    - name: twitter:image:alt
      content: Root Troubleshooting Guide - Fix Bootloops and Installation Errors
  - - meta
    - name: keywords
      content: android bootloop fix, magisk troubleshooting, root detection fix, installation errors, kernelsu problems, recovery mode android
  - - meta
    - name: robots
      content: index, follow
---


# Root Troubleshooting Guide

**Comprehensive solutions** for common rooting problems organized by root method and failure type with step-by-step diagnostic procedures.

:::danger Emergency First
If your device won't boot, jump to [Emergency Recovery](#emergency-recovery) immediately.
:::

## Quick Navigation

### Emergency Issues
- [Device Won't Boot (Bootloop)](#device-wont-boot-bootloop)
- [Root Not Working](#root-not-working)
- [Bricked Device Recovery](#bricked-device-recovery)

### Root Method Issues
- [Magisk Troubleshooting](#magisk-troubleshooting)
- [KernelSU Troubleshooting](#kernelsu-troubleshooting)
- [APatch Troubleshooting](#apatch-troubleshooting)

### Specific Problems
- [Bootloader and Fastboot Issues](#bootloader-and-fastboot-issues)
- [OTA Update Problems](#ota-update-problems)
- [Play Integrity and Banking Apps](#play-integrity-and-banking-apps)
- [App Detection and Compatibility](#app-detection-and-compatibility)
- [Device-Specific Issues](#device-specific-issues)
- [Performance and Optimization](#performance-and-optimization)

---

## Emergency Recovery

### Device Won't Boot (Bootloop)

**Symptoms:** Device stuck on boot logo, loops endlessly, or only boots to recovery/fastboot.

**Immediate Actions:**

1. **Try Magisk Safe Mode** (if Magisk installed)
   - Hold Volume Down during early boot to trigger module safe mode (timing varies by device/Magisk build)
   - If accessible via recovery/adb:
     ```bash
     adb shell magisk --remove-modules
     # Or manually
     adb shell rm -rf /data/adb/modules/*
     adb reboot
     ```

2. **Boot to Recovery/Bootloader**
   - Power + Volume combo varies by device:
     - **Pixel:** Power + Volume Down, select Recovery
     - **Samsung:** Power + Volume Up (+ Bixby on older models) while USB connected
     - **Xiaomi:** Power + Volume Up
     - **OnePlus:** Power + Volume Down
     - **Most others:** Power + Volume Up (recovery), Power + Volume Down (bootloader)
   - Detailed instructions: [Custom Recovery Installation](./rooting-guides/how-to-install-custom-recovery.md)

3. **Wipe Dalvik/ART Cache**
   - Custom recovery: Wipe → Advanced wipe → Dalvik/ART cache + Cache
   - Stock recovery: "Wipe cache partition" (if available on your device)

4. **Undo Last Change**
   - Remove the last module/kernel/ROM you flashed
   - Restore last NANDroid backup if available

**Advanced Recovery Steps:**

1. **If Custom Recovery Installed (TWRP/OrangeFox)**

   **Option A: Remove last installed module**
   ```bash
   # Boot to TWRP
   # Mount system and data partitions
   # Open Terminal
   
   # List Magisk modules
   ls /data/adb/modules
   
   # Remove problematic module
   rm -rf /data/adb/modules/[module-name]
   
   # Reboot
   ```

   **Option B: Disable all modules**
   ```bash
   # In TWRP Terminal
   touch /data/adb/magisk/disable
   # Or
   touch /data/adb/modules/disable
   
   # Reboot
   ```

   **Option C: Restore backup**
   - TWRP → Restore → Select recent backup
   - Restore boot, system, data partitions
   - Reboot

2. **Flash Correct Stock/Patched Image**
   
   **For Android 13+ devices** (Pixel 7/8/9/10, some Samsung/OnePlus/Xiaomi):
   - Patch/flash `init_boot.img` (not boot.img)
   
   **For older devices:**
   - Patch/flash `boot.img`
   
   **Commands (A/B devices):**
   ```bash
   # Enter bootloader/fastboot mode
   adb reboot bootloader
   fastboot devices
   
   # Flash patched image to both slots
   fastboot flash init_boot_a magisk_patched.img
   fastboot flash init_boot_b magisk_patched.img
   fastboot reboot
   ```
   
   **Return to stock:**
   ```bash
   fastboot flash init_boot stock_init_boot.img
   # Or for older devices
   fastboot flash boot stock_boot.img
   fastboot reboot
   ```

3. **Flash Full Stock Firmware**
   - **Pixel:** Use [Android Flash Tool](https://flash.android.com) (web) or factory image scripts ([guide](./rooting-guides/how-to-root-pixel-phone.md))
   - **Samsung:** Odin with full firmware (AP/BL/CP/CSC). Use HOME_CSC to preserve data ([guide](./rooting-guides/how-to-root-samsung-phone.md))
   - **Xiaomi/POCO/Redmi:** Mi Flash Tool with fastboot ROM - beware Anti-Rollback ([guide](./rooting-guides/how-to-root-xiaomi-phone.md))
   - **OnePlus:** MSMDownloadTool or fastboot packages ([guide](./rooting-guides/how-to-root-oneplus-phone.md))
   - More device guides: [All rooting guides](./rooting-guides/)

4. **Factory Reset (Last Resort)**
   - Stock recovery: Wipe data/factory reset
   - Fastboot: `fastboot -w` then `fastboot reboot`
   - **Warning:** Erases all user data

**Emergency Commands Reference:**

```bash
# Reboot to different modes
adb reboot bootloader
adb reboot recovery
fastboot reboot fastboot   # userspace fastboot (fastbootd) for dynamic partitions

# Boot recovery without flashing
fastboot boot recovery.img

# Disable all Magisk modules
adb shell magisk --remove-modules

# Flash original images
fastboot flash boot stock_boot.img
fastboot flash init_boot stock_init_boot.img

# Switch active slot (A/B devices)
fastboot getvar current-slot
fastboot set_active a    # or b

# Full wipe
fastboot -w
```

**Pro Tips:**
- Always keep a copy of stock boot/init_boot images
- On A/B devices, use Magisk's "Install to Inactive Slot (After OTA)"
- Don't mix images from different builds
- Build fingerprint must match

---

### Root Not Working

**Symptoms:** Apps report "no root," superuser prompts don't appear, or manager shows N/A.

**Basic Verification:**

1. **Check Root Manager Status**
   - **Magisk:** App should show version numbers. "Installed" should display. If N/A, installation failed
   - **KernelSU:** App shows kernel supported/enabled. If unsupported, flash KSU-enabled kernel
   - **APatch:** App shows KernelPatch status. Check SuperKey configuration
   - Test with a simple root checker app or Termux + `su`

2. **Verify Correct Image**
   ```bash
   adb shell su -c "echo Root works"
   ```
   If "su: not found" → root not installed

**Solutions by Root Method:**

**Magisk:**

1. **Reinstall to Current Slot**
   - Download latest Magisk APK (v30.7 as of February 2026) from [official GitHub](https://github.com/topjohnwu/Magisk/releases)
   - Open → Install → Direct Install (or "Install to Inactive Slot" after OTA)
   - Reboot
   - See [complete Magisk guide](./rooting-guides/magisk-guide.md) for detailed instructions

2. **Ensure Correct Target Image**
   - **Android 13+:** Patch `init_boot.img` (not boot.img)
   - **Older devices:** Patch `boot.img`
   - Extract from your exact firmware build

3. **Enable Zygisk (if needed)**
   - Settings → Enable Zygisk
   - Configure DenyList for apps that mustn't see root
   - Reboot after changes

4. **Check Module Conflicts**
   - Disable all modules and re-enable one at a time
   - See [Emergency Recovery](#emergency-recovery)

5. **Android 16 QPR2 Compatibility**
   - Magisk now supports the new sepolicy binary format introduced in Android 16 QPR2. Ensure you are on the latest stable release (v30.7+) if running Android 16.
   - Magisk 30.7 was released with support for Android 16 QPR2; if you updated your firmware recently, update Magisk before re-patching.

**KernelSU:**
- KernelSU officially supports Android GKI 2.0 devices (kernel 5.10+). Older kernels (4.14+) are also supported, but the kernel will need to be built manually.
- Match kernel to your ROM/firmware version and vendor partition
- Use official KernelSU Manager
- KernelSU now provides LKM modules for kernels up through android16-6.12
- See [complete KernelSU guide](./rooting-guides/kernelsu-guide.md) for installation help

**APatch:**
- APatch is a universal root solution for Android kernel versions 3.18 – 6.12
- Do not run APatch together with Magisk or KernelSU on the same active slot. Use one root stack at a time.
- Follow [official APatch guide](./rooting-guides/apatch-guide.md) for your device/ROM

**Clean Re-install (Magisk):**

```bash
# Method A: Patch and flash
# 1) Extract correct image (boot.img or init_boot.img) from current firmware
# 2) Patch with Magisk on-device
# 3) Flash with fastboot to both slots if A/B

fastboot flash init_boot_a magisk_patched.img
fastboot flash init_boot_b magisk_patched.img
fastboot reboot
```

**Method B: Recovery flash** (legacy devices with custom recovery)
- Boot to TWRP/OrangeFox
- Flash Magisk ZIP/APK (rename .apk to .zip)
- Reboot and install Magisk app if needed

---

### Bricked Device Recovery

**Determine Brick Type:**

- **Soft brick (recoverable):** Can reach fastboot/download/recovery; device shows signs of life. High recovery chance
- **Hard brick:** No response, no LEDs, not detected by PC. Recovery depends on SoC; professional help may be required

**Soft Brick Recovery:**

1. **Enter Recovery/Bootloader**
   - Try all key combinations (see [Device Won't Boot](#device-wont-boot-bootloop))

2. **Flash Stock Firmware**
   - **Pixel:** Factory images/Android Flash Tool
   - **Samsung:** Odin with full firmware. Use HOME_CSC to preserve data. KNOX 0x1 is permanent once bootloader unlocked
   - **Xiaomi:** Mi Flash Tool with fastboot ROM. Beware Anti-Rollback (ARB)
   - **OnePlus:** MSMDownloadTool or fastboot packages

3. **Factory Reset if System Corrupted**
   ```bash
   fastboot -w
   fastboot reboot
   ```

**Hard Brick Options:**

Recovery options vary by SoC/manufacturer:
- **Qualcomm EDL (9008):** Requires test points or special cable; many devices require authorized accounts
- **OnePlus MSM tools:** Full unbrick to factory state (legacy models)
- **Samsung Smart Switch Emergency Recovery:** Limited success, model-dependent
- **Professional services:** JTAG/ISP/board-level repair for valuable devices

**Prevention:**
- Confirm firmware/build numbers match exactly
- Keep device charged; don't interrupt flash operations
- Always back up before flashing

---

## Magisk Troubleshooting

### Installation Fails

#### Error: "Cannot patch boot image"

**Causes:**
- Corrupted boot image
- Wrong firmware version
- Insufficient storage

**Solutions:**

1. **Verify boot image**
   ```bash
   # Check boot image integrity
   file boot.img
   # Should show: "Android bootimg"
   ```

2. **Clear Magisk cache**
   - Settings → Apps → Magisk
   - Clear cache and data
   - Reinstall Magisk

3. **Extract boot from firmware**
   - Use payload-dumper-go (for Pixel/OnePlus)
   - Use firmware extractor tools
   - Verify MD5 hash matches

4. **Try alternative patching**
   - Install to recovery instead
   - Patch on PC using Magisk
   - Use fastboot mode installation

---

#### Error: "Installation failed! This device is not supported"

**Solutions:**

1. **Update Magisk**
   - Download latest version (v30.7+ for Android 16 QPR2 support)
   - Alpha/Beta may support newer devices first

2. **Check device compatibility**
   - Some devices need special Magisk builds
   - Search XDA for device-specific versions

3. **Try KernelSU or APatch as alternative**
   - Some devices incompatible with Magisk
   - KernelSU or APatch may work where Magisk doesn't

---

### Magisk Modules Not Working

**Diagnostic steps:**

1. **Check module status**
   - Magisk → Modules
   - Look for "!" icon (indicates issues)

2. **View module logs**
   ```bash
   adb shell
   su
   cat /cache/magisk.log
   ```

3. **Test in safe mode**
   - Disable all modules
   - Enable one at a time
   - Identify conflicting module

**Common module issues:**

| Problem | Solution |
|:---|:---|
| Module shows as "!" | Incompatible or corrupted - reinstall |
| Module enabled but not working | Check logs, verify compatibility |
| Modules disappear after reboot | Core Magisk issue - reinstall Magisk |
| Some modules cause bootloop | Disable via recovery, check compatibility |

---

### DenyList / Root Hiding Not Working

**For Magisk v24+ (current):**

1. **Configure DenyList**
   - Settings → Enable Zygisk
   - Settings → Configure DenyList
   - Add apps needing root hidden

2. **Enforce DenyList**
   - Enable "Enforce DenyList"
   - Reboot device

3. **Additional hiding (pick one strategy):**

   **Strategy A: Shamiko (popular choice)**
   - Install Shamiko module
   - Shamiko doesn't work with enforced DenyList — disable "Enforce DenyList" when using Shamiko
   - Add target apps to DenyList (Shamiko reads it but uses its own hiding method)
   - Rename Magisk app (Settings → Hide the Magisk app)

   **Strategy B: Zygisk Assistant / NoHello**
   - For best results, enable Magisk's Enforce DenyList option if NOT also using Shamiko or Zygisk Assistant or NoHello

4. **Clear target app data after setup**
   - Force stop banking/target app
   - Clear its cache and data
   - Reboot, then re-open app

**Advanced detection evasion:**

```bash
# Hide Magisk app (via Magisk settings or manually)
# Hide props
resetprop --delete ro.debuggable
resetprop --delete ro.secure
```

---

### Magisk Broke OTA Updates

**Symptoms:** OTA fails to install or bootloop after OTA

**Solution:**

1. **Before OTA (preparation):**
   ```bash
   # Backup current setup
   # Disable all modules
   # Uninstall Magisk (Restore Images)
   # Apply OTA
   # Re-root with new boot image
   ```

2. **After failed OTA:**
   - Boot to recovery
   - Flash stock boot from new firmware
   - Flash new patched boot
   - Reboot

**Prevention:**
- Always uninstall Magisk before OTA, or use "Install to Inactive Slot"
- Use OTA preservation modules with caution
- Consider custom ROM for seamless updates

---

## KernelSU Troubleshooting

### Installation Issues

#### Error: "No KernelSU detected" / App shows "Unsupported"

**Causes:**
- Wrong kernel flashed
- Kernel doesn't have KernelSU built-in
- LKM module not loaded

**Solutions:**

1. **Verify kernel**
   ```bash
   adb shell
   su -c "cat /proc/version"
   # Should show KernelSU in version string
   ```

2. **Understand running modes**
   - Since version 0.9.0, KernelSU supports two running modes on GKI devices: GKI: Replace the original kernel of the device with the Generic Kernel Image (GKI) provided by KernelSU.
   - **LKM mode:** Load KernelSU as a kernel module (recommended for GKI devices). Use `ksud boot-patch` to patch boot image with LKM.
   - Kernel version and Android version aren't necessarily the same! If you find that your kernel version is android12-5.10.101, but your Android system version is Android 13 or other, don't be surprised.

3. **Use ksud tool to patch**
   - The ksud tool provided by KernelSU can help you quickly patch the official firmware and then flash it. This tool supports macOS, Linux, and Windows. You can download the corresponding version from GitHub Release.

4. **Build kernel with KernelSU (advanced)**
   - Follow KernelSU documentation
   - Compile custom kernel
   - Flash and test

---

#### Modules Don't Install / Don't Work

**Diagnosis:**

1. **Check if a metamodule is installed (Most Common Issue!)**
   - KernelSU requires a **metamodule** to mount modules
   - Without a metamodule, modules are installed but NOT mounted
   - Open KernelSU Manager → Modules and verify a metamodule is active

2. **Check module compatibility**
   - KernelSU modules use a different format
   - Some Magisk modules are incompatible

**Solutions:**

1. **Install a metamodule first**
   - Download [meta-overlayfs](https://github.com/KernelSU-Modules-Repo/meta-overlayfs) (official)
   - Or [mountify](https://github.com/backslashxx/mountify), [meta-hybrid_mount](https://github.com/YuzakiKokuban/meta-hybrid_mount)
   - Install via KernelSU Manager → Modules
   - Reboot and try installing modules again

2. **Convert Magisk module**
   - Some modules work with minor changes
   - Check module developer notes

3. **Find KernelSU alternatives**
   - Growing KernelSU module ecosystem
   - Check KernelSU module repos

---

### KernelSU Not Surviving Reboots

**Causes:**
- Kernel reverted
- Security patches interfering
- Only flashed one slot on A/B device

**Solutions:**

1. **Check kernel status after reboot**
   ```bash
   cat /proc/version
   ```

2. **Disable AVB if needed**
   ```bash
   fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
   ```

3. **Flash kernel to both slots** (A/B devices)
   ```bash
   fastboot flash boot_a kernelsu-boot.img
   fastboot flash boot_b kernelsu-boot.img
   ```

---

### KernelSU-Next (Fork)

KernelSU-Next is a fork that provides Non-GKI kernel support from 4.x – 5.4 with LTS mode (3.x is experimental), GKI kernels support from 5.10 – 6.6 with GKI mode (6.6+ is experimental), includes both Magic Mount and OverlayFS which can be switched from settings with a single toggle, and features a redesigned manager app.

- WARNING: Non-GKI devices should not upgrade to the mainline KernelSU v3.x releases! Use KernelSU-Next instead for non-GKI devices.
- KernelSU-Next latest release is v3.1.0 (February 2026)

---

### App Profile Issues

**KernelSU uses a profile system instead of per-app permissions**

**Configuration:**

1. **Set up profiles**
   - KernelSU Manager → Profiles
   - Create profiles for different use cases
   - Assign apps to profiles
   - Only permitted apps can access or see su; all other apps remain unaware of it. KernelSU allows customization of su's uid, gid, groups, capabilities, and SELinux rules, hardening root privileges.

2. **Profile not applying**
   - Force stop app
   - Clear app cache
   - Reapply profile
   - Reboot

---

## APatch Troubleshooting

### Patching Fails

**Common errors and solutions:**

| Error | Solution |
|:---|:---|
| "Unsupported boot image" | Try different extraction method; check kernel version compatibility |
| "Patching timeout" | Increase timeout, try on PC with kptools |
| "Verification failed" | Disable AVB/DM-verity |
| "Flash failed" | Use different flash method |

**General steps:**

1. **Verify boot image source**
   - Always patch the image extracted from the same build currently running on your phone. You need boot.img or init_boot.img from your exact current firmware build.
   - Check MD5 hash

2. **Set a strong SuperKey**
   - The SuperKey should be 8-63 characters long and include numbers and letters, but no special characters. It's strictly prohibited to set weak keys like 12345678. The latest versions of APatch require the use of strong keys.

3. **Try alternative patching methods**
   - Patch on PC using kptools instead of on-device
   - The latest version of APatch Manager supports directly flashing via third-party Recovery such as TWRP. Change the APatch Manager file suffix from .apk to .zip. After doing this, you can flash this .zip file via Recovery's Flash function. APatch will be automatically installed, just like Magisk.

4. **Check device compatibility**
   - APatch allows Linux kernels on compatible ARM64 devices (versions 3.18 to 6.1) to be modified. The official docs now list support up to kernel version 6.12.
   - KernelPatch doesn't support 6.6 in some older APatch releases — check the latest release notes.

---

### APatch Module System

APatch features two main modules: APM for modules similar to Magisk; and KPM to modify and inject code directly into the kernel.

**Mount method changes:**
- APatch has changed to Magic Mount instead of OverlayFS for better compatibility. However, you can still use OverlayFS as default mounting method by creating the /data/adb/.overlay_enable file.
- You can create /data/adb/.litemode_enable to skip all mounts so that detection is minimized.

---

### APatch Not Persistent

**If APatch disappears after reboot:**

1. **Check installation method**
   - Permanent install vs temporary
   - Flash to correct partition

2. **Verify both slots (A/B devices)**
   ```bash
   fastboot flash boot_a apatched-boot.img
   fastboot flash boot_b apatched-boot.img
   ```

3. **Disable verification if needed**
   ```bash
   fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img
   ```

### APatch OTA Updates

Root survival with APatch is image-based, so OTAs usually require repatching the updated boot chain image. Always patch image from the newly installed build, not from an older firmware package.

---

## Bootloader and Fastboot Issues

### Bootloader Won't Unlock

**Solutions by Manufacturer:**

**Google Pixel:**
```bash
# Enable OEM unlocking in Developer Options
# Boot to fastboot
fastboot flashing unlock
# Or for newer devices
fastboot flashing unlock_critical
```

**Samsung:**

:::danger One UI 8 / Android 16 Critical Change
One UI 8 (Android 16) eliminates bootloader unlocking support on Samsung Galaxy devices. OEM Unlocking toggle removed from Developer Options; unlock logic stripped from firmware. Affected globally: S25 series, Z Fold 7, Z Flip 7, and any device updated to One UI 8. Blocks rooting, custom ROMs, and custom kernels entirely through official methods. Applies to all regions.

⚠️ **Do NOT update to One UI 8 if you plan to root or unlock your bootloader** until verified unlock methods emerge.
:::

- For devices still on One UI 7 or earlier:
  - No official bootloader unlock for US/Canada carrier models
  - International models: Check Samsung Developer site
  - Knox will trip permanently and irreversibly. Data wipe: Unlocking erases everything. Warranty void: Samsung will refuse all service.

**Xiaomi/Redmi/POCO:**
- Apply for unlock permission on official Xiaomi site
- Wait period varies (3-7 days typically, up to 30 days)
- Use official Mi Unlock Tool
- Unlock wipes all data

**OnePlus:**
```bash
fastboot oem unlock
# Or newer models
fastboot flashing unlock
```

**Nothing Phone:**
- Official unlock supported
- Enable OEM unlocking in Developer Options
- Use fastboot unlock commands

**If unlock command fails:**
- Update SDK Platform Tools to latest version
- Try different USB cable/port (USB 2.0 ports often work better)
- Enable USB debugging in Developer Options
- Ensure "Allow bootloader unlock" is enabled in Developer Options
- Some devices require internet connection during unlock

---

### fastboot/ADB Not Recognized

**Windows:**

1. **Install drivers**
   - Download [SDK Platform Tools](https://developer.android.com/studio/releases/platform-tools)
   - Install universal ADB drivers
   - Install manufacturer-specific drivers (Samsung, Xiaomi, etc.)

2. **Disable driver signature enforcement**
   ```powershell
   # Advanced startup → Troubleshoot → Advanced → Startup Settings
   # Choose "Disable driver signature enforcement"
   # Then install unsigned drivers
   ```

**Linux:**

1. **Set up udev rules**
   ```bash
   sudo nano /etc/udev/rules.d/51-android.rules
   # Add:
   SUBSYSTEM=="usb", ATTR{idVendor}=="18d1", MODE="0666", GROUP="plugdev"
   # Google - 18d1, Samsung - 04e8, Xiaomi - 2717, OnePlus - 2a70
   
   # Reload rules
   sudo udevadm control --reload-rules
   sudo udevadm trigger
   ```

**Mac:**
- Usually works without setup
- Ensure USB debugging enabled
- Trust computer on device
- For Apple Silicon Macs, may need to disable SIP in some cases

---

### AVB and Verified Boot Errors

**What is it:**
- Android Verified Boot (AVB) prevents modified system from booting
- dm-verity checks system integrity

**When you see errors like:**
- "dm-verity corruption"
- "AVB verification failed"
- "Can't load Android system"

**Solution:**

```bash
# Download vbmeta.img for your firmware
# Flash with disabled verification
fastboot --disable-verity --disable-verification flash vbmeta vbmeta.img

# Some devices need
fastboot flash vbmeta --disable-verity --disable-verification vbmeta.img

# For A/B devices, flash both slots
fastboot --disable-verity --disable-verification flash vbmeta_a vbmeta.img
fastboot --disable-verity --disable-verification flash vbmeta_b vbmeta.img
```

**Important:**
- Most modern Magisk installs do NOT require disabling AVB
- Only disable if your device/ROM/kernel documentation specifically requires it
- Some custom ROMs need this step

---

## OTA Update Problems

### OTA Survival with Magisk (A/B Devices)

**Recommended Method:**

1. **Install OTA via system updater**
   - Don't reboot yet when prompted

2. **Install Magisk to inactive slot**
   - Open Magisk Manager
   - Install → "Install to Inactive Slot (After OTA)"
   - Wait for completion

3. **Reboot**
   - Now you can reboot
   - OTA applied with root preserved

**If OTA Already Failed:**

1. **Flash stock boot for new version**
   ```bash
   # Download new firmware
   # Extract boot/init_boot.img
   fastboot flash boot_a stock_boot.img
   fastboot flash boot_b stock_boot.img
   fastboot reboot
   ```

2. **Re-root with new image**
   - Extract correct image from new firmware
   - Patch with Magisk
   - Flash patched image

### Non-A/B Devices

**Process:**
1. Uninstall Magisk (Restore Images)
2. Apply OTA normally
3. Re-patch new boot image
4. Flash via fastboot or custom recovery

### OTA Survival with APatch

Root survival with APatch is image-based, so OTAs usually require repatching the updated boot chain image. Always patch image from the newly installed build, not from an older firmware package.

---

## Play Integrity and Banking Apps

### Understanding Play Integrity

**Integrity Levels:**
- **MEETS_BASIC_INTEGRITY:** Device appears unmodified at basic level
- **MEETS_DEVICE_INTEGRITY:** Device passes device-level integrity
- **MEETS_STRONG_INTEGRITY:** Hardware-backed attestation (typically fails on unlocked bootloaders)

**Important:** Bypassing security requirements of protected apps is against their terms of service. This section focuses on legitimate compatibility best practices.

**Realistic expectations (2026):**
- Realistic target: BASIC + DEVICE. Strong integrity requires a locked bootloader — not possible on custom ROMs.
- Play Integrity behavior changes frequently server-side. There is no permanent bypass guarantee.
- MEETS_STRONG_INTEGRITY is only available with a valid keybox.

### Current Module Stack (2026)

The Play Integrity ecosystem has evolved significantly. The current typical stack includes:

1. **Zygisk Implementation** (choose one):
   - Magisk built-in Zygisk
   - ZygiskNext, ReZygisk, or NeoZygisk (for KernelSU/APatch)

2. **Play Integrity Fix Module** (choose one):
   - PlayIntegrityFork — a Zygisk module which fixes "MEETS_DEVICE_INTEGRITY" for the Play Integrity API. On Android 13+ ROMs it still helps to pass checks in Google Wallet and Google Messages RCS support.
   - PlayIntegrityFix (PIF) — the original by chiteroman (the official PIF by chiteroman has been removed from GitHub; community mirrors exist, e.g. [KOWX712's mirror](https://github.com/KOWX712/PlayIntegrityFix))
   - PIF-Next — not a root hiding module; it only has integration with TrickyStore to ensure valid hardware attestation

3. **Root Hiding** (choose one):
   - Shamiko — hides root & Magisk from detection
   - Zygisk Assistant / NoHello

4. **Key Attestation** (for STRONG integrity):
   - For attempting to pass STRONG integrity, only the latest official Tricky Store or TEESimulator release is recommended.
   - Tricky Store Addon — updates target list
   - Requires a valid keybox (device-specific, may need periodic refresh)

**Configuration by Root Method:**

| Root Method | Zygisk | PIF Module | Root Hiding |
|:---|:---|:---|:---|
| Magisk | Built-in Zygisk | PlayIntegrityFork / PIF | Shamiko or DenyList |
| KernelSU | ZygiskNext / ReZygisk / NeoZygisk | PlayIntegrityFork / PIF | App Profiles + Shamiko |
| APatch | ZygiskNext / ReZygisk / NeoZygisk | PlayIntegrityFork / PIF | Built-in exclusion + Shamiko |

**Testing Tools:**
- SPIC (Simple Play Integrity Checker)
- Play Store → Settings → Tap "Play Store version" seven times → General → Developer options → Verify integrity
- Open the Play Store → Settings → Tap 'Play Store version' seven times. Go to 'General' → 'Developer options' → 'Verify integrity'. Your attestation will appear immediately!
- Note: YASNAC is legacy (SafetyNet) and no longer authoritative

**Check Device Certification:**
- Play Store → Settings → About → "Play Protect certification"
- Should show "Device is certified"

**Reality Check:**
- STRONG integrity typically requires locked bootloader + valid keybox
- You might need to run PIF and/or get a new keybox from Tricky Store every 2 or 3 days to keep Google Wallet working.
- Some apps will not work on rooted/unlocked devices regardless of configuration
- Consider:
  - Secondary unmodified device for critical apps
  - Browser-based alternatives
  - Work profile separation (without attempting to bypass security)

**Apps Known to Be Strict:**
- Google Wallet/Pay
- Banking apps (varies by region and app)
- Macdonald's app
- Revolut
- Netflix (in some regions)
- Pokemon GO
- Corporate MDM apps

---

## Device-Specific Issues

### Google Pixel (6/7/8/9/10 Series)

**Common Issues:**

1. **Patching wrong image**
   - **Android 13+:** Must patch `init_boot.img` (not boot.img)
   - Boot.img patching will fail to root
   - Extract from factory image payload.bin using payload-dumper-go

2. **Pixel 10 Series**
   - The Pixel 10 series, launched in August 2025, ships with Android 16 pre-installed.
   - Pixel 10 Pro can be rooted with SukiSU/SUSFS and needs a metamodule, TrickyStore with valid keybox and PIFork to get Strong Integrity.
   - Use init_boot.img patching workflow

3. **Android 16 QPR2 Rooting Issues**
   - After certain 2026 firmware updates, some users lost root and re-rooting failed, resulting in bootloops.
   - Magisk 30.7 was released with support for Android 16 QPR2 — ensure you are using the latest Magisk version
   - If rooting fails after a firmware update, try waiting for a Magisk update that addresses your specific build

4. **OTA updates**
   - Use "Install to Inactive Slot (After OTA)" method
   - Keep both slots in sync

5. **Fastbootd for flashing**
   ```bash
   # Use userspace fastboot for dynamic partitions
   adb reboot fastboot
   # Or from bootloader
   fastboot reboot fastboot
   ```

**Resources:**
- [How to Root Pixel Phone](./rooting-guides/how-to-root-pixel-phone.md)

---

### Samsung Galaxy (S21-S25, Fold/Flip)

:::danger One UI 8 (Android 16) Bootloader Lock
One UI 8 (Android 16) eliminates bootloader unlocking support on Samsung Galaxy devices. OEM Unlocking toggle removed from Developer Options. Affected globally: S25 series, Z Fold 7, Z Flip 7, and any device updated to One UI 8.

If you want to root a Samsung device, **do NOT update to One UI 8** until the community finds a workaround. Devices already on One UI 7 or earlier can still be unlocked using existing methods.
:::

**Common Issues (Pre-One UI 8):**

1. **KNOX permanently trips**
   - Once bootloader unlocked, KNOX 0x1 flag is permanent
   - Samsung Pay, Samsung Pass, Secure Folder may be affected
   - Samsung Health advanced features limited
   - Warranty void

2. **Root via Odin**
   - Patch AP file with Magisk
   - Flash BL/AP/CP/CSC in Odin
   - Use HOME_CSC to preserve data (when appropriate)

3. **US carrier models**
   - Most US/Canada models have locked bootloaders
   - No official unlock available
   - Check XDA for your specific model

4. **Anti-Rollback Protection**
   - Some models have fuse-based ARB
   - Don't downgrade firmware below certain versions
   - Check "Binary" version in Download Mode

5. **Galaxy S25 Series**
   - The Galaxy S25 March 2026 update is based on One UI 8 and Android 16.
   - Users on rooted S25 Ultra (European model) wanting to upgrade to Android 16 without losing data should follow the standard Odin re-root procedure with the new firmware's AP file.
   - **Critical:** Updating to One UI 8 may permanently remove the ability to unlock the bootloader again if you re-lock.

**Resources:**
- [How to Root Samsung Phone](./rooting-guides/how-to-root-samsung-phone.md)

---

### Xiaomi/Redmi/POCO

**Common Issues:**

1. **Mi Unlock waiting period**
   - Official unlock requires 3-30 day wait
   - Must use Mi Account linked to device
   - Some regions have restrictions

2. **Anti-Rollback (ARB)**
   - Flashing older firmware can hard brick
   - Check ARB version in fastboot ROM
   - Use Mi Flash Tool anti setting carefully

3. **HyperOS-specific issues**
   - HyperOS (successor to MIUI) heavily modified; some modules incompatible
   - Battery optimization aggressive; whitelist root apps
   - Security features may interfere with root

4. **A/B vs A-only partitions**
   - Varies by model
   - Check partition layout before flashing

**Resources:**
- [How to Root Xiaomi Phone](./rooting-guides/how-to-root-xiaomi-phone.md)

---

### OnePlus

**Common Issues:**

1. **OxygenOS/ColorOS merge**
   - Newer models use ColorOS base
   - Partition structure changed
   - Follow model-specific guides carefully

2. **MSMDownloadTool**
   - Legacy models: Full unbrick capability
   - Newer models: Availability varies
   - Returns device to factory state

3. **Regional differences**
   - Some regions have locked variants
   - Check model number carefully

**Resources:**
- [How to Root OnePlus Phone](./rooting-guides/how-to-root-oneplus-phone.md)

---

### Nothing Phone (1/2/2a)

**Common Issues:**

1. **Official unlock supported**
   - Enable OEM unlocking in Developer Options
   - Standard fastboot unlock process

2. **Custom recovery availability**
   - TWRP support varies by model
   - Check XDA for latest builds

3. **Nothing OS updates**
   - Frequent updates may require re-patching
   - Keep stock images for your version

**Resources:**
- [How to Root Nothing Phone](./rooting-guides/how-to-root-nothing-phone.md)

---

### Motorola

**Common Issues:**

1. **Official unlock available**
   - Motorola provides unlock codes
   - Check Motorola Developer site
   - Warranty void after unlock

2. **Regional restrictions**
   - Some carrier variants cannot be unlocked
   - China models may have restrictions

3. **Rescue and Smart Assistant**
   - Official rescue tool for soft bricks
   - Requires official firmware packages

**Resources:**
- [How to Root Motorola Phone](./rooting-guides/how-to-root-motorola-phone.md)

---

## Performance and Optimization

### Battery Drain After Rooting

**Common Causes:**
- Wakelocks from modules or root apps
- Background services not optimized
- Kernel settings too aggressive

**Solutions:**

1. **Identify wakelocks**
   ```bash
   # Check wakelock stats
   adb shell dumpsys batterystats
   
   # Or use apps
   # BetterBatteryStats, Wakelock Detector (root)
   ```

2. **Optimize root apps**
   - Limit apps with root access
   - Disable root for apps that don't need it
   - Use Greenify or similar for aggressive doze

3. **Kernel tuning**
   - Use conservative governor profiles
   - Limit max CPU frequency if needed
   - Adjust I/O scheduler

4. **Module audit**
   - Disable unnecessary modules
   - Some modules cause wakelocks
   - Test with modules disabled

---

### Performance Tuning

**CPU/GPU Optimization:**

1. **Governor selection**
   - Performance: performance, schedutil
   - Battery: powersave, conservative
   - Balanced: interactive, ondemand

2. **Frequency scaling**
   ```bash
   # Check current governor
   cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
   
   # Available governors
   cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_available_governors
   
   # Set governor (requires root app or script)
   echo "schedutil" > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
   ```

3. **Thermal management**
   - Monitor thermals during stress tests
   - Don't disable thermal throttling permanently
   - Use gaming profiles only during actual gaming

**Apps for Performance:**
- [Performance & Gaming Apps](./apps-and-modules/index.md#performance-and-gaming)
- [Battery Management Tools](./apps-and-modules/index.md#battery-and-power-management)

**Storage Optimization:**

1. **Trim/FSTRIM**
   - Most modern ROMs do this automatically
   - Can manually trigger via root apps

2. **I/O Scheduler**
   - BFQ, mq-deadline, noop options
   - Device/kernel dependent

**Warning:** Performance tuning can affect stability and battery life. Test changes thoroughly and revert if issues occur.

---

## App Detection and Compatibility

### Banking Apps Detecting Root

**Strategies:**

1. **Hide root completely**
   - Enable all hiding features (see [Play Integrity section](#play-integrity-and-banking-apps))
   - Rename root manager app
   - Clear banking app data
   - Add to DenyList/profile/exclusion list

2. **Use alternate methods**
   - Browser-based banking
   - Secondary non-rooted device
   - Work profile separation

3. **Module-based solutions (current 2026 stack)**
   - Shamiko (for Magisk)
   - PlayIntegrityFork or PIF
   - Tricky Store (for attestation)
   - Hide My Applist (via LSPosed)

---

### Apps Crashing After Root

**Common causes:**

| Cause | Solution |
|:---|:---|
| Root detection | Hide root from app |
| Module conflict | Disable modules, identify culprit |
| Modified system files | Restore system partition |
| Security checks | Use root hiding modules |

**Diagnostic:**

```bash
# Check app crash logs
adb logcat | grep "FATAL EXCEPTION"

# Check module logs
su -c "cat /cache/magisk.log | grep [app-package-name]"
```

---

### Netflix/Streaming Apps Issues

**Problems:**
- Won't install
- Playback errors
- "Device not certified"

**Solutions:**

1. **Fix certification**
   - Ensure Play Store shows "Device is certified"
   - Use PlayIntegrityFork/PIF module
   - Clear app data after fixing certification

2. **Use older version**
   - Install from APKMirror
   - Disable auto-updates
   - Use Zygisk Detach to prevent Play Store updates

---

## Logs and Diagnostics

### Collecting Logs for Help

**Magisk logs:**
```bash
# Via app
Magisk → Settings → Save log

# Via ADB
adb shell
su
cat /cache/magisk.log > /sdcard/magisk.log
exit
adb pull /sdcard/magisk.log
```

**System logs:**
```bash
# Full system log
adb logcat > logcat.txt

# Filtered for errors
adb logcat *:E > errors.txt

# Kernel log
adb shell dmesg > kernel.log
```

**Crash logs:**
```bash
# Check tombstones
adb shell
su
ls /data/tombstones/
cat /data/tombstones/tombstone_XX
```

---

## When to Give Up and Restore

**Consider unrooting if:**
- Critical apps won't work despite all efforts
- Unstable after multiple fix attempts
- Can't pass security checks needed for work
- More hassle than benefit

**Clean unroot procedure:**

1. **Backup data**
   - Copy important files
   - Export app data
   - Note customizations

2. **Uninstall root**
   - Magisk → Uninstall → Complete Uninstall
   - Or flash stock boot image

3. **Factory reset**
   - Wipe data and cache
   - Fresh start

4. **Lock bootloader (optional)**
   ```bash
   fastboot flashing lock
   # Warning: Will wipe data again
   # Warning: On some devices, relocking with non-stock system can brick
   ```

---

## Getting Help

### How to Ask for Help

When asking for help in forums or communities, provide complete information:

**Essential Information:**
```
Device: [Model name and number]
Firmware: [Android version, build number, security patch]
Bootloader: [Unlocked/Locked]
Root Method: [Magisk 27.x / KernelSU x.x / APatch]
Recovery: [TWRP/OrangeFox/Stock]

Problem: [Detailed description of what happened]
Steps Taken: [What you've already tried]
Error Messages: [Exact error text or screenshots]
Logs: [Attach logcat, dmesg if available]
```

**Good Example:**
```
Device: OnePlus 9 Pro LE2125
Firmware: OxygenOS 14.0.0.600 (Android 14)
Bootloader: Unlocked
Root: Magisk 27.0
Recovery: Stock

Problem: Device bootloops after installing Module X
Steps Taken: Tried booting to recovery, can't access ADB
Error: Stuck on OnePlus logo, no response
```

### Where to Get Help

**XDA Developers**
- Device-specific forums
- ROM and kernel threads
- [https://forum.xda-developers.com/](https://forum.xda-developers.com/)

**Reddit Communities**
- [r/AndroidRoot](https://reddit.com/r/AndroidRoot)
- [r/Magisk](https://reddit.com/r/Magisk)
- [r/LineageOS](https://reddit.com/r/LineageOS)
- [r/Awesome_Android_Root](https://reddit.com/r/Awesome_Android_Root)

**Telegram Groups**
- @MagiskUpdates (official news)
- @KernelSU (discussions)
- Device-specific groups

**GitHub Issues**
- Magisk: [topjohnwu/Magisk](https://github.com/topjohnwu/Magisk)
- KernelSU: [tiann/KernelSU](https://github.com/tiann/KernelSU)
- APatch: [bmax121/APatch](https://github.com/bmax121/APatch)

### Best Practices

**Before Posting:**
1. Search existing threads for your issue
2. Read device-specific guides
3. Check recent posts for similar problems
4. Gather all logs and information

**When Posting:**
1. Use descriptive titles
2. Post in correct section/forum
3. Attach logs as files (not inline text)
4. Include screenshots when relevant
5. Be patient and respectful

**After Getting Help:**
1. Follow up with results
2. Mark solutions that worked
3. Help others with similar issues
4. Contribute back to community

---

## Additional Resources

### Quick Links

**Essential Guides:**
- [Complete Rooting Guide](./rooting-guides/index.md)
- [Bootloader Unlock](./rooting-guides/how-to-unlock-bootloader.md)
- [Custom Recovery Installation](./rooting-guides/how-to-install-custom-recovery.md)
- [Root Framework Comparison](./rooting-guides/root-framework-comparison.md)

**Device Guides:**
- [Pixel](./rooting-guides/how-to-root-pixel-phone.md)
- [Samsung](./rooting-guides/how-to-root-samsung-phone.md)
- [Xiaomi](./rooting-guides/how-to-root-xiaomi-phone.md)
- [OnePlus](./rooting-guides/how-to-root-oneplus-phone.md)
- [Nothing](./rooting-guides/how-to-root-nothing-phone.md)
- [Motorola](./rooting-guides/how-to-root-motorola-phone.md)

**Root Apps:**
- [Essential Root Apps](./apps-and-modules/index.md##starter-kit-must-have-apps)
- [Ad Blockers](./apps-and-modules/index.md#ads-and-tracking-blockers)
- [Backup Tools](./apps-and-modules/index.md#backup-and-restore)

**General Resources:**
- [FAQ](./faqs.md)
- [Contributing](./contributing.md)
- [About](./about.md)

---

**Need more help?** Visit our [FAQ page](./faqs.md) for conceptual questions or join our [community discussions](./resources.md#community).
