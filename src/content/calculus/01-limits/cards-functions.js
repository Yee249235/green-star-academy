// 第 1 章 —— 函数极限（代数变形）的公式 / 方法卡
const R = String.raw;

export const algebraicCards = [
  {
    id: 'calc.limits.substitution',
    name: { zh: '直接代入法', ja: '直接代入', kana: 'ちょくせつだいにゅう' },
    knowledge: ['calc.limits.k.function', 'calc.limits.k.continuity'],
    formula: R`f\ \text{在}\ x=a\ \text{连续}\ \Longrightarrow\ \lim_{x\to a}f(x)=f(a)`,
    conditions: [R`$f$ 在 $x=a$ 连续：初等函数在定义域内的点都满足。`, R`代入后不是未定式。`],
    scenarios: [R`拿到任何极限题，第一步都先试着代入。`],
    steps: [R`把 $x=a$ 代入。`, R`得到确定的数：就是答案。`, R`得到未定式：换用其他方法。`],
    pitfalls: [R`得到 $\dfrac{c}{0}\ (c\neq0)$ 时极限不存在（发散），要看左右极限的符号。`],
    exercises: [
      {
        id: 'calc.limits.substitution.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to1}\frac{x^2+2x}{x+3}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to1}\frac{x^2+2x}{x+3}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to1}\frac{x^2+2x}{x+3}$.`,
        },
        answer: R`\frac{3}{4}`,
        idea: R`分母在 $x=1$ 处不为 0，有理函数连续，直接代入。`,
        solution: [{ math: R`\lim_{x\to1}\frac{x^2+2x}{x+3}=\frac{1+2}{1+3}=\frac{3}{4}` }],
        pitfalls: [R`代入前先确认分母不为 0。`],
        verify: { type: 'limit', expr: '(x**2+2*x)/(x+3)', var: 'x', to: '1', expected: '3/4' },
      },
    ],
  },

  {
    id: 'calc.limits.factorization',
    name: { zh: '因式分解法', ja: '因数分解による約分', kana: 'いんすうぶんかいによるやくぶん' },
    knowledge: ['calc.limits.k.function', 'calc.limits.k.indeterminate'],
    formula: R`\lim_{x\to a}\frac{(x-a)\,g(x)}{(x-a)\,h(x)}=\lim_{x\to a}\frac{g(x)}{h(x)}=\frac{g(a)}{h(a)}`,
    conditions: [R`$\dfrac{0}{0}$ 型，分子分母都是多项式（都含因子 $x-a$）。`, R`约分后 $h(a)\neq0$。`],
    scenarios: [R`有理函数在 $x\to a$ 时代入得 $\dfrac00$。`],
    steps: [R`代入确认是 $\dfrac00$ 型（说明分子分母都有因子 $x-a$）。`, R`因式分解，约去 $x-a$。`, R`代入 $x=a$。`],
    pitfalls: [R`常用公式：$x^3-a^3=(x-a)(x^2+ax+a^2)$，$x^n-a^n=(x-a)(x^{n-1}+ax^{n-2}+\cdots+a^{n-1})$。`],
    exercises: [
      {
        id: 'calc.limits.factorization.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to2}\frac{x^3-8}{x^2-4}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to2}\frac{x^3-8}{x^2-4}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to2}\frac{x^3-8}{x^2-4}$.`,
        },
        answer: R`3`,
        idea: R`$\dfrac00$ 型，分子分母都含因子 $x-2$。`,
        solution: [
          { math: R`\frac{x^3-8}{x^2-4}=\frac{(x-2)(x^2+2x+4)}{(x-2)(x+2)}=\frac{x^2+2x+4}{x+2}` },
          { math: R`\lim_{x\to2}\frac{x^2+2x+4}{x+2}=\frac{4+4+4}{4}=3` },
        ],
        pitfalls: [R`$x^3-8$ 的分解是 $(x-2)(x^2+2x+4)$，中间项是 $+2x$。`],
        verify: { type: 'limit', expr: '(x**3-8)/(x**2-4)', var: 'x', to: '2', expected: '3' },
      },
    ],
  },

  {
    id: 'calc.limits.rationalization',
    name: { zh: '有理化法', ja: '有理化', kana: 'ゆうりか' },
    knowledge: ['calc.limits.k.function', 'calc.limits.k.indeterminate'],
    formula: R`\frac{\sqrt{f(x)}-c}{g(x)}=\frac{f(x)-c^2}{g(x)\left(\sqrt{f(x)}+c\right)}`,
    conditions: [R`含根式的 $\dfrac00$ 型，或 $\infty-\infty$ 型。`],
    scenarios: [R`$\sqrt{1+x}-1$、$\sqrt{x^2+ax}-x$ 这类式子。`],
    steps: [R`分子（或分母）乘以共轭式。`, R`化简后约去使分母为 0 的因子，或同除最高次项。`, R`代入或求极限。`],
    pitfalls: [R`$x\to-\infty$ 时 $\sqrt{x^2}=|x|=-x$，提出根号外要加负号。`],
    exercises: [
      {
        id: 'calc.limits.rationalization.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to0}\frac{\sqrt{1+x}-1}{x}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to0}\frac{\sqrt{1+x}-1}{x}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to0}\frac{\sqrt{1+x}-1}{x}$.`,
        },
        answer: R`\frac{1}{2}`,
        idea: R`$\dfrac00$ 型，分子有理化。`,
        solution: [
          { math: R`\begin{aligned}\frac{\sqrt{1+x}-1}{x}&=\frac{(1+x)-1}{x\left(\sqrt{1+x}+1\right)}\\[4pt]&=\frac{1}{\sqrt{1+x}+1}\ \longrightarrow\ \frac{1}{2}\end{aligned}` },
        ],
        pitfalls: [R`有理化后要约去 $x$，否则仍是 $\dfrac00$。`],
        verify: { type: 'limit', expr: '(sqrt(1+x)-1)/x', var: 'x', to: '0', expected: '1/2' },
      },
      {
        id: 'calc.limits.rationalization.ex2',
        difficulty: '中',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+x}-x\right)$。`,
          ja: R`極限 $\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+x}-x\right)$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to\infty}\left(\sqrt{x^2+x}-x\right)$.`,
        },
        answer: R`\frac{1}{2}`,
        idea: R`$\infty-\infty$ 型，有理化后同除 $x$。`,
        solution: [
          { math: R`\begin{aligned}\sqrt{x^2+x}-x&=\frac{(x^2+x)-x^2}{\sqrt{x^2+x}+x}=\frac{x}{\sqrt{x^2+x}+x}\\[4pt]&=\frac{1}{\sqrt{1+\dfrac{1}{x}}+1}\ \longrightarrow\ \frac{1}{2}\end{aligned}` },
        ],
        pitfalls: [R`这题若错误地认为 $\infty-\infty=0$ 会得到 0，正确答案是 $\dfrac12$。`],
        verify: { type: 'limit', expr: 'sqrt(x**2+x)-x', var: 'x', to: 'oo', expected: '1/2' },
      },
    ],
  },

  {
    id: 'calc.limits.common-denominator',
    name: { zh: '通分约分法', ja: '通分', kana: 'つうぶん' },
    knowledge: ['calc.limits.k.function', 'calc.limits.k.indeterminate'],
    formula: R`\frac{A}{B}-\frac{C}{D}=\frac{AD-BC}{BD}`,
    conditions: [R`两个分式相减得到 $\infty-\infty$ 型。`],
    scenarios: [R`$\dfrac{1}{x-1}-\dfrac{2}{x^2-1}$、$\dfrac{1}{x}-\dfrac{1}{\sin x}$ 这类两分式之差。`],
    steps: [R`通分合成一个分式。`, R`化简分子，因式分解后约去公因子。`, R`代入求值（仍为 $\dfrac00$ 时可接洛必达或 Taylor 展开）。`],
    pitfalls: [R`通分时用最简公分母，可减少计算量。`],
    exercises: [
      {
        id: 'calc.limits.common-denominator.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to1}\left(\frac{1}{x-1}-\frac{2}{x^2-1}\right)$。`,
          ja: R`極限 $\displaystyle\lim_{x\to1}\left(\frac{1}{x-1}-\frac{2}{x^2-1}\right)$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to1}\left(\frac{1}{x-1}-\frac{2}{x^2-1}\right)$.`,
        },
        answer: R`\frac{1}{2}`,
        idea: R`$\infty-\infty$ 型，公分母为 $x^2-1$。`,
        solution: [
          { math: R`\begin{aligned}\frac{1}{x-1}-\frac{2}{x^2-1}&=\frac{(x+1)-2}{x^2-1}\\[4pt]&=\frac{x-1}{(x-1)(x+1)}=\frac{1}{x+1}\end{aligned}` },
          R`所以极限为 $\dfrac{1}{1+1}=\dfrac12$。`,
        ],
        pitfalls: [R`第一项通分要乘 $(x+1)$，分子是 $x+1$ 而不是 $1$。`],
        verify: { type: 'limit', expr: '1/(x-1)-2/(x**2-1)', var: 'x', to: '1', expected: '1/2' },
      },
    ],
  },

  {
    id: 'calc.limits.func-highest-power',
    name: { zh: '同除最高次项（x→±∞）', ja: '最高次の項で割る（x→±∞）', kana: 'さいこうじのこうでわる' },
    knowledge: ['calc.limits.k.function', 'calc.limits.k.indeterminate'],
    formula: R`x\to-\infty\ \text{时}\quad\sqrt{x^2}=|x|=-x`,
    conditions: [R`$x\to\pm\infty$ 的 $\dfrac{\infty}{\infty}$ 型。`],
    scenarios: [R`有理函数或含 $\sqrt{x^2+\cdots}$ 的分式，尤其是 $x\to-\infty$。`],
    steps: [R`$x\to-\infty$ 时可令 $t=-x$，化为 $t\to+\infty$。`, R`分子分母同除最高次项。`, R`根号内除以 $x^2$ 时，根号外是 $|x|$。`],
    pitfalls: [R`$x<0$ 时 $\sqrt{x^2+1}=-x\sqrt{1+\dfrac{1}{x^2}}$，漏掉负号会得到相反的答案。`],
    exercises: [
      {
        id: 'calc.limits.func-highest-power.ex1',
        difficulty: '中',
        question: {
          zh: R`求极限 $\displaystyle\lim_{x\to-\infty}\frac{\sqrt{x^2+1}}{x+1}$。`,
          ja: R`極限 $\displaystyle\lim_{x\to-\infty}\frac{\sqrt{x^2+1}}{x+1}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{x\to-\infty}\frac{\sqrt{x^2+1}}{x+1}$.`,
        },
        answer: R`-1`,
        idea: R`$x<0$，提出根号时 $\sqrt{x^2}=-x$。`,
        solution: [
          R`$x<0$ 时 $\sqrt{x^2+1}=|x|\sqrt{1+\dfrac{1}{x^2}}=-x\sqrt{1+\dfrac{1}{x^2}}$，所以：`,
          { math: R`\begin{aligned}\frac{\sqrt{x^2+1}}{x+1}&=\frac{-x\sqrt{1+\dfrac{1}{x^2}}}{x\left(1+\dfrac{1}{x}\right)}\\[6pt]&=-\frac{\sqrt{1+\dfrac{1}{x^2}}}{1+\dfrac{1}{x}}\ \longrightarrow\ -1\end{aligned}` },
        ],
        pitfalls: [R`答案是 $-1$。若忘记符号会得到 $1$：分子恒正、分母为负，结果必为负数，可用来检查。`],
        verify: { type: 'limit', expr: 'sqrt(x**2+1)/(x+1)', var: 'x', to: '-oo', expected: '-1' },
      },
    ],
  },
];
