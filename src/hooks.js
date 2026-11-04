import { useEffect, useRef, useState } from 'react';
import { animate } from 'framer-motion';

export const STAGE_W = 1600;
export const STAGE_H = 900;

const calc = () => ({
  scale: Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H),
  portrait: window.innerHeight > window.innerWidth * 1.15,
});

/** Khung sân khấu 1600x900 luôn nằm gọn trong cửa sổ, tự co giãn. */
export function useStage() {
  const [v, setV] = useState(calc);
  useEffect(() => {
    const f = () => setV(calc());
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  return v;
}

/** Số chạy mượt từ giá trị cũ đến giá trị mới. */
export function useCount(value, duration = 1) {
  const [v, setV] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const c = animate(prev.current, value, { duration, ease: 'easeOut', onUpdate: (x) => setV(Math.round(x)) });
    prev.current = value;
    return () => c.stop();
  }, [value, duration]);
  return v;
}
