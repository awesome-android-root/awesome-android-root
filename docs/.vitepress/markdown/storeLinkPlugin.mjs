/**
 * Markdown-it plugin to transform F-Droid and Play Store badge links into custom Vue components
 * Only converts links with specific text patterns (🌱 or ▶️)
 * This provides a fast, efficient, and robust solution for rendering store links with icons
 */

export function storeLinkPlugin(md) {
  // Store the original render rules
  const defaultLinkOpenRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  const defaultLinkCloseRender = md.renderer.rules.link_close || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  const defaultTextRender = md.renderer.rules.text || function(tokens, idx, options, env, self) {
    return tokens[idx].content;
  };

  // Minimal HTML attribute escape — only double-quotes matter here since
  // the href is placed inside a double-quoted HTML attribute.
  const escapeAttr = (s) => s.replace(/"/g, '&quot;');

  // Track whether the current token is inside a store badge link.
  // Module-scoped state is safe here because VitePress runs markdown-it
  // synchronously in a single pass per page.
  let insideStoreLink = false;

  // Override link_open rule
  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex('href');
    
    if (hrefIndex >= 0) {
      const href = token.attrs[hrefIndex][1];
      
      // Look ahead to check if the link text matches our badge patterns
      const nextToken = tokens[idx + 1];
      if (nextToken && nextToken.type === 'text') {
        const linkText = nextToken.content;
        
        // F-Droid badge: text is 🌱 or 🌱 F-Droid, href points to F-Droid/IzzySoft
        if (linkText === '🌱' || linkText === '🌱 F-Droid') {
          if (/f-droid\.org|apt\.izzysoft\.de/.test(href)) {
            insideStoreLink = true;
            return `<StoreLink store="fdroid" href="${escapeAttr(href)}">`;
          }
        }
        
        // Play Store badge: text is ▶️ or ▶️ Play Store
        if (linkText === '▶️' || linkText === '▶️ Play Store') {
          if (href.includes('play.google.com')) {
            insideStoreLink = true;
            return `<StoreLink store="playstore" href="${escapeAttr(href)}">`;
          }
        }
      }
    }
    
    // Default rendering for other links
    return defaultLinkOpenRender(tokens, idx, options, env, self);
  };

  // Override link_close rule
  md.renderer.rules.link_close = function(tokens, idx, options, env, self) {
    if (insideStoreLink) {
      insideStoreLink = false;
      return '</StoreLink>';
    }
    
    return defaultLinkCloseRender(tokens, idx, options, env, self);
  };

  // Override text rule to suppress original link text when inside store link
  // and wrap pipe separators with span for styling
  md.renderer.rules.text = function(tokens, idx, options, env, self) {
    if (insideStoreLink) {
      // Return empty string - the StoreLink component will handle the icon
      return '';
    }
    
    // Wrap pipe characters near store links with a styled span
    const content = tokens[idx].content;
    if (content.trim() === '|') {
      return '<span class="store-separator">|</span>';
    }
    
    return defaultTextRender(tokens, idx, options, env, self);
  };
}
