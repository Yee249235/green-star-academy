// KaTeX 公共设置：网页渲染与构建期校验使用同一份，保证「检查通过 = 网页能显示」。

// 常用宏：与日本教材记号保持一致
export const macros = {
  '\\R': '\\mathbb{R}',
  '\\C': '\\mathbb{C}',
  '\\N': '\\mathbb{N}',
  '\\Z': '\\mathbb{Z}',
  '\\Q': '\\mathbb{Q}',
  '\\rank': '\\operatorname{rank}',
  '\\tr': '\\operatorname{tr}',
  '\\Ker': '\\operatorname{Ker}',
  '\\Image': '\\operatorname{Im}',
  '\\diag': '\\operatorname{diag}',
  '\\sgn': '\\operatorname{sgn}',
  '\\Log': '\\operatorname{Log}',
};

/**
 * 严格模式：任何不规范写法都当作错误。
 * 唯一例外：\text{} 里的中文 / 日文（unicodeTextInMathMode），这是正常需求。
 */
export function strict(errorCode) {
  if (errorCode === 'unicodeTextInMathMode') return 'ignore';
  return 'error';
}

export function katexOptions(displayMode) {
  return {
    displayMode,
    throwOnError: true,
    strict,
    trust: false,
    output: 'htmlAndMathml', // 同时输出 MathML，读屏软件可读
    macros: { ...macros }, // 每次复制，避免 \gdef 污染全局
    fleqn: false,
  };
}

/**
 * 把「正文 + $行内公式$」拆成片段。
 * 用 \$ 表示普通的美元符号。
 * 返回 [{ type: 'text' | 'math', value }]
 */
export function splitInlineMath(input) {
  const parts = [];
  let buf = '';
  let inMath = false;
  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === '\\' && input[i + 1] === '$') {
      buf += inMath ? '\\$' : '$';
      i++;
      continue;
    }
    if (ch === '$') {
      if (buf) parts.push({ type: inMath ? 'math' : 'text', value: buf });
      buf = '';
      inMath = !inMath;
      continue;
    }
    buf += ch;
  }
  if (inMath) {
    // 没有闭合的 $：整段视为错误
    parts.push({ type: 'unclosed', value: buf });
  } else if (buf) {
    parts.push({ type: 'text', value: buf });
  }
  return parts;
}
