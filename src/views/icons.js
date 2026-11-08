import { raw } from './dom.js';

const STAR_PATH = 'M12 2l2.9 6.1 6.6.8-4.9 4.6 1.2 6.6L12 16.9 6.2 20.1l1.2-6.6L2.5 8.9l6.6-.8z';

export const icons = {
  star: (size = 22) =>
    raw(`<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="${STAR_PATH}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>`),
  chevronLeft: (size = 22) =>
    raw(`<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 5.5L8 12l6.5 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`),
  chevronRight: (size = 22) =>
    raw(`<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 5.5L16 12l-6.5 6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`),
  home: (size = 22) =>
    raw(`<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 10.5L12 4l8 6.5V19a1 1 0 0 1-1 1h-4.5v-5.5h-5V20H5a1 1 0 0 1-1-1z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`),
  book: (size = 22) =>
    raw(`<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4.5h9.5a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h9.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>`),
  chart: (size = 22) =>
    raw(`<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19V11M12 19V5M19 19v-5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/></svg>`),
  gear: (size = 22) =>
    raw(`<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4L18 18M6 18l1.6-1.6M16.4 7.6L18 6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`),
  clock: (size = 18) =>
    raw(`<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M12 7.5V12l3 2" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>`),
};
