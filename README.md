<div align="center">

<picture>
  <source media="(prefers-color-scheme: light)" srcset="docs/public/images/logo.svg">
  <source media="(prefers-color-scheme: dark)" srcset="docs/public/images/logo_dark.svg">
  <img src="docs/public/images/logo.svg" alt="Awesome Android Root Logo" width="120" height="120" />
</picture>

# Awesome Android Root

**🛡️ Community-curated Android rooting knowledge base**

<sub>750+ root apps, Magisk / KernelSU / APatch / LSPosed (Xposed) modules, and step-by-step rooting guides.</sub>

[![Website](https://img.shields.io/badge/Website-awesome--android--root.xyz%E2%86%97-blue?style=for-the-badge&logo=googlechrome&logoColor=white)](https://awesome-android-root.xyz/)

[![GitHub Repo stars](https://img.shields.io/github/stars/awesome-android-root/awesome-android-root?logo=github&style=for-the-badge&color=blue&cacheSeconds=3600)](https://github.com/awesome-android-root/awesome-android-root)
[![Apps and Modules](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fawesome-android-root.xyz%2Fcount.json&query=%24.total&label=apps%20%26%20modules&color=blue&logo=android&style=for-the-badge)](https://awesome-android-root.xyz/apps-and-modules/)
[![Codeberg Mirror](https://img.shields.io/badge/Codeberg-Mirror-2185D0?style=for-the-badge&logo=codeberg&logoColor=white)](https://codeberg.org/awesome-android-root/awesome-android-root/)

</div>

<p align="center">
  <a href="#start-here">Start Here</a> &middot;
  <a href="#apps-and-modules">Apps &amp; Modules</a> &middot;
  <a href="#guides-and-documentation">Guides</a> &middot;
  <a href="#contributing">Contributing</a> &middot;
  <a href="#community">Community</a> &middot;
  <a href="#license-and-disclaimer">License</a>
</p>

---

## What is Awesome Android Root?

Awesome Android Root is a community-curated knowledge base for **rooting Android devices and making good use of root access**. It has three parts:

| Part | What you get |
| :--- | :--- |
| **Rooting guides** | Magisk, KernelSU, APatch, LSPosed, bootloader unlocking, and device walkthroughs for Pixel, Samsung, Xiaomi, OnePlus, Nothing, and Motorola. |
| **Apps & modules database** | 750+ curated entries with source links, store badges, and license info. |
| **Tutorials, FAQs & fixes** | Ad blocking, debloating, Play Integrity, bootloop recovery, and more. |

Every entry links to its primary source (GitHub, F-Droid, or the project site) and carries license and framework badges, so you can check a tool before you install it.

### Entry badges

| Badge | Meaning |
| :--- | :--- |
| `[M]` | Works with Magisk |
| `[K]` | Works with KernelSU |
| `[A]` | Works with APatch |
| `[LSP]` | LSPosed (Xposed) module |
| `FOSS` / `Proprietary` | License type |
| `⭐` | Widely trusted resource |

## Start Here

New to rooting? Follow this order:

1. Read the [FAQ](docs/faqs.md) before you touch the bootloader.
2. Pick a path in the [Rooting Guides](docs/rooting-guides/index.md).
3. Keep [Troubleshooting](docs/troubleshooting.md) open in case of a bootloop or a failed integrity check.
4. Not sure you want root? See the [Temporary Root](docs/rooting-guides/root-without-unlocking-bootloader.md) or [Non-Root Alternatives](docs/non-root-alternatives.md) (Shizuku, ADB, and more).

## Website

The site is the easiest way to browse. It adds instant search across every app, module, and guide, per-category navigation, and installs as a PWA.

**[Open awesome-android-root.xyz ↗](https://awesome-android-root.xyz)**

## Apps and Modules

Entries live in [`docs/apps-and-modules/`](docs/apps-and-modules/index.md), the source of truth for the collection. Each category is mirrored on the [website ↗](https://awesome-android-root.xyz/apps-and-modules/) with search.

| Category | Site  | Covers |
| :--- | :---: | :--- |
| **[Root Management](docs/apps-and-modules/root-management.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/root-management) | Root managers, temporary root, module managers, metamodules, LSPosed, Zygisk, root hiding, Play Integrity |
| **[System](docs/apps-and-modules/system.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/system) | System tweaks, VBMeta, System UI and OEM frameworks, boot and startup, app and package management |
| **[Performance & Battery](docs/apps-and-modules/performance.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/performance) | Performance tuning, kernels, memory, battery and charging |
| **[Privacy](docs/apps-and-modules/privacy.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/privacy) | Privacy tools, device ID and location spoofing, app isolation |
| **[Security](docs/apps-and-modules/security.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/security) | Security tools and firewalls |
| **[Ad Blocking](docs/apps-and-modules/ad-blocking.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/ad-blocking) | Hosts-based ad blockers and DNS filtering |
| **[App Modifications](docs/apps-and-modules/app-modifications.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/app-modifications) | App patchers, social and browser mods, media and camera tools, signature verification |
| **[Debloating](docs/apps-and-modules/debloating.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/debloating) | Remove bloatware and unwanted system apps |
| **[File Management](docs/apps-and-modules/file-management.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/file-management) | Root file managers, cleaners, partition tools |
| **[Backup & Restore](docs/apps-and-modules/backup.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/backup) | Full app and data backups, recovery |
| **[Customization](docs/apps-and-modules/customization.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/customization) | Themes, launchers, status bar, fonts, display |
| **[Audio](docs/apps-and-modules/audio.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/audio) | Audio enhancement, control, and effects |
| **[Networking](docs/apps-and-modules/networking.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/networking) | VPN and proxy modules, network tools, Wi-Fi, Bluetooth, NFC |
| **[Gaming](docs/apps-and-modules/gaming.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/gaming) | Gaming optimization, FPS unlockers, game tools |
| **[Development & Automation](docs/apps-and-modules/development.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/development) | Terminal, ADB, developer tools, Linux environments, automation |
| **[General Utilities](docs/apps-and-modules/utilities.md)** | [Open ↗](https://awesome-android-root.xyz/apps-and-modules/utilities) | Sync, power, sharing, communication, toolboxes |

## Guides and Documentation

| Section | Contents |
| :--- | :--- |
| **[Rooting Guides](docs/rooting-guides/index.md)** | Introduction, root framework comparison, Magisk / KernelSU / APatch / LSPosed setup, bootloader unlocking, custom recovery, device-specific guides |
| **[General Guides](docs/general-guides/index.md)** | Ad blocking, debloating, stopping Play Store auto-updates |
| **[FAQ](docs/faqs.md)** | Common questions before and after rooting |
| **[Troubleshooting](docs/troubleshooting.md)** | Bootloops, Magisk / KernelSU / APatch issues, Play Integrity, banking apps |
| **[Non-Root Alternatives](docs/non-root-alternatives.md)** | Root-like features without root (Shizuku, ADB, and more) |
| **[Community Resources](docs/resources.md)** | Firmware, tooling, communities, emergency help |
| **[Contributing](docs/contributing.md)** | How to add apps, modules, and guides |
| **[About and Legal](docs/about.md)** | Mission and legal disclaimer |

## Contributing

Fixes and additions are welcome. A new entry must meet this bar:

- **Maintained.** Updated within the last 18 months.
- **Primary source.** A working link to the project itself, not a mirror.
- **Accurate.** A factual description, no marketing copy.
- **Tagged.** A license badge (`FOSS` or `Proprietary`) and framework badges (`[M]` `[K]` `[A]` `[LSP]`).
- **Unique.** No duplicates.
- **Starred sparingly.** `⭐` is reserved for widely trusted resources.

Read the **[Contributing Guide ↗](docs/contributing.md)** and the **[PR template ↗](.github/PULL_REQUEST_TEMPLATE.md)**, then open a pull request. For questions, use [Issues](https://github.com/awesome-android-root/awesome-android-root/issues) or [Discussions](https://github.com/awesome-android-root/awesome-android-root/discussions).

## Community

| Platform | Purpose | Link |
| :--- | :--- | :--- |
| **Website** | Browse apps, modules, and guides | [awesome-android-root.xyz](https://awesome-android-root.xyz) |
| **GitHub** | Source and discussions | [GitHub Repo](https://github.com/awesome-android-root/awesome-android-root) |
| **Codeberg** | Mirror | [Codeberg Repo](https://codeberg.org/awesome-android-root/awesome-android-root/) |
| **Issues** | Bug reports and entry requests | [GitHub Issues](https://github.com/awesome-android-root/awesome-android-root/issues) |
| **X / Twitter** | Updates and news | [@awsm_and_root](https://x.com/awsm_and_root) |

## License and Disclaimer

- Licensed under [MIT](LICENSE).
- Read the full [Legal Disclaimer](docs/legal-disclaimer.md).

> [!WARNING]
> **Educational reference only. Proceed at your own risk.**
> Rooting can void your warranty, break device security (Knox, Play Integrity), and lock you out of banking and DRM apps. Do not root a mission-critical device, and never start without a verified backup.

> [!NOTE]
> This project is maintained by humans. AI is used for coding, formatting, and proofreading, never for content creation or curation.

---

<div align="center">

[![Views](https://img.shields.io/endpoint?style=for-the-badge&url=https://gist.githubusercontent.com/fynks/83a908bf10243ac78d86addf810cac71/raw/views.json)](https://github.com/awesome-android-root/awesome-android-root/graphs/traffic)

**Built by [Awesome Android Root](https://github.com/awesome-android-root/awesome-android-root)**

</div>