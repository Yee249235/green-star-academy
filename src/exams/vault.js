// 过去问题库：加密存放，输入口令后在本机解密。
// - data.enc.json 是 AES-GCM 密文（密钥由口令经 PBKDF2-SHA256 派生），题目明文不进入公开仓库
// - 解锁后把「派生出的密钥」保存在本机，以后打开不用再输口令；不保存口令本身
const KEY_STORE = 'gsa.examkey.v1';

let cache = null;
let blobPromise = null;

const b64d = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));
const b64e = (u) => btoa(String.fromCharCode(...new Uint8Array(u)));

function loadBlob() {
  // 动态加载：没进入「過去問」模块就不下载密文
  return (blobPromise ??= import('./data.enc.json').then((m) => m.default));
}

async function decryptWith(key, blob) {
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: b64d(blob.iv) }, key, b64d(blob.ct));
  return JSON.parse(new TextDecoder().decode(plain));
}

function readStored() {
  try {
    return JSON.parse(localStorage.getItem(KEY_STORE) ?? 'null');
  } catch {
    return null;
  }
}

/** 本机是否保存过密钥（不代表一定能解开：题库更新后可能需要重新输入） */
export function hasStoredKey() {
  return !!readStored();
}

/** 用保存的密钥解密；失败返回 null */
export async function loadExams() {
  if (cache) return cache;
  const stored = readStored();
  if (!stored) return null;
  try {
    const blob = await loadBlob();
    if (stored.salt !== blob.salt) return null;
    const key = await crypto.subtle.importKey('raw', b64d(stored.key), 'AES-GCM', false, ['decrypt']);
    cache = await decryptWith(key, blob);
    return cache;
  } catch {
    return null;
  }
}

/** 输入口令解锁；口令错误抛出异常 */
export async function unlock(passphrase) {
  const blob = await loadBlob();
  const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(passphrase.trim()), 'PBKDF2', false, ['deriveKey']);
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: b64d(blob.salt), iterations: blob.iter, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: 256 },
    true,
    ['decrypt'],
  );
  cache = await decryptWith(key, blob); // 口令错误时这里会抛出
  const raw = await crypto.subtle.exportKey('raw', key);
  try {
    localStorage.setItem(KEY_STORE, JSON.stringify({ salt: blob.salt, key: b64e(raw) }));
  } catch {
    /* 隐私模式等无法保存时，本次会话仍可使用 */
  }
  return cache;
}

/** 在本机上锁（删除保存的密钥） */
export function lock() {
  cache = null;
  try {
    localStorage.removeItem(KEY_STORE);
  } catch {
    /* 忽略 */
  }
}

export function examAttemptId(questionId) {
  return `exam:${questionId}`;
}
