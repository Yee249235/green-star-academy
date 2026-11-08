import { calculus } from './calculus/index.js';
import { linearAlgebra } from './linear-algebra/index.js';
import { buildPages } from './build-pages.js';

export const subjects = [calculus, linearAlgebra];

export function getSubject(subjectId) {
  return subjects.find((s) => s.id === subjectId) ?? null;
}

export function getChapter(subjectId, chapterId) {
  const subject = getSubject(subjectId);
  return subject?.chapters.find((c) => c.id === chapterId) ?? null;
}

export function hasContent(chapter) {
  return Boolean(chapter?.formulas?.length || chapter?.knowledge?.length);
}

const pageCache = new Map();
export function getPages(subjectId, chapterId) {
  const key = `${subjectId}/${chapterId}`;
  if (!pageCache.has(key)) {
    const chapter = getChapter(subjectId, chapterId);
    pageCache.set(key, chapter ? buildPages(chapter) : []);
  }
  return pageCache.get(key);
}

/** 同一科目中的下一章（用于章末页） */
export function nextChapter(subjectId, chapterId) {
  const subject = getSubject(subjectId);
  if (!subject) return null;
  const i = subject.chapters.findIndex((c) => c.id === chapterId);
  return subject.chapters[i + 1] ?? null;
}
