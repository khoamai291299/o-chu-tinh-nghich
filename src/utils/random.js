/** Số nguyên ngẫu nhiên trong [0, n), dùng bộ sinh số của trình duyệt (không thiên lệch như Math.random). */
export const rand = (n) => {
  if (n <= 1) return 0;
  const lim = Math.floor(0x100000000 / n) * n; // loại phần dư để chia đều
  const buf = new Uint32Array(1);
  do { crypto.getRandomValues(buf); } while (buf[0] >= lim);
  return buf[0] % n;
};

/** Xáo trộn Fisher-Yates, trả về mảng mới. */
export const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** Chọn ngẫu nhiên một phần tử. */
export const pick = (arr) => arr[rand(arr.length)];
