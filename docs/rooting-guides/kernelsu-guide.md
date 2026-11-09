---
layout: doc
title: "KernelSU Guide: Install & Modules"
description: "Learn KernelSU installation, GKI and LKM modes, KernelSU Next, modules, WebUI, app profiles and troubleshooting for supported Android devices."
head:
  - - meta
    - property: og:title
      content: "KernelSU Guide: Install & Modules"
  - - meta
    - property: og:description
      content: Learn KernelSU installation, GKI and LKM modes, KernelSU Next, modules, WebUI, app profiles and troubleshooting.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/kernelsu-guide.png
  - - meta
    - name: twitter:title
      content: "KernelSU Guide: Install & Modules"
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

KernelSU implements `su` permission checks in the kernel and manages access through its Manager app. LKM mode keeps the existing kernel but normally patches a ramdisk image to load KernelSU; GKI mode replaces the kernel. Module mounting uses a **metamodule**. This guide covers compatibility, installation, modules, app profiles and recovery.

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

KernelSU uses a kernel-side allowlist and app profiles to control root access. This changes the exposure surface compared with a userspace-based solution, but it does not make root or an unlocked bootloader undetectable.

### Core Features

- **Kernel-level `su` and allowlist** - grant access to selected apps or UIDs.
- **App Profiles** - configure UID, GID, groups, capabilities, SELinux domain and mount visibility.
- **Metamodules** - supply pluggable installation and mounting behavior for regular modules.
- **Modules** - support scripts, properties, SELinux rules, `initrc/` injection, WebUI and module configuration; system-file mounting requires a compatible metamodule.
- **`ksud` CLI** - provides image patching, module management and other commands such as `late-load` and `soft-reboot`.
- **Optional kernel features** - supported builds can offer ADB root and a kernel-side event log (`sulog`). Enable privileged features only when needed.

Use the [official releases](https://github.com/tiann/KernelSU/releases) for the Manager and matching tools or LKM artifacts. Check the Manager's compatibility warnings and use a compatible Manager and kernel from the same variant.

### KernelSU vs Alternatives

| Feature | KernelSU | Magisk | APatch |
|---------|----------|---------|--------|
| Architecture | Kernel-based | Ramdisk/`init` | KernelPatch |
| App control | App Profiles and allowlist | Superuser policies | SuperKey-based access |
| Module mounting | Metamodule for system files | Built-in | Built-in |
| Zygisk | External implementation | Built-in | External implementation |
| Hiding / integrity | App Profiles and optional tools; no guarantee | Community tools; no built-in root hiding | No guarantee |

**Choose KernelSU if:** your kernel and device are supported and you want kernel-level root with per-app policies. LKM mode keeps the existing kernel, but firmware updates can replace the patched image or change compatibility.

> [!TIP]
> Detailed comparison: [Root Comparison](./root-framework-comparison.md)

---

## KernelSU Variants

The KernelSU ecosystem is now mostly forks. Names, maintainers and repositories change quickly, so check that a project is still receiving commits before flashing its kernel.

| Variant | Kernel support | Notes |
|---------|----------------|-------|
| **[Official KernelSU](https://github.com/tiann/KernelSU)** | GKI 2.0 (5.10+), manual backports for older | LKM-first, metamodule-based, official module repository |
| **[KernelSU-Next](https://github.com/KernelSU-Next/KernelSU-Next)** | See the fork's kernel requirements | Metamodule-based, ships prebuilt SUSFS LKM `susfs_guard_lkm.ko` per KMI, module and app profile backup, risk detection that blocks suspicious modules, spoofed-package Manager builds |
| **[SukiSU-Ultra](https://github.com/SukiSU-Ultra/SukiSU-Ultra)** | GKI 2.0, plus non-GKI/GKI 1.0 backports | [Metamodule-based mounting](https://github.com/SukiSU-Ultra/SukiSU-Ultra/blob/main/userspace/ksud/src/init_event.rs), KPM with a compatible kernel configuration, SUSFS controls in the Manager |
| **[BakaSU](https://github.com/Baka-SU/BakaSU)** (formerly ReSukiSU) | GKI 2.0, manual hooks down to 3.4 | Metamodule-based, built-in SUSFS management, multi-manager support (official or KOWX712 KernelSU Manager can manage its kernel) |
| **[Wild KSU](https://github.com/WildKernels/Wild_KSU)** | Discontinued | Repository archived in 2026; the WildKernels kernel repos still publish KernelSU/KernelSU-Next builds |

**How to pick:**
- Supported GKI device, stock or near-stock firmware: consider **official KernelSU** in LKM mode after checking the Manager.
- You want SUSFS or module backup: check whether **KernelSU-Next** supports your exact device and kernel.
- Non-GKI or KPM support: consider **SukiSU-Ultra** after checking your device, kernel and required configuration.
- You want a second manager or old-kernel manual hooks: **BakaSU**.

> [!WARNING]
> Everything except official KernelSU is community code. A fork can add detection vectors, drop in maintenance, or rename itself (ReSukiSU to BakaSU is the recent example). Read the project's own README before assuming features carry over. [KernelSU Next](https://github.com/KernelSU-Next/KernelSU-Next) also warns that some recent `x86_64` kernels may panic; check the fork's compatibility notes before installing.

---

## Installation Modes

The [upstream guide](https://kernelsu.org/guide/installation.html) describes LKM and GKI modes. It recommends LKM for supported phones and GKI for environments such as emulators. Neither mode is universal; verify the exact kernel, firmware and device before flashing.

### LKM Mode (Loadable Kernel Module)

LKM mode loads KernelSU into the existing kernel. A standard persistent installation patches a ramdisk-containing image, not the kernel itself.

| Benefits | Constraints |
|----------|-------------|
| Retains the existing kernel | Requires a supported kernel and compatible KMI |
| Manager can update an existing installation | OTA and inactive-slot support depend on the device and update |
| Can be unloaded temporarily on supported setups | Boot image layout and module-loading restrictions vary |

Upstream describes patching `boot.img` or `init_boot.img` depending on the device. Verify the ramdisk image and target partition for your exact firmware and variant; **never choose the partition from the Android version alone**. For example, a device upgraded to Android 13 or later may still use `boot`. Other layouts require device-specific and version-specific verification.

### GKI Mode (Generic Kernel Image)

GKI mode replaces the kernel rather than merely loading an LKM, and may lose device-specific kernel tuning. A matching KMI is necessary but not sufficient: kernel compression, device-specific requirements, security patch level and anti-rollback rules also matter. Keep the matching stock firmware ready.

The [official releases](https://github.com/tiann/KernelSU/releases) provide the Manager, `ksud`/`ksuinit` and architecture/KMI-specific LKM assets. Check the assets actually offered for the release you choose; older installation pages may still describe GKI images that are no longer provided. Upstream's [GKI build guide](https://kernelsu.org/guide/how-to-build.html) is archived and says official GKI-image support was dropped; it recommends [DDK](https://github.com/Ylarod/ddk) for LKM builds instead. For a KernelSU-enabled kernel, use a trusted device-compatible build.

Samsung's Knox protections can prevent LKM loading, but GKI mode is not a guaranteed workaround. A custom image still requires a compatible, unlockable device, can trip Knox permanently and has its own recovery procedure.

### Which Mode to Choose?

| Device or situation | Starting point | Verify first |
|---------------------|----------------|--------------|
| Supported stock or near-stock phone | LKM | Kernel support, ramdisk image and OTA procedure |
| Samsung with Knox protections | Device-specific research | Bootloader unlock, compatible kernel, permanent Knox effects and recovery |
| Custom ROM or kernel | LKM or an integrated kernel | Whether the exact kernel already includes KernelSU and which Manager it needs |
| Emulator, WSA or Waydroid | GKI or platform-specific integration | The environment's own installation method |

Do not assume that a custom ROM includes KernelSU or that a kernel for another model will boot.

---

## Prerequisites

::: danger ESSENTIAL
- **Unlocked bootloader** - Complete [bootloader unlocking](./how-to-unlock-bootloader.md) first
- **A full backup** of important data (bootloader unlock usually wipes the device anyway)
- **Exact-build stock firmware and original images** for all affected partitions and slots, with a device-specific recovery plan
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

1. Install the official Manager from [GitHub Releases](https://github.com/tiann/KernelSU/releases), or the Manager specified by your chosen variant.
2. `Not installed` indicates that the Manager considers the kernel supported; it is not a guarantee that every image, firmware or flashing method will work.
3. `Unsupported` means the official project does not support the current kernel as-is. Research a compatible custom kernel or build one; a fork is not automatically compatible either. See the [unofficial device list](https://kernelsu.org/guide/unofficially-support-devices.html).

```bash
# Kernel release and KMI
adb shell uname -r
# Example: 6.6.30-android15-8-g1234abcd -> KMI is 6.6-android15-8
# LKM asset names can use the short form, for example android15-6.6

# Android version and system security patch level
adb shell getprop ro.build.version.release
adb shell getprop ro.build.version.security_patch
```

For GKI, upstream defines the KMI as `w.x-androidYY-Z`; the kernel sublevel is not part of it. A kernel's Android release label need not match the running Android version. The system security patch property is not necessarily the kernel image's patch level: check the image's metadata and the device's anti-rollback rules before installing a kernel. An older image may fail to boot or be rejected.

---

## Installation Methods

### Method 1: LKM via the Manager (recommended)

**Best for:** a supported device with a verified ramdisk-image installation path. See the [upstream LKM instructions](https://kernelsu.org/guide/installation.html#lkm-installation).

1. Back up personal data and obtain the exact-build stock firmware and original ramdisk image. Identify whether the device needs `boot`, `init_boot` or a separately documented layout, plus the correct slot and flashing method. Do not infer the target from Android version alone.
2. Install the appropriate Manager. Use its install icon and **Select a file** to patch the verified stock image or supported firmware. If offered **Backup as stock image**, select it only for a known stock input; keep an independent backup too.
3. Copy the resulting patched image to the computer. The following fastboot examples apply only to devices that support that flashing path. Enter fastboot mode and check the connection:

```bash
adb reboot bootloader
fastboot devices
```

On standard A/B devices, unsuffixed `fastboot flash` commands for a slotted partition target the current active slot by default ([AOSP](https://source.android.com/docs/core/ota/ab/ab_implement#kernel-slot-arguments)); `fastboot getvar current-slot` reports the slot selected for the next boot. Use these examples only if that is the intended slot and the image matches its firmware. For a different slot, follow the exact-device procedure instead.

Replace `kernelsu_patched.img` below with the actual output filename, and run **only the command** for the image and partition you verified.

If the verified image is `boot.img`:

```bash
fastboot flash boot kernelsu_patched.img
```

If the verified image is `init_boot.img`:

```bash
fastboot flash init_boot kernelsu_patched.img
```

4. Reboot, open the Manager and check that KernelSU is installed in LKM mode. Grant a trusted app root and verify it.

**Updates and OTAs:** On an already-rooted supported device, **Direct install** can update LKM. For a supported A/B OTA, restore the stock image first if the incremental update requires it and a matching backup is available, without rebooting. Finish installing the OTA without rebooting, then use **Install to inactive slot** before the system restart. The new kernel must still be compatible; root does not automatically survive every firmware update. If the option or a required stock backup is unavailable, follow the device's update instructions rather than guessing.

**Stock-image backup:** Direct install can back up the image only when the current slot was not already patched by KernelSU. On first installation, **Select a file** may offer to save the input as stock. **Uninstall > Restore stock image** requires a matching backup for the patched image; neither path replaces your own exact-build firmware backup. See [upstream's backup details](https://kernelsu.org/guide/installation.html#use-the-manager).

### Method 2: ksud from a PC

Download the `ksud` executable for your computer from [official releases](https://github.com/tiann/KernelSU/releases) and check its options. On macOS or Linux, make the downloaded executable runnable; the examples below assume it has been named `ksud`. On Windows run the corresponding `.exe`.

```bash
./ksud boot-patch --help
```

For example, **only** if your verified stock image is `boot.img`, the target is arm64 and the short KMI matches `android13-5.10`:

```bash
./ksud boot-patch -b boot.img --kmi android13-5.10
```

Replace the example image and KMI with those for your device. Select the target device architecture if it differs from the tool's default. The PC tool writes a patched image; flash it only to the corresponding verified partition and slot. `--ota` and `--flash` are on-device Android options, not PC-side flashing flags. See the [upstream CLI instructions](https://kernelsu.org/guide/installation.html#use-the-command-line) and the downloaded tool's help for supported options.

### Method 3: Community or custom kernel

For an unsupported kernel or device, a compatible community kernel or a [self-built kernel](https://kernelsu.org/guide/how-to-integrate-for-non-gki.html) may be an option. Check the exact device and ROM, kernel/KMI, compression, security patch level, anti-rollback rules and flashing method with that kernel's maintainer. Do not assume matching KMI alone makes an image safe.

Community kernels and variants are separate projects. Their Manager, SUSFS support, update and recovery instructions can differ from official KernelSU. Keep the exact-build stock firmware and a recovery plan before trying them.

---

## Metamodules and Modules

### What is a Metamodule?

A [metamodule](https://kernelsu.org/guide/metamodule.html) provides the mounting implementation for regular modules in current official KernelSU. Other variants may use a different model.

- Modules that only use scripts, `sepolicy.rule`, `system.prop` or WebUI can work without a metamodule.
- Modules that need systemless files mounted over `/system`, `/vendor`, `/product` or similar paths need a compatible metamodule.
- Only **one** metamodule can be installed at a time. Follow the upstream switching procedure and reinstall regular modules as directed.

> [!WARNING]
> Metamodules and modules run with root. Use trusted project releases and verify compatibility before installing them; mounting behavior does not guarantee invisibility to apps.

### Available Metamodules

| Metamodule | Approach | Notes |
|------------|----------|-------|
| **[meta-overlayfs](https://kernelsu.org/guide/metamodule.html)** | OverlayFS + ext4 image | The reference implementation named in the KernelSU docs. Its repository has moved between owners, so follow the link in the official docs rather than an old bookmark |
| **[Hybrid Mount](https://github.com/Hybrid-Mount/meta-hybrid_mount)** | OverlayFS + Magic Mount + VFS, per module and per path | Listed as a metamodule in the official module repository, WebUI, config via `config.toml` |
| **[mountify](https://github.com/backslashxx/mountify)** | OverlayFS with tmpfs/ext4 sparse storage | Works on APatch and Magisk as well as KernelSU |
| **[Magic Mount RS](https://github.com/Tools-cx-app/meta-magic_mount-rs)** | Magic Mount semantics | Check the project's manager and device requirements |
| **[ZeroMount](https://github.com/Enginex0/zeromount)** | VFS path redirection, with OverlayFS and Magic Mount fallbacks | Optional SUSFS integration; the project marks it beta |
| **[NoMount](https://github.com/maxsteeel/nomount)** | Mountless: VFS path redirection with per-app UID isolation | Requires kernel integration; check whether a prebuilt module supports your exact kernel. The newer [NoMount Suite](https://github.com/Bouteillepleine/NoMount-Suite) uses its own kernel engine and is in beta |

> **Starting point:** consult the [official module repository](https://modules.kernelsu.org/) and the [upstream metamodule guide](https://kernelsu.org/guide/metamodule.html). Check each project's requirements and security implications before choosing one.

**Switching metamodules:** uninstall regular modules -> uninstall the metamodule -> reboot -> install the new metamodule -> reinstall modules -> reboot. Skipping the reinstall step is the usual cause of "modules install but do nothing".

### Installing Modules

1. If a module needs system-file mounts, install a compatible metamodule first and reboot.
2. In KernelSU Manager, open **Modules**, choose **Install from storage** and select the trusted module ZIP. Reboot if required, then check that its intended functionality works.

From an authorized on-device root shell, `ksud` can also manage modules. For example, replace `MODULE_ID` with the exact ID from `ksud module list`:

```bash
ksud module list
ksud module disable MODULE_ID
```

To uninstall instead of disabling, use `ksud module uninstall MODULE_ID`. Check `ksud module --help` for the commands supported by your version.

### Module Compatibility

| Module type | Requirement |
|-------------|-------------|
| Magisk-style systemless modules | A metamodule for anything mounted |
| Zygisk modules | An external compatible implementation such as [ZygiskNext](https://github.com/LSPosed/ZygiskNext) or [ReZygisk](https://github.com/PerformanC/ReZygisk); check the module's requirements |
| KPM (kernel patch modules) | A compatible KPM-capable setup, such as SukiSU-Ultra with `CONFIG_KPM=y` or [KPatch-Next](https://github.com/KernelSU-Next/KPatch-Next-Module); check each project's requirements |
| WebUI modules | Manager with WebUI support; the module ships `webroot/index.html` |
| Kernel modules (`.ko`) | `ksud insmod` with kallsyms access, used by SUSFS LKM loaders |

Browse modules at the [official module repository](https://modules.kernelsu.org/), but verify each project and its compatibility before installing. KernelSU's [FAQ](https://kernelsu.org/guide/faq.html#is-kernelsu-compatible-with-magisk) warns that its module system conflicts with Magisk's Magic Mount; do not assume the two module systems can be stacked safely.

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
- Non-root behavior, including whether module mounts are unmounted for apps without root access

### Typical profiles

| Profile | Root | Mounts | Use case |
|---------|------|--------|----------|
| Sensitive app | Denied | Hidden | Banking, payments, anti-cheat |
| Root tool | Granted | Visible | Kernel managers, backup and debloat tools |
| Shell/ADB | Granted | Visible | Debugging, `ksud` work |

Apply: KernelSU Manager -> Superuser -> choose app -> edit profile, then restart the app. Profiles can limit privileges or mount visibility, but they do not guarantee that an app will accept the device.

> [!TIP]
> Grant ADB shell root only when needed. Upstream warns that a restricted root profile using the shell UID can regain full root if that UID is also allowed `su`; see [App Profile security](https://kernelsu.org/guide/app-profile.html).

---

## Root Hiding and Play Integrity

App Profiles, optional community hiding tools and Play Integrity address different signals. None guarantees that an app will accept a modified device.

### The three layers

1. **App Profiles:** control root grants and whether module mounts are visible to non-root apps.
2. **Optional kernel tools:** some supported kernels or variants provide SUSFS. Requirements depend on the device, KMI and implementation; see the [SUSFS guide](./susfs-guide.md).
3. **Userspace and attestation:** external Zygisk or integrity modules may address particular signals. Check their documentation, use trusted sources and avoid overlapping implementations.

### What is realistic

Play Integrity, Play Protect certification and an app's own root checks are separate. Google defines the Basic, Device and Strong verdicts in its [official documentation](https://developer.android.com/google/play/integrity/verdicts); requirements vary by Android version and can include hardware-backed evidence and recent security updates.

A rooted or unlocked device can fail any of these checks. App Profiles, SUSFS or a community module cannot guarantee a verdict or banking-app compatibility. Do not download or purchase leaked attestation keys. See [Play Integrity and Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps) for troubleshooting, or use an unmodified supported device for essential services.

---

## Troubleshooting

### Common Issues and Fixes

| Symptom | What to check |
|---------|---------------|
| Manager shows `Unsupported` | Kernel and variant requirements; research a compatible custom kernel rather than forcing an LKM |
| Manager shows `Not installed` after flashing | Correct firmware, KMI, image, partition and active slot |
| Manager warns of a mismatch | Use a compatible Manager and kernel from the same variant |
| Module files do not mount | Install a compatible metamodule if system-file mounting is required |
| Bootloop after a module | Try the recovery steps below; `initrc` injection can survive safe mode |
| App cannot obtain root | Review its allowlist entry and App Profile |
| Banking or integrity checks fail | Identify the exact failing signal; no root-hiding stack guarantees success |

### Recovery

**Safe mode:** after the first boot screen, rapidly press and release **Volume Down more than three times**, before the boot animation. KernelSU disables modules if it detects the presses in time. The system's own safe mode can also trigger this. A bad `initrc` injection can still run in safe mode, so this may not fix every bootloop. See [upstream rescue instructions](https://kernelsu.org/guide/rescue-from-bootloop.html).

**`ksud` via ADB:** if an authorized ADB connection and root shell are available, list modules, then disable the exact offending ID. Replace `MODULE_ID` with the value shown by the list:

```bash
adb shell
su
ksud module list
ksud module disable MODULE_ID
reboot
```

To remove it instead, use `ksud module uninstall MODULE_ID`. If Android cannot boot, `/data/adb/ksud` may be usable in a compatible recovery **only if** the required partitions are mounted, `/data` is decrypted and the binary can run there. Recovery access and module loading are not guaranteed; consult [manual rescue](https://kernelsu.org/guide/rescue-from-bootloop.html#manual-rescue), including its `initrc` cleanup steps if needed.

**Restore stock firmware:** use the exact-build stock image for each partition and slot actually changed, following the device's flashing instructions. Restoring `boot` alone will not repair an accidentally flashed `init_boot` or other partition. On Samsung, follow the device-specific firmware recovery procedure. If Magisk was installed, its upstream warns against restoring individual stock partitions and directs users to full firmware recovery. A full restore may wipe data and cannot undo Knox or a bootloader unlock.

> [!WARNING]
> Never install modules from unknown sources. Modules run as root and can cause irreversible damage.

---

## Next Steps

1. Grant root only to trusted apps and configure **App Profiles** as needed.
2. Install a **metamodule** only if your modules need system-file mounts, then install trusted modules one at a time.
3. Consider [SUSFS](./susfs-guide.md) or an external Zygisk implementation only if your device and chosen modules support them.
4. Explore [LSPosed](./lsposed-guide.md), [Custom ROMs](./custom-rom-installation.md), [Root Apps](../apps-and-modules/), [Ad Blocking](../general-guides/android-adblocking.md) and [Debloating](../general-guides/android-apps-debloating.md).

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
