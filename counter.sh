#!/usr/bin/env bash

# Set the README file
readme_file="README.md"

# Check if the file exists
if [[ ! -f "$readme_file" ]]; then
  echo "Error: $readme_file not found!"
  exit 1
fi

# Function to count entries matching a pattern
count_entries() {
  local pattern=$1
  grep -E "$pattern" "$readme_file" | wc -l
}

# Patterns for entries
total_pattern='^- \*\*\[[^]]+\]\(.*\)\*\*'
magisk_pattern='^- \*\*\[[^]]+\]\(.*\)\*\*.*\[M\]'
lsposed_pattern='^- \*\*\[[^]]+\]\(.*\)\*\*.*\[LP\]'

# Count entries
total_entries=$(count_entries "$total_pattern")
magisk_modules=$(count_entries "$magisk_pattern")
lsposed_modules=$(count_entries "$lsposed_pattern")
root_apps=$((total_entries - magisk_modules - lsposed_modules))

# Output in Markdown-friendly format
echo "- ##### Total Entries: \`$total_entries\`"
echo "- ##### Root Apps: \`$root_apps\`"
echo "- ##### Magisk Modules: \`$magisk_modules\`"
echo "- ##### LSPosed Modules: \`$lsposed_modules\`"
