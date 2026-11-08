import { html, mount } from './dom.js';
import { subjects, getChapter, hasContent } from '../content/index.js';
import { getLastPosition } from '../data/prefs.js';
import { href } from '../router.js';

export function renderHome(app) {
  const last = getLastPosition();
  const lastChapter = last ? getChapter(last.subjectId, last.chapterId) : null;

  mount(
    app,
    html`<div class="page-head">
        <h1>欢迎回来</h1>
        <p>看到题目 → 认出考点 → 选对公式 → 算对答案。</p>
      </div>

      <div class="stat-row">
        <div class="stat"><div class="label">今日学习</div><div class="value">0 分</div></div>
        <div class="stat"><div class="label">累计学习</div><div class="value">0 分</div></div>
        <div class="stat"><div class="label">基本掌握</div><div class="value">0 张</div></div>
      </div>
      <p class="muted" style="margin-top:8px">学习时长在阶段七启用，掌握情况在阶段六启用。</p>

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
          const ready = s.chapters.filter(hasContent).length;
          return html`<a class="subject-card" href="${href('toc', s.id)}">
            <div class="ja" lang="ja">${s.name.ja}</div>
            <div class="name">${s.name.zh}</div>
            <div class="meta"><span>${s.chapters.length} 章</span><span>已有内容 ${ready} 章</span></div>
            <div class="bar" aria-label="完成度 0%"><span style="width:0%"></span></div>
          </a>`;
        })}
      </div>`,
  );
}
