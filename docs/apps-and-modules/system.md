---
layout: doc
title: "System"
description: "System-level tools for rooted Android: system tweaks and VBMeta modules, System UI & OEM framework customization (AOSP, HyperOS, One UI, OxygenOS and more), boot & startup, app & package management, permissions and system diagnostics."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.zhoe.org/apps-and-modules/system
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: keywords
      content: "android system tweaks, vbmeta, system ui tuner, aosp modules, hyperos modules, one ui modules, oxygenos, coloros, nothingos, boot animation, app management, package manager android, appops, permissions manager, system info, android diagnostics, magisk modules, kernelsu modules"
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:site_name
      content: Awesome Android Root
  - - meta
    - property: og:title
      content: "System | Awesome Android Root"
  - - meta
    - property: og:description
      content: "System-level tools for rooted Android: system tweaks and VBMeta modules, System UI & OEM framework customization (AOSP, HyperOS, One UI, OxygenOS and more), boot & startup, app & package management, permissions and system diagnostics."
  - - meta
    - property: og:url
      content: https://awesome-android-root.zhoe.org/apps-and-modules/system
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
      content: "System | Awesome Android Root"
  - - meta
    - name: twitter:description
      content: "System-level tools for rooted Android: system tweaks and VBMeta modules, System UI & OEM framework customization (AOSP, HyperOS, One UI, OxygenOS and more), boot & startup, app & package management, permissions and system diagnostics."
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.zhoe.org/images/og.png
---

# System

**System** tools let you modify how Android itself works: system tweaks and **VBMeta** modules, System UI and
OEM framework mods (**AOSP, ColorOS, HyperOS, NothingOS, One UI, Onyx, OxygenOS, ZUI**), boot & startup
customization, **app & package management**, permissions (**AppOps**) and system diagnostics. Both apps and
Magisk/KernelSU/LSPosed modules are listed together per topic.

<ClientOnly>
  <AppSearch />
</ClientOnly>

<div class="app-search-content">

## System Tweaks

- **[AnyWebView](https://github.com/neoblackxt/AnyWebView)** - Detects every installed WebView and adds it to the Developer options WebView implementation list. `FOSS` `[LSP]` | [🌱](https://apt.izzysoft.de/packages/com.thinkdifferent.anywebview)
- **[Cromite SystemWebView](https://github.com/hddq/magisk-cromite-webview)** - Replaces the Android System WebView with Cromite WebView. `FOSS` `[M]`
- **[Disable Low Ram Flag](https://github.com/Magisk-Modules-Alt-Repo/disable-low-ram)** - Disable Low‑RAM flag on Android Go devices. `FOSS` `[M]`
- **[HyperOS Accessibility Fix](https://github.com/chickendrop89/hyperos-accessibility-fix)** - Stop HyperOS from randomly disabling accessibility services. `FOSS` `[M]` `[K]`
- **[HyperOS Security Center](https://github.com/Mods-Center/HyperOS-Security-Center)** - Advanced app info tools, system app Wi-Fi management, removal of root/account restrictions etc. `Proprietary` `[M]` `[K]`
- **[Multi Userui Enabler](https://github.com/InsertX2k/multiuseruienabler)** - Magisk module that tries to enable Multi-User UI. `FOSS` `[M]`
- **[Noogle Magisk](https://github.com/SelfRef/noogle-magisk)** - Magisk modules for removing/replacing Google applications on stock Android 11-15. `FOSS` `[M]`
- **[Secure Element Access](https://github.com/jqssun/android-se-access)** - Enable access to secure element for trusted apps. `FOSS`
- **[TWRP A/B Retention Script](https://github.com/Magisk-Modules-Repo/twrp-keep)** - Keep TWRP installed after an A/B OTA. `FOSS` `[M]`
- **[Vanadium WebView & Browser](https://github.com/NoneBaiano/Vanadium-WebViewBrowser)** - Replaces the system WebView with Vanadium WebView and installs the Vanadium browser. `FOSS` `[M]` `[K]`

### VBMeta Mods

<details><summary><strong>What is VBMeta</strong></summary>

- VBMeta is a critical component of Android Verified Boot (AVB), a security feature designed to **ensure the integrity of the software running on an Android device during the boot process**.

<br>
</details>

- **[Android VBMeta Fixer](https://github.com/reveny/Android-VBMeta-Fixer)** - A Magisk/KernelSU/Apatch module to fix VBMeta detections on Android. `FOSS` `[M]` `[K]`
- **[VBMeta Disguiser](https://github.com/Astoritin/VBMetaDisguiser)** - Disguises the properties of vbmeta. `FOSS` `[M]` `[K]`
- **[VBMeta Tool](https://github.com/KOWX712/vbmeta_tool)** - Command-line tool that reads the device's vbmeta digest (`verifiedBootHash`) with root. `FOSS`

## System UI & Framework

|  | | | | | | | |
| :-- | :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| [AOSP (Android Open Source Project)](#aosp-android-open-source-project) | [ColorOS (Oppo)](#coloros-oppo) | [HyperOS (Xiaomi)](#hyperos-xiaomi) | [NothingOS](#nothingos) | [One UI (Samsung)](#one-ui-samsung) | [Onyx](#onyx) | [Oxygen OS (OnePlus)](#oxygen-os-oneplus) | [ZUI](#zui) |
|  | | | | | | | |

### AOSP (Android Open Source Project)

- **[⭐ PixelXpert](https://github.com/siavash79/PixelXpert)** - A mixed Xposed+Magisk module, which is made to allow customizations that are not originally designed in AOSP. `FOSS` `[M]` `[LSP]`
- **[PIXELIFY NEXT](https://github.com/BasGame1/Pixelify-Next)** - A Magisk Module which enables Pixel UI and some exclusive features. `FOSS` `[M]`
- **[PixelUpdater](https://github.com/PixelUpdater/PixelUpdater)** - Pixel Updater is an app for installing Android A/B OTA updates from Google's OTA server. `FOSS` `[M]`
- **[SystemUI Tuner](https://github.com/zacharee/Tweaker?tab=readme-ov-file)** - View and modify hidden settings on Android devices. `FOSS` `[M]`

### ColorOS (Oppo)

- **[ColorOS Feature Enhance](https://github.com/ItosEO/ColorFeatureEnhance)** - Visually edit and managing ColorOS feature switches. `FOSS` `[LSP]`
- **[LuckyTool](https://github.com/Xposed-Modules-Repo/com.luckyzyx.luckytool/blob/main/README_EN.md)** - Extended functionality and optimization module for ColorOS. `Proprietary` `[LSP]`
- **[OPCameraPro](https://github.com/Xposed-Modules-Repo/com.tlsu.opluscamerapro)** - ColorOS and realmeUI module providing various AI functions, enhancing cameras and other photo related tweaks. `Proprietary` `[LSP]`
- **[Oplus Launcher Radius Optimization](https://github.com/Qjj7679/Oplus-Luncher-RadiusOptimization)** - Optimize the rounded corners of the recent tasks card on the ColorOS system desktop. `FOSS` `[LSP]`
- **[OShin](https://github.com/suqi8/OShin/blob/master/README_EN.md)** - Auxiliary module deeply integrated with ColorOS, designed to enhance and optimize your operating system experience. `FOSS` `[LSP]`

### HyperOS (Xiaomi)

- **[⭐ HyperCeiler](https://github.com/ReChronoRain/HyperCeiler/blob/main/README_en-US.md)** - Extensive customizations for HyperOS. `FOSS` `[LSP]`
- **[Better Miui Express](https://github.com/Robotxm/BetterMiuiExpress)** - Prevents MIUI/HyperOS's express widget from jumping to third-party applications such as Taobao and Cainiao, and uses a customized interface to display express details. `FOSS` `[LSP]`
- **[ClipboardList](https://github.com/HChenX/ClipboardList/blob/master/README-en.md)** - Remove the 20-item limit and time limit for the Clipboard and Phrases feature. Only for MIUI and HyperOS. `FOSS` `[LSP]`
- **[ColorOS_Control_Center](https://github.com/Mods-Center/ColorOS_Control_Center)** - Replace HyperOS control panel with ColorOS-style quick settings, featuring customizable and squared tiles. `Proprietary`
- **[Fingerprint Catalog](https://github.com/custombeta/fingerprint-cataloge)** - Allows you to create, upload, import, and apply your own fingerprint icons and animations on HyperOS. `Proprietary` `[LSP]`
- **[Hyper Helper](https://github.com/HowieHChen/XiaomiHelper/blob/master/README_EN-US.md)** - Lightweight customization module for HyperOS only. `FOSS` `[LSP]`
- **[Hyper Unlocked](https://github.com/ukriu/HyperUnlocked)** - Unlock all high-end features possible to be unlocked on low-end xiaomi devices. `FOSS` `[M]`
- **[HyperStar](https://github.com/YunZiA/HyperStar/blob/master/README_EN-US.md)** - An LSPosed module mainly designed to customize the Xiaomi HyperOS Control Center, along with some features. `FOSS` `[LSP]`
- **[Janus](https://modules.lsposed.org/module/org.pysh.janus/)** - Enhances Xiaomi rear screens with multitasking, app shortcuts, gestures, notification mirroring, and power-saving features. `Proprietary` `[LSP]`
- **[Pengeek](https://github.com/monwf/customiuizer)** - Customize your HyperOS to your liking. For HyperOS based on Android 14. `FOSS` `[LSP]`

> [!TIP]
> Check this resource for more [HyperOS Mods ↗](https://github.com/ImKKingshuk/Awesome-HyperOS)

### NothingOS

- **[NothingTweaks](https://github.com/RevealedSoulEven/NothingTweaks)** - A customization module for Nothing OS based on Xposed framework. `FOSS` `[LSP]`

### One UI (Samsung)

- **[⭐ KnoxPatch](https://github.com/salvogiangri/KnoxPatch)** - Get Samsung apps/features working again in your rooted Galaxy device. For better experience, please also [read this ↗](https://github.com/salvogiangri/KnoxPatch?tab=readme-ov-file#knoxpatch-enhancer) . `FOSS` `[LSP]`
- **[One Design](https://github.com/Xposed-Modules-Repo/qyz.onedesign)** - Customize multiple applications at the system level, providing feature enhancements, and system optimizations. `Proprietary` `[LSP]`
- **[One UI X](https://github.com/SoClear/OneUIX)** - Remove annoying restrictions, and inject powerful enhancements into the Status Bar, Quick Settings, and native apps etc on Samsung's One UI. `FOSS` `[LSP]`
- **[OneLab](https://github.com/pigerzhu/OneLab)** - One UI feature extensions and foldable app adaptations for Samsung devices. `FOSS` `[LSP]`
- **[Samsung Dex Standalone Mode](https://github.com/supermarsx/magisk-samsung-dex-standalone-mode)** - Systemlessly enable Samsung DeX standalone mode. `FOSS` `[M]`

### Onyx

- **[OnyxTweaks](https://github.com/timschneeb/OnyxTweaks)** - Xposed module for Onyx Boox e-Ink devices with Android 12.It adds other mods to the SystemUI, Android Framework, and Onyx Launcher. `FOSS` `[LSP]`

### Oxygen OS (OnePlus)

- **[Oxygen-Customizer](https://github.com/DHD2280/Oxygen-Customizer/)** - Open-source Oxygen OS customizer application. `FOSS` `[LSP]`

### ZUI

- **[BetterZUIKey](https://github.com/CommandPrompt-Wang/BetterZUIKey)** - An LSPosed module for overriding keyboard shortcuts on Lenovo ZUXOS devices. `FOSS` `[LSP]`
- **[Unf**k ZUI Tablet](https://github.com/Xposed-Modules-Repo/xyz.cirno.unfuckzui/)** - Adjust notification icon size, restore AOSP-style installers/permissions, enforce screen rotation persistence, and allow package querying etc. `Proprietary` `[LSP]`
- **[ZTool](https://github.com/qwqawa64/ZUX-ZTool)** - Provides optimization and customization features for the ZUXOS system. `FOSS` `[LSP]`

## Boot & Startup

- **[Live Boot](https://play.google.com/store/apps/details?id=eu.chainfire.liveboot)** - Get a Linux-like live boot screen on Android. `Proprietary`
- **[Live Boot Module](https://github.com/symbuzzer/livebootmodule)** - Enables unix-style (verbose) boot animation for Android devices. `FOSS` `[M]` `[K]`
- **[Samsung Boot Animation Module](https://github.com/John0n1/SMbootFX)** - Custom boot animations for Samsung devices via Magisk. `FOSS` `[M]`
- **[video-to-bootanimation](https://github.com/Magisk-Modules-Alt-Repo/video-to-bootanimation)** - A Magisk Module Which Can Set Videos as Android Device BootAnimation. `FOSS` `[M]`

## App & Package Management

- **[⭐ App Manager](https://github.com/MuntashirAkon/AppManager)** - A full-featured package manager and viewer for Android. `FOSS` | [🌱](https://f-droid.org/packages/io.github.muntashirakon.AppManager/)
- **[⭐ Disable Target API Block](https://github.com/buttercookie42/DisableTargetAPIBlock)** - Disable Android 14's installation block for old apps. `FOSS` `[LSP]`
- **[⭐ Droid-ify](https://github.com/Droid-ify/client)** - F-Droid client with Material UI and auto updating apps using root. `FOSS` | [🌱](https://f-droid.org/packages/com.looker.droidify)
- **[⭐ Hail](https://github.com/aistra0528/Hail)** - Disable / Hide / Suspend / Uninstall Android apps. `FOSS` | [🌱](https://f-droid.org/packages/com.aistra.hail/)
- **[⭐ InstallerX-Revived](https://github.com/wxxsfxyzm/InstallerX-Revived)** - A modern and functional Android app installer. `FOSS` `[LSP]`
- **[⭐ Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Zygisk module to detach installed apps from Play Store, hooking binder. `FOSS` `[M]` `[K]`
- **[AlterInstaller](https://github.com/chenxiaolong/AlterInstaller)** - Spoof Android package manager installer fields to bypass installation restrictions. `FOSS` `[M]` `[K]`
- **[AppControl-X](https://github.com/risunCode/AppControl-X)** - Freeze, force stop, clear data and uninstall apps, plus CPU, RAM, storage and battery monitoring, using root or Shizuku. `FOSS`
- **[App Manager](https://play.google.com/store/apps/details?id=com.lb.app_manager)** - A feature rich app manager with batch operation support. `Proprietary`
- **[AppDash: App Manager & Backup](https://play.google.com/store/apps/details?id=flar2.appdashboard&hl=en)** - Makes it easy to manage APKs and apps installed on your device. `Proprietary`
- **[Aurora Store](https://github.com/whyorean/AuroraStore)** - A Google Play Store client to search, view app details, and download APKs directly to your device. `FOSS` | [🌱](https://f-droid.org/packages/com.aurora.store/)
- **[Auto Uninstaller](https://github.com/MeRaazi/auto-uninstaller)** - Automatically uninstall blacklisted apps. `FOSS` `[K]`
- **[BanUninstall](https://github.com/TinyHai/BanUninstall/)** - Prevents apps from being uninstalled or apps' data from being cleared. `FOSS` `[LSP]`
- **[BetterKnownInstalled](https://github.com/Pixel-Props/BetterKnownInstalled)** - Patches packages to fix DroidGuard UNKNOWN_INSTALLED issues. `FOSS` `[LSP]`
- **[Buge App Manager](https://github.com/BugeStudioTeam/Buge-App-Manager)** - Built with Material Design 3 Expressive designed for advanced app and permission management. `FOSS`
- **[F-Droid Privileged Extension](https://gitlab.com/fdroid/privileged-extension)** - Enables F-Droid to install and delete apps without needing "Unknown Sources" & install updates in the background. `FOSS` | [🌱](https://f-droid.org/en/packages/org.fdroid.fdroid.privileged/)
- **[Ice Box](https://play.google.com/store/apps/details?id=com.catchingnow.icebox)** - Freeze and hide apps rarely used. `Proprietary`
- **[Inure](https://github.com/Hamza417/Inure)** - An elegant and beautiful premium Android app manager for rooted and non-rooted devices. `FOSS` | [🌱](https://f-droid.org/en/packages/app.simple.inure/) | [▶️](https://play.google.com/store/apps/details?id=app.simple.inure.play)
- **[InxLocker](https://github.com/Chimioo/InxLocker)** - Intercepts/forwards Android system application installation and uninstallation requests, redirecting them to your specified installer app. `FOSS` `[LSP]`
- **[Let Me Downgrade](https://github.com/DavidBerdik/Let-Me-Downgrade)** - Add support for downgrading apps on Android 12 through 15 QPR1. `FOSS` `[LSP]` | [🌱](https://f-droid.org/packages/com.berdik.letmedowngrade/) | [▶️](https://play.google.com/store/apps/details?id=com.berdik.letmedowngrade)
- **[Neo Store](https://github.com/NeoApplications/Neo-Store)** - An F-Droid client with modern UI and an arsenal of extra features. `FOSS` | [🌱](https://f-droid.org/packages/com.machiav3lli.fdroid)
- **[Package Manager](https://github.com/SmartPack/PackageManager)** - A highly powerful app to manage both system and user apps installed on an Android device. `FOSS` | [🌱](https://f-droid.org/packages/com.smartpack.packagemanager) | [▶️](https://play.google.com/store/apps/details?id=com.smartpack.packagemanager)
- **[PI (PackageInstaller)](https://github.com/SanmerApps/PI)** - Package installer that installs and updates APKs through a root or Shizuku installation service. `FOSS`
- **[Play Store Self Update Blocker](https://github.com/himanshujjp/PlayStoreSelfUpdateBlocker)** - Prevents the Google Play Store from auto-updating itself. Useful for users trying to maintain valid device attestation under the newer Play Integrity API rules. `FOSS` `[M]` `[K]`
- **[Play Version Spoofer](https://github.com/byemaxx/PlayVersionSpoofer)** - Prevents the Google Play Store from automatically updating itself. `FOSS` `[LSP]`
- **[Thor](https://github.com/trinadhthatakula/Thor)** - Android App Manager and App Installer utility. `FOSS` | [🌱](https://apt.izzysoft.de/fdroid/index/apk/com.valhalla.thor) | [▶️](https://play.google.com/store/apps/details?id=com.valhalla.thor)
- **[Universal Installer](https://github.com/pass-with-high-score/universal-installer)** - Install and manage APK packages with split APK support. `FOSS` `[LSP]`
- **[Update Locker](https://github.com/Xposed-Modules-Repo/ru.mike.updatelocker/)** - Block updates (and auto-updates) selected apps via popular markets including Google Play Market, Huawei AppGallery and Samsung Galaxy Store. `Proprietary`
- **[Updates Manager Extended](https://github.com/Senliast/xposed-modules/tree/main/Updates_Manager_Extended)** - Allows to block app updates (including automatic updates) for specific apps, no matter from which app store they were installed. `FOSS` `[LSP]`

> [!TIP]
>
> Check out our **[Zygisk Detach Guide ↗](../general-guides/stop-android-app-auto-updates-play-store.md)**

## Permissions & AppOps

- **[AppOps](https://play.google.com/store/apps/details?id=rikka.appops)** - Control the hidden appops conveniently. `Proprietary`
- **[Permission Ruler](https://play.google.com/store/apps/details?id=com.stefanosiano.permissionruler&hl=en)** - Automatically manages app permissions when the screen is off for enhanced privacy. `Proprietary`
- **[PermissionManagerX](https://github.com/mirfatif/PermissionManagerX)** - eXtended Permission Manager for Android to view and set Manifest Permissions and AppOps. `FOSS` | [🌱](https://f-droid.org/packages/com.mirfatif.permissionmanagerx) | [▶️](https://play.google.com/store/apps/details?id=com.mirfatif.permissionmanagerx)
- **[Thanox](https://github.com/Tornaco/Thanox)** - A system management tool that provide convenient functions like application startup management, background management, permission management etc. `FOSS` `[LSP]` | [▶️](https://play.google.com/store/apps/details?id=github.tornaco.android.thanos.pro&hl=en&gl=US)

> [!TIP]
> Check out [Firewall Tools](security.md#firewalls-filtering) for network control of apps

## System Information & Diagnostics

- **[Castro - system info](https://play.google.com/store/apps/details?id=com.itemstudio.castro)** - A huge collection of information about your device and a set of tools for monitoring its status. `Proprietary`
- **[Device Info HW](https://play.google.com/store/apps/details?id=ru.andr7e.deviceinfohw)** - A hardware and software information app for Android devices. `Proprietary`
- **[Infamick Script](https://github.com/Infamousmick/Infamick-script/)** - A powerful system utility script that provides easy access to various system information and settings. `FOSS` `[M]`
- **[VD Infos](https://github.com/VD171/VD-Infos/)** - Reads several of details and information to show you an example of what can be captured from your device in use.​ A.k.a VDInfos, VDInfo, VD Info. `FOSS` 


</div>
