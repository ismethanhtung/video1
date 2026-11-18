import { renderCharacter, renderBattle, EXPRESSIONS, POSES, CHARACTERS } from "./character.js";
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
  mode: "timeline", // timeline | free
  playing: false,
  startAt: 0,
  lastScene: -1,
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

buildButtons();
render();
