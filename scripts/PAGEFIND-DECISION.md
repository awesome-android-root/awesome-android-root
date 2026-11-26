# Pagefind integration decision

Reviewed on 2026-11-26 against the published
[`vitepress-plugin-pagefind@0.4.27`](https://registry.npmjs.org/vitepress-plugin-pagefind/0.4.27)
package, specifically `dist/index.mjs`, `dist/node.mjs`, `dist/Search.vue` and
`dist/type.d.ts`. Source project:
[ATQQ/sugar-blog/packages/vitepress-plugin-pagefind](https://github.com/ATQQ/sugar-blog/tree/main/packages/vitepress-plugin-pagefind).
These observations concern that version, not hypothetical future releases.

## Correction

The plugin declares `vitepress: ^1.0.0-0 || ^2.0.0-0`; it is **not incompatible
with VitePress 2 alpha by declaration**. Its source project has recent maintenance
(e.g. [November 10 keyboard/scroll fix](https://github.com/ATQQ/sugar-blog/commit/33b1c6ea049163978ea1f80033e8cb4ecb90f19d)).
Using VitePress alpha is not, by itself, a reason to reject this plugin.

## Actual tradeoffs

| Area | Plugin 0.4.27 | Current direct Pagefind integration |
| --- | --- | --- |
| Ownership | Ready-made Vue search UI, locales, keyboard support and configuration: less application code to own | We own the modal, accessibility behavior, ranking wrapper, indexing and tests |
| General documentation | Standard page indexing; hooks, sorting/filtering, Chinese segmentation, dynamic-route support and manual/CLI indexing options | Purpose-built for this directory; fewer general-purpose features |
| Coupling | Aliases `./VPNavBarSearch.vue`; string-replaces compiled Vue render output to inject body attributes; wraps VitePress buildEnd | Uses public Pagefind indexing/browser APIs and a VitePress Markdown plugin/buildEnd hook; still needs compatibility testing as VitePress changes |
| Loading | Default head transform imports Pagefind and calls `init()` during idle, on every page | No Pagefind network requests before search/MCP is used |
| Result data | `Promise.all(results.map(v => v.data()))` retrieves all match fragments before formatting; `pageSize: 999` has a TODO to limit | Retrieves at most 12 candidates, then reranks exact/prefix titles; trades recall for bounded work |
| Index model | Standard HTML/page/sub-result indexing; no built-in representation of our app entries/aliases | Synthetic per-app records, stable anchors, title weights and project aliases, alongside documentation pages |
| Reuse | Ships its own UI/loader; adapting it to our existing dialog and MCP would still require integration code | Dialog and MCP share one lazy engine and result/session types |
| Build | Default path shells out to `npx pagefind --site ...`; supports custom indexing/manual mode | Uses the installed Pagefind Node API and checks entry collisions |
| Races | Query debounce is present; no equivalent explicit generation guard was found in the reviewed component | Generation/cancellation guards have focused regression tests |

**Decision:** keep direct integration here, not because the plugin is unsupported,
but because preserving the existing UI, entry search, strict lazy loading and MCP
would remove much of its drop-in advantage. A conventional docs site without those
requirements should seriously consider the plugin: owning less code is a real
benefit. Hooks/manual mode can mitigate some plugin defaults; this table does not
claim that customization is impossible. Switching now would need a prototype and
measurement, not an assumed performance or accessibility win for either side.
