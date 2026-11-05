/* Vòng chơi một câu ở chế độ Xung phong. Hàm thuần, không đụng trình duyệt.
   status: run (đang chạy) | held (đã dừng chuông, chờ chấm) | end (đã có kết quả) */
export const DURATION = 30;
export const HINT_AT = [15, 25];

export const initRound = () => ({ status: 'run', left: DURATION, spent: 0, outcome: null, revealed: false, replay: 0 });

export function roundReduce(s, a) {
  switch (a.type) {
    case 'tick': {
      if (s.status !== 'run') return s;
      const r = (x) => Math.round(x * 1000) / 1000; // tránh trôi số thực: 150 nhịp 0,1 giây phải đúng 15 giây
      const left = Math.max(0, r(s.left - a.dt));
      const spent = r(s.spent + a.dt);
      return left === 0 ? { ...s, left, spent, status: 'end', outcome: 'timeout' } : { ...s, left, spent };
    }
    case 'toggle':
      if (s.status === 'run') return { ...s, status: 'held' };
      if (s.status === 'held') return { ...s, status: 'run' };
      return s;
    case 'right':
      return s.status === 'held' ? { ...s, status: 'end', outcome: 'right' } : s;
    case 'wrong':
      return s.status === 'held' ? { ...s, status: 'run' } : s;
    case 'reveal':
      return s.status === 'end' && s.outcome === 'timeout' && !s.revealed ? { ...s, revealed: true } : s;
    case 'replay':
      return s.status === 'end' && s.outcome === 'timeout' && !s.revealed ? { ...s, replay: s.replay + 1 } : s;
    default:
      return s;
  }
}

/** 0: chưa có gợi ý, 1: gợi ý ở giây 15, 2: gợi ý ở giây 25. */
export const hintLevel = (s) => (s.spent >= HINT_AT[1] ? 2 : s.spent >= HINT_AT[0] ? 1 : 0);
