#!/usr/bin/env python3
"""Validate markdown links & anchors across docs/.

By default only internal links and anchors are checked, using VitePress' exact
slugify algorithm (from vitepress dist) so heading anchors are resolved the same
way the site renders them.

With --external every external http(s) URL in the docs is also requested. The
exit code is 1 when any problem was found, so the weekly workflow can turn the
output into an issue instead of failing a pull request.
"""
import argparse
import glob
import os
import re
import sys
import unicodedata
from concurrent.futures import ThreadPoolExecutor
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, 'docs')

R_COMBINING = re.compile(r'[\u0300-\u036F]')
R_CONTROL = re.compile(r'[\u0000-\u001f]')
R_SPECIAL = re.compile(r'[\s~`!@#$%^&*()\-_+=\[\]{}|\\;:"\'\u201c\u201d\u2018\u2019<>,.?/]+')
R_MULTI = re.compile(r'-{2,}')
R_LEAD = re.compile(r'^-+|-+$')
R_DIGIT = re.compile(r'^(\d)')


def vp_slugify(text):
    s = unicodedata.normalize('NFKD', text)
    s = R_COMBINING.sub('', s)
    s = R_CONTROL.sub('', s)
    s = R_SPECIAL.sub('-', s)
    s = R_MULTI.sub('-', s)
    s = R_LEAD.sub('', s)
    s = R_DIGIT.sub(r'_\1', s)
    return s.lower()


def heading_ids(text):
    """Map anchor id -> True for every heading (incl. custom {#id} ids)."""
    ids = {}
    counts = {}
    for m in re.finditer(r'^(#{1,6})\s+(.+?)\s*$', text, re.M):
        raw = m.group(2).strip()
        cm = re.match(r'^(.*?)\s*\{#([\w\-]+)\}\s*$', raw)
        if cm:
            base = cm.group(2)
        else:
            base = vp_slugify(raw)
        counts[base] = counts.get(base, 0) + 1
        ids[base if counts[base] == 1 else f'{base}-{counts[base]}'] = True
    return ids


def strip_code(text):
    """Blank out fenced code blocks & inline code so links there are skipped."""
    text = re.sub(r'```.*?```', ' ' * 100000, text, flags=re.S)
    text = re.sub(r'`[^`]*`', ' ', text)
    return text


def find_target(path, dirn):
    """Resolve an in-doc link target to a file path."""
    if path.startswith('/'):
        if path.endswith('/'):
            return os.path.join(DOCS, path.lstrip('/'), 'index.md')
        p = path.lstrip('/')
        cand = os.path.join(DOCS, p)
        if os.path.isfile(cand):
            return cand
        for ext in ('', '.md', '/index.md'):
            c = cand + ext
            if os.path.isfile(c):
                return c
        return None
    base = os.path.normpath(os.path.join(dirn, path))
    if os.path.isfile(base):
        return base
    for ext in ('', '.md', '/index.md', '/index.html'):
        c = base + ext
        if os.path.isfile(c):
            return c
    return None


def collect_external_urls():
    """Map each external http(s) URL to the places it is referenced from."""
    urls = {}
    for f in sorted(glob.glob(os.path.join(DOCS, '**', '*.md'), recursive=True)):
        rel = os.path.relpath(f, DOCS).replace(os.sep, '/')
        text = strip_code(open(f, encoding='utf-8').read())
        for m in re.finditer(r'https?://[^\s<>()\[\]"\'`]+', text):
            url = m.group(0).rstrip('.,;:')
            urls.setdefault(url, set()).add(rel)
    return urls


def check_external(url, timeout=20):
    """Return None when reachable, else a short reason."""
    req = Request(url, method='HEAD', headers={
        'User-Agent': 'awesome-android-root-link-check (link checker)',
        'Accept': '*/*',
    })
    try:
        with urlopen(req, timeout=timeout) as response:
            if response.status >= 400:
                return f'HTTP {response.status}'
    except HTTPError as e:
        # Many sites reject HEAD but serve GET fine, so retry before failing.
        if e.code in (403, 405, 501):
            try:
                with urlopen(Request(url, headers={'User-Agent': req.headers['User-Agent']}), timeout=timeout):
                    return None
            except HTTPError as e2:
                return f'HTTP {e2.code}'
            except URLError as e2:
                return f'{e2.reason}'
        return f'HTTP {e.code}'
    except URLError as e:
        return f'{e.reason}'
    except Exception as e:  # noqa: BLE001 - report anything unexpected as a failure
        return f'{type(e).__name__}: {e}'
    return None


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--external', action='store_true',
                        help='also request every external http(s) link')
    args = parser.parse_args()

    files = sorted(glob.glob(os.path.join(DOCS, '**', '*.md'), recursive=True))
    errors = []
    checked = 0
    for f in files:
        rel = os.path.relpath(f, DOCS).replace(os.sep, '/')
        text = open(f, encoding='utf-8').read()
        ids = heading_ids(text)
        dirn = os.path.dirname(f)
        for m in re.finditer(r'(?<!!)\[([^\]]*)\]\(([^)\s]+?)(?:\s+["\'][^)]*?["\'])?\)', strip_code(text)):
            dest = m.group(2)
            label = m.group(1)
            checked += 1
            if dest.startswith(('http://', 'https://', 'mailto:', 'tel:', '//', 'data:')):
                continue
            if dest.startswith('#'):
                anchor = dest[1:]
                if anchor and anchor not in ids:
                    errors.append(f'{rel}: missing local anchor #{anchor} ({label})')
                continue
            path, _, anchor = dest.partition('#')
            target = find_target(path, dirn)
            if not target:
                # allow public assets referenced through /images or plain paths,
                # plus build-generated files such as the VitePress sitemap
                pub = os.path.join(DOCS, 'public', path.lstrip('/'))
                if os.path.isfile(pub) or path.startswith('/images/') or path == '/sitemap.xml':
                    continue
                errors.append(f'{rel}: broken link "{dest}" ({label})')
                continue
            if anchor:
                tids = heading_ids(open(target, encoding='utf-8').read())
                if anchor not in tids:
                    errors.append(f'{rel}: missing anchor #{anchor} on {os.path.relpath(target, DOCS)} ({label})')
    print(f'checked {checked} markdown links')
    if errors:
        print(f'{len(errors)} PROBLEMS:')
        for e in errors:
            print(' -', e)
        sys.exit(1)
    print('all internal links OK')

    if not args.external:
        return

    urls = collect_external_urls()
    print(f'checking {len(urls)} external URLs')
    with ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(check_external, urls))
    broken = [(url, reason, sorted(urls[url])) for url, reason in zip(urls, results) if reason]
    print(f'{len(broken)} external URL(s) unreachable')
    for url, reason, where in broken:
        print(f' - {reason} {url} (referenced in {", ".join(where[:3])})')
    sys.exit(1 if broken else 0)


if __name__ == '__main__':
    main()
