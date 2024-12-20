#!/bin/bash
# filepath: /home/ali/Github/awesome-android-root/fix-links.sh

# Copy README.md to docs/apps.md
cp README.md docs/apps.md

# Adjust links in docs/apps.md for VitePress
sed -i 's|./docs/|./|g' docs/apps.md

# Remove any duplicate slashes in links
sed -i 's|//|/|g' docs/apps.md