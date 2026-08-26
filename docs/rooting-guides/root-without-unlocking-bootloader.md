---
layout: doc
title: "Root Without Unlocking the Bootloader: GhostLock Temporary Root Explained"
description: "GhostLock (CVE-2026-43499) lets you temporarily root Android without unlocking the bootloader or tripping Knox. Plain-English guide: what it is, what it can and can't do, and every app and tool that uses it."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.zhoe.org/rooting-guides/root-without-unlocking-bootloader
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - name: keywords
      content: "root without unlocking bootloader, ghostlock, cve-2026-43499, temporary root android, temp root, root without tripping knox, root my galaxy, root my pixel, root my device, ghostlock oneplus, kernelsu without bootloader unlock, one click root, session root, android kernel exploit root"
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: "Root Without Unlocking the Bootloader: GhostLock Temporary Root Explained"
  - - meta
    - property: og:description
      content: "How the GhostLock kernel bug (CVE-2026-43499) gives you temporary root on a locked bootloader - no Knox trip, no flashing - and its real limits."
  - - meta
    - property: og:url
      content: https://awesome-android-root.zhoe.org/rooting-guides/root-without-unlocking-bootloader
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
      content: "Root Without Unlocking the Bootloader: GhostLock Temporary Root Explained"
  - - meta
    - name: twitter:description
      content: "GhostLock (CVE-2026-43499): temporary root with a locked bootloader. What it does, what it can't do, and every app and project for it."
  - - meta
    - name: article:author
      content: Awesome Android Root
  - - meta
    - name: article:published_time
      content: 2026-08-26
  - - meta
    - name: article:modified_time
      content: 2026-08-26
  - - meta
    - name: article:section
      content: Guides
  - - meta
    - name: article:tag
      content: Temporary Root
  - - meta
    - name: article:tag
      content: GhostLock
  - - meta
    - name: article:tag
      content: Bootloader
  - - meta
    - name: article:tag
      content: KernelSU
---

# Root Without Unlocking the Bootloader: the GhostLock Temporary Root Guide

*The GhostLock bug (CVE-2026-43499), explained in plain English.*

Almost every root method on this site follows the same recipe: **unlock the bootloader, then flash a patched boot image**. But unlocking comes with costs - a wiped phone, a tripped Knox fuse on Samsung devices, a bootloader that reports "unlocked" to banking apps. That's why the discovery of **GhostLock** in mid-2026 caused such a stir: for a narrow window of devices, it delivers root with **none** of that.

This page is the plain-English, complete guide to GhostLock temporary root: what the bug actually is, what it lets you do, what it can *never* do, and every app and project built on it.

> [!TIP]
> **The 30-second version:** GhostLock is a 15-year-old bug in the Linux kernel that Android uses. The right app can trigger it to give itself root *for the current boot only* - no unlocked bootloader, no flashing, no Knox trip, no data wipe. Reboot and root is gone; run the tool again to get it back. It only works on specific devices running firmware up to about the **June 2026** security patch, and it is already being patched out of existence.

## Table of Contents

- [What is GhostLock? (in plain English)](#what-is-ghostlock-in-plain-english)
- [How the temporary root tools actually work](#how-the-temporary-root-tools-actually-work)
- [What GhostLock root CAN do](#what-ghostlock-root-can-do)
- [What GhostLock root CANNOT do](#what-ghostlock-root-cannot-do)
- [All apps and projects for GhostLock](#all-apps-and-projects-for-ghostlock)
- [Device support at a glance](#device-support-at-a-glance)
- [GhostLock vs. normal rooting (Magisk/KernelSU/APatch)](#ghostlock-vs-normal-rooting-magisk-kernelsu-apatch)
- [Is it safe? Risks and common sense](#is-it-safe-risks-and-common-sense)
- [FAQ](#faq)
- [Related pages](#related-pages)

## What is GhostLock? (in plain English)

**GhostLock** is the nickname for **CVE-2026-43499**, a high-severity (CVSS 7.8) security bug in the **Linux kernel** - the core that every Android phone runs on. It was publicly disclosed in 2026 by researchers at Nebula Security, whose AI agent VEGA found it; Google paid a **$92,337 bounty** for it through the kernelCTF program, and the researchers' exploit succeeded about **97% of the time** in testing.

Here is the bug without the jargon:

1. When two programs try to use the same resource at the same time, Linux uses **locks** so they take turns. High-priority programs can "inherit" a lock ahead of others - a feature called *priority inheritance*, handled by a kernel component called the **rtmutex/futex** code.
2. When one of those lock operations **fails and rolls back**, the kernel is supposed to clean up after *the process that asked for the lock*. Due to the bug, it cleans up after the **wrong process**.
3. That mistake frees memory while another task still holds a pointer to it - a classic **use-after-free**. The leftover pointer is a "ghost" reference to memory that no longer belongs to anyone - hence the name *GhostLock*.
4. An attacker (or a root app) can deliberately trigger this race and **reclaim that freed memory with their own data**. Since the kernel trusts that memory, the attacker effectively gets a write-into-the-kernel primitive - and from there, full control: **root**.

Two facts make this bug extraordinary:

- **It is old.** The faulty code entered Linux in version **2.6.39, released in 2011** - meaning the bug sat undetected in virtually every Linux system, Android included, for about fifteen years.
- **It is reachable from an ordinary app.** No unlocked bootloader, no developer options, no PC connection required at trigger time - the exploit runs with the permissions of a normal unprivileged app.

The bug affects Linux kernels **2.6.39 through 7.0**. It was fixed in mainline Linux **7.1** (commit `3bfdc63936dd`, April 2026) and backported to stable branches in May 2026 - but Android devices only receive kernel fixes through their OEMs' monthly security bulletins, and several shipping Android kernels, including the **Android GKI 6.12.x** branch common on 2025-2026 flagships, were still vulnerable into mid-2026. That gap between "fixed upstream" and "patched on your phone" is exactly the window the temporary-root tools live in.

## How the temporary root tools actually work

Every GhostLock tool follows roughly the same chain, usually wrapped in a one-tap app:

1. **Stage the payload.** A small native exploit binary is placed on the device - by the app itself, over wireless ADB, or via [Shizuku](https://shizuku.rikka.app/) (which lets apps act with ADB-level powers without full root).
2. **Trigger the bug.** The binary races the faulty lock code, wins, and reclaims the freed kernel memory.
3. **Escalate.** Using the new kernel write primitive, the payload either swaps its own credentials for root's (`init_cred`) or asks the kernel to execute a helper program as UID 0 - on hardened devices like recent Samsungs (where KDP protects credentials), it forges a kernel work item instead. Disabling SELinux enforcement along the way is part of most chains.
4. **Install a root manager for the session.** With a root shell in hand, the tool runs `ksud` to late-load a **KernelSU** (or ReSukiSU) loadable kernel module. You now have the familiar manager app, `su` prompts, and module support.
5. **Everything lives in memory.** Nothing was flashed. The bootloader still contains the stock, signed boot image - it simply loaded a kernel that was exploited at runtime. **Rebooting wipes it all away.**

> [!NOTE]
> Because the exploit manipulates kernel timing, several tools ask you to run them **within ~30 seconds of booting** for the best reliability. A failed run usually just panics or reboots the kernel - you try again.

## What GhostLock root CAN do

Think of it as "full root, rented by the boot":

- **Grant root to apps and modules.** A fully working KernelSU/ReSukiSU manager for the session: root file managers, backup tools, LSPosed-style frameworks that can load as modules, ad-blockers writing hosts files - most things you'd do with normal root, minus anything that needs flashing.
- **Keep the bootloader locked.** The device still reports a locked, verified boot chain. On Samsung, that means **Knox is not tripped**: Secure Folder, Samsung Wallet/Pass, and health features keep working. Play Integrity verdicts remain intact because the device genuinely still looks stock.
- **No data wipe, no flashing, no PC required.** Nothing is written to disk partitions. Nothing in the verified-boot chain changes. If you reboot and never run the tool again, the phone is bone-stock again.
- **Be re-triggered on demand.** Want root for ten minutes to restore a backup or freeze an app, then be effectively stock? Run the app, do the thing, reboot. Some projects (via ReSukiSU integration) can even auto-re-trigger at boot.
- **Run on devices that *can't* unlock.** Flagships sold with no bootloader-unlock path (recent Snapdragon Galaxies are the headline example) are reachable this way - as long as their kernel build is vulnerable. Ports now cover older flagships (Galaxy S22 Ultra), foldables (Z Fold6, OPPO Find N2), mid-rangers (iQOO Z9 5G, POCO M6 Pro), Amazon hardware on 5.X kernels, and even the Meta Quest 1 VR headset.

## What GhostLock root CANNOT do

This is equally important, and overselling it is how people brick phones:

- **It cannot survive a reboot.** There is no persistence. Root exists only in memory for the current boot. Every reboot means re-running the tool (and modules that expect to survive reboots may misbehave).
- **It cannot flash anything.** Custom ROMs, custom kernels, custom recoveries (TWRP/OrangeFox) all require an unlocked bootloader to install. GhostLock does not change that - the bootloader is still locked and still verifies everything.
- **It cannot rescue a bricked device.** A locked bootloader gives you "practically zero" recovery options if something goes catastrophically wrong elsewhere. Ironically, this method is safest *because* you can't flash - but don't mistake it for a recovery tool.
- **It cannot take OTA updates and keep working.** Each monthly security patch can (and eventually will) close the hole. Tools generally require firmware on or before the **June 2026** patch level; some July 2026 builds still work, but that shrinks with every bulletin. Staying on old firmware means accumulating other unpatched vulnerabilities - a real security trade-off.
- **It cannot run on just any device.** Exploitation needs per-device, per-kernel-build offsets. Newer devices (e.g. the Galaxy S26 series) shipped with a memory layout this specific exploit family can't hit. If nobody ported offsets for your exact firmware, it won't work.
- **It cannot hide forever.** Even with the bootloader reading "locked," some security-focused apps can still detect the *artifacts* of rooting (manager apps, su binaries, module files) on disk. The bug hides the bootloader state, not the apps you install afterward - see [Root Hiding & Play Integrity](../rooting-guides/index.md#root-hiding-play-integrity-resources) for that half of the problem.
- **It cannot outlive the patch cycle.** OEMs are actively shipping the fix. Treat every GhostLock tool as a **short-lived, closing window**, not a permanent root method. Check the linked repos for current status before relying on one.

## All apps and projects for GhostLock

Everything public that implements or enables CVE-2026-43499 temporary root, grouped by how you use it. Star counts and device tables change fast - always check the repo's supported-devices file before trying one.

### One-tap apps (easiest)

- **[⭐ Root My Galaxy](https://github.com/BuSung-dev/Root-My-Galaxy)** - The original one-click implementation, for Snapdragon Galaxy flagships (S24/S25 series, S24 FE, A56, and others). Bootloader stays locked, Knox isn't tripped, so Secure Folder, Samsung Wallet, and Play Integrity keep working. Functions as a KernelSU installer with per-device exploit profiles. `FOSS` (Apache-2.0)
  - **[Root-My-Galaxy-Payloads](https://github.com/BuSung-dev/Root-My-Galaxy-Payloads)** - Companion repo with the signed per-device exploit offsets, kernel profiles, and KernelSU artifacts the app fetches at runtime. Adding support for a new device means porting a profile here. `FOSS` (Apache-2.0)
- **[GhostLock App](https://github.com/YuKongA/ghostlock-app)** - One-tap execution app for the GhostLock exploit - install, open, tap, rooted for the session. `FOSS` (Apache-2.0)
- **[GhostLock-Galaxy](https://github.com/wxxsfxyzm/GhostLock-Galaxy)** - App + CLI for the Samsung Galaxy Z Fold6 (SM-F9560, kernel 6.1). Takes the shell-permission route: start Shizuku via wireless debugging (or use `adb shell`), grant the app, tap **Run**. The kernel is matched against the offset table via `uname -r` at startup, and unsupported kernels are rejected immediately; the repo also documents offset extraction from `boot.img`/`xbl_config.img`. `FOSS` (Apache-2.0)
- **[iQOO Z9 5G / vivo T3 5G Root](https://github.com/ankitrawatgit/iQOO-Z9_5G-vivo-T3_5G-Root-GhostLock)** - One-tap root app plus payloads for the iQOO Z9 5G and vivo T3 5G (MediaTek Dimensity 7200 / MT6886, kernel 5.15) - a rare GhostLock port for vivo-family devices. `FOSS`
- **[Root My Pixel](https://github.com/alex193a/Root-My-Pixel)** - Port for Google Pixel devices. Uses Shizuku to stage the payload without needing prior root or a PC, then runs the exploit to install ReSukiSU/KernelSU for the session. `FOSS`
- **[Root My Device](https://github.com/Witaqua-tools/Root-My-Device)** - Community fork of Root My Galaxy, generalized beyond Samsung with its own payload feed for additional firmware builds. `FOSS` (Apache-2.0)
- **[root-my-nothing](https://github.com/ang3lo-azevedo/root-my-nothing)** - One-click temporary root for the Nothing Phone (1); installs KernelSU without unlocking the bootloader. `FOSS`

### Command-line exploits & device ports (for tinkerers)

- **[ghostlock-oneplus](https://github.com/JoinChang/ghostlock-oneplus)** - The most developed standalone exploit: root + KernelSU on OnePlus/OPPO/realme devices with a locked bootloader (OnePlus 13/15, Ace 6T, OPPO Pad 4 Pro, and even Xiaomi 17). Runtime kernel auto-detection with a multi-device offset table, a phone-standalone "bootstrap" mode, and optional auto-re-trigger at boot via ReSukiSU. Run it within ~30 seconds of boot for best reliability. `FOSS`
- **[GhostLock-5.10](https://github.com/R0rt1z2/GhostLock-5.10)** - Kernel root exploit for some 5.X-kernel devices - mostly Amazon hardware - from the developer behind Kaeru and Fenrir. Proof that the bug reaches older kernels, not just GKI 6.12 flagships. `FOSS`
- **[ghostlock-emerald](https://github.com/datfooldive/ghostlock-emerald)** - GhostLock port for the POCO M6 Pro ("emerald", MediaTek Helio G99 Ultra / MT6789) with locked bootloader; roots and installs KernelSU. `FOSS`
- **[ghostlock-a17](https://github.com/mobilehackinglab/ghostlock-a17)** - Full user-to-root chain for the Samsung Galaxy A17 (SM-A175F, Android 16 / GKI 6.12). Notable because it defeats **Samsung KDP** (kernel data protection) by forging a kernel work item instead of writing credentials, and ships a per-boot root shell (`g4d`/`g4sh`). `FOSS`
- **[IonStack-S22U](https://github.com/sarabpal-dev/IonStack-S22U)** - Full CVE-2026-43499 exploit chain for the Samsung Galaxy S22 Ultra (5.10 kernel) - extends coverage to an older flagship generation. `FOSS`
- **[oppo-ghostlock](https://github.com/pubglite55/oppo-ghostlock)** - GhostLock exploit adaptation for the OPPO Find N2 foldable. `FOSS`
- **[pixel-ksu-root](https://github.com/JingMatrix/pixel-ksu-root)** - ADB-driven KernelSU loader for stock Google Pixels, from the maintainer of LSPosed/Vector. Gets temporary kernel read/write via GhostLock, then late-loads a signature-matched `kernelsu.ko` for the running KMI - manager-agnostic, so it works with any KernelSU-fork manager. `FOSS`
- **[QuestStack](https://github.com/starseed12345/QuestStack)** - Unlocks the **Meta Quest 1** (VR headset) bootloader and gains root using GhostLock combined with CVE-2021-1931 - a striking example of the technique reaching beyond phones. `FOSS`
- **[smt878u-ionstack-poc](https://github.com/Wtrwx/smt878u-ionstack-poc)** - Pure-C re-root proof-of-concept for the Samsung Galaxy Tab S7+ (SM-T878U), demonstrating re-triggering IonStack/GhostLock root after reboot. `FOSS`

### Research, foundations & supporting projects

- **[CyberMeowfia (NebuSec)](https://github.com/NebuSec/CyberMeowfia)** - The original IonStack research writeup and exploit source for CVE-2026-43499 that every tool above is built on. Read this if you want to understand the bug itself.
- **[CVE-2026-43499-popsicle (x-spy)](https://github.com/x-spy/CVE-2026-43499-popsicle)** - Clean reference implementation of the exploit for GKI 6.12 kernels; credited as a base by several of the device ports above. `FOSS`
- **[KernelSU](https://github.com/tiann/KernelSU)** - The kernel-based root framework every GhostLock tool installs for the session (loaded as a module via `ksud`).
- **[ReSukiSU](https://github.com/ReSukiSU/ReSukiSU)** - KernelSU fork favored by several GhostLock tools; its `ksud` provides the late-load (LKM) install path and its app bundles the needed module binaries. Also powers the auto-re-trigger-at-boot integrations.
- **[Shizuku](https://github.com/RikkaApps/Shizuku)** - Not root-related by itself, but Root My Pixel (and similar apps) use it to stage the exploit payload with ADB-level privileges - no prior root needed.
- **[Kaeru / Fenrir & other MediaTek bootloader tools](./temporary-root-solutions.md)** - A *different* route to "root-like" results on a locked device (bootloader patching rather than kernel exploitation). Covered on the [Bootloader Modification & Temporary Root Solutions](./temporary-root-solutions.md) page.

> [!CAUTION]
> Only download these tools from the GitHub repositories linked above. Fake "one-click root" apps shipping malware ride every exploit hype cycle, and a malicious "GhostLock" APK would be a perfect vehicle. Verify the repo, prefer building from source, and read the code if you're able.

## Device support at a glance

A snapshot of publicly verified targets - **not** a guarantee for your exact firmware. Patch level matters as much as model.

| Project | Verified devices (examples) | Notes |
|---|---|---|
| Root My Galaxy | Galaxy S24/S25 series, S24 FE, A56 | Snapdragon models; ≤ ~June 2026 patch |
| Root My Pixel | Google Pixel series | Stages via Shizuku; ≤ ~June 2026 patch |
| ghostlock-oneplus | OnePlus 13 / 15, Ace 6T, OPPO Pad 4 Pro, Xiaomi 17 | Auto-detects kernel; some Aug 2026 builds reported working |
| ghostlock-emerald | POCO M6 Pro (MT6789) | MediaTek port |
| ghostlock-a17 | Galaxy A17 (SM-A175F) | Bypasses Samsung KDP; July 2026 SPL verified |
| root-my-nothing | Nothing Phone (1) | One-click |
| smt878u-ionstack-poc | Galaxy Tab S7+ (SM-T878U) | Re-root POC |
| GhostLock-Galaxy | Galaxy Z Fold6 (SM-F9560) | Kernel 6.1 / Android 14; Shizuku or `adb shell` staging |
| oppo-ghostlock | OPPO Find N2 | Exploit adaptation |
| IonStack-S22U | Galaxy S22 Ultra | 5.10 kernel (older flagship) |
| GhostLock-5.10 | Mostly Amazon devices | 5.X kernels - older than GKI |
| iQOO Z9 5G / vivo T3 5G Root | iQOO Z9 5G, vivo T3 5G | Dimensity 7200 (MT6886), kernel 5.15 |
| pixel-ksu-root | Google Pixel (stock) | Manager-agnostic KernelSU late-load via ADB |
| QuestStack | Meta Quest 1 | Bootloader unlock + root (GhostLock + CVE-2021-1931) |

Devices shipping **after** mid-2026 (e.g. Galaxy S26 series) or running kernels already carrying the backported fix are **not** exploitable by this family.

## GhostLock vs. normal rooting (Magisk/KernelSU/APatch)

| | Normal root (Magisk/KernelSU/APatch) | GhostLock temporary root |
|---|---|---|
| Bootloader | **Must be unlocked** (data wipe) | **Stays locked** |
| Knox e-fuse | Tripped on Samsung | **Not tripped** |
| Survives reboot | Yes | **No** - re-run each boot |
| Custom ROMs / recovery / kernels | Yes | **No** |
| Play Integrity out of the box | Needs hiding stack | Still intact (device reads as stock) |
| Module support | Full | Session-only, via KernelSU/ReSukiSU |
| OTA updates | Managed, re-patch after | **Blocked** - updating likely kills root |
| Device coverage | Broad | Narrow, per-device, patch-level dependent |
| Longevity | A method, stays working | A **closing window**, already being patched |

**Rule of thumb:** if your device *can* unlock its bootloader and you want permanent root, use the normal method - start with the [Root Framework Comparison](./root-framework-comparison.md). GhostLock is for devices that can't unlock, users who absolutely cannot lose Knox/Wallet/Secure Folder, or anyone who only needs root occasionally and wants to stay stock otherwise.

## Is it safe? Risks and common sense

- **For your hardware:** comparatively low risk. Nothing is flashed or written to partitions, so the classic brick scenarios mostly don't apply. A failed exploit run typically ends in a kernel panic and reboot.
- **For your software:** it is still privilege-escalation code running as root on your kernel. Only use the linked, source-available projects; avoid random APKs claiming "GhostLock root".
- **For your security posture:** staying on pre-June/July-2026 firmware to keep temp root means skipping real security fixes - including fixes for other exploitable bugs. Weigh that honestly. (This is the same trade-off as delaying any update for root.)
- **For the ecosystem:** these are research tools from small teams. Expect per-device rough edges, and check each repo's issue tracker for current firmware support before updating anything.

See the project's [Legal & Safety](../legal-disclaimer.md) page for the disclaimer that applies to everything in this repository.

## FAQ

**Q: Does GhostLock root trip Knox?**
No. Knox trips when the bootloader is unlocked. GhostLock never touches the bootloader, so the e-fuse stays intact and Secure Folder, Samsung Wallet, and Play Integrity keep working.

**Q: Will it work on the latest update?**
Probably not. The tools target firmware up to roughly the June 2026 security patch (a few July builds still work). OEMs are shipping the fix - Samsung was widely expected to close it in the August 2026 bulletin. If you updated past the supported patch level, you're out of luck.

**Q: Can I make it persistent?**
Not really. Rebooting clears it by design - that's the trade for keeping the bootloader locked. Some tools (via ReSukiSU) can auto-re-trigger after each boot, which is close, but a factory reset or update still ends it.

**Q: Do I need a computer?**
Usually not. Apps like Root My Galaxy and the GhostLock App handle everything on-device (some use Shizuku or wireless ADB, which the app walks you through). The CLI ports like ghostlock-oneplus are more comfortable with ADB.

**Q: Is this the same as the MediaTek bootloader tools (Kaeru/Fenrir)?**
No - different technique, same "avoid the unlocked bootloader" goal. Kaeru/Fenrir patch the bootloader itself and require flashing; GhostLock exploits the kernel in memory. See the [Bootloader Modification & Temporary Root Solutions](./temporary-root-solutions.md) page for that side.

**Q: My device isn't listed anywhere - can I add it?**
Possibly. The exploits need per-device offsets; ghostlock-oneplus documents how to extract them from just a `boot.img`, GhostLock-Galaxy ships a `tools/extract_target.py` that parses them from `boot.img` + `xbl_config.img`, and Root-My-Galaxy-Payloads explains the profile format. Check each repo's contributing notes.

## Related pages

- [Bootloader Modification & Temporary Root Solutions](./temporary-root-solutions.md) - the broader family: Kaeru, Fenrir, and other locked-bootloader approaches
- [Root Framework Comparison](./root-framework-comparison.md) - choosing between Magisk, KernelSU, and APatch for permanent root
- [Complete Bootloader Unlocking Guide](./how-to-unlock-bootloader.md)
- [Samsung Rooting Guide](./how-to-root-samsung-phone.md) - Knox trade-offs in detail
- [OnePlus Rooting Guide](./how-to-root-oneplus-phone.md) • [Pixel Rooting Guide](./how-to-root-pixel-phone.md)
- [Root Hiding & Play Integrity](../../README.md#root-hiding-play-integrity) - keeping apps happy once you *are* rooted
- [Troubleshooting](../troubleshooting.md)

[↑ Back to top](#root-without-unlocking-the-bootloader-the-ghostlock-temporary-root-guide)
