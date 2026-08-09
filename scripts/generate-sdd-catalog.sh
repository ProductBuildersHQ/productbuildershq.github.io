#!/usr/bin/env bash
#
# generate-sdd-catalog.sh — regenerate the SDD catalog data from the
# specification-workflow-spec library.
#
# The catalog (spec types, definition workflows, execution-tool integrations,
# and pipelines) is the single source of truth for the /sdd/* pages and the
# navigation megamenu. Never edit sdd-catalog.json by hand; change the library
# and re-run this script.
#
# Usage:
#   scripts/generate-sdd-catalog.sh
#
# Env overrides:
#   SWF_DIR  path to the specification-workflow-spec repo
#            (default: sibling checkout under the same org directory)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SWF_DIR="${SWF_DIR:-$(dirname "$REPO_ROOT")/specification-workflow-spec}"
OUT="$REPO_ROOT/apps/web/src/data/sdd-catalog.json"

if [ ! -d "$SWF_DIR" ]; then
  echo "error: specification-workflow-spec not found at $SWF_DIR (set SWF_DIR)" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUT")"
( cd "$SWF_DIR" && go run ./cmd/catalog -o "$OUT" )
echo "wrote $OUT ($(wc -c < "$OUT" | tr -d ' ') bytes)"
