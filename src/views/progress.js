import { html, mount } from './dom.js';
import { getSubject, getPages, chapterSections } from '../content/index.js';
import { getTab, setTab } from '../data/prefs.js';
import { href, go } from '../router.js';
import { subjectTabs } from './components/subject-tabs.js';
import { nameInline } from './components/names.js';
import { starRow } from './components/stars.js';
import { subjectStats, chapterStats, cardStats, knowledgeStats, readCount } from '../learning/progress.js';

const half = (v) => Math.round(v * 2) / 2;

function chapterDetail(subject, chapter) {
  const pages = getPages(subject.id, chapter.id);
  const pageOf = (item) => pages.findIndex((p) => p.item === item) + 1;
  return html`<div class="detail-body">
    ${chapterSections(chapter).map(
      (sec) => html`
        ${sec.title ? html`<h4>${sec.title}</h4>` : ''}
        ${(sec.knowledge ?? []).map((k) => {
          const ks = knowledgeStats(k.id);
          return html`<a class="detail-row" href="${href('read', subject.id, chapter.id, pageOf(k))}">
            <span class="name">知识点 · ${k.name.zh}</span>
            ${starRow(half(ks.avgStars), { size: 13 })}
            <span class="meta">已读 ${readCount(k.id)} 次</span>
          </a>`;
        })}
        ${(sec.formulas ?? []).map((f) => {
          const st = cardStats(f.id);
          return html`<a class="detail-row" href="${href('read', subject.id, chapter.id, pageOf(f))}">
            <span class="name">${f.name.zh}</span>
            ${starRow(st.stars, { size: 13 })}
            <span class="meta">练习 ${st.practiceCount} · 已读 ${readCount(f.id)}</span>
          </a>`;
        })}`,
    )}
  </div>`;
}

export function renderProgress(app, route) {
  const subject = getSubject(route.subjectId) ?? getSubject(getTab('progress', 'calc'));
  setTab('progress', subject.id);
  const ss = subjectStats(subject);

  mount(
    app,
    html`<div class="page-head"><h1>学习进度</h1></div>
      ${subjectTabs(subject.id)}
      <div class="stat-row">
        <div class="stat"><div class="label">基本完成</div><div class="value">${ss.mastered} / ${ss.total}</div></div>
        <div class="stat"><div class="label">已获星星</div><div class="value">${ss.stars}</div></div>
        <div class="stat"><div class="label">练习次数</div><div class="value">${ss.practice}</div></div>
      </div>
      <div class="bar" style="margin-top:12px" aria-label="基本完成 ${ss.percent}%"><span style="width:${ss.percent}%"></span></div>
      <p class="muted" style="margin-top:8px">基本完成 = 公式卡达到 3 颗星。点开章节可查看每个知识点和公式卡。</p>

      <h2 class="section-title">${subject.name.zh} · 各章</h2>
      <ol class="chapter-list">
        ${subject.chapters.map((c) => {
          const cs = chapterStats(c);
          const has = cs.total > 0;
          return html`<li>
            <details class="chapter-detail">
              <summary class="chapter-row">
                <span class="chapter-no">${c.no}</span>
                <span class="chapter-text">${nameInline(c.name)}</span>
                <span class="right mini-bar">
                  <span class="pct">${has ? `${cs.mastered}/${cs.total}` : '待加入'}</span>
                  <div class="bar"><span style="width:${cs.percent}%"></span></div>
                </span>
              </summary>
              ${has ? chapterDetail(subject, c) : html`<div class="detail-body"><p class="muted">本章内容正在编写。</p></div>`}
            </details>
          </li>`;
        })}
      </ol>`,
  );

  app.querySelector('.segmented').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-subject]');
    if (!btn || btn.dataset.subject === subject.id) return;
    go(href('progress', btn.dataset.subject), { replace: true });
    renderProgress(app, { name: 'progress', subjectId: btn.dataset.subject });
  });
}
