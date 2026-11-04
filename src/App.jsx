import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, ConfigProvider, theme } from 'antd';
import { AudioMutedOutlined, FullscreenExitOutlined, FullscreenOutlined, SoundOutlined } from '@ant-design/icons';
import Stage from './components/Stage.jsx';
import Intro from './components/Intro.jsx';
import Setup from './components/Setup.jsx';
import Board from './components/Board.jsx';
import Play from './components/Play.jsx';
import Final from './components/Final.jsx';
import Draw from './components/Draw.jsx';
import { QUESTIONS, SAMPLE } from './data/questions.js';
import { AVATAR_KINDS } from './data/constants.js';
import { isMuted, setMuted } from './utils/sound.js';
import { shuffle } from './utils/random.js';
import { clearSave, downloadSave, readSave, writeSave } from './utils/save.js';

const initTeams = () => AVATAR_KINDS.slice(0, 4).map((a, i) => ({ id: i, name: `Đội ${i + 1}`, avatar: a, score: 0 }));

// Xem nhanh một câu: thêm ?cau=7 vào địa chỉ (dùng để kiểm tra hoạt ảnh)
const DEMO = Number(new URLSearchParams(window.location.search).get('cau')) || 0;

const THEME = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#7c5cff',
    colorBgBase: '#14123a',
    colorBgContainer: '#221f5a',
    colorBgElevated: '#2d2970',
    colorBorder: '#4b4690',
    colorText: '#f4f2ff',
    colorTextSecondary: '#b6b1ec',
    borderRadius: 14,
    fontSize: 18,
    controlHeightLG: 58,
    fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
  },
  components: {
    Button: { fontWeight: 700, primaryShadow: '0 6px 0 #4c35b8' },
    Input: { activeShadow: '0 0 0 3px rgba(124,92,255,.35)' },
  },
};

const page = {
  initial: { opacity: 0, scale: 0.97, filter: 'blur(6px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)', transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 1.03, filter: 'blur(6px)', transition: { duration: 0.25 } },
};

export default function App() {
  const [phase, setPhase] = useState(DEMO ? 'play' : 'intro');
  const [teams, setTeams] = useState(initTeams);
  const [order, setOrder] = useState(() => QUESTIONS);
  const [done, setDone] = useState(() => new Set());
  const [results, setResults] = useState({});
  const [cur, setCur] = useState(DEMO ? DEMO - 1 : null);
  const [chooser, setChooser] = useState(null);
  const [random, setRandom] = useState(true); // random thứ tự câu hỏi và đội chọn quà
  const [turnOrder, setTurnOrder] = useState(null); // thứ tự id đội chọn quà đã bốc thăm
  const [saved, setSaved] = useState(() => (DEMO ? null : readSave())); // ván lưu từ lần trước
  const [savedAt, setSavedAt] = useState(null);
  const [muted, setM] = useState(isMuted());
  const [full, setFull] = useState(false);

  const state = { teams, order, done, results, chooser, turnOrder, random };
  // tự lưu mỗi khi ở màn hộp quà (sau mỗi câu xong); hết ván thì xóa bản lưu
  useEffect(() => {
    if (DEMO) return;
    if (phase === 'board') { if (writeSave(state)) setSavedAt(Date.now()); }
    else if (phase === 'final') { clearSave(); setSaved(null); setSavedAt(null); }
  }, [phase, teams, order, done, results, chooser, turnOrder, random]); // eslint-disable-line react-hooks/exhaustive-deps
  const resume = (g) => {
    setTeams(g.teams); setOrder(g.order); setDone(g.done); setResults(g.results); setChooser(g.chooser);
    setTurnOrder(g.turnOrder); setRandom(g.random); setCur(null); setPhase(g.done.size >= g.order.length ? 'final' : 'board');
  };
  const exitSaved = () => { writeSave(state); setSaved(readSave()); setSavedAt(null); setPhase('intro'); };
  const reset = () => { setTeams(initTeams()); setOrder(QUESTIONS); setTurnOrder(null); setDone(new Set()); setResults({}); setCur(null); setChooser(null); setPhase('setup'); };
  const start = (t, rnd) => {
    setTeams(t); setRandom(rnd);
    setOrder(rnd ? shuffle(QUESTIONS) : QUESTIONS); // câu hỏi vào hộp quà theo thứ tự ngẫu nhiên
    setPhase(rnd ? 'draw' : 'sample');
  };
  const drawn = (ids) => { setTurnOrder(ids); setChooser(ids[0]); setPhase('sample'); };
  const nextChooser = (c) => {
    if (c === null) return null;
    if (!turnOrder) return (c + 1) % teams.length;
    return turnOrder[(turnOrder.indexOf(c) + 1) % turnOrder.length];
  };
  const finishQ = (teamId, pts) => {
    if (teamId !== null) setTeams((ts) => ts.map((t) => (t.id === teamId ? { ...t, score: t.score + pts } : t)));
    const nd = new Set(done); nd.add(cur); setDone(nd);
    setResults((r) => ({ ...r, [cur]: teamId }));
    setCur(null);
    setChooser((c) => nextChooser(c)); // đội kế tiếp theo thứ tự đã bốc thăm, giáo viên vẫn bấm đổi được
    setPhase(nd.size >= order.length ? 'final' : 'board');
  };
  const toggleFull = () => {
    try {
      if (document.fullscreenElement) { document.exitFullscreen(); setFull(false); } else { document.documentElement.requestFullscreen(); setFull(true); }
    } catch (e) { /* trình duyệt không hỗ trợ */ }
  };

  const screen = {
    intro: <Intro saved={saved} onNext={() => setPhase('setup')} onResume={resume} onDiscard={() => { clearSave(); setSaved(null); }} />,
    setup: <Setup initial={teams} random={random} onBack={() => setPhase('intro')} onStart={start} />,
    draw: <Draw teams={teams} onDone={drawn} />,
    board: <Board order={order} done={done} results={results} teams={teams} chooser={chooser} turnOrder={turnOrder} savedAt={savedAt} onExit={exitSaved} onDownload={() => downloadSave(state)} onChoose={setChooser} onPick={(i) => { setCur(i); setPhase('play'); }} onSummary={() => setPhase('final')} />,
    sample: <Play key="sample" q={SAMPLE} sample teams={teams} chooser={turnOrder ? turnOrder[0] : 0} onFinish={() => setPhase('board')} />,
    play: cur !== null ? <Play key={cur} q={order[cur] ?? SAMPLE} teams={teams} chooser={chooser ?? 0} onFinish={finishQ} preview={DEMO > 0} /> : null,
    final: <Final teams={teams} opened={done.size} total={order.length} onAgain={reset} />,
  }[phase];

  return (
    <ConfigProvider theme={THEME}>
      <Stage>
        <AnimatePresence mode="wait">
          <motion.div key={phase} className="page" {...page}>{screen}</motion.div>
        </AnimatePresence>
        <div className="tools">
          <Button shape="circle" icon={full ? <FullscreenExitOutlined /> : <FullscreenOutlined />} onClick={toggleFull} aria-label="Toàn màn hình" />
          <Button shape="circle" icon={muted ? <AudioMutedOutlined /> : <SoundOutlined />} onClick={() => { setMuted(!muted); setM(!muted); }} aria-label="Bật hoặc tắt âm thanh" />
        </div>
      </Stage>
    </ConfigProvider>
  );
}
