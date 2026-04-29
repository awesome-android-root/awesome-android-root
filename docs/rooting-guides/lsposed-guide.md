---
layout: doc
title: Complete LSPosed Framework Guide
description: "Master LSPosed framework - the modern Xposed implementation. Comprehensive installation guide with module management and customization."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/rooting-guides/lsposed-guide
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete LSPosed Framework Guide - Modern Xposed Implementation
  - - meta
    - property: og:description
      content: Install LSPosed framework with our comprehensive guide. Modern Xposed implementation with Zygisk integration and advanced module management.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/rooting-guides/lsposed-guide
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/lsposed-guide.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete LSPosed Framework Guide
  - - meta
    - name: twitter:description
      content: Modern Xposed framework implementation with LSPosed. Advanced Android customization and module management.
  - - meta
    - name: keywords
      content: lsposed guide, xposed framework, zygisk modules, lsposed installation, android customization, xposed modules
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Customization
  - - meta
    - property: article:tag
      content: LSPosed
  - - meta
    - property: article:tag
      content: Xposed Framework
  - - meta
    - property: article:tag
      content: Android Customization
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: article:tag
      content: Android Customization
  - - meta
    - property: article:tag
      content: Zygisk
  - - meta
    - name: robots
      content: index, follow
---

# Complete LSPosed / Vector Framework Guide

The modern Xposed implementation for Android 8.1–16+. Master the Vector (formerly LSPosed) framework for advanced app modifications and system customization without touching system partitions.

> [!IMPORTANT]
> **Project Rename Notice:** The old `JingMatrix/LSPosed` has officially been renamed from LSPosed to Vector.

---

## Essential Resources

- [Main Rooting Guide](./index.md) - Universal rooting principles and device preparation
- [Magisk Guide](./magisk-guide.md) - Required root solution with Zygisk support
- [KernelSU Guide](./kernelsu-guide.md) - Alternative kernel-based root
- [Custom Recovery Guide](./how-to-install-custom-recovery.md) - Alternative installation method
- [Root Apps Collection](../apps-and-modules/index.md) - Popular Vector/LSPosed modules directory
- [FAQ](../faqs.md) - Frequently asked questions
- [Troubleshooting Guide](../faqs.md#troubleshooting) - Common issue solutions

---

## What is Vector (LSPosed)?

Vector is a Zygisk module providing an ART hooking framework that maintains API consistency with the original Xposed. The framework allows modules to modify system and application behavior in-memory.

### Key Features

**Modern Architecture**
- Completely rewritten, modern Zygisk architecture following the Vector & Zygisk Overhaul.
- Supports both legacy and modern hooking standards to ensure broad module compatibility.

**Compatibility & Performance**
- Supports devices running Android 8.1 through Android 17 Beta.
- Reflection Parity Overhaul: Completely rebuilt the `invokeSpecialMethod` backend to improve performance, enhance robustness, and mirror standard Java reflection behavior.

**Module Ecosystem**
- A module based on the LSPosed framework is fully compatible with the original Xposed Framework, and vice versa - a classic Xposed-based module will work well with LSPosed/Vector too.

<br>
<details><summary>What's New in Vector 2.0</summary>

While the major internal refactoring is still underway, version 2.0 was released to provide a stable, feature-complete environment for those relying on legacy libxposed APIs.

### Key Changes

| Feature | Details |
|---------|---------|
| **Project Rename** | Officially renamed from LSPosed to Vector |
| **Zygisk Overhaul** | Completely rewritten modern Zygisk architecture |
| **API 100 Finalized** | Definitive API 100 implementation before the API 101 jump |
| **Android 16 Support** | Full support added |
| **Telemetry Removed** | All telemetry monitoring has been stripped out |
| **LSPlt Hook Removed** | Abandoned for efficiency |
| **C++ Library** | Switched to official C++ implementation (larger archive) |

</details>

### API 101 Notice

> [!WARNING]
> With the recent publication of libxposed API 101, the ecosystem is moving toward a new standard with significant breaking changes. If a module requires API 101, use the older API 100-compatible version of that module in the meantime.

### Ongoing Refactor

The current LSPosed fork is undergoing a complete refactor into the new Vector project. The Java layer is being rewritten into Kotlin, with extensive documentation being added for the native layer.

---

## Vector vs Classic Xposed

| Feature | Vector 2.0 (Current) | Classic Xposed |
|---------|----------------------|----------------|
| Android support | 8.1 to 17 Beta | 4.0 to 8.1 |
| Installation method | Magisk/Zygisk module | System modification |
| OTA compatibility | Survives updates | Requires reinstall |
| SafetyNet/Integrity | Hideable with Magisk | Detectable |
| Module scoping | Per-app control | System-wide only |
| Development status | Active (Vector/JingMatrix) | Discontinued |
| Performance impact | Minimal | Moderate |
| libxposed API | 100 (101 in progress) | Legacy only |
| In-memory hooking | ✅ Non-destructive | ❌ System files modified |

---

## Prerequisites

### Mandatory Requirements

> [!IMPORTANT]
> Vector/LSPosed will **NOT** work without these requirements met. Do not proceed until all are satisfied.

**Root Access**
- Magisk 26+ with Zygisk enabled (recommended)
- KernelSU with Zygisk Next/NeoZygisk (supported)
- KernelSU Next (supported via Zygisk Next/NeoZygisk)

**Android Version**
- Android 8.1 (Oreo) minimum
- Android 8.1 through Android 17 Beta supported.
- Android 16 - fully supported as of the latest stable release

**Zygisk Environment**
- This framework requires a recent installation of Magisk or KernelSU with Zygisk enabled.
- Ensure a Zygisk environment (e.g., Zygisk Next/NeoZygisk) is present.

---

### Magisk Configuration Checklist

**Required Settings**
- Magisk version - 26.0 or newer (recommended)
- Zygisk - Must be enabled in Magisk settings
- Magisk DenyList - Optional, for hiding root from specific apps
- Systemless installation - Magisk should be installed via patched boot image

**Verification Commands**

```bash
# Check Magisk version
su -c "magisk --version"
# Should return 26000 or higher

# Verify Zygisk status
su -c "magisk --status | grep Zygisk"
# Should show "Zygisk: enabled"

# Check Magisk installation type
su -c "magisk --path"
# Should return /data/adb/magisk

# Verify root access
su -c "id"
# Should show "uid=0(root)"
```

---

### KernelSU Configuration

> [!WARNING]
> KernelSU support requires Zygisk Next/NeoZygisk for proper Vector/LSPosed functionality. Install the Zygisk provider first, then Vector.

**KernelSU Requirements**
- KernelSU kernel installed (GKI or LKM mode)
- KernelSU Manager app installed
- Zygisk Next/NeoZygisk installed (required for Zygisk environment)
- Root access verified
- SELinux properly configured

---

## Device Compatibility

- ✅ **Supported:** Pixel, Nexus, OnePlus, Samsung (stock OneUI), AOSP-based ROMs
- ⚠️ **Limited:** MIUI/HyperOS (some versions have known crashes - see Troubleshooting), EMUI
- ❌ **Not Supported:** Android Go, Fire OS

### ROM Compatibility

| ROM Type | Compatibility | Notes |
|----------|--------------|-------|
| Stock Android (Google) | Excellent | Best compatibility |
| AOSP-based ROMs | Excellent | LineageOS, PixelOS, etc. |
| OneUI (Samsung) | Good | Works with Magisk + Zygisk |
| OxygenOS (OnePlus) | Good | ColorOS base also works |
| MIUI/HyperOS (Xiaomi) | Moderate | Known crashes on some HyperOS 2.x versions |
| Nothing OS | Good | Growing compatibility |
| Custom GSI | Variable | Depends on implementation |
| GrapheneOS | Now Supported* | *Via Zygisk Next/NeoZygisk stable |
| CalyxOS | Good | Works with microG |

> **GrapheneOS Note:** Support for GrapheneOS has been added in the Zygisk Next/NeoZygisk stable release. This changes previous guidance - GrapheneOS users should use Zygisk Next/NeoZygisk as their Zygisk provider.

---

## Installation Guide

> [!WARNING]
> We use the **[JingMatrix/Vector](https://github.com/JingMatrix/Vector)** project (formerly JingMatrix/LSPosed). The original LSPosed project (`LSPosed/LSPosed`) is no longer maintained. Vector provides continued updates for Android 14–16+ and ongoing bug fixes.

---

### Method 1: Magisk Manager Installation (Recommended)

**Best for**: Most users, easiest method

#### Step 1: Enable Zygisk

1. Open **Magisk Manager** app
2. Tap the **gear icon** (Settings)
3. Scroll to **"Zygisk"** and enable the toggle
4. Tap **"Reboot"** when prompted
5. Wait for device to restart (1–2 minutes)

**Verification after reboot:**

```bash
# Via ADB
adb shell su -c "magisk --status | grep Zygisk"
# Should show: Zygisk: enabled
```

#### Step 2: Download Vector (LSPosed) Module

**Option A: GitHub Releases (Stable)**
1. Visit [Vector Releases](https://github.com/JingMatrix/Vector/releases)
2. Download the latest **release ZIP** (e.g., `LSPosed-v2.0-XXXX-zygisk-release.zip`)
3. Verify the filename says **"zygisk"** (not riru)

**Option B: GitHub Actions (Latest CI Build)**
1. Visit [Vector GitHub Actions](https://github.com/JingMatrix/Vector/actions/workflows/core.yml?query=branch%3Amaster)
2. Click the latest **successful workflow run** (green checkmark)
3. Download the artifact ZIP from the **"Artifacts"** section
4. Note: GitHub requires users to be logged in to download CI artifacts.
5. Debug builds are recommended for users encountering issues or performing troubleshooting. Users are encouraged to test CI builds to help identify bugs and accelerate development.

> [!NOTE]
> Builds from Pull Requests (PRs) are often unstable and potentially unsafe depending on the author. Stay on the master branch for verified builds, unless you are asked to help with debugging.

**Version Selection**
- **Zygisk version** - For Magisk 26.0+ (recommended)
- **Riru version** - Legacy, deprecated. **DO NOT use.**

#### Step 3: Install Vector Module

1. Open **Magisk Manager** > **Modules** tab
2. Tap **"Install from storage"**
3. Navigate to and select the downloaded Vector ZIP
4. Wait for the console output:
   ```
   - Installing LSPosed / Vector
   - Extracting module files
   - Setting up Zygisk module
   - Installation complete
   ```
5. Tap **"Reboot"** when prompted

#### Step 4: Verify Installation

After reboot, you should see a persistent notification from LSPosed/Vector in the status bar.

```bash
# Check if module is loaded
adb shell su -c "ls -la /data/adb/modules/lsposed*"

# Check daemon is running
adb shell su -c "ps -ef | grep lspd"

# Verify Zygisk still enabled
adb shell su -c "magisk --status"
```

#### Step 5: Open the Manager

1. Tap the **LSPosed/Vector notification** in the status bar
   - OR -
2. Open the manager via the Action button (new in the latest release)
   - OR -
3. Find the **"LSPosed"** app in the app drawer

**Manager Interface:**
- **Modules tab** - Installed modules list
- **Logs tab** - System and module logs for debugging
- **Settings tab** - Framework configuration
- **Repository tab** - Official module repository

---

### Method 2: Custom Recovery Installation

**Best for**: Devices without Magisk Manager access, advanced users

#### Prerequisites
- TWRP, OrangeFox, or LineageOS Recovery installed
- Vector ZIP downloaded
- Magisk already installed with Zygisk enabled

#### Steps

1. Boot to custom recovery:
   ```bash
   adb reboot recovery
   ```
2. Navigate to **Install** section in your recovery
3. Select the Vector ZIP file
4. Swipe to confirm flash
5. **Reboot system** (do NOT wipe cache/dalvik - unnecessary)
6. Verify following Method 1, Step 4

---

### Method 3: KernelSU Installation (via Zygisk Next/NeoZygisk)

> [!WARNING]
> KernelSU requires Zygisk Next/NeoZygisk for Vector to work properly. Install the Zygisk provider **before** installing Vector.

#### Steps

1. Install KernelSU kernel and Manager
2. Install **Zygisk Next/NeoZygisk** via KernelSU Manager
3. Reboot
4. Download the **Zygisk** version of Vector (same ZIP as Magisk method)
5. Install via KernelSU Manager > Modules > Install from storage
6. Reboot
7. Open manager from notification

```bash
# Verify KernelSU module list
su -c "ksud module list"
# Should show lsposed/vector in list
```

---

## First-Time Setup & Configuration

### Step 1: Grant Root Permission

- LSPosed requests root access on first launch
- Tap **"Grant"** or **"Allow"** - select **"Remember choice"** for permanent access

### Step 2: Enable Essential Features

Navigate to the **Settings Tab** in the manager:

1. **Enable resources hook** - Required for UI theming, icon packs, font changers *(recommended)*
2. **Enable verbose logs** - Required for troubleshooting *(enable during setup, disable later)*
3. **Enable modules for system framework** - Required for system-level modifications *(use with caution - can cause bootloops)*
4. **Toggle off detectable logging** - Users can now toggle off detectable logging of LSPosed for improved privacy/stealth *(new in latest release)*

### Step 3: Configure Manager Shortcut

**Settings > Manager shortcut**

Options:
- **Notification** - Persistent notification for quick access (default)
- **Launcher icon** - Traditional app icon
- **Action button** - The LSPosed manager can now be opened via the Action button *(new)*

### Verify Installation Status

**Open LSPosed Manager > Home tab** and check:
- Vector/LSPosed version (e.g., v2.0)
- Zygisk status (should show "Active")
- Android API level
- Magisk/KernelSU version

---

## Installing & Managing Modules

### Module API Compatibility

> [!IMPORTANT]
> With the recent publication of libxposed API 101, the ecosystem is moving toward a new standard with significant breaking changes. Vector 2.0 implements **API 100** only. Modules that require **API 101 will not load**. Check your module's requirements before installing. The Vector project has confirmed API 101 support is being planned.

### Module Sources

#### Official Sources (Recommended)

1. **Vector/LSPosed Repository** - Built-in to manager, verified modules, automatic updates. Access via: *Manager > Repository tab*
2. **GitHub Releases** - Developer official releases (e.g., ChromeXt, QAuxiliary, WA Enhancer)
3. **XDA Developers Forums** - Community-vetted modules with user feedback

#### Unofficial Sources (Use with Caution)

> [!WARNING]
> Only install modules from trusted developers. Malicious modules can steal credentials, log sensitive data, cause system instability, or brick devices.

---

### Installation Methods

#### Method 1: LSPosed Repository (Easiest)

1. Open Manager > **Repository tab**
2. Browse/search for a module
3. Tap module > review details
4. Tap **"Install"**
5. Enable the module toggle
6. Configure scope
7. Reboot if required

#### Method 2: Manual APK Installation

```bash
# Via ADB
adb install module.apk
```

Or install via file manager on-device, then:
1. Open Manager > **Modules tab** (module appears automatically)
2. Enable toggle
3. Configure scope
4. Reboot

---

### Scope Configuration

New options have been added to the Select menu for scopes in the latest release.

#### Scope Types

| Type | Risk | Use Case |
|------|------|----------|
| System Framework | High | System UI mods, global tweaks |
| Specific Apps | Low | App-specific mods (recommended) |
| All Apps (Global) | High | Only when explicitly required |

#### How to Configure Scope

1. Manager > **Modules tab** > Tap a module
2. Tap **"Application Scope"**
3. Use the **Search bar**, toggle **System apps**, and check target apps
4. Tap back to save

**Example - WhatsApp Module:**
- ✅ Enable: `com.whatsapp`
- ✅ Enable: `com.whatsapp.w4b`
- ❌ Disable: System Framework (unless required)

#### Scope Best Practices

- Only enable scope for necessary apps
- Avoid system framework unless explicitly required
- Never use "all apps" scope without good reason
- Test modules on one app before expanding scope

---

### Module Management

#### Enable/Disable

1. Manager > **Modules tab**
2. Tap toggle switch (right side)
3. Reboot to apply

#### Update Modules

- **Repository modules:** Manager > Repository > "Updates" section > tap Update / Update All > reboot
- **Manual:** Install new APK over existing, reboot

#### Uninstall

**Via Manager:** Long-press module > "Uninstall" > confirm > reboot

**Via ADB:**
```bash
adb shell pm uninstall com.example.module
adb shell su -c "rm -rf /data/data/com.example.module"
adb reboot
```

---

## Troubleshooting

### Installation Issues

<details><summary>Click to expand</summary>

#### Vector Not Appearing After Install

**Symptom:** Module installed in Magisk, but no notification appears.

```bash
# Check if module is installed
adb shell su -c "ls /data/adb/modules/ | grep lsposed"

# Check Zygisk status
adb shell su -c "magisk --status | grep Zygisk"

# Check Magisk log for errors
adb shell su -c "cat /cache/magisk.log | grep lsposed"
```

**Solutions:**

1. **Verify Zygisk:** Magisk Settings > Zygisk > enabled > reboot
2. **Reinstall Module:** Remove > reboot > reinstall > reboot
3. **Clear Magisk cache:**
   ```bash
   adb shell su -c "rm -rf /data/adb/magisk/*cache*"
   adb reboot
   ```
4. **Verify correct ZIP:** Ensure filename contains "zygisk", not "riru"

#### Manager Won't Open

```bash
# Force stop manager
adb shell am force-stop org.lsposed.manager

# Clear cache
adb shell pm clear org.lsposed.manager

# Relaunch
adb shell am start -n org.lsposed.manager/.ui.activity.MainActivity
```

</details>

---

### Module Loading Issues

<details><summary>Click to expand</summary>

#### Modules Not Working After Enable

**Checklist:**
- [ ] Module enabled in manager
- [ ] Scope configured correctly (target app selected)
- [ ] Device rebooted after enabling
- [ ] Module compatible with Android version
- [ ] Module does **not** require libxposed API 101 (Vector 2.0 only supports API 100)
- [ ] No conflicting modules

**Check Logs:**

1. Manager > **Logs tab**
2. Filter by module package
3. Common errors:
   - `ClassNotFoundException` - Module incompatible with Android version
   - `MethodNotFoundException` - App updated, module outdated
   - `SecurityException` - Permission issue
   - `api version too old` - Module requires API 101, not supported yet

**Fix API Mismatch:**

If a module won't activate due to API version requirements, download an older version of that module that targets API 100, or wait for Vector to implement API 101 support.

#### Module Causes App Crashes

1. Manager > Modules > tap module > remove the crashing app from scope > reboot
2. If system-wide instability, disable the module entirely and reboot

</details>

---

### System Stability Issues

<details><summary>Click to expand</summary>

#### Bootloop After Enabling Module

> [!DANGER]
> Bootloops require immediate action to prevent data loss or extended downtime.

**Emergency Recovery:**

**Step 1: Boot to Recovery**
- Hold power 10+ seconds to force off
- Boot to recovery (device-specific combo)

**Step 2: Disable LSPosed/Vector Modules**

*Method A - Via Recovery ADB:*
```bash
adb devices

# Disable all Magisk modules
adb shell rm -rf /data/adb/modules/*/

# Or just Vector/LSPosed
adb shell rm -rf /data/adb/modules/lsposed/

adb reboot
```

*Method B - Via TWRP File Manager:*
```
Navigate to: /data/adb/modules/lsposed/
Rename folder to: lsposed.disabled
```

*Method C - Via Recovery Terminal:*
```bash
mount /data
rm -rf /data/adb/lspd/
```

**Step 3: Boot and Diagnose**
1. Device should boot normally
2. Open Manager > Logs tab
3. Re-enable modules one by one
4. Identify the culprit module

</details>

---

### App Compatibility Issues

<details><summary>Click to expand</summary>

#### Banking / Payment Apps Not Working

**Root Cause:** Apps use Play Integrity API to detect unlocked bootloaders, root access, modified systems, or the LSPosed/Vector framework presence.

**Solutions:**

1. **Magisk DenyList:**
   - Magisk > Settings > Enable "Enforce DenyList"
   - DenyList > Add banking apps > reboot

2. **Shamiko Module:**
   - Download from [LSPosed/LSPosed.github.io releases](https://github.com/LSPosed/LSPosed.github.io/releases)
   - Install via Magisk > reboot (hides Magisk from apps)

3. **Exclude from Vector scope:**
   - Check all enabled modules - ensure banking apps are **not** in any module's scope
   - Some banking apps detect the LSPosed/Vector presence independently

> [!WARNING]
> Bypassing app security measures may violate Terms of Service and local laws. Consider maintaining a non-rooted work profile for critical banking apps.

</details>

---

### HyperOS / Xiaomi-Specific Issues

<details><summary>Click to expand</summary>

#### Vector Shows as Activated but Modules Don't Work (HyperOS 2.x)

LSPosed/Vector may show as "Activated" in the manager, but modules fail to work. In verbose logs, a large number of Java-related errors may appear even with all modules disabled. This is a known issue on certain HyperOS 2.x (MTK) builds.

**Workarounds:**
- Check the [Vector Issues tracker](https://github.com/JingMatrix/Vector/issues) for your specific device/ROM version
- Try switching between KernelSU and KernelSU Next with NeoZygisk
- Use Magisk + Zygisk instead of KernelSU if possible on your device

</details>

---

### Manager & Configuration Issues

<details><summary>Click to expand</summary>

#### Lost Access to Manager

```bash
# Direct launch via ADB
adb shell am start -n org.lsposed.manager/.ui.activity.MainActivity

# Or via intent
adb shell am start -a android.intent.action.VIEW -d lsposed://
```

Or reinstall the manager APK:
```bash
adb install -r lsposed-manager.apk
adb reboot
```

#### Settings Not Saving

```bash
# Clear manager data (resets all config - reconfigure after)
adb shell pm clear org.lsposed.manager

# Check SELinux mode
adb shell getenforce
# Enforcing may cause config issues on some ROMs
```

</details>

---

## Uninstallation

### Complete Removal

#### Method 1: Magisk Manager (Recommended)

1. Magisk Manager > **Modules tab**
2. Find **"LSPosed"** > tap trash icon or three-dot menu > **Remove**
3. Confirm > **Reboot**

```bash
# Verify removal
adb shell su -c "ls /data/adb/modules/"
# Should NOT show lsposed
```

#### Method 2: ADB

```bash
adb shell su -c "rm -rf /data/adb/modules/lsposed*"
adb shell su -c "rm -rf /data/adb/lspd"
adb shell su -c "rm -rf /data/misc/lspd"
adb reboot
```

#### Method 3: Recovery

1. Boot to TWRP/OrangeFox
2. File Manager > `/data/adb/modules/` > delete `lsposed` folder
3. Go to `/data/adb/` > delete `lspd` folder
4. Reboot system

### Remove Individual Modules

```bash
# Uninstall module APK
adb shell pm uninstall com.example.module

# Remove module data
adb shell su -c "rm -rf /data/data/com.example.module"

# Clear module from LSPosed cache
adb shell su -c "rm -rf /data/adb/lspd/cache/com.example.module*"

adb reboot
```

### Clean Residual Data

```bash
# Remove residual Xposed data
adb shell su -c "find /data/data -name '*xposed*' -exec rm -rf {} +"

# Clear LSPosed cache and logs
adb shell su -c "rm -rf /data/adb/lspd/cache/*"
adb shell su -c "rm -rf /data/adb/lspd/log/*"
```

### Verify Complete Removal

```bash
# Check no module remains
adb shell su -c "ls /data/adb/modules/"

# Check daemon is gone
adb shell su -c "ps -ef | grep lspd"

# Check manager app removed
adb shell pm list packages | grep lsposed
```

---

## Next Steps

### Expand Your Setup

**After Mastering LSPosed:**
1. [Custom ROM Installation](./custom-rom-installation.md) - Full system replacement
2. [Magisk Modules Guide](./magisk-guide.md) - System-level modifications
3. [KernelSU Guide](./kernelsu-guide.md) - Kernel-based root alternative
4. [Root Apps Collection](../apps-and-modules/index.md) - 300+ tested apps and modules

### Advanced Customization

**Complementary Frameworks**
- Magisk modules - System-level tweaks
- Substratum/Swift Installer - System-wide theming
- Custom kernels - Performance tuning
- Root apps - Advanced functionality


### Stay Updated

**Follow Development**
- [LSPosed GitHub](https://github.com/JingMatrix/LSPosed) - Official updates
- [LSPosed Telegram](https://t.me/LSPosed) - Real-time support

**Need help?** Visit our [FAQ section](../faqs.md) or [Troubleshooting Guide](../troubleshooting.md).