// Phim "Sa mạc không sông" — phong cách đúng ảnh bạn gửi: trời xanh, nắng gắt,
// cồn cát lớp lớp, người đàn ông áo trắng, khăn kẻ đỏ, đào giếng tìm nước.
// Nhân vật vẽ bằng code: viền đậm, màu phẳng, khăn kẻ dùng pattern SVG.
// Tọa độ local: chân ở y=0, đầu hướng lên (y âm), tâm x=0.

// Mặt trời lớn góc phải trên, tia dài — như trong ảnh gốc.
export function desertSunSVG(x = 820, y = 80) {
  const rays = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(a => {
    const r = a * Math.PI / 180;
    return `<line x1="${(x + Math.cos(r) * 72).toFixed(0)}" y1="${(y + Math.sin(r) * 72).toFixed(0)}" x2="${(x + Math.cos(r) * 108).toFixed(0)}" y2="${(y + Math.sin(r) * 108).toFixed(0)}" stroke="#ffd93d" stroke-width="7" stroke-linecap="round"/>`;
  }).join("");
  return `<g>
    <circle cx="${x}" cy="${y}" r="86" fill="#fff3b0" opacity="0.35"/>
    <circle cx="${x}" cy="${y}" r="62" fill="#fff8c0" stroke="#f2c200" stroke-width="4"/>
    ${rays}
  </g>`;
}

// Cồn cát 3 lớp cong chữ S + bụi cây khô + đá nhỏ.
export function dunesSVG(t = 0) {
  const bush = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})" stroke="#5d7d4f" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M0 0 L-6 -14 M0 0 L0 -18 M0 0 L7 -13 M0 0 L-12 -6 M0 0 L12 -6"/></g>`;
  return `<g>
    <path d="M0 330 Q 240 300 480 326 T 960 318 L 960 540 L 0 540 Z" fill="#d9a05b"/>
    <path d="M0 380 Q 300 350 620 382 T 960 372 L 960 540 L 0 540 Z" fill="#e8b96f"/>
    <path d="M0 440 Q 260 415 540 442 T 960 430 L 960 540 L 0 540 Z" fill="#f2cd8a"/>
    ${bush(120, 470)}${bush(850, 460, 1.2)}${bush(700, 500, 0.8)}
    <ellipse cx="180" cy="500" rx="14" ry="5" fill="#b08968"/>
    <ellipse cx="780" cy="515" rx="10" ry="4" fill="#b08968"/>
    <ellipse cx="560" cy="525" rx="12" ry="4" fill="#b08968"/>
  </g>`;
}

// ---------- Người đàn ông: áo thobe trắng, khăn kẻ đỏ, dép đen ----------
// pose: "dao" (đào giếng) | "dung" (đứng) | "chi" (chỉ tay) | "uong" (uống nước)
// expression: "met" (mệt) | "ngac-nhien" | "vui"
export function manSVG(cx, feetY, t = 0, opts = {}) {
  const { expression = "met", pose = "dung" } = opts;
  const lean = pose === "dao" ? 10 : 0;
  const bob = pose === "dao" ? Math.sin(t * 6) * 2 : Math.sin(t * 3) * 2;
  const mouth = expression === "ngac-nhien"
    ? `<ellipse cx="6" cy="-165" rx="8" ry="9" fill="#5b2b2b" stroke="#222" stroke-width="2"/>`
    : expression === "vui"
      ? `<path d="M-4 -166 Q 8 -158 20 -166" stroke="#222" stroke-width="3" fill="none" stroke-linecap="round"/>`
      : `<path d="M-2 -166 L 16 -166" stroke="#222" stroke-width="3" stroke-linecap="round"/>`;
  const sweat = expression === "met"
    ? `<path d="M-38 -160 q-5 -10 0 -14 q5 4 0 14" fill="#7cc4e8" stroke="#2b6b8a" stroke-width="1.5"/><path d="M44 -150 q-4 -8 0 -11 q4 3 0 11" fill="#7cc4e8" stroke="#2b6b8a" stroke-width="1.5"/>` : "";
  // Tay áo trắng vẽ 2 lượt: viền đen dưới, trắng trên — để tay không chìm vào áo.
  const arm = (d) => `<path d="${d}" stroke="#222" stroke-width="19" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="#ffffff" stroke-width="15" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const arms = pose === "dao"
    ? `${arm("M-28 -158 L 8 -108 L 52 -66")}${arm("M28 -158 L 62 -110 L 78 -52")}
       <circle cx="52" cy="-66" r="10" fill="#c98a5b" stroke="#222" stroke-width="2.5"/>
       <circle cx="78" cy="-52" r="10" fill="#c98a5b" stroke="#222" stroke-width="2.5"/>
       <g><line x1="48" y1="-70" x2="112" y2="-2" stroke="#8a5a3b" stroke-width="8" stroke-linecap="round"/>
       <path d="M112 -2 L 136 14 L 122 30 L 100 16 Z" fill="#9aa5ad" stroke="#222" stroke-width="3" stroke-linejoin="round"/></g>`
    : pose === "chi"
      ? `${arm("M-28 -158 L -40 -100")}<circle cx="-40" cy="-98" r="10" fill="#c98a5b" stroke="#222" stroke-width="2.5"/>
         ${arm("M28 -158 L 78 -150 L 108 -148")}<circle cx="110" cy="-148" r="10" fill="#c98a5b" stroke="#222" stroke-width="2.5"/>`
      : pose === "uong"
        ? `${arm("M-28 -158 L -40 -100")}<circle cx="-40" cy="-98" r="10" fill="#c98a5b" stroke="#222" stroke-width="2.5"/>
           ${arm("M28 -158 L 46 -140 L 32 -138")}<circle cx="32" cy="-140" r="10" fill="#c98a5b" stroke="#222" stroke-width="2.5"/>
           <g><rect x="24" y="-162" width="15" height="22" rx="3" fill="#dff3ff" stroke="#222" stroke-width="2.5"/><rect x="26" y="-152" width="11" height="10" fill="#4aa8d8"/></g>`
        : `${arm("M-28 -158 L -38 -96")}<circle cx="-38" cy="-94" r="10" fill="#c98a5b" stroke="#222" stroke-width="2.5"/>
           ${arm("M28 -158 L 38 -96")}<circle cx="38" cy="-94" r="10" fill="#c98a5b" stroke="#222" stroke-width="2.5"/>`;
  return `<g data-char="man" transform="translate(${cx} ${feetY + bob}) rotate(${lean})">
    <ellipse cx="0" cy="8" rx="56" ry="8" fill="#000" opacity="0.15"/>
    <ellipse cx="-22" cy="-2" rx="16" ry="8" fill="#222" stroke="#222" stroke-width="2.5"/>
    <ellipse cx="22" cy="-2" rx="16" ry="8" fill="#222" stroke="#222" stroke-width="2.5"/>
    <path d="M-40 -178 L 40 -178 L 50 -10 L -50 -10 Z" fill="#ffffff" stroke="#222" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M-40 -178 L 40 -178 L 50 -10 L -50 -10 Z" fill="none" stroke="#222" stroke-width="1" opacity="0.2" transform="translate(1.5 1)"/>
    <path d="M-14 -178 L -10 -120" stroke="#ddd" stroke-width="2"/>
    <path d="M14 -178 L 10 -120" stroke="#ddd" stroke-width="2"/>
    <circle cx="0" cy="-168" r="2.5" fill="#888"/><circle cx="0" cy="-152" r="2.5" fill="#888"/><circle cx="0" cy="-136" r="2.5" fill="#888"/>
    <rect x="-34" y="-150" width="22" height="16" rx="3" fill="#ffffff" stroke="#222" stroke-width="2.5"/>
    ${arms}
    <circle cx="4" cy="-196" r="34" fill="#c98a5b" stroke="#222" stroke-width="3.5"/>
    <path d="M-28 -212 Q -30 -246 4 -246 Q 38 -246 34 -212 Q 34 -228 4 -226 Q -28 -228 -28 -212 Z" fill="url(#keff)" stroke="#222" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-30 -214 L -40 -168 L -24 -164 L -18 -210 Z" fill="url(#keff)" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M36 -214 L 44 -168 L 28 -164 L 22 -210 Z" fill="url(#keff)" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M-30 -232 Q 4 -244 36 -230" stroke="#111" stroke-width="9" fill="none" stroke-linecap="round"/>
    <path d="M-22 -206 L -6 -202" stroke="#222" stroke-width="4" stroke-linecap="round"/>
    <path d="M24 -206 L 10 -202" stroke="#222" stroke-width="4" stroke-linecap="round"/>
    <circle cx="-10" cy="-196" r="5" fill="#fff" stroke="#222" stroke-width="2"/>
    <circle cx="16" cy="-196" r="5" fill="#fff" stroke="#222" stroke-width="2"/>
    <circle cx="-8" cy="-196" r="2.5" fill="#222"/><circle cx="18" cy="-196" r="2.5" fill="#222"/>
    <path d="M0 -192 L -2 -182" stroke="#222" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M-14 -176 Q 4 -172 22 -176" stroke="#222" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M-6 -168 Q 4 -158 16 -168 Q 8 -160 -6 -168 Z" fill="#222"/>
    ${mouth}
    ${sweat}
  </g>`;
}

// ---------- Cậu bé: áo trắng nhỏ, mũ trắng, cầm ly nước ----------
// pose: "dung" | "uong"
export function childSVG(cx, feetY, t = 0, opts = {}) {
  const { pose = "dung" } = opts;
  const bob = Math.sin(t * 3 + 2) * 2;
  const armW = (d) => `<path d="${d}" stroke="#222" stroke-width="13" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" stroke="#ffffff" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const armR = pose === "uong"
    ? `${armW("M18 -96 L 30 -92 L 24 -104")}<circle cx="24" cy="-106" r="7" fill="#c98a5b" stroke="#222" stroke-width="2"/><g><rect x="16" y="-122" width="12" height="16" rx="2" fill="#dff3ff" stroke="#222" stroke-width="2"/><rect x="18" y="-114" width="8" height="7" fill="#4aa8d8"/></g>`
    : `${armW("M18 -96 L 26 -62")}<circle cx="26" cy="-60" r="7" fill="#c98a5b" stroke="#222" stroke-width="2"/>`;
  return `<g data-char="child" transform="translate(${cx} ${feetY + bob})">
    <ellipse cx="0" cy="6" rx="34" ry="6" fill="#000" opacity="0.15"/>
    <ellipse cx="-12" cy="-1" rx="10" ry="5" fill="#222"/>
    <ellipse cx="12" cy="-1" rx="10" ry="5" fill="#222"/>
    <path d="M-24 -108 L 24 -108 L 30 -6 L -30 -6 Z" fill="#ffffff" stroke="#222" stroke-width="3" stroke-linejoin="round"/>
    <path d="M-18 -96 L -24 -60" stroke="#222" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M-18 -96 L -24 -60" stroke="#ffffff" stroke-width="10" fill="none" stroke-linecap="round"/>
    <circle cx="-24" cy="-58" r="7" fill="#c98a5b" stroke="#222" stroke-width="2"/>
    ${armR}
    <circle cx="0" cy="-122" r="24" fill="#c98a5b" stroke="#222" stroke-width="3"/>
    <path d="M-24 -130 Q -22 -148 0 -148 Q 22 -148 24 -130 Q 0 -138 -24 -130 Z" fill="#ffffff" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="-8" cy="-122" r="2.5" fill="#222"/><circle cx="8" cy="-122" r="2.5" fill="#222"/>
    <path d="M-6 -114 Q 0 -110 6 -114" stroke="#222" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  </g>`;
}

// ---------- Nhà máy khử mặn bên bờ biển ----------
export function plantSVG(t = 0) {
  const steam = (x, y, s = 1) => {
    const dy = (t * 14) % 40;
    return `<g opacity="${(0.85 - dy / 50).toFixed(2)}" transform="translate(${x} ${y - dy}) scale(${s})">
      <circle cx="0" cy="0" r="10" fill="#ffffff"/><circle cx="12" cy="-8" r="8" fill="#ffffff"/><circle cx="-11" cy="-7" r="7" fill="#ffffff"/>
    </g>`;
  };
  return `<g>
    <rect x="0" y="380" width="430" height="160" fill="#4aa8d8"/>
    <rect x="0" y="380" width="430" height="160" fill="#7cc4e8" opacity="0.4"/>
    <path d="M0 410 Q 60 400 120 410 T 240 410 T 360 410" stroke="#fff" stroke-width="3" fill="none" opacity="0.7"/>
    <path d="M0 450 Q 70 440 140 450 T 280 450 T 420 450" stroke="#fff" stroke-width="3" fill="none" opacity="0.5"/>
    <rect x="0" y="460" width="430" height="80" fill="#e8d9a8"/>
    <rect x="430" y="380" width="530" height="160" fill="#e8b96f"/>
    <rect x="480" y="300" width="180" height="80" fill="#f5f5f5" stroke="#222" stroke-width="3.5"/>
    <path d="M480 300 Q 570 250 660 300 Z" fill="#4a90d9" stroke="#222" stroke-width="3.5"/>
    <rect x="690" y="320" width="150" height="60" fill="#f5f5f5" stroke="#222" stroke-width="3.5"/>
    <rect x="700" y="240" width="26" height="80" fill="#d96a4a" stroke="#222" stroke-width="3"/>
    <rect x="760" y="260" width="22" height="60" fill="#d96a4a" stroke="#222" stroke-width="3"/>
    ${steam(713, 228)}${steam(771, 248, 0.8)}
    <rect x="500" y="330" width="24" height="24" fill="#bfe8ff" stroke="#222" stroke-width="2.5"/>
    <rect x="540" y="330" width="24" height="24" fill="#bfe8ff" stroke="#222" stroke-width="2.5"/>
    <rect x="580" y="330" width="24" height="24" fill="#bfe8ff" stroke="#222" stroke-width="2.5"/>
    <path d="M380 470 L 480 470 L 480 430 L 660 430 L 660 380" stroke="#4a90d9" stroke-width="12" fill="none" stroke-linecap="round"/>
    <circle cx="380" cy="470" r="8" fill="#4a90d9" stroke="#222" stroke-width="2.5"/>
    <path d="M420 470 q10 -14 20 0 q10 -14 20 0" stroke="#fff" stroke-width="3" fill="none"/>
  </g>`;
}

// ---------- Thành phố + vòi nước ----------
export function citySVG(t = 0) {
  const tower = (x, w, h, col) => `<g><rect x="${x}" y="${470 - h}" width="${w}" height="${h}" fill="${col}" stroke="#222" stroke-width="3"/>
    ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${x + 12 + c * (w / 3)}" y="${470 - h + 18 + r * 34}" width="16" height="18" fill="#bfe8ff" stroke="#222" stroke-width="2"/>`).join("")).join("")}</g>`;
  return `<g>
    <rect x="0" y="380" width="960" height="160" fill="#8fce6e"/>
    ${tower(60, 110, 120, "#fff3d6")}${tower(210, 90, 100, "#ffeec2")}${tower(700, 110, 130, "#fff3d6")}${tower(840, 80, 90, "#ffeec2")}
    <g><circle cx="110" cy="412" r="26" fill="#5da24a" stroke="#222" stroke-width="3"/><rect x="106" y="412" width="8" height="40" fill="#8a5a3b" stroke="#222" stroke-width="2.5"/></g>
    <g><circle cx="890" cy="412" r="26" fill="#6db35a" stroke="#222" stroke-width="3"/><rect x="886" y="412" width="8" height="40" fill="#8a5a3b" stroke="#222" stroke-width="2.5"/></g>
    <g>
      <rect x="470" y="330" width="16" height="140" fill="#9aa5ad" stroke="#222" stroke-width="3"/>
      <path d="M470 330 L 530 330 L 530 352 L 486 352 Z" fill="#9aa5ad" stroke="#222" stroke-width="3"/>
      <circle cx="524" cy="352" r="7" fill="#4a90d9" stroke="#222" stroke-width="2.5"/>
      <path d="M524 360 Q 520 ${380 + Math.sin(t * 4) * 2} 524 396" stroke="#4aa8d8" stroke-width="7" fill="none" stroke-linecap="round"/>
      <ellipse cx="524" cy="404" rx="26" ry="7" fill="#4aa8d8" opacity="0.7"/>
    </g>
  </g>`;
}
