---
layout: doc
title: Magisk vs KernelSU vs APatch
description: Detailed comparison of Magisk, KernelSU, and APatch root frameworks with practical recommendations and migration notes.
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.pages.dev/rooting-guides/root-framework-comparison
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:site_name
      content: Awesome Android Root
  - - meta
    - property: og:title
      content: Magisk vs KernelSU vs APatch - Which Root Method is Best in 2026?
  - - meta
    - property: og:description
      content: Practical comparison of Android root frameworks with recommendations, risks, and migration notes.
  - - meta
    - property: og:url
      content: https://awesome-android-root.pages.dev/rooting-guides/root-framework-comparison
  - - meta
    - property: og:image
      content: https://awesome-android-root.pages.dev/images/og.png
  - - meta
    - property: og:image:secure_url
      content: https://awesome-android-root.pages.dev/images/og.png
  - - meta
    - property: og:image:alt
      content: Magisk vs KernelSU vs APatch - Root Framework Comparison
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
    - property: og:locale
      content: en_US
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:site
      content: "@awsm_and_root"
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: Magisk vs KernelSU vs APatch - Root Framework Comparison
  - - meta
    - name: twitter:description
      content: Practical comparison of Android root frameworks with recommendations, risks, and migration notes.
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.pages.dev/images/og.png
  - - meta
    - name: twitter:image:alt
      content: Root Framework Comparison - Magisk vs KernelSU vs APatch
  - - meta
    - name: keywords
      content: magisk vs kernelsu, apatch vs magisk, android root framework comparison, kernel root android, best android root method
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Rooting
  - - meta
    - property: article:tag
      content: Magisk
  - - meta
    - property: article:tag
      content: KernelSU
  - - meta
    - property: article:tag
      content: APatch
  - - meta
    - property: article:tag
      content: Root Framework Comparison
  - - meta
    - property: article:published_time
      content: 2025-06-01T00:00:00Z
  - - meta
    - property: article:modified_time
      content: 2026-06-05T00:00:00Z
  - - meta
    - name: robots
      content: index, follow
---

# Magisk vs KernelSU vs APatch

Root frameworks change quickly. Use this page to choose a method, then verify device-specific instructions and current requirements in the official docs before flashing anything.

**Related guides:** 
- [Main Rooting Guide](./index.md)
- [Magisk Guide](./magisk-guide.md)
- [KernelSU Guide](./kernelsu-guide.md)
- [APatch Guide](./apatch-guide.md)

::: warning Before you root
Unlocking the bootloader usually wipes data, weakens device security, and can break OTA, warranty, DRM, wallet, banking, and work-profile apps. Keep a stock firmware package and recovery plan ready.
:::

## Quick recommendation

| If you want... | Choose | Why |
|---|---|---|
| The safest default for most devices | **Magisk** | Broad compatibility, largest module ecosystem, easiest troubleshooting |
| Kernel-level root with strong per-app control | **KernelSU** | Root runs in kernel space; App Profiles can restrict UID, groups, capabilities, and SELinux rules |
| A KernelPatch-based alternative | **APatch** | Useful on compatible ARM64 devices, especially when you want APModule/KPModule support |
| Maximum reliability for banking, wallet, enterprise, or anti-cheat apps | **No root** | No framework can guarantee Play Integrity or app-specific checks |

## Quick comparison

| Area | Magisk | KernelSU | APatch |
|---|---|---|---|
| **Install model** | Patches the correct boot-related image for your device | Uses a supported kernel path, usually GKI/LKM or a built kernel | Patches the stock `boot.img` using KernelPatch |
| **Best for** | Beginners, daily drivers, module-heavy setups | Power users, developers, supported GKI/custom kernels | Advanced users and edge cases |
| **Main requirement** | Unlocked bootloader + exact stock image | Supported kernel/KMI path; Manager must show support | ARM64 + KernelPatch-compatible kernel + required KALLSYMS config |
| **Modules** | Magisk modules, Zygisk modules | Metamodule-based system; many Magisk modules need a compatible metamodule | APModule plus KPModule for kernel-level code |
| **Root control** | App-based MagiskSU prompts | App Profiles with fine-grained privileges | SuperKey-based access control |
| **Hiding / integrity** | Community tooling only; no guarantees | Often less visible to apps, but no guarantee | Often less visible to apps, but no guarantee |
| **OTA behavior** | Usually needs restore/re-patch or inactive-slot flow | LKM setups can be more OTA-friendly, but not guaranteed | OTA support depends on device and install path |
| **Troubleshooting** | Easiest; largest community | Medium; kernel knowledge helps | Hardest; smaller ecosystem |
| **Latest Version** | ![GitHub Release](https://img.shields.io/github/v/release/topjohnwu/Magisk) | ![GitHub Release](https://img.shields.io/github/v/release/tiann/KernelSU) | ![GitHub Release](https://img.shields.io/github/v/release/bmax121/APatch) |

## Framework notes

### Magisk

**Best default.** Magisk is the most mature and widely documented root solution. It provides MagiskSU, Magisk modules, MagiskBoot, and optional Zygisk for running code in app processes.

**Use Magisk when:**
- You are rooting for the first time.
- You need the highest chance that guides, modules, and fixes already exist for your device.
- You want the simplest recovery path if a module bootloops the device.

**Watch out for:**
- You must patch the correct image for your device (`boot.img`, `init_boot.img`, or recovery image depending on layout).
- Do not flash patched images made by someone else.
- Root hiding is not a built-in guarantee; Play Integrity and app detections change constantly.

### KernelSU

**Best for supported kernels.** KernelSU grants root from kernel space and lets only permitted apps access or see `su`. Its App Profiles allow tighter control than classic app-based superuser prompts.

**Use KernelSU when:**
- Your device/kernel is supported, or you can build/use a trusted KernelSU-enabled kernel.
- You want fine-grained root profiles and kernel-level control.
- You are comfortable with KMI, boot images, and kernel-specific recovery.

**Watch out for:**
- Module mounting is handled by metamodules, so fresh installs need a suitable metamodule for systemless modifications.
- Kernel/KMI mismatch can bootloop.
- Some OEM security stacks and kernels may block specific install modes.

### APatch

**Best as an advanced alternative.** APatch is KernelPatch-based, runs root control in kernel space, and supports APModule plus KPModule for kernel code injection.

**Use APatch when:**
- Your ARM64 device meets APatch requirements.
- You specifically need APModule/KPModule or KernelPatch behavior.
- Magisk or KernelSU is not a good fit for your firmware.

**Watch out for:**
- APatch patches `boot.img`; do not patch `init_boot.img` or random images.
- SuperKey is higher-risk than a normal root password: use a strong, private key.
- Compatibility depends heavily on kernel config and device/OEM behavior.

## Device guidance

Choose by **bootloader unlockability, firmware availability, kernel support, and recovery options** - not by brand alone.

| Device family | Practical guidance |
|---|---|
| **Google Pixel** | Magisk is usually easiest. KernelSU is good if a supported kernel path exists. |
| **Samsung Galaxy** | Research carefully. Installing root can permanently trip Knox-related protections, and some regional variants cannot unlock. KernelSU LKM may not work on Knox-protected devices. |
| **Xiaomi / Redmi / POCO** | Magisk is the usual starting point. KernelSU/APatch depend on ROM, kernel, and bootloader status. |
| **OnePlus / Nothing** | Generally root-friendly when unlockable; Magisk first, KernelSU if the kernel path is supported. |
| **Motorola / ASUS** | Unlock policy and firmware access vary by model/region. Keep exact stock images before flashing. |
| **OPPO / Realme / vivo / Honor** | Bootloader access is often the main blocker. Verify current regional policy before planning root. |

::: danger Samsung Knox
On Knox-protected Samsung devices, rooting/custom binaries can permanently break Knox-dependent features such as Samsung Wallet/Pay, Secure Folder, and Samsung Pass. Relocking or flashing stock firmware normally does not restore them.
:::

## Play Integrity and root detection

No root framework can promise that banking, wallet, streaming, work-profile, or anti-cheat apps will keep working.

- **Basic checks** may pass or fail depending on ROM, fingerprint, root traces, and current detections.
- **Device/strong integrity** are much harder because they depend on Google/OEM trust signals such as verified boot state, certified firmware, and hardware-backed proof.
- Community modules may help temporarily, but they are a cat-and-mouse game. Do not buy a device or choose a framework based only on bypass claims.

If those apps matter more than root, keep one unrooted phone.

## Safe install checklist

Before installing or migrating:

- [ ] Back up internal storage and app data.
- [ ] Download the exact current firmware for your build.
- [ ] Save stock `boot.img`, `init_boot.img`, `vendor_boot.img`, `vbmeta.img`, and recovery image if present.
- [ ] Confirm bootloader unlock steps and whether unlock wipes data.
- [ ] Confirm fastboot/download-mode access and restore commands.
- [ ] Read your device forum/group for known bootloops, slot issues, and OTA quirks.
- [ ] Install only one root framework at a time.

## Migration guide

::: warning Do not stack root frameworks
Switch cleanly. Mixing patched images, modules, and managers from multiple frameworks is a common cause of bootloops and broken OTAs.
:::

### Magisk → KernelSU

1. Export module list and app root settings.
2. Disable/uninstall risky modules.
3. Restore stock boot-related image or fully uninstall Magisk.
4. Install the KernelSU-compatible kernel/LKM path for your device.
5. Install KernelSU Manager.
6. Install a compatible metamodule if you need systemless modules.
7. Reinstall modules one at a time and configure App Profiles.

### Magisk → APatch

1. Back up and keep your current stock `boot.img`.
2. Fully uninstall Magisk or restore stock boot image.
3. Patch the stock `boot.img` with APatch Manager.
4. Set a strong SuperKey and keep it private.
5. Flash the patched `boot.img`.
6. Test root before adding modules.

### KernelSU/APatch → Magisk

1. Remove modules and document app permissions.
2. Restore stock boot-related images or flash the ROM's clean kernel/boot image.
3. Patch the correct image with Magisk on the target device.
4. Flash, boot, then reinstall only needed modules.

## Decision checklist

Pick **Magisk** if any of these are true:
- You are new to rooting.
- You rely on many Magisk/Zygisk modules.
- You want the largest support community.
- You are unsure what kernel your device uses.

Pick **KernelSU** if all of these are true:
- Your device has a known-good supported kernel path.
- You understand KMI/kernel compatibility.
- You want stronger per-app root isolation and profiles.

Pick **APatch** if all of these are true:
- Your device is ARM64 and APatch-compatible.
- You understand the SuperKey risk.
- You need APModule/KPModule or KernelPatch features.

Pick **no root** if:
- Banking/wallet/enterprise/anti-cheat reliability matters more than customization.
- You cannot restore stock firmware yourself.
- Losing data or warranty is unacceptable.

## FAQ

**Which is best overall?**  
Magisk for most users. KernelSU for supported-kernel power users. APatch for advanced KernelPatch use cases.

**Which hides root best?**  
None reliably. Kernel-level approaches can reduce some userspace traces, but modern apps use many signals beyond `su` visibility.

**Do Magisk modules work on KernelSU/APatch?**  
Some do, some do not. Mounting method, Zygisk needs, SELinux changes, and service scripts matter. Test one module at a time.

**Will OTA updates work?**  
Sometimes. Always assume root may need to be restored after OTA and keep stock images for both slots when relevant.

**Can I relock the bootloader after rooting?**  
Usually no. Relocking with modified partitions can brick or wipe the device. Return fully stock first and follow device-specific instructions.

## Official resources

- **Magisk:** [GitHub](https://github.com/topjohnwu/Magisk) · [Docs](https://topjohnwu.github.io/Magisk/) · [Install guide](https://topjohnwu.github.io/Magisk/install.html)
- **KernelSU:** [GitHub](https://github.com/tiann/KernelSU) · [Docs](https://kernelsu.org/) · [Installation](https://kernelsu.org/guide/installation.html) · [Metamodules](https://kernelsu.org/guide/metamodule.html)
- **APatch:** [GitHub](https://github.com/bmax121/APatch) · [Docs](https://apatch.dev/) · [Installation](https://apatch.dev/install.html)
- **Google:** [Play Integrity verdicts](https://developer.android.com/google/play/integrity/verdicts)

::: tip Final rule
When in doubt, start with Magisk - unless your device community specifically recommends KernelSU or APatch for your exact model, ROM, and kernel.
:::
