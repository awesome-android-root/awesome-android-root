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

- **[⭐ AdAway](https://github.com/AdAway/AdAway)** - Open-source ad blocker using the hosts file. Blocks ads without permissions. `FOSS` | [🌱](https://f-droid.org/packages/org.adaway)
- **[⭐ Bindhosts](https://github.com/bindhosts/bindhosts)** - Systemless hosts for APatch, KernelSU and Magisk that is fully standalone and self-updating. `FOSS` `[M]` `[K]` `[A]`
- **[AdAway Helper](https://github.com/DEMONNICA/AdAway-Helper)** - Enables AdAway to work on KernelSU, its variants by managing /system/etc/hosts via bind mount and overlay. `FOSS` `[M]` `[K]` `[A]`
- **[AdClose](https://github.com/Xposed-Modules-Repo/com.close.hook.ads/)** - Prevents the initial loading of the advertising SDK within the application and intercepts application advertising requests to block ads. `Proprietary` `[LSP]`
- **[AdGuard](https://adguard.com/en/adguard-android/overview.html)** - Comprehensive ad blocking solution. `Proprietary` 
- **[Ads Kill](https://github.com/Shuoh118/Ads-kill)** - Removes splash screens and in-app ads in scoped Android apps by hooking common ad SDKs and ad views. `FOSS` `[LSP]`
- **[BlockAds](https://github.com/pass-with-high-score/blockads-android)** - System‑wide ad, tracker, & malware filtering, custom blocklists, per‑app controls etc. `FOSS` | [🌱](https://f-droid.org/packages/app.pwhs.blockads)
- **[BlockAds Module](https://github.com/pantsufan/BlockAds)** - Blocks ads in Android apps using hosts files. `FOSS` `[M]` `[K]`
- **[Blokada](https://blokada.org/)** - Advanced ad blocker with VPN functionality. `Proprietary`
- **[Cubic-AdBlock](https://github.com/Vaz15k/Cubic-AdBlock)** - Blocks ads using a hosts file. `FOSS` `[M]`
- **[Discover Ads Filter](https://github.com/hxreborn/discover-ads-filter)** - Hides sponsored cards and ads from the Google Discover feed in the Pixel Launcher -1 screen and inside the Google app itself. `FOSS` `[LSP]`
- **[F*ck AD](https://github.com/hujiayucc/Fuck-AD)** - Blocks ads in supported Android apps. `FOSS` `[LSP]`
- **[Magical Protection](https://github.com/programminghoch10/MagicalProtection)** - Magisk-only completely systemless adblocking. `FOSS` `[M]`
- **[Magisk Ad Blocking Module](https://github.com/pantsufan/Magisk-Ad-Blocking-Module)** - Blocks ads using a systemless hosts file. `FOSS` `[M]`
- **[Marketing Notification Blocker](https://github.com/lm060719/io.mo.mnblocker)** - Intercepts and blocks annoying marketing ads and spam push notifications. `FOSS` `[LSP]`
- **[Re-Malwack](https://github.com/ZG089/Re-Malwack)** - Blocks ads, malware and trackers using a configurable hosts file. `FOSS` `[M]` `[A]`
- **[StevenBlock](https://github.com/mikropsoft/StevenBlock)** - Blocks ads, trackers and malware using a systemless hosts file and configurable blocklists. `FOSS` `[M]` `[A]`
- **[Systemless hosts KernelSU module](https://github.com/symbuzzer/systemless-hosts-KernelSU-module)** - Provides systemless hosts support for apps such as AdAway on KernelSU and APatch. `FOSS` `[K]` `[A]`
- **[systemless-adblocker](https://github.com/Magisk-Modules-Alt-Repo/systemless-adblocker)** - Blocks ads using a systemless hosts file, based on gloeyisk/systemless-hosts. `FOSS` `[M]`

## DNS & Network Filtering

- **[AdGuardHome for Root](https://github.com/twoone-3/AdGuardHomeForRoot/blob/main/README_en.md#adguardhome-for-root)** - Runs AdGuard Home on Android. `FOSS` `[M]` `[A]`
- **[DNS Toggle](https://github.com/ELowry/DNSToggle)** - Toggles Private DNS through the Quick Settings panel. `FOSS`
- **[ForceDNS Cloudflare](https://github.com/LuferOS/forcedns_Magisk-kernelsu)** - Forces all standard DNS traffic (port 53) to use 1.1.1.1 via iptables. Overrides network DNS. `FOSS` `[M]` `[K]`
- **[Hosts Manager Lite](https://play.google.com/store/apps/details?id=awais.hostsmanager.lite)** - Advanced /etc/hosts editor. `Proprietary`
- **[personalDNSfilter](https://github.com/IngoZenz/personaldnsfilter)** - A DNS filter proxy that provides local filtering of ads, malware, and tracking servers, supporting secure DNS protocols like DOH and DOT for enhanced privacy. `FOSS` | [🌱](https://f-droid.org/packages/dnsfilter.android/)
- **[Pi-hole-for-Android](https://github.com/DesktopECHO/Pi-hole-for-Android)** - Pi-hole/Unbound Raspbian APK installer for Android 5.0+ devices. `FOSS`
