// Âm thanh tổng hợp bằng Web Audio, không cần file nhạc.
// Mỗi hiệu ứng chỉ là vài nốt oscillator + giảm âm lượng nhanh.
let ctx = null;
let enabled = true;

export function setSoundEnabled(v) { enabled = v; }
export function isSoundEnabled() { return enabled; }

function ac() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function tone(freq, dur = 0.15, type = "sine", vol = 0.15, slideTo = null) {
  if (!enabled) return;
  try {
    const c = ac();
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, c.currentTime);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, c.currentTime + dur);
    g.gain.setValueAtTime(vol, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
    o.connect(g); g.connect(c.destination);
    o.start(); o.stop(c.currentTime + dur);
  } catch { /* trình duyệt chặn audio trước khi người dùng tương tác */ }
}

export const sfx = {
  pop: () => tone(600, 0.12, "sine", 0.15, 900),
  jump: () => tone(300, 0.2, "sine", 0.15, 700),
  punch: () => { tone(160, 0.15, "square", 0.18, 60); tone(90, 0.2, "sawtooth", 0.12, 50); },
  cheer: () => { tone(523, 0.15, "triangle", 0.12); setTimeout(() => tone(659, 0.15, "triangle", 0.12), 100); setTimeout(() => tone(784, 0.25, "triangle", 0.12), 200); },
};
