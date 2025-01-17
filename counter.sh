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
echo "- ##### Total Entries: \`$total_entries\`"
echo "- ##### Root Apps: \`$root_apps\`"
echo "- ##### Magisk Modules: \`$magisk_modules\`"
echo "- ##### LSPosed Modules: \`$lsposed_modules\`"
