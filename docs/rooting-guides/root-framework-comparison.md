---
layout: doc
title: Magisk vs KernelSU vs APatch
description: Detailed comparison of Magisk, KernelSU, and APatch root frameworks with practical recommendations and migration notes.
head:
  - - meta
    - property: og:title
      content: Magisk vs KernelSU vs APatch - Which Root Method is Best in 2026?
  - - meta
    - property: og:description
      content: Practical comparison of Android root frameworks with recommendations, risks, and migration notes.
  - - meta
    - property: og:image:secure_url
      content: https://awesome-android-root.xyz/images/og.png
  - - meta
    - property: og:image:alt
      content: Magisk vs KernelSU vs APatch - Root Framework Comparison
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
      content: Magisk vs KernelSU vs APatch - Root Framework Comparison
  - - meta
    - name: twitter:description
      content: Practical comparison of Android root frameworks with recommendations, risks, and migration notes.
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

# Magisk vs KernelSU vs APatch

Root frameworks change fast. Version and activity badges on this page are generated from GitHub, so they stay current. Other facts were verified against upstream READMEs and official docs on **14 October 2026**. Verify device-specific steps in the official docs before flashing anything.

**Related guides:**
- [Main Rooting Guide](./index.md)
- [Magisk Guide](./magisk-guide.md)
- [KernelSU Guide](./kernelsu-guide.md)
- [APatch Guide](./apatch-guide.md)

::: warning Before you root
Unlocking the bootloader usually wipes data, weakens device security, and can break OTA, warranty, DRM, wallet, banking, and work-profile apps. Keep a stock firmware package and a recovery plan ready.
:::

## Current status

| Project | Latest release | Last commit | What to know |
|---|---|---|---|
| **Magisk** | ![Magisk stable](https://img.shields.io/github/v/release/topjohnwu/Magisk?label=stable) ![Magisk including betas](https://img.shields.io/github/v/release/topjohnwu/Magisk?include_prereleases&label=incl.%20betas) | ![Magisk last commit](https://img.shields.io/github/last-commit/topjohnwu/Magisk?label=last%20commit) | Stable channel moves slowly. The beta line is the app rewrite (Jetpack Compose, Material 3, built-in terminal, boot image extraction from remote OTA URLs, **Zygisk for Android 17**). Legacy APK still published |
| **KernelSU** | ![KernelSU release](https://img.shields.io/github/v/release/tiann/KernelSU?label=stable) | ![KernelSU last commit](https://img.shields.io/github/last-commit/tiann/KernelSU?label=last%20commit) | Manager APK, `ksud`, and LKM `.ko` per KMI (`android12-5.10` through `android17-6.18`); **no ready-to-flash `boot.img`** |
| **KernelSU Next** | ![KernelSU Next release](https://img.shields.io/github/v/release/KernelSU-Next/KernelSU-Next?label=stable) | ![KernelSU Next last commit](https://img.shields.io/github/last-commit/KernelSU-Next/KernelSU-Next?label=last%20commit) | Kernels 4.4 to 6.18, ships SUSFS LKM per KMI, spoofable package name |
| **SukiSU-Ultra** | ![SukiSU-Ultra release](https://img.shields.io/github/v/release/SukiSU-Ultra/SukiSU-Ultra?label=stable) | ![SukiSU-Ultra last commit](https://img.shields.io/github/last-commit/SukiSU-Ultra/SukiSU-Ultra?label=last%20commit) | Non-GKI and GKI 1.0 backports, KPM support, built-in SUSFS controls |
| **APatch** | ![APatch release](https://img.shields.io/github/v/release/bmax121/APatch?label=stable) ![KernelPatch release](https://img.shields.io/github/v/release/bmax121/KernelPatch?label=KernelPatch) | ![APatch last commit](https://img.shields.io/github/last-commit/bmax121/APatch?label=last%20commit) | Slow release cadence, Samsung Knox support still listed as "planned" |

Read the badges as a health check: a recent "last commit" means the project is alive, while months of inactivity or a version badge reporting no releases means you should check the repository before trusting any guide that recommends it.

## Quick recommendation

| If you want... | Choose | Why |
|---|---|---|
| The safest default for most devices | **Magisk** | Broadest compatibility, largest module ecosystem, easiest recovery |
| Fewer root traces on a supported device | **KernelSU** or a variant | Kernel root, only permitted apps see `su`, easier SUSFS access |
| Kernel-level root with per-app control on a GKI 2.0 device | **KernelSU** | Root in kernel space, App Profiles restrict UID, groups, capabilities, SELinux |
| Kernel root on a non-GKI or older kernel | **KernelSU Next** or **SukiSU-Ultra** | Wider kernel range (4.4 to 6.18) and built-in SUSFS support |
| KernelPatch features such as KPM kernel hooks | **APatch** | ARM64 only, kernel 3.18 to 6.12, needs a strong SuperKey |
| Root without unlocking the bootloader (temporarily) | **[GhostLock temp root](./root-without-unlocking-bootloader.md)** | Session-only root via CVE-2026-43499 on select devices; no Knox trip, nothing survives a reboot |
| Maximum reliability for banking, wallet, enterprise, or anti-cheat apps | **No root** | No framework can guarantee Play Integrity or app-specific checks |

## Quick comparison

| Area | Magisk | KernelSU | APatch |
|---|---|---|---|
| **Install model** | Patches `boot.img`, `init_boot.img`, recovery, or `vendor_boot.img` | LKM module into the stock kernel, or a KernelSU-enabled kernel | Patches the stock `boot.img` with KernelPatch |
| **Best for** | Beginners, daily drivers, module-heavy setups | Power users on GKI devices | KernelPatch use cases and edge cases |
| **Main requirement** | Unlocked bootloader, Android 6.0+ | GKI 2.0 (kernel 5.10+) officially; 4.14+ needs a manual kernel build | ARM64, kernel 3.18 to 6.12, `CONFIG_KALLSYMS` |
| **Android 17 (API 37)** | Core root works on stable; **Zygisk needs the beta line** | LKM shipped for `android17-6.18` | Covers 6.12 kernels; **6.18 kernels are out of range** |
| **Modules** | Magisk modules, Zygisk modules | Metamodule-based since v3.0; many Magisk modules need a compatible metamodule | APModule plus KPModule for kernel-level code (metamodule support added to `apd`) |
| **Root control** | App-based MagiskSU prompts | App Profiles with fine-grained privileges | SuperKey-based access control |
| **Hiding / integrity** | No built-in hiding (upstream FAQ states this directly) | Kernel-level traces are smaller; SUSFS can be loaded as an LKM | Kernel-level, but no guarantee |
| **OTA behavior** | Re-patch or use the inactive-slot flow | LKM installs to the inactive slot without reflashing | Depends on device and install path |
| **Troubleshooting** | Easiest, largest community | Medium, kernel knowledge helps | Hardest, smallest ecosystem |
| **Latest Version** | ![Magisk release](https://img.shields.io/github/v/release/topjohnwu/Magisk?label=stable) | ![KernelSU release](https://img.shields.io/github/v/release/tiann/KernelSU?label=stable) | ![APatch release](https://img.shields.io/github/v/release/bmax121/APatch?label=stable) |

## Framework notes

### Magisk

**Best default.** Magisk is the most mature and widely documented root solution: MagiskSU, Magisk modules, MagiskBoot, and optional Zygisk for code in app processes.

**Two channels, choose deliberately:** stable ![Magisk stable](https://img.shields.io/github/v/release/topjohnwu/Magisk?label=stable) versus the beta line ![Magisk including betas](https://img.shields.io/github/v/release/topjohnwu/Magisk?include_prereleases&label=incl.%20betas). The stable channel added Android 16 QPR2 sepolicy and Zygisk support and moves slowly. The beta line rebuilt the app in Jetpack Compose with Material 3, added a built-in terminal with TTY/ANSI support for module flashing, added boot image extraction from remote OTA URLs, and added Zygisk support for Android 17 (API 37). On Android 17, core root works on stable, but Zygisk-dependent modules need the beta line.

**Use Magisk when:**
- You are rooting for the first time.
- You need the highest chance that guides, modules, and fixes already exist for your device.
- You want the simplest recovery path if a module bootloops the device (`adb shell magisk --remove-modules`, or Magisk Safe Mode).

**Watch out for:**
- Patch the correct image for your device on that same device. Never flash a patched image made by someone else.
- Upstream does not hide root. The official FAQ says "Magisk no longer handles root hiding", so hiding is entirely a community-module concern.
- On Samsung, Magisk trips Knox and the first install requires a full data wipe.

### KernelSU

**Best for supported kernels.** KernelSU grants root from kernel space, only permitted apps can see `su`, and App Profiles allow tighter control than classic superuser prompts.

**Install model:** LKM is the default on phones and patches `init_boot` on Android 13+, keeping the stock kernel. GKI mode replaces the kernel and now mainly matters for emulators, WSA/Waydroid, Knox-locked Samsung devices, and community kernels. Official releases no longer ship a ready-to-flash GKI `boot.img`, so GKI mode means using a trusted community kernel or building your own.

**Variants matter:** if the official Manager reports `Unsupported`, pick a variant instead of forcing it.
- **KernelSU Next**: kernels 4.4 to 6.18, prebuilt SUSFS LKM per KMI, spoofable package name.
- **SukiSU-Ultra**: non-GKI and GKI 1.0 backports, KPM support, built-in SUSFS controls, Magic Mount in the core.
- **BakaSU**: metamodule-based, non-GKI hooks, built-in SUSFS management.

**Watch out for:**
- Module mounting is handled by metamodules since v3.0, so a fresh install needs a suitable metamodule for systemless modifications.
- KMI or security-patch-level mismatch can bootloop. Match both.
- Knox-protected Samsung devices block LKM, so plan for GKI mode or a custom kernel there.

### APatch

**Best as an advanced alternative.** APatch is KernelPatch-based, runs root control in kernel space, and supports APModule plus KPModule for kernel code injection (inline-hook and syscall-table-hook).

**Hard limits, from the upstream README and install docs:**
- ARM64 only. Kernel versions 3.18 to 6.12 only, so Android 17 devices on `android17-6.18` are not covered.
- Kernel 6.6 support is documented as tested only on Xiaomi and OnePlus devices.
- Support for Samsung devices with security protection (Knox) is still listed as "planned".

**Use APatch when:**
- Your ARM64 device is within the supported kernel range and you need KPM or KernelPatch behavior.
- Magisk and KernelSU are a poor fit for your firmware.

**Watch out for:**
- APatch always patches `boot.img`. Do not patch `init_boot.img` or other partitions.
- SuperKey has higher privileges than root. Use a strong key (8 to 63 characters, letters and numbers, no weak keys).
- Release cadence is slow compared with the other two projects.

## Device guidance

Choose by **bootloader unlockability, firmware availability, kernel support, and recovery options**, not by brand alone.

| Device family | Practical guidance |
|---|---|
| **Google Pixel** | Easiest path. Retail, non-carrier-locked units unlock with `fastboot flashing unlock`. Magisk for most users, KernelSU if the KMI is supported. |
| **Samsung Galaxy** | Research carefully. Rooting permanently trips Knox (Samsung Wallet/Pay, Secure Folder, Samsung Pass). US/Canada variants usually show no OEM Lock option and are not unlockable. LKM is blocked, so KernelSU needs GKI mode or a custom kernel. Magisk's first install requires a full data wipe. |
| **Xiaomi / Redmi / POCO** | Unlocking requires permission through the Mi Community flow. Xiaomi removed the bootloader-unlock application entry from Mi Community (reported December 2025), so confirm the current status for your region and model before relying on it. Magisk remains the usual starting point. |
| **OnePlus** | Global retail units unlock with a single `fastboot oem unlock`. Avoid ColorOS/OxygenOS builds ending in `.500`, `.501`, or `.503`: reports from January 2026 say these trip a hardware anti-rollback fuse that permanently blocks downgrades and most unbricking methods. Units converted from ColorOS to OxygenOS generally cannot be unlocked. |
| **Nothing** | Unlockable with fastboot on retail units. Magisk first, KernelSU if the kernel path is supported. |
| **Motorola / ASUS** | Unlock policy and firmware access vary by model and region. Get the exact stock images before flashing. |
| **OPPO / Realme / vivo / Honor** | Bootloader access is the main blocker. OPPO and Realme use a discretionary Deep Test approval app; many models have no official unlock at all. Verify current regional policy before planning root. |

::: danger Samsung Knox
On Knox-protected Samsung devices, rooting or custom binaries permanently break Knox-dependent features such as Samsung Wallet/Pay, Secure Folder, and Samsung Pass. Relocking or flashing stock firmware normally does not restore them.
:::

## Play Integrity and root detection

No root framework can promise that banking, wallet, streaming, work-profile, or anti-cheat apps keep working.

- **MEETS_BASIC_INTEGRITY** can still pass on rooted devices with a clean hiding setup. Many low-risk apps only need this.
- **MEETS_DEVICE_INTEGRITY** is the verdict most banks and Wallet check. Since May 2025 it requires hardware-backed proof of a locked bootloader on Android 13+, so an unlocked bootloader fails it by design.
- **MEETS_STRONG_INTEGRITY** adds hardware key attestation plus a security patch from the last 12 months. Treat it as unavailable on an unlocked bootloader.
- Google rotated the platform attestation root in February 2026, which caused new failures in some older app builds.

Community hiding stacks (Zygisk, SUSFS, keybox-based spoofing) are a cat-and-mouse game. See the [SUSFS Root Hiding Guide](./susfs-guide.md) for the current kernel-side approach. If these apps matter more than root, keep one unrooted phone.

SUSFS is kernel level and needs KernelSU or a variant; Magisk has no equivalent. If Magisk hiding is set up correctly and an app still detects root, switching frameworks beats stacking more userspace modules.

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
3. Restore the stock boot-related image or fully uninstall Magisk.
4. Install KernelSU (LKM on Android 13+ patches `init_boot`), or flash a trusted KernelSU-enabled kernel for GKI mode.
5. Install KernelSU Manager.
6. Install a compatible metamodule if you need systemless modules.
7. Reinstall modules one at a time and configure App Profiles.

### Magisk to APatch

1. Back up your current stock `boot.img`.
2. Fully uninstall Magisk or restore the stock boot image.
3. Confirm kernel support first: ARM64, kernel 3.18 to 6.12, `CONFIG_KALLSYMS`.
4. Patch the stock `boot.img` with APatch Manager (not `init_boot.img`).
5. Set a strong SuperKey and keep it private.
6. Flash the patched `boot.img` and test root before adding modules.

### KernelSU/APatch to Magisk

1. Remove modules and document app permissions.
2. Restore stock boot-related images or flash the ROM's clean kernel or boot image.
3. Patch the correct image with Magisk on the target device.
4. Flash, boot, then reinstall only the modules you need.

## Decision checklist

Pick **Magisk** if you are new to rooting, rely on many Magisk or Zygisk modules, or do not know your kernel version.

Pick **KernelSU** if your device is GKI 2.0 (kernel 5.10+) or has a trusted KernelSU-enabled kernel, you can match KMI and security patch level, and you want App Profiles.

Pick **KernelSU Next** or **SukiSU-Ultra** if your kernel falls outside official support (non-GKI, GKI 1.0, older than 5.10) or you want SUSFS without building a kernel.

Pick **APatch** if your device is ARM64 with a 3.18 to 6.12 kernel, you accept the SuperKey risk, and you need KPModule or KernelPatch features.

Pick **no root** if banking, wallet, enterprise, or anti-cheat reliability matters more than customization, or you cannot restore stock firmware yourself.

## FAQ

**Which is best overall?**
Magisk for most users. KernelSU for GKI power users. KernelSU Next or SukiSU-Ultra for non-GKI kernels. APatch for KernelPatch use cases.

**Is Magisk still maintained?**
Yes, on both channels: stable ![Magisk stable](https://img.shields.io/github/v/release/topjohnwu/Magisk?label=stable) and the beta line ![Magisk including betas](https://img.shields.io/github/v/release/topjohnwu/Magisk?include_prereleases&label=incl.%20betas). The stable channel lags, so the app rewrite reaches users through the beta line first.

**Does Android 17 change the choice?**
Yes. Zygisk modules on Android 17 need the current Magisk beta line. KernelSU and KernelSU Next ship LKM for `android17-6.18`. APatch's documented kernel ceiling is 6.12, so devices that moved to 6.18 are out of scope.

**Which hides root best?**
None reliably. Magisk upstream explicitly does not handle hiding. Kernel-level solutions plus SUSFS reduce userspace traces, but modern apps use many signals beyond `su` visibility.

**Do Magisk modules work on KernelSU or APatch?**
Some do, some do not. Mounting method, Zygisk needs, SELinux changes, and service scripts all matter. Test one module at a time.

**Will OTA updates work?**
Sometimes. Assume root must be restored after an OTA, and keep stock images for both slots when relevant. LKM-based KernelSU has the smoothest OTA story.

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
