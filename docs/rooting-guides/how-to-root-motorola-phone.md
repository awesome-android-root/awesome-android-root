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

Root Motorola devices via official unlock code system. Covers Edge 50, Edge 40, Edge 30, Moto G series, and legacy Moto devices.

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

**Edge 50 Series (2024):**
- Edge 50 Ultra
- Edge 50 Pro
- Edge 50 Fusion
- Growing support
- Uses init_boot.img

**Edge 40 Series (2023):**
- Edge 40 Pro
- Edge 40 Neo
- Edge 40
- Good community
- Active development

**Edge 30 Series (2022):**
- Edge 30 Ultra
- Edge 30 Fusion
- Edge 30 Pro
- Excellent support
- Many custom ROMs

**Older Edge:**
- Edge+/Edge (2020-2021)
- Edge 20 series
- Mature support

### Moto G Series

**Moto G Power/Stylus (2024):**
- G Power (2024)
- G Stylus 5G (2024)
- Budget-friendly
- Basic root support

**Moto G Series (2023):**
- Moto G84/G73/G54
- Popular mid-range
- Good XDA support
- Multiple ROMs

**Moto G Series (2022):**
- Moto G82/G72/G62/G52
- Excellent community
- Many custom ROMs
- Active development

**Legacy Moto G:**
- G100/G60/G40
- G9 Plus/Power/Play
- G8 series
- Strong custom ROM scene

### Moto X/Z Series (Legacy)

**Moto X:**
- X4, X Style, X Play
- Classic Motorola
- Good ROM support

**Moto Z:**
- Z4/Z3/Z2/Z Play
- Modular phones
- Active community

### Carrier Considerations

**Unlockable:**
- International models
- Retail unlocked (US)
- Most regions globally

**Not Unlockable:**
- Verizon (most models)
- AT&T (some models)
- Sprint/Boost/Cricket variants
- Prepaid carrier-locked versions

**ThinkShield:**
- Business/enterprise Motorola
- Usually locked down
- Not rootable typically

</details>


## Prerequisites

### Critical Requirements

::: danger ⚠️ BEFORE YOU START

**Warranty Void:** Motorola explicitly voids warranty upon unlock. No reversal.

**Unlock Code Required:** Must request from Motorola website. Process takes time.

**Data Wipe:** Unlocking erases all data including internal storage.

**No Insurance:** Warranty and service completely void after unlock.

**Carrier Check:** Verify your device can be unlocked. Many US carrier models cannot.
:::

### Hardware Requirements

- Motorola device (unlockable model)
- Quality USB cable
- Computer (Windows, macOS, Linux)
- 50%+ battery charge

### Software Requirements

**On Computer:**

1. **Platform Tools**
   - Download: [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools)

2. **Motorola USB Drivers** (Windows)
   - Usually auto-install
   - Or [Download from Motorola](https://en-us.support.motorola.com/app/usb-drivers)

3. **Web Browser**
   - For unlock code request
   - Valid email address

**On Device:**

1. **Magisk APK**
   - Download: [Magisk GitHub](https://github.com/topjohnwu/Magisk/releases)

2. **Motorola Account**
   - For unlock code request
   - Valid email

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

Motorola requires official unlock code from their website.

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
(bootloader) 0A40040192024205#4C4D3556313
(bootloader) 230800000000000#BD00A0A40310F0
(bootloader) 0A40040192024205#4C4D355631
```

**Combine to:**
```
0A40040192024205#4C4D35563132308000000000000#BD00A0A40310F00A40040192024205#4C4D3556313
```

### Step 2: Request Unlock Code

1. Visit [Motorola Bootloader Unlock](https://motorola-global-portal.custhelp.com/app/standalone/bootloader/unlock-your-device-a)

2. **Read warnings carefully:**
   - Warranty void
   - Data wipe
   - Permanent consequences

3. **Enter device information:**
   - Device model
   - Device ID string (from Step 1)
   - Valid email address

4. **Submit request**

5. **Check email:**
   - Unlock code sent to email
   - May take minutes to hours
   - Check spam folder

**Email contains unique unlock code (example):**
```
Your unique unlock code: ABCDEF1234567890
```

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
fastboot oem unlock ABCDEF1234567890
# Replace with your actual unlock code
```

**On Device:**
- Warning screen may appear
- Device automatically wipes
- Bootloader unlocks
- Device reboots

**Some Motorola devices use:**
```bash
fastboot flashing unlock
# Then confirm on device screen
```

### Step 3: Verify Unlock

After reboot:
```bash
adb reboot bootloader
fastboot getvar unlocked
# Should return: yes
```

Or check on boot:
- "Bootloader unlocked" warning (normal)

---

## Root Installation

### Determine Correct Image

| Device | Android Version | Image to Patch |
|--------|-----------------|----------------|
| Edge 50 series | Android 14 | init_boot.img |
| Edge 40 series | Android 13/14 | init_boot.img |
| Edge 30 series | Android 12/13 | boot.img or init_boot.img |
| Moto G (2023-2024) | Android 13/14 | init_boot.img |
| Moto G (2022 and older) | Android 12 and below | boot.img |

**Check Magisk app "Ramdisk" field if unsure.**

### Method 1: Boot Image Patching

**Step 1: Get Stock Firmware**

1. Download from [Motorola Firmware](https://mirrors.lolinet.com/firmware/moto/) or XDA
2. Extract firmware archive
3. Find boot.img or init_boot.img

**Step 2: Transfer to Device**

```bash
# For newer devices
adb push init_boot.img /sdcard/Download/

# For older devices
adb push boot.img /sdcard/Download/
```

**Step 3: Patch with Magisk**

```bash
# Install Magisk
adb install Magisk-v27.0.apk
```

On device:
1. Open Magisk
2. Install > Select and Patch a File
3. Choose boot/init_boot image
4. Wait for patching

**Step 4: Flash Patched Image**

```bash
# Get patched image
adb pull /sdcard/Download/magisk_patched_xxxxx.img ./

# Boot to fastboot
adb reboot bootloader

# Flash
# For Android 13/14
fastboot flash init_boot magisk_patched_xxxxx.img

# For Android 12 and older
fastboot flash boot magisk_patched_xxxxx.img

# Reboot
fastboot reboot
```

**Step 5: Verify Root**

1. Open Magisk app
2. Should show installed
3. Test: `adb shell su`

---

## Post-Root Setup

### Configure Magisk

**Settings:**
- **Zygisk**: Enable
- **Enforce DenyList**: Enable
- **Hide Magisk**: For banking

**DenyList:**
- Google Play Services
- Banking apps
- Payment apps

### Motorola Optimization

**Battery:**
1. Settings > Battery
2. Magisk and root apps
3. Set "Unrestricted"

**Background:**
- Allow background activity
- Disable battery optimization

### Recommended Modules

- **Universal SafetyNet Fix**
- **Shamiko**
- **LSPosed**
- **Systemless Hosts**

---

## OTA Handling

### For A/B Devices

**Process:**
1. Download OTA
2. Magisk > Install to Inactive Slot
3. Reboot
4. Root preserved

---

## Troubleshooting

<details><summary>Click to expand troubleshooting</summary><br>

### Unlock Code Issues

**Code Not Received**

Solutions:
- Check spam folder
- Wait 24-48 hours
- Re-submit request
- Use different email
- Contact Motorola support

**Code Doesn't Work**

Solutions:
- Verify copied correctly
- Check for extra spaces
- Try without hyphens
- Re-request code

### Bootloader Issues

**OEM Unlocking Greyed Out**

Causes:
- Carrier-locked device
- ThinkShield enabled
- Business/enterprise model

If grey: Device likely cannot unlock

**Unlock Command Fails**

Solutions:
- Verify code exactly
- Try both commands:
  - `fastboot oem unlock CODE`
  - `fastboot flashing unlock`
- Check device compatibility

### Installation Issues

**Magisk Not Working**

Solutions:
1. Verify correct image
2. Check Android version
3. Re-patch and flash
4. Clear Magisk data

**Bootloop**

```bash
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
fastboot flash init_boot stock_init_boot.img
fastboot reboot
```

### Relock Bootloader

::: danger RELOCK WARNING
Only when completely stock. Warranty already void (doesn't restore).
:::

```bash
fastboot oem lock
# Or
fastboot flashing lock
```

---

## Custom ROMs

### Popular ROMs

**LineageOS:**
- Official for many Moto G
- Stable and maintained

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

1. **Hide Magisk** for apps
2. **Configure DenyList**
3. **Trusted modules only**
4. **Keep updated**

---

## Community Resources

**Official Motorola:**
- [Bootloader Unlock](https://motorola-global-portal.custhelp.com/app/standalone/bootloader/unlock-your-device-a) - Official unlock
- [Motorola Support](https://www.motorola.com/us/support) - General support

**Developer Community:**
- [XDA Motorola Forums](https://xdaforums.com/c/motorola.11990/) - Development
- [Reddit r/MotoG](https://www.reddit.com/r/MotoG/) - Community
- [Reddit r/Motorola](https://www.reddit.com/r/Motorola/) - General Motorola

**Awesome Android Root help resources:**
- [FAQs](../faqs)
- [Troubleshooting Guide](../troubleshooting)

### Getting Help

**Provide:**
- Exact Motorola model
- Android version
- Unlock code status
- Error messages
- Steps attempted

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
