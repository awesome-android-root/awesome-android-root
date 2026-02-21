---
layout: doc
title: Complete Bootloader Unlocking Guide
description: "Master bootloader unlocking for all Android manufacturers. Step-by-step instructions for Google Pixel, Xiaomi, Samsung, OnePlus, Motorola, and more."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/rooting-guides/how-to-unlock-bootloader
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Bootloader Unlocking Guide - All Android Manufacturers
  - - meta
    - property: og:description
      content: Master Android bootloader unlocking with comprehensive guides for all major manufacturers including Google Pixel, Xiaomi, Samsung, OnePlus, and Motorola.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/rooting-guides/how-to-unlock-bootloader
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/bootoader.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Bootloader Unlocking Guide - All Manufacturers
  - - meta
    - name: twitter:description
      content: Master bootloader unlocking for all Android manufacturers with step-by-step instructions.
  - - meta
    - name: keywords
      content: bootloader unlock guide, android bootloader unlock, fastboot unlock bootloader, xiaomi mi unlock tool, samsung bootloader unlock, google pixel unlock, oneplus bootloader unlock, motorola unlock code, sony bootloader unlock, oem unlocking, fastboot commands, adb fastboot guide
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Bootloader Unlocking
  - - meta
    - property: article:tag
      content: Bootloader Unlock
  - - meta
    - property: article:tag
      content: Android Bootloader
  - - meta
    - property: article:tag
      content: Fastboot
  - - meta
    - property: article:tag
      content: OEM Unlocking
  - - meta
    - name: robots
      content: index, follow
---

# Bootloader Unlocking Guide

Essential first step for Android customization. Unlock your device's bootloader safely to enable rooting, custom recovery, and custom ROMs.

## Quick Navigation

- [Understanding Bootloaders](#understanding-bootloaders)
- [Prerequisites](#prerequisites)
- [Universal Preparation](#universal-preparation-all-devices)
- [Manufacturer Guides](#manufacturer-specific-guides)
- [Post-Unlock Steps](#post-unlock-steps)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Complete rooting overview
- [Custom Recovery Installation](./how-to-install-custom-recovery.md) - Next step after unlocking
- [FAQ](../faqs.md) - Common questions and solutions

---

## Understanding Bootloaders

The bootloader is your device's startup manager - the first program that runs when powering on, responsible for loading the operating system and enforcing security policies.

### Why Unlock Your Bootloader?

**Unlocking enables:**
- **Custom recovery installation** (TWRP, OrangeFox)
- **Root access** via Magisk, KernelSU
- **Custom ROM installation** (LineageOS, GrapheneOS)
- **Kernel modifications** for performance tuning
- **Advanced system modifications** and tweaks

### Locked vs Unlocked

| Locked Bootloader | Unlocked Bootloader |
|-------------------|---------------------|
| Maximum security | Full customization freedom |
| OTA updates work seamlessly | Can install custom ROMs |
| Banking apps work normally | Can install custom recovery |
| Cannot install custom software | Root access possible |
| Limited modification | Warranty void (usually) |

---

## Prerequisites

### ⚠️ Critical Warnings

::: danger IRREVERSIBLE CONSEQUENCES
**Data Erasure** - Unlocking bootloader completely wipes all data. Backup everything before proceeding.

**Warranty Void** - Most manufacturers permanently void warranty. Some devices show permanent unlock warnings.

**Banking Apps** - Many financial apps detect unlocked bootloaders and refuse to work.

**Device Security** - Unlocked bootloaders reduce device security. Physical access can compromise data.
:::

### Essential Requirements

**Hardware**
- Android device with unlockable bootloader
- 50% or higher battery charge
- Quality USB cable (data-capable)
- Computer (Windows, macOS, or Linux)

**Software**
- [Android Platform Tools](https://developer.android.com/studio/releases/platform-tools) (ADB/Fastboot)
- Device-specific USB drivers (Windows)
- Manufacturer-specific tools (Mi Unlock Tool, Odin, etc.)

**Knowledge**
- Basic command line usage
- Device model and variant identification
- Ability to follow instructions precisely

### Manufacturer Policy Overview

| Manufacturer | Method | Wait Time | Restrictions | Success Rate |
|--------------|--------|-----------|--------------|--------------|
| Google Pixel | Fastboot command | None | None | 99% |
| OnePlus | Fastboot command | None | None | 95% |
| Nothing | Fastboot command | None | None | 90% |
| Xiaomi/Redmi/POCO | Mi Unlock Tool | 7-30 days | Mi Account required | 85% |
| Motorola | Unlock code | None | Permanent warning | 80% |
| Samsung | Unofficial (Odin) | None | Exynos only, Knox trips | 60% |
| Huawei | No longer supported | N/A | Impossible since 2018 | 0% |

**Notes:**
- US carrier-locked models (Verizon, AT&T) often cannot unlock bootloader
- Always verify your specific model's unlockability

> [!IMPORTANT]
> ### Bootloader Unlock: Wall of Shame
> This community-maintained [repository](https://github.com/melontini/bootloader-unlock-wall-of-shame) tracks companies that make bootloader unlocking difficult or impossible. Check it before buying a new device.

or

> [!IMPORTANT]
> ### Wikipedia/Bootloader unlocking
> Browse this page on wikipedia that lists and tracks android bootloader unlocking [Click me ↗](https://en.m.wikipedia.org/wiki/Bootloader_unlocking#Android).


---

## Universal Preparation (All Devices)

Complete these steps regardless of manufacturer before attempting bootloader unlock.

### Step 1: Enable Developer Options

1. Open **Settings**
2. Navigate to **About Phone** (or **About Device**)
3. Find **Build Number**
4. Tap **Build Number** 7 times rapidly
5. Enter your PIN/password when prompted
6. "Developer options now enabled" message appears

### Step 2: Enable Critical Developer Settings

1. Go to **Settings** > **System** > **Developer Options**
2. Enable **OEM Unlocking** (critical - required for unlock)
3. Enable **USB Debugging** (allows computer communication)
4. Enable **USB Debugging (Security Settings)** if available

**If OEM Unlocking is missing or greyed out:**
- Connect to WiFi and wait 24-48 hours
- Try different network (mobile data vs WiFi)
- Some carrier devices permanently block this option
- Device may not support unlocking

### Step 3: Install Platform Tools

**Windows:**
1. Download [Platform Tools](https://developer.android.com/studio/releases/platform-tools)
2. Extract to `C:\platform-tools\`
3. Add to PATH or use Command Prompt in that directory

**macOS:**
```bash
brew install android-platform-tools
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt install android-tools-adb android-tools-fastboot
```

**Linux (Arch):**
```bash
sudo pacman -S android-tools
```

### Step 4: Install USB Drivers (Windows Only)

Download and install manufacturer-specific drivers:
- [Google USB Driver](https://developer.android.com/studio/run/win-usb) (Pixel)
- [Samsung USB Driver](https://developer.samsung.com/android-usb-driver)
- Xiaomi USB Driver: included with Mi Unlock Tool
- For other OEMs, check this list: [OEM USB Drivers](https://developer.android.com/studio/run/oem-usb#Drivers)


### Step 5: Test ADB Connection

1. Connect device to computer via USB
2. Select **File Transfer** mode on device
3. Allow USB debugging when prompted (check "Always allow from this computer")
4. Open terminal/command prompt
5. Test connection:

```bash
adb devices
```

Expected output:
```
List of devices attached
1234567890ABCDEF    device
```

If device not listed:
- Reconnect USB cable
- Try different USB port
- Reinstall drivers (Windows)
- Verify USB debugging is enabled

### Step 6: Backup Your Data

**Essential backups:**
- Photos and videos (Google Photos, cloud storage)
- Contacts (Google Contacts sync)
- Messages (SMS Backup & Restore)
- App data (Google Backup, Helium, or see [backup apps](../apps-and-modules/#backup-and-restore))
- Important documents
- Two-factor authentication recovery codes

**Reminder:** Unlocking bootloader will erase EVERYTHING.

---

## Manufacturer-Specific Guides

Select your device manufacturer for detailed instructions.

### Google Pixel

**Models:** All Pixel devices (Pixel 1 through Pixel 9 series)

**Steps:**

1. Complete [Universal Preparation](#universal-preparation-all-devices)

2. Boot to fastboot mode:
```bash
adb reboot bootloader
```

Hardware method: Power off, then hold Power + Volume Down

3. Verify fastboot connection:
```bash
fastboot devices
```

4. Unlock bootloader:
```bash
fastboot flashing unlock
```

5. Use Volume keys to navigate to "Unlock the bootloader"

6. Press Power button to confirm

7. Device will factory reset and reboot

8. Verify unlock:
```bash
adb reboot bootloader
fastboot getvar unlocked
```

Should return: `unlocked: yes`

**Notes:**
- Simplest unlock process
- No waiting period or approval needed
- Carrier models should work (verify OEM Unlocking available)
- Ready for next step? See [Pixel rooting guide](./how-to-root-pixel-phone.md)

---

### Xiaomi / Redmi / POCO

**Requirements:**
- Mi Account (active for 7+ days on the device)
- Mi Unlock Tool (Windows only)
- 7-30 day waiting period

**Phase 1: Apply for Unlock Permission**

1. Add Mi Account to device
   - Settings > Additional Settings > Developer Options
   - Mi Unlock Status > Add account and device
   - Keep device connected to internet

2. Wait for approval (7-30 days)
   - Global ROM: Usually 7 days (168 hours)
   - China ROM: Usually 30 days (720 hours)
   - Check Mi Unlock Status for remaining time

**Phase 2: Unlock with Mi Unlock Tool**

1. Download [Mi Unlock Tool](https://en.miui.com/unlock/) (Windows)

2. Install and launch Mi Unlock Tool

3. Boot device to fastboot mode:
```bash
adb reboot bootloader
```

4. Connect device to computer via USB

5. Sign in to Mi Unlock Tool with same Mi Account

6. Click "Unlock" button

7. Tool will check eligibility and unlock device

8. Device will factory reset and reboot

**Troubleshooting:**
- "Couldn't verify device": Wait full waiting period
- "Account not bound": Ensure Mi Account added to device
- "Unlock failed": Try different USB port, reinstall drivers

**Next:** See [Xiaomi rooting guide](./how-to-root-xiaomi-phone.md) for device-specific instructions

> [!TIP]
> #### Bypass Mi Unlock Waiting Period
> Some users report success using older Mi Unlock Tool versions or modified tools. check this [XDA Guide](https://xdaforums.com/t/how-to-unlock-bootloader-on-xiaomi-hyperos-all-devices-except-cn.4654009/). Proceed with caution.

---

### OnePlus

**Models:** Most OnePlus devices (verify T-Mobile variants separately)

**Steps:**

1. Complete [Universal Preparation](#universal-preparation-all-devices)

2. Boot to fastboot mode:
```bash
adb reboot bootloader
```

3. Verify fastboot connection:
```bash
fastboot devices
```

4. Unlock bootloader (try both commands):
```bash
fastboot oem unlock
```

Or for newer models:
```bash
fastboot flashing unlock
```

5. Use Volume keys to select "UNLOCK THE BOOTLOADER"

6. Press Power to confirm

7. Device will factory reset and reboot

**Notes:**
- Straightforward process like Pixel
- T-Mobile variants may have restrictions
- Some models show "Bootloader Unlocked" warning on boot
- Continue with [OnePlus rooting guide](./how-to-root-oneplus-phone.md)

---

### Samsung Galaxy

**Critical:** US and Canadian Snapdragon models generally CANNOT unlock bootloader. International Exynos models can unlock but Knox permanently trips.

**Compatibility Check:**

1. Install "Phone INFO SAM" app from Play Store

2. Check "OEM Lock" status:
   - "ON (U)" = Permanently locked (cannot unlock)
   - "OFF" = May be unlockable

**Unlock Process (Exynos Only):**

1. Complete [Universal Preparation](#universal-preparation-all-devices)

2. Power off device completely

3. Enter Download Mode:
   - Hold Volume Down + Power (or Volume Down + Bixby + Power)
   - When warning appears, press Volume Up

4. Long press Volume Up to unlock bootloader

5. Follow on-screen warnings

6. Device will factory reset

7. Shows "Custom" on boot screen (Knox permanently tripped)

**Knox Consequences:**
- Knox EFUSE physically burned (permanent, cannot revert)
- Samsung Pay disabled
- Secure Folder disabled
- Samsung Pass disabled
- Samsung Health may not work
- Warranty permanently void
- Resale value significantly reduced

**Next Steps:**
- Continue with [Samsung rooting guide](./how-to-root-samsung-phone.md)
- Or consider [Custom ROM alternatives](./custom-rom-installation.md) that work without root

---

### Motorola

**Steps:**

**Phase 1: Obtain Unlock Code**

1. Visit [Motorola Bootloader Unlock](https://motorola-global-portal.custhelp.com/app/standalone/bootloader/unlock-your-device-a)

2. Sign in or create Motorola account

3. Complete [Universal Preparation](#universal-preparation-all-devices)

4. Boot to fastboot mode:
```bash
adb reboot bootloader
```

5. Get device identifier:
```bash
fastboot oem get_unlock_data
```

6. Copy the returned string (combine all lines, remove spaces and "(bootloader)" text)

7. Submit string on Motorola website

8. Receive unlock code via email (usually within hours)

**Phase 2: Apply Unlock Code**

1. Boot to fastboot mode if not already there

2. Apply unlock code:
```bash
fastboot oem unlock UNLOCK_CODE
```

Replace `UNLOCK_CODE` with code from email

3. Confirm unlock on device screen

4. Device will factory reset and reboot

**Notes:**
- Shows permanent "Bootloader Unlocked" warning on every boot
- Warranty void
- Process usually smooth once code received
- Next: [Motorola rooting guide](./how-to-root-motorola-phone.md)

---

### Nothing Phone

**Models:** Nothing Phone (1), (2), (2a)

**Steps:**

1. Complete [Universal Preparation](#universal-preparation-all-devices)

2. Boot to fastboot mode:
```bash
adb reboot bootloader
```

3. Unlock bootloader:
```bash
fastboot flashing unlock
```

4. Use Volume keys to select unlock option

5. Press Power to confirm

6. Device will factory reset and reboot

**Notes:**
- Similar to Pixel process
- Good community support
- Nothing OS specific considerations minimal
- Continue with [Nothing Phone rooting guide](./how-to-root-nothing-phone.md)

---

### Sony Xperia

**Steps:**

**Phase 1: Check Eligibility**

1. Visit [Sony Developer Portal](https://developer.sony.com/develop/open-devices/get-started/unlock-bootloader/)

2. Enter IMEI (dial `*#06#`)

3. Check if "bootloader unlock allowed: yes"
   - If no: Device cannot be unlocked

**Phase 2: Get Unlock Code**

1. Create Sony Developer account

2. Enter device details and IMEI

3. Receive unlock code

**Phase 3: Unlock**

1. Boot to fastboot mode

2. Apply unlock code:
```bash
fastboot oem unlock 0xUNLOCK_CODE
```

Replace `UNLOCK_CODE` with provided code

3. Device unlocks and reboots

**DRM Keys Loss:**
- Camera quality degrades (especially low-light)
- Some DRM-protected content may not play
- Cannot be reversed
- Some custom ROMs include camera fixes

---

### Other Manufacturers

**ASUS ROG Phone:**
- Official unlock tool available from ASUS
- Download from ASUS support site
- Follow in-app instructions

**Realme:**
- Deep Testing app method
- 7-day waiting period
- Limited model support

**OPPO:**
- Deep Testing app method
- 7-day waiting period
- Very limited model support

**Huawei/Honor:**
- No longer supported since 2018
- Cannot unlock newer models

---

## Post-Unlock Steps

After successfully unlocking bootloader:

### Step 1: Initial Setup

Device boots to setup wizard (all data erased).

1. Complete Android setup process
2. Re-enable Developer Options (tap Build Number 7 times)
3. Enable USB Debugging again
4. Optionally re-enable OEM Unlocking (for future modifications)

### Step 2: Verify Unlock

```bash
adb reboot bootloader
fastboot getvar unlocked
```

Should return: `unlocked: yes` or `unlocked: 1`

Or:
```bash
fastboot oem device-info
```

Look for "Device unlocked: true"

### Step 3: Next Steps

**Typical progression:**

1. **Install Custom Recovery** (optional but recommended)
   - [TWRP Installation Guide](./how-to-install-custom-recovery.md) - Enables easier rooting and backups

2. **Root Your Device** - Choose your preferred method:
   - [Magisk Guide](./magisk-guide.md) - Most popular, easiest for beginners
   - [KernelSU Guide](./kernelsu-guide.md) - Advanced kernel-level root with superior hiding
   - [APatch Guide](./apatch-guide.md) - Alternative kernel-based solution
   - [Compare all methods](./root-framework-comparison.md)

3. **Post-Root Configuration**
   - Install [essential starter apps](../apps-and-modules/#starter-kit-must-have-apps)
   - Configure [system-wide ad blocking](../general-guides/android-adblocking.md)
   - [Safely remove bloatware](../general-guides/android-apps-debloating.md)
   - Browse [470+ root apps and modules](../apps-and-modules/)

### Step 4: Security Considerations

**Important reminders:**
- Banking apps may detect unlocked bootloader (see [root hiding solutions](../apps-and-modules/#root-hiding-and-play-integrity))
- Set up strong screen lock
- Only install trusted software
- Be cautious with root permissions
- Keep device software updated
- Review our [troubleshooting guide](../troubleshooting.md) for common issues

---

## Troubleshooting

### OEM Unlocking Missing or Greyed Out

**Causes:**
- Carrier restriction (permanent)
- FRP (Factory Reset Protection) active
- Device not connected to internet
- Insufficient wait time after initial setup

**Solutions:**
- Connect to WiFi and wait 24-48 hours
- Try mobile data instead of WiFi (or vice versa)
- Remove Google account, factory reset, wait 48 hours
- If carrier device, may be permanently locked

### Fastboot Not Recognized

**Symptoms:** Computer doesn't detect device in fastboot mode

**Solutions:**
- Install proper USB drivers (Windows)
- Try different USB port (USB 2.0 often more reliable)
- Use different USB cable (must support data transfer)
- Boot to fastboot using hardware keys instead of ADB
- Try different computer
- Disable USB Selective Suspend (Windows Power Options)

### "Remote: Not Allowed" Error

**Causes:**
- OEM Unlocking not enabled
- Device doesn't support unlocking
- Carrier restriction

**Solutions:**
- Verify OEM Unlocking is enabled in Developer Options
- Check device compatibility
- Verify not carrier-locked model

### Device Won't Boot After Unlock

**Symptoms:** Stuck on boot logo or bootloop

**Solutions:**
1. Wait 10 minutes (first boot after unlock can be slow)
2. Force restart: Hold Power button 10-15 seconds
3. Boot to recovery and wipe cache
4. Factory reset from recovery
5. Flash stock firmware via fastboot

**Prevention:** Always download stock firmware before unlocking for emergency recovery.

### "Waiting for Device" Message

**Causes:** Fastboot/ADB connection issues

**Solutions:**
- Verify device appears in `fastboot devices` or `adb devices`
- Reinstall USB drivers (Windows)
- Try different USB port
- Use USB 2.0 port instead of USB 3.0
- Disable antivirus temporarily
- Run command prompt as administrator (Windows)

### Unlock Process Interrupted

If power loss or disconnect during unlock:

1. Reboot to fastboot mode
2. Attempt unlock command again
3. If bootloop, flash stock boot.img:
```bash
fastboot flash boot boot.img
fastboot reboot
```
4. If still issues, flash complete stock firmware

---

## Additional Resources

**Official Documentation:**
- [Android Developer Bootloader Guide](https://source.android.com/docs/core/architecture/bootloader)
- [Fastboot Documentation](https://android.googlesource.com/platform/system/core/+/master/fastboot/)

**Community Resources:**
- [XDA Developers Forums](https://forum.xda-developers.com/) - Device-specific guides
- [Bootloader Unlock Wall of Shame](https://github.com/melontini/bootloader-unlock-wall-of-shame) - Manufacturer restrictions tracker

**Emergency Recovery:**
- Keep stock firmware downloaded
- Know your device's EDL/download mode
- Bookmark device-specific unbrick guides

**Related Guides:**
- [Main Rooting Guide](./index.md) - Complete overview
- [Custom Recovery Installation](./how-to-install-custom-recovery.md) - Next step
- [Magisk Root Guide](./magisk-guide.md) - Primary root method
- [FAQ](../faqs.md) - Additional Q&A
- [Troubleshooting Guide](../troubleshooting.md) - Common issues

---

## Safety Reminder

Bootloader unlocking is the essential first step for Android customization, but it comes with permanent consequences:

- All data will be erased
- Warranty will be void
- Security will be reduced
- Some apps may not work

**Only proceed if:**
- You understand the risks
- You have backed up all data
- You accept the consequences
- You can handle troubleshooting

**When ready:** Proceed to [Custom Recovery Installation](./how-to-install-custom-recovery.md) or [Root Installation](./index.md#choosing-a-root-method)

----

:sparkles: Good luck with your Android customization journey.
