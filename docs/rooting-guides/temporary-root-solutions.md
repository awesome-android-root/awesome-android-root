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

This is a project directory, not an installation guide. For exact device/build checks, running a session, persistence, module limits and failure recovery, use the [temporary-root usage guide](./root-without-unlocking-bootloader.md). Bootloader research is listed separately below because it changes a different security layer and is not an equivalent rooting method.

> [!CAUTION]
> These are device-specific research tools that operate below the OS. A bad bootloader flash or failed exploit run can brick a device. Read the project's current documentation and keep stock firmware and recovery options available before proceeding.

## DirtyFrag and GhostLock Temporary Root {#ghostlock-temporary-root}

| Project family | Compatibility / status notes | Source |
|----------------|------------------------------|--------|
| DirtyFrag loaders | Vulnerable kernel plus loader-specific targets; some require a matching KernelSU module | [Project directory and upstream tables](https://github.com/fynks/awesome-temporary-root) |
| GhostLock loaders | Exact device/build or documented kernel profile; updates can invalidate support | [Project directory and upstream tables](https://github.com/fynks/awesome-temporary-root) |

Use that directory to locate a loader, then verify its **own** target list and releases. A community report or matching Android version alone is not proof of support. Run instructions belong in the [usage guide](./root-without-unlocking-bootloader.md#run-a-session-safely).

## Other Temporary-Root Tools

See the loader's current README for requirements, manager/transport and testing status. These differ by project.

- **[Shark](https://github.com/Yunnijian/Shark-Releases)** - Uses Shizuku or Stellar and the distinct [CVE-2026-98260](https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/98xxx/CVE-2026-98260.json) POSIX CPU-timer bug to late-load a KernelSU-compatible module for the chosen manager. Check its upstream README for exact supported device and kernel targets.

## Comparison

| Technique | Compatibility basis | Persistence / principal risk |
|-----------|---------------------|------------------------------|
| Temporary-root loaders (DirtyFrag, GhostLock, Shark) | Exploit-specific device/build/profile and manager requirements | Active root ends on full reboot; persistent data changes and exploit crashes remain possible |
| Bootloader/secure-boot modification (Kaeru, Fenrir) | Exact boot-chain image and device support | Changes can persist across reboots; wrong bootloader changes may brick the device |
| BootROM/preloader tooling (mtkclient, amonet) | Exact chipset, device and exploit/transport support | Flash/read-write operations, not equivalent session-root methods |
| LK image utilities (lkpatcher, liblk) | Supported image format and documented policies | Offline parsing/patching support; a patched image is not automatically safe to flash |
| Samsung KEY2 research | Exact target documented by the proof of concept | Key fusing can be irreversible; not session-only root |

For standard unlocked-bootloader installations, see the [framework comparison](./root-framework-comparison.md).

## Usage and safety reference {#faq}

<span id="does-ghostlock-survive-reboot-or-replace-permanent-root"></span>
<span id="can-it-load-root-modules"></span>
<span id="which-devices-are-supported"></span>
<span id="is-temporary-root-safe"></span>
<span id="safety-legal-notes"></span>

Session behavior, module compatibility, persistent changes and recovery are covered once in the [temporary-root guide](./root-without-unlocking-bootloader.md). A full reboot ends active root, **not necessarily files or settings changed while rooted**.

## Bootloader modification research (not temporary root)

### MediaTek bootloader / secure-boot modification {#mediatek-bootloader-modification-spoofing-tools}

These tools modify the MediaTek boot chain rather than the boot or init_boot partition. Kaeru injects code into LK (Little Kernel) to add fastboot commands and change boot-mode key mappings. Fenrir patches `bl2_ext` so the Preloader skips verification on supported devices and can spoof the reported lock state.

- **[Kaeru](https://github.com/R0rt1z2/kaeru)** - ARMv7 payload that gets arbitrary code execution inside MediaTek LK bootloaders. It can register custom fastboot commands, remap key-combo boot modes, and remove the unlocked-bootloader boot warning. Bootloader-lock spoofing is opt-in, toggled from fastboot. `FOSS` (AGPL-3.0)
- **[Fenrir](https://github.com/R0rt1z2/fenrir)** - Proof-of-concept exploit for a secure-boot flaw on the Nothing Phone (2a), CMF Phone 1, and a small set of other MediaTek devices. It patches `bl2_ext` so the Preloader skips verification, breaking the chain of trust from EL3 onward, and can spoof the device's reported lock state. `FOSS` (AGPL-3.0)

<!-- Preserve incoming links to consolidated sections. -->
<span id="supporting-toolchain"></span>

### BootROM/preloader exploitation and flashing tools

- **[mtkclient](https://github.com/bkerler/mtkclient)** - MediaTek reverse-engineering and flashing tool for BROM/preloader read-write, partition dumping, and seccfg unlock. Includes the `kamakiri` exploit chain used to get code execution during flashing. `FOSS`
- **[amonet](https://github.com/R0rt1z2/amonet)** - Older BootROM and LK exploit chain, mainly for Amazon-branded MediaTek devices with locked-down BROM stages that mtkclient alone cannot reach. `FOSS`

### LK image parsing, patching and supporting libraries

These support image analysis and modification; they are not standalone temporary-root loaders.

- **[lkpatcher](https://github.com/R0rt1z2/lkpatcher)** - Patches known security policies in an LK image, with partition listing, policy analysis, and JSON-based custom patches. `FOSS`
- **[liblk](https://github.com/R0rt1z2/liblk)** - Python library for parsing and rebuilding MediaTek LK images; used by lkpatcher and the Kaeru/Fenrir injectors. `FOSS`

### Samsung Exynos Bootloader Research

These are boot-chain research references, **not temporary-root tools**. Samsung's [November 2026 security bulletin](https://security.samsungmobile.com/securityUpdate.smsb) describes CVE-2026-21155 / SVE-2026-3546 as a bootloader out-of-bounds write requiring physical access and lists a fix in SMR Nov-2026 Release 1.

- **[CVE-2026-21155 / SVE-2026-3546 writeup](https://github.com/UnsignedChad/CVE-2026-21155-SVE-2026-3546)** - The researcher reports an unsigned partition flash and a boot-logo decoder issue on a Galaxy S25 FE `SM-S731U1`. The reported hardware test is specific to that model.
- **[SVE-2026-3546 S-LK proof of concept](https://github.com/Gabriel2392/SVE-2026-3546)** - Research code for the `s5e8825` platform that fuses Secure Boot KEY2 and flashes re-signed bootloader files; it is not a general Galaxy root method.

> [!CAUTION]
> Fusing a custom Secure Boot key is [irreversible](https://github.com/henr1kas/Exynos#optional-key-fusing) and can leave the device dependent on custom-signed images. Rebooting does not undo it. Wrong images, lost keys or unsupported hardware can prevent recovery; do not downgrade security updates to pursue an exploit.

Verify the exact bootloader version, offsets and stock LK/preloader restore path before boot-chain research. These tools are not substitutes for a temporary-root loader. See [Legal & Safety](../legal-disclaimer.md).

## Related Resources

- [Awesome Temporary Root](https://awesome-temporary-root.pages.dev/) ([GitHub](https://github.com/fynks/awesome-temporary-root)) - maintained device/build sections and practical guidance
- [DirtyFrag and GhostLock temporary-root guide](./root-without-unlocking-bootloader.md)
- [Root framework comparison](./root-framework-comparison.md)
- [Bootloader unlocking guide](./how-to-unlock-bootloader.md)
- [Troubleshooting](../troubleshooting.md)

[↑ Back to top](#bootloader-mods-temporary-root)
