import { C, INK, st } from './kit.jsx';

/* Hình vẽ bổ sung cho các cảnh chế độ Xung phong. Cùng nét vẽ với kit.jsx: gốc (0,0) ở chân, quay sang phải. */

export function Rabbit() {
  return (
    <g {...st}>
      <ellipse cx="-8" cy="-7" rx="3" ry="3" fill="#fff" />
      <ellipse cx="-3" cy="-1.4" rx="4.4" ry="2" fill="#f1e6dc" />
      <ellipse cx="0" cy="-7" rx="9" ry="5.8" fill="#fff" />
      <ellipse cx="6" cy="-1.4" rx="3.2" ry="1.8" fill="#f1e6dc" />
      <g className="ear"><ellipse cx="6" cy="-21" rx="1.8" ry="5.6" fill="#fff" /><ellipse cx="6" cy="-21" rx=".8" ry="3.4" fill={C.pink} stroke="none" /></g>
      <g className="ear"><ellipse cx="10.4" cy="-20.6" rx="1.8" ry="5.4" fill="#fff" /><ellipse cx="10.4" cy="-20.6" rx=".8" ry="3.2" fill={C.pink} stroke="none" /></g>
      <circle cx="8.6" cy="-12.4" r="5" fill="#fff" />
      <circle cx="10.6" cy="-13.4" r=".9" fill={INK} stroke="none" />
      <circle cx="13.4" cy="-11.2" r=".9" fill={C.pink} stroke="none" />
      <path d="M12 -9.6 q1 .8 2 0" fill="none" strokeWidth=".4" />
    </g>
  );
}

export function Cat({ blind = false }) {
  return (
    <g {...st}>
      <path className="tail" d="M-9 -9 C-20 -10 -19 -22 -13 -24" fill="none" stroke="#e08a2e" strokeWidth="3.2" />
      {[-6, -2, 5, 8.6].map((x, i) => <rect key={i} x={x - 1.6} y="-6" width="3.2" height="6" rx="1.4" fill={i % 2 ? '#e8963a' : '#f0a24a'} />)}
      <ellipse cx="0" cy="-9" rx="11" ry="6.6" fill="#f0a24a" />
      <path d="M-4 -14 v5 M0 -15 v6 M4 -14 v5" stroke="#d17a22" strokeWidth=".9" fill="none" />
      <circle cx="11.6" cy="-15" r="6" fill="#f0a24a" />
      <path d="M7 -19 L8 -25 L12 -20Z M12 -20 L16 -25 L17 -18Z" fill="#f0a24a" />
      <path d="M8.2 -21 L8.6 -23.4 L10.6 -20.6Z M13.4 -20.6 L15 -23 L15.6 -19.4Z" fill={C.pink} stroke="none" />
      {blind
        ? <rect x="5.8" y="-17.4" width="12" height="3.8" rx="1" fill="#3a2e39" />
        : <><circle cx="9.6" cy="-15.8" r="1" fill={INK} stroke="none" /><circle cx="14" cy="-15.8" r="1" fill={INK} stroke="none" /></>}
      <path d="M11.2 -13.4 l.8 .8 l.8 -.8" fill={C.pink} stroke={INK} strokeWidth=".4" />
      <path d="M16 -13.2 L20 -14 M16 -12.4 L20 -12 M7 -13.2 L3.4 -14 M7 -12.4 L3.4 -12" strokeWidth=".35" fill="none" />
    </g>
  );
}

export function Buffalo() {
  return (
    <g {...st}>
      <path className="tail" d="M-16 -18 C-22 -14 -21 -8 -19 -4" fill="none" strokeWidth="1.2" />
      {[-11, -6, 8, 13].map((x, i) => <rect key={i} x={x - 2} y="-9" width="4" height="9.4" rx="1.6" fill={i % 2 ? '#4a4f5e' : '#585e70'} />)}
      <ellipse cx="0" cy="-15" rx="18" ry="9.6" fill="#5d6378" />
      <path d="M-8 -22 Q0 -25 8 -22" fill="none" stroke="#7a8098" strokeWidth="1.2" opacity=".7" />
      <g className="bhead">
        <path d="M14 -24 C12 -29 17 -32 22 -29 C20 -28 18 -26 18 -24Z" fill="#e8dcc0" />
        <ellipse cx="22.6" cy="-17" rx="8.2" ry="6.8" fill="#6b7188" />
        <ellipse cx="27.2" cy="-14" rx="4.6" ry="3.6" fill="#9096ad" />
        <circle cx="26" cy="-14.6" r=".7" fill={INK} stroke="none" /><circle cx="28.8" cy="-14.2" r=".7" fill={INK} stroke="none" />
        <ellipse cx="17" cy="-19" rx="2.6" ry="1.4" fill="#6b7188" transform="rotate(-24 17 -19)" />
        <circle cx="22.6" cy="-19.6" r="1.1" fill={INK} stroke="none" /><circle cx="23" cy="-20" r=".4" fill="#fff" stroke="none" />
      </g>
    </g>
  );
}

export function Turtle() {
  return (
    <g {...st}>
      <path d="M-11 -4 L-15 -3 L-11 -2Z" fill="#7cc28a" />
      {[-7, 5].map((x) => <ellipse key={x} className="tl" cx={x} cy="-1.4" rx="3.2" ry="1.8" fill="#7cc28a" />)}
      <path d="M-12 -4 C-12 -16 12 -16 12 -4Z" fill="#4fa05f" />
      <path d="M-6 -5 L-4 -11 H4 L6 -5 M-4 -11 L0 -15 L4 -11" fill="none" stroke="#2f7d44" strokeWidth=".7" />
      <path d="M-11 -4 H12" stroke="#2f7d44" strokeWidth=".8" />
      <g className="thead"><circle cx="14.4" cy="-6.4" r="3.4" fill="#8fd29b" /><circle cx="15.6" cy="-7.2" r=".7" fill={INK} stroke="none" /><path d="M15.4 -5 q1 .6 1.8 0" fill="none" strokeWidth=".4" /></g>
    </g>
  );
}

export function Croc() {
  return (
    <g {...st}>
      <path className="tail" d="M-20 -6 C-30 -6 -34 -2 -38 -4 C-33 -1 -26 2 -20 0Z" fill="#4aa85f" />
      {[-12, 6].map((x) => <rect key={x} x={x} y="-1" width="5" height="4.6" rx="1.6" fill="#3f9a55" />)}
      <path d="M-22 -5 C-22 -12 6 -13 14 -9 L14 0 C6 2 -22 2 -22 -5Z" fill="#58c070" />
      {[-16, -10, -4, 2, 8].map((x) => <path key={x} d={`M${x} -11 l2 -2.6 l2 2.4`} fill="#3f9a55" />)}
      <path d="M-14 0 C-6 2 4 2 12 0" stroke="#bfe8b8" strokeWidth="2" fill="none" opacity=".6" />
      <path className="jaw-up" d="M10 -10 C20 -11 30 -9 36 -6 L36 -3 L10 -3Z" fill="#58c070" />
      <path d="M14 -3 l1.4 2.6 l1.4 -2.6 M20 -3 l1.4 2.6 l1.4 -2.6 M26 -3 l1.4 2.6 l1.4 -2.6 M32 -3 l1.2 2.4 l1.2 -2.4" fill="#fff" strokeWidth=".4" />
      <g className="jaw-dn"><path d="M10 -1 L36 -2 C36 1 30 3.4 22 3.4 C16 3.4 12 2 10 1Z" fill="#7fd08a" /></g>
      <circle cx="12.6" cy="-11" r="2.4" fill="#fff" /><circle cx="13.4" cy="-11" r="1.1" fill={INK} stroke="none" />
      <circle cx="33.6" cy="-8.6" r=".7" fill={INK} stroke="none" />
    </g>
  );
}

export function Boat() {
  return (
    <g {...st}>
      <path d="M-20 0 H20 L14 8 H-14Z" fill="#b5703e" />
      <path d="M-18 2.4 H18" stroke="#8a5630" strokeWidth=".7" fill="none" />
      <line x1="0" y1="0" x2="0" y2="-36" strokeWidth="1.2" />
      <g className="sail">
        <path d="M1.6 -34 C14 -28 18 -14 17 -3 L1.6 -3Z" fill="#fff" />
        <path d="M-1.6 -30 C-10 -24 -13 -14 -12 -4 L-1.6 -4Z" fill="#fff8e8" />
        <path d="M5 -20 l1.6 3.2 l3.6 .5 l-2.6 2.5 l.6 3.5 l-3.2 -1.7 l-3.2 1.7 l.6 -3.5 l-2.6 -2.5 l3.6 -.5Z" fill={C.red} stroke="none" />
      </g>
      <path d="M0 -36 L9 -33 L0 -30Z" fill={C.red} />
    </g>
  );
}

export function Flame() {
  return (
    <g>
      <path className="flame-a" d="M0 0 C-10 -2 -12 -12 -6 -20 C-6 -14 -3 -13 -2 -16 C-1 -24 4 -28 4 -36 C12 -28 14 -18 10 -8 C9 -3 5 0 0 0Z" fill="#ff7a2f" stroke={INK} strokeWidth=".7" strokeLinejoin="round" />
      <path className="flame-b" d="M0 0 C-5 -1 -6 -7 -2 -11 C-1 -8 1 -8 2 -11 C3 -15 5 -17 5 -20 C9 -15 9 -8 6 -3 C4 -1 2 0 0 0Z" fill="#ffd24a" />
    </g>
  );
}

export function Dog() {
  return (
    <g {...st}>
      <path className="tail" d="M-8 -8 C-12 -10 -12 -14 -10 -16" fill="none" stroke="#c98a5a" strokeWidth="2.4" />
      {[-5, -1.6, 4, 7].map((x, i) => <rect key={i} x={x - 1.4} y="-5" width="2.8" height="5.4" rx="1.2" fill={i % 2 ? '#b97a4a' : '#c98a5a'} />)}
      <ellipse cx="0" cy="-8" rx="9.4" ry="5" fill="#d9995f" />
      <circle cx="10" cy="-12.4" r="5" fill="#d9995f" />
      <ellipse cx="14" cy="-10.6" rx="3.4" ry="2.4" fill="#f3d2ac" />
      <path d="M5.6 -15 C3 -14 3 -8 6 -8 C7 -10 7 -13 6.6 -15Z" fill="#8a5630" />
      <circle cx="11" cy="-13.6" r=".9" fill={INK} stroke="none" /><circle cx="16" cy="-11.4" r="1" fill={INK} stroke="none" />
    </g>
  );
}

export function Fly() {
  return (
    <g {...st} strokeWidth=".5">
      <g className="wing"><ellipse cx="-1.2" cy="-3.4" rx="2.4" ry="3.2" fill="#d8f3ff" opacity=".9" /><ellipse cx="1.8" cy="-3.2" rx="2.2" ry="3" fill="#d8f3ff" opacity=".9" /></g>
      <path className="legs" d="M-2 1.6 l-1.6 2.6 M0 1.8 v3 M2 1.6 l1.6 2.6" fill="none" />
      <ellipse cx="0" cy="0" rx="3.8" ry="2.6" fill="#3a2e39" />
      <circle cx="3.6" cy="-.4" r="2" fill="#3a2e39" />
      <circle cx="4.6" cy="-1" r=".8" fill="#ff5c7a" stroke="none" />
    </g>
  );
}

/** Hiện dần một vật bằng cách phóng to từ 0 quanh điểm (ox, oy). Toạ độ gốc tính trong hệ toạ độ của phần tử CHA (svgOrigin của GSAP),
 *  tức là toạ độ cục bộ của nhóm G bọc ngoài. Dùng gốc cố định vì gốc theo phần trăm của GSAP bị lệch khi scale bắt đầu từ 0. */
export const pop = (tl, sel, ox, oy, at, dur = 0.4) => tl.fromTo(sel, { scale: 0, opacity: 0, svgOrigin: `${ox} ${oy}` }, { scale: 1, opacity: 1, duration: dur, ease: 'back.out(2.4)', svgOrigin: `${ox} ${oy}` }, at);
