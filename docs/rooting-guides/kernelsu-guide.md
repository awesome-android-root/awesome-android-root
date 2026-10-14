---
layout: doc
title: "KernelSU Root Guide: Installation, Modules & Troubleshooting"
description: "Learn KernelSU installation, GKI and LKM modes, KernelSU Next, modules, WebUI, app profiles and troubleshooting for supported Android devices."
head:
  - - meta
    - property: og:title
      content: "KernelSU Root Guide: Installation, Modules & Troubleshooting"
  - - meta
    - property: og:description
      content: Learn KernelSU installation, GKI and LKM modes, KernelSU Next, modules, WebUI, app profiles and troubleshooting.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/kernelsu-guide.png
  - - meta
    - name: twitter:title
      content: "KernelSU Root Guide: Installation, Modules & Troubleshooting"
  - - meta
    - name: twitter:description
      content: KernelSU root installation, GKI/LKM modes, modules, WebUI and app profile management.
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
    - property: article:tag
      content: KernelSU
  - - meta
    - property: article:tag
      content: KernelSU Next
  - - meta
    - property: article:tag
      content: GKI Kernel
  - - meta
    - property: article:tag
      content: Metamodule
  - - meta
    - property: article:tag
      content: Root Management
  - - meta
    - property: article:tag
      content: Android Customization
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/kernelsu-guide.png
  - - meta
    - name: twitter:image:alt
      content: KernelSU Root Guide - Complete Installation Tutorial
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
        "@id": "https://awesome-android-root.xyz/rooting-guides/kernelsu-guide#article",
        "headline": "KernelSU Root Guide: Installation, Modules & Troubleshooting",
        "description": "KernelSU installation, GKI and LKM modes, KernelSU Next, metamodules, WebUI, app profiles and troubleshooting.",
        "image": "https://awesome-android-root.xyz/images/og/kernelsu-guide.png",
        "author": { "@id": "https://awesome-android-root.xyz/#organization" },
        "publisher": { "@id": "https://awesome-android-root.xyz/#organization" },
        "datePublished": "2025-01-12",
        "dateModified": "2026-10-14",
        "mainEntityOfPage": {
          "@id": "https://awesome-android-root.xyz/rooting-guides/kernelsu-guide#webpage"
        },
        "articleSection": "Android Rooting Guides",
        "inLanguage": "en-US",
        "isAccessibleForFree": true
      }
---

# KernelSU Root Installation Guide

KernelSU does not replace `init` or the boot ramdisk logic the way Magisk does. `su`, the allowlist and permission checks run inside the kernel, and the Manager app talks to the kernel over a small IOCTL interface. That makes KernelSU stable across firmwares, but it also means module mounting is no longer part of the core: since the 3.0 line, KernelSU hands mounting to a **metamodule**. This guide covers compatibility, LKM and GKI installation, metamodules, app profiles, hiding, and recovery.

Compatibility is device-specific. Match your **KMI** (kernel module interface), firmware and security patch level rather than your Android version number.

## Quick Navigation

- [Understanding KernelSU](#understanding-kernelsu)
- [KernelSU Variants](#kernelsu-variants)
- [Installation Modes](#installation-modes)
- [Prerequisites & Compatibility](#prerequisites)
- [Installation Methods](#installation-methods)
- [Metamodules & Modules](#metamodules-and-modules)
- [App Profiles](#app-profile-system)
- [Root Hiding & Play Integrity](#root-hiding-and-play-integrity)
- [Troubleshooting & Recovery](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Complete rooting overview
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Required first step
- [Root Comparison](./root-framework-comparison.md) - Compare with Magisk and APatch
- [FAQ](../faqs.md) - Common questions

---

## Understanding KernelSU

Because root checks happen in kernel space, a userspace app cannot tamper with the `su` path, and detection from inside the app sandbox is harder than with ramdisk-based root. What KernelSU actually controls:

### Core Features

- **Kernel-level `su` and allowlist** - root is granted per UID/package, not per shell script
- **App Profile** - per-app policies for UID, GID, groups, SELinux domain, capabilities and unmount behavior
- **Metamodule architecture** - module installation and mounting are pluggable, installable and replaceable
- **Module system** - Magisk-style module layout with `system.prop`, `sepolicy.rule`, `initrc/` injection, boot scripts, WebUI and a key-value module config API
- **`ksud` CLI** - module management, `boot-patch`, `insmod` (with kallsyms access), `late-load`, sepolicy patching and `soft-reboot`
- **Extra kernel features** - `adb root`, SELinux policy hiding, su compatibility layer and a kernel-side event log (`sulog`) surfaced in the Manager
- **Platform support** - arm64 and x86_64 LKM builds, plus riscv64 `ksud`/`ksuinit` artifacts

Upstream keeps the kernel and Manager version-checked: a current Manager will warn when it talks to a KernelSU kernel with a mismatched interface version. Update both together.

### KernelSU vs Alternatives

| Feature | KernelSU | Magisk | APatch |
|---------|----------|---------|--------|
| Architecture | Kernel-based | Ramdisk/`init` | Kernel patching (KPM) |
| Root hiding | Kernel-level + metamodule + app profiles | DenyList + Zygisk modules | KernelPatch |
| App control | App Profiles (uid/gid/SELinux/caps) | DenyList only | Basic |
| Module mounting | Metamodule required (3.0+) | Built-in | Built-in |
| Zygisk | Needs ZygiskNext / ReZygisk / NeoZygisk | Built-in | Needs external Zygisk |
| Module mounts via OverlayFS | Yes (metamodule dependent) | Magic Mount | Magic Mount |

**Choose KernelSU if:** you want root that survives firmware updates (LKM), per-app policies instead of a coarse denylist, and a kernel-level base that hiding modules can build on. If you only want the widest module compatibility with the least setup, Magisk is still simpler.

> [!TIP]
> Detailed comparison: [Root Comparison](./root-framework-comparison.md)

---

## KernelSU Variants

The KernelSU ecosystem is now mostly forks. Names, maintainers and repositories change quickly, so check that a project is still receiving commits before flashing its kernel.

| Variant | Kernel support | Notes |
|---------|----------------|-------|
| **[Official KernelSU](https://github.com/tiann/KernelSU)** | GKI 2.0 (5.10+), manual backports for older | LKM-first, metamodule-based, official module repository |
| **[KernelSU-Next](https://github.com/KernelSU-Next/KernelSU-Next)** | 4.4 up to 6.18 | Metamodule-based, ships prebuilt SUSFS LKM `susfs_guard_lkm.ko` per KMI, module and app profile backup, risk detection that blocks suspicious modules, spoofed-package Manager builds |
| **[SukiSU-Ultra](https://github.com/SukiSU-Ultra/SukiSU-Ultra)** | GKI 2.0, plus non-GKI/GKI 1.0 backports | Built-in Magic Mount (not only metamodules), KPM (KernelPatch modules), SUSFS controls in the Manager |
| **[BakaSU](https://github.com/Baka-SU/BakaSU)** (formerly ReSukiSU) | GKI 2.0, manual hooks down to 3.4 | Metamodule-based, built-in SUSFS management, multi-manager support (official or KOWX712 KernelSU Manager can manage its kernel) |
| **[Wild KSU](https://github.com/WildKernels/Wild_KSU)** | Discontinued | Repository archived in 2026; the WildKernels kernel repos still publish KernelSU/KernelSU-Next builds |

**How to pick:**
- Modern GKI device, stock-ish firmware: **official KernelSU** in LKM mode.
- You want SUSFS, module backup, or wider kernel range without compiling: **KernelSU-Next**.
- Non-GKI, KPM modules, or you want mounting in the core: **SukiSU-Ultra**.
- You want a second manager or old-kernel manual hooks: **BakaSU**.

> [!WARNING]
> Everything except official KernelSU is community code. A fork can add detection vectors, drop in maintenance, or rename itself (ReSukiSU to BakaSU is the recent example). Read the project's own README before assuming features carry over.

---

## Installation Modes

Two modes exist. **LKM is the recommended default on phones**; GKI mode now mostly matters for emulators, WSA/Waydroid, Knox-locked Samsung devices, and community kernels.

### LKM Mode (Loadable Kernel Module)

KernelSU is loaded as a kernel module into your existing kernel and patches the ramdisk.

| Pros | Cons |
|------|------|
| Keeps the stock kernel and vendor tuning | Requires firmware matching your device and KMI |
| In-app upgrades, OTA via "install to inactive slot" | Kernel must allow module loading (GKI 2.0 baseline) |
| Flashing touches only the ramdisk, not the kernel image | Less flexible on heavily modified firmware |
| Can be unloaded temporarily, then re-enabled with a reboot | |

On Android 13 and newer, LKM patches the **`init_boot`** partition. On older devices it patches **`boot`**.

### GKI Mode (Generic Kernel Image)

The device kernel is replaced entirely with a GKI kernel.

| Pros | Cons |
|------|------|
| Works on Knox-enabled Samsung and emulators | Loses vendor kernel tuning |
| Independent of official firmware, KMI permitting | Needs manual flashing and a matching security patch level |
| Required when LKM cannot load | Must be re-flashed after major updates |

**Important change:** the official project no longer publishes ready-to-flash GKI `boot.img` files. Official releases now ship the Manager APK, `ksud`/`ksuinit` binaries, and LKM `.ko` files for each KMI (arm64 and x86_64, from `android12-5.10` through `android17-6.18`). For GKI mode you now either flash a community kernel or build your own (the official build guide is maintained as reference, and the DDK toolchain is the current route for LKM builds).

### Which Mode to Choose?

| Device type | Recommended | Reason |
|-------------|-------------|--------|
| Stock or near-stock phone | LKM | Keeps vendor kernel, easy OTA and upgrades |
| Samsung with Knox | GKI | LKM is blocked by Knox |
| Custom ROM with a GKI kernel | LKM (or custom kernel) | Custom kernels usually ship KernelSU support already |
| Emulator, WSA, Waydroid | GKI | No ramdisk to patch |
| Kernel already contains KernelSU | Neither | The kernel is the root; just install the Manager |

If a GKI-patched kernel is present, it takes priority and LKM is ignored.

---

## Prerequisites

::: danger ESSENTIAL
- **Unlocked bootloader** - Complete [bootloader unlocking](./how-to-unlock-bootloader.md) first
- **A full backup** of important data (bootloader unlock usually wipes the device anyway)
- **Stock firmware or boot/`init_boot` image** for your exact build, for recovery
- **Battery above 50%** so flashing is never interrupted
:::

### Requirements

| Hardware | Software |
|----------|----------|
| GKI 2.0 device (kernel 5.10+) for official KernelSU | [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) (ADB and fastboot) |
| Data-capable USB cable | Device USB drivers (Windows) |
| Computer (Windows, macOS, Linux) | KernelSU Manager APK from the chosen variant's releases |
| ~500 MB free storage for modules and images | Optional: `magiskboot` if you patch images by hand |

### Compatibility Check

1. Install the Manager APK for your variant and open it.
2. `Not installed` means your kernel layout is supported: install KernelSU and continue.
3. `Unsupported` means you must use a community kernel or build one yourself. See the [unofficially supported devices list](https://kernelsu.org/guide/unofficially-support-devices.html).

```bash
# Kernel release and KMI
adb shell uname -r
# Example: 6.6.30-android15-8-g1234abcd -> KMI is 6.6-android15-8
# Release assets and ksud use the short form, for example android15-6.6

# Android build and security patch level
adb shell getprop ro.build.version.release
adb shell getprop ro.build.version.security_patch
```

**KMI rules that prevent bootloops:**
- The KMI is `w.x-androidYY-Z`, for example `5.10-android12-9`. The sublevel (`101` in `5.10.101`) is not part of the KMI.
- Kernel release and Android version are unrelated. A `5.10-android12` kernel can run Android 14.
- Anti-rollback blocks images with an older security patch level than the device already accepted. Never flash an older SPL into a slot that has a newer one.

---

## Installation Methods

### Method 1: LKM via the Manager (recommended)

**Best for:** almost every phone with stock or near-stock firmware.

1. **Back up the stock image.** Dump `boot` (or `init_boot` on Android 13+) from firmware, or use the Manager's "Select a file" flow which can now save a copy of the stock image for restoration.
2. **Get temporary root (optional shortcut).** If your device supports `fastboot boot` and you have a KernelSU-patched GKI boot image for your KMI (from a community build you trust, or one you built yourself), you can temporary-boot it:
   ```bash
   adb reboot bootloader
   fastboot boot kernelsu_gki.img
   ```
   Install the Manager, then use **Direct install**, which patches your own image and flashes it for you. Official releases no longer include GKI boot images, so a plain stock image will not give you root this way.
3. **Or patch manually:** Manager -> install icon -> **Select a file** -> pick your `boot.img` / `init_boot.img`. The Manager and `ksud` carry the LKM images for each KMI, so patching happens locally and produces a ready-to-flash image.
4. **Flash the patched image:**
   ```bash
   adb reboot bootloader
   fastboot flash init_boot kernelsu_patched_*.img   # boot.img on Android 12 and older
   fastboot reboot
   ```
5. **Verify:** the Manager should show `Installed` and the working mode (LKM). Then:
   ```bash
   adb shell su -c id
   ```

**Upgrading:** use **Direct install** on a rooted device, or **Install to inactive slot** right after an OTA on A/B devices. The Manager keeps a stock-image backup (keyed by SHA1, stored under `/data/adb/ksu`) so **Uninstall -> Restore stock image** can return the device to stock without firmware downloads.

### Method 2: ksud from a PC

**Best for:** scripted installs, damaged Manager state, or patching images offline.

```bash
# macOS/Linux/Windows binaries ship in every official release
ksud boot-patch -b init_boot.img --kmi android13-5.10
# useful flags: -u/--ota (patch the inactive slot), -f/--flash, -o/--out, --magiskboot, --out-name
```

The same `ksud` runs on-device at `/data/adb/ksud`. Note that `ksud` also works from **recovery** on GKI devices, because the KernelSU kernel module is loaded during recovery as well. That makes it the fastest recovery tool for a broken module setup.

### Method 3: Community or custom kernel

**Best for:** devices that show `Unsupported`, non-GKI hardware, and users who want SUSFS compiled in.

Community kernels (WildKernels GKI builds, device-specific kernel repos, ROM-integrated kernels) often ship KernelSU or KernelSU-Next plus SUSFS patches. Flash them with fastboot, a recovery ZIP (AnyKernel3), or a kernel flashing app, and match KMI plus security patch level exactly.

Since SUSFS is now available as a loadable kernel module, a custom kernel is no longer strictly required for SUSFS hiding on GKI devices. See [Root Hiding & Play Integrity](#root-hiding-and-play-integrity).

---

## Metamodules and Modules

### What is a Metamodule?

Since the KernelSU 3.0 line, core KernelSU does not mount anything. A **metamodule** owns installation and mounting for all other modules. KernelSU-Next and BakaSU follow the same model; SukiSU-Ultra keeps mounting in its core and treats metamodules as optional.

- Modules that **only** use scripts, `sepolicy.rule`, `system.prop` or WebUI work **without** a metamodule.
- Modules that write to `/system`, `/vendor`, `/product` and similar **need** a metamodule, otherwise they install but nothing changes.
- Only **one** metamodule can be active. Upgrading from a pre-3.0 install to 3.0+ requires reinstalling modules.

Metamodules also reduce the detection surface: the root solution itself is not the thing creating mounts.

> [!WARNING]
> Metamodules run with root and can mount anything. Install them only from the official repository or the project's own release page. Several metamodule projects have been renamed, moved or removed over the past year, so verify the link before flashing.

### Available Metamodules

| Metamodule | Approach | Notes |
|------------|----------|-------|
| **[meta-overlayfs](https://kernelsu.org/guide/metamodule.html)** | OverlayFS + ext4 image | The reference implementation named in the KernelSU docs. Its repository has moved between owners, so follow the link in the official docs rather than an old bookmark |
| **[Hybrid Mount](https://github.com/Hybrid-Mount/meta-hybrid_mount)** | OverlayFS + Magic Mount + VFS, per module and per path | Listed as a metamodule in the official module repository, WebUI, config via `config.toml` |
| **[mountify](https://github.com/backslashxx/mountify)** | OverlayFS with tmpfs/ext4 sparse storage | Works on APatch and Magisk as well as KernelSU |
| **Magic Mount RS** | Magic Mount (bind mount) semantics | For older or picky environments where OverlayFS misbehaves |
| **[ZeroMount](https://github.com/Enginex0/zeromount)** | Mountless VFS path redirection | Optional SUSFS integration, developer-oriented |
| **[NoMount](https://github.com/maxsteeel/nomount)** | Mountless: VFS path redirection with per-app UID isolation | Nothing is mounted, so nothing appears in `/proc/mounts`. Needs kernel integration, but prebuilt modules cover GKI kernels. The newer [NoMount Suite](https://github.com/Bouteillepleine/NoMount-Suite) uses its own kernel engine and is in beta |

> **Recommendation:** start with the metamodule currently listed in the [official module repository](https://modules.kernelsu.org/) (filter "Metamodules only"). Use Hybrid Mount or mountify when you need per-module mount control or extra storage options, and NoMount when leaving no mount table traces matters more than convenience.

**Switching metamodules:** uninstall regular modules -> uninstall the metamodule -> reboot -> install the new metamodule -> reinstall modules -> reboot. Skipping the reinstall step is the usual cause of "modules install but do nothing".

### Installing Modules

1. KernelSU Manager -> Modules -> **Install from storage** (plus button) -> pick the ZIP.
2. Reboot when prompted and confirm the module shows as enabled and not "mounted: no".

**CLI alternative:**

```bash
ksud module install /data/local/tmp/module.zip
ksud module list
ksud module enable <id>
ksud module disable <id>
ksud module remove <id>
```

### Module Compatibility

| Module type | Requirement |
|-------------|-------------|
| Magisk-style systemless modules | A metamodule for anything mounted |
| Zygisk modules | [ZygiskNext](https://github.com/LSPosed/ZygiskNext) (closed source, most compatible), [ReZygisk](https://github.com/PerformanC/ReZygisk) plus [Treat Wheel](https://github.com/PerformanC/Treat-Wheel-Zygisk), or NeoZygisk |
| KPM (kernel patch modules) | SukiSU-Ultra, or `KPatch-Next` on KernelSU-Next and Magisk |
| WebUI modules | Manager with WebUI support; the module ships `webroot/index.html` |
| Kernel modules (`.ko`) | `ksud insmod` with kallsyms access, used by SUSFS LKM loaders |

Browse installable modules at the [official module repository](https://modules.kernelsu.org/). It publishes immutable GitHub releases straight from the authors and tags metamodules explicitly.

### Module WebUI

Modules can expose a small web interface that the Manager renders in its embedded WebView. The module places its page at `webroot/index.html` and uses KernelSU's JavaScript APIs for module actions. Treat a WebUI page like executable code from the module author: it can perform privileged actions.

- Open it from the module card in the Manager, not from an arbitrary URL.
- Standalone hosts exist for modules with WebUI support outside the Manager: [KsuWebUIStandalone](https://github.com/5ec1cff/KsuWebUIStandalone), [MMRL](https://github.com/MMRLApp/MMRL) and its portable [WebUI X](https://github.com/MMRLApp/WebUI-X-Portable) runtime.
- Check the module's own documentation for the Manager or host version it expects.

---

## App Profile System

App Profile is KernelSU's fine-grained permission model. Instead of only granting or denying `su`, you describe what an app can see and do.

- Root: grant, deny, or grant with a profile
- UID, GID and supplementary groups
- Linux capabilities and SELinux domain for root processes
- Filesystem and mount visibility (including "should this app see module mounts")
- Non-root behavior, which lets you hide mounts from an app without denying root

### Typical profiles

| Profile | Root | Mounts | Use case |
|---------|------|--------|----------|
| Sensitive app | Denied | Hidden | Banking, payments, anti-cheat |
| Root tool | Granted | Visible | Kernel managers, backup and debloat tools |
| Shell/ADB | Granted | Visible | Debugging, `ksud` work |

Apply: KernelSU Manager -> Superuser -> choose app -> edit profile, then restart the app. Profiles are what most detection-sensitive apps actually react to, so configuring them is more valuable than adding another hiding module.

> [!TIP]
> Profile storage can be exported and re-imported in current builds. Keep a copy before wiping or switching variants.

---

## Root Hiding and Play Integrity

Hiding root in 2026 is a stack, not a single module. KernelSU covers the kernel layer; you still need a userspace and an attestation layer.

### The three layers

1. **Kernel:** App Profiles hide mounts per app. SUSFS adds filesystem-level hiding (path, kstat, stat and mount spoofing). KernelSU also supports hiding its own SELinux additions, which removes a well-known detection signal.
2. **SUSFS, compiled-in or loaded:** SUSFS used to require a SUSFS-patched kernel. It is now also available as a loadable kernel module (`susfs_guard_lkm`) loaded through `ksud` or a loader module. KernelSU-Next ships prebuilt modules per KMI and can load them itself; other variants use community loader modules. This makes SUSFS practical on stock GKI kernels without recompiling. Full setup is in the [SUSFS Root Hiding Guide](./susfs-guide.md).
3. **Userspace and attestation:** a Zygisk implementation plus a hiding module, and a Play Integrity stack for apps that use attestation. The module list, versions and configuration table live in [Root Hiding & Play Integrity](../apps-and-modules/root-management#root-hiding-play-integrity) and [Troubleshooting](../troubleshooting.md#play-integrity-and-banking-apps), so this guide only covers what changes for KernelSU.

### What is realistic

| Verdict | Feasible on a rooted, unlocked device? |
|---------|----------------------------------------|
| `MEETS_BASIC_INTEGRITY` | Usually yes with a fingerprint spoofer and a clean hide stack |
| `MEETS_DEVICE_INTEGRITY` | Yes, but on Android 13+ it requires spoofing the hardware-backed attestation signal, not only props |
| `MEETS_STRONG_INTEGRITY` | Depends on a hardware keybox that Google has not revoked. Valid, unrevoked keyboxes are scarce and get revoked without warning |

Key points that save hours:

- Never buy a keybox. "Extracted" keyboxes are scams, and every widely shared keybox is revoked quickly.
- If detection is package-name based, use the spoofed Manager build some forks ship, and keep the Manager off any app list it does not need to be on.
- Keep only one attestation spoofer installed. Mixing TrickyStore-style and TEESimulator-style modules causes failures that look like bank-app bugs.
- Do not repeatedly run integrity checks; checkpoint apps can push Google to revoke the key you are using.
- TEESimulator-style modules (software simulation of hardware key attestation) are now the common choice on devices with a broken or unreliable TEE, while TrickyStore-style modules remain in use where the TEE works and a keybox is available.
- All-in-one stacks (Specter, Integrity-Box, AlwaysStrong and similar) bundle fingerprint, keybox rotation and target lists. They are convenient but add attack surface; prefer them only if you understand what they fetch and install.

> [!WARNING]
> No setup passes everything. Some banks and games use server-side checks, app-list checks or their own SDKs. Always test your specific apps, and never weaken your device's security beyond what you need.

---

## Troubleshooting

### Common Issues and Fixes

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| Manager shows `Unsupported` | Kernel is not GKI 2.0 patched | Use a community kernel or build one with the DDK toolchain; or switch to KernelSU-Next or SukiSU-Ultra for wider kernel support |
| Manager shows `Not installed` after flashing | Wrong KMI, wrong image, wrong partition | Recheck KMI, and whether your device patches `boot` or `init_boot` |
| Manager warns about a version mismatch | Manager and kernel are from different KernelSU versions | Update the Manager, or reinstall the kernel, so both match |
| Modules install but nothing mounts | No metamodule active | Install a metamodule from the official repository, reboot, reinstall the module |
| Modules stopped mounting after an upgrade | KernelSU 3.0 removed built-in mounting | Install a metamodule and reinstall the affected modules |
| Bootloop after a module | Module or mount configuration | Use safe mode (see below) or `ksud`, then remove the module |
| Root apps get no prompt | App profile denies root, or the app is not allowlisted | Check Superuser entries and the app's profile |
| Banking app still detects root | Detection beyond mounts and props | Combine App Profiles, SUSFS and Zygisk hiding; some apps will still refuse |
| Play Integrity fails after working | Keybox revoked or fingerprint stale | Refresh the fingerprint and keybox from your chosen module, clear Play Services and Play Store data, reboot |

### Recovery

**Safe mode (built-in):** right after the first boot screen, press **Volume Down three separate times** (press-release, press-release, press-release). All modules are disabled and the Manager lets you uninstall them. The system's own safe mode also disables KernelSU modules. Note that `initrc/` injections still run in safe mode, so a bad `initrc` file needs `ksud` or fastboot recovery.

**`ksud` via ADB:**

```bash
adb shell
su
ksud module list
ksud module disable <id>
ksud module remove <id>
```

If Android will not boot but recovery works, GKI devices still load the KernelSU kernel module there, so `/data/adb/ksud` can be used from recovery to disable or remove modules.

**Flashing back to stock:** the last resort, and the reason to keep the stock image.

```bash
adb reboot bootloader
fastboot flash init_boot stock_init_boot.img   # or boot on Android 12 and older
fastboot reboot
```

On A/B devices, flash the slot that is actually booting, or switch slots.

> [!WARNING]
> Never install modules from unknown sources. Modules run as root and can disable your device permanently. Read the module's source or reputation first.

---

## Next Steps

1. Configure **App Profiles** for banking, payment and anti-cheat apps before adding anything else.
2. Install a **metamodule**, then the modules you actually need (Zygisk implementation, hiding stack).
3. Harden with **SUSFS** (compiled-in or as a loaded kernel module) if your threat model needs it. The [SUSFS Root Hiding Guide](./susfs-guide.md) covers requirements, installation, configuration and verification.
4. Explore: [LSPosed Framework](./lsposed-guide.md), [Custom ROMs](./custom-rom-installation.md), [Root Apps Collection](../apps-and-modules/)
5. Optimize: [Ad Blocking](../general-guides/android-adblocking.md), [Debloating](../general-guides/android-apps-debloating.md)

---

## Community Resources

| Resource | Link |
|----------|------|
| Official Website | [kernelsu.org](https://kernelsu.org/) |
| Official GitHub | [github.com/tiann/KernelSU](https://github.com/tiann/KernelSU) |
| Official Module Repository | [modules.kernelsu.org](https://modules.kernelsu.org/) |
| KernelSU-Next | [github.com/KernelSU-Next/KernelSU-Next](https://github.com/KernelSU-Next/KernelSU-Next) |
| Telegram (Official) | [@KernelSU](https://t.me/KernelSU) |
| Reddit | [r/KernelSU](https://www.reddit.com/r/KernelSU/) and [r/androidroot](https://www.reddit.com/r/androidroot/) |
| Awesome KernelSU Resources | [github.com/fynks/awesome-kernelsu](https://github.com/fynks/awesome-kernelsu) |

**Getting help:** when asking, include device model, kernel release (`adb shell uname -r`), KMI, your variant and mode (LKM/GKI), how you installed it, metamodule in use, and the exact error text.
