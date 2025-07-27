---
layout: doc
title: Complete Android Rooting Guide
description: "Master Android rooting with our comprehensive guide. Compare Magisk, KernelSU & APatch methods with device-specific instructions and safety practices."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Complete Android Rooting Guide - Master Root Access
  - - meta
    - property: og:description
      content: Master Android rooting with our comprehensive guide covering Magisk, KernelSU, APatch, and device-specific instructions for all major brands.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Android Rooting Guide - Master Root Access
  - - meta
    - name: twitter:description
      content: Master Android rooting with comprehensive guides for Magisk, KernelSU, APatch and device-specific instructions.
  - - meta
    - name: keywords
      content: android root guide, magisk guide, kernelsu guide, apatch guide, android rooting tutorial, systemless root, bootloader unlock, custom recovery, twrp guide, xda developers, android root methods, rooting safety, lsposed framework
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Rooting Guides
  - - meta
    - property: article:tag
      content: Android Root
  - - meta
    - property: article:tag
      content: Magisk
  - - meta
    - property: article:tag
      content: KernelSU
  - - meta
    - property: article:tag
      content: APatch
  - - meta
    - property: article:tag
      content: Bootloader Unlock
  - - meta
    - property: article:tag
      content: Custom Recovery
  - - meta
    - property: article:tag
      content: TWRP
  - - meta
    - property: article:tag
      content: LSPosed
  - - meta
    - name: robots
      content: index, follow
---

# Complete Android Rooting Guide

**The definitive guide to Android rooting** - From basic concepts to advanced techniques with safety practices and device-specific instructions.

## Table of Contents
- [Understanding Root Access](#understanding-root-access)
- [Prerequisites & Safety](#prerequisites--safety)
- [Root Method Comparison](#root-method-comparison)
- [Universal Rooting Process](#universal-rooting-process)
- [Device-Specific Guides](#device-specific-guides)
- [Post-Root Setup](#post-root-setup)
- [Troubleshooting](#troubleshooting)

## Understanding Root Access

**Root access** grants you administrative privileges on your Android device - similar to having administrator rights on a computer. This removes manufacturer restrictions and unlocks your device's full potential.

**In simple terms:** Your phone has built-in limitations. Root access removes these barriers, giving you complete control over every aspect of your device.

::: tip ⚡ Quick Navigation
**Ready to start?** → [Check Prerequisites](#prerequisites--safety) → [Choose Method](#root-method-comparison) → [Follow Process](#universal-rooting-process) → [Device Guide](#device-specific-guides)
:::

### Why Root Your Device?

**System Control & Customization**
- **Remove bloatware** - Permanently delete unwanted pre-installed apps
- **Complete UI customization** - Change fonts, animations, system sounds, themes
- **Advanced backup solutions** - Full system backups including app data and settings
- **Install custom ROMs** - Access latest Android versions on older devices

**Performance & Privacy**
- **System-wide ad blocking** - Block ads in all apps without VPN overhead
- **Performance optimization** - Fine-tune CPU, GPU, and memory management
- **Enhanced privacy control** - Block trackers and manage app permissions granularly
- **Battery optimization** - Advanced power management and kernel tweaking

### Risks and Considerations

**Important Limitations**
- **Warranty void** - Most manufacturers void warranty when bootloader is unlocked
- **Banking app issues** - Some financial apps detect and block rooted devices
- **Security implications** - Malicious apps can potentially cause more damage
- **Update complexity** - May require manual system update installation

**Safety Practices**
- **Always backup** before making any changes
- **Use trusted sources** - Download root tools only from official repositories
- **One change at a time** - Easier to identify issues if something goes wrong
- **Research your device** - Follow device-specific guides and community advice

::: warning ⚠️ Critical Decision Point
**Root if you want:** Complete device control, advanced customization, ad-free experience, performance optimization

**Don't root if you:** Rely heavily on banking apps, prefer hassle-free experience, aren't comfortable with troubleshooting
:::

## Prerequisites & Safety

### Essential Requirements Checklist
- ✅ **Unlockable bootloader** - Verify your device model supports bootloader unlocking
- ✅ **50%+ battery charge** - Prevents unexpected shutdown during critical processes
- ✅ **Complete data backup** - Photos, contacts, documents saved to external storage/cloud
- ✅ **Computer with ADB/Fastboot** - [Download Platform Tools](https://developer.android.com/studio/releases/platform-tools)
- ✅ **Quality USB cable** - Data transfer capable, not charge-only cables
- ✅ **2-3 hours free time** - Don't rush the process

### Required Downloads (Prepare Before Starting)
- **Stock firmware** for your exact device model (emergency recovery)
- **Custom recovery** (TWRP/OrangeFox) matching your device
- **Root package** (Magisk APK + latest root solution files)
- **Device drivers** (manufacturer-specific USB drivers)

### Device Preparation Steps
1. **Enable Developer Options**
   - Settings → About Phone → Tap "Build Number" 7 times
   - Enter device PIN/password when prompted

2. **Configure Developer Settings**
   - Settings → System → Developer Options
   - Enable **USB Debugging**
   - Enable **OEM Unlocking** (may be grayed out initially)

3. **Install USB Drivers**
   - Windows: Install manufacturer-specific drivers
   - Linux/macOS: Usually work out-of-the-box

::: danger ⚠️ Critical Warning
**Unlocking bootloader ERASES ALL DATA** - No exceptions, no recovery. Backup everything important before proceeding.
:::

### Manufacturer Compatibility Guide

| Brand | Difficulty | Special Requirements | Success Rate |
|-------|------------|---------------------|--------------|
| **Google Pixel** | 🟢 Easy | Simple fastboot commands | 99% |
| **OnePlus** | 🟢 Easy | Fastboot unlock only | 95% |
| **Nothing** | 🟡 Medium | Official unlock tool | 90% |
| **Xiaomi** | 🟡 Medium | Mi Unlock Tool + 7-30 day wait | 85% |
| **Motorola** | 🟡 Medium | Official unlock code required | 80% |
| **Samsung** | 🔴 Hard | Exynos only, US models locked | 60% |
| **Sony** | 🟡 Medium | Developer registration needed | 75% |

**Detailed unlocking procedures:** [→ Bootloader Unlocking Guide](./how-to-unlock-bootloader.md)

## Root Method Comparison

Choose the optimal root solution based on your device, experience level, and specific needs:

### 🥇 Magisk (Universal Choice)
**[→ Complete Magisk Guide](./magisk-guide.md)**

**Ideal for:** Beginners, banking app users, maximum compatibility
- ✅ **Largest community** - Extensive documentation and support
- ✅ **Systemless design** - Preserves system integrity
- ✅ **Massive module ecosystem** - Thousands of modifications available
- ✅ **Banking app compatibility** - Best Play Integrity bypass solutions
- ✅ **Broad device support** - Works on Android 6.0-15
- ❌ **Play Integrity challenges** - Requires ongoing workarounds
- ❌ **More complex hiding** - Advanced setup needed for some apps

### 🚀 KernelSU (Advanced Security)
**[→ Complete KernelSU Guide](./kernelsu-guide.md)**

**Ideal for:** GKI 2.0 devices, security-focused users, advanced customization
- ✅ **Kernel-level security** - Superior root management
- ✅ **Advanced App Profiles** - Granular permission control
- ✅ **Better root hiding** - Harder to detect than userspace solutions
- ✅ **Modern architecture** - Built for current Android versions
- ✅ **Lower overhead** - Minimal performance impact
- ❌ **Limited compatibility** - GKI 2.0 devices only (Android 12+)
- ❌ **Smaller ecosystem** - Fewer modules available
- ❌ **Technical complexity** - Requires more knowledge

### �️ LSPosed Framework (Enhancement Layer)
**[→ Complete LSPosed Guide](./lsposed-guide.md)**

**Ideal for:** Deep app modifications (requires Magisk base)
- ✅ **Xposed module compatibility** - Thousands of powerful modules
- ✅ **System-level modifications** - Change app behavior fundamentally
- ✅ **Modular approach** - Enable/disable features independently
- ❌ **Requires base root** - Needs Magisk + Zygisk
- ❌ **Stability concerns** - Some modules may cause issues
- ❌ **Learning curve** - Complex configuration options

### ⚗️ APatch (Experimental)
**Ideal for:** Developers, experimental setups only
- ✅ **Innovative approach** - Latest kernel patching techniques
- ❌ **Limited testing** - Potential stability issues
- ❌ **Minimal documentation** - Requires advanced troubleshooting skills

### Quick Decision Matrix

| Your Priority | Recommended Method | Alternative |
|---------------|-------------------|-------------|
| **First-time rooting** | [Magisk](./magisk-guide.md) | None - stick with Magisk |
| **Banking app usage** | [KernelSU](./kernelsu-guide.md) | [Magisk](./magisk-guide.md) with hiding |
| **Maximum customization** | [Magisk](./magisk-guide.md) + [LSPosed](./lsposed-guide.md) | KernelSU with modules |
| **Privacy/Security focus** | [KernelSU](./kernelsu-guide.md) | Magisk with careful configuration |
| **Older Android device** | [Magisk](./magisk-guide.md) | Check device compatibility |
| **Modern GKI device** | [KernelSU](./kernelsu-guide.md) | Magisk for broader support |

::: tip 💡 Expert Recommendation
**Start with Magisk** unless you have specific reasons for alternatives. It offers the best balance of features, compatibility, and community support for most users.
:::

## Universal Rooting Process

The rooting process follows the same fundamental steps regardless of your device or chosen method:

### Phase 1: Unlock Bootloader
**Critical foundation step - enables all modifications**

**[→ Complete Bootloader Guide](./how-to-unlock-bootloader.md)**

**Process Overview:**
1. **Enable OEM Unlocking** in Developer Options
2. **Request unlock code** (if manufacturer requires)
3. **Boot to fastboot mode:** `adb reboot bootloader`
4. **Execute unlock command:** `fastboot oem unlock` (varies by device)
5. **Accept data wipe** and complete setup

### Phase 2: Install Custom Recovery
**Provides advanced tools for root installation**

**[→ Custom Recovery Guide](./how-to-install-custom-recovery.md)**

**Recommended Recoveries:**
- **TWRP** - Most popular, broad device support
- **OrangeFox** - Modern UI, advanced features
- **SKYHAWK** - Fast, minimal design

**Installation Process:**
1. **Download recovery image** for your exact device model
2. **Boot to fastboot:** `adb reboot bootloader`
3. **Flash recovery:** `fastboot flash recovery recovery.img`
4. **Test recovery boot** to verify installation

### Phase 3: Root Installation
**Install your chosen root solution**

#### Method A: Magisk (Recommended)
1. **Download Magisk APK** from GitHub releases
2. **Rename to Magisk.zip** for recovery installation
3. **Copy to device storage**
4. **Boot to recovery** (Power + Volume Up/Down)
5. **Install ZIP** → Select Magisk.zip → Swipe to flash
6. **Reboot system**

#### Method B: KernelSU (Advanced)
1. **Flash KernelSU kernel** specific to your device
2. **Install KernelSU Manager app**
3. **Configure App Profiles** as needed
4. **Verify root access**

### Phase 4: Verification & Setup
**Confirm root access and configure security**

1. **Install root management app** (Magisk Manager/KernelSU)
2. **Verify root status** shows "Installed"
3. **Test with Root Checker** app from Play Store
4. **Configure root hiding** for banking apps if needed
5. **Create system backup** through recovery

::: warning ⚠️ Safety Checklist
- **One step at a time** - Don't skip verification steps
- **Keep recovery accessible** - Know how to boot to recovery mode
- **Backup before changes** - Create NANDROID backup in recovery
- **Stay charged** - Maintain 50%+ battery throughout process
:::

### Emergency Recovery Procedures

**If Device Won't Boot:**
1. **Boot to recovery** (Power + Volume combinations)
2. **Wipe cache/dalvik** first
3. **Remove last modification** if recently installed
4. **Factory reset** as last resort
5. **Flash stock firmware** for complete recovery

**Common Commands Reference:**
```bash
# Basic ADB/Fastboot commands
adb devices                    # Check device connection
adb reboot bootloader         # Boot to fastboot mode
fastboot devices              # Check fastboot connection
fastboot reboot               # Restart device normally

# Recovery access (varies by device)
Power + Volume Up             # Most common combination
Power + Volume Down           # Alternative for some devices
Power + Volume Up + Home      # Samsung devices
```

## Device-Specific Guides

**Detailed manufacturer-specific instructions with brand-specific quirks and procedures:**

### Available Brand Guides
- **[📱 Xiaomi Devices](./how-to-root-xiaomi-phone.md)** - Mi Unlock Tool, waiting periods, MIUI specifics
- **[📱 Samsung Devices](./how-to-root-samsung-phone.md)** - Knox considerations, Exynos vs Snapdragon
- **[📱 Motorola Devices](./how-to-root-motorola-phone.md)** - Unlock codes, A/B partition handling
- **[📱 Nothing Phones](./how-to-root-nothing-phone.md)** - Nothing OS specific procedures
- **[📱 Google Pixel](./how-to-root-pixel-phone.md)** - Simple unlocking, GrapheneOS compatibility
- **[📱 OnePlus Devices](./how-to-root-oneplus-phone.md)** - OxygenOS rooting, ColorOS migration

### Universal Device Identification
**Before proceeding, verify your exact device model:**

1. **Settings Method:** Settings → About Phone → Model Number
2. **ADB Method:** `adb shell getprop ro.product.model`
3. **Fastboot Method:** `fastboot getvar product` (in bootloader mode)

::: danger ⚠️ Critical Warning
**Never use files for similar device models** - Even phones with similar names can have completely different hardware requiring specific procedures.
:::

### Can't Find Your Device?

**Community Resources:**
- **[XDA Forums](https://forum.xda-developers.com/)** - Device-specific development communities
- **Telegram Groups** - Search "[Device Name] root" or "development"
- **Reddit Communities** - r/AndroidRoot, brand-specific subreddits
- **Discord Servers** - Many brands have active rooting communities

**Research Strategy:**
1. **Search exact model number** (not marketing name)
2. **Check XDA device forum** for your specific model
3. **Look for "unified" procedures** that cover multiple variants
4. **Join device-specific communities** for real-time help

**Generic Approach:**
If no specific guide exists, follow the [Universal Process](#universal-rooting-process) while adapting manufacturer-specific requirements from similar devices.

## Post-Root Setup

### Essential First Steps

**Root Management Configuration**
1. **Open root manager app** (Magisk/KernelSU)
2. **Verify root status** shows as installed/active
3. **Configure update channels** for security patches
4. **Set up automatic backups** of root configuration

**Security & Privacy Setup**
1. **Configure root hiding** for banking/work apps
2. **Set up DenyList** for sensitive applications
3. **Install security modules** (if using Magisk)
4. **Review and audit root permissions** granted to apps

### Recommended Root Applications

**Essential Management Tools**
- **[📱 Root Apps Collection](../android-root-apps/#root-apps)** - Browse 300+ curated root applications
- **[🔧 App Manager](https://github.com/MuntashirAkon/AppManager)** - Advanced app control and analysis
- **[💾 Neo Backup](https://github.com/NeoApplications/Neo-Backup)** - Complete backup solution
- **[📁 MiXplorer](https://mixplorer.com/)** - Powerful file manager with root access

**System Enhancement**
- **[🚫 AdAway](https://adaway.org/)** - System-wide ad blocking via hosts file
- **[🧹 SD Maid SE](https://github.com/d4rken-org/sdmaid-se)** - Advanced system cleaner
- **[⚡ Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)** - Automation with root capabilities

### Advanced Framework Installation

**LSPosed Framework (For Advanced Users)**
- **[📖 LSPosed Installation Guide](./lsposed-guide.md)** - Complete setup instructions
- Enables Xposed modules for deep system modifications
- Requires Magisk with Zygisk enabled

**Custom ROM Options**
- **[🌟 Custom ROM Installation Guide](./custom-rom-installation.md)** - LineageOS, GrapheneOS, CalyxOS installation
- Enhanced privacy, performance, and feature sets
- Latest Android versions on older devices

### Banking App Compatibility

**Modern Play Integrity Solutions (Updated Methods)**
1. **Tricky Store Module** - Latest bypass technique
2. **Shamiko Module** - Enhanced root hiding
3. **Universal SafetyNet Fix** - Legacy app support
4. **Hide My Applist** - Prevent app detection

**Configuration Steps:**
1. Enable Zygisk in root manager
2. Install bypass modules
3. Configure DenyList for banking apps
4. Clear banking app data and re-login
5. Test with Play Integrity Checker

### System Optimization

**Performance Tuning**
- **Kernel management** - Custom kernels for better performance/battery
- **CPU governor optimization** - Balance performance and efficiency
- **RAM management tweaks** - Optimize memory usage
- **I/O scheduler tuning** - Improve storage performance

**Battery Optimization**
- **Aggressive doze modes** - Deeper sleep states
- **Background app limitations** - Prevent unnecessary wake-ups
- **Thermal management** - Better heat control
- **Undervolting/underclocking** - Reduce power consumption

### Maintenance Best Practices

**Regular Tasks**
- **Weekly:** Check for root manager updates
- **Monthly:** Review granted root permissions
- **Before updates:** Create full system backup
- **After changes:** Test core functionality

**Safety Habits**
- **One modification at a time** - Easier troubleshooting
- **Test before permanent changes** - Use temporary modifications first
- **Keep recovery accessible** - Never remove recovery without replacement
- **Document changes** - Track what you've modified

::: tip 🚀 Advanced Features
**Ready for more?** Explore [Advanced App Modifications](../android-root-apps/#app-mods), [Performance Tuning](../android-root-apps/#performance-improvements), and [Privacy Enhancements](../android-root-apps/#privacy-and-security) in our comprehensive app collection.
:::


## Troubleshooting

### Emergency Recovery Solutions

#### Device Boot Issues (Bootloop/Won't Start)
**Immediate Actions:**
1. **Force recovery mode** - Power + Volume Down (hold 15+ seconds)
2. **Wipe cache partition** - Advanced Wipe → Cache + Dalvik/ART Cache
3. **Remove recent changes** - Disable last installed module/modification
4. **Factory reset** - Last resort, erases all user data
5. **Flash stock firmware** - Complete recovery method

**Advanced Recovery:**
```bash
# Enter download/fastboot mode
adb reboot bootloader

# Flash stock recovery (if custom recovery is broken)
fastboot flash recovery stock_recovery.img

# Flash complete stock firmware
fastboot flashall
```

#### Root Access Problems
**Diagnostics Steps:**
1. **Check root manager status** - Should show "Installed" or "Active"
2. **Verify root with test app** - Root Checker Basic from Play Store
3. **Review permissions log** - Check for denied requests
4. **Restart root service** - Reboot device or restart root daemon
5. **Reinstall root package** - Re-flash through recovery if corrupted

#### Banking/Payment App Detection
**Current Working Solutions:**
1. **Enable Zygisk** in root manager settings
2. **Install Tricky Store module** - Latest Play Integrity bypass
3. **Configure DenyList** - Add problematic apps
4. **Clear app data** - Force apps to re-check root status
5. **Test with Play Integrity Checker** - Verify bypass success

**Alternative Modules:**
- **Shamiko** - Enhanced root hiding
- **Hide My Applist** - Prevent app list detection
- **Universal SafetyNet Fix** - Legacy compatibility

#### Complete Device Recovery

**Hardware Key Combinations (when software fails):**
```
Samsung: Power + Volume Up + Home
Google Pixel: Power + Volume Down
Xiaomi: Power + Volume Up
OnePlus: Power + Volume Down
Motorola: Power + Volume Down
```

**Emergency Download Modes:**
- **Samsung:** Power + Volume Down + Home
- **LG:** Power + Volume Up (while connecting USB)
- **HTC:** Power + Volume Down
- **Sony:** Volume Up (while connecting USB)

### Common Error Solutions

#### "Device Not Found" or "Unauthorized"
```bash
# Kill and restart ADB server
adb kill-server
adb start-server

# Check device connection
adb devices

# If unauthorized, check phone for USB debugging prompt
```

#### "Fastboot Not Recognized"
1. **Install proper drivers** - Manufacturer-specific USB drivers
2. **Try different USB ports** - USB 2.0 ports often work better
3. **Check cable quality** - Use data-capable cables, not charging-only
4. **Disable USB selective suspend** - Windows power management settings

#### "Failed to Load/Flash Image"
```bash
# Check file integrity
fastboot flash boot boot.img

# If fails, try:
fastboot --slot=all flash boot boot.img    # A/B devices
fastboot flash:raw boot boot.img           # Alternative method
```

### Getting Community Help

**Effective Help Requests:**
- **Device model** - Exact model number, not marketing name
- **Android version** - Settings → About Phone → Android Version
- **Root method used** - Magisk, KernelSU, version numbers
- **Error messages** - Full text, screenshots if possible
- **Steps taken** - What you tried before asking
- **Recent changes** - What you installed/modified recently

**Best Support Channels:**
- **[📖 FAQ Guide](../faqs.md)** - Comprehensive troubleshooting database
- **[XDA Forums](https://forum.xda-developers.com/)** - Device-specific expert communities
- **Telegram Groups** - Real-time help from experienced users
- **Reddit** - r/AndroidRoot, r/Magisk, brand-specific subreddits
- **Discord Servers** - Many manufacturers have active communities

**Emergency Resources:**
- **Firmware databases** - sammobile.com, firmware.mobi
- **Stock ROM collections** - Search "[device model] stock firmware"
- **Unbrick guides** - XDA Forums device-specific recovery guides

::: warning ⚠️ Last Resort Options
If all software solutions fail, consider professional repair services or manufacturer warranty claims (if bootloader was never unlocked).
:::

---

## Ready to Begin Your Rooting Journey?

### Final Pre-Flight Checklist
- [ ] **Complete data backup** verified and tested
- [ ] **Device compatibility** confirmed with community
- [ ] **Required files downloaded** (firmware, recovery, root package)
- [ ] **Computer setup** with ADB/Fastboot and drivers
- [ ] **Emergency plan** understood (recovery procedures)
- [ ] **Time allocated** (2-4 hours without rushing)

### Your Path Forward
1. **[🔓 Unlock Bootloader](./how-to-unlock-bootloader.md)** - Foundation step for all modifications
2. **[🛠️ Install Recovery](./how-to-install-custom-recovery.md)** - Advanced tools for root installation
3. **[📱 Device-Specific Guide](#device-specific-guides)** - Brand-specific procedures and quirks
4. **[⚡ Choose Root Method](#root-method-comparison)** - Select optimal solution for your needs

### Success Principles
✅ **Research thoroughly** before making changes  
✅ **Follow instructions precisely** - small details matter  
✅ **Ask questions** when uncertain - communities are helpful  
✅ **Be patient** - rushing leads to mistakes  
✅ **Backup everything** - preparation prevents disasters  

---

🎉 **Welcome to the World of Android Freedom!**

**You now possess the knowledge to safely unlock your Android device's full potential.** Join millions of users worldwide who have taken control of their digital experience through rooting.

**Your journey to unlimited Android possibilities begins now!**
