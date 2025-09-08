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

# Function to exclude certain lines and count the rest
count_filtered_entries() {
  local include_pattern=$1
  local exclude_pattern=$2
  if [[ -n "$exclude_pattern" ]]; then
    grep -E "$include_pattern" "$readme_file" | grep -v -E "$exclude_pattern" | wc -l
  else
    grep -E "$include_pattern" "$readme_file" | wc -l
  fi
}

# Patterns for entries
# Main pattern for app entries (looks for entries starting with "- **[name](link)**")
total_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*'
# Guide entries pattern and other non-app entries to exclude
exclude_pattern='(docs/|README\.md|index\.md|↑ Back to top|table-of-contents)'
# Table entries that aren't counted (like in Featured Apps table)
table_entries_pattern='^\| \*\*\[[^]]+\]\([^)]*\)\*\*'
# Module patterns - looking for backtick-enclosed tags
magisk_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*.*`\[M\]`'
kernelsu_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*.*`\[K\]`'
lsposed_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*.*`\[LSP\]`'

# Count all entries excluding guides and navigation links
all_entries=$(count_filtered_entries "$total_pattern" "$exclude_pattern")
table_entries=$(count_entries "$table_entries_pattern")

# Calculate actual app entries (excluding table entries like Featured Apps)
total_entries=$((all_entries - table_entries))

# Count modules by type (total counts including overlaps)
magisk_modules=$(count_entries "$magisk_pattern")
kernelsu_modules=$(count_entries "$kernelsu_pattern")
lsposed_modules=$(count_entries "$lsposed_pattern")

# Calculate root apps (entries without any module tags)
# Get all app entries, then subtract those with any module tags
all_module_entries=$(grep -E "$total_pattern" "$readme_file" | grep -v -E "$exclude_pattern" | grep -E '`\[(M|K|LSP)\]`' | wc -l)
root_apps=$((total_entries - all_module_entries))

# Output in new MD table format
cat << EOF

![Total Entries](https://img.shields.io/badge/Total%20Entries-${total_entries}-blue?style=for-the-badge&logo=android&cacheSeconds=3600)
![Root Apps](https://img.shields.io/badge/Root%20Apps-${root_apps}-blue?style=for-the-badge&logo=android&cacheSeconds=3600)
![Magisk Modules](https://img.shields.io/badge/Magisk%20Modules-${magisk_modules}-orange?style=for-the-badge&logo=magisk&logoColor=white&cacheSeconds=3600)
![KernelSU Modules](https://img.shields.io/badge/KernelSU%20Modules-${kernelsu_modules}-green?style=for-the-badge&logo=keenetic&logoColor=white&cacheSeconds=3600)
![LSPosed Modules](https://img.shields.io/badge/LSPosed%20Modules-${lsposed_modules}-purple?style=for-the-badge&logo=local&logoColor=white&cacheSeconds=3600)

EOF

# Debug information (uncomment for troubleshooting)
# echo "DEBUG INFO:" >&2
# echo "All entries: $all_entries" >&2
# echo "Table entries: $table_entries" >&2
# echo "Actual total entries: $total_entries" >&2
# echo "Magisk modules: $magisk_modules" >&2
# echo "KernelSU modules: $kernelsu_modules" >&2
# echo "LSPosed modules: $lsposed_modules" >&2
# echo "All module entries: $all_module_entries" >&2
# echo "Root apps: $root_apps" >&2
# echo "" >&2