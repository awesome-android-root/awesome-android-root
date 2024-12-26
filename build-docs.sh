#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting build-docs process...${NC}"

# 1. Ensure docs directory exists
if [ ! -d "docs" ]; then
  echo -e "${RED}Error: docs directory not found.${NC}"
  exit 1
fi

# 2. Ensure README.md exists
if [ ! -f "README.md" ]; then
  echo -e "${RED}Error: README.md not found.${NC}"
  exit 1
fi

# 3. Copy README.md to docs/apps.md
cp README.md docs/apps.md
echo -e "${GREEN}Copied README.md to docs/apps.md.${NC}"

# 4. Adjust links in docs/apps.md
sed -i '/http[s]*:\/\/\//! s|./docs/|./|g' docs/apps.md
sed -i 's|\([^:]\)//|\1/|g' docs/apps.md
echo -e "${GREEN}Links adjusted in docs/apps.md.${NC}"

# 5. Add frontmatter to docs/apps.md
META_DESC="A curated list of best Android root applications and best magisk modules. Features over 120 apps across categories like system mods, privacy, customization, and development tools."

cat > temp.md << EOF
---
title: Root Apps
description: "${META_DESC}"
---
EOF
cat docs/apps.md >> temp.md
mv temp.md docs/apps.md
echo -e "${GREEN}Added meta description to docs/apps.md.${NC}"

echo -e "${GREEN}Documentation build complete.${NC}"

# 6. Count apps in README.md and update Stats section
if [ ! -f "README.md" ]; then
  echo -e "${RED}Error: README.md not found for stats update.${NC}"
  exit 1
fi

count=$(grep -E '^\s*-\s+\*\*\[.*\]\(.*\)\*\*' README.md | wc -l)
echo -e "${GREEN}Total apps found:${NC} ${count}"

sed -i "s/^\(#### Number of Apps: \`\)[0-9]\+\(\`\)$/\1${count}\2/" README.md
echo -e "${GREEN}README.md stats updated to:${NC} ${count}"#!/bin/bash