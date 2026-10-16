---
layout: doc
title: Non-Root Alternatives Guide
description: "Replace root-only functions without rooting using ADB, Shizuku, wireless debugging, work profiles, and current no-root apps for debloating, ads, backups."
head:
  - - meta
    - property: og:title
      content: Non-Root Alternatives - Customize Android Without Root 2026
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/non-root-alternatives.png
  - - meta
    - property: og:image:secure_url
      content: https://awesome-android-root.xyz/images/og/non-root-alternatives.png
  - - meta
    - property: og:image:alt
      content: Non-Root Alternatives - ADB, Shizuku and More
  - - meta
    - property: og:image:width
      content: '1200'
  - - meta
    - property: og:image:height
      content: '630'
  - - meta
    - property: og:image:type
      content: image/png
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: Non-Root Alternatives - Customize Android Without Root 2026
  - - meta
    - name: twitter:description
      content: "Replace root-only functions without root using ADB, Shizuku, wireless debugging, work profiles, and current no-root apps."
  - - meta
    - name: twitter:image:alt
      content: Non-Root Alternatives - ADB, Shizuku & More
  - - meta
    - name: robots
      content: index, follow
---

# Non-Root Alternatives

Rooting is not always possible or worth the tradeoffs. Locked bootloaders, warranty terms, banking apps, work profiles, and Play Integrity checks all argue against it. Current Android versions expose many system functions without root, and actively maintained tools cover the most common root use cases: debloating, ad blocking, app control, automation, and backups.

Staying unrooted also keeps Play Integrity in its strongest state, which banking, payment, and tap-to-pay apps rely on.

## Quick Assessment

**Common reasons to stay non-root:**

- Locked bootloader (US Samsung, carrier devices)
- Warranty concerns
- Banking and payment apps
- Work devices with MDM
- Security concerns

## Foundation Technologies

### 1. ADB (Android Debug Bridge)

**What:** Direct device control from a computer over USB or Wi-Fi.

**Setup:**

1. Install [Platform Tools](https://developer.android.com/studio/releases/platform-tools)
2. Enable Developer Options (tap Build Number 7 times)
3. Enable USB Debugging
4. Connect the device and authorize the computer

**Pros:**

- Full app control
- System settings access
- No permanent modifications

**Cons:**

- Requires a PC for initial setup
- Command line knowledge needed
- Limited to user-space access

### 2. Wireless Debugging (Android 11+)

**What:** Cable-free ADB access.

**Setup:**

1. Developer Options → Wireless Debugging
2. Pair with a QR code or pairing code: `adb pair [IP]:[PORT]`
3. Connect: `adb connect [IP]:[PORT]`

**Pros:**

- No cable needed
- Starts Shizuku without a PC
- Pairing persists across reboots

**Cons:**

- Android 11+ only
- Same Wi-Fi network required
- Re-pairing may be needed after network changes

### 3. Shizuku

**What:** A privileged process started with ADB or wireless debugging. Apps granted the Shizuku permission can call system APIs through it, with ADB-level privileges and no root.

**Setup:**

1. Install Shizuku from the [GitHub release](https://github.com/RikkaApps/Shizuku) (most current) or Google Play
2. Android 11+: enable Wireless Debugging and start Shizuku from the app
3. Android 7-10: run the ADB start command shown in the app from a PC
4. Android 13+: enable auto-start on a trusted WLAN so the service restarts after reboot (current releases)

**Pros:**

- Works wirelessly after setup
- Powers many root-like apps
- Supports current Android releases

**Cons:**

- Initial setup required
- Stops after a reboot unless auto-start applies
- User-level access, not root
- Not all apps support it

**Note:** Several Shizuku versions now exist. The official RikkaApps app is the default choice, but its releases are infrequent and wireless debugging changes on recent Android versions can break it. Community forks add boot auto-start, watchdog restarts, and compatibility fixes. See the [Shizuku forks list](apps-and-modules/development#shizuku-forks) for all maintained options. Most forks keep the same API, so Shizuku-compatible apps work with them unchanged.

### 4. Dhizuku

**What:** A device-owner alternative to Shizuku by the Hail developer. It survives reboots without root and without wireless debugging.

**Catch:** Android only allows a device owner on a device with no accounts, so it suits freshly provisioned devices. Activation uses ADB once (`dpm set-device-owner`). Supported by Hail and a small set of apps.

[GitHub](https://github.com/iamr0s/Dhizuku)

## Solutions by Need

### Debloating

#### Universal Android Debloater Next Generation

Cross-platform GUI (Windows, macOS, Linux) written in Rust that uses ADB to debloat non-rooted devices. Maintains curated package lists with safety ratings and supports reversible disable and per-user uninstall.

[GitHub](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation)

**Pros:**

- Pre-configured safe lists
- Batch operations
- Reversible changes

**Cons:**

- Requires a PC
- Can break features if used carelessly

#### Canta

On-device debloater that uses Shizuku and the same Universal Debloat List as UAD-ng, so no PC is needed. Requires Android 9+.

[GitHub](https://github.com/samolego/Canta) | [F-Droid](https://f-droid.org/packages/io.github.samolego.canta/)

**Note:** On Android 16+, use a maintained [Shizuku fork](apps-and-modules/development#shizuku-forks) if the official app fails to start Canta.

#### App Manager

Full package manager with Shizuku support: disable or uninstall system apps, block components, and manage permissions.

[GitHub](https://github.com/MuntashirAkon/AppManager)

**Quick ADB alternative:**

```bash
# Disable an app (reversible)
adb shell pm disable-user --user 0 com.package.name

# Re-enable if needed
adb shell pm enable com.package.name
```

**Safety:** Always disable before uninstalling. Disabling critical apps can break the device, so change one app at a time.

### Ad Blocking

#### Method 1: Private DNS (simplest)

**Setup:** Settings → Network & internet → Private DNS → `dns.adguard.com` (or any DoT provider)

**Pros:**

- Zero setup
- System-wide
- No battery impact
- Does not use the VPN slot

**Cons:**

- Cannot block all ads
- No fine control
- Easily bypassed by apps with hardcoded DNS

#### Method 2: RethinkDNS

Local DNS filter (DoH, DoT, DNSCrypt), per-app firewall, and WireGuard proxifier in one FOSS app, with custom blocklists and per-app rules.

[GitHub](https://github.com/celzero/rethink-app) | [F-Droid](https://f-droid.org/packages/com.celzero.bravedns/)

#### Method 3: PersonalDNSFilter

Lightweight local DNS-based blocker using host lists. Filtering runs fully on the device with no data sent anywhere.

[GitHub](https://github.com/IngoZenz/personaldnsfilter) | [F-Droid](https://f-droid.org/en/packages/dnsfilter.android/)

#### Method 4: AdGuard for Android

Commercial app with local VPN filtering, custom filters, and per-app rules. Requires Android 9+.

[GitHub](https://github.com/AdguardTeam/AdguardForAndroid)

#### Method 5: Browser-based

Firefox for Android supports the full uBlock Origin extension, which gives desktop-level blocking with custom filters.

- [Firefox for Android](https://www.mozilla.org/en-US/firefox/android/)
- [uBlock Origin on AMO](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/)

#### Method 6: Patched apps (ReVanced, Morphe)

ReVanced patches YouTube and other apps to remove ads and add features. Non-root builds need [GmsCore](https://github.com/ReVanced/GmsCore) for Google sign-in. [Morphe](https://morphe.software) is a newer patcher from former ReVanced Extended contributors with its own MicroG-RE fork.

**Limits to accept:**

- VPN-based methods occupy the single VPN slot and cannot run alongside another VPN
- First-party ads (for example YouTube in-app ads) need app-specific patches
- System-wide hosts-file blocking still requires root

### Firewall and Network Control

#### RethinkDNS

Per-app firewall with connection logging, DNS filtering, and optional WireGuard tunnels.

#### NetGuard

Per-app internet blocking on Wi-Fi and mobile data with traffic logging. Free, no root required.

[GitHub](https://github.com/M66B/NetGuard)

#### TrackerControl

Monitors and blocks trackers per app using the Disconnect list, DuckDuckGo Tracker Radar, and an in-house list built from analyzing about two million apps. Can also detect tracker libraries inside app code.

[GitHub](https://github.com/TrackerControl/tracker-control-android) | [F-Droid](https://f-droid.org/packages/net.kollnig.missioncontrol.fdroid/)

**Note:** All three use the local VPN API, so only one can run at a time, and fully blocking system apps remains limited without root.

### App Management and Freezing

#### App Manager with Shizuku

- Component blocking (activities, services, receivers)
- Permission and App Ops management
- Batch operations
- APK extraction and ADB backup support (v4.1+)

Free with an optional premium tier.

#### Hail

Freezes apps by disabling, hiding, or suspending them, which cuts background activity and saves battery. Works with Shizuku, Dhizuku, device owner, or root.

[GitHub](https://github.com/aistra0528/Hail) | [F-Droid](https://f-droid.org/packages/com.aistra.hail/)

**Built-in options:** Settings → Apps can disable user apps, and Android 11+ auto-revokes permissions for apps not used in months.

### App Isolation and Cloning

Android work profiles run a second, isolated profile on the same device. Apps installed there cannot read main-profile contacts, files, or accounts, and can be frozen when not in use.

- **[Shelter](https://github.com/PeterCxy/Shelter)** - FOSS work profile manager. In maintenance mode, still adapted to new Android versions. [F-Droid](https://f-droid.org/packages/net.typeblog.shelter/)
- **[Insular](https://f-droid.org/en/packages/com.oasisfeng.island.fdroid/)** - F-Droid build of Island
- **[Island](https://github.com/oasisfeng/island)** - Original work profile sandbox app

**Caveats:** isolated apps cannot access main-profile data, and banking or device-admin apps may refuse to run inside a work profile. Some OEMs also offer native dual-app cloning.

### App Patching and Modding

#### LSPatch

Rootless Xposed framework that patches an APK to embed the Vector runtime, so modules run inside the patched app without root or Zygisk. Supports modern libxposed modules and legacy Xposed modules.

The original LSPosed/LSPatch repo was archived in December 2023. Use the maintained [JingMatrix/LSPatch](https://github.com/JingMatrix/LSPatch) fork.

#### ReVanced Manager

Patches YouTube, YouTube Music, and other apps with community patches (ad removal, SponsorBlock, and more). Non-root installs need GmsCore for Google account sign-in.

[Manager](https://github.com/ReVanced/revanced-manager) | [Download](https://revanced.app/download)

**Caveats:** patched apps must be re-patched after each update, carry a different signature from store builds, and some apps detect patched copies.

### Automation

#### Tasker (power users)

The most capable automation app with about 250 actions, a large plugin ecosystem, and intent handling. Paid, with a steep learning curve.

[Website](https://tasker.joaoapps.com/)

#### MacroDroid (beginners)

Wizard-based automation with about 80 triggers and 150 actions. Free tier allows five macros; a one-time purchase unlocks unlimited.

[Website](https://www.macrodroid.com/)

#### Automate

Flowchart-based automation from LlamaLab with about 180 actions. Free tier with ads; one-time premium purchase.

[GitHub](https://github.com/llamaLAB/Automate)

All three run without root. Root actions are optional add-ons, and deep system changes still require root.

### Backup

#### Built-in and Google One

Android's system backup covers apps, settings, SMS, and call history on many devices (varies by OEM and Android version).

#### SMS Backup & Restore

Backs up SMS, MMS, and call logs to local storage or cloud drives (Google Drive, Dropbox, OneDrive) with scheduled backups. Free, actively maintained.

[Website](https://www.synctech.com.au/sms-backup-restore/)

#### Swift Backup

Backs up APKs, SMS, and call logs without root. Full app-data backup still requires root. Wi-Fi backup and restore with Shizuku works on Android 11+, and v5.1.0 adds Android 17 support.

[Website](https://swiftapps.org/)

#### App Manager

Extracts APKs from installed apps for archival or sideloading.

**Limit:** `adb backup` is deprecated and heavily restricted since Android 12, so there is no full no-root app-data backup.

### Privacy and Permissions

- **Built-in controls:** one-time permissions and auto-revoke for unused apps (Android 11+), photo picker (Android 14+), per-app permission settings
- **App Manager + Shizuku:** App Ops and permission control beyond the stock UI
- **TrackerControl:** identifies which trackers and companies each app contacts, with per-tracker blocking

### Utilities

- **[Termux](https://github.com/termux/termux-app)** - Terminal emulator with a package ecosystem and SSH server. Install from [F-Droid](https://f-droid.org/en/packages/com.termux/); the Play Store build is deprecated. Termux:API adds device APIs.
- **[scrcpy](https://github.com/Genymobile/scrcpy)** - Mirrors and controls the device from a PC over USB or Wi-Fi with low latency. Nothing is installed on the phone.

### App Stores and Updates

- **[F-Droid](https://f-droid.org/)** - FOSS app repository
- **[Neo Store](https://github.com/NeoApplications/Neo-Store)** - Modern F-Droid client
- **[Aurora Store](https://github.com/AuroraOSS/AuroraStore)** - Unofficial Play Store client with anonymous account support. The shared anonymous account pool can be unavailable, so be ready to log in with a personal Google account as a fallback.
- **[Obtainium](https://github.com/ImranR98/Obtainium)** - Automatically updates sideloaded apps from GitHub releases, websites, and other sources

### Customization

- **[Lawnchair](https://github.com/LawnchairLauncher/lawnchair)** - Pixel-style launcher with icon packs, icon shaping, and Material You theming
- **[HeliBoard](https://github.com/HeliBorg/HeliBoard)** and **[FlorisBoard](https://github.com/florisboard/florisboard)** - Open-source keyboards
- **[Material Files](https://github.com/zhanghai/MaterialFiles)** - File manager with archive, SMB, and SFTP support
- KWGT and KLWP widgets (paid)
- Android 14+ supports system-wide icon packs and fonts via Settings on supported devices

**Limit:** System-wide overlay theming and boot animations still require root.

## Non-Root Toolkit

1. **Shizuku** - Foundation for ADB-level privileges without a PC
2. **App Manager** - Complete app control
3. **UAD-ng or Canta** - Debloating
4. **RethinkDNS** - DNS ad blocking and firewall
5. **Hail** - Freezing background apps
6. **Shelter or Insular** - App isolation
7. **MacroDroid or Tasker** - Automation
8. **SMS Backup & Restore** - Message backups

## Key ADB Commands

```bash
# Disable an app (reversible)
adb shell pm disable-user --user 0 [package]

# Re-enable a disabled app
adb shell pm enable [package]

# Uninstall for the current user (system apps return after factory reset)
adb shell pm uninstall --user 0 [package]

# Restore a system app uninstalled for the current user
adb shell cmd package install-existing [package]

# Grant a runtime permission
adb shell pm grant [package] [permission]

# Force stop
adb shell am force-stop [package]

# Restrict background activity
adb shell cmd appops set [package] RUN_ANY_IN_BACKGROUND ignore
```

## Limitations

**Still requires root:**

- Magisk, KernelSU, or APatch modules
- System partition or boot image modification
- System-wide LSPosed/Xposed modules (LSPatch only patches individual apps)
- Custom kernels and CPU tuning
- System-wide hosts-file ad blocking
- Full app-data backup
- Deep battery hibernation and kernel-level controls

## Decision Guide

### Stay Non-Root If:

- Banking or payment apps are essential
- Work device or MDM present
- Warranty matters
- Play Integrity must stay untouched
- You are not comfortable with the risk

### Consider Root If:

- You need systemless mods
- You want system-wide LSPosed modules
- You require kernel control
- You need system-wide hosts-file ad blocking
- Full app-data backup is essential

## Quick Start Guide

1. Enable Developer Options (tap Build Number 7 times)
2. Install Platform Tools on your PC
3. Enable USB Debugging and Wireless Debugging
4. Install Shizuku and start it (wireless debugging on Android 11+, trusted-WLAN auto-start on Android 13+)
5. Install App Manager and grant it Shizuku access
6. Set Private DNS for ad blocking (for example `dns.adguard.com`)
7. Debloat carefully with UAD-ng or Canta

## Pro Tips

- Combine methods for better coverage (Private DNS plus browser blocking)
- Always disable apps before uninstalling them
- Keep Platform Tools handy for emergencies
- Document changes so they can be reversed
- Test one change at a time
- Back up before major changes

## Resources

- [Platform Tools](https://developer.android.com/studio/releases/platform-tools)
- [ADB Command Reference](https://developer.android.com/studio/command-line/adb)
- [Shizuku Documentation](https://shizuku.rikka.app/)
- [UAD-ng Wiki](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation/wiki)
