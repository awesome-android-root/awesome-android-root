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

# 5. Update stats automatically
update_stats() {
    local readme_file="$1"
    log_info "Updating stats in $readme_file"
    
    # Function to count entries matching a pattern
    count_entries() {
        local pattern="$1"
        local file="${2:-$readme_file}"
        grep -E "$pattern" "$file" 2>/dev/null | wc -l
    }

    # Patterns for entries (same as counter.sh)
    local total_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*'
    local guides_pattern='^- \*\*\[[^]]+\]\(\./docs/.*\)\*\*'
    local magisk_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*.*\[M\]'
    local kernelsu_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*.*\[K\]'
    local lsposed_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*.*\[LSP\]'

    # Count all entries
    local all_entries=$(count_entries "$total_pattern")
    local guide_entries=$(count_entries "$guides_pattern")

    # Calculate actual app entries (excluding guides)
    local total_entries=$((all_entries - guide_entries))
    
    # Count modules by type (total counts including overlaps)
    local magisk_modules=$(count_entries "$magisk_pattern")
    local kernelsu_modules=$(count_entries "$kernelsu_pattern")
    local lsposed_modules=$(count_entries "$lsposed_pattern")

    # Calculate root apps (entries without any module tags)
    # First get all app entries, then subtract those with any module tags
    local all_module_entries=$(grep -E "$total_pattern" "$readme_file" 2>/dev/null | grep -v "$guides_pattern" | grep -E '\[(M|K|LSP)\]' | wc -l)
    local root_apps=$((total_entries - all_module_entries))

    # Debug logging
    log_info "Stats calculated: Total=${total_entries}, Root Apps=${root_apps}, Magisk=${magisk_modules}, KernelSU=${kernelsu_modules}, LSPosed=${lsposed_modules}"

    # Generate stats section with current date
    local current_date=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local new_stats="<div class=\"img-cnt\">

![Total Entries](https://img.shields.io/badge/Total%20Entries-${total_entries}-blue?style=for-the-badge&logo=android&cacheSeconds=3600)
![Root Apps](https://img.shields.io/badge/Root%20Apps-${root_apps}-blue?style=for-the-badge&logo=android&cacheSeconds=3600)
![Magisk Modules](https://img.shields.io/badge/Magisk%20Modules-${magisk_modules}-orange?style=for-the-badge&logo=magisk&logoColor=white&cacheSeconds=3600)
![KernelSU Modules](https://img.shields.io/badge/KernelSU%20Modules-${kernelsu_modules}-green?style=for-the-badge&logo=keenetic&logoColor=white&cacheSeconds=3600)
![LSPosed Modules](https://img.shields.io/badge/LSPosed%20Modules-${lsposed_modules}-purple?style=for-the-badge&logo=local&logoColor=white&cacheSeconds=3600)

</div>"

    # Use sed to replace the stats section between <div class="img-cnt"> and </div>
    local temp_file=$(mktemp) || handle_error "Failed creating temporary file for stats update"
    
    # Replace the stats section
    sed '/^<div class="img-cnt">$/,/^<\/div>$/{
        /^<div class="img-cnt">$/r /dev/stdin
        d
    }' "$readme_file" <<< "$new_stats" > "$temp_file" && \
    mv "$temp_file" "$readme_file" || handle_error "Failed updating stats in $readme_file"
    
    log_info "Stats updated: Total=${total_entries}, Root Apps=${root_apps}, Magisk=${magisk_modules}, KernelSU=${kernelsu_modules}, LSPosed=${lsposed_modules}"
    
    # Also update frontmatter if it's the android-root-apps index file
    if [[ "$readme_file" == *"android-root-apps/index.md" ]] && [[ -f "docs/android-root-apps/index-frontmatter.txt" ]]; then
        update_frontmatter_stats "$total_entries" "$root_apps" "$magisk_modules" "$kernelsu_modules" "$lsposed_modules" "$current_date"
    fi
}

# Function to update frontmatter stats and metadata
update_frontmatter_stats() {
    local total_entries="$1"
    local root_apps="$2" 
    local magisk_modules="$3"
    local kernelsu_modules="$4"
    local lsposed_modules="$5"
    local current_date="$6"
    local frontmatter_file="docs/android-root-apps/index-frontmatter.txt"
    
    log_info "Updating frontmatter stats in $frontmatter_file"
    
    # Update description with current stats (replace any number+)
    sed -i "s/[0-9]\++/${total_entries}+/g" "$frontmatter_file" || log_warn "Could not update total entries in frontmatter"
    
    # Update dateModified in JSON-LD (if present)
    if grep -q "dateModified" "$frontmatter_file" 2>/dev/null; then
        sed -i "s/\"dateModified\": \"[^\"]*\"/\"dateModified\": \"$current_date\"/g" "$frontmatter_file"
    fi
    
    log_info "Frontmatter updated with current stats and date"
}

# Update stats in original README.md
update_stats "README.md"

# 6. Adjust links in android-root-apps route
sed -i '/http[s]*:\/\/\//! s|./docs/android-root-guides/|../android-root-guides/|g' docs/android-root-apps/index.md && \
sed -i '/http[s]*:\/\/\//! s|./docs/|../|g' docs/android-root-apps/index.md && \
sed -i 's|\([^:]\)//|\1/|g' docs/android-root-apps/index.md || handle_error "Failed adjusting links in docs/android-root-apps/index.md"
log_info "Links adjusted in docs/android-root-apps/index.md"

# 7. Update stats in docs/android-root-apps/index.md as well
update_stats "docs/android-root-apps/index.md"

echo -e "${GREEN}Documentation build process completed successfully.${NC}"
