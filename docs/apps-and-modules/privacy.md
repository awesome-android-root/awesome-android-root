---
layout: doc
title: "Privacy"
description: "Privacy tools for rooted Android devices: privacy apps, Magisk modules, KernelSU modules and LSPosed modules for controlling data access, hiding private files, spoofing device ID and location, and isolating apps."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.zhoe.org/apps-and-modules/privacy
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: keywords
      content: "android privacy apps, privacy magisk modules, privacy kernelsu modules, lsposed privacy modules, hide apps, microg, hide mock location, fake gps root, device id spoof, app isolation, permission privacy, data access control"
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:site_name
      content: Awesome Android Root
  - - meta
    - property: og:title
      content: "Privacy | Awesome Android Root"
  - - meta
    - property: og:description
      content: "Privacy tools for rooted Android devices: privacy apps, Magisk modules, KernelSU modules and LSPosed modules for controlling data access, hiding private files, spoofing device ID and location, and isolating apps."
  - - meta
    - property: og:url
      content: https://awesome-android-root.zhoe.org/apps-and-modules/privacy
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
      content: "Privacy | Awesome Android Root"
  - - meta
    - name: twitter:description
      content: "Privacy tools for rooted Android devices: privacy apps, Magisk modules, KernelSU modules and LSPosed modules for controlling data access, hiding private files, spoofing device ID and location, and isolating apps."
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.zhoe.org/images/og.png
---

# Privacy

**Privacy** tools for rooted Android devices - root apps, Magisk modules, KernelSU modules, LSPosed modules and
other tools for improving privacy and controlling data access: hiding private files and apps, preventing
tracking, spoofing your device identity or location, and isolating apps from your data.

> [!TIP]
> Related: [Security](/apps-and-modules/security.md) tools and [Ad Blocking](/apps-and-modules/ad-blocking.md)
> stop trackers at the network level. See the [Glossary](/apps-and-modules/#glossary) for badge meanings.

<ClientOnly>
  <AppSearch />
</ClientOnly>

<div class="app-search-content">

## Privacy Tools

- **[⭐ Amarok](https://github.com/deltazefiro/Amarok-Hider)** - Android application which enables you to hide your private files and apps with a single click. `FOSS` | [🌱](https://f-droid.org/zh_Hans/packages/deltazero.amarok.foss/)
- **[Do Not Try Accessibility](https://github.com/Nitsuya/DoNotTryAccessibility)** - Hook System Framework makes the app think that accessibility services are not enabled. `FOSS` `[LSP]`
- **[FuseFixer](https://github.com/5ec1cff/FuseFixer)** - Hooks the MediaProvider Fuse Daemon to stop apps probing package existence through `Android/data` directory quirks (Unicode casefold tricks). `FOSS` `[LSP]`
- **[FuseHide](https://github.com/XiaoTong6666/FuseHide)** - Hides chosen storage paths from MediaProvider on Android 12+ at runtime, and debugs/fixes `Android/data` Unicode casefold scenarios. `FOSS` `[LSP]`
- **[GreenDotHide](https://github.com/Dorian399/GreenDotHide)** - Hides the green dot indicating sensitive permission use. Works only on MIUI/HyperOS. `FOSS` `[LSP]`
- **[IAmNotADeveloper](https://github.com/xfqwdsj/IAmNotADeveloper)** - Hide Android developer-related switches status. `FOSS` `[LSP]`
- **[Image Copy Hide](https://github.com/cookieof/ImageCopyHide)** - Automatically copy and hide files from /sdcard/DCIM/Camera to /sdcard/wot/cptp. `FOSS` `[M]` 
- **[microG Installer Revived Again](https://modules.kernelsu.org/module/microg_installer_revived_again/)** - Promote microG GmsCore, GsfProxy, Companion/Play Store, and MapsV1 to system with privileged permissions. `FOSS` `[M]` `[K]`
- **[MicroGPlus](https://bitgapps.io/extra)** - Installs microG services and other useful apps. `Proprietary` `[M]` `[K]`
- **[Oplus16 Hide Zoom Window](https://github.com/jhl337/Oplus16_HideZoomWindow)** - Hides small windows from screenshots and screen recordings (designed for ColorOS 16). `FOSS` `[LSP]`
- **[PrivacyFlip](https://github.com/dorumrr/privacyflip)** - Automatically disables/enables Wi-Fi, Bluetooth, mobile data, location services, NFC, and even camera/microphone sensors based on lock/unlock state. `FOSS` | [🌱](https://f-droid.org/packages/io.github.dorumrr.privacyflip/)
- **[Stealth Debug](https://github.com/sp11xy/StealthDebug)** - Hide USB-Debugging properties. `FOSS` `[M]`
- **[Tarnhelm](https://github.com/lz233/Tarnhelm)** - The magic to clean sharing links up. `FOSS` `[LSP]`
- **[Transparent Screenshot](https://github.com/Dszsu/Transparent_screenshot)** - Hide the application window during screenshots, screen recording, and screen casting. `FOSS` `[LSP]`
- **[Turn Off Sensors](https://github.com/KatelynTheStargazer/TurnOffSensors-Magisk)** - Disables device sensors on startup via the sensor_privacy service on Android. `FOSS` `[M]`

## Device ID & Spoofing

- **[Device Faker](https://github.com/Seyud/device_faker/)** - A device model spoofing module based on Zygisk that can configure different device models for different applications. `FOSS` `[M]` `[K]`
- **[DeviceID/SSAID Changer](https://github.com/sidex15/deviceidchanger)** - A simple WebUI Module to change SSAID/DeviceID on Rooted Android Devices with Apatch, KSU (And its forks), or Magisk. `FOSS` `[M]` `[K]`
- **[Geergit](https://github.com/pyshivam/geergit-discussion)** - Change (MASKE) the various IDs in the Phone. `Proprietary` `[LSP]`
- **[HideMyAndroid](https://github.com/Xposed-Modules-Repo/com.wowsoftware.hidemyandroid/)** - Android anti-detect module with profile isolation and spoofing. `Proprietary` `[LSP]`
- **[MAC Editor for Android](https://github.com/jqssun/android-mac-editor)** - Securely edit Wi-Fi MAC address on Android. `FOSS` `[LSP]`
- **[MACsposed](https://github.com/DavidBerdik/MACsposed)** - Adds support for MAC Address spoofing to Android 12 through 15. `Proprietary` `[LSP]`
- **[Privacy Kit](https://github.com/Xposed-Modules-Repo/com.sal.privacykit)** - Per-app Android identifier spoofing for LSPosed. `Proprietary` `[LSP]`
- **[SpoofMyDevice](https://github.com/BuSung-dev/SpoofMyDevice)** - Xposed module and companion app for building, saving, and applying spoofed Android device profiles to selected apps. `FOSS` `[LSP]`
- **[SSAID (Android ID Modifier)](https://github.com/HSSkyBoy/AndroidIDChange)** - A modern Android SSAID (Android ID) inspector, modifier, backup, and management utility. `FOSS` `[LSP]`
- **[Telephony Spoofer](https://github.com/BrianWalczak/TelephonySpoofer)** - Spoof cellular information, including eSIM compatibility. `FOSS` `[LSP]`

## App Isolation

- **[Insular](https://gitlab.com/secure-system/Insular)** - Isolate your big brother app. A fork based on the excellent Island. `FOSS` | [🌱](https://f-droid.org/packages/com.oasisfeng.island.fdroid)
- **[Island](https://github.com/oasisfeng/island/tree/dev)** - App isolation and cloning. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=com.oasisfeng.island)
- **[Shelter](https://gitea.angry.im/PeterCxy/Shelter)** - Isolate and clone apps. `FOSS` | [🌱](https://f-droid.org/app/net.typeblog.shelter)

## Location & GPS

- **[AnyWhere](https://github.com/cxOrz/AnyWhere)** - Location simulation tool for debugging LBS applications and for users to test geolocation functionality. `FOSS` `[LSP]`
- **[GPS Setter](https://github.com/jqssun/android-gps-setter)** - Allows to mock locations for any specific app or entire system. `FOSS` `[LSP]` | [🌱](https://f-droid.org/packages/io.github.jqssun.gpssetter)
- **[Hide Mock Location](https://github.com/auag0/HideMockLocation)** - Hide Mock Location Settings. `FOSS` `[LSP]`
- **[HLocation](https://github.com/sparr-sherrya/hlocation-release)** - Location spoofing framework that synchronizes fake GPS and related environment signals across system and app processes for more consistent location virtualization. `FOSS` `[LSP]`
- **[Location Indicator Whitelist](https://github.com/gilbsgilbs/LocationIndicatorWhitelist)** - Prevents applications from spamming the annoying location notification dot on Android 12 +. `FOSS` `[LSP]`
- **[Location Joystick](https://github.com/fzer0x/LocationJoystick)** - Realtime Location Spoofer by using a Overlay Joystick to control the mock location. `Proprietary` `[LSP]`
- **[LocationMax](https://github.com/Xposed-Modules-Repo/com.huaMax)** - Location simulation module for rooted Android devices using LSPosed/Xposed. `Proprietary` `[LSP]`
- **[XposedFakeLocation](https://github.com/noobexon1/XposedFakeLocation)** - Allows you to spoof your device's location globally or for specific apps without using "mock location" from the developer options. `FOSS` `[LSP]`

</div>
