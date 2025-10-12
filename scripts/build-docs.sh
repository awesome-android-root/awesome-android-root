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

# 2. Create android-root-apps directory if it doesn't exist
mkdir -p docs/android-root-apps || handle_error "Failed creating android-root-apps directory"
log_info "Created docs/android-root-apps directory"

# 3. Filter README.md content and append to existing docs/android-root-apps/index.md
filter_readme() {
    # Remove div elements with specified classes using sed
    sed '/<div[^>]*class="[^"]*\(toc-overview\|intro-header\|quick-nav\|root-intro\|readme-guides\|readme-guides-steps\|readme-apps-intro\)[^"]*"[^>]*>/,/<\/div>/d' README.md
}

if [ -f "docs/android-root-apps/index.md" ]; then
    tmp_file=$(mktemp) || handle_error "Failed creating temporary file"
    {
        cat docs/android-root-apps/index.md
        echo ""  # Add blank line separator
        filter_readme
    } > "$tmp_file" && mv "$tmp_file" docs/android-root-apps/index.md || handle_error "Failed appending filtered README.md to docs/android-root-apps/index.md"
    log_info "Appended filtered README.md content to existing docs/android-root-apps/index.md"
else
    # If index.md doesn't exist, just copy filtered README.md
    filter_readme > docs/android-root-apps/index.md || handle_error "Failed copying filtered README.md to docs/android-root-apps/index.md"
    log_info "Copied filtered README.md to docs/android-root-apps/index.md"
fi

# 4. Adjust links in android-root-apps route
sed -i '/http[s]*:\/\/\//! s|./docs/android-root-guides/|../android-root-guides/|g' docs/android-root-apps/index.md && \
sed -i '/http[s]*:\/\/\//! s|./docs/|../|g' docs/android-root-apps/index.md && \
sed -i 's|\([^:]\)//|\1/|g' docs/android-root-apps/index.md || handle_error "Failed adjusting links in docs/android-root-apps/index.md"
log_info "Links adjusted in docs/android-root-apps/index.md"

# 5. Adjust image paths in android-root-apps route
sed -i 's|docs/public/images/|../public/images/|g' docs/android-root-apps/index.md || handle_error "Failed adjusting image paths in docs/android-root-apps/index.md"
log_info "Image paths adjusted in docs/android-root-apps/index.md"

# 6. Remove "docs/" prefix from internal documentation links
sed -i 's|\(\[.*\](\)\./docs/|\1/|g' docs/android-root-apps/index.md && \
sed -i 's|\(\[.*\](\)docs/|\1/|g' docs/android-root-apps/index.md || handle_error "Failed removing docs/ prefix from links in docs/android-root-apps/index.md"
log_info "Removed 'docs/' prefix from internal documentation links in docs/android-root-apps/index.md"

# 7. Display build summary
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Documentation build completed successfully!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

