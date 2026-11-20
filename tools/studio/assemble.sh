#!/bin/bash
# assemble.sh — frames + SRT -> video dọc 540x960 (ffmpeg).
# Usage: ./assemble.sh <production.json> <out.mp4>
# Frames: <dir-của-production>/frames/frame-NN.png ; SRT: <dir-của-production>/subs.srt
# LƯU Ý phụ đề dọc: video cao 960 nên libass phóng chữ theo tỉ lệ 960/288 ≈ 3.33,
# đặt FontSize=9 trong force_style (tương đương ~30px thật).
set -e
cd "$(dirname "$0")"
PROD="$1"
OUT="$2"
PROD_DIR="$(dirname "$(readlink -f "$PROD")")"
FRAMES="$PROD_DIR/frames"
SRT="$PROD_DIR/subs.srt"

TOTAL=$(python3 - "$PROD" "$FRAMES" "$PROD_DIR" <<'EOF'
import json, sys, os
prod = json.load(open(sys.argv[1]))
framesdir = sys.argv[2]
proddir = sys.argv[3]
scenes = prod["scenes"]
missing = []
with open(os.path.join(proddir, "concat.txt"), "w") as f:
    for sc in scenes:
        n = f"{sc['n']:02d}"
        path = os.path.join(framesdir, f"frame-{n}.png")
        if not os.path.exists(path):
            missing.append(path)
        f.write(f"file '{path}'\n")
        f.write(f"duration {sc['t1'] - sc['t0']:.3f}\n")
    f.write(f"file '{os.path.join(framesdir, f'frame-{scenes[-1]['n']:02d}.png')}'\n")
if missing:
    print("MISSING FRAMES:", *missing[:5], file=sys.stderr)
    sys.exit(1)
total = round(sum(sc["t1"] - sc["t0"] for sc in scenes), 3)
print(total, file=sys.stderr)
print(total)
EOF
)

ffmpeg -y -t "$TOTAL" -f concat -safe 0 -i "$PROD_DIR/concat.txt" \
  -vf "subtitles=$SRT:force_style='FontName=DejaVu Sans,FontSize=9,Bold=1,PrimaryColour=&HFFFFFF&,OutlineColour=&H000000&,BorderStyle=1,Outline=2,Alignment=2,MarginV=40'" \
  -c:v libx264 -pix_fmt yuv420p -r 30 "$OUT"

ffprobe -v error -show_entries format=duration,size -of default=noprint_wrappers=1 "$OUT"
