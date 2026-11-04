import { motion } from 'framer-motion';
import { RotateRightOutlined } from '@ant-design/icons';
import { useStage } from '../hooks.js';

export default function Stage({ children }) {
  const { scale, portrait } = useStage();
  return (
    <div className="viewport">
      <div className="stage" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        <div className="stage-bg" aria-hidden="true">
          <motion.i className="orb o1" animate={{ x: [0, 80, 0], y: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.i className="orb o2" animate={{ x: [0, -70, 0], y: [0, -50, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.i className="orb o3" animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
        {children}
      </div>
      {portrait && (
        <div className="rotate-hint">
          <RotateRightOutlined />
          <p>Hãy xoay ngang màn hình để chơi.</p>
        </div>
      )}
    </div>
  );
}
