---
layout: doc
title: Complete LSPosed Framework Guide
description: "Master LSPosed framework - the modern Xposed implementation. Comprehensive installation guide with module management and customization."
head:
  - - meta
    - property: og:title
      content: Complete LSPosed Framework Guide - Modern Xposed Implementation
  - - meta
    - property: og:description
      content: Install LSPosed framework with our comprehensive guide. Modern Xposed implementation with Zygisk integration and advanced module management.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/lsposed-guide.png
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: Complete LSPosed Framework Guide
  - - meta
    - name: twitter:description
      content: Modern Xposed framework implementation with LSPosed. Advanced Android customization and module management.
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/lsposed-guide.png
  - - meta
    - name: twitter:image:alt
      content: LSPosed Framework Installation Guide
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Customization
  - - meta
    - property: article:tag
      content: LSPosed
  - - meta
    - property: article:tag
      content: Xposed Framework
  - - meta
    - property: article:tag
      content: Android Customization
  - - meta
    - property: article:tag
      content: Zygisk
  - - meta
    - name: robots
      content: index, follow
---

# Complete LSPosed / Vector Framework Guide

Vector and LSPosed are ART hooking frameworks: modules can change application and system behavior in memory. Installing a framework does not guarantee that a particular module, ROM or banking app will work.

## Essential Resources

- [Vector README](https://github.com/JingMatrix/Vector#readme), [stable releases](https://github.com/JingMatrix/Vector/releases) and [master CI builds](https://github.com/JingMatrix/Vector/actions/workflows/core.yml?query=branch%3Amaster)
- [Legacy LSPosed README](https://github.com/LSPosed/LSPosed#readme) and [GitHub releases](https://github.com/LSPosed/LSPosed/releases)
- [Root preparation](./index.md#prerequisites-and-safety), [Magisk](./magisk-guide.md) and [KernelSU](./kernelsu-guide.md)
- [Xposed/LSPosed modules](../apps-and-modules/)

<!-- Preserve incoming links to consolidated sections. -->
<span id="background-the-lsposed-ecosystem"></span>
<span id="what-is-lsposed"></span>
<span id="what-is-vector"></span>
<span id="key-features"></span>

## Choosing Your Version

- **Vector:** use this path when you need the publicly developed Zygisk-based framework and its modern libxposed support. Select a stable release that meets the module's documented requirements; CI is a separate testing channel, not a promise of stable compatibility.
- **Legacy LSPosed:** use a specific GitHub release only when your Android build and modules fit that release's documented requirements. Do not assume the legacy distribution implements Vector's APIs or supports newer Android releases.

This guide's legacy path refers to the public `LSPosed/LSPosed` GitHub distribution, not unverified binaries from download sites or messaging channels. Do not mix managers or framework ZIPs from different projects, and never install both frameworks together.

### Which one should I use?

Choose by the target module's framework/API requirements and your exact Android/ROM build. A higher API number does not guarantee backwards compatibility with every module, and switching frameworks is not a reliable detection-hiding strategy.

## Prerequisites

### Mandatory Requirements

1. Complete the [universal preparation checklist](./index.md#pre-rooting-checklist) and have a module-disable/recovery plan.
2. Use a root manager supported by the chosen framework. Vector's [README](https://github.com/JingMatrix/Vector#compatibility) calls for a recent Magisk or KernelSU installation with a working Zygisk environment (for example [NeoZygisk](https://github.com/JingMatrix/NeoZygisk)). KernelSU needs a separately installed compatible provider; root alone is insufficient. Use one provider at a time and follow its requirements.
3. Check Android support in the chosen release. At review on **2026-11-26**, Vector's README lists **Android 8.1–17 Beta** and the legacy LSPosed README lists **8.1–14**. These upstream ranges do not guarantee compatibility with every vendor ROM or module.
4. Verify the module API against the table below and its author's requirements.

## Device Compatibility

<!-- Preserve incoming links to consolidated sections. -->
<span id="rom-compatibility"></span>

Use upstream release notes and issue reports for the exact ROM and build. Brand-level ratings such as “excellent” or “unsupported” are not a substitute for testing the framework, Zygisk provider and module together.

<!-- Preserve incoming links to consolidated sections. -->
<span id="api-102-the-current-standard"></span>
<span id="api-101-the-previous-standard"></span>
<span id="api-100-legacy"></span>

### Module API Compatibility {#api-compatibility-check}

| Module API | Verified upstream information | What to check before installing |
|------------|-------------------------------|---------------------------------|
| Legacy Xposed API | Both project READMEs describe legacy Xposed support | Module's Android/ROM requirements and scope; legacy Xposed is not libxposed API 100 |
| libxposed API 100 | [Vector v2.1 notes](https://github.com/JingMatrix/Vector/releases/tag/v2.1) identify v2.0 as the API 100 line | Author's required build; do not downgrade blindly for an old module |
| libxposed API 101 | [Vector v2.1](https://github.com/JingMatrix/Vector/releases/tag/v2.1) migrated to API 101 with breaking changes | Exact framework release required by the module; newer APIs do not establish backwards compatibility |
| libxposed API 102 | [Vector v2.2](https://github.com/JingMatrix/Vector/releases/tag/v2.2) introduced API 102 | Module's API target and release requirements; do not infer support for other API generations |
| Experimental / CI APIs | Vector's README ties CI support to the module/service API submodule commits in that build | Exact commits and module build; CI features are not a stable-release guarantee |

API information was checked on **2026-11-26**. When changing this table, check the tagged release notes and API submodule revisions together; do not infer API support in the legacy LSPosed distribution from Vector's version numbers.

## Installation Guide

<!-- Preserve incoming links to consolidated sections. -->
<span id="step-1-enable-zygisk"></span>
<span id="step-2-download-the-framework"></span>
<span id="step-3-install-the-module"></span>
<span id="step-4-open-the-manager"></span>

### Method 1: Vector with Magisk {#method-1-magisk-manager-installation-recommended}

1. Establish a working Zygisk environment using Magisk's built-in implementation or a provider supported by Vector. Follow the provider's instructions and disable conflicting providers. Reboot and verify it is active.
2. Download the **system-module ZIP** from [Vector stable releases](https://github.com/JingMatrix/Vector/releases). Read its release notes before updating. For example, v2.2 requires removing a separately installed v2.1 manager before upgrading; its parasitic manager needs no such removal.
3. In Magisk, open **Modules > Install from storage**, select the ZIP and review the installer result.
4. Reboot, open the framework manager from its system notification and confirm that the framework is active before enabling modules.

For debugging only, use the separate [master CI channel](https://github.com/JingMatrix/Vector/actions/workflows/core.yml?query=branch%3Amaster). GitHub requires login to download artifacts. Follow upstream artifact instructions, use the matching manager, and do not install arbitrary PR artifacts.

### Method 2: Vector with KernelSU {#method-2-kernelsu-installation}

1. Verify a working KernelSU installation and the module support required by your selected variant.
2. Install a Vector-compatible Zygisk provider through the manager, following that provider's instructions. Reboot and verify it is active.
3. Download the Vector system-module ZIP from [stable releases](https://github.com/JingMatrix/Vector/releases), not a legacy LSPosed ZIP.
4. Install through **KernelSU Manager > Modules**, then reboot and open Vector from its system notification. Verify activation before adding modules.

### Method 3: Legacy LSPosed with Magisk

1. Check the [legacy README](https://github.com/LSPosed/LSPosed#install) and the chosen [GitHub release](https://github.com/LSPosed/LSPosed/releases) for Android and Magisk requirements. This is not the Vector installation path.
2. For the Zygisk distribution, enable Magisk Zygisk and reboot. Download the release's **Zygisk ZIP**, not the Riru flavor. Riru is a separate legacy setup and is not covered here.
3. Remove any other ART hooking framework using its documented uninstall process before installing this one; reboot between changes.
4. Install the ZIP through **Magisk > Modules > Install from storage**, reboot and open LSPosed from its notification. Use only the manager belonging to that release.

## Module Management

### How to Enable a Module

1. Check [API compatibility](#api-compatibility-check) and the [module safety checklist](./index.md#module-safety).
2. Install the module APK from its upstream source.
3. Open the framework manager, select the module and enable it.
4. Select only the required apps in **Scope**. Include System Framework only if the module author requires it; hooking it can affect the whole device.
5. Restart the target app or reboot as directed by the module, then test before enabling another module.

## Troubleshooting

### "API Version Too New/Old"

Compare the module's declared requirements with the [single API table](#api-compatibility-check) and the release notes. Do not assume that upgrading or downgrading fixes an incompatible API. Ask the module author which maintained framework build is supported.

### Detection Issues (Banking Apps)

Neither framework guarantees invisibility or app compatibility. Remove the sensitive app from module scopes and test without the framework before adding more modifications. Use [Play Integrity troubleshooting](../troubleshooting.md#play-integrity-and-banking-apps) for the shared overview; no detection-hiding ranking is implied here.

<!-- Preserve incoming links to consolidated sections. -->
<span id="manager-not-appearing-after-install"></span>
<span id="manager-won-t-open"></span>

### Installation Issues

If activation or the manager is missing, verify the exact framework ZIP, matching manager and active Zygisk provider. Collect logs using the upstream debugging instructions; Vector requests the latest debug build for bug reports. Avoid clearing app data or deleting framework directories as a generic first step.

<!-- Preserve incoming links to consolidated sections. -->
<span id="bootloop-after-enabling-module"></span>

### System Stability & Bootloops

Disable the last module using the root manager's documented rescue method: [Magisk module recovery](./magisk-guide.md#managing-installed-modules) or [KernelSU recovery](./kernelsu-guide.md#recovery). Recovery access, decryption and safe-mode behavior differ by device. Do not wipe user data or delete all of `/data/adb` to troubleshoot a module.

<!-- Preserve incoming links to consolidated sections. -->
<span id="framework-shows-as-activated-but-modules-don-t-work"></span>

### HyperOS / Xiaomi-Specific Issues

Check issues for the exact framework, Zygisk provider, firmware and module. Activation alone does not establish that a hook supports the target app or ROM. Do not change the root framework or flash a different kernel based only on the manufacturer name.

<!-- Preserve incoming links to consolidated sections. -->
<span id="complete-removal"></span>
<span id="method-1-magisk-manager-recommended"></span>
<span id="method-2-adb"></span>

## Uninstallation

Disable hooked modules first. Remove the framework through the same root manager that installed it, reboot and verify removal. If a separate manager app was installed, remove that app too. For a device that cannot boot, use the documented root-manager rescue procedure above rather than guessing module directory names.

<!-- Preserve incoming links to consolidated sections. -->
<span id="expand-your-setup"></span>
<span id="stay-updated"></span>

## Next Steps

- [Module catalog](../apps-and-modules/) — select modules for the installed framework and ROM.
- [Vector upstream support](https://github.com/JingMatrix/Vector#support-and-contribution) — debugging and issue-report requirements.
- [Troubleshooting](../troubleshooting.md) — shared app compatibility and recovery guidance.
