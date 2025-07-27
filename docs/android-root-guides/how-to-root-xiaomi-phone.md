---
layout: doc
title: Complete Xiaomi Rooting Guide
description: "Master guide to root Xiaomi and Redmi devices - MIUI/HyperOS with Mi Unlock Tool and Magisk installation. Navigate complex unlock requirements."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-root-xiaomi-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Xiaomi Rooting Guide - All Models Supported
  - - meta
    - property: og:description
      content: Root any Xiaomi device with our comprehensive guide covering Mi Unlock Tool, bootloader unlock and Magisk installation for MIUI/HyperOS.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/how-to-root-xiaomi-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/xiaomi.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Xiaomi Rooting Guide - All Models
  - - meta
    - name: twitter:description
      content: Root any Xiaomi device with Mi Unlock Tool and Magisk installation guide.
  - - meta
    - name: keywords
      content: xiaomi root guide, xiaomi rooting, miui root, hyperos root, mi unlock tool, xiaomi bootloader unlock, xiaomi magisk, redmi root guide, poco root guide
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
      content: Xiaomi Root
  - - meta
    - property: article:tag
      content: MIUI
  - - meta
    - property: article:tag
      content: HyperOS
  - - meta
    - property: article:tag
      content: Mi Unlock Tool
  - - meta
    - name: robots
      content: index, follow
---

# Complete Xiaomi Rooting Guide

**Root Xiaomi's ecosystem** - Mi, Redmi, POCO devices with MIUI/HyperOS using Mi Unlock Tool and Magisk installation.

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md)** - Universal rooting principles and safety
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - General bootloader concepts
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - TWRP installation guide
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions for common issues

## Xiaomi Rooting Complexity

**Xiaomi Unique Challenges:**
- **Mi Account requirement** - Must wait 168 hours (7 days) after binding
- **Complex unlock process** - Multiple verification steps required
- **Regional restrictions** - Some regions face additional hurdles
- **HyperOS changes** - Newer firmware has different requirements
- **MIUI anti-root measures** - System actively prevents root modifications

## Critical Warnings

::: danger ⚠️ Xiaomi-Specific Risks
- **Mi Account ban risk** - Xiaomi may restrict accounts for unlocking
- **Warranty void** - Bootloader unlock voids manufacturer warranty
- **Mi Pay disabled** - Payment services stop working permanently
- **Device ban** - Some unlocked devices face service restrictions
- **Anti-rollback protection** - Cannot downgrade firmware on some models
:::

## Device Compatibility

### Supported Device Lines

**Mi Series (Flagship):**
- **Mi 14/14 Pro/14 Ultra** - Latest flagships with HyperOS
- **Mi 13/13 Pro/13 Ultra** - MIUI 14 base with good support
- **Mi 12/12 Pro/12 Ultra** - Well-supported with active development
- **Mi 11/11 Pro/11 Ultra** - Excellent custom ROM availability
- **Older Mi devices** - Generally good support

**Redmi Series (Value):**
- **Redmi Note 13/13 Pro/13 Pro+** - Popular mid-range options
- **Redmi 13 5G/13 4G** - Budget-friendly variants
- **Redmi Note 12 series** - Extensive custom ROM support
- **Redmi K70/K60 series** - Performance-focused devices
- **Older Redmi devices** - Strong community support

**POCO Series (Gaming):**
- **POCO X6/X6 Pro** - Gaming-oriented devices
- **POCO F6/F6 Pro** - Flagship killer performance
- **POCO M6/M6 Pro** - Budget gaming phones
- **POCO C series** - Entry-level support varies

### Restricted/Problematic Devices

**Regional Restrictions:**
- **Chinese variants** - May require different procedures
- **Indian market devices** - Additional verification steps
- **European models** - Generally easier to unlock

**Carrier-Specific Issues:**
- **Carrier-locked devices** - May have additional restrictions
- **Enterprise variants** - Corporate devices often locked
- **Educational models** - Special restrictions apply

## Prerequisites & Setup

### Mi Account Preparation
**Critical Requirement:**
1. **Create Mi Account** - Use dedicated email for rooting
2. **Add SIM card** - Must have active SIM during unlock process
3. **Wait 168 hours** - Mandatory 7-day waiting period after account binding
4. **Add phone number** - Verify with SMS code

### Required Tools
1. **[Mi Unlock Tool](https://en.miui.com/unlock/)** - Official Xiaomi bootloader unlock
2. **[ADB & Fastboot](https://developer.android.com/studio/releases/platform-tools)** - Platform tools
3. **[Magisk APK](https://github.com/topjohnwu/Magisk/releases)** - Latest root manager
4. **[MIUI Firmware](https://xiaomifirmwareupdater.com/)** - Stock firmware for your device
5. **[Mi Assistant](https://www.mi.com/global/service/support/download/)** - Device drivers

### Device Preparation
1. **Enable Developer Options:**
   - Settings → About Phone → Tap MIUI Version 7 times
   - Enable **USB Debugging**
   - Enable **OEM Unlocking** (if available)

2. **Bind Mi Account:**
   - Settings → Mi Account → Sign in
   - Settings → Developer options → Mi Unlock Status
   - Bind account and wait 168 hours

3. **Backup everything:**
   - MIUI Backup to Mi Cloud
   - Manual file backup
   - Note IMEI and serial numbers

4. **Charge to 70%+** and ensure stable connection

### Connection Verification
```bash
# Test ADB connection
adb devices

# Boot to fastboot mode
adb reboot bootloader

# Verify fastboot connection
fastboot devices
```

## Bootloader Unlocking Process

Xiaomi's bootloader unlock is the most complex among major manufacturers.

### Step 1: Mi Account Waiting Period
This is **mandatory** and cannot be bypassed:

1. **Bind Mi Account** to device in Developer Options
2. **Wait exactly 168 hours** (7 days) - timer starts from binding
3. **Keep SIM card inserted** during entire waiting period
4. **Don't factory reset** during waiting period

### Step 2: Mi Unlock Tool Setup
1. **Download Mi Unlock Tool** from official Xiaomi website
2. **Install and launch** as Administrator on Windows PC
3. **Sign in** with the same Mi Account used on device
4. **Keep internet connection** active during process

### Step 3: Enter Fastboot Mode
```bash
# Method 1: ADB command
adb reboot bootloader

# Method 2: Hardware keys
# Power off → Hold Volume Down + Power
```

### Step 4: Unlock with Mi Unlock Tool
1. **Connect device** in fastboot mode to PC
2. **Click "Unlock"** in Mi Unlock Tool
3. **System verifies** waiting period completion
4. **Confirm unlock** - device will factory reset
5. **Process completes** - bootloader now unlocked

### Troubleshooting Unlock Issues

**"Device not supported" Error:**
- Ensure exact 168-hour waiting period
- Try different USB cable/port
- Reinstall Mi Unlock Tool

**"Couldn't verify device" Error:**
- Check Mi Account is same on device and PC
- Enable "OEM Unlocking" in Developer Options
- Try different Mi Unlock Tool version

## Root Installation Methods

### Method A: Boot Image Patching (Recommended)

#### Step 1: Extract Boot Image
1. **Download MIUI firmware** for your exact device model
2. **Extract firmware using:**
   - **[Payload Dumper](https://github.com/vm03/payload_dumper)** for Android 10+
   - **[Xiaomi Firmware Extractor](https://github.com/AndroPlus-org/xiaomi_firmware_extractor)** for older devices

3. **Locate boot.img** in extracted files

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
   - Choose boot.img from Downloads
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

Xiaomi devices have excellent custom recovery support.

#### Step 1: Install Custom Recovery
1. **Download recovery image:**
   - **OrangeFox** - Best for Xiaomi devices, MIUI-optimized
   - **TWRP** - Traditional choice with wide support
   - **SKYHAWK** - Lightweight and fast option

2. **Flash recovery:**
   ```bash
   fastboot flash recovery recovery.img
   ```

3. **Boot to recovery:**
   ```bash
   fastboot reboot recovery
   # Or: Volume Up + Power after reboot
   ```

#### Step 2: Install Magisk via Recovery
1. **Download Magisk ZIP** and transfer to device
2. **In recovery interface:**
   - **OrangeFox:** Files → Install → Select Magisk ZIP
   - **TWRP:** Install → Select Magisk ZIP → Swipe to confirm
3. **Reboot system**

**Current Bootloader Restrictions (2025):**
- **HyperOS devices** (released 2024+) have **strict unlock restrictions**
- **Community level verification** required for many devices
## Xiaomi-Specific Optimizations

### MIUI/HyperOS Bloatware Removal
One of the main benefits of rooting Xiaomi devices:

**Safe to Remove Apps:**
- **Mi Browser** - Use preferred browser
- **Mi Video/Music** - Replace with alternatives
- **Game Turbo** - If not gaming
- **Mi Mover** - One-time use app
- **Xiaomi services** - Many are redundant

**Essential Root Apps for Xiaomi:**
- **MIUI Hidden Settings** - Access hidden MIUI features
- **MIUI Pro** - Enhanced MIUI customization
- **Debloater** - Safe bloatware removal
- **NotificationX** - Fix MIUI notification issues

### Performance Tuning

#### Kernel Optimization
Xiaomi devices benefit greatly from custom kernels:

**Popular Kernels:**
- **Penguin Kernel** - Balanced performance and battery
- **Stormbreaker** - Gaming-focused optimization
- **Optimus Drunk** - Battery life oriented
- **AOSP Extended** - Pure Android experience

#### MIUI-Specific Tweaks
```bash
# Enable true full-screen gestures
setprop persist.sys.background_blur_supported true

# Reduce MIUI animations
setprop persist.sys.ui.hw true

# Optimize memory management
setprop ro.config.fha_enable true
```

## Troubleshooting Guide

### Mi Unlock Tool Issues

#### Common Error Messages
**"Device is locked" - but you're sure it should be unlocked:**
- **Solution:** Check Mi Account binding in Developer Options
- **Alternative:** Use fastboot command to verify: `fastboot oem device-info`

**"Couldn't verify device" repeatedly:**
- **Cause:** Network connectivity or server issues
- **Solution:** 
  - Use mobile data instead of Wi-Fi
  - Try different time of day (avoid peak hours)
  - VPN to different region may help

**"Current account is not bound to this device":**
- **Solution:** Re-bind account in Developer Options → Mi Unlock Status
- **Ensure:** Same Mi Account on both device and Mi Unlock Tool

#### Bypass Method Troubleshooting
**PHP Extension Errors:**
```bash
# Check PHP extensions
php -m | grep -E "openssl|curl"

# Enable extensions in php.ini
extension=openssl
extension=curl
```

**ADB Connection Issues:**
```bash
# Kill and restart ADB server
adb kill-server
adb start-server

# Check device connection
adb devices
```

### MIUI/HyperOS Specific Issues

#### System App Restoration
If you accidentally remove essential system apps:

**Emergency Recovery:**
1. **Boot to custom recovery**
2. **Flash stock MIUI ROM** (dirty flash)
3. **Or restore from backup** if available

**System App List** (never remove):
- `com.android.systemui`
- `com.miui.home`
- `com.miui.system`
- `com.miui.securitycenter`

#### Battery Optimization Issues
MIUI's aggressive battery optimization can interfere with root apps:

**Solutions:**
1. **Disable battery optimization** for root apps
2. **Add apps to autostart** in Security app
3. **Use "No limits" background activity**
4. **Install Battery Guru module** for better management

### Network and Regional Issues

#### VPN for Unlock Process
Some users report success using VPN:

**Recommended Locations:**
- **Singapore** - Often works well
- **Hong Kong** - Good for Asian users
- **Germany** - European alternative

**VPN Setup:**
1. **Connect VPN** before opening Mi Unlock Tool
2. **Clear Mi Unlock Tool data** 
3. **Login again** with VPN active
4. **Attempt unlock** with stable VPN connection

## Success Verification

### Root Access Confirmation
1. **Open Magisk app** - Should show "Installed" 
2. **Check Magisk modules** - Should be accessible
3. **Test root command:**
   ```bash
   adb shell su -c "id"
   # Should return: uid=0(root) gid=0(root)
   ```
4. **Install root checker** from Play Store

### Xiaomi Features Testing
**Verify these still work after rooting:**
- **Mi Pay** (may not work due to security)
- **Camera quality** - Should be unchanged
- **Face unlock** - Should continue working
- **Fingerprint scanner** - Should remain functional
- **MIUI themes** - Should still apply

## Staying Updated

### OTA Update Management
MIUI/HyperOS OTA updates can break root:

**Before Taking OTA:**
```bash
# Uninstall Magisk modules
# Use Magisk → Uninstall → Restore Images

# Or flash stock boot image
fastboot flash boot stock_boot.img
```

**After OTA Update:**
1. **Re-unlock bootloader** (if locked by update)
2. **Re-flash custom recovery**
3. **Install Magisk** again
4. **Restore modules** and configurations

### Custom ROM Alternatives
Many users eventually move to custom ROMs:

**Popular Choices for Xiaomi:**
- **LineageOS** - Pure Android experience
- **ArrowOS** - Feature-rich alternative
- **EvolutionX** - Gaming-optimized
- **Pixel Experience** - Google Pixel experience
- **AOSP Extended** - Extended AOSP features

### Community Resources

#### Development Communities
- **[Xiaomi XDA Forums](https://forum.xda-developers.com/c/xiaomi.12004/)** - Device development
- **[MIUI EU Community](https://xiaomi.eu/)** - European MIUI optimization
- **[r/Xiaomi](https://reddit.com/r/Xiaomi)** - General discussions
- **[MIUI Telegram Groups](https://t.me/MIUIUpdatesTracker)** - Update tracking

#### Official Resources
- **[Mi Unlock Tool](https://en.miui.com/unlock/)** - Official unlock tool
- **[MIUI Downloads](https://c.mi.com/miuidownload/index)** - Stock firmware
- **[Xiaomi Firmware Updater](https://xiaomifirmwareupdater.com/)** - Community firmware
- **[Mi Support](https://www.mi.com/global/support/)** - Official support

---

::: tip 💡 Xiaomi Root Success Tips
**Best Practices:**
- Xiaomi devices require patience due to complex unlock process
- Always use mobile data during unlock attempts, not Wi-Fi
- Keep Mi Account active and don't change passwords during process
- Custom recovery is almost essential for Xiaomi devices
- Community support is excellent for troubleshooting
:::

**Need more help?** Visit our **[FAQ section](../faqs.md)** or check the **[main rooting guide](./index.md)** for additional troubleshooting and advanced techniques.

**Q: Will unlocking bootloader affect OTA updates?**
**A:** Yes, most OTA updates will fail with unlocked bootloader. You'll need to manually update firmware or use custom ROMs.

**Q: Can Xiaomi ban my device or account for unlocking?**
**A:** Yes, this is possible but uncommon. Xiaomi has the technical capability to ban devices or accounts that violate their policies.

### Technical Questions

**Q: Why do I need PHP for bypass methods?**
**A:** The bypass tools are written in PHP to modify the unlock requests before sending them to Xiaomi's servers. Other programming languages could work but PHP tools are most developed.

**Q: Are these bypass methods safe?**
**A:** While the community has used them successfully, they involve modifying official unlock requests. Use at your own risk and ensure you understand the potential consequences.

**Q: My antivirus flags the bypass tools as malware - is this safe?**
**A:** False positives are common with these tools due to their nature. Download only from official sources like GitHub and verify checksums when possible.

---

## Advanced Tips & Methods

### Alternative Bypass Methods (Community)

#### Method 1: HyperOS-BootLoader-Bypass-V2

This method has been particularly successful for Redmi Note 13 series and similar devices.

**Requirements:**
- [HyperOS-BootLoader-Bypass-V2](https://github.com/mrzzoxo/HyperOS-BootLoader-Bypass/releases/tag/V2)
- [Modified Settings APK](https://t.me/RedmiNote134G/72) (from Telegram)
- Mi Unlock Tool

**Steps:**
1. **Login to Mi Account** on your device
2. **Uninstall Mi Community app** (won't be needed)
3. **Install the modified Settings.apk** (enables MIUI 14-style interface)
4. **Toggle USB Debugging** (off then on) in Developer Options
5. **Enable OEM Unlock**
6. **Connect device to PC**
7. **Run bypass.cmd script** from the tool
8. **Wait for green "SUCCESS" message**
9. **Disable Wi-Fi, enable mobile data only**
10. **Open "Mi Unlock Status" and bind account**
11. **Use Mi Unlock Tool normally**

**Important Notes:**
- Don't logout from Mi Account during process
- Don't reset settings or update firmware until complete
- Don't reinstall original Settings app
- Success rate varies by device model

#### Method 2: AQLR Bypass (XDA Community)

**Best for:** Users familiar with command-line tools
**Source:** [XDA Forums thread](https://xdaforums.com/t/how-to-unlock-bootloader-on-xiaomi-hyperos-all-devices-except-cn.4654009/)

**Setup:**
1. Download Python 3.8+ and AQLR tool
2. Extract to C:\ root directory
3. Install modified Settings APK for your Android version
4. Enable USB debugging and security settings

**Usage:**
1. Run bypass script with Python
2. Follow command-line prompts
3. Script automatically handles account binding bypass
4. Use Mi Unlock Tool after success

### Troubleshooting Specific Devices

#### For Devices with "Unsupported" Status

Some devices marked as "Unsupported" in official databases may still be unlockable:

**Alternative Approach:**
1. Try downgrading to earlier MIUI version (if possible)
2. Use older Mi Unlock Tool versions (7.6.727.43)
3. Attempt bypass methods before official methods
4. Check device-specific XDA forums for community solutions

#### For Chinese ROM Devices (CN Models)

> **⚠️ Note:** Chinese ROM devices have the strictest restrictions

**Limited Options:**
1. **Flash Global ROM first** (if possible, high risk)
2. **Use paid services** (not recommended, risky)
3. **Hardware modification** (extremely advanced, warranty void)

Most community bypass methods do NOT work on Chinese ROM devices due to government restrictions implemented in 2022.

---

## Device-Specific Features
> Unlocking the Bootloader on Redmi Note 13 4G NFC and Xiaomi 11 Lite 5G NE (HyperOS)

After struggling with delays and account errors on the MI Community app, I found an effective method online to unlock the bootloader on HyperOS devices.

Steps to Bypass MI Community Account Error and Unlock the Bootloader on HyperOS:

#### Requirements:
- **HyperOS-BootLoader-Bypass-V2**: 
  - [Download here](https://github.com/mrzzoxo/HyperOS-BootLoader-Bypass/releases/tag/V2)
- Download the **Settings.apk file**:
  - [Download here](https://t.me/RedmiNote134G/72) - Telegram Link
- **Download and install the MI Unlock Tool**:  
  - [Download here](https://en.miui.com/unlock/download_en.html)

#### Instructions:
1. **Log in to your MI account.**
2. Uninstall the MI Community app—you won't need it anymore.
3. **Install the Settings.apk** from this message. Your device settings will now be in English, resembling MIUI 14.
4. **Go to Developer Settings and toggle USB Debugging (turn it off, then on again).**
5. **Enable OEM Unlock.**
6. **Connect your phone** to your computer.
7. **Open the HyperOS-BootLoader-Bypass-V2** folder and **run the bypass.cmd script.**
(If everything is successful, you'll see a green "SUCCESS" message and a prompt to link your phone to your MI account in the phone settings.)
8. **In Developer Settings, disable Wi-Fi and ensure Mobile Internet is enabled.**
9. **Open "MI Unlock Status" and link your account to your phone.**
(Make sure mobile data is on, and Wi-Fi is off. You’ll receive a notification confirming that your account is linked.)
10.  **Open MI Unlock and log in to your account.**
11.  Enter **FASTBOOT mode** on your phone by holding down the volume down and power buttons until FASTBOOT appears on the display.
12.  Connect your phone to your computer.
13.  In MI Unlock, **click UNLOCK and accept all the prompts.**
14.  You should now see a **timer.** In my case, it was 72 hours, but it may vary depending on your situation.
15.  Reboot your phone by long-pressing the power button and use it normally. After the timer expires, repeat steps 11 to 13 to complete the process.
16.  Congratulations! Your bootloader is now unlocked.

#### IMPORTANT NOTES:
- Do not log out of your MI account on your phone.
- Do not reset the settings.
- Do not reinstall the Settings application (even though the language might be inconvenient for now).
- Do not update your firmware until the process is fully complete.

Thanks to @Kaktusbv for sharing this method.
> Source : [Telegram](https://t.me/RedmiNote134GCommunity/105105)

---
### Hyper OS Feature Unlocker (Redmi Note 13 Series)

> **📱 Compatible with:** Redmi Note 13 4G (Sapphire) & Redmi Note 13 4G NFC (Sapphiren)

**Unlockable Features:**
- Hyper Blur effects
- New Hyper Boot Animation
- Dynamic Refresh Rate
- 90FPS Refresh Rate
- Additional performance optimizations

**Requirements:**
- **Rooted device** with Magisk installed
- **Device-specific module:**
  - **Sapphire**: [Hyper OS Sapphire Unlocker](https://archive.org/download/hyper-os-sapphire-unlocker/Hyper%20OS%20Sapphire%20Unlocker.zip)
  - **Sapphiren**: [Hyper OS Sapphiren Unlocker](https://archive.org/download/hyper-os-sapphire-unlocker/Hyper%20OS%20Sapphiren%20Unlocker.zip)

**Installation:**
1. **Root your device** using this guide
2. **Download appropriate module** for your device variant
3. **Open Magisk app**
4. **Go to Modules tab** → **Install from storage**
5. **Select downloaded module** and install
6. **Reboot device**
7. **Features will be automatically enabled**

---

## 🔗 Additional Resources

### Official Links
- **[Mi Unlock Tool](https://en.miui.com/unlock/download_en.html)** - Official bootloader unlock
- **[Xiaomi Community](https://new.c.mi.com/global/)** - Official community platform
- **[MIUI Downloads](https://www.miui.com/download.html)** - Official firmware
- **[Xiaomi Global Support](https://www.mi.com/global/support/)** - Official help center

### Community Resources
- **[XDA Xiaomi Forums](https://xdaforums.com/c/xiaomi.12005/)** - Device-specific communities
- **[Xiaomi.eu](https://xiaomi.eu/)** - European MIUI builds
- **[Xiaomi Firmware Updater](https://xiaomifirmwareupdater.com/)** - Firmware archive
- **[MIUI Feature Tracker](https://www.notebookcheck.net/MIUI-news.13903.0.html)** - Latest updates

---

## ⚠️ Final Disclaimer

**By following this guide, you acknowledge:**

- **Warranty Void:** Unlocking bootloader permanently voids your device warranty
- **Banking Apps:** Many financial apps may stop working on rooted devices
- **Security Risk:** Root access can potentially expose your device to security threats
- **Xiaomi Policies:** You may violate Xiaomi's terms of service
- **Device Ban:** Xiaomi may restrict services for modified devices
- **Brick Risk:** Improper procedures can permanently damage your device
---
**This guide is for educational purposes. The authors are not responsible for any damage, data loss, or issues arising from following these instructions. Proceed entirely at your own risk.**
