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
lsposed_pattern='^- \*\*\[[^]]+\]\(.*\)\*\*.*\[LSP\]'

# Count entries
total_entries=$(count_entries "$total_pattern")
magisk_modules=$(count_entries "$magisk_pattern")
lsposed_modules=$(count_entries "$lsposed_pattern")
root_apps=$((total_entries - magisk_modules - lsposed_modules))

# Output in new MD table format
cat << EOF
## Stats

![Total Entries](https://img.shields.io/badge/Total%20Entries-${total_entries}-blue?style=for-the-badge&logo=android)
![Root Apps](https://img.shields.io/badge/Root%20Apps-${root_apps}-blue?style=for-the-badge&logo=android)
![Magisk Modules](https://img.shields.io/badge/Magisk%20Modules-${magisk_modules}-orange?style=for-the-badge&logo=magisk&logoColor=white)
![LSPosed Modules](https://img.shields.io/badge/LSPosed%20Modules-${lsposed_modules}-purple?style=for-the-badge&logo=local&logoColor=white)


EOF