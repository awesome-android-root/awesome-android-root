---
layout: doc
title: Android Rooting Guide 2026
description: "The ultimate Android rooting guide for 2026. Learn Magisk, KernelSU & APatch with step-by-step instructions, device-specific guides, and latest root-hiding techniques."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.pages.dev/rooting-guides/  
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Android Rooting Guide 2026 | Awesome Android Root
  - - meta
    - property: og:description
      content: The ultimate Android rooting guide covering Magisk, KernelSU, APatch installation with device-specific tutorials for Pixel, Samsung, Xiaomi, OnePlus & more.
  - - meta
    - property: og:url
      content: https://awesome-android-root.pages.dev/rooting-guides/  
  - - meta
    - property: og:image
      content: https://awesome-android-root.pages.dev/images/og.png  
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Android Rooting Guide 2026 | Awesome Android Root
  - - meta
    - name: twitter:description
      content: Complete Android rooting tutorial with Magisk, KernelSU, APatch guides and device-specific instructions for safe rooting. Includes Vector/LSPosed framework & Play Integrity bypass.
  - - meta
    - name: keywords
      content: android root guide 2026, magisk installation guide, kernelsu tutorial, apatch rooting, android rooting methods, systemless root, bootloader unlock tutorial, custom recovery guide, twrp installation, android root safety, pixel root guide, samsung root guide, xiaomi root guide, oneplus root guide, android customization, lsposed framework, vector framework, play integrity fix, tricky store, zygisk next, android 16 root, android 17 root, android debloating
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root  
  - - meta
    - property: article:section
      content: Android Rooting Tutorials
  - - meta
    - property: article:tag
      content: Android Root 2026
  - - meta
    - property: article:tag
      content: Magisk v30
  - - meta
    - property: article:tag
      content: KernelSU Tutorial
  - - meta
    - property: article:tag
      content: APatch Rooting
  - - meta
    - property: article:tag
      content: Bootloader Unlock
  - - meta
    - property: article:tag
      content: Custom Recovery
  - - meta
    - property: article:tag
      content: Vector Framework
  - - meta
    - property: article:tag
      content: LSPosed Framework
  - - meta
    - property: article:tag
      content: Play Integrity Fix
  - - meta
    - property: article:tag
      content: Android Customization
  - - meta
    - property: article:published_time
      content: 2024-01-15T10:00:00Z
  - - meta
    - property: article:modified_time
      content: 2026-06-25T00:00:00Z
  - - meta
    - name: robots
      content: index, follow, max-image-preview:large
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": "Android Rooting Guide 2026",
        "description": "Complete tutorial for rooting Android devices using Magisk, KernelSU, or APatch with safety practices and Play Integrity bypass",
        "totalTime": "PT2H",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "tool": [
          {"@type": "HowToTool", "name": "Android Device (Android 8.1 - 17)"},
          {"@type": "HowToTool", "name": "Computer with ADB/Fastboot"},
          {"@type": "HowToTool", "name": "USB Cable (data-capable)"}
        ],
        "supply": [
          {"@type": "HowToSupply", "name": "Magisk APK v30.7+"},
          {"@type": "HowToSupply", "name": "Custom Recovery (TWRP/OrangeFox)"},
          {"@type": "HowToSupply", "name": "Stock Boot/Init_Boot Image"}
        ],
        "step": [
          {
            "@type": "HowToStep",
            "name": "Prepare Device and Backup Data",
            "text": "Enable Developer Options, backup all important data, and charge device to 50%+"
          },
          {
            "@type": "HowToStep", 
            "name": "Unlock Bootloader",
            "text": "Enable OEM unlocking and unlock bootloader using fastboot commands"
          },
          {
            "@type": "HowToStep",
            "name": "Install Custom Recovery (Optional)",
            "text": "Flash TWRP or OrangeFox for advanced recovery features"
          },
          {
            "@type": "HowToStep",
            "name": "Patch & Flash Boot Image",
            "text": "Patch stock boot.img or init_boot.img with Magisk/KernelSU/APatch, then flash via fastboot"
          },
          {
            "@type": "HowToStep",
            "name": "Post-Root Setup & Hide Root",
            "text": "Install root manager, configure DenyList, set up Play Integrity Fix modules for banking apps"
          }
        ]
      }
---

# Android Rooting Guide 2026

Master Android rooting with comprehensive tutorials covering bootloader unlocking, root installation, and advanced customization techniques.

## Quick Navigation

> [!TIP]
> **New to rooting?**
> Start with [Understanding Root Access](#understanding-root-access)

::: info Steps
**Ready to begin?** Choose your path:
- [Prerequisites and Safety](#prerequisites-and-safety) - Critical preparations
- [Universal Rooting Process](#universal-rooting-process) - Four-step guide for all devices
- [Device-Specific Guides](#device-specific-guides) - Tailored instructions for your device
- [Root Method Comparison](#choosing-a-root-method) - Magisk vs KernelSU vs APatch
:::


> [!NOTE]
> **Need help?**
> Visit [Troubleshooting](#troubleshooting) or [FAQ](../faqs.md)

---

## Understanding Root Access

Root access grants **superuser (administrator) privileges** on Android, providing complete control over your device's operating system and hardware.

### What Root Enables in 2026

- **System-level control** over files, processes, and hardware (including Android 16/17's new sepolicy format)
- **Bypass manufacturer restrictions** on any Android version up to 17 Beta
- **Install powerful apps** requiring deep system integration (see [500+ Root Apps](../apps-and-modules/))
- **Modify core system files** and customize every aspect via Magic Mount, OverlayFS, or KPM
- **Access hidden hardware features** and advanced kernel-level configurations
- **Kernel-level code injection** via APatch KPM (inline-hook, syscall-table-hook)
- **Fine-grained root access control** via KernelSU App Profiles (uid, gid, capabilities, SELinux)

### Benefits vs Risks

| Benefits | Risks |
|----------|-------|
| Complete device control | Warranty void (usually permanent) |
| [System-wide ad blocking](../general-guides/android-adblocking.md) | Reduced security if misconfigured |
| [Performance tuning](../apps-and-modules/#performance-and-optimization) | Banking apps require active hiding ([solutions](../troubleshooting.md#play-integrity-and-banking-apps)) |
| Privacy enhancements (firewall, permission control) | OTA updates require manual re-patching |
| [Bloatware removal](../general-guides/android-apps-debloating.md) | Potential for device bricking |
| Full app + data backups (Swift Backup, Neo Backup) | Play Integrity may break unpredictably |
| Kernel-level tweaks (CPU, GPU, scheduler) | Strong Integrity generally unachievable on unlocked devices |
| Custom ROM installation freedom | Bootloader unlock wipes ALL data |

### Is Rooting Right for You?

| **✅ Root If:** | **❌ Don't Root If:** |
|---------------------------|---------------------|
| Want complete control over your device | Rely solely on banking/finance apps |
| System-wide ad blocking is priority | Uncomfortable with terminal/command-line |
| Enjoy deep customization & theming | Need 100% warranty coverage |
| Privacy & anti-tracking matters | Want seamless automatic OTA updates |
| Willing to learn & troubleshoot | New to Android and risk-averse |
| Use device as daily driver with backups | Prefer stock, zero-maintenance experience |

---

## Prerequisites and Safety

### Critical Warnings

::: danger ⚠️ PERMANENT CONSEQUENCES
**Data Loss** - Unlocking bootloader completely erases all device data. Backup everything before proceeding.

**Warranty Void** - Bootloader unlocking permanently voids manufacturer warranty on most devices.

**Samsung Knox** - Bootloader unlock permanently trips Knox eFuse. Samsung Pay, Secure Folder, Samsung Pass are lost **forever** - even if you re-lock the bootloader.

**Security Risks** - Root access can expose your device to malware if misused. Only grant root to trusted apps. With great power comes great responsibility.

**Banking & Finance Apps** - Many financial apps actively detect root. Play Integrity bypass is a continuous cat-and-mouse game requiring ongoing maintenance.

**Bricking Risk** - Incorrect procedures can permanently damage your device. Follow instructions exactly and have a [recovery plan ready](../troubleshooting.md#emergency-recovery).
:::

### Essential Requirements

**Hardware:**
- Android device with **unlockable bootloader** (verify before starting - some carrier-locked variants cannot be unlocked)
- **50% or higher** battery charge (a dead battery during flashing = brick)
- Quality **data-capable** USB cable (not charge-only cables)
- Computer (Windows, macOS, or Linux - Linux is often the most reliable)

**Software:**
- [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) (ADB/Fastboot) - keep these updated!
- Device-specific USB drivers (Windows only - see [OEM driver list](https://developer.android.com/studio/run/oem-usb))
- Stock firmware for your device (essential for recovery)
- Backup solution for your data (Swift Backup, Neo Backup, or manual copy)

**Files You'll Need:**
- Stock `boot.img` or `init_boot.img` (extract from your device's firmware - Android 13+ devices typically use `init_boot.img`)
- Latest root solution APK/ZIP (Magisk, KernelSU, or APatch)
- Custom recovery image (optional but recommended)

**Knowledge:**
- Basic command line / terminal familiarity
- Understanding of your exact device model and variant
- Ability to research and follow instructions carefully
- Emergency recovery plan (know how to flash stock firmware)

### Pre-Rooting Checklist

1. ✅ **Backup all data** - Photos, contacts, messages, app data (see [Backup Apps](../apps-and-modules/#backup-and-restore))
2. ✅ **Charge device** - Minimum 50% battery
3. ✅ **Verify bootloader unlockability** - Check OEM Unlocking toggle in Developer Options (greyed out = likely carrier-locked)
4. ✅ **Download necessary files** - Stock firmware, root solution (APK+ZIP), recovery image
5. ✅ **Research your device** - Read XDA forums and device-specific guides thoroughly
6. ✅ **Prepare recovery plan** - Know how to restore stock firmware via fastboot/recovery
7. ✅ **Identify correct partition** - Determine if your device uses `boot.img` or `init_boot.img` (Android 13+ typically = `init_boot.img`)

---

## Choosing a Root Method

Three primary rooting solutions exist in 2026, each with distinct advantages and trade-offs. The landscape has evolved: **Magisk** continues its Rust rewrite with Android 16 QPR2 support, **KernelSU** has adopted a metamodule architecture, and **APatch** now offers Magic Mount + KPM dual capabilities.

### Quick Comparison

| Feature | Magisk | KernelSU | APatch |
|---------|---------|----------|---------|
| **Guide** | [Magisk Guide](./magisk-guide.md) | [KernelSU Guide](./kernelsu-guide.md) | [APatch Guide](./apatch-guide.md) |
| **Target Users** | Beginners, most users | GKI devices, privacy-focused | Developers, edge cases |
| **Architecture** | Systemless (boot/init_boot/vendor_boot) | Kernel-level (GKI/LKM) | Kernel patching (KernelPatch) |
| **Android Support** | 6.0 – 17 Beta | GKI 2.0 (kernel 5.10–6.12) | ARM64, kernel 3.18–6.12 |
| **Installation** | Easy (patch & flash) | Moderate (needs compatible kernel) | Moderate (ARM64 only) |
| **Module Ecosystem** | 1000+ Magisk modules | Modified Magisk modules via metamodule | APModule + KPM (kernel-level) |
| **Module Mounting** | Built-in Magic Mount | Metamodule required (meta-overlayfs or Meta-Hybrid Mount) | Magic Mount default; OverlayFS optional |
| **Root Hiding** | Good (DenyList + Shamiko + PIF) | Excellent (app profiles, uid/gid/selinux control) | Good (SuperKey credential system) |
| **Community** | Largest (~50k+ GitHub stars) | Growing (~13k+ stars) | Small (~5k+ stars) |
| **Development** | Active | Very active | Active |
| **Unique Strength** | Ecosystem & Rust modernization | Kernel space, only permitted apps see su | KPM kernel code injection without source |
| **OTA Handling** | Re-patch after OTA | Some OTA flows survive via LKM | Initial A/B OTA support |

### Decision Guide

**Choose Magisk if:**
- You are new to rooting and want the easiest path
- You need maximum module compatibility (1000+ modules)
- You want universal device support (Android 6.0–17)
- You prefer in-app updates and the largest community

**Choose KernelSU if:**
- Your device runs a GKI kernel (5.10+) and you want kernel-level security
- Fine-grained app profiles (uid, gid, groups, capabilities, SELinux) matter to you
- You want the best root concealment (only permitted apps can see `su`)
- You're comfortable with metamodule setup for module support

**Choose APatch if:**
- Magisk/KernelSU are blocked on your specific firmware
- You need kernel-level code injection (KPM) without kernel source
- Your device is ARM64 with kernel 3.18–6.12
- You want both Magisk-like modules AND kernel patching

> [!IMPORTANT]
> For detailed comparison including migration guides, see [Root Framework Comparison](./root-framework-comparison.md)

---

## Universal Rooting Process

All Android devices follow this four-step rooting process, regardless of manufacturer or root method. Modern devices (Android 13+) often use `init_boot.img` instead of `boot.img` for root patching - check your device specifics.

### Step 1: Unlock Bootloader

Unlocking the bootloader is the essential first step that enables all subsequent modifications.

**Quick Steps:**
1. **Enable Developer Options** (Settings > About > Tap Build Number 7 times)
2. **Enable OEM Unlocking** (Developer Options > OEM Unlocking)
3. **Enable USB Debugging** (Developer Options > USB Debugging)
4. **Boot to fastboot mode** (Power + Volume Down or `adb reboot bootloader`)
5. **Execute unlock command** (`fastboot flashing unlock` or `fastboot oem unlock`)

> [!CAUTION]
> ⚠️ This step **erases ALL data**. Backup everything first. On Samsung devices, this also **permanently trips Knox** (Samsung Pay, Secure Folder, Samsung Pass lost forever).

**[📖 Complete Bootloader Unlocking Guide](./how-to-unlock-bootloader.md)**

### Step 2: Install Custom Recovery (Optional but Recommended)

Custom recovery provides advanced features and safer modification workflows. While not strictly required for all modern root methods, it's invaluable for backups and emergency recovery.

**Popular Options:**
- **TWRP** - Most widely supported, active development
- **OrangeFox** - Modern UI, frequent updates, EROFS support
- **SKYHAWK** - Feature-rich recovery project
- **PitchBlack** - Based on TWRP with enhanced features

**Process:**
1. **Download device-specific recovery image**
2. **Boot to fastboot mode**
3. **Flash recovery image** - `fastboot flash recovery recovery.img`
4. **Boot to recovery** - Test functionality before proceeding

> [!NOTE]
> Some modern devices (especially A/B partition schemes) may not have a dedicated recovery partition. In these cases, you can `fastboot boot recovery.img` to temporarily boot recovery without flashing.

**[📖 Custom Recovery Installation Guide](./how-to-install-custom-recovery.md)**

### Step 3: Install Root Solution

Choose and install your preferred root method. The modern approach uses boot image patching.

#### Option A: Magisk (Recommended for Most Users)

1. Download latest **Magisk APK** from [official GitHub](https://github.com/topjohnwu/Magisk/releases)
2. Extract the correct image from your device's stock firmware:
   - **Android 13+ (most devices):** `init_boot.img`
   - **Android 12 and older:** `boot.img`
   - **Some Samsung devices:** `boot.img` + `vendor_boot.img` (Magisk v30.3+)
3. Transfer image to device, patch it using the Magisk app
4. Flash patched image via fastboot (`fastboot flash init_boot magisk_patched...img`)
5. Reboot and complete Magisk app setup

> [!TIP]
> Magisk v30+ has migrated over 40% of native code to Rust for improved memory safety. The app now supports downloading XZ-compressed modules and 16k page size devices.

**[📖 Complete Magisk Guide](./magisk-guide.md)**

#### Option B: KernelSU

1. Verify your device has a **GKI-compatible kernel** (kernel 5.10+ with GKI 2.0)
2. Download KernelSU-supported kernel for your device or use LKM (Loadable Kernel Module) mode
3. Flash kernel via fastboot or KernelSU app
4. Install **KernelSU Manager** app
5. Install a **metamodule** (meta-overlayfs or Meta-Hybrid Mount) - required for modules to work
6. Configure App Profiles for fine-grained root access control

> [!WARNING]
> KernelSU **no longer has built-in module mounting**. Fresh installations require a metamodule for modules to function. See the [KernelSU Guide](./kernelsu-guide.md) for details.

**[📖 Complete KernelSU Guide](./kernelsu-guide.md)**

#### Option C: APatch

1. Verify device compatibility (ARM64, kernel 3.18–6.12)
2. Download **APatch Manager** and prepare your stock `boot.img`
3. Patch boot image via APatch app (set a strong SuperKey)
4. Flash patched image via fastboot
5. Configure APatch Manager and install APModule/KPM as needed

> [!NOTE]
> APatch combines Magisk's convenient boot.img install with KernelSU's kernel patching power. KPM allows kernel function inline-hook and syscall-table-hook without kernel source.

**[📖 Complete APatch Guide](./apatch-guide.md)**

### Step 4: Post-Root Configuration

After successful root installation, complete these essential steps:

1. **Verify Root Access** - Use a root checker app to confirm superuser access works
2. **Install Essential Apps** - Visit [Starter Kit: Must-Have Apps](../apps-and-modules/#starter-kit-must-have-apps)
3. **Configure Root Hiding** (critical for banking apps):
   - **Magisk:** Enable Zygisk + DenyList, install [Play Integrity Fix](https://github.com/chiteroman/PlayIntegrityFix) + [Tricky Store](https://github.com/5ec1cff/TrickyStore) + [Shamiko](https://github.com/LSPosed/LSPosed.github.io) (or open-source [Zygisk Assistant](https://github.com/snake-4/Zygisk-Assistant))
   - **KernelSU:** Use App Profiles, install Zygisk Next + PIF + Tricky Store
   - **APatch:** Use SuperKey credential system + PIF modules
4. **Create Full Backup** - Use Swift Backup, Neo Backup, or recovery nandroid

**Recommended Next Steps:**
- [Block Ads System-Wide](../general-guides/android-adblocking.md) - Eliminate ads across all apps
- [Debloat Your Device](../general-guides/android-apps-debloating.md) - Remove bloatware safely
- [Install LSPosed / Vector Framework](./lsposed-guide.md) - Advanced app customization with Xposed modules
- [Browse 500+ Root Apps](../apps-and-modules/) - Discover essential tools

---

## Device-Specific Guides

Detailed rooting instructions tailored for specific manufacturers and models.

### 📱 [Google Pixel Series](./how-to-root-pixel-phone.md)

### 📱 [Samsung Galaxy Series](./how-to-root-samsung-phone.md)

### 📱 [Xiaomi Devices](./how-to-root-xiaomi-phone.md)

### 📱 [OnePlus Devices](./how-to-root-oneplus-phone.md)

### 📱 [Motorola Devices](./how-to-root-motorola-phone.md)

### 📱 [Nothing Phone Series](./how-to-root-nothing-phone.md)

> [!TIP]
> **Can't find your device?** Check [XDA Developers Forums](https://forum.xda-developers.com/) or search device-specific Telegram groups. Most devices with unlockable bootloaders follow the universal process above.

> [!NOTE]
> **ASUS (ROG/Zenfone), Realme/OPPO, ASUS:** Check the [Root Framework Comparison](./root-framework-comparison.md#device-recommendations) for device-specific root method recommendations.

---

## Troubleshooting

### Common Issues and Solutions

**Device Won't Boot (Bootloop)**

Symptoms: Device stuck on boot logo, constantly rebooting

Solutions:
1. Boot to recovery mode (Power + Volume Up, varies by device)
2. Wipe cache partition from recovery
3. Restore from backup if available
4. Flash stock `boot.img` / `init_boot.img` via fastboot to undo root
5. Flash full stock firmware via fastboot/recovery
6. Seek help on your device-specific XDA forum

**Root Not Detected**

Symptoms: Root checker shows no root, apps can't get superuser access

Solutions:
1. Verify root manager app is installed and running
2. Check if Zygisk is enabled (Magisk settings)
3. Grant root permission when prompted by apps
4. Re-patch and re-flash boot image
5. Verify the patched image wasn't overwritten by an OTA

**Banking Apps Not Working (Play Integrity)**

Symptoms: Apps detect root and refuse to run, Play Integrity check fails

> [!WARNING]
> Play Integrity bypass is a **cat-and-mouse game** - Google continuously updates detection. No solution is permanent.

Solutions (2026 best practices):
1. **Magisk:** Enable Zygisk → Configure DenyList (add banking app) → Enforce DenyList
2. Install **[Play Integrity Fix](https://github.com/chiteroman/PlayIntegrityFix)** module (provides working device fingerprint)
3. Install **[Tricky Store](https://github.com/5ec1cff/TrickyStore)** for advanced key attestation spoofing
4. Install **[Shamiko](https://github.com/LSPosed/LSPosed.github.io)** (closed-source) or **[Zygisk Assistant](https://github.com/snake-4/Zygisk-Assistant)** (open-source) for better root hiding
5. Hide the Magisk app (Settings → Hide the Magisk app → repackage with random name)
6. Use **[Zygisk Next](https://github.com/Dr-TSNG/ZygiskNext)** (alternative Zygisk implementation, works on KernelSU too)
7. Clear banking app data after setting up hiding
8. See [detailed Play Integrity troubleshooting](../troubleshooting.md#play-integrity-and-banking-apps)

> [!NOTE]
> **Strong Integrity** (required by some wallet/payment apps) is generally **not achievable** on unlocked bootloaders. Even with all fixes, some apps may refuse to run. Consider using a secondary unrooted device for critical banking.

**OTA Updates Failing**

Symptoms: System updates fail to install or cause bootloop

Solutions:
1. **Magisk:** Use "Restore Images" in Magisk app before OTA, then "Install to Inactive Slot" after OTA
2. Flash full OTA package manually, then re-patch and re-flash root
3. **KernelSU:** Some OTA flows survive via LKM mode, but verify after each update
4. **APatch:** Initial A/B OTA support available (experimental)
5. Consider switching to a custom ROM with built-in OTA + root support

**Fastboot Not Recognized**

Symptoms: Computer doesn't detect device in fastboot mode

Solutions:
1. Install proper [USB drivers](https://developer.android.com/studio/run/win-usb) (Windows)
2. Try a USB 2.0 port (USB 3.0 often causes issues with fastboot)
3. Use a high-quality data-capable USB cable (not charge-only)
4. On Linux: add udev rules, run `fastboot` as root or configure permissions
5. Try `fastboot devices` on a different computer

### Emergency Recovery

**Safe Mode (Disable All Modules)**

If a rogue module causes bootloop:
1. Hold **Power + Volume Down** (or your device's Safe Mode key combo) during boot
2. This disables all Magisk modules temporarily
3. Uninstall the problematic module and reboot

**Factory Reset Protection (FRP)**

If locked out after factory reset:
1. Use previously synced Google account credentials
2. Follow manufacturer-specific FRP bypass methods
3. Flash stock firmware with all partitions
4. Contact manufacturer support if purchased legitimately

**Complete Brick Recovery (EDL/9008 Mode)**

If device won't power on or enter any mode:
1. Try **Emergency Download Mode** (EDL/9008) - varies by device
2. Use manufacturer-specific unbrick tools (MSM Tool for OnePlus, Odin for Samsung, etc.)
3. Search XDA for device-specific unbrick guides
4. Professional repair may be necessary for hardware-level bricks

**Prevention Tips:**
- 📥 Always keep stock firmware downloaded before starting
- 💾 Create regular backups (Swift Backup, Neo Backup, recovery nandroid)
- 📖 Read your device's XDA forum thoroughly before attempting anything
- 🔑 Keep a copy of your stock `boot.img` and `init_boot.img`
- 🧪 Test one module at a time, reboot between installations
- 📋 Join device-specific Telegram/Discord communities for real-time help

If locked out after factory reset:
1. Use previously synced Google account
2. Follow manufacturer FRP bypass methods
3. Flash stock firmware with all partitions
4. Contact manufacturer support if purchased legitimately

**Complete Brick Recovery**

If device won't power on or enter any mode:
1. Try emergency download mode (EDL/9008)
2. Use manufacturer-specific unbrick tools
3. Search XDA for device-specific unbrick guides
4. Professional repair may be necessary

**Prevention Tips:**
- Always keep stock firmware downloaded
- Create regular backups
- Understand your device's emergency modes
- Join device-specific communities for support

---

## Additional Resources

### Framework and Advanced Guides

**Vector / LSPosed Framework**

Advanced app modification framework for rooted devices. The ecosystem has evolved: the original LSPosed was archived in January 2024, and current builds are either closed-source (lsposed.zip) or the fully open-source **Vector** fork.

- **Vector (Recommended):** [GitHub](https://github.com/JingMatrix/Vector) - Fully open-source (GPLv3), actively maintained, supports Android 8.1–17 Beta
- **LSPosed (Closed-Source):** [lsposed.zip](https://lsposed.zip/) - Original team's builds, API 101 stable
- Requires Zygisk (Magisk) or Zygisk Next/NeoZygisk (KernelSU)
- Enables Xposed modules for per-app customization, privacy, and UI tweaks
- API 101 is the current standard; Vector CI builds already support it

> [!IMPORTANT]
> See our [Complete Vector/LSPosed Guide](./lsposed-guide.md) for the full breakdown on choosing between Vector (open-source) and lsposed.zip (closed-source), installation, and module management.

**Custom ROM Installation**

Replace stock Android with privacy-focused custom ROMs:
- Requires unlocked bootloader and typically custom recovery
- Popular options: LineageOS, PixelOS, crDroid, GrapheneOS (now supports Zygisk Next)
- Reduces telemetry, removes bloatware, extends device lifespan

**[📖 Custom ROM Installation Guide](./custom-rom-installation.md)**

### Root Hiding & Play Integrity Resources

Play Integrity bypass is essential for banking apps in 2026. Key tools:

| Tool | Purpose | Status |
|------|---------|--------|
| **[Play Integrity Fix](https://github.com/chiteroman/PlayIntegrityFix)** | Spoofs device fingerprint for DEVICE_INTEGRITY | Active |
| **[Tricky Store](https://github.com/5ec1cff/TrickyStore)** | Advanced key attestation spoofing | Active |
| **[Shamiko](https://github.com/LSPosed/LSPosed.github.io)** | Systemlessly hides Zygisk/modules from detection | Closed-source |
| **[Zygisk Assistant](https://github.com/snake-4/Zygisk-Assistant)** | Open-source alternative to Shamiko | Active (FOSS) |
| **[Zygisk Next](https://github.com/Dr-TSNG/ZygiskNext)** | Standalone Zygisk implementation for Magisk/KernelSU | Active |
| **[Play Integrity Fork](https://github.com/osm0sis/PlayIntegrityFork)** | Community-maintained PIF script | Active |


> [!TIP]
> For complete and up-to-date list, check our [Root Hiding section ↗](../../README.md#root-hiding-and-play-integrity)

---

## Community and Support

### **Official Resources**
- [GitHub Repository](https://github.com/awesome-android-root/awesome-android-root) - Source code and issues
- [Troubleshooting Guide](../troubleshooting.md) - Common problems and fixes
- [FAQ](../faqs.md) - Common questions
- [Root Apps Collection](../apps-and-modules/) - Curated apps and modules
- [X (Twitter) Updates](https://x.com/awsm_and_root) - Project news & updates

### **External Communities**
- [XDA Developers](https://forum.xda-developers.com/) - Device-specific forums (largest Android modding community)
- [r/AndroidRoot](https://www.reddit.com/r/androidroot/) - Rooting help and discussion
- [r/Magisk](https://www.reddit.com/r/Magisk/) - Magisk-specific support
- [r/KernelSU](https://www.reddit.com/r/KernelSU/) - KernelSU community
- **Telegram Groups** - Device-specific and framework-specific groups (search for your device)

### When Asking for Help

Include this information for faster troubleshooting:
- **Device model** and exact variant (e.g., Pixel 8 Pro `husky`, not just "Pixel 8")
- **Android version** and build number (e.g., Android 16 QPR2, build BP1A)
- **Root method and version** (e.g., Magisk v30.7, KernelSU v3.2)
- **Modules installed** (list all active Magisk/KernelSU/APatch modules)
- **Exact error messages** (screenshots or copy-pasted text)
- **Steps already tried** (so helpers don't suggest things you've done)
- **Screenshots** of error states if applicable

---

## Next Steps

### Your Path Forward
1. **[Unlock Bootloader](./how-to-unlock-bootloader.md)** - The essential first step
2. **[Install Recovery](./how-to-install-custom-recovery.md)** - Optional but recommended
3. **[Choose Your Root Method](#choosing-a-root-method)** - Magisk, KernelSU, or APatch
4. **[Follow Device-Specific Guide](#device-specific-guides)** - Tailored for your phone
5. **[Set Up Root Hiding](#step-4-post-root-configuration)** - Essential for banking apps
6. **[Install Vector/LSPosed](./lsposed-guide.md)** - Unlock app customization

> [!IMPORTANT]
> - Join our [community discussions](../about.md#community-resources)
> - Contribute to the [project](../contributing.md)
> - Stay updated via [X (Twitter)](https://x.com/awsm_and_root)

---

🎉 **Welcome to the World of Android Freedom!**

Your journey to unlimited Android possibilities begins now! The rooting community is stronger than ever in 2026