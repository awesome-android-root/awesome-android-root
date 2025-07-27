---
layout: doc
title: Complete Custom ROM Installation Guide
description: "Master guide to install custom Android ROMs - LineageOS, GrapheneOS, Pixel Experience, CalyxOS. Transform your device with privacy-focused alternatives."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/custom-rom-installation
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Custom ROM Installation Guide - All Android Alternatives
  - - meta
    - property: og:description
      content: Install custom Android ROMs with our comprehensive guide covering LineageOS, GrapheneOS, Pixel Experience and privacy-focused alternatives.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/custom-rom-installation
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/custom-rom.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Custom ROM Installation Guide - Android Alternatives
  - - meta
    - name: twitter:description
      content: Install custom Android ROMs like LineageOS, GrapheneOS, Pixel Experience with step-by-step guide.
  - - meta
    - name: keywords
      content: custom rom installation, lineageos installation, grapheneos guide, pixel experience rom, android alternatives, aosp distribution, degoogled android, custom android firmware
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Modification
  - - meta
    - property: article:tag
      content: Custom ROM
  - - meta
    - property: article:tag
      content: LineageOS
  - - meta
    - property: article:tag
      content: GrapheneOS
  - - meta
    - property: article:tag
      content: Android Privacy
  - - meta
    - name: robots
      content: index, follow
---

# Complete Custom ROM Installation Guide

**Transform your Android experience** - Install privacy-focused, security-enhanced custom ROMs to revive and enhance your device.

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md)** - Universal rooting principles and safety
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - Required first step
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - Installation prerequisite
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions for common issues

## Understanding Custom ROMs

**Custom ROMs** are alternative Android distributions that replace your device's stock firmware, offering enhanced privacy, performance, and customization.

### Why Choose Custom ROMs?

**Key Benefits:**
- **Extended device lifespan** - Continue receiving updates after manufacturer stops
- **Enhanced privacy controls** - Remove Google tracking and telemetry
- **Bloatware elimination** - Clean Android experience without vendor apps
- **Performance optimization** - Better battery life and system responsiveness
- **Customization freedom** - Deep system modifications and theming
- **Security improvements** - Faster security patches and hardened features

### ROM Categories

**Privacy & Security Focused:**
- **GrapheneOS** - Maximum security for Pixel devices
- **CalyxOS** - Privacy with app compatibility balance
- **DivestOS** - Hardened Android with broad device support

**General Use & Features:**
- **LineageOS** - Most popular, widest device support
- **Pixel Experience** - Stock Google experience on non-Pixel devices
- **crDroid** - Feature-rich customization options

**Gaming & Performance:**
- **Project Sakura** - Gaming optimizations
- **ArrowOS** - Performance-focused experience
- **EvolutionX** - Balanced features and performance

## Critical Warnings

::: danger ⚠️ Custom ROM Risks
- **Warranty void** - Installing custom ROM voids manufacturer warranty
- **Bricking potential** - Wrong ROM can permanently damage device
- **Banking app issues** - May require root hiding or SafetyNet bypass
- **Learning curve** - Requires technical knowledge and troubleshooting skills
- **Update responsibility** - Manual updates and security patch management
:::

## Prerequisites & Requirements

### Essential Prerequisites
1. **[Unlocked bootloader](./how-to-unlock-bootloader.md)** - Absolutely required
2. **[Custom recovery](./how-to-install-custom-recovery.md)** - TWRP/OrangeFox installed  
3. **Compatible ROM** - Verified support for your exact device model
4. **Backup everything** - Complete NANDroid backup via recovery
5. **Stock firmware** - Original ROM for emergency recovery

### Required Tools
- **ADB/Fastboot** - Platform tools for device communication
- **Custom recovery** - TWRP, OrangeFox, or device-specific recovery
- **ROM files** - Custom ROM ZIP and optional GApps package
- **Computer** - Windows, macOS, or Linux with USB drivers

### Device Preparation
1. **Charge to 70%+** - Prevent interruption during installation
2. **Stable USB connection** - Quality cable and reliable computer
3. **Backup critical data** - Photos, contacts, apps, documents
4. **Note device info** - Model number, current firmware version

## ROM Selection Guide

### Decision Matrix

| **Need** | **Recommended ROM** | **Why** |
|----------|-------------------|---------|
| **Maximum Privacy** | GrapheneOS | Hardware security, no Google |
| **Privacy + Apps** | CalyxOS | microG integration, app compatibility |
| **Most Devices** | LineageOS | 300+ supported devices |
| **Pixel Experience** | Pixel Experience | Google features on non-Pixel |
| **Gaming** | Project Sakura | Performance optimizations |
| **Customization** | crDroid | Extensive modification options |

### Device Compatibility Check

**Find Your Device:**
1. **[CustomROMBay.org](https://customrombay.org/)** - Comprehensive ROM database
2. **[XDA Forums](https://forum.xda-developers.com/)** - Device-specific development
3. **ROM official websites** - Check supported device lists

**Verify Model:**
- Settings → About Phone → Model Number
- Must match exactly (SM-G991B ≠ SM-G991U)
- Check regional variants and carrier differences

## Installation Process

### Step 1: Create Complete Backup

**Critical Safety Step:**
1. **Boot to custom recovery** - Power + Volume combinations vary
2. **Create NANDroid backup:**
   - Recovery → Backup → Select all partitions
   - Wait 10-30 minutes for completion
   - Store backup files safely

### Step 2: Download ROM Files

**Essential Downloads:**
1. **Custom ROM ZIP** - From official source for your device
2. **GApps package** (optional) - Google services integration
3. **Additional mods** - Kernels, themes, or specific modifications

**File Verification:**
- Check MD5/SHA checksums if provided
- Verify file integrity before flashing
- Ensure files match your device exactly

### Step 3: Prepare Device

**Pre-installation Steps:**
1. **Transfer files** to device storage or SD card
2. **Boot to recovery** mode
3. **Verify recovery functionality** - Test touch/navigation

### Step 4: Wipe System

::: warning ⚠️ Data Loss Warning
This process erases all user data. Ensure backup is complete!
:::

**Wipe Procedure:**
1. **Factory Reset** - Wipe → Factory Reset (standard wipe)
2. **Advanced Wipe** (clean install):
   - Select: System, Data, Dalvik/ART Cache
   - Optional: Internal Storage (complete fresh start)

### Step 5: Flash Custom ROM

**Installation Sequence:**
1. **Flash ROM ZIP:**
   - Install → Select ROM file → Swipe to confirm
   - Wait 5-15 minutes for completion

2. **Flash GApps** (immediately after ROM):
   - Install → Select GApps package → Swipe to confirm
   - Must flash before first boot

3. **Flash additional mods** (if needed):
   - Custom kernels, root solutions, or modifications

### Step 6: First Boot & Setup

**Initial Boot:**
1. **Reboot system** - First boot takes 10-20 minutes
2. **Don't interrupt** - Allow complete initialization
3. **Setup wizard** - Configure accounts and preferences

## ROM-Specific Installation

### GrapheneOS (Pixel Only)

**Web Installer Method:**
1. **Visit [GrapheneOS Install](https://grapheneos.org/install/web)**
2. **Use Chrome/Chromium** with WebUSB support
3. **Follow web installer** - Automated process
4. **No recovery needed** - Direct fastboot flashing

**Benefits:** Maximum security, regular updates, sandboxed Google Play

### LineageOS (Most Devices)

**Standard Recovery Method:**
1. **Download from [LineageOS](https://download.lineageos.org/)**
2. **Flash via TWRP/OrangeFox**
3. **Add GApps** if Google services desired
4. **Configure Privacy Guard** during setup

**Benefits:** Widest device support, stable releases, Privacy Guard

### Pixel Experience (Popular Devices)

**Installation Options:**
- **Pixel Experience Plus** - Includes Google apps
- **Pixel Experience** - Clean AOSP base
- **Flash via recovery** - Standard installation process

**Benefits:** Authentic Pixel UI, monthly updates, Google integration

## Post-Installation Setup

### Essential Configuration

**First Boot Setup:**
1. **Complete Android setup** - Skip Google account initially
2. **Check all functions** - WiFi, cellular, sensors, cameras
3. **Install essential apps** - F-Droid, Aurora Store, browsers

**Privacy Optimization:**
1. **Disable telemetry** - Turn off analytics and data sharing
2. **Configure DNS** - Use privacy-focused DNS providers
3. **Install privacy apps** - VPN, ad blockers, secure messaging

### App Installation

**App Store Alternatives:**
- **F-Droid** - Open-source apps repository
- **Aurora Store** - Google Play without account
- **APKMirror** - Trusted APK downloads
- **Direct APKs** - From developer websites

**Banking App Compatibility:**
1. **Install Magisk** - For root hiding if needed
2. **Configure SafetyNet** - Use Universal SafetyNet Fix
3. **Test banking apps** - Some may work without modification

## Troubleshooting Guide

### Common Installation Issues

#### ROM Won't Boot (Bootloop)
**Symptoms:** Stuck on boot animation or bootloop
**Solutions:**
1. **Flash stock recovery** and factory reset
2. **Wipe Dalvik/ART cache** in recovery
3. **Flash different GApps** package
4. **Restore from backup** if all else fails

#### Missing Features
**Symptoms:** Camera, sensors, or hardware not working
**Solutions:**
1. **Flash vendor/firmware** package if available
2. **Use ROM-specific fixes** from developer
3. **Check XDA forums** for device-specific solutions

#### Performance Issues
**Symptoms:** Lag, crashes, or poor battery life
**Solutions:**
1. **Clean flash** - Complete wipe and reinstall
2. **Different kernel** - Flash performance-optimized kernel
3. **Reduce animations** - Developer options tweaks

### Recovery Solutions

#### Emergency Recovery
**If device won't boot:**
1. **Boot to fastboot** - Hardware key combination
2. **Flash stock boot.img** via fastboot
3. **Use manufacturer tools** - Odin (Samsung), Mi Flash (Xiaomi)
4. **Complete stock restore** if necessary

#### Backup Restoration
**Restore previous state:**
1. **Boot to custom recovery**
2. **Restore NANDroid backup**
3. **Select appropriate partitions**
4. **Wait for restoration completion**

## Staying Updated

### Update Strategies

**Manual Updates:**
1. **Monitor ROM releases** - Check official sources regularly
2. **Download new builds** - Usually monthly or weekly
3. **Dirty flash** - Flash new ROM over existing (keeps data)
4. **Clean flash** - Complete wipe for major updates

**OTA Updates:**
- **LineageOS** - Built-in updater for official builds
- **Pixel Experience** - OTA support for supported devices
- **Custom builds** - Usually require manual flashing

### Community Resources

**Development Communities:**
- **[XDA Developers](https://forum.xda-developers.com/)** - Device-specific forums
- **[Reddit ROM Communities](https://reddit.com/r/LineageOS)** - User discussions
- **[Telegram Groups](https://t.me/s/pixelexperience)** - Real-time support
- **[GitHub Issues](https://github.com/LineageOS)** - Bug reports and development

**Official Resources:**
- **ROM websites** - Official downloads and documentation
- **Device trees** - Source code for device support
- **Changelogs** - Track new features and fixes

---

::: tip 💡 Custom ROM Success Tips
**Best Practices:**
- Always backup before making changes
- Use official ROM builds when possible
- Join device-specific communities for support
- Keep stock firmware handy for recovery
- Start with stable releases before trying experimental builds
:::

**Need more help?** Visit our **[FAQ section](../faqs.md)** or check the **[main rooting guide](./index.md)** for additional troubleshooting and techniques.  
✅ **[Custom Recovery](./how-to-install-custom-recovery.md)** - TWRP or similar installed  
✅ **ADB/Fastboot Tools** - Platform tools for device communication  
✅ **70%+ Battery** - Prevent interruptions during installation  
✅ **Stable USB Connection** - Quality cable and reliable computer  
✅ **Compatible ROM** - Verified support for your exact device model  

### Critical Safety Steps
⚠️ **BACKUP EVERYTHING** - Create complete NANDroid backup via custom recovery  
⚠️ **VERIFY DEVICE** - Match exact device codename and region  
⚠️ **DOWNLOAD STOCK ROM** - Keep original firmware for emergency recovery  

**Double-check device compatibility** - Installing wrong ROM can brick your device!

## Installation Steps

### Step 1: Prepare Files
1. **Verify Device Compatibility**
   ```bash
   adb shell getprop ro.product.device  # Check device codename
   ```

2. **Download Required Files**
   - Custom ROM zip for your specific device
   - GApps package (if ROM doesn't include Google services)
   - Transfer files to device storage/SD card

### Step 2: Create Full Backup
1. **Boot to Recovery**
   ```bash
   adb reboot recovery
   ```

2. **Create NANDroid Backup**
   - Recovery → Backup → Select all partitions
   - Name with date and current ROM info
   - Wait 10-30 minutes for completion

### Step 3: Wipe Device
⚠️ **This erases all data - ensure backup is complete!**

1. **Factory Reset**
   - Wipe → Factory Reset
   - Wipe Dalvik/Cache
   - Advanced Wipe → System (for clean install)

### Step 4: Flash ROM
1. **Install ROM**
   - Install → Select ROM zip file
   - Swipe to confirm flash
   - Wait 5-15 minutes

2. **Flash Additional Packages** (if needed)
   - GApps (immediately after ROM)
   - Magisk (for root access)
   - Custom kernels or mods

### Step 5: First Boot
1. **Reboot System**
   - First boot takes 5-15 minutes
   - Don't interrupt the process!

2. **Initial Setup**
   - Complete Android setup wizard
   - Configure accounts and preferences

## ROM-Specific Installation

### GrapheneOS (Pixel Devices Only)
**Uses web installer instead of custom recovery**

1. **Visit [GrapheneOS Install Page](https://grapheneos.org/install/)**
2. **Use Chrome/Chromium browser** with WebUSB support
3. **Connect device** with USB debugging enabled
4. **Follow web installer** - automatic process handles everything
5. **Complete setup** with privacy-focused configuration

**Benefits:** Maximum security, hardware-verified boot, sandboxed Google Play

### LineageOS (Most Devices)
**Standard custom recovery method**

1. **Find ROM at [LineageOS Downloads](https://download.lineageos.org/)**
2. **Download** LineageOS zip + GApps (optional)
3. **Follow standard installation steps** above
4. **Flash GApps immediately** after ROM (if desired)

**Benefits:** Widest device support, clean Android experience, regular updates

### Pixel Experience (Popular Devices)
**Brings Pixel features to non-Pixel devices**

1. **Download from [Pixel Experience](https://download.pixelexperience.org/)**
2. **Choose Plus** (includes GApps) or Regular version
3. **Follow standard installation steps**
4. **Setup Pixel features** during initial configuration

**Benefits:** Authentic Pixel UI, Google integration, monthly updates

## Finding ROMs

### Best ROM Databases

#### 1. CustomROMBay.org
🔗 **[CustomROMBay.org](https://customrombay.org/)** - Most comprehensive database

- **811 supported devices** across all manufacturers
- **Organized by brand** (Samsung, Xiaomi, OnePlus, etc.)
- **Direct download links** - no complicated navigation
- **Multiple ROM options** for each device
- **Update status** shown for each ROM

**How to use:**
1. Visit [CustomROMBay.org](https://customrombay.org/)
2. Find your device manufacturer
3. Select your device model
4. Browse available ROMs
5. Download with direct links

#### 2. Official ROM Websites
- **LineageOS:** [download.lineageos.org](https://download.lineageos.org/)
- **GrapheneOS:** [grapheneos.org/releases](https://grapheneos.org/releases)
- **Pixel Experience:** [download.pixelexperience.org](https://download.pixelexperience.org/)
- **CalyxOS:** [calyxos.org/get](https://calyxos.org/get/)

#### 3. XDA Developers Forums
- Device-specific discussions and support
- Developer releases and beta ROMs
- Community troubleshooting

### Compatibility Verification

**Before downloading, verify:**
- **Exact device codename** (e.g., `vayu` for POCO X3 Pro)
- **Region variant** (some devices have region-specific builds)
- **Architecture** (ARM64/ARM32)
- **Bootloader version** requirements

**Check device info:**
```bash
adb shell getprop ro.product.device    # Device codename
adb shell getprop ro.product.cpu.abi   # Architecture
adb shell getprop ro.bootloader        # Bootloader version
```

## Setup & Troubleshooting

### Post-Installation Setup

#### Essential Configuration
1. **Complete setup wizard** - Configure basic Android settings
2. **Restore app data** - Reinstall apps or restore from backup
3. **Configure accounts** - Add Google/other accounts as needed
4. **Privacy settings** - Review and adjust permissions

#### Privacy & Security (For Privacy ROMs)
- **Review app permissions** - Audit carefully
- **Configure firewall** - Set up network controls
- **Disable telemetry** - Turn off data collection
- **Private DNS** - Configure DNS over HTTPS/TLS

#### Performance Optimization
- **Battery optimization** - Configure adaptive battery
- **Background limits** - Restrict background apps
- **Storage management** - Set up automatic cleanup

### Common Issues & Solutions

#### Boot Problems
**Device stuck on boot logo/bootloop:**
1. Boot to recovery → Clear cache/dalvik cache
2. Reflash ROM (wipe system first)
3. Check GApps compatibility
4. Restore NANDroid backup as last resort

**"System UI stopped" errors:**
1. Clear System UI cache (Apps → System UI → Storage → Clear Cache)
2. Wipe cache partition in recovery
3. Disable custom themes
4. Factory reset if other methods fail

#### Banking Apps Not Working
1. **Enable DenyList** in Magisk (hide root from banking apps)
2. **Install SafetyNet fix** modules
3. **Use work profile** to isolate banking apps
4. **Consider stock ROM** for apps requiring strict validation

#### Performance Issues
**Poor battery life:**
1. Check background apps and limit activity
2. Disable unused features
3. Adjust performance profile/CPU governor
4. Consider custom kernel for better power management

**System lag:**
1. Clear cache partition in recovery
2. Reduce animations in developer options
3. Ensure sufficient free storage (>15%)
4. Close unnecessary background apps

### Recovery Options

#### Complete System Recovery
1. **Boot to recovery mode**
2. **Restore NANDroid backup** - Select backup → Choose all partitions → Wait 15-30 minutes

#### Return to Stock ROM
1. **Download stock firmware** for your device
2. **Use manufacturer tools** (Odin for Samsung, MiFlash for Xiaomi)
3. **Flash via download/fastboot mode**
4. **Follow device-specific instructions**

### Recommended Apps

#### Open Source Essentials
- **F-Droid** - Open source app store
- **Aurora Store** - Play Store alternative
- **Shelter** - Work profile management
- **NetGuard** - Network firewall

#### Privacy Tools
- **Signal** - Secure messaging
- **Tor Browser** - Anonymous browsing
- **Bitwarden** - Password manager
- **ProtonMail** - Encrypted email

## What's Next?

**Congratulations!** You've successfully installed a custom ROM. Here's your next steps:

### Advanced Customization
- **[Add Root Access](./index.md#root-solutions-comparison)** - Install Magisk, KernelSU, or APatch
- **[Custom Kernels](./index.md#advanced-framework-solutions)** - Optimize performance and features
- **[LSPosed Modules](./index.md#lsposed-framework)** - Deep system modifications

### Resources & Community
- **[CustomROMBay.org](https://customrombay.org/)** - ROMs for 811 devices
- **[FAQ & Troubleshooting](../faqs.md)** - Common issues and solutions
- **[Join Community](../about.md#community--resources)** - Connect with other users

### Security & Privacy
- **Regular Updates** - Keep ROM updated with latest security patches
- **Privacy Audits** - Regularly review app permissions and data usage
- **Backup Strategy** - Maintain current NANDroid backups

**Need help?** Check XDA Developers forums for device-specific support or visit our [FAQ section](../faqs.md) for common issues.
