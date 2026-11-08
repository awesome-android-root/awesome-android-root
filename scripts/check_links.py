#!/usr/bin/env python3
"""Validate internal markdown links & anchors across docs/.

Uses VitePress' exact slugify algorithm (from vitepress dist) so heading
anchors are resolved the same way the site renders them.
"""
import glob
import os
import re
import sys
import unicodedata

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
    """Map VitePress heading IDs, including explicit {#id} attributes."""
    ids = {}
    used_slugs = set()
    for m in re.finditer(r'^(#{1,6})\s+(.+?)\s*$', text, re.M):
        level = len(m.group(1))
        raw = m.group(2).strip()
        cm = re.match(r'^(.*?)\s*\{#([\w\-]+)\}\s*$', raw)
        # The attrs plugin also accepts explicit IDs on h1, h5 and h6, but
        # config.mjs only generates and deduplicates anchors for h2 through h4.
        if level not in (2, 3, 4):
            if cm:
                ids[cm.group(2)] = True
            continue
        if cm:
            # VitePress rejects duplicate explicit IDs rather than suffixing them.
            slug = cm.group(2)
        else:
            base = vp_slugify(raw)
            slug = base
            suffix = 1
            while slug in used_slugs:
                slug = f'{base}-{suffix}'
                suffix += 1
        used_slugs.add(slug)
        ids[slug] = True
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


def main():
    files = sorted(glob.glob(os.path.join(DOCS, '**', '*.md'), recursive=True))
    errors = []
    checked = 0
    for f in files:
        rel = os.path.relpath(f, DOCS).replace(os.sep, '/')
        with open(f, encoding='utf-8') as source:
            text = source.read()
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
                with open(target, encoding='utf-8') as source:
                    tids = heading_ids(source.read())
                if anchor not in tids:
                    errors.append(f'{rel}: missing anchor #{anchor} on {os.path.relpath(target, DOCS)} ({label})')
    print(f'checked {checked} markdown links')
    if errors:
        print(f'{len(errors)} PROBLEMS:')
        for e in errors:
            print(' -', e)
        sys.exit(1)
    print('all internal links OK')


if __name__ == '__main__':
    main()
