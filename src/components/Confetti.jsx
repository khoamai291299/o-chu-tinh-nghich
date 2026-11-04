import { useEffect, useRef } from 'react';

export default function Confetti({ burst = 160, loop = true }) {
  const cv = useRef(null);
  useEffect(() => {
    const c = cv.current;
    const g = c.getContext('2d');
    let w, h, raf, alive = true;
    const fit = () => { w = c.width = c.clientWidth; h = c.height = c.clientHeight; };
    fit();
    window.addEventListener('resize', fit);
    const cols = ['#ff6b6b', '#38bdf8', '#34d399', '#ff9f43', '#ffd166', '#c4b5fd'];
    const mk = (top) => ({ x: Math.random() * w, y: top ? -10 - Math.random() * h * 0.5 : Math.random() * -h, vx: (Math.random() - 0.5) * 2, vy: 2 + Math.random() * 3.5, s: 6 + Math.random() * 7, r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3, c: cols[(Math.random() * cols.length) | 0] });
    const ps = Array.from({ length: burst }, () => mk(true));
    const tick = () => {
      if (!alive) return;
      g.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx; p.y += p.vy; p.r += p.vr;
        if (p.y > h + 20) { if (loop) Object.assign(p, mk(true)); else p.y = h + 99; }
        g.save(); g.translate(p.x, p.y); g.rotate(p.r); g.fillStyle = p.c; g.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); g.restore();
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { alive = false; cancelAnimationFrame(raf); window.removeEventListener('resize', fit); };
  }, [burst, loop]);
  return <canvas ref={cv} className="confetti" />;
}
