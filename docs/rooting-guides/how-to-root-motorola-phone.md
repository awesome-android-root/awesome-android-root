---
layout: doc
title: Complete Motorola Rooting Guide
description: "Root eligible Motorola phones with model-specific bootloader checks, firmware selection, Magisk installation and recovery guidance."
head:
  - - meta
    - property: og:title
      content: "Complete Motorola Rooting Guide"
  - - meta
    - property: og:description
      content: "Root eligible Motorola phones with model-specific bootloader checks, firmware selection, Magisk installation and recovery guidance."
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/motorola.png
  - - meta
    - name: twitter:title
      content: "Complete Motorola Rooting Guide"
  - - meta
    - name: twitter:description
      content: "Root eligible Motorola phones with model-specific bootloader checks, firmware selection, Magisk installation and recovery guidance."
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/motorola.png
  - - meta
    - name: twitter:image:alt
      content: "Complete Motorola Rooting Guide with model-specific requirements"
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
      content: Motorola Root
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

# Motorola Root Guide

::: danger BEFORE FLASHING
Unlocking wipes data. Back up first and verify the exact model, region, installed firmware, Magisk image, target partition, slot and recovery method. Do not disable verified boot or relock a modified device as a generic fix. Motorola's [Software Fix Rescue](https://en-us.support.motorola.com/app/answers/detail/a_id/167770/~/how-to-run-a-rescue-software-update) erases personal data on supported devices.
:::

These steps use Magisk. [KernelSU](./kernelsu-guide.md) and [APatch](./apatch-guide.md) have different image and compatibility requirements.

This guide covers eligible Motorola devices using Motorola's bootloader unlock program. Eligibility and procedures vary by model, region and carrier.

## Quick Navigation

- [Device Compatibility](#device-compatibility)
- [Prerequisites](#prerequisites)
- [Get Unlock Code](#get-unlock-code)
- [Unlock Bootloader](#unlock-bootloader)
- [Root Installation](#root-installation)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Universal rooting concepts
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Detailed unlock guide
- [Magisk Guide](./magisk-guide.md) - Complete Magisk documentation
- [Custom ROMs](./custom-rom-installation.md) - Installing custom ROMs
- [Root Apps](../apps-and-modules/) - Best root apps collection

---

## Device Compatibility

Most Motorola devices with unlockable bootloaders can be rooted. Check [XDA Forums](https://forum.xda-developers.com/) for your specific model's status.

### Incompatible / Restricted Devices

::: warning VERIFY ELIGIBILITY
Carrier-exclusive, prepaid and enterprise-managed variants may have unlock restrictions. [Motorola's unlock program](https://en-us.support.motorola.com/app/answers/detail/a_id/87215) lists carrier restrictions; check the exact model and policy instead of assuming every device is eligible or ineligible.
:::

### Image Type Quick Reference

Magisk may need `boot.img`, `init_boot.img`, `vendor_boot.img` or recovery, depending on the exact device and firmware. Android version, the existence of `init_boot`, or Magisk's Ramdisk field alone does not determine the target. See [Magisk's upstream instructions](https://topjohnwu.github.io/Magisk/install.html#getting-started) and confirm the model-specific partition and slot.

## Prerequisites

### Critical Requirements

::: danger ⚠️ BEFORE YOU START

**Warranty:** Motorola's [unlock terms](https://en-us.support.motorola.com/ci/fattach/get/741421/1385047216/redirect/1/filename/Boot_revised.pdf) describe warranty consequences, with a Developer Edition exception. Terms and consumer rights can vary by region.

**Unlock Code:** For supported models that require one, request it through Motorola's official program. Eligibility and wait times vary.

**Data Wipe:** Unlocking erases all data including internal storage.

**Carrier Check:** There are certain restrictions such as carrier-exclusive models. To find out if your phone supports bootloader unlock you will need to visit Motorola's page and proceed to follow the process.
:::

### Hardware Requirements

- Motorola device (unlockable model)
- Quality USB cable (try multiple cables if you encounter issues)
- Computer (Windows, macOS, Linux)
- 50%+ battery charge

### Software Requirements

**On Computer:**

1. **Platform Tools**
   - Download: [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools)

2. **Motorola USB Drivers** (Windows)
   - Download: [Motorola USB Drivers](https://en-us.support.motorola.com/app/usb-drivers)

3. **Web Browser**
   - For unlock code request
   - Valid email address (Gmail recommended)

**On Device:**

1. **Magisk APK**
   - Download: [Magisk GitHub Releases](https://github.com/topjohnwu/Magisk/releases)
   - See [Magisk compatibility](./magisk-guide.md#compatibility) and upstream release notes for the current Android requirement

2. **Motorola Account**
   - For unlock code request

### Device Preparation

**Step 1: Enable Developer Options**

1. Settings > About phone
2. Tap "Build number" 7 times
3. Enter PIN/password

**Step 2: Enable Required Settings**

Settings > System > Developer options:
- **OEM unlocking**: Enable
- **USB debugging**: Enable

**Step 3: Verify ADB**

```bash
adb devices
# Should show device
```

---

## Get Unlock Code

Many eligible Motorola devices use an unlock code from Motorola's website. Follow the program's instructions for the exact model and region.

### Step 1: Gather Device Information

**Get Device ID String:**

```bash
# Reboot to fastboot
adb reboot bootloader

# Get device ID (unique string)
fastboot oem get_unlock_data

# Output will be multiple lines
# Copy ALL lines together as one string
# Remove spaces and (bootloader) prefixes
```

**Example output:**
```
(bootloader) 0A40040192024205#4C4D3556313230
(bootloader) 30373731363031303332323239#BD00
(bootloader) 8A672BA4746C2CE02328A2AC0C39F95
(bootloader) 1A3E5#1F53280002000000000000000
(bootloader) 0000000
```

Copy the code part off of each line (exclude the `(bootloader)` part and remove all spaces) and make it a single string:
```
0A40040192024205#4C4D355631323030373731363031303332323239#BD008A672BA4746C2CE02328A2AC0C39F951A3E5#1F532800020000000000000000000000
```

::: tip DATA SCRUB TOOL
Be careful not to remove part of the unlock key when removing the junk, spaces and extra lines. You can paste it into the online Motorola dataScrubTool to clean it up automatically.
:::

### Step 2: Request Unlock Code

1. Visit [Motorola Bootloader Unlock](https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a)

2. Sign in with your Motorola account

3. Unlocking your device and installing your own software might cause the device to stop working, disable important features and functionality.

4. Paste the string on the website and check eligibility. If eligible, follow the portal's instructions to request the unlock key.

5. **Check email:** If the key does not arrive, check spam and consult Motorola support. Do not share the key publicly.

### Step 3: Save Unlock Code

- Copy unlock code exactly
- Save to text file
- Keep safe for next steps

---

## Unlock Bootloader

### Step 1: Enter Fastboot Mode

```bash
adb reboot bootloader
```

Or hardware keys:
1. Power off
2. Hold Volume Down + Power
3. Release at fastboot screen

### Step 2: Unlock with Code

```bash
# Verify fastboot connection
fastboot devices

# Unlock using code from email
fastboot oem unlock UNIQUE_KEY_FROM_EMAIL
```

**On Device:**
- Warning screen may appear
- Device automatically wipes
- Bootloader unlocks
- Device reboots

### Step 3: Verify Unlock

After reboot:
```bash
adb reboot bootloader
fastboot getvar unlocked
# Should return: yes
```

On boot you will see a "Bootloader unlocked" warning - this is normal.

---

## Root Installation

### Determine Correct Image

Confirm the image containing the relevant Magisk ramdisk and its destination from a trusted guide for the exact Motorola model and firmware. Depending on the device it may be `boot`, `init_boot`, `vendor_boot` or recovery. A newer Android version or an `init_boot` filename does not establish the right target; see [Magisk upstream](https://topjohnwu.github.io/Magisk/install.html#getting-started).

### Method 1: Boot Image Patching (Standard)

**Step 1: Get stock firmware**

Obtain the original firmware for the exact model, region and **installed build**, and keep a recovery copy. [Motorola Software Fix](https://en-us.support.motorola.com/app/softwarefix) can identify and restore supported phones; its Rescue workflow offers the available update, not necessarily the currently installed build, and **erases data**. A community mirror such as [Lolinet](https://mirrors.lolinet.com/firmware/moto/) is not Motorola support. Verify the source and exact build before using any file. If the matching image is unavailable, stop rather than using launch firmware or another variant.

**Step 2: Patch on the phone**

Transfer the verified image to the phone. Install the official [Magisk APK](https://github.com/topjohnwu/Magisk/releases) and choose **Install > Patch firmware / image > Select from storage**. Patch on the **same device** that will use the image, and note the output filename. Do not use a shared pre-patched image.

**Step 3: Flash the patched image**

Replace the example filename with the actual output. On an A/B device, check the current slot and follow the exact model's instructions for the intended slot. Do not flash both slots or change slots blindly.

```bash
adb pull /sdcard/Download/magisk_patched-EXAMPLE.img .
adb reboot bootloader
fastboot devices
```

On standard A/B devices, unsuffixed `fastboot flash` commands for a slotted partition target the current active slot by default ([AOSP](https://source.android.com/docs/core/ota/ab/ab_implement#kernel-slot-arguments)); `fastboot getvar current-slot` reports the slot selected for the next boot. Use these examples only if that is the intended slot and the image matches its firmware. For a different slot, follow the exact-device procedure instead.

Run **only one** command matching the verified original image and destination:

If you patched the verified `boot.img`:

```bash
fastboot flash boot magisk_patched-EXAMPLE.img
```

If you patched the verified `init_boot.img`:

```bash
fastboot flash init_boot magisk_patched-EXAMPLE.img
```

For `vendor_boot` or recovery, follow the [Magisk guide](./magisk-guide.md#step-3-flash-patched-image) and the exact-device instructions instead. A recovery-based installation requires its recovery boot sequence to enable Magisk. For the `boot` or `init_boot` examples above, reboot with `fastboot reboot` and complete any Magisk setup prompt.

**Step 4: Verify root**

Confirm Magisk reports installed. Grant a trusted app access in **Superuser** before testing; grant **ADB shell** first for `adb shell su -c id`, and revoke that grant afterward if it is no longer needed.

### Method 2: Fastboot Boot + Direct Install (Device-Specific) {#method-2-fastboot-boot-direct-install-edge-50-fusion-and-similar}

Use temporary boot only when a reliable guide confirms it for the exact device and a compatible, bootable `boot.img`. An `init_boot.img` is not a standalone bootable image, and Direct Install makes a persistent write. Temporary boot can still fail and is not a generic fix for a rejected flash.

The Edge 50 Fusion example previously associated with this heading is not evidence of a universal method. Motorola lists a [Qualcomm processor](https://en-au.support.motorola.com/app/answers/detail/a_id/187366/~/specifications---motorola-edge-50-fusion) for that model; chipset alone does not establish temporary-boot support.

---

## Post-Root Setup

### Configure Magisk

Grant root only to trusted apps in **Superuser**. Enable Zygisk only when a trusted module requires it. Enforced DenyList reverts Magisk modifications in selected processes, but does not guarantee banking or payment app compatibility. See the [Magisk guide](./magisk-guide.md#post-installation-setup) and [Play Integrity guidance](../troubleshooting.md#play-integrity-and-banking-apps).

### Motorola Optimization

**Battery:**
1. Settings > Battery
2. Magisk and root apps > Set "Unrestricted"

**Background:**
- Allow background activity for root apps
- Disable battery optimization for Magisk

### Recommended Modules

Install only modules needed for your setup, and verify their device and Android compatibility. See the [app and module catalog](../apps-and-modules/) and [Play Integrity guidance](../troubleshooting.md#play-integrity-and-banking-apps). No module guarantees that a banking or payment app will work.

---

## OTA Handling

### For supported A/B devices {#for-a-b-devices-all-modern-motorola}

[Magisk's A/B OTA workflow](https://topjohnwu.github.io/Magisk/ota.html) was tested on Pixel and procedures can differ on Motorola. Use this order only when the exact device and updater support it:

1. If stock images are required, choose **Uninstall > Restore Images** in Magisk before applying the OTA. Do not reboot. If the needed backup is unavailable, stop and follow a verified exact-device update or recovery procedure.
2. Apply the system OTA and wait for installation to finish. **Do not restart yet.** Modified read-only partitions may cause verification to fail.
3. Choose **Install > Install to Inactive Slot (After OTA)** in Magisk and wait for completion.
4. Return to the system update screen and choose **Restart now**. Verify root after boot.

If the option is unavailable or the OTA fails, follow the exact-device stock update or recovery instructions, then patch an image from the new installed build if desired. Root retention is not guaranteed. Motorola's Software Fix Rescue is an option for supported devices but **wipes personal data**; see [Motorola's instructions](https://en-us.support.motorola.com/app/answers/detail/a_id/167770/~/how-to-run-a-rescue-software-update).

---

## Troubleshooting

<details><summary>Click to expand troubleshooting</summary><br>

### Unlock Code Issues

**Code Not Received**

Solutions:
- Check spam folder
- Wait up to 24 hours
- Re-submit request
- Try to use Gmail as your account email for Motorola
- Contact Motorola support

**Code Doesn't Work**

Solutions:
- Verify copied correctly - no extra spaces
- Be careful not to remove part of the unlock key when removing the junk, spaces and extra lines

### Bootloader Issues

**OEM Unlocking Greyed Out**

Carrier restrictions, enterprise policy or other eligibility limits may apply. Verify the exact device with Motorola; the presence of a security feature alone does not establish unlock eligibility.

**Device Shows "Not Eligible" on Motorola Website**

- Verify the device ID was copied correctly and consult [Motorola's eligibility information](https://en-us.support.motorola.com/app/answers/detail/a_id/87215).
- Contact Motorola if eligibility is unclear. Do not assume an ineligible response is false or try to bypass it with a flash command.

### "Preflash Validation Failed"

Stop and record the full fastboot error. Check the exact model, firmware version, anti-rollback restrictions, bootloader status and the device-specific procedure. A preflash error does not by itself establish that dm-verity must be disabled. Do not switch to fastbootd, flash `vbmeta` with verification disabled, or try temporary boot as automatic fixes. Consult Motorola or a trusted guide for the exact device.

### Installation Issues

**Magisk Not Working After Flash**

Verify that the firmware, selected image, partition and slot match the device. If Magisk was installed in recovery, follow its required boot sequence. Check the Magisk log and device-specific instructions before attempting another flash.

**Bootloop**

If only the Magisk image was changed, restore the matching stock image to every affected partition and slot using the exact-device recovery procedure. Restoring `boot` alone does not fix a mistaken write to `init_boot` or another partition. For wider changes or uncertain firmware and slot contents, use a supported full-firmware recovery method or contact Motorola. [Software Fix Rescue](https://en-us.support.motorola.com/app/answers/detail/a_id/167770/~/how-to-run-a-rescue-software-update) wipes personal data.

</details>

---

## Unroot and Restore

### Remove Root

If Android boots and the required backups exist, use **Uninstall > Complete Uninstall** in Magisk. **Restore Images** is an OTA preparation step, not a complete uninstall. Other modifications or affected slots may still need stock recovery; the bootloader remains unlocked.

### Flash Stock

For supported phones, [Motorola Software Fix Rescue](https://en-us.support.motorola.com/app/answers/detail/a_id/167770/~/how-to-run-a-rescue-software-update) matches firmware to the phone and performs a full software update. It **erases personal data**, and the previously associated Google account may be required during setup. Otherwise, use a verified full-firmware procedure for the exact model, region and compatible build, or contact Motorola support. Do not assume flashing one boot-related image restores the whole device.

### Relock Bootloader

::: danger RELOCK WARNING
Relocking a modified or incompatible device can leave it unbootable and may erase data. Only consider it after restoring compatible stock firmware and verified-boot state for every required partition and slot, successfully booting, and verifying Motorola's exact-model procedure. Warranty or service restrictions may remain after relocking.
:::

---

## Custom ROMs

### Popular ROMs

**LineageOS:**
- Official for many Moto G and Edge devices
- Stable and well-maintained

**Pixel Experience:**
- Pixel-like interface
- Good performance

**crDroid:**
- Feature-rich
- Active development

**Evolution X:**
- Customizable
- Growing support

---

## Best Practices

### Security

1. **Configure DenyList** for sensitive apps
2. **Trusted modules only** - verify sources
3. **Keep Magisk updated** - check upstream release notes for device and Android compatibility
4. **Back up boot images** before every update

---

## Community Resources

**Official Motorola:**
- [Bootloader Unlock](https://en-us.support.motorola.com/app/standalone/bootloader/unlock-your-device-a) - Official unlock portal
- [Supported Devices Info](https://en-us.support.motorola.com/app/answers/detail/a_id/87215) - Official eligibility info
- [Motorola USB Drivers](https://en-us.support.motorola.com/app/usb-drivers) - Official drivers
- [Motorola Rescue & Smart Assistant](https://en-us.support.motorola.com/app/softwarefix) - Stock firmware tool

**Developer Community:**
- [XDA Motorola Forums](https://xdaforums.com/c/motorola.11990/) - Development & guides
- [XDA Bootloader Unlock Guide](https://xdaforums.com/t/guide-un-locking-motorola-bootloader.4079111/) - Comprehensive unlock reference
- [Reddit r/MotoG](https://www.reddit.com/r/MotoG/) - Moto G community
- [Reddit r/Motorola](https://www.reddit.com/r/Motorola/) - General Motorola

**Awesome Android Root help resources:**
- [FAQs](../faqs)
- [Troubleshooting Guide](../troubleshooting)

### Getting Help

**Provide:**
- Exact Motorola model and codename
- Android version and build number
- Unlock code status
- Exact error messages (especially fastboot output)
- Steps attempted
- Which Magisk version was used to patch

---

## Next Steps

- **Root setup:** **[Post-root configuration](./index.md#step-4-post-root-configuration)**
- **Tools:** **[Apps and modules](../apps-and-modules/)**
- **Common tasks:** **[Debloating](../general-guides/android-apps-debloating.md)** · **[Ad blocking](../general-guides/android-adblocking.md)**
- **Optional extensions:** **[LSPosed](./lsposed-guide.md)** · **[Custom ROM installation](./custom-rom-installation.md)**
