import { Svg, G, Sky, Cloud, Sparkle, Ant, Tree, Bee, Frog, useScene, C, INK, st } from './kit.jsx';
import { Kid, Bubble, Question, Sweat, Heart, walkCycle, mouth } from './kit2.jsx';
import { Meadow } from './art.jsx';
import { Rabbit, pop } from './xpkit.jsx';

/* Cảnh chế độ Xung phong: mỗi cảnh là một vòng chuyển động ngắn, rõ nghĩa ngay, tự lặp (xem useScene, opts.loop). */

/* ===== 1. Cầu kiến: đàn kiến nối thành cầu qua khe nước, một con kiến chở thức ăn đi qua ===== */
export function CauKien({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.ck-in', { y: -34, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out', stagger: 0.4 }, 0.3);
    tl.to('.ck-in', { y: -1.4, duration: 0.3, yoyo: true, repeat: 3, stagger: 0.08, ease: 'sine.inOut' }, 2.6);
    tl.fromTo('.ck-carry', { x: 0, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4 }, 2.2);
    tl.to('.ck-carry', { x: 122, duration: 4.6, ease: 'none' }, 2.6);
    tl.to('.ck-carry', { opacity: 0, duration: 0.4 }, 7.2);
    tl.to('.ck-wave', { x: -16, duration: 1.2, repeat: 6, ease: 'none' }, 0);
    pop(tl, '.ck-star', 0, 0, 6.8);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <Sky id="ck" ground={62} />
      <G x={30} y={16}><Cloud w={1} /></G>
      <G x={120} y={22}><Cloud w={0.8} /></G>
      <G x={14} y={55}><Tree /></G>
      <G x={148} y={56}><Tree /></G>
      <rect x="49" y="62" width="58" height="28" fill="#3aa0ff" />
      <g className="ck-wave"><path d="M40 63 Q47 60 54 63 T68 63 T82 63 T96 63 T110 63 T124 63 V68 H40Z" fill="#7cc4ff" /></g>
      <rect x="0" y="62" width="50" height="28" fill="#8fcf86" /><rect x="106" y="62" width="54" height="28" fill="#8fcf86" />
      {[55, 69.5, 84, 98.5].map((x) => (
        <G key={x} x={x} y={58.2}><g className="ck-in"><G s={0.72}><Ant /></G></g></G>
      ))}
      <G x={14} y={52.6}>
        <g className="ck-carry" opacity="0">
          <G s={0.62}><Ant /></G>
          <circle cx="3" cy="-5" r="3.4" fill={C.cream} {...st} strokeWidth=".6" />
        </g>
      </G>
      <G x={138} y={50}><g className="ck-star" opacity="0"><Sparkle s={2.2} /></g></G>
    </Svg>
  );
}

/* ===== 2. Đẽo cày giữa đường: mỗi người qua đường góp ý một kiểu, cái cày biến dạng theo ===== */
export function DeoCay({ running }) {
  const ref = useScene(running, (tl) => {
    tl.set(['.dc-f1', '.dc-f2', '.dc-b1', '.dc-b2', '.dc-q', '.dc-p2'], { opacity: 0 }, 0);
    // người qua đường thứ nhất
    tl.fromTo('.dc-p1', { x: 60 }, { x: 0, duration: 1.2, ease: 'none' }, 0.2);
    walkCycle(tl, 'p1', 0.2, 1.2);
    pop(tl, '.dc-b1', -6, 12, 1.5, 0.35);
    tl.to('.dc-f0', { opacity: 0, duration: 0.4 }, 2.6);
    tl.to('.dc-f1', { opacity: 1, duration: 0.4 }, 2.6);
    tl.to('.dc-b1', { opacity: 0, duration: 0.3 }, 3.2);
    tl.to('.dc-p1', { x: -70, duration: 1.2, ease: 'none' }, 3.3);
    // người thứ hai
    tl.set('.dc-p2', { opacity: 1 }, 3.5);
    tl.fromTo('.dc-p2', { x: 60 }, { x: 0, duration: 1.2, ease: 'none' }, 3.5);
    walkCycle(tl, 'p2', 3.5, 1.2);
    pop(tl, '.dc-b2', -6, 12, 4.8, 0.35);
    tl.to('.dc-f1', { opacity: 0, duration: 0.4 }, 5.8);
    tl.to('.dc-f2', { opacity: 1, duration: 0.4 }, 5.8);
    // người đẽo ngơ ngác
    pop(tl, '.dc-q', 0, 4, 6.4);
    tl.to('.dc-k-head', { rotation: -8, duration: 0.3, yoyo: true, repeat: 5, transformOrigin: '50% 100%' }, 6.4);
    tl.to('.dc-hammer', { rotation: -28, duration: 0.25, yoyo: true, repeat: 5, ease: 'power2.in', transformOrigin: '50% 100%' }, 0.2);
  }, { loop: 8.5 });
  return (
    <Svg ref={ref}>
      <Sky id="dc" ground={60} gcol="#c9d98f" />
      <rect y="68" width="160" height="14" fill="#d8b98a" /><rect y="68" width="160" height="1" fill="#00000018" />
      <G x={14} y={52}><Tree /></G>
      <G x={44} y={78}><Kid p="dc-k" shirt="#7a4a28" pants="#4a3a45" hair="#2b2d42" /></G>
      <G x={62} y={74}>
        <g className="dc-hammer"><rect x="-1" y="-14" width="2" height="14" fill="#8a5630" /><rect x="-4" y="-17" width="8" height="5" rx="1" fill="#8d99ae" {...st} strokeWidth=".6" /></g>
      </G>
      <G x={84} y={76}>
        <g className="dc-f0"><rect x="-14" y="-8" width="28" height="8" rx="3" fill="#a0643c" {...st} /><ellipse cx="14" cy="-4" rx="2" ry="4" fill="#c98a52" {...st} strokeWidth=".5" /></g>
        <g className="dc-f1"><rect x="-14" y="-7" width="28" height="7" rx="3" fill="#a0643c" {...st} /><path d="M10 -7 C14 -16 14 -22 18 -26" stroke="#8a5630" strokeWidth="3.4" fill="none" strokeLinecap="round" /><path d="M-14 0 L-20 7 L-10 0Z" fill="#8d99ae" {...st} strokeWidth=".6" /></g>
        <g className="dc-f2"><path d="M-14 0 H14 L10 -5 H-10Z" fill="#a0643c" {...st} /><path d="M-6 -5 L-12 -24 M0 -5 V-30 M6 -5 L12 -24" stroke="#8a5630" strokeWidth="3" fill="none" strokeLinecap="round" /></g>
      </G>
      <G x={112} y={78}><g className="dc-p1"><Kid p="p1" shirt="#ef476f" pants="#3b4a7a" hair="#3a2e39" /></g></G>
      <G x={112} y={78}><g className="dc-p2"><Kid p="p2" shirt="#2fd6a0" pants="#4a3a45" hair="#a0643c" girl /></g></G>
      <G x={104} y={24}>
        <g className="dc-b1"><Bubble w={26} h={16} tail="left" /><G y={-1}><path d="M-6 3 V-3 M-9 -1 L-6 -4 L-3 -1" stroke={C.red} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" /><path d="M2 3 H9 M5.5 3 V-4" stroke="#8a5630" strokeWidth="2" fill="none" strokeLinecap="round" /></G></g>
      </G>
      <G x={106} y={24}>
        <g className="dc-b2"><Bubble w={26} h={16} tail="left" /><G y={-1}><path d="M-8 -3 H8 M-8 3 H8" stroke="#2f9e6a" strokeWidth="1.6" fill="none" strokeLinecap="round" /><path d="M-4 -6 V6 M4 -6 V6" stroke="#2f9e6a" strokeWidth="1.2" fill="none" /></G></g>
      </G>
      <G x={46} y={36}><g className="dc-q"><Question s={1.5} /></g></G>
    </Svg>
  );
}

/* ===== 3. Đường mật: lời nói ngọt ngào, đường và mật ong chảy ra từ miệng ===== */
export function DuongMat({ running }) {
  const ref = useScene(running, (tl) => {
    tl.set(['.dm-cube', '.dm-pot', '.dm-drop', '.dm-heart'], { opacity: 0 }, 0);
    pop(tl, '.dm-bub', -4, 36, 0.4, 0.5);
    tl.to('.dm-k-head', { rotation: 4, duration: 0.5, yoyo: true, repeat: 9, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0.4);
    ['O', 'S', 'O', 'S', 'O', 'S', 'O', 'S'].forEach((m, i) => mouth(tl, 'dm-k', m, 0.5 + i * 0.7));
    tl.fromTo('.dm-cube', { y: -14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'bounce.out', stagger: 0.35 }, 1.2);
    tl.fromTo('.dm-pot', { y: -6, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)' }, 1.6);
    ['.dm-drop-a', '.dm-drop-b', '.dm-drop-c'].forEach((d, i) => tl.fromTo(d, { y: 0, opacity: 1 }, { y: 14, opacity: 0, duration: 0.9, ease: 'power1.in' }, 2.3 + i * 0.9));
    tl.fromTo('.dm-heart', { y: 4, opacity: 0 }, { y: -10, opacity: 1, duration: 0.8, stagger: 0.4 }, 3.4);
    tl.to('.dm-bee', { keyframes: [{ x: 14, y: -8 }, { x: 4, y: -14 }, { x: -10, y: -4 }, { x: 8, y: 6 }, { x: 0, y: 0 }], duration: 4.4, ease: 'sine.inOut' }, 1.2);
  }, { loop: 7 });
  return (
    <Svg ref={ref}>
      <Sky id="dm" a="#ffe1ec" b="#fff6ea" ground={68} gcol="#ffd9a8" />
      <G x={38} y={78}><Kid p="dm-k" shirt="#ff8fab" pants="#7a4a28" hair="#2b2d42" /></G>
      <G x={96} y={36}>
        <g className="dm-bub">
          <G x={14} y={10}><Bubble w={74} h={46} tail="left" /></G>
          <G x={0} y={10}>
            {[[0, 14], [10, 14], [20, 14], [5, 6], [15, 6]].map(([x, y], i) => (
              <g key={i} className="dm-cube" transform={`translate(${x} ${y})`}><rect x="-4.4" y="-4.4" width="8.8" height="8.8" rx="1.6" fill="#fff" {...st} strokeWidth=".6" /><path d="M-2.6 -2.6 H0" stroke="#bfe6ff" strokeWidth="1" strokeLinecap="round" /></g>
            ))}
            <g transform="translate(32 -14)"><g className="dm-pot">
              <path d="M-7 0 Q-9 9 -4 11 H4 Q9 9 7 0 Z" fill="#f4a521" {...st} strokeWidth=".6" />
              <rect x="-8" y="-3" width="16" height="3.4" rx="1.6" fill="#c97a12" {...st} strokeWidth=".6" />
              <path d="M-4 3 Q-4 6 -2 7" stroke="#fff6c8" strokeWidth="1" strokeLinecap="round" fill="none" />
            </g>
            </g>
            {[[29, 'a'], [32, 'b'], [35, 'c']].map(([x, k]) => (
              <g key={k} transform={`translate(${x} -2)`}><path className={`dm-drop dm-drop-${k}`} d="M0 -2.4 Q2.6 1.4 0 3 Q-2.6 1.4 0 -2.4Z" fill="#f4a521" {...st} strokeWidth=".5" /></g>
            ))}
            {[6, 22].map((x, i) => <g key={i} transform={`translate(${x} -4)`}><g className="dm-heart"><Heart s={0.8} /></g></g>)}
          </G>
        </g>
      </G>
      <G x={84} y={22}><g className="dm-bee"><g className="dm-bee-w"><G s={0.8}><Bee /></G></g></g></G>
    </Svg>
  );
}

/* ===== 4. Ếch ngồi đáy giếng: chỉ thấy một khoảng trời tròn bé xíu ===== */
export function EchGieng({ running }) {
  const ref = useScene(running, (tl) => {
    tl.to('.eg-cloud', { x: 40, duration: 6.4, ease: 'none' }, 0);
    tl.fromTo('.eg-bird', { x: 0, y: 0 }, { x: 34, y: -6, duration: 3, ease: 'none' }, 1.2);
    tl.to('.eg-frog', { y: -2, duration: 0.45, yoyo: true, repeat: 13, ease: 'sine.inOut' }, 0);
    pop(tl, '.eg-bub', 8, 4, 4.2, 0.45);
    tl.to('.eg-bub', { opacity: 0, duration: 0.4 }, 6.3);
  }, { loop: 7 });
  return (
    <Svg ref={ref}>
      <rect width="160" height="90" fill="#3b3550" />
      <defs>
        <clipPath id="egc"><circle cx="80" cy="26" r="17" /></clipPath>
        <linearGradient id="egs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6fc3ff" /><stop offset="1" stopColor="#d4f0ff" /></linearGradient>
      </defs>
      <g stroke="#2a2640" strokeWidth=".8" opacity=".55">{[10, 24, 38, 52, 66, 80].map((y) => <path key={y} d={`M0 ${y} H160`} />)}{[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} d={`M${i * 22 + 8} 0 V90`} />)}</g>
      <circle cx="80" cy="26" r="19" fill="#2a2640" />
      <g clipPath="url(#egc)">
        <rect x="60" y="6" width="40" height="40" fill="url(#egs)" />
        <g className="eg-cloud"><G x={52} y={22}><Cloud w={0.9} /></G></g>
        <g className="eg-bird"><G x={64} y={34}><path d="M-4 0 Q-2 -3 0 0 Q2 -3 4 0" stroke={INK} strokeWidth=".9" fill="none" strokeLinecap="round" /></G></g>
      </g>
      <circle cx="80" cy="26" r="17" fill="none" stroke="#8a7f9c" strokeWidth="2" />
      <rect y="68" width="160" height="22" fill="#54706e" opacity=".8" />
      <g className="eg-frog"><G x={80} y={72} s={1.35}><Frog up /></G></g>
      <G x={104} y={56}>
        <g className="eg-bub"><G x={18} y={-6}><Bubble w={34} h={22} tail="left" /></G><G x={18} y={-6}><circle r="7" fill="#9fd8ff" {...st} strokeWidth=".6" /><G x={-1.5} y={-1}><Cloud w={0.34} /></G></G></g>
      </G>
    </Svg>
  );
}

/* ===== 5. Ôm cây đợi thỏ: ngồi bên gốc cây chờ thỏ, ruộng cỏ mọc um tùm ===== */
export function OmCay({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.oc-rabbit', { x: 0 }, { x: 190, duration: 2.6, ease: 'none' }, 0.6);
    tl.to('.oc-rabbit-j', { y: -6, duration: 0.2, yoyo: true, repeat: 11, ease: 'sine.out' }, 0.6);
    pop(tl, '.oc-q', 0, 4, 3.4, 0.35);
    tl.to('.oc-q', { opacity: 0, duration: 0.3 }, 5.4);
    [22, 38, 118, 136, 148].forEach((x, i) => tl.fromTo(`.oc-g${i}`, { scaleY: 0.2, svgOrigin: '0 0' }, { scaleY: 1, svgOrigin: '0 0', duration: 3.6, ease: 'sine.out' }, 2.4 + i * 0.25));
    tl.to('.oc-k-head', { rotation: 8, duration: 0.8, yoyo: true, repeat: 7, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 3.4);
    tl.fromTo('.oc-sweat', { y: 0, opacity: 0 }, { y: 6, opacity: 1, duration: 0.8, repeat: 3, stagger: 0.3 }, 3.6);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <Meadow id="oc" ground={62} sun={false} trees={false} />
      <G x={62} y={60}><Tree /></G>
      <G x={88} y={76}><Kid p="oc-k" shirt="#ffd166" pants="#7a4a28" hair="#2b2d42" /></G>
      <G x={92} y={28}><g className="oc-q"><Question s={1.4} /></g></G>
      <G x={100} y={40}><g className="oc-sweat" opacity="0"><Sweat s={0.9} /></g></G>
      {[22, 38, 118, 136, 148].map((x, i) => (
        <G key={x} x={x} y={80 + (i % 2) * 3}><g className={`oc-g${i}`}><path d="M0 0 Q-3 -8 -6 -12 M0 0 Q0 -10 1 -15 M0 0 Q3 -8 6 -12" stroke="#3f9a55" strokeWidth="1.6" fill="none" strokeLinecap="round" /></g></G>
      ))}
      <G x={-30} y={70}><g className="oc-rabbit"><g className="oc-rabbit-j"><Rabbit /></g></g></G>
    </Svg>
  );
}
