// 学习数据的本地存储（单一数据源）。
// 所有记录都是「只增不改」的事件：练习记录 attempts、阅读记录 reads、学习时段 sessions。
// 星星、进度、时长都由这些事件计算出来，因此多台设备合并时不会冲突。
//
// 存储选择：数据量很小（每条约 150 字节，一万条约 1.5MB），localStorage 足够且同步读写最简单；
// 开启云同步后，Firestore 自带离线缓存（IndexedDB）负责云端副本。
const KEY = 'gsa.data.v1';
export const SCHEMA_VERSION = 1;
const COLLECTIONS = ['attempts', 'reads', 'sessions'];

function empty() {
  return { schemaVersion: SCHEMA_VERSION, attempts: [], reads: [], sessions: [] };
}

function migrate(data) {
  // 以后改结构时在这里按 schemaVersion 逐步升级
  if (!data || typeof data !== 'object') return empty();
  const out = { ...empty(), ...data, schemaVersion: SCHEMA_VERSION };
  for (const c of COLLECTIONS) if (!Array.isArray(out[c])) out[c] = [];
  return out;
}

function load() {
  try {
    return migrate(JSON.parse(localStorage.getItem(KEY)));
  } catch {
    return empty();
  }
}

let data = load();
const listeners = new Set();

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch (err) {
    console.error('[存储失败]', err);
  }
}

function emit(change) {
  listeners.forEach((fn) => {
    try {
      fn(change);
    } catch (err) {
      console.error(err);
    }
  });
}

export function uid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return 'id-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

/** 东京时间的日期 YYYY-MM-DD（「一天」以东京 0 点切分） */
const dayFmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tokyo', year: 'numeric', month: '2-digit', day: '2-digit' });
export function dayKey(ts = Date.now()) {
  return dayFmt.format(new Date(ts));
}

export function all(collection) {
  return data[collection];
}

export function add(collection, record) {
  const rec = { id: uid(), at: Date.now(), ...record };
  rec.day = rec.day ?? dayKey(rec.at);
  data[collection].push(rec);
  persist();
  emit({ type: 'add', collection, records: [rec], source: 'local' });
  return rec;
}

/** 合并外部记录（导入备份、云端拉取）：按 id 去重，返回新增条数 */
export function merge(incoming, source = 'import') {
  let added = 0;
  const addedRecords = {};
  for (const c of COLLECTIONS) {
    const list = incoming?.[c];
    if (!Array.isArray(list)) continue;
    const have = new Set(data[c].map((r) => r.id));
    for (const r of list) {
      if (!r || typeof r !== 'object' || !r.id || have.has(r.id)) continue;
      data[c].push(r);
      have.add(r.id);
      (addedRecords[c] ??= []).push(r);
      added++;
    }
    data[c].sort((a, b) => (a.at ?? 0) - (b.at ?? 0));
  }
  if (added) {
    persist();
    for (const [c, recs] of Object.entries(addedRecords)) emit({ type: 'add', collection: c, records: recs, source });
  }
  return added;
}

export function snapshot() {
  return JSON.parse(JSON.stringify(data));
}

export function replaceAll(next) {
  data = migrate(next);
  persist();
  emit({ type: 'reset' });
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

// 其他标签页修改了数据 → 重新载入
window.addEventListener('storage', (e) => {
  if (e.key !== KEY) return;
  data = load();
  emit({ type: 'reset', source: 'other-tab' });
});
