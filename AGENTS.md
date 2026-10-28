# AGENTS.md

Guidance for agents working on the Awesome Android Root knowledge base and VitePress site.

## Repository and scope

- `docs/` contains the site; `docs/apps-and-modules/` is the source of truth for listings. The root `README.md` is an index, not a duplicate database.
- Site configuration and theme code live in `docs/.vitepress/`; validation tools live in `scripts/`. Follow `docs/contributing.md` and the relevant PR template.
- Read surrounding content and search for duplicates, references, and affected anchors before editing. Prefer small, focused changes; do not reformat, reorganize, upgrade dependencies, or rewrite unrelated content without a reason.
- Verify important claims against authoritative upstream sources. Never invent facts, links, compatibility, licenses, releases, CVEs, or project status. Generated text is not evidence; flag uncertainty rather than guessing.

## Apps and modules

- Use the best existing category. Check for duplicates and follow the established order: recommended entries first, then alphabetically. Do not change a recommendation star casually.
- Prefer the project's GitHub, then F-Droid, official site, or Google Play. Check that links and store badges identify the correct project.
- Include exactly one license badge (`FOSS` or `Proprietary`) and only verified framework tags: `[M]` Magisk, `[K]` KernelSU, `[A]` APatch, `[LSP]` LSPosed/Xposed. Use `FOSS` only when the source and license support it.
- Write short, factual, grammatically correct descriptions that lead with what the project does, for example, "Removes blur from HyperOS." Avoid filler, promotional claims, repeated project names, and introductions such as "An LSPosed module designed to...".
- Omit framework API names and versions such as "Uses libxposed API 102". Retain relevant root or framework requirements, device and app compatibility, and safety warnings where needed; badges may convey framework support.
- If the function is unclear, consult upstream. Do not invent details or pad descriptions to satisfy lint; add verified, useful detail instead.

Entry format:

```markdown
- **[Name](link)** - Short factual description. `FOSS` `[M]`
```

## Rooting and security

Rooting can cause data loss, bootloops, or device damage. Verify device model, Android version, bootloader state, partition layout, image and firmware requirements, commands, and recovery steps before changing instructions. Do not generalize device-specific guidance or weaken backup, data-loss, bricking, or security warnings.

Verify claims about root frameworks, OTA, encryption, attestation, root hiding, vulnerabilities, and security behavior. Do not promise bypasses or universal compatibility. Preserve least-privilege GitHub Actions permissions and never commit secrets.

## Markdown and site

- Treat headings and generated anchors as public interfaces; search for references before changing them. Keep navigation and sidebars in sync with page structure.
- Preserve frontmatter, SEO, JSON-LD, canonical URLs, social metadata, and custom Markdown behavior unless the task requires changes. Check references before deleting assets, scripts, or configuration; avoid shared mutable state in Markdown rendering.
- For titles, target 50-60 characters including the `| Awesome Android Root` suffix, maximum 70. For meta descriptions, target 110-155 characters, absolute range 70-160; use supported content rather than padding.
- VitePress appends the site name to titles: do not include it in frontmatter, except for `docs/index.md`, which uses its own `titleTemplate`. Quote YAML descriptions containing a colon and keep matching Open Graph and Twitter overrides synchronized.
- Write concise, natural prose. Do not add decorative formatting or use an em dash (`—`).

## Validation and generated files

Use the Bun version in `.bun-version` and Node.js 24 or later as specified in `package.json`. For documentation changes:

```bash
bun run check:links
bun run docs:build
```

For app or module entries, also run `bun run index:build`. It reports entry format, ordering, badge, and duplicate problems, but **does not fail on lint findings**; inspect its output and resolve findings. `docs:build` runs it too. CI blocks on the link check and build; the build needs full Git history for `lastUpdated`.

- The link checker validates internal Markdown links and anchors, not external links or technical claims. Verify external links and facts separately when relevant.
- `index:build` generates tracked `docs/public/app-index.json` and ignored `docs/count.md` and `docs/public/count.json`. Commit the index when its records change; avoid timestamp-only churn. Edit count metadata in `scripts/app-entries.mjs`, not generated files.
- For theme or configuration changes, inspect the affected behavior when practical. Report checks actually run and any failures or limitations; a successful build does not prove content accuracy.
- Cloudflare Pages uses `bun run docs:build` and `docs/.vitepress/dist`. See `scripts/README.md` for script behavior and asset optimization.

## Before finishing

Review the diff for unrelated changes and, for structural edits, check entry counts, links, badges, categories, and anchors. A PR should explain what changed, why, validation performed, and any uncertainty. Use a descriptive commit message and follow the project's contribution and PR guidance.
