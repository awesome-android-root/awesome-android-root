---
layout: doc
title: "Terminal & ADB Tools for Root"
description: Browse terminals, ADB and debugging tools, developer utilities, Linux environments, automation apps, scripting modules and hardware sensor tools for root.
head:
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: twitter:description
      content: Browse terminals, ADB and debugging tools, developer utilities, Linux environments, automation apps, scripting modules and hardware sensor tools for root.
---

# Terminal & ADB Tools for Root

**Development & Automation** tools for rooted Android devices - terminal & shell environments (**Termux**),
**ADB & debugging** helpers, developer tools (**Shizuku** and friends), full **Linux environments**,
automation apps (**Tasker, MacroDroid, Automate**) and hardware/sensor utilities.


## ADB & Debugging

- **[ADB Root](https://github.com/evdenis/adb_root)** - A Magisk module that runs the adbd daemon as root and skips USB authentication. `FOSS` `[M]`
- **[altdb](https://github.com/Dr-TSNG/altdb)** - KernelSU module running a separate wireless ADB server over the local network with six-digit TLS pairing and a WebUI, leaving the system adbd and its authorizations untouched. Android 11+ arm64. `FOSS` `[K]`
- **[Android-ADB-over-WiFi](https://github.com/warren-bank/Android-ADB-over-WiFi)** - Toggles a rooted device's Android Debug Bridge daemon (adbd) between USB and WiFi mode. `FOSS` `[LSP]`
- **[Auto USB MTP](https://github.com/Shuoh118/Auto-USB-MTP)** - Hooks UsbDeviceManager and AdbService in the system framework on Android 12+ to automatically switch USB connections to MTP mode when a cable is plugged in. `Proprietary` `[LSP]`
- **[Debug Assistant](https://github.com/ThePedroo/DebugAssistant)** - The simplest yet powerful logcat capture system as Magisk module. `FOSS` `[M]` `[A]`
- **[Enable MIUI ADB](https://github.com/Ylarod/enable-miui-adb)** - Enables adb install on MIUI/HyperOS without Xiaomi account login or SIM verification via a one-shot KernelSU/Magisk script. `FOSS` `[M]` `[K]` `[A]`
- **[Hotspot Wireless Debugging](https://github.com/droserasprout/io.drsr.hotspotadb)** - Xposed module to allow Wireless Debugging over Wi-Fi Hotspot. `FOSS` `[LSP]`
- **[LADB](https://github.com/tytydraco/LADB)** - Local ADB shell with a built-in terminal interface. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=com.draco.ladb)
- **[Log Catcher](https://github.com/hxreborn/Log-Catcher)** - Captures logcat and kernel messages during startup and archives them as timestamped tarballs after unlock. `FOSS` `[M]` `[K]` `[A]`
- **[Logcat Extreme](https://play.google.com/store/apps/details?id=scd.lcex)** - Logcat reader and capture tool for rooted Android devices. `Proprietary`
- **[Loki](https://github.com/trinadhthatakula/Loki)** - Logcat reader that captures, saves and shares another app's logs using root or Shizuku. `FOSS`
- **[Magisk-WiFiADB](https://github.com/mrh929/magisk-wifiadb)** - Enable WiFi ADB automatically. `FOSS` `[M]`
- **[USBManager](https://github.com/TigerSpirit217/USBManager/blob/master/README_ENG.md)** - Shows a USB mode picker when the phone is connected to a computer, with one-tap ADB toggles and optional auto-disable of USB debugging on unplug. `FOSS` `[LSP]`
- **[Wireless ADB Controller](https://github.com/Magisk-Modules-Alt-Repo/wadbd)** - Magisk module to enable, disable and manage wireless ADB daemon per session or at boot with custom port and key support. `FOSS` `[M]` `[K]` `[A]`
- **[Wireless ADB Switch](https://github.com/Smooth-E/wireless-adb-switch)** - Quickly enable or disable Android's Wireless Debugging feature. Includes widgets and a quick settings tile for convenience. `FOSS` | [🌱](https://f-droid.org/ru/packages/com.smoothie.wirelessDebuggingSwitch)

## Automation

- **[⭐ MacroDroid](https://play.google.com/store/search?q=macrodroid&c=apps)** - Easy to use automation app. `Proprietary`
- **[⭐ Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)** - An advanced and powerful automation app. `Proprietary`
- **[Automate](https://play.google.com/store/apps/details?id=com.llamalab.automate)** - Lets you create custom automation workflows using flowcharts, enabling seamless management of tasks, files, and device settings. `Proprietary`
- **[crond4Android](https://github.com/powerAn2020/crond4android)** - Cron daemon for scheduled jobs on KernelSU, APatch, and Magisk. `FOSS` `[M]` `[K]` `[A]`
- **[Eta](https://github.com/Mangi-11/Eta/blob/main/README_EN.md)** - System-level BYOK AI agent with direct Android API calls, a GUI agent, terminal and Alpine/Debian environments, Skills and MCP. Core features run without root; root and LSPosed add system access and assistant entry points. Android 13+. `Proprietary` `[LSP]`
- **[FIRERPA (lamda)](https://github.com/firerpa/lamda)** - On-device control platform driven by a Python client: remote desktop streaming, UI/OCR automation, traffic capture, built-in Frida and proxy/VPN networking. Runs with or without root. `FOSS`
- **[Geto](https://github.com/T31n/Geto)** - Applies device settings automatically when selected apps are launched, using `WRITE_SECURE_SETTINGS` granted through Shizuku or root. `FOSS` | [🌱](https://f-droid.org/en/packages/com.android.geto/)
- **[Zafiro](https://github.com/niki914/zafiro)** - BYOK AI agent with full phone control, native Shell and Python 3, and Skills and MCP support. Runs via Shizuku with root optional. `FOSS`

## Developer Tools

- **[AndroidSpect](https://github.com/thecybersandeep/androidspect)** - Live runtime audit for installed Android apps, serves a browser dashboard. `FOSS` `[LSP]`
- **[Bluetooth Hook](https://github.com/jingyu233/bluetoothhook#english)** - Inject virtual BLE devices into Android system Bluetooth scan results, facilitating Bluetooth application debugging for developers. `FOSS` `[LSP]`
- **[Covalent](https://github.com/PalmDevs/covalent)** - Modification framework for React Native apps that runs custom Hermes bytecode before the app's own, forces DevSupport on and exposes React Native DevTools for live inspection and editing. Targets React Native 0.86.3 with Hermes V1. `FOSS` `[LSP]`
- **[Dhizuku API for Xposed](https://github.com/iamr0s/Dhizuku-API-Xposed)** - Force applications to support Dhizuku. `FOSS` `[LSP]`
- **[DuckPolicy](https://github.com/Xposed-Modules-Repo/com.strawing.duckdevicepolicy)** - Makes apps see no device-policy restrictions on your own device. `Proprietary` `[LSP]`
- **[KSU Toolkit](https://github.com/backslashxx/ksu_toolkit)** - Small extensions on top of KernelSU for testing and debugging purposes. `FOSS` `[K]`
- **[Nano for Android NDK](https://github.com/Magisk-Modules-Repo/nano-ndk)** - Allows temporary recovery use, so you can trigger it from adb shell or TWRP Terminal. `FOSS` `[M]`
- **[Py2Droid](https://github.com/Mrakorez/py2droid)** - Install Python 3 on Android, including the standard library (STDLIB). `FOSS` `[M]` `[A]`
- **[SELinux Permissive](https://github.com/evdenis/selinux_permissive)** - Magisk Module that switches SELinux to permissive mode. `FOSS` `[M]`
- **[Shizuku](https://github.com/RikkaApps/Shizuku)** - Use system APIs directly with ADB/root privileges. `FOSS` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/moe.shizuku.privileged.api) | [▶️](https://play.google.com/store/search?q=shizuku&c=apps)
- **[SQLite3 for Android](https://github.com/rojenzaman/sqlite3-magisk-module)** - Provides a statically linked `sqlite3` binary for arm64-v8a, armeabi-v7a, x86 and x86_64. `Proprietary` `[M]`
- **[Zygisk-Loader](https://github.com/HanSoBored/Zygisk-Loader)** - Module for hot-swapping native libraries into Android applications without rebooting. `FOSS` `[K]` `[A]`

### Shizuku Forks

The official Shizuku app sees infrequent releases, and community trackers report it breaks on the newest Android versions. These forks keep the Shizuku API, so compatible apps work with them unchanged. Forks share the official package name (except Shizako), so uninstall the current Shizuku before installing one. See the [awesome-shizuku catalog](https://github.com/timschneeb/awesome-shizuku) for the full ecosystem.

- **[⭐ Porter](https://github.com/d4rken-org/porter)** - Minimal maintained fork by the SD Maid developer that gives apps ADB access through the Shizuku APIs, with optional root and a compatibility companion for Shizuku-only apps. `FOSS`
- **[Fork Shizuku](https://github.com/symbuzzer/fork-Shizuku)** - Easy-to-use variant of thedjchi's fork with watchdog auto-restart, TCP mode and stealth mode. `FOSS`
- **[Nightzuku](https://github.com/kerneldroid/Nightzuku)** - Fork with a Material 3 Expressive UI and current Android SDK updates. `FOSS`
- **[shevery](https://github.com/HmnDev-Tech/shevery)** - Material 3 fork with autostart, TCP mode, Dhizuku, module support and a built-in terminal. `FOSS`
- **[Shizako](https://github.com/cr1437/Shizako)** - Drop-in replacement that ships a distinct package name, since upstream's license forbids forks from using the stock application ID. `FOSS`
- **[Shizuku Fork](https://github.com/thedjchi/Shizuku)** - Fork with automatic startup, TCP mode, watchdog and stealth mode. Maintenance is currently paused, and many other forks build on it. `FOSS`
- **[Shizuku Next](https://github.com/rushiranpise/Shizuku-Next)** - Continuation of thedjchi's fork with improved setup, reliability, UI and additional start methods. `FOSS`
- **[ShizukuPlus](https://github.com/thejaustin/ShizukuPlus)** - Enhanced fork unifying root, ADB and Dhizuku privileges with an extended API suite and Android 16/17 compatibility fixes. `FOSS`

### Frida & Reverse Engineering

<details><summary>What is Frida?</summary>

Frida allows you to inject your own scripts into black box processes, enabling you to hook function calls, modify arguments and return values, and perform other runtime manipulations on applications.

</details><br>

- **[Florida](https://github.com/Ylarod/Florida)** - Anti-detection build of frida-server for Android, patched and built automatically from Frida upstream. `FOSS`
- **[Jezail](https://github.com/zahidaz/jezail)** - On-device pentesting toolkit that exposes a REST API and web interface for device control, app management, Frida, ADB and logcat on a rooted phone. `FOSS`
- **[MagiskFrida](https://github.com/ViRb3/magisk-frida)** - Lets you run frida-server on boot with multiple root solutions. `FOSS` `[M]` `[K]` `[A]`
- **[MagiskHluda](https://github.com/Exo1i/MagiskHluda)** - Starts a Florida-based, less detectable frida-server on boot, with a web UI to start, stop and configure it. `Proprietary` `[M]` `[K]` `[A]`
- **[ReShift](https://github.com/fzer0x/ReShift)** - On-device Frida and Zygisk dynamic analysis suite with script repository management, memory inspection, an IL2CPP Unity dumper, local or cloud LLM script assistance and anti-detection stealth controls. `FOSS` `[M]` `[K]` `[A]`
- **[Undetected Frida](https://github.com/zer0def/undetected-frida)** - Frida builds with community anti-detection patches applied, also shipped as Magisk/KernelSU modules. `FOSS` `[M]` `[K]`
- **[ZygiskFrida](https://github.com/lico-n/ZygiskFrida)** - Injects the Frida gadget into apps through Zygisk, avoiding the ptrace and APK integrity checks that detect frida-server. `FOSS` `[M]` `[K]`


## Hardware & Sensors

- **[GyroHook Project](https://github.com/AFan4724/GyroHook)** - Allows users to modify the gyroscope sensor data of Android devices. `FOSS` `[M]`
- **[HID Gadget Module](https://github.com/kelexine/hid-gadget-module)** - Enables Human Interface Device (HID) emulation/support on Android Devices. `FOSS` `[M]`
- **[Input Leaf](https://github.com/anasvhora284/input-leaf)** - Android client for Input Leap and compatible Deskflow setups that shares a PC's keyboard and mouse with a phone or tablet over Wi-Fi/LAN. Android 8.0+, no root required. `FOSS`
- **[OnePlus Flash Control](https://github.com/Bartixxx32/Opflashcontrol-app)** - Precise control over the brightness of the dual-tone and quad-tone LED flashes for OnePlus devices. `FOSS`
- **[Open Headunit](https://github.com/andreknieriem/open-headunit)** - Turns an Android phone or tablet into an Android Auto receiver over a USB wireless dongle, Wi-Fi Direct or a headunit hotspot. Root is optional and only needed to re-enable Android Auto's wireless startup receiver on 17.4 and newer. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=com.andrerinas.headunitrevived)
- **[USB HID Client](https://github.com/Arian04/android-hid-client)** - Use your phone as a keyboard and mouse without any software on the other end. `FOSS` | [🌱](https://apt.izzysoft.de/packages/me.arianb.usb_hid_client)

## Linux Environments

- **[⭐ Droidspaces](https://github.com/ravindu644/Droidspaces-OSS)** - Run full Linux environments on top of Android, with complete init system support. `FOSS`
- **[Auto-Linux](https://github.com/HanSoBored/Auto-Linux)** - A TUI application to install and manage Linux (chroot) environments on rooted Android devices. `FOSS`
- **[Boot Nethunter](https://github.com/cipherswami/boot-nethunter)** - Boots Kali-Chroot (one Installed with Nethunter apk) in Termux. `FOSS` 
- **[Chroot Distro](https://github.com/Magisk-Modules-Alt-Repo/chroot-distro)** - Install Gnu/Linux distributions on Android. `FOSS` `[M]` `[A]`
- **[DebDroid](https://github.com/NICUP14/DebDroid)** - Debian Container Runtime for Android. `FOSS` 
- **[LinuxOnAndroid](https://github.com/HsOjo/LinuxOnAndroid)** - Runs a Linux rootfs on the host kernel in a private mount namespace with `pivot_root`, fresh `/proc` `/sys` `/dev` and a loop-mounted ext4 image, so mount-aware tools and services such as SSH, Tailscale, Samba and Podman behave correctly. `FOSS` `[M]`
- **[Magisk Docker](https://github.com/mgksu/dockerd)** - Magisk and KernelSU module for running Docker on rooted Android devices. `FOSS` `[M]` `[K]`
- **[Trixie.apk](https://github.com/DesktopECHO/trixie.apk)** - Debian 13 (Trixie) Server/Desktop container for rooted Android 5.0+ devices. `FOSS`
- **[Ubuntu Chroot](https://github.com/ravindu644/Ubuntu-Chroot)** - Run Ubuntu 24.04 on Android With full Hardware Access and pure namespace isolation. `FOSS` `[M]` `[K]` `[A]`

## Terminal & Shell

- **[⭐ Termux](https://github.com/termux/termux-app)** - A terminal emulator application for Android OS extendible by variety of packages. `FOSS` | [🌱](https://f-droid.org/en/packages/com.termux)
- **[Android 16 Linux Terminal VM Persistence](https://github.com/DigijEth/VM_Magisk_Module)** - Keeps Androids Linux terminal running in the background. `FOSS` `[M]` 
- **[aShell You](https://github.com/DP-Hridayan/aShellYou)** - Android shell utility app with Material Design 3 UI, letting you run ADB, root and shell commands. `FOSS` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/in.hridayan.ashell)
- **[ReTerminal](https://github.com/RohitKushvaha01/ReTerminal)** - Material 3 terminal emulator built on Termux's TerminalView, with multiple sessions, virtual keys and Alpine Linux support. `FOSS`
- **[ssh-ksu](https://github.com/jtnqr/ssh-ksu)** - Statically compiled musl builds of OpenSSH, Bash, rsync, tmux, htop and nano for KernelSU and Magisk, running the SSH daemon in an isolated mount namespace with a WebUI for logs, config and host keys. `FOSS` `[M]` `[K]`
- **[Termux-Root-Recovery-Tool](https://github.com/Ishu43642/Termux-Root-Recovery-Tool)** - Install GSi Rom , Flashing Fastboot Rom, install Twrp Recovery, Boot.img & vbmeta.img files. `FOSS` 
- **[TermuxRootMods](https://github.com/rompelhd/TermuxRootMods)** - A Magisk module that enhances the Termux experience for rooted devices. `FOSS` `[M]`
