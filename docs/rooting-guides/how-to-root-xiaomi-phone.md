---
layout: doc
title: Xiaomi/Redmi/POCO Root Guide
description: "Root eligible Xiaomi, Redmi and POCO devices with model-specific unlock, firmware, Magisk, anti-rollback and recovery guidance."
head:
  - - meta
    - property: og:title
      content: "Xiaomi/Redmi/POCO Root Guide"
  - - meta
    - property: og:description
      content: "Root eligible Xiaomi, Redmi and POCO devices with model-specific unlock, firmware, Magisk, anti-rollback and recovery guidance."
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/xiaomi.png
  - - meta
    - name: twitter:title
      content: "Xiaomi/Redmi/POCO Root Guide"
  - - meta
    - name: twitter:description
      content: "Root eligible Xiaomi, Redmi and POCO devices with model-specific unlock, firmware, Magisk, anti-rollback and recovery guidance."
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/xiaomi.png
  - - meta
    - name: twitter:image:alt
      content: "Xiaomi/Redmi/POCO Root Guide with model-specific requirements"
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
      content: Xiaomi Root
  - - meta
    - property: article:tag
      content: MIUI
  - - meta
    - property: article:tag
      content: HyperOS
  - - meta
    - property: article:tag
      content: Mi Unlock Tool
  - - meta
    - name: robots
      content: index, follow
---

# Complete Xiaomi Rooting Guide

::: danger BEFORE FLASHING
Unlocking wipes data. Back up first, obtain the exact model/region/build firmware and verify its anti-rollback restrictions. Identify the Magisk image, target partition, slot and recovery method from device-specific instructions; do not choose them from Android version alone. Never relock a modified device or use a relocking flash option as a recovery shortcut.
:::

These steps use Magisk. [KernelSU](./kernelsu-guide.md) and [APatch](./apatch-guide.md) have different requirements.

This page focuses on Xiaomi/Redmi/POCO specifics (Mi Unlock, ARB, HyperOS, payload extraction). For universal prep and Magisk steps, see: [Main Rooting Guide](./index.md), [Bootloader Unlocking](./how-to-unlock-bootloader.md), and [Magisk Guide](./magisk-guide.md).

## 🔗 Essential Resources
- [📖 Main Rooting Guide](./index.md) - Universal rooting principles and safety
- [🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md) - General bootloader concepts
- [🛠️ Custom Recovery](./how-to-install-custom-recovery.md) - TWRP installation guide
- [❓ FAQ & Troubleshooting](../faqs.md) - Solutions for common issues

## Xiaomi Rooting Complexity

Xiaomi is among the strictest OEMs for unlocking/root.

- Mi Account required and waiting period enforced
- Verification steps change by region/firmware and over time
- HyperOS tightened unlock rules (especially CN models)
- MIUI/HyperOS employ strong AVB 2.0, dynamic partitions, and anti-rollback
- Play Integrity replaces SafetyNet; root-hiding needs extra steps

## Critical Warnings

::: danger ⚠️ Xiaomi-Specific Risks
- Mi Account/device restrictions are possible (account/device can be flagged)
- Warranty may be void in many regions after unlocking
- Xiaomi Wallet/Mi Pay and some regional services may be disabled
- OTA and system updates get trickier when rooted (though not impossible)
- Anti-rollback (ARB) protection: flashing images from lower ARB-index builds can brick
- Widevine may drop from L1 to L3 on some models after unlocking (affects HD streaming)
:::

## Device Compatibility

Most Xiaomi/Redmi/POCO devices with unlockable bootloaders can be rooted. Check [XDA Forums](https://forum.xda-developers.com/) for your specific model's status.

### Incompatible / Restricted Devices

- **CN (China) variants:** Strictest rules; many models are not unlockable via official means
- **Carrier/Enterprise/Education SKUs:** Often locked down or not supported
- **India variants:** Extra verification checks; sometimes longer waiting timers
- **Newer HyperOS devices:** May require additional eligibility checks beyond the standard waiting period

## Prerequisites & Setup

### Mi Account Preparation
1. [Create](https://global.account.xiaomi.com/fe/service/register?_locale=en&_uRegion=ZA)/prepare a dedicated Mi Account (avoid changing password mid-process).
2. Insert an active SIM (keep it inserted until unlocked).
3. Bind Mi Account on the phone and wait for the timer.
4. Verify your phone number via SMS, and enable Find Device in Mi Cloud.
5. Keep mobile data available on the phone for binding; Mi Unlock on PC must have internet.

Note on waiting time: Xiaomi’s timer is variable now. Users report 72h, 168h (7 days), and up to 360–720h on some regions/devices. The exact value is server-assigned.

### Required Tools
1. Mi Unlock Tool (Windows-only): https://www.miui.com/unlock/index_en.html
2. Platform Tools (ADB/Fastboot): https://developer.android.com/studio/releases/platform-tools
3. Magisk APK (latest stable): https://github.com/topjohnwu/Magisk/releases
4. Stock Firmware for your exact model/build:
   - Xiaomi Firmware Updater: https://xmfirmwareupdater.com/
   - Official MIUI/HyperOS Downloads: https://c.mi.com/global/miuidownload/index
5. USB Drivers:
   - [Google USB Driver](https://developer.android.com/studio/run/win-usb) or Xiaomi USB drivers; avoid outdated Mi PC Suite (“Mi Assistant”) unless specifically needed.

Optional but recommended:
- Payload extraction tools:
  - payload-dumper-go: https://github.com/ssut/payload-dumper-go
  - payload-dumper-ng: https://github.com/vm03/payload_dumper

### Device Preparation
1. **Enable Developer Options:**
   - Settings → About phone → tap MIUI/HyperOS version 7 times
   - Developer Options: enable USB debugging; enable OEM unlocking (if available)
2. **Bind Mi Account:**
   - Settings → Mi Account: sign in
   - Developer options → Mi Unlock Status → Bind
   - Keep SIM inserted and mobile data available; don’t factory reset while waiting
3. **Back up data:**
   - Mi Cloud/local; copy files to PC as unlocking wipes data
   - Note IMEI/serial; consider EFS/persist backup once unlocked and rooted
4. **Charge to 70%+** and use a high-quality USB cable on a USB 2.0/3.0 port

### Connection Verification
```bash
adb devices
adb reboot bootloader
fastboot devices
fastboot getvar product
fastboot getvar current-slot
```

## Bootloader Unlocking Process

### Step 1: Account Bind + Waiting Period
- Bind Mi Account under Developer options → Mi Unlock Status.
- Wait the server-assigned duration (commonly 72–168h; sometimes longer).
- Keep SIM and the same Mi Account signed in. Avoid resets/logouts/password changes.

### Step 2: Mi Unlock Tool Setup
- Use Windows, run the tool as Administrator.
- Sign in with the same Mi Account bound on device.
- Ensure the PC has stable internet (some users succeed more reliably without VPN/proxy).

### Step 3: Enter Fastboot Mode
- adb reboot bootloader
- Or: power off → hold Volume Down + Power

### Step 4: Unlock with Mi Unlock Tool
1. Connect device in fastboot mode.
2. Click “Unlock” → confirm prompts.
3. If timer not finished, you’ll see the remaining time; otherwise it proceeds.
4. Unlocking wipes the device. After completion, the bootloader is unlocked.

Verify:
```bash
fastboot oem device-info
# Expect: (bootloader) Device unlocked: true
```

::: warning UNOFFICIAL UNLOCK METHODS
Community bypasses are not guaranteed to work and can carry account or device risks. See the [caveats below](#alternative-bypass-methods-community-use-at-your-own-risk); do not assume they override device eligibility.
:::

### Troubleshooting Unlock Issues

Common errors and tips:
- “Couldn’t verify device” / 10008 / 86006 / 86012:
  - Use the same Mi Account on device and PC
  - Toggle mobile data on the phone; turn off Wi‑Fi for the binding step
  - Enable Find Device in Mi Cloud; ensure SIM present and verified number
  - Try different USB port/cable; reinstall drivers; different PC
  - Try at a different time; Xiaomi servers can be flaky
- “Current account is not bound to this device”:
  - Re-bind in Developer options → Mi Unlock Status
  - Stay signed in; don’t switch accounts mid-way
- Region restrictions / Unsupported device:
  - Global/EEA often OK; CN models frequently blocked
  - Check your device forum on XDA/Telegram for model-specific reports
- Waiting time stuck:
  - Re-bind after a few days (not too often), ensure mobile data, and try again

## Root Installation Methods

Magisk patches the image containing the relevant ramdisk, which may be `boot.img`, `init_boot.img`, `vendor_boot.img`, or recovery depending on the device. A filename in a ROM, Android version, `fastboot getvar` output or Magisk's Ramdisk field alone does not establish the correct target. [Magisk upstream](https://topjohnwu.github.io/Magisk/install.html#getting-started) notes exceptions on some Xiaomi devices. Confirm the image and slot for the exact model and build before proceeding.

### Method A: Patch-and-Flash (Recommended)

#### Step 1: Get the correct image(s)

1. Download stock firmware matching the exact model, region and installed build. A Fastboot ROM may include images directly; some recovery or OTA packages contain `payload.bin`.
2. For a supported full payload, [payload-dumper-go](https://github.com/ssut/payload-dumper-go#usage) can extract images. An incremental OTA may require its exact base images and the extractor's `-old` option; it is not interchangeable with a full package.
3. Verify the image, partition and intended slot in a trusted guide for the exact device and firmware. Keep an independent copy of the unpatched image and full firmware. Check anti-rollback restrictions; do not downgrade just because a flash package exists.

#### Step 2: Patch with Magisk (see [Magisk Guide](./magisk-guide.md#method-1-boot-image-patching-recommended))

1. Transfer the verified image to the phone. For example, if it is `boot.img`:

   ```bash
   adb push boot.img /sdcard/Download/
   ```

2. On that **same device**, open the official Magisk app and choose **Install > Patch firmware / image > Select from storage**. Select the verified image and note the output filename. Never flash a pre-patched image from another device.
3. Pull the output, replacing the example with its actual name:

   ```bash
   adb pull /sdcard/Download/magisk_patched-EXAMPLE.img .
   ```

#### Step 3: Flash the verified image {#step-3-safer-first-boot-then-permanent-install}

Reboot to the bootloader with `adb reboot bootloader`. On an A/B device, check the active slot with `fastboot getvar current-slot` and follow the verified device instructions for the intended slot. Do not assume both slots contain the same firmware or flash both blindly.

On standard A/B devices, unsuffixed `fastboot flash` commands for a slotted partition target the current active slot by default ([AOSP](https://source.android.com/docs/core/ota/ab/ab_implement#kernel-slot-arguments)); `fastboot getvar current-slot` reports the slot selected for the next boot. Use these examples only if that is the intended slot and the image matches its firmware. For a different slot, follow the exact-device procedure instead.

Run **only one** command matching the verified image and partition, replacing the example filename:

If you patched the verified `boot.img`:

```bash
fastboot flash boot magisk_patched-EXAMPLE.img
```

If you patched the verified `init_boot.img`:

```bash
fastboot flash init_boot magisk_patched-EXAMPLE.img
```

For `vendor_boot` or recovery, follow the [Magisk guide](./magisk-guide.md#step-3-flash-patched-image) and the exact-device instructions instead. A recovery-based installation requires its recovery boot sequence to enable Magisk. For the `boot` or `init_boot` examples above, reboot with `fastboot reboot` and complete any Magisk setup prompt.

A temporary `fastboot boot` followed by Direct Install is an option **only** when the exact device supports it and the image is a compatible bootable `boot.img`. It is not a universal safety test; `init_boot.img` is not a standalone bootable image. Direct Install writes to the device. Keep Magisk's verified-boot and encryption defaults unless a reliable device-specific procedure explains otherwise.

### Method B: Custom Recovery + Magisk

#### Step 1: Use a compatible recovery {#step-1-boot-a-recovery-image-don-t-flash-yet}

Recovery layouts and installation methods differ. Use a recovery maintainer's instructions for the exact model, firmware and slot; do not assume `fastboot boot recovery.img` or a dedicated recovery partition is supported. Recovery may be unable to decrypt `/data`, so maintain an independent backup.

#### Step 2: Install Magisk from recovery

Magisk's [recovery installation](https://topjohnwu.github.io/Magisk/install.html#custom-recovery) is deprecated and requires a boot ramdisk. It cannot install or update Magisk when Magisk itself must be installed in recovery. If the exact recovery supports the method, upstream describes renaming the official APK to `.zip`, flashing it, then completing the app's direct reinstallation. Otherwise use the verified image-patching method.

### Current Bootloader Restrictions
- Newer HyperOS devices (late-2023/2024+) can require additional “eligibility” checks. CN models are the most restricted.
- Waiting times vary; some users see 72h, others 168h, and some much longer.
- Community “bypass” scripts/apps may work temporarily and may be patched by Xiaomi later. Use at your own risk.

## Xiaomi-Specific Optimizations

### MIUI/HyperOS Debloating (Caution)
- Prefer disabling via ADB/app ops instead of uninstalling system apps:
  - Use adb shell pm disable-user --user 0 PACKAGE
- Commonly disabled (verify on your build): Mi Browser, Mi Video, Mi Music, Feedback, Analytics, Scanner (if unused), Mi Roaming, Mi Mover, Facebook stubs, Partner apps.
- **Don’t touch core packages:**
  - com.android.systemui
  - com.miui.home
  - com.miui.system
  - com.miui.securitycenter
  - Anything containing “telephony”, “ims”, “provision”, “overlay”, “updater” unless you know the impact.

## Troubleshooting Guide

### Mi Unlock Tool Issues

Check device state:
```bash
fastboot oem device-info
```

Common errors:
- “Device is locked” (unexpected):
  - Ensure final “Unlock” pass was completed (after waiting time).
  - Retry Mi Unlock; switch cable/USB port.
- “Couldn’t verify device” / error codes 10008/86006/86012:
  - Same Mi Account on device and PC; mobile data ON during binding
  - Enable Find Device; verify phone number in Mi Account
  - Different PC/time/network; some report success with VPN to SG/HK/DE
- “Current account is not bound to this device”:
  - Rebind in Developer options → Mi Unlock Status; remain signed in
- Driver/link issues:
  - Reinstall Google USB driver or Xiaomi driver
  - In Device Manager, ensure “Android Bootloader Interface” appears in fastboot

ADB issues:
```bash
adb kill-server
adb start-server
adb devices
```

### MIUI/HyperOS Specific Issues

**Bootloop or accidental system app removal:**
- Check exactly which partitions and slots were modified. Restore the correct stock image to every affected partition and slot using the model-specific procedure; restoring `boot` alone will not repair a different partition or an uninstalled system app.
- For broader changes, use a verified full-firmware recovery method for the exact model, region, build and anti-rollback state. A community [Xiaomi flashing guide](https://new.c.mi.com/global/post/110686) describes Mi Flash's **clean all** option for supported models, which wipes data. Do not select **clean all and lock** as a generic recovery step. Contact Xiaomi support if the correct package or method is unclear.
- To remove Magisk on a booting device, **Uninstall > Complete Uninstall** is distinct from **Restore Images**. Full stock restoration may still be necessary for other modifications.

**Battery/killing apps:**
- Disable MIUI battery optimization for root-dependent apps
- Allow autostart; set background activity to “No limits”
- Consider modules/apps that tame background killing (varies per build)

**Play Integrity (SafetyNet replacement):**
- A DenyList or module does not guarantee device integrity or app compatibility.
- See [Play Integrity and Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps) for current limitations.

## Success Verification

### Root Access Confirmation
- Open Magisk → should show “Installed” with current version
- Grant **ADB shell** in Magisk's Superuser tab first; then `adb shell su -c id` should report `uid=0(root)`. Revoke the shell grant when no longer needed.
- Optional: install a root checker app

## Staying Updated

### OTA Update Management (HyperOS/MIUI on unlocked and rooted)

OTA availability and root retention vary by model and build. [Magisk's A/B OTA workflow](https://topjohnwu.github.io/Magisk/ota.html) was tested on Pixel, so use it on Xiaomi only if your exact device and update method support it:

1. If the OTA requires stock images, select **Uninstall > Restore Images** in Magisk before applying the update. Do not reboot. If the required backup is unavailable, stop and use a verified exact-device update or recovery procedure.
2. Apply the system OTA and let installation finish. **Do not restart yet.** Modified read-only partitions can cause verification to fail.
3. Select **Install > Install to Inactive Slot (After OTA)** in Magisk and wait for it to finish.
4. Return to the system update screen and choose **Restart now**. Verify root after boot.

If the device is not A/B, the option is unavailable, or the OTA fails, do not assume a dirty flash will fix it. Follow the device-specific stock update or full-firmware recovery instructions, then patch an image from the new installed build if desired. Do not select a flash option that relocks the bootloader.

### Custom ROM Alternatives
- **Xiaomi.eu** LineageOS, EvolutionX, Pixel Experience, AOSP Extended builds
- Read your device’s XDA thread for firmware prerequisites (modem/vendor), dynamic/super partition flash instructions, and AVB/vbmeta notes
- Use fastbootd only when the ROM maintainer's exact-device instructions require it; do not switch modes as a generic fix for a failed flash.

---

::: tip 💡 Xiaomi Root Success Tips
- Be patient with the unlock timer; don’t constantly rebind or reset
- Use mobile data for account binding; keep SIM inserted
- Always patch and flash images that match your exact build and ARB index
- Verify the actual ramdisk image, target partition and slot for the exact firmware
- Use temporary boot and Direct Install only when supported for that device and image
- Keep AVB/verity defaults unless a verified device-specific procedure explains a change and its risks
:::

---

## Advanced Tips & Methods

### Alternative Bypass Methods (Community, use at your own risk)

Bypasses may work temporarily and then stop after Xiaomi patches server-side. They may violate ToS and can risk account/device flags.

#### Method 1: HyperOS-BootLoader-Bypass-V2
- Repo: https://github.com/mrzzoxo/HyperOS-BootLoader-Bypass/releases/tag/V2
- Modified Settings APK (community): https://t.me/RedmiNote134G/72
- Steps (summary, as reported by users):
  1. Log in to your Mi Account on device
  2. Uninstall Mi Community app
  3. Install the modified Settings.apk (enables MIUI 14-style interface)
  4. Toggle USB Debugging and enable OEM Unlock
  5. Connect to PC; run bypass.cmd
  6. Use mobile data only; bind account in Mi Unlock Status
  7. Use Mi Unlock Tool; follow the timer prompts (commonly 72h/168h)
- Notes:
  - Don’t log out/reset or update firmware during the process
  - Success varies by device/region/firmware; CN devices are the least likely to work

#### Method 2: AQLR Bypass (XDA)
- Thread: https://xdaforums.com/t/how-to-unlock-bootloader-on-xiaomi-hyperos-all-devices-except-cn.4654009/
- Requires Python, per-thread instructions, often paired with modified Settings APK
- CLI-driven; suited to advanced users

### Troubleshooting Specific Devices

For an unsupported or restricted device, check the exact model and region with Xiaomi or a trusted device-specific source. Do not downgrade firmware or use an older unlock tool as a generic workaround; anti-rollback and eligibility restrictions can make that unsafe.

CN ROM devices (⚠️):
- Options are very limited since 2022 policy changes
- Flashing Global ROM to CN hardware can be risky and may not help
- Paid/EDL services exist but are risky and often not recommended

---


## 🔗 Additional Resources

### Official Links
- [Mi Unlock Tool](https://en.miui.com/unlock/download_en.html)
- [Xiaomi Community](https://new.c.mi.com/global/)
- [MIUI Downloads](https://c.mi.com/global/miuidownload/index)
- [Xiaomi Global Support](https://www.mi.com/global/support/)

### Community Resources
- [XDA Xiaomi Forums](https://xdaforums.com/c/xiaomi.12005/)
- [xiaomi.eu](https://xiaomi.eu/)
- [Xiaomi Firmware Updater](https://xiaomifirmwareupdater.com/)
- [r/Xiaomi](https://reddit.com/r/Xiaomi)
- [MIUI Updates Tracker (Telegram)](https://t.me/MIUIUpdatesTracker)

---

## ⚠️ Final Disclaimer

By following this guide, you acknowledge:
- Warranty may be void in your region after unlocking
- Banking/DRM apps may fail without additional Play Integrity mitigation
- Root increases attack surface; only grant su to trusted apps
- You may violate Xiaomi’s ToS; account/device restrictions are possible
- ARB and partition mistakes can brick the device
- Proceed entirely at your own risk; this is for educational purposes only

Need more help? See our [FAQ section](../faqs.md) or the [main rooting guide](./index.md) for deeper troubleshooting and advanced techniques.