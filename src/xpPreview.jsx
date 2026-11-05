import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import './styles.css';
import { XP_SCENES } from './scenes/xpIndex.js';

/* Công cụ dev: /xp-preview.html (lưới mọi cảnh) hoặc /xp-preview.html?k=caukien (một cảnh lớn). Không nằm trong bản build. */
const k = new URLSearchParams(location.search).get('k');
const Box = ({ id, big }) => {
  const S = XP_SCENES[id];
  return (
    <div style={{ width: big ? 960 : 256, margin: 8, color: '#fff', font: '12px system-ui' }}>
      <div style={{ position: 'relative', aspectRatio: '16/9', background: '#0b0a24', borderRadius: 8, overflow: 'hidden' }}><S running /></div>
      <div>{id}</div>
    </div>
  );
};
createRoot(document.getElementById('root')).render(
  <div style={{ display: 'flex', flexWrap: 'wrap' }}>{(k ? k.split(',') : Object.keys(XP_SCENES)).map((id, _, a) => <Box key={id} id={id} big={!!k && a.length === 1} />)}</div>,
);

/* ?t=4 : dừng mọi cảnh và nhảy tới giây thứ 4 của vòng lặp (để chụp màn hình giữa chừng). */
const t = new URLSearchParams(location.search).get('t');
if (t !== null) setTimeout(() => gsap.globalTimeline.getChildren(false, false, true).forEach((c) => { c.pause(); c.seek(Number(t)); }), 400);
