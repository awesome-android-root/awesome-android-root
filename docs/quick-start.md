---
layout: doc
title: Quick Start Guide for Android Rooting
description: "Essential checklist for new users: unlock bootloader → install recovery → root → hide root → backup. Step-by-step rooting process for beginners."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/quick-start
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Android Rooting Quick Start Guide 2025 - Complete Checklist
  - - meta
    - property: og:description
      content: Essential 5-step rooting checklist for beginners. Unlock bootloader → recovery → root → hide root → backup. Safe rooting process with expert guidance.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/quick-start
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Android Rooting Quick Start Guide 2025
  - - meta
    - name: twitter:description
      content: Complete beginner checklist for safe Android rooting. 5 essential steps with expert guidance and safety tips.
  - - meta
    - name: keywords
      content: android rooting checklist, beginner root guide, unlock bootloader, custom recovery, magisk installation, root safety, android root tutorial 2025, rooting steps, android customization guide
---

# Quick Start Guide for Android Rooting

**Complete checklist for new users** - Follow these 5 essential steps to safely root your Android device and unlock its full potential.

::: tip 🚨 New to Android Rooting?
**Start here for a safe rooting experience.** This guide provides the exact steps used by thousands of successful users. Each step includes safety checks and troubleshooting tips.
:::

## 📋 Essential Rooting Checklist

### Step 1: Unlock Bootloader 🔓

**Purpose:** Enable custom firmware installation on your device

::: warning ⚠️ Important Safety Notes
- **Backup everything** before starting (photos, apps, data)
- **Check warranty implications** - unlocking voids most warranties
- **Verify device compatibility** - some carriers/regions block unlocking
- **Charge device to 80%+** to prevent power issues during process
:::

**Action Items:**
- [ ] **Enable Developer Options** - Go to Settings → About Phone → Tap "Build Number" 7 times
- [ ] **Enable USB Debugging** - Settings → Developer Options → USB Debugging
- [ ] **Enable OEM Unlocking** - Settings → Developer Options → OEM Unlocking
- [ ] **Install ADB/Fastboot Tools** on your computer
- [ ] **Download device-specific unlock tools** (if required)
- [ ] **Follow device-specific unlock instructions**

**Device-Specific Guides:**
- [Google Pixel](./android-root-guides/how-to-root-pixel-phone.md#unlock-bootloader)
- [Samsung Galaxy](./android-root-guides/how-to-root-samsung-phone.md#unlock-bootloader) 
- [Xiaomi/MIUI](./android-root-guides/how-to-root-xiaomi-phone.md#unlock-bootloader)
- [OnePlus](./android-root-guides/how-to-root-oneplus-phone.md#unlock-bootloader)
- [Motorola](./android-root-guides/how-to-root-motorola-phone.md#unlock-bootloader)
- [Nothing Phone](./android-root-guides/how-to-root-nothing-phone.md#unlock-bootloader)

**Verification:**
```bash
fastboot flashing get_unlock_ability
# Should return 1 if unlockable
```

---

### Step 2: Install Custom Recovery 🛠️

**Purpose:** Gateway for installing custom modifications and root access

::: tip 💡 Recovery Options
**TWRP** (most popular) or **OrangeFox** (modern alternative) - both work excellently for rooting
:::

**Action Items:**
- [ ] **Download correct recovery image** for your exact device model
- [ ] **Verify device is in fastboot mode** - `fastboot devices` should show your device
- [ ] **Flash recovery** - `fastboot flash recovery recovery.img`
- [ ] **Boot into recovery** - Volume Up + Power (varies by device)
- [ ] **Test recovery functionality** - verify touch, navigation works

**Critical Safety Check:**
- [ ] **Ensure you can boot normally** after installing recovery
- [ ] **Verify you can access recovery mode** when needed

**Resources:**
- [📖 Complete Recovery Installation Guide](./android-root-guides/how-to-install-custom-recovery.md)
- [🔧 TWRP Official Downloads](https://twrp.me/Devices/)
- [🦊 OrangeFox Recovery Downloads](https://orangefox.download/)

---

### Step 3: Choose and Install Root Method ⚡

**Purpose:** Gain administrative access to your Android system

::: warning 🎯 Root Method Comparison
| Method | Best For | Difficulty | Hide Root? |
|--------|----------|------------|------------|
| **Magisk** | Most users | Medium | ✅ Yes |
| **KernelSU** | Advanced users | Hard | ✅ Yes |
| **APatch** | Alternative | Medium | ✅ Yes |
:::

#### Option A: Magisk (Recommended for most users)

**Action Items:**
- [ ] **Download latest Magisk APK** from [GitHub releases](https://github.com/topjohnwu/Magisk/releases)
- [ ] **Extract boot.img** from your device firmware
- [ ] **Patch boot.img** using Magisk app
- [ ] **Flash patched boot** via fastboot or recovery
- [ ] **Install Magisk app** and verify root

**Resources:**
- [📖 Complete Magisk Installation Guide](./android-root-guides/magisk-guide.md)

#### Option B: KernelSU (For advanced users)

**Action Items:**
- [ ] **Check kernel compatibility** - KernelSU requires specific kernel support
- [ ] **Flash KernelSU-compatible kernel** (if needed)
- [ ] **Install KernelSU manager app**
- [ ] **Verify root access**

**Resources:**
- [📖 KernelSU Installation Guide](./android-root-guides/kernelsu-guide.md)

**Root Verification:**
- [ ] **Install Root Checker** app from Play Store
- [ ] **Verify root access** shows "Root Access Granted"
- [ ] **Test with root app** (like AdAway or Titanium Backup)

---

### Step 4: Hide Root from Detection 🛡️

**Purpose:** Maintain access to banking apps, Netflix, and other security-sensitive applications

::: tip 🎯 Why Hide Root?
Many apps use **Play Integrity API** (formerly SafetyNet) to detect modifications and may refuse to work on rooted devices. Hiding root maintains compatibility.
:::

**Action Items for Magisk Users:**
- [ ] **Enable Zygisk** - Magisk → Settings → Enable Zygisk
- [ ] **Configure DenyList** - Magisk → Settings → Configure DenyList
- [ ] **Add sensitive apps** to DenyList (banking, Netflix, Pokemon GO, etc.)
- [ ] **Install Shamiko** module (if needed for advanced hiding)
- [ ] **Test app compatibility** - verify banking apps work

**Action Items for KernelSU Users:**
- [ ] **Install KSU modules** for hiding root
- [ ] **Configure app exclusions**
- [ ] **Test compatibility**

**Apps to Typically Hide From:**
- Banking and financial apps
- Netflix, Disney+, streaming services  
- Pokemon GO, Mobile games
- Work/corporate apps
- Payment apps (PayPal, Cash App)

**Verification:**
- [ ] **Test banking apps** - should open normally
- [ ] **Run Play Integrity Check** apps
- [ ] **Verify streaming apps** work properly

---

### Step 5: Create Complete System Backup 💾

**Purpose:** Full protection against issues and ability to restore if something goes wrong

::: warning 🛡️ Backup is Your Safety Net
**This is critical** - A proper backup lets you recover from any rooting issue. Never skip this step!
:::

**Action Items:**
- [ ] **Create NANDroid backup** in TWRP/OrangeFox recovery
- [ ] **Backup all partitions** - System, Data, Boot, Recovery
- [ ] **Store backups safely** - External storage + cloud backup
- [ ] **Test backup integrity** - verify files aren't corrupted
- [ ] **Document your setup** - ROM version, root method, modules installed

**Recommended Backup Apps:**
- [ ] **[Swift Backup](https://swiftapps.org/)** - Professional app + data backup `Proprietary`
- [ ] **[Titanium Backup](https://play.google.com/store/apps/details?id=com.keramidas.TitaniumBackup)** - Classic root backup solution `Proprietary`
- [ ] **[Migrate](https://play.google.com/store/apps/details?id=balti.migrate)** - Modern backup with cloud support `FOSS`

**What to Backup:**
- [ ] **Complete system backup** (NANDroid)
- [ ] **App data and settings**
- [ ] **Photos, videos, documents**
- [ ] **SMS and call logs**
- [ ] **Custom settings and modifications**

**Backup Storage Strategy:**
- [ ] **Local storage** - Device storage/SD card
- [ ] **Cloud backup** - Google Drive, Dropbox, etc.
- [ ] **Computer backup** - Copy to PC/Mac for extra safety

---

## 🎯 Post-Rooting Essentials

### Install Essential Root Apps

Once rooted, enhance your device with these community-recommended apps:

**🏆 Must-Have Apps:**
- [ ] **[AdAway](https://github.com/AdAway/AdAway)** - System-wide ad blocking `FOSS`
- [ ] **[App Manager](https://github.com/MuntashirAkon/AppManager)** - Advanced app management `FOSS`
- [ ] **[LSPosed](https://github.com/LSPosed/LSPosed)** - Modern Xposed Framework `FOSS` `[M]` `[LSP]`
- [ ] **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Prevent app auto-updates `FOSS` `[M]`

**📱 System Enhancement:**
- [ ] **[Franco Kernel Manager](https://play.google.com/store/apps/details?id=com.franco.kernel)** - Performance tuning `Proprietary`
- [ ] **[Greenify](https://github.com/oasisfeng/greenify)** - Battery optimization `FOSS`
- [ ] **[Island](https://github.com/oasisfeng/island)** - App isolation `FOSS`

> **💡 Want more apps?** Browse our complete collection of [280+ root apps](./android-root-apps/) organized by category.

---

## 🚨 Emergency Recovery Guide

### If Something Goes Wrong

**Device Won't Boot (Bootloop):**
1. **Boot to recovery mode** - Power + Volume Up (varies by device)
2. **Restore NANDroid backup** you created in Step 5
3. **Or flash stock firmware** if backup fails
4. **Contact device-specific community** for help

**Root Access Lost:**
1. **Re-flash Magisk/root** through recovery
2. **Check for module conflicts** - disable recently installed modules
3. **Verify integrity** of root installation

**Banking Apps Stopped Working:**
1. **Update DenyList** in Magisk
2. **Clear app data** for affected apps
3. **Check for app updates** that changed detection
4. **Install additional hiding modules** if needed

---

## 🆘 Getting Help

### Community Resources

**Official Support:**
- [❓ FAQ & Troubleshooting](./faqs.md) - Common questions and solutions
- [💬 Reddit Community](https://reddit.com/r/AwesomeAndroidRoot) - Active community help
- [🐦 Twitter Updates](https://x.com/awsm_and_root) - Latest news and tips

**Device-Specific Help:**
- [📱 XDA Forums](https://forum.xda-developers.com/) - Device-specific communities
- Search "[Your Device] + root" for device-specific Telegram groups
- Check manufacturer-specific forums and Discord servers

**When Asking for Help, Include:**
- **Device model and Android version**
- **Root method used** (Magisk, KernelSU, etc.)
- **Exact error messages** or symptoms
- **Steps you've already tried**
- **Recent changes** to your device

---

## ✅ Success! You're Now Rooted

**Congratulations!** You've successfully rooted your Android device. Here's what you can do next:

### Explore Advanced Features
- **[🎨 Customization Apps](./android-root-apps/#customization)** - Transform your device's appearance
- **[⚡ Performance Optimization](./android-root-apps/#performance-and-gaming)** - Boost speed and battery life
- **[🛡️ Privacy & Security](./android-root-apps/#privacy-and-security)** - Ultimate protection and control
- **[🧹 System Debloating](./guides/android-apps-debloating.md)** - Remove unwanted system apps

### Stay Updated
- **Follow our updates** on [Twitter](https://x.com/awsm_and_root) and [Reddit](https://reddit.com/r/AwesomeAndroidRoot)
- **Star our [GitHub repository](https://github.com/awesome-android-root/awesome-android-root)** for the latest additions
- **Join the community** and help other users with their rooting journey

### Share Your Success
- **Help others** by sharing your experience in our community
- **Contribute** new apps or guides you discover
- **Rate this guide** and provide feedback for improvements

---

**Happy rooting!** 🎉 You now have full control over your Android device. Use it wisely and enjoy the freedom!
