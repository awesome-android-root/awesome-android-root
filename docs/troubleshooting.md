---
layout: doc
title: "Android Root Troubleshooting: Bootloops"
description: "Fix common Android root problems: bootloops, missing root, incompatible modules, Play Integrity detection, recovery and flashing errors."
head:
  - - meta
    - property: og:title
      content: "Android Root Troubleshooting: Bootloops"
  - - meta
    - property: og:description
      content: Diagnose Android root bootloops, missing root, module failures, Play Integrity detection, recovery and flashing errors.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/troubleshooting.png
  - - meta
    - property: og:image:secure_url
      content: https://awesome-android-root.xyz/images/og/troubleshooting.png
  - - meta
    - property: og:image:alt
      content: Android Root Troubleshooting Guide - Fix Common Rooting Issues
  - - meta
    - property: og:image:width
      content: '1200'
  - - meta
    - property: og:image:height
      content: '630'
  - - meta
    - property: og:image:type
      content: image/png
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: Android Root Troubleshooting Guide - Fix Bootloops & Errors
  - - meta
    - name: twitter:description
      content: Practical fixes for bootloops, missing root, incompatible modules, integrity checks and recovery problems.
  - - meta
    - name: twitter:image:alt
      content: Root Troubleshooting Guide - Fix Bootloops and Installation Errors
  - - meta
    - name: robots
      content: index, follow
---


# Android Root Troubleshooting

Use this guide to diagnose a rooted Android device by symptom first: bootloop, missing root, module failure, integrity or detection problem, or a recovery/flash issue. Start with the least destructive check and keep the exact device model, build number and root framework in mind before restoring images or wiping data.

:::danger Emergency First
If your device won't boot, jump to [Emergency Recovery](#emergency-recovery) immediately.
:::

## Quick Navigation

### Emergency Issues
- [Device Won't Boot (Bootloop)](#device-won-t-boot-bootloop)
- [Root Not Working](#root-not-working)
- [Bricked Device Recovery](#bricked-device-recovery)

### Root Method Issues
- [Magisk Troubleshooting](#magisk-troubleshooting)
- [KernelSU Troubleshooting](#kernelsu-troubleshooting)
- [APatch Troubleshooting](#apatch-troubleshooting)

### Specific Problems
- [Bootloader and Fastboot Issues](#bootloader-and-fastboot-issues)
- [OTA Update Problems](#ota-update-problems)
- [Play Integrity and Banking Apps](#play-integrity-and-banking-apps)
- [App Detection and Compatibility](#app-detection-and-compatibility)
- [Device-Specific Issues](#device-specific-issues)
- [Performance and Optimization](#performance-and-optimization)

### Problem directory

| Problem | Start here |
| :--- | :--- |
| Bootloop | [Emergency recovery](#emergency-recovery), then [Magisk bootloop recovery](#device-won-t-boot-bootloop). |
| Root disappeared or is not detected | [Root not working](#root-not-working), then the guide for [Magisk](./rooting-guides/magisk-guide.md) or [KernelSU](./rooting-guides/kernelsu-guide.md). |
| A module will not install or causes a bootloop | [Magisk module troubleshooting](#magisk-modules-not-working) or [KernelSU module troubleshooting](#modules-don-t-install-don-t-work). |
| Play Integrity, banking apps or root detection | [Play Integrity and banking apps](#play-integrity-and-banking-apps) and the [root-management tools](./apps-and-modules/root-management.md#root-hiding-play-integrity). |
| Cannot boot recovery or flash an image | [Bootloader and Fastboot Issues](#bootloader-and-fastboot-issues), [bricked-device recovery](#bricked-device-recovery) and the [custom recovery guide](./rooting-guides/how-to-install-custom-recovery.md). |

---

## Emergency Recovery

### Device Won't Boot (Bootloop)

**Stop flashing and record the last change.** Do not factory-reset, change slots, disable verification or relock the bootloader as a first response. Those actions can destroy data or make recovery harder.

1. **If the bootloop followed a module install:** try Android safe mode using your device's documented key sequence. Magisk disables modules when safe mode is detected. KernelSU/APatch have their own rescue procedures; do not assume identical key combinations.
2. **If ADB is already authorized and a root shell works:** remove Magisk modules with the following command. This removes **all** modules, not just the suspect module:
   ```bash
   adb shell su -c 'magisk --remove-modules'
   ```
   ADB is normally unavailable during early boot. An `unauthorized` or offline device cannot run this command.
3. **If a compatible custom recovery can decrypt `/data`:** disable only the suspect module. In the recovery's privileged terminal, replace `MODULE_ID` with its actual directory name:
   ```sh
   ls /data/adb/modules
   touch /data/adb/modules/MODULE_ID/disable
   ```
   The `disable` marker belongs **inside each module directory**, not in `/data/adb/modules/disable`. If `/data` is encrypted or empty, stop rather than formatting it to access modules.
4. **If the bootloop followed image/kernel flashing:** restore the original image for the exact installed build and the partition actually changed. Magisk can target `boot`, `init_boot`, or recovery; APatch patches the kernel in `boot`. Samsung uses its own AP/Odin workflow.
5. **If needed, restore matching stock firmware** using the exact model/region guide. Check anti-rollback restrictions and whether the procedure wipes data. HOME_CSC is not a backup or a guarantee of data preservation. Modern Qualcomm/OnePlus rescue may require authorized service access.

**Read-only checks in bootloader fastboot:**
```bash
fastboot devices
fastboot getvar product
fastboot getvar current-slot
```

Do not flash both A/B slots with one image: the inactive slot may contain a different build or a working fallback. Restore only the documented target slot/partition. `fastboot boot recovery.img` is supported only on some devices and needs an exactly compatible image.

A factory reset erases data but does not restore a damaged kernel or remove every root modification. Use it only when the device-specific recovery instructions require it and you accept the loss.

**Upstream references:** [Magisk installation](https://github.com/topjohnwu/Magisk/blob/master/docs/install.md), [Magisk module markers](https://github.com/topjohnwu/Magisk/blob/master/docs/guides.md), [KernelSU rescue](https://kernelsu.org/guide/rescue-from-bootloop.html).

---

### Root Not Working

**Symptoms:** Apps report "no root," superuser prompts don't appear, or manager shows N/A.

**Basic Verification:**

1. **Check Root Manager Status**
   - **Magisk:** App should show version numbers. "Installed" should display. If N/A, installation failed
   - **KernelSU:** Check supported/enabled status and matching manager/kernel integration before changing any image
   - **APatch:** App shows KernelPatch status. Check SuperKey configuration
   - Test with a simple root checker app or Termux + `su`

2. **Verify Correct Image**
   ```bash
   adb shell su -c "echo Root works"
   ```
   If `su` is not found, check installation status and the requesting app's root permissions/profile. KernelSU can hide `su` from unapproved apps; this result alone does not prove root is absent.

**Solutions by Root Method:**

**Magisk:**

1. **Reinstall to Current Slot**
   - Download the latest stable Magisk APK from [official GitHub](https://github.com/topjohnwu/Magisk/releases)
   - If root still works, open → Install → Direct Install. If installed status is N/A and root is unavailable, patch a matching stock image instead. Use inactive-slot installation only during the documented OTA flow.
   - Reboot
   - See [complete Magisk guide](./rooting-guides/magisk-guide.md) for detailed instructions

2. **Ensure Correct Target Image**
   - For Magisk, check the actual ramdisk location: use `init_boot.img` if present, otherwise the supported `boot.img` or recovery workflow. An Android upgrade alone does not change the partition layout.
   - Extract from your exact firmware build

3. **Enable Zygisk (if needed)**
   - Settings → Enable Zygisk
   - Configure DenyList for apps that mustn't see root
   - Reboot after changes

4. **Check Module Conflicts**
   - Disable all modules and re-enable one at a time
   - See [Emergency Recovery](#emergency-recovery)

5. **Android 16 QPR2 Compatibility**
   - Magisk now supports the new sepolicy binary format introduced in Android 16 QPR2. Ensure you are on the latest stable release (v30.7+) if running Android 16.
   - Magisk 30.7 was released with support for Android 16 QPR2; if you updated your firmware recently, update Magisk before re-patching.

**KernelSU:**
- KernelSU officially supports Android GKI 2.0 devices (kernel 5.10+). Older kernels (4.14+) are also supported, but the kernel will need to be built manually.
- Match kernel to your ROM/firmware version and vendor partition
- Use official KernelSU Manager
- Check the current release assets for an LKM matching your kernel branch/KMI
- See [complete KernelSU guide](./rooting-guides/kernelsu-guide.md) for installation help

**APatch:**
- APatch supports ARM64 kernels 3.18–6.12 subject to required kernel configuration and device restrictions; it is not universal.
- Do not run APatch together with Magisk or KernelSU on the same active slot. Use one root stack at a time.
- Follow [official APatch guide](./rooting-guides/apatch-guide.md) for your device/ROM

**Clean Re-install (Magisk):**

Extract the correct image from your installed firmware, patch it on the same device, and flash only the partition/slot specified by your device guide. Do not overwrite both slots or use someone else's patched image. Recovery ZIP installation is deprecated upstream and is not appropriate for every device.

---

### Bricked Device Recovery

**Determine Brick Type:**

- **Soft brick (recoverable):** Can reach fastboot/download/recovery; device shows signs of life. High recovery chance
- **Hard brick:** No response, no LEDs, not detected by PC. Recovery depends on SoC; professional help may be required

**Soft Brick Recovery:**

1. **Enter Recovery/Bootloader**
   - Try all key combinations (see [Device Won't Boot](#device-won-t-boot-bootloop))

2. **Flash Stock Firmware**
   - **Pixel:** Factory images/Android Flash Tool
   - **Samsung:** Odin with full firmware. HOME_CSC may preserve data in supported workflows but is not guaranteed. Installing Magisk trips the permanent Knox Warranty Bit
   - **Xiaomi:** Mi Flash Tool with fastboot ROM. Beware Anti-Rollback (ARB)
   - **OnePlus:** MSMDownloadTool or fastboot packages

3. **Factory Reset if System Corrupted**
   ```bash
   fastboot -w
   fastboot reboot
   ```

**Hard Brick Options:**

Recovery options vary by SoC/manufacturer:
- **Qualcomm EDL (9008):** Requires test points or special cable; many devices require authorized accounts
- **OnePlus MSM tools:** Full unbrick to factory state (legacy models)
- **Samsung Smart Switch Emergency Recovery:** Limited success, model-dependent
- **Professional services:** JTAG/ISP/board-level repair for valuable devices

**Prevention:**
- Confirm firmware/build numbers match exactly
- Keep device charged; don't interrupt flash operations
- Always back up before flashing

---

## Magisk Troubleshooting

### Installation Fails

#### Error: "Cannot patch boot image"

Check that the file was fully extracted from firmware for the exact device/build and that there is enough free storage. `file boot.img` can identify an image format, but cannot prove it belongs to your device.

- Confirm the correct Magisk target in [upstream installation instructions](https://github.com/topjohnwu/Magisk/blob/master/docs/install.md). Samsung normally requires patching the AP archive rather than an arbitrary standalone image.
- For OTA payloads, prefer a full package and extract the required partition using [payload-dumper-go](https://github.com/ssut/payload-dumper-go). Incremental payloads may need source images.
- Compare published checksums where available. A checksum you compute yourself detects later file changes, not authenticity by itself.
- Save the patching log and report the image format and exact error. Do not try random firmware, switch to recovery patching blindly, or patch on a different phone.

---

#### Error: "Installation failed! This device is not supported"

**Solutions:**

1. **Update Magisk**
   - Download latest version (v30.7+ for Android 16 QPR2 support)
   - Alpha/Beta may support newer devices first

2. **Check device compatibility**
   - Some devices need special Magisk builds
   - Search XDA for device-specific versions

3. **Try KernelSU or APatch as alternative**
   - Some devices incompatible with Magisk
   - KernelSU or APatch may work where Magisk doesn't

---

### Magisk Modules Not Working

Check Magisk's installed status, then inspect the module's compatibility notes, install output and any module-specific logs. Use Magisk's log export instead of assuming `/cache/magisk.log` exists.

1. Disable the suspect module and reboot. If needed, disable all optional modules, then re-enable one at a time.
2. Confirm required dependencies and whether the module needs Zygisk. Use only one Zygisk implementation.
3. Check for overlapping mounts/hooks with other modules and whether the module supports the current ROM/Android release.
4. If the manager's module list disappears, verify that the device booted the expected slot/framework before reinstalling anything.
5. If Android cannot boot, use [module recovery](#device-won-t-boot-bootloop). Do not format encrypted data to reach the module directory.

A successful ZIP installation does not prove the module mounted or its scripts completed. Include the install output and minimal reproducing module set in a bug report.

---

### DenyList / Root Hiding Not Working

Magisk's DenyList reverts Magisk changes in selected processes; it does not promise undetectable root or passing Play Integrity. First verify the target process selection, current Magisk version and whether a Zygisk module is involved.

- For built-in Zygisk, enable it only when needed and reboot after changing settings.
- For standalone Zygisk, follow its instructions about disabling built-in Zygisk; never run multiple implementations together.
- If using a third-party hiding module, follow **that release's** DenyList enforcement requirements. For example, Shamiko uses the list but requires enforcement disabled; this is not the configuration for ordinary enforced DenyList.
- Test one strategy at a time and record the change. Do not delete `ro.secure`/`ro.debuggable` or install more modules blindly.
- Avoid clearing banking-app data without knowing how to reactivate it. Hiding the manager APK does not change hardware attestation.

Continue with [Play Integrity and Banking Apps](#play-integrity-and-banking-apps) to distinguish integrity verdicts from app-specific checks.

---

### Magisk Broke OTA Updates

If the updater rejects the package, check whether stock boot/recovery images were restored and read-only partitions remain unmodified. Restore Images is not the same as Complete Uninstall.

Use the [supported A/B flow](#ota-survival-with-magisk-a-b-devices), including its **do not reboot** steps, or the device-specific full-update procedure. If installation already failed, identify which build and slot still boot before restoring any image. Never flash the new build's boot image over an older system as a generic fix.

---

## KernelSU Troubleshooting

### Installation Issues

#### Error: "No KernelSU detected" / App shows "Unsupported"

**Causes:**
- Wrong kernel flashed
- Kernel doesn't have KernelSU built-in
- LKM module not loaded

**Solutions:**

1. **Verify kernel**
   ```bash
   adb shell
   su -c "cat /proc/version"
   # Kernel version alone does not prove KernelSU is installed
   ```

2. **Understand running modes**
   - Since version 0.9.0, KernelSU supports two running modes on GKI devices: GKI: Replace the original kernel of the device with the Generic Kernel Image (GKI) provided by KernelSU.
   - **LKM mode:** Load KernelSU as a kernel module (recommended for GKI devices). Use `ksud boot-patch` to patch boot image with LKM.
   - Kernel version and Android version aren't necessarily the same! If you find that your kernel version is android12-5.10.101, but your Android system version is Android 13 or other, don't be surprised.

3. **Use ksud tool to patch**
   - The ksud tool provided by KernelSU can help you quickly patch the official firmware and then flash it. This tool supports macOS, Linux, and Windows. You can download the corresponding version from GitHub Release.

4. **Build kernel with KernelSU (advanced)**
   - Follow KernelSU documentation
   - Compile custom kernel
   - Flash and test

---

### Modules Don't Install / Don't Work

**Diagnosis:**

1. **Check if a metamodule is installed (Most Common Issue!)**
   - KernelSU requires a **metamodule** to mount modules
   - Without a metamodule, modules are installed but NOT mounted
   - Open KernelSU Manager → Modules and verify a metamodule is active

2. **Check module compatibility**
   - Many modules use a Magisk-like format, but scripts and mount assumptions may be incompatible
   - Some Magisk modules are incompatible

**Solutions:**

1. **Install a metamodule first**
   - Install a metamodule from the [official module repository](https://modules.kernelsu.org/) (filter "Metamodules only")
   - Install via KernelSU Manager → Modules
   - Reboot and try installing modules again

2. **Convert Magisk module**
   - Some modules work with minor changes
   - Check module developer notes

3. **Find KernelSU alternatives**
   - Growing KernelSU module ecosystem
   - Check KernelSU module repos

---

### KernelSU Not Surviving Reboots

First distinguish a temporary `fastboot boot` session from a persistent installation. Then check the manager's supported/working status, installed firmware build and current slot after reboot.

- Use the installation mode and kernel image that match your device's KMI and firmware.
- An OTA may switch slots and replace the patched image. Follow the current upstream OTA instructions or repatch the updated image.
- Do not flash both slots to make root "stick" and do not disable AVB as a generic fix.
- Save manager/installation logs before retrying. A kernel version string need not contain the word `KernelSU`.

---

### KernelSU-Next (Fork)

[KernelSU Next](https://github.com/KernelSU-Next/KernelSU-Next) is maintained separately from KernelSU. Supported kernels, modes, manager protocol and mounting behavior can differ across releases. Match the manager to the kernel integration and read this fork's release notes; do not install a mainline manager or image solely because its version number is higher.

---

### App Profile Issues

**KernelSU combines per-app superuser authorization with configurable root profiles**

**Configuration:**

1. **Set up profiles**
   - KernelSU Manager → Profiles
   - Create profiles for different use cases
   - Assign apps to profiles
   - Only permitted apps can access `su`; this does not guarantee other apps cannot detect a modified device. KernelSU allows customization of su's uid, gid, groups, capabilities, and SELinux rules, hardening root privileges.

2. **Profile not applying**
   - Force stop app
   - Clear app cache
   - Reapply profile
   - Reboot

---

## APatch Troubleshooting

### Patching Fails

APatch patches the kernel in **`boot.img`**, not the generic ramdisk in `init_boot`. Use the boot image extracted from the exact installed firmware and preserve the original file.

| Symptom | Check before retrying |
|:--------|:---------------------|
| Unsupported image | Correct `boot.img`, ARM64 architecture, supported kernel and required kernel configuration |
| Patching error or timeout | Full patch log, free storage and supported patching method for this release |
| Verification failure | Image source, extraction integrity and exact error; do not disable AVB blindly |
| Flash rejected | Bootloader state, target partition/slot and model-specific flash requirements |

Set a strong, unique **SuperKey** according to the current manager's validation rules. Treat it like a password: never publish it in screenshots, logs or issue reports.

The [upstream README](https://github.com/bmax121/APatch) lists ARM64 kernels 3.18–6.12 and `CONFIG_KALLSYMS` requirements, with additional device restrictions. Use the installed release's instructions for recovery or desktop patching rather than assuming Magisk procedures apply. Do not combine APatch with another root framework on the same active installation.

---

### APatch Module System

APatch supports **APM** Android modules for systemless changes and **KPM** kernel patch modules that execute in the kernel. APM compatibility does not imply KPM compatibility.

Use the documentation and release notes for the installed APatch version before changing mount behavior or adding undocumented marker files. Install one module at a time and retain a recovery path. Kernel code can compromise the entire device; never load an untrusted KPM merely to test whether it fixes an app.

[APatch upstream README and releases](https://github.com/bmax121/APatch)

---

### APatch Not Persistent

Confirm that you installed a patched **boot** image rather than merely booting it temporarily. APatch patches the kernel, which is not in `init_boot`.

Check the active slot and whether an OTA replaced the image. Use the boot image from the currently installed build and follow [APatch's installation instructions](https://apatch.dev/install.html). Do not flash both slots, disable verification indiscriminately, or combine root frameworks on the same active installation.

### APatch OTA Updates

Root survival with APatch is image-based, so OTAs usually require repatching the updated boot chain image. Always patch image from the newly installed build, not from an older firmware package.

---

## Bootloader and Fastboot Issues

### Bootloader Won't Unlock

Check the exact model, carrier, region and current firmware's unlock eligibility before trying commands. Enabling USB debugging is not the same as enabling OEM unlocking, and neither overrides carrier/manufacturer restrictions.

- **Pixel/Nothing/OnePlus:** follow the exact device guide. Do not use `unlock_critical` as a fallback when ordinary unlock fails.
- **Samsung:** inspect OEM Lock and KnoxGuard status in Download Mode using the [upstream prerequisites](https://github.com/topjohnwu/Magisk/blob/master/docs/install.md#samsung-devices). A missing OEM unlock option may reflect a model, region or firmware restriction, not a missing driver.
- **Xiaomi:** confirm current account/region eligibility and use the official Mi Unlock tool. Follow its actual wait message; a fixed wait period from an old guide is not a guarantee.
- **Motorola:** check the manufacturer's unlock-code eligibility for the exact variant.

Unlocking normally wipes user data. Do not pay for an alleged universal unlock or downgrade around a security restriction: rollback protection can make the device unbootable. If the supported unlock path is unavailable, stop and seek model-specific guidance rather than issuing more flash commands.

[Bootloader unlock guide](./rooting-guides/how-to-unlock-bootloader.md)

---

### fastboot/ADB Not Recognized

Use current [SDK Platform Tools](https://developer.android.com/studio/releases/platform-tools), a data-capable cable and a direct USB port. Check which executable runs (`where adb` on Windows; `command -v adb` on Linux/macOS) to avoid conflicting old installations.

| Result | Next check |
|:-------|:-----------|
| `adb devices -l` shows `unauthorized` | Unlock Android and accept the RSA authorization prompt; reconnect if needed |
| ADB shows `offline` | Reconnect, then try `adb kill-server` and `adb start-server` |
| No ADB device in bootloader mode | Expected: use `fastboot devices`; USB debugging does not enable fastboot |
| Fastboot works but flash command fails | Record the exact error; check lock state, partition name and bootloader vs userspace fastbootd |
| Recovery has only sideload | That recovery may not offer an interactive ADB shell |

**Windows:** install signed OEM/Google USB drivers appropriate to the device and mode. Check Device Manager while in Android, recovery and bootloader, since each may need a different driver. Do not disable driver-signature enforcement as routine advice.

**Linux:** install distribution-maintained Android udev rules and configure your user's device-access group. Reconnect after applying rules. Avoid world-writable USB rules or running all ADB sessions as root.

**macOS:** Platform Tools normally needs no extra USB driver. Do not disable System Integrity Protection (SIP) for ADB/fastboot troubleshooting.

Samsung Download Mode uses Odin-compatible tooling rather than standard fastboot on most Galaxy devices.

---

### AVB and Verified Boot Errors

Capture the exact error and distinguish the expected unlocked-bootloader warning from a verification failure. Check model, build, slot, image type and rollback restrictions first.

Restore the matching original image or documented firmware package if a flash caused the failure. Do not flash empty/random `vbmeta` files, disable verification on both slots, or relock a modified device to dismiss a warning.

Most Magisk installations do not need AVB disabled. Only follow a verification-disable procedure if the exact device/ROM instructions require it; it weakens verified boot and may force a data wipe. See [Magisk installation](https://github.com/topjohnwu/Magisk/blob/master/docs/install.md).

---

## OTA Update Problems

### OTA Survival with Magisk (A/B Devices)

Follow the [upstream OTA guide](https://github.com/topjohnwu/Magisk/blob/master/docs/ota.md) and any device-specific exceptions. Back up data and stock images first; disable suspect modules. This flow requires working root, a supported A/B updater, and unmodified read-only partitions.

1. In Magisk choose **Uninstall → Restore Images**. **Do not reboot.** If the stock backup is unavailable, stop and use the device's documented full-update method.
2. Install the OTA in the system updater and wait until installation/optimization is complete. **Do not reboot yet.**
3. In Magisk choose **Install → Install to Inactive Slot (After OTA)**, if offered. Do not use this option before installing the OTA.
4. Follow the completion instructions from your Magisk version. Current upstream instructions direct you back to the system updater's **Restart now** button to enter the updated slot.
5. Verify the new build and root status before re-enabling modules individually.

If the device already rebooted, do not blindly patch the inactive slot. Identify the running build and repatch its matching image. If the OTA failed to boot, restore using the device guide rather than flashing one boot image to both slots.

### Non-A/B Devices

**Process:**
1. Uninstall Magisk (Restore Images)
2. Apply OTA normally
3. Re-patch new boot image
4. Flash via fastboot or custom recovery

### OTA Survival with APatch

Root survival with APatch is image-based, so OTAs usually require repatching the updated boot chain image. Always patch image from the newly installed build, not from an older firmware package.

---

## Play Integrity and Banking Apps

### Understanding Play Integrity

Play Integrity verdicts, Play Protect certification, DRM/Widevine status and an app's own root checks are different signals. Passing one does not establish that the others will pass.

- **MEETS_BASIC_INTEGRITY:** a basic integrity verdict, not proof of a locked or certified device.
- **MEETS_DEVICE_INTEGRITY:** device integrity requirements vary by Android version; on Android 13+ this includes hardware-backed evidence of a locked bootloader and a certified manufacturer image.
- **MEETS_STRONG_INTEGRITY:** adds stronger requirements, including recent security updates on Android 13+; a key file alone is not sufficient.

Use the [official verdict definitions](https://developer.android.com/google/play/integrity/verdicts) to interpret results. An app can enforce additional checks and policy. There is no permanent compatibility guarantee for a modified device.

### Current Module Stack (2026)

There is no universally recommended stack. First reproduce the problem with optional modules disabled and identify whether the failure is root detection, device certification, an integrity verdict, or app registration.

- Use **one** supported Zygisk implementation if a module needs it. Disable Magisk's built-in Zygisk when the standalone implementation instructs you to do so.
- Check upstream versions and configuration requirements before adding a hiding or integrity module. Stacking overlapping hooks can cause crashes and obscure the cause.
- Magisk DenyList, KernelSU App Profiles and [SUSFS](./rooting-guides/susfs-guide.md) address different exposure surfaces; none guarantees an app will accept the device.
- Never download leaked attestation keys or treat rotating keyboxes as routine maintenance. Key material may be stolen, revoked or privacy-sensitive.
- Use a maintained Play Integrity test app and record the exact verdict and time. Legacy SafetyNet/YASNAC results are not authoritative for Play Integrity.
- Check **Play Store → Settings → About → Play Protect certification** separately. Certification does not guarantee Wallet, DRM or banking compatibility.

See the [root-management tool index](./apps-and-modules/root-management.md#root-hiding-play-integrity) for project links, not a promise of compatibility. If payments or work access are essential, use an unmodified supported device or the service's supported web option. A work profile does not change the bootloader or hardware attestation state.

---

## Device-Specific Issues

### Google Pixel (6/7/8/9/10 Series)

**Common Issues:**

1. **Patching wrong image**
   - **Magisk:** Pixel 6 uses `boot`; Pixel 7 and later normally use `init_boot`. Check the exact firmware and framework; APatch still patches `boot`.
   - Patching a ramdisk partition with the wrong framework can fail or prevent boot
   - Extract from the factory image archive, or a full OTA `payload.bin` with payload-dumper-go

2. **Pixel 10 Series**
   - The Pixel 10 series, launched in August 2025, ships with Android 16 pre-installed.
   - Verify the exact model, kernel branch and root framework requirements. Rooting does not require an integrity-spoofing stack.
   - For Magisk, confirm the documented `init_boot` workflow for the exact model

3. **Android 16 QPR2 Rooting Issues**
   - After certain 2026 firmware updates, some users lost root and re-rooting failed, resulting in bootloops.
   - Magisk 30.7 was released with support for Android 16 QPR2 - ensure you are using the latest Magisk version
   - If rooting fails after a firmware update, try waiting for a Magisk update that addresses your specific build

4. **OTA updates**
   - Use "Install to Inactive Slot (After OTA)" method
   - Keep track of which build is installed in each slot; do not overwrite the fallback unnecessarily

5. **Fastbootd for flashing**
   ```bash
   # Use userspace fastboot for dynamic partitions
   adb reboot fastboot
   # Or from bootloader
   fastboot reboot fastboot
   ```

**Resources:**
- [How to Root Pixel Phone](./rooting-guides/how-to-root-pixel-phone.md)

---

### Samsung Galaxy (S21-S25, Fold/Flip)

Samsung support varies by model, region, carrier and firmware. Do not infer unlock eligibility from the Galaxy series name or assume an older One UI guide applies to a newer build.

1. **Check Download Mode first:** verify OEM Lock/KnoxGuard state and the bootloader binary revision using [Magisk's Samsung prerequisites](https://github.com/topjohnwu/Magisk/blob/master/docs/install.md#samsung-devices). Missing unlock controls may be a firmware restriction; do not downgrade blindly.
2. **Understand irreversible effects:** installing Magisk trips the Knox Warranty Bit. Returning to stock does not reset it; Knox-dependent services may remain unavailable.
3. **Use the correct AP workflow:** patch the AP archive from your exact firmware on the target device and follow the matching Odin instructions. First installation requires a data wipe. HOME_CSC is only appropriate in documented upgrade scenarios and cannot guarantee data preservation.
4. **Respect rollback protection:** do not flash a lower bootloader binary revision or mix BL/AP/CP files from unrelated builds.
5. **Prepare recovery before updating:** verify that your exact firmware has a documented upgrade/root path. Do not skip security updates indefinitely to retain root; consider restoring supported stock firmware instead.

[How to Root Samsung Phone](./rooting-guides/how-to-root-samsung-phone.md)

---

### Xiaomi/Redmi/POCO

**Common Issues:**

1. **Mi Unlock waiting period**
   - Eligibility and waiting periods depend on the current policy, region and account; follow the tool's message
   - Must use Mi Account linked to device
   - Some regions have restrictions

2. **Anti-Rollback (ARB)**
   - Flashing older firmware can hard brick
   - Check ARB version in fastboot ROM
   - Avoid any flash option that relocks the bootloader unless the exact stock restoration guide requires it

3. **HyperOS-specific issues**
   - HyperOS (successor to MIUI) heavily modified; some modules incompatible
   - Battery optimization aggressive; whitelist root apps
   - Security features may interfere with root

4. **A/B vs A-only partitions**
   - Varies by model
   - Check partition layout before flashing

**Resources:**
- [How to Root Xiaomi Phone](./rooting-guides/how-to-root-xiaomi-phone.md)

---

### OnePlus

**Common Issues:**

1. **OxygenOS/ColorOS merge**
   - Newer models use ColorOS base
   - Partition structure changed
   - Follow model-specific guides carefully

2. **MSMDownloadTool**
   - Legacy models: Full unbrick capability
   - Newer models: Availability varies
   - Returns device to factory state

3. **Regional differences**
   - Some regions have locked variants
   - Check model number carefully

**Resources:**
- [How to Root OnePlus Phone](./rooting-guides/how-to-root-oneplus-phone.md)

---

### Nothing Phone (1/2/2a)

**Common Issues:**

1. **Official unlock supported**
   - Enable OEM unlocking in Developer Options
   - Standard fastboot unlock process

2. **Custom recovery availability**
   - TWRP support varies by model
   - Check XDA for latest builds

3. **Nothing OS updates**
   - Frequent updates may require re-patching
   - Keep stock images for your version

**Resources:**
- [How to Root Nothing Phone](./rooting-guides/how-to-root-nothing-phone.md)

---

### Motorola

**Common Issues:**

1. **Official unlock available**
   - Motorola provides unlock codes
   - Check Motorola Developer site
   - Warranty void after unlock

2. **Regional restrictions**
   - Some carrier variants cannot be unlocked
   - China models may have restrictions

3. **Rescue and Smart Assistant**
   - Official rescue tool for soft bricks
   - Requires official firmware packages

**Resources:**
- [How to Root Motorola Phone](./rooting-guides/how-to-root-motorola-phone.md)

---

## Performance and Optimization

### Battery Drain After Rooting

**Common Causes:**
- Wakelocks from modules or root apps
- Background services not optimized
- Kernel settings too aggressive

**Solutions:**

1. **Identify wakelocks**
   ```bash
   # Check wakelock stats
   adb shell dumpsys batterystats
   
   # Or use apps
   # BetterBatteryStats, Wakelock Detector (root)
   ```

2. **Optimize root apps**
   - Limit apps with root access
   - Disable root for apps that don't need it
   - Check system battery usage first; aggressive background restrictions can break notifications

3. **Kernel tuning**
   - Use conservative governor profiles
   - Limit max CPU frequency if needed
   - Adjust I/O scheduler

4. **Module audit**
   - Disable unnecessary modules
   - Some modules cause wakelocks
   - Test with modules disabled

---

### Performance Tuning

**CPU/GPU Optimization:**

1. **Governor selection**
   - Available governors depend on the kernel; names do not guarantee battery or performance results
   - Keep the stock policy as a baseline and change one setting at a time

2. **Frequency scaling**
   ```bash
   # Check current governor
   cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
   
   # Available governors
   cat /sys/devices/system/cpu/cpu0/cpufreq/scaling_available_governors
   
   # Set governor (requires root app or script)
   # Do not change governors until you understand this kernel's policy and recovery path
   ```

3. **Thermal management**
   - Monitor thermals during stress tests
   - Don't disable thermal throttling permanently
   - Use gaming profiles only during actual gaming

**Apps for Performance:**
- [Performance & Gaming Apps](./apps-and-modules/performance.md)
- [Battery Management Tools](./apps-and-modules/performance.md)

**Storage Optimization:**

1. **Trim/FSTRIM**
   - Most modern ROMs do this automatically
   - Can manually trigger via root apps

2. **I/O Scheduler**
   - BFQ, mq-deadline, noop options
   - Device/kernel dependent

**Warning:** Performance tuning can affect stability and battery life. Test changes thoroughly and revert if issues occur.

---

## App Detection and Compatibility

### Banking Apps Detecting Root

Read the app's supported-device policy and check whether it fails with optional modules disabled. Root detection is separate from Play Integrity; follow [the diagnostic section](#play-integrity-and-banking-apps) instead of installing a bundle of hiding modules.

Avoid repeatedly clearing banking-app data: this can remove device registration and require reactivation. Work profiles do not hide the device's hardware state. For essential access, use an unmodified supported phone or an official web-banking option.

---

### Apps Crashing After Root

**Common causes:**

| Cause | Solution |
|:---|:---|
| Root detection | Hide root from app |
| Module conflict | Disable modules, identify culprit |
| Modified system files | Restore system partition |
| Security checks | Use root hiding modules |

**Diagnostic:**

```bash
# Check app crash logs
adb logcat | grep "FATAL EXCEPTION"

# Check module logs
su -c "logcat -d | grep -F com.example.app"
```

---

### Netflix/Streaming Apps Issues

Check Play Protect certification, app support, Widevine provisioning/security level and the actual playback error separately. Root hiding and Play Integrity modules do not restore DRM keys or guarantee HD playback.

Use supported, up-to-date app releases. Do not downgrade to arbitrary APKs as a generic fix. If DRM provisioning was affected by unlocking, consult the manufacturer or restore supported stock firmware; some device-specific changes are irreversible.

---

## Logs and Diagnostics

### Collecting Logs for Help

Use the root manager's built-in log export or bugreport function first. Magisk log paths vary; `/cache/magisk.log` is not a reliable universal location.

```bash
# Finite capture of available Android log buffers
adb logcat -b all -d > logcat.txt
# Quote the filter so the host shell does not expand it
adb logcat -d '*:E' > errors.txt
# Kernel log, only if root is authorized and kernel policy permits
adb shell su -c dmesg > kernel.log
# Comprehensive report; can contain sensitive personal information
adb bugreport bugreport.zip
```

If the phone cannot boot or ADB was not authorized, these commands may not work. Compatible recovery or a privileged shell may expose previous-boot crash data in `/sys/fs/pstore`; availability depends on kernel configuration. Do not wipe the phone just to collect logs.

Record the time of failure, reproduction steps, exact build, kernel, root manager version and module list. Redact serial numbers, account details, tokens, network identifiers and personal app content before sharing. Inspect bugreports locally and share only relevant extracts when possible.

---

## When to Give Up and Restore

**Consider unrooting if:**
- Critical apps won't work despite all efforts
- Unstable after multiple fix attempts
- Can't pass security checks needed for work
- More hassle than benefit

**Clean unroot procedure:**

1. **Backup data**
   - Copy important files
   - Export app data
   - Note customizations

2. **Uninstall root**
   - Magisk → Uninstall → Complete Uninstall
   - Or flash stock boot image

3. **Restore firmware if needed**
   - A factory reset alone does not remove patched boot images
   - Wipe data only if the documented restoration process requires it

4. **Relock only if explicitly supported**
   ```bash
   # Do not run a generic relock command.
   # Restore and boot a fully manufacturer-signed firmware set first.
   # Follow the exact model's relock procedure; expect data loss.
   ```

---

## Getting Help

### How to Ask for Help

When asking for help in forums or communities, provide complete information:

**Essential Information:**
```
Device: [Model name and number]
Firmware: [Android version, build number, security patch]
Bootloader: [Unlocked/Locked]
Root Method: [Framework/fork, exact manager version, installation mode]
Kernel/Slot: [Kernel release/KMI, active slot if known]
Modules: [Module list and most recent change]
Recovery: [TWRP/OrangeFox/Stock]

Problem: [Detailed description of what happened]
Steps Taken: [What you've already tried]
Error Messages: [Exact error text or screenshots]
Logs: [Attach logcat, dmesg if available]
```

**Good Example:**
```
Device: OnePlus 9 Pro LE2125
Firmware: OxygenOS 14.0.0.600 (Android 14)
Bootloader: Unlocked
Root: Magisk 27.0
Recovery: Stock

Problem: Device bootloops after installing Module X
Steps Taken: Tried booting to recovery, can't access ADB
Error: Stuck on OnePlus logo, no response
```

### Where to Get Help

**XDA Developers**
- Device-specific forums
- ROM and kernel threads
- [https://forum.xda-developers.com/](https://forum.xda-developers.com/)

**Reddit Communities**
- [r/AndroidRoot](https://reddit.com/r/AndroidRoot)
- [r/Magisk](https://reddit.com/r/Magisk)
- [r/LineageOS](https://reddit.com/r/LineageOS)
- [r/Awesome_Android_Root](https://reddit.com/r/Awesome_Android_Root)

**Telegram Groups**
- @MagiskUpdates (official news)
- @KernelSU (discussions)
- Device-specific groups

**GitHub Issues**
- Magisk: [topjohnwu/Magisk](https://github.com/topjohnwu/Magisk)
- KernelSU: [tiann/KernelSU](https://github.com/tiann/KernelSU)
- APatch: [bmax121/APatch](https://github.com/bmax121/APatch)

### Best Practices

**Before Posting:**
1. Search existing threads for your issue
2. Read device-specific guides
3. Check recent posts for similar problems
4. Gather relevant logs and redact personal data, serial numbers, tokens and key material

**When Posting:**
1. Use descriptive titles
2. Post in correct section/forum
3. Attach logs as files (not inline text)
4. Include screenshots when relevant
5. Be patient and respectful

**After Getting Help:**
1. Follow up with results
2. Mark solutions that worked
3. Help others with similar issues
4. Contribute back to community

---

## Additional Resources

### Quick Links

**Essential Guides:**
- [Complete Rooting Guide](./rooting-guides/index.md)
- [Bootloader Unlock](./rooting-guides/how-to-unlock-bootloader.md)
- [Custom Recovery Installation](./rooting-guides/how-to-install-custom-recovery.md)
- [Root Framework Comparison](./rooting-guides/root-framework-comparison.md)
- [Root Without Unlocking the Bootloader (GhostLock Temp Root)](./rooting-guides/root-without-unlocking-bootloader.md)

**Device Guides:**
- [Pixel](./rooting-guides/how-to-root-pixel-phone.md)
- [Samsung](./rooting-guides/how-to-root-samsung-phone.md)
- [Xiaomi](./rooting-guides/how-to-root-xiaomi-phone.md)
- [OnePlus](./rooting-guides/how-to-root-oneplus-phone.md)
- [Nothing](./rooting-guides/how-to-root-nothing-phone.md)
- [Motorola](./rooting-guides/how-to-root-motorola-phone.md)

**Root Apps:**
- [Essential Root Apps](./apps-and-modules/#starter-kit-must-have-apps)
- [Ad Blockers](./apps-and-modules/ad-blocking.md)
- [Backup Tools](./apps-and-modules/backup.md)

**General Resources:**
- [FAQ](./faqs.md)
- [Contributing](./contributing.md)
- [About](./about.md)

---

**Need more help?** Visit our [FAQ page](./faqs.md) for conceptual questions or join our [community discussions](./resources.md#communities-and-support).
