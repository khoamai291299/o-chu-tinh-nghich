import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, Typography } from 'antd';
import { EyeOutlined, ReloadOutlined, RetweetOutlined, TrophyFilled } from '@ant-design/icons';
import Chibi from './Chibi.jsx';
import Confetti from './Confetti.jsx';
import Score from './Score.jsx';
import { TEAM_COLORS } from '../data/constants.js';
import { TIEBREAK } from '../data/questions.js';
import { shuffle } from '../utils/random.js';
import { sfx } from '../utils/sound.js';

const HEIGHTS = [300, 260, 225, 195];
const SLOT = [1, 0, 2, 3]; // thứ tự hiển thị: hạng 2, hạng 1, hạng 3, hạng 4

export default function Final({ teams, opened, total, onAgain }) {
  useEffect(() => { sfx.win(); }, []);
  const [tie, setTie] = useState(false); // đang mở bảng câu hỏi phụ
  const [bag, setBag] = useState(() => shuffle(TIEBREAK)); // bốc lần lượt, không lặp câu
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  const [champ, setChamp] = useState(null); // đội thắng nhờ câu hỏi phụ
  const sorted = [...teams].sort((a, b) => b.score - a.score || (champ ? (b.id === champ.id) - (a.id === champ.id) : 0));
  const rankOf = (t) => (champ ? sorted.indexOf(t) : sorted.findIndex((x) => x.score === t.score)); // thắng nhờ câu hỏi phụ thì đứng riêng hạng nhất
  const winners = sorted.filter((t) => t.score === sorted[0].score);
  const tied = winners.length > 1 && !champ;
  const nextQ = () => { sfx.open(); setShow(false); if (idx + 1 >= bag.length) { setBag(shuffle(TIEBREAK)); setIdx(0); } else setIdx(idx + 1); };
  const tq = bag[idx];
  const slots = SLOT.map((i) => sorted[i]).filter(Boolean);
  return (
    <div className="screen final">
      <Confetti burst={140} />
      <motion.div className="final-head" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 110, damping: 14 }}>
        <Typography.Text className="final-kicker">{opened >= total ? `Đã mở hết ${total} hộp quà` : `Tổng kết sau ${opened}/${total} hộp quà`}</Typography.Text>
        <Typography.Title className="display final-title">{tied ? `Hòa điểm hạng nhất: ${winners.map((w) => w.name).join(' và ')}` : `Chúc mừng ${champ ? champ.name : winners[0].name}!`}</Typography.Title>
        {champ && <Typography.Text className="final-kicker">Thắng nhờ câu hỏi phụ</Typography.Text>}
      </motion.div>
      <div className="podium">
        {slots.map((t, k) => {
          const r = rankOf(t);
          return (
            <motion.div key={t.id} className="pod" style={{ '--tc': TEAM_COLORS[t.id] }}>
              <motion.div className="pod-who" initial={{ y: -500, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 11, delay: 0.8 + (3 - r) * 0.25 }}>
                {r === 0 && <motion.span className="crown" animate={{ rotate: [-8, 8, -8], y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }}><TrophyFilled /></motion.span>}
                <motion.div className="pod-av" animate={r === 0 ? { y: [0, -12, 0] } : {}} transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}><Chibi kind={t.avatar} happy={r === 0} /></motion.div>
                <b className="pod-name">{t.name}</b>
              </motion.div>
              <motion.div className="pod-bar" initial={{ height: 0 }} animate={{ height: HEIGHTS[r] }} transition={{ type: 'spring', stiffness: 60, damping: 14, delay: 0.3 + (3 - r) * 0.2 }}>
                <span className="pod-rank">{r + 1}</span>
                <Score value={t.score} className="pod-score" />
                <small>điểm</small>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      <div className="screen-foot center">
        {tied && <Button size="large" className="tie-btn" icon={<RetweetOutlined />} onClick={() => { sfx.open(); setTie(true); }}>Phân thắng bại bằng câu hỏi phụ</Button>}
        <Button type="primary" size="large" className="cta" icon={<ReloadOutlined />} onClick={onAgain}>Chơi lại</Button>
      </div>
      <AnimatePresence>
        {tie && tied && (
          <motion.div className="tie-veil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="tie-card" key={idx} initial={{ scale: 0.85, y: 30 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 16 }}>
              <div className="tie-kicker">Câu hỏi phụ {idx + 1}/{bag.length}</div>
              <div className="tie-q display">{tq.q}</div>
              <div className="tie-note">Các đội hòa điểm bấm chuông giành quyền trả lời. Đội nào đúng trước thì thắng.</div>
              {show ? <div className="tie-a display">{tq.answer}</div> : <Button size="large" icon={<EyeOutlined />} onClick={() => setShow(true)}>Hiện đáp án</Button>}
              <div className="tie-teams">
                {winners.map((w) => <Button key={w.id} type="primary" size="large" style={{ background: TEAM_COLORS[w.id], borderColor: TEAM_COLORS[w.id], color: '#14123a' }} onClick={() => { sfx.win(); setChamp(w); setTie(false); }}>{w.name} thắng</Button>)}
              </div>
              <div className="tie-foot">
                <Button onClick={nextQ}>Đổi câu khác</Button>
                <Button onClick={() => setTie(false)}>Đóng</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
