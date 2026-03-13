#!/usr/bin/env bash

# Set the README file
readme_file="../README.md"

# Check if the file exists
if [[ ! -f "$readme_file" ]]; then
  echo "Error: $readme_file not found!"
  exit 1
fi

# Colors
RESET='\033[0m'
BOLD='\033[1m'
BLUE='\033[38;5;75m'
ORANGE='\033[38;5;208m'
GREEN='\033[38;5;114m'
PURPLE='\033[38;5;141m'
CYAN='\033[38;5;80m'
WHITE='\033[97m'
GRAY='\033[38;5;240m'

# Function to count entries matching a pattern
count_entries() {
  local pattern=$1
  grep -cE "$pattern" "$readme_file"
}

# Function to exclude certain lines and count the rest
count_filtered_entries() {
  local include_pattern=$1
  local exclude_pattern=$2
  if [[ -n "$exclude_pattern" ]]; then
    grep -E "$include_pattern" "$readme_file" | grep -vcE "$exclude_pattern"
  else
    grep -cE "$include_pattern" "$readme_file"
  fi
}

# Patterns
total_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*'
exclude_pattern='(docs/|README\.md|index\.md|↑ Back to top|table-of-contents)'
table_entries_pattern='^\| \*\*\[[^]]+\]\([^)]*\)\*\*'
magisk_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*.*`\[M\]`'
kernelsu_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*.*`\[K\]`'
lsposed_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*.*`\[LSP\]`'

# Count
all_entries=$(count_filtered_entries "$total_pattern" "$exclude_pattern")
table_entries=$(count_entries "$table_entries_pattern")
total_entries=$((all_entries - table_entries))
magisk_modules=$(count_entries "$magisk_pattern")
kernelsu_modules=$(count_entries "$kernelsu_pattern")
lsposed_modules=$(count_entries "$lsposed_pattern")
all_module_entries=$(grep -E "$total_pattern" "$readme_file" | grep -vE "$exclude_pattern" | grep -cE '`\[(M|K|LSP)\]`')
root_apps=$((total_entries - all_module_entries))

# Display
echo ""
echo -e "  ${GRAY}${RESET}  ${BOLD}${WHITE}📃 README Stats${RESET}                    ${GRAY}${RESET}"
echo -e "  ${GRAY}---------------------------------+${RESET}"
echo -e "  ${GRAY}${RESET}  ${CYAN}Total Entries${RESET}         ${BOLD}${WHITE}${total_entries}${RESET}        ${GRAY}${RESET}"
echo -e "  ${GRAY}---------------------------------+${RESET}"
echo -e "  ${GRAY}${RESET}  ${BLUE}Root Apps${RESET}              ${BOLD}${WHITE}${root_apps}${RESET}        ${GRAY}${RESET}"
echo -e "  ${GRAY}${RESET}  ${ORANGE}Magisk Modules${RESET}        ${BOLD}${WHITE}${magisk_modules}${RESET}        ${GRAY}${RESET}"
echo -e "  ${GRAY}${RESET}  ${GREEN}KernelSU Modules${RESET}      ${BOLD}${WHITE}${kernelsu_modules}${RESET}        ${GRAY}${RESET}"
echo -e "  ${GRAY}${RESET}  ${PURPLE}LSPosed Modules${RESET}       ${BOLD}${WHITE}${lsposed_modules}${RESET}        ${GRAY}${RESET}"
echo ""