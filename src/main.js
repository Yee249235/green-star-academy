import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/cards.css';
import './styles/reader.css';
import './styles/learning.css';

import { parseRoute } from './router.js';
import { renderTopbar, setActiveNav } from './views/components/topbar.js';
import { renderHome } from './views/home.js';
import { renderToc } from './views/toc.js';
import { renderReader } from './views/reader.js';
import { renderProgress } from './views/progress.js';
import { renderSettings } from './views/settings.js';
import { renderMathTest } from './views/math-test.js';
import { renderExams } from './views/exams.js';
import { renderExamReader } from './views/exam-reader.js';

const VIEWS = {
  'math-test': renderMathTest,
  home: renderHome,
  toc: renderToc,
  read: renderReader,
  progress: renderProgress,
  settings: renderSettings,
  exams: renderExams,
  exam: renderExamReader,
};

const app = document.getElementById('app');
let cleanup = null;

function route() {
  const r = parseRoute();
  cleanup?.();
  cleanup = null;
  document.body.classList.toggle('in-reader', r.name === 'read' || r.name === 'exam');
  setActiveNav(r.name);
  setSubject(r.subjectId ?? null);
  cleanup = VIEWS[r.name](app, r) ?? null;
  window.scrollTo({ top: 0 });
}

import { recover, formatDuration, setSubject } from './learning/timer.js';
import { getLastPosition } from './data/prefs.js';
import { initSync } from './data/sync.js';
import { toast } from './views/components/toast.js';

// 上次学习没有点「结束」就关闭了页面：按最后一次心跳补记
const recovered = recover();
// 刚打开网站时还没进入某本书：先按「上次读到的书」记账
setSubject(getLastPosition()?.subjectId ?? null);

renderTopbar();
window.addEventListener('hashchange', route);
route();
initSync();
if (recovered) setTimeout(() => toast(`上次学习未结束，已记入 ${formatDuration(recovered)}`, { duration: 5000 }), 600);
