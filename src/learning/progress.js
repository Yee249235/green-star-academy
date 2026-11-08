// 进度汇总。
// - 做题完成度：每张公式卡按星星算，3 颗星 = 这张卡做题完成（100%），不到 3 颗按比例（例如 1.5 颗 = 50%）
// - 阅读完成度：知识点卡和公式卡中，双击记过至少 1 次阅读的比例
// - 综合完成度 = 做题完成度 × 70% + 阅读完成度 × 30%
// - 翻阅进度：自动记录翻到过的页（不用双击），表示「这本书读到哪里了」
import { all, subscribe } from '../data/store.js';
import { computeCardStars, MASTERED } from './stars.js';
import { subjects, chapterFormulas, chapterKnowledge, getPages, hasContent, pageKey } from '../content/index.js';

export const PRACTICE_WEIGHT = 0.7;
export const READ_WEIGHT = 0.3;

let cache = null;
subscribe(() => {
  cache = null;
});

function build() {
  const attemptsByCard = new Map();
  for (const a of all('attempts')) {
    if (!attemptsByCard.has(a.cardId)) attemptsByCard.set(a.cardId, []);
    attemptsByCard.get(a.cardId).push(a);
  }
  const readsByTarget = new Map();
  const visited = new Set();
  for (const r of all('reads')) {
    if (r.kind === 'visit') visited.add(r.pageKey);
    else readsByTarget.set(r.targetId, (readsByTarget.get(r.targetId) ?? 0) + 1);
  }

  const cardStats = new Map();
  const cardsByKnowledge = new Map();
  for (const s of subjects) {
    for (const c of s.chapters) {
      if (c.sample) continue;
      for (const f of chapterFormulas(c)) {
        cardStats.set(f.id, computeCardStars(f.exercises?.length ?? 1, attemptsByCard.get(f.id) ?? []));
        for (const k of f.knowledge ?? []) {
          if (!cardsByKnowledge.has(k)) cardsByKnowledge.set(k, []);
          cardsByKnowledge.get(k).push(f.id);
        }
      }
    }
  }
  return { attemptsByCard, readsByTarget, visited, cardStats, cardsByKnowledge };
}

function get() {
  return (cache ??= build());
}

const EMPTY = { stars: 0, practiceCount: 0, mastered: false, lastAt: null };

export function cardStats(cardId) {
  return get().cardStats.get(cardId) ?? EMPTY;
}

export function cardAttempts(cardId) {
  return get().attemptsByCard.get(cardId) ?? [];
}

export function readCount(targetId) {
  return get().readsByTarget.get(targetId) ?? 0;
}

export function isVisited(key) {
  return get().visited.has(key);
}

export function knowledgeStats(knowledgeId) {
  const ids = get().cardsByKnowledge.get(knowledgeId) ?? [];
  if (!ids.length) return { avgStars: 0, cards: 0 };
  const sum = ids.reduce((n, id) => n + cardStats(id).stars, 0);
  return { avgStars: sum / ids.length, cards: ids.length };
}

const pct = (x) => Math.round(x * 100);

function summarize(subjectId, chapters) {
  const list = chapters.filter((c) => !c.sample && hasContent(c));
  const cards = list.flatMap(chapterFormulas);
  const knowledge = list.flatMap(chapterKnowledge);
  const stats = cards.map((f) => cardStats(f.id));
  const total = cards.length;
  const stars = stats.reduce((n, s) => n + s.stars, 0);

  const practice = total ? stats.reduce((n, s) => n + Math.min(s.stars, MASTERED) / MASTERED, 0) / total : 0;
  const readables = [...knowledge, ...cards];
  const readDone = readables.filter((x) => readCount(x.id) > 0).length;
  const reading = readables.length ? readDone / readables.length : 0;

  let pagesTotal = 0;
  let pagesVisited = 0;
  for (const c of list) {
    for (const p of getPages(subjectId, c.id)) {
      pagesTotal++;
      if (isVisited(pageKey(subjectId, c.id, p))) pagesVisited++;
    }
  }

  return {
    total,
    mastered: stats.filter((s) => s.mastered).length,
    stars,
    practice: stats.reduce((n, s) => n + s.practiceCount, 0),
    practicePercent: pct(practice),
    readables: readables.length,
    readDone,
    readPercent: pct(reading),
    percent: pct(practice * PRACTICE_WEIGHT + reading * READ_WEIGHT), // 综合完成度
    pagesTotal,
    pagesVisited,
    pagesPercent: pagesTotal ? pct(pagesVisited / pagesTotal) : 0,
  };
}

export function chapterStats(subject, chapter) {
  return summarize(subject.id, [chapter]);
}

export function subjectStats(subject) {
  return summarize(subject.id, subject.chapters);
}

/** 这本书最远翻到的位置：{ chapter, page }（page 从 1 开始）；还没翻过返回 null */
export function furthestPosition(subject) {
  let found = null;
  for (const c of subject.chapters) {
    if (c.sample || !hasContent(c)) continue;
    getPages(subject.id, c.id).forEach((p, i) => {
      if (isVisited(pageKey(subject.id, c.id, p))) found = { chapter: c, page: i + 1 };
    });
  }
  return found;
}

export { chapterKnowledge };
