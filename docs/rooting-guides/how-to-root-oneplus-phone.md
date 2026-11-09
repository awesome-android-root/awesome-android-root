---
layout: doc
title: Complete OnePlus Rooting Guide
description: "Root eligible OnePlus phones with model-specific bootloader checks, firmware selection, Magisk installation and recovery guidance."
head:
  - - meta
    - property: og:title
      content: "Complete OnePlus Rooting Guide"
  - - meta
    - property: og:description
      content: "Root eligible OnePlus phones with model-specific bootloader checks, firmware selection, Magisk installation and recovery guidance."
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/oneplus.png
  - - meta
    - name: twitter:title
      content: "Complete OnePlus Rooting Guide"
  - - meta
    - name: twitter:description
      content: "Root eligible OnePlus phones with model-specific bootloader checks, firmware selection, Magisk installation and recovery guidance."
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/oneplus.png
  - - meta
    - name: twitter:image:alt
      content: "Complete OnePlus Rooting Guide with model-specific requirements"
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Device Rooting
  - - meta
    - property: article:tag
      content: OnePlus Root
  - - meta
    - property: article:tag
      content: OxygenOS
  - - meta
    - property: article:tag
      content: Bootloader Unlock
  - - meta
    - property: article:tag
      content: Magisk Installation
  - - meta
    - name: robots
      content: index, follow
---

# OnePlus Root Guide

::: danger BEFORE FLASHING
Unlocking erases data. Back up and obtain stock firmware for the exact model, region and installed build. Verify the Magisk image, target partition, slot and recovery method before writing anything. Do not disable verified boot or relock a modified device as a generic fix.
:::

These steps use Magisk. See the [KernelSU](./kernelsu-guide.md) or [APatch](./apatch-guide.md) guide for their different requirements.

This guide covers Magisk on eligible OnePlus devices running OxygenOS or ColorOS. Unlocking and recovery vary by model, firmware and carrier.

## Quick Navigation

- [Device Compatibility](#device-compatibility)
- [Prerequisites](#prerequisites)
- [Bootloader Unlock](#unlock-bootloader)
- [Root Installation](#root-installation)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Universal rooting concepts
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Detailed unlock guide
- [Magisk Guide](./magisk-guide.md) - Complete Magisk documentation

---

## Prerequisites

### Critical Requirements

::: danger BEFORE YOU START
**Data Wipe:** Unlocking bootloader erases everything including internal storage.

**Backup Everything:** Photos, contacts, messages, app data, authenticator codes.

**Carrier Variants:** Some require an unlock token or additional eligibility checks; verify the exact model.

**OEM Unlocking:** Must be available in Developer Options. Some T-Mobile models cannot unlock.
:::

### Device Compatibility

Most OnePlus devices with unlockable bootloaders can be rooted. Check [XDA Forums](https://forum.xda-developers.com/c/oneplus.11993/) for your specific model.

::: warning INCOMPATIBLE DEVICES
- **T-Mobile and some carrier-branded models** may have permanently locked bootloaders
- **Chinese-market models** running ColorOS may have additional restrictions
:::

::: tip 💡 Locked bootloader? Temporary root exists
On specific OnePlus, OPPO and realme builds, **ghostlock-oneplus** uses GhostLock (CVE-2026-43499) for session-only root without unlocking the bootloader. A full reboot clears active root, but files and settings changed during the session may remain. Other tools use different exploits and target lists; check the exact model and kernel in the loader's own documentation and the sister project's [OnePlus, OPPO and Realme section](https://awesome-temporary-root.pages.dev/guide/#oneplus-oppo-and-realme).
:::

### Hardware Requirements

- OnePlus device (any supported model)
- Quality USB-C cable
- Computer (Windows, macOS, or Linux)
- 50%+ battery charge

### Software Requirements

**On Computer:**

1. **Platform Tools** (ADB/Fastboot)
   - Download: [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools)
   - Extract to easy location

2. **OnePlus USB Drivers** (Windows)
   - Usually auto-install with ADB
   - Or download from OnePlus site

3. **Stock Firmware** (for recovery)
   - Obtain the exact model, region and installed build, with a verified device-specific restore procedure.
   - [Oxygen Updater](https://github.com/oxygen-updater/os-updater) is a third-party update downloader. Its offered package may not match the installed build; verify it before use.
   - Check [OnePlus Support](https://www.oneplus.com/support) or a trusted model-specific community source when the required package is unavailable.

**On Device:**

1. **Magisk APK**
   - Download: [Magisk GitHub](https://github.com/topjohnwu/Magisk/releases)
   - Latest stable version

::: tip Alternative Root Methods
**KernelSU** is an alternative when the exact OnePlus model and kernel are supported. It offers per-app root authorization, but neither framework guarantees Play Integrity. See the [KernelSU Guide](./kernelsu-guide.md).
:::

2. **File Manager**
   - OxygenOS Files app
   - Or any from Play Store

### Device Preparation

**Step 1: Enable Developer Options**

1. Settings > About device
2. Tap "Build number" 7 times
3. Enter PIN/password
4. "Developer options unlocked" appears

**Step 2: Enable Required Settings**

Settings > System > Developer options:
- **OEM unlocking**: Enable (critical)
- **USB debugging**: Enable
- **Advanced reboot**: Enable (optional)

**Step 3: Verify ADB Connection**

```bash
adb devices
# Accept USB debugging prompt on device
# Should show device with "device" status
```

---

## Unlock Bootloader

Confirm the unlock procedure for your exact model and carrier before proceeding.

### Step 1: Enter Fastboot Mode

**Method 1: ADB Command**
```bash
adb reboot bootloader
```

**Method 2: Hardware Keys**

Use the bootloader key combination documented for your exact model. For example, LineageOS documents Volume Up + Power for the [OnePlus 3T](https://wiki.lineageos.org/devices/oneplus3/install/variant2/); other models can differ.

### Step 2: Verify Fastboot Connection

```bash
fastboot devices
# Should show device serial number
```

### Step 3: Unlock Bootloader

Use the command and any unlock-token procedure documented for your exact model and carrier. OnePlus's [carrier unlock instructions](https://service.oneplus.com/hk_en/search/search-detail?id=op588) show that `fastboot oem unlock` and `fastboot flashing unlock` apply to different models; do not try them interchangeably. Confirm the prompt on the device. **Unlocking wipes data.**

### Step 4: Verify Unlock Status

After automatic factory reset:

```bash
adb reboot bootloader
fastboot getvar unlocked
# Should return: yes
```

Or check on device boot:
- "The bootloader is unlocked" warning (normal)

---

## Root Installation

### Determine Correct Image

The target is not determined by OnePlus generation, the running Android version, the presence of an `init_boot.img` file or Magisk's Ramdisk field alone. Depending on the exact model and firmware, Magisk may patch `boot`, `init_boot`, `vendor_boot` or recovery. See [Magisk's image-selection guidance](https://topjohnwu.github.io/Magisk/install.html#getting-started) and verify the model-specific partition and slot before proceeding.

Keep Magisk's AVB/verity and encryption defaults unless a reliable exact-device procedure explains a change and its risks. Do not disable `vbmeta` verification as a generic rooting or recovery step.

---

### Method 1: Boot Image Patching (Recommended)

**Step 1: Obtain stock firmware**

Download firmware for the exact device, region and **installed build**. [Oxygen Updater](https://github.com/oxygen-updater/os-updater) is a third-party source of update packages; check that its available package matches, rather than assuming an offered update is the current firmware. If the required build is unavailable, stop and seek a trusted model-specific source.

**Step 2: Extract and verify the image**

Some full update packages contain `payload.bin`. The [payload-dumper-go](https://github.com/ssut/payload-dumper-go#usage) utility can extract supported payloads:

```bash
payload-dumper-go -o extracted payload.bin
```

Incremental OTAs may require the exact base images and the extractor's `-old` option. Verify which extracted image contains the target ramdisk for the exact build, and keep the original firmware and stock image for recovery.

**Step 3: Patch on the device**

Transfer the verified image to the phone, install the official [Magisk APK](https://github.com/topjohnwu/Magisk/releases), and select **Install > Patch firmware / image > Select from storage**. Patch on the **same device** that will use the result; do not use a shared pre-patched image.

**Step 4: Flash the patched image**

Replace the example filename with the actual Magisk output. On A/B devices, check the current slot and follow the exact model's instructions for the intended slot. Do not flash both slots or switch slots blindly.

```bash
adb pull /sdcard/Download/magisk_patched-EXAMPLE.img .
adb reboot bootloader
fastboot devices
```

On standard A/B devices, unsuffixed `fastboot flash` commands for a slotted partition target the current active slot by default ([AOSP](https://source.android.com/docs/core/ota/ab/ab_implement#kernel-slot-arguments)); `fastboot getvar current-slot` reports the slot selected for the next boot. Use these examples only if that is the intended slot and the image matches its firmware. For a different slot, follow the exact-device procedure instead.

Run **only one** command matching the verified original image and target partition:

If you patched the verified `boot.img`:

```bash
fastboot flash boot magisk_patched-EXAMPLE.img
```

If you patched the verified `init_boot.img`:

```bash
fastboot flash init_boot magisk_patched-EXAMPLE.img
```

For `vendor_boot` or recovery, follow the [Magisk guide](./magisk-guide.md#step-3-flash-patched-image) and the exact-device instructions instead. A recovery-based installation requires its recovery boot sequence to enable Magisk. For the `boot` or `init_boot` examples above, reboot with `fastboot reboot` and complete any Magisk setup prompt.

**Step 5: Verify root**

Confirm the Magisk card reports an installed version. Grant a trusted app access in **Superuser** before testing; for `adb shell su -c id`, first grant **ADB shell** and revoke that grant afterward if not needed.

---

### Method 2: TWRP Recovery (Older Devices)

Magisk's [custom-recovery installation](https://topjohnwu.github.io/Magisk/install.html#custom-recovery) is deprecated and requires a boot ramdisk. It cannot install or upgrade Magisk when Magisk itself must be installed in recovery. Confirm that the [TWRP build](https://twrp.me/Devices/OnePlus/) and its installation method support the exact model and firmware; a recovery may not decrypt `/data`.

For a supported legacy device, upstream describes renaming the official Magisk APK to `.zip`, installing it in recovery and completing the app's direct reinstallation. Do not assume `fastboot boot twrp.img` or a separate recovery partition works across OnePlus models.

---

## Post-Root Setup

### Configure Magisk

Grant only trusted apps access in the **Superuser** tab. Enable Zygisk only when a trusted module needs it. DenyList can revert Magisk modifications in selected processes but does not guarantee app compatibility; the old **Hide the Magisk app** rename option is no longer available in current Magisk releases. See the [Magisk guide](./magisk-guide.md#post-installation-setup) and [Play Integrity guidance](../troubleshooting.md#play-integrity-and-banking-apps).

### OxygenOS/ColorOS Optimization

**Battery Optimization:**
1. Settings > Battery > Battery optimization
2. Find Magisk and root apps
3. Set to "Don't optimize"

**Autostart Permission:**
1. Settings > Apps > Manage apps
2. Magisk and root apps
3. Enable "Autostart"

**Background Restrictions:**
1. Settings > Apps > Manage apps
2. Magisk and root apps
3. Disable "Restrict background activity"

---

## OTA Handling

### For supported A/B devices {#for-a-b-devices-all-modern-oneplus}

[Magisk's A/B OTA instructions](https://topjohnwu.github.io/Magisk/ota.html) were tested on Pixel; OnePlus procedures vary. Use the following only when the exact device and update method support it:

1. If stock images are required, choose **Uninstall > Restore Images** in Magisk before applying the OTA. Do not reboot. If the necessary backup is unavailable, stop and use a verified exact-device update or recovery method.
2. Apply the OTA and wait for installation to finish. **Do not restart yet.** Modified read-only partitions may cause verification to fail.
3. In Magisk choose **Install > Install to Inactive Slot (After OTA)** and wait for completion.
4. Return to the system update screen and select **Restart now**. Verify root after boot.

If the option is unavailable or the update fails, follow the device-specific stock update instructions, then patch an image from the new build if desired. Root preservation is not guaranteed.

---

## Troubleshooting

<details><summary>Click to expand troubleshooting tips</summary>

### Bootloader Issues

**"OEM Unlocking" Greyed Out**

Check the exact model and carrier eligibility. Some carrier variants require a token or other authorization. A factory reset or waiting period is not a guaranteed fix; contact OnePlus or the carrier if eligibility is unclear.

**Fastboot Not Detecting**

Solutions:
- Update Platform Tools
- Try USB 2.0 port
- Different USB cable
- Reinstall drivers (Windows)
- Try different computer

### Installation Issues

**Magisk Shows "N/A"**

Verify the exact firmware, selected image, partition and slot against the device-specific instructions. If Magisk was installed in recovery, use its required boot sequence. Do not choose a different image solely from Android version or reflash blindly.

**Device Bootloop**

If only the Magisk image was changed, restore the matching stock image to every affected partition and slot using the exact-device recovery procedure. Restoring `boot` alone does not fix a mistaken write to `init_boot` or another partition. For wider changes or uncertain slot contents, use a verified full-firmware recovery method or contact [OnePlus Support](https://www.oneplus.com/support). It may wipe data. Do not change slots or downgrade blindly.

### Root Access Issues

**Apps Not Getting Root**

Check that Magisk reports installed, then explicitly grant the trusted app in **Superuser** before it requests `su`. If testing with ADB, grant **ADB shell** first. Revoke access when it is no longer needed. Check the install log and exact-device instructions before reinstalling.

**Play Integrity Fails**

Follow the module stack and configuration order in
[Play Integrity and Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps).

---

</details>

## Unroot and Restore

### Remove Root Only

If Android boots and the necessary stock backups exist, use **Uninstall > Complete Uninstall** in Magisk. **Restore Images** is an OTA preparation step, not a complete uninstall. Other modifications or affected slots may still need stock recovery; the bootloader remains unlocked.

### Flash Stock Firmware

Use [OnePlus Support](https://www.oneplus.com/support) or a trusted guide for the exact model, region and firmware to obtain a compatible complete recovery package and procedure. Back up first; a full restore may wipe data. Do not assume a generic `flash-all` script or MSM/EDL tool exists, works without authorization, or is safe for every OnePlus model. If the supported recovery method is unclear, contact OnePlus instead of guessing.

### Relock Bootloader (Optional)

::: danger RELOCK WARNING
Relocking a modified or incompatible device can make it unbootable and may erase data. Only consider it after restoring compatible stock firmware and verified-boot state for all required partitions and slots, successfully booting, and confirming a manufacturer or exact-model procedure. There is no safe universal OnePlus lock command.
:::

---

## Best Practices

### Security

1. **Grant root only to trusted apps**
2. **Use DenyList where appropriate**, without assuming it bypasses app checks
3. **Only install trusted modules**
4. **Keep Magisk updated**
5. **Back up stock images**
6. **Use strong device security** (PIN, password, biometrics)

---

## Community Resources

**Official OnePlus:**
- [OnePlus Forums](https://forums.oneplus.com/) - Official community
- [OnePlus Support](https://www.oneplus.com/support) - Official support

**Firmware Downloads:**
- [Oxygen Updater](https://github.com/oxygen-updater/os-updater/releases/latest) - Third-party firmware update downloader
- [Oxygen Updater GitHub](https://github.com/oxygen-updater/oxygen-updater) - Alternative download

**Developer Community:**
- [XDA OnePlus Forums](https://xdaforums.com/c/oneplus.11993/) - Device discussions
- [Reddit r/OnePlus](https://www.reddit.com/r/oneplus/) - Community help

### Getting Help

**When asking for help, provide:**
- Exact OnePlus model
- OxygenOS/ColorOS version
- Android version
- Which image patched
- Exact error messages
- Steps attempted

---

## Next Steps

- **Root setup:** **[Post-root configuration](./index.md#step-4-post-root-configuration)**
- **Tools:** **[Apps and modules](../apps-and-modules/)**
- **Common tasks:** **[Debloating](../general-guides/android-apps-debloating.md)** · **[Ad blocking](../general-guides/android-adblocking.md)**
- **Optional extensions:** **[LSPosed](./lsposed-guide.md)** · **[Custom ROM installation](./custom-rom-installation.md)**
