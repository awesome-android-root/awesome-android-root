---
layout: doc
title: Android Rooting FAQ & Troubleshooting
description: "Complete Android rooting FAQ with step-by-step solutions and emergency fixes for beginners and experts. Updated for Android 14/15."
head:
  - - meta
    - property: og:title
      content: Android Rooting FAQ & Troubleshooting Guide - Complete Solutions
  - - meta
    - property: og:description
      content: Complete Android rooting FAQ with emergency fixes, app compatibility tips, and troubleshooting guide for beginners and experts. Updated with the latest methods.
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:title
      content: Android Rooting FAQ & Troubleshooting Guide
  - - meta
    - name: twitter:description
      content: Complete FAQ and troubleshooting solutions for Android rooting with emergency fixes and app compatibility tips.
  - - meta
    - name: twitter:image:alt
      content: Android Rooting FAQ & Troubleshooting Guide
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Android Rooting Support
  - - meta
    - property: article:tag
      content: Android Root FAQ
  - - meta
    - property: article:tag
      content: Rooting Troubleshooting
  - - meta
    - property: article:tag
      content: Emergency Recovery
  - - meta
    - property: article:tag
      content: App Compatibility
  - - meta
    - property: article:tag
      content: Play Integrity
  - - meta
    - name: robots
      content: index, follow, max-image-preview:large
---

# Android Rooting FAQ

**Common questions answered** about Android rooting, root methods, device compatibility, and best practices. Use the exact device, firmware and root framework requirements rather than Android version alone.

:::tip Quick Help
Looking for troubleshooting? Visit our [Troubleshooting Guide](./troubleshooting.md) for step-by-step fixes.
:::

## Table of Contents

### Getting Started
- [What is Rooting?](#what-is-rooting)
- [Is Rooting Safe?](#is-rooting-safe)
- [Should I Root My Device?](#should-i-root-my-device)
- [Which Root Method Should I Use?](#which-root-method-should-i-use)

### Technical Questions
- [Root Methods Comparison](#root-methods-comparison)
- [Bootloader and Security](#bootloader-and-security)
- [Understanding Android Partitions](#understanding-android-partitions)
- [OTA Updates and Root](#ota-updates-and-root)

### Compatibility
- [Will My Apps Still Work?](#will-my-apps-still-work)
- [Can I Use Banking Apps?](#can-i-use-banking-apps)
- [What About Warranty?](#what-about-warranty)
- [Device-Specific Considerations](#device-specific-considerations)

### After Rooting
- [What Should I Do After Rooting?](#what-should-i-do-after-rooting)
- [How to Manage Modules Safely?](#how-to-manage-modules-safely)
- [How to Unroot?](#how-to-unroot)

---

## Getting Started

### What is Rooting?

**Rooting grants superuser (su) access** to your Android device, similar to administrator privileges on a PC. It allows apps and scripts to perform system-level operations that are normally restricted.

**What You Can Do:**
- **System Modification:** Remove bloatware, customize UI, install system-wide ad blockers
- **Advanced Backups:** Complete app data backups with Neo Backup or Swift Backup
- **Automation:** Enhanced Tasker automation with root actions
- **Performance Tuning:** Custom kernels, CPU/GPU governors, memory management
- **Privacy Control:** Firewall apps, per-app permissions, network monitoring
- **Module System:** Install Magisk/KernelSU modules for systemless modifications

**Popular Uses:**
- System-wide ad blocking ([AdAway guide](./general-guides/android-adblocking.md))
- Complete device backups ([backup apps](./apps-and-modules/backup#backup-restore))
- Custom recovery and ROM installation ([guide](./rooting-guides/custom-rom-installation.md))
- Removing carrier bloatware ([debloating guide](./general-guides/android-apps-debloating.md))
- Advanced theming and customization ([customization apps](./apps-and-modules/customization))
- Enhanced privacy controls ([privacy apps](./apps-and-modules/privacy))

**Related Resources:**
- [Essential Root Apps](./apps-and-modules/index.md#starter-kit-must-have-apps)
- [Root Framework Comparison](./rooting-guides/root-framework-comparison.md)
- [Complete Rooting Guide](./rooting-guides/index.md)

---

### Is Rooting Safe?

**Rooting is not risk-free, even when the instructions are correct.** Compatibility changes, firmware mistakes and privileged apps can affect security, data and essential services.

**Benefits:**
- Full control over your device
- Remove manufacturer restrictions
- Install powerful customization
- Enhanced privacy and security options (if configured properly)

**Risks:**
- **Warranty:** Coverage depends on manufacturer terms, region, local law and whether modification caused the fault
- **Data Loss:** Bootloader unlock wipes all data
- **Bricking:** Recovery can require a data wipe, authorized service or board-level repair; a working fastboot connection does not guarantee a safe restore
- **Security:** Root access can be exploited by malicious apps if not managed carefully
- **App Compatibility:** Some apps check for root/unlocked bootloader (banking, DRM, mobile payments)

**Permanent Changes:**
- **Samsung KNOX:** Installing custom binaries such as Magisk can trip the irreversible Warranty Bit (0x1)
- **Bootloader Unlock:** Some devices record unlock status permanently
- **Device History:** Relocking does not necessarily erase unlock/tamper records

**Is It Safe for You?**

Consider rooting if:
- You're comfortable with technical procedures
- You can afford potential app compatibility issues
- You don't rely solely on apps requiring device integrity
- You want deep customization and control

Avoid rooting if:
- You need banking/payment apps that strictly check device integrity
- Your device is under warranty you want to keep
- You're not comfortable troubleshooting issues
- You use corporate MDM/enterprise apps

**Safety Practices:**
- Follow device-specific guides from trusted sources (XDA, official docs)
- Back up everything before starting
- Use official root tools (Magisk, KernelSU, APatch)
- Only grant root to trusted apps
- Keep backups of stock firmware

**Learn More:**
- [Bootloader Unlock Guide](./rooting-guides/how-to-unlock-bootloader.md)
- [Legal Disclaimer](./legal-disclaimer.md)
- [Troubleshooting Guide](./troubleshooting.md)

---

### Should I Root My Device?

**Ask yourself these questions:**

**1. Why do you want root?**
- If you have specific needs root fulfills → Consider it
- If you just want to "try it out" → Maybe wait and research more
- If you're unsure what you'd use it for → Probably not yet

**2. What are your must-have apps?**
- Banking, mobile payment, DRM streaming apps may have issues
- Corporate/work apps often don't allow rooted devices
- Gaming apps with anti-cheat may detect root

**3. Is your device supported?**
- Check if bootloader can be unlocked (US Samsung often cannot)
- Verify root method compatibility for your device
- Research your specific model on XDA Forums

**4. Do you need alternatives to root?**

Many customizations don't require root anymore:
- **ADB Commands:** Debloating, some system tweaks
- **Shizuku:** Grant ADB-level permissions to apps without root
- **DNS-based Ad Blocking:** NextDNS, AdGuard DNS (no root)
- **Launcher Customization:** Icon packs, gestures (no root)
- **Work Profile:** Separate work/personal apps with Shelter

**Alternatives Without Root:**
- [Non-Root Alternatives Guide](./non-root-alternatives.md) - Comprehensive options
- [Android Ad Blocking](./general-guides/android-adblocking.md) - Including DNS-based methods
- [App Debloating Guide](./general-guides/android-apps-debloating.md) - ADB-based debloating

**Decision Flowchart:**

```
Need system-level modifications? → Yes → Root likely needed
    ↓ No
Can you achieve goal with ADB/Shizuku? → Yes → Try non-root first
    ↓ No
Will you lose critical apps? → Yes → Consider non-root alternatives
    ↓ No
Comfortable troubleshooting? → Yes → Root is viable option
    ↓ No
Research more and ask community
```

---

### Which Root Method Should I Use?

**Three Main Options in 2026:**

| Method | Best For | Pros | Cons |
|:---|:---|:---|:---|
| **Magisk** | Most users, general use | Widest compatibility, mature, large module ecosystem, Zygisk, active development | Requires boot/init_boot patching |
| **KernelSU** | Supported GKI devices, hiding or per-app control | Kernel-integrated, only permitted apps see `su`, SUSFS on variants | Needs a supported kernel, smaller module ecosystem |
| **APatch** | Advanced users, developers | Kernel patching approach, powerful for specific use cases | Limited device support, requires technical knowledge |

**Detailed Comparison:**

**Magisk** (Recommended for Most)
- **Installation:** Patch boot/init_boot image, flash via fastboot or custom recovery
- **Compatibility:** Works on most devices with unlocked bootloader
- **Modules:** Largest ecosystem of modules
- **DenyList:** Reverts Magisk changes for selected processes; not a universal root-hiding or integrity solution
- **OTA Updates:** Built-in support for A/B devices
- **Support:** Extensive community support, well-documented

**When to choose Magisk:**
- First time rooting
- Want maximum module selection
- Using stock or stock-based ROM

**KernelSU**
- **Installation:** LKM mode keeps the stock kernel on supported GKI devices; a custom kernel is only needed for GKI mode or older devices
- **Compatibility:** Official GKI support starts at kernel 5.10; upstream also documents manual builds for older 4.14+ kernels. Forks have separate compatibility requirements
- **Modules:** Growing ecosystem; a metamodule is required for mounting since KernelSU 3.0
- **Hiding:** Only permitted apps see `su`, App Profiles hide module mounts per app, and SUSFS variants hide paths in the kernel
- **Performance:** Generally excellent, kernel-level integration
- **Support:** Active development, smaller but knowledgeable community

**When to choose KernelSU:**
- Your device and kernel are supported, including by a variant if the official build reports `Unsupported`
- Want kernel-level root solution
- Prefer profile-based permission system
- Hiding matters more than the full Magisk module catalog
- Don't need every Magisk module

**APatch**
- **Installation:** Kernel patching approach
- **Compatibility:** ARM64 devices with supported kernels
- **Modules:** Limited ecosystem
- **Hiding:** Built-in hiding mechanisms
- **Use Case:** Specific advanced scenarios
- **Support:** Smaller community, requires technical knowledge

**When to choose APatch:**
- Advanced user with specific requirements
- Device/kernel is supported
- Want kernel patching approach
- Comfortable with less community support

**Quick Decision Guide:**

```
New to rooting? → Magisk
Stock ROM, most devices? → Magisk
Hiding or per-app control first, on a supported kernel? → KernelSU or a variant
Using custom ROM with KSU kernel? → KernelSU
Advanced user, specific needs? → Research all three
```

**Learn More:**
- [Root Framework Comparison](./rooting-guides/root-framework-comparison.md) (detailed analysis)
- [Magisk Guide](./rooting-guides/magisk-guide.md)
- [KernelSU Guide](./rooting-guides/kernelsu-guide.md)
- [APatch Guide](./rooting-guides/apatch-guide.md)

---

## Technical Questions

### Root Methods Comparison

**See the detailed comparison:** [Root Framework Comparison Guide](./rooting-guides/root-framework-comparison.md)

**Quick Summary:**

| Feature | Magisk | KernelSU | APatch |
|:---|:---|:---|:---|
| **Installation Method** | Patch boot/init_boot/recovery or Samsung AP | Supported LKM or integrated kernel | Patch kernel in boot image |
| **Module Ecosystem** | Magisk modules | Check script compatibility and metamodule requirements | APM and kernel patch modules |
| **Root Hiding** | DenyList is limited | Per-app authorization/profiles | Per-app authorization/exclusion |
| **OTA Support** | Supported A/B flow with prerequisites | Mode/device-specific; may need repatching | May need updated boot image repatched |
| **Performance Impact** | Minimal | Minimal | Minimal |
| **Community Support** | Extensive | Active, smaller | Niche |
| **Best For** | Most users, beginners | Custom ROM enthusiasts | Advanced users |

**Learn More:**
- [Detailed Framework Comparison](./rooting-guides/root-framework-comparison.md)
- [Magisk Installation Guide](./rooting-guides/magisk-guide.md)
- [KernelSU Installation Guide](./rooting-guides/kernelsu-guide.md)
- [APatch Installation Guide](./rooting-guides/apatch-guide.md)

---

### Bootloader and Security

**Q: What is a bootloader?**

The bootloader is the first program that runs when you power on your Android device. It loads the operating system and verifies its integrity.

**Q: Why do I need to unlock the bootloader?**

An unlocked bootloader allows you to:
- Flash custom recovery (TWRP, OrangeFox)
- Install custom ROMs
- Root your device
- Flash modified boot images

**Q: Is unlocking the bootloader safe?**

Unlocking has important consequences:
- **Wipes all data** - backup first
- **May affect warranty**, depending on terms and local law
- **Permanent flags** on some devices (Samsung KNOX)
- **Security implications** - easier for thieves to access data if device is stolen

**Q: Can I lock the bootloader after rooting?**

Generally no, or not recommended:
- Locking with custom software can hard brick your device
- Some ROMs support locking (GrapheneOS, CalyxOS)
- Always flash stock firmware before locking

**Q: Can I root without unlocking the bootloader?**

The standard Magisk, KernelSU and APatch installation paths require permission to boot modified images, normally through bootloader unlocking. Firmware-specific exploits can sometimes grant temporary privileges, but there is no general "no-unlock" method.

Treat named exploits, CVE numbers and affected-patch claims as unverified until backed by the original disclosure and reproducible device-specific evidence. A locked bootloader does not make an exploit APK safe, and temporary root does not guarantee that banking apps, Knox services or attestation will remain unaffected. Do not stay on vulnerable firmware solely to retain root.

**Learn More:**
- [Root Without Unlocking the Bootloader: GhostLock Temporary Root](./rooting-guides/root-without-unlocking-bootloader.md)
- [Bootloader Modification & Temporary Root Solutions](./rooting-guides/temporary-root-solutions.md)
- [Complete Bootloader Unlock Guide](./rooting-guides/how-to-unlock-bootloader.md)
- [OEM Unlock Policies by Manufacturer](./rooting-guides/how-to-unlock-bootloader.md#manufacturer-policy-overview)

---

### Understanding Android Partitions

**Q: What's the difference between boot.img and init_boot.img?**

| Partition | Used On | Contains | When to Patch |
|:---|:---|:---|:---|
| **boot.img** | Devices with kernel here; ramdisk location varies | Kernel, and sometimes generic ramdisk | Magisk if boot ramdisk is here; APatch patches this kernel image |
| **init_boot.img** | Many devices launched with Android 13+; not every upgraded device | Generic ramdisk, not kernel | Magisk where this partition exists and the device guide specifies it |

**Important:** Follow the framework and model-specific guide. Upgrading to Android 13+ does not automatically add `init_boot`. Some Magisk devices use recovery; Samsung commonly uses a patched AP archive. See [upstream Magisk installation](https://github.com/topjohnwu/Magisk/blob/master/docs/install.md).

**Q: What are A/B partitions?**

Modern devices use A/B (seamless) update system:
- Two sets of partitions (slot A and slot B)
- System updates install to inactive slot
- If update fails, device boots from working slot
- Enables updates without downtime

**Q: What is vbmeta and AVB?**

- **AVB (Android Verified Boot):** Security feature that verifies system integrity
- **vbmeta partition:** Contains verification metadata
- **dm-verity:** File-level verification system

**Modern Magisk typically doesn't require disabling AVB.** Only disable if your specific ROM/kernel requires it.

---

### OTA Updates and Root

**Q: Can I receive OTA updates after rooting?**

Often, but the update path depends on the device, updater, root framework, and whether stock partitions were modified. Back up data and obtain the matching stock firmware before updating.

**Magisk on supported A/B devices:**
1. Disable problematic modules and restore images through **Magisk → Uninstall → Restore Images**. **Do not reboot.** If stock backups are missing, use the device's documented update method instead.
2. Apply the OTA and wait for installation/optimization to finish. **Do not reboot yet.**
3. Select **Install → Install to Inactive Slot (After OTA)** if available.
4. Follow Magisk's completion instructions; current upstream directs you to the system updater's **Restart now** button.
5. Verify the updated build and root before restoring modules.

See the [upstream OTA instructions](https://github.com/topjohnwu/Magisk/blob/master/docs/ota.md). This is not a universal Samsung or custom-ROM update procedure. Never use inactive-slot installation as a general repair action.

**Non-A/B devices:** stock recovery/images may need restoring before OTA; root usually needs reinstalling from the new build's image afterward.

**KernelSU/APatch:** follow the installation mode's upstream OTA procedure, or repatch the updated firmware's boot image. Do not reuse an older kernel/image on the new build.

**Q: Will OTA break root?**

It can replace the patched image and switch slots. Root survival is not guaranteed. If you already rebooted, check the running build and slot instead of flashing both slots.

[OTA Update Troubleshooting](./troubleshooting.md#ota-update-problems)

---

## Compatibility

### Will My Apps Still Work?

**Most apps work fine,** but some categories check for root or unlocked bootloader:

**Apps That Usually Work:**
- Social media (Instagram, Twitter, Facebook)
- Messaging (WhatsApp, Telegram, Signal)
- Browsers (Chrome, Firefox, Brave)
- Entertainment (YouTube, Spotify, most games)
- Productivity apps

**Apps That May Have Issues:**
- Banking and financial apps
- Mobile payment (Google Pay, Samsung Pay)
- DRM streaming (Netflix in some regions)
- Corporate/enterprise apps with MDM
- Games with anti-cheat (Pokemon GO, Call of Duty Mobile)

**Mitigation:**
- Configure root hiding with the DenyList, Zygisk and a hiding module
- Keep apps updated; clear data only when necessary, since it can erase registration, credentials or local content

**Reality Check:** Some apps with hardware-backed attestation (STRONG Play Integrity) cannot be fooled on unlocked bootloaders.

---

### Can I Use Banking Apps?

**It depends on the service, device state and current app policy.** No root framework or module stack can guarantee compatibility, even if a test app reports passing Play Integrity.

- **Play Integrity** verdicts, **Play Protect certification**, and an app's own root checks are separate.
- On Android 13+, `MEETS_DEVICE_INTEGRITY` requires hardware-backed evidence of a locked bootloader and a certified manufacturer image. `MEETS_STRONG_INTEGRITY` adds requirements including recent security updates. See [Google's verdict definitions](https://developer.android.com/google/play/integrity/verdicts).
- Test the actual app, but do not rely on today's result to predict future access. Updates and server-side policies can change behavior.
- A work profile does not give the phone a different bootloader or attestation state.
- Do not import leaked attestation keys or repeatedly clear banking/Google Play Services data as routine troubleshooting.

Start with [Play Integrity and Banking Apps](./troubleshooting.md#play-integrity-and-banking-apps). For mission-critical banking, payments or work access, keep an unmodified supported device or use the service's official web option.

---

### What About Warranty?

**There is no universal warranty rule.** Manufacturer commercial warranties, carrier terms and statutory consumer rights differ by region. Modification-related damage may be excluded without eliminating all rights for unrelated hardware faults.

- Read the current warranty and unlock warning for your exact model and country.
- Do not assume relocking restores warranty coverage or erases an unlock record.
- On supported Samsung devices, installing Magisk trips the **irreversible Knox Warranty Bit**. Restoring stock firmware does not reset it; affected Knox-dependent services may remain unavailable. See [Magisk's Samsung warnings](https://github.com/topjohnwu/Magisk/blob/master/docs/install.md#samsung-devices).
- Some devices have irreversible DRM/provisioning consequences; verify the manufacturer's warning before unlocking.

[Legal Disclaimer](./legal-disclaimer.md) · [Device-Specific Considerations](#device-specific-considerations)

---

### Device-Specific Considerations

**Google Pixel:**
- Easy to root, excellent community support
- Magisk: Pixel 6 uses `boot`; Pixel 7 and later normally use `init_boot`. Confirm the exact model and framework.
- Factory images readily available
- [Pixel Root Guide](./rooting-guides/how-to-root-pixel-phone.md)

**Samsung:**
- Installing Magisk trips the irreversible Knox Warranty Bit (0x1)
- US/Canada models usually cannot unlock
- Requires Odin for flashing
- [Samsung Root Guide](./rooting-guides/how-to-root-samsung-phone.md)

**Xiaomi/Redmi/POCO:**
- Mi Unlock eligibility and waiting periods vary by account, region, model and current HyperOS policy; follow the actual tool message
- Beware Anti-Rollback (ARB) protection
- MIUI heavily modified, some compatibility issues
- [Xiaomi Root Guide](./rooting-guides/how-to-root-xiaomi-phone.md)

**OnePlus:**
- Generally root-friendly
- OxygenOS/ColorOS merge changed process on newer devices
- MSMDownloadTool available for emergencies (older models)
- [OnePlus Root Guide](./rooting-guides/how-to-root-oneplus-phone.md)

**Nothing Phone:**
- Official unlock supported
- Growing community
- Standard process
- [Nothing Phone Root Guide](./rooting-guides/how-to-root-nothing-phone.md)

**Motorola:**
- Official unlock via Motorola website
- Voids warranty explicitly
- Good community support
- [Motorola Root Guide](./rooting-guides/how-to-root-motorola-phone.md)

---

## After Rooting

### What Should I Do After Rooting?

**Immediate Steps:**

1. **Verify root works:**
   - Install root checker app or Termux
   - Test: `su -c "id"` in Termux
   - Should show `uid=0(root)`

2. **Configure root manager:**
   - Set default grant behavior (prompt/deny)
   - Enable Zygisk only if a trusted module requires it; use one implementation
   - Configure DenyList for sensitive apps

3. **Make a backup:**
   - TWRP/OrangeFox: Only if your exact device/build is supported and data decrypts; recovery backups may omit internal storage
   - Swift Backup: App data backup
   - Copy to external storage/cloud

4. **Essential apps to install:**
   - See our [complete starter kit](./apps-and-modules/#starter-kit-must-have-apps) for must-have apps
   - [AdAway](./apps-and-modules/ad-blocking#ad-tracker-blocking) - System-wide ad blocking
   - [Backup apps](./apps-and-modules/backup#backup-restore) - Complete backups
   - [File managers](./apps-and-modules/file-management#file-managers) - Root-enabled file access
   - [Firewall tools](./apps-and-modules/security#firewalls-filtering) - Network control
   - [Browse the 750+ app and module collection](./apps-and-modules/) for more

**Next Steps:**

1. **Debloat system:**
   - Remove manufacturer bloatware
   - Disable unused system apps
   - [Debloating Guide](./general-guides/android-apps-debloating.md)

2. **Install useful modules (Magisk):**
   - Start with essential modules only
   - Test one at a time
   - [Essential Root Apps](./apps-and-modules/index.md#starter-kit-must-have-apps)

3. **Configure ad blocking:**
   - System-wide with AdAway or hosts file
   - DNS-based blocking
   - [Ad Blocking Guide](./general-guides/android-adblocking.md)

4. **Set up automation:**
   - Tasker with root actions
   - Scheduled backups
   - Custom scripts

**Safety Reminders:**
- Only grant root to apps you trust
- Keep backups updated
- Test changes before making multiple modifications
- Know how to recover from bootloop

---

### How to Manage Modules Safely?

**Best Practices:**

1. **Install one module at a time:**
   - Install module
   - Reboot
   - Test for 24 hours
   - Verify no issues before installing next

2. **Read module descriptions carefully:**
   - Check compatibility with your device/ROM
   - Read recent reviews/issues
   - Verify module is actively maintained
   - Check last update date

3. **Keep modules updated:**
   - Check for updates regularly
   - Read changelog before updating
   - Some updates may break compatibility

4. **Know how to remove problematic modules:**
   - Magisk: Use the device's Android safe-mode sequence; there is no universal volume-key shortcut
   - ADB with authorized root: `adb shell su -c 'magisk --remove-modules'` removes all Magisk modules
   - Decrypting recovery: create a `disable` marker inside the suspect module directory first, rather than deleting it
   - [Emergency Recovery Guide](./troubleshooting.md#device-won-t-boot-bootloop)

**Red Flags (Avoid These Modules):**
- No source code available (closed source)
- Requests excessive permissions
- Poor reviews or many issue reports
- Unresolved compatibility/security reports; an old release date alone does not prove abandonment
- Claims to do impossible things

**Recommended Module Sources:**
- The module author's upstream releases (Magisk no longer has its old built-in centralized module repository)
- GitHub (open source, verifiable)
- XDA Developers (established developers)
- [Curated Root Apps List](./apps-and-modules/index.md)

**Troubleshooting Modules:**
- [Module Conflicts](./troubleshooting.md#magisk-troubleshooting)
- [Bootloop from Modules](./troubleshooting.md#device-won-t-boot-bootloop)

---

### How to Unroot?

**Complete Unroot Process:**

**Method 1: Using Magisk (Easiest)**

1. **Uninstall via Magisk app:**
   - Open Magisk Manager
   - Tap Uninstall
   - Choose "Complete Uninstall"
   - Reboot

2. **Verify:**
   - Root checker should show "not rooted"
   - Play Integrity may still fail if bootloader unlocked

**Method 2: Restore the Image Actually Modified**

Use the exact installed build and documented partition/slot. APatch modifies `boot`; Magisk may modify `boot`, `init_boot`, recovery or Samsung AP firmware. Run only the applicable command below, never both as a generic recipe.

```bash
# Download stock firmware for your exact build
# Extract boot.img or init_boot.img
# Flash via fastboot

adb reboot bootloader
fastboot flash boot stock_boot.img
# Alternative only if Magisk modified init_boot on this device
fastboot flash init_boot stock_init_boot.img
fastboot reboot
```

**Method 3: Stock Firmware Restoration**

A factory reset alone erases user data, not patched boot images. Use a reset only if the manufacturer's restore process requires it.

1. **Flash complete stock firmware:**
   - Pixel: Android Flash Tool or factory images
   - Samsung: Odin with full firmware
   - Xiaomi: Mi Flash Tool
   - OnePlus: Model-specific supported restore package; legacy MSM tools are not universal

2. **Factory reset:**
   - Wipe all data
   - Clean slate

**Method 4: Relock Bootloader (Advanced)**

:::danger Warning
Relocking bootloader with modified software can **hard brick** your device!
:::

**Only relock if:**
- Stock firmware fully restored
- All partitions verified
- You understand the risks

Follow only the manufacturer/model-specific relock procedure after restoring and successfully booting the complete signed firmware. Do not copy a generic lock command from another device guide.

**Important Notes:**
- Relocking wipes data again
- Samsung KNOX 0x1 flag remains even after relock
- Some devices won't accept relocking after unlock
- Test device boots properly before relocking

**After Unrooting:**
- Root apps will stop working
- System modifications revert (with stock firmware)
- Play Integrity may still fail on unlocked bootloader
- Banking apps may start working (depends on checks)

---

## Community and Support

### Where Can I Get Help?

**Having issues?** Visit our [Troubleshooting Guide](./troubleshooting.md) for step-by-step solutions.

**Community Resources:**

**Forums:**
- [XDA Developers](https://forum.xda-developers.com/) - Device-specific forums, ROM discussions
- [r/AndroidRoot](https://reddit.com/r/AndroidRoot) - General rooting help
- [r/Magisk](https://reddit.com/r/Magisk) - Magisk-specific
- [r/Awesome_Android_Root](https://reddit.com/r/Awesome_Android_Root) - This project's community

**Real-Time Chat:**
- Telegram: @MagiskUpdates, @KernelSU, device-specific groups
- Discord: Various ROM and device communities

**Official Resources:**
- [Magisk GitHub](https://github.com/topjohnwu/Magisk)
- [KernelSU GitHub](https://github.com/tiann/KernelSU)
- [APatch GitHub](https://github.com/bmax121/APatch)

**When Asking for Help:**

Provide complete information:
```
Device: [Model + variant]
Firmware: [Android version, build number, security patch]
Root: [Framework/fork + manager version + installation mode]
Kernel/slot: [Kernel release/KMI + active slot if known]
Modules: [Installed modules + last change]
Issue: [Detailed description]
Steps Tried: [What you've already attempted]
Logs: [Relevant redacted logs; never share tokens, keyboxes or private identifiers]
```

**Good example:**
```
Device: Samsung Galaxy S23 Ultra SM-S918B
Firmware: Android 14, One UI 6.0, Build S918BXXU2BWL1
Root: Magisk 27.0 via Odin
Issue: Bootloop after installing GCam module
Steps Tried: Can't access ADB, stuck on Samsung logo
Logs: Unable to capture due to bootloop
```

---

## Quick Reference

### Essential Commands

**ADB Commands:**
```bash
adb devices                    # List connected devices
adb reboot bootloader         # Reboot to bootloader
adb reboot recovery           # Reboot to recovery
adb reboot fastboot           # Reboot to fastbootd
adb shell                     # Open device shell
adb push file.zip /sdcard/    # Copy file to device
adb pull /sdcard/file.zip     # Copy file from device
```

**Fastboot Commands:**
```bash
fastboot devices              # List devices in fastboot
fastboot getvar product        # Read product identifier (where supported)
fastboot getvar current-slot   # Read active slot on supported A/B devices
fastboot reboot               # Reboot device
# Flash/unlock/wipe commands intentionally omitted: use the exact device guide
```

**Root Verification:**
```bash
# In Termux or ADB shell
su -c "id"                    # Should show uid=0(root)
su -c "magisk --version"      # Check Magisk version
```

---

### Useful Resources

**Guides:**
- [Complete Rooting Guide](./rooting-guides/index.md)
- [Root Framework Comparison](./rooting-guides/root-framework-comparison.md)
- [Troubleshooting Guide](./troubleshooting.md)
- [Non-Root Alternatives](./non-root-alternatives.md)

**Apps:**
- [Featured Root Apps](./apps-and-modules/index.md#starter-kit-must-have-apps)
- [All Root Apps](./apps-and-modules/index.md)

**General Android:**
- [Ad Blocking Guide](./general-guides/android-adblocking.md)
- [App Debloating](./general-guides/android-apps-debloating.md)
- [Stop Auto-Updates](./general-guides/stop-android-app-auto-updates-play-store.md)

**Legal:**
- [Legal Disclaimer](./legal-disclaimer.md)
- [Contributing Guidelines](./contributing.md)

---

**Have more questions?** Check our [Troubleshooting Guide](./troubleshooting.md) or [join the community](./resources.md#communities-and-support)!
