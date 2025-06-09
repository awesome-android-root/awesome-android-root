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

# 2. Copy README.md to docs/index.md
cp README.md docs/index.md || handle_error "Failed copying README.md to docs/index.md"
echo -e "${GREEN}Copied README.md to docs/index.md${NC}"


# 3. Add frontmatter
[ ! -f "docs/index-frontmatter.txt" ] && handle_error "'frontmatter.txt' not found."
tmp_file=$(mktemp)
{
    cat docs/index-frontmatter.txt
    cat docs/index.md
} > "$tmp_file" && mv "$tmp_file" docs/index.md || handle_error "Failed adding frontmatter"
echo -e "${GREEN}Added frontmatter to docs/index.md${NC}"


# 4. Adjust links
sed -i '/http[s]*:\/\/\//! s|./docs/|./|g' docs/index.md && \
sed -i 's|\([^:]\)//|\1/|g' docs/index.md || handle_error "Failed adjusting links"
echo -e "${GREEN}Links adjusted in docs/index.md${NC}"

echo -e "${GREEN}Documentation build process completed successfully.${NC}"
