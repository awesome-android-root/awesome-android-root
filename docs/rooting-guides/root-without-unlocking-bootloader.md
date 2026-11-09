---
layout: doc
title: "Temporary Root: DirtyFrag & GhostLock"
description: Use DirtyFrag or GhostLock for temporary Android root on supported builds without unlocking the bootloader. Check setup, risks and limits.
head:
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:description
      content: Use DirtyFrag or GhostLock for temporary Android root on supported builds without unlocking the bootloader. Check setup, risks and limits.
  - - meta
    - name: twitter:description
      content: Use DirtyFrag or GhostLock for temporary Android root on supported builds without unlocking the bootloader. Check setup, risks and limits.
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
      content: DirtyFrag
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
        "headline": "Temporary Root Without Unlocking the Bootloader",
        "description": "Use DirtyFrag or GhostLock for temporary Android root on supported builds without unlocking the bootloader. Check setup, risks and limits.",
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

# Temporary Root Without Unlocking the Bootloader

DirtyFrag and GhostLock can provide temporary root on specific vulnerable Android builds while the bootloader stays locked. Neither works on every device, and a full reboot ends the active root session.

> [!CAUTION]
> Back up your data and check recovery options first. An exploit, incompatible module or failed recovery can cause crashes, bootloops or data loss. Do not downgrade or skip security updates just to keep root.

> [!TIP]
> Our sister project [Awesome Temporary Root](https://awesome-temporary-root.pages.dev/) ([GitHub](https://github.com/fynks/awesome-temporary-root)) maintains device/build lists, tool links and module reports. Use it alongside the loader's own instructions.

## On this page {#table-of-contents}

- [DirtyFrag and GhostLock](#how-the-temporary-root-tools-actually-work)
- [Check your device](#match-the-exact-target)
- [Find device and tool information](#all-apps-and-projects-for-ghostlock)
- [Run a session safely](#run-a-session-safely)
- [Modules and managers](#modules-and-managers)
- [If a run fails](#if-a-run-fails)
- [Temporary root vs normal root](#ghostlock-vs-normal-rooting-magisk-kernelsu-apatch)
- [FAQ](#faq)

## What is temporary root? {#what-is-ghostlock-in-plain-english}

A temporary-root tool uses a vulnerability to grant root for the current boot without flashing a boot image. Some tools set up a KernelSU-compatible manager for root apps and modules; others provide only a root shell. Shizuku or ADB may help run a tool, but shell access is not root by itself.

## DirtyFrag and GhostLock {#how-the-temporary-root-tools-actually-work}

- **DirtyFrag** needs a vulnerable kernel. Tools that load KernelSU also need a compatible kernel module.
- **GhostLock** needs a loader matched to the device and kernel. Its exploit is a race, so a failed attempt can reboot the device.

Choose a tool that supports your device and firmware or kernel profile under its documented rules; a matching Android version alone is not enough. A compatibility check is useful, but passing it does not guarantee a successful root session.

<details>
<summary id="research-foundations-supporting-projects">Technical details and sources</summary>

DirtyFrag ([CVE-2026-43284](https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/43xxx/CVE-2026-43284.json)) uses a page-cache write. GhostLock ([CVE-2026-43499](https://github.com/CVEProject/cvelistV5/blob/main/cves/2026/43xxx/CVE-2026-43499.json)) uses a futex priority-inheritance race. Kernel configuration, vendor backports and device-specific profiles affect both methods. See the [sister project's overview](https://awesome-temporary-root.pages.dev/guide/#what-is-temporary-root) for more details.

</details>

## What temporary root can do {#what-ghostlock-root-can-do}

- Grant root to approved apps when the loader provides a compatible manager.
- Run some compatible modules during the session.
- Be run again after a full reboot if the exact build is still supported.

## What temporary root cannot do {#what-ghostlock-root-cannot-do}

- Unlock the bootloader or allow unsigned custom ROMs, recoveries or kernels to be flashed.
- Guarantee that banking apps, Play Integrity or Knox services will work.
- Undo files, apps or settings changed during the session just by rebooting.

## Soft reboot vs full reboot

A **full reboot** ends the active root session. Disable any loader's start-on-boot option first if you do not want it to run the exploit again. Files and settings changed while rooted may remain.

A **soft reboot** restarts Android without normally restarting the kernel, so it usually keeps a late-loaded root session. Some tools can fail or trigger a full reboot; follow the loader's instructions.

## Check your device {#match-the-exact-target}

Record your model, firmware build and full kernel release, then compare them with the loader's support rules. Some tools match an exact build; others use a documented kernel profile. **Settings > About phone** shows the model and build; a terminal or ADB can show the kernel. An update can change support, so check again before running a tool after an OTA.

<details>
<summary>Find the exact details with ADB</summary>

```bash
adb shell getprop ro.product.model
adb shell getprop ro.product.device
adb shell getprop ro.build.display.id
adb shell getprop ro.build.version.release
adb shell uname -r
```

Save the output before starting. A kernel-interface label such as `android14-6.1` does not necessarily mean the phone runs Android 14.

</details>

## Find device and tool information {#all-apps-and-projects-for-ghostlock}

Use the maintained sections of [Awesome Temporary Root](https://awesome-temporary-root.pages.dev/guide/) to find support information and the original loader instructions.

| Looking for | Sister project sections |
| --- | --- |
| Device support | [All devices](https://awesome-temporary-root.pages.dev/guide/#supported-devices) · [Live upstream tables](https://awesome-temporary-root.pages.dev/guide/#live-upstream-tables) |
| Samsung or Pixel | [Samsung Galaxy](https://awesome-temporary-root.pages.dev/guide/#samsung-galaxy) · [Google Pixel](https://awesome-temporary-root.pages.dev/guide/#google-pixel) |
| OnePlus, OPPO or Realme | [OnePlus, OPPO and Realme](https://awesome-temporary-root.pages.dev/guide/#oneplus-oppo-and-realme) |
| vivo or iQOO | [vivo and iQOO](https://awesome-temporary-root.pages.dev/guide/#vivo-and-iqoo) |
| Other manufacturers | [Xiaomi, ASUS, Nothing and Honor](https://awesome-temporary-root.pages.dev/guide/#xiaomi-asus-nothing-and-honor) · [Amazon, NVIDIA and Meta](https://awesome-temporary-root.pages.dev/guide/#amazon-nvidia-meta) |
| Tools and modules | [Tools and managers](https://awesome-temporary-root.pages.dev/guide/#tools-and-managers) · [Modules](https://awesome-temporary-root.pages.dev/guide/#modules) |
| Help | [Quick start](https://awesome-temporary-root.pages.dev/guide/#quick-start) · [Troubleshooting and FAQ](https://awesome-temporary-root.pages.dev/guide/#troubleshooting-and-faq) |
| Contribute | [Report a result](https://awesome-temporary-root.pages.dev/guide/#contributing-and-disclaimer) · [Sources](https://awesome-temporary-root.pages.dev/guide/#sources) |

## Device support at a glance

Read the testing status as well as the model name. A tested build, an experimental run and a generated profile are not interchangeable. Confirm that your firmware and kernel match the loader's current requirements; do not force a similar but unsupported profile.

## Run a session safely

1. **Back up and plan recovery.** Know how to reach your device's recovery or service options before starting.
2. **Install the documented tool and dependencies.** Download from the project's own release page. Some loaders need Shizuku or ADB and a specific KernelSU-compatible manager; others provide a shell only.
3. **Run the tool for your exact target.** Follow its instructions and do not force an unsupported profile. Do not launch another attempt while one is still running; follow its retry instructions.
4. **Verify root before adding modules.** Use the loader or manager's check. If a tool provides `su`, you can also verify it with ADB below.
5. **Test modules one at a time.** Leave autorun off until you know they work, and keep the loader's module-disable option available if it has one.

<details>
<summary>Verify a manager-based session with ADB</summary>

```bash
adb shell su -c id
```

A successful result starts with `uid=0(root)`. A shell-only loader may use a different verification command; follow its documentation.

</details>

## Modules and managers

Use the manager named by your loader. A manager alone does not exploit the device, and not every module works with temporary root. See the [module reports](https://awesome-temporary-root.pages.dev/guide/#modules), but treat them as device-specific rather than guarantees.

> [!CAUTION]
> Do not use a manager's install, flash or patch-boot-image action on a locked device. Writing a modified protected image can make it unbootable.

<details>
<summary>Why some modules do not work</summary>

A late-loaded KernelSU session starts after Android has booted, so modules that depend on early-boot stages may not run correctly. A compatible manager also needs the `ksud` binary expected by its loader; some loaders require it to be packaged as `libksud.so`.

</details>

## If a run fails

- **Unsupported or not vulnerable:** stop and recheck the exact build. Do not downgrade firmware to force support.
- **Panic or reboot:** let the device start normally and follow the loader's retry instructions. A failed run is not proof that another attempt is safe in the same boot.
- **Success reported but no root:** check that the named manager is installed and follow the tool's troubleshooting instructions.
- **Bootloop after a module:** full reboot, disable loader autorun and use its module-disable option if available. Use safe mode if needed; if the device cannot start, follow its recovery instructions or seek service support. Do not delete `/data/adb`; it contains ADB keys and other data and does not stop active root.

## Temporary root vs normal root {#ghostlock-vs-normal-rooting-magisk-kernelsu-apatch}

Temporary root is an access method, not a separate root framework. Some loaders use KernelSU for the session.

| | Normal Magisk, KernelSU or APatch install | DirtyFrag or GhostLock |
| --- | --- | --- |
| Bootloader | Normally unlocked | Can stay locked on supported builds |
| Setup | Patch and flash the appropriate image | Run a matching loader; no boot-image flash |
| Full reboot | Root normally returns | Active root ends; a loader can re-run it |
| Modules | Depend on the framework and device | Compatible session modules only; some loaders offer a shell only |
| Updates | May need a new patched image | May patch the vulnerability or break the loader |

## Safety and security {#is-it-safe-risks-and-common-sense}

Use tools only on devices you own or are authorized to modify. Check the project's release and recovery instructions, and verify published hashes or signatures when available. A locked bootloader does not guarantee fuse behavior, app compatibility or protection from a bad root module.

## FAQ

**Can I keep temporary root after an update?**

Maybe. An OTA can patch the vulnerability or change the kernel profile. Check the loader's support list before updating and again before running it.

**How do I stop temporary root?**

Disable any automatic re-run in the loader, then perform a full reboot. Review and undo any files or settings changed during the session separately.

**Do I need a computer?**

It depends on the loader. Some work on-device; others need ADB, Shizuku or an initial computer setup.

**Will banking apps or Knox work?**

There is no guarantee. Results depend on the device, modifications and each app's checks.

## Related pages

- [Awesome Temporary Root](https://awesome-temporary-root.pages.dev/) ([GitHub](https://github.com/fynks/awesome-temporary-root)) - maintained support information and module reports
- [Bootloader Mods & Temporary Root](./temporary-root-solutions.md) - compare temporary root with bootloader modifications
- [Root Framework Comparison](./root-framework-comparison.md) - compare standard root installations
- [Legal & Safety](../legal-disclaimer.md) · [Troubleshooting](../troubleshooting.md)

[↑ Back to top](#table-of-contents)
