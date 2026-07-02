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
    - name: twitter:site
      content: "@awsm_and_root"
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: Complete LSPosed Framework Guide
  - - meta
    - name: twitter:description
      content: Modern Xposed framework implementation with LSPosed. Advanced Android customization and module management.
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.pages.dev/images/og/lsposed-guide.png
  - - meta
    - name: twitter:image:alt
      content: LSPosed Framework Installation Guide
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
    - property: article:tag
      content: Zygisk
  - - meta
    - property: article:published_time
      content: 2025-06-01T00:00:00Z
  - - meta
    - property: article:modified_time
      content: 2026-06-05T00:00:00Z
  - - meta
    - name: robots
      content: index, follow
---

# Complete LSPosed / Vector Framework Guide

The modern Xposed implementation for Android 8.1 and above. This guide covers both the original LSPosed project (now distributed as closed-source builds via Telegram) and the fully open-source **Vector** fork - helping you make an informed choice about which framework to trust on your device.

> [!WARNING]
> **Transparency Advisory:** The original LSPosed GitHub repository ([LSPosed/LSPosed](https://github.com/LSPosed/LSPosed)) has been **archived** since January 2024 with no public releases since October 2023. Current "official" builds are distributed exclusively as **closed-source** binaries via the LSPosed Telegram channel and **[lsposed.zip](https://lsposed.zip/)**. This violates the GPLv3 license under which the original code was released. Users should be aware of the [ongoing controversy](https://exposelsposed.pages.dev/) and make an informed decision.
>
> The fully open-source **[Vector](https://github.com/JingMatrix/Vector)** fork (GPLv3) is actively maintained, has a transparent development process, and now supports libxposed API 101 in CI/canary builds.

---

## Essential Resources

- **[Vector (JingMatrix Fork)](https://github.com/JingMatrix/Vector)** - Fully open-source (GPLv3), actively maintained - **Recommended**
- **[lsposed.zip](https://lsposed.zip/)** - Closed-source builds from the original LSPosed team (distributed via [Telegram](https://t.me/LSPosed))
- [Magisk Guide](./magisk-guide.md) - Required root solution with Zygisk support
- [KernelSU Guide](./kernelsu-guide.md) - Alternative kernel-based root
- [Root Apps Collection](../apps-and-modules/index.md) - Popular LSPosed/Vector modules directory

---

## Choosing Your Version

There are currently two primary sources for the framework. Choosing the right one involves trade-offs between open-source transparency, API compatibility, and stability.

| Feature | Vector (JingMatrix Fork) | "Official" LSPosed (lsposed.zip) |
|---------|--------------------------|-----------------------------------|
| **Primary URL** | [JingMatrix/Vector](https://github.com/JingMatrix/Vector) | **[lsposed.zip](https://lsposed.zip/)** |
| **Open Source** | ✅ Fully open-source (GPLv3) | ❌ Closed-source (GPL violation) |
| **Source Available** | [Yes - public repo](https://github.com/JingMatrix/Vector) | No - distributed via Telegram only |
| **Stable API** | API 100 (v2.0) | API 101 |
| **Canary/CI API** | API 101 (CI builds) | N/A |
| **Active Development** | ✅ Active (commits, issues, PRs) | ⚠️ Telegram-only, no public tracker |
| **Android Support** | 8.1+ | 8.1+ |
| **Detection Hiding** | Standard | Enhanced (ACE, Banks, etc.) |
| **Trust & Transparency** | ✅ Public code, community audit | ⚠️ [Controversy](https://exposelsposed.pages.dev/), [malware in beta](https://xdaforums.com/t/security-analysis-of-the-lsposed-beta-version.4750843/) |

> [!NOTE]
> **About lsposed.zip:** This domain is operated by the original LSPosed team. Builds are distributed through their [official Telegram channel](https://t.me/LSPosed) and are **closed-source** - meaning the code cannot be independently audited. The original LSPosed GitHub repository at [LSPosed/LSPosed](https://github.com/LSPosed/LSPosed) is archived and no longer reflects these builds.

### Which one should I use?
- **Use Vector** if you value open-source transparency, want publicly auditable code, and prefer a project with an active public development process. Vector's stable v2.0 supports API 100, and its CI (canary) builds already support API 101 for testing.
- **Use Official LSPosed (lsposed.zip)** if you specifically need stable API 101 support right now and are comfortable with closed-source binaries. Be aware that new modules are increasingly targeting API 101 and the upcoming API 102, so this version may offer better compatibility with the latest modules.
- **The ecosystem is moving toward API 101/102.** Vector's CI builds already support API 101, and a stable release is expected. If you can wait for Vector's stable API 101 release, it will likely be the best option combining open-source trust with modern API support.

---

## Background: The LSPosed Ecosystem

### What is LSPosed?

LSPosed is a Zygisk module providing an ART hooking framework that maintains API consistency with the original Xposed. It allows modules to modify system and application behavior in-memory without touching system partitions. The original project was developed as open-source (GPLv3) on [GitHub](https://github.com/LSPosed/LSPosed), but the repository was **archived in January 2024** after the core developers announced they would stop maintaining it.

Following the archival, the original team continued distributing closed-source builds through their Telegram channel and `lsposed.zip`. These builds cannot be independently audited and their distribution in closed-source form violates the GPLv3 license.

### What is Vector?

[Vector](https://github.com/JingMatrix/Vector) is a fully open-source (GPLv3) fork of LSPosed maintained by [JingMatrix](https://github.com/JingMatrix) and [84+ contributors](https://github.com/JingMatrix/Vector/graphs/contributors). It provides the same ART hooking framework with active public development, issue tracking, and community contributions. Vector v2.0 (stable) implements API 100, while CI/canary builds already support API 101.

### Key Features

**Vector (Open-Source - Recommended)**
- **Fully Transparent:** All source code publicly available, auditable by anyone.
- **Active Development:** Regular commits, community issue tracker, pull requests.
- **API 101 via CI:** Canary builds already support libxposed API 101 (stable release expected).
- **Broad Compatibility:** Supports Android 8.1 through the latest Android releases.
- **Java-to-Kotlin Refactor:** Ongoing modernization for maintainability.

**"Official" LSPosed (lsposed.zip - Closed-Source)**
- **API 101 Stable:** Stable support for the latest libxposed API standard.
- **Better Detection Hiding:** Enhanced capabilities to hide from banking apps and integrity checks (ACE, GoTyme, etc.).
- **Closed-Source:** Code is not publicly available; builds cannot be audited.
- **KernelSU Support:** Compatible with KernelSU and Zygisk Next.

<br>
<details><summary>Technical Details: API 100 vs 101 vs 102</summary>

### API 101 (The Current Standard)
The libxposed API 101 includes significant changes compared to API 82/100. It is designed for better performance and compatibility with modern Android internals. Both lsposed.zip (stable) and Vector (CI/canary) now support this API.

### API 102 (Upcoming)
The ecosystem is moving toward API 102. New modules are increasingly being developed for API 101+, making it the recommended target for future compatibility. Users stuck on API 100 may find themselves unable to use newer modules.

### API 100 (Legacy)
Version 2.0 of the Vector fork finalized the API 100 implementation. If a module specifically requires API 100 and fails on API 101, Vector v2.0 is the recommended stable option.

</details>

---

## Prerequisites

### Mandatory Requirements

> [!IMPORTANT]
> LSPosed will **NOT** work without these requirements met. Do not proceed until all are satisfied.

**Root Access**
- Magisk 26+ with Zygisk enabled
- KernelSU (and its forks) with Zygisk Next/NeoZygisk

**Android Version**
- Android 8.1 (Oreo) minimum through the latest Android releases

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

**Option A: Vector (Open-Source - Recommended)**
1. Visit [Vector Releases](https://github.com/JingMatrix/Vector/releases) on GitHub.
2. Download the latest **stable release ZIP** (v2.0 for API 100) or a **CI build** (for API 101).

**Option B: Official LSPosed (Closed-Source)**
1. Visit **[lsposed.zip](https://lsposed.zip/)** or the [Official Telegram](https://t.me/LSPosed).
2. Download the latest **Zygisk release ZIP**.

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
> KernelSU requires **Zygisk Next** or **NeoZygisk** to be installed first for LSPosed/Vector to function.

1. Install KernelSU and the Manager app.
2. Install **Zygisk Next** via KernelSU Manager > Modules.
3. Reboot.
4. Download the ZIP from your chosen source:
   - **Vector:** [GitHub Releases](https://github.com/JingMatrix/Vector/releases) (open-source)
   - **lsposed.zip:** [lsposed.zip](https://lsposed.zip/) (closed-source)
5. Install via KernelSU Manager > Modules > Install from storage.
6. Reboot and open the manager from the notification.

---

## Module Management

### API Compatibility Check

> [!IMPORTANT]
> - **API 101 Modules:** Require lsposed.zip (stable) or Vector CI builds (canary).
> - **API 100 Modules:** Compatible with Vector v2.0 (stable) and some may work on lsposed.zip via legacy support. For strict API 100 compatibility, Vector v2.0 is the baseline.

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
- If a module says it requires API 101, use either `lsposed.zip` (stable) or a Vector CI build (canary).
- If a module is very old and only supports API 82/100, and fails on API 101, try the Vector v2.0 stable release.

### Detection Issues (Banking Apps)
The closed-source lsposed.zip builds have better success in hiding their presence. If you still face issues:
1. Ensure the banking app is **NOT** in the scope of any module.
2. Use **Shamiko** (closed-source, from LSPosed team) or the open-source alternative **[Zygisk Assistant](https://xdaforums.com/t/module-zygisk-assistant-foss-root-hider.4664761/)**.
3. Disable "Verbose Logs" in LSPosed/Vector settings.

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
| **Vector (Open-Source)** | **Recommended** | Transparency, auditable code, active development. CI builds support API 101. |
| **lsposed.zip (Closed-Source)** | Use with caution | Stable API 101, better detection hiding. Be aware of closed-source risks. |
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
- [Vector GitHub](https://github.com/JingMatrix/Vector) - Open-source fork (actively maintained)
- [lsposed.zip](https://lsposed.zip/) - Closed-source builds from the original LSPosed team
- [LSPosed Telegram](https://t.me/LSPosed) - Official team channel (closed-source builds distributed here)
- [Expose LSPosed](https://exposelsposed.pages.dev/) - Community documentation of GPL violations and controversy

**Need help?** Visit our [FAQ section](../faqs.md) or [Troubleshooting Guide](../troubleshooting.md).
