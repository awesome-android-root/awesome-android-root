# Awesome Android Root 

[![Awesome](https://awesome.re/badge.svg)](https://github.com/fynks/awesome-android-root)

A curated collection of best Android root apps, Magisk modules, and LSPosed modules that includes comprehensive guides, troubleshooting, tips & trciks and best practices for rooted devices.

## Table of Contents
- [What is Root Access](#what-is-root-access)
- [Root Guide \& Solutions](#root-guide--solutions)
- [Glossary](#glossary)
- [Root Apps](#root-apps)
  - [Ad Blocking](#ad-blocking)
  - [App Management](#app-management)
    - [App Isolation and Cloning](#app-isolation-and-cloning)
    - [App Managers](#app-managers)
    - [App Markets](#app-markets)
    - [App Permissions](#app-permissions)
  - [App Mods](#app-mods)
    - [Social Media Mods](#social-media-mods)
        - [Bilibili](#bilibili)
        - [Discord](#discord)
        - [Instagram](#instagram)
        - [Line](#line)
        - [QQ](#qq)
        - [Telegram](#telegram)
        - [Wechat](#wechat)
        - [Whatsapp](#whatsapp)
        - [X/Twitter](#xtwitter)
    - [Other App Mods](#other-app-mods)
    - [Patching](#patching)
  - [Automation](#automation)
  - [Backup and Restore](#backup-and-restore)
  - [Battery Management](#battery-management)
  - [Cleaning Apps](#cleaning-apps)
  - [Customizations](#customizations)
    - [Boot Animations](#boot-animations)
    - [Launchers](#launchers)
    - [Navigation](#navigation)
    - [OS Customization](#os-customization)
      - [HyperOS/MIUI](#hyperosmiui)
      - [ColorOS](#coloros)
      - [Oxygen OS](#oxygen-os)
      - [AOSP](#aosp)
      - [Global](#global)
    - [Theming](#theming)
  - [Debloating](#debloating)
  - [Development and Debugging](#development-and-debugging)
  - [File Management](#file-management)
  - [Kernel](#kernel)
  - [Network Tools](#network-tools)
  - [Privacy and Security](#privacy-and-security)
  - [Root Specific](#root-specific)
    - [Hide Root](#hide-root)
    - [Managers](#managers)
  - [System Modifications](#system-modifications)
  - [Termux](#termux)
  - [Tools](#tools)
- [Troubleshooting](#troubleshooting)
- [FAQs](#faqs)
- [Contributing](#contributing)
- [Note](#note)
- [Stats](#stats)

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
- **[AdClose](https://github.com/Xposed-Modules-Repo/com.close.hook.ads/)** - Prevents the initial loading of the advertising SDK within the application and intercept application advertising requests to block ads. `FOSS` `[LP]`
- **[AdGuard](https://adguard.com/en/adguard-android/overview.html)** - Comprehensive ad blocking solution. `Proprietary`
- **[bindhosts](https://github.com/backslashxx/bindhosts)** - Systemless hosts for Apatch, KernelSU and Magisk that is fully standalone & self-updating. - `FOSS` `[M]`
- **[Blokada](https://blokada.org/)** - Advanced ad blocker with VPN functionality. `FOSS`
- **[Cubic-AdBlock](https://github.com/Vaz15k/Cubic-AdBlock)** - A simple AdBlock module based on the hosts file. `FOSS` `[M]`
- **[Re-Malwack](https://github.com/Magisk-Modules-Alt-Repo/Re-Malwack)** - Protect your device from ads, malware, p*rn, gambling sites, fake news sites etc. `FOSS` `[M]`
- **[StevenBlock ](https://github.com/mikropsoft/StevenBlock)** - Ad Blocking Module for Android suporting Magisk, KernelSU & APatch. `FOSS` `[M]`
- **[systemless-adblocker](https://github.com/Magisk-Modules-Alt-Repo/systemless-adblocker)** - Ultimate adblocker module derived from gloeyisk/systemless-hosts. `FOSS` `[M]`
- **[Systemless hosts KernelSU module](https://github.com/symbuzzer/systemless-hosts-KernelSU-module)** - Required module to use applications such as AdAway on KernelSU and APatch. `FOSS` 

### App Management
#### App Isolation and Cloning
- **[Insular](https://gitlab.com/secure-system/Insular)** -Isolate your big brother app.A fork based on the excellent Island. `FOSS`
- **[Island](https://github.com/oasisfeng/island)** - App isolation and cloning. `FOSS`
- **[Shelter](https://gitea.angry.im/PeterCxy/Shelter)** - Isolate and clone apps. `FOSS`

#### App Managers
- **[App Manager](https://github.com/MuntashirAkon/AppManager)** - A full-featured package manager and viewer for Android. `FOSS`
- **[AppOps](https://appops.rikka.app/)** - Control the hidden appops conveniently. `Proprietary`
- **[Inure](https://github.com/Hamza417/Inure)** - An elegant and beautiful premium Android app manager for rooted and non-rooted devices. `FOSS`
- **[Package Manager](https://github.com/SmartPack/PackageManager)** - A highly powerful app to manage both system and user apps installed on an Android device. `FOSS`
- **[Hail](https://github.com/aistra0528/Hail)** - Disable / Hide / Suspend / Uninstall Android apps. `FOSS`
- **[LeanData](https://play.google.com/store/apps/details?id=com.teqtic.leandata&hl=en_IN&gl=US)** - Automatically manages the power-hungry radios on your device while the screen is off to significantly lengthen battery life. `Proprietary`
- **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Zygisk module to detach installed apps from Play Store, hooking binder. `FOSS` `[M]`

#### App Markets
- **[Aurora Store](https://github.com/whyorean/AuroraStore)** - A Google Play Store client to search, view app details, and download APKs directly to your device. `FOSS`
- **[Droid-ify](https://github.com/Droid-ify/client)** - F-Droid client with Material UI and auto updating apps using root. `FOSS`

#### App Permissions
- **[Permission Ruler](https://play.google.com/store/apps/details?id=com.stefanosiano.permissionruler&hl=en)** - Automatically manages app permissions when the screen is off for enhanced privacy. `Proprietary` `[M]`
- **[PermissionManagerX](https://github.com/mirfatif/PermissionManagerX)** - eXtended Permission Manager for Android to view and set Manifest Permissions and AppOps. `FOSS` `[M]`



### App Mods

#### Social Media Mods
##### Bilibili
- **[MBGA](https://github.com/cledwynl/mbga/)** - A Xposed module to Make Bilibili Great Again. `FOSS` `[LP]`

##### Discord
- **[BunnyXposed](https://github.com/bunny-mod/BunnyXposed)** - An Xposed module to inject Bunny, a mod for Discord's mobile apps. `FOSS` `[M]`
  
##### Instagram
- **[IGExperiments](https://github.com/xHookman/IGexperiments)** - Unlocks Instagram's hidden developer options, giving you access to advanced features like White Hat settings (enables SSL unpinning), Test User mode, and much more. `FOSS` `[LP]`
- **[InstaEclipse](https://github.com/ReSo7200/InstaEclipse/)** - Adds Features like Developer Options, Ghost Mode, Ad-Free browsing, and Distraction-Free Mode to Instagram. `FOSS` `[LP]`

##### Line
- **[LineXtra](https://github.com/yagiyuu/LineXtra)** - Removes Ads and Tabs from the LINE. `FOSS` `[LP]`



##### QQ
- **[NewQStory](https://github.com/Xposed-Modules-Repo/lin.xposed/)** - Xposed QQ module. `Proprietry` `[LP]`

##### Telegram
- **[Re-Telegram](https://github.com/Sakion-Team/Re-Telegram/)** - Adds features like AntiAntiForward, AntiRecall, NoSponsoredMessages, ProhibitChannelSwitching and many more to various Telegram clients. `FOSS` `[LP]`
- **[TeleVip](https://github.com/Xposed-Modules-Repo/com.my.televip/)** - A module for modifying Telegram with Hide seen status, unlocking channel restrictions etc. `Proprietary` `[LP]`

##### Wechat
- **[X](https://github.com/Xposed-Modules-Repo/cn.android.x)** - Add extra features to Wechat. `FOSS` `[LP]`
- **[XChat](https://github.com/Xposed-Modules-Repo/com.xchat)** - A customization mod for Wechat. `FOSS` `[LP]`

##### Whatsapp
- **[WA Enhancer](https://github.com/Dev4Mod/WaEnhancer)** - A Xposed module that enhances your WhatsApp experience. `FOSS` `[LP]`
- **[Wa Revamp](https://github.com/Xposed-Modules-Repo/its.madruga.warevamp)** - Add various functions like download staus and view once, hide read message, Statuses and
Archived Chats to official WhatsApp. `FOSS` `[LP]`

##### X/Twitter
- **[Hachidori](https://github.com/Xposed-Modules-Repo/com.twifucker.hachidori/)** - Adds downloading media, hidding ads and other privacy features to X (formerly Twitter). `FOSS` `[LP]`


#### Other App Mods
- **[F*ck for VIP](https://github.com/Xposed-Modules-Repo/com.bug.hookvip)** - A module to unlock some software memberships and remove ads.Check releases section for list of supported apps. `FOSS` `[LP]`
- **[IceCore](https://github.com/Xposed-Modules-Repo/me.bingyue.IceCore/)** - Integrates various fun functions, supports obtaining VIP, removing ads, and other functions. `FOSS` `[LP]`
- **[Keyboard GPT](https://github.com/Mino260806/KeyboardGPT)** - Lets you integrate Generative AI like ChatGPT in keyboard. `FOSS` `[LP]`
- **[Maps tweaks](https://github.com/Xposed-Modules-Repo/ru.mike.mapstweaks)** - Collection of the maps UI tweaks for Google maps, Yandex maps and Yandex Navi. `Proprietary` `[LP]`
- **[NewHookVip](https://github.com/Xposed-Modules-Repo/top.hookvip.pro)** - Xposed module for unlocking some App memberships and adding some extended functions. Check releases section for list of supported apps. `FOSS` `[LP]`


#### Patching
- **[Lucky Patcher](https://www.luckypatchers.com/)** - App patcher and modifier (Use with caution) . `Proprietary`
- **[Revanced Manager](https://github.com/ReVanced/revanced-manager)** - Modify YouTube, Youtube Music, spotify and many more with additional features. `FOSS`


### Automation
- **[Automate](https://play.google.com/store/apps/details?id=com.llamalab.automate)** - Lets you create custom automation workflows using flowcharts, enabling seamless management of tasks, files, and device settings. `Proprietary`
- **[MacroDroid](https://play.google.com/store/search?q=macrodroid&c=apps)** - Easy to use automation app. `Proprietary`
- **[Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)** - An advanced and powerful automation app. `Proprietary`


### Backup and Restore
- **[DataBackup](https://github.com/XayahSuSuSu/Android-DataBackup)** - DataBackup for Android 7.0+. `FOSS`
- **[DiskDigger](https://play.google.com/store/apps/details?id=com.defianttech.diskdigger)** - A powerful data recovery tool for Android devices. `Proprietary`
- **[Neo Backup](https://github.com/NeoApplications/Neo-Backup)** - Powerful open-source backup solution. `FOSS`
- **[Swift Backup](https://play.google.com/store/apps/details?id=org.swiftapps.swiftbackup)** - Modern backup solution with cloud support. `Proprietary`

### Battery Management
- **[AccA](https://github.com/MatteCarra/AccA)** - Advanced Charging Controller app. `FOSS`
- **[Battery Guru](https://play.google.com/store/apps/details?id=com.paget96.batteryguru)** - Battery optimization and monitoring. `Proprietary`
- **[Xtreme-Battery-Saver](https://github.com/Magisk-Modules-Alt-Repo/Xtreme-Battery-Saver)** - An extreme battery saver Magisk Module for users who want to really stretch their battery life. `FOSS` `[M]`

### Cleaning Apps
- **[DirCleaner](https://www.dircleaner.com/)** - A simple and practical cleaning tool. `Proprietary`
- **[Cache Cleaner](https://github.com/takeru-kageyuki/cache_cleaner)** - A simple tool to clean cache files on your device. `FOSS` 
- **[SD Maid 2/SE](https://github.com/d4rken-org/sdmaid-se)** - A file management tool for Android that specialises in maintenance. Its core purpose is freeing up space and removing unwanted data. `FOSS`


### Customizations
#### Boot Animations
- **[Bootanimation](https://github.com/Bitterneko/Bootanimation)** - A custom boot animation for Android. `FOSS`
- **[Live Boot](https://play.google.com/store/apps/details?id=eu.chainfire.liveboot)** - Get a Linux-like live boot screen on Android. `Proprietary`
- **[video-to-bootanimation](https://github.com/Magisk-Modules-Alt-Repo/video-to-bootanimation)** - A Magisk Module Which Can Set Videos as Android Device BootAnimation. `FOSS` `[M]`

#### Launchers
- **[Pixel Launcher Mods](https://github.com/KieronQuinn/PixelLauncherMods)** - Mods for enhancing the Pixel Launcher experience. `FOSS`
- **[Lawnchair](https://github.com/Goooler/LawnchairRelease)** - A customizable launcher offering a Pixel-like experience. `FOSS`
- **[NovaInstaller](https://github.com/Minionguyjpro/NovaInstaller)** - Installs Nova Launcher to /system/app/ on Android. `FOSS`
  
#### Navigation
- **[NavTweaks](https://github.com/Magisk-Modules-Alt-Repo/HideNavBar)** - Fullscreen/Immersive Gesture Tweaks for Android 10-14. `FOSS` `[M]`
- **[Volume Key Track Control Module](https://github.com/Hepolise/VolumeKeyTrackControlModule)** - An Xposed module that allows to skip and play/pause track with volume keys. `FOSS` `[LP]`

#### OS Customization
##### AOSP
- **[PixelXpert](https://github.com/siavash79/PixelXpert)** - A mixed Xposed+Magisk module, which is made to allow customizations that are not originally designed in AOSP. `FOSS` `[M]` `[LP]`

##### ColorOS
- **[LuckyTool](https://github.com/Xposed-Modules-Repo/com.luckyzyx.luckytool/blob/main/README_EN.md)** - Extended and optimized Xposed module for ColorOS. `FOSS` `[LP]`

##### Global
- **[SystemUI Tuner](https://github.com/zacharee/Tweaker?tab=readme-ov-file)** - View and modify hidden settings on Android devices. `FOSS` `[M]`

##### HyperOS/MIUI
- **[ClipboardList](https://github.com/HChenX/ClipboardList)** - Remove the 20-item limit and time limit for the Clipboard and Phrases feature.Only for MIUI & HyperOS. `FOSS` `[LP]`
- **[HyperCeiler](https://github.com/ReChronoRain/HyperCeiler/blob/main/README_en-US.md)** - Extensive customizations for HyperOS. `FOSS` `[LP]`
- **[Hyper Helper](https://github.com/HowieHChen/XiaomiHelper/blob/master/README_EN-US.md)** - Lightweight customization module for HyperOS only. `FOSS` `[LP]`
- **[HyperStar](https://github.com/YunZiA/HyperStar/blob/master/README_EN-US.md)** - An LSPosed module mainly designed to customize the Xiaomi HyperOS Control Center, along with some features. `FOSS` `[LP]` 
- **[MIUIqol](https://github.com/Xposed-Modules-Repo/io.github.chsbuffer.miuihelper/blob/main/README_EN.md)** - Improves my experience of MIUI 12 to 14 and HyperOS. `FOSS` `[LP]`
- **[Pengeek](https://github.com/monwf/customiuizer)** - Customize your HyperOS to your liking. For HyperOS based on Android 14. `FOSS` `[LP]`
  
##### Oxygen OS
- **[Oxygen-Customizer](https://github.com/DHD2280/Oxygen-Customizer/)** - Open-source Oxygen OS customizer application. `FOSS` `[LP]`


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
- **[MT Manager](https://mt2.cn/)** - File Management & Reverse Engineering Tool for Android. `Proprietary`
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
- **[SimbaDroid](https://github.com/buttercookie42/SimbaDroid)** - A simple SMB file server for Android. `FOSS`

### Privacy and Security
- **[AFWall+](https://github.com/ukanth/afwall)** - Iptables-based firewall. `FOSS`
- **[Amarok](https://github.com/deltazefiro/Amarok-Hider)** - Android application which enables you to hide your private files & apps with a single click -  `FOSS`
- **[Enable Screenshot ](https://github.com/LSPosed/DisableFlagSecure)** - Enabling screenshots in apps that normally wouldn't allow it, and disabling screenshot(Android 14+) & screen record(Android 15+) detection. `FOSS` `[LP]`
- **[Flag Secure Patcher](https://github.com/j-hc/FlagSecurePatcher)** - Magisk module to patch service.jar on device to disable secure lock and screenshot listeners. `FOSS` `[M]`
- **[SensorsOff](https://github.com/theLlamaNet/SensorsOff)** - Simple app to enable or disable privacy sensors(camera and microphone) on Miui/HyperOS. `FOSS`


### Root Specific
#### Hide Root
- **[Hide My Applist](https://github.com/Dr-TSNG/Hide-My-Applist)** - An Xposed module to intercept applist detections. `FOSS` `[LP]`
- **[Play Integrity Fix](https://github.com/chiteroman/PlayIntegrityFix)** - Fix Play Integrity (and SafetyNet) verdicts. `FOSS` `[M]`
- **[TrickyStore](https://github.com/5ec1cff/TrickyStore)** - Modifying the certificate chain generated for android key attestation. `Proprietary` `[M]`
- **[Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)** - Hide Magisk. `Proprietary` `[M]`
- **[Zygisk-Assistant](https://github.com/snake-4/Zygisk-Assistant)** - A Zygisk module to hide root for KernelSU, Magisk and APatch. `FOSS` `[M]`
- **[Zygisk Next](https://github.com/Dr-TSNG/ZygiskNext)**  - Standalone implementation of Zygisk, providing Zygisk API support for KernelSU and a replacement of Magisk's built-in Zygisk. `Proprietary` `[M]`

#### Managers
- **[Magisk Manager](https://github.com/topjohnwu/Magisk)** - Manage Magisk modules and root permissions. `FOSS`
- **[MMRL](https://github.com/DerGoogler/MMRL)** - An Android app that helps manage your own modules repository. `FOSS`

### System Modifications
- **[AutoNight](https://github.com/Chilly-Blaze/autonight)** - Controlling Android's Dark Mode through environmental brightness. `FOSS`
- **[Disable Rotation Button](https://github.com/JavaCakeGames/disable-rotation-button)** - App to disable Android's floating rotation button. `FOSS`
- **[KnoxPatch](https://github.com/salvogiangri/KnoxPatch)** - Get Samsung apps/features working again in your rooted Galaxy device. For better experience, please also read [this](https://github.com/salvogiangri/KnoxPatch?tab=readme-ov-file#knoxpatch-enhancer) . `Foss` `[LP]`
- **[Open WebView](https://github.com/Magisk-Modules-Alt-Repo/open_webview)** - Helps you to replace your system webview though Magisk. `FOSS` `[M]`
- **[Thanox](https://apt.izzysoft.de/fdroid/index/apk/github.tornaco.android.thanos)** - A system management tool that provide convenient functions like application startup management, background management, permission management etc. `FOSS` `[LP]`
- **[Universal GMS Doze](https://github.com/gloeyisk/universal-gms-doze)** - Patches Google Play services app and certain processes/services to be able to use battery optimization. `FOSS` `[M]`
- **[Uperf-Game-Turbo](https://github.com/yinwanxi/Uperf-Game-Turbo)** - Userspace performance controller for Android. `FOSS` `[M]`


### Termux
- **[Termux](https://github.com/termux/termux-app)** - A terminal emulator application for Android OS extendible by variety of packages. `FOSS`
- **[Termux:API](https://github.com/termux/termux-api)** - Termux add-on app which exposes device functionality as API to command line programs. `FOSS`
- **[Termux:Boot](https://github.com/termux/termux-boot)** - Run scripts at device boot. `FOSS`
- **[Termux:Float](https://github.com/termux/termux-float)** - Run Termux in a floating window. `FOSS`
- **[Termux:Styling](https://github.com/termux/termux-styling)** - A Termux add-on app to customize the terminal font and color theme. `FOSS`
- **[Termux:Tasker](https://github.com/termux/termux-tasker)** - Termux add-on app for integration with [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm). `FOSS`
- **[Termux:Widget](https://github.com/termux/termux-widget)** - Termux add-on app which adds shortcuts to commands on the home screen. `FOSS`

### Tools
- **[Device Info HW](https://play.google.com/store/apps/details?id=ru.andr7e.deviceinfohw)** - A hardware and software information app for Android devices. `Proprietary`
- **[Hydrostellaire](https://github.com/AestasBritannia/Hydro-Br-leur)** - A magisk module for devices running on Dimensity flagship platforms and OnePlus, Realme devices. `FOSS` `[M]`
- **[JoyCon Droid](https://joycondroid.gitbook.io/joycondroid)** - Allows you to turn your Android device into a controller for your Nintendo Switch. `FOSS`
- **[NFC Card Emulator Pro (Root)](https://play.google.com/store/apps/details?id=com.yuanwofei.cardemulator.pro)** - An NFC Card Emulator that simulates various types of cards, e.g., access cards, elevator cards, factory (meal) cards, school (meal) cards, some library cards, and other IC cards. `Proprietary`
- **[Pi-hole-for-Android](https://github.com/DesktopECHO/Pi-hole-for-Android)** - Pi-hole/Unbound Raspbian APK installer for Android 5.0+ devices. `FOSS`
- **[SecondScreen](https://github.com/farmerbb/SecondScreen)** - Advanced solution to connect your Android device to external displays. `FOSS`
- **[UotanToolbox NT](https://github.com/Uotan-Dev/UotanToolboxNT)** - A modern toolbox for geeks. `FOSS`
- **[TTLChanger](https://github.com/aleksey-saenko/TTLChanger)** - Allows you to modify the default TTL (Time to Live) value. `FOSS`
- **[Root Activity Launcher](https://play.google.com/store/apps/details?id=tk.zwander.rootactivitylauncher)** - Launch activities directly from your home screen with root access. `Proprietary` `[M]`
- **[WiFi Password Viewer for MMRL](https://github.com/Googlers-Repo/wpd)** - WiFi Password Viewer for MMRL. `FOSS`
## Troubleshooting

A comprehensive guide on common issues and their solutions for Android rooting.

[View Troubleshooting Guides →](./docs/troubleshooting/index.md)

## FAQs

Detailed answers to frequently asked questions about Root basics and common errors.

[Browse FAQs →](./docs/faqs.md)

## Contributing

Help improve Awesome Android Root by adding new root apps, sharing device guides and Fixing documentation.

[Contribution Guidelines →](./docs/contributing.md)

## Note
- Always be cautious when using root apps, as they have the potential to modify system files and settings.
- All apps and modules listed here are crowdsourced from the community.
- The maintainers of this list are not responsible for any damage, security issues, or other problems that may occur on your device.
- Use these tools at your own risk and always backup your data before making system modifications.

## Stats
#### Number of Apps: `137`
#### You are visitor number:

![Visitor Count](https://profile-counter.glitch.me/fynks/count.svg)

