import { Svg, G, Sky, Cloud, Sparkle, Fish, useScene, C, INK, st } from './kit.jsx';
import { Heart, Question, Exclaim, Sweat } from './kit2.jsx';
import { Meadow, Knife } from './art.jsx';
import { Boat, Cat, Fly, pop, life } from './xpkit.jsx';

/* ===== 16. Thuận buồm xuôi gió: thuyền buồm căng gió lướt nhanh trên mặt nước ===== */
export function ThuanBuom({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.tb-boat', { x: -30 }, { x: 70, duration: 7, ease: 'none' }, 0);
    tl.to('.tb-bob', { rotation: 3, y: 1.2, duration: 0.8, yoyo: true, repeat: 8, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0);
    tl.to('.tb-bob .sail', { scaleX: 1.08, duration: 0.6, yoyo: true, repeat: 11, ease: 'sine.inOut', transformOrigin: '0% 50%' }, 0);
    tl.to('.tb-w1', { x: -16, duration: 0.9, repeat: 7, ease: 'none' }, 0);
    tl.to('.tb-w2', { x: -16, duration: 1.3, repeat: 5, ease: 'none' }, 0);
    life(tl, '.tb-wind', { x: -10 }, { x: 40, duration: 1.4, stagger: 0.35, repeat: 3, ease: 'none' }, 0);
    tl.to('.tb-cloud', { x: 30, duration: 7, ease: 'none' }, 0);
    tl.to('.tb-gull', { x: 60, y: -6, duration: 7, ease: 'none' }, 0);
  }, { loop: 7 });
  return (
    <Svg ref={ref}>
      <Sky id="tb" a="#8ad0ff" b="#eaf8ff" ground={60} gcol="#2b8fd1" />
      <g className="tb-cloud"><G x={30} y={16}><Cloud w={1.1} /></G><G x={100} y={24}><Cloud w={0.8} /></G></g>
      <G x={20} y={30}><g className="tb-gull"><path d="M-4 0 Q-2 -3 0 0 Q2 -3 4 0" stroke={INK} strokeWidth=".9" fill="none" strokeLinecap="round" /></g></G>
      <rect y="60" width="160" height="30" fill="#2b8fd1" />
      <g className="tb-w1"><path d="M-20 62 Q-12 58 -4 62 T12 62 T28 62 T44 62 T60 62 T76 62 T92 62 T108 62 T124 62 T140 62 T156 62 T172 62 V70 H-20Z" fill="#4cc9f0" /></g>
      <g className="tb-boat"><G x={40} y={60}><g className="tb-bob"><Boat /></g></G></g>
      <g className="tb-w2"><path d="M-20 70 Q-12 65 -4 70 T12 70 T28 70 T44 70 T60 70 T76 70 T92 70 T108 70 T124 70 T140 70 T156 70 T172 70 V90 H-20Z" fill="#1f6fb5" opacity=".9" /></g>
      {[[20, 34], [14, 42], [24, 50]].map(([x, y], i) => <G key={i} x={x} y={y}><path className="tb-wind" d="M0 0 H14 q4 0 4 -3" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0" /></G>)}
    </Svg>
  );
}

/* ===== 17. Mèo mù vớ cá rán: mèo bịt mắt mò mẫm, tình cờ vồ trúng con cá ===== */
export function MeoMu({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.mm-cat', { x: -20, y: 0 }, { x: 50, duration: 3, ease: 'none' }, 0.2);
    tl.to('.mm-bob', { y: -1.6, duration: 0.25, yoyo: true, repeat: 11, ease: 'sine.inOut' }, 0.2);
    tl.to('.mm-cat', { x: 54, duration: 1.2, ease: 'none' }, 3.2);
    pop(tl, '.mm-q', 0, 0, 1.2, 0.3);
    tl.to('.mm-q', { opacity: 0, duration: 0.3 }, 3.4);
    pop(tl, '.mm-q2', 0, 0, 3.6, 0.3);
    tl.to('.mm-q2', { opacity: 0, duration: 0.2 }, 4.5);
    tl.to('.mm-cat', { keyframes: [{ x: 90, y: -22, duration: 0.45, ease: 'power1.out' }, { x: 118, y: 0, duration: 0.45, ease: 'power1.in' }], duration: 0.9 }, 4.6);
    tl.to('.mm-fish', { y: -4, duration: 0.2, yoyo: true, repeat: 3 }, 5.5);
    pop(tl, '.mm-h0', 0, 0, 5.5, 0.35);
    pop(tl, '.mm-h1', 0, 0, 5.8, 0.35);
    pop(tl, '.mm-spk', 0, 0, 5.5, 0.35);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <Meadow id="mm" ground={62} sun={false} trees={false} />
      <G x={140} y={78}><ellipse rx="15" ry="3.6" fill="#fff" {...st} strokeWidth=".7" /><ellipse rx="10" ry="2" fill="#e8ecf8" /></G>
      <G x={140} y={73}><g className="mm-fish"><G s={0.9}><Fish /></G></g></G>
      <G x={0} y={0}>
        <g className="mm-cat">
          <G x={30} y={78} s={1.3}><g className="mm-bob"><Cat blind /></g></G>
          <G x={44} y={40}><g className="mm-q" opacity="0"><Question s={1.4} /></g></G>
          <G x={44} y={40}><g className="mm-q2" opacity="0"><Exclaim s={1.4} /></g></G>
        </g>
      </G>
      <G x={132} y={44}><g className="mm-h0" opacity="0"><Heart s={1.2} /></g></G>
      <G x={146} y={38}><g className="mm-h1" opacity="0"><Heart s={1} /></g></G>
      <G x={120} y={52}><g className="mm-spk" opacity="0"><Sparkle s={1.8} /></g></G>
    </Svg>
  );
}

/* ===== 18. Mật ngọt chết ruồi: con ruồi bay đến bát mật rồi dính chặt ===== */
export function MatNgot({ running }) {
  const ref = useScene(running, (tl) => {
    tl.set('.mn-ex', { opacity: 0 }, 0);
    tl.fromTo('.mn-fly', { x: 20, y: 22 }, { keyframes: [{ x: 60, y: 14, duration: 0.9 }, { x: 100, y: 28, duration: 0.9 }, { x: 70, y: 40, duration: 0.8 }, { x: 88, y: 50, duration: 0.6 }, { x: 80, y: 55, duration: 0.5 }], duration: 3.7, ease: 'sine.inOut' }, 0.2);
    tl.to('.mn-fly .wing', { rotation: 18, duration: 0.07, yoyo: true, repeat: 60, transformOrigin: '50% 100%' }, 0.2);
    tl.to('.mn-fly', { keyframes: [{ y: 58, duration: 0.8, ease: 'sine.out' }, { y: 60, duration: 2, ease: 'none' }], duration: 2.8 }, 3.9);
    tl.to('.mn-fly', { x: 83, duration: 0.14, yoyo: true, repeat: 17, ease: 'none' }, 4.0);
    tl.fromTo('.mn-rip', { attr: { rx: 2, ry: 0.4 }, opacity: 0.8 }, { attr: { rx: 22, ry: 4.4 }, opacity: 0, duration: 1.2, stagger: 0.5, repeat: 3, ease: 'power1.out' }, 3.9);
    pop(tl, '.mn-ex', 0, 0, 5.2, 0.35);
    tl.fromTo('.mn-drip', { y: 0, opacity: 1 }, { y: 7, opacity: 0.2, duration: 1.2, repeat: 2, ease: 'sine.in' }, 3.6);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <Sky id="mn" a="#fff1d6" b="#ffe3b3" ground={72} gcol="#e9c595" />
      <G x={80} y={64}>
        <ellipse cx="0" cy="-4" rx="28" ry="7" fill="#9a5f2b" {...st} />
        <ellipse cx="0" cy="-4" rx="25" ry="5.6" fill="#f4a521" />
        <path d="M-14 -6 Q-6 -8 2 -7" stroke="#ffe08a" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <ellipse className="mn-rip" cx="0" cy="-2" rx="2" ry=".4" fill="none" stroke="#ffe08a" strokeWidth=".8" opacity="0" />
      </G>
      <g className="mn-fly"><g className="mn-wing-wrap"><G s={1.5}><Fly /></G></g></g>
      <G x={80} y={64}>
        <path d="M-28 -4 Q0 8 28 -4 Q28 20 0 20 Q-28 20 -28 -4Z" fill="#c98a52" {...st} />
        <path d="M-24 4 Q0 12 24 4" stroke="#8a5630" strokeWidth=".8" fill="none" />
        <path d="M-14 -2 Q-12 6 -14 10" stroke="#e8a36a" strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path className="mn-drip" d="M-18 1 V8" stroke="#f4a521" strokeWidth="2.2" strokeLinecap="round" />
      </G>
      <G x={96} y={42}><g className="mn-ex" opacity="0"><Exclaim s={1.6} /></g></G>
    </Svg>
  );
}

/* ===== 19. Cá nằm trên thớt: con cá nằm trên thớt, con dao lơ lửng phía trên ===== */
export function CaThot({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.ct-knife', { y: 3, rotation: 4, duration: 0.7, yoyo: true, repeat: 9, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 0);
    tl.to('.ct-knife', { y: 8, duration: 0.5, yoyo: true, repeat: 1, ease: 'power2.in' }, 3.6);
    tl.to('.ct-fish', { x: 0.9, duration: 0.05, yoyo: true, repeat: 99, ease: 'none' }, 0);
    tl.to('.ct-fish .tail', { rotation: 14, duration: 0.18, yoyo: true, repeat: 39, transformOrigin: '100% 50%' }, 0);
    life(tl, '.ct-sw', { y: 0 }, { y: 9, duration: 0.8, stagger: 0.3, repeat: 5, ease: 'power1.in' }, 0.4);
    pop(tl, '.ct-ex', 0, 0, 1.2, 0.3);
  }, { loop: 7 });
  return (
    <Svg ref={ref}>
      <Sky id="ct" a="#e9f0ff" b="#fff3de" ground={74} gcol="#d6aa7d" />
      <rect y="74" width="160" height="16" fill="#c98a52" /><rect y="74" width="160" height="1.2" fill="#00000022" />
      <G x={80} y={74}>
        <rect x="-38" y="-6" width="76" height="9" rx="2.4" fill="#e8b878" {...st} />
        <rect x="-38" y="-6" width="76" height="3" rx="1.6" fill="#f3d2a0" />
        <path d="M-30 -1 H-8 M6 0 H30" stroke="#c98a52" strokeWidth=".7" />
      </G>
      <G x={80} y={60}><g className="ct-fish"><G s={1.5}><Fish /></G></g></G>
      <G x={80} y={30}><g className="ct-knife"><g transform="rotate(90) scale(0.85)"><Knife shiny /></g></g></G>
      {[0, 1].map((i) => <G key={i} x={92 + i * 8} y={42}><g className="ct-sw" opacity="0"><Sweat s={1} /></g></G>)}
      <G x={58} y={42}><g className="ct-ex" opacity="0"><Exclaim s={1.5} /></g></G>
    </Svg>
  );
}

/* ===== 20. Cá lớn nuốt cá bé: cá vừa nuốt cá nhỏ, rồi cá to nuốt cá vừa ===== */
export function CaLon({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.cl-s', { x: 100, opacity: 1 }, { x: 148, duration: 8, ease: 'none' }, 0);
    tl.to('.cl-s', { opacity: 0, duration: 0.2 }, 2.3);
    tl.fromTo('.cl-m', { x: -30, opacity: 1 }, { keyframes: [{ x: 97, duration: 2.3, ease: 'power1.out' }, { x: 125, duration: 5.7, ease: 'none' }], duration: 8 }, 0);
    tl.fromTo('.cl-mp', { scale: 1 }, { scale: 1.18, duration: 0.3, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, 2.3);
    tl.to('.cl-m', { opacity: 0, duration: 0.2 }, 5.6);
    tl.fromTo('.cl-b', { x: -70 }, { keyframes: [{ x: 96, duration: 3, ease: 'power1.inOut' }, { x: 120, duration: 2.4, ease: 'none' }], duration: 5.4 }, 2.6);
    tl.fromTo('.cl-bp', { scale: 1 }, { scale: 1.1, duration: 0.3, yoyo: true, repeat: 1, transformOrigin: '50% 50%' }, 5.6);
    life(tl, '.cl-bub', { y: 0 }, { y: -16, duration: 1.2, stagger: 0.4, repeat: 5, ease: 'none' }, 0);
    pop(tl, '.cl-spk', 0, 0, 2.3, 0.35);
    pop(tl, '.cl-spk2', 0, 0, 5.6, 0.35);
  }, { loop: 9 });
  return (
    <Svg ref={ref}>
      <defs><linearGradient id="clw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7fd6ff" /><stop offset="1" stopColor="#2b8fd1" /></linearGradient></defs>
      <rect width="160" height="90" fill="url(#clw)" />
      <path d="M0 82 Q40 76 80 82 T160 80 V90 H0Z" fill="#e8d29a" />
      {[[14, 82], [146, 80]].map(([x, y], i) => <path key={i} d={`M${x} ${y} q-3 -9 -1 -16 M${x} ${y} q3 -8 2 -14`} stroke="#3fae6a" strokeWidth="1.8" fill="none" strokeLinecap="round" />)}
      <g className="cl-b"><g className="cl-bp"><G x={0} y={44} s={2.2}><Fish /></G></g></g>
      <g className="cl-m"><g className="cl-mp"><G x={0} y={54} s={1.3}><Fish /></G></g></g>
      <g className="cl-s"><G x={0} y={54} s={0.7}><Fish /></G></g>
      {[[30, 70], [60, 74], [110, 72]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="cl-bub" opacity="0"><circle r={1.2 + i * 0.3} fill="#fff" fillOpacity=".4" stroke="#fff" strokeWidth=".4" /></g></G>)}
      <G x={116} y={46}><g className="cl-spk" opacity="0"><Sparkle s={1.6} /></g></G>
      <G x={126} y={38}><g className="cl-spk2" opacity="0"><Sparkle s={2} /></g></G>
    </Svg>
  );
}
