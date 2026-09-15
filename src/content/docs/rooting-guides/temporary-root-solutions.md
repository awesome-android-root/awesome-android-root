---
title: 'Temporary Root for Android: Methods & Solutions'
description: Compare temporary root methods for Android, including locked-bootloader options, bootloader
  modifications, reboot behavior, device limits and safety risks.
head:
- tag: link
  attrs:
    href: https://awesome-android-root.zhoe.org/rooting-guides/temporary-root-solutions
    rel: canonical
- tag: meta
  attrs:
    content: Awesome Android Root
    name: author
- tag: meta
  attrs:
    content: index, follow
    name: robots
- tag: meta
  attrs:
    content: article
    property: og:type
- tag: meta
  attrs:
    content: 'Temporary Root for Android: Methods & Solutions'
    property: og:title
- tag: meta
  attrs:
    content: Compare Android temporary root, bootloader modification tools and standard Magisk, KernelSU
      and APatch rooting, with device limits and safety notes.
    property: og:description
- tag: meta
  attrs:
    content: https://awesome-android-root.zhoe.org/rooting-guides/temporary-root-solutions
    property: og:url
- tag: meta
  attrs:
    content: en_US
    property: og:locale
- tag: meta
  attrs:
    content: Awesome Android Root
    property: og:site_name
- tag: meta
  attrs:
    content: summary_large_image
    name: twitter:card
- tag: meta
  attrs:
    content: 'Temporary Root for Android: Methods & Solutions'
    name: twitter:title
- tag: meta
  attrs:
    content: 'Temporary root for Android: Kaeru, Fenrir and GhostLock family tools, supported-device cautions
      and differences from permanent root.'
    name: twitter:description
- tag: meta
  attrs:
    content: Awesome Android Root
    name: article:author
- tag: meta
  attrs:
    content: '2026-08-07'
    name: article:published_time
- tag: meta
  attrs:
    content: '2026-09-13'
    name: article:modified_time
- tag: meta
  attrs:
    content: Guides
    name: article:section
- tag: meta
  attrs:
    content: Bootloader
    name: article:tag
- tag: meta
  attrs:
    content: Temporary Root
    name: article:tag
- tag: meta
  attrs:
    content: Play Integrity
    name: article:tag
- tag: script
  attrs:
    type: application/ld+json
  content: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"TechArticle\",\n  \"@id\": \"https://awesome-android-root.zhoe.org/rooting-guides/temporary-root-solutions#article\"\
    ,\n  \"headline\": \"Temporary Root for Android: Methods & Solutions\",\n  \"description\": \"A practical\
    \ comparison of Android temporary root, bootloader modification tools and their limitations.\",\n\
    \  \"image\": \"https://awesome-android-root.zhoe.org/images/og.png\",\n  \"author\": {\n    \"@id\"\
    : \"https://awesome-android-root.zhoe.org/#organization\"\n  },\n  \"publisher\": {\n    \"@id\":\
    \ \"https://awesome-android-root.zhoe.org/#organization\"\n  },\n  \"datePublished\": \"2026-08-07\"\
    ,\n  \"dateModified\": \"2026-09-13\",\n  \"mainEntityOfPage\": {\n    \"@id\": \"https://awesome-android-root.zhoe.org/rooting-guides/temporary-root-solutions#webpage\"\
    \n  },\n  \"articleSection\": \"Android Rooting Guides\",\n  \"inLanguage\": \"en-US\",\n  \"isAccessibleForFree\"\
    : true\n}"
---

# Temporary Root for Android: Methods & Solutions

Most of this site covers root frameworks that patch the **boot image** (Magisk, KernelSU, APatch) after the bootloader is unlocked. This page covers two related but distinct categories that don't fit that model:

1. **Bootloader modification and spoofing tools** - payloads that patch the bootloader (LK) itself, mostly on MediaTek chipsets, to add custom fastboot commands, hide the unlocked state, or defeat the secure boot chain.
2. **Temporary (session-only) root** - kernel exploits that grant root in memory for the current boot only, without unlocking the bootloader, flashing anything, or tripping Knox/warranty fuses. Root is lost on every reboot and must be re-triggered.


> [!CAUTION]
> Everything on this page operates below the OS, either in the bootloader or in the kernel. A bad flash or a failed exploit run can **brick your device**. These are research-grade, device-specific tools maintained by small teams, not polished consumer apps. Read each project's documentation in full before using it, and keep a copy of your stock firmware.

## Temporary Root Method Comparison

The word **temporary root** is used for a session-only root that is lost when the device reboots. Bootloader patching is different: it can persist after a reboot, but it normally requires an unlock and a device-specific flash. Use the table to choose the right branch before opening a project link.

| Method | Permanent? | Bootloader unlock required? | Survives reboot? | Main limitation |
| :--- | :--- | :--- | :--- | :--- |
| Standard Magisk, KernelSU or APatch | Usually yes, until it is removed or an update replaces the image | Yes | Usually yes | Requires an unlockable device, an exact image or kernel, and careful updates. |
| MediaTek Kaeru or Fenrir bootloader modification | Yes, until the patched bootloader is restored | Yes, to flash the modification | Yes | MediaTek and device-specific; a bad LK/preloader change can brick the phone. |
| GhostLock family temporary root | No | No | No; rerun after each reboot | Only supported on particular vulnerable kernel builds and patch levels. |

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

See the [Root Hiding & Play Integrity apps](/apps-and-modules/root-management#root-hiding-play-integrity) section for the DenyList/Shamiko/Tricky Store side of this problem on a normally-rooted device.

## Temporary Root FAQ

### What is temporary root?

Temporary root is root access held in memory for the current Android boot. It does not install a persistent patched boot image, so the root session ends when the device restarts.

### Does temporary root survive reboot?

No. The GhostLock family described here must be triggered again after a reboot, and it may stop working after an OTA patches the vulnerable kernel.

### Can temporary root install root modules?

Some tools load a session root manager such as KernelSU and may support compatible modules during that boot. Do not assume every Magisk or KernelSU module works, and do not assume a module or its changes will persist after reboot.

### Does temporary root unlock the bootloader?

No. GhostLock-style temporary root leaves the bootloader locked. It cannot be used as a general substitute for unlocking when you need to flash a recovery, custom ROM or permanent root image.

### Is temporary root safe?

It avoids the data wipe and fuse changes associated with some bootloader unlocks, but it still runs privilege-escalation code as root. Use the linked source or release, verify the exact target build, keep a backup and understand that an exploit can be patched or misused.

### Which devices support temporary root?

There is no universal device list. Support depends on the exact model, kernel build and security patch. Check the project's supported-targets documentation and the [GhostLock device support table](./root-without-unlocking-bootloader.md#device-support-at-a-glance) rather than inferring support from a phone family.

### What happens after reboot?

The temporary root session and any session-only manager state disappear. The phone returns to its normal locked-bootloader state, and the tool must be run again if the firmware is still vulnerable.

## Safety & legal notes

- All of the tools on this page are research/proof-of-concept software maintained by individuals, not vendors. Expect rough edges, device-specific porting work, and breakage on the next OTA.
- Bootloader patching (Kaeru, Fenrir) carries a real brick risk if the wrong offsets are used for your exact bootloader version. Dump and keep your stock LK/preloader image before touching it.
- Kernel-exploit temp root (the GhostLock family) is comparatively low-risk to the device itself (no flashing), but it is still privilege-escalation code running as root on your own device; only build from source or use releases from the linked repos, and read the code if you're not sure.
- See the project's [Legal & Safety](../legal-disclaimer.md) page for the general disclaimer that applies to everything in this repository.

## Related resources

- [Root Without Unlocking the Bootloader: the GhostLock Temporary Root Guide](./root-without-unlocking-bootloader.md)
- [Root Framework Comparison](../rooting-guides/root-framework-comparison.md)
- [How to unlock an Android bootloader](../rooting-guides/how-to-unlock-bootloader.md)
- [Troubleshooting: Play Integrity & Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps)
- [Root Hiding & Play Integrity apps](/apps-and-modules/root-management#root-hiding-play-integrity)

[↑ Back to top](#mediatek-bootloader-modification-spoofing-tools)