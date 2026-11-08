import { html, mount } from './dom.js';
import { subjects } from '../content/index.js';

export function renderSettings(app) {
  mount(
    app,
    html`<div class="page-head"><h1>设置</h1></div>

      <div class="card">
        <div class="card-sec" style="margin-top:0">
          <h3>账号与云同步</h3>
          <p>使用 Google 账号登录后，手机和电脑的进度自动同步。</p>
          <div style="margin-top:14px"><button class="btn" disabled>使用 Google 登录（阶段七）</button></div>
        </div>
      </div>

      <div class="card">
        <div class="card-sec" style="margin-top:0">
          <h3>数据备份</h3>
          <p>把全部学习记录导出为 JSON 文件，或从文件恢复。</p>
          <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap">
            <button class="btn" disabled>导出 JSON（阶段七）</button>
            <button class="btn" disabled>从 JSON 恢复（阶段七）</button>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-sec" style="margin-top:0">
          <h3>公式显示</h3>
          <p>查看分数、积分、矩阵、行列式、多行推导等公式的显示效果。</p>
          <div style="margin-top:14px"><a class="btn" href="#/math-test">打开公式测试页</a></div>
        </div>
      </div>

      <div class="card">
        <div class="card-sec" style="margin-top:0">
          <h3>关于</h3>
          <p>Green Star Academy · 版本 0.3（阶段三：公式渲染系统）</p>
          <ul style="margin-top:8px">
            ${subjects.map((s) => html`<li>${s.name.zh}：${s.textbook}</li>`)}
          </ul>
        </div>
      </div>`,
  );
}
