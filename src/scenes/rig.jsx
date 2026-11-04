/* Công cụ dựng chuyển động chính xác: tay cầm đồ vật, bước chân, đi theo đường cong. */

/** Vai và chiều dài tay của Kid (đơn vị cục bộ, gốc ở lòng bàn chân). */
export const SH = { x: 6.4, y: -21.5, r: 11.2 };

/** Góc xoay tay (độ) để bàn tay hướng về (tx, ty). side: -1 tay trái, +1 tay phải. */
export const theta = (side, tx, ty) => (Math.atan2(-(tx - side * SH.x), ty - SH.y) * 180) / Math.PI;

/** Vị trí bàn tay khi tay xoay một góc th (độ). */
export const hand = (side, th) => {
  const a = (th * Math.PI) / 180;
  return [side * SH.x - SH.r * Math.sin(a), SH.y + SH.r * Math.cos(a)];
};

const sel = (p, side) => `.${p}-arm${side < 0 ? 'L' : 'R'}`;

/** Đưa tay về một góc. */
export const pose = (tl, p, side, th, at, dur = 0.3, ease = 'power1.inOut') => tl.to(sel(p, side), { rotation: th, duration: dur, ease, transformOrigin: '50% 0%' }, at);

/** Tay đung đưa qua lại giữa hai góc (cần pose trước đó). */
export const swing = (tl, p, side, a, b, at, dur, repeat) => tl.fromTo(sel(p, side), { rotation: a, transformOrigin: '50% 0%' }, { rotation: b, duration: dur, repeat, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 0%', immediateRender: false }, at);

/** Chỉ chân bước (tay giữ nguyên để đồ cầm không rời tay). Trả về thời điểm kết thúc. */
export function steps(tl, p, at, dur, amp = 22) {
  const half = 0.22;
  const n = Math.max(1, Math.round(dur / half));
  ['L', 'R'].forEach((s, i) => tl.fromTo(`.${p}-leg${s}`, { rotation: i ? -amp : amp, transformOrigin: '50% 0%' }, { rotation: i ? amp : -amp, duration: half, repeat: n - 1, yoyo: true, ease: 'sine.inOut', transformOrigin: '50% 0%', immediateRender: false }, at));
  const end = at + n * half;
  tl.to([`.${p}-legL`, `.${p}-legR`], { rotation: 0, duration: 0.15, transformOrigin: '50% 0%' }, end);
  return end;
}

/** Đi theo danh sách điểm (x, y), mỗi đoạn dài như nhau. */
export const along = (tl, sel2, pts, at, total, extra = {}) => {
  const d = total / (pts.length - 1);
  return tl.to(sel2, { keyframes: pts.slice(1).map(([x, y]) => ({ x, y, duration: d, ease: 'none', ...extra })) }, at);
};
