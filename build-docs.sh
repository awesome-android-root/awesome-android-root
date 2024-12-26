#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting build-docs process...${NC}"

# 1. Ensure the `docs` directory exists
if [ ! -d "docs" ]; then
  echo -e "${RED}Error: 'docs' directory not found.${NC}"
  exit 1
fi

# 2. Ensure `README.md` exists
if [ ! -f "README.md" ]; then
  echo -e "${RED}Error: 'README.md' not found.${NC}"
  exit 1
fi

# 3. Count apps in `README.md` and update stats section
APP_COUNT=$(grep -E '^\s*-\s+\*\*\[.*\]\(.*\)\*\*' README.md | wc -l)
if [ $? -ne 0 ]; then
  echo -e "${RED}Error counting apps in README.md.${NC}"
  exit 1
fi
echo -e "${GREEN}Total apps found:${NC} ${APP_COUNT}"

sed -i "s/^\(#### Number of Apps: \`\)[0-9]\+\(\`\)$/\1${APP_COUNT}\2/" README.md
if [ $? -ne 0 ]; then
  echo -e "${RED}Error updating app count in README.md.${NC}"
  exit 1
fi
echo -e "${GREEN}README.md stats updated to:${NC} ${APP_COUNT}"

# 4. Copy `README.md` to `docs/apps.md`
cp README.md docs/apps.md
if [ $? -ne 0 ]; then
  echo -e "${RED}Error copying README.md to docs/apps.md.${NC}"
  exit 1
fi
echo -e "${GREEN}Copied README.md to docs/apps.md.${NC}"

# 5. Add frontmatter to `docs/apps.md`
META_DESC="A curated list of best Android root applications and best magisk modules. Features over 120 apps across categories like system mods, privacy, customization, and development tools."

{
  echo "---"
  echo "title: Root Apps"
  echo "description: \"$META_DESC\""
  echo "---"
  cat docs/apps.md
} > temp.md && mv temp.md docs/apps.md
if [ $? -ne 0 ]; then
  echo -e "${RED}Error adding meta description to docs/apps.md.${NC}"
  exit 1
fi
echo -e "${GREEN}Added meta description to docs/apps.md.${NC}"

# 6. Adjust links in `docs/apps.md`
sed -i '/http[s]*:\/\/\//! s|./docs/|./|g' docs/apps.md && \
sed -i 's|\([^:]\)//|\1/|g' docs/apps.md
if [ $? -ne 0 ]; then
  echo -e "${RED}Error adjusting links in docs/apps.md.${NC}"
  exit 1
fi
echo -e "${GREEN}Links adjusted in docs/apps.md.${NC}"

echo -e "${GREEN}Documentation build process completed successfully.${NC}"
