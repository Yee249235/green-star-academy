// 本机偏好设置（题干语言、上次阅读位置）。
// 阶段七接入 Firebase 后，这些数据会同步到云端；这里先存在浏览器本地。
const KEY = 'gsa.prefs.v1';
const LANGS = ['zh', 'ja', 'en'];

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? {};
  } catch {
    return {};
  }
}

let prefs = load();
const listeners = new Set();

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  } catch {
    /* 隐私模式等情况下无法写入，忽略 */
  }
}

export function getLang() {
  return LANGS.includes(prefs.lang) ? prefs.lang : 'zh';
}

export function setLang(lang) {
  if (!LANGS.includes(lang)) return;
  prefs.lang = lang;
  save();
  listeners.forEach((fn) => fn(lang));
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function getLastPosition() {
  return prefs.last ?? null;
}

export function setLastPosition(subjectId, chapterId, page) {
  prefs.last = { subjectId, chapterId, page };
  save();
}

export function getTab(name, fallback) {
  return prefs.tabs?.[name] ?? fallback;
}

export function setTab(name, value) {
  prefs.tabs = { ...(prefs.tabs ?? {}), [name]: value };
  save();
}
