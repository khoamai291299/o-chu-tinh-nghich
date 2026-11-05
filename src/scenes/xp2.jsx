import { Svg, G, Sky, Cloud, Sparkle, Fish, useScene, C, INK, st } from './kit.jsx';
import { Kid, Room, Question, Exclaim, Sweat, Heart, mouth } from './kit2.jsx';
import { Meadow } from './art.jsx';
import { Mouse, Jar, Needle } from './props.jsx';
import { Cat, Buffalo, pop } from './xpkit.jsx';

/* ===== 6. Vẽ rắn thêm chân: vẽ xong con rắn lại vẽ thêm bốn chân, thành con thằn lằn ===== */
export function VeRanChan({ running }) {
  const pts = [[88, 58], [96, 44], [104, 58], [112, 46], [120, 54], [128, 40], [134, 34]];
  const ref = useScene(running, (tl) => {
    tl.set(['.vr-head', '.vr-leg', '.vr-q'], { opacity: 0 }, 0);
    tl.fromTo('.vr-body', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.6, ease: 'none' }, 0.5);
    tl.fromTo('.vr-pencil', { x: pts[0][0], y: pts[0][1] }, { keyframes: pts.slice(1).map(([x, y]) => ({ x, y, duration: 2.6 / (pts.length - 1), ease: 'none' })), duration: 2.6 }, 0.5);
    tl.to('.vr-head', { opacity: 1, duration: 0.3 }, 3.1);
    tl.to('.vr-pencil', { keyframes: [{ x: 96, y: 58, duration: 0.5 }, { x: 112, y: 58, duration: 0.5 }, { x: 118, y: 58, duration: 0.5 }, { x: 128, y: 52, duration: 0.5 }], duration: 2 }, 3.4);
    tl.to('.vr-leg', { opacity: 1, duration: 0.2, stagger: 0.5 }, 3.8);
    tl.to('.vr-pencil', { opacity: 0, duration: 0.3 }, 5.7);
    mouth(tl, 'vr-k', 'O', 5.8);
    pop(tl, '.vr-q', 0, 0, 5.8, 0.4);
    tl.to('.vr-k-head', { rotation: -8, duration: 0.3, yoyo: true, repeat: 3, transformOrigin: '50% 100%' }, 5.8);
    tl.fromTo('.vr-sweat', { y: 0, opacity: 0 }, { y: 6, opacity: 1, duration: 0.6, repeat: 2, stagger: 0.3 }, 6);
  }, { loop: 8 });
  const d = `M${pts.map((p) => p.join(' ')).join(' L')}`;
  return (
    <Svg ref={ref}>
      <Room wall="#fdf1dc" floor="#d6aa7d" fy={70} />
      <rect x="78" y="12" width="64" height="56" rx="3" fill="#fffdf6" {...st} />
      <path d="M96 68 L90 82 M124 68 L130 82" stroke="#8a5630" strokeWidth="2" strokeLinecap="round" />
      <path className="vr-body" d="M88 58 C94 42 100 62 106 50 S118 54 122 46 S130 38 134 34" fill="none" stroke="#2f9e6a" strokeWidth="4" strokeLinecap="round" pathLength="1" strokeDasharray="1" />
      <g className="vr-head"><circle cx="135" cy="33" r="4.4" fill="#4cc38a" {...st} strokeWidth=".6" /><circle cx="136.2" cy="32" r=".9" fill={INK} /><path d="M139 33 l4 -1 m-4 1 l4 2" stroke={C.red} strokeWidth=".7" fill="none" /></g>
      {[[96, 52], [106, 54], [116, 52], [124, 48]].map(([x, y], i) => <path key={i} className="vr-leg" d={`M${x} ${y} l-1.6 9 l-2.6 1`} fill="none" stroke="#2f9e6a" strokeWidth="2.2" strokeLinecap="round" />)}
      <g className="vr-pencil"><g transform="translate(0 0) rotate(40)"><rect x="-1.6" y="-14" width="3.2" height="12" fill="#ffd166" {...st} strokeWidth=".6" /><path d="M-1.6 -2 L0 2 L1.6 -2Z" fill="#f4d2a8" {...st} strokeWidth=".5" /><rect x="-1.6" y="-16" width="3.2" height="2.6" fill={C.pink} {...st} strokeWidth=".5" /></g></g>
      <G x={40} y={80}><Kid p="vr-k" shirt="#7c5cff" pants="#3b4a7a" hair="#3a2e39" /></G>
      <G x={52} y={42}><g className="vr-q"><Question s={1.5} /></g></G>
      <G x={50} y={50}><g className="vr-sweat" opacity="0"><Sweat s={0.9} /></g></G>
    </Svg>
  );
}

/* ===== 7. Đàn gảy tai trâu: người gảy đàn, con trâu vẫn thản nhiên gặm cỏ ===== */
export function DanTaiTrau({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.dt-buf .bhead', { rotation: 16, duration: 0.9, yoyo: true, repeat: 7, ease: 'sine.inOut', transformOrigin: '20% 80%' }, 0);
    tl.to('.dt-buf .tail', { rotation: 14, duration: 0.5, yoyo: true, repeat: 15, ease: 'sine.inOut', transformOrigin: '0% 0%' }, 0);
    tl.to('.dt-strum', { rotation: 10, duration: 0.18, yoyo: true, repeat: 41, transformOrigin: '50% 50%' }, 0);
    tl.to('.dt-note', { keyframes: [{ x: 0, y: 0, opacity: 0, duration: 0 }, { x: 10, y: -8, opacity: 1, duration: 0.35 }, { x: 28, y: -14, opacity: 1, duration: 0.9, ease: 'none' }, { x: 40, y: -10, opacity: 0, duration: 0.5 }], duration: 1.75, repeat: 3, repeatDelay: 0.5, stagger: 0.55 }, 0.4);
    mouth(tl, 'dt-k', 'S', 0);
    tl.to('.dt-k-head', { rotation: 5, duration: 0.45, yoyo: true, repeat: 15, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <Meadow id="dt" ground={62} sun trees={false} />
      <G x={36} y={78}>
        <Kid p="dt-k" shirt="#ef476f" pants="#3b4a7a" hair="#2b2d42" />
        <G x={9} y={-16} r={-25}>
          <g className="dt-strum">
            <ellipse cx="0" cy="3" rx="6.4" ry="5.2" fill="#c98a52" {...st} strokeWidth=".7" />
            <circle cx="0" cy="3" r="1.8" fill="#5a3418" />
            <rect x="-1.2" y="-14" width="2.4" height="12" rx="1" fill="#8a5630" {...st} strokeWidth=".6" />
            <path d="M-.6 -13 V6 M.6 -13 V6" stroke="#fff" strokeWidth=".4" />
          </g>
        </G>
      </G>
      {[0, 1, 2].map((i) => <G key={i} x={52 + i * 3} y={50 - i * 3}><g className="dt-note" opacity="0"><text fontSize="9" fontWeight="800" fill="#7c5cff" stroke={INK} strokeWidth=".4" paintOrder="stroke">♪</text></g></G>)}
      <G x={118} y={76}><g className="dt-buf"><G s={1.15}><Buffalo /></G></g></G>
      <G x={150} y={80}><path d="M0 0 Q-2 -5 -4 -7 M0 0 Q0 -6 1 -8 M0 0 Q2 -5 4 -7" stroke="#3f9a55" strokeWidth="1.4" fill="none" strokeLinecap="round" /></G>
      <G x={142} y={82}><path d="M0 0 Q-2 -5 -4 -7 M0 0 Q0 -6 1 -8 M0 0 Q2 -5 4 -7" stroke="#3f9a55" strokeWidth="1.4" fill="none" strokeLinecap="round" /></G>
    </Svg>
  );
}

/* ===== 8. Mèo khen mèo dài đuôi: mèo soi gương, tự khen cái đuôi ===== */
export function MeoKhen({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.mk-cat .tail', { rotation: 18, duration: 0.5, yoyo: true, repeat: 13, ease: 'sine.inOut', transformOrigin: '100% 100%' }, 0);
    tl.to('.mk-refl .tail', { rotation: -18, duration: 0.5, yoyo: true, repeat: 13, ease: 'sine.inOut', transformOrigin: '0% 100%' }, 0);
    tl.to('.mk-cat', { y: -2, duration: 0.4, yoyo: true, repeat: 15, ease: 'sine.inOut' }, 0);
    [1.2, 2.4, 3.6, 4.8].forEach((t, i) => pop(tl, `.mk-h${i}`, 0, 0, t, 0.35));
    tl.to(['.mk-h0', '.mk-h1', '.mk-h2', '.mk-h3'], { y: -8, opacity: 0, duration: 1, stagger: 1.2 }, 1.8);
    tl.fromTo('.mk-glint', { opacity: 0 }, { opacity: 1, duration: 0.25, yoyo: true, repeat: 5 }, 0.8);
  }, { loop: 7 });
  return (
    <Svg ref={ref}>
      <Room wall="#ffe9f0" floor="#d6aa7d" fy={68} />
      <defs><clipPath id="mkc"><rect x="102" y="14" width="40" height="52" rx="4" /></clipPath></defs>
      <rect x="99" y="11" width="46" height="58" rx="6" fill="#d3a64a" {...st} />
      <rect x="102" y="14" width="40" height="52" rx="4" fill="#dff3ff" />
      <g clipPath="url(#mkc)">
        <G x={120} y={64} s={0.9}><g className="mk-refl"><g transform="scale(-1 1)"><Cat /></g></g></G>
        <path className="mk-glint" d="M106 20 L116 20 L106 34Z" fill="#fff" opacity=".6" />
      </g>
      <g className="mk-cat"><G x={48} y={78} s={1.5}><Cat /></G></g>
      {[0, 1, 2, 3].map((i) => <G key={i} x={66 + i * 6} y={40}><g className={`mk-h${i}`} opacity="0"><Heart s={1.1} /></g></G>)}
      <G x={92} y={30}><Sparkle s={1.4} /></G>
    </Svg>
  );
}

/* ===== 9. Chuột sa chĩnh gạo: chuột rơi vào chĩnh gạo đầy, vui sướng ăn ===== */
export function ChuotChinh({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.cc-mouse', { y: -70, opacity: 1 }, { y: 0, duration: 0.9, ease: 'bounce.out' }, 0.4);
    tl.to('.cc-pile', { y: -1.6, duration: 0.2, yoyo: true, repeat: 1 }, 1.3);
    tl.to('.cc-mouse', { y: -2.4, duration: 0.25, yoyo: true, repeat: 15, ease: 'sine.inOut' }, 1.6);
    tl.fromTo('.cc-grain', { y: 0, opacity: 0 }, { y: -10, opacity: 1, duration: 0.6, stagger: 0.25, repeat: 3, repeatDelay: 0.1, ease: 'power1.out' }, 1.4);
    tl.fromTo('.cc-heart', { y: 0, opacity: 0 }, { y: -12, opacity: 1, duration: 0.9, stagger: 0.6, repeat: 1 }, 2.2);
    tl.to('.cc-mouse .tail', { rotation: 16, duration: 0.3, yoyo: true, repeat: 15, transformOrigin: '100% 100%' }, 1.4);
  }, { loop: 7 });
  return (
    <Svg ref={ref}>
      <Sky id="cc" a="#fff1d6" b="#ffe6c0" ground={70} gcol="#e7c9a0" />
      <G x={80} y={62} s={1.3}>
        <Jar />
        <g className="cc-pile">
          <path d="M-12 -12 Q0 -30 12 -12Z" fill="#fff6dc" {...st} strokeWidth=".7" />
          {[[-5, -16], [2, -20], [6, -15], [-1, -13], [-8, -13], [9, -13]].map(([x, y], i) => <ellipse key={i} cx={x} cy={y} rx="1.5" ry=".8" fill="#f3d9a0" />)}
        </g>
        <g className="cc-mouse" opacity="0"><G x={0} y={-24} s={0.85}><Mouse /></G></g>
      </G>
      {[[58, 24], [80, 18], [102, 24]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="cc-heart" opacity="0"><Heart s={1} /></g></G>)}
      {[[70, 38], [84, 34], [92, 40]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="cc-grain" opacity="0"><ellipse rx="1.6" ry=".9" fill="#f3d9a0" {...st} strokeWidth=".4" /></g></G>)}
    </Svg>
  );
}

/* ===== 10. Mò kim đáy bể: tìm cây kim bé xíu ở dưới đáy biển rộng mênh mông ===== */
export function MoKim({ running }) {
  const lens = (
    <g>
      <rect x="-1" y="0" width="2" height="16" rx="1" fill="#8a5630" />
      <circle cx="0" cy="22" r="7" fill="#dff3ff" fillOpacity=".55" stroke="#8d99ae" strokeWidth="1.6" />
      <path d="M-4 19 Q-3 16 0 16" fill="none" stroke="#fff" strokeWidth="1" />
    </g>
  );
  const ref = useScene(running, (tl) => {
    tl.fromTo('.mkim-arm', { rotation: -75 }, { rotation: -30, duration: 1.8, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 0.3);
    tl.to('.mkim-k-head', { rotation: 8, duration: 0.9, yoyo: true, repeat: 7, transformOrigin: '50% 100%' }, 0);
    tl.to('.mkim-fish', { x: -190, duration: 7, ease: 'none' }, 0);
    tl.fromTo('.mkim-bub', { y: 0, opacity: 0 }, { y: -26, opacity: 1, duration: 1.3, stagger: 0.4, repeat: 4, ease: 'none' }, 0);
    tl.fromTo('.mkim-glint', { opacity: 0 }, { opacity: 1, duration: 0.3, yoyo: true, repeat: 9 }, 0.2);
    tl.to('.mkim-q', { opacity: 1, duration: 0.2 }, 0);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <defs><linearGradient id="mkim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7fd6ff" /><stop offset="1" stopColor="#1f6fb5" /></linearGradient></defs>
      <rect width="160" height="90" fill="url(#mkim)" />
      <path d="M0 78 Q40 72 80 78 T160 76 V90 H0Z" fill="#e8d29a" />
      <path d="M0 84 Q50 80 100 85 T160 83 V90 H0Z" fill="#d6bd82" />
      {[[16, 80], [138, 78], [120, 82]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q-3 -9 -1 -16 M${x} ${y} q3 -8 2 -14`} stroke="#ff8fab" strokeWidth="1.8" fill="none" strokeLinecap="round" />)}
      <G x={90} y={79} s={0.55}><Needle /></G>
      <G x={96} y={77}><g className="mkim-glint"><Sparkle s={1.4} /></g></G>
      <G x={36} y={78}><Kid p="mkim-k" shirt="#ffd166" pants="#3b4a7a" hair="#2b2d42" handR={<g className="mkim-arm">{lens}</g>} /></G>
      <G x={0} y={0}><g className="mkim-fish"><G x={190} y={30} s={0.7}><Fish /></G><G x={250} y={52} s={0.5}><Fish /></G></g></G>
      {[0, 1, 2].map((i) => <G key={i} x={42 + i * 3} y={44}><g className="mkim-bub" opacity="0"><circle r={1.4 + i * 0.4} fill="#fff" fillOpacity=".35" stroke="#fff" strokeWidth=".4" /></g></G>)}
      <G x={64} y={34}><g className="mkim-q" opacity="0"><Question s={1.2} /></g></G>
    </Svg>
  );
}
