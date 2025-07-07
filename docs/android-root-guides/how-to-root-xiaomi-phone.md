---
layout: doc
title: Xiaomi Rooting Guide
description: "Best complete step-by-step complete guide to root Xiaomi and redmi devices running MIUI/HyperOS in 2025."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-root-xiaomi-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Xiaomi Rooting Guide - MIUI & HyperOS 2025
  - - meta
    - property: og:description
      content: Root your Xiaomi device with this comprehensive guide covering bootloader unlock, TWRP/OrangeFox recovery, and Magisk installation for MIUI and HyperOS.
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
      content: Xiaomi Rooting Guide - MIUI & HyperOS 2025
  - - meta
    - name: twitter:description
      content: Complete step-by-step guide to root Xiaomi devices. Covers bootloader unlock, custom recovery, and Magisk installation.
  - - meta
    - name: keywords
      content: xiaomi root guide, miui root, hyperos root, xiaomi bootloader unlock, xiaomi magisk, twrp xiaomi, orangefox xiaomi, redmi root guide, mi unlock tool, xiaomi rooting 2025
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
      content: Xiaomi
  - - meta
    - property: article:tag
      content: MIUI
  - - meta
    - property: article:tag
      content: HyperOS
  - - meta
    - property: article:tag
      content: Magisk
  - - meta
    - property: article:tag
      content: Bootloader Unlock
---
# Xiaomi & Redmi Root Guide 2025

**🚀 Complete guide to root Xiaomi, Redmi & POCO devices running MIUI/HyperOS**

This comprehensive guide covers rooting Xiaomi devices using multiple methods including official unlocking, bypass tools, and Magisk installation. Suitable for both beginners and advanced users.

> **⚠️ Important**: Xiaomi has significantly restricted bootloader unlocking. Some methods may bypass these restrictions but proceed with caution.

## Table of Contents

- [Before You Start](#before-you-start)
- [What You'll Need](#what-youll-need)  
- [Required Tools](#required-tools)
- [Bootloader Unlocking Methods](#bootloader-unlocking-methods)
- [Step-by-Step Guide](#step-by-step-guide)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [Additional Resources](#additional-resources)

---

## Before You Start

### What is Rooting?
Rooting gives you administrator access to your Android device, allowing deep customization and system-level modifications.

**Benefits:**
- ✅ Remove MIUI/HyperOS bloatware completely
- ✅ Install custom ROMs and modifications
- ✅ Advanced privacy controls and customization
- ✅ Full device backups and system tweaks

**Risks:**
- ❌ **Voids warranty permanently**
- ❌ **Mi Pay and banking apps may stop working**
- ❌ **May trigger Xiaomi account/device bans**
- ❌ Device can be bricked if done incorrectly

### Xiaomi-Specific Warnings

**Current Bootloader Restrictions (2025):**
- **HyperOS devices** (released 2024+) have **strict unlock restrictions**
- **Community level verification** required for many devices
- **72-hour wait time minimum** (reduced from 168 hours)
- **Account limits**: 1 device per month, 3 devices per year
- **SIM card restrictions**: Some regions blocked

### Device Compatibility & Current Status (2025)

**📍 Check Your Device Status:**
Before proceeding, verify your device compatibility at:
- **[Xiaomi Device Authentication](https://www.mi.com/global/verify/#/en/tab/imei)**

**Status Categories:**
- **✅ Opening:** Unlock available, restrictions can be bypassed
- **❌ Blocked:** Xiaomi enforced verification, authorized account required only
- **⚠️ Unsupported:** Unlocking prohibited regardless of permissions  
- **❓ Unknown:** Policy unclear, check actual device behavior

**Recent Examples (2024-2025):**

**✅ Generally Unlockable:**
- Most MIUI devices pre-2024
- ost devices shipped with MIUI

**❌ Heavily Restricted/Blocked:**
- Most devices shipped with HyperOS initially

---

## What You'll Need

### Account Requirements
- **Xiaomi Account:**
  - Must be **30+ days old** and actively used
  - **Not registered in China** (for bypass methods)
  - Valid phone number attached
  - **Account limits:** 1 device/month, 3 devices/year
  
### Hardware Requirements  
- **Compatible Device:**
  - Xiaomi/Redmi/POCO device with unlockable bootloader
  - Check [device status database](https://github.com/MlgmXyysd/Xiaomi-HyperOS-BootLoader-Bypass/blob/main/status.md)
  - Not banned or blacklisted by Xiaomi

- **SIM Card (Important):**
  - Active SIM card with data/SMS service
  - International SMS capability enabled
  - Mobile data must work (bypass methods require this)
  - **Limit:** 2 devices per SIM card within 3 months

### Computer Requirements
- **PC/Mac/Linux** with ADB drivers
- **USB cable** (preferably original)
- **Stable internet connection**

---

## Required Tools

### For All Methods
- **[Mi Unlock Tool](https://en.miui.com/unlock/download_en.html)** - Official unlocking tool
- **[ADB & Fastboot](https://developer.android.com/studio/releases/platform-tools)** - Android platform tools
- **[Universal ADB Drivers](https://adb.clockworkmod.com/)** - For device recognition

### For Bypass Methods (Advanced)
- **[PHP 8.0+](https://www.php.net/downloads)** - Required for bypass scripts
- **[HyperOS Bypass Tool](https://github.com/MlgmXyysd/Xiaomi-HyperOS-BootLoader-Bypass)** - Main bypass method
- **[Alternative Bypass Tools](https://xdaforums.com/t/how-to-unlock-bootloader-on-xiaomi-hyperos-all-devices-except-cn.4654009/)**

### For Rooting
- **[Magisk](https://github.com/topjohnwu/Magisk/releases)** - Latest stable version
- **Custom Recovery:**
  - **[TWRP](https://twrp.me/Devices/)** - Traditional choice
  - **[OrangeFox](https://orangefox.download/device)** - Modern alternative
- **[Xiaomi Firmware Updater](https://xiaomifirmwareupdater.com/)** - For recovery files

---

## Step-by-Step Guide

## Bootloader Unlocking Methods

Xiaomi has different unlocking methods depending on your device and ROM version. **As of 2025, HyperOS devices have significant restrictions.**

### Method 1: Official Mi Unlock Tool (MIUI/Global ROM)

**Best for:** MIUI devices, International/Global ROM devices
**Requirements:** 
- 30+ day old Mi Account (actively used)
- Valid SIM card with international SMS capability
- Device not in Chinese mainland market

**Wait Time:** 72 hours (reduced from 168 hours)
**Limits:** 1 device/month, 3 devices/year per account

### Method 2: Xiaomi Community App (HyperOS Official)

**Best for:** HyperOS devices where traditional unlock works
**Requirements:**
- Xiaomi Community app v5.3.31+
- Account must be active for 30+ days
- Account region set to Global (NOT China)
- SIM card activated on Xiaomi account

**Process:** Apply through app → Wait for approval → Use Mi Unlock Tool
**Server Reset:** Daily at 00:00 GMT+8 (Chinese time)

### Method 3: HyperOS Bypass (Advanced Technical Method)

**Best for:** Experienced users with restricted HyperOS devices
**Requirements:**
- PHP 8.0+ with OpenSSL and Curl extensions
- ADB platform tools
- Device running HyperOS
- Technical troubleshooting skills

**Tools:** 
- [MlgmXyysd's Bypass](https://github.com/MlgmXyysd/Xiaomi-HyperOS-BootLoader-Bypass) (Primary)
- [HyperSploit](https://xdaforums.com/t/hypersploit-bypass-hyperos-bootloader-unlocking-restrictions.4668775/) (Alternative)
- [AQLR Bypass](https://xdaforums.com/t/how-to-unlock-bootloader-on-xiaomi-hyperos-all-devices-except-cn.4654009/) (Community)

---

## Step-by-Step Guide

### Step 1: Enable Developer Options

**Enable Developer Mode:**
1. Go to **Settings** → **About phone** → **MIUI/HyperOS version**
2. Tap **MIUI/HyperOS version** 7 times quickly
3. You'll see "Developer options enabled"
4. Enter your PIN/password if prompted

**Enable Required Options:**
1. Go to **Settings** → **Additional Settings** → **Developer options**
2. Enable **OEM unlocking**
3. Enable **USB debugging**
4. Enable **USB debugging (Security settings)** (if available)

### Step 2: Prepare Mi Account

**Account Requirements:**
- Account must be **30+ days old**
- Account must be **active** (used regularly)
- Account must **not be from China** (for bypass methods)
- Must have **valid SIM card** connected to account

**Bind Account to Device:**
1. Go to **Settings** → **Additional Settings** → **Developer options**
2. Tap **Mi Unlock status**
3. Tap **Add account and device**
4. Ensure mobile data is enabled (not Wi-Fi)
5. You should see "Added successfully"

### Step 3: Choose Your Unlocking Method

#### Option A: Official Method (MIUI Devices)

1. **Download Mi Unlock Tool** from official website
2. **Install and run** as administrator  
3. **Log in** with your Mi Account
4. **Boot device to Fastboot mode**: Power off → Hold Volume Down + Power
5. **Connect device** to PC
6. **Click Unlock** in Mi Unlock Tool
7. **Wait for timer** (72+ hours for first-time users)

#### Option B: HyperOS Bypass Method (Technical Users)

> **⚠️ Advanced Users Only**: This method requires technical knowledge and command-line usage

**Prerequisites:**
- PHP 8.0+ installed with OpenSSL and Curl extensions enabled
- ADB platform tools properly configured
- Device running HyperOS
- Working mobile data connection (Wi-Fi may not work)

**Setup Environment:**
1. **Install PHP 8.0+** from [official website](https://www.php.net/downloads)
2. **Enable extensions** in `php.ini`:
   ```ini
   extension=openssl
   extension=curl
   ```
3. **Download bypass tool** from [GitHub](https://github.com/MlgmXyysd/Xiaomi-HyperOS-BootLoader-Bypass)
4. **Extract and setup** the tool directory

**Execute Bypass:**
1. **Open terminal/command prompt** in tool directory
2. **Run bypass script:**
   ```bash
   php bypass.php
   ```
3. **Follow script prompts** carefully
4. **Connect device** when requested via USB
5. **Enable USB debugging** if prompted
6. **Disable Wi-Fi and enable mobile data**
7. **Script will intercept account binding** and send modified request
8. **Wait for "SUCCESS" message**

**Important Notes:**
- Script blocks the device's binding request and sends a modified one
- You may see "Couldn't verify, wait a minute or two and try again" on device (this is normal)
- Actual binding result is shown by the script, not the device message
- Keep mobile data ON, Wi-Fi OFF during the process

**Common Error Codes:**
- **401**: Account credentials expired → Re-login to Xiaomi account
- **20086**: Device credentials expired → Restart device  
- **30001**: Device blocked by Xiaomi → Cannot be bypassed
- **86015**: Server rejected request → Try again later

#### Option C: Xiaomi Community App Method (HyperOS Official)

**Best for:** HyperOS devices where bypass methods don't work

**Requirements:**
- Xiaomi Community app v5.3.31 or higher
- Mi Account active for 30+ days
- SIM card activated on Xiaomi account
- Account region set to **Global** (not China)

**Steps:**
1. **Download Xiaomi Community App:**
   - [Play Store](https://play.google.com/store/search?q=xiaomi+community+app&c=apps)
   - [Official APK](https://new.c.mi.com/global/post/101245)

2. **Setup Account:**
   - Log in with your Mi Account
   - Change region to **Global** in settings
   - Ensure SIM card is active and connected to account

3. **Apply for Unlock:**
   - Open Community app
   - Navigate to **"Unlock Bootloader"** section
   - Tap **"Apply for unlocking"**
   - Fill in device information
   - Submit application

4. **Wait for Approval:**
   - Check application status regularly
   - Approval time varies (hours to days)
   - You'll receive notification when approved

**Important Notes:**
- Server resets daily quota at **00:00 GMT+8** (Chinese time)
- If you see "Application quota reached", try again after reset time
- Some accounts may be permanently restricted ("risk control")
- Keep mobile data enabled during application process

**Tips for Success:**
- Use device with mobile data (not Wi-Fi) when applying
- Try different device/SIM card if primary account fails
- Some users report success using Samsung/other brand devices for application

### Step 4: Flash Custom Recovery

**After successful bootloader unlock:**

**Using Windows:**
1. Extract platform-tools to a folder
2. Copy `recovery.img` to platform-tools folder
3. Boot device to Fastboot mode
4. Open Command Prompt in platform-tools folder
5. Run:
   ```cmd
   fastboot flash recovery recovery.img
   fastboot reboot recovery
   ```

**Using Linux:**
1. Open terminal in recovery folder
2. Boot device to Fastboot mode
3. Run:
   ```bash
   fastboot devices  # Verify connection
   fastboot flash recovery recovery.img
   fastboot reboot recovery
   ```

### Step 5: Install Magisk

**Boot to Custom Recovery:**
1. **Power off** device completely
2. Hold **Power + Volume Up** until recovery appears
3. Release buttons when you see recovery menu

**Flash Magisk:**
1. In recovery, select **Install** (TWRP) or **Files** (OrangeFox)
2. Navigate to **Magisk ZIP file** (if you have it) OR
3. **Transfer Magisk APK** to device storage
4. In recovery: **Install** → **Install Image** → Select Magisk APK
5. **Swipe to confirm** installation
6. **Reboot system**

### Step 6: Complete Setup

1. **Device will reboot** to system
2. **Open Magisk app** (should be installed)
3. **Grant root permissions** when prompted
4. **Verify root access** with root checker app

---

## Troubleshooting

### Common Issues & Solutions

#### Bootloader Unlock Issues

**"Application quota limit reached" Error:**
- **Cause:** Daily server limit exceeded
- **Solution:** Wait until 00:00 GMT+8 (Chinese time) and try again
- **Alternative:** Use bypass method or different account

**"Couldn't verify account" Error:**
- **Cause:** Account not properly linked to device
- **Solution:** 
  1. Ensure SIM card is active and connected to mobile network
  2. Log out and log back into Mi Account on device
  3. Enable mobile data, disable Wi-Fi during verification
  4. Try account binding again in Developer Options

**"This device is locked" in Mi Unlock Tool:**
- **Cause:** Device not bound to account or waiting period not elapsed
- **Solution:**
  1. Check if device is properly bound in Mi Unlock status
  2. Wait for the full timer period (72+ hours)
  3. Ensure account and device match exactly

**72+ Hour Wait Time Not Decreasing:**
- **Cause:** Timer only decreases when device is properly connected to servers
- **Solution:**
  1. Keep SIM card active in device
  2. Maintain internet connection
  3. Don't log out of Mi Account
  4. Don't factory reset during waiting period

#### Bypass Method Issues

**Script Fails with "Device not found":**
- **Cause:** ADB drivers not properly installed
- **Solution:**
  1. Install Universal ADB drivers
  2. Enable USB debugging
  3. Accept USB debugging prompt on device
  4. Check `adb devices` command shows your device

**Error Code 401 (Account expired):**
- **Cause:** Mi Account credentials expired on device
- **Solution:**
  1. Log out of Mi Account on device
  2. Log back in with fresh credentials
  3. Ensure account is properly synced

**Error Code 30001 (Device blocked):**
- **Cause:** Xiaomi has restricted this specific device
- **Solution:** Unfortunately, this cannot be bypassed with current methods

#### Recovery/Rooting Issues

**Custom Recovery Won't Flash:**
- **Cause:** Bootloader still locked or anti-rollback protection
- **Solution:**
  1. Verify bootloader is actually unlocked (`fastboot oem device-info`)
  2. Use correct recovery image for your exact device model
  3. Check for anti-rollback protection issues

**Magisk Installation Fails:**
- **Cause:** Incompatible version or improper installation
- **Solution:**
  1. Use latest stable Magisk version
  2. Ensure custom recovery is working properly
  3. Try patching boot image method instead

### Account & Device Status Checks

**Check Mi Account Status:**
1. Visit [Mi Account website](https://account.xiaomi.com/)
2. Verify account age and activity
3. Check for any restrictions or warnings

**Check Device Unlock Status:**
1. Settings → Additional Settings → Developer Options
2. Tap "Mi Unlock Status"
3. Should show "Added" or binding status

**Check Device Compatibility:**
1. Visit [device status database](https://github.com/MlgmXyysd/Xiaomi-HyperOS-BootLoader-Bypass/blob/main/status.md)
2. Find your device model and codename
3. Check current unlock status

---

## FAQ

### General Questions

**Q: Why does Mi Unlock Tool still show 168+ hours wait time after using bypass?**
**A:** The bypass only removes HyperOS community restrictions. MIUI timing restrictions still apply. You must wait the full timer period.

**Q: Can I use Wi-Fi instead of mobile data?**
**A:** No, many bypass methods specifically require mobile data connection. Wi-Fi may cause verification failures.

**Q: My device shows "Couldn't verify, wait a minute" during bypass - is this normal?**
**A:** Yes, this is expected. The bypass script blocks the device's request and sends a modified one. Check the script output for actual results.

**Q: Will this work on Chinese ROM devices?**
**A:** Generally no. These methods are primarily for Global/International ROM devices. Chinese ROM devices have additional restrictions.

### Account & Timing Questions

**Q: How can I check if my account is old enough?**
**A:** Log into [Mi Account website](https://account.xiaomi.com/) and check account creation date. Must be 30+ days old with regular activity.

**Q: Can I speed up the 72-hour wait time?**
**A:** No, this is a server-side restriction that cannot be bypassed. Any claims of "instant unlock" are likely scams.

**Q: I have multiple Xiaomi accounts - can I use different ones?**
**A:** Yes, but each account has the same restrictions (1 device/month, 3 devices/year). Using multiple accounts may trigger additional scrutiny.

### Device Compatibility

**Q: My device isn't in the compatibility list - can I still try?**
**A:** You can try, but newer HyperOS devices are increasingly restricted. Check for device-specific communities for latest information.

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
