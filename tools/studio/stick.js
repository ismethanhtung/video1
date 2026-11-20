// stick.js — toolkit vẽ SVG nhân vật que + bối cảnh cho video dọc 540x960.
// Phong cách: nhân vật que đơn giản, đầu tròn trắng, tay chân que đen mảnh,
// màu phẳng, viền nâu sẫm INK #3b2a1a. Nhân vật An GIỮ NGUYÊN tạo hình
// ở mọi cảnh: áo tím, tóc nâu nhọn.
import { titleTextSVG } from "../../src/doodle.js";

export const INK = "#3b2a1a";
export const W = 540;
export const H = 960;

// ---------------------------------------------------------------- nhân vật
const SHIRT = { an: "#8e6ba8", friend: "#f2c94c", grandma: "#e8833a" };
const HAIR = { an: "#8a5a2a", friend: "#f2c94c", grandma: "#e8e0d0" };

function face(hx, hy, expr) {
  // hx, hy: tâm đầu; r = 30. Mắt ở y = hy - 6, miệng ở y = hy + 12.
  let s = "";
  // má hồng (mọi biểu cảm, nhạt)
  s += `<ellipse cx="${hx - 18}" cy="${hy + 4}" rx="5" ry="3" fill="#f2a0a0" opacity="0.7"/>`;
  s += `<ellipse cx="${hx + 18}" cy="${hy + 4}" rx="5" ry="3" fill="#f2a0a0" opacity="0.7"/>`;
  if (expr === "scared") {
    s += `<circle cx="${hx - 11}" cy="${hy - 6}" r="7" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
    s += `<circle cx="${hx + 11}" cy="${hy - 6}" r="7" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`;
    s += `<circle cx="${hx - 11}" cy="${hy - 6}" r="3" fill="${INK}"/>`;
    s += `<circle cx="${hx + 11}" cy="${hy - 6}" r="3" fill="${INK}"/>`;
    s += `<ellipse cx="${hx}" cy="${hy + 13}" rx="7" ry="10" fill="#7a2a1a" stroke="${INK}" stroke-width="3"/>`;
  } else {
    const ey = expr === "thinking" ? hy - 9 : hy - 6;
    s += `<circle cx="${hx - 11}" cy="${ey}" r="3.5" fill="${INK}"/>`;
    s += `<circle cx="${hx + 11}" cy="${ey}" r="3.5" fill="${INK}"/>`;
    if (expr === "worried") {
      // lông mày nhíu: đầu trong thấp xuống
      s += `<path d="M${hx - 17} ${hy - 17} L${hx - 5} ${hy - 13}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
      s += `<path d="M${hx + 17} ${hy - 17} L${hx + 5} ${hy - 13}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
      s += `<path d="M${hx - 10} ${hy + 12} Q${hx - 5} ${hy + 8} ${hx} ${hy + 12} Q${hx + 5} ${hy + 16} ${hx + 10} ${hy + 12}" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
    } else if (expr === "smile") {
      s += `<path d="M${hx - 10} ${hy + 10} Q${hx} ${hy + 20} ${hx + 10} ${hy + 10}" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`;
    } else if (expr === "thinking") {
      s += `<path d="M${hx - 6} ${hy + 12} H${hx + 6}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
    } else {
      // neutral
      s += `<path d="M${hx - 9} ${hy + 12} H${hx + 9}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`;
    }
  }
  return s;
}

function hair(who, hx, hy) {
  // hy: tâm đầu, r = 30. Tóc vẽ đè lên nửa trên đầu.
  if (who === "an") {
    // tóc nâu nhọn: 5 gai
    return `<path d="M${hx - 31} ${hy - 8} L${hx - 28} ${hy - 34} L${hx - 18} ${hy - 18} L${hx - 12} ${hy - 44} L${hx - 2} ${hy - 20} L${hx + 6} ${hy - 46} L${hx + 12} ${hy - 20} L${hx + 22} ${hy - 38} L${hx + 26} ${hy - 16} L${hx + 31} ${hy - 8} Q${hx + 30} ${hy - 26} ${hx} ${hy - 28} Q${hx - 30} ${hy - 26} ${hx - 31} ${hy - 8} Z" fill="${HAIR.an}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
  }
  if (who === "friend") {
    // mũ vàng: vòm + vành
    return `<g><path d="M${hx - 31} ${hy - 6} A31 31 0 0 1 ${hx + 31} ${hy - 6} L${hx + 31} ${hy - 12} A31 31 0 0 0 ${hx - 31} ${hy - 12} Z" fill="${HAIR.friend}" stroke="${INK}" stroke-width="3"/><ellipse cx="${hx + 18}" cy="${hy - 6}" rx="15" ry="5" fill="${HAIR.friend}" stroke="${INK}" stroke-width="3"/></g>`;
  }
  // grandma: tóc búi trắng
  return `<g><path d="M${hx - 30} ${hy - 4} A30 30 0 0 1 ${hx + 30} ${hy - 4} L${hx + 30} ${hy - 10} A30 30 0 0 0 ${hx - 30} ${hy - 10} Z" fill="${HAIR.grandma}" stroke="${INK}" stroke-width="3"/><circle cx="${hx}" cy="${hy - 36}" r="13" fill="${HAIR.grandma}" stroke="${INK}" stroke-width="3"/></g>`;
}

// char(who, cx, feetY, o) — o = {expr, pose, s}. Cao ~230px ở s=1, chân đúng feetY.
export function char(who, cx, feetY, o = {}) {
  const expr = o.expr || "smile";
  const pose = o.pose || "stand";
  const s = o.s || 1;
  const shirt = SHIRT[who] || SHIRT.an;
  // tọa độ cục bộ, gốc ở (cx, feetY), nhân s.
  const L = (x, y) => `${(cx + x * s).toFixed(1)} ${(feetY + y * s).toFixed(1)}`;
  const P = (pts) => pts.map(([x, y]) => L(x, y)).join(" ");
  let g = "";
  // bóng dưới chân
  g += `<ellipse cx="${cx}" cy="${feetY + 4 * s}" rx="${46 * s}" ry="${8 * s}" fill="#000" opacity="0.12"/>`;
  // ---- chân
  if (pose === "sit") {
    // ngồi: đùi ngang, cẳng chân dọc xuống, bàn chân chạm đất
    g += `<path d="M${L(0, -62)} L${L(38, -30)} L${L(38, 0)}" fill="none" stroke="${INK}" stroke-width="${6 * s}" stroke-linecap="round" stroke-linejoin="round"/>`;
    g += `<path d="M${L(-4, -62)} L${L(30, -28)} L${L(30, 0)}" fill="none" stroke="${INK}" stroke-width="${6 * s}" stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>`;
  } else if (pose === "walk") {
    g += `<path d="M${L(0, -95)} L${L(28, 0)}" fill="none" stroke="${INK}" stroke-width="${6 * s}" stroke-linecap="round"/>`;
    g += `<path d="M${L(0, -95)} L${L(-20, -10)}" fill="none" stroke="${INK}" stroke-width="${6 * s}" stroke-linecap="round"/>`;
    g += `<ellipse cx="${cx + 28 * s}" cy="${feetY - 2 * s}" rx="${11 * s}" ry="${4 * s}" fill="${INK}"/>`;
    g += `<ellipse cx="${cx - 20 * s}" cy="${feetY - 10 * s}" rx="${10 * s}" ry="${4 * s}" fill="${INK}" transform="rotate(-25 ${cx - 20 * s} ${feetY - 10 * s})"/>`;
  } else {
    g += `<path d="M${L(0, -95)} L${L(-12, 0)}" fill="none" stroke="${INK}" stroke-width="${6 * s}" stroke-linecap="round"/>`;
    g += `<path d="M${L(0, -95)} L${L(12, 0)}" fill="none" stroke="${INK}" stroke-width="${6 * s}" stroke-linecap="round"/>`;
    g += `<ellipse cx="${cx - 12 * s}" cy="${feetY - 2 * s}" rx="${11 * s}" ry="${4 * s}" fill="${INK}"/>`;
    g += `<ellipse cx="${cx + 12 * s}" cy="${feetY - 2 * s}" rx="${11 * s}" ry="${4 * s}" fill="${INK}"/>`;
  }
  // ---- thân (áo)
  const hipY = pose === "sit" ? -62 : -95;
  g += `<path d="M${L(-27, -168)} L${L(27, -168)} L${L(30, hipY)} L${L(-30, hipY)} Z" fill="${shirt}" stroke="${INK}" stroke-width="${4 * s}" stroke-linejoin="round"/>`;
  // cổ áo
  g += `<path d="M${L(-10, -168)} L${L(0, -158)} L${L(10, -168)}" fill="none" stroke="${INK}" stroke-width="${2.5 * s}" stroke-linecap="round"/>`;
  // ---- tay
  const armW = 5 * s;
  if (pose === "phone") {
    // tay phải giơ lên cầm điện thoại, tay trái buông
    g += `<path d="M${L(-26, -160)} L${L(-34, -105)}" fill="none" stroke="${INK}" stroke-width="${armW}" stroke-linecap="round"/>`;
    g += `<circle cx="${cx - 34 * s}" cy="${feetY - 105 * s}" r="${5 * s}" fill="${INK}"/>`;
    g += `<path d="M${L(26, -160)} L${L(42, -200)}" fill="none" stroke="${INK}" stroke-width="${armW}" stroke-linecap="round"/>`;
    g += `<rect x="${cx + 34 * s}" y="${feetY - 222 * s}" width="${16 * s}" height="${26 * s}" rx="${3 * s}" fill="#222" stroke="${INK}" stroke-width="${2 * s}"/>`;
    g += `<rect x="${cx + 37 * s}" y="${feetY - 218 * s}" width="${10 * s}" height="${14 * s}" fill="#bfe3f5"/>`;
  } else if (expr === "thinking") {
    // tay chống cằm
    g += `<path d="M${L(-26, -160)} L${L(-34, -105)}" fill="none" stroke="${INK}" stroke-width="${armW}" stroke-linecap="round"/>`;
    g += `<circle cx="${cx - 34 * s}" cy="${feetY - 105 * s}" r="${5 * s}" fill="${INK}"/>`;
    g += `<path d="M${L(26, -160)} L${L(34, -185)} L${L(16, -176)}" fill="none" stroke="${INK}" stroke-width="${armW}" stroke-linecap="round" stroke-linejoin="round"/>`;
    g += `<circle cx="${cx + 16 * s}" cy="${feetY - 176 * s}" r="${5 * s}" fill="${INK}"/>`;
  } else if (pose === "walk") {
    g += `<path d="M${L(-26, -160)} L${L(-34, -118)}" fill="none" stroke="${INK}" stroke-width="${armW}" stroke-linecap="round"/>`;
    g += `<path d="M${L(26, -160)} L${L(34, -120)}" fill="none" stroke="${INK}" stroke-width="${armW}" stroke-linecap="round"/>`;
    g += `<circle cx="${cx - 34 * s}" cy="${feetY - 118 * s}" r="${5 * s}" fill="${INK}"/>`;
    g += `<circle cx="${cx + 34 * s}" cy="${feetY - 120 * s}" r="${5 * s}" fill="${INK}"/>`;
  } else {
    g += `<path d="M${L(-26, -160)} L${L(-34, -105)}" fill="none" stroke="${INK}" stroke-width="${armW}" stroke-linecap="round"/>`;
    g += `<path d="M${L(26, -160)} L${L(34, -105)}" fill="none" stroke="${INK}" stroke-width="${armW}" stroke-linecap="round"/>`;
    g += `<circle cx="${cx - 34 * s}" cy="${feetY - 105 * s}" r="${5 * s}" fill="${INK}"/>`;
    g += `<circle cx="${cx + 34 * s}" cy="${feetY - 105 * s}" r="${5 * s}" fill="${INK}"/>`;
  }
  // ---- đầu + tóc + mặt
  const hx = cx, hy = feetY - 200 * s, r = 30 * s;
  g += `<circle cx="${hx}" cy="${hy}" r="${r}" fill="#fffdf8" stroke="${INK}" stroke-width="${4 * s}"/>`;
  g += hair(who, hx, hy);
  // mặt vẽ theo tỉ lệ s: dùng group scale quanh tâm đầu
  g += `<g transform="translate(${hx} ${hy}) scale(${s}) translate(${-hx} ${-hy})">${face(hx, hy, expr)}</g>`;
  return `<g>${g}</g>`;
}

// ---------------------------------------------------------------- buồng dịch chuyển
// pod(cx, baseY, o) — o = {label, status, glow, crack}
export function pod(cx, baseY, o = {}) {
  const label = o.label || "NEW YORK";
  const status = o.status || "READY";
  const statusColor = {
    READY: "#2e9e4f", NEXT: "#d98a00", ARRIVED: "#2a6db0",
    SCANNED: "#2a9db0", DELETED: "#d94f3d", "COPY READY": "#2e9e4f",
  }[status] || "#2e9e4f";
  let g = "";
  if (o.glow) {
    g += `<ellipse cx="${cx}" cy="${baseY - 160}" rx="150" ry="200" fill="#7fc4e8" opacity="0.18"/>`;
    g += `<ellipse cx="${cx}" cy="${baseY - 160}" rx="105" ry="155" fill="#7fc4e8" opacity="0.16"/>`;
  }
  // bệ
  g += `<rect x="${cx - 85}" y="${baseY - 28}" width="170" height="28" rx="8" fill="#d8d2c4" stroke="${INK}" stroke-width="4"/>`;
  // kính
  g += `<rect x="${cx - 68}" y="${baseY - 320}" width="136" height="292" rx="18" fill="#7fc4e8" fill-opacity="0.32" stroke="#ffffff" stroke-width="6"/>`;
  g += `<rect x="${cx - 68}" y="${baseY - 320}" width="136" height="292" rx="18" fill="none" stroke="${INK}" stroke-width="2" opacity="0.5"/>`;
  // vệt sáng trên kính
  g += `<line x1="${cx - 44}" y1="${baseY - 300}" x2="${cx - 44}" y2="${baseY - 60}" stroke="#ffffff" stroke-width="6" opacity="0.7" stroke-linecap="round"/>`;
  // mái vòm + nhãn thành phố
  g += `<path d="M${cx - 68} ${baseY - 320} A68 52 0 0 1 ${cx + 68} ${baseY - 320} Z" fill="#f5f0e6" stroke="${INK}" stroke-width="4"/>`;
  g += `<rect x="${cx - 70}" y="${baseY - 352}" width="140" height="28" rx="8" fill="${INK}"/>`;
  g += `<text x="${cx}" y="${baseY - 332}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="800" fill="#ffffff">${label}</text>`;
  // bảng trạng thái trên bệ
  g += `<rect x="${cx - 56}" y="${baseY - 24}" width="112" height="20" rx="6" fill="#ffffff" stroke="${INK}" stroke-width="3"/>`;
  g += `<text x="${cx}" y="${baseY - 10}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="800" fill="${statusColor}">${status}</text>`;
  if (o.crack) {
    // vết nứt mạng nhện, tâm ở (cx+8, baseY-180)
    const ccx = cx + 8, ccy = baseY - 180;
    const spokes = [
      [[0, 0], [18, -26], [34, -44], [52, -58]],
      [[0, 0], [-22, -18], [-40, -30], [-58, -40]],
      [[0, 0], [26, -6], [46, -2], [62, 6]],
      [[0, 0], [-26, 8], [-44, 18], [-56, 30]],
      [[0, 0], [10, 26], [18, 44], [24, 60]],
      [[0, 0], [-10, 24], [-16, 42], [-20, 56]],
      [[0, 0], [30, 18], [48, 30], [60, 44]],
      [[0, 0], [-30, -28], [-48, -44], [-58, -58]],
    ];
    let cr = "";
    for (const sp of spokes) {
      cr += `<path d="M${ccx} ${ccy} ` + sp.slice(1).map(([dx, dy]) => `L${ccx + dx} ${ccy + dy}`).join(" ") + `" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>`;
    }
    cr += `<circle cx="${ccx}" cy="${ccy}" r="5" fill="#ffffff" opacity="0.9"/>`;
    g += cr;
  }
  return `<g>${g}</g>`;
}

// ---------------------------------------------------------------- bối cảnh 540x960
function sun(x, y, r = 34) {
  return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="#f2c94c" stroke="${INK}" stroke-width="3.5"/>${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => {
    const rad = (a * Math.PI) / 180;
    const x1 = x + Math.cos(rad) * (r + 6), y1 = y + Math.sin(rad) * (r + 6);
    const x2 = x + Math.cos(rad) * (r + 16), y2 = y + Math.sin(rad) * (r + 16);
    return `<line x1="${x1.toFixed(0)}" y1="${y1.toFixed(0)}" x2="${x2.toFixed(0)}" y2="${y2.toFixed(0)}" stroke="#f2c94c" stroke-width="4" stroke-linecap="round"/>`;
  }).join("")}</g>`;
}
function cloud(x, y, s = 1) {
  return `<g fill="#ffffff" opacity="0.95"><ellipse cx="${x}" cy="${y}" rx="${46 * s}" ry="${18 * s}"/><ellipse cx="${x - 30 * s}" cy="${y + 6 * s}" rx="${28 * s}" ry="${14 * s}"/><ellipse cx="${x + 32 * s}" cy="${y + 6 * s}" rx="${30 * s}" ry="${14 * s}"/></g>`;
}
function stars(n, seed = 7) {
  // sao cố định (không random thật để khung ổn định)
  let s = "";
  let v = seed;
  const rnd = () => { v = (v * 16807) % 2147483647; return v / 2147483647; };
  for (let i = 0; i < n; i++) {
    const x = 20 + rnd() * 500, y = 30 + rnd() * 420, r = 1.5 + rnd() * 2;
    s += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#ffffff" opacity="${(0.5 + rnd() * 0.5).toFixed(2)}"/>`;
  }
  return s;
}
function buildings(x0, x1, yBase, color, winColor, seed = 0) {
  // dãy nhà: các hình chữ nhật cao thấp xen kẽ, có cửa sổ
  let s = "";
  let x = x0;
  let i = 0;
  while (x < x1) {
    const w = 46 + ((i * 37) % 40);
    const h = 130 + ((i * 53 + seed) % 160);
    s += `<rect x="${x}" y="${yBase - h}" width="${w}" height="${h}" fill="${color}" stroke="${INK}" stroke-width="2" opacity="0.95"/>`;
    for (let wy = yBase - h + 16; wy < yBase - 14; wy += 26) {
      for (let wx = x + 10; wx < x + w - 12; wx += 20) {
        if ((wx + wy) % 3 !== 0) s += `<rect x="${wx}" y="${wy}" width="9" height="12" fill="${winColor}" opacity="0.75"/>`;
      }
    }
    x += w + 6;
    i++;
  }
  return s;
}

export function bgNYCday() {
  return `
  <rect x="0" y="0" width="540" height="780" fill="#7fc4e8"/>
  ${sun(64, 230, 32)}
  ${cloud(200, 130, 1)}${cloud(420, 90, 0.8)}${cloud(330, 210, 0.7)}
  ${buildings(0, 540, 640, "#9ab8d8", "#fffdf8", 0)}
  ${buildings(-20, 540, 660, "#7a9cc0", "#ffe9a8", 90)}
  <rect x="0" y="660" width="540" height="115" fill="#8a8a8a"/>
  <path d="M0 717 H540" stroke="#fffdf8" stroke-width="5" stroke-dasharray="26 22"/>
  <rect x="0" y="775" width="540" height="185" fill="#d8d2c4"/>
  <line x1="0" y1="775" x2="540" y2="775" stroke="${INK}" stroke-width="3"/>`;
}

export function bgTokyoNight() {
  return `
  <rect x="0" y="0" width="540" height="780" fill="#2a2350"/>
  ${stars(26, 11)}
  <g>
    <path d="M48 780 L96 170 L144 780 Z" fill="#c0392b" stroke="${INK}" stroke-width="3"/>
    <path d="M62 640 H130 M70 520 H122 M78 400 H114 M86 290 H106" stroke="#f5f0e6" stroke-width="4"/>
    <rect x="88" y="330" width="16" height="26" fill="#f2c94c" stroke="${INK}" stroke-width="2"/>
    <line x1="96" y1="170" x2="96" y2="120" stroke="#c0392b" stroke-width="5"/>
    <circle cx="96" cy="116" r="6" fill="#ff5a5a" stroke="${INK}" stroke-width="2"/>
  </g>
  ${buildings(180, 540, 660, "#1a1535", "#ffe9a8")}
  <g>
    <rect x="200" y="300" width="26" height="150" rx="6" fill="#ff5a8a" stroke="${INK}" stroke-width="2"/>
    <rect x="240" y="360" width="26" height="120" rx="6" fill="#4ae3c1" stroke="${INK}" stroke-width="2"/>
    <rect x="280" y="280" width="26" height="170" rx="6" fill="#f2c94c" stroke="${INK}" stroke-width="2"/>
    <rect x="206" y="320" width="14" height="4" fill="#fff"/><rect x="206" y="340" width="14" height="4" fill="#fff"/>
    <rect x="246" y="380" width="14" height="4" fill="#fff"/><rect x="246" y="400" width="14" height="4" fill="#fff"/>
    <rect x="286" y="300" width="14" height="4" fill="#fff"/><rect x="286" y="320" width="14" height="4" fill="#fff"/>
  </g>
  <rect x="0" y="775" width="540" height="185" fill="#241f42"/>
  <line x1="0" y1="775" x2="540" y2="775" stroke="${INK}" stroke-width="3"/>
  <rect x="200" y="800" width="10" height="120" fill="#4ae3c1" opacity="0.18"/>
  <rect x="280" y="800" width="10" height="120" fill="#f2c94c" opacity="0.18"/>`;
}

export function bgOffice() {
  return `
  <rect x="0" y="0" width="540" height="780" fill="#efe6d4"/>
  <rect x="0" y="780" width="540" height="180" fill="#c9a86a"/>
  <line x1="0" y1="780" x2="540" y2="780" stroke="${INK}" stroke-width="3"/>
  <g><rect x="36" y="110" width="150" height="180" fill="#bfe3f5" stroke="${INK}" stroke-width="4"/>
  <line x1="111" y1="110" x2="111" y2="290" stroke="${INK}" stroke-width="3"/>
  <line x1="36" y1="200" x2="186" y2="200" stroke="${INK}" stroke-width="3"/>
  <circle cx="150" cy="150" r="22" fill="#f2c94c" stroke="${INK}" stroke-width="3"/></g>
  <g><rect x="56" y="330" width="210" height="150" rx="8" fill="#fffdf8" stroke="${INK}" stroke-width="4"/>
  <text x="161" y="362" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="800" fill="${INK}">Q3 GOALS</text>
  <rect x="86" y="420" width="30" height="40" fill="#7fb069" stroke="${INK}" stroke-width="2"/>
  <rect x="130" y="400" width="30" height="60" fill="#7fb069" stroke="${INK}" stroke-width="2"/>
  <rect x="174" y="378" width="30" height="82" fill="#7fb069" stroke="${INK}" stroke-width="2"/>
  <rect x="218" y="352" width="30" height="108" fill="#2e9e4f" stroke="${INK}" stroke-width="2"/>
  <path d="M86 415 L130 395 L174 372 L218 348 L248 330" fill="none" stroke="#d94f3d" stroke-width="4" stroke-linecap="round"/>
  <path d="M238 330 L250 330 L244 340" fill="none" stroke="#d94f3d" stroke-width="4" stroke-linecap="round"/></g>
  <g><circle cx="436" cy="150" r="42" fill="#fffdf8" stroke="${INK}" stroke-width="4"/>
  <path d="M436 150 L436 120 M436 150 L458 162" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  <circle cx="436" cy="150" r="4" fill="${INK}"/></g>
  <g><rect x="320" y="640" width="200" height="22" rx="6" fill="#a97a4f" stroke="${INK}" stroke-width="4"/>
  <rect x="336" y="662" width="14" height="118" fill="#8a6b3a" stroke="${INK}" stroke-width="3"/>
  <rect x="490" y="662" width="14" height="118" fill="#8a6b3a" stroke="${INK}" stroke-width="3"/>
  <rect x="360" y="566" width="96" height="74" rx="6" fill="#2a2a2a" stroke="${INK}" stroke-width="4"/>
  <rect x="368" y="574" width="80" height="58" fill="#7fc4e8"/>
  <path d="M376 622 L396 600 L410 612 L428 590" stroke="#2e9e4f" stroke-width="3" fill="none"/>
  <rect x="392" y="640" width="32" height="8" fill="#2a2a2a"/>
  <rect x="470" y="600" width="34" height="40" rx="4" fill="#c96f4a" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="487" cy="592" rx="8" ry="16" fill="#5da24a" stroke="${INK}" stroke-width="2"/>
  <ellipse cx="478" cy="596" rx="6" ry="12" fill="#7fb069" stroke="${INK}" stroke-width="2"/>
  <rect x="330" y="620" width="40" height="20" fill="#fffdf8" stroke="${INK}" stroke-width="2" transform="rotate(-4 350 630)"/></g>`;
}

export function bgGrandma() {
  return `
  <rect x="0" y="0" width="540" height="780" fill="#f2d49b"/>
  <rect x="0" y="780" width="540" height="180" fill="#c9a86a"/>
  <line x1="0" y1="780" x2="540" y2="780" stroke="${INK}" stroke-width="3"/>
  <g><rect x="58" y="130" width="92" height="180" rx="10" fill="#8a6b3a" stroke="${INK}" stroke-width="4"/>
  <circle cx="104" cy="192" r="34" fill="#fffdf8" stroke="${INK}" stroke-width="4"/>
  <path d="M104 192 L104 170 M104 192 L120 200" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
  <line x1="104" y1="226" x2="104" y2="272" stroke="${INK}" stroke-width="3"/>
  <circle cx="104" cy="280" r="10" fill="#f2c94c" stroke="${INK}" stroke-width="3"/></g>
  <g><rect x="400" y="150" width="96" height="72" fill="#fffdf8" stroke="${INK}" stroke-width="4"/>
  <circle cx="430" cy="176" r="14" fill="#f2c94c" stroke="${INK}" stroke-width="2"/>
  <path d="M404 208 L430 188 L456 208 L492 196 L492 218 L404 218 Z" fill="#7fb069" stroke="${INK}" stroke-width="2"/></g>
  <g><rect x="380" y="640" width="160" height="20" rx="6" fill="#a97a4f" stroke="${INK}" stroke-width="4"/>
  <rect x="396" y="660" width="12" height="120" fill="#8a6b3a" stroke="${INK}" stroke-width="3"/>
  <rect x="512" y="660" width="12" height="120" fill="#8a6b3a" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="430" cy="630" rx="26" ry="10" fill="#fffdf8" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="490" cy="630" rx="26" ry="10" fill="#fffdf8" stroke="${INK}" stroke-width="3"/>
  <path d="M452 612 L470 626 M492 612 L510 626" stroke="${INK}" stroke-width="3" stroke-linecap="round"/></g>
  <ellipse cx="270" cy="880" rx="190" ry="32" fill="#d94f3d" opacity="0.22"/>`;
}

export function bgSushi() {
  return `
  <rect x="0" y="0" width="540" height="780" fill="#e8d8b0"/>
  <rect x="0" y="780" width="540" height="180" fill="#b59a6a"/>
  <line x1="0" y1="780" x2="540" y2="780" stroke="${INK}" stroke-width="3"/>
  <g><rect x="0" y="0" width="540" height="64" fill="#3b6ea5"/>
  <rect x="170" y="0" width="14" height="64" fill="#e8d8b0"/>
  <rect x="356" y="0" width="14" height="64" fill="#e8d8b0"/>
  <text x="270" y="44" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="800" fill="#ffffff">SUSHI</text></g>
  <g><rect x="56" y="120" width="170" height="116" rx="8" fill="#fffdf8" stroke="${INK}" stroke-width="4"/>
  <text x="141" y="164" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="800" fill="${INK}">¥240</text>
  <text x="141" y="204" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="800" fill="${INK}">¥300</text>
  <path d="M76 182 H206 M76 216 H206" stroke="${INK}" stroke-width="2" opacity="0.4"/></g>
  <g><ellipse cx="400" cy="150" rx="30" ry="38" fill="#d94f3d" stroke="${INK}" stroke-width="3"/>
  <rect x="388" y="106" width="24" height="10" rx="3" fill="${INK}"/>
  <rect x="388" y="184" width="24" height="10" rx="3" fill="${INK}"/>
  <path d="M378 150 H422" stroke="#f2c94c" stroke-width="3"/></g>
  <g><ellipse cx="480" cy="120" rx="24" ry="30" fill="#d94f3d" stroke="${INK}" stroke-width="3"/>
  <rect x="470" y="86" width="20" height="8" rx="3" fill="${INK}"/>
  <rect x="470" y="146" width="20" height="8" rx="3" fill="${INK}"/></g>
  <g><rect x="0" y="700" width="540" height="80" fill="#8a6b3a" stroke="${INK}" stroke-width="4"/>
  <ellipse cx="80" cy="692" rx="34" ry="10" fill="#fffdf8" stroke="${INK}" stroke-width="3"/>
  <rect x="62" y="682" width="36" height="12" rx="4" fill="#f28b4a" stroke="${INK}" stroke-width="2"/>
  <ellipse cx="200" cy="692" rx="34" ry="10" fill="#fffdf8" stroke="${INK}" stroke-width="3"/>
  <rect x="182" y="682" width="36" height="12" rx="4" fill="#f2c94c" stroke="${INK}" stroke-width="2"/>
  <ellipse cx="330" cy="692" rx="34" ry="10" fill="#fffdf8" stroke="${INK}" stroke-width="3"/>
  <rect x="312" y="682" width="36" height="12" rx="4" fill="#e87a6a" stroke="${INK}" stroke-width="2"/>
  <ellipse cx="460" cy="692" rx="34" ry="10" fill="#fffdf8" stroke="${INK}" stroke-width="3"/>
  <rect x="442" y="682" width="36" height="12" rx="4" fill="#7fb069" stroke="${INK}" stroke-width="2"/></g>`;
}

export function bgSplit() {
  return `
  <rect x="0" y="0" width="270" height="780" fill="#7fc4e8"/>
  <rect x="270" y="0" width="270" height="780" fill="#2a2350"/>
  ${sun(70, 96, 26)}
  ${cloud(150, 170, 0.7)}
  ${buildings(0, 270, 660, "#9ab8d8", "#fffdf8")}
  ${stars(12, 23)}
  <g><path d="M400 780 L432 220 L464 780 Z" fill="#c0392b" stroke="${INK}" stroke-width="3"/>
  <path d="M412 640 H452 M418 520 H446 M424 400 H440" stroke="#f5f0e6" stroke-width="4"/>
  <line x1="432" y1="220" x2="432" y2="180" stroke="#c0392b" stroke-width="5"/></g>
  <rect x="0" y="775" width="270" height="185" fill="#d8d2c4"/>
  <rect x="270" y="775" width="270" height="185" fill="#241f42"/>
  <line x1="0" y1="775" x2="540" y2="775" stroke="${INK}" stroke-width="3"/>
  <rect x="267" y="0" width="6" height="960" fill="#fffdf8" stroke="${INK}" stroke-width="2"/>`;
}

export function bgBlueprint() {
  let grid = "";
  for (let x = 45; x < 540; x += 45) grid += `<line x1="${x}" y1="0" x2="${x}" y2="960" stroke="#ffffff" stroke-width="1" opacity="0.18"/>`;
  for (let y = 45; y < 960; y += 45) grid += `<line x1="0" y1="${y}" x2="540" y2="${y}" stroke="#ffffff" stroke-width="1" opacity="0.18"/>`;
  return `
  <rect x="0" y="0" width="540" height="960" fill="#1a4a8a"/>
  ${grid}
  <rect x="20" y="20" width="500" height="920" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.5"/>
  <path d="M135 540 Q270 450 405 540" fill="none" stroke="#ffffff" stroke-width="3" stroke-dasharray="10 8"/>
  <text x="270" y="442" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="800" fill="#ffffff">DATA ONLY</text>
  <path d="M135 640 H405" stroke="#ffffff" stroke-width="2" stroke-dasharray="8 8" opacity="0.7"/>
  <path d="M372 622 L408 658 M408 622 L372 658" stroke="#d94f3d" stroke-width="7" stroke-linecap="round"/>
  <text x="135" y="470" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="800" fill="#ffffff" opacity="0.85">POD A</text>
  <text x="405" y="470" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="800" fill="#ffffff" opacity="0.85">POD B</text>
  <text x="40" y="920" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="800" fill="#ffffff" opacity="0.6">FIG. 1 — TELEPORT</text>
  <text x="500" y="920" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="800" fill="#ffffff" opacity="0.6">SCALE 1:1</text>`;
}

export function bgGraveyard() {
  const stone = (x, baseY, w, h, label) => `
  <g><path d="M${x - w / 2} ${baseY} L${x - w / 2} ${baseY - h + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w / 2} ${baseY - h + w / 2} L${x + w / 2} ${baseY} Z" fill="#9a9a9a" stroke="${INK}" stroke-width="3"/>
  <text x="${x}" y="${baseY - h / 2 + 6}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="800" fill="${INK}">${label}</text></g>`;
  return `
  <rect x="0" y="0" width="540" height="700" fill="#1a1a3a"/>
  ${stars(20, 31)}
  <circle cx="465" cy="210" r="42" fill="#f5f0d8" stroke="${INK}" stroke-width="3"/>
  <circle cx="450" cy="198" r="7" fill="#e0d8b8"/><circle cx="480" cy="222" r="5" fill="#e0d8b8"/><circle cx="470" cy="188" r="4" fill="#e0d8b8"/>
  <rect x="0" y="700" width="540" height="260" fill="#2a3a2a"/>
  <line x1="0" y1="700" x2="540" y2="700" stroke="${INK}" stroke-width="3"/>
  <g stroke="#1a2a1a" stroke-width="3" stroke-linecap="round"><line x1="0" y1="688" x2="540" y2="688"/><line x1="0" y1="676" x2="540" y2="676"/>${[40, 100, 160, 220, 280, 340, 400, 460, 520].map(x => `<line x1="${x}" y1="668" x2="${x}" y2="700"/>`).join("")}</g>
  ${stone(70, 700, 56, 66, "RIP")}${stone(160, 700, 56, 66, "YOU")}${stone(250, 700, 56, 66, "RIP")}${stone(340, 700, 56, 66, "YOU")}${stone(430, 700, 56, 66, "RIP")}
  ${stone(90, 800, 68, 84, "RIP")}${stone(220, 800, 68, 84, "YOU")}${stone(350, 800, 68, 84, "RIP")}${stone(470, 800, 68, 84, "YOU")}
  <g stroke="#1a2a1a" stroke-width="4" stroke-linecap="round"><path d="M60 720 L70 700 L80 722 M120 770 L130 750 L140 772 M400 770 L410 752 L420 772 M480 720 L490 702 L500 722"/></g>
  <g stroke="#0f0f1e" stroke-width="5" stroke-linecap="round" fill="none"><path d="M60 700 L70 610 L48 560 M70 640 L92 600 M70 620 L80 570"/><path d="M478 700 L470 620 L448 580 M470 650 L492 610 M470 630 L478 585"/></g>`;
}

export function bgNightRain() {
  let rain = "";
  let v = 5;
  const rnd = () => { v = (v * 16807) % 2147483647; return v / 2147483647; };
  for (let i = 0; i < 46; i++) {
    const x = rnd() * 540, y = rnd() * 940;
    rain += `<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x - 9).toFixed(0)}" y2="${(y + 20).toFixed(0)}" stroke="#a8c8e8" stroke-width="2" opacity="0.45" stroke-linecap="round"/>`;
  }
  return `
  <rect x="0" y="0" width="540" height="780" fill="#1a2038"/>
  ${buildings(0, 540, 620, "#12162a", "#ffe9a8")}
  <g><line x1="80" y1="780" x2="80" y2="520" stroke="${INK}" stroke-width="6"/>
  <circle cx="80" cy="512" r="16" fill="#f2c94c" stroke="${INK}" stroke-width="3"/>
  <ellipse cx="80" cy="540" rx="70" ry="42" fill="#f2c94c" opacity="0.16"/></g>
  <rect x="0" y="780" width="540" height="180" fill="#232838"/>
  <line x1="0" y1="780" x2="540" y2="780" stroke="${INK}" stroke-width="3"/>
  <rect x="60" y="800" width="40" height="110" fill="#f2c94c" opacity="0.14"/>
  <ellipse cx="200" cy="880" rx="70" ry="12" fill="#3a4a6a" opacity="0.5"/>
  <ellipse cx="400" cy="900" rx="90" ry="12" fill="#3a4a6a" opacity="0.5"/>
  ${rain}`;
}

export function bgDark() {
  return `
  <rect x="0" y="0" width="540" height="960" fill="#101016"/>
  <ellipse cx="270" cy="420" rx="230" ry="190" fill="#d94f3d" opacity="0.12"/>
  <g opacity="0.85">
    <rect x="60" y="470" width="70" height="180" rx="14" fill="#1c2a3a" stroke="#2a3a4a" stroke-width="3"/>
    <rect x="235" y="460" width="70" height="190" rx="14" fill="#1c2a3a" stroke="#2a3a4a" stroke-width="3"/>
    <rect x="410" y="470" width="70" height="180" rx="14" fill="#1c2a3a" stroke="#2a3a4a" stroke-width="3"/>
    <circle cx="95" cy="500" r="5" fill="#d94f3d"/><circle cx="270" cy="490" r="5" fill="#2e9e4f"/><circle cx="445" cy="500" r="5" fill="#d98a00"/>
  </g>
  <rect x="0" y="780" width="540" height="180" fill="#181820"/>
  <line x1="0" y1="780" x2="540" y2="780" stroke="#2a2a3a" stroke-width="3"/>`;
}

// ---------------------------------------------------------------- đạo cụ
export function counterBoard(cx, cy, value) {
  return `<g>
  <rect x="${cx - 235}" y="${cy - 55}" width="470" height="110" rx="14" fill="#1a1a1a" stroke="#d94f3d" stroke-width="4"/>
  <text x="${cx}" y="${cy + 15}" text-anchor="middle" font-family="Courier New, monospace" font-size="40" font-weight="800" fill="#ff453a">${value}</text>
  <circle cx="${cx - 215}" cy="${cy - 38}" r="5" fill="#ff453a"/>
  <circle cx="${cx + 215}" cy="${cy - 38}" r="5" fill="#ff453a"/>
  <text x="${cx}" y="${cy + 42}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="800" fill="#ff8a80">LƯỢT MỖI NGÀY</text>
  </g>`;
}

export function idCard(cx, cy) {
  return `<g transform="rotate(-3 ${cx} ${cy})">
  <rect x="${cx - 75}" y="${cy - 50}" width="150" height="100" rx="10" fill="#fffdf8" stroke="${INK}" stroke-width="4"/>
  <circle cx="${cx - 42}" cy="${cy}" r="22" fill="#f2c94c" stroke="${INK}" stroke-width="3"/>
  <circle cx="${cx - 50}" cy="${cy - 5}" r="2.5" fill="${INK}"/><circle cx="${cx - 34}" cy="${cy - 5}" r="2.5" fill="${INK}"/>
  <path d="M${cx - 52} ${cy + 6} Q${cx - 42} ${cy + 14} ${cx - 32} ${cy + 6}" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>
  <text x="${cx + 28}" y="${cy - 6}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="800" fill="${INK}">REAL ME</text>
  <text x="${cx + 28}" y="${cy + 18}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="800" fill="#666">ID #0001</text>
  </g>`;
}

export function phoneRating(cx, cy, stars = 5) {
  const starText = "★".repeat(stars) + "☆".repeat(Math.max(0, 5 - stars));
  return `<g>
  <rect x="${cx - 120}" y="${cy - 190}" width="240" height="380" rx="28" fill="#222222" stroke="${INK}" stroke-width="5"/>
  <rect x="${cx - 106}" y="${cy - 176}" width="212" height="352" rx="18" fill="#fffdf8"/>
  <text x="${cx}" y="${cy - 138}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="800" fill="${INK}">TELEPORT</text>
  <text x="${cx}" y="${cy - 102}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#666666">How was your trip?</text>
  <text x="${cx}" y="${cy - 48}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="800" fill="#f2b705">${starText}</text>
  <rect x="${cx - 90}" y="${cy + 8}" width="180" height="54" rx="27" fill="#2e9e4f" stroke="${INK}" stroke-width="3"/>
  <text x="${cx}" y="${cy + 43}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="800" fill="#ffffff">PERFECT!</text>
  <rect x="${cx - 40}" y="${cy + 158}" width="80" height="6" rx="3" fill="#cccccc"/>
  </g>`;
}

export function photoWall(cx, cy) {
  const mini = (i) => {
    if (i === 0) return `<circle cx="0" cy="-8" r="20" fill="#f2c94c" stroke="${INK}" stroke-width="2.5"/><circle cx="-7" cy="-12" r="2" fill="${INK}"/><circle cx="7" cy="-12" r="2" fill="${INK}"/><path d="M-8 -2 Q0 6 8 -2" fill="none" stroke="${INK}" stroke-width="2.5" stroke-linecap="round"/>`;
    if (i === 1) return `<path d="M-22 8 L0 -16 L22 8 Z" fill="#d94f3d" stroke="${INK}" stroke-width="2.5"/><rect x="-16" y="8" width="32" height="20" fill="#f2d49b" stroke="${INK}" stroke-width="2.5"/>`;
    if (i === 2) return `<ellipse cx="0" cy="0" rx="24" ry="10" fill="#fffdf8" stroke="${INK}" stroke-width="2.5"/><rect x="-18" y="-8" width="36" height="10" rx="4" fill="#f28b4a" stroke="${INK}" stroke-width="2"/>`;
    return `<circle cx="0" cy="-6" r="16" fill="#7fc4e8" stroke="${INK}" stroke-width="2.5"/><path d="M-14 22 Q0 4 14 22" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
  };
  const spots = [[-120, -40, -8], [0, -72, 3], [120, -30, 8], [-52, 62, -4], [62, 58, 5]];
  return `<g>${spots.map(([dx, dy, rot], i) => `
  <g transform="translate(${cx + dx} ${cy + dy}) rotate(${rot})">
    <rect x="-46" y="-56" width="92" height="112" rx="6" fill="#fffdf8" stroke="${INK}" stroke-width="3"/>
    <rect x="-38" y="-48" width="76" height="76" fill="#e8f4f8" stroke="${INK}" stroke-width="2"/>
    <g transform="translate(0 -8)">${mini(i % 4)}</g>
    <rect x="-12" y="-62" width="24" height="12" fill="#f2c94c" opacity="0.8" stroke="${INK}" stroke-width="1.5"/>
  </g>`).join("")}</g>`;
}

export function taxi(cx, cy, dir = 1) {
  const inner = `
  <rect x="${cx - 75}" y="${cy - 28}" width="150" height="56" rx="14" fill="#f2c94c" stroke="${INK}" stroke-width="4"/>
  <rect x="${cx - 45}" y="${cy - 58}" width="90" height="34" rx="10" fill="#f2c94c" stroke="${INK}" stroke-width="4"/>
  <rect x="${cx - 38}" y="${cy - 52}" width="76" height="22" rx="4" fill="#bfe3f5" stroke="${INK}" stroke-width="2"/>
  <rect x="${cx - 20}" y="${cy - 72}" width="40" height="14" rx="4" fill="#fffdf8" stroke="${INK}" stroke-width="3"/>
  <text x="${cx}" y="${cy - 61}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="9" font-weight="800" fill="${INK}">TAXI</text>
  <circle cx="${cx - 45}" cy="${cy + 30}" r="14" fill="#222222" stroke="${INK}" stroke-width="3"/>
  <circle cx="${cx + 45}" cy="${cy + 30}" r="14" fill="#222222" stroke="${INK}" stroke-width="3"/>
  <circle cx="${cx - 45}" cy="${cy + 30}" r="5" fill="#888888"/>
  <circle cx="${cx + 45}" cy="${cy + 30}" r="5" fill="#888888"/>
  <circle cx="${cx + 72}" cy="${cy - 8}" r="6" fill="#fff8c0" stroke="${INK}" stroke-width="2"/>`;
  if (dir < 0) return `<g transform="translate(${2 * cx} 0) scale(-1 1)">${inner}</g>`;
  return `<g>${inner}</g>`;
}

export function tree(cx, baseY, s = 1) {
  return `<g transform="translate(${cx} ${baseY}) scale(${s})">
  <rect x="-8" y="-70" width="16" height="70" fill="#8a5a2a" stroke="${INK}" stroke-width="3"/>
  <circle cx="-28" cy="-85" r="26" fill="#5da24a" stroke="${INK}" stroke-width="3.5"/>
  <circle cx="28" cy="-85" r="26" fill="#5da24a" stroke="${INK}" stroke-width="3.5"/>
  <circle cx="0" cy="-112" r="38" fill="#6db35a" stroke="${INK}" stroke-width="3.5"/>
  </g>`;
}

export function bench(cx, baseY) {
  return `<g>
  <rect x="${cx - 90}" y="${baseY - 100}" width="180" height="14" rx="6" fill="#a97a4f" stroke="${INK}" stroke-width="4"/>
  <rect x="${cx - 90}" y="${baseY - 78}" width="180" height="14" rx="6" fill="#a97a4f" stroke="${INK}" stroke-width="4"/>
  <rect x="${cx - 90}" y="${baseY - 48}" width="180" height="14" rx="6" fill="#a97a4f" stroke="${INK}" stroke-width="4"/>
  <rect x="${cx - 82}" y="${baseY - 96}" width="10" height="52" fill="#8a6b3a" stroke="${INK}" stroke-width="3"/>
  <rect x="${cx + 72}" y="${baseY - 96}" width="10" height="52" fill="#8a6b3a" stroke="${INK}" stroke-width="3"/>
  <path d="M${cx - 70} ${baseY - 34} L${cx - 70} ${baseY} M${cx + 70} ${baseY - 34} L${cx + 70} ${baseY}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  </g>`;
}

export function moon(cx, cy, s = 1) {
  return `<g transform="translate(${cx} ${cy}) scale(${s})">
  <path d="M14 -33 A36 36 0 1 0 14 33 A28 28 0 1 1 14 -33 Z" fill="#f2c94c" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  </g>`;
}

// Tiêu đề: dùng lại helper của doodle.js (chữ trắng viền nâu, nghiêng -2 mặc định).
export function title(text, x, y, size, fill = "#ffffff") {
  return titleTextSVG(text, x, y, size, fill, -2);
}
