---
layout: doc
title: "Bootloader Modification & Temporary Root Solutions"
description: "Bootloader-level modification tools and kernel-exploit temporary root solutions."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.zhoe.org/rooting-guides/temporary-root-solutions
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: keywords
      content: "kaeru, fenrir, mediatek bootloader spoof, bldr_spoof, ghostlock, cve-2026-43499, root my galaxy, root my pixel, root my device, temporary root, kernelsu temp root"
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: "Bootloader Modification & Temporary Root Solutions"
  - - meta
    - property: og:description
      content: "Guide to bootloader-level modification tools and kernel-exploit temporary root solutions, and how they differ from standard Magisk/KernelSU/APatch rooting."
  - - meta
    - property: og:url
      content: https://awesome-android-root.zhoe.org/rooting-guides/temporary-root-solutions
  - - meta
    - property: og:locale
      content: en_US
  - - meta
    - property: og:site_name
      content: Awesome Android Root
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: "Bootloader Modification & Temporary Root Solutions"
  - - meta
    - name: twitter:description
      content: "Kaeru, Fenrir, and the GhostLock (CVE-2026-43499) family: Root My Galaxy, Root My Pixel, Root My Device."
  - - meta
    - name: article:author
      content: Awesome Android Root
  - - meta
    - name: article:published_time
      content: 2026-08-07
  - - meta
    - name: article:modified_time
      content: 2026-08-07
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
---

# Bootloader Modification & Temporary Root Solutions

Most of this site covers root frameworks that patch the **boot image** (Magisk, KernelSU, APatch) after the bootloader is unlocked. This page covers two related but distinct categories that don't fit that model:

1. **Bootloader modification and spoofing tools** - payloads that patch the bootloader (LK) itself, mostly on MediaTek chipsets, to add custom fastboot commands, hide the unlocked state, or defeat the secure boot chain.
2. **Temporary (session-only) root** - kernel exploits that grant root in memory for the current boot only, without unlocking the bootloader, flashing anything, or tripping Knox/warranty fuses. Root is lost on every reboot and must be re-triggered.


> [!CAUTION]
> Everything on this page operates below the OS, either in the bootloader or in the kernel. A bad flash or a failed exploit run can **brick your device**. These are research-grade, device-specific tools maintained by small teams, not polished consumer apps. Read each project's documentation in full before using it, and keep a copy of your stock firmware.

## MediaTek Bootloader Modification & Spoofing Tools

These tools patch the LK (Little Kernel) bootloader image on MediaTek devices directly, rather than the boot/init_boot partition. That lets them do things a normal root framework can't: add fastboot commands, remove the unlocked-bootloader warning, or spoof the reported lock state so Play Integrity sees "locked" while the device is actually unlocked.

- **[Kaeru](https://github.com/R0rt1z2/kaeru)** - ARMv7 payload that gets arbitrary code execution inside MediaTek LK bootloaders. Once injected, it can register custom fastboot commands, remap key-combo boot modes, and remove the unlocked-bootloader boot warning. Bootloader-lock spoofing is opt-in, toggled from fastboot. `FOSS` (AGPL-3.0)
- **[Fenrir](https://github.com/R0rt1z2/fenrir)** - Proof-of-concept exploit for a secure-boot flaw on the Nothing Phone (2a) / CMF Phone 1 and a handful of other MediaTek devices. It patches `bl2_ext` so the Preloader skips verification, breaking the chain of trust from EL3 onward, and can spoof the device's lock state as "locked" so strong Play Integrity passes on an unlocked device. `FOSS` (AGPL-3.0)

### Supporting toolchain

Kaeru and Fenrir both build on a small ecosystem of MediaTek bootloader tooling from the same developer group. Useful alongside them, or as a starting point for porting to a new device:

- **[mtkclient](https://github.com/bkerler/mtkclient)** - The main MediaTek reverse-engineering and flashing tool (BROM/preloader read-write, partition dumping, seccfg unlock). Includes the `kamakiri` exploit chain used to get code execution during flashing. `FOSS`
- **[lkpatcher](https://github.com/R0rt1z2/lkpatcher)** - Streamlines patching known security policies in an LK image (partition listing, policy analysis, JSON-based custom patches) without hand-editing bytes. `FOSS`
- **[liblk](https://github.com/R0rt1z2/liblk)** - Python library for parsing and rebuilding MediaTek LK images; the base that `lkpatcher` and the Kaeru/Fenrir injectors are built on. `FOSS`
- **[amonet](https://github.com/R0rt1z2/amonet)** - Older BootROM + LK exploit chain, mainly for Amazon-branded MediaTek devices with locked-down BROM stages that `mtkclient` alone can't reach. `FOSS`

## Temporary (Session-Only) Root: the GhostLock / CVE-2026-43499 family

In mid-2026, a use-after-free bug in the Linux kernel's rtmutex proxy-lock rollback path (CVE-2026-43499, nicknamed **GhostLock**) turned out to be reachable from an unprivileged app process on several shipping Android kernels. Unlike the bootloader tools above, this is a pure kernel exploit: no unlocked bootloader, no flashing, no Knox e-fuse trip. It stages a native payload over ADB/Shizuku, runs it to get a root shell in memory, and uses that to load a KernelSU (or ReSukiSU) manager for the current boot only. Rebooting clears it, and the steps have to be repeated.

> [!TIP]
> GhostLock now has its own dedicated, plain-English page: **[Root Without Unlocking the Bootloader: the GhostLock Temporary Root Guide](./root-without-unlocking-bootloader.md)**. It covers what the bug is, what it can and can't do, and the full list of apps and projects (Root My Galaxy, Root My Pixel, Root My Device, GhostLock App, ghostlock-oneplus, and device ports) with a supported-devices table.

The headline tools:

- **[Root My Galaxy](https://github.com/BuSung-dev/Root-My-Galaxy)** - The original one-click app for Snapdragon Galaxy flagships (S24/S25 series, S24 FE, A56, and others). `FOSS` (Apache-2.0)
- **[Root My Pixel](https://github.com/alex193a/Root-My-Pixel)** - Port for Google Pixel devices, staging the payload via Shizuku. `FOSS`
- **[ghostlock-oneplus](https://github.com/JoinChang/ghostlock-oneplus)** - Standalone exploit for OnePlus/OPPO/realme (and some Xiaomi) devices with a locked bootloader. `FOSS`
- **[CyberMeowfia (IonStack research)](https://github.com/NebuSec/CyberMeowfia)** - NebuSec's original writeup and exploit source for CVE-2026-43499 that the tools above are built on.

Community ports keep spreading - Galaxy S22 Ultra / Z Fold6 / A17, OPPO Find N2, iQOO Z9 5G / vivo T3 5G, POCO M6 Pro, Amazon 5.X-kernel devices, Nothing Phone (1), Galaxy Tab S7+, and even the Meta Quest 1 - all listed with details on the [dedicated GhostLock page](./root-without-unlocking-bootloader.md).

> [!IMPORTANT]
> This is a narrow, closing window, not a general-purpose root method:
> - Only works on firmware up to roughly the **June 2026** security patch (some report luck on July 2026 builds; this isn't guaranteed and shrinks with every OTA).
> - Coverage is a per-device, per-kernel-build list. Check each project's supported-targets file before assuming your phone works.
> - Newer chipsets/kernel builds (e.g. the Galaxy S26 series) shipped with a layout that isn't vulnerable to this specific payload.
> - Root does **not** survive a reboot. There's no persistence step; you re-run the tool each time you want root back.
> - Expect this class of exploit to be patched. Treat any specific CVE-based temp-root tool as short-lived, and check the linked repos for current status before relying on one.

## How this differs from standard root methods

| | Magisk / KernelSU / APatch | Kaeru / Fenrir (bootloader mods) | GhostLock family (temp root) |
|---|---|---|---|
| Needs unlocked bootloader | Yes | Yes (to flash the patched image) | **No** |
| Survives reboot | Yes (until OTA) | Yes (until re-flashed/relocked) | **No**, re-run every boot |
| Trips Knox / warranty fuse | Depends on OEM | Depends on OEM | **No** |
| Can spoof lock state to pass strong Play Integrity | No (needs [Tricky Store](https://github.com/5ec1cff/TrickyStore) etc.) | Yes, built in (Fenrir/Kaeru) | Bootloader already reads as locked |
| Scope | Boot/init_boot partition | Bootloader (LK) itself | Kernel, in memory only |
| Device support | Broad | MediaTek only, per-device porting | Per-device, patch-level dependent |

See the [Root Hiding & Play Integrity apps](/apps-and-modules/#root-hiding-play-integrity) section for the DenyList/Shamiko/Tricky Store side of this problem on a normally-rooted device.

## Safety & legal notes

- All of the tools on this page are research/proof-of-concept software maintained by individuals, not vendors. Expect rough edges, device-specific porting work, and breakage on the next OTA.
- Bootloader patching (Kaeru, Fenrir) carries a real brick risk if the wrong offsets are used for your exact bootloader version. Dump and keep your stock LK/preloader image before touching it.
- Kernel-exploit temp root (the GhostLock family) is comparatively low-risk to the device itself (no flashing), but it is still privilege-escalation code running as root on your own device; only build from source or use releases from the linked repos, and read the code if you're not sure.
- See the project's [Legal & Safety](../legal-disclaimer.md) page for the general disclaimer that applies to everything in this repository.

## Related resources

- [Root Without Unlocking the Bootloader: the GhostLock Temporary Root Guide](./root-without-unlocking-bootloader.md)
- [Root Framework Comparison](../rooting-guides/root-framework-comparison.md)
- [Complete Bootloader Unlocking Guide](../rooting-guides/how-to-unlock-bootloader.md)
- [Troubleshooting: Play Integrity & Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps)
- [Root Hiding & Play Integrity apps](/apps-and-modules/#root-hiding-play-integrity)

[↑ Back to top](#mediatek-bootloader-modification-spoofing-tools)