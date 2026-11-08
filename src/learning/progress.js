// 进度汇总：公式卡的星星是基础；知识点 = 关联公式卡的平均；章节 = 基本完成率 + 平均星数。
import { all, subscribe } from '../data/store.js';
import { computeCardStars, MAX_STARS } from './stars.js';
import { subjects, chapterFormulas, chapterKnowledge } from '../content/index.js';

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
  for (const r of all('reads')) readsByTarget.set(r.targetId, (readsByTarget.get(r.targetId) ?? 0) + 1);

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
  return { attemptsByCard, readsByTarget, cardStats, cardsByKnowledge };
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

export function knowledgeStats(knowledgeId) {
  const ids = get().cardsByKnowledge.get(knowledgeId) ?? [];
  if (!ids.length) return { avgStars: 0, cards: 0 };
  const sum = ids.reduce((n, id) => n + cardStats(id).stars, 0);
  return { avgStars: sum / ids.length, cards: ids.length };
}

function summarize(cards) {
  const stats = cards.map((f) => cardStats(f.id));
  const total = cards.length;
  const stars = stats.reduce((n, s) => n + s.stars, 0);
  return {
    total,
    mastered: stats.filter((s) => s.mastered).length,
    stars,
    practice: stats.reduce((n, s) => n + s.practiceCount, 0),
    avgStars: total ? stars / total : 0,
    percent: total ? Math.round((stats.filter((s) => s.mastered).length / total) * 100) : 0,
    starPercent: total ? Math.round((stars / (total * MAX_STARS)) * 100) : 0,
  };
}

export function chapterStats(chapter) {
  if (chapter.sample) return summarize([]);
  return summarize(chapterFormulas(chapter));
}

export function subjectStats(subject) {
  return summarize(subject.chapters.filter((c) => !c.sample).flatMap(chapterFormulas));
}

export function overallStats() {
  return summarize(subjects.flatMap((s) => s.chapters.filter((c) => !c.sample).flatMap(chapterFormulas)));
}

export { chapterKnowledge };
