---
layout: doc
title: "SUSFS Root Hiding Guide: Setup, Verification & Config"
description: "What SUSFS does, how its kernel patches and userspace tool work, how to get it via a patched kernel or a loadable kernel module, and how to verify it hides root on Android."
head:
  - - meta
    - property: og:title
      content: "SUSFS Root Hiding Guide: Setup, Verification & Config"
  - - meta
    - property: og:description
      content: "SUSFS kernel-level root hiding for KernelSU: requirements, patched kernels, SUSFS as a loadable kernel module, configuration and verification."
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: "SUSFS Root Hiding Guide | Awesome Android Root"
  - - meta
    - name: twitter:description
      content: How SUSFS hides root at the kernel level, how to install it with KernelSU or KernelSU-Next, and how to check what is actually enabled.
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Rooting
  - - meta
    - property: article:tag
      content: SUSFS
  - - meta
    - property: article:tag
      content: KernelSU
  - - meta
    - property: article:tag
      content: Root Hiding
  - - meta
    - property: article:tag
      content: Kernel Root
  - - meta
    - name: robots
      content: index, follow
---

# SUSFS Root Hiding Guide

SUSFS is a kernel-level hiding extension for KernelSU and its variants. Where a userspace module can only lie to apps it manages to hook, SUSFS changes what the kernel itself reports: hidden paths, hidden mounts, spoofed `stat` results, spoofed kernel version strings and cleaned-up AVC audit logs. This page covers what it does, how the two halves fit together, how to get it on your device, and how to verify it actually loaded.

Requires an unlocked bootloader and root. Read the [KernelSU Guide](./kernelsu-guide.md) first if you have not rooted yet.

## Quick Navigation

- [What SUSFS Does](#what-susfs-does)
- [How It Works](#how-it-works)
- [Requirements](#requirements)
- [Getting SUSFS](#getting-susfs)
- [Configuring It](#configuring-it)
- [Verifying It Works](#verifying-it-works)
- [Troubleshooting](#troubleshooting)
- [Links](#links)

**Related Guides:**
- [KernelSU Guide](./kernelsu-guide.md) - Installation, metamodules (including mountless options) and app profiles
- [Root Hiding & Play Integrity](../apps-and-modules/root-management.md#root-hiding-play-integrity) - Module list and community tools
- [Play Integrity and Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps) - Attestation setup
- [Root Framework Comparison](./root-framework-comparison.md) - KernelSU vs Magisk vs APatch

---

## What SUSFS Does

SUSFS, short for a systemless filesystem hiding layer, is an addon for KernelSU that the upstream project describes as experimental. It does not grant root and it does not mount modules: it hides the traces root leaves behind. The behaviours it provides, as reported by its own feature list:

| Behaviour | What it hides or spoofs |
|-----------|-------------------------|
| Path hiding | Files and directories disappear from directory listings and lookups |
| Mount hiding | Modules' mounts are hidden from non-root processes, and root's own mount view can be hidden entirely |
| kstat spoofing | `stat`, `statx` and `statfs` results for a path report the timestamps, inode and size of the original |
| Map hiding | Injected libraries and their `maps` entries are removed from a process's memory map view |
| Kernel identity spoofing | `uname` release and build strings, plus `cmdline` / `bootconfig` contents |
| Open redirection | Opening one path silently returns the contents of another file |
| AVC log spoofing | KernelSU-related SELinux contexts are rewritten in the audit log |
| Symbol and module hiding | KernelSU and SUSFS symbols are hidden from `kallsyms`, and named kernel modules can be dropped from `/proc/modules` |
| Logging switch | Kernel-side SUSFS logging can be toggled on and off at runtime |

**What it does not do:** it does not fix Play Integrity by itself, it does not hide your app list, and it does not make a rooted device indistinguishable from a stock one. Treat it as one layer. App Profiles, a Zygisk implementation and an attestation layer still matter, as described in the [KernelSU Guide](./kernelsu-guide.md#root-hiding-and-play-integrity).

---

## How It Works

SUSFS has two halves and both are required.

### Kernel side

The kernel patches add hooks around filesystem and process paths in the kernel and in KernelSU itself. Since the 2.0 line these are inline hooks rather than kprobes, so SUSFS no longer depends on `KPROBES`, `KRETPROBES` or `HAVE_SYSCALL_TRACEPOINTS` being available, and the old `sus_su` mechanism was dropped. A set of `CONFIG_KSU_SUSFS_*` options controls which behaviours are compiled in, so a kernel can ship a subset: a device with only path hiding compiled in will silently ignore mount-hiding commands.

### Userspace side

A small tool called `ksu_susfs` lives in `/data/adb/ksu/bin/`. It talks to the kernel over KernelSU's supercall and is what you or a module actually run:

```bash
ksu_susfs show version           # SUSFS version
ksu_susfs show enabled_features  # which CONFIG_KSU_SUSFS_* options are compiled in
ksu_susfs show variant           # patched kernel or loadable module

ksu_susfs add_sus_path /data/local/tmp
ksu_susfs add_sus_kstat_statically /system/etc/hosts
ksu_susfs add_open_redirect /system/etc/hosts /data/adb/hosts
ksu_susfs set_uname 6.1.75-android14-11-g16c5f6cd5e9b-ab12268515
ksu_susfs enable_avc_log_spoofing 1
ksu_susfs hide_sus_mnts_for_non_su_procs 1
```

Run `ksu_susfs` with no arguments in a root shell for the full command list. Most users never type these: a module wraps them into boot scripts and a WebUI.

### The userspace modules

Two community modules ship the tool plus curated rule sets, so you get sensible defaults instead of an empty rule table:

- **[SUSFS for KernelSU](https://github.com/sidex15/susfs4ksu-module)** - the well established option. Ships `ksu_susfs`, a config file and a WebUI, hides the usual suspects (root app folders, recovery folders, `/data/local/tmp` entries, `Android/data`, `Android/media`, `Android/obb`), and includes optional kernel string spoofing.
- **[BRENE](https://github.com/rrr333nnn333/BRENE)** - a hardening-focused alternative. Beyond hiding it also hides traces left by custom kernels, font and Zygisk modules' map entries, and spoofs selected system properties, with settings surfaced in the Manager.

> [!WARNING]
> Both modules apply aggressive hiding by default. Hiding a path also hides it from your own file managers and backup apps, which is the most common source of "my storage looks empty" reports. Start with the defaults, then add rules one at a time.

---

## Requirements

| Requirement | Detail |
|-------------|--------|
| Root | KernelSU, KernelSU-Next, SukiSU-Ultra or BakaSU. Magisk cannot use SUSFS |
| SUSFS-capable kernel | Either compiled into the kernel, or loaded as a kernel module (see below) |
| Matching KMI | Only for prebuilt kernels and prebuilt SUSFS modules |
| Userspace module | Provides `ksu_susfs` and the rules; kernel alone does nothing by itself |
| A metamodule, if you use mounted modules | KernelSU-Next, official KernelSU and BakaSU still need one for `/system` modules |
| Backup and recovery plan | Root + kernel changes carry bootloop risk. Keep the stock image |

Check what your current setup already reports. `KE` in the output means the feature is compiled in:

```bash
su -c 'ksu_susfs show version; ksu_susfs show enabled_features'
# KernelSU-Next also has a built-in check:
su -c 'ksud susfs support; ksud susfs features'
```

---

## Getting SUSFS

You need a kernel that carries the patches. There are three practical routes.

### Option 1: Prebuilt community kernel

Fastest route. Community kernel projects build KernelSU or KernelSU-Next with SUSFS already patched in, for example the WildKernels GKI builds. Match the **KMI** and the kernel's security patch level to your device, flash it, then install the userspace module. See [Root Hiding & Play Integrity](../apps-and-modules/root-management.md#root-hiding-play-integrity) and the kernel build sources in [Resources](../resources.md) for current projects.

### Option 2: Patch and build your own kernel

For control, or when no prebuilt kernel covers your device. Upstream keeps per kernel-version branches rather than one master branch, and the patch set changes between kernel lines:

1. Clone official KernelSU at a release tag, and the matching SUSFS branch at a tag.
2. Apply `10_enable_susfs_for_ksu.patch` inside the KernelSU directory and `50_add_susfs_in_kernel-<version>.patch` at the kernel root, then copy the patch set's `fs/susfs.c` and `include/linux/susfs.h` into place.
3. Enable `CONFIG_KSU_SUSFS=y` and choose the `CONFIG_KSU_SUSFS_*` features you want in `defconfig` or the KernelSU Kconfig.
4. Build against the Google GKI artifacts (or the DDK toolchain for LKM builds). For Android 14 and newer GKI builds, delete the `abi_gki_protected_exports_*` files or some vendor modules will not load, and make sure the boot image's security patch level is not older than your device's.
5. Flash, boot, install the userspace module.

Upstream's README has the exact copy and patch commands, plus notes for `-dirty` version strings and spoofing `/proc/config.gz` with your stock config.

### Option 3: SUSFS as a loadable kernel module

The newest route, and the reason SUSFS no longer forces a kernel rebuild on GKI devices. A loadable SUSFS module, commonly named `susfs_guard_lkm`, is loaded into a stock or lightly modified GKI kernel through `ksud insmod`, with the loader filling in symbol addresses from `kallsyms` at load time.

- **KernelSU-Next** ships prebuilt SUSFS kernel modules for each KMI and manages them itself:
  ```bash
  ksud susfs load            # load for the detected KMI
  ksud susfs unload
  ksud susfs autoload enable # load automatically at post-fs-data
  ksud susfs autoload status
  ```
  This is arm64 only. Set the fallback KMI if boot-time detection is unreliable.
- **Other variants** use a loader module that detects the device, downloads the matching module file and loads it on boot, for example [susfs4ksu-lkm-module](https://github.com/Nixie24/susfs4ksu-lkm-module). The kernel modules themselves are published by [susfs4ksu-lkm](https://github.com/inforcqb/susfs4ksu-lkm).

You still need the userspace module from the previous section: the loadable kernel module provides the kernel half, not the rules.

> [!NOTE]
> Loading a kernel module into a kernel it was not built for can panic the device. Match the KMI exactly, and prefer the prebuilt set that ships with your root manager.

---

## Configuring It

Install the userspace module through your manager's module installer and reboot. Then:

- **Open the module's WebUI** (KernelSU Manager, module card) and work through the toggles: path hiding groups, mount hiding for non-root processes, kernel string spoofing, AVC log spoofing, logging.
- **Settings live in files too.** SUSFS modules keep configuration and rule lists under `/data/adb`, so they can be backed up and diffed. Persistent rules belong there, because rules added by hand with `ksu_susfs` are lost on reboot.
- **Add rules sparingly.** Hiding a path means hiding it from everything that does not have root, including your own tools and the apps you use daily.
- **Keep logging on while tuning.** It makes the difference between "SUSFS is hiding this" and "SUSFS is not loaded" visible; turn it off once the setup is stable if you prefer a quieter log.

---

## Verifying It Works

Do these in order. If step 2 fails, nothing later matters.

1. **Is the kernel side present?**
   ```bash
   su -c 'ksu_susfs show version; ksu_susfs show variant'
   su -c 'dmesg | grep -i susfs | tail -20'
   ```
   A missing binary means the userspace module is not installed; an error from the command means the kernel half is not patched or not loaded.
2. **Which features are actually compiled in?**
   ```bash
   su -c 'ksu_susfs show enabled_features'
   ```
   Compare against what the kernel project advertised. A missing `CONFIG_...` is a kernel build question, not a configuration one.
3. **Do the rules take effect?** List a hidden directory from a root shell and from a non-root context; the two should differ. The module description in your Manager usually shows the detected status too.
4. **Do detectors agree?** Run a root detection app before and after, and test the app you actually care about rather than a demo checker. Hiding is app-specific: a bank may check for far more than paths and mounts.

> [!TIP]
> Detector results are a snapshot, not a verdict. Tools such as Duck Detector, Native Root Detector and Applist Detector are listed under [Root Detection & Testing](../apps-and-modules/root-management.md#root-detection-testing) if you want to see what leaks, and [Troubleshooting](../troubleshooting.md#play-integrity-and-banking-apps) covers the attestation side.

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---------|--------------|-----|
| `ksu_susfs: not found` | Userspace module missing or removed | Install the module, reboot |
| Commands return an error, no version | Kernel is not SUSFS patched | Use a patched kernel or load the SUSFS kernel module |
| Feature "supported" but nothing changes | Component not compiled into the kernel | Rebuild with the needed `CONFIG_KSU_SUSFS_*` options, or use a kernel that has them |
| `ksud susfs` unusable | Non-arm64 device or wrong manager variant | Use a loader module instead, or a device-specific kernel |
| Bootloop after installing | Kernel or rule set mismatch | Boot to safe mode, disable modules, reflash the stock or previous kernel |
| Storage looks empty in file managers | Path hiding is hiding `/sdcard` entries | Allow root for the file manager, or reduce the hidden path set |
| A module stopped mounting | Metamodule removal or uninstall | Reinstall a metamodule, then reinstall the module |
| Banking app still refuses | Detection beyond kernel signals | Add app profiles, a hiding module and attestation; test the real app |

Recovery basics live in the [KernelSU Guide](./kernelsu-guide.md#troubleshooting): safe mode with three volume-down presses right after the first boot screen, `ksud module disable` over ADB or recovery, and flashing the stock image as the last resort.

---

## Links

| Resource | Link |
|----------|------|
| SUSFS patches and tool (upstream) | [gitlab.com/simonpunk/susfs4ksu](https://gitlab.com/simonpunk/susfs4ksu) |
| SUSFS for KernelSU (module) | [github.com/sidex15/susfs4ksu-module](https://github.com/sidex15/susfs4ksu-module) |
| BRENE | [github.com/rrr333nnn333/BRENE](https://github.com/rrr333nnn333/BRENE) |
| SUSFS LKM loader module | [github.com/Nixie24/susfs4ksu-lkm-module](https://github.com/Nixie24/susfs4ksu-lkm-module) |
| SUSFS LKM source | [github.com/inforcqb/susfs4ksu-lkm](https://github.com/inforcqb/susfs4ksu-lkm) |
| KernelSU-Next (SUSFS kernel module management) | [github.com/KernelSU-Next/KernelSU-Next](https://github.com/KernelSU-Next/KernelSU-Next) |
| Build a KernelSU kernel | [kernelsu.org/guide/how-to-build.html](https://kernelsu.org/guide/how-to-build.html) |

**Getting help:** include your device model, kernel release (`adb shell uname -r`), root variant, the output of `ksu_susfs show version` and `show enabled_features`, the userspace module you installed, and whether SUSFS came from the kernel or a loadable module.
