import { Svg, G, Sky, Cloud, Sun, Sparkle, Tree, useScene, C, INK, st } from './kit.jsx';
import { Kid, Room, Bulb, Sweat, Heart, Star, Exclaim, Cert, Trophy, mouth } from './kit2.jsx';
import { SH, theta, hand, pose, swing, steps, along } from './rig.jsx';

/* Các cảnh dựng lại với tay cầm đồ vật chính xác: đồ vật nằm trong tay (handL/handR)
   hoặc được tính vị trí bằng theta()/hand() trong rig.jsx, không để đồ vật một đằng, tay một nẻo. */

const TXT = { fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, textAnchor: 'middle', dominantBaseline: 'central' };

/* ============================================================
   1. Muốn sang thì bắc cầu Kiều, muốn con hay chữ thì yêu lấy thầy
   ============================================================ */
const BR = { x0: 46, x1: 114, yb: 66, rise: 48 };
const deckY = (x) => {
  const t = (x - BR.x0) / (BR.x1 - BR.x0);
  return x < BR.x0 || x > BR.x1 ? BR.yb : BR.yb - BR.rise * t * (1 - t);
};
const CY = BR.yb - BR.rise / 2; // điểm điều khiển của đường cong mặt cầu
const footY = (x) => deckY(x) - 1.5;
const WALK = Array.from({ length: 23 }, (_, i) => { const x = 38 + i * 4; return [x, footY(x)]; });

/* thầy đồ ngồi: gốc (0,0) là đáy chỗ ngồi */
function Teacher({ p = 'tr' }) {
  return (
    <g {...st} strokeWidth=".7">
      <ellipse cx="0" cy="-3" rx="15" ry="5" fill="#2f5d7a" />
      <path d="M-8 -6 L-9 -24 Q0 -28 9 -24 L8 -6Z" fill="#3b7aa0" />
      <path d="M-3 -26 L0 -17 L3 -26" fill="#fff7e0" strokeWidth=".5" />
      <rect x="-7" y="-10" width="14" height="4.4" rx=".8" fill="#fff7e0" />
      <path d="M0 -10 V-5.6" strokeWidth=".4" />
      <g transform="translate(8 -22)">
        <rect x="-2.4" y="0" width="4.8" height="10" rx="2.2" fill="#3b7aa0" />
        <circle cy="10.6" r="2.1" fill="#f6d2b0" />
        <path d="M-1 12 Q-5 16 -6 11" fill="none" stroke="#f6d2b0" strokeWidth="1" />
      </g>
      <g transform="translate(0 -33)">
        <g className={`${p}-head`}>
          <circle r="7" fill="#f6d2b0" />
          <path d="M-6.6 1.6 Q-7 14 0 18 Q7 14 6.6 1.6 Q0 7 -6.6 1.6Z" fill="#fff" />
          <path d="M-4.4 3 Q-2 1.2 0 2.8 Q2 1.2 4.4 3 Q2 4.4 0 3.8 Q-2 4.4 -4.4 3Z" fill="#fff" strokeWidth=".4" />
          <path d="M-7.6 -2.6 Q-7.6 -12.4 0 -12.4 Q7.6 -12.4 7.6 -2.6 Q0 -5 -7.6 -2.6Z" fill="#26282f" />
          <path d="M-7.4 -3.6 Q0 -6 7.4 -3.6" fill="none" stroke="#ffd166" strokeWidth=".8" />
          <path d="M-4.4 -.6 q1.2 -1.2 2.4 0 M2 -.6 q1.2 -1.2 2.4 0" fill="none" strokeWidth=".6" />
          <path d="M-5 -2.4 L-1.6 -2.8 M1.6 -2.8 L5 -2.4" stroke="#fff" strokeWidth=".9" />
        </g>
      </g>
      {/* tay trái người xem: cầm thước */}
      <g transform="translate(-8 -22)">
        <g className={`${p}-arm`}>
          <rect x="-20" y="0" width="40" height="30" fill="none" stroke="none" />
          <rect x="-2.4" y="0" width="4.8" height="10" rx="2.2" fill="#3b7aa0" />
          <circle cy="10.6" r="2.1" fill="#f6d2b0" />
          <g transform="translate(0 10.6)"><rect x="-.55" y="-3" width="1.1" height="21" rx=".5" fill="#8a5326" /></g>
        </g>
      </g>
    </g>
  );
}

/* học trò đứng sau bàn thấp, cầm bút lông chép bài; hệ toạ độ cục bộ rồi scale 0.8 */
function Student({ p, shirt, x, y, hair }) {
  return (
    <G x={x} y={y} s={0.8}>
      <rect x="6" y="-11.2" width="9.4" height="2.6" rx=".4" fill="#fff" {...st} strokeWidth=".4" />
      <path className={`${p}-w`} d="M7.4 -10.6 q1.2 -.8 2 0 t2 0 t2 0 M7.4 -9.4 q1.2 -.8 2 0 t2 0" fill="none" stroke={INK} strokeWidth=".4" pathLength="1" strokeDasharray="1" strokeDashoffset="1" />
      <Kid p={p} shirt={shirt} hair={hair} handR={<g transform="rotate(25)"><rect x="-.5" y="-8" width="1" height="9" rx=".4" fill="#8a5326" /><path d="M-.9 .6 L0 3 L.9 .6Z" fill="#222" /></g>} />
      <g {...st} strokeWidth=".6">
        <rect x="-16" y="-8.6" width="32" height="8.6" fill="#c98a52" />
        <rect x="-16" y="-9.6" width="32" height="1.6" rx=".6" fill="#e2b07a" />
      </g>
    </G>
  );
}

export function CauKieu({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.sea', { x: -20, duration: 1.6, repeat: 4, ease: 'none' }, 0);
    tl.set('.kidA', { x: WALK[0][0], y: WALK[0][1] }, 0);
    along(tl, '.kidA', WALK, 0.8, 4);
    steps(tl, 'ka', 0.8, 4, 24);
    tl.fromTo('.plq', { y: -6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out' }, 0.3);
    tl.to('.pa', { opacity: 0, duration: 0.5 }, 5.6);
    tl.fromTo('.pb', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 5.6);
    [0, 1, 2, 3].forEach((i) => {
      tl.fromTo(`.s${i}-w`, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.5, repeat: 8, ease: 'none' }, 6.4 + i * 0.1);
      tl.fromTo(`.s${i}-armR`, { rotation: -22, transformOrigin: '50% 0%' }, { rotation: -30, duration: 0.25, repeat: 22, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 6.4 + i * 0.1);
      tl.to(`.s${i}-armL`, { rotation: 25, duration: 0.01, transformOrigin: '50% 0%' }, 0);
      tl.to(`.s${i}-armR`, { rotation: -25, duration: 0.01, transformOrigin: '50% 0%' }, 0);
      tl.to(`.s${i}-head`, { rotation: 6, duration: 0.5, yoyo: true, repeat: 9, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 6.4 + i * 0.2);
    });
    tl.to('.tr-arm', { rotation: 34, duration: 0.5, transformOrigin: '50% 0%' }, 6);
    tl.to('.tr-arm', { rotation: 24, duration: 0.45, repeat: 9, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 6.5);
    tl.to('.tr-head', { rotation: -5, duration: 0.9, repeat: 5, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 6.4);
    tl.fromTo('.ht', { y: 0, opacity: 0, scale: 0.4 }, { y: -26, opacity: 1, scale: 1, duration: 1.1, stagger: 0.35, ease: 'power1.out', transformOrigin: '50% 50%' }, 8.4);
    tl.to('.ht', { opacity: 0, duration: 0.3, stagger: 0.35 }, 9.6);
    tl.fromTo('.cert1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 10);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 10.2);
  });
  const Rail = () => {
    const xs = [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => BR.x0 + (i * (BR.x1 - BR.x0)) / 8);
    return (
      <g>
        <path d={`M${BR.x0} ${BR.yb - 9} Q80 ${CY - 9} ${BR.x1} ${BR.yb - 9}`} fill="none" stroke="#a0643c" strokeWidth="1.2" />
        {xs.map((x) => <line key={x} x1={x} x2={x} y1={deckY(x) - 1.5} y2={deckY(x) - 9} stroke="#a0643c" strokeWidth=".8" />)}
      </g>
    );
  };
  return (
    <Svg ref={ref}>
      <g className="pa">
        <Sky id="ck" a="#9bd6ff" b="#f4fbff" ground={72} gcol="#a7dc90" />
        <G x={130} y={16}><Sun /></G>
        <G x={30} y={20}><Cloud w={1} /></G>
        <G x={96} y={14}><Cloud w={0.8} /></G>
        {/* sông */}
        <rect x="0" y="72" width="160" height="18" fill="#4cc9f0" />
        <g opacity=".7" fill="none" stroke="#fff" strokeWidth=".7"><g className="sea">{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} d={`M${i * 24 - 10} ${77 + (i % 2) * 6} q4 -2 8 0 t8 0`} />)}</g></g>
        {/* hai bờ */}
        <path d={`M0 65 H${BR.x0} V90 H0Z`} fill="#c9a06a" /><path d={`M0 65 H${BR.x0} V70 H0Z`} fill="#8fd58a" />
        <path d={`M${BR.x1} 65 H160 V90 H${BR.x1}Z`} fill="#c9a06a" /><path d={`M${BR.x1} 65 H160 V70 H${BR.x1}Z`} fill="#8fd58a" />
        {/* cầu */}
        <path d={`M${BR.x0} ${BR.yb} Q80 ${CY} ${BR.x1} ${BR.yb} V78 H${BR.x0}Z`} fill="#b8b3c9" {...st} strokeWidth=".7" />
        <path d={`M56 78 Q80 ${64 - 4} 104 78Z`} fill="#4cc9f0" {...st} strokeWidth=".7" />
        <path d={`M${BR.x0} ${BR.yb} Q80 ${CY} ${BR.x1} ${BR.yb}`} fill="none" stroke="#7a4a28" strokeWidth="4.2" />
        <path d={`M${BR.x0} ${BR.yb} Q80 ${CY} ${BR.x1} ${BR.yb}`} fill="none" stroke="#c98a52" strokeWidth="3" />
        <Rail />
        <G x={142} y={66}><Tree /></G>
        {/* biển tên cầu */}
        <g className="plq">
          <rect x="11" y="44" width="2" height="22" fill="#7a4a28" />
          <rect x="1" y="38" width="28" height="9" rx="1.6" fill="#8a5a36" {...st} strokeWidth=".7" />
          <text x="15" y="42.8" {...TXT} fontSize="5.6" fill="#fff7e0">CẦU KIỀU</text>
        </g>
        <g className="kidA"><g transform="scale(.8)"><Kid p="ka" shirt="#ef476f" girl /></g></g>
      </g>
      <g className="pb" opacity="0">
        <Room board win />
        {/* bục cao của thầy */}
        <rect x="50" y="46" width="60" height="5" rx="1" fill="#a0643c" {...st} strokeWidth=".7" />
        {[54, 106].map((x) => <rect key={x} x={x - 1.2} y="51" width="2.4" height="8" fill="#7a4a28" />)}
        <G x={80} y={46} s={0.9}><Teacher /></G>
        {[[24, '#4f8cff', '#2b2d42'], [58, '#34d399', '#2b2d42'], [102, '#ff9f43', '#8d99ae'], [136, '#7c5cff', '#2b2d42']].map(([x, shirt, hair], i) => (
          <Student key={i} p={`s${i}`} shirt={shirt} hair={hair} x={x} y={86} />
        ))}
        {[[40, 66], [92, 66], [120, 66]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="ht" opacity="0"><Heart s={1.2} /></g></G>)}
        <G x={136} y={24}><g className="cert1" opacity="0"><Cert s={1.6} n="10" /></g></G>
        {[[96, 24], [64, 30], [26, 52]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
      </g>
    </Svg>
  );
}

/* ============================================================
   2. Đi một ngày đàng, học một sàng khôn
   ============================================================ */
const V = 11;
const X_EV = [3.4, 6.5, 9.6].map((t) => 92 + V * (t - 0.5));
const SPOT = [3.4, 6.5, 9.6];

function Sieve() {
  return (
    <g {...st} strokeWidth=".7">
      <ellipse cy="3" rx="13" ry="4.2" fill="#8a5a36" />
      <ellipse rx="13" ry="4.2" fill="#e7c37f" />
      <ellipse rx="10.4" ry="3" fill="#d9a85a" opacity=".8" />
      <path d="M-9 -1.2 L-3 2 M-3 -2.6 L3 2.4 M3 -2.6 L9 .8" stroke="#b88a3d" strokeWidth=".5" fill="none" />
    </g>
  );
}

export function DiNgayDang({ running }) {
  const ref = useScene(running, (tl) => {
    const end = 10.6;
    tl.fromTo('.world', { x: 0 }, { x: -V * (end - 0.5), duration: end - 0.5, ease: 'none' }, 0.5);
    tl.fromTo('.farCl', { x: 0 }, { x: -3 * (end - 0.5), duration: end - 0.5, ease: 'none' }, 0.5);
    steps(tl, 'kd', 0.5, end - 0.5, 22);
    tl.to('.kd-armR', { rotation: -30, duration: 0.01, transformOrigin: '50% 0%' }, 0);
    // ba ngày: mỗi ngày một sắc trời
    [0, 1, 2].forEach((i) => {
      const t0 = 0.3 + i * 3.4;
      tl.fromTo(`.day${i}`, { opacity: 0, y: 4, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '0% 50%' }, t0);
      tl.to(`.day${i}`, { opacity: 0, duration: 0.3 }, t0 + 2.6);
      tl.fromTo('.tint', { opacity: 0.4 }, { opacity: 0, duration: 1.2 }, t0);
      tl.to('.tint', { opacity: 0.25, duration: 1.4 }, t0 + 1.8);
    });
    // sự kiện 1: gặp mưa rồi cầu vồng
    tl.fromTo('.rainC', { y: -10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, SPOT[0] - 1.6);
    tl.fromTo('.rd', { y: 0, opacity: 1 }, { y: 28, opacity: 0, duration: 0.5, stagger: 0.08, repeat: 6, ease: 'none' }, SPOT[0] - 1.4);
    tl.to('.rainC', { opacity: 0, duration: 0.4 }, SPOT[0] + 0.6);
    tl.fromTo('.rbow', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.6, transformOrigin: '50% 100%' }, SPOT[0] + 0.6);
    // sự kiện 2: bác nông dân làm việc
    tl.fromTo('.f1-armR', { rotation: -20 }, { rotation: -75, duration: 0.45, yoyo: true, repeat: 7, ease: 'power1.inOut', transformOrigin: '50% 0%' }, SPOT[1] - 2.6);
    // sự kiện 3: cụ đồ cầm sách
    tl.fromTo('.bk3', { scale: 0.7 }, { scale: 1, duration: 0.5, ease: 'back.out(3)', transformOrigin: '50% 100%' }, SPOT[2] - 1.4);
    // mỗi chuyện thành một ánh sáng bay vào cái sàng
    SPOT.forEach((t, i) => {
      tl.fromTo(`.b${i}`, { x: 0, y: 0, scale: 0, opacity: 0 }, { scale: 1.2, opacity: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 50%' }, t);
      tl.to(`.b${i}`, { x: 50, y: -26, scale: 0.6, duration: 0.9, ease: 'power2.in' }, t + 0.6);
      tl.set(`.b${i}`, { opacity: 0 }, t + 1.5);
      tl.fromTo(`.fl${i}`, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 100%' }, t + 1.5);
    });
    tl.fromTo('.halo', { opacity: 0, scale: 0.6 }, { opacity: 0.85, scale: 1.2, duration: 1.2, transformOrigin: '50% 50%' }, 10.8);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(2)' }, 11);
  });
  const tree = (x, s = 1) => <G key={x} x={x} y={74} s={s}><Tree /></G>;
  return (
    <Svg ref={ref}>
      <Sky id="dn" a="#9bd6ff" b="#f4fbff" ground={74} gcol="#a7dc90" />
      <G x={96} y={16}><Sun /></G>
      <g className="farCl"><G x={30} y={18}><Cloud w={1} /></G><G x={110} y={26}><Cloud w={0.8} /></G><G x={190} y={16}><Cloud w={1} /></G><G x={260} y={24}><Cloud w={0.9} /></G></g>
      <rect y="74" width="160" height="16" fill="#d9c08f" />
      <g className="world">
        <rect x="-10" y="74" width="420" height="16" fill="#d9c08f" />
        <rect x="-10" y="74" width="420" height="2.4" fill="#e9d6a8" />
        {[10, 70, 130, 214, 262, 300].map((x, i) => tree(x, 0.8 + (i % 3) * 0.12))}
        {/* ngày 1: mưa */}
        <G x={X_EV[0]} y={0}>
          <g className="rainC" opacity="0"><G x={0} y={24}><Cloud w={1.2} /></G></g>
          {Array.from({ length: 7 }, (_, i) => <line key={i} className="rd" x1={-14 + i * 5} x2={-15 + i * 5} y1="34" y2="40" stroke="#4cc9f0" strokeWidth="1" strokeLinecap="round" />)}
          <g className="rbow" opacity="0" transform="translate(0 74)">{['#ff6b6b', '#ffd166', '#4cc38a', '#4cc9f0'].map((c, i) => <path key={c} d={`M${-22 + i * 2.4} 0 A${22 - i * 2.4} ${20 - i * 2} 0 0 1 ${22 - i * 2.4} 0`} fill="none" stroke={c} strokeWidth="2.2" />)}</g>
        </G>
        {/* ngày 2: bác nông dân với cái cuốc */}
        <G x={X_EV[1]} y={72} s={0.78}>
          <Kid p="f1" shirt="#a0643c" hair="#8d99ae" handR={<g transform="rotate(20)"> <rect x="-.6" y="-6" width="1.2" height="17" rx=".5" fill="#8a5326" /><rect x="-3.4" y="10" width="6.8" height="3" rx=".6" fill="#98a2b8" stroke={INK} strokeWidth=".4" /></g>} />
          <path d="M-9 -37 Q0 -50 9 -37Z M-13 -36 H13" fill="#e7c37f" {...st} strokeWidth=".6" />
        </G>
        {/* ngày 3: cụ đồ cầm sách */}
        <G x={X_EV[2]} y={72} s={0.78}>
          <Kid p="f2" shirt="#2f5d7a" hair="#fff" glasses />
          <g className="bk3"><G x={0} y={-13}><rect x="-8" y="-5" width="16" height="9" rx="1" fill="#fff7e0" {...st} strokeWidth=".6" /><path d="M0 -5 V4" stroke={INK} strokeWidth=".5" /></G></g>
        </G>
        {SPOT.map((t, i) => <G key={i} x={X_EV[i]} y={40}><g className={`b${i}`} opacity="0"><Bulb s={1.1} /></g></G>)}
      </g>
      {/* bạn nhỏ đi bộ, tay phải chống gậy: gậy nằm trong tay */}
      <G x={44} y={80}><Kid p="kd" shirt="#ef476f" girl handR={<g transform="rotate(30)"><rect x="-.7" y="-5" width="1.4" height="18" rx=".6" fill="#8a5326" /></g>} /></G>
      <rect className="tint" width="160" height="90" fill="#ff8a5c" opacity="0" />
      {/* cái sàng ở góc trên: nơi tích luỹ ánh sáng */}
      <G x={132} y={14}>
        <g className="halo" opacity="0"><circle r="20" fill="#ffd166" opacity=".4" /></g>
        <Sieve />
        {[-6, 0, 6].map((x, i) => <G key={i} x={x} y={-1}><g className={`fl${i}`} opacity="0"><Bulb s={0.55} /></g></G>)}
      </G>
      {['Ngày 1', 'Ngày 2', 'Ngày 3'].map((d, i) => (
        <g key={i} className={`day${i}`} opacity="0"><G x={8} y={10}><rect width="26" height="10" rx="5" fill="#26304f" opacity=".85" /><text x="13" y="5.4" {...TXT} fontSize="5.6" fill="#fff">{d}</text></G></g>
      ))}
      {[[24, 40], [118, 46], [76, 22]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

/* ============================================================
   3. Thất bại là mẹ thành công: vật tay, thua tới lần thứ 8 mới thắng
   ============================================================ */
const PY = SH.y + 84 + Math.sqrt(SH.r * SH.r - 9.6 * 9.6); // độ cao hai bàn tay nắm nhau
const GAP = 16;
const frames = (a, b, wob, n) => Array.from({ length: n + 1 }, (_, i) => {
  const s = i / n;
  const ease = s * s * (3 - 2 * s);
  return a + (b - a) * ease + wob * Math.sin(s * 40) * (1 - s * 0.4);
});

export function ThatBai({ running }) {
  const ref = useScene(running, (tl) => {
    const put = (px) => ({ xl: px - GAP, xr: px + GAP, al: theta(1, GAP, PY - 84), ar: theta(-1, -GAP, PY - 84) });
    const run = (from, to, at, dur, wob) => {
      const pxs = frames(from, to, wob, Math.round(dur / 0.15));
      const d = dur / (pxs.length - 1);
      const o = pxs.slice(1).map((px) => put(px));
      tl.to('.kl', { keyframes: o.map((v) => ({ x: v.xl, duration: d, ease: 'none' })) }, at);
      tl.to('.kr', { keyframes: o.map((v) => ({ x: v.xr, duration: d, ease: 'none' })) }, at);
      tl.to('.kl-armR', { keyframes: o.map((v) => ({ rotation: v.al, duration: d, ease: 'none' })), transformOrigin: '50% 0%' }, at);
      tl.to('.kr-armL', { keyframes: o.map((v) => ({ rotation: v.ar, duration: d, ease: 'none' })), transformOrigin: '50% 0%' }, at);
    };
    const p0 = put(80);
    tl.set('.kl', { x: p0.xl }, 0); tl.set('.kr', { x: p0.xr }, 0);
    tl.set('.kl-armR', { rotation: p0.al, transformOrigin: '50% 0%' }, 0); tl.set('.kr-armL', { rotation: p0.ar, transformOrigin: '50% 0%' }, 0);
    tl.set('.kl-armL', { rotation: 18, transformOrigin: '50% 0%' }, 0); tl.set('.kr-armR', { rotation: -18, transformOrigin: '50% 0%' }, 0);
    mouth(tl, 'kl', 'O', 0.6); mouth(tl, 'kr', 'S', 0.6);
    // phần A: bên trái bị đẩy lùi
    run(80, 62, 0.6, 4, 2);
    tl.fromTo('.fx', { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.1, repeat: 6, yoyo: true, transformOrigin: '50% 50%' }, 0.8);
    tl.fromTo('.sw', { y: 0, opacity: 0 }, { y: 6, opacity: 1, duration: 0.6, stagger: 0.25, repeat: 3 }, 1.2);
    tl.fromTo('.lose', { scale: 0, opacity: 0, rotation: -12 }, { scale: 1, opacity: 1, rotation: -6, duration: 0.5, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 4.7);
    tl.to('.kl-head', { rotation: -14, duration: 0.4, transformOrigin: '50% 100%' }, 4.7);
    // thẻ chuyển cảnh: lần thứ 8
    tl.to('.card', { opacity: 1, duration: 0.4 }, 5.7);
    for (let n = 1; n <= 8; n++) {
      tl.fromTo(`.n${n}`, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.18, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 6.2 + (n - 1) * 0.28);
      if (n < 8) tl.to(`.n${n}`, { opacity: 0, duration: 0.1 }, 6.2 + n * 0.28);
      tl.fromTo(`.tally${n}`, { opacity: 0 }, { opacity: 1, duration: 0.1 }, 6.2 + (n - 1) * 0.28);
    }
    tl.set('.lose', { opacity: 0 }, 6.4);
    tl.set('.kl', { x: p0.xl }, 6.4); tl.set('.kr', { x: p0.xr }, 6.4);
    tl.set('.kl-armR', { rotation: p0.al }, 6.4); tl.set('.kr-armL', { rotation: p0.ar }, 6.4);
    tl.set('.kl-head', { rotation: 0 }, 6.4);
    tl.set('.sw', { opacity: 0 }, 6.4);
    tl.to('.card', { opacity: 0, duration: 0.4 }, 8.8);
    // phần B: bên trái thắng
    mouth(tl, 'kl', 'S', 9);
    mouth(tl, 'kr', 'O', 9);
    run(80, 98, 9.1, 2.8, 1.4);
    tl.to('.kr-head', { rotation: 12, duration: 0.5, transformOrigin: '50% 100%' }, 11.6);
    tl.to('.kl-armL', { rotation: 150, duration: 0.4, transformOrigin: '50% 0%' }, 12);
    tl.fromTo('.win', { scale: 0, opacity: 0, rotation: 10 }, { scale: 1, opacity: 1, rotation: 5, duration: 0.5, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 11.9);
    tl.fromTo('.cup', { y: -30, opacity: 0, scale: 0.5 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'bounce.out', transformOrigin: '50% 100%' }, 12.2);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(2)' }, 12.4);
  });
  return (
    <Svg ref={ref}>
      <Room win />
      <g className="kl"><G x={0} y={84}><Kid p="kl" shirt="#4f8cff" /></G></g>
      <g className="kr"><G x={0} y={84}><Kid p="kr" shirt="#ef476f" hair="#8d99ae" /></G></g>
      {/* bàn: hai bàn tay nằm ngay trên mặt bàn */}
      <rect x="30" y="70" width="100" height="20" rx="2" fill="#c98a52" {...st} strokeWidth=".8" />
      <rect x="30" y="70" width="100" height="3" rx="1.4" fill="#e2b07a" />
      {[0, 1, 2].map((i) => <G key={i} x={52 + i * 3} y={50 - i * 2}><g className="fx" opacity="0"><path d="M0 0 L-3 -4 M0 0 L0 -5 M0 0 L3 -4" stroke="#ff9f43" strokeWidth="1" strokeLinecap="round" /></g></G>)}
      <G x={34} y={46}><g className="sw" opacity="0"><Sweat s={1} /></g></G>
      <G x={50} y={44}><g className="sw" opacity="0"><Sweat s={0.9} /></g></G>
      <G x={44} y={26}><g className="lose" opacity="0"><text {...TXT} fontSize="15" fill="#ef476f" stroke={INK} strokeWidth="1" paintOrder="stroke">LOSE</text></g></G>
      <G x={118} y={26}><g className="win" opacity="0"><text {...TXT} fontSize="15" fill="#34d399" stroke={INK} strokeWidth="1" paintOrder="stroke">WIN!</text></g></G>
      <G x={132} y={54}><g className="cup" opacity="0"><Trophy s={1.4} /></g></G>
      {[[24, 40], [90, 20], [112, 50]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
      {/* thẻ chuyển cảnh */}
      <g className="card" opacity="0">
        <rect width="160" height="90" fill="#1b1450" />
        <text x="80" y="22" {...TXT} fontSize="9" fill="#c4b5fd">THỬ SỨC LẦN THỨ</text>
        {Array.from({ length: 8 }, (_, i) => <text key={i} className={`n${i + 1}`} x="80" y="50" {...TXT} fontSize="34" fill={i === 7 ? '#ffd166' : '#fff'} opacity="0">{i + 1}</text>)}
        {Array.from({ length: 8 }, (_, i) => <rect key={i} className={`tally${i + 1}`} x={52 + i * 7} y="72" width="3" height="10" rx="1.2" fill={i === 7 ? '#ffd166' : '#8d99ae'} opacity="0" />)}
      </g>
    </Svg>
  );
}

void C; void Exclaim; void Star; void hand; void swing;
