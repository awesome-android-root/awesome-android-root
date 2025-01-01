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
META_DESC="A curated list of best Android root applications and best magisk modules. Features over 120 apps across categories like system mods, privacy, customization, and development tools."
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

# Function to count apps in a section with proper handling of nested categories
count_section_apps() {
    local start_pattern="$1"
    local file="$2"
    local level="$3"
    local next_level=$((level + 1))
    
    awk -v start="$start_pattern" -v level="$level" -v next_level="$next_level" '
    function get_heading_level(line) {
        match(line, /^#+/);
        return RLENGTH;
    }
    
    BEGIN { in_section = 0; count = 0; }
    
    # Mark section start
    $0 ~ "^" start {
        in_section = 1;
        next;
    }
    
    # Handle section end
    /^#{1,6}/ {
        if (in_section) {
            current_level = get_heading_level($0);
            if (current_level <= level) {
                in_section = 0;
            }
        }
    }
    
    # Count apps
    in_section && /^\s*-\s+\*\*\[/ {
        count++;
    }
    
    END {
        print count;
    }
    ' "$file"
}

# Get all categories and their counts
echo -e "\n${BLUE}Counting apps by category...${NC}"

# Initialize total count
total_count=0

# Process main categories
while IFS= read -r category; do
    category_name=$(echo "$category" | sed 's/^### //')
    category_count=$(count_section_apps "$category" docs/apps.md 3)
    
    # Print category stats
    printf "${GREEN}%-30s${NC}: %3d apps\n" "$category_name" "$category_count"
    
    # Add to total
    ((total_count += category_count))
    
    # Process subcategories if any
    while IFS= read -r subcategory; do
        subcat_name=$(echo "$subcategory" | sed 's/^#### //')
        subcat_count=$(count_section_apps "#### $subcat_name" docs/apps.md 4)
        if [ "$subcat_count" -gt 0 ]; then
            printf "  ${BLUE}%-28s${NC}: %3d apps\n" "$subcat_name" "$subcat_count"
        fi
    done < <(grep -A20 "^$category\$" docs/apps.md | grep "^#### " || true)
    
done < <(grep "^### " docs/apps.md)

# Update stats in both files
{
    # Update total count in docs/apps.md
    sed -i '/^## Stats/,/^##/c\## Stats\n\n#### Number of Apps: `'"$total_count"'`\n' docs/apps.md || \
        handle_error "Failed updating apps.md stats"

    # Create/update docs/stats.md with detailed breakdown
    tmp_stats=$(mktemp)
    
    # Add frontmatter to stats.md
    echo "---" > "$tmp_stats"
    echo "title: App Statistics" >> "$tmp_stats"
    echo "description: \"Detailed statistics of Android root applications and Magisk modules by category\"" >> "$tmp_stats"
    echo "---" >> "$tmp_stats"
    echo "" >> "$tmp_stats"
    
    echo "# App Statistics" >> "$tmp_stats"
    echo "" >> "$tmp_stats"
    echo "## Total Apps" >> "$tmp_stats"
    echo "" >> "$tmp_stats"
    echo "Total number of apps: \`$total_count\`" >> "$tmp_stats"
    echo "" >> "$tmp_stats"
    echo "## Category Breakdown" >> "$tmp_stats"
    echo "" >> "$tmp_stats"
    
    # Add category breakdown
    while IFS= read -r category; do
        category_name=$(echo "$category" | sed 's/^### //')
        category_count=$(count_section_apps "$category" docs/apps.md 3)
        
        # Add category to stats
        echo "### $category_name" >> "$tmp_stats"
        echo "- Total apps in category: \`$category_count\`" >> "$tmp_stats"
        echo "" >> "$tmp_stats"
        
        # Add subcategories if any
        has_subcats=false
        while IFS= read -r subcategory; do
            subcat_name=$(echo "$subcategory" | sed 's/^#### //')
            subcat_count=$(count_section_apps "#### $subcat_name" docs/apps.md 4)
            if [ "$subcat_count" -gt 0 ]; then
                if [ "$has_subcats" = false ]; then
                    echo "#### Subcategories:" >> "$tmp_stats"
                    has_subcats=true
                fi
                echo "- **$subcat_name**: \`$subcat_count\` " >> "$tmp_stats"
            fi
        done < <(grep -A20 "^$category\$" docs/apps.md | grep "^#### " || true)
        
        echo "" >> "$tmp_stats"  # Add blank line between categories
    done < <(grep "^### " docs/apps.md)
    
    # Add timestamp
    echo -e "\n---\n" >> "$tmp_stats"
    echo "Last updated: $(date '+%Y-%m-%d %H:%M:%S')" >> "$tmp_stats"
    
    # Replace or create stats.md
    mv "$tmp_stats" docs/stats.md || handle_error "Failed creating/updating stats.md"
    echo -e "${GREEN}Updated detailed statistics in docs/stats.md${NC}"
} || handle_error "Failed updating statistics"

echo -e "\n${GREEN}Total apps found: ${total_count}${NC}"
echo -e "${GREEN}Documentation build process completed successfully.${NC}"
