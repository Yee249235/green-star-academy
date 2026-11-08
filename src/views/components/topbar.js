import { html, mount } from '../dom.js';
import { icons } from '../icons.js';
import { getLang, setLang, onLangChange } from '../../data/prefs.js';

const NAV = [
  { name: 'home', label: '首页', hash: '#/', icon: icons.home },
  { name: 'toc', label: '目录', hash: '#/toc', icon: icons.book },
  { name: 'progress', label: '进度', hash: '#/progress', icon: icons.chart },
  { name: 'settings', label: '设置', hash: '#/settings', icon: icons.gear },
];

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
        <button class="timer-pill" type="button" disabled title="学习计时器将在阶段七启用">
          ${icons.clock()}<span class="timer-label">开始学习</span>
        </button>
        <span class="sync-dot" title="云同步将在阶段七启用（当前未登录）"></span>
      </div>`,
  );

  topbar.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-lang]');
    if (btn) setLang(btn.dataset.lang);
  });
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
