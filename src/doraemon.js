// Doraemon — tập "Chong chóng tre", phong cách nét vẽ nghệch ngoạc, cute.
// Mọi nhân vật vẽ bằng code, nét chì hơi lệch, viền đôi mờ, hình đơn giản
// nhưng vẫn nhận ra ngay: Doraemon tròn xanh, mũi đỏ, chuông vàng, túi thần kỳ;
// Nobita áo vàng, kính tròn, tóc rối; Gian to áo cam; Shizuka váy hồng.
// Tọa độ local: chân ở y=0, đầu hướng lên (y âm), tâm x=0.

// Nhiễu giả ngẫu nhiên nhưng ổn định theo hạt — nét vẽ lệch giống tay vẽ.
const jhash = (n) => {
  const v = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return v - Math.floor(v);
};

// Hình tròn hơi méo: 8 điểm quanh tròn, bán kính lệch ±wob, nối bằng Q mượt.
export function wobCircle(cx, cy, r, seed = 1, wob = 3) {
  const pts = [];
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const rr = r + (jhash(seed * 10 + i) - 0.5) * 2 * wob;
    pts.push([cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * 0.92]);
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i <= 8; i++) {
    const p = pts[i % 8], q = pts[(i + 1) % 8];
    d += ` Q ${p[0].toFixed(1)} ${p[1].toFixed(1)} ${((p[0] + q[0]) / 2).toFixed(1)} ${((p[1] + q[1]) / 2).toFixed(1)}`;
  }
  return d + " Z";
}

// Vẽ một nét 2 lần: nét chính + nét mờ lệch nhẹ — cảm giác vẽ chì 2 lượt.
function sketch(d, fill, stroke = "#2b2b2b", w = 3.5) {
  return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${d}" fill="none" stroke="${stroke}" stroke-width="1.2" opacity="0.25" transform="translate(1.6 1.2)"/>`;
}

// Đường cong hơi run tay: Q với điểm điều khiển lệch nhẹ theo hạt.
function wobLine(x1, y1, cx, cy, x2, y2, seed = 1) {
  const jx = (jhash(seed) - 0.5) * 6, jy = (jhash(seed + 5) - 0.5) * 6;
  return `M${x1} ${y1} Q ${(cx + jx).toFixed(1)} ${(cy + jy).toFixed(1)} ${x2} ${y2}`;
}

// ---------- Doraemon ----------
// opts: { expression: "vui" | "hoang" | "cuoi", propeller: true/false, spin: góc quay cánh quạt, tilt: độ nghiêng }
export function doraemonSVG(cx, feetY, t = 0, opts = {}) {
  const { expression = "vui", propeller = false, handProp = false, spin = 0, tilt = 0 } = opts;
  const bob = Math.sin(t * 3) * 3;
  const mouth = expression === "hoang"
    ? `<ellipse cx="0" cy="-72" rx="10" ry="13" fill="#5b2b2b" stroke="#2b2b2b" stroke-width="2.5"/>`
    : expression === "cuoi"
      ? `<ellipse cx="0" cy="-70" rx="21" ry="14" fill="#7a2a2a" stroke="#2b2b2b" stroke-width="2.5"/><ellipse cx="0" cy="-63" rx="11" ry="6" fill="#f8a5a5"/>`
      : `<path d="${wobLine(-46, -90, 0, -58, 46, -90, 3)}" stroke="#2b2b2b" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  const eyes = expression === "hoang"
    ? `<ellipse cx="-20" cy="-138" rx="12" ry="20" fill="#fff" stroke="#2b2b2b" stroke-width="3"/><ellipse cx="20" cy="-138" rx="12" ry="20" fill="#fff" stroke="#2b2b2b" stroke-width="3"/><circle cx="-20" cy="-134" r="4" fill="#222"/><circle cx="20" cy="-134" r="4" fill="#222"/>`
    : `<ellipse cx="-20" cy="-138" rx="11" ry="18" fill="#fff" stroke="#2b2b2b" stroke-width="3"/><ellipse cx="20" cy="-138" rx="11" ry="18" fill="#fff" stroke="#2b2b2b" stroke-width="3"/><circle cx="-17" cy="-134" r="4.5" fill="#222"/><circle cx="23" cy="-134" r="4.5" fill="#222"/>`;
  const prop = propeller ? `<g transform="rotate(${spin.toFixed(0)} 0 -208)">
      <line x1="0" y1="-192" x2="0" y2="-208" stroke="#888" stroke-width="3" stroke-linecap="round"/>
      <g transform="translate(0 -210)"><ellipse cx="0" cy="0" rx="34" ry="6" fill="#ffd93d" stroke="#2b2b2b" stroke-width="2.5"/></g>
      <circle cx="0" cy="-210" r="5" fill="#f2a900" stroke="#2b2b2b" stroke-width="2"/>
    </g>` : "";
  return `<g data-char="doraemon" transform="translate(${cx} ${feetY + bob}) rotate(${tilt})">
    <ellipse cx="0" cy="8" rx="58" ry="8" fill="#000" opacity="0.15"/>
    ${sketch(wobCircle(0, -105, 78, 7), "#2ea3e6", "#1c5d8f")}
    <path d="${wobCircle(0, -92, 60, 11, 2.5)}" fill="#ffffff" stroke="#2b2b2b" stroke-width="3" stroke-linecap="round"/>
    ${eyes}
    <circle cx="0" cy="-110" r="13" fill="#e63946" stroke="#2b2b2b" stroke-width="3"/>
    <path d="M0 -97 L0 -78" stroke="#2b2b2b" stroke-width="3" stroke-linecap="round"/>
    ${mouth}
    <path d="${wobLine(-52, -118, -72, -112, -88, -100, 21)}" stroke="#2b2b2b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="${wobLine(-52, -104, -72, -100, -90, -88, 22)}" stroke="#2b2b2b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="${wobLine(52, -118, 72, -112, 88, -100, 23)}" stroke="#2b2b2b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="${wobLine(52, -104, 72, -100, 90, -88, 24)}" stroke="#2b2b2b" stroke-width="2.5" fill="none" stroke-linecap="round"/>
    <path d="${wobLine(-66, -96, -84, -70, -86, -52, 31)}" stroke="#2ea3e6" stroke-width="10" fill="none" stroke-linecap="round"/>
    <circle cx="-86" cy="-50" r="11" fill="#fff" stroke="#2b2b2b" stroke-width="3"/>
    <path d="${wobLine(66, -96, 84, -70, 86, -52, 32)}" stroke="#2ea3e6" stroke-width="10" fill="none" stroke-linecap="round"/>
    <circle cx="86" cy="-50" r="11" fill="#fff" stroke="#2b2b2b" stroke-width="3"/>
    <ellipse cx="0" cy="-52" rx="34" ry="20" fill="#fff" stroke="#2b2b2b" stroke-width="3"/>
    <path d="M-34 -52 Q 0 -66 34 -52" stroke="#2b2b2b" stroke-width="2.5" fill="none"/>
    <ellipse cx="-28" cy="-6" rx="18" ry="9" fill="#fff" stroke="#2b2b2b" stroke-width="3"/>
    <ellipse cx="28" cy="-6" rx="18" ry="9" fill="#fff" stroke="#2b2b2b" stroke-width="3"/>
    <circle cx="0" cy="-28" r="11" fill="#ffd93d" stroke="#2b2b2b" stroke-width="3"/>
    <line x1="-11" y1="-28" x2="11" y2="-28" stroke="#2b2b2b" stroke-width="2.5"/>
    <circle cx="0" cy="-22" r="2.5" fill="#2b2b2b"/>
    ${handProp ? `<g><line x1="86" y1="-58" x2="86" y2="-76" stroke="#888" stroke-width="3" stroke-linecap="round"/><ellipse cx="86" cy="-78" rx="20" ry="4.5" fill="#ffd93d" stroke="#2b2b2b" stroke-width="2.5"/><circle cx="86" cy="-78" r="4" fill="#f2a900" stroke="#2b2b2b" stroke-width="2"/></g>` : ""}
    ${prop}
  </g>`;
}

// ---------- Nobita ----------
// pose: "dung" | "chay" | "ngoi" | "bay"; expression: "vui" | "hoang" | "cuoi"
export function nobitaSVG(cx, feetY, t = 0, opts = {}) {
  const { expression = "vui", pose = "dung" } = opts;
  const bob = pose === "chay" ? Math.abs(Math.sin(t * 8)) * -6 : Math.sin(t * 3) * 2;
  const run = Math.sin(t * 10) * 12;
  const legs = pose === "chay"
    ? `<path d="M-10 -52 L ${(-16 + run).toFixed(0)} -6" stroke="#3a5a8c" stroke-width="9" stroke-linecap="round"/><path d="M10 -52 L ${(16 - run).toFixed(0)} -6" stroke="#3a5a8c" stroke-width="9" stroke-linecap="round"/><ellipse cx="${(-16 + run).toFixed(0)}" cy="-4" rx="10" ry="6" fill="#fff" stroke="#2b2b2b" stroke-width="2.5"/><ellipse cx="${(16 - run).toFixed(0)}" cy="-4" rx="10" ry="6" fill="#fff" stroke="#2b2b2b" stroke-width="2.5"/>`
    : pose === "ngoi"
      ? `<path d="M-10 -52 L -26 -14 L -6 -8" stroke="#3a5a8c" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 -52 L 26 -14 L 6 -8" stroke="#3a5a8c" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="-6" cy="-6" rx="10" ry="6" fill="#fff" stroke="#2b2b2b" stroke-width="2.5"/><ellipse cx="6" cy="-6" rx="10" ry="6" fill="#fff" stroke="#2b2b2b" stroke-width="2.5"/>`
      : pose === "bay"
        ? `<path d="M-10 -52 L -14 -10" stroke="#3a5a8c" stroke-width="9" stroke-linecap="round"/><path d="M10 -52 L 14 -10" stroke="#3a5a8c" stroke-width="9" stroke-linecap="round"/><ellipse cx="-14" cy="-6" rx="10" ry="6" fill="#fff" stroke="#2b2b2b" stroke-width="2.5"/><ellipse cx="14" cy="-6" rx="10" ry="6" fill="#fff" stroke="#2b2b2b" stroke-width="2.5"/>`
        : `<path d="M-10 -52 L -12 -8" stroke="#3a5a8c" stroke-width="9" stroke-linecap="round"/><path d="M10 -52 L 12 -8" stroke="#3a5a8c" stroke-width="9" stroke-linecap="round"/><ellipse cx="-12" cy="-4" rx="10" ry="6" fill="#fff" stroke="#2b2b2b" stroke-width="2.5"/><ellipse cx="12" cy="-4" rx="10" ry="6" fill="#fff" stroke="#2b2b2b" stroke-width="2.5"/>`;
  const arms = pose === "bay"
    ? `<path d="${wobLine(-24, -104, -40, -130, -34, -152, 41)}" stroke="#f2b234" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="-34" cy="-154" r="7" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="2.5"/><path d="${wobLine(24, -104, 40, -84, 44, -66, 42)}" stroke="#f2b234" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="44" cy="-64" r="7" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="2.5"/>`
    : pose === "chay"
      ? `<path d="M-24 -104 L ${(-38 - run * 0.5).toFixed(0)} -80" stroke="#f2b234" stroke-width="9" stroke-linecap="round"/><circle cx="${(-38 - run * 0.5).toFixed(0)}" cy="-78" r="7" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="2.5"/><path d="M24 -104 L ${(38 + run * 0.5).toFixed(0)} -80" stroke="#f2b234" stroke-width="9" stroke-linecap="round"/><circle cx="${(38 + run * 0.5).toFixed(0)}" cy="-78" r="7" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="2.5"/>`
      : `<path d="${wobLine(-24, -104, -34, -84, -32, -66, 43)}" stroke="#f2b234" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="-32" cy="-64" r="7" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="2.5"/><path d="${wobLine(24, -104, 34, -84, 32, -66, 44)}" stroke="#f2b234" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="32" cy="-64" r="7" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="2.5"/>`;
  const mouth = expression === "hoang"
    ? `<ellipse cx="0" cy="-128" rx="7" ry="9" fill="#5b2b2b" stroke="#2b2b2b" stroke-width="2"/>`
    : `<path d="${wobLine(-10, -130, 0, -122, 10, -130, 45)}" stroke="#2b2b2b" stroke-width="3" fill="none" stroke-linecap="round"/>`;
  const prop = pose === "bay" ? `<g transform="rotate(${(t * 540 % 360).toFixed(0)} 0 -196)">
      <line x1="0" y1="-182" x2="0" y2="-196" stroke="#888" stroke-width="3" stroke-linecap="round"/>
      <ellipse cx="0" cy="-198" rx="30" ry="5" fill="#ffd93d" stroke="#2b2b2b" stroke-width="2.5"/>
      <circle cx="0" cy="-198" r="4.5" fill="#f2a900" stroke="#2b2b2b" stroke-width="2"/>
    </g>` : "";
  return `<g data-char="nobita" transform="translate(${cx} ${feetY + bob})">
    <ellipse cx="0" cy="8" rx="44" ry="7" fill="#000" opacity="0.15"/>
    ${legs}
    <g transform="translate(0 ${pose === "ngoi" ? 30 : 0})">
    <path d="M-26 -112 L 26 -112 L 24 -52 L -24 -52 Z" fill="#f2b234" stroke="#2b2b2b" stroke-width="3.5" stroke-linejoin="round"/>
    ${arms}
    <circle cx="0" cy="-150" r="38" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="3.5"/>
    <path d="M-38 -158 Q -36 -192 0 -190 Q 36 -192 38 -158 Q 30 -172 18 -168 Q 24 -178 8 -176 Q 0 -186 -12 -176 Q -26 -180 -20 -168 Q -32 -172 -38 -158 Z" fill="#222" stroke="#2b2b2b" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="-14" cy="-150" r="13" fill="none" stroke="#2b2b2b" stroke-width="3"/>
    <circle cx="14" cy="-150" r="13" fill="none" stroke="#2b2b2b" stroke-width="3"/>
    <line x1="-1" y1="-150" x2="1" y2="-150" stroke="#2b2b2b" stroke-width="3"/>
    <circle cx="-14" cy="-149" r="3" fill="#222"/><circle cx="14" cy="-149" r="3" fill="#222"/>
    ${mouth}
    ${prop}
    </g>
  </g>`;
}

// ---------- Gian ----------
// To lớn, áo cam, tóc húi cua, lông mày xếch — pose: "chay" | "dung"
export function gianSVG(cx, feetY, t = 0, opts = {}) {
  const { pose = "dung" } = opts;
  const bob = pose === "chay" ? Math.abs(Math.sin(t * 8)) * -6 : Math.sin(t * 3) * 2;
  const run = Math.sin(t * 10) * 14;
  const legs = pose === "chay"
    ? `<path d="M-16 -62 L ${(-24 + run).toFixed(0)} -8" stroke="#4a4a4a" stroke-width="12" stroke-linecap="round"/><path d="M16 -62 L ${(24 - run).toFixed(0)} -8" stroke="#4a4a4a" stroke-width="12" stroke-linecap="round"/>`
    : `<path d="M-16 -62 L -18 -8" stroke="#4a4a4a" stroke-width="12" stroke-linecap="round"/><path d="M16 -62 L 18 -8" stroke="#4a4a4a" stroke-width="12" stroke-linecap="round"/>`;
  return `<g data-char="gian" transform="translate(${cx} ${feetY + bob})">
    <ellipse cx="0" cy="8" rx="56" ry="8" fill="#000" opacity="0.15"/>
    ${legs}
    <ellipse cx="-18" cy="-4" rx="13" ry="7" fill="#fff" stroke="#2b2b2b" stroke-width="2.5"/>
    <ellipse cx="18" cy="-4" rx="13" ry="7" fill="#fff" stroke="#2b2b2b" stroke-width="2.5"/>
    <path d="M-38 -132 L 38 -132 L 34 -62 L -34 -62 Z" fill="#e67e22" stroke="#2b2b2b" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M-38 -132 L -52 -100" stroke="#e67e22" stroke-width="11" stroke-linecap="round"/>
    <circle cx="-54" cy="-98" r="9" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="2.5"/>
    <path d="M38 -132 L 52 -100" stroke="#e67e22" stroke-width="11" stroke-linecap="round"/>
    <circle cx="54" cy="-98" r="9" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="2.5"/>
    <circle cx="0" cy="-172" r="44" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="3.5"/>
    <path d="M-44 -180 Q -40 -214 0 -212 Q 40 -214 44 -180 Q 20 -196 0 -194 Q -20 -196 -44 -180 Z" fill="#222" stroke="#2b2b2b" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M-30 -178 L -12 -172" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round"/>
    <path d="M30 -178 L 12 -172" stroke="#2b2b2b" stroke-width="4" stroke-linecap="round"/>
    <circle cx="-18" cy="-166" r="3.5" fill="#222"/><circle cx="18" cy="-166" r="3.5" fill="#222"/>
    <path d="${wobLine(-14, -148, 0, -138, 14, -148, 51)}" stroke="#2b2b2b" stroke-width="3.5" fill="none" stroke-linecap="round"/>
  </g>`;
}

// ---------- Shizuka ----------
// Váy hồng, tóc nâu búi hai bên, nơ đỏ — pose: "dung" | "vay" (vẫy tay)
export function shizukaSVG(cx, feetY, t = 0, opts = {}) {
  const { pose = "dung" } = opts;
  const bob = Math.sin(t * 3) * 2;
  const wave = pose === "vay" ? Math.sin(t * 6) * 10 : 0;
  const armR = pose === "vay"
    ? `<path d="${wobLine(24, -104, 44, -132, 40, -158, 61)}" stroke="#f8a5c2" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="${(40 + wave).toFixed(0)}" cy="-160" r="7" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="2.5"/>`
    : `<path d="${wobLine(24, -104, 34, -84, 32, -66, 62)}" stroke="#f8a5c2" stroke-width="9" fill="none" stroke-linecap="round"/><circle cx="32" cy="-64" r="7" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="2.5"/>`;
  return `<g data-char="shizuka" transform="translate(${cx} ${feetY + bob})">
    <ellipse cx="0" cy="8" rx="44" ry="7" fill="#000" opacity="0.15"/>
    <path d="M-10 -58 L -12 -8" stroke="#ffe0bd" stroke-width="9" stroke-linecap="round"/>
    <path d="M10 -58 L 12 -8" stroke="#ffe0bd" stroke-width="9" stroke-linecap="round"/>
    <ellipse cx="-12" cy="-4" rx="10" ry="6" fill="#e63946" stroke="#2b2b2b" stroke-width="2.5"/>
    <ellipse cx="12" cy="-4" rx="10" ry="6" fill="#e63946" stroke="#2b2b2b" stroke-width="2.5"/>
    <path d="M-26 -112 Q 0 -118 26 -112 L 34 -56 Q 0 -48 -34 -56 Z" fill="#f8a5c2" stroke="#2b2b2b" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="${wobLine(-24, -104, -34, -84, -32, -66, 63)}" stroke="#f8a5c2" stroke-width="9" fill="none" stroke-linecap="round"/>
    <circle cx="-32" cy="-64" r="7" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="2.5"/>
    ${armR}
    <circle cx="0" cy="-150" r="36" fill="#ffe0bd" stroke="#2b2b2b" stroke-width="3.5"/>
    <path d="M-36 -156 Q -34 -188 0 -186 Q 34 -188 36 -156 Q 26 -170 12 -166 Q 0 -172 -12 -166 Q -26 -170 -36 -156 Z" fill="#6b4226" stroke="#2b2b2b" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="-42" cy="-158" r="12" fill="#6b4226" stroke="#2b2b2b" stroke-width="2.5"/>
    <circle cx="42" cy="-158" r="12" fill="#6b4226" stroke="#2b2b2b" stroke-width="2.5"/>
    <path d="M-6 -186 L 6 -186 L 2 -176 L -2 -176 Z" fill="#e63946" stroke="#2b2b2b" stroke-width="2"/>
    <circle cx="-13" cy="-148" r="3" fill="#222"/><circle cx="13" cy="-148" r="3" fill="#222"/>
    <path d="M-8 -132 L -2 -128" stroke="#e63946" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M8 -132 L 2 -128" stroke="#e63946" stroke-width="2.5" stroke-linecap="round"/>
    <path d="${wobLine(-9, -132, 0, -124, 9, -132, 65)}" stroke="#2b2b2b" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>`;
}

// ---------- Bối cảnh ----------
// Thành phố nhìn từ trên cao: mái nhà nhỏ, đường, sông uốn — dùng cho cảnh bay.
export function townBelowSVG(t = 0) {
  const roofs = [];
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 7; c++) {
      const x = 20 + c * 135 + (r % 2) * 60, y = 384 + r * 42;
      const col = ["#d96a4a", "#4a90d9", "#7fb069", "#e8b64a"][((r * 7 + c) % 4)];
      roofs.push(`<g><rect x="${x}" y="${y}" width="86" height="38" fill="#fff3d6" stroke="#2b2b2b" stroke-width="2.5"/><path d="M${x - 6} ${y} L${x + 43} ${y - 22} L${x + 92} ${y} Z" fill="${col}" stroke="#2b2b2b" stroke-width="2.5"/></g>`);
    }
  }
  return `<g>
    <rect x="0" y="380" width="960" height="160" fill="#8fce6e"/>
    <path d="M0 470 Q 240 440 480 470 T 960 460 L 960 540 L 0 540 Z" fill="#7cc4e8"/>
    <path d="M0 500 L960 490" stroke="#fff" stroke-width="3" stroke-dasharray="30 20" opacity="0.6"/>
    ${roofs.join("")}
  </g>`;
}

// Phòng Nobita: tường vàng nhạt, sàn gỗ, cửa sổ, bàn học + ngăn kéo mở.
export function nobitaRoomSVG(t = 0) {
  return `<g>
    <rect x="0" y="0" width="960" height="380" fill="#ffeec2"/>
    <rect x="0" y="380" width="960" height="160" fill="#c98a4b"/>
    <rect x="0" y="374" width="960" height="8" fill="#8a5a3b"/>
    <g><rect x="90" y="70" width="150" height="160" fill="#bfe8ff" stroke="#2b2b2b" stroke-width="4"/><line x1="165" y1="70" x2="165" y2="230" stroke="#2b2b2b" stroke-width="3"/><line x1="90" y1="150" x2="240" y2="150" stroke="#2b2b2b" stroke-width="3"/><circle cx="200" cy="105" r="24" fill="#ffd93d" stroke="#f2a900" stroke-width="3"/></g>
    <rect x="330" y="120" width="90" height="110" fill="#fff" stroke="#2b2b2b" stroke-width="3" rx="6"/>
    <text x="375" y="160" text-anchor="middle" font-size="14" font-weight="bold" fill="#e63946">DORAEMON</text>
    <text x="375" y="190" text-anchor="middle" font-size="14" fill="#333">★ tập mới ★</text>
    <g>
      <rect x="600" y="330" width="280" height="16" fill="#8a5a3b" stroke="#2b2b2b" stroke-width="3"/>
      <rect x="615" y="346" width="14" height="124" fill="#8a5a3b" stroke="#2b2b2b" stroke-width="3"/>
      <rect x="850" y="346" width="14" height="124" fill="#8a5a3b" stroke="#2b2b2b" stroke-width="3"/>
      <rect x="640" y="346" width="200" height="52" fill="#a86a2e" stroke="#2b2b2b" stroke-width="3"/>
      <rect x="640" y="398" width="200" height="46" fill="#c98a4b" stroke="#2b2b2b" stroke-width="3"/>
      <rect x="660" y="356" width="160" height="32" fill="#8a5a3b" stroke="#2b2b2b" stroke-width="3"/>
      <circle cx="740" cy="372" r="5" fill="#ffd93d" stroke="#2b2b2b" stroke-width="2"/>
    </g>
  </g>`;
}

// Công viên: cỏ, đường, cây tròn, ghế đá, bụi hoa.
export function parkSVG(t = 0) {
  const sway = Math.sin(t * 1.4) * 4;
  return `<g>
    <rect x="0" y="380" width="960" height="160" fill="#8fce6e"/>
    <rect x="0" y="430" width="960" height="110" fill="#d9b48a"/>
    <g transform="rotate(${sway.toFixed(1)} 180 380)">
      <rect x="172" y="290" width="16" height="90" fill="#8a5a3b" stroke="#2b2b2b" stroke-width="3"/>
      <circle cx="180" cy="258" r="52" fill="#5da24a" stroke="#2b2b2b" stroke-width="3"/>
    </g>
    <g transform="rotate(${(-sway).toFixed(1)} 800 380)">
      <rect x="792" y="300" width="16" height="80" fill="#8a5a3b" stroke="#2b2b2b" stroke-width="3"/>
      <circle cx="800" cy="272" r="44" fill="#6db35a" stroke="#2b2b2b" stroke-width="3"/>
    </g>
    <rect x="620" y="400" width="120" height="18" fill="#b08968" stroke="#2b2b2b" stroke-width="3"/>
    <rect x="630" y="418" width="12" height="30" fill="#8a5a3b" stroke="#2b2b2b" stroke-width="2.5"/>
    <rect x="718" y="418" width="12" height="30" fill="#8a5a3b" stroke="#2b2b2b" stroke-width="2.5"/>
    <circle cx="90" cy="420" r="12" fill="#f8a5c2" stroke="#2b2b2b" stroke-width="2.5"/>
    <circle cx="120" cy="428" r="10" fill="#ffd93d" stroke="#2b2b2b" stroke-width="2.5"/>
    <circle cx="880" cy="424" r="11" fill="#e63946" stroke="#2b2b2b" stroke-width="2.5"/>
  </g>`;
}
