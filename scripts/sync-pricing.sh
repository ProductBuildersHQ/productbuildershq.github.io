#!/usr/bin/env bash
# Copies the suite's pricing spec into the site. The spec is owned by the product;
# this site only renders a copy of it.
#
#   scripts/sync-pricing.sh path/to/pricing.json
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "usage: $0 path/to/pricing.json" >&2
  exit 2
fi
src="$1"
here="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
dst="$here/apps/web/src/data/pricing.json"

if [[ ! -f "$src" ]]; then
  echo "pricing spec not found: $src" >&2
  exit 1
fi
cp "$src" "$dst"
echo "copied $src -> $dst"
