---
layout: doc
title: Complete APatch Root Guide
description: "Master APatch rooting - the next-generation kernel-based root solution. Step-by-step installation guide for Android 10+ with advanced module support."
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
      content: Install APatch root with our comprehensive guide. Kernel-based rooting solution for Android 10+ with advanced module system and security features.
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
      content: Next-generation kernel-based Android rooting with APatch. Advanced module support and enhanced security.
  - - meta
    - name: keywords
      content: apatch root guide, kernel-based rooting, android 10 root, apatch installation, next generation root, kernel patching
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

**Next-generation kernel-based rooting** - APatch brings advanced root capabilities with enhanced security and modern module system.

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md)** - Universal rooting principles and device preparation
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - Required prerequisite
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - Alternative installation method
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions for common issues

## ⚡ What is APatch?

APatch represents the next evolution in Android rooting technology, offering kernel-level modifications with advanced security features:

### Core Advantages
- **Kernel-Level Integration** - Deep system access with enhanced stability
- **Advanced Module System** - Modern plugin architecture for customizations
- **Enhanced Security** - Improved safety mechanisms over traditional methods
- **Android 10+ Support** - Optimized for modern Android versions
- **SystemLess Design** - Maintains system integrity while providing root access

### APatch vs Traditional Root Methods

| Feature | APatch | Magisk | KernelSU |
|---------|--------|--------|----------|
| **Integration Level** | Kernel-based | System-level | Kernel-based |
| **Android Support** | 10+ optimized | 5.0+ universal | 11+ focused |
| **Module System** | Next-gen | Mature | Growing |
| **Security Features** | Advanced | Standard | Enhanced |
| **Setup Complexity** | Moderate | Beginner | Advanced |

## ✅ Prerequisites & Compatibility

### Essential Requirements
- **[🔓 Unlocked Bootloader](./how-to-unlock-bootloader.md)** - Mandatory prerequisite
- **Android 10+** - Minimum supported version
- **Compatible Device** - Check [APatch Device List](https://github.com/bmax121/APatch#supported-devices)
- **Platform Tools** - [Download ADB/Fastboot](https://developer.android.com/studio/releases/platform-tools)
- **Stock Firmware** - For boot.img extraction

### Critical Safety Checks
::: danger ⚠️ ESSENTIAL WARNINGS
- **Warranty Voided** - Manufacturer warranty will be invalidated
- **Brick Risk** - Incorrect installation can damage device
- **Security Impact** - Root access introduces potential vulnerabilities
- **OTA Updates** - May break over-the-air system updates
:::

### Preparation Steps
1. **Verify Device Compatibility**
   - Check APatch GitHub for device support
   - Confirm Android version (10+ required)
   - Note exact device model and build number

2. **Download Required Files**
   - **APatch APK:** [Official GitHub Releases](https://github.com/bmax121/APatch/releases)
   - **Stock Firmware:** Manufacturer's official ROM
   - **Platform Tools:** ADB and Fastboot utilities

### **Step-by-Step Guide to Rooting with APatch**

#### **Step 1: Unlock the Bootloader**
Most devices require an unlocked bootloader to flash custom images.
1. Enable OEM Unlocking in Developer Options.
2. Boot into Fastboot mode:
   - Power off your device.
   - Hold Volume Down + Power (varies by device; e.g., Pixel: Volume Down + Power).
3. Connect your device to your computer via USB.
4. Open a command prompt/terminal in the folder where ADB/Fastboot is installed.
5. Type `fastboot devices` to confirm connection.
6. Unlock the bootloader:
   - For most devices: `fastboot oem unlock` or `fastboot flashing unlock`.
   - For Google Pixel: `fastboot flashing unlock`.
   - For Xiaomi: You may need to bind your Mi Account and wait 72-168 hours.
7. Confirm on your device (it will warn about data wipe). Your device will reboot and erase all data (factory reset).
8. Set up your device again after the reset.

**Note**: Samsung devices use Odin for unlocking—refer to device-specific guides. Some devices (e.g., newer Huaweis) can't be unlocked.

#### **Step 2: Extract the Boot Image (boot.img)**
You need the stock boot.img from your device's firmware to patch it.
1. Download your device's stock firmware (e.g., from official sites or tools like Frija for Samsung).
2. Extract the firmware ZIP file using 7-Zip or similar.
3. Locate the boot.img file (sometimes inside a .tar or .img file).
   - For Samsung: Use tools like "payload_dumper" to extract from payload.bin.
   - For Pixel: It's directly in the factory image ZIP.
4. Transfer the boot.img to your device's internal storage (e.g., via USB or ADB: `adb push boot.img /sdcard/`).

If you can't find boot.img, use tools like "Magisk" app to extract it (install Magisk temporarily, but we'll use APatch for rooting).

#### **Step 3: Install APatch and Patch the Boot Image**
1. Download and install the APatch APK on your device (enable "Install from unknown sources" in Settings > Security).
2. Open the APatch app.
3. Grant necessary permissions (storage, etc.).
4. In APatch, select "Patch Image" or "Install" option.
5. Choose the boot.img file you transferred to your device.
6. APatch will patch the image:
   - It analyzes and modifies the kernel for root access.
   - Options: You can choose to integrate KernelSU or Magisk modules if desired (APatch supports compatibility).
   - The process takes 1-5 minutes. It will output a new file like "apatch_patched_boot.img" in your storage.
7. Transfer the patched boot.img back to your computer (e.g., `adb pull /sdcard/apatch_patched_boot.img`).

**Tip**: If APatch fails to patch, ensure your kernel is compatible (APatch requires a kernel with certain features; check GitHub issues).

#### **Step 4: Flash the Patched Boot Image**
1. Boot your device into Fastboot mode again (Volume Down + Power).
2. Connect to your computer.
3. In the command prompt/terminal:
   - Confirm connection: `fastboot devices`.
   - Flash the patched image: `fastboot flash boot apatch_patched_boot.img` (replace with your file name).
   - For devices with A/B partitions (e.g., Pixel): `fastboot flash boot_a apatch_patched_boot.img` and `fastboot flash boot_b apatch_patched_boot.img`.
   - For Samsung: Use Odin—place the patched boot in AP slot and flash (disable auto-reboot).
4. Reboot: `fastboot reboot`.
5. Your device should boot normally. If it bootloops, proceed to troubleshooting.

#### **Step 5: Set Up APatch and Verify Root**
1. Open the APatch app on your device.
2. It should detect the patched kernel and prompt for setup.
3. Grant root permissions when asked (APatch uses its own superuser manager).
4. Install any modules if needed (similar to Magisk modules; download from APatch repo).
5. Verify root:
   - Download a root checker app (e.g., Root Checker from Play Store).
   - Or use ADB: `adb shell`, then `su`—if it prompts for permission and grants, root is successful.
6. Test root apps like AdAway or Titanium Backup.

**Congratulations!** Your device is now rooted with APatch.

### **Post-Rooting Tips**
- **Hide Root**: Use APatch's built-in hiding features to pass SafetyNet/Play Integrity checks for banking apps (similar to MagiskHide).
- **Modules**: Explore APatch modules for features like systemless hosts or font changers.
- **Updates**: To update your ROM, re-patch the new boot.img with APatch before flashing.
- **Unrooting**: To unroot, flash the stock boot.img via Fastboot/Odin, then lock the bootloader if desired (`fastboot oem lock`).
- **Backup Root**: Use APatch to create a backup of your patched setup.

### **Troubleshooting Common Issues**
- **Bootloop**: Flash stock boot.img to recover. Ensure the patched image matches your firmware version.
- **APatch App Crashes**: Clear app data or reinstall. Check for APK compatibility with your Android version.
- **No Root Access**: Re-patch and re-flash. Ensure USB Debugging is enabled.
- **Fastboot Not Detected**: Install proper drivers (e.g., Google USB drivers for Pixel). Try a different USB port/cable.
- **SafetyNet Fail**: Use Universal SafetyNet Fix module via APatch.
- **Device-Specific Errors**: For Samsung, disable Verified Boot. For Xiaomi, ensure anti-rollback is not triggered.
- **Stuck in Fastboot**: Use `fastboot reboot` or hold Power button.
- If bricked: Flash full stock firmware using official tools (e.g., Fastboot for Pixel, Mi Flash for Xiaomi).

If you encounter issues, provide your device model, Android version, and error messages in forums for help. Remember, rooting is advanced—proceed at your own risk! If this guide helped, consider donating to APatch developers on GitHub.