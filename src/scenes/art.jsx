import { C, INK, st } from './kit.jsx';

/* ============================================================
   NÉT VẼ NÂNG CẤP cho nhóm cảnh mới: có đổ bóng, màu chuyển sắc, chi tiết.
   Mỗi hình vẽ quanh gốc (0,0), chân chạm đất ở y khoảng +12 đến +16.
   ============================================================ */

export const Shadow = ({ rx = 14, ry = 2.6, y = 14 }) => <ellipse cx="0" cy={y} rx={rx} ry={ry} fill="#1f2a4a" opacity=".22" />;

const Grad = ({ id, a, b, v = true }) => (
  <linearGradient id={id} x1="0" y1="0" x2={v ? 0 : 1} y2={v ? 1 : 0}>
    <stop offset="0" stopColor={a} />
    <stop offset="1" stopColor={b} />
  </linearGradient>
);

/* ---------- Phong cảnh ---------- */
const TUFTS = [[10, 70], [34, 84], [58, 68], [96, 86], [120, 72], [146, 82], [22, 62], [84, 64], [138, 62]];
export function Meadow({ id = 'md', ground = 62, hills = true, trees = true, sun = true, a = '#86ccff', b = '#eaf8ff' }) {
  return (
    <g>
      <defs>
        <Grad id={`${id}s`} a={a} b={b} />
        <Grad id={`${id}g`} a="#a6e6a2" b="#62bd77" />
        <radialGradient id={`${id}r`}><stop offset="0" stopColor="#fff6c2" stopOpacity=".95" /><stop offset="1" stopColor="#fff6c2" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="160" height="90" fill={`url(#${id}s)`} />
      {sun && <circle cx="132" cy="18" r="22" fill={`url(#${id}r)`} />}
      {hills && (
        <>
          <path d={`M0 ${ground} C14 ${ground - 18} 34 ${ground - 20} 54 ${ground - 4} C74 ${ground - 22} 100 ${ground - 18} 118 ${ground - 5} C134 ${ground - 16} 150 ${ground - 12} 160 ${ground - 4} V${ground + 2} H0Z`} fill="#b7e4b4" />
          <path d={`M0 ${ground + 1} C20 ${ground - 10} 44 ${ground - 9} 64 ${ground} C86 ${ground - 11} 112 ${ground - 8} 130 ${ground} C144 ${ground - 6} 154 ${ground - 5} 160 ${ground - 1} V${ground + 3} H0Z`} fill="#8fd39a" />
        </>
      )}
      {trees && [[16, ground - 6, 0.6], [146, ground - 5, 0.55]].map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
          <rect x="-1.8" y="-4" width="3.6" height="12" rx="1.2" fill="#9a6a3e" />
          <circle cy="-10" r="9" fill="#5fbf7e" /><circle cx="-5" cy="-6" r="6" fill="#4fae70" /><circle cx="5.5" cy="-7" r="6.4" fill="#6fcf8b" />
          <circle cx="-2" cy="-13" r="2.6" fill="#8fe0a4" opacity=".7" />
        </g>
      ))}
      <rect y={ground} width="160" height={90 - ground} fill={`url(#${id}g)`} />
      <path d={`M0 ${ground + 8} Q80 ${ground + 4} 160 ${ground + 9} V${ground + 12} Q80 ${ground + 8} 0 ${ground + 12}Z`} fill="#4aa85f" opacity=".16" />
      <path d={`M0 ${ground + 20} Q80 ${ground + 15} 160 ${ground + 21} V${ground + 24} Q80 ${ground + 19} 0 ${ground + 24}Z`} fill="#3f9a55" opacity=".14" />
      <rect y={ground} width="160" height=".8" fill="#00000014" />
      {[[24, 74, '#ff8fab'], [48, 82, '#ffd166'], [72, 72, '#fff'], [104, 80, '#ff8fab'], [128, 68, '#ffd166'], [150, 76, '#fff'], [14, 80, '#ffd166']].filter(([, y]) => y > ground + 2).map(([x, y, c], i) => (
        <g key={`f${i}`} transform={`translate(${x} ${y})`}><path d="M0 0 V-3.4" stroke="#3f9a55" strokeWidth=".6" /><circle cy="-4" r="1.3" fill={c} /><circle cy="-4" r=".5" fill="#f4a521" /></g>
      ))}
      {TUFTS.filter(([, y]) => y > ground + 1).map(([x, y], i) => (
        <path key={i} transform={`translate(${x} ${y})`} d="M0 0 Q-1 -3 -2.6 -4.4 M0 0 Q0 -4.4 .2 -5.6 M0 0 Q1.2 -3 2.8 -4" fill="none" stroke="#3f9a55" strokeWidth=".8" strokeLinecap="round" />
      ))}
    </g>
  );
}

/* ---------- Ngựa (quay sang phải) ---------- */
export function Horse() {
  return (
    <g {...st} strokeWidth=".7">
      <defs><Grad id="gHorse" a="#c9854a" b="#9a5f30" /></defs>
      <Shadow rx={20} y={17} />
      {['a', 'b'].map((k, i) => (
        <g key={k} transform={`translate(${i ? -11 : -8} 4)`}><g className={`hl-${k}`}>
          <path d="M-1.8 0 H1.8 L1.4 11 H-1.4Z" fill="#8a5326" /><rect x="-2.1" y="10.6" width="4.2" height="2.4" rx="1" fill="#3a2e39" />
        </g></g>
      ))}
      <path d="M-14 -3 C-23 -3 -25 6 -22 14 C-20 8 -19 5 -15 3Z" fill="#3a2e39" />
      <path d="M-15 -1 C-20 1 -21 7 -20 11" fill="none" stroke="#6b5566" strokeWidth=".6" />
      <ellipse cx="0" cy="-1" rx="15.5" ry="8.4" fill="url(#gHorse)" />
      <path d="M-11 4 Q0 8.4 12 4" fill="none" stroke="#e0a971" strokeWidth="1.2" opacity=".6" strokeLinecap="round" />
      <path d="M-4 -8.4 Q0 -10 4 -8.4 L5 -3 Q0 -1.6 -5 -3Z" fill="#ef476f" strokeWidth=".6" />
      <path d="M10 -4 L17 -17 L23.6 -14 L15 3Z" fill="url(#gHorse)" />
      <path d="M12 -5 C9 -13 12 -18 17.6 -19 C14 -12 16 -8 17 -4Z" fill="#3a2e39" />
      <ellipse cx="23" cy="-14" rx="6.6" ry="3.8" transform="rotate(28 23 -14)" fill="#b8733d" />
      <ellipse cx="27" cy="-11.6" rx="2.6" ry="2" transform="rotate(28 27 -11.6)" fill="#e0b48a" />
      <circle cx="24" cy="-15.4" r="1" fill={INK} stroke="none" /><circle cx="24.3" cy="-15.7" r=".35" fill="#fff" stroke="none" />
      <path d="M17.4 -18.6 L18.2 -23.4 L21.2 -18.2Z" fill="#b8733d" />
      {['c', 'd'].map((k, i) => (
        <g key={k} transform={`translate(${i ? 11 : 7} 5)`}><g className={`hl-${k}`}>
          <path d="M-1.8 0 H1.8 L1.4 10 H-1.4Z" fill="#a86a38" /><rect x="-2.1" y="9.6" width="4.2" height="2.4" rx="1" fill="#3a2e39" />
        </g></g>
      ))}
    </g>
  );
}

/* ---------- Bò ---------- */
export function Cow() {
  return (
    <g {...st} strokeWidth=".7">
      <Shadow rx={19} y={13.6} />
      <path d="M-15 -3 C-21 -2 -20 5 -18 9" fill="none" strokeWidth="1.1" />
      <ellipse cx="-18" cy="10" rx="1.8" ry="2.6" fill="#3a2e39" />
      {[-10, -5, 6, 11].map((x, i) => (
        <g key={i}><rect x={x - 1.7} y="3" width="3.4" height="9.6" rx="1.2" fill={i % 2 ? '#ece5da' : '#f6f1e8'} /><rect x={x - 1.8} y="11" width="3.6" height="2.4" rx="1" fill="#3a2e39" /></g>
      ))}
      <rect x="-15" y="-10" width="30" height="16.4" rx="7.4" fill="#fffdf8" />
      <path d="M-13 1 Q0 6.4 13 1" fill="none" stroke="#e9e1d4" strokeWidth="1.6" opacity=".8" />
      <path d="M-9 -9.6 C-4 -11 -1 -7 -5 -3 C-9 -3 -12 -6 -9 -9.6Z" fill="#3a2e39" stroke="none" />
      <path d="M5 -4 C10 -6 14 -2 10 2 C6 4 2 1 5 -4Z" fill="#3a2e39" stroke="none" />
      <ellipse cx="-1" cy="6" rx="3.4" ry="2.2" fill="#ffb3c1" />
      <rect x="13" y="-13" width="12.6" height="13" rx="5.4" fill="#fffdf8" />
      <path d="M15 -12 C13 -18 11 -17 11 -14 C12 -14 14 -13 15 -12Z M24 -12 C26 -18 28 -17 28 -14 C27 -14 25 -13 24 -12Z" fill="#3a2e39" />
      <path d="M16.6 -13 L15.4 -17.6 M22 -13 L23.2 -17.6" fill="none" stroke="#d9cfb8" strokeWidth="1.6" />
      <rect x="19" y="-5.4" width="8" height="5.6" rx="2.6" fill="#ffb3c1" />
      <circle cx="22" cy="-3" r=".6" fill="#c46b7c" stroke="none" /><circle cx="25" cy="-3" r=".6" fill="#c46b7c" stroke="none" />
      <circle cx="19.6" cy="-8.4" r="1" fill={INK} stroke="none" /><circle cx="19.9" cy="-8.7" r=".34" fill="#fff" stroke="none" />
      <path d="M16 -1 q3 2 6 .5" fill="none" stroke="#e9e1d4" strokeWidth=".6" />
    </g>
  );
}

/* ---------- Hươu ---------- */
export function Deer() {
  return (
    <g {...st} strokeWidth=".7">
      <defs><Grad id="gDeer" a="#e6a762" b="#c4813f" /></defs>
      <Shadow rx={15} y={14.4} />
      {[-8, -4, 6, 10].map((x, i) => (
        <g key={i} transform={`translate(${x} 3)`}><g className={`dl-${i}`}>
          <path d="M-1.2 0 H1.2 L.8 11 H-.8Z" fill={i % 2 ? '#a9703c' : '#c4813f'} /><rect x="-1.2" y="10.4" width="2.4" height="2" rx=".8" fill="#4a2f1c" />
        </g></g>
      ))}
      <ellipse cx="0" cy="-1" rx="12.6" ry="6.8" fill="url(#gDeer)" />
      <path d="M-9 3 Q0 7.6 10 3" fill="none" stroke="#f6dfbf" strokeWidth="1.4" strokeLinecap="round" opacity=".8" />
      {[[-5, -3], [1, -4.4], [5, -.6], [-1.6, .8], [-8, 0]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1" fill="#fff7e6" stroke="none" />)}
      <path d="M9 -3 L12.6 -14 L17 -12 L13.6 1Z" fill="url(#gDeer)" />
      <ellipse cx="17.4" cy="-12.6" rx="4.8" ry="3.1" transform="rotate(20 17.4 -12.6)" fill="#d9954f" />
      <ellipse cx="21" cy="-11.6" rx="1.4" ry="1.1" fill="#3a2e39" stroke="none" />
      <path d="M13.6 -15 C10 -18 9 -15 11.6 -13.6Z" fill="#c4813f" /><path d="M14 -15 C12 -17 11 -15 12 -14.4Z" fill="#f4b6b6" stroke="none" />
      <circle cx="18.2" cy="-13.4" r=".9" fill={INK} stroke="none" />
      <path d="M15 -14.4 L13.4 -22 M14.2 -18.6 L10 -20 M13.8 -20 L11.4 -23.4 M17 -14.6 L19 -23 M18.2 -19.6 L22.4 -21 M18.8 -21.6 L21 -25" fill="none" stroke="#7a4a28" strokeWidth="1.1" />
      <ellipse cx="-12.4" cy="-3" rx="2.6" ry="3.2" fill="#fff" />
    </g>
  );
}

/* ---------- Voi ---------- */
export function Elephant() {
  return (
    <g {...st} strokeWidth=".8">
      <defs><Grad id="gEl" a="#c6cee3" b="#9ea8c4" /></defs>
      <Shadow rx={22} y={15.6} />
      {[-9, -3, 6, 12].map((x, i) => (
        <g key={i} transform={`translate(${x} 4)`}><g className={`el-${i}`}>
          <rect x="-2.6" y="0" width="5.2" height="11" rx="2.2" fill={i % 2 ? '#a1abc6' : '#b4bdd6'} />
          {[-1.2, 1.2].map((n) => <ellipse key={n} cx={n} cy="10.4" rx=".9" ry="1" fill="#f1ede3" stroke="none" />)}
        </g></g>
      ))}
      <path d="M-17 -4 C-23 -2 -22 5 -20 9" fill="none" strokeWidth="1" />
      <circle cx="-20" cy="9.6" r="1.4" fill="#8d97b4" />
      <ellipse cx="0" cy="-3" rx="17.4" ry="11.4" fill="url(#gEl)" />
      <path d="M-12 5 Q0 11 14 5" fill="none" stroke="#dfe5f5" strokeWidth="1.4" opacity=".7" strokeLinecap="round" />
      <path d="M-8 -9 Q-4 -12 0 -9 M-3 -12 Q1 -14 5 -11" fill="none" stroke="#9099b6" strokeWidth=".5" />
      <circle cx="17.4" cy="-8" r="8.2" fill="url(#gEl)" />
      <ellipse cx="9.4" cy="-6" rx="5.8" ry="8.6" fill="#a6b0cb" />
      <ellipse cx="9.8" cy="-5.6" rx="3.4" ry="6" fill="#f3b8c4" opacity=".75" stroke="none" />
      <path d="M22.4 -5 C27.6 -3 28 6 24.4 11.4 C22.4 12.6 21 11.4 22.4 9.4 C24 5.6 22.4 3 20.2 .6Z" fill="url(#gEl)" />
      <path d="M23.6 -2 C25 1 25 3 24.6 5 M23 3 C24 5 24 6 23.6 7.4" fill="none" stroke="#8d97b4" strokeWidth=".5" />
      <path d="M21 -1.6 C25.4 .6 26.4 4 25 6.2" fill="none" stroke="#fff7e6" strokeWidth="1.5" />
      <circle cx="19.4" cy="-10.4" r="1.1" fill={INK} stroke="none" /><circle cx="19.8" cy="-10.8" r=".4" fill="#fff" stroke="none" />
      <path d="M18 -12.4 q1.4 -1 2.6 -.2" fill="none" strokeWidth=".5" />
    </g>
  );
}

/* ---------- Cô tiên ---------- */
export function Fairy() {
  return (
    <g {...st} strokeWidth=".7">
      <defs><Grad id="gFr" a="#ff9bbd" b="#e0568b" /></defs>
      <g className="wing" opacity=".95">
        <ellipse cx="-7" cy="-4" rx="7" ry="3.8" transform="rotate(-32 -7 -4)" fill="#e2f4ff" />
        <ellipse cx="7" cy="-4" rx="7" ry="3.8" transform="rotate(32 7 -4)" fill="#e2f4ff" />
        <ellipse cx="-5" cy="1" rx="4" ry="2.2" transform="rotate(-10 -5 1)" fill="#f4e6ff" />
        <ellipse cx="5" cy="1" rx="4" ry="2.2" transform="rotate(10 5 1)" fill="#f4e6ff" />
      </g>
      <path d="M-6 15 L-1.6 2 H1.6 L6 15 Q0 17.4 -6 15Z" fill="url(#gFr)" />
      <path d="M-4 10 H4" stroke="#fff" strokeWidth=".6" opacity=".6" />
      <rect x="-1.6" y="1" width="3.2" height="3" fill="#ffd9b8" />
      <circle cy="-1.4" r="4.4" fill="#ffd9b8" />
      <path d="M-4.6 -1.6 C-5 -7 5 -7 4.6 -1.6 C3 -4 -3 -4 -4.6 -1.6Z" fill="#a0643c" />
      <path d="M-4.6 -1 C-6 2 -5 5 -4 6 M4.6 -1 C6 2 5 5 4 6" fill="none" stroke="#a0643c" strokeWidth="1.6" />
      <circle cx="-1.6" cy="-.8" r=".6" fill={INK} stroke="none" /><circle cx="1.6" cy="-.8" r=".6" fill={INK} stroke="none" />
      <path d="M-1 1 q1 1 2 0" fill="none" strokeWidth=".5" />
      <path d="M5 5 L13 -6" stroke="#a0643c" strokeWidth="1" />
      <path transform="translate(13 -7) scale(.9)" d="M0 -6 L1.8 -1.8 L6.2 -1.5 L2.8 1.4 L3.9 5.8 L0 3.3 L-3.9 5.8 L-2.8 1.4 L-6.2 -1.5 L-1.8 -1.8Z" fill="#ffd166" />
    </g>
  );
}

/* ---------- Thùng gỗ ---------- */
export function Barrel({ full = false }) {
  return (
    <g {...st} strokeWidth=".8">
      <defs><Grad id="gBr" a="#d89a5e" b="#a8683a" v={false} /></defs>
      <Shadow rx={13} y={14.6} />
      <path d="M-9 -14 H9 C12.4 -6 12.4 6 9 14 H-9 C-12.4 6 -12.4 -6 -9 -14Z" fill="url(#gBr)" />
      <path d="M-4 -14 C-5.6 -5 -5.6 5 -4 14 M0 -14 V14 M4 -14 C5.6 -5 5.6 5 4 14" fill="none" stroke="#7a4a28" strokeWidth=".5" opacity=".7" />
      <path d="M-11.4 -7 Q0 -5 11.4 -7 V-4.6 Q0 -2.6 -11.4 -4.6Z M-11.4 5 Q0 7 11.4 5 V7.4 Q0 9.4 -11.4 7.4Z" fill="#5d6580" />
      <path d="M-11 -6.6 Q0 -4.6 11 -6.6" fill="none" stroke="#c9d1e6" strokeWidth=".5" />
      <ellipse cy="-14" rx="9" ry="2.9" fill={full ? '#5cc0f0' : '#3a2e39'} />
      {full && <ellipse cx="-2" cy="-14.4" rx="4" ry="1" fill="#bfeaff" stroke="none" opacity=".8" />}
      {!full && <ellipse cy="-14" rx="9" ry="2.9" fill="none" stroke="#e2b07a" strokeWidth="1" />}
    </g>
  );
}

/* ---------- Con dao ---------- */
export function Knife({ shiny = false }) {
  return (
    <g {...st} strokeWidth=".7">
      <path d="M-16 -3 L14 -3 Q20 -3 22 3 L-16 3Z" fill={shiny ? '#e4ecf8' : '#98a2b8'} />
      <path d="M-14 1.2 H18" stroke="#ffffff" strokeWidth=".7" opacity=".5" fill="none" />
      <path d="M-16 .6 H20" stroke="#6d7690" strokeWidth=".4" fill="none" opacity=".6" />
      <path className="nick" d="M0 -3 L1.6 -1 L3.2 -3" fill="#ffffff" stroke="none" />
      <rect x="-30" y="-3.8" width="14" height="7.6" rx="2.4" fill="#8a5326" />
      <rect x="-17.6" y="-4.2" width="2.6" height="8.4" rx="1" fill="#d3a64a" />
      <circle cx="-25" cy="0" r=".9" fill="#d3a64a" stroke="none" /><circle cx="-21" cy="0" r=".9" fill="#d3a64a" stroke="none" />
      <path d="M-29 -2.4 H-18" stroke="#c98a52" strokeWidth=".6" opacity=".7" />
    </g>
  );
}

/* ---------- Cam ---------- */
export const Orange = () => (
  <g {...st} strokeWidth=".7">
    <defs><radialGradient id="gOr" cx=".35" cy=".3"><stop offset="0" stopColor="#ffc46b" /><stop offset="1" stopColor="#f2862a" /></radialGradient></defs>
    <Shadow rx={6} ry={1.4} y={6.4} />
    <circle r="6" fill="url(#gOr)" />
    <path d="M0 -6 Q3 -9.6 6.4 -7.4 Q3.4 -4 0 -6Z" fill={C.green} />
    <circle cx="-2" cy="-2.4" r="1.2" fill="#fff" opacity=".5" stroke="none" />
  </g>
);
export const OrangeHalf = () => (
  <g {...st} strokeWidth=".7">
    <path d="M-6 0 A6 6 0 0 0 6 0Z" fill="#f79a35" />
    <ellipse cy="0" rx="6" ry="1.4" fill="#ffd58a" />
    <path d="M-4 .4 L-1 3.8 M0 .4 V4.6 M4 .4 L1 3.8" stroke="#ffe9bf" strokeWidth=".6" />
  </g>
);
