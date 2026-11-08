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

## GhostLock Temporary Root

GhostLock is a kernel exploit that can provide root in memory on specifically vulnerable Android builds without a conventional bootloader unlock or firmware flash. The session ends on reboot, and updates may remove the vulnerability. It is not a persistent root method.

> [!TIP]
> The dedicated [GhostLock temporary-root guide](./root-without-unlocking-bootloader.md) is the source for the exploit overview, supported devices and exact builds, project ports, setup instructions, and current limitations. Check that guide and the linked project documentation before assuming a device is supported.

## Other Temporary-Root Tools

- **[Temporary Root](https://github.com/ShivamXD6/Temporary-Root)** - An Android 12L+ arm64 app offering DirtyFrag (CVE-2026-43284) or GhostLock. DirtyFrag needs a vulnerable supported GKI kernel and a loadable matching module; GhostLock needs a profile matching the exact kernel release. A KernelSU-compatible manager with `libksud.so` is required; the app names a separate Samsung fork. The source has no project-wide license.
- **[Shark](https://github.com/Yunnijian/Shark)** - Uses Shizuku or Stellar and the distinct [CVE-2026-98260](https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/98xxx/CVE-2026-98260.json) POSIX CPU-timer bug to load a compatible KernelSU manager. Upstream lists exact OnePlus, OPPO, Realme and iQOO targets, including OnePlus 16 `PYB110` on `6.18.21-android17-5-gf957accaf563-ab15926176-4k` and iQOO 15 `V2505A` on `6.12.23-android16-5-g41f4cb1fa7c7-abogki465038634-4k`. Its [NOTICE](https://github.com/Yunnijian/Shark/blob/main/NOTICE) says redistribution permission for a 6.12/iQOO component is not established.

The lists and compatibility checks are upstream claims, not independent device tests or guarantees of a successful run. A kernel crash can occur; a full reboot clears active runtime root but may leave files or settings changed during the session.

## Comparison

The Samsung KEY2 proof of concept is not covered in the table: its fused signing key is permanent.

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

There is no universal device list. Check the exact model and build in the [GhostLock device table](./root-without-unlocking-bootloader.md#device-support-at-a-glance) or the other tool's own documentation; a shared model family or kernel version is not proof of support.

### Is temporary root safe?

Avoiding a firmware flash does not make an exploit risk-free. It still runs privilege-escalation code as root. Verify the target, use the source or release from the linked project, keep a backup, and understand that an OTA can close the vulnerability.

## Safety & Legal Notes

- For Kaeru and Fenrir, verify offsets for the exact bootloader version and keep a stock LK/preloader image before changing it.
- For runtime exploits, use only project-documented targets and inspect the linked project's issue tracker for current status.
- Do not confuse Samsung KEY2 fusing with session-only root or assume that a firmware flash can reverse a fuse.
- These tools are research software maintained by individuals; expect device-specific limitations and breakage after updates.
- See the project's [Legal & Safety](../legal-disclaimer.md) page for the general disclaimer.

## Related Resources

- [GhostLock temporary-root guide](./root-without-unlocking-bootloader.md)
- [Root framework comparison](./root-framework-comparison.md)
- [Bootloader unlocking guide](./how-to-unlock-bootloader.md)
- [Troubleshooting](../troubleshooting.md)

[↑ Back to top](#bootloader-mods-temporary-root)
