// 第 1 章 数列与函数的极限
import { knowledge as k } from './knowledge.js';
import { basicCards, sequenceCards } from './cards-sequences.js';
import { algebraicCards } from './cards-functions.js';
import { analyticCards } from './cards-infinitesimal.js';
import { continuityCards } from './cards-continuity.js';

export const limitsChapter = {
  overview:
    '先建立数列极限、函数极限、未定式的概念，再把每一种计算方法单独练熟：数列的同除最高次项、有理化、夹逼、单调有界、e 的定义、等比数列、递推数列；函数的直接代入、因式分解、有理化、通分、重要极限、同值无穷小、洛必达、取对数、Taylor 展开、左右极限；最后是连续性与中间值定理。',
  sections: [
    { title: '极限的基本概念', knowledge: [k.sequence, k.function, k.indeterminate], formulas: basicCards },
    { title: '数列的极限', knowledge: [], formulas: sequenceCards },
    { title: '函数的极限：代数变形', knowledge: [], formulas: algebraicCards },
    { title: '函数的极限：重要极限与无穷小', knowledge: [k.infinitesimal], formulas: analyticCards },
    { title: '连续性', knowledge: [k.continuity], formulas: continuityCards },
  ],
};
