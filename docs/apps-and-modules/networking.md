---
layout: doc
title: "VPN, Proxy & Network Mods for Root"
description: Browse VPN, proxy and DNS modules, network tools, Wi-Fi and Bluetooth utilities, NFC and mobile data tweaks for rooted Android network control.
head:
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: twitter:description
      content: Browse VPN, proxy and DNS modules, network tools, Wi-Fi and Bluetooth utilities, NFC and mobile data tweaks for rooted Android network control.
---

# VPN, Proxy & Network Mods for Root

**Networking** tools for rooted Android devices - VPN & transparent proxy modules (Clash, sing-box, v2ray and
more), network diagnostics, Wi-Fi & mobile data utilities and Bluetooth & NFC apps and modules.

> [!TIP]
> Related: [Ad Blocking](/apps-and-modules/ad-blocking.md) covers DNS-level filtering;
> [Security](/apps-and-modules/security.md) covers per-app firewalls.


## Bluetooth & NFC

- **[KonamikU](https://github.com/C-F0x/KonamikU)** - Extend NFC Capabilities of your device. `FOSS` `[LSP]`
- **[NFC Card Emulator Pro (Root)](https://play.google.com/store/apps/details?id=com.yuanwofei.cardemulator.pro)** - NFC card emulator for access cards, elevator cards, meal cards, school cards, library cards, and other IC cards. `Proprietary`
- **[NFCGate](https://github.com/nfcgate/nfcgate)** - Android application meant to capture, analyze, or modify NFC traffic. `FOSS` `[LSP]` | [🌱](https://f-droid.org/packages/de.tu_darmstadt.seemoo.nfcgate/)
- **[onHit](https://github.com/0penPublic/onHit)** - Trigger Android NFC events without a physical tag by Xposed. `FOSS` `[LSP]`

## Network Tools

- **[MagicNet](https://github.com/LIghtJUNction/MagicNet#english-summary)** - Enforces device-side network rules below the app layer rather than relying on apps to respect proxy settings. `FOSS` `[M]` `[K]` `[A]`
- **[Magisk LAN Auto Switch](https://github.com/NewFuture/magisk-modules/tree/main/magisk-lan-auto-switch)** - Automatically switch LAN and WiFi based on eth0 connection status. `FOSS` `[M]`
- **[MultiRoute](https://github.com/Linoleic/MultiRoute)** - Gives each app its own network channel. `FOSS` `[LSP]`
- **[Netcut](https://github.com/rajnishsubedi0/Netcut)** - Cuts internet access for other devices on the local network through ARP spoofing, with ban, unban, protect and save lists. Requires root; use only on networks you own or are authorized to test. `FOSS`
- **[Network Utilities](https://play.google.com/store/apps/details?id=com.myprog.netutils)** - Application contains a set of tools for networks diagnostics. `Proprietary`
- **[SimbaDroid](https://github.com/buttercookie42/SimbaDroid)** - Runs an SMB file server on Android. `FOSS` | [🌱](https://f-droid.org/packages/de.buttercookie.simbadroid)
- **[TCP Optimiser Module](https://github.com/fatalcoder524/TCP_Optimiser_Module)** - Change tcp congestion algorithm based on current active internet type and some network enhancements. `FOSS` `[M]` `[K]` `[A]`

## VPN & Proxy

- **[AsteriskBOX](https://github.com/Asterisk4Magisk/AsteriskBOX)** - A sing-box GUI client for Android, support VPN Service, TPROXY(ROOT), TUN(ROOT), eBPF(ROOT), TUN2SOCKS(ROOT) and BPF2SOCKS(ROOT). `FOSS` `[M]` `[K]`
- **[AsteriskMETA](https://github.com/Asterisk4Magisk/AsteriskMETA)** - A Mihomo GUI client for Android, support VPN Service, TPROXY(ROOT), TUN(ROOT), TUN2SOCKS(ROOT) and BPF2SOCKS(ROOT). `FOSS` `[M]` `[K]`
- **[AsteriskNG](https://github.com/Asterisk4Magisk/AsteriskNG)** - An Xray GUI client for Android, support VPN Service, TPROXY(ROOT), TUN2SOCKS(ROOT) and BPF2SOCKS(ROOT). `FOSS` `[M]` `[K]`
- **[Aurora](https://github.com/Tkocean/Aurora)** - This project deploys sing-box, mihome proxies via Magisk, KernelSU, or APatch. `FOSS` `[M]` `[K]` `[A]`
- **[Box for Root](https://github.com/taamarin/box_for_magisk)** - Configures a transparent proxy on rooted Android devices using tools including Clash, sing-box, V2Ray, Hysteria and Xray. `FOSS` `[M]` `[K]` `[A]`
- **[Box4Magisk / KernelSU / APatch](https://github.com/CHIZI-0618/box4magisk)** - Deploy multiple proxy cores on Android devices, including clash, mihomo, sing-box, v2ray, xray, and hysteria. `FOSS` `[M]` `[K]` `[A]`
- **[FlClash](https://github.com/chen08209/FlClash)** - Provides a multi-platform proxy client based on Clash Meta. `FOSS`
- **[Github-direct](https://github.com/FxxkLocation/Github-direct)** - Per-app connectivity module combining pollution-resistant DNS, verified endpoint candidates and transparent TCP/TLS relaying over IPv4 and IPv6, with fail-open rollback and a VPN backend for devices without root. GitHub is the validated profile; Google, YouTube, Discord and OpenAI routing stays experimental and off by default. `FOSS` `[M]` `[K]` `[LSP]`
- **[Happwner](https://github.com/Omegaplexx/Happwner)** - Exporte Happ subscriptions to other VPN clients. `FOSS` `[LSP]`
- **[NetProxy-Magisk](https://github.com/Fanju6/NetProxy-Magisk)** - Starts and stops a transparent proxy based on Xray. `FOSS` `[M]` `[A]`
- **[NoVPNDetect](https://github.com/RuslanUC/NoVPNDetect)** - Prevents some apps from detecting your phone is connected to a VPN. `FOSS` `[LSP]`
- **[NoVPNDetect Enhanced](https://github.com/BlueCat300/NoVPNDetectEnhanced/)** - An enhanced version of NoVPNDetect that prevents apps from detecting VPN usage by modifying system properties and network configurations. `FOSS` `[LSP]`
- **[SAM](https://github.com/5MayRain/SAM)** - Combines SmartDNS, AdGuardHome and mihomo. `FOSS` `[M]` `[K]`
- **[Surfing](https://github.com/GitMetaio/Surfing)** - Magisk and KernelSU modules for Clash/mihomo, sing-box, v2ray, xray, hysteria services. `FOSS` `[M]` `[K]` `[A]`
- **[Tailscale-android-cli](https://github.com/anasfanani/tailscale-android-cli)** - A command-line interface for Tailscale on Android. `FOSS` 
- **[VPN Hide](https://github.com/okhsunrog/vpnhide)** - Hide active VPN from selected Android apps (kernel module + LSPosed + Zygisk) `FOSS` `[M]` `[K]` `[A]`
- **[VPN Hotspot](https://github.com/Mygod/VPNHotspot)** - Share your VPN connection over hotspot or repeater. `FOSS`
- **[zapret for Magisk](https://github.com/sevcator/zapret-magisk)** - DPI bypass on Android with additional features. `FOSS` `[M]`
- **[ZDT-D Root Module](https://github.com/GAME-OVER-op/ZDT-D)** - Provides traffic routing, DPI bypass, proxy chaining, DNS control and per-app network management. `FOSS` `[M]` `[K]` `[A]`
- **[ZeroTier for Magisk](https://github.com/eventlOwOp/zerotier-magisk)** - Run zerotier in the background after booting with no conflicts with other Android VPN services. Use Android App to control ZeroTier. `FOSS` `[M]`

## Wi-Fi & Mobile Data

- **[Hyper 5G Switch](https://github.com/buffcow/Hyper5GSwitch)** - Add a 5G switch to the mobile network panel, only for devices that support 5G net and equipped with HyperOS. `FOSS` `[LSP]`
- **[NetToggle](https://github.com/Dhangofa/NetToggle)** - Quick Settings tile that switches cellular network modes (5G Only, 4G/LTE Only, Preferred 5G/4G/3G, 2G Only) through root or Shizuku, with dual-SIM targeting. `FOSS` | [🌱](https://f-droid.org/packages/com.dhangofa.networktoggle)
- **[Network Switch](https://github.com/aunchagaonkar/NetworkSwitch#installation)** - Modern Android app for 4G/5G network mode switching. `FOSS` | [🌱](https://apt.izzysoft.de/packages/com.supernova.networkswitch)
- **[Nothing EUICC Force Enabler](https://github.com/reindex-ot/nothing-euicc#note-english)** - Forcibly enables eSIM on Nothing devices that do not officially support it. `FOSS` `[M]`
- **[QCOM Band Menu](https://github.com/Fronsipswu/qcom-band-menu)** - Locks RAT preferences, LTE and NR bands and SA/NSA modes on Qualcomm modems over QMI, with serving-cell, carrier-aggregation and neighbour-cell readouts. Root required. `FOSS`
- **[VirtualAP](https://github.com/ravindu644/VirtualAP)** - Turn a rooted Android phone into Wi-Fi access point with static gateway, selectable upstream (mobile data, Wi-Fi, Ethernet, or a VPN tunnel) etc. `FOSS` `[LSP]`
- **[WiFi Password Manager](https://github.com/Khh-vu/wifi-password-manager)** - Manages saved Wi-Fi networks and passwords using root or Shizuku. `FOSS` | [🌱](https://apt.izzysoft.de/packages/io.github.wifi_password_manager)
- **[WiFi Password Viewer for MMRL](https://github.com/Googlers-Repo/wpd)** - WiFi Password Viewer for MMRL. `FOSS`
- **[Wi‑Fi Passwords Exporter](https://github.com/mlm-games/wifi-exporter)** - Exports saved Wi-Fi credentials as JSON using root. `FOSS`
