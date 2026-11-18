import { VILLAGE, villagerSVG, villageDogSVG, palmTreeSVG, thatchedHouseSVG, subtitleBarSVG } from "./village.js";
import { cloudsSVG, birdsSVG, speechSVG } from "./scenery.js";

// Phim "Chuyện làng quê" — 90 giây, 6 cảnh × 15 giây.
// Kể theo đúng ảnh bạn gửi: Má chèo xuồng bán chè đậu dọc mấy con rạch,
// xóm có điều kiêng ở khúc sông có người chết đuối.
// Giọng kể chậm, phụ đề lớn, không hù dọa đột ngột.
export const VILLAGE_STORY = [
  {
    id: 1, title: "Chiều ở xóm", dur: 15, sky: "day",
    sub: "Má tôi chèo xuồng bán chè đậu dọc mấy con rạch.",
    dialogue: "Má về rồi đây, mấy đứa ăn chè không?",
    speaker: "Má",
  },
  {
    id: 2, title: "Má chèo xuồng trên rạch", dur: 15, sky: "day",
    sub: "Xuồng má lướt nhẹ trên rạch, nước lăn tăn hai bên bờ dừa.",
    dialogue: "Anh Hai, coi chừng em té xuống rạch đó!",
    speaker: "Má",
  },
  {
    id: 3, title: "Đi dọc bờ rạch", dur: 15, sky: "day",
    sub: "Hai anh em đi dọc bờ rạch, cây dừa rung, lá rơi, chó chạy trước.",
    dialogue: "Anh Hai ơi, sao khúc sông này không ai tắm vậy?",
    speaker: "Tôi",
  },
  {
    id: 4, title: "Điều kiêng của xóm", dur: 15, sky: "dusk",
    sub: "Xóm tôi có một điều kiêng: khúc sông nào có người chết đuối, thì ba năm không ai được xuống tắm một mình.",
    dialogue: "Nhớ lời má dặn: không tắm một mình, nghe chưa?",
    speaker: "Anh Hai",
  },
  {
    id: 5, title: "Sáng hôm sau", dur: 15, sky: "day",
    sub: "Sáng hôm sau, nắng lên, mây trắng, cả nhà lại ra sông như mọi ngày.",
    dialogue: "Đi thôi, hôm nay má bán chè, hai đứa phụ má chèo xuồng.",
    speaker: "Má",
  },
  {
    id: 6, title: "Về nhà lúc hoàng hôn", dur: 15, sky: "dusk",
    sub: "Hoàng hôn xuống, chó chạy trước, cả nhà cười, xóm lại yên bình.",
    dialogue: "Ngày mai mình lại đi bán chè nhé, Má!",
    speaker: "Tôi",
  },
];

export const VILLAGE_DURATION = VILLAGE_STORY.reduce((s, c) => s + c.dur, 0); // 90

export function villageSceneAt(sec) {
  let acc = 0;
  for (let i = 0; i < VILLAGE_STORY.length; i++) {
    const sc = VILLAGE_STORY[i];
    if (sec < acc + sc.dur) return { scene: sc, index: i, progress: (sec - acc) / sc.dur, localT: sec - acc };
    acc += sc.dur;
  }
  const last = VILLAGE_STORY[VILLAGE_STORY.length - 1];
  return { scene: last, index: VILLAGE_STORY.length - 1, progress: 1, localT: last.dur };
}

function skyColors(kind) {
  if (kind === "dusk") return VILLAGE.skyDusk;
  if (kind === "night") return VILLAGE.skyNight;
  return VILLAGE.skyDay;
}

export function renderVillageFrame(t) {
  const { scene, index, progress } = villageSceneAt(t);
  const [skyTop, skyBot] = skyColors(scene.sky);
  const walkX = 200 + progress * 380;

  // Bối cảnh chung: 3 căn nhà lá, cây dừa, bụi cây, đường đất, cỏ.
  const houses = thatchedHouseSVG(60, 210, 190) + thatchedHouseSVG(390, 200, 210) + thatchedHouseSVG(730, 210, 190);
  const bushes = `<rect x="0" y="300" width="960" height="36" fill="${VILLAGE.bush}"/>`;
  const ground = `<rect x="0" y="336" width="960" height="204" fill="${VILLAGE.grass}"/>`;
  const road = `<rect x="0" y="336" width="960" height="52" fill="${VILLAGE.road}"/>`;

  let people = "", extra = "";
  if (index === 0 || index === 5) {
    people = villagerSVG("Má", 300, 470, t) + villagerSVG("Anh Hai", 480, 470, t) + villagerSVG("Tôi", 620, 470, t) + villageDogSVG(780, 470, t);
  } else if (index === 1) {
    // Má trên xuồng giữa rạch, hai anh em đứng bờ vẫy tay.
    people = villagerSVG("Anh Hai", 220, 470, t) + villagerSVG("Tôi", 340, 470, t) + villageDogSVG(120, 470, t);
    extra = `<g transform="translate(${580 + Math.sin(t) * 6} 400)">
      <path d="M0 0 L170 0 L150 26 L20 26 Z" fill="#8a5a3b" stroke="#222" stroke-width="3"/>
      <g transform="translate(60 -120)">${villagerSVG("Má", 40, 120, t)}</g>
      <path d="M0 6 q20 8 40 0 q20 8 40 0 q20 8 40 0" stroke="#fff" stroke-width="2" fill="none" opacity="0.7"/>
    </g>
    <rect x="0" y="400" width="960" height="140" fill="#4aa8d8" opacity="0.35"/>`;
  } else if (index === 2) {
    people = villagerSVG("Anh Hai", walkX, 470, t) + villagerSVG("Tôi", walkX + 130, 470, t) + villageDogSVG(walkX + 260, 470, t);
  } else if (index === 3) {
    people = villagerSVG("Má", 300, 470, t) + villagerSVG("Anh Hai", 480, 470, t) + villagerSVG("Tôi", 620, 470, t);
    extra = `<circle cx="800" cy="120" r="28" fill="#f5e6c8" opacity="0.9"/><text x="800" y="170" text-anchor="middle" font-size="14" fill="#fff">🌙 trăng lên</text>`;
  } else {
    people = villagerSVG("Má", 300, 470, t) + villagerSVG("Anh Hai", 480, 470, t) + villagerSVG("Tôi", 620, 470, t) + villageDogSVG(780, 470, t);
  }

  const speakerX = scene.speaker === "Má" ? 300 : scene.speaker === "Anh Hai" ? 480 : 620;
  const speech = index === 1 ? "" : speechSVG(scene.dialogue, Math.min(Math.max(speakerX, 200), 760), 150, 360);

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540" role="img" aria-label="Chuyện làng quê: ${scene.title}">
  <defs><linearGradient id="vsky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${skyTop}"/><stop offset="100%" stop-color="${skyBot}"/>
  </linearGradient></defs>
  <rect width="960" height="540" fill="url(#vsky)"/>
  ${cloudsSVG(t)}
  ${birdsSVG(t)}
  ${palmTreeSVG(330, 330, t, 1.15)}
  ${palmTreeSVG(700, 330, t + 1, 1.05)}
  ${houses}
  ${bushes}
  ${ground}
  ${road}
  ${extra}
  ${people}
  ${speech}
  <rect x="0" y="452" width="960" height="20" fill="#000" opacity="0.25"/>
  <text x="20" y="470" font-size="15" fill="#fff">Cảnh ${scene.id}/6 — ${scene.title} • Chuyện Ma Đêm Khuya Radio</text>
  ${subtitleBarSVG(scene.sub, 486)}
  <text x="940" y="470" text-anchor="end" font-size="14" fill="#fff">${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")} / 1:30</text>
</svg>`.trim();
}
