import { html, mount } from './dom.js';
import { getSubject, chapterFormulas } from '../content/index.js';
import { getTab, setTab } from '../data/prefs.js';
import { href, go } from '../router.js';
import { subjectTabs } from './components/subject-tabs.js';
import { nameInline } from './components/names.js';

export function renderProgress(app, route) {
  const subject = getSubject(route.subjectId) ?? getSubject(getTab('progress', 'calc'));
  setTab('progress', subject.id);
  const cardCount = subject.chapters.reduce((n, c) => n + (c.sample ? 0 : chapterFormulas(c).length), 0);

  mount(
    app,
    html`<div class="page-head"><h1>学习进度</h1></div>
      ${subjectTabs(subject.id)}
      <div class="stat-row">
        <div class="stat"><div class="label">公式卡</div><div class="value">${cardCount} 张</div></div>
        <div class="stat"><div class="label">基本完成</div><div class="value">0 张</div></div>
        <div class="stat"><div class="label">已获星星</div><div class="value">0</div></div>
      </div>
      <p class="muted" style="margin-top:8px">星星和完成率在阶段六启用。点开章节可查看每个知识点和公式卡。</p>

      <h2 class="section-title">${subject.name.zh} · 各章</h2>
      <ol class="chapter-list">
        ${subject.chapters.map(
          (c) => html`<li>
            <a class="chapter-row" href="${href('read', subject.id, c.id, 1)}">
              <span class="chapter-no">${c.no}</span>
              <span class="chapter-text">${nameInline(c.name)}</span>
              <span class="right mini-bar">
                <span class="pct">0%</span>
                <div class="bar"><span style="width:0%"></span></div>
              </span>
            </a>
          </li>`,
        )}
      </ol>`,
  );

  app.querySelector('.segmented').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-subject]');
    if (!btn || btn.dataset.subject === subject.id) return;
    go(href('progress', btn.dataset.subject), { replace: true });
    renderProgress(app, { name: 'progress', subjectId: btn.dataset.subject });
  });
}
