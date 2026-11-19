import {
  INK, gridPaperSVG, warmBgSVG, doodleSub, blobCharSVG, girlSVG,
  cupSVG, beanSVG, cherrySVG, phinSVG, tagSVG,
} from "./doodle.js";

// 6 khung hình tĩnh về cà phê, phong cách vẽ tay "画渣" (xem src/doodle.js).
// Chưa có chuyển động — làm ảnh trước, chuyển động thêm ở bước sau.
export const COFFEE_FRAMES = [
  { id: 1, title: "Giới thiệu", sub: "Cà phê — thứ nước khiến cả thế giới tỉnh táo." },
  { id: 2, title: "Ba loại hạt", sub: "Ba loại hạt nổi tiếng nhất thế giới." },
  { id: 3, title: "Quy trình", sub: "Từ quả chín đỏ đến ly cà phê thơm lừng." },
  { id: 4, title: "Ba món", sub: "Đen thì tỉnh, sữa thì ngọt, bạc xỉu thì nhẹ." },
  { id: 5, title: "Uống nhiều quá", sub: "Nhưng uống nhiều quá thì đêm nằm đếm cừu." },
  { id: 6, title: "Kết", sub: "Uống vừa đủ — tỉnh táo cả ngày, ngon cả đời." },
];
export const COFFEE_FRAME_COUNT = COFFEE_FRAMES.length;

function panelSVG(x, y, w, h) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
}
function panelLabel(x, y, text, size = 26, anchor = "middle") {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="800" fill="${INK}">${text}</text>`;
}
function doodleSun(cx, cy, r = 55) {
  let rays = "";
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * (r + 8), y1 = cy + Math.sin(a) * (r + 8);
    const x2 = cx + Math.cos(a) * (r + 26), y2 = cy + Math.sin(a) * (r + 26);
    rays += `<line x1="${x1.toFixed(0)}" y1="${y1.toFixed(0)}" x2="${x2.toFixed(0)}" y2="${y2.toFixed(0)}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
  }
  return `<g>${rays}<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f2c94c" stroke="${INK}" stroke-width="6"/><circle cx="${cx - 18}" cy="${cy - 8}" r="5" fill="${INK}"/><circle cx="${cx + 18}" cy="${cy - 8}" r="5" fill="${INK}"/><path d="M${cx - 16} ${cy + 14} Q${cx} ${cy + 28} ${cx + 16} ${cy + 14}" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>`;
}
function heartSVG(cx, cy, s = 1) {
  return `<path d="M${cx} ${cy + 18 * s} C${cx - 30 * s} ${cy - 6 * s} ${cx - 14 * s} ${cy - 26 * s} ${cx} ${cy - 8 * s} C${cx + 14 * s} ${cy - 26 * s} ${cx + 30 * s} ${cy - 6 * s} ${cx} ${cy + 18 * s} Z" fill="#d94f3d" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
}

function frame1() {
  return `${warmBgSVG()}
  ${beanSVG(150, 150, 1.2, -25)}${beanSVG(810, 130, 1.1, 15)}${beanSVG(830, 320, 0.9, -10)}
  ${girlSVG(480, 470, { face: "cuoi", s: 1.05, cup: true })}`;
}

function frame2() {
  const label = (x, t) => panelLabel(x, 438, t, 26);
  return `${gridPaperSVG()}
  ${blobCharSVG(200, 400, { color: "#c08a4e", name: "Arabica", face: "cuoi", seed: 3, prop: "hoa" })}
  ${blobCharSVG(480, 400, { color: "#7a4a2b", name: "Robusta", face: "thuong", seed: 5, prop: "kinh" })}
  ${blobCharSVG(760, 400, { color: "#d9a05b", name: "Liberica", face: "ngac-nhien", seed: 9, prop: "la" })}
  ${label(200, "thơm")}${label(480, "đậm")}${label(760, "lạ")}`;
}

function frame3() {
  const panels = [
    { x: 60, label: "Hái quả chín" },
    { x: 270, label: "Rang hạt" },
    { x: 480, label: "Xay bột" },
    { x: 690, label: "Pha phin" },
  ];
  const cx = (x) => x + 100;
  const roast = `<ellipse cx="${cx(270)}" cy="250" rx="72" ry="15" fill="#8a5a3b" stroke="${INK}" stroke-width="5"/><line x1="${cx(270) + 70}" y1="250" x2="${cx(270) + 108}" y2="228" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>${beanSVG(cx(270) - 28, 232, 0.75, -20)}${beanSVG(cx(270) + 8, 228, 0.75, 10)}${beanSVG(cx(270) + 38, 236, 0.7, -30)}<path d="M${cx(270) - 40} 300 q8 -12 0 -20 M${cx(270)} 306 q8 -12 0 -20 M${cx(270) + 40} 300 q8 -12 0 -20" fill="none" stroke="#e07a3f" stroke-width="5" stroke-linecap="round"/>`;
  const grinder = `<rect x="${cx(480) - 38}" y="190" width="76" height="70" rx="8" fill="#d9d9d9" stroke="${INK}" stroke-width="5"/><path d="M${cx(480) - 30} 190 L${cx(480) - 18} 158 L${cx(480) + 18} 158 L${cx(480) + 30} 190 Z" fill="#efefef" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M${cx(480)} 158 L${cx(480) + 34} 138" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><circle cx="${cx(480) + 34}" cy="138" r="8" fill="${INK}"/><path d="M${cx(480) - 38} 232 L${cx(480) + 38} 232" stroke="${INK}" stroke-width="3" opacity="0.5"/><ellipse cx="${cx(480)}" cy="282" rx="52" ry="12" fill="#8a5a3b" stroke="${INK}" stroke-width="4"/><circle cx="${cx(480) - 18}" cy="272" r="3" fill="#5a3a24"/><circle cx="${cx(480) + 10}" cy="276" r="3" fill="#5a3a24"/>`;
  const brew = `${phinSVG(cx(690), 210, 0.75)}<path d="M${cx(690) - 26} 228 L${cx(690) + 26} 228 L${cx(690) + 18} 268 L${cx(690) - 18} 268 Z" fill="#dff3ff" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/><path d="M${cx(690) - 22} 246 L${cx(690) + 22} 246 L${cx(690) + 19} 268 L${cx(690) - 19} 268 Z" fill="#6b4226"/>`;
  return `${gridPaperSVG()}
  ${panels.map((p) => panelSVG(p.x, 90, 200, 240) + panelLabel(p.x + 100, 372, p.label, 26)).join("")}
  ${cherrySVG(cx(60), 215, 1.5)}
  ${roast}${grinder}${brew}`;
}

function frame4() {
  const cup = (x, name, coffee, face) =>
    `${tagSVG(x, 200, name)}${cupSVG(x, 420, { face, coffee })}${beanSVG(x + 88, 408, 0.85, 20)}`;
  return `${gridPaperSVG()}
  ${cup(200, "Đen đá", "#3d2412", "thuong")}
  ${cup(480, "Sữa đá", "#a97a4f", "cuoi")}
  ${cup(760, "Bạc xỉu", "#d9b98c", "cuoi")}`;
}

function frame5() {
  const row = (y, icon, text) => `${panelSVG(580, y, 330, 118)}${icon}${panelLabel(712, y + 70, text, 26, "start")}`;
  const moon = `<path d="M628 88 a26 26 0 1 0 10 44 a20 20 0 1 1 -10 -44 Z" fill="#f2c94c" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><text x="648" y="96" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="800" fill="${INK}">z</text>`;
  const heart = `${heartSVG(628, 262, 1.1)}<path d="M668 240 l14 -8 M670 262 l16 0 M668 284 l14 8" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
  const shaky = `<g transform="translate(618 420) scale(0.55)">${cupSVG(0, 0, { face: "met", steam: false })}</g><path d="M664 398 q10 -8 0 -18 M672 414 q10 -8 0 -18" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
  return `${gridPaperSVG()}
  ${girlSVG(300, 470, { face: "met", s: 0.95 })}
  ${row(60, moon, "Mất ngủ")}
  ${row(198, heart, "Tim đập nhanh")}
  ${row(336, shaky, "Run tay")}`;
}

function frame6() {
  return `${warmBgSVG()}
  ${doodleSun(820, 110)}
  ${heartSVG(560, 150, 1.1)}${beanSVG(120, 150, 1.2, -25)}${beanSVG(880, 320, 0.9, 15)}
  ${girlSVG(350, 465, { face: "cuoi", s: 1, cup: true })}
  <g transform="translate(690 465) scale(1.25)">${cupSVG(0, 0, { face: "cuoi" })}</g>`;
}

const FRAMES = [frame1, frame2, frame3, frame4, frame5, frame6];

export function renderCoffeeFrame(i) {
  const idx = Math.max(0, Math.min(COFFEE_FRAME_COUNT - 1, i));
  const f = COFFEE_FRAMES[idx];
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540" role="img" aria-label="Cà phê khung ${f.id}: ${f.title}">
  ${FRAMES[idx]()}
  ${doodleSub(f.sub)}
</svg>`.trim();
}
