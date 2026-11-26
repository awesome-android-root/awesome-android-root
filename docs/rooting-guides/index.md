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

Root access grants **superuser (administrator) privileges** within Android. The device's boot chain, kernel, SELinux policy and root solution still impose limits; root does not unlock every hardware feature or security boundary.

### What Root Enables

- Gain elevated access to supported portions of the Android system.
- Modify system behavior where the device, boot chain, kernel and root solution permit it.
- Access functions otherwise restricted to privileged processes.
- Use [root-dependent tools and system modifications](../apps-and-modules/), including supported backup, firewall and module workflows.

### Benefits vs Risks

| Potential benefit | Limit or risk |
|-------------------|---------------|
| Privileged system modifications | Incorrect images, policies or modules can cause boot failure or data loss |
| [Ad blocking](../general-guides/android-adblocking.md), firewalls and permission tools | Root granted to an untrusted app can expose data and bypass protections |
| Supported app/data backups and tuning | Hardware, kernel, encryption and app restrictions still apply |
| Root-dependent modules | Banking, work, DRM and Play Integrity checks may reject the device |
| Persistent root on supported firmware | OTAs may replace patched images and require a device-specific update procedure |

**Warranty and unlocking are separate questions.** Bootloader unlocking and root installation are different modifications; either may affect manufacturer service terms. Consequences depend on manufacturer, model, country and the modification involved, and local statutory consumer protections may still apply. Some Samsung modifications trip a permanent Knox hardware warranty bit; this is not a universal consequence of Android root. Check [unlocking risks](./how-to-unlock-bootloader.md) and the [Samsung guide](./how-to-root-samsung-phone.md) for those distinctions.

### Is Rooting Right for You?

Proceed only if a root-dependent task justifies the maintenance and security tradeoffs, you have a supported device and you can recover it. If you rely on apps that reject modified devices or cannot tolerate a wipe or downtime, keep the device stock or use a separate test device.

---

## Prerequisites and Safety

### Critical Warnings

::: danger BEFORE MODIFYING THE DEVICE
Back up before unlocking or flashing: unlocking normally erases user data. Wrong images, partitions, slots or rollback levels can prevent booting. Root and modules can change persistent data even after root is removed. Keep matching stock firmware off-device and know the exact-model recovery procedure.

Read the [bootloader guide](./how-to-unlock-bootloader.md) for unlock consequences and restrictions. Permanent Knox effects are covered in the [Samsung guide](./how-to-root-samsung-phone.md); warranty terms are not universal.
:::

### Essential Requirements

This is the canonical preparation checklist for the framework and manufacturer guides. A custom recovery is **optional**, and only needed when the chosen device-specific method requires it.

### Pre-Rooting Checklist

1. **Identify the target:** record exact model, codename, carrier/region, firmware build and kernel; verify unlock eligibility and upstream framework requirements.
2. **Back up off-device:** copy photos, app data where supported, authenticator recovery codes and other irreplaceable data. Confirm what can actually be restored.
3. **Prepare the connection:** charge to at least 50%, use a reliable data cable and computer, and install current [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) plus [OEM USB drivers](https://developer.android.com/studio/run/oem-usb) if required. Follow the [bootloader guide's setup](./how-to-unlock-bootloader.md) for ADB/Fastboot.
4. **Obtain matching files:** download the selected manager from upstream and exact-build stock firmware for the model and region. Keep original images and the complete restore package off-device.
5. **Verify the method:** use the [manufacturer guide](#device-specific-guides) and framework instructions to identify the image, destination partition, intended slot and anti-rollback requirements. Do not choose by Android version alone.
6. **Plan failure recovery:** know the hardware boot-mode sequence, the device-specific stock restore procedure and any tool/account restrictions. If the required files or recovery path are unavailable, stop.

---

## Choosing a Root Method

<span id="check-your-device-first"></span>
<span id="quick-comparison"></span>
<span id="decision-guide"></span>

Use the [framework comparison](./root-framework-comparison.md) to compare installation models, requirements and tradeoffs. Verify current upstream requirements before choosing Magisk, KernelSU or APatch; an unlockable bootloader alone does not establish compatibility.

If the bootloader must remain locked, use the separate [temporary/session-root guide](./root-without-unlocking-bootloader.md). It applies only to explicitly supported vulnerable builds and is not a fallback flashing method.

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

Use the selected framework's installation guide with the manufacturer-specific requirements. These are separate workflows, not interchangeable patch/flash recipes.

#### Option A: Magisk (Recommended for Most Users)

Follow the [Magisk guide](./magisk-guide.md), especially [image selection](./magisk-guide.md#step-1-download-required-files). It may use `boot`, `init_boot`, `vendor_boot` or recovery depending on the device; Samsung uses a distinct AP-tar/Download Mode workflow.

#### Option B: KernelSU

Follow the [KernelSU guide](./kernelsu-guide.md). Verify the selected variant, kernel/KMI, manager and LKM or integrated-kernel method before installation.

#### Option C: APatch

Follow the [APatch guide](./apatch-guide.md) and official requirements. It patches the **kernel-containing `boot.img`**, not `init_boot`; the presence of a separate ramdisk partition does not change that target.

### Step 4: Post-Root Configuration

1. **Verify root:** grant only a trusted test app access in your root manager. Current Magisk releases require an explicit Superuser grant before the app calls `su`.
2. **Back up important data:** keep an independent copy of the exact-build stock firmware and check what your backup tool can actually restore.
3. **Add modules selectively:** follow [module safety](#module-safety). Enable Zygisk or a KernelSU metamodule only if a module requires it.
4. **Check app compatibility:** DenyList and App Profiles control different exposures but do not guarantee banking, Play Integrity or other app checks. See [Play Integrity troubleshooting](../troubleshooting.md#play-integrity-and-banking-apps).

**Recommended Next Steps:**
- [Block Ads System-Wide](../general-guides/android-adblocking.md)
- [Debloat Your Device](../general-guides/android-apps-debloating.md)
- [Install LSPosed / Vector Framework](./lsposed-guide.md)
- [Browse apps and modules](../apps-and-modules/)

---

### Module Safety

- Install only modules from sources you trust, after checking framework, device and build requirements. Modules execute privileged code and can alter persistent files.
- Add one module at a time, reboot when required and test before adding another. Keep a record and a recoverable copy of configuration.
- Learn the framework's module-disable/safe-mode procedure **before** testing. A reboot or uninstall does not necessarily undo data changes. See [troubleshooting](../troubleshooting.md) for diagnosis and recovery.

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

For failure diagnosis, use [troubleshooting](../troubleshooting.md): [bootloops](../troubleshooting.md#emergency-recovery), root permission failures, USB detection and [Play Integrity/app compatibility](../troubleshooting.md#play-integrity-and-banking-apps). Check the relevant framework's rescue steps before trying a wipe or firmware flash.

### Emergency Recovery

Stop making changes and identify the last image, slot or module changed. Use the exact-device restore procedure and matching firmware; do not switch slots or flash another partition at random. Samsung Magisk installations may require full-firmware recovery, not individual stock images. Continue with [emergency recovery](../troubleshooting.md#emergency-recovery) or your [manufacturer guide](#device-specific-guides).

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
