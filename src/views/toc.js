import { html, mount } from './dom.js';
import { getSubject, hasContent } from '../content/index.js';
import { getTab, setTab } from '../data/prefs.js';
import { setSubject } from '../learning/timer.js';
import { href, go } from '../router.js';
import { subjectTabs } from './components/subject-tabs.js';
import { nameInline } from './components/names.js';

export function renderToc(app, route) {
  const subject = getSubject(route.subjectId) ?? getSubject(getTab('toc', 'calc'));
  setTab('toc', subject.id);
  setSubject(subject.id);

  mount(
    app,
    html`<div class="page-head"><h1>目录</h1></div>
      ${subjectTabs(subject.id)}
      <p class="textbook">教材路标：${subject.textbook}</p>
      <ol class="chapter-list">
        ${subject.chapters.map(
          (c) => html`<li>
            <a class="chapter-row" href="${href('read', subject.id, c.id, 1)}">
              <span class="chapter-no">${c.no}</span>
              <span class="chapter-text">${nameInline(c.name)}</span>
              <span class="right">${
                c.sample
                  ? html`<span class="badge warn">示例</span>`
                  : hasContent(c)
                    ? html`<span class="badge mint">可学习</span>`
                    : html`<span class="badge">待加入</span>`
              }</span>
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
