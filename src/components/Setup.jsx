import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Input, Switch, Typography } from 'antd';
import { ArrowLeftOutlined, PlayCircleFilled, RetweetOutlined } from '@ant-design/icons';
import Chibi from './Chibi.jsx';
import { AVATAR_KINDS, AVATAR_NAMES, TEAM_COLORS } from '../data/constants.js';
import { sfx } from '../utils/sound.js';

export default function Setup({ initial, random: initRandom = true, onBack, onStart }) {
  const [teams, setTeams] = useState(initial);
  const [random, setRandom] = useState(initRandom);
  const set = (i, p) => setTeams((t) => t.map((x, k) => (k === i ? { ...x, ...p } : x)));
  const used = (kind, i) => teams.some((t, k) => k !== i && t.avatar === kind);
  return (
    <div className="screen setup">
      <motion.div className="screen-head" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography.Title level={2} className="display">Đặt tên và chọn nhân vật cho 4 đội</Typography.Title>
      </motion.div>
      <div className="setup-grid">
        {teams.map((t, i) => (
          <motion.div key={i} className="setup-card" style={{ '--tc': TEAM_COLORS[i] }} initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 130, damping: 16, delay: 0.1 + i * 0.09 }}>
            <motion.div className="setup-av" key={t.avatar} initial={{ scale: 0.6, rotate: -12 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
              <Chibi kind={t.avatar} />
            </motion.div>
            <Input size="large" value={t.name} maxLength={14} placeholder={`Đội ${i + 1}`} onChange={(e) => set(i, { name: e.target.value })} aria-label={`Tên đội ${i + 1}`} className="team-input" />
            <div className="av-pick">
              {AVATAR_KINDS.map((k) => (
                <motion.button key={k} type="button" className={k === t.avatar ? 'on' : ''} disabled={used(k, i)} title={AVATAR_NAMES[k]} onClick={() => { sfx.tick(); set(i, { avatar: k }); }} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}>
                  <Chibi kind={k} />
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="screen-foot">
        <Button size="large" icon={<ArrowLeftOutlined />} onClick={onBack}>Quay lại</Button>
        <label className="rand-opt">
          <RetweetOutlined />
          <span><b>Random thứ tự</b><small>{random ? 'Xáo câu hỏi trong 16 hộp và bốc thăm đội chọn quà' : 'Giữ thứ tự cố định, giáo viên tự chọn đội'}</small></span>
          <Switch checked={random} onChange={setRandom} aria-label="Random thứ tự" />
        </label>
        <Button type="primary" size="large" className="cta" icon={<PlayCircleFilled />} onClick={() => { sfx.open(); onStart(teams.map((t, i) => ({ ...t, name: t.name.trim() || `Đội ${i + 1}` })), random); }}>
          Bắt đầu chơi
        </Button>
      </div>
    </div>
  );
}
