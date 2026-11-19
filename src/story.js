import { innerCharacter, CHARACTERS } from "./character.js";
import { cloudsSVG, sunSVG, birdsSVG, houseSVG, treeSVG, dogSVG, riverSVG, speechSVG } from "./scenery.js";

// Phim dài 60 giây, 6 cảnh, mỗi cảnh 10 giây.
// A = cậu bé áo vàng. Cô bé áo xanh xuất hiện từ cảnh 3.
// Mỗi cảnh có: bối cảnh, vị trí nhân vật (đi bộ = x tăng theo tiến độ),
// lời thoại, màu trời thay đổi từ sáng -> trưa -> chiều -> hoàng hôn.
export const STORY = [
  {
    id: 1, title: "Sáng sớm ở nhà", dur: 10,
    sky: ["#7ec8f7", "#dff3ff"], sun: [820, 70],
    dialogue: "Sáng nay trời đẹp quá, đi câu thôi!",
    speaker: "A", sub: "A bước ra khỏi nhà, chó Vàng chạy theo.",
  },
  {
    id: 2, title: "Đi trên đường làng", dur: 10,
    sky: ["#6ec1f5", "#e8f7ff"], sun: [760, 60],
    dialogue: "Cây rung lá rụng rồi, gió mát thật.",
    speaker: "A", sub: "Hàng cây hai bên đường, lá vàng rơi theo gió.",
  },
  {
    id: 3, title: "Gặp nhau dưới gốc cây", dur: 10,
    sky: ["#7ec8f7", "#fff2cc"], sun: [700, 70],
    dialogue: "Cho mình đi câu cùng nhé?",
    speaker: "Girl", sub: "Cô bé áo xanh đợi sẵn dưới gốc cây lớn.",
  },
  {
    id: 4, title: "Ra tới bờ sông", dur: 10,
    sky: ["#5fb6ef", "#dff3ff"], sun: [640, 66],
    dialogue: "Suỵt... cá cắn câu rồi!",
    speaker: "A", sub: "Nước sông xanh, sóng lăn tăn, cá nhảy lên mặt nước.",
  },
  {
    id: 5, title: "Câu được cá to", dur: 10,
    sky: ["#f7b267", "#ffe8c2"], sun: [560, 110],
    dialogue: "Được cá to quá! Tối nay có cá nướng rồi!",
    speaker: "Girl", sub: "Chiều xuống, mây hồng, cả hai reo lên.",
  },
  {
    id: 6, title: "Về nhà lúc hoàng hôn", dur: 10,
    sky: ["#f4845f", "#ffd6a5"], sun: [420, 150],
    dialogue: "Ngày mai mình lại đi câu nhé!",
    speaker: "A", sub: "Chim về tổ, chó chạy trước, A xách giỏ cá về nhà.",
  },
];

export const STORY_DURATION = STORY.reduce((s, c) => s + c.dur, 0); // 60

export function storySceneAt(sec) {
  let acc = 0;
  for (let i = 0; i < STORY.length; i++) {
    const sc = STORY[i];
    if (sec < acc + sc.dur) return { scene: sc, index: i, progress: (sec - acc) / sc.dur, localT: sec - acc };
    acc += sc.dur;
  }
  const last = STORY[STORY.length - 1];
  return { scene: last, index: STORY.length - 1, progress: 1, localT: last.dur };
}

// Vẽ 1 khung hình của phim tại thời điểm t (giây).
// Nhân vật đi bộ: x tăng dần trong cảnh, chân tay đung đưa theo t.
export function renderStoryFrame(t) {
  const { scene, index, progress, localT } = storySceneAt(t);
  const [skyTop, skyBot] = scene.sky;
  const walkX = 180 + progress * 420; // A đi từ trái sang phải
  // Chân nhân vật phải chạm mặt đường/bờ, không lơ lửng giữa trời.
  // innerCharacter cao ~363px, scale 0.62 -> cao ~225px, nên ty = feetY - 225.
  // Cảnh sông (4-5): bờ ở y=400 (mép trên của sông); các cảnh còn lại: mặt đường y=470.
  const isRiver = index === 3 || index === 4;
  const feetY = isRiver ? 400 : 470;
  const charY = feetY - 225;
  const dogX = index >= 2 && index <= 4 ? walkX - 130 + Math.sin(t * 2) * 8 : walkX + 110 + Math.sin(t * 2) * 8;
  const dogY = isRiver ? 374 : 470; // chân chó chạm bờ/đường (chân ở y+26)
  const girlX = 770; // đứng riêng, cách A lúc tới nơi ~130px, không chồng lên A
  const bob = Math.sin(t * 6) * 3;

  // Nhân vật: dùng lại innerCharacter, thu nhỏ và đặt vào vị trí.
  const boy = `<g transform="translate(${walkX - 150} ${charY + bob}) scale(0.62)">${innerCharacter({ expression: index === 4 ? "cuoi-lon" : "vui", pose: progress < 0.9 ? "vay-tay" : "chi-tay", ...CHARACTERS.boy })}</g>`;
  // Cô bé chỉ xuất hiện cảnh 3-5; cảnh 6 A về nhà một mình.
  const girl = index >= 2 && index <= 4
    ? `<g transform="translate(${girlX - 150} ${charY - bob}) scale(0.62)">${innerCharacter({ expression: index === 4 ? "cuoi-lon" : "vui", pose: "vay-tay", ...CHARACTERS.girl })}</g>`
    : "";
  const dog = `<g transform="translate(0 0)">${dogSVG(dogX, dogY, t)}</g>`;

  // Bối cảnh theo cảnh: nhà ở cảnh 1 và 6, sông ở cảnh 4-5, đường ở cảnh 2-3.
  let ground = `<rect x="0" y="430" width="960" height="110" fill="#8fce6e"/>`;
  let place = "";
  if (index === 0 || index === 5) place = houseSVG(80, 300) + treeSVG(700, 430, t);
  else if (index === 3 || index === 4) place = riverSVG(t) + `<rect x="0" y="384" width="960" height="18" fill="#d9c48a"/>` + treeSVG(120, 400, t, 0.9);
  else place = treeSVG(180, 430, t) + treeSVG(760, 430, t + 2);
  if (index === 3 || index === 4) ground = "";

  const road = index < 3 || index === 5
    ? `<path d="M0 470 L960 470 L960 500 L0 500 Z" fill="#d9b48a"/><path d="M0 485 L960 485" stroke="#fff" stroke-width="4" stroke-dasharray="28 22"/>`
    : "";

  const speakerX = scene.speaker === "Girl" ? girlX : walkX;
  // Bong bóng đặt ngay trên đầu người nói (đỉnh đầu ở y≈charY+48),
  // đuôi chỉ xuống đầu, không lơ lửng trên cao như trước.
  const speech = speechSVG(scene.dialogue, Math.min(Math.max(speakerX, 190), 770), charY + 30);

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540" role="img" aria-label="Phim: ${scene.title}">
  <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${skyTop}"/><stop offset="100%" stop-color="${skyBot}"/>
  </linearGradient></defs>
  <rect width="960" height="540" fill="url(#sky)"/>
  ${sunSVG(scene.sun[0], scene.sun[1])}
  ${cloudsSVG(t)}
  ${birdsSVG(t)}
  ${ground}
  ${place}
  ${road}
  ${boy}
  ${girl}
  ${dog}
  ${speech}
  <rect x="0" y="492" width="960" height="48" fill="#000000" opacity="0.72"/>
  <text x="20" y="512" font-size="17" fill="#ffffff">Cảnh ${scene.id}/6 — ${scene.title}</text>
  <text x="20" y="532" font-size="14" fill="#ffe9a8">${scene.sub}</text>
  <text x="940" y="522" text-anchor="end" font-size="15" fill="#ffffff">0:${String(Math.floor(t)).padStart(2, "0")} / 1:00</text>
</svg>`.trim();
}
