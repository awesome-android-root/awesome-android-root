---
layout: doc
title: Contribution Guidelines
description: "Guidelines for contributing Android apps, modules, and documentation to the Awesome Android Root collection."
head:
  - - meta
    - property: og:title
      content: Contributing to Awesome Android Root - Contribution Guidelines
  - - meta
    - property: og:description
      content: Learn how to add Android apps, modules, and guides with the project's entry, category, and quality standards.
  - - meta
    - name: twitter:creator
      content: "@awsm_and_root"
  - - meta
    - name: twitter:image:alt
      content: Contribution Guidelines - Awesome Android Root
  - - meta
    - name: twitter:title
      content: Contributing to Awesome Android Root - Guidelines
  - - meta
    - name: twitter:description
      content: Contribution instructions and standards for Android apps, modules, and guides.
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

Thank you for helping maintain **Awesome Android Root**. Contributions include new resources, corrections, and documentation updates.

## Add an app or module

1. Fork the repository and edit the relevant topic page in [`docs/apps-and-modules/`](https://github.com/awesome-android-root/awesome-android-root/tree/main/docs/apps-and-modules/). These category files are the collection's source of truth; the root `README.md` is an index.
2. Place each entry in one category that matches its main function. If the current categories do not fit, open a [taxonomy issue](https://github.com/awesome-android-root/awesome-android-root/issues/new?template=taxonomy-change.md) before reorganizing the collection.
3. Follow the entry format and quality checklist below, then submit a pull request.

## Entry format

Use this pattern:

```markdown
- **[⭐ App Name](primary-source-link)** - Briefly describe what it does. `FOSS` `[M]` | [🌱](f-droid-link) | [▶️](play-store-link)
```

Include:

- The app or module name linked to its best available source.
- A concise, factual 1-2 sentence description of its main function.
- One license badge: `FOSS` or `Proprietary`.
- Every applicable framework badge: `[M]` Magisk, `[K]` KernelSU, `[A]` APatch, or `[LSP]` LSPosed/Xposed.
- Optional store links after the badges: `🌱` for F-Droid/IzzyOnDroid and `▶️` for Google Play.

Prefer links in this order: GitHub, F-Droid, official project site, then Google Play. Use a direct project or release page when one exists.

### Examples

```markdown
- **[⭐ AdAway](https://github.com/AdAway/AdAway)** - Open-source ad blocker using the hosts file. Blocks ads without permissions. `FOSS` | [🌱](https://f-droid.org/packages/org.adaway)
- **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Detach apps from Play Store to prevent updates. `FOSS` `[M]`
- **[Magisk](https://github.com/topjohnwu/Magisk)** - Systemless root solution with module support. `FOSS`
- **[CorePatch](https://github.com/LSPosed/CorePatch)** - Disable signature verification for Android. `FOSS` `[LSP]`
- **[bindhosts](https://github.com/bindhosts/bindhosts)** - Systemless hosts for APatch, KernelSU and Magisk. `FOSS` `[M]` `[K]` `[A]`
```

## Badges

| Badge | Meaning |
| --- | --- |
| `FOSS` | Free and open-source software. |
| `Proprietary` | Closed-source software or licensing that is unclear. |
| `[M]` | Magisk module. |
| `[K]` | KernelSU module. |
| `[A]` | APatch module. |
| `[LSP]` | LSPosed/Xposed module. |
| `⭐` | Community-recommended entry; reserve it for widely trusted resources. |
| `🌱` | F-Droid or IzzyOnDroid listing. |
| `▶️` | Google Play listing. |

## Quality checklist

- Confirm the source link works and points to the project, not an unrelated mirror.
- Keep the description factual, concise, and free of promotional claims.
- Avoid duplicate entries and place the resource alphabetically in its category; starred entries come first.
- Confirm the resource was updated within the last 18 months, as required by the project.
- State relevant compatibility and access requirements. Root-specific apps and modules belong here; non-root tools are appropriate only when they clearly fit an established category. If root, ADB, Shizuku, or a particular framework is required, make that clear in the description or badges.
- Do not submit broken, malicious, or suspicious software.

## Other contributions

For guide changes, preserve prerequisites, warnings, commands, exceptions, and recovery instructions. Link to an existing canonical guide rather than duplicating long procedures where possible.

Before submitting, review the [pull request template](https://github.com/awesome-android-root/awesome-android-root/blob/main/.github/PULL_REQUEST_TEMPLATE.md). Ask questions in [GitHub Issues](https://github.com/awesome-android-root/awesome-android-root/issues), [Discussions](https://github.com/awesome-android-root/awesome-android-root/discussions), or the pull request itself.
