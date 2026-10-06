#!/usr/bin/env bash
#
# Optimizes the static assets in docs/public.
#
# This is a maintenance script, not part of the build: run it after adding or
# replacing an image, then commit the result. It is idempotent - running it on
# already optimized files produces identical bytes.
#
# What it does:
#   SVG               svgo (see scripts/svgo.config.mjs), ids and the inline
#                     light/dark <style> block are preserved
#   OG card PNGs      requantized to a 64 colour palette without dithering,
#                     then losslessly recompressed with oxipng. The source
#                     cards are flat graphics saved with heavy dithering, which
#                     costs several hundred kB per file and is invisible at the
#                     sizes social networks render. Format, dimensions and file
#                     names are unchanged so Open Graph consumers keep working.
#   Other PNGs        oxipng only (lossless, pixel identical)
#
# docs/public/images/og.png is deliberately skipped: it is the primary social
# card and contains smooth gradients where requantization is visible.
#
# Requirements: ImageMagick (`convert`) and Node.js (`npx`).

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PUBLIC_DIR="$ROOT_DIR/docs/public"
OXIPNG="npx --yes oxipng@1"
SVGO="npx --yes svgo@3"

command -v convert >/dev/null || { echo "ImageMagick 'convert' is required" >&2; exit 1; }
command -v npx >/dev/null || { echo "npx (Node.js) is required" >&2; exit 1; }

size() { stat -c%s "$1"; }

echo "==> SVG"
$SVGO --config "$ROOT_DIR/scripts/svgo.config.mjs" --quiet \
  "$PUBLIC_DIR/favicon.svg" -o "$PUBLIC_DIR/favicon.svg"
$SVGO --config "$ROOT_DIR/scripts/svgo.config.mjs" --quiet \
  -f "$PUBLIC_DIR/images" -o "$PUBLIC_DIR/images"

echo "==> Open Graph cards (docs/public/images/og)"
for file in "$PUBLIC_DIR"/images/og/*.png; do
  before=$(size "$file")
  # Skip requantization when the card is already within the palette budget:
  # re-running it would slowly drift the colours without saving bytes.
  colors=$(identify -format %k "$file")
  if [ "$colors" -gt 64 ]; then
    convert "$file" -strip -dither None -colors 64 "$file"
  fi
  $OXIPNG --quiet -o max --strip safe "$file"
  printf '    %-28s %8s -> %8s bytes\n' "$(basename "$file")" "$before" "$(size "$file")"
done

echo "==> Other PNGs (lossless)"
for file in "$PUBLIC_DIR"/favicon-96x96.png \
            "$PUBLIC_DIR"/images/apple-touch-icon.png \
            "$PUBLIC_DIR"/images/logo.png \
            "$PUBLIC_DIR"/images/logo_dark.png \
            "$PUBLIC_DIR"/images/og.png \
            "$PUBLIC_DIR"/images/web-app-manifest-*.png; do
  [ -f "$file" ] || continue
  before=$(size "$file")
  $OXIPNG --quiet -o max --strip safe "$file"
  printf '    %-28s %8s -> %8s bytes\n' "$(basename "$file")" "$before" "$(size "$file")"
done

echo "Done. Review 'git diff --stat' and spot-check the images before committing."
