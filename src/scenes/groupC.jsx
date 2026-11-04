import gsap from 'gsap';
import { Svg, G, Sky, Cloud, Sparkle, Fish, Arrow, useScene, C, INK, st } from './kit.jsx';
import { Kid, Room, Desk, Book, BookClosed, Phone, Trophy, Cert, Star, Heart, Sweat, Question, Exclaim, Bubble, mouth } from './kit2.jsx';

/* ===== 13. Cày như trâu ===== */
const Buffalo = () => (
  <g {...st} strokeWidth=".8">
    {[[-11, 0], [-5, 2], [6, 0], [12, 2]].map(([x, d], i) => <rect key={i} className="bleg" x={x - 2} y="5" width="4" height="10" rx="1.5" fill="#4a5163" />)}
    <ellipse cx="0" cy="0" rx="17" ry="8.5" fill="#5b6275" />
    <path d="M-17 -2 Q-23 2 -21 9" fill="none" strokeWidth="1.4" />
    <ellipse cx="17" cy="-2.5" rx="8" ry="6.4" fill="#5b6275" />
    <ellipse cx="23" cy="0" rx="3.8" ry="3.2" fill="#9aa3b8" />
    <circle cx="19" cy="-5" r="1" fill="#fff" /><circle cx="19.3" cy="-5" r=".5" fill={INK} stroke="none" />
    <path d="M13 -7 C8 -9 6 -14 9 -17 M20 -8 C23 -12 28 -12 30 -16" fill="none" stroke="#f5e6c8" strokeWidth="2" />
  </g>
);
const Horns = () => (
  <g fill="none" strokeLinecap="round">
    <path d="M-5 0 C-11 -1 -13 -8 -9 -12" stroke={INK} strokeWidth="3.8" />
    <path d="M5 0 C11 -1 13 -8 9 -12" stroke={INK} strokeWidth="3.8" />
    <path d="M-5 0 C-11 -1 -13 -8 -9 -12" stroke="#f5e6c8" strokeWidth="2.4" />
    <path d="M5 0 C11 -1 13 -8 9 -12" stroke="#f5e6c8" strokeWidth="2.4" />
  </g>
);
export function CayNhuTrau({ running }) {
  const colors = ['#4f8cff', '#ef476f', '#34d399', '#ffd166', '#7c5cff', '#ff8a3d'];
  const ref = useScene(running, (tl) => {
    tl.to('.k13-armR', { rotation: -35, duration: 0.18, yoyo: true, repeat: 40, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 0.2);
    tl.to('.k13-head', { y: 1.6, duration: 0.3, yoyo: true, repeat: 30, ease: 'sine.inOut' }, 0.2);
    for (let i = 0; i < 8; i++) {
      tl.fromTo(`.pl${i}`, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'bounce.out' }, 0.5 + i * 0.55);
      tl.fromTo(`.pr${i}`, { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'bounce.out' }, 0.75 + i * 0.55);
    }
    tl.fromTo('.sw13', { y: 0, opacity: 0 }, { y: 8, opacity: 1, duration: 0.6, stagger: 0.3, repeat: 8 }, 2);
    // 5 giây: bất ngờ mọc sừng trâu, vẫn tiếp tục cày bài
    tl.fromTo('.horns', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'elastic.out(1,.45)', transformOrigin: '50% 100%' }, 5);
    tl.fromTo('.flash13', { opacity: 0 }, { opacity: 0.8, duration: 0.12, yoyo: true, repeat: 1 }, 5);
    tl.to('.horns', { y: 1.6, duration: 0.3, yoyo: true, repeat: 20, ease: 'sine.inOut' }, 5.6);
    tl.to('.field13', { opacity: 1, duration: 1 }, 6.4);
    tl.fromTo('.buf', { x: -40 }, { x: 200, duration: 6.4, ease: 'none' }, 6.4);
    tl.to('.bleg', { rotation: 18, duration: 0.2, yoyo: true, repeat: 31, stagger: 0.05, transformOrigin: '50% 0%' }, 6.4);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(2)' }, 8);
  });
  return (
    <Svg ref={ref}>
      <Room win />
      <g className="field13" opacity="0">
        <rect width="160" height="90" fill="#c8ecff" />
        <rect y="46" width="160" height="44" fill="#8fd18b" />
        {[52, 60, 68, 76, 84].map((y) => <path key={y} d={`M0 ${y} Q40 ${y - 3} 80 ${y} T160 ${y}`} fill="none" stroke="#6fbf73" strokeWidth="1.2" />)}
        <G x={130} y={14}><Cloud /></G>
        <G x={22} y={20} s={0.8}><Cloud /></G>
      </g>
      <G x={0} y={0}>
        <g className="buf"><G x={0} y={58}><Buffalo /></G></g>
      </G>
      {Array.from({ length: 8 }, (_, i) => (
        <G key={i} x={26 + (i % 2) * 2} y={82 - i * 4.6}><g className={`pl${i}`} opacity="0"><Book c={colors[i % 6]} w={22 - (i % 3) * 2} h={4.4} /></g></G>
      ))}
      {Array.from({ length: 8 }, (_, i) => (
        <G key={i} x={134 - (i % 2) * 2} y={82 - i * 4.6}><g className={`pr${i}`} opacity="0"><Book c={colors[(i + 3) % 6]} w={22 - (i % 3) * 2} h={4.4} /></g></G>
      ))}
      <G x={80} y={84}><Kid p="k13" shirt="#4f8cff" /></G>
      <G x={80} y={44}><g className="horns" opacity="0"><Horns /></g></G>
      <G x={80} y={68}><Desk w={46} h={16} /></G>
      <G x={80} y={67}><rect x="-8" y="-2" width="16" height="2" fill="#fff" {...st} strokeWidth=".5" /></G>
      <G x={92} y={46}><g className="sw13" opacity="0"><Sweat s={0.8} /></g></G>
      <G x={68} y={46}><g className="sw13" opacity="0"><Sweat s={0.8} /></g></G>
      <rect className="flash13" width="160" height="90" fill="#fff" opacity="0" />
      {[[56, 36], [108, 34], [80, 20]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

/* ===== 14. Áp lực đồng trang lứa ===== */
export function ApLucDongTrangLua({ running }) {
  const items = ['.o0', '.o1', '.o2', '.o3', '.o4'];
  const ref = useScene(running, (tl) => {
    // lướt điện thoại vui vẻ, tim bay lên
    tl.fromTo('.lk', { y: 0, x: 0, opacity: 0, scale: 0.5 }, { y: -26, x: (i) => (i - 1) * 6, opacity: 1, scale: 1, duration: 1.1, repeat: 3, stagger: 0.4, ease: 'sine.out', transformOrigin: '50% 50%' }, 0.4);
    tl.to('.k14-head', { rotation: 5, duration: 0.8, yoyo: true, repeat: 5, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0.2);
    tl.to('.k14-armR', { rotation: -70, duration: 0.5, transformOrigin: '50% 0%' }, 0.2);
    tl.to('.lk', { opacity: 0, duration: 0.2 }, 5);
    // 5 giây: màn hình tràn ra điểm cao, cúp, giấy khen... bao quanh nhân vật
    tl.to('.scr', { attr: { fill: '#ffe27a' }, duration: 0.3 }, 5);
    const o = { a: 0, r: 56, k: 0 };
    const place = () => items.forEach((s, i) => {
      const a = o.a + (i * Math.PI * 2) / 5;
      const x = 80 + o.r * Math.cos(a) * 1.35 * o.k + (88 - 80) * (1 - o.k);
      const y = 52 + o.r * Math.sin(a) * 0.6 * o.k + (60 - 52) * (1 - o.k);
      gsap.set(s, { x, y, scale: 0.5 + o.k * (1.3 - (o.r - 22) / 70), rotation: Math.sin(a) * 14 });
    });
    items.forEach((s) => gsap.set(s, { x: 88, y: 60, scale: 0.4, opacity: 0 }));
    tl.set(items, { opacity: 1 }, 5);
    tl.to(o, { k: 1, duration: 1.2, ease: 'power2.out', onUpdate: place }, 5);
    tl.to(o, { a: Math.PI * 7, duration: 7, ease: 'none', onUpdate: place }, 5);
    tl.to(o, { r: 24, duration: 4, ease: 'power1.in', onUpdate: place }, 7.5);
    // bạn cùng lứa xuất hiện hai bên
    tl.fromTo('.peerL', { x: -40 }, { x: 0, duration: 0.8, ease: 'back.out(1.6)' }, 6.4);
    tl.fromTo('.peerR', { x: 40 }, { x: 0, duration: 0.8, ease: 'back.out(1.6)' }, 6.8);
    ['p1', 'p2'].forEach((p, i) => {
      tl.to(`.${p}-armL`, { rotation: 160, duration: 0.3, transformOrigin: '50% 0%' }, 7.2);
      tl.to(`.${p}-armR`, { rotation: -160, duration: 0.3, transformOrigin: '50% 0%' }, 7.2);
    });
    tl.fromTo('.press', { x: (i) => (i ? 20 : -20), opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }, 8);
    tl.to('.press', { x: (i) => (i ? -10 : 10), duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 8.9);
    tl.to('.kid14', { scaleY: 0.88, duration: 1.4, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 8);
    mouth(tl, 'k14', 'O', 6);
    tl.to('.k14-armR', { rotation: 0, duration: 0.3, transformOrigin: '50% 0%' }, 6);
    tl.fromTo('.sw14', { y: 0, opacity: 0 }, { y: 8, opacity: 1, duration: 0.6, stagger: 0.2, repeat: 8 }, 6.3);
  });
  return (
    <Svg ref={ref}>
      <rect width="160" height="90" fill="#e9e6ff" />
      <rect y="70" width="160" height="20" fill="#cfc8f3" />
      <G x={80} y={82}>
        <g className="kid14"><Kid p="k14" shirt="#7c5cff" /></g>
        <G x={0} y={-48}>
          {[0, 1].map((i) => <g key={i} className="sw14" opacity="0"><G x={i ? 9 : -9} y={0}><Sweat s={0.9} /></G></g>)}
        </G>
      </G>
      <G x={90} y={61}><Phone s={1.1} /></G>
      <G x={90} y={61}><rect className="scr" x="-4.4" y="-7.7" width="8.8" height="14.3" rx=".8" fill="#7dd3fc" opacity=".01" /></G>
      {[0, 1, 2].map((i) => <G key={i} x={90} y={50}><g className="lk" opacity="0"><Heart s={0.9} /></g></G>)}
      <g className="o0"><Trophy s={1.1} /></g>
      <g className="o1"><Cert s={1.4} n="10" /></g>
      <g className="o2"><Star s={1.4} /></g>
      <g className="o3"><Cert s={1.4} n="9.8" /></g>
      <g className="o4"><Trophy s={1} /></g>
      <G x={15} y={82}><g className="peerL"><G s={0.85}><Kid p="p1" shirt="#34d399" girl /></G></g></G>
      <G x={145} y={82}><g className="peerR"><G s={0.85}><Kid p="p2" shirt="#ff8a3d" glasses /></G></g></G>
      <G x={42} y={46}><g className="press" opacity="0"><G s={0.7}><Arrow fill="#ef476f" /></G></g></G>
      <G x={118} y={46} r={180}><g className="press" opacity="0"><G s={0.7}><Arrow fill="#ef476f" /></G></g></G>
    </Svg>
  );
}

/* ===== 15. Bắt cá hai tay ===== */
export function BatCaHaiTay({ running }) {
  const ref = useScene(running, (tl) => {
    tl.set('.bk15', { scale: 0, opacity: 0 }, 0);
    tl.set('.ph15', { scale: 0, opacity: 0 }, 0);
    // hai tay giữ hai con cá đang quẫy
    tl.to('.k15-armL', { rotation: 140, duration: 0.5, ease: 'back.out(2)', transformOrigin: '50% 0%' }, 0.2);
    tl.to('.k15-armR', { rotation: -140, duration: 0.5, ease: 'back.out(2)', transformOrigin: '50% 0%' }, 0.2);
    tl.fromTo('.fa', { rotation: -28 }, { rotation: 28, duration: 0.22, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 0.3);
    tl.fromTo('.fb', { rotation: 28 }, { rotation: -28, duration: 0.25, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 0.3);
    tl.to('.tail', { rotation: 18, duration: 0.12, yoyo: true, repeat: -1, transformOrigin: '100% 50%' }, 0.3);
    tl.fromTo('.drop15', { y: 0, opacity: 1 }, { y: 24, opacity: 0, duration: 0.8, repeat: 5, stagger: 0.3 }, 0.6);
    // 5,4 giây: cá biến thành sách và điện thoại
    tl.fromTo('.flash15', { scale: 0, opacity: 0.9 }, { scale: 1.6, opacity: 0, duration: 0.5, stagger: 0.2, transformOrigin: '50% 50%' }, 5.4);
    tl.to('.fa', { scale: 0, opacity: 0, duration: 0.25, transformOrigin: '50% 50%' }, 5.4);
    tl.to('.fb', { scale: 0, opacity: 0, duration: 0.25, transformOrigin: '50% 50%' }, 5.6);
    tl.to('.bk15', { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)', transformOrigin: '50% 50%' }, 5.55);
    tl.to('.ph15', { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)', transformOrigin: '50% 50%' }, 5.75);
    // cố giữ cả hai: hai món kéo ra hai phía
    tl.to('.hl', { x: -9, duration: 2.2, ease: 'power1.in' }, 6.6);
    tl.to('.hr', { x: 9, duration: 2.2, ease: 'power1.in' }, 6.6);
    tl.to('.hl', { rotation: -8, duration: 0.07, yoyo: true, repeat: 40, transformOrigin: '50% 100%' }, 6.6);
    tl.to('.hr', { rotation: 8, duration: 0.07, yoyo: true, repeat: 40, transformOrigin: '50% 100%' }, 6.6);
    mouth(tl, 'k15', 'O', 6.4);
    tl.fromTo('.sw15', { y: 0, opacity: 0 }, { y: 9, opacity: 1, duration: 0.6, stagger: 0.18, repeat: 7 }, 6.4);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(2)' }, 8.4);
  });
  return (
    <Svg ref={ref}>
      <Sky id="s15" a="#a8defe" b="#eaf8ff" ground={60} gcol="#58b9f0" />
      <G x={30} y={16}><Cloud /></G>
      <G x={128} y={20} s={0.8}><Cloud /></G>
      {[[20, 72], [64, 80], [110, 74], [140, 82]].map(([x, y], i) => <path key={i} d={`M${x - 8} ${y} q4 -2 8 0 t8 0`} fill="none" stroke="#e6f8ff" strokeWidth=".8" />)}
      <G x={80} y={88} s={1.8}><Kid p="k15" shirt="#ff8a3d" /></G>
      <G x={52} y={22}>
        <g className="hl">
          <g className="fa"><Fish /></g>
          <g className="bk15"><BookClosed c="#4f8cff" s={1.5} /></g>
        </g>
      </G>
      <G x={108} y={22}>
        <g className="hr">
          <g className="fb"><Fish /></g>
          <g className="ph15"><Phone s={1.7} /></g>
        </g>
      </G>
      <G x={52} y={22}><circle className="flash15" r="12" fill="#fff" opacity="0" /></G>
      <G x={108} y={22}><circle className="flash15" r="12" fill="#fff" opacity="0" /></G>
      {[[50, 34], [58, 34]].map(([x, y], i) => <G key={i} x={x} y={y}><circle className="drop15" r="1" fill="#7dd3fc" /></G>)}
      {[[104, 34], [112, 34]].map(([x, y], i) => <G key={i} x={x} y={y}><circle className="drop15" r="1" fill="#7dd3fc" /></G>)}
      <G x={72} y={40}><g className="sw15" opacity="0"><Sweat s={0.9} /></g></G>
      <G x={90} y={40}><g className="sw15" opacity="0"><Sweat s={0.9} /></g></G>
      {[[30, 44], [132, 48], [80, 10]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

/* ===== 16. Nói như rồng leo, làm như mèo mửa ===== */
function Cat() {
  return (
    <g {...st} strokeWidth=".8">
      <ellipse cx="0" cy="8" rx="10" ry="8" fill="#ffb26b" />
      <path d="M-9 -8 L-8 -17 L-2 -10Z M9 -8 L8 -17 L2 -10Z" fill="#ffb26b" />
      <circle cy="-3" r="10" fill="#ffb26b" />
      <path d="M-5 -3 l3 3 M-2 -3 l-3 3 M5 -3 l-3 3 M2 -3 l3 3" stroke={INK} strokeWidth=".9" fill="none" />
      <ellipse cy="3" rx="5.4" ry="3.4" fill="#9be3a4" stroke="none" opacity=".8" />
      <path d="M-3 5 Q0 3.6 3 5" fill="none" strokeWidth=".8" />
      <path d="M-11 -2 H-16 M-11 1 L-16 3 M11 -2 H16 M11 1 L16 3" fill="none" strokeWidth=".5" />
    </g>
  );
}
export function NoiNhuRong({ running }) {
  const N = 12;
  const ref = useScene(running, (tl) => {
    const d = { t: 0 };
    const upd = () => {
      for (let i = 0; i < N; i++) {
        const x = 112 - i * 6.4 + Math.sin(d.t * 2 + i * 0.5) * 2;
        const y = 24 + Math.sin(d.t * 3 - i * 0.7) * 8;
        gsap.set(`.ds${i}`, { x, y });
      }
    };
    upd();
    tl.to(d, { t: 40, duration: 12.5, ease: 'none', onUpdate: upd }, 0);
    tl.fromTo('.dragon', { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 0.8);
    tl.fromTo('.spot', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.1);
    // diễn thuyết hùng hồn
    tl.to('.k16-armL', { rotation: 100, duration: 0.45, yoyo: true, repeat: 9, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 0.5);
    tl.to('.k16-armR', { rotation: -100, duration: 0.55, yoyo: true, repeat: 7, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 0.7);
    tl.to('.k16-mO', { opacity: 1, duration: 0.01, yoyo: true, repeat: 23, repeatDelay: 0.14 }, 0.6);
    tl.to('.k16-mS', { opacity: 0, duration: 0.01, yoyo: true, repeat: 23, repeatDelay: 0.14 }, 0.6);
    tl.fromTo('.spk16', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.25, repeat: 3, yoyo: true }, 1);
    // 5 giây: bắt tay làm việc đơn giản, lúng túng
    tl.to('.mic', { opacity: 0, duration: 0.3 }, 5);
    tl.to('.spot', { opacity: 0.25, duration: 0.6 }, 5);
    tl.to('.dragon', { opacity: 0.35, y: -4, duration: 0.8 }, 5.2);
    tl.to('.k16-armL', { rotation: 70, duration: 0.3, transformOrigin: '50% 0%' }, 5.2);
    tl.to('.k16-armR', { rotation: -70, duration: 0.3, transformOrigin: '50% 0%' }, 5.2);
    tl.fromTo('.cup', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out', stagger: 0.2 }, 5.4);
    for (let r = 0; r < 3; r++) {
      const t = 6.2 + r * 1.1;
      tl.to('.cup-up', { y: -9, duration: 0.35, ease: 'power2.out' }, t);
      tl.to('.cup-up', { x: 4, rotation: 28, duration: 0.3, ease: 'power1.in', transformOrigin: '50% 100%' }, t + 0.35);
      tl.to('.cup-up', { x: 14, y: 10, rotation: 90, duration: 0.3, ease: 'power2.in' }, t + 0.65);
      tl.to('.cup-up', { x: 0, y: 0, rotation: 0, duration: 0.2 }, t + 1.0);
    }
    tl.fromTo('.sw16', { y: 0, opacity: 0 }, { y: 9, opacity: 1, duration: 0.6, stagger: 0.18, repeat: 7 }, 6);
    tl.fromTo('.qq16', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)', stagger: 0.3 }, 6.3);
    // 9 giây: chú mèo xuất hiện ở cuối
    tl.fromTo('.cat', { x: 70, rotation: 20 }, { x: 0, rotation: 0, duration: 0.8, ease: 'back.out(1.8)' }, 9);
    tl.to('.cat-b', { y: -2, rotation: -4, duration: 0.25, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 9.8);
    tl.fromTo('.ugh', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)', transformOrigin: '50% 100%' }, 9.8);
    tl.fromTo('.puddle', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, transformOrigin: '50% 50%' }, 10.2);
  });
  const Seg = (i) => (i === 0
    ? <g key={i} className={`ds${i}`}>
        <path d="M-1 -6 L-5 -14 M3 -6 L4 -14" stroke="#ffd166" strokeWidth="2" strokeLinecap="round" fill="none" />
        <ellipse rx="8" ry="6.4" fill="#ef476f" {...st} strokeWidth=".8" />
        <circle cx="2" cy="-1.8" r="1.6" fill="#fff" /><circle cx="2.4" cy="-1.8" r=".8" fill={INK} />
        <path d="M8 1 Q14 -1 17 3 M8 3 Q14 6 16 10" stroke="#ffd166" strokeWidth=".9" fill="none" />
      </g>
    : <g key={i} className={`ds${i}`}><circle r={6.2 - i * 0.28} fill={i % 2 ? '#ff8fab' : '#ef476f'} {...st} strokeWidth=".7" /><path d={`M-1 ${-6 + i * 0.3} l1 -2.6 l1 2.6`} fill="#ffd166" /></g>);
  return (
    <Svg ref={ref}>
      <rect width="160" height="90" fill="#2b1b3d" />
      <path className="spot" d="M44 0 H96 L120 90 H20Z" fill="#fff6c8" opacity="0" />
      <rect y="72" width="160" height="18" fill="#6b3b2a" />
      <path d="M0 0 H16 Q22 40 8 90 H0Z M160 0 H144 Q138 40 152 90 H160Z" fill="#c1274e" {...st} strokeWidth=".8" />
      <g className="dragon" opacity="0">{Array.from({ length: N }, (_, i) => Seg(N - 1 - i))}</g>
      <G x={50} y={80}>
        <Kid p="k16" shirt="#ffd166" />
        <G x={0} y={-52}><g className="qq16" opacity="0"><Question s={0.9} /></g></G>
        <G x={-9} y={-44}><g className="sw16" opacity="0"><Sweat s={0.8} /></g></G>
        <G x={9} y={-44}><g className="sw16" opacity="0"><Sweat s={0.8} /></g></G>
      </G>
      <g className="mic">
        <G x={72} y={80}><rect x="-1" y="-30" width="2" height="30" fill="#9aa3c7" /><rect x="-6" y="-1" width="12" height="2" fill="#9aa3c7" /><rect x="-3" y="-38" width="6" height="9" rx="3" fill="#2b2d42" {...st} strokeWidth=".7" /></G>
      </g>
      {[[28, 36], [72, 44]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="spk16" opacity="0"><Sparkle s={1.3} /></g></G>)}
      <G x={96} y={80}>
        <path d="M-16 -14 H18 V-12 H-16Z" fill="#a0643c" {...st} strokeWidth=".7" />
        <rect x="-14" y="-12" width="3" height="12" fill="#8a5a36" /><rect x="13" y="-12" width="3" height="12" fill="#8a5a36" />
        <G x={-6} y={-14}><g className="cup"><path d="M-4 -8 H4 L3 0 H-3Z" fill="#ef476f" {...st} strokeWidth=".7" /></g></G>
        <G x={6} y={-14}><g className="cup"><g className="cup-up"><path d="M-4 -8 H4 L3 0 H-3Z" fill="#4f8cff" {...st} strokeWidth=".7" /></g></g></G>
      </G>
      <G x={130} y={82}>
        <g className="cat">
          <g className="cat-b"><G s={1.1}><Cat /></G></g>
          <G x={0} y={-24}><g className="ugh" opacity="0"><Bubble w={20} h={11} tail="left" fill="#e8ffe9" /><text textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="7" fill="#2f9e6a">ọe!</text></g></G>
          <ellipse className="puddle" cx="14" cy="3" rx="9" ry="2.4" fill="#9be3a4" opacity="0" />
        </g>
      </G>
    </Svg>
  );
}

void Exclaim; void C; void Cloud; void Sky; void Desk; void Room;
