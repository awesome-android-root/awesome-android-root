# Awesome Android Root 

[![Awesome](https://awesome.re/badge.svg)](https://github.com/fynks/awesome-android-root)

A comprehensive, up-to-date list of Android apps that require or utilize root privileges.

## Table of Contents
- [What is Root Access](#what-is-root-access)
- [Root Guide \& Solutions](#root-guide--solutions)
- [Glossary](#glossary)
- [Root Apps](#root-apps)
  - [Ad Blocking](#ad-blocking)
  - [App Management](#app-management)
  - [App Mods](#app-mods)
  - [Automation](#automation)
  - [Backup and Restore](#backup-and-restore)
  - [Battery Management](#battery-management)
  - [Cleaning Apps](#cleaning-apps)
  - [Customizations](#customizations)
  - [Debloating](#debloating)
  - [Development and Debugging](#development-and-debugging)
  - [File Management](#file-management)
  - [Kernel](#kernel)
  - [Network Tools](#network-tools)
  - [Privacy and Security](#privacy-and-security)
  - [Root Specific](#root-specific)
  - [System Tools](#system-tools)
  - [Termux](#termux)
  - [Tools](#tools)
- [FAQs](#faqs)
- [Contributions](#contributions)

## What is Root Access
Android rooting is the process of gaining privileged control (known as root access) over various Android subsystems. 

Rooting allows overcoming limitations that carriers and hardware manufacturers put on some devices, resulting in the ability to alter or replace system applications and settings, run specialized apps that require administrator-level permissions, or perform other operations that are otherwise inaccessible to a normal Android user.

## Root Guide & Solutions
A comprehensive guide covering different rooting methods, decision-making and different frameworks.

[Read the complete rooting guide →](./docs/rooting-guides/index.md)


## Glossary
-  **`FOSS`** = Free and Open Source Software
-  **`Proprietary`** = Missing license or closed-source software
-  **`[M]`** = Magisk Module
-  **`[LP]`** = Requires LSPosed Framework
> Apps are organized in alphabetical order in each category.

## Root Apps
### Ad Blocking
- **[AdAway](https://adaway.org/)** - Open-source ad blocker using hosts file. `FOSS`
- **[AdGuard](https://adguard.com/en/adguard-android/overview.html)** - Comprehensive ad blocking solution. `Proprietary`
- **[Blokada](https://blokada.org/)** - Advanced ad blocker with VPN functionality. `FOSS`

### App Management
#### App Managers
- **[App Manager](https://github.com/MuntashirAkon/AppManager)** - A full-featured package manager and viewer for Android. `FOSS`
- **[Inure](https://github.com/Hamza417/Inure)** - An elegant and beautiful premium Android app manager for rooted and non-rooted devices. `FOSS`
- **[Package Manager](https://github.com/SmartPack/PackageManager)** - A highly powerful app to manage both system and user apps installed on an Android device. `FOSS`
- **[Hail](https://github.com/aistra0528/Hail)** - Disable / Hide / Suspend / Uninstall Android apps. `FOSS`
- **[LeanData](https://play.google.com/store/apps/details?id=com.teqtic.leandata&hl=en_IN&gl=US)** - Automatically manages the power-hungry radios on your device while the screen is off to significantly lengthen battery life. `Proprietary`

#### App Markets
- **[Aurora Store](https://github.com/whyorean/AuroraStore)** - A Google Play Store client to search, view app details, and download APKs directly to your device. `FOSS`
- **[Droid-ify](https://github.com/Droid-ify/client)** - F-Droid client with Material UI and auto updating apps using root. `FOSS`

#### App Isolation and Cloning
- **[Island](https://play.google.com/store/apps/details?id=com.oasisfeng.island)** - App isolation and cloning. `Proprietary`
- **[Shelter](https://gitea.angry.im/PeterCxy/Shelter)** - Isolate and clone apps. `FOSS`

#### App Permissions
- **[Permission Ruler](https://play.google.com/store/apps/details?id=com.stefanosiano.permissionruler&hl=en)** - Automatically manages app permissions when the screen is off for enhanced privacy. `Proprietary` `[M]`
- **[PermissionManagerX](https://github.com/mirfatif/PermissionManagerX)** - eXtended Permission Manager for Android to view and set Manifest Permissions and AppOps. `FOSS` `[M]`



### App Mods
#### Social Media Mods
- **[Hachidori](https://github.com/Xposed-Modules-Repo/com.twifucker.hachidori/)** - Adds downloading media, hidding ads and other privacy features to X (formerly Twitter). `FOSS` `LP`
- **[MBGA](https://github.com/cledwynl/mbga/)** - A Xposed module to Make Bilibili Great Again. `FOSS` `LP`
- **[Re-Telegram ](https://github.com/Sakion-Team/Re-Telegram/)** - Adds features like AntiAntiForward, AntiRecall, NoSponsoredMessages, ProhibitChannelSwitching and many more to various Telegram clients. `FOSS` `LP`
- **[Wa Revamp](https://github.com/Xposed-Modules-Repo/its.madruga.warevamp)** - Add various functions like download staus and view once, hide read message, Statuses and
Archived Chats to official WhatsApp. `FOSS` `LP`

#### Patching
- **[Lucky Patcher](https://www.luckypatchers.com/)** - App patcher and modifier (Use with caution) . `Proprietary`
- **[Revanced Manager](https://github.com/ReVanced/revanced-manager)** - Modify YouTube, Youtube Music, spotify and many more with additional features. `FOSS`


### Automation
- **[Automate](https://play.google.com/store/apps/details?id=com.llamalab.automate)** - Lets you create custom automation workflows using flowcharts, enabling seamless management of tasks, files, and device settings. `Proprietary`
- **[MacroDroid](https://play.google.com/store/search?q=macrodroid&c=apps)** - Easy to use automation app. `Proprietary`
- **[Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)** - An advanced and powerful automation app. `Proprietary`


### Backup and Restore
- **[DiskDigger](https://play.google.com/store/apps/details?id=com.defianttech.diskdigger)** - A powerful data recovery tool for Android devices. `Proprietary`
- **[Neo Backup](https://github.com/NeoApplications/Neo-Backup)** - Powerful open-source backup solution. `FOSS`
- **[Swift Backup](https://play.google.com/store/apps/details?id=org.swiftapps.swiftbackup)** - Modern backup solution with cloud support. `Proprietary`

### Battery Management
- **[AccA](https://github.com/MatteCarra/AccA)** - Advanced Charging Controller app. `FOSS`
- **[Battery Guru](https://play.google.com/store/apps/details?id=com.paget96.batteryguru)** - Battery optimization and monitoring. `Proprietary`

### Cleaning Apps
- **[DirCleaner](https://www.dircleaner.com/)** - A simple and practical cleaning tool. `Proprietary`
- **[Cache Cleaner](https://github.com/takeru-kageyuki/cache_cleaner)** - A simple tool to clean cache files on your device. `FOSS` 
- **[SD Maid 2/SE](https://github.com/d4rken-org/sdmaid-se)** - A file management tool for Android that specialises in maintenance. Its core purpose is freeing up space and removing unwanted data. `FOSS`


### Customizations
#### Boot Animations
- **[Bootanimation](https://github.com/Bitterneko/Bootanimation)** - A custom boot animation for Android. `FOSS`
- **[Live Boot](https://play.google.com/store/apps/details?id=eu.chainfire.liveboot)** - Get a Linux-like live boot screen on Android. `Proprietary`

#### Launchers
- **[Pixel Launcher Mods](https://github.com/KieronQuinn/PixelLauncherMods)** - Mods for enhancing the Pixel Launcher experience. `FOSS`
- **[Lawnchair](https://github.com/Goooler/LawnchairRelease)** - A customizable launcher offering a Pixel-like experience. `FOSS`
- **[NovaInstaller](https://github.com/Minionguyjpro/NovaInstaller)** - Installs Nova Launcher to /system/app/ on Android. `FOSS`

#### OS Customization
- **[HyperCeiler](https://github.com/ReChronoRain/HyperCeiler/blob/main/README_en-US.md)** - Extensive customizations for HyperOS. `FOSS` `[LP]`
- **[Hyper Helper](https://github.com/HowieHChen/XiaomiHelper/blob/master/README_EN-US.md)** - Lightweight customization module for HyperOS only. `FOSS` `[LP]`
- **[LuckyTool](https://github.com/Xposed-Modules-Repo/com.luckyzyx.luckytool/blob/main/README_EN.md)** - Extended and optimized Xposed module for ColorOS. `FOSS` `[LP]`
- **[Oxygen-Customizer](https://github.com/DHD2280/Oxygen-Customizer/)** - Open-source Oxygen OS customizer application. `FOSS` `[LP]`
- **[PixelXpert](https://github.com/siavash79/PixelXpert)** - A mixed Xposed+Magisk module, which is made to allow customizations that are not originally designed in AOSP `FOSS` `[M]` `[LP]`
- **[SystemUI Tuner](https://github.com/zacharee/Tweaker?tab=readme-ov-file)** - View and modify hidden settings on Android devices. `FOSS` `[M]`

#### Theming
- **[ColorBlendr](https://github.com/Mahmud0808/ColorBlendr)** - Customize Material You colors of your device. `FOSS`
- **[ColorOS Notify Icon](https://github.com/fankes/ColorOSNotifyIcon)** 
- Optimize notification icons for ColorOS and adapt to native notification icon specifications. `FOSS`
- **[Iconify](https://github.com/Mahmud0808/Iconify)** - Customize your Android 12+ device easily. `FOSS` `[M]`
- **[Project Themer](https://play.google.com/store/apps/details?id=com.drsants.eggproject)** - Provides tools and features for rooted devices. `Proprietary` `[M]`



### Debloating
- **[Canta](https://github.com/samolego/Canta)** -  Uninstall any app without root using Shizuku (Needs [Shizuku](https://shizuku.rikka.app/) to be installed and running). `FOSS`
- **[De-Bloater](https://github.com/sunilpaulmathew/De-Bloater)** - An application using the power of Magisk to debloat unwanted system apps!. `FOSS`

### Development and Debugging
- **[LADB](https://github.com/tytydraco/LADB)** - Local ADB shell. `FOSS` - [Free Build](https://github.com/hyperio546/ladb-builds)
- **[Shizuku](https://github.com/RikkaApps/Shizuku)** - Use system APIs directly with ADB/root privileges. `FOSS`
- **[Termux](https://termux.com/)** - Advanced terminal emulator and Linux environment. `FOSS` - **[More on Termux](#termux)**
- **[Wireless ADB Switch](https://github.com/Smooth-E/wireless-adb-switch)** - Quickly enable or disable Android's Wireless Debugging feature. Includes widgets and a quick settings tile for convenience. `FOSS`
- **[USB HID Client](https://github.com/Arian04/android-hid-client)** - Use your phone as a keyboard and mouse **without** any software on the other end. `FOSS`


### File Management
- **[Material Files](https://github.com/zhanghai/MaterialFiles)** - Modern file manager with root capabilities. `FOSS`
- **[MiXplorer](https://mixplorer.com/)** - Feature-rich file manager. `Proprietary`
- **[Root Explorer](https://play.google.com/store/apps/details?id=com.speedsoftware.rootexplorer)** - File manager with root access. `Proprietary`
- **[Solid Explorer](https://play.google.com/store/apps/details?id=pl.solidexplorer2)** - Powerful file manager with root support. `Proprietary`
- **[Total Commander](https://play.google.com/store/apps/details?id=com.ghisler.android.TotalCommander)** - A feature rich file maanger for Android supporting root and shizuku.For  a better experince, please read [this](https://www.ghisler.ch/board/viewforum.php?f=22). `Proprietary`
- **[Xplore File Manager](https://play.google.com/store/apps/details?id=com.lonelycatgames.Xplore)** - A file manager with root support. `Proprietary` 

### Kernel
- **[EX Kernel Manager](https://play.google.com/store/apps/details?id=flar2.exkernelmanager)** - Root tool for backup and flashing kernels, tweaking color, sound, gestures and other kernel settings. `Proprietary`
- **[Franco Kernel Manager](https://play.google.com/store/apps/details?id=com.franco.kernel)** - A complete toolbox for all devices with a rich that combines everything you need to manage, tweak and empower your device. `Proprietary`
- **[SmartPack-Kernel-Manager](https://github.com/SmartPack/SmartPack-Kernel-Manager)** - A Kernel Manager. `FOSS`


### Network Tools
- **[Fing](https://play.google.com/store/apps/details?id=com.overlook.android.fing)** - Network discovery and security. `Proprietary`
- **[NetGuard](https://github.com/M66B/NetGuard/)** - No-root firewall. `FOSS`
- **[VPN Hotspot](https://github.com/Mygod/VPNHotspot)** -  Share your VPN connection over hotspot or repeater. `FOSS`

### Privacy and Security
- **[AFWall+](https://github.com/ukanth/afwall)** - Iptables-based firewall. `FOSS`
- **[Amarok](https://github.com/deltazefiro/Amarok-Hider)** - Android application which enables you to hide your private files & apps with a single click -  `FOSS`
- **[Enable Screenshot ](https://github.com/LSPosed/DisableFlagSecure)** - Enabling screenshots in apps that normally wouldn't allow it, and disabling screenshot(Android 14+) & screen record(Android 15+) detection. `FOSS` `[LP]`
- **[Flag Secure Patcher](https://github.com/j-hc/FlagSecurePatcher)** - Magisk module to patch service.jar on device to disable secure lock and screenshot listeners. `FOSS` `[M]`
- **[SensorsOff](https://github.com/theLlamaNet/SensorsOff)** - Simple app to enable or disable privacy sensors(camera and microphone) on Miui/HyperOS. `FOSS`


### Root Specific
- **[Hide My Applist](https://github.com/Dr-TSNG/Hide-My-Applist)** - An Xposed module to intercept applist detections. `FOSS` `[LP]`
- **[Magisk Manager](https://github.com/topjohnwu/Magisk)** - Manage Magisk modules and root permissions. `FOSS`
- **[MMRL](https://github.com/DerGoogler/MMRL)** - An Android app that helps manage your own modules repository. `FOSS`
- **[Play Integrity Fix](https://github.com/chiteroman/PlayIntegrityFix)** - Fix Play Integrity (and SafetyNet) verdicts. `FOSS` `[M]`
- **[Root Check](https://play.google.com/store/apps/details?id=com.jrummyapps.rootchecker)** - Verify proper root. `Proprietary`
- **[Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)** - Hide Magisk. `Proprietary` `[M]`
- **[Zygisk-Assistant](https://github.com/snake-4/Zygisk-Assistant)** - A Zygisk module to hide root for KernelSU, Magisk and APatch. `FOSS` `[M]`
- **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Zygisk module to detach installed apps from Play Store, hooking binder. `FOSS` `[M]`

### System Modifications
- **[Disable Rotation Button](https://github.com/JavaCakeGames/disable-rotation-button)** - Disable Android's floating rotation button. `FOSS`
- **[KnoxPatch](https://github.com/salvogiangri/KnoxPatch)** - Restore Samsung apps/features on rooted Galaxy devices. `FOSS` `LP`
- **[NoStorageRestrict](https://github.com/Xposed-Modules-Repo/com.github.dan.nostoragerestrict)** - Manage storage restrictions on Android devices. `FOSS` `[M]` `[LP]`
- **[Thanox](https://apt.izzysoft.de/fdroid/index/apk/github.tornaco.android.thanos)** - System management tool with various functions. `FOSS` `[LP]`
- **[Unified Internet QS](https://f-droid.org/packages/com.looker.droidify/)** - Quick settings tile for managing internet connections. `FOSS`


### Termux
- **[Termux](https://github.com/termux/termux-app)** - A terminal emulator application for Android OS extendible by variety of packages. `FOSS`
- **[Termux:API](https://github.com/termux/termux-api)** - Termux add-on app which exposes device functionality as API to command line programs. `FOSS`
- **[Termux:Boot](https://github.com/termux/termux-boot)** - Run scripts at device boot. `FOSS`
- **[Termux:Float](https://github.com/termux/termux-float)** - Run Termux in a floating window. `FOSS`
- **[Termux:Styling](https://github.com/termux/termux-styling)** - A Termux add-on app to customize the terminal font and color theme. `FOSS`
- **[Termux:Tasker](https://github.com/termux/termux-tasker)** - Termux add-on app for integration with [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm). `FOSS`
- **[Termux:Widget](https://github.com/termux/termux-widget)** - Termux add-on app which adds shortcuts to commands on the home screen. `FOSS`

### Tools
- **[JoyCon Droid](https://joycondroid.gitbook.io/joycondroid)** - Allows to turn your Android device into a Controller for your Nintendo Switch. `FOSS`
- **[NFC Card Emulator Pro (Root)](https://play.google.com/store/apps/details?id=com.yuanwofei.cardemulator.pro)** - An NFC Card Emulator that simulates various types of cards e.g. access cards, elevator cards, factory (meal) cards, school (meal) cards, some library cards, and other IC cards. `Proprietary`
- **[Pi-hole-for-Android](https://github.com/DesktopECHO/Pi-hole-for-Android)** - Pi-hole/Unbound Raspbian APK Installer for Android 5.0+ devices. `FOSS` 
- **[SecondScreen ](https://github.com/farmerbb/SecondScreen)** - Advanced solution to connect your Android device to external displays. `FOSS`
- **[TTLChanger](https://github.com/aleksey-saenko/TTLChanger)** - Allows you to modify the default TTL (Time to Live) value. `FOSS`
- **[Root Activity Launcher](https://play.google.com/store/apps/details?id=tk.zwander.rootactivitylauncher)** - Launch activities directly from your home screen with root access. `Proprietary` `[M]`

## FAQs
An index of various rooting related Frequently Asked Questions.

[Read FAQs →](./docs/faqs.md)

## Contributions
We welcome contributions from the community! Please read our [Contributing Guidelines](./docs/contributing.md) to get started.

---

**Note**: Always be cautious when using root apps, as they have the potential to modify system files and settings.

--- 

You are visitor number:

![Visitor Count](https://profile-counter.glitch.me/fynks/count.svg)
