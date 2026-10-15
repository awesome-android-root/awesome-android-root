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

# Bootloader Mods & Temporary Root

Most guides here cover boot-image root installed after unlocking the bootloader. This page covers two different approaches: persistent MediaTek bootloader modifications, and session-only kernel-exploit root that leaves the bootloader locked.

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

## GhostLock Temporary Root

GhostLock is a kernel exploit that can provide root in memory on specifically vulnerable Android builds without a conventional bootloader unlock or firmware flash. The session ends on reboot, and updates may remove the vulnerability. It is not a persistent root method.

> [!TIP]
> The dedicated [GhostLock temporary-root guide](./root-without-unlocking-bootloader.md) is the source for the exploit overview, supported devices and exact builds, project ports, setup instructions, and current limitations. Check that guide and the linked project documentation before assuming a device is supported.

## Comparison

| | Magisk / KernelSU / APatch | Kaeru / Fenrir | GhostLock family |
|---|---|---|---|
| Bootloader unlock | Required | Required to flash the modification | Not required |
| Survives reboot | Usually, until removed or an update replaces the image | Yes, until restored or replaced | No; rerun each boot while the target remains vulnerable |
| Scope | Boot or init_boot image | LK / boot-chain images | Kernel, in memory |
| Device support | Broad, but device-specific images and procedures still apply | MediaTek only; exact-device support | Per-device and per-build; use the [supported-targets table](./root-without-unlocking-bootloader.md#device-support-at-a-glance) |
| Main limitation | Requires an unlockable device and careful image/OTA handling | Wrong LK or preloader changes can brick a device | Narrow compatibility window; an OTA may patch the exploit |
| Knox / warranty fuse | Depends on OEM | Depends on OEM | The dedicated guide does not guarantee fuse or Knox-service behavior; check its device-specific notes |
| Lock-state and Play Integrity | Usually needs separate hiding tools; see [Tricky Store](https://github.com/5ec1cff/TrickyStore) | Lock-state spoofing is available in some tools; Fenrir's upstream description claims strong Integrity can pass, but verify current results | A locked bootloader alone does not establish Play Integrity results |

For root-hiding tools and configuration on a normally rooted device, see [Root Hiding & Play Integrity](../apps-and-modules/root-management#root-hiding-play-integrity) and the [troubleshooting guide](../troubleshooting.md#play-integrity-and-banking-apps).

## FAQ

### Does GhostLock survive reboot or replace permanent root?

No. Root access ends on reboot; rerun the tool only if the exact device and build remain supported. It cannot replace bootloader unlocking when you need to flash a recovery, custom ROM, or persistent root image.

### Can it load root modules?

Some compatible tools load a session root manager such as KernelSU and may support modules for that session. Do not assume every Magisk or KernelSU module is compatible or that module changes persist after reboot.

### Which devices are supported?

There is no universal device list. Check the exact model and build in the [GhostLock device table](./root-without-unlocking-bootloader.md#device-support-at-a-glance) and the relevant project's documentation; a shared model family or kernel version is not proof of support.

### Is temporary root safe?

Avoiding a firmware flash does not make an exploit risk-free. It still runs privilege-escalation code as root. Verify the target, use the source or release from the linked project, keep a backup, and understand that an OTA can close the vulnerability.

## Safety & Legal Notes

- For Kaeru and Fenrir, verify offsets for the exact bootloader version and keep a stock LK/preloader image before changing it.
- For GhostLock, use only project-documented targets and inspect the linked project's issue tracker for current status.
- These tools are research software maintained by individuals; expect device-specific limitations and breakage after updates.
- See the project's [Legal & Safety](../legal-disclaimer.md) page for the general disclaimer.

## Related Resources

- [GhostLock temporary-root guide](./root-without-unlocking-bootloader.md)
- [Root framework comparison](./root-framework-comparison.md)
- [Bootloader unlocking guide](./how-to-unlock-bootloader.md)
- [Troubleshooting](../troubleshooting.md)

[↑ Back to top](#mediatek-bootloader-modification-spoofing-tools)
