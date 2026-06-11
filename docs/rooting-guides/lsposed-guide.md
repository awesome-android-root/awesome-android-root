---
layout: doc
title: Complete LSPosed Framework Guide
description: "Master LSPosed framework - the modern Xposed implementation. Comprehensive installation guide with module management and customization."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.pages.dev/rooting-guides/lsposed-guide
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
      content: https://awesome-android-root.pages.dev/rooting-guides/lsposed-guide
  - - meta
    - property: og:image
      content: https://awesome-android-root.pages.dev/images/og/lsposed-guide.png
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

The modern Xposed implementation for Android 8.1–16+. Master the LSPosed framework (including the new API 101 release) and the Vector fork for advanced app modifications and system customization.

> [!TIP]
> **Official Release:** The original LSPosed project has released the **API 101** update via their official channels. This version is highly recommended for its stability, fewer bugs, and support for the latest Android features. You can always find the latest official release at **[lsposed.zip](https://lsposed.zip/)**.

---

## Essential Resources

- **[Latest Official LSPosed](https://lsposed.zip/)** - API 101 (Recommended)
- **[Official Telegram](https://t.me/LSPosed)** - Real-time updates and support
- [Magisk Guide](./magisk-guide.md) - Required root solution with Zygisk support
- [KernelSU Guide](./kernelsu-guide.md) - Alternative kernel-based root
- [Root Apps Collection](../apps-and-modules/index.md) - Popular LSPosed/Vector modules directory

---

## Choosing Your Version

There are currently two primary versions of the framework. Choosing the right one depends on your module requirements.

| Feature | Official LSPosed (Recommended) | Vector (JingMatrix Fork) |
|---------|--------------------------------|--------------------------|
| **Primary URL** | **[lsposed.zip](https://lsposed.zip/)** | [JingMatrix/Vector](https://github.com/JingMatrix/Vector) |
| **API Version** | **API 101** | API 100 |
| **Stability** | High (Fewer bugs) | Moderate (Active refactor) |
| **Target Audience** | Most users, modern modules | Legacy API 100 modules |
| **Android Support** | 8.1 - 16+ | 8.1 - 17 Beta |
| **Detection Hiding** | Enhanced (ACE, Banks, etc.) | Standard |

### Which one should I use?
- **Use Official LSPosed (API 101)** if you want the most stable experience and support for the newest modules.
- **Use Vector (API 100)** only if you rely on specific modules that haven't updated to API 101 or if you are testing Android 17 Beta features specifically mentioned in their CI.

---

## What is LSPosed?

LSPosed is a Zygisk module providing an ART hooking framework that maintains API consistency with the original Xposed. It allows modules to modify system and application behavior in-memory without touching system partitions.

## What is Vector?
Vector is a (fork of LSPosed), Zygisk module providing an ART hooking framework that maintains API consistency with the original Xposed. The framework allows modules to modify system and application behavior in-memory.

### Key Features

**Official API 101 Release**
- **Modern Standard:** Moves the ecosystem to the latest libxposed standard.
- **Improved Stability:** Significant bug fixes over previous versions and forks.
- **Better Detection Hiding:** Enhanced capabilities to hide from banking apps and integrity checks (ACE, GoTyme, etc.).
- **KernelSU Support:** Improved compatibility with KernelSU and Zygisk Next.

**Vector (Legacy API 100 Support)**
- Maintains the definitive API 100 implementation for legacy modules.
- Undergoing a Java-to-Kotlin refactor for future-proofing.

<br>
<details><summary>Technical Details: API 100 vs 101</summary>

### API 101 (The New Standard)
The libxposed API 101 includes significant changes compared to API 82/100. It is designed for better performance and compatibility with modern Android internals. Official LSPosed now prioritizes this standard.

### API 100 (Legacy)
Version 2.0 of the Vector fork finalized the API 100 implementation. If a module specifically requires API 100 and fails on API 101, you may need to stay on this version temporarily.

</details>

---

## Prerequisites

### Mandatory Requirements

> [!IMPORTANT]
> LSPosed will **NOT** work without these requirements met. Do not proceed until all are satisfied.

**Root Access**
- Magisk 26+ with Zygisk enabled (recommended)
- KernelSU with Zygisk Next/NeoZygisk (supported)
- KernelSU Next (supported via Zygisk Next/NeoZygisk)

**Android Version**
- Android 8.1 (Oreo) minimum through Android 16+ (Official) or 17 Beta (Vector).

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

> **GrapheneOS Note:** Support for GrapheneOS has been added in the Zygisk Next/NeoZygisk stable release. GrapheneOS users should use Zygisk Next/NeoZygisk as their Zygisk provider.

---

## Installation Guide

---

### Method 1: Magisk Manager Installation (Recommended)

**Best for**: Most users, easiest method

#### Step 1: Enable Zygisk

1. Open **Magisk Manager** app
2. Tap the **gear icon** (Settings)
3. Scroll to **"Zygisk"** and enable the toggle
4. Tap **"Reboot"** when prompted
5. Wait for device to restart (1–2 minutes)

#### Step 2: Download the Framework

**Option A: Official LSPosed (Recommended)**
1. Visit **[lsposed.zip](https://lsposed.zip/)** or the [Official Telegram](https://t.me/LSPosed).
2. Download the latest **Zygisk release ZIP**.

**Option B: Vector (Legacy/Experimental)**
1. Visit [Vector Releases](https://github.com/JingMatrix/Vector/releases)
2. Download the API 100 compatible ZIP.

#### Step 3: Install the Module

1. Open **Magisk Manager** > **Modules** tab
2. Tap **"Install from storage"**
3. Select the downloaded ZIP
4. Wait for the installation to finish and tap **"Reboot"**.

#### Step 4: Open the Manager

After reboot, look for the LSPosed notification or app icon.
- If you don't see it, dial `*#*#5776733#*#*` (`*#*#LSPosed#*#*`) to open the manager.
- New versions also include an "Action button" in the status bar notification.

---

### Method 2: KernelSU Installation

> [!WARNING]
> KernelSU requires **Zygisk Next** or **NeoZygisk** to be installed first for LSPosed to function.

1. Install KernelSU and the Manager app.
2. Install **Zygisk Next** via KernelSU Manager > Modules.
3. Reboot.
4. Download the Official LSPosed ZIP from **[lsposed.zip](https://lsposed.zip/)**.
5. Install via KernelSU Manager > Modules > Install from storage.
6. Reboot and open the manager from the notification.

---

## Module Management

### API Compatibility Check

> [!IMPORTANT]
> - **API 101 Modules:** Require the latest Official LSPosed.
> - **API 100 Modules:** Compatible with Vector and some may work on Official via legacy support, but for strict compatibility, Vector v2.0 is the baseline.

### How to Enable a Module

1. Install the module APK (via File Manager or ADB).
2. Open the **LSPosed Manager**.
3. Go to the **Modules** tab.
4. Tap the module and toggle **"Enable"**.
5. **Select Scope:** Check the apps you want the module to modify.
   - *Note:* For system-wide tweaks, you may need to check "System Framework".
6. **Reboot** (some modules require it, others apply instantly).

---

## Troubleshooting

### "API Version Too New/Old"
- If a module says it requires API 101, you **must** use the official release from `lsposed.zip`.
- If a module is very old and only supports API 82/100, and fails on the new Official release, try the Vector v2.0 fork.

### Detection Issues (Banking Apps)
Official LSPosed (API 101) has significantly better success in hiding its presence. If you still face issues:
1. Ensure the banking app is **NOT** in the scope of any module.
2. Use **Shamiko** or **Zygisk Next**'s built-in hiding features.
3. Disable "Verbose Logs" in LSPosed settings.

### Installation Issues

<details><summary>Click to expand</summary>

#### Manager Not Appearing After Install

**Symptom:** Module installed in Magisk, but no notification appears.

```bash
# Check if module is installed
adb shell su -c "ls /data/adb/modules/ | grep lsposed"

# Check Zygisk status
adb shell su -c "magisk --status | grep Zygisk"
```

**Solutions:**

1. **Verify Zygisk:** Magisk Settings > Zygisk > enabled > reboot
2. **Dial Code:** Open your dialer and enter `*#*#5776733#*#*`
3. **Reinstall Module:** Remove > reboot > reinstall > reboot
4. **Clear Magisk cache:**
   ```bash
   adb shell su -c "rm -rf /data/adb/magisk/*cache*"
   adb reboot
   ```

#### Manager Won't Open

```bash
# Force stop manager
adb shell am force-stop org.lsposed.manager

# Clear cache
adb shell pm clear org.lsposed.manager
```

</details>

---

### System Stability & Bootloops

<details><summary>Click to expand</summary>

#### Bootloop After Enabling Module

> [!DANGER]
> Bootloops require immediate action to prevent data loss or extended downtime.

**Emergency Recovery:**

**Step 1: Boot to Recovery or Safe Mode**
- Hold power 10+ seconds to force off
- Boot to recovery or Safe Mode (usually holding Volume Down during boot)

**Step 2: Disable Modules**

*Method A - Via Recovery ADB:*
```bash
adb devices

# Disable all Magisk modules
adb shell rm -rf /data/adb/modules/*/

# Or just LSPosed
adb shell rm -rf /data/adb/modules/lsposed/

adb reboot
```

*Method B - Via File Manager (Recovery):*
Navigate to `/data/adb/modules/lsposed/` and rename the folder to `lsposed.disabled`.

</details>

---

### HyperOS / Xiaomi-Specific Issues

<details><summary>Click to expand</summary>

#### Framework Shows as Activated but Modules Don't Work

LSPosed may show as "Activated" in the manager, but modules fail to work. This is a known issue on certain HyperOS 2.x (MTK) builds.

**Workarounds:**
- Official LSPosed (API 101) includes several fixes for modern ROMs. Upgrade to this version if you are on a legacy fork.
- Try switching between KernelSU and KernelSU Next with NeoZygisk.

</details>

---

## Uninstallation

### Complete Removal

#### Method 1: Magisk Manager (Recommended)

1. Magisk Manager > **Modules tab**
2. Find **"LSPosed"** > tap trash icon > **Remove**
3. Confirm > **Reboot**

#### Method 2: ADB

```bash
adb shell su -c "rm -rf /data/adb/modules/lsposed*"
adb shell su -c "rm -rf /data/adb/lspd"
adb shell su -c "rm -rf /data/misc/lspd"
adb reboot
```

---

| Version | Status | Best For |
|---------|--------|----------|
| **Official (API 101)** | **Recommended** | Stability, latest features, detection hiding. |
| **Vector (API 100)** | Legacy | Modules that haven't updated to API 101. |
| **LSPatch** | Non-Root | Modifying apps on non-rooted devices. |

---

## Next Steps

### Expand Your Setup

**After Mastering LSPosed:**
1. [Custom ROM Installation](./custom-rom-installation.md) - Full system replacement
2. [Magisk Modules Guide](./magisk-guide.md) - System-level modifications
3. [KernelSU Guide](./kernelsu-guide.md) - Kernel-based root alternative
4. [Root Apps Collection](../apps-and-modules/index.md) - 300+ tested apps and modules

### Stay Updated

**Follow Development**
- [LSPosed GitHub](https://github.com/JingMatrix/LSPosed) - Official updates
- [LSPosed Telegram](https://t.me/LSPosed) - Real-time support

**Need help?** Visit our [FAQ section](../faqs.md) or [Troubleshooting Guide](../troubleshooting.md).
