---
layout: doc
title: "Root Managers, Zygisk & Root Hiding"
description: Browse root managers, module managers and metamodules for Magisk, KernelSU and APatch, plus LSPosed, Zygisk, root hiding, Susfs and Play Integrity tools.
head:
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: twitter:description
      content: Browse root managers, module managers and metamodules for Magisk, KernelSU and APatch, plus LSPosed, Zygisk, root hiding, Susfs and Play Integrity tools.
---

# Root Managers, Zygisk & Root Hiding

**Root management** covers everything you need to install, run and maintain root on your Android device:
root managers for **Magisk, KernelSU and APatch**, temporary root solutions for locked-bootloader devices,
module managers and metamodules, the **LSPosed/Xposed and Zygisk** frameworks, and the tools that keep root
hidden from apps (**Play Integrity, SUSFS**). Apps and modules live together here because they solve the same
problem - controlling root access.

> [!TIP]
> New to rooting? Read the [Complete Rooting Guide](/rooting-guides/) first, then come back for the tools.

## Root Managers

- **[⭐ KernelSU](https://github.com/tiann/KernelSU)** - A Kernel based root solution for Android. `FOSS`
- **[⭐ Magisk](https://github.com/topjohnwu/Magisk)** - Manage Magisk modules and root permissions. `FOSS`
- **[APatch](https://github.com/bmax121/APatch)** - The patching of Android kernel and Android system. `FOSS`
- **[Aster](https://github.com/LyraVoid/Aster)** - Root manager built on KernelPatch and continuing the APatch capability chain, with APM and KPM modules, a module repository and protected runtime operations. `FOSS`
- **[FolkPatch](https://github.com/LyraVoid/FolkPatch)** - A Root management tool focused on interface optimization and feature extension, based on APatch. `FOSS`
- **[KernelSU-next](https://github.com/KernelSU-Next/KernelSU-Next)** - An advanced Kernel based root solution for Android. `FOSS`
- **[QuestStack](https://github.com/starseed12345/QuestStack)** - Desktop workflow for Windows, Linux and macOS that roots Meta Quest 1 and Quest 2 headsets through the GhostLock chain and the CVE-2021-1931 ABL/fastboot bug, with temporary boot of a vulnerable ABL, verified backups, A/B slot handling and bootloader unlocking. `FOSS`
- **[ReSukiSU](https://github.com/ReSukiSU/ReSukiSU)** - Fork of SukiSU-Ultra with additional features. `FOSS`
- **[SukiSU-Ultra](https://github.com/SukiSU-Ultra/SukiSU-Ultra)** - A kernel-based root solution for Android devices, forked from `KernelSU` with some useful changes. `FOSS`
- **[YukiSU](https://github.com/Rouyashiki/YukiSU)** - Kernel-based root solution forked from SukiSU-Ultra with the userspace manager rewritten in C++, external MetaModule lifecycle and script integration, app profiles and dynamic manager support. `FOSS`


## Temporary Root (Locked Bootloader)

<details>

<summary><strong>What is temporary root?</strong></summary>

Exploits such as **DirtyFrag (CVE-2026-43284)** and **GhostLock (CVE-2026-43499)** can grant root in memory on specific vulnerable builds while the bootloader stays locked. A full reboot clears the active root session, but files and settings changed during it may remain. Kernel crashes and bootloops are possible; a locked bootloader or patch date does not guarantee device support, Knox behavior or Play Integrity.

<br>
</details>

- **[⭐ Root My Galaxy](https://github.com/BuSung-dev/Root-My-Galaxy)** - Temporary root via GhostLock on supported Samsung Galaxy device and firmware combinations, with the bootloader locked. `FOSS`
- **[ANB Root](https://github.com/Chuniex-0631/honor-anb-an00-root)** - Uses Shizuku and GhostLock to load KernelSU on specific HONOR 80 Pro Flat builds. `FOSS`
- **[Anchor](https://github.com/byemaxx/ghostlock-anchor)** - Runs the ghostlock-oneplus chain through local ADB on supported builds for authorized research and education. Initial TCP ADB setup needs a computer and may expose a network debugging port. `Proprietary`
- **[DFRoot](https://github.com/diabl0w/DFRoot)** - Uses DirtyFrag to late-load a KernelSU-compatible module on vulnerable Android 12L+ arm64 builds without Shizuku; Samsung requires its named manager fork. `FOSS`
- **[DirtyFrag](https://github.com/mitschud/DirtyFrag)** - Ephemeral root exploit for CVE-2026-43284 that grants in-memory root via page-cache and can load KernelSU without bootloader unlock. `FOSS`
- **[DirtyInit](https://github.com/combeng6th/DirtyInit)** - Uses DirtyFrag to provide restricted init-context root commands on vulnerable Samsung builds through ADB; it is not a general su installer. `Proprietary`
- **[GhostLock](https://github.com/YuKongA/ghostlock-app)** - Uses GhostLock and device-specific profiles for temporary root and KernelSU; some profiles require Shizuku. `FOSS`
- **[GhostLock Galaxy](https://github.com/wxxsfxyzm/GhostLock-Galaxy)** - Runs GhostLock using ADB or Shizuku on specific Galaxy Z Fold6 kernel builds. `FOSS`
- **[GhostLock OnePlus](https://github.com/JoinChang/ghostlock-oneplus)** - Uses ADB and device-specific GhostLock profiles for supported OnePlus, OPPO and Xiaomi builds. Upstream restricts use to authorized research and education; source has no project-wide license. `Proprietary`
- **[GhostSam](https://github.com/snothin/GhostSam)** - Runs DirtyFrag or GhostLock with ADB on supported Samsung builds. The [MocLG fork](https://github.com/MocLG/GhostSam) has its own device profiles. `FOSS`
- **[Root My Device (tqmane)](https://github.com/tqmane/Root-My-Device)** - Provides separate Shizuku-based GhostLock apps for exact Nothing Phone (3a) and OnePlus Pad 3 builds. `FOSS`
- **[Root My Device (WitAqua)](https://github.com/WitAqua-tools/Root-My-Device)** - Downloads matched GhostLock payloads for supported Xiaomi and Meta Quest builds and loads KernelSU temporarily. `FOSS`
- **[Root My Pixel](https://github.com/alex193a/Root-My-Pixel)** - Uses Shizuku, GhostLock and the ReSukiSU manager on exact supported Pixel builds. Source has no project-wide license. `Proprietary`
- **[RootMyS24](https://github.com/NanoTurtle1145/root-my-s24)** - Uses Shizuku with GhostLock or a timer exploit on selected Galaxy builds. The app is GPL-3.0, but its payload build chain is not included in the repository. `Proprietary`
- **[RootMyVivo](https://github.com/zenyxx-xd/RootMyVivo)** - Uses Shizuku or ADB for temporary root on supported vivo and iQOO builds; it can enable TCP debugging. Source has no project-wide license. `Proprietary`
- **[Shark](https://github.com/Yunnijian/Shark)** - Uses Shizuku or Stellar and a POSIX-timer exploit to load a KernelSU-compatible module on selected vulnerable OnePlus, OPPO, Realme and iQOO builds. Some bundled component licensing is unclear. `Proprietary`
- **[Temporary Root](https://github.com/ShivamXD6/Temporary-Root)** - Uses DirtyFrag or GhostLock to late-load a KernelSU-compatible module on supported vulnerable Android 12L+ arm64 builds. Source is published without a project-wide license. `Proprietary`

> [!TIP]
> Our sister project [Awesome Temporary Root](https://awesome-temporary-root.pages.dev/) ([GitHub](https://github.com/fynks/awesome-temporary-root)) maintains device/build sections, tools and module reports. Also see [Root Without Unlocking the Bootloader](../rooting-guides/root-without-unlocking-bootloader.md) and [Bootloader Mods & Temporary Root Solutions](../rooting-guides/temporary-root-solutions.md).


## Bootloop Protection

- **[AshReXcue - Bootloop Protector](https://github.com/RipperHybrid/AshLooper)** - Prevent boot loops caused by problematic modules installed via KernelSU or Magisk. `FOSS` `[M]` `[K]` `[A]`
- **[YetAnotherBootloopProtector](https://github.com/Magisk-Modules-Alt-Repo/YetAnotherBootloopProtector)** - Monitor and fix potential Bootloops and SystemUI failures. `FOSS` `[M]` `[A]`

## LSPosed & Xposed

> [!NOTE]
> LSPosed allows you to use Xposed modules, that can modify or extend the functionality of your Android system and apps.

- **[⭐ Vector](https://github.com/JingMatrix/Vector)** - Open Source *Fork* of original LSPosed with dynamic module loading, and other improvements. `FOSS` `[M]`
- **[LSPosed](https://lsposed.zip)** - Provides an ART hooking framework using LSPlant and APIs compatible with the original Xposed. Runs through Riru or Zygisk. `Proprietary`

> [!TIP]
> See our [LSPosed installation guide ↗](../rooting-guides/lsposed-guide.md) for setup instructions.

## Metamodules

> [!NOTE]
> **Metamodules** provides the core mounting infrastructure for the module system. Unlike regular modules that modify system files, metamodules control *how* regular modules are installed and mounted.

- **[⭐ Mountify](https://github.com/backslashxx/mountify)** - OverlayFS with tmpfs/ext4 sparse support for reduced detection, works on APatch/Magisk too. `FOSS` `[M]` `[K]` `[A]`
- **[⭐ NoMount](https://github.com/maxsteeel/nomount)** - Mountless module injection: kernel VFS path redirection with per-app UID isolation and a WebUI, so injected files never appear in `/proc/mounts`. Needs kernel integration; prebuilt modules cover GKI kernels. `FOSS` `[K]` `[A]`
- **[Magic Mount Metamodule](https://github.com/Tools-cx-app/meta-magic_mount-rs)** - An implementation of a metamodule using Magic Mount, based on MKSU. `FOSS` `[M]` `[K]` `[A]`
- **[Meta-hybrid_mount](https://github.com/Hybrid-Mount/meta-hybrid_mount)** - Three-engine mount orchestration (OverlayFS + Magic Mount + Kasumi LKM) with conflict monitor, SolidJS WebUI, auto-fallback, and EROFS storage backend support. `FOSS` `[K]` `[A]`
- **[NoMount Suite](https://github.com/Bouteillepleine/NoMount-Suite)** - Mountless module loading on the Prism kernel VFS engine, RRO theme overlays included, classifying every file under `/data/adb/modules/` at boot and programming the kernel over netlink. Needs a custom kernel carrying the Prism driver; beta, and OnePlus/Oppo `my_*` partitions still take a visible bind mount. `FOSS` `[M]` `[K]` `[A]`
- **[ZeroMount](https://github.com/Enginex0/zeromount)** - Mountless module loading with Kernel-level VFS path redirection & SUSFS integration, WebUI, bootloop guard, and strategy fallback. `FOSS` `[M]` `[K]` `[A]`

## Module Managers

- **[⭐ MMRL](https://github.com/DerGoogler/MMRL)** - Manages module repositories. `FOSS` `[M]` `[K]` `[A]` | [🌱](https://f-droid.org/en/packages/com.dergoogler.mmrl/) | [▶️](https://play.google.com/store/apps/details?id=com.dergoogler.mmrl)
- **[KPatch Next Module](https://github.com/KernelSU-Next/KPatch-Next-Module)** - Standalone implementation of KPM (KernelSU Patch Module) support for Magisk/KernelSU with WebUI. `FOSS` `[M]` `[K]` `[A]`
- **[LSP Store](https://github.com/Xposed-Modules-Repo/io.github.tophtab.lspstore)** - Updater and browser for LSPosed modules. `Proprietary` `[LSP]`
- **[Magisk Manager for Recovery Mode](https://github.com/Rikj000/Magisk-Manager-for-Recovery-Mode)** - Easily manage your Magisk Modules from a terminal session in your custom recovery. `FOSS` `[M]`
- **[Modules Manager](https://github.com/rushiranpise/lsposed-modules-manager)** - An Android app for finding, installing and updating Xposed/Lsposed modules. `Proprietary` `[LSP]`
- **[ScopeView](https://github.com/Xposed-Modules-Repo/io.github.zhongjitianqianguai.scopeview)** - Shows which LSPosed modules target an app and updates installed modules individually or in batch. `Proprietary` `[LSP]`

## Root Detection & Testing

- **[⭐ Android-Native-Root-Detector](https://github.com/reveny/Android-Native-Root-Detector)** - Detects root on Android devices. `FOSS`
- **[⭐ Duck Detector Fork](https://github.com/rrr333nnn333/Duck-Detector-Refactoring)** - Duck Detector fork with additional features and improvements. `FOSS`
- **[Android-Device-Trust](https://github.com/reveny/Android-Device-Trust)** - Android device attestation and fingerprinting tool. `FOSS`
- **[Chunqiu Detector](https://github.com/mingzun09/Chunqiu-Detector-Problem-solution)** - Solutions, scripts, and modules for bypassing and troubleshooting Chunqiu Detector checks on rooted Android devices. `FOSS`
- **[Demo](https://github.com/JingMatrix/Demo)** - Asks whether a library is injected into its address space, mounts are missing from its mount table, or a dirty SELinux policy is present; the detection target paired with NeoZygisk. `FOSS`
- **[Detection](https://github.com/rushiranpise/detection)** - Lists Android apps and tools that test a device for root, Xposed/LSPosed modules, custom ROMs, unlocked bootloaders, SafetyNet and Play Integrity, with package names and versions. `Proprietary`
- **[DirtySepolicy](https://github.com/LSPosed/DirtySepolicy)** - Queries the device SELinux policy from an app zygote and reports the dirty rules injected by userspace root and hooking solutions. `FOSS`
- **[Duck Detector](https://github.com/eltavine/Duck-Detector-Refactoring)** - Android environment integrity inspection tool for root, hook, bootloader, SELinux, virtualization, and attestation signals. `FOSS`
- **[FOSS Root Checker](https://github.com/Chill-Astro/FOSS-Root-Checker)** - Root checker that shows the checks it runs, with an offline build that leaves out the update checker. `FOSS`
- **[GarudaDefender](https://github.com/kikyps/GarudaDefender)** - RASP sample that reports root, hooking, emulator, debugger and memory-patch signals, shipped as an APK to test the framework's detection. `Proprietary`
- **[Key Attestation](https://github.com/VisionR1/KeyAttestation)** - Generates, saves, parses and verifies Android key and ID attestation certificate chains for self-testing and diagnostics. `FOSS`
- **[Kknd Root Detector](https://github.com/juanma0511/Kknd_Root_Detector)** - Deep root, hook framework, SELinux and system integrity detection combining native C++ and Kotlin checks. `FOSS`
- **[MagiskDetection](https://github.com/apkunpacker/MagiskDetection)** - Collection of Some publicly Available POC Apps to Detect Root/Magisk presence. `Proprietary`
- **[PIF Detector](https://github.com/IR0NBYTE/playIntegrityFixDetector)** - Detects modifications, bypasses or fixes applied to the Google Play Integrity API. `FOSS` `[M]` `[K]` `[A]`
- **[Play Integrity Alert](https://github.com/Xiddoc/PlayIntegrityAlert)** - Get notified when an app calls the Play Integrity API. `FOSS` `[LSP]`
- **[Securify](https://github.com/RabehX/Securify)** - Yet Another Root Checker and Play Integrity API Application. `FOSS`
- **[TB Checker](https://play.google.com/store/apps/details?id=krypton.tbsafetychecker)** - Safety checker that reports root, hooking, Play Integrity and SafetyNet attestation results. `Proprietary`
- **[ZygoteNextProbe](https://github.com/XiaoTong6666/ZygoteNextProbe)** - Research probe that checks whether Android 17's `zygote_next` native isolated services leak a global mount view - potentially exposing Magisk/Zygisk/LSPosed mounts to apps. `FOSS`

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

- **[⭐ HMA-OSS](https://github.com/frknkrc44/HMA-OSS)** - FOSS rewrite of Hide My Applist; hides your app list, settings, and package installers. `FOSS` `[LSP]`
- **[⭐ Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)** - Hides Magisk root from detection. `Proprietary` `[M]`
- **[⭐ TEESimulator](https://github.com/JingMatrix/TEESimulator)** - Create a complete, software-based simulation of a hardware-backed Trusted Execution Environment (TEE) for Key Attestation. `FOSS` `[M]` `[K]` `[A]`
- **[Always Strong](https://gitlab.com/Evokerr/AlwaysStrong)** - Bundles TEESimulator-RS and PlayIntegrityFork into a single module for strong integrity on rooted devices. `FOSS` `[M]` `[K]` `[A]`
- **[AuditPatch](https://github.com/silvzr/AuditPatch)** - Hooks `logd` to replace sensitive SELinux contexts in the audit log, fixing AVC log leak detection without SUSFS or ZygiskNext. `Proprietary` `[M]` `[K]`
- **[DirtySepolicy Bypass](https://github.com/flipphoneguy/DirtySepolicy_Bypass)** - Bypasses new DirtySepolicy on rooted Android devices to keep apps working. `FOSS` `[M]` `[K]` `[A]`
- **[Duck ToolBox](https://github.com/eltavine/Duck-ToolBox)** - Provides a WebUI for Tricky Store, TEESimulator and OhMyKeymint configuration, Remote Key Provisioning CSR creation and verification, and Qualcomm Keymaster device ID provisioning. `FOSS` `[M]` `[K]` `[A]`
- **[Komodo Build Props](https://github.com/Elcapitanoe/Komodo-Build-Prop#komodo-build-props)** - Spoofs your device as a Pixel 9 Pro XL (komodo). `FOSS` `[M]` `[A]`
- **[OhMyKeymint](https://github.com/qwq233/OhMyKeymint)** - Custom keystore implementation for Android Keystore Spoofer. `FOSS` `[M]` `[K]`
- **[Play Integrity Fix (inject)](https://github.com/KOWX712/PlayIntegrityFix)** - Actively maintained fork using injected GMS/Play Store spoofing with a WebUI. `FOSS` `[M]`
- **[Play Integrity Fork (PIF)](https://github.com/osm0sis/PlayIntegrityFork)** - The most actively maintained PIF. Fixes `DEVICE_INTEGRITY` verdicts with custom fields/props. Recommended starting point after chiteroman's original was discontinued. `FOSS` `[M]` `[A]`
- **[PlaycurlNEXT](https://github.com/daboynb/playcurlNEXT)** - Fixes Play Integrity (and SafetyNet) verdicts with custom fields and props. `FOSS` `[M]` `[K]`
- **[ReZygisk's Treat Wheel](https://github.com/PerformanC/Treat-Wheel-Zygisk)** - Hides Magisk and root traces for ReZygisk. `FOSS` `[M]` `[K]` `[A]`
- **[Sensitive Props](https://github.com/Pixel-Props/sensitive-props)** - Modifies system properties and applies device-specific fixes to bypass SafetyNet/Play Integrity. `FOSS` `[M]` `[A]`
- **[Specter](https://github.com/dpejoh/specter)** - Unified Play Integrity and root hiding stack for Android. Successor of Yurikey. `FOSS` `[M]` `[K]` `[A]`
- **[TEESimulator-RS](https://github.com/Enginex0/TEESimulator-RS)** - Fork of TEESimulator with native Rust certificate generation, key persistence, and AOSP-compliant attestation behavior. `FOSS` `[M]` `[K]` `[A]`
- **[Tricky Addon – Update Target List](https://github.com/KOWX712/Tricky-Addon-Update-Target-List)** - KSU WebUI to configure TrickyStore's `target.txt`. `FOSS` `[K]` `[A]`
- **[TrickyStore](https://github.com/5ec1cff/TrickyStore)** - Modifies the certificate chain for Android key attestation (keybox-based). The original/reference module. `Proprietary` `[M]` `[K]`
- **[TrickyStore OSS](https://github.com/beakthoven/TrickyStoreOSS)** - Open-source alternative to TrickyStore. `FOSS` `[M]` `[K]`
- **[YuriKey](https://github.com/dpejoh/yurikey)** - Aims to obtain strong integrity using a systemless approach. `FOSS` `[M]` `[K]` `[A]`
- **[Zygisk Assistant](https://github.com/snake-4/Zygisk-Assistant)** - Hides root on KernelSU, Magisk and APatch using Zygisk. `FOSS` `[M]` `[A]`

> [!TIP]
> Combine these with a proper [Zygisk implementation](#zygisk) for best results.

> [!NOTE]
> KernelSU hides earlier: unpermitted apps cannot see `su`, and SUSFS hides paths and mounts in the kernel. That is why the SUSFS tools below list `[K]` only.

---

## Susfs

<details><summary><strong>What is SUSFS?</strong></summary>
SUSFS (Systemless User Space File System) is a kernel-level module that allows root-hiding and system modifications without altering the system partition. It provides a stealthy environment for modules to operate, making it harder for apps to detect root or modifications.

</details><br>

- **[⭐ SUSFS for KernelSU](https://github.com/sidex15/susfs4ksu-module)** - Add-on root-hiding service for SUSFS-patched kernels (KernelSU/Next). The core of modern KSU hiding setups. `FOSS` `[K]`
- **[BRENE](https://github.com/rrr333nnn333/BRENE)** - Provides root hiding and spoofing using SUSFS on patched KernelSU kernels. `FOSS` `[K]`
- **[SUSFS LKM Loader](https://github.com/matsuzaka-yuki/susfs-lkm-module)** - KernelSU ZIP wrapper around a pinned inforcqb SUSFS LKM release, selecting the matching arm64 binary from `/proc/sys/kernel/osrelease` at install and every boot with no nearest-version fallback. `FOSS` `[K]`
- **[susfs4ksu-lkm](https://github.com/inforcqb/susfs4ksu-for-lkm/)** - SUSFS ported to a loadable kernel module (LKM) for GKI/CFI devices, loaded via KernelSU ksud. `FOSS` `[K]` 
- ~~ReSuSFS~~: Removed on author's request

> [!TIP]
> New to SUSFS? The [SUSFS Root Hiding Guide](../rooting-guides/susfs-guide.md) covers requirements, patched kernels versus the loadable kernel module, configuration and verification. For metamodules that avoid mounts entirely, see [NoMount](#metamodules).

---

## Zygisk

<details>

<summary><strong>What is Zygisk?</strong></summary>

A feature that lets modules inject code into Android's Zygote process for system-level modifications like root hiding and app patching.

<br>
</details>

- **[⭐ Zygisk Next](https://github.com/LSPosed/ZygiskNext)** The "Gold Standard" for detection evasion. It is a standalone Zygisk implementation that offers the most advanced stealth features, including a dedicated **Zygote Monitor** and dashboard. `Proprietary` `[M]` `[K]` `[A]`
- **[NeoZygisk](https://github.com/JingMatrix/NeoZygisk)** A minimalist, high-stealth implementation using **ptrace injection**. It focuses on "trace cleaning," aiming to remove all injection artifacts from memory once modules are loaded. `FOSS` `[M]` `[K]` `[A]`
- **[OnyxZygisk](https://github.com/OnyxZygisk/OnyxZygisk/)** - A ptrace-powered Zygisk implementation with a built-in WebUI, hot-swappable FN modules, and an advanced DenyList. `FOSS` `[M]` `[K]` `[A]`
- **[ReZygisk](https://github.com/PerformanC/ReZygisk)** A high-performance implementation **entirely rewritten in C**. It introduces **custom linkers** to bypass modern linker-based detections, offering a WebUI for status monitoring and compatibility with Android 15 and 16. `FOSS` `[M]` `[K]` `[A]`
- **[VexZygisk](https://github.com/Lxiaoyao077/VexZygisk/)** - Standalone implementation of Zygisk for KernelSU and APatch. `FOSS` `[M]` `[K]` `[A]`
- **[YukiZygisk](https://github.com/Rouyashiki/YukiZygisk)** - Runs Zygisk and ZN native modules using a kernel-based implementation with a status and settings WebUI. `FOSS` `[M]` `[K]` `[A]`

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
