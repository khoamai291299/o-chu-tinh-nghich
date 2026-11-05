import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Popconfirm, Progress, Typography } from 'antd';
import { CheckOutlined, CloseOutlined, DownloadOutlined, FlagFilled, SaveOutlined } from '@ant-design/icons';
import { Gift } from './Gift.jsx';
import { XP_TOTAL } from '../data/xpQuestions.js';
import { sfx } from '../utils/sound.js';
import { fmtTime } from '../utils/save.js';

/* Màn 25 hộp quà của chế độ Xung phong: không đội, không điểm. */
export default function XpBoard({ order, done, results, savedAt, onPick, onExit, onDownload, onFinish }) {
  const [opening, setOpening] = useState(null);
  const open = (idx) => {
    if (opening !== null) return;
    sfx.open();
    setOpening(idx);
    setTimeout(() => onPick(idx), 800);
  };
  return (
    <div className="screen boardscreen xp-board">
      <div className="xp-board-main">
        <Typography.Title level={2} className="display board-title">Người điều phối mở một hộp quà bí mật</Typography.Title>
        <motion.div className="xp-grid" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.04, delayChildren: 0.15 } } }}>
          {order.map((q, idx) => (
            <motion.div key={idx} className="cell" variants={{ hidden: { scale: 0, rotate: -25, opacity: 0 }, show: { scale: 1, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 14 } } }}>
              {done.has(idx) ? (
                <div className="cell-done" style={{ '--tc': results[idx] === 'right' ? '#2fd6a0' : '#4b4690' }} title={q.answer}>
                  {results[idx] === 'right' ? <CheckOutlined style={{ color: '#2fd6a0', fontSize: 44 }} /> : <CloseOutlined />}
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
        <Progress type="circle" size={190} percent={(done.size / XP_TOTAL) * 100} strokeColor="#7c5cff" trailColor="#2d2970" strokeWidth={9} format={() => <span className="prog-num">{done.size}<small>/{XP_TOTAL}</small></span>} />
        <div className="legend">
          <div className="legend-row"><span className="legend-pts">hộp quà chưa mở</span><b>{XP_TOTAL - done.size}</b></div>
        </div>
        <div className="legend-note">Chế độ Xung phong: cả lớp giơ tay đoán, người điều phối gọi từng bạn. Không chia đội, không tính điểm, đoán đến khi đúng.</div>
        <div className="save-box">
          <span className="save-note">{savedAt ? `Đã tự lưu lúc ${fmtTime(savedAt)}` : 'Tự lưu sau mỗi câu'}</span>
          <div className="save-row">
            <Button icon={<SaveOutlined />} onClick={() => { sfx.tick(); onExit(); }} disabled={opening !== null}>Lưu và thoát</Button>
            <Button icon={<DownloadOutlined />} onClick={onDownload} title="Tải file lưu về máy, để chơi tiếp trên máy khác" aria-label="Tải file lưu" />
          </div>
        </div>
        <Popconfirm title="Kết thúc ván này?" description={`Mới mở ${done.size}/${XP_TOTAL} hộp quà.`} okText="Kết thúc" cancelText="Chơi tiếp" onConfirm={onFinish} disabled={opening !== null}>
          <Button size="large" className="sum-btn" icon={<FlagFilled />}>Kết thúc</Button>
        </Popconfirm>
      </motion.div>
    </div>
  );
}
