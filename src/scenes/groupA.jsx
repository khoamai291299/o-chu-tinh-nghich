import { Svg, G, Sky, Cloud, Sparkle, Mountain, useScene, C, INK, st } from './kit.jsx';
import { Kid, Room, Desk, Book, BookClosed, Sweat, Exclaim, Question, Bubble, walkCycle, mouth, Star, Bulb } from './kit2.jsx';

/* Mỗi cảnh: 0-5 giây hình đánh lừa, 5-12 giây chi tiết khoá hiện ra, sau đó giữ nguyên khung cuối. */

/* ===== 1. Nước đến chân mới nhảy ===== */
export function NuocDenChan({ running }) {
  const ref = useScene(running, (tl) => {
    // nước dâng từ từ, học sinh vẫn bình thản đọc sách
    tl.fromTo('.w1', { y: 24 }, { y: 0, duration: 5.2, ease: 'none' }, 0);
    tl.to('.w1-wave', { x: -20, duration: 1.4, repeat: -1, ease: 'none' }, 0);
    tl.to('.k1-head', { rotation: 4, duration: 1.3, yoyo: true, repeat: 6, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0);
    // 5,2 giây: nước chạm chân, hoảng hốt nhảy lên bàn
    tl.fromTo('.exc', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(3)' }, 5.2);
    mouth(tl, 'k1', 'O', 5.2);
    tl.to('.k1-armL', { rotation: 150, duration: 0.25, transformOrigin: '50% 0%' }, 5.2);
    tl.to('.k1-armR', { rotation: -150, duration: 0.25, transformOrigin: '50% 0%' }, 5.2);
    tl.to('.book1', { y: -16, rotation: -40, opacity: 0, duration: 0.5 }, 5.2);
    tl.to('.kid1', { x: 56, duration: 0.8, ease: 'none' }, 5.7);
    tl.to('.kid1', { y: -30, duration: 0.4, ease: 'power2.out', yoyo: true, repeat: 1 }, 5.7);
    tl.set('.kid1', { y: -18 }, 6.5);
    tl.to('.k1-armL', { rotation: 130, duration: 0.15, yoyo: true, repeat: 7 }, 6.6);
    tl.to('.k1-armR', { rotation: -130, duration: 0.15, yoyo: true, repeat: 7 }, 6.6);
    tl.to('.w1', { y: -13, duration: 6, ease: 'sine.out' }, 5.2);
    tl.fromTo('.sw', { y: 0, opacity: 0 }, { y: 7, opacity: 1, duration: 0.7, stagger: 0.25, repeat: 4 }, 6.6);
    tl.fromTo('.clk', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)', transformOrigin: '50% 50%' }, 5.5);
    tl.to('.clk-hand', { rotation: 360 * 2, duration: 6, ease: 'none', transformOrigin: '50% 100%' }, 5.7);
    tl.to('.exc', { opacity: 0, duration: 0.3 }, 7);
  });
  return (
    <Svg ref={ref}>
      <Room win board />
      <G x={122} y={58}><Desk w={34} h={20} /></G>
      <G x={64} y={76}>
        <g className="kid1">
          <Kid p="k1" />
          <G x={0} y={-15}><g className="book1"><Book c="#ef476f" w={14} h={4} /></g></G>
          <G x={9} y={-46}><g className="exc" opacity="0"><Exclaim s={1.3} /></g></G>
        </g>
      </G>
      <G x={70} y={50}><g className="sw" opacity="0"><Sweat s={0.8} /></g></G>
      <G x={50} y={50}><g className="sw" opacity="0"><Sweat s={0.8} /></g></G>
      <g className="w1">
        <rect x="0" y="76" width="160" height="40" fill="#3aa0ff" opacity=".72" />
        <g className="w1-wave"><path d="M-20 76 Q-10 72.5 0 76 T20 76 T40 76 T60 76 T80 76 T100 76 T120 76 T140 76 T160 76 T180 76 V80 H-20Z" fill="#7cc4ff" opacity=".9" /></g>
      </g>
      <G x={146} y={14}>
        <g className="clk" opacity="0">
          <circle r="9" fill="#fff" {...st} strokeWidth="1.2" />
          <line className="clk-hand" x1="0" y1="0" x2="0" y2="-6.5" stroke="#ef476f" strokeWidth="1.1" strokeLinecap="round" />
          <circle r="1.2" fill={INK} />
        </g>
      </G>
    </Svg>
  );
}

/* ===== 3. Nói có sách, mách có chứng ===== */
function Evidence() {
  return (
    <g>
      <rect x="-30" y="-20" width="60" height="40" rx="3" fill="#fff" {...st} strokeWidth="1" />
      <G x={-14} y={11}><Book c="#4f8cff" w={20} h={5} /></G>
      <G x={-14} y={6}><Book c="#ef476f" w={18} h={5} /></G>
      <G x={-14} y={1}><Book c="#34d399" w={21} h={5} /></G>
      <rect x="4" y="-14" width="20" height="26" rx="1.5" fill="#fff7e0" {...st} strokeWidth=".7" />
      {[-8, -4, 0, 4].map((y) => <line key={y} x1="7" x2="21" y1={y} y2={y} stroke="#b9a874" strokeWidth=".6" />)}
      <circle cx="17" cy="8" r="5" fill="#34d399" {...st} strokeWidth=".7" />
      <path d="M14.5 8 L16.5 10 L20 6" fill="none" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}
const QUAD = [[-30, -20], [0, -20], [-30, 0], [0, 0]];
export function NoiCoSach({ running }) {
  const ref = useScene(running, (tl) => {
    // bạn A phát biểu hùng hồn
    tl.fromTo('.bub3', { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)', transformOrigin: '50% 100%' }, 0.4);
    tl.to('.k3a-mO', { opacity: 1, duration: 0.01, yoyo: true, repeat: 17, repeatDelay: 0.13 }, 0.5);
    tl.to('.k3a-mS', { opacity: 0, duration: 0.01, yoyo: true, repeat: 17, repeatDelay: 0.13 }, 0.5);
    tl.to('.k3a-armL', { rotation: 110, duration: 0.5, yoyo: true, repeat: 7, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 0.5);
    tl.to('.k3a-armR', { rotation: -60, duration: 0.7, yoyo: true, repeat: 5, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 0.8);
    tl.to('.bub3-dots', { opacity: 0.2, duration: 0.3, yoyo: true, repeat: 60, stagger: 0.2 }, 0.5);
    tl.fromTo('.spk3', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.3, repeat: 3, yoyo: true }, 1);
    // 5 giây: người kia ôm sách đến, bong bóng của A xẹp xuống
    tl.fromTo('.kb', { x: 90 }, { x: 0, duration: 1.4, ease: 'power2.out' }, 5);
    tl.to('.bub3', { scale: 0.5, y: 6, rotation: -6, duration: 0.5, transformOrigin: '50% 100%' }, 5.2);
    tl.to('.k3a-armL', { rotation: 0, duration: 0.3, transformOrigin: '50% 0%' }, 5.2);
    tl.to('.k3a-armR', { rotation: 0, duration: 0.3, transformOrigin: '50% 0%' }, 5.2);
    mouth(tl, 'k3a', 'O', 6.4);
    tl.fromTo('.q3', { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(3)' }, 6.4);
    tl.to('.k3b-armL', { rotation: -50, duration: 0.4, transformOrigin: '50% 0%' }, 6.4);
    // 6,6 giây: các mảnh hình bay vào ghép thành bằng chứng
    QUAD.forEach(([qx, qy], i) => {
      const ang = [[-60, -40], [60, -40], [-60, 40], [60, 40]][i];
      tl.fromTo(`.pc${i}`, { x: ang[0], y: ang[1], opacity: 0, rotation: ang[0] / 8 }, { x: 0, y: 0, opacity: 1, rotation: 0, duration: 0.9, ease: 'back.out(1.5)', transformOrigin: '50% 50%' }, 6.6 + i * 0.25);
    });
    tl.fromTo('.stamp3', { scale: 3, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'power3.in', transformOrigin: '50% 50%' }, 8.6);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.14, ease: 'back.out(2)' }, 8.9);
  });
  return (
    <Svg ref={ref}>
      <defs>
        {QUAD.map(([x, y], i) => <clipPath key={i} id={`evq${i}`}><rect x={x} y={y} width="30" height="20" /></clipPath>)}
      </defs>
      <Room board win />
      <G x={42} y={76}>
        <Kid p="k3a" shirt="#ef476f" />
        <G x={0} y={-48}>
          <g className="bub3">
            <Bubble w={30} h={17} tail="left" />
            {[-7, 0, 7].map((x) => <circle key={x} className="bub3-dots" cx={x} cy="0" r="1.7" fill={INK} />)}
          </g>
        </G>
      </G>
      <G x={14} y={44}><g className="spk3" opacity="0"><Sparkle s={1.3} /></g></G>
      <G x={72} y={42}><g className="spk3" opacity="0"><Sparkle s={1.1} /></g></G>
      <G x={96} y={76}>
        <g className="kb">
          <Kid p="k3b" shirt="#34d399" glasses />
          <G x={-8} y={-26}><g><BookClosed c="#4f8cff" s={0.7} /></g></G>
          <G x={0} y={-47}><g className="q3" opacity="0"><Question s={1} /></g></G>
        </g>
      </G>
      <G x={118} y={34}>
        {QUAD.map((_, i) => <g key={i} className={`pc${i}`} opacity="0"><g clipPath={`url(#evq${i})`}><Evidence /></g></g>)}
        <g className="stamp3" opacity="0"><circle cx="24" cy="-14" r="6" fill="#ffd166" {...st} strokeWidth=".8" /><path d="M21 -14 L23.5 -11.5 L27.5 -17" fill="none" stroke={INK} strokeWidth="1.3" strokeLinecap="round" /></g>
      </G>
      {[[100, 12], [140, 18], [150, 58]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

/* ===== 4. Đứng núi này trông núi nọ ===== */
export function DungNuiNay({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.far', { opacity: 0.28, duration: 0.01 }, 0);
    tl.to('.k4-head', { rotation: 7, duration: 0.6, yoyo: true, repeat: 7, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0.3);
    tl.to('.ice', { rotation: -8, duration: 0.6, yoyo: true, repeat: 7, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0.3);
    tl.fromTo('.hrt', { y: 0, opacity: 0, scale: 0.4 }, { y: -12, opacity: 1, scale: 1, duration: 0.8, repeat: 2, stagger: 0.5 }, 0.8);
    // 5 giây: núi xa sáng lên, học sinh nhấc ống nhòm, kem rơi
    tl.to('.far', { opacity: 1, duration: 1.2, ease: 'power2.out' }, 5);
    tl.fromTo('.far-star', { scale: 0, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(2.5)', transformOrigin: '50% 50%' }, 5.6);
    tl.to('.far-star', { scale: 1.25, duration: 0.6, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 6.4);
    tl.fromTo('.bino', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 5.3);
    tl.to('.k4-armL', { rotation: 150, duration: 0.3, transformOrigin: '50% 0%' }, 5.2);
    tl.to('.k4-armR', { rotation: -150, duration: 0.3, transformOrigin: '50% 0%' }, 5.2);
    tl.to('.ice', { y: 40, x: -6, rotation: -50, opacity: 0, duration: 0.7, ease: 'power2.in' }, 5.3);
    tl.fromTo('.splat', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.25, transformOrigin: '50% 50%' }, 5.9);
    tl.to('.hrt', { opacity: 0, duration: 0.2 }, 5);
    mouth(tl, 'k4', 'O', 5.6);
    tl.fromTo('.th', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', transformOrigin: '10% 100%' }, 6.6);
    // 8 giây: nhảy sang núi bên kia
    tl.to('.bino', { opacity: 0, duration: 0.2 }, 8.1);
    tl.to('.k4-armL', { rotation: 160, duration: 0.2, transformOrigin: '50% 0%' }, 8.1);
    tl.to('.k4-armR', { rotation: -160, duration: 0.2, transformOrigin: '50% 0%' }, 8.1);
    tl.to('.kid4', { x: 52, duration: 1.6, ease: 'none' }, 8.3);
    tl.to('.kid4', { y: -12, duration: 0.4, ease: 'power2.out', yoyo: true, repeat: 3 }, 8.3);
    mouth(tl, 'k4', 'S', 8.2);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(2)' }, 9.8);
  });
  return (
    <Svg ref={ref}>
      <Sky id="s4" a="#b9e3ff" b="#f4fbff" ground={92} />
      <G x={30} y={16}><Cloud /></G>
      <G x={90} y={14} s={0.8}><Cloud /></G>
      <G x={128} y={66} s={1.9}><g className="far"><Mountain /></g></G>
      <G x={128} y={21}><g className="far-star"><Star s={1.7} /></g></G>
      <ellipse cx="38" cy="86" rx="46" ry="22" fill="#8fd18b" stroke="#00000015" />
      <ellipse cx="150" cy="90" rx="40" ry="10" fill="#8fd18b" />
      <G x={36} y={70}>
        <g className="kid4">
          <Kid p="k4" shirt="#ff8a3d" />
          <G x={9} y={-34}>
            <g className="ice">
              <path d="M-3 0 L3 0 L0 9Z" fill="#e9b872" {...st} strokeWidth=".6" transform="translate(0 0) rotate(180) translate(0 -9)" />
              <circle cy="-3" r="4" fill="#ffc2d4" {...st} strokeWidth=".6" />
              <circle cy="-7.5" r="3.2" fill="#fff4b8" {...st} strokeWidth=".6" />
            </g>
          </G>
          <G x={0} y={-31}>
            <g className="bino" opacity="0">
              <rect x="-7.5" y="-3" width="6" height="7" rx="2" fill="#2b2d42" />
              <rect x="1.5" y="-3" width="6" height="7" rx="2" fill="#2b2d42" />
              <rect x="-2" y="-1" width="4" height="3" fill="#4a4e69" />
              <circle cx="-4.5" cy="0.5" r="1.4" fill="#7dd3fc" />
              <circle cx="4.5" cy="0.5" r="1.4" fill="#7dd3fc" />
            </g>
          </G>
        </g>
      </G>
      <G x={50} y={70}><g className="splat" opacity="0"><ellipse rx="6" ry="2" fill="#ffc2d4" {...st} strokeWidth=".5" /></g></G>
      {[0, 1, 2].map((i) => <G key={i} x={34 + i * 4} y={32}><g className="hrt" opacity="0"><path d="M0 2 C-4 -1 -3 -4 0 -2 C3 -4 4 -1 0 2Z" fill="#ff6b81" /></g></G>)}
      <G x={72} y={22}>
        <g className="th" opacity="0">
          <circle r="11" fill="#fff" {...st} strokeWidth=".8" />
          <G y={5} s={0.5}><Mountain /></G>
          <G x={0} y={-3}><Star s={0.8} /></G>
          <circle cx="-12" cy="14" r="2" fill="#fff" {...st} strokeWidth=".6" />
          <circle cx="-17" cy="19" r="1.2" fill="#fff" {...st} strokeWidth=".5" />
        </g>
      </G>
      {[[118, 40], [146, 36], [100, 62]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

/* ===== 5. Lửa thử vàng, gian nan thử sức ===== */
const Flame = ({ c = '#ff7a2f', s = 1 }) => (
  <path d="M0 0 C-9 -4 -10 -14 -3 -22 C-3 -15 1 -14 2 -19 C8 -12 9 -5 0 0Z" fill={c} transform={`scale(${s})`} />
);
export function LuaThuVang({ running }) {
  const ref = useScene(running, (tl) => {
    // phần A: lò lửa
    tl.to('.fl', { scaleY: 1.18, scaleX: 0.92, duration: 0.18, yoyo: true, repeat: 99, stagger: 0.07, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0);
    tl.fromTo('.ember', { y: 0, opacity: 1 }, { y: -26, opacity: 0, duration: 1.1, repeat: 8, stagger: 0.18, ease: 'power1.out' }, 0);
    tl.fromTo('.tongs', { x: -110, y: -10 }, { x: 0, y: 0, duration: 1.4, ease: 'power2.out' }, 4.3);
    tl.to('.gold-glow', { opacity: 1, duration: 1.2 }, 5.4);
    tl.to('.gold-bar', { attr: { fill: '#ff9f43' }, duration: 0.9 }, 5.2);
    tl.to('.gold-bar', { attr: { fill: '#ffd23f' }, duration: 1 }, 6.3);
    tl.fromTo('.gs', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.15, ease: 'back.out(2)' }, 6.2);
    // chuyển cảnh sang đường chạy
    tl.to('.pa', { opacity: 0, duration: 0.5 }, 7.4);
    tl.fromTo('.pb', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 7.4);
    tl.fromTo('.kid5', { x: -20 }, { x: 140, duration: 5.2, ease: 'none' }, 7.5);
    walkCycle(tl, 'k5', 7.5, 5.2, 40);
    [[26, 8.6], [66, 9.7], [100, 10.8]].forEach(([_, t]) => {
      tl.to('.kid5-j', { y: -14, duration: 0.32, ease: 'power2.out', yoyo: true, repeat: 1 }, t - 0.15);
    });
    tl.fromTo('.tape', { scaleX: 1 }, { scaleX: 0, duration: 0.2, transformOrigin: '0% 50%' }, 12.35);
    tl.fromTo('.medal', { scale: 0, y: -10, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.6, ease: 'back.out(2.4)', transformOrigin: '50% 0%' }, 12.4);
  });
  return (
    <Svg ref={ref}>
      <g className="pa">
        <rect width="160" height="90" fill="#2a1d3b" />
        <rect y="70" width="160" height="20" fill="#3d2b4f" />
        <circle className="gold-glow" cx="86" cy="45" r="30" fill="#ffd23f" opacity="0" />
        <g transform="translate(80 74)">
          <rect x="-28" y="-4" width="56" height="10" rx="2" fill="#6b4a3a" {...st} />
          {[[-12, 1.3], [0, 1.7], [12, 1.2]].map(([x, s], i) => <g key={i} transform={`translate(${x} -3)`}><g className="fl"><Flame s={s} /></g></g>)}
          <g transform="translate(-6 -4)"><g className="fl"><Flame c="#ffd23f" s={0.9} /></g></g>
        </g>
        {[[70, 56], [84, 52], [96, 56]].map(([x, y], i) => <G key={i} x={x} y={y}><circle className="ember" r="1.1" fill="#ffc15e" /></G>)}
        <G x={86} y={60}>
          <g className="tongs">
            <path d="M-60 -34 L-8 -5 M-60 -26 L-8 -1" stroke="#9aa3c7" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            <rect className="gold-bar" x="-12" y="-9" width="24" height="9" rx="1.5" fill="#ffd23f" {...st} strokeWidth=".8" />
            <path d="M-9 -7 H4" stroke="#fff" strokeWidth="1" strokeLinecap="round" opacity=".7" />
          </g>
        </G>
        {[[60, 30], [112, 34], [78, 20]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="gs" opacity="0"><Sparkle s={1.4} /></g></G>)}
      </g>
      <g className="pb" opacity="0">
        <Sky id="s5" a="#a8defe" b="#eef9ff" ground={62} gcol="#9ad78e" />
        <G x={26} y={14}><Cloud /></G>
        <G x={108} y={18} s={0.8}><Cloud /></G>
        <rect y="66" width="160" height="24" fill="#d2754a" />
        {[70, 78, 86].map((y) => <rect key={y} y={y} width="160" height=".8" fill="#fff" opacity=".6" />)}
        {[26, 66, 100].map((x) => (
          <g key={x} transform={`translate(${x} 80)`} {...st} strokeWidth=".7">
            <rect x="-6" y="-12" width="1.6" height="12" fill="#cfd8ea" />
            <rect x="4.4" y="-12" width="1.6" height="12" fill="#cfd8ea" />
            <rect x="-6.4" y="-12" width="12.8" height="2.6" fill="#ef476f" />
          </g>
        ))}
        <G x={140} y={80}>
          <rect className="tape" x="-3" y="-14" width="22" height="2" fill="#ef476f" />
          <rect x="-4" y="-18" width="2.4" height="18" fill="#cfd8ea" {...st} strokeWidth=".6" />
          <rect x="17" y="-18" width="2.4" height="18" fill="#cfd8ea" {...st} strokeWidth=".6" />
        </G>
        <G x={0} y={80}><g className="kid5"><g className="kid5-j"><Kid p="k5" shirt="#ff6b81" /></g></g></G>
        <G x={146} y={32}>
          <g className="medal">
            <path d="M-6 -10 L0 0 L6 -10Z" fill="#ef476f" />
            <circle r="8" fill="#ffd23f" {...st} strokeWidth=".9" />
            <G y={0}><Star s={0.9} fill="#fff4b8" /></G>
          </g>
        </G>
      </g>
    </Svg>
  );
}

/* ===== 6. Uống nước nhớ nguồn ===== */
export function UongNuoc({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.str', { strokeDashoffset: 0 }, { strokeDashoffset: -20, duration: 0.8, repeat: -1, ease: 'none' }, 0);
    tl.fromTo('.cupw', { scaleY: 0 }, { scaleY: 1, duration: 2.6, ease: 'none', transformOrigin: '50% 100%' }, 0.6);
    tl.fromTo('.spw', { scale: 0.6, opacity: 0.4 }, { scale: 1.2, opacity: 0.9, duration: 0.6, repeat: -1, yoyo: true }, 0);
    // học sinh nâng cốc uống (0-5 giây)
    tl.to('.cup', { x: 17, y: -26, rotation: -26, duration: 0.9, ease: 'power2.inOut', transformOrigin: '50% 100%' }, 3.4);
    tl.to('.cupw', { scaleY: 0.35, duration: 0.8 }, 4.3);
    tl.to('.k6-armR', { rotation: -130, duration: 0.6, transformOrigin: '50% 0%' }, 3.4);
    mouth(tl, 'k6', 'O', 4.2);
    mouth(tl, 'k6', 'S', 5);
    tl.to('.cup', { x: 0, y: 0, rotation: 0, duration: 0.6 }, 5);
    tl.to('.k6-armR', { rotation: 0, duration: 0.5, transformOrigin: '50% 0%' }, 5);
    // 5,6 giây: quay lại, lần theo dòng nước về đầu nguồn
    tl.to('.kid6', { x: -78, y: -24, duration: 4.4, ease: 'none' }, 5.8);
    walkCycle(tl, 'k6', 5.8, 4.4, 28);
    tl.fromTo('.srcglow', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 9.8);
    tl.to('.srcglow', { scale: 1.2, duration: 0.7, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 10.5);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.14, ease: 'back.out(2)' }, 10.2);
  });
  return (
    <Svg ref={ref}>
      <Sky id="s6" a="#a8defe" b="#eef9ff" ground={64} gcol="#9ad78e" />
      <G x={110} y={16}><Cloud /></G>
      <G x={28} y={52} s={1.3}><Mountain /></G>
      <rect y="64" width="160" height="26" fill="#8fd18b" />
      <G x={46} y={34}><circle className="srcglow" r="9" fill="#fff4b8" opacity="0" /></G>
      <ellipse cx="46" cy="38" rx="6" ry="2.4" fill="#5dc1ff" />
      <G x={46} y={38}><ellipse className="spw" rx="4" ry="1.4" fill="#e6f8ff" /></G>
      <path d="M46 38 C60 44 62 56 80 62 C98 68 108 70 116 72" fill="none" stroke="#4aa8ff" strokeWidth="5" strokeLinecap="round" />
      <path className="str" d="M46 38 C60 44 62 56 80 62 C98 68 108 70 116 72" fill="none" stroke="#e6f8ff" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="4 6" />
      <G x={120} y={80}>
        <g className="cup">
          <path d="M-6 -16 H6 L4.4 0 H-4.4Z" fill="#e6f8ff" opacity=".85" {...st} strokeWidth=".8" />
          <g clipPath="url(#cupclip)"><rect className="cupw" x="-5" y="-14" width="10" height="14" fill="#4aa8ff" /></g>
        </g>
        <defs><clipPath id="cupclip"><path d="M-5.6 -15 H5.6 L4 -0.8 H-4 Z" /></clipPath></defs>
      </G>
      <rect x="116" y="70" width="8" height="10" fill="#a2abc4" opacity="0" />
      <G x={140} y={80}><g className="kid6"><Kid p="k6" shirt="#7c5cff" /></g></G>
      {[[30, 34], [60, 26], [52, 52]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

void Bulb; void Sweat;
