# Contributing to Awesome Android Root

The complete contribution guide lives at [`docs/contributing.md`](docs/contributing.md).

It covers the entry format, badges, category placement, quality requirements and examples, and it is
the single source of truth so this file and the site cannot drift apart.

## Quick start

1. Fork the repository.
2. Edit the relevant page under [`docs/apps-and-modules/`](docs/apps-and-modules/).
3. Add or update the entry in alphabetical order.
4. Open a pull request.

## Before opening a PR

Read [`docs/contributing.md`](docs/contributing.md) first. It lists the entry format, the allowed
tags, the quality requirements and the pull request template.

For theme, TypeScript and search changes, see the [development and validation
commands](scripts/README.md#typescript-and-validation).

## Need help?

- [Full contribution guide](docs/contributing.md)
- [Issue templates](.github/ISSUE_TEMPLATE/)
- [Pull request template](.github/PULL_REQUEST_TEMPLATE.md)

Contributions are licensed under the [MIT License](LICENSE).
### Local validation

Use the repository's pinned Bun version and Node 26, then `bun install`. Run
`bun run lint` for internal Markdown links/assets/anchors and entry validation;
Python is not needed. Links use the site's actual VitePress Markdown pipeline.
Run `bun run check` for strict typechecks, focused unit tests, lint, a production
build and Chromium search tests (`bunx playwright install chromium` once).
See [scripts/README.md](scripts/README.md) for individual commands, subpath
deployments and the retained search regression tests.
