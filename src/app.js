import { renderCharacter, EXPRESSIONS, POSES } from "./character.js";

// Timeline demo: 4 cảnh, tổng 12 giây - giống bản demo trong chat.
// Mỗi cảnh = 1 biểu cảm + 1 tư thế + 1 dòng chữ.
const TIMELINE = [
  { t: 0,  expression: "vui",       pose: "vay-tay",     text: "SERIES MỚI" },
  { t: 3,  expression: "cuoi-lon",  pose: "nhay",        text: "Làm chủ Claude" },
  { t: 6,  expression: "ngac-nhien",pose: "chi-tay",     text: "Vẽ bằng code, không vẽ tay" },
  { t: 9,  expression: "mat-tim",   pose: "giơ-hai-tay", text: "6 biểu cảm • 6 tư thế" },
];
const DURATION = 12; // giây

const state = {
  expression: "vui",
  pose: "vay-tay",
  shirt: "#f2b234",
  bg: "#faf7f2",
  confetti: false,
  title: "Làm chủ Claude",
  mode: "timeline", // timeline | free
  playing: false,
  startAt: 0,
};

const $ = (id) => document.getElementById(id);
const stage = $("stage");
const codeView = $("code-view");

function sceneAt(sec) {
  let scene = TIMELINE[0];
  for (const s of TIMELINE) if (sec >= s.t) scene = s;
  return scene;
}

function render() {
  stage.innerHTML = renderCharacter(state);
  $("stage-title").textContent = state.title;
  $("stage-badge").textContent = state.mode === "timeline" ? "SERIES MỚI" : "CHẾ ĐỘ TỰ DO";
  stage.classList.toggle("confetti", state.confetti);
  // Panel code cập nhật theo tham số - đây là điểm chính của demo:
  // thay tham số -> hình đổi, code đổi theo.
  codeView.textContent =
`renderCharacter({
  expression: "${state.expression}", // ${EXPRESSIONS[state.expression].label}
  pose: "${state.pose}", // ${POSES[state.pose].label}
  shirt: "${state.shirt}",
  bg: "${state.bg}",
})`;
  document.querySelectorAll("[data-expression]").forEach(b =>
    b.classList.toggle("active", b.dataset.expression === state.expression));
  document.querySelectorAll("[data-pose]").forEach(b =>
    b.classList.toggle("active", b.dataset.pose === state.pose));
}

function buildButtons() {
  const expWrap = $("expressions");
  Object.entries(EXPRESSIONS).forEach(([key, v]) => {
    const b = document.createElement("button");
    b.textContent = v.label; b.dataset.expression = key;
    b.onclick = () => { state.mode = "free"; state.expression = key; render(); };
    expWrap.appendChild(b);
  });
  const poseWrap = $("poses");
  Object.entries(POSES).forEach(([key, v]) => {
    const b = document.createElement("button");
    b.textContent = v.label; b.dataset.pose = key;
    b.onclick = () => { state.mode = "free"; state.pose = key; render(); };
    poseWrap.appendChild(b);
  });
}

function tick() {
  if (!state.playing) return;
  const elapsed = (performance.now() - state.startAt) / 1000;
  if (elapsed >= DURATION) { state.playing = false; $("play-btn").textContent = "▶ Phát lại timeline 12s"; render(); return; }
  const scene = sceneAt(elapsed);
  state.expression = scene.expression;
  state.pose = scene.pose;
  state.title = scene.text;
  $("time-label").textContent = `0:${String(Math.floor(elapsed)).padStart(2, "0")} / 0:12 — Cảnh: ${scene.text}`;
  render();
  requestAnimationFrame(tick);
}

$("play-btn").onclick = () => {
  state.mode = "timeline"; state.playing = true;
  state.startAt = performance.now();
  $("play-btn").textContent = "⏸ Đang phát…";
  requestAnimationFrame(tick);
};
$("free-btn").onclick = () => { state.playing = false; state.mode = "free"; state.title = "Chế độ tự do"; render(); };
$("confetti-btn").onclick = () => { state.confetti = !state.confetti; render(); };
$("shirt-color").oninput = (e) => { state.shirt = e.target.value; render(); };
$("bg-color").oninput = (e) => { state.bg = e.target.value; render(); };
$("title-input").oninput = (e) => { state.title = e.target.value || "Làm chủ Claude"; render(); };

$("download-svg").onclick = () => {
  const blob = new Blob([renderCharacter(state)], { type: "image/svg+xml" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob); a.download = "nhan-vat.svg"; a.click();
  URL.revokeObjectURL(a.href);
};

// Xuất video WebM: vẽ SVG lên canvas từng frame rồi ghi bằng MediaRecorder.
// Ghi theo thời gian thực 12 giây, giống bản demo.
$("export-video").onclick = async () => {
  const btn = $("export-video");
  btn.disabled = true; btn.textContent = "Đang ghi 12s… đừng tắt tab";
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
      const svg = renderCharacter({ ...state, expression: scene.expression, pose: scene.pose });
      const img = new Image();
      img.onload = () => {
        ctx.fillStyle = state.bg; ctx.fillRect(0, 0, 960, 720);
        ctx.drawImage(img, 330, 90, 300, 380);
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
    btn.disabled = false; btn.textContent = "⬇ Xuất video WebM (12s)";
  }
};

buildButtons();
render();
