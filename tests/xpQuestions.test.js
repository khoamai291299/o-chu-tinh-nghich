import { test } from 'node:test';
import assert from 'node:assert/strict';
import { XP_QUESTIONS, XP_TOTAL, XP_SCENE_KEYS } from '../src/data/xpQuestions.js';

const ANSWERS = ['Cầu kiến', 'Đẽo cày giữa đường', 'Đường mật', 'Ếch ngồi đáy giếng', 'Ôm cây đợi thỏ', 'Vẽ rắn thêm chân', 'Đàn gảy tai trâu', 'Mèo khen mèo dài đuôi', 'Chuột sa chĩnh gạo', 'Mò kim đáy bể', 'Đầu voi đuôi chuột', 'Rút dây động rừng', 'Thêm dầu vào lửa', 'Nước mắt cá sấu', 'Rồng rắn lên mây', 'Thuận buồm xuôi gió', 'Mèo mù vớ cá rán', 'Mật ngọt chết ruồi', 'Cá nằm trên thớt', 'Cá lớn nuốt cá bé', 'Lên voi xuống chó', 'Nước đổ lá khoai', 'Lá lành đùm lá rách', 'Chậm như rùa', 'Tre già măng mọc'];

test('có đúng 25 câu, id từ 1 đến 25', () => {
  assert.equal(XP_TOTAL, 25);
  assert.equal(XP_QUESTIONS.length, 25);
  assert.deepEqual(XP_QUESTIONS.map((q) => q.id), Array.from({ length: 25 }, (_, i) => i + 1));
});

test('đáp án đúng danh sách đã chốt, đúng thứ tự', () => {
  assert.deepEqual(XP_QUESTIONS.map((q) => q.answer), ANSWERS);
});

test('mỗi câu có 2 gợi ý và lời giải nghĩa không rỗng', () => {
  for (const q of XP_QUESTIONS) {
    assert.equal(q.hints.length, 2, q.answer);
    assert.ok(q.hints.every((h) => typeof h === 'string' && h.trim()), q.answer);
    assert.ok(typeof q.explain === 'string' && q.explain.trim(), q.answer);
  }
});

test('khóa cảnh không trùng và khớp XP_SCENE_KEYS', () => {
  assert.equal(new Set(XP_SCENE_KEYS).size, 25);
  XP_QUESTIONS.forEach((q, i) => assert.equal(q.scene, XP_SCENE_KEYS[i]));
});
