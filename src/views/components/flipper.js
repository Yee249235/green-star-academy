// 翻页输入：手机左右滑动、电脑两侧按钮、键盘方向键。
// 只负责识别「上一页 / 下一页」，页面渲染由阅读器完成。

const SWIPE_MIN_X = 60; // 至少横向滑动 60px
const SWIPE_RATIO = 1.5; // 横向距离需大于纵向的 1.5 倍，避免和上下滚动冲突
const SWIPE_MAX_MS = 800;

export function attachFlipper(stage, { onPrev, onNext }) {
  let start = null;

  const onTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    // 公式框等可横向滚动的区域里滑动，不翻页
    if (e.target.closest('.no-swipe')) {
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

  stage.addEventListener('touchstart', onTouchStart, { passive: true });
  stage.addEventListener('touchend', onTouchEnd, { passive: true });
  window.addEventListener('keydown', onKey);

  return () => {
    stage.removeEventListener('touchstart', onTouchStart);
    stage.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('keydown', onKey);
  };
}
