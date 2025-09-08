---
layout: doc
title: Contribution Guidelines
description: "Complete guide for contributing root apps, Magisk/KernelSU modules, and guides to the Awesome Android Root collection with detailed formatting standards."
head:
  - - link
    - rel: canonical
      href: https://awesome-android-root.org/contributing
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
      content: https://awesome-android-root.org/contributing
  - - meta
    - property: og:image
      content: https://awesome-android-root.org/images/og.png
  - - meta
    - name: twitter:card
      content: summary_large_image
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
    - name: robots
      content: index, follow
---
# Contribution Guidelines

Thank you for contributing to **Awesome Android Root**! This guide helps you add quality entries to our collection of **400+ root apps and modules**.

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
- **[App Name](primary-link)** - Description of functionality. `FOSS/Proprietary` `[M]` `[K]` `[LSP]`
```

**Required Elements:**
- **App Name** in bold with link
- **Primary Link** (best available source)
- **Description** (1-2 sentences, focus on what it does)
- **License** (`FOSS` or `Proprietary`)
- **Framework Tags** (if applicable): `[M]` `[K]` `[LSP]`

**Link Priority:**
1. F-Droid → 2. GitHub → 3. Official Site → 4. Play Store

**Examples:**
```markdown
- **⭐ [AdAway](https://f-droid.org/packages/org.adaway/)** - System-wide ad blocker using hosts file. `FOSS`
- **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Detach apps from Play Store to prevent updates. `FOSS` `[M]`
- **[Magisk](https://github.com/topjohnwu/Magisk)** - Systemless root solution with module support. `FOSS`
```

## Categories & Tags

### Framework Tags
- **`[M]`** = Magisk Module
- **`[K]`** = KernelSU Module  
- **`[LSP]`** = LSPosed/Xposed Module

### License Tags
- **`FOSS`** = Open source (source code available)
- **`Proprietary`** = Closed source

### Special Badges
- **⭐** = Community recommended (widely trusted apps)


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
- Framework: [Magisk/KernelSU/LSPosed/Root App]

### Checklist
- [ ] Tested all links
- [ ] App requires root access
- [ ] No duplicates found
- [ ] Correct format used
- [ ] Placed in right category alphabetically
- [ ] Added proper tags

### Links
- Primary: [Best available link]
- Source: [GitHub/GitLab if available]
```

## Need Help?

**Common Questions:**
- **Where to place my app?** Look for similar apps in the categories
- **What if it's both FOSS and has modules?** Use multiple tags: `FOSS` `[M]` `[LSP]`
- **App works without root too?** If main features need root, include it
- **Unsure about tags?** Check similar apps for examples

**Get Support:**
- 🐛 **[Issues](https://github.com/awesome-android-root/awesome-android-root/issues):** For bugs or questions
- 💬 **[Discussions](https://github.com/awesome-android-root/awesome-android-root/discussions):** For general help
- 📝 **PR Comments:** For specific feedback

---

**Quality over quantity!** One good entry is better than multiple rushed ones. Thanks for contributing!