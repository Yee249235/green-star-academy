// 全站唯一的公式渲染入口。知识点、公式卡、题干、答案、解析都通过这里显示公式。
import katex from 'katex';
import 'katex/dist/katex.min.css';
import '../styles/math.css';
import { raw, esc } from '../views/dom.js';
import { katexOptions, splitInlineMath } from './katex-config.js';

function errorBox(tex, err, display) {
  console.error('[公式渲染错误]', err?.message ?? err, '\n源码：', tex);
  const tag = display ? 'div' : 'span';
  return `<${tag} class="math-error" title="${esc(err?.message ?? '公式错误')}">⚠ 公式错误：<code>${esc(tex)}</code></${tag}>`;
}

function toHtml(tex, display) {
  try {
    return katex.renderToString(tex, katexOptions(display));
  } catch (err) {
    return errorBox(tex, err, display);
  }
}

/**
 * 独立公式（居中、教材式大号排版），放在可横向滚动的公式框里。
 * tex 可以是字符串，也可以是字符串数组（多条公式依次排列）。
 */
export function displayMath(tex, { boxed = true } = {}) {
  const list = Array.isArray(tex) ? tex : [tex];
  const inner = list.map((t) => `<div class="math-display no-swipe">${toHtml(t, true)}</div>`).join('');
  return raw(boxed ? `<div class="formula-box">${inner}</div>` : inner);
}

/** 行内公式 */
export function inlineMath(tex) {
  return raw(toHtml(tex, false));
}

/** 正文：普通文字 + $行内公式$ */
export function rich(text) {
  if (text == null) return raw('');
  const out = splitInlineMath(String(text))
    .map((p) => {
      if (p.type === 'text') return esc(p.value);
      if (p.type === 'math') return toHtml(p.value, false);
      return errorBox('$' + p.value, new Error('缺少结尾的 $'), false);
    })
    .join('');
  return raw(out);
}
