#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
NC='\033[0m' # No Color
RED='\033[0;31m'
BLUE='\033[0;34m'

# Error handling function
handle_error() {
    echo -e "${RED}Error: $1${NC}"
    exit 1
}

echo -e "${GREEN}Starting build-docs process...${NC}"

# 1. Check required files and directories
[ ! -d "docs" ] && handle_error "'docs' directory not found."
[ ! -f "README.md" ] && handle_error "'README.md' not found."

# 2. Copy README.md to docs/apps.md
cp README.md docs/apps.md || handle_error "Failed copying README.md to docs/apps.md"
echo -e "${GREEN}Copied README.md to docs/apps.md${NC}"

# 3. Add frontmatter
META_DESC="Ultimate collection of best Android root apps, Magisk & LSPosed modules containing 130+ apps and modules arranged in various categories."
tmp_file=$(mktemp)
{
    echo "---"
    echo "title: Root Apps"
    echo "description: \"$META_DESC\""
    echo "---"
    cat docs/apps.md
} > "$tmp_file" && mv "$tmp_file" docs/apps.md || handle_error "Failed adding meta description"
echo -e "${GREEN}Added meta description to docs/apps.md${NC}"

# 4. Adjust links
sed -i '/http[s]*:\/\/\//! s|./docs/|./|g' docs/apps.md && \
sed -i 's|\([^:]\)//|\1/|g' docs/apps.md || handle_error "Failed adjusting links"
echo -e "${GREEN}Links adjusted in docs/apps.md${NC}"

echo -e "${GREEN}Documentation build process completed successfully.${NC}"
