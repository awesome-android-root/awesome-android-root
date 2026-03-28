---
layout: doc
title: Complete Motorola Rooting Guide
description: "Master guide to root all Motorola phones - Edge series, Moto G series with bootloader unlock codes, Magisk installation, and A/B partition handling."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/rooting-guides/how-to-root-motorola-phone
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
      content: https://awesome-android-root.org/rooting-guides/how-to-root-motorola-phone
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

# Motorola Root Guide

Root Motorola devices via the official unlock code system. Covers Edge 60, Edge 50, Edge 40, Edge 30, Moto G series, and legacy Moto devices.

## Quick Navigation

- [Motorola Overview](#motorola-rooting-overview)
- [Supported Devices](#supported-devices)
- [Prerequisites](#prerequisites)
- [Get Unlock Code](#get-unlock-code)
- [Unlock Bootloader](#unlock-bootloader)
- [Root Installation](#root-installation)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Universal rooting concepts
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Detailed unlock guide
- [Magisk Guide](./magisk-guide.md) - Complete Magisk documentation
- [Custom ROMs](./custom-rom-installation.md) - Installing custom ROMs
- [Root Apps](../apps-and-modules/) - Best root apps collection

---

## Supported Devices

<details><summary>Click to expand supported Motorola devices</summary><br>

### Motorola Edge Series

**Edge 60 Series (2025):**
- Edge 60, Edge 60 Fusion, Edge 60 Stylus, Edge 60 Pro
- Runs Android 15; eligible for three OS upgrades
- Uses init_boot.img
- Ensure init_boot.img matches your current build number; do NOT use launch firmware if you've already updated

**Edge 50 Series (2024):**
- Edge 50 Ultra, Edge 50 Pro, Edge 50 Fusion, Edge 50 Neo
- Uses init_boot.img

**Edge 40 Series (2023):**
- Edge 40 Pro, Edge 40 Neo, Edge 40
- Uses init_boot.img
- Good community support, active LineageOS development

**Edge 30 Series (2022):**
- Edge 30 Ultra, Edge 30 Fusion, Edge 30 Pro
- Uses boot.img or init_boot.img (check Magisk Ramdisk field)
- Excellent support, many custom ROMs

**Older Edge:**
- Edge+/Edge (2020-2021)
- Edge 20 series
- Mature support

### Moto G Series

**Moto G (2024-2025):**
- G Power, G Stylus 5G, G85, G75, G55
- Uses init_boot.img
- Many recent Moto G devices on Android 13/14/15 encounter "Preflash validation failed" when flashing images patched with Magisk v27/28+

**Moto G (2023):**
- Moto G84/G73/G54/G64
- Uses init_boot.img
- Good XDA support

**Moto G (2022 and older):**
- Moto G82/G72/G62/G52
- Moto G100/G60/G40
- Moto G9 Plus/Power/Play, G8 series
- Uses boot.img
- Strong custom ROM scene

### Moto X/Z Series (Legacy)

**Moto X:**
- X4, X Style, X Play

**Moto Z:**
- Z4/Z3/Z2/Z Play

### Carrier Considerations

**Unlockable:**
- International/global models
- Retail unlocked (US)

**Not Unlockable:**
- Carrier-exclusive models (e.g. Verizon, AT&T, Tracfone) are almost never unlockable
- Bootloader unlock codes are not available for Amazon Branded devices
- Prepaid carrier-locked variants

**ThinkShield:**
- Business/enterprise Motorola devices
- Usually locked down, not rootable

</details>

## Prerequisites

### Critical Requirements

::: danger ⚠️ BEFORE YOU START

**Warranty Void:** Once you get the unlock code, your device is no longer covered by the Motorola warranty.

**Unlock Code Required:** Must request from Motorola's official website. May take minutes to hours.

**Data Wipe:** Unlocking erases all data including internal storage.

**Carrier Check:** There are certain restrictions such as carrier-exclusive models. To find out if your phone supports bootloader unlock you will need to visit Motorola's page and proceed to follow the process.
:::

### Hardware Requirements

- Motorola device (unlockable model)
- Quality USB cable (try multiple cables if you encounter issues)
- Computer (Windows, macOS, Linux)
- 50%+ battery charge

### Software Requirements

**On Computer:**

1. **Platform Tools**
   - Download: [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools)

2. **Motorola USB Drivers** (Windows)
   - Download: [Motorola USB Drivers](https://en-us.support.motorola.com/app/usb-drivers)

3. **Web Browser**
   - For unlock code request
   - Valid email address (Gmail recommended)

**On Device:**

1. **Magisk APK**
   - Download: [Magisk GitHub Releases](https://github.com/topjohnwu/Magisk/releases)
   - Android compatibility: Android 6.0 and higher

2. **Motorola Account**
   - For unlock code request

### Device Preparation

**Step 1: Enable Developer Options**

1. Settings > About phone
2. Tap "Build number" 7 times
3. Enter PIN/password

**Step 2: Enable Required Settings**

Settings > System > Developer options:
- **OEM unlocking**: Enable
- **USB debugging**: Enable

**Step 3: Verify ADB**

```bash
adb devices
# Should show device
```

---

## Get Unlock Code

Motorola requires an official unlock code from their website.

### Step 1: Gather Device Information

**Get Device ID String:**

```bash
# Reboot to fastboot
adb reboot bootloader

# Get device ID (unique string)
fastboot oem get_unlock_data

# Output will be multiple lines
# Copy ALL lines together as one string
# Remove spaces and (bootloader) prefixes
```

**Example output:**
```
(bootloader) 0A40040192024205#4C4D3556313230
(bootloader) 30373731363031303332323239#BD00
(bootloader) 8A672BA4746C2CE02328A2AC0C39F95
(bootloader) 1A3E5#1F53280002000000000000000
(bootloader) 0000000
```

Copy the code part off of each line (exclude the `(bootloader)` part and remove all spaces) and make it a single string:
```
0A40040192024205#4C4D355631323030373731363031303332323239#BD008A672BA4746C2CE02328A2AC0C39F951A3E5#1F532800020000000000000000000000
```

::: tip DATA SCRUB TOOL
Be careful not to remove part of the unlock key when removing the junk, spaces and extra lines. You can paste it into the online Motorola dataScrubTool to clean it up automatically.
:::

### Step 2: Request Unlock Code

1. Visit [Motorola Bootloader Unlock](https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a)

2. Sign in with your Motorola account

3. Unlocking your device and installing your own software might cause the device to stop working, disable important features and functionality.

4. Paste the string on the website. Click "Can my device be unlocked?" You'll receive an email with your unlock key.

5. **Check email:**
   - Try to use Gmail as your account email for Motorola. If you don't receive the unlock code (which should come in about a minute or so), try changing your account email address and requesting the code again.

### Step 3: Save Unlock Code

- Copy unlock code exactly
- Save to text file
- Keep safe for next steps

---

## Unlock Bootloader

### Step 1: Enter Fastboot Mode

```bash
adb reboot bootloader
```

Or hardware keys:
1. Power off
2. Hold Volume Down + Power
3. Release at fastboot screen

### Step 2: Unlock with Code

```bash
# Verify fastboot connection
fastboot devices

# Unlock using code from email
fastboot oem unlock UNIQUE_KEY_FROM_EMAIL
```

**On Device:**
- Warning screen may appear
- Device automatically wipes
- Bootloader unlocks
- Device reboots

### Step 3: Verify Unlock

After reboot:
```bash
adb reboot bootloader
fastboot getvar unlocked
# Should return: yes
```

On boot you will see a "Bootloader unlocked" warning - this is normal.

---

## Root Installation

### Determine Correct Image

| Device | Android Version | Image to Patch |
|--------|-----------------|----------------|
| Edge 60 series | Android 15 | init_boot.img |
| Edge 50 series | Android 14/15 | init_boot.img |
| Edge 40 series | Android 13/14 | init_boot.img |
| Edge 30 series | Android 12/13 | boot.img or init_boot.img |
| Moto G (2023-2025) | Android 13-15 | init_boot.img |
| Moto G (2022 and older) | Android 12 and below | boot.img |

**Open the Magisk app and check the "Ramdisk" field if unsure. If Ramdisk = Yes, use boot.img. If your device has a separate init_boot partition, use init_boot.img.**

### Method 1: Boot Image Patching (Standard)

**Step 1: Get Stock Firmware**

1. Download from [Motorola Rescue and Smart Assistant (Software Fix)](https://en-us.support.motorola.com/app/softwarefix) or [Lolinet Motorola Firmware Mirror](https://mirrors.lolinet.com/firmware/moto/)
2. Extract firmware archive
3. Find `boot.img` or `init_boot.img`

::: warning FIRMWARE VERSION MATCH
If you already installed an official update before rooting: Do NOT extract init_boot.img from the initial/launch firmware. DO extract init_boot.img from the updated firmware that matches your current build number.
:::

**Step 2: Transfer to Device**

```bash
# For newer devices (Android 13+)
adb push init_boot.img /sdcard/Download/

# For older devices (Android 12 and below)
adb push boot.img /sdcard/Download/
```

**Step 3: Patch with Magisk**

```bash
# Install Magisk
adb install magisk.apk
```

On device:
1. Open Magisk
2. Install > Select and Patch a File
3. Choose boot/init_boot image
4. Wait for patching to complete

**Step 4: Flash Patched Image**

```bash
# Get patched image back to PC
adb pull /sdcard/Download/magisk_patched_xxxxx.img ./

# Reboot to fastboot
adb reboot bootloader

# Flash (use the correct partition for your device)
# For devices with init_boot partition:
fastboot flash init_boot magisk_patched_xxxxx.img

# For devices using boot.img:
fastboot flash boot magisk_patched_xxxxx.img

# Reboot
fastboot reboot
```

**Step 5: Verify Root**

1. Open Magisk app
2. Should show "Installed" with version number
3. Test: `adb shell su`

### Method 2: Fastboot Boot + Direct Install (Edge 50 Fusion and similar)

Some Motorola devices (especially MediaTek-based ones like the Edge 50 Fusion) don't work with the standard flash method. Use this alternative:

1. Unlock bootloader like any other Motorola device
2. Install Magisk app
3. Patch boot.img with Magisk and transfer to PC
4. Execute `adb reboot bootloader`
5. Execute `fastboot boot patched_boot.img`
6. Open Magisk app and select "Direct Install"
7. Reboot - device is now rooted

---

## Post-Root Setup

### Configure Magisk

**Settings:**
- **Zygisk**: Enable
- **Enforce DenyList**: Enable

**DenyList:**
- Google Play Services
- Google Play Store
- Banking apps
- Payment apps

### Motorola Optimization

**Battery:**
1. Settings > Battery
2. Magisk and root apps > Set "Unrestricted"

**Background:**
- Allow background activity for root apps
- Disable battery optimization for Magisk

### Recommended Modules

- **Play Integrity Fix** (replaces Universal SafetyNet Fix)
- **Shamiko** (hide root from detection)
- **LSPosed** (Xposed framework)
- **Systemless Hosts** (ad blocking support)

---

## OTA Handling

### For A/B Devices (All Modern Motorola)

**Process:**
1. Download OTA
2. Magisk > Install to Inactive Slot
3. Reboot
4. Root preserved

::: warning
After rooting, OTA updates may fail with "package verification failed." The only way to update is to download the full firmware package and flash it yourself using Rescue and Smart Assistant or fastboot.
:::

---

## Troubleshooting

<details><summary>Click to expand troubleshooting</summary><br>

### Unlock Code Issues

**Code Not Received**

Solutions:
- Check spam folder
- Wait up to 24 hours
- Re-submit request
- Try to use Gmail as your account email for Motorola
- Contact Motorola support

**Code Doesn't Work**

Solutions:
- Verify copied correctly - no extra spaces
- Be careful not to remove part of the unlock key when removing the junk, spaces and extra lines

### Bootloader Issues

**OEM Unlocking Greyed Out**

Causes:
- Carrier-locked device
- ThinkShield/enterprise model
- Device not eligible

If greyed out: device likely cannot be unlocked.

**Device Shows "Not Eligible" on Motorola Website**

- The site often gives false ineligible responses
- The device's CID is one of the factors that can determine if it is eligible for unlocking
- Check your CID with: `fastboot getvar cid`
- Try submitting again or use a different browser

### "Preflash Validation Failed"

This is a common Motorola-specific error when flashing patched images.

**Cause:** This can mean multiple things including flashing an older image, or DMVerity/Verification still being enabled. If DMVerity/Verification is still enabled and you try to flash a rooted image, it will be denied because the device can detect it's been modified.

**Solution 1: Use fastbootd mode**
Reboot into Fastboot-Fastboot mode (fastbootd) instead of Fastboot-bootloader. While still in bootloader mode, send: `fastboot reboot fastboot`. While in fastbootd mode, repeat flashing the images - they should succeed this time.

**Solution 2: Disable vbmeta verification**
```bash
fastboot flash --disable-verity --disable-verification vbmeta vbmeta.img
```

**Solution 3: Use the fastboot boot method**
Instead of flashing directly, use `fastboot boot patched_boot.img`, then do a Direct Install from within the Magisk app.

### Installation Issues

**Magisk Not Working After Flash**

Solutions:
1. On some devices like the Edge 50 Ultra, flashing patched boot.img alone doesn't work - you may need to patch init_boot.img instead
2. Verify firmware version matches your current build
3. Re-patch and flash
4. Clear Magisk data

**Bootloop**

```bash
# Restore stock image
fastboot flash boot stock_boot.img
# Or
fastboot flash init_boot stock_init_boot.img
fastboot reboot
```

</details>

---

## Unroot and Restore

### Remove Root

```bash
# Magisk > Uninstall > Restore Images
```

### Flash Stock

```bash
# Flash stock firmware images
fastboot flash boot stock_boot.img
# Or for newer devices:
fastboot flash init_boot stock_init_boot.img
fastboot reboot
```

### Relock Bootloader

::: danger RELOCK WARNING
Don't relock the bootloader if it was unlocked by any other method than official. Reflash stock firmware, factory reset, reboot, and make sure everything is working correctly before relocking. Warranty remains void after relocking.
:::

```bash
fastboot oem lock
```

---

## Custom ROMs

### Popular ROMs

**LineageOS:**
- Official for many Moto G and Edge devices
- Stable and well-maintained

**Pixel Experience:**
- Pixel-like interface
- Good performance

**crDroid:**
- Feature-rich
- Active development

**Evolution X:**
- Customizable
- Growing support

---

## Best Practices

### Security

1. **Configure DenyList** for sensitive apps
2. **Trusted modules only** - verify sources
3. **Keep Magisk updated** - latest versions support new sepolicy binary format introduced in Android 16
4. **Back up boot images** before every update

---

## Community Resources

**Official Motorola:**
- [Bootloader Unlock](https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a) - Official unlock portal
- [Supported Devices Info](https://en-us.support.motorola.com/app/answers/detail/a_id/87215) - Official eligibility info
- [Motorola USB Drivers](https://en-us.support.motorola.com/app/usb-drivers) - Official drivers
- [Motorola Rescue & Smart Assistant](https://en-us.support.motorola.com/app/softwarefix) - Stock firmware tool

**Developer Community:**
- [XDA Motorola Forums](https://xdaforums.com/c/motorola.11990/) - Development & guides
- [XDA Bootloader Unlock Guide](https://xdaforums.com/t/guide-un-locking-motorola-bootloader.4079111/) - Comprehensive unlock reference
- [Reddit r/MotoG](https://www.reddit.com/r/MotoG/) - Moto G community
- [Reddit r/Motorola](https://www.reddit.com/r/Motorola/) - General Motorola

**Awesome Android Root help resources:**
- [FAQs](../faqs)
- [Troubleshooting Guide](../troubleshooting)

### Getting Help

**Provide:**
- Exact Motorola model and codename
- Android version and build number
- Unlock code status
- Exact error messages (especially fastboot output)
- Steps attempted
- Which Magisk version was used to patch

---

## Next Steps

**After Rooting:**

1. **Essential apps:**
   - [Root Apps Collection](../apps-and-modules/)

2. **Enhance:**
   - [Ad Blocking Guide](../general-guides/android-adblocking.md)
   - [Debloating Guide](../general-guides/android-apps-debloating.md)
   - [LSPosed Guide](./lsposed-guide.md)

3. **Explore ROMs:**
   - [Custom ROM Guide](./custom-rom-installation.md)
   - LineageOS for stability
   - Pixel Experience for clean look