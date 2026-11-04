import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Alert, Button, Progress, Tag, Typography } from 'antd';
import { BellFilled, BulbOutlined, RetweetOutlined, ReloadOutlined, CheckOutlined, CloseOutlined, CloseCircleFilled, EyeOutlined, PauseCircleFilled } from '@ant-design/icons';
import Chibi from './Chibi.jsx';
import Confetti from './Confetti.jsx';
import Score from './Score.jsx';
import Wheel from './Wheel.jsx';
import { SCENES } from '../scenes/index.js';
import { TURN_TIME, TEAM_COLORS } from '../data/constants.js';
import { sfx } from '../utils/sound.js';
import { pick } from '../utils/random.js';

const HINT1 = 15; // giây đã trôi qua (tính cả hai lượt) thì hiện gợi ý 1
const HINT2 = 22;

export default function Play({ q, teams, chooser, onFinish, preview = false, sample = false }) {
  const [left, setLeft] = useState(TURN_TIME);
  const [spent, setSpent] = useState(0); // tổng giây đã chạy, dùng cho gợi ý
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState(chooser);
  const [ringKey, setRingKey] = useState(0);
  const [locked, setLocked] = useState([]);
  const [turn, setTurn] = useState('own'); // own: đội chọn quà | steal: 3 đội còn lại giành quyền | wheel | end
  const [outcome, setOutcome] = useState(null);
  const [notice, setNotice] = useState(null);
  const [peek, setPeek] = useState(false);
  const [shake, setShake] = useState(0);
  const [revealed, setRevealed] = useState(false); // không ai đúng thì đáp án chỉ hiện khi giáo viên bấm
  const [replayKey, setReplayKey] = useState(0);
  const [flash, setFlash] = useState(null); // đội đang sáng lên trong lúc bốc thăm chuông
  const drawTimer = useRef(0);
  const Scene = SCENES[q.scene];
  const playing = turn === 'own' || turn === 'steal';
  const running = playing && !paused && flash === null && (turn === 'own' || active === null);

  useEffect(() => { sfx.bell(); return () => clearInterval(drawTimer.current); }, []);

  useEffect(() => {
    if (!running || preview) return undefined;
    const id = setInterval(() => { setLeft((v) => Math.max(0, v - 0.1)); setSpent((v) => v + 0.1); }, 100);
    return () => clearInterval(id);
  }, [running, preview]);

  const startSteal = useCallback((why) => {
    setLocked((l) => (l.includes(chooser) ? l : [...l, chooser]));
    setActive(null);
    setLeft(TURN_TIME);
    setTurn('steal');
    setNotice(why);
  }, [chooser]);

  useEffect(() => {
    if (!playing) return;
    if (left <= 0) {
      sfx.timeout();
      if (turn === 'own') startSteal('timeout');
      else { setActive(null); setOutcome({ timeout: true }); setTurn('end'); }
    } else if (left <= 5 && Math.abs(left - Math.round(left)) < 0.05) sfx.tick();
  }, [left, playing, turn, startSteal]);

  useEffect(() => { setPeek(false); }, [active]);

  const ring = useCallback((i) => {
    if (turn !== 'steal' || active !== null || locked.includes(i)) return;
    sfx.bell();
    setActive(i);
    setNotice(null);
    setRingKey((k) => k + 1);
  }, [turn, active, locked]);

  /** Hai đội bấm chuông cùng lúc: bốc thăm ngẫu nhiên trong các đội còn quyền, rồi đội thắng thăm bấm chuông. */
  const drawBell = useCallback(() => {
    if (turn !== 'steal' || active !== null || flash !== null || paused) return;
    const cands = teams.map((t) => t.id).filter((i) => !locked.includes(i));
    if (cands.length < 2) { if (cands[0] !== undefined) ring(cands[0]); return; }
    const win = pick(cands);
    let n = 0;
    setFlash(cands[0]);
    drawTimer.current = setInterval(() => {
      n += 1;
      if (n < 14) { setFlash(cands[n % cands.length]); sfx.tick(); return; }
      clearInterval(drawTimer.current);
      setFlash(null);
      ring(win);
    }, 110);
  }, [turn, active, flash, paused, teams, locked, ring]);

  const judge = useCallback((ok) => {
    if (active === null || !playing) return;
    if (ok) {
      sfx.correct();
      if (turn === 'own' && sample) { setOutcome({ teamId: active, bonus: 0 }); setTurn('end'); }
      else if (turn === 'own') { setOutcome({ teamId: active, bonus: null }); setTurn('wheel'); } // chỉ đội chọn quà mới được quay
      else { setOutcome({ teamId: active, bonus: 0, stolen: true }); setTurn('end'); }
      return;
    }
    sfx.wrong();
    setShake((n) => n + 1);
    if (turn === 'own') { startSteal('wrong'); return; }
    const nl = [...locked, active];
    setLocked(nl);
    setActive(null);
    if (nl.length >= teams.length) { setOutcome({ timeout: true, allWrong: true }); setTurn('end'); }
  }, [active, playing, turn, locked, teams.length, startSteal, sample]);

  useEffect(() => {
    const h = (e) => {
      if (e.target.closest?.('button') && e.key === 'Enter') return;
      const n = Number(e.key);
      if (n >= 1 && n <= 4) ring(n - 1);
      const k = e.key.toLowerCase();
      if (k === 'd' && active !== null && playing) judge(true);
      if (k === 's' && active !== null && playing) judge(false);
      if (k === 'a') setPeek((p) => !p);
      if (k === 'r') drawBell();
      if (e.key === ' ') { e.preventDefault(); if (playing) setPaused((p) => !p); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [ring, playing, active, judge, drawBell]);

  const onSpun = (bonus) => { setOutcome((o) => ({ ...o, bonus })); setTurn('end'); };
  const elapsed = spent;
  const danger = left <= 5;
  const hint = elapsed >= HINT2 && q.hints[1] ? q.hints[1] : elapsed >= HINT1 ? q.hints[0] : null;
  const hintNo = elapsed >= HINT2 && q.hints[1] ? 2 : 1;
  const chooserTeam = teams[chooser];
  const noAnswer = turn === 'end' && !!outcome?.timeout;
  const total = outcome && !outcome.timeout ? (sample ? 0 : q.pts + (outcome.bonus || 0)) : 0;
  const finish = () => onFinish(outcome.teamId ?? null, total);
  const team = active !== null ? teams[active] : null;

  return (
    <div className="screen play">
      {/* TV */}
      <div className="play-tv">
        <div className="tv-frame">
          <div className="tv-screen">
            <Scene key={replayKey} running={running || (noAnswer && !revealed)} />
            <AnimatePresence>
              {paused && playing && (
                <motion.div className="pause-veil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <PauseCircleFilled /> Tạm dừng
                </motion.div>
              )}
              {turn === 'end' && outcome && (!outcome.timeout || revealed) && (
                <motion.div className="answer-card" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18 }}>
                  {outcome.timeout
                    ? <Tag color="red" className="ac-tag">{outcome.allWrong ? 'Các đội đều đã trả lời sai' : 'Hết giờ'}</Tag>
                    : <Tag color="green" className="ac-tag">{teams[outcome.teamId].name} trả lời đúng</Tag>}
                  <div className="ac-answer display">{q.answer}</div>
                  <div className="ac-explain">{q.explain}</div>
                  {!outcome.timeout && sample && <div className="ac-sub">Đây là câu mẫu, không tính điểm</div>}
                  {!outcome.timeout && !sample && (
                    <div className="ac-pts">
                      <b>+{q.pts} điểm</b>
                      {outcome.bonus !== 0 && <span className={`ac-bonus ${outcome.bonus < 0 ? 'neg' : 'pos'}`}>vòng quay {outcome.bonus > 0 ? '+' : ''}{outcome.bonus}</span>}
                      {outcome.bonus !== 0 && <b>= {total}</b>}
                    </div>
                  )}
                  {outcome.stolen && !sample && <div className="ac-sub">Giành quyền thành công, không được quay vòng quay</div>}
                  <Button type="primary" size="large" className="cta" onClick={finish}>{sample ? 'Bắt đầu chơi thật' : 'Tiếp tục'}</Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <i className="tv-led" />
        </div>
      </div>

      {/* Dưới TV: loại câu hỏi và gợi ý */}
      <div className="play-info">
        <div className="info-kind">{q.kind}</div>
        <div className="info-hint">
          {hint ? (
            <motion.div key={hintNo} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Alert type="warning" showIcon icon={<BulbOutlined />} message={<span className="hint-text">Gợi ý {hintNo}: {hint}</span>} />
            </motion.div>
          ) : (
            <div className="hint-wait">
              <BulbOutlined /> <span>Gợi ý sẽ hiện khi bắt đầu lượt giành quyền</span>
              <Progress percent={Math.min(100, (elapsed / HINT1) * 100)} showInfo={false} strokeColor="#ffc83d" trailColor="#2d2970" size={['100%', 6]} />
            </div>
          )}
        </div>
      </div>

      {/* Cột phải: đồng hồ và ô trả lời */}
      <div className="play-side">
        <div className="side-card clock-card">
          <button type="button" className={`clock-btn ${danger ? 'danger' : ''}`} onClick={() => playing && setPaused((p) => !p)} aria-label="Tạm dừng hoặc tiếp tục">
            <Progress type="circle" size={170} strokeWidth={9} strokeLinecap="round" percent={(Math.max(0, left) / TURN_TIME) * 100} strokeColor={danger ? '#ff5c7a' : '#2fd6a0'} trailColor="#2d2970"
              format={() => (paused ? <PauseCircleFilled className="clock-pause" /> : <span className="clock-num display">{Math.ceil(Math.max(0, left))}</span>)} />
          </button>
          <div className="clock-info">
            <div className={`clock-turn ${turn}`}>{turn === 'own' ? `Lượt của ${chooserTeam.name}` : 'Giành quyền: các đội còn lại'}</div>
            {sample ? <div className="clock-pts">Câu mẫu</div> : <div className="clock-pts">{q.pts} <small>điểm</small></div>}
            <Typography.Text type="secondary">Bấm vào đồng hồ để {paused ? 'tiếp tục' : 'tạm dừng'}</Typography.Text>
          </div>
        </div>

        <motion.div className="side-card answer-box" key={shake} animate={shake ? { x: [0, -14, 14, -10, 10, 0] } : {}} transition={{ duration: 0.45 }} style={{ '--tc': team ? TEAM_COLORS[team.id] : '#4b4690' }}>
          <AnimatePresence mode="wait">
            {team ? (
              <motion.div key="a" className="ans-on" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                <div className="ans-who">
                  <div className="ans-av"><Chibi kind={team.avatar} /></div>
                  <div><div className="ans-label">Đang trả lời</div><div className="ans-name display">{team.name}</div></div>
                </div>
                <div className="ans-hint-line">{turn === 'own' ? 'Đội chọn quà có quyền thảo luận và trả lời trước.' : 'Đồng hồ đang dừng. Sai thì đồng hồ chạy tiếp.'}</div>
                <div className="judge-row">
                  <Button type="primary" size="large" className="btn-right" icon={<CheckOutlined />} onClick={() => judge(true)}>Đúng (D)</Button>
                  <Button size="large" danger className="btn-wrong" icon={<CloseOutlined />} onClick={() => judge(false)}>Sai (S)</Button>
                </div>
                <button type="button" className="peek-btn" onClick={() => setPeek((p) => !p)}><EyeOutlined /> {peek ? q.answer : 'Giáo viên xem đáp án (A)'}</button>
              </motion.div>
            ) : (
              <motion.div key="b" className="ans-off" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div className="ans-bell" animate={{ rotate: [0, -14, 12, -8, 0], scale: [1, 1.08, 1] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.8 }}><BellFilled /></motion.div>
                {noAnswer && !revealed ? (
                  <>
                    <div className="ans-title display">{outcome.allWrong ? 'Cả 4 đội đều sai' : 'Hết giờ, chưa ai đúng'}</div>
                    <Typography.Text type="secondary">Có thể xem lại video trước khi hiện đáp án</Typography.Text>
                    <div className="reveal-row">
                      <Button size="large" icon={<ReloadOutlined />} onClick={() => setReplayKey((k) => k + 1)}>Xem lại video</Button>
                      <Button type="primary" size="large" icon={<EyeOutlined />} onClick={() => setRevealed(true)}>Hiện đáp án</Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="ans-title display">{playing ? 'Đội nào giơ tay trước?' : 'Đã có kết quả'}</div>
                    <Typography.Text type="secondary">{turn === 'own' ? '' : 'Giáo viên bấm chuông thay đội, hoặc nhấn phím 1 đến 4'}</Typography.Text>
                    {turn === 'steal' && active === null && (
                      <Button className="draw-bell" size="large" icon={<RetweetOutlined />} loading={flash !== null} disabled={paused} onClick={drawBell}>Hai đội bấm cùng lúc? Bốc thăm (R)</Button>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          {notice && <Alert className="ans-notice" type="warning" showIcon message={`${chooserTeam.name} ${notice === 'timeout' ? 'hết 15 giây, mất lượt' : 'trả lời sai, mất lượt'}. ${teams.length - 1} đội còn lại có 15 giây để giành quyền.`} />}
          {locked.length > 0 && (
            <div className="ans-locked">
              {locked.map((i) => <Tag key={i} icon={<CloseCircleFilled />} color="error">{teams[i].name} mất quyền</Tag>)}
            </div>
          )}
        </motion.div>
      </div>

      {/* Hàng đội chơi */}
      <div className="play-teams">
        {teams.map((t, i) => {
          const isLocked = locked.includes(i);
          const on = active === i;
          const hot = on || flash === i;
          return (
            <motion.div key={t.id} className={`play-team ${flash === i ? 'flash' : ''}`} style={{ '--tc': TEAM_COLORS[t.id] }} initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, scale: hot ? 1.06 : 1, opacity: isLocked ? 0.5 : flash !== null ? (hot ? 1 : 0.45) : active === null || on ? 1 : 0.35, filter: isLocked ? 'grayscale(0.9)' : flash !== null ? (hot ? 'grayscale(0)' : 'grayscale(0.5)') : active === null || on ? 'grayscale(0)' : 'grayscale(0.6)' }}
              transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0 }}>
              <motion.div className="pt-av" animate={on ? { scale: [1, 1.12, 1.06] } : { scale: 1 }}><Chibi kind={t.avatar} /></motion.div>
              <div className="pt-info"><span className="pt-name">{t.name}</span><Score value={t.score} className="pt-score" /></div>
              <motion.button key={`${i}-${on ? ringKey : 0}`} type="button" className="bell" disabled={turn !== 'steal' || active !== null || isLocked} onClick={() => ring(i)} aria-label={`Chuông ${t.name}`}
                animate={on ? { rotate: [0, -24, 20, -14, 8, 0] } : { rotate: 0 }} transition={{ duration: 0.8 }} whileTap={{ scale: 0.88 }} whileHover={{ scale: 1.08 }}>
                <BellFilled /><small>{i + 1}</small>
              </motion.button>
              {isLocked && <CloseCircleFilled className="pt-x" />}
            </motion.div>
          );
        })}
      </div>

      {turn === 'wheel' && <Wheel team={teams[outcome.teamId]} base={q.pts} onDone={onSpun} />}
      {turn === 'end' && outcome && !outcome.timeout && <div className="overlay burst"><Confetti burst={90} loop={false} /></div>}
    </div>
  );
}
