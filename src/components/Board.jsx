import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Popconfirm, Progress, Typography } from 'antd';
import { CloseOutlined, DownloadOutlined, FlagFilled, SaveOutlined } from '@ant-design/icons';
import Chibi from './Chibi.jsx';
import Score from './Score.jsx';
import { TEAM_COLORS } from '../data/constants.js';
import { sfx } from '../utils/sound.js';
import { fmtTime } from '../utils/save.js';
import { Gift } from './Gift.jsx';

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
