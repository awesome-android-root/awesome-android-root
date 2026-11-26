---
layout: doc
title: Root Frameworks & Temporary Root
description: Compare Magisk, KernelSU, APatch and locked-bootloader temporary root, including compatibility, modules, risks and updates.
head:
  - - meta
    - property: og:title
      content: Root Frameworks and Temporary Root - Which Method is Best?
  - - meta
    - property: og:description
      content: Compare Magisk, KernelSU, APatch and locked-bootloader temporary root, including compatibility, modules, risks and updates.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/root-framework-comparison.png
  - - meta
    - property: og:image:secure_url
      content: https://awesome-android-root.xyz/images/og/root-framework-comparison.png
  - - meta
    - property: og:image:alt
      content: Root Frameworks and Temporary Root - Android Rooting Comparison
  - - meta
    - property: og:image:width
      content: '1200'
  - - meta
    - property: og:image:height
      content: '630'
  - - meta
    - property: og:image:type
      content: image/png
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: Root Frameworks and Temporary Root - Android Rooting Comparison
  - - meta
    - name: twitter:description
      content: Compare Magisk, KernelSU, APatch and locked-bootloader temporary root, including compatibility, modules, risks and updates.
  - - meta
    - name: twitter:image:alt
      content: Root Framework Comparison - Magisk vs KernelSU vs APatch
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
      content: Magisk
  - - meta
    - property: article:tag
      content: KernelSU
  - - meta
    - property: article:tag
      content: APatch
  - - meta
    - property: article:tag
      content: Root Framework Comparison
  - - meta
    - name: robots
      content: index, follow
---

# Root Frameworks & Temporary Root {#magisk-vs-kernelsu-vs-apatch}

This page compares installation models and tradeoffs, not release inventories. Check the current upstream requirements and exact-device installation instructions before making changes.

**Related guides:**
- [Main Rooting Guide](./index.md)
- [Magisk Guide](./magisk-guide.md)
- [KernelSU Guide](./kernelsu-guide.md)
- [APatch Guide](./apatch-guide.md)
- [Temporary Root Guide](./root-without-unlocking-bootloader.md)

::: warning Before you root
Unlocking the bootloader usually wipes data, weakens device security, and can break OTA, warranty, DRM, wallet, banking, and work-profile apps. Keep a stock firmware package and a recovery plan ready.
:::

## Current status

| Project | Authoritative requirements | Installation details |
|---------|----------------------------|----------------------|
| [Magisk](https://github.com/topjohnwu/Magisk) | [Upstream installation guide](https://topjohnwu.github.io/Magisk/install.html) and [release notes](https://github.com/topjohnwu/Magisk/releases) | Device-specific image/firmware patching; special Samsung workflow |
| [KernelSU](https://github.com/tiann/KernelSU) | [Installation requirements](https://kernelsu.org/guide/installation.html) and [release assets](https://github.com/tiann/KernelSU/releases) | Supported kernel/KMI, matching manager and installation mode |
| KernelSU variants | Each fork's current README and releases; see [variant selection](./kernelsu-guide.md#kernelsu-variants) | Kernel and manager compatibility are not interchangeable across forks |
| [APatch](https://github.com/bmax121/APatch) | [Supported versions/configuration](https://github.com/bmax121/APatch#supported-versions) and [install requirements](https://github.com/AndroidPatch/APatchDocs/blob/main/docs/install.md#install-requirements) | Kernel-containing `boot.img`, supported architecture/kernel configuration |

**Maintenance rule:** verify these upstream requirements whenever updating a recommendation. Avoid copying transient version/kernel ranges here; if a release-specific restriction is needed, cite the exact release and record the verification date. Commit activity or a version badge alone does not establish device compatibility or safety.

## Quick recommendation

| If you want... | Choose | Why |
|---|---|---|
| A broadly documented starting point | **Magisk** | Broad compatibility and a large module ecosystem; recovery still depends on the device |
| Kernel-level authorization and profiles | **KernelSU** or a supported variant | Verify current kernel/KMI requirements, manager and installation mode |
| A kernel unsupported by official KernelSU | Research a device-supported custom kernel or variant | Verify current requirements; a fork is not automatically compatible |
| KernelPatch features such as KPM kernel hooks | **APatch** | Verify upstream architecture, kernel and configuration requirements; protect the SuperKey |
| Root without unlocking the bootloader (temporarily) | **[DirtyFrag or GhostLock](./root-without-unlocking-bootloader.md)** | Session-only root on exact vulnerable builds; modified files may persist, and Knox behavior is not guaranteed |
| Maximum reliability for banking, wallet, enterprise, or anti-cheat apps | **No root** | No framework can guarantee Play Integrity or app-specific checks |

## Quick comparison

Temporary root is a **method**, not a fourth framework. Some loaders use KernelSU by late-loading a compatible module on a supported locked-bootloader build.

| Area | Magisk | KernelSU | APatch | Temporary root (e.g. DirtyFrag / GhostLock) |
|---|---|---|---|---|
| **Install model** | Patches `boot.img`, `init_boot.img`, recovery, or `vendor_boot.img` | LKM module into the stock kernel, or a KernelSU-enabled kernel | Patches the stock `boot.img` with KernelPatch | Runs a compatible exploit loader; some late-load KernelSU |
| **Bootloader** | Normally unlocked | Normally unlocked for standard installation | Normally unlocked | Can stay locked on supported builds |
| **Best for** | Beginners, daily drivers, module-heavy setups | Power users on GKI devices | KernelPatch use cases and edge cases | Session root on a specific vulnerable build |
| **Main requirement** | Unlocked bootloader; check [upstream Android support](https://github.com/topjohnwu/Magisk) | Verify upstream kernel/KMI requirements and Manager result | Verify upstream architecture, kernel range and `CONFIG_KALLSYMS` requirements | Exact vulnerable kernel and compatible loader, profile or module |
| **Full reboot** | Root returns with the required boot sequence; recovery installs need special steps | Root normally returns after standard installation | Root normally returns | Active root ends; some loaders can re-run it |
| **Modules** | Magisk modules, Zygisk modules | Systemless mounts require a compatible metamodule; check the selected variant | APModules and KPModules; check release-specific module support | Compatible session modules if the loader supports them; some provide a shell only |
| **Root control** | Explicit MagiskSU grants in the Superuser tab | App Profiles with fine-grained privileges | SuperKey-based access control | Depends on loader and manager; some offer only a root shell |
| **Hiding / integrity** | No built-in hiding (upstream FAQ states this directly) | App Profiles and optional tools; no guarantee | Kernel-level, but no guarantee | Locked bootloader does not guarantee Integrity or app compatibility |
| **OTA behavior** | Re-patch or use the inactive-slot flow | Depends on device and installation mode | Depends on device and install path | Update may patch the vulnerability or break the loader |
| **Troubleshooting** | Easiest, largest community | Medium, kernel knowledge helps | Hardest, smallest ecosystem | Device- and loader-specific; failed exploits can crash or reboot |

A full reboot ends active temporary root, but files and settings changed during the session can remain. Check the loader's current target list and back up before use.

## Framework notes

### Magisk

**Best default.** Magisk is the most mature and widely documented root solution: MagiskSU, Magisk modules, MagiskBoot, and optional Zygisk for code in app processes.

**Choose a channel deliberately:** stable ![Magisk stable](https://img.shields.io/github/v/release/topjohnwu/Magisk?label=stable) or the beta line ![Magisk including betas](https://img.shields.io/github/v/release/topjohnwu/Magisk?include_prereleases&label=incl.%20betas). Check the [release notes](https://github.com/topjohnwu/Magisk/releases) for Android and Zygisk support. The current app can patch supported firmware packages and grants superuser access ahead of time rather than showing interactive root prompts.

**Use Magisk when:**
- You are rooting for the first time.
- You need the highest chance that guides, modules, and fixes already exist for your device.
- You value a documented module recovery path. Magisk Safe Mode and `adb shell magisk --remove-modules` have different prerequisites; the command removes all modules and reboots.

**Watch out for:**
- Patch the correct image for your device on that same device. Never flash a patched image made by someone else.
- Upstream does not hide root. The official FAQ says "Magisk no longer handles root hiding", so hiding is entirely a community-module concern.
- On Samsung, Magisk trips Knox and the first install requires a full data wipe.

### KernelSU

**Best for supported kernels.** KernelSU grants root from kernel space, only permitted apps can see `su`, and App Profiles allow tighter control than classic superuser prompts.

**Install model:** LKM keeps the existing kernel and patches the device's verified ramdisk image, often `boot` or `init_boot`. Do not choose the partition from the Android version alone. GKI mode replaces the kernel; check the release assets and device-specific instructions before choosing a compatible build. Upstream's [GKI build guide](https://kernelsu.org/guide/how-to-build.html) is archived.

**Variants matter:** if the official Manager reports `Unsupported`, research a device-compatible kernel instead of forcing installation. Use the compact [variant selection table](./kernelsu-guide.md#kernelsu-variants) and each fork's current requirements; this page does not maintain a second feature matrix.

**Watch out for:**
- Official KernelSU uses a metamodule for systemless file mounts; scripts, properties and policy rules can work without one.
- KMI or security-patch-level mismatch can bootloop. Match both.
- Knox protections may block LKM on Samsung. A compatible custom kernel is not guaranteed and installing one may permanently trip Knox.

### APatch

**Best as an advanced alternative.** APatch is KernelPatch-based, runs root control in kernel space, and supports APModule plus KPModule for kernel code injection (inline-hook and syscall-table-hook).

**Requirements:** check the [official README](https://github.com/bmax121/APatch#supported-versions) and [installation requirements](https://github.com/AndroidPatch/APatchDocs/blob/main/docs/install.md#install-requirements) for architecture, kernel/configuration and device restrictions. Android version or manufacturer alone does not establish support.

**Use APatch when:**
- Your exact kernel and device meet upstream requirements and you need KPM or KernelPatch behavior.
- Magisk and KernelSU are a poor fit for your firmware.

**Watch out for:**
- APatch always patches `boot.img`. Do not patch `init_boot.img` or other partitions.
- SuperKey has higher privileges than root. Use a strong key (8 to 63 characters, letters and numbers, no weak keys).

## Device guidance

Choose by **bootloader unlockability, firmware availability, kernel support, and recovery options**, not by brand alone.

| Device family | Device-specific requirements |
|---------------|------------------------------|
| [Google Pixel](./how-to-root-pixel-phone.md) | Carrier eligibility, factory image, slot handling and anti-rollback |
| [Samsung Galaxy](./how-to-root-samsung-phone.md) | Model/region unlock eligibility, AP patching, Download Mode/Odin and permanent Knox effects |
| [Xiaomi / Redmi / POCO](./how-to-root-xiaomi-phone.md) | Current Mi Unlock permission/waiting rules, firmware region and ARB |
| [OnePlus](./how-to-root-oneplus-phone.md) | Exact OxygenOS/ColorOS build, unlock restrictions, partitions and rollback limits |
| [Nothing / CMF](./how-to-root-nothing-phone.md) | Exact model/build, image layout and firmware availability |
| [Motorola](./how-to-root-motorola-phone.md) | Unlock-code eligibility, carrier restrictions and matching firmware |
| ASUS, OPPO, Realme, vivo, Honor | OPPO and Realme use a discretionary Deep Test approval app, many models have no official unlock at all, and ASUS/Honor policies vary by model and region. Verify the current OEM policy before planning root. |

::: danger Samsung Knox
On Knox-protected Samsung devices, installing custom binaries can trip the irreversible warranty fuse and break Knox-dependent features such as Samsung Wallet/Pay, Secure Folder, and Samsung Pass. Relocking or flashing stock firmware normally does not restore them. Locked-bootloader temporary root does not guarantee fuse or service behavior.
:::

## Play Integrity and root detection

No root framework can promise that banking, wallet, streaming, work-profile or anti-cheat apps keep working. Use the canonical [Play Integrity and banking-app guide](../troubleshooting.md#play-integrity-and-banking-apps) for requirements and diagnosis. Optional tools such as [SUSFS](./susfs-guide.md) have their own kernel requirements and do not guarantee invisibility.

## Sideloading and app installs (2026)

Root users install managers, modules, and tools as APKs, so Google's developer verification rollout matters:

- Enforcement started **30 September 2026** in Brazil, Indonesia, Singapore, and Thailand, across Google Play and several OEM stores. Global expansion across certified devices is planned for **2027**.
- In enforced regions, apps from unverified developers no longer install through the normal path. Two paths remain: **ADB installs are exempt**, and the "advanced flow" (Developer Options, allow apps from unverified developers, restart, one-time 24 hour wait) keeps normal sideloading working.
- Custom ROMs without Google Play Services are not affected.

Practically: keep ADB working on your device, and expect an extra step when installing APKs from GitHub or F-Droid on certified firmware.

## Safe install checklist

Before installing or migrating:

- [ ] Back up internal storage and app data.
- [ ] Download the exact current firmware for your build.
- [ ] Save stock `boot.img`, `init_boot.img`, `vendor_boot.img`, `vbmeta.img`, and recovery image if present.
- [ ] Confirm bootloader unlock steps and whether unlock wipes data.
- [ ] Confirm fastboot or download-mode access and restore commands.
- [ ] Check your device forum for known bootloops, slot issues, OTA quirks, and anti-rollback or fuse-blowing updates. Pause system updates while you verify.
- [ ] Match kernel version, KMI, and security patch level before flashing anything kernel-related.
- [ ] Install only one root framework at a time.

## Migration guide

::: warning Do not stack root frameworks
Switch cleanly. Mixing patched images, modules, and managers from multiple frameworks is a common cause of bootloops and broken OTAs.
:::

### Magisk to KernelSU

1. Export your module list and app root settings.
2. Disable or uninstall risky modules.
3. Fully uninstall Magisk or restore the affected stock images using the device-specific procedure. On Samsung, follow Magisk's full-firmware instructions rather than restoring individual partitions.
4. Install KernelSU using the verified ramdisk image and partition, or a trusted device-compatible KernelSU-enabled kernel.
5. Install KernelSU Manager.
6. Install a compatible metamodule if your modules need system-file mounts.
7. Reinstall modules one at a time and configure App Profiles.

### Magisk to APatch

1. Back up your current stock `boot.img`.
2. Fully uninstall Magisk or restore the affected stock images using the device-specific procedure. On Samsung, follow Magisk's full-firmware instructions.
3. Confirm kernel support first: Verify upstream architecture, kernel range and `CONFIG_KALLSYMS` requirements.
4. Patch the stock `boot.img` with APatch Manager (not `init_boot.img`).
5. Set a strong SuperKey and keep it private.
6. Flash the patched `boot.img` and test root before adding modules.

### KernelSU/APatch to Magisk

1. Remove modules and document app permissions.
2. Restore the matching stock images for each affected partition and slot using the device's instructions. If Magisk was previously installed on Samsung, follow its full-firmware recovery procedure instead of restoring individual partitions.
3. Patch the correct image with Magisk on the target device; Samsung uses its separate AP-tar workflow.
4. Flash, boot, then reinstall only the modules you need.

## Decision checklist

Pick **Magisk** if you are new to rooting, rely on many Magisk or Zygisk modules, or do not know your kernel version.

Pick **KernelSU** if your device is GKI 2.0 (kernel 5.10+) or has a trusted KernelSU-enabled kernel, you can match KMI and security patch level, and you want App Profiles.

Consider **KernelSU Next** or **SukiSU Nova** if official KernelSU does not support your kernel or you want SUSFS. Verify the fork and available builds for your exact device first.

Pick **APatch** if your device is ARM64 with a 3.18 to 6.12 kernel, you accept the SuperKey risk, and you need KPModule or KernelPatch features.

Pick **no root** if banking, wallet, enterprise, or anti-cheat reliability matters more than customization, or you cannot restore stock firmware yourself.

## FAQ

**Which is best overall?**
Magisk for most users. KernelSU for GKI power users. KernelSU Next or SukiSU Nova for non-GKI kernels. APatch for KernelPatch use cases.

**Is Magisk still maintained?**
Yes. Compare the stable ![Magisk stable](https://img.shields.io/github/v/release/topjohnwu/Magisk?label=stable) and beta-inclusive ![Magisk including betas](https://img.shields.io/github/v/release/topjohnwu/Magisk?include_prereleases&label=incl.%20betas) channels with the [release notes](https://github.com/topjohnwu/Magisk/releases) before updating.

**Does Android 17 change the choice?**
Check each project's release notes and the actual device kernel. Magisk supports Android 17 Zygisk in releases that include that change; KernelSU LKM support depends on the KMI and architecture. APatch's documented kernel ceiling is 6.12, so devices using 6.18 are out of scope.

**Which hides root best?**
None reliably. Magisk upstream explicitly does not handle hiding. Kernel-level solutions plus SUSFS reduce userspace traces, but modern apps use many signals beyond `su` visibility.

**Do Magisk modules work on KernelSU or APatch?**
Some do, some do not. Mounting method, Zygisk needs, SELinux changes, and service scripts all matter. Test one module at a time.

**Will OTA updates work?**
Sometimes. Keep exact-build stock images and follow the device and framework OTA instructions. A supported A/B update may allow an inactive-slot installation before reboot; root persistence is not guaranteed.

**Can I relock the bootloader after rooting?**
Usually no. Relocking with modified partitions can brick or wipe the device. Return fully stock first and follow device-specific instructions.

## Official resources

- **Magisk:** [GitHub](https://github.com/topjohnwu/Magisk) · [Docs](https://topjohnwu.github.io/Magisk/) · [Install guide](https://topjohnwu.github.io/Magisk/install.html) · [FAQ](https://topjohnwu.github.io/Magisk/faq.html)
- **KernelSU:** [GitHub](https://github.com/tiann/KernelSU) · [Docs](https://kernelsu.org/) · [Installation](https://kernelsu.org/guide/installation.html) · [Metamodules](https://kernelsu.org/guide/metamodule.html)
- **KernelSU Next:** [GitHub](https://github.com/KernelSU-Next/KernelSU-Next)
- **APatch:** [GitHub](https://github.com/bmax121/APatch) · [Docs](https://apatch.dev/) · [Installation](https://apatch.dev/install.html) · [KernelPatch](https://github.com/bmax121/KernelPatch)
- **Google:** [Play Integrity verdicts](https://developer.android.com/google/play/integrity/verdicts) · [GKI release builds](https://source.android.com/docs/core/architecture/kernel/gki-release-builds)
- **In this repo:** [SUSFS Root Hiding Guide](./susfs-guide.md) · [Temporary Root Solutions](./temporary-root-solutions.md)

::: tip Final rule
When in doubt, start with Magisk. Pick KernelSU or a variant only if your exact build is supported and hiding or per-app control matters more than module choice.
:::
