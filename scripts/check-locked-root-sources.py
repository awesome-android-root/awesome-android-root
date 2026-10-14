#!/usr/bin/env python3
"""Verify pinned GitHub documentation through the authenticated gh CLI.

Run manually when updating locked-root-tools.json. Non-GitHub author references
must be checked separately; a successful HTTP request does not verify a claim.
Keep source revision/date, per-build evidence and maintenance status separate.
Never derive Android OS versions from KMI labels or treat profiles as root tests.
"""
import concurrent.futures
import json
from pathlib import Path
import subprocess
import sys
from urllib.parse import urlparse

DATA = Path(__file__).resolve().parents[1] / 'docs/rooting-guides/data/locked-root-tools.json'


def check(tool):
    if not tool['revision']:
        return None, f"MANUAL: {tool['name']}: {tool['documentation']}"
    parsed = urlparse(tool['documentation'])
    parts = parsed.path.strip('/').split('/')
    if parsed.netloc != 'github.com' or len(parts) < 5 or parts[2] != 'blob':
        return False, f"FAIL: {tool['name']}: expected a pinned GitHub document"
    owner, repo, _, revision, *path = parts
    result = subprocess.run(
        ['gh', 'api', f"repos/{owner}/{repo}/contents/{'/'.join(path)}?ref={revision}", '--jq', '.type'],
        capture_output=True, text=True, check=False,
    )
    valid = result.returncode == 0 and result.stdout.strip() == 'file'
    return valid, f"{'OK' if valid else 'FAIL'}: {tool['name']}" + (f": {result.stderr.strip()}" if not valid else '')


if __name__ == '__main__':
    tools = json.loads(DATA.read_text())
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as executor:
        results = list(executor.map(check, tools))
    for _, message in results:
        print(message)
    print(f"{sum(ok is True for ok, _ in results)} pinned documents verified; "
          f"{sum(ok is None for ok, _ in results)} author references require manual review.")
    sys.exit(1 if any(ok is False for ok, _ in results) else 0)
