---
layout: doc
title: "GhostLock: Temporary Root Guide"
description: How GhostLock gives temporary root on vulnerable Android builds without unlocking the bootloader, with reboot behavior, limits and security risks.
head:
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:description
      content: How GhostLock gives temporary root on vulnerable Android builds without unlocking the bootloader, with reboot behavior, limits and security risks.
  - - meta
    - name: twitter:description
      content: How GhostLock gives temporary root on vulnerable Android builds without unlocking the bootloader, with reboot behavior, limits and security risks.
  - - meta
    - name: article:author
      content: Awesome Android Root
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
  - - script
    - type: application/ld+json
    - |
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "@id": "https://awesome-android-root.xyz/rooting-guides/root-without-unlocking-bootloader#article",
        "headline": "GhostLock: Temporary Root Guide",
        "description": "How GhostLock provides temporary Android root on supported vulnerable builds, and what it cannot do.",
        "image": "https://awesome-android-root.xyz/images/og.png",
        "author": { "@id": "https://awesome-android-root.xyz/#organization" },
        "publisher": { "@id": "https://awesome-android-root.xyz/#organization" },
        "datePublished": "2026-08-26",
        "dateModified": "2026-10-21",
        "mainEntityOfPage": {
          "@id": "https://awesome-android-root.xyz/rooting-guides/root-without-unlocking-bootloader#webpage"
        },
        "articleSection": "Android Rooting Guides",
        "inLanguage": "en-US",
        "isAccessibleForFree": true
      }

---

# GhostLock: Temporary Root Guide

**Can Android be rooted without unlocking the bootloader?** Sometimes, but only temporarily and only on a narrow set of vulnerable device builds. GhostLock (CVE-2026-43499) can grant an in-memory root session while the bootloader remains locked; it is not a permanent replacement for bootloader unlocking.

- **What it is:** a device- and security-patch-dependent temporary root technique that late-loads a KernelSU-compatible module.
- **What it is not:** persistent root, a bootloader unlock, a way to flash a custom ROM or recovery, or a guarantee that every listed model still works.
- **After a full reboot:** the session root is gone and the tool must be run again, if the device firmware is still vulnerable. A soft reboot keeps the late-loaded module.
- **Why it can fail:** the bug is a race, so retries and kernel panics are normal, and a payload only works on the exact kernel layout it was built for.

> [!NOTE]
> Temporary root is not one exploit. **DirtyFrag (CVE-2026-43284)** is a separate, deterministic page-cache route that needs a kernel module built for the device's KMI, and some projects ship both routes. This page covers GhostLock, whose futex race can lose.

> [!TIP]
> For maintained device and build information, see our sister project [Awesome Temporary Root](https://awesome-temporary-root.pages.dev/) ([GitHub](https://github.com/fynks/awesome-temporary-root)) and the [section directory](#all-apps-and-projects-for-ghostlock) below.


*The GhostLock bug (CVE-2026-43499), explained in plain English.*

Almost every root method on this site follows the same recipe: **unlock the bootloader, then flash a patched boot image**. But unlocking comes with costs - a wiped phone, a tripped Knox fuse on Samsung devices, a bootloader that reports "unlocked" to banking apps. That's why the discovery of **GhostLock** in mid-2026 caused such a stir: for a narrow window of devices, some documented runtime chains avoid conventional bootloader unlocking and boot-image flashing.

This page explains GhostLock temporary root; the sister project maintains the device and firmware listings.

> [!TIP]
> **The 30-second version:** GhostLock is a 15-year-old bug in the Linux kernel that Android uses. The right tool wins a race, gets kernel read/write, and late-loads a KernelSU-compatible module that grants `su` *for the current boot only*. A full reboot clears it; a soft reboot does not. Run the tool again after a full reboot if the firmware is still vulnerable. It only works on exact vulnerable device builds: vendor fixes, a different kernel commit, page size or hardening can make a tool incompatible, and there is no universal security-patch-month cutoff.

## Table of Contents

- [What is GhostLock? (in plain English)](#what-is-ghostlock-in-plain-english)
- [How the temporary root tools actually work](#how-the-temporary-root-tools-actually-work)
- [What GhostLock root CAN do](#what-ghostlock-root-can-do)
- [What GhostLock root CANNOT do](#what-ghostlock-root-cannot-do)
- [Soft reboot vs full reboot](#soft-reboot-vs-full-reboot)
- [Match the exact target](#match-the-exact-target)
- [Temporary-root resource directory](#all-apps-and-projects-for-ghostlock)
- [Device support at a glance](#device-support-at-a-glance)
- [Run a session safely](#run-a-session-safely)
- [Modules and managers](#modules-and-managers)
- [If a run fails](#if-a-run-fails)
- [GhostLock vs. normal rooting (Magisk/KernelSU/APatch)](#ghostlock-vs-normal-rooting-magisk-kernelsu-apatch)
- [Is it safe? Risks and common sense](#is-it-safe-risks-and-common-sense)
- [FAQ](#faq)
- [Related pages](#related-pages)

## What is GhostLock? (in plain English)

**GhostLock** is the nickname for **CVE-2026-43499**, a use-after-free in Linux rtmutex/futex priority-inheritance code. The original [Nebula Security / IonStack research](https://github.com/NebuSec/CyberMeowfia/tree/main/IonStack/CVE-2026-43499) and [Linux CNA record](https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/43xxx/CVE-2026-43499.json) describe the bug and fixes.

Here is the bug without the jargon:

1. When two programs try to use the same resource at the same time, Linux uses **locks** so they take turns. High-priority programs can "inherit" a lock ahead of others - a feature called *priority inheritance*, handled by a kernel component called the **rtmutex/futex** code.
2. When one of those lock operations **fails and rolls back**, the kernel is supposed to clean up after *the process that asked for the lock*. Due to the bug, it cleans up after the **wrong process**.
3. That mistake leaves a pointer to a kernel-stack waiter after its stack storage is reclaimed - a **use-after-free**. The leftover pointer is a "ghost" reference to memory that no longer belongs to anyone - hence the name *GhostLock*.
4. An attacker (or a root app) can deliberately trigger this race and **reclaim that freed memory with their own data**. Since the kernel trusts that memory, the attacker effectively gets a write-into-the-kernel primitive - and from there, full control: **root**.

Two facts make this bug extraordinary:

- **It is old.** The faulty code entered Linux in version **2.6.39, released in 2011** - meaning the bug sat undetected in virtually every Linux system, Android included, for about fifteen years.
- **It is reachable without a bootloader unlock.** Some chains run from an ordinary app; others require ADB/Shizuku shell privileges. No conventional bootloader unlock is needed for a supported runtime chain.

Because the bug is a race, a failed attempt can panic or reboot the phone instead of finishing. That is normally recoverable, not a brick, but it means retries are part of the process. A working payload is tied to the exact kernel layout, not just the model name.

The [Linux CNA record](https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/43xxx/CVE-2026-43499.json) identifies introduction in **2.6.39** and fixes in **5.10.261, 5.15.212, 6.1.175, 6.6.140, 6.12.86, 6.18.27, 7.0.4** and mainline **7.1**. Vendor backports can fix earlier-looking versions, and some vendors change a kernel without changing the version string, so treat these numbers as a hint. A loader's vulnerability check can help, but passing it does not prove that the complete root chain will work. This is a vulnerability history, not an Android support range: exploit offsets, configuration and compiled stack layouts still have to match the exact device.

## How the temporary root tools actually work

Many GhostLock tools follow roughly this chain, sometimes wrapped in an app:

1. **Stage the payload.** A small native exploit binary is placed on the device - by the app itself, over wireless ADB, or via [Shizuku](https://shizuku.rikka.app/) (which lets apps act with ADB-level powers without full root).
2. **Trigger the bug.** The binary races the faulty lock code, wins, and reclaims the freed kernel memory.
3. **Escalate.** Using the new kernel write primitive, the payload either swaps its own credentials for root's (`init_cred`) or asks the kernel to execute a helper program as UID 0 - on hardened devices like recent Samsungs (where KDP protects credentials), it forges a kernel work item instead. Disabling SELinux enforcement along the way is part of most chains.
4. **Late-load a root manager.** With a root shell in hand, the tool runs `ksud` to load a **KernelSU-compatible** kernel module. The manager then supplies `su`, app approvals and module mounting for the rest of the boot. It must ship `libksud.so`; a manager without that library cannot finish the chain.
5. **Runtime root ends on a full reboot.** No patched boot image is flashed by these chains. A soft reboot restarts Android userspace but keeps the late-loaded module; a full reboot loads the stock kernel and clears root. Files, installed apps or configuration changed during the session may still remain.

> [!NOTE]
> Because the exploit manipulates kernel timing, retries are expected and a failed run can panic or reboot the phone. Some tools ask you to run soon after boot or allow several attempts, others tell you to reboot between attempts: follow the target project's instructions. Do not start a second run while the first one is still working.

## What GhostLock root CAN do

Think of it as "full root, rented by the boot":

- **Grant root to apps and modules.** On chains with a matched KernelSU-compatible late-load, compatible root apps and modules can work during the session. A root shell alone does not guarantee module support.
- **Keep the bootloader locked** on a supported runtime chain. This does not guarantee Knox services, banking apps or Play Integrity results.
- **Avoid conventional boot-image flashing.** Some apps work on-device; other routes need ADB or Shizuku. Changes made by root can still persist in userdata.
- **Be re-triggered after reboot** if the exact firmware remains vulnerable. Automatic re-exploitation creates a new session rather than preserving active kernel root.
- **Work on some devices without an unlock path.** Check the [device/build index](https://awesome-temporary-root.pages.dev/guide/#supported-devices) and the loader's own target list, not a broad product-family claim.

## What GhostLock root CANNOT do

This is equally important, and overselling it is how people brick phones:

- **It cannot survive a full reboot.** Active kernel root exists in memory for the current boot; installed apps and configuration can remain. A soft reboot keeps the late-loaded module, but every full reboot means re-running the tool (and modules that expect to survive reboots may misbehave).
- **It does not bypass the stock boot verification chain.** Session root does not make arbitrary custom ROMs, kernels or recoveries acceptable to a locked bootloader.
- **It cannot rescue a bricked device.** Recovery options depend on the device and stock flashing tools. A runtime exploit is not a recovery tool or a guarantee against bricking.
- **It cannot take OTA updates and keep working.** Each monthly security patch can (and eventually will) close the hole. Match the actual vendor fixes and the exact upstream build inventory rather than a blanket patch-month cutoff. Staying on old firmware means accumulating other unpatched vulnerabilities - a real security trade-off.
- **It cannot run on just any device.** Exploitation needs per-device, per-kernel-build offsets. Some builds have incompatible memory layouts even when the vulnerability is present. If nobody ported offsets for your exact firmware, it won't work.
- **It cannot hide forever.** Even with the bootloader reading "locked," some security-focused apps can still detect the *artifacts* of rooting (manager apps, su binaries, module files) on disk. The runtime chain can leave the bootloader locked; it does not hide installed apps or root artifacts - see [Root Hiding & Play Integrity apps](/apps-and-modules/root-management#root-hiding-play-integrity) for that half of the problem.
- **It cannot outlive the patch cycle.** OEMs are actively shipping the fix. Treat every GhostLock tool as a **short-lived, closing window**, not a permanent root method. Check the linked repos for current status before relying on one.

## Soft reboot vs full reboot

The distinction matters more than it does on a normally rooted phone:

- **Soft reboot** restarts Android userspace and `system_server`, not the kernel. The late-loaded module stays loaded and module mounts reactivate.
- **Full reboot** starts the stock kernel again and clears root. Files under `/data/adb` can remain, but nothing loads them.

Do not delete `/data/adb` to "unroot" or clean up. It also holds ADB keys and data other tools rely on, and deleting it does not remove active kernel root. Reboot instead.

## Match the exact target

A model name is not a target. Two phones on the same Android release can differ in kernel commit, page size and vendor hardening, and a payload is built around the exact kernel layout. Record the full identity before running anything and keep it somewhere you can read after a reboot:

```bash
adb shell getprop ro.product.model
adb shell getprop ro.product.device
adb shell getprop ro.build.display.id
adb shell getprop ro.build.version.release
adb shell uname -r
```

Without a computer, **Settings > About phone** gives the model and build, and `uname -r` in Termux gives the kernel.

A kernel release can include the upstream version, KMI, commit, vendor build and page size. Loaders usually match the complete string reported by the device, not the product family. If your exact build is not in the project's support list, stop instead of trying the closest one. An OTA changes the target, so re-check after any update.

## Temporary-root resource directory {#all-apps-and-projects-for-ghostlock}

Our sister project **[Awesome Temporary Root](https://awesome-temporary-root.pages.dev/)** ([GitHub repository](https://github.com/fynks/awesome-temporary-root)) maintains device and build tables, loader references, module reports and practical guidance. Its scope includes DirtyFrag, GhostLock and other device-specific routes, not just GhostLock. Use these sections rather than a static copy of device lists here:

| Section | What it covers |
| --- | --- |
| [Temporary-root overview](https://awesome-temporary-root.pages.dev/guide/#what-is-temporary-root) | Methods, reboot behavior and limitations. |
| [Supported devices](https://awesome-temporary-root.pages.dev/guide/#supported-devices) | Target matching and the meaning of testing statuses. |
| [Samsung Galaxy](https://awesome-temporary-root.pages.dev/guide/#samsung-galaxy) | Galaxy builds and loader notes. |
| [Google Pixel](https://awesome-temporary-root.pages.dev/guide/#google-pixel) | Pixel builds and loader notes. |
| [OnePlus, OPPO and Realme](https://awesome-temporary-root.pages.dev/guide/#oneplus-oppo-and-realme) | Device builds and loader notes. |
| [vivo and iQOO](https://awesome-temporary-root.pages.dev/guide/#vivo-and-iqoo) | Device builds and loader notes. |
| [Xiaomi, ASUS, Nothing and Honor](https://awesome-temporary-root.pages.dev/guide/#xiaomi-asus-nothing-and-honor) | Device builds and loader notes. |
| [Amazon, NVIDIA and Meta](https://awesome-temporary-root.pages.dev/guide/#amazon-nvidia-meta) | Device builds and loader notes. |
| [Live upstream tables](https://awesome-temporary-root.pages.dev/guide/#live-upstream-tables) | Original project inventories and payload feeds. |
| [Tools and managers](https://awesome-temporary-root.pages.dev/guide/#tools-and-managers) | Loaders, root managers, transports and download checks. |
| [Modules](https://awesome-temporary-root.pages.dev/guide/#modules) | Community compatibility reports and module risks. |
| [Quick start](https://awesome-temporary-root.pages.dev/guide/#quick-start) | Target matching, backup, setup and verification. |
| [Troubleshooting and FAQ](https://awesome-temporary-root.pages.dev/guide/#troubleshooting-and-faq) | Failed runs, recovery and common questions. |
| [Contributing](https://awesome-temporary-root.pages.dev/guide/#contributing-and-disclaimer) | How to report reproducible device or module results. |
| [Sources](https://awesome-temporary-root.pages.dev/guide/#sources) | Research, project and module-report references. |

The sister index is not exhaustive. See also our [temporary-root app catalog](../apps-and-modules/root-management.md#temporary-root-locked-bootloader), and check each loader's own target list and instructions.

### Research, foundations & supporting projects

- **[CyberMeowfia / IonStack (NebuSec)](https://github.com/NebuSec/CyberMeowfia/tree/main/IonStack/CVE-2026-43499)** - Original GhostLock research and exploit source.
- **[CVE-2026-43499-popsicle](https://github.com/x-spy/CVE-2026-43499-popsicle)** - GKI 6.12 reference implementation; not a universal device support list.
- **[KernelSU](https://github.com/tiann/KernelSU)**, **[KernelSU-Next](https://github.com/KernelSU-Next/KernelSU-Next)**, **[ReSukiSU](https://github.com/ReSukiSU/ReSukiSU)** and **[BakaSU](https://github.com/Baka-SU/BakaSU)** - Session root managers used by compatible chains; none roots a stock locked device by itself. Use the build the loader names, which on Samsung may be a patched fork.
- **[Shizuku](https://github.com/RikkaApps/Shizuku)** - Shell-privilege bridge required by some apps, not root access itself.

> [!CAUTION]
> Original repository links are references, not APK safety endorsements. Back up your data, check exact compatibility and recovery options, and avoid unknown downloads.

## Device support at a glance

The [sister project's device index](https://awesome-temporary-root.pages.dev/guide/#supported-devices) distinguishes documented tests from experimental or partial runs and links to original sources. Check the [live upstream tables](https://awesome-temporary-root.pages.dev/guide/#live-upstream-tables) and the loader's own instructions for your exact model, firmware and full kernel release. If the exact target is not documented, stop rather than trying a similar build.

A generated profile, matching kernel version or vulnerability probe is not proof of a complete root session. A KMI label such as `android14-6.1` does not necessarily identify the phone's installed Android version. These are project or community reports, not guarantees of success.

## Run a session safely

Nothing in this workflow flashes, patches or installs a boot image. If a guide asks you to, it is a permanent-root procedure, not a temporary one.

1. **Back up and plan recovery.** Copy data you cannot lose, and know how to reach safe mode, download mode or a service center for that model before you start.
2. **Install the manager the loader names.** Open it once so its services register. Do not use its install, flash or patch-boot-image actions: on a locked phone those write protected partitions and are a documented hardbrick path.
3. **Run only the loader for your exact target.** Install it from the project's own release page, grant the transport it asks for (on-device, Shizuku or ADB), confirm it detects the expected model and kernel, then start the run and keep it in the foreground. Do not start a second run in the same boot; reboot first if the tool reports a failure and asks for it.
4. **Verify root before installing anything else.**

   ```bash
   adb shell su -c id
   ```

   Expected output starts with `uid=0(root)`. The SELinux context can differ. If `su` is missing, the exploit may have completed while the late-load failed.
5. **Add modules one at a time.** Install one module, soft reboot, test the feature it changes, then continue. Leave autorun off until the set is known good.

## Modules and managers

Late-loaded KernelSU is not a normal boot-time install. There is no `init.rc` injection, no module `preinit`, no `post-fs-data` event and no `ksud` kprobe hooks; safe-mode detection and boot-log capture are disabled. `late-load.d`, `post-mount.d`, `service.d` and `boot-completed.d` scripts still run.

Modules that mount a file or hook an app at runtime can work. Modules that must run before `system_server`, replace a boot script, inject into `init.rc` or write a partition cannot, and a bad one can bootloop the phone. Samsung's DEFEX rules and KDP add another way for a module that works on a Pixel to fail on a Galaxy.

Use the manager the loader names. Public chains reference KernelSU, KernelSU-Next, KowSU, ReSukiSU, BakaSU and Samsung-patched KernelSU builds, and the manager must ship `libksud.so`; a manager without it cannot finish a late-load. A manager alone does not provide temporary root, and its install or patch-boot-image actions are not part of this workflow.

Install one module at a time and soft reboot between changes. If the phone bootloops, the manager may be unreachable, so keep the module list short enough to reason about. Grant root per app and revoke it when the session ends. Community module reports are starting points, not device-independent results: [Temporal Root Modules List](https://github.com/rushiranpise/temporal-root-modules-list).

## If a run fails

- **Panic, reboot or a "not vulnerable" error.** The race can lose. Let the phone boot normally, confirm the kernel is unchanged, and retry only as the target project documents. Some tools allow several attempts; others require a reboot between attempts.
- **The app reports success but `su` is missing.** The exploit likely reached root while the late-load failed. Check that the named manager is installed and ships `libksud.so`, then reboot and run the tool again.
- **A module bootloops the phone.** A full reboot clears the late-loaded module. If you can reach the loader app, disable its autorun before the next boot, or it can reapply the same module and repeat the loop. Do not delete `/data/adb`.
- **"Reboot device - d2" on Samsung, or no download mode.** Stop and follow the model's recovery instructions. Do not keep rerunning the exploit.

## GhostLock vs. normal rooting (Magisk/KernelSU/APatch)

| | Normal root (Magisk/KernelSU/APatch) | GhostLock temporary root |
|---|---|---|
| Bootloader | **Must be unlocked** (data wipe) | **Stays locked** |
| Knox e-fuse | Tripped on Samsung | Not guaranteed by this guide |
| Survives reboot | Yes | **No** - re-run after each full reboot; a soft reboot keeps root |
| Custom ROMs / recovery / kernels | Yes | **No** |
| Play Integrity out of the box | Needs hiding stack | Device/app-policy dependent |
| Module support | Full | Session-only, late-loaded KernelSU-compatible manager |
| OTA updates | Managed, re-patch after | May patch or break the exploit |
| Device coverage | Broad | Narrow, per-device, patch-level dependent |
| Longevity | A method, stays working | A **closing window**, already being patched |

**Rule of thumb:** if your device *can* unlock its bootloader and you want permanent root, use the normal method - start with the [Root Framework Comparison](./root-framework-comparison.md). GhostLock is for devices that can't unlock, users who need a locked bootloader, or anyone who only needs root occasionally and wants to stay stock otherwise.

## Is it safe? Risks and common sense

- **For your hardware and data:** no flashing does not mean no risk. Kernel crashes, unsafe modules and root writes can cause bootloops or data loss. Back up first and establish recovery access.
  Some modules can cause bootloops that are difficult to recover from on a locked device. The [XDA temporary-root module list](https://xdaforums.com/t/list-of-modules-working-on-temporal-root.4796105/) collects community results.
- **For what you install:** download from the project's own release page. Avoid reuploads, Telegram mirrors, paid builds and remote-root services, and compare published hashes or signing certificates when the project provides them. A clean VirusTotal result is not proof that an exploit APK is safe.
- **For your software:** it is still privilege-escalation code running as root on your kernel. Only use the linked, source-available projects; avoid random APKs claiming "GhostLock root".
- **For your security posture:** staying on known vulnerable firmware to keep temp root means skipping real security fixes - including fixes for other exploitable bugs. Weigh that honestly. (This is the same trade-off as delaying any update for root.)
- **For the ecosystem:** these are research tools from small teams. Expect per-device rough edges, and check each repo's issue tracker for current firmware support before updating anything.

See the project's [Legal & Safety](../legal-disclaimer.md) page for the disclaimer that applies to everything in this repository.

## FAQ

**Q: Does GhostLock root trip Knox?**
The documented runtime chains do not require a conventional bootloader unlock, but this guide does not guarantee fuse behavior, Knox service availability or Play Integrity. Results depend on the exact device, modifications and app policy.

**Q: Will it work on the latest update?**
Check the exact build in the project documentation. Kernel patches, vendor backports or layout changes may break the chain; neither an old patch date nor a matching model is enough to prove compatibility.

**Q: Can I make it persistent?**
Active kernel root ends on a full reboot. Some tools re-exploit at boot; that creates a new session and is not persistent firmware root. Files and configuration changed by root can remain after reboot.

**Q: Does a soft reboot keep root?**
Yes. A soft reboot restarts Android userspace and `system_server`, not the kernel, so the late-loaded module stays and module mounts reactivate. A full reboot clears root. See [Soft reboot vs full reboot](#soft-reboot-vs-full-reboot).

**Q: What if the exploit fails or the phone reboots?**
That is expected for a race. Let it boot, check that the kernel is unchanged, and retry only as the project documents. Do not start a second run in the same boot if the tool warns against it. See [If a run fails](#if-a-run-fails).

**Q: Which root manager should I install?**
The one the loader names. It must ship `libksud.so`; a manager without it cannot finish a late-load. Do not substitute an unsupported manager, and do not use its install or patch-boot-image actions on a locked phone. See [Modules and managers](#modules-and-managers).

**Q: How do I remove temporary root?**
Full reboot. Do not delete `/data/adb`; it does not remove active kernel root and it holds ADB keys and data other tools rely on.

**Q: Do I need a computer?**
It depends on the target. Root My Galaxy and GhostLock App have on-device paths on some targets; others require Shizuku or ADB setup. The CLI ports like ghostlock-oneplus are more comfortable with ADB.

**Q: Is this the same as the MediaTek bootloader tools (Kaeru/Fenrir)?**
No - different technique, same "avoid the unlocked bootloader" goal. Kaeru/Fenrir patch the bootloader itself and require flashing; GhostLock exploits the kernel in memory. See the [Temporary Root for Android: Methods & Solutions](./temporary-root-solutions.md) page for that side.

**Q: My device isn't listed anywhere - can I add it?**
Possibly. Exploits need per-device offsets, and some upstream projects document extracting candidate profiles from boot images. A profile is not proof of a working root chain. See the sister project's [porting notes](https://awesome-temporary-root.pages.dev/guide/#porting-a-new-device) and [contribution instructions](https://awesome-temporary-root.pages.dev/guide/#contributing-and-disclaimer) for reporting reproducible results.

## Related pages

- [Awesome Temporary Root](https://awesome-temporary-root.pages.dev/) ([GitHub](https://github.com/fynks/awesome-temporary-root)) - maintained device/build sections, tools, modules and reports
- [Temporary Root for Android: Methods & Solutions](./temporary-root-solutions.md) - the broader family: Kaeru, Fenrir, and other locked-bootloader approaches
- [Root Framework Comparison](./root-framework-comparison.md) - choosing between Magisk, KernelSU, and APatch for permanent root
- [How to unlock an Android bootloader](./how-to-unlock-bootloader.md)
- [Samsung Rooting Guide](./how-to-root-samsung-phone.md) - Knox trade-offs in detail
- [OnePlus Rooting Guide](./how-to-root-oneplus-phone.md) • [Pixel Rooting Guide](./how-to-root-pixel-phone.md)
- [Root Hiding & Play Integrity](/apps-and-modules/root-management#root-hiding-play-integrity) - keeping apps happy once you *are* rooted
- [Troubleshooting](../troubleshooting.md)

[↑ Back to top](#table-of-contents)
