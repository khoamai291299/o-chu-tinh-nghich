import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Popconfirm, Progress, Typography } from 'antd';
import { CloseOutlined, DownloadOutlined, FlagFilled, SaveOutlined } from '@ant-design/icons';
import Chibi from './Chibi.jsx';
import Score from './Score.jsx';
import { TEAM_COLORS } from '../data/constants.js';
import { sfx } from '../utils/sound.js';
import { fmtTime } from '../utils/save.js';

const GIFT = [['#7c5cff', '#ffc83d'], ['#3db8ff', '#ff9a3d'], ['#2fd6a0', '#ff5c7a'], ['#ff5c7a', '#ffc83d'], ['#ff9a3d', '#3db8ff'], ['#c4b5fd', '#2fd6a0']];

function GiftArt({ i, open }) {
  const [a, b] = GIFT[i % GIFT.length];
  return (
    <svg viewBox="0 0 100 100" className="gift-svg" aria-hidden="true">
      <ellipse cx="50" cy="94" rx="34" ry="4" fill="#00000040" />
      <rect x="14" y="44" width="72" height="46" rx="7" fill={a} stroke="#14123a" strokeWidth="3" />
      <rect x="44" y="44" width="12" height="46" fill={b} stroke="#14123a" strokeWidth="3" />
      <path d="M18 50 V84" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".35" />
      <text x="50" y="77" textAnchor="middle" fontSize="30" fontWeight="800" fill="#fff" stroke="#14123a" strokeWidth="2" paintOrder="stroke" fontFamily="Baloo 2, sans-serif">{i + 1}</text>
      <motion.g animate={open ? { y: -34, rotate: 28, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }} style={{ transformOrigin: '50px 38px', transformBox: 'view-box' }}>
        <rect x="9" y="28" width="82" height="20" rx="7" fill={a} stroke="#14123a" strokeWidth="3" />
        <rect x="44" y="28" width="12" height="20" fill={b} stroke="#14123a" strokeWidth="3" />
        <path d="M50 28 C38 6 20 14 32 26 Z M50 28 C62 6 80 14 68 26 Z" fill={b} stroke="#14123a" strokeWidth="3" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

function Gift({ idx, opening, onOpen }) {
  const isOpening = opening === idx;
  return (
    <motion.button
      type="button"
      className="gift"
      aria-label={`Mở hộp quà số ${idx + 1}`}
      onClick={() => onOpen(idx)}
      animate={isOpening ? { scale: 1.3, rotate: [0, -9, 9, -9, 9, 0], y: -6 } : { y: [0, -7, 0], scale: 1, rotate: 0 }}
      transition={isOpening ? { duration: 0.6 } : { duration: 2.4 + (idx % 4) * 0.35, repeat: Infinity, ease: 'easeInOut', delay: (idx % 8) * 0.17 }}
      whileHover={opening === null ? { scale: 1.1, rotate: -3 } : undefined}
      whileTap={{ scale: 0.92 }}
    >
      <GiftArt i={idx} open={isOpening} />
    </motion.button>
  );
}

export default function Board({ order, done, results, teams, chooser, turnOrder, savedAt, onExit, onDownload, onChoose, onPick, onSummary }) {
  const [opening, setOpening] = useState(null);
  const [nudge, setNudge] = useState(0);
  const open = (idx) => {
    if (opening !== null) return;
    if (chooser === null) { sfx.wrong(); setNudge((n) => n + 1); return; }
    sfx.open();
    setOpening(idx);
    setTimeout(() => onPick(idx), 800);
  };
  const left = order.map((q, i) => ({ q, i })).filter(({ i }) => !done.has(i));
  return (
    <div className="screen boardscreen">
      <div className="board-left">
        {teams.map((t, i) => (
          <motion.button key={t.id} type="button" className={`mini-team ${chooser === t.id ? 'on' : ''}`} style={{ '--tc': TEAM_COLORS[t.id] }} initial={{ opacity: 0, x: -60 }}
            animate={chooser === null && nudge ? { opacity: 1, x: [0, -10, 10, -8, 8, 0] } : { opacity: 1, x: 0 }} transition={chooser === null && nudge ? { duration: 0.45 } : { type: 'spring', stiffness: 130, damping: 16, delay: 0.1 + i * 0.08 }}
            disabled={opening !== null} onClick={() => { sfx.tick(); onChoose(t.id); }} aria-pressed={chooser === t.id} aria-label={`${t.name} chọn hộp quà`}>
            {turnOrder && <i className="mini-rank" title="Thứ tự chọn quà đã bốc thăm">{turnOrder.indexOf(t.id) + 1}</i>}
            <div className="mini-av"><Chibi kind={t.avatar} happy={chooser === t.id} /></div>
            <div className="mini-info"><span className="mini-name">{t.name}</span><Score value={t.score} className="mini-score" />{chooser === t.id && <b className="mini-pick">Đang chọn quà</b>}</div>
          </motion.button>
        ))}
      </div>

      <div className="board-center">
        <Typography.Title level={2} className={`display board-title ${chooser === null && nudge ? 'warn' : ''}`}>{chooser === null ? 'Bấm vào đội chọn quà trước' : `${teams[chooser].name} chọn một hộp quà bí mật`}</Typography.Title>
        <motion.div className="board-grid" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } } }}>
          {order.map((q, idx) => (
            <motion.div key={idx} className="cell" variants={{ hidden: { scale: 0, rotate: -25, opacity: 0 }, show: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 14 } } }}>
              {done.has(idx) ? (
                <div className="cell-done" style={{ '--tc': results[idx] !== null && results[idx] !== undefined ? TEAM_COLORS[results[idx]] : '#4b4690' }}>
                  {results[idx] !== null && results[idx] !== undefined ? <Chibi kind={teams[results[idx]].avatar} happy /> : <CloseOutlined />}
                </div>
              ) : (
                <Gift idx={idx} opening={opening} onOpen={open} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div className="board-right" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.2 }}>
        <Typography.Text className="panel-label">Tiến độ</Typography.Text>
        <Progress type="circle" size={190} percent={(done.size / order.length) * 100} strokeColor="#7c5cff" trailColor="#2d2970" strokeWidth={9} format={() => <span className="prog-num">{done.size}<small>/{order.length}</small></span>} />
        <Typography.Text className="panel-label">Còn lại</Typography.Text>
        <div className="legend">
          <div className="legend-row"><span className="legend-pts">hộp quà chưa mở</span><b>{left.length}</b></div>
        </div>
        <div className="legend-note">Đội chọn quà trả lời đúng được thêm một lượt quay may mắn (-30 đến +100). Sai thì các đội khác giành quyền, không quay.</div>
        <div className="save-box">
          <span className="save-note">{savedAt ? `Đã tự lưu lúc ${fmtTime(savedAt)}` : 'Tự lưu sau mỗi câu'}</span>
          <div className="save-row">
            <Button icon={<SaveOutlined />} onClick={() => { sfx.tick(); onExit(); }} disabled={opening !== null}>Lưu và thoát</Button>
            <Button icon={<DownloadOutlined />} onClick={onDownload} title="Tải file lưu về máy, để chơi tiếp trên máy khác" aria-label="Tải file lưu" />
          </div>
        </div>
        <Popconfirm title="Kết thúc và xem tổng kết?" description={`Mới mở ${done.size}/${order.length} hộp quà.`} okText="Tổng kết" cancelText="Chơi tiếp" onConfirm={onSummary} disabled={opening !== null}>
          <Button size="large" className="sum-btn" icon={<FlagFilled />}>Tổng kết</Button>
        </Popconfirm>
      </motion.div>
    </div>
  );
}
