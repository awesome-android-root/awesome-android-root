#!/usr/bin/env python3
"""Enforce first-load JS/CSS budgets and same-origin asset requests."""

from __future__ import annotations

import gzip
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1] / "docs/.vitepress/dist"
SAMPLES = {
    "home": ("index.html", 90 * 1024),
    "category page": ("apps-and-modules/ad-blocking.html", 100 * 1024),
}
CSS_BUDGET = 25 * 1024
RESOURCE_RELATIONS = {"stylesheet", "modulepreload", "preload", "preconnect", "dns-prefetch"}


class AssetParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.javascript: set[str] = set()
        self.stylesheets: set[str] = set()
        self.resources: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        rel = set((attributes.get("rel") or "").lower().split())
        src = attributes.get("src") or ""
        href = attributes.get("href") or ""

        if tag == "script" and src:
            self.javascript.add(src)
            self.resources.add(src)
        elif tag in {"img", "iframe", "source", "video", "audio"} and src:
            self.resources.add(src)

        if tag == "link" and href:
            if "stylesheet" in rel or (attributes.get("as") == "style" and "preload" in rel):
                self.stylesheets.add(href)
                self.resources.add(href)
            if "modulepreload" in rel or (attributes.get("as") == "script" and "preload" in rel):
                self.javascript.add(href)
                self.resources.add(href)
            if rel & RESOURCE_RELATIONS:
                self.resources.add(href)


def local_file(url: str) -> Path | None:
    parsed = urlsplit(url)
    if parsed.scheme or parsed.netloc:
        return None
    path = (ROOT / unquote(parsed.path.lstrip("/"))).resolve()
    if ROOT not in path.parents and path != ROOT:
        return None
    return path if path.is_file() else None


def compressed_size(paths: set[str]) -> int:
    total = 0
    for url in paths:
        path = local_file(url)
        if path is None:
            raise ValueError(f"Build asset was not found: {url}")
        total += len(gzip.compress(path.read_bytes(), compresslevel=9))
    return total


def main() -> int:
    if not ROOT.is_dir():
        raise SystemExit("Build output is missing; run `bun run docs:build` first.")

    results: list[str] = []
    external_resources: list[str] = []
    for page in ROOT.rglob("*.html"):
        parser = AssetParser()
        parser.feed(page.read_text(encoding="utf-8", errors="replace"))
        for url in parser.resources:
            parsed = urlsplit(url)
            if parsed.scheme in {"http", "https"} or parsed.netloc:
                external_resources.append(f"{page.relative_to(ROOT).as_posix()}: {url}")
    if external_resources:
        raise ValueError("Third-party assets found in built pages:\\n" + "\\n".join(sorted(external_resources)))

    for label, (relative, budget) in SAMPLES.items():
        page = ROOT / relative
        parser = AssetParser()
        parser.feed(page.read_text(encoding="utf-8", errors="replace"))

        remote = sorted(
            url for url in parser.resources
            if urlsplit(url).scheme in {"http", "https"} or urlsplit(url).netloc
        )
        if remote:
            raise ValueError(f"{label} requests external assets: {', '.join(remote)}")

        js_bytes = compressed_size(parser.javascript)
        if js_bytes > budget:
            raise ValueError(f"{label} first-load JavaScript is {js_bytes / 1024:.1f} KiB; budget is {budget / 1024:.0f} KiB")

        css_bytes = compressed_size(parser.stylesheets)
        if css_bytes > CSS_BUDGET:
            raise ValueError(f"{label} first-load CSS is {css_bytes / 1024:.1f} KiB; budget is {CSS_BUDGET / 1024:.0f} KiB")

        for css_url in parser.stylesheets:
            css_path = local_file(css_url)
            assert css_path is not None
            css = css_path.read_text(encoding="utf-8", errors="replace")
            external_css_assets = re.findall(r"url\(\s*['\"]?((?:https?:)?//[^)'\"]+)", css, flags=re.I)
            if external_css_assets:
                raise ValueError(f"{label} stylesheet requests external assets: {', '.join(sorted(set(external_css_assets)))}")

        results.append(f"{label}: JS {js_bytes / 1024:.1f}/{budget / 1024:.0f} KiB gzip; CSS {css_bytes / 1024:.1f}/{CSS_BUDGET / 1024:.0f} KiB gzip; no third-party assets")

    for result in results:
        print(result)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
