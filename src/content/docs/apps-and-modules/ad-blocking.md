---
title: Ad Blocking
description: Hosts-based ad blockers, Magisk/KernelSU modules, and DNS tools to block ads, trackers, and malware across Android apps.
head:
  - tag: link
    attrs: {href: 'https://awesome-android-root.zhoe.org/apps-and-modules/ad-blocking', rel: canonical}
  - tag: meta
    attrs: {content: 'index, follow', name: robots}
  - tag: meta
    attrs: {content: Awesome Android Root, name: author}
  - tag: meta
    attrs: {content: article, property: 'og:type'}
  - tag: meta
    attrs: {content: Awesome Android Root, property: 'og:site_name'}
  - tag: meta
    attrs: {content: Ad Blocking | Awesome Android Root, property: 'og:title'}
  - tag: meta
    attrs: {content: 'Hosts-based ad blockers, Magisk/KernelSU modules, and DNS tools to block ads, trackers, and malware across Android apps.', property: 'og:description'}
  - tag: meta
    attrs: {content: 'https://awesome-android-root.zhoe.org/apps-and-modules/ad-blocking', property: 'og:url'}
  - tag: meta
    attrs: {content: 'https://awesome-android-root.zhoe.org/images/og.png', property: 'og:image'}
  - tag: meta
    attrs: {content: en_US, property: 'og:locale'}
  - tag: meta
    attrs: {content: summary_large_image, name: 'twitter:card'}
  - tag: meta
    attrs: {content: '@awsm_and_root', name: 'twitter:site'}
  - tag: meta
    attrs: {content: Ad Blocking | Awesome Android Root, name: 'twitter:title'}
  - tag: meta
    attrs: {content: 'Ad blocking for rooted Android: hosts-file ad blockers, ad-blocking Magisk & KernelSU modules, LSPosed ad-blockers and DNS-level filtering tools that block ads and trackers system-wide.', name: 'twitter:description'}
  - tag: meta
    attrs: {content: 'https://awesome-android-root.zhoe.org/images/og.png', name: 'twitter:image'}
---

# Ad Blocking

**Ad blocking** for rooted Android devices - root apps, Magisk modules, KernelSU modules, LSPosed modules and
hosts/DNS-based tools that block ads, trackers and malware system-wide, in every app and browser.

> [!TIP]
> Start with our [Complete Android Ad Blocking Tutorial](/general-guides/android-adblocking.md), then pick the
> tools below. Apps and modules are combined here because they all solve the same problem - blocking ads.


## Ad & Tracker Blocking

- **[⭐ AdAway](https://github.com/AdAway/AdAway)** - Open-source ad blocker using the hosts file. Blocks ads without permissions. `FOSS` | [🌱](https://f-droid.org/packages/org.adaway)
- **[⭐ Bindhosts](https://github.com/bindhosts/bindhosts)** - Systemless hosts for APatch, KernelSU and Magisk that is fully standalone and self-updating. `FOSS` `[M]` `[K]`
- **[AdAway Helper](https://github.com/DEMONNICA/AdAway-Helper)** - Enables AdAway to work on KernelSU, its variants by managing /system/etc/hosts via bind mount and overlay. `FOSS` `[M]` `[K]`
- **[AdClose](https://github.com/Xposed-Modules-Repo/com.close.hook.ads/)** - Prevents the initial loading of the advertising SDK within the application and intercepts application advertising requests to block ads. `Proprietary` `[LSP]`
- **[AdGuard](https://adguard.com/en/adguard-android/overview.html)** - Comprehensive ad blocking solution. `Proprietary` 
- **[BlockAds](https://github.com/pass-with-high-score/blockads-android)** - System‑wide ad, tracker, & malware filtering, custom blocklists, per‑app controls etc. `FOSS` | [🌱](https://f-droid.org/packages/app.pwhs.blockads)
- **[BlockAds Module](https://github.com/pantsufan/BlockAds)** - BlockAds is an advertisement blocking Magisk module. `FOSS` `[M]` `[K]`
- **[Blokada](https://blokada.org/)** - Advanced ad blocker with VPN functionality. `Proprietary`
- **[Cubic-AdBlock](https://github.com/Vaz15k/Cubic-AdBlock)** - A simple AdBlock module based on the hosts file. `FOSS` `[M]`
- **[Discover Ads Filter](https://github.com/hxreborn/discover-ads-filter)** - Hides sponsored cards and ads from the Google Discover feed in the Pixel Launcher -1 screen and inside the Google app itself. `FOSS` `[LSP]`
- **[F*ck AD](https://github.com/hujiayucc/Fuck-AD)** - Ad-blocking Xposed module. `FOSS` `[LSP]`
- **[Magical Protection](https://github.com/programminghoch10/MagicalProtection)** - Magisk-only completely systemless adblocking. `FOSS` `[M]`
- **[Magisk Ad Blocking Module](https://github.com/pantsufan/Magisk-Ad-Blocking-Module)** - Block ads on android. `FOSS` `[M]`
- **[Marketing Notification Blocker](https://github.com/lm060719/io.mo.mnblocker)** - Intercepts and blocks annoying marketing ads and spam push notifications. `FOSS` `[LSP]`
- **[Re-Malwack](https://github.com/ZG089/Re-Malwack)** - A fully-fledged ad-block module. Contains all your needs. `FOSS` `[M]`
- **[StevenBlock](https://github.com/mikropsoft/StevenBlock)** - Ad Blocking Module for Android supporting Magisk, KernelSU and APatch. `FOSS` `[M]`
- **[Systemless hosts KernelSU module](https://github.com/symbuzzer/systemless-hosts-KernelSU-module)** - Required module to use applications such as AdAway on KernelSU and APatch. `FOSS` `[K]`
- **[systemless-adblocker](https://github.com/Magisk-Modules-Alt-Repo/systemless-adblocker)** - Ultimate adblocker module derived from gloeyisk/systemless-hosts. `FOSS` `[M]`

> [!TIP]
> **Related Guide**: [Complete Android Ad Blocking Tutorial ↗](../general-guides/android-adblocking.md)  
> For network-level blocking, also check [DNS Tools](#dns-network-filtering) and [Firewall Tools](security.md#firewalls-filtering)

## DNS & Network Filtering

- **[AdGuardHome for Root](https://github.com/twoone-3/AdGuardHomeForRoot/blob/main/README_en.md#adguardhome-for-root)** - A module to easily execute AdGuardHome on Android. `FOSS` `[M]`
- **[DNS Toggle](https://github.com/ELowry/DNSToggle)** - A tiny Android app that allows you to easily toggle your phone's Private DNS through the Quick Settings panel. `FOSS`
- **[ForceDNS Cloudflare](https://github.com/LuferOS/forcedns_Magisk-kernelsu)** - Forces all standard DNS traffic (port 53) to use 1.1.1.1 via iptables. Overrides network DNS. `FOSS` `[M]` `[K]`
- **[personalDNSfilter](https://github.com/IngoZenz/personaldnsfilter)** - A DNS filter proxy that provides local filtering of ads, malware, and tracking servers, supporting secure DNS protocols like DOH and DOT for enhanced privacy. `FOSS` | [🌱](https://f-droid.org/packages/dnsfilter.android/)
- **[Pi-hole-for-Android](https://github.com/DesktopECHO/Pi-hole-for-Android)** - Pi-hole/Unbound Raspbian APK installer for Android 5.0+ devices. `FOSS`

> [!TIP]
> For ad blocking at network level, combine these tools with our [ad blockers](#ad-tracker-blocking). See the [ad blocking guide](../general-guides/android-adblocking.md).
