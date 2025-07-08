---
layout: doc
title: KernelSU Guide 2025 - Complete Installation & Management
description: "Complete KernelSU guide for 2025. Learn how to install KernelSU, manage kernel-based root, modules, and app profiles with step-by-step instructions."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/kernelsu-guide/
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: KernelSU Guide 2025 - Complete Installation & Management
  - - meta
    - property: og:description
      content: Master KernelSU with our comprehensive 2025 guide covering installation, kernel-based root management, modules, and app profiles.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/kernelsu-guide/
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: KernelSU Guide 2025 - Complete Installation & Management
  - - meta
    - name: twitter:description
      content: Complete guide to KernelSU installation, kernel-based root management, and advanced Android customization.
  - - meta
    - name: keywords
      content: kernelsu guide 2025, kernelsu installation, kernel root, kernelsu modules, app profiles, gki kernel, kernel based root, android root solution
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
      content: KernelSU
  - - meta
    - property: article:tag
      content: Kernel Root
  - - meta
    - property: article:tag
      content: Android Root
  - - meta
    - property: article:tag
      content: GKI Kernel
  - - meta
    - name: robots
      content: index, follow
---

# KernelSU Guide 2025

**Complete KernelSU installation and management guide** - The modern kernel-based root solution offering enhanced security, better hiding capabilities, and advanced app profile management.

## Table of Contents
- [What is KernelSU?](#what-is-kernelsu)
- [KernelSU vs Magisk](#kernelsu-vs-magisk)
- [Requirements](#requirements)
- [Installation Methods](#installation-methods)
- [First Time Setup](#first-time-setup)
- [KernelSU Manager](#kernelsu-manager)
- [App Profiles](#app-profiles)
- [Module System](#module-system)
- [Advanced Features](#advanced-features)
- [Troubleshooting](#troubleshooting)
- [Uninstallation](#uninstallation)

## What is KernelSU?

**KernelSU** is a kernel-based root solution for Android that operates at the kernel level, providing more granular control over root access and better security than traditional userspace root solutions.

**Key Innovation:** By running in kernel space, KernelSU can provide more reliable root hiding, better security controls, and finer app permission management through its App Profile system.

::: tip 🚀 Quick Start
**Have a GKI-compatible device?** Jump to [Installation Methods](#installation-methods) to get started with KernelSU immediately.
:::

### **Core Architecture**
- **Kernel-level operation** - Runs in Linux kernel space
- **GKI compatibility** - Works with Generic Kernel Image
- **OverlayFS modules** - Systemless modifications
- **App Profiles** - Fine-grained permission control

### **Why KernelSU?**
- **Better hiding** - Kernel-level root is harder to detect
- **Enhanced security** - App Profile system provides granular control
- **Performance** - Lower overhead than userspace solutions
- **Modern design** - Built for Android 12+ and GKI kernels

## KernelSU vs Magisk

### 📊 **Detailed Comparison**

| Feature | KernelSU | Magisk |
|---------|----------|---------|
| **Root Method** | Kernel-based | Userspace |
| **Android Support** | 12+ (GKI 5.10+) | 6.0+ |
| **Architecture** | arm64-v8a, x86_64 | arm64-v8a, x86_64, arm32 |
| **Installation** | Boot image or kernel | Boot image |
| **Module System** | OverlayFS | Mount namespace |
| **Root Hiding** | Kernel-level | Userspace DenyList |
| **App Control** | App Profiles | Basic permissions |
| **SafetyNet** | Better passing rate | Good with modules |
| **Performance** | Lower overhead | Standard |
| **Learning Curve** | Moderate | Easy |

### 🎯 **Choose KernelSU If:**
- You have a GKI 2.0 compatible device (Android 12+)
- You want better root hiding capabilities
- You need fine-grained app permission control
- You prefer kernel-level security
- You use banking/finance apps frequently

### 🎯 **Choose Magisk If:**
- You have an older Android device (< Android 12)
- You want a larger module ecosystem
- You prefer simpler setup and management
- You need broader device compatibility

## Requirements

### 📋 **Essential Prerequisites**
- ✅ **Android 12+ with GKI 2.0** - Kernel 5.10 or newer
- ✅ **Compatible architecture** - arm64-v8a or x86_64 only
- ✅ **Unlocked bootloader** - [Bootloader unlock guide](./how-to-unlock-bootloader.md)
- ✅ **ADB/Fastboot tools** - [Platform Tools](https://developer.android.com/studio/releases/platform-tools)
- ✅ **Stock boot image** - Original boot.img for your firmware

### 🔍 **Compatibility Check**

#### **Check GKI Compatibility**
```bash
# Check kernel version
adb shell uname -r
# Should show 5.10+ for GKI 2.0

# Check GKI version
adb shell cat /proc/version
# Look for "GKI" in kernel string

# Alternative method
adb shell getprop ro.kernel.version
```

#### **Supported Devices**
- Download KernelSU manager from [GitHub Releases](https://github.com/tiann/KernelSU/releases) and install it on your device:
    - If the app shows `Unsupported`, it means that **you should compile the kernel yourself**, KernelSU won't and never provide a boot.img file for you to flash.
    - If the app shows `Not installed`, then your device is **officially supported** by KernelSU.

::: tip Check Official documentation
https://kernelsu.org/guide/installation.html#check-if-your-device-is-supported
:::

### 💾 **Required Downloads**
- **[KernelSU Manager APK](https://github.com/tiann/KernelSU/releases/latest)** (Latest: v1.0.5)
- **Stock firmware** with matching boot.img
- **Custom kernel** with KernelSU support (if available)

## Installation Methods

### Method 1: Pre-built Kernel Installation (Recommended)

**Best for:** Users with officially supported devices

#### **Check Official Support**
1. **Visit [KernelSU Device List](https://kernelsu.org/guide/installation.html)**
2. **Find your device** in supported list
3. **Download pre-built kernel** for your device model

#### **Installation Steps**
```bash
# Download device-specific kernel with KernelSU
# Example for Pixel 7:
wget https://github.com/tiann/KernelSU/releases/download/v1.0.5/kernel-pixel7-v1.0.5.img

# Boot to fastboot mode
adb reboot bootloader

# Flash KernelSU kernel
fastboot flash boot kernel-pixel7-v1.0.5.img

# Reboot device
fastboot reboot

# Install KernelSU Manager APK
adb install KernelSU_v1.0.5.apk
```

### Method 2: Boot Image Patching

**Best for:** Devices without pre-built kernels

#### **Step 1: Extract Stock Boot Image**
```bash
# Method 1: From stock firmware
unzip stock_firmware.zip boot.img

# Method 2: From device (requires temporary root)
adb shell su -c "dd if=/dev/block/bootdevice/by-name/boot of=/sdcard/boot.img"
adb pull /sdcard/boot.img
```

#### **Step 2: Install KernelSU Manager**
1. **Download KernelSU Manager APK**
2. **Install on device** - `adb install KernelSU_v1.0.5.apk`
3. **Open app** - May show "Not Installed" status

#### **Step 3: Patch Boot Image**
1. **KernelSU Manager** → **Install**
2. **Select boot.img** you extracted
3. **Patch image** - Creates kernelsu_patched_[random].img
4. **Download patched image** to computer

#### **Step 4: Flash Patched Boot**
```bash
# Boot to fastboot
adb reboot bootloader

# Flash patched boot image
fastboot flash boot kernelsu_patched_[random].img

# Reboot device
fastboot reboot
```

### Method 3: Custom Kernel with KernelSU

**Best for:** Advanced users, custom ROM users

#### **Kernel Sources with KernelSU**
- **[Proton Kernel](https://github.com/ProtonAOSP/android_kernel_google_gs101)** - Pixel devices
- **[Sultan Kernel](https://github.com/kerneltoast/android_kernel_oneplus_sm8350)** - OnePlus devices
- **[ArrowOS Kernel](https://github.com/ArrowOS-Devices)** - Various devices

#### **Installation Process**
1. **Download custom kernel** with KernelSU support
2. **Flash via recovery** or fastboot
3. **Install KernelSU Manager**
4. **Verify installation**

### Method 4: Building Custom Kernel

**For developers and unsupported devices**

#### **Build Environment Setup**
```bash
# Clone KernelSU source
git clone https://github.com/tiann/KernelSU.git

# Integrate with kernel source
cd your_kernel_source
git subtree add --prefix=kernelsu https://github.com/tiann/KernelSU.git main
```

#### **Kernel Configuration**
```bash
# Add to kernel config
CONFIG_KSU=y
CONFIG_KSU_DEBUG=y

# Build kernel with KernelSU
make -j$(nproc)
```

## First Time Setup

### 🎯 **Initial Configuration**

#### **1. Verify Installation**
After successful boot:
```bash
# Check KernelSU status
adb shell su -c "ksud version"
# Should show KernelSU version

# Alternative check via app
# KernelSU Manager should show "Installed" status
```

#### **2. Basic Setup**
1. **Open KernelSU Manager**
2. **Grant permissions** when prompted
3. **Check status** - Should show:
   - ✅ KernelSU Installed
   - ✅ Version information
   - ✅ Root access available

#### **3. Initial Configuration**
- **Update channel** - Stable recommended for daily use
- **Notification settings** - Configure manager notifications
- **Security settings** - Set up authentication if desired

### 🔐 **Root Permission Setup**

#### **Understanding KernelSU Root**
Unlike traditional root, KernelSU provides:
- **Kernel-level root** - More secure and harder to detect
- **App Profiles** - Granular permission control per app
- **Better hiding** - Root access invisible to most detection methods

#### **First Root Grant**
1. **App requests root** - Similar to other root solutions
2. **KernelSU prompt** appears with app information
3. **Choose permission level:**
   - **Grant** - Full root access
   - **Deny** - Refuse root access
   - **App Profile** - Custom permission set

## KernelSU Manager

### 🏠 **Interface Overview**

#### **Main Sections**
- **Status** - Installation status and device info
- **Superuser** - Root permission management
- **Modules** - Module installation and management
- **App Profiles** - Advanced app permission control

### 📊 **Status Tab**

#### **System Information**
- **KernelSU version** - Installed kernel version
- **Kernel version** - Linux kernel information
- **Safe mode** - Current boot status
- **Manager version** - App version information

#### **Device Details**
- **Android version** - OS version and security patch
- **Architecture** - CPU architecture (arm64/x86_64)
- **SELinux status** - Security policy enforcement

### 👥 **Superuser Management**

#### **Root Access Control**
```bash
# View granted apps
ksud list

# Grant root to specific app
ksud allow <package_name>

# Revoke root access
ksud deny <package_name>
```

#### **App Management**
- **Permission history** - See which apps used root
- **Access logs** - Detailed command history
- **Automatic decisions** - Set default responses for trusted apps

### ⚙️ **Settings Configuration**

#### **Security Settings**
- **Require authentication** - Biometric/PIN for manager access
- **Hide manager icon** - Prevent app detection
- **Safe mode trigger** - Volume key combinations

#### **Advanced Options**
- **Kernel logging** - Debug information collection
- **Module debugging** - Enhanced module error reporting
- **Performance monitoring** - Resource usage tracking

## App Profiles

### 🎯 **Advanced Permission Control**

**App Profiles** are KernelSU's unique feature that allows fine-grained control over what each app can access, even with root permissions.

#### **Profile Concepts**
- **Default Profile** - Standard root access
- **Custom Profiles** - Tailored permission sets
- **Sandbox Mode** - Isolated execution environment
- **Permission Inheritance** - Parent-child app relationships

### 📱 **Creating App Profiles**

#### **Step-by-Step Profile Creation**
1. **KernelSU Manager** → **App Profiles**
2. **Select target app** from list
3. **Create new profile** or modify existing
4. **Configure permissions:**

```yaml
Root Access: ON/OFF           # Basic root permission
File System Access:
  - /system: Read Only         # System partition access
  - /data: Read/Write         # Data partition access
  - /sdcard: Full Access      # Storage access
Network Access: Controlled    # Network permission level
Device Access:
  - Camera: Denied            # Hardware access control
  - Microphone: Allowed       # Audio device access
  - Location: Restricted      # GPS access level
```

#### **Advanced Profile Options**
- **UID/GID control** - User and group ID management
- **SELinux context** - Security context assignment
- **Capabilities** - Linux capability restrictions
- **Resource limits** - CPU, memory, and I/O limits

### 🛡️ **Security Profiles**

#### **Banking App Profile**
Secure profile for financial applications:
```yaml
Profile Name: "Banking Secure"
Root Access: DENIED
Network: Banking domains only
File System: Restricted to app data
Hardware: No camera, no microphone
Logging: Enhanced monitoring
```

#### **Development App Profile**
Profile for debugging and development tools:
```yaml
Profile Name: "Developer Tools"
Root Access: FULL
File System: Read/Write system
Network: Unrestricted
ADB Access: Allowed
Debugging: Full access
```

#### **Gaming App Profile**
Optimized profile for mobile games:
```yaml
Profile Name: "Gaming Optimized"
Root Access: DENIED
Performance: High priority
Graphics: Unrestricted GPU
Network: Game servers only
Anti-cheat: Bypass protection
```

### 📋 **Profile Templates**

#### **Pre-configured Templates**
KernelSU includes several profile templates:

- **🏦 Banking** - Maximum security, minimal access
- **🎮 Gaming** - Performance optimized, restricted access
- **🛠️ Development** - Full access for debugging tools
- **🔒 Privacy** - Enhanced privacy protection
- **⚡ Performance** - Resource optimization focus

#### **Custom Template Creation**
```bash
# Export existing profile as template
ksud profile export com.example.app > my_template.json

# Apply template to new app
ksud profile import com.target.app < my_template.json
```

## Module System

### 📦 **KernelSU Modules**

KernelSU uses **OverlayFS** for modules, providing a more efficient and stable modification system compared to traditional mount-based approaches.

#### **Module Architecture**
```
module_structure/
├── META-INF/               # Installation metadata
├── module.prop            # Module properties
├── post-fs-data.sh        # Early boot script
├── service.sh             # Late boot script
├── system/                # System overlay files
├── vendor/                # Vendor overlay files
└── webroot/               # Web UI files (optional)
```

### 🔥 **Compatible Modules**

#### **KernelSU-Specific Modules**
- **[KSU WebUI](https://github.com/tiann/KernelSU-WebUI)** - Web-based management interface
- **[KSU Hide](https://github.com/JingMatrix/KSU-Hide)** - Advanced root hiding
- **[KSU Profiles](https://github.com/symbuzzer/KSU-Profiles)** - Extended profile management

#### **Magisk Module Compatibility**
Many Magisk modules work with KernelSU:
- **✅ System overlay modules** - Font changes, audio mods
- **✅ Simple modification modules** - Build.prop tweaks
- **❌ Zygisk-dependent modules** - Require Magisk's Zygisk
- **❌ Complex injection modules** - May need adaptation

### 📥 **Module Installation**

#### **Method 1: KernelSU Manager**
1. **Download module ZIP** from trusted source
2. **KernelSU Manager** → **Modules**
3. **Install from storage** → Select ZIP
4. **Reboot device** to activate

#### **Method 2: Command Line**
```bash
# Install module via command line
ksud module install /path/to/module.zip

# List installed modules
ksud module list

# Enable/disable module
ksud module enable module_id
ksud module disable module_id

# Remove module
ksud module remove module_id
```

#### **Method 3: Web Interface**
If KSU WebUI is installed:
1. **Open browser** → `http://localhost:12346`
2. **Navigate to Modules** section
3. **Upload and install** module files
4. **Manage** modules through web interface

### 🛠️ **Module Development**

#### **Basic Module Template**
```bash
# module.prop
id=my_kernelsu_module
name=My KernelSU Module
version=v1.0
versionCode=1
author=MyName
description=Module description
updateJson=https://example.com/update.json
```

#### **Installation Script**
```bash
#!/system/bin/sh
# post-fs-data.sh

# Module initialization code
MODDIR=${0%/*}

# Copy files to system overlay
cp -rf $MODDIR/system/* /

# Set permissions
chmod 644 /system/lib/libnative.so
```

#### **Advanced Features**
```bash
# service.sh - Late boot service
#!/system/bin/sh

# Wait for system fully loaded
while [ "$(getprop sys.boot_completed)" != "1" ]; do
    sleep 1
done

# Start module services
start my_module_service
```

## Advanced Features

### 🌐 **Web Interface**

#### **KSU WebUI Setup**
1. **Install KSU WebUI module**
2. **Enable web server** in KernelSU settings
3. **Access interface** at `http://localhost:12346`

#### **Web Interface Features**
- **Dashboard** - System status and statistics
- **Module management** - Install, configure, remove modules
- **App profile editor** - Visual profile creation
- **Log viewer** - Real-time system logs
- **File manager** - System file browsing

### 📊 **Monitoring & Logging**

#### **System Monitoring**
```bash
# Monitor KernelSU activity
ksud log --tail

# Check module status
ksud module status

# View app profile activity
ksud profile log
```

#### **Performance Metrics**
- **Resource usage** - CPU, memory, I/O monitoring
- **Boot time analysis** - Module impact on boot speed
- **Security events** - Root access attempts and blocks

### 🔧 **Advanced Configuration**

#### **Kernel Parameters**
```bash
# Customize KernelSU behavior
echo "ksu.strict_mode=1" > /sys/kernel/ksu/config
echo "ksu.log_level=2" > /sys/kernel/ksu/log_level
```

#### **Security Hardening**
```bash
# Enable enhanced security features
ksud security --enable-strict-mode
ksud security --require-signature
ksud security --audit-all-access
```

## Troubleshooting

### 🚨 **Common Issues**

#### **KernelSU Not Working After Installation**
**Symptoms:** Manager shows "Not Installed"
```bash
# Diagnostic steps:
1. Check kernel compatibility: uname -r
2. Verify GKI support: cat /proc/version | grep GKI
3. Check boot image integrity
4. Try different installation method
```

#### **Apps Can't Get Root Access**
**Symptoms:** Root requests denied or not appearing
```bash
# Solutions:
1. Check app profile settings
2. Verify KernelSU daemon status: ksud status
3. Clear app data and retry
4. Check selinux status: getenforce
```

#### **Modules Not Loading**
**Symptoms:** Installed modules have no effect
```bash
# Troubleshooting:
1. Check module compatibility with KernelSU
2. Verify module installation: ksud module list
3. Check module logs: ksud module log module_id
4. Try installing via different method
```

#### **Boot Loop After Installation**
**Symptoms:** Device stuck in boot animation
```bash
# Recovery methods:
1. Boot to fastboot: fastboot flash boot stock_boot.img
2. Use emergency mode: Volume Up + Power during boot
3. Flash stock firmware if necessary
4. Check kernel compatibility before reinstalling
```

### 🔧 **Advanced Debugging**

#### **Kernel Log Analysis**
```bash
# View kernel messages
dmesg | grep ksu

# Check kernel module status
cat /proc/modules | grep kernelsu

# Monitor kernel events
cat /proc/kmsg | grep ksu
```

#### **App Profile Debugging**
```bash
# Debug app profile issues
ksud profile debug com.example.app

# Test profile permissions
ksud profile test com.example.app

# Export profile for analysis
ksud profile export com.example.app
```

#### **Module Debugging**
```bash
# Enable module debug mode
ksud module debug enable

# Check module dependencies
ksud module deps module_id

# Verify module integrity
ksud module verify module_id
```

### 📱 **Device-Specific Issues**

#### **Samsung Devices**
- **Knox triggered** - Some Samsung devices detect KernelSU
- **Solutions:** Use specific Samsung-compatible kernels
- **Alternative:** Flash custom ROM first

#### **Xiaomi Devices**
- **Anti-rollback protection** - May prevent kernel flashing
- **Solutions:** Ensure kernel version matches or is newer
- **Alternative:** Use MIUI-compatible builds

#### **OnePlus Devices**
- **OxygenOS detection** - Some versions detect root
- **Solutions:** Use OxygenOS-specific kernels
- **Alternative:** Flash custom ROM

## Uninstallation

### 🗑️ **Complete Removal**

#### **Method 1: Flash Stock Boot**
```bash
# Most reliable method
fastboot flash boot stock_boot.img
fastboot reboot

# Verify removal
# KernelSU Manager should show "Not Installed"
```

#### **Method 2: Kernel Removal**
```bash
# If using custom kernel with KernelSU
# Flash stock kernel or kernel without KernelSU
fastboot flash boot stock_kernel.img
fastboot reboot
```

#### **Method 3: Firmware Restore**
```bash
# Complete firmware flash (nuclear option)
# Flash complete stock firmware
# This will remove everything including data
```

### 🧹 **Clean App Data**
```bash
# Remove KernelSU app data
adb shell pm uninstall com.ksu.kernelsu

# Clear any remaining data
adb shell rm -rf /data/data/com.ksu.kernelsu
```

### 📋 **Verification**
After uninstallation:
- ✅ No KernelSU in installed apps
- ✅ No root access available
- ✅ Banking apps work normally
- ✅ SafetyNet passes (if was issue)

::: tip 💡 Pro Tips
- **Start conservative** - Begin with minimal app profiles
- **Test thoroughly** - Verify each profile before deployment
- **Keep backups** - Always backup working boot images
- **Stay updated** - Follow KernelSU development for updates
- **Join community** - KernelSU Telegram for support and tips
- **Document changes** - Keep track of profiles and modules
- **Monitor performance** - Watch for resource usage impacts
:::

## Next Steps

🎯 **Optimize Your Setup:**
- **[App Profile Templates](https://kernelsu.org/guide/app-profile.html)** - Pre-configured security profiles
- **[Compatible Modules](../android-root-apps/)** - KernelSU-compatible modifications
- **[Security Hardening](./index.md)** - Advanced security configurations
- **[Performance Tuning](./magisk-guide.md)** - System optimization techniques

---

**Need help?** Join the [KernelSU Telegram community](https://t.me/KernelSU) or check our [FAQ section](../faqs.md) for common questions and solutions.