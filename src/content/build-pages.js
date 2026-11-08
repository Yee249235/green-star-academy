// 把一章的内容数据展开成阅读器的页序列：
// 概览 → 每一节：节的知识点 → 公式卡（内容多时拆成两页）→ 该卡的例题（一题一页）→ … → 章末
const SPLIT_THRESHOLD = 7; // 计算步骤 + 易错点 + 适用条件 + 使用场景超过这个条数时，公式卡拆成两页

export function buildPages(chapter, sections) {
  const pages = [{ type: 'overview', title: '本章概览' }];

  sections.forEach((section, si) => {
    const sectionLabel = section.title ?? null;
    for (const k of section.knowledge ?? []) {
      pages.push({ type: 'knowledge', title: k.name.zh, item: k, section: sectionLabel, sectionIndex: si });
    }
    for (const f of section.formulas ?? []) {
      const size =
        (f.steps?.length ?? 0) + (f.pitfalls?.length ?? 0) + (f.conditions?.length ?? 0) + (f.scenarios?.length ?? 0);
      const parts = size > SPLIT_THRESHOLD ? 2 : 1;
      for (let p = 1; p <= parts; p++) {
        pages.push({
          type: 'formula',
          part: parts === 1 ? 0 : p,
          parts,
          title: parts === 1 || p === 1 ? f.name.zh : `${f.name.zh}（续）`,
          item: f,
          section: sectionLabel,
          sectionIndex: si,
        });
      }
      (f.exercises ?? []).forEach((ex, i) => {
        pages.push({
          type: 'exercise',
          title: `${f.name.zh} · 例题 ${i + 1}`,
          item: ex,
          formula: f,
          index: i,
          total: f.exercises.length,
          section: sectionLabel,
          sectionIndex: si,
        });
      });
    }
  });

  pages.push({ type: 'end', title: '本章结束' });
  return pages;
}
