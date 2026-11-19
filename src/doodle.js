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

// Má hồng: 3 chấm mỗi bên (kiểu nhân vật hạt) hoặc 2 vệt oval (kiểu cô gái).
export function blushDots(cx, cy, s = 1) {
  const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="${3.5 * s}" fill="#f28b8b"/>`;
  return `<g>${dot(cx - 58 * s, cy + 2 * s)}${dot(cx - 48 * s, cy + 8 * s)}${dot(cx - 68 * s, cy + 8 * s)}${dot(cx + 58 * s, cy + 2 * s)}${dot(cx + 48 * s, cy + 8 * s)}${dot(cx + 68 * s, cy + 8 * s)}</g>`;
}
function blushOval(cx, cy, s = 1) {
  return `<ellipse cx="${cx - 62 * s}" cy="${cy + 8 * s}" rx="${15 * s}" ry="${9 * s}" fill="#f2a0a0" opacity="0.85"/><ellipse cx="${cx + 62 * s}" cy="${cy + 8 * s}" rx="${15 * s}" ry="${9 * s}" fill="#f2a0a0" opacity="0.85"/>`;
}

// Khuôn mặt, tâm (cx, cy), tỉ lệ s. Biểu cảm:
// cuoi: mắt nhắm cong + miệng cười há to | thuong: mắt nửa nhắm + miệng ^
// buon: mắt nửa nhắm + miệng tam giác | buc: cau mày + miệng ^ + vạch giận
// met: quầng thâm + miệng ngang | ngac-nhien: mắt tròn + miệng oval há
export function faceSVG(cx, cy, s = 1, expr = "thuong") {
  const eyeY = cy - 10 * s, ex = 26 * s;
  const halfEye = (x) => `<ellipse cx="${x}" cy="${eyeY}" rx="${20 * s}" ry="${15 * s}" fill="#fff" stroke="${INK}" stroke-width="${4.5 * s}"/><path d="M${x - 20 * s} ${eyeY - 4 * s} Q${x} ${eyeY - 18 * s} ${x + 20 * s} ${eyeY - 4 * s}" fill="none" stroke="${INK}" stroke-width="${4.5 * s}" stroke-linecap="round"/><circle cx="${x}" cy="${eyeY + 5 * s}" r="${5 * s}" fill="${INK}"/>`;
  const happyEye = (x) => `<path d="M${x - 19 * s} ${eyeY} Q${x} ${eyeY - 17 * s} ${x + 19 * s} ${eyeY}" fill="none" stroke="${INK}" stroke-width="${5 * s}" stroke-linecap="round"/>`;
  const mouthY = cy + 30 * s;
  const mouths = {
    cuoi: `<path d="M${cx - 32 * s} ${mouthY - 6 * s} Q${cx} ${mouthY - 14 * s} ${cx + 32 * s} ${mouthY - 6 * s} Q${cx + 32 * s} ${mouthY + 34 * s} ${cx} ${mouthY + 38 * s} Q${cx - 32 * s} ${mouthY + 34 * s} ${cx - 32 * s} ${mouthY - 6 * s} Z" fill="#d95f4b" stroke="${INK}" stroke-width="${4.5 * s}" stroke-linejoin="round"/>`,
    thuong: `<path d="M${cx - 13 * s} ${mouthY + 4 * s} Q${cx} ${mouthY - 12 * s} ${cx + 13 * s} ${mouthY + 4 * s}" fill="none" stroke="${INK}" stroke-width="${5 * s}" stroke-linecap="round"/>`,
    buon: `<path d="M${cx - 15 * s} ${mouthY + 2 * s} L${cx + 15 * s} ${mouthY + 2 * s} L${cx} ${mouthY - 22 * s} Z" fill="#d95f4b" stroke="${INK}" stroke-width="${4 * s}" stroke-linejoin="round"/>`,
    met: `<path d="M${cx - 14 * s} ${mouthY} L${cx + 14 * s} ${mouthY}" stroke="${INK}" stroke-width="${5 * s}" stroke-linecap="round"/>`,
    "ngac-nhien": `<ellipse cx="${cx}" cy="${mouthY + 8 * s}" rx="${12 * s}" ry="${16 * s}" fill="#d95f4b" stroke="${INK}" stroke-width="${4 * s}"/>`,
  };
  let eyes = "";
  if (expr === "cuoi") eyes = happyEye(cx - ex) + happyEye(cx + ex);
  else if (expr === "ngac-nhien") eyes = `<circle cx="${cx - ex}" cy="${eyeY}" r="${15 * s}" fill="#fff" stroke="${INK}" stroke-width="${4.5 * s}"/><circle cx="${cx + ex}" cy="${eyeY}" r="${15 * s}" fill="#fff" stroke="${INK}" stroke-width="${4.5 * s}"/><circle cx="${cx - ex}" cy="${eyeY + 2 * s}" r="${6 * s}" fill="${INK}"/><circle cx="${cx + ex}" cy="${eyeY + 2 * s}" r="${6 * s}" fill="${INK}"/>`;
  else eyes = halfEye(cx - ex) + halfEye(cx + ex);
  const brow = expr === "buc"
    ? `<path d="M${cx - ex - 20 * s} ${eyeY - 26 * s} L${cx - ex + 18 * s} ${eyeY - 16 * s}" stroke="${INK}" stroke-width="${5 * s}" stroke-linecap="round"/><path d="M${cx + ex + 20 * s} ${eyeY - 26 * s} L${cx + ex - 18 * s} ${eyeY - 16 * s}" stroke="${INK}" stroke-width="${5 * s}" stroke-linecap="round"/>`
    : "";
  const tired = expr === "met"
    ? `<ellipse cx="${cx - ex}" cy="${eyeY + 14 * s}" rx="${16 * s}" ry="${6 * s}" fill="#c9b8a8" opacity="0.8"/><ellipse cx="${cx + ex}" cy="${eyeY + 14 * s}" rx="${16 * s}" ry="${6 * s}" fill="#c9b8a8" opacity="0.8"/>`
    : "";
  const anger = expr === "buc"
    ? `<path d="M${cx + 78 * s} ${cy - 52 * s} q10 -14 2 -26 M${cx + 92 * s} ${cy - 40 * s} q12 -10 8 -22" fill="none" stroke="#d94f3d" stroke-width="${5 * s}" stroke-linecap="round"/>`
    : "";
  return `<g>${eyes}${tired}${brow}${mouths[expr] || mouths.thuong}${anger}</g>`;
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
    ${faceSVG(cx, cy, 1, face)}
    ${blushDots(cx, cy, 1)}
    ${prop ? props[prop] || "" : ""}
    ${name ? tagSVG(cx, cy - r - 44, name) : ""}
  </g>`;
}

// Cô gái dẫn chuyện: tóc nâu dài, mặt trắng, áo xanh. opts: { face, s, cup: true|false }
// Tọa độ local: chân y=0, đỉnh đầu y≈-352.
export function girlSVG(cx, feetY, opts = {}) {
  const { face = "cuoi", s = 1, cup = false } = opts;
  const hy = -205 * s; // tâm tóc sau
  const fy = -222 * s; // tâm mặt
  const hair = `<path d="${blobPath(0, hy, 112 * s, 148 * s, 7)}" fill="#6e4a2f" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M${-70 * s} ${-300 * s} q-14 60 -6 110 M${70 * s} ${-300 * s} q14 60 6 110" fill="none" stroke="#5a3a24" stroke-width="4" stroke-linecap="round" opacity="0.55"/>`;
  const faceShape = `<path d="${blobPath(0, fy, 86 * s, 80 * s, 11)}" fill="#fffdf8" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  const bangs = `<path d="M${-88 * s} ${-268 * s} Q${-62 * s} ${-296 * s} ${-32 * s} ${-270 * s} Q${0} ${-298 * s} ${32 * s} ${-270 * s} Q${62 * s} ${-296 * s} ${88 * s} ${-268 * s} L${84 * s} ${-306 * s} Q${40 * s} ${-338 * s} ${0} ${-338 * s} Q${-40 * s} ${-338 * s} ${-84 * s} ${-306 * s} Z" fill="#6e4a2f" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  const shirt = `<path d="M${-80 * s} ${-95 * s} Q0 ${-112 * s} ${80 * s} ${-95 * s} L${92 * s} ${-12 * s} Q${92 * s} ${0} ${78 * s} ${0} L${-78 * s} ${0} Q${-92 * s} ${0} ${-92 * s} ${-12 * s} Z" fill="#4a90d9" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>
  <path d="M${-14 * s} ${-92 * s} L0 ${-70 * s} L${14 * s} ${-92 * s}" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="${-98 * s}" cy="${-30 * s}" r="${13 * s}" fill="#fffdf8" stroke="${INK}" stroke-width="4.5"/>
  <circle cx="${98 * s}" cy="${-30 * s}" r="${13 * s}" fill="#fffdf8" stroke="${INK}" stroke-width="4.5"/>`;
  const cupInHand = cup
    ? `<g transform="translate(${112 * s} ${-58 * s}) scale(0.55)">${cupSVG(0, 0, { face: "thuong", steam: true })}</g>`
    : "";
  return `<g data-char="girl" transform="translate(${cx} ${feetY})">
    ${shadowSVG(0, 2, 100 * s)}
    ${hair}${faceShape}${bangs}
    ${faceSVG(0, fy, 1.15 * s, face)}
    ${blushOval(0, fy, 1.15 * s)}
    ${shirt}${cupInHand}
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
