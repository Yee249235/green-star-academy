// Firebase 设置（云同步）。
// 按 docs/firebase-setup.md 创建免费的 Firebase 项目后，把控制台给出的 firebaseConfig 粘贴到这里，
// 例如：
// export const firebaseConfig = {
//   apiKey: 'AIza…',
//   authDomain: 'green-star-academy.firebaseapp.com',
//   projectId: 'green-star-academy',
//   appId: '1:…:web:…',
// };
// 这些值不是密码，放在公开仓库里是正常做法；数据安全由 firestore.rules 保证（只有本人能读写）。
// 保持 null 时，网站只在本机保存数据（仍可用 JSON 备份在设备之间搬运）。
export const firebaseConfig = {
  apiKey: 'AIzaSyDWb7yrwQ4PiKrHulGfufp5xJ6DhYvkCIc',
  authDomain: 'green-star-academy.firebaseapp.com',
  projectId: 'green-star-academy',
  storageBucket: 'green-star-academy.firebasestorage.app',
  messagingSenderId: '634321491982',
  appId: '1:634321491982:web:40e2c1dbe2085f50ce445f',
};
