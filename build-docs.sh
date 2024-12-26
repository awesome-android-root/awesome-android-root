#!/bin/bash

# Colors for messages
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting build-docs process...${NC}"

# Make sure docs directory exists
if [ ! -d "docs" ]; then
  echo -e "${RED}Error: docs directory not found.${NC}"
  exit 1
fi

# Copy README.md to docs/apps.md
if [ ! -f "README.md" ]; then
  echo -e "${RED}Error: README.md not found.${NC}"
  exit 1
fi

cp README.md docs/apps.md
echo -e "${GREEN}Copied README.md to docs/apps.md.${NC}"

# Adjust links for VitePress, only replacing local links
sed -i '/http[s]*:\/\/\//! s|./docs/|./|g' docs/apps.md
echo -e "${GREEN}Adjusted local links in docs/apps.md.${NC}"

# Remove any duplicate slashes in links, excluding http(s) links
sed -i 's|\([^:]\)//|\1/|g' docs/apps.md
echo -e "${GREEN}Removed duplicate slashes in docs/apps.md.${NC}"

# Define meta description
META_DESC="A curated list of best Android root applications and best magisk modules. Features over 120 apps across categories like system mods, privacy, customization, and development tools."

# Check if docs/apps.md exists (should exist after copy step)
if [ ! -f "docs/apps.md" ]; then
  echo -e "${RED}Error: docs/apps.md not found after copy operation.${NC}"
  exit 1
fi

# Create temporary file with new frontmatter
cat > temp.md << EOF
---
title: Root Apps
description: "${META_DESC}"
---
EOF

# Append existing content
cat docs/apps.md >> temp.md

# Replace original file
mv temp.md docs/apps.md

echo -e "${GREEN}Updated meta description in docs/apps.md.${NC}"
echo -e "${GREEN}build-docs process completed successfully.${NC}"