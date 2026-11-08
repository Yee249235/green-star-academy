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

/** 统一成分节结构：没有 sections 的章节视为只有一节 */
export function chapterSections(chapter) {
  if (!chapter) return [];
  if (chapter.sections) return chapter.sections;
  if (chapter.formulas || chapter.knowledge) {
    return [{ title: null, knowledge: chapter.knowledge ?? [], formulas: chapter.formulas ?? [] }];
  }
  return [];
}

export function chapterFormulas(chapter) {
  return chapterSections(chapter).flatMap((s) => s.formulas ?? []);
}

export function chapterKnowledge(chapter) {
  return chapterSections(chapter).flatMap((s) => s.knowledge ?? []);
}

export function hasContent(chapter) {
  return chapterSections(chapter).some((s) => s.formulas?.length || s.knowledge?.length);
}

/** 全部知识点：id → 知识点（用于「关联知识点」显示） */
export const knowledgeIndex = new Map(
  subjects.flatMap((s) => s.chapters.flatMap((c) => chapterKnowledge(c).map((k) => [k.id, k]))),
);

const pageCache = new Map();
export function getPages(subjectId, chapterId) {
  const key = `${subjectId}/${chapterId}`;
  if (!pageCache.has(key)) {
    const chapter = getChapter(subjectId, chapterId);
    pageCache.set(key, chapter ? buildPages(chapter, chapterSections(chapter)) : []);
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

/** 页面的稳定标识（用于记录「翻到过哪些页」）：内容增删时页码会变，但卡片 id 不变 */
export function pageKey(subjectId, chapterId, page) {
  let k;
  if (page.type === 'overview' || page.type === 'end') k = page.type;
  else k = page.item.id + (page.part ? `#${page.part}` : '');
  return `${subjectId}/${chapterId}/${k}`;
}
