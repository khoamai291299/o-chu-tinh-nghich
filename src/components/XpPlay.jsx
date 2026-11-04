import { useCallback, useEffect, useReducer, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Alert, Button, Popconfirm, Progress, Tag } from 'antd';
import { BellFilled, BulbOutlined, CheckOutlined, CloseOutlined, EyeOutlined, GiftOutlined, PauseCircleFilled, PlayCircleFilled, ReloadOutlined } from '@ant-design/icons';
import Confetti from './Confetti.jsx';
import { XP_SCENES } from '../scenes/xpIndex.js';
import { XP_TOTAL } from '../data/xpQuestions.js';
import { DURATION, HINT_AT, hintLevel, initRound, roundReduce } from '../utils/xpRound.js';
import { sfx } from '../utils/sound.js';

/* Màn chơi một câu ở chế độ Xung phong: cảnh lặp, đồng hồ 30 giây, người điều phối bấm dừng chuông rồi chấm đúng/sai. */
export default function XpPlay({ q, no, done = new Set(), onFinish, onBack, preview = false }) {
  const [s, dispatch] = useReducer(roundReduce, undefined, initRound);
  const [peek, setPeek] = useState(false);
  const [shake, setShake] = useState(0);
  const Scene = XP_SCENES[q.scene];
  const timeoutOpen = s.status === 'end' && s.outcome === 'timeout' && !s.revealed; // hết giờ, chưa hiện đáp án: cho xem lại cảnh
  const running = preview || s.status === 'run' || timeoutOpen;
  const danger = s.left <= 5 && s.status === 'run';
  const level = hintLevel(s);

  useEffect(() => { sfx.bell(); }, []);

  useEffect(() => {
    if (preview || s.status !== 'run') return undefined;
    const id = setInterval(() => dispatch({ type: 'tick', dt: 0.1 }), 100);
    return () => clearInterval(id);
  }, [preview, s.status]);

  useEffect(() => { if (s.status === 'run' && s.left <= 5 && s.left > 0) sfx.tick(); }, [Math.ceil(s.left)]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => { if (s.status === 'end' && s.outcome === 'timeout') sfx.timeout(); }, [s.status, s.outcome]);

  const stop = useCallback(() => {
    if (s.status === 'end') return;
    if (s.status === 'run') sfx.bell();
    dispatch({ type: 'toggle' });
  }, [s.status]);
  const right = useCallback(() => { if (s.status === 'held') { sfx.correct(); dispatch({ type: 'right' }); } }, [s.status]);
  const wrong = useCallback(() => { if (s.status === 'held') { sfx.wrong(); setShake((n) => n + 1); dispatch({ type: 'wrong' }); } }, [s.status]);

  useEffect(() => {
    const h = (e) => {
      if (e.target.closest?.('button') && e.key === 'Enter') return;
      const k = e.key.toLowerCase();
      if (e.key === ' ') { e.preventDefault(); if (!e.repeat) { document.activeElement?.blur?.(); stop(); } return; }
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (k === 'd') right();
      if (k === 's') wrong();
      if (k === 'a') setPeek((p) => !p);
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [stop, right, wrong]);

  const elapsedPct = Math.min(100, ((DURATION - s.left) / DURATION) * 100);
  const showCard = s.status === 'end' && (s.outcome === 'right' || s.revealed);
  const note = s.status === 'run' ? 'Đang chạy. Có bạn xung phong thì bấm Dừng chuông.'
    : s.status === 'held' ? 'Đã dừng. Mời bạn xung phong trả lời, rồi bấm Đúng hoặc Sai.'
      : s.outcome === 'right' ? 'Đã đoán đúng!' : timeoutOpen ? 'Hết giờ, chưa ai đoán đúng.' : 'Đã hiện đáp án.';

  return (
    <div className="screen xp-play">
      <div className="xp-kind">Từ vựng thông dụng · Hộp quà số {no}</div>

      <div className="xp-tv">
        <div className="tv-frame">
          <div className="tv-screen">
            <Scene key={s.replay} running={running} />
            <AnimatePresence>
              {s.status === 'held' && (
                <motion.div className="xp-held" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                  <PauseCircleFilled /> ĐÃ DỪNG
                </motion.div>
              )}
              {showCard && (
                <motion.div className="answer-card" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
                  {s.outcome === 'right' ? <Tag color="green" className="ac-tag">Đã đoán đúng</Tag> : <Tag color="red" className="ac-tag">Hết giờ, chưa ai đúng</Tag>}
                  <div className="ac-answer display">{q.answer}</div>
                  <div className="ac-explain">{q.explain}</div>
                  <Button type="primary" size="large" className="cta" onClick={() => onFinish(s.outcome)}>Hộp quà tiếp theo</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <i className="tv-led" />
        </div>
      </div>

      <div className="xp-hint">
        {level > 0 ? (
          <motion.div key={level} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Alert type="warning" showIcon icon={<BulbOutlined />} message={<span className="hint-text">Gợi ý {level}: {q.hints[level - 1]}</span>} />
          </motion.div>
        ) : (
          <div className="xp-hint-wait"><BulbOutlined /> <span>Gợi ý 1 sẽ hiện ở giây {HINT_AT[0]}</span></div>
        )}
      </div>

      <div className="xp-strip" aria-label="Tiến độ các hộp quà">
        {Array.from({ length: XP_TOTAL }, (_, i) => <i key={i} className={done.has(i) ? 'done' : i === no - 1 ? 'cur' : ''} />)}
      </div>

      <motion.div className="xp-side" key={shake} animate={shake ? { x: [0, -12, 12, -8, 8, 0] } : {}} transition={{ duration: 0.45 }}>
        <button type="button" className={`xp-ring ${danger ? 'danger' : ''}`} onClick={stop} aria-label="Dừng hoặc chạy tiếp" disabled={s.status === 'end'}>
          <Progress type="circle" size={190} strokeWidth={9} strokeLinecap="round" percent={(Math.max(0, s.left) / DURATION) * 100} strokeColor={danger ? '#ff5c7a' : '#2fd6a0'} trailColor="#2d2970"
            format={() => (s.status === 'held' ? <PauseCircleFilled className="clock-pause" /> : <span className="clock-num display">{Math.ceil(Math.max(0, s.left))}</span>)} />
        </button>
        <div className="xp-note">{note}</div>
        <div className="xp-bar" aria-hidden="true">
          <b style={{ width: `${elapsedPct}%` }} />
          {HINT_AT.map((t) => <i key={t} style={{ left: `${(t / DURATION) * 100}%` }}><span>{t}s</span></i>)}
        </div>

        <button type="button" className="xp-btn xp-stop" onClick={stop} disabled={s.status === 'end'}>
          {s.status === 'held' ? <><PlayCircleFilled /> Chạy tiếp</> : <><BellFilled /> DỪNG CHUÔNG</>}
        </button>
        {timeoutOpen ? (
          <div className="xp-row">
            <button type="button" className="xp-btn xp-ghost" onClick={() => dispatch({ type: 'replay' })}><ReloadOutlined /> Xem lại</button>
            <button type="button" className="xp-btn xp-ok" onClick={() => dispatch({ type: 'reveal' })}><EyeOutlined /> Hiện đáp án</button>
          </div>
        ) : (
          <div className="xp-row">
            <button type="button" className="xp-btn xp-ok" onClick={right} disabled={s.status !== 'held'}><CheckOutlined /> Đúng</button>
            <button type="button" className="xp-btn xp-no" onClick={wrong} disabled={s.status !== 'held'}><CloseOutlined /> Sai</button>
          </div>
        )}
        <button type="button" className="xp-btn xp-ghost" onClick={() => setPeek((p) => !p)}><EyeOutlined /> {peek ? q.answer : 'Xem đáp án (A)'}</button>
        <Popconfirm title="Bỏ câu này và về hộp quà?" description="Hộp quà này sẽ được mở lại từ đầu lần sau." okText="Về hộp quà" cancelText="Ở lại" onConfirm={onBack} disabled={!onBack}>
          <button type="button" className="xp-btn xp-ghost" disabled={!onBack}><GiftOutlined /> Về hộp quà</button>
        </Popconfirm>
      </motion.div>

      {s.status === 'end' && s.outcome === 'right' && <div className="overlay burst"><Confetti burst={90} loop={false} /></div>}
    </div>
  );
}
