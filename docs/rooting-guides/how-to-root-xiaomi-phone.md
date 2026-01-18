---
layout: doc
title: Xiaomi/Redmi/POCO Root Guide 2026
description: Complete guide to root Xiaomi, Redmi, and POCO devices. Navigate HyperOS/MIUI, Mi Unlock Tool, anti-rollback protection, and Magisk installation.
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/rooting-guides/how-to-root-xiaomi-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Xiaomi Rooting Guide - All Models Supported
  - - meta
    - property: og:description
      content: Root any Xiaomi device with our comprehensive guide covering Mi Unlock Tool, bootloader unlock and Magisk installation for MIUI/HyperOS.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/rooting-guides/how-to-root-xiaomi-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/xiaomi.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Xiaomi Rooting Guide - All Models
  - - meta
    - name: twitter:description
      content: Root any Xiaomi device with Mi Unlock Tool and Magisk installation guide.
  - - meta
    - name: keywords
      content: xiaomi root guide, xiaomi rooting, miui root, hyperos root, mi unlock tool, xiaomi bootloader unlock, xiaomi magisk, redmi root guide, poco root guide
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

# Complete Xiaomi Rooting Guide (2026 Edition)

This page focuses on Xiaomi/Redmi/POCO specifics (Mi Unlock, ARB, HyperOS, payload extraction). For universal prep and Magisk steps, see: [Main Rooting Guide](./index.md), [Bootloader Unlocking](./how-to-unlock-bootloader.md), and [Magisk Guide](./magisk-guide.md).

## 🔗 Essential Resources
- [📖 Main Rooting Guide](./index.md) — Universal rooting principles and safety
- [🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md) — General bootloader concepts
- [🛠️ Custom Recovery](./how-to-install-custom-recovery.md) — TWRP installation guide
- [❓ FAQ & Troubleshooting](../faqs.md) — Solutions for common issues

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

### Supported Device Lines

<details><summary>👉 Click to expand the list</summary>

- Mi/Xiaomi series (Flagship):
  - Xiaomi 14/14 Pro/14 Ultra (HyperOS)
  - Xiaomi 13/13 Pro/13 Ultra (MIUI 14 → HyperOS)
  - Xiaomi 12/12 Pro/12S/12T series (good dev support)
  - Mi 11/11 Pro/11 Ultra (excellent ROM/kernel ecosystem)
  - Older Mi devices (generally well supported)
- Redmi series:
  - Redmi Note 13/13 Pro/13 Pro+ (very popular, lively community)
  - Redmi 13 5G/4G
  - Redmi Note 12 family
  - Redmi K70/K70 Pro/K70 Ultra, K60 series
  - Older Redmi devices (strong community support)
- POCO:
  - POCO X6/X6 Pro
  - POCO F6/F6 Pro
  - POCO M6/M6 Pro
  - POCO C series (support varies)

</details>

### Restricted/Problematic Devices

- Regional:
  - CN (China) variants: strictest rules; many models are not unlockable via official means
  - India: extra checks; sometimes longer timers
  - EEA/Global: generally easier than CN, but still variable
- Carrier/Enterprise/Education SKUs: often locked down or not supported

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

:::tip 💡 **MUST SEE**
See [Alternate Bypass sections](#alternative-bypass-methods-community-use-at-your-own-risk) for bypassing the bootloader unlocking restriction
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

Important: On Android 13+ (GKI), many Xiaomi devices use an init_boot partition for the ramdisk. Magisk must patch init_boot if it exists; otherwise it patches boot. You can check your ROM contents or run:
```bash
fastboot getvar all 2>&1 | findstr /i "init_boot"
```
If your firmware contains init_boot.img, patch that. If not, patch boot.img.

### Method A: Patch-and-Flash (Recommended)

#### Step 1: Get the correct image(s)
1. Download the exact same build you’re running.
   - Use Fastboot ROM if available (images are already extracted)
   - For Recovery/OTA packages (payload.bin), extract with payload-dumper-go
2. Identify the partition to patch:
   - If init_boot.img exists → use init_boot.img
   - Else → use boot.img

Never patch or flash an image from a different build or ARB index.

#### Step 2: Patch with Magisk (see [Magisk Guide](./magisk-guide.md#method-1-boot-image-patching-recommended))
1. Transfer the image to the phone:
   ```bash
   adb push init_boot.img /sdcard/Download/   # if exists
   # or
   adb push boot.img /sdcard/Download/
   ```
2. Install/open the Magisk app (APK).
3. Tap Install → “Select and Patch a File” → choose the image you pushed.
4. Magisk creates magisk_patched-*.img in /Download.

Pull the patched image to PC:
```bash
adb pull /sdcard/Download/magisk_patched-*.img ./
```

#### Step 3: Safer first boot, then permanent install
1. Reboot to fastboot:
   ```bash
   adb reboot bootloader
   ```
2. Test-boot the patched image (doesn’t write flash):
   ```bash
   fastboot boot magisk_patched-*.img
   ```
   - The device will boot once with root. Open Magisk → Install → Direct Install to make it persistent on the active slot.
   - This approach avoids flashing the wrong slot or causing bootloops.

If your device won’t fastboot boot (rare), you may flash directly:
- If using init_boot:
  ```bash
  fastboot flash init_boot magisk_patched-*.img
  ```
- If using boot on A/B devices, prefer specifying the active slot:
  ```bash
  fastboot getvar current-slot
  fastboot flash boot_a magisk_patched-*.img    # if current-slot is a
  fastboot flash boot_b magisk_patched-*.img    # if current-slot is b
  ```
Then:
```bash
fastboot reboot
```

**Notes:**
- Do NOT disable AVB/verity for Magisk. Magisk works with AVB intact.
- If you bootloop, fastboot flash the stock image (init_boot/boot) from the same build.

### Method B: Custom Recovery + Magisk

Custom recoveries on Android 12+/HyperOS often live in vendor_boot (no standalone recovery partition). Decryption of /data is hit-or-miss on A14+, so don’t rely on recovery for backups.

#### Step 1: Boot a recovery image (don’t flash yet)
- TWRP/OrangeFox/SkyHawk builds differ by device/Android version.
- Prefer fastboot boot first:
  ```bash
  fastboot boot recovery.img
  ```
  If your device requires vendor_boot-based recovery, follow the maintainer’s instructions (some require flashing vendor_boot; others install to boot ramdisk).

If your device still has a recovery partition (older MIUI):
```bash
fastboot flash recovery recovery.img
fastboot reboot recovery
```

#### Step 2: Install Magisk from recovery
- Magisk is no longer distributed as a classic ZIP. Rename the APK to .zip for recovery flashing, or use recovery’s “Install APK/Install Magisk” feature if available.
  - Example: rename Magisk-vXX.X.apk → Magisk-vXX.X.zip and flash it.
- Alternatively, sideload the APK/ZIP if the recovery supports it.
- Reboot system; open Magisk to complete setup.

Notes:
- On recent HyperOS, using Method A (patch init_boot/boot) is more reliable than recovery flashing.

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

**Accidental system app removal:**
- Boot custom recovery (if installed) and dirty-flash your exact ROM build
- Or flash stock boot/init_boot back if only root-related change caused bootloop
- Keep a nandroid backup if your recovery supports decryption for your Android version

**Battery/killing apps:**
- Disable MIUI battery optimization for root-dependent apps
- Allow autostart; set background activity to “No limits”
- Consider modules/apps that tame background killing (varies per build)

**Play Integrity (SafetyNet replacement):**
- Passing device integrity often needs:
  - Latest Magisk + Zygisk enabled
  - Play Integrity Fix module (latest maintained fork)
  - Proper DenyList configuration (Google Play services, GMS, wallet/banking)
  - Clear Play Store/Services data after configuration, then wait a few minutes

## Success Verification

### Root Access Confirmation
- Open Magisk → should show “Installed” with current version
- adb shell su -c "id" → expect uid=0(root) gid=0(root)
- Optional: install a root checker app

## Staying Updated

### OTA Update Management (HyperOS/MIUI on unlocked and rooted)
- Unlocked bootloader usually does NOT block OTA on Xiaomi. Root might.
- To take OTA safely with Magisk:
  1. In Magisk: Restore Images (if available)
  2. Apply OTA normally (Settings → System Update)
  3. Don’t reboot when OTA finishes; open Magisk → Install → “Install to Inactive Slot (After OTA)”
  4. Then reboot
- Alternatively, manually sideload or fastboot flash the update, then re-patch the new init_boot/boot for the updated build.

**Notes:**
- Bootloader does not re-lock after OTA unless you explicitly choose a “clean all and lock” flash.
- If OTA fails, dirty-flash the same build via recovery/fastboot and re-root.

### Custom ROM Alternatives
- **Xiaomi.eu** LineageOS, EvolutionX, Pixel Experience, AOSP Extended builds
- Read your device’s XDA thread for firmware prerequisites (modem/vendor), dynamic/super partition flash instructions, and AVB/vbmeta notes
- Most ROMs require unlocked bootloader; many expect flashing via fastbootd (userspace fastboot):
  ```bash
  adb reboot fastboot  # to enter fastbootd on dynamic partition devices
  ```

---

::: tip 💡 Xiaomi Root Success Tips
- Be patient with the unlock timer; don’t constantly rebind or reset
- Use mobile data for account binding; keep SIM inserted
- Always patch and flash images that match your exact build and ARB index
- Prefer fastboot boot patched image first; then Direct Install in Magisk
- On A13+/HyperOS, expect init_boot to be the target for Magisk
- Avoid disabling AVB/verity unless a ROM explicitly requires it
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

“Unsupported” devices in databases may still be unlockable:
- Try earlier MIUI versions (only if ARB allows; check first)
- Try older Mi Unlock Tool versions (e.g., 7.6.727.43)
- Consult device-specific threads on XDA/Telegram

CN ROM devices (⚠️):
- Options are very limited since 2022 policy changes
- Flashing Global ROM to CN hardware can be risky and may not help
- Paid/EDL services exist but are risky and often not recommended

---


## 🔗 Additional Resources

### Official Links
- Mi Unlock Tool: https://en.miui.com/unlock/download_en.html
- Xiaomi Community: https://new.c.mi.com/global/
- MIUI Downloads: https://c.mi.com/global/miuidownload/index
- Xiaomi Global Support: https://www.mi.com/global/support/

### Community Resources
- XDA Xiaomi Forums: https://xdaforums.com/c/xiaomi.12005/
- xiaomi.eu: https://xiaomi.eu/
- Xiaomi Firmware Updater: https://xiaomifirmwareupdater.com/
- r/Xiaomi: https://reddit.com/r/Xiaomi
- MIUI Updates Tracker (Telegram): https://t.me/MIUIUpdatesTracker

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