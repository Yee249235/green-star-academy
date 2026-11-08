import { html, mount } from '../dom.js';
import { icons } from '../icons.js';
import { getLang, setLang, onLangChange } from '../../data/prefs.js';
import * as timer from '../../learning/timer.js';
import { getSyncStatus, onSyncStatus } from '../../data/sync.js';
import { dialog } from './toast.js';

const NAV = [
  { name: 'home', label: '首页', hash: '#/', icon: icons.home },
  { name: 'toc', label: '目录', hash: '#/toc', icon: icons.book },
  { name: 'progress', label: '进度', hash: '#/progress', icon: icons.chart },
  { name: 'settings', label: '设置', hash: '#/settings', icon: icons.gear },
];

const PAUSE_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
const PLAY_ICON = '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10-6.5z" fill="currentColor"/></svg>';

const LANG_LABELS = [
  { id: 'zh', label: '中', title: '题干：中文' },
  { id: 'ja', label: '日', title: '題文：日本語' },
  { id: 'en', label: '英', title: 'Problem: English' },
];

function langSwitch() {
  const current = getLang();
  return html`<div class="lang-switch" role="group" aria-label="题干语言">
    ${LANG_LABELS.map(
      (l) =>
        html`<button type="button" data-lang="${l.id}" title="${l.title}" aria-pressed="${String(l.id === current)}">${l.label}</button>`,
    )}
  </div>`;
}

export function renderTopbar() {
  const topbar = document.getElementById('topbar');
  mount(
    topbar,
    html`<a class="brand" href="#/" aria-label="Green Star Academy 首页">
        <span style="color: var(--mint)">${icons.star(24)}</span>
        <span class="brand-full">Green Star Academy</span>
        <span class="brand-short">Green Star</span>
      </a>
      <nav class="topnav" aria-label="主导航">
        ${NAV.map((n) => html`<a href="${n.hash}" data-nav="${n.name}">${n.label}</a>`)}
      </nav>
      <div class="topbar-tools">
        <span class="lang-slot">${langSwitch()}</span>
        <span class="timer-slot"></span>
        <a class="sync-dot" href="#/settings"></a>
      </div>`,
  );

  topbar.addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-lang]');
    if (btn) setLang(btn.dataset.lang);
    const t = e.target.closest('[data-timer]')?.dataset.timer;
    if (t === 'start') timer.start();
    if (t === 'pause') timer.pause();
    if (t === 'resume') timer.resume();
    if (t === 'stop') {
      const ms = timer.stop();
      const body = document.createElement('div');
      body.innerHTML = `<p>本次学习</p><p class="big">${timer.formatDuration(ms)}</p><p>今天累计 ${timer.formatDuration(timer.todayMs())} · 总计 ${timer.formatDuration(timer.totalMs())}</p>`;
      await dialog({ title: '恭喜完成本次学习！', body });
    }
  });

  const timerSlot = topbar.querySelector('.timer-slot');
  let tick = null;
  const renderTimer = () => {
    const st = timer.getState();
    const clock = timer.formatClock(st.elapsedMs);
    if (st.status === 'idle') {
      timerSlot.innerHTML = `<button class="timer-pill" type="button" data-timer="start" title="开始计时">${icons.clock().value}<span class="timer-label">开始学习</span></button>`;
    } else {
      const running = st.status === 'running';
      timerSlot.innerHTML = `<span class="timer-group${running ? ' running' : ''}">
        <button class="timer-pill" type="button" data-timer="${running ? 'pause' : 'resume'}" title="${running ? '暂停' : '继续'}">
          ${running ? PAUSE_ICON : PLAY_ICON}<span class="timer-clock">${clock}</span>
        </button>
        <button class="timer-stop" type="button" data-timer="stop" title="结束学习">结束</button>
      </span>`;
    }
    clearInterval(tick);
    if (st.status === 'running') {
      tick = setInterval(() => {
        const c = timerSlot.querySelector('.timer-clock');
        if (c) c.textContent = timer.formatClock(timer.getState().elapsedMs);
      }, 1000);
    }
  };
  timer.subscribe(renderTimer);
  renderTimer();

  const dot = topbar.querySelector('.sync-dot');
  const renderSync = (st) => {
    dot.className = 'sync-dot ' + st.state;
    dot.title = st.label;
    dot.setAttribute('aria-label', st.label);
  };
  onSyncStatus(renderSync);
  renderSync(getSyncStatus());
  onLangChange(() => {
    mount(topbar.querySelector('.lang-slot'), langSwitch());
  });

  const tabbar = document.getElementById('tabbar');
  mount(
    tabbar,
    html`${NAV.map((n) => html`<a href="${n.hash}" data-nav="${n.name}">${n.icon(22)}<span>${n.label}</span></a>`)}`,
  );
}

export function setActiveNav(routeName) {
  const active = routeName === 'read' ? 'toc' : routeName === 'math-test' ? 'settings' : routeName;
  document.querySelectorAll('[data-nav]').forEach((a) => {
    if (a.dataset.nav === active) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}
