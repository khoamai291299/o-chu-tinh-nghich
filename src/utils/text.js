/** Chuẩn hóa chuỗi để so đáp án: bỏ hoa/thường, dấu tiếng Việt, khoảng trắng và dấu câu. */
export const norm = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]/g, '');

/** Xáo trộn mảng (Fisher–Yates), không làm thay đổi mảng gốc. */
export const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
