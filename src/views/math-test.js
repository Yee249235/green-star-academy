import { html, mount } from './dom.js';
import { displayMath, rich } from '../math/render.js';
import { fitMath } from '../math/fit.js';
import { mathTestGroups, mathTestInline, mathTestBroken } from '../math/test-cases.js';

export function renderMathTest(app) {
  mount(
    app,
    html`<div class="page-head">
        <h1>公式测试页</h1>
        <p>阶段三验收用：检查各类公式在手机和电脑上的显示效果。</p>
      </div>

      ${mathTestGroups.map(
        (g) => html`<section class="card formula">
          <div class="card-kind"><span class="kind">${g.title}</span></div>
          ${g.items.map((it) => html`${it.note ? html`<p class="muted" style="margin-top:14px">${it.note}</p>` : ''}${displayMath(it.tex)}`)}
        </section>`,
      )}

      <section class="card">
        <div class="card-kind"><span class="kind">正文中的行内公式</span></div>
        ${mathTestInline.map((t) => html`<p style="margin-top:10px">${rich(t)}</p>`)}
      </section>

      <section class="card">
        <div class="card-kind"><span class="kind">错误兜底演示</span></div>
        <p class="muted">下面是一条故意写错的公式（缺少右括号）。网页上显示红框和原始代码，不会空白或乱码；正式内容在构建时就会被拦下。</p>
        ${displayMath(mathTestBroken.tex)}
      </section>`,
  );
  fitMath(app);
  document.fonts?.ready.then(() => fitMath(app));
}
