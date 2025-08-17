# Root Management

## Root Managers
- **[APatch](https://f-droid.org/packages/me.bmax.apatch/)** - The patching of Android kernel and Android system. `FOSS` | [📦 Source](https://github.com/bmax121/APatch)
- **[KernelSU](https://github.com/tiann/KernelSU)** - A Kernel based root solution for Android. `FOSS`
- **⭐ [KernelSU-next](https://github.com/KernelSU-Next/KernelSU-Next)** - An advanced Kernel based root solution for Android.
- **⭐ [Magisk Manager](https://github.com/topjohnwu/Magisk)** - Manage Magisk modules and root permissions. `FOSS`
- **[Magisk Manager for Recovery Mode](https://github.com/Rikj000/Magisk-Manager-for-Recovery-Mode)** - Easily manage your Magisk Modules from a terminal session in your custom recovery. `FOSS` `[M]`
- **⭐ [SukiSU-Ultera](https://github.com/SukiSU-Ultra/SukiSU-Ultra)** - A kernel-based root solution for Android devices, forked from `KernelSU` with some useful changes.
- **⭐ [MMRL](https://play.google.com/store/apps/details?id=com.dergoogler.mmrl)** - An Android app that helps manage your own modules repository. `FOSS` | [📦 Source](https://github.com/DerGoogler/MMRL)

## Zygisk Implementations

<details>
<summary><strong><bold>What is Zygisk?</bold></strong></summary>

Zygisk is a feature that allows modules to inject code directly into the Zygote process in Android. This enables **powerful system-level modifications**, such as **hiding root**, patching app behavior, and more, with minimal impact on device stability and performance.
</details>

- **[NeoZygisk](https://github.com/JingMatrix/NeoZygisk)**  
  Zygote injection module implemented using ptrace, providing Zygisk API support for APatch and KernelSU. Serves as a replacement for Magisk's built-in Zygisk. `FOSS` `[M]`
- **[ReZygisk](https://github.com/PerformanC/ReZygisk)**  
  Standalone and open-source Zygisk implementation, offering Zygisk API support for KernelSU and as a drop-in replacement for Magisk's Zygisk. `FOSS` `[M]` `[K]`
- **⭐ [Zygisk Next](https://github.com/Dr-TSNG/ZygiskNext)**  
  Advanced standalone Zygisk implementation, supporting KernelSU and replacing Magisk's built-in Zygisk. `Proprietary` `[M]` `[K]`

::: tip **💡 Tip:**  
Use these modules if you need Zygisk features on alternative root frameworks (KernelSU, APatch), or want more control over Zygisk behavior than Magisk's
:::

## Root Hiding and Integrity
> [TheUnrealZaka's Guide for Hiding Root](https://gist.github.com/TheUnrealZaka/042040a1700ad869d54e781507a9ba4f)

- **[Android VBMeta Fixer](https://github.com/reveny/Android-VBMeta-Fixer)** - A Magisk/KernelSU/Apatch module to fix VBMeta detections on Android. `FOSS` `[M]` `[K]`
- **⭐ [Hide My Applist](https://github.com/Dr-TSNG/Hide-My-Applist)** - An Xposed module to intercept applist detections.[Moded Fork](https://github.com/pumPCin/HMAL). `FOSS` `[LSP]`
- **[Komodo Build Props](https://github.com/Elcapitanoe/Komodo-Build-Prop#komodo-build-props)** - Spoof your Android device as the Pixel 9 Pro XL (komodo/komodo_beta). `FOSS` `[M]`
- **⭐ [Mountify](https://github.com/backslashxx/mountify)** - Globally mounted modules via OverlayFS. `FOSS` `[M]`
- **⭐ [NoHello](https://github.com/MhmRdd/NoHello)** -  A Zygisk module to hide root. `FOSS` `[M]`
- **[PlaycurlNEXT](https://github.com/daboynb/playcurlNEXT)** - Fix Play Integrity (and SafetyNet) verdicts, allowing custom fields and props. `FOSS` `[M]` `[K]`
- **[Play Integrity Fork](https://github.com/osm0sis/PlayIntegrityFork)** - A fork of PIF that fixes "MEETS_DEVICE_INTEGRITY" for Android <13 "deviceRecognitionVerdict" with the Play Integrity API. `FOSS` `[M]`
- **[Sensitive_Props Mod](https://github.com/Pixel-Props/sensitive-props)** - Helps you bypass SafetyNet and Play Integrity on rooted Android devices by modifying system properties and applying device-specific fixes. `FOSS` `[M]`
- **⭐ [Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)** - Hide Magisk. `Proprietary` `[M]`
- **⭐ [SUSFS Module](https://github.com/sidex15/susfs4ksu-module)** - An addon root hiding service for KernelSU. `FOSS` `[M]`
- **⭐ [TrickyStore](https://github.com/5ec1cff/TrickyStore)** - Modifying the certificate chain generated for android key attestation. `Proprietary` `[M]` `[K]`
- **[Tricky Addon - Update Target List](https://github.com/KOWX712/Tricky-Addon-Update-Target-List)** - A KSU WebUI to configure Tricky Store target.txt. `FOSS` `[K]`
- **[Tricky Store OSS](https://github.com/beakthoven/TrickyStoreOSS)** - Open source alternative to proprietary Tricky Store module. `[M]` `[K]`
- **⭐ [YuriKey](https://github.com/dpejoh/yurikey)** - A systemless module to get strong integrity easily. `FOSS` `[M]` `[K]`
- **[Zygisk-Assistant](https://github.com/snake-4/Zygisk-Assistant)** - A Zygisk module to hide root for KernelSU, Magisk and APatch. `FOSS` `[M]`

:exclamation: Root hiding is a constant cat‑and‑mouse game. These methods might break with updates to Google Play Services or specific apps.

## Root Detection Tools
- **⭐ [Android-Native-Root-Detector](https://github.com/reveny/Android-Native-Root-Detector)** - A tool for detecting root on android. `FOSS`
- **[MagiskDetection](https://github.com/apkunpacker/MagiskDetection)** - Collection of Some publicaly Available POC Apps to Detect Root/Magisk presence. `FOSS` `Proprietary`
- **[Play Integrity API Checker](https://play.google.com/store/apps/details?id=gr.nikolasspyr.integritycheck)** - This app shows info about your device integrity as reported by Google Play Services. If any of this fails could mean your device is rooted or tampered in a way. `FOSS` | [📦 Source](https://github.com/1nikolas/play-integrity-checker-app)

After hiding root, you can check whether hiding works via root detection apps, see [rushiranpise/detection](https://github.com/rushiranpise/detection).

## Bootloop Protection
- **[Anti bootloop](https://github.com/Magisk-Modules-Alt-Repo/abootloop)** - A Magisk Module to protect from bootloops. `FOSS` `[M]`
- **[YetAnotherBootloopProtector](https://github.com/Magisk-Modules-Alt-Repo/YetAnotherBootloopProtector)** - A Magisk Module to monitor and fix potential Bootloops and SystemUI failures. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)

---
