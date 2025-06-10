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

# Output in new HTML table format
cat << EOF
## Stats

<div align="center">

### 📊 Repository Statistics


| ![Total Entries](https://img.shields.io/badge/Total%20Entries-${total_entries}-brightgreen?style=for-the-badge&logo=android)<br>**Total Entries** | ![Root Apps](https://img.shields.io/badge/Root%20Apps-${root_apps}-blue?style=for-the-badge&logo=android)<br>**Root Apps** |
|:---:|:---:|
| ![Magisk Modules](https://img.shields.io/badge/Magisk%20Modules-${root_apps}-orange?style=for-the-badge&logo=magisk)<br>**Magisk Modules** | ![LSPosed Modules](https://img.shields.io/badge/LSPosed%20Modules-${lsposed_modules}-purple?style=for-the-badge&logo=xposed)<br>**LSPosed Modules** |

### 👥 Visitor Counter

![Visitor Count](https://profile-counter.glitch.me/fynks/count.svg)

<p><em>Thank you for being part of our growing community! 🚀</em></p>

</div>
EOF