import {
  INK, gridPaperSVG, warmBgSVG, doodleSub, blobCharSVG, girlSVG,
  cupSVG, beanSVG, cherrySVG, phinSVG, tagSVG, panelSVG, panelLabel,
  doodleSun, heartSVG, moonSVG, starSVG, zzzSVG, branchSVG, treeSVG,
  basketSVG, roasterSVG, machineSVG, layerGlassSVG, eggCupSVG,
  dripTowerSVG, stoolSVG, laptopSVG, brainSVG, clockSVG,
  tearSVG, trembleSVG, sweatSVG, titleTextSVG,
} from "./doodle.js";

// Video cà phê 5 phút: 30 cảnh × 10 giây = 300 giây.
// Nhân vật chính: hạt cà phê Bi — từ bông hoa trắng đến ly cà phê.
// Phong cách vẽ tay "画渣" (xem src/doodle.js). Mỗi cảnh là 1 tranh tĩnh,
// phụ đề là lời kể, căn đúng 10 giây / cảnh.
export const COFFEE_SCENES = [
  { id: 1, title: "Giới thiệu", dur: 10, sub: "Hôm nay, kể chuyện một hạt cà phê tên Bi." },
  { id: 2, title: "Bông hoa trắng", dur: 10, sub: "Bi sinh ra từ một bông hoa cà phê trắng." },
  { id: 3, title: "Quả chín", dur: 10, sub: "Quả xanh, rồi vàng, rồi đỏ mọng như cherry." },
  { id: 4, title: "Bi tỉnh dậy", dur: 10, sub: "Trong quả đỏ, Bi ngáp một cái rồi tỉnh dậy." },
  { id: 5, title: "Hái quả", dur: 10, sub: "Bác nông dân hái quả đỏ, bỏ vào giỏ tre." },
  { id: 6, title: "Tạm biệt cây", dur: 10, sub: "Bi vẫy tay chào cây: Tạm biệt nhé, cây ơi!" },
  { id: 7, title: "Phơi nắng", dur: 10, sub: "Quả được phơi nắng ba ngày cho khô giòn." },
  { id: 8, title: "Bi phơi nắng", dur: 10, sub: "Bi nằm phơi nắng, đeo kính râm, chờ khô." },
  { id: 9, title: "Ba người bạn", dur: 10, sub: "Bi gặp ba bạn: Arabica, Robusta, Liberica." },
  { id: 10, title: "Máy rang", dur: 10, sub: "Rồi Bi được cho vào máy rang, nóng ơi là nóng!" },
  { id: 11, title: "Hạt nổ", dur: 10, sub: "Bụp! Bụp! Hạt nổ giòn như bắp rang bơ." },
  { id: 12, title: "Xay bột", dur: 10, sub: "Ra khỏi máy rang, Bi bị xay thành bột mịn." },
  { id: 13, title: "Mùi thơm", dur: 10, sub: "Mùi thơm bay khắp nhà, ai ngửi cũng tỉnh." },
  { id: 14, title: "Pha phin", dur: 10, sub: "Phin nhỏ từng giọt, từng giọt, chậm mà chắc." },
  { id: 15, title: "Espresso", dur: 10, sub: "Máy espresso ép mạnh, lớp crema vàng óng." },
  { id: 16, title: "Latte art", dur: 10, sub: "Barista vẽ trái tim lên ly latte." },
  { id: 17, title: "Bạc xỉu", dur: 10, sub: "Bạc xỉu: sữa nhiều, cà phê ít, ngọt dịu." },
  { id: 18, title: "Cà phê trứng", dur: 10, sub: "Cà phê trứng: lòng đỏ đánh bông, béo ngậy." },
  { id: 19, title: "Cold brew", dur: 10, sub: "Cold brew: ủ lạnh 12 tiếng, mát rượi." },
  { id: 20, title: "Cà phê vỉa hè", dur: 10, sub: "Cà phê vỉa hè: ghế nhựa, chuyện đời." },
  { id: 21, title: "Ngồi bệt", dur: 10, sub: "Ngồi bệt vỉa hè, cà phê vẫn ngon như thường." },
  { id: 22, title: "Quán cóc, quán sang", dur: 10, sub: "Quán cóc hay quán sang, ngon là được." },
  { id: 23, title: "Cà phê thế giới", dur: 10, sub: "Người Ý uống espresso, người Thổ uống đặc." },
  { id: 24, title: "Đêm deadline", dur: 10, sub: "Đêm khuya, deadline dí, chỉ có cà phê cứu." },
  { id: 25, title: "Caffeine vào não", dur: 10, sub: "Caffeine chạy vào não, đuổi cơn buồn ngủ đi." },
  { id: 26, title: "4 ly là vừa", dur: 10, sub: "Một ngày 4 ly là vừa, ly thứ 5 thì thôi." },
  { id: 27, title: "Uống nhiều quá", dur: 10, sub: "Nhưng uống nhiều quá thì đêm nằm đếm cừu." },
  { id: 28, title: "Giờ vàng", dur: 10, sub: "Uống lúc 9 giờ sáng là tỉnh táo nhất." },
  { id: 29, title: "Bi thành cà phê", dur: 10, sub: "Cuối cùng Bi cũng thành một ly cà phê ngon." },
  { id: 30, title: "Kết", dur: 10, sub: "Uống vừa đủ — tỉnh táo cả ngày, ngon cả đời." },
];
export const COFFEE_DURATION = COFFEE_SCENES.reduce((s, c) => s + c.dur, 0); // 300
export const COFFEE_FRAME_COUNT = COFFEE_SCENES.length;

export function coffeeSceneAt(sec) {
  let acc = 0;
  for (let i = 0; i < COFFEE_SCENES.length; i++) {
    const sc = COFFEE_SCENES[i];
    if (sec < acc + sc.dur) return { scene: sc, index: i, progress: (sec - acc) / sc.dur, localT: sec - acc };
    acc += sc.dur;
  }
  const last = COFFEE_SCENES[COFFEE_SCENES.length - 1];
  return { scene: last, index: COFFEE_SCENES.length - 1, progress: 1, localT: last.dur };
}

// Cối xay tay (dùng ở cảnh 12).
function grinderSVG(cx, cy, s = 1) {
  return `<g>
    <rect x="${cx - 38 * s}" y="${cy - 40 * s}" width="76" height="70" rx="8" fill="#d9d9d9" stroke="${INK}" stroke-width="5"/>
    <path d="M${cx - 30 * s} ${cy - 40 * s} L${cx - 18 * s} ${cy - 72 * s} L${cx + 18 * s} ${cy - 72 * s} L${cx + 30 * s} ${cy - 40 * s} Z" fill="#efefef" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M${cx} ${cy - 72 * s} L${cx + 34 * s} ${cy - 92 * s}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="${cx + 34 * s}" cy="${cy - 92 * s}" r="8" fill="${INK}"/>
    <path d="M${cx - 38 * s} ${cy + 2 * s} L${cx + 38 * s} ${cy + 2 * s}" stroke="${INK}" stroke-width="3" opacity="0.5"/>
    <ellipse cx="${cx}" cy="${cy + 42 * s}" rx="52" ry="12" fill="#8a5a3b" stroke="${INK}" stroke-width="4"/>
    <circle cx="${cx - 18 * s}" cy="${cy + 32 * s}" r="3" fill="#5a3a24"/><circle cx="${cx + 10 * s}" cy="${cy + 36 * s}" r="3" fill="#5a3a24"/>
  </g>`;
}

const S = [];
// 1 — Giới thiệu: chữ tiêu đề lớn CÀ PHÊ sau lưng cô gái (kiểu ảnh gốc).
S[0] = () => `${warmBgSVG()}
  ${titleTextSVG("CÀ PHÊ", 480, 100, 96, "#ffffff", -2)}
  ${beanSVG(150, 150, 1.2, -25)}${beanSVG(810, 130, 1.1, 15)}${beanSVG(830, 320, 0.9, -10)}
  ${girlSVG(480, 470, { face: "cuoi", s: 1.05, cup: true })}`;
// 2 — Bông hoa trắng
S[1] = () => `${gridPaperSVG()}
  ${doodleSun(830, 110, 48)}
  ${branchSVG(480, 250, 1.5)}
  ${starSVG(180, 150, 1.2)}${starSVG(780, 300, 1)}`;
// 3 — Quả chín: xanh, vàng, đỏ
S[2] = () => {
  const fruit = (x, color, label) => `<circle cx="${x}" cy="250" r="55" fill="${color}" stroke="${INK}" stroke-width="6"/><path d="M${x} 195 Q${x + 6} 168 ${x + 22} 162" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M${x + 22} 162 Q${x + 44} 152 ${x + 48} 172 Q${x + 34} 180 ${x + 22} 162 Z" fill="#6db35a" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>${panelLabel(x, 350, label, 28)}`;
  return `${gridPaperSVG()}
  ${fruit(240, "#a9c46e", "xanh")}${fruit(480, "#f2c94c", "vàng")}${fruit(720, "#d94f3d", "đỏ")}
  <path d="M312 250 L366 250 M552 250 L606 250" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  <path d="M366 240 L392 250 L366 260 Z M606 240 L632 250 L606 260 Z" fill="${INK}"/>`;
};
// 4 — Bi tỉnh dậy trong quả đỏ
S[3] = () => `${gridPaperSVG()}
  ${cherrySVG(480, 330, 2.4)}
  ${blobCharSVG(480, 285, { color: "#c08a4e", r: 46, face: "met", seed: 4 })}
  ${zzzSVG(580, 190, 1.2)}`;
// 5 — Hái quả
S[4] = () => `${gridPaperSVG()}
  ${treeSVG(280, 430, 0.9)}
  ${basketSVG(700, 440, 1.15)}
  <circle cx="520" cy="300" r="11" fill="#d94f3d" stroke="${INK}" stroke-width="3.5"/><circle cx="570" cy="340" r="11" fill="#d94f3d" stroke="${INK}" stroke-width="3.5"/>
  <path d="M480 260 q20 14 30 30 M540 310 q16 10 22 22" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
// 6 — Tạm biệt cây
S[5] = () => `${gridPaperSVG()}
  ${treeSVG(250, 430, 0.9)}
  ${blobCharSVG(660, 430, { color: "#c08a4e", name: "Bi", face: "cuoi", seed: 4, wave: true })}`;
// 7 — Phơi nắng
S[6] = () => `${gridPaperSVG()}
  ${doodleSun(480, 120, 58)}
  <rect x="140" y="300" width="680" height="110" rx="12" fill="#e8d9a8" stroke="${INK}" stroke-width="5"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<circle cx="${200 + i * 82}" cy="330" r="14" fill="#d94f3d" stroke="${INK}" stroke-width="3.5"/>`).join("")}
  ${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${240 + i * 82}" cy="378" r="14" fill="#e0685a" stroke="${INK}" stroke-width="3.5"/>`).join("")}`;
// 8 — Bi phơi nắng, đeo kính râm
S[7] = () => `${gridPaperSVG()}
  ${doodleSun(800, 110, 52)}
  <rect x="300" y="400" width="360" height="34" rx="10" fill="#f2a0c0" stroke="${INK}" stroke-width="5"/>
  ${blobCharSVG(480, 400, { color: "#c08a4e", name: "Bi", face: "thuong", seed: 4, prop: "kinh" })}`;
// 9 — Ba người bạn
S[8] = () => {
  const label = (x, t) => panelLabel(x, 438, t, 26);
  return `${gridPaperSVG()}
  ${blobCharSVG(200, 400, { color: "#c08a4e", name: "Arabica", face: "cuoi", seed: 3, prop: "hoa" })}
  ${blobCharSVG(480, 400, { color: "#7a4a2b", name: "Robusta", face: "thuong", seed: 5, prop: "kinh" })}
  ${blobCharSVG(760, 400, { color: "#d9a05b", name: "Liberica", face: "ngac-nhien", seed: 9, prop: "la" })}
  ${label(200, "thơm")}${label(480, "đậm")}${label(760, "lạ")}`;
};
// 10 — Máy rang
S[9] = () => `${gridPaperSVG()}
  ${roasterSVG(480, 430, 1.25)}
  ${tagSVG(780, 150, "Nóng quá!")}
  ${starSVG(200, 160, 1.2)}${starSVG(240, 220, 0.9)}`;
// 11 — Hạt nổ
S[10] = () => `${gridPaperSVG()}
  ${titleTextSVG("BỤP! BỤP!", 480, 150, 64, "#ffffff", -3)}
  ${blobCharSVG(240, 400, { color: "#8a5a3b", r: 56, face: "ngac-nhien", seed: 12 })}
  ${blobCharSVG(480, 370, { color: "#a97a4f", r: 56, face: "cuoi", seed: 13 })}
  ${blobCharSVG(720, 400, { color: "#6b4226", r: 56, face: "ngac-nhien", seed: 14 })}
  ${starSVG(240, 280, 1.3)}${starSVG(480, 250, 1.1)}${starSVG(720, 280, 1.3)}${starSVG(350, 200, 0.9)}${starSVG(610, 200, 0.9)}`;
// 12 — Xay bột
S[11] = () => `${gridPaperSVG()}
  ${grinderSVG(480, 295, 1.8)}
  <ellipse cx="200" cy="432" rx="30" ry="6" fill="#000" opacity="0.12"/><ellipse cx="760" cy="432" rx="30" ry="6" fill="#000" opacity="0.12"/>
  ${beanSVG(200, 420, 1.1, -20)}${beanSVG(760, 420, 1.1, 15)}`;
// 13 — Mùi thơm
S[12] = () => `${warmBgSVG()}
  ${girlSVG(360, 470, { face: "cuoi", s: 1 })}
  <g transform="translate(700 465) scale(1.25)">${cupSVG(0, 0, { face: "cuoi" })}</g>
  <path d="M500 300 q14 -18 0 -36 q-14 -18 0 -34 M540 320 q14 -18 0 -36" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round" opacity="0.6"/>
  ${heartSVG(560, 160, 1)}`;
// 14 — Pha phin
S[13] = () => `${gridPaperSVG()}
  ${phinSVG(480, 320, 1.5)}
  <path d="M456 340 L504 340 L496 400 L464 400 Z" fill="#dff3ff" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>
  <path d="M460 372 L500 372 L496 400 L464 400 Z" fill="#6b4226"/>
  <path d="M480 328 q3 8 0 12" fill="none" stroke="#6b4226" stroke-width="4" stroke-linecap="round"/>
  ${beanSVG(180, 420, 1.1, -20)}${beanSVG(780, 420, 1.1, 15)}`;
// 15 — Espresso
S[14] = () => `${gridPaperSVG()}
  ${machineSVG(480, 440, 1.3)}
  ${starSVG(220, 160, 1.2)}${starSVG(740, 150, 1.1)}`;

// 16 — Latte art
S[15] = () => `${gridPaperSVG()}
  ${cupSVG(480, 440, { face: "cuoi", coffee: "#a97a4f" })}
  ${heartSVG(480, 300, 1.1)}
  <path d="M688 358 L742 358 L736 430 L694 430 Z" fill="#d9d9d9" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  <path d="M688 358 L700 344 L730 344 L742 358 Z" fill="#efefef" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M742 378 Q768 378 764 400 Q760 420 736 418" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
  ${tagSVG(480, 130, "Latte art")}`;
// 17 — Bạc xỉu
S[16] = () => `${gridPaperSVG()}
  ${layerGlassSVG(480, 440, 1.35)}
  ${tagSVG(480, 130, "Bạc xỉu")}
  ${beanSVG(180, 420, 1.1, -20)}${beanSVG(780, 420, 1.1, 15)}`;
// 18 — Cà phê trứng
S[17] = () => `${gridPaperSVG()}
  ${eggCupSVG(480, 440, 1.25)}
  ${tagSVG(480, 130, "Cà phê trứng")}
  <ellipse cx="230" cy="420" rx="34" ry="26" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="230" cy="420" r="13" fill="#f2c94c" stroke="${INK}" stroke-width="4"/>`;
// 19 — Cold brew
S[18] = () => `${gridPaperSVG()}
  ${dripTowerSVG(480, 450, 1.5)}
  ${tagSVG(480, 130, "Cold brew")}
  <rect x="180" y="400" width="22" height="22" rx="4" fill="#dff3ff" stroke="${INK}" stroke-width="3" transform="rotate(12 191 411)"/><rect x="740" y="410" width="22" height="22" rx="4" fill="#dff3ff" stroke="${INK}" stroke-width="3" transform="rotate(-10 751 421)"/>`;
// 20 — Cà phê vỉa hè
S[19] = () => `${gridPaperSVG()}
  <rect x="10" y="400" width="940" height="70" fill="#e8e0d0"/>
  <path d="M10 435 L950 435" stroke="#fff" stroke-width="6" stroke-dasharray="28 22"/>
  ${stoolSVG(230, 452, 1.2, "#4a90d9")}${stoolSVG(730, 452, 1.2, "#d94f3d")}
  ${cupSVG(380, 452, { face: "cuoi", steam: false })}${cupSVG(580, 452, { face: "thuong", steam: false })}
  ${tagSVG(480, 140, "Ngon quá!")}
  ${doodleSun(830, 100, 42)}`;
// 21 — Ngồi bệt
S[20] = () => `${gridPaperSVG()}
  <rect x="220" y="420" width="520" height="46" rx="10" fill="#e8b96f" stroke="${INK}" stroke-width="5"/>
  ${cupSVG(320, 420, { face: "cuoi", steam: false })}${cupSVG(480, 420, { face: "thuong", steam: false })}${cupSVG(640, 420, { face: "cuoi", steam: false })}
  ${tagSVG(480, 140, "Ngồi bệt!")}
  ${beanSVG(150, 430, 1, -15)}${beanSVG(810, 430, 1, 20)}`;
// 22 — Quán cóc, quán sang
S[21] = () => `${gridPaperSVG()}
  ${panelSVG(70, 110, 380, 240)}${panelSVG(510, 110, 380, 240)}
  ${stoolSVG(180, 330, 1.1, "#4a90d9")}${cupSVG(320, 330, { face: "cuoi", steam: false })}
  ${cupSVG(700, 330, { face: "cuoi" })}${starSVG(620, 170, 1.1)}${starSVG(790, 160, 1)}${starSVG(700, 140, 0.9)}
  ${panelLabel(260, 392, "Quán cóc", 28)}${panelLabel(700, 392, "Quán sang", 28)}`;
// 23 — Cà phê thế giới
S[22] = () => {
  const p = (x, name, note, cup) => `${panelSVG(x, 100, 260, 250)}${cup}${panelLabel(x + 130, 300, name, 28)}${panelLabel(x + 130, 332, note, 22)}`;
  return `${gridPaperSVG()}
  ${p(60, "Ý", "espresso", `<g transform="translate(190 220) scale(0.8)">${cupSVG(0, 0, { face: "cuoi", steam: false, coffee: "#3d2412" })}</g>`)}
  ${p(350, "Thổ", "đặc sánh", `<g transform="translate(480 220) scale(0.8)">${cupSVG(0, 0, { face: "thuong", steam: false, coffee: "#3d2412" })}</g>`)}
  ${p(640, "Ethiopia", "nghi lễ", `<g transform="translate(770 220) scale(0.8)">${cupSVG(0, 0, { face: "cuoi", steam: true, coffee: "#a97a4f" })}</g>`)}`;
};
// 24 — Đêm deadline: cô gái mệt, quầng thâm, 1 giọt nước mắt, vạch run.
S[23] = () => `${gridPaperSVG()}
  ${moonSVG(820, 110, 1.4)}${zzzSVG(700, 90, 0.9)}
  ${trembleSVG(250, 265, 125, 4, 3)}
  ${girlSVG(250, 465, { face: "met", s: 0.85 })}
  ${tearSVG(225, 292, 0.9)}${sweatSVG(318, 230, 0.9)}
  ${laptopSVG(620, 440, 1.1)}
  ${cupSVG(790, 440, { face: "met", steam: true })}`;
// 25 — Caffeine vào não
S[24] = () => `${gridPaperSVG()}
  ${brainSVG(240, 250, 1.15)}
  <path d="M330 250 L400 250" stroke="${INK}" stroke-width="5" stroke-linecap="round" stroke-dasharray="2 14"/>
  ${blobCharSVG(480, 420, { color: "#c08a4e", name: "Caffeine", face: "cuoi", seed: 16 })}
  ${blobCharSVG(760, 420, { color: "#9a9a9a", r: 52, face: "met", seed: 17 })}
  ${zzzSVG(800, 240, 1)}`;
// 26 — 4 ly là vừa
S[25] = () => `${gridPaperSVG()}
  ${[160, 350, 540, 730].map((x) => cupSVG(x, 420, { face: "cuoi" })).join("")}
  <g transform="translate(870 420) scale(0.8)" opacity="0.55">${cupSVG(0, 0, { face: "met", steam: false })}</g>
  <path d="M832 352 L908 428 M908 352 L832 428" stroke="#d94f3d" stroke-width="8" stroke-linecap="round"/>
  ${tagSVG(480, 130, "400mg / ngày")}`;
// 27 — Uống nhiều quá
S[26] = () => {
  const row = (y, icon, text) => `${panelSVG(580, y, 330, 118)}${icon}${panelLabel(712, y + 70, text, 26, "start")}`;
  const moon = `${moonSVG(628, 119, 1)}<text x="648" y="96" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="800" fill="${INK}">z</text>`;
  const heart = `${heartSVG(628, 262, 1.1)}<path d="M668 240 l14 -8 M670 262 l16 0 M668 284 l14 8" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
  const shaky = `<g transform="translate(618 420) scale(0.55)">${cupSVG(0, 0, { face: "met", steam: false })}</g><path d="M664 398 q10 -8 0 -18 M672 414 q10 -8 0 -18" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>`;
  return `${gridPaperSVG()}
  ${trembleSVG(300, 255, 130, 5, 5)}
  ${girlSVG(300, 470, { face: "met", s: 0.95 })}
  ${tearSVG(272, 274, 1)}${tearSVG(328, 274, 1)}
  ${row(60, moon, "Mất ngủ")}
  ${row(198, heart, "Tim đập nhanh")}
  ${row(336, shaky, "Run tay")}`;
};
// 28 — Giờ vàng 9 giờ sáng
S[27] = () => `${gridPaperSVG()}
  ${clockSVG(480, 240, 1.7, 9, 0)}
  ${doodleSun(830, 110, 46)}
  ${girlSVG(200, 470, { face: "cuoi", s: 0.8, cup: true })}
  ${tagSVG(700, 420, "9 giờ sáng")}`;
// 29 — Bi thành cà phê
S[28] = () => `${warmBgSVG()}
  ${blobCharSVG(330, 440, { color: "#c08a4e", name: "Bi", face: "cuoi", seed: 4, wave: true })}
  <g transform="translate(680 460) scale(1.25)">${cupSVG(0, 0, { face: "cuoi" })}</g>
  ${heartSVG(510, 150, 1.2)}${starSVG(200, 140, 1.1)}${starSVG(800, 280, 1)}`;
// 30 — Kết
S[29] = () => `${warmBgSVG()}
  ${doodleSun(820, 110)}
  ${heartSVG(560, 150, 1.1)}${beanSVG(120, 150, 1.2, -25)}${beanSVG(880, 320, 0.9, 15)}
  ${tagSVG(480, 110, "Hết")}
  ${girlSVG(350, 465, { face: "cuoi", s: 1, cup: true })}
  <g transform="translate(690 465) scale(1.25)">${cupSVG(0, 0, { face: "cuoi" })}</g>`;

export function renderCoffeeFrame(i) {
  const idx = Math.max(0, Math.min(COFFEE_FRAME_COUNT - 1, i));
  const f = COFFEE_SCENES[idx];
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540" role="img" aria-label="Cà phê cảnh ${f.id}: ${f.title}">
  ${S[idx]()}
  ${doodleSub(f.sub)}
</svg>`.trim();
}
