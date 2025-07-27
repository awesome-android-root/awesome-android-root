---
layout: doc
title: Complete Motorola Rooting Guide
description: "Master guide to root all Motorola phones - Edge series, Moto G series with bootloader unlock codes, Magisk installation, and A/B partition handling."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-root-motorola-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Motorola Rooting Guide - All Models Supported
  - - meta
    - property: og:description
      content: Root any Motorola device with our comprehensive guide covering bootloader unlock codes, Magisk installation, and special A/B partition procedures.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/how-to-root-motorola-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/motorola.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Motorola Rooting Guide - All Models
  - - meta
    - name: twitter:description
      content: Root any Motorola phone with bootloader unlock codes and Magisk installation guide.
  - - meta
    - name: keywords
      content: motorola root guide, motorola edge root, moto g root, motorola bootloader unlock, motorola unlock code, motorola magisk, motorola a/b partition, motorola rooting tutorial
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
      content: Motorola Root
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

# Complete Motorola Rooting Guide

**Root any Motorola device** - Edge series, Moto G series with official unlock codes and Magisk installation.

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md)** - Universal rooting principles and safety
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - General bootloader concepts  
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - TWRP installation guide
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions for common issues

## Critical Warnings

::: danger ⚠️ Motorola-Specific Considerations
- **Data wipe occurs multiple times** - Complete backup required
- **7-10 day waiting period** required before OEM unlocking becomes available
- **A/B partition devices** (G55 5G and newer) require special dual-partition flashing
- **Exact model verification** essential - similar models may have different procedures
:::

## Prerequisites & Setup

### Required Tools
1. **[Platform Tools](https://developer.android.com/studio/releases/platform-tools)** - ADB/Fastboot
2. **[Motorola USB Drivers](https://en-us.support.motorola.com/app/usb-drivers)** - Official device drivers
3. **[Magisk APK](https://github.com/topjohnwu/Magisk/releases)** - Latest release
4. **Stock ROM** for your exact device (for boot.img extraction)
5. **Motorola Account** - Required for unlock code request

### Device Preparation
1. **Enable Developer Options** - Settings → About Phone → Tap Build Number 10 times
2. **Configure Developer Settings:**
   - Enable **USB Debugging**
   - Note **OEM Unlocking** status (may be grayed out)
3. **Record Build Number** - Needed for ROM identification
4. **Disable Auto-Updates** - Prevent firmware changes

### The Waiting Period
**Mandatory Step:** Motorola requires **7-10 days** of internet connectivity before OEM unlocking becomes available.

**During this period:**
- Keep device connected to WiFi/mobile data
- Use normally - timer runs automatically
- Check OEM unlocking periodically
- Enable immediately when available

## Device Identification

### Check Your Device Type
Determine if your device uses A/B partitions:
```bash
adb shell getprop ro.build.ab_update
```
- **true** = A/B device (dual partitions)
- **false/empty** = Standard device (single partition)

### Confirmed Device Types
- **Standard Devices:** Edge 30 Neo, G32, G24, most older models
- **A/B Devices:** G55 5G, G54 5G, newer Edge models

## Stock ROM Acquisition

### Method 1: Direct Search
1. **Get build number:** Settings → About Phone → Build Number
2. **Search ROM sites:** Use exact build number (e.g., "U3UTS34.44-11-2-4")
3. **Try motostockrom.com** or similar databases
4. **Fallback:** Remove last number segment if exact match not found

### Method 2: Motorola Software Fix Tool
1. **Install [Motorola Software Fix](https://en-us.support.motorola.com/app/softwarefix)**
2. **Connect device** → Backup & Restore tab
3. **Download firmware** (auto-extracts files)
4. **Navigate to:** `C:\ProgramData\RSA\RomFiles\[ROM folder]`
5. **Copy boot.img** for patching

## Bootloader Unlocking

### Verification Steps
Before proceeding, confirm:
- OEM unlocking **enabled** (not grayed out)
- Device properly connected (`adb devices` shows device)
- Motorola account created and logged in

### Unlock Process
1. **Enter fastboot mode:**
   ```bash
   adb reboot bootloader
   ```

2. **Generate unlock token:**
   ```bash
   fastboot oem get_unlock_data
   ```
   Copy the complete token (remove line breaks)

3. **Request unlock code:**
   - Visit [Motorola Bootloader Unlock](https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-b)
   - Login with Motorola account
   - Paste token and submit request
   - Check email for unlock code (usually arrives quickly)

4. **Unlock bootloader:**
   ```bash
   fastboot oem unlock [your_unlock_code]
   ```
   Follow on-screen prompts to confirm

5. **Reboot and setup:**
   ```bash
   fastboot reboot
   ```

### Post-Unlock Setup
After automatic factory reset:
1. Complete initial setup
2. Re-enable Developer Options (Build Number × 10)
3. Re-enable USB Debugging
4. Install Magisk APK via ADB

## Magisk Installation

### Standard Devices (Single Partition)
**For Edge 30 Neo, G32, G24, and similar models**

1. **Extract boot.img** from stock ROM (7-Zip or unzip command)

2. **Transfer to device:**
   ```bash
   adb push boot.img /sdcard/Download/
   ```

3. **Patch with Magisk:**
   - Open Magisk app
   - Tap **Install** → **Select and patch a file**
   - Choose boot.img from Downloads
   - Wait for patching completion

4. **Retrieve patched file:**
   ```bash
   adb pull /sdcard/Download/magisk_patched_[hash].img ./magisk_patched.img
   ```

5. **Flash patched boot:**
   ```bash
   adb reboot bootloader
   fastboot flash boot magisk_patched.img
   fastboot reboot
   ```

### A/B Devices (Dual Partition)
**For G55 5G, G54 5G, and newer models**

::: warning ⚠️ A/B Device Critical Step
A/B devices have dual boot partitions. Flashing only one partition causes bootloops when the system switches partitions.
:::

1. **Follow steps 1-4** from Standard Devices method

2. **Enter fastbootd mode** (not regular fastboot):
   ```bash
   adb reboot bootloader
   fastboot reboot fastboot
   ```

3. **Flash both boot partitions:**
   ```bash
   fastboot flash boot_a magisk_patched.img
   fastboot flash boot_b magisk_patched.img
   ```

4. **Reboot system:**
   ```bash
   fastboot reboot
   ```

## Verification & Final Setup

### Confirm Root Access
1. **Open Magisk app** - Should show "Installed" status
2. **Test with Root Checker** - Install from Play Store
3. **Grant permissions** - Approve root requests from apps
4. **Create backup** - TWRP NANDroid or Magisk backup

### Configure Root Hiding (For Banking Apps)
1. **Enable Zygisk** - Magisk Settings → Enable Zygisk
2. **Configure DenyList** - Add banking/work apps
3. **Install bypass modules** - Tricky Store, Shamiko as needed
4. **Test functionality** - Use Play Integrity Checker

## Troubleshooting

### Common Issues

#### OEM Unlocking Grayed Out
- **Solution:** Wait full 7-10 days with internet connection
- **Verify:** Keep WiFi/mobile data active throughout period

#### Device Not Recognized
```bash
# Check connections
adb devices
fastboot devices

# If no device shown
- Reinstall Motorola USB drivers
- Try different USB port/cable
- Enable USB Debugging again
```

#### Bootloop After Rooting
- **A/B devices:** Likely flashed only one partition
  ```bash
  # Flash both partitions
  fastboot flash boot_a magisk_patched.img
  fastboot flash boot_b magisk_patched.img
  ```
- **Any device:** Flash stock boot.img to recover
  ```bash
  fastboot flash boot stock_boot.img
  ```

#### Magisk Not Detected
- **Check installation:** Magisk app should show "Installed"
- **Wrong partition:** Re-flash ensuring both A/B partitions covered
- **Corrupted patch:** Re-patch boot.img with fresh Magisk

### Emergency Recovery
If device won't boot:
1. **Boot to recovery** - Power + Volume Up/Down combinations
2. **Wipe cache** - Clear cache partition and Dalvik
3. **Remove modifications** - Disable recent changes
4. **Factory reset** - Last resort option
5. **Flash stock firmware** - Complete restoration

## Supported Device List

### Confirmed Working Models
- **Motorola Edge 30 Neo** - Standard partition method
- **Motorola G55 5G** - A/B partition method  
- **Motorola G54 5G** - A/B partition method
- **Motorola G32** - Standard partition method
- **Motorola G24** - Standard partition method
- **Most Edge Series** - Check partition type first
- **Most Moto G Series** - Newer models likely A/B

### Verification Command
Check your device partition type:
```bash
adb shell getprop ro.build.ab_update
```

## Community Resources

### Getting Help
- **[XDA Motorola Forums](https://forum.xda-developers.com/c/motorola.54/)** - Device-specific communities
- **Telegram Groups** - Search "Motorola [model] development"
- **Reddit** - r/MotorolaMods, r/AndroidRoot
- **Official Support** - Limited to bootloader unlock only

### Essential Links
- **[Motorola Developer Portal](https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-b)** - Official unlock page
- **[Motorola Software Fix](https://en-us.support.motorola.com/app/softwarefix)** - Official firmware tool
- **[Motorola USB Drivers](https://en-us.support.motorola.com/app/usb-drivers)** - Official drivers

---

## Success! You've Rooted Your Motorola Device

**Congratulations!** Your Motorola device now has root access. Here's what to do next:

### Immediate Next Steps
1. **[Browse Root Apps](../android-root-apps/#root-apps)** - Discover 300+ curated applications
2. **[Setup Banking App Bypass](../faqs.md#play-integrity-and-banking-apps)** - Configure root hiding
3. **[Install Essential Apps](../android-root-apps/#featured-apps-the-essentials)** - Start with recommended apps

### Advanced Options
- **[Custom Recovery](./how-to-install-custom-recovery.md)** - Install TWRP for advanced features
- **[Custom ROM](./custom-rom-installation.md)** - Upgrade to LineageOS or other ROMs
- **[LSPosed Framework](./lsposed-guide.md)** - Enable Xposed modules

**Welcome to the world of Android freedom!** 🚀
