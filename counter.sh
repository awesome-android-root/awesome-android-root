#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Check if README.md exists
if [ ! -f "README.md" ]; then
    echo -e "${RED}Error: README.md not found in current directory${NC}"
    exit 1
fi

# Count markdown links that match the pattern:
# - **[text](link)**
count=$(grep -E '^\s*-\s+\*\*\[.*\]\(.*\)\*\*' README.md | wc -l)

# Display result
echo -e "${GREEN}Total apps found in README.md${NC}: ${count} "