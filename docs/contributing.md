---
layout: doc
title: Contribution Guidelines
description: "Learn how to contribute root apps, Magisk modules and guides to the Awesome Android Root collection."
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

Thank you for contributing to **Awesome Android Root**. Please follow these guidelines to make your additions consistent and helpful.

## Quick Contribution Checklist

Before submitting your contribution, ensure you've completed all these steps:

- [ ] **Verified app/module is actively maintained** (updated within last 12 months)
- [ ] **Tested the link** - confirms it's working and points to official source
- [ ] **Checked for duplicates** - app/module isn't already listed
- [ ] **Used correct format** - follows the exact markdown structure below
- [ ] **Added appropriate tags** - `FOSS`/`Proprietary` and module tags `[M]` `[K]` `[LSP]`
- [ ] **Placed in correct category** - alphabetical order within existing section
- [ ] **Written clear description** - concise but informative (1-2 sentences max)
- [ ] **Verified root requirement** - app/module requires root access to function

## How to Contribute

### Step 1: Fork and Create Branch
1. **Fork** this repository to your GitHub account
2. **Create a new branch** for your changes: `git checkout -b add-new-app-name`
3. **Make your changes** following the guidelines below
4. **Submit a pull request** with a clear description

### Step 2: Adding New Apps/Modules

Use this **exact format** for all entries:

```markdown
- **[App Name](link-to-official-source)** - Brief description of what it does and key features. `FOSS/Proprietary` `[M]` `[LSP]` `[K]`
```

#### **Required Elements:**
- **App Name**: Use the official app name
- **Link**: Must point to official source (GitHub, F-Droid, Play Store, XDA, etc.)
- **Description**: 1-2 sentences max, focus on core functionality
- **License Tag**: Either `FOSS` (open-source) or `Proprietary` (closed-source)
- **Module Tags** (if applicable):
  - `[M]` = Magisk Module
  - `[K]` = KernelSU Module  
  - `[LSP]` = Requires LSPosed Framework

#### **Example Entries:**

```markdown
- **[AdAway](https://github.com/AdAway/AdAway)** - System-wide ad blocker that blocks ads in apps and browsers using host files. `FOSS`
- **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Detaches installed apps from Play Store to prevent automatic updates. `FOSS` `[M]`
- **[LSPosed](https://github.com/LSPosed/LSPosed)** - Xposed Framework implementation for Android 8.1+ with improved compatibility. `FOSS` `[M]` `[LSP]`
```

### Step 3: Category Placement

- **Find the appropriate existing category** - don't create new categories
- **Maintain alphabetical order** within the category
- **Place root management tools** in "Managers" section
- **Place general apps** in most specific relevant category

### Step 4: Validation Requirements

#### **Link Validation:**
- [ ] Link opens successfully 
- [ ] Points to official/authoritative source
- [ ] No redirects through URL shorteners
- [ ] Prefer GitHub/F-Droid over mirrors when available

#### **Content Validation:**
- [ ] App requires root access for core functionality
- [ ] App is actively maintained (commits/releases within 12 months)
- [ ] No malware/suspicious behavior reported
- [ ] Compatible with modern Android versions (8.0+)

#### **Quality Standards:**
- [ ] Description is accurate and helpful
- [ ] No promotional language or marketing speak
- [ ] Focus on functionality, not subjective opinions
- [ ] Proper grammar and spelling

## Sample Pull Request Template

When submitting, use this template:

```
## What I'm Adding
- [App Name] - Brief description of the app

## Validation Checklist
- [ ] Tested link and confirmed it works
- [ ] Verified app requires root access
- [ ] Checked app is actively maintained
- [ ] Confirmed no duplicates exist
- [ ] Used correct markdown format and tags
- [ ] Placed in appropriate category alphabetically

## Additional Notes
[Any special notes about the app, compatibility issues, etc.]
```

## Quality Standards

### **Must-Have Requirements:**
- Apps must be **root-related** - requires root access for core functionality
- Must be **actively maintained** - recent updates or active community
- **Working links** to official sources only
- **Clear, concise descriptions** focusing on functionality
- **Proper categorization** in existing sections
- **Alphabetical ordering** within categories

### **Prohibited Content:**
- **Malware or suspicious apps** 
- **Dead/abandoned projects** (no updates for 2+ years)
- **Duplicate entries** of existing apps
- **Apps that don't require root** (unless in specific non-root sections)
- **Promotional language** or marketing descriptions
- **URL shorteners** or redirect links

## Advanced Guidelines

### **Frontmatter Requirements**
When adding guides or major content, include proper frontmatter:

```yaml
---
layout: doc
title: "Your Guide Title"
description: "Brief SEO-friendly description under 160 characters"
head:
  - - meta
    - property: og:title
      content: "Your Guide Title"
  - - meta
    - property: og:description  
      content: "Brief description for social sharing"
---
```

### **SEO Best Practices**
- Use descriptive titles and headings
- Include relevant keywords naturally
- Keep descriptions under 160 characters
- Use proper heading hierarchy (H1 → H2 → H3)

## Review Process

1. **Automated checks** verify formatting and links
2. **Community review** for quality and relevance  
3. **Maintainer approval** for final merge
4. **Stats update** happens automatically via build process

## Need Help?

- **Questions about guidelines?** Open an issue for clarification
- **Unsure about categorization?** Check similar existing apps
- **Technical issues?** Join our community discussions
- **Major suggestions?** Open a feature request issue

---

> **Remember:** Quality over quantity! One well-researched, properly formatted entry is better than multiple rushed submissions. Your contributions help thousands of Android users discover amazing root tools! 🚀