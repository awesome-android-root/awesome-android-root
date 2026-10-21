---
layout: doc
title: Android Rooting Resources 2026
description: "Complete collection of Android rooting resources, tools, communities, guides, and expert materials for safe rooting, custom ROMs, and device customization."
head:
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: og:title
      content: Android Rooting Resources 2026 - Complete Guide & Tools Collection
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
      content: Android Rooting Resources 2026 - Complete Collection
  - - meta
    - name: twitter:description
      content: Everything you need for Android rooting - tools, communities, guides, and expert resources in one comprehensive collection.
  - - meta
    - name: twitter:image:alt
      content: Android Rooting Resources 2026 - Tools, Communities & Guides
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

# Android Rooting Resources Hub 2026

> Reference for Android rooting, customization, and recovery. GitHub project descriptions and release information reviewed on **2026-10-16**.

Use upstream READMEs and release notes to check requirements before downloading. Recent commits do not prove device compatibility, and a GitHub repository is not a security audit. Prefer tagged releases over CI artifacts unless debugging with the maintainer.

---

## Quick Navigation

- [Getting Started](#🚀-getting-started)
- [Core Tooling](#core-tooling)
- [Firmware and Device Data](#firmware-and-device-data)
- [Module & App Repositories](#module-app-repositories)
- [Learning and Reference](#learning-and-reference)
- [Communities and Support](#communities-and-support)
- [Emergency and Recovery](#emergency-and-recovery)
- [Advanced Engineering](#advanced-engineering)
- [Video Tutorials](#video-tutorials)
- [Official Project Links](#official-project-links)

---

## 🚀 Getting Started

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
| **Magisk** | Android 6.0 and newer; see [upstream](https://github.com/topjohnwu/Magisk) | Ramdisk location and whether to patch `boot`, `init_boot`, recovery, or Samsung AP firmware |
| **KernelSU** | Official GKI 2.0 support (kernel 5.10+); older 4.14+ kernels require manual builds | Kernel compatibility and supported LKM/GKI installation mode in the [README](https://github.com/tiann/KernelSU#compatibility-state) |
| **KernelSU Next** | Separate fork with its own kernel integration requirements | Exact kernel build, installation mode, and manager compatibility in [upstream documentation](https://github.com/KernelSU-Next/KernelSU-Next) |
| **APatch** | ARM64, kernels 3.18–6.12, required kernel configuration | `CONFIG_KALLSYMS` requirements and device restrictions in the [README](https://github.com/bmax121/APatch#supported-versions) |

Android 16 is not a developer-preview-only platform. For example, [Magisk v30.7](https://github.com/topjohnwu/Magisk/releases/tag/v30.7) explicitly adds Android 16 QPR2 sepolicy and Zygisk support. Do not interpret support for an Android release as support for every phone running it.

---

## Core Tooling

### Root solutions

| Solution | Purpose | Important limits | Source |
|:---------|:--------|:-----------------|:-------|
| **[Magisk](./rooting-guides/magisk-guide.md)** | Image-based root, systemless modules, built-in Zygisk | DenyList is not a guarantee of undetectable root | [GitHub](https://github.com/topjohnwu/Magisk) |
| **[KernelSU](./rooting-guides/kernelsu-guide.md)** | Kernel-based root with per-app profiles | Match the kernel; systemless mounting uses metamodules | [GitHub](https://github.com/tiann/KernelSU) |
| **[KernelSU Next](./rooting-guides/kernelsu-guide.md)** | Alternative kernel-based root implementation | Use this fork's own manager and compatibility instructions | [GitHub](https://github.com/KernelSU-Next/KernelSU-Next) |
| **[APatch](./rooting-guides/apatch-guide.md)** | Kernel patching, Android modules and kernel patch modules | ARM64 and kernel configuration requirements; protect the SuperKey | [GitHub](https://github.com/bmax121/APatch) |
| **[Vector](./rooting-guides/lsposed-guide.md)** | Xposed-compatible ART hooking, formerly JingMatrix's LSPosed fork | Requires a supported root and Zygisk environment; not a standalone root solution | [GitHub](https://github.com/JingMatrix/Vector) |

> [!WARNING]
> No root framework guarantees banking-app compatibility or invisibility. Exploit-based temporary root is firmware-specific and is not a general alternative to bootloader unlocking. Verify exploit claims independently before running an APK with kernel privileges.

### Zygisk implementations

| Tool | Purpose | Compatibility | Source |
|:-----|:--------|:--------------|:-------|
| **Magisk Built-in Zygisk** | Default Zygisk in Magisk | Magisk 24+ | Built into [Magisk](https://github.com/topjohnwu/Magisk) |
| **ZygiskNext** | Standalone Zygisk for KSU/Magisk/APatch | Magisk, KernelSU, APatch | [GitHub](https://github.com/LSPosed/ZygiskNext) |
| **ReZygisk** | Transparent, open-source Zygisk fork | Magisk, KernelSU, APatch | [GitHub](https://github.com/PerformanC/ReZygisk) |

> [!TIP]
> Compare the strengths and trade-offs of each Zygisk implementation in the table above.

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
| **SkyHawk** | Lightweight alternative | Select devices | [GitHub](https://github.com/SHRP) |
| **AOSP Recovery Source** | Official base recovery | Reference | [AOSP](https://android.googlesource.com/platform/bootable/recovery/) |

#### Platform tools

| Tool | Purpose | Platform | Source |
|:-----|:--------|:---------|:-------|
| **ADB & Fastboot** | Core Android debug/flash tools | All | [Android SDK](https://developer.android.com/studio/releases/platform-tools) |
| **Android Flash Tool** | Web-based flashing (Pixel/AOSP) | Web | [flash.android.com](https://flash.android.com/) |
| **Heimdall** | Open-source Samsung flashing | All | [GitHub](https://github.com/Benjamin-Dobell/Heimdall) |
| **Odin** | Samsung Download Mode flashing | Windows | Follow a trusted device guide; avoid repackaged binaries |
| **Mi Flash Tool** | Xiaomi fastboot flashing | Windows | Obtain via Xiaomi support/device documentation, not lookalike download sites |
| **SP Flash Tool** | MediaTek flashing with device-specific scatter/DA files | Windows/Linux | Use the device vendor's documented package |
| **MTK Client** | Open-source MediaTek bypass/flash | Python | [GitHub](https://github.com/bkerler/mtkclient) |
| **QFIL (Qualcomm)** | Qualcomm EDL mode flashing | Windows | Qualcomm package |
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
| **Samsung** | [Samsung Developers](https://developer.samsung.com/) | SamMobile, Frija, SamFW | Region-specific |
| **Xiaomi** | [MIUI ROM](https://c.mi.com/global/miuidownload/) | [Xiaomi Firmware Updater](https://xiaomifirmwareupdater.com/) | Fastboot & Recovery |
| **OnePlus** | [OnePlus Support](https://www.oneplus.com/support) | Oxygen Updater app | payload.bin format |
| **Nothing** | [Nothing Support](https://nothing.tech/support) | Device-specific community packages | Match model and exact Nothing OS build |
| **Motorola** | [Motorola Support](https://motorola-global-portal.custhelp.com/) | [Lolinet Mirrors](https://mirrors.lolinet.com/firmware/moto/) | Verify region |
| **ASUS** | [ASUS Support](https://www.asus.com/support/) | Direct downloads | ROG & Zenfone |
| **Realme** | [Realme Support](https://www.realme.com/support/software-update) | realme-updater | OZIP format |

### Module & App Repositories

| Repository | Type | Content | Link |
|:-----------|:-----|:--------|:-----|
| **MMRL** | Multi-repository module manager | Supports Magisk, KernelSU and APatch; inspect each module's source | [GitHub](https://github.com/MMRLApp/MMRL) |
| **Fox Magisk Module Manager (archived)** | Historical module manager | Repository archived; not a current default recommendation | [GitHub](https://github.com/Fox2Code/FoxMagiskModuleManager) |
| **LSPosed Modules** | Xposed modules | App modifications | [Repository](https://github.com/Xposed-Modules-Repo) |
| **Apps & Modules Index** | Curated collection | 750++ apps and modules | [Collection](./apps-and-modules/index.md) |
| **IzzyOnDroid** | F-Droid repo | FOSS apps | [IzzyOnDroid](https://apt.izzysoft.de/fdroid/) |
| **KernelSU Module Repo** | KernelSU modules | Official module repository | [modules.kernelsu.org](https://modules.kernelsu.org/) |


### Extraction and utility tools

| Tool | Purpose |Source |
|:-----|:--------|:-------|
| **Payload-Dumper-Android** | Extract partitions from OTA.zip or payload.bin on Android without a PC | [GitHub](https://github.com/rajmani7584/Payload-Dumper-Android) |
| **payload-dumper-go** | Extract payload.bin | [GitHub](https://github.com/ssut/payload-dumper-go) |
| **payload-dumper-py** | Python payload extractor | [GitHub](https://github.com/vm03/payload_dumper) |
| **payload-dumper-rust** | Android OTA payload dumper | [GitHub](https://github.com/rhythmcache/payload-dumper-rust) |
| **AnyKernel3** | Kernel packaging/flashing framework | [GitHub](https://github.com/osm0sis/AnyKernel3) |
| **Android Image Kitchen** | Unpack/repack supported boot and recovery images; not a substitute for framework-specific patching | [GitHub](https://github.com/osm0sis/Android-Image-Kitchen) |
| **Universal Android Debloater Next Generation** | ADB-based package management with community package descriptions; no root needed | [GitHub](https://github.com/Universal-Debloater-Alliance/universal-android-debloater-next-generation) |
| **Neo Backup** | Root-based app and app-data backup/restore; test restores and copy backups off-device | [GitHub](https://github.com/NeoApplications/Neo-Backup) |
| **SD Maid SE** | Storage analysis and cleanup with optional root/ADB access | [GitHub](https://github.com/d4rken-org/sdmaid-se) |

Prefer full OTA payloads when extracting standalone images; incremental updates may require the original partition data. Back up before debloating, keep a record of package changes, and do not disable core system components in bulk.



---

### GKI kernel builds with root support

Community kernels are not manufacturer firmware. Verify Android kernel branch, KMI, security patch and device support; a matching major kernel number alone is insufficient. Keep the original boot image and a tested recovery path.

| Project | Features | Source |
|:--------|:---------|:-------|
| **WildKernels GKI** | Community GKI kernel builds with KernelSU and SUSFS; check each release's KMI and manager requirements | [GitHub](https://github.com/WildKernels/GKI_KernelSU_SUSFS) |
| **WildKernels OnePlus** | KSU + SUSFS builds for OnePlus GKI devices | [GitHub](https://github.com/WildKernels/OnePlus_KernelSU_SUSFS) |

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
| **Temporary Root (No Unlock)** | GhostLock (CVE-2026-43499) temporary root with a locked bootloader | [Root Without Unlocking the Bootloader](./rooting-guides/root-without-unlocking-bootloader.md) |
| **Bootloader Mods & Temp Root** | Kaeru, Fenrir, and locked-bootloader approaches | [Temporary Root Solutions](./rooting-guides/temporary-root-solutions.md) |

---

## Communities and Support

### Primary communities

| Platform | Focus | Best For | Link |
|:---------|:------|:---------|:-----|
| **XDA Developers** | Development hub | ROMs, kernels, mods | [Forum](https://forum.xda-developers.com/) |
| **X/Twitter** | General rooting | Quick help, discussions | [X](https://x.com/awsm_and_root) |
| **r/Magisk** | Magisk specific | Modules, troubleshooting | [Reddit](https://reddit.com/r/Magisk) |
| **r/LineageOS** | Custom ROMs | ROM support | [Reddit](https://reddit.com/r/LineageOS) |
| **Telegram Groups** | Real-time chat | Quick responses | Various channels |
| **Pixel Community** | Pixel specific rooting | Device updates | [Reddit](https://reddit.com/r/GooglePixel) |
| **ReZygisk Telegram** | ReZygisk support | Module updates & discussion | [Telegram](https://t.me/rezygisk) |


### Developer communities

| Community | Focus | Platform |
|:----------|:------|:---------|
| **Android Developers** | Official documentation | [developer.android.com](https://developer.android.com/) |
| **AOSP** | Android Open Source | [source.android.com](https://source.android.com/) |
| **GrapheneOS Discord** | Hardening and security insights | [grapheneos.org](https://discord.com/invite/grapheneos) |

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

### Popular custom ROMs

| ROM | Base | Focus | Root Support | Website |
|:----|:-----|:------|:-------------|:--------|
| **LineageOS** | AOSP | Stability, privacy, broad device support | Optional (add-on) | [lineageos.org](https://lineageos.org/) |
| **GrapheneOS** | AOSP | Hardened security | Discouraged | [grapheneos.org](https://grapheneos.org/) |
| **CalyxOS** | AOSP | Privacy with usability | Optional | [calyxos.org](https://calyxos.org/) |
| **/e/OS (Murena)** | LineageOS | De-Googled, microG built-in | Optional | [e.foundation](https://e.foundation/) |
| **crDroid** | LineageOS | Heavy customization | Check device build | [crdroid.net](https://crdroid.net/) |
| **Evolution X** | AOSP | Pixel features + customization | Check device build | [evolution-x.org](https://evolution-x.org/) |
| **Paranoid Android** | AOSP | Unique UX features | Optional | [paranoidandroid.co](https://paranoidandroid.co/) |
| **PixelOS** | AOSP | Pixel experience on non-Pixels | Check device build | [pixelos.net](https://pixelos.net/) |
| **Pixel Experience (historical)** | AOSP | Archived project; not a current ROM recommendation | Do not assume maintained builds | [Archived manifest](https://github.com/PixelExperience/manifest) |

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

### Emergency tools by chipset

| Chipset | Tool | Mode | Purpose |
|:--------|:-----|:-----|:--------|
| **Qualcomm** | QFIL/EDL Tools | EDL (9008) | Deep flash recovery |
| **MediaTek** | SP Flash Tool | Download Mode | Full flash recovery |
| **Samsung Exynos** | Odin/Heimdall | Download Mode | Firmware restoration |
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
| **Fastboot Commands** | Bootloader operations | [Fastboot Docs](https://developer.android.com/studio/releases/platform-tools) |
| **Kernel Building** | Custom kernel development | [Kernel Guide](https://source.android.com/docs/setup/build/building-kernels) |
| **SELinux Policies** | Security configuration | [SELinux Docs](https://source.android.com/docs/security/features/selinux) |
| **Android Security Bulletin** | Security updates | [Security Updates](https://source.android.com/docs/security/bulletin) |
| **Android Verified Boot** | Chain of trust explained | [AVB Documentation](https://source.android.com/docs/security/features/verifiedboot) |
| **Dynamic Partitions** | Flexible partitioning | [Dynamic Partitions](https://source.android.com/docs/core/ota/dynamic_partitions) |
| **Generic Kernel Image** | GKI architecture | [GKI Docs](https://source.android.com/docs/core/architecture/kernel/generic-kernel-image) |

### Security and compliance references

| Topic | Coverage | Link |
|:------|:---------|:-----|
| **Play Integrity API** | Official guidance on root detection | [Developer Docs](https://developer.android.com/google/play/integrity) |
| **A/B System Updates** | Seamless update flow | [A/B System](https://source.android.com/docs/core/ota/ab) |
| **Project Treble** | HAL abstraction layers | [Treble Docs](https://source.android.com/docs/core/architecture) |
| **Mainline Modules** | Modular update delivery | [Mainline](https://source.android.com/docs/core/architecture/modular-system) |

---

## Video Tutorials

### Recommended channels

| Channel | Content Type | Quality | Link |
|:--------|:-------------|:--------|:-----|
| **XDA TV** | Official tutorials | Professional | [YouTube](https://www.youtube.com/user/xdadevelopers) |
| **HowToMen** | Android modifications | Step-by-step | [YouTube](https://www.youtube.com/@howtomen) |
| **Sam Beckman** | Reviews & tutorials | Well-produced | [YouTube](https://www.youtube.com/@sambeckman) |
| **TechDoctorUK** | Android TV & phones | Comprehensive | [YouTube](https://www.youtube.com/results?search_query=TechDoctorUK) |

⚠️ **Always verify video tutorials against written documentation for accuracy**

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
| **Emergency Help** | [Troubleshooting](./troubleshooting.md#emergency-recovery) | [XDA Device Forums](https://forum.xda-developers.com/) |
| **Root Apps** | [App Collection](./apps-and-modules/index.md) | [F-Droid](https://f-droid.org/) |
| **Module Discovery** | [MMRL](https://github.com/MMRLApp/MMRL) | [Telegram Channels](https://t.me/magiskmod_update) |
| **Firmware** | Manufacturer site | [Firmware databases](#firmware-sources) |

---

## ⚠️ Legal & Safety Notice

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

## 🤝 Contributing

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
