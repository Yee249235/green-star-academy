// 微分积分：章节目录（以石原・浅野《理工系の基礎 微分積分 増補版》与考试大纲为路标）
// 每章的知识点、公式卡、例题从阶段四开始写入各章文件。
import { limitsChapter } from './01-limits/index.js';
import { derivativesChapter } from './02-derivatives.js';
import { compositeChapter } from './03-composite-inverse-higher.js';
import { taylorChapter } from './04-taylor.js';
import { applicationsChapter } from './05-applications.js';
import { integralsChapter } from './06-integrals.js';
import { techniquesChapter } from './07-integration-techniques.js';
import { multivariableChapter } from './08-multivariable.js';
import { partialChapter } from './09-partial.js';

export const calculus = {
  id: 'calc',
  name: { zh: '微分积分', ja: '微分積分', kana: 'びぶんせきぶん' },
  textbook: '石原繁・浅野重初《理工系の基礎 微分積分 増補版》',
  chapters: [
    { id: 'limits', no: 1, name: { zh: '数列与函数的极限', ja: '数列と関数の極限', kana: 'すうれつとかんすうのきょくげん' }, ...limitsChapter },
    { id: 'derivatives', no: 2, name: { zh: '微分法', ja: '微分法', kana: 'びぶんほう' }, ...derivativesChapter },
    { id: 'composite-inverse-higher', no: 3, name: { zh: '合成函数、逆函数、高阶导数', ja: '合成関数・逆関数・高次導関数', kana: 'ごうせいかんすう・ぎゃくかんすう・こうじどうかんすう' }, ...compositeChapter },
    { id: 'taylor', no: 4, name: { zh: 'Taylor 展开', ja: 'テイラー展開', kana: 'テイラーてんかい' }, ...taylorChapter },
    { id: 'applications', no: 5, name: { zh: '微分法的应用', ja: '微分法の応用', kana: 'びぶんほうのおうよう' }, ...applicationsChapter },
    { id: 'integrals', no: 6, name: { zh: '不定积分与定积分', ja: '不定積分と定積分', kana: 'ふていせきぶんとていせきぶん' }, ...integralsChapter },
    { id: 'integration-techniques', no: 7, name: { zh: '置换积分与部分积分', ja: '置換積分・部分積分', kana: 'ちかんせきぶん・ぶぶんせきぶん' }, ...techniquesChapter },
    { id: 'multivariable', no: 8, name: { zh: '多变量函数', ja: '多変数関数', kana: 'たへんすうかんすう' }, ...multivariableChapter },
    { id: 'partial', no: 9, name: { zh: '偏微分', ja: '偏微分', kana: 'へんびぶん' }, ...partialChapter },
    { id: 'total-differential', no: 10, name: { zh: '全微分', ja: '全微分', kana: 'ぜんびぶん' } },
    { id: 'extrema', no: 11, name: { zh: '多变量函数的极值', ja: '多変数関数の極値', kana: 'たへんすうかんすうのきょくち' } },
    { id: 'multiple-integrals', no: 12, name: { zh: '重积分', ja: '重積分', kana: 'じゅうせきぶん' } },
    { id: 'change-of-variables', no: 13, name: { zh: '变量变换', ja: '変数変換', kana: 'へんすうへんかん' } },
    { id: 'improper-integrals', no: 14, name: { zh: '广义积分', ja: '広義積分', kana: 'こうぎせきぶん' } },
    { id: 'ode', no: 15, name: { zh: '微分方程基础', ja: '微分方程式の基礎', kana: 'びぶんほうていしきのきそ' } },
  ],
};
