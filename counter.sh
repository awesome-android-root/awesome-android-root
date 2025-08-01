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
# Main pattern for app entries (excludes guide links to ./docs/)
total_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*'
guides_pattern='^- \*\*\[[^]]+\]\(\./docs/.*\)\*\*'
magisk_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*.*\[M\]'
kernelsu_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*.*\[K\]'
lsposed_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*.*\[LSP\]'

# Count all entries
all_entries=$(count_entries "$total_pattern")
guide_entries=$(count_entries "$guides_pattern")

# Calculate actual app entries (excluding guides)
total_entries=$((all_entries - guide_entries))

# Count modules by type (total counts including overlaps)
magisk_modules=$(count_entries "$magisk_pattern")
kernelsu_modules=$(count_entries "$kernelsu_pattern")
lsposed_modules=$(count_entries "$lsposed_pattern")

# Calculate root apps (entries without any module tags)
# First get all app entries, then subtract those with any module tags
all_module_entries=$(grep -E "$total_pattern" "$readme_file" | grep -v "$guides_pattern" | grep -E '\[(M|K|LSP)\]' | wc -l)
root_apps=$((total_entries - all_module_entries))

# Output in new MD table format
cat << EOF

## Stats

<div class="img-cnt">

![Total Entries](https://img.shields.io/badge/Total%20Entries-${total_entries}-blue?style=for-the-badge&logo=android)
![Root Apps](https://img.shields.io/badge/Root%20Apps-${root_apps}-blue?style=for-the-badge&logo=android)
![Magisk Modules](https://img.shields.io/badge/Magisk%20Modules-${magisk_modules}-orange?style=for-the-badge&logo=magisk&logoColor=white)
![KernelSU Modules](https://img.shields.io/badge/KernelSU%20Modules-${kernelsu_modules}-green?style=for-the-badge&logo=keenetic&logoColor=white)
![LSPosed Modules](https://img.shields.io/badge/LSPosed%20Modules-${lsposed_modules}-purple?style=for-the-badge&logo=local&logoColor=white)

</div>

EOF

# Debug information (uncomment for troubleshooting)
# echo "DEBUG INFO:" >&2
# echo "All entries: $all_entries" >&2
# echo "Guide entries: $guide_entries" >&2
# echo "Actual total entries: $total_entries" >&2
# echo "Magisk modules: $magisk_modules" >&2
# echo "KernelSU modules: $kernelsu_modules" >&2
# echo "LSPosed modules: $lsposed_modules" >&2
# echo "All module entries: $all_module_entries" >&2
# echo "Root apps: $root_apps" >&2
# echo "" >&2