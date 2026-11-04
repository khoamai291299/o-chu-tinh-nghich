import gsap from 'gsap';
import { Svg, G, Sky, Cloud, Sparkle, useScene, C, INK, st } from './kit.jsx';
import { Rock } from './props.jsx';
import { Kid, Room, Desk, Book, BookOpen, BookClosed, Bulb, Sweat, Exclaim, Question, Star, WallClock, Scallion, Ball, Board, walkCycle, mouth } from './kit2.jsx';
import { Foot, Digit } from './kit.jsx';

/* ===== 7. Thức khuya dậy sớm ===== */
const AlarmClock = () => (
  <g {...st} strokeWidth=".7">
    <circle cx="-4" cy="-6" r="2.6" fill="#ffd23f" /><circle cx="4" cy="-6" r="2.6" fill="#ffd23f" />
    <circle r="5.4" fill="#ef476f" />
    <circle r="3.8" fill="#fff" />
    <path d="M0 0 V-2.6 M0 0 L1.8 1" stroke={INK} strokeWidth=".7" fill="none" strokeLinecap="round" />
    <path d="M-3 5 L-4 7.4 M3 5 L4 7.4" fill="none" />
  </g>
);
export function ThucKhuya({ running }) {
  const ref = useScene(running, (tl) => {
    // nửa đêm, gục xuống bàn
    tl.to('.k7-head', { rotation: 72, x: 8, y: 11, duration: 0.9, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0.4);
    tl.to('.k7-eyes', { opacity: 0, duration: 0.2 }, 1);
    tl.fromTo('.zz', { y: 0, x: 0, opacity: 0, scale: 0.5 }, { y: -18, x: 6, opacity: 1, scale: 1.1, duration: 1.4, repeat: 2, stagger: 0.45, ease: 'sine.out', transformOrigin: '50% 50%' }, 1);
    tl.to('.star7', { opacity: 0.25, duration: 0.5, yoyo: true, repeat: 8, stagger: 0.2 }, 0);
    tl.to('.wc-mh', { rotation: 18, duration: 4.5, ease: 'none', transformOrigin: '50% 100%' }, 0);
    // 5 giây: bình minh, chuông báo thức reo, bật dậy
    tl.to('.skyw', { attr: { fill: '#ffc27a' }, duration: 1.4 }, 5);
    tl.to('.room-wall', { attr: { fill: '#ffe9c9' }, duration: 1.4 }, 5);
    tl.to('.room-floor', { attr: { fill: '#e0b27f' }, duration: 1.4 }, 5);
    tl.to('.moon', { y: 30, opacity: 0, duration: 1.2 }, 5);
    tl.to('.star7', { opacity: 0, duration: 0.5 }, 5);
    tl.fromTo('.sunw', { y: 34 }, { y: 0, duration: 1.8, ease: 'power2.out' }, 5.2);
    tl.to('.wc-mh', { rotation: 360 * 5, duration: 1.8, ease: 'power2.inOut', transformOrigin: '50% 100%' }, 5);
    tl.to('.wc-hh', { rotation: 150, duration: 1.8, ease: 'power2.inOut', transformOrigin: '50% 100%' }, 5);
    tl.fromTo('.alarm', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(3)', transformOrigin: '50% 100%' }, 6.4);
    tl.to('.alarm-s', { rotation: 9, duration: 0.06, yoyo: true, repeat: 40, transformOrigin: '50% 100%' }, 6.5);
    tl.fromTo('.ring', { scale: 0.4, opacity: 0.9 }, { scale: 1.8, opacity: 0, duration: 0.7, repeat: 4, stagger: 0.2, transformOrigin: '50% 100%' }, 6.5);
    tl.set('.k7-eyes', { opacity: 1 }, 7.1);
    tl.to('.k7-head', { rotation: 0, x: 0, y: 0, duration: 0.35, ease: 'back.out(2)', transformOrigin: '50% 100%' }, 7.1);
    mouth(tl, 'k7', 'O', 7.2);
    tl.to('.k7-armL', { rotation: 160, duration: 0.4, ease: 'back.out(2)', transformOrigin: '50% 0%' }, 7.3);
    tl.to('.k7-armR', { rotation: -160, duration: 0.4, ease: 'back.out(2)', transformOrigin: '50% 0%' }, 7.3);
    mouth(tl, 'k7', 'S', 8.8);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.14, ease: 'back.out(2)' }, 8.4);
  });
  return (
    <Svg ref={ref}>
      <Room wall="#1c1f4a" floor="#2b2d5e" dark />
      <G x={104} y={8}>
        <rect className="skyw" width="46" height="36" rx="2" fill="#0b1033" stroke={INK} strokeWidth=".9" />
        {[[8, 8], [34, 10], [20, 24], [38, 28]].map(([x, y], i) => <circle key={i} className="star7" cx={x} cy={y} r="0.9" fill="#fff" />)}
        <g className="moon"><circle cx="30" cy="12" r="6" fill="#fff4b8" /><circle cx="33" cy="10" r="5.2" fill="#0b1033" /></g>
        <g clipPath="url(#win7)"><g className="sunw"><circle cx="16" cy="30" r="8" fill="#ffd23f" /></g></g>
        <path d="M23 0V36M0 18H46" stroke={INK} strokeWidth=".9" />
        <defs><clipPath id="win7"><rect width="46" height="36" rx="2" /></clipPath></defs>
      </G>
      <G x={36} y={26}><WallClock p="wc" r={12} /></G>
      <G x={64} y={82}>
        <Kid p="k7" shirt="#ff6b81" />
        <G x={0} y={-44}>
          {[0, 1, 2].map((i) => <text key={i} className="zz" x={i * 5} y={-i * 4} fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize={8 + i * 2} fill="#cbd5ff" opacity="0">Z</text>)}
        </G>
      </G>
      <G x={64} y={67}><Desk w={52} h={16} /></G>
      <G x={88} y={64}><g className="alarm" opacity="0"><g className="alarm-s"><AlarmClock /></g></g></G>
      <G x={88} y={58}>{[0, 1].map((i) => <circle key={i} className="ring" r="9" fill="none" stroke="#ef476f" strokeWidth=".9" opacity="0" />)}</G>
      {[[24, 52], [92, 28], [128, 56]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

/* ===== 8. Học đi đôi với hành ===== */
const Card8 = ({ children }) => (
  <g>
    <rect x="-15" y="-19" width="30" height="38" rx="4" fill="#fff" {...st} strokeWidth="1" />
    {children}
  </g>
);
export function HocDiDoi({ running }) {
  const ref = useScene(running, (tl) => {
    // học sinh chăm chỉ đọc sách, ký hiệu bay quanh
    tl.to('.k8-head', { rotation: 5, duration: 0.9, yoyo: true, repeat: 4, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0.2);
    tl.fromTo('.sym', { y: 0, opacity: 0 }, { y: -14, opacity: 1, duration: 1.2, repeat: 2, stagger: 0.35, ease: 'sine.out' }, 0.5);
    tl.to('.k8-armL', { rotation: 30, duration: 0.6, transformOrigin: '50% 0%' }, 0.2);
    tl.to('.k8-armR', { rotation: -30, duration: 0.6, transformOrigin: '50% 0%' }, 0.2);
    // 4,6 giây: chuyển sang bảng ghép hình
    tl.fromTo('.flash8', { opacity: 0 }, { opacity: 1, duration: 0.25, yoyo: true, repeat: 1 }, 4.6);
    tl.set('.a8', { opacity: 0 }, 4.85);
    tl.set('.b8', { opacity: 1 }, 4.85);
    [0, 1, 2, 3].forEach((i) => {
      tl.fromTo(`.c8-${i}`, { scale: 0, rotation: -25 }, { scale: 1, rotation: 0, duration: 0.6, ease: 'back.out(2.2)', transformOrigin: '0px 0px' }, 5.4 + i * 1.3);
      if (i < 3) tl.fromTo(`.pl8-${i}`, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(3)', transformOrigin: '0px 0px' }, 5.9 + i * 1.3);
    });
    tl.to('.foot8', { x: 3, duration: 0.4, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 6.9);
    tl.to('.sc8', { rotation: 6, duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 9.4);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(2)' }, 9.6);
  });
  return (
    <Svg ref={ref}>
      <g className="a8">
        <Room board win />
        <G x={36} y={76}>
          <Kid p="k8" shirt="#34d399" />
          <G x={0} y={-14}><BookOpen s={0.8} /></G>
        </G>
        {[['+', 24, 28], ['×', 52, 22], ['=', 74, 34], ['÷', 36, 40]].map(([t, x, y], i) => (
          <text key={i} className="sym" x={x} y={y} fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="9" fill="#fff" opacity="0">{t}</text>
        ))}
        <G x={116} y={68}><Desk w={34} h={16} /></G>
        <G x={116} y={62}><Book c="#ffd166" w={13} h={3.4} /></G>
      </g>
      <g className="b8" opacity="0">
        <rect width="160" height="90" fill="#2e2a6b" />
        <rect width="160" height="90" fill="url(#dots8)" />
        <defs>
          <pattern id="dots8" width="8" height="8" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="#ffffff22" /></pattern>
        </defs>
        <G x={22} y={45}><g className="c8-0"><Card8><G y={0}><BookOpen s={0.95} /></G></Card8></g></G>
        <G x={62} y={45}><g className="c8-1"><Card8><G x={-3} y={2} s={0.55}><g className="foot8"><Foot /></g></G></Card8></g></G>
        <G x={102} y={45}><g className="c8-2"><Card8><Digit ch="2" size={32} /></Card8></g></G>
        <G x={142} y={45}><g className="c8-3"><Card8><G y={0} s={1.15}><g className="sc8"><Scallion /></g></G></Card8></g></G>
        {[42, 82, 122].map((x, i) => <G key={i} x={x} y={45}><g className={`pl8-${i}`} opacity="0"><text textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="14" fill="#ffd166">+</text></g></G>)}
        {[[20, 14], [80, 12], [138, 16], [50, 76], [112, 78]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
      </g>
      <rect className="flash8" width="160" height="90" fill="#fff" opacity="0" />
    </Svg>
  );
}

/* ===== 9. Mắt chữ A, mồm chữ O ===== */
const PageLines = ({ n, dense = false }) => (
  <g>
    {Array.from({ length: n }, (_, i) => (
      <rect key={i} x="-17" y={-24 + i * (dense ? 3.1 : 6)} width={dense ? 33 : 10 + ((i * 7) % 23)} height={dense ? 1.5 : 2} rx=".7" fill={dense ? '#3f4670' : '#9aa3c7'} />
    ))}
  </g>
);
export function MatChuA({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.paper9', { x: 70, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.3);
    tl.to('.f9-eyes', { scaleY: 0.1, duration: 0.08, yoyo: true, repeat: 1, repeatDelay: 0.2, transformOrigin: '50% 50%' }, 1.6);
    tl.to('.pg2', { scaleX: 0, duration: 0.5, ease: 'power1.in', transformOrigin: '0% 50%' }, 2);
    tl.to('.pg1', { scaleX: 0, duration: 0.5, ease: 'power1.in', transformOrigin: '0% 50%' }, 3.4);
    tl.to('.face9', { y: 1.2, duration: 1, yoyo: true, repeat: 4, ease: 'sine.inOut' }, 0);
    // 5,2 giây: mắt thành chữ A, miệng tròn thành chữ O
    tl.to('.f9-eyes', { opacity: 0, scale: 0, duration: 0.2, transformOrigin: '50% 50%' }, 5.2);
    tl.fromTo('.f9-A', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)', transformOrigin: '0px 0px' }, 5.3);
    tl.to('.f9-smile', { opacity: 0, duration: 0.1 }, 5.4);
    tl.fromTo('.f9-O', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)', transformOrigin: '0px 0px' }, 5.5);
    tl.fromTo('.sw9', { y: 0, opacity: 0 }, { y: 10, opacity: 1, duration: 0.7, stagger: 0.25, repeat: 3 }, 6);
    tl.to('.f9-A', { scale: 1.12, duration: 0.3, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 6);
    // 7 giây: lật sang trang cuối dài kín chữ
    tl.to('.pg0', { scaleX: 0, duration: 0.6, ease: 'power1.in', transformOrigin: '0% 50%' }, 7);
    tl.to('.paper9', { scale: 1.12, x: -4, duration: 1.2, ease: 'power2.out', transformOrigin: '50% 50%' }, 7);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.14, ease: 'back.out(2)' }, 8.6);
  });
  const Page = ({ cls, children, fill = '#fffdf2' }) => (
    <g className={cls}><rect x="-20" y="-28" width="40" height="56" rx="1.5" fill={fill} {...st} strokeWidth=".8" />{children}</g>
  );
  return (
    <Svg ref={ref}>
      <rect width="160" height="90" fill="#ffe9c9" />
      <rect y="70" width="160" height="20" fill="#e3b583" />
      <G x={60} y={48}>
        <g className="face9">
          <circle r="27" fill="#ffd9b8" {...st} strokeWidth="1.1" />
          <path d="M-26 -5 C-28 -26 -8 -31 2 -29 C20 -30 29 -18 26 -5 C18 -15 -6 -17 -26 -5Z" fill="#2b2d42" {...st} strokeWidth=".8" />
          <ellipse cx="-16" cy="10" rx="4" ry="2.4" fill={C.pink} opacity=".7" /><ellipse cx="16" cy="10" rx="4" ry="2.4" fill={C.pink} opacity=".7" />
          <g className="f9-eyes"><circle cx="-9" cy="-1" r="2.6" fill={INK} /><circle cx="9" cy="-1" r="2.6" fill={INK} /></g>
          {[-9, 9].map((x) => (
            <text key={x} className="f9-A" x={x} y="-1" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="17" fill="#ef476f" stroke={INK} strokeWidth=".7" paintOrder="stroke" opacity="0">A</text>
          ))}
          <path className="f9-smile" d="M-7 13 Q0 19 7 13" fill="none" stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
          <text className="f9-O" x="0" y="15" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="22" fill="#4f8cff" stroke={INK} strokeWidth=".8" paintOrder="stroke" opacity="0">O</text>
          <G x={24} y={-14}><g className="sw9" opacity="0"><Sweat s={1.1} /></g></G>
          <G x={-26} y={-8}><g className="sw9" opacity="0"><Sweat s={0.9} /></g></G>
        </g>
      </G>
      <G x={118} y={50}>
        <g className="paper9">
          <Page cls="pg-bottom"><PageLines n={18} dense /></Page>
          <Page cls="pg0"><PageLines n={9} /></Page>
          <Page cls="pg1"><PageLines n={8} /></Page>
          <Page cls="pg2"><text x="0" y="-16" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="6" fill="#ef476f">ĐỀ THI</text><PageLines n={6} /></Page>
        </g>
      </G>
      {[[26, 14], [100, 14], [142, 76]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

/* ===== 10. Một công đôi việc ===== */
export function MotCongDoiViec({ running }) {
  const ref = useScene(running, (tl) => {
    const items = ['.it0', '.it1', '.it2'];
    const start = [{ x: 108, y: 62 }, { x: 28, y: 64 }, { x: 128, y: 80 }];
    items.forEach((s, i) => tl.set(s, start[i], 0));
    tl.to('.k10-head', { rotation: -8, duration: 0.7, yoyo: true, repeat: 5, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0.2);
    tl.to('.k10-armL', { rotation: 150, duration: 0.5, transformOrigin: '50% 0%' }, 1);
    tl.to('.k10-armL', { rotation: 130, duration: 0.25, yoyo: true, repeat: 5, transformOrigin: '50% 0%' }, 1.6);
    tl.fromTo('.q10', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)', stagger: 0.5, repeat: 1, yoyo: true, repeatDelay: 1 }, 0.8);
    // 5 giây: mọi thứ bay lên và xoay quanh, nhân vật cố giữ
    const o = { a: 0, k: 0 };
    const place = () => {
      items.forEach((s, i) => {
        const a = o.a + (i * Math.PI * 2) / 3;
        const tx = 80 + 40 * Math.cos(a);
        const ty = 34 + 13 * Math.sin(a);
        gsap.set(s, { x: start[i].x + (tx - start[i].x) * o.k, y: start[i].y + (ty - start[i].y) * o.k, rotation: Math.sin(a) * 18 });
      });
    };
    tl.to(o, { k: 1, duration: 1, ease: 'power2.out', onUpdate: place }, 5);
    tl.to(o, { a: Math.PI * 8, duration: 7, ease: 'none', onUpdate: place }, 5);
    tl.to('.k10-armL', { rotation: 165, duration: 0.28, yoyo: true, repeat: 20, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 5.2);
    tl.to('.k10-armR', { rotation: -165, duration: 0.28, yoyo: true, repeat: 20, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 5.35);
    mouth(tl, 'k10', 'O', 5.3);
    tl.fromTo('.sw10', { y: 0, opacity: 0 }, { y: 8, opacity: 1, duration: 0.6, stagger: 0.2, repeat: 6 }, 6);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(2)' }, 7);
  });
  return (
    <Svg ref={ref}>
      <Room win />
      <G x={80} y={82}><Kid p="k10" shirt="#ff8a3d" /></G>
      <G x={80} y={66}><Desk w={46} h={16} /></G>
      <g className="it0"><Board s={1.25} /></g>
      <g className="it1"><BookClosed c="#4f8cff" s={0.9} /></g>
      <g className="it2"><Ball s={1.4} /></g>
      <G x={72} y={30}><g className="q10" opacity="0"><Question s={0.9} /></g></G>
      <G x={96} y={34}><g className="q10" opacity="0"><Question s={0.8} /></g></G>
      <G x={88} y={44}><g className="sw10" opacity="0"><Sweat s={0.9} /></g></G>
      <G x={72} y={44}><g className="sw10" opacity="0"><Sweat s={0.9} /></g></G>
      {[[20, 20], [140, 22], [150, 60], [14, 56]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

/* ===== 11. Học thầy không tày học bạn ===== */
const Head = ({ glasses, hair = '#2b2d42', cap }) => (
  <g>
    <circle r="6" fill="#ffd9b8" {...st} strokeWidth=".7" />
    <path d="M-5.8 -1 C-6 -6 -1 -7 1 -6.5 C5 -7 6.2 -4 5.8 -1 C3 -3 -2 -3.4 -5.8 -1Z" fill={hair} />
    {glasses && <g fill="none" stroke={INK} strokeWidth=".5"><circle cx="-2.3" cy=".6" r="1.8" /><circle cx="2.3" cy=".6" r="1.8" /></g>}
    {!glasses && <><circle cx="-2.2" cy=".8" r=".7" fill={INK} /><circle cx="2.2" cy=".8" r=".7" fill={INK} /></>}
    <path d="M-1.6 3 Q0 4.4 1.6 3" fill="none" stroke={INK} strokeWidth=".5" strokeLinecap="round" />
    {cap && <path d="M-7 -4.5 L0 -8 L7 -4.5 L0 -1.5Z" fill="#2b2d42" />}
  </g>
);
export function HocThayHocBan({ running }) {
  const syms = [['π', 92, 0], ['√', 108, 4], ['∑', 136, 0], ['x²', 152, 4]];
  const ref = useScene(running, (tl) => {
    // bạn A loay hoay
    tl.to('.k11a-head', { rotation: -9, duration: 0.7, yoyo: true, repeat: 6, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0.2);
    tl.to('.k11a-armR', { rotation: -140, duration: 0.5, transformOrigin: '50% 0%' }, 0.6);
    tl.to('.k11a-armR', { rotation: -110, duration: 0.2, yoyo: true, repeat: 9, transformOrigin: '50% 0%' }, 1.1);
    tl.fromTo('.qm', { scale: 0, opacity: 0, y: 6 }, { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(3)', stagger: 0.7 }, 0.9);
    tl.to('.scribble', { strokeDashoffset: 0, duration: 2.2, ease: 'none' }, 0.6);
    // 5 giây: bạn cùng bàn chỉ một bước giải
    tl.to('.qm', { opacity: 0, duration: 0.3 }, 5);
    tl.to('.k11b-armL', { rotation: 100, duration: 0.5, ease: 'back.out(2)', transformOrigin: '50% 0%' }, 5.2);
    tl.fromTo('.step', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', transformOrigin: '50% 50%' }, 5.6);
    syms.forEach((_, i) => {
      tl.fromTo(`.gl${i}`, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)', transformOrigin: '50% 50%' }, 6.2 + i * 0.4);
      tl.to(`.gl${i}`, { scale: 1.2, duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 7.4);
    });
    tl.fromTo('.ans', { opacity: 0, y: 4 }, { opacity: 1, y: 0, duration: 0.5 }, 7.9);
    tl.fromTo('.bulb11', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)', transformOrigin: '50% 100%' }, 7.9);
    tl.to('.k11a-armR', { rotation: 0, duration: 0.3, transformOrigin: '50% 0%' }, 7.9);
    mouth(tl, 'k11a', 'O', 7.9);
    mouth(tl, 'k11a', 'S', 8.8);
    // 9 giây: cán cân, thầy nhẹ hơn bạn
    tl.fromTo('.scale11', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2)', transformOrigin: '50% 100%' }, 9);
    tl.to('.beam', { rotation: 14, duration: 1.1, ease: 'elastic.out(1,.5)', transformOrigin: '50% 50%' }, 9.6);
    tl.to('.pan-l', { y: -5.4, duration: 1.1, ease: 'elastic.out(1,.5)' }, 9.6);
    tl.to('.pan-r', { y: 5.4, duration: 1.1, ease: 'elastic.out(1,.5)' }, 9.6);
  });
  return (
    <Svg ref={ref}>
      <Room board />
      <G x={14} y={10}>
        <text className="eq" x="29" y="12" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="6.4" fill="#fff">x² + 3x − 4 = 0</text>
        <text className="step" x="29" y="20" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="5.6" fill="#a7f3d0" opacity="0">(x − 1)(x + 4) = 0</text>
        <text className="ans" x="29" y="27" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="6" fill="#ffd166" opacity="0">x = 1 hoặc x = −4</text>
      </G>
      {syms.map(([t, x, y], i) => (
        <G key={i} x={x} y={y + 14}>
          <g className={`gl${i}`} opacity="0">
            <circle r="5.4" fill="#ffe27a" opacity=".55" />
            <text textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="7" fill={INK}>{t}</text>
          </g>
        </G>
      ))}
      <G x={30} y={80}>
        <Kid p="k11a" shirt="#ff6b81" />
        <G x={-2} y={-47}><g className="qm" opacity="0"><Question s={0.9} /></g></G>
        <G x={9} y={-46}><g className="qm" opacity="0"><Question s={0.7} /></g></G>
        <G x={0} y={-48}><g className="bulb11" opacity="0"><Bulb s={0.8} /></g></G>
      </G>
      <path className="scribble" d="M16 64 q4 -6 8 0 t8 0 t8 0 t8 0 q-12 5 -28 8 q18 -2 32 4" fill="none" stroke="#7c5cff" strokeWidth=".8" strokeLinecap="round" strokeDasharray="120" strokeDashoffset="120" />
      <G x={56} y={80}><Kid p="k11b" shirt="#34d399" glasses /></G>
      <G x={126} y={50} s={0.75}>
        <g className="scale11" opacity="0">
          <path d="M0 8 V24 M-7 24 H7" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
          <g className="beam">
            <rect x="-24" y="-1" width="48" height="2.4" rx="1.2" fill="#a0643c" {...st} strokeWidth=".6" />
            <circle cx="0" cy=".2" r="1.8" fill="#ffd166" {...st} strokeWidth=".5" />
          </g>
          <G x={-24} y={9}><g className="pan-l"><path d="M0 -8 L-6 0 M0 -8 L6 0" stroke={INK} strokeWidth=".5" /><path d="M-9 0 H9 Q9 4 0 4 Q-9 4 -9 0Z" fill="#cbd5ff" {...st} strokeWidth=".6" /><G y={-6}><Head glasses hair="#9aa3c7" cap /></G></g></G>
          <G x={24} y={9}><g className="pan-r"><path d="M0 -8 L-6 0 M0 -8 L6 0" stroke={INK} strokeWidth=".5" /><path d="M-9 0 H9 Q9 4 0 4 Q-9 4 -9 0Z" fill="#cbd5ff" {...st} strokeWidth=".6" /><G y={-6}><Head /></G></g></G>
        </g>
      </G>
    </Svg>
  );
}

/* ===== 12. Đi một ngày đàng, học một sàng khôn ===== */
export function DiMotNgayDang({ running }) {
  const ref = useScene(running, (tl) => {
    // phần A: ba lô nặng dần, leo cầu thang, hoá thành tảng đá
    [0.7, 1.5, 2.3, 3.1].forEach((t, i) => {
      tl.fromTo(`.bk${i}`, { y: -40, opacity: 1 }, { y: 0, opacity: 0, duration: 0.45, ease: 'power2.in' }, t);
      tl.to('.pack', { scale: 1.35 + i * 0.33, duration: 0.35, ease: 'back.out(2)', transformOrigin: '100% 100%' }, t + 0.4);
    });
    tl.to('.kidA-r', { rotation: 10, duration: 3, ease: 'none', transformOrigin: '50% 100%' }, 0.7);
    [[62, 68, 1.2], [80, 60, 2.6], [100, 52, 4]].forEach(([x, y, t]) => {
      tl.to('.kidA', { x: x - 20, duration: 0.7, ease: 'none' }, t - 0.3);
      tl.to('.kidA', { y: y - 76, duration: 0.7, ease: 'power1.inOut' }, t - 0.3);
    });
    walkCycle(tl, 'kA', 0.7, 4.6, 18);
    tl.to('.pack', { opacity: 0, duration: 0.5 }, 5);
    tl.fromTo('.rock12', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)', transformOrigin: '100% 100%' }, 5);
    tl.to('.kidA-r', { scaleY: 0.86, duration: 0.4, transformOrigin: '50% 100%' }, 5.2);
    tl.to('.rock12', { x: 3, duration: 0.05, yoyo: true, repeat: 9 }, 5.7);
    tl.to('.rock12', { opacity: 0, scale: 1.4, duration: 0.3, transformOrigin: '100% 100%' }, 6.2);
    tl.fromTo('.burst12', { scale: 0, opacity: 1, x: 0, y: 0 }, { scale: 1, x: (i) => (i - 3) * 9, y: (i) => -20 - (i % 3) * 8, opacity: 0, duration: 0.8, stagger: 0.03, ease: 'power2.out', transformOrigin: '50% 50%' }, 6.2);
    // chuyển cảnh sang phần B
    tl.to('.pA', { opacity: 0, duration: 0.5 }, 6.8);
    tl.fromTo('.pB', { opacity: 0 }, { opacity: 1, duration: 0.5 }, 6.8);
    // phần B: đi trọn một ngày đàng, mặt trời vượt qua bầu trời
    tl.fromTo('.kidB', { x: 0 }, { x: 78, duration: 5.2, ease: 'none' }, 7);
    walkCycle(tl, 'kB', 7, 5.2, 26);
    tl.fromTo('.sunB', { x: 0 }, { x: 140, duration: 5.6, ease: 'none' }, 7);
    tl.fromTo('.sunB-y', { y: 14 }, { y: -6, duration: 2.8, ease: 'sine.out' }, 7);
    tl.to('.sunB-y', { y: 14, duration: 2.8, ease: 'sine.in' }, 9.8);
    tl.fromTo('.tint', { opacity: 0.5 }, { opacity: 0, duration: 1.8 }, 7);
    tl.to('.tint', { opacity: 0.5, duration: 2.4 }, 10.4);
    // những bóng đèn rơi vào chiếc sàng
    [0, 1, 2, 3, 4].forEach((i) => {
      tl.fromTo(`.fb${i}`, { y: -50, opacity: 0, scale: 0.6 }, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'bounce.out', transformOrigin: '50% 100%' }, 9 + i * 0.55);
    });
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'back.out(2)' }, 11.6);
  });
  return (
    <Svg ref={ref}>
      <g className="pA">
        <Room wall="#e3e9ff" floor="#cdb08a" />
        <path d="M44 80 V68 H70 V60 H90 V52 H112 V80Z" fill="#c9d0e8" {...st} strokeWidth=".9" />
        <path d="M44 68 H70 M70 60 H90 M90 52 H112" stroke="#fff" strokeWidth="1" opacity=".6" />
        <G x={20} y={76}>
          <g className="kidA">
            <g className="kidA-r">
              <g className="pack" transform="translate(-4 -13)">
                <rect x="-12" y="-12" width="12" height="16" rx="3" fill="#ef476f" {...st} strokeWidth=".8" />
                <rect x="-10" y="-3" width="8" height="5" rx="1.5" fill="#c1274e" />
              </g>
              <Kid p="kA" shirt="#4f8cff" />
              <g className="rock12" opacity="0" transform="translate(-6 -12)"><G s={1.1}><Rock /></G></g>
            </g>
          </g>
        </G>
        {[0, 1, 2, 3].map((i) => <G key={i} x={8} y={52 - i * 2}><g className={`bk${i}`} opacity="0"><Book c={['#34d399', '#ffd166', '#7c5cff', '#ff8a3d'][i]} w={11} h={4} /></g></G>)}
        <G x={10} y={30}>
          {Array.from({ length: 7 }, (_, i) => <g key={i} className="burst12" opacity="0"><G x={0} y={0}><Bulb s={0.5} /></G></g>)}
        </G>
      </g>
      <g className="pB" opacity="0">
        <Sky id="s12" a="#9bd6ff" b="#f4fbff" ground={68} gcol="#a7dc90" />
        <G x={30} y={16}><Cloud /></G>
        <G x={100} y={20} s={0.8}><Cloud /></G>
        <rect y="72" width="160" height="18" fill="#d9c08f" />
        <g className="sunB"><g className="sunB-y"><G x={10} y={30}><circle r="8" fill="#ffd23f" stroke="#f4a521" strokeWidth=".8" /></G></g></g>
        <rect className="tint" width="160" height="90" fill="#ff8a5c" opacity="0.5" />
        <G x={10} y={82}><g className="kidB"><Kid p="kB" shirt="#7c5cff" /></g></G>
        <G x={128} y={80}>
          <path d="M-14 -2 L-18 0 M14 -2 L18 0" stroke="#8a5a36" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="0" cy="-6" rx="17" ry="7" fill="#e7c37f" {...st} strokeWidth="1" />
          <ellipse cx="0" cy="-8" rx="14" ry="4.5" fill="#d9a85a" opacity=".8" />
          {[-9, -3, 3, 9].map((x) => <path key={x} d={`M${x} -12 L${x * 0.9} -3`} stroke="#b88a3d" strokeWidth=".6" />)}
          {[-3, -7].map((y) => <path key={y} d={`M-14 ${y} Q0 ${y + 3} 14 ${y}`} fill="none" stroke="#b88a3d" strokeWidth=".6" />)}
          {[[-9, -10], [-4, -12], [1, -10], [6, -13], [11, -10]].map(([x, y], i) => <G key={i} x={x} y={y}><g className={`fb${i}`} opacity="0"><Bulb s={0.7} /></g></G>)}
        </G>
        {[[96, 40], [120, 30], [146, 52]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp" opacity="0"><Sparkle s={1.4} /></g></G>)}
      </g>
    </Svg>
  );
}

void Exclaim; void Star;
