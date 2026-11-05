import { Svg, G, Sky, Cloud, Sparkle, Tree, Fish, useScene, C, INK, st } from './kit.jsx';
import { Kid, Exclaim, Question, walkCycle, mouth } from './kit2.jsx';
import { Meadow, Elephant, Deer } from './art.jsx';
import { Mouse, Drop } from './props.jsx';
import { Rabbit, Croc, Flame, pop, life } from './xpkit.jsx';

/* ===== 11. Đầu voi đuôi chuột: nửa trước là voi to, nửa sau chỉ là con chuột bé tí ===== */
export function DauVoi({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.dv-all', { x: -18 }, { x: 18, duration: 7, ease: 'none' }, 0);
    tl.to('.dv-e .el-0, .dv-e .el-3', { rotation: 18, duration: 0.45, yoyo: true, repeat: 15, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 0);
    tl.to('.dv-e .el-1, .dv-e .el-2', { rotation: -18, duration: 0.45, yoyo: true, repeat: 15, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 0);
    tl.to('.dv-bob', { y: -1.6, duration: 0.45, yoyo: true, repeat: 15, ease: 'sine.inOut' }, 0);
    tl.to('.dv-m .tail', { rotation: 22, duration: 0.3, yoyo: true, repeat: 23, ease: 'sine.inOut', transformOrigin: '100% 50%' }, 0);
    tl.to('.dv-m .paw', { y: -1.2, duration: 0.2, yoyo: true, repeat: 35 }, 0);
    pop(tl, '.dv-star', 0, 0, 0.6, 0.4);
    pop(tl, '.dv-star2', 0, 0, 1.4, 0.4);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <Meadow id="dv" ground={64} sun trees={false} />
      <defs>
        <clipPath id="dvE"><rect x="-2" y="-40" width="90" height="80" /></clipPath>
        <clipPath id="dvM"><rect x="-40" y="-30" width="42" height="60" /></clipPath>
      </defs>
      <g className="dv-all"><g className="dv-bob">
        <G x={86} y={50} s={1.5}><g clipPath="url(#dvE)" className="dv-e"><Elephant /></g></G>
        <G x={80.4} y={48} s={1.3}><g clipPath="url(#dvM)" className="dv-m"><Mouse /></g></G>
      </g></g>
      <G x={120} y={26}><g className="dv-star" opacity="0"><Sparkle s={2.2} /></g></G>
      <G x={52} y={36}><g className="dv-star2" opacity="0"><Sparkle s={1.6} fill="#ff8fab" /></g></G>
    </Svg>
  );
}

/* ===== 12. Rút dây động rừng: kéo nhẹ sợi dây leo, cả khu rừng rung lên, thú chạy toán loạn ===== */
export function RutDay({ running }) {
  const trees = [[22, 46], [54, 46], [98, 46], [136, 46]];
  const ref = useScene(running, (tl) => {
    tl.set(['.rd-deer', '.rd-rabbit', '.rd-ex'], { opacity: 0 }, 0);
    tl.to('.rd-k-armR', { rotation: 150, duration: 0.5, ease: 'power2.in', transformOrigin: '50% 0%' }, 1.4);
    tl.fromTo('.rd-vine', { rotation: 0, svgOrigin: '74 0' }, { rotation: 7, svgOrigin: '74 0', duration: 0.3, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 1.8);
    trees.forEach(([x, y], i) => tl.to(`.rd-t${i}`, { rotation: i % 2 ? 4 : -4, svgOrigin: '0 15', duration: 0.18, yoyo: true, repeat: 11, ease: 'sine.inOut' }, 2.2 + i * 0.1));
    life(tl, '.rd-leaf', { y: 0 }, { y: 34, x: 8, duration: 1.2, stagger: 0.15, repeat: 2, ease: 'none' }, 2.3);
    pop(tl, '.rd-ex', 0, 0, 2.6, 0.3);
    tl.set('.rd-deer', { opacity: 1 }, 2.7);
    tl.fromTo('.rd-deer', { x: 0 }, { x: 110, duration: 2.6, ease: 'power1.in' }, 2.7);
    tl.to('.rd-deer-j', { y: -4, duration: 0.2, yoyo: true, repeat: 11 }, 2.7);
    tl.set('.rd-rabbit', { opacity: 1 }, 3.0);
    tl.fromTo('.rd-rabbit', { x: 0 }, { x: -90, duration: 2.2, ease: 'power1.in' }, 3.0);
    tl.to('.rd-rabbit-j', { y: -5, duration: 0.2, yoyo: true, repeat: 9 }, 3.0);
    tl.fromTo('.rd-bird', { x: 0, y: 0, opacity: 1 }, { x: 40, y: -40, opacity: 0, duration: 1.8, stagger: 0.2, ease: 'power1.in' }, 2.5);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <Sky id="rd" a="#7fd1a5" b="#d9f3d0" ground={70} gcol="#7fbf7a" />
      <g className="rd-deer"><G x={96} y={68} s={0.85}><g className="rd-deer-j"><g transform="scale(1 1)"><Deer /></g></g></G></g>
      <g className="rd-rabbit"><G x={44} y={72}><g className="rd-rabbit-j"><g transform="scale(-1 1)"><Rabbit /></g></g></G></g>
      {trees.map(([x, y], i) => <G key={x} x={x} y={y} s={1.5}><g className={`rd-t${i}`}><Tree canopy={i % 2 ? '#3fae6a' : '#4fbf7a'} /></g></G>)}
      {[0, 1, 2].map((i) => <G key={i} x={62 + i * 26} y={30}><path className="rd-bird" d="M-3 0 Q-1.5 -2.6 0 0 Q1.5 -2.6 3 0" stroke={INK} strokeWidth=".9" fill="none" strokeLinecap="round" /></G>)}
      {[0, 1, 2, 3, 4, 5].map((i) => <G key={i} x={24 + i * 22} y={24 + (i % 3) * 4}><ellipse className="rd-leaf" rx="2.4" ry="1.2" fill="#9be3a4" stroke="#3f9a55" strokeWidth=".4" opacity="0" /></G>)}
      <g className="rd-vine"><path d="M74 0 C70 16 78 32 74 50" fill="none" stroke="#2f9e6a" strokeWidth="2.2" strokeLinecap="round" />{[12, 26, 40].map((y, i) => <ellipse key={y} cx={i % 2 ? 78 : 70} cy={y} rx="3.4" ry="1.7" fill="#4cc38a" stroke="#2f9e6a" strokeWidth=".4" />)}</g>
      <G x={66} y={80}><Kid p="rd-k" shirt="#ffd166" pants="#3b4a7a" hair="#2b2d42" /></G>
      <G x={114} y={38}><g className="rd-ex" opacity="0"><Exclaim s={1.6} /></g></G>
    </Svg>
  );
}

/* ===== 13. Thêm dầu vào lửa: lửa đang nhỏ, đổ thêm dầu và lửa bùng lên ===== */
export function ThemDau({ running }) {
  const ref = useScene(running, (tl) => {
    tl.set(['.td-oil', '.td-spark', '.td-ex'], { opacity: 0 }, 0);
    tl.to('.td-flame', { scaleY: 1.12, duration: 0.2, yoyo: true, repeat: 38, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0);
    tl.to('.td-bottle', { keyframes: [{ x: 14, y: -8, rotation: 0, duration: 0.8 }, { x: 32, y: -20, rotation: 100, duration: 0.8 }, { x: 32, y: -20, rotation: 100, duration: 2.2 }, { x: 10, y: 0, rotation: 0, duration: 0.9 }], duration: 4.7, ease: 'sine.inOut' }, 0.4);
    tl.fromTo('.td-oil', { strokeDashoffset: 1, opacity: 1 }, { strokeDashoffset: 0, duration: 0.7, ease: 'none' }, 1.6);
    tl.to('.td-oil', { opacity: 0, duration: 0.3 }, 3.9);
    tl.fromTo('.td-f', { scale: 0.55, svgOrigin: '0 0' }, { scale: 1.5, svgOrigin: '0 0', duration: 1.2, ease: 'power2.out' }, 2.3);
    tl.to('.td-f', { scale: 0.7, svgOrigin: '0 0', duration: 2, ease: 'sine.inOut' }, 5.2);
    tl.fromTo('.td-spark', { y: 0, opacity: 0 }, { y: -26, opacity: 1, duration: 0.9, stagger: 0.2, ease: 'power1.out' }, 2.6);
    mouth(tl, 'td-k', 'O', 2.5);
    pop(tl, '.td-ex', 0, 0, 2.5, 0.3);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <Sky id="td" a="#4b3b86" b="#f2a76b" ground={68} gcol="#5c7f52" />
      <G x={102} y={70}>
        <rect x="-18" y="-2" width="36" height="5" rx="2.4" fill="#8a5630" {...st} transform="rotate(-8)" />
        <rect x="-18" y="-2" width="36" height="5" rx="2.4" fill="#a0643c" {...st} transform="rotate(8)" />
      </G>
      <G x={102} y={68}><g className="td-f"><g className="td-flame"><Flame /></g></g></G>
      <G x={50} y={80}><Kid p="td-k" shirt="#4f8cff" pants="#3b4a7a" hair="#2b2d42" /></G>
      <G x={62} y={50}>
        <g className="td-bottle"><g transform="rotate(0)"><rect x="-4" y="-2" width="8" height="12" rx="2" fill="#ef476f" {...st} strokeWidth=".7" /><rect x="-2" y="-6" width="4" height="5" fill="#ef476f" {...st} strokeWidth=".7" /><rect x="-2.4" y="-8" width="4.8" height="2.4" rx=".8" fill="#ffd166" {...st} strokeWidth=".6" /><rect x="-3" y="2" width="6" height="4" fill="#fff" opacity=".7" /></g></g>
      </G>
      <path className="td-oil" d="M96 38 C98 48 100 56 102 62" fill="none" stroke="#f4a521" strokeWidth="2.4" strokeLinecap="round" pathLength="1" strokeDasharray="1" />
      {[[94, 52], [110, 54], [102, 48]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="td-spark"><Sparkle s={1.1} fill="#ffb347" /></g></G>)}
      <G x={50} y={38}><g className="td-ex" opacity="0"><Exclaim s={1.5} /></g></G>
    </Svg>
  );
}

/* ===== 14. Nước mắt cá sấu: cá sấu rơi nước mắt nhưng miệng vẫn nhai con mồi ===== */
export function NuocMatCaSau({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.nm-c .jaw-dn', { rotation: 12, svgOrigin: '10 -1', duration: 0.35, yoyo: true, repeat: 17, ease: 'sine.inOut' }, 0);
    life(tl, '.nm-tear', { y: 0 }, { y: 16, duration: 0.9, stagger: 0.45, repeat: 6, ease: 'power1.in' }, 0.2);
    tl.to('.nm-fish', { rotation: 6, duration: 0.35, yoyo: true, repeat: 17, svgOrigin: '0 0' }, 0);
    tl.to('.nm-c .tail', { rotation: 6, duration: 0.7, yoyo: true, repeat: 9, ease: 'sine.inOut', transformOrigin: '100% 50%' }, 0);
    life(tl, '.nm-bub', { y: 0 }, { y: -14, duration: 1.2, stagger: 0.5, repeat: 4, ease: 'none' }, 0);
  }, { loop: 7 });
  return (
    <Svg ref={ref}>
      <Sky id="nm" ground={56} gcol="#9fd8ff" />
      <G x={30} y={16}><Cloud w={1} /></G>
      <G x={124} y={22}><Cloud w={0.8} /></G>
      <rect y="56" width="160" height="34" fill="#4cc9f0" opacity=".85" />
      <ellipse cx="70" cy="70" rx="64" ry="7" fill="#e8d29a" />
      <G x={58} y={68} s={1.3}><g className="nm-c"><Croc /></g></G>
      <G x={92} y={63}><g className="nm-fish"><g transform="scale(-0.55 0.55) rotate(-10)"><Fish /></g></g></G>
      {[0, 1].map((i) => <G key={i} x={74.4 + i * 1.5} y={53.4}><g className="nm-tear" opacity="0"><Drop s={0.75} /></g></G>)}
      {[0, 1, 2].map((i) => <G key={i} x={100 + i * 14} y={64 + (i % 2) * 6}><g className="nm-bub" opacity="0"><circle r={1.2 + i * 0.3} fill="#fff" fillOpacity=".4" stroke="#fff" strokeWidth=".4" /></g></G>)}
    </Svg>
  );
}

/* ===== 15. Rồng rắn lên mây: hàng bạn nhỏ nắm áo nhau uốn lượn như con rồng ===== */
export function RongRan({ running }) {
  const cols = ['#ef476f', '#4f8cff', '#2fd6a0', '#ff9a3d', '#7c5cff', '#ffd166'];
  const ref = useScene(running, (tl) => {
    cols.forEach((_, i) => walkCycle(tl, `rr${i}`, 0, 6.6));
    tl.to('.rr-k', { y: -5, duration: 0.3, yoyo: true, repeat: 21, stagger: 0.12, ease: 'sine.inOut' }, 0);
    tl.fromTo('.rr-all', { x: -8 }, { x: 8, duration: 6.6, ease: 'none' }, 0);
    tl.to('.rr-head', { y: -4, rotation: -5, duration: 0.4, yoyo: true, repeat: 15, ease: 'sine.inOut', transformOrigin: '20% 100%' }, 0);
    tl.to('.rr-cloud', { x: 26, duration: 6.6, ease: 'none' }, 0);
    tl.fromTo('.rr-sp', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, yoyo: true, repeat: 1, stagger: 0.7, transformOrigin: '50% 50%' }, 1);
  }, { loop: 7 });
  return (
    <Svg ref={ref}>
      <Sky id="rr" a="#8ad0ff" b="#fff0c9" ground={74} gcol="#bfe3a5" />
      <g className="rr-cloud"><G x={26} y={18}><Cloud w={1.1} /></G><G x={92} y={12}><Cloud w={0.9} /></G></g>
      <g className="rr-all">
        {cols.map((c, i) => (
          <G key={i} x={20 + i * 20} y={82}><g className="rr-k"><G s={0.78}><Kid p={`rr${i}`} shirt={c} pants="#3b4a7a" hair={i % 2 ? '#a0643c' : '#2b2d42'} girl={i % 3 === 2} /></G></g></G>
        ))}
        <G x={142} y={52}>
          <g className="rr-head">
            <path d="M-8 -2 C-8 -12 6 -14 12 -8 C16 -4 14 6 6 6 C-2 8 -8 4 -8 -2Z" fill="#ef476f" {...st} />
            <path d="M-3 -11 L-5 -18 L1 -12Z M3 -12 L4 -19 L8 -11Z" fill="#ffd166" {...st} strokeWidth=".6" />
            <circle cx="6" cy="-4" r="1.6" fill="#fff" /><circle cx="6.6" cy="-4" r=".8" fill={INK} stroke="none" />
            <path d="M12 0 Q18 2 20 -2 M12 2 Q18 6 21 3" stroke={C.yellow} strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M-8 2 Q-14 6 -12 12" stroke="#ef476f" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          </g>
        </G>
      </g>
      {[[100, 30], [128, 24], [70, 24]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="rr-sp" opacity="0"><Sparkle s={1.6} /></g></G>)}
    </Svg>
  );
}
