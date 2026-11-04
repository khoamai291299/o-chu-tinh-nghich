import { Svg, G, Sparkle, useScene, INK } from './kit.jsx';
import { InkBottle, Paper, Lamp } from './props.jsx';

/* ===== Gần mực thì đen, gần đèn thì rạng ===== */
export function GanMucGanDen({ running }) {
  const ref = useScene(running, (tl) => {
    tl.fromTo('.bottle', { y: -26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' }, 0.3);
    tl.to('.bottle-r', { rotation: -100, duration: 0.8, ease: 'power2.inOut', transformOrigin: '50% 50%' }, 1.2);
    for (let i = 0; i < 4; i++) {
      tl.fromTo(`.id${i}`, { y: 0, opacity: 1 }, { y: 24, duration: 0.5, ease: 'power2.in' }, 2.1 + i * 0.45);
      tl.set(`.id${i}`, { opacity: 0 }, 2.6 + i * 0.45);
    }
    tl.fromTo('.stain', { attr: { r: 0 } }, { attr: { r: 31 }, duration: 3.6, ease: 'power1.out' }, 2.5);
    tl.to('.bottle-r', { rotation: 0, duration: 0.7, ease: 'power2.inOut', transformOrigin: '50% 50%' }, 5.6);
    // 5,5 giây: bên phải bật đèn lên
    tl.fromTo('.lamp', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.6)' }, 5.4);
    tl.to('.dim', { opacity: 0, duration: 1.2, ease: 'power1.inOut' }, 6.4);
    tl.to('.cone', { opacity: 1, duration: 1.2, ease: 'power1.inOut' }, 6.4);
    tl.to('.paper-r', { attr: { fill: '#fff3a8' }, duration: 1.4 }, 6.6);
    tl.to('.bulb-glow', { opacity: 1, scale: 1.2, duration: 0.8, transformOrigin: '50% 50%' }, 6.4);
    tl.to('.rays', { rotation: 360, duration: 12, ease: 'none', transformOrigin: '50% 50%' }, 6.4);
    tl.fromTo('.rays', { opacity: 0 }, { opacity: 1, duration: 1 }, 6.4);
    tl.fromTo('.sp', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.14, ease: 'back.out(2)' }, 7.4);
    tl.to('.bulb-glow', { scale: 1.45, duration: 0.7, yoyo: true, repeat: -1, ease: 'sine.inOut', transformOrigin: '50% 50%' }, 7.4);
  });
  return (
    <Svg ref={ref}>
      <defs>
        <linearGradient id="cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff2a0" stopOpacity=".95" />
          <stop offset="1" stopColor="#ffe36e" stopOpacity=".15" />
        </linearGradient>
        <clipPath id="paperL"><rect x="25" y="44" width="30" height="38" /></clipPath>
      </defs>
      <rect width="80" height="90" fill="#efe6d8" />
      <rect x="80" width="80" height="90" fill="#e8edf7" />
      <line x1="80" x2="80" y1="0" y2="90" stroke="#00000022" strokeWidth=".6" strokeDasharray="2 2" />
      {/* bên trái: mực làm đen tờ giấy */}
      <G x={40} y={63}><Paper /></G>
      <g clipPath="url(#paperL)"><circle className="stain" cx="40" cy="62" r="0" fill="#15151f" /></g>
      <G x={40} y={63}>
        <rect x="-15" y="-19" width="30" height="38" rx="1.6" fill="none" stroke={INK} strokeWidth=".8" />
      </G>
      <G x={55} y={22} s={1.15}><g className="bottle"><g className="bottle-r"><InkBottle /></g></g></G>
      {[0, 1, 2, 3].map((i) => (
        <G key={i} x={43} y={30}><ellipse className={`id${i}`} rx="1.4" ry="2" fill="#15151f" opacity="0" /></G>
      ))}
      {/* bên phải: đèn làm tờ giấy rạng rỡ */}
      <path className="cone" d="M130 30 L100 88 L152 88Z" fill="url(#cone)" opacity="0" />
      <G x={122} y={64}>
        <g stroke={INK} strokeWidth=".8">
          <rect className="paper-r" x="-15" y="-19" width="30" height="38" rx="1.6" fill="#fffdf6" />
        </g>
        {[-12, -7, -2, 3, 8, 13].map((y) => <line key={y} x1="-12" x2="12" y1={y} y2={y} stroke="#e1c96e" strokeWidth=".5" />)}
      </G>
      <G x={116} y={26} s={0.95}><g className="lamp" opacity="0"><Lamp /></g></G>
      <G x={135} y={32}>
        <g className="rays" opacity="0" stroke="#ffd34d" strokeWidth="1.4" strokeLinecap="round">
          {Array.from({ length: 10 }, (_, i) => <line key={i} x1="0" y1="-8" x2="0" y2="-13" transform={`rotate(${i * 36})`} />)}
        </g>
        <circle className="bulb-glow" r="6" fill="#fff2a0" opacity="0" />
      </G>
      <rect className="dim" x="80" width="80" height="90" fill="#101a3a" opacity=".62" />
      {[[100, 52], [146, 52], [124, 36], [108, 80]].map(([x, y], i) => (
        <G key={i} x={x} y={y}><g className="sp"><Sparkle s={1.4} /></g></G>
      ))}
    </Svg>
  );
}

