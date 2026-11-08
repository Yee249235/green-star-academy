// 阅读器里每种页面的渲染：概览 / 知识点 / 公式卡 / 例题 / 章末
import { html } from '../dom.js';
import { icons } from '../icons.js';
import { nameBlock } from './names.js';
import { href } from '../../router.js';
import { nextChapter } from '../../content/index.js';

const LANG_ATTR = { zh: 'zh-CN', ja: 'ja', en: 'en' };

function list(items, ordered = false) {
  if (!items?.length) return '';
  const lis = items.map((t) => html`<li>${t}</li>`);
  return ordered ? html`<ol>${lis}</ol>` : html`<ul>${lis}</ul>`;
}

function section(title, body) {
  return body ? html`<div class="card-sec"><h3>${title}</h3>${body}</div>` : '';
}

// 阶段三起由统一的 KaTeX 组件渲染真正的公式
function formulaBox(note) {
  return html`<div class="formula-box placeholder no-swipe">${note ?? '公式区'}</div>`;
}

function overviewPage(ctx) {
  const { subject, chapter, pages } = ctx;
  const formulas = chapter.formulas ?? [];
  return html`<article class="card">
    <div class="card-kind"><span class="kind">本章概览</span><span>${subject.name.zh} · 第 ${chapter.no} 章</span></div>
    ${nameBlock(chapter.name, { tag: 'h1' })}
    ${chapter.overview ? html`<div class="card-sec"><p>${chapter.overview}</p></div>` : ''}
    ${section('本章公式卡', list(formulas.map((f) => `${f.name.zh}（例题 ${f.exercises?.length ?? 0} 道）`)))}
    <p class="muted" style="margin-top:20px">共 ${pages.length} 页。</p>
    <p class="swipe-hint">左右滑动翻页</p>
  </article>`;
}

function knowledgePage({ page }) {
  const k = page.item;
  return html`<article class="card knowledge">
    <div class="card-kind"><span class="kind">知识点</span></div>
    ${nameBlock(k.name)}
    ${section('概念解释', k.paragraphs?.length ? html`${k.paragraphs.map((p) => html`<p>${p}</p>`)}` : '')}
    ${section('与其他知识点的联系', list(k.related))}
  </article>`;
}

function formulaPage({ page }) {
  const f = page.item;
  const partLabel = page.parts > 1 ? `第 ${page.part} / ${page.parts} 页` : '';
  const first = page.part <= 1;
  const second = page.part === 0 || page.part === 2;
  return html`<article class="card formula">
    <div class="card-kind"><span class="kind">公式卡</span>${partLabel ? html`<span>${partLabel}</span>` : ''}<span>例题 ${f.exercises?.length ?? 0} 道</span></div>
    ${nameBlock(f.name)}
    ${first ? html`${formulaBox(f.formulaNote)}${section('适用条件', list(f.conditions))}${section('使用场景', list(f.scenarios))}` : ''}
    ${second ? html`${section('计算步骤', list(f.steps, true))}${section('易错点', list(f.pitfalls))}` : ''}
  </article>`;
}

function exercisePage({ page, lang }) {
  const ex = page.item;
  const q = ex.question?.[lang] ?? ex.question?.zh ?? '';
  return html`<article class="card exercise">
    <div class="card-kind">
      <span class="kind">例题 ${page.index + 1} / ${page.total}</span>
      <span>${page.formula.name.zh}</span>
      <span class="badge">难度：${ex.difficulty}</span>
    </div>
    <p class="question" lang="${LANG_ATTR[lang]}">${q}</p>
    <div class="answer-toggle">
      <button class="btn" type="button" data-action="toggle-answer" aria-expanded="false">查看答案</button>
      <div class="answer" hidden>标准答案、详细计算过程、解题思路和易错点将在阶段五显示（全部中文）。</div>
    </div>
  </article>`;
}

function endPage({ subject, chapter }) {
  const next = nextChapter(subject.id, chapter.id);
  return html`<article class="card end-card">
    <div class="big-star" style="color: var(--mint)">${icons.star(44)}</div>
    <h2>第 ${chapter.no} 章 结束</h2>
    <p class="muted" style="margin-top:6px">${chapter.name.zh}</p>
    <div class="end-actions">
      <a class="btn" href="${href('toc', subject.id)}">回到目录</a>
      ${next ? html`<a class="btn primary" href="${href('read', subject.id, next.id, 1)}">下一章：${next.name.zh}</a>` : ''}
    </div>
  </article>`;
}

const RENDERERS = {
  overview: overviewPage,
  knowledge: knowledgePage,
  formula: formulaPage,
  exercise: exercisePage,
  end: endPage,
};

export function renderPage(ctx) {
  return RENDERERS[ctx.page.type](ctx);
}
