import { motion } from 'framer-motion';
import { Button, Typography } from 'antd';
import { HomeOutlined, ReloadOutlined } from '@ant-design/icons';
import Confetti from './Confetti.jsx';

/* Màn kết thúc ván Xung phong: không xếp hạng, chỉ cho biết đã mở bao nhiêu hộp. */
export default function XpEnd({ opened, total, correct, onAgain, onHome }) {
  return (
    <div className="screen xp-end">
      <div className="overlay burst"><Confetti burst={120} loop={false} /></div>
      <motion.div className="xp-end-card" initial={{ opacity: 0, y: 40, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: 'spring', stiffness: 120, damping: 14 }}>
        <Typography.Title level={1} className="display xp-end-title">{opened >= total ? `Đã mở hết ${total} hộp quà!` : 'Kết thúc ván Xung phong'}</Typography.Title>
        <div className="xp-end-stats">
          <div><b>{opened}/{total}</b><span>hộp quà đã mở</span></div>
          <div><b>{correct}</b><span>từ được đoán đúng</span></div>
        </div>
        <div className="xp-end-actions">
          <Button type="primary" size="large" className="cta" icon={<ReloadOutlined />} onClick={onAgain}>Chơi lại</Button>
          <Button size="large" icon={<HomeOutlined />} onClick={onHome}>Về màn đầu</Button>
        </div>
      </motion.div>
    </div>
  );
}
