#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

# Configuration
readonly DOCS_DIR="docs"
readonly README="README.md"
readonly TEMP_FILE="/tmp/md_content.$$"

# Color logging
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Section configurations
declare -A SECTIONS=(
    ["index"]="Introduction|home|100"
    ["how-to-root"]="How to Root|question|90"
    ["framework-solutions"]="Framework Solutions|gear|80"
    ["root-apps"]="Root Apps|apps|70|Root Apps"
)

# Section patterns
declare -A PATTERNS=(
    ["index"]="^## What is root/,/^## How to root/"
    ["how-to-root"]="^## How to root/,/^## Framework/"
    ["framework-solutions"]="^## Framework Solutions/,/^## Glossary/"
    ["root-apps"]="^## Glossary/,/^## /"
)

log() {
    local level=$1
    local msg=$2
    local color=$NC
    
    case $level in
        "INFO") color=$GREEN ;;
        "ERROR") color=$RED ;;
        "DEBUG") color=$BLUE ;;
    esac
    
    echo -e "${color}[$level] $msg${NC}"
}

cleanup() {
    [[ -f $TEMP_FILE ]] && rm "$TEMP_FILE"
    log "INFO" "Cleanup completed"
}

create_frontmatter() {
    local file=$1
    local config=$2
    
    IFS='|' read -r label icon order meta_title <<< "$config"
    
    {
        echo "---"
        echo "label: $label"
        echo "icon: $icon"
        [[ -n ${meta_title:-} ]] && echo -e "meta:\n  title: \"$meta_title\""
        echo "order: $order"
        echo "---"
        echo
    } > "$file"
}

validate_input() {
    [[ ! -f $README ]] && {
        log "ERROR" "README.md not found"
        exit 1
    }
}

extract_section() {
    local pattern=$1
    local output=$2
    
    awk "/$pattern/ {if(!/$pattern\$/) print}" "$README" > "$output"
}

generate_docs() {
    mkdir -p "$DOCS_DIR"
    
    for section in "${!SECTIONS[@]}"; do
        local file="$DOCS_DIR/${section}.md"
        local pattern=${PATTERNS[$section]}
        local config=${SECTIONS[$section]}
        
        log "INFO" "Generating $file"
        
        extract_section "$pattern" "$TEMP_FILE"
        create_frontmatter "$file" "$config"
        cat "$TEMP_FILE" >> "$file"
        
        [[ ! -s $file ]] && log "WARNING" "$file is empty"
    done
}

main() {
    log "INFO" "Starting documentation generation"
    
    validate_input
    generate_docs
    
    log "INFO" "Documentation generated successfully in $DOCS_DIR/"
}

trap cleanup EXIT
main