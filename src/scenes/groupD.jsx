import gsap from 'gsap';
import { Svg, G, Sky, Cloud, Sun, Sparkle, Tree, useScene, C, INK, st } from './kit.jsx';
import { Kid, Room, Desk, BookOpen, BookClosed, Trophy, Star, Heart, Sweat, Question, Bubble, Bulb, walkCycle, mouth } from './kit2.jsx';
import { Bowl, Spoon, Drop, LeafGood, LeafTorn } from './props.jsx';

const Pv = ({ cx = 0, cy = 0 }) => <rect x={cx - 70} y={cy - 70} width="140" height="140" fill="none" stroke="none" />; // đặt tâm hộp bao tại điểm xoay (GSAP xoay quanh tâm hộp bao)
const TXT = { fontFamily: "'Baloo 2',sans-serif", fontWeight: 800, textAnchor: 'middle', dominantBaseline: 'central' };

/* ===== Không thầy đố mày làm nên ===== */
export function KhongThay({ running }) {
  const ref = useScene(running, (tl) => {
    gsap.set('.pvt', { transformOrigin: '50% 50%' });
    // 0-5 giây: thầy bị cấm, học trò xếp khối lung tung rồi đổ
    tl.fromTo('.ban', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)' }, 0.5);
    tl.to('.teacher', { opacity: 0.22, duration: 0.5 }, 0.9);
    tl.fromTo('.blk', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'bounce.out', stagger: 0.35 }, 0.7);
    tl.to('.s1-head', { rotation: -8, duration: 0.5, yoyo: true, repeat: 5, ease: 'sine.inOut', transformOrigin: '50% 100%' }, 1.2);
    tl.fromTo('.qm', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)', stagger: 0.5 }, 2);
    tl.to('.tower', { x: 1.2, duration: 0.08, yoyo: true, repeat: 7 }, 3.1);
    [[-9, 9, -70], [8, 6, 55], [-12, 4, -40], [10, 2, 85]].forEach(([dx, dy, r], i) => {
      tl.to(`.blk${i}`, { x: dx * 1.6, y: dy, rotation: r, duration: 0.6, ease: 'power2.in' }, 3.8 + i * 0.1);
    });
    // 5 giây: thầy quay lại, cùng học trò xây nhà
    tl.to('.ban', { scale: 0, opacity: 0, duration: 0.3 }, 5.4);
    tl.to('.qm', { opacity: 0, duration: 0.2 }, 5.4);
    tl.to('.teacher', { opacity: 1, duration: 0.5 }, 5.5);
    tl.to('.tower', { opacity: 0, duration: 0.4 }, 6);
    tl.to('.t1-armL', { rotation: 100, duration: 0.5, ease: 'back.out(2)', transformOrigin: '50% 0%' }, 6);
    tl.fromTo('.wall', { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: 'power1.out' }, 6.4);
    tl.fromTo('.roof', { y: -26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'bounce.out' }, 7.8);
    tl.fromTo('.door,.win', { scale: 0 }, { scale: 1, duration: 0.4, ease: 'back.out(2.4)', stagger: 0.2 }, 8.5);
    tl.to('.s1-armR', { rotation: -150, duration: 0.4, transformOrigin: '50% 0%' }, 8.8);
    tl.to('.s1-armR', { rotation: -120, duration: 0.25, yoyo: true, repeat: 5, transformOrigin: '50% 0%' }, 9.2);
    mouth(tl, 's1', 'S', 8.8);
    tl.fromTo('.bulb1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)' }, 9);
    tl.fromTo('.sp1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.15 }, 9.4);
  });
  return (
    <Svg ref={ref}>
      <Room board />
      <G x={14} y={10}>
        <text x="29" y="15" {...TXT} fontSize="9" fill="#fff" opacity=".9">A  B  C</text>
      </G>
      <G x={36} y={80}>
        <Kid p="s1" shirt="#4f8cff" />
        <G x={-4} y={-50}><g className="qm pvt" opacity="0"><Pv /><Question s={0.8} /></g></G>
        <G x={7} y={-49}><g className="qm pvt" opacity="0"><Pv /><Question s={0.65} /></g></G>
        <G x={0} y={-50}><g className="bulb1 pvt" opacity="0"><Pv /><Bulb s={0.75} /></g></G>
      </G>
      <G x={78} y={79}>
        <g className="tower pvt"><Pv />
          {[0, 1, 2, 3].map((i) => (
            <G key={i} x={(i % 2 ? 2 : -2)} y={-i * 6.4 - 3.2}>
              <g className={`blk blk${i} pvt`} opacity="0"><Pv /><rect x="-6" y="-3.2" width="12" height="6.4" rx=".8" fill={['#ef476f', '#ffd166', '#4cc9f0', '#4cc38a'][i]} {...st} strokeWidth=".7" /></g>
            </G>
          ))}
        </g>
        <g className="house">
          <G y={0}>
            <g className="wall pvt"><Pv /><rect x="-17" y="-22" width="34" height="22" fill="#fff4d6" {...st} strokeWidth=".8" /></g>
          </G>
          <g className="roof pvt" opacity="0"><Pv /><path d="M-21 -22 L0 -39 L21 -22Z" fill="#ef476f" {...st} strokeWidth=".8" /></g>
          <G x={-6} y={0}><g className="door pvt"><Pv /><path d="M-4 0 V-12 a4 4 0 0 1 8 0 V0Z" fill="#a0643c" {...st} strokeWidth=".7" /></g></G>
          <G x={8} y={-14}><g className="win pvt"><Pv /><rect x="-4" y="-4" width="8" height="8" rx="1" fill="#bfe6ff" {...st} strokeWidth=".7" /><path d="M0 -4V4M-4 0H4" stroke={INK} strokeWidth=".5" /></g></G>
        </g>
      </G>
      {[[62, 46], [96, 40], [84, 30]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp1 pvt" opacity="0"><Pv /><Sparkle s={1.2} /></g></G>)}
      <G x={124} y={80}>
        <g className="teacher">
          <Kid p="t1" shirt="#a0643c" pants="#4a4a5e" hair="#b8bdd2" glasses />
        </g>
      </G>
      <G x={126} y={43} s={1.05}>
        <g className="ban pvt" opacity="0"><Pv />
          <circle r="11" fill="#ef476f" fillOpacity=".15" stroke="#ef476f" strokeWidth="2.6" />
          <path d="M-8 -8 L8 8" stroke="#ef476f" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      </G>
    </Svg>
  );
}

/* ===== Tiên học lễ, hậu học văn ===== */
const Fairy = () => (
  <g {...st} strokeWidth=".6">
    <g className="fw pvt"><Pv /><ellipse cx="-5" cy="-5" rx="5" ry="3.2" fill="#c4f1ff" transform="rotate(-30 -5 -5)" /><ellipse cx="5" cy="-5" rx="5" ry="3.2" fill="#c4f1ff" transform="rotate(30 5 -5)" /></g>
    <path d="M-4 0 L4 0 L6 9 L-6 9Z" fill="#ff8fab" />
    <circle cy="-4" r="3.6" fill="#ffd9b8" />
    <path d="M-3.8 -5 C-4 -9 4 -9 3.8 -5 C1 -7 -1 -7 -3.8 -5Z" fill="#f4a521" strokeWidth=".4" />
    <g className="wand"><path d="M4 3 L12 -6" stroke="#a0643c" strokeWidth="1" /><path d="M12 -9 L13 -7 L15.2 -6.5 L13.3 -5.2 L13.8 -3 L12 -4.2 L10.2 -3 L10.7 -5.2 L8.8 -6.5 L11 -7Z" fill="#ffd166" strokeWidth=".4" /></g>
  </g>
);

export function TienHocLe({ running }) {
  const ref = useScene(running, (tl) => {
    gsap.set('.pvt', { transformOrigin: '50% 50%' });
    // tiên bay tới
    tl.fromTo('.fairy', { x: -30, y: 0 }, { x: 0, y: 0, duration: 1.6, ease: 'power2.out' }, 0.3);
    tl.to('.fairy-b', { y: -3, duration: 0.45, yoyo: true, repeat: 11, ease: 'sine.inOut' }, 0.3);
    tl.to('.fw', { scaleY: 0.5, duration: 0.14, yoyo: true, repeat: 40 }, 0.3);
    tl.fromTo('.spk', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2.4)', stagger: 0.18 }, 2);
    tl.to('.fairy', { x: 70, y: -6, duration: 1.4, ease: 'power1.inOut' }, 4.4);
    tl.to('.fairy', { opacity: 0, duration: 0.4 }, 5.6);
    // 1: cúi chào thầy
    tl.fromTo('.n1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)' }, 5.8);
    tl.to('.stud', { rotation: 38, duration: 0.9, ease: 'power2.inOut' }, 6);
    tl.fromTo('.hi', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2.4)' }, 6.3);
    tl.fromTo('.heart3', { scale: 0, y: 4, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(3)' }, 7.1);
    tl.to('.stud', { rotation: 0, duration: 0.7, ease: 'power2.inOut' }, 8);
    tl.to('.hi', { opacity: 0, duration: 0.3 }, 8.2);
    // 2: ngồi học bài
    tl.fromTo('.n2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)' }, 9);
    tl.fromTo('.desk3', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'back.out(1.6)' }, 9);
    tl.fromTo('.book3', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, ease: 'back.out(2)' }, 9.6);
    tl.fromTo('.bulb3', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)' }, 10.4);
    tl.to('.bulb3', { scale: 1.2, duration: 0.5, yoyo: true, repeat: 3 }, 11);
  });
  return (
    <Svg ref={ref}>
      <Room win />
      <G x={46} y={80}>
        <g className="stud pvt"><Pv /><Kid p="s3" shirt="#34d399" /></g>
        <G x={0} y={-49}><g className="bulb3 pvt" opacity="0"><Pv /><Bulb s={0.8} /></g></G>
      </G>
      <G x={46} y={73}><g className="desk3" opacity="0"><Desk w={34} h={9} /><G y={0}><g className="book3 pvt" opacity="0"><Pv /><G y={-3}><BookOpen s={0.9} /></G></g></G></g></G>
      <G x={120} y={80}>
        <Kid p="t3" shirt="#a0643c" pants="#4a4a5e" hair="#b8bdd2" glasses />
        <G x={12} y={-44}><g className="hi pvt" opacity="0"><Pv /><Bubble w={34} h={13} tail="left" /><text y=".4" {...TXT} fontSize="5.4" fill={INK}>Chào thầy ạ</text></g></G>
        <G x={-1} y={-52}><g className="heart3 pvt" opacity="0"><Pv /><Heart s={1.5} /></g></G>
      </G>
      <G x={70} y={30}><g className="fairy"><g className="fairy-b"><Fairy /></g></g></G>
      {[[90, 38], [100, 26], [80, 22]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="spk pvt" opacity="0"><Pv /><Sparkle s={1.2} /></g></G>)}
      <G x={10} y={12}><g className="n1 pvt" opacity="0"><Pv /><circle r="6" fill="#ff8fab" {...st} /><text {...TXT} fontSize="8" fill="#fff">1</text></g></G>
      <G x={26} y={12}><g className="n2 pvt" opacity="0"><Pv /><circle r="6" fill="#4f8cff" {...st} /><text {...TXT} fontSize="8" fill="#fff">2</text></g></G>
    </Svg>
  );
}

/* ===== Một chữ cũng là thầy, nửa chữ cũng là thầy ===== */
const Card = ({ id }) => (
  <g>
    <clipPath id={`${id}L`}><rect x="-20" y="-20" width="20" height="40" /></clipPath>
    <clipPath id={`${id}R`}><rect x="0" y="-20" width="20" height="40" /></clipPath>
  </g>
);
const Scissors = () => (
  <g {...st} strokeWidth=".6">
    <g className="bl1 pvt"><Pv /><path d="M0 0 L-3 -14 L1 -14Z" fill="#cbd5ff" /><circle cx="2.6" cy="6" r="2.6" fill="none" stroke="#ef476f" strokeWidth="1.2" /></g>
    <g className="bl2 pvt"><Pv /><path d="M0 0 L3 -14 L-1 -14Z" fill="#cbd5ff" /><circle cx="-2.6" cy="6" r="2.6" fill="none" stroke="#ef476f" strokeWidth="1.2" /></g>
  </g>
);

export function MotChu({ running }) {
  const ref = useScene(running, (tl) => {
    gsap.set('.pvt', { transformOrigin: '50% 50%' });
    // một chữ
    tl.fromTo('.cardA', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'bounce.out' }, 0.4);
    tl.fromTo('.tA', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)' }, 1.3);
    tl.to('.stu', { rotation: -30, duration: 0.8, ease: 'power2.inOut' }, 2.1);
    tl.to('.stu', { rotation: 0, duration: 0.6, ease: 'power2.inOut' }, 3.6);
    tl.fromTo('.heartA', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)' }, 2.4);
    // nửa chữ
    tl.fromTo('.cardB', { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'bounce.out' }, 4.6);
    tl.fromTo('.scis', { y: -26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 5.6);
    tl.to('.bl1', { rotation: -16, duration: 0.18, yoyo: true, repeat: 5 }, 6.2);
    tl.to('.bl2', { rotation: 16, duration: 0.18, yoyo: true, repeat: 5 }, 6.2);
    tl.to('.scis', { opacity: 0, y: -20, duration: 0.4 }, 7.4);
    tl.to('.halfR', { x: 12, y: 24, rotation: 40, opacity: 0, duration: 0.9, ease: 'power2.in' }, 7.2);
    tl.fromTo('.tB', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)' }, 8.2);
    tl.to('.stu', { rotation: 30, duration: 0.8, ease: 'power2.inOut' }, 9);
    tl.fromTo('.heartB', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)' }, 9.3);
    tl.to('.stu', { rotation: 0, duration: 0.6, ease: 'power2.inOut' }, 10.5);
  });
  const face = (id) => (
    <>
      <g clipPath={`url(#${id}L)`}><rect x="-12" y="-15" width="24" height="30" rx="2" fill="#fff9e8" {...st} strokeWidth=".8" /><text y="1" {...TXT} fontSize="26" fill="#ef476f">A</text></g>
    </>
  );
  return (
    <Svg ref={ref}>
      <Room />
      <Card id="mA" /><Card id="mB" />
      <G x={54} y={24}><g className="cardA" opacity="0">
        <rect x="-12" y="-15" width="24" height="30" rx="2" fill="#fff9e8" {...st} strokeWidth=".8" />
        <text y="1" {...TXT} fontSize="26" fill="#ef476f">A</text>
      </g></G>
      <G x={134} y={24}><g className="cardB" opacity="0">
        {face('mB')}
        <g className="halfR pvt"><Pv /><g clipPath="url(#mBR)"><rect x="-12" y="-15" width="24" height="30" rx="2" fill="#fff9e8" {...st} strokeWidth=".8" /><text y="1" {...TXT} fontSize="26" fill="#ef476f">A</text></g></g>
        <path d="M0 -17 V17" stroke="#ef476f" strokeWidth=".5" strokeDasharray="1.6 1.6" />
      </g></G>
      <G x={134} y={12}><g className="scis"><G r={180}><Scissors /></G></g></G>
      <G x={28} y={80}><g className="tA pvt" opacity="0"><Pv /><Kid p="ta" shirt="#a0643c" pants="#4a4a5e" hair="#b8bdd2" glasses /></g><G x={0} y={-49}><g className="heartA pvt" opacity="0"><Pv /><Heart s={1.4} /></g></G></G>
      <G x={110} y={80}><g className="tB pvt" opacity="0"><Pv /><Kid p="tb" shirt="#7c5cff" pants="#4a4a5e" hair="#b8bdd2" glasses /></g><G x={0} y={-49}><g className="heartB pvt" opacity="0"><Pv /><Heart s={1.4} /></g></G></G>
      <G x={80} y={80}><g className="stu"><Kid p="sm" shirt="#34d399" /></g></G>
    </Svg>
  );
}

/* ===== Học ăn, học nói, học gói, học mở ===== */
const Gift = ({ lid = true }) => (
  <g {...st} strokeWidth=".7">
    <rect x="-7" y="-10" width="14" height="10" rx="1" fill="#ffd166" />
    <rect x="-1.4" y="-10" width="2.8" height="10" fill="#ef476f" stroke="none" />
    {lid && <rect className="lid" x="-8" y="-14" width="16" height="4.4" rx="1" fill="#ff9f43" />}
  </g>
);

export function HocAn({ running }) {
  const T = [0, 3.6, 7.2, 10.8];
  const ref = useScene(running, (tl) => {
    gsap.set('.pvt', { transformOrigin: '50% 50%' });
    T.forEach((t, i) => {
      tl.fromTo(`.ti${i}`, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.6)' }, t + 0.1);
      tl.fromTo(`.fr${i}`, { opacity: 0 }, { opacity: 1, duration: 0.3 }, t);
      if (i < 3) tl.to(`.fr${i}`, { opacity: 0, duration: 0.3 }, T[i + 1]);
    });
    // ăn
    tl.fromTo('.spoon', { x: 0, y: 0 }, { x: -10, y: -10, duration: 0.55, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 0.8);
    // nói
    for (let k = 0; k < 5; k++) { mouth(tl, 'k2', 'O', 4.4 + k * 0.5); mouth(tl, 'k2', 'S', 4.7 + k * 0.5); }
    tl.fromTo('.talk', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2.4)', stagger: 0.7 }, 4.6);
    // gói
    tl.fromTo('.paper', { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: 'power2.out' }, 8);
    tl.fromTo('.rib', { scale: 0 }, { scale: 1, duration: 0.5, ease: 'back.out(2.4)' }, 9);
    tl.to('.k3-armR', { rotation: -40, duration: 0.25, yoyo: true, repeat: 5, transformOrigin: '50% 0%' }, 8);
    // mở
    tl.to('.lid', { y: -10, rotation: -24, duration: 0.6, ease: 'back.out(2.4)' }, 11.6);
    tl.fromTo('.pop', { scale: 0, opacity: 0, y: 0 }, { scale: 1, opacity: 1, y: -8, duration: 0.5, ease: 'back.out(2.4)', stagger: 0.12 }, 11.8);
    tl.to('.k4-armR', { rotation: -50, duration: 0.3, transformOrigin: '50% 0%' }, 11.4);
    mouth(tl, 'k4', 'O', 11.8);
  });
  const cols = ['#ffe8cc', '#e0f0ff', '#e6f9ec', '#fde2f3'];
  return (
    <Svg ref={ref}>
      <rect width="160" height="90" fill="#eef0ff" />
      {[0, 1, 2, 3].map((i) => (
        <G key={i} x={i * 40 + 20}>
          <rect x="-18" y="5" width="36" height="80" rx="4" fill={cols[i]} {...st} strokeWidth=".6" />
          <rect className={`fr${i}`} x="-18" y="5" width="36" height="80" rx="4" fill="none" stroke="#7c5cff" strokeWidth="1.6" opacity="0" />
        </G>
      ))}
      {/* ăn */}
      <G x={20} y={0}><g className="ti0" opacity="0">
        <G x={-7} y={82}><Kid p="k1" shirt="#ff9f43" /></G>
        <G x={10} y={76}><G s={0.5}><Bowl /></G><G x={0} y={-14} s={0.55}><g className="spoon"><Spoon /></g></G></G>
      </g></G>
      {/* nói */}
      <G x={60} y={0}><g className="ti1" opacity="0">
        <G x={0} y={82}><Kid p="k2" shirt="#4f8cff" /></G>
        {[['a', 4, 32], ['ba', 6, 20]].map(([t, x, y], i) => <G key={t} x={x} y={y}><g className="talk pvt" opacity="0"><Pv /><Bubble w={i ? 16 : 12} h={9} tail="left" /><text y=".4" {...TXT} fontSize="5.4" fill={INK}>{t}</text></g></G>)}
      </g></G>
      {/* gói */}
      <G x={100} y={0}><g className="ti2" opacity="0">
        <G x={-7} y={82}><Kid p="k3" shirt="#ef476f" /></G>
        <G x={10} y={80}>
          <G s={0.9}><Gift lid={false} /></G>
          <g className="paper pvt"><Pv /><rect x="-8" y="-12" width="16" height="12" rx="1" fill="#ff8fab" {...st} strokeWidth=".7" /><path d="M-8 -12 L8 0 M8 -12 L-8 0" stroke="#fff" strokeWidth=".4" opacity=".6" /></g>
          <g className="rib pvt"><Pv /><rect x="-1.4" y="-12" width="2.8" height="12" fill="#ffd166" /><rect x="-8" y="-7" width="16" height="2.8" fill="#ffd166" /><path d="M0 -12 C-6 -18 -8 -10 0 -12 C8 -10 6 -18 0 -12Z" fill="#ffd166" {...st} strokeWidth=".5" /></g>
        </G>
      </g></G>
      {/* mở */}
      <G x={140} y={0}><g className="ti3" opacity="0">
        <G x={-7} y={82}><Kid p="k4" shirt="#7c5cff" /></G>
        <G x={10} y={80}><Gift />
          {[[-4, -16], [4, -18]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="pop pvt" opacity="0"><Pv /><Star s={0.7} /></g></G>)}
          <G x={0} y={-18}><g className="pop pvt" opacity="0"><Pv /><Heart s={0.9} /></g></G>
        </G>
      </g></G>
    </Svg>
  );
}

/* ===== Thất bại là mẹ thành công ===== */
export function ThatBai({ running }) {
  const ref = useScene(running, (tl) => {
    gsap.set('.pvt', { transformOrigin: '50% 50%' });
    // thất bại: điểm thấp, ngã
    tl.fromTo('.paper7', { y: -30, opacity: 0, rotation: -20 }, { y: 0, opacity: 1, rotation: 6, duration: 0.7, ease: 'bounce.out' }, 0.4);
    tl.fromTo('.sw', { y: 0, opacity: 0 }, { y: 6, opacity: 1, duration: 0.5, stagger: 0.3 }, 1.2);
    tl.to('.kidfall', { rotation: -82, duration: 0.7, ease: 'power2.in' }, 2.4);
    tl.to('.paper7', { y: 14, x: -10, rotation: 30, duration: 0.7, ease: 'power2.in' }, 2.4);
    tl.to('.paper7', { opacity: 0, duration: 0.3 }, 7.3);
    tl.set('.paper7', { x: 0, y: 0, rotation: 6 }, 9.1);
    tl.fromTo('.dz', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, stagger: 0.2 }, 3.2);
    tl.to('.dzr', { rotation: 360, duration: 3, repeat: 1, ease: 'none' }, 3.2);
    // mẹ đến đỡ dậy
    tl.set('.mom', { opacity: 1 }, 5.2);
    tl.fromTo('.momg', { x: 70 }, { x: 0, duration: 1.8, ease: 'none' }, 5.2);
    walkCycle(tl, 'm7', 5.2, 1.8);
    tl.to('.dz,.dzr', { opacity: 0, duration: 0.3 }, 7);
    tl.to('.m7-armL', { rotation: 70, duration: 0.4, transformOrigin: '50% 0%' }, 7.1);
    tl.to('.kidfall', { rotation: 0, duration: 0.9, ease: 'back.out(1.6)' }, 7.4);
    tl.to('.sw', { opacity: 0, duration: 0.3 }, 7.4);
    tl.fromTo('.heart7', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)' }, 8);
    // thành công: cúp
    tl.fromTo('.cup', { y: -40, opacity: 0, scale: 0.4 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'bounce.out' }, 9.2);
    tl.to('.paper7', { opacity: 1, duration: 0.3 }, 9.2);
    tl.fromTo('.p10', { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, 9.4);
    tl.to('.p3', { opacity: 0, duration: 0.3 }, 9.2);
    tl.fromTo('.sp7', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2.4)', stagger: 0.12 }, 9.8);
    mouth(tl, 'k7', 'S', 8.6);
  });
  return (
    <Svg ref={ref}>
      <Room win />
      <G x={52} y={80}>
        <g className="kidfall pvt"><Pv /><Kid p="k7" shirt="#4f8cff" /></g>
        <G x={-4} y={-50}><g className="sw" opacity="0"><Sweat s={1.2} /></g></G>
        <G x={6} y={-47}><g className="sw" opacity="0"><Sweat s={0.9} /></g></G>
        <G x={2} y={-52}><g className="heart7 pvt" opacity="0"><Pv /><Heart s={1.6} /></g></G>
      </G>
      <G x={80} y={46}>
        <g className="paper7 pvt" opacity="0"><Pv />
          <rect x="-8" y="-10" width="16" height="20" rx="1" fill="#fff" {...st} strokeWidth=".7" />
          <path d="M-5 -5 H5 M-5 -2 H5 M-5 1 H3" stroke="#9aa3c7" strokeWidth=".5" />
          <text className="p3" x="2" y="6" {...TXT} fontSize="9" fill="#ef476f">3</text>
          <text className="p10" x="2" y="6" {...TXT} fontSize="8" fill="#2f9e6a" opacity="0">10</text>
        </g>
      </G>
      <G x={52} y={72}>
        <G y={-22}><g className="dzr pvt"><Pv /><G x={-12}><g className="dz pvt" opacity="0"><Pv /><Star s={0.6} /></g></G><G x={12}><g className="dz pvt" opacity="0"><Pv /><Star s={0.6} /></g></G></g></G>
      </G>
      <g className="mom" opacity="0">
        <G x={112} y={80}><g className="momg"><Kid p="m7" shirt="#ff8fab" pants="#7a4a28" hair="#7a4a28" girl /></g></G>
      </g>
      <G x={140} y={50}><g className="cup pvt" opacity="0"><Pv /><Trophy s={1.7} /></g></G>
      {[[34, 40], [74, 38], [150, 24], [126, 20]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="sp7 pvt" opacity="0"><Pv /><Sparkle s={1.4} /></g></G>)}
    </Svg>
  );
}

/* ===== Ăn quả nhớ kẻ trồng cây ===== */
export function AnQua({ running }) {
  const ref = useScene(running, (tl) => {
    gsap.set('.pvt', { transformOrigin: '50% 50%' });
    tl.to('.canopy', { rotation: 2.5, duration: 0.12, yoyo: true, repeat: 7 }, 0.5);
    tl.fromTo('.fruit', { y: 0, opacity: 1 }, { y: 34, duration: 0.9, ease: 'bounce.out' }, 1.3);
    tl.to('.fruit', { x: -30, y: 29, duration: 0.7, ease: 'power2.inOut' }, 2.4);
    tl.to('.k8-armR', { rotation: 125, duration: 0.6, transformOrigin: '50% 0%' }, 2.7);
    tl.to('.fruit', { x: -39, y: 13, scale: 0.7, duration: 0.5 }, 3.2);
    tl.to('.fruit', { scale: 0.45, duration: 0.3, yoyo: true, repeat: 3 }, 3.9);
    for (let k = 0; k < 4; k++) { mouth(tl, 'k8', 'O', 3.9 + k * 0.6); mouth(tl, 'k8', 'S', 4.2 + k * 0.6); }
    // nhớ về người trồng cây
    tl.fromTo('.thought', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.8)' }, 6);
    tl.to('.farm-arm', { rotation: 50, duration: 0.45, yoyo: true, repeat: 7, ease: 'sine.inOut', transformOrigin: '50% 0%' }, 6.8);
    tl.fromTo('.sap', { scaleY: 0 }, { scaleY: 1, duration: 2.4, ease: 'power1.out' }, 7.4);
    tl.fromTo('.wd', { y: 0, opacity: 1 }, { y: 6, opacity: 0, duration: 0.5, repeat: 5, stagger: 0.12 }, 8);
    tl.to('.k8-armR', { rotation: 0, duration: 0.4, transformOrigin: '50% 0%' }, 8.6);
    tl.to('.fruit', { opacity: 0, duration: 0.3 }, 8.6);
    tl.fromTo('.heart8', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(3)', stagger: 0.2 }, 9.6);
    tl.to('.k8-head', { rotation: 10, duration: 0.5, yoyo: true, repeat: 3, transformOrigin: '50% 100%' }, 9.6);
  });
  return (
    <Svg ref={ref}>
      <Sky id="aq" ground={68} gcol="#bfe3a5" />
      <G x={22} y={14}><Cloud /></G>
      <G x={140} y={12} s={0.8}><Sun /></G>
      <G x={124} y={42} s={1.7}>
        <g className="canopy pvt"><Pv cy={20} /><Tree /></g>
        {[[-6, -4], [5, -8], [1, 1]].map(([x, y], i) => (
          i === 0 ? null : <G key={i} x={x} y={y}><circle r="1.8" fill="#ef476f" {...st} strokeWidth=".5" /></G>
        ))}
      </G>
      <G x={84} y={80}>
        <Kid p="k8" shirt="#ff9f43" />
        <G x={-3} y={-50}><g className="heart8 pvt" opacity="0"><Pv /><Heart s={1.2} /></g></G>
        <G x={6} y={-47}><g className="heart8 pvt" opacity="0"><Pv /><Heart s={0.8} /></g></G>
      </G>
      <G x={120} y={40}><G x={0} y={0}><g className="fruit pvt"><Pv /><circle r="2.6" fill="#ef476f" {...st} strokeWidth=".6" /><path d="M0 -2.6 Q1 -4.6 2.6 -4.6" stroke="#2f9e6a" strokeWidth=".8" fill="none" /></g></G></G>
      <G x={46} y={22}>
        <g className="thought pvt"><Pv cx={22} cy={17} />
          <G x={26} y={21}><circle r="1.6" fill="#fff" {...st} strokeWidth=".6" /></G>
          <G x={22} y={17}><circle r="2.4" fill="#fff" {...st} strokeWidth=".6" /></G>
          <ellipse cx="-2" cy="2" rx="26" ry="19" fill="#fff" {...st} strokeWidth=".9" />
          <rect x="-18" y="13" width="32" height="4" fill="#a0643c" opacity=".7" />
          <G x={-6} y={14} s={0.5}>
            <Kid p="far" shirt="#4cc38a" pants="#7a4a28" hair="#b8bdd2" />
            <g transform="translate(0 -39.5)"><path d="M-11 0 Q0 -10 11 0 Z" fill="#f4d27a" {...st} strokeWidth=".8" /></g>
          </G>
          <G x={8} y={14}>
            <g className="sap pvt"><Pv /><path d="M0 0 V-9" stroke="#2f9e6a" strokeWidth="1.2" /><path d="M0 -6 Q-5 -8 -6 -11 Q-1 -11 0 -6Z M0 -9 Q5 -11 6 -14 Q1 -14 0 -9Z" fill="#4cc38a" {...st} strokeWidth=".4" /></g>
            <G y={-12}>{[0, 1].map((i) => <G key={i} x={i * 3 - 1}><g className="wd"><Drop s={0.4} /></g></G>)}</G>
          </G>
        </g>
      </G>
    </Svg>
  );
}

/* ===== Lá lành đùm lá rách ===== */
const LeafFace = ({ sad }) => (
  <g>
    <circle cx="-6" cy="-1" r="1.2" fill={INK} /><circle cx="6" cy="-1" r="1.2" fill={INK} />
    <path d={sad ? 'M-3 5 Q0 2.6 3 5' : 'M-3 3 Q0 6 3 3'} fill="none" stroke={INK} strokeWidth=".8" strokeLinecap="round" />
  </g>
);

export function LaLanh({ running }) {
  const drops = Array.from({ length: 16 }, (_, i) => i);
  const ref = useScene(running, (tl) => {
    gsap.set('.pvt', { transformOrigin: '50% 50%' });
    drops.forEach((i) => tl.fromTo(`.rd${i}`, { y: -6 }, { y: 74, duration: 0.8, repeat: 9, ease: 'none' }, i * 0.11));
    tl.to('.torn', { rotation: 4, duration: 0.1, yoyo: true, repeat: 23 }, 0.4);
    tl.fromTo('.cold', { opacity: 0, y: 0 }, { opacity: 1, y: 3, duration: 0.5, stagger: 0.4 }, 1.2);
    // lá lành tới che
    tl.fromTo('.good', { x: -100, rotation: 0 }, { x: 0, rotation: -12, duration: 1.8, ease: 'power2.out' }, 3.6);
    tl.to('.good', { y: 2, duration: 0.5, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 5.4);
    tl.to('.torn', { rotation: 0, duration: 0.3 }, 5.4);
    tl.to('.cold', { opacity: 0, duration: 0.3 }, 5.5);
    tl.to('.sadf', { opacity: 0, duration: 0.2 }, 5.6);
    tl.to('.smf', { opacity: 1, duration: 0.2 }, 5.6);
    tl.fromTo('.heart10', { scale: 0, y: 6, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(3)', stagger: 0.2 }, 5.8);
    // tạnh mưa
    tl.to('.rain', { opacity: 0, duration: 1.2 }, 7.4);
    tl.to('.gloom', { opacity: 0, duration: 1.4 }, 7.4);
    tl.fromTo('.sun10', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(2)' }, 8.2);
  });
  return (
    <Svg ref={ref}>
      <Sky id="ll" a="#9fd8ff" b="#eaf6ff" ground={72} gcol="#a8d8a0" />
      <G x={136} y={14}><g className="sun10 pvt" opacity="0"><Pv /><Sun /></g></G>
      <rect className="gloom" width="160" height="90" fill="#44506e" opacity=".55" />
      <g className="rain" stroke="#bfe6ff" strokeWidth=".9" strokeLinecap="round">
        {drops.map((i) => <line key={i} className={`rd${i}`} x1={6 + i * 9.7} x2={4 + i * 9.7} y1="0" y2="6" />)}
      </g>
      <G x={112} y={64}>
        <g className="torn pvt"><Pv /><LeafTorn /><g className="sadf"><LeafFace sad /></g><g className="smf" opacity="0"><LeafFace /></g></g>
        <G x={-8} y={-16}><g className="cold" opacity="0"><Drop s={0.9} /></g></G>
        <G x={9} y={-14}><g className="cold" opacity="0"><Drop s={0.7} /></g></G>
      </G>
      <G x={108} y={44}>
        <g className="good pvt"><Pv /><LeafGood /><g transform="translate(2 -1)"><LeafFace /></g></g>
      </G>
      {[[96, 22], [122, 24], [132, 40]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="heart10 pvt" opacity="0"><Pv /><Heart s={1.2} /></g></G>)}
    </Svg>
  );
}

/* ===== Lời nói chẳng mất tiền mua, lựa lời mà nói cho vừa lòng nhau ===== */
const Spiky = () => {
  const pts = [];
  for (let i = 0; i < 16; i++) { const a = (i / 16) * Math.PI * 2; const r = i % 2 ? 7 : 12; pts.push(`${(Math.cos(a) * r * 1.2).toFixed(1)},${(Math.sin(a) * r * 0.9).toFixed(1)}`); }
  return <polygon points={pts.join(' ')} fill="#ef476f" {...st} strokeWidth=".7" />;
};

export function LoiNoi({ running }) {
  const ref = useScene(running, (tl) => {
    gsap.set('.pvt', { transformOrigin: '50% 50%' });
    for (let k = 0; k < 4; k++) { mouth(tl, 'la', 'O', 0.6 + k * 0.6); mouth(tl, 'la', 'S', 0.9 + k * 0.6); }
    // lời nói không mất tiền
    tl.fromTo('.coinbub', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.4);
    tl.fromTo('.coin', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)' }, 0.8);
    tl.fromTo('.slash', { strokeDashoffset: 26 }, { strokeDashoffset: 0, duration: 0.5 }, 2);
    tl.fromTo('.zero', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)' }, 2.5);
    tl.to('.coinbub', { opacity: 0, y: -6, duration: 0.4 }, 4.6);
    // lựa lời: hai loại lời nói, chọn lời êm tai
    tl.fromTo('.bad', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)' }, 5);
    tl.fromTo('.good2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(2.4)' }, 5.3);
    tl.to('.la-armR', { rotation: -150, duration: 0.5, transformOrigin: '50% 0%' }, 6.2);
    tl.fromTo('.xmark', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(3)' }, 7);
    tl.to('.bad', { opacity: 0, y: 8, scale: 0.6, duration: 0.5 }, 7.4);
    tl.to('.xmark', { opacity: 0, duration: 0.2 }, 7.5);
    tl.to('.good2', { x: 52, y: 4, duration: 1.1, ease: 'power2.inOut' }, 7.8);
    tl.to('.la-armR', { rotation: 0, duration: 0.4, transformOrigin: '50% 0%' }, 8.2);
    mouth(tl, 'lb', 'S', 9);
    tl.fromTo('.hh', { scale: 0, y: 6, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.5, ease: 'back.out(3)', stagger: 0.18 }, 9.1);
    tl.to('.lb-armR', { rotation: -130, duration: 0.4, transformOrigin: '50% 0%' }, 9.1);
    tl.to('.lb-armR', { rotation: -100, duration: 0.25, yoyo: true, repeat: 5, transformOrigin: '50% 0%' }, 9.5);
  });
  return (
    <Svg ref={ref}>
      <Room />
      <G x={34} y={80}><Kid p="la" shirt="#4f8cff" /></G>
      <G x={126} y={80}><Kid p="lb" shirt="#ff8fab" pants="#7a4a28" hair="#7a4a28" girl /></G>
      <G x={56} y={26}>
        <g className="coinbub">
          <Bubble w={34} h={26} tail="left" />
          <g className="coin pvt"><Pv /><circle r="8" fill="#ffd166" {...st} strokeWidth=".8" /><circle r="5.4" fill="none" stroke="#f4a521" strokeWidth=".6" /><text {...TXT} fontSize="8" fill="#a0643c">đ</text></g>
          <path className="slash" d="M-10 8 L10 -8" stroke="#ef476f" strokeWidth="2" strokeLinecap="round" strokeDasharray="26 40" strokeDashoffset="26" />
          <G x={11} y={-8}><g className="zero pvt"><Pv /><circle r="4.4" fill="#ef476f" {...st} strokeWidth=".6" /><text {...TXT} fontSize="6" fill="#fff">0</text></g></G>
        </g>
      </G>
      <G x={36} y={16}><g className="bad pvt" opacity="0"><Pv /><Spiky /><text {...TXT} fontSize="7" fill="#fff">!#?</text></g></G>
      <G x={68} y={20}>
        <g className="good2 pvt" opacity="0"><Pv /><ellipse rx="13" ry="8.6" fill="#ffe0ec" {...st} strokeWidth=".8" /><G y={-.5}><Heart s={1.5} /></G></g>
      </G>
      <G x={36} y={16}><g className="xmark pvt" opacity="0"><Pv /><path d="M-6 -6 L6 6 M6 -6 L-6 6" stroke="#2b2d42" strokeWidth="2.4" strokeLinecap="round" /></g></G>
      {[[124, 28], [136, 24], [116, 22]].map(([x, y], i) => <G key={i} x={x} y={y}><g className="hh pvt" opacity="0"><Pv /><Heart s={i ? 1 : 1.4} /></g></G>)}
    </Svg>
  );
}

/* ===== Một con ngựa đau, cả tàu bỏ cỏ ===== */
const Horse = ({ p, sick = false, col = '#b97a4a' }) => (
  <g {...st} strokeWidth=".7">
    {[-9, -4, 5, 10].map((x, i) => <rect key={i} x={x - 1.6} y="4" width="3.2" height="11" rx="1.3" fill={i % 2 ? '#8f5a33' : col} />)}
    <path d="M10 -3 Q18 -2 17 8 Q14 3 9 2Z" fill="#4a2f20" />
    <ellipse cx="0" cy="-1" rx="12.5" ry="6.4" fill={col} />
    {sick && <path d="M-8 -6 Q0 -9 8 -6 L8 2 Q0 4 -8 2Z" fill="#7dd3fc" opacity=".95" />}
    <g transform="translate(-8 -4)">
      <g className={`${p}-hd pvt`}><Pv />
        <path d="M0 3 L-3 -10 L-9 -9 L-4 5Z" fill={col} />
        <path d="M-1 -10 Q3 -3 1 3" fill="none" stroke="#4a2f20" strokeWidth="2" />
        <ellipse cx="-12" cy="-10" rx="6" ry="3.6" fill={col} transform="rotate(25 -12 -10)" />
        <ellipse cx="-16.5" cy="-8.5" rx="2.4" ry="1.8" fill="#e6c9a8" />
        <path d="M-6 -13 L-4.6 -17 L-3 -13Z" fill={col} />
        {sick
          ? <><path d="M-12 -13.5 Q-10 -15 -8 -13.5" fill="none" stroke={INK} strokeWidth=".7" /><rect x="-13" y="-17" width="9" height="3" rx="1" fill="#fff" /><path d="M-8.5 -17.4 v3.8 M-10.4 -15.5 h3.8" stroke="#ef476f" strokeWidth=".8" /></>
          : <g className={`${p}-eye`}><circle cx="-10" cy="-11.5" r="1" fill={INK} stroke="none" /></g>}
      </g>
    </g>
  </g>
);
const Hay = () => (
  <g {...st} strokeWidth=".5">
    <path d="M-9 0 Q-7 -9 0 -8 Q7 -9 9 0Z" fill="#e6c85a" />
    {[-5, -1, 3, 6].map((x, i) => <path key={i} d={`M${x} -2 L${x + 1} -8`} stroke="#b8963a" fill="none" />)}
  </g>
);

export function NguaDau({ running }) {
  const xs = [18, 50, 82];
  const ref = useScene(running, (tl) => {
    gsap.set('.pvt', { transformOrigin: '50% 50%' });
    // ăn cỏ bình thường
    xs.forEach((_, i) => tl.to(`.h${i}-hd`, { rotation: -42, duration: 0.5, yoyo: true, repeat: 9, ease: 'sine.inOut' }, 0.3 + i * 0.15));
    tl.fromTo('.sickh', { opacity: 0, x: 20 }, { opacity: 1, x: 0, duration: 0.6 }, 0.2);
    tl.fromTo('.therm', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)' }, 2.2);
    tl.to('.sickh', { y: 1.2, duration: 0.5, yoyo: true, repeat: 20, ease: 'sine.inOut' }, 2.5);
    // 6 giây: con ngựa ốm làm cả đàn bỏ ăn
    tl.fromTo('.look', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)' }, 5.6);
    xs.forEach((_, i) => {
      tl.to(`.h${i}-hd`, { rotation: 8, duration: 0.7, ease: 'power2.out', overwrite: 'auto' }, 6.2 + i * 0.6);
      tl.fromTo(`.sw${i}`, { y: 0, opacity: 0 }, { y: 5, opacity: 1, duration: 0.5, repeat: 3, ease: 'power1.in' }, 7 + i * 0.6);
      tl.fromTo(`.no${i}`, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(3)' }, 7.2 + i * 0.6);
    });
    tl.to('.look', { opacity: 0, duration: 0.3 }, 9);
  });
  return (
    <Svg ref={ref}>
      {/* chuồng ngựa (tàu ngựa) */}
      <rect width="160" height="90" fill="#f0dcc0" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={i * 20} y="0" width="2" height="68" fill="#d9bf99" />)}
      <rect y="0" width="160" height="9" fill="#a0643c" {...st} strokeWidth=".6" />
      <rect y="68" width="160" height="22" fill="#cfae7c" />
      <rect y="68" width="160" height="1.2" fill="#00000022" />
      <path d="M0 9 L8 20 M160 9 L152 20" stroke="#8a5a36" strokeWidth="1.4" />
      {xs.map((x, i) => (
        <g key={i}>
          <g transform={`translate(${x + 8} 70) scale(-1 1)`}><Horse p={`h${i}`} col={['#b97a4a', '#c99a5e', '#9a6a45'][i]} /></g>
          <G x={x + 27} y={80} s={0.9}><Hay /></G>
          <G x={x + 16} y={34} s={1}><g className={`sw${i}`} opacity="0"><Sweat s={1.2} /></g></G>
          <G x={x + 32} y={64}><g className={`no${i} pvt`} opacity="0"><Pv /><circle r="4.6" fill="#ef476f" {...st} strokeWidth=".6" /><path d="M-2.6 -2.6 L2.6 2.6 M2.6 -2.6 L-2.6 2.6" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" /></g></G>
        </g>
      ))}
      <G x={136} y={70}><g className="sickh pvt"><Pv /><Horse p="hs" sick col="#c9c0b4" /></g></G>
      <G x={118} y={44}><g className="therm pvt" opacity="0"><Pv /><rect x="-1" y="-6" width="2" height="9" rx="1" fill="#fff" {...st} strokeWidth=".5" /><circle cy="4" r="2" fill="#ef476f" {...st} strokeWidth=".5" /></g></G>
      <G x={128} y={30}><g className="look pvt" opacity="0"><Pv /><Bubble w={20} h={11} tail="left" /><text y=".4" {...TXT} fontSize="6" fill={INK}>…</text></g></G>
    </Svg>
  );
}
