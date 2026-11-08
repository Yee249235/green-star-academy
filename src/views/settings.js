import { html, mount } from './dom.js';
import { subjects } from '../content/index.js';
import { exportJson, importJson, lastBackupAt } from '../data/backup.js';
import { isConfigured, getSyncStatus, onSyncStatus, signIn, signOutNow } from '../data/sync.js';
import { all } from '../data/store.js';
import { toast, dialog } from './components/toast.js';

function syncCard() {
  const st = getSyncStatus();
  if (!isConfigured()) {
    return html`<p>云同步还没有配置。现在所有记录都保存在<strong>这台设备的浏览器</strong>里。</p>
      <p class="muted" style="margin-top:8px">配置方法见仓库里的 <code>docs/firebase-setup.md</code>（约 5 分钟，免费）。配置之前，可以用下面的 JSON 备份在手机和电脑之间搬运记录。</p>`;
  }
  if (st.user) {
    return html`<p>已登录：${st.user.email ?? st.user.name}</p>
      <p class="muted" style="margin-top:6px">状态：${st.label}</p>
      <div style="margin-top:14px"><button class="btn" type="button" data-act="signout">退出登录</button></div>`;
  }
  return html`<p>登录后，手机和电脑的星星、练习记录、阅读次数、学习时长会自动同步。</p>
    <p class="muted" style="margin-top:6px">状态：${st.label}</p>
    <div style="margin-top:14px"><button class="btn primary" type="button" data-act="signin">使用 Google 登录</button></div>`;
}

export function renderSettings(app) {
  const last = lastBackupAt();
  const counts = `练习记录 ${all('attempts').length} 条 · 阅读记录 ${all('reads').length} 条 · 学习时段 ${all('sessions').length} 条`;

  const draw = () =>
    mount(
      app,
      html`<div class="page-head"><h1>设置</h1></div>

      <div class="card">
        <div class="card-sec" style="margin-top:0">
          <h3>账号与云同步</h3>
          <div class="sync-slot">${syncCard()}</div>
        </div>
      </div>

      <div class="card">
        <div class="card-sec" style="margin-top:0">
          <h3>数据备份</h3>
          <p>导出全部学习记录为 JSON 文件；恢复时会与现有记录合并，不会覆盖或删除。</p>
          <p class="muted" style="margin-top:6px">${counts}</p>
          <p class="muted">上次导出：${last ? new Date(last).toLocaleString('zh-CN') : '从未导出'}</p>
          <div style="margin-top:14px; display:flex; gap:10px; flex-wrap:wrap">
            <button class="btn" type="button" data-act="export">导出 JSON</button>
            <label class="btn" style="cursor:pointer">从 JSON 恢复<input type="file" accept="application/json,.json" data-act="import" hidden /></label>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-sec" style="margin-top:0">
          <h3>使用说明</h3>
          <ul>
            <li>翻页：手机左右滑动；电脑点两侧圆形按钮或按键盘 ← →。</li>
            <li>例题：先自己算，再点「查看答案与解析」，最后选择「做错 / 看提示后做对 / 独立做对」。</li>
            <li>星星：每道题每天只有第一次自评计入；一张卡每天最多 +1 颗，做错 −0.5，3 颗为基本完成，最多 5 颗。</li>
            <li>阅读次数：在知识点卡或公式卡上双击（手机双点）记一次。</li>
            <li>计时：顶栏「开始学习」→ 暂停 / 继续 →「结束」。忘记结束也不会丢时间。</li>
          </ul>
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
          <p>Green Star Academy · 版本 1.0</p>
          <ul style="margin-top:8px">
            ${subjects.map((s) => html`<li>${s.name.zh}：${s.textbook}</li>`)}
          </ul>
        </div>
      </div>`,
    );

  draw();
  const off = onSyncStatus(() => {
    const slot = app.querySelector('.sync-slot');
    if (slot) mount(slot, syncCard());
  });

  const onClick = async (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'export') {
      exportJson();
      toast('已导出备份文件');
      draw();
    } else if (act === 'signin') {
      signIn().catch((err) => toast('登录失败：' + (err.code ?? err.message)));
    } else if (act === 'signout') {
      if (await dialog({ title: '退出登录？', body: '本机的记录会保留；退出后新记录不再同步。', actions: [{ label: '取消', value: false }, { label: '退出', value: true, primary: true }] })) {
        await signOutNow();
      }
    }
  };
  const onChange = async (e) => {
    if (e.target.dataset.act !== 'import' || !e.target.files?.[0]) return;
    try {
      const { added } = await importJson(e.target.files[0]);
      await dialog({ title: '恢复完成', body: added ? `合并了 ${added} 条新记录。` : '没有新记录：备份中的内容本机都已经有了。' });
      draw();
    } catch (err) {
      await dialog({ title: '无法恢复', body: err.message });
    } finally {
      e.target.value = '';
    }
  };
  app.addEventListener('click', onClick);
  app.addEventListener('change', onChange);
  return () => {
    off();
    app.removeEventListener('click', onClick);
    app.removeEventListener('change', onChange);
  };
}
