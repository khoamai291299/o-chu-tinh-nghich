import { QUESTIONS } from '../data/questions.js';

/* Lưu ván đang chơi để hôm sau chơi tiếp. Lưu trong trình duyệt (localStorage) và có thể xuất ra file để mang sang máy khác.
   Chỉ lưu những gì đã hoàn tất: điểm, thứ tự câu hỏi và đội, hộp nào đã mở. Câu đang chơi dở sẽ được mở lại từ đầu. */
const KEY = 'o-chu-tinh-nghich:save:v1';
const VERSION = 1;

/** Dựng gói lưu từ trạng thái trò chơi. */
export const pack = ({ teams, order, done, results, chooser, turnOrder, random }) => ({
  version: VERSION,
  savedAt: Date.now(),
  teams,
  order: order.map((q) => q.id),
  done: [...done],
  results,
  chooser,
  turnOrder,
  random,
});

/** Kiểm tra gói lưu có hợp lệ không, trả về trạng thái đã dựng lại hoặc null. */
export const unpack = (d) => {
  try {
    if (!d || d.version !== VERSION) return null;
    if (!Array.isArray(d.teams) || d.teams.length !== 4) return null;
    const byId = new Map(QUESTIONS.map((q) => [q.id, q]));
    if (!Array.isArray(d.order) || d.order.length !== QUESTIONS.length || !d.order.every((id) => byId.has(id))) return null;
    if (new Set(d.order).size !== d.order.length) return null;
    const done = new Set((d.done || []).filter((i) => Number.isInteger(i) && i >= 0 && i < d.order.length));
    const teams = d.teams.map((t, i) => ({ id: i, name: String(t.name || `Đội ${i + 1}`).slice(0, 14), avatar: t.avatar, score: Number(t.score) || 0 }));
    const ok = (c) => c === null || (Number.isInteger(c) && c >= 0 && c < 4);
    return {
      teams,
      order: d.order.map((id) => byId.get(id)),
      done,
      results: d.results && typeof d.results === 'object' ? d.results : {},
      chooser: ok(d.chooser) ? d.chooser : null,
      turnOrder: Array.isArray(d.turnOrder) && d.turnOrder.length === 4 && d.turnOrder.every(ok) ? d.turnOrder : null,
      random: d.random !== false,
      savedAt: d.savedAt || null,
    };
  } catch { return null; }
};

export const writeSave = (state) => {
  try { localStorage.setItem(KEY, JSON.stringify(pack(state))); return true; } catch { return false; }
};
export const readSave = () => {
  try { const raw = localStorage.getItem(KEY); return raw ? unpack(JSON.parse(raw)) : null; } catch { return null; }
};
export const clearSave = () => { try { localStorage.removeItem(KEY); } catch { /* bỏ qua */ } };

/** Tải gói lưu về máy dưới dạng file .json. */
export const downloadSave = (state) => {
  const blob = new Blob([JSON.stringify(pack(state), null, 1)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `o-chu-tinh-nghich-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
};

/** Đọc file lưu người dùng chọn, trả về trạng thái hoặc null. */
export const readFile = (file) => new Promise((resolve) => {
  const fr = new FileReader();
  fr.onload = () => { try { resolve(unpack(JSON.parse(String(fr.result)))); } catch { resolve(null); } };
  fr.onerror = () => resolve(null);
  fr.readAsText(file);
});

export const fmtTime = (ts) => (ts ? new Date(ts).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' }) : '');
