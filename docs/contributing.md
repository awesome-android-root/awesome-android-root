---
layout: doc
title: Contribution Guidelines
description: "Complete guide for contributing root apps, Magisk/KernelSU modules, and guides to the Awesome Android Root collection with detailed formatting standards."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.pages.dev/contributing
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: Contributing to Awesome Android Root - Contribution Guidelines
  - - meta
    - property: og:description
      content: Help grow the ultimate Android root resource collection. Learn how to contribute apps, Magisk modules, rooting guides, and more with our comprehensive guidelines.
  - - meta
    - property: og:url
      content: https://awesome-android-root.pages.dev/contributing
  - - meta
    - property: og:image
      content: https://awesome-android-root.pages.dev/images/og.png
  - - meta
    - property: og:locale
      content: en_US
  - - meta
    - property: og:site_name
      content: Awesome Android Root
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:site
      content: "@awsm_and_root"
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image
      content: https://awesome-android-root.pages.dev/images/og.png
  - - meta
    - name: twitter:image:alt
      content: Contribution Guidelines - Awesome Android Root
  - - meta
    - name: twitter:title
      content: Contributing to Awesome Android Root - Guidelines
  - - meta
    - name: twitter:description
      content: Help build the ultimate Android root resource collection. Learn contribution guidelines and standards.
  - - meta
    - name: keywords
      content: contribute android root, open source contribution, magisk modules submission, android root apps contribution, awesome android root github, root community contribution, xda developers contribution, android modding community
  - - meta
    - name: author
      content: Awesome Android Root Project
  - - meta
    - property: article:author
      content: https://github.com/awesome-android-root/awesome-android-root
  - - meta
    - property: article:section
      content: Community
  - - meta
    - property: article:tag
      content: Contributing
  - - meta
    - property: article:tag
      content: Open Source
  - - meta
    - property: article:tag
      content: Community Guidelines
  - - meta
    - property: article:tag
      content: Android Root
  - - meta
    - property: article:tag
      content: Magisk Modules
  - - meta
    - property: article:tag
      content: Root Apps
  - - meta
    - property: article:published_time
      content: 2025-05-25T00:00:00Z
  - - meta
    - property: article:modified_time
      content: 2026-06-05T00:00:00Z
  - - meta
    - name: robots
      content: index, follow
---
# Contribution Guidelines

Thank you for contributing to **Awesome Android Root**! This guide helps you add quality entries to our collection of **500+ root apps and modules**.

## Quick Start

**Want to add an app or module?** Follow these 3 simple steps:

### 1. Fork & Edit
1. **Fork** this repository
2. **Edit** `README.md` to add your entry
3. **Submit** a pull request

### 2. Use the Correct Format
```markdown
- **[App Name](link)** - Brief description of what it does. `FOSS` `[M]`
```

### 3. Follow the Rules
- ✅ App requires root access
- ✅ Working links only
- ✅ No duplicates
- ✅ Place in correct category (alphabetical order)

## Entry Format

**Template:**
```markdown
- **[⭐ App Name](primary-link)** - Description of functionality. `FOSS/Proprietary` `[M]` `[K]` `[A]` `[LSP]` | [🌱](f-droid-link) | [▶️](play-store-link)
```

**Required Elements:**
- **App Name** in bold with link
- **Primary Link** (best available source, see priority below)
- **Description** (1-2 sentences, focus on what it does)
- **License** (`FOSS` or `Proprietary`)
- **Framework Tags** (if applicable): `[M]` `[K]` `[A]` `[LSP]`
- **Store Icons** (optional): Add `| [🌱](link)` for F-Droid and/or `| [▶️](link)` for Play Store alongside the main entry

**Link Priority:**
1. GitHub → 2. F-Droid → 3. Official Site → 4. Play Store

**Store Icon Reference:**
| Icon | Source |
|:---|:---|
| `🌱` | Available on F-Droid / IzzyOnDroid |
| `▶️` | Available on Google Play Store |

**Examples:**
```markdown
- **⭐ [AdAway](https://github.com/AdAway/AdAway)** - Open-source ad blocker using the hosts file. Blocks ads without permissions. `FOSS` | [🌱](https://f-droid.org/packages/org.adaway)
- **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Detach apps from Play Store to prevent updates. `FOSS` `[M]`
- **[Magisk](https://github.com/topjohnwu/Magisk)** - Systemless root solution with module support. `FOSS`
- **[CorePatch](https://github.com/LSPosed/CorePatch)** - Disable signature verification for Android. `FOSS` `[LSP]`
- **[bindhosts](https://github.com/bindhosts/bindhosts)** - Systemless hosts for APatch, KernelSU and Magisk. `FOSS` `[M]` `[K]`
```

## Categories & Tags

### Framework Tags
- **`[M]`** = Magisk Module (requires [Magisk](../rooting-guides/magisk-guide.md))
- **`[K]`** = KernelSU Module (requires [KernelSU](../rooting-guides/kernelsu-guide.md))
- **`[A]`** = APatch Module (requires [APatch](../rooting-guides/apatch-guide.md))
- **`[LSP]`** = LSPosed / Xposed Module (requires [LSPosed](../rooting-guides/lsposed-guide.md))

### License Tags
- **`FOSS`** = Free and Open Source Software (source code available)
- **`Proprietary`** = Closed-source software or unclear licensing

### Special Badges
- **⭐** = Community recommended (widely trusted apps)

### Store & Source Icons
- **`🌱`** = Available on F-Droid / IzzyOnDroid
- **`▶️`** = Available on Google Play Store


## Quality Requirements

**Must Have:**
- ✅ App requires root access for main features
- ✅ Working links to official sources
- ✅ Updated within last 18 months
- ✅ No duplicates
- ✅ Proper category placement (alphabetical order)
- ✅ Correct format and tags

**Don't Include:**
- ❌ Broken/dead apps
- ❌ Malware or suspicious apps
- ❌ Non-root apps (unless in specific categories)
- ❌ Promotional language

## Pull Request Template

When submitting, use this format:

```
### What I'm Adding
- [App Name] - Brief description
- Category: [Category Name]
- Framework: [Magisk/KernelSU/APatch/LSPosed/Root App]

### Checklist
- [ ] Tested all links
- [ ] App requires root access
- [ ] No duplicates found
- [ ] Correct format used
- [ ] Placed in right category alphabetically
- [ ] Added proper tags (license, framework, store icons)

### Links
- Primary: [Best available link]
- Source: [GitHub/GitLab if available]
- F-Droid: [F-Droid link if available]
- Play Store: [Play Store link if available]
```

## Need Help?

**Common Questions:**
- **Where to place my app?** Look for similar apps in the categories
- **What if it's both FOSS and has modules?** Use multiple tags: `FOSS` `[M]` `[K]` `[LSP]`
- **Can I add F-Droid or Play Store links?** Yes! Add store icons after the description: `| [🌱](f-droid-link) | [▶️](play-store-link)`
- **App works without root too?** If main features need root, include it
- **Unsure about tags?** Check similar apps for examples
- **What if an app supports multiple frameworks?** List all applicable tags: `[M]` `[K]` `[A]`

**Get Support:**
- 🐛 **[Issues](https://github.com/awesome-android-root/awesome-android-root/issues):** For bugs or questions
- 💬 **[Discussions](https://github.com/awesome-android-root/awesome-android-root/discussions):** For general help
- 📝 **PR Comments:** For specific feedback

---

**Quality over quantity!** One good entry is better than multiple rushed ones. Thanks for contributing!