#!/usr/bin/env python3
"""Check same-site links and fragment targets in the rendered VitePress site."""

from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1] / "docs/.vitepress/dist"
SITE = "https://awesome-android-root.xyz/"
SAME_SITE_HOSTS = {"awesome-android-root.xyz", "www.awesome-android-root.xyz"}


class LinkParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[str] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if "id" in attributes and attributes["id"] is not None:
            self.ids.add(attributes["id"] or "")
        if tag == "a" and attributes.get("href") is not None:
            self.links.append(attributes["href"] or "")


def public_url(path: Path) -> str:
    relative = path.relative_to(ROOT).as_posix()
    if relative == "index.html":
        return SITE
    if relative.endswith("/index.html"):
        return SITE + relative[: -len("index.html")]
    return SITE + relative


def resolve_target(url_path: str) -> Path | None:
    if not url_path or url_path == "/":
        candidate = ROOT / "index.html"
    else:
        candidate = (ROOT / unquote(url_path.lstrip("/"))).resolve()
        if candidate.is_dir():
            candidate /= "index.html"
        elif not candidate.exists() and not candidate.suffix:
            clean_url = candidate.with_suffix(".html")
            if clean_url.exists():
                candidate = clean_url
            elif (candidate / "index.html").exists():
                candidate = candidate / "index.html"
    return candidate if candidate.exists() else None


def main() -> int:
    if not ROOT.is_dir():
        raise SystemExit("Build output is missing; run `bun run docs:build` first.")

    pages = sorted(ROOT.rglob("*.html"))
    parsed: dict[Path, LinkParser] = {}
    errors: list[str] = []

    def get_parser(path: Path) -> LinkParser:
        if path not in parsed:
            parser = LinkParser()
            parser.feed(path.read_text(encoding="utf-8", errors="replace"))
            parsed[path] = parser
        return parsed[path]

    for source in pages:
        for href in get_parser(source).links:
            if href.startswith(("mailto:", "tel:", "javascript:", "data:")):
                continue
            url = urlsplit(urljoin(public_url(source), href))
            if url.scheme not in {"http", "https"} or url.netloc not in SAME_SITE_HOSTS:
                continue

            target = resolve_target(url.path)
            source_name = source.relative_to(ROOT).as_posix()
            if target is None:
                errors.append(f"{source_name}: missing target for {href}")
                continue

            if url.fragment and target.suffix == ".html":
                fragment = unquote(url.fragment)
                if fragment not in get_parser(target).ids:
                    errors.append(f"{source_name}: missing anchor for {href}")

    if errors:
        print("Broken same-site links found:")
        for error in errors:
            print(f"- {error}")
        print(f"\n{len(errors)} problem(s) across {len(pages)} built HTML pages.")
        return 1

    print(f"Verified same-site links and anchors across {len(pages)} built HTML pages.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
