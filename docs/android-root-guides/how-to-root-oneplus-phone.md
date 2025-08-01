---
layout: doc
title: Complete OnePlus Rooting Guide
description: "Master guide to root all OnePlus devices - OnePlus 12, 11, 10, Nord series with bootloader unlock and Magisk installation for OxygenOS."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-root-oneplus-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete OnePlus Rooting Guide - All Models Supported
  - - meta
    - property: og:description
      content: Root any OnePlus device with our comprehensive guide covering bootloader unlock, MSM tool, custom recovery and Magisk installation for OxygenOS.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/how-to-root-oneplus-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/oneplus.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete OnePlus Rooting Guide - All Models
  - - meta
    - name: twitter:description
      content: Root any OnePlus phone with bootloader unlock and Magisk installation guide.
  - - meta
    - name: keywords
      content: oneplus root guide, oneplus rooting, oneplus bootloader unlock, oneplus magisk guide, oneplus custom recovery, oneplus 12 root, oneplus 11 root, oneplus 10 root, oxygenos root, oneplus msm tool, oneplus nord root
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
      content: OnePlus Root
  - - meta
    - property: article:tag
      content: OxygenOS
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

# Complete OnePlus Rooting Guide

**Root any OnePlus device** - OnePlus 12, 11, 10, Nord series with simple bootloader unlock and Magisk installation.

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md)** - Universal rooting principles and safety
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - General bootloader concepts
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - TWRP installation guide
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions for common issues

## Why OnePlus Devices Are Ideal for Rooting

**OnePlus Advantages:**
- **Simple bootloader unlock** - No manufacturer approval needed
- **Excellent custom ROM support** - Active development community
- **MSM Download Tool** - Powerful unbrick recovery option
- **Developer-friendly approach** - OnePlus supports customization
- **Fast unlock process** - No waiting periods required

## Critical Warnings

::: danger ⚠️ OnePlus-Specific Considerations
- **Warranty void** - Unlocking bootloader voids OnePlus warranty
- **Complete data erasure** - All personal data will be wiped during unlock
- **OTA updates may fail** - Custom modifications can break official updates
- **ColorOS migration** - Newer models may use ColorOS instead of OxygenOS
:::

## Supported Devices

**All OnePlus devices with unlockable bootloaders:**

### Flagship Series
- **OnePlus 13** - Latest flagship with advanced features
- **OnePlus 12** - Snapdragon 8 Gen 3
- **OnePlus 11** - Snapdragon 8 Gen 2 
- **OnePlus 10 Pro** - Previous generation flagship
- **OnePlus 9/9 Pro** - Hasselblad camera collaboration
- **OnePlus 8/8 Pro/8T** - 5G capable devices
- **OnePlus 7/7 Pro/7T/7T Pro** - Popular modding devices

### Nord Series
- **OnePlus Nord 3** - Mid-range with flagship features
- **OnePlus Nord 2T** - Balanced performance and price
- **OnePlus Nord CE series** - Budget-friendly options
- **OnePlus Nord N series** - Entry-level devices

### Legacy Devices
- **OnePlus 6/6T** - Classic OnePlus design
- **OnePlus 5/5T** - Excellent custom ROM support
- **Older models** - Most OnePlus devices support unlocking

## Prerequisites & Setup

### Required Tools
1. **[Platform Tools](https://developer.android.com/studio/releases/platform-tools)** - ADB/Fastboot
2. **[OnePlus USB Drivers](https://onepluscom-aefd.kxcdn.com/support/softwareupgrade/OnePlus_USB_Drivers_setup.exe)** - Windows drivers
3. **[Magisk APK](https://github.com/topjohnwu/Magisk/releases)** - Latest release
4. **Stock firmware** - [OnePlus Support](https://www.oneplus.com/support/software-upgrade) or firmware sites
5. **MSM Download Tool** - Emergency recovery (device-specific)

### Device Preparation
1. **Enable Developer Options** - Settings → About Phone → Tap Build Number 7 times
2. **Configure Developer Settings:**
   - Enable **USB Debugging**
   - Enable **OEM Unlocking**
3. **Backup all data** - Photos, contacts, apps, settings
4. **Charge to 50%+** - Ensure sufficient battery

### Connection Verification
```bash
# Test ADB connection
adb devices

# Should show your device with "device" status
# If "unauthorized", accept USB debugging prompt on phone
```

## Bootloader Unlocking

OnePlus devices have one of the simplest bootloader unlock processes in the Android ecosystem.

### Enter Fastboot Mode
```bash
# Method 1: ADB command
adb reboot bootloader

# Method 2: Hardware keys
# Power off device → Hold Volume Up + Volume Down + Power
```

### Verify Connection
```bash
fastboot devices
# Should show your device listed
```

### Unlock Bootloader
```bash
fastboot oem unlock
```

**Device Response:**
- Warning screen will appear about unlocking
- Use Volume keys to navigate to "UNLOCK THE BOOTLOADER"
- Press Power button to confirm
- Device will erase all data and reboot

### Alternative Command (Newer Devices)
Some newer OnePlus devices may require:
```bash
fastboot flashing unlock
```

### Complete Setup
After automatic factory reset:
1. Complete initial device setup
2. Re-enable Developer Options (Build Number × 7)
3. Re-enable USB Debugging

## Root Installation Methods

### Method A: Boot Image Patching (Recommended)

#### Step 1: Extract Boot Image
1. **Download OxygenOS firmware** for your exact device model
2. **Extract firmware files** using payload_dumper or similar tools
3. **Locate boot.img** or payload.bin containing boot partition
4. **Extract boot.img** if using payload.bin

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

### Method B: Custom Recovery Installation

#### Step 1: Install Custom Recovery
OnePlus devices have excellent custom recovery support.

1. **Download recovery image:**
   - **TWRP:** Most popular, extensive device support
   - **OrangeFox:** Modern UI with advanced features
   - **SKYHAWK:** Fast and lightweight option

2. **Flash recovery:**
   ```bash
   fastboot flash recovery recovery.img
   ```

3. **Boot to recovery:**
   ```bash
   fastboot reboot recovery
   # Or: Volume Down + Power, then select Recovery
   ```

#### Step 2: Install Magisk via Recovery
1. **Transfer Magisk ZIP** to device storage
2. **In recovery interface:**
   - **TWRP:** Install → Select Magisk ZIP → Swipe to confirm
   - **OrangeFox:** Files → Select Magisk ZIP → Install
## OnePlus-Specific Troubleshooting

### Common OnePlus Issues

#### MSM Download Tool Recovery
OnePlus devices include powerful recovery options:

**When to Use MSM Tool:**
- Device won't boot (hard brick)
- Bootloop after rooting attempt
- Recovery partition corruption
- Fastboot mode not accessible

**MSM Tool Process:**
1. **Download MSM tool** for your exact model
2. **Boot to EDL mode** - Volume Up + Volume Down + Power
3. **Run MSM tool** with device connected
4. **Wait for completion** - Tool will restore stock firmware

#### OTA Update Conflicts
After rooting, handle updates carefully:

**Before Taking OTA:**
```bash
# Remove Magisk temporarily
# Use Magisk → Uninstall → Restore Images

# Or flash stock boot image
fastboot flash boot stock_boot.img
```

**After OTA Completion:**
- Re-patch new boot image with Magisk
- Flash patched boot via fastboot

#### ColorOS vs OxygenOS
Newer OnePlus devices may ship with ColorOS:
- **Different root methods** may be required
- **Check device software** in Settings → About Phone
- **Use ColorOS-specific guides** if applicable

### Performance Optimization

#### Recommended Root Modules
**Essential Magisk Modules for OnePlus:**
- **Zygisk LSPosed** - Xposed framework compatibility
- **Universal SafetyNet Fix** - Pass banking app checks
- **OnePlus Optimizations** - Device-specific improvements
- **Thermal Throttling Control** - Performance management

#### Custom Kernel Benefits
OnePlus devices benefit greatly from custom kernels:
- **Improved battery life** - Better power management
- **Enhanced performance** - CPU/GPU overclocking
- **Additional features** - Sound enhancement, color calibration
- **Thermal improvements** - Better heat dissipation

## Alternative Root Methods

### Method C: Direct Boot Partition Access

For advanced users with specific firmware versions:

1. **Extract boot partition directly:**
   ```bash
   # Using dd command (requires root access)
   adb shell su -c "dd if=/dev/block/bootdevice/by-name/boot of=/sdcard/boot.img"
   ```

2. **Patch and flash** using standard method above

### Method D: TWRP Installation First

Some users prefer installing recovery before rooting:

1. **Flash TWRP recovery**
2. **Boot to TWRP**
3. **Install Magisk ZIP** directly
4. **Benefit:** Easy module management and backups

## Success Verification

### Root Access Confirmation
1. **Open Magisk app** - Should show "Installed" status
2. **Test root command:**
   ```bash
   adb shell su -c "id"
   # Should return: uid=0(root) gid=0(root)
   ```
3. **Install root checker app** from Play Store
4. **Verify SafetyNet** - Banking apps should work with proper modules

### Post-Root Setup
**Essential Configuration:**
- **Enable Zygisk** in Magisk settings for module compatibility
- **Configure DenyList** to hide root from banking apps
- **Install LSPosed** for Xposed module support
- **Set up Titanium Backup** for comprehensive app backups

## Staying Updated

### OTA Handling Strategy
**Recommended Approach:**
1. **Wait for community testing** before taking updates
2. **Use Magisk uninstall** before major OTA updates
3. **Re-root after OTA** using same method
4. **Consider custom ROMs** for faster Android updates

### Community Resources
- **[OnePlus XDA](https://xdaforums.com/c/oneplus.11993/)** - Development community
- **[OnePlus Community](https://forums.oneplus.com/)** - Official support
- **[r/OnePlus](https://reddit.com/r/oneplus)** - User discussions
- **[OnePlus Telegram Groups](https://t.me/OnePlusUpdates)** - Update notifications

---

::: tip 💡 OnePlus Root Success Tips
**Best Practices:**
- OnePlus devices are very forgiving for beginners
- MSM tool provides excellent brick recovery
- Custom ROM scene is very active
- Community support is exceptional
- OTA updates can usually be handled smoothly
:::

**Need more help?** Visit our **[FAQ section](../faqs.md)** or check the **[main rooting guide](./index.md)** for additional troubleshooting and advanced techniques.
