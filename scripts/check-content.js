#!/usr/bin/env node
// 内容完整性检查：字段、ID 唯一、引用存在、三语题干、已发布 ID 不得消失。
//   node scripts/check-content.js            检查
//   node scripts/check-content.js --update   检查并把当前 ID 记入 published-ids.json
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { subjects, chapterSections } from '../src/content/index.js';

const REGISTRY = new URL('./published-ids.json', import.meta.url);
const errors = [];
const warnings = [];
const ids = new Map();
const knowledgeIds = new Set();

const err = (where, msg) => errors.push(`${where}：${msg}`);
const nonEmpty = (v) => (typeof v === 'string' ? v.trim().length > 0 : Array.isArray(v) ? v.length > 0 : v != null);

function registerId(id, where) {
  if (!id) return err(where, '缺少 id');
  if (ids.has(id)) err(where, `id 重复：${id}（另一处在 ${ids.get(id)}）`);
  ids.set(id, where);
}

function checkName(name, where) {
  for (const k of ['zh', 'ja', 'kana']) if (!nonEmpty(name?.[k])) err(where, `name.${k} 为空`);
}

// 第一遍：登记知识点 id
for (const s of subjects) {
  for (const c of s.chapters) {
    for (const sec of chapterSections(c)) for (const k of sec.knowledge ?? []) knowledgeIds.add(k.id);
  }
}

const checkRefs = (refs, where) => {
  for (const r of refs ?? []) if (!knowledgeIds.has(r)) err(where, `引用了不存在的知识点：${r}`);
};

for (const s of subjects) {
  for (const c of s.chapters) {
    const sections = chapterSections(c);
    if (!sections.length) continue;
    const chapterWhere = `${s.id}/${c.id}`;
    if (c.sample) {
      warnings.push(`${chapterWhere} 是示例内容（跳过详细检查）`);
      continue;
    }
    for (const sec of sections) {
      for (const k of sec.knowledge ?? []) {
        const w = `${chapterWhere} 知识点 ${k.id}`;
        registerId(k.id, w);
        checkName(k.name, w);
        if (!nonEmpty(k.paragraphs)) err(w, '缺少概念解释 paragraphs');
        checkRefs(k.related, w);
      }
      for (const f of sec.formulas ?? []) {
        const w = `${chapterWhere} 公式卡 ${f.id}`;
        registerId(f.id, w);
        checkName(f.name, w);
        for (const field of ['formula', 'conditions', 'scenarios', 'steps', 'pitfalls', 'exercises']) {
          if (!nonEmpty(f[field])) err(w, `缺少 ${field}`);
        }
        if (!nonEmpty(f.knowledge)) err(w, '缺少关联知识点 knowledge');
        checkRefs(f.knowledge, w);
        for (const ex of f.exercises ?? []) {
          const we = `${w} 例题 ${ex.id}`;
          registerId(ex.id, we);
          if (!ex.id?.startsWith(f.id + '.')) err(we, `例题 id 应以公式卡 id「${f.id}.」开头`);
          if (!['易', '中', '难'].includes(ex.difficulty)) err(we, 'difficulty 必须是 易 / 中 / 难');
          for (const lang of ['zh', 'ja', 'en']) if (!nonEmpty(ex.question?.[lang])) err(we, `题干 question.${lang} 为空`);
          if (!nonEmpty(ex.answer) && !nonEmpty(ex.answerText)) err(we, '缺少标准答案 answer / answerText');
          if (!nonEmpty(ex.idea)) err(we, '缺少解题思路 idea');
          if (!nonEmpty(ex.solution)) err(we, '缺少详细计算过程 solution');
          if (!nonEmpty(ex.pitfalls)) err(we, '缺少易错点 pitfalls');
          if (!ex.verify && !nonEmpty(ex.verifyNote)) err(we, '缺少 SymPy 验算 verify（无法机器验算时写 verifyNote 说明）');
          checkRefs(ex.knowledge, we);
        }
      }
    }
  }
}

// 已发布的 ID 不能消失（学习记录靠 ID 关联）
const published = existsSync(REGISTRY) ? JSON.parse(readFileSync(REGISTRY, 'utf8')) : [];
for (const id of published) if (!ids.has(id)) err('published-ids.json', `已发布的 id 被删除或改名：${id}`);

if (process.argv.includes('--update') && !errors.length) {
  const all = [...new Set([...published, ...ids.keys()])].sort();
  writeFileSync(REGISTRY, JSON.stringify(all, null, 2) + '\n');
  console.log(`已记录 ${all.length} 个已发布 id`);
}

warnings.forEach((w) => console.log(`  ⚠ ${w}`));
if (errors.length) {
  console.error(`\n✗ 内容检查失败：${errors.length} 处\n`);
  errors.forEach((e) => console.error('  ' + e));
  process.exit(1);
}
console.log(`✓ 内容检查通过：${ids.size} 个 id（知识点、公式卡、例题）`);
