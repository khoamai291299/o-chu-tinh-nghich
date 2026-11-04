import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const INK = '#2b2d42';
const SK = { stroke: INK, strokeWidth: 2.4, strokeLinejoin: 'round', strokeLinecap: 'round' };

function Ears({ kind }) {
  switch (kind) {
    case 'meo':
      return (<><path d="M20 40 L22 12 L46 28Z" fill="#ffb86b" {...SK} /><path d="M80 40 L78 12 L54 28Z" fill="#ffb86b" {...SK} /><path d="M25 33 L26 19 L38 28Z" fill="#ff9aa8" /><path d="M75 33 L74 19 L62 28Z" fill="#ff9aa8" /></>);
    case 'cho':
      return (<><ellipse cx="17" cy="48" rx="11" ry="22" fill="#8a5a2b" transform="rotate(14 17 48)" {...SK} /><ellipse cx="83" cy="48" rx="11" ry="22" fill="#8a5a2b" transform="rotate(-14 83 48)" {...SK} /></>);
    case 'tho':
      return (<><ellipse cx="36" cy="20" rx="8.5" ry="21" fill="#fff" {...SK} /><ellipse cx="64" cy="20" rx="8.5" ry="21" fill="#fff" {...SK} /><ellipse cx="36" cy="22" rx="4" ry="14" fill="#ffb3c6" /><ellipse cx="64" cy="22" rx="4" ry="14" fill="#ffb3c6" /></>);
    case 'gau':
      return (<><circle cx="24" cy="30" r="12" fill="#b07a4a" {...SK} /><circle cx="76" cy="30" r="12" fill="#b07a4a" {...SK} /><circle cx="24" cy="30" r="6" fill="#e7b98a" /><circle cx="76" cy="30" r="6" fill="#e7b98a" /></>);
    case 'cao':
      return (<><path d="M18 42 L20 8 L47 27Z" fill="#ff8a3d" {...SK} /><path d="M82 42 L80 8 L53 27Z" fill="#ff8a3d" {...SK} /><path d="M22 33 L22 17 L36 27Z" fill="#3b2a20" /><path d="M78 33 L78 17 L64 27Z" fill="#3b2a20" /></>);
    case 'trung':
      return (<><circle cx="23" cy="29" r="12" fill="#2b2d42" {...SK} /><circle cx="77" cy="29" r="12" fill="#2b2d42" {...SK} /></>);
    case 'ho':
      return (<><circle cx="24" cy="30" r="11" fill="#ffc34d" {...SK} /><circle cx="76" cy="30" r="11" fill="#ffc34d" {...SK} /><circle cx="24" cy="30" r="5" fill="#fff3d1" /><circle cx="76" cy="30" r="5" fill="#fff3d1" /></>);
    default:
      return (<><circle cx="29" cy="30" r="13" fill="#7bd96f" {...SK} /><circle cx="71" cy="30" r="13" fill="#7bd96f" {...SK} /></>);
  }
}

const FACE = { meo: '#ffb86b', cho: '#e9b87a', tho: '#fff', gau: '#c88d58', cao: '#ff8a3d', trung: '#fff', ho: '#ffc34d', ech: '#7bd96f' };

export default function Chibi({ kind = 'meo', size = '100%', happy = false }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.bob', { y: -2.5, duration: 1 + Math.random() * 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.to('.eyes', { scaleY: 0.1, svgOrigin: '50 56', duration: 0.08, yoyo: true, repeat: -1, repeatDelay: 2.5 + Math.random() * 2 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <svg ref={ref} viewBox="0 0 100 100" width={size} height={size} style={{ display: 'block' }} aria-hidden="true">
      <g className="bob">
        <Ears kind={kind} />
        <circle cx="50" cy="57" r="35" fill={FACE[kind]} {...SK} />
        {kind === 'ho' && <g stroke={INK} strokeWidth="3" strokeLinecap="round"><path d="M50 24 V34" /><path d="M38 27 L41 35" /><path d="M62 27 L59 35" /></g>}
        {kind === 'cao' && <path d="M16 64 Q34 58 50 80 Q66 58 84 64 Q70 92 50 92 Q30 92 16 64Z" fill="#fff" />}
        {kind === 'trung' && <><ellipse cx="35" cy="56" rx="9" ry="11" fill={INK} transform="rotate(20 35 56)" /><ellipse cx="65" cy="56" rx="9" ry="11" fill={INK} transform="rotate(-20 65 56)" /></>}
        {kind === 'gau' && <ellipse cx="50" cy="70" rx="14" ry="11" fill="#e7b98a" />}
        <g className="eyes">
          <circle cx="36" cy="56" r="5" fill={kind === 'trung' ? '#fff' : INK} /><circle cx="64" cy="56" r="5" fill={kind === 'trung' ? '#fff' : INK} />
          <circle cx="37.6" cy="54.2" r="1.7" fill={kind === 'trung' ? INK : '#fff'} /><circle cx="65.6" cy="54.2" r="1.7" fill={kind === 'trung' ? INK : '#fff'} />
        </g>
        <ellipse cx="25" cy="69" rx="6" ry="3.6" fill="#ff8fa3" opacity=".7" /><ellipse cx="75" cy="69" rx="6" ry="3.6" fill="#ff8fa3" opacity=".7" />
        <ellipse cx="50" cy="66" rx="3.4" ry="2.4" fill={kind === 'tho' || kind === 'meo' ? '#ff7a93' : INK} />
        {happy
          ? <path d="M41 72 Q50 84 59 72Z" fill="#ff6b81" {...SK} strokeWidth="2" />
          : <path d="M43 72 Q47 77 50 72 Q53 77 57 72" fill="none" {...SK} strokeWidth="2.2" />}
        {kind === 'meo' && <g stroke={INK} strokeWidth="1.6" strokeLinecap="round"><path d="M10 62 L26 65" /><path d="M10 72 L26 71" /><path d="M90 62 L74 65" /><path d="M90 72 L74 71" /></g>}
        {kind === 'ech' && <><circle cx="29" cy="30" r="7" fill="#fff" {...SK} strokeWidth="2" /><circle cx="71" cy="30" r="7" fill="#fff" {...SK} strokeWidth="2" /><circle cx="30" cy="31" r="3.2" fill={INK} /><circle cx="70" cy="31" r="3.2" fill={INK} /></>}
      </g>
    </svg>
  );
}
