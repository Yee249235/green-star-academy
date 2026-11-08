// 阅读器里每种页面的渲染：概览 / 知识点 / 公式卡 / 例题 / 章末
import { html } from '../dom.js';
import { icons } from '../icons.js';
import { nameBlock } from './names.js';
import { href } from '../../router.js';
import { nextChapter, knowledgeIndex, chapterSections } from '../../content/index.js';
import { displayMath, rich } from '../../math/render.js';

const LANG_ATTR = { zh: 'zh-CN', ja: 'ja', en: 'en' };

function list(items, ordered = false) {
  if (!items?.length) return '';
  const lis = items.map((t) => html`<li>${rich(t)}</li>`);
  return ordered ? html`<ol>${lis}</ol>` : html`<ul>${lis}</ul>`;
}

function section(title, body) {
  return body ? html`<div class="card-sec"><h3>${title}</h3>${body}</div>` : '';
}

function relatedKnowledge(ids) {
  const names = (ids ?? []).map((id) => knowledgeIndex.get(id)).filter(Boolean);
  if (!names.length) return '';
  return html`<div class="chips">${names.map((k) => html`<span class="chip">${k.name.zh}<span lang="ja">${k.name.ja}</span></span>`)}</div>`;
}

/** 解析步骤：字符串 = 文字段落；{ math } = 独立公式 */
function solutionSteps(steps) {
  return html`${(steps ?? []).map((s) =>
    typeof s === 'string' ? html`<p class="sol-text">${rich(s)}</p>` : displayMath(s.math, { boxed: false }),
  )}`;
}

function sectionTag(page) {
  return page.section ? html`<span>${page.section}</span>` : '';
}

function overviewPage({ subject, chapter, pages }) {
  const sections = chapterSections(chapter);
  const firstPageOf = (item) => pages.findIndex((p) => p.item === item);
  return html`<article class="card">
    <div class="card-kind"><span class="kind">本章概览</span><span>${subject.name.zh} · 第 ${chapter.no} 章</span></div>
    ${nameBlock(chapter.name, { tag: 'h1' })}
    ${chapter.overview ? html`<div class="card-sec"><p>${rich(chapter.overview)}</p></div>` : ''}
    ${sections.map(
      (s) => html`<div class="card-sec toc-sec">
        ${s.title ? html`<h3>${s.title}</h3>` : html`<h3>内容</h3>`}
        <ul class="jump-list">
          ${(s.knowledge ?? []).map(
            (k) => html`<li><button type="button" data-goto="${firstPageOf(k)}"><span class="tag">知识点</span>${k.name.zh}</button></li>`,
          )}
          ${(s.formulas ?? []).map(
            (f) =>
              html`<li><button type="button" data-goto="${firstPageOf(f)}"><span class="tag mint">公式</span>${f.name.zh}<span class="count">例题 ${f.exercises?.length ?? 0}</span></button></li>`,
          )}
        </ul>
      </div>`,
    )}
    <p class="muted" style="margin-top:20px">共 ${pages.length} 页。点上面的条目可以直接跳转。</p>
    <p class="swipe-hint">左右滑动翻页</p>
  </article>`;
}

function knowledgePage({ page }) {
  const k = page.item;
  return html`<article class="card knowledge">
    <div class="card-kind"><span class="kind">知识点</span>${sectionTag(page)}</div>
    ${nameBlock(k.name)}
    ${section('概念解释', k.paragraphs?.length ? html`${k.paragraphs.map((p) => html`<p>${rich(p)}</p>`)}` : '')}
    ${k.definitions?.length ? html`<div class="card-sec"><h3>定义</h3>${displayMath(k.definitions)}</div>` : ''}
    ${section('适用条件', list(k.conditions))}
    ${section('相关性质与定理', list(k.theorems))}
    ${section('与其他知识点的联系', relatedKnowledge(k.related))}
  </article>`;
}

function formulaPage({ page }) {
  const f = page.item;
  const partLabel = page.parts > 1 ? `第 ${page.part} / ${page.parts} 页` : '';
  const first = page.part <= 1;
  const second = page.part === 0 || page.part === 2;
  return html`<article class="card formula">
    <div class="card-kind"><span class="kind">公式卡</span>${sectionTag(page)}${partLabel ? html`<span>${partLabel}</span>` : ''}</div>
    ${nameBlock(f.name)}
    ${first ? html`${f.formula ? displayMath(f.formula) : ''}${section('适用条件', list(f.conditions))}${section('使用场景', list(f.scenarios))}` : ''}
    ${second ? html`${section('计算步骤', list(f.steps, true))}${section('易错点', list(f.pitfalls))}${section('关联知识点', relatedKnowledge(f.knowledge))}` : ''}
    <p class="muted" style="margin-top:18px">本卡例题 ${f.exercises?.length ?? 0} 道，向后翻页开始练习。</p>
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
    <p class="question" lang="${LANG_ATTR[lang]}">${rich(q)}</p>
    <div class="answer-toggle">
      <button class="btn" type="button" data-action="toggle-answer" aria-expanded="false">查看答案与解析</button>
      <div class="answer" hidden>
        <div class="answer-head">标准答案</div>
        <div class="answer-box">${ex.answer ? displayMath(ex.answer, { boxed: false }) : html`<p>${rich(ex.answerText)}</p>`}</div>
        ${section('解题思路', ex.idea ? html`<p>${rich(ex.idea)}</p>` : '')}
        ${section('详细计算过程', solutionSteps(ex.solution))}
        ${section('易错点', list(ex.pitfalls))}
        ${section('涉及知识点', relatedKnowledge(ex.knowledge ?? page.formula.knowledge))}
      </div>
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
