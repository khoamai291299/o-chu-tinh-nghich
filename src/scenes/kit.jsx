import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

/* ============================================================
   BỘ VẼ SVG DÙNG CHUNG CHO CÁC CẢNH HOẠT HÌNH
   - Khung cảnh luôn là 160 x 90 đơn vị (tỉ lệ 16:9).
   - Mỗi hình (Castle, Ant, Frog...) được vẽ quanh gốc (0,0).
   - Đặt vị trí bằng <G x y s r>, và hoạt hình bằng GSAP lên phần tử con.
   ============================================================ */

export const INK = '#2b2d42';
export const C = {
  stone: '#c3c9da',
  stone2: '#a2abc4',
  red: '#ef476f',
  yellow: '#ffd166',
  orange: '#ff9f43',
  green: '#4cc38a',
  green2: '#2f9e6a',
  green3: '#9be3a4',
  blue: '#4cc9f0',
  blue2: '#2b8fd1',
  brown: '#a0643c',
  brown2: '#7a4a28',
  cream: '#fff4d6',
  skin: '#ffd2b0',
  skin2: '#f0b48c',
  pink: '#ff8fab',
  dark: '#3a2e39',
  white: '#ffffff',
};
export const st = { stroke: INK, strokeWidth: 0.8, strokeLinejoin: 'round', strokeLinecap: 'round' };

/** Vị trí tĩnh. GSAP không chạm vào phần tử này, chỉ chạm vào con của nó. */
export const G = ({ x = 0, y = 0, s = 1, r = 0, children, ...p }) => (
  <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} {...p}>
    {children}
  </g>
);

export const Svg = forwardRef(function Svg({ children, ...p }, ref) {
  return (
    <svg ref={ref} viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" className="scene-svg" {...p}>
      {children}
      <defs><radialGradient id="vig" cx=".5" cy=".5" r=".78"><stop offset=".62" stopColor="#1b1450" stopOpacity="0" /><stop offset="1" stopColor="#1b1450" stopOpacity=".3" /></radialGradient></defs>
      <rect width="160" height="90" fill="url(#vig)" pointerEvents="none" />
    </svg>
  );
});

/**
 * Tạo một timeline GSAP cho cảnh. Timeline chạy một lần (khoảng 15 giây), giữ nguyên khung cuối.
 * running = false (đồng hồ dừng, đội đang trả lời...) thì hoạt hình cũng dừng theo.
 * Mẫu kịch bản: 0-5 giây hình đánh lừa, 5-12 giây chi tiết khóa hiện ra.
 */
export function useScene(running, build) {
  const ref = useRef(null);
  const tl = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const t = gsap.timeline({ paused: true });
      build(t);
      // Lặp lại cảnh sau khi diễn xong để học sinh kịp nhìn kỹ chi tiết.
      let end = 0;
      t.getChildren(false, true, true).forEach((c) => { if (c.totalDuration() <= 14) end = Math.max(end, c.endTime()); });
      const loopAt = Math.min(20, Math.max(12, end + 2.5));
      t.call(() => t.seek(0), null, loopAt);
      tl.current = t;
      t.play(0);
    }, ref);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (tl.current) tl.current.paused(!running);
  }, [running]);
  return ref;
}

/* ---------- Nền ---------- */
export const Sky = ({ id = 'sk', a = '#9fd8ff', b = '#eaf6ff', ground = 66, gcol = '#bfe3a5' }) => (
  <>
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={a} />
        <stop offset="1" stopColor={b} />
      </linearGradient>
    </defs>
    <rect width="160" height="90" fill={`url(#${id})`} />
    {ground < 90 && (
      <>
        <rect y={ground} width="160" height={90 - ground} fill={gcol} />
        <rect y={ground} width="160" height="1" fill="#00000018" />
      </>
    )}
  </>
);

export const Cloud = ({ w = 1 }) => (
  <g fill="#fff" opacity=".95" transform={`scale(${w})`}>
    <ellipse cx="0" cy="2" rx="12" ry="5" />
    <circle cx="-6" cy="-1" r="5.5" />
    <circle cx="2" cy="-4" r="7" />
    <circle cx="9" cy="0" r="5" />
  </g>
);

export const Sun = () => (
  <g>
    <g className="sun-rays" stroke={C.yellow} strokeWidth="1.6" strokeLinecap="round">
      {Array.from({ length: 10 }, (_, i) => (
        <line key={i} x1="0" y1="-11" x2="0" y2="-15" transform={`rotate(${i * 36})`} />
      ))}
    </g>
    <circle r="8.5" fill={C.yellow} stroke="#f4a521" strokeWidth=".8" />
  </g>
);

export const Sparkle = ({ s = 1, fill = C.yellow }) => (
  <path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1Z" fill={fill} transform={`scale(${s})`} />
);

/* ---------- Công trình, thiên nhiên ---------- */
export function Castle() {
  return (
    <g {...st}>
      <rect x="-14" y="-2" width="28" height="22" fill={C.stone} />
      {[-14, -9, -4, 1, 6, 11].map((x) => (
        <rect key={x} x={x} y="-5" width="3" height="4" fill={C.stone} />
      ))}
      <rect x="-24" y="-10" width="11" height="30" fill={C.stone2} />
      <rect x="13" y="-10" width="11" height="30" fill={C.stone2} />
      <path d="M-25.5 -10 L-18.5 -23 L-11.5 -10Z" fill={C.red} />
      <path d="M11.5 -10 L18.5 -23 L25.5 -10Z" fill={C.red} />
      <rect x="-6" y="-16" width="12" height="20" fill={C.stone} />
      <path d="M-7.5 -16 L0 -30 L7.5 -16Z" fill={C.red} />
      <line x1="0" y1="-30" x2="0" y2="-38" />
      <g className="flag">
        <path d="M0 -38 L8 -35.5 L0 -33Z" fill={C.yellow} />
      </g>
      <path d="M-4.5 20 V11 a4.5 4.5 0 0 1 9 0 V20Z" fill={C.brown} />
      <rect x="-20" y="-2" width="3" height="6" rx="1.5" fill={C.dark} />
      <rect x="17" y="-2" width="3" height="6" rx="1.5" fill={C.dark} />
      <rect x="-1.5" y="-10" width="3" height="5" rx="1.5" fill={C.dark} />
      <line x1="-24" y1="10" x2="-13" y2="10" strokeWidth=".4" />
      <line x1="13" y1="10" x2="24" y2="10" strokeWidth=".4" />
    </g>
  );
}

export function Tree({ canopy = C.green, trunk = C.brown }) {
  return (
    <g {...st}>
      <rect x="-2.6" y="0" width="5.2" height="15" fill={trunk} />
      <circle cx="-6" cy="-1" r="7.5" fill={canopy} />
      <circle cx="6" cy="-1" r="7.5" fill={canopy} />
      <circle cx="0" cy="-8" r="9" fill={canopy} />
      <circle cx="-3" cy="-11" r="2.6" fill="#fff" opacity=".28" stroke="none" />
    </g>
  );
}

export function Mountain() {
  return (
    <g {...st}>
      <path d="M-42 22 L0 -28 L42 22Z" fill="#8d99ae" />
      <path d="M0 -28 L42 22 L9 22Z" fill="#76829b" stroke="none" />
      <path d="M-10.5 -15.5 L0 -28 L10.5 -15.5 L5.5 -12 L0 -16.5 L-5.5 -12Z" fill="#fff" />
      <path d="M-42 22 L0 -28 L42 22Z" fill="none" />
    </g>
  );
}

/* ---------- Côn trùng, động vật ---------- */
export function Ant() {
  return (
    <g stroke="#3a2e39" strokeWidth=".55" strokeLinecap="round" fill="none">
      <g className="legs-a">
        <path d="M-3 1.4 L-5.4 5.4" />
        <path d="M0 1.4 L1.4 5.6" />
        <path d="M3 1.4 L5.6 5" />
      </g>
      <g className="legs-b">
        <path d="M-3 1.4 L-1.4 5.6" />
        <path d="M0 1.4 L-1.8 5.4" />
        <path d="M3 1.4 L3.2 5.6" />
      </g>
      <ellipse cx="-6" cy="0" rx="4.3" ry="3.2" fill="#4a3a45" stroke="none" />
      <ellipse cx="-0.2" cy="0" rx="2.6" ry="2.3" fill="#4a3a45" stroke="none" />
      <ellipse cx="4.6" cy="-0.6" rx="2.7" ry="2.5" fill="#4a3a45" stroke="none" />
      <path d="M6.2 -2.4 Q8.4 -6 10.6 -5" />
      <path d="M6.8 -1.4 Q9.6 -3.6 11.4 -2.4" />
      <circle cx="5.6" cy="-1.2" r=".55" fill="#fff" stroke="none" />
      <ellipse cx="-6.6" cy="-1" rx="1.5" ry=".9" fill="#fff" opacity=".25" stroke="none" />
    </g>
  );
}

export function Bee() {
  return (
    <g {...st} strokeWidth=".6">
      <g className="wing">
        <ellipse cx="-1" cy="-5" rx="3" ry="4.2" fill="#d8f3ff" opacity=".85" />
        <ellipse cx="3" cy="-4.4" rx="2.6" ry="3.6" fill="#d8f3ff" opacity=".85" />
      </g>
      <ellipse cx="0" cy="0" rx="6.4" ry="4.6" fill={C.yellow} />
      <path d="M-2 -4.4 V4.4 M1.8 -4.5 V4.5" stroke={INK} strokeWidth="1.6" />
      <circle cx="5.2" cy="-.6" r="3" fill={C.yellow} />
      <circle cx="6.2" cy="-1.2" r=".7" fill={INK} stroke="none" />
      <path d="M-6.4 0 L-8.6 .6" strokeWidth="1" />
      <path d="M6.2 -3.4 L8 -6" strokeWidth=".4" />
    </g>
  );
}

export function Butterfly() {
  return (
    <g {...st} strokeWidth=".5">
      <g className="bw-l">
        <path d="M0 0 C-3 -9 -11 -8 -9 -2 C-8 2 -3 2 0 0Z" fill={C.pink} />
        <path d="M0 0 C-3 7 -9 8 -7 3 C-6 1 -3 1 0 0Z" fill="#ffc2d1" />
      </g>
      <g className="bw-r">
        <path d="M0 0 C3 -9 11 -8 9 -2 C8 2 3 2 0 0Z" fill={C.pink} />
        <path d="M0 0 C3 7 9 8 7 3 C6 1 3 1 0 0Z" fill="#ffc2d1" />
      </g>
      <rect x="-.8" y="-3" width="1.6" height="7" rx=".8" fill={INK} />
    </g>
  );
}

export function Eye() {
  return (
    <g {...st}>
      <g className="eye-lid">
        <ellipse cx="0" cy="0" rx="13" ry="8.6" fill="#fff" />
        <g className="iris">
          <circle cx="0" cy="0" r="5.6" fill="#3f8fd8" />
          <circle cx="0" cy="0" r="2.8" fill={INK} stroke="none" />
          <circle cx="-1.8" cy="-1.8" r="1.2" fill="#fff" stroke="none" />
        </g>
        <path d="M-13 0 Q0 -12 13 0" fill="none" strokeWidth="1.2" />
        <path d="M-13 0 Q-16 -2 -17 -5 M13 0 Q16 -2 17 -5 M-8 -8 L-9.5 -12 M0 -9 V-13.5 M8 -8 L9.5 -12" strokeWidth=".7" fill="none" />
      </g>
    </g>
  );
}

export function Fish() {
  return (
    <g {...st}>
      <g className="tail">
        <path d="M-9 0 L-18 -7 Q-15 0 -18 7Z" fill={C.orange} />
      </g>
      <path d="M-10 0 C-8 -9 6 -10 13 -1 C6 9 -8 9 -10 0Z" fill={C.orange} />
      <path d="M-2 -7 L2 -12 L5 -6Z" fill="#ffb35c" />
      <path d="M2 4 Q4 8 7 6" fill="none" />
      <circle cx="7.5" cy="-2" r="2.1" fill="#fff" />
      <circle cx="8" cy="-2" r="1" fill={INK} stroke="none" />
      <path d="M12 1 Q9.5 3 8.5 2" fill="none" strokeWidth=".5" />
      <path d="M-4 -3 Q-2 0 -4 3 M0 -4 Q2 0 0 4" fill="none" strokeWidth=".4" opacity=".7" />
    </g>
  );
}

export function Frog({ toad = false, up = false }) {
  const body = toad ? '#8fae5a' : '#5fcf80';
  const dark = toad ? '#6f8a40' : '#38a85d';
  return (
    <g {...st}>
      <ellipse cx="-8" cy="9" rx="5.5" ry="3.2" fill={dark} />
      <ellipse cx="8" cy="9" rx="5.5" ry="3.2" fill={dark} />
      <ellipse cx="0" cy="3" rx="12.5" ry="9.5" fill={body} />
      <ellipse cx="0" cy="6" rx="8" ry="5.5" fill={toad ? '#d9e6a8' : '#c9f5d2'} stroke="none" />
      <g className="eyes-frog">
        <circle cx="-6" cy="-7" r="4.4" fill={body} />
        <circle cx="6" cy="-7" r="4.4" fill={body} />
        <circle cx="-6" cy="-7.4" r="3" fill="#fff" />
        <circle cx="6" cy="-7.4" r="3" fill="#fff" />
        <circle className="pupil" cx="-6" cy={up ? -8.6 : -7} r="1.5" fill={INK} stroke="none" />
        <circle className="pupil" cx="6" cy={up ? -8.6 : -7} r="1.5" fill={INK} stroke="none" />
      </g>
      <path d="M-6 3 Q0 6.4 6 3" fill="none" />
      {toad && [[-7, 0], [6, -1], [-2, 8], [9, 5], [-10, 5]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.2" fill={dark} stroke="none" />)}
      <ellipse cx="-12" cy="10" rx="3" ry="1.6" fill={body} />
      <ellipse cx="12" cy="10" rx="3" ry="1.6" fill={body} />
    </g>
  );
}

/* ---------- Bộ phận cơ thể ---------- */
export function Foot() {
  return (
    <g {...st}>
      <rect x="-9" y="-28" width="12" height="24" rx="3" fill={C.skin} />
      <path d="M-10 -6 H4 C5 0 10 1 15 3 C21 5 23 12 16 13 H-8 C-13 13 -14 6 -10 -6Z" fill={C.skin} />
      {[[20.2, 10.4, 2.1], [21.2, 7, 2.2], [19.4, 4, 2.1], [16.4, 2, 1.9]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={C.skin} strokeWidth=".5" />
      ))}
      <path d="M-9 -3 H3" strokeWidth=".4" opacity=".5" />
    </g>
  );
}

/** Chân nằm ngang (dùng cho cú đá), phần hông ở gốc x = -32. */
export function LegH() {
  return (
    <g {...st}>
      <rect x="-32" y="-4.6" width="30" height="9.2" rx="3" fill={C.skin} />
      <path d="M-4 -5 C4 -5 9 -3 10 2 C10 6.5 5 7 -4 7Z" fill={C.skin} />
      {[[10.4, 4.4, 1.5], [10.4, 1.4, 1.5]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={C.skin} strokeWidth=".4" />)}
    </g>
  );
}

export function Hand() {
  const fx = [-6.8, -2.3, 2.2, 6.7];
  return (
    <g {...st}>
      <rect x="-5" y="8" width="10" height="46" fill="#3b82f6" />
      <rect x="-5.6" y="6" width="11.2" height="5" rx="1.5" fill="#fff" />
      <rect x="-7.4" y="-3" width="14.8" height="12" rx="4" fill={C.skin} />
      {fx.map((x, i) => (
        <g key={i} className="fg">
          <rect x={x - 1.8} y={-15 - (i === 1 || i === 2 ? 1.5 : 0)} width="3.6" height={13 + (i === 1 || i === 2 ? 1.5 : 0)} rx="1.8" fill={C.skin} />
        </g>
      ))}
      <g className="tb">
        <rect x="-13.6" y="0" width="7.4" height="3.6" rx="1.8" fill={C.skin} transform="rotate(-28 -6.5 2)" />
      </g>
    </g>
  );
}

/* ---------- Hoa, số ---------- */
export function Flower() {
  return (
    <g {...st}>
      <path d="M0 26 C-1 16 1 8 0 0" fill="none" stroke={C.green2} strokeWidth="2.2" />
      <path d="M0 18 C-8 16 -10 10 -9 8 C-4 9 -1 13 0 18Z" fill={C.green} />
      <path d="M0 13 C7 11 10 6 9 4 C4 5 1 8 0 13Z" fill={C.green} />
      <g className="fl-head">
        {Array.from({ length: 6 }, (_, i) => (
          <ellipse key={i} cx="0" cy="-8" rx="4.4" ry="6.8" fill={C.pink} transform={`rotate(${i * 60})`} />
        ))}
        <circle r="4.4" fill={C.yellow} />
        <circle cx="-1.2" cy="-1.2" r="1.1" fill="#fff" opacity=".6" stroke="none" />
      </g>
    </g>
  );
}

export const Digit = ({ ch = '3', size = 44, fill = C.red }) => (
  <text
    textAnchor="middle"
    dominantBaseline="central"
    fontFamily="'Baloo 2','Trebuchet MS',sans-serif"
    fontWeight="800"
    fontSize={size}
    fill={fill}
    stroke={INK}
    strokeWidth="1.8"
    strokeLinejoin="round"
    paintOrder="stroke"
  >
    {ch}
  </text>
);

export function Arrow({ fill = C.red }) {
  return <path d="M-18 -4.5 H3 V-11 L19 0 L3 11 V4.5 H-18Z" fill={fill} {...st} />;
}
