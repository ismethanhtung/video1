import { renderCharacter, renderBattle, EXPRESSIONS, POSES, CHARACTERS } from "./character.js";
import { renderStoryFrame, STORY, STORY_DURATION, storySceneAt } from "./story.js";
import { renderVillageFrame, VILLAGE_STORY, VILLAGE_DURATION, villageSceneAt } from "./villageStory.js";
import { renderDoraemonFrame, DORAEMON_STORY, DORAEMON_DURATION, doraemonSceneAt } from "./doraemonStory.js";
import { renderDesertFrame, DESERT_STORY, DESERT_DURATION, desertSceneAt } from "./desertStory.js";
import { sfx, setSoundEnabled, isSoundEnabled } from "./sound.js";

// Timeline demo: 5 cảnh, tổng 16 giây.
// Mỗi cảnh = 1 biểu cảm + 1 tư thế + 1 dòng chữ. Cảnh cuối là đánh nhau.
const TIMELINE = [
  { t: 0,  expression: "vui",       pose: "vay-tay",     text: "SERIES MỚI" },
  { t: 3,  expression: "cuoi-lon",  pose: "nhay",        text: "Làm chủ Claude" },
  { t: 6,  expression: "ngac-nhien",pose: "chi-tay",     text: "Vẽ bằng code, không vẽ tay" },
  { t: 9,  expression: "mat-tim",   pose: "giơ-hai-tay", text: "6 biểu cảm • 6 tư thế" },
  { t: 12, expression: "cuoi-lon",  pose: "dam",         text: "⚔ Cảnh đánh nhau đầu tiên", battle: true },
];
const DURATION = 16; // giây

const state = {
  expression: "vui",
  pose: "vay-tay",
  character: "boy",
  shirt: "#f2b234",
  bg: "#faf7f2",
  confetti: false,
  battle: false,
  title: "Làm chủ Claude",
  mode: "timeline", // timeline | free | story
  playing: false,
  startAt: 0,
  lastScene: -1,
  storyPlaying: false,
  storyStartAt: 0,
  storyLastScene: -1,
  villagePlaying: false,
  villageStartAt: 0,
  villageLastScene: -1,
  doraemonPlaying: false,
  doraemonStartAt: 0,
  doraemonLastScene: -1,
  desertPlaying: false,
  desertStartAt: 0,
  desertLastScene: -1,
};

const $ = (id) => document.getElementById(id);
const stage = $("stage");
const codeView = $("code-view");

function sceneAt(sec) {
  let scene = TIMELINE[0];
  let idx = 0;
  TIMELINE.forEach((s, i) => { if (sec >= s.t) { scene = s; idx = i; } });
  scene._idx = idx;
  return scene;
}

function render() {
  stage.innerHTML = state.battle
    ? renderBattle({ bg: state.bg })
    : renderCharacter(state);
  $("stage-title").textContent = state.title;
  $("stage-badge").textContent = state.mode === "timeline" ? "SERIES MỚI" : "CHẾ ĐỘ TỰ DO";
  stage.classList.toggle("confetti", state.confetti);
  stage.classList.toggle("battle", state.battle);
  // Panel code cập nhật theo tham số - đây là điểm chính của demo:
  // thay tham số -> hình đổi, code đổi theo.
  codeView.textContent = state.battle
? `renderBattle({ bg: "${state.bg}" })
// cậu bé đấm, cô bé ngạc nhiên, sao va chạm ở giữa`
: `renderCharacter({
  character: "${state.character}", // ${CHARACTERS[state.character].label}
  expression: "${state.expression}", // ${EXPRESSIONS[state.expression].label}
  pose: "${state.pose}", // ${POSES[state.pose].label}
  shirt: "${state.shirt}",
  bg: "${state.bg}",
})`;
  document.querySelectorAll("[data-expression]").forEach(b =>
    b.classList.toggle("active", b.dataset.expression === state.expression));
  document.querySelectorAll("[data-pose]").forEach(b =>
    b.classList.toggle("active", b.dataset.pose === state.pose));
  document.querySelectorAll("[data-character]").forEach(b =>
    b.classList.toggle("active", b.dataset.character === state.character));
}

function renderStory(t) {
  stage.innerHTML = renderStoryFrame(t);
  const { scene, index } = storySceneAt(t);
  $("stage-title").textContent = `🎬 ${scene.title}`;
  $("stage-badge").textContent = "PHIM 60 GIÂY";
  $("story-sub").textContent = `“${scene.dialogue}” — ${scene.sub}`;
  $("time-label").textContent = `Phim: 0:${String(Math.floor(t)).padStart(2, "0")} / 1:00 — Cảnh ${index + 1}/6: ${scene.title}`;
  codeView.textContent =
`renderStoryFrame(${t.toFixed(1)})
// Cảnh ${scene.id}/6: ${scene.title}
// ${scene.sub}`;
  document.querySelectorAll("[data-story-scene]").forEach(b =>
    b.classList.toggle("active", Number(b.dataset.storyScene) === index));
}

function renderDesert(t) {
  stage.innerHTML = renderDesertFrame(t);
  const { scene, index } = desertSceneAt(t);
  $("stage-title").textContent = `🏜️ ${scene.title}`;
  $("stage-badge").textContent = "SA MẠC KHÔNG SÔNG • 30 GIÂY";
  $("story-sub").textContent = `“${scene.dialogue}” — ${scene.sub}`;
  $("time-label").textContent = `Phim sa mạc: 0:${String(Math.floor(t)).padStart(2, "0")} / 0:30 — Cảnh ${index + 1}/3: ${scene.title}`;
  codeView.textContent =
`renderDesertFrame(${t.toFixed(1)})
// Cảnh ${scene.id}/3: ${scene.title}
// ${scene.sub}`;
  document.querySelectorAll("[data-desert-scene]").forEach(b =>
    b.classList.toggle("active", Number(b.dataset.desertScene) === index));
}

function desertTick() {
  if (!state.desertPlaying) return;
  const elapsed = (performance.now() - state.desertStartAt) / 1000;
  if (elapsed >= DESERT_DURATION) {
    state.desertPlaying = false;
    $("desert-btn").textContent = "▶ Xem lại phim sa mạc 30s";
    sfx.cheer();
    return;
  }
  const { index } = desertSceneAt(elapsed);
  if (index !== state.desertLastScene) {
    state.desertLastScene = index;
    if (index === 1) sfx.pop(); else if (index === 2) sfx.cheer(); else sfx.jump();
  }
  renderDesert(elapsed);
  requestAnimationFrame(desertTick);
}

function renderDoraemon(t) {
  stage.innerHTML = renderDoraemonFrame(t);
  const { scene, index } = doraemonSceneAt(t);
  $("stage-title").textContent = `🤖 ${scene.title}`;
  $("stage-badge").textContent = "DORAEMON • 90 GIÂY";
  $("story-sub").textContent = `“${scene.dialogue}” — ${scene.sub}`;
  $("time-label").textContent = `Phim Doraemon: ${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")} / 1:30 — Cảnh ${index + 1}/6: ${scene.title}`;
  codeView.textContent =
`renderDoraemonFrame(${t.toFixed(1)})
// Cảnh ${scene.id}/6: ${scene.title}
// ${scene.sub}`;
  document.querySelectorAll("[data-doraemon-scene]").forEach(b =>
    b.classList.toggle("active", Number(b.dataset.doraemonScene) === index));
}

function doraemonTick() {
  if (!state.doraemonPlaying) return;
  const elapsed = (performance.now() - state.doraemonStartAt) / 1000;
  if (elapsed >= DORAEMON_DURATION) {
    state.doraemonPlaying = false;
    $("doraemon-btn").textContent = "▶ Xem lại phim Doraemon 90s";
    sfx.cheer();
    return;
  }
  const { index } = doraemonSceneAt(elapsed);
  if (index !== state.doraemonLastScene) {
    state.doraemonLastScene = index;
    if (index === 4) sfx.pop(); else if (index === 5) sfx.cheer(); else sfx.jump();
  }
  renderDoraemon(elapsed);
  requestAnimationFrame(doraemonTick);
}

function renderVillage(t) {
  stage.innerHTML = renderVillageFrame(t);
  const { scene, index } = villageSceneAt(t);
  $("stage-title").textContent = `🏡 ${scene.title}`;
  $("stage-badge").textContent = "CHUYỆN LÀNG QUÊ • 90 GIÂY";
  $("story-sub").textContent = `“${scene.dialogue}” — ${scene.sub}`;
  $("time-label").textContent = `Phim làng quê: ${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")} / 1:30 — Cảnh ${index + 1}/6: ${scene.title}`;
  codeView.textContent =
`renderVillageFrame(${t.toFixed(1)})
// Cảnh ${scene.id}/6: ${scene.title}
// ${scene.sub}`;
  document.querySelectorAll("[data-village-scene]").forEach(b =>
    b.classList.toggle("active", Number(b.dataset.villageScene) === index));
}

function villageTick() {
  if (!state.villagePlaying) return;
  const elapsed = (performance.now() - state.villageStartAt) / 1000;
  if (elapsed >= VILLAGE_DURATION) {
    state.villagePlaying = false;
    $("village-btn").textContent = "▶ Xem lại phim làng quê 90s";
    sfx.cheer();
    return;
  }
  const { index } = villageSceneAt(elapsed);
  if (index !== state.villageLastScene) {
    state.villageLastScene = index;
    if (index === 3) sfx.pop(); else sfx.jump();
  }
  renderVillage(elapsed);
  requestAnimationFrame(villageTick);
}

function storyTick() {
  if (!state.storyPlaying) return;
  const elapsed = (performance.now() - state.storyStartAt) / 1000;
  if (elapsed >= STORY_DURATION) {
    state.storyPlaying = false;
    $("story-btn").textContent = "▶ Xem lại phim 60s";
    sfx.cheer();
    return;
  }
  const { index } = storySceneAt(elapsed);
  if (index !== state.storyLastScene) {
    state.storyLastScene = index;
    if (index === 3) sfx.pop(); else if (index === 4) sfx.cheer(); else sfx.jump();
  }
  renderStory(elapsed);
  requestAnimationFrame(storyTick);
}

function buildButtons() {
  const charWrap = $("characters");
  Object.entries(CHARACTERS).forEach(([key, v]) => {
    const b = document.createElement("button");
    b.textContent = v.label; b.dataset.character = key;
    b.onclick = () => { state.mode = "free"; state.battle = false; state.character = key; state.shirt = v.shirt; $("shirt-color").value = v.shirt; sfx.pop(); render(); };
    charWrap.appendChild(b);
  });
  const expWrap = $("expressions");
  Object.entries(EXPRESSIONS).forEach(([key, v]) => {
    const b = document.createElement("button");
    b.textContent = v.label; b.dataset.expression = key;
    b.onclick = () => { state.mode = "free"; state.battle = false; state.expression = key; sfx.pop(); render(); };
    expWrap.appendChild(b);
  });
  const poseWrap = $("poses");
  Object.entries(POSES).forEach(([key, v]) => {
    const b = document.createElement("button");
    b.textContent = v.label; b.dataset.pose = key;
    b.onclick = () => { state.mode = "free"; state.battle = false; state.pose = key; if (key === "nhay") sfx.jump(); if (key === "dam") sfx.punch(); render(); };
    poseWrap.appendChild(b);
  });
}

function tick() {
  if (!state.playing) return;
  const elapsed = (performance.now() - state.startAt) / 1000;
  if (elapsed >= DURATION) { state.playing = false; $("play-btn").textContent = "▶ Phát lại timeline 16s"; render(); return; }
  const scene = sceneAt(elapsed);
  if (scene._idx !== state.lastScene) {
    state.lastScene = scene._idx;
    if (scene.battle) sfx.punch(); else if (scene.pose === "nhay") sfx.jump(); else sfx.pop();
  }
  state.expression = scene.expression;
  state.pose = scene.pose;
  state.battle = !!scene.battle;
  state.title = scene.text;
  $("time-label").textContent = `0:${String(Math.floor(elapsed)).padStart(2, "0")} / 0:16 — Cảnh: ${scene.text}`;
  render();
  requestAnimationFrame(tick);
}

$("desert-btn").onclick = () => {
  state.playing = false; state.storyPlaying = false; state.villagePlaying = false; state.doraemonPlaying = false; state.mode = "desert"; state.desertPlaying = true; state.desertLastScene = -1;
  state.desertStartAt = performance.now();
  $("desert-btn").textContent = "⏸ Đang chiếu phim sa mạc…";
  $("story-btn").textContent = "🎬 Xem phim 60s: Đi câu cá";
  $("village-btn").textContent = "🏡 Xem phim làng quê 90s";
  $("doraemon-btn").textContent = "🤖 Xem phim Doraemon 90s";
  requestAnimationFrame(desertTick);
};
$("export-desert").onclick = async () => {
  const btn = $("export-desert");
  btn.disabled = true; btn.textContent = "Đang ghi phim 30s… đừng tắt tab";
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 960; canvas.height = 540;
    const ctx = canvas.getContext("2d");
    const stream = canvas.captureStream(30);
    const rec = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    const done = new Promise((res) => (rec.onstop = res));
    rec.start();
    const t0 = performance.now();
    const draw = () => {
      const elapsed = (performance.now() - t0) / 1000;
      if (elapsed >= DESERT_DURATION) { rec.stop(); return; }
      const svg = renderDesertFrame(elapsed);
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 0, 0, 960, 540); requestAnimationFrame(draw); };
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    };
    draw();
    await done;
    const blob = new Blob(chunks, { type: "video/webm" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "sa-mac-khong-song.webm"; a.click();
    URL.revokeObjectURL(a.href);
  } catch (err) {
    alert("Trình duyệt này không hỗ trợ ghi video WebM. Hãy dùng Chrome mới nhất.");
  } finally {
    btn.disabled = false; btn.textContent = "⬇ Xuất phim sa mạc 30s (WebM)";
  }
};
$("doraemon-btn").onclick = () => {
  state.playing = false; state.storyPlaying = false; state.villagePlaying = false; state.desertPlaying = false; state.mode = "doraemon"; state.doraemonPlaying = true; state.doraemonLastScene = -1;
  state.doraemonStartAt = performance.now();
  $("doraemon-btn").textContent = "⏸ Đang chiếu phim Doraemon…";
  $("story-btn").textContent = "🎬 Xem phim 60s: Đi câu cá";
  $("village-btn").textContent = "🏡 Xem phim làng quê 90s";
  requestAnimationFrame(doraemonTick);
};
$("export-doraemon").onclick = async () => {
  const btn = $("export-doraemon");
  btn.disabled = true; btn.textContent = "Đang ghi phim 90s… đừng tắt tab";
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 960; canvas.height = 540;
    const ctx = canvas.getContext("2d");
    const stream = canvas.captureStream(30);
    const rec = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    const done = new Promise((res) => (rec.onstop = res));
    rec.start();
    const t0 = performance.now();
    const draw = () => {
      const elapsed = (performance.now() - t0) / 1000;
      if (elapsed >= DORAEMON_DURATION) { rec.stop(); return; }
      const svg = renderDoraemonFrame(elapsed);
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 0, 0, 960, 540); requestAnimationFrame(draw); };
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    };
    draw();
    await done;
    const blob = new Blob(chunks, { type: "video/webm" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "doraemon-chong-chong-tre.webm"; a.click();
    URL.revokeObjectURL(a.href);
  } catch (err) {
    alert("Trình duyệt này không hỗ trợ ghi video WebM. Hãy dùng Chrome mới nhất.");
  } finally {
    btn.disabled = false; btn.textContent = "⬇ Xuất phim Doraemon 90s (WebM)";
  }
};
$("village-btn").onclick = () => {
  state.playing = false; state.storyPlaying = false; state.doraemonPlaying = false; state.desertPlaying = false; state.mode = "village"; state.villagePlaying = true; state.villageLastScene = -1;
  state.villageStartAt = performance.now();
  $("village-btn").textContent = "⏸ Đang chiếu phim làng quê…";
  $("story-btn").textContent = "🎬 Xem phim 60s: Đi câu cá";
  requestAnimationFrame(villageTick);
};
$("export-village").onclick = async () => {
  const btn = $("export-village");
  btn.disabled = true; btn.textContent = "Đang ghi phim 90s… đừng tắt tab";
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 960; canvas.height = 540;
    const ctx = canvas.getContext("2d");
    const stream = canvas.captureStream(30);
    const rec = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    const done = new Promise((res) => (rec.onstop = res));
    rec.start();
    const t0 = performance.now();
    const draw = () => {
      const elapsed = (performance.now() - t0) / 1000;
      if (elapsed >= VILLAGE_DURATION) { rec.stop(); return; }
      const svg = renderVillageFrame(elapsed);
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 0, 0, 960, 540); requestAnimationFrame(draw); };
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    };
    draw();
    await done;
    const blob = new Blob(chunks, { type: "video/webm" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "chuyen-lang-que.webm"; a.click();
    URL.revokeObjectURL(a.href);
  } catch (err) {
    alert("Trình duyệt này không hỗ trợ ghi video WebM. Hãy dùng Chrome mới nhất.");
  } finally {
    btn.disabled = false; btn.textContent = "⬇ Xuất phim làng quê 90s (WebM)";
  }
};
$("story-btn").onclick = () => {
  state.playing = false; state.villagePlaying = false; state.doraemonPlaying = false; state.desertPlaying = false; state.mode = "story"; state.storyPlaying = true; state.storyLastScene = -1;
  state.storyStartAt = performance.now();
  $("story-btn").textContent = "⏸ Đang chiếu phim…";
  $("play-btn").textContent = "▶ Phát timeline 16s";
  requestAnimationFrame(storyTick);
};
$("export-story").onclick = async () => {
  const btn = $("export-story");
  btn.disabled = true; btn.textContent = "Đang ghi phim 60s… đừng tắt tab";
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 960; canvas.height = 540;
    const ctx = canvas.getContext("2d");
    const stream = canvas.captureStream(30);
    const rec = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    const done = new Promise((res) => (rec.onstop = res));
    rec.start();
    const t0 = performance.now();
    const draw = () => {
      const elapsed = (performance.now() - t0) / 1000;
      if (elapsed >= STORY_DURATION) { rec.stop(); return; }
      const svg = renderStoryFrame(elapsed);
      const img = new Image();
      img.onload = () => { ctx.drawImage(img, 0, 0, 960, 540); requestAnimationFrame(draw); };
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    };
    draw();
    await done;
    const blob = new Blob(chunks, { type: "video/webm" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "phim-di-cau-ca.webm"; a.click();
    URL.revokeObjectURL(a.href);
  } catch (err) {
    alert("Trình duyệt này không hỗ trợ ghi video WebM. Hãy dùng Chrome mới nhất.");
  } finally {
    btn.disabled = false; btn.textContent = "⬇ Xuất phim 60s (WebM)";
  }
};
$("play-btn").onclick = () => {
  state.mode = "timeline"; state.playing = true; state.lastScene = -1;
  state.startAt = performance.now();
  $("play-btn").textContent = "⏸ Đang phát…";
  requestAnimationFrame(tick);
};
$("free-btn").onclick = () => { state.playing = false; state.mode = "free"; state.battle = false; state.title = "Chế độ tự do"; render(); };
$("battle-btn").onclick = () => { state.playing = false; state.mode = "free"; state.battle = true; state.title = "⚔ Cảnh đánh nhau đầu tiên"; sfx.punch(); render(); };
$("sound-btn").onclick = () => { setSoundEnabled(!isSoundEnabled()); $("sound-btn").textContent = isSoundEnabled() ? "🔊 Âm thanh: Bật" : "🔇 Âm thanh: Tắt"; if (isSoundEnabled()) sfx.cheer(); };
$("confetti-btn").onclick = () => { state.confetti = !state.confetti; render(); };
$("shirt-color").oninput = (e) => { state.shirt = e.target.value; render(); };
$("bg-color").oninput = (e) => { state.bg = e.target.value; render(); };
$("title-input").oninput = (e) => { state.title = e.target.value || "Làm chủ Claude"; render(); };

$("download-svg").onclick = () => {
  const svg = state.battle ? renderBattle({ bg: state.bg }) : renderCharacter(state);
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "nhan-vat.svg"; a.click();
  URL.revokeObjectURL(a.href);
};

// Xuất video WebM: vẽ SVG lên canvas từng frame rồi ghi bằng MediaRecorder.
// Ghi theo thời gian thực 16 giây.
$("export-video").onclick = async () => {
  const btn = $("export-video");
  btn.disabled = true; btn.textContent = "Đang ghi 16s… đừng tắt tab";
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 960; canvas.height = 720;
    const ctx = canvas.getContext("2d");
    const stream = canvas.captureStream(30);
    const rec = new MediaRecorder(stream, { mimeType: "video/webm" });
    const chunks = [];
    rec.ondataavailable = (e) => chunks.push(e.data);
    const done = new Promise((res) => (rec.onstop = res));
    rec.start();
    const t0 = performance.now();
    const draw = () => {
      const elapsed = (performance.now() - t0) / 1000;
      if (elapsed >= DURATION) { rec.stop(); return; }
      const scene = sceneAt(elapsed);
      const svg = scene.battle
        ? renderBattle({ bg: state.bg })
        : renderCharacter({ ...state, expression: scene.expression, pose: scene.pose });
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = state.bg; ctx.fillRect(0, 0, 960, 720);
        if (scene.battle) ctx.drawImage(img, 180, 110, 600, 380);
        else ctx.drawImage(img, 330, 90, 300, 380);
        ctx.fillStyle = "#111"; ctx.font = "bold 44px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(scene.text, 480, 70);
        requestAnimationFrame(draw);
      };
      img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
    };
    draw();
    await done;
    const blob = new Blob(chunks, { type: "video/webm" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "lam-chu-claude.webm"; a.click();
    URL.revokeObjectURL(a.href);
  } catch (err) {
    alert("Trình duyệt này không hỗ trợ ghi video WebM. Hãy dùng Chrome mới nhất, hoặc tải SVG/PNG từng khung hình thay thế.");
  } finally {
    btn.disabled = false; btn.textContent = "⬇ Xuất video WebM (16s)";
  }
};

VILLAGE_STORY.forEach((sc, i) => {
  const b = document.createElement("button");
  b.textContent = `Làng ${sc.id}: ${sc.title}`;
  b.dataset.villageScene = i;
  b.onclick = () => {
    state.playing = false; state.storyPlaying = false; state.villagePlaying = false; state.doraemonPlaying = false; state.mode = "village";
    renderVillage(i * 15 + 1);
  };
  $("village-scenes").appendChild(b);
});
DORAEMON_STORY.forEach((sc, i) => {
  const b = document.createElement("button");
  b.textContent = `Doraemon ${sc.id}: ${sc.title}`;
  b.dataset.doraemonScene = i;
  b.onclick = () => {
    state.playing = false; state.storyPlaying = false; state.villagePlaying = false; state.doraemonPlaying = false; state.desertPlaying = false; state.mode = "doraemon";
    renderDoraemon(i * 15 + 1);
  };
  $("doraemon-scenes").appendChild(b);
});
DESERT_STORY.forEach((sc, i) => {
  const b = document.createElement("button");
  b.textContent = `Sa mạc ${sc.id}: ${sc.title}`;
  b.dataset.desertScene = i;
  b.onclick = () => {
    state.playing = false; state.storyPlaying = false; state.villagePlaying = false; state.doraemonPlaying = false; state.desertPlaying = false; state.mode = "desert";
    renderDesert(i * 10 + 1);
  };
  $("desert-scenes").appendChild(b);
});
buildButtons();
STORY.forEach((sc, i) => {
  const b = document.createElement("button");
  b.textContent = `Cảnh ${sc.id}: ${sc.title}`;
  b.dataset.storyScene = i;
  b.onclick = () => {
    state.playing = false; state.storyPlaying = false; state.villagePlaying = false; state.doraemonPlaying = false; state.mode = "story";
    renderStory(i * 10 + 1);
  };
  $("story-scenes").appendChild(b);
});
render();
