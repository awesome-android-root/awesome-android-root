#!/bin/bash

# Copy README.md to docs/apps.md
cp README.md docs/apps.md

# Adjust links in docs/apps.md for VitePress, only replacing local links
sed -i '/http[s]*:\/\/\//! s|./docs/|./|g' docs/apps.md

# Remove any duplicate slashes in links, excluding http(s) links
# Modified sed command to prevent removing slashes from 'https://'
sed -i 's|\([^:]\)//|\1/|g' docs/apps.md