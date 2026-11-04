// Âm thanh tạo bằng Web Audio, không cần file âm thanh nào.
let ctx = null;
let muted = false;
try {
  muted = localStorage.getItem('ochu-muted') === '1';
} catch (e) {
  /* bỏ qua */
}

const ac = () => {
  if (!ctx) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (C) ctx = new C();
  }
  if (ctx && ctx.state === 'suspended') ctx.resume();
  return ctx;
};

function tone(freq, dur = 0.15, type = 'sine', gain = 0.18, when = 0, slideTo) {
  if (muted) return;
  const a = ac();
  if (!a) return;
  const t0 = a.currentTime + when;
  const o = a.createOscillator();
  const g = a.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t0);
  if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(gain, t0 + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(g).connect(a.destination);
  o.start(t0);
  o.stop(t0 + dur + 0.05);
}

export const sfx = {
  open() {
    tone(330, 0.12, 'triangle', 0.15);
    tone(494, 0.18, 'triangle', 0.15, 0.1);
  },
  bell() {
    tone(1318, 0.7, 'sine', 0.24);
    tone(1976, 0.5, 'sine', 0.1, 0.01);
  },
  correct() {
    [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.22, 'triangle', 0.2, i * 0.1));
  },
  wrong() {
    tone(240, 0.4, 'sawtooth', 0.12, 0, 120);
  },
  timeout() {
    tone(300, 0.25, 'square', 0.1, 0, 180);
    tone(200, 0.35, 'square', 0.1, 0.22, 110);
  },
  tick() {
    tone(900, 0.04, 'square', 0.05);
  },
  wheel() {
    tone(500 + Math.random() * 60, 0.03, 'square', 0.05);
  },
  win() {
    [523, 659, 784, 1047, 784, 1047, 1319].forEach((f, i) => tone(f, 0.25, 'triangle', 0.2, i * 0.12));
  },
};

export const isMuted = () => muted;
export const setMuted = (m) => {
  muted = m;
  try {
    localStorage.setItem('ochu-muted', m ? '1' : '0');
  } catch (e) {
    /* bỏ qua */
  }
};
