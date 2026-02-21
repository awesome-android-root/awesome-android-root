---
layout: doc
title: Complete Magisk Root Guide 2026
description: "Master Magisk rooting with our comprehensive guide. Install systemless root, modules, and advanced root management for all Android devices safely."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/rooting-guides/magisk-guide
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Magisk Root Guide 2026 - Universal Android Rooting Solution
  - - meta
    - property: og:description
      content: Install Magisk root with our comprehensive guide. Master systemless rooting with advanced module system, root hiding, and complete device management.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/rooting-guides/magisk-guide
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/magisk-guide.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Magisk Root Guide 2026 - Universal Systemless Root
  - - meta
    - name: twitter:description
      content: Master Magisk installation with systemless rooting, module support, and advanced root management for all Android devices.
  - - meta
    - name: keywords
      content: magisk root guide 2026, systemless root installation, magisk modules, android rooting, zygisk magisk, magisk manager, root hiding, play integrity fix, magisk delta, magisk boot image patching, magisk installation tutorial, android root 2026, magisk denylist, magisk shamiko
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Rooting Solutions
  - - meta
    - property: article:tag
      content: Magisk Root 2026
  - - meta
    - property: article:tag
      content: Systemless Root
  - - meta
    - property: article:tag
      content: Android Rooting
  - - meta
    - property: article:tag
      content: Magisk Modules
  - - meta
    - property: article:tag
      content: Root Management
  - - meta
    - property: article:tag
      content: Play Integrity Fix
  - - meta
    - property: article:published_time
      content:  2025-10-07T09:00:00Z
  - - meta
    - property: article:modified_time
      content: 2025-12-26T00:00:00Z
  - - meta
    - name: robots
      content: index, follow, max-image-preview:large
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Complete Magisk Root Installation Guide",
        "description": "Step-by-step guide to install Magisk systemless root on Android devices",
        "totalTime": "PT45M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD", 
          "value": "0"
        },
        "tool": [
          {"@type": "HowToTool", "name": "Android Device with Unlocked Bootloader"},
          {"@type": "HowToTool", "name": "Computer with ADB/Fastboot"},
          {"@type": "HowToTool", "name": "Magisk APK"},
          {"@type": "HowToTool", "name": "Stock Boot Image"}
        ],
        "step": [
          {
            "@type": "HowToStep",
            "name": "Download Required Files",
            "text": "Download latest Magisk APK and extract boot.img from device firmware"
          },
          {
            "@type": "HowToStep",
            "name": "Patch Boot Image",
            "text": "Use Magisk app to patch the stock boot image creating magisk_patched.img"
          },
          {
            "@type": "HowToStep",
            "name": "Flash Patched Boot",
            "text": "Use fastboot to flash the patched boot image to device"
          },
          {
            "@type": "HowToStep",
            "name": "Install Magisk Manager",
            "text": "Install Magisk app for root management and module installation"
          }
        ]
      }
---

# Magisk Root Installation Guide

Industry-standard systemless root solution for Android. Install Magisk to gain complete control over your device while maintaining system integrity.

## Quick Navigation

- [What is Magisk](#understanding-magisk)
- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
- [Post-Installation](#post-installation-setup)
- [Module Management](#managing-modules)
- [Root Hiding](#root-hiding-and-play-integrity)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Complete rooting overview
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Required first step
- [Root Comparison](./root-framework-comparison.md) - Compare with KernelSU and APatch
- [Troubleshooting Guide](../troubleshooting.md)
- [FAQ](../faqs.md) - Common questions

---

## Understanding Magisk

Magisk is a systemless root solution that provides superuser access without modifying system partitions. It uses Magic Mount to overlay modifications, making root reversible and OTA-friendly.

### Core Features

- **Magic Mount overlays**: Virtualizes changes over read-only partitions (including EROFS on Android 13+)
- **Boot/init_boot patching**: Modifies the boot chain (not /system)
- **Zygisk**: Injects code into the Zygote process to enable powerful user-space modules
- **Reversible**: Uninstall to fully restore stock images (if you kept originals)

### Magisk vs Alternatives

| Feature | Magisk | KernelSU | APatch |
|---------|--------|----------|---------|
| Ease of Use | Excellent | Moderate | Moderate |
| Module Support | Excellent | Excellent | Good |
| Root Hiding | Good | Excellent | Excellent |
| Device Support | Universal | Limited | Limited |
| Custom Kernel Required | No | Yes | No |

**Choose Magisk if:**
- You want easiest installation
- You need extensive modules (explore [470+ apps](../apps-and-modules/))
- You want maximum compatibility
- You're new to rooting

> [!TIP]
> Detailed comaprison with other root solutions: [Root Comparison](./root-framework-comparison.md)

---

## Prerequisites

### Critical Requirements

::: danger ESSENTIAL PREREQUISITES
**Unlocked Bootloader** - Magisk requires unlocked bootloader. Complete [bootloader unlocking](./how-to-unlock-bootloader.md) first.

**Stock Firmware** - Download your device's stock firmware for boot image extraction.

**Complete Backup** - Backup all important data before proceeding.

**Battery 50%+** - Ensure sufficient battery to prevent interruption.
:::

### Hardware Requirements

- Android device with unlocked bootloader
- 50% or higher battery charge
- Quality USB cable (data-capable)
- Computer (Windows, macOS, or Linux)

### Software Requirements

**On Computer:**
- [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) (ADB/Fastboot)
- Device-specific USB drivers (Windows only)
- Stock firmware for your device

**On Device:**
- Latest Magisk APK from [GitHub](https://github.com/topjohnwu/Magisk/releases)
- File manager app
- At least 500MB free storage

### Compatibility Check

**Android Version Support:**

| Android Version | Magisk Support | Notes |
|-----------------|----------------|-------|
| Android 16 | Yes | Preview/Beta support |
| Android 15 | Yes | Full support |
| Android 14 | Yes | Full support |
| Android 13 | Yes | May require init_boot patching |
| Android 12 | Yes | Zygisk fully supported |
| Android 6-11 | Yes | Mature support |

**Check device compatibility:**
1. Verify bootloader is unlockable
2. Confirm stock firmware availability
3. Check [device-specific guides](./index.md#device-specific-guides) or [XDA forums](https://forum.xda-developers.com/) for device notes

---

## Installation Methods

Three installation methods available. Choose based on your device and comfort level.

### Method 1: Boot Image Patching (Recommended)

**Best for:** Most users, all modern devices

This is the official and safest method.

#### Step 1: Download Required Files

**Magisk APK:**
1. Visit [Magisk GitHub Releases](https://github.com/topjohnwu/Magisk/releases)
2. Download the latest `Magisk-v30.X.apk` (or newer)
3. Transfer to device

**Stock Boot Image:**

Determine correct partition:
- Android 13+ (most devices): `init_boot.img`
- Android 12 and older: `boot.img`
- Check in Magisk app: Shows "Ramdisk: Yes/No"

Extract from firmware:
- Google Pixel: Download factory image from [Google](https://developers.google.com/android/images)
- Samsung: Extract from AP file
- Xiaomi: Extract from fastboot ROM
- Other devices: Use payload-dumper-go for OTA files

#### Step 2: Patch Boot Image

1. **Install Magisk APK** on device
   - Enable "Install Unknown Apps" for file manager
   - Install downloaded APK

2. **Transfer boot image** to device
   - Copy boot.img or init_boot.img to Downloads folder

3. **Patch image in Magisk**
   - Open Magisk app
   - Tap "Install" next to Magisk
   - Select "Select and Patch a File"
   - Choose your boot/init_boot image
   - Wait for patching to complete
   - Note output location (usually Download folder)

Output file named: `magisk_patched_[random].img`

#### Step 3: Flash Patched Image

**Transfer to computer:**
```bash
adb pull /sdcard/Download/magisk_patched_xxxxx.img
```

**Boot to fastboot:**
```bash
adb reboot bootloader
```

**Verify fastboot connection:**
```bash
fastboot devices
```

**Flash patched image:**

For boot.img:
```bash
fastboot flash boot magisk_patched_xxxxx.img
```

For init_boot.img (Android 13+):
```bash
fastboot flash init_boot magisk_patched_xxxxx.img
```

**Reboot device:**
```bash
fastboot reboot
```


**Samsung (Odin devices):**
1. Copy the generated magisk_patched-xxxxx.tar to PC.
2.  Open Odin (Windows), load the patched TAR into AP.
3. Untick “Auto Reboot”, start flash. When done, force reboot to recovery (Power + Vol Up while disconnecting USB) and factory reset if required (VaultKeeper behavior; first unlock already wiped data).
4) First boot will be slower; open Magisk to finalize. KNOX is permanently tripped; Samsung Pay/Secure Folder may not work again.

#### Step 4: Verify Installation

1. First boot may take 2-5 minutes
2. Open Magisk app
3. Should show:
   - Magisk: Installed (version number)
   - App: Latest (version number)

::: tip SUCCESS CHECK
If Magisk app shows version numbers for both Magisk and App, installation succeeded!
:::

---

### Method 2: Custom Recovery Installation (Legacy)

**Best for:** Older devices, recovery users

**Note:** Not officially supported on modern Android. Use Method 1 instead.

If you must use recovery ([installation guide](./how-to-install-custom-recovery.md)):

1. Patch boot image using Method 1
2. Boot to custom recovery (TWRP/OrangeFox)
3. Install > Install Image
4. Select patched boot image
5. Choose Boot partition
6. Swipe to flash
7. Reboot system

---

### Method 3: Direct Installation (Advanced)

**Best for:** Switching from another root method, temporary root

**Scenario A: Already Rooted**

1. Install Magisk APK
2. Open Magisk app
3. Tap Install > Direct Install
4. Reboot

**Scenario B: Temporary Boot Method**

1. Patch boot image (Method 1, Step 2)
2. Boot patched image without flashing:
```bash
fastboot boot magisk_patched_xxxxx.img
```
3. Device boots with temporary root
4. Open Magisk > Install > Direct Install
5. Makes root permanent
6. Reboot

**Scenario C: Dump Current Boot Image**

If stock firmware unavailable:

```bash
adb shell su -c "dd if=/dev/block/by-name/boot of=/sdcard/boot.img"
```

Or for init_boot:
```bash
adb shell su -c "dd if=/dev/block/by-name/init_boot of=/sdcard/init_boot.img"
```

Then proceed with Method 1 patching.

---

## Post-Installation Setup

### Initial Configuration

**1. Verify Root Access**

Test with root checker app or terminal:
```bash
adb shell
su
```

Should grant root access.

**2. Configure Magisk Settings**

Open Magisk > Settings:

**Magisk Tab:**
- Preserve force encryption: Depends on preference
- Preserve AVB 2.0/dm-verity: Keep enabled
- Recovery Mode: Enable if using custom recovery

**App Tab:**
- Hide Magisk app: Recommended for banking apps
- Restore images: Keep enabled
- Grant root to shell: Enable for ADB root

**Zygisk:**
- Enable Zygisk: Recommended (required for many modules)
- Enforce DenyList: Enable for root hiding
- Configure DenyList: Add apps that detect root

**3. Security Settings**

Configure superuser access:
- Superuser access: Apps only
- Multiuser mode: Owner only
- Mount namespace mode: Isolated (recommended)
- Automatic response: Prompt (recommended)
- Request timeout: 10 seconds

Enable authentication:
- Biometric authentication: Enable
- Require authentication: Enable

---

## Managing Modules

### Installing Modules

**Installation Process:**

1. Download module ZIP file
2. Open Magisk app
3. Tap Modules tab
4. Tap "Install from storage"
5. Select module ZIP
6. Wait for installation
7. Reboot when prompted

::: warning MODULE SAFETY
Only install modules from trusted sources. Malicious modules can damage your system.
:::

**Trusted Module Sources:**
- Official GitHub repositories
- [Magisk Module Manager](https://github.com/MMRLApp/MMRL)
- [Our curated module collection](../apps-and-modules/)
- XDA Developers forums
- Known developers only

### Managing Installed Modules

**Enable/Disable Modules:**
- Tap module in list
- Toggle switch
- Reboot to apply

**Remove Modules:**
- Tap module
- Tap "Remove"
- Reboot to apply

**Module Issues:**

If module causes bootloop:
1. Boot to safe mode (power + volume down at boot)
2. Open Magisk
3. Disable problematic module
4. Reboot

Or via recovery:
```bash
rm -rf /data/adb/modules/[module_name]
```

Or via ADB:
```bash
adb wait-for-device shell magisk --remove-modules
```

---

## Root Hiding and Play Integrity

### Understanding Play Integrity

Google Play Integrity replaced SafetyNet. Three levels exist:

| Level | Description | Rooted Devices |
|-------|-------------|----------------|
| Basic | Basic app integrity | Easily passable |
| Device | Device integrity verified | Passable with Play Integrity Fix |
| Strong | Hardware attestation | Nearly impossible |

**Reality for Rooted Devices:**
- Basic & Device Integrity: Can pass using the Play Integrity Fix (PIF) module.
- Strong Integrity: Impossible with an unlocked bootloader.

### Configuring Root Hiding

**Step 1: Hide Magisk App**

1. Magisk > Settings
2. Tap "Hide the Magisk app"
3. Enter custom name (e.g., "Settings")
4. App repackages with new name and icon

**Step 2: Enable DenyList**

1. Magisk > Settings
2. Enable "Zygisk" (if not enabled)
3. Enable "Enforce DenyList"
4. Tap "Configure DenyList"

**Step 3: Configure DenyList**

Add these to DenyList:
- All banking/financial apps
- Payment apps (Google Wallet, etc.)
- Apps that detect root
- Games with anti-cheat

::: warning IMPORTANT
**Do NOT** add Google Play Services (GMS) or Google Play Store to the DenyList if you are using the Play Integrity Fix (PIF) module. Doing so will break the module's ability to spoof device integrity.
:::

For each app:
- Expand app entry
- Check all sub-processes
- Enable for all

**Step 4: Clear App Data**

After DenyList configuration:
1. Settings > Apps
2. Clear data for:
   - Google Play Store
   - Google Wallet / Pay
   - Banking apps
3. Reboot device
4. Reopen apps

### Advanced Root Hiding

**Install Shamiko Module:**

Shamiko hides root more effectively than the built-in DenyList.

1. Download Shamiko from [GitHub](https://github.com/LSPosed/LSPosed.github.io/releases)
2. Install via Magisk
3. Reboot
4. DenyList items are now hidden more effectively

**Note:** When using Shamiko, you must **configure** the DenyList but **do NOT enforce** it in Magisk settings. Shamiko reads the list and handles the hiding automatically.

> [!TIP]
> Check our [Root hiding section](./../apps-and-modules/index.md#root-hiding-and-integrity)

### Testing Play Integrity

**Apps to Test:**

1. **Play Integrity API Checker** - Standard checker
2. **SPIC (Simple Play Integrity Checker)** - Open-source and fast
3. **TB Checker** - Comprehensive checker

---

## Updates and Maintenance

### Updating Magisk

**In-App Updates:**

<details><summary>👉 Click to expand details</summary>

1. Magisk > Settings
2. Update channel: Stable (recommended)
3. When update available:
   - Tap Install button
   - Choose "Direct Install"
   - Reboot when complete

**Manual Updates:**

1. Download latest Magisk APK
2. Install over existing app
3. Open Magisk
4. Tap Install > Direct Install
5. Reboot

</details>

### OTA System Updates

<details><summary>👉 Click to expand details</summary>

**For A/B Devices (Most Modern Devices):**

1. Download OTA update (don't install yet)
2. Wait for "Ready to install" notification
3. Open Magisk
4. Tap Install
5. Select "Install to Inactive Slot (After OTA)"
6. Wait for completion
7. Reboot from system update
8. Verify Magisk still installed

**For Non-A/B Devices:**

1. Uninstall Magisk (Restore Images)
2. Install OTA update
3. Re-patch new boot image
4. Flash patched image
5. Reinstall modules

</details>

### Backup and Restore

<details><summary>👉 Click to expand details</summary>

**Backup Important Files:**
- Original boot/init_boot image
- Magisk installation files
- Module ZIPs
- DenyList configuration (screenshot)
- Full device backup using [backup tools](../apps-and-modules/#backup-and-restore)

**Restore to Stock:**

1. Magisk > Uninstall
2. Select "Restore Images"
3. Reboot
4. Root removed, system restored

Or flash stock boot image:
```bash
fastboot flash boot stock_boot.img
```

</details>

---

## Troubleshooting

### Installation Issues

**Magisk Shows N/A After Installation**

<details><summary>👉 Click to expand details</summary>

Causes:
- Wrong partition flashed (boot vs init_boot)
- Wrong image for device/Android version
- Flashed to inactive slot on A/B device

Solutions:
1. Verify correct partition for your device
2. Re-patch with correct boot image
3. Flash to currently active slot
4. Check Magisk app for "Ramdisk" status

</details>

**Device Bootloops After Flashing**

<details><summary>👉 Click to expand details</summary>

Solutions:
1. Boot to fastboot
2. Flash stock boot image:
```bash
fastboot flash boot stock_boot.img
fastboot reboot
```
3. Verify correct image for your device
4. Try different Magisk version
5. See [emergency recovery guide](../troubleshooting.md#emergency-recovery) for advanced solutions

</details>

**Fastboot Not Detecting Device**

<details><summary>👉 Click to expand details</summary>

Solutions:
- Reinstall USB drivers (Windows)
- Try USB 2.0 port
- Use different USB cable
- Update Platform Tools
- Try different computer

</details>

### Root Access Issues

**Apps Not Detecting Root**

<details><summary>👉 Click to expand details</summary>

Solutions:
1. Verify Magisk shows "Installed"
2. Check superuser requests tab
3. Grant root to shell: Magisk > Settings
4. Test with root checker app
5. Reinstall Magisk

</details>

**Root Randomly Lost**

<details><summary>👉 Click to expand details</summary>

Causes:
- Module conflict
- Magisk updated without direct install
- System update overwrote boot

Solutions:
1. Open Magisk > Install > Direct Install
2. Remove recently installed modules
3. Reboot device

</details>

### Module Problems

**Module Causes Bootloop**

<details><summary>👉 Click to expand details</summary>

Solutions:

Via recovery:
1. Boot to TWRP/custom recovery
2. File Manager
3. Navigate to `/data/adb/modules/`
4. Delete problematic module folder
5. Reboot

Via ADB:
```bash
adb wait-for-device shell
magisk --remove-modules
```

Via safe mode:
1. Force reboot: Hold power 10+ seconds
2. Boot to safe mode at logo
3. Open Magisk
4. Disable module
5. Reboot normally

</details>

**Module Not Working**

<details><summary>👉 Click to expand details</summary>

Solutions:
1. Verify Zygisk enabled (if module requires it)
2. Check module compatibility with Android version
3. Reinstall module
4. Check module logs: `/data/adb/modules/[module]/`
5. Contact module developer

</details>

### Banking App Issues

**App Detects Root Despite DenyList**

<details><summary>👉 Click to expand details</summary>

Solutions:
1. Hide Magisk app with a different name
2. Clear app data completely
3. Install Shamiko module
4. Try [Play Integrity Fix modules](../apps-and-modules/#root-hiding-and-play-integrity)
5. Check if app requires Device/Strong integrity (may be impossible)
6. See [comprehensive banking app solutions](../troubleshooting.md#play-integrity-and-banking-apps)

</details>

**App Crashes on Launch**

<details><summary>👉 Click to expand details</summary>

Solutions:
1. Remove app from DenyList temporarily
2. Clear app cache and data
3. Reinstall app
4. Check for app-specific Magisk modules
5. Try older app version

</details>

### Play Integrity Failures

<details><summary>👉 Click to expand details</summary>

**Basic or Device Integrity Fails**

Solutions:
1. Try the latest [Play Integrity Fix modules](../apps-and-modules/#root-hiding-and-play-integrity)
2. Clear Google Play Store data.
3. Reboot device.
4. If it still fails, the current fingerprint might be banned. Wait for a PIF update or use a custom `pif.json`.

**Strong Integrity Fails**

Reality: Impossible to pass with:
- Unlocked bootloader
- Custom boot image
- Hardware attestation

</details>

---

## Best Practices

### Security Recommendations

1. **Only grant root to trusted apps**
2. **Review superuser logs regularly**
3. **Keep Magisk updated**
4. **Backup before major changes**
5. **Test modules on non-critical device first**

### Module Management

1. **Install modules one at a time**
2. **Test after each installation**
3. **Keep list of installed modules**
4. **Remove unused modules**
5. **Update modules cautiously**

---

## Next Steps

**After Installing Magisk:**

1. **Install essential modules:**
   - [LSPosed Framework](./lsposed-guide.md) - Advanced app modifications and Xposed modules
   - [Ad blocking modules](../apps-and-modules/#ads-and-tracking-blockers) - System-wide ad blocking
   - [Performance modules](../apps-and-modules/#performance-and-optimization) - Device optimization and battery management

2. **Explore root apps:**
   - [Browse 470+ Root Apps](../apps-and-modules/) - Curated collection by category
   - [Starter Kit](../apps-and-modules/#starter-kit-must-have-apps) - Essential apps for new root users

3. **Learn advanced features:**
   - [Custom ROM Installation](./custom-rom-installation.md) - Next level
   - [Ad Blocking Guide](../general-guides/android-adblocking.md) - Block all ads
   - [Debloating Guide](../general-guides/android-apps-debloating.md) - Remove bloat

---


## Community Resources

**Official Resources:**
- [Magisk GitHub](https://github.com/topjohnwu/Magisk) - Source code and releases
- [Magisk Documentation](https://topjohnwu.github.io/Magisk/) - Official docs
- [XDA Magisk Forum](https://forum.xda-developers.com/f/magisk.5903/) - Community support

**Module Repositories:**
- [Magisk Module Manager](https://github.com/Magisk-Modules-Alt-Repo) - Module collection
- [Magisk Modules Repo](https://github.com/Magisk-Modules-Repo) - Official repo

**Support Communities:**
- [Reddit r/Magisk](https://www.reddit.com/r/Magisk/) - Community discussions
- [Telegram Magisk](https://t.me/magiskapp) - Official chat
- [XDA Device Forums](https://forum.xda-developers.com/) - Device-specific help

### Getting Help

**When asking for help, provide:**
- Device model and Android version
- Magisk version installed
- Installation method used
- Exact error messages or behavior
- Magisk log (Magisk > Save log)
- Steps already tried
