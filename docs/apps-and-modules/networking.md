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

- **[KonamikU](https://github.com/C-F0x/KonamikU)** - Reads, saves and emulates FeliCa cards on devices with NFC-F and HCE-F support. `FOSS` `[LSP]`
- **[MiConnectFilter](https://github.com/Wang2035/MiConnectFilter)** - Filters Xiaomi earbuds fast-pair popups using an allowlist on HyperOS. `Proprietary` `[LSP]`
- **[NFC Card Emulator Pro (Root)](https://play.google.com/store/apps/details?id=com.yuanwofei.cardemulator.pro)** - NFC card emulator for access cards, elevator cards, meal cards, school cards, library cards, and other IC cards. `Proprietary`
- **[NFCGate](https://github.com/nfcgate/nfcgate)** - Captures, analyzes and modifies NFC traffic. `FOSS` `[LSP]` | [🌱](https://f-droid.org/packages/de.tu_darmstadt.seemoo.nfcgate/)
- **[onHit](https://github.com/0penPublic/onHit)** - Triggers NFC events without a physical tag. `FOSS` `[LSP]`

## Network Tools

- **[MagicNet](https://github.com/LIghtJUNction/MagicNet#english-summary)** - Enforces device-side network rules below the app layer rather than relying on apps to respect proxy settings. `FOSS` `[M]` `[K]` `[A]`
- **[MultiRoute](https://github.com/Linoleic/MultiRoute)** - Routes selected apps through individual Wi-Fi, cellular or Ethernet connections using root. `FOSS` `[LSP]`
- **[Netcut](https://github.com/rajnishsubedi0/Netcut)** - Cuts internet access for other devices on the local network through ARP spoofing, with ban, unban, protect and save lists. Requires root; use only on networks you own or are authorized to test. `FOSS`
- **[Network Utilities](https://play.google.com/store/apps/details?id=com.myprog.netutils)** - Provides network diagnostic tools. `Proprietary`
- **[TCP Optimiser Module](https://github.com/fatalcoder524/TCP_Optimiser_Module)** - Changes TCP congestion algorithms based on the active connection. `FOSS` `[M]` `[K]` `[A]`
- **[VD-dropbear](https://github.com/VD171/VD-dropbear)** - Standalone, configurable rooted SSH (Dropbear) server with a WebUI and bundled sftp-server, scp and rsync. `FOSS` `[M]` `[K]` `[A]`

## VPN & Proxy

- **[AsteriskBOX](https://github.com/Asterisk4Magisk/AsteriskBOX)** - Runs sing-box with VPN and root-based traffic-routing options. `FOSS` `[M]` `[K]`
- **[AsteriskMETA](https://github.com/Asterisk4Magisk/AsteriskMETA)** - Runs Mihomo with VPN and root-based traffic-routing options. `FOSS` `[M]` `[K]`
- **[AsteriskNG](https://github.com/Asterisk4Magisk/AsteriskNG)** - Runs Xray with VPN and root-based traffic-routing options. `FOSS` `[M]` `[K]`
- **[Aurora](https://github.com/Tkocean/Aurora)** - Deploys sing-box and Mihomo proxy services on rooted Android. `FOSS` `[M]` `[K]` `[A]`
- **[Box for Root](https://github.com/taamarin/box_for_magisk)** - Configures a transparent proxy on rooted Android devices using tools including Clash, sing-box, V2Ray, Hysteria and Xray. `FOSS` `[M]` `[K]` `[A]`
- **[Box4Magisk / KernelSU / APatch](https://github.com/CHIZI-0618/box4magisk)** - Deploys proxy cores including Clash, Mihomo, sing-box, V2Ray, Xray and Hysteria. `FOSS` `[M]` `[K]` `[A]`
- **[FlClash](https://github.com/chen08209/FlClash)** - Provides a multi-platform proxy client based on Clash Meta. `FOSS`
- **[Github-direct](https://github.com/FxxkLocation/Github-direct)** - Per-app connectivity module combining pollution-resistant DNS, verified endpoint candidates and transparent TCP/TLS relaying over IPv4 and IPv6, with fail-open rollback and a VPN backend for devices without root. GitHub is the validated profile; Google, YouTube, Discord and OpenAI routing stays experimental and off by default. `FOSS` `[M]` `[K]` `[LSP]`
- **[Happwner](https://github.com/Omegaplexx/Happwner)** - Decrypts and exports Happ proxy subscriptions for use in other VPN clients. `FOSS` `[LSP]`
- **[Magisk Tailscaled](https://github.com/anasfanani/magisk-tailscaled)** - Runs Tailscale's daemon in userspace on rooted Android so it coexists with another active VPN. arm and arm64 only; MagicDNS does not work. `FOSS` `[M]` `[K]`
- **[NetProxy-Magisk](https://github.com/Fanju6/NetProxy-Magisk)** - Starts and stops a transparent proxy based on Xray. `FOSS` `[M]` `[A]`
- **[NoVPNDetect](https://github.com/RuslanUC/NoVPNDetect)** - Prevents some apps from detecting your phone is connected to a VPN. `FOSS` `[LSP]`
- **[NoVPNDetect Enhanced](https://github.com/BlueCat300/NoVPNDetectEnhanced/)** - Hides VPN status from selected apps by intercepting system APIs; some low-level detection methods are not covered. `FOSS` `[LSP]`
- **[SAM](https://github.com/5MayRain/SAM)** - Combines SmartDNS, AdGuardHome and mihomo. `FOSS` `[M]` `[K]`
- **[Shellscaled](https://github.com/KyuubiRan/Shellscaled)** - Runs Tailscale's tailscaled daemon natively on rooted Android. `FOSS` `[M]` `[K]`
- **[Surfing](https://github.com/GitMetaio/Surfing)** - Runs Clash/Mihomo, sing-box, V2Ray, Xray or Hysteria proxy services. `FOSS` `[M]` `[K]` `[A]`
- **[Tailscale-android-cli](https://github.com/anasfanani/tailscale-android-cli)** - Provides a Tailscale command-line interface for Android. `FOSS`
- **[VPN Hide](https://github.com/okhsunrog/vpnhide)** - Hides VPN connections from selected apps using LSPosed and a compatible kernel or Zygisk backend. `FOSS` `[M]` `[K]` `[A]`
- **[VPN Hotspot](https://github.com/Mygod/VPNHotspot)** - Shares a VPN connection over a hotspot or repeater. `FOSS`
- **[VPNHide Next](https://github.com/soranerai/vpnhide_next)** - Hides VPN connections from selected apps using LSPosed and a matching kernel backend, whose source is private. `Proprietary` `[LSP]`
- **[WireGuard Plus](https://github.com/AliHaider704/wgplus)** - Runs a userspace WireGuard and AmneziaWG tunnel for Telegram only, keeping Android's single VPN slot free for other apps. Rootless through LSPatch or rooted through LSPosed; a Windows build is included upstream. `FOSS` `[LSP]`
- **[zapret for Magisk](https://github.com/sevcator/zapret-magisk)** - DPI bypass on Android with additional features. `FOSS` `[M]`
- **[ZDT-D Root Module](https://github.com/GAME-OVER-op/ZDT-D)** - Provides traffic routing, DPI bypass, proxy chaining, DNS control and per-app network management. `FOSS` `[M]` `[K]` `[A]`
- **[ZeroTier for KernelSU](https://github.com/powerAn2020/ZeroTierForKSU)** - Runs a ZeroTier client from a module WebUI, with network and peer management through the legacy Central API. Magisk needs a standalone WebUI host. `FOSS` `[K]` `[A]`

## Wi-Fi & Mobile Data

- **[Airplane Scheduler](https://github.com/probecat/airplane-scheduler-app)** - Schedules airplane mode and optional Wi-Fi changes using root or Shizuku. `FOSS` | [🌱](https://f-droid.org/packages/io.github.probecat.airplanescheduler/)
- **[Data SIM Switcher](https://github.com/jksalcedo/data-sim-switcher)** - Quick Settings tile that switches the default mobile data SIM on dual-SIM devices through a root service started only for the tap, with no daemon or phone-state permissions. Android 7+. `FOSS`
- **[Hotspot Monitor](https://github.com/justakhi/hotspot-monitor)** - Monitors hotspot clients with per-device speeds, app and domain usage and history reports, and adds per-device telemetry when root is granted. Read-only and offline; the source is under the PolyForm Noncommercial license, which restricts commercial use. `Proprietary`
- **[Hyper 5G Switch](https://github.com/buffcow/Hyper5GSwitch)** - Adds a 5G switch to the mobile network panel on supported HyperOS devices. `FOSS` `[LSP]`
- **[NetToggle](https://github.com/Dhangofa/NetToggle)** - Quick Settings tile that switches cellular network modes (5G Only, 4G/LTE Only, Preferred 5G/4G/3G, 2G Only) through root or Shizuku, with dual-SIM targeting. `FOSS` | [🌱](https://f-droid.org/packages/com.dhangofa.networktoggle)
- **[Network Switch](https://github.com/aunchagaonkar/NetworkSwitch#installation)** - Changes 4G and 5G network modes. `FOSS` | [🌱](https://apt.izzysoft.de/packages/com.supernova.networkswitch)
- **[Nothing EUICC Force Enabler](https://github.com/reindex-ot/nothing-euicc#note-english)** - Forcibly enables eSIM on Nothing devices that do not officially support it. `FOSS` `[M]`
- **[QCOM Band Menu](https://github.com/Fronsipswu/qcom-band-menu)** - Locks a Qualcomm phone to chosen network types and 4G/5G bands, and shows the serving cell, carrier aggregation and neighbour cells the modem reports. Root required. `FOSS`
- **[VirtualAP](https://github.com/ravindu644/VirtualAP)** - Creates a Wi-Fi access point with a static gateway and selectable upstream on rooted Android. `FOSS` `[LSP]`
- **[WiFi Password Manager](https://github.com/Khh-vu/wifi-password-manager)** - Manages saved Wi-Fi networks and passwords using root or Shizuku. `FOSS` | [🌱](https://apt.izzysoft.de/packages/io.github.wifi_password_manager)
- **[WiFi Password Viewer for MMRL](https://github.com/Googlers-Repo/wpd)** - Displays saved Wi-Fi passwords in MMRL using WebUI X. `FOSS`
- **[WifiCountryCode](https://github.com/mirukurusan/WifiCountryCode)** - Overrides the system Wi-Fi country code so channels blocked in the current region can be used. Android 10+ with the System Framework in scope. `FOSS` `[LSP]`
- **[Wi‑Fi Passwords Exporter](https://github.com/mlm-games/wifi-exporter)** - Exports saved Wi-Fi credentials as JSON using root. `FOSS`
