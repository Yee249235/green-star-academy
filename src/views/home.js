import { html, mount } from './dom.js';
import { subjects, getChapter } from '../content/index.js';
import { getLastPosition } from '../data/prefs.js';
import { href } from '../router.js';
import { subjectStats, furthestPosition } from '../learning/progress.js';
import { todayMs, totalMs, subjectMs, formatDuration, subscribe as onTimer } from '../learning/timer.js';

// 「石原繁・浅野重初《理工系の基礎 微分積分 増補版》」→ 书名 + 作者
function splitTextbook(text) {
  const m = /^(.*?)《(.*)》$/.exec(text ?? '');
  return m ? { author: m[1], title: m[2] } : { author: '', title: text ?? '' };
}

function bookCard(s) {
  const st = subjectStats(s);
  const far = furthestPosition(s);
  const book = splitTextbook(s.textbook);
  return html`<a class="subject-card book-card" href="${href('toc', s.id)}">
    <div class="book-title" lang="ja">${book.title}</div>
    <div class="book-sub"><span>${s.name.zh}</span><span lang="ja">${book.author}</span></div>

    <div class="book-time">
      <div><span class="label">累计学习</span><span class="value" data-time="${s.id}-total">${formatDuration(subjectMs(s.id))}</span></div>
      <div><span class="label">今日</span><span class="value" data-time="${s.id}-today">${formatDuration(subjectMs(s.id, { today: true }))}</span></div>
    </div>

    <div class="book-progress">
      <div class="row"><span>综合完成度</span><strong>${st.percent}%</strong></div>
      <div class="bar" aria-label="综合完成度 ${st.percent}%"><span style="width:${st.percent}%"></span></div>
      <div class="row small"><span>做题 ${st.practicePercent}%</span><span>阅读 ${st.readPercent}%</span><span>翻阅 ${st.pagesPercent}%</span></div>
    </div>
    <div class="book-where">${
      far ? `读到：第 ${far.chapter.no} 章 ${far.chapter.name.zh} · 第 ${far.page} 页` : '还没有开始阅读'
    }</div>
  </a>`;
}

export function renderHome(app) {
  const last = getLastPosition();
  const lastChapter = last ? getChapter(last.subjectId, last.chapterId) : null;

  mount(
    app,
    html`<div class="page-head">
        <h1>欢迎回来</h1>
        <p>看到题目 → 认出考点 → 选对公式 → 算对答案。</p>
      </div>

      <div class="stat-row two">
        <div class="stat"><div class="label">今日学习</div><div class="value" data-stat="today">${formatDuration(todayMs())}</div></div>
        <div class="stat"><div class="label">累计学习</div><div class="value" data-stat="total">${formatDuration(totalMs())}</div></div>
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

      <div class="subject-grid" style="margin-top:24px">${subjects.map(bookCard)}</div>`,
  );

  // 计时中，首页时长每 30 秒刷新
  const refresh = () => {
    const set = (sel, v) => {
      const el = app.querySelector(sel);
      if (el) el.textContent = v;
    };
    set('[data-stat="today"]', formatDuration(todayMs()));
    set('[data-stat="total"]', formatDuration(totalMs()));
    for (const s of subjects) {
      set(`[data-time="${s.id}-total"]`, formatDuration(subjectMs(s.id)));
      set(`[data-time="${s.id}-today"]`, formatDuration(subjectMs(s.id, { today: true })));
    }
  };
  const id = setInterval(refresh, 30_000);
  const off = onTimer(refresh);
  return () => {
    clearInterval(id);
    off();
  };
}
