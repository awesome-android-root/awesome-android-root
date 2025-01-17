#!/usr/bin/env bash

readme_file="README.md"

# Count total app entries
total_entries=$(grep -E '^- \*\*\[[^]]+\]\(.*\)\*\*' "$readme_file" | wc -l)

# Count Magisk modules
magisk_modules=$(grep -E '^- \*\*\[[^]]+\]\(.*\)\*\*.*\[M\]' "$readme_file" | wc -l)

# Count LSPosed modules
lsposed_modules=$(grep -E '^- \*\*\[[^]]+\]\(.*\)\*\*.*\[LP\]' "$readme_file" | wc -l)

# Calculate Root Apps
root_apps=$((total_entries - magisk_modules - lsposed_modules))

# Output in text
echo "Total number of app entries: $total_entries"
echo "Number of Magisk modules: $magisk_modules"
echo "Number of LSPosed modules: $lsposed_modules"
echo "Number of Root Apps: $root_apps"