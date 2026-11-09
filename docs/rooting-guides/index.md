---
layout: doc
title: Android Rooting Guide
description: "The ultimate Android rooting guide. Learn Magisk, KernelSU & APatch with step-by-step instructions, device-specific guides, and root-hiding techniques."
head:
  - - meta
    - property: og:description
      content: The ultimate Android rooting guide covering Magisk, KernelSU, APatch installation with device-specific tutorials for Pixel, Samsung, Xiaomi, OnePlus & more.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/rooting-guides.png
  - - meta
    - property: og:image:secure_url
      content: https://awesome-android-root.xyz/images/og/rooting-guides.png
  - - meta
    - property: og:image:alt
      content: Android Rooting Guide - Magisk, KernelSU and APatch Tutorials
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
    - name: twitter:description
      content: Complete Android rooting tutorial with Magisk, KernelSU, APatch guides and device-specific instructions for safe rooting. Includes Vector/LSPosed framework & Play Integrity bypass.
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
      content: Android Root
  - - meta
    - property: article:tag
      content: Magisk
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
    - name: robots
      content: index, follow, max-image-preview:large
---

# Android Rooting Guide

Master Android rooting with comprehensive tutorials covering bootloader unlocking, root installation, and advanced customization techniques.

## Quick Navigation

> [!TIP]
> **Want guide for a specific device?**
> Select your manufacturer in the [**Device-Specific Guides section ↗**](#device-specific-guides)

::: info Steps
**Ready to begin?** Choose your path:
- [Prerequisites and Safety](#prerequisites-and-safety) - Critical preparations
- [Universal Rooting Process](#universal-rooting-process) - Standard unlocked-bootloader installation
- [Device-Specific Guides](#device-specific-guides) - Tailored instructions for your device
- [Root Method Comparison](#choosing-a-root-method) - Frameworks and temporary root
- [Root Without Unlocking the Bootloader](./root-without-unlocking-bootloader.md) - DirtyFrag and GhostLock temporary root
:::

> [!NOTE]
> **Need help?**
> Visit [Troubleshooting](#troubleshooting) or [FAQ](../faqs.md)

---

## Understanding Root Access

Root access grants **superuser (administrator) privileges** on Android, providing complete control over your device's operating system and hardware.

### What Root Enables

- **System-level control** over files, processes, and hardware
- **Bypass manufacturer restrictions** on any Android version
- **Install powerful apps** requiring deep system integration (see [Root Apps](../apps-and-modules/))
- **Modify core system files** and customize every aspect via Magic Mount, OverlayFS, or KPM
- **Access hidden hardware features** and advanced kernel-level configurations
- **Kernel-level code injection** via APatch KPM (inline-hook, syscall-table-hook)
- **Fine-grained root access control** via KernelSU App Profiles (uid, gid, capabilities, SELinux)

### Benefits vs Risks

| Benefits | Risks |
|----------|-------|
| Complete device control | Warranty void (usually permanent) |
| [System-wide ad blocking](../general-guides/android-adblocking.md) | Reduced security if misconfigured |
| [Performance tuning](../apps-and-modules/performance#performance-optimization) | Banking apps require active hiding ([solutions](../troubleshooting.md#play-integrity-and-banking-apps)) |
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
- Exact-build stock firmware and the images required by your device and chosen framework; keep originals for recovery
- Latest root solution APK/ZIP (Magisk, KernelSU, or APatch)
- Compatible custom recovery image (optional, only if needed and supported)

**Knowledge:**
- Basic command line / terminal familiarity
- Understanding of your exact device model and variant
- Ability to research and follow instructions carefully
- Emergency recovery plan (know how to flash stock firmware)

### Pre-Rooting Checklist

1. ✅ **Backup all data** - Photos, contacts, messages, app data (see [Backup Apps](../apps-and-modules/backup#backup-restore))
2. ✅ **Charge device** - Minimum 50% battery
3. ✅ **Verify bootloader unlockability** - Check your model and OEM unlock status; a greyed-out toggle can have different meanings by device
4. ✅ **Download necessary files** - Exact-build stock firmware and the selected root manager; a custom recovery is optional
5. ✅ **Research your device** - Read XDA forums and device-specific guides thoroughly
6. ✅ **Prepare recovery plan** - Know how to restore stock firmware via fastboot/recovery
7. ✅ **Identify correct partition** - Match the image, partition and slot to the device and root method, not the Android version alone

---

## Choosing a Root Method

**Magisk** offers broad compatibility and a large module ecosystem, **KernelSU** provides kernel-level root with per-app control, and **APatch** combines kernel patching with Magisk-like module support. Their standard installations normally require an unlocked bootloader. On some vulnerable builds, temporary-root loaders can instead provide session root while the bootloader remains locked, sometimes by late-loading KernelSU.

### Check Your Device First

For a locked bootloader, follow the separate [temporary-root guide](./root-without-unlocking-bootloader.md). For a standard installation, check these device details first:

1. **Bootloader** - Confirm that the exact model can be unlocked using its OEM instructions. The OEM Unlocking toggle can be greyed out for different reasons; unlocking normally wipes all data.
2. **Kernel type** - Official KernelSU LKM requires a supported GKI kernel and device. Older non-GKI kernels need a custom build, and variants have different requirements. Check the kernel with `adb shell uname -r` and verify compatibility in the Manager.
3. **Boot image** - Select the image required by your device and framework. Many Android 13+ devices put the generic ramdisk in `init_boot.img`, while the kernel remains in `boot.img`; APatch needs the kernel-containing `boot.img`. A wrong image can prevent root or booting.
4. **Kernel config (APatch only)** - APatch needs ARM64 with `CONFIG_KALLSYMS=y`. Check with `zcat /proc/config.gz | grep CONFIG_KALLSYMS` (needs root) or inspect your kernel source.
5. **Kernel source** - Non-GKI KernelSU builds require the exact kernel source for your device. If the vendor never published it, Magisk or APatch are the practical options.

### Quick Comparison

| Feature | Magisk | KernelSU | APatch | Temporary root |
|---------|---------|----------|---------|---------|
| **Guide** | [Magisk Guide](./magisk-guide.md) | [KernelSU Guide](./kernelsu-guide.md) | [APatch Guide](./apatch-guide.md) | [DirtyFrag and GhostLock](./root-without-unlocking-bootloader.md) |
| **Target Users** | Beginners, most users | GKI devices, privacy-focused | Developers, edge cases | Supported builds with a locked bootloader |
| **Architecture** | Systemless (boot/init_boot/vendor_boot or recovery) | Kernel-level (GKI/LKM) | Kernel patching (KernelPatch) | Exploit-based session; some loaders use KernelSU |
| **Android Support** | Check [upstream releases](https://github.com/topjohnwu/Magisk/releases) | Official support depends on a compatible GKI 2.0 kernel; older kernels need a custom build | ARM64, kernel 3.18 to 6.12 | Exact vulnerable device and build, not Android version alone |
| **Kernel Requirement** | A compatible bootable kernel | GKI 2.0 for LKM mode, custom build otherwise | CONFIG_KALLSYMS=y | Vulnerable kernel and compatible loader, profile or module |
| **Bootloader** | Normally unlocked | Normally unlocked for standard installation | Normally unlocked | Can stay locked on supported builds |
| **Installation** | Patch and flash the correct image | Patch and flash for standard LKM, or use a custom kernel | Patch and flash the kernel-containing `boot.img` | Run a matching loader without flashing a boot image |
| **Full Reboot** | Root returns with the required boot sequence; recovery installs need special steps | Root normally returns after standard installation | Root normally returns | Active root ends; some loaders can re-run it |
| **Module Ecosystem** | Largest module ecosystem | Some Magisk-format modules work; check compatibility and mounting requirements | APModule (Magisk-like) plus KPM (kernel-level) | Compatible session modules if supported; some loaders provide a shell only |
| **Module Mounting** | Built-in Magic Mount | Metamodule for system-file mounts; scripts can work without one | Built-in, Magisk-like | Depends on the loader and manager; early-boot stages may not run |
| **Root Hiding** | DenyList reverts modifications; separate modules may address detection | App Profiles and optional tools; no guarantee | SuperKey controls access; no guarantee | Locked bootloader alone does not guarantee Integrity or app compatibility |
| **Community** | Largest | Growing | Small | Depends on the loader and device |
| **Unique Strength** | Ecosystem and broad compatibility | Kernel space, only permitted apps see su | KPM kernel code injection without kernel source | No unlock needed on supported builds |
| **OTA Handling** | Re-patch the correct image or use a supported inactive-slot flow | Re-patch or use a supported inactive-slot flow | Re-patch boot image after OTA | An update can patch the exploit or break compatibility |

Temporary root is an access method, not a fourth framework. Some loaders late-load KernelSU on locked devices. A full reboot ends the active session, but files and settings changed during it may remain.

### Decision Guide

**Choose Magisk if:**
- You are new to rooting and want the easiest path
- You need the widest module compatibility and device support
- You want in-app updates and the largest community
- Your device has a non-GKI kernel without published kernel source

**Choose KernelSU if:**
- Your device runs a GKI 2.0 kernel (5.10+) and you want kernel-level root
- Fine-grained app profiles (uid, gid, groups, capabilities, SELinux) matter to you
- You want per-app control over root access and module mount visibility
- You are comfortable installing a metamodule for modules that modify /system

KernelSU variants such as KernelSU Next and SukiSU-Ultra add SUSFS integration and support for older kernels. See the comparison page for current options.

**Choose APatch if:**
- Magisk and KernelSU are blocked on your specific firmware
- You need kernel-level code injection (KPM) without kernel source
- Your device is ARM64 with a kernel in the 3.18 to 6.12 range and KALLSYMS enabled
- You want both Magisk-like modules and kernel patching in one tool

> [!IMPORTANT]
> For detailed comparison including migration guides and live release/commit badges, see [Root Framework Comparison](./root-framework-comparison.md)

> [!TIP]
> **Can't (or don't want to) unlock your bootloader?** On specific vulnerable builds, **DirtyFrag** or **GhostLock** can provide session-only root while it stays locked. A full reboot clears active root but may leave files and settings changed during the session; Knox and app compatibility are not guaranteed. See our sister project [Awesome Temporary Root](https://awesome-temporary-root.pages.dev/) for device/build sections, plus [Root Without Unlocking the Bootloader](./root-without-unlocking-bootloader.md) and [Temporary Root Solutions](./temporary-root-solutions.md).

---

## Universal Rooting Process

This four-step flow describes standard unlocked-bootloader installations, not [temporary root](./root-without-unlocking-bootloader.md). Image and partition selection is device- and framework-specific; APatch needs the kernel in `boot.img`. Check the exact firmware and instructions rather than choosing by Android version alone.

### Step 1: Unlock Bootloader

An unlocked bootloader is normally required for these installation methods. First back up your data, enable Developer Options and check the OEM unlock requirements for your exact model. Follow the manufacturer's device-specific unlocking procedure; not every device uses fastboot, and Samsung uses download mode.

> [!CAUTION]
> Unlocking normally **erases all data**. Installing Magisk or other custom images on Samsung can permanently trip Knox and disable Knox-dependent features.

**[📖 How to unlock an Android bootloader](./how-to-unlock-bootloader.md)**

### Step 2: Install Custom Recovery (Optional) {#step-2-install-custom-recovery-optional-but-recommended}

A custom recovery is not required for the usual Magisk or KernelSU image-patching workflow. Install or temporarily boot one only when a build and method are verified for your exact device. Modern layouts may lack a separate recovery partition, and a recovery may not decrypt `/data`.

Do not assume `fastboot flash recovery` or `fastboot boot` is supported. Check the device-specific instructions and recovery plan first: [Custom Recovery Installation Guide](./how-to-install-custom-recovery.md).

### Step 3: Install Root Solution

Choose and install your preferred root method. The modern approach uses boot image patching.

#### Option A: Magisk (Recommended for Most Users)

1. Download the official [Magisk APK](https://github.com/topjohnwu/Magisk/releases).
2. Identify the exact-build image that contains the ramdisk: `boot`, `init_boot`, `vendor_boot` or, on some devices, recovery. Do not choose by Android version alone.
3. Patch the image on the **same device**, then flash only to the verified partition and slot using the device's method. Samsung instead uses the patched AP-tar workflow and requires a first-install data wipe.
4. Reboot using the required sequence, complete setup, and explicitly grant trusted apps access in Magisk's Superuser tab.

**[📖 Complete Magisk Guide](./magisk-guide.md)**

#### Option B: KernelSU

1. Check the Manager's support status, the device's kernel/KMI and the exact firmware.
2. In LKM mode, patch the verified `boot` or `init_boot` image and flash it to the corresponding partition and slot. Other layouts need device-specific verification. GKI mode uses a compatible KernelSU-enabled kernel instead.
3. Open KernelSU Manager and configure root access. Install a compatible **metamodule** only for modules that need system-file mounts; script-only modules may work without one.
4. Follow the device-specific OTA and recovery procedure. Neither root persistence nor app compatibility is guaranteed.

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

1. **Verify root:** grant only a trusted test app access in your root manager. Current Magisk releases require an explicit Superuser grant before the app calls `su`.
2. **Back up important data:** keep an independent copy of the exact-build stock firmware and check what your backup tool can actually restore.
3. **Add modules selectively:** install one trusted module at a time. Enable Zygisk or a KernelSU metamodule only if a module requires it.
4. **Check app compatibility:** DenyList and App Profiles control different exposures but do not guarantee banking, Play Integrity or other app checks. See [Play Integrity troubleshooting](../troubleshooting.md#play-integrity-and-banking-apps).

**Recommended Next Steps:**
- [Block Ads System-Wide](../general-guides/android-adblocking.md)
- [Debloat Your Device](../general-guides/android-apps-debloating.md)
- [Install LSPosed / Vector Framework](./lsposed-guide.md)
- [Browse apps and modules](../apps-and-modules/)

---

## Device-Specific Guides

Detailed rooting instructions tailored for specific manufacturers and models. Device-specific steps and app screenshots can lag upstream: verify the current [Magisk](./magisk-guide.md) or [KernelSU](./kernelsu-guide.md) workflow, firmware, partition and recovery instructions before flashing.

### 📱 [Google Pixel Series](./how-to-root-pixel-phone.md)

### 📱 [Samsung Galaxy Series](./how-to-root-samsung-phone.md)

### 📱 [Xiaomi Devices](./how-to-root-xiaomi-phone.md)

### 📱 [OnePlus Devices](./how-to-root-oneplus-phone.md)

### 📱 [Motorola Devices](./how-to-root-motorola-phone.md)

### 📱 [Nothing Phone Series](./how-to-root-nothing-phone.md)

> [!TIP]
> **Can't find your device?** Check [XDA Developers Forums](https://forum.xda-developers.com/) or search device-specific Telegram groups. Most devices with unlockable bootloaders follow the universal process above.

> [!NOTE]
> **ASUS (ROG/Zenfone), Realme/OPPO:** Check the [Root Framework Comparison](./root-framework-comparison.md#device-guidance) for device-specific root method recommendations.

---

## Troubleshooting

### Common Issues and Solutions

**Device Won't Boot (Bootloop)**

Symptoms: Device stuck on boot logo, constantly rebooting

Solutions:
1. Stop flashing and identify the last change. If a module caused the bootloop, try the root method's own safe mode or recovery steps.
2. Restore the exact-build stock image to every affected partition and slot using the device-specific method. APatch uses `boot`, not `init_boot`.
3. If Magisk was installed on Samsung, do not restore individual stock partitions; follow its full-firmware recovery procedure.
4. See [emergency recovery](../troubleshooting.md#emergency-recovery) and seek device-specific help. Do not wipe cache or metadata as a first response.

**Root Not Detected**

Symptoms: Root checker shows no root, apps can't get superuser access

Solutions:
1. Verify the root manager shows an active installation.
2. Grant the trusted app access through the manager. Current Magisk releases require the grant before the app calls `su`.
3. Check whether an OTA replaced the patched image. If necessary, follow the framework and device guide to patch the correct image from the installed firmware.

**Banking Apps Not Working (Play Integrity)**

Symptoms: Apps detect root and refuse to run, Play Integrity check fails

> [!WARNING]
> Play Integrity bypass is a **cat-and-mouse game** - Google continuously updates detection. No solution is permanent.

Check the exact failing signal and the app's requirements. Magisk no longer offers app repackaging or built-in root hiding; DenyList and KernelSU App Profiles are not guarantees. Optional community modules and [SUSFS](./susfs-guide.md) have their own compatibility and security risks. See [Play Integrity troubleshooting](../troubleshooting.md#play-integrity-and-banking-apps) before adding modules or clearing app data.

> [!NOTE]
> **Strong Integrity** (required by some wallet/payment apps) is generally **not achievable** on unlocked bootloaders. Even with all fixes, some apps may refuse to run. Consider using a secondary unrooted device for critical banking.

**OTA Updates Failing**

Symptoms: System updates fail to install or cause bootloop

Solutions:
1. Follow the device- and framework-specific OTA procedure; do not assume root survives automatically.
2. On supported A/B devices, install the OTA completely without rebooting before using the manager's inactive-slot option. Magisk may require **Restore Images** before the OTA; see the [Magisk OTA guide](./magisk-guide.md#ota-system-updates).
3. Samsung and non-A/B devices require different procedures. If root is lost, use the correct image from the new build rather than flashing the old one.

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

If a module causes a bootloop, follow the method-specific rescue steps: [Magisk](./magisk-guide.md#managing-installed-modules), [KernelSU](./kernelsu-guide.md#recovery) or [APatch](./apatch-guide.md#bootloop-after-flash). Safe-mode timing and recovery availability differ; KernelSU `initrc` injections can still run in safe mode.

**Factory Reset Protection (FRP)**

FRP is an anti-theft lock that activates after a factory reset and requires the Google account that
was on the device. If you are locked out:

1. Sign in with the Google account that was previously synced to the device
2. If you no longer have access, use [Google account recovery](https://accounts.google.com/signin/recovery)
3. If the device was bought second-hand or you cannot prove ownership, contact the manufacturer
   with proof of purchase

There is no supported way around FRP on a device you cannot prove you own.

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
- 🔑 Keep the exact-build stock firmware and images needed for your device's recovery
- 🧪 Test one module at a time, reboot between installations
- 📋 Join device-specific Telegram/Discord communities for real-time help

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

Play Integrity is what most banking and DRM apps check, so root hiding matters after rooting. The
curated tools live in the [Root Hiding & Play Integrity category](../apps-and-modules/root-management#root-hiding-play-integrity),
and the current module stack and configuration steps are documented in
[Play Integrity and Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps).

> [!TIP]
> Check the tool list first, then follow the troubleshooting page for your root framework.

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
- **Root method and installed version** as shown in the manager
- **Modules installed** (list all active Magisk/KernelSU/APatch modules)
- **Exact error messages** (screenshots or copy-pasted text)
- **Steps already tried** (so helpers don't suggest things you've done)
- **Screenshots** of error states if applicable

---
