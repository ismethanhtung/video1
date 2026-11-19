import { doraemonSVG, nobitaSVG, gianSVG, shizukaSVG, townBelowSVG, nobitaRoomSVG, parkSVG } from "./doraemon.js";
import { cloudsSVG, birdsSVG, sunSVG, speechSVG } from "./scenery.js";
import { subtitleBarSVG } from "./village.js";

// Phim Doraemon — tập "Chong chóng tre", 90 giây, 6 cảnh × 15 giây.
// Phong cách nét vẽ nghệch ngoạc, cute: nét chì hơi lệch, hình đơn giản,
// vẫn nhận ra ngay Doraemon — Nobita — Gian — Shizuka.
// Cốt truyện: Gian đuổi Nobita → Doraemon cho mượn chong chóng tre →
// Nobita bay lên trời → gặp Shizuka → chong chóng hết pin → Doraemon cứu.
export const DORAEMON_STORY = [
  {
    id: 1, title: "Gian đuổi Nobita", dur: 15, sky: "day",
    sub: "Gian đuổi Nobita chạy khắp con hẻm.",
    dialogue: "Cứu với, Doraemon ơi!",
    speaker: "Nobita",
  },
  {
    id: 2, title: "Doraemon chui ra từ ngăn kéo", dur: 15, sky: "room",
    sub: "Doraemon lấy bảo bối từ chiếc túi thần kỳ.",
    dialogue: "Chong chóng tre đây, đội lên là bay được!",
    speaker: "Doraemon",
  },
  {
    id: 3, title: "Bay lên trời", dur: 15, sky: "day",
    sub: "Nobita bay vút lên trời, thành phố nhỏ dần bên dưới.",
    dialogue: "Mình bay được rồi, cao quá!",
    speaker: "Nobita",
  },
  {
    id: 4, title: "Gặp Shizuka", dur: 15, sky: "day",
    sub: "Shizuka vẫy tay chào Nobita từ công viên.",
    dialogue: "Nobita, cậu bay giỏi quá!",
    speaker: "Shizuka",
  },
  {
    id: 5, title: "Chong chóng hết pin", dur: 15, sky: "dusk",
    sub: "Chong chóng tre hết pin, Nobita chao đảo giữa trời.",
    dialogue: "Chong chóng chậm dần rồi, cứu với!",
    speaker: "Nobita",
  },
  {
    id: 6, title: "Doraemon cứu, hoàng hôn", dur: 15, sky: "dusk",
    sub: "Hoàng hôn xuống, hai bạn đáp xuống mái nhà an toàn.",
    dialogue: "Có tớ đây, đừng sợ!",
    speaker: "Doraemon",
  },
];

export const DORAEMON_DURATION = DORAEMON_STORY.reduce((s, c) => s + c.dur, 0); // 90

export function doraemonSceneAt(sec) {
  let acc = 0;
  for (let i = 0; i < DORAEMON_STORY.length; i++) {
    const sc = DORAEMON_STORY[i];
    if (sec < acc + sc.dur) return { scene: sc, index: i, progress: (sec - acc) / sc.dur, localT: sec - acc };
    acc += sc.dur;
  }
  const last = DORAEMON_STORY[DORAEMON_STORY.length - 1];
  return { scene: last, index: DORAEMON_STORY.length - 1, progress: 1, localT: last.dur };
}

function skyColors(kind) {
  if (kind === "dusk") return ["#f4845f", "#ffd6a5"];
  return ["#7ec8f7", "#dff3ff"];
}

// Con hẻm cảnh 1: nhà nhỏ hai bên, đường đất giữa.
function alleySVG(t) {
  return `<g>
    <rect x="0" y="380" width="960" height="160" fill="#8fce6e"/>
    <rect x="0" y="430" width="960" height="110" fill="#d9b48a"/>
    <g>
      <rect x="40" y="240" width="170" height="140" fill="#fff3d6" stroke="#2b2b2b" stroke-width="4"/>
      <path d="M24 240 L125 180 L226 240 Z" fill="#d96a4a" stroke="#2b2b2b" stroke-width="4"/>
      <rect x="105" y="300" width="40" height="80" fill="#8a5a3b" stroke="#2b2b2b" stroke-width="3"/>
    </g>
    <g>
      <rect x="760" y="250" width="160" height="130" fill="#ffeec2" stroke="#2b2b2b" stroke-width="4"/>
      <path d="M746 250 L840 196 L934 250 Z" fill="#4a90d9" stroke="#2b2b2b" stroke-width="4"/>
      <rect x="820" y="310" width="40" height="70" fill="#8a5a3b" stroke="#2b2b2b" stroke-width="3"/>
    </g>
  </g>`;
}

// Mái nhà lúc hoàng hôn (cảnh 6): hai mái ngói + ống khói.
function roofSVG() {
  return `<g>
    <rect x="0" y="470" width="960" height="70" fill="#5d7d4f"/>
    <rect x="110" y="425" width="180" height="45" fill="#fff3d6" stroke="#2b2b2b" stroke-width="3"/>
    <rect x="670" y="425" width="180" height="45" fill="#ffeec2" stroke="#2b2b2b" stroke-width="3"/>
    <path d="M60 470 L200 380 L340 470 Z" fill="#d96a4a" stroke="#2b2b2b" stroke-width="4"/>
    <path d="M620 470 L760 380 L900 470 Z" fill="#4a90d9" stroke="#2b2b2b" stroke-width="4"/>
    <rect x="820" y="330" width="26" height="70" fill="#b08968" stroke="#2b2b2b" stroke-width="3"/>
  </g>`;
}

export function renderDoraemonFrame(t) {
  const { scene, index, progress } = doraemonSceneAt(t);
  const [skyTop, skyBot] = skyColors(scene.sky);
  let bg = "", people = "", speechX = 480, speechY = 120;

  if (index === 0) {
    // Gian đuổi Nobita chạy từ trái sang phải dọc con hẻm.
    const nx = 260 + progress * 320;
    bg = alleySVG(t);
    people = gianSVG(nx - 150, 470, t, { pose: "chay" })
      + nobitaSVG(nx, 470, t, { pose: "chay", expression: "hoang" });
    speechX = Math.min(Math.max(nx, 200), 760); speechY = 250;
  } else if (index === 1) {
    // Phòng Nobita: Nobita ngồi bệt, Doraemon đứng trên bàn, khoe chong chóng tre.
    bg = nobitaRoomSVG(t);
    people = nobitaSVG(330, 470, t, { pose: "ngoi", expression: "hoang" })
      + doraemonSVG(740, 330, t, { expression: "cuoi", handProp: true });
    speechX = 700; speechY = 118;
  } else if (index === 2) {
    // Bay lên trời: Nobita giữa trời, thành phố nhỏ bên dưới.
    bg = townBelowSVG(t);
    people = nobitaSVG(480, 300, t, { pose: "bay", expression: "cuoi" });
    speechX = 480; speechY = 92;
  } else if (index === 3) {
    // Công viên: Shizuka vẫy tay, Nobita bay thấp xuống chào.
    bg = parkSVG(t);
    people = shizukaSVG(620, 470, t, { pose: "vay" })
      + nobitaSVG(330, 350, t, { pose: "bay", expression: "vui" });
    speechX = 620; speechY = 258;
  } else if (index === 4) {
    // Trời chiều: chong chóng quay chậm, Nobita chao đảo, nghiêng người.
    const tilt = (Math.sin(t * 3) * 6 + 12).toFixed(1);
    people = `<g transform="rotate(${tilt} 480 330)">${nobitaSVG(480, 330, t, { pose: "bay", expression: "hoang" })}</g>`;
    speechX = 480; speechY = 108;
  } else {
    // Hoàng hôn: Doraemon bay bằng chong chóng tre của mình đỡ Nobita, đáp xuống mái nhà.
    bg = roofSVG();
    people = nobitaSVG(700, 418, t, { pose: "bay", expression: "vui" })
      + doraemonSVG(820, 418, t, { expression: "vui", propeller: true, spin: (t * 540) % 360 });
    speechX = 760; speechY = 180;
  }

  const speech = speechSVG(scene.dialogue, speechX, speechY, 340);

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" width="960" height="540" role="img" aria-label="Doraemon: ${scene.title}">
  <defs><linearGradient id="dsky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${skyTop}"/><stop offset="100%" stop-color="${skyBot}"/>
  </linearGradient></defs>
  <rect width="960" height="540" fill="url(#dsky)"/>
  ${scene.sky === "room" ? "" : sunSVG(index === 4 || index === 5 ? 420 : 820, index === 4 || index === 5 ? 150 : 70)}
  ${scene.sky === "room" ? "" : cloudsSVG(t)}
  ${scene.sky === "room" ? "" : birdsSVG(t)}
  ${bg}
  ${people}
  ${speech}
  <rect x="0" y="438" width="960" height="20" fill="#000" opacity="0.25"/>
  <text x="20" y="456" font-size="15" fill="#fff">Cảnh ${scene.id}/6 — ${scene.title} • Doraemon: Chong chóng tre</text>
  ${subtitleBarSVG(scene.sub)}
  <text x="940" y="456" text-anchor="end" font-size="14" fill="#fff">${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")} / 1:30</text>
</svg>`.trim();
}
