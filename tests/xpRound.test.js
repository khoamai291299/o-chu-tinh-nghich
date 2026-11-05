import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initRound, roundReduce as r, hintLevel, DURATION, HINT_AT } from '../src/utils/xpRound.js';

test('hằng số và trạng thái đầu', () => {
  assert.equal(DURATION, 30);
  assert.deepEqual(HINT_AT, [15, 25]);
  assert.deepEqual(initRound(), { status: 'run', left: 30, spent: 0, outcome: null, revealed: false, replay: 0 });
});

test('tick trừ giờ và cộng spent khi đang chạy', () => {
  const s = r(initRound(), { type: 'tick', dt: 0.5 });
  assert.equal(s.left, 29.5);
  assert.equal(s.spent, 0.5);
});

test('hết giờ: status end, outcome timeout, left không âm', () => {
  let s = r(initRound(), { type: 'tick', dt: 29.95 });
  s = r(s, { type: 'tick', dt: 0.1 });
  assert.equal(s.left, 0);
  assert.equal(s.status, 'end');
  assert.equal(s.outcome, 'timeout');
});

test('toggle chuyển run <-> held', () => {
  const a = r(initRound(), { type: 'toggle' });
  assert.equal(a.status, 'held');
  assert.equal(r(a, { type: 'toggle' }).status, 'run');
});

test('đang dừng thì tick không làm đổi left, spent và không hết giờ', () => {
  const held = r(r(initRound(), { type: 'tick', dt: 29 }), { type: 'toggle' });
  const s = r(held, { type: 'tick', dt: 5 });
  assert.equal(s, held);
  assert.equal(s.status, 'held');
});

test('dừng và chạy tiếp nhiều lần không làm spent nhảy', () => {
  let s = r(initRound(), { type: 'tick', dt: 3 });
  for (let i = 0; i < 4; i++) s = r(s, { type: 'toggle' });
  assert.equal(s.spent, 3);
  assert.equal(s.left, 27);
});

test('Đúng khi đang dừng: end + right', () => {
  const s = r(r(initRound(), { type: 'toggle' }), { type: 'right' });
  assert.equal(s.status, 'end');
  assert.equal(s.outcome, 'right');
});

test('Sai khi đang dừng: chạy tiếp, giữ nguyên giờ', () => {
  const held = r(r(initRound(), { type: 'tick', dt: 7 }), { type: 'toggle' });
  const s = r(held, { type: 'wrong' });
  assert.equal(s.status, 'run');
  assert.equal(s.left, 23);
  assert.equal(s.spent, 7);
});

test('Đúng/Sai khi chưa dừng chuông không làm gì', () => {
  const s = initRound();
  assert.equal(r(s, { type: 'right' }), s);
  assert.equal(r(s, { type: 'wrong' }), s);
});

test('reveal và replay chỉ hợp lệ sau khi hết giờ', () => {
  const run = initRound();
  assert.equal(r(run, { type: 'reveal' }), run);
  assert.equal(r(run, { type: 'replay' }), run);
  const end = r(run, { type: 'tick', dt: 31 });
  const again = r(end, { type: 'replay' });
  assert.equal(again.replay, 1);
  const shown = r(again, { type: 'reveal' });
  assert.equal(shown.revealed, true);
  assert.equal(r(shown, { type: 'replay' }), shown);
});

test('hintLevel theo mốc 15s và 25s', () => {
  const at = (spent) => hintLevel({ ...initRound(), spent });
  assert.equal(at(14.9), 0);
  assert.equal(at(15), 1);
  assert.equal(at(24.9), 1);
  assert.equal(at(25), 2);
});

test('150 nhịp 0,1 giây cho đúng gợi ý 1 ở giây 15, không trễ vì sai số số thực', async () => {
  const { initRound, roundReduce, hintLevel } = await import('../src/utils/xpRound.js');
  let s = initRound();
  for (let i = 0; i < 149; i++) s = roundReduce(s, { type: 'tick', dt: 0.1 });
  assert.equal(hintLevel(s), 0);
  s = roundReduce(s, { type: 'tick', dt: 0.1 });
  assert.equal(hintLevel(s), 1);
});
