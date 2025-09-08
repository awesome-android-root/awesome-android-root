---
layout: doc
title: Complete Google Pixel Rooting Guide
description: "Master guide to root all Pixel devices — Pixel 9, 8, 7, 6 series — with bootloader unlock and Magisk. Clean, current, and safe."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-root-pixel-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Google Pixel Rooting Guide - All Models Supported
  - - meta
    - property: og:description
      content: Root any Google Pixel device with our comprehensive guide covering bootloader unlock, factory images, and Magisk installation for a clean Android experience.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/how-to-root-pixel-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/google-pixel.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Google Pixel Rooting Guide - All Models
  - - meta
    - name: twitter:description
      content: Root any Google Pixel phone with bootloader unlock and Magisk installation guide.
  - - meta
    - name: keywords
      content: google pixel root guide, pixel rooting, pixel bootloader unlock, pixel magisk guide, pixel factory images, pixel 9 root, pixel 8 root, pixel 7 root, pixel 6 root, lineageos pixel, pixel unbrick
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
      content: Google Pixel Root
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

# Complete Google Pixel Rooting Guide

**Root the world's best Android phones** - Pixel 9, 8, 7, 6 series with simple bootloader unlock and Magisk installation.

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md) — universal concepts & safety**
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)**
- **[📚 Custom Recovery](./how-to-install-custom-recovery.md)**
- **[❓ FAQ & Troubleshooting](../faqs.md)**
- **[🧩 Magisk Guide](./magisk-guide.md)**

## Why Pixels Are Great to Root
**Google Pixel Advantages:**
- **Developer-friendly approach** - Google supports customization
- **No unlock restrictions** - Direct bootloader unlock without approvals
- **Factory image availability** - Official Google recovery images
- **Active development** - Best custom ROM community support
- **Pure Android base** - No bloatware or skin modifications

## ⚠️ Pixel‑Specific Warnings

::: danger Important
- Unlocking wipes the device completely.
- May affect warranty/service eligibility; proceed informed.
- OTA updates on rooted devices require extra steps (see below).
- Anti‑rollback/AVB: only flash matching factory images for your build.
:::

## Supported Devices
All unlockable Google Pixels, including:
- Current: Pixel 9 Pro XL/9 Pro/9, 8a
- Previous: 8 Pro/8, 7a/7 Pro/7, 6a/6 Pro/6
- Classics: 5a/5, 4a 5G/4a, 4/4 XL, 3 series, 2 series, 1 series

::: warning **Notes:**
- **Carrier‑locked variants (e.g., some Verizon models) may have OEM unlock disabled.**
- **Always verify your exact model and build.**
:::

---
::: tip
#### Quick TL;DR (experienced users)
- Enable OEM unlocking + USB debugging
- fastboot flashing unlock
- Download matching factory image
- Patch the correct image in Magisk:
  - Ramdisk: Yes → patch boot.img
  - Ramdisk: No → patch init_boot.img
- fastboot flash boot|init_boot magisk_patched.img
- Reboot → open Magisk to complete setup
- For OTAs: use “Install to Inactive Slot (After OTA)” in Magisk
:::

---

## Prerequisites & Setup

### Required Tools
1. **[Platform Tools](https://developer.android.com/studio/releases/platform-tools)** - ADB/Fastboot
2. **[Google USB Drivers](https://developer.android.com/studio/run/win-usb)** - Windows drivers
3. **[Magisk APK](https://github.com/topjohnwu/Magisk/releases)** - Latest release
4. **[Factory Images](https://developers.google.com/android/images)** - Official Google recovery
5. **[Pixel Flash Tool](https://flash.android.com/)** - Web-based flashing

### Device Preparation
1. **Enable Developer Options** - Settings → About Phone → Tap Build Number 7 times
2. **Configure Developer Settings:**
   - Enable **USB Debugging**
   - Enable **OEM Unlocking**
3. **Backup all data** - Photos, contacts, apps via Google backup
4. **Charge to 50%+** - Ensure sufficient battery

### Connection Verification
```bash
# Test ADB connection
adb devices

# Should show device with "device" status
# If "unauthorized", accept debugging prompt on phone
```

## Bootloader Unlocking

Google Pixel devices have the simplest bootloader unlock process in Android.

### Enter Fastboot Mode
```bash
# Method 1: ADB command
adb reboot bootloader

# Method 2: Hardware keys  
# Power off → Hold Volume Down + Power
```

### Verify Fastboot Connection
```bash
fastboot devices
# Should show your device listed
```

### Unlock Bootloader
```bash
fastboot flashing unlock
```

**Device Response:**
- Warning screen about unlocking appears
- Use Volume keys to navigate to "UNLOCK THE BOOTLOADER"  
- Press Power button to confirm
- Device will factory reset and reboot

### Complete Setup
After automatic factory reset:
1. Complete initial Android setup
2. Re-enable Developer Options (Build Number × 7)
3. Re-enable USB Debugging

## Root Installation Methods

### Method A: Boot Image Patching (Recommended)

#### Step 1: Extract Boot Image
1. **Download factory image** for your exact Pixel model:
   - Visit **[Google Factory Images](https://developers.google.com/android/images)**
   - Find your device model and build number
   - Download complete factory image ZIP

2. **Extract boot image:**
   ```bash
   # Extract factory image
   unzip image-device-buildnumber.zip
   
   # Extract individual images
   unzip image-device-buildnumber/image-device-buildnumber.zip
   
   # boot.img is now available
   ```

#### Step 2: Patch Boot Image  
1. **Transfer boot.img to device:**
   ```bash
   adb push boot.img /sdcard/Download/
   ```

2. **Install Magisk APK:**
   ```bash
   adb install Magisk-v[version].apk
   ```

3. **Patch boot image:**
   - Open Magisk app on device
   - Tap **Install** → **Select and patch a file**
   - Navigate to Downloads and select boot.img
   - Wait for patching completion

4. **Retrieve patched image:**
   ```bash
   adb pull /sdcard/Download/magisk_patched_[hash].img ./
   ```

#### Step 3: Flash Patched Boot
1. **Boot to fastboot mode:**
   ```bash
   adb reboot bootloader
   ```

2. **Flash patched boot:**
   ```bash
   fastboot flash boot magisk_patched_[hash].img
   ```

3. **Reboot system:**
   ```bash
   fastboot reboot
   ```
- **Excellent hardware support** - All features work on custom ROMs
- **Strong root hiding** - Banking apps work with proper setup

---

### Method B: Custom Recovery Installation

Pixel devices support various custom recoveries:

1. **Download custom recovery:**
   - **TWRP:** Traditional choice with touch interface
   - **OrangeFox:** Modern design with advanced features
   - **LineageOS Recovery:** Clean and minimal

2. **Flash recovery:**
   ```bash
   fastboot flash recovery recovery.img
   ```

3. **Boot to recovery:**
   ```bash
   fastboot reboot recovery
   # Or: Volume Down + Power, select Recovery
   ```

4. **Install Magisk via recovery:**
   - Transfer Magisk ZIP to device
   - Install ZIP through recovery interface
   - Reboot system


---

## Keep Root Through OTAs (A/B Seamless Updates)

Best practice on Pixels:
1. In Settings → System → System update: Download and install the OTA
2. Do NOT reboot when it finishes
3. Open Magisk → Install → “Install to Inactive Slot (After OTA)”
4. When Magisk completes, reboot from the system updater

This preserves root after the slot switch. If you already rebooted, simply re‑patch and flash the new boot/init_boot from the updated factory image.

---


## Optional/Advanced

### Using Android Flash Tool (web)
- Good for clean factory restores/unbrick and quick updates
- Steps: Unlock bootloader → flash factory image in the browser → then apply Magisk (patch and flash)

### Custom Recovery on Pixel
- Modern Pixels (esp. Tensor 6/7/8/9) generally lack official TWRP
- Stock recovery + fastbootd cover most needs
- Magisk ZIP flashing in recovery is deprecated; prefer boot/init_boot patching

### Relock Bootloader (return to stock)
1. Remove root and restore stock images:
   - In Magisk: Uninstall → Restore images (or flash stock boot/init_boot)
2. Ensure 100% stock partitions for your build
3. Reboot to bootloader and run:
   ```bash
   fastboot flashing lock
   ```
   Confirm on device. Relocking with modified images can brick the device.

---

## Troubleshooting Guide

### Bootloop after flashing
- Likely wrong image (boot vs init_boot) or wrong build
```bash
# Flash back the stock image for your current build
fastboot flash boot stock_boot.img
# or
fastboot flash init_boot stock_init_boot.img
fastboot reboot
```
If needed, reflash the full factory image:
```bash
# From extracted factory image:
fastboot reboot bootloader
fastboot -w update image-*.zip   # uses fastbootd; wipes data
```

### “fastboot waiting for device”
- Windows: install Google USB driver; use a USB‑A port/cable if possible
- macOS/Linux: update platform‑tools; check cable/port; on Linux add udev rules

### OTA fails on rooted device
- Use the OTA flow described above (Install to Inactive Slot)
- If already failed, restore stock boot/init_boot for the active slot, complete OTA, then re‑patch

### Banking/DRM apps
- Configure Magisk DenyList and hide root
- Play Integrity is stricter on Android 14/15; compatibility varies by app and region
- Respect app terms; we don’t guarantee bypass success

## Advanced Customization

### Custom ROM Recommendations

**For Privacy (Security-focused):**
- **GrapheneOS** - Maximum security and privacy
- **CalyxOS** - Privacy with usability balance

**For Features (Customization-focused):**
- **LineageOS** - Pure AOSP with extras
- **Evolution X** - Feature-rich experience
- **Pixel Experience** - Stock Pixel feel on other devices
---

## Pixel Tips & Extras

- Keep platform‑tools updated (fastbootd support and bug fixes land frequently)
- Verify ZIP hashes from Google when downloading factory images
- Don’t disable AVB/verity on Pixels for Magisk; not needed and reduces security
- Manage modules conservatively; they’re the #1 cause of bootloops

---
## Community Resources

### Development Communities
- **[Pixel XDA Forums](https://forum.xda-developers.com/c/google-pixel.12020/)** - Device development hub
- **[GrapheneOS Community](https://grapheneos.org/contact)** - Privacy-focused development
- **[r/GooglePixel](https://reddit.com/r/GooglePixel)** - General Pixel discussions
- **[Pixel Telegram Groups](https://t.me/PixelCommunity)** - Real-time support

### Official Resources
- **[Google Factory Images](https://developers.google.com/android/images)** - Official firmware
- **[Android Flash Tool](https://flash.android.com/)** - Web-based flashing
- **[Google Issue Tracker](https://issuetracker.google.com/issues?q=componentid:190923%20status:open)** - Bug reports
- **[Pixel Support](https://support.google.com/pixelphone/)** - Official help

---

::: tip 🎉 Pixel Root Success Tips
- Patch the right image (check Magisk: Ramdisk Yes → boot, No → init_boot)
- Use “fastboot boot” for a safe first test, then Direct Install
- Preserve root across updates via “Install to Inactive Slot (After OTA)”
- Keep a copy of stock boot/init_boot for quick recovery
:::

**Need more help?** Visit our **[FAQ section](../faqs.md)** or check the **[main rooting guide](./index.md)** for additional troubleshooting and advanced techniques.