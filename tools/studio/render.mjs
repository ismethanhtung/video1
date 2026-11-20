// render.mjs — đọc production.json, vẽ từng cảnh thành PNG 540x960.
// Usage: node render.mjs <production.json>
// Ghi: <dir-của-production>/frames/frame-NN.png + <dir-của-production>/subs.srt
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { createRequire } from "node:module";
// @resvg lives in the shared render-check install; resolve from there.
const require = createRequire("/home/hatch/workspace/.render-check/");
const { Resvg } = require("@resvg/resvg-js");
import * as S from "./stick.js";

const prodPath = resolve(process.argv[2]);
const prodDir = dirname(prodPath);
const outDir = join(prodDir, "frames");
mkdirSync(outDir, { recursive: true });

const prod = JSON.parse(readFileSync(prodPath, "utf8"));
const scenes = prod.scenes;

const BG = {
  bgNYCday: S.bgNYCday, bgTokyoNight: S.bgTokyoNight, bgOffice: S.bgOffice,
  bgGrandma: S.bgGrandma, bgSushi: S.bgSushi, bgSplit: S.bgSplit,
  bgBlueprint: S.bgBlueprint, bgGraveyard: S.bgGraveyard,
  bgNightRain: S.bgNightRain, bgDark: S.bgDark,
};
const FN = {
  pod: S.pod, counterBoard: S.counterBoard, idCard: S.idCard,
  phoneRating: S.phoneRating, photoWall: S.photoWall, taxi: S.taxi,
  tree: S.tree, bench: S.bench, moon: S.moon,
};

// Tiêu đề: co chữ lại nếu ước lượng vượt quá khung (tránh chữ tràn).
function fitTitle(t) {
  const MAX_W = 510, FACTOR = 0.58;
  let size = t.size;
  const est = t.text.length * size * FACTOR;
  if (est > MAX_W) size = Math.floor((size * MAX_W) / est);
  const fill = t.text === "DELETE" ? "#d94f3d" : "#ffffff";
  return S.title(t.text, t.x, t.y, size, fill);
}

for (const sc of scenes) {
  const bg = BG[sc.setting]();
  const props = (sc.props || []).map((p) => FN[p.fn](...p.args)).join("");
  const chars = (sc.chars || [])
    .map((c) => S.char(c.who, c.x, c.y, { expr: c.expr, pose: c.pose, s: c.s }))
    .join("");
  const title = sc.title ? fitTitle(sc.title) : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 960" width="540" height="960">${bg}${props}${chars}${title}</svg>`;
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 540 } }).render().asPng();
  writeFileSync(join(outDir, `frame-${String(sc.n).padStart(2, "0")}.png`), png);
}
console.log("rendered", scenes.length, "frames ->", outDir);

// SRT từ lời thoại các cảnh.
const fmt = (t) => {
  const h = String(Math.floor(t / 3600)).padStart(2, "0");
  const m = String(Math.floor(t / 60) % 60).padStart(2, "0");
  const s = String(Math.floor(t) % 60).padStart(2, "0");
  const ms = String(Math.round((t % 1) * 1000)).padStart(3, "0");
  return `${h}:${m}:${s},${ms}`;
};
let srt = "";
scenes.forEach((sc, i) => {
  srt += `${i + 1}\n${fmt(sc.t0)} --> ${fmt(sc.t1)}\n${sc.sub}\n\n`;
});
writeFileSync(join(prodDir, "subs.srt"), srt);
console.log("wrote subs.srt", scenes.length, "entries");
