import { html } from '../dom.js';

/** 中文名 + 日文名（日文字形）+ 假名读音 */
export function nameBlock(name, { tag = 'h2' } = {}) {
  const title = tag === 'h1' ? html`<h1 class="card-title">${name.zh}</h1>` : html`<h2 class="card-title">${name.zh}</h2>`;
  return html`${title}
    <p class="card-subtitle"><span lang="ja">${name.ja}</span>${
      name.kana && name.kana !== name.ja ? html`<span class="kana" lang="ja">${name.kana}</span>` : ''
    }</p>`;
}

/** 列表行里用的紧凑版 */
export function nameInline(name) {
  return html`<div class="zh">${name.zh}</div>
    <div class="ja"><span lang="ja">${name.ja}</span>${
      name.kana && name.kana !== name.ja ? html`<span class="kana" lang="ja">${name.kana}</span>` : ''
    }</div>`;
}
