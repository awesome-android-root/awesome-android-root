# Accessibility

This statement covers the Awesome Android Root website ([awesome-android-root.xyz](https://awesome-android-root.xyz)) and the Markdown documentation in this repository. It does not cover third-party Android apps, modules, ROMs, or tools listed in the directory.

## What the site provides

The site is built with VitePress and includes:

- Keyboard navigation, a skip-to-content link (`#VPContent`), and `:focus-visible` outlines on interactive controls.
- Light and dark color themes via the header appearance switch, along with `prefers-reduced-motion: reduce` and `prefers-contrast: high` styles.
- Accessible labels on custom controls, including store links, the back-to-top button, local browser search, and polite live-region updates when offline.
- Plain-text alternatives: documentation pages offer copy and download Markdown actions, and all source files can be read directly under [`docs/`](docs/) on GitHub.

## Testing and limitations

We use [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/) as a target when working on the site, not as a conformance claim. The project has not completed a formal accessibility audit or systematic screen-reader testing, and CI validates links and site builds rather than automated accessibility checks.

Current limitations:

- App and module lists pack framework tags (`[M]`, `[K]`, `[A]`, `[LSP]`), license badges, and store links into single list items. On the website, store links render with text labels (`F-Droid`, `IzzyOnDroid`, `Google Play`); in raw Markdown on GitHub, they appear as `🌱` and `▶️` emoji links defined in [`docs/contributing.md`](docs/contributing.md#badges).
- Documentation pages render inside a `<main>` landmark, while the home page (`/`) uses VitePress's default `<div>` wrapper.
- Documentation is available in English (`en-US`) only.

## Reporting a barrier

If part of the website or repository is difficult or impossible to use, [open a GitHub issue](https://github.com/awesome-android-root/awesome-android-root/issues/new?template=bug-report.md) with:

- The page URL or repository file path.
- What you were trying to do and what happened instead.
- Your browser, operating system, and assistive technology, if relevant.

Screenshots and recordings are optional, and you do not need to disclose a disability or share personal information. Report accessibility issues in listed Android apps or modules to their respective maintainers.

This is a volunteer-maintained project without guaranteed response times. Maintainers review reports in the public issue tracker, post workarounds such as direct Markdown paths when available, and link pull requests to the issue so you can check fixes.

## Contributing

Changes to documentation or theme code should keep existing accessibility behavior intact:

- Keep Markdown headings in order without skipping levels, write descriptive link text (outside the build-converted `🌱` and `▶️` store links), add `alt` text to meaningful images, and avoid conveying meaning through color alone.
- Keep UI controls keyboard-operable with visible focus styles, programmatic names and states, readable contrast in light and dark themes, and `prefers-reduced-motion` support.
- Run `bun run check:links` and `bun run docs:build` before opening a pull request. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for general contribution guidelines.

Maintainers review and update this file as the site changes. Suggestions are welcome via [issues](https://github.com/awesome-android-root/awesome-android-root/issues) or [pull requests](https://github.com/awesome-android-root/awesome-android-root/pulls).
