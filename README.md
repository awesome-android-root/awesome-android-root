# Awesome Android Root
A comprehensive, up-to-date list of Android apps that require or utilize root privileges.

> Pull requests are welcome ✨

## Table of Contents
  - [What is root?](#what-is-root)
  - [Should I root?](#should-i-root)
    - [Advantages](#advantages)
    - [Disadvantages](#disadvantages)
    - [Debate](#debate)
  - [How to root?](#how-to-root)
    - [Magisk](#magisk)
    - [KernelSU](#kernelsu)
    - [APatch](#apatch)
    - [Which solution should I use?](#which-solution-should-i-use)
  - [Framework Solutions](#framework-solutions)
    - [LSPosed](#lsposed)
    - [LSPosed Fork](#lsposed-fork)
  - [Glossary](#glossary)
  - [Root Apps](#root-apps)
    - [Ad Blocking](#ad-blocking)
    - [App Management](#app-management)
    - [Automation](#automation)
    - [Backup and Restore](#backup-and-restore)
    - [Development and Debugging](#development-and-debugging)
    - [File Management](#file-management)
    - [Kernel](#kernel)
    - [Modifications](#modifications)
    - [Network Tools](#network-tools)
    - [Privacy and Security](#privacy-and-security)
    - [Root Specific](#root-specific)
    - [Termux](#termux)

## What is root?
Android rooting is the process of gaining privileged control (known as root access) over various Android subsystems. Rooting allows overcoming limitations that carriers and hardware manufacturers put on some devices, resulting in the ability to alter or replace system applications and settings, run specialized apps that require administrator-level permissions, or perform other operations that are otherwise inaccessible to a normal Android user.

## Should I root?
Now to the main question. Should i root?
First, let's view disadvantages then advantages.

### Advantages
- You can grant apps, Su and they'll do a great job for you.
- You can tweak kernel= great performance for games.
- You can ban ads from your device completely.
- You can uninstall unnecessary apps, i.e., system apps.
- You can perform much more super enjoying tasks, they all can't be listed here.

### Disadvantages
- As a root user, if you ever mess up, it's all your responsibility to fix it.
- Personally i never faced it, even though i messed up the device to the worst condition. People usually say your device may hard brick.
- Banking apps won't work. Recently, some apps are detecting root even with Magisk (there are workarounds for most of them).
- Rooting process if messed, Although it can be fixed, it can be tough for beginners.

### Debate
- Here is the [reddit thread](https://www.reddit.com/r/AndroidQuestions/comments/1c69h3q/is_rooting_still_something_you_would_do_in_2024/) Debating if its worth it rooting in 2024 (but in my opinion its worth every penny).
  
## How to root?
It really depends upon your device; it's recommended to check the XDA forum for your device, which usually has a good guide for your devices. Another option is telegram groups for your devices, as they have specific communities related to your device.
Generally, the following steps are common:
- Unlock the boot loader.
- Get a custom recovery installed.
- Flash your preferred method of rooting solutions from below.
- Enjoy the ultimate power of a rooted device.

### Magisk
**[Magisk](https://github.com/topjohnwu/Magisk)** is the most popular and powerful tool for Android power users, providing root access, boot scripts, and a module system for customizing Android devices systemlessly. It's actively maintained and regularly updated.

### KernelSU
**[KernelSU](https://github.com/tiann/KernelSU)** is a kernel-based root solution for Android devices. It provides a root method that works by modifying the kernel, offering an alternative to Magisk for some devices and use cases. KernelSU is gaining popularity, especially on newer devices.

### APatch
**[APatch](https://github.com/bmax121/APatch)** uses patching of Android kernel and Android system to gain root access based on [Kernel Patch](https://github.com/bmax121/KernelPatch/).

### Which solution should I use?
If you are a newbie or don't know much about rooting, I'd  recommend going with Magisk, as it has a vast community support.

## Framework Solutions
### LSPosed
**[LSPosed](https://github.com/LSPosed/LSPosed)** is an open-source framework that allows users to install and use Xposed/LSPosed modules on their Android devices.

### LSPosed Fork
**[LSPosed Fork by JingMatrix](https://github.com/JingMatrix/LSPosed)** is a fork of LSPosed after LSPosed's development was halted for some reasons.It has support for Android 15 as well as some other improvements.

## Glossary
-  **FOSS** = Free and Open Source Software
-  **Non-FOSS** = Closed Source Software

## Root Apps
### Ad Blocking

- **[AdAway](https://adaway.org/)** - Open-source ad blocker using hosts file (FOSS)
- **[AdGuard](https://adguard.com/en/adguard-android/overview.html)** - Comprehensive ad blocking solution (Non-FOSS)
- **[Blokada](https://blokada.org/)** - Advanced ad blocker with VPN functionality (FOSS)

### App Management
- **[App Manager](https://github.com/MuntashirAkon/AppManager)** - A full-featured package manager and viewer for Android (Foss)
- **[Inure](https://github.com/Hamza417/Inure)** - An elegant and beautiful premium Android app manager for rooted and non-rooted devices (Foss)
- **[Hail](https://github.com/aistra0528/Hail)** - Disable / Hide / Suspend / Uninstall Android apps (Foss)

### Automation
- **[Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm)** - Automation app (Non-FOSS)
- **[MacroDroid](https://play.google.com/store/search?q=macrodroid&c=apps)** - Easy to use automation app (Non-Foss)

### Backup and Restore
- **[Neo Backup](https://github.com/NeoApplications/Neo-Backup)** - Powerful open-source backup solution (FOSS)
- **[Swift Backup](https://play.google.com/store/apps/details?id=org.swiftapps.swiftbackup)** - Modern backup solution with cloud support (Non-FOSS)

### Development and Debugging
- **[Termux](https://termux.com/)** - Advanced terminal emulator and Linux environment (FOSS) - **[More on Termux](#termux)**
- **[LADB](https://github.com/tyronechen/LADB)** - Local ADB shell (FOSS)

### File Management
- **[MiXplorer](https://mixplorer.com/)** - Feature-rich file manager (FOSS)
- **[Root Explorer](https://play.google.com/store/apps/details?id=com.speedsoftware.rootexplorer)** - File manager with root access (Non-FOSS)
- **[Xplore File Manager](https://play.google.com/store/apps/details?id=com.lonelycatgames.Xplore)** - A file manager with root support (Non-FOSS) 
- **[Solid Explorer](https://play.google.com/store/apps/details?id=pl.solidexplorer2)** - Powerful file manager with root support (Non-FOSS)
- **[Total Commander](https://play.google.com/store/apps/details?id=com.ghisler.android.TotalCommander)** (Non-FOSS)
### Kernel
- **[Franco Kernel Manager](https://play.google.com/store/apps/details?id=com.franco.kernel)** - A complete toolbox for all devices with a rich that combines everything you need to manage, tweak and empower your device (Non-FOSS)
- **[EX Kernel Manager](https://play.google.com/store/apps/details?id=flar2.exkernelmanager)** - Root tool for backup and flashing kernels, tweaking color, sound, gestures and other kernel settings (Non-FOSS)

### Modifications
- **[Revanced Manager](https://github.com/ReVanced/revanced-manager)** - YouTube with additional features (FOSS)
- **[Lucky Patcher](https://www.luckypatchers.com/)** - App patcher and modifier (Use with caution, Non-FOSS)
- **[Live Boot](https://play.google.com/store/apps/details?id=eu.chainfire.liveboot)** - Get a linux like live boot screen on Android (Non-Foss)

### Network Tools
- **[Fing](https://play.google.com/store/apps/details?id=com.overlook.android.fing)** - Network discovery and security (Non-FOSS)
- **[NetGuard](https://github.com/M66B/NetGuard/)** - No-root firewall (FOSS)

### Privacy and Security
- **[Amarok](https://github.com/deltazefiro/Amarok-Hider)** - Android application which enables you to hide your private files & apps with a single click. (FOSS)
- **[Enable Screenshot ](https://github.com/LSPosed/DisableFlagSecure)** - Enabling screenshots in apps that normally wouldn't allow it, and disabling screenshot(Android 14+) & screen record(Android 15+) detection. (FOSS)
- **[Flag Secure Patcher](https://github.com/j-hc/FlagSecurePatcher)** - Magisk module to patch service.jar on device to disable secure lock and screenshot listeners. (FOSS)
- **[AFWall+](https://github.com/ukanth/afwall)** - Iptables-based firewall (FOSS)
- **[Shelter](https://gitea.angry.im/PeterCxy/Shelter)** - Isolate and clone apps (FOSS)
- **[Island](https://play.google.com/store/apps/details?id=com.oasisfeng.island)** - App isolation and cloning (Non-FOSS)

### Root Specific
- **[Hide My Applist](https://github.com/Dr-TSNG/Hide-My-Applist)** - An Xposed module to intercept applist detections. (FOSS)
- **[Magisk Manager](https://github.com/topjohnwu/Magisk)** - Manage Magisk modules and root permissions. (FOSS)
- **[Play Integrity Fix](https://github.com/chiteroman/PlayIntegrityFix)** - Fix Play Integrity (and SafetyNet) verdicts.  (FOSS)
- **[Root Checker](https://play.google.com/store/apps/details?id=com.joeykrim.rootcheck)** - Verify proper root (Non-FOSS)
- **[Shamiko](https://github.com/LSPosed/LSPosed.github.io/releases)** - Hide Magisk. (Non-FOSS)
- **[Tricky Store](https://github.com/chiteroman/TrickyStore)**  (FOSS)
- **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Zygisk module to detach installed apps from Play Store, hooking binder. (FOSS)

### Termux
- **[Termux](https://github.com/termux/termux-app)** - A terminal emulator application for Android OS extendible by variety of packages. (FOSS)
- **[Termux:API](https://github.com/termux/termux-api)** - Termux add-on app which exposes device functionality as API to command line programs. (FOSS)
- **[Termux:Boot](https://github.com/termux/termux-boot)** - Run scripts at device boot. (FOSS)
- **[Termux:Float](https://github.com/termux/termux-float)** - Run Termux in a floating window. (FOSS)
- **[Termux:Styling](https://github.com/termux/termux-styling)** - A Termux add-on app to customize the terminal font and color theme. (FOSS)
- **[Termux:Tasker](https://github.com/termux/termux-tasker)** - Termux add-on app for integration with [Tasker](https://play.google.com/store/apps/details?id=net.dinglisch.android.taskerm). (FOSS)
- **[Termux:Widget](https://github.com/termux/termux-widget)** - Termux add-on app which adds shortcuts to commands on the home screen. (FOSS)


---

**Note**: Always be cautious when using root apps, as they have the potential to modify system files and settings.

---
You are visitor number:

![Visitor Count](https://profile-counter.glitch.me/fynks/count.svg)
