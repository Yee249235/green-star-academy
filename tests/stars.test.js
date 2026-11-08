import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeCardStars } from '../src/learning/stars.js';

let t = 0;
const at = (day, exerciseId, result) => ({ day, exerciseId, result, at: ++t });

test('1 道例题：独立做对 +1，同一天重复点击不再加星', () => {
  const r = computeCardStars(1, [at('2026-11-01', 'e1', 'correct'), at('2026-11-01', 'e1', 'correct'), at('2026-11-01', 'e1', 'correct')]);
  assert.equal(r.stars, 1);
  assert.equal(r.practiceCount, 3);
});

test('每天各做对一次，3 天达到基本完成，最多 5 颗', () => {
  const days = ['01', '02', '03', '04', '05', '06', '07'].map((d) => at(`2026-11-${d}`, 'e1', 'correct'));
  const r3 = computeCardStars(1, days.slice(0, 3));
  assert.equal(r3.stars, 3);
  assert.equal(r3.mastered, true);
  assert.equal(computeCardStars(1, days).stars, 5);
});

test('2 道例题：每道 +0.5，一天最多 +1', () => {
  assert.equal(computeCardStars(2, [at('2026-11-01', 'e1', 'correct')]).stars, 0.5);
  assert.equal(computeCardStars(2, [at('2026-11-01', 'e1', 'correct'), at('2026-11-01', 'e2', 'correct')]).stars, 1);
});

test('3 道例题全对，当天也只加 1 颗', () => {
  const r = computeCardStars(3, [at('2026-11-01', 'a', 'correct'), at('2026-11-01', 'b', 'correct'), at('2026-11-01', 'c', 'correct')]);
  assert.equal(r.stars, 1);
});

test('做错 −0.5，不低于 0', () => {
  assert.equal(computeCardStars(1, [at('2026-11-01', 'e1', 'wrong')]).stars, 0);
  const r = computeCardStars(1, [at('2026-11-01', 'e1', 'correct'), at('2026-11-02', 'e1', 'correct'), at('2026-11-03', 'e1', 'wrong')]);
  assert.equal(r.stars, 1.5);
});

test('看提示后做对：只算练习，不加星', () => {
  const r = computeCardStars(1, [at('2026-11-01', 'e1', 'hinted')]);
  assert.equal(r.stars, 0);
  assert.equal(r.practiceCount, 1);
});

test('当天先做错再做对：只按第一次（做错）计', () => {
  const r = computeCardStars(1, [at('2026-11-01', 'e1', 'correct'), at('2026-11-02', 'e1', 'wrong'), at('2026-11-02', 'e1', 'correct')]);
  assert.equal(r.stars, 0.5);
});

test('记录顺序打乱（多设备合并）结果不变', () => {
  const list = [at('2026-11-02', 'e1', 'correct'), at('2026-11-01', 'e1', 'correct'), at('2026-11-03', 'e2', 'wrong')];
  const shuffled = [list[2], list[0], list[1]];
  assert.deepEqual(computeCardStars(2, list).stars, computeCardStars(2, shuffled).stars);
});
