import { Svg, G, Sky, Cloud, Sun, Sparkle, Tree, Flower, useScene, C, INK, st } from './kit.jsx';
import { Kid, Room, Desk, Book, BookClosed, Cert, Star, Heart, Sweat, Exclaim, Question, Bubble, Bulb, Scallion, walkCycle, mouth } from './kit2.jsx';
import { Whetstone, Drop, Rock, Calendar, Bowl, Spoon } from './props.jsx';
import { Meadow, Horse, Cow, Deer, Elephant, Fairy, Barrel, Knife, Orange, OrangeHalf } from './art.jsx';

/* Mỗi cảnh: 0-5 giây hình đánh lừa, 5-12 giây chi tiết khoá hiện ra, sau đó lặp lại. */

const TXT = { fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, textAnchor: 'middle', dominantBaseline: 'central' };

const SeaWave = ({ x = 0 }) => <path d={`M${x} 0 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 t20 0 V30 H${x}Z`} />;

/* ===== 1. Muốn sang thì bắc cầu Kiều, muốn con hay chữ thì yêu lấy thầy ===== */
export function CauKieu({ running }) {
  const ref = useScene(running, (tl) => {
    [0, 1, 2, 3, 4, 5].forEach((i) => tl.fromTo(`.pl${i}`, { y: -26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'bounce.out' }, 0.8 + i * 0.35));
    tl.fromTo('.q1', { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 0.3);
    tl.to('.q1', { opacity: 0, duration: 0.2 }, 2.8);
    tl.to('.kidA', { x: 112, duration: 2.6, ease: 'none' }, 2.8);
    walkCycle(tl, 'ka', 2.8, 2.6);
    tl.to('.pa', { opacity: 0, duration: 0.5 }, 5.8);
    tl.fromTo('.pb', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 5.8);
    tl.fromTo('.kidB', { x: 0 }, { x: 24, duration: 1.4, ease: 'power2.out' }, 6.4);
    tl.to('.kb-head', { rotation: 14, duration: 0.5, yoyo: true, repeat: 3, transformOrigin: '50% 100%' }, 7.8);
    tl.fromTo('.ht', { scale: 0, opacity: 0, y: 4 }, { scale: 1, opacity: 1, y: -6, duration: 0.6, stagger: 0.3, ease: 'back.out(3)' }, 7.6);
    tl.fromTo('.cert1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 9.8);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 10);
  });
  return (
    <Svg ref={ref}>
      <g className="pa">
        <Meadow id="ck" ground={64} />
        <rect y="58" width="160" height="22" fill="#4cc9f0" opacity=".85" />
        <rect y="58" width="26" height="32" fill="#bfe3a5" /><rect x="134" y="58" width="26" height="32" fill="#bfe3a5" />
        <G x={20} y={22}><Cloud w={0.9} /></G>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <g key={i} className={`pl${i}`} opacity="0"><rect x={28 + i * 17} y={56 - Math.sin((i / 5) * Math.PI) * 10} width="15" height="4.4" rx="1" fill="#c98a52" {...st} strokeWidth=".6" /></g>
        ))}
        <G x={20} y={58}><g className="kidA"><Kid p="ka" /></g></G>
        <G x={20} y={26}><g className="q1" opacity="0"><Question s={1.4} /></g></G>
      </g>
      <g className="pb" opacity="0">
        <Room board win />
        <G x={118} y={74}><Kid p="kt" glasses shirt="#7c5cff" hair="#8d99ae" /></G>
        <G x={46} y={74}><g className="kidB"><Kid p="kb" shirt="#ef476f" girl /><G x={0} y={-12}><BookClosed s={0.8} c="#34d399" /></G></g></G>
        {[[80, 34], [92, 28], [104, 34]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="ht" opacity="0"><Heart s={1.5} /></g></G>)}
        <G x={132} y={26}><g className="cert1" opacity="0"><Cert s={1.8} n="10" /></g></G>
        {[[96, 50], [140, 46], [70, 20]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.5} /></g></G>)}
      </g>
    </Svg>
  );
}

/* ===== 4. Chớ thấy sóng cả mà ngã tay chèo ===== */
export function SongCa({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.sea1', { x: -40, duration: 2, repeat: -1, ease: 'none' }, 0);
    tl.to('.sea2', { x: -40, duration: 3, repeat: -1, ease: 'none' }, 0);
    tl.to('.boat', { y: 2, duration: 0.9, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 0);
    // mái chèo quay quanh chốt chèo và luôn đi qua bàn tay cầm: tay và chèo cùng góc, cùng nhịp
    tl.set('.kc-armR', { rotation: -52, transformOrigin: '50% 0%' }, 0);
    tl.set('.oar', { rotation: -24.88, transformOrigin: '50% 50%' }, 0);
    tl.to('.kc-armR', { rotation: -78, duration: 0.7, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 0);
    tl.to('.oar', { rotation: -13.62, duration: 0.7, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 0);
    tl.fromTo('.dark', { opacity: 0 }, { opacity: 0.45, duration: 1.2 }, 3.8);
    tl.fromTo('.bigwave', { x: 100, scaleY: 0.2 }, { x: -170, scaleY: 1, duration: 4.4, ease: 'power1.inOut', transformOrigin: '50% 100%' }, 4.6);
    tl.fromTo('.boat-all', { rotation: 0 }, { rotation: -14, duration: 1.4, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 5.8);
    tl.to('.boat-all', { rotation: 10, duration: 1.4, ease: 'sine.inOut' }, 7.2);
    tl.to('.boat-all', { rotation: 0, duration: 1, ease: 'sine.out' }, 8.6);
    tl.fromTo('.sw', { y: 0, opacity: 0 }, { y: 6, opacity: 1, duration: 0.6, stagger: 0.25, repeat: 3 }, 5.8);
    tl.to('.dark', { opacity: 0, duration: 1.2 }, 9);
    tl.fromTo('.isle', { x: 90 }, { x: 0, duration: 2.4, ease: 'power2.out' }, 9);
    tl.fromTo('.flagw', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)', transformOrigin: '0% 100%' }, 10.6);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 11);
  });
  return (
    <Svg ref={ref}>
      <Sky id="sc" a="#8fd0ff" b="#e8f6ff" ground={90} />
      <G x={128} y={16}><Sun /></G>
      <G x={40} y={22}><Cloud w={1} /></G>
      <g className="isle"><ellipse cx="136" cy="62" rx="22" ry="6" fill="#f1d8a0" /><G x={138} y={58}><Tree /></G></g>
      <defs><linearGradient id="seaG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6fd8f7" /><stop offset="1" stopColor="#2b8fd1" /></linearGradient></defs>
      <g fill="url(#seaG)" stroke="#fff" strokeOpacity=".6" strokeWidth=".8"><g transform="translate(0 56)"><g className="sea2"><SeaWave x={-40} /></g></g></g>
      <g className="boat-all"><G x={64} y={58}>
        <g className="boat">
          <path d="M-22 -2 H22 L16 8 H-16Z" fill="#c98a52" {...st} />
          <path d="M-20 1.6 H20 M-18 5 H18" stroke="#7a4a28" strokeWidth=".5" opacity=".6" fill="none" />
          <path d="M-22 -2 H22 L21.2 .2 H-21.2Z" fill="#e2b07a" stroke="none" />
          <path d="M0 -2 V-30 L16 -8Z" fill="#fff7e0" {...st} />
          <path d="M0 -20 L9 -12 M0 -12 L12 -6" stroke="#e6d6b0" strokeWidth=".5" fill="none" />
          <path d="M0 -30 L9 -18 L0 -8Z" fill="#fff" opacity=".5" />
          <G x={-8} y={-2}><Kid p="kc" shirt="#ff9f43" /></G>
          <G x={14} y={-2}><g className="oar"><rect x="-20" y="-20" width="40" height="40" fill="none" /><rect x="-.9" y="-19" width="1.8" height="34" rx=".9" fill="#7a4a28" /><path d="M-2.6 15 H2.6 L2 21 H-2 Z" fill="#a0643c" stroke="#2b2d42" strokeWidth=".4" /></g><circle r="1.2" fill="#e4ecf8" stroke="#2b2d42" strokeWidth=".4" /></G>
          <G x={-17} y={-34}><g className="sw" opacity="0"><Sweat s={0.9} /></g></G>
          <g transform="translate(0 -30)"><g className="flagw" opacity="0"><rect width="9" height="6" fill={C.red} {...st} strokeWidth=".5" /></g></g>
        </g>
      </G></g>
      <g className="bigwave"><G x={110} y={74}><path d="M-34 0 C-30 -34 6 -52 12 -30 C2 -28 6 -14 28 -10 L34 0Z" fill="#2b8fd1" {...st} /><path d="M-14 -22 C-8 -34 4 -38 8 -32" fill="none" stroke="#fff" strokeWidth="1.4" /></G></g>
      <g fill="#2b8fd1" stroke="#fff" strokeOpacity=".45" strokeWidth=".8"><g transform="translate(0 66)"><g className="sea1"><SeaWave x={-40} /></g></g></g>
      <rect className="dark" width="160" height="90" fill="#26304f" opacity="0" />
      {[[100, 30], [30, 44], [140, 40]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.5} /></g></G>)}
    </Svg>
  );
}

/* ===== 6. Dao có mài mới sắc, người có học mới nên ===== */
export function DaoMai({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.knife', { x: 14, duration: 0.45, yoyo: true, repeat: 9, ease: 'sine.inOut' }, 0.4);
    tl.fromTo('.spark', { scale: 0, opacity: 1, y: 0 }, { scale: 1, opacity: 0, y: -8, duration: 0.45, stagger: { each: 0.22, repeat: 8 } }, 0.5);
    tl.fromTo('.wd', { opacity: 0 }, { opacity: 0.7, duration: 0.2, stagger: 0.5, repeat: 3 }, 0.6);
    tl.to('.shine', { opacity: 1, duration: 1.2 }, 3.4);
    tl.to('.dull', { opacity: 0, duration: 1.2 }, 3.4);
    tl.to('.knife', { x: 0, duration: 0.3 }, 5);
    tl.to('.knifeA', { rotation: 90, y: -2, transformOrigin: '100% 50%', duration: 0.6, ease: 'power2.in' }, 5);
    tl.to('.pa', { opacity: 0, duration: 0.5 }, 6.6);
    tl.fromTo('.pb', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 6.6);
    tl.to('.kS-head', { rotation: 5, duration: 0.8, yoyo: true, repeat: 5, transformOrigin: '50% 100%' }, 7);
    tl.fromTo('.bulb', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 8.6);
    tl.fromTo('.cert2', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(2)' }, 9.8);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 10.2);
  });
  return (
    <Svg ref={ref}>
      <g className="pa">
        <defs><linearGradient id="wk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f7ecd9" /><stop offset="1" stopColor="#e6d3b2" /></linearGradient></defs>
        <rect width="160" height="90" fill="url(#wk)" />
        {[16, 48, 80, 112, 144].map((x) => <path key={x} d={`M${x} 0 V66`} stroke="#00000010" strokeWidth=".6" />)}
        <path d="M120 6 L128 30 M132 6 L132 30 M144 8 L136 30" stroke="#8d99ae" strokeWidth="1.4" strokeLinecap="round" />
        <rect y="66" width="160" height="24" fill="#c98a52" />
        <rect y="66" width="160" height="3" fill="#e2b07a" />
        {[72, 78, 84].map((y) => <path key={y} d={`M0 ${y} Q40 ${y - 1.4} 80 ${y} T160 ${y}`} stroke="#8a5a36" strokeWidth=".5" fill="none" opacity=".5" />)}
        <G x={80} y={66}><Whetstone /></G>
        <G x={74} y={59} s={1.3}>
          <g className="knifeA"><g className="knife">
            <Knife /><g className="dull"><path d="M-16 -3 L14 -3 Q20 -3 22 3 L-16 3Z" fill="#98a2b8" /></g>
            <path className="shine" d="M-12 -1.4 H16" stroke="#fff" strokeWidth="1.2" opacity="0" strokeLinecap="round" />
          </g></g>
        </G>
        {[0, 1, 2, 3, 4].map((i) => <G key={i} x={94 + (i % 3) * 5} y={62}><g className="spark"><Sparkle s={1.1 + (i % 2) * 0.4} /></g></G>)}
        {[0, 1, 2].map((i) => <G key={i} x={70 + i * 8} y={70}><g className="wd" opacity="0"><Drop s={0.5} /></g></G>)}
      </g>
      <g className="pb" opacity="0">
        <Room board win />
        <G x={78} y={64}><Desk w={46} h={14} /></G>
        <G x={70} y={74}><Kid p="kS" glasses /></G>
        <G x={70} y={52}><Book c="#4f8cff" w={16} h={4} /></G>
        <G x={70} y={26}><g className="bulb" opacity="0"><Bulb s={1.3} /></g></G>
        <G x={118} y={54}><g className="cert2" opacity="0"><Cert s={2.2} n="10" /></g></G>
        {[[100, 34], [124, 36], [48, 40]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.5} /></g></G>)}
      </g>
    </Svg>
  );
}

/* ===== 9. Khéo ăn thì no, khéo co thì ấm ===== */
export function KheoAn({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.spoon', { x: -24, y: -12, duration: 0.6, yoyo: true, repeat: 7, ease: 'sine.inOut' }, 0.4);
    tl.to('.porr', { scaleY: 0.2, duration: 4, ease: 'none', transformOrigin: '50% 100%' }, 0.4);
    tl.to('.belly', { scale: 1.25, duration: 4, ease: 'none', transformOrigin: '50% 50%' }, 0.4);
    tl.fromTo('.ht', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.2, ease: 'back.out(3)' }, 4.4);
    tl.to('.pa', { opacity: 0, duration: 0.5 }, 6);
    tl.fromTo('.pb', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 6);
    tl.fromTo('.cold', { opacity: 0, y: 0 }, { opacity: 1, y: 4, duration: 0.6, stagger: 0.25, repeat: 2 }, 6.4);
    tl.to('.feet', { x: -14, duration: 0.8, ease: 'power2.inOut' }, 9);
    tl.to('.cold', { opacity: 0, duration: 0.3 }, 9);
    tl.fromTo('.warm', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 9.6);
    tl.fromTo('.zz', { y: 0, opacity: 0 }, { y: -8, opacity: 1, duration: 0.8, stagger: 0.4, repeat: -1 }, 10);
  });
  return (
    <Svg ref={ref}>
      <g className="pa">
        <Room win />
        <G x={80} y={66}><Desk w={60} h={14} /></G>
        <G x={80} y={63}><Bowl /></G>
        <G x={80} y={63}><g className="porr"><ellipse cy="-10" rx="10" ry="3" fill="#fffaf0" /></g></G>
        <G x={46} y={76}><Kid p="kE" shirt="#ff9f43" /><G x={0} y={-17}><g className="belly"><ellipse rx="5" ry="4" fill="#ff9f43" opacity=".001" /></g></G></G>
        <G x={72} y={58}><g className="spoon"><g transform="scale(-1 1)"><Spoon /></g></g></G>
        {[[26, 34], [64, 28], [110, 40]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="ht" opacity="0"><Heart s={1.5} /></g></G>)}
      </g>
      <g className="pb" opacity="0">
        <rect width="160" height="90" fill="#26304f" />
        <g transform="translate(112 10)"><rect width="30" height="24" rx="2" fill="#3b4a7a" stroke="#8d99ae" strokeWidth=".8" /><path d="M15 0V24M0 12H30" stroke="#8d99ae" strokeWidth=".8" /><circle cx="8" cy="7" r="3.6" fill="#fff3b0" /><circle cx="9.6" cy="6" r="3" fill="#3b4a7a" /><circle cx="22" cy="17" r=".7" fill="#fff" /><circle cx="24" cy="6" r=".6" fill="#fff" /></g>
        <rect y="68" width="160" height="22" fill="#4a3f6b" />
        <ellipse cx="46" cy="52" rx="11" ry="5.4" fill="#fff7e0" stroke={INK} strokeWidth=".7" />
        <rect x="26" y="56" width="108" height="14" rx="3" fill="#8a5a36" {...st} />
        <G x={80} y={55}>
          <ellipse cx="-30" cy="-3" rx="10" ry="9" fill="#ffd9b8" {...st} />
          <path d="M-39 -5 C-38 -14 -26 -14 -22 -6 C-28 -9 -34 -8 -39 -5Z" fill={INK} />
          <rect x="-24" y="-8" width="28" height="14" rx="6" fill="#ffd9b8" {...st} strokeWidth=".6" />
          <g className="feet"><ellipse cx="38" cy="-1" rx="3" ry="2.2" fill="#ffd9b8" {...st} strokeWidth=".6" /><ellipse cx="38" cy="4" rx="3" ry="2.2" fill="#ffd9b8" {...st} strokeWidth=".6" /></g>
          <rect x="-16" y="-14" width="48" height="22" rx="7" fill="#ef476f" {...st} />
          <path d="M-10 -8 H26 M-10 -2 H26" stroke="#ffffff55" strokeWidth="1.2" />
        </G>
        {[0, 1, 2].map((i) => <G key={i} x={112 + i * 8} y={44 + (i % 2) * 6}><g className="cold" opacity="0"><path d="M0 -4 V4 M-3.5 -2 L3.5 2 M-3.5 2 L3.5 -2" stroke="#bfe6ff" strokeWidth="1" strokeLinecap="round" /></g></G>)}
        <G x={80} y={34}><g className="warm" opacity="0"><circle r="9" fill="#ffd166" opacity=".55" /><Heart s={1.4} /></g></G>
        {[0, 1].map((i) => <G key={i} x={44 + i * 8} y={42 - i * 4}><text className="zz" {...TXT} fontSize="9" fill="#fff" opacity="0">z</text></G>)}
      </g>
    </Svg>
  );
}

/* ===== 10. Vẽ đường cho hươu chạy ===== */
const PATH = [[34, 72], [56, 64], [76, 74], [98, 62], [122, 72], [150, 64]];
export function VeDuong({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.dr-head', { rotation: 12, duration: 0.7, yoyo: true, repeat: 5, transformOrigin: '50% 100%' }, 0);
    tl.fromTo('.trail', { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 4.4, ease: 'none' }, 0.6);
    tl.to('.kidP', { x: 96, duration: 4.4, ease: 'none' }, 0.6);
    walkCycle(tl, 'kp', 0.6, 4.4, 20);
    tl.fromTo('.ok', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 5.2);
    tl.fromTo('.exc', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(3)', transformOrigin: '50% 100%' }, 5.8);
    const kf = PATH.map(([x, y], i) => ({ x: x - 12, y: y - 72 + (i ? 0 : 0), duration: i ? 0.9 : 0.5, ease: 'sine.inOut' }));
    tl.to('.deer', { keyframes: kf, ease: 'none' }, 6);
    ['0', '1', '2', '3'].forEach((k, i) => tl.to(`.dl-${k}`, { rotation: i % 2 ? 40 : -40, duration: 0.14, yoyo: true, repeat: 40, transformOrigin: '50% 0%' }, 6));
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 10.4);
  });
  return (
    <Svg ref={ref}>
      <Meadow id="vd" ground={58} />
      <G x={140} y={16}><Sun /></G>
      <G x={26} y={22}><Cloud w={1} /></G>
      <polyline className="trail" points={PATH.map((p) => p.join(',')).join(' ')} fill="none" stroke="#7a4a28" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
      <G x={12} y={72}><g className="deer"><Deer /></g></G>
      <G x={26} y={80}><g className="kidP"><Kid p="kp" /><G x={14} y={-8}><rect x="0" y="0" width="1.6" height="10" rx=".8" fill="#ef476f" transform="rotate(20)" /></G></g></G>
      <G x={44} y={30}><g className="ok" opacity="0"><Bubble w={22} h={14} /><g transform="translate(0 0)"><Star s={1.1} /></g></g></G>
      <G x={132} y={26}><g className="exc" opacity="0"><Exclaim s={1.3} /></g></G>
      {[[100, 40], [126, 50], [70, 44]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.5} /></g></G>)}
    </Svg>
  );
}

/* ===== 11. Trăm hay không bằng tay quen ===== */
const PETAL = ['#ff6b9a', '#ff8fb3', '#ff6b9a', '#ff8fb3', '#ff6b9a', '#ff8fb3'];

/* khung thêu đặt trên chân đỡ; tâm khung ở (0,0) */
function Hoop({ children }) {
  return (
    <g>
      <rect x="-1" y="11" width="2" height="22" fill="#a0703c" {...st} strokeWidth=".5" />
      <rect x="-7" y="32" width="14" height="2.4" rx="1.2" fill="#a0703c" {...st} strokeWidth=".5" />
      <circle r="12" fill="#fff7e0" {...st} strokeWidth=".9" />
      {children}
      <circle r="12" fill="none" stroke="#c98a52" strokeWidth="2" />
      <circle r="13.1" fill="none" stroke={INK} strokeWidth=".7" />
      <rect x="-2" y="-15.6" width="4" height="3.2" rx=".8" fill="#e2b07a" {...st} strokeWidth=".6" />
    </g>
  );
}

const Needle = (
  <g>
    <rect x="-.45" y="-1" width=".9" height="6" rx=".4" fill="#e4ecf8" stroke={INK} strokeWidth=".3" />
    <path d="M0 -1 Q-3 -4 -2 -7" fill="none" stroke="#ef476f" strokeWidth=".5" />
  </g>
);

export function TramHay({ running }) {
  const ref = useScene(running, (tl) => {
    const O = '50% 0%';
    /* bạn A: nhiều bằng cấp nhưng thêu xấu, mỗi mũi kim một vết nguệch ngoạc */
    tl.fromTo('.cert', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.25, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 0.3);
    tl.fromTo('.tag', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)', transformOrigin: '50% 100%' }, 1);
    tl.to('.tagAr', { x: -2.5, y: -2.5, duration: 0.45, yoyo: true, repeat: 7, ease: 'sine.inOut' }, 1.5);
    tl.to('.kA-armR', { rotation: -100, duration: 0.4, transformOrigin: O }, 0.3);
    tl.fromTo('.kA-armR', { rotation: -92, transformOrigin: '50% 0%' }, { rotation: -108, duration: 0.25, yoyo: true, repeat: 15, ease: 'sine.inOut', transformOrigin: O }, 0.9);
    tl.fromTo('.ug', { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.5 }, 1.2);
    tl.fromTo('.sw', { y: 0, opacity: 0 }, { y: 6, opacity: 1, duration: 0.7, stagger: 0.4, repeat: 3 }, 1.6);
    tl.to('.kA-armR', { rotation: 0, duration: 0.3, transformOrigin: O }, 4.9);
    /* bạn B: không có bằng gì, nhưng tay quen nên mũi kim nhanh và đều, hoa nở dần */
    tl.fromTo('.ob', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 5);
    tl.to('.kB-armR', { rotation: -100, duration: 0.3, transformOrigin: O }, 5.4);
    tl.fromTo('.kB-armR', { rotation: -94, transformOrigin: '50% 0%' }, { rotation: -106, duration: 0.15, yoyo: true, repeat: 21, ease: 'sine.inOut', transformOrigin: O }, 5.8);
    tl.fromTo('.pt', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, stagger: 0.3, ease: 'back.out(3)', transformOrigin: '0px 0px' }, 5.9);
    tl.to('.kB-armR', { rotation: 0, duration: 0.3, transformOrigin: O }, 9.2);
    tl.fromTo('.st', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)', stagger: 0.2, transformOrigin: '50% 50%' }, 9.4);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 9.6);
  });
  return (
    <Svg ref={ref}>
      <rect width="80" height="90" fill="#efe6d8" /><rect x="80" width="80" height="90" fill="#e6f3e8" />
      <line x1="80" x2="80" y1="0" y2="90" stroke="#00000022" strokeWidth=".6" strokeDasharray="2 2" />
      <rect y="76" width="160" height="14" fill="#c98a52" /><rect y="76" width="160" height="2.2" fill="#e2b07a" />
      {/* bên trái: bằng cấp đầy tường nhưng thêu vụng */}
      {[[14, 14, '10'], [34, 22, '9.8'], [56, 14, 'A+']].map(([x, y, n], i) => <G key={i} x={x} y={y}><g className="cert" opacity="0"><Cert s={1} n={n} /></g></G>)}
      <G x={72} y={42}>
        <g className="tag" opacity="0">
          <rect x="-9" y="-5.5" width="18" height="11" rx="3" fill="#ffd166" {...st} strokeWidth=".7" />
          <text {...TXT} fontSize="8" fill="#ef476f" y=".4">100</text>
          <g className="tagAr"><path d="M-3 -6 L-9 -13" stroke="#ef476f" strokeWidth="1.6" strokeLinecap="round" /><path d="M-9 -13 L-4.2 -12.6 M-9 -13 L-8.6 -8.2" stroke="#ef476f" strokeWidth="1.6" strokeLinecap="round" fill="none" /></g>
        </g>
      </G>
      <G x={24} y={84}><Kid p="kA" shirt="#4f8cff" glasses handR={Needle} /></G>
      <G x={52} y={60}>
        <Hoop>
          <path className="ug" d="M-8 -3 L-4 -6 L-1 -1 L-6 3 L1 4" fill="none" stroke="#ef476f" strokeWidth="1" strokeLinecap="round" />
          <path className="ug" d="M2 -7 Q8 -6 5 -1 Q1 2 6 5" fill="none" stroke="#8d99ae" strokeWidth="1.2" strokeLinecap="round" />
          <circle className="ug" cx="-3" cy="6" r="1.8" fill="#ffd166" stroke="#7a4a28" strokeWidth=".6" />
          <path className="ug" d="M-6 -8 L0 -3 M-1 -8 L-5 -3" stroke="#7a4a28" strokeWidth=".9" strokeLinecap="round" />
          <path className="ug" d="M4 3 C8 4 9 7 6 8 C3 9 8 10 7 6" fill="none" stroke="#ef476f" strokeWidth=".9" strokeLinecap="round" />
          <path className="ug" d="M-8 6 Q-10 9 -6 9" fill="none" stroke="#34d399" strokeWidth="1.1" strokeLinecap="round" />
          <path className="ug" d="M-1 4 L1 8 M1 4 L-1 8" stroke="#4f8cff" strokeWidth=".9" strokeLinecap="round" />
        </Hoop>
      </G>
      {[0, 1].map((i) => <G key={i} x={18 + i * 12} y={36}><g className="sw" opacity="0"><Sweat s={0.9} /></g></G>)}
      {/* bên phải: không bằng cấp, tay quen */}
      <g className="ob" opacity="0">
        <G x={80} y={0}>
          <G x={24} y={84}><Kid p="kB" shirt="#ff9f43" hair="#8d99ae" handR={Needle} /></G>
          <G x={52} y={60}>
            <Hoop>
              <g transform="scale(.9) translate(0 -1)">
                <path className="pt" d="M0 3 Q-2 8 0 11" fill="none" stroke="#34a76a" strokeWidth="1.2" strokeLinecap="round" />
                <ellipse className="pt" cx="-3" cy="7" rx="3" ry="1.4" transform="rotate(-30 -3 7)" fill="#4cc38a" />
                <ellipse className="pt" cx="3" cy="8" rx="3" ry="1.4" transform="rotate(30 3 8)" fill="#4cc38a" />
                {PETAL.map((c, i) => <ellipse key={i} className="pt" cx="0" cy="-4.4" rx="2.4" ry="4.2" transform={`rotate(${i * 60})`} fill={c} stroke="#d94a7a" strokeWidth=".4" />)}
                <circle className="pt" r="2.4" fill="#ffd166" stroke="#c98a22" strokeWidth=".5" />
              </g>
            </Hoop>
          </G>
          {[[70, 22], [12, 30], [36, 14]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="st" opacity="0"><Star s={1.3} /></g></G>)}
          {[[52, 42], [66, 60], [40, 58]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.3} /></g></G>)}
        </G>
      </g>
    </Svg>
  );
}

/* ===== 12. Nước chảy đá mòn ===== */
export function NuocChay({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.drp', { y: -56, opacity: 1 }, { y: 0, duration: 0.5, repeat: 22, ease: 'power1.in' }, 0.4);
    tl.fromTo('.hole', { attr: { rx: 0, ry: 0 } }, { attr: { rx: 6, ry: 2.2 }, duration: 10, ease: 'none' }, 0.5);
    [0, 1, 2].forEach((i) => {
      tl.fromTo(`.day${i}`, { opacity: 0 }, { opacity: 0.5, duration: 0.8, yoyo: true, repeat: 1 }, 1 + i * 3);
      tl.fromTo(`.cal${i}`, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 1 + i * 3);
      tl.to(`.cal${i}`, { opacity: 0, duration: 0.3 }, 3.6 + i * 3);
    });
    tl.fromTo('.mag', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 10);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 10.4);
  });
  return (
    <Svg ref={ref}>
      <Meadow id="nc" ground={76} trees={false} />
      <rect className="day0" width="160" height="90" fill="#26304f" opacity="0" />
      <rect className="day1" width="160" height="90" fill="#26304f" opacity="0" />
      <rect className="day2" width="160" height="90" fill="#26304f" opacity="0" />
      <G x={80} y={0}><path d="M-3 0 C-4 10 4 10 3 0Z" fill={C.blue} /><rect x="-1.6" y="-4" width="3.2" height="6" fill="#8d99ae" /></G>
      <G x={80} y={68} s={1.5}>
        <Rock />
        <ellipse className="hole" cx="2" cy="-7.4" rx="0" ry="0" fill="#3c4560" />
        <g transform="translate(2 -8)"><g className="drp"><Drop s={0.7} /></g></g>
      </G>
      {[0, 1, 2].map((i) => <G key={i} x={26} y={26}><g className={`cal${i}`} opacity="0"><Calendar n={['1', '365', '9999'][i]} /></g></G>)}
      <G x={130} y={44}><g className="mag" opacity="0"><circle r="11" fill="#ffffff55" {...st} /><ellipse rx="5" ry="2" fill="#3c4560" /><path d="M8 8 L16 16" stroke={INK} strokeWidth="2.4" strokeLinecap="round" /></g></G>
      {[[110, 24], [46, 50], [124, 66]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.5} /></g></G>)}
    </Svg>
  );
}

/* ===== 13. Được voi đòi tiên ===== */
export function DuocVoi({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.eleph', { x: -70 }, { x: 0, duration: 2.6, ease: 'power1.out' }, 0.3);
    [0, 1, 2, 3].forEach((i) => tl.to(`.el-${i}`, { rotation: i % 2 ? 18 : -18, duration: 0.25, yoyo: true, repeat: 9, transformOrigin: '50% 0%' }, 0.3));
    tl.to('.kD-armL', { rotation: 160, duration: 0.3, transformOrigin: '50% 0%' }, 2.9);
    tl.to('.kD-armR', { rotation: -160, duration: 0.3, transformOrigin: '50% 0%' }, 2.9);
    mouth(tl, 'kD', 'S', 2.9);
    tl.to('.kidD', { y: -10, duration: 0.3, yoyo: true, repeat: 5, ease: 'power1.out' }, 3);
    tl.fromTo('.ht', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.2, ease: 'back.out(3)' }, 3.2);
    tl.fromTo('.fairy', { x: 70, y: -30, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 1.8, ease: 'power2.out' }, 5.4);
    tl.to('.fairy', { y: -4, duration: 0.6, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 7.2);
    tl.to('.wing', { scaleY: 0.5, duration: 0.15, yoyo: true, repeat: -1, transformOrigin: '50% 100%' }, 5.4);
    tl.to('.ht', { opacity: 0, duration: 0.3 }, 7.4);
    tl.set('.kD-armL', { rotation: 0 }, 7.4);
    tl.to('.kD-armR', { rotation: -130, duration: 0.4, transformOrigin: '50% 0%' }, 7.6);
    mouth(tl, 'kD', 'O', 7.6);
    tl.fromTo('.bubD', { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(3)', transformOrigin: '50% 100%' }, 8);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 8.4);
  });
  return (
    <Svg ref={ref}>
      <Meadow id="dv" ground={66} />
      <G x={28} y={20}><Cloud w={1} /></G>
      <G x={44} y={74} s={1.2}><g className="eleph"><Elephant /></g></G>
      <G x={112} y={76}><g className="kidD"><Kid p="kD" shirt="#ef476f" /></g></G>
      {[[90, 46], [112, 38], [132, 46]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="ht" opacity="0"><Heart s={1.4} /></g></G>)}
      <G x={104} y={24}><g className="fairy" opacity="0"><Fairy /></g></G>
      <G x={140} y={30}><g className="bubD"><Bubble w={20} h={14} tail="left" /><g><Star s={1.1} /></g></g></G>
      {[[90, 20], [128, 14], [116, 34]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.5} /></g></G>)}
    </Svg>
  );
}

/* ===== 14. Đồng cam cộng khổ ===== */
export function DongCam({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.orange', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'bounce.out' }, 0.3);
    tl.set('.orange', { opacity: 0 }, 1.6);
    tl.fromTo('.half1', { x: 0, opacity: 1 }, { x: -22, duration: 0.8, ease: 'power2.out' }, 1.6);
    tl.fromTo('.half2', { x: 0, opacity: 1 }, { x: 22, duration: 0.8, ease: 'power2.out' }, 1.6);
    tl.to('.half1', { y: -14, duration: 0.5, yoyo: true, repeat: 3 }, 2.6);
    tl.to('.half2', { y: -14, duration: 0.5, yoyo: true, repeat: 3 }, 2.6);
    tl.fromTo('.ht', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.2, ease: 'back.out(3)' }, 3);
    tl.to('.pa', { opacity: 0, duration: 0.5 }, 5.2);
    tl.fromTo('.pb', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 5.2);
    tl.fromTo('.rock', { y: -30 }, { y: 0, duration: 0.5, ease: 'bounce.out' }, 5.8);
    tl.to('.pair', { x: 40, duration: 4.4, ease: 'none' }, 6.6);
    walkCycle(tl, 'kF', 6.6, 4.4, 12);
    walkCycle(tl, 'kG', 6.6, 4.4, 12);
    tl.fromTo('.rn', { y: -6 }, { y: 80, duration: 0.7, repeat: 8, ease: 'none', stagger: 0.12 }, 5.4);
    tl.fromTo('.sw', { y: 0, opacity: 0 }, { y: 6, opacity: 1, duration: 0.7, stagger: 0.3, repeat: 4 }, 6.6);
    tl.to('.gloom', { opacity: 0, duration: 1 }, 10.6);
    tl.to('.rn', { opacity: 0, duration: 0.5 }, 10.6);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 11);
  });
  return (
    <Svg ref={ref}>
      <g className="pa">
        <Meadow id="dc" ground={66} />
        <G x={130} y={16}><Sun /></G>
        <G x={46} y={76}><Kid p="kD" shirt="#4f8cff" /></G>
        <G x={114} y={76}><Kid p="kE" shirt="#34d399" girl /></G>
        <G x={80} y={54}><g className="orange"><Orange /></g></G>
        <G x={80} y={54}><g className="half1" opacity="0"><G s={1}><OrangeHalf /></G></g></G>
        <G x={80} y={54}><g className="half2" opacity="0"><OrangeHalf /></g></G>
        {[[58, 24], [80, 18], [102, 24]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="ht" opacity="0"><Heart s={1.5} /></g></G>)}
      </g>
      <g className="pb" opacity="0">
        <Sky id="dc2" a="#8d99ae" b="#cfd6e6" ground={70} gcol="#9fc98d" />
        <rect className="gloom" width="160" height="90" fill="#44506e" opacity=".4" />
        <g className="pair">
          <G x={50} y={76}><Kid p="kF" shirt="#4f8cff" /></G>
          <G x={80} y={76}><Kid p="kG" shirt="#34d399" girl /></G>
          <G x={65} y={28} s={1.25}><g className="rock"><Rock /></g></G>
          <G x={44} y={40}><g className="sw" opacity="0"><Sweat s={0.9} /></g></G>
          <G x={86} y={40}><g className="sw" opacity="0"><Sweat s={0.9} /></g></G>
        </g>
        <g stroke="#bfe6ff" strokeWidth=".9" strokeLinecap="round">{Array.from({ length: 12 }, (_, i) => <line key={i} className="rn" x1={8 + i * 13} x2={6 + i * 13} y1="0" y2="6" />)}</g>
        {[[30, 30], [140, 40], [110, 20]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.5} /></g></G>)}
      </g>
    </Svg>
  );
}

/* ===== 15. Cưỡi ngựa xem hoa ===== */
export function CuoiNgua({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.fields', { x: 0 }, { x: -40, duration: 0.3, repeat: 40, ease: 'none' }, 0);
    tl.fromTo('.hills', { x: 0 }, { x: -50, duration: 2, repeat: 6, ease: 'none' }, 0);
    ['a', 'b', 'c', 'd'].forEach((k, i) => tl.to(`.hl-${k}`, { rotation: i % 2 ? 34 : -34, duration: 0.16, yoyo: true, repeat: -1, transformOrigin: '50% 0%' }, 0));
    tl.set('.kR-armR', { rotation: -60, transformOrigin: '50% 0%' }, 0);
    tl.to('.rider', { y: -2.4, duration: 0.16, yoyo: true, repeat: -1 }, 0);
    tl.to('.kR-head', { rotation: -10, duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0);
    tl.fromTo('.dust', { x: 0, opacity: 0.9, scale: 0.4 }, { x: -22, opacity: 0, scale: 1.2, duration: 0.7, stagger: 0.2, repeat: -1, transformOrigin: '50% 50%' }, 0);
    tl.fromTo('.q', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 5);
    tl.to('.q', { y: -3, duration: 0.5, yoyo: true, repeat: -1 }, 5.4);
    tl.fromTo('.sw', { y: 0, opacity: 0 }, { y: 6, opacity: 1, duration: 0.7, stagger: 0.35, repeat: -1 }, 6);
  });
  return (
    <Svg ref={ref}>
      <Meadow id="cn" ground={52} hills={false} trees={false} />
      <G x={132} y={16}><Sun /></G>
      <g opacity=".8"><g className="hills">{[0, 1, 2, 3, 4, 5, 6].map((i) => <ellipse key={i} cx={i * 36} cy="52" rx="22" ry="9" fill="#7fcf8f" />)}</g></g>
      <rect y="62" width="160" height="28" fill="#8fd58a" />
      <g className="fields">
        {Array.from({ length: 14 }, (_, i) => <G key={i} x={i * 20} y={52 + (i % 2) * 8}><Flower /></G>)}
      </g>
      {[0, 1, 2].map((i) => <G key={i} x={34} y={78}><circle className="dust" r="3" fill="#e6d3b3" /></G>)}
      <G x={74} y={68}><Horse /></G>
      <G x={76} y={60} s={0.62}><g className="rider"><Kid p="kR" shirt="#ef476f" handR={<g transform="rotate(60)"><path d="M0 0 Q12 3 24.2 10.2" fill="none" stroke="#7a4a28" strokeWidth="1" strokeLinecap="round" /><circle r="1.6" fill="#7a4a28" /></g>} /></g></G>
      <G x={96} y={22}><g className="q" opacity="0"><Question s={1.6} /></g></G>
      <G x={80} y={26}><g className="sw" opacity="0"><Sweat s={0.9} /></g></G>
    </Svg>
  );
}

/* ===== 16. Mất bò mới lo làm chuồng ===== */
export function MatBo({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.zz', { y: 0, opacity: 0 }, { y: -8, opacity: 1, duration: 0.9, stagger: 0.45, repeat: 3 }, 0.2);
    tl.to('.cow', { x: 120, duration: 4, ease: 'none' }, 1);
    tl.to('.cow-b', { y: -1.6, duration: 0.3, yoyo: true, repeat: 13 }, 1);
    tl.to('.gate', { rotation: -70, duration: 0.5, transformOrigin: '0% 100%' }, 0.8);
    tl.fromTo('.exc', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(3)', transformOrigin: '50% 100%' }, 5.2);
    tl.to('.zz', { opacity: 0, duration: 0.1 }, 5.2);
    tl.to('.kidM-armR', { rotation: 150, duration: 0.25, transformOrigin: '50% 0%' }, 5.2);
    tl.to('.kidM', { x: -22, duration: 0.9, ease: 'power1.inOut' }, 5.8);
    tl.to('.exc', { opacity: 0, duration: 0.3 }, 6.6);
    tl.to('.kidM-armR', { rotation: 70, duration: 0.2, yoyo: true, repeat: 17, transformOrigin: '50% 0%' }, 6.8);
    [0, 1, 2, 3].forEach((i) => tl.fromTo(`.nf${i}`, { scaleY: 0, opacity: 0 }, { scaleY: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)', transformOrigin: '50% 100%' }, 7 + i * 0.9));
    tl.to('.gate', { rotation: 0, duration: 0.4 }, 10.6);
    tl.fromTo('.sw', { y: 0, opacity: 0 }, { y: 6, opacity: 1, duration: 0.6, stagger: 0.25, repeat: 3 }, 7);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 11);
  });
  return (
    <Svg ref={ref}>
      <Meadow id="mb" ground={62} />
      <G x={140} y={16}><Sun /></G>
      <G x={30} y={22}><Cloud w={1} /></G>
      {/* chuồng */}
      <g {...st} strokeWidth=".8">
        <rect x="14" y="40" width="4" height="30" fill="#8a5a36" /><rect x="14" y="48" width="64" height="3.4" fill="#c98a52" /><rect x="14" y="58" width="64" height="3.4" fill="#c98a52" />
        <rect x="52" y="40" width="4" height="30" fill="#8a5a36" /><rect x="74" y="40" width="4" height="30" fill="#8a5a36" />
        <g transform="translate(78 70)"><g className="gate"><rect x="0" y="-22" width="3.4" height="22" fill="#8a5a36" /><rect x="0" y="-18" width="16" height="3" fill="#c98a52" /></g></g>
      </g>
      <G x={44} y={70}><g className="cow"><g className="cow-b"><Cow /></g></g></G>
      {[0, 1, 2, 3].map((i) => <G key={i} x={92 + i * 14} y={72}><g className={`nf${i}`} opacity="0"><rect x="-2" y="-30" width="4" height="30" fill="#8a5a36" {...st} strokeWidth=".6" /><rect x="-12" y="-24" width="14" height="3" fill="#c98a52" {...st} strokeWidth=".5" /><rect x="-12" y="-12" width="14" height="3" fill="#c98a52" {...st} strokeWidth=".5" /></g></G>)}
      <G x={118} y={82}><g className="kidM"><Kid p="kidM" shirt="#a0643c" /><G x={9} y={-26}><g className="exc" opacity="0"><Exclaim s={1.3} /></g></G></g></G>
      {[0, 1, 2].map((i) => <G key={i} x={118 + i * 7} y={42 - i * 4}><text className="zz" {...TXT} fontSize={8 + i * 2} fill="#7c5cff" stroke={INK} strokeWidth=".4" paintOrder="stroke" opacity="0">z</text></G>)}
      <G x={112} y={44}><g className="sw" opacity="0"><Sweat s={0.9} /></g></G>
      {[[100, 34], [140, 46], [90, 56]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

/* ===== Câu mẫu: Thùng rỗng kêu to ===== */
export function ThungRong({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.stickA', { rotation: -50, duration: 0.3, yoyo: true, repeat: 15, ease: 'power2.in', transformOrigin: '50% 100%' }, 0.6);
    tl.to('.barA', { rotation: 3, duration: 0.15, yoyo: true, repeat: 30, transformOrigin: '50% 100%' }, 0.6);
    tl.fromTo('.waveA', { scale: 0.3, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.6, stagger: 0.2, repeat: 7, transformOrigin: '0% 50%' }, 0.7);
    tl.fromTo('.loud', { scale: 0, opacity: 0 }, { scale: 1.1, opacity: 1, duration: 0.3, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 0.7);
    tl.to('.kT-armL', { rotation: -150, duration: 0.2, transformOrigin: '50% 0%' }, 1.2);
    tl.to('.kT-armR', { rotation: 150, duration: 0.2, transformOrigin: '50% 0%' }, 1.2);
    tl.fromTo('.fullb', { x: 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, 4.6);
    tl.to('.stickA', { x: 30, duration: 0.01 }, 4.5);
    tl.to('.quiet', { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 7);
    tl.fromTo('.stickB', { rotation: 0 }, { rotation: -40, duration: 0.5, yoyo: true, repeat: 5, ease: 'power1.in', transformOrigin: '50% 100%' }, 6);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 9);
  });
  return (
    <Svg ref={ref}>
      <Room board win />
      <G x={48} y={76}><g className="barA"><Barrel /></g></G>
      <G x={72} y={40}><g className="loud" opacity="0"><text {...TXT} fontSize="11" fill="#ef476f" stroke={INK} strokeWidth=".7" paintOrder="stroke">ĐÙNG!</text></g></G>
      {[0, 1, 2].map((i) => <G key={i} x={60} y={64}><path className="waveA" d="M0 -8 Q6 0 0 8" fill="none" stroke="#ef476f" strokeWidth="1.2" opacity="0" /></G>)}
      <G x={20} y={78}><Kid p="kT" shirt="#4f8cff" /></G>
      <G x={34} y={60}><rect className="stickA" x="-1" y="-20" width="2" height="20" rx="1" fill="#8a5326" /></G>
      <g className="fullb" opacity="0"><G x={120} y={76}><Barrel full /></G></g>
      <G x={106} y={60}><rect className="stickB" x="-1" y="-20" width="2" height="20" rx="1" fill="#8a5326" /></G>
      <G x={132} y={34}><g className="quiet" opacity="0"><text {...TXT} fontSize="7" fill="#2b8fd1" stroke={INK} strokeWidth=".4" paintOrder="stroke">bộp</text></g></G>
      {[[96, 30], [142, 52], [8, 40]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}
