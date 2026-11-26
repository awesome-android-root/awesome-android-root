---
layout: doc
title: Custom ROM Installation Guide
description: "Master guide to install custom Android ROMs - LineageOS, GrapheneOS, Pixel Experience, CalyxOS. Transform your device with privacy-focused alternatives."
head:
  - - meta
    - property: og:title
      content: Custom ROM Installation Guide - Android Alternatives
  - - meta
    - property: og:description
      content: Install custom Android ROMs with our comprehensive guide covering LineageOS, GrapheneOS, Pixel Experience and privacy-focused alternatives.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/custom-rom.png
  - - meta
    - name: twitter:title
      content: Custom ROM Installation Guide - Android Alternatives
  - - meta
    - name: twitter:description
      content: Install custom Android ROMs like LineageOS, GrapheneOS, Pixel Experience with step-by-step guide.
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/custom-rom.png
  - - meta
    - name: twitter:image:alt
      content: Custom ROM Installation Guide - LineageOS, GrapheneOS & More
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Modification
  - - meta
    - property: article:tag
      content: Custom ROM
  - - meta
    - property: article:tag
      content: LineageOS
  - - meta
    - property: article:tag
      content: GrapheneOS
  - - meta
    - property: article:tag
      content: Android Privacy
  - - meta
    - name: robots
      content: index, follow
---

# Complete Custom ROM Installation Guide

**Transform your Android experience** - Install privacy-focused, security-enhanced custom ROMs to revive and enhance your device.

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md)** - Universal rooting principles and safety
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - Required first step
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - Installation prerequisite
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions for common issues

---

## Table of Contents
- [Understanding Custom ROMs](#understanding-custom-roms)
  - [Why Choose Custom ROMs?](#why-choose-custom-roms)
  - [ROM Categories](#rom-categories)
- [Prerequisites and Requirements](#prerequisites-and-requirements)
    - [Essential Prerequisites](#essential-prerequisites)
    - [Required Tools](#required-tools)
    - [Device Preparation](#device-preparation)
- [ROM Selection Guide](#rom-selection-guide)
- [Installation Process](#installation-process)
- [Post-Installation Setup](#post-installation-setup)
- [Troubleshooting Guide](#troubleshooting-guide)
- [Staying Updated](#staying-updated)


## Understanding Custom ROMs

Custom ROMs are alternative Android distributions that replace your device’s stock firmware, offering enhanced privacy, performance, and customization.

### Why Choose Custom ROMs?

- **Extended device lifespan** - updates beyond OEM EOL
- **Enhanced privacy** - reduced tracking/telemetry
- **Bloatware-free** - clean system without vendor apps
- **Performance gains** - better battery, responsiveness
- **Deep customization** - theming, features, system tweaks
- **Faster security patches** - community-maintained
- **Optional Google services** - choose microG/sandboxed Play/none

<!-- Preserve incoming links to consolidated sections. -->
<span id="privacy-security-focused"></span>
<span id="general-use-features"></span>
<span id="gaming-performance"></span>

### ROM Categories

These are project references, not rankings. Availability, update cadence and supported hardware vary by device:

| Project | Focus | Device/build information |
|---------|-------|--------------------------|
| [LineageOS](https://lineageos.org/) | Android distribution with device-specific builds | [Official device list and installation guides](https://wiki.lineageos.org/devices/) |
| [GrapheneOS](https://grapheneos.org/) | Privacy and security-focused Android distribution | [Supported devices and installation](https://grapheneos.org/install/) |
| [CalyxOS](https://calyxos.org/) | Privacy-focused Android distribution | [Device support and installation](https://calyxos.org/install/) |
| [crDroid](https://crdroid.net/) | Android customization | Check the project's current device downloads and maintainer instructions |
| [PixelOS](https://pixelos.net/) | Pixel-style Android experience | Check the project's current device downloads and maintainer instructions |

**Pixel Experience is not an active recommendation here.** Its [manifest repository](https://github.com/PixelExperience/manifest) is archived (checked 2026-11-26). An old download or unofficial continuation is not evidence of current official maintenance.

::: warning BOOTLOADER RELOCKING
Relock only when the ROM's exact-device installation instructions explicitly support it, with the required signed images installed. GrapheneOS documents its own relocking procedure; do not generalize it to other ROMs or devices.
:::

---

## Critical Warnings

::: danger ⚠️ **Custom ROM Risks**
- **Warranty implications** - may void warranty depending on region (statutory warranty rights may still apply in some jurisdictions)
- **Brick risk** - wrong images or wrong partition can hard-brick
- **App compatibility** - Banking/government apps rely on Play Integrity and may refuse to run
- **Your responsibility** - updates, security patches, backups, and recovery
- **Bootloader re-locking** - relocking on unsupported ROMs can hard-brick; only relock when ROM explicitly supports AVB 2.0 with proper vbmeta signing
:::

---

## Prerequisites and Requirements

### Essential Prerequisites
1. **[Unlocked bootloader](./how-to-unlock-bootloader.md)**
2. **Documented installation method** - use the ROM's exact-device instructions. This may involve its own recovery, fastboot, sideloading or another device-specific process; independently installing TWRP/OrangeFox is not a universal prerequisite.
3. **Compatible ROM** - for your exact device codename/variant
4. **Backup everything** - consider both a NANDroid (if supported) and app/data backups
5. **Stock firmware on hand** - for emergency restore (EDL/Odin/Mi Flash/fastboot images)

### Required Tools
- **Latest Android Platform Tools (ADB/Fastboot**) from Google
- **USB drivers (Windows)**: OEM or Google USB Driver
- **Recovery image/installer** only if required by the ROM's device-specific method; use the named recovery, not an interchangeable alternative
- **ROM ZIP/Images** + optional GApps (see notes below)
- **A computer** (Windows/macOS/Linux) and reliable USB cable

### Device Preparation
- **Charge to 70%+**
- **Use a quality USB cable/port**
- **Back up user data** (Photos, 2FA/keys, eSIM details where applicable)
- **Note device info:** model, region, codename, current firmware/Android version
- **Disable screen lock** before recovery if your recovery can’t decrypt data
- **Remove Google/Samsung/Xiaomi accounts** where FRP/anti-theft may interfere

---

## ROM Selection Guide

### Decision Matrix

| Check | Selection criterion |
|-------|---------------------|
| Exact device support | Model, codename, region and carrier variant appear in the project's supported targets |
| Official builds | Download is linked by the project and its authenticity can be verified |
| Active maintenance | Device has recent releases and security updates, with known limitations documented |
| Firmware prerequisites | Required base firmware and anti-rollback constraints can be satisfied without an unsafe downgrade |
| Installation and recovery | Current exact-device instructions and a stock recovery path are available |
| App requirements | Required camera, IMS, banking/work apps and optional Google services are compatible with the intended setup |

Use only the GApps package and installation order named by the ROM's device guide. Some builds bundle services and others do not; do not add a second package or infer compatibility from another ROM.

### Device Compatibility Check

#### Find your device:
1. [CustomROMBay.org](https://customrombay.org/)
2. [XDA Forums](https://forum.xda-developers.com/)
3. Official ROM websites

#### Verify model/codename:
- Settings → About Phone → Model
- adb shell getprop ro.product.device (codename)
- fastboot getvar product
- Beware of regional/carrier variants (e.g., SM-G991B ≠ SM-G991U)
- Xiaomi anti-rollback (ARB) can brick if you flash older firmware - always match required base firmware

---

## Installation Process

The ROM's device guide is authoritative. The following describes common stages, not a universal command sequence. Install a recovery only when that guide requires it. Common flows include:
- **Recovery-based** (TWRP/OrangeFox/Lineage Recovery) via Install or ADB Sideload
- **Fastboot-based** (images/graphical web installers) - common for Pixels/GrapheneOS

### Step 1: Create Complete Backup

#### Backups on modern devices:
- TWRP/OrangeFox NANDroid may not fully support dynamic partitions on every device; verify your recovery’s backup/restore capability.
- Consider Seedvault (LineageOS), Swift Backup (root), or manual data backups.
- Never wipe persist/modem/EFS; losing these can break Wi‑Fi, sensors, IMEI.

#### Actions:
1. Make app/data and file backups before unlocking or installing anything.
2. If a compatible recovery is already available and its device guide supports backup/restore, also back up the documented partitions. Installing a recovery is not required just to follow this checklist.
3. Copy backups to PC or external storage and verify them.

### Step 2: Download ROM Files

- ROM ZIP/images for your exact device/codename
- GApps (if needed; e.g., MindTheGapps for LineageOS or NikGapps)
- Required firmware/vendor packages (Xiaomi/OnePlus often require specific base firmware)
- Optional: Magisk/KernelSU/APatch, custom kernel, modules

**Verify downloads:**
- Prefer SHA-256 over MD5
- Check release signatures/digests when provided
- Ensure Android version/firmware requirements match your device

### Step 3: Prepare Device

- Transfer ROM and add-ons to device/SD card or prepare to ADB sideload from PC
- Enter the mode named by the ROM's exact-device guide (its recovery, bootloader, installer or fastbootd). Do not install or boot TWRP/OrangeFox unless explicitly required.
- Use the documented mode transitions; bootloader fastboot and userspace fastbootd are not interchangeable.

### Step 4: Wipe / Format

::: warning ⚠️ Data Loss Warning
Switching ROM families or coming from stock usually requires a full “Format Data” (not just factory reset), which erases internal storage. Back up first.
:::

Perform **only** the wipes/formats required by the ROM's exact-device instructions. Do not manually wipe System, Vendor, Super, metadata or calibration partitions as a generic clean-install step, and do not assume updates within one ROM family permit a dirty flash.

If recovery cannot decrypt data, use the documented sideload or external-storage path. Format Data only when the installation guide requires it and after an off-device backup; it erases user data and is not a generic decryption repair.

### Step 5: Flash Custom ROM

Recovery install (typical):
1. Install → Select ROM ZIP → Swipe/confirm
2. Immediately flash GApps (if using a vanilla ROM). GApps must be flashed before first boot.
3. Flash add-ons: Magisk (root), KernelSU (kernel-based root), custom kernels, etc.

#### ADB sideload (LineageOS/others):
1. In recovery: Apply Update → Apply from ADB
2. On PC: adb sideload rom.zip
3. Then: adb sideload gapps.zip (if needed)
4. Then: adb sideload addons (e.g., Magisk ZIP if supported by your recovery)

#### Fastboot images (Pixel/GrapheneOS/Some ROMs):
- Use the vendor’s install script or web installer (see ROM-specific section)
- For dynamic partitions, the script may reboot to fastbootd automatically
- Never mix init_boot/boot images incorrectly; follow device-specific docs

#### AVB/vbmeta (advanced):
- Only disable verity/verification if your device/ROM instructions explicitly say so.
- Incorrect vbmeta steps can cause boot failure or brick.

#### A/B slots:

Follow the ROM installer's slot handling. Record the selected slot when required, but do not activate the other slot or flash both as a generic fix. Images and required firmware must match the intended slot; a partially updated slot may not boot.

### Step 6: First Boot & Setup

- First boot can take 5–20 minutes; don’t interrupt
- Complete setup wizard
- Validate basics: Wi‑Fi, mobile data, calls/SMS, camera, sensors, fingerprint, NFC, Bluetooth, GPS
- For eSIM: activation may be cleared by wipes; check with your carrier before wiping

---

## ROM-Specific Installation

### GrapheneOS (Pixel Only)

Web Installer method:
1. Visit https://grapheneos.org/install/web
2. Use Chrome/Chromium (WebUSB)
3. Follow the guided process (handles fastboot/fastbootd, images, and slotting)
4. No custom recovery required

Benefits: Maximum security posture, verified boot, hardened toolchain, Sandboxed Google Play (optional)

Bootloader: Can safely relock on GrapheneOS. Do not relock on ROMs that don’t explicitly support it.

### LineageOS (Most Devices)

Standard method:
1. Download official builds: https://download.lineageos.org/
2. Use only the recovery and version named in the exact-device guide; do not substitute TWRP/OrangeFox
3. ADB sideload recommended by Lineage docs
4. Use MindTheGapps (recommended) or a compatible GApps package if needed
5. Seedvault backup integration available

Benefits: Broad support, stable updates, trustable infrastructure

### Pixel Experience / PixelOS

Pixel Experience's archived manifest is not an active installation source. For [PixelOS](https://pixelos.net/), check the current official device list, release date and exact-device installation instructions. Do not reuse Pixel Experience installation steps, assume Google apps are bundled or promise monthly patches across devices.

---

## Post-Installation Setup

### Essential Configuration
- Run updates (Settings → System → Updater)
- Restore data (Seedvault, Swift Backup, app-native backups)
- Review permissions and privacy settings
- Configure IMS (VoLTE/VoWiFi/5G) if your carrier/ROM supports it

### Privacy Optimization
- Disable telemetry/analytics in ROM and apps
- Private DNS (e.g., dns.adguard.com, 1.1.1.1, NextDNS)
- Consider F-Droid, Obtainium, Aurora Store for privacy-friendly app sourcing
- Use a reputable firewall (e.g., NetGuard) and limit background activity
- Be mindful: aggressive adblocking/VPNs may break push notifications; exclude FCM if needed

### App Installation
- F-Droid - open-source apps
- Aurora Store - access Play Store without Google account
- APKMirror - verify signatures; prefer official dev sources where possible

### Banking/Government Apps
- Many now enforce Play Integrity API (hardware-backed attestation).
- Magisk DenyList helps hide root from selected apps; Shamiko and “Play Integrity Fix” modules exist but may violate app ToS and are not guaranteed to work.
- Respect local laws and app ToS. If mission-critical, consider a non-rooted, stock or relockable-secure ROM profile/device.

---

## Troubleshooting Guide

### Common Installation Issues

#### Bootloop / Stuck on logo:
- Confirm correct ROM for exact codename/variant
- Format Data (not just wipe) if switching ROM families
- Reflash ROM + correct GApps
- Ensure required base firmware/vendor is installed
- Check active slot; try switching slots
- Last resort: restore backup or reflash stock

#### Decryption issues in recovery:
- Use the ROM’s recovery + ADB sideload
- Remove screen lock before flashing (if safe)
- Update to a recovery build that supports your Android version

#### Missing features (camera/IMS/sensors):
- Flash/update required vendor/firmware package
- Check device thread for proprietary blobs/camera fixes
- IMS provisioning varies; some ROMs include toggle/tools

#### Performance/battery issues:
- Clean flash if coming from a different ROM
- Let the ROM settle 1–3 charge cycles (indexing)
- Update kernel/ROM; consider a known-stable kernel for your device
- Reduce animations; restrict misbehaving apps

#### Play Integrity/SafetyNet:
- Many custom setups won’t pass strong integrity. Basic/weak may be achievable.
- Passing strong integrity on unlocked devices is typically not possible by design.

### Recovery Solutions

#### Emergency Recovery:
1. Boot to bootloader/fastboot
2. For dynamic partitions: fastboot reboot fastboot (fastbootd) if needed
3. Flash stock images (Pixel: flash-all; Xiaomi: Mi Flash; Samsung: Odin)
4. Qualcomm EDL (9008) is last resort; research carefully or seek professional help

#### Backup Restoration:
1. Boot to recovery
2. Restore NANDroid (if supported/consistent with current partition layout)
3. Or reflash ROM and restore app data from Seedvault/Swift Backup

---

## Staying Updated

### Update Strategies

- **Manual updates:**
  - Track official releases/Telegram/XDA/GitHub
  - Dirty flash within same ROM family is usually fine for monthly updates
  - Clean flash for major Android version jumps or when advised

- **OTA updates:**
  - Many ROMs support seamless A/B OTAs
  - LineageOS/Pixel Experience often include an Updater app
  - If using custom recovery, ensure OTA compatibility (virtual A/B may sidestep recovery entirely)

### Community Resources

- [XDA Developers](https://forum.xda-developers.com/) - device forums, guides, kernels
- [r/LineageOS](https://reddit.com/r/LineageOS) - user discussions
- [GitHub Issues](https://github.com/LineageOS) - bugs and development
- [FAQ](../faqs.md) · [Troubleshooting](../troubleshooting.md)
- [Join Community](../about.md#community-and-contributions)

Official Resources:
- [CustomROMBay.org](https://customrombay.org/)
- [Pixel Experience Telegram](https://t.me/s/pixelexperience)

---

::: tip 💡 **Custom ROM Success Tips**
- Always keep a known-good backup and stock firmware handy
- Read your device’s XDA/official thread end-to-end before flashing
- Use the ROM-recommended recovery and GApps
- Never relock your bootloader unless the ROM explicitly supports AVB re-lock
- Verify checksums/signatures for every download
:::

Next, compare [root methods](./root-framework-comparison.md), browse [kernel-management tools](../apps-and-modules/performance#kernel-management), or follow the [LSPosed guide](./lsposed-guide.md) if you need those optional features.
