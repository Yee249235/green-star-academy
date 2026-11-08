// 把一章的内容数据展开成阅读器的页序列：
// 概览 → 知识点 → 公式卡（内容多时拆成两页）→ 该卡的例题（一题一页）→ 下一张公式卡 … → 章末
const SPLIT_THRESHOLD = 6; // 计算步骤 + 易错点超过这个条数时，公式卡拆成两页

export function buildPages(chapter) {
  const pages = [{ type: 'overview', title: '本章概览' }];

  for (const k of chapter.knowledge ?? []) {
    pages.push({ type: 'knowledge', title: k.name.zh, item: k });
  }

  for (const f of chapter.formulas ?? []) {
    const long = (f.steps?.length ?? 0) + (f.pitfalls?.length ?? 0) > SPLIT_THRESHOLD;
    if (long) {
      pages.push({ type: 'formula', part: 1, parts: 2, title: f.name.zh, item: f });
      pages.push({ type: 'formula', part: 2, parts: 2, title: `${f.name.zh}（续）`, item: f });
    } else {
      pages.push({ type: 'formula', part: 0, parts: 1, title: f.name.zh, item: f });
    }
    (f.exercises ?? []).forEach((ex, i) => {
      pages.push({
        type: 'exercise',
        title: `${f.name.zh} · 例题 ${i + 1}`,
        item: ex,
        formula: f,
        index: i,
        total: f.exercises.length,
      });
    });
  }

  pages.push({ type: 'end', title: '本章结束' });
  return pages;
}
