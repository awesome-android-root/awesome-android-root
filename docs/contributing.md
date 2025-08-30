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
# Comprehensive Contribution Guidelines

Thank you for contributing to **Awesome Android Root**! This comprehensive guide will help you add high-quality entries that follow our established standards and serve the Android root community effectively.

## Overview

Our collection features **300+ carefully curated root apps, Magisk modules, KernelSU modules, and LSPosed modules** organized into detailed categories. We maintain high standards for quality, accuracy, and usefulness to ensure every entry provides genuine value to the Android root community.

## Quick Contribution Checklist

Before submitting your contribution, ensure you've completed all these steps:

- [ ] **Verified app/module is actively maintained** (updated within last 18 months)
- [ ] **Tested all links** - primary link and source code link (📦) both work
- [ ] **Checked for duplicates** - app/module isn't already listed in any category
- [ ] **Used correct format** - follows exact markdown structure with all required elements
- [ ] **Added appropriate tags** - correct `FOSS`/`Proprietary` and framework tags `[M]` `[K]` `[LSP]`
- [ ] **Included source code link** - added `[📦](repo-url)` when source is available
- [ ] **Used proper link priority** - F-Droid → GitHub → Official Site → Play Store
- [ ] **Placed in correct category** - appropriate section and subcategory, alphabetical order
- [ ] **Written clear description** - concise, functional focus, 1-2 sentences max
- [ ] **Verified root requirement** - app/module requires root access for core functionality
- [ ] **Added community badge** - included ⭐ prefix if widely recommended
- [ ] **Framework compatibility** - correctly identified Magisk/KernelSU/LSPosed requirements

## How to Contribute

### Step 1: Fork and Create Branch
1. **Fork** this repository to your GitHub account
2. **Create a new branch** for your changes: `git checkout -b add-new-app-name`
3. **Make your changes** following the guidelines below
4. **Submit a pull request** with a clear description

### Step 2: Adding New Apps/Modules

Use this **exact format** for all entries:

```markdown
- **[App Name](link-to-official-source)** - Brief description of what it does and key features. [📦](link-to-source-code) `FOSS/Proprietary` `[M]` `[LSP]` `[K]`
```

#### **Required Elements:**
- **App Name**: Use the official app name (bold formatting with brackets)
- **Primary Link**: Must point to the **best available source** (priority: F-Droid → GitHub → Official Site → Play Store)
- **Description**: 1-2 sentences max, focus on core functionality and main features
- **Source Code Link** (if available): `[📦](source-link)` pointing to GitHub/GitLab repository
- **License Tag**: Either `FOSS` (open-source) or `Proprietary` (closed-source)
- **Root Framework Tags** (if applicable):
  - `[M]` = Magisk Module
  - `[K]` = KernelSU Module  
  - `[LSP]` = LSPosed/Xposed Module
- **Community Recommendation** (optional): Prefix with **⭐** for widely recommended apps

#### **Link Priority Order:**
1. **F-Droid** (for open-source apps) - `https://f-droid.org/packages/package.name`
2. **GitHub/GitLab** (for source code or direct releases) - `https://github.com/user/repo`
3. **Official Website** (for proprietary apps with official sites)
4. **Play Store** (last resort) - `https://play.google.com/store/apps/details?id=package.name`
5. **XDA Forums** (for XDA-exclusive modules) - `https://xdaforums.com/...`

#### **Example Entries:**

```markdown
- **⭐ [AdAway](https://f-droid.org/packages/org.adaway/)** - Open-source ad blocker using hosts file. [📦](https://github.com/AdAway/AdAway) `FOSS`
- **[Zygisk Detach](https://github.com/j-hc/zygisk-detach)** - Zygisk module to detach installed apps from Play Store, hooking binder. `FOSS` `[M]`
- **[HyperCeiler](https://github.com/ReChronoRain/HyperCeiler/blob/main/README_en-US.md)** - Extensive customizations for HyperOS. `FOSS` `[LSP]`
- **[Universal GMS Doze](https://github.com/gloeyisk/universal-gms-doze)** - Patches Google Play services app and certain processes/services to be able to use battery optimization. `FOSS` `[M]`
```

### Step 3: Category Placement and Organization

#### **Category Guidelines:**
- **Find the appropriate existing category** - avoid creating new categories unless absolutely necessary
- **Maintain alphabetical order** within each category (ignoring the ⭐ prefix)
- **Use subcategories** where they exist (e.g., App Management → App Managers and Control)
- **Consider functionality first** - place apps based on their primary purpose

#### **Category Structure Overview:**
The collection is organized into major sections:

1. **⭐ Featured Apps: The Essentials** - Table format for must-have root apps
2. **📱 Root Apps by Category** - Main categorical listings:
   - 🛠️ Root & System Management
   - 🔐 Security & Privacy  
   - 📦 App Management & Control
   - 🧹 System Optimization & Cleanup
   - 🎨 Customization & UI
   - 🔧 App Modifications & Patches
   - ⚡ Performance & System
   - 🗃️ Data & Storage
   - 🌐 Network & Connectivity
   - 📞 Communication & Contacts
   - 🎵 Audio & Media
   - 🛠️ Developer & Technical Tools
   - ♿ Accessibility & Utilities

#### **Special Formatting Rules:**
- **Community Recommended**: Prefix with **⭐** for widely used/trusted apps
- **Related Guides**: Include guide links when relevant: `> 📚 **Related Guide**: [Guide Title](../guides/guide-name.md)`
- **Subcategory Headers**: Use `### Subcategory Name` format
- **Back to Top Links**: Include `[↑ Back to top](#table-of-contents)` after each major section

#### **Platform-Specific Considerations:**
- **OS-Specific Mods**: Place under Customization → OS Specific Mods → [OS Name]
- **Framework-Specific**: Clearly indicate Magisk/KernelSU/LSPosed requirements
- **Multi-Framework Support**: List all applicable framework tags

### Step 4: Validation Requirements

#### **Link Validation:**
- [ ] **Primary link** opens successfully and points to best available source
- [ ] **Source code link** (`📦`) works and points to actual repository
- [ ] **No redirects** through URL shorteners or suspicious domains
- [ ] **Prefer official sources** in this priority order:
  1. F-Droid (for FOSS apps)
  2. GitHub/GitLab releases or main repo
  3. Official website/homepage  
  4. Google Play Store (last resort)
  5. XDA Forums (for XDA-exclusive content)

#### **Content Validation:**
- [ ] **App requires root access** for core functionality (or is a root management tool)
- [ ] **App is actively maintained** - commits/releases within 18 months
- [ ] **No malware/suspicious behavior** reported in community
- [ ] **Compatible with modern Android** versions (Android 8.0+ preferred)
- [ ] **Functional and stable** - not in early alpha/broken state

#### **Quality Standards:**
- [ ] **Description is accurate** and focuses on functionality, not marketing
- [ ] **Proper framework tags** - correctly identifies Magisk/KernelSU/LSPosed requirements
- [ ] **License correctly identified** - FOSS vs Proprietary properly tagged
- [ ] **No promotional language** - objective, informative descriptions only
- [ ] **Proper grammar and spelling** - professional presentation
- [ ] **Unique entry** - not a duplicate of existing listing

#### **Special Validation for Modules:**
- [ ] **Module compatibility** clearly specified (Magisk/KernelSU/LSPosed)
- [ ] **Android version support** mentioned if limited
- [ ] **Device compatibility** noted if specific to certain OEMs/SOCs
- [ ] **Installation requirements** clear (e.g., requires specific framework version)

## Sample Pull Request Template

When submitting, use this template:

```
## What I'm Adding
- [App Name] - Brief description of the app and its primary function
- Category: [Category Name] → [Subcategory if applicable]
- Framework: [Magisk/KernelSU/LSPosed/Root App]

## Links Provided
- Primary: [Link to best source - F-Droid/GitHub/Official]
- Source Code: [📦 GitHub/GitLab link if available]
- Framework: [Specific framework requirements]

## Validation Checklist
- [ ] Tested all links and confirmed they work
- [ ] Verified app requires root access for core functionality  
- [ ] Confirmed app is actively maintained (updates within 18 months)
- [ ] Checked for duplicates - no existing entries for this app
- [ ] Used correct markdown format with all required elements
- [ ] Included appropriate badges (⭐, `FOSS`/`Proprietary`, `[M]`/`[K]`/`[LSP]`)
- [ ] Placed in correct category and subcategory alphabetically
- [ ] Added source code link (📦) if available
- [ ] Description focuses on functionality, not marketing
- [ ] Verified license classification (FOSS/Proprietary)

## Framework Requirements (if applicable)
- [ ] Magisk Module - tested and compatible
- [ ] KernelSU Module - tested and compatible  
- [ ] LSPosed Module - tested and compatible
- [ ] Specific Android version requirements noted
- [ ] Device/OEM compatibility mentioned if limited

## Additional Information
[Any special notes about compatibility, installation requirements, or unique features]

## Testing Environment (for modules)
- Device: [Device model]
- Android Version: [Version]
- Root Method: [Magisk/KernelSU version]
- Framework: [LSPosed version if applicable]
```

## Quality Standards

### **Must-Have Requirements:**
- **Root-related functionality** - requires root access for core features (or is a root management tool)
- **Active maintenance** - recent updates within 18 months or active community support
- **Working links** to official/authoritative sources with proper priority order
- **Clear, accurate descriptions** focusing on functionality and main features
- **Proper categorization** in existing sections with correct subcategory placement
- **Alphabetical ordering** within categories (ignoring ⭐ prefix for community recommendations)
- **Correct badge usage** - accurate `FOSS`/`Proprietary` and framework tags
- **Source code links** (`📦`) when repositories are available

### **Framework-Specific Requirements:**
- **Magisk Modules** - compatible with recent Magisk versions, systemless installation
- **KernelSU Modules** - compatible with KernelSU framework requirements  
- **LSPosed Modules** - compatible with LSPosed framework, Android version support clear
- **Multi-framework** - clearly indicate all supported frameworks with appropriate tags

### **Content Quality Guidelines:**
- **Objective descriptions** - focus on what the app does, not subjective opinions
- **Technical accuracy** - correct understanding of root/framework requirements
- **User-focused** - descriptions should help users understand if they need the app
- **Concise but informative** - 1-2 sentences covering main functionality and key features
- **Professional tone** - avoid marketing language, memes, or excessive enthusiasm

### **Prohibited Content:**
- **Malware or suspicious apps** - any apps with reported security issues
- **Dead/abandoned projects** - no updates or community activity for 2+ years  
- **Duplicate entries** - check thoroughly for existing listings
- **Non-root apps** - unless specifically in allowed categories (like F-Droid clients)
- **Promotional language** - marketing speak, affiliate links, or biased descriptions
- **URL shorteners** - use direct links to official sources only
- **Broken or malicious links** - all links must be tested and safe
- **Copyright violations** - ensure submitted apps respect intellectual property rights

### **Special Considerations:**
- **Regional restrictions** - note if apps have geographic limitations
- **Device compatibility** - mention if limited to specific OEMs or hardware
- **Android version requirements** - specify if app has version limitations  
- **Framework dependencies** - clearly indicate prerequisite installations
- **Installation complexity** - note if manual installation or special setup required

## Advanced Guidelines

### **Badge and Tag System:**

#### **Community Recommendation Badge:**
- **⭐** prefix for widely recommended, trusted apps in their category
- Reserve for apps with strong community consensus and proven reliability
- Consider factors: popularity, maintenance quality, user satisfaction, essential functionality

#### **License Classification:**
- **`FOSS`** - Free and Open Source Software with accessible source code
- **`Proprietary`** - Closed-source software or unclear licensing
- When in doubt, check repository, license files, or official documentation

#### **Framework Tags:**
- **`[M]`** - Magisk Module (requires Magisk framework)
- **`[K]`** - KernelSU Module (requires KernelSU framework)  
- **`[LSP]`** - LSPosed/Xposed Module (requires LSPosed framework)
- Use multiple tags if module supports multiple frameworks: `[M]` `[K]`

#### **Source Code Links:**
- **`[📦](repository-url)`** - Link to source code repository
- Include when source code is publicly available on GitHub, GitLab, etc.
- Place after description, before license/framework tags
- Use only for actual source repositories, not just releases or downloads

### **Writing Effective Descriptions:**

#### **Description Best Practices:**
- **Start with core function** - what does the app do?
- **Mention key features** - what makes it useful/unique?
- **Keep technical** - focus on functionality over benefits
- **Avoid redundancy** - don't repeat the app name or obvious information
- **Use active voice** - "Blocks ads" not "Can be used to block ads"

#### **Description Examples:**
```markdown
✅ Good: "System-wide ad blocker using hosts file with automatic list updates and whitelist management."
❌ Bad: "AdAway is the best ad blocker app that you should definitely install to block annoying ads."

✅ Good: "Zygisk module to detach installed apps from Play Store, preventing automatic updates."  
❌ Bad: "Amazing module that helps you stop apps from updating which is really useful."

✅ Good: "Extensive customizations for HyperOS including status bar, control center, and system behavior modifications."
❌ Bad: "The ultimate customization module for MIUI that can do everything you want."
```

### **Category-Specific Guidelines:**

#### **OS-Specific Modules:**
When adding OS-specific customization modules:
- Place under **Customization → OS Specific Mods → [OS Name]**
- Clearly indicate OS compatibility in description
- Include Android version support if limited
- Mention device compatibility if restricted to specific OEMs

#### **Audio Modules:**
Audio enhancement modules should specify:
- Target audio components (speakers, headphones, microphone)
- Supported audio formats or sample rates
- Hardware compatibility (Snapdragon, MediaTek, etc.)

#### **Battery/Performance Modules:**
For optimization modules:
- Describe specific optimization approach
- Mention any potential trade-offs
- Include compatibility with different kernels if relevant

### **Link Quality and Priority:**

#### **Source Priority Hierarchy:**
1. **F-Droid** - `https://f-droid.org/packages/[package.name]`
2. **GitHub Releases** - `https://github.com/[user]/[repo]/releases`
3. **GitLab Releases** - `https://gitlab.com/[user]/[repo]/-/releases`
4. **Official Website** - Developer's official site
5. **Google Play Store** - `https://play.google.com/store/apps/details?id=[package.name]`
6. **XDA Forums** - For XDA-exclusive modules only
7. **Alternative stores** - APKMirror, etc. (avoid when possible)

#### **Link Quality Checks:**
- **Test functionality** - ensure links open and load correctly
- **Verify authenticity** - confirm links point to official sources
- **Check for redirects** - avoid unnecessary redirections
- **Mobile compatibility** - ensure links work on mobile devices
- **Long-term stability** - prefer stable, permanent URLs

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
  - - meta
    - name: keywords
      content: "relevant, keywords, for, seo"
---
```

### **SEO Best Practices**
- Use descriptive titles and headings with relevant keywords
- Include natural keyword placement in descriptions
- Keep meta descriptions under 160 characters
- Use proper heading hierarchy (H1 → H2 → H3)
- Include alt text for images when applicable
- Use semantic HTML structure

## Review Process

### **Maintainer Review**
1. **Final quality check** - comprehensive review of contribution quality
2. **Category placement** - verification of proper categorization and organization
3. **Documentation standards** - ensuring adherence to project guidelines
4. **Integration approval** - final approval and merge into main collection

### **Review Criteria**
Contributors can expect reviews to focus on:
- **Accuracy** - correct information and working links
- **Quality** - professional descriptions and proper formatting  
- **Relevance** - genuine root functionality and user value
- **Safety** - community consensus on app trustworthiness
- **Maintenance** - evidence of active development or support

## Need Help?

### **Getting Started**
- **New to contributing?** Read our [GitHub contribution guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects)
- **First time with root apps?** Check our [Complete Rooting Guide](../android-root-guides/) to understand the ecosystem
- **Markdown formatting help?** See [GitHub's Markdown guide](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)

### **Common Questions**
- **Questions about guidelines?** Open an issue with the "question" label for clarification
- **Unsure about categorization?** Look at similar existing apps or ask in discussions
- **Technical issues with submission?** Check our troubleshooting section or open a support issue
- **Major suggestions for improvement?** Open a feature request issue with detailed explanation

### **Getting Support**
- **GitHub Issues** - For bugs, questions, or technical problems
- **GitHub Discussions** - For general community conversations and ideas  
- **Pull Request Comments** - For specific feedback on your contributions
- **Documentation** - Check existing guides and examples throughout the repository

### **Community Guidelines**
- **Be respectful** - treat all community members with courtesy and professionalism
- **Be patient** - reviews take time and maintainers are volunteers
- **Be thorough** - complete submissions save time for everyone
- **Be collaborative** - accept feedback and suggestions positively
- **Follow the rules** - adherence to guidelines ensures consistent quality

---

> **Remember:** Quality over quantity! One well-researched, properly formatted entry is better than multiple rushed submissions. Your contributions help thousands of Android users discover amazing root tools and enhance their device experience! 🚀
> 
> **Thank you for contributing to the Android root community!** 📱✨