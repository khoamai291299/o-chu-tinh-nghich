import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Typography } from 'antd';
import { PlayCircleFilled, RetweetOutlined } from '@ant-design/icons';
import Chibi from './Chibi.jsx';
import Confetti from './Confetti.jsx';
import { TEAM_COLORS } from '../data/constants.js';
import { shuffle } from '../utils/random.js';
import { sfx } from '../utils/sound.js';

const SHUFFLE_MS = 2600;

/** Bốc thăm thứ tự các đội chọn quà. Kết quả trả về qua onDone(mảng id đội theo thứ tự). */
export default function Draw({ teams, onDone }) {
  const [list, setList] = useState(teams.map((t) => t.id));
  const [stage, setStage] = useState('idle'); // idle | shuffling | done
  const final = useRef(null);
  const timer = useRef(0);

  useEffect(() => () => clearInterval(timer.current), []);

  const start = () => {
    if (stage !== 'idle') return;
    final.current = shuffle(teams.map((t) => t.id)); // kết quả chốt ngay từ đầu, hiệu ứng chỉ để trình diễn
    setStage('shuffling');
    const t0 = performance.now();
    timer.current = setInterval(() => {
      const left = SHUFFLE_MS - (performance.now() - t0);
      if (left <= 0) {
        clearInterval(timer.current);
        setList(final.current);
        setStage('done');
        sfx.correct();
      } else {
        setList(shuffle(teams.map((t) => t.id)));
        sfx.tick();
      }
    }, 170);
  };

  useEffect(() => {
    const h = (e) => {
      if (e.key !== 'Enter' || e.target.closest?.('button')) return;
      if (stage === 'idle') start(); else if (stage === 'done') onDone(final.current);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  });

  const byId = (id) => teams.find((t) => t.id === id);
  return (
    <div className="screen draw">
      {stage === 'done' && <Confetti burst={80} loop={false} />}
      <div className="screen-head">
        <Typography.Title level={2} className="display">Bốc thăm thứ tự chọn quà</Typography.Title>
        <Typography.Text className="draw-sub">{stage === 'idle' ? 'Bấm bốc thăm, các đội sẽ lần lượt chọn hộp quà theo đúng thứ tự này' : stage === 'shuffling' ? 'Đang xáo trộn...' : 'Thứ tự đã chốt. Từ câu sau, các đội xoay vòng theo thứ tự này'}</Typography.Text>
      </div>
      <div className="draw-row">
        {list.map((id, pos) => {
          const t = byId(id);
          return (
            <motion.div key={id} layout transition={{ type: 'spring', stiffness: 420, damping: 30 }} className={`draw-card ${stage}`} style={{ '--tc': TEAM_COLORS[id] }}>
              <div className="draw-rank">
                {stage === 'done'
                  ? <motion.b initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.15 * pos }}>{pos + 1}</motion.b>
                  : <b>?</b>}
              </div>
              <div className="draw-av"><Chibi kind={t.avatar} happy={stage === 'done' && pos === 0} /></div>
              <div className="draw-name">{t.name}</div>
              {stage === 'done' && pos === 0 && <div className="draw-first">Chọn quà đầu tiên</div>}
            </motion.div>
          );
        })}
      </div>
      <div className="screen-foot center">
        {stage === 'done'
          ? <Button type="primary" size="large" className="cta" icon={<PlayCircleFilled />} onClick={() => onDone(final.current)}>Tiếp tục: câu mẫu (Enter)</Button>
          : <Button type="primary" size="large" className="cta" icon={<RetweetOutlined />} loading={stage === 'shuffling'} onClick={start}>{stage === 'shuffling' ? 'Đang bốc thăm...' : 'Bốc thăm (Enter)'}</Button>}
      </div>
    </div>
  );
}
