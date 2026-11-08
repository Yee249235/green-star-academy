// JSON 备份：导出全部学习记录；导入时按 id 合并（不会覆盖或删除已有记录）。
import { snapshot, merge, SCHEMA_VERSION } from './store.js';

export function exportJson() {
  const data = { app: 'green-star-academy', exportedAt: new Date().toISOString(), ...snapshot() };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  a.href = url;
  a.download = `green-star-academy-备份-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  try {
    localStorage.setItem('gsa.lastBackup', String(Date.now()));
  } catch {
    /* ignore */
  }
}

export function lastBackupAt() {
  const v = Number(localStorage.getItem('gsa.lastBackup'));
  return v || null;
}

/** 校验并合并备份文件，返回 { added } 或抛出带中文说明的错误 */
export async function importJson(file) {
  let data;
  try {
    data = JSON.parse(await file.text());
  } catch {
    throw new Error('文件不是有效的 JSON。');
  }
  if (data?.app !== 'green-star-academy') throw new Error('这不是 Green Star Academy 的备份文件。');
  if ((data.schemaVersion ?? 1) > SCHEMA_VERSION) throw new Error('备份来自更新版本的网站，请先刷新网站后再导入。');
  for (const c of ['attempts', 'reads', 'sessions']) {
    if (data[c] != null && !Array.isArray(data[c])) throw new Error(`备份中的 ${c} 格式不正确。`);
  }
  const added = merge(data, 'import');
  return { added };
}
