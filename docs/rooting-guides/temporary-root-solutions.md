---
title: "Bootloader Mods & Temporary Root"
description: "Compare device-specific MediaTek bootloader modifications and temporary root for Android, with reboot behavior and safety notes."
head:
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:description
      content: Compare device-specific MediaTek bootloader modifications and temporary root for Android, with reboot behavior and safety notes.
  - - meta
    - name: twitter:description
      content: Compare device-specific MediaTek bootloader modifications and temporary root for Android, with reboot behavior and safety notes.
  - - meta
    - name: article:author
      content: Awesome Android Root
  - - meta
    - name: article:section
      content: Guides
  - - meta
    - name: article:tag
      content: Bootloader
  - - meta
    - name: article:tag
      content: Temporary Root
  - - meta
    - name: article:tag
      content: Play Integrity
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "@id": "https://awesome-android-root.xyz/rooting-guides/temporary-root-solutions#article",
        "headline": "Bootloader Mods & Temporary Root",
        "description": "A practical comparison of Android temporary root, bootloader modification tools and their limitations.",
        "image": "https://awesome-android-root.xyz/images/og.png",
        "author": { "@id": "https://awesome-android-root.xyz/#organization" },
        "publisher": { "@id": "https://awesome-android-root.xyz/#organization" },
        "datePublished": "2026-08-07",
        "dateModified": "2026-10-15",
        "mainEntityOfPage": {
          "@id": "https://awesome-android-root.xyz/rooting-guides/temporary-root-solutions#webpage"
        },
        "articleSection": "Android Rooting Guides",
        "inLanguage": "en-US",
        "isAccessibleForFree": true
      }
---

# Bootloader Mods & Temporary Root {#bootloader-mods-temporary-root}

Most guides here cover boot-image root installed after unlocking the bootloader. This page distinguishes persistent boot-chain modifications from session-only kernel-exploit root that can leave the bootloader locked.

> [!CAUTION]
> These are device-specific research tools that operate below the OS. A bad bootloader flash or failed exploit run can brick a device. Read the project's current documentation and keep stock firmware and recovery options available before proceeding.

## MediaTek Bootloader Modification & Spoofing Tools

These tools modify the MediaTek boot chain rather than the boot or init_boot partition. Kaeru injects code into LK (Little Kernel) to add fastboot commands and change boot-mode key mappings. Fenrir patches `bl2_ext` so the Preloader skips verification on supported devices and can spoof the reported lock state.

- **[Kaeru](https://github.com/R0rt1z2/kaeru)** - ARMv7 payload that gets arbitrary code execution inside MediaTek LK bootloaders. It can register custom fastboot commands, remap key-combo boot modes, and remove the unlocked-bootloader boot warning. Bootloader-lock spoofing is opt-in, toggled from fastboot. `FOSS` (AGPL-3.0)
- **[Fenrir](https://github.com/R0rt1z2/fenrir)** - Proof-of-concept exploit for a secure-boot flaw on the Nothing Phone (2a), CMF Phone 1, and a small set of other MediaTek devices. It patches `bl2_ext` so the Preloader skips verification, breaking the chain of trust from EL3 onward, and can spoof the device's reported lock state. `FOSS` (AGPL-3.0)

### Supporting toolchain

These MediaTek tools are useful alongside Kaeru and Fenrir, or as a starting point for device-specific research:

- **[mtkclient](https://github.com/bkerler/mtkclient)** - MediaTek reverse-engineering and flashing tool for BROM/preloader read-write, partition dumping, and seccfg unlock. Includes the `kamakiri` exploit chain used to get code execution during flashing. `FOSS`
- **[lkpatcher](https://github.com/R0rt1z2/lkpatcher)** - Patches known security policies in an LK image, with partition listing, policy analysis, and JSON-based custom patches. `FOSS`
- **[liblk](https://github.com/R0rt1z2/liblk)** - Python library for parsing and rebuilding MediaTek LK images; used by lkpatcher and the Kaeru/Fenrir injectors. `FOSS`
- **[amonet](https://github.com/R0rt1z2/amonet)** - Older BootROM and LK exploit chain, mainly for Amazon-branded MediaTek devices with locked-down BROM stages that mtkclient alone cannot reach. `FOSS`

## Samsung Exynos Bootloader Research

These are boot-chain research references, **not temporary-root tools**. Samsung's [November 2026 security bulletin](https://security.samsungmobile.com/securityUpdate.smsb) describes CVE-2026-21155 / SVE-2026-3546 as a bootloader out-of-bounds write requiring physical access and lists a fix in SMR Nov-2026 Release 1.

- **[CVE-2026-21155 / SVE-2026-3546 writeup](https://github.com/UnsignedChad/CVE-2026-21155-SVE-2026-3546)** - The researcher reports an unsigned partition flash and a boot-logo decoder issue on a Galaxy S25 FE `SM-S731U1`. The reported hardware test is specific to that model.
- **[SVE-2026-3546 S-LK proof of concept](https://github.com/Gabriel2392/SVE-2026-3546)** - Research code for the `s5e8825` platform that fuses Secure Boot KEY2 and flashes re-signed bootloader files; it is not a general Galaxy root method.

> [!CAUTION]
> Fusing a custom Secure Boot key is [irreversible](https://github.com/henr1kas/Exynos#optional-key-fusing) and can leave the device dependent on custom-signed images. Rebooting does not undo it. Wrong images, lost keys or unsupported hardware can prevent recovery; do not downgrade security updates to pursue an exploit.

## DirtyFrag and GhostLock Temporary Root {#ghostlock-temporary-root}

**DirtyFrag** (CVE-2026-43284) uses a page-cache vulnerability on supported kernels. Some loaders need a matching kernel module and a specific root manager.

**GhostLock** (CVE-2026-43499) uses a kernel race on builds with a matching device profile. A failed attempt can panic or reboot the device.

Both can provide root without unlocking or flashing a boot image on supported builds. A full reboot ends the active session, and updates may remove the vulnerability.

> [!TIP]
> Our sister project **[Awesome Temporary Root](https://awesome-temporary-root.pages.dev/)** ([GitHub](https://github.com/fynks/awesome-temporary-root)) maintains device/build sections, links to live upstream tables, tools, module reports, setup and troubleshooting. Our [temporary-root guide](./root-without-unlocking-bootloader.md#all-apps-and-projects-for-ghostlock) links to its sections.

## Other Temporary-Root Tools

Some loaders late-load a KernelSU-compatible module to grant `su` and support compatible modules; others provide only a root shell. ADB or Shizuku may be used to stage a loader, but Shizuku's shell access is not root by itself. Use the manager and transport named by the chosen loader.

- **[Temporary Root](https://github.com/ShivamXD6/Temporary-Root)** - An Android 12L+ arm64 app offering DirtyFrag (CVE-2026-43284) or GhostLock. DirtyFrag uses a page-cache vulnerability and needs a vulnerable supported GKI kernel and a loadable matching module; GhostLock needs a profile matching the exact kernel release. A KernelSU-compatible manager with `libksud.so` is required; the app names a separate Samsung fork. The source has no project-wide license.
- **[Shark](https://github.com/Yunnijian/Shark)** - Uses Shizuku or Stellar and the distinct [CVE-2026-98260](https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/98xxx/CVE-2026-98260.json) POSIX CPU-timer bug to late-load a KernelSU-compatible module for the chosen manager. Check its upstream README for exact supported device and kernel targets. Its [NOTICE](https://github.com/Yunnijian/Shark/blob/main/NOTICE) says redistribution permission for a 6.12/iQOO component is not established.

Upstream target lists and compatibility checks are not guarantees of a successful run. A kernel crash can occur; a full reboot clears active runtime root but may leave files or settings changed during the session.

## Comparison

The Samsung KEY2 proof of concept is not covered in the table: its fused signing key is permanent. DirtyFrag and GhostLock are temporary-root methods, not root frameworks; some loaders use KernelSU during the session.

| | Magisk / KernelSU / APatch | Kaeru / Fenrir | DirtyFrag | GhostLock |
|---|---|---|---|---|
| Bootloader | Normally unlocked for standard installation | Unlocked to flash the modification | Can stay locked on supported builds | Can stay locked on supported builds |
| Full reboot | Root usually returns until removed or replaced | Modification remains until restored or replaced | Active root ends | Active root ends |
| Scope | Compatible boot-related image or custom kernel | LK / boot-chain images | Kernel page cache; some loaders use KernelSU | Kernel race; some loaders use KernelSU |
| Device support | Broad, but device-specific images and procedures apply | MediaTek only; exact-device support | Vulnerable kernel and compatible loader/module | Exact device and kernel profile |
| Main limitation | Requires an unlockable device and careful image/OTA handling | Wrong LK or preloader changes can brick a device | An OTA can patch the vulnerability or break compatibility | An OTA can patch the vulnerability or break the profile; a failed race can reboot |
| Knox / warranty fuse | Depends on OEM and install method | Depends on OEM | Fuse and Knox-service behavior are not guaranteed | Fuse and Knox-service behavior are not guaranteed |
| Lock-state and Play Integrity | May need separate hiding tools; results are not guaranteed | Lock-state spoofing is available in some tools; Integrity results are not guaranteed | A locked bootloader does not establish Integrity results | A locked bootloader does not establish Integrity results |

For either temporary-root method, check [Awesome Temporary Root](https://awesome-temporary-root.pages.dev/guide/#supported-devices) and the loader's own requirements. Some loaders can automatically re-run after a reboot; files or settings changed during a session may remain.

For root-hiding tools and configuration on a normally rooted device, see [Root Hiding & Play Integrity](../apps-and-modules/root-management#root-hiding-play-integrity) and the [troubleshooting guide](../troubleshooting.md#play-integrity-and-banking-apps).

## FAQ

### Does temporary root survive reboot or replace permanent root? {#does-ghostlock-survive-reboot-or-replace-permanent-root}

No. Active root access ends on a full reboot; rerun the tool only if the exact device and build remain supported. It cannot replace bootloader unlocking when you need to flash a recovery, custom ROM, or persistent root image.

### Can it load root modules?

Some compatible tools load a KernelSU module and use a root manager, and may support modules for that session. Do not assume every Magisk or KernelSU module is compatible, or that a reboot undoes files and settings changed by a module.

### Which devices are supported?

There is no universal device list. Check the exact model, firmware and kernel in [Awesome Temporary Root](https://awesome-temporary-root.pages.dev/guide/#supported-devices) and the loader's own target list; a shared model family or kernel version is not proof of support.

### Is temporary root safe?

Avoiding a firmware flash does not make an exploit risk-free. It still runs privilege-escalation code as root. Verify the target, use the source or release from the linked project, keep a backup, and understand that an OTA can close the vulnerability.

## Safety & Legal Notes

- For Kaeru and Fenrir, verify offsets for the exact bootloader version and keep a stock LK/preloader image before changing it.
- For runtime exploits, use only project-documented targets and inspect the linked project's issue tracker for current status.
- Do not confuse Samsung KEY2 fusing with session-only root or assume that a firmware flash can reverse a fuse.
- These tools are research software maintained by individuals; expect device-specific limitations and breakage after updates.
- See the project's [Legal & Safety](../legal-disclaimer.md) page for the general disclaimer.

## Related Resources

- [Awesome Temporary Root](https://awesome-temporary-root.pages.dev/) ([GitHub](https://github.com/fynks/awesome-temporary-root)) - maintained device/build sections and practical guidance
- [DirtyFrag and GhostLock temporary-root guide](./root-without-unlocking-bootloader.md)
- [Root framework comparison](./root-framework-comparison.md)
- [Bootloader unlocking guide](./how-to-unlock-bootloader.md)
- [Troubleshooting](../troubleshooting.md)

[↑ Back to top](#bootloader-mods-temporary-root)
