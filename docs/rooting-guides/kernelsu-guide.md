---
layout: doc
title: Complete KernelSU Root Guide
description: "Master KernelSU rooting - the kernel-based root solution. Comprehensive guide covering installation, modules, and advanced kernel management."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/rooting-guides/kernelsu-guide
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete KernelSU Root Guide - Kernel-Based Android Rooting
  - - meta
    - property: og:description
      content: Install KernelSU root with our comprehensive guide. Kernel-based rooting solution with advanced module system and app profiles.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/rooting-guides/kernelsu-guide
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/kernelsu-guide.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete KernelSU Root Guide
  - - meta
    - name: twitter:description
      content: Kernel-based Android rooting with KernelSU. Advanced module support and app profile management.
  - - meta
    - name: keywords
      content: kernelsu root guide, kernel-based root, kernelsu installation, gki kernel, lkm mode, android rooting, app profiles
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Rooting
  - - meta
    - property: article:tag
      content: KernelSU
  - - meta
    - property: article:tag
      content: Kernel Root
  - - meta
    - property: article:tag
      content: Android Rooting
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: article:published_time
      content: 2025-01-12T00:00:00Z
  - - meta
    - property: article:modified_time
      content: 2025-12-26T00:00:00Z
  - - meta
    - property: article:tag
      content: KernelSU
  - - meta
    - property: article:tag
      content: KernelSU Next
  - - meta
    - property: article:tag
      content: Android Root
  - - meta
    - property: article:tag
      content: Kernel Root
  - - meta
    - property: article:tag
      content: GKI Kernel
  - - meta
    - property: article:tag
      content: Android Rooting
  - - meta
    - property: article:tag
      content: Root Management
  - - meta
    - property: article:tag
      content: Android Customization
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:site
      content: "@awsm_and_root"
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: "KernelSU Guide 2026 | Awesome Android Root"
  - - meta
    - name: twitter:description
      content: "Ultimate KernelSU guide for 2026! Learn to install KernelSU & KernelSU Next, manage kernel-based root, modules, app profiles. Step-by-step tutorial for Android 4.4+ devices."
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.org/images/og/kernelsu-guide.png
  - - meta
    - name: twitter:image:alt
      content: KernelSU Guide 2026 - Complete Installation Tutorial
  - - link
    - rel: dns-prefetch
      href: https://github.com
  - - link
    - rel: dns-prefetch
      href: https://kernelsu.org
  - - link
    - rel: dns-prefetch
      href: https://kernelsu-next.github.io
  - - script
    - type: application/ld+json
    - |
        {
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "KernelSU Guide 2026 | Awesome Android Root",
          "description": "Ultimate KernelSU guide for 2026! Learn to install KernelSU & KernelSU Next, manage kernel-based root, modules, app profiles. Step-by-step tutorial for Android 4.4+ devices.",
          "image": "https://awesome-android-root.org/images/og/kernelsu-guide.png",
          "author": {
            "@type": "Organization",
            "name": "Awesome Android Root Project",
            "url": "https://awesome-android-root.org"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Awesome Android Root",
            "logo": {
              "@type": "ImageObject",
              "url": "https://awesome-android-root.org/images/logo.png"
            }
          },
          "datePublished": "2025-01-12",
          "dateModified": "2025-12-26",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://awesome-android-root.org/rooting-guides/kernelsu-guide"
          },
          "about": [
            {
              "@type": "Thing",
              "name": "KernelSU",
              "description": "Kernel-based root solution for Android devices"
            },
            {
              "@type": "Thing",
              "name": "KernelSU Next",
              "description": "Community fork of KernelSU with enhanced features"
            },
            {
              "@type": "Thing",
              "name": "Android Rooting",
              "description": "Process of gaining root access on Android devices"
            }
          ],
          "keywords": [
            "kernelsu guide 2026",
            "kernelsu installation",
            "kernelsu next",
            "kernel root android",
            "kernelsu modules",
            "app profiles",
            "gki kernel",
            "android root solution",
            "kernelsu vs magisk",
            "kernelsu tutorial"
          ],
          "articleSection": "Android Rooting Guides",
          "inLanguage": "en-US",
          "isAccessibleForFree": true,
          "copyrightYear": 2026,
          "copyrightHolder": {
            "@type": "Organization",
            "name": "Awesome Android Root Project"
          }
        }
---

# KernelSU Root Installation Guide

Kernel-based root solution for Android. Install KernelSU for advanced security, granular app control, and superior root hiding.

## Quick Navigation

- [What is KernelSU](#understanding-kernelsu)
- [Installation Modes](#installation-modes)
- [Prerequisites](#prerequisites)
- [Installation Guide](#installation-methods)
- [App Profiles](#app-profile-system)
- [Module Management](#managing-modules)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Complete rooting overview
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Required first step
- [Root Comparison](./root-framework-comparison.md) - Compare with Magisk and APatch
- [Troubleshooting Guide](#troubleshooting) - Common issues and fixes
- [FAQ](../faqs.md) - Common questions

---

## Understanding KernelSU

KernelSU is a kernel-based root solution that operates at the Linux kernel level, providing enhanced security and advanced app permission control compared to traditional userspace root methods.

### Core Features

- **Kernel-Level Integration** - Direct kernel modification for enhanced security
- **Advanced App Profiles** - Granular root permission control per application
- **Superior Hiding** - Better detection evasion than traditional methods
- **GKI Compatibility** - Optimized for Generic Kernel Image devices
- **LKM Support** - Loadable Kernel Module architecture
### KernelSU vs Alternatives

| Feature | KernelSU | Magisk | APatch |
|---------|----------|---------|--------|
| Architecture | Kernel-based | Userspace overlay | Kernel-based |
| Android Support | 11+ (GKI 2.0+) | 6.0+ | 9+ |
| Root Hiding | Excellent | Good | Excellent |
| App Control | Advanced Profiles | Basic | Basic |
| Module System | Growing ([300+](../apps-and-modules/)) | Mature (1000+) | Limited (50+) |
| Ease of Use | Moderate | Easy | Moderate |
| Custom Kernel | Optional | Not needed | Not needed |

**Choose KernelSU if:**
- You have Android 11+ device
- You want best root hiding
- You need fine-grained app control
- You use banking/payment apps (see [root hiding apps](../apps-and-modules/#root-hiding-and-play-integrity))
- You prefer kernel-level security

> [!NOTE]
> For easier installation on any Android version, consider [Magisk](./magisk-guide.md) instead

> [!TIP]
> Detailed comaprison with other root solutions: [Root Comparison](./root-framework-comparison.md)


---

## Installation Modes

KernelSU supports two installation modes on GKI devices.

### GKI Mode

**How it works:** Replaces device's original kernel with KernelSU Generic Kernel Image.

**Advantages:**
- Universal GKI device compatibility
- Works on Samsung Knox devices
- Independent of firmware updates
- Better for heavily modified devices

**Disadvantages:**
- Loses manufacturer kernel optimizations
- Requires manual fastboot flashing
- Must reflash after major updates

**Best for:** Samsung devices, emulators, WSA, custom ROMs

### LKM Mode (Loadable Kernel Module)

**How it works:** Loads KernelSU as kernel module without replacing kernel.

**Advantages:**
- Preserves original kernel and optimizations
- Easy in-app updates
- OTA-friendly (install to inactive slot)
- No AVB/dm-verity issues
- Can disable without reboot

**Disadvantages:**
- Requires official firmware
- May not work on all devices
- Less compatible with modified firmwares

**Best for:** Most modern phones with stock/near-stock firmware

### Which Mode to Choose?

| Device Type | Recommended Mode | Reason |
|-------------|------------------|--------|
| Stock firmware phones | LKM | Preserves optimizations, easy updates |
| Samsung devices ([guide](./how-to-root-samsung-phone.md)) | GKI | Knox compatibility |
| Custom ROMs | GKI | Better modified firmware support |
| Emulators/WSA | GKI | Universal compatibility |
| Heavily modified | GKI | More reliable |

---

## Prerequisites

### Critical Requirements

::: danger ESSENTIAL PREREQUISITES
**Unlocked Bootloader** - KernelSU requires unlocked bootloader. Complete [bootloader unlocking](./how-to-unlock-bootloader.md) first.

**GKI Compatible Device** - Android 11+ with GKI 2.0 kernel (5.10+) required.

**Complete Backup** - Backup all important data before proceeding.

**Battery 50%+** - Ensure sufficient battery to prevent interruption.
:::

### Hardware Requirements

- Android device with unlocked bootloader
- Android 11+ with GKI 2.0 (kernel 5.10+)
- 50% or higher battery charge
- Quality USB cable (data-capable)
- Computer (Windows, macOS, or Linux)

### Software Requirements

**On Computer:**
- [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) (ADB/Fastboot)
- Device-specific USB drivers (Windows only)
- Stock firmware for your device

**On Device:**
- Latest KernelSU Manager APK from [GitHub](https://github.com/tiann/KernelSU/releases)
- File manager app
- At least 500MB free storage

### Compatibility Check

**Verify GKI Compatibility:**

```bash
# Check kernel version
adb shell uname -r
# Should show 5.10 or higher

# Check for GKI support
adb shell cat /proc/version
# Look for "GKI" in output
```

**Android Version Support:**

| Android Version | Kernel Version | KernelSU Support |
|-----------------|----------------|------------------|
| Android 15 | 6.6+ | Full support |
| Android 14 | 6.1, 5.15 | Full support |
| Android 13 | 5.15, 5.10 | Full support |
| Android 12 | 5.10, 5.4 | Full support (GKI 2.0) |
| Android 11 | 5.4, 4.19 | Partial support |
| Android 10 and older | Various | Not supported |

**Check Device Compatibility:**

1. Download KernelSU Manager APK
2. Install on device
3. Open app and check status:
   - "Not Installed" = Supported, proceed with install
   - "Unsupported" = Custom kernel compilation required

---

## Installation Methods

Four installation methods available. Choose based on your device and needs.

### Method 1: Pre-Built GKI Kernel (Easiest)

**Best for:** Users with officially supported devices

**Step 1: Check Supported Devices**

Visit [KernelSU Device List](https://kernelsu.org/guide/installation.html) to see if your device has pre-built kernel.

**Step 2: Download Pre-Built Kernel**

1. Visit [KernelSU Releases](https://github.com/tiann/KernelSU/releases/latest)
2. Download GKI kernel for your Android version
3. Example: `kernel-android13-5.15-2026.01.img`

**Step 3: Flash Kernel**

```bash
# Transfer kernel to computer
# Boot to fastboot
adb reboot bootloader

# Verify fastboot connection
fastboot devices

# Flash KernelSU kernel
fastboot flash boot kernel-android13-5.15-2026.01.img

# Reboot device
fastboot reboot
```

**Step 4: Install Manager**

1. Download KernelSU Manager APK
2. Install on device
3. Open app to verify installation

**Expected result:** App shows "Installed" with version number.

---

### Method 2: Boot Image Patching (LKM Mode)

**Best for:** Devices without pre-built kernels, LKM mode preference

**Step 1: Extract Stock Boot Image**

**From Stock Firmware:**
```bash
# Extract boot.img from firmware ZIP
unzip stock_firmware.zip boot.img
```

**From Device (requires temporary root):**
```bash
adb shell su -c "dd if=/dev/block/by-name/boot of=/sdcard/boot.img"
adb pull /sdcard/boot.img
```

**Step 2: Install Manager and Patch**

1. Install KernelSU Manager APK on device
2. Transfer boot.img to device Downloads folder
3. Open KernelSU Manager
4. Tap "Install"
5. Select "Select and Patch a File"
6. Choose boot.img
7. Wait for patching

**Output file:** `kernelsu_patched_[random].img` in Downloads

**Step 3: Flash Patched Boot**

```bash
# Transfer to computer
adb pull /sdcard/Download/kernelsu_patched_xxxxx.img

# Boot to fastboot
adb reboot bootloader

# Flash patched image
fastboot flash boot kernelsu_patched_xxxxx.img

# Reboot device
fastboot reboot
```

**Step 4: Verify Installation**

1. First boot may take 2-5 minutes
2. Open KernelSU Manager
3. Should show:
   - KernelSU: Installed (version)
   - Mode: LKM or GKI

::: tip LKM MODE BENEFITS
LKM mode preserves manufacturer kernel optimizations and supports in-app updates.
:::

---

### Method 3: Custom Kernel Installation

**Best for:** Devices with custom kernel support, advanced users

**Step 1: Find Custom Kernel**

Search for device-specific kernels with KernelSU support:
- XDA Developers forums
- Telegram kernel groups
- GitHub repositories

**Popular kernels with KernelSU:**
- Sultan Kernel (OnePlus)
- Kirisakura Kernel (multiple devices)
- Device-specific kernels

**Step 2: Download and Flash**

```bash
# Download custom kernel ZIP or IMG
# If IMG file:
adb reboot bootloader
fastboot flash boot custom_kernel_kernelsu.img
fastboot reboot

# If ZIP file (requires custom recovery):
# Boot to TWRP/OrangeFox
# Install ZIP from storage
# Reboot system
```

**Step 3: Install Manager**

1. Install KernelSU Manager APK
2. Verify installation successful

---

### Method 4: Build Custom Kernel (Advanced)

**Best for:** Developers, unsupported devices

**Step 1: Setup Build Environment**

```bash
# Install required packages (Ubuntu/Debian)
sudo apt update
sudo apt install -y git build-essential bc bison flex libssl-dev

# Clone your device's kernel source
git clone https://github.com/yourdevice/kernel_source.git
cd kernel_source
```

**Step 2: Integrate KernelSU**

```bash
# Use official integration script
curl -LSs "https://raw.githubusercontent.com/tiann/KernelSU/main/kernel/setup.sh" | bash -

# Or manual integration
cd kernel_source
git clone https://github.com/tiann/KernelSU.git KernelSU
```

**Step 3: Configure Kernel**

Add to kernel config file:
```bash
CONFIG_KSU=y
CONFIG_KSU_DEBUG=n
```

**Step 4: Build Kernel**

```bash
# Export architecture
export ARCH=arm64
export SUBARCH=arm64

# Build
make clean
make mrproper
make defconfig
make -j$(nproc)
```

**Step 5: Flash and Test**

```bash
# Flash built kernel
fastboot flash boot out/arch/arm64/boot/Image.gz-dtb
fastboot reboot
```

---

## Post-Installation Setup

### Initial Configuration

**Step 1: Verify Root Access**

Test with terminal:
```bash
adb shell
su
# Should grant root access with KernelSU prompt
```

**Step 2: Configure Manager Settings**

Open KernelSU Manager > Settings:

**General:**
- Hide manager icon: Recommended for banking apps
- Require authentication: Enable biometric lock
- Update channel: Stable (recommended)

**Advanced:**
- Safe mode: Enable volume key trigger
- Logs: Keep for troubleshooting
- Restore on boot: Enable

**Step 3: Security Settings**

Configure root access:
- Default response: Prompt (recommended)
- Automatic timeout: 10 seconds
- Root logging: Enable for security
- Notification settings: Configure alerts

### Understanding Superuser Access

**Unlike Magisk:**
- KernelSU operates at kernel level
- More secure by design
- Better detection evasion
- Requires App Profiles for advanced control

**Basic Superuser:**
- Apps request root like normal
- Grant or deny access
- Access logged and tracked

**Advanced Control:**
- Create App Profiles
- Set granular permissions
- Control file system access
- Limit hardware access

---

## App Profile System

### What are App Profiles?

App Profiles are KernelSU's unique feature providing granular control over each rooted app's permissions and capabilities.

**Traditional Root:**
- App gets root = Full system access
- No granular control
- Security risks

**KernelSU App Profiles:**
- Define exact permissions per app
- Control file system access
- Limit hardware access
- Set resource limits
- Create security boundaries

### Creating App Profiles

**Step 1: Access App Profiles**

1. KernelSU Manager > App Profiles
2. Tap "+" to create new profile
3. Select target app

**Step 2: Configure Basic Permissions**

```yaml
Profile Name: Custom App Profile
Root Access: ON/OFF
UID/GID: Custom or default
SELinux Context: App context or custom
Mount Namespace: Isolated/Global
```

**Step 3: Configure File System Access**

```yaml
System Partition:
  /system: Read Only
  /vendor: Read Only
  /product: Restricted

Data Access:
  /data: Limited to app data
  /data/app: Read only
  /sdcard: Full access

Critical Paths:
  /system/bin: No write
  /system/etc: No write
```

**Step 4: Hardware and Network**

```yaml
Hardware Access:
  Camera: Allow/Deny
  Microphone: Allow/Deny
  GPS: Allow/Deny
  Sensors: Restricted

Network:
  Internet: Allowed
  Specific domains: Whitelist mode
  Port restrictions: Custom
```

**Step 5: Resource Limits**

```yaml
Performance:
  CPU Priority: Normal/High
  Memory Limit: No limit/Custom
  I/O Priority: Normal

Logging:
  Command logging: Enabled
  Access logging: Full
  Alert on violations: Yes
```

### Pre-Configured Profile Examples

**Banking App Profile (Maximum Security):**

```yaml
Profile: Banking Secure
Root Access: DENIED
File System:
  /system: Read only
  /data: App data only
  /sdcard: Denied
Hardware:
  Camera: Denied
  Microphone: Denied
  GPS: Denied
Network: Banking domains only
Logging: Full monitoring
```

**Developer Tools Profile:**

```yaml
Profile: Developer Access
Root Access: FULL
File System:
  /system: Read/Write
  /data: Full access
  /sdcard: Full access
Hardware: All allowed
Network: Unrestricted
ADB Integration: Enabled
Logging: Command history
```

**Gaming Apps Profile:**

```yaml
Profile: Gaming Optimized
Root Access: DENIED
File System: App data only
Hardware:
  GPU: High priority
  Touch: Low latency
Network: Game servers only
Performance: CPU/GPU boost
Anti-cheat: Bypass root detection
```

**Privacy-Focused Profile:**

```yaml
Profile: Privacy Enhanced
Root Access: LIMITED
File System: Minimal access
Hardware:
  Camera: Denied
  Microphone: Denied
  GPS: Approximate only
Network: Encrypted connections only
Tracking: Blocked
```

### Managing Profiles

**Apply Profile to App:**

1. KernelSU Manager > App Profiles
2. Select profile
3. Choose target app
4. Apply and restart app

**Export/Import Profiles:**

```bash
# Export profile as template
ksud profile export com.example.app > profile_template.json

# Import profile to new app
ksud profile import com.target.app < profile_template.json
```

**Profile Inheritance:**

- Create parent profiles for categories
- Child apps inherit settings
- Override specific permissions
- Maintain consistency

---

## Managing Modules

### Understanding Metamodules

::: warning IMPORTANT CHANGE
KernelSU no longer has built-in module mounting. Fresh installations require a **metamodule** for modules to function. Without a metamodule, modules will NOT be mounted.
:::

**What is a Metamodule?**

A metamodule is a special type of KernelSU module that provides core infrastructure for the module system. Unlike regular modules that modify system files, metamodules control how regular modules are installed and mounted.

**Why Metamodules?**
- **Reduced detection surface** - KernelSU itself doesn't perform mounts, reducing detection vectors
- **Flexibility** - Users can choose mounting implementation (OverlayFS, Magic Mount, hybrid)
- **Stability** - Core KernelSU remains stable while mounting implementations can evolve
- **Innovation** - Community can develop alternative mounting strategies

**Single Metamodule Constraint:**
- Only one metamodule can be installed at a time
- To switch metamodules: uninstall all regular modules → uninstall metamodule → reboot → install new metamodule → reinstall modules

### Available Metamodules

| Metamodule | Description | Best For |
|------------|-------------|----------|
| [meta-overlayfs](https://github.com/KernelSU-Modules-Repo/meta-overlayfs) | Official reference implementation using OverlayFS | Most users, standard setup |
| [mountify](https://github.com/backslashxx/mountify) | OverlayFS with tmpfs/ext4 sparse support, works on APatch/Magisk too | Reduced detection, multi-root support |
| [meta-magic_mount](https://github.com/7a72/meta-magic_mount) ([Mirror](https://codeberg.org/ovo/meta-magic_mount)) | Magic Mount implementation in C with WebUI support | Magisk-style mounting, official KSU branch support |
| [meta-hybrid_mount](https://github.com/YuzakiKokuban/meta-hybrid_mount) | Dual engine (OverlayFS + Magic Mount) with conflict monitor, diagnostics & auto-fallback | Maximum compatibility, advanced control, stealth mode |

::: tip RECOMMENDATION
For most users, **meta-overlayfs** (official) or **mountify** are recommended starting points. If you need advanced features like automatic fallback, diagnostics, or better stealth, try **meta-hybrid_mount**.
:::

### Installing a Metamodule

**Before installing regular modules, you MUST install a metamodule:**

1. Download metamodule ZIP from GitHub releases
2. Open KernelSU Manager > Modules
3. Tap "Install from storage" (➕ button)
4. Select the metamodule ZIP file
5. Reboot device

The active metamodule will be displayed in your module list with a special designation.

### Module Compatibility

**With a metamodule installed:**
- Most Magisk modules work (when using compatible metamodule)
- Zygisk modules require ZygiskNext
- Growing native KernelSU module support

**Module locations:**
- Metadata: `/data/adb/modules/` - Contains module.prop, disable, skip_mount markers
- Content: `/data/adb/metamodule/mnt/` - Contains actual module files (when using meta-overlayfs)

### Advanced Module Support

**KPM (KernelSU Patch Module) Support:**

If you need to run kernel patch modules that require KPM functionality, you can use:

- **[KPatch Next Module](https://github.com/KernelSU-Next/KPatch-Next-Module)** - Standalone implementation of KPM support for both Magisk and KernelSU with WebUI interface for advanced kernel patching capabilities.

### Installing Regular Modules Modules

::: danger PREREQUISITE
**You must have a metamodule installed first!** Without a metamodule, modules will be installed but NOT mounted.
:::

**Method 1: Manager Installation**

1. Verify a metamodule is active (check Modules list)
2. Download module ZIP from trusted source
3. KernelSU Manager > Modules
4. Tap "Install from storage" (➕ button)
5. Select module ZIP
6. Wait for installation
7. Reboot when prompted

**Method 2: Command Line**

```bash
# Install module
ksud module install /path/to/module.zip

# List installed modules
ksud module list

# Enable/disable module
ksud module enable module_id
ksud module disable module_id

# Remove module
ksud module remove module_id
```

::: warning MODULE SAFETY
Only install modules from trusted sources. Always verify source code for open-source modules.
:::

### Module Troubleshooting

<details><summary>Click to expand content</summary>

**Modules Not Being Mounted:**

1. **Check if metamodule is installed** - This is the #1 cause!
   - Open KernelSU Manager > Modules
   - Look for active metamodule (meta-overlayfs, mountify, etc.)
   - If no metamodule: install one and reboot

2. **Check for skip_mount flag**
   - Some modules may have `skip_mount` set
   - Check `/data/adb/modules/[module_name]/skip_mount`

**Module Causes Bootloop:**

1. Force reboot: Hold power 10 seconds
2. Boot to safe mode: Volume down at boot (disables all modules)
3. Disable module via recovery or ADB:

```bash
adb wait-for-device shell
ksud --remove-modules
# Or disable specific module:
touch /data/adb/modules/[module_name]/disable
# Or remove specific module:
rm -rf /data/adb/modules/[module_name]
```

**Module Not Working:**

1. Verify metamodule is active
2. Check KernelSU version compatibility
3. Check metamodule compatibility (some modules work better with specific metamodules)
4. Verify module logs: `/data/adb/modules/[module]/`
5. Check if module requires Zygisk (install ZygiskNext)
6. Try reinstalling module
7. Check for module updates

**Switching Metamodules:**

If you need to change your metamodule:
1. Uninstall all regular modules
2. Uninstall current metamodule
3. Reboot
4. Install new metamodule
5. Reboot
6. Reinstall your regular modules

</details>

---

## Root Hiding and Play Integrity

### Root Detection Reality

**Modern Banking Apps:**
- Use Play Integrity API
- Hardware-backed attestation
- Increasingly difficult to bypass

**KernelSU Advantages:**
- Kernel-level hiding (better than userspace)
- More effective root concealment
- Better Play Integrity passing rates

### Configure Root Hiding

**Step 1: Hide Manager App**

1. KernelSU Manager > Settings
2. "Hide the KernelSU Manager"
3. Enter custom name (e.g., "Settings")
4. App repackages with new icon/name

**Step 2: Create Banking Profile**

Use strict App Profile (see examples above) to deny root access to sensitive apps.

**Step 3: Install Root Hiding Modules**

1. **SUSFS** - Advanced root hiding
   - Download from GitHub
   - Install via KernelSU Manager
   - Configure for banking apps

2. **Play Integrity Fix** - Pass integrity checks
   - Download compatible version
   - Install and configure
   - Test with YASNAC app

**Step 4: Clear App Data**

After configuration:
1. Settings > Apps
2. Clear data for:
   - Google Play Services
   - Google Play Store
   - Banking apps
3. Reboot device
4. Reopen apps

### Testing Play Integrity

**Testing Apps:**

1. **YASNAC** - SafetyNet checker
2. **Play Integrity API Checker** - Official checker
3. **TB Checker** - Comprehensive tests

**Expected Results:**
- Basic Integrity: PASS (achievable with proper setup)
- Device Integrity: FAIL (expected with unlocked bootloader)
- Strong Integrity: FAIL (hardware attestation impossible)

::: warning NO GUARANTEES
Even with KernelSU's better hiding, some banking apps may still detect root. Always test your specific apps.
:::

---

## Troubleshooting

### Installation Issues

<details><summary>Click to expand content</summary>

**Manager Shows "Unsupported"**

Causes:
- Device kernel not GKI 2.0 compatible
- Android version too old (< Android 11)
- Non-GKI custom kernel

Solutions:
1. Verify Android 11+ and kernel 5.10+
2. Check for custom kernel with KernelSU support
3. Consider building custom kernel
4. Try Magisk as alternative

**Manager Shows "Not Installed" After Flashing**

Causes:
- Wrong kernel flashed for device
- Flashed to wrong partition
- GKI mismatch with Android version

Solutions:
1. Verify correct GKI kernel for Android version
2. Re-flash with correct kernel
3. Check fastboot output for errors
4. Try LKM boot patching method

**Device Bootloops After Installation**

Solutions:
1. Boot to fastboot immediately
2. Flash stock boot.img:
```bash
fastboot flash boot stock_boot.img
fastboot reboot
```
3. Verify correct GKI version
4. Check for device-specific kernel requirements

</details>

### Root Access Issues

<details><summary>Click to expand content</summary>

**Apps Not Getting Root**

Solutions:
1. Check KernelSU Manager shows "Installed"
2. Grant root to shell: `adb shell su`
3. Check App Profile settings
4. Verify app is requesting root properly
5. Check logs in KernelSU Manager

**Root Access Randomly Lost**

Solutions:
1. Check if KernelSU still showing installed
2. Reinstall via Manager > Install > Direct Install
3. Check for module conflicts
4. Review recent app profile changes

</details>

### Module Problems

<details><summary>Click to expand content</summary>

**Modules Not Being Mounted (Most Common Issue)**

::: danger CHECK THIS FIRST
Fresh KernelSU installations require a **metamodule** for modules to function!
:::

Solutions:
1. **Install a metamodule** - This is the #1 cause of module issues!
   - Download [meta-overlayfs](https://github.com/KernelSU-Modules-Repo/meta-overlayfs) or another metamodule
   - Install via KernelSU Manager > Modules
   - Reboot device
2. Verify metamodule is active in Modules list
3. Check for `skip_mount` file in module directory

**Module Not Loading**

Solutions:
1. Verify metamodule is installed and active
2. Check module compatibility with your metamodule
3. Check if module needs ZygiskNext
4. Review module logs: `/data/adb/modules/[module]/`
5. Try reinstalling module

**Need Zygisk Module Support**

Solution:
1. Install **ZygiskNext** module
2. Download from GitHub
3. Install via KernelSU Manager
4. Reboot device
5. Zygisk modules now supported

**Switching Metamodules**

If your current metamodule has compatibility issues:
1. Uninstall all regular modules
2. Uninstall current metamodule
3. Reboot
4. Install different metamodule ([mountify](https://github.com/backslashxx/mountify), [meta-hybrid_mount](https://github.com/YuzakiKokuban/meta-hybrid_mount), etc.)
5. Reboot
6. Reinstall modules

</details>

### Banking App Issues

<details><summary>Click to expand content</summary>

**App Detects Root Despite Profile**

Solutions:
1. Verify App Profile denies root completely
2. Hide KernelSU Manager with different name
3. Clear app data completely
4. Install Shamiko module
5. Install Play Integrity Fix
6. Accept that some apps may be impossible (hardware attestation)

**Play Integrity Fails**

Solutions:
1. Install Play Integrity Fix module
2. Configure proper device fingerprint
3. Clear Google Play Services data
4. Wait 24-48 hours for propagation
5. Accept Device/Strong may be impossible

</details>

---

## Next Steps

**After Installing KernelSU:**

1. **Configure App Profiles:**
   - Create profiles for sensitive apps
   - Set up banking app restrictions
   - Configure development tools

2. **Install essential modules:**
   - ZygiskNext for Zygisk support
   - Shamiko for root hiding
   - Play Integrity Fix for banking
   - Ad blocking modules

3. **Explore advanced features:**
   - [LSPosed Framework](./lsposed-guide.md) - App modifications
   - [Custom ROMs](./custom-rom-installation.md) - Next level
   - [Root Apps Collection](../apps-and-modules/) - Essential apps

4. **Optimize security:**
   - [Ad Blocking Guide](../general-guides/android-adblocking.md) - System-wide blocking
   - [Debloating Guide](../general-guides/android-apps-debloating.md) - Remove bloat
   - Profile hardening for all apps

---

## Community Resources

**Official Resources:**
- [KernelSU Website](https://kernelsu.org/) - Official documentation
- [KernelSU GitHub](https://github.com/tiann/KernelSU) - Source code and releases
- [KernelSU Telegram](https://t.me/KernelSU) - Official community

**Support Communities:**
- [Reddit r/KernelSU](https://www.reddit.com/r/KernelSU/) - Community discussions
- XDA Device Forums - Device-specific help

**Awesome Android Root resources:**
- [FAQs](../faqs.md) - Common questions
- [Troubleshooting Guide](../troubleshooting.md) - Common issues

### Getting Help

**When asking for help, provide:**
- Device model and Android version
- Kernel version: `adb shell uname -r`
- KernelSU version and mode (GKI/LKM)
- Installation method used
- Exact error messages
- KernelSU logs from Manager
- Steps already attempted