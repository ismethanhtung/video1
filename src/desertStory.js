import { desertSunSVG, dunesSVG, manSVG, childSVG, plantSVG, citySVG } from "./desert.js";
import { speechSVG } from "./scenery.js";
import { subtitleBarSVG } from "./village.js";

// Phim ngắn "Sa mạc không sông" — 30 giây, 3 cảnh × 10 giây.
// Theo video bạn gửi: Ả Rập Xê Út không có con sông nào, lấy nước uống từ đâu?
// 1) Đào giếng giữa sa mạc nắng gắt mà không thấy nước.
// 2) Nhà máy khử mặn bên bờ biển biến nước biển thành nước ngọt.
// 3) Nước ngọt theo đường ống tới mọi nhà, cả thành phố có nước uống.
export const DESERT_STORY = [
  {
    id: 1, title: "Đào giếng giữa sa mạc", dur: 10, sky: "day",
    sub: "Ả Rập Xê Út không có con sông nào chảy quanh năm.",
    dialogue: "Đào mãi mà chẳng thấy nước đâu!",
    speaker: "man",
  },
  {
    id: 2, title: "Nhà máy khử mặn", dur: 10, sky: "day",
    sub: "Nước biển được đưa vào nhà máy khử mặn khổng lồ.",
    dialogue: "Họ lấy nước ngọt từ biển!",
    speaker: "man",
  },
  {
    id: 3, title: "Nước ngọt tới mọi nhà", dur: 10, sky: "day",
    sub: "Nước ngọt theo ống tới từng nhà trong thành phố.",
    dialogue: "Giờ thì cả thành phố đều có nước uống!",
    speaker: "man",
  },
];

export const DESERT_DURATION = DESERT_STORY.reduce((s, c) => s + c.dur, 0); // 30

export function desertSceneAt(sec) {
  let acc = 0;
  for (let i = 0; i < DESERT_STORY.length; i++) {
    const sc = DESERT_STORY[i];
    if (sec < acc + sc.dur) return { scene: sc, index: i, progress: (sec - acc) / sc.dur, localT: sec - acc };
    acc += sc.dur;
  }
  const last = DESERT_STORY[DESERT_STORY.length - 1];
  return { scene: last, index: DESERT_STORY.length - 1, progress: 1, localT: last.dur };
}

// Hố đào + đống cát + vết nứt khô — ngay dưới lưỡi xẻng.
function digHoleSVG() {
  return `<g>
    <ellipse cx="505" cy="480" rx="85" ry="10" fill="#6b4226" stroke="#222" stroke-width="3"/>
    <ellipse cx="505" cy="478" rx="60" ry="6" fill="#3d2412"/>
    <path d="M420 482 Q 448 458 478 476 Q 502 462 530 478 L 534 484 L 416 484 Z" fill="#e8b96f" stroke="#222" stroke-width="2.5" stroke-linejoin="round"/>
  </g>`;
}

export function renderDesertFrame(t) {
  const { scene, index } = desertSceneAt(t);
  const skyTop = "#35a8e0", skyBot = "#cfeeff";
  let bg = "", people = "", speechX = 480, speechY = 200;

  if (index === 0) {
    bg = dunesSVG(t) + digHoleSVG();
    people = manSVG(360, 470, t, { pose: "dao", expression: "met" });
    speechX = 360; speechY = 200;
  } else if (index === 1) {
    bg = plantSVG(t);
    people = manSVG(300, 470, t, { pose: "chi", expression: "ngac-nhien" });
    speechX = 300; speechY = 200;
  } else {
    bg = citySVG(t);
    people = manSVG(350, 470, t, { pose: "uong", expression: "vui" })
      + childSVG(620, 470, t, { pose: "uong" });
    speechX = 350; speechY = 200;
  }

  const speech = speechSVG(scene.dialogue, speechX, speechY, 340);

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540" role="img" aria-label="Sa mạc không sông: ${scene.title}">
  <defs>
    <linearGradient id="dsky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${skyTop}"/><stop offset="100%" stop-color="${skyBot}"/>
    </linearGradient>
    <pattern id="keff" width="14" height="14" patternUnits="userSpaceOnUse">
      <rect width="14" height="14" fill="#ffffff"/>
      <rect x="0" y="0" width="7" height="7" fill="#d94f3d"/>
      <rect x="7" y="7" width="7" height="7" fill="#d94f3d"/>
    </pattern>
  </defs>
  <rect width="960" height="540" fill="url(#dsky)"/>
  ${desertSunSVG(820, 80)}
  ${bg}
  ${people}
  ${speech}
  <rect x="0" y="438" width="960" height="20" fill="#000" opacity="0.25"/>
  <text x="20" y="456" font-size="15" fill="#fff">Cảnh ${scene.id}/3 — ${scene.title} • Sa mạc không sông</text>
  ${subtitleBarSVG(scene.sub)}
  <text x="940" y="456" text-anchor="end" font-size="14" fill="#fff">0:${String(Math.floor(t)).padStart(2, "0")} / 0:30</text>
</svg>`.trim();
}
