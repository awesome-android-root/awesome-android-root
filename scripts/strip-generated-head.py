#!/usr/bin/env python3
"""One-off helper: strip frontmatter head tags that config.mjs now generates.

Only removes a tag when its value is exactly the value transformHead would
generate for that page. Anything that differs (per-page og:image, custom
og:title, ...) is left in place.

Usage: python3 scripts/strip-generated-head.py
"""
import glob
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, 'docs')

SITE = 'https://awesome-android-root.xyz'
SITE_NAME = 'Awesome Android Root'
OG_IMAGE = SITE + '/images/og.png'


def route_for(rel):
    if rel == 'index.md':
        return '/'
    rel = re.sub(r'(^|/)index\.md$', r'\1', rel)
    if rel.endswith('.md'):
        rel = rel[:-3]
    return '/' + rel


def social_title(title):
    return title if SITE_NAME in title else f'{title} | {SITE_NAME}'


def fm_scalar(raw):
    raw = raw.strip()
    if len(raw) >= 2 and raw[0] == raw[-1] and raw[0] in '"\'':
        return raw[1:-1]
    return raw


def scan_frontmatter(text):
    if not text.startswith('---\n'):
        return None, None
    end = text.index('\n---', 3)
    return text[4:end + 1], text[end + 1:]


def parse_head_blocks(fm):
    """Return list of (start, end, kind, attrs) for each head list item."""
    lines = fm.split('\n')
    blocks = []
    i = 0
    while i < len(lines):
        m = re.match(r'^  - - (meta|link|script)\s*$', lines[i])
        if not m:
            i += 1
            continue
        start = i
        i += 1
        while i < len(lines) and not re.match(r'^  - - (meta|link|script)\s*$', lines[i]) \
                and not re.match(r'^\S', lines[i]):
            i += 1
        body = lines[start + 1:i]
        attrs = {}
        for line in body:
            am = re.match(r'^    -?\s*([a-zA-Z_:]+):[ \t]*(.*)$', line)
            if am:
                attrs[am.group(1)] = fm_scalar(am.group(2))
        blocks.append((start, i, m.group(1), attrs))
    return blocks


def generated_for(rel, fm):
    """Tag key -> generated value, matching transformHead."""
    t = re.search(r'^title:[ \t]*(.+)$', fm, re.M)
    title = fm_scalar(t.group(1)) if t else SITE_NAME
    d = re.search(r'^description:[ \t]*(.+)$', fm, re.M)
    description = fm_scalar(d.group(1)) if d else ''
    st = social_title(title)
    route = route_for(rel)
    return {
        'link:canonical': SITE + route,
        'og:type': 'website' if route == '/' else 'article',
        'og:site_name': SITE_NAME,
        'og:locale': 'en_US',
        'og:title': st,
        'og:description': description,
        'og:url': SITE + route,
        'og:image': OG_IMAGE,
        'og:image:alt': st,
        'twitter:card': 'summary_large_image',
        'twitter:title': st,
        'twitter:description': description,
        'twitter:image': OG_IMAGE,
        'twitter:site': '@awsm_and_root',
    }


def main():
    changed_files = 0
    removed_total = 0
    for path in sorted(glob.glob(os.path.join(DOCS, '**', '*.md'), recursive=True)):
        rel = os.path.relpath(path, DOCS).replace(os.sep, '/')
        text = open(path, encoding='utf-8').read()
        fm, rest = scan_frontmatter(text)
        if fm is None or '\nhead:' not in '\n' + fm:
            continue
        gen = generated_for(rel, fm)
        blocks = parse_head_blocks(fm)
        drop = set()
        for start, end, kind, attrs in blocks:
            if kind == 'link' and attrs.get('rel') == 'canonical':
                key, value = 'link:canonical', attrs.get('href')
            elif kind == 'meta' and 'property' in attrs:
                key, value = attrs['property'], attrs.get('content')
            elif kind == 'meta' and 'name' in attrs:
                key, value = attrs['name'], attrs.get('content')
            else:
                continue
            if key in gen and gen[key] == value:
                drop.update(range(start, end))
        if not drop:
            continue
        lines = fm.split('\n')
        kept = [l for i, l in enumerate(lines) if i not in drop]
        removed_total += len(drop)
        new_fm = '\n'.join(kept)
        new_fm = re.sub(r'\n{3,}', '\n\n', new_fm)
        if not new_fm.endswith('\n'):
            new_fm += '\n'
        open(path, 'w', encoding='utf-8').write('---\n' + new_fm + rest)
        changed_files += 1
    print(f'removed {removed_total} lines from {changed_files} files')


if __name__ == '__main__':
    main()