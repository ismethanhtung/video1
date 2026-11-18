// Làng quê kiểu ảnh bạn gửi: "Chuyện Ma Đêm Khuya Radio".
// Palette lấy đúng từ ảnh: trời chiều vàng cam #e8c99a, bụi xanh đậm,
// nhà tường be, mái lá nâu, đường đất, cỏ xanh trầm.
// Nhân vật: đầu tròn, mắt nhắm cười, viền đen dày, nhãn tên trong hộp trắng.
// Má (áo tím, tóc búi), Anh Hai (áo xanh lá, cao), Tôi (áo sọc đỏ trắng, nhỏ),
// chó vàng nâu bên phải.

export const VILLAGE = {
  skyDay: ["#f2d49b", "#e8c99a"],
  skyDusk: ["#e8a56b", "#f5d9a0"],
  skyNight: ["#2e3a5e", "#5a6b8a"],
  bush: "#3d6b4a",
  grass: "#5d7d4f",
  road: "#b59a6a",
  houseWall: "#d9b98c",
  roof: "#8a6b3a",
};

export const FAMILY = {
  "Má":      { label: "Má",      shirt: "#8e6ba8", pants: "#2f3a5e", hair: "bun",   height: 1.0,  glasses: false },
  "Anh Hai":  { label: "Anh Hai", shirt: "#4a7d5a", pants: "#2f3a5e", hair: "short", height: 0.95, glasses: false },
  "Tôi":      { label: "Tôi",     shirt: "striped", pants: "#2f3a5e", hair: "short", height: 0.78, glasses: false },
};

export function palmTreeSVG(x, y, t = 0, s = 1) {
  const sway = Math.sin(t * 1.2 + x) * 4;
  const leaf = (angle) => {
    const r = angle * Math.PI / 180;
    const x2 = x + Math.cos(r) * 78 * s, y2 = y - 18 * s + Math.sin(r) * 42 * s;
    return `<path d="M${x} ${y - 10 * s} Q ${(x + x2) / 2} ${(y - 10 * s + y2) / 2 - 26 * s} ${x2.toFixed(0)} ${y2.toFixed(0)}" stroke="#2e5d3a" stroke-width="${14 * s}" fill="none" stroke-linecap="round"/>`;
  };
  return `<g transform="rotate(${sway.toFixed(1)} ${x} ${y})">
    <path d="M${x} ${y} Q ${x + 6} ${y - 90 * s} ${x} ${y - 170 * s}" stroke="#5b3a29" stroke-width="${13 * s}" fill="none" stroke-linecap="round"/>
    ${[200, 235, 270, 305, 340, 15].map(leaf).join("")}
    <circle cx="${x - 10}" cy="${y - 168 * s}" r="${9 * s}" fill="#6b4a2a"/>
    <circle cx="${x + 10}" cy="${y - 164 * s}" r="${9 * s}" fill="#6b4a2a"/>
  </g>`;
}

export function thatchedHouseSVG(x, y, w = 190) {
  const h = w * 0.62;
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${VILLAGE.houseWall}" stroke="#222" stroke-width="4"/>
    <path d="M${x - 16} ${y} L${x + w / 2} ${y - 52} L${x + w + 16} ${y} Z" fill="${VILLAGE.roof}" stroke="#222" stroke-width="4"/>
    ${[0.2, 0.35, 0.5, 0.65, 0.8].map(f => `<line x1="${(x + w * f).toFixed(0)}" y1="${(y - 52 + Math.abs(f - 0.5) * 52).toFixed(0)}" x2="${(x + w * f).toFixed(0)}" y2="${y}" stroke="#6b4a2a" stroke-width="2"/>`).join("")}
    <rect x="${x + w * 0.28}" y="${y + h * 0.42}" width="${w * 0.18}" height="${h * 0.58}" fill="#5b3a29" stroke="#222" stroke-width="3"/>
    <rect x="${x + w * 0.62}" y="${y + h * 0.22}" width="${w * 0.2}" height="${h * 0.3}" fill="#2e3a5e" stroke="#222" stroke-width="3"/>
  </g>`;
}

function shirtSVG(kind, x, y, w, h) {
  if (kind === "striped") return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="#ffffff" stroke="#222" stroke-width="3"/>
    ${[0.25, 0.5, 0.75].map(f => `<rect x="${x}" y="${(y + h * f).toFixed(0)}" width="${w}" height="7" fill="#d94f3d"/>`).join("")}`;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${kind}" stroke="#222" stroke-width="3"/>`;
}

// Một người trong làng: đầu tròn, mắt nhắm cười, miệng cười, nhãn tên phía trên.
export function villagerSVG(name, cx, groundY, t = 0) {
  const p = FAMILY[name];
  const s = p.height;
  const headR = 44 * s, bodyW = 62 * s, bodyH = 78 * s;
  const headY = groundY - bodyH - headR * 1.15;
  const bob = Math.sin(t * 5 + cx) * 2;
  const hair = p.hair === "bun"
    ? `<circle cx="${cx}" cy="${headY - headR - 6}" r="${14 * s}" fill="#222"/><path d="M${cx - headR} ${headY - 8} Q ${cx} ${headY - headR - 22} ${cx + headR} ${headY - 8} L ${cx + headR} ${headY - headR} Q ${cx} ${headY - headR - 14} ${cx - headR} ${headY - headR} Z" fill="#222"/>`
    : `<path d="M${cx - headR} ${headY} Q ${cx - headR} ${headY - headR} ${cx} ${headY - headR} Q ${cx + headR} ${headY - headR} ${cx + headR} ${headY} Q ${cx} ${headY - headR * 0.55} ${cx - headR} ${headY} Z" fill="#222"/>`;
  return `<g transform="translate(0 ${bob.toFixed(1)})">
    <ellipse cx="${cx}" cy="${groundY + 6}" rx="${46 * s}" ry="7" fill="#000" opacity="0.18"/>
    <rect x="${cx - 17 * s}" y="${groundY - 52 * s}" width="${14 * s}" height="52" fill="#2f3a5e" stroke="#222" stroke-width="2.5"/>
    <rect x="${cx + 3 * s}" y="${groundY - 52 * s}" width="${14 * s}" height="52" fill="#2f3a5e" stroke="#222" stroke-width="2.5"/>
    ${shirtSVG(p.shirt, cx - bodyW / 2, headY + headR * 0.85, bodyW, bodyH)}
    <circle cx="${cx - bodyW / 2 + 6}" cy="${headY + headR * 0.85 + bodyH - 8}" r="8" fill="#ffe0bd" stroke="#222" stroke-width="2.5"/>
    <circle cx="${cx}" cy="${headY}" r="${headR}" fill="#ffe0bd" stroke="#222" stroke-width="3.5"/>
    ${hair}
    <path d="M${cx - 24 * s} ${headY - 2} Q ${cx - 14 * s} ${headY - 12} ${cx - 4 * s} ${headY - 2}" stroke="#222" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M${cx + 4 * s} ${headY - 2} Q ${cx + 14 * s} ${headY - 12} ${cx + 24 * s} ${headY - 2}" stroke="#222" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path d="M${cx - 22 * s} ${headY - 18} L ${cx - 6 * s} ${headY - 15}" stroke="#222" stroke-width="3" stroke-linecap="round"/>
    <path d="M${cx + 6 * s} ${headY - 15} L ${cx + 22 * s} ${headY - 18}" stroke="#222" stroke-width="3" stroke-linecap="round"/>
    <path d="M${cx - 13 * s} ${headY + 18} Q ${cx} ${headY + 30} ${cx + 13 * s} ${headY + 18} Q ${cx} ${headY + 24} ${cx - 13 * s} ${headY + 18} Z" fill="#8a2e2e" stroke="#222" stroke-width="2.5"/>
    <g><rect x="${cx - 34}" y="${headY - headR - 52}" width="68" height="30" rx="8" fill="#ffffff" stroke="#222" stroke-width="2.5"/>
    <text x="${cx}" y="${headY - headR - 31}" text-anchor="middle" font-size="17" font-weight="bold" fill="#111">${p.label}</text></g>
  </g>`;
}

export function villageDogSVG(x, groundY, t = 0) {
  const wag = Math.sin(t * 7) * 10;
  return `<g transform="translate(${x} ${groundY})">
    <ellipse cx="0" cy="0" rx="42" ry="20" fill="#c98a4b" stroke="#222" stroke-width="3"/>
    <circle cx="42" cy="-18" r="18" fill="#c98a4b" stroke="#222" stroke-width="3"/>
    <path d="M36 -32 l6 -14 8 12z M52 -32 l6 -14 8 12z" fill="#c98a4b" stroke="#222" stroke-width="2.5"/>
    <circle cx="48" cy="-20" r="2.5" fill="#222"/><circle cx="56" cy="-12" r="5" fill="#f5e6c8" stroke="#222" stroke-width="2"/>
    <path d="M-40 -8 q-18 -${(12 + wag).toFixed(0)} -14 -28" stroke="#c98a4b" stroke-width="7" fill="none" stroke-linecap="round"/>
    <line x1="-24" y1="16" x2="-24" y2="30" stroke="#222" stroke-width="5" stroke-linecap="round"/>
    <line x1="-6" y1="16" x2="-6" y2="30" stroke="#222" stroke-width="5" stroke-linecap="round"/>
    <line x1="14" y1="16" x2="14" y2="30" stroke="#222" stroke-width="5" stroke-linecap="round"/>
    <line x1="30" y1="16" x2="30" y2="30" stroke="#222" stroke-width="5" stroke-linecap="round"/>
  </g>`;
}

// Phụ đề kiểu video kể chuyện: thanh đen dưới cùng, chữ trắng lớn.
export function subtitleBarSVG(text, y = 492) {
  if (!text) return "";
  const words = text.split(" ");
  const lines = []; let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > 52) { lines.push(cur.trim()); cur = w; }
    else cur += " " + w;
  }
  if (cur.trim()) lines.push(cur.trim());
  const h = 14 + lines.length * 26;
  return `<g><rect x="0" y="${y}" width="960" height="${h + 10}" fill="#000000" opacity="0.88"/>
  ${lines.map((ln, i) => `<text x="480" y="${y + 28 + i * 26}" text-anchor="middle" font-size="21" font-weight="bold" fill="#ffffff">${ln}</text>`).join("")}</g>`;
}
