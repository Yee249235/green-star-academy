#!/usr/bin/env node
// 构建期公式校验：用与网页相同的 KaTeX 设置（严格模式）渲染全部公式。
// 任何一条出错 → 打印「位置 + 错误 + 源码」并以非零状态退出，构建与发布随之中止。
//
// 规则：
//   - 键名为 formula / display / steps_tex 等「独立公式」字段：整串按 display 模式渲染
//   - 其他所有字符串：提取 $…$ 行内公式渲染；未闭合的 $ 视为错误
import katex from 'katex';
import { katexOptions, splitInlineMath } from '../src/math/katex-config.js';
import { subjects } from '../src/content/index.js';
import { mathTestGroups, mathTestInline } from '../src/math/test-cases.js';

const DISPLAY_KEYS = new Set(['formula', 'display', 'tex', 'answer', 'math', 'definitions']);
const SKIP_KEYS = new Set(['verify', 'id']);

const errors = [];
let count = 0;

function check(tex, display, where) {
  count++;
  try {
    katex.renderToString(tex, katexOptions(display));
  } catch (err) {
    errors.push({ where, message: err.message, tex });
  }
}

function checkText(text, where) {
  for (const part of splitInlineMath(text)) {
    if (part.type === 'math') check(part.value, false, where);
    if (part.type === 'unclosed') errors.push({ where, message: '缺少结尾的 $', tex: '$' + part.value });
  }
}

function walk(node, path, displayKey = false) {
  if (typeof node === 'string') {
    if (displayKey) check(node, true, path);
    else checkText(node, path);
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => walk(v, `${path}[${i}]`, displayKey));
  } else if (node && typeof node === 'object') {
    if (node.expectError) return;
    const label = node.id ? `${path}〈${node.id}〉` : path;
    for (const [k, v] of Object.entries(node)) {
      if (SKIP_KEYS.has(k)) continue;
      walk(v, `${label}.${k}`, DISPLAY_KEYS.has(k));
    }
  }
}

for (const s of subjects) walk(s, s.id);
walk(mathTestGroups, 'math-test');
walk(mathTestInline, 'math-test.inline');

if (errors.length) {
  console.error(`\n✗ 公式校验失败：${errors.length} 处错误（共检查 ${count} 条公式）\n`);
  for (const e of errors) {
    console.error(`  位置：${e.where}`);
    console.error(`  错误：${e.message}`);
    console.error(`  源码：${e.tex}\n`);
  }
  process.exit(1);
}
console.log(`✓ 公式校验通过：共 ${count} 条公式`);
