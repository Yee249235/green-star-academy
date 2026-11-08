// 题干语言切换（中 / 日 / 英），放在例题卡右上角。选择会记住，对所有例题生效。
import { html } from '../dom.js';

const LANG_LABELS = [
  { id: 'zh', label: '中', title: '题干：中文' },
  { id: 'ja', label: '日', title: '題文：日本語' },
  { id: 'en', label: '英', title: 'Problem: English' },
];

export function langSwitch(current) {
  return html`<div class="lang-switch" role="group" aria-label="题干语言">
    ${LANG_LABELS.map(
      (l) =>
        html`<button type="button" data-lang="${l.id}" title="${l.title}" aria-pressed="${String(l.id === current)}">${l.label}</button>`,
    )}
  </div>`;
}
