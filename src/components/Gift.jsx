import { motion } from 'framer-motion';

const GIFT = [['#7c5cff', '#ffc83d'], ['#3db8ff', '#ff9a3d'], ['#2fd6a0', '#ff5c7a'], ['#ff5c7a', '#ffc83d'], ['#ff9a3d', '#3db8ff'], ['#c4b5fd', '#2fd6a0']];

function GiftArt({ i, open }) {
  const [a, b] = GIFT[i % GIFT.length];
  return (
    <svg viewBox="0 0 100 100" className="gift-svg" aria-hidden="true">
      <ellipse cx="50" cy="94" rx="34" ry="4" fill="#00000040" />
      <rect x="14" y="44" width="72" height="46" rx="7" fill={a} stroke="#14123a" strokeWidth="3" />
      <rect x="44" y="44" width="12" height="46" fill={b} stroke="#14123a" strokeWidth="3" />
      <path d="M18 50 V84" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity=".35" />
      <text x="50" y="77" textAnchor="middle" fontSize="30" fontWeight="800" fill="#fff" stroke="#14123a" strokeWidth="2" paintOrder="stroke" fontFamily="Baloo 2, sans-serif">{i + 1}</text>
      <motion.g animate={open ? { y: -34, rotate: 28, opacity: 0 } : { y: 0, rotate: 0, opacity: 1 }} transition={{ duration: 0.45, ease: 'easeOut' }} style={{ transformOrigin: '50px 38px', transformBox: 'view-box' }}>
        <rect x="9" y="28" width="82" height="20" rx="7" fill={a} stroke="#14123a" strokeWidth="3" />
        <rect x="44" y="28" width="12" height="20" fill={b} stroke="#14123a" strokeWidth="3" />
        <path d="M50 28 C38 6 20 14 32 26 Z M50 28 C62 6 80 14 68 26 Z" fill={b} stroke="#14123a" strokeWidth="3" strokeLinejoin="round" />
      </motion.g>
    </svg>
  );
}

export function Gift({ idx, opening, onOpen }) {
  const isOpening = opening === idx;
  return (
    <motion.button
      type="button"
      className="gift"
      aria-label={`Mở hộp quà số ${idx + 1}`}
      onClick={() => onOpen(idx)}
      animate={isOpening ? { scale: 1.3, rotate: [0, -9, 9, -9, 9, 0], y: -6 } : { y: [0, -7, 0], scale: 1, rotate: 0 }}
      transition={isOpening ? { duration: 0.6 } : { duration: 2.4 + (idx % 4) * 0.35, repeat: Infinity, ease: 'easeInOut', delay: (idx % 8) * 0.17 }}
      whileHover={opening === null ? { scale: 1.1, rotate: -3 } : undefined}
      whileTap={{ scale: 0.92 }}
    >
      <GiftArt i={idx} open={isOpening} />
    </motion.button>
  );
}
