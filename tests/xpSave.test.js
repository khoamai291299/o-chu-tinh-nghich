import { test } from 'node:test';
import assert from 'node:assert/strict';
import { XP_QUESTIONS } from '../src/data/xpQuestions.js';
import { XP_KEY, packXp, unpackXp, writeXpSave, readXpSave, clearXpSave } from '../src/utils/xpSave.js';

const mem = () => {
  const calls = [];
  const data = new Map();
  return { calls, data, getItem: (k) => { calls.push(['get', k]); return data.has(k) ? data.get(k) : null; }, setItem: (k, v) => { calls.push(['set', k]); data.set(k, v); }, removeItem: (k) => { calls.push(['remove', k]); data.delete(k); } };
};
const base = () => ({ order: [...XP_QUESTIONS].reverse(), done: new Set([0, 3]), results: { 0: 'right', 3: 'timeout' } });

test('khóa lưu riêng', () => { assert.equal(XP_KEY, 'o-chu-tinh-nghich:save:xp:v1'); });

test('ghi rồi đọc giữ nguyên order, done, results', () => {
  const st = mem();
  assert.equal(writeXpSave(base(), st), true);
  const g = readXpSave(st);
  assert.deepEqual(g.order.map((q) => q.id), base().order.map((q) => q.id));
  assert.deepEqual([...g.done], [0, 3]);
  assert.deepEqual(g.results, { 0: 'right', 3: 'timeout' });
});

test('chỉ đụng tới XP_KEY', () => {
  const st = mem();
  writeXpSave(base(), st); readXpSave(st); clearXpSave(st);
  assert.ok(st.calls.every(([, k]) => k === XP_KEY));
  assert.deepEqual(st.calls.map(([a]) => a), ['set', 'get', 'remove']);
});

test('từ chối bản lưu của chế độ 4 đội', () => {
  const main = { version: 1, teams: [{}, {}, {}, {}], order: XP_QUESTIONS.map((q) => q.id), done: [], results: {} };
  assert.equal(unpackXp(main), null);
});

test('từ chối order thiếu, trùng, mode hoặc version sai', () => {
  const ok = packXp(base());
  assert.ok(unpackXp(ok));
  assert.equal(unpackXp({ ...ok, order: ok.order.slice(1) }), null);
  assert.equal(unpackXp({ ...ok, order: [ok.order[0], ...ok.order.slice(0, 24)] }), null);
  assert.equal(unpackXp({ ...ok, mode: 'teams' }), null);
  assert.equal(unpackXp({ ...ok, version: 2 }), null);
  assert.equal(unpackXp(null), null);
});

test('done lọc chỉ số sai, results bỏ khóa ngoài done và giá trị lạ', () => {
  const ok = packXp(base());
  const g = unpackXp({ ...ok, done: [0, 99, -1, 2.5, 3], results: { 0: 'right', 3: 'x', 7: 'right' } });
  assert.deepEqual([...g.done].sort(), [0, 3]);
  assert.deepEqual(g.results, { 0: 'right' });
});

test('readXpSave trả null khi storage ném lỗi hoặc JSON hỏng', () => {
  assert.equal(readXpSave({ getItem: () => { throw new Error('x'); } }), null);
  assert.equal(readXpSave({ getItem: () => '{hỏng' }), null);
});
