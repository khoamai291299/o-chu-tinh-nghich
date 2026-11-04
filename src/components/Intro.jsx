import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Popconfirm, Typography } from 'antd';
import { ArrowRightOutlined, FolderOpenOutlined, DeleteOutlined, BellFilled, EditOutlined, EyeOutlined, GiftOutlined, PauseCircleFilled, StarFilled } from '@ant-design/icons';
import { sfx } from '../utils/sound.js';
import { fmtTime, readFile } from '../utils/save.js';
import { readXpFile } from '../utils/xpSave.js';
import { XP_TOTAL } from '../data/xpQuestions.js';

const TILE_COLORS = ['#7c5cff', '#3db8ff', '#2fd6a0', '#ffc83d', '#ff5c7a', '#ff9a3d'];
const ROWS = ['Ô CHỮ', 'TINH NGHỊCH'];

const RULES = [
  [GiftOutlined, '#7c5cff', 'Mỗi hộp quà là một đoạn phim đố tục ngữ. Cả lớp cùng đoán.'],
  [EyeOutlined, '#3db8ff', 'Hình lúc đầu có thể đánh lừa. Chi tiết quan trọng hiện ra ở những giây sau.'],
  [BellFilled, '#ffc83d', 'Thứ tự các đội chọn quà được bốc thăm ngẫu nhiên, câu hỏi trong 16 hộp cũng được xáo trộn. Đội chọn quà có 15 giây thảo luận và trả lời trước.'],
  [EditOutlined, '#2fd6a0', 'Sai hoặc hết giờ thì mất lượt, 3 đội còn lại có 15 giây để giành quyền bằng chuông. Có đội bấm chuông thì đồng hồ dừng.'],
  [StarFilled, '#ff9a3d', 'Mỗi câu có gói 50, 100 hoặc 150 điểm. Đội chọn quà trả lời đúng còn được quay vòng quay may mắn. Trò chơi có 16 hộp quà, đội nhiều điểm nhất thắng.'],
  [PauseCircleFilled, '#ff5c7a', 'Bấm vào đồng hồ để tạm dừng và cho các đội thêm thời gian.'],
];

export default function Intro({ onNext, saved, onResume, onDiscard, xpSaved = null, onStartXp, onResumeXp, onDiscardXp }) {
  let n = 0;
  const fileRef = useRef(null);
  const [bad, setBad] = useState(false);
  const openFile = async (e) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    const g = await readFile(f);
    if (g) { setBad(false); sfx.open(); onResume(g); return; }
    const x = await readXpFile(f);
    if (x) { setBad(false); sfx.open(); onResumeXp(x); } else setBad(true);
  };
  return (
    <div className="screen intro">
      <div className="intro-left">
        <Typography.Text className="intro-sub">Trò chơi đuổi hình bắt chữ cho cả lớp</Typography.Text>
        <div className="tiles">
          {ROWS.map((row, r) => (
            <div className="tile-row" key={row}>
              {row.split('').map((ch, i) => {
                if (ch === ' ') return <span className="tile-gap" key={i} />;
                const k = n++;
                return (
                  <motion.span
                    key={i}
                    className="tile"
                    style={{ '--tc': TILE_COLORS[k % TILE_COLORS.length] }}
                    initial={{ y: -420, rotate: (k % 2 ? 1 : -1) * 40, opacity: 0 }}
                    animate={{ y: 0, rotate: ((k * 7) % 5) - 2, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 160, damping: 13, delay: 0.15 + k * 0.07 }}
                    whileHover={{ y: -10, rotate: 0, scale: 1.08 }}
                  >
                    {ch}
                  </motion.span>
                );
              })}
            </div>
          ))}
        </div>
        {saved && (
          <motion.div className="resume-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
            <div className="resume-info">
              <b>Có ván đang chơi dở</b>
              <span>{saved.done.size}/{saved.order.length} câu đã mở, lưu lúc {fmtTime(saved.savedAt)}</span>
              <span className="resume-scores">{saved.teams.map((t) => `${t.name} ${t.score}`).join('  |  ')}</span>
            </div>
            <Button type="primary" size="large" className="cta" icon={<ArrowRightOutlined />} iconPosition="end" onClick={() => { sfx.open(); onResume(saved); }}>Chơi tiếp</Button>
            <Button type="text" icon={<DeleteOutlined />} onClick={onDiscard} aria-label="Bỏ ván đã lưu" title="Bỏ ván đã lưu" />
          </motion.div>
        )}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
          <Button type="primary" size="large" className="cta" icon={<ArrowRightOutlined />} iconPosition="end" onClick={() => { sfx.open(); onNext(); }}>
            {saved ? 'Ván mới' : 'Tiếp theo'}
          </Button>
          <Button type="link" className="file-open" icon={<FolderOpenOutlined />} onClick={() => fileRef.current?.click()}>Mở file đã lưu</Button>
          <input ref={fileRef} type="file" accept=".json,application/json" hidden onChange={openFile} />
          {bad && <span className="file-bad">File không hợp lệ</span>}
        </motion.div>
        <motion.div className="xp-entry" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 }}>
          <div className="xp-entry-info">
            <b>Chế độ Xung phong</b>
            <span>{xpSaved ? `Có ván đang chơi dở: ${xpSaved.done.size}/${XP_TOTAL} hộp quà đã mở, lưu lúc ${fmtTime(xpSaved.savedAt)}.` : `${XP_TOTAL} hộp quà, từ vựng dễ hơn. Không chia đội, cả lớp xung phong đoán.`}</span>
          </div>
          {xpSaved && <Button type="primary" size="large" icon={<ArrowRightOutlined />} iconPosition="end" onClick={() => { sfx.open(); onResumeXp(xpSaved); }}>Chơi tiếp</Button>}
          {xpSaved
            ? <Popconfirm title="Bắt đầu ván mới?" description="Ván Xung phong đang lưu sẽ bị ghi đè." okText="Ván mới" cancelText="Giữ ván cũ" onConfirm={() => { sfx.open(); onStartXp(); }}><Button size="large">Ván mới</Button></Popconfirm>
            : <Button size="large" onClick={() => { sfx.open(); onStartXp(); }}>Xung phong</Button>}
          {xpSaved && <Button type="text" icon={<DeleteOutlined />} onClick={onDiscardXp} aria-label="Bỏ ván Xung phong đã lưu" title="Bỏ ván đã lưu" />}
        </motion.div>
      </div>
      <div className="intro-right">
        <Typography.Title level={3} className="panel-title">Luật chơi</Typography.Title>
        <div className="rules">
          {RULES.map(([Icon, c, text], i) => (
            <motion.div key={i} className="rule" initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 16, delay: 0.5 + i * 0.1 }}>
              <span className="rule-ic" style={{ background: c }}><Icon /></span>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
