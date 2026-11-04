import { Svg, G, Sky, Cloud, Sun, Sparkle, useScene, INK, st } from './kit.jsx';
import { Kid, Room, Desk, Bulb, Sweat, Heart, Star, Exclaim, Cert, Bubble, mouth } from './kit2.jsx';
import { Whetstone, Drop, Rock, Bowl } from './props.jsx';
import { Meadow, Deer, Cow, Knife, Orange, OrangeHalf, Barrel } from './art.jsx';
import { hand, pose, steps, along } from './rig.jsx';

/* Các cảnh dựng lại với đồ vật nằm trong tay hoặc tính vị trí theo tay, xem rig.jsx. */

const TXT = { fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, textAnchor: 'middle', dominantBaseline: 'central' };

/* ============================================================
   6. Dao có mài mới sắc, người có học mới nên
   ============================================================ */
const KS = 1.3; // tỉ lệ con dao và đá mài
const STONE_TOP = 62.4;
const KNIFE_Y = STONE_TOP - 3 * KS; // lưỡi dao nằm sát mặt đá

export function DaoMai({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.kA', { x: -8 }, { x: 8, duration: 0.45, yoyo: true, repeat: 9, ease: 'sine.inOut' }, 0.4);
    tl.fromTo('.spark', { scale: 0, opacity: 1, y: 0 }, { scale: 1, opacity: 0, y: -8, duration: 0.45, stagger: { each: 0.22, repeat: 8 } }, 0.5);
    tl.fromTo('.wd', { opacity: 0 }, { opacity: 0.8, duration: 0.2, stagger: 0.5, repeat: 3 }, 0.6);
    tl.to('.shine', { opacity: 1, duration: 1.2 }, 3.4);
    tl.to('.kA', { x: 0, duration: 0.3 }, 5);
    tl.to('.kLift', { y: -14, rotation: -8, duration: 0.6, ease: 'power2.out', transformOrigin: '50% 50%' }, 5);
    tl.to('.pa', { opacity: 0, duration: 0.5 }, 6.4);
    tl.fromTo('.pb', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 6.4);
    // phần B: bạn đọc sách, tay giữ đúng hai mép quyển sách
    tl.set('.kS-armL', { rotation: 10, transformOrigin: '50% 0%' }, 0);
    tl.set('.kS-armR', { rotation: -10, transformOrigin: '50% 0%' }, 0);
    tl.to('.kS-head', { rotation: 7, duration: 0.8, yoyo: true, repeat: 5, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 7);
    tl.fromTo('.pgl', { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.5, repeat: 3, yoyo: true }, 7);
    tl.fromTo('.bulb', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 8.6);
    tl.fromTo('.cert2', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'back.out(2)' }, 9.8);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 10.2);
  });
  const [lx, ly] = hand(-1, 10);
  const [rx, ry] = hand(1, -10);
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
        <G x={80} y={STONE_TOP + 4 * KS} s={KS}><Whetstone /></G>
        {/* tay + cổ tay áo + dao là một khối, cùng trượt trên đá */}
        <g className="kLift"><g className="kA">
          <G x={84} y={KNIFE_Y} s={KS}>
            <Knife />
            <g className="shine" opacity="0"><Knife shiny /></g>
            <g transform="translate(-23 -1) rotate(-22)">
              <rect x="-90" y="-5.4" width="84" height="10.8" rx="3" fill="#4f8cff" {...st} strokeWidth=".7" />
              <rect x="-9" y="-6" width="4" height="12" rx="1" fill="#fff" {...st} strokeWidth=".6" />
              <circle r="4.8" fill="#ffd9b8" {...st} strokeWidth=".7" />
              <path d="M-2.4 -3.6 Q0 -5.4 2.6 -3.6 M-2.6 -1 Q0 -2.8 2.8 -1 M-2.6 1.6 Q0 -.2 2.8 1.6" fill="none" stroke={INK} strokeWidth=".5" />
              <ellipse cx="3.8" cy="-4" rx="2.6" ry="1.5" fill="#ffd9b8" {...st} strokeWidth=".6" transform="rotate(-20 3.8 -4)" />
            </g>
          </G>
        </g></g>
        {[0, 1, 2, 3, 4].map((i) => <G key={i} x={96 + (i % 3) * 5} y={61}><g className="spark"><Sparkle s={1.1 + (i % 2) * 0.4} /></g></G>)}
        {[0, 1, 2].map((i) => <G key={i} x={70 + i * 8} y={66}><g className="wd" opacity="0"><Drop s={0.5} /></g></G>)}
      </g>
      <g className="pb" opacity="0">
        <Room board win />
        <G x={64} y={84} s={1.25}>
          <Kid p="kS" glasses />
          {/* quyển sách mở: mép dưới trùng đúng hai bàn tay */}
          <g {...st} strokeWidth=".6">
            <path d={`M0 ${ly - 11.5} L${lx - 1.2} ${ly - 10.6} V${ly + 0.4} L0 ${ly + 1.2}Z`} fill="#fff7e0" />
            <path d={`M0 ${ry - 11.5} L${rx + 1.2} ${ry - 10.6} V${ry + 0.4} L0 ${ry + 1.2}Z`} fill="#fffdf2" />
            <path d={`M${lx + 1} ${ly - 8} H-1 M${lx + 1} ${ly - 5.6} H-1 M${lx + 1} ${ly - 3.2} H-1`} stroke="#9aa3c7" strokeWidth=".5" className="pgl" />
            <path d={`M1 ${ry - 8} H${rx - 1} M1 ${ry - 5.6} H${rx - 1} M1 ${ry - 3.2} H${rx - 1}`} stroke="#9aa3c7" strokeWidth=".5" className="pgl" />
            <path d={`M0 ${ly - 11.5} V${ly + 1.2}`} stroke="#c98a52" strokeWidth=".9" />
          </g>
          <circle cx={lx} cy={ly} r="1.9" fill="#ffd9b8" {...st} strokeWidth=".5" />
          <circle cx={rx} cy={ry} r="1.9" fill="#ffd9b8" {...st} strokeWidth=".5" />
        </G>
        <G x={64} y={34}><g className="bulb" opacity="0"><Bulb s={1.3} /></g></G>
        <G x={118} y={54}><g className="cert2" opacity="0"><Cert s={2.2} n="10" /></g></G>
        {[[100, 34], [124, 36], [38, 30]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.5} /></g></G>)}
      </g>
    </Svg>
  );
}

/* ============================================================
   10. Vẽ đường cho hươu chạy
   ============================================================ */
const TIP = { x: 12, y: 1.2 }; // đầu gậy so với gốc chân bạn nhỏ
const KP = Array.from({ length: 15 }, (_, i) => { const x = 34 + i * 6; return [x, 79 + 3.2 * Math.sin((x - 34) / 9)]; });
const TRAIL = KP.map(([x, y]) => [x + TIP.x, y + TIP.y]);

export function VeDuong({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.dr-head', { rotation: 10, duration: 0.7, yoyo: true, repeat: 5, transformOrigin: '50% 100%' }, 0);
    tl.set('.kp-g', { x: KP[0][0], y: KP[0][1] }, 0);
    tl.set('.kp-armR', { rotation: -30, transformOrigin: '50% 0%' }, 0);
    along(tl, '.kp-g', KP, 0.6, 4.4);
    steps(tl, 'kp', 0.6, 4.4, 20);
    tl.fromTo('.trailClip', { attr: { width: 0 } }, { attr: { width: TRAIL[TRAIL.length - 1][0] - TRAIL[0][0] + 3 }, duration: 4.4, ease: 'none' }, 0.6);
    // xong việc, bạn nhỏ lùi ra sau để hươu chạy qua
    tl.to('.kp-g', { x: KP[KP.length - 1][0] - 4, y: 62, duration: 0.8, ease: 'power1.inOut' }, 5);
    steps(tl, 'kp', 5, 0.8, 18);
    tl.fromTo('.ok', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 5.2);
    tl.to('.ok', { opacity: 0, duration: 0.3 }, 6.2);
    // hươu chạy đúng theo đường vừa vẽ
    const run = [[TRAIL[0][0], TRAIL[0][1] - 14.5], ...TRAIL.map(([x, y]) => [x, y - 14.5])];
    tl.to('.deer', { keyframes: run.map(([x, y], i) => ({ x, y, duration: i ? 0.42 : 0.6, ease: 'none' })) }, 6.2);
    [0, 1, 2, 3].forEach((i) => tl.to(`.dl-${i}`, { rotation: i % 2 ? 38 : -38, duration: 0.13, yoyo: true, repeat: 50, transformOrigin: '50% 0%' }, 6.2));
    tl.fromTo('.exc', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(3)', transformOrigin: '50% 100%' }, 6.2 + 0.6 + 0.42 * TRAIL.length);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 6.6 + 0.42 * TRAIL.length);
  });
  const d = `M${TRAIL.map(([x, y]) => `${x} ${y}`).join(' L')}`;
  const last = TRAIL[TRAIL.length - 1];
  return (
    <Svg ref={ref}>
      <Meadow id="vd" ground={58} />
      <G x={140} y={16}><Sun /></G>
      <G x={26} y={22}><Cloud w={1} /></G>
      <ellipse cx="150" cy="82" rx="16" ry="6" fill="#4cc9f0" {...st} strokeWidth=".7" />
      <path d="M140 82 q4 -2 8 0 t8 0" fill="none" stroke="#fff" strokeWidth=".6" opacity=".8" />
      <clipPath id="vdClip"><rect className="trailClip" x={TRAIL[0][0] - 2} y="60" width="0" height="30" /></clipPath>
      <path d={d} clipPath="url(#vdClip)" fill="none" stroke="#7a4a28" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {/* bạn nhỏ cầm gậy vạch đường: gậy nằm trong tay, đầu gậy chạm đúng nét vẽ */}
      <g className="kp-g"><Kid p="kp" shirt="#ef476f" handR={<g transform="rotate(30)"><rect x="-.7" y="-5" width="1.4" height="18.2" rx=".6" fill="#8a5326" /></g>} /></g>
      <G x={0} y={0}><g className="deer" transform="translate(16 65.5)"><Deer /></g></G>
      <G x={106} y={34}><g className="ok" opacity="0"><Bubble w={22} h={14} /><g><Star s={1.1} /></g></g></G>
      <G x={last[0] + 2} y={44}><g className="exc" opacity="0"><Exclaim s={1.3} /></g></G>
      {[[100, 40], [126, 50], [70, 44]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.5} /></g></G>)}
    </Svg>
  );
}

/* ============================================================
   14. Đồng cam cộng khổ
   ============================================================ */
const HAND_IN = 70; // góc tay đưa quả cam
const [ox] = hand(1, -HAND_IN);
const AX = 44; // bạn trái
const BX = AX + 2 * ox + 6.4; // bạn phải: hai bàn tay cách nhau 6.4
const [hx, hy] = hand(1, -60);
const RX = 24; // nửa bề ngang tảng đá
const RK = 0.8;

export function DongCam({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.kD-armR', { rotation: -HAND_IN, duration: 0.4, transformOrigin: '50% 0%' }, 0.2);
    tl.to('.kE-armL', { rotation: HAND_IN, duration: 0.4, transformOrigin: '50% 0%' }, 0.2);
    tl.fromTo('.orange', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'bounce.out' }, 0.5);
    tl.set('.orange', { opacity: 0 }, 1.8);
    tl.set('.half', { opacity: 1 }, 1.8);
    tl.to('.kD-armR', { rotation: -50, duration: 0.5, transformOrigin: '50% 0%' }, 2.2);
    tl.to('.kE-armL', { rotation: 50, duration: 0.5, transformOrigin: '50% 0%' }, 2.2);
    tl.to('.kD-head', { rotation: 6, duration: 0.5, yoyo: true, repeat: 3, transformOrigin: '50% 100%' }, 2.6);
    tl.to('.kE-head', { rotation: -6, duration: 0.5, yoyo: true, repeat: 3, transformOrigin: '50% 100%' }, 2.6);
    tl.fromTo('.ht', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.2, ease: 'back.out(3)' }, 3);
    tl.to('.pa', { opacity: 0, duration: 0.5 }, 5.2);
    tl.fromTo('.pb', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 5.2);
    // phần B: hai bạn cùng nâng một tảng đá, tay đỡ đúng hai mép đá
    tl.set('.kF-armR', { rotation: -60, transformOrigin: '50% 0%' }, 0);
    tl.set('.kG-armL', { rotation: 60, transformOrigin: '50% 0%' }, 0);
    tl.fromTo('.pair', { x: 0 }, { x: 40, duration: 4.6, ease: 'none' }, 6.2);
    tl.to('.bob', { y: -1, duration: 0.22, yoyo: true, repeat: 20, ease: 'sine.inOut' }, 6.2);
    steps(tl, 'kF', 6.2, 4.6, 12);
    steps(tl, 'kG', 6.2, 4.6, 12);
    tl.fromTo('.rn', { y: -6 }, { y: 80, duration: 0.7, repeat: 8, ease: 'none', stagger: 0.12 }, 5.4);
    tl.fromTo('.sw', { y: 0, opacity: 0 }, { y: 6, opacity: 1, duration: 0.7, stagger: 0.3, repeat: 4 }, 6.4);
    tl.to('.gloom', { opacity: 0, duration: 1 }, 10.8);
    tl.to('.rn', { opacity: 0, duration: 0.5 }, 10.8);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 11.2);
  });
  const half = (flip) => <g className="half" opacity="0"><g transform={`rotate(${flip ? -HAND_IN : HAND_IN}) scale(.55)`}><OrangeHalf /></g></g>;
  const gy = 80;
  return (
    <Svg ref={ref}>
      <g className="pa">
        <Meadow id="dc" ground={66} />
        <G x={130} y={16}><Sun /></G>
        <G x={AX} y={gy}><Kid p="kD" shirt="#4f8cff" handR={half(false)} /></G>
        <G x={BX} y={gy}><Kid p="kE" shirt="#34d399" girl handL={half(true)} /></G>
        <G x={AX + ox + 3.2} y={gy + hand(1, -HAND_IN)[1]} s={0.6}><g className="orange"><Orange /></g></G>
        {[[AX + 8, 30], [(AX + BX) / 2 + 3, 22], [BX - 8, 30]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="ht" opacity="0"><Heart s={1.5} /></g></G>)}
      </g>
      <g className="pb" opacity="0">
        <Sky id="dc2" a="#8d99ae" b="#cfd6e6" ground={70} gcol="#9fc98d" />
        <rect className="gloom" width="160" height="90" fill="#44506e" opacity=".4" />
        <g className="pair"><g className="bob">
          {/* đá vẽ trước để hai bàn tay nằm đè lên mép đá */}
          <G x={26 + hx + RX / 2 + 0.5} y={gy + hy - 3} s={RK}><Rock /></G>
          <G x={26} y={gy}><Kid p="kF" shirt="#4f8cff" /></G>
          <G x={26 + 2 * hx + RX + 1} y={gy}><Kid p="kG" shirt="#34d399" girl /></G>
          <G x={22} y={44}><g className="sw" opacity="0"><Sweat s={0.9} /></g></G>
          <G x={26 + 2 * hx + RX + 5} y={44}><g className="sw" opacity="0"><Sweat s={0.9} /></g></G>
        </g></g>
        <g stroke="#bfe6ff" strokeWidth=".9" strokeLinecap="round">{Array.from({ length: 12 }, (_, i) => <line key={i} className="rn" x1={8 + i * 13} x2={6 + i * 13} y1="0" y2="6" />)}</g>
        {[[30, 30], [140, 40], [110, 20]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.5} /></g></G>)}
      </g>
    </Svg>
  );
}

/* ============================================================
   16. Mất bò mới lo làm chuồng
   ============================================================ */
const K0 = 84; // chỗ bạn đứng đóng cọc đầu tiên
const KSTEP = 16;
const NAIL_X = hand(1, -55)[0] + 8.2 * Math.sin((55 * Math.PI) / 180); // đầu búa khi đập
const NAIL_Y = -21.5 + (11.2 + 7) * Math.cos((55 * Math.PI) / 180);
const HX = 6.4 + (11.2 + 7) * Math.sin((55 * Math.PI) / 180); // x đầu búa so với bạn nhỏ
void NAIL_X;

export function MatBo({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.zz', { y: 0, opacity: 0 }, { y: -8, opacity: 1, duration: 0.9, stagger: 0.45, repeat: 3 }, 0.2);
    tl.to('.cow', { x: 150, duration: 4, ease: 'none' }, 1);
    tl.to('.cow-b', { y: -1.6, duration: 0.3, yoyo: true, repeat: 13 }, 1);
    tl.to('.gate', { rotation: -70, duration: 0.5, transformOrigin: '0% 100%' }, 0.8);
    tl.fromTo('.exc', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(3)', transformOrigin: '50% 100%' }, 5.2);
    tl.to('.zz', { opacity: 0, duration: 0.1 }, 5.2);
    pose(tl, 'kidM', 1, 150, 5.2, 0.25);
    tl.to('.exc', { opacity: 0, duration: 0.3 }, 6.2);
    // chạy lại chỗ đóng cọc
    tl.to('.kidM', { x: K0 - 118, duration: 0.9, ease: 'power1.inOut' }, 5.8);
    steps(tl, 'kidM', 5.8, 0.9, 24);
    pose(tl, 'kidM', 1, -100, 6.7, 0.25);
    [0, 1, 2].forEach((i) => {
      const t0 = 7 + i * 1.9;
      if (i) {
        tl.to('.kidM', { x: K0 + KSTEP * i - 118, duration: 0.5, ease: 'power1.inOut' }, t0 - 0.6);
        steps(tl, 'kidM', t0 - 0.6, 0.5, 22);
      }
      tl.fromTo(`.post${i}`, { scaleY: 0 }, { scaleY: 1, duration: 0.3, ease: 'back.out(2)', transformOrigin: '50% 100%' }, t0 - 0.1);
      tl.fromTo('.kidM-armR', { rotation: -100, transformOrigin: '50% 0%' }, { rotation: -55, duration: 0.17, yoyo: true, repeat: 5, ease: 'power2.in', transformOrigin: '50% 0%', immediateRender: false }, t0 + 0.2);
      [0, 1, 2].forEach((k) => tl.fromTo(`.nl${i}${k}`, { opacity: 0 }, { opacity: 1, duration: 0.05, immediateRender: false }, t0 + 0.2 + 0.34 * k + 0.17));
      if (i) tl.fromTo(`.rail${i}`, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: 'power2.out', transformOrigin: '0% 50%' }, t0 + 1.2);
    });
    tl.to('.gate', { rotation: 0, duration: 0.4 }, 12.8);
    tl.fromTo('.sw', { y: 0, opacity: 0 }, { y: 6, opacity: 1, duration: 0.6, stagger: 0.25, repeat: 3 }, 7);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 12.9);
  });
  const px = (i) => K0 + KSTEP * i + HX;
  return (
    <Svg ref={ref}>
      <Meadow id="mb" ground={62} />
      <G x={140} y={16}><Sun /></G>
      <G x={30} y={22}><Cloud w={1} /></G>
      {/* chuồng cũ */}
      <g {...st} strokeWidth=".8">
        <rect x="14" y="40" width="4" height="30" fill="#8a5a36" /><rect x="14" y="48" width="64" height="3.4" fill="#c98a52" /><rect x="14" y="58" width="64" height="3.4" fill="#c98a52" />
        <rect x="52" y="40" width="4" height="30" fill="#8a5a36" /><rect x="74" y="40" width="4" height="30" fill="#8a5a36" />
        <g transform="translate(78 70)"><g className="gate"><rect x="0" y="-22" width="3.4" height="22" fill="#8a5a36" /><rect x="0" y="-18" width="16" height="3" fill="#c98a52" /></g></g>
      </g>
      <G x={44} y={70}><g className="cow"><g className="cow-b"><Cow /></g></g></G>
      {/* chuồng mới: cọc nào cũng nằm đúng chỗ đầu búa chạm */}
      {[0, 1, 2].map((i) => (
        <G key={i} x={px(i)} y={82}>
          <g className={`post${i}`} opacity="1"><rect x="-1.7" y="-30" width="3.4" height="30" fill="#8a5a36" {...st} strokeWidth=".6" /></g>
          {[0, 1, 2].map((k) => <circle key={k} className={`nl${i}${k}`} cx="0" cy={-11 + k * 0.01} r=".8" fill="#e4ecf8" stroke={INK} strokeWidth=".3" opacity="0" />)}
          {i > 0 && (
            <g className={`rail${i}`}>
              <rect x={-KSTEP} y="-24" width={KSTEP} height="3" fill="#c98a52" {...st} strokeWidth=".5" />
              <rect x={-KSTEP} y="-13" width={KSTEP} height="3" fill="#c98a52" {...st} strokeWidth=".5" />
            </g>
          )}
        </G>
      ))}
      <G x={118} y={82}>
        <g className="kidM">
          <Kid p="kidM" shirt="#a0643c" handR={<g><rect x="-.6" y="-5" width="1.2" height="11" rx=".5" fill="#8a5326" /><rect x="-4.2" y="5" width="8.4" height="4" rx=".7" fill="#8d99ae" stroke={INK} strokeWidth=".4" /></g>} />
          <G x={9} y={-44}><g className="exc" opacity="0"><Exclaim s={1.3} /></g></G>
        </g>
      </G>
      {[0, 1, 2].map((i) => <G key={i} x={118 + i * 7} y={42 - i * 4}><text className="zz" {...TXT} fontSize={8 + i * 2} fill="#7c5cff" stroke={INK} strokeWidth=".4" paintOrder="stroke" opacity="0">z</text></G>)}
      <G x={112} y={44}><g className="sw" opacity="0"><Sweat s={0.9} /></g></G>
      {[[100, 34], [140, 46], [90, 56]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

/* ============================================================
   9. Khéo ăn thì no, khéo co thì ấm
   ============================================================ */
const KE = { x: 38, dip: -102, eat: -125 };
const [BWX] = hand(1, KE.dip);

export function KheoAn({ running }) {
  const ref = useScene(running, (tl) => {
    // thìa nằm trong tay: tay và thìa cùng quay, múc cháo rồi đưa lên miệng
    tl.set('.kE-armR', { rotation: KE.dip, transformOrigin: '50% 0%' }, 0);
    tl.set('.spn', { rotation: -KE.dip, transformOrigin: '50% 50%' }, 0);
    const o = { duration: 0.55, repeat: 7, yoyo: true, ease: 'sine.inOut', immediateRender: false };
    tl.fromTo('.kE-armR', { rotation: KE.dip, transformOrigin: '50% 0%' }, { rotation: KE.eat, transformOrigin: '50% 0%', ...o }, 0.8);
    tl.fromTo('.spn', { rotation: -KE.dip, transformOrigin: '50% 50%' }, { rotation: 90 - KE.eat, transformOrigin: '50% 50%', ...o }, 0.8);
    tl.fromTo('.spf', { opacity: 1 }, { opacity: 0, duration: 0.2, yoyo: true, repeat: 15, immediateRender: false }, 0.8);
    tl.to('.porridge', { scaleY: 0.15, duration: 4.4, ease: 'none', transformOrigin: '50% 100%' }, 0.8);
    tl.fromTo('.ht', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.2, ease: 'back.out(3)' }, 4.8);
    tl.to('.pa', { opacity: 0, duration: 0.5 }, 6.4);
    tl.fromTo('.pb', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 6.4);
    tl.fromTo('.cold', { opacity: 0, y: 0 }, { opacity: 1, y: 4, duration: 0.6, stagger: 0.25, repeat: 2 }, 6.8);
    tl.to('.feet', { x: -14, duration: 0.8, ease: 'power2.inOut' }, 9.4);
    tl.to('.cold', { opacity: 0, duration: 0.3 }, 9.4);
    tl.fromTo('.warm', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 10);
    tl.fromTo('.zz', { y: 0, opacity: 0 }, { y: -8, opacity: 1, duration: 0.8, stagger: 0.4, repeat: -1 }, 10.4);
    mouth(tl, 'kE', 'S', 0);
  });
  return (
    <Svg ref={ref}>
      <g className="pa">
        <Room win />
        <G x={KE.x} y={80}>
          <Kid p="kE" shirt="#ff9f43" handR={<g><rect x="-10" y="-10" width="20" height="20" fill="none" stroke="none" /><g className="spn"><rect x="-.5" y="-6" width="1" height="10" rx=".5" fill="#c9d1e6" stroke={INK} strokeWidth=".35" /><ellipse cx="0" cy="7" rx="2.5" ry="1.7" fill="#e8ebf5" stroke={INK} strokeWidth=".35" /><ellipse className="spf" cx="0" cy="6.4" rx="1.7" ry=".8" fill="#fffaf0" /></g></g>} />
        </G>
        <G x={70} y={72}><Desk w={76} h={14} /></G>
        <G x={KE.x + BWX} y={63} s={0.6}><Bowl /></G>
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

/* ============================================================
   Câu mẫu: Thùng rỗng kêu to
   ============================================================ */
const DR = { hit: -60, up: -92 }; // gậy nằm trong tay; đầu gậy chạm mép thùng khi tay ở góc hit

export function ThungRong({ running }) {
  const O = '50% 0%';
  const ref = useScene(running, (tl) => {
    tl.set('.kT-armR', { rotation: DR.hit, transformOrigin: O }, 0);
    tl.fromTo('.kT-armR', { rotation: DR.hit, transformOrigin: O }, { rotation: DR.up, transformOrigin: O, duration: 0.3, yoyo: true, repeat: 11, ease: 'power1.inOut', immediateRender: false }, 0.6);
    tl.to('.barA', { rotation: 3, duration: 0.15, yoyo: true, repeat: 24, transformOrigin: '50% 100%' }, 0.6);
    tl.fromTo('.waveA', { scale: 0.3, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.6, stagger: 0.2, repeat: 5, transformOrigin: '0% 50%' }, 0.7);
    tl.fromTo('.loud', { scale: 0, opacity: 0 }, { scale: 1.1, opacity: 1, duration: 0.3, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 0.7);
    tl.to('.loud', { opacity: 0, duration: 0.3 }, 4.2);
    mouth(tl, 'kT', 'S', 0);
    // đổi sang thùng đầy nước: gõ nhẹ, tiếng bộp
    tl.to('.barSlide', { x: 130, duration: 0.7, ease: 'power2.in' }, 4.4);
    tl.fromTo('.fullb', { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, ease: 'power2.out', immediateRender: false }, 5);
    tl.fromTo('.kT-armR', { rotation: DR.hit, transformOrigin: O }, { rotation: DR.hit - 9, transformOrigin: O, duration: 0.5, yoyo: true, repeat: 5, ease: 'power1.inOut', immediateRender: false }, 6.2);
    tl.to('.quiet', { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 50%' }, 7);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.15, ease: 'back.out(2)' }, 9);
  });
  return (
    <Svg ref={ref}>
      <Room board win />
      <g className="barSlide"><G x={52} y={76}><g className="barA"><Barrel /></g></G></g>
      <g className="fullb" opacity="0"><G x={52} y={76}><Barrel full /></G></g>
      <G x={72} y={40}><g className="loud" opacity="0"><text {...TXT} fontSize="11" fill="#ef476f" stroke={INK} strokeWidth=".7" paintOrder="stroke">ĐÙNG!</text></g></G>
      {[0, 1, 2].map((i) => <G key={i} x={62} y={64}><path className="waveA" d="M0 -8 Q6 0 0 8" fill="none" stroke="#ef476f" strokeWidth="1.2" opacity="0" /></G>)}
      <G x={20} y={78}><Kid p="kT" shirt="#4f8cff" handR={<g><rect x="-.9" y="-3" width="1.8" height="12" rx=".9" fill="#8a5326" stroke={INK} strokeWidth=".35" /></g>} /></G>
      <G x={72} y={34}><g className="quiet" opacity="0"><text {...TXT} fontSize="7" fill="#2b8fd1" stroke={INK} strokeWidth=".4" paintOrder="stroke">bộp</text></g></G>
      {[[96, 30], [142, 52], [8, 40]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

void Kid; void NAIL_Y;
