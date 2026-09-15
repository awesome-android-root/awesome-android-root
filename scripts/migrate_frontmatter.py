#!/usr/bin/env python3
"""One-shot migration helper: VitePress frontmatter -> Starlight frontmatter.

- Drops VitePress-only keys (layout, titleTemplate).
- Converts VitePress `head:` arrays ([ [tag, attrs, content?], ... ]) into
  Starlight head entries ({tag, attrs, content}).
- Keeps title/description untouched.
- index.md gets the Starlight splash/hero treatment instead of VP hero+features.
Run once during the Astro+Starlight migration; NOT part of the build.
"""
import io, os, re, sys
import yaml

DOCS = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                    'src', 'content', 'docs')

def split_frontmatter(text):
    if not text.startswith('---'):
        return None, text
    end = text.find('\n---', 3)
    if end == -1:
        return None, text
    fm_raw = text[4:end]
    body = text[end + 4:]
    if body.startswith('\r\n'):
        body = body[2:]
    elif body.startswith('\n'):
        body = body[1:]
    return yaml.safe_load(fm_raw), body

def convert_head(vp_head):
    out = []
    if not vp_head:
        return out
    for entry in vp_head:
        if not isinstance(entry, list) or len(entry) < 2:
            continue
        tag = entry[0]
        attrs = entry[1] if isinstance(entry[1], dict) else {}
        content = entry[2] if len(entry) > 2 else None
        item = {'tag': tag}
        if attrs:
            item['attrs'] = {str(k): ('' if v is None else str(v)) for k, v in attrs.items()}
        if content is not None:
            item['content'] = content
        out.append(item)
    return out

def y(value):
    """Dump a single scalar without YAML document markers."""
    return yaml.dump(value, default_flow_style=True, allow_unicode=True,
                     width=100000).strip().removesuffix('\n...').removesuffix('...').strip()

def dump_head(head):
    # Compact but readable YAML for the head array
    lines = []
    for item in head:
        first = True
        for key in ('tag', 'attrs', 'content'):
            if key not in item:
                continue
            val = item[key]
            prefix = '  - ' if first else '    '
            first = False
            if key == 'content' and isinstance(val, str) and ('\n' in val or len(val) > 60):
                block = yaml.dump(val, default_flow_style=False, allow_unicode=True, width=100000)
                block = block.removesuffix('...\n').rstrip('\n')
                indented = '\n'.join('      ' + l for l in block.split('\n'))
                lines.append(f'{prefix}content: |-\n{indented}')
            else:
                lines.append(f'{prefix}{key}: {y(val)}')
    return 'head:\n' + '\n'.join(lines) + '\n'

def scalar(key, val):
    return f'{key}: {y(val)}\n'

HOME_HERO = {
    'template': 'splash',
    'hero': {
        'title': 'Master Android Rooting in 2026',
        'tagline': 'Explore 600+ root apps and modules, step-by-step rooting guides, and practical troubleshooting for Android power users.',
        'image': {'html': '<img src="/images/logo_dark.svg" alt="Awesome Android Root - Ultimate Rooting Hub Logo" width="160" height="160" loading="eager" />'},
        'actions': [
            {'text': '🚀 Browse Root Apps', 'link': '/apps-and-modules', 'variant': 'primary'},
            {'text': '📚 Complete Rooting Guides', 'link': '/rooting-guides', 'variant': 'secondary'},
            {'text': '🔧 Fix Issues Now', 'link': '/troubleshooting', 'variant': 'minimal'},
        ],
    },
}

def process(path):
    rel = os.path.relpath(path, DOCS)
    with open(path, encoding='utf-8') as f:
        text = f.read()
    fm, body = split_frontmatter(text)
    if fm is None:
        print(f'!! no frontmatter: {rel}')
        return
    out = io.StringIO()
    title = fm.get('title')
    desc = fm.get('description')
    if title is not None:
        out.write(scalar('title', title))
    if desc is not None:
        out.write(scalar('description', desc))

    if rel == 'index.md':
        hero_yaml = yaml.dump(HOME_HERO, sort_keys=False, allow_unicode=True, default_flow_style=False, width=100000)
        out.write(hero_yaml.removesuffix('...\n'))
    head = convert_head(fm.get('head'))
    if head:
        out.write(dump_head(head))

    new_text = '---\n' + out.getvalue() + '---\n\n' + body.lstrip('\n')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(new_text)
    print(f'converted {rel}')

for root, dirs, files in os.walk(DOCS):
    for fn in sorted(files):
        if fn.endswith('.md'):
            process(os.path.join(root, fn))
