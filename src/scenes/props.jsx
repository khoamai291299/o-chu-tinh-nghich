import { C, INK, st } from './kit.jsx';

/* ---------- Chuột, chĩnh gạo, phô mai ---------- */
export function Mouse() {
  const fur = '#b8bcc9';
  return (
    <g {...st}>
      <path className="tail" d="M-9 3 C-17 3 -16 -5 -22 -3" fill="none" stroke={C.pink} strokeWidth="1.3" />
      <ellipse cx="-1" cy="1.5" rx="10" ry="6.4" fill={fur} />
      <path d="M6 -2 L15 1.4 L6 6.4Z" fill={fur} />
      <circle cx="15.2" cy="1.6" r="1.2" fill={C.pink} />
      <circle cx="5.4" cy="-5" r="4.2" fill={fur} />
      <circle cx="5.4" cy="-5" r="2.4" fill={C.pink} stroke="none" />
      <circle cx="8.6" cy="0" r=".9" fill={INK} stroke="none" />
      <path d="M12 2.4 L17 1.2 M12 3.4 L17 5" strokeWidth=".4" fill="none" />
      <ellipse className="paw" cx="-5" cy="7.6" rx="2.4" ry="1.3" fill="#9a9eb0" />
      <ellipse className="paw" cx="4" cy="7.6" rx="2.4" ry="1.3" fill="#9a9eb0" />
    </g>
  );
}

export function MouseHead() {
  const fur = '#b8bcc9';
  return (
    <g {...st}>
      <circle cx="-8" cy="-7" r="5" fill={fur} />
      <circle cx="-8" cy="-7" r="2.9" fill={C.pink} stroke="none" />
      <circle cx="8" cy="-7" r="5" fill={fur} />
      <circle cx="8" cy="-7" r="2.9" fill={C.pink} stroke="none" />
      <ellipse cx="0" cy="0" rx="11" ry="9" fill={fur} />
      <ellipse cx="-8" cy="3" rx="4.2" ry="3.6" fill="#cfd3de" stroke="none" />
      <ellipse cx="8" cy="3" rx="4.2" ry="3.6" fill="#cfd3de" stroke="none" />
      <circle cx="-4" cy="-1.5" r="1.3" fill={INK} stroke="none" />
      <circle cx="4" cy="-1.5" r="1.3" fill={INK} stroke="none" />
      <circle cx="0" cy="2" r="1.4" fill={C.pink} />
      <path d="M-2 4.4 Q0 6 2 4.4" fill="none" strokeWidth=".6" />
      <path d="M-11 1 L-17 0 M-11 3 L-17 4 M11 1 L17 0 M11 3 L17 4" strokeWidth=".4" fill="none" />
      <circle cx="-3" cy="9" r=".9" fill="#fffaf0" stroke="none" />
    </g>
  );
}

export function Jar({ lid = false }) {
  return (
    <g {...st}>
      <path d="M-12 -12 C-20 -2 -18 12 -9 19.5 H9 C18 12 20 -2 12 -12Z" fill="#c8814b" />
      <path d="M-16.6 -3 Q0 1 16.6 -3" fill="none" strokeWidth=".5" />
      <path d="M-14 8 Q0 12 14 8" fill="none" strokeWidth=".5" />
      <path d="M-15 -8 C-17 0 -16 6 -13 12" fill="none" stroke="#e8a36a" strokeWidth="1.2" />
      <ellipse cx="0" cy="-12" rx="13" ry="3.8" fill="#8a5630" />
      <g className="rice">
        <path d="M-11 -12 Q-6 -19 0 -19 Q6 -19 11 -12Z" fill="#fffaf0" />
        {[[-5, -15.5], [0, -17], [5, -15], [-1, -14], [7, -13]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r=".7" fill="#e6dcc3" stroke="none" />
        ))}
      </g>
      {lid && (
        <g className="lid">
          <ellipse cx="0" cy="-13" rx="14.6" ry="4.2" fill={C.brown2} />
          <circle cx="0" cy="-17.6" r="2.3" fill={C.brown} />
        </g>
      )}
    </g>
  );
}

export function Cheese() {
  return (
    <g {...st}>
      <path d="M-9 4 L9 4 L9 -2 Q0 -9 -9 -2Z" fill="#ffd34d" />
      <path d="M-9 -2 Q0 -9 9 -2 L12 -4 Q0 -12 -12 -4Z" fill="#ffe27d" />
      <circle cx="-3" cy="0" r="1.4" fill="#f4b61d" stroke="none" />
      <circle cx="4" cy="1.4" r="1.1" fill="#f4b61d" stroke="none" />
      <circle cx="1" cy="-3" r=".8" fill="#f4b61d" stroke="none" />
    </g>
  );
}

/* ---------- Lá khoai, giọt nước ---------- */
export function TaroLeaf() {
  return (
    <g {...st}>
      <path d="M0 24 C-1 14 1 7 0 0" fill="none" stroke="#3f8f5f" strokeWidth="2" />
      <g className="leaf-top">
        <path d="M-28 -2 C-28 -17 -8 -21 0 -14 C8 -21 28 -17 28 -2 C28 13 10 15 0 12.5 C-10 15 -28 13 -28 -2Z" fill="#58c08a" />
        <path d="M0 -1 L-20 -8 M0 -1 L-23 3 M0 -1 L-14 10 M0 -1 L20 -8 M0 -1 L23 3 M0 -1 L14 10 M0 -1 L0 9" stroke="#3f8f5f" strokeWidth=".5" fill="none" />
        <circle cx="0" cy="-1" r="1.6" fill="#3f8f5f" />
        <path d="M-18 -10 Q-8 -15 -2 -12" stroke="#a6ecc4" strokeWidth="1.2" fill="none" />
      </g>
    </g>
  );
}

export function Drop({ s = 1 }) {
  return (
    <g transform={`scale(${s})`}>
      <path d="M0 -4.6 C2.5 -1 3.7 .8 3.7 2.4 A3.7 3.7 0 0 1 -3.7 2.4 C-3.7 .8 -2.5 -1 0 -4.6Z" fill={C.blue} stroke={C.blue2} strokeWidth=".5" />
      <ellipse cx="-1.2" cy="1.4" rx=".8" ry="1.3" fill="#fff" opacity=".7" />
    </g>
  );
}

/* ---------- Trứng, đá ---------- */
export function Egg({ face = false }) {
  return (
    <g {...st}>
      <ellipse cx="0" cy="0" rx="7" ry="9" fill={C.cream} />
      <path d="M-4 -5 Q-5.5 -1 -4.5 2" stroke="#fff" strokeWidth="1.2" fill="none" opacity=".9" />
      {face && (
        <>
          <g className="egg-eyes">
            <circle cx="-2.4" cy="-1" r="1" fill={INK} stroke="none" />
            <circle cx="2.4" cy="-1" r="1" fill={INK} stroke="none" />
          </g>
          <path d="M-2 2.6 Q0 4.6 2 2.6" fill="none" strokeWidth=".6" />
          <ellipse cx="-4.2" cy="2" rx="1.2" ry=".8" fill={C.pink} opacity=".7" stroke="none" />
          <ellipse cx="4.2" cy="2" rx="1.2" ry=".8" fill={C.pink} opacity=".7" stroke="none" />
        </>
      )}
    </g>
  );
}

export function Rock() {
  return (
    <g {...st}>
      <path d="M-15 12 L-17 0 L-9 -10 L3 -13 L13 -7 L17 5 L11 12Z" fill={C.stone2} />
      <path d="M-9 -10 L3 -13 L13 -7 L2 -3 L-8 0Z" fill={C.stone} stroke="none" />
      <path d="M-9 -10 L-8 0 L-17 0 M3 -13 L2 -3 L-8 0 M13 -7 L2 -3" fill="none" strokeWidth=".5" />
      <path d="M-4 12 L-1 6 L7 8 L11 12" fill="none" strokeWidth=".5" opacity=".6" />
      <path d="M-6 -6 L-1 -9 M4 -9 L9 -5" stroke="#fff" strokeWidth=".9" strokeLinecap="round" opacity=".55" fill="none" />
      <path d="M-15 12 L-17 6 Q-12 8 -8 12Z M7 12 Q11 9 14 11 L11 12Z" fill="#7bbf6a" stroke="none" opacity=".9" />
      <path d="M-17 0 L-14 4 L-15 12" fill="none" strokeWidth=".4" opacity=".5" />
    </g>
  );
}

export function EggBroken() {
  return (
    <g {...st}>
      <path d="M-14 4 C-12 -2 -6 -4 -2 -2 C2 -6 10 -4 12 2 C16 3 15 9 9 9 C4 12 -6 12 -10 9 C-15 9 -16 6 -14 4Z" fill="#fff" />
      <circle cx="-1" cy="3.5" r="4" fill="#ffc531" />
      <circle cx="-2.2" cy="2.4" r="1.1" fill="#fff" opacity=".7" stroke="none" />
      <path d="M-14 10 L-10 5 L-7 11 L-3 6 L1 12 L5 6 L9 11 L13 6" fill="none" stroke={INK} strokeWidth=".6" transform="translate(0 4)" />
    </g>
  );
}

/* ---------- Tre ---------- */
export function Bamboo({ h = 60, color = '#b9c76a', dark = '#8a9a3c', leaves = '#a7c957' }) {
  const nodes = [];
  for (let y = -10; y > -h; y -= 12) nodes.push(y);
  return (
    <g {...st}>
      <rect x="-2.4" y={-h} width="4.8" height={h} fill={color} />
      <rect x="-2.4" y={-h} width="1.6" height={h} fill="#fff" opacity=".22" stroke="none" />
      {nodes.map((y) => (
        <g key={y}>
          <rect x="-3" y={y - 0.9} width="6" height="1.8" rx=".9" fill={dark} />
        </g>
      ))}
      <g className="bam-leaves">
        <path d="M0 -50 C-9 -52 -15 -48 -20 -42 C-12 -43 -6 -45 0 -50Z" fill={leaves} transform={`translate(0 ${50 - h})`} />
        <path d="M0 -50 C9 -54 15 -52 21 -46 C13 -46 6 -47 0 -50Z" fill={leaves} transform={`translate(0 ${50 - h})`} />
        <path d="M0 -54 C-5 -60 -4 -66 -1 -70 C3 -65 3 -59 0 -54Z" fill={leaves} transform={`translate(0 ${50 - h})`} />
      </g>
    </g>
  );
}

export function Shoot() {
  return (
    <g {...st}>
      <path d="M-3.4 0 L-2.2 -14 Q0 -22 2.2 -14 L3.4 0Z" fill="#7bd88f" />
      <path d="M-3 -5 H3 M-2.4 -10 H2.4" fill="none" strokeWidth=".5" stroke="#3f9e5a" />
      <path d="M-1.6 -4 Q-1.4 -12 0 -17" stroke="#fff" opacity=".5" strokeWidth=".9" fill="none" />
    </g>
  );
}

/* ---------- Bát cháo, thìa ---------- */
export function Bowl() {
  return (
    <g {...st}>
      <g className="steam" fill="none" stroke="#fff" strokeWidth="1" opacity=".75">
        <path d="M-5 -14 Q-8 -17 -5 -20 Q-2 -23 -5 -26" />
        <path d="M2 -14 Q-1 -17 2 -20 Q5 -23 2 -26" />
      </g>
      <g className="porridge">
        <path d="M-11 -4 Q-9 -13 0 -13 Q9 -13 11 -4Z" fill="#fffaf0" />
        {[[-4, -9], [2, -10], [5, -7], [-1, -6]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".7" fill="#e6dcc3" stroke="none" />)}
      </g>
      <path d="M-14 -5 H14 C14 7 7 13 0 13 C-7 13 -14 7 -14 -5Z" fill="#ffffff" />
      <path d="M-13.6 -1.5 H13.6 M-12.4 2 H12.4" stroke={C.red} strokeWidth="1.4" fill="none" />
      <path d="M-5 13 H5 V15 H-5Z" fill="#e4e6f0" />
    </g>
  );
}

export function Spoon() {
  return (
    <g {...st}>
      <path d="M0 0 L-16 -2" strokeWidth="1.4" />
      <ellipse cx="2.4" cy="0" rx="3.6" ry="2.4" fill="#e8ebf5" />
      <ellipse className="spoon-food" cx="2.4" cy="-1.4" rx="2.6" ry="1.2" fill="#fffaf0" stroke="none" />
    </g>
  );
}

/* ---------- Sắt, đá mài, kim ---------- */
export function Bar() {
  return (
    <g {...st}>
      <rect x="-22" y="-4.6" width="44" height="9.2" rx="1.4" fill="#8d99ae" />
      <rect x="-21.6" y="-4.2" width="43.2" height="3" rx="1.2" fill="#d3dbea" stroke="none" />
      <path d="M-22 4.6 H22" stroke="#6a768e" strokeWidth="1.4" />
    </g>
  );
}

export function Whetstone() {
  return (
    <g {...st}>
      <path d="M-26 6 H26 L28 10 H-28Z" fill="#a98a5e" />
      <rect x="-26" y="-4" width="52" height="10" rx="2" fill="#d9b98a" />
      {[[-18, 0], [-6, 3], [8, -1], [16, 3], [0, -2]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r=".5" fill="#a98a5e" stroke="none" />)}
      <path d="M-24 -2 H24" stroke="#fff" strokeWidth=".8" opacity=".35" fill="none" />
    </g>
  );
}

export function Needle() {
  return (
    <g {...st}>
      <path d="M-22 0 L20 0" stroke="#e9eef9" strokeWidth="2" />
      <path d="M-22 0 L20 0" stroke="#aeb7cc" strokeWidth=".5" />
      <path d="M20 0 L26 0" stroke="#aeb7cc" strokeWidth=".9" />
      <ellipse cx="-18" cy="0" rx="1.1" ry="2.2" fill="#fff" />
      <path className="thread" d="M-18 0 C-20 -8 -8 -12 -2 -6 S10 -2 14 -10" fill="none" stroke={C.red} strokeWidth=".9" />
    </g>
  );
}

export function Calendar({ n = '1' }) {
  return (
    <g {...st}>
      <rect x="-9" y="-10" width="18" height="20" rx="2" fill="#fff" />
      <path d="M-9 -4 V-8 Q-9 -10 -7 -10 H7 Q9 -10 9 -8 V-4Z" fill={C.red} />
      <rect x="-5" y="-12" width="1.8" height="4" rx=".9" fill="#fff" />
      <rect x="3.2" y="-12" width="1.8" height="4" rx=".9" fill="#fff" />
      <text x="0" y="6" textAnchor="middle" fontFamily="'Baloo 2',sans-serif" fontWeight="800" fontSize="10" fill={INK} stroke="none">
        {n}
      </text>
    </g>
  );
}

/* ---------- Mực, đèn, giấy ---------- */
export function InkBottle() {
  return (
    <g {...st}>
      <rect x="-9" y="-6" width="18" height="20" rx="4.5" fill="#1d3557" />
      <rect x="-4.6" y="-11" width="9.2" height="6" fill="#1d3557" />
      <rect x="-5.4" y="-14.4" width="10.8" height="4.4" rx="1" fill={C.brown} />
      <rect x="-5.4" y="2" width="10.8" height="8" rx="1.2" fill="#fff" />
      <path d="M0 3.4 C1.6 5.4 2.2 6.2 2.2 7 A2.2 2.2 0 0 1 -2.2 7 C-2.2 6.2 -1.6 5.4 0 3.4Z" fill={INK} stroke="none" />
      <path d="M-6 -3 Q-6 -6 -3 -5" stroke="#fff" opacity=".45" fill="none" />
    </g>
  );
}

export function Paper({ w = 30, h = 38 }) {
  return (
    <g {...st}>
      <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="1.6" fill="#fffdf6" />
      {[-12, -7, -2, 3, 8, 13].map((y) => (
        <line key={y} x1={-w / 2 + 3} x2={w / 2 - 3} y1={y} y2={y} stroke="#cfd6e8" strokeWidth=".5" />
      ))}
    </g>
  );
}

export function Lamp() {
  return (
    <g {...st}>
      <ellipse cx="0" cy="26" rx="11" ry="3" fill="#6b7694" />
      <path d="M0 24 L0 6 L12 -6" fill="none" stroke="#6b7694" strokeWidth="2.4" />
      <circle cx="0" cy="6" r="2" fill="#8a94b0" />
      <path d="M2 -16 L22 -8 L18 4 L-2 -4Z" fill={C.yellow} transform="rotate(8 10 -6)" />
      <circle cx="19" cy="6" r="4" fill="#fff7c2" stroke="#f4c430" />
    </g>
  );
}

/* ---------- Lá lành, lá rách ---------- */
export function LeafGood() {
  return (
    <g {...st}>
      <path d="M-24 0 C-16 -20 12 -22 28 -2 C12 18 -16 18 -24 0Z" fill="#4cc38a" />
      <path d="M-26 1 Q0 -3 27 -2" fill="none" stroke="#2f9e6a" strokeWidth=".9" />
      <path d="M-8 -1 L-2 -11 M4 -2 L10 -11 M-8 0 L-2 9 M4 -1 L10 8" fill="none" stroke="#2f9e6a" strokeWidth=".5" />
      <path d="M-18 -8 Q-8 -14 0 -13" stroke="#a6ecc4" strokeWidth="1.2" fill="none" />
    </g>
  );
}

export function LeafTorn() {
  return (
    <g {...st}>
      <path d="M-22 0 L-17 -9 L-15 -5 L-9 -14 L-6 -9 L1 -15 L3 -9 L10 -13 L12 -7 L20 -5 L18 -1 L25 2 L16 4 L18 9 L9 8 L5 14 L0 8 L-7 13 L-9 7 L-16 9 L-15 4Z" fill="#c79a62" />
      <path d="M-24 1 Q0 -2 25 2" fill="none" stroke="#8f6a3c" strokeWidth=".8" />
      <circle cx="-3" cy="-3" r="2.4" fill="#fff" opacity=".0" />
      <path d="M-5 0 L-2 6 L2 1" fill="none" stroke="#8f6a3c" strokeWidth=".5" />
      <path d="M8 -2 L11 -8" fill="none" stroke="#8f6a3c" strokeWidth=".5" />
    </g>
  );
}

/* ---------- Giếng ---------- */
export function WellShaft() {
  const rows = [];
  for (let y = 0; y < 90; y += 7) rows.push(y);
  return (
    <g>
      <rect x="0" y="0" width="160" height="90" fill="#2a3763" />
      {rows.map((y, i) => (
        <g key={y} stroke="#1c2547" strokeWidth=".7" opacity=".9">
          <line x1="0" x2="160" y1={y} y2={y} />
          {Array.from({ length: 10 }, (_, k) => {
            const x = k * 18 + (i % 2 ? 9 : 0);
            return <line key={k} x1={x} x2={x} y1={y} y2={y + 7} />;
          })}
        </g>
      ))}
      <rect x="0" y="0" width="160" height="90" fill="url(#wellvig)" />
    </g>
  );
}

/* ---------- Nhân vật bé trai (dùng trong cảnh Ăn cháo đá bát, Đầu gấu) ---------- */
export function ChibiBoy({ bear = false }) {
  return (
    <g {...st}>
      <path d="M-11 14 Q0 9 11 14 L12 30 H-12Z" fill="#3b82f6" />
      <g className="bear-ears" opacity={bear ? 1 : 0}>
        <circle cx="-10" cy="-9.5" r="5" fill="#8a5a3c" />
        <circle cx="-10" cy="-9.5" r="2.6" fill="#d9a27a" stroke="none" />
        <circle cx="10" cy="-9.5" r="5" fill="#8a5a3c" />
        <circle cx="10" cy="-9.5" r="2.6" fill="#d9a27a" stroke="none" />
      </g>
      <circle className="head" cx="0" cy="0" r="12.5" fill={C.skin} />
      <circle className="fur" cx="0" cy="0" r="12.5" fill="#8a5a3c" opacity={bear ? 1 : 0} />
      <path className="hair" d="M-12.5 -2 C-14 -17 14 -17 12.5 -2 C8 -9 -6 -9 -12.5 -2Z" fill={C.dark} opacity={bear ? 0 : 1} />
      <g className="face">
        <circle className="eye-l" cx="-4.6" cy="1" r="1.5" fill={INK} stroke="none" />
        <circle className="eye-r" cx="4.6" cy="1" r="1.5" fill={INK} stroke="none" />
        <ellipse cx="-8" cy="5.4" rx="2.3" ry="1.4" fill={C.pink} opacity=".6" stroke="none" />
        <ellipse cx="8" cy="5.4" rx="2.3" ry="1.4" fill={C.pink} opacity=".6" stroke="none" />
        <path className="mouth" d="M-3 6 Q0 8.6 3 6" fill="none" />
        <ellipse className="mouth-open" cx="0" cy="6.6" rx="2.5" ry="0.1" fill="#7a2e3a" />
      </g>
      <g className="bear-snout" opacity={bear ? 1 : 0}>
        <ellipse cx="0" cy="5.4" rx="6" ry="4.4" fill="#e9c9a6" />
        <ellipse cx="0" cy="3.2" rx="2.2" ry="1.5" fill={INK} stroke="none" />
        <path d="M0 4.6 V6.4 M-2.6 7 Q0 8.8 2.6 7" fill="none" strokeWidth=".6" />
      </g>
    </g>
  );
}
