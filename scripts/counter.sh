#!/usr/bin/env bash

# Counts entries in the Apps & Modules category pages (docs/apps-and-modules/*.md).
# The docs pages are the canonical home of the database (see README).

# Resolve repo root (scripts/..)
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# All category pages, excluding the hub index
mapfile -t pages < <(find "$ROOT_DIR/docs/apps-and-modules" -maxdepth 1 -name '*.md' ! -name 'index.md' | sort)

if [[ ${#pages[@]} -eq 0 ]]; then
  echo "Error: no category pages found under docs/apps-and-modules/!" >&2
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

# Patterns (same entry format as always: "- **[[Name]](url)** ...")
entry_pattern='^- \*\*\[[^]]+\]\([^)]*\)\*\*'

all_entries=$(grep -hE "$entry_pattern" "${pages[@]}" | wc -l)
magisk_modules=$(grep -hE "$entry_pattern" "${pages[@]}" | grep -cE '`\[M\]`' || true)
kernelsu_modules=$(grep -hE "$entry_pattern" "${pages[@]}" | grep -cE '`\[K\]`' || true)
lsposed_modules=$(grep -hE "$entry_pattern" "${pages[@]}" | grep -cE '`\[LSP\]`' || true)
all_module_entries=$(grep -hE "$entry_pattern" "${pages[@]}" | grep -cE '`\[(M|K|LSP|A)\]`' || true)
root_apps=$((all_entries - all_module_entries))

# Display
echo ""
echo -e "  ${GRAY}${RESET}  ${BOLD}${WHITE}📃 Apps & Modules Stats (docs)${RESET}              ${GRAY}${RESET}"
echo -e "  ${GRAY}------------------------------------+${RESET}"
echo -e "  ${GRAY}${RESET}  ${CYAN}Total Entries${RESET}         ${BOLD}${WHITE}${all_entries}${RESET}      ${GRAY}${RESET}"
echo -e "  ${GRAY}------------------------------------+${RESET}"
echo -e "  ${GRAY}${RESET}  ${BLUE}Root Apps${RESET}              ${BOLD}${WHITE}${root_apps}${RESET}      ${GRAY}${RESET}"
echo -e "  ${GRAY}${RESET}  ${ORANGE}Magisk Modules${RESET}        ${BOLD}${WHITE}${magisk_modules}${RESET}      ${GRAY}${RESET}"
echo -e "  ${GRAY}${RESET}  ${GREEN}KernelSU Modules${RESET}      ${BOLD}${WHITE}${kernelsu_modules}${RESET}      ${GRAY}${RESET}"
echo -e "  ${GRAY}${RESET}  ${PURPLE}LSPosed Modules${RESET}       ${BOLD}${WHITE}${lsposed_modules}${RESET}      ${GRAY}${RESET}"
echo ""
