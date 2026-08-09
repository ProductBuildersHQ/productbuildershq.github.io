#!/usr/bin/env bash
#
# build-pdfs.sh — generate branded PDFs for every framework and case study by
# rendering the built site pages with dss-render (headless Chrome).
#
# The PDF is a faithful print of the live page: styling comes from the site's
# own @media print rules in src/styles/global.css, so there is no separate
# template to maintain. Output lands in apps/web/public/papers/<slug>.pdf and is
# copied into docs/papers/ by the final rebuild.
#
# Usage:
#   scripts/build-pdfs.sh
#
# Env overrides:
#   DSS_RENDER_DIR  path to the dss-render module (default: ~/go/src/github.com/plexusone/dss-render)
#   PORT            local static-server port (default: 8781)
#   RENDER_WAIT     settle delay before printing (default: 500ms)

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DSS_RENDER_DIR="${DSS_RENDER_DIR:-$HOME/go/src/github.com/plexusone/dss-render}"
PORT="${PORT:-8781}"
RENDER_WAIT="${RENDER_WAIT:-500ms}"

PAPERS_DIR="$REPO_ROOT/apps/web/public/papers"
DOCS_DIR="$REPO_ROOT/docs"
BASE_URL="http://127.0.0.1:$PORT"

log() { printf '\033[0;36m==>\033[0m %s\n' "$*"; }

# --- preflight ---------------------------------------------------------------
if [ ! -d "$DSS_RENDER_DIR" ]; then
  echo "error: dss-render not found at $DSS_RENDER_DIR (set DSS_RENDER_DIR)" >&2
  exit 1
fi

BIN_DIR="$(mktemp -d)"
DSS_RENDER="$BIN_DIR/dss-render"
cleanup() {
  [ -n "${SERVER_PID:-}" ] && kill "$SERVER_PID" 2>/dev/null || true
  rm -rf "$BIN_DIR"
}
trap cleanup EXIT

log "Building dss-render from $DSS_RENDER_DIR"
( cd "$DSS_RENDER_DIR" && go build -o "$DSS_RENDER" ./cmd/dss-render )

# --- build the site ----------------------------------------------------------
log "Building the site"
( cd "$REPO_ROOT" && npm run build >/dev/null )

# --- serve docs/ -------------------------------------------------------------
log "Serving $DOCS_DIR at $BASE_URL"
( cd "$DOCS_DIR" && python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 ) &
SERVER_PID=$!

# wait for readiness
for _ in $(seq 1 40); do
  if curl -sf -o /dev/null "$BASE_URL/index.html"; then break; fi
  sleep 0.25
done

mkdir -p "$PAPERS_DIR"

# --- render each framework and case study ------------------------------------
render_section() {
  local section="$1" # frameworks | case-studies
  [ -d "$DOCS_DIR/$section" ] || return 0
  for dir in "$DOCS_DIR/$section"/*/; do
    [ -f "${dir}index.html" ] || continue
    local slug
    slug="$(basename "$dir")"
    local out="$PAPERS_DIR/$slug.pdf"
    log "Rendering $section/$slug"
    "$DSS_RENDER" render \
      --engine chrome \
      --url "$BASE_URL/$section/$slug/index.html" \
      --wait "$RENDER_WAIT" \
      --out "$out"
  done
}

render_section "frameworks"
render_section "case-studies"

# --- rebuild so docs/papers/ includes the freshly generated PDFs -------------
log "Rebuilding to embed PDFs into docs/"
( cd "$REPO_ROOT" && npm run build >/dev/null )

log "Done. PDFs in $PAPERS_DIR"
ls -1 "$PAPERS_DIR"
