---
title: 'KernelSU Root Guide: Installation, Modules & Troubleshooting'
description: Learn KernelSU installation, GKI and LKM modes, KernelSU Next, modules, WebUI, app profiles
  and troubleshooting for supported Android devices.
head:
- tag: link
  attrs:
    href: https://awesome-android-root.zhoe.org/rooting-guides/kernelsu-guide
    rel: canonical
- tag: meta
  attrs:
    content: article
    property: og:type
- tag: meta
  attrs:
    content: 'KernelSU Root Guide: Installation, Modules & Troubleshooting'
    property: og:title
- tag: meta
  attrs:
    content: Learn KernelSU installation, GKI and LKM modes, KernelSU Next, modules, WebUI, app profiles
      and troubleshooting.
    property: og:description
- tag: meta
  attrs:
    content: https://awesome-android-root.zhoe.org/rooting-guides/kernelsu-guide
    property: og:url
- tag: meta
  attrs:
    content: https://awesome-android-root.zhoe.org/images/og/kernelsu-guide.png
    property: og:image
- tag: meta
  attrs:
    content: summary_large_image
    name: twitter:card
- tag: meta
  attrs:
    content: 'KernelSU Root Guide: Installation, Modules & Troubleshooting'
    name: twitter:title
- tag: meta
  attrs:
    content: KernelSU root installation, GKI/LKM modes, modules, WebUI and app profile management.
    name: twitter:description
- tag: meta
  attrs:
    content: Awesome Android Root Project
    name: author
- tag: meta
  attrs:
    content: https://github.com/awesome-android-root/awesome-android-root
    property: article:author
- tag: meta
  attrs:
    content: Android Rooting
    property: article:section
- tag: meta
  attrs:
    content: KernelSU
    property: article:tag
- tag: meta
  attrs:
    content: Kernel Root
    property: article:tag
- tag: meta
  attrs:
    content: Android Rooting
    property: article:tag
- tag: meta
  attrs:
    content: index, follow
    name: robots
- tag: meta
  attrs:
    content: '2025-01-12 00:00:00+00:00'
    property: article:published_time
- tag: meta
  attrs:
    content: '2026-09-13 00:00:00+00:00'
    property: article:modified_time
- tag: meta
  attrs:
    content: KernelSU
    property: article:tag
- tag: meta
  attrs:
    content: KernelSU Next
    property: article:tag
- tag: meta
  attrs:
    content: Android Root
    property: article:tag
- tag: meta
  attrs:
    content: Kernel Root
    property: article:tag
- tag: meta
  attrs:
    content: GKI Kernel
    property: article:tag
- tag: meta
  attrs:
    content: Android Rooting
    property: article:tag
- tag: meta
  attrs:
    content: Root Management
    property: article:tag
- tag: meta
  attrs:
    content: Android Customization
    property: article:tag
- tag: meta
  attrs:
    content: summary_large_image
    name: twitter:card
- tag: meta
  attrs:
    content: '@awsm_and_root'
    name: twitter:site
- tag: meta
  attrs:
    content: '@awsm_and_root'
    name: twitter:creator
- tag: meta
  attrs:
    content: KernelSU Root Guide | Awesome Android Root
    name: twitter:title
- tag: meta
  attrs:
    content: Learn KernelSU installation, GKI and LKM modes, KernelSU Next, modules, WebUI, app profiles
      and troubleshooting.
    name: twitter:description
- tag: meta
  attrs:
    content: https://awesome-android-root.zhoe.org/images/og/kernelsu-guide.png
    name: twitter:image
- tag: meta
  attrs:
    content: KernelSU Root Guide - Complete Installation Tutorial
    name: twitter:image:alt
- tag: link
  attrs:
    href: https://github.com
    rel: dns-prefetch
- tag: link
  attrs:
    href: https://kernelsu.org
    rel: dns-prefetch
- tag: link
  attrs:
    href: https://kernelsu-next.github.io
    rel: dns-prefetch
- tag: script
  attrs:
    type: application/ld+json
  content: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"TechArticle\",\n  \"@id\": \"https://awesome-android-root.zhoe.org/rooting-guides/kernelsu-guide#article\"\
    ,\n  \"headline\": \"KernelSU Root Guide: Installation, Modules & Troubleshooting\",\n  \"description\"\
    : \"KernelSU installation, GKI and LKM modes, KernelSU Next, modules, WebUI, app profiles and troubleshooting.\"\
    ,\n  \"image\": \"https://awesome-android-root.zhoe.org/images/og/kernelsu-guide.png\",\n  \"author\"\
    : {\n    \"@id\": \"https://awesome-android-root.zhoe.org/#organization\"\n  },\n  \"publisher\":\
    \ {\n    \"@id\": \"https://awesome-android-root.zhoe.org/#organization\"\n  },\n  \"datePublished\"\
    : \"2025-01-12\",\n  \"dateModified\": \"2026-09-13\",\n  \"mainEntityOfPage\": {\n    \"@id\": \"\
    https://awesome-android-root.zhoe.org/rooting-guides/kernelsu-guide#webpage\"\n  },\n  \"articleSection\"\
    : \"Android Rooting Guides\",\n  \"inLanguage\": \"en-US\",\n  \"isAccessibleForFree\": true\n}"
---

# KernelSU Root Installation Guide

KernelSU is a kernel-based Android root solution. This guide covers how to check compatibility, choose GKI or LKM mode, install KernelSU or KernelSU Next, use modules and app profiles, and diagnose common failures. Kernel support and the correct image are device-specific; do not flash a build just because the Android version matches.

## Quick Navigation

- [What is KernelSU](#understanding-kernelsu)
- [KernelSU Variants](#kernelsu-variants)
- [KernelSU WebUI](#kernelsu-webui-ksuwebui)
- [Installation Modes](#installation-modes)
- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
- [Metamodules & Modules](#metamodules-and-modules)
- [App Profiles](#app-profile-system)
- [Root Hiding & Play Integrity](#root-hiding-and-play-integrity)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Complete rooting overview
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Required first step
- [Root Comparison](./root-framework-comparison.md) - Compare with Magisk and APatch
- [FAQ](../faqs.md) - Common questions

**KernelSU topic links:** [installation](#installation-methods) · [modules](#metamodules-and-modules) · [WebUI](#kernelsu-webui-ksuwebui) · [KernelSU Next](#kernelsu-variants) · [KernelSU vs Magisk](#kernelsu-vs-alternatives) · [troubleshooting](#troubleshooting)

---

## Understanding KernelSU

KernelSU is a kernel-based root solution operating at the Linux kernel level, providing enhanced security, advanced app permission control, and superior detection evasion compared to userspace root methods.

### Core Features

- **Kernel-Level Integration** - Direct kernel modification for enhanced security
- **Advanced App Profiles** - Granular root permission control per application
- **Metamodule System** - Pluggable module infrastructure for systemless modifications
- **Superior Hiding** - Better detection evasion than traditional methods
- **LKM Support** - Loadable Kernel Module architecture

### KernelSU vs Alternatives

| Feature | KernelSU | Magisk | APatch |
|---------|----------|---------|--------|
| Architecture | Kernel-based | Userspace overlay | Kernel-based |
| Root Hiding | Excellent | Good | Excellent |
| App Control | Advanced Profiles | Basic | Basic |
| Module Mounting | Requires Metamodule | Built-in | Built-in |
| Ease of Use | Moderate | Easy | Moderate |

**Choose KernelSU if:**
- You have Android 11+ device
- You want best root hiding
- You need fine-grained app control
- You use banking/payment apps (see [root hiding apps](../apps-and-modules/root-management#root-hiding-play-integrity))
- You prefer kernel-level security

> [!TIP]
> Detailed comparison: [Root Comparison](./root-framework-comparison.md)

---

## KernelSU Variants

The KernelSU ecosystem has expanded beyond the original project. Different variants serve different needs:

| Variant | Best For | Key Features |
|---------|----------|-------------|
| **[Official KernelSU](https://github.com/tiann/KernelSU)** | Modern GKI 2.0 devices | Most stable, LKM mode primary, official module repo |
| **[KernelSU-Next](https://github.com/KernelSU-Next/KernelSU-Next)** | Broader device compatibility | GKI+LKM, auto-updates, modern UI, module backup/restore |
| **[SukiSU-Ultra](https://github.com/SukiSU-Ultra/SukiSU-Ultra)** | Legacy & non-GKI devices | Broadest kernel compat, built-in SUSFS, KPM support |
| **[ReSukiSU](https://github.com/ReSukiSU/ReSukiSU)** | Multi-manager setups | SukiSU-Ultra fork with multi-manager support |

**Quick variant selection:**
- **Official KernelSU** - Stable, modern GKI 2.0 devices, maximum compatibility with official support
- **KernelSU-Next** - If you want auto-updates, broader kernel range, and extra features
- **Wild KSU / SukiSU-Ultra / ReSukiSU** - When built-in SUSFS root hiding or KPM kernel patching is needed

> [!TIP]
> All variants now delegate module mounting to a metamodule. See [Metamodules & Modules](#metamodules-and-modules).

---

## KernelSU WebUI (ksuwebui)

KernelSU modules can expose a small web interface that the KernelSU Manager opens in its embedded WebView. This is a module interface, not a separate root method: a module places its page at `webroot/index.html` and can use KernelSU's JavaScript APIs for module-specific actions. The module author must document whether WebUI is supported and which manager version is required.

- Read the [official KernelSU Module WebUI documentation](https://kernelsu.org/guide/module-webui.html) before installing a WebUI module.
- Open the module from a compatible root manager rather than trusting an arbitrary browser URL; WebUI pages can execute privileged module actions.
- For installable examples, use the [KernelSU module repository](https://modules.kernelsu.org/) and review the module's source and permissions.

## Installation Modes

KernelSU supports two installation modes. **Note:** Official KernelSU now recommends LKM mode. Community forks (Next, SukiSU) continue shipping GKI builds.

### GKI Mode

**How it works:** Replaces device's original kernel with a KernelSU-patched Generic Kernel Image.

| Pros | Cons |
|------|------|
| Universal GKI device compatibility | Loses manufacturer kernel optimizations |
| Works on Samsung Knox devices | Requires manual fastboot flashing |
| Better for heavily modified devices & custom ROMs | Must reflash after major OS updates |

**Best for:** Samsung devices, emulators, WSA, custom ROMs

### LKM Mode (Loadable Kernel Module)

**How it works:** Loads KernelSU as a kernel module without replacing the original kernel.

| Pros | Cons |
|------|------|
| Preserves original kernel & optimizations | Requires official firmware |
| Easy in-app updates, OTA-friendly | May not work on all devices |
| No AVB/dm-verity issues, can disable without reboot | Less compatible with modified firmware |

**Best for:** Most modern phones with stock/near-stock firmware

### Which Mode to Choose?

| Device Type | Recommended | Reason |
|-------------|-------------|--------|
| Stock firmware phones | LKM | Preserves optimizations, easy updates |
| Samsung devices | GKI | Knox compatibility |
| Custom ROMs | GKI | Better modified firmware support |
| Emulators/WSA | GKI | Universal compatibility |

If both modes are available, GKI takes priority and LKM is ignored.

---

## Prerequisites

::: danger ESSENTIAL
- **Unlocked bootloader** - Complete [bootloader unlocking](./how-to-unlock-bootloader.md) first
- **GKI compatible device** - Modern Android with GKI 2.0 kernel support
- **Full backup** of all important data
- **Battery 50%+** to prevent interruption
:::

### Requirements

| Hardware | Software |
|----------|----------|
| Android device with unlocked bootloader | [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) (ADB/Fastboot) |
| Data-capable USB cable | Device-specific USB drivers (Windows only) |
| Computer (Windows, macOS, Linux) | KernelSU Manager APK from variant's GitHub releases |
| 500MB+ free storage on device | Stock firmware for your device (optional but recommended) |

### Compatibility Check

```bash
# Check kernel version
adb shell uname -r
# Look for GKI 2.0 support (check with your variant's requirements)

# Quick device check
# Install KernelSU Manager → Open app → Check status:
# "Not Installed" = supported
# "Unsupported" = custom kernel or different variant needed
```

---

## Installation Methods

Three main methods. Choose based on your device and variant.

### Method 1: GKI Kernel Flash

**Best for:** GKI 2.0 compatible devices using GKI mode

**Step 1:** Download the appropriate GKI kernel from your chosen variant's releases:
- [Official KernelSU Releases](https://github.com/tiann/KernelSU/releases)
- [KernelSU-Next Releases](https://github.com/KernelSU-Next/KernelSU-Next/releases)
- [Wild KSU Releases](https://github.com/WildKernels/Wild_KSU/releases)

**Step 2:** Flash the kernel:

```bash
adb reboot bootloader
fastboot flash boot kernelsu-gki-*.img
fastboot reboot
```

**Step 3:** Download and install the variant's Manager APK. Verify installation opens correctly.

---

### Method 2: Boot Image Patching (LKM Mode)

**Best for:** Preserving stock kernel, LKM mode preference

**Step 1:** Extract stock boot image:

```bash
# From firmware ZIP
unzip stock_firmware.zip boot.img

# Or from device
adb shell su -c "dd if=/dev/block/by-name/boot of=/sdcard/boot.img"
adb pull /sdcard/boot.img
```

**Step 2:** Install Manager APK, open it, tap "Install" → "Select and Patch a File" → choose `boot.img`. Output: `kernelsu_patched_[random].img`.

**Step 3:** Flash the patched image:

```bash
adb pull /sdcard/Download/kernelsu_patched_*.img
adb reboot bootloader
fastboot flash boot kernelsu_patched_*.img
fastboot reboot
```

**Step 4:** Open Manager to verify - should show "Installed" with LKM mode.

---

### Method 3: Custom Kernel

**Best for:** Devices with community kernel support

Find device-specific kernels with KernelSU integration on XDA Forums, Telegram groups, or GitHub. Popular options include Sultan Kernel (Pixel), and various device-specific builds from [WildKernels](https://github.com/WildKernels).

```bash
# For IMG files
adb reboot bootloader
fastboot flash boot custom_kernel.img
fastboot reboot

# For ZIP files (requires custom recovery like TWRP)
# Boot to recovery → Install ZIP → Reboot
```

---

## Post-Installation Setup

### Initial Steps

1. **Verify root access** - Open Manager, confirm "Installed" status. Test: `adb shell su -c "id"`
2. **Configure Manager** - Enable hiding (rename for banking apps), require authentication, enable safe mode
3. **Install a metamodule** (required for module support - see next section)
4. **Set up App Profiles** for granular root control
5. **Backup your patched boot image** for recovery

---

## App Profile System

App Profiles are KernelSU's unique feature - granular permission control per app, beyond simple root grant/deny.

**What you can control per app:**
- Root access on/off
- File system access (read/write/deny per path)
- Hardware access (camera, mic, GPS, sensors)
- Network access and domain restrictions
- Resource limits and SELinux context
- Mount namespace isolation

### Quick Examples

| Profile Type | Root | Filesystem | Hardware | Use Case |
|-------------|------|-----------|----------|----------|
| **Banking Secure** | DENIED | App data only, /sdcard denied | All denied | Banking/finance apps |
| **Developer Access** | FULL | Full access | All allowed | Dev tools, ADB |
| **Gaming Optimized** | DENIED | App data only | GPU high priority | Games, anti-cheat |

### Apply a Profile

1. KernelSU Manager → App Profiles → "+" → select app
2. Configure permissions (root, filesystem, hardware, network, resources)
3. Save and restart the app

**Export/Import via CLI:**
```bash
ksud profile export com.example.app > profile.json
ksud profile import com.target.app < profile.json
```

> [!TIP]
> See [official App Profile docs](https://kernelsu.org/guide/app-profile.html) for complete configuration options.

---

## Metamodules and Modules

### What is a Metamodule?

Current KernelSU releases no longer include built-in module mounting. A **metamodule** provides the mounting infrastructure - without one, modules that modify `/system` will install but **not mount**. (Modules using only scripts, `sepolicy`, or `system.prop` still work without one.)

This applies to all variants: Official KernelSU, KernelSU-Next, Wild KSU, SukiSU-Ultra, and ReSukiSU.

**Why metamodules?**
- Reduced detection surface (KernelSU itself doesn't mount)
- Flexibility to choose your mounting method (OverlayFS, Magic Mount, hybrid)
- Core KernelSU stays stable while mounting evolves independently

> [!WARNING]
> Only **one** metamodule can be active at a time. To switch, uninstall all regular modules → uninstall metamodule → reboot → install new metamodule → reinstall modules.

### Available Metamodules

| Metamodule | Description | Best For |
|------------|-------------|----------|
| **[meta-overlayfs](https://github.com/KernelSU-Modules-Repo/meta-overlayfs)** | Official reference using OverlayFS | Most users, standard setup |
| **[mountify](https://github.com/backslashxx/mountify)** | OverlayFS + tmpfs/ext4 sparse, cross-platform | Reduced detection, multi-root |
| **[meta-hybrid_mount](https://github.com/YuzakiKokuban/meta-hybrid_mount)** | Dual engine (OverlayFS + Magic Mount) + auto-fallback | Advanced control, stealth |
| **[meta-mm](https://github.com/KernelSU-Modules-Repo/meta-mm)** | Lightweight Magic Mount alternative | Magisk-like mounting |
| **[ZeroMount](https://github.com/Enginex0/zeromount)** | Mountless VFS path redirection + SUSFS | Maximum stealth |

> **Recommendation:** Start with **meta-overlayfs** or **mountify**.

### Installing a Metamodule

1. Download metamodule ZIP from GitHub releases
2. KernelSU Manager → Modules → "Install from storage" (➕)
3. Select the ZIP → Reboot

The active metamodule shows in your module list with a special designation.

### Installing Regular Modules

**Prerequisite:** A metamodule must be active.

1. KernelSU Manager → Modules → "Install from storage"
2. Select module ZIP → Reboot when prompted

**CLI alternative:**
```bash
ksud module install /path/to/module.zip
ksud module list
ksud module enable/disable module_id
ksud module remove module_id
```

### Module Compatibility

- Most Magisk modules work with compatible metamodules
- Zygisk modules require [ZygiskNext](https://github.com/Dr-TSNG/ZygiskNext) or [ReZygisk](https://github.com/PerformanC/ReZygisk)
- KPM modules require SukiSU-Ultra or [KPatch Next Module](https://github.com/KernelSU-Next/KPatch-Next-Module)
- Browse modules: [Official Module Repository](https://modules.kernelsu.org/)

### Module Troubleshooting

| Issue | Likely Cause | Fix |
|-------|-------------|-----|
| **Not mounted** | No metamodule | Install metamodule → reboot |
| **Bootloop** | Bad module | Hold power 10s → Volume Down at boot (safe mode) → disable/remove module |
| **Root hiding not working** | Need Zygisk | Install ZygiskNext |
| **Module incompatible** | Wrong metamodule | Try different metamodule

---

## Root Hiding and Play Integrity

Modern banking apps use Play Integrity API with hardware-backed attestation - increasingly difficult but not impossible to manage on rooted devices. KernelSU's kernel-level approach offers better evasion than userspace methods.

### Recommended Setup

| Step | Action | Details |
|------|--------|---------|
| 1 | **Hide Manager** | KernelSU Manager → Settings → "Hide the KernelSU Manager" → rename (e.g., "Settings") |
| 2 | **Banking Profile** | Create App Profile denying root, filesystem, and hardware access for banking apps |
| 3 | **Install SUSFS** | For SUSFS-patched kernels - advanced root hiding with filesystem manipulation |
| 4 | **Install Play Integrity Fix** | Use [Play Integrity Fork](https://github.com/osm0sis/PlayIntegrityFork) or [Play Integrity Fix (inject)](https://github.com/KOWX712/PlayIntegrityFix) for MEETS_DEVICE_INTEGRITY |
| 5 | **Clear app data** | Clear data for Google Play Services, Play Store, and banking apps → Reboot |

### What's Realistic

- **Basic Integrity:** PASS - achievable with proper setup
- **Device Integrity:** PASS - possible with PIF + TrickyStore (keybox required for locked-bootloader-equivalent verification)
- **Strong Integrity:** FAIL for most - requires an unrevoked hardware keybox (increasingly scarce)

### Testing Tools

- [Play Integrity API Checker](https://github.com/1nikolas/play-integrity-checker-app) - Official checker
> [!WARNING]
> No guarantees. Some apps may still detect root despite all measures. Always test your specific apps.

---

## Troubleshooting

### Common Issues & Fixes

| Issue | Likely Cause | Solution |
|-------|-------------|----------|
| **Manager shows "Unsupported"** | Device not GKI 2.0 compatible | Try KernelSU-Next or SukiSU-Ultra for broader compat, or use Magisk |
| **"Not Installed" after flashing** | Wrong GKI kernel | Use correct kernel for your Android version; try LKM patching |
| **Bootloop** | Incompatible kernel/module | Flash stock boot.img via fastboot → `fastboot flash boot stock_boot.img` |
| **Modules not mounted** | No metamodule installed | Install a metamodule (meta-overlayfs recommended) → reboot |
| **Apps not getting root** | Profile restriction or Manager issue | Check Manager shows "Installed", verify App Profile, check logs |
| **Banking app detects root** | Insufficient hiding | Hide Manager, create restrictive profile, install SUSFS + Play Integrity Fix |
| **Play Integrity fails** | Detection not fully bypassed | Install PIF/TrickyStore, clear Google Play Services data |

### Emergency Recovery

**Bootloop:**
1. Force reboot (hold power 10s)
2. Boot to safe mode (Volume Down at boot) - disables all modules
3. If still looping, flash stock boot.img:
```bash
fastboot flash boot stock_boot.img
fastboot reboot
```

**Module causing issues:**
- Disable: `touch /data/adb/modules/[module_name]/disable`
- Remove: `rm -rf /data/adb/modules/[module_name]`
- Remove all modules: `ksud --remove-modules` (via ADB)

---

## Next Steps

1. **Configure App Profiles** for sensitive apps (banking, finance)
2. **Install essential modules:** ZygiskNext (Zygisk support), SUSFS (root hiding), Play Integrity Fix
3. **Explore:** [LSPosed Framework](./lsposed-guide.md), [Custom ROMs](./custom-rom-installation.md), [Root Apps Collection](../apps-and-modules/)
4. **Optimize:** [Ad Blocking](../general-guides/android-adblocking.md), [Debloating](../general-guides/android-apps-debloating.md)

---

## Community Resources

| Resource | Link |
|----------|------|
| Official Website | [kernelsu.org](https://kernelsu.org/) |
| Official GitHub | [github.com/tiann/KernelSU](https://github.com/tiann/KernelSU) |
| Official Module Repository | [modules.kernelsu.org](https://modules.kernelsu.org/) |
| Telegram (Official) | [@KernelSU](https://t.me/KernelSU) |
| Reddit | [r/KernelSU](https://www.reddit.com/r/KernelSU/) |
| Awesome KernelSU Resources | [github.com/fynks/awesome-kernelsu](https://github.com/fynks/awesome-kernelsu) |

**Getting help:** When asking, provide device model, kernel version (`adb shell uname -r`), your variant and mode, installation method, and exact error details.