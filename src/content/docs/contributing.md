---
title: Contribution Guidelines
description: Complete guide for contributing root apps, Magisk/KernelSU modules, and guides to the Awesome Android Root collection with detailed formatting standards.
head:
  - tag: link
    attrs: {href: 'https://awesome-android-root.zhoe.org/contributing', rel: canonical}
  - tag: meta
    attrs: {content: article, property: 'og:type'}
  - tag: meta
    attrs: {content: Contributing to Awesome Android Root - Contribution Guidelines, property: 'og:title'}
  - tag: meta
    attrs: {content: 'Help grow the ultimate Android root resource collection. Learn how to contribute apps, Magisk modules, rooting guides, and more with our comprehensive guidelines.', property: 'og:description'}
  - tag: meta
    attrs: {content: 'https://awesome-android-root.zhoe.org/contributing', property: 'og:url'}
  - tag: meta
    attrs: {content: 'https://awesome-android-root.zhoe.org/images/og.png', property: 'og:image'}
  - tag: meta
    attrs: {content: en_US, property: 'og:locale'}
  - tag: meta
    attrs: {content: Awesome Android Root, property: 'og:site_name'}
  - tag: meta
    attrs: {content: summary_large_image, name: 'twitter:card'}
  - tag: meta
    attrs: {content: '@awsm_and_root', name: 'twitter:site'}
  - tag: meta
    attrs: {content: '@awsm_and_root', name: 'twitter:creator'}
  - tag: meta
    attrs: {content: 'https://awesome-android-root.zhoe.org/images/og.png', name: 'twitter:image'}
  - tag: meta
    attrs: {content: Contribution Guidelines - Awesome Android Root, name: 'twitter:image:alt'}
  - tag: meta
    attrs: {content: Contributing to Awesome Android Root - Guidelines, name: 'twitter:title'}
  - tag: meta
    attrs: {content: Help build the ultimate Android root resource collection. Learn contribution guidelines and standards., name: 'twitter:description'}
  - tag: meta
    attrs: {content: Awesome Android Root Project, name: author}
  - tag: meta
    attrs: {content: 'https://github.com/awesome-android-root/awesome-android-root', property: 'article:author'}
  - tag: meta
    attrs: {content: Community, property: 'article:section'}
  - tag: meta
    attrs: {content: Contributing, property: 'article:tag'}
  - tag: meta
    attrs: {content: Open Source, property: 'article:tag'}
  - tag: meta
    attrs: {content: Community Guidelines, property: 'article:tag'}
  - tag: meta
    attrs: {content: Android Root, property: 'article:tag'}
  - tag: meta
    attrs: {content: Magisk Modules, property: 'article:tag'}
  - tag: meta
    attrs: {content: Root Apps, property: 'article:tag'}
  - tag: meta
    attrs: {content: '2025-05-25 00:00:00+00:00', property: 'article:published_time'}
  - tag: meta
    attrs: {content: '2026-06-05 00:00:00+00:00', property: 'article:modified_time'}
  - tag: meta
    attrs: {content: 'index, follow', name: robots}
---

# Contribution Guidelines

Thank you for contributing to **Awesome Android Root**! This guide helps you add quality entries to our collection of **600+ root apps and modules**.

## Quick Start

**Want to add an app or module?** Follow these 3 simple steps:

### 1. Fork & Edit
1. **Fork** this repository
2. **Edit** the category page that best matches the app/module (see [Category Pages](#category-pages))
3. **Submit** a pull request

> The collection lives in [`src/content/docs/apps-and-modules/`](https://github.com/awesome-android-root/awesome-android-root/tree/main/docs/apps-and-modules) -
> one Markdown file per topic. The root `README.md` is only a lightweight index, not the database.

### 2. Use the Correct Format
```markdown
- **[App Name](link)** - Brief description of what it does. `FOSS` `[M]`
```

### 3. Follow the Rules
- ✅ App requires root access
- ✅ Working links only
- ✅ No duplicates
- ✅ Place in correct category (alphabetical order)

## Category Pages

Every entry belongs to exactly **one topic page** in `src/content/docs/apps-and-modules/`. Place your entry in the page that matches what the tool *does* for the user.

**Unsure?** Look for similar apps inside the category page, or open a
[Taxonomy Change](https://github.com/awesome-android-root/awesome-android-root/issues/new?template=taxonomy-change.md)
issue if you believe a whole category should move, merge or split.

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
- **`[M]`** = Magisk Module (requires [Magisk](./rooting-guides/magisk-guide.md))
- **`[K]`** = KernelSU Module (requires [KernelSU](./rooting-guides/kernelsu-guide.md))
- **`[A]`** = APatch Module (requires [APatch](./rooting-guides/apatch-guide.md))
- **`[LSP]`** = LSPosed / Xposed Module (requires [LSPosed](./rooting-guides/lsposed-guide.md))

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

Visit [Pull Request Template ↗](https://github.com/awesome-android-root/awesome-android-root/blob/main/.github/PULL_REQUEST_TEMPLATE.md)

## Need Help?

**Common Questions:**
- **Where to place my app?** Look for similar apps inside the [category pages](#category-pages)
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