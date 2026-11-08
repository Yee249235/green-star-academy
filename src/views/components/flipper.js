// 翻页输入：手机左右滑动、电脑两侧按钮、键盘方向键。
// 只负责识别「上一页 / 下一页」，页面渲染由阅读器完成。

const SWIPE_MIN_X = 60; // 至少横向滑动 60px
const SWIPE_RATIO = 1.5; // 横向距离需大于纵向的 1.5 倍，避免和上下滚动冲突
const SWIPE_MAX_MS = 800;

export function attachFlipper(stage, { onPrev, onNext }) {
  let start = null;

  const onTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    // 顶栏、底部进度条、弹窗上不翻页
    if (e.target.closest('#topbar, .reader-bar, .dialog, .toast')) {
      start = null;
      return;
    }
    // 只有真正需要横向滚动的公式框里滑动才不翻页（普通公式上照样可以翻页）
    const box = e.target.closest('.no-swipe');
    if (box && (box.classList.contains('is-scrollable') || box.scrollWidth > box.clientWidth + 1)) {
      start = null;
      return;
    }
    const t = e.touches[0];
    start = { x: t.clientX, y: t.clientY, time: Date.now() };
  };

  const onTouchEnd = (e) => {
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    const dt = Date.now() - start.time;
    start = null;
    if (dt > SWIPE_MAX_MS) return;
    if (Math.abs(dx) < SWIPE_MIN_X || Math.abs(dx) < Math.abs(dy) * SWIPE_RATIO) return;
    if (dx < 0) onNext();
    else onPrev();
  };

  const onKey = (e) => {
    if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    const tag = document.activeElement?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      onNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      onPrev();
    }
  };

  // 监听整个页面：题目页内容短时，卡片下方的空白处也能滑动翻页
  document.addEventListener('touchstart', onTouchStart, { passive: true });
  document.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('keydown', onKey);

  return () => {
    document.removeEventListener('touchstart', onTouchStart);
    document.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('keydown', onKey);
  };
}
