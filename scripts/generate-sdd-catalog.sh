#!/usr/bin/env bash
#
# generate-sdd-catalog.sh — regenerate the SDD catalog data from the
# visionspec library (specification-workflow-spec merged into it in v0.16.0).
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
#   VISIONSPEC_DIR  path to the visionspec repo
#                    (default: sibling checkout under the same org directory)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VISIONSPEC_DIR="${VISIONSPEC_DIR:-$(dirname "$REPO_ROOT")/visionspec}"
OUT="$REPO_ROOT/apps/web/src/data/sdd-catalog.json"

if [ ! -d "$VISIONSPEC_DIR" ]; then
  echo "error: visionspec not found at $VISIONSPEC_DIR (set VISIONSPEC_DIR)" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUT")"
( cd "$VISIONSPEC_DIR" && go run ./cmd/catalog -o "$OUT" )
echo "wrote $OUT ($(wc -c < "$OUT" | tr -d ' ') bytes)"
