#!/bin/bash

grep -E '^\s*-\s+\*\*\[.*\]\(.*\)\*\*' README.md | wc -l