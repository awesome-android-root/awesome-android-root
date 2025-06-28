---
layout: doc
title: Bootloader Unlocking Guide 2025 
description: "Complete bootloader unlocking guide for 2025. Learn what bootloaders are & step-by-step guide for Google Pixel, Xiaomi, Samsung, OnePlus, and Motorola."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root/android-root-guides/bootloader-unlocking
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Bootloader Unlocking Guide 2025 - All Android Manufacturers
  - - meta
    - property: og:description
      content: Complete bootloader unlocking guide for 2025. Learn what bootloaders are & step-by-step guide for Google Pixel, Xiaomi, Samsung, OnePlus, and Motorola.
  - - meta
    - property: og:url
      content: https://awesome-android-root/android-root-guides/bootloader-unlocking
  - - meta
    - property: og:image
      content: https://awesome-android-root/images/og.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Bootloader Unlocking Guide 2025 - All Android Manufacturers
  - - meta
    - name: twitter:description
      content: Complete bootloader unlocking guide for 2025. Learn what bootloaders are & step-by-step guide for Google Pixel, Xiaomi, Samsung, OnePlus, and Motorola.
  - - meta
    - name: keywords
      content: how to root, android rooting, bootloader unlock guide 2025, android bootloader unlock, fastboot unlock bootloader, xiaomi mi unlock tool, samsung bootloader unlock, google pixel unlock, oneplus bootloader unlock, motorola unlock code, sony bootloader unlock, oem unlocking, fastboot commands, adb fastboot guide, bootloader unlock tutorial, android development, custom recovery, twrp install, magisk install preparation
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Bootloader Unlocking
  - - meta
    - property: article:tag
      content: Bootloader Unlock
  - - meta
    - property: article:tag
      content: Android Bootloader
  - - meta
    - property: article:tag
      content: Fastboot
  - - meta
    - property: article:tag
      content: OEM Unlocking
  - - meta
    - property: article:tag
      content: Google Pixel
  - - meta
    - property: article:tag
      content: Xiaomi Mi Unlock
  - - meta
    - property: article:tag
      content: Samsung Knox
  - - meta
    - property: article:tag
      content: OnePlus Unlock
  - - meta
    - property: article:tag
      content: Motorola Unlock
  - - meta
    - property: article:tag
      content: Sony Bootloader
  - - meta
    - property: article:tag
      content: ADB Fastboot
  - - meta
    - property: article:tag
      content: Custom Recovery
  - - meta
    - property: article:tag
      content: Android Development
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: viewport
      content: width=device-width, initial-scale=1.0
  - - meta
    - property: article:published_time
      content: 2025-01-01T00:00:00Z
  - - meta
    - property: article:modified_time
      content: 2025-06-25T00:00:00Z
---

# Bootloader Unlocking Guide

Complete guide to understanding and unlocking Android bootloaders - the essential first step for rooting, custom ROMs, and advanced Android customization.

## Table of Contents
- [Quick Start](#quick-start)
- [What is a Bootloader?](#what-is-a-bootloader)
- [Why Unlock Your Bootloader?](#why-unlock-your-bootloader)
- [Before You Begin](#before-you-begin)
  - [Important Warnings](#important-warnings)
  - [Prerequisites](#prerequisites)
  - [What You'll Need](#what-youll-need)
- [Universal Preparation Steps](#universal-preparation-steps)
- [Manufacturer-Specific Instructions](#manufacturer-specific-instructions)
  - [Google Pixel](#google-pixel)
  - [Xiaomi](#xiaomi)
  - [OnePlus](#oneplus)
  - [Samsung](#samsung)
  - [Motorola](#motorola)
  - [Sony](#sony)
  - [Other Manufacturers](#other-manufacturers)
- [Post-Unlock Steps](#post-unlock-steps)
- [Troubleshooting](#troubleshooting)
- [Bootloader Unlock: Wall of Shame](#bootloader-unlock-wall-of-shame)

## Quick Start

**New to bootloader unlocking?** Here's your roadmap:

1. 🔍 **[Understand what bootloaders are](#what-is-a-bootloader)** - Learn the basics
2. ⚠️ **[Read important warnings](#important-warnings)** - Know the risks
3. 📋 **[Complete prerequisites](#prerequisites)** - Prepare your device and tools
4. 🛠️ **[Follow universal preparation](#universal-preparation-steps)** - Enable developer options and ADB
5. 📱 **[Use manufacturer-specific guide](#manufacturer-specific-instructions)** - Unlock your device
6. ✅ **[Complete post-unlock steps](#post-unlock-steps)** - Verify and secure your device

### Related Guides
- **[📖 Complete Rooting Guide](./index.md)** - Master guide for all rooting aspects
- **[🛠️ Custom Recovery Installation](./custom-recovery.md)** - Next step after unlock
- **[🌟 Custom ROM Installation](./custom-rom-installation.md)** - Transform your Android experience
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Support and solutions

## What is a Bootloader?

A **bootloader** is a small program that runs when your Android device powers on. Think of it as the gatekeeper that:

- **Starts the operating system** - Loads Android when you turn on your device
- **Verifies system integrity** - Checks that the software hasn't been tampered with
- **Controls what can run** - Determines which operating systems and recovery modes are allowed
- **Manages security** - Enforces manufacturer restrictions and security policies

### Locked vs Unlocked Bootloaders

| **Locked Bootloader** | **Unlocked Bootloader** |
|------------------------|--------------------------|
| ✅ Maximum security | ✅ Full customization freedom |
| ✅ Official updates work seamlessly | ✅ Can install custom ROMs |
| ✅ Banking apps work without issues | ✅ Can install custom recovery |
| ❌ No custom modifications allowed | ✅ Advanced root access possible |
| ❌ Cannot install custom recovery | ❌ Voids manufacturer warranty |
| ❌ Limited customization options | ❌ Potential security risks |

## Why Unlock Your Bootloader?

Unlocking your bootloader is the **essential first step** for advanced Android customization:

### Primary Benefits
- 🔓 **Enable Root Access** - Required for Magisk, KernelSU, and APatch installation
- 🎨 **Custom ROMs** - Install LineageOS, Pixel Experience, and other custom Android versions
- 🛠️ **Custom Recovery** - Install TWRP, OrangeFox, or SKYHAWK for advanced system management
- 🔧 **Kernel Modifications** - Install custom kernels for better performance
- 📱 **Complete Device Control** - Full access to system files and configurations

### The Complete Modification Chain
**Bootloader unlocking enables this progression:**
1. **Unlocked Bootloader** ✅ (This guide)
2. **[Custom Recovery](./custom-recovery.md)** - TWRP, OrangeFox, or SKYHAWK
3. **[Root Access](./index.md#root-solutions-comparison)** - Magisk, KernelSU, or APatch  
4. **Advanced Modifications** - Custom ROMs, kernels, and system tweaks

### Advanced Use Cases
- **Development and Testing** - Essential for Android developers and power users
- **Privacy Enhancement** - Install privacy-focused custom ROMs
- **Performance Optimization** - Advanced tweaking and optimization options
- **Rescue Operations** - Ability to recover from soft bricks and system failures

## Before You Begin

### Important Warnings

::: danger ⚠️ CRITICAL WARNINGS
**Read these warnings carefully before proceeding:**

- **🗑️ DATA LOSS**: Unlocking bootloader **WILL ERASE ALL DATA** on your device
- **🔒 WARRANTY VOID**: Most manufacturers void warranty when bootloader is unlocked
- **🏦 BANKING APPS**: Some banking and financial apps may stop working
- **🔐 SECURITY RISK**: Unlocked bootloaders reduce device security
- **📱 BRICK RISK**: Improper procedures can render your device unusable
- **🚫 NO GOING BACK**: Some devices cannot relock bootloader after unlocking
:::

### Prerequisites

Before starting, ensure you meet these requirements:

#### Device Requirements
- ✅ **Supported Device** - Your device must support bootloader unlocking.
> Check [wall of shame section](#bootloader-unlock-wall-of-shame-1).

- ✅ **Sufficient Battery** - At least 50% battery charge
- ✅ **Stable Connection** - Reliable USB cable and computer connection
- ✅ **Backup Complete** - All important data backed up externally

#### Knowledge Requirements
- 📚 **Basic Understanding** - Familiarity with Android system concepts
- 💻 **Computer Skills** - Comfortable using command line/terminal
- 🔧 **Troubleshooting** - Ability to follow technical instructions carefully
- ⏰ **Time Availability** - 1-3 hours depending on manufacturer

#### Legal Requirements
- 📜 **Warranty Acceptance** - Understanding that warranty will be voided
- 🔓 **Account Access** - Access to manufacturer developer accounts (if required)
- 📱 **Device Ownership** - Must own the device legally

### What You'll Need

#### Software Requirements
- **ADB and Fastboot Tools**
  - [Platform Tools](https://developer.android.com/studio/releases/platform-tools) from Google
  - Or [Minimal ADB and Fastboot](https://androidfilehost.com/?fid=746010030569952951)
- **Device Drivers** (Windows users)
  - Manufacturer-specific USB drivers
  - [Universal ADB Drivers](https://adb.clockworkmod.com/) as backup
- **Manufacturer Tools** (varies by brand)
  - Mi Unlock Tool (Xiaomi)
  - Odin (Samsung)
  - MSM Download Tool (OnePlus)

#### Hardware Requirements
- **Computer** - Windows, macOS, or Linux
- **USB Cable** - Original or high-quality data cable
- **Stable Power** - Uninterrupted power supply for both devices

## Universal Preparation Steps

These steps apply to all Android devices regardless of manufacturer:

### Step 1: Enable Developer Options
1. Go to **Settings** → **About Phone**
2. Find **Build Number** (may be under "Software Information")
3. Tap **Build Number** 7 times rapidly
4. Enter your lock screen PIN/password when prompted
5. You'll see "You are now a developer!" message

### Step 2: Enable Critical Developer Settings
Navigate to **Settings** → **System** → **Developer Options** and enable:

- ✅ **USB Debugging** - Allows computer to communicate with device
- ✅ **OEM Unlocking** - Permits bootloader unlocking (crucial!)
- ✅ **USB Debugging (Security Settings)** - If available

::: tip 💡 Can't Find OEM Unlocking?
If "OEM Unlocking" is missing or grayed out:
- Connect to WiFi and wait 24-48 hours
- Some carriers block this option permanently
- Device may not support bootloader unlocking
:::

### Step 3: Set Up ADB and Fastboot
#### Windows Installation
1. Download [Platform Tools](https://developer.android.com/studio/releases/platform-tools)
2. Extract to `C:\platform-tools\`
3. Add to system PATH or use full path in commands
4. Install manufacturer USB drivers

#### macOS/Linux Installation
```bash
# macOS (using Homebrew)
brew install android-platform-tools

# Ubuntu/Debian
sudo apt install android-tools-adb android-tools-fastboot

# Arch Linux
sudo pacman -S android-tools
```

### Step 4: Test ADB Connection
1. Connect device to computer via USB
2. Select **"File Transfer"** or **"MTP"** mode
3. Allow USB debugging when prompted
4. Test connection:
```bash
adb devices
```
Expected output: `[device_serial] device`

### Step 5: Boot to Fastboot Mode
```bash
adb reboot bootloader
```
Or use hardware keys (varies by device):
- **Most devices**: Power + Volume Down
- **Samsung**: Power + Volume Down + Home (older models)

::: tip 💡 Fastboot Mode Ready
Once in fastboot mode, you're ready to proceed with manufacturer-specific unlocking. The next step varies significantly by brand - choose your manufacturer below!
:::

## Manufacturer-Specific Instructions

::: warning ⚠️ Device-Specific Process
**Each manufacturer has different requirements and procedures.** Find your device manufacturer below and follow the specific instructions. Using the wrong method can brick your device.
:::

**Quick Manufacturer Navigation:**
- 🔹 **[Google Pixel](#google-pixel)** - Easiest process, official support
- 🔹 **[Xiaomi](#xiaomi)** - Requires Mi Account and waiting period  
- 🔹 **[OnePlus](#oneplus)** - Generally straightforward process
- 🔹 **[Samsung](#samsung)** - Most restrictive, Exynos models only
- 🔹 **[Motorola](#motorola)** - Official unlock codes required
- 🔹 **[Sony](#sony)** - Developer portal registration needed
- 🔹 **[Other Manufacturers](#other-manufacturers)** - Various methods

### Google Pixel

Google Pixel devices have the most straightforward unlocking process:

#### Compatibility
- ✅ **All Pixel Models** - Pixel 1 through Pixel 9 series
- ✅ **Carrier Variants** - Most variants supported (Verizon models may be locked)

#### Steps
1. Complete [Universal Preparation](#universal-preparation-steps)
2. Boot to fastboot mode:
```bash
adb reboot bootloader
```
3. Unlock bootloader:
```bash
fastboot flashing unlock
```
4. Use volume keys to select **"UNLOCK THE BOOTLOADER"**
5. Press power button to confirm
6. Device will factory reset and reboot

#### Verification
```bash
fastboot getvar unlocked
# Should return: unlocked: yes
```

::: tip ✅ Success! What's Next?
**Congratulations!** Your Pixel bootloader is now unlocked. The next step is typically to [install custom recovery](./custom-recovery.md) to enable advanced modifications like rooting.
:::

### Xiaomi

Xiaomi requires official approval through their Mi Unlock Tool:

#### Prerequisites
- Active Mi Account (must be logged in on device for 7+ days)
- Mi Unlock Tool from official Xiaomi website
- Waiting period (varies: 7-30 days depending on device/region)

#### Steps
1. **Apply for Unlock Permission**
   - Settings → Additional Settings → Developer Options
   - Mi Unlock Status → Add account and device
   - Wait for SMS approval (7-30 days)

2. **Download Mi Unlock Tool**
   - Visit [official Xiaomi unlock page](https://en.miui.com/unlock/)
   - Download latest Mi Unlock Tool
   - Install on Windows computer

3. **Unlock Process**
   - Boot device to fastboot mode
   - Connect to computer
   - Launch Mi Unlock Tool
   - Sign in with same Mi Account
   - Click "Unlock" and follow prompts

#### Common Issues
- **Waiting Period**: Cannot be bypassed, wait for official approval
- **Region Restrictions**: Some regions have longer waiting periods
- **Account Binding**: Mi Account must be added to device before applying

::: tip ✅ Xiaomi Unlocked Successfully?
**Great job!** Xiaomi devices with unlocked bootloaders work excellently with custom recoveries. Next step: [Install Custom Recovery](./custom-recovery.md) - TWRP and OrangeFox have excellent Xiaomi support.
:::

### OnePlus

OnePlus devices generally allow easy bootloader unlocking:

#### Compatibility
- ✅ **Most OnePlus Models** - OnePlus One through OnePlus 12
- ⚠️ **Carrier Variants** - T-Mobile versions may have restrictions

#### Steps
1. Complete [Universal Preparation](#universal-preparation-steps)
2. Boot to fastboot mode:
```bash
adb reboot bootloader
```
3. Unlock bootloader:
```bash
fastboot oem unlock
```
4. Use volume keys to navigate menu
5. Select **"UNLOCK THE BOOTLOADER"**
6. Confirm with power button

#### Alternative Method (newer devices)
```bash
fastboot flashing unlock
```

::: tip ✅ OnePlus Unlocked Successfully?
**Excellent!** OnePlus devices have great custom development support. Ready for the next step? [Install Custom Recovery](./custom-recovery.md) to unlock advanced modifications.
:::

### Samsung

Samsung has the most restrictive bootloader policy:

#### Important Notes
- 🚫 **US Snapdragon Models**: Generally **CANNOT** be unlocked
- ✅ **International Exynos Models**: Usually unlockable
- ⚠️ **KNOX Warning**: Unlocking triggers KNOX and voids warranty permanently

#### Compatibility Check
1. Install **Phone INFO ★SAM★** app
2. Check **"OEM Lock"** status
3. If shows **"ON (U)"**, bootloader is **permanently locked**
4. If shows **"OFF"**, unlocking may be possible

#### Steps (Exynos Models Only)
1. Complete [Universal Preparation](#universal-preparation-steps)
2. Power off device completely
3. Enter download mode: **Volume Down + Power**
4. Long press **Volume Up** to unlock bootloader
5. Follow on-screen warnings and confirmations
6. Device will factory reset and show **"Custom"** on boot

::: warning ⚠️ Samsung Knox Triggered
**Knox has been permanently triggered.** Your device will show "Custom" on boot screen and some Samsung Pay/Knox features may not work. However, you can now proceed with [custom recovery installation](./custom-recovery.md).
:::

### Motorola

Motorola provides official bootloader unlocking:

#### Prerequisites
- Motorola account registration
- Device compatibility check on Motorola website

#### Steps
1. **Get Unlock Code**
   - Visit [Motorola Bootloader Unlock](https://motorola-global-portal.custhelp.com/app/standalone/bootloader/unlock-your-device-a)
   - Enter device information
   - Receive unlock code via email

2. **Unlock Process**
   - Boot to fastboot mode
   - Get bootloader info:
```bash
fastboot oem get_unlock_data
```
   - Submit this data to Motorola website
   - Receive unique unlock key
   - Apply unlock key:
```bash
fastboot oem unlock [UNIQUE_KEY]
```

::: tip ✅ Motorola Unlocked Successfully?
**Perfect!** Motorola devices have solid custom development support. Time for the next step: [Install Custom Recovery](./custom-recovery.md) to enable advanced system modifications.
:::

### Sony

Sony supports bootloader unlocking for most devices:

#### Steps
1. **Check Device Compatibility**
   - Visit [Sony Developer Portal](https://developer.sony.com/develop/open-devices/get-started/unlock-bootloader/)
   - Enter IMEI to check if unlocking is allowed

2. **Get Unlock Code**
   - Create Sony Developer account
   - Submit device details
   - Receive unlock code

3. **Unlock Process**
   - Boot to fastboot mode
   - Apply unlock code:
```bash
fastboot oem unlock 0x[UNLOCK_CODE]
```

::: tip ✅ Sony Unlocked Successfully?
**Fantastic!** Sony devices are developer-friendly with good custom ROM support. Ready to continue? [Install Custom Recovery](./custom-recovery.md) for advanced system management.
:::

### Other Manufacturers

#### HTC
- Official unlock through HTCDev website
- Similar process to Motorola

#### LG
- Limited official support
- HTC method may work on some models

#### Huawei/Honor
- Official unlocking discontinued
- Third-party methods may exist (use caution)

## Post-Unlock Steps

After successfully unlocking your bootloader:

### Immediate Actions
1. **Complete Initial Setup** - Device will boot to setup wizard
2. **Re-enable Developer Options** - Follow [Step 1](#step-1-enable-developer-options) again
3. **Re-enable USB Debugging** - Required for future modifications

### Verification
Confirm bootloader is unlocked:
```bash
adb reboot bootloader
fastboot getvar unlocked
# Should return: unlocked: yes
```

### Security Considerations
- **Screen Lock**: Set up strong screen lock (PIN/password/biometric)
- **App Sources**: Be cautious with app installations
- **Root Access**: Only install trusted root solutions
- **Banking Apps**: Test critical apps and have alternatives ready

### Next Steps
With unlocked bootloader, you can now:
- **[🛠️ Install Custom Recovery](./custom-recovery.md)** - Essential next step for rooting
- **[🔧 Root Your Device](./index.md#root-solutions-comparison)** - Magisk, KernelSU, or APatch
- **[🎨 Install Custom ROMs](./index.md#advanced-framework-solutions)** - LineageOS, Pixel Experience, etc.

::: tip 📋 Recommended Next Step
**[Install Custom Recovery](./custom-recovery.md)** is typically the next step after bootloader unlocking. Our comprehensive guide covers TWRP, OrangeFox, and SKYHAWK Recovery installation.
:::

::: warning ⚠️ Important: Boot to Recovery First
After installing custom recovery, **boot directly to recovery mode** before the first normal boot to prevent the stock recovery from being restored automatically.
:::

## Troubleshooting

### Common Issues and Solutions

#### "OEM Unlocking" Missing/Grayed Out
**Possible Causes:**
- Device not connected to internet
- Carrier-locked device
- Regional restrictions

**Solutions:**
- Connect to WiFi and wait 24-48 hours
- Try different network (mobile data vs WiFi)
- Contact carrier about unlock policy

#### Fastboot Not Recognized
**Symptoms:** `fastboot devices` returns nothing

**Solutions:**
- Install proper USB drivers (Windows)
- Try different USB ports/cables
- Disable antivirus temporarily
- Use different computer if available

#### "Remote: Not Allowed"
**Meaning:** Manufacturer has blocked bootloader unlocking

**Solutions:**
- Verify device model compatibility
- Check if carrier variant supports unlocking
- Some devices require official manufacturer unlock

#### Device Won't Boot After Unlock
**Immediate Actions:**
1. Don't panic - this is often normal
2. Hold power button for 10+ seconds to force restart
3. Try booting to recovery mode
4. If still issues, boot to fastboot and re-flash stock firmware

### Emergency Recovery

If device becomes unresponsive:

#### Soft Brick Recovery
1. Boot to fastboot mode (hardware keys)
2. Flash stock boot image:
```bash
fastboot flash boot boot.img
```
3. Restart device:
```bash
fastboot reboot
```

#### Hard Brick Prevention
- Always have stock firmware downloaded
- Know your device's emergency download mode
- Keep manufacturer rescue tools ready (Odin, MSM Tool, etc.)

## Bootloader Unlock: Wall of Shame

### [Bootloader Unlock: Wall of Shame](https://github.com/melontini/bootloader-unlock-wall-of-shame)

This community-maintained repository tracks companies that make bootloader unlocking difficult or impossible:

#### 🚫 Most Restrictive
- **Samsung US (Snapdragon)** - Permanently locked, no official method
- **Huawei/Honor (2018+)** - Discontinued official unlocking
- **Verizon Devices** - Most models have locked bootloaders

#### ⚠️ Partially Restrictive  
- **Xiaomi** - Requires waiting period and approval
- **Oppo/OnePlus (newer)** - Increasingly restrictive policies
- **Realme** - Limited official support

#### ✅ Developer-Friendly
- **Google Pixel** - Easy official unlocking
- **Sony** - Official developer support
- **Motorola** - Official unlock portal

::: tip 💡 Before Buying
Check the Wall of Shame repository before purchasing a device if bootloader unlocking is important to you. Policies change frequently, and newer models may have different restrictions than older ones.
:::

---
::: tip 🚀 What's After Bootloader Unlocking?
1. **[Install Custom Recovery](./custom-recovery.md)** - TWRP, OrangeFox, or SKYHAWK
2. **[Root Your Device](./index.md#root-solutions-comparison)** - Magisk, KernelSU, or APatch
3. **[Install Custom ROMs](./custom-rom-installation.md)** - LineageOS, GrapheneOS, and more
4. **[Advanced Customization](./index.md#advanced-framework-solutions)** - LSPosed modules and tweaks
:::

### Need Help?
- **[❓ FAQ](../faqs.md)** - Common questions and solutions
- **[💬 Community](../about.md#community--resources)** - Connect with other users

