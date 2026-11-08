import './styles/tokens.css';
import './styles/base.css';
import './styles/layout.css';
import './styles/cards.css';
import './styles/reader.css';

import { parseRoute } from './router.js';
import { renderTopbar, setActiveNav } from './views/components/topbar.js';
import { renderHome } from './views/home.js';
import { renderToc } from './views/toc.js';
import { renderReader } from './views/reader.js';
import { renderProgress } from './views/progress.js';
import { renderSettings } from './views/settings.js';

const VIEWS = {
  home: renderHome,
  toc: renderToc,
  read: renderReader,
  progress: renderProgress,
  settings: renderSettings,
};

const app = document.getElementById('app');
let cleanup = null;

function route() {
  const r = parseRoute();
  cleanup?.();
  cleanup = null;
  document.body.classList.toggle('in-reader', r.name === 'read');
  setActiveNav(r.name);
  cleanup = VIEWS[r.name](app, r) ?? null;
  window.scrollTo({ top: 0 });
}

renderTopbar();
window.addEventListener('hashchange', route);
route();
