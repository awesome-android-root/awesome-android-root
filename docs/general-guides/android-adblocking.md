---
layout: doc
title: Rooted Android Ad Blocking Guide
description: "Block ads system-wide on rooted Android with AdAway and Bindhosts using hosts files, plus DNS and non-root alternatives."
head:
  - - meta
    - name: author
      content: Awesome Android Root
  - - meta
    - name: robots
      content: index, follow
  - - meta
    - property: og:title
      content: "Android Ad Blocking Guide for Rooted Devices"
  - - meta
    - property: og:description
      content: "Block ads system-wide on rooted Android with AdAway and Bindhosts. Covers hosts files, DNS filters, setup, and troubleshooting."
  - - meta
    - property: og:image
      content: https://awesome-android-root.xyz/images/og/android-adblocking.png
  - - meta
    - name: twitter:title
      content: "Android Ad Blocking Guide for Rooted Devices"
  - - meta
    - name: twitter:description
      content: "Block ads system-wide on rooted Android with AdAway and Bindhosts. Covers hosts files, DNS filters, setup, and troubleshooting."
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.xyz/images/og/android-adblocking.png
  - - meta
    - name: twitter:image:alt
      content: Android Ad Blocking Guide - System-Wide Ad Blocking for Rooted Devices
  - - meta
    - name: article:author
      content: Awesome Android Root
  - - meta
    - name: article:section
      content: Guides
  - - meta
    - name: article:tag
      content: Android
  - - meta
    - name: article:tag
      content: Root
  - - meta
    - name: article:tag
      content: Ad Blocking
  - - meta
    - name: article:tag
      content: AdAway
  - - meta
    - name: article:tag
      content: Bindhosts
---

# Android Ad Blocking Guide

<div align="center">

🛡️ **Block Ads System-Wide with Root Access**

*The complete guide to eliminating ads across your Android system using hosts-based solutions*

[![Root Required](https://img.shields.io/badge/Root-Required-red?style=for-the-badge)](#requirements)
[![AdAway Compatible](https://img.shields.io/badge/AdAway-Compatible-green?style=for-the-badge)](#method-1-adaway-recommended)
[![Systemless](https://img.shields.io/badge/Systemless-Supported-blue?style=for-the-badge)](#method-2-bindhosts-advanced)

</div>

> [!NOTE]
> Not rooted? See the [non-root alternatives guide](../non-root-alternatives.md) for Private DNS, RethinkDNS, browser-based blocking, and patched-app options.

---

## Table of Contents

- [Why Root-Based Ad Blocking?](#why-root-based-ad-blocking)
- [Requirements](#requirements)
- [Ad Blocking Methods Comparison](#ad-blocking-methods-comparison)
- [Method 1: AdAway (Recommended)](#method-1-adaway-recommended)
- [Method 2: Bindhosts (Advanced)](#method-2-bindhosts-advanced)
- [Configuration & Optimization](#configuration-optimization)
- [Troubleshooting](#troubleshooting)
- [Advanced Tips](#advanced-tips)
- [FAQ](#faq)

---

## Why Root-Based Ad Blocking?

Root access enables **system-level ad blocking** that surpasses traditional methods:

### ✅ **Advantages of Root Ad Blocking**

- **System-wide protection** - Blocks ads in all apps, browsers, and system components
- **No battery drain** - Unlike VPN-based blockers, hosts blocking adds no extra battery consumption
- **No network overhead** - Ads are blocked at the hosts file level before network requests
- **Works offline** - Continues working without internet connectivity
- **Fewer ad requests** - Pages and apps load without fetching ad content

### 🔄 **How Root Ad Blocking Works**

Root ad blocking operates by modifying the **hosts file** (`/system/etc/hosts`), which acts as a local DNS resolver. When an app tries to connect to an ad server:

1. The system checks the hosts file first
2. Ad domains are redirected to `0.0.0.0` or `127.0.0.1` (localhost)
3. The connection fails instantly, blocking the ad
4. Content loads without waiting for ad network requests

**Honest limits:** apps that use hardcoded DNS or DNS-over-HTTPS can bypass hosts blocking, and some first-party ads are served from the same domains as content. Pair hosts blocking with a DNS filter for those cases.

---

## Requirements

### 📱 **Device Requirements**

- ✅ **Rooted Android device** ([complete rooting guide](../rooting-guides/))
- ✅ **Magisk**, **KernelSU**, or **APatch** installed ([compare methods](../rooting-guides/root-framework-comparison.md))
- ✅ **Working root access** (verify with a terminal: `su -c whoami` should print `root`)

### 🔧 **Supported Root Managers**

| Root Manager | AdAway | Bindhosts | Notes |
|--------------|--------|-----------|-------|
| **Magisk** | ✅ Systemless | ✅ Magic mount (no WebUI) | Widest compatibility |
| **KernelSU** | ⚠️ Needs helper module | ✅ OverlayFS default, SuSFS modes | Use the systemless hosts module or AdAway Helper for AdAway |
| **APatch** | ⚠️ Needs helper module | ✅ hosts_file_redirect mode | Kernel redirect module available |

> [!TIP]
> On KernelSU and APatch, AdAway needs the [systemless hosts module](https://github.com/symbuzzer/systemless-hosts-KernelSU-module) or [AdAway Helper](https://github.com/DEMONNICA/AdAway-Helper) to write the hosts file. Bindhosts works on all three managers without helpers.

### ⚠️ **Important Notes**

- Always know how to revert changes before proceeding
- Some banking and payment apps may require whitelisting
- OTA updates can reset direct system modifications; systemless methods survive them

---

## Ad Blocking Methods Comparison

| Feature | AdAway | Bindhosts |
|---------|--------|-----------|
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **User Interface** | Native Android app | Web UI + action button + terminal |
| **Host Sources** | Multiple built-in | Extensive collection |
| **Customization** | Good | Excellent |
| **Root Hiding** | Basic | Advanced (SuSFS, redirect modes) |
| **Update Method** | Built-in auto-updater | Self-updating |
| **Best For** | Most users | Power users, KernelSU/APatch |

---

## Method 1: AdAway (Recommended)

**AdAway** is the most user-friendly root ad blocker for Android. It writes a merged hosts file systemlessly and also offers a local VPN mode for non-rooted devices. Also available in our [ad blocker collection](../apps-and-modules/ad-blocking#ad-tracker-blocking).

### 📥 **Installation**

- **F-Droid (recommended):** [AdAway on F-Droid](https://f-droid.org/packages/org.adaway)
- **GitHub:** [AdAway releases](https://github.com/AdAway/AdAway/releases)
- Or install the APK directly with `adb install adaway.apk`

### ⚙️ **Initial Setup**

1. **Launch AdAway** and grant root permissions when prompted
2. **Choose blocking method:**
   - **Root method** (recommended on rooted devices): writes the hosts file systemlessly
   - **VPN method**: local VPN that filters DNS requests, no root needed
3. **Configure hosts sources** (see below)
4. **Apply changes** - AdAway downloads and merges the lists

### 📋 **Hosts Sources Setup**

Navigate to **Hosts Sources**. AdAway ships with defaults (AdAway hosts, StevenBlack, Peter Lowe). Valid hosts-format sources you can add:

```text
• AdAway default: https://adaway.org/hosts.txt
• StevenBlack Unified: https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts
• StevenBlack with social/fakenews/gambling/porn extensions:
  https://raw.githubusercontent.com/StevenBlack/hosts/master/alternates/fakenews-gambling-porn-social/hosts
• Peter Lowe ad servers:
  https://pgl.yoyo.org/adservers/serverlist.php?hostformat=hosts&showintro=0&mimetype=plaintext
• AdGuard DNS filter (hosts format):
  https://adguardteam.github.io/HostlistsRegistry/assets/filter_1.txt
```

> [!WARNING]
> Only use hosts-format sources. Adblock-syntax lists such as EasyList and EasyPrivacy are for browser blockers and do not work in AdAway.

### 🔧 **Optimal Configuration**

- **Enable automatic updates** in settings (daily or weekly)
- **Configure the whitelist** for apps that break when their domains are blocked
- **Check the blocked domain count** after applying to confirm lists loaded

---

## Method 2: Bindhosts (Advanced)

**Bindhosts** provides systemless hosts blocking with auto-updating, AdAway coexistence, and multiple redirect methods for stronger root hiding. Find it in our [ad blocking modules](../apps-and-modules/ad-blocking#ad-tracker-blocking).

### 🎯 **Why Choose Bindhosts?**

- **Fully systemless** - no permanent system modifications
- **Self-updating** - maintains current hosts lists automatically
- **Advanced root hiding** - SuSFS bind mounts and in-kernel redirect methods
- **Web UI management** on KernelSU and APatch (Magisk uses the action button and terminal)
- **AdAway coexistence** - can run alongside AdAway

### 📥 **Installation**

1. Download the module zip from [GitHub releases](https://github.com/bindhosts/bindhosts/releases)
2. Flash it in your root manager (Magisk, KernelSU, or APatch)
3. Reboot, then open the module action button or Web UI

### ⚙️ **Operating Modes**

Bindhosts probes the best mode automatically. You can override it in the developer options:

| Mode | Method | Root Manager | Notes |
|------|--------|--------------|-------|
| `0` (default) | Magic mount / OverlayFS + path_umount | All | Automatic; AdAway compatible on Magisk and APatch |
| `1` | SuSFS assisted bind mount | KernelSU | Requires a SuSFS-patched kernel |
| `2` | Plain bind mount | All | Highest compatibility; leaks a mount if unassisted |
| `3` | hosts_file_redirect | APatch | In-kernel redirect; requires the KPM |
| `4` | ZN-hostsredirect | All with ZygiskNext | No mount; recommended by the author |

Higher SuSFS modes (overlay, bind + spoof, source mod) exist for KernelSU. See the [official modes documentation](https://github.com/bindhosts/bindhosts/blob/master/Documentation/modes.md) for the full table.

### 🖥️ **Web UI and Terminal**

The Web UI (KernelSU and APatch) manages custom rules, sources, whitelists, and blacklists. From a root shell or Termux:

```bash
su
bindhosts                  # interactive menu
bindhosts --action         # toggle apply/reset
bindhosts --force-update   # update lists now
bindhosts --query doubleclick.net   # check a domain
bindhosts --tcpdump        # sniff active IPs (no DNS filter running)
bindhosts --custom-cron    # set update hour
bindhosts --enable-cron    # enable scheduled updates
bindhosts --force-reset    # reset the hosts file
```

### 📋 **Custom Sources**

Add hosts-format sources in the Web UI, or append them to the module's sources file, then run `bindhosts --force-update`.

---

## Configuration & Optimization

### 🎛️ **Whitelist Management**

Apps that may need whitelisting when they break:

```text
• Banking and payment apps (PayPal, Google Pay, Samsung Pay, regional banks)
• Social media (Facebook, Instagram) if feeds misbehave
• Google services (Gmail, Drive) if sync fails
• YouTube if in-app features break
```

**AdAway custom rules:** Your Lists → Allowed/Blocked Hosts.
**Bindhosts custom rules:** add them in the Web UI.

### 📱 **App-Specific Configuration**

**Chrome or WebView still showing ads on KernelSU:** open KernelSU Manager → Superuser → Chrome (and Android System WebView) and disable **Umount modules**, so the browser sees the modified hosts file.

---

## Troubleshooting

### 🔧 **Common Issues & Solutions**

#### Issue: Ads Still Appearing

1. **Confirm the blocker applied:** check the blocked domain count in AdAway or run `bindhosts --query doubleclick.net`
2. **Reboot the device** after applying
3. **Check the Chrome/WebView umount setting** on KernelSU (see above)
4. **Hardcoded DNS apps:** apps using DoH or fixed DNS servers bypass hosts blocking; use a DNS filter such as [RethinkDNS](https://github.com/celzero/rethink-app) for those

#### Issue: Apps Crashing or Not Working

1. **Whitelist the domains** the app needs in AdAway or Bindhosts
2. **Remove conflicting sources** that block content delivery networks

#### Issue: Banking Apps Fail

1. Whitelist the bank's domains
2. Configure root hiding (Zygisk denylist, Shamiko, ZygiskNext, or SuSFS)
3. Some apps still refuse to run on rooted devices; this is not fixable by whitelisting

#### Issue: Slow Browsing

1. **Reduce sources:** fewer, focused lists beat many large ones
2. Remove duplicate sources that overlap heavily

### 🔍 **Diagnostics**

```bash
# Verify root works
su -c whoami

# View the effective hosts file
su -c head /system/etc/hosts

# Check whether a domain is blocked (bindhosts)
bindhosts --query doubleclick.net
```

---

## Advanced Tips

### 🔐 **Malware and Tracker Blocking**

Hosts lists focus on ads. For malware and phishing, pair your blocker with a DNS filter (RethinkDNS, AdGuard DNS, or NextDNS), or use StevenBlack's alternate lists that bundle the social tracking extension.

### 🔄 **Backup and Restore**

- **AdAway:** use the built-in backup/export in settings
- **Bindhosts:** settings and sources live in the module folder under `/data/adb/modules/bindhosts/`

### 🧩 **Complementary Root Tools**

- [ForceDNS Cloudflare](https://github.com/LuferOS/forcedns_Magisk-kernelsu) - forces all DNS traffic to Cloudflare via iptables
- [AdGuard Home for Root](https://github.com/twoone-3/AdGuardHomeForRoot) - runs a full DNS filter on the device

---

## FAQ

### ❓ **Frequently Asked Questions**

**Q: Will ad blocking affect app functionality?**
A: Most apps work normally. Whitelist domains for apps that rely on blocked networks.

**Q: Can I run AdAway and Bindhosts together?**
A: Bindhosts supports AdAway coexistence, but a single active hosts writer avoids conflicts. Do not run two hosts writers in competition.

**Q: Do I need to update hosts files manually?**
A: AdAway has a built-in auto-updater, and Bindhosts self-updates on a schedule. Manual updates are a fallback.

**Q: Will this work with a VPN?**
A: Yes. Hosts-based blocking operates below the VPN layer and works alongside VPN apps, unlike VPN-slot blockers.

**Q: How much storage do hosts files use?**
A: Typically 1-3 MB depending on the sources. Very large lists can slow DNS lookups slightly.

**Q: Does this work on mobile data?**
A: Yes, hosts blocking applies to Wi-Fi and mobile data alike.

**Q: Will OTA updates remove ad blocking?**
A: Systemless methods (AdAway root mode, Bindhosts) survive OTA updates. Direct writes to `/system` do not.

**Q: What about non-root ad blocking?**
A: See the [non-root alternatives guide](../non-root-alternatives.md) for Private DNS, RethinkDNS, browser extensions, and patched apps.

---

## Related Guides

- 📖 [Complete Android Rooting Guide](../rooting-guides/) - Start your rooting journey
- 🔧 [Magisk Installation Guide](../rooting-guides/magisk-guide.md) - Popular systemless root
- ⚡ [KernelSU Setup Guide](../rooting-guides/kernelsu-guide.md) - Kernel-based root with advanced hiding
- 🛠️ [LSPosed Configuration](../rooting-guides/lsposed-guide.md) - Advanced app modifications
- 🧹 [Android Debloating Guide](./android-apps-debloating.md) - Remove bloatware for better performance
- 🛡️ [Privacy & Security Apps](../apps-and-modules/privacy) - Additional privacy tools
- 🔍 [More Ad Blocking Solutions](../apps-and-modules/ad-blocking#ad-tracker-blocking) - Alternative blockers

---

## Conclusion

Root-based ad blocking provides the most comprehensive way to eliminate advertisements across your Android system. **AdAway** suits most users with its simple interface and built-in updater, while **Bindhosts** suits power users who want SuSFS hiding, redirect methods, and KernelSU/APatch optimization.

Remember to:

- ✅ Keep your hosts sources updated
- ✅ Maintain a whitelist for essential apps
- ✅ Pair with a DNS filter for hardcoded-DNS apps
- ✅ Back up your configuration

---

<div align="center">

*📚 Part of the [Awesome Android Root](https://github.com/awesome-android-root/awesome-android-root) collection*

[![Star on GitHub](https://img.shields.io/github/stars/awesome-android-root/awesome-android-root?style=social)](https://github.com/awesome-android-root/awesome-android-root)

</div>
