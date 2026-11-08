import { html, mount } from './dom.js';
import { getSubject, getPages, chapterSections } from '../content/index.js';
import { getTab, setTab } from '../data/prefs.js';
import { setSubject } from '../learning/timer.js';
import { href, go } from '../router.js';
import { subjectTabs } from './components/subject-tabs.js';
import { nameInline } from './components/names.js';
import { starRow } from './components/stars.js';
import { subjectStats, chapterStats, cardStats, knowledgeStats, readCount, furthestPosition } from '../learning/progress.js';
import { subjectMs, formatDuration } from '../learning/timer.js';

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
            <span class="name">${f.name.zh}${st.mastered ? ' ✓' : ''}</span>
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
  setSubject(subject.id);
  const ss = subjectStats(subject);
  const far = furthestPosition(subject);

  mount(
    app,
    html`<div class="page-head"><h1>学习进度</h1></div>
      ${subjectTabs(subject.id)}
      <div class="stat-row">
        <div class="stat"><div class="label">综合完成度</div><div class="value">${ss.percent}%</div></div>
        <div class="stat"><div class="label">做题完成度</div><div class="value">${ss.practicePercent}%</div><div class="sub">掌握 ${ss.mastered} / ${ss.total} 张卡</div></div>
        <div class="stat"><div class="label">阅读完成度</div><div class="value">${ss.readPercent}%</div><div class="sub">读过 ${ss.readDone} / ${ss.readables} 张卡</div></div>
      </div>
      <div class="bar" style="margin-top:12px" aria-label="综合完成度 ${ss.percent}%"><span style="width:${ss.percent}%"></span></div>

      <div class="stat-row" style="margin-top:12px">
        <div class="stat"><div class="label">翻阅进度</div><div class="value">${ss.pagesPercent}%</div><div class="sub">${ss.pagesVisited} / ${ss.pagesTotal} 页</div></div>
        <div class="stat"><div class="label">累计学习</div><div class="value">${formatDuration(subjectMs(subject.id))}</div><div class="sub">今日 ${formatDuration(subjectMs(subject.id, { today: true }))}</div></div>
        <div class="stat"><div class="label">星星 · 练习</div><div class="value">${Number(ss.stars.toFixed(2))}</div><div class="sub">练习 ${ss.practice} 次</div></div>
      </div>
      <p class="muted" style="margin-top:10px">${
        far ? `读到：第 ${far.chapter.no} 章 ${far.chapter.name.zh} · 第 ${far.page} 页` : '还没有开始阅读'
      }</p>

      <div class="progress-legend">
        <div><b>做题完成度</b>：每张公式卡按星星算，<b>3 颗星</b>就算这张卡做完（「掌握」，标 ✓）；不到 3 颗按比例，例如 1.5 颗算 50%。</div>
        <div><b>阅读完成度</b>：知识点卡、公式卡双击记过至少 1 次阅读，就算读过。</div>
        <div><b>综合完成度</b> = 做题完成度 × 70% + 阅读完成度 × 30%。</div>
        <div><b>翻阅进度</b>：自动记录翻到过的页，不用双击，表示这本书读到哪里了。</div>
      </div>

      <h2 class="section-title">${subject.name.zh} · 各章</h2>
      <ol class="chapter-list">
        ${subject.chapters.map((c) => {
          const cs = chapterStats(subject, c);
          const has = cs.total > 0;
          return html`<li>
            <details class="chapter-detail">
              <summary class="chapter-row">
                <span class="chapter-no">${c.no}</span>
                <span class="chapter-text">${nameInline(c.name)}</span>
                <span class="right mini-bar">
                  <span class="pct">${has ? `${cs.percent}%` : '待加入'}</span>
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
