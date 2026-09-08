---
layout: doc
title: "Root Management"
description: "Root management apps, Magisk/KernelSU/APatch managers, metamodules, LSPosed & Zygisk frameworks, and root hiding & Play Integrity tools for rooted Android devices."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.zhoe.org/apps-and-modules/root-management
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: keywords
      content: "android root management, magisk manager, kernelsu manager, apatch, module managers, metamodules, lsposed, xposed, zygisk, root hiding, play integrity fix, susfs, bootloop protection, root detection, temporary root, ghostlock"
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
      content: "Root management apps, Magisk/KernelSU/APatch managers, metamodules, LSPosed & Zygisk frameworks, and root hiding & Play Integrity tools for rooted Android devices."
  - - meta
    - property: og:url
      content: https://awesome-android-root.zhoe.org/apps-and-modules/root-management
  - - meta
    - property: og:image
      content: https://awesome-android-root.zhoe.org/images/og.png
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
      content: https://awesome-android-root.zhoe.org/images/og.png
---

# Root Management

**Root management** covers everything you need to install, run and maintain root on your Android device:
root managers for **Magisk, KernelSU and APatch**, temporary root solutions for locked-bootloader devices,
module managers and metamodules, the **LSPosed/Xposed and Zygisk** frameworks, and the tools that keep root
hidden from apps (**Play Integrity, SUSFS**). Apps and modules live together here because they solve the same
problem - controlling root access.

> [!TIP]
> New to rooting? Read the [Complete Rooting Guide](/rooting-guides/) first, then come back for the tools.

<ClientOnly>
  <AppSearch />
</ClientOnly>

<div class="app-search-content">

## Root Managers

- **[⭐ KernelSU](https://github.com/tiann/KernelSU)** - A Kernel based root solution for Android. `FOSS`
- **[⭐ Magisk](https://github.com/topjohnwu/Magisk)** - Manage Magisk modules and root permissions. `FOSS`
- **[APatch](https://github.com/bmax121/APatch)** - The patching of Android kernel and Android system. `FOSS` | [🌱](https://f-droid.org/packages/me.bmax.apatch/)
- **[FolkPatch](https://github.com/LyraVoid/FolkPatch)** - A Root management tool focused on interface optimization and feature extension, based on APatch. `FOSS`
- **[KernelSU-next](https://github.com/KernelSU-Next/KernelSU-Next)** - An advanced Kernel based root solution for Android. `FOSS`
- **[ReSukiSU](https://github.com/ReSukiSU/ReSukiSU)** - Fork of SukiSU-Ultra with additional features. `FOSS`
- **[SukiSU-Ultra](https://github.com/SukiSU-Ultra/SukiSU-Ultra)** - A kernel-based root solution for Android devices, forked from `KernelSU` with some useful changes. `FOSS`

## Temporary Root (Locked Bootloader)

<details>

<summary><strong>What is temporary root (GhostLock)?</strong></summary>

Exploits like **GhostLock (CVE-2026-43499)** - a 15-year-old Linux kernel bug - grant root **in memory only**, for the current boot. No bootloader unlock, no flashing, no Knox trip, no data wipe: reboot and the device is bone-stock again. The trade-offs: root doesn't survive reboots, you can't flash ROMs/recoveries, and it only works on specific devices running firmware up to ~the June 2026 patch level.

<br>
</details>

- **[⭐ Root My Galaxy](https://github.com/BuSung-dev/Root-My-Galaxy)** - One-tap temporary root for Snapdragon Galaxy flagships (S24/S25 series, S24 FE, A56...) via GhostLock; bootloader stays locked, Knox isn't tripped. `FOSS`
- **[GhostLock App](https://github.com/YuKongA/ghostlock-app)** - One-tap execution app for the GhostLock (CVE-2026-43499) exploit. `FOSS`
- **[GhostLock-5.10](https://github.com/R0rt1z2/GhostLock-5.10)** - GhostLock kernel root exploit for some 5.X-kernel devices, mostly Amazon (from the Kaeru/Fenrir developer). `FOSS`
- **[GhostLock-Galaxy](https://github.com/wxxsfxyzm/GhostLock-Galaxy)** - GhostLock app for the Samsung Galaxy Z Fold6 (kernel 6.1); stages via Shizuku or `adb shell` with per-kernel offset matching. `FOSS`
- **[ghostlock-oneplus](https://github.com/JoinChang/ghostlock-oneplus)** - GhostLock kernel exploit for OnePlus/OPPO/realme (and some Xiaomi) devices with locked bootloader; installs KernelSU with runtime kernel auto-detection. `FOSS`
- **[IonStack-S22U](https://github.com/sarabpal-dev/IonStack-S22U)** - Full CVE-2026-43499 exploit chain for the Samsung Galaxy S22 Ultra (5.10 kernel). `FOSS`
- **[iQOO Z9 5G / vivo T3 5G Root](https://github.com/ankitrawatgit/iQOO-Z9_5G-vivo-T3_5G-Root-GhostLock)** - One-tap root app and payloads for the iQOO Z9 5G and vivo T3 5G (Dimensity 7200, kernel 5.15). `FOSS`
- **[oppo-ghostlock](https://github.com/pubglite55/oppo-ghostlock)** - GhostLock exploit adaptation for the OPPO Find N2. `FOSS`
- **[pixel-ksu-root](https://github.com/JingMatrix/pixel-ksu-root)** - ADB-driven KernelSU loader for stock Pixels; temporary kernel R/W via GhostLock, then late-loads a signature-matched `kernelsu.ko`. Manager-agnostic. `FOSS`
- **[QuestStack](https://github.com/starseed12345/QuestStack)** - Unlocks the Meta Quest 1 bootloader and gains root using GhostLock + CVE-2021-1931. `FOSS`
- **[Root My Device](https://github.com/Witaqua-tools/Root-My-Device)** - Community fork of Root My Galaxy generalized beyond Samsung, with its own payload feed. `FOSS`
- **[Root-My-Galaxy-Payloads](https://github.com/BuSung-dev/Root-My-Galaxy-Payloads)** - Signed device profiles, exploit payloads, and KernelSU artifacts that Root My Galaxy fetches at runtime. `FOSS`
- **[Root My Pixel](https://github.com/alex193a/Root-My-Pixel)** - Jailbreak supported Google Pixel phones with GhostLock; stages the payload via Shizuku, no PC needed. `FOSS`

> [!TIP]
> See the dedicated guide **[Root Without Unlocking the Bootloader](../rooting-guides/root-without-unlocking-bootloader.md)** for what GhostLock can and can't do, device support, and every app, exploit port, and research project. Also see [Bootloader Mods & Temporary Root Solutions](../rooting-guides/temporary-root-solutions.md) for related locked-bootloader approaches (Kaeru, Fenrir).

## Module Managers

- **[⭐ MMRL](https://github.com/DerGoogler/MMRL)** - An Android app that helps manage your own modules repository. `FOSS` `[M]` `[K]` `[A]` | [🌱](https://f-droid.org/en/packages/com.dergoogler.mmrl/) | [▶️](https://play.google.com/store/apps/details?id=com.dergoogler.mmrl)
- **[KPatch Next Module](https://github.com/KernelSU-Next/KPatch-Next-Module)** - Standalone implementation of KPM (KernelSU Patch Module) support for Magisk/KernelSU with WebUI. `FOSS` `[M]` `[K]`
- **[Magisk Manager for Recovery Mode](https://github.com/Rikj000/Magisk-Manager-for-Recovery-Mode)** - Easily manage your Magisk Modules from a terminal session in your custom recovery. `FOSS` `[M]`

## Metamodules

> [!NOTE]
> **Metamodules** provides the core mounting infrastructure for the module system. Unlike regular modules that modify system files, metamodules control *how* regular modules are installed and mounted.

- **[⭐ Meta-overlayfs](https://github.com/KernelSU-Modules-Repo/meta-overlayfs)** - Official reference implementation using OverlayFS for most users and standard setup. `FOSS` `[K]`
- **[⭐ Mountify](https://github.com/backslashxx/mountify)** - OverlayFS with tmpfs/ext4 sparse support for reduced detection, works on APatch/Magisk too. `FOSS` `[M]` `[K]` `[A]`
- **[Magic Mount Metamodule](https://github.com/Tools-cx-app/meta-magic_mount-rs)** - An implementation of a metamodule using Magic Mount, based on MKSU. `FOSS` `[M]` `[K]` `[A]`
- **[Meta-hybrid_mount](https://github.com/YuzakiKokuban/meta-hybrid_mount)** - Three-engine mount orchestration (OverlayFS + Magic Mount + Kasumi LKM) with conflict monitor, SolidJS WebUI, auto-fallback, and EROFS storage backend support. `FOSS` `[K]` `[A]`
- **[meta-mm](https://github.com/KernelSU-Modules-Repo/meta-mm)** - The official KernelSU Modules Repo's Magic Mount metamodule. Lighter alternative to meta-magic_mount for users who just want Magisk-compatible mounting without extra tooling. `FOSS` `[K]`
- **[ZeroMount](https://github.com/Enginex0/zeromount)** - Mountless module loading with Kernel-level VFS path redirection & SUSFS integration, WebUI, bootloop guard, and strategy fallback. `FOSS` `[M]` `[K]` `[A]`

## LSPosed & Xposed

> [!NOTE]
> LSPosed allows you to use Xposed modules, that can modify or extend the functionality of your Android system and apps.

- **[⭐ Vector](https://github.com/JingMatrix/Vector)** - Open Source *Fork* of original LSPosed with dynamic module loading, and other improvements. `FOSS` `[M]`
- **[LSPosed](https://lsposed.zip)** - A Riru / Zygisk module that provides an ART hooking framework delivering consistent APIs with the OG Xposed, leveraging the LSPlant hooking framework. `Proprietary`

> [!TIP]
> See our [LSPosed installation guide](../rooting-guides/lsposed-guide.md) for setup instructions.

## Zygisk

<details>

<summary><strong>What is Zygisk?</strong></summary>

A feature that lets modules inject code into Android's Zygote process for system-level modifications like root hiding and app patching.

<br>
</details>

- **[⭐ Zygisk Next](https://github.com/Dr-TSNG/ZygiskNext)** The "Gold Standard" for detection evasion. It is a standalone Zygisk implementation that offers the most advanced stealth features, including a dedicated **Zygote Monitor** and dashboard. `Proprietary` `[M]` `[K]` `[A]`
- **[NeoZygisk](https://github.com/JingMatrix/NeoZygisk)** A minimalist, high-stealth implementation using **ptrace injection**. It focuses on "trace cleaning," aiming to remove all injection artifacts from memory once modules are loaded. `FOSS` `[M]` `[K]` `[A]`
- **[ReZygisk](https://github.com/PerformanC/ReZygisk)** A high-performance implementation **entirely rewritten in C**. It introduces **custom linkers** to bypass modern linker-based detections, offering a WebUI for status monitoring and compatibility with Android 15 and 16. `FOSS` `[M]` `[K]` `[A]`

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
</details><br>

> [!TIP]
> Use these for Zygisk features on KernelSU/APatch, or for more control than Magisk's built-in provides.

## Root Hiding & Play Integrity

<details><summary><strong>What is Play Integrity?</strong></summary>

A Google API that lets apps verify a device is "genuine" - unmodified, Play-certified, and bootloader-locked. Apps use it to block rooted/modified devices. Verdicts: `MEETS_BASIC_INTEGRITY` < `MEETS_DEVICE_INTEGRITY` < `MEETS_STRONG_INTEGRITY`.
</details>

<details><summary><strong>Why hide root?</strong></summary>

Banking, payment, and some streaming/game apps detect root and refuse to run. Hiding root lets them work on a rooted device.
</details>

<details><summary><strong>What's realistic in 2026?</strong></summary>

Since Google's mid-2025 changes, `DEVICE_INTEGRITY` requires a **locked bootloader on Android 13+**, and `STRONG_INTEGRITY` needs an **unrevoked hardware keybox** (increasingly scarce). For most rooted users, passing `BASIC` + `DEVICE` integrity (via PIF + TrickyStore) is the practical ceiling - chasing `STRONG` is a deep, often futile rabbit hole.
</details>

## Susfs

<details><summary><strong>What is SUSFS?</strong></summary>
SUSFS (Systemless User Space File System) is a kernel-level module that allows root-hiding and system modifications without altering the system partition. It provides a stealthy environment for modules to operate, making it harder for apps to detect root or modifications.

</details><br>

- **[⭐ SUSFS for KernelSU](https://github.com/sidex15/susfs4ksu-module)** - Add-on root-hiding service for SUSFS-patched kernels (KernelSU/Next). The core of modern KSU hiding setups. `FOSS` `[M]` `[K]`
- **[RENE](https://github.com/rrr333nnn333/BRENE)** - SUSFS/KernelSU module for patched kernels with enhanced root hiding & spoofing. `FOSS` `[M]` `[K]`
- ~~ReSuSFS`~~: Removed on author's request


- **[⭐ HMA-OSS](https://github.com/frknkrc44/HMA-OSS)** - FOSS rewrite of Hide My Applist; hides your app list, settings, and package installers. `FOSS` `[LSP]`
- **[⭐ TEESimulator](https://github.com/JingMatrix/TEESimulator)** - Create a complete, software-based simulation of a hardware-backed Trusted Execution Environment (TEE) for Key Attestation. `FOSS` `[M]` `[K]`
- **[⭐ Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)** - Hides Magisk root from detection. `Proprietary` `[M]`
- **[Always Strong](https://github.com/evoker0/AlwaysStrong)** - Bundles TEESimulator-RS and PlayIntegrityFork into a single module for strong integrity on rooted devices. `FOSS` `[M]` `[K]`
- **[DirtySepolicy Bypass](https://github.com/flipphoneguy/DirtySepolicy_Bypass)** - Bypasses new DirtySepolicy on rooted Android devices to keep apps working. `FOSS` `[M]` `[K]` `[A]`
- **[Hide My Applist](https://github.com/Dr-TSNG/Hide-My-Applist)** - Intercepts app-list detection. `Proprietary` `[LSP]`
- **[Komodo Build Props](https://github.com/Elcapitanoe/Komodo-Build-Prop#komodo-build-props)** - Spoofs your device as a Pixel 9 Pro XL (komodo). `FOSS` `[M]`
- **[NoHello](https://github.com/MhmRdd/NoHello)** - Lightweight Zygisk module to hide root. `FOSS` `[M]`
- **[OhMyKeymint](https://github.com/qwq233/OhMyKeymint)** - Custom keystore implementation for Android Keystore Spoofer. `FOSS` `[M]` `[K]`
- **[Play Integrity Fix (inject)](https://github.com/KOWX712/PlayIntegrityFix)** - Actively maintained fork using injected GMS/Play Store spoofing with a WebUI. `FOSS` `[M]`
- **[Play Integrity Fork (PIF)](https://github.com/osm0sis/PlayIntegrityFork)** - The most actively maintained PIF. Fixes `DEVICE_INTEGRITY` verdicts with custom fields/props. Recommended starting point after chiteroman's original was discontinued. `FOSS` `[M]`
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

> [!TIP]
> Combine these with a proper [Zygisk implementation](#zygisk) for best results.

## Bootloop Protection

- **[Anti bootloop](https://github.com/Magisk-Modules-Alt-Repo/abootloop)** - Protect from bootloops. `FOSS` `[M]`
- **[AshReXcue - Bootloop Protector](https://github.com/RipperHybrid/AshLooper)** - Prevent boot loops caused by problematic modules installed via KernelSU or Magisk. `FOSS` `[M]` `[K]`
- **[YetAnotherBootloopProtector](https://github.com/Magisk-Modules-Alt-Repo/YetAnotherBootloopProtector)** - Monitor and fix potential Bootloops and SystemUI failures. `FOSS` `[M]`

## Root Detection & Testing

- **[⭐ Android-Native-Root-Detector](https://github.com/reveny/Android-Native-Root-Detector)** - A tool for detecting root on android. `FOSS`
- **[⭐ Duck Detector Fork](https://github.com/rrr333nnn333/Duck-Detector-Refactoring)** - Duck Detector fork with additional features and improvements. `FOSS`
- **[Android-Device-Trust](https://github.com/reveny/Android-Device-Trust)** - Android device attestation and fingerprinting tool. `FOSS`
- **[Chunqiu Detector](https://github.com/mingzun09/Chunqiu-Detector-Problem-solution)** - Solutions, scripts, and modules for bypassing and troubleshooting Chunqiu Detector checks on rooted Android devices. `FOSS`
- **[Duck Detector](https://github.com/eltavine/Duck-Detector-Refactoring)** - Android environment integrity inspection tool for root, hook, bootloader, SELinux, virtualization, and attestation signals. `FOSS`
- **[MagiskDetection](https://github.com/apkunpacker/MagiskDetection)** - Collection of Some publicly Available POC Apps to Detect Root/Magisk presence. `Proprietary`
- **[PIF Detector](https://github.com/IR0NBYTE/playIntegrityFixDetector)** - Native app designed to detect modifications, bypasses, or "fixes" applied to the Google Play Integrity API. `FOSS` `[M]` `[K]`
- **[Play Integrity Alert](https://github.com/Xiddoc/PlayIntegrityAlert)** - Get notified when an app calls the Play Integrity API. `FOSS` `[LSP]`
- **[Play Integrity API Checker](https://github.com/1nikolas/play-integrity-checker-app)** - This app shows info about your device integrity as reported by Google Play Services. If any of this fails could mean your device is rooted or tampered in a way. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=gr.nikolasspyr.integritycheck)
- **[Securify](https://github.com/RabehX/Securify)** - Yet Another Root Checker and Play Integrity API Application. `FOSS`
- **[ZygoteNextProbe](https://github.com/XiaoTong6666/ZygoteNextProbe)** - Research probe that checks whether Android 17's `zygote_next` native isolated services leak a global mount view - potentially exposing Magisk/Zygisk/LSPosed mounts to apps. `FOSS`

</div>
