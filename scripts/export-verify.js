#!/usr/bin/env node
// 把所有例题的 verify 规格导出为 JSON，交给 scripts/verify/verify.py 用 SymPy 验算。
import { subjects, chapterFormulas } from '../src/content/index.js';

const out = [];
for (const s of subjects) {
  for (const c of s.chapters) {
    if (c.sample) continue;
    for (const f of chapterFormulas(c)) {
      for (const ex of f.exercises ?? []) {
        if (ex.verify) out.push({ id: ex.id, verify: ex.verify });
      }
    }
  }
}
process.stdout.write(JSON.stringify(out));
