---
layout: doc
title: "Root Without Unlocking the Bootloader"
description: Source-backed Android locked-bootloader rooting reference covering device-specific tools, GhostLock, DirtyFrag, compatibility evidence and security risks.
head:
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:description
      content: Source-backed Android locked-bootloader rooting reference covering device-specific tools, GhostLock, DirtyFrag, compatibility evidence and security risks.
  - - meta
    - name: twitter:description
      content: Source-backed Android locked-bootloader rooting reference covering device-specific tools, GhostLock, DirtyFrag, compatibility evidence and security risks.
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
        "headline": "Root Without Unlocking the Bootloader",
        "description": "Device-specific locked-bootloader rooting methods, GhostLock and DirtyFrag compatibility, prerequisites and risks.",
        "image": "https://awesome-android-root.xyz/images/og.png",
        "author": { "@id": "https://awesome-android-root.xyz/#organization" },
        "publisher": { "@id": "https://awesome-android-root.xyz/#organization" },
        "datePublished": "2026-08-26",
        "dateModified": "2026-10-14",
        "mainEntityOfPage": {
          "@id": "https://awesome-android-root.xyz/rooting-guides/root-without-unlocking-bootloader#webpage"
        },
        "articleSection": "Android Rooting Guides",
        "inLanguage": "en-US",
        "isAccessibleForFree": true
      }

---

<script setup>
import LockedRootTools from '../.vitepress/theme/components/LockedRootTools.vue'
</script>

<span id="ghostlock-temporary-root-guide"></span>

# Root Without Unlocking the Bootloader

> [!TIP]
> **Quick tip:** Looking for a specific rooting app or tool? [Jump directly to the Apps & Tools table](#apps-tools).

**Can Android be rooted while its bootloader stays locked?** On specific vulnerable builds, yes. This reference covers runtime kernel exploits such as GhostLock, Android DirtyFrag chains, and older device-specific methods. It is **not** a universal rooting recipe. Match the exact model, firmware, kernel and execution context before considering any tool.

- **Temporary root:** lost on a full reboot; a boot service may re-exploit, not preserve kernel root.
- **Persistent foothold:** an installed privileged app or modified userdata can survive reboot and regain root. This is different from persistent kernel root or a patched boot image.
- **Bootloader bypass/spoofing:** not the same as retaining the original locked verified-boot chain. Some workflows below require or perform an unlock and are explicitly marked as comparisons.

> [!WARNING]
> Back up your data and establish a device-specific recovery path first. Exploits and modules can cause kernel crashes, bootloops, data loss or device damage. A public GitHub repository is **not** proof that its APK or release assets are safe. Prefer auditable source and traceable builds; never disable security scanning merely to install a rooting app. Use only devices you own or are authorized to assess.

## Table of Contents

- [Apps and tools](#apps-tools)
- [Research and compatibility methodology](#research-and-compatibility-methodology)
- [What is GhostLock?](#what-is-ghostlock-in-plain-english)
- [How temporary root tools work](#how-the-temporary-root-tools-actually-work)
- [What GhostLock root can do](#what-ghostlock-root-can-do)
- [What GhostLock root cannot do](#what-ghostlock-root-cannot-do)
- [DirtyFrag: Android compatibility and rooting potential](#dirtyfrag-vulnerability-android-compatibility-and-rooting-potential)
- [Device support at a glance](#device-support-at-a-glance)
- [Comparison with normal rooting](#ghostlock-vs-normal-rooting-magisk-kernelsu-apatch)
- [Risks](#is-it-safe-risks-and-common-sense) • [FAQ](#faq) • [Related pages](#related-pages)

## Apps and Tools for Rooting Without Unlocking the Bootloader {#apps-tools}

<span id="all-apps-and-projects-for-ghostlock"></span>

Search across **45 distinct projects**, including original research, apps, loaders, payload repositories, historical exploits and clearly marked unfinished or excluded workflows. These are verified **project identities**, not 45 confirmed working root apps. GitHub documentation links are pinned to the source revision reviewed on **2026-10-14**; the original MTK-SU author thread is a live authoritative reference, explicitly marked without a Git revision. Original repositories link to current upstream documentation and releases; no mirrored APKs are supplied.

**Bootloader labels:** **Locked supported** means the documented runtime route leaves the bootloader locked, subject to its prerequisites. **Conditionally supported** means a target-specific chain, incomplete locked-state evidence, or a workflow that changes the state; read the row. **Unlocked required** entries are comparisons, not locked-stock rooting methods. **Unknown** means locked-root functionality is not established. Evidence and project status are separate columns within **Status**; “Recent activity” is a GitHub push observation, not a promise of maintenance or firmware support.

<LockedRootTools />

### Research and compatibility methodology

**Last source verification: 2026-10-14.** Reviewed original repositories, READMEs, source/profile inventories, recent release metadata and issue discussions. Vulnerability identities and patches were cross-checked against original disclosures, Linux CNA CVE records and upstream commits. This site did **not** execute exploits or test Android hardware.

- **Confirmed:** direct upstream evidence supports the stated functionality and the particular documented target. Missing kernel/build fields remain Unknown; this never confirms a whole product family.
- **Reported:** credible public maintainer/community reports exist, but independent confirmation or complete target details are unavailable.
- **Conditional:** source implements a route only under specific version, configuration, hardware or setup requirements; a profile alone is not a successful demonstration.
- **Unverified:** insufficient evidence to establish working compatibility, including unfinished chains.
- **Patched:** the identified fixed configuration makes the documented exploit inapplicable. An old unpatched build may still be vulnerable.
- **Archived:** verified upstream archive/deprecation status, a maintenance label rather than a compatibility verdict. An archived project may still work on old firmware.

**Android OS versus KMI:** `android14-6.1` names a kernel module interface branch, not necessarily Android 14 on the phone. OS filters use only explicitly documented OS versions; use keyword search for kernel, SPL, firmware, SoC and codename. “Supported Devices” includes clearly marked *research targets* so failed candidates are discoverable without representing them as supported.

### Uncertain claims and naming conflicts

- **GhostLoader:** [TheWover/GhostLoader](https://github.com/TheWover/GhostLoader) is a Windows/.NET AppDomainManager injection project, not an Android rooting loader. No authoritative Android locked-root project with that exact name was established. Do not conflate it with GhostLock, `ksud` or a GhostLock payload.
- **Nothing Phone (1):** [root-my-nothing](https://github.com/ang3lo-azevedo/root-my-nothing) says “In progress” for 5.4.302 despite its one-click description. Working root is not established.
- **SM-T878U:** [smt878u-ionstack-poc](https://github.com/Wtrwx/smt878u-ionstack-poc#current-status-unfinished) explicitly reports no working root as of 2026-10-06. A trigger or KASLR leak is not root. The earlier page's successful re-root claim has been withdrawn.
- **OPPO Find N2:** [oppofindN2-ghostlock](https://github.com/pubglite55/oppofindN2-ghostlock) still reports a CFI/kernel-write blocker. Its earlier successful-port implication has been withdrawn.
- **Offsets/profiles versus tests:** [ghostlock-oneplus](https://github.com/JoinChang/ghostlock-oneplus#supported-devices) distinguishes working, pending and infeasible targets. [pixel-ksu-root](https://github.com/JingMatrix/pixel-ksu-root#supported-devices) says resolver coverage exceeds hardware testing. Do not transfer results across tools even when model/kernel names match.
- **Frameworks are not entry exploits:** [KernelSU](https://github.com/tiann/KernelSU), [ReSukiSU](https://github.com/ReSukiSU/ReSukiSU) and [Shizuku](https://github.com/RikkaApps/Shizuku) alone do not root stock locked phones. `ksud` late-load needs an already privileged loader; ADB/Shizuku privileges are not root.
- **Bootloader changes:** [Kaeru](https://github.com/R0rt1z2/kaeru) and [Fenrir](https://github.com/R0rt1z2/fenrir) patch the boot chain; Fenrir's documented workflow depends on unlocked `seccfg`. [QuestStack](https://github.com/starseed12345/QuestStack) obtains initial root but its full workflow unlocks the bootloader. These are not ordinary locked-stock persistent root solutions.

## What is GhostLock? (in plain English)

**GhostLock**, also used in **IonStack** research, refers to **CVE-2026-43499**, a Linux **rtmutex/futex priority-inheritance use-after-free**. During proxy-lock rollback, `remove_waiter()` operated on `current` rather than `waiter->task`. The waiter's `pi_blocked_on` could retain a pointer to a reclaimed kernel-stack waiter. Target-specific exploits turn that dangling state into a kernel-write primitive and privilege escalation. Sources: [original Nebula Security research/source](https://github.com/NebuSec/CyberMeowfia/tree/main/IonStack/CVE-2026-43499), [Linux CNA record](https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/43xxx/CVE-2026-43499.json), [upstream fix](https://github.com/torvalds/linux/commit/3bfdc63936dd4773109b7b8c280c0f3b5ae7d349).

The CNA record identifies the introducing version as **2.6.39** and fixed stable releases including **5.10.261, 5.15.212, 6.1.175, 6.6.140, 6.12.86, 6.18.27, 7.0.4**, plus mainline **7.1**. This is **not** an Android compatibility range: vendor backports, syscall access, compiler-generated stack layouts, offsets, KASLR, SELinux, KDP and module loading can prevent a particular chain from working on older kernels too.

There is no defensible universal “June 2026 or earlier” cutoff or blanket S26 exclusion. Check exact upstream targets and the actual vendor fix. For example, [ghostlock-a17](https://github.com/mobilehackinglab/ghostlock-a17#target) documents a July SPL target, and [ghostlock-s26](https://github.com/1ndevelopment/ghostlock-s26) reports particular S26 builds. Neither proves all July or all S26 firmware vulnerable.

## How the temporary root tools actually work

A typical chain has four distinct stages; not every project implements all of them:

1. **Stage and run the exploit:** from an ordinary app where allowed, or from ADB/Shizuku shell where the route needs shell permissions or avoids app seccomp restrictions.
2. **Obtain kernel access:** exploit the vulnerable rollback path using offsets and stack geometry for that exact kernel. Failed races can panic the device.
3. **Escalate:** change credentials or execute a privileged helper. Hardened Samsung targets can need a KDP-aware workqueue/usermode-helper route instead of direct credential writes.
4. **Optional session root manager:** late-load a compatible KernelSU module through a matched `ksud`. A root shell alone does not guarantee module support.

These stages are illustrated by the [OnePlus port](https://github.com/JoinChang/ghostlock-oneplus#exploit-flow), [Galaxy A17 root-shell chain](https://github.com/mobilehackinglab/ghostlock-a17) and [Galaxy payload documentation](https://github.com/BuSung-dev/Root-My-Galaxy-Payloads). Reboot removes the runtime exploit state, **not necessarily files, privileged apps, module configuration or data changes** made during the session.

## What GhostLock root CAN do

On a documented, successful target, it may grant a UID 0 shell and/or session root management without flashing a patched boot image. Some chains load KernelSU and support compatible modules. Others only provide a root daemon or kernel primitives; see each row's **Root Access** field.

A runtime exploit does not itself require a conventional bootloader unlock. That does **not** guarantee banking apps, Knox services, DRM or Play Integrity will remain usable. Root artifacts, permissive SELinux, installed modules and app policies can change the outcome. The root mechanism and the attestation result are separate questions.

## What GhostLock root CANNOT do

- Guarantee success from a model name, SoC, old SPL or kernel version alone.
- Make an arbitrary custom ROM, recovery or unsigned boot image acceptable to the stock verified-boot chain.
- Preserve the active kernel-root session across a full reboot. Automatic re-exploitation is a new session.
- Restore factory security simply by rebooting if the root session changed userdata, configuration or privileged app identity.
- Guarantee that an OTA leaves the exploit available, or that unsupported modules are recoverable on a locked device.

## DirtyFrag Vulnerability: Android Compatibility and Rooting Potential

### Verified identity and mechanism

**Dirty Frag / DirtyFrag** is the name used by original researcher **Hyunwoo Kim (@V4bel)** for a Linux page-cache-write vulnerability class and public LPE chain, disclosed **2026-05-07**. It covers **two distinct vulnerabilities**, not a single Android app:

| Identifier | Affected component | Introducing/fixed versions and evidence |
|---|---|---|
| **CVE-2026-43284** | XFRM ESP IPv4/IPv6 input and datagram splice paths | Current Linux CNA record: introduced in **4.11**; stable fixes include **5.10.255, 5.15.205, 6.1.171, 6.6.138, 6.12.87, 6.18.28, 7.0.5**, mainline **7.1**. [CNA record](https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/43xxx/CVE-2026-43284.json), [fix f4c50a4034e6](https://github.com/torvalds/linux/commit/f4c50a4034e62ab75f1d5cdd191dd5f9c77fdff4). |
| **CVE-2026-43500** | RxRPC DATA/RESPONSE receive paths and in-place decryption | Current Linux CNA record: introduced in **5.3**; stable fixes include **6.6.140, 6.12.88, 6.18.29, 7.0.6**, mainline **7.1**. [CNA record](https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/43xxx/CVE-2026-43500.json), [fix aa54b1d27fe0](https://github.com/torvalds/linux/commit/aa54b1d27fe0c2b78e664a34fd0fdf7cd1960d71). |

When network buffers retain references to externally owned file-cache pages, vulnerable receive paths can modify those pages during in-place cryptographic processing instead of first making a private copy. That can corrupt an in-memory copy of a nominally read-only file and let a local attacker redirect privileged execution. It is a **shared-page ownership/copy-on-write logic flaw**, not GhostLock's futex race. See the [original write-up](https://github.com/V4bel/dirtyfrag/blob/master/assets/write-up.md) and the fixes above.

**Source discrepancies:** original research brackets affected code by commits and associates the RxRPC path with a 2023 change; the later CNA record gives a 5.3 introducing version. Broad advisories sometimes use 4.10 as the family boundary. These are not Android exploit support ranges; use the relevant source changes/backports and configuration, not a single inferred version threshold. [CERT VU#980487](https://kb.cert.org/vuls/id/980487) establishes the identity/disclosure, but its fragment-reassembly description is not used here in place of the original shared-page mechanism.

Dirty Pipe (**CVE-2022-0847**) and Copy Fail are related page-cache bug-class names, **not aliases for DirtyFrag**. Android apps named DirtyFrag are downstream implementations, not the original disclosure.

### Android prerequisites and bootloader implications

The original [Linux PoC](https://github.com/V4bel/dirtyfrag) demonstrated Linux distributions, not Android phones. Its ESP route needs a network-admin context (often obtained through user/network namespaces); the RxRPC alternative requires that subsystem to be present and reachable. Those prerequisites cannot simply be assumed in an Android app sandbox.

Android chains such as [LSPromise](https://github.com/LSPosed/LSPromise), [DFRoot](https://github.com/diabl0w/DFRoot) and [DirtyInit](https://github.com/combeng6th/DirtyInit) adapt the **ESP** path. LSPromise first pivots through a vulnerable Android 17 Telecom service into privileged userspace. DFRoot/DirtyInit instead use Android's `IpSecManager` API to arrange the IPsec transform. Their source implements different privileged hooks and end results; DirtyInit is init-domain command access, not an unrestricted shell or KernelSU installer.

**Locked bootloaders do not prevent runtime exploitation** of a reachable vulnerable kernel path. A complete locked-root chain still needs appropriate socket/API access, shared-page splice behavior, exploitable privileged library paths, compatible SELinux transitions and, for module-based root, accepted modules with matching configuration, symbol versions and vendor hardening. A bundled `android12-5.10` or `android17-6.18` module is not evidence of a supported device. No Android **RxRPC** rooting demonstration was established in the sources reviewed.

### Android compatibility evidence

| Device / SoC | Android / firmware | Kernel | Evidence and access | Bootloader implications |
|---|---|---|---|---|
| **Pixel 10** / SoC not specified by source | Initial official **Android 17** release; exact build Unknown | Unknown in README | **Confirmed demonstration:** LSPromise source and linked screen recording document app-to-root/kernel + KernelSU. [Evidence](https://github.com/LSPosed/LSPromise). Exact-build reproducibility remains incomplete. | Runtime chain, no flashing documented; explicit locked-state proof not supplied in README. |
| **Galaxy S26 m1q** / Qualcomm | **Android 16 / One UI 8.5**, `S942QOPU1AZDE_SJP1AZDE` | Unknown in README | **Reported:** DFReroot tested only on this target. Persistent system-UID app, then DirtyFrag-based re-root. [Evidence](https://github.com/polygraphene/DFReroot#supported-devices). | No conventional unlock in route, but **prior temporary root required**; changes `packages.xml`. |
| **iQOO Z9 5G** / SoC not restated in DirtyFrag fork | Android version/build Unknown | Unknown; eight bundled KMI targets are not tests | **Reported:** archived DirtyFrag Android Root/Jailbreak fork says tested on this device. [Evidence](https://github.com/ankitrawatgit/DirtyFrag-Android-Root-Jailbreak#device-support). | Runtime chain; exact firmware and locked-state evidence incomplete. |
| Samsung devices, “Note20 Ultra to S26 Ultra” | Exact models/Android/builds Unknown | Unknown | **Reported scope only:** DirtyInit maintainer claim; init-domain access, not universal kernel root. [Evidence](https://github.com/combeng6th/DirtyInit). | API-based runtime chain; no per-build locked-state matrix. |
| **Pixel 6a**; some `android14-6.1` targets | Exact build Unknown | `6.1.xxx-android14` branch | **Not working for the documented route:** LSPromise explicitly excludes Pixel 6a; [pixel-ksu-root analysis](https://github.com/JingMatrix/pixel-ksu-root/tree/main/cves/cve-2026-43284-dirtyfrag) records fragment copying before ESP input. | Being locked or Linux-based does not make this path exploitable. |
| **Redmi Note 11 Pro 5G (veux), POCO X5 5G (moonstone)** / SM6375 | Firmware not fully documented | `5.4.274-qgki` / `5.4.191-qgki` | **Reported negative research:** no required UDP shared-page splice primitive for this route. [Evidence](https://github.com/HirokiAkihiko/dirtyfrag-research). | Not demonstrated roots; no inference to every 5.4 vendor branch. |
| Any other Android device, including DFRoot/mitschud fork candidates | Unknown until exact target is demonstrated | Configuration/backports must be checked | **Conditional / unverified:** implementation or matching KMI alone is not device confirmation. | Requires a complete device-specific chain; no universal compatibility list. |

### Patch status and mitigations

Upstream fixes force appropriate buffer copying/unsharing before vulnerable in-place processing; both mainline commits and stable backports are public. Android vendors can backport these without changing the apparent kernel major/minor version. **Install current vendor security updates**; do not delay updates just to retain an exploit. A reboot removes contaminated runtime page-cache state, but does not fix the vulnerable code or reverse all changes made by root.

The [Android Security Bulletin index](https://source.android.com/docs/security/bulletin) and vendor bulletins are the right places to check update coverage. This review did **not establish a single Android-wide SPL cutoff** for either DirtyFrag CVE. Absence of a CVE from a bulletin search is not proof that a particular firmware lacks its fix.

The original Linux mitigation disables ESP/RxRPC modules and clears contaminated cache, at the cost of IPsec/AFS functionality. This is **not a stock Android procedure**: components may be built in, module management may be restricted, and API-driven Android paths differ. Apply a vendor-provided fix rather than copying desktop `modprobe` or bootloader commands onto a locked phone. [Original mitigation](https://github.com/V4bel/dirtyfrag#mitigation).

## Device support at a glance

The [searchable table](#apps-tools) is the maintained tool inventory; expand its source profiles for exact pairs. The following contrasts illustrate why a model name is insufficient:

| Target | Documented working or reported scope | Not implied |
|---|---|---|
| Galaxy A17 SM-A175F | GhostLock A17 BZA5 / CZG1, Android 16, 6.12.23 / 6.12.38, upstream root logs | Every A17, regional variant or newer OTA |
| OnePlus 15 | ghostlock-oneplus CPH 6.12.23 / PLK110 6.12.58 reports | PLK110 6.12.69: that port marks its geometry infeasible |
| Nothing Phone (3a) | A059 B4.1-260618-1048, Android 16, exact 6.1.157 profile | Nothing Phone (1): port still in progress |
| Meta Quest 3 | IonStackQuest3 target 52168470043600520 | [Fixed build 52345320040100520](https://github.com/facebookincubator/oculus-linux-kernel/commit/ab1c46013e3f279a9d033a1c3cf0542c1d32d46c) or later |
| Pixel 10 | LSPromise initial Android 17 demonstration | Pixel 6a or every later Pixel OTA |

## GhostLock vs. normal rooting (Magisk/KernelSU/APatch)

| | Standard boot-image root | GhostLock runtime root | DirtyFrag Android chains |
|---|---|---|---|
| Bootloader | Conventional installation usually requires unlock | Can stay locked on a supported chain | Can stay locked on a supported chain |
| Reboot | Root integration survives until changed by firmware | Active session lost; possible re-exploitation | Depends on chain; session root vs persistent foothold/re-exploitation |
| Modules | Framework/device dependent | Requires matched late-load support | Requires matched module/loader; DirtyInit differs |
| Custom firmware | Requires compatible flashing/verification setup | Not granted by session root alone | Not granted by session root alone |
| Integrity/Knox/DRM | Device and modification dependent | No blanket guarantees | No blanket guarantees |
| OTA updates | Root integration may need re-installing | Fix may remove exploit | Fix or changed configuration may remove chain |

Choose conventional root when the device supports it and you need a supported long-term setup; see [Root Framework Comparison](./root-framework-comparison.md). Do not interpret locked-state spoofing or a KernelSU APK installation as proof of exploit-based root.

## Is it safe? Risks and common sense

- **No flashing is not no risk.** Kernel faults, page-cache corruption, unsafe modules and writes to userdata can still cause bootloops or data loss. Keep backups and recovery access.
- **Check the complete chain.** An exploit trigger, kernel R/W, a UID 0 process, an init-domain command interface and module-managed root are different capabilities.
- **Verify provenance.** Review source and exact target checks; inspect release history and runtime payload feeds. Links here are research references, not instructions to trust every binary in a repository.
- **Do not weaken protection for convenience.** Permissive SELinux and staying on vulnerable firmware reduce security. Avoid unknown APKs, rehosts and “universal one-click root” promises.
- **Automatic re-root has persistence risks.** Boot receivers and saved modules can re-trigger failures after reboot. DFReroot deliberately changes privileged package identity; uninstalling an APK alone may not undo that.

See [Legal & Safety](../legal-disclaimer.md) for the project disclaimer.

## FAQ

**Does temporary root guarantee Knox or Play Integrity stays intact?**
No. A runtime chain need not change the bootloader state, but fuse behavior, detection and service policies are device-specific. Do not rely on universal Wallet, Knox or banking-app promises.

**Will the latest firmware work?**
Unknown until its exact code/configuration and target evidence are checked. Neither an old SPL nor a matching kernel branch establishes support. Security fixes and compiler/layout changes can both break a chain.

**Can root be persistent while the bootloader stays locked?**
A privileged userdata foothold or automatic re-exploitation can persist, as DFReroot and some boot-service implementations describe. Active kernel root is still recreated after reboot, and updates/factory resets may remove the chain. This differs from flashing permanent root.

**Do I need a computer?**
Some apps use Android APIs directly; others need ADB or Shizuku setup. Follow the exact project's prerequisites. Shizuku itself is not root.

**Is DirtyFrag the same as GhostLock or Dirty Pipe?**
No. GhostLock is the futex/rtmutex UAF (CVE-2026-43499); DirtyFrag refers to ESP/RxRPC shared-page bugs (CVE-2026-43284 / CVE-2026-43500); Dirty Pipe is CVE-2022-0847. Sharing a downstream manager does not make them the same vulnerability.

**Can I add my device?**
Submit exact model/codename, OS build, kernel release, patch/backport evidence, bootloader state, prerequisites and a public upstream validation record. An offset extractor output or a same-SoC comparison is not enough to label it Confirmed.

## Related pages

- [Temporary Root for Android: Methods & Solutions](./temporary-root-solutions.md) - the broader family: Kaeru, Fenrir, and other locked-bootloader approaches
- [Root Framework Comparison](./root-framework-comparison.md) - choosing between Magisk, KernelSU, and APatch for permanent root
- [How to unlock an Android bootloader](./how-to-unlock-bootloader.md)
- [Samsung Rooting Guide](./how-to-root-samsung-phone.md) - Knox trade-offs in detail
- [OnePlus Rooting Guide](./how-to-root-oneplus-phone.md) • [Pixel Rooting Guide](./how-to-root-pixel-phone.md)
- [Root Hiding & Play Integrity](/apps-and-modules/root-management#root-hiding-play-integrity) - keeping apps happy once you *are* rooted
- [Troubleshooting](../troubleshooting.md)

[↑ Back to top](#table-of-contents)
