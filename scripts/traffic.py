#!/usr/bin/env python3
"""Fetch GitHub repo views, merge into a running history, and write to ./traffic/:
  data.json        full daily history + total
  views-badge.svg  flat badge, same look as shields.io

GitHub only keeps 14 days of traffic, so we merge by date and keep it forever.
Env: TRAFFIC_TOKEN (PAT with repo access), REPO (owner/name).
"""
import json
import os
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

OUT = Path("traffic")


def fetch(repo, token):
    req = urllib.request.Request(
        f"https://api.github.com/repos/{repo}/traffic/views",
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    )
    with urllib.request.urlopen(req) as r:
        return json.load(r)["views"]


def human(n):
    if n >= 1_000_000:
        return f"{n / 1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n / 1_000:.1f}k"
    return str(n)


EYE = (
    "M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798"
    "c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078"
    "C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022"
    "C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717"
    "C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 "
    "2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5"
    "c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999"
    "A2 2 0 0 1 8 10Z"
)


def badge(label, message, color="#0969da", icon=EYE):
    """Flat 20px badge with a left icon, same proportions as shields.io."""
    tl = round(len(label) * 6.4, 1)  # label text width
    tm = round(len(message) * 7.6, 1)  # message text width
    x0 = 25  # label text start (icon sits at 7..20)
    lw = round(x0 + tl + 8)
    mw = round(tm + 14)
    w = lw + mw
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="20" '
        f'role="img" aria-label="{label}: {message}"><title>{label}: {message}</title>'
        '<linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#fff" '
        'stop-opacity=".12"/><stop offset="1" stop-opacity=".12"/></linearGradient>'
        f'<clipPath id="r"><rect width="{w}" height="20" rx="4" fill="#fff"/></clipPath>'
        f'<g clip-path="url(#r)"><rect width="{lw}" height="20" fill="#2d333b"/>'
        f'<rect x="{lw}" width="{mw}" height="20" fill="{color}"/>'
        f'<rect width="{w}" height="20" fill="url(#s)"/></g>'
        f'<path d="{icon}" fill="#fff" transform="translate(7 3.5) scale(.8125)"/>'
        '<g fill="#fff" text-anchor="middle" '
        'font-family="Verdana,Geneva,DejaVu Sans,sans-serif" '
        'font-size="11">'
        f'<text x="{x0 + tl / 2}" y="14">{label}</text>'
        f'<text x="{lw + mw / 2}" y="14" font-weight="bold">{message}</text></g></svg>'
    )


def main():
    repo = os.environ["REPO"]
    token = os.environ["TRAFFIC_TOKEN"]
    OUT.mkdir(exist_ok=True)
    path = OUT / "data.json"
    data = json.loads(path.read_text()) if path.exists() else {}
    days = data.get("views", {}).get("days", {})
    for item in fetch(repo, token):
        days[item["timestamp"][:10]] = {
            "count": item["count"],
            "uniques": item["uniques"],
        }
    days = dict(sorted(days.items()))
    total = sum(v["count"] for v in days.values())
    data["views"] = {"total": total, "days": days}
    data["updated"] = datetime.now(timezone.utc).isoformat(timespec="seconds")
    path.write_text(json.dumps(data, indent=2))
    (OUT / "views-badge.svg").write_text(badge("views", human(total)))


if __name__ == "__main__":
    main()
