import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import { WHEEL } from '../data/constants.js';
import { sfx } from '../utils/sound.js';

const N = WHEEL.length;
const STEP = 360 / N;
const R = 300;
const POS = ['#7c5cff', '#3db8ff', '#2fd6a0', '#ff9a3d', '#c4b5fd'];
const NEG = ['#ff5c7a', '#d93a5c'];
const SPIN_MS = 5200;

const pt = (deg, r) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [R + r * Math.cos(a), R + r * Math.sin(a)];
};

/** Vòng quay may mắn: quay đến một ô ngẫu nhiên, trả kết quả qua onDone(điểm). */
export default function Wheel({ team, base, onDone }) {
  const gRef = useRef(null);
  const rotRef = useRef(0);
  const raf = useRef(0);
  const started = useRef(false);
  const finished = useRef(false);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const spin = () => {
    if (started.current) return;
    started.current = true;
    setSpinning(true);
    const win = Math.floor(Math.random() * N);
    const jitter = (Math.random() - 0.5) * STEP * 0.7;
    const from = rotRef.current;
    const toMod = (((-(win + 0.5) * STEP + jitter) % 360) + 360) % 360;
    const to = from + 360 * 6 + ((toMod - (from % 360) + 360) % 360);
    const t0 = performance.now();
    let lastSeg = Math.floor(from / STEP);
    const frame = (now) => {
      const p = Math.min(1, (now - t0) / SPIN_MS);
      const e = 1 - (1 - p) ** 4;
      const cur = from + (to - from) * e;
      rotRef.current = cur;
      if (gRef.current) gRef.current.style.transform = `rotate(${cur}deg)`;
      const seg = Math.floor(cur / STEP);
      if (seg !== lastSeg) { lastSeg = seg; sfx.wheel(); }
      if (p < 1) raf.current = requestAnimationFrame(frame);
      else { setSpinning(false); setResult(WHEEL[win]); (WHEEL[win] < 0 ? sfx.wrong : sfx.correct)(); }
    };
    raf.current = requestAnimationFrame(frame);
  };

  const done = (v) => { if (finished.current) return; finished.current = true; onDone(v); };

  useEffect(() => {
    const h = (e) => { if (e.key !== 'Enter') return; e.preventDefault(); if (result === null) spin(); else done(result); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  return (
    <div className="overlay wheel-over">
      <div className="wheel-wrap">
        <div className="wheel-title">{team.name} đúng rồi! +{base} điểm</div>
        <div className="wheel-sub">Quay vòng quay may mắn để nhận thêm điểm, hoặc bị trừ</div>
        <div className="wheel-box">
          <svg viewBox="0 0 600 600" className="wheel-svg" aria-label="Vòng quay may mắn">
            <circle cx={R} cy={R} r={R - 2} fill="#14123a" />
            <g ref={gRef} style={{ transformOrigin: `${R}px ${R}px` }}>
              {WHEEL.map((v, i) => {
                const [x1, y1] = pt(i * STEP, R - 10);
                const [x2, y2] = pt((i + 1) * STEP, R - 10);
                const mid = (i + 0.5) * STEP;
                const [tx, ty] = pt(mid, R - 62);
                const fill = v < 0 ? NEG[i % 2] : POS[i % POS.length];
                return (
                  <g key={i}>
                    <path d={`M${R} ${R} L${x1} ${y1} A${R - 10} ${R - 10} 0 0 1 ${x2} ${y2} Z`} fill={fill} stroke="#14123a" strokeWidth="3" />
                    <text x={tx} y={ty} transform={`rotate(${mid} ${tx} ${ty})`} textAnchor="middle" dominantBaseline="central" fontSize="34" fontWeight="800" fill={v < 0 ? '#fff' : '#14123a'} fontFamily="Baloo 2, sans-serif">{v > 0 ? `+${v}` : v}</text>
                  </g>
                );
              })}
            </g>
            <circle cx={R} cy={R} r="46" fill="#ffc83d" stroke="#14123a" strokeWidth="5" />
            <text x={R} y={R} textAnchor="middle" dominantBaseline="central" fontSize="30" fontWeight="800" fill="#14123a" fontFamily="Baloo 2, sans-serif">QUAY</text>
            <path d={`M${R - 24} 6 L${R + 24} 6 L${R} 52 Z`} fill="#fff" stroke="#14123a" strokeWidth="5" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="wheel-foot">
          {result === null ? (
            <Button type="primary" size="large" className="cta" icon={<RedoOutlined />} loading={spinning} onClick={spin}>{spinning ? 'Đang quay...' : 'Quay (Enter)'}</Button>
          ) : (
            <motion.div className="wheel-result" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }}>
              <span className={result < 0 ? 'neg' : 'pos'}>{result < 0 ? `Bị trừ ${-result} điểm` : `Thưởng thêm ${result} điểm`}</span>
              <Button type="primary" size="large" className="cta" onClick={() => done(result)}>Tiếp tục</Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
