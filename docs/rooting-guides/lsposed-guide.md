---
layout: doc
title: Complete LSPosed Framework Guide
description: "Master LSPosed framework - the modern Xposed implementation. Comprehensive installation guide with module management and customization."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/android-root-guides/lsposed-guide
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Complete LSPosed Framework Guide - Modern Xposed Implementation
  - - meta
    - property: og:description
      content: Install LSPosed framework with our comprehensive guide. Modern Xposed implementation with Zygisk integration and advanced module management.
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/android-root-guides/lsposed-guide
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/lsposed-guide.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Complete LSPosed Framework Guide
  - - meta
    - name: twitter:description
      content: Modern Xposed framework implementation with LSPosed. Advanced Android customization and module management.
  - - meta
    - name: keywords
      content: lsposed guide, xposed framework, zygisk modules, lsposed installation, android customization, xposed modules
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Customization
  - - meta
    - property: article:tag
      content: LSPosed
  - - meta
    - property: article:tag
      content: Xposed Framework
  - - meta
    - property: article:tag
      content: Android Customization
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: article:tag
      content: Android Customization
  - - meta
    - property: article:tag
      content: Zygisk
  - - meta
    - name: robots
      content: index, follow
---

# Complete LSPosed Framework Guide

The modern Xposed implementation for Android 8.1-15. Master LSPosed Framework for advanced app modifications and system customization without touching system partitions.

## Essential Resources

- [Main Rooting Guide](./index.md) - Universal rooting principles and device preparation
- [Magisk Guide](./magisk-guide.md) - Required root solution with Zygisk support
- [KernelSU Guide](./kernelsu-guide.md) - Alternative kernel-based root (experimental LSPosed support)
- [Custom Recovery Guide](./how-to-install-custom-recovery.md) - Alternative installation method
- [Root Apps Collection](../apps-and-modules/index.md) - Popular LSPosed modules directory
- [FAQ](../faqs.md) - Frequently asked questions
- [Troubleshooting Guide](../faqs.md#troubleshooting) - Common issue solutions

## What is LSPosed?

LSPosed is the modern successor to the classic Xposed framework, completely redesigned for Android 8.1+ with focus on stability, performance, and compatibility. It leverages Zygisk (Magisk) or KernelSU to hook into Android system and apps without modifying system partitions, **enabling powerful modifications while maintaining SafetyNet/Play Integrity compatibility when configured properly.**

### Key Features

**Modern Architecture**
- Zygisk-based hooking - Runs securely inside Magisk's Zygisk module system
- KernelSU support - Experimental compatibility with kernel-based root

**Compatibility & Performance**
- Android support - 8.1 (Oreo) through 16 (current)
- Minimal overhead - Lightweight implementation with negligible battery impact

**Module Ecosystem**
- Modern API - Compatible with latest Xposed module standards
- Repository access - Official LSPosed module repository integration

### LSPosed vs Classic Xposed

| Feature | LSPosed (Modern) | Classic Xposed |
|---------|------------------|----------------|
| Android support | 8.1 to 15+ | 4.0 to 8.1 |
| Installation method | Magisk/Zygisk module | System modification |
| OTA compatibility | Survives updates | Requires reinstall |
| SafetyNet/Integrity | Hideable with Magisk | Detectable |
| Module scoping | Per-app control | System-wide only |
| Development status | Active (JingMatrix fork) | Discontinued |
| Performance impact | Minimal | Moderate |

## Prerequisites

### Mandatory Requirements

> [!IMPORTANT]
> LSPosed will NOT work without these requirements met. Do not proceed until all are satisfied.

**Root Access**
- Magisk 30+ with Zygisk enabled (recommended)
- KernelSU latest version (experimental, limited compatibility)

**Android Version**
- Android 8.1 (Oreo) minimum
- Android 9-15 (full feature support)
- Android 16 (latest builds, may have module compatibility issues)

### Magisk Configuration Checklist

**Required Settings**
- Magisk version - 24.0 or newer (26.4+ recommended for Android 14+)
- Zygisk - Must be enabled in Magisk settings
- Magisk Hide/DenyList - Optional, for hiding root from specific apps
- Systemless installation - Magisk should be installed via patched boot image

**Verification Commands**

```bash
# Check Magisk version
su -c "magisk --version"
# Should return 26400 or higher (26.4)

# Verify Zygisk status
su -c "magisk --status | grep Zygisk"
# Should show "Zygisk: enabled"

# Check Magisk installation type
su -c "magisk --path"
# Should return /data/adb/magisk

# Verify root access
su -c "id"
# Should show "uid=0(root)"
```

### KernelSU Configuration (Experimental)

::: warning KernelSU Compatibility
LSPosed support for KernelSU is experimental. Many modules may not work correctly. Use Magisk + Zygisk for best compatibility.
:::

**KernelSU Requirements**
- KernelSU kernel installed (GKI or LKM mode)
- KernelSU Manager app installed
- Root access verified
- SELinux properly configured

**Known Limitations with KernelSU**
- Some modules fail to load
- Resource hooks may not work
- System framework hooks unstable
- Limited community support

## Device Compatibility

- ✅ **Supported:** Pixel, Nexus, OnePlus, Samsung (stock OneUI), AOSP-based ROMs
- ⚠️ **Limited:** MIUI, EMUI (especially older versions)
- ❌ **Not Supported:** Android Go, Fire OS


### ROM Compatibility

| ROM Type | Compatibility | Notes |
|----------|--------------|-------|
| Stock Android (Google) | Excellent | Best compatibility |
| AOSP-based ROMs | Excellent | LineageOS, PixelOS, etc. |
| OneUI (Samsung) | Good | Works with Magisk + Zygisk |
| OxygenOS (OnePlus) | Good | ColorOS base also works |
| MIUI/HyperOS (Xiaomi) | Moderate | Some modules incompatible |
| Nothing OS | Good | Growing compatibility |
| Custom GSI | Variable | Depends on implementation |
| GrapheneOS | Poor | Security restrictions conflict |
| CalyxOS | Good | Works with microG |

---

## Installation Guide

> [!WARNING]
> **⚠️ Important Note:**
> We use the [JingMatrix LSPosed fork](https://github.com/JingMatrix/LSPosed) as the original LSPosed project is no longer maintained. JingMatrix's fork provides continued updates for Android 14-15 and bug fixes.


### Method 1: Magisk Manager Installation (Recommended)

**Best for**: Most users, easiest method, automatic updates

#### Step 1: Enable Zygisk

1. **Open Magisk Manager** app
2. **Tap the gear icon** (Settings) in the top right
3. **Scroll to "Zygisk"** section
4. **Enable the Zygisk toggle** (it will turn blue)
5. **Magisk will prompt for reboot** - tap "Reboot" button
6. **Wait for device to restart** (1-2 minutes)

**Verification After Reboot**

```bash
# Via ADB
adb shell su -c "magisk --status | grep Zygisk"
# Should show: Zygisk: enabled

# Via Terminal Emulator (on device)
su
magisk --status | grep Zygisk
```

#### Step 2: Download LSPosed Module

**Option A: GitHub Actions (Latest Builds)**

1. Visit [LSPosed GitHub Actions](https://github.com/JingMatrix/LSPosed/actions/workflows/core.yml?query=branch%3Amaster)
2. Click the **latest successful workflow run** (green checkmark)
3. Scroll to **"Artifacts"** section
4. Download **"LSPosed-master-[version]-release.zip"**
5. Transfer to device if downloaded on PC

**Option B: GitHub Releases (Stable)**

1. Visit [LSPosed Releases](https://github.com/JingMatrix/LSPosed/releases)
2. Download **latest release ZIP** (e.g., LSPosed-v1.9.2-7024-zygisk-release.zip)
3. Verify it says **"zygisk"** in filename (not riru)

**Version Selection**
- **Zygisk version** - For Magisk 24.0+ (recommended)
- **Riru version** - Legacy, deprecated, DO NOT use
- **KernelSU version** - Experimental, for KernelSU only

#### Step 3: Install LSPosed Module

1. **Open Magisk Manager** app
2. **Tap "Modules"** tab at bottom
3. **Tap "Install from storage"** button
4. **Navigate to downloaded LSPosed ZIP**
5. **Select the ZIP file**
6. **Wait for installation** - Will show console output:
   ```
   - Installing LSPosed
   - Extracting module files
   - Setting up Zygisk module
   - Installation complete
   ```
7. **Tap "Reboot"** button when prompted
8. **Device will restart** (2-3 minutes for first boot)

#### Step 4: Verify Installation

**Check for LSPosed Notification**

After reboot, you should see:
- Notification from LSPosed in status bar
- Notification says "LSPosed is activated"
- Tapping opens LSPosed Manager

**If No Notification Appears**

```bash
# Check if LSPosed module is loaded
adb shell su -c "ls -la /data/adb/modules/lsposed*"
# Should show lsposed module directory

# Check LSPosed daemon
adb shell su -c "ps -ef | grep lspd"
# Should show lspd process running

# Check Zygisk status again
adb shell su -c "magisk --status"
# Verify Zygisk still enabled
```

#### Step 5: Open LSPosed Manager

1. **Tap the LSPosed notification** (if visible)
   - OR -
2. **Find "LSPosed" app** in app drawer
3. **Grant root permission** when prompted
4. **Manager will open** showing main dashboard

**LSPosed Manager Interface**

- **Modules tab** - Installed modules list
- **Logs tab** - System and module logs for debugging
- **Settings tab** - LSPosed configuration
- **Repository tab** - Official module repository (if connected)

### Method 2: Custom Recovery Installation

**Best for**: Devices without Magisk Manager access, advanced users

#### Prerequisites

- TWRP, OrangeFox, or LineageOS Recovery installed
- LSPosed ZIP downloaded (see Method 1, Step 2)
- Magisk already installed and Zygisk enabled

#### Installation Steps

1. **Boot to custom recovery**
   ```bash
   # Via ADB
   adb reboot recovery
   
   # Via Power Menu (if available)
   # Power + Volume Up (or device-specific combo)
   ```

2. **Navigate to Install section**
   - TWRP: Tap "Install"
   - OrangeFox: Tap "Install"
   - LineageOS Recovery: "Apply update" > "Apply from ADB"

3. **Select LSPosed ZIP**
   - Browse to downloaded ZIP location
   - Tap the ZIP file
   - Swipe to confirm flash (TWRP/OrangeFox)

4. **Flash process**
   ```
   Installing zip file...
   - Detecting installation environment
   - Installing LSPosed Zygisk module
   - Setting up daemon
   - Installation successful
   ```

5. **Reboot system**
   - Tap "Reboot System" button
   - Do NOT wipe cache/dalvik (unnecessary)

6. **Verify** - Follow Method 1, Step 4 verification

### Method 3: KernelSU Installation (Experimental)

::: warning Experimental Feature
KernelSU support is experimental. Expect module incompatibilities and instability. Only use if you specifically need KernelSU over Magisk.
:::

#### Prerequisites

- KernelSU kernel installed (GKI or LKM mode)
- KernelSU Manager app working
- Root access verified

#### Installation Steps

1. **Download KernelSU-specific LSPosed build**
   - Visit [LSPosed KernelSU releases](https://github.com/JingMatrix/LSPosed/releases)
   - Download **"kernelsu"** version (NOT zygisk)

2. **Install via KernelSU Manager**
   - Open KernelSU Manager
   - Go to Modules section
   - Install from storage
   - Select LSPosed ZIP
   - Reboot

3. **Verify installation**
   ```bash
   # Check KernelSU module
   su -c "ksud module list"
   # Should show lsposed in list
   ```

**Known Issues with KernelSU**
- Resource hooks may fail
- Some modules crash on launch
- System framework hooks unstable
- Limited community support

---

## First-Time Setup & Configuration

### Initial Configuration Wizard

After first opening LSPosed Manager:

#### Step 1: Grant Root Permission

- **LSPosed requests root access**
- **Tap "Grant" or "Allow"** in Magisk/KernelSU prompt
- **Permanent grant recommended** (check "Remember choice")

#### Step 2: Enable Essential Features

**Navigate to Settings Tab**

1. **Enable resources hook**
   - Required for: UI theming modules, icon packs, font changers
   - Toggle ON (recommended)

2. **Enable verbose logs**
   - Required for: Troubleshooting module issues
   - Toggle ON (recommended for setup, can disable later)

3. **Enable modules for system framework**
   - Required for: System-level modifications
   - Toggle ON if you plan to use system-modifying modules
   - Warning: Can cause bootloops if module misbehaves

4. **Manager protection**
   - Optional: Enable biometric lock for LSPosed Manager
   - Optional: Hide manager icon from launcher

#### Step 3: Configure Manager Shortcut

**Create Quick Access**

- **Settings** > **Manager shortcut**
- **Options:**
  - Notification - Persistent notification for quick access
  - Launcher icon - Traditional app launcher icon
  - Both - Maximum accessibility

**Notification Configuration**

If enabled:
- Shows in notification bar
- Quick tap to open manager
- Can configure priority (silent or alerting)

### Verify Installation Status

#### Check Dashboard

**Open LSPosed Manager** > **Home tab**

**Status Indicators**
- LSPosed version (e.g., v1.9.2)
- Zygisk status (should show "Active")
- API level (Android version)
- Magisk version

### Configure Advanced Settings

#### Scope Management Defaults

**Settings** > **Default scope behavior**

- **System framework** - Apply modules to Android system (risky)
- **All apps** - Apply modules globally (not recommended)
- **Manual selection** - Per-app control (recommended)

#### Module Update Settings

**Settings** > **Module repository**

- **Auto-check updates** - Daily update checking
- **Update notifications** - Alert when module updates available
- **Repository mirrors** - Select fastest server

---

## Installing & Managing Modules

### Module Sources & Safety

#### Official Sources (Recommended)

**1. LSPosed Repository**
- Built-in to LSPosed Manager
- Verified modules only
- Automatic update notifications
- Access: LSPosed Manager > Repository tab

**2. GitHub Releases**
- Developer official releases
- Verify repository authenticity
- Check release signatures
- Examples: ChromeXt, QAuxiliary, WA Enhancer

**3. XDA Developers Forums**
- Community-vetted modules
- Developer support threads
- User feedback and reviews

#### Unofficial Sources (Use with Caution)

::: warning Source Safety
Only install modules from trusted developers. Malicious modules can:
- Steal passwords and credentials
- Log sensitive information
- Cause system instability
- Brick devices if system-modifying
:::


### Installation Methods

#### Method 1: LSPosed Repository (Easiest)

1. **Open LSPosed Manager** > **Repository tab**
2. **Browse or search** for modules
3. **Tap module** to view details
   - Description
   - Compatibility
   - Permissions
   - User reviews
4. **Tap "Install"** button
5. **Grant installation permission** (if first time)
6. **Module installs** automatically
7. **Enable module** (toggle switch)
8. **Configure scope** (select target apps)
9. **Reboot if required** (usually needed)

**Repository Features**
- Category browsing (Customization, Privacy, Tweaks, etc.)
- Search function
- Update notifications
- Compatibility filtering (Android version)

#### Method 2: Manual APK Installation

**Best for**: Modules not in repository, beta versions, custom builds

1. **Download module APK**
   - GitHub releases
   - Developer website
   - XDA thread

2. **Install APK**
   ```bash
   # Via ADB
   adb install module.apk
   
   # Or on device
   # File manager > Tap APK > Install
   ```

3. **Open LSPosed Manager** > **Modules tab**
4. **Module appears** in list automatically
5. **Enable module** (toggle ON)
6. **Configure scope** (tap module)
7. **Reboot device**


### Scope Configuration

**Scope** determines which apps a module affects. Proper scope configuration prevents conflicts and improves stability.

#### Scope Types

**1. System Framework**
- Affects Android system itself
- Required for: System UI mods, global theming, system tweaks
- Risk: High (bootloops possible)
- Use for: Modules that must modify system behavior

**2. Specific Apps**
- Affects only selected apps
- Required for: App-specific mods (WhatsApp, Instagram, etc.)
- Risk: Low (only affects target app)
- Use for: Most modules (recommended)

**3. All Apps (Global)**
- Affects every installed app
- Required for: Rare cases (global ad blocking, etc.)
- Risk: High (conflicts, crashes, performance issues)
- Use for: Only when explicitly required

#### How to Configure Scope

1. **Open LSPosed Manager** > **Modules tab**
2. **Tap the module** you want to configure
3. **Tap "Application Scope"** section
4. **Select target apps:**
   - **Search bar** - Find apps quickly
   - **System apps** - Toggle to show/hide
   - **Checkboxes** - Select multiple apps
5. **Tap back** to save

**Scope Configuration Example (WhatsApp Module)**
- Enable: WhatsApp (com.whatsapp)
- Enable: WhatsApp Business (com.whatsapp.w4b)
- Disable: System Framework
- Disable: All other apps

#### Scope Best Practices

**Performance Optimization**
- Only enable scope for necessary apps
- Avoid system framework unless required
- Never use "all apps" scope without good reason

**Stability Management**
- Test modules on one app first
- Expand scope gradually
- Disable problematic apps from scope

**Troubleshooting with Scope**
- If module doesn't work: Verify correct app selected
- If app crashes: Remove from module scope temporarily
- If system unstable: Disable system framework scope

### Module Management

#### Enable/Disable Modules

**Toggle Individual Modules**
1. **LSPosed Manager** > **Modules tab**
2. **Locate module** in list
3. **Tap toggle switch** (right side)
   - ON = Module active after reboot
   - OFF = Module inactive
4. **Reboot device** to apply

**Batch Operations**
- Long-press module for options
- Select multiple modules
- Enable/disable selected
- Uninstall selected

#### Update Modules

**Automatic Updates (Repository Modules)**
1. **LSPosed Manager** > **Repository tab**
2. **"Updates" section** shows available updates
3. **Tap "Update" button** for each module
4. **Or "Update All"** for batch updates
5. **Reboot after updates**

**Manual Updates**
1. Download new APK from source
2. Install over existing module
3. LSPosed detects update
4. Reboot to apply

#### Uninstall Modules

**Method 1: Via LSPosed Manager**
1. **Modules tab** > Long-press module
2. **Select "Uninstall"**
3. **Confirm uninstall**
4. **Reboot device**

**Method 2: Via System Settings**
1. **Settings** > **Apps**
2. **Find module app**
3. **Tap "Uninstall"**
4. **LSPosed auto-detects** removal
5. **Reboot device**

---

## Troubleshooting

### Installation Issues

<details><summary>Click to expand</summary>

#### LSPosed Not Appearing After Install

**Symptom:** Module installed in Magisk, but no LSPosed notification

**Diagnosis:**
```bash
# Check if module installed
adb shell su -c "ls /data/adb/modules/ | grep lsposed"

# Check Zygisk status
adb shell su -c "magisk --status | grep Zygisk"

# Check for errors in Magisk log
adb shell su -c "cat /cache/magisk.log | grep lsposed"
```

**Solutions:**

**Solution 1: Verify Zygisk**
1. Open Magisk Manager
2. Settings > Zygisk > Ensure enabled
3. Reboot device
4. Check for LSPosed notification

**Solution 2: Reinstall Module**
1. Magisk Manager > Modules
2. Remove LSPosed module
3. Reboot
4. Install LSPosed again
5. Reboot

**Solution 3: Clear Magisk Cache**
```bash
adb shell su -c "rm -rf /data/adb/magisk/*cache*"
adb reboot
```

**Solution 4: Check Module Version**
- Ensure you downloaded Zygisk version (not Riru)
- Verify Android version compatibility
- Try different release version

#### LSPosed Manager Won't Open

**Symptom:** Notification appears but tapping does nothing

**Solutions:**

**Solution 1: Force Stop and Clear Cache**
```bash
# Stop manager
adb shell am force-stop org.lsposed.manager

# Clear cache
adb shell pm clear org.lsposed.manager

# Try opening again
adb shell am start -n org.lsposed.manager/.ui.activity.MainActivity
```

**Solution 2: Reinstall Manager**
1. Uninstall manager app (keep module)
2. Reboot
3. Reinstall from notification

**Solution 3: Check Permissions**
- Settings > Apps > LSPosed Manager
- Ensure notification permission granted
- Ensure root permission granted in Magisk

</details>

### Module Loading Issues

<details><summary>Click to expand</summary>

#### Modules Not Working After Enable

**Symptom:** Module enabled, but features don't work

**Diagnosis Checklist:**
- [ ] Module enabled in LSPosed Manager
- [ ] Scope configured correctly (target apps selected)
- [ ] Device rebooted after enable
- [ ] Module compatible with Android version
- [ ] No conflicting modules

**Solutions:**

**Solution 1: Verify Scope**
1. LSPosed Manager > Modules
2. Tap problematic module
3. Check "Application Scope"
4. Ensure target app is checked
5. Save and reboot

**Solution 2: Check Module Logs**
1. LSPosed Manager > Logs tab
2. Filter by module package
3. Look for errors:
   - "ClassNotFoundException" - Module incompatible
   - "MethodNotFoundException" - App updated, module outdated
   - "SecurityException" - Permission issue

**Solution 3: Reinstall Module**
```bash
# Uninstall module
adb shell pm uninstall com.example.module

# Clear module data
adb shell su -c "rm -rf /data/data/com.example.module"

# Reinstall from source
# Enable and configure again
```

**Solution 4: Test on Different App Version**
- If possible, try older app version
- Or wait for module update
- Check module XDA/GitHub for known issues

#### Module Causes App Crashes

**Symptom:** App crashes immediately after module enabled

**Solutions:**

**Solution 1: Disable Module for Specific App**
1. LSPosed Manager > Modules
2. Tap crashing module
3. Remove problematic app from scope
4. Reboot

**Solution 2: Safe Mode Boot**
```bash
# Boot to safe mode (disables all modules)
# Method varies by device

# Via ADB
adb reboot recovery
# In recovery, select "Reboot to safe mode"

# Or disable in recovery
# Mount system
# Delete module: rm -rf /data/data/com.example.module
```

**Solution 3: Incremental Scope Testing**
1. Remove all apps from module scope
2. Add one app at a time
3. Test each addition
4. Identify problematic app

</details>

### System Stability Issues

<details><summary>Click to expand</summary>

#### Bootloop After Enabling Module

**Symptom:** Device continuously reboots, can't reach home screen

::: danger Critical Issue
Bootloops require immediate action to prevent data loss or extended downtime.
:::

**Emergency Recovery Steps:**

**Step 1: Boot to Recovery**
- Power off device (hold power 10+ seconds)
- Boot to recovery (device-specific combo)
  - Most Android: Power + Volume Down/Up
  - Pixel: Power + Volume Down, select Recovery

**Step 2: Disable LSPosed Modules**

**Method A: Via Recovery File Manager (TWRP)**
```bash
# Navigate to:
/data/adb/modules/lsposed/

# Rename folder to disable:
mv lsposed lsposed.disabled

# Or delete module:
rm -rf lsposed
```

**Method B: Via Recovery ADB**
```bash
# Connect device to PC
adb devices

# Disable all modules
adb shell rm -rf /data/adb/modules/*/

# Or just LSPosed
adb shell rm -rf /data/adb/modules/lsposed/

# Reboot
adb reboot
```

**Method C: Via Recovery Terminal**
```bash
# Mount system
mount /system
mount /data

# Disable problematic module
cd /data/data/
rm -rf com.example.problematic.module

# Or disable LSPosed entirely
rm -rf /data/adb/lspd/
```

**Step 3: Boot and Diagnose**
1. Device should boot normally
2. Open LSPosed Manager
3. Check Logs tab for cause
4. Re-enable modules one by one
5. Identify culprit

**Prevention:**
- Always keep recovery access available
- Enable system framework modules cautiously
- Test new modules individually
- Keep backup of working configuration

#### Sluggish Performance

**Symptom:** Device slower after installing LSPosed/modules

**Diagnosis:**
```bash
# Check CPU usage
adb shell top -n 1 | grep lspd

# Check memory usage
adb shell dumpsys meminfo | grep lsposed

# Check module impact
adb shell ps -A | grep -E "lspd|com.example.module"
```

**Solutions:**

**Solution 1: Reduce Module Count**
- Disable non-essential modules
- Combine functionality where possible
- Monitor performance after each disable

**Solution 2: Optimize Module Scope**
- Reduce number of apps in each module's scope
- Remove system apps from scope unless necessary
- Use app-specific modules instead of global ones

**Solution 3: Disable Resource Hooks**
- If not using theming modules:
  - Settings > Disable "Enable resources hook"
  - Reboot

**Solution 4: Check for Rogue Modules**
```bash
# Monitor CPU per module
adb shell top -d 1 | grep -E "lsposed|module"

# High CPU usage indicates problematic module
# Disable and test
```

</details>

### App Compatibility Issues

<details><summary>Click to expand</summary>

#### Banking Apps Not Working

**Symptom:** Banking/payment apps detect root and refuse to run

**Root Cause:** Apps use Play Integrity API to detect:
- Unlocked bootloader
- Root access
- Modified system
- LSPosed framework

**Solutions:**

**Solution 1: Magisk DenyList**
1. Magisk Manager > Settings
2. Enable "Enforce DenyList"
3. Configure DenyList > Add banking apps
4. Reboot
5. Test banking app

**Solution 2: Shamiko Module**
```bash
# Download Shamiko from GitHub
# https://github.com/LSPosed/LSPosed.github.io/releases

# Install via Magisk Manager
# Reboot

# Shamiko hides Magisk from apps
```

**Solution 3: Exclude from LSPosed**
- Ensure banking apps NOT in any module scope
- Check all modules, remove if listed
- Some apps detect LSPosed presence alone

**Solution 4: Play Integrity Fix Module**
```bash
# Warning: May violate app ToS
# https://github.com/chiteroman/PlayIntegrityFix

# Install module
# Configure device profile
# Test app
```

::: warning Legal & ToS Notice
Bypassing app security measures may violate Terms of Service and local laws. Use at your own risk. Consider maintaining a non-rooted device/profile for critical apps.
:::

**Solution 5: Dual Profile/Island**
- Use work profile or app cloner
- Install banking app in isolated profile
- Profile won't have root access

</details>

### Manager & Configuration Issues

<details><summary>Click to expand</summary>

#### Lost Access to Manager

**Symptom:** LSPosed Manager icon missing, notification gone

**Solutions:**

**Solution 1: Launch via ADB**
```bash
# Direct launch
adb shell am start -n org.lsposed.manager/.ui.activity.MainActivity

# Or via notification
adb shell am start -a android.intent.action.VIEW -d lsposed://
```

**Solution 2: Reinstall Manager**
```bash
# Keep module, just reinstall app
# Download manager APK from GitHub
adb install -r lsposed-manager.apk

# Reboot
adb reboot
```

**Solution 3: Check Notification Settings**
- Settings > Apps > LSPosed
- Notifications > Ensure enabled
- Allow persistent notifications

#### Settings Not Saving

**Symptom:** Configuration changes don't persist after reboot

**Solutions:**

**Solution 1: Clear Manager Data**
```bash
# Warning: Resets all LSPosed configuration
adb shell pm clear org.lsposed.manager

# Reconfigure from scratch
```

**Solution 2: Check SELinux**
```bash
# Check SELinux mode
adb shell getenforce
# Should return: Permissive or disabled

# If Enforcing, LSPosed may have issues
# Some ROMs enforce strict SELinux
```

**Solution 3: Reinstall LSPosed**
1. Export module list (screenshot)
2. Uninstall all modules
3. Remove LSPosed from Magisk
4. Reboot
5. Reinstall LSPosed
6. Reinstall modules
7. Reconfigure

</details>

---

## Uninstallation

### Complete Removal

#### Method 1: Magisk Manager (Recommended)

1. **Open Magisk Manager** app
2. **Navigate to Modules** tab
3. **Find "LSPosed" module**
4. **Tap trash icon** or three-dot menu > Remove
5. **Confirm removal**
6. **Reboot device**

**Verification:**
```bash
# Check module removed
adb shell su -c "ls /data/adb/modules/ | grep lsposed"
# Should return nothing
```

#### Method 2: Manual Removal via ADB

```bash
# Remove LSPosed module
adb shell su -c "rm -rf /data/adb/modules/lsposed*"

# Remove LSPosed daemon
adb shell su -c "rm -rf /data/adb/lspd"

# Remove LSPosed configuration
adb shell su -c "rm -rf /data/misc/lspd"

# Reboot
adb reboot
```

#### Method 3: Recovery Removal

1. **Boot to TWRP/OrangeFox** recovery
2. **Navigate to Advanced** > **File Manager**
3. **Go to /data/adb/modules/**
4. **Delete lsposed folder**
5. **Go to /data/adb/**
6. **Delete lspd folder**
7. **Reboot system**

### Remove Individual Modules

#### Via LSPosed Manager

1. **Open LSPosed Manager**
2. **Modules tab** > Long-press module
3. **Select "Uninstall"**
4. **Confirm**
5. **Reboot** (if prompted)

#### Via System Settings

1. **Settings** > **Apps**
2. **Find module** (e.g., "WA Enhancer")
3. **Tap module** > **Uninstall**
4. **LSPosed auto-detects** removal
5. **Reboot device**

#### Via ADB

```bash
# Uninstall specific module
adb shell pm uninstall com.example.module

# Remove module data
adb shell su -c "rm -rf /data/data/com.example.module"

# Clear module from LSPosed cache
adb shell su -c "rm -rf /data/adb/lspd/cache/com.example.module*"

# Reboot
adb reboot
```

### Clean Module Data

After uninstalling modules, clean residual data:

```bash
# Remove all module data directories
adb shell su -c "find /data/data -name '*xposed*' -exec rm -rf {} +"

# Clear LSPosed cache
adb shell su -c "rm -rf /data/adb/lspd/cache/*"

# Clear LSPosed logs
adb shell su -c "rm -rf /data/adb/lspd/log/*"
```

### Verify Complete Removal

```bash
# Check for LSPosed module
adb shell su -c "ls /data/adb/modules/"
# Should NOT show lsposed

# Check for daemon
adb shell su -c "ps -ef | grep lspd"
# Should return nothing

# Check for manager app
adb shell pm list packages | grep lsposed
# Should return nothing if uninstalled

# Check Magisk modules list
# Magisk Manager > Modules
# Should NOT show LSPosed
```

---

## Next Steps

### Expand Your Setup

**After Mastering LSPosed:**
1. [Custom ROM Installation](./custom-rom-installation.md) - Full system replacement
2. [Magisk Modules Guide](./magisk-guide.md) - System-level modifications
3. [KernelSU Guide](./kernelsu-guide.md) - Kernel-based root alternative
4. [Root Apps Collection](../apps-and-modules/index.md) - 300+ tested apps and modules

### Advanced Customization

**Complementary Frameworks**
- Magisk modules - System-level tweaks
- Substratum/Swift Installer - System-wide theming
- Custom kernels - Performance tuning
- Root apps - Advanced functionality


### Stay Updated

**Follow Development**
- [LSPosed GitHub](https://github.com/JingMatrix/LSPosed) - Official updates
- [LSPosed Telegram](https://t.me/LSPosed) - Real-time support

**Need help?** Visit our [FAQ section](../faqs.md) or [Troubleshooting Guide](../troubleshooting.md).