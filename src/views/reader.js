import { html, mount } from './dom.js';
import { icons } from './icons.js';
import { getSubject, getChapter, getPages, hasContent } from '../content/index.js';
import { getLang, onLangChange, setLastPosition } from '../data/prefs.js';
import { href, go } from '../router.js';
import { renderPage } from './components/pages.js';
import { attachFlipper } from './components/flipper.js';

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
          <p>阶段四起按章节陆续加入知识点、公式卡和例题。</p>
        </div>`,
    );
    return null;
  }

  const pages = getPages(subject.id, chapter.id);
  let index = Math.min(route.page, pages.length) - 1;

  mount(
    app,
    html`${head}
      ${
        chapter.sample
          ? html`<div class="sample-banner">示例内容：用于测试翻页和卡片样式，阶段四会替换为正式的数学内容。</div>`
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

  function show(i, dir = 0) {
    index = Math.max(0, Math.min(pages.length - 1, i));
    const page = pages[index];
    stage.innerHTML = '';
    const el = document.createElement('div');
    el.className = 'stage-page' + (dir > 0 ? ' anim-next' : dir < 0 ? ' anim-prev' : '');
    mount(el, renderPage({ subject, chapter, pages, page, lang: getLang() }));
    stage.appendChild(el);

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
    if (dir !== 0) window.scrollTo({ top: 0 });
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

  // 例题：展开 / 收起答案
  stage.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="toggle-answer"]');
    if (!btn) return;
    const box = btn.nextElementSibling;
    const open = box.hidden;
    box.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    btn.textContent = open ? '收起答案' : '查看答案';
  });

  const detachFlipper = attachFlipper(stage, { onPrev: prev, onNext: next });
  const offLang = onLangChange(() => show(index, 0));

  show(index, 0);

  return () => {
    detachFlipper();
    offLang();
  };
}
