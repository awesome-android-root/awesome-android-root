---
layout: doc
title: "Security"
description: "Security tools for rooted Android: security apps, firewalls and filtering apps and modules (Magisk, KernelSU, LSPosed) that control app network access and harden your device."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.zhoe.org/apps-and-modules/security
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: keywords
      content: "android security apps, root security tools, firewall android root, afwall, app firewall, block app internet, network filtering, security magisk modules, hardened android"
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:site_name
      content: Awesome Android Root
  - - meta
    - property: og:title
      content: "Security | Awesome Android Root"
  - - meta
    - property: og:description
      content: "Security tools for rooted Android: security apps, firewalls and filtering apps and modules (Magisk, KernelSU, LSPosed) that control app network access and harden your device."
  - - meta
    - property: og:url
      content: https://awesome-android-root.zhoe.org/apps-and-modules/security
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
      content: "Security | Awesome Android Root"
  - - meta
    - name: twitter:description
      content: "Security tools for rooted Android: security apps, firewalls and filtering apps and modules (Magisk, KernelSU, LSPosed) that control app network access and harden your device."
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.zhoe.org/images/og.png
---

# Security

**Security** tools for rooted Android devices - root apps, Magisk modules, KernelSU modules, LSPosed modules and
firewalls for hardening your device, controlling which apps can reach the network, and auditing what runs on it.

> [!TIP]
> Related: [Privacy](/apps-and-modules/privacy.md) covers data-access control and spoofing;
> [Networking](/apps-and-modules/networking.md) covers VPNs, proxies and connection tools.

<ClientOnly>
  <AppSearch />
</ClientOnly>

<div class="app-search-content">

## Security Tools

> [!NOTE]
> 
> **FLAG_SECURE** is a window-level security flag in Android that **prevents the window's content from appearing in screenshots** or being captured during screen recordings.

- **[⭐ Enable Screenshot](https://github.com/LSPosed/DisableFlagSecure)** - Enabling screenshots in apps that normally wouldn't allow it, and disabling screenshot(Android 14+) and screen record(Android 15+) detection. `FOSS` `[LSP]`
- **[⭐ Flag Secure Patcher](https://github.com/j-hc/FlagSecurePatcher)** - Patch service.jar on device to disable secure lock and screenshot listeners. `FOSS` `[M]`
- **[⭐ Move Certificate](https://github.com/ys1231/MoveCertificate)** - Move user certificates to system certificates. Supports Android 7-16. `FOSS` `[M]` `[K]`
- **[⭐ SSL Killer](https://github.com/Xposed-Modules-Repo/com.simo.ssl.killer)** - Bypass multiple ssl pinning implementations. `Proprietary` `[LSP]`
- **[AlternativeUnlockXposed](https://github.com/leohearts/AlternativeUnlockXposed)** - Unlock your Android phone with an alternative PIN. `FOSS` `[LSP]`
- **[Always Trust User Certs](https://github.com/NVISOsecurity/AlwaysTrustUserCerts)** - A Magisk/KernelSU module that automatically adds user certificates to the system root CA store. `FOSS` `[M]` `[K]`
- **[Android-FlagSecure-Disabler](https://github.com/BlassGO/Android-FlagSecure-Disabler)** - FlagSecure Disabler, Screenshot Observer Disabler & DRM Disabler. `FOSS` `[M]` `[K]`
- **[Biometric App Lock](https://github.com/hxreborn/biometric-app-lock)** - Locks apps you choose behind fingerprint or face unlock. `FOSS` `[LSP]`
- **[Biometric Bypass Module](https://github.com/hxreborn/biometric-bypass)** - Fast-forwards face unlock by skipping the biometric confirmation step in System UI on Android 10+. `FOSS` `[LSP]` | [🌱](https://f-droid.org/packages/eu.rafareborn.biometricbypass)
- **[CaptureSposed](https://github.com/99keshav99/CaptureSposed)** - Disables the newly introduced screenshot detection API in Android 14. `FOSS` `[LSP]`
- **[Cert-Fixer](https://github.com/pwnlogs/cert-fixer)** - Installs custom CA certificates to Android's system certificate store. `FOSS` `[M]`
- **[Custom Certificate Authorities](https://github.com/Magisk-Modules-Alt-Repo/custom-certificate-authorities)** - Moves user-installed certificate authorities into the system trust store, making them trusted by all apps. `FOSS` `[M]`
- **[Custom Certificates](https://github.com/YujiaCheng1996/custom-certificates)** - A Magisk/KernelSU module which adds custom certificates to the system trust store. `FOSS` `[M]` `[K]`
- **[Disable usb debugging](https://github.com/Aakif17/disable_usb_debugging)** - Disables USB Debugging after every reboot. `FOSS` `[M]`
- **[DriFiCrack](https://github.com/ZeltNamizake/DriFiCrack)** - Brute Force Tool to Crack Wi-Fi Passwords. `FOSS` `[M]`
- **[ih8SecureLock](https://github.com/j-hc/ih8SecureLock)** - Prevent apps from blocking and listening to your screenshots with Zygisk. `FOSS` `[M]` `[K]`
- **[Just Trust Me Pro](https://github.com/hang666/JustTrustMePro)** - Disables SSL certificate checking for the purposes of auditing an app with cert pinning. `FOSS` `[M]`
- **[OneShot Extended](https://github.com/chickendrop89/OneShot-Extended)** - Performs various WPS attacks without the requirement of monitor mode. `FOSS` `[M]` `[K]`
- **[PinGuard](https://github.com/khiqwq/PinGuard/blob/main/README_EN.md)** - LSPosed module that requires fingerprint / password to unpin screen-pinned apps. `FOSS` `[LSP]`
- **[Simple Flag Secure](https://github.com/ShivamXD6/Simple-Flag-Secure)** - Disable Secure Flag and allow taking screenshots/screen recording in apps supports KSU/APatch . `FOSS` `[M]` `[K]`
- **[StrykerOSS](https://github.com/zalexdev/strykerapp)** - Bundles a curated set of network, wireless and web security tools into a single rooted-Android application for penetration testing. `FOSS`
- **[TapDucky](https://github.com/iodn/tap-ducky)** - Open-source DuckyScript runner for rooted Android with USB Gadget (ConfigFS) support. `FOSS`  | [🌱](https://f-droid.org/en/packages/org.kaijinlab.tap_ducky/)

## Firewalls & Filtering

- **[AFWall+](https://github.com/ukanth/afwall)** - Iptables-based firewall. `FOSS` | [🌱](https://f-droid.org/packages/dev.ukanth.ufirewall/) | [▶️](https://play.google.com/store/apps/details?id=dev.ukanth.ufirewall)
- **[Athena](https://github.com/Kin69/Athena)** - Material You (Material 3) firewall and ad blocker that works seamlessly on both rooted and non-rooted devices. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=com.kin.athena)
- **[De1984 Firewall](https://github.com/dorumrr/de1984)** - A privacy-focused Firewall and Package Manager for Android devices. `FOSS` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/io.github.dorumrr.de1984)
- **[Fyrypt](https://github.com/mirfatif/Fyrypt)** - Android firewall with UID + PID rules, dnscrypt-proxy management, and per-app live network monitoring. `Proprietary`
- **[Net Switch](https://github.com/Rem01Gaming/net-switch)** - Isolate any app from Internet access. `FOSS` `[M]`
- **[NetGuard](https://github.com/M66B/NetGuard)** - Block access to the internet. Apps and addresses can individually be allowed or denied access to your Wi-Fi and/or mobile connection. `FOSS`
- **[PCAPdroid](https://github.com/emanuele-f/PCAPdroid#pcapdroid)** - Lets you track, analyze and block the connections made by the other apps in your device. `FOSS` | [🌱](https://f-droid.org/packages/com.emanuelef.remote_capture) | [▶️](https://play.google.com/store/apps/details?id=com.emanuelef.remote_capture)
- **[ShizuWall](https://github.com/AhmetCanArslan/ShizuWall)** - Android firewall without VPN powered by Shizuku / local ADB daemon / Root. `FOSS` | [🌱](https://f-droid.org/packages/com.arslan.shizuwall/) | [▶️](https://play.google.com/store/apps/details?id=com.arslan.shizuwall)

</div>
