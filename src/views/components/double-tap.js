// 双击识别：电脑用 dblclick；手机自己识别两次轻点（300ms 内、位置相近），
// 并避免同一次操作被重复计数。按钮、链接、公式滚动区域上的双击不计。
const TAP_MS = 320;
const TAP_DIST = 30;

function ignorable(target) {
  return Boolean(target.closest('button, a, input, textarea, select, .assess, .math-display.is-scrollable'));
}

export function attachDoubleTap(root, onDouble) {
  let last = null;
  let lastFiredAt = 0;

  const fire = (target) => {
    lastFiredAt = Date.now();
    window.getSelection()?.removeAllRanges();
    onDouble(target);
  };

  const onPointerUp = (e) => {
    if (e.pointerType !== 'touch' || ignorable(e.target)) return;
    const now = Date.now();
    if (last && now - last.time < TAP_MS && Math.hypot(e.clientX - last.x, e.clientY - last.y) < TAP_DIST) {
      last = null;
      fire(e.target);
    } else {
      last = { time: now, x: e.clientX, y: e.clientY };
    }
  };

  const onDblClick = (e) => {
    if (ignorable(e.target)) return;
    if (Date.now() - lastFiredAt < 600) return; // 触屏双点后浏览器补发的 dblclick
    fire(e.target);
  };

  root.addEventListener('pointerup', onPointerUp);
  root.addEventListener('dblclick', onDblClick);
  return () => {
    root.removeEventListener('pointerup', onPointerUp);
    root.removeEventListener('dblclick', onDblClick);
  };
}
