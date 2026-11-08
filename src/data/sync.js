// 云同步（Firebase Authentication + Cloud Firestore）。
// 数据模型：users/{uid}/attempts/{id}、users/{uid}/reads/{id}、users/{uid}/sessions/{id}
// 都是只增不改的事件，两台设备同时记录也不会冲突：本地与云端按 id 取并集。
// 未配置 firebaseConfig 时整个模块不加载 Firebase（不增加网页体积）。
import { firebaseConfig } from './firebase-config.js';
import { all, merge, subscribe as subscribeStore } from './store.js';

const COLLECTIONS = ['attempts', 'reads', 'sessions'];

let status = firebaseConfig
  ? { state: 'signed-out', label: '未登录：数据只保存在本机，点此登录同步' }
  : { state: 'off', label: '云同步未配置：数据保存在本机' };
const listeners = new Set();
let fb = null; // 动态加载的 Firebase 模块与实例
let user = null;
const remoteIds = { attempts: new Set(), reads: new Set(), sessions: new Set() };
const unsubs = [];
let pendingWrites = 0;

function setStatus(state, label) {
  status = { state, label, user: user ? { name: user.displayName, email: user.email } : null };
  listeners.forEach((fn) => fn(status));
}

export function getSyncStatus() {
  return status;
}
export function onSyncStatus(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
export function isConfigured() {
  return Boolean(firebaseConfig);
}

async function load() {
  if (fb) return fb;
  const [appMod, authMod, fsMod] = await Promise.all([
    import('firebase/app'),
    import('firebase/auth'),
    import('firebase/firestore'),
  ]);
  const app = appMod.initializeApp(firebaseConfig);
  const auth = authMod.getAuth(app);
  const db = fsMod.initializeFirestore(app, {
    localCache: fsMod.persistentLocalCache({ tabManager: fsMod.persistentMultipleTabManager() }),
  });
  fb = { authMod, fsMod, auth, db };
  return fb;
}

function refreshState() {
  if (!user) return;
  if (!navigator.onLine) setStatus('offline', '离线：记录已保存在本机，联网后自动同步');
  else if (pendingWrites > 0) setStatus('pending', '正在同步…');
  else setStatus('synced', `已同步（${user.email ?? user.displayName ?? '已登录'}）`);
}

async function upload(collectionName, records) {
  const { fsMod, db } = fb;
  const todo = records.filter((r) => !remoteIds[collectionName].has(r.id));
  for (let i = 0; i < todo.length; i += 400) {
    const batch = fsMod.writeBatch(db);
    for (const r of todo.slice(i, i + 400)) {
      batch.set(fsMod.doc(db, 'users', user.uid, collectionName, r.id), r);
      remoteIds[collectionName].add(r.id);
    }
    pendingWrites++;
    refreshState();
    try {
      await batch.commit();
    } catch (err) {
      console.error('[同步上传失败]', err);
      todo.slice(i, i + 400).forEach((r) => remoteIds[collectionName].delete(r.id));
      setStatus('error', '同步失败：' + (err.code ?? err.message));
    } finally {
      pendingWrites--;
      refreshState();
    }
  }
}

function startSync() {
  const { fsMod, db } = fb;
  for (const c of COLLECTIONS) {
    const ref = fsMod.collection(db, 'users', user.uid, c);
    let first = true;
    unsubs.push(
      fsMod.onSnapshot(
        ref,
        (snap) => {
          const incoming = [];
          snap.docChanges().forEach((ch) => {
            if (ch.type === 'removed') return;
            remoteIds[c].add(ch.doc.id);
            incoming.push(ch.doc.data());
          });
          if (incoming.length) merge({ [c]: incoming }, 'cloud');
          if (first) {
            first = false;
            upload(c, all(c)); // 首次：把本机独有的记录传上去
          }
          refreshState();
        },
        (err) => {
          console.error('[同步监听失败]', err);
          setStatus('error', '同步失败：' + (err.code ?? err.message));
        },
      ),
    );
  }
  unsubs.push(
    subscribeStore((change) => {
      if (change.type === 'add' && change.source === 'local') upload(change.collection, change.records);
      if (change.type === 'add' && change.source === 'import') upload(change.collection, change.records);
    }),
  );
}

function stopSync() {
  while (unsubs.length) unsubs.pop()();
  COLLECTIONS.forEach((c) => remoteIds[c].clear());
}

export async function initSync() {
  if (!firebaseConfig) return;
  try {
    const { authMod, auth } = await load();
    await authMod.getRedirectResult(auth).catch(() => null);
    authMod.onAuthStateChanged(auth, (u) => {
      stopSync();
      user = u;
      if (u) {
        refreshState();
        startSync();
      } else {
        setStatus('signed-out', '未登录：数据只保存在本机，点此登录同步');
      }
    });
    window.addEventListener('online', refreshState);
    window.addEventListener('offline', refreshState);
  } catch (err) {
    console.error('[Firebase 初始化失败]', err);
    setStatus('error', 'Firebase 初始化失败，请检查 firebase-config.js');
  }
}

export async function signIn() {
  const { authMod, auth } = await load();
  const provider = new authMod.GoogleAuthProvider();
  // 手机浏览器上弹窗常被拦截，改用跳转登录
  const mobile = matchMedia('(hover: none)').matches;
  if (mobile) await authMod.signInWithRedirect(auth, provider);
  else await authMod.signInWithPopup(auth, provider);
}

export async function signOutNow() {
  if (!fb) return;
  await fb.authMod.signOut(fb.auth);
}
