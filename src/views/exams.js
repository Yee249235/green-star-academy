// 過去問演習：解锁页 + 试卷列表
import { html, mount } from './dom.js';
import { icons } from './icons.js';
import { href } from '../router.js';
import { all, subscribe } from '../data/store.js';
import { loadExams, unlock, examAttemptId } from '../exams/vault.js';
import { subjectMs, formatDuration } from '../learning/timer.js';

const RESULT_TEXT = { correct: '独立做对', hinted: '看提示后做对', wrong: '做错' };

/** 每道题最近一次自评结果 */
export function latestResults() {
  const latest = new Map();
  for (const a of all('attempts')) {
    if (!a.cardId?.startsWith('exam:')) continue;
    const prev = latest.get(a.cardId);
    if (!prev || (a.at ?? 0) >= (prev.at ?? 0)) latest.set(a.cardId, a);
  }
  return latest;
}

function lockedView() {
  return html`<div class="page-head"><h1>過去問演習</h1></div>
    <form class="card unlock-card" autocomplete="off">
      <div style="color: var(--mint)">${icons.star(32)}</div>
      <h2>输入口令解锁</h2>
      <p class="muted">题库是加密保存的。每台设备只需输入一次，之后会自动解锁。</p>
      <input class="unlock-input" type="password" name="pass" placeholder="口令" autocomplete="current-password" required />
      <button class="btn primary" type="submit">解锁</button>
      <p class="unlock-error" hidden>口令不正确，请再试一次。</p>
    </form>`;
}

function listView(data) {
  const latest = latestResults();
  return html`<div class="page-head">
      <h1>過去問演習</h1>
      <p>题目、解答为日语；提示、解析、举一反三为中文。</p>
    </div>
    <div class="stat-row two">
      <div class="stat"><div class="label">累计学习</div><div class="value">${formatDuration(subjectMs('exam'))}</div></div>
      <div class="stat"><div class="label">今日</div><div class="value">${formatDuration(subjectMs('exam', { today: true }))}</div></div>
    </div>
    <div class="exam-sets">
      ${data.sets.map((set) => {
        const qs = set.questions;
        const done = qs.filter((q) => latest.has(examAttemptId(q.id))).length;
        const ok = qs.filter((q) => latest.get(examAttemptId(q.id))?.result === 'correct').length;
        const pct = qs.length ? Math.round((done / qs.length) * 100) : 0;
        return html`<section class="card exam-set">
          <a class="exam-set-head" href="${href('exam', set.id, 1)}">
            <div>
              <div class="exam-set-title">${set.title}</div>
              ${set.note ? html`<div class="exam-set-note">${set.note}</div>` : ''}
            </div>
            <span class="exam-set-go">${icons.chevronRight(20)}</span>
          </a>
          <div class="book-progress">
            <div class="row small"><span>已做 ${done} / ${qs.length} 题</span><span>独立做对 ${ok} 题</span></div>
            <div class="bar"><span style="width:${pct}%"></span></div>
          </div>
          <div class="exam-q-chips">
            ${qs.map((q, i) => {
              const r = latest.get(examAttemptId(q.id))?.result;
              return html`<a class="exam-chip${r ? ` ${r}` : ''}" href="${href('exam', set.id, i + 1)}" title="${r ? RESULT_TEXT[r] : '未做'}">${q.label}</a>`;
            })}
          </div>
        </section>`;
      })}
    </div>
    <p class="muted" style="margin-top:16px">小方块的颜色是最近一次自评：薄荷绿 = 独立做对，黄色 = 看提示后做对，红色 = 做错。</p>`;
}

export function renderExams(app) {
  let off = null;
  const showList = (data) => {
    mount(app, listView(data));
    off?.();
    off = subscribe(() => mount(app, listView(data)));
  };

  mount(app, html`<div class="page-head"><h1>過去問演習</h1><p class="muted">正在打开题库…</p></div>`);
  loadExams().then((data) => {
    if (data) return showList(data);
    mount(app, lockedView());
    const form = app.querySelector('form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button');
      const err = form.querySelector('.unlock-error');
      btn.disabled = true;
      btn.textContent = '解锁中…';
      try {
        showList(await unlock(form.pass.value));
      } catch {
        err.hidden = false;
        btn.disabled = false;
        btn.textContent = '解锁';
        form.pass.select();
      }
    });
  });
  return () => off?.();
}
