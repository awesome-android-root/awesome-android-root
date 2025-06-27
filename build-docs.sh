#!/bin/bash

# Exit on any error and treat unset variables as errors
set -euo pipefail

# Colors for output
readonly GREEN='\033[0;32m'
readonly NC='\033[0m' # No Color
readonly RED='\033[0;31m'
readonly BLUE='\033[0;34m'
readonly YELLOW='\033[1;33m'

# Script info
readonly SCRIPT_NAME="$(basename "$0")"
readonly SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Error handling function with line number
handle_error() {
    local line_number="${2:-unknown}"
    echo -e "${RED}Error on line ${line_number}: $1${NC}" >&2
    exit 1
}

# Trap errors and show line number
trap 'handle_error "Script failed" ${LINENO}' ERR

# Logging functions
log_info() {
    echo -e "${GREEN}✓ $1${NC}"
}

log_warn() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

log_error() {
    echo -e "${RED}✗ $1${NC}" >&2
}

echo -e "${GREEN}Starting build-docs process...${NC}"

# 1. Check required files and directories
[ ! -d "docs" ] && handle_error "'docs' directory not found."
[ ! -f "README.md" ] && handle_error "'README.md' not found."

# 2. Create android-root-apps directory for SEO-optimized routing
mkdir -p docs/android-root-apps || handle_error "Failed creating android-root-apps directory"
log_info "Created docs/android-root-apps directory"

# 3. Copy README.md to docs/android-root-apps/index.md (SEO-optimized route)
cp README.md docs/android-root-apps/index.md || handle_error "Failed copying README.md to docs/android-root-apps/index.md"
log_info "Copied README.md to docs/android-root-apps/index.md"

# 4. Add frontmatter to android-root-apps
if [ ! -f "docs/android-root-apps/index-frontmatter.txt" ]; then
    log_warn "index-frontmatter.txt not found, skipping frontmatter addition"
else
    tmp_file=$(mktemp) || handle_error "Failed creating temporary file"
    {
        cat docs/android-root-apps/index-frontmatter.txt
        cat docs/android-root-apps/index.md
    } > "$tmp_file" && mv "$tmp_file" docs/android-root-apps/index.md || handle_error "Failed adding frontmatter to docs/android-root-apps/index.md"
    log_info "Added frontmatter to docs/android-root-apps/index.md"
fi

# 5. Adjust links in android-root-apps route
sed -i '/http[s]*:\/\/\//! s|./docs/android-root-guides/|../android-root-guides/|g' docs/android-root-apps/index.md && \
sed -i '/http[s]*:\/\/\//! s|./docs/|../|g' docs/android-root-apps/index.md && \
sed -i 's|\([^:]\)//|\1/|g' docs/android-root-apps/index.md || handle_error "Failed adjusting links in docs/android-root-apps/index.md"
log_info "Links adjusted in docs/android-root-apps/index.md"

echo -e "${GREEN}Documentation build process completed successfully.${NC}"
