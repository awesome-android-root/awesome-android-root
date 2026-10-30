---
layout: doc
title: Privacy Apps for Rooted Android
description: Browse privacy tools for rooted Android, including app isolation, device ID and GPS location spoofing, trackers and permissions that restrict app data access.
head:
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: twitter:description
      content: Browse privacy tools for rooted Android, including app isolation, device ID and GPS location spoofing, trackers and permissions that restrict app data access.
---

# Privacy Apps for Rooted Android

**Privacy** tools for rooted Android devices - root apps, Magisk modules, KernelSU modules, LSPosed modules and
other tools for improving privacy and controlling data access: hiding private files and apps, preventing
tracking, spoofing your device identity or location, and isolating apps from your data.

> [!TIP]
> Related: [Security](/apps-and-modules/security.md) tools and [Ad Blocking](/apps-and-modules/ad-blocking.md)
> stop trackers at the network level. See the [Glossary](/apps-and-modules/#glossary) for badge meanings.


## App Isolation

- **[App Clone](https://github.com/doccstat/appclone)** - Runs more copies of an app than Android's built-in app cloning allows, and lists, opens, freezes or removes each copy. Android 13+. `FOSS` `[LSP]`
- **[Insular](https://gitlab.com/secure-system/Insular)** - Isolate your big brother app. A fork based on the excellent Island. `FOSS` | [🌱](https://f-droid.org/packages/com.oasisfeng.island.fdroid)
- **[Island](https://github.com/oasisfeng/island/tree/dev)** - App isolation and cloning. `FOSS` | [▶️](https://play.google.com/store/apps/details?id=com.oasisfeng.island)
- **[Shelter](https://gitea.angry.im/PeterCxy/Shelter)** - Isolate and clone apps in a work profile. `FOSS` | [🌱](https://f-droid.org/app/net.typeblog.shelter)
- **[TargetedHide](https://github.com/VisionR1/TargetedHide)** - Ηide files, folders, and packages from specific target apps. `FOSS` `[LSP]`

## Device ID & Spoofing

- **[Device Changer](https://deviceschanger.org)** - Configures device identifiers, build fingerprint, and OS properties per app via Zygisk for QA and compatibility testing. `Proprietary` `[M]`
- **[Device Faker](https://github.com/Seyud/device_faker/)** - Spoofs device models separately for different apps using Zygisk. `FOSS` `[M]` `[K]`
- **[DeviceID/SSAID Changer](https://github.com/sidex15/deviceidchanger)** - Changes SSAID and device ID through a WebUI. `FOSS` `[M]` `[K]`
- **[Geergit](https://github.com/pyshivam/geergit-discussion)** - Change (MASKE) the various IDs in the Phone. `Proprietary` `[LSP]`
- **[HideMyAndroid](https://github.com/Xposed-Modules-Repo/com.wowsoftware.hidemyandroid/)** - Provides profile isolation and device spoofing. `Proprietary` `[LSP]`
- **[MAC Editor for Android](https://github.com/jqssun/android-mac-editor)** - Securely edit Wi-Fi MAC address on Android. `FOSS` `[LSP]`
- **[MACsposed](https://github.com/DavidBerdik/MACsposed)** - Adds support for MAC Address spoofing to Android 12 through 15. `Proprietary` `[LSP]`
- **[Mantle](https://github.com/get-mantle/Mantle)** - Masks hardware IDs, advertising IDs, build properties, carrier and SIM data, Wi-Fi and Bluetooth MAC addresses, and location per app. `Proprietary` `[LSP]`
- **[Mantle Verify](https://github.com/get-mantle/Mantle-Verify)** - Companion diagnostics app that shows the device, network and account identifiers regular apps can read, and confirms which spoofed values are active. `Proprietary`
- **[Privacy Kit](https://github.com/Xposed-Modules-Repo/com.sal.privacykit)** - Per-app Android identifier spoofing for LSPosed. `Proprietary` `[LSP]`
- **[Privacy Kit Lite](https://github.com/Mohithash/privacy-kit-lite)** - Local-only per-app Android identifier spoofing with configurable LSPosed runtime hooks. `FOSS` `[LSP]` | [🌱](https://f-droid.org/en/packages/com.sal.privacykit.lite/)
- **[SpoofMyDevice](https://github.com/BuSung-dev/SpoofMyDevice)** - Builds, saves and applies spoofed Android device profiles to selected apps. `FOSS` `[LSP]`
- **[SSAID (Android ID Modifier)](https://github.com/HSSkyBoy/AndroidIDChange)** - A modern Android SSAID (Android ID) inspector, modifier, backup, and management utility. `FOSS` `[LSP]`
- **[Telephony Spoofer](https://github.com/BrianWalczak/TelephonySpoofer)** - Spoof cellular information, including eSIM compatibility. `FOSS` `[LSP]`
- **[VirtualRegion](https://github.com/Xposed-Modules-Repo/io.github.zhou6514ctrl.virtualregion)** - Feeds apps a fake location, Wi-Fi, cell tower, Bluetooth, SIM, language and timezone setup, per app or system-wide, with saved setups and recorded routes. Not permitted for use in China. `Proprietary` `[LSP]`
- **[YumyHook](https://github.com/Xposed-Modules-Repo/com.yumito.yumyhook)** - System-level device spoofing with anti-detection: fake build properties, SIM data, identifiers and location per app. `Proprietary` `[LSP]`

## Location & GPS

- **[AnyWhere](https://github.com/cxOrz/AnyWhere)** - Location simulation tool for debugging LBS applications and for users to test geolocation functionality. `FOSS` `[LSP]`
- **[Fake GPS](https://github.com/Xposed-Modules-Repo/io.github.mwarevn.fakegps)** - Spoofs GPS system-wide or per app, with route simulation, a joystick, track recording and replay, scheduled actions and sensor and network side-channel hiding. `Proprietary` `[LSP]`
- **[GPS Setter](https://github.com/jqssun/android-gps-setter)** - Allows to mock locations for any specific app or entire system. `FOSS` `[LSP]` | [🌱](https://f-droid.org/packages/io.github.jqssun.gpssetter)
- **[Hide Mock Location](https://github.com/auag0/HideMockLocation)** - Hide Mock Location Settings. `FOSS` `[LSP]`
- **[HLocation](https://github.com/sparr-sherrya/hlocation-release)** - Location spoofing framework that synchronizes fake GPS and related environment signals across system and app processes for more consistent location virtualization. `FOSS` `[LSP]`
- **[Location Indicator Whitelist](https://github.com/gilbsgilbs/LocationIndicatorWhitelist)** - Prevents applications from spamming the annoying location notification dot on Android 12 +. `FOSS` `[LSP]`
- **[Location Joystick](https://github.com/fzer0x/LocationJoystick)** - Realtime Location Spoofer by using a Overlay Joystick to control the mock location. `Proprietary` `[LSP]`
- **[LocationMax](https://github.com/Xposed-Modules-Repo/com.huaMax)** - Simulates location on rooted Android devices. `Proprietary` `[LSP]`
- **[xPoint](https://github.com/hazbu/xPoint)** - Hooks `android.location.Location` and the Geocoder API to feed spoofed coordinates to scoped apps, persisting them across reboots through a content provider. Android 8.0+. `FOSS` `[LSP]`
- **[XposedFakeLocation](https://github.com/noobexon1/XposedFakeLocation)** - Allows you to spoof your device's location globally or for specific apps without using "mock location" from the developer options. `FOSS` `[LSP]`

## Privacy Tools

- **[⭐ Amarok](https://github.com/deltazefiro/Amarok-Hider)** - Android application which enables you to hide your private files and apps with a single click. `FOSS` | [🌱](https://f-droid.org/zh_Hans/packages/deltazero.amarok.foss/)
- **[Do Not Try Accessibility](https://github.com/Nitsuya/DoNotTryAccessibility)** - Hook System Framework makes the app think that accessibility services are not enabled. `FOSS` `[LSP]`
- **[Do Not Try Accessibility Reborn](https://github.com/zjz-Beiming/DoNotTryAccessibility-Reborn)** - Prevents blacklisted apps from seeing enabled accessibility services, with optional hiding of the installed service list and hot-reloading config. `FOSS` `[LSP]`
- **[Doppel](https://github.com/akano12/Doppel)** - Hands apps fake device IDs, location, contacts and other data instead of blocking the request, so they keep working, and lists each call with the real and fake value. Continues XPrivacyLua. Android 8.1+. `FOSS` `[LSP]`
- **[DuckUSB](https://github.com/Bouteillepleine/DuckUSB)** - Makes apps read USB debugging, wireless debugging and Developer Options as OFF while they stay enabled. `Proprietary` `[M]` `[K]` `[LSP]`
- **[FuseFixer](https://github.com/5ec1cff/FuseFixer)** - Hooks the MediaProvider Fuse Daemon to stop apps probing package existence through `Android/data` directory quirks (Unicode casefold tricks). `FOSS` `[LSP]`
- **[FuseHide](https://github.com/XiaoTong6666/FuseHide)** - Hides chosen storage paths from MediaProvider on Android 12+ at runtime, and debugs/fixes `Android/data` Unicode casefold scenarios. `FOSS` `[LSP]`
- **[Ghost Mode](https://github.com/Foxlape/GhostMode)** - Turn your Android device 'unavailable' for incoming calls while keeping LTE/5G mobile data fully working. `FOSS` `[LSP]`
- **[GreenDotHide](https://github.com/Dorian399/GreenDotHide)** - Hides the green dot indicating sensitive permission use. Works only on MIUI/HyperOS. `FOSS` `[LSP]`
- **[IAmNotADeveloper](https://github.com/xfqwdsj/IAmNotADeveloper)** - Hide Android developer-related switches status. `FOSS` `[LSP]`
- **[Image Copy Hide](https://github.com/cookieof/ImageCopyHide)** - Automatically copy and hide files from /sdcard/DCIM/Camera to /sdcard/wot/cptp. `FOSS` `[M]` 
- **[microG Installer Revived Again](https://github.com/spacealtctrl/microg_installer_revived_again)** - Promote microG GmsCore, GsfProxy, Companion/Play Store, and MapsV1 to system with privileged permissions. `FOSS` `[M]` `[K]`
- **[MicroGPlus](https://bitgapps.io/extra)** - Installs microG services and other useful apps. `Proprietary` `[M]` `[K]`
- **[Oplus16 Hide Zoom Window](https://github.com/jhl337/Oplus16_HideZoomWindow)** - Hides small windows from screenshots and screen recordings (designed for ColorOS 16). `FOSS` `[LSP]`
- **[PrivacyFlip](https://github.com/dorumrr/privacyflip)** - Automatically disables/enables Wi-Fi, Bluetooth, mobile data, location services, NFC, and even camera/microphone sensors based on lock/unlock state. `FOSS` | [🌱](https://f-droid.org/packages/io.github.dorumrr.privacyflip/)
- **[ScreenshotFaker](https://github.com/Huai-Tian/ScreenshotFaker)** - Protects on-screen content from being captured in screenshots, recordings and screen sharing, with anti-detection features. `FOSS` `[LSP]`
- **[Stealth Debug](https://github.com/sp11xy/StealthDebug)** - Hide USB-Debugging properties. `FOSS` `[M]`
- **[Tarnhelm](https://github.com/lz233/Tarnhelm)** - The magic to clean sharing links up. `FOSS` `[LSP]`
- **[Transparent Screenshot](https://github.com/Dszsu/Transparent_screenshot)** - Hide the application window during screenshots, screen recording, and screen casting. `FOSS` `[LSP]`
- **[Turn Off Sensors](https://github.com/KatelynTheStargazer/TurnOffSensors-Magisk)** - Disables device sensors on startup via the sensor_privacy service on Android. `FOSS` `[M]`
- **[VirtualNet](https://github.com/saadnahid7/VirtualNet)** - Controls whether each app sees Wi-Fi, mobile data or both. `FOSS` `[LSP]`
