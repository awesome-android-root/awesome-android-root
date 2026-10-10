---
layout: doc
title: "Root management"
description: "Root managers, metamodules, LSPosed, Zygisk, and Play Integrity tools for Magisk, KernelSU, and APatch on rooted Android."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.xyz/apps-and-modules/root-management
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:site_name
      content: Awesome Android Root
  - - meta
    - property: og:title
      content: "Root Management | Awesome Android Root"
  - - meta
    - property: og:description
      content: "Root managers, metamodules, LSPosed, Zygisk, and Play Integrity tools for Magisk, KernelSU, and APatch on rooted Android."
  - - meta
    - property: og:url
      content: https://awesome-android-root.xyz/apps-and-modules/root-management
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og.png
  - - meta
    - property: og:locale
      content: en_US
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:site
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: "Root Management | Awesome Android Root"
  - - meta
    - name: twitter:description
      content: "Root management apps, Magisk/KernelSU/APatch managers, metamodules, LSPosed & Zygisk frameworks, and root hiding & Play Integrity tools for rooted Android devices."
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og.png
---

# Root management

**Root management** covers everything you need to install, run and maintain root on your Android device:
root managers for **Magisk, KernelSU and APatch**, temporary root solutions for locked-bootloader devices,
module managers and metamodules, the **LSPosed/Xposed and Zygisk** frameworks, and the tools that keep root
hidden from apps (**Play Integrity, SUSFS**). Apps and modules live together here because they solve the same
problem - controlling root access.

**Related guide:** [Complete rooting guide](../rooting-guides/) · [Temporary root guide](../rooting-guides/root-without-unlocking-bootloader.md) · [LSPosed guide](../rooting-guides/lsposed-guide.md)

## Root managers

- **[⭐ KernelSU](https://github.com/tiann/KernelSU)** - A Kernel based root solution for Android. `FOSS`
- **[⭐ Magisk](https://github.com/topjohnwu/Magisk)** - Manage Magisk modules and root permissions. `FOSS`
- **[APatch](https://github.com/bmax121/APatch)** - The patching of Android kernel and Android system. `FOSS`
- **[FolkPatch](https://github.com/LyraVoid/FolkPatch)** - A Root management tool focused on interface optimization and feature extension, based on APatch. `FOSS`
- **[KernelSU-next](https://github.com/KernelSU-Next/KernelSU-Next)** - An advanced Kernel based root solution for Android. `FOSS`
- **[ReSukiSU](https://github.com/ReSukiSU/ReSukiSU)** - Fork of SukiSU-Ultra with additional features. `FOSS`
- **[SukiSU-Ultra](https://github.com/SukiSU-Ultra/SukiSU-Ultra)** - A kernel-based root solution for Android devices, forked from `KernelSU` with some useful changes. `FOSS`

## Temporary root (locked bootloader)

<details>

<summary><strong>What is temporary root (GhostLock)?</strong></summary>

Exploits like **GhostLock (CVE-2026-43499)** - a 15-year-old Linux kernel bug - grant root **in memory only**, for the current boot. No bootloader unlock, no flashing, no Knox trip, no data wipe: reboot and the device is bone-stock again. The trade-offs: root doesn't survive reboots, you can't flash ROMs/recoveries, and it only works on specific devices running firmware up to ~the June 2026 patch level.

<br>
</details>

- **[⭐ Root My Galaxy](https://github.com/BuSung-dev/Root-My-Galaxy)** - One-tap temporary root for Snapdragon Galaxy S24/S25 and select A-series devices; the bootloader stays locked and Knox is not tripped. `FOSS`

## Bootloop protection

- **[Anti bootloop](https://github.com/Magisk-Modules-Alt-Repo/abootloop)** - Protect from bootloops. `FOSS` `[M]`
- **[AshReXcue - Bootloop Protector](https://github.com/RipperHybrid/AshLooper)** - Prevent boot loops caused by problematic modules installed via KernelSU or Magisk. `FOSS` `[M]` `[K]`
- **[YetAnotherBootloopProtector](https://github.com/Magisk-Modules-Alt-Repo/YetAnotherBootloopProtector)** - Monitor and fix potential Bootloops and SystemUI failures. `FOSS` `[M]`

## LSPosed & Xposed

> [!NOTE]
> LSPosed allows you to use Xposed modules, that can modify or extend the functionality of your Android system and apps.

- **[⭐ Vector](https://github.com/JingMatrix/Vector)** - Open Source *Fork* of original LSPosed with dynamic module loading, and other improvements. `FOSS` `[M]`
- **[LSPosed](https://lsposed.zip)** - Riru/Zygisk module that provides ART hooks compatible with Xposed through the LSPlant framework. `Proprietary`

## Metamodules

> [!NOTE]
> **Metamodules** provides the core mounting infrastructure for the module system. Unlike regular modules that modify system files, metamodules control *how* regular modules are installed and mounted.

- **[⭐ Meta-overlayfs](https://github.com/KernelSU-Modules-Repo/meta-overlayfs)** - Official reference implementation using OverlayFS for most users and standard setup. `FOSS` `[K]`
- **[⭐ Mountify](https://github.com/backslashxx/mountify)** - OverlayFS with tmpfs/ext4 sparse support for reduced detection, works on APatch/Magisk too. `FOSS` `[M]` `[K]` `[A]`
- **[Magic Mount Metamodule](https://github.com/Tools-cx-app/meta-magic_mount-rs)** - An implementation of a metamodule using Magic Mount, based on MKSU. `FOSS` `[M]` `[K]` `[A]`
- **[Meta-hybrid_mount](https://github.com/YuzakiKokuban/meta-hybrid_mount)** - Coordinates OverlayFS, Magic Mount and Kasumi LKM with conflict monitoring, auto-fallback, WebUI and EROFS support. `FOSS` `[K]` `[A]`
- **[meta-mm](https://github.com/KernelSU-Modules-Repo/meta-mm)** - KernelSU's official Magic Mount metamodule for Magisk-compatible mounts, without extra mounting tools. `FOSS` `[K]`
- **[ZeroMount](https://github.com/Enginex0/zeromount)** - Mountless module loading with Kernel-level VFS path redirection & SUSFS integration, WebUI, bootloop guard, and strategy fallback. `FOSS` `[M]` `[K]` `[A]`

## Module managers

- **[⭐ MMRL](https://github.com/DerGoogler/MMRL)** - An Android app that helps manage your own modules repository. `FOSS` `[M]` `[K]` `[A]` | [🌱](https://f-droid.org/en/packages/com.dergoogler.mmrl/) | [▶️](https://play.google.com/store/apps/details?id=com.dergoogler.mmrl)
- **[KPatch Next Module](https://github.com/KernelSU-Next/KPatch-Next-Module)** - Standalone implementation of KPM (KernelSU Patch Module) support for Magisk/KernelSU with WebUI. `FOSS` `[M]` `[K]`
- **[Magisk Manager for Recovery Mode](https://github.com/Rikj000/Magisk-Manager-for-Recovery-Mode)** - Easily manage your Magisk Modules from a terminal session in your custom recovery. `FOSS` `[M]`

## Root detection & testing

- **[⭐ Android-Native-Root-Detector](https://github.com/reveny/Android-Native-Root-Detector)** - A tool for detecting root on android. `FOSS`
- **[⭐ Duck Detector Fork](https://github.com/rrr333nnn333/Duck-Detector-Refactoring)** - Duck Detector fork with additional features and improvements. `FOSS`
- **[Android-Device-Trust](https://github.com/reveny/Android-Device-Trust)** - Android device attestation and fingerprinting tool. `FOSS`
- **[Chunqiu Detector](https://github.com/mingzun09/Chunqiu-Detector-Problem-solution)** - Solutions, scripts, and modules for bypassing and troubleshooting Chunqiu Detector checks on rooted Android devices. `FOSS`
- **[Duck Detector](https://github.com/eltavine/Duck-Detector-Refactoring)** - Android environment integrity inspection tool for root, hook, bootloader, SELinux, virtualization, and attestation signals. `FOSS`
- **[Key Attestation](https://github.com/VisionR1/KeyAttestation)** - Generates, saves, parses and verifies Android key and ID attestation certificate chains for self-testing and diagnostics. `FOSS`
- **[Kknd Root Detector](https://github.com/juanma0511/Kknd_Root_Detector)** - Deep root, hook framework, SELinux and system integrity detection combining native C++ and Kotlin checks. `FOSS`
- **[MagiskDetection](https://github.com/apkunpacker/MagiskDetection)** - Collection of Some publicly Available POC Apps to Detect Root/Magisk presence. `Proprietary`
- **[PIF Detector](https://github.com/IR0NBYTE/playIntegrityFixDetector)** - Native app designed to detect modifications, bypasses, or "fixes" applied to the Google Play Integrity API. `FOSS` `[M]` `[K]`
- **[Play Integrity Alert](https://github.com/Xiddoc/PlayIntegrityAlert)** - Get notified when an app calls the Play Integrity API. `FOSS` `[LSP]`
- **[Play Integrity API Checker](https://github.com/1nikolas/play-integrity-checker-app)** - Shows device integrity reported by Google Play Services to help identify root or system tampering. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=gr.nikolasspyr.integritycheck)
- **[Securify](https://github.com/RabehX/Securify)** - Yet Another Root Checker and Play Integrity API Application. `FOSS`
- **[ZygoteNextProbe](https://github.com/XiaoTong6666/ZygoteNextProbe)** - Checks whether Android 17's zygote_next isolated services expose global mounts used by Magisk, Zygisk or LSPosed. `FOSS`

## Root hiding & Play Integrity

<details><summary><strong>What is Play Integrity?</strong></summary>

A Google API that lets apps verify a device is "genuine" - unmodified, Play-certified, and bootloader-locked. Apps use it to block rooted/modified devices. Verdicts: `MEETS_BASIC_INTEGRITY` < `MEETS_DEVICE_INTEGRITY` < `MEETS_STRONG_INTEGRITY`.
</details>

<details><summary><strong>Why hide root?</strong></summary>

Banking, payment, and some streaming/game apps detect root and refuse to run. Hiding root lets them work on a rooted device.
</details>

<details><summary><strong>What's realistic in 2026?</strong></summary>

Since Google's mid-2025 changes, `DEVICE_INTEGRITY` requires a **locked bootloader on Android 13+**, and `STRONG_INTEGRITY` needs an **unrevoked hardware keybox** (increasingly scarce). For most rooted users, passing `BASIC` + `DEVICE` integrity (via PIF + TrickyStore) is the practical ceiling - chasing `STRONG` is a deep, often futile rabbit hole.
</details>

- **[⭐ HMA-OSS](https://github.com/frknkrc44/HMA-OSS)** - FOSS rewrite of Hide My Applist; hides your app list, settings, and package installers. `FOSS` `[LSP]`
- **[⭐ Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)** - Hides Magisk root from detection. `Proprietary` `[M]`
- **[⭐ TEESimulator](https://github.com/JingMatrix/TEESimulator)** - Create a complete, software-based simulation of a hardware-backed Trusted Execution Environment (TEE) for Key Attestation. `FOSS` `[M]` `[K]`
- **[Always Strong](https://github.com/evoker0/AlwaysStrong)** - Bundles TEESimulator-RS and PlayIntegrityFork into a single module for strong integrity on rooted devices. `FOSS` `[M]` `[K]`
- **[AuditPatch](https://github.com/silvzr/AuditPatch)** - Hooks `logd` to replace sensitive SELinux contexts in the audit log, fixing AVC log leak detection without SUSFS or ZygiskNext. `Proprietary` `[M]` `[K]`
- **[DirtySepolicy Bypass](https://github.com/flipphoneguy/DirtySepolicy_Bypass)** - Bypasses new DirtySepolicy on rooted Android devices to keep apps working. `FOSS` `[M]` `[K]` `[A]`
- **[Komodo Build Props](https://github.com/Elcapitanoe/Komodo-Build-Prop#komodo-build-props)** - Spoofs your device as a Pixel 9 Pro XL (komodo). `FOSS` `[M]`
- **[NoHello](https://github.com/MhmRdd/NoHello)** - Lightweight Zygisk module to hide root. `FOSS` `[M]`
- **[OhMyKeymint](https://github.com/qwq233/OhMyKeymint)** - Custom keystore implementation for Android Keystore Spoofer. `FOSS` `[M]` `[K]`
- **[Play Integrity Fix (inject)](https://github.com/KOWX712/PlayIntegrityFix)** - Actively maintained fork using injected GMS/Play Store spoofing with a WebUI. `FOSS` `[M]`
- **[Play Integrity Fork (PIF)](https://github.com/osm0sis/PlayIntegrityFork)** - Maintained Play Integrity Fix module that adjusts device properties to address DEVICE_INTEGRITY verdicts. `FOSS` `[M]`
- **[PlaycurlNEXT](https://github.com/daboynb/playcurlNEXT)** - Fixes Play Integrity (and SafetyNet) verdicts with custom fields and props. `FOSS` `[M]` `[K]`
- **[ReZygisk's Treat Wheel](https://github.com/PerformanC/Treat-Wheel-Zygisk)** - Hides Magisk/root traces exclusively for ReZygisk, acting as the best userspace root hiding tool. `FOSS` `[M]` `[K]`
- **[Sensitive Props](https://github.com/Pixel-Props/sensitive-props)** - Modifies system properties and applies device-specific fixes to bypass SafetyNet/Play Integrity. `FOSS` `[M]`
- **[Specter](https://github.com/dpejoh/specter)** - Unified Play Integrity and root hiding stack for Android. Successor of Yurikey. `FOSS` `[M]` `[K]`
- **[TEESimulator-RS](https://github.com/Enginex0/TEESimulator-RS)** - Fork of TEESimulator with native Rust certificate generation, key persistence, and AOSP-compliant attestation behavior. `FOSS` `[M]` `[K]`
- **[Tricky Addon – Update Target List](https://github.com/KOWX712/Tricky-Addon-Update-Target-List)** - KSU WebUI to configure TrickyStore's `target.txt`. `FOSS` `[K]`
- **[TrickyStore](https://github.com/5ec1cff/TrickyStore)** - Modifies the certificate chain for Android key attestation (keybox-based). The original/reference module. `Proprietary` `[M]` `[K]`
- **[TrickyStore OSS](https://github.com/beakthoven/TrickyStoreOSS)** - Open-source alternative to TrickyStore. `FOSS` `[M]` `[K]`
- **[YuriKey](https://github.com/dpejoh/yurikey)** - Systemless module to obtain strong integrity easily. `FOSS` `[M]` `[K]`
- **[Zygisk Assistant](https://github.com/snake-4/Zygisk-Assistant)** - Zygisk module to hide root on KernelSU, Magisk, and APatch. `FOSS` `[M]`

---

## Susfs

<details><summary><strong>What is SUSFS?</strong></summary>
SUSFS (Systemless User Space File System) is a kernel-level module that allows root-hiding and system modifications without altering the system partition. It provides a stealthy environment for modules to operate, making it harder for apps to detect root or modifications.

</details><br>

- **[⭐ SUSFS for KernelSU](https://github.com/sidex15/susfs4ksu-module)** - Add-on root-hiding service for SUSFS-patched kernels (KernelSU/Next). The core of modern KSU hiding setups. `FOSS` `[M]` `[K]`
- **[BRENE](https://github.com/rrr333nnn333/BRENE)** - SUSFS/KernelSU module for patched kernels with enhanced root hiding & spoofing. `FOSS` `[M]` `[K]`
- ~~ReSuSFS~~: Removed on author's request

---

## Zygisk

<details>

<summary><strong>What is Zygisk?</strong></summary>

A feature that lets modules inject code into Android's Zygote process for system-level modifications like root hiding and app patching.

<br>
</details>

- **[⭐ Zygisk Next](https://github.com/LSPosed/ZygiskNext)**  - Zygisk implementation with stealth controls, a Zygote Monitor and a dashboard for detection testing. `Proprietary` `[M]` `[K]` `[A]`
- **[NeoZygisk](https://github.com/JingMatrix/NeoZygisk)**  - Uses ptrace injection and trace cleanup to remove injection artifacts from memory after modules load. `FOSS` `[M]` `[K]` `[A]`
- **[OnyxZygisk](https://github.com/OnyxZygisk/OnyxZygisk/)** - A ptrace-powered Zygisk implementation with a built-in WebUI, hot-swappable FN modules, and an advanced DenyList. `FOSS` `[M]` `[K]` `[A]`
- **[ReZygisk](https://github.com/PerformanC/ReZygisk)**  - C implementation with custom linkers for linker-based detection; includes a WebUI and supports Android 15 and 16. `FOSS` `[M]` `[K]` `[A]`
- **[VexZygisk](https://github.com/Lxiaoyao077/VexZygisk/)** - Standalone implementation of Zygisk for KernelSU and APatch. `FOSS` `[M]` `[K]` `[A]`

<details><summary><strong>Comparison table</strong></summary><br>

| | **Magisk Built-in** | **Zygisk Next** | **NeoZygisk** | **ReZygisk** |
| :--- | :--- | :--- | :--- | :--- |
| **Key Advantage** | Official &amp; simple | Detection evasion | Stealth / cleaning | Speed / open source |
| **License** | GPL-3.0 | Proprietary | GPL-3.0 | GPL-3.0 / AGPL-3.0 |
| **Root Support** | Magisk only | Magisk, KSU, APatch | Magisk, KSU, KSU Next, APatch | Magisk, KSU, APatch |
| **Hiding Approach** | Basic DenyList | ZN Linker + anon memory + Shamiko | Ptrace injection + unmounting | Custom linker + maps hiding |
| **Strengths** | ✅ Stable, well-documented<br>✅ Widest arch (incl. x86) | ✅ Most feature-rich<br>✅ Largest community | ✅ Hard to trace in memory<br>✅ Minimal &amp; open | ✅ **Fastest (native C)**<br>✅ Fully open &amp; auditable |
| **Trade-offs** | ❌ Magisk-only<br>❌ Easily detected | ❌ Closed source<br>❌ ZN Linker experimental | ❌ 64-bit only<br>❌ Smaller community | ❌ RC phase<br>❌ Some compat issues |

<br>
</details>
