---
layout: doc
title: "Magisk Root Guide: Install & Modules"
description: "Learn Magisk installation, boot image patching, modules, Zygisk, DenyList, Play Integrity and troubleshooting for supported Android devices."
head:
  - - meta
    - property: og:title
      content: "Magisk Root Guide: Install & Modules"
  - - meta
    - property: og:description
      content: Install Magisk with boot image patching, systemless modules, Zygisk, DenyList and practical troubleshooting guidance.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/magisk-guide.png
  - - meta
    - name: twitter:title
      content: "Magisk Root Guide: Install & Modules"
  - - meta
    - name: twitter:description
      content: Magisk installation, boot image patching, modules, Zygisk, root hiding and Play Integrity troubleshooting.
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/magisk-guide.png
  - - meta
    - name: twitter:image:alt
      content: Magisk Root Guide - Universal Systemless Rooting
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Rooting Solutions
  - - meta
    - property: article:tag
      content: Magisk Root
  - - meta
    - property: article:tag
      content: Systemless Root
  - - meta
    - property: article:tag
      content: Android Rooting
  - - meta
    - property: article:tag
      content: Magisk Modules
  - - meta
    - property: article:tag
      content: Root Management
  - - meta
    - property: article:tag
      content: Play Integrity Fix
  - - meta
    - name: robots
      content: index, follow, max-image-preview:large
---

# Magisk Root Guide: Installation, Modules & Root Management

Magisk provides systemless root through a patched boot-related image. This guide covers image selection, installation, modules, Zygisk, DenyList, Play Integrity and recovery when an update or module goes wrong.

## Quick Navigation

- [What is Magisk](#understanding-magisk)
- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
- [Post-Installation](#post-installation-setup)
- [Module Management](#managing-modules)
- [Root Hiding](#root-hiding-and-play-integrity)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Complete rooting overview
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Required first step
- [Root Comparison](./root-framework-comparison.md) - Compare with KernelSU and APatch
- [Troubleshooting Guide](../troubleshooting.md)
- [FAQ](../faqs.md) - Common questions

**Magisk topic map:** [installation](#installation-methods) · [boot image patching](#method-1-boot-image-patching-recommended) · [Magisk modules](#managing-modules) · [Zygisk and DenyList](#root-hiding-and-play-integrity) · [Play Integrity](#understanding-play-integrity) · [troubleshooting](#troubleshooting)

---

## Understanding Magisk

Magisk provides superuser access and can apply systemless modifications without directly changing read-only system partitions. Updates and recovery still depend on the device, firmware and installation method.

### Core Features

- **Magic Mount overlays**: Apply module files over read-only partitions.
- **Image patching**: Patch the appropriate `boot`, `init_boot`, `vendor_boot` or recovery image for the device.
- **Zygisk**: Run compatible module code in app processes.
- **MagiskSU**: Manage superuser access for selected apps and shell users.

Removing Magisk does not reverse a bootloader unlock or a tripped Samsung Knox warranty bit.

### Magisk vs Alternatives

| Feature | Magisk | KernelSU | APatch |
|---------|--------|----------|---------|
| Ease of Use | Excellent | Moderate | Moderate |
| Module Support | Excellent | Excellent | Good |
| Root Hiding | Community tools; no built-in hiding | App Profiles and optional tools | No guarantee |
| Device Support | Broadest | GKI 2.0 for official builds, wider via variants | ARM64, kernel 3.18 to 6.12 |
| Custom Kernel Required | No | No for LKM mode, yes for GKI mode | No |

**Choose Magisk if:**
- You want easiest installation
- You need extensive modules (browse the [750+ app and module collection](../apps-and-modules/))
- You want maximum compatibility
- You're new to rooting

> [!TIP]
> Detailed comparison with other root solutions: [Root Comparison](./root-framework-comparison.md)

---

## Prerequisites

### Critical Requirements

::: danger ESSENTIAL PREREQUISITES
**Unlocked Bootloader** - Magisk requires unlocked bootloader. Complete [bootloader unlocking](./how-to-unlock-bootloader.md) first.

**Stock Firmware** - Download your device's stock firmware for boot image extraction.

**Complete Backup** - Backup all important data before proceeding.

**Battery 50%+** - Ensure sufficient battery to prevent interruption.
:::

### Hardware Requirements

- Android device with unlocked bootloader
- 50% or higher battery charge
- Quality USB cable (data-capable)
- Computer (Windows, macOS, or Linux)

### Software Requirements

**On Computer:**
- [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) (ADB/Fastboot)
- Device-specific USB drivers (Windows only)
- Stock firmware for your device

**On Device:**
- Latest Magisk APK from [GitHub](https://github.com/topjohnwu/Magisk/releases)
- File manager app
- At least 500MB free storage

### Compatibility

The official release requires Android 7.0 or newer. Minimum requirements can change, so check the [official project](https://github.com/topjohnwu/Magisk) and [release notes](https://github.com/topjohnwu/Magisk/releases) before installing. An unlockable bootloader alone does not guarantee device compatibility.

1. Verify that your exact device variant can be unlocked and flashed.
2. Obtain firmware matching the installed build and a device-specific recovery plan.
3. Check the [upstream installation guide](https://topjohnwu.github.io/Magisk/install.html) and [device-specific guides](./index.md#device-specific-guides) for partition layout and known restrictions.

---

## Installation Methods

The image-patching workflow below is for a supported, unlocked device. Samsung and Googlebook devices have separate upstream procedures. Read the [official installation guide](https://topjohnwu.github.io/Magisk/install.html) and your device's instructions before flashing.

### Method 1: Boot Image Patching (Recommended)

**Best for:** devices with a verified image-patching and fastboot workflow. Samsung uses a patched firmware tar and download mode, not these generic fastboot examples.

#### Step 1: Download Required Files

1. Get the official Magisk APK from [GitHub Releases](https://github.com/topjohnwu/Magisk/releases) and install it on the device you intend to root.
2. Download stock firmware for the exact device variant and installed build. Keep an independent copy of the complete firmware and original images needed for recovery.
3. Identify the image and partition using the device's layout and [upstream instructions](https://topjohnwu.github.io/Magisk/install.html#getting-started):
   - If the device has a boot ramdisk, Magisk patches the image containing it: `boot.img`, `init_boot.img` or `vendor_boot.img`, depending on the device.
   - If there is no boot ramdisk, Magisk may need `recovery.img` and a special boot sequence. Read [Magisk in Recovery](https://topjohnwu.github.io/Magisk/install.html#magisk-in-recovery) first.
   - Some devices upgraded to Android 13 or later still use `boot`; **never choose the partition from the Android version alone**. Magisk's **Ramdisk** status is helpful but does not by itself identify the image to flash.
4. If you cannot verify the image, target partition and slot for this device, stop and consult its device-specific instructions.

For Pixel devices, official [factory images](https://developers.google.com/android/images) are one source. Other manufacturers may use fastboot firmware or OTA payloads. For Samsung, use the AP-tar workflow below; for Googlebooks, follow the separate [upstream instructions](https://topjohnwu.github.io/Magisk/install.html#googlebooks).

#### Step 2: Patch Boot Image

1. Open Magisk on the **same device** that will run the patched image. Never flash an image patched on another device or shared by someone else.
2. Tap **Install** in the Magisk card. Select **Recovery Mode** only when following the recovery-image installation path, not merely because a custom recovery is installed.
3. Choose **Patch firmware / image**. Select the verified raw image or supported official firmware package from storage, or provide a direct firmware URL if appropriate. The app can extract the target image from supported OTA or factory packages.
4. Start patching and note the output filename and location, normally in Download. Confirm that the selected output corresponds to the image and partition you intended to patch.

Keep the original image unchanged for recovery. For Samsung, select the firmware **AP tar** instead of extracting and flashing an individual image.

#### Step 3: Flash Patched Image

**For devices using fastboot:** transfer the patched image to the computer using ADB. Replace the example filename with the actual output name in the commands below.

```bash
adb pull /sdcard/Download/magisk_patched-EXAMPLE.img
adb reboot bootloader
fastboot devices
```

On standard A/B devices, unsuffixed `fastboot flash` commands for a slotted partition target the current active slot by default ([AOSP](https://source.android.com/docs/core/ota/ab/ab_implement#kernel-slot-arguments)); `fastboot getvar current-slot` reports the slot selected for the next boot. Use these examples only if that is the intended slot and the image matches its firmware. For a different slot, follow the exact-device procedure instead.

Use **only the one command** that matches the verified original image and target partition. The examples use `magisk_patched-EXAMPLE.img` as the local filename; replace it with yours.

If you patched the verified `boot.img`:

```bash
fastboot flash boot magisk_patched-EXAMPLE.img
```

If you patched the verified `init_boot.img`:

```bash
fastboot flash init_boot magisk_patched-EXAMPLE.img
```

If you patched the verified `vendor_boot.img`:

```bash
fastboot flash vendor_boot magisk_patched-EXAMPLE.img
```

If your device requires Magisk in recovery and you patched its verified `recovery.img`:

```bash
fastboot flash recovery magisk_patched-EXAMPLE.img
```

Then reboot with `fastboot reboot`. For a recovery-based installation, a normal boot does **not** enable Magisk: use the device's recovery key combination and the release/hold sequence described in [Magisk in Recovery](https://topjohnwu.github.io/Magisk/install.html#magisk-in-recovery).

**Samsung devices:** follow the complete [Samsung-specific upstream procedure](https://topjohnwu.github.io/Magisk/install.html#samsung-devices), not the fastboot commands above.

1. Check that the bootloader and KnoxGuard permit installation and back up your data. Magisk permanently trips the Knox warranty bit, and **first installation requires a full data wipe**, in addition to the bootloader-unlock wipe.
2. From the matching Samsung firmware package, copy its `AP` tar to the device. In Magisk, select **Patch firmware / image** and patch the AP tar on that same device. Select Recovery Mode if the device lacks a boot ramdisk.
3. Copy the resulting patched tar back to the computer with ADB, not MTP. In download mode, follow upstream's full firmware flashing sequence with patched `AP` and the matching `BL`, `CP` and **`CSC`**, not `HOME_CSC`, for the first install. Complete the factory reset if prompted.
4. If Magisk is installed in recovery, use the recovery boot sequence to enable it. Reinstall/open the app and complete its additional setup when prompted.

**Never restore individual stock `boot`, `init_boot`, `recovery` or `vbmeta` partitions on Samsung.** Upstream warns this can brick the device; use its full-firmware recovery procedure instead.

#### Step 4: Verify Installation

1. Allow the first boot to complete, then open the Magisk app and follow any additional setup prompt.
2. Check that the Magisk card reports an installed version rather than **N/A**. If installed in recovery, first use the required recovery key sequence.
3. Grant a trusted test app superuser access in the **Superuser** tab before testing. See [Initial Configuration](#initial-configuration).

An installed app alone does not prove that the patched image booted or that root access works.

---

### Method 2: Custom Recovery Installation (Legacy)

Magisk's [custom recovery method](https://topjohnwu.github.io/Magisk/install.html#custom-recovery) is deprecated and maintained with minimal effort. It is only possible on devices with a boot ramdisk; it **cannot** install or upgrade Magisk when Magisk must be installed in recovery.

If your exact device and recovery support this method, upstream describes renaming the official APK to `.zip`, installing it in recovery and then completing the app's direct reinstallation. For problems, use the verified image-patching method instead. A recovery may not be able to decrypt `/data` or access the right partitions.

---

### Method 3: Direct Installation (Advanced)

For an existing, working Magisk installation, upstream recommends opening Magisk and using **Install > Direct Install** to update it, then rebooting. Do not assume this is a safe shortcut for switching between root frameworks; remove the previous framework using its own device-specific instructions first.

Temporary boot is device-specific. Only try `fastboot boot` if the device supports it and you have a compatible, bootable `boot` image. An `init_boot` image is not a standalone bootable image. A successful temporary boot is not itself a permanent installation.

If stock firmware is unavailable, do not assume a dump of an already-patched partition is stock. Obtain the exact-build original and confirm the recovery path before proceeding.

---

## Post-Installation Setup

### Initial Configuration

**1. Grant and verify root access**

In the current Magisk app, open **Superuser**, use the add button and explicitly grant access to the trusted app before it calls `su`. Interactive superuser request prompts are no longer provided. Older releases may behave differently; see the [release notes](https://github.com/topjohnwu/Magisk/releases).

To test from ADB, grant the **ADB shell** entry access first, then run:

```bash
adb shell su -c id
```

An unrestricted root shell should report `uid=0(root)`. Revoke shell access afterward if it is not needed; granting it gives a connected, authorized computer root access.

**2. Review settings**

- Keep the encryption and AVB/dm-verity preservation defaults unless verified device-specific instructions explain a change and its risks. Changing them can cause data loss or boot failure.
- **Recovery Mode** is for patching a recovery image when the device needs Magisk in recovery, not a setting for every custom-recovery user.
- Enable **Zygisk** only if a trusted module needs it. When enforced, **DenyList** reverts Magisk modifications in selected processes; it does not guarantee root hiding or app compatibility.
- Review and revoke Superuser grants regularly. Use authentication and capability restrictions where appropriate, and avoid granting root to apps you do not trust.

---

## Managing Modules

### Installing Modules

**Installation Process:**

1. Download module ZIP file
2. Open Magisk app
3. Tap Modules tab
4. Tap "Install from storage"
5. Select module ZIP
6. Wait for installation
7. Reboot when prompted

::: warning MODULE SAFETY
Only install modules from trusted sources. Malicious modules can damage your system.
:::

**Where to research modules:**
- The module developer's official release page
- [MMRL](https://github.com/MMRLApp/MMRL) and [our curated module collection](../apps-and-modules/)
- XDA Developers forums for device-specific reports

A listing or forum post is not a security guarantee. Check the developer, source and compatibility before installing.

### Managing Installed Modules

Use the **Modules** tab to enable, disable or remove modules, and reboot when required. Install one module at a time so a failure can be isolated.

If a module causes a bootloop, Magisk can automatically disable modules and Zygisk after two failed boots. You can also try Magisk Safe Mode by holding **Volume Down before the boot animation**, as described in the [upstream FAQ](https://topjohnwu.github.io/Magisk/faq.html). Timing matters; system Safe Mode and Magisk Safe Mode are not always the same.

If ADB is enabled, authorized and able to run Magisk's command during the failed boot, the following **removes all modules and automatically reboots**:

```bash
adb shell magisk --remove-modules
```

Recovery-based manual removal requires a compatible recovery that can mount and decrypt `/data`; it is not available on every device. If these methods fail, use the [device-specific stock recovery procedure](#backup-and-restore).

---

## Root Hiding and Play Integrity

### Understanding Play Integrity

Play Integrity verdicts, Play Protect certification and an app's own root checks are different signals. Refer to Google's [verdict definitions](https://developer.android.com/google/play/integrity/verdicts):

| Verdict | What to know |
|---------|--------------|
| `MEETS_BASIC_INTEGRITY` | A basic verdict, not proof of a locked or certified device. |
| `MEETS_DEVICE_INTEGRITY` | Requirements vary by Android version; hardware-backed evidence can be required. |
| `MEETS_STRONG_INTEGRITY` | Adds stronger requirements, including security-update requirements on newer Android versions. |

An unlocked bootloader, modified firmware or independent app checks can prevent acceptance. No module guarantees any verdict or banking-app compatibility.

### Configuring Root Hiding

The [Magisk FAQ](https://topjohnwu.github.io/Magisk/faq.html) states that Magisk no longer handles root hiding. The current official app also no longer offers the old **Hide the Magisk app** repackaging feature.

In **Settings > Configure DenyList**, select the processes whose Magisk modifications should be reverted and enable **Enforce DenyList** if that behavior is wanted. DenyList is not an invisibility guarantee. Enable Zygisk only when a module needs it, and check that module's own DenyList and Zygisk requirements before changing settings.

Uninstalling the Magisk app alone does not uninstall the installed root framework or ensure that apps cannot detect it. Keep access to the official app if you need to manage root grants and modules.

### Advanced Root Hiding

Community Zygisk and integrity modules may address particular detection signals, but their requirements and effectiveness change. Use only sources you trust, follow each project's instructions and avoid stacking overlapping modules. Never download or purchase leaked attestation keys.

See [Play Integrity and Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps) and the [root-management index](../apps-and-modules/root-management#root-hiding-play-integrity) for options and limitations. Switching frameworks or adding SUSFS also does not guarantee that an app will accept the device.

### Testing Play Integrity

Use a Play Integrity checker app such as
[Play Integrity API Checker](https://github.com/1nikolas/play-integrity-checker-app). YASNAC is legacy (SafetyNet) and is no longer
authoritative.

---

## Updates and Maintenance

### Updating Magisk

**In-App Updates:**

<details><summary>👉 Click to expand details</summary>

1. Magisk > Settings
2. Update channel: Stable (recommended)
3. When update available:
   - Tap Install button
   - Choose "Direct Install"
   - Reboot when complete

**Manual Updates:**

1. Download latest Magisk APK
2. Install over existing app
3. Open Magisk
4. Tap Install > Direct Install
5. Reboot

</details>

### OTA System Updates

<details><summary>Click to expand details</summary>

**A/B devices:** upstream's [OTA procedure](https://topjohnwu.github.io/Magisk/ota.html) was tested on Pixel; verify that it applies to your device and update. Disable automatic system updates, keep a recovery plan and avoid directly modifying read-only partitions.

1. When an OTA is available, use **Uninstall > Restore Images** if the update requires stock images and a matching backup is available. **Do not reboot** after restoring. Upstream notes that Pixel and Googlebook devices normally receive a full OTA when modified, so this restore step is not needed there.
2. Start the system OTA and wait for it to finish installing and optimizing. **Do not restart yet.**
3. In Magisk, choose **Install > Install to Inactive Slot (After OTA)** and wait for it to complete.
4. Return to the system update screen and press **Restart now** there. After rebooting into the updated slot, verify Magisk and your apps.

If the inactive-slot option is unavailable, a required restore backup is missing or a step fails, stop and follow the device's update instructions. Do not guess a slot or flash an old image to the updated firmware.

**Non-A/B devices:** upstream does not provide the above seamless OTA flow. Follow the device's stock update procedure, then patch and flash the appropriate image from the new build if supported.

**Samsung:** OTA upgrading is not supported by upstream's rooted Samsung workflow. Follow its [manual firmware upgrade instructions](https://topjohnwu.github.io/Magisk/install.html#upgrading-the-os), patching the new `AP` tar; `HOME_CSC` is for an upgrade, not the first installation.

</details>

### Backup and Restore

<details><summary>Click to expand details</summary>

Back up personal data, the exact-build stock firmware and every original image that may be changed, together with your module list and root settings. Keep the backup somewhere other than the device.

For a supported non-Samsung device, Magisk's **Uninstall > Complete Uninstall** is the usual removal method. **Restore Images** only restores backed-up images, normally as preparation for an OTA; it is not a full uninstall. If the app cannot restore the images, use the matching stock firmware and your device's recovery instructions for the affected partition and slot.

If you accidentally flashed the wrong partition, restoring `boot` alone will not repair that partition. Restore the correct stock image to **every affected partition and slot** using the device-specific method. For Samsung, do not restore individual stock `boot`, `init_boot`, `recovery` or `vbmeta` partitions; follow the [full firmware procedure](https://topjohnwu.github.io/Magisk/install.html#samsung-devices). A full firmware restore can wipe data and does not undo Knox or a bootloader unlock.

</details>

---

## Troubleshooting

### Installation Issues

**Magisk shows N/A after installation**

- Confirm the image, target partition and slot against the exact device and firmware; `boot`, `init_boot`, `vendor_boot` and recovery are not interchangeable.
- If Magisk was installed in recovery, use its required recovery key sequence to boot with Magisk enabled.
- If an incorrect partition was flashed, follow [Backup and Restore](#backup-and-restore) before trying again.

**Device bootloops after flashing**

Use the [recovery guidance](#backup-and-restore) to restore every changed or accidentally flashed partition and slot with matching firmware. On Samsung, use its full-firmware procedure instead of flashing stock partitions individually. See also [emergency recovery](../troubleshooting.md#emergency-recovery).

**Fastboot does not detect the device**

Check that the device is in fastboot mode, the cable carries data, Platform Tools are current and the correct USB drivers are installed. Samsung devices use download mode and a separate flashing workflow.

### Root Access Issues

**Apps do not get root**

1. Check that Magisk reports **Installed** and, if using Magisk in recovery, that you booted with its key sequence.
2. In **Superuser**, explicitly grant the trusted app access before it calls `su`. Grant the ADB shell only if needed for a shell test.
3. Check the app's logs and permission settings. An app update alone does not install the Magisk runtime.

**Root lost after an update**

A system update can replace the patched image. Follow the device's update procedure and, if needed, patch the correct image from the **new** firmware. Direct Install is for an existing working Magisk installation; it may not be available after root is lost.

### Module Problems

**Module causes a bootloop**

Use the [module recovery steps](#managing-installed-modules). The ADB `magisk --remove-modules` command removes **all** modules and reboots; recovery-based removal requires accessible, decrypted `/data`. A restore of the affected stock image or full firmware may be necessary if neither path works.

**Module not working**

Check its compatibility and instructions, enable Zygisk only if required, and inspect the module and Magisk logs. Disable or remove conflicting modules and test one at a time.

### Banking App Issues

DenyList does not guarantee that an app will ignore root, an unlocked bootloader or other device signals. Check the app's requirements and any module's documentation, then see [Play Integrity and Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps). Clearing app data may remove local information or require re-registration; back it up before doing so. An unmodified supported device may be necessary for critical apps.

### Play Integrity Failures

Use a current Play Integrity checker and compare the exact verdict against [Google's definitions](https://developer.android.com/google/play/integrity/verdicts). A verdict alone does not prove that a banking app will work. Attestation requirements and server-side checks change, and no module can guarantee Basic, Device or Strong Integrity.

---

## Best Practices

### Security Recommendations

1. **Only grant root to trusted apps**
2. **Review superuser logs regularly**
3. **Keep Magisk updated**
4. **Backup before major changes**
5. **Test modules on non-critical device first**

### Module Management

1. **Install modules one at a time**
2. **Test after each installation**
3. **Keep list of installed modules**
4. **Remove unused modules**
5. **Update modules cautiously**

---

## Next Steps

Browse the [root apps and modules](../apps-and-modules/) and [starter kit](../apps-and-modules/#starter-kit-must-have-apps).
For optional app modifications, see the [LSPosed guide](./lsposed-guide.md); for ad blocking, see the [module list](../apps-and-modules/ad-blocking#ad-tracker-blocking)
and [tutorial](../general-guides/android-adblocking.md). The [performance modules](../apps-and-modules/performance#performance-optimization),
[debloating guide](../general-guides/android-apps-debloating.md), and [custom ROM guide](./custom-rom-installation.md) cover other common tasks.

---


## Community Resources

**Official Resources:**
- [Magisk GitHub](https://github.com/topjohnwu/Magisk) - Source code and releases
- [Magisk Documentation](https://topjohnwu.github.io/Magisk/) - Official docs
- [XDA Magisk Forum](https://forum.xda-developers.com/f/magisk.5903/) - Community support

**Module Repositories:**
- [Magisk Modules Alt Repo](https://github.com/Magisk-Modules-Alt-Repo) - Community module collection
- [Magisk Modules Repo](https://github.com/Magisk-Modules-Repo) - Legacy module collection; check individual project maintenance

**Support Communities:**
- [Reddit r/Magisk](https://www.reddit.com/r/Magisk/) - Community discussions
- [Telegram Magisk](https://t.me/magiskapp) - Official chat
- [XDA Device Forums](https://forum.xda-developers.com/) - Device-specific help

### Getting Help

**When asking for help, provide:**
- Device model and Android version
- Magisk version installed
- Installation method used
- Exact error messages or behavior
- Magisk log (Magisk > Save log)
- Steps already tried
