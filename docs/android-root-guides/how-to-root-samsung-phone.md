---
layout: doc
title: Complete Samsung Galaxy Rooting Guide
description: "Master guide to root Samsung Galaxy devices - S24, S23, A series with bootloader unlock and Magisk installation. Navigate Knox and One UI complexities."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/how-to-root-samsung-phone
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
      content: https://awesome-android-root.org/android-root-guides/how-to-root-samsung-phone
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
      content: samsung galaxy root guide, samsung rooting, samsung bootloader unlock, samsung magisk guide, one ui root, galaxy s24 root, galaxy s23 root, galaxy a series root, samsung knox, odin samsung
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

# Complete Samsung Galaxy Rooting Guide

**Root Samsung's flagship phones** - Galaxy S24, S23, A series with bootloader unlock and careful Knox management.

## 🔗 Essential Resources
- **[📖 Main Rooting Guide](./index.md)** - Universal rooting principles and safety
- **[🔓 Bootloader Unlocking](./how-to-unlock-bootloader.md)** - General bootloader concepts
- **[🛠️ Custom Recovery](./how-to-install-custom-recovery.md)** - TWRP installation guide
- **[❓ FAQ & Troubleshooting](../faqs.md)** - Solutions for common issues

## Samsung Rooting Landscape

**Samsung Unique Challenges:**
- **Knox Security** - Hardware-level security that gets permanently tripped
- **Bootloader restrictions** - Some carriers/regions block unlocking
- **Complex partitioning** - A/B system partitions with multiple boot images
- **Odin flashing tool** - Samsung's proprietary flashing method
- **One UI integration** - Samsung's Android skin affects root behavior

## Critical Warnings

::: danger ⚠️ Samsung-Specific Risks
- **Knox permanently tripped** - Cannot be reversed, affects Samsung Pay/Health
- **Warranty completely void** - Samsung will refuse all warranty service
- **Carrier restrictions** - US carrier models often cannot be unlocked
- **Banking app issues** - Knox trip detected by financial applications
- **OTA updates blocked** - Official updates will fail after rooting
:::

## Device Compatibility Check

### Supported Devices

**Galaxy S Series (Flagship):**
- **Galaxy S24/S24+/S24 Ultra** - Snapdragon/Exynos variants
- **Galaxy S23/S23+/S23 Ultra** - Global models supported  
- **Galaxy S22/S22+/S22 Ultra** - Region-dependent availability
- **Galaxy S21/S21+/S21 Ultra** - Most regions supported
- **Older S series** - Generally good support

**Galaxy A Series (Mid-range):**
- **Galaxy A55/A54/A53** - Popular mid-range options
- **Galaxy A35/A34/A33** - Budget-friendly variants
- **Galaxy A25/A24/A23** - Entry-level support varies
- **Older A series** - Check device-specific forums

**Galaxy Note Series:**
- **Galaxy Note 20/Note 20 Ultra** - Final Note generation
- **Galaxy Note 10/Note 10+** - Still actively supported
- **Older Note devices** - Excellent custom ROM support

### Unsupported/Restricted Devices

**US Carrier Models:**
- **Verizon** - Bootloader locked, cannot unlock
- **AT&T** - Most models bootloader locked
- **T-Mobile** - Some older models unlockable
- **Sprint** - Generally locked bootloaders

**Regional Restrictions:**
- **China variants** - Different firmware, limited support
- **Enterprise models** - Additional security restrictions
- **Government variants** - Heavily locked down

## Prerequisites & Setup

### Required Tools
1. **[Samsung Odin](https://odindownload.com/)** - Official Samsung flashing tool
2. **[Samsung USB Drivers](https://developer.samsung.com/mobile/android-usb-driver.html)** - Device communication
3. **[Magisk APK](https://github.com/topjohnwu/Magisk/releases)** - Latest release
4. **[SamFirm](https://samfrew.com/)** - Samsung firmware downloader
5. **[Heimdall](https://glassechidna.com.au/heimdall/)** - Open-source alternative to Odin

### Device Preparation
1. **Check bootloader status:**
   - Settings → About Phone → Software Information
   - Look for **OEM Lock: ON/OFF**
   - If "OFF" - bootloader already unlocked

2. **Enable Developer Options:**
   - Settings → About Phone → Tap Build Number 7 times
   - Enable **USB Debugging**
   - Enable **OEM Unlocking** (if available)

3. **Backup everything:**
   - Samsung Cloud backup
   - Smart Switch PC backup
   - Manual file backup

4. **Charge to 70%+** - Flashing process requires stable power

### Connection Testing
```bash
# Test ADB connection
adb devices

# Should show device in list
# Accept USB debugging prompt if shown
```

## Bootloader Unlocking Process

Samsung bootloader unlocking varies significantly by model and region.

### Step 1: Check Unlock Eligibility
1. **Dial `*#197328640#`** or use Samsung Members app
2. **Navigate to:** System → Knox Status
3. **Knox Status must show:** Not triggered/Normal
4. **OEM Lock Status:** Must be available to disable

### Step 2: Enable OEM Unlocking
1. **Settings → Developer Options**
2. **Enable "OEM Unlocking"**
3. **May require internet connection** for Samsung verification
4. **Wait 7 days** if prompted (Samsung's waiting period)

### Step 3: Boot to Download Mode
```bash
# Method 1: ADB command
adb reboot download

# Method 2: Hardware keys
# Power off → Hold Volume Up + Volume Down + Power
```

### Step 4: Unlock Bootloader
1. **In Download Mode:**
   - Long press Volume Up when prompted
   - Accept bootloader unlock warning
   - Device will factory reset and reboot

2. **Verify unlock:**
   - Should see "CUSTOM" in download mode
   - Knox will show "KNOX WARRANTY VOID"

## Root Installation Methods

### Method A: AP Patching (Recommended)

Samsung uses complex firmware files that require specific handling.

#### Step 1: Download Firmware
1. **Find your exact model:**
   - Settings → About Phone → Model Number
   - Note exact model (SM-G998B, SM-S918U, etc.)

2. **Download firmware:**
   - Use **SamFirm** or **Frija** tools
   - Match model, region, and build number exactly
   - Download includes: AP, BL, CP, CSC files

#### Step 2: Extract and Patch AP File
1. **Extract AP file** from firmware ZIP
2. **Transfer AP file to device:**
   ```bash
   adb push AP_[model]_[version].tar.md5 /sdcard/Download/
   ```

3. **Install Magisk APK:**
   ```bash
   adb install Magisk-v[version].apk
   ```

4. **Patch AP file in Magisk:**
   - Open Magisk app
   - Tap **Install** → **Select and patch a file**
   - Select the AP file from Downloads
   - Wait for patching completion

5. **Retrieve patched AP:**
   ```bash
   adb pull /sdcard/Download/magisk_patched_[hash].tar ./
   ```

#### Step 3: Flash with Odin
1. **Boot to Download Mode:**
   ```bash
   adb reboot download
   ```

2. **Open Odin as Administrator**
3. **Load firmware files:**
   - **BL:** Original BL file
   - **AP:** Magisk-patched AP file  
   - **CP:** Original CP file
   - **CSC:** Original CSC file

4. **Flash configuration:**
   - **Auto Reboot:** Checked
   - **F. Reset Time:** Checked
   - **Re-Partition:** Unchecked

5. **Click START** and wait for completion

### Method B: Custom Recovery Route

Some Samsung devices support custom recovery installation.

#### Step 1: Install TWRP/OrangeFox
1. **Download recovery image** for exact model
2. **Flash via Odin:**
   - Load recovery.img in AP slot
   - Flash recovery only
   - Boot to recovery immediately

#### Step 2: Install Magisk via Recovery
1. **Transfer Magisk ZIP** to device storage
2. **In recovery:** Install → Select Magisk ZIP
3. **Reboot system**
## Samsung-Specific Troubleshooting

### Knox and Security Issues

#### Knox Status Management
After rooting, Knox security is permanently affected:

**Knox Consequences:**
- **Knox WARRANTY VOID: 0x1** - Cannot be reversed
- **Samsung Pay disabled** - Hardware security compromised
- **Secure Folder broken** - Secure environment unavailable
- **Banking apps detection** - Some may refuse to work

**Mitigation Strategies:**
```bash
# Check current Knox status
adb shell getprop ro.boot.warranty_bit

# Hide root from banking apps using Magisk
# Enable DenyList in Magisk settings
# Add problematic apps to DenyList
```

#### Root Detection Bypass
Samsung devices face enhanced root detection:

**Essential Modules:**
- **Universal SafetyNet Fix** - Bypass Google's SafetyNet
- **MagiskHide Props Config** - Hide device properties
- **Play Integrity Fix** - Modern banking app compatibility
- **Samsung Pay Framework Disabler** - Prevent crashes

### Firmware-Specific Issues

#### AP File Patching Problems
Common issues when patching Samsung firmware:

**Invalid AP File Error:**
- Download firmware again from different source
- Verify file integrity using MD5 checksum
- Try older Magisk version for compatibility

**Magisk Patching Fails:**
```bash
# Alternative method using manual extraction
tar -xf AP_*.tar.md5
# Locate boot.img.lz4 within extracted files
lz4 -d boot.img.lz4 boot.img
# Patch boot.img directly in Magisk
```

#### Odin Flashing Failures
**FAIL (auth)** Error Solutions:
- Ensure bootloader is properly unlocked
- Use exact firmware version matching device
- Enable "OEM Unlocking" in Developer Options

**Device Not Detected:**
- Install Samsung USB drivers properly
- Try different USB ports (prefer USB 2.0)
- Use high-quality USB cable

### One UI Integration Issues

#### Samsung Features After Root
Maintain Samsung functionality post-root:

**S Pen Functionality (Note/Ultra):**
- Install **S Pen SDK module**
- Use **Air Command enhancer**
- Keep **Samsung Notes** updated

**Camera Quality Preservation:**
- **Samsung Camera** may work better than GCAM ports
- Install **Enhanced Camera mods**
- Use **Pro Mode** for manual controls

**Bixby and Samsung Apps:**
- **Disable rather than remove** Samsung apps
- Some system apps required for stability
- Use **Package Disabler** instead of deletion

## Performance Optimization

### Samsung-Specific Optimizations

#### Thermal Management
Samsung devices often have aggressive thermal throttling:

**Recommended Modules:**
- **Thermal Engine Disabler** - Reduce throttling
- **CPU Governor Tuner** - Optimize performance
- **Samsung Optimization Suite** - Device-specific tweaks

#### Battery Life Enhancement
One UI can be optimized for better battery:

**Battery Optimization:**
- **Greenify** with aggressive doze
- **PowerNap** for deep sleep optimization
- **Adaptive Battery Tuner** for One UI
- **Background App Killer** for Samsung apps

#### Gaming Performance
Samsung Gaming Hub integration:

**Gaming Modules:**
- **GameBooster** - Performance optimization
- **Thermal Throttling Disabler** - Sustained performance
- **FPS Unlock** - Higher refresh rates in games

## Alternative Root Methods

### Method C: Heimdall (Linux/macOS)

For non-Windows users, Heimdall provides Samsung flashing:

1. **Install Heimdall:**
   ```bash
   # Ubuntu/Debian
   sudo apt install heimdall-flash
   
   # macOS
   brew install heimdall
   ```

2. **Flash patched boot:**
   ```bash
   heimdall flash --BOOT magisk_patched.img
   ```

### Method D: Custom Recovery First

Some prefer installing custom recovery before rooting:

1. **Flash TWRP/OrangeFox** via Odin
2. **Boot to recovery immediately**
3. **Install Magisk ZIP** through recovery
4. **Advantage:** Easier module management and backups

## Success Verification & Post-Setup

### Root Verification
1. **Open Magisk app** - Should show "Installed" status
2. **Test root access:**
   ```bash
   adb shell su -c "id"
   # Should return: uid=0(root) gid=0(root)
   ```
3. **Install root checker** from Play Store
4. **Configure DenyList** for banking apps

### Essential Post-Root Configuration

**Magisk Settings:**
- **Enable Zygisk** for module compatibility
- **Configure DenyList** to hide root from sensitive apps
- **Install core modules:** SafetyNet Fix, Play Integrity Fix
- **Set up automatic updates** for Magisk and modules

**Samsung-Specific Setup:**
- **Backup EFS partition** using TWRP (if installed)
- **Configure thermal management** modules
- **Set up Samsung Pay alternatives** (GPay, other NFC payment)
- **Test all Samsung features** (Camera, S Pen, etc.)

## Staying Updated

### OTA Update Handling
Samsung OTA updates require careful management with root:

**Before Samsung Update:**
```bash
# Method 1: Magisk uninstall (recommended)
# Open Magisk → Uninstall → Restore Images

# Method 2: Flash stock AP
# Use Odin to flash original AP file
```

**After Update:**
1. **Download new firmware** matching updated build
2. **Extract new AP file**
3. **Patch with Magisk** and flash via Odin
4. **Re-configure all modules** and settings

### Community Resources
- **[Samsung XDA Forums](https://forum.xda-developers.com/c/samsung.12063/)** - Device-specific development
- **[One UI Mods Community](https://t.me/oneuimods)** - Samsung customization
- **[r/GalaxyS24](https://reddit.com/r/GalaxyS24)** - Latest device discussions
- **[Samsung Firmware Database](https://samfrew.com/)** - Firmware downloads

---

::: tip 💡 Samsung Root Success Tips
**Best Practices:**
- Samsung devices require patience due to Knox complexity
- Always use exact firmware matching your device
- Knox trip is permanent - accept this before starting
- Custom ROMs can restore some lost Samsung features
- Backup EFS partition for IMEI/baseband recovery
:::

**Need more help?** Visit our **[FAQ section](../faqs.md)** or check the **[main rooting guide](./index.md)** for additional troubleshooting and advanced techniques.
3. In **Options** tab: **UNCHECK Auto Reboot** ⚠️
4. Device should appear in Odin (blue box with port info)

**Load Firmware Files:**
1. **BL:** Select `BL_...tar.md5` file
2. **AP:** Select `magisk_patched-[version].tar` file ⚠️
3. **CP:** Select `CP_...tar.md5` file  
4. **CSC:** Select `CSC_...tar.md5` file (NOT HOME_CSC!)

**Flash Firmware:**
1. All files loaded? Device detected? Click **Start**
2. Wait for green **PASS** message
3. **Do NOT let device reboot automatically**

### Step 6: Factory Reset (MANDATORY!)

> **🔥 This is the most important step for System-as-Root devices!**

**Enter Recovery Mode:**
1. Unplug USB cable
2. Hold **Power** + **Volume Down** to force shutdown
3. When screen goes black, **immediately** switch to:
4. Hold **Power** + **Volume Up** until recovery appears

**Perform Factory Reset:**
1. Use **Volume buttons** to navigate, **Power** to select
2. Select **Wipe data/factory reset**
3. Confirm the reset
4. After completion, select **Reboot system now**

### Step 7: Finalize Root Installation

**Complete Setup:**
1. Device boots to "Welcome" screen again
2. Complete initial setup (connect to Wi-Fi)
3. Copy `Magisk.apk` to device and install again

**Verify Root:**
1. Open **Magisk** app
2. You may see "Additional Setup Required" - tap **OK**
3. App will finish setup and reboot device
4. After reboot, open Magisk again
5. If you see green checkmarks, **congratulations!** 🎉

---

## Troubleshooting

### Common Issues & Solutions

**"OEM unlocking" option is missing**
- **Cause:** Device has locked bootloader (common on US carriers)
- **Solution:** Unfortunately, no workaround exists. Consider international variants.

**Odin doesn't detect my device**
- **Cause:** Driver issues or faulty connection
- **Solutions:**
  1. Reinstall Samsung USB drivers as administrator
  2. Try different USB port (preferably USB 2.0)
  3. Use different USB cable
  4. Check Device Manager for driver issues

**Device stuck in bootloop**
- **Cause:** Incorrect flashing or skipped steps
- **Solutions:**
  1. Enter Download Mode and flash original firmware
  2. Use CSC file (not HOME_CSC) to force factory reset
  3. Ensure all firmware files match your device model

**"FAIL!" message in Odin**
- **Cause:** Wrong firmware or corrupted files
- **Solutions:**
  1. Re-download firmware from Samsung servers
  2. Verify all files are for your exact model
  3. Check file integrity (re-download if needed)

**Root not working after following all steps**
- **Cause:** Skipped factory reset in recovery
- **Solutions:**
  1. Boot to recovery mode manually
  2. Perform factory reset (this is mandatory!)
  3. Magisk requires this step to finalize installation

**Banking apps not working**
- **Cause:** Root detection (expected behavior)
- **Solutions:**
  1. Enable **Zygisk** in Magisk settings
  2. Configure **DenyList** for banking apps
  3. Some apps may still detect root regardless

### Emergency Recovery

**Device Won't Boot:**
1. Download original firmware for your model
2. Enter Download Mode: Power + Vol Up + Vol Down + USB
3. Flash all original files with Odin (enable Auto Reboot)
4. This will restore device to factory state

**Lost Download Mode:**
- If Download Mode is inaccessible, device may need professional repair
- Contact Samsung service or local repair shop

## FAQ

**Q: Will this void my warranty?**
A: Yes, permanently. Knox counter will trip and cannot be reset.

**Q: Can I still receive OTA updates?**
A: OTA updates will fail on rooted devices. You'll need to manually flash updates.

**Q: What happens to Samsung Pay?**
A: Samsung Pay will permanently stop working once Knox is tripped.

**Q: Can I unroot my device?**
A: Yes, but Knox will remain tripped. Flash original firmware to remove root.

**Q: Which Samsung models support bootloader unlock?**
A: International models usually work. US carrier models (VZW, ATT, TMB) are typically locked.

**Q: Is rooting illegal?**
A: No, rooting is legal but voids warranty. Some countries have right-to-repair laws.

**Q: Can I brick my device?**
A: Yes, if done incorrectly. Always follow steps precisely and have recovery plan.

**Q: What's the difference between root and custom ROM?**
A: Root gives admin access to stock firmware. Custom ROM replaces the entire system.

---

## Additional Resources

### **Essential Samsung Resources:**

**Official Samsung Support:**
- **[Samsung Members](https://www.samsung.com/us/support/mobile-devices/)** - Official Samsung support community  
- **[Samsung Smart Switch](https://www.samsung.com/us/support/owners/app/smart-switch)** - Data transfer and backup tool
- **[Samsung Find My Mobile](https://www.samsung.com/us/support/mobile-devices/samsung-find-my-mobile/)** - Device tracking and remote wipe

**Development Communities:**
- **[Samsung XDA Forums](https://forum.xda-developers.com/c/samsung.12021/)** - Device-specific development discussions
- **[r/GalaxyS](https://www.reddit.com/r/GalaxyS/)** - Samsung Galaxy Reddit community
- **[Samsung Developer Portal](https://developer.samsung.com/)** - Official development resources

**Firmware & Tools:**
- **[SamMobile](https://www.sammobile.com/)** - Samsung firmware downloads and news
- **[SamFirm](https://www.sammobile.com/samsung-firmware/)** - Firmware download tool
- **[ODIN Download](https://odindownload.com/)** - Official Samsung flashing tool
- **[Heimdall](https://glassechidna.com.au/heimdall/)** - Open-source alternative to ODIN

### **Recovery & Backup:**

**Custom Recovery:**
- **[TWRP](https://twrp.me/)** - Team Win Recovery Project
- **[OrangeFox](https://orangefox.download/)** - Modern recovery with additional features
- **[SKYHAWK](https://skyhawkrecovery.github.io/)** - Lightweight recovery option

**Backup Solutions:**
- **[Swift Backup](https://play.google.com/store/apps/details?id=org.swiftapps.swiftbackup)** - Modern backup solution
- **[Neo Backup](https://github.com/NeoApplications/Neo-Backup)** - Open-source backup tool

---

**� Related Guides:**
- **[🔓 Bootloader Unlocking Guide](./how-to-unlock-bootloader.md)**
- **[🛠️ Custom Recovery Installation](./how-to-install-custom-recovery.md)**
- **[❓ FAQ & Troubleshooting](../faqs.md)**
- **[📖 Complete Rooting Master Guide](./index.md)**

---