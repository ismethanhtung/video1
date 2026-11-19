// Phong cách vẽ tay "画渣" — học theo video Bilibili của 画渣花小烙
// (ảnh tham chiếu: các nhân vật hạt tròn, cô gái tóc nâu áo xanh dẫn chuyện).
// Đặc điểm: viền nâu đậm dày hơi lệch tay, màu phẳng dịu, mặt tròn đơn giản
// (mắt nửa nhắm, miệng hình ^ hoặc cười há to, má hồng), nền giấy kẻ ô,
// khung viền dày, phụ đề chữ đậm viền trắng ở đáy khung.
// Mọi hình vẽ trong phim cà phê đều dùng chung bộ công cụ này để đồng nhất.

export const INK = "#3b2a1a"; // màu viền nâu đậm
export const PAPER = "#fffef8";

function jhash(n) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

// Đường bầu dục hơi lệch tay (như vẽ bằng bút lông), kín, bo tròn.
export function blobPath(cx, cy, rx, ry, seed = 1, n = 10) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 - Math.PI / 2;
    const k = 1 + (jhash(seed * 31 + i * 7) - 0.5) * 0.12;
    pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
  }
  let d = `M${(pts[0][0] + pts[n - 1][0]) / 2} ${(pts[0][1] + pts[n - 1][1]) / 2}`;
  for (let i = 0; i < n; i++) {
    const p = pts[i], q = pts[(i + 1) % n];
    d += ` Q${p[0]} ${p[1]} ${(p[0] + q[0]) / 2} ${(p[1] + q[1]) / 2}`;
  }
  return d + " Z";
}

// Nền giấy kẻ ô trắng + khung viền dày hơi lệch.
export function gridPaperSVG() {
  return `<rect width="960" height="540" fill="${PAPER}"/>
  <defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
    <path d="M30 0 L0 0 0 30" fill="none" stroke="#dcdcdc" stroke-width="1.5"/>
  </pattern></defs>
  <rect width="960" height="540" fill="url(#grid)"/>
  <path d="M10 14 Q 480 6 950 12 L 952 528 Q 480 534 10 528 Z" fill="none" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`;
}

// Nền màu phẳng tràn khung (kiểu ảnh gốc: nền xanh đêm, nâu ấm, xanh nhạt).
export function colorBgSVG(color) {
  return `<rect width="960" height="540" fill="${color}"/>
  <path d="M10 14 Q 480 6 950 12 L 952 528 Q 480 534 10 528 Z" fill="none" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`;
}

// Chữ tiêu đề LỚN: trắng viền nâu, hơi nghiêng, vẽ TRƯỚC nhân vật để đè lên.
export function titleTextSVG(text, x, y, size, fill = "#ffffff", rot = -3) {
  return `<text x="${x}" y="${y}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="800" fill="${fill}" stroke="${INK}" stroke-width="${Math.max(4, size / 9)}" stroke-linejoin="round" paint-order="stroke" transform="rotate(${rot} ${x} ${y})">${text}</text>`;
}

// Giọt nước mắt xanh.
export function tearSVG(x, y, s = 1) {
  return `<path d="M${x} ${y - 14 * s} C${x + 9 * s} ${y - 2 * s} ${x + 8 * s} ${y + 8 * s} ${x} ${y + 10 * s} C${x - 8 * s} ${y + 8 * s} ${x - 9 * s} ${y - 2 * s} ${x} ${y - 14 * s} Z" fill="#7fc4e8" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
}

// Giọt mồ hôi.
export function sweatSVG(x, y, s = 1) {
  return `<path d="M${x} ${y - 10 * s} C${x + 7 * s} ${y - 1 * s} ${x + 6 * s} ${y + 6 * s} ${x} ${y + 8 * s} C${x - 6 * s} ${y + 6 * s} ${x - 7 * s} ${y - 1 * s} ${x} ${y - 10 * s} Z" fill="#bfe3f5" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>`;
}

// Vạch run rẩy quanh một điểm: n vạch ngắn trên vòng tròn bán kính r.
export function trembleSVG(cx, cy, r, n = 5, seed = 1) {
  let out = "";
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + jhash(seed * 31 + i * 7) * 0.5;
    const a1 = a - 0.07, a2 = a + 0.07;
    const x1 = cx + Math.cos(a1) * r, y1 = cy + Math.sin(a1) * r;
    const x2 = cx + Math.cos(a2) * r, y2 = cy + Math.sin(a2) * r;
    const mx = cx + Math.cos(a) * (r + 7), my = cy + Math.sin(a) * (r + 7);
    out += `<path d="M${x1.toFixed(0)} ${y1.toFixed(0)} Q${mx.toFixed(0)} ${my.toFixed(0)} ${x2.toFixed(0)} ${y2.toFixed(0)}" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" opacity="0.75"/>`;
  }
  return `<g>${out}</g>`;
}

// Nền cam ấm như cảnh cô gái dẫn chuyện trong video gốc.
export function warmBgSVG() {
  return `<rect width="960" height="540" fill="#f7bd63"/>
  <path d="M10 14 Q 480 6 950 12 L 952 528 Q 480 534 10 528 Z" fill="none" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`;
}

// Phụ đề: chữ đậm, viền trắng, căn giữa đáy khung (kiểu video gốc).
export function doodleSub(text, maxLen = 46) {
  const words = text.split(" ");
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxLen && cur) { lines.push(cur.trim()); cur = w; }
    else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  const y0 = lines.length === 1 ? 512 : 488;
  return `<g font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="800" text-anchor="middle" fill="#1a1a1a" stroke="#ffffff" stroke-width="7" stroke-linejoin="round" paint-order="stroke">${lines.map((l, i) => `<text x="480" y="${y0 + i * 38}">${l}</text>`).join("")}</g>`;
}

// Má hồng: mảng oval mềm mỗi bên + 1 chấm nhỏ (kiểu ảnh gốc).
export function blushDots(cx, cy, s = 1) {
  return `<g><ellipse cx="${cx - 54 * s}" cy="${cy + 8 * s}" rx="${12 * s}" ry="${7 * s}" fill="#f2a0c0" opacity="0.9"/><ellipse cx="${cx + 54 * s}" cy="${cy + 8 * s}" rx="${12 * s}" ry="${7 * s}" fill="#f2a0c0" opacity="0.9"/><circle cx="${cx - 68 * s}" cy="${cy + 2 * s}" r="${3 * s}" fill="#f2a0c0"/><circle cx="${cx + 68 * s}" cy="${cy + 2 * s}" r="${3 * s}" fill="#f2a0c0"/></g>`;
}
function blushOval(cx, cy, s = 1) {
  return `<ellipse cx="${cx - 62 * s}" cy="${cy + 8 * s}" rx="${18 * s}" ry="${11 * s}" fill="#f2a0a0" opacity="0.85"/><ellipse cx="${cx + 62 * s}" cy="${cy + 8 * s}" rx="${18 * s}" ry="${11 * s}" fill="#f2a0a0" opacity="0.85"/>`;
}

// Khuôn mặt, tâm (cx, cy), tỉ lệ s. Quy tắc 画渣: mắt là 2 vòng tròn trắng LỚN
// (đường kính ≈ 25% chiều rộng mặt), con ngươi nhỏ, nhìn lệch/xuống; miệng nhỏ.
// cuoi: mắt nhắm ∪ + miệng cười há to có lưỡi | thuong: mắt nửa nhắm + miệng ^
// buon: mắt nửa nhắm + quầng + miệng lượn sóng | khoc: mắt nửa nhắm + miệng há
// met: mắt to + quầng thâm + miệng ngang | ngac-nhien: mắt tròn to + miệng oval há
// gian: cau mày + vạch đỏ trên trán + miệng lượn sóng | hoi: con ngươi nhìn lệch + miệng oval nhỏ
export function faceSVG(cx, cy, s = 1, expr = "thuong") {
  const eyeY = cy - 10 * s, ex = 30 * s;
  const bigEye = (x, pupilDy = 5 * s, pupilR = 6 * s) =>
    `<circle cx="${x}" cy="${eyeY}" r="${17 * s}" fill="#fff" stroke="${INK}" stroke-width="${4.5 * s}"/><circle cx="${x}" cy="${eyeY + pupilDy}" r="${pupilR}" fill="${INK}"/>`;
  const halfEye = (x) => `<ellipse cx="${x}" cy="${eyeY}" rx="${21 * s}" ry="${17 * s}" fill="#fff" stroke="${INK}" stroke-width="${4.5 * s}"/><path d="M${x - 21 * s} ${eyeY - 5 * s} Q${x} ${eyeY - 20 * s} ${x + 21 * s} ${eyeY - 5 * s}" fill="none" stroke="${INK}" stroke-width="${4.5 * s}" stroke-linecap="round"/><circle cx="${x}" cy="${eyeY + 6 * s}" r="${5.5 * s}" fill="${INK}"/>`;
  const sideEye = (x, dir) => `<ellipse cx="${x}" cy="${eyeY}" rx="${21 * s}" ry="${17 * s}" fill="#fff" stroke="${INK}" stroke-width="${4.5 * s}"/><path d="M${x - 21 * s} ${eyeY - 5 * s} Q${x} ${eyeY - 20 * s} ${x + 21 * s} ${eyeY - 5 * s}" fill="none" stroke="${INK}" stroke-width="${4.5 * s}" stroke-linecap="round"/><circle cx="${x + dir * 10 * s}" cy="${eyeY + 6 * s}" r="${5.5 * s}" fill="${INK}"/>`;
  const happyEye = (x, side) => `<path d="M${x - 23 * s} ${eyeY - 4 * s} Q${x} ${eyeY + 16 * s} ${x + 23 * s} ${eyeY - 4 * s}" fill="none" stroke="${INK}" stroke-width="${5.5 * s}" stroke-linecap="round"/><path d="M${x + side * 23 * s} ${eyeY - 4 * s} l${side * 7 * s} ${-7 * s}" fill="none" stroke="${INK}" stroke-width="${4 * s}" stroke-linecap="round"/>`;
  const mouthY = cy + 30 * s;
  const mouths = {
    cuoi: `<path d="M${cx - 38 * s} ${mouthY - 6 * s} Q${cx} ${mouthY - 14 * s} ${cx + 38 * s} ${mouthY - 6 * s} Q${cx + 38 * s} ${mouthY + 36 * s} ${cx} ${mouthY + 44 * s} Q${cx - 38 * s} ${mouthY + 36 * s} ${cx - 38 * s} ${mouthY - 6 * s} Z" fill="#9e3d2c" stroke="${INK}" stroke-width="${4.5 * s}" stroke-linejoin="round"/><ellipse cx="${cx}" cy="${mouthY + 28 * s}" rx="${19 * s}" ry="${11 * s}" fill="#e87a6a"/>`,
    thuong: `<path d="M${cx - 13 * s} ${mouthY + 4 * s} Q${cx} ${mouthY - 12 * s} ${cx + 13 * s} ${mouthY + 4 * s}" fill="none" stroke="${INK}" stroke-width="${5 * s}" stroke-linecap="round"/>`,
    buon: `<path d="M${cx - 16 * s} ${mouthY} q8 -8 16 0 q8 8 16 0" fill="none" stroke="${INK}" stroke-width="${5 * s}" stroke-linecap="round"/>`,
    khoc: `<ellipse cx="${cx}" cy="${mouthY + 8 * s}" rx="${15 * s}" ry="${19 * s}" fill="#d95f4b" stroke="${INK}" stroke-width="${4 * s}"/><path d="M${cx - 15 * s} ${mouthY - 4 * s} q7 -7 15 0 q8 7 15 0" fill="none" stroke="${INK}" stroke-width="${3.5 * s}" stroke-linecap="round"/>`,
    met: `<path d="M${cx - 14 * s} ${mouthY} L${cx + 14 * s} ${mouthY}" stroke="${INK}" stroke-width="${5 * s}" stroke-linecap="round"/>`,
    "ngac-nhien": `<ellipse cx="${cx}" cy="${mouthY + 8 * s}" rx="${12 * s}" ry="${16 * s}" fill="#d95f4b" stroke="${INK}" stroke-width="${4 * s}"/>`,
    gian: `<path d="M${cx - 16 * s} ${mouthY} q8 -8 16 0 q8 8 16 0" fill="none" stroke="${INK}" stroke-width="${5 * s}" stroke-linecap="round"/>`,
    hoi: `<ellipse cx="${cx}" cy="${mouthY + 6 * s}" rx="${8 * s}" ry="${11 * s}" fill="#d95f4b" stroke="${INK}" stroke-width="${4 * s}"/>`,
  };
  let eyes = "";
  if (expr === "cuoi") eyes = happyEye(cx - ex, -1) + happyEye(cx + ex, 1);
  else if (expr === "ngac-nhien") eyes = bigEye(cx - ex, 2 * s) + bigEye(cx + ex, 2 * s);
  else if (expr === "met") eyes = bigEye(cx - ex, 8 * s, 5 * s) + bigEye(cx + ex, 8 * s, 5 * s);
  else if (expr === "hoi") eyes = sideEye(cx - ex, 1) + sideEye(cx + ex, 1);
  else eyes = halfEye(cx - ex) + halfEye(cx + ex);
  const brow = (expr === "buc" || expr === "gian")
    ? `<path d="M${cx - ex - 20 * s} ${eyeY - 26 * s} L${cx - ex + 18 * s} ${eyeY - 16 * s}" stroke="${INK}" stroke-width="${5 * s}" stroke-linecap="round"/><path d="M${cx + ex + 20 * s} ${eyeY - 26 * s} L${cx + ex - 18 * s} ${eyeY - 16 * s}" stroke="${INK}" stroke-width="${5 * s}" stroke-linecap="round"/>`
    : "";
  const tired = (expr === "met" || expr === "buon" || expr === "khoc" || expr === "gian" || expr === "hoi")
    ? `<ellipse cx="${cx - ex}" cy="${eyeY + 21 * s}" rx="${17 * s}" ry="${5.5 * s}" fill="#c9b8a8" opacity="0.85"/><ellipse cx="${cx + ex}" cy="${eyeY + 21 * s}" rx="${17 * s}" ry="${5.5 * s}" fill="#c9b8a8" opacity="0.85"/>`
    : "";
  const anger = expr === "buc"
    ? `<path d="M${cx + 78 * s} ${cy - 52 * s} q10 -14 2 -26 M${cx + 92 * s} ${cy - 40 * s} q12 -10 8 -22" fill="none" stroke="#d94f3d" stroke-width="${5 * s}" stroke-linecap="round"/>`
    : "";
  const angerMarks = expr === "gian"
    ? `<path d="M${cx - 34 * s} ${cy - 56 * s} l${-8 * s} ${-16 * s} M${cx} ${cy - 60 * s} l0 ${-18 * s} M${cx + 34 * s} ${cy - 56 * s} l${8 * s} ${-16 * s}" stroke="#d94f3d" stroke-width="${5.5 * s}" stroke-linecap="round"/>`
    : "";
  return `<g>${eyes}${tired}${brow}${mouths[expr] || mouths.thuong}${anger}${angerMarks}</g>`;
}

// Thẻ tên tròn trắng trên đầu nhân vật (kiểu video gốc).
export function tagSVG(cx, cy, text, rot = -4) {
  const r = Math.max(24, 10 + text.length * 4.2);
  return `<g transform="rotate(${rot} ${cx} ${cy})"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#fff" stroke="${INK}" stroke-width="4"/><text x="${cx}" y="${cy + 6}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="17" font-weight="800" fill="${INK}">${text}</text></g>`;
}

// Bóng mềm dưới chân nhân vật.
export function shadowSVG(cx, y, rx) {
  return `<ellipse cx="${cx}" cy="${y}" rx="${rx}" ry="10" fill="#000" opacity="0.12"/>`;
}

// Nhân vật hạt tròn: thân tròn màu phẳng, mặt, má hồng, tay cụt, thẻ tên, đạo cụ.
// opts: { color, r, name, face, seed, prop: "hoa" | "kinh" | "la" | "kiem" | null }
export function blobCharSVG(cx, feetY, opts = {}) {
  const { color = "#a9c46e", r = 62, name = "", face = "thuong", seed = 1, prop = null } = opts;
  const cy = feetY - r - 6;
  const props = {
    hoa: `<g><circle cx="${cx - 44}" cy="${cy - r + 8}" r="9" fill="#f2a0c0" stroke="${INK}" stroke-width="3"/><circle cx="${cx - 44}" cy="${cy - r + 8}" r="3.5" fill="#f2c94c"/></g>`,
    kinh: `<g><ellipse cx="${cx - 26}" cy="${cy - 10}" rx="24" ry="17" fill="#3b2a1a" opacity="0.92"/><ellipse cx="${cx + 26}" cy="${cy - 10}" rx="24" ry="17" fill="#3b2a1a" opacity="0.92"/><path d="M${cx - 2} ${cy - 12} L${cx + 2} ${cy - 12}" stroke="${INK}" stroke-width="4"/><path d="M${cx - 18} ${cy - 18} l10 -5 M${cx + 8} ${cy - 18} l10 -5" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.9"/></g>`,
    la: `<path d="M${cx + 40} ${cy - r - 6} Q${cx + 62} ${cy - r - 26} ${cx + 44} ${cy - r - 30} Q${cx + 26} ${cy - r - 24} ${cx + 40} ${cy - r - 6} Z" fill="#6db35a" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`,
    kiem: `<g><path d="M${cx + r - 6} ${cy + 10} L${cx + r + 26} ${cy - 58}" stroke="#c9c9c9" stroke-width="10" stroke-linecap="round"/><path d="M${cx + r - 6} ${cy + 10} L${cx + r + 26} ${cy - 58}" stroke="${INK}" stroke-width="10" stroke-linecap="round" opacity="0.001"/><path d="M${cx + r + 14} ${cy - 30} l14 8" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle cx="${cx + r + 26}" cy="${cy - 58}" r="5" fill="${INK}"/></g>`,
  };
  return `<g data-char="blob">
    ${shadowSVG(cx, feetY + 2, r * 0.95)}
    <path d="${blobPath(cx, cy, r, r * 0.96, seed)}" fill="${color}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M${cx - r + 8} ${cy + r * 0.55} q10 14 4 26 M${cx + r - 8} ${cy + r * 0.55} q-10 14 -4 26" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    ${opts.wave ? `<path d="M${cx + r - 12} ${cy + r * 0.4} q28 -4 24 -38" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><circle cx="${cx + r + 12}" cy="${cy + r * 0.4 - 38}" r="9" fill="${color}" stroke="${INK}" stroke-width="4"/>` : ""}
    ${faceSVG(cx, cy, 1, face)}
    ${blushDots(cx, cy, 1)}
    ${prop ? props[prop] || "" : ""}
    ${name ? tagSVG(cx, cy - r - 44, name) : ""}
  </g>`;
}

// Cô gái dẫn chuyện — HỆ THỐNG NHÂN VẬT: phong cách cố định, nội dung tham số.
// opts: { face, s, cup, shirt, hands,
//   pose: "dung" (đứng) | "ngoi" (ngồi xếp bằng) | "ban" (ngồi bàn, chỉ nửa trên),
//   outfit: "hien-dai" | "co-dai" (hán phục),
//   skirt: true (váy + quần xám + giày), arms: "xuoi" | "dang" (dang tay),
//   bun: true (búi tóc + trâm), fan: true (quạt), phone: true (điện thoại) }
// Tọa độ local: chân y=0, đỉnh đầu y≈-362 (đứng) / -317 (ngồi).
export function girlSVG(cx, feetY, opts = {}) {
  const { face = "cuoi", s = 1, cup = false, shirt: shirtColor = "#4a90d9", hands = true,
    pose = "dung", outfit = "hien-dai", skirt = false, arms = "xuoi",
    bun = false, fan = false, phone = false } = opts;
  const fy = -222 * s; // tâm mặt
  const headDy = pose === "ngoi" ? 45 * s : 0; // ngồi: đầu thấp xuống
  // Tóc: khối lớn hình chuông — hẹp ở đỉnh, xòe rộng ở vai, đáy có sóng lượn.
  const hair = `<path d="M0 ${-362 * s}
  Q${60 * s} ${-364 * s} ${105 * s} ${-330 * s}
  Q${150 * s} ${-296 * s} ${162 * s} ${-230 * s}
  Q${172 * s} ${-170 * s} ${176 * s} ${-120 * s}
  Q${180 * s} ${-80 * s} ${168 * s} ${-52 * s}
  Q${158 * s} ${-30 * s} ${140 * s} ${-38 * s}
  Q${126 * s} ${-46 * s} ${122 * s} ${-24 * s}
  Q${118 * s} ${-6 * s} ${100 * s} ${-18 * s}
  Q${84 * s} ${-28 * s} ${78 * s} ${-48 * s}
  L${-78 * s} ${-48 * s}
  Q${-84 * s} ${-28 * s} ${-100 * s} ${-18 * s}
  Q${-118 * s} ${-6 * s} ${-122 * s} ${-24 * s}
  Q${-126 * s} ${-46 * s} ${-140 * s} ${-38 * s}
  Q${-158 * s} ${-30 * s} ${-168 * s} ${-52 * s}
  Q${-180 * s} ${-80 * s} ${-176 * s} ${-120 * s}
  Q${-172 * s} ${-170 * s} ${-162 * s} ${-230 * s}
  Q${-150 * s} ${-296 * s} ${-105 * s} ${-330 * s}
  Q${-60 * s} ${-364 * s} 0 ${-362 * s} Z" fill="#6e4a2f" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M${-128 * s} ${-260 * s} q-16 50 -4 96 M${128 * s} ${-260 * s} q16 50 4 96" fill="none" stroke="#5a3a24" stroke-width="4" stroke-linecap="round" opacity="0.55"/>
  <path d="M${-25 * s} ${-340 * s} q${-6 * s} ${-16 * s} ${6 * s} ${-20 * s}" fill="none" stroke="#6e4a2f" stroke-width="5" stroke-linecap="round"/>
  <path d="M${70 * s} ${-320 * s} q26 14 30 44 M${-94 * s} ${-300 * s} q-20 20 -18 48" fill="none" stroke="#8a5a3b" stroke-width="4" stroke-linecap="round" opacity="0.7"/>`;
  const bunTop = bun ? `<circle cx="0" cy="${-368 * s}" r="${26 * s}" fill="#6e4a2f" stroke="${INK}" stroke-width="5"/><path d="M${-18 * s} ${-380 * s} L${20 * s} ${-358 * s}" stroke="#f2c94c" stroke-width="6" stroke-linecap="round"/><circle cx="${20 * s}" cy="${-358 * s}" r="6" fill="#d94f3d" stroke="${INK}" stroke-width="3"/>` : "";
  const faceShape = `<path d="${blobPath(0, fy, 112 * s, 92 * s, 11)}" fill="#fffdf8" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  // Mái: chỉ viền đường lượn sóng dưới (đường trên hòa vào tóc, không viền).
  const bangs = `<path d="M${-100 * s} ${-278 * s} Q${-75 * s} ${-292 * s} ${-50 * s} ${-278 * s} Q${-25 * s} ${-292 * s} ${0} ${-278 * s} Q${25 * s} ${-292 * s} ${50 * s} ${-278 * s} Q${75 * s} ${-292 * s} ${100 * s} ${-278 * s} L${96 * s} ${-318 * s} Q${50 * s} ${-346 * s} ${0} ${-346 * s} Q${-50 * s} ${-346 * s} ${-96 * s} ${-318 * s} Z" fill="#6e4a2f"/>
  <path d="M${-100 * s} ${-278 * s} Q${-75 * s} ${-292 * s} ${-50 * s} ${-278 * s} Q${-25 * s} ${-292 * s} ${0} ${-278 * s} Q${25 * s} ${-292 * s} ${50 * s} ${-278 * s} Q${75 * s} ${-292 * s} ${100 * s} ${-278 * s}" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
  const head = `<g transform="translate(0 ${headDy})">
    ${hair}${bunTop}${faceShape}${bangs}
    ${faceSVG(0, fy, 1.15 * s, face)}
    ${blushOval(0, fy, 1.15 * s)}
  </g>`;
  const handCircles = (x1, y1, x2, y2) => `<circle cx="${x1}" cy="${y1}" r="${13 * s}" fill="#fffdf8" stroke="${INK}" stroke-width="4.5"/><circle cx="${x2}" cy="${y2}" r="${13 * s}" fill="#fffdf8" stroke="${INK}" stroke-width="4.5"/>`;
  const collar = `<path d="M${-14 * s} ${-92 * s} L0 ${-70 * s} L${14 * s} ${-92 * s}" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>`;
  let body = "";
  if (pose === "ngoi") {
    // Ngồi xếp bằng: áo rộng + chân bắt chéo + giày, tay cầm điện thoại.
    body = `<path d="M${-95 * s} ${-135 * s} Q0 ${-152 * s} ${95 * s} ${-135 * s} L${105 * s} ${-55 * s} Q${105 * s} ${-40 * s} ${88 * s} ${-40 * s} L${-88 * s} ${-40 * s} Q${-105 * s} ${-40 * s} ${-105 * s} ${-55 * s} Z" fill="${shirtColor}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M${-14 * s} ${-132 * s} L0 ${-110 * s} L${14 * s} ${-132 * s}" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="${-42 * s}" cy="${-18 * s}" rx="${52 * s}" ry="${16 * s}" fill="#9a9a9a" stroke="${INK}" stroke-width="5"/>
    <ellipse cx="${42 * s}" cy="${-18 * s}" rx="${52 * s}" ry="${16 * s}" fill="#9a9a9a" stroke="${INK}" stroke-width="5"/>
    <ellipse cx="${-88 * s}" cy="${-18 * s}" rx="${18 * s}" ry="${8 * s}" fill="#8a5a3b" stroke="${INK}" stroke-width="4"/>
    <ellipse cx="${88 * s}" cy="${-18 * s}" rx="${18 * s}" ry="${8 * s}" fill="#8a5a3b" stroke="${INK}" stroke-width="4"/>
    ${phone ? `<rect x="${-16 * s}" y="${-96 * s}" width="${32 * s}" height="${48 * s}" rx="6" fill="#6db35a" stroke="${INK}" stroke-width="4"/><circle cx="${0}" cy="${-84 * s}" r="5" fill="#fff"/>` : ""}
    ${hands ? handCircles(-24 * s, -72 * s, 24 * s, -72 * s) : ""}`;
  } else if (pose === "ban") {
    // Ngồi bàn: chỉ nửa trên, tay đặt phía trước (bàn + laptop vẽ sau, đè lên).
    body = `<path d="M${-80 * s} ${-95 * s} Q0 ${-112 * s} ${80 * s} ${-95 * s} L${92 * s} ${-20 * s} L${-92 * s} ${-20 * s} Z" fill="${shirtColor}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    ${collar}`;
  } else if (outfit === "co-dai") {
    // Hán phục: áo choàng rộng tay loe + thắt lưng + cổ chéo.
    body = `<path d="M${-85 * s} ${-90 * s} L${-128 * s} ${-28 * s} L${-106 * s} ${-10 * s} L${-78 * s} ${-58 * s} Z" fill="#a8442e" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M${85 * s} ${-90 * s} L${128 * s} ${-28 * s} L${106 * s} ${-10 * s} L${78 * s} ${-58 * s} Z" fill="#a8442e" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M${-85 * s} ${-95 * s} Q0 ${-112 * s} ${85 * s} ${-95 * s} L${108 * s} ${-8 * s} Q${108 * s} ${0} ${96 * s} ${0} L${-96 * s} ${0} Q${-108 * s} ${0} ${-108 * s} ${-8 * s} Z" fill="#a8442e" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M${-30 * s} ${-95 * s} L0 ${-60 * s} L${30 * s} ${-95 * s}" fill="none" stroke="#f2e3c9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M${-106 * s} ${-32 * s} L${106 * s} ${-32 * s}" stroke="#f2e3c9" stroke-width="7" stroke-linecap="round"/>
    <rect x="${-14 * s}" y="${-46 * s}" width="${28 * s}" height="${28 * s}" rx="4" fill="#f2c94c" stroke="${INK}" stroke-width="4"/>
    ${hands ? handCircles(-118 * s, -20 * s, 118 * s, -20 * s) : ""}`;
  } else if (skirt) {
    // Váy xếp ly + quần xám + giày nâu.
    body = `<path d="M${-80 * s} ${-95 * s} Q0 ${-112 * s} ${80 * s} ${-95 * s} L${86 * s} ${-52 * s} L${-86 * s} ${-52 * s} Z" fill="${shirtColor}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    ${collar}
    <path d="M${-86 * s} ${-52 * s} L${86 * s} ${-52 * s} L${98 * s} ${-14 * s} L${-98 * s} ${-14 * s} Z" fill="#c9a06a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M${-40 * s} ${-50 * s} L${-44 * s} ${-16 * s} M0 ${-50 * s} L0 ${-16 * s} M${40 * s} ${-50 * s} L${44 * s} ${-16 * s}" stroke="${INK}" stroke-width="3" opacity="0.5" stroke-linecap="round"/>
    <rect x="${-38 * s}" y="${-16 * s}" width="${26 * s}" height="${16 * s}" rx="8" fill="#9a9a9a" stroke="${INK}" stroke-width="4"/>
    <rect x="${12 * s}" y="${-16 * s}" width="${26 * s}" height="${16 * s}" rx="8" fill="#9a9a9a" stroke="${INK}" stroke-width="4"/>
    <ellipse cx="${-25 * s}" cy="${-2 * s}" rx="${20 * s}" ry="${7 * s}" fill="#8a5a3b" stroke="${INK}" stroke-width="4"/>
    <ellipse cx="${25 * s}" cy="${-2 * s}" rx="${20 * s}" ry="${7 * s}" fill="#8a5a3b" stroke="${INK}" stroke-width="4"/>
    ${hands ? handCircles(-98 * s, -30 * s, 98 * s, -30 * s) : ""}`;
  } else {
    // Đứng, áo hiện đại.
    body = `<path d="M${-80 * s} ${-95 * s} Q0 ${-112 * s} ${80 * s} ${-95 * s} L${92 * s} ${-12 * s} Q${92 * s} ${0} ${78 * s} ${0} L${-78 * s} ${0} Q${-92 * s} ${0} ${-92 * s} ${-12 * s} Z" fill="${shirtColor}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    ${collar}
    ${hands ? (arms === "dang"
      ? `<path d="M${-75 * s} ${-85 * s} L${-128 * s} ${-58 * s}" stroke="${INK}" stroke-width="${20 * s}" stroke-linecap="round"/><path d="M${-75 * s} ${-85 * s} L${-128 * s} ${-58 * s}" stroke="${shirtColor}" stroke-width="${13 * s}" stroke-linecap="round"/><path d="M${75 * s} ${-85 * s} L${128 * s} ${-58 * s}" stroke="${INK}" stroke-width="${20 * s}" stroke-linecap="round"/><path d="M${75 * s} ${-85 * s} L${128 * s} ${-58 * s}" stroke="${shirtColor}" stroke-width="${13 * s}" stroke-linecap="round"/>${handCircles(-135 * s, -55 * s, 135 * s, -55 * s)}`
      : handCircles(-98 * s, -30 * s, 98 * s, -30 * s)) : ""}`;
  }
  const fanInHand = fan
    ? `<g transform="translate(${118 * s} ${-40 * s}) rotate(15)"><path d="M0 0 L${-34 * s} ${-52 * s} Q0 ${-70 * s} ${34 * s} ${-52 * s} Z" fill="#fffdf8" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M0 0 L${-17 * s} ${-58 * s} M0 0 L0 ${-62 * s} M0 0 L${17 * s} ${-58 * s}" stroke="${INK}" stroke-width="3" stroke-linecap="round"/><circle cx="0" cy="0" r="5" fill="#d94f3d" stroke="${INK}" stroke-width="3"/></g>`
    : "";
  const cupInHand = cup
    ? `<g transform="translate(${112 * s} ${-58 * s}) scale(0.55)">${cupSVG(0, 0, { face: "thuong", steam: true })}</g>`
    : "";
  return `<g data-char="girl" transform="translate(${cx} ${feetY})">
    ${shadowSVG(0, 2, 100 * s)}
    ${head}
    ${body}${fanInHand}${cupInHand}
  </g>`;
}

// Sofa nâu mềm: tựa lưng + nệm + tay vịn. Cô gái ngồi vẽ SAU lưng sofa.
// Local: đáy y=0, rộng ±210.
export function couchSVG(cx, baseY, s = 1) {
  return `<g transform="translate(${cx} ${baseY})">
    ${shadowSVG(0, 4, 200 * s)}
    <path d="M${-190 * s} ${-110 * s} Q${-190 * s} ${-150 * s} ${-150 * s} ${-150 * s} L${150 * s} ${-150 * s} Q${190 * s} ${-150 * s} ${190 * s} ${-110 * s} L${190 * s} ${-40 * s} L${-190 * s} ${-40 * s} Z" fill="#a86a4a" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <rect x="${-170 * s}" y="${-142 * s}" width="${160 * s}" height="${92 * s}" rx="14" fill="#c08a6a" stroke="${INK}" stroke-width="5"/>
    <rect x="${10 * s}" y="${-142 * s}" width="${160 * s}" height="${92 * s}" rx="14" fill="#c08a6a" stroke="${INK}" stroke-width="5"/>
    <rect x="${-210 * s}" y="${-100 * s}" width="${36 * s}" height="${100 * s}" rx="14" fill="#a86a4a" stroke="${INK}" stroke-width="6"/>
    <rect x="${174 * s}" y="${-100 * s}" width="${36 * s}" height="${100 * s}" rx="14" fill="#a86a4a" stroke="${INK}" stroke-width="6"/>
    <rect x="${-190 * s}" y="${-45 * s}" width="${380 * s}" height="${45 * s}" rx="12" fill="#c08a6a" stroke="${INK}" stroke-width="6"/>
    <rect x="${-170 * s}" y="${0}" width="${24 * s}" height="${14 * s}" rx="4" fill="#6e4a2f" stroke="${INK}" stroke-width="4"/>
    <rect x="${146 * s}" y="${0}" width="${24 * s}" height="${14 * s}" rx="4" fill="#6e4a2f" stroke="${INK}" stroke-width="4"/>
  </g>`;
}

// Bàn + laptop: vẽ SAU cô gái (pose "ban"), đè lên nửa dưới của cô.
// Laptop bạc, nắp có dấu cộng trắng; tay đặt trên bàn phím.
export function laptopDeskSVG(cx, baseY, s = 1, hands = true) {
  return `<g transform="translate(${cx} ${baseY})">
    <rect x="${-260 * s}" y="${0}" width="${520 * s}" height="${26 * s}" rx="8" fill="#8a5a3b" stroke="${INK}" stroke-width="6"/>
    <rect x="${-230 * s}" y="${26 * s}" width="${20 * s}" height="${16 * s}" fill="#6e4a2f" stroke="${INK}" stroke-width="4"/>
    <rect x="${210 * s}" y="${26 * s}" width="${20 * s}" height="${16 * s}" fill="#6e4a2f" stroke="${INK}" stroke-width="4"/>
    <rect x="${-95 * s}" y="${-150 * s}" width="${190 * s}" height="${140 * s}" rx="14" fill="#c9c9c9" stroke="${INK}" stroke-width="6"/>
    <path d="M${-14 * s} ${-82 * s} L${14 * s} ${-82 * s} M0 ${-96 * s} L0 ${-68 * s}" stroke="#fff" stroke-width="10" stroke-linecap="round"/>
    <rect x="${-112 * s}" y="${-14 * s}" width="${224 * s}" height="${14 * s}" rx="6" fill="#b5b5b5" stroke="${INK}" stroke-width="5"/>
    ${hands ? `<circle cx="${-70 * s}" cy="${-8 * s}" r="${13 * s}" fill="#fffdf8" stroke="${INK}" stroke-width="4.5"/><circle cx="${70 * s}" cy="${-8 * s}" r="${13 * s}" fill="#fffdf8" stroke="${INK}" stroke-width="4.5"/>` : ""}
  </g>`;
}

// Bong bóng thoại trắng, đuôi ở dưới. Vẽ đuôi trước rồi đè hình chữ nhật lên.
export function bubbleSVG(x, y, w, h, tailX = 0.25) {
  const tx = x + w * tailX;
  return `<g>
    <path d="M${tx - 18} ${y + h - 2} L${tx - 6} ${y + h + 26} L${tx + 22} ${y + h - 2} Z" fill="#fff" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="#fff" stroke="${INK}" stroke-width="5"/>
  </g>`;
}

// Sư tử — chứng minh phong cách vẽ được cả động vật: mặt tròn, mắt to,
// má hồng, bờm gai (đực) hoặc tai tròn (cái/con).
// opts: { s, face, mane: true|false, color, seed }
export function lionSVG(cx, feetY, opts = {}) {
  const { s = 1, face = "thuong", mane = true, color = "#e0aa5e", seed = 5 } = opts;
  const fy = -140 * s; // tâm mặt
  let manePath = "";
  if (mane) {
    const N = 12;
    let d = "";
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2 - Math.PI / 2;
      const a2 = ((i + 0.5) / N) * Math.PI * 2 - Math.PI / 2;
      const rOut = (92 + jhash(i * 17 + 3) * 14) * s;
      const rIn = 66 * s;
      d += `${i === 0 ? "M" : "L"}${(Math.cos(a) * rOut).toFixed(0)} ${(fy + Math.sin(a) * rOut).toFixed(0)} L${(Math.cos(a2) * rIn).toFixed(0)} ${(fy + Math.sin(a2) * rIn).toFixed(0)} `;
    }
    manePath = `<path d="${d}Z" fill="#8a5a3b" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  }
  const ears = mane ? "" : `<circle cx="${-44 * s}" cy="${fy - 44 * s}" r="${14 * s}" fill="${color}" stroke="${INK}" stroke-width="4.5"/><circle cx="${44 * s}" cy="${fy - 44 * s}" r="${14 * s}" fill="${color}" stroke="${INK}" stroke-width="4.5"/><circle cx="${-44 * s}" cy="${fy - 44 * s}" r="${6 * s}" fill="#f2a0a0"/><circle cx="${44 * s}" cy="${fy - 44 * s}" r="${6 * s}" fill="#f2a0a0"/>`;
  return `<g data-char="lion" transform="translate(${cx} ${feetY})">
    ${shadowSVG(0, 2, 70 * s)}
    <path d="M${55 * s} ${-60 * s} q${40 * s} ${-6 * s} ${44 * s} ${34 * s}" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
    <path d="M${55 * s} ${-60 * s} q${40 * s} ${-6 * s} ${44 * s} ${34 * s}" fill="none" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
    <circle cx="${99 * s}" cy="${-26 * s}" r="${12 * s}" fill="#8a5a3b" stroke="${INK}" stroke-width="4"/>
    <path d="${blobPath(0, -55 * s, 62 * s, 50 * s, seed)}" fill="${color}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <ellipse cx="0" cy="${-42 * s}" rx="${38 * s}" ry="${30 * s}" fill="#f2d49b"/>
    <ellipse cx="${-32 * s}" cy="${-6 * s}" rx="${17 * s}" ry="${8 * s}" fill="${color}" stroke="${INK}" stroke-width="4"/>
    <ellipse cx="${32 * s}" cy="${-6 * s}" rx="${17 * s}" ry="${8 * s}" fill="${color}" stroke="${INK}" stroke-width="4"/>
    ${manePath}${ears}
    <path d="${blobPath(0, fy, 58 * s, 54 * s, seed + 1)}" fill="#f2d49b" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    ${faceSVG(0, fy, 0.9 * s, face)}
    ${blushOval(0, fy, 0.9 * s)}
    <path d="M${-14 * s} ${fy + 8 * s} Q0 ${fy - 2 * s} ${14 * s} ${fy + 8 * s} Q${14 * s} ${fy + 22 * s} 0 ${fy + 24 * s} Q${-14 * s} ${fy + 22 * s} ${-14 * s} ${fy + 8 * s} Z" fill="#3b2a1a"/>
    <g fill="${INK}" opacity="0.6"><circle cx="${-40 * s}" cy="${fy + 12 * s}" r="2.5"/><circle cx="${-48 * s}" cy="${fy + 20 * s}" r="2.5"/><circle cx="${-36 * s}" cy="${fy + 22 * s}" r="2.5"/><circle cx="${40 * s}" cy="${fy + 12 * s}" r="2.5"/><circle cx="${48 * s}" cy="${fy + 20 * s}" r="2.5"/><circle cx="${36 * s}" cy="${fy + 22 * s}" r="2.5"/></g>
  </g>`;
}

// Tách cà phê có mặt, hơi nóng bốc lên. Local: đáy y=0.
export function cupSVG(cx, feetY, opts = {}) {
  const { face = "thuong", steam = true, coffee = "#6b4226", cupColor = "#fffdf8" } = opts;
  return `<g data-char="cup" transform="translate(${cx} ${feetY})">
    ${shadowSVG(0, 2, 58)}
    <ellipse cx="0" cy="2" rx="62" ry="9" fill="#e8e0d0" stroke="${INK}" stroke-width="4.5"/>
    <path d="M-55 -82 L55 -82 L47 -12 Q44 4 0 4 Q-44 4 -47 -12 Z" fill="${cupColor}" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
    <path d="M55 -66 Q80 -60 76 -34 Q72 -14 50 -16" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
    <path d="M55 -66 Q80 -60 76 -34 Q72 -14 50 -16" fill="none" stroke="${cupColor}" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="0" cy="-82" rx="55" ry="9" fill="${coffee}" stroke="${INK}" stroke-width="4.5"/>
    <ellipse cx="-12" cy="-82" rx="16" ry="4" fill="#a97a4f" opacity="0.7"/>
    ${steam ? `<path d="M-18 -100 q8 -12 0 -24 q-8 -12 0 -22 M14 -100 q8 -12 0 -24 q-8 -12 0 -22" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" opacity="0.6"/>` : ""}
    ${faceSVG(0, -48, 0.62, face)}
  </g>`;
}

// Hạt cà phê.
export function beanSVG(cx, cy, s = 1, rot = -20) {
  return `<g transform="rotate(${rot} ${cx} ${cy})"><ellipse cx="${cx}" cy="${cy}" rx="${26 * s}" ry="${34 * s}" fill="#8a5a3b" stroke="${INK}" stroke-width="5"/><path d="M${cx} ${cy - 26 * s} Q${cx + 10 * s} ${cy} ${cx} ${cy + 26 * s}" fill="none" stroke="#5a3a24" stroke-width="4" stroke-linecap="round"/></g>`;
}

// Quả cà phê chín đỏ.
export function cherrySVG(cx, cy, s = 1) {
  return `<g><circle cx="${cx - 12 * s}" cy="${cy}" r="${20 * s}" fill="#d94f3d" stroke="${INK}" stroke-width="4.5"/><circle cx="${cx + 14 * s}" cy="${cy + 4 * s}" r="${18 * s}" fill="#e0685a" stroke="${INK}" stroke-width="4.5"/><path d="M${cx} ${cy - 18 * s} Q${cx + 4 * s} ${cy - 34 * s} ${cx + 16 * s} ${cy - 38 * s}" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/><path d="M${cx + 16 * s} ${cy - 38 * s} Q${cx + 34 * s} ${cy - 44 * s} ${cx + 38 * s} ${cy - 28 * s} Q${cx + 28 * s} ${cy - 22 * s} ${cx + 16 * s} ${cy - 38 * s} Z" fill="#6db35a" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/></g>`;
}

// Phin cà phê Việt Nam đang nhỏ giọt xuống ly.
export function phinSVG(cx, feetY, s = 1) {
  return `<g data-char="phin" transform="translate(${cx} ${feetY}) scale(${s})">
    ${shadowSVG(0, 2, 52)}
    <path d="M-38 -6 L38 -6 L30 0 L-30 0 Z" fill="#c9c9c9" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="M-30 -96 L30 -96 L26 -6 L-26 -6 Z" fill="#d9d9d9" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <ellipse cx="0" cy="-96" rx="30" ry="7" fill="#efefef" stroke="${INK}" stroke-width="4.5"/>
    <circle cx="0" cy="-104" r="6" fill="${INK}"/>
    <path d="M-30 -58 L30 -58" stroke="${INK}" stroke-width="3" opacity="0.5"/>
    <path d="M0 -4 q3 8 0 14" fill="none" stroke="#6b4226" stroke-width="4" stroke-linecap="round"/>
    <circle cx="0" cy="14" r="4" fill="#6b4226"/>
  </g>`;
}

// ---- Dùng chung cho mọi khung hình ----

export function panelSVG(x, y, w, h) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fff" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
}
export function panelLabel(x, y, text, size = 26, anchor = "middle") {
  return `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="800" fill="${INK}">${text}</text>`;
}
export function doodleSun(cx, cy, r = 55) {
  let rays = "";
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    const x1 = cx + Math.cos(a) * (r + 8), y1 = cy + Math.sin(a) * (r + 8);
    const x2 = cx + Math.cos(a) * (r + 26), y2 = cy + Math.sin(a) * (r + 26);
    rays += `<line x1="${x1.toFixed(0)}" y1="${y1.toFixed(0)}" x2="${x2.toFixed(0)}" y2="${y2.toFixed(0)}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
  }
  return `<g>${rays}<circle cx="${cx}" cy="${cy}" r="${r}" fill="#f2c94c" stroke="${INK}" stroke-width="6"/><circle cx="${cx - 18}" cy="${cy - 8}" r="5" fill="${INK}"/><circle cx="${cx + 18}" cy="${cy - 8}" r="5" fill="${INK}"/><path d="M${cx - 16} ${cy + 14} Q${cx} ${cy + 28} ${cx + 16} ${cy + 14}" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>`;
}
export function heartSVG(cx, cy, s = 1) {
  return `<path d="M${cx} ${cy + 18 * s} C${cx - 30 * s} ${cy - 6 * s} ${cx - 14 * s} ${cy - 26 * s} ${cx} ${cy - 8 * s} C${cx + 14 * s} ${cy - 26 * s} ${cx + 30 * s} ${cy - 6 * s} ${cx} ${cy + 18 * s} Z" fill="#d94f3d" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
}
export function moonSVG(cx, cy, s = 1) {
  return `<path d="M${cx} ${cy - 26 * s} a26 26 0 1 0 10 44 a20 20 0 1 1 -10 -44 Z" fill="#f2c94c" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
}
export function starSVG(cx, cy, s = 1) {
  return `<path d="M${cx} ${cy - 16 * s} L${cx + 5 * s} ${cy - 5 * s} L${cx + 16 * s} ${cy} L${cx + 5 * s} ${cy + 5 * s} L${cx} ${cy + 16 * s} L${cx - 5 * s} ${cy + 5 * s} L${cx - 16 * s} ${cy} L${cx - 5 * s} ${cy - 5 * s} Z" fill="#f2c94c" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>`;
}
export function zzzSVG(cx, cy, s = 1) {
  return `<text x="${cx}" y="${cy}" font-family="Arial, Helvetica, sans-serif" font-size="${26 * s}" font-weight="800" fill="${INK}">Z</text><text x="${cx + 22 * s}" y="${cy - 14 * s}" font-family="Arial, Helvetica, sans-serif" font-size="${20 * s}" font-weight="800" fill="${INK}">z</text><text x="${cx + 40 * s}" y="${cy - 24 * s}" font-family="Arial, Helvetica, sans-serif" font-size="${15 * s}" font-weight="800" fill="${INK}">z</text>`;
}

// Cành cà phê: hoa trắng 5 cánh + lá xanh.
export function branchSVG(cx, cy, s = 1) {
  const flower = (x, y) => `<g>${[0, 72, 144, 216, 288].map((a) => {
    const r = (a * Math.PI) / 180;
    return `<circle cx="${x + Math.cos(r) * 13 * s}" cy="${y + Math.sin(r) * 13 * s}" r="${9 * s}" fill="#fff" stroke="${INK}" stroke-width="3"/>`;
  }).join("")}<circle cx="${x}" cy="${y}" r="${6 * s}" fill="#f2c94c" stroke="${INK}" stroke-width="2.5"/></g>`;
  const leaf = (x, y, rot) => `<path d="M${x} ${y} Q${x + 26 * s} ${y - 16 * s} ${x + 40 * s} ${y} Q${x + 22 * s} ${y + 12 * s} ${x} ${y} Z" fill="#6db35a" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round" transform="rotate(${rot} ${x} ${y})"/>`;
  return `<g>
    <path d="M${cx - 130 * s} ${cy + 40 * s} Q${cx} ${cy - 30 * s} ${cx + 130 * s} ${cy + 20 * s}" fill="none" stroke="#8a5a3b" stroke-width="${7 * s}" stroke-linecap="round"/>
    ${leaf(cx - 70 * s, cy + 6 * s, -25)}${leaf(cx + 30 * s, cy - 8 * s, 15)}${leaf(cx + 90 * s, cy + 14 * s, -10)}
    ${flower(cx - 95 * s, cy - 18 * s)}${flower(cx - 5 * s, cy - 34 * s)}${flower(cx + 75 * s, cy - 6 * s)}
  </g>`;
}

// Cây cà phê: thân + tán lá + quả đỏ.
export function treeSVG(cx, feetY, s = 1) {
  const cherry = (x, y, r = 11) => `<circle cx="${x}" cy="${y}" r="${r * s}" fill="#d94f3d" stroke="${INK}" stroke-width="3.5"/>`;
  return `<g data-char="tree">
    ${shadowSVG(cx, feetY + 2, 90 * s)}
    <path d="M${cx - 14 * s} ${feetY} L${cx - 8 * s} ${feetY - 110 * s} L${cx + 8 * s} ${feetY - 110 * s} L${cx + 14 * s} ${feetY} Z" fill="#8a5a3b" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>
    <path d="${blobPath(cx, feetY - 170 * s, 95 * s, 80 * s, 21)}" fill="#5da24a" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
    <path d="${blobPath(cx - 62 * s, feetY - 120 * s, 52 * s, 44 * s, 23)}" fill="#6db35a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="${blobPath(cx + 62 * s, feetY - 120 * s, 52 * s, 44 * s, 25)}" fill="#6db35a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    ${cherry(cx - 40 * s, feetY - 140 * s)}${cherry(cx + 30 * s, feetY - 170 * s)}${cherry(cx + 66 * s, feetY - 108 * s)}${cherry(cx - 66 * s, feetY - 100 * s, 9)}${cherry(cx + 6 * s, feetY - 120 * s, 9)}
  </g>`;
}

// Giỏ tre đựng quả cà phê đỏ.
export function basketSVG(cx, feetY, s = 1) {
  return `<g data-char="basket">
    ${shadowSVG(cx, feetY + 2, 62 * s)}
    <circle cx="${cx - 34 * s}" cy="${feetY - 78 * s}" r="${13 * s}" fill="#d94f3d" stroke="${INK}" stroke-width="3.5"/><circle cx="${cx - 8 * s}" cy="${feetY - 88 * s}" r="${14 * s}" fill="#e0685a" stroke="${INK}" stroke-width="3.5"/><circle cx="${cx + 20 * s}" cy="${feetY - 80 * s}" r="${13 * s}" fill="#d94f3d" stroke="${INK}" stroke-width="3.5"/><circle cx="${cx + 42 * s}" cy="${feetY - 68 * s}" r="${11 * s}" fill="#e0685a" stroke="${INK}" stroke-width="3.5"/>
    <path d="M${cx - 58 * s} ${feetY - 66 * s} L${cx + 58 * s} ${feetY - 66 * s} L${cx + 44 * s} ${feetY} L${cx - 44 * s} ${feetY} Z" fill="#c08a4e" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M${cx - 52 * s} ${feetY - 44 * s} L${cx + 52 * s} ${feetY - 44 * s} M${cx - 48 * s} ${feetY - 22 * s} L${cx + 48 * s} ${feetY - 22 * s}" stroke="${INK}" stroke-width="3" opacity="0.45"/>
  </g>`;
}

// Máy rang: trống quay + lửa dưới.
export function roasterSVG(cx, feetY, s = 1) {
  return `<g data-char="roaster">
    ${shadowSVG(cx, feetY + 2, 80 * s)}
    <path d="M${cx - 66 * s} ${feetY - 44 * s} L${cx - 66 * s} ${feetY - 6 * s} M${cx + 66 * s} ${feetY - 44 * s} L${cx + 66 * s} ${feetY - 6 * s}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <path d="M${cx - 42 * s} ${feetY - 30 * s} q${10 * s} ${-26 * s} ${28 * s} ${-28 * s} q${8 * s} ${18 * s} ${28 * s} ${8 * s} q${18 * s} ${5 * s} ${15 * s} ${20 * s}" fill="#e07a3f" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
    <rect x="${cx - 78 * s}" y="${feetY - 128 * s}" width="${156 * s}" height="${86 * s}" rx="${18 * s}" fill="#8a8a8a" stroke="${INK}" stroke-width="6"/>
    <circle cx="${cx}" cy="${feetY - 85 * s}" r="${28 * s}" fill="#3d2b1f" stroke="${INK}" stroke-width="5"/>
    ${beanSVG(cx - 12 * s, feetY - 88 * s, 0.55, -20)}${beanSVG(cx + 12 * s, feetY - 80 * s, 0.55, 15)}
    <circle cx="${cx + 92 * s}" cy="${feetY - 85 * s}" r="9" fill="${INK}"/>
    <path d="M${cx - 78 * s} ${feetY - 128 * s} q${78 * s} ${-26 * s} ${156 * s} 0" fill="none" stroke="#fff" stroke-width="4" opacity="0.5" stroke-linecap="round"/>
  </g>`;
}

// Máy espresso: hộp + tay cầm phin + vòi hơi + tách dưới.
export function machineSVG(cx, feetY, s = 1) {
  return `<g data-char="machine">
    ${shadowSVG(cx, feetY + 2, 78 * s)}
    <rect x="${cx - 72 * s}" y="${feetY - 6 * s}" width="144" height="10" rx="4" fill="#8a5a3b" stroke="${INK}" stroke-width="4"/>
    <rect x="${cx - 62 * s}" y="${feetY - 150 * s}" width="124" height="104" rx="12" fill="#d9d9d9" stroke="${INK}" stroke-width="6"/>
    <rect x="${cx - 62 * s}" y="${feetY - 150 * s}" width="124" height="22" rx="10" fill="#efefef" stroke="${INK}" stroke-width="4"/>
    <ellipse cx="${cx - 28 * s}" cy="${feetY - 150 * s}" rx="15" ry="5" fill="#fff" stroke="${INK}" stroke-width="3.5"/>
    <ellipse cx="${cx + 28 * s}" cy="${feetY - 150 * s}" rx="15" ry="5" fill="#fff" stroke="${INK}" stroke-width="3.5"/>
    <rect x="${cx - 40 * s}" y="${feetY - 116 * s}" width="80" height="26" rx="8" fill="#4a90d9" stroke="${INK}" stroke-width="4"/>
    <circle cx="${cx - 20 * s}" cy="${feetY - 103 * s}" r="5" fill="#fff"/><circle cx="${cx + 20 * s}" cy="${feetY - 103 * s}" r="5" fill="#f2c94c"/>
    <circle cx="${cx}" cy="${feetY - 66 * s}" r="13" fill="#fff" stroke="${INK}" stroke-width="4"/>
    <line x1="${cx}" y1="${feetY - 66 * s}" x2="${cx + 8 * s}" y2="${feetY - 76 * s}" stroke="#d94f3d" stroke-width="3" stroke-linecap="round"/>
    <line x1="${cx - 62 * s}" y1="${feetY - 96 * s}" x2="${cx - 78 * s}" y2="${feetY - 58 * s}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <rect x="${cx - 18 * s}" y="${feetY - 46 * s}" width="36" height="12" rx="4" fill="${INK}"/>
    <line x1="${cx + 18 * s}" y1="${feetY - 40 * s}" x2="${cx + 54 * s}" y2="${feetY - 40 * s}" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
    <circle cx="${cx + 56 * s}" cy="${feetY - 40 * s}" r="5" fill="${INK}"/>
    <path d="M${cx} ${feetY - 34 * s} q3 8 0 12" fill="none" stroke="#6b4226" stroke-width="4" stroke-linecap="round"/>
    <g transform="translate(${cx} ${feetY}) scale(0.62)">${cupSVG(0, 0, { face: "cuoi", steam: false, coffee: "#a97a4f" })}</g>
  </g>`;
}

// Ly bạc xỉu cao: lớp sữa trắng dưới, cà phê nâu trên, đá + ống hút.
export function layerGlassSVG(cx, feetY, s = 1) {
  return `<g data-char="glass">
    ${shadowSVG(cx, feetY + 2, 40 * s)}
    <path d="M${cx - 30 * s} ${feetY - 128 * s} L${cx + 30 * s} ${feetY - 128 * s} L${cx + 22 * s} ${feetY} L${cx - 22 * s} ${feetY} Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M${cx - 27 * s} ${feetY - 62 * s} L${cx + 27 * s} ${feetY - 62 * s} L${cx + 22 * s} ${feetY} L${cx - 22 * s} ${feetY} Z" fill="#fdf6ec" stroke="${INK}" stroke-width="3"/>
    <path d="M${cx - 29 * s} ${feetY - 112 * s} L${cx + 29 * s} ${feetY - 112 * s} L${cx + 27 * s} ${feetY - 62 * s} L${cx - 27 * s} ${feetY - 62 * s} Z" fill="#a97a4f"/>
    <rect x="${cx - 14 * s}" y="${feetY - 106 * s}" width="20" height="20" rx="4" fill="#dff3ff" stroke="${INK}" stroke-width="3" transform="rotate(12 ${cx - 4 * s} ${feetY - 96 * s})"/>
    <path d="M${cx + 12 * s} ${feetY - 128 * s} L${cx + 26 * s} ${feetY - 158 * s}" stroke="#d94f3d" stroke-width="7" stroke-linecap="round"/>
  </g>`;
}

// Ly cà phê trứng: bọt vàng dày + rắc cacao.
export function eggCupSVG(cx, feetY, s = 1) {
  return `<g data-char="eggcup">
    ${shadowSVG(cx, feetY + 2, 56 * s)}
    <ellipse cx="${cx}" cy="${feetY + 2}" rx="60" ry="9" fill="#e8e0d0" stroke="${INK}" stroke-width="4.5"/>
    <path d="M${cx - 52 * s} ${feetY - 76 * s} L${cx + 52 * s} ${feetY - 76 * s} L${cx + 44 * s} ${feetY - 8 * s} Q${cx + 40 * s} ${feetY + 4 * s} ${cx} ${feetY + 4 * s} Q${cx - 40 * s} ${feetY + 4 * s} ${cx - 44 * s} ${feetY - 8 * s} Z" fill="#fffdf8" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
    <ellipse cx="${cx}" cy="${feetY - 76 * s}" rx="52" ry="9" fill="#f2c94c" stroke="${INK}" stroke-width="4.5"/>
    <circle cx="${cx - 18 * s}" cy="${feetY - 76 * s}" r="2.5" fill="#8a5a3b"/><circle cx="${cx + 8 * s}" cy="${feetY - 78 * s}" r="2.5" fill="#8a5a3b"/><circle cx="${cx + 24 * s}" cy="${feetY - 74 * s}" r="2.5" fill="#8a5a3b"/>
    <path d="M${cx + 52 * s} ${feetY - 60 * s} Q${cx + 76 * s} ${feetY - 54 * s} ${cx + 72 * s} ${feetY - 30 * s} Q${cx + 68 * s} ${feetY - 12 * s} ${cx + 48 * s} ${feetY - 14 * s}" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
    ${faceSVG(cx, feetY - 44, 0.55, "cuoi")}
  </g>`;
}

// Tháp cold brew: bình trên nhỏ giọt xuống bình dưới.
export function dripTowerSVG(cx, feetY, s = 1) {
  return `<g data-char="tower">
    ${shadowSVG(cx, feetY + 2, 52 * s)}
    <path d="M${cx - 26 * s} ${feetY - 150 * s} L${cx + 26 * s} ${feetY - 150 * s} L${cx + 20 * s} ${feetY - 104 * s} L${cx - 20 * s} ${feetY - 104 * s} Z" fill="#dff3ff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M${cx - 22 * s} ${feetY - 122 * s} L${cx + 22 * s} ${feetY - 122 * s} L${cx + 20 * s} ${feetY - 104 * s} L${cx - 20 * s} ${feetY - 104 * s} Z" fill="#bfe3f5"/>
    <path d="M${cx - 30 * s} ${feetY - 104 * s} L${cx + 30 * s} ${feetY - 104 * s} L${cx + 30 * s} ${feetY - 96 * s} L${cx - 30 * s} ${feetY - 96 * s} Z" fill="#8a5a3b" stroke="${INK}" stroke-width="4"/>
    <path d="M${cx} ${feetY - 96 * s} L${cx} ${feetY - 52 * s}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${feetY - 44 * s}" r="4" fill="#6b4226"/>
    <path d="M${cx - 24 * s} ${feetY - 40 * s} L${cx + 24 * s} ${feetY - 40 * s} L${cx + 18 * s} ${feetY} L${cx - 18 * s} ${feetY} Z" fill="#dff3ff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M${cx - 21 * s} ${feetY - 18 * s} L${cx + 21 * s} ${feetY - 18 * s} L${cx + 18 * s} ${feetY} L${cx - 18 * s} ${feetY} Z" fill="#6b4226"/>
  </g>`;
}

// Ghế nhựa vỉa hè.
export function stoolSVG(cx, feetY, s = 1, color = "#4a90d9") {
  return `<g>
    <rect x="${cx - 34 * s}" y="${feetY - 52 * s}" width="68" height="16" rx="8" fill="${color}" stroke="${INK}" stroke-width="4.5"/>
    <path d="M${cx - 26 * s} ${feetY - 36 * s} L${cx - 32 * s} ${feetY} M${cx + 26 * s} ${feetY - 36 * s} L${cx + 32 * s} ${feetY}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <path d="M${cx - 26 * s} ${feetY - 36 * s} L${cx - 32 * s} ${feetY} M${cx + 26 * s} ${feetY - 36 * s} L${cx + 32 * s} ${feetY}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
  </g>`;
}

// Laptop làm việc đêm.
export function laptopSVG(cx, feetY, s = 1) {
  return `<g>
    ${shadowSVG(cx, feetY + 2, 70 * s)}
    <rect x="${cx - 66 * s}" y="${feetY - 96 * s}" width="132" height="84" rx="10" fill="#3b3b6e" stroke="${INK}" stroke-width="5.5"/>
    <rect x="${cx - 56 * s}" y="${feetY - 86 * s}" width="112" height="64" rx="6" fill="#fdf6c9" stroke="${INK}" stroke-width="3.5"/>
    <text x="${cx}" y="${feetY - 44 * s}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="${20 * s}" font-weight="800" fill="${INK}">deadline</text>
    <path d="M${cx - 78 * s} ${feetY - 12 * s} L${cx + 78 * s} ${feetY - 12 * s} L${cx + 66 * s} ${feetY} L${cx - 66 * s} ${feetY} Z" fill="#8a8a8a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>
  </g>`;
}

// Não + hạt caffeine đuổi cơn buồn ngủ.
export function brainSVG(cx, cy, s = 1) {
  return `<g>
    <path d="${blobPath(cx, cy, 62 * s, 48 * s, 31)}" fill="#f2a0a0" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>
    <path d="M${cx - 34 * s} ${cy - 14 * s} q12 -14 24 -4 M${cx - 6 * s} ${cy - 22 * s} q12 -10 22 2 M${cx - 30 * s} ${cy + 12 * s} q12 -10 24 -2" fill="none" stroke="#d94f3d" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${cx - 20 * s}" cy="${cy + 2 * s}" r="5" fill="${INK}"/><circle cx="${cx + 18 * s}" cy="${cy + 2 * s}" r="5" fill="${INK}"/>
    <path d="M${cx - 10 * s} ${cy + 18 * s} Q${cx} ${cy + 28 * s} ${cx + 10 * s} ${cy + 18 * s}" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
  </g>`;
}

// Đồng hồ treo tường, kim chỉ giờ h, phút m.
export function clockSVG(cx, cy, s = 1, h = 9, m = 0) {
  const ha = ((h % 12) + m / 60) * 30 - 90, ma = m * 6 - 90;
  const rad = (a) => (a * Math.PI) / 180;
  const hx = cx + Math.cos(rad(ha)) * 22 * s, hy = cy + Math.sin(rad(ha)) * 22 * s;
  const mx = cx + Math.cos(rad(ma)) * 34 * s, my = cy + Math.sin(rad(ma)) * 34 * s;
  return `<g>
    <circle cx="${cx}" cy="${cy}" r="${52 * s}" fill="#fff" stroke="${INK}" stroke-width="6"/>
    ${[0, 90, 180, 270].map((a) => {
      const r2 = (a * Math.PI) / 180;
      return `<circle cx="${cx + Math.cos(r2) * 42 * s}" cy="${cy + Math.sin(r2) * 42 * s}" r="${3.5 * s}" fill="${INK}"/>`;
    }).join("")}
    <line x1="${cx}" y1="${cy}" x2="${hx}" y2="${hy}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${mx}" y2="${my}" stroke="${INK}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="5" fill="${INK}"/>
  </g>`;
}

// Cừu đếm cừu.
export function sheepSVG(cx, feetY, s = 1) {
  return `<g>
    ${shadowSVG(cx, feetY + 2, 46 * s)}
    <circle cx="${cx - 26 * s}" cy="${feetY - 52 * s}" r="18" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="${cx}" cy="${feetY - 62 * s}" r="20" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="${cx + 26 * s}" cy="${feetY - 52 * s}" r="18" fill="#fff" stroke="${INK}" stroke-width="4"/>
    <circle cx="${cx + 40 * s}" cy="${feetY - 58 * s}" r="16" fill="#3b2a1a" stroke="${INK}" stroke-width="4"/>
    <circle cx="${cx + 36 * s}" cy="${feetY - 62 * s}" r="2.5" fill="#fff"/><circle cx="${cx + 46 * s}" cy="${feetY - 62 * s}" r="2.5" fill="#fff"/>
    <path d="M${cx - 20 * s} ${feetY - 34 * s} L${cx - 22 * s} ${feetY - 6 * s} M${cx + 20 * s} ${feetY - 34 * s} L${cx + 22 * s} ${feetY - 6 * s}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
  </g>`;
}
