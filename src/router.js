// Hash 路由：GitHub Pages 是静态托管，用 # 地址可以在任意页面刷新而不出现 404。
//   #/                         首页
//   #/toc/calc                 目录（微分积分 / 线性代数）
//   #/read/calc/limits/3       章节阅读器：科目 / 章 / 页码（从 1 开始）
//   #/progress/la              进度
//   #/settings                 设置

export function parseRoute(hash = location.hash) {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  const [name = 'home', ...rest] = parts;
  switch (name) {
    case 'toc':
      return { name: 'toc', subjectId: rest[0] };
    case 'read':
      return {
        name: 'read',
        subjectId: rest[0],
        chapterId: rest[1],
        page: Math.max(1, Number.parseInt(rest[2], 10) || 1),
      };
    case 'progress':
      return { name: 'progress', subjectId: rest[0] };
    case 'settings':
      return { name: 'settings' };
    case 'math-test':
      return { name: 'math-test' };
    default:
      return { name: 'home' };
  }
}

export function href(...segments) {
  return '#/' + segments.map((s) => encodeURIComponent(String(s))).join('/');
}

export function go(hash, { replace = false } = {}) {
  if (replace) {
    history.replaceState(null, '', hash);
  } else {
    history.pushState(null, '', hash);
  }
}
