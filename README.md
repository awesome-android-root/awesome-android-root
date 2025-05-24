# Awesome Android Root 
[![GitHub Repo stars](https://img.shields.io/github/stars/fynks/awesome-android-root?style=flat-square&logo=github)](https://github.com/fynks/awesome-android-root?ref=awesome-android-root.link)

**Unlock the full potential of your Android device!** This is your ultimate, community-curated guide to gain root access, customize your system, enhance performance and everything related to android rooting.

**What you'll find inside:**

*   🌟 **Top-Tier Root Apps:** Discover powerful applications that leverage root permissions for enhanced functionality, from ad-blocking and app management to deep system tweaks.
*   🧩 **Essential Magisk Modules:** Explore a handpicked selection of Magisk modules
*   🔧 **Popular LSPosed modules and tweaks:** Dive into modules that allow fine-grained control and modification of app and system behavior.
*   📖 **In-Depth Rooting Guides & Troubleshooting:** Navigate the rooting process with clear guides, understand key concepts and find solutions to common issues.
*   🛡️ **Safety & Security:** Learn about best practices for rooting safely and tools to manage root access responsibly.

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
      - [Youtube](#youtube)
      - [Line](#line)
      - [QQ](#qq)
      - [Telegram](#telegram)
      - [Wechat](#wechat)
      - [Whatsapp](#whatsapp)
      - [X/Twitter](#xtwitter)
    - [Other App Mods](#other-app-mods)
    - [Patching](#patching)
  - [Audio Enhancement](#audio-enhancement)
  - [Automation](#automation)
  - [Backup and Restore](#backup-and-restore)
  - [Battery Management](#battery-management)
  - [Cleaning Apps](#cleaning-apps)
  - [Communication Tools](#communication-tools)
    - [Call Recorders](#call-recorders)
    - [Contacts](#contacts)
    - [SMS](#sms)
  - [Customizations](#customizations)
    - [Boot Animations](#boot-animations)
    - [Font Managers](#font-managers)
    - [Launchers](#launchers)
    - [Navigation](#navigation)
    - [OS Customizations](#os-customizations)
      - [AOSP (Android Open Source Project)](#aosp-android-open-source-project)
      - [ColorOS (Oppo)](#coloros-oppo)
      - [Global](#global)
      - [HyperOS (Xiaomi)](#hyperos-xiaomi)
      - [One UI (Samsung)](#one-ui-samsung)
      - [Oxygen OS (OnePlus)](#oxygen-os-oneplus)
    - [Theming](#theming)
  - [Debloating](#debloating)
  - [Development and Debugging](#development-and-debugging)
  - [File Management](#file-management)
  - [Kernel Management](#kernel-management)
  - [Network Tools](#network-tools)
  - [NFC Tools](#nfc-tools)
  - [Performance Improvements](#performance-improvements)
  - [Privacy and Security](#privacy-and-security)
  - [Root Specific](#root-specific)
    - [Bootloop Protection](#bootloop-protection) 
    - [Hide Root](#hide-root)
    - [Managers](#managers)
  - [System Modifications](#system-modifications)
  - [Termux](#termux)
  - [Tools](#tools)
- [FAQs](#faqs)
- [Contributing](#contributing)
- [Important Notes](#important-notes)
- [Stats](#stats)



## What is Root Access
Android rooting is the process of gaining privileged control (known as root access) over various Android subsystems. 

Rooting allows overcoming limitations that carriers and hardware manufacturers put on some devices, resulting in the ability to alter or replace system applications and settings, run specialized apps that require administrator-level permissions, or perform other operations that are otherwise inaccessible to a normal Android user.

## Root Guide & Solutions
A comprehensive guide covering different rooting methods, decision-making and different frameworks.

[Read the complete rooting guide →](./docs/rooting-guides/index.md)


## Glossary
-  **`FOSS`** = Free and Open Source Software
> Indicates software where the source code is openly available. This allows anyone to inspect, modify, and distribute the software, promoting transparency and community collaboration.
-  **`Proprietary`** = Missing license or Closed-source software
> Refers to software that is closed-source, meaning its underlying source code is not publicly available. This category may also include software with unclear or missing licensing terms.
-  **`[M]`** = Magisk Module
> Signifies an add-on specifically designed for the Magisk and require Magisk framework to be installed and active on the device to function. 
-  **`[LSP]`** = Requires LSPosed Framework
> Denotes that the app or modification needs the LSPosed Framework to be installed and active on the device to function. 

- _**Apps are organized in alphabetical order within each category.**_

## Root Apps
### Ad Blocking
- **[AdAway](https://adaway.org/)** - Open-source ad blocker using hosts file. `FOSS`
- **[AdClose](https://github.com/Xposed-Modules-Repo/com.close.hook.ads/)** - Prevents the initial loading of the advertising SDK within the application and intercept application advertising requests to block ads. `Proprietary` `[LSP]`
- **[AdGuard](https://adguard.com/en/adguard-android/overview.html)** - Comprehensive ad blocking solution. `Proprietary`
- **[bindhosts](https://github.com/bindhosts/bindhosts)** - Systemless hosts for Apatch, KernelSU and Magisk that is fully standalone & self-updating. - `FOSS` `[M]`
- **[Blokada](https://blokada.org/)** - Advanced ad blocker with VPN functionality. `Proprietary`
- **[Cubic-AdBlock](https://github.com/Vaz15k/Cubic-AdBlock)** - A simple AdBlock module based on the hosts file. `FOSS` `[M]`
- **[Re-Malwack](https://github.com/Magisk-Modules-Alt-Repo/Re-Malwack)** - A fully-fledged ad-block module. Contains all your needs ✨ `FOSS` `[M]`
- **[StevenBlock ](https://github.com/mikropsoft/StevenBlock)** - Ad Blocking Module for Android suporting Magisk, KernelSU & APatch. `FOSS` `[M]`
- **[systemless-adblocker](https://github.com/Magisk-Modules-Alt-Repo/systemless-adblocker)** - Ultimate adblocker module derived from gloeyisk/systemless-hosts. `FOSS` `[M]`
- **[Systemless hosts KernelSU module](https://github.com/symbuzzer/systemless-hosts-KernelSU-module)** - Required module to use applications such as AdAway on KernelSU and APatch. `FOSS`

[↑ Back to top](#table-of-contents)

### App Management
#### App Isolation and Cloning
- **[Insular](https://gitlab.com/secure-system/Insular)** -Isolate your big brother app.A fork based on the excellent Island. `FOSS`
- **[Island](https://github.com/oasisfeng/island)** - App isolation and cloning. `FOSS`
- **[Shelter](https://gitea.angry.im/PeterCxy/Shelter)** - Isolate and clone apps. `FOSS`

#### App Managers
- **[App Manager](https://github.com/MuntashirAkon/AppManager)** - A full-featured package manager and viewer for Android. `FOSS`
- **[AppOps](https://appops.rikka.app/)** - Control the hidden appops conveniently. `Proprietary`
- **[Hail](https://github.com/aistra0528/Hail)** - Disable / Hide / Suspend / Uninstall Android apps. `FOSS`
- **[Inure](https://github.com/Hamza417/Inure)** - An elegant and beautiful premium Android app manager for rooted and non-rooted devices. `FOSS`
- **[Let Me Downgrade](https://github.com/DavidBerdik/Let-Me-Downgrade)** - Add support for downgrading apps on Android 12 through 15 QPR1. `FOSS` `[LSP]`
- **[Package Manager](https://github.com/SmartPack/PackageManager)** - A highly powerful app to manage both system and user apps installed on an Android device. `FOSS`
- **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Zygisk module to detach installed apps from Play Store, hooking binder. `FOSS` `[M]`

#### App Markets
- **[Aurora Store](https://github.com/whyorean/AuroraStore)** - A Google Play Store client to search, view app details, and download APKs directly to your device. `FOSS`
- **[Droid-ify](https://github.com/Droid-ify/client)** - F-Droid client with Material UI and auto updating apps using root. `FOSS`
- **[Neo Store](https://github.com/NeoApplications/Neo-Store)** - An F-Droid client with modern UI and an arsenal of extra features. `FOSS`

#### App Permissions
- **[Net Switch](https://github.com/Rem01Gaming/net-switch)** - Magisk Module to isolate any app from Internet access. `FOSS` `[M]`
- **[Permission Ruler](https://play.google.com/store/apps/details?id=com.stefanosiano.permissionruler&hl=en)** - Automatically manages app permissions when the screen is off for enhanced privacy. `Proprietary` `[M]`
- **[PermissionManagerX](https://github.com/mirfatif/PermissionManagerX)** - eXtended Permission Manager for Android to view and set Manifest Permissions and AppOps. `FOSS` `[M]`
- **[Thanox](https://apt.izzysoft.de/fdroid/index/apk/github.tornaco.android.thanos)** - A system management tool that provide convenient functions like application startup management, background management, permission management etc. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

### App Mods

#### Social Media Mods
##### Bilibili
- **[MBGA](https://github.com/cledwynl/mbga/)** - A Xposed module to Make Bilibili Great Again. `FOSS` `[LSP]`

##### Discord
- **[BunnyXposed](https://github.com/bunny-mod/BunnyXposed)** - An Xposed module to inject Bunny, a mod for Discord's mobile apps. `FOSS` `[M]`

##### Duolingo
- **[Duolingo Regret](https://github.com/TigerBeanst/Duolingo-Regret)** - Change Duolingo's time zone to any arbitrary time zone, makes it easier to go back and finish forgotten streaks. `FOSS` `[LSP]`
  
##### Instagram
- **[InstaEclipse](https://github.com/ReSo7200/InstaEclipse/)** - Adds Features like Developer Options, Ghost Mode, Ad-Free browsing, and Distraction-Free Mode to Instagram. `FOSS` `[LSP]`

##### Youtube
- **[RevancedXposed](https://github.com/chsbuffer/RevancedXposed)** - Youtube & YT Music block ads, background playback Xposed module `FOSS` `[LSP]`

##### Line
- **[LineXtra](https://github.com/yagiyuu/LineXtra)** - Removes Ads and Tabs from the LINE. `FOSS` `[LSP]`


##### QQ
- **[NewQStory](https://github.com/Xposed-Modules-Repo/lin.xposed/)** - Xposed QQ module. `Proprietary` `[LSP]`
- **[QAuxiliary](https://github.com/cinit/QAuxiliary)** - Xposed module based on QNotified. `FOSS` `[LSP]`

##### Telegram
- **[Re-Telegram](https://github.com/Sakion-Team/Re-Telegram/)** - Adds features like AntiAntiForward, AntiRecall, NoSponsoredMessages, ProhibitChannelSwitching and many more to various Telegram clients. `FOSS` `[LSP]`
- **[Telegram Speed Hook](https://github.com/araafroyall/Telegram-Speed-Hook)** - An Xposed Module to Increase Telegram Speed.`FOSS` `[LSP]`
- **[TeleVip](https://github.com/Xposed-Modules-Repo/com.my.televip/)** - A module for modifying Telegram with Hide seen status, unlocking channel restrictions etc. `Proprietary` `[LSP]`

##### Wechat
- **[X](https://github.com/Xposed-Modules-Repo/cn.android.x)** - Add extra features to Wechat. `Proprietary` `[LSP]`
- **[XChat](https://github.com/Xposed-Modules-Repo/com.xchat)** - A customization mod for Wechat. `Proprietary` `[LSP]`

##### Whatsapp
- **[WA Enhancer](https://github.com/Dev4Mod/WaEnhancer)** - A Xposed module that enhances your WhatsApp experience. `FOSS` `[LSP]`
- **[Wa Revamp](https://github.com/Xposed-Modules-Repo/its.madruga.warevamp)** - Add various functions like download staus and view once, hide read message, Statuses and
Archived Chats to official WhatsApp. `Proprietary` `[LSP]`

##### X/Twitter
- **[Hachidori](https://github.com/Xposed-Modules-Repo/com.twifucker.hachidori/)** - Adds downloading media, hidding ads and other privacy features to X (formerly Twitter). `Proprietary` `[LSP]`

[↑ Back to top](#table-of-contents)

#### Other App Mods
- **[F*ck for VIP](https://github.com/Xposed-Modules-Repo/com.bug.hookvip)** - A module to unlock some software memberships and remove ads.Check releases section for list of supported apps. `Proprietary` `[LSP]`
- **[IceCore](https://github.com/Xposed-Modules-Repo/me.bingyue.IceCore/)** - Integrates various fun functions, supports obtaining VIP, removing ads, and other functions. `Proprietary` `[LSP]`
- **[Keyboard GPT](https://github.com/Mino260806/KeyboardGPT)** - Lets you integrate Generative AI like ChatGPT in keyboard. `FOSS` `[LSP]`
- **[Maps tweaks](https://github.com/Xposed-Modules-Repo/ru.mike.mapstweaks)** - Collection of the maps UI tweaks for Google maps, Yandex maps and Yandex Navi. `Proprietary` `[LSP]`
- **[NewHookVip](https://github.com/Xposed-Modules-Repo/top.hookvip.pro)** - Xposed module for unlocking some App memberships and adding some extended functions. Check releases section for list of supported apps. `Proprietary` `[LSP]`
- **[Rboard Theme Manager](https://github.com/DerTyp7214/RboardThemeManagerV3)** - A customizable manager app for Google Gboard that allows users to download, apply, and manage various themes and sound settings. `FOSS` `[LSP]`
- **[Wallet Tweaks](https://github.com/Xposed-Modules-Repo/ru.mike.wallettweaks/releases)** - UI tweaks for Google Wallet. `Proprietary` `[LSP]`
- **[Yandex Maps Patcher](https://github.com/Xposed-Modules-Repo/ru.bluecat.yandexmapspatcher)** - Hides ads and intrusive services in the Yandex Maps app. `Proprietary` `[LSP]`

#### Patching
- **[Lucky Patcher](https://www.luckypatchers.com/)** - App patcher and modifier (Use with caution) . `Proprietary`
- **[Revanced Manager](https://github.com/ReVanced/revanced-manager)** - Modify YouTube, Youtube Music, spotify and many more with additional features. `FOSS`

[↑ Back to top](#table-of-contents)

### Audio Enhancement
- **[Hi-Res Audio Enabler](https://github.com/reiryuki/Hi-Res-Audio-Enabler-Magisk-Module)** - Enables high resolution 24 or 32 bit width audio output if device is supported. `FOSS` `[M]`
- **[NLSound](https://github.com/Briclyaz/NLSound_module_QCom)** - Magisk module for improving audio and microphone quality in your Snapdragon SoC device. `FOSS` `[M]`
- **[XAudioCapture](https://github.com/Xposed-Modules-Repo/io.github.wzhy.xaudiocapture)** - Lets you to capture any audio stream you desire, bypassing these restrictions. `Proprietary` `[LSP]`
- **[ViPER4Android FX Redesign](https://github.com/WSTxda/ViperFX-RE-Releases)** - An audio enhancement software that provides users with a wide range of customizable sound options. It allows to improve the audio quality by offering features such as equalizer settings, surround sound effects, bass boost, and more. `Proprietary` `[M]`


### Automation
- **[Automate](https://play.google.com/store/apps/details?id=com.llamalab.automate)** - Lets you create custom automation workflows using flowcharts, enabling seamless management of tasks, files, and device settings. `Proprietary`
- **[MacroDroid](https://play.google.com/store/search?q=macrodroid&c=apps)** - Easy to use automation app. `Proprietary`
- **[Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)** - An advanced and powerful automation app. `Proprietary`

[↑ Back to top](#table-of-contents)

### Backup and Restore
- **[DataBackup](https://github.com/XayahSuSuSu/Android-DataBackup)** - DataBackup for Android 7.0+. `FOSS`
- **[DiskDigger](https://play.google.com/store/apps/details?id=com.defianttech.diskdigger)** - A powerful data recovery tool for Android devices. `Proprietary`
- **[Neo Backup](https://github.com/NeoApplications/Neo-Backup)** - Powerful open-source backup solution. `FOSS`
- **[Swift Backup](https://play.google.com/store/apps/details?id=org.swiftapps.swiftbackup)** - Modern backup solution with cloud support. `Proprietary`

[↑ Back to top](#table-of-contents)

### Battery Management
- **[AccA](https://github.com/MatteCarra/AccA)** - Advanced Charging Controller app. `FOSS`
- **[Battery Guru](https://play.google.com/store/apps/details?id=com.paget96.batteryguru)** - Battery optimization and monitoring. `Proprietary`
- **[Xtreme-Battery-Saver](https://github.com/Magisk-Modules-Alt-Repo/Xtreme-Battery-Saver)** - An extreme battery saver Magisk Module for users who want to really stretch their battery life. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)

### Cleaning Apps
- **[Cleaner Royall](https://github.com/araafroyall/Cleaner-Royall)** - A Light weight but Ultra Fast & Powerful cleaner for Android. `FOSS` `[LSP]`
- **[DirCleaner](https://www.dircleaner.com/)** - A simple and practical cleaning tool. `Proprietary`
- **[SD Maid 2/SE](https://github.com/d4rken-org/sdmaid-se)** - A file management tool for Android that specialises in maintenance. Its core purpose is freeing up space and removing unwanted data. `FOSS`

[↑ Back to top](#table-of-contents)

### Communication Tools
#### Call Recorders
- **[Basic Call Recorder](https://github.com/chenxiaolong/BCR)** - A Basic Call Recorder for rooted Android devices. `FOSS`
- **[Call Recorder - SKVALEX](https://github.com/Magisk-Modules-Repo/callrecorder-skvalex)** - Call recording app to record both sides from the line with a power of root and magisk. `FOSS` `[M]`

#### Contacts
- **[Contacts Sync](https://play.google.com/store/apps/details?id=com.lb.contacts_sync)** - Uses root to sync your address book with high-quality contacts photos from WhatsApp. `Proprietary`

#### SMS
- **[NekoSMS](https://github.com/apsun/NekoSMS)** - A pattern-based text message blocker for Android. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)

### Customizations
#### Boot Animations
- **[Bootanimation](https://github.com/Bitterneko/Bootanimation)** - A custom boot animation for Android. `FOSS`
- **[Live Boot](https://play.google.com/store/apps/details?id=eu.chainfire.liveboot)** - Get a Linux-like live boot screen on Android. `Proprietary`
- **[video-to-bootanimation](https://github.com/Magisk-Modules-Alt-Repo/video-to-bootanimation)** - A Magisk Module Which Can Set Videos as Android Device BootAnimation. `FOSS` `[M]`

#### Font Managers
- **[Font Manager](https://play.google.com/store/apps/details?id=com.androidacy.fontmanager)** - A great font and emoji changer by Androidacy. `Proprietary`
- **[Magisk-iOS-Emoji](https://github.com/Keinta15/Magisk-iOS-Emoji)** - Systemlessly replaces the emoji font with iOS Emoji. `FOSS` `[M]`
#### Launchers
- **[Pixel Launcher Mods](https://github.com/KieronQuinn/PixelLauncherMods)** - Mods for enhancing the Pixel Launcher experience. `FOSS`
- **[Lawnchair](https://github.com/Goooler/LawnchairRelease)** - A customizable launcher offering a Pixel-like experience. `FOSS`
- **[NovaInstaller](https://github.com/Minionguyjpro/NovaInstaller)** - Installs Nova Launcher to /system/app/ on Android. `FOSS`
  
#### Navigation
- **[NavTweaks](https://github.com/Magisk-Modules-Alt-Repo/HideNavBar)** - Fullscreen/Immersive Gesture Tweaks for Android 10-14. `FOSS` `[M]`
- **[Volume Key Track Control Module](https://github.com/Hepolise/VolumeKeyTrackControlModule)** - An Xposed module that allows to skip and play/pause track with volume keys. `FOSS` `[LSP]`

#### OS Customizations
##### AOSP (Android Open Source Project)
- **[PixelUpdater](https://github.com/PixelUpdater/PixelUpdater)** - Pixel Updater is an app for installing Android A/B OTA updates from Google's OTA server. `FOSS` `[M]`
- **[PixelXpert](https://github.com/siavash79/PixelXpert)** - A mixed Xposed+Magisk module, which is made to allow customizations that are not originally designed in AOSP. `FOSS` `[M]` `[LSP]`

##### ColorOS (Oppo)
- **[ColorOS Notify Icon](https://github.com/fankes/ColorOSNotifyIcon)** - Optimize notification icons for ColorOS and adapt to native notification icon specifications. `FOSS`
- **[LuckyTool](https://github.com/Xposed-Modules-Repo/com.luckyzyx.luckytool/blob/main/README_EN.md)** - Extended and optimized Xposed module for ColorOS. `Proprietary` `[LSP]`

##### Global
- **[AlwaysOn](https://github.com/Domi04151309/AlwaysOn)** - Adds an always-on display with various customization options regarding watch face, behavior, and background. `FOSS` `[LSP]`
- **[Disable Target API Block](https://github.com/buttercookie42/DisableTargetAPIBlock)** - An Xposed module for disabling Android 14's installation block for old apps. `FOSS` `[LSP]`
- **[SystemUI Tuner](https://github.com/zacharee/Tweaker?tab=readme-ov-file)** - View and modify hidden settings on Android devices. `FOSS` `[M]`

##### HyperOS (Xiaomi)
- **[ClipboardList](https://github.com/HChenX/ClipboardList)** - Remove the 20-item limit and time limit for the Clipboard and Phrases feature.Only for MIUI & HyperOS. `FOSS` `[LSP]`
- **[GreenDotHide](https://github.com/Dorian399/GreenDotHide)** - Hides the green dot indicating sensitive permission use. Works only on MIUI/HyperOS. `FOSS` `[LSP]`
- **[HyperCeiler](https://github.com/ReChronoRain/HyperCeiler/blob/main/README_en-US.md)** - Extensive customizations for HyperOS. `FOSS` `[LSP]`
- **[Hyper Helper](https://github.com/HowieHChen/XiaomiHelper/blob/master/README_EN-US.md)** - Lightweight customization module for HyperOS only. `FOSS` `[LSP]`
- **[HyperStar](https://github.com/YunZiA/HyperStar/blob/master/README_EN-US.md)** - An LSPosed module mainly designed to customize the Xiaomi HyperOS Control Center, along with some features. `FOSS` `[LSP]` 
- **[MIUIqol](https://github.com/Xposed-Modules-Repo/io.github.chsbuffer.miuihelper/blob/main/README_EN.md)** - Improves my experience of MIUI 12 to 14 and HyperOS. `Proprietary` `[LSP]`
- **[Pengeek](https://github.com/monwf/customiuizer)** - Customize your HyperOS to your liking. For HyperOS based on Android 14. `FOSS` `[LSP]`
  
##### One UI (Samsung)
- **[KnoxPatch](https://github.com/salvogiangri/KnoxPatch)** - Get Samsung apps/features working again in your rooted Galaxy device. For better experience, please also read [this](https://github.com/salvogiangri/KnoxPatch?tab=readme-ov-file#knoxpatch-enhancer) . `FOSS` `[LSP]`
  
##### Oxygen OS (OnePlus)
- **[Enable local installation for OPlus OTA updates](https://github.com/Houvven/OLocalnstall)** - Enable local installation for OPlus OTA updates. `Proprietary` `[LSP]`
- **[OnePlus Flash Control](https://github.com/Bartixxx32/Opflashcontrol-app)** - Precise control over the brightness of the dual-tone and quad-tone LED flashes for OnePlus devices. `FOSS`
- **[OnePlusPlusLauncher](https://github.com/wizpizz/OnePlusPlusLauncher)** - An XPosed module for the System Launcher on OnePlus' OxygenOS 15, providing extra useful features. `FOSS` `[LSP]`
- **[Oxygen-Customizer](https://github.com/DHD2280/Oxygen-Customizer/)** - Open-source Oxygen OS customizer application. `FOSS` `[LSP]`


#### Theming
- **[ColorBlendr](https://github.com/Mahmud0808/ColorBlendr)** - Customize Material You colors of your device. `FOSS`
- **[Iconify](https://github.com/Mahmud0808/Iconify)** - Customize your Android 12+ device easily. `FOSS` `[M]`
- **[Project Themer](https://play.google.com/store/apps/details?id=com.drsants.eggproject)** - Provides tools and features for rooted devices. `Proprietary` `[M]`

[↑ Back to top](#table-of-contents)


### Debloating
- **[Canta](https://github.com/samolego/Canta)** -  Uninstall any app without root using Shizuku (Needs [Shizuku](https://shizuku.rikka.app/) to be installed and running). `FOSS`
- **[De-Bloater](https://github.com/sunilpaulmathew/De-Bloater)** - An application using the power of Magisk to debloat unwanted system apps!. `FOSS`

[↑ Back to top](#table-of-contents)

### Development and Debugging
- **[LADB](https://github.com/tytydraco/LADB)** - Local ADB shell. `FOSS` - [Free Build](https://github.com/hyperio546/ladb-builds)
- **[Shizuku](https://github.com/RikkaApps/Shizuku)** - Use system APIs directly with ADB/root privileges. `FOSS`
- **[Termux](https://termux.com/)** - Advanced terminal emulator and Linux environment. `FOSS` - **[More on Termux](#termux)**
- **[Wireless ADB Switch](https://github.com/Smooth-E/wireless-adb-switch)** - Quickly enable or disable Android's Wireless Debugging feature. Includes widgets and a quick settings tile for convenience. `FOSS`
- **[USB HID Client](https://github.com/Arian04/android-hid-client)** - Use your phone as a keyboard and mouse **without** any software on the other end. `FOSS`

[↑ Back to top](#table-of-contents)

### File Management
- **[Material Files](https://github.com/zhanghai/MaterialFiles)** - Modern file manager with root capabilities. `FOSS`
- **[MiXplorer](https://mixplorer.com/)** - Feature-rich file manager. `Proprietary`
- **[MT Manager](https://mt2.cn/)** - File Management & Reverse Engineering Tool for Android. `Proprietary`
- **[Root Explorer](https://play.google.com/store/apps/details?id=com.speedsoftware.rootexplorer)** - File manager with root access. `Proprietary`
- **[Solid Explorer](https://play.google.com/store/apps/details?id=pl.solidexplorer2)** - Powerful file manager with root support. `Proprietary`
- **[Total Commander](https://play.google.com/store/apps/details?id=com.ghisler.android.TotalCommander)** - A feature rich file maanger for Android supporting root and shizuku.For  a better experince, please read [this](https://www.ghisler.ch/board/viewforum.php?f=22). `Proprietary`
- **[Xplore File Manager](https://play.google.com/store/apps/details?id=com.lonelycatgames.Xplore)** - A file manager with root support. `Proprietary` 

[↑ Back to top](#table-of-contents)


### Kernel Management
- **[EX Kernel Manager](https://play.google.com/store/apps/details?id=flar2.exkernelmanager)** - Root tool for backup and flashing kernels, tweaking color, sound, gestures and other kernel settings. `Proprietary`
- **[Franco Kernel Manager](https://play.google.com/store/apps/details?id=com.franco.kernel)** - A complete toolbox for all devices with a rich that combines everything you need to manage, tweak and empower your device. `Proprietary`
- **[Kernel Flasher](https://github.com/capntrips/KernelFlasher)** - An Android app to flash (AK3 files), backup, and restore kernels. `FOSS`
- **[SmartPack-Kernel-Manager](https://github.com/SmartPack/SmartPack-Kernel-Manager)** - A Kernel Manager. `FOSS`

[↑ Back to top](#table-of-contents)

### Network Tools
- **[MACsposed](https://github.com/DavidBerdik/MACsposed)** - Adds support for MAC Address spoofing to Android 12 through 15. `FOSS` `[LSP]`
- **[Magisk-WiFiADB](https://github.com/mrh929/magisk-wifiadb)** - A magisk module to enable WiFi ADB automatically. `FOSS` `[M]`
- **[personalDNSfilter](https://github.com/IngoZenz/personaldnsfilter)** - A DNS filter proxy that provides local filtering of ads, malware, and tracking servers, supporting secure DNS protocols like DOH and DOT for enhanced privacy. `FOSS`
- **[VPN Hotspot](https://github.com/Mygod/VPNHotspot)** -  Share your VPN connection over hotspot or repeater. `FOSS`
- **[SimbaDroid](https://github.com/buttercookie42/SimbaDroid)** - A simple SMB file server for Android. `FOSS`
- **[Unlimited Hotspot](https://github.com/felikcat/unlimited-hotspot)** - Remove speed restrictions on your hotspot internet and allows hotspots on any plan. `FOSS` `[M]`
- **[WiFi Password Viewer for MMRL](https://github.com/Googlers-Repo/wpd)** - WiFi Password Viewer for MMRL. `FOSS`

[↑ Back to top](#table-of-contents)


### NFC Tools
- **[NFC Card Emulator Pro (Root)](https://play.google.com/store/apps/details?id=com.yuanwofei.cardemulator.pro)** - An NFC Card Emulator that simulates various types of cards, e.g., access cards, elevator cards, factory (meal) cards, school (meal) cards, some library cards, and other IC cards. `Proprietary`
- **[NfcScreenOff](https://github.com/Jon8RFC/NfcScreenOff)** - Read NFC tags when screen is off & disable NFC tagging sound. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)


### Performance Improvements
- **[3C All-in-One Toolbox](https://play.google.com/store/apps/details?id=ccc71.at.free)** - A comprehensive utility that offers a wide range of tools for monitoring, controlling, and optimizing device performance in a user-friendly interface. `Proprietary`
- **[Bye Blur](https://github.com/Magisk-Modules-Alt-Repo/Bye-Blur)** - Disable the blur effect, this improves performance by discarding this complex visual effect. `FOSS` `[M]`
- **[Dynamic System Tweaks Magisk Module](https://github.com/PS2ClassicsVault/Dynamic-System-Tweaks-Magisk-Module)** - Improves overall System performance without overheating and losing battery power for armeabi-v7a devices. `FOSS` `[M]`
- **[Encore Tweaks](https://github.com/Rem01Gaming/encore)** - Enhance device performance during gaming sessions, while keeping battery life optimized for normal use. `Proprietary` `[M]`
- **[Uperf-Game-Turbo](https://github.com/yinwanxi/Uperf-Game-Turbo)** - Userspace performance controller for Android. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)


### Privacy and Security
- **[AFWall+](https://github.com/ukanth/afwall)** - Iptables-based firewall. `FOSS`
- **[Amarok](https://github.com/deltazefiro/Amarok-Hider)** - Android application which enables you to hide your private files & apps with a single click -  `FOSS`
- **[CaptureSposed](https://github.com/99keshav99/CaptureSposed)**  - Xposed module that effectively disables the newly introduced screenshot detection API in Android 14. `FOSS` `[LSP]`
- **[Enable Screenshot ](https://github.com/LSPosed/DisableFlagSecure)** - Enabling screenshots in apps that normally wouldn't allow it, and disabling screenshot(Android 14+) & screen record(Android 15+) detection. `FOSS` `[LSP]`
- **[Flag Secure Patcher](https://github.com/j-hc/FlagSecurePatcher)** - Magisk module to patch service.jar on device to disable secure lock and screenshot listeners. `FOSS` `[M]`
- **[Fyrypt](https://github.com/mirfatif/Fyrypt)** - Android firewall with UID + PID rules, dnscrypt-proxy management, and per-app live network monitoring. `Proprietary`
- **[SensorsOff](https://github.com/theLlamaNet/SensorsOff)** - Simple app to enable or disable privacy sensors(camera and microphone) on Miui/HyperOS. `Proprietary`
- **[XPL-EX](https://github.com/0bbedCode/XPL-EX)** - Really simple to use privacy manager for Android 6.0 Marshmallow and later. `FOSS` `[LSP]`

[↑ Back to top](#table-of-contents)


### Root Specific
#### Bootloop Protection
- **[Anti bootloop](https://github.com/Magisk-Modules-Alt-Repo/abootloop)** - A Magisk Module to protect from bootloops. `FOSS` `[M]`
- **[YetAnotherBootloopProtector](https://github.com/Magisk-Modules-Alt-Repo/YetAnotherBootloopProtector)** - A Magisk Module to monitor and fix potential Bootloops and SystemUI failures. `FOSS` `[M]`

#### Hide Root
- **[Hide My Applist](https://github.com/Dr-TSNG/Hide-My-Applist)** - An Xposed module to intercept applist detections.[Moded Fork](https://github.com/pumPCin/HMAL). `FOSS` `[LSP]`
- **[MagiskDetection](https://github.com/apkunpacker/MagiskDetection)** - Collection of Some Publically Available POC Apps to Detect Root/Magisk presence. `FOSS` `Proprietary`
- **[playcurlNEXT](https://github.com/daboynb/playcurlNEXT)** - Fix Play Integrity (and SafetyNet) verdicts, allowing custom fields and props. `FOSS` `[M]`
- **[Play Integrity Fix](https://github.com/chiteroman/PlayIntegrityFix)** - Fix Play Integrity (and SafetyNet) verdicts. `FOSS` `[M]`
- **[ReZygisk](https://github.com/PerformanC/ReZygisk)** - A standalone and open-source Zygisk implementation, providing Zygisk API support for KernelSU and a replacement for Magisk's built-in Zygisk. `FOSS` `[M]`
- **[Sensitive_Props Mod](https://github.com/Pixel-Props/sensitive-props)** - Helps you bypass SafetyNet and Play Integrity on rooted Android devices by modifying system properties and applying device-specific fixes. `FOSS` `[M]`
- **[Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)** - Hide Magisk. `Proprietary` `[M]`
- **[TrickyStore](https://github.com/5ec1cff/TrickyStore)** - Modifying the certificate chain generated for android key attestation. `Proprietary` `[M]`
- **[Zygisk-Assistant](https://github.com/snake-4/Zygisk-Assistant)** - A Zygisk module to hide root for KernelSU, Magisk and APatch. `FOSS` `[M]`
- **[Zygisk Next](https://github.com/Dr-TSNG/ZygiskNext)**  - Standalone implementation of Zygisk, providing Zygisk API support for KernelSU and a replacement of Magisk's built-in Zygisk. `Proprietary` `[M]`

:exclamation: Root hiding is a constant cat-and-mouse game. These methods might break with updates to Google Play Services or specific apps.

After hiding root, you can check whether hiding works via root detection apps, see [rushiranpise/detection](https://github.com/rushiranpise/detection).

#### Managers
- **[APatch](https://github.com/bmax121/APatch)** - The patching of Android kernel and Android system. `FOSS`
- **[Magisk Manager](https://github.com/topjohnwu/Magisk)** - Manage Magisk modules and root permissions. `FOSS`
- **[MMRL](https://github.com/DerGoogler/MMRL)** - An Android app that helps manage your own modules repository. `FOSS`
- **[KernelSU](https://github.com/tiann/KernelSU)** - A Kernel based root solution for Android. `FOSS`

[↑ Back to top](#table-of-contents)


### System Modifications
- **[AnyWebView](https://github.com/neoblackxt/AnyWebView)** - Tries to detect all system webviews and add them to the developer options -> WebView implementation list. `FOSS` `[LSP]`
- **[AutoNight](https://github.com/Chilly-Blaze/autonight)** - Controlling Android's Dark Mode through environmental brightness. `FOSS`
- **[CorePatch](https://github.com/LSPosed/CorePatch)** - Disable signature verification For Android. `FOSS` `[LSP]`
- **[Disable Rotation Button](https://github.com/JavaCakeGames/disable-rotation-button)** - App to disable Android's floating rotation button. `FOSS`
- **[Open WebView](https://github.com/Magisk-Modules-Alt-Repo/open_webview)** - Helps you to replace your system webview though Magisk. `FOSS` `[M]`
- **[Universal GMS Doze](https://github.com/gloeyisk/universal-gms-doze)** - Patches Google Play services app and certain processes/services to be able to use battery optimization. `FOSS` `[M]`

[↑ Back to top](#table-of-contents)


### Termux
- **[Termux](https://github.com/termux/termux-app)** - A terminal emulator application for Android OS extendible by variety of packages. `FOSS`
- **[Termux:API](https://github.com/termux/termux-api)** - Termux add-on app which exposes device functionality as API to command line programs. `FOSS`
- **[Termux:Boot](https://github.com/termux/termux-boot)** - Run scripts at device boot. `FOSS`
- **[Termux:Float](https://github.com/termux/termux-float)** - Run Termux in a floating window. `FOSS`
- **[Termux:Styling](https://github.com/termux/termux-styling)** - A Termux add-on app to customize the terminal font and color theme. `FOSS`
- **[Termux:Tasker](https://github.com/termux/termux-tasker)** - Termux add-on app for integration with [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm). `FOSS`
- **[Termux:Widget](https://github.com/termux/termux-widget)** - Termux add-on app which adds shortcuts to commands on the home screen. `FOSS`

[↑ Back to top](#table-of-contents)


### Tools
- **[Device Info HW](https://play.google.com/store/apps/details?id=ru.andr7e.deviceinfohw)** - A hardware and software information app for Android devices. `Proprietary`
- **[Infamick Script](https://github.com/Infamousmick/Infamick-script/)** - A powerful system utility script that provides easy access to various system information and settings. `FOSS` `[M]`
- **[Hide Mock Location](https://github.com/auag0/HideMockLocation)** - Xposed Module to Hide Mock Location Settings. `FOSS` `[LSP]`
- **[Hydrostellaire](https://github.com/AestasBritannia/Hydro-Br-leur)** - A magisk module for devices running on Dimensity flagship platforms and OnePlus, Realme devices. `FOSS` `[M]`
- **[JoyCon Droid](https://joycondroid.gitbook.io/joycondroid)** - Allows you to turn your Android device into a controller for your Nintendo Switch. `FOSS`
- **[Pi-hole-for-Android](https://github.com/DesktopECHO/Pi-hole-for-Android)** - Pi-hole/Unbound Raspbian APK installer for Android 5.0+ devices. `FOSS`
- **[SecondScreen](https://github.com/farmerbb/SecondScreen)** - Advanced solution to connect your Android device to external displays. `FOSS`
- **[System Tools Android](https://play.google.com/store/apps/details?id=com.redhome.sta)** - A true utility processor that includes many small utilities for finer work with the system (including root utilities). `Proprietary`
- **[UotanToolbox NT](https://github.com/Uotan-Dev/UotanToolboxNT)** - A modern toolbox for geeks. `FOSS`
- **[TTLChanger](https://github.com/aleksey-saenko/TTLChanger)** - Allows you to modify the default TTL (Time to Live) value. `FOSS`
- **[Root Activity Launcher](https://play.google.com/store/apps/details?id=tk.zwander.rootactivitylauncher)** - Launch activities directly from your home screen with root access. `Proprietary` `[M]`

[↑ Back to top](#table-of-contents)

## FAQs

Common questions and solutions organized by category:

### Root Basics
- [What is Android root?](./docs/faqs.md#what-is-root)
- [Is rooting safe?](./docs/faqs.md#is-rooting-safe) 
- [Will I lose warranty?](./docs/faqs.md#will-rooting-void-my-warranty)

### Common Issues
- [SafetyNet/Play Integrity failures](./docs/faqs.md#how-do-i-fix-safetynet-play-integrity-issues)
- [Bootloop recovery](./docs/faqs.md#my-device-is-stuck-in-a-boot-loop-after-rooting-what-can-i-do)

[Browse all FAQs →](./docs/faqs.md)

[↑ Back to top](#table-of-contents)

## Contributing

Help improve this project by:

### Content
- Adding new root apps and modules
- Sharing device-specific guides
- Improving documentation
- Fixing broken links

### Standards
- Follow [requirements](./docs/contributing.md#requirements)
- Use provided [template](./docs/contributing.md#requirements)
- Test links before submitting
- Keep categories organized

[Read Contribution Guidelines →](./docs/contributing.md)

[↑ Back to top](#table-of-contents)


## Important Notes

:warning: **Warning: Proceed with Extreme Caution**  
Root apps possess the power to fundamentally alter your Android system. Incorrect usage can lead to serious issues, including data loss, system instability, and rendering your device unusable (bricking).


### Key Considerations:

:exclamation: **System Modification Risks**  
These apps can modify core system files, potentially causing boot loops, crashes, or other malfunctions.

:warning: **Data Loss Potential**  
Mistakes or incompatible modifications can result in the loss of your personal data. *Always back up your device before using root apps.*

:lock: **Security Implications**  
Granting root access can increase your device's vulnerability to malware and other security threats.

:information_source: **Community-Sourced Information**  
This list is a collection of community suggestions. We do not guarantee the safety, functionality, or suitability of every app.

:memo: **User Responsibility**  
You are solely responsible for any consequences resulting from the use of these applications. Use them at your own risk.

:bulb: **Recommendation:** Thoroughly research any root app before installation and understand its purpose and potential side effects.

[↑ Back to top](#table-of-contents)

## Stats

- ##### Total Entries: `185`
- ##### Root Apps: `88`
- ##### Magisk Modules: `46`
- ##### LSPosed Modules: `51`

#### You are visitor number:

![Visitor Count](https://profile-counter.glitch.me/fynks/count.svg)
