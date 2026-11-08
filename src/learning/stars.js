// 星星规则（纯函数，便于测试）：
// - 每道例题每天只有第一次自评计入星星；之后的自评只算练习次数
// - 只有 1 道例题的卡：独立做对 +1
// - 有 2 道及以上例题的卡：每道独立做对 +0.5
// - 看提示 / 看解析后做对：独立做对的一半（1 道例题的卡 +0.5，多道例题的卡每道 +0.25）
// - 做错：每道 −0.5
// - 每张卡每天最多 +1 颗；星星范围 0～5，按半颗显示；≥3 颗为「已掌握」（做题完成度按 3 颗封顶计算）

export const MAX_STARS = 5;
export const MASTERED = 3;

export function gainPerCorrect(exerciseCount) {
  return exerciseCount <= 1 ? 1 : 0.5;
}

/** 看提示 / 看解析后做对：独立做对的一半 */
export function gainPerHinted(exerciseCount) {
  return gainPerCorrect(exerciseCount) / 2;
}

/**
 * @param {number} exerciseCount 该卡的例题数
 * @param {Array<{exerciseId:string, result:'correct'|'hinted'|'wrong', at:number, day:string}>} attempts 该卡的全部自评
 */
export function computeCardStars(exerciseCount, attempts) {
  const sorted = [...attempts].sort((a, b) => a.at - b.at);
  const byDay = new Map();
  for (const a of sorted) {
    if (!byDay.has(a.day)) byDay.set(a.day, new Map());
    const firsts = byDay.get(a.day);
    if (!firsts.has(a.exerciseId)) firsts.set(a.exerciseId, a); // 当天该题第一次
  }
  let stars = 0;
  const unit = gainPerCorrect(exerciseCount);
  const hintedUnit = gainPerHinted(exerciseCount);
  for (const day of [...byDay.keys()].sort()) {
    let gain = 0;
    let loss = 0;
    for (const a of byDay.get(day).values()) {
      if (a.result === 'correct') gain += unit;
      else if (a.result === 'hinted') gain += hintedUnit;
      else if (a.result === 'wrong') loss += 0.5;
    }
    stars = Math.min(MAX_STARS, Math.max(0, stars + Math.min(1, gain) - loss));
  }
  return {
    stars,
    practiceCount: attempts.length,
    mastered: stars >= MASTERED,
    lastAt: sorted.at(-1)?.at ?? null,
  };
}

/** 今天这道题是否已经计过星（用于提示「今天只计练习次数」） */
export function countedToday(attempts, exerciseId, day) {
  return attempts.some((a) => a.exerciseId === exerciseId && a.day === day);
}
