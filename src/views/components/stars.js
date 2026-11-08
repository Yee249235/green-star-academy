import { raw } from '../dom.js';
import { MAX_STARS } from '../../learning/stars.js';

const PATH = 'M12 2l2.9 6.1 6.6.8-4.9 4.6 1.2 6.6L12 16.9 6.2 20.1l1.2-6.6L2.5 8.9l6.6-.8z';

function oneStar(fill, size) {
  // fill: 0 / 0.5 / 1
  const pct = Math.round(fill * 100);
  return `<span class="star" style="width:${size}px;height:${size}px">
    <svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path d="${PATH}" class="star-empty"/></svg>
    <span class="star-fill" style="width:${pct}%"><svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><path d="${PATH}" class="star-full"/></svg></span>
  </span>`;
}

/** 五颗星，支持半颗 */
export function starRow(stars, { size = 18, label = true } = {}) {
  let out = '';
  for (let i = 0; i < MAX_STARS; i++) out += oneStar(Math.max(0, Math.min(1, stars - i)), size);
  const text = Number.isInteger(stars) ? String(stars) : stars.toFixed(1);
  return raw(
    `<span class="stars" role="img" aria-label="${text} / ${MAX_STARS} 颗星">${out}${
      label ? `<span class="stars-num">${text}</span>` : ''
    }</span>`,
  );
}
