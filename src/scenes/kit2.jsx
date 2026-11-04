import { INK, C, st } from './kit.jsx';

/* ============================================================
   BỘ VẼ MỚI: học sinh, lớp học, đồ dùng học tập.
   Học sinh Kid có chân ở (0,0), cao khoảng 40 đơn vị.
   Các bộ phận có class `${p}-armL`, `${p}-armR`, `${p}-legL`, `${p}-legR`,
   `${p}-head`, `${p}-eyes`, `${p}-mS` (miệng cười), `${p}-mO` (miệng há).
   Khi tween xoay, dùng transformOrigin '50% 0%' (khớp vai, khớp hông).
   ============================================================ */

export function Kid({ p = 'k', shirt = '#4f8cff', pants = '#3b4a7a', skin = '#ffd9b8', hair = '#2b2d42', glasses = false, girl = false, handL = null, handR = null }) {
  return (
    <g>
      <ellipse cx="0" cy="0.6" rx="9.5" ry="2" fill="#1f2a4a" opacity=".2" />
      {/* chân */}
      {[-3, 3].map((x, i) => (
        <g key={i} transform={`translate(${x} -11)`}>
          <g className={`${p}-leg${i ? 'R' : 'L'}`}>
            <rect x="-1.9" y="0" width="3.8" height="10" rx="1.6" fill={pants} {...st} strokeWidth=".6" />
            <rect x={i ? 0.2 : -1.9} y="0.4" width="1.7" height="8.6" rx=".8" fill="#000" opacity=".12" />
            <path d={i ? 'M-2.5 9.8 H4.2 Q4.6 12 2.4 12 H-1.6 Q-2.6 12 -2.5 9.8Z' : 'M2.5 9.8 H-4.2 Q-4.6 12 -2.4 12 H1.6 Q2.6 12 2.5 9.8Z'} fill="#fff" {...st} strokeWidth=".6" />
            <path d={i ? 'M-2.3 11.4 H4.4' : 'M2.3 11.4 H-4.4'} stroke={shirt} strokeWidth=".9" strokeLinecap="round" />
          </g>
        </g>
      ))}
      {/* thân */}
      <rect x="-6.2" y="-24" width="12.4" height="14" rx="4" fill={shirt} {...st} strokeWidth=".7" />
      <path d="M2.4 -24 H2.2 A4 4 0 0 1 6.2 -20 V-14 A4 4 0 0 1 2.2 -10 H2.4Z" fill="#000" opacity=".12" />
      <path d="M-3.4 -23.8 Q0 -20 3.4 -23.8" fill="#fff" stroke={INK} strokeWidth=".5" opacity=".95" />
      <path d="M-5.6 -11.4 H5.6" stroke="#000" strokeWidth=".6" opacity=".18" />
      {girl && <path d="M-6.2 -12 L6.2 -12 L8 -9 L-8 -9Z" fill={pants} {...st} strokeWidth=".6" />}
      {/* tay */}
      {[-1, 1].map((d, i) => (
        <g key={i} transform={`translate(${d * 6.4} -21.5)`}>
          <g className={`${p}-arm${i ? 'R' : 'L'}`}>
            <rect x="-20" y="0" width="40" height="30" fill="none" stroke="none" pointerEvents="none" />
            <rect x="-1.8" y="0" width="3.6" height="10.5" rx="1.8" fill={shirt} {...st} strokeWidth=".6" />
            <rect x="-1.8" y="7.4" width="3.6" height="1.2" fill="#fff" opacity=".7" />
            <circle cx="0" cy="11.2" r="2.2" fill={skin} {...st} strokeWidth=".6" />
            <circle cx={d * 1.5} cy="10.4" r=".7" fill="#000" opacity=".1" />
            {(i ? handR : handL) && <g transform="translate(0 11.2)">{i ? handR : handL}</g>}
          </g>
        </g>
      ))}
      {/* đầu */}
      <g transform="translate(0 -31)">
        <g className={`${p}-head`}>
          {girl && <><circle cx="-8.6" cy="1.6" r="2.7" fill={hair} {...st} strokeWidth=".6" /><circle cx="8.6" cy="1.6" r="2.7" fill={hair} {...st} strokeWidth=".6" /><circle cx="-8.6" cy="-1" r="1.3" fill="#ef476f" /><circle cx="8.6" cy="-1" r="1.3" fill="#ef476f" /></>}
          <ellipse cx="-8.4" cy="2" rx="1.6" ry="2" fill={skin} {...st} strokeWidth=".6" />
          <ellipse cx="8.4" cy="2" rx="1.6" ry="2" fill={skin} {...st} strokeWidth=".6" />
          <circle r="8.6" fill={skin} {...st} />
          <path d="M-6 6 Q0 9.2 6 6 Q0 8 -6 6Z" fill="#000" opacity=".08" />
          <path d="M-8.6 -1 C-9.6 -10 -3 -11.4 1 -10.6 C6.6 -11.2 9.8 -7 8.6 -1 C7.4 -4.2 4 -6.2 -.4 -4.4 C-3.4 -6 -6.4 -4.4 -8.6 -1Z" fill={hair} {...st} strokeWidth=".6" />
          <path d="M-5 -8.6 Q-2.4 -9.6 .6 -9" fill="none" stroke="#fff" strokeWidth=".9" strokeLinecap="round" opacity=".35" />
          <g className={`${p}-eyes`}>
            <ellipse cx="-3.2" cy="1" rx="1.3" ry="1.5" fill={INK} />
            <ellipse cx="3.2" cy="1" rx="1.3" ry="1.5" fill={INK} />
            <circle cx="-2.8" cy=".4" r=".5" fill="#fff" /><circle cx="3.6" cy=".4" r=".5" fill="#fff" />
          </g>
          <path d="M-4.8 -1.8 Q-3.2 -2.8 -1.8 -1.8 M1.8 -1.8 Q3.2 -2.8 4.8 -1.8" fill="none" stroke={hair} strokeWidth=".6" strokeLinecap="round" />
          {glasses && <g fill="#bfe6ff" fillOpacity=".25" stroke={INK} strokeWidth=".6"><circle cx="-3.2" cy="1" r="2.7" /><circle cx="3.2" cy="1" r="2.7" /><path d="M-0.5 1 H0.5" fill="none" /></g>}
          <path d="M-.5 2.8 Q0 3.4 .5 2.8" fill="none" stroke="#c98a6a" strokeWidth=".5" strokeLinecap="round" />
          <ellipse cx="-5.6" cy="3.6" rx="1.6" ry="1" fill={C.pink} opacity=".75" />
          <ellipse cx="5.6" cy="3.6" rx="1.6" ry="1" fill={C.pink} opacity=".75" />
          <path className={`${p}-mS`} d="M-2.4 4.6 Q0 6.8 2.4 4.6" fill="none" stroke={INK} strokeWidth=".75" strokeLinecap="round" />
          <ellipse className={`${p}-mO`} cx="0" cy="5.2" rx="1.7" ry="2.1" fill="#7a1f2b" opacity="0" />
        </g>
      </g>
    </g>
  );
}

/** Đi bộ: chân và tay đung đưa trong khoảng thời gian dur. Trả về thời điểm kết thúc. */
export function walkCycle(tl, p, at, dur, swing = 26) {
  const half = 0.22;
  const n = Math.max(1, Math.round(dur / half));
  ['L', 'R'].forEach((s, i) => {
    tl.fromTo(`.${p}-leg${s}`, { rotation: i ? -swing : swing, transformOrigin: '50% 0%' }, { rotation: i ? swing : -swing, duration: half, repeat: n - 1, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 0%' }, at);
    tl.fromTo(`.${p}-arm${s}`, { rotation: i ? swing : -swing, transformOrigin: '50% 0%' }, { rotation: i ? -swing : swing, duration: half, repeat: n - 1, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 0%' }, at);
  });
  const end = at + n * half;
  tl.to([`.${p}-legL`, `.${p}-legR`, `.${p}-armL`, `.${p}-armR`], { rotation: 0, duration: 0.15, transformOrigin: '50% 0%' }, end);
  return end;
}

/** Đổi miệng: kind = 'O' hoặc 'S'. */
export function mouth(tl, p, kind, at) {
  tl.set(`.${p}-mO`, { opacity: kind === 'O' ? 1 : 0 }, at);
  tl.set(`.${p}-mS`, { opacity: kind === 'S' ? 1 : 0 }, at);
}

export const Room = ({ wall = '#e6ebff', floor = '#d6aa7d', fy = 68, board = false, win = false, dark = false }) => (
  <>
    <defs>
      <linearGradient id="roomShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" stopOpacity=".5" /><stop offset="1" stopColor="#000000" stopOpacity=".07" /></linearGradient>
    </defs>
    <rect className="room-wall" width="160" height="90" fill={wall} />
    <rect width="160" height={fy} fill="url(#roomShade)" />
    <rect className="room-floor" y={fy} width="160" height={90 - fy} fill={floor} />
    {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <path key={i} d={`M${i * 22 - 4} 90 L${i * 22 + 18 - (i - 3.5) * 2} ${fy}`} stroke="#00000014" strokeWidth=".6" fill="none" />)}
    <path d={`M0 ${fy + (90 - fy) * 0.45} H160 M0 ${fy + (90 - fy) * 0.8} H160`} stroke="#00000010" strokeWidth=".6" />
    <rect y={fy} width="160" height="1.2" fill="#00000022" />
    <rect y={fy - 3} width="160" height="3" fill={dark ? '#00000030' : '#ffffff55'} />
    {win && (
      <g transform="translate(118 10)">
        <rect width="30" height="24" rx="2" fill="#bfe6ff" stroke={INK} strokeWidth=".8" />
        <path d="M15 0V24M0 12H30" stroke={INK} strokeWidth=".8" />
        <path d="M3 3 L12 3 L3 11Z" fill="#ffffff" opacity=".45" />
        <rect x="-2" y="24" width="34" height="2.6" rx="1" fill="#c98a52" stroke={INK} strokeWidth=".6" />
        <path d="M-3 -1 Q3 12 -2 25 H3 Q7 12 3 -1Z M33 -1 Q27 12 32 25 H27 Q23 12 27 -1Z" fill="#ff8fab" opacity=".85" />
      </g>
    )}
    {board && (
      <g transform="translate(14 10)">
        <rect width="58" height="30" rx="1.5" fill="#2f6b57" stroke="#a0643c" strokeWidth="2" />
      </g>
    )}
  </>
);

export const Desk = ({ w = 36, h = 14 }) => (
  <g {...st} strokeWidth=".8">
    <rect x={-w / 2 + 2} y="2" width="3" height={h} fill="#8a5a36" />
    <rect x={w / 2 - 5} y="2" width="3" height={h} fill="#8a5a36" />
    <rect x={-w / 2} y="0" width={w} height="3.2" rx="1" fill="#c98a52" />
  </g>
);

export const Book = ({ c = '#ef476f', w = 12, h = 3.4 }) => (
  <g {...st} strokeWidth=".6">
    <rect x={-w / 2} y={-h} width={w} height={h} rx=".6" fill={c} />
    <rect x={-w / 2 + 1} y={-h + 0.8} width={w - 2} height={h - 1.6} fill="#fff7e0" stroke="none" />
  </g>
);

export const BookOpen = ({ s = 1 }) => (
  <g {...st} strokeWidth=".7" transform={`scale(${s})`}>
    <path d="M0 -8 C-6 -10 -12 -9 -14 -7 V8 C-12 6 -6 6 0 8Z" fill="#fff" />
    <path d="M0 -8 C6 -10 12 -9 14 -7 V8 C12 6 6 6 0 8Z" fill="#f4f1ff" />
    <path d="M-10 -4 H-3 M-10 0 H-3 M-10 4 H-3 M3 -4 H10 M3 0 H10 M3 4 H10" stroke="#9aa3c7" strokeWidth=".5" />
  </g>
);

export const BookClosed = ({ c = '#4f8cff', s = 1 }) => (
  <g {...st} strokeWidth=".7" transform={`scale(${s})`}>
    <rect x="-8" y="-11" width="16" height="22" rx="1.5" fill={c} />
    <rect x="-8" y="-11" width="3" height="22" rx="1" fill="#00000030" stroke="none" />
    <rect x="-3" y="-6" width="9" height="5" rx=".8" fill="#fff7e0" stroke="none" />
  </g>
);

export const Phone = ({ s = 1, screen = '#7dd3fc' }) => (
  <g {...st} strokeWidth=".7" transform={`scale(${s})`}>
    <rect x="-5" y="-9" width="10" height="18" rx="2" fill="#2b2d42" />
    <rect x="-4" y="-7" width="8" height="13" rx=".8" fill={screen} stroke="none" />
    <circle cy="7.6" r=".8" fill="#fff" stroke="none" />
  </g>
);

export const Trophy = ({ s = 1 }) => (
  <g {...st} strokeWidth=".7" transform={`scale(${s})`}>
    <path d="M-6 -9 H6 V-3 C6 2 3 4 0 4 C-3 4 -6 2 -6 -3Z" fill="#ffd166" />
    <path d="M-6 -7 C-11 -7 -10 -1 -5 -1 M6 -7 C11 -7 10 -1 5 -1" fill="none" />
    <rect x="-1.2" y="4" width="2.4" height="4" fill="#f4a521" />
    <rect x="-4" y="8" width="8" height="3" rx="1" fill="#a0643c" />
    <path d="M-3 -6 V-2" stroke="#fff" strokeWidth="1" opacity=".7" />
  </g>
);

export const Bulb = ({ s = 1, on = true }) => (
  <g transform={`scale(${s})`}>
    {on && <circle r="9" fill="#ffe27a" opacity=".45" />}
    <path d="M0 -8 C-5 -8 -7 -4 -7 -1 C-7 3 -4 4 -4 7 H4 C4 4 7 3 7 -1 C7 -4 5 -8 0 -8Z" fill={on ? '#ffd23f' : '#d8dcef'} {...st} strokeWidth=".7" />
    <rect x="-3" y="7" width="6" height="3" rx="1" fill="#9aa3c7" {...st} strokeWidth=".6" />
    <path d="M-2.4 -4 Q-3.4 -1 -2.6 1" fill="none" stroke="#fff" strokeWidth=".8" opacity=".8" strokeLinecap="round" />
  </g>
);

export const Sweat = ({ s = 1 }) => (
  <path d="M0 -3.5 C2.6 0 3 2 0 3.6 C-3 2 -2.6 0 0 -3.5Z" fill="#7dd3fc" stroke={INK} strokeWidth=".4" transform={`scale(${s})`} />
);

export const Exclaim = ({ s = 1, fill = '#ef476f' }) => (
  <g transform={`scale(${s})`} {...st} strokeWidth=".5">
    <path d="M-2 -8 H2 L1.3 2 H-1.3Z" fill={fill} />
    <circle cy="5" r="1.7" fill={fill} />
  </g>
);

export const Question = ({ s = 1, fill = '#7c5cff' }) => (
  <text textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="14" fill={fill} stroke={INK} strokeWidth=".8" paintOrder="stroke" transform={`scale(${s})`}>?</text>
);

export const Bubble = ({ w = 26, h = 16, tail = 'left', fill = '#fff' }) => (
  <g {...st} strokeWidth=".8">
    <rect x={-w / 2} y={-h / 2} width={w} height={h} rx={h / 2.4} fill={fill} />
    <path d={tail === 'left' ? `M${-w / 4} ${h / 2 - 0.4} L${-w / 3} ${h / 2 + 5} L${-w / 8} ${h / 2 - 0.4}Z` : `M${w / 4} ${h / 2 - 0.4} L${w / 3} ${h / 2 + 5} L${w / 8} ${h / 2 - 0.4}Z`} fill={fill} />
    <rect x={tail === 'left' ? -w / 4 : w / 8} y={h / 2 - 1.6} width={w / 8} height="2.6" fill={fill} stroke="none" />
  </g>
);

export const Heart = ({ s = 1, fill = '#ff4d6d' }) => (
  <path d="M0 4 C-8 -2 -5 -8 0 -4 C5 -8 8 -2 0 4Z" fill={fill} {...st} strokeWidth=".6" transform={`scale(${s})`} />
);

export const Star = ({ s = 1, fill = '#ffd166' }) => (
  <path d="M0 -6 L1.8 -1.8 L6.2 -1.5 L2.8 1.4 L3.9 5.8 L0 3.3 L-3.9 5.8 L-2.8 1.4 L-6.2 -1.5 L-1.8 -1.8Z" fill={fill} {...st} strokeWidth=".6" transform={`scale(${s})`} />
);

/** Đồng hồ treo tường. Kim giờ `.${p}-hh`, kim phút `.${p}-mh`. */
export const WallClock = ({ p = 'wc', r = 8 }) => (
  <g>
    <circle r={r} fill="#fff" {...st} strokeWidth="1" />
    {Array.from({ length: 12 }, (_, i) => (
      <line key={i} x1="0" y1={-r + 1} x2="0" y2={-r + (i % 3 === 0 ? 2.8 : 1.9)} stroke={INK} strokeWidth=".5" transform={`rotate(${i * 30})`} />
    ))}
    <line className={`${p}-hh`} x1="0" y1="0" x2="0" y2={-r * 0.5} stroke={INK} strokeWidth="1.1" strokeLinecap="round" />
    <line className={`${p}-mh`} x1="0" y1="0" x2="0" y2={-r * 0.78} stroke="#ef476f" strokeWidth=".8" strokeLinecap="round" />
    <circle r="1" fill={INK} />
  </g>
);

export const Scallion = ({ s = 1 }) => (
  <g {...st} strokeWidth=".7" transform={`scale(${s})`}>
    {[-5, 0, 5].map((x, i) => (
      <path key={i} d={`M${x} 6 C${x * 1.8} -2 ${x * 2.3} -8 ${x * 2.8} -13`} fill="none" stroke="#2f9e6a" strokeWidth="2.6" />
    ))}
    <path d="M-5 6 C-6 2 6 2 5 6 C4 10 -4 10 -5 6Z" fill="#f4f7ee" />
    <path d="M-1 7 C-2 11 -2 13 -3 14 M1 7 C2 11 2 13 3 14 M0 8 V14" stroke="#cfd8c0" strokeWidth=".6" fill="none" />
  </g>
);

export const Ball = ({ s = 1 }) => (
  <g transform={`scale(${s})`} {...st} strokeWidth=".7">
    <circle r="6" fill="#ff9f43" />
    <path d="M-6 0 H6 M0 -6 V6 M-4.2 -4.2 Q0 0 -4.2 4.2 M4.2 -4.2 Q0 0 4.2 4.2" fill="none" strokeWidth=".6" />
  </g>
);

export const Board = ({ s = 1 }) => (
  <g transform={`scale(${s})`} {...st} strokeWidth=".7">
    <rect x="-11" y="-8" width="22" height="16" rx="1.5" fill="#fff" />
    <rect x="-8" y="0" width="3" height="5" fill="#4f8cff" stroke="none" />
    <rect x="-3.5" y="-3" width="3" height="8" fill="#ef476f" stroke="none" />
    <rect x="1" y="-1" width="3" height="6" fill="#34d399" stroke="none" />
    <path d="M6 5 L9 -4" stroke="#ffb020" strokeWidth="1.2" fill="none" />
    <path d="M-1 8 V12 M-4 12 H2" stroke={INK} fill="none" />
  </g>
);

export const Cert = ({ s = 1, n = '10' }) => (
  <g transform={`scale(${s})`} {...st} strokeWidth=".6">
    <rect x="-8" y="-6" width="16" height="12" rx="1" fill="#fff7e0" />
    <text y="1.5" textAnchor="middle" dominantBaseline="central" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="8" fill="#ef476f" stroke="none">{n}</text>
    <circle cx="6" cy="5" r="2.6" fill="#ffd166" />
  </g>
);
