---
layout: doc
title: Nothing Phone Rooting Guide
description: "Complete step-by-step guide to root Nothing Phone 1, 2, 2a, and 3 series devices running Nothing OS in 2025."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/nothing-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Nothing Phone Rooting Guide - Nothing OS 2025
  - - meta
    - property: og:description
      content: Root your Nothing Phone with this comprehensive guide covering bootloader unlock, custom recovery, and Magisk installation for Nothing OS.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/nothing-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Nothing Phone Rooting Guide - Nothing OS 2025
  - - meta
    - name: twitter:description
      content: Complete step-by-step guide to root Nothing Phone devices. Covers bootloader unlock, custom recovery, and Magisk installation.
  - - meta
    - name: keywords
      content: nothing phone root guide, nothing os root, nothing phone bootloader unlock, nothing phone magisk, twrp nothing phone, nothing phone 1 root, nothing phone 2 root, nothing phone 2a root, nothing phone 3 root, nothing rooting 2025
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/fynks/awesome-android-root
  - - meta
    - property: article:section
      content: Rooting Guides
  - - meta
    - property: article:tag
      content: Nothing Phone
  - - meta
    - property: article:tag
      content: Nothing OS
  - - meta
    - property: article:tag
      content: Magisk
  - - meta
    - property: article:tag
      content: Bootloader Unlock
---
# Nothing Phone Rooting Guide

Complete step-by-step guide to root Nothing Phone 1, 2, 2a, and 3 series devices running Nothing OS in 2025.

## 🔗 Related Guides
Before starting, ensure you understand the basics:
- **[📖 Complete Rooting Guide](./index.md)** - Master guide covering all rooting aspects
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - Universal bootloader guide with Nothing Phone specifics
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - Install TWRP, OrangeFox, or SKYHAWK
- **[🌟 Custom ROM Installation](./custom-rom-installation.md)** - Install LineageOS, crDroid, and other ROMs
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Complete support guide with troubleshooting solutions

## ⚠️ Important Disclaimer

> **WARNING**: Unlocking the bootloader and rooting your Nothing Phone will:
> - **VOID YOUR WARRANTY** (may still be serviceable after removing root)
> - **ERASE ALL DATA** on your device
> - **COMPROMISE SECURITY** features like banking apps, DRM protection
> - Require technical knowledge and may **BRICK YOUR DEVICE** if done incorrectly
>
> **MAKE A COMPLETE BACKUP** before proceeding. You are solely responsible for any damage.

## Supported Devices

This guide supports the following Nothing Phone models:
- **Nothing Phone (1)** - `Spacewar`
- **Nothing Phone (2)** - `Pong`
- **Nothing Phone (2a)** - `Pacman`
- **Nothing Phone (2a) Plus** - `PacmanPlus`
- **Nothing Phone (3)** - `Asteroids`
- **Nothing Phone (3a)** - `AsteroidsPlus`

## Requirements

### 1. Hardware & Software
- **Windows PC/Mac/Linux** with USB port
- **USB Cable** (original Nothing cable recommended)
- **Nothing Phone** with at least 50% battery
- **Backup** of all important data

### 2. Essential Downloads
- **ADB & Fastboot Tools**
  - [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) (Latest version)
- **Magisk**
  - [Magisk Latest Release](https://github.com/topjohnwu/Magisk/releases) (v29.0 or newer)
- **Custom Recovery** (Optional but recommended)
  - [TWRP for Nothing Phone](https://twrp.me/Devices/)
  - [OrangeFox Recovery](https://orangefox.download/)
- **Stock Firmware** (For emergency recovery)
  - [Nothing Phone Firmware](https://nothing.tech/pages/support-software-download)

### 3. Alternative Root Solutions
For enhanced security and banking app compatibility:
- **[KernelSU](https://kernelsu.org/)** - Kernel-level root solution
- **[APatch](https://github.com/bmax121/APatch)** - Kernel-based root manager

## Steps

### 1. Enable Developer Options & USB Debugging

1. **Enable Developer Options**:
   - Go to **Settings > About phone**
   - Tap **Build number** 7 times until you see "You are now a developer!"

2. **Enable USB Debugging & OEM Unlocking**:
   - Go to **Settings > System > Developer options**
   - Enable **USB debugging**
   - Enable **OEM unlocking**
   - **Allow USB debugging** when prompted on your phone

3. **Test ADB Connection**:
   ```bash
   adb devices
   ```
   - Should show your device with "device" status
   - If showing "unauthorized", accept the prompt on your phone

### 2. Unlock Bootloader

> **Note**: This will completely wipe your device!

1. **Boot into Fastboot Mode**:
   ```bash
   adb reboot bootloader
   ```
   - Alternatively: Power off → Hold **Volume Down + Power** buttons

2. **Verify Fastboot Connection**:
   ```bash
   fastboot devices
   ```

3. **Unlock Bootloader**:
   ```bash
   fastboot flashing unlock
   ```
   - Use **Volume keys** to navigate to **"Unlock the bootloader"**
   - Press **Power button** to confirm
   - Device will erase and reboot

4. **Complete Setup**:
   - Go through initial setup
   - Re-enable **Developer options** and **USB debugging**

### 3. Method A: Root with Magisk (Boot Image Patching)

#### 3.1 Extract Boot Image

1. **Download Stock Firmware**:
   - Get the exact firmware for your device model and version
   - Extract the firmware package

2. **Extract Boot.img**:
   - Use a tool like **payload_dumper** or **firmware extractor**
   - Locate and extract `boot.img`

#### 3.2 Patch Boot Image

1. **Transfer Files to Phone**:
   - Copy `boot.img` to your phone's internal storage
   - Install **Magisk APK** on your phone

2. **Patch Boot Image**:
   - Open **Magisk app**
   - Tap **Install** → **Select and Patch a File**
   - Choose the `boot.img` file
   - Magisk will create `magisk_patched_[random].img`

3. **Transfer Patched Image**:
   - Copy the patched image back to your computer

#### 3.3 Flash Patched Boot

1. **Boot into Fastboot**:
   ```bash
   adb reboot bootloader
   ```

2. **Flash Patched Boot**:
   ```bash
   fastboot flash boot magisk_patched_[random].img
   ```

3. **Reboot System**:
   ```bash
   fastboot reboot
   ```

### 4. Method B: Root with Custom Recovery

#### 4.1 Flash Custom Recovery

1. **Download Recovery**:
   - Get TWRP or OrangeFox for your specific device model

2. **Flash Recovery**:
   ```bash
   fastboot flash recovery recovery.img
   ```

3. **Boot into Recovery**:
   ```bash
   fastboot reboot recovery
   ```
   - Or: **Volume Up + Power** after powering off

#### 4.2 Install Magisk via Recovery

1. **Transfer Magisk ZIP**:
   - Copy **Magisk ZIP** file to your phone

2. **Install via Recovery**:
   - In TWRP: **Install** → Select Magisk ZIP → **Swipe to confirm**
   - In OrangeFox: **Install** → Choose Magisk ZIP → **Install**

3. **Reboot System**:
   - Select **Reboot** → **System**

### 5. Verify Root Access

1. **Open Magisk App**:
   - Should show **Magisk** and **Zygisk** as installed

2. **Test Root**:
   - Download a root checker app
   - Or use terminal: `su` command should work

3. **Configure Magisk**:
   - Enable **Zygisk** for better app compatibility
   - Configure **DenyList** for banking apps
   - Install **Magisk modules** as needed

## Alternative Root Solutions

### KernelSU (Recommended for Security)

1. **Check Kernel Support**:
   - KernelSU requires specific kernel versions
   - Check compatibility at [KernelSU.org](https://kernelsu.org/)

2. **Installation**:
   - Flash KernelSU-supported kernel
   - Install KernelSU Manager app

### APatch (Kernel-based Alternative)

1. **Requirements**:
   - Unlocked bootloader
   - Compatible kernel

2. **Installation**:
   - Follow [APatch documentation](https://github.com/bmax121/APatch)

## Troubleshooting

### Common Issues

1. **Fastboot Not Recognized**:
   - Install proper USB drivers
   - Try different USB ports/cables
   - Use original Nothing USB cable

2. **Bootloop After Root**:
   - Flash stock boot.img: `fastboot flash boot boot.img`
   - Or use recovery to restore backup

3. **Banking Apps Not Working**:
   - Enable **Magisk Hide** / **DenyList**
   - Use **Universal SafetyNet Fix** module
   - Consider **KernelSU** for better compatibility

4. **Recovery Not Booting**:
   - Ensure correct recovery for your model
   - Some devices need `fastboot boot recovery.img` first

### Recovery Commands

```bash
# Flash stock firmware
fastboot update firmware.zip

# Erase userdata (factory reset)
fastboot -w

# Boot to recovery temporarily
fastboot boot recovery.img

# Flash individual partitions
fastboot flash boot boot.img
fastboot flash recovery recovery.img
```

## Security & Banking Apps

### Magisk Hide/DenyList Configuration

1. **Enable Zygisk**:
   - Magisk → Settings → Enable Zygisk

2. **Configure DenyList**:
   - Magisk → Settings → Configure DenyList
   - Add banking apps, Netflix, etc.

3. **Install Additional Modules**:
   - **Shamiko** (advanced hiding)


## Restore to Stock

### Unroot and Lock Bootloader

1. **Uninstall Magisk**:
   - Magisk → Uninstall → Complete Uninstall

2. **Flash Stock Firmware**:
   ```bash
   fastboot update stock_firmware.zip
   ```

3. **Lock Bootloader** (Optional):
   ```bash
   fastboot flashing lock
   ```
   > **Warning**: Only lock bootloader with stock firmware!

---

## Tips & Best Practices

### Before Rooting
- **Backup everything**: Use ADB backup, Titanium Backup, or built-in backup
- **Note down firmware version**: For finding correct stock files
- **Charge battery**: Ensure at least 50% battery

### After Rooting
- **Test thoroughly**: Ensure all basic functions work
- **Configure security**: Set up Magisk Hide for sensitive apps
- **Keep backups**: Regular NANDroid backups via custom recovery
- **Stay updated**: Keep Magisk and modules updated

### Security Considerations
- **Enable encryption**: Nothing phones support hardware encryption
- **Use strong passwords**: Root access requires careful password management
- **Monitor permissions**: Regularly review root app permissions
- **Banking apps**: Use Magisk Hide or consider KernelSU for better compatibility

---

**Disclaimer**: This guide is for educational purposes. Rooting voids warranty and carries risks. Always backup your device and proceed at your own risk. The authors are not responsible for any damage to your device.
