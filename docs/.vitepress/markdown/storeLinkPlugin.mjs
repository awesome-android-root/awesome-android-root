/**
 * Markdown-it plugin to transform F-Droid and Play Store badge links into custom Vue components
 * Only converts links with specific text patterns (🌱 F-Droid or ▶️ Play Store)
 * This provides a fast, efficient, and robust solution for rendering store links with icons
 */

export function storeLinkPlugin(md) {
  // Store the original link_open rule
  const defaultLinkOpenRender = md.renderer.rules.link_open || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  const defaultLinkCloseRender = md.renderer.rules.link_close || function(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

  const defaultTextRender = md.renderer.rules.text || function(tokens, idx, options, env, self) {
    return tokens[idx].content;
  };

  // Track if we're inside a store link
  let insideStoreLink = false;
  let currentStoreType = null;
  let currentHref = null;

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
        
        // Check if this is an F-Droid badge link
        if ((linkText.includes('🌱') && linkText.includes('F-Droid')) || linkText === '🌱 F-Droid') {
          if (href.includes('f-droid.org') || href.includes('fdroid') || href.includes('izzysoft.de')) {
            insideStoreLink = true;
            currentStoreType = 'fdroid';
            currentHref = href;
            return `<StoreLink store="fdroid" href="${href}">`;
          }
        }
        
        // Check if this is a Play Store badge link
        if ((linkText.includes('▶️') && linkText.includes('Play Store')) || linkText === '▶️ Play Store') {
          if (href.includes('play.google.com')) {
            insideStoreLink = true;
            currentStoreType = 'playstore';
            currentHref = href;
            return `<StoreLink store="playstore" href="${href}">`;
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
      currentStoreType = null;
      currentHref = null;
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
