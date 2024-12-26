#!/bin/bash
# filepath: update-meta.sh

# Define the meta description
META_DESC="A curated list of best Android root applications and best magisk modules. Features over 120 apps across categories like system mods, privacy, customization, and development tools."

# Check if docs/apps.md exists
if [ ! -f "docs/apps.md" ]; then
    echo "Error: docs/apps.md not found"
    exit 1
fi

# Create temporary file with new frontmatter
cat > temp.md << EOF
---
title: Root Apps
description: "${META_DESC}"
---

EOF

# Append existing content
cat docs/apps.md >> temp.md

# Replace original file
mv temp.md docs/apps.md

echo "Updated meta description in docs/apps.md"