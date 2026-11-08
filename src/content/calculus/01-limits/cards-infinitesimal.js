// 第 1 章 —— 重要极限、无穷小、洛必达、Taylor 展开、夹逼、左右极限
const R = String.raw;

export const analyticCards = [
  {
    id: 'calc.limits.sinx-over-x',
    name: { zh: '重要极限：sin x / x', ja: '三角関数の基本的な極限', kana: 'さんかくかんすうのきほんてきなきょくげん' },
    knowledge: ['calc.limits.k.function', 'calc.limits.k.infinitesimal'],
    formula: [
      R`\lim_{x\to0}\frac{\sin x}{x}=1`,
      R`\lim_{x\to0}\frac{\tan x}{x}=1,\qquad\lim_{x\to0}\frac{1-\cos x}{x^2}=\frac{1}{2}`,
    ],
    conditions: [R`$x$ 用弧度制。`, R`$x\to0$，或 $\sin$ 里面的整体 $\square\to0$：$\displaystyle\lim\frac{\sin\square}{\square}=1$。`],
    scenarios: [R`含 $\sin$、$\tan$、$1-\cos$ 的 $\dfrac00$ 型。`],
    steps: [R`把 $\sin ax$ 配上分母 $ax$：$\dfrac{\sin ax}{ax}\cdot ax$。`, R`其余因子单独求极限。`],
    pitfalls: [R`$x\to\infty$ 时 $\dfrac{\sin x}{x}\to0$，不是 $1$。`],
    exercises: [
      {
        id: 'calc.limits.sinx-over-x.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to0}\frac{\sin3x}{\sin5x}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to0}\frac{\sin3x}{\sin5x}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to0}\frac{\sin3x}{\sin5x}$.`,
        },
        answer: R`\frac{3}{5}`,
        idea: R`分子分母分别配成 $\dfrac{\sin3x}{3x}$、$\dfrac{\sin5x}{5x}$。`,
        solution: [
          { math: R`\frac{\sin3x}{\sin5x}=\frac{\sin3x}{3x}\cdot\frac{5x}{\sin5x}\cdot\frac{3}{5}\ \longrightarrow\ 1\cdot1\cdot\frac{3}{5}=\frac{3}{5}` },
        ],
        pitfalls: [R`不能约成 $\dfrac{\sin3}{\sin5}$。`],
        verify: { type: 'limit', expr: 'sin(3*x)/sin(5*x)', var: 'x', to: '0', expected: '3/5' },
      },
    ],
  },

  {
    id: 'calc.limits.e-limits',
    name: { zh: '重要极限：与 e 有关的极限', ja: 'e に関する極限', kana: 'e にかんするきょくげん' },
    knowledge: ['calc.limits.k.function', 'calc.limits.k.infinitesimal'],
    formula: [
      R`\lim_{x\to0}(1+x)^{\frac{1}{x}}=e,\qquad\lim_{x\to\pm\infty}\left(1+\frac{1}{x}\right)^{x}=e`,
      R`\lim_{x\to0}\frac{\log(1+x)}{x}=1,\qquad\lim_{x\to0}\frac{e^{x}-1}{x}=1`,
    ],
    conditions: [R`$\log$ 表示自然对数（底为 $e$），日本教材的通常写法。`],
    scenarios: [R`含 $e^{\square}-1$、$\log(1+\square)$ 且 $\square\to0$ 的 $\dfrac00$ 型。`],
    steps: [R`把 $e^{ax}-1$ 配成 $\dfrac{e^{ax}-1}{ax}\cdot ax$。`, R`其余因子单独求极限。`],
    pitfalls: [R`$a^x-1$（$a>0$）对应的是 $\displaystyle\lim_{x\to0}\frac{a^x-1}{x}=\log a$。`],
    exercises: [
      {
        id: 'calc.limits.e-limits.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to0}\frac{e^{2x}-1}{x}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to0}\frac{e^{2x}-1}{x}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to0}\frac{e^{2x}-1}{x}$.`,
        },
        answer: R`2`,
        idea: R`配成 $\dfrac{e^{2x}-1}{2x}\cdot2$。`,
        solution: [{ math: R`\frac{e^{2x}-1}{x}=\frac{e^{2x}-1}{2x}\cdot2\ \longrightarrow\ 1\cdot2=2` }],
        pitfalls: [R`系数 $2$ 来自 $2x$，不要漏掉。`],
        verify: { type: 'limit', expr: '(exp(2*x)-1)/x', var: 'x', to: '0', expected: '2' },
      },
    ],
  },

  {
    id: 'calc.limits.equivalent-infinitesimal',
    name: { zh: '同值无穷小替换', ja: '同値な無限小の置き換え', kana: 'どうちなむげんしょうのおきかえ' },
    knowledge: ['calc.limits.k.infinitesimal'],
    formula: R`\begin{gathered}(x\to0)\\\sin x\sim x,\qquad\tan x\sim x\\\arcsin x\sim x,\qquad\arctan x\sim x\\1-\cos x\sim\frac{x^2}{2}\\e^{x}-1\sim x,\qquad\log(1+x)\sim x\\(1+x)^{\alpha}-1\sim\alpha x\end{gathered}`,
    conditions: [R`只替换**乘除的因子**；加减中的某一项不能单独替换。`, R`$x$ 可换成任何趋于 0 的整体，如 $\sin2x\sim2x$。`],
    scenarios: [R`$\dfrac00$ 型，分子分母是若干因子的乘积。`],
    steps: [R`把分子分母写成因子的乘积。`, R`每个因子换成同值的简单式子。`, R`约分求极限。`],
    pitfalls: [R`$\tan x-\sin x$ 若把两项都换成 $x$ 会得到 $0$，是错误的。要先化成乘积：$\tan x(1-\cos x)$。`],
    exercises: [
      {
        id: 'calc.limits.equivalent-infinitesimal.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to0}\frac{\tan x\left(e^{x}-1\right)}{1-\cos x}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to0}\frac{\tan x\left(e^{x}-1\right)}{1-\cos x}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to0}\frac{\tan x\left(e^{x}-1\right)}{1-\cos x}$.`,
        },
        answer: R`2`,
        idea: R`分子分母都是因子的乘积，可以逐个替换。`,
        solution: [
          R`$x\to0$ 时 $\tan x\sim x$，$e^x-1\sim x$，$1-\cos x\sim\dfrac{x^2}{2}$：`,
          { math: R`\lim_{x\to0}\frac{\tan x\left(e^{x}-1\right)}{1-\cos x}=\lim_{x\to0}\frac{x\cdot x}{\dfrac{x^2}{2}}=2` },
        ],
        pitfalls: [R`$1-\cos x$ 同值于 $\dfrac{x^2}{2}$，不是 $x$。`],
        verify: { type: 'limit', expr: 'tan(x)*(exp(x)-1)/(1-cos(x))', var: 'x', to: '0', expected: '2' },
      },
      {
        id: 'calc.limits.equivalent-infinitesimal.ex2',
        difficulty: '中',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to0}\frac{\tan x-\sin x}{x^3}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to0}\frac{\tan x-\sin x}{x^3}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to0}\frac{\tan x-\sin x}{x^3}$.`,
        },
        answer: R`\frac{1}{2}`,
        idea: R`分子是差，不能直接替换。先提出公因子化为乘积。`,
        solution: [
          { math: R`\tan x-\sin x=\tan x\left(1-\cos x\right)` },
          R`现在是乘积，可以替换：$\tan x\sim x$，$1-\cos x\sim\dfrac{x^2}{2}$：`,
          { math: R`\lim_{x\to0}\frac{\tan x\left(1-\cos x\right)}{x^3}=\lim_{x\to0}\frac{x\cdot\dfrac{x^2}{2}}{x^3}=\frac{1}{2}` },
        ],
        pitfalls: [R`错误做法：$\tan x-\sin x\approx x-x=0$，得到极限为 0。`],
        verify: { type: 'limit', expr: '(tan(x)-sin(x))/x**3', var: 'x', to: '0', expected: '1/2' },
      },
    ],
  },

  {
    id: 'calc.limits.lhopital',
    name: { zh: '洛必达法则', ja: 'ロピタルの定理', kana: 'ロピタルのていり' },
    knowledge: ['calc.limits.k.indeterminate'],
    formula: R`\lim_{x\to a}\frac{f(x)}{g(x)}=\lim_{x\to a}\frac{f'(x)}{g'(x)}`,
    conditions: [
      R`$\dfrac00$ 型或 $\dfrac{\infty}{\infty}$ 型（$a$ 也可以是 $\pm\infty$）。`,
      R`在 $a$ 附近 $f$、$g$ 可微，且 $g'(x)\neq0$。`,
      R`右边的极限存在（或为 $\pm\infty$）。`,
    ],
    scenarios: [R`因式分解、有理化都不方便，而导数容易求的 $\dfrac00$、$\dfrac{\infty}{\infty}$ 型。`, R`$0\cdot\infty$ 型改写成分式后使用。`],
    steps: [R`确认是 $\dfrac00$ 或 $\dfrac{\infty}{\infty}$ 型。`, R`分子、分母**分别**求导（不是对商求导）。`, R`再求极限；仍是未定式可以再用一次，每次都要重新确认类型。`],
    pitfalls: [R`不是未定式时不能用，例如 $\displaystyle\lim_{x\to0}\frac{\cos x}{x+1}=1$，求导会得到错误的 $0$。`, R`右边极限不存在时不能断定原极限不存在。`],
    exercises: [
      {
        id: 'calc.limits.lhopital.ex1',
        difficulty: '中',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to0}\frac{x-\sin x}{x^3}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to0}\frac{x-\sin x}{x^3}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to0}\frac{x-\sin x}{x^3}$.`,
        },
        answer: R`\frac{1}{6}`,
        idea: R`$\dfrac00$ 型，连续用洛必达法则，每次确认类型。`,
        solution: [
          { math: R`\begin{aligned}\lim_{x\to0}\frac{x-\sin x}{x^3}&=\lim_{x\to0}\frac{1-\cos x}{3x^2}&&\left(\frac{0}{0}\right)\\[6pt]&=\lim_{x\to0}\frac{\sin x}{6x}&&\left(\frac{0}{0}\right)\\[6pt]&=\frac{1}{6}\end{aligned}` },
        ],
        pitfalls: [R`第二步也可以用 $1-\cos x\sim\dfrac{x^2}{2}$ 直接得 $\dfrac16$。`],
        verify: { type: 'limit', expr: '(x-sin(x))/x**3', var: 'x', to: '0', expected: '1/6' },
      },
      {
        id: 'calc.limits.lhopital.ex2',
        difficulty: '中',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to+0}x\log x$。`,
          ja: R`極限 $\displaystyle\lim_{x\to+0}x\log x$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to0^{+}}x\log x$.`,
        },
        answer: R`0`,
        idea: R`$0\cdot(-\infty)$ 型，改写成 $\dfrac{\log x}{1/x}$，化为 $\dfrac{\infty}{\infty}$ 型后用洛必达法则。`,
        solution: [
          { math: R`\begin{aligned}\lim_{x\to+0}x\log x&=\lim_{x\to+0}\frac{\log x}{x^{-1}}\\[6pt]&=\lim_{x\to+0}\frac{x^{-1}}{-x^{-2}}=\lim_{x\to+0}(-x)=0\end{aligned}` },
        ],
        pitfalls: [R`改写成 $\dfrac{x}{1/\log x}$ 也是 $\dfrac00$ 型，但求导后更复杂。让 $\log x$ 留在分子更方便。`],
        verify: { type: 'limit', expr: 'x*log(x)', var: 'x', to: '0', dir: '+', expected: '0' },
      },
    ],
  },

  {
    id: 'calc.limits.exponential-forms',
    name: { zh: '幂指函数与 1^∞ 型（取对数）', ja: '1^∞ 型などの極限（対数をとる）', kana: 'いちのむげんだいじょうがたなどのきょくげん' },
    knowledge: ['calc.limits.k.indeterminate'],
    formula: [
      R`\lim f(x)^{g(x)}=\exp\Bigl(\lim g(x)\log f(x)\Bigr)`,
      R`1^{\infty}\ \text{型}:\quad\lim f^{g}=e^{\lim g\,(f-1)}`,
    ],
    conditions: [R`$f(x)>0$。`, R`第二式要求 $f\to1$、$g\to\infty$，且右边指数的极限存在。`],
    scenarios: [R`$1^{\infty}$、$0^{0}$、$\infty^{0}$ 型，如 $(\cos x)^{1/x^2}$、$x^{\sin x}$。`],
    steps: [R`设 $y=f^{g}$，取对数：$\log y=g\log f$。`, R`求 $\lim g\log f=L$（通常是 $0\cdot\infty$ 型）。`, R`原极限 $=e^{L}$。`],
    pitfalls: [R`求出的是 $\log y$ 的极限，最后别忘了取指数。`],
    exercises: [
      {
        id: 'calc.limits.exponential-forms.ex1',
        difficulty: '中',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to0}\left(\cos x\right)^{\frac{1}{x^2}}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to0}\left(\cos x\right)^{\frac{1}{x^2}}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to0}\left(\cos x\right)^{\frac{1}{x^2}}$.`,
        },
        answer: R`e^{-\frac{1}{2}}=\frac{1}{\sqrt{e}}`,
        idea: R`$1^{\infty}$ 型，取对数后用同值无穷小。`,
        solution: [
          R`取对数：$\log y=\dfrac{\log\cos x}{x^2}$。由 $\log(1+u)\sim u$，$u=\cos x-1\to0$：`,
          { math: R`\lim_{x\to0}\frac{\log\cos x}{x^2}=\lim_{x\to0}\frac{\cos x-1}{x^2}=-\frac{1}{2}` },
          R`所以原极限 $=e^{-\frac12}=\dfrac{1}{\sqrt e}$。`,
        ],
        pitfalls: [R`$\cos x-1\sim-\dfrac{x^2}{2}$，符号是负的。`],
        verify: { type: 'limit', expr: 'cos(x)**(1/x**2)', var: 'x', to: '0', expected: 'exp(-1/2)' },
      },
      {
        id: 'calc.limits.exponential-forms.ex2',
        difficulty: '中',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to\infty}\left(\frac{x+1}{x-1}\right)^{x}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to\infty}\left(\frac{x+1}{x-1}\right)^{x}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to\infty}\left(\frac{x+1}{x-1}\right)^{x}$.`,
        },
        answer: R`e^{2}`,
        idea: R`$1^{\infty}$ 型，用 $\lim f^{g}=e^{\lim g(f-1)}$。`,
        solution: [
          { math: R`g\,(f-1)=x\left(\frac{x+1}{x-1}-1\right)=\frac{2x}{x-1}\ \longrightarrow\ 2` },
          R`所以原极限 $=e^{2}$。`,
        ],
        pitfalls: [R`也可以写成 $\dfrac{\left(1+\frac1x\right)^x}{\left(1-\frac1x\right)^x}\to\dfrac{e}{e^{-1}}=e^2$，两种方法可以互相验证。`],
        verify: { type: 'limit', expr: '((x+1)/(x-1))**x', var: 'x', to: 'oo', expected: 'exp(2)' },
      },
    ],
  },

  {
    id: 'calc.limits.taylor',
    name: { zh: 'Taylor 展开法求极限', ja: 'テイラー展開による極限計算', kana: 'テイラーてんかいによるきょくげんけいさん' },
    knowledge: ['calc.limits.k.infinitesimal'],
    formula: R`\begin{aligned}e^{x}&=1+x+\frac{x^2}{2}+\frac{x^3}{6}+o(x^3)\\\sin x&=x-\frac{x^3}{6}+o(x^4)\\\cos x&=1-\frac{x^2}{2}+\frac{x^4}{24}+o(x^5)\\\log(1+x)&=x-\frac{x^2}{2}+\frac{x^3}{3}+o(x^3)\end{aligned}`,
    conditions: [R`$x\to0$（其他点可令 $t=x-a$）。`, R`展开到分母的阶数为止，高阶项写成 $o(x^n)$。`],
    scenarios: [R`分子是多项函数的差，同值替换会把主要部分消掉的 $\dfrac00$ 型。`, R`洛必达需要求导三次以上时，Taylor 展开通常更快。`],
    steps: [R`看分母的阶数，比如 $x^4$。`, R`把分子每个函数展开到 $x^4$ 项。`, R`合并，低次项抵消，留下最低次的非零项。`],
    pitfalls: [R`展开阶数不够会得到错误的 $0$；宁可多展开一项。`, R`复合函数如 $e^{-x^2/2}$：把 $-\dfrac{x^2}{2}$ 整体代入 $e^{u}$ 的展开式。`],
    exercises: [
      {
        id: 'calc.limits.taylor.ex1',
        difficulty: '中',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to0}\frac{e^{x}-1-x-\dfrac{x^2}{2}}{x^3}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to0}\frac{e^{x}-1-x-\dfrac{x^2}{2}}{x^3}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to0}\frac{e^{x}-1-x-\dfrac{x^2}{2}}{x^3}$.`,
        },
        answer: R`\frac{1}{6}`,
        idea: R`分母是 $x^3$，把 $e^x$ 展开到 $x^3$ 项。`,
        solution: [
          { math: R`e^{x}-1-x-\frac{x^2}{2}=\frac{x^3}{6}+o(x^3)` },
          { math: R`\lim_{x\to0}\frac{\dfrac{x^3}{6}+o(x^3)}{x^3}=\frac{1}{6}` },
        ],
        pitfalls: [R`用洛必达需要连续求导三次，Taylor 展开一步就能看出结果。`],
        verify: { type: 'limit', expr: '(exp(x)-1-x-x**2/2)/x**3', var: 'x', to: '0', expected: '1/6' },
      },
      {
        id: 'calc.limits.taylor.ex2',
        difficulty: '难',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to0}\frac{\cos x-e^{-\frac{x^2}{2}}}{x^4}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to0}\frac{\cos x-e^{-\frac{x^2}{2}}}{x^4}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to0}\frac{\cos x-e^{-\frac{x^2}{2}}}{x^4}$.`,
        },
        answer: R`-\frac{1}{12}`,
        idea: R`分母是 $x^4$，两个函数都展开到 $x^4$；$e^{-x^2/2}$ 用 $u=-\dfrac{x^2}{2}$ 代入。`,
        solution: [
          { math: R`\cos x=1-\frac{x^2}{2}+\frac{x^4}{24}+o(x^4)` },
          { math: R`\begin{aligned}e^{-\frac{x^2}{2}}&=1+\left(-\frac{x^2}{2}\right)+\frac{1}{2}\left(-\frac{x^2}{2}\right)^2+o(x^4)\\[4pt]&=1-\frac{x^2}{2}+\frac{x^4}{8}+o(x^4)\end{aligned}` },
          R`相减，$1$ 与 $-\dfrac{x^2}{2}$ 抵消：`,
          { math: R`\begin{aligned}\cos x-e^{-\frac{x^2}{2}}&=\left(\frac{1}{24}-\frac{1}{8}\right)x^4+o(x^4)\\[4pt]&=-\frac{x^4}{12}+o(x^4)\end{aligned}` },
          R`所以极限为 $-\dfrac{1}{12}$。`,
        ],
        pitfalls: [R`只展开到 $x^2$ 会得到 $\dfrac{0}{x^4}$ 的错觉；必须展开到 $x^4$。`],
        verify: { type: 'limit', expr: '(cos(x)-exp(-x**2/2))/x**4', var: 'x', to: '0', expected: '-1/12' },
      },
    ],
  },

  {
    id: 'calc.limits.func-squeeze',
    name: { zh: '夹逼定理（函数）', ja: 'はさみうちの原理（関数）', kana: 'はさみうちのげんり（かんすう）' },
    knowledge: ['calc.limits.k.function'],
    formula: R`\begin{gathered}g(x)\le f(x)\le h(x)\\\lim_{x\to a}g(x)=\lim_{x\to a}h(x)=\alpha\\\Longrightarrow\ \lim_{x\to a}f(x)=\alpha\end{gathered}`,
    conditions: [R`不等式在 $a$ 附近（$x\neq a$）成立即可。`],
    scenarios: [R`含 $\sin\dfrac1x$、$\cos\dfrac1x$ 这类在 $x\to0$ 时振动的有界因子。`],
    steps: [R`用 $\left|\sin\square\right|\le1$ 等把振动因子夹住。`, R`对上下界求极限。`],
    pitfalls: [R`$\displaystyle\lim_{x\to0}\sin\frac{1}{x}$ 本身不存在，不能用四则运算拆开。`],
    exercises: [
      {
        id: 'calc.limits.func-squeeze.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to0}x^2\sin\frac{1}{x}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to0}x^2\sin\frac{1}{x}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to0}x^2\sin\frac{1}{x}$.`,
        },
        answer: R`0`,
        idea: R`$\sin\dfrac1x$ 振动但有界，用 $\left|\sin\dfrac1x\right|\le1$。`,
        solution: [
          { math: R`0\le\left|x^2\sin\frac{1}{x}\right|\le x^2\ \longrightarrow\ 0` },
          R`由夹逼定理，$\left|x^2\sin\dfrac1x\right|\to0$，所以极限为 $0$。`,
        ],
        pitfalls: [R`对含绝对值的不等式夹逼后，再由 $|f|\to0$ 得 $f\to0$。`],
        verify: { type: 'limit', expr: 'x**2*sin(1/x)', var: 'x', to: '0', expected: '0' },
      },
    ],
  },

  {
    id: 'calc.limits.one-sided',
    name: { zh: '左右极限与分段函数', ja: '片側極限と場合分け', kana: 'かたがわきょくげんとばあいわけ' },
    knowledge: ['calc.limits.k.function'],
    formula: R`\begin{gathered}\lim_{x\to a}f(x)\ \text{存在}\\\iff\lim_{x\to a+0}f(x)=\lim_{x\to a-0}f(x)\end{gathered}`,
    conditions: [R`分段函数的分界点，或含 $|x-a|$、$\dfrac{1}{x-a}$ 在指数上的函数。`],
    scenarios: [R`$e^{\frac{1}{x}}$：$x\to+0$ 时 $\to+\infty$，$x\to-0$ 时 $\to0$。`, R`$\dfrac{|x|}{x}$：右边为 $1$，左边为 $-1$。`],
    steps: [R`分别求 $x\to a+0$ 和 $x\to a-0$ 的极限。`, R`相等则极限存在；不相等则极限不存在。`],
    pitfalls: [R`$\dfrac{1}{x}$ 在 $x\to+0$ 与 $x\to-0$ 时分别趋于 $+\infty$、$-\infty$。`],
    exercises: [
      {
        id: 'calc.limits.one-sided.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $f(x)=\dfrac{1}{1+e^{\frac{1}{x}}}$ 在 $x\to+0$ 与 $x\to-0$ 时的极限，并判断 $\displaystyle\lim_{x\to0}f(x)$ 是否存在。`,
          ja: R`$f(x)=\dfrac{1}{1+e^{\frac{1}{x}}}$ について，$x\to+0$ と $x\to-0$ のときの極限を求め，$\displaystyle\lim_{x\to0}f(x)$ が存在するか判定せよ。`,
          en: R`For $f(x)=\dfrac{1}{1+e^{1/x}}$, find the one-sided limits as $x\to0^{+}$ and $x\to0^{-}$, and decide whether $\displaystyle\lim_{x\to0}f(x)$ exists.`,
        },
        answer: R`\begin{gathered}\lim_{x\to+0}f(x)=0,\qquad\lim_{x\to-0}f(x)=1\\\lim_{x\to0}f(x)\ \text{不存在}\end{gathered}`,
        idea: R`$\dfrac1x$ 的符号决定 $e^{\frac1x}$ 趋于 $+\infty$ 还是 $0$。`,
        solution: [
          R`$x\to+0$：$\dfrac1x\to+\infty$，$e^{\frac1x}\to+\infty$，所以 $f(x)\to0$。`,
          R`$x\to-0$：$\dfrac1x\to-\infty$，$e^{\frac1x}\to0$，所以 $f(x)\to\dfrac{1}{1+0}=1$。`,
          R`左右极限不相等，$\displaystyle\lim_{x\to0}f(x)$ 不存在。`,
        ],
        pitfalls: [R`只算一侧就下结论是常见错误。`],
        verify: {
          type: 'all',
          items: [
            { type: 'limit', expr: '1/(1+exp(1/x))', var: 'x', to: '0', dir: '+', expected: '0' },
            { type: 'limit', expr: '1/(1+exp(1/x))', var: 'x', to: '0', dir: '-', expected: '1' },
          ],
        },
      },
    ],
  },
];
