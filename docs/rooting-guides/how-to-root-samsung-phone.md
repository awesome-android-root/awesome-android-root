---
layout: doc
title: Complete Samsung Galaxy Rooting Guide
description: "Master guide to root Samsung Galaxy devices - S24, S23, A series with bootloader unlock and Magisk installation. Navigate Knox and One UI complexities."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/rooting-guides/how-to-root-samsung-phone
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete Samsung Galaxy Rooting Guide - All Models Supported
  - - meta
    - property: og:description
      content: Root any Samsung Galaxy device with our comprehensive guide covering bootloader unlock, Knox bypass and Magisk installation for One UI.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/rooting-guides/how-to-root-samsung-phone
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/samsung.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete Samsung Galaxy Rooting Guide - All Models
  - - meta
    - name: twitter:description
      content: Root any Samsung Galaxy device with bootloader unlock and Magisk installation guide.
  - - meta
    - name: keywords
      content: samsung galaxy root guide, samsung rooting, samsung bootloader unlock, samsung magisk guide, one ui root, galaxy s25 root, galaxy s24 root, galaxy s23 root, galaxy a series root, samsung knox, odin samsung
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

# Samsung Galaxy Root Guide

Root Samsung Galaxy devices while navigating Knox security, Odin flashing, and One UI complexities. Complete guide for S, A, Z, and Note series.

## Quick Navigation

- [Samsung Challenges](#samsung-rooting-challenges)
- [Supported Devices](#supported-devices)
- [Prerequisites](#prerequisites)
- [Bootloader Unlock](#unlock-bootloader)
- [Root Installation](#root-installation)
- [Troubleshooting](#troubleshooting)

**Related Guides:**
- [Main Rooting Guide](./index.md) - Universal rooting concepts
- [Bootloader Unlocking](./how-to-unlock-bootloader.md) - Detailed unlock guide
- [Magisk Guide](./magisk-guide.md) - Complete Magisk documentation

---
## Samsung Rooting Challenges
### Critical Warnings

::: danger 🚨 One UI 8 Bootloader Lock
**One UI 8 (Android 16) eliminates bootloader unlocking support on Samsung Galaxy devices.**

- **OEM Unlocking toggle removed** from Developer Options; unlock logic stripped from firmware (`androidboot.other.locked=1`)
- **Affected globally**: S25 series, Z Fold 7, Z Flip 7, and any device updated to One UI 8
- **Blocks rooting, custom ROMs, and custom kernels** entirely through official methods
- **Applies to all regions**: International and US devices (both previously unlockable and restricted models)

**⚠️ Do NOT update to One UI 8 if you plan to root or unlock your bootloader** until verified unlock methods emerge.
:::


::: danger ⚠️ Samsung-Specific Risks
- **Knox permanently tripped (0x1)** – **Cannot be reversed**, affects Samsung Pay, Health, Secure Folder
- **Warranty completely void** – Samsung will refuse all service once Knox is tripped
- **Carrier restrictions** – US carrier models (Verizon, AT&T) often **cannot unlock bootloader**
- **Banking & financial app detection** – Enhanced root detection via **Play Integrity** and **SafetyNet**
- **OTA updates blocked** – Official updates will fail unless root is temporarily uninstalled
- **Samsung Cloud & Find My Mobile** – May flag device as compromised
:::



---

## Supported Devices

<details><summary>Click to expand supported Samsung devices</summary>

**Galaxy S Series (Flagship):**
- **Galaxy S24/S24+/S24 Ultra** – Snapdragon only (Exynos not yet supported by Magisk)  
- **Galaxy S23/S23+/S23 Ultra** – Global, Canadian, and unlocked models supported
- **Galaxy S22/S22+/S22 Ultra** – All regions except carrier-locked US models
- **Galaxy S21/S21+/S21 Ultra** – Excellent support across all variants
- **Older S series (S20 and prior)** – Full root and custom ROM support

**Galaxy A Series (Mid-range):**
- **Galaxy A55/A54/A53** – A55 has full Magisk support
- **Galaxy A35/A34/A33** – A35 supported; older models may require older Magisk
- **Galaxy A25/A24/A23** – A25 works; A23 has limited recovery support
- **Older A series** – Check XDA forums for model-specific status

**Galaxy Z Series (Fold/Flip):**
- **Z Fold 5/6, Z Flip 5/6** – Supported with Magisk and TWRP alternatives
- **Z Fold 4 and older** – Stable root via AP patching

**Galaxy Note Series:**
- **Galaxy Note 20/Note 20 Ultra** – Final Note generation, still actively used
- **Galaxy Note 10/10+** – Legacy support, excellent TWRP availability
- **Older Note devices** – Strong custom ROM community

</details>

---

## Prerequisites

### Critical Requirements

::: danger BEFORE YOU START
**Knox Will Trip:** Permanently and irreversibly. Think carefully.

**Data Wipe:** Unlocking erases everything. Backup first.

**Warranty Void:** Samsung will refuse all service.

**Banking Apps:** May not work even with root hiding.

**US Carrier Models:** Most cannot unlock bootloader at all.
:::

### Hardware Requirements

- Samsung Galaxy device (international or unlocked US)
- Windows computer (Odin requires Windows)
- Quality USB cable (Samsung original recommended)
- 50%+ battery charge

### Software Requirements

**On Computer:**

1. **Samsung USB Drivers**
   - Download: [Samsung Developers](https://developer.samsung.com/android-usb-driver)
   - Install before connecting device

2. **Odin Flash Tool**
   - Download: [Odin Download](https://odindownload.com/)
   - Latest version (Odin 3.14.4 or newer)
   - Extract to easy location

3. **Stock Firmware**
   - Download from [SamFrew](https://samfrew.com/) or [Frija](https://github.com/SlackingVeteran/frija/releases)
   - Match exact model and region
   - Contains: AP, BL, CP, CSC files

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
- Baseband version (for CSC region)

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

Settings > Developer options > OEM unlocking

If greyed out:
- Carrier-locked device (cannot unlock)
- Wait 7 days after factory reset
- Remove all Google accounts
- Connect to internet

### Step 2: Enter Download Mode

**Method 1: ADB**
```bash
adb reboot download
```

**Method 2: Hardware Keys**
1. Power off device completely
2. Hold Volume Up + Volume Down
3. Connect USB cable while holding buttons
4. Press Volume Up to continue
5. Download mode screen appears

### Step 3: Unlock Bootloader

**On Device:**
1. Long press Volume Up
2. Bootloader unlock warning appears
3. Use Volume keys to select "Unlock bootloader"
4. Press Power to confirm
5. Device automatically factory resets
6. Shows "Custom binary blocked by FRP lock" (normal)

**Device restarts and wipes completely.**

---

## Root Installation

### Method 1: AP File Patching (Primary Method)

**Step 1: Download Firmware**

1. Determine exact model and CSC:
```bash
adb shell getprop ro.product.model
adb shell getprop ro.csc.countryiso_code
```

2. Download matching firmware from SamFrew
3. Extract firmware ZIP
4. Files inside:
   - **AP_[model]_[version].tar.md5** (system image)
   - **BL_[model]_[version].tar.md5** (bootloader)
   - **CP_[model]_[version].tar.md5** (modem)
   - **CSC_[model]_[version].tar.md5** (region data)

**Step 2: Transfer and Patch AP File**

```bash
# Transfer AP file to device
adb push AP_*.tar.md5 /sdcard/Download/

# Install Magisk APK
adb install Magisk-v27.0.apk
```

**On Device:**
1. Open Magisk app
2. Tap "Install" next to Magisk
3. Select "Select and Patch a File"
4. Navigate to Download folder
5. Select AP file
6. Tap "Let's Go"
7. Wait for patching (2-5 minutes)

**Output:** `magisk_patched_[random].tar` in Download folder

**Transfer patched file back:**
```bash
adb pull /sdcard/Download/magisk_patched_*.tar ./
```

**Step 3: Flash with Odin**

1. **Boot to Download Mode:**
```bash
adb reboot download
```

2. **Open Odin as Administrator**
3. **Device should show in Odin (blue box with COM port)**

4. **Load firmware files:**

Click each button and select files:
- **BL**: Original BL file (unchanged)
- **AP**: Magisk-patched AP file (patched)
- **CP**: Original CP file (unchanged)
- **CSC**: Original CSC file (NOT HOME_CSC)

5. **Configure Odin Options:**

Options tab:
- ✅ Auto Reboot
- ✅ F. Reset Time
- ❌ Re-Partition (uncheck!)

::: warning CRITICAL SETTING
**Auto Reboot MUST be checked** for newer Samsung devices. If unchecked, manual boot to recovery required.
:::

6. **Click START**

Odin flashes files:
- Shows progress bar
- Takes 3-5 minutes
- "PASS!" appears in green when complete

**Step 4: Mandatory Factory Reset**

::: danger CRITICAL STEP
For One UI 4.0+ (Android 12+), factory reset required to complete root properly.
:::

**Immediate after flash completes:**

1. Device reboots automatically
2. When Samsung logo appears, immediately:
3. Hold **Volume Up + Power**
4. Enter Recovery Mode

**In Recovery:**
1. Use Volume keys to navigate
2. Select "Wipe data/factory reset"
3. Select "Factory data reset"
4. Confirm with "Yes"
5. After wipe, select "Reboot system now"

**Step 5: Complete Setup and Verify Root**

1. Complete Android setup again
2. Reinstall Magisk APK
3. Open Magisk app
4. May show "Additional Setup Required"
5. Tap "OK" and reboot
6. After reboot, Magisk shows:
   - Magisk: Installed (version)
   - App: Latest (version)

Test root:
```bash
adb shell
su
id
# Should show: uid=0(root)
```

::: tip SUCCESS!
If Magisk shows both installed and su works, you're rooted!
:::


### Step 6: Verify Knox Trip

After setup:
1. Dial `*#0*#` for service mode
2. Check Knox warranty status
3. Should show "0x1" (tripped, permanent)


---

### Method 2: TWRP Recovery (Legacy Devices)

For older Samsung devices with TWRP support:

1. Download TWRP for your device from [TWRP website](https://twrp.me/Devices/Samsung/)
2. Flash TWRP via Odin (AP slot)
3. Boot to TWRP recovery
4. Flash Magisk ZIP
5. Reboot system

**Note:** Most modern Samsung devices lack TWRP support due to A/B partitions and encryption changes.


### Verify Knox Trip

After setup:
1. Dial `*#0*#` for service mode
2. Check Knox warranty status
3. Should show "0x1" (tripped, permanent)


---

## Post-Root Setup

### Configure Magisk

**Step 1: Basic Settings**

Magisk > Settings:
- **Zygisk**: Enable (required for hiding)
- **Enforce DenyList**: Enable
- **Hide Magisk app**: Rename to avoid detection

**Step 2: Configure DenyList**

Critical for Samsung due to Knox detection:

Add to DenyList:
- Google Play Services (all)
- Google Play Store (all)
- Samsung apps:
  - Samsung Health
  - Samsung Members
  - Samsung Galaxy Store
  - Samsung Pay (won't work anyway)
- Banking apps
- Payment apps
- Any Knox-dependent apps

**Step 3: Install Essential Modules**

Recommended for Samsung:
- **Universal SafetyNet Fix** - Better compatibility
- **Shamiko** - Enhanced root hiding
- **Play Integrity Fix** - For banking apps
- **Systemless Hosts** - Ad blocking

### Samsung-Specific Root Hiding

**Additional Steps:**

1. **Hide Magisk App:**
   - Magisk > Settings
   - "Hide the Magisk app"
   - Enter custom name (e.g., "Settings")

2. **Clear App Data:**

After DenyList configuration:
```bash
# Clear Google Play Services
pm clear com.google.android.gms

# Clear Play Store
pm clear com.android.vending

# Clear Samsung Health
pm clear com.sec.android.app.shealth
```

3. **Reboot device**

---

## OTA Handling

Samsung OTA updates are blocked when rooted.

### Unroot for OTA

**Step 1: Uninstall Magisk**

1. Magisk > Uninstall
2. Select "Restore Images"
3. Reboot
4. Root removed

**Step 2: Install OTA**

1. Settings > Software update
2. Download and install
3. Device updates normally

**Step 3: Re-Root**

1. Download new firmware AP file
2. Patch with Magisk
3. Flash with Odin
4. Root restored

### Alternative: Manual Firmware Flash

1. Download latest firmware
2. Patch AP file
3. Flash complete firmware with Odin
4. Factory reset
5. Root restored and updated

---

## Troubleshooting

### Bootloader Issues

**OEM Unlocking Greyed Out**

Causes:
- Carrier-locked device
- FRP lock active
- Internet not connected

Solutions:
1. Remove all accounts
2. Factory reset
3. Wait 7 days
4. Connect to internet
5. Check again

If still grey: Device is carrier-locked (cannot unlock)

**Stuck in Download Mode**

Solutions:
```bash
# Exit download mode
Hold Volume Down + Power for 10 seconds

# Force restart
Hold Power + Volume Down + Bixby for 10 seconds
```

### Odin Issues

**Odin Doesn't Detect Device**

Solutions:
1. Reinstall Samsung USB drivers
2. Try different USB port (USB 2.0)
3. Run Odin as Administrator
4. Disable antivirus temporarily
5. Try different USB cable
6. Reboot computer

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

Solutions:
1. Boot to recovery (Volume Up + Power)
2. Factory reset again
3. Wipe cache partition
4. If persists, reflash stock firmware

### Root Issues

**Magisk Shows N/A**

Causes:
- Patched wrong AP file
- Didn't factory reset
- Firmware mismatch

Solutions:
1. Verify correct firmware version
2. Perform factory reset again
3. Re-patch and reflash AP

**SafetyNet/Play Integrity Fails**

Solutions:
1. Enable Zygisk
2. Configure DenyList properly
3. Hide Magisk app
4. Install Universal SafetyNet Fix
5. Install Shamiko module
6. Clear Google Play Services
7. Reboot

Note: Due to Knox trip, some apps may always fail.

**Samsung Apps Detect Root**

Reality:
- Samsung Health: Limited functionality
- Samsung Pay: Will not work (Knox 0x1)
- Secure Folder: Disabled permanently
- Samsung Pass: Unusable

No workaround for Knox-dependent features.

---

## Unroot and Restore

### Remove Root Only

```bash
# Magisk > Uninstall > Restore Images
# Root removed, Knox still tripped (0x1)
```

### Flash Stock Firmware

**Complete restoration:**

1. Download stock firmware
2. Flash all files with Odin:
   - BL, AP, CP, CSC (not patched)
3. Perform factory reset
4. Device stock but Knox still 0x1

### Knox Status

::: danger KNOX CANNOT BE RESET
Once Knox trips to 0x1, it is permanent. Flashing stock firmware does NOT reset Knox counter. The efuse is physically blown.
:::

---

## Community Resources

**Official Samsung Resources:**
- [Samsung Firmware](https://samfrew.com/) - Stock firmware downloads
- [Frija Tool](https://github.com/SlackingVeteran/frija) - Firmware downloader
- [Odin Download](https://odindownload.com/) - Flash tool
- [Samsung Developers](https://developer.samsung.com/) - Drivers and tools

**Community Forums:**
- **[Samsung XDA Forums](https://xdaforums.com/c/samsung.11975/)** – Device-specific development
- **[One UI Mods Community](https://t.me/oneuimods)** – Samsung customization
- **[r/Samsung](https://www.reddit.com/r/samsung/)** – Latest device discussions
- **[Samsung Firmware Database](https://samfrew.com/)** – Firmware downloads

**Essential Samsung Resources:**
- **[Samsung Smart Switch](https://www.samsung.com/us/support/owners/app/smart-switch)** – Backup tool
- **[SamFrew](https://samfrew.com/)** – Firmware downloads
- **[ODIN Download](https://odindownload.com/)** – Latest Odin (v3.14.4)
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

**After Rooting Your Samsung:**

1. **Essential apps:**
   - [Root Apps Collection](../apps-and-modules/) - Curated list

2. **Enhance experience:**
   - [Ad Blocking Guide](../general-guides/android-adblocking.md) - System-wide blocking
   - [Debloating Guide](../general-guides/android-apps-debloating.md) - Remove Samsung bloat
   - [LSPosed Guide](./lsposed-guide.md) - App modifications

3. **Consider alternatives:**
   - [Custom ROM Guide](./custom-rom-installation.md) - LineageOS, Evolution X
   - Explore Samsung-specific ROMs
   - Join development community