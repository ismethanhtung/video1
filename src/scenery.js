// Phong cảnh vẽ bằng code: trời, mây, mặt trời, nhà, cây, chó, sông.
// Mọi thứ đều là tham số theo thời gian t (giây) nên chuyển động được,
// không cần file ảnh hay video quay sẵn.

// Mây trôi: x dịch theo thời gian, quay lại từ đầu khi ra khỏi khung.
export function cloudsSVG(t, y = 60) {
  const c = (base, speed, yy, s = 1) => {
    const x = ((base + t * speed) % 1100) - 100;
    return `<g transform="translate(${x} ${yy}) scale(${s})" fill="#ffffff" opacity="0.95">
      <ellipse cx="0" cy="0" rx="46" ry="20"/><ellipse cx="36" cy="-8" rx="34" ry="18"/><ellipse cx="-34" cy="-4" rx="30" ry="16"/>
    </g>`;
  };
  return c(80, 6, y, 1) + c(420, 4, y + 36, 0.8) + c(760, 7, y + 8, 1.1);
}

export function sunSVG(x = 820, y = 70) {
  return `<g><circle cx="${x}" cy="${y}" r="34" fill="#ffd93d" stroke="#f2a900" stroke-width="3"/>
  ${[0,45,90,135,180,225,270,315].map(a => {
    const r = a * Math.PI / 180, x1 = x + Math.cos(r) * 44, y1 = y + Math.sin(r) * 44;
    const x2 = x + Math.cos(r) * 56, y2 = y + Math.sin(r) * 56;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#f2a900" stroke-width="4" stroke-linecap="round"/>`;
  }).join("")}</g>`;
}

export function birdsSVG(t) {
  const x = ((t * 18) % 1100) - 80;
  return `<g stroke="#333" stroke-width="3" fill="none" stroke-linecap="round">
    <path d="M${x} 90 q10 -10 20 0 q10 -10 20 0"/>
    <path d="M${x + 70} 70 q8 -8 16 0 q8 -8 16 0"/>
    <path d="M${x + 150} 105 q8 -8 16 0 q8 -8 16 0"/>
  </g>`;
}

export function houseSVG(x = 90, y = 300) {
  return `<g>
    <rect x="${x}" y="${y}" width="180" height="130" fill="#fff3d6" stroke="#222" stroke-width="4"/>
    <path d="M${x - 18} ${y} L${x + 90} ${y - 70} L${x + 198} ${y} Z" fill="#d96a4a" stroke="#222" stroke-width="4"/>
    <rect x="${x + 72}" y="${y + 62}" width="36" height="68" fill="#8a5a3b" stroke="#222" stroke-width="3"/>
    <rect x="${x + 20}" y="${y + 26}" width="36" height="36" fill="#bfe8ff" stroke="#222" stroke-width="3"/>
    <rect x="${x + 124}" y="${y + 26}" width="36" height="36" fill="#bfe8ff" stroke="#222" stroke-width="3"/>
    <text x="${x + 90}" y="${y - 78}" text-anchor="middle" font-size="16" font-weight="bold" fill="#333">NHÀ CỦA A</text>
  </g>`;
}

// Cây rung theo gió: tán cây nghiêng theo sin(t), lá rụng rơi xuống.
export function treeSVG(x = 620, y = 430, t = 0, scale = 1) {
  const sway = Math.sin(t * 1.6) * 5;
  const leaves = [0, 1, 2, 3, 4, 5].map(i => {
    const lx = x + ((i * 53 + 20) % 120) - 60;
    const ly = 300 + ((t * 22 + i * 47) % 130);
    const r = (t * 90 + i * 60) % 360;
    return `<ellipse cx="${lx}" cy="${ly}" rx="7" ry="4" fill="#7fb069" transform="rotate(${r.toFixed(0)} ${lx} ${ly})"/>`;
  }).join("");
  return `<g>
    <rect x="${x - 10}" y="${y - 110}" width="20" height="110" fill="#8a5a3b" stroke="#222" stroke-width="3"/>
    <g transform="rotate(${sway.toFixed(1)} ${x} ${y - 110})">
      <circle cx="${x - 34}" cy="${y - 140}" r="42" fill="#5da24a" stroke="#222" stroke-width="3"/>
      <circle cx="${x + 34}" cy="${y - 140}" r="42" fill="#5da24a" stroke="#222" stroke-width="3"/>
      <circle cx="${x}" cy="${y - 178}" r="48" fill="#6db35a" stroke="#222" stroke-width="3"/>
    </g>
    ${leaves}
  </g>`;
}

export function dogSVG(x = 300, y = 430, t = 0) {
  const wag = Math.sin(t * 8) * 12;
  const leg = Math.sin(t * 10) * 6;
  return `<g transform="translate(${x} ${y})">
    <ellipse cx="0" cy="0" rx="34" ry="18" fill="#c98a4b" stroke="#222" stroke-width="3"/>
    <circle cx="34" cy="-16" r="16" fill="#c98a4b" stroke="#222" stroke-width="3"/>
    <path d="M28 -28 q6 -12 14 -8 q2 12 -6 14z" fill="#a86a2e" stroke="#222" stroke-width="2"/>
    <circle cx="40" cy="-18" r="2.5" fill="#222"/><circle cx="48" cy="-12" r="4" fill="#222"/>
    <path d="M-32 -6 q-16 -${(10 + wag).toFixed(0)} -20 -22" stroke="#222" stroke-width="5" fill="none" stroke-linecap="round"/>
    <line x1="-20" y1="14" x2="${(-20 + leg).toFixed(0)}" y2="26" stroke="#222" stroke-width="5" stroke-linecap="round"/>
    <line x1="20" y1="14" x2="${(20 - leg).toFixed(0)}" y2="26" stroke="#222" stroke-width="5" stroke-linecap="round"/>
    <text x="0" y="-38" text-anchor="middle" font-size="13" font-weight="bold" fill="#333">🐶 Vàng</text>
  </g>`;
}

export function riverSVG(t = 0) {
  const wave = (y, amp, speed) => {
    let d = `M0 ${y}`;
    for (let x = 0; x <= 960; x += 60) {
      d += ` Q ${x + 30} ${y + Math.sin(t * speed + x / 90) * amp} ${x + 60} ${y}`;
    }
    return `<path d="${d}" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.7"/>`;
  };
  return `<g>
    <rect x="0" y="400" width="960" height="140" fill="#4aa8d8"/>
    <rect x="0" y="400" width="960" height="140" fill="#7cc4e8" opacity="0.4"/>
    ${wave(430, 6, 2)}${wave(470, 8, 1.6)}${wave(510, 5, 2.4)}
    <g transform="translate(${((t * 30) % 900 + 40).toFixed(0)} 445)">
      <path d="M0 0 q14 -16 28 0 q14 -16 28 0 l-6 10 q-22 -12 -44 0z" fill="#ff8a5c" stroke="#222" stroke-width="2"/>
    </g>
  </g>`;
}

// Bong bóng thoại: chữ nằm trong khung trắng, đuôi chỉ xuống nhân vật.
export function speechSVG(text, x, y, w = 340) {
  if (!text) return "";
  const lines = [];
  let cur = "";
  for (const word of text.split(" ")) {
    if ((cur + " " + word).trim().length > 26) { lines.push(cur.trim()); cur = word; }
    else cur += " " + word;
  }
  if (cur.trim()) lines.push(cur.trim());
  const h = 24 + lines.length * 22;
  return `<g>
    <rect x="${x - w / 2}" y="${y - h}" width="${w}" height="${h}" rx="16" fill="#ffffff" stroke="#222" stroke-width="3"/>
    <path d="M${x - 12} ${y} L${x + 4} ${y + 22} L${x + 18} ${y} Z" fill="#ffffff" stroke="#222" stroke-width="3"/>
    ${lines.map((ln, i) => `<text x="${x}" y="${y - h + 28 + i * 22}" text-anchor="middle" font-size="17" fill="#222">${ln}</text>`).join("")}
  </g>`;
}
