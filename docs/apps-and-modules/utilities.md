---
layout: doc
title: General Root Utilities for Android
description: "Browse general root utilities for Android: file sync and transfer, reboot and power controls, sharing and intent tools, messaging helpers and toolboxes."
head:
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: twitter:description
      content: "Browse general root utilities for Android: file sync and transfer, reboot and power controls, sharing and intent tools, messaging helpers and toolboxes."
---

# General Root Utilities for Android

**General utilities** for rooted Android that don't fit one narrow job: file sync & transfer, reboot & power
tools, sharing & intent tweaks, communication helpers and all-in-one power-user toolboxes.


## Communication & Messaging

- **[ACR Phone](https://play.google.com/store/apps/details?id=com.nll.cb)** - Records calls using root on Android 10 and above. `Proprietary`
- **[Basic Call Recorder](https://github.com/chenxiaolong/BCR)** - Automatically records incoming and outgoing calls on rooted devices or supported custom firmware; see [GUI for BCR ↗](https://github.com/nicorac/bcr-gui). `FOSS` `[M]` `[K]`
- **[Contacts Sync](https://play.google.com/store/apps/details?id=com.lb.contacts_sync)** - Syncs contact photos from WhatsApp using root. `Proprietary`
- **[Xinyi Relay](https://github.com/magisk317/xinyi-relay)** - Forwards SMS, app notifications and call notifications to multiple channels with rule filtering and auto OTP handling via LSPosed Enhanced mode. `FOSS` `[LSP]` | [▶️](https://play.google.com/store/apps/details?id=io.github.magisk317.xinyi.relay)
- **[XposedSmsCode](https://gitlab.com/magisk3171/XposedSmsCode)** - Recognizes SMS verification codes and copies or enters them automatically. `FOSS` `[LSP]` | [▶️](https://play.google.com/store/apps/details?id=com.github.tianma8023.xposed.smscode)
- **[XposedSmsCode by Rove24](https://github.com/Rove24/XposedSmsCode)** - Automatically recognizes and parses SMS verification codes, copies them to the clipboard, and auto-fills them into active text fields. `FOSS` `[LSP]`

## General Toolboxes

- **[⭐ Essentials](https://github.com/sameerasw/essentials)** - Multi-purpose tweaks for display, notifications and alerts, security and privacy, sound and haptics, and app freezing. `FOSS`
- **[APatch Utilities](https://github.com/lzghzr/APatch_kpm)** - Collection of utility modules for APatch. `FOSS`
- **[GreaseMilkyway](https://play.google.com/store/apps/details?id=net.kollnig.greasemilkyway)** - Helps people with attention-related conditions such as ADHD manage their digital environment using an accessibility service. `FOSS` `[LSP]`
- **[IslandRecorder](https://github.com/wxxsfxyzm/IslandRecorder)** - Records the screen through HyperOS Super Island with a countdown, timer and local-only storage. Needs root or Shizuku on Android 15 and newer. `FOSS`
- **[Kaorios Toolbox](https://github.com/Wuang26/Kaorios-Toolbox)** - Toolbox for the Kaorios ROM with Play Integrity fix, device and per-app property spoofing, Google Photos unlimited backup, payload dumper and high-FPS unlock. `Proprietary`
- **[KernelSU Grant Toast](https://github.com/NativeStar/KernelSUGrantToast)** - Shows a toast when KernelSU grants root access. `FOSS` `[K]`
- **[nebulaOS Toolkit](https://github.com/Smart-Home-User/XREAL-Beam-Pro-nebulaOS-Toolkit)** - Control overlay for the XREAL Beam Pro trackpad adding one-handed gesture presets, spatial app launching, quick apps, QR/barcode scanning, media and volume controls and D-pad navigation. Shizuku, Sui or root enables the privileged input controls. `FOSS`
- **[SvcHub](https://github.com/LimpidMo/SvcHub)** - Keeps Termux and binary services running and aggregates their WebUIs. `FOSS` `[M]` `[K]` `[A]`
- **[SwitchAI - Switch AI Digital Assistant](https://github.com/WSTxda/SwitchAI)** - Selects and launches installed digital assistants. `FOSS`
- **[System Tools Android](https://play.google.com/store/apps/details?id=com.redhome.sta)** - A system utility suite with many small tools for finer system work, including root utilities. `Proprietary`
- **[UotanToolbox NT](https://github.com/Uotan-Dev/UotanToolboxNT)** - A modern toolbox for Android power users and geeks. `FOSS`
- **[XposedModulets](https://github.com/binarynoise/XposedModulets)** - Provides a collection of small Xposed modules. `FOSS` `[LSP]`
- **[Zygisk Sui](https://github.com/XiaoTong6666/Sui)** - Provides Shizuku-compatible privileged Android APIs and services through Zygisk; requires root. `FOSS` `[M]` `[K]` `[A]`

> [!TIP]
> If you are looking for classic root managers and module managers, start with [Root Management](root-management.md). If you need shell commands or Linux tooling, see [Terminal and Shell Tools](development.md#terminal-shell).

## Reboot & Power

- **[Advanced Power Menu](https://github.com/Xposed-Modules-Repo/com.sui.advancedpowermenu)** - Adds reboot, recovery, bootloader, SystemUI restart and lockdown actions to the power menu. `Proprietary` `[LSP]`
- **[RebootNya](https://github.com/daisukiKaffuChino/RebootNya)** - Provides privileged reboot options using root or Shizuku. `FOSS`

## Sharing & Intent Tools

- **[⭐ CleanShare](https://github.com/hxreborn/cleanshare)** - Removes Direct Share's suggested contact/conversation shortcuts from Android's Share Sheet. `FOSS` `[LSP]`
- **[Clipboard Whitelist](https://github.com/fei-ke/ClipboardWhitelist)** - Lets whitelisted apps read the clipboard in the background on Android 10 and newer. `FOSS` `[LSP]`
- **[ClipVault](https://github.com/kaduvert/AClipBoardManager)** - Keeps a searchable local clipboard history using a privileged service or LSPosed. `FOSS` `[M]` `[K]` `[LSP]`
- **[FerryQR](https://github.com/lcebot/ferryqr)** - Scans QR codes and opens them in the relevant app, with LSPosed support for selected in-app scanners. `FOSS` `[LSP]`
- **[HyperCopy](https://github.com/1812z/HyperCopy)** - Opens copied links, addresses and tracking numbers in matching apps using configurable rules. LSPosed or Shizuku; cloud rules are fetched online. `Proprietary` `[LSP]`
- **[No Photo Picker API](https://github.com/yureitzk/NoPhotoPickerAPI)** - Bypasses the Android Photo Picker API and lets apps use the classic document/file picker. `FOSS` `[LSP]`
- **[NoBrowser](https://github.com/SoL01St/exlindev)** - Opens links from supported apps in an external browser instead of their built-in browsers. `FOSS` `[LSP]`

## Sync & File Transfer

- **[Rclone Magisk Module](https://github.com/NewFuture/rclone-fuse3-magisk)** - Runs Rclone with FUSE support for remote storage mounts. `FOSS` `[M]`
- **[Syncthing Live Update](https://github.com/MrxSiN/syncthing-liveupdate)** - Turns Syncthing's sync progress into an Android Live Update in the status bar chip, lock screen and always-on display, without a second notification or REST polling. Android 16+ and Syncthing-Fork 2.1.x. `FOSS` `[LSP]`
