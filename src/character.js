// Nhân vật được vẽ 100% bằng code (SVG), không dùng file ảnh.
// Mọi biểu cảm / tư thế chỉ là tham số thay đổi hình vẽ.
// Gốc ý tưởng: video "Claude Làm Nhân Vật 2D?" - Claude viết code để vẽ,
// không vẽ tay, không dùng AI tạo ảnh.

export const EXPRESSIONS = {
  "vui":        { label: "Vui",        eyes: "tron",  mouth: "cuoi",      cheeks: true },
  "cuoi-lon":   { label: "Cười lớn",   eyes: "nham",  mouth: "cuoi-lon",  cheeks: true },
  "ngac-nhien":{ label: "Ngạc nhiên", eyes: "tron",  mouth: "tron",      cheeks: false },
  "buon":       { label: "Buồn",       eyes: "buon",  mouth: "buon",      cheeks: false },
  "nhay-mat":   { label: "Nháy mắt",   eyes: "nhay",  mouth: "cuoi",      cheeks: true },
  "mat-tim":    { label: "Mắt tim",    eyes: "tim",   mouth: "cuoi",      cheeks: true },
};

export const POSES = {
  "vay-tay":    { label: "Vẫy tay",    armR: -150, armL: 15,  jump: 0 },
  "nhay":       { label: "Nhảy lên",   armR: -120, armL: -120, jump: -18 },
  "chi-tay":    { label: "Chỉ tay",    armR: -90,  armL: 15,  jump: 0 },
  "giơ-hai-tay":{ label: "Giơ hai tay",armR: -160, armL: -160, jump: 0 },
  "cui-chao":   { label: "Cúi chào",   armR: 20,   armL: 20,  jump: 0, bow: 12 },
  "dung-yen":   { label: "Đứng yên",   armR: 15,   armL: 15,  jump: 0 },
};

function eyesSVG(kind) {
  // Mắt trái ở x=118, mắt phải ở x=182, y=150
  if (kind === "nham") return `
    <path d="M102 150 Q118 138 134 150" stroke="#222" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M166 150 Q182 138 198 150" stroke="#222" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  if (kind === "buon") return `
    <circle cx="118" cy="152" r="13" fill="#fff" stroke="#222" stroke-width="4"/>
    <circle cx="118" cy="156" r="5" fill="#222"/>
    <circle cx="182" cy="152" r="13" fill="#fff" stroke="#222" stroke-width="4"/>
    <circle cx="182" cy="156" r="5" fill="#222"/>
    <path d="M104 132 Q118 126 132 132" stroke="#222" stroke-width="4" fill="none" stroke-linecap="round"/>
    <path d="M168 132 Q182 126 196 132" stroke="#222" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  if (kind === "nhay") return `
    <path d="M102 150 Q118 138 134 150" stroke="#222" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="182" cy="150" r="13" fill="#fff" stroke="#222" stroke-width="4"/>
    <circle cx="182" cy="150" r="5" fill="#222"/>`;
  if (kind === "tim") return `
    <path d="M118 138 c-8 -8 -18 0 -12 9 l12 11 12 -11 c6 -9 -4 -17 -12 -9z" fill="#e5484d"/>
    <path d="M182 138 c-8 -8 -18 0 -12 9 l12 11 12 -11 c6 -9 -4 -17 -12 -9z" fill="#e5484d"/>`;
  // tron (mặc định)
  return `
    <circle cx="118" cy="150" r="13" fill="#fff" stroke="#222" stroke-width="4"/>
    <circle cx="118" cy="150" r="5" fill="#222"/>
    <circle cx="182" cy="150" r="13" fill="#fff" stroke="#222" stroke-width="4"/>
    <circle cx="182" cy="150" r="5" fill="#222"/>`;
}

function mouthSVG(kind) {
  if (kind === "cuoi-lon") return `<path d="M132 178 Q150 202 168 178 Q150 188 132 178z" fill="#7a2e2e" stroke="#222" stroke-width="3"/>`;
  if (kind === "tron") return `<circle cx="150" cy="184" r="9" fill="#7a2e2e" stroke="#222" stroke-width="3"/>`;
  if (kind === "buon") return `<path d="M134 190 Q150 176 166 190" stroke="#222" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  // cuoi (mặc định)
  return `<path d="M132 178 Q150 194 168 178" stroke="#222" stroke-width="4" fill="none" stroke-linecap="round"/>`;
}

function glassesSVG() {
  return `
    <circle cx="118" cy="150" r="20" fill="none" stroke="#222" stroke-width="4"/>
    <circle cx="182" cy="150" r="20" fill="none" stroke="#222" stroke-width="4"/>
    <path d="M138 150 L162 150" stroke="#222" stroke-width="4"/>
    <path d="M98 148 L88 144 M202 148 L212 144" stroke="#222" stroke-width="4" stroke-linecap="round"/>`;
}

// Tay là một nhóm quay quanh vai. Góc quay = tham số của pose.
function armSVG(side, angle, shirt) {
  const x = side === "R" ? 196 : 104;
  const dir = side === "R" ? 1 : -1;
  return `
  <g transform="rotate(${angle * dir} ${x} 215)">
    <rect x="${x - 13}" y="210" width="26" height="78" rx="13" fill="${shirt}" stroke="#222" stroke-width="3.5"/>
    <circle cx="${x}" cy="296" r="13" fill="#ffe0bd" stroke="#222" stroke-width="3.5"/>
  </g>`;
}

export function renderCharacter({ expression = "vui", pose = "vay-tay", shirt = "#f2b234", bg = "#faf7f2" } = {}) {
  const exp = EXPRESSIONS[expression] || EXPRESSIONS["vui"];
  const p = POSES[pose] || POSES["vay-tay"];
  const bow = p.bow || 0;
  const jump = p.jump || 0;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 380" width="300" height="380" role="img" aria-label="Cậu bé áo vàng">
  <rect width="300" height="380" fill="${bg}"/>
  <g transform="translate(0 ${jump}) rotate(${bow} 150 200)">
    <!-- chân -->
    <rect x="128" y="300" width="18" height="48" rx="6" fill="#2f3a5e" stroke="#222" stroke-width="3"/>
    <rect x="154" y="300" width="18" height="48" rx="6" fill="#2f3a5e" stroke="#222" stroke-width="3"/>
    <ellipse cx="137" cy="354" rx="17" ry="9" fill="#222"/>
    <ellipse cx="163" cy="354" rx="17" ry="9" fill="#222"/>
    <!-- tay -->
    ${armSVG("L", p.armL, shirt)}
    ${armSVG("R", p.armR, shirt)}
    <!-- thân: áo hoodie -->
    <rect x="102" y="205" width="96" height="102" rx="22" fill="${shirt}" stroke="#222" stroke-width="4"/>
    <rect x="128" y="262" width="44" height="30" rx="4" fill="none" stroke="#222" stroke-width="3"/>
    <path d="M138 212 v22 M162 212 v22" stroke="#222" stroke-width="3" stroke-linecap="round"/>
    <!-- đầu -->
    <circle cx="150" cy="150" r="62" fill="#ffe0bd" stroke="#222" stroke-width="4"/>
    <!-- tóc -->
    <path d="M92 138 Q88 82 150 80 Q212 82 208 138 Q196 106 178 104 Q186 92 172 88 Q168 100 150 96 Q132 100 128 88 Q114 92 122 104 Q104 106 92 138z" fill="#222"/>
    <!-- má hồng -->
    ${exp.cheeks ? `<circle cx="106" cy="172" r="9" fill="#f7a8a8" opacity="0.7"/><circle cx="194" cy="172" r="9" fill="#f7a8a8" opacity="0.7"/>` : ""}
    <!-- mắt, kính, miệng -->
    ${eyesSVG(exp.eyes)}
    ${glassesSVG()}
    ${mouthSVG(exp.mouth)}
  </g>
</svg>`.trim();
}
