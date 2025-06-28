---
layout: doc
title: Custom ROM Installation Guide 2025
description: "Complete step-by-step custom ROM installation guide for 2025 for installing LineageOS,CalyxOS GrapheneOS, Pixel Experience & more. "
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/custom-rom-installation
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Custom ROM Installation Guide 2025 - LineageOS, GrapheneOS & More
  - - meta
    - property: og:description
      content: Master custom ROM installation with our comprehensive 2025 guide. Compare Android-based OS options, install LineageOS, GrapheneOS, Pixel Experience with step-by-step instructions.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/custom-rom-installation
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Custom ROM Installation Guide 2025 - Android-based OS
  - - meta
    - name: twitter:description
      content: Complete guide to install custom ROMs like LineageOS, GrapheneOS, Pixel Experience. Compare privacy & security features across Android distributions.
  - - meta
    - name: keywords
      content: custom rom installation guide 2025, lineageos installation, grapheneos guide, pixel experience rom, android based operating systems, custom rom comparison, aosp distribution, android privacy roms, security focused android, degoogled android, custom android firmware
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
    - property: article:published_time
      content: 2025-06-25
  - - meta
    - property: article:modified_time
      content: 2025-06-25
  - - meta
    - name: robots
      content: index, follow, max-image-preview:large
---

# Custom ROM Installation Guide

Complete guide to installing custom Android ROMs - Unlock the full potential of your Android device with privacy-focused, security-enhanced, and feature-rich Android distributions.

## Table of Contents
- [Quick Start](#quick-start)
- [What are Custom ROMs?](#what-are-custom-roms)
- [Why Install Custom ROMs?](#why-install-custom-roms)
- [Popular Custom ROM Comparison](#popular-custom-rom-comparison)
  - [Privacy & Security Focused](#privacy--security-focused)
  - [Feature-Rich ROMs](#feature-rich-roms)
  - [Stock Android Experience](#stock-android-experience)
- [Complete Android-based OS Comparison](#complete-android-based-os-comparison)
- [Prerequisites](#prerequisites)
- [Universal Installation Steps](#universal-installation-steps)
- [ROM-Specific Installation Guides](#rom-specific-installation-guides)
  - [GrapheneOS Installation](#grapheneos-installation)
  - [LineageOS Installation](#lineageos-installation)
  - [Pixel Experience Installation](#pixel-experience-installation)
- [Finding ROMs for Your Device](#finding-roms-for-your-device)
- [Post-Installation Setup](#post-installation-setup)
- [Troubleshooting](#troubleshooting)
- [Advanced Topics](#advanced-topics)

## Quick Start

**Ready to transform your Android experience?** Follow this complete roadmap:

1. 🔓 **[Unlock bootloader](./how-to-unlock-bootloader.md)** - Essential prerequisite for all custom ROMs
2. 🛠️ **[Install custom recovery](./how-to-install-custom-recovery.md)** - TWRP, OrangeFox, or SKYHAWK for ROM flashing
3. 🔍 **[Choose your ROM](#popular-custom-rom-comparison)** - Compare privacy, features, and compatibility
4. 📱 **[Find device support](#finding-roms-for-your-device)** - Verify ROM availability for your specific device
5. 💾 **[Backup everything](#prerequisites)** - Create complete system backup before proceeding
6. ⚡ **[Flash ROM](#universal-installation-steps)** - Install your chosen custom ROM
7. ⚙️ **[Setup & optimize](#post-installation-setup)** - Configure and secure your new ROM

### 🔗 **Related Guides in This Series:**
- **[📖 Complete Rooting Guide](./index.md)** - Master guide covering all aspects of rooting
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - Required prerequisite step
- **[🛠️ Custom Recovery Installation](./how-to-install-custom-recovery.md)** - Required prerequisite step
- **[⚡ Root Installation](./index.md#root-solutions-comparison)** - Optional: Add root access to custom ROM
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Complete support guide with troubleshooting solutions
- **[📖 About Project](../about.md)** - Learn about Awesome Android Root

::: tip 🚀 Prerequisites Check
Before starting, ensure you have completed [bootloader unlocking](./how-to-unlock-bootloader.md) and [custom recovery installation](./custom-recovery.md). These are mandatory steps for custom ROM installation.
:::

## What are Custom ROMs?

**Custom ROMs** are modified versions of Android that replace your device's stock firmware. Think of them as alternative Android distributions, similar to different Linux distributions:

### Key Characteristics
- 📱 **Alternative Android Experience** - Complete replacement of stock Android firmware
- 🔧 **Enhanced Features** - Additional functionality not available in stock ROMs
- 🛡️ **Privacy & Security Focus** - Many ROMs prioritize user privacy and security
- 🚫 **Degoogled Options** - Reduced or eliminated Google services integration
- ⚡ **Performance Optimization** - Improved system performance and battery life
- 🎨 **Customization Freedom** - Deep system-level customization options

### Custom ROM vs Stock Android

| **Stock Android/OEM ROMs** | **Custom ROMs** |
|----------------------------|-----------------|
| ✅ Official manufacturer support | ✅ Community-driven development |
| ✅ Guaranteed updates (for limited time) | ✅ Extended device lifespan |
| ✅ Banking apps work without issues | ✅ Enhanced privacy and security |
| ❌ Limited customization options | ✅ Extensive customization |
| ❌ Bloatware and tracking | ✅ Minimal or no bloatware |
| ❌ Forced Google integration | ✅ Optional Google services |
| ❌ Update dependency on manufacturer | ✅ Community-maintained updates |

## Why Install Custom ROMs?

### Primary Benefits

#### 🛡️ Privacy & Security
- **Degoogled Experience** - Reduced or eliminated Google tracking
- **Enhanced Security** - Regular security updates beyond manufacturer support
- **Privacy Controls** - Granular permission management and network controls
- **Open Source Transparency** - Auditable code for security verification

#### 🔧 Enhanced Functionality
- **Extended Device Lifespan** - Updates for devices abandoned by manufacturers
- **Performance Optimization** - Improved speed, battery life, and resource management
- **Advanced Features** - Functionality not available in stock Android
- **Customization Freedom** - Deep system modifications and theming

#### 🚫 Bloatware Removal
- **Clean Experience** - Removal of manufacturer and carrier bloatware
- **Resource Efficiency** - Better RAM and storage utilization
- **Faster Performance** - Reduced background processes and system overhead

### Advanced Use Cases
- **Privacy-Conscious Users** - Maximum control over data and tracking prevention
- **Developers & Power Users** - Advanced debugging and development features
- **Legacy Device Revival** - Modern Android on older, unsupported devices
- **Custom Enterprise Solutions** - Tailored Android experiences for specific needs

## Popular Custom ROM Comparison

### Privacy & Security Focused

#### GrapheneOS - **Maximum Security & Privacy**
- **Focus:** Hardened security and privacy-first approach
- **Target Users:** Security professionals, privacy advocates
- **Key Features:**
  - ✅ **Hardened Kernel** - Advanced exploit mitigations
  - ✅ **Sandboxed Google Play** - Optional Play Services in sandbox
  - ✅ **Enhanced Permissions** - Storage scopes, contact scopes, sensor controls
  - ✅ **Verified Boot** - Hardware-based security verification
  - ✅ **Regular Updates** - Frequent security patches
- **Device Support:** Google Pixel devices only
- **Best For:** Users prioritizing maximum security and privacy

#### CalyxOS - **Privacy with Usability**
- **Focus:** Privacy-focused with better app compatibility
- **Target Users:** Privacy-conscious users wanting convenience
- **Key Features:**
  - ✅ **microG Integration** - Google services alternative for app compatibility
  - ✅ **Firewall & VPN** - Built-in network protection
  - ✅ **F-Droid Integration** - Open source app store
  - ✅ **Signal Integration** - Enhanced Signal messenger features
- **Device Support:** Google Pixel devices primarily
- **Best For:** Privacy-focused users needing better app compatibility

#### DivestOS - **Discontinued (2024)**
- **Status:** Project discontinued at end of 2024
- **Legacy:** Previously offered privacy-focused ROM with extensive device support

### Feature-Rich ROMs

#### LineageOS - **Most Popular Custom ROM**
- **Focus:** Clean Android experience with essential features
- **Target Users:** General users wanting stock Android with enhancements
- **Key Features:**
  - ✅ **Widest Device Support** - Supports 300+ devices
  - ✅ **Regular Updates** - Weekly builds with security updates  
  - ✅ **Privacy Guard** - App permission controls
  - ✅ **Theme Engine** - System-wide theming capabilities
  - ✅ **Long-term Support** - Updates beyond manufacturer EOL
- **Device Support:** Largest ecosystem - check [customrombay.org](https://customrombay.org/)
- **Best For:** Users wanting reliable, feature-rich stock Android experience

#### crDroid - **Feature-Packed LineageOS Fork**
- **Focus:** Enhanced customization options based on LineageOS
- **Target Users:** Users wanting extensive customization features
- **Key Features:**
  - ✅ **Advanced Customization** - Extensive system tweaking options
  - ✅ **Performance Optimizations** - Speed and battery improvements
  - ✅ **Regular Updates** - Based on latest LineageOS builds
  - ✅ **StatusBar & QS Customization** - Deep interface modifications
- **Device Support:** Growing list based on LineageOS support
- **Best For:** Power users wanting maximum customization

#### Paranoid Android - **Unique Feature Innovation**
- **Focus:** Innovative features and smooth performance
- **Target Users:** Users wanting cutting-edge Android features
- **Key Features:**
  - ✅ **Paranoid Sense** - Advanced gesture controls
  - ✅ **Peak Refresh** - Intelligent refresh rate management
  - ✅ **Pocket Mode** - Accidental touch prevention
  - ✅ **Unique UI Elements** - Custom interface innovations
- **Device Support:** Limited but growing device list
- **Best For:** Users wanting innovative Android features

### Stock Android Experience

#### Pixel Experience - **Pure Google Pixel Experience**
- **Focus:** Authentic Google Pixel UI and features on non-Pixel devices
- **Target Users:** Users wanting genuine Pixel experience
- **Key Features:**
  - ✅ **Pixel UI** - Authentic Google Pixel interface
  - ✅ **Pixel Features** - Call screening, car crash detection, hold for me
  - ✅ **Google Integration** - Full Google services integration
  - ✅ **Monthly Updates** - Regular security and feature updates
- **Device Support:** Popular devices with official builds
- **Best For:** Users wanting authentic Pixel experience on non-Pixel devices

#### EvolutionX - **Pixel Experience with Customization**
- **Focus:** Pixel UI with additional customization options
- **Target Users:** Users wanting Pixel experience with more control
- **Key Features:**
  - ✅ **Pixel UI Base** - Google Pixel interface foundation
  - ✅ **Customization Options** - Additional theming and tweaking
  - ✅ **Performance Focus** - Optimizations for speed and battery
  - ✅ **Regular Updates** - Active development and updates
- **Device Support:** Growing list of supported devices
- **Best For:** Users wanting Pixel experience with customization freedom

## Complete Android-based OS Comparison

For a comprehensive comparison of Android-based operating systems including privacy, security, and feature analysis, see this detailed comparison:

🔗 **[Complete Android-based Operating Systems Comparison](https://eylenburg.github.io/android_comparison.htm)**

This resource provides in-depth analysis of:
- **Privacy Features** - Data collection, tracking prevention, degoogling levels
- **Security Measures** - Verified boot, hardening, update policies  
- **Feature Comparison** - Network controls, backup solutions, compatibility
- **Device Support** - Manufacturer compatibility and hardware requirements
- **Update Policies** - Security update speed and long-term support

### Key Insights from Comparison:
- **GrapheneOS** leads in security and privacy but supports only Pixel devices
- **LineageOS** offers widest device support with moderate privacy improvements
- **CalyxOS** balances privacy with app compatibility through microG
- **Stock Android** varies significantly between manufacturers for privacy/security

## Prerequisites

### Essential Requirements

#### ✅ Completed Prerequisite Steps
1. **[Unlocked Bootloader](./how-to-unlock-bootloader.md)** - Mandatory for all custom ROMs
2. **[Custom Recovery](./custom-recovery.md)** - TWRP, OrangeFox, or SKYHAWK installed
3. **ADB/Fastboot Tools** - Platform tools for device communication

#### 📱 Device Requirements
- **Sufficient Battery** - At least 70% charge recommended
- **Compatible Device** - ROM must officially support your device model
- **Stable Connection** - Reliable USB cable and computer connection
- **Storage Space** - At least 4GB free space on device and computer

#### 💾 Backup Requirements
- **Complete NANDroid Backup** - Full system backup via custom recovery
- **Important Data Backup** - Photos, contacts, apps, and personal files
- **Stock ROM Download** - Original firmware for potential restoration

### Pre-Installation Checklist

::: warning ⚠️ CRITICAL PREPARATIONS
Before proceeding with custom ROM installation:

- **🔄 COMPLETE BACKUP** - NANDroid backup via custom recovery
- **📱 VERIFY DEVICE MODEL** - Exact device codename and region
- **💾 DOWNLOAD STOCK ROM** - For emergency restoration if needed
- **🔋 CHARGE DEVICE** - Minimum 70% battery level
- **📶 STABLE CONNECTION** - Ensure reliable USB and internet connection
:::

## Universal Installation Steps

### Step 1: Preparation and Downloads

1. **Verify Device Compatibility**
   ```bash
   # Check device codename
   adb shell getprop ro.product.device
   ```

2. **Download Required Files**
   - Custom ROM zip file for your device
   - GApps package (if needed)
   - Any additional files (firmware, vendor images)

3. **Transfer Files to Device**
   - Copy ROM zip to device storage or SD card
   - Ensure files are accessible from recovery

### Step 2: Enter Custom Recovery

1. **Boot to Recovery Mode**
   ```bash
   # Via ADB
   adb reboot recovery
   
   # Or hardware buttons (device-specific)
   # Usually: Power + Volume Up
   ```

2. **Create NANDroid Backup**
   - Navigate to **Backup** in recovery
   - Select all partitions (System, Data, Boot, Recovery)
   - Name backup with date and current ROM info
   - **Wait for completion** - This may take 10-30 minutes

### Step 3: Wipe Device (Clean Install)

::: danger 🗑️ DATA LOSS WARNING
This step will erase all user data. Ensure backups are complete!
:::

1. **Navigate to Wipe Menu**
2. **Perform Factory Reset/Wipe**
   - Wipe Data/Factory Reset
   - Wipe Dalvik/ART Cache
   - Wipe Cache Partition
3. **Advanced Wipe (if needed)**
   - System partition (for clean install)
   - Internal Storage (only if necessary)

### Step 4: Flash Custom ROM

1. **Navigate to Install Menu**
2. **Select ROM File**
   - Browse to ROM zip file location
   - Select the ROM zip file
3. **Confirm Flash**
   - Review flash details
   - Swipe to confirm flash
   - **Wait for completion** - 5-15 minutes

### Step 5: Flash Additional Packages (Optional)

1. **GApps (Google Apps)**
   - Flash immediately after ROM
   - Choose appropriate GApps package size
   - Nano/Micro for minimal, Full for complete experience

2. **Magisk (for root)**
   - Flash Magisk zip for systemless root
   - Skip if you don't need root access

3. **Additional Mods**
   - Custom kernels
   - Audio enhancements
   - System modifications

### Step 6: First Boot

1. **Reboot System**
   - Navigate to Reboot > System
   - **First boot takes 5-15 minutes** - be patient!
   - Do not interrupt the boot process

2. **Initial Setup**
   - Complete Android setup wizard
   - Configure accounts and preferences
   - Install necessary apps

## ROM-Specific Installation Guides

### GrapheneOS Installation

**GrapheneOS** requires a specific installation method using their web installer:

#### Prerequisites
- **Supported Device:** Google Pixel devices only
- **Chrome/Chromium Browser:** Required for web installer
- **USB Debugging:** Enabled in developer options

#### Installation Process
1. **Visit Official Installer**
   - Go to [GrapheneOS Install Page](https://grapheneos.org/install/)
   - Use Chrome/Chromium browser with WebUSB support

2. **Connect Device**
   - Enable USB debugging
   - Connect device via USB
   - Allow USB debugging permissions

3. **Follow Web Installer**
   - Select your device model
   - Follow on-screen instructions
   - **Automatic process** - installer handles everything

4. **Complete Setup**
   - Device will reboot with GrapheneOS
   - Complete initial setup
   - Configure privacy settings

::: tip 💡 GrapheneOS Benefits
- **Maximum Security:** Hardened kernel and system components
- **Privacy First:** No Google services by default
- **Sandboxed Play Services:** Optional Google services in secure sandbox
- **Regular Updates:** Frequent security patches
:::

### LineageOS Installation

**LineageOS** follows standard custom recovery flashing method:

#### Finding LineageOS for Your Device
1. **Check Official Support**
   - Visit [LineageOS Downloads](https://download.lineageos.org/)
   - Search for your device model
   - Download latest build

2. **Alternative Sources**
   - [CustomROMBay.org](https://customrombay.org/) - Extensive device database
   - XDA Developers forums
   - Official device maintainer repositories

#### Installation Steps
1. **Download Required Files**
   - LineageOS ROM zip
   - Compatible GApps (optional)
   - Latest Magisk (if root needed)

2. **Follow Universal Steps**
   - Use [Universal Installation Steps](#universal-installation-steps)
   - Flash LineageOS zip
   - Flash GApps immediately after (if desired)
   - Flash Magisk (if root needed)

3. **First Boot Configuration**
   - Complete LineageOS setup wizard
   - Configure Privacy Guard settings
   - Enable LineageOS features

::: tip 💡 LineageOS Advantages
- **Widest Device Support:** 300+ supported devices
- **Long-term Updates:** Security updates beyond manufacturer EOL
- **Clean Experience:** Minimal bloatware, close to stock Android
- **Active Community:** Large developer and user community
:::

### Pixel Experience Installation

**Pixel Experience** brings authentic Google Pixel features to non-Pixel devices:

#### Installation Process
1. **Download Pixel Experience**
   - Visit [Pixel Experience Downloads](https://download.pixelexperience.org/)
   - Select your device
   - Choose Plus (with GApps) or Regular (without GApps)

2. **Flash ROM**
   - Follow [Universal Installation Steps](#universal-installation-steps)
   - Flash Pixel Experience zip
   - No need for separate GApps if using Plus version

3. **Setup Pixel Features**
   - Complete Google setup
   - Configure Pixel-exclusive features
   - Set up Digital Wellbeing and other Pixel services

::: tip 💡 Pixel Experience Features
- **Authentic Pixel UI:** Genuine Google Pixel interface
- **Pixel Features:** Call screening, car crash detection, hold for me
- **Google Integration:** Full Google services and features
- **Regular Updates:** Monthly security and feature updates
:::

## Finding ROMs for Your Device

### Official Sources

#### 1. CustomROMBay.org - **Comprehensive ROM Database**
🔗 **[CustomROMBay.org](https://customrombay.org/)**

- **811 Supported Devices** across all major manufacturers
- **Multiple ROM Options** for each device
- **Organized by Manufacturer** - Easy device search
- **Direct Download Links** - No complicated navigation
- **Update Status** - Shows latest available builds

**How to Use:**
1. Navigate to [CustomROMBay.org](https://customrombay.org/)
2. Find your device manufacturer (Samsung, Xiaomi, OnePlus, etc.)
3. Click on your specific device model
4. Browse available ROM options
5. Download ROMs with direct links

#### 2. XDA Developers Forums
- **Device-Specific Forums** - Detailed discussions and support
- **Developer Direct Releases** - Often first location for new ROMs
- **Community Support** - Troubleshooting and modifications
- **Beta/Experimental ROMs** - Cutting-edge development builds

#### 3. Official ROM Websites
- **LineageOS:** [download.lineageos.org](https://download.lineageos.org/)
- **GrapheneOS:** [grapheneos.org/releases](https://grapheneos.org/releases)
- **Pixel Experience:** [download.pixelexperience.org](https://download.pixelexperience.org/)
- **CalyxOS:** [calyxos.org/get](https://calyxos.org/get/)

### Device Compatibility Check

#### Before Downloading:
1. **Exact Device Model** - Match codename exactly (e.g., `vayu` for POCO X3 Pro)
2. **Region Variant** - Some devices have region-specific builds
3. **Android Version** - Ensure ROM supports your desired Android version
4. **Architecture** - Verify ARM64/ARM32 compatibility
5. **Bootloader Version** - Some ROMs require specific bootloader versions

#### Verification Steps:
```bash
# Check device codename
adb shell getprop ro.product.device

# Check architecture
adb shell getprop ro.product.cpu.abi

# Check Android version
adb shell getprop ro.build.version.release

# Check bootloader version
adb shell getprop ro.bootloader
```

## Post-Installation Setup

### Initial Configuration

#### 1. Essential Setup
- **Complete Setup Wizard** - Configure basic Android settings
- **Restore App Data** - Use backup solutions or manually reinstall apps
- **Configure Accounts** - Add Google/other accounts as needed
- **Network Settings** - Set up WiFi, mobile data, VPN

#### 2. Privacy & Security Configuration

**For Privacy-Focused ROMs (GrapheneOS, CalyxOS):**
- **Review Permissions** - Audit app permissions carefully
- **Configure Network Controls** - Set up firewall and network restrictions
- **Disable Telemetry** - Turn off any data collection settings
- **Set up Private DNS** - Configure DNS over HTTPS/TLS

**For Standard ROMs (LineageOS, Pixel Experience):**
- **Privacy Guard** - Configure app permission controls
- **Location Services** - Disable unnecessary location tracking
- **Google Services** - Review and limit Google service permissions
- **App Analytics** - Disable app usage analytics where possible

#### 3. Performance Optimization
- **Battery Optimization** - Configure adaptive battery settings
- **Background App Limits** - Restrict background app activity
- **Animation Scale** - Adjust animation speeds in developer options
- **Storage Management** - Set up automatic storage cleanup

### Recommended Apps Post-Installation

#### Essential Open Source Apps
- **F-Droid** - Open source app store
- **Aurora Store** - Google Play Store alternative
- **Shelter** - Work profile management for app isolation
- **NetGuard** - Firewall for network control
- **Seedvault** - Encrypted backup solution

#### Privacy Tools
- **Tor Browser** - Anonymous web browsing
- **Signal** - Secure messaging
- **ProtonMail** - Encrypted email
- **Bitwarden** - Password manager
- **DNSFilter** - DNS-based ad and tracker blocking

### Root Setup (Optional)

If you flashed Magisk during installation:

1. **Install Magisk Manager**
   - Download latest Magisk APK
   - Install and grant root permissions

2. **Configure Magisk**
   - Enable Zygisk for advanced modules
   - Configure DenyList for banking apps
   - Install essential modules

3. **Recommended Magisk Modules**
   - **LSPosed** - Xposed framework for system modifications
   - **AdAway** - System-wide ad blocking
   - **Viper4Android** - Audio enhancement
   - **Greenify** - Battery optimization

## Troubleshooting

### Common Issues and Solutions

#### Boot Issues

**Problem:** Device stuck on boot logo or bootloop
**Solutions:**
1. **Boot to Recovery** - Clear cache/dalvik cache
2. **Reflash ROM** - Wipe system and reflash ROM zip
3. **Check GApps Compatibility** - Ensure compatible GApps package
4. **Restore Backup** - Use NANDroid backup to restore working state

**Problem:** "System UI has stopped" errors
**Solutions:**
1. **Clear System UI Cache** - Apps > System UI > Storage > Clear Cache
2. **Wipe Cache Partition** - In recovery mode
3. **Check Theme Compatibility** - Disable custom themes
4. **Factory Reset** - Last resort if other methods fail

#### App Compatibility Issues

**Problem:** Banking apps not working
**Solutions:**
1. **Magisk Hide/DenyList** - Hide root from specific apps
2. **SafetyNet Fix** - Install SafetyNet fixing modules
3. **Use Work Profile** - Isolate banking apps in work profile
4. **Stock ROM Restoration** - Some apps require stock firmware

**Problem:** Google services not working
**Solutions:**
1. **Flash GApps** - Install compatible Google Apps package
2. **microG Setup** - Alternative to Google Play Services
3. **Signature Spoofing** - Enable in ROM settings if available
4. **Clear Google Services Data** - Reset Google Play Services

#### Performance Issues

**Problem:** Poor battery life
**Solutions:**
1. **Check Background Apps** - Limit background activity
2. **Disable Unused Features** - Turn off unnecessary system features
3. **Adjust Performance Profile** - Change CPU governor settings
4. **Install Custom Kernel** - Optimize power management

**Problem:** System lag or slow performance
**Solutions:**
1. **Clear Cache Partition** - Wipe system cache in recovery
2. **Reduce Animations** - Lower animation scales in developer options
3. **Free Up Storage** - Ensure sufficient free space (>15%)
4. **Check RAM Usage** - Close unnecessary background apps

### Recovery and Restoration

#### Complete System Recovery
1. **Boot to Recovery Mode**
2. **Restore NANDroid Backup**
   - Navigate to Restore in recovery
   - Select your backup
   - Choose all partitions to restore
   - Wait for completion (15-30 minutes)

#### Return to Stock ROM
1. **Download Stock Firmware**
   - Find official firmware for your device
   - Use manufacturer tools (Odin for Samsung, MiFlash for Xiaomi)
2. **Flash via Download Mode**
   - Boot to download/fastboot mode
   - Use manufacturer flashing tools
   - Follow device-specific instructions

## Advanced Topics

### Custom Kernel Installation

Custom kernels can enhance performance and add features:

#### Popular Kernels
- **ElementalX** - Performance and battery optimization
- **Franco Kernel** - Balanced performance and features
- **Sultanxda Kernel** - OnePlus-specific optimizations
- **Kirisakura** - Feature-rich with customization options

#### Installation Process
1. **Research Compatibility** - Ensure kernel works with your ROM
2. **Backup Current Kernel** - Create boot partition backup
3. **Flash Kernel Zip** - Install via custom recovery
4. **Configure Settings** - Use kernel manager apps for tweaking

### Security Considerations

#### Maintaining Security on Custom ROMs

**Regular Updates:**
- **Monitor ROM Development** - Stay updated with latest builds
- **Security Patch Levels** - Prioritize ROMs with recent security patches
- **Verify Downloads** - Check file hashes and digital signatures

**Root Security:**
- **Minimal Root Usage** - Only grant root when necessary
- **Module Security** - Only install trusted Magisk modules
- **Banking App Isolation** - Use work profiles for sensitive apps

**Privacy Protection:**
- **Network Monitoring** - Use firewall apps to monitor connections
- **App Permissions** - Regularly audit and restrict app permissions
- **Data Encryption** - Enable full device encryption
- **Backup Security** - Encrypt backups and store securely

## 🚀 What's Next?

**Congratulations!** You've successfully installed a custom ROM. Here's your roadmap:

### Advanced Modifications
1. **[⚡ Add Root Access](./index.md#root-solutions-comparison)** - Install Magisk, KernelSU, or APatch
2. **[🔧 Flash Custom Kernels](./index.md#advanced-framework-solutions)** - Optimize performance
3. **[📦 Install LSPosed Modules](./index.md#lsposed-framework)** - Deep system customization

### Resources & Support
- **[CustomROMBay.org](https://customrombay.org/)** - Find ROMs for 811 devices
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions to common issues
- **[💬 Join Community](../about.md#community--resources)** - Connect with fellow enthusiasts

**Need Help?** Visit XDA Developers forums for device-specific support.
