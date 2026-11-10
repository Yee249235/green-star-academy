// 過去問演習：逐题阅读（一小题一页，左右翻页）
import { html, raw, mount } from './dom.js';
import { icons } from './icons.js';
import { href, go } from '../router.js';
import { add, dayKey, subscribe } from '../data/store.js';
import { displayMath, rich } from '../math/render.js';
import { fitMath } from '../math/fit.js';
import { attachFlipper } from './components/flipper.js';
import { findCardPage } from '../content/index.js';
import { loadExams, examAttemptId } from '../exams/vault.js';
import { latestResults } from './exams.js';
import { cardAttempts } from '../learning/progress.js';

const RESULT_TEXT = { correct: '独立做对', hinted: '看提示后做对', wrong: '做错' };

/** 字符串 = 段落；{ math } = 独立公式；{ svg } = 示意图 */
function blocks(items, cls = 'sol-text') {
  return html`${(items ?? []).map((b) => {
    if (typeof b === 'string') return html`<p class="${cls}">${rich(b)}</p>`;
    if (b.math) return displayMath(b.math, { boxed: false });
    if (b.svg) return html`<figure class="exam-figure">${raw(b.svg)}</figure>`;
    return '';
  })}`;
}

function list(items) {
  if (!items?.length) return '';
  return html`<ul>${items.map((t) => html`<li>${rich(t)}</li>`)}</ul>`;
}

function section(title, body) {
  return body ? html`<div class="card-sec"><h3>${title}</h3>${body}</div>` : '';
}

function cardLinks(ids) {
  const items = (ids ?? []).map((id) => findCardPage(id)).filter(Boolean);
  if (!items.length) return '';
  return html`<div class="chips">${items.map(
    (loc) => html`<a class="chip link" href="${href('read', loc.subjectId, loc.chapterId, loc.page)}">${loc.card.name.zh}<span lang="ja">${loc.card.name.ja}</span></a>`,
  )}</div>`;
}

function questionPage({ set, q, i, state }) {
  const s = state ?? {};
  const attempts = cardAttempts(examAttemptId(q.id));
  const last = latestResults().get(examAttemptId(q.id));
  return html`<article class="card exercise exam">
    <div class="card-kind">
      <span class="kind">過去問</span>
      <span>${set.title}</span>
      <span class="badge">${q.label}</span>
    </div>
    <div class="card-progress"><span class="muted">练习 ${attempts.length} 次${last ? ` · 最近：${RESULT_TEXT[last.result]}` : ''}</span></div>

    ${q.stem ? html`<div class="exam-stem" lang="ja">${blocks(q.stem, 'question')}</div>` : ''}
    <div class="exam-question" lang="ja">${blocks(q.question, 'question')}</div>

    ${s.hint ? html`<div class="hint-box"><div class="answer-head">提示</div><p>${rich(q.hint)}</p></div>` : ''}
    <div class="ex-actions">
      ${!s.hint && !s.revealed ? html`<button class="btn" type="button" data-action="hint">看提示</button>` : ''}
      <button class="btn${s.revealed ? '' : ' primary'}" type="button" data-action="toggle-answer" aria-expanded="${String(!!s.revealed)}">${s.revealed ? '解答を閉じる' : '解答を見る'}</button>
    </div>

    <div class="answer"${s.revealed ? '' : ' hidden'}>
      <div class="answer-head" lang="ja">解答</div>
      <div class="exam-solution" lang="ja">${blocks(q.solution)}</div>
      <div class="answer-head" lang="ja" style="margin-top:14px">答</div>
      <div class="answer-box" lang="ja">${q.answer ? displayMath(q.answer, { boxed: false }) : html`<p>${rich(q.answerText)}</p>`}</div>
      ${section('解析与相关知识点', html`${list(q.analysis)}${cardLinks(q.cards)}`)}
      ${section('举一反三：这道题还可以怎么出', list(q.variations))}

      <div class="assess">
        <div class="answer-head">这次做得怎么样？</div>
        <div class="assess-buttons">
          <button type="button" class="assess-btn wrong" data-assess="wrong">做错</button>
          <button type="button" class="assess-btn hinted" data-assess="hinted">看提示后做对</button>
          <button type="button" class="assess-btn correct" data-assess="correct"${s.hint ? ' disabled title="用过提示，不能记为独立做对"' : ''}>独立做对</button>
        </div>
        ${s.feedback ? html`<p class="assess-feedback">${s.feedback}</p>` : ''}
        <p class="muted" style="margin-top:8px">过去问只记录做题情况，不给公式卡加星。</p>
      </div>
    </div>
  </article>`;
}

export function renderExamReader(app, route) {
  let cleanup = () => {};
  mount(app, html`<div class="page-head"><p class="muted">正在打开题库…</p></div>`);

  loadExams().then((data) => {
    const set = data?.sets.find((x) => x.id === route.setId);
    if (!set) {
      location.replace('#/exams'); // 未解锁或试卷不存在：回到列表（会显示解锁页）
      return;
    }
    const qs = set.questions;
    let index = Math.min(Math.max(route.page, 1), qs.length) - 1;
    const exState = new Map();

    mount(
      app,
      html`<div class="reader-head">
          <a href="${href('exams')}">${icons.chevronLeft(18)}過去問</a>
          <span class="crumb">${set.title}</span>
        </div>
        <div class="stage"></div>
        <button class="flip-btn prev" type="button" aria-label="前の問題">${icons.chevronLeft(24)}</button>
        <button class="flip-btn next" type="button" aria-label="次の問題">${icons.chevronRight(24)}</button>
        <div class="reader-bar">
          <div class="reader-bar-inner">
            <div class="reader-bar-meta"><span class="title"></span><span class="count"></span></div>
            <div class="segments" role="group" aria-label="问题">
              ${qs.map((q, i) => html`<button type="button" data-page="${i}" aria-label="${q.label}"></button>`)}
            </div>
          </div>
        </div>`,
    );

    const stage = app.querySelector('.stage');
    const prevBtn = app.querySelector('.flip-btn.prev');
    const nextBtn = app.querySelector('.flip-btn.next');
    const titleEl = app.querySelector('.reader-bar-meta .title');
    const countEl = app.querySelector('.reader-bar-meta .count');
    const segButtons = [...app.querySelectorAll('.segments button')];

    function show(i, dir = 0) {
      index = Math.max(0, Math.min(qs.length - 1, i));
      const q = qs[index];
      const scrollY = window.scrollY;
      stage.innerHTML = '';
      const el = document.createElement('div');
      el.className = 'stage-page' + (dir > 0 ? ' anim-next' : dir < 0 ? ' anim-prev' : '');
      mount(el, questionPage({ set, q, i: index, state: exState.get(q.id) }));
      stage.appendChild(el);
      fitMath(el);
      document.fonts?.ready.then(() => el.isConnected && fitMath(el));
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === qs.length - 1;
      titleEl.textContent = `${set.title} ${q.label}`;
      countEl.textContent = `${index + 1} / ${qs.length}`;
      segButtons.forEach((b, j) => {
        b.classList.toggle('done', j < index);
        if (j === index) b.setAttribute('aria-current', 'step');
        else b.removeAttribute('aria-current');
      });
      go(href('exam', set.id, index + 1), { replace: true });
      window.scrollTo({ top: dir !== 0 ? 0 : scrollY });
    }

    const next = () => index < qs.length - 1 && show(index + 1, 1);
    const prev = () => index > 0 && show(index - 1, -1);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    app.querySelector('.segments').addEventListener('click', (e) => {
      const b = e.target.closest('[data-page]');
      if (!b) return;
      const t = Number(b.dataset.page);
      if (t !== index) show(t, t > index ? 1 : -1);
    });

    stage.addEventListener('click', (e) => {
      const q = qs[index];
      const action = e.target.closest('[data-action]')?.dataset.action;
      if (action === 'hint') {
        exState.set(q.id, { ...(exState.get(q.id) ?? {}), hint: true });
        show(index, 0);
      } else if (action === 'toggle-answer') {
        const s = exState.get(q.id) ?? {};
        exState.set(q.id, { ...s, revealed: !s.revealed });
        show(index, 0);
      }
      const btn = e.target.closest('[data-assess]');
      if (btn && !btn.disabled) {
        const result = btn.dataset.assess;
        add('attempts', { cardId: examAttemptId(q.id), exerciseId: q.id, result, day: dayKey() });
        exState.set(q.id, { ...(exState.get(q.id) ?? {}), revealed: true, feedback: `已记录「${RESULT_TEXT[result]}」。` });
        show(index, 0);
      }
    });

    const detachFlipper = attachFlipper(stage, { onPrev: prev, onNext: next });
    const offStore = subscribe((c) => {
      if (c.source && c.source !== 'local') show(index, 0);
    });
    show(index, 0);
    cleanup = () => {
      detachFlipper();
      offStore();
    };
  });

  return () => cleanup();
}
