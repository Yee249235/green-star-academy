// 学习计时（手动）：开始 → 暂停 / 继续 → 结束。
// - 计时状态存在 localStorage，刷新页面不会丢失，多个标签页共享同一个计时
// - 计时中每 15 秒记一次「心跳」；页面被关闭后再打开，会按最后一次心跳补记这次学习（最多误差 15 秒）
// - 结束时生成一条 session 记录（参与云同步），今日 / 累计时长由 session 汇总
import { add, all, dayKey, uid, subscribe as subscribeStore } from '../data/store.js';

const KEY = 'gsa.timer.v1';
const BEAT_MS = 15_000;
const CLOSED_GAP_MS = 60_000; // 心跳中断超过 1 分钟 → 视为上次页面已关闭

const listeners = new Set();
let beatTimer = null;

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY));
  } catch {
    return null;
  }
}

function write(state) {
  try {
    if (state) localStorage.setItem(KEY, JSON.stringify(state));
    else localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit();
}

function emit() {
  listeners.forEach((fn) => fn(getState()));
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** 当前计时状态：{ status: 'idle'|'running'|'paused', elapsedMs } */
export function getState() {
  const s = read();
  if (!s) return { status: 'idle', elapsedMs: 0 };
  const running = s.status === 'running' ? Date.now() - s.segmentStart : 0;
  return { status: s.status, elapsedMs: s.accumulatedMs + running, startedAt: s.startedAt };
}

function beat() {
  const s = read();
  if (s?.status !== 'running') return;
  s.lastBeat = Date.now();
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* ignore */
  }
}

function startBeating() {
  clearInterval(beatTimer);
  beatTimer = setInterval(beat, BEAT_MS);
}

export function start() {
  const now = Date.now();
  write({ id: uid(), status: 'running', startedAt: now, segmentStart: now, accumulatedMs: 0, lastBeat: now });
  startBeating();
}

export function pause() {
  const s = read();
  if (s?.status !== 'running') return;
  const now = Date.now();
  s.accumulatedMs += now - s.segmentStart;
  s.status = 'paused';
  s.lastBeat = now;
  write(s);
}

export function resume() {
  const s = read();
  if (s?.status !== 'paused') return;
  const now = Date.now();
  s.status = 'running';
  s.segmentStart = now;
  s.lastBeat = now;
  write(s);
  startBeating();
}

function finalize(s, endAt) {
  const ms = s.accumulatedMs + (s.status === 'running' ? Math.max(0, endAt - s.segmentStart) : 0);
  if (ms >= 1000) {
    add('sessions', { id: s.id, startedAt: s.startedAt, endedAt: endAt, ms, at: endAt, day: dayKey(s.startedAt) });
  }
  write(null);
  return ms;
}

/** 结束本次学习，返回本次时长（毫秒） */
export function stop() {
  const s = read();
  if (!s) return 0;
  clearInterval(beatTimer);
  return finalize(s, Date.now());
}

/**
 * 启动时调用：处理上次没有正常结束的计时。
 * 返回补记的毫秒数（没有补记则为 0）。
 */
export function recover() {
  const s = read();
  if (!s) return 0;
  if (s.status === 'running') {
    if (Date.now() - s.lastBeat > CLOSED_GAP_MS) {
      return finalize(s, s.lastBeat); // 页面曾被关闭：只算到最后一次心跳
    }
    startBeating(); // 只是刷新：继续计时
  }
  return 0;
}

// 关闭 / 隐藏页面前补一次心跳，减少误差
document.addEventListener('visibilitychange', beat);
window.addEventListener('pagehide', beat);
// 其他标签页改了计时状态
window.addEventListener('storage', (e) => {
  if (e.key === KEY) {
    if (read()?.status === 'running') startBeating();
    emit();
  }
});

// ---------- 汇总 ----------
export function todayMs() {
  const today = dayKey();
  const done = all('sessions')
    .filter((s) => s.day === today)
    .reduce((n, s) => n + s.ms, 0);
  const cur = read();
  const live = cur && dayKey(cur.startedAt) === today ? getState().elapsedMs : 0;
  return done + live;
}

export function totalMs() {
  return all('sessions').reduce((n, s) => n + s.ms, 0) + (read() ? getState().elapsedMs : 0);
}

export function formatClock(ms) {
  const sec = Math.floor(ms / 1000);
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  const pad = (n) => String(n).padStart(2, '0');
  return h ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function formatDuration(ms) {
  if (ms > 0 && ms < 60000) return `${Math.max(1, Math.round(ms / 1000))} 秒`;
  const min = Math.round(ms / 60000);
  if (min < 60) return `${min} 分钟`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h} 小时 ${m} 分钟` : `${h} 小时`;
}

subscribeStore((c) => {
  if (c.collection === 'sessions' || c.type === 'reset') emit();
});
