---
layout: doc
title: "Development & Automation"
description: "Development, automation and power-user tools for rooted Android: terminal & shell, ADB and debugging tools, developer utilities, Linux environments (chroot/containers), automation apps and hardware/sensor tools."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.zhoe.org/apps-and-modules/development
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: keywords
      content: "android development tools, termux, adb tools root, wireless debugging, logcat magisk, linux on android, chroot, docker android, tasker, macrodroid, automate, automation root, shizuku, selinux permissive, android scripting"
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:site_name
      content: Awesome Android Root
  - - meta
    - property: og:title
      content: "Development & Automation | Awesome Android Root"
  - - meta
    - property: og:description
      content: "Development, automation and power-user tools for rooted Android: terminal & shell, ADB and debugging tools, developer utilities, Linux environments (chroot/containers), automation apps and hardware/sensor tools."
  - - meta
    - property: og:url
      content: https://awesome-android-root.zhoe.org/apps-and-modules/development
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
      content: "Development & Automation | Awesome Android Root"
  - - meta
    - name: twitter:description
      content: "Development, automation and power-user tools for rooted Android: terminal & shell, ADB and debugging tools, developer utilities, Linux environments (chroot/containers), automation apps and hardware/sensor tools."
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.zhoe.org/images/og.png
---

# Development & Automation

**Development & Automation** tools for rooted Android devices - terminal & shell environments (**Termux**),
**ADB & debugging** helpers, developer tools (**Shizuku** and friends), full **Linux environments**,
automation apps (**Tasker, MacroDroid, Automate**) and hardware/sensor utilities.

<ClientOnly>
  <AppSearch />
</ClientOnly>

<div class="app-search-content">

## Terminal & Shell

- **[⭐ Termux](https://github.com/termux/termux-app)** - A terminal emulator application for Android OS extendible by variety of packages. `FOSS` | [🌱](https://f-droid.org/en/packages/com.termux)
- **[Android 16 Linux Terminal VM Persistence](https://github.com/DigijEth/VM_Magisk_Module)** - Keeps Androids Linux terminal running in the background. `FOSS` `[M]` 
- **[aShell You](https://github.com/DP-Hridayan/aShellYou)** - Android shell utility app with Material Design 3 UI, letting you run ADB, root and shell commands. `FOSS` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/in.hridayan.ashell)
- **[ReTerminal](https://github.com/RohitKushvaha01/ReTerminal)** - Material 3 terminal emulator built on Termux's TerminalView, with multiple sessions, virtual keys and Alpine Linux support. `FOSS`
- **[Termux-Root-Recovery-Tool](https://github.com/Ishu43642/Termux-Root-Recovery-Tool)** - Install GSi Rom , Flashing Fastboot Rom, install Twrp Recovery, Boot.img & vbmeta.img files. `FOSS` 
- **[TermuxRootMods](https://github.com/rompelhd/TermuxRootMods)** - A Magisk module that enhances the Termux experience for rooted devices. `FOSS` `[M]`

## ADB & Debugging

- **[ADB Root](https://github.com/evdenis/adb_root)** - A Magisk module that runs the adbd daemon as root and skips USB authentication. `FOSS` `[M]`
- **[Android-ADB-over-WiFi](https://github.com/warren-bank/Android-ADB-over-WiFi)** - Toggles a rooted device's Android Debug Bridge daemon (adbd) between USB and WiFi mode. `FOSS` `[LSP]`
- **[Debug Assistant](https://github.com/ThePedroo/DebugAssistant)** - The simplest yet powerful logcat capture system as Magisk module. `FOSS` `[M]`
- **[Hotspot Wireless Debugging](https://github.com/droserasprout/io.drsr.hotspotadb)** - Xposed module to allow Wireless Debugging over Wi-Fi Hotspot. `FOSS` `[LSP]`
- **[LADB](https://github.com/tytydraco/LADB)** - Local ADB shell. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=com.draco.ladb)
- **[Log Catcher](https://github.com/hxreborn/Log-Catcher)** - Captures logcat and kernel messages during startup and archives them as timestamped tarballs after unlock. `FOSS` `[M]` `[K]`
- **[Loki](https://github.com/trinadhthatakula/Loki)** - Logcat reader that captures, saves and shares another app's logs using root or Shizuku. `FOSS`
- **[Magisk-WiFiADB](https://github.com/mrh929/magisk-wifiadb)** - Enable WiFi ADB automatically. `FOSS` `[M]`
- **[Wireless ADB Switch](https://github.com/Smooth-E/wireless-adb-switch)** - Quickly enable or disable Android's Wireless Debugging feature. Includes widgets and a quick settings tile for convenience. `FOSS` | [🌱](https://f-droid.org/ru/packages/com.smoothie.wirelessDebuggingSwitch)

## Developer Tools

- **[⭐ Shizuku Fork](https://github.com/thedjchi/Shizuku)** - Shizuku fork with automatic Shizuku startup, automation, and recovery features. `FOSS`
- **[AndroidSpect](https://github.com/thecybersandeep/androidspect)** - Live runtime audit for installed Android apps, serves a browser dashboard. `FOSS` `[LSP]`
- **[Bluetooth Hook](https://github.com/jingyu233/bluetoothhook#english)** - Inject virtual BLE devices into Android system Bluetooth scan results, facilitating Bluetooth application debugging for developers. `FOSS` `[LSP]`
- **[Dhizuku API for Xposed](https://github.com/iamr0s/Dhizuku-API-Xposed)** - Force applications to support Dhizuku. `FOSS` `[LSP]`
- **[DuckPolicy](https://github.com/Xposed-Modules-Repo/com.strawing.duckdevicepolicy)** - Makes apps see no device-policy restrictions on your own device. `Proprietary` `[LSP]`
- **[Florida](https://github.com/Ylarod/Florida)** - Anti-detection build of frida-server for Android, patched and built automatically from Frida upstream. `FOSS`
- **[Jezail](https://github.com/zahidaz/jezail)** - On-device pentesting toolkit that exposes a REST API and web interface for device control, app management, Frida, ADB and logcat on a rooted phone. `FOSS`
- **[KSU Toolkit](https://github.com/backslashxx/ksu_toolkit)** - Small extensions on top of KernelSU for testing and debugging purposes. `FOSS` `[K]`
- **[MagiskHluda](https://github.com/Exo1i/MagiskHluda)** - Starts a Florida-based, less detectable frida-server on boot, with a web UI to start, stop and configure it. `Proprietary` `[M]` `[K]` `[A]`
- **[Py2Droid](https://github.com/Mrakorez/py2droid)** - Install Python 3 on Android, including the standard library (STDLIB). `FOSS` `[M]`
- **[SideWire](https://github.com/mzggr0914/SideWire-KernelSU)** - Native bridge for controlling rooted Android devices from Windows, macOS, or Linux. `FOSS` `[K]`
- **[SELinux Permissive](https://github.com/evdenis/selinux_permissive)** - Magisk Module that switches SELinux to permissive mode. `FOSS` `[M]`
- **[Shevery](https://github.com/HmnDev-Tech/shevery)** - Based on shizuku with Jetpack Compose, Material 3, and compatibility enhancements. `FOSS`
- **[Shizuku](https://github.com/RikkaApps/Shizuku)** - Use system APIs directly with ADB/root privileges. `FOSS` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/moe.shizuku.privileged.api) | [▶️](https://play.google.com/store/search?q=shizuku&c=apps)
- **[SQLite3 for Android](https://github.com/rojenzaman/sqlite3-magisk-module)** - Provides a statically linked `sqlite3` binary for arm64-v8a, armeabi-v7a, x86 and x86_64. `Proprietary` `[M]`
- **[Undetected Frida](https://github.com/zer0def/undetected-frida)** - Frida builds with community anti-detection patches applied, also shipped as Magisk/KernelSU modules. `FOSS` `[M]` `[K]`
- **[ZygiskFrida](https://github.com/lico-n/ZygiskFrida)** - Injects the Frida gadget into apps through Zygisk, avoiding the ptrace and APK integrity checks that detect frida-server. `FOSS` `[M]` `[K]`
- **[Zygisk-Loader](https://github.com/HanSoBored/Zygisk-Loader)** - Module for hot-swapping native libraries into Android applications without rebooting. `FOSS` `[K]`

## Linux Environments

- **[⭐ Droidspaces](https://github.com/ravindu644/Droidspaces-OSS)** - Run full Linux environments on top of Android, with complete init system support. `FOSS`
- **[Auto-Linux](https://github.com/HanSoBored/Auto-Linux)** - A TUI application to install and manage Linux (chroot) environments on rooted Android devices. `FOSS`
- **[Boot Nethunter](https://github.com/cipherswami/boot-nethunter)** - Boots Kali-Chroot (one Installed with Nethunter apk) in Termux. `FOSS` 
- **[Chroot Distro](https://github.com/Magisk-Modules-Alt-Repo/chroot-distro)** - Install Gnu/Linux distributions on Android. `FOSS` `[M]`
- **[DebDroid](https://github.com/NICUP14/DebDroid)** - Debian Container Runtime for Android. `FOSS` 
- **[Magisk Docker](https://github.com/mgksu/dockerd)** - Magisk and KernelSU module for running Docker on rooted Android devices. `FOSS` `[M]` `[K]`
- **[Trixie.apk](https://github.com/DesktopECHO/trixie.apk)** - Debian 13 (Trixie) Server/Desktop container for rooted Android 5.0+ devices. `FOSS`
- **[Ubuntu Chroot](https://github.com/ravindu644/Ubuntu-Chroot)** - Run Ubuntu 24.04 on Android With full Hardware Access and pure namespace isolation. `FOSS` `[M]` `[K]`

## Automation

- **[⭐ MacroDroid](https://play.google.com/store/search?q=macrodroid&c=apps)** - Easy to use automation app. `Proprietary`
- **[⭐ Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)** - An advanced and powerful automation app. `Proprietary`
- **[Automate](https://play.google.com/store/apps/details?id=com.llamalab.automate)** - Lets you create custom automation workflows using flowcharts, enabling seamless management of tasks, files, and device settings. `Proprietary`
- **[crond4Android](https://github.com/powerAn2020/crond4android)** - Cron daemon for scheduled jobs on KernelSU, APatch, and Magisk. `FOSS` `[M]` `[K]`
- **[FIRERPA (lamda)](https://github.com/firerpa/lamda)** - On-device control platform driven by a Python client: remote desktop streaming, UI/OCR automation, traffic capture, built-in Frida and proxy/VPN networking. Runs with or without root. `FOSS`
- **[Geto](https://github.com/T31n/Geto)** - Applies device settings automatically when selected apps are launched, using `WRITE_SECURE_SETTINGS` granted through Shizuku or root. `FOSS` | [🌱](https://f-droid.org/en/packages/com.android.geto/)

## Hardware & Sensors

- **[GyroHook Project](https://github.com/AFan4724/GyroHook)** - Allows users to modify the gyroscope sensor data of Android devices. `FOSS` `[M]`
- **[HID Gadget Module](https://github.com/kelexine/hid-gadget-module)** - Enables Human Interface Device (HID) emulation/support on Android Devices. `FOSS` `[M]`
- **[OnePlus Flash Control](https://github.com/Bartixxx32/Opflashcontrol-app)** - Precise control over the brightness of the dual-tone and quad-tone LED flashes for OnePlus devices. `FOSS`
- **[USB HID Client](https://github.com/Arian04/android-hid-client)** - Use your phone as a keyboard and mouse without any software on the other end. `FOSS` | [🌱](https://apt.izzysoft.de/packages/me.arianb.usb_hid_client)

</div>
