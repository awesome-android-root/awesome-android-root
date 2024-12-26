#!/bin/bash

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

# Check for README.md
if [ ! -f "README.md" ]; then
  echo -e "${RED}Error: README.md not found.${NC}"
  exit 1
fi

# Count lines matching markdown link pattern:
count=$(grep -E '^\s*-\s+\*\*\[.*\]\(.*\)\*\*' README.md | wc -l)
echo -e "${GREEN}Total apps found:${NC} ${count}"

# Update README.md Stats section with new count
sed -i "s/^\(#### Number of Apps: \`\)[0-9]\+\(\`\)$/\1${count}\2/" README.md

echo -e "${GREEN}README.md stats updated to:${NC} ${count}"