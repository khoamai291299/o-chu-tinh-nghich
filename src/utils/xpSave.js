import { XP_QUESTIONS, XP_TOTAL } from '../data/xpQuestions.js';

/* Lưu ván chế độ Xung phong. Khóa riêng, không đụng tới bản lưu của chế độ 4 đội (utils/save.js). */
export const XP_KEY = 'o-chu-tinh-nghich:save:xp:v1';
const VERSION = 1;
const OK = new Set(['right', 'timeout']);
const store = () => globalThis.localStorage;

/** Dựng gói lưu từ trạng thái ván. */
export const packXp = ({ order, done, results }) => ({
  mode: 'xp',
  version: VERSION,
  savedAt: Date.now(),
  order: order.map((q) => q.id),
  done: [...done],
  results,
});

/** Kiểm tra gói lưu, trả về trạng thái dựng lại hoặc null. */
export const unpackXp = (d) => {
  try {
    if (!d || d.mode !== 'xp' || d.version !== VERSION) return null;
    const byId = new Map(XP_QUESTIONS.map((q) => [q.id, q]));
    if (!Array.isArray(d.order) || d.order.length !== XP_TOTAL || !d.order.every((id) => byId.has(id))) return null;
    if (new Set(d.order).size !== XP_TOTAL) return null;
    const done = new Set((d.done || []).filter((i) => Number.isInteger(i) && i >= 0 && i < XP_TOTAL));
    const results = {};
    for (const i of done) if (d.results && OK.has(d.results[i])) results[i] = d.results[i];
    return { order: d.order.map((id) => byId.get(id)), done, results, savedAt: d.savedAt || null };
  } catch { return null; }
};

export const writeXpSave = (state, storage = store()) => {
  try { storage.setItem(XP_KEY, JSON.stringify(packXp(state))); return true; } catch { return false; }
};
export const readXpSave = (storage = store()) => {
  try { const raw = storage.getItem(XP_KEY); return raw ? unpackXp(JSON.parse(raw)) : null; } catch { return null; }
};
export const clearXpSave = (storage = store()) => { try { storage.removeItem(XP_KEY); } catch { /* bỏ qua */ } };

/** Tải gói lưu về máy dưới dạng file .json. */
export const downloadXpSave = (state) => {
  const blob = new Blob([JSON.stringify(packXp(state), null, 1)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `o-chu-tinh-nghich-xung-phong-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
};

/** Đọc file lưu người dùng chọn, trả về trạng thái hoặc null. */
export const readXpFile = (file) => new Promise((resolve) => {
  const fr = new FileReader();
  fr.onload = () => { try { resolve(unpackXp(JSON.parse(String(fr.result)))); } catch { resolve(null); } };
  fr.onerror = () => resolve(null);
  fr.readAsText(file);
});
