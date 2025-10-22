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

# 4. Adjust links and image paths in android-root-apps route (combined sed operations)
sed -i \
  -e '/http[s]*:\/\/\//! s|./docs/android-root-guides/|../android-root-guides/|g' \
  -e '/http[s]*:\/\/\//! s|./docs/|../|g' \
  -e 's|\([^:]\)//|\1/|g' \
  -e 's|docs/public/images/|../public/images/|g' \
  -e 's|\(\[.*\](\)\./docs/|\1/|g' \
  -e 's|\(\[.*\](\)docs/|\1/|g' \
  docs/android-root-apps/index.md || handle_error "Failed adjusting links and paths in docs/android-root-apps/index.md"
log_info "Links and image paths adjusted in docs/android-root-apps/index.md"

# 7. Add AppSearch component and wrap content for searchability
add_search_component() {
    local file="docs/android-root-apps/index.md"
    local tmp_file=$(mktemp) || handle_error "Failed creating temporary file for search component"
    
    # Find line numbers for both --- markers (frontmatter boundaries)
    local frontmatter_lines=$(grep -n "^---$" "$file" | head -2 | cut -d: -f1)
    local first_marker=$(echo "$frontmatter_lines" | head -1)
    local second_marker=$(echo "$frontmatter_lines" | tail -1)
    
    if [ -z "$first_marker" ] || [ -z "$second_marker" ]; then
        handle_error "Could not find frontmatter markers in $file"
    fi
    
    # Find where the main content starts (looking for "## Glossary" or similar heading)
    local content_marker_line=$(grep -n "^## Glossary" "$file" | head -1 | cut -d: -f1)
    
    if [ -z "$content_marker_line" ]; then
        # Fallback to looking for any h2 heading
        content_marker_line=$(grep -n "^## " "$file" | head -1 | cut -d: -f1)
    fi
    
    if [ -z "$content_marker_line" ]; then
        handle_error "Could not find content marker in $file"
    fi
    
    # Split file and add search component
    {
        # Copy frontmatter and header content (before glossary)
        head -n "$((content_marker_line - 1))" "$file"
        echo ""
        echo '<ClientOnly>'
        echo '  <AppSearch />'
        echo '</ClientOnly>'
        echo ""
        echo '<div class="app-search-content">'
        echo ""
        # Copy the rest of the content (from glossary onwards)
        tail -n +"$content_marker_line" "$file"
        echo ""
        echo '</div>'
    } > "$tmp_file" && mv "$tmp_file" "$file" || handle_error "Failed adding search component to $file"
}

add_search_component
log_info "Added AppSearch component and wrapped content in docs/android-root-apps/index.md"

# 8. Validate generated content
validate_build() {
    local file="docs/android-root-apps/index.md"
    
    # Check if file exists and is not empty
    [ ! -s "$file" ] && handle_error "Generated file is empty or does not exist"
    
    # Check if AppSearch component was added
    grep -q "AppSearch" "$file" || log_warn "AppSearch component not found in generated file"
    
    # Check if wrapper div was added
    grep -q "app-search-content" "$file" || log_warn "Content wrapper not found in generated file"
    
    # Count total lines to ensure content was copied
    local line_count=$(wc -l < "$file")
    [ "$line_count" -lt 100 ] && log_warn "Generated file seems too short (only $line_count lines)"
    
    log_info "Build validation completed"
}

validate_build

# 9. Display build summary
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Documentation build completed successfully!${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════════${NC}"
echo ""

