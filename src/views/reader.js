import { html, mount } from './dom.js';
import { icons } from './icons.js';
import { getSubject, getChapter, getPages, hasContent, pageKey } from '../content/index.js';
import { getLang, setLang, onLangChange, setLastPosition } from '../data/prefs.js';
import { add, dayKey, subscribe } from '../data/store.js';
import { cardStats, cardAttempts, readCount, isVisited } from '../learning/progress.js';
import { gainPerCorrect, gainPerHinted, countedToday } from '../learning/stars.js';
import { href, go } from '../router.js';
import { renderPage, RESULT_LABEL } from './components/pages.js';
import { attachFlipper } from './components/flipper.js';
import { attachDoubleTap } from './components/double-tap.js';
import { toast } from './components/toast.js';
import { fitMath } from '../math/fit.js';

export function renderReader(app, route) {
  const subject = getSubject(route.subjectId);
  const chapter = getChapter(route.subjectId, route.chapterId);
  if (!subject || !chapter) {
    location.replace('#/toc'); // 触发 hashchange，重新渲染目录
    return null;
  }

  const head = html`<div class="reader-head">
    <a href="${href('toc', subject.id)}">${icons.chevronLeft(18)}目录</a>
    <span class="crumb">${subject.name.zh} · 第 ${chapter.no} 章 ${chapter.name.zh}</span>
  </div>`;

  if (!hasContent(chapter)) {
    mount(
      app,
      html`${head}
        <div class="card empty-chapter">
          <div style="color: var(--mint)">${icons.star(36)}</div>
          <h2 style="margin-top:10px">本章内容正在编写</h2>
          <p>知识点、公式卡和例题会陆续加入。</p>
        </div>`,
    );
    return null;
  }

  const pages = getPages(subject.id, chapter.id);
  let index = Math.min(route.page, pages.length) - 1;
  const exState = new Map(); // 例题 id → { hint, revealed, feedback }

  mount(
    app,
    html`${head}
      ${
        chapter.sample
          ? html`<div class="sample-banner">示例内容：用于测试翻页和卡片样式，正式内容编写后会替换。</div>`
          : ''
      }
      <div class="stage"></div>
      <button class="flip-btn prev" type="button" aria-label="上一页">${icons.chevronLeft(24)}</button>
      <button class="flip-btn next" type="button" aria-label="下一页">${icons.chevronRight(24)}</button>
      <div class="reader-bar">
        <div class="reader-bar-inner">
          <div class="reader-bar-meta"><span class="title"></span><span class="count"></span></div>
          <div class="segments" role="group" aria-label="章节进度">
            ${pages.map((p, i) => html`<button type="button" data-page="${i}" aria-label="第 ${i + 1} 页：${p.title}"></button>`)}
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

  function show(i, dir = 0, { pop = false } = {}) {
    index = Math.max(0, Math.min(pages.length - 1, i));
    const page = { ...pages[index], pop };
    const scrollY = window.scrollY;
    stage.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'stage-page' + (dir > 0 ? ' anim-next' : dir < 0 ? ' anim-prev' : '');
    const state = page.type === 'exercise' ? exState.get(page.item.id) : null;
    mount(el, renderPage({ subject, chapter, pages, page, lang: getLang(), state }));
    stage.appendChild(el);
    fitMath(el);
    document.fonts?.ready.then(() => el.isConnected && fitMath(el));

    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === pages.length - 1;
    titleEl.textContent = page.title;
    countEl.textContent = `${index + 1} / ${pages.length}`;
    segButtons.forEach((b, j) => {
      b.classList.toggle('done', j < index);
      if (j === index) b.setAttribute('aria-current', 'step');
      else b.removeAttribute('aria-current');
    });

    go(href('read', subject.id, chapter.id, index + 1), { replace: true });
    setLastPosition(subject.id, chapter.id, index + 1);
    // 自动记录「翻到过这一页」（每页只记一次，用于翻阅进度）
    const key = pageKey(subject.id, chapter.id, pages[index]);
    if (!isVisited(key)) add('reads', { targetId: `page:${key}`, kind: 'visit', pageKey: key });
    if (dir !== 0) window.scrollTo({ top: 0 });
    else window.scrollTo({ top: scrollY });
  }

  const next = () => index < pages.length - 1 && show(index + 1, 1);
  const prev = () => index > 0 && show(index - 1, -1);

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);
  app.querySelector('.segments').addEventListener('click', (e) => {
    const b = e.target.closest('[data-page]');
    if (!b) return;
    const target = Number(b.dataset.page);
    if (target !== index) show(target, target > index ? 1 : -1);
  });

  function assess(result) {
    const page = pages[index];
    if (page.type !== 'exercise') return;
    const ex = page.item;
    const card = page.formula;
    const today = dayKey();
    const before = cardStats(card.id).stars;
    const already = countedToday(cardAttempts(card.id), ex.id, today);
    add('attempts', { cardId: card.id, exerciseId: ex.id, result, day: today });
    const after = cardStats(card.id).stars;

    let feedback;
    if (already) {
      feedback = `已记录「${RESULT_LABEL[result]}」。今天已经做过这道题，本次只计入练习次数。`;
    } else if (result === 'correct') {
      const unit = gainPerCorrect(card.exercises.length);
      feedback =
        after > before
          ? `已记录「独立做对」，星星 +${after - before}（本题 +${unit}，每张卡每天最多 +1）。`
          : `已记录「独立做对」。本卡今天已经加满 1 颗星，或已满 5 颗。`;
    } else if (result === 'wrong') {
      feedback = after < before ? `已记录「做错」，星星 −${before - after}。多练几次就能补回来。` : '已记录「做错」。';
    } else {
      const unit = gainPerHinted(card.exercises.length);
      feedback =
        after > before
          ? `已记录「看提示后做对」，星星 +${after - before}（本题 +${unit}，是独立做对的一半）。`
          : `已记录「看提示后做对」。本卡今天已经加满 1 颗星，或已满 5 颗。`;
    }
    exState.set(ex.id, { ...(exState.get(ex.id) ?? {}), revealed: true, feedback });
    show(index, 0, { pop: after > before });
  }

  stage.addEventListener('click', (e) => {
    // 概览页：点击条目跳转
    const jump = e.target.closest('[data-goto]');
    if (jump) {
      const target = Number(jump.dataset.goto);
      if (target >= 0) show(target, 1);
      return;
    }
    const langBtn = e.target.closest('[data-lang]');
    if (langBtn) {
      setLang(langBtn.dataset.lang); // onLangChange 会重新渲染本页
      return;
    }
    const page = pages[index];
    const exId = page.type === 'exercise' ? page.item.id : null;
    const action = e.target.closest('[data-action]')?.dataset.action;
    if (action === 'hint' && exId) {
      exState.set(exId, { ...(exState.get(exId) ?? {}), hint: true });
      show(index, 0);
    } else if (action === 'toggle-answer' && exId) {
      const s = exState.get(exId) ?? {};
      exState.set(exId, { ...s, revealed: !s.revealed });
      show(index, 0);
    }
    const assessBtn = e.target.closest('[data-assess]');
    if (assessBtn && !assessBtn.disabled) assess(assessBtn.dataset.assess);
  });

  // 双击（手机双点）知识点卡 / 公式卡：记一次阅读
  const detachDoubleTap = attachDoubleTap(stage, (target) => {
    const card = target.closest('[data-read-target]');
    if (!card) return;
    const id = card.dataset.readTarget;
    add('reads', { targetId: id });
    const n = readCount(id);
    const label = card.querySelector('.read-count');
    if (label) {
      label.textContent = `已读 ${n} 次`;
      label.classList.remove('bump');
      void label.offsetWidth;
      label.classList.add('bump');
    }
    toast(`已记录第 ${n} 次阅读`);
  });

  const detachFlipper = attachFlipper(stage, { onPrev: prev, onNext: next });
  const offLang = onLangChange(() => show(index, 0));
  // 其他设备同步过来新记录时刷新星星
  const offStore = subscribe((change) => {
    if (change.source && change.source !== 'local') show(index, 0);
  });

  show(index, 0);

  return () => {
    detachFlipper();
    detachDoubleTap();
    offLang();
    offStore();
  };
}
