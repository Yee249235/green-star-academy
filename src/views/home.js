import { html, mount } from './dom.js';
import { subjects, getChapter, hasContent } from '../content/index.js';
import { getLastPosition } from '../data/prefs.js';
import { href } from '../router.js';
import { overallStats, subjectStats } from '../learning/progress.js';
import { todayMs, totalMs, formatDuration, subscribe as onTimer } from '../learning/timer.js';

export function renderHome(app) {
  const last = getLastPosition();
  const lastChapter = last ? getChapter(last.subjectId, last.chapterId) : null;
  const all = overallStats();

  mount(
    app,
    html`<div class="page-head">
        <h1>欢迎回来</h1>
        <p>看到题目 → 认出考点 → 选对公式 → 算对答案。</p>
      </div>

      <div class="stat-row">
        <div class="stat"><div class="label">今日学习</div><div class="value" data-stat="today">${formatDuration(todayMs())}</div></div>
        <div class="stat"><div class="label">累计学习</div><div class="value" data-stat="total">${formatDuration(totalMs())}</div></div>
        <div class="stat"><div class="label">基本完成</div><div class="value">${all.mastered} / ${all.total}</div></div>
      </div>

      ${
        lastChapter
          ? html`<div style="margin-top:20px">
              <a class="btn primary" href="${href('read', last.subjectId, last.chapterId, last.page)}">
                继续上次：第 ${lastChapter.no} 章 ${lastChapter.name.zh}（第 ${last.page} 页）
              </a>
            </div>`
          : ''
      }

      <h2 class="section-title">两本书</h2>
      <div class="subject-grid">
        ${subjects.map((s) => {
          const ready = s.chapters.filter((c) => hasContent(c) && !c.sample).length;
          const st = subjectStats(s);
          return html`<a class="subject-card" href="${href('toc', s.id)}">
            <div class="ja" lang="ja">${s.name.ja}</div>
            <div class="name">${s.name.zh}</div>
            <div class="meta"><span>${s.chapters.length} 章 · 已有内容 ${ready} 章</span><span>基本完成 ${st.mastered}/${st.total}</span></div>
            <div class="bar" aria-label="完成度 ${st.percent}%"><span style="width:${st.percent}%"></span></div>
          </a>`;
        })}
      </div>`,
  );

  // 计时中，首页时长每 30 秒刷新
  const refresh = () => {
    const t = app.querySelector('[data-stat="today"]');
    const a = app.querySelector('[data-stat="total"]');
    if (t) t.textContent = formatDuration(todayMs());
    if (a) a.textContent = formatDuration(totalMs());
  };
  const id = setInterval(refresh, 30_000);
  const off = onTimer(refresh);
  return () => {
    clearInterval(id);
    off();
  };
}
