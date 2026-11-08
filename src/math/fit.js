// 手机端长公式适配：
// 1. 放不下时先轻度缩小（最小到原字号的 82%，保证可读）；
// 2. 仍放不下，就只在公式框内横向滚动，并显示提示；整页不会横向溢出，滑动也不会翻页。
// 主要手段仍然是写内容时把长公式拆成多行（aligned / gathered），这里只是兜底。
const MIN_SCALE = 0.82;

function fitOne(el) {
  const inner = el.querySelector('.katex-display > .katex');
  if (!inner) return;
  inner.style.fontSize = '';
  el.classList.remove('is-scrollable', 'at-end');
  el.onscroll = null;
  if (el.nextElementSibling?.classList.contains('scroll-hint')) el.nextElementSibling.remove();

  // .katex 是块级元素：内容超出时 scrollWidth 才会大于 clientWidth
  const avail = inner.clientWidth;
  const need = inner.scrollWidth;
  if (need <= avail + 1) return;

  // 以 CSS 设定的字号为基准按比例缩小
  const parentPx = parseFloat(getComputedStyle(inner.parentElement).fontSize);
  const basePx = parseFloat(getComputedStyle(inner).fontSize);
  const scale = Math.max(MIN_SCALE, avail / need);
  inner.style.fontSize = `${((basePx * scale) / parentPx).toFixed(3)}em`;

  if (inner.scrollWidth > inner.clientWidth + 1) {
    el.classList.add('is-scrollable');
    const hint = document.createElement('span');
    hint.className = 'scroll-hint';
    hint.textContent = '← 公式较长，可在框内左右滑动 →';
    el.after(hint);
    el.onscroll = () => el.classList.toggle('at-end', el.scrollLeft + el.clientWidth >= el.scrollWidth - 2);
  }
}

export function fitMath(root = document) {
  root.querySelectorAll('.math-display').forEach(fitOne);
}

let timer = null;
window.addEventListener('resize', () => {
  clearTimeout(timer);
  timer = setTimeout(() => fitMath(document), 150);
});
