#!/bin/bash

# Exit on any error and treat unset variables as errors
set -euo pipefail

# Colors for output
readonly GREEN='\033[0;32m'
readonly NC='\033[0m' # No Color
readonly RED='\033[0;31m'
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

# 1. Remove .md extension from both HTML href links and Markdown links in docs/index.md
remove_md_from_links() {
    local target_file="docs/index.md"

    if [ ! -f "$target_file" ]; then
        log_warn "$target_file not found, skipping .md removal"
        return
    fi

    log_info "Removing .md extensions from internal links in $target_file"
    
    # Process the file to remove .md extensions
    # Using simple string replacement approach
    
    # Create a temporary file
    local temp_file="${target_file}.tmp"
    cp "$target_file" "$temp_file"
    
    # Remove .md from href attributes (HTML links)
    perl -pi -e 's/href="([^"]+?)\.md"/href="$1"/g' "$temp_file" || {
        rm "$temp_file"
        handle_error "Failed to process HTML links"
    }
    
    # Remove .md from Markdown links
    perl -pi -e 's/```KATEX_INLINE_OPEN([^)]+?)\.mdKATEX_INLINE_CLOSE/]($1)/g' "$temp_file" || {
        rm "$temp_file"
        handle_error "Failed to process Markdown links"
    }
    
    # Move the processed file back
    mv "$temp_file" "$target_file" || handle_error "Failed to update $target_file"

    log_info "Successfully removed .md extensions from links in $target_file"
}

# 2. Call the function
remove_md_from_links

# 3. Adjust image paths in android-root-apps/index.md
adjust_image_paths() {
    local target="docs/android-root-apps/index.md"
    
    if [ ! -f "$target" ]; then
        log_warn "$target not found, skipping image path adjustment"
        return
    fi

    log_info "Adjusting image paths in $target"

    # Replace docs/public/images/ → ../public/images/
    perl -pi -e 's|docs/public/images/|../public/images/|g' "$target" || \
        handle_error "Failed to adjust image paths in $target"

    log_info "Image paths updated in $target"
}

adjust_image_paths

echo -e "${GREEN}Documentation build process completed successfully.${NC}"