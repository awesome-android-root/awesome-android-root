---
layout: doc
title: Best Ad Blockers for Rooted Android
description: "Browse ad blocking tools for rooted Android: hosts-based blockers, DNS filtering, Pi-hole and AdAway style modules, trackers and anti-telemetry utilities."
head:
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: twitter:description
      content: "Browse ad blocking tools for rooted Android: hosts-based blockers, DNS filtering, Pi-hole and AdAway style modules, trackers and anti-telemetry utilities."
---

# Best Ad Blockers for Rooted Android

**Ad blocking** for rooted Android devices - root apps, Magisk modules, KernelSU modules, LSPosed modules and
hosts/DNS-based tools that block ads, trackers and malware system-wide, in every app and browser.

> [!TIP]
> Use the [complete Android ad-blocking tutorial](/general-guides/android-adblocking.md) for setup and
> troubleshooting. The sections below separate hosts-based blockers from DNS/network filters; see
> [firewall tools](security.md#firewalls-filtering) for per-app filtering.


## Ad & Tracker Blocking

- **[⭐ AdAway](https://github.com/AdAway/AdAway)** - Blocks ads using a hosts file with root or a local VPN without root. `FOSS` | [🌱](https://f-droid.org/packages/org.adaway)
- **[⭐ Bindhosts](https://github.com/bindhosts/bindhosts)** - Provides a self-updating systemless hosts file for ad blocking. `FOSS` `[M]` `[K]` `[A]`
- **[AdAway Helper](https://github.com/DEMONNICA/AdAway-Helper)** - Mounts a hosts file so AdAway can work on KernelSU and its variants. `FOSS` `[M]` `[K]` `[A]`
- **[AdClose](https://github.com/Xposed-Modules-Repo/com.close.hook.ads/)** - Blocks ads by intercepting ad SDK loading and advertising requests in apps. `Proprietary` `[LSP]`
- **[AdGuard](https://adguard.com/en/adguard-android/overview.html)** - Blocks ads and trackers on Android. `Proprietary`
- **[Ads Kill](https://github.com/Shuoh118/Ads-kill)** - Removes splash screens and in-app ads in scoped Android apps by hooking common ad SDKs and ad views. `FOSS` `[LSP]`
- **[BlockAds](https://github.com/pass-with-high-score/blockads-android)** - System‑wide ad, tracker, & malware filtering, custom blocklists, per‑app controls etc. `FOSS` | [🌱](https://f-droid.org/packages/app.pwhs.blockads)
- **[BlockAds Module](https://github.com/pantsufan/BlockAds)** - Blocks ads in Android apps using hosts files. `FOSS` `[M]` `[K]`
- **[Blokada](https://blokada.org/)** - Blocks ads using a local VPN. `Proprietary`
- **[Cubic-AdBlock](https://github.com/Vaz15k/Cubic-AdBlock)** - Blocks ads using a hosts file. `FOSS` `[M]`
- **[Discover Ads Filter](https://github.com/hxreborn/discover-ads-filter)** - Hides sponsored cards and ads from the Google Discover feed in the Pixel Launcher -1 screen and inside the Google app itself. `FOSS` `[LSP]`
- **[F*ck AD](https://github.com/hujiayucc/Fuck-AD)** - Blocks ads in supported Android apps. `FOSS` `[LSP]`
- **[Magical Protection](https://github.com/programminghoch10/MagicalProtection)** - Blocks ads using a systemless hosts file. `FOSS` `[M]`
- **[Magisk Ad Blocking Module](https://github.com/pantsufan/Magisk-Ad-Blocking-Module)** - Blocks ads using a systemless hosts file. `FOSS` `[M]`
- **[Marketing Notification Blocker](https://github.com/lm060719/io.mo.mnblocker)** - Blocks marketing and spam push notifications. `FOSS` `[LSP]`
- **[Re-Malwack](https://github.com/ZG089/Re-Malwack)** - Blocks ads, malware and trackers using a configurable hosts file. `FOSS` `[M]` `[A]`
- **[StevenBlock](https://github.com/mikropsoft/StevenBlock)** - Blocks ads, trackers and malware using a systemless hosts file and configurable blocklists. `FOSS` `[M]` `[A]`
- **[Systemless Hosts for KernelSU](https://github.com/symbuzzer/systemless-hosts-KernelSU-module)** - Provides the systemless hosts file that AdAway and similar blockers need on KernelSU and APatch. `FOSS` `[K]` `[A]`

## DNS & Network Filtering

- **[AdGuardHome for Root](https://github.com/twoone-3/AdGuardHomeForRoot/blob/main/README_en.md#adguardhome-for-root)** - Runs AdGuard Home as a local DNS server to filter ads, trackers and malware. `FOSS` `[M]` `[A]`
- **[DNS Toggle](https://github.com/ELowry/DNSToggle)** - Toggles Private DNS through the Quick Settings panel. `FOSS`
- **[ForceDNS Cloudflare](https://github.com/LuferOS/forcedns_Magisk-kernelsu)** - Forces all standard DNS traffic (port 53) to use 1.1.1.1 via iptables. Overrides network DNS. `FOSS` `[M]` `[K]`
- **[Hosts Manager Lite](https://play.google.com/store/apps/details?id=awais.hostsmanager.lite)** - Edits the system hosts file. `Proprietary`
- **[personalDNSfilter](https://github.com/IngoZenz/personaldnsfilter)** - Filters ads, malware and tracking domains with a local DNS proxy supporting DoH and DoT. `FOSS` | [🌱](https://f-droid.org/packages/dnsfilter.android/)
- **[Pi-hole-for-Android](https://github.com/DesktopECHO/Pi-hole-for-Android)** - Pi-hole/Unbound Raspbian APK installer for Android 5.0+ devices. `FOSS`
