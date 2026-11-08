// 第 14 章 广义积分
const R = String.raw;

const K = {
  improper: {
    id: 'calc.imp.k.improper',
    name: { zh: '广义积分', ja: '広義積分', kana: 'こうぎせきぶん' },
    paragraphs: [
      R`积分区间无限，或被积函数在区间内（端点）无界时，用极限来定义积分，称为**广义积分**（広義積分）。极限存在（有限）称为**收敛**，否则**发散**。`,
    ],
    definitions: [
      R`\int_a^{\infty}f(x)\,dx=\lim_{b\to\infty}\int_a^bf(x)\,dx`,
      R`\begin{gathered}\int_a^bf(x)\,dx=\lim_{\varepsilon\to+0}\int_{a+\varepsilon}^bf(x)\,dx\\(x=a\ \text{处无界})\end{gathered}`,
    ],
    conditions: [R`两端都有问题时（如 $\displaystyle\int_{-\infty}^{\infty}$），要拆成两个积分分别取极限，两个都收敛才收敛。`],
    theorems: [
      R`$\displaystyle\int_1^{\infty}\frac{dx}{x^p}$ 当 $p>1$ 收敛；$\displaystyle\int_0^1\frac{dx}{x^p}$ 当 $p<1$ 收敛。`,
      R`比较判定：$0\le f\le g$，$\int g$ 收敛 $\Rightarrow\int f$ 收敛；$\int f$ 发散 $\Rightarrow\int g$ 发散。`,
    ],
    related: ['calc.int.k.definite'],
  },
  gamma: {
    id: 'calc.imp.k.gamma',
    name: { zh: 'Γ 函数与 B 函数', ja: 'ガンマ関数とベータ関数', kana: 'ガンマかんすうとベータかんすう' },
    paragraphs: [
      R`由广义积分定义的特殊函数。$\Gamma$ 函数是阶乘的推广，$B$ 函数可以用 $\Gamma$ 函数表示，常用于快速计算某些定积分。`,
    ],
    definitions: [
      R`\Gamma(s)=\int_0^{\infty}x^{s-1}e^{-x}\,dx\qquad(s>0)`,
      R`\begin{aligned}B(p,q)&=\int_0^1x^{p-1}(1-x)^{q-1}\,dx\\&=\frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}\end{aligned}`,
    ],
    conditions: [R`$p,q>0$。`],
    theorems: [R`$\Gamma(s+1)=s\Gamma(s)$，$\Gamma(n+1)=n!$，$\Gamma\!\left(\dfrac12\right)=\sqrt\pi$。`],
    related: ['calc.imp.k.improper'],
  },
};

const cards = [
  {
    id: 'calc.imp.infinite-interval',
    name: { zh: '无穷区间的广义积分', ja: '無限区間の広義積分', kana: 'むげんくかんのこうぎせきぶん' },
    knowledge: ['calc.imp.k.improper'],
    formula: R`\int_a^{\infty}f(x)\,dx=\lim_{b\to\infty}\Bigl[F(x)\Bigr]_a^b`,
    conditions: [R`极限存在且有限才收敛。`],
    scenarios: [R`上限或下限为 $\pm\infty$。`],
    steps: [R`先把上限换成 $b$ 计算定积分。`, R`令 $b\to\infty$ 求极限（常用洛必达）。`],
    pitfalls: [R`$\displaystyle\lim_{b\to\infty}be^{-b}=0$ 等极限要写清楚。`],
    exercises: [
      {
        id: 'calc.imp.infinite-interval.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\int_0^{\infty}xe^{-x}\,dx$。`,
          ja: R`$\displaystyle\int_0^{\infty}xe^{-x}\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int_0^{\infty}xe^{-x}\,dx$.`,
        },
        answer: R`1`,
        idea: R`分部积分后取极限。`,
        solution: [
          { math: R`\begin{aligned}\int_0^bxe^{-x}\,dx&=\Bigl[-xe^{-x}-e^{-x}\Bigr]_0^b\\&=1-(b+1)e^{-b}\end{aligned}` },
          R`$b\to\infty$ 时 $(b+1)e^{-b}\to0$，所以积分值为 $1$。`,
        ],
        pitfalls: [R`这也是 $\Gamma(2)=1!=1$。`],
        verify: { type: 'equal', lhs: 'integrate(x*exp(-x), (x, 0, oo))', rhs: '1' },
      },
    ],
  },
  {
    id: 'calc.imp.unbounded',
    name: { zh: '无界函数的广义积分', ja: '非有界関数の広義積分', kana: 'ひゆうかいかんすうのこうぎせきぶん' },
    knowledge: ['calc.imp.k.improper'],
    formula: R`\int_0^1f(x)\,dx=\lim_{\varepsilon\to+0}\int_{\varepsilon}^1f(x)\,dx`,
    conditions: [R`被积函数在端点（或内部某点）趋于 $\pm\infty$。`],
    scenarios: [R`$\dfrac{1}{\sqrt x}$、$\log x$ 在 $x=0$；$\dfrac{1}{\sqrt{1-x^2}}$ 在 $x=\pm1$。`],
    steps: [R`把有问题的端点换成 $\varepsilon$。`, R`计算后令 $\varepsilon\to+0$。`, R`内部有奇点时从奇点处拆开。`],
    pitfalls: [R`$\displaystyle\int_{-1}^1\frac{dx}{x^2}$ 不能直接代入 $\Bigl[-\frac1x\Bigr]_{-1}^1=-2$：它是发散的。`],
    exercises: [
      {
        id: 'calc.imp.unbounded.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\int_0^1\log x\,dx$。`,
          ja: R`$\displaystyle\int_0^1\log x\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int_0^1\log x\,dx$.`,
        },
        answer: R`-1`,
        idea: R`$\log x$ 在 $x\to+0$ 时趋于 $-\infty$。`,
        solution: [
          { math: R`\int_{\varepsilon}^1\log x\,dx=\Bigl[x\log x-x\Bigr]_{\varepsilon}^1=-1-\varepsilon\log\varepsilon+\varepsilon` },
          R`$\varepsilon\to+0$ 时 $\varepsilon\log\varepsilon\to0$（第 1 章），积分值为 $-1$。`,
        ],
        pitfalls: [R`结果为负，因为 $0<x<1$ 时 $\log x<0$。`],
        verify: { type: 'equal', lhs: 'integrate(log(x), (x, 0, 1))', rhs: '-1' },
      },
    ],
  },
  {
    id: 'calc.imp.comparison',
    name: { zh: '收敛判定（比较判定与 1/xᵖ）', ja: '収束判定（比較判定法）', kana: 'しゅうそくはんてい' },
    knowledge: ['calc.imp.k.improper'],
    formula: [R`\int_1^{\infty}\frac{dx}{x^p}\ \text{收敛}\iff p>1`, R`\int_0^1\frac{dx}{x^p}\ \text{收敛}\iff p<1`],
    conditions: [R`比较判定要求被积函数非负（或考虑绝对值）。`],
    scenarios: [R`求不出原函数，只问「是否收敛」的题目。`],
    steps: [R`找出被积函数在问题点附近的主要部分（同值无穷小 / 无穷大）。`, R`与 $\dfrac{1}{x^p}$ 比较。`, R`根据 $p$ 的范围下结论。`],
    pitfalls: [R`$p=1$ 时两种积分都发散。`],
    exercises: [
      {
        id: 'calc.imp.comparison.ex1',
        difficulty: '中',
        question: {
          zh: R`判断 $\displaystyle\int_1^{\infty}\frac{\sin^2x}{x^2}\,dx$ 是否收敛。`,
          ja: R`$\displaystyle\int_1^{\infty}\frac{\sin^2x}{x^2}\,dx$ の収束・発散を判定せよ。`,
          en: R`Determine whether $\displaystyle\int_1^{\infty}\frac{\sin^2x}{x^2}\,dx$ converges.`,
        },
        answerText: R`收敛。$0\le\dfrac{\sin^2x}{x^2}\le\dfrac{1}{x^2}$，而 $\displaystyle\int_1^\infty\frac{dx}{x^2}=1$ 收敛。`,
        idea: R`$0\le\sin^2x\le1$，与 $\dfrac{1}{x^2}$ 比较。`,
        solution: [
          { math: R`0\le\frac{\sin^2x}{x^2}\le\frac{1}{x^2},\qquad\int_1^{\infty}\frac{dx}{x^2}=1` },
          R`$p=2>1$，由比较判定，原积分收敛。`,
        ],
        pitfalls: [R`收敛判定不需要求出积分值。`],
        verify: { type: 'equal', lhs: 'integrate(1/x**2, (x, 1, oo))', rhs: '1' },
      },
    ],
  },
  {
    id: 'calc.imp.gauss',
    name: { zh: 'Gauss 积分', ja: 'ガウス積分', kana: 'ガウスせきぶん' },
    knowledge: ['calc.imp.k.improper'],
    formula: [R`\int_{-\infty}^{\infty}e^{-x^2}\,dx=\sqrt{\pi}`, R`\int_0^{\infty}e^{-ax^2}\,dx=\frac12\sqrt{\frac{\pi}{a}}\quad(a>0)`],
    conditions: [R`证明用二重积分与极坐标（见本章最后一张卡）。`],
    scenarios: [R`含 $e^{-ax^2}$ 的积分；正态分布相关计算。`],
    steps: [R`用偶函数性质化为 $\displaystyle\int_0^\infty$。`, R`用 $t=\sqrt a\,x$ 换元化为标准形式。`],
    pitfalls: [R`$\displaystyle\int_0^\infty e^{-x^2}dx=\frac{\sqrt\pi}{2}$，只有一半。`],
    exercises: [
      {
        id: 'calc.imp.gauss.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\int_0^{\infty}e^{-2x^2}\,dx$。`,
          ja: R`$\displaystyle\int_0^{\infty}e^{-2x^2}\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int_0^{\infty}e^{-2x^2}\,dx$.`,
        },
        answer: R`\frac{\sqrt{2\pi}}{4}`,
        idea: R`$t=\sqrt2\,x$，$dx=\dfrac{dt}{\sqrt2}$。`,
        solution: [{ math: R`\begin{aligned}\int_0^{\infty}e^{-2x^2}\,dx&=\frac{1}{\sqrt2}\int_0^{\infty}e^{-t^2}\,dt\\&=\frac{1}{\sqrt2}\cdot\frac{\sqrt\pi}{2}=\frac{\sqrt{2\pi}}{4}\end{aligned}` }],
        pitfalls: [R`$\dfrac{\sqrt\pi}{2\sqrt2}=\dfrac{\sqrt{2\pi}}{4}$。`],
        verify: { type: 'equal', lhs: 'integrate(exp(-2*x**2), (x, 0, oo))', rhs: 'sqrt(2*pi)/4' },
      },
    ],
  },
  {
    id: 'calc.imp.gamma-beta',
    name: { zh: 'Γ 函数与 B 函数的计算', ja: 'ガンマ関数・ベータ関数による計算', kana: 'ガンマかんすう・ベータかんすうによるけいさん' },
    knowledge: ['calc.imp.k.gamma'],
    formula: [R`\Gamma(n+1)=n!,\qquad\Gamma\!\left(\frac12\right)=\sqrt\pi`, R`B(p,q)=\frac{\Gamma(p)\Gamma(q)}{\Gamma(p+q)}`],
    conditions: [R`$p,q,s>0$。`],
    scenarios: [R`$\displaystyle\int_0^\infty x^ne^{-x}dx$、$\displaystyle\int_0^1x^m(1-x)^ndx$ 等。`],
    steps: [R`对照定义确定 $s$（或 $p,q$）：指数比 $\Gamma$、$B$ 的参数小 1。`, R`用阶乘或 $\Gamma$ 的性质计算。`],
    pitfalls: [R`$x^3=x^{s-1}$ 对应 $s=4$，所以结果是 $\Gamma(4)=3!$。`],
    exercises: [
      {
        id: 'calc.imp.gamma-beta.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\int_0^{\infty}x^3e^{-x}\,dx$。`,
          ja: R`$\displaystyle\int_0^{\infty}x^3e^{-x}\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int_0^{\infty}x^3e^{-x}\,dx$.`,
        },
        answer: R`6`,
        idea: R`$=\Gamma(4)=3!$。`,
        solution: [{ math: R`\int_0^{\infty}x^{3}e^{-x}\,dx=\Gamma(4)=3!=6` }],
        pitfalls: [R`不要写成 $4!$。`],
        verify: { type: 'equal', lhs: 'integrate(x**3*exp(-x), (x, 0, oo))', rhs: '6' },
      },
      {
        id: 'calc.imp.gamma-beta.ex2',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\int_0^1x^2(1-x)^3\,dx$。`,
          ja: R`$\displaystyle\int_0^1x^2(1-x)^3\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int_0^1x^2(1-x)^3\,dx$.`,
        },
        answer: R`\frac{1}{60}`,
        idea: R`$=B(3,4)$。`,
        solution: [{ math: R`B(3,4)=\frac{\Gamma(3)\Gamma(4)}{\Gamma(7)}=\frac{2!\cdot3!}{6!}=\frac{12}{720}=\frac{1}{60}` }],
        pitfalls: [R`$p=2+1=3$，$q=3+1=4$。`],
        verify: { type: 'equal', lhs: 'integrate(x**2*(1-x)**3, (x, 0, 1))', rhs: 'Rational(1,60)' },
      },
    ],
  },
  {
    id: 'calc.imp.double',
    name: { zh: '广义二重积分', ja: '広義 2 重積分', kana: 'こうぎにじゅうせきぶん' },
    knowledge: ['calc.imp.k.improper', 'calc.cov.k.jacobian'],
    formula: R`\begin{aligned}\iint_{\mathbb{R}^2}e^{-(x^2+y^2)}\,dx\,dy&=\int_0^{2\pi}\!\!\int_0^{\infty}e^{-r^2}r\,dr\,d\theta\\&=\pi\end{aligned}`,
    conditions: [R`用一列趋于整个区域的有界区域（如半径 $R\to\infty$ 的圆）取极限；非负函数时与取法无关。`],
    scenarios: [R`全平面、圆外部等无界区域；被积函数在原点无界。`],
    steps: [R`换成极坐标。`, R`把无限的上限换成 $R$，积分后令 $R\to\infty$。`],
    pitfalls: [R`由此得 $\left(\displaystyle\int_{-\infty}^\infty e^{-x^2}dx\right)^2=\pi$，这就是 Gauss 积分的证明。`],
    exercises: [
      {
        id: 'calc.imp.double.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\iint_D\frac{dx\,dy}{\left(x^2+y^2\right)^2}$，$D=\{x^2+y^2\ge1\}$。`,
          ja: R`$D=\{x^2+y^2\ge1\}$ のとき，$\displaystyle\iint_D\frac{dx\,dy}{\left(x^2+y^2\right)^2}$ を求めよ。`,
          en: R`Evaluate $\displaystyle\iint_D\frac{dx\,dy}{\left(x^2+y^2\right)^2}$ over $D=\{x^2+y^2\ge1\}$.`,
        },
        answer: R`\pi`,
        idea: R`极坐标：被积函数 $\dfrac{1}{r^4}$，面积元 $r\,dr\,d\theta$。`,
        solution: [{ math: R`\int_0^{2\pi}\!\!\int_1^{\infty}\frac{1}{r^4}\,r\,dr\,d\theta=2\pi\Bigl[-\frac{1}{2r^2}\Bigr]_1^{\infty}=2\pi\cdot\frac12=\pi` }],
        pitfalls: [R`$\displaystyle\int_1^\infty r^{-3}dr=\frac12$（$p=3>1$，收敛）。`],
        verify: { type: 'equal', lhs: 'integrate(r**(-3), (r, 1, oo), (theta, 0, 2*pi))', rhs: 'pi' },
      },
    ],
  },
];

export const improperChapter = {
  overview: '广义积分的定义（无穷区间、无界函数）、收敛判定、Gauss 积分、Γ 函数与 B 函数，以及广义二重积分。',
  sections: [
    { title: '广义积分与收敛判定', knowledge: [K.improper], formulas: cards.slice(0, 3) },
    { title: '重要的广义积分', knowledge: [K.gamma], formulas: cards.slice(3) },
  ],
};
