---
layout: doc
title: Android Rooting Resources & Tools
description: "Complete collection of Android rooting resources, tools, communities, guides, and expert materials for safe rooting, custom ROMs, and device customization."
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Android Rooting Resources - Complete Guide & Tools Collection
  - - meta
    - property: og:description
      content: Ultimate collection of Android rooting resources including tools, communities, guides, and expert materials for safe device customization and root access.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/resources.png
  - - meta
    - property: og:image:secure_url
      content: https://awesome-android-root.xyz/images/og/resources.png
  - - meta
    - property: og:image:alt
      content: Android Rooting Resources - Complete Guide & Tools Collection
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
      content: Android Rooting Resources - Complete Collection
  - - meta
    - name: twitter:description
      content: Everything you need for Android rooting - tools, communities, guides, and expert resources in one comprehensive collection.
  - - meta
    - name: twitter:image:alt
      content: Android Rooting Resources - Tools, Communities & Guides
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Resources
  - - meta
    - property: article:tag
      content: Android Rooting
  - - meta
    - property: article:tag
      content: Resources
  - - meta
    - property: article:tag
      content: Tools
  - - meta
    - name: robots
      content: index, follow, max-image-preview:large
---

# Android Rooting Resources Hub

> Reference for Android rooting, customization, and recovery. GitHub project descriptions and release information reviewed on **2026-11-24**.

Use upstream READMEs and release notes to check requirements before downloading. Recent commits do not prove device compatibility, and a GitHub repository is not a security audit. Prefer tagged releases over CI artifacts unless debugging with the maintainer.

---

## Quick Navigation

- [Getting Started](#getting-started)
- [Core Tooling](#core-tooling)
- [Firmware and Device Data](#firmware-and-device-data)
- [Module & App Repositories](#module-app-repositories)
- [Learning and Reference](#learning-and-reference)
- [Communities and Support](#communities-and-support)
- [Emergency and Recovery](#emergency-and-recovery)
- [Advanced Engineering](#advanced-engineering)
- [Official Project Links](#official-project-links)

---

## Getting Started

### Core checklist

| Step | Description | Resource |
|:-----|:------------|:---------|
| **1. Learn Basics** | Understand what root access means | [What is Root?](./rooting-guides/index.md#understanding-root-access) |
| **2. Safety Check** | Review risks and benefits | [Is Rooting Safe?](./faqs.md#is-rooting-safe) |
| **3. Device Guide** | Find your specific device | [Device Guides](./rooting-guides/index.md#device-specific-guides) |
| **4. Preparation** | Backup and unlock bootloader | [Bootloader Guide](./rooting-guides/how-to-unlock-bootloader.md) |

### Android version compatibility

Android version alone does not determine which root framework works. Check the exact firmware, CPU architecture, kernel branch/KMI, partition layout, and upstream installation requirements.

| Framework | Upstream requirements | What to verify |
|:----------|:----------------------|:---------------|
| **Magisk** | Check Android and platform requirements in [upstream releases](https://github.com/topjohnwu/Magisk/releases) | Ramdisk location and whether to patch `boot`, `init_boot`, `vendor_boot`, recovery, or Samsung AP firmware |
| **KernelSU** | Official GKI 2.0 support (kernel 5.10+); older 4.14+ kernels require manual builds | Kernel compatibility and supported LKM/GKI installation mode in the [installation guide](https://kernelsu.org/guide/installation.html) |
| **KernelSU Next** | Separate fork with its own kernel integration requirements | Exact kernel build, installation mode, and manager compatibility in [upstream documentation](https://github.com/KernelSU-Next/KernelSU-Next) |
| **APatch** | ARM64, kernels 3.18–6.12, required kernel configuration | `CONFIG_KALLSYMS` requirements and device restrictions in the [README](https://github.com/bmax121/APatch#supported-versions) |

Check the [Magisk release notes](https://github.com/topjohnwu/Magisk/releases) for changes relevant to your Android build and Zygisk. Support for an Android release does not imply support for every phone running it.

---

## Core Tooling

### Root solutions

| Solution | Purpose | Important limits | Source |
|:---------|:--------|:-----------------|:-------|
| **[Magisk](./rooting-guides/magisk-guide.md)** | Image-based root, systemless modules, built-in Zygisk | DenyList is not a guarantee of undetectable root | [GitHub](https://github.com/topjohnwu/Magisk) |
| **[KernelSU](./rooting-guides/kernelsu-guide.md)** | Kernel-based root with per-app profiles | Match the kernel; systemless mounting uses metamodules | [GitHub](https://github.com/tiann/KernelSU) |
| **[KernelSU Next](./rooting-guides/kernelsu-guide.md)** | Alternative kernel-based root implementation | Use this fork's own manager and compatibility instructions | [GitHub](https://github.com/KernelSU-Next/KernelSU-Next) |
| **[SukiSU Nova](./rooting-guides/kernelsu-guide.md)** | KernelSU fork with KPM support and built-in SUSFS controls | Developed independently of KernelSU; kernel support differs from upstream | [GitHub](https://github.com/SukiSU-Nova/SukiSU-Nova) |
| **[APatch](./rooting-guides/apatch-guide.md)** | Kernel patching, Android modules and kernel patch modules | ARM64 and kernel configuration requirements; protect the SuperKey | [GitHub](https://github.com/bmax121/APatch) |
| **[Vector](./rooting-guides/lsposed-guide.md)** | Xposed-compatible ART hooking, formerly JingMatrix's LSPosed fork | Requires a supported root and Zygisk environment; not a standalone root solution | [GitHub](https://github.com/JingMatrix/Vector) |

> [!WARNING]
> No root framework guarantees banking-app compatibility or invisibility. Exploit-based temporary root is firmware-specific and is not a general alternative to bootloader unlocking. Verify exploit claims independently before running an APK with kernel privileges.

### Zygisk implementations

| Tool | Purpose | Compatibility | Source |
|:-----|:--------|:--------------|:-------|
| **Magisk Built-in Zygisk** | Default Zygisk in Magisk | Magisk 24+ | Built into [Magisk](https://github.com/topjohnwu/Magisk) |
| **ZygiskNext** | Standalone Zygisk; closed source since v4-0.9.2 | Magisk, KernelSU, APatch | [GitHub](https://github.com/Dr-TSNG/ZygiskNext) |
| **ReZygisk** | Transparent, open-source Zygisk fork | Magisk, KernelSU, APatch | [GitHub](https://github.com/PerformanC/ReZygisk) |
| **NeoZygisk** | Open-source Zygisk based on ptrace injection | Magisk, KernelSU, APatch | [GitHub](https://github.com/JingMatrix/NeoZygisk) |

> [!TIP]
> Use one Zygisk implementation at a time. ZygiskNext and ReZygisk require Magisk's built-in Zygisk to be turned off.

### Non-root privilege tools

| Tool | Purpose | Root Required | Source |
|:-----|:--------|:--------------|:-------|
| **Shizuku** | Delegated ADB/system API access without full root | No | [GitHub](https://github.com/RikkaApps/Shizuku) |
| **Dhizuku** | Delegates DeviceOwner permissions after separate owner activation | No | [GitHub](https://github.com/iamr0s/Dhizuku) |
| **aShell You** | Modern ADB shell interface | No | [GitHub](https://github.com/DP-Hridayan/aShellYou) |

### Recovery and flashing tools

#### Custom recoveries

| Recovery | Features | Compatibility | Source |
|:---------|:---------|:--------------|:-------|
| **TWRP** | Custom recovery and backups | Supported devices only; decryption varies | [twrp.me](https://twrp.me/) |
| **OrangeFox** | Enhanced UI, built-in tools | Select devices | [orangefox.download](https://orangefox.download/) |
| **PitchBlack** | TWRP fork with extras | Select devices | [pitchblackrecovery.com](https://pitchblackrecovery.com/) |
| **AOSP Recovery Source** | Official base recovery | Reference | [AOSP](https://android.googlesource.com/platform/bootable/recovery/) |

#### Platform tools

| Tool | Purpose | Platform | Source |
|:-----|:--------|:---------|:-------|
| **ADB & Fastboot** | Core Android debug/flash tools | All | [Android SDK](https://developer.android.com/studio/releases/platform-tools) |
| **Android Flash Tool** | Web-based flashing (Pixel/AOSP) | Web | [flash.android.com](https://flash.android.com/) |
| **Heimdall** | Open-source Samsung flashing (maintained fork) | Linux; macOS and Windows untested by the maintainer | [SourceHut](https://git.sr.ht/~grimler/Heimdall) |
| **samloader** | Samsung firmware download, decryption and Download Mode flashing | Windows/macOS/Linux | [GitHub](https://github.com/topjohnwu/samloader-rs) |
| **Odin** | Samsung Download Mode flashing | Windows | Follow a trusted device guide; avoid repackaged binaries |
| **Mi Flash Tool** | Xiaomi fastboot flashing | Windows | Obtain via Xiaomi support/device documentation, not lookalike download sites |
| **MiUnlockTool** | Third-party Xiaomi bootloader unlock client that signs in with your Xiaomi account; same official process, no waiting-period bypass | All (Python) | [GitHub](https://github.com/MiForge/MiUnlockTool) |
| **SP Flash Tool** | MediaTek flashing with device-specific scatter/DA files | Windows/Linux | Use the device vendor's documented package |
| **MTK Client** | Open-source MediaTek bypass/flash | Python | [GitHub](https://github.com/bkerler/mtkclient) |
| **QFIL (Qualcomm)** | Qualcomm EDL mode flashing | Windows | Qualcomm package |
| **QDL** | Qualcomm's open-source EDL flasher; needs a matching flash loader | Windows/macOS/Linux | [GitHub](https://github.com/qualcomm/qdl) |
| **LineageOS Recovery** | Official LineageOS recovery builds | Device-specific | [LineageOS Wiki](https://wiki.lineageos.org/devices/) |
| **PixelFlasher** | Desktop firmware, boot-image patching and flashing workflow | Windows/macOS/Linux; check supported devices | [GitHub](https://github.com/badabing2005/PixelFlasher) |
| **scrcpy** | Display/control Android over USB or TCP/IP for diagnosis | Windows/macOS/Linux; Android 5+ | [GitHub](https://github.com/Genymobile/scrcpy) |
| **EDL** | Qualcomm Sahara/Firehose research and recovery tooling | Python; compatible loader/device required | [GitHub](https://github.com/bkerler/edl) |

> [!WARNING]
> Desktop GUIs do not remove flashing risks. EDL and MTK tools are not universal unbrick utilities: authentication, loaders, chipset support and firmware must match. Never erase calibration/security partitions or flash another device's EFS/persist backup.


### Firmware sources

| Brand | Official Source | Alternative | Notes |
|:------|:----------------|:------------|:------|
| **Google Pixel** | [Factory Images](https://developers.google.com/android/images) | [OTA Images](https://developers.google.com/android/ota) | Direct from Google |
| **Samsung** | Samsung update servers via [samloader](https://github.com/topjohnwu/samloader-rs) | [Bifrost](https://github.com/zacharee/Bifrost), [Frija](https://github.com/SlackingVeteran/frija) | Match model and CSC/region |
| **Xiaomi** | [MIUI/HyperOS ROM](https://c.mi.com/global/miuidownload/index) | [XM Firmware Updater](https://xmfirmwareupdater.com/) | Fastboot & Recovery |
| **OnePlus** | [OnePlus Support](https://service.oneplus.com/) | [OS Updater](https://github.com/oxygen-updater/os-updater) (formerly Oxygen Updater) | payload.bin format |
| **Nothing** | [Nothing Support](https://nothing.tech/support) | [Nothing Archive](https://github.com/spike0en/nothing_archive) | Match model and exact Nothing OS build |
| **Motorola** | [Software Fix](https://en-us.support.motorola.com/app/softwarefix) | [Lolinet Mirrors](https://mirrors.lolinet.com/firmware/lenomola/) | Verify region |
| **ASUS** | [ASUS Support](https://www.asus.com/support/) | Direct downloads | ROG & Zenfone |
| **Realme** | [Realme Support](https://www.realme.com/support/software-update) | [OS Updater](https://github.com/oxygen-updater/os-updater) | Match model and region |

### Module & App Repositories

| Repository | Type | Content | Link |
|:-----------|:-----|:--------|:-----|
| **MMRL** | Multi-repository module manager | Supports Magisk, KernelSU and APatch; inspect each module's source | [GitHub](https://github.com/MMRLApp/MMRL) |
| **Magisk Modules Alt Repo** | Magisk module repository | Community-submitted modules, browsable with MMRL | [GitHub](https://github.com/Magisk-Modules-Alt-Repo) |
| **LSPosed Modules** | Xposed modules | App modifications | [Repository](https://github.com/Xposed-Modules-Repo) |
| **Apps & Modules Index** | Curated collection | 800+ apps and modules | [Collection](./apps-and-modules/index.md) |
| **IzzyOnDroid** | F-Droid repo | FOSS apps | [IzzyOnDroid](https://apt.izzysoft.de/fdroid/) |
| **KernelSU Module Repo** | KernelSU modules | Official module repository | [modules.kernelsu.org](https://modules.kernelsu.org/) |


### Extraction and utility tools

| Tool | Purpose |Source |
|:-----|:--------|:-------|
| **Payload-Dumper-Android** | Extract partitions from OTA.zip or payload.bin on Android without a PC | [GitHub](https://github.com/rajmani7584/Payload-Dumper-Android) |
| **payload-dumper-go** | Extract payload.bin | [GitHub](https://github.com/ssut/payload-dumper-go) |
| **payload-dumper-rust** | Android OTA payload dumper | [GitHub](https://github.com/rhythmcache/payload-dumper-rust) |
| **AnyKernel3** | Kernel packaging/flashing framework | [GitHub](https://github.com/osm0sis/AnyKernel3) |
| **magiskboot** | Magisk's tool for unpacking, patching and repacking boot images | [Docs](https://topjohnwu.github.io/Magisk/tools.html) |
| **Android_boot_image_editor** | Unpack and repack boot, init_boot, vendor_boot, recovery and vbmeta images on a PC; not a substitute for framework-specific patching | [GitHub](https://github.com/cfig/Android_boot_image_editor) |
| **Universal Android Debloater Next Generation** | ADB-based package management with community package descriptions; no root needed | [GitHub](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation) |
| **Neo Backup** | Root-based app and app-data backup/restore; test restores and copy backups off-device | [GitHub](https://github.com/NeoApplications/Neo-Backup) |
| **SD Maid SE** | Storage analysis and cleanup with optional root/ADB access | [GitHub](https://github.com/d4rken-org/sdmaid-se) |
| **Pixel Prop Builder** | Auto-updated archive of the full Pixel build.prop (every partition, with ro.boot.vbmeta.digest) from Google's factory and OTA images, indexed in index.json; can also build one locally | [GitHub](https://github.com/VictorGabriel7Dev/build.prop) |

Prefer full OTA payloads when extracting standalone images; incremental updates may require the original partition data. Back up before debloating, keep a record of package changes, and do not disable core system components in bulk.



---

### GKI kernel builds with root support

Community kernels are not manufacturer firmware. Verify Android kernel branch, KMI, security patch and device support; a matching major kernel number alone is insufficient. Keep the original boot image and a tested recovery path.

| Project | Features | Source |
|:--------|:---------|:-------|
| **WildKernels GKI** | Community GKI kernel builds with KernelSU and SUSFS; check each release's KMI and manager requirements | [GitHub](https://github.com/WildKernels/GKI_KernelSU_SUSFS) |
| **WildKernels OnePlus** | KSU + SUSFS builds for OnePlus GKI devices | [GitHub](https://github.com/WildKernels/OnePlus_KernelSU_SUSFS) |
| **WildKernels Pixel** | KernelSU and SUSFS kernels for specific Pixel devices, built from Sultan sources | [GitHub](https://github.com/WildKernels/Sultan_KernelSU_SUSFS) |
| **WildKernels Samsung** | KernelSU and SUSFS kernels built from Samsung sources | [GitHub](https://github.com/WildKernels/Samsung_KernelSU_SUSFS) |
| **SUSFS (susfs4ksu)** | Upstream SUSFS kernel patches and userspace module; current code lives in the per-kernel branches | [GitLab](https://gitlab.com/simonpunk/susfs4ksu) |

---

## Learning and Reference

### Comprehensive guides

| Guide Category | Description | Link |
|:---------------|:------------|:-----|
| **Master Rooting Guide** | Complete rooting workflow | [Index](./rooting-guides/index.md) |
| **Device-Specific Guides** | Brand-specific procedures | [Device Guides](./rooting-guides/index.md#device-specific-guides) |
| **Method Comparisons** | Choose the right root method | [Comparison](./rooting-guides/root-framework-comparison.md) |
| **SUSFS Root Hiding** | Kernel-level hiding: requirements, installation, verification | [SUSFS Guide](./rooting-guides/susfs-guide.md) |
| **Debloating** | Remove unwanted apps safely | [Debloat Guide](./general-guides/android-apps-debloating.md) |
| **Ad Blocking** | System-wide ad removal | [AdBlock Guide](./general-guides/android-adblocking.md) |
| **Custom Recovery Basics** | Flashing and backup workflow | [How to Install Custom Recovery](./rooting-guides/how-to-install-custom-recovery.md) |
| **Temporary Root (No Unlock)** | DirtyFrag and GhostLock temporary root with a locked bootloader | [Root Without Unlocking the Bootloader](./rooting-guides/root-without-unlocking-bootloader.md) |
| **Bootloader Mods & Temp Root** | Kaeru, Fenrir, and locked-bootloader approaches | [Temporary Root Solutions](./rooting-guides/temporary-root-solutions.md) |

### Upstream documentation

Project documentation is the reference for installation steps and requirements. Check it before following a third-party tutorial.

| Project | Covers | Link |
|:--------|:-------|:-----|
| **Magisk** | Installation, OTA upgrades, FAQ, module developer guides and tool reference | [topjohnwu.github.io/Magisk](https://topjohnwu.github.io/Magisk/) |
| **KernelSU** | Installation, App Profile, modules and metamodules, non-GKI integration | [kernelsu.org](https://kernelsu.org/) |
| **KernelSU Next** | Installation for GKI and non-GKI kernels | [kernelsu-next.github.io](https://kernelsu-next.github.io/webpage/) |
| **APatch** | Installation, APM and KPM guides, FAQ | [apatch.dev](https://apatch.dev/) |
| **SukiSU Nova** | Installation, App Profile and kernel integration | [sukisu.org](https://sukisu.org/) |
| **libxposed API** | Reference for the modern Xposed module API | [libxposed.github.io/api](https://libxposed.github.io/api/) |
| **KernelSU Developer Portal** | Publishing modules to the official KernelSU module repository | [developers.kernelsu.org](https://developers.kernelsu.org/) |

---

## Communities and Support

### Primary communities

| Platform | Focus | Best For | Link |
|:---------|:------|:---------|:-----|
| **XDA Forums** | Development hub | ROMs, kernels, mods | [Forum](https://xdaforums.com/) |
| **r/androidroot** | General rooting | Support questions, methods, news | [Reddit](https://www.reddit.com/r/androidroot/) |
| **X/Twitter** | General rooting | Quick help, discussions | [X](https://x.com/awsm_and_root) |
| **r/Magisk** | Magisk specific | Modules, troubleshooting | [Reddit](https://reddit.com/r/Magisk) |
| **r/LineageOS** | Custom ROMs | ROM support | [Reddit](https://reddit.com/r/LineageOS) |
| **KernelSU Telegram** | Official KernelSU channel | Announcements and discussion | [Telegram](https://t.me/KernelSU) |
| **APatch Telegram** | Official APatch channels | Updates and discussion | [Channel](https://t.me/APatchChannel), [Group](https://t.me/Apatch_discuss) |
| **ReZygisk Telegram** | ReZygisk support | Module updates & discussion | [Telegram](https://t.me/rezygisk) |


### Developer communities

| Community | Focus | Platform |
|:----------|:------|:---------|
| **Android Developers** | Official documentation | [developer.android.com](https://developer.android.com/) |
| **AOSP** | Android Open Source | [source.android.com](https://source.android.com/) |
| **KernelSU Discussions** | KernelSU questions and development | [GitHub](https://github.com/tiann/KernelSU/discussions) |
| **APatch Discussions** | APatch questions and development | [GitHub](https://github.com/bmax121/APatch/discussions) |
| **Vector Discussions** | Xposed framework and module development | [GitHub](https://github.com/JingMatrix/Vector/discussions) |

---

## Firmware and Device Data

### Manufacturer unlock policies

Unlock eligibility depends on the exact model, carrier, region, account and firmware. The OEM unlocking toggle alone does not confirm eligibility. Unlocking normally wipes user data; relocking is not a general recovery step.

| Brand | What to check | Guide |
|:------|:--------------|:------|
| **Google Pixel** | Carrier restrictions, OEM unlocking availability, current factory-image warnings | [Guide](./rooting-guides/how-to-root-pixel-phone.md) |
| **OnePlus** | Model/region, current unlock process and recovery-tool availability | [Guide](./rooting-guides/how-to-root-oneplus-phone.md) |
| **Xiaomi** | HyperOS account/region eligibility, application limits and actual Mi Unlock wait message | [Guide](./rooting-guides/how-to-root-xiaomi-phone.md) |
| **Samsung** | Download Mode OEM Lock/KnoxGuard state; installing Magisk trips the irreversible Knox Warranty Bit | [Guide](./rooting-guides/how-to-root-samsung-phone.md) |
| **Nothing** | Exact model, OEM unlock availability and matching firmware | [Guide](./rooting-guides/how-to-root-nothing-phone.md) |
| **Motorola** | Eligibility through the manufacturer's unlock portal; carrier variants differ | [Guide](./rooting-guides/how-to-root-motorola-phone.md) |

For other brands, confirm the manufacturer's current policy for your model before buying tools or requesting codes. Do not assume an old ASUS/Realme/Huawei/OPPO tutorial still works. Warranty coverage and statutory consumer rights depend on local law and the cause of the fault, not just unlock status.

The community-maintained [Bootloader Unlock Wall of Shame](https://github.com/zenfyrdev/bootloader-unlock-wall-of-shame) tracks how each manufacturer handles unlocking. Check it before buying a device.

### Popular custom ROMs

| ROM | Base | Focus | Root Support | Website |
|:----|:-----|:------|:-------------|:--------|
| **LineageOS** | AOSP | Stability, privacy, broad device support | Optional (add-on) | [lineageos.org](https://lineageos.org/) |
| **GrapheneOS** | AOSP | Hardened security | Discouraged | [grapheneos.org](https://grapheneos.org/) |
| **CalyxOS** | AOSP | Privacy with usability | Optional | [calyxos.org](https://calyxos.org/) |
| **/e/OS (Murena)** | LineageOS | De-Googled, microG built-in | Optional | [e.foundation](https://e.foundation/) |
| **crDroid** | LineageOS | Heavy customization | Check device build | [crdroid.net](https://crdroid.net/) |
| **Evolution X** | LineageOS | Pixel features + customization | Check device build | [evolution-x.org](https://evolution-x.org/) |
| **Paranoid Android** | AOSP | Unique UX features | Optional | [paranoidandroid.co](https://paranoidandroid.co/) |
| **PixelOS** | AOSP | Pixel experience on non-Pixels | Check device build | [pixelos.net](https://pixelos.net/) |

> [!NOTE]
> Root is separate from installing a custom ROM. Check the exact device build and maintainer instructions. Do not assume a ROM bundles root, integrity spoofing or attestation keys; third-party key material can be revoked and creates trust and privacy risks.

---

## Emergency and Recovery

### Common issues and solutions

| Issue | Symptoms | Solution | Guide |
|:------|:---------|:---------|:------|
| **Bootloop** | Stuck at logo | Disable the last module first | [Fix Guide](./troubleshooting.md#device-won-t-boot-bootloop) |
| **Soft Brick** | System errors | Custom recovery restore | [Recovery Guide](./troubleshooting.md#bricked-device-recovery) |
| **Hard Brick** | No response | EDL/Download mode | Device forums |
| **IMEI Loss** | No network | Backup restoration | See device forums |
| **Play Integrity/app rejection** | App detection | Diagnose app policy and device state | [Hiding Guide](./troubleshooting.md#play-integrity-and-banking-apps) |

### Upstream rescue guides

| Framework | Covers | Link |
|:----------|:-------|:-----|
| **Magisk** | Automatic bootloop protection, Safe Mode and `magisk --remove-modules` | [FAQ](https://topjohnwu.github.io/Magisk/faq.html) |
| **KernelSU** | Restoring the stock boot image, Safe Mode and `ksud` module management | [Rescue from bootloop](https://kernelsu.org/guide/rescue-from-bootloop.html) |
| **APatch** | Built-in Safe Mode that disables all modules | [Rescue from bootloop](https://apatch.dev/rescue-bootloop.html) |

### Emergency tools by chipset

| Chipset | Tool | Mode | Purpose |
|:--------|:-----|:-----|:--------|
| **Qualcomm** | QFIL, QDL or EDL | EDL (9008) | Deep flash recovery |
| **MediaTek** | SP Flash Tool | Download Mode | Full flash recovery |
| **Samsung Exynos** | Odin, Heimdall or samloader | Download Mode | Firmware restoration |
| **Kirin (Huawei)** | HiSuite | Fastboot | Limited recovery |

### Critical backups

Recovery backups may omit internal storage and may not decrypt modern Android data. Keep photos, authentication recovery codes and tested app backups off the phone; a factory reset is not an unroot procedure.

| Backup Type | When | Tool | Restore Method |
|:------------|:-----|:-----|:---------------|
| **EFS/IMEI** | Before partition modifications, where supported | Device-specific documented method | Same device only; never share identifiers |
| **Boot Image** | Before patching | Stock firmware | Fastboot flash |
| **Full Nandroid** | Before major mods | TWRP | TWRP restore |
| **Persist Partition** | Before modifications, if a device guide requires it | Device-specific backup | Never restore from another device |

---

## Advanced Engineering

### Development and debugging

| Resource | Purpose | Link |
|:---------|:--------|:-----|
| **Android Debug Bridge** | Command reference | [ADB Docs](https://developer.android.com/studio/command-line/adb) |
| **Fastboot Commands** | Bootloader operations | [Flash with Fastboot](https://source.android.com/docs/setup/test/running) |
| **Kernel Building** | Custom kernel development | [Kernel Guide](https://source.android.com/docs/setup/build/building-kernels) |
| **SELinux Policies** | Security configuration | [SELinux Docs](https://source.android.com/docs/security/features/selinux) |
| **Android Security Bulletin** | Security updates | [Security Updates](https://source.android.com/docs/security/bulletin) |
| **Android Verified Boot** | Chain of trust explained | [AVB Documentation](https://source.android.com/docs/security/features/verifiedboot) |
| **Dynamic Partitions** | Flexible partitioning | [Dynamic Partitions](https://source.android.com/docs/core/ota/dynamic_partitions) |
| **Generic Kernel Image** | GKI architecture | [GKI Docs](https://source.android.com/docs/core/architecture/kernel/generic-kernel-image) |
| **Bootloader Lock and Unlock** | `fastboot flashing unlock`, lock state and OEM unlocking | [Bootloader Docs](https://source.android.com/docs/core/architecture/bootloader/locking_unlocking) |
| **Generic Boot Partition** | Boot image and generic ramdisk layout by Android release | [Boot Partition Docs](https://source.android.com/docs/core/architecture/partitions/generic-boot) |

### Security and compliance references

| Topic | Coverage | Link |
|:------|:---------|:-----|
| **Play Integrity API** | Official guidance on root detection | [Developer Docs](https://developer.android.com/google/play/integrity) |
| **A/B System Updates** | Seamless update flow | [A/B System](https://source.android.com/docs/core/ota/ab) |
| **Project Treble** | HAL abstraction layers | [Treble Docs](https://source.android.com/docs/core/architecture) |
| **Mainline Modules** | Modular update delivery | [Mainline](https://source.android.com/docs/core/architecture/modular-system) |
| **Key and ID Attestation** | Hardware-backed key and device ID attestation | [Attestation Docs](https://source.android.com/docs/security/features/keystore/attestation) |

### Kernel sources

Vendor kernel source is needed to build KernelSU into a non-GKI kernel. Use the branch or package that matches the device and installed build.

| Vendor | Content | Source |
|:-------|:--------|:-------|
| **Google** | Android Common Kernel, the base of GKI builds | [AOSP](https://android.googlesource.com/kernel/common/) |
| **Xiaomi** | Kernel source with one branch per device and Android release | [GitHub](https://github.com/MiCode/Xiaomi_Kernel_OpenSource) |
| **OnePlus** | Kernel, module and device-tree repositories per SoC platform | [GitHub](https://github.com/OnePlusOSS) |
| **Motorola** | Kernel for MSM-based Motorola devices | [GitHub](https://github.com/MotorolaMobilityLLC/kernel-msm) |
| **Nothing** | Kernel and module repositories per platform | [GitHub](https://github.com/NothingOSS) |
| **Samsung** | Source packages per model and firmware version, searchable in the Release Center | [Samsung Open Source](https://opensource.samsung.com/uploadList?menuItem=mobile) |

---

## Official Project Links

### Project resources

| Resource | Description | URL |
|:---------|:------------|:----|
| **Official Website** | Main hub | [awesome-android-root.xyz](https://awesome-android-root.xyz) |
| **GitHub Repository** | Source code | [GitHub](https://github.com/awesome-android-root/awesome-android-root) |
| **Issue Tracker** | Bug reports | [Issues](https://github.com/awesome-android-root/awesome-android-root/issues) |
| **Discussions** | Community Q&A | [Discussions](https://github.com/awesome-android-root/awesome-android-root/discussions) |
| **Contributing** | How to help | [Contributing](./contributing.md) |
| **Twitter/X** | Updates | [@awsm_and_root](https://x.com/awsm_and_root) |

### Quick reference

| Need | Primary Resource | Backup Resource |
|:-----|:----------------|:----------------|
| **Emergency Help** | [Troubleshooting](./troubleshooting.md#emergency-recovery) | [XDA Device Forums](https://xdaforums.com/) |
| **Root Apps** | [App Collection](./apps-and-modules/index.md) | [F-Droid](https://f-droid.org/) |
| **Module Discovery** | [MMRL](https://github.com/MMRLApp/MMRL) | [Magisk Modules Alt Repo](https://github.com/Magisk-Modules-Alt-Repo) |
| **Firmware** | Manufacturer site | [Firmware databases](#firmware-sources) |

---

## Legal & Safety Notice

> **Important:** Rooting your device:
> - May void your warranty
> - Could brick your device if done incorrectly
> - Might expose security vulnerabilities
> - Can trigger anti-tampering mechanisms
> 
> **Always:**
> - Back up your data before rooting
> - Use official firmware sources
> - Follow guides carefully
> - Understand the risks involved

---

## Contributing

This is a community-driven project. Contributions are welcome!

- **Report Issues:** [Issue Tracker](https://github.com/awesome-android-root/awesome-android-root/issues)
- **Submit Updates:** [Pull Requests](https://github.com/awesome-android-root/awesome-android-root/pulls)
- **Join Discussion:** [Community Forum](https://github.com/awesome-android-root/awesome-android-root/discussions)
- **Guidelines:** [Contributing Guide](./contributing.md)

---

<div align="center">

**Maintained by:** [Awesome Android Root Community](https://github.com/awesome-android-root/awesome-android-root)

[Home](https://awesome-android-root.xyz) | [Root Apps](./apps-and-modules/index.md) | [Guides](./rooting-guides/index.md) | [FAQ](./faqs.md)

</div>
