---
layout: doc
title: "How to Root Samsung: Odin & Magisk"
description: "Learn how to root a Samsung Galaxy with model- and region-specific bootloader checks, Download Mode, Odin AP patching, Magisk, Knox and One UI warnings."
head:
  - - meta
    - property: og:title
      content: "How to Root Samsung: Odin & Magisk"
  - - meta
    - property: og:description
      content: Samsung Galaxy rooting guide covering bootloader eligibility, OEM unlocking, Download Mode, Odin AP patching, Magisk, Knox and One UI differences.
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/samsung.png
  - - meta
    - name: twitter:title
      content: "How to Root Samsung: Odin & Magisk"
  - - meta
    - name: twitter:description
      content: Rooting steps for eligible Samsung Galaxy models, with Odin AP patching, Magisk and model-specific restrictions.
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/samsung.png
  - - meta
    - name: twitter:image:alt
      content: Samsung Galaxy rooting guide with Odin, AP patching and Magisk
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
      content: Samsung Galaxy Root
  - - meta
    - property: article:tag
      content: One UI
  - - meta
    - property: article:tag
      content: Knox Security
  - - meta
    - property: article:tag
      content: Magisk Installation
  - - meta
    - name: robots
      content: index, follow
---

# How to Root a Samsung Galaxy: Odin, AP & Magisk

::: danger SAMSUNG SAFETY
Follow the [upstream Samsung instructions](https://topjohnwu.github.io/Magisk/install.html#samsung-devices) for the exact model, region and firmware. Unlocking wipes data; the first Magisk installation requires another full wipe and irreversibly trips Knox. Samsung uses Download Mode and a patched AP firmware tar, not the generic fastboot method.

Do not restore individual stock boot-chain partitions as a generic fix: upstream warns this can brick Samsung devices. Use full-firmware recovery instead.
:::

There is no single Samsung rooting procedure. Bootloader availability, chipset, CSC/region, Android version and One UI release determine whether a Galaxy device can be rooted. This guide explains the checks first, then covers Download Mode, Odin AP-file patching and Magisk for models that are actually eligible.

## Quick Navigation

- [Samsung-specific risks](#samsung-rooting-challenges)
- [Model and region compatibility](#device-compatibility)
- [Prerequisites](#prerequisites)
- [Bootloader Unlock](#unlock-bootloader)
- [Root Installation](#root-installation)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Universal rooting concepts
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Model and region checks
- [Magisk Guide](./magisk-guide.md) - Complete Magisk documentation
- [Samsung troubleshooting](#troubleshooting) - Odin, Download Mode and root failures

---
## Samsung Rooting Challenges

::: warning BOOTLOADER ELIGIBILITY CHANGES BY MODEL
Samsung does not offer one unlock policy for every Galaxy device. Some international models expose OEM unlocking, while many carrier-branded US/Canadian variants do not. Newer Galaxy generations and One UI releases can change what is available, so verify the exact model number, CSC/region and firmware before updating or attempting to root.

Do not treat a guide for one Galaxy model as proof that another model or region is unlockable.
:::


::: danger ⚠️ Samsung-Specific Risks
- **Knox permanently tripped (0x1)** – **Cannot be reversed**, affects Knox-dependent services such as Samsung Pay and Secure Folder
- **Warranty impact** – A tripped Knox bit is permanent; service and warranty terms depend on region and circumstances
- **Carrier restrictions** – US carrier models (Verizon, AT&T) often **cannot unlock bootloader**
- **Banking & financial app detection** – Enhanced root detection via **Play Integrity** and **SafetyNet**
- **OTA updates** – After rooting, Magisk upstream directs Samsung users to update through a manually patched firmware package, not the generic OTA method
:::

::: tip 💡 Want temporary root with a locked bootloader?
On specific vulnerable Galaxy builds, **DirtyFrag** or **GhostLock** may provide temporary root without unlocking. Support depends on the exact firmware; a full reboot ends active root but may leave changed files or settings. Knox fuse and service behavior are not guaranteed. See [Root Without Unlocking the Bootloader](./root-without-unlocking-bootloader.md) for the current limitations.
:::



---

## Device Compatibility

Samsung rooting is complex and model-dependent. International Exynos devices and some international Snapdragon devices are more likely to expose an unlock path, but the model number and region are decisive.

| Device situation | What to verify before doing anything |
| :--- | :--- |
| International or unlocked model | Whether **OEM unlocking** appears and whether the device accepts the Download Mode unlock confirmation. |
| US or Canadian carrier model | Carrier bootloader policy; many variants do not expose an unlock path even when the hardware is similar. |
| New Galaxy generation or current One UI firmware | The exact model, CSC/region and firmware build; do not infer support from an older S or A series guide. |
| Snapdragon versus Exynos variant | The chipset and regional firmware, because rooting instructions and unlock availability can differ. |

### Incompatible / Restricted Devices

::: warning VERIFY, DO NOT ASSUME
Before unlocking, a missing or unavailable OEM Unlocking option is a stop sign, not a problem to work around with a random Odin file. If the exact model and region cannot be verified as unlockable, do not flash a patched AP file. After a successful unlock, upstream expects the option to exist and be greyed out.
:::

::: warning KNOX CONSEQUENCES (Permanent)
- Knox EFUSE physically burned - **cannot be reversed**
- Knox-backed services such as Samsung Pay and Secure Folder can stop working; restoring firmware does not reset the bit
- Warranty and service eligibility may be affected
- Some banking apps may refuse to run even with root hiding
:::

**Before attempting:** Check your model's unlockability on [XDA Forums](https://forum.xda-developers.com/) for your specific variant.

---

## Prerequisites

### Critical Requirements

::: danger BEFORE YOU START
**Knox Will Trip:** Permanently and irreversibly. Think carefully.

**Data Wipe:** Unlocking erases everything. Backup first.

**Warranty:** Unlocking and rooting can affect service and warranty eligibility; check the terms for your region.

**Banking Apps:** May not work even with root hiding.

**US Carrier Models:** Most cannot unlock bootloader at all.
:::

### Hardware Requirements

- Samsung Galaxy variant verified to permit bootloader unlocking
- Computer with USB access (Odin requires Windows; samloader also supports Linux and macOS)
- Quality USB cable (Samsung original recommended)
- 50%+ battery charge

### Software Requirements

**On Computer:**

1. **Samsung USB Drivers**
   - Download: [Samsung Developers](https://developer.samsung.com/android-usb-driver)
   - Install before connecting device

2. **Odin Flash Tool**
  - Download the stock Odin package from the [XDA Odin thread](https://xdaforums.com/t/patched-odin-3-13-1.3762572/); this guide's AP-patching steps do not require patched Odin.
  - The thread warns that packages labeled Odin 3.14.4 are fake. Follow the exact-device instructions for the required version, and do not trust a filename alone.
  - Compare the archive's SHA-256 with a hash from an independently trusted source, if available. Scan the archive with up-to-date security software, but do not treat a clean scan as proof of authenticity.
  - Patched Odin builds modify behavior and can bypass checks; use one only when device-specific instructions explicitly require it. Extract the archive before running Odin.

3. **Stock Firmware**
   - Upstream recommends [samloader](https://github.com/topjohnwu/samloader-rs), which downloads Samsung firmware and can also flash supported devices. Community downloaders include [Bifrost](https://github.com/zacharee/Bifrost) and [Frija](https://github.com/SlackingVeteran/frija/releases).
   - Match the exact model, CSC/region and installed build. Keep the complete firmware package for recovery; do not substitute an incompatible or older build.
   - Typical packages contain AP, BL, CP and CSC files.

**On Device:**

1. **Magisk APK**
   - Download: [Magisk GitHub](https://github.com/topjohnwu/Magisk/releases)
   - Latest stable version

2. **File Manager**
   - Samsung My Files (pre-installed)
   - Or any from Play Store

### Device Preparation

**Step 1: Verify Model and Build**

Settings > About phone:
- Model number (e.g., SM-G998B, SM-S918U)
- Android version
- Build number
- Service provider software version (which may show CSC codes)

**Step 2: Enable Developer Options**

1. Settings > About phone
2. Tap Software information
3. Tap Build number 7 times
4. Enter PIN/password
5. Developer options now available

**Step 3: Enable Required Settings**

Settings > Developer options:
- **OEM unlocking**: Enable (critical)
- **USB debugging**: Enable

**Step 4: Backup Everything**

- Samsung Cloud backup
- Google Photos for images
- SMS backup
- Export contacts
- Save authenticator codes
- Note installed apps

---

## Unlock Bootloader

### Step 1: Verify OEM Unlock Available

Check **Settings > Developer options > OEM unlocking** before attempting to unlock. Availability depends on the model and carrier. A missing or unavailable option is not proof that a factory reset or waiting will fix it. Check the exact variant and [upstream's OEM Lock and KnoxGuard requirements](https://topjohnwu.github.io/Magisk/install.html#requirements) before proceeding.

### Step 2: Enter Download Mode

Use the Download Mode key combination for your exact model. Some devices can also enter it with `adb reboot download` while Android is running and USB debugging is authorized. The key sequence and prompts vary by device.

### Step 3: Unlock Bootloader

Follow [Magisk's Samsung unlock procedure](https://topjohnwu.github.io/Magisk/install.html#unlocking-the-bootloader): enable OEM unlocking, enter Download Mode, and follow the device's unlock confirmation. **Unlocking wipes data.** After the initial setup, connect to the internet, enable Developer options and confirm the OEM unlocking state as upstream describes. If OEM Lock or KnoxGuard does not permit flashing, stop rather than bypassing the restriction.

An FRP or "custom binary blocked" error is not a normal success message. Resolve the exact lock status with Samsung or a trusted model-specific guide before doing anything further.

---

## Root Installation

### Method 1: AP File Patching (Primary Method)

**Step 1: Download matching firmware**

Check the phone's exact model, installed build and CSC/region in its software information. Use [samloader](https://github.com/topjohnwu/samloader-rs) or another trusted firmware source to obtain the matching package. The AP tar contains multiple firmware images; it is not simply a system image. Keep the original `AP`, `BL`, `CP` and `CSC` files. If a matching build is unavailable, stop rather than patching another build.

**Step 2: Patch AP on the phone**

1. Copy the original `AP_...tar.md5` to the phone and install the official [Magisk APK](https://github.com/topjohnwu/Magisk/releases).
2. In Magisk, select **Install > Patch firmware / image > Select from storage**, then choose the AP tar. If the device has no boot ramdisk, select **Recovery Mode** as described in the [upstream guide](https://topjohnwu.github.io/Magisk/install.html#samsung-devices).
3. Copy the resulting patched tar back with ADB, not MTP, which upstream warns can corrupt large files. Replace the example with the actual filename:

   ```bash
   adb pull /sdcard/Download/magisk_patched-EXAMPLE.tar .
   ```

Patch on the same Samsung device where the firmware will be installed. Do not use a patched file from another device.

**Step 3: Flash the complete set**

Enter Download Mode and follow the [upstream Samsung procedure](https://topjohnwu.github.io/Magisk/install.html#samsung-devices) using samloader, or verified Odin instructions for the exact model. Use the matching original `BL` and `CP`, the **patched `AP`**, and the original **`CSC`**, not `HOME_CSC`, for the first installation. Do not enable repartitioning or flash individual stock boot-chain images as a shortcut.

**Step 4: Mandatory factory reset**

The first Magisk installation requires a full data wipe **in addition to the unlock wipe**, regardless of One UI version. Upstream's first-install procedure uses `CSC` and says to agree to a factory reset if prompted. If manual recovery or specific Odin reboot settings are required for your model, follow its instructions rather than assuming a universal key sequence.

**Step 5: Complete setup and verify**

If Magisk is installed in recovery, use the device-specific [Magisk in Recovery](https://topjohnwu.github.io/Magisk/install.html#magisk-in-recovery) boot sequence to enable it. After Android boots, install/open the app and complete additional setup if prompted. Grant a trusted test app access in Magisk's **Superuser** tab before testing; grant **ADB shell** first if testing with `adb shell su -c id`.

---

### Step 6: Verify Knox Trip

Samsung's [Knox FAQ](https://docs.samsungknox.com/admin/knox-platform-for-enterprise/faq/) describes how to check the warranty bit for different models. A tripped bit is permanent; installing stock firmware does not reset it.

### Method 2: TWRP Recovery (Legacy Devices)

Magisk's [custom recovery method](https://topjohnwu.github.io/Magisk/install.html#custom-recovery) is deprecated and only works when the device has a boot ramdisk. It cannot install or upgrade Magisk when Magisk itself must be installed in recovery. Use it only if a recovery maintainer confirms support for the exact model and build; recovery availability and data decryption vary. Upstream describes renaming the official APK to `.zip`, flashing it and completing the app's direct reinstallation. Otherwise use AP patching above.

---

## Post-Root Setup

### Configure Magisk

- Grant root to trusted apps in Magisk's **Superuser** tab before they request `su`.
- Enable Zygisk only if a trusted module requires it. DenyList reverts Magisk modifications in selected processes when enforced; it is not a guarantee of app compatibility.
- Current Magisk releases no longer offer the old **Hide the Magisk app** rename option. Review the [Magisk setup guide](./magisk-guide.md#post-installation-setup).

### Samsung-Specific Root Hiding

A tripped Knox bit cannot be reset by hiding Magisk or installing a module. Samsung services that rely on Knox can stop working, and banking apps may still refuse access. See [Samsung's Knox FAQ](https://docs.samsungknox.com/admin/knox-platform-for-enterprise/faq/) and the general [Play Integrity guidance](../troubleshooting.md#play-integrity-and-banking-apps).

---

## OTA Handling

Magisk upstream says rooted Samsung devices need manual firmware upgrades rather than OTA updates.

### Samsung updates with Magisk {#unroot-for-ota}

Magisk's [Samsung instructions](https://topjohnwu.github.io/Magisk/install.html#upgrading-the-os) say to update manually after rooting, rather than using the generic A/B OTA workflow:

1. Back up data and obtain the new firmware package for the exact model and CSC/region. Check its compatibility and anti-rollback restrictions.
2. Patch the new package's `AP` tar in Magisk on the same phone and transfer the patched tar to the PC using ADB.
3. Flash the patched `AP` with the matching original `BL` and `CP`. For an **upgrade**, upstream specifies **`HOME_CSC` instead of `CSC`**. Back up first even when using `HOME_CSC`; data preservation is not guaranteed.
4. Follow the model-specific boot/recovery sequence and complete any Magisk setup. Verify root after boot.

### Alternative: Manual Firmware Flash

To return to unrooted stock instead of keeping Magisk, use the full-firmware recovery procedure in [Unroot and Restore](#unroot-and-restore). **Restore Images** is not a complete uninstall and should not be treated as a generic Samsung OTA workaround. Do not downgrade or flash a different regional build without a verified model-specific recovery plan.

---

## Troubleshooting

### Bootloader Issues

**OEM Unlocking Greyed Out**

Before unlocking, verify the model, carrier policy and [OEM Lock / KnoxGuard status](https://topjohnwu.github.io/Magisk/install.html#requirements). After a successful unlock, upstream expects OEM unlocking to exist and be greyed out. Do not assume a reset or waiting period unlocks a restricted device.

**Stuck in Download Mode**

Use the exit or restart key sequence for your exact model. If a flash is in progress, do not disconnect the device. If a flash failed, retain the log and consult model-specific recovery instructions.

### Odin Issues

**Odin Doesn't Detect Device**

Solutions:
1. Reinstall Samsung USB drivers
2. Try different USB port (USB 2.0)
3. Run Odin as Administrator
4. Try different USB cable
5. Reboot computer

**FAIL! Error in Odin**

Common causes:
- Wrong firmware for model
- Corrupted download
- Re-Partition checked (uncheck it)
- Low battery
- Cable disconnected

Solutions:
1. Verify firmware matches model exactly
2. Re-download firmware
3. Uncheck Re-Partition
4. Charge device
5. Use better cable

**Stuck at Samsung Logo**

Stop and check the firmware, unlock and KnoxGuard state. If necessary, follow a verified **full-firmware** recovery procedure for the exact model and CSC; it may wipe data. Do not blindly flash individual stock `boot`, `init_boot`, `recovery` or `vbmeta` images, or wipe cache/metadata as a generic module fix.

### Root Issues

**Magisk Shows N/A**

Verify the firmware and patched AP match the device. If Magisk was installed in recovery, use the required [recovery boot sequence](https://topjohnwu.github.io/Magisk/install.html#magisk-in-recovery). Check the Magisk installation log and the model-specific procedure before attempting another full firmware flash.

**Play Integrity Fails**

Follow the module stack and configuration order in
[Play Integrity and Banking Apps](../troubleshooting.md#play-integrity-and-banking-apps).

Note: Due to Knox trip, some apps may always fail.

**Samsung Apps Detect Root**

A tripped Knox bit is permanent. [Samsung's Knox FAQ](https://docs.samsungknox.com/admin/knox-platform-for-enterprise/faq/) says Knox-dependent services such as Samsung Pay and Secure Folder stop working when it trips. Flashing stock firmware or changing DenyList settings does not reset that bit.

---

## Unroot and Restore

### Remove Root Only

On Samsung, do not use **Restore Images** as a complete uninstall or restore individual stock boot-chain partitions. Upstream warns that individual partition restores can brick the device. If full stock is required, use the complete firmware recovery path below.

### Flash Stock Firmware

Obtain a complete stock firmware package for the exact model, CSC/region and compatible build. Follow a verified full-firmware restore procedure for that device, or contact Samsung support if the correct procedure is unavailable. A full restore can require a factory reset and erase data. Do not assume a downgrade is allowed, and do not relock while any required partition or slot remains modified.

### Knox Status

::: danger KNOX CANNOT BE RESET
Once Knox trips to 0x1, it is permanent. Flashing stock firmware does NOT reset Knox counter. The efuse is physically blown.
:::

---

## Community Resources

**Samsung Resources:**
- [samloader](https://github.com/topjohnwu/samloader-rs) - Firmware downloader and flashing tool recommended by Magisk upstream
- [SamFrew](https://samfrew.com/) and [Frija](https://github.com/SlackingVeteran/frija) - Community firmware sources
- [Samsung Developers](https://developer.samsung.com/) - Drivers and tools

**Community Forums:**
- **[Samsung XDA Forums](https://xdaforums.com/c/samsung.11975/)** – Device-specific development
- **[Odin stock and patched downloads](https://xdaforums.com/t/patched-odin-3-13-1.3762572/)** – Community thread with package-specific warnings; choose the build required for your device
- **[One UI Mods Community](https://t.me/oneuimods)** – Samsung customization
- **[r/Samsung](https://www.reddit.com/r/samsung/)** – Latest device discussions
- **[Samsung Firmware Database](https://samfrew.com/)** – Firmware downloads

**Essential Samsung Resources:**
- **[Samsung Smart Switch](https://www.samsung.com/us/support/owners/app/smart-switch)** – Backup tool
- **[SamFrew](https://samfrew.com/)** – Firmware downloads
- **[Heimdall](https://glassechidna.com.au/heimdall/)** – Open-source alternative

**Custom ROM Resources:**
- [LineageOS](https://lineageos.org/) - Official builds
- [XDA ROM Development](https://forum.xda-developers.com/) - Custom ROMs


### Getting Help

**When asking for help, provide:**
- Exact model number (SM-XXXXX)
- Region/CSC code
- Current firmware version
- One UI version
- Exact error messages
- Odin log if applicable
- Steps already attempted

---

## Next Steps

- **Root setup:** **[Post-root configuration](./index.md#step-4-post-root-configuration)**
- **Tools:** **[Apps and modules](../apps-and-modules/)**
- **Common tasks:** **[Debloating](../general-guides/android-apps-debloating.md)** · **[Ad blocking](../general-guides/android-adblocking.md)**
- **Optional extensions:** **[LSPosed](./lsposed-guide.md)** · **[Custom ROM installation](./custom-rom-installation.md)**
