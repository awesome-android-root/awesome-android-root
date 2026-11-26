---
layout: doc
title: Complete LSPosed Framework Guide
description: "Master LSPosed framework - the modern Xposed implementation. Comprehensive installation guide with module management and customization."
head:
  - - meta
    - property: og:title
      content: Complete LSPosed Framework Guide - Modern Xposed Implementation
  - - meta
    - property: og:description
      content: Install LSPosed framework with our comprehensive guide. Modern Xposed implementation with Zygisk integration and advanced module management.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/lsposed-guide.png
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
      content: https://awesome-android-root.xyz/images/og/lsposed-guide.png
  - - meta
    - name: twitter:image:alt
      content: LSPosed Framework Installation Guide
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
    - name: robots
      content: index, follow
---
# Complete LSPosed / Vector Framework Guide

LSPosed-style frameworks provide ART hooking for Xposed modules on rooted devices. Today there are two distributions: the original LSPosed project (archived upstream, now distributed as closed-source builds via Telegram) and the fully open-source **Vector** fork. This guide covers choosing between them, the requirements both share, and the installation steps for each.

> [!WARNING]
> **Transparency Advisory:** The original LSPosed GitHub repository ([LSPosed/LSPosed](https://github.com/LSPosed/LSPosed)) has been **archived** since January 2024 with no public releases since October 2023. Current "official" builds are distributed exclusively as **closed-source** binaries via the LSPosed Telegram channel and **[lsposed.zip](https://lsposed.zip/)**. This violates the GPLv3 license under which the original code was released. Users should be aware of the [ongoing controversy](https://exposelsposed.pages.dev/) and make an informed decision.
>
> The fully open-source **[Vector](https://github.com/JingMatrix/Vector)** fork (GPLv3) is actively maintained with public development and separate stable and CI channels.

## Which Project Should I Use?

| | Vector (JingMatrix fork) | "Official" LSPosed (lsposed.zip) |
|---|---|---|
| **Primary URL** | [JingMatrix/Vector](https://github.com/JingMatrix/Vector) | **[lsposed.zip](https://lsposed.zip/)** |
| **Source code** | ✅ Fully open-source (GPLv3) | ❌ Closed-source; distributed via [Telegram](https://t.me/LSPosed) only |
| **Channels** | Stable releases and CI builds ([releases](https://github.com/JingMatrix/Vector/releases)) | Telegram and lsposed.zip builds; no public release channel or tracker |
| **Android support** | 8.1 through 17 Beta (per upstream README) | 8.1+ |
| **Development** | ✅ Active: public commits, issues, PRs | ⚠️ Closed-source; no public tracker |
| **Trust & transparency** | ✅ Public code, community audit | ⚠️ [Controversy](https://exposelsposed.pages.dev/), [malware in beta builds](https://xdaforums.com/t/security-analysis-of-the-lsposed-beta-version.4750843/) |

> [!NOTE]
> **About lsposed.zip:** This domain is operated by the original LSPosed team. Builds are distributed through their [official Telegram channel](https://t.me/LSPosed) and are **closed-source** - meaning the code cannot be independently audited. The archived [LSPosed/LSPosed](https://github.com/LSPosed/LSPosed) repository no longer reflects these builds.

**Recommendation:** use **Vector** if you value auditable code and an active public development process. Use **lsposed.zip** only if you accept closed-source binaries and their risks. Some users report that those builds hide their presence from certain banking apps more effectively, but that is device- and build-dependent, never guaranteed, and can change between builds.

### libxposed API compatibility

Both distributions run the same module ecosystem, but their stable releases support different libxposed API levels:

| Module API | Vector | lsposed.zip (closed-source) |
|---|---|---|
| **API 102** | v2.2 stable and later | Not available in stable builds |
| **API 101** | v2.1 stable and later | Stable builds |
| **API 100 / 82 (legacy)** | v2.0 stable and later; use v2.0 if a module strictly requires API 100 | Stable builds; strict API 100 behavior is not guaranteed for older modules |

API support changes between releases - verify against the project's release notes before installing a module that declares a required API version.

## Requirements

> [!IMPORTANT]
> The framework will **not** work unless every requirement below is met. Do not install anything until they are satisfied.

| Requirement | Detail |
|---|---|
| **Root manager** | Magisk 26+ with Zygisk enabled, or KernelSU (and its forks) with a Zygisk implementation installed |
| **Zygisk implementation** | Magisk's built-in Zygisk, or [Zygisk Next](https://github.com/Dr-TSNG/ZygiskNext)/[NeoZygisk](https://github.com/JingMatrix/NeoZygisk) for KernelSU |
| **Android version** | 8.1 minimum; Vector upstream supports Android 8.1 through 17 Beta |
| **Module API** | Match the module's required libxposed API using the table above |

### ROM compatibility

| ROM type | Compatibility | Notes |
|----------|--------------|-------|
| Stock Android (Google) | Excellent | Best compatibility |
| AOSP-based ROMs | Excellent | LineageOS, PixelOS, etc. |
| OneUI (Samsung) | Good | Works with Magisk + Zygisk |
| OxygenOS (OnePlus) | Good | ColorOS base also works |
| MIUI/HyperOS (Xiaomi) | Moderate | Known crashes on some HyperOS 2.x versions - see [troubleshooting](#hyperos-xiaomi-specific-issues) |
| Nothing OS | Good | Growing compatibility |
| Custom GSI | Variable | Depends on implementation |
| GrapheneOS | Good* | *Via Zygisk Next/NeoZygisk stable |
| CalyxOS | Good | Works with microG |

> **GrapheneOS note:** Support for GrapheneOS has been added in the Zygisk Next/NeoZygisk stable release. GrapheneOS users should use Zygisk Next/NeoZygisk as their Zygisk provider.

## Installation

Install the module ZIP for your chosen distribution through your root manager. The paths differ only in where the ZIP comes from; pick the one that matches your project and root manager.

### Path A: Vector (open-source) via Magisk

1. Enable Zygisk: Magisk app > **Settings** (gear icon) > **Zygisk**, then reboot.
2. Download a **stable release ZIP** from [Vector releases](https://github.com/JingMatrix/Vector/releases). CI builds are published as pre-releases and via [GitHub Actions](https://github.com/JingMatrix/Vector/actions/workflows/core.yml?query=branch%3Amaster) (GitHub login required); upstream recommends CI builds for testing and warns that pull-request builds can be unstable and unsafe.
3. Magisk app > **Modules** > **Install from storage** > select the ZIP.
4. Reboot when the installation finishes.
5. Open the manager from the notification, or dial `*#*#5776733#*#*` (`*#*#LSPosed#*#*`).

### Path B: lsposed.zip (closed-source) via Magisk

1. Enable Zygisk: Magisk app > **Settings** > **Zygisk**, then reboot.
2. Download the latest **Zygisk release ZIP** from [lsposed.zip](https://lsposed.zip/) or the [official Telegram channel](https://t.me/LSPosed).
3. Magisk app > **Modules** > **Install from storage** > select the ZIP.
4. Reboot when the installation finishes.
5. Open the manager from the notification, or dial `*#*#5776733#*#*`.

### Path C: KernelSU (either distribution)

1. Install KernelSU and its Manager app.
2. Install a Zygisk implementation - **Zygisk Next** or **NeoZygisk** - via KernelSU Manager > Modules. The framework does not function without one.
3. Reboot.
4. Download the module ZIP from your chosen distribution's source (Path A step 2 or Path B step 2).
5. Install it via KernelSU Manager > **Modules** > **Install from storage**.
6. Reboot and open the manager from the notification.

## Module Management

1. Install the module APK (via File Manager or ADB).
2. Open the **LSPosed/Vector Manager**.
3. Go to the **Modules** tab and toggle the module **Enable**.
4. **Select scope:** check the apps the module should modify. System-wide tweaks often need **System Framework**.
5. **Reboot** if the module requires it; others apply instantly.

If a module reports an API version error, compare its required API with the [compatibility table](#libxposed-api-compatibility) and use a framework release that supports it.

## Troubleshooting

### Manager Not Appearing After Install

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

### Manager Won't Open

```bash
# Force stop manager
adb shell am force-stop org.lsposed.manager

# Clear cache
adb shell pm clear org.lsposed.manager
```

### Bootloop After Enabling Module

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

### Detection Issues (Banking Apps)

No framework or build guarantees that a banking app will accept the device. If you still face issues:

1. Ensure the banking app is **NOT** in the scope of any module.
2. Use **Shamiko** (closed-source, from the LSPosed team) or the open-source alternative **[Zygisk Assistant](https://xdaforums.com/t/module-zygisk-assistant-foss-root-hider.4664761/)**.
3. Disable "Verbose Logs" in LSPosed/Vector settings.

See [Play Integrity and Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps) for the wider picture.

### HyperOS / Xiaomi-Specific Issues

<details><summary>Click to expand</summary>

#### Framework Shows as Activated but Modules Don't Work

LSPosed may show as "Activated" in the manager, but modules fail to work. This is a known issue on certain HyperOS 2.x (MTK) builds.

**Workarounds:**
- Update to the latest stable build of your chosen framework; recent releases include fixes for modern ROMs.
- Try switching between KernelSU and KernelSU Next with NeoZygisk.

</details>

## Uninstallation

### Method 1: Magisk Manager (Recommended)

1. Magisk Manager > **Modules tab**
2. Find **"LSPosed"** > tap trash icon > **Remove**
3. Confirm > **Reboot**

### Method 2: ADB

```bash
adb shell su -c "rm -rf /data/adb/modules/lsposed*"
adb shell su -c "rm -rf /data/adb/lspd"
adb shell su -c "rm -rf /data/misc/lspd"
adb reboot
```

---

| Version | Status | Best For |
|---------|--------|----------|
| **Vector (open-source)** | **Recommended** | Transparency, auditable code, active development; stable releases support the libxposed API levels in the table above |
| **lsposed.zip (closed-source)** | Use with caution | Closed-source builds with their own risks; be aware of the [controversy](https://exposelsposed.pages.dev/) |
| **LSPatch** | Non-root | Modifying apps on non-rooted devices |

## Next Steps

1. [Custom ROM Installation](./custom-rom-installation.md) - Full system replacement
2. [Magisk Guide](./magisk-guide.md) / [KernelSU Guide](./kernelsu-guide.md) - Root management and modules
3. [Root Apps Collection](../apps-and-modules/index.md) - Popular LSPosed/Vector modules directory

**Follow development:** [Vector GitHub](https://github.com/JingMatrix/Vector) · [lsposed.zip](https://lsposed.zip/) · [LSPosed Telegram](https://t.me/LSPosed) · [Expose LSPosed](https://exposelsposed.pages.dev/)

**Need help?** Visit the [FAQ](../faqs.md) or [Troubleshooting Guide](../troubleshooting.md).
