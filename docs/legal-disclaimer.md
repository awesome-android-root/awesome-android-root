---
layout: doc
title: Legal Disclaimer & Safety Notice
description: "Important legal information, warranty implications, and safety guidelines for Android rooting."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/legal-disclaimer
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Legal Disclaimer & Safety Notice for Android Rooting
  - - meta
    - property: og:description
      content: "Important legal information, warranty implications, and safety guidelines for Android rooting."
  - - meta
    - property: og:url
      content: https://awesome-android-root.org/legal-disclaimer
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og/bootoader.png
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Legal Disclaimer & Safety Notice for Android Rooting
  - - meta
    - name: twitter:description
      content: "Important legal information, warranty implications, and safety guidelines for Android rooting."
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.org/images/og/bootoader.png
---

# Legal Disclaimer & Safety Notice

**Last Updated:** October 2025

## ⚠️ Critical Warning

All information is provided **"AS IS"** without warranty. **You assume all risks** including device damage, data loss, warranty void, security vulnerabilities, system instability, and app incompatibility. This is **educational content only**, not professional advice.

---

## Warranty Impact

**Rooting voids manufacturer warranty on virtually all devices:**

| Manufacturer | Warranty Status After Root | Notes |
|:---|:---|:---|
| **Samsung** | ❌ Void + Knox trips permanently | Knox EFUSE triggers on bootloader unlock; warranty void even if unrooted later |
| **Google** | ❌ Void | Warranty explicitly void with unlocked bootloader |
| **Xiaomi** | ❌ Void | Warranty void after unlock; official unlock program acknowledges this |
| **OnePlus** | ❌ Void | Warranty void with bootloader unlock |
| **Motorola** | ❌ Void | Warranty terminated upon unlock |
| **Nothing** | ❌ Void | Warranty void with bootloader unlock |
| **Sony** | ❌ Void + Camera degraded | DRM keys lost permanently |
| **Other brands** | ❌ Generally void | Assume warranty void unless stated otherwise |

**Key Points:**
- Re-locking bootloader may NOT restore warranty (especially Samsung Knox)
- Service centers may refuse repairs or charge premium rates
- **US:** Magnuson-Moss Act requires manufacturer prove modification caused issue
- **EU:** Stronger consumer protection; warranty may apply for unrelated hardware issues

---

## Security & App Compatibility

### Banking & Financial Apps
Many detect root and refuse to run: Google Pay, banking apps, PayPal, stock trading, crypto wallets. **Detection methods improve constantly.**

### Enterprise & Work Apps
Corporate MDM, email, VPN apps often detect root. **May violate company BYOD policy** - check before rooting work devices.

### Security Best Practices
- Grant root access only to trusted apps
- Use root hiding and Play Integrity bypass when needed
- Keep security modules updated
- Regular backups in case of compromise

---

## Data Loss Prevention

**Bootloader unlock ALWAYS wipes data.** Backup everything before:
- First-time rooting
- Installing modules
- System modifications
- OTA updates

**Failed operations may cause:**
- Bootloop (device won't boot)
- Soft brick (recoverable via firmware flash)
- Hard brick (device dead - rare)

---

## Legal Considerations

### By Region
- **US:** Rooting legal under DMCA exemptions; DRM circumvention for piracy is illegal
- **EU:** Right to repair supports modifications; copyright laws still apply
- **Other:** Generally legal but check local laws

### Prohibited Uses
❌ Software piracy, DRM circumvention for piracy, hacking, fraud, game cheating, stalking/spying

---

## Apps & Modules Safety

**Use at your own risk:**
- **FOSS/Open Source:** More trustworthy (auditable code)
- **Proprietary:** Less transparency
- **Abandoned projects:** May have security vulnerabilities

**Best Practices:**
- Research before installing
- Install one module at a time
- Test thoroughly
- Use official sources only (GitHub, F-Droid, official repos)
- Keep backups

---

## OTA Updates

**Root breaks OTA updates:**
- **Magisk:** Requires uninstall/reinstall
- **KernelSU:** Kernel reflashing needed
- **APatch:** Depends on implementation

Failed OTA can cause bootloops or system corruption.

---

## Device Resale

**Rooted devices:**
- Generally lower resale value (except enthusiast market)
- Trade-in programs may reject rooted devices
- **Samsung Knox:** Cannot be reset once tripped (permanent value reduction)

**Before selling:** Unroot, flash stock firmware, factory reset, re-lock bootloader if possible.

---

## Children & Age Recommendation

**Recommended age: 16+** with parental permission if under 18.

Rooting can bypass parental controls (Family Link, screen time, content filters).

---

## Limitation of Liability

**We are NOT LIABLE for any damages** including device damage, data loss, financial losses, warranty void, security breaches, or app incompatibilities. **You accept full responsibility.**

Not affiliated with Google, Android, device manufacturers, or app/module developers.

---

## Content Accuracy

Information may become outdated as Android evolves. [Report issues on GitHub](https://github.com/awesome-android-root/awesome-android-root/issues).

External links: We don't control third-party content. Always verify download sources and check file hashes.

---

## Acceptance

**By using this website, you acknowledge:**

✅ You understand all risks and accept full responsibility  
✅ You accept warranty will be void  
✅ You will follow local laws  
✅ You will not hold contributors liable  
✅ This is educational information only  

**If you don't accept these terms, do not use this website.**

---

## Before You Root - Checklist

- 🔴 **High Risk** - Can permanently break device
- 🟡 **Technical Knowledge Required** - Not for beginners
- ⚠️ **Permanent Warranty Loss** - Accept before proceeding
- 📚 **Research Thoroughly** - Read multiple sources
- 💾 **Backup Everything** - Multiple times
- 🎯 **Have Clear Purpose** - Root for specific needs
- 🤔 **Consider Alternatives** - See [Non-Root Alternatives](/non-root-alternatives)

**Only proceed if benefits outweigh risks for YOUR situation.**

---

**Ready?** Start with [Rooting Guides](/rooting-guides/) or [Root Apps](/apps-and-modules/).
