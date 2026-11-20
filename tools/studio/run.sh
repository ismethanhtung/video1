#!/bin/bash
# run.sh — pipeline đầy đủ: render frames từ production.json rồi ghép thành video.
# Usage: ./run.sh <production.json> <out.mp4>
set -e
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"
PROD="$1"
OUT="$2"
if [ -z "$PROD" ] || [ -z "$OUT" ]; then
  echo "Usage: $0 <production.json> <out.mp4>" >&2
  exit 1
fi
node "$SCRIPT_DIR/render.mjs" "$PROD"
bash "$SCRIPT_DIR/assemble.sh" "$PROD" "$OUT"
