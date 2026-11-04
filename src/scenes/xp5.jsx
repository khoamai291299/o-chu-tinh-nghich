import { Svg, G, Sky, Cloud, Sparkle, useScene, C, st } from './kit.jsx';
import { Kid, Sweat, Heart } from './kit2.jsx';
import { Meadow, Elephant } from './art.jsx';
import { Drop, TaroLeaf, LeafGood, LeafTorn, Bamboo as BambooP, Shoot as ShootP } from './props.jsx';
import { Rabbit, Turtle, Dog, pop } from './xpkit.jsx';

/* ===== 21. Lên voi xuống chó: lúc đầu ngồi trên con voi cao, về sau chỉ còn cưỡi con chó nhỏ ===== */
export function LenVoi({ running }) {
  const ref = useScene(running, (tl) => {
    tl.set(['.lv-b', '.lv-poof'], { opacity: 0 }, 0);
    tl.to('.lv-a-bob', { y: -1.6, duration: 0.45, yoyo: true, repeat: 7, ease: 'sine.inOut' }, 0);
    tl.to('.lv-a .el-0, .lv-a .el-3', { rotation: 14, duration: 0.45, yoyo: true, repeat: 7, transformOrigin: '50% 0%' }, 0);
    tl.to('.lv-a .el-1, .lv-a .el-2', { rotation: -14, duration: 0.45, yoyo: true, repeat: 7, transformOrigin: '50% 0%' }, 0);
    tl.to('.lva-armL', { rotation: -160, duration: 0.3, transformOrigin: '50% 0%' }, 0.4);
    tl.to('.lva-armR', { rotation: 160, duration: 0.3, transformOrigin: '50% 0%' }, 0.4);
    tl.to('.lv-star', { opacity: 1, duration: 0.2, yoyo: true, repeat: 7 }, 0.6);
    // biến cảnh
    tl.set('.lv-poof', { opacity: 1 }, 3.8);
    tl.fromTo('.lv-poof', { scale: 0.2, svgOrigin: '80 55' }, { scale: 2.6, svgOrigin: '80 55', duration: 0.5, ease: 'power2.out' }, 3.8);
    tl.to('.lv-poof', { opacity: 0, duration: 0.5 }, 4.3);
    tl.set('.lv-a', { opacity: 0 }, 4.0);
    tl.set('.lv-b', { opacity: 1 }, 4.0);
    tl.to('.lv-b-bob', { y: 1.2, duration: 0.35, yoyo: true, repeat: 9, ease: 'sine.inOut' }, 4.0);
    tl.to('.lv-b .tail', { rotation: 20, duration: 0.25, yoyo: true, repeat: 15, transformOrigin: '100% 100%' }, 4.0);
    tl.fromTo('.lv-sw', { y: 0, opacity: 0 }, { y: 7, opacity: 1, duration: 0.7, stagger: 0.3, repeat: 3 }, 4.4);
    tl.to('.lvb-k-head', { rotation: 10, duration: 0.5, yoyo: true, repeat: 5, transformOrigin: '50% 100%' }, 4.4);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <Meadow id="lv" ground={62} sun trees={false} />
      <g className="lv-a">
        <g className="lv-a-bob">
          <G x={80} y={54} s={1.3}><Elephant /></G>
          <G x={78} y={33} s={0.55}><Kid p="lva" shirt="#ffd166" pants="#3b4a7a" hair="#2b2d42" /></G>
        </g>
        {[[52, 20], [108, 22], [80, 12]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="lv-star"><Sparkle s={1.8} /></g></G>)}
      </g>
      <g className="lv-b">
        <g className="lv-b-bob">
          <G x={80} y={78} s={1.7}><Dog /></G>
          <G x={80} y={72} s={0.55}><Kid p="lvb" shirt="#ffd166" pants="#3b4a7a" hair="#2b2d42" /></G>
        </g>
        {[0, 1].map((i) => <G key={i} x={74 + i * 12} y={46}><g className="lv-sw" opacity="0"><Sweat s={1} /></g></G>)}
      </g>
      <circle className="lv-poof" cx="80" cy="55" r="16" fill="#fff" opacity="0" />
    </Svg>
  );
}

/* ===== 22. Nước đổ lá khoai: nước đổ lên lá khoai rồi trượt đi, không thấm giọt nào ===== */
export function NuocDoLaKhoai({ running }) {
  const xs = [-18, 8, -4, 22, -26, 14];
  const ref = useScene(running, (tl) => {
    [0.2, 3.4].forEach((t0) => xs.forEach((x0, i) => {
      const d = x0 < 0 ? -1 : 1;
      tl.fromTo(`.nd-d${i}`, { x: 80 + x0, y: 20, opacity: 1 }, { keyframes: [{ y: 46, duration: 0.7, ease: 'power1.in' }, { x: 80 + d * 44, y: 54, duration: 0.9, ease: 'sine.in' }, { y: 84, opacity: 0, duration: 0.6, ease: 'power1.in' }], duration: 2.2 }, t0 + i * 0.5);
    }));
    tl.to('.nd-leaf', { rotation: 2.2, duration: 0.3, yoyo: true, repeat: 17, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0.8);
    tl.fromTo('.nd-spk', { opacity: 0 }, { opacity: 1, duration: 0.4, yoyo: true, repeat: 5, stagger: 0.5 }, 1);
    tl.to('.nd-rain', { y: 6, duration: 0.3, yoyo: true, repeat: 20, ease: 'none' }, 0);
  }, { loop: 7 });
  return (
    <Svg ref={ref}>
      <Sky id="nd" a="#9aa9c9" b="#dfe7f5" ground={74} gcol="#8fbf8a" />
      <G x={80} y={14}><g className="nd-rain"><Cloud w={1.8} /></g></G>
      <G x={80} y={54}><g className="nd-leaf"><G s={1.6}><TaroLeaf /></G></g></G>
      {xs.map((_, i) => <g key={i} className={`nd-d${i}`}><Drop s={0.9} /></g>)}
      {[[62, 44], [96, 46], [80, 40]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="nd-spk" opacity="0"><Sparkle s={1.4} fill="#fff" /></g></G>)}
    </Svg>
  );
}

/* ===== 23. Lá lành đùm lá rách: chiếc lá lành che chở cho chiếc lá rách bên cạnh ===== */
export function LaLanh({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.ll-a', { y: 8, opacity: 1 }, { y: 42, opacity: 0.2, duration: 0.6, stagger: 0.2, repeat: 3, ease: 'power1.in' }, 0.3);
    tl.to('.ll-torn', { rotation: 6, duration: 0.15, yoyo: true, repeat: 7, transformOrigin: '50% 0%' }, 0.8);
    tl.to('.ll-good', { x: 52, y: -4, rotation: 18, duration: 1, ease: 'sine.inOut' }, 3);
    tl.fromTo('.ll-b', { y: 8, opacity: 1 }, { y: 28, opacity: 0.2, duration: 0.5, stagger: 0.18, repeat: 5, ease: 'power1.in' }, 4.2);
    tl.fromTo('.ll-free', { y: 8, opacity: 1 }, { y: 82, opacity: 0.4, duration: 1.4, stagger: 0.35, repeat: 5, ease: 'none' }, 0);
    pop(tl, '.ll-h0', 0, 0, 5.2, 0.4);
    pop(tl, '.ll-h1', 0, 0, 5.8, 0.4);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <Sky id="ll" a="#a5b4cf" b="#dce8f0" ground={78} gcol="#7fb98a" />
      <path d="M-4 20 C40 14 90 30 164 22" fill="none" stroke="#7a4a28" strokeWidth="5" strokeLinecap="round" />
      <path d="M56 20 V30 M108 24 V40" stroke="#7a4a28" strokeWidth="2" />
      <G x={108} y={50}><g className="ll-torn"><G r={-8}><LeafTorn /></G></g></G>
      <G x={56} y={40}><g className="ll-good"><G r={-10}><LeafGood /></G></g></G>
      {[98, 108, 118].map((x, i) => <G key={x} x={x} y={0}><g className="ll-a"><Drop s={0.8} /></g></G>)}
      {[100, 110, 120].map((x, i) => <G key={x} x={x} y={0}><g className="ll-b" opacity="0"><Drop s={0.8} /></g></G>)}
      {[14, 34, 140, 152].map((x, i) => <G key={x} x={x} y={0}><g className="ll-free"><Drop s={0.8} /></g></G>)}
      <G x={106} y={26}><g className="ll-h0" opacity="0"><Heart s={1.3} /></g></G>
      <G x={122} y={22}><g className="ll-h1" opacity="0"><Heart s={1} /></g></G>
    </Svg>
  );
}

/* ===== 24. Chậm như rùa: thỏ chạy vụt qua, con rùa vẫn bò từng bước nhỏ ===== */
export function ChamRua({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.cr-rabbit', { x: -30 }, { x: 190, duration: 1.5, ease: 'power1.in' }, 0.4);
    tl.to('.cr-rabbit-j', { y: -7, duration: 0.18, yoyo: true, repeat: 7, ease: 'sine.out' }, 0.4);
    tl.fromTo('.cr-dust', { x: 0, opacity: 0.9 }, { x: -16, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'power1.out' }, 0.8);
    tl.fromTo('.cr-turtle', { x: 20 }, { x: 108, duration: 7, ease: 'none' }, 0.4);
    tl.to('.cr-turtle .tl', { y: -1.2, duration: 0.5, yoyo: true, repeat: 13, ease: 'sine.inOut' }, 0.4);
    tl.to('.cr-turtle .thead', { x: 1.2, duration: 0.6, yoyo: true, repeat: 11, ease: 'sine.inOut' }, 0.4);
    tl.to('.cr-flag', { rotation: 6, duration: 0.5, yoyo: true, repeat: 15, transformOrigin: '0% 50%' }, 0);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <Meadow id="cr" ground={62} sun trees={false} />
      <G x={146} y={74}>
        <rect x="-.8" y="-34" width="1.6" height="34" fill="#8a5630" />
        <g className="cr-flag"><path d="M.8 -34 L16 -29 L.8 -24Z" fill={C.red} {...st} strokeWidth=".6" /></g>
      </G>
      <G x={0} y={0}>
        <g className="cr-turtle"><G x={0} y={80} s={1.5}><Turtle /></G></g>
      </G>
      <g className="cr-rabbit"><G x={0} y={74} s={1.3}><g className="cr-rabbit-j"><Rabbit /></g></G></g>
      {[[28, 74], [34, 70], [24, 78]].map(([x, y], i) => <G key={i} x={x} y={y}><circle className="cr-dust" r="3" fill="#fff" opacity="0" /></G>)}
    </Svg>
  );
}

/* ===== 25. Tre già măng mọc: cây tre già đứng cạnh, những búp măng non mọc lên và lớn dần ===== */
export function TreGia({ running }) {
  const young = [[74, 34], [96, 44], [118, 28]];
  const ref = useScene(running, (tl) => {
    tl.to('.tg-old', { rotation: 1.8, duration: 1.4, yoyo: true, repeat: 5, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 0);
    young.forEach(([x], i) => {
      tl.fromTo(`.tg-y${i}`, { scaleY: 0.12, svgOrigin: '0 0' }, { scaleY: 1, svgOrigin: '0 0', duration: 3.4, ease: 'sine.out' }, 0.6 + i * 0.7);
      tl.to(`.tg-s${i}`, { opacity: 0, duration: 0.8 }, 1.2 + i * 0.7);
      tl.to(`.tg-y${i}`, { rotation: 2.4, duration: 1.2, yoyo: true, repeat: 3, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 4.6);
    });
    tl.fromTo('.tg-spk', { opacity: 0 }, { opacity: 1, duration: 0.4, yoyo: true, repeat: 3, stagger: 0.5 }, 4.2);
  }, { loop: 8 });
  return (
    <Svg ref={ref}>
      <Meadow id="tg" ground={64} sun trees={false} />
      <G x={36} y={84}><g className="tg-old"><BambooP h={64} color="#c8b25a" dark="#8a7a30" leaves="#9bb25a" /></g></G>
      {young.map(([x, h], i) => (
        <G key={x} x={x} y={84}>
          <g className={`tg-s${i}`}><G s={1.3}><ShootP /></G></g>
          <g className={`tg-y${i}`}><BambooP h={h} /></g>
        </G>
      ))}
      {[[64, 18], [92, 28], [126, 14]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="tg-spk" opacity="0"><Sparkle s={1.8} /></g></G>)}
    </Svg>
  );
}
