#!/usr/bin/env python3
"""Fetch GitHub repo views, merge into a running history stored in a Gist,
and publish a shields.io endpoint JSON (views.json) for a dynamic badge.
Nothing is committed to the repo.

GitHub only keeps 14 days of traffic, so we merge by date and keep it forever.
Env: TRAFFIC_TOKEN (classic PAT: repo + gist), REPO (owner/name), GIST_ID.
"""
import json
import os
import urllib.request
from datetime import datetime, timezone

API = "https://api.github.com"
TOKEN = os.environ.get("TRAFFIC_TOKEN", "")

EYE_SVG = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="#fff" d="'
    "M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798"
    "c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078"
    "C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022"
    "C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717"
    "C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 "
    "2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5"
    "c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999"
    'A2 2 0 0 1 8 10Z"/></svg>'
)


def call(method, url, body=None):
    req = urllib.request.Request(
        url,
        method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={
            "Authorization": f"Bearer {TOKEN}",
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        },
    )
    with urllib.request.urlopen(req) as r:
        return json.load(r)


def human(n):
    if n >= 1_000_000:
        return f"{n / 1_000_000:.1f}M"
    if n >= 1_000:
        return f"{n / 1_000:.1f}k"
    return str(n)


def endpoint(total):
    """shields.io endpoint schema."""
    return {
        "schemaVersion": 1,
        "label": "views",
        "message": human(total),
        "color": "0969da",
        "labelColor": "2d333b",
        "logoSvg": EYE_SVG,
        "cacheSeconds": 3600,
    }


def merge(old, fresh):
    days = dict(old.get("views", {}).get("days", {}))
    for item in fresh:
        days[item["timestamp"][:10]] = {"count": item["count"], "uniques": item["uniques"]}
    days = dict(sorted(days.items()))
    return {
        "updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "views": {"total": sum(v["count"] for v in days.values()), "days": days},
    }


def main():
    repo, gist_id = os.environ["REPO"], os.environ["GIST_ID"]
    gist = call("GET", f"{API}/gists/{gist_id}")
    f = gist["files"].get("data.json")
    old = json.loads(f["content"]) if f and not f.get("truncated") else {}
    fresh = call("GET", f"{API}/repos/{repo}/traffic/views")["views"]
    data = merge(old, fresh)
    call(
        "PATCH",
        f"{API}/gists/{gist_id}",
        {
            "files": {
                "data.json": {"content": json.dumps(data, indent=2)},
                "views.json": {"content": json.dumps(endpoint(data["views"]["total"]))},
            }
        },
    )
    print("total views:", data["views"]["total"])


if __name__ == "__main__":
    main()