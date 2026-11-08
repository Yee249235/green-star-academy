// 轻提示（屏幕下方，几秒后自动消失）
let el = null;
let timer = null;

export function toast(message, { duration = 2600 } = {}) {
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add('show');
  clearTimeout(timer);
  timer = setTimeout(() => el.classList.remove('show'), duration);
}

/** 模态对话框（学习结束总结、导入确认等） */
export function dialog({ title, body, actions }) {
  return new Promise((resolve) => {
    const wrap = document.createElement('div');
    wrap.className = 'dialog-backdrop';
    wrap.innerHTML = `<div class="dialog" role="dialog" aria-modal="true">
      <h2 class="dialog-title"></h2><div class="dialog-body"></div><div class="dialog-actions"></div></div>`;
    wrap.querySelector('.dialog-title').textContent = title;
    const bodyEl = wrap.querySelector('.dialog-body');
    if (typeof body === 'string') bodyEl.textContent = body;
    else if (body) bodyEl.appendChild(body);
    const acts = wrap.querySelector('.dialog-actions');
    for (const a of actions ?? [{ label: '好的', value: true, primary: true }]) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'btn' + (a.primary ? ' primary' : '');
      b.textContent = a.label;
      b.addEventListener('click', () => close(a.value));
      acts.appendChild(b);
    }
    function close(v) {
      wrap.remove();
      document.removeEventListener('keydown', onKey);
      resolve(v);
    }
    function onKey(e) {
      if (e.key === 'Escape') close(null);
    }
    wrap.addEventListener('click', (e) => e.target === wrap && close(null));
    document.addEventListener('keydown', onKey);
    document.body.appendChild(wrap);
    acts.querySelector('.primary, button')?.focus();
  });
}
