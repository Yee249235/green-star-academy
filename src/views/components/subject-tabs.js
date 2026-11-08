import { html } from '../dom.js';
import { subjects } from '../../content/index.js';

/** 微分积分 / 线性代数 的分段切换 */
export function subjectTabs(currentId) {
  return html`<div class="segmented" role="tablist" aria-label="选择科目">
    ${subjects.map(
      (s) =>
        html`<button type="button" role="tab" data-subject="${s.id}" aria-selected="${String(s.id === currentId)}">${s.name.zh}</button>`,
    )}
  </div>`;
}
