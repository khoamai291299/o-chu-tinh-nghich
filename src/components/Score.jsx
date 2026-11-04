import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCount } from '../hooks.js';

/** Điểm số chạy mượt, kèm chữ +điểm bay lên khi tăng. */
export default function Score({ value, className = '' }) {
  const shown = useCount(value);
  const prev = useRef(value);
  const [pop, setPop] = useState(null);
  useEffect(() => {
    if (value !== prev.current) setPop({ n: value - prev.current, k: Date.now() });
    prev.current = value;
  }, [value]);
  useEffect(() => {
    if (!pop) return undefined;
    const t = setTimeout(() => setPop(null), 1800);
    return () => clearTimeout(t);
  }, [pop]);
  return (
    <span className={`score ${className}`}>
      {shown}
      <AnimatePresence>
        {pop && (
          <motion.b key={pop.k} className={`score-pop ${pop.n < 0 ? 'neg' : ''}`} initial={{ opacity: 0, y: 6, scale: 0.6 }} animate={{ opacity: 1, y: -26, scale: 1.1 }} exit={{ opacity: 0, y: -44 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
            {pop.n > 0 ? '+' : ''}{pop.n}
          </motion.b>
        )}
      </AnimatePresence>
    </span>
  );
}
