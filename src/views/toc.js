import { html, mount } from './dom.js';
import { getSubject, hasContent } from '../content/index.js';
import { getTab, setTab } from '../data/prefs.js';
import { setSubject } from '../learning/timer.js';
import { href, go } from '../router.js';
import { subjectTabs } from './components/subject-tabs.js';
import { nameInline } from './components/names.js';
import { chapterStats } from '../learning/progress.js';

export function renderToc(app, route) {
  const subject = getSubject(route.subjectId) ?? getSubject(getTab('toc', 'calc'));
  setTab('toc', subject.id);
  setSubject(subject.id);

  mount(
    app,
    html`<div class="page-head"><h1>目录</h1></div>
      ${subjectTabs(subject.id)}
      <p class="textbook">教材路标：${subject.textbook}</p>
      <p class="muted" style="margin-top:4px">「已读」= 本章翻到过的页数占全章页数的比例，翻页时自动记录。</p>
      <ol class="chapter-list">
        ${subject.chapters.map(
          (c) => html`<li>
            <a class="chapter-row" href="${href('read', subject.id, c.id, 1)}">
              <span class="chapter-no">${c.no}</span>
              <span class="chapter-text">${nameInline(c.name)}</span>
              ${
                hasContent(c)
                  ? (() => {
                      // 已读 = 本章翻到过的页数 / 本章总页数（自动记录，与进度页的「翻阅进度」相同）
                      const cs = chapterStats(subject, c);
                      return html`<span class="right mini-bar" title="已读 ${cs.pagesVisited} / ${cs.pagesTotal} 页">
                        <span class="pct">已读 ${cs.pagesPercent}%</span>
                        <div class="bar"><span style="width:${cs.pagesPercent}%"></span></div>
                      </span>`;
                    })()
                  : html`<span class="right"><span class="badge">待加入</span></span>`
              }
            </a>
          </li>`,
        )}
      </ol>`,
  );

  app.querySelector('.segmented').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-subject]');
    if (!btn || btn.dataset.subject === subject.id) return;
    go(href('toc', btn.dataset.subject), { replace: true });
    renderToc(app, { name: 'toc', subjectId: btn.dataset.subject });
  });
}
