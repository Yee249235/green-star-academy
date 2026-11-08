// 阅读器里每种页面的渲染：概览 / 知识点 / 公式卡 / 例题 / 章末
import { html } from '../dom.js';
import { icons } from '../icons.js';
import { nameBlock } from './names.js';
import { href } from '../../router.js';
import { nextChapter, knowledgeIndex, chapterSections } from '../../content/index.js';
import { displayMath, rich } from '../../math/render.js';
import { starRow } from './stars.js';
import { cardStats, readCount, knowledgeStats } from '../../learning/progress.js';

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
  const ks = knowledgeStats(k.id);
  return html`<article class="card knowledge" data-read-target="${k.id}">
    <div class="card-kind"><span class="kind">知识点</span>${sectionTag(page)}<span class="read-count">已读 ${readCount(k.id)} 次</span></div>
    ${ks.cards ? html`<div class="card-progress">${starRow(Math.round(ks.avgStars * 2) / 2, { size: 15 })}<span class="muted">关联 ${ks.cards} 张公式卡的平均掌握度</span></div>` : ''}
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
  const st = cardStats(f.id);
  return html`<article class="card formula" data-read-target="${f.id}">
    <div class="card-kind"><span class="kind">公式卡</span>${sectionTag(page)}${partLabel ? html`<span>${partLabel}</span>` : ''}<span class="read-count">已读 ${readCount(f.id)} 次</span></div>
    <div class="card-progress${page.pop ? ' pop' : ''}">${starRow(st.stars)}<span class="muted">练习 ${st.practiceCount} 次${st.mastered ? ' · 基本完成' : ''}</span></div>
    ${nameBlock(f.name)}
    ${first ? html`${f.formula ? displayMath(f.formula) : ''}${section('适用条件', list(f.conditions))}${section('使用场景', list(f.scenarios))}` : ''}
    ${second ? html`${section('计算步骤', list(f.steps, true))}${section('易错点', list(f.pitfalls))}${section('关联知识点', relatedKnowledge(f.knowledge))}` : ''}
    <p class="muted" style="margin-top:18px">本卡例题 ${f.exercises?.length ?? 0} 道，向后翻页开始练习。在卡片上双击记一次阅读。</p>
  </article>`;
}

const RESULT_LABEL = { wrong: '做错', hinted: '看提示后做对', correct: '独立做对' };

function exercisePage({ page, lang, state }) {
  const ex = page.item;
  const f = page.formula;
  const st = cardStats(f.id);
  const q = ex.question?.[lang] ?? ex.question?.zh ?? '';
  const s = state ?? {};
  return html`<article class="card exercise">
    <div class="card-kind">
      <span class="kind">例题 ${page.index + 1} / ${page.total}</span>
      <span>${f.name.zh}</span>
      <span class="badge">难度：${ex.difficulty}</span>
    </div>
    <div class="card-progress${page.pop ? ' pop' : ''}">${starRow(st.stars, { size: 15 })}<span class="muted">本卡练习 ${st.practiceCount} 次</span></div>
    <p class="question" lang="${LANG_ATTR[lang]}">${rich(q)}</p>

    ${
      s.hint
        ? html`<div class="hint-box"><div class="answer-head">提示</div><p>${rich(ex.idea)}</p></div>`
        : ''
    }
    <div class="ex-actions">
      ${!s.hint && !s.revealed ? html`<button class="btn" type="button" data-action="hint">看提示</button>` : ''}
      <button class="btn${s.revealed ? '' : ' primary'}" type="button" data-action="toggle-answer" aria-expanded="${String(!!s.revealed)}">${s.revealed ? '收起答案' : '查看答案与解析'}</button>
    </div>

    <div class="answer"${s.revealed ? '' : ' hidden'}>
      <div class="answer-head">标准答案</div>
      <div class="answer-box">${ex.answer ? displayMath(ex.answer, { boxed: false }) : html`<p>${rich(ex.answerText)}</p>`}</div>
      ${section('解题思路', ex.idea ? html`<p>${rich(ex.idea)}</p>` : '')}
      ${section('详细计算过程', solutionSteps(ex.solution))}
      ${section('易错点', list(ex.pitfalls))}
      ${section('涉及知识点', relatedKnowledge(ex.knowledge ?? f.knowledge))}

      <div class="assess">
        <div class="answer-head">这次做得怎么样？</div>
        <div class="assess-buttons">
          <button type="button" class="assess-btn wrong" data-assess="wrong">做错</button>
          <button type="button" class="assess-btn hinted" data-assess="hinted">看提示后做对</button>
          <button type="button" class="assess-btn correct" data-assess="correct"${s.hint ? ' disabled title="用过提示，不能记为独立做对"' : ''}>独立做对</button>
        </div>
        ${s.feedback ? html`<p class="assess-feedback">${s.feedback}</p>` : ''}
      </div>
    </div>
  </article>`;
}

export { RESULT_LABEL };

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
