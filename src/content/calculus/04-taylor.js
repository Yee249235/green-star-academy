// 第 4 章 Taylor 展开
const R = String.raw;

const K = {
  meanValue: {
    id: 'calc.taylor.k.mean-value',
    name: { zh: '平均值定理', ja: '平均値の定理', kana: 'へいきんちのていり' },
    paragraphs: [
      R`**Rolle 定理**：$f$ 在 $[a,b]$ 连续、$(a,b)$ 可微，且 $f(a)=f(b)$，则存在 $c\in(a,b)$ 使 $f'(c)=0$。`,
      R`**平均值定理**（Lagrange）：去掉 $f(a)=f(b)$ 的条件，则存在 $c$ 使切线斜率等于两端点连线的斜率。`,
      R`**Cauchy 平均值定理**是两个函数的版本，也是洛必达法则的理论依据。`,
    ],
    definitions: [
      R`\frac{f(b)-f(a)}{b-a}=f'(c)\qquad(a<c<b)`,
      R`\frac{f(b)-f(a)}{g(b)-g(a)}=\frac{f'(c)}{g'(c)}\qquad(a<c<b)`,
    ],
    conditions: [R`闭区间连续、开区间可微；Cauchy 版本还要求 $g'(x)\neq0$。`],
    theorems: [
      R`常写成 $f(b)=f(a)+f'(c)(b-a)$，或 $f(a+h)=f(a)+f'(a+\theta h)h\ (0<\theta<1)$。`,
      R`推论：区间上 $f'(x)\equiv0\Rightarrow f$ 为常数；$f'(x)>0\Rightarrow f$ 单调增加。`,
    ],
    related: ['calc.taylor.k.theorem', 'calc.deriv.k.definition'],
  },
  theorem: {
    id: 'calc.taylor.k.theorem',
    name: { zh: 'Taylor 定理与余项', ja: 'テイラーの定理と剰余項', kana: 'テイラーのていりとじょうよこう' },
    paragraphs: [
      R`平均值定理的推广：用 $n-1$ 次多项式逼近 $f(x)$，误差（**余项** $R_n$）可以用某点 $c$ 处的 $n$ 阶导数表示（Lagrange 型余项）。`,
      R`$a=0$ 时称为 **Maclaurin 展开**。当 $n\to\infty$ 时 $R_n\to0$，得到无穷级数形式的 Taylor 展开。`,
    ],
    definitions: [
      R`\begin{gathered}f(x)=\sum_{k=0}^{n-1}\frac{f^{(k)}(a)}{k!}(x-a)^k+R_n(x)\\R_n(x)=\frac{f^{(n)}(c)}{n!}(x-a)^n\end{gathered}`,
    ],
    conditions: [R`$f$ 在包含 $a$、$x$ 的区间上 $n$ 次可微，$c$ 在 $a$ 与 $x$ 之间。也可写 $c=a+\theta(x-a)\ (0<\theta<1)$。`],
    theorems: [
      R`$R_n(x)=o\bigl((x-a)^{n-1}\bigr)$，所以求极限时可以写成 $f(x)=\displaystyle\sum_{k=0}^{n-1}\cdots+o\bigl((x-a)^{n-1}\bigr)$。`,
      R`展开式是唯一的：用任何正确的方法求出的多项式部分都相同，所以可以用已知展开式组合。`,
    ],
    related: ['calc.taylor.k.mean-value', 'calc.limits.k.infinitesimal'],
  },
};

const series = (id, zh, ja, kana, o) => ({ id: `calc.taylor.${id}`, name: { zh, ja, kana }, knowledge: ['calc.taylor.k.theorem'], ...o });

const mvtCards = [
  {
    id: 'calc.taylor.mean-value',
    name: { zh: '平均值定理的应用', ja: '平均値の定理の応用', kana: 'へいきんちのていりのおうよう' },
    knowledge: ['calc.taylor.k.mean-value'],
    formula: R`\frac{f(b)-f(a)}{b-a}=f'(c)\qquad(a<c<b)`,
    conditions: [R`$f$ 在 $[a,b]$ 连续，在 $(a,b)$ 可微。`],
    scenarios: [R`求满足定理的 $c$；证明不等式（把差 $f(b)-f(a)$ 化为 $f'(c)(b-a)$ 再估计 $f'(c)$）。`],
    steps: [R`计算两端点连线的斜率。`, R`解方程 $f'(c)=$ 斜率，取落在 $(a,b)$ 内的解。`],
    pitfalls: [R`$c$ 必须在开区间 $(a,b)$ 内，区间外的解要舍去。`],
    exercises: [
      {
        id: 'calc.taylor.mean-value.ex1',
        difficulty: '易',
        question: {
          zh: R`对 $f(x)=x^3$ 在区间 $[0,2]$ 上应用平均值定理，求满足条件的 $c$。`,
          ja: R`$f(x)=x^3$ に区間 $[0,2]$ で平均値の定理を適用するとき，定理の $c$ を求めよ。`,
          en: R`Apply the mean value theorem to $f(x)=x^3$ on $[0,2]$ and find the value of $c$.`,
        },
        answer: R`c=\frac{2}{\sqrt3}=\frac{2\sqrt3}{3}`,
        idea: R`斜率 $\dfrac{8-0}{2-0}=4$，解 $3c^2=4$。`,
        solution: [
          { math: R`\frac{f(2)-f(0)}{2-0}=\frac{8}{2}=4=f'(c)=3c^2` },
          R`$c^2=\dfrac43$，$c=\pm\dfrac{2}{\sqrt3}$。只有正值在 $(0,2)$ 内，所以 $c=\dfrac{2\sqrt3}{3}\approx1.15$。`,
        ],
        pitfalls: [R`负根不在区间内，要舍去。`],
        verify: { type: 'equal', lhs: '(2**3-0**3)/2', rhs: '3*(2*sqrt(3)/3)**2' },
      },
    ],
  },
  {
    id: 'calc.taylor.taylor-formula',
    name: { zh: 'Taylor 公式（Lagrange 余项）', ja: 'テイラーの定理', kana: 'テイラーのていり' },
    knowledge: ['calc.taylor.k.theorem'],
    formula: R`\begin{gathered}f(x)=\sum_{k=0}^{n-1}\frac{f^{(k)}(a)}{k!}(x-a)^k+R_n(x)\\R_n(x)=\frac{f^{(n)}(c)}{n!}(x-a)^n\end{gathered}`,
    conditions: [R`$f$ 在 $a$、$x$ 之间 $n$ 次可微，$c$ 在 $a$ 与 $x$ 之间。`],
    scenarios: [R`在 $x=a$（$a\neq0$）附近展开；写出指定阶数的展开式与余项。`],
    steps: [R`求 $f(a),f'(a),\dots,f^{(n-1)}(a)$。`, R`代入公式，第 $k$ 项除以 $k!$。`, R`余项用 $n$ 阶导数在 $c$ 处的值。`],
    pitfalls: [R`第 $k$ 项是 $\dfrac{f^{(k)}(a)}{k!}(x-a)^k$，别忘了 $k!$，也别把 $(x-a)$ 写成 $x$。`],
    exercises: [
      {
        id: 'calc.taylor.taylor-formula.ex1',
        difficulty: '中',
        question: {
          zh: R`写出 $f(x)=\sqrt{x}$ 在 $x=4$ 处展开到 $(x-4)^2$ 的 Taylor 公式（余项 $R_3$ 用 Lagrange 型表示）。`,
          ja: R`$f(x)=\sqrt{x}$ を $x=4$ のまわりで $(x-4)^2$ の項までテイラー展開し，剰余項 $R_3$ をラグランジュの形で表せ。`,
          en: R`Write the Taylor formula of $f(x)=\sqrt{x}$ at $x=4$ up to $(x-4)^2$, with the Lagrange remainder $R_3$.`,
        },
        answer: R`\begin{gathered}\sqrt{x}=2+\frac{x-4}{4}-\frac{(x-4)^2}{64}+R_3\\R_3=\frac{1}{16}c^{-\frac52}(x-4)^3\end{gathered}`,
        idea: R`$f'=\dfrac12x^{-\frac12}$，$f''=-\dfrac14x^{-\frac32}$，$f'''=\dfrac38x^{-\frac52}$。`,
        solution: [
          { math: R`f(4)=2,\qquad f'(4)=\frac{1}{2\cdot2}=\frac{1}{4}` },
          { math: R`f''(4)=-\frac{1}{4\cdot8}=-\frac{1}{32}` },
          { math: R`\begin{aligned}\sqrt{x}&=2+\frac14(x-4)\\&\quad+\frac{1}{2!}\left(-\frac{1}{32}\right)(x-4)^2+R_3\end{aligned}` },
          { math: R`\begin{aligned}R_3&=\frac{f'''(c)}{3!}(x-4)^3=\frac{3}{8\cdot6}c^{-\frac52}(x-4)^3\\&=\frac{1}{16}c^{-\frac52}(x-4)^3\end{aligned}` },
        ],
        pitfalls: [R`二次项系数是 $\dfrac{f''(4)}{2!}=-\dfrac{1}{64}$，不要漏除 $2!$。`],
        verify: { type: 'equal', lhs: 'series(sqrt(x), x, 4, 3).removeO()', rhs: '2+(x-4)/4-(x-4)**2/64' },
      },
    ],
  },
];

const maclaurinCards = [
  series('exp', '指数函数 eˣ 的 Maclaurin 展开', 'eˣ のマクローリン展開', 'eˣ のマクローリンてんかい', {
    formula: R`e^{x}=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\cdots+\frac{x^{n}}{n!}+\cdots`,
    conditions: [R`对所有实数 $x$ 收敛。`],
    scenarios: [R`$e^{ax}$、$e^{-x^2}$ 等：把 $x$ 换成整体代入。`],
    steps: [R`把 $x$ 换成 $ax$ 等整体。`, R`展开到需要的阶数。`],
    pitfalls: [R`$e^{2x}$ 的 $x^3$ 项是 $\dfrac{(2x)^3}{3!}=\dfrac{4}{3}x^3$，系数要连同乘方一起算。`],
    exercises: [
      {
        id: 'calc.taylor.exp.ex1',
        difficulty: '易',
        question: {
          zh: R`写出 $e^{2x}$ 的 Maclaurin 展开到 $x^3$ 项。`,
          ja: R`$e^{2x}$ をマクローリン展開し，$x^3$ の項まで求めよ。`,
          en: R`Expand $e^{2x}$ in a Maclaurin series up to the $x^3$ term.`,
        },
        answer: R`e^{2x}=1+2x+2x^2+\frac{4}{3}x^3+\cdots`,
        idea: R`把 $e^u$ 的展开式中 $u$ 换成 $2x$。`,
        solution: [{ math: R`\begin{aligned}e^{2x}&=1+2x+\frac{(2x)^2}{2}+\frac{(2x)^3}{6}+\cdots\\&=1+2x+2x^2+\frac{4}{3}x^3+\cdots\end{aligned}` }],
        pitfalls: [R`$(2x)^2=4x^2$，除以 $2!$ 得 $2x^2$。`],
        verify: { type: 'equal', lhs: 'series(exp(2*x), x, 0, 4).removeO()', rhs: '1+2*x+2*x**2+4*x**3/3' },
      },
    ],
  }),
  series('sin', 'sin x 的 Maclaurin 展开', 'sin x のマクローリン展開', 'サインのマクローリンてんかい', {
    formula: R`\begin{aligned}\sin x&=x-\frac{x^3}{3!}+\frac{x^5}{5!}-\cdots\\&\quad+(-1)^{n}\frac{x^{2n+1}}{(2n+1)!}+\cdots\end{aligned}`,
    conditions: [R`对所有实数 $x$ 收敛。只有奇次项（奇函数）。`],
    scenarios: [R`$\sin ax$、$\sin x^2$ 等的展开；求极限。`],
    steps: [R`把 $x$ 换成整体代入。`],
    pitfalls: [R`符号正负交替，分母是奇数的阶乘。`],
    exercises: [
      {
        id: 'calc.taylor.sin.ex1',
        difficulty: '易',
        question: {
          zh: R`写出 $\sin2x$ 的 Maclaurin 展开到 $x^5$ 项。`,
          ja: R`$\sin2x$ をマクローリン展開し，$x^5$ の項まで求めよ。`,
          en: R`Expand $\sin2x$ in a Maclaurin series up to the $x^5$ term.`,
        },
        answer: R`\sin2x=2x-\frac{4}{3}x^3+\frac{4}{15}x^5-\cdots`,
        idea: R`$u=2x$ 代入 $\sin u$ 的展开式。`,
        solution: [{ math: R`\begin{aligned}\sin2x&=2x-\frac{(2x)^3}{6}+\frac{(2x)^5}{120}-\cdots\\&=2x-\frac43x^3+\frac{4}{15}x^5-\cdots\end{aligned}` }],
        pitfalls: [R`$\dfrac{32}{120}=\dfrac{4}{15}$。`],
        verify: { type: 'equal', lhs: 'series(sin(2*x), x, 0, 6).removeO()', rhs: '2*x-4*x**3/3+4*x**5/15' },
      },
    ],
  }),
  series('cos', 'cos x 的 Maclaurin 展开', 'cos x のマクローリン展開', 'コサインのマクローリンてんかい', {
    formula: R`\begin{aligned}\cos x&=1-\frac{x^2}{2!}+\frac{x^4}{4!}-\cdots\\&\quad+(-1)^{n}\frac{x^{2n}}{(2n)!}+\cdots\end{aligned}`,
    conditions: [R`对所有实数 $x$ 收敛。只有偶次项（偶函数）。`],
    scenarios: [R`$\cos ax$、$\cos x^2$ 的展开；$1-\cos x$ 的极限计算。`],
    steps: [R`把 $x$ 换成整体代入。`],
    pitfalls: [R`第一项是 $1$；分母是偶数的阶乘。`],
    exercises: [
      {
        id: 'calc.taylor.cos.ex1',
        difficulty: '易',
        question: {
          zh: R`写出 $\cos x^2$ 的 Maclaurin 展开到 $x^8$ 项。`,
          ja: R`$\cos x^2$ をマクローリン展開し，$x^8$ の項まで求めよ。`,
          en: R`Expand $\cos x^2$ in a Maclaurin series up to the $x^8$ term.`,
        },
        answer: R`\cos x^2=1-\frac{x^4}{2}+\frac{x^8}{24}-\cdots`,
        idea: R`$u=x^2$ 代入 $\cos u$ 的展开式。`,
        solution: [{ math: R`\begin{aligned}\cos x^2&=1-\frac{(x^2)^2}{2!}+\frac{(x^2)^4}{4!}-\cdots\\&=1-\frac{x^4}{2}+\frac{x^8}{24}-\cdots\end{aligned}` }],
        pitfalls: [R`$(x^2)^4=x^8$。不需要对 $\cos x^2$ 逐次求导，代入法快得多。`],
        verify: { type: 'equal', lhs: 'series(cos(x**2), x, 0, 9).removeO()', rhs: '1-x**4/2+x**8/24' },
      },
    ],
  }),
  series('log', 'log(1+x) 的 Maclaurin 展开', 'log(1+x) のマクローリン展開', 'ログ 1 たす x のマクローリンてんかい', {
    formula: R`\begin{aligned}\log(1+x)&=x-\frac{x^2}{2}+\frac{x^3}{3}-\cdots\\&\quad+(-1)^{n-1}\frac{x^{n}}{n}+\cdots\end{aligned}`,
    conditions: [R`$-1<x\le1$ 时收敛。`],
    scenarios: [R`$\log(1-x)$、$\log\dfrac{1+x}{1-x}$ 等；求极限。`],
    steps: [R`$\log(1-x)$：把 $x$ 换成 $-x$，各项都变成负号。`, R`对数的商、积先拆成差、和。`],
    pitfalls: [R`分母是 $n$ 不是 $n!$。`],
    exercises: [
      {
        id: 'calc.taylor.log.ex1',
        difficulty: '中',
        question: {
          zh: R`写出 $\log\dfrac{1+x}{1-x}$ 的 Maclaurin 展开到 $x^5$ 项。`,
          ja: R`$\log\dfrac{1+x}{1-x}$ をマクローリン展開し，$x^5$ の項まで求めよ。`,
          en: R`Expand $\log\dfrac{1+x}{1-x}$ in a Maclaurin series up to the $x^5$ term.`,
        },
        answer: R`\log\frac{1+x}{1-x}=2\left(x+\frac{x^3}{3}+\frac{x^5}{5}\right)+\cdots`,
        idea: R`拆成 $\log(1+x)-\log(1-x)$，偶次项抵消。`,
        solution: [
          { math: R`\log(1-x)=-x-\frac{x^2}{2}-\frac{x^3}{3}-\frac{x^4}{4}-\frac{x^5}{5}-\cdots` },
          { math: R`\begin{aligned}&\log(1+x)-\log(1-x)\\&\quad=2x+\frac{2x^3}{3}+\frac{2x^5}{5}+\cdots\end{aligned}` },
        ],
        pitfalls: [R`偶次项相减抵消，奇次项加倍。`],
        verify: { type: 'equal', lhs: 'series(log((1+x)/(1-x)), x, 0, 6).removeO()', rhs: '2*x+2*x**3/3+2*x**5/5' },
      },
    ],
  }),
  series('binomial', '二项展开 (1+x)^α', '二項展開 (1+x)^α', 'にこうてんかい', {
    formula: [R`\begin{aligned}(1+x)^{\alpha}&=\sum_{k=0}^{\infty}\binom{\alpha}{k}x^k\\&=1+\alpha x+\frac{\alpha(\alpha-1)}{2!}x^2+\cdots\end{aligned}`, R`\binom{\alpha}{k}=\frac{\alpha(\alpha-1)\cdots(\alpha-k+1)}{k!}`],
    conditions: [R`$|x|<1$ 时收敛；$\alpha$ 为任意实数（自然数时就是有限项的二项式定理）。`],
    scenarios: [R`$\sqrt{1+x}$、$\dfrac{1}{\sqrt{1-x}}$、$(1+x)^{-2}$ 等。`],
    steps: [R`确定 $\alpha$（根号是 $\frac12$，倒数是负指数）。`, R`逐项计算广义二项系数 $\dbinom{\alpha}{k}$。`, R`$1-x$ 的情况把 $x$ 换成 $-x$。`],
    pitfalls: [R`广义二项系数的分子是 $\alpha$ 连续往下减 1 的 $k$ 个数的乘积。`],
    exercises: [
      {
        id: 'calc.taylor.binomial.ex1',
        difficulty: '中',
        question: {
          zh: R`写出 $\sqrt{1+x}$ 的 Maclaurin 展开到 $x^3$ 项。`,
          ja: R`$\sqrt{1+x}$ をマクローリン展開し，$x^3$ の項まで求めよ。`,
          en: R`Expand $\sqrt{1+x}$ in a Maclaurin series up to the $x^3$ term.`,
        },
        answer: R`\sqrt{1+x}=1+\frac{x}{2}-\frac{x^2}{8}+\frac{x^3}{16}-\cdots`,
        idea: R`$\alpha=\dfrac12$。`,
        solution: [
          { math: R`\binom{\frac12}{2}=\frac{\frac12\cdot\left(-\frac12\right)}{2}=-\frac18` },
          { math: R`\binom{\frac12}{3}=\frac{\frac12\cdot\left(-\frac12\right)\cdot\left(-\frac32\right)}{6}=\frac{1}{16}` },
          { math: R`\sqrt{1+x}=1+\frac12x-\frac18x^2+\frac{1}{16}x^3-\cdots` },
        ],
        pitfalls: [R`第三项的分子 $\frac12\cdot(-\frac12)\cdot(-\frac32)=\frac38$，除以 $3!=6$ 得 $\frac{1}{16}$。`],
        verify: { type: 'equal', lhs: 'series(sqrt(1+x), x, 0, 4).removeO()', rhs: '1+x/2-x**2/8+x**3/16' },
      },
      {
        id: 'calc.taylor.binomial.ex2',
        difficulty: '中',
        question: {
          zh: R`写出 $\dfrac{1}{\sqrt{1-x}}$ 的 Maclaurin 展开到 $x^3$ 项。`,
          ja: R`$\dfrac{1}{\sqrt{1-x}}$ をマクローリン展開し，$x^3$ の項まで求めよ。`,
          en: R`Expand $\dfrac{1}{\sqrt{1-x}}$ in a Maclaurin series up to the $x^3$ term.`,
        },
        answer: R`\frac{1}{\sqrt{1-x}}=1+\frac{x}{2}+\frac{3}{8}x^2+\frac{5}{16}x^3+\cdots`,
        idea: R`$\alpha=-\dfrac12$，再把 $x$ 换成 $-x$。`,
        solution: [
          { math: R`\begin{aligned}(1+u)^{-\frac12}&=1-\frac12u+\frac{\left(-\frac12\right)\left(-\frac32\right)}{2}u^2\\&\quad+\frac{\left(-\frac12\right)\left(-\frac32\right)\left(-\frac52\right)}{6}u^3+\cdots\\&=1-\frac12u+\frac38u^2-\frac{5}{16}u^3+\cdots\end{aligned}` },
          R`令 $u=-x$，奇次项变号：`,
          { math: R`\frac{1}{\sqrt{1-x}}=1+\frac12x+\frac38x^2+\frac{5}{16}x^3+\cdots` },
        ],
        pitfalls: [R`代入 $u=-x$ 后所有项都变成正号。`],
        verify: { type: 'equal', lhs: 'series(1/sqrt(1-x), x, 0, 4).removeO()', rhs: '1+x/2+3*x**2/8+5*x**3/16' },
      },
    ],
  }),
  series('geometric', '1/(1−x) 的展开（等比级数）', '1/(1−x) の展開（等比級数）', 'とうひきゅうすう', {
    formula: R`\begin{gathered}\frac{1}{1-x}=1+x+x^2+x^3+\cdots\\=\sum_{n=0}^{\infty}x^{n}\qquad(|x|<1)\end{gathered}`,
    conditions: [R`$|x|<1$。`],
    scenarios: [R`$\dfrac{1}{1+x}$、$\dfrac{1}{1+x^2}$ 等分式的展开；对它逐项积分得到 $\log(1+x)$、$\arctan x$ 的展开。`],
    steps: [R`化成 $\dfrac{1}{1-u}$ 的形式，确定 $u$。`, R`代入等比级数。`],
    pitfalls: [R`$\dfrac{1}{1+x^2}=\dfrac{1}{1-(-x^2)}$，$u=-x^2$，符号交替。`],
    exercises: [
      {
        id: 'calc.taylor.geometric.ex1',
        difficulty: '易',
        question: {
          zh: R`写出 $\dfrac{1}{1+x^2}$ 的 Maclaurin 展开到 $x^6$ 项。`,
          ja: R`$\dfrac{1}{1+x^2}$ をマクローリン展開し，$x^6$ の項まで求めよ。`,
          en: R`Expand $\dfrac{1}{1+x^2}$ in a Maclaurin series up to the $x^6$ term.`,
        },
        answer: R`\frac{1}{1+x^2}=1-x^2+x^4-x^6+\cdots`,
        idea: R`$u=-x^2$ 代入等比级数。`,
        solution: [{ math: R`\begin{aligned}\frac{1}{1-(-x^2)}&=1+(-x^2)+(-x^2)^2\\&\quad+(-x^2)^3+\cdots\\&=1-x^2+x^4-x^6+\cdots\end{aligned}` }],
        pitfalls: [R`收敛范围 $|x|<1$。`],
        verify: { type: 'equal', lhs: 'series(1/(1+x**2), x, 0, 7).removeO()', rhs: '1-x**2+x**4-x**6' },
      },
    ],
  }),
  series('arctan', 'arctan x 的 Maclaurin 展开', 'arctan x のマクローリン展開', 'アークタンジェントのマクローリンてんかい', {
    formula: R`\begin{aligned}\arctan x&=x-\frac{x^3}{3}+\frac{x^5}{5}-\cdots\\&\quad+(-1)^{n}\frac{x^{2n+1}}{2n+1}+\cdots\end{aligned}`,
    conditions: [R`$|x|\le1$ 时收敛。由 $\dfrac{1}{1+x^2}$ 的展开逐项积分得到。`],
    scenarios: [R`含 $\arctan$ 的极限、展开。`],
    steps: [R`把 $x$ 换成整体代入。`],
    pitfalls: [R`分母是奇数本身（不是阶乘），这一点与 $\sin x$ 不同。`],
    exercises: [
      {
        id: 'calc.taylor.arctan.ex1',
        difficulty: '易',
        question: {
          zh: R`写出 $\arctan2x$ 的 Maclaurin 展开到 $x^5$ 项。`,
          ja: R`$\arctan2x$ をマクローリン展開し，$x^5$ の項まで求めよ。`,
          en: R`Expand $\arctan2x$ in a Maclaurin series up to the $x^5$ term.`,
        },
        answer: R`\arctan2x=2x-\frac{8}{3}x^3+\frac{32}{5}x^5-\cdots`,
        idea: R`$u=2x$ 代入。`,
        solution: [{ math: R`\begin{aligned}\arctan2x&=2x-\frac{(2x)^3}{3}+\frac{(2x)^5}{5}-\cdots\\&=2x-\frac83x^3+\frac{32}{5}x^5-\cdots\end{aligned}` }],
        pitfalls: [R`与 $\sin2x$ 的展开对比：分母分别是 $3,5$ 和 $3!,5!$。`],
        verify: { type: 'equal', lhs: 'series(atan(2*x), x, 0, 6).removeO()', rhs: '2*x-8*x**3/3+32*x**5/5' },
      },
    ],
  }),
];

const applyCards = [
  {
    id: 'calc.taylor.combination',
    name: { zh: '组合展开法（代入、乘积、合成）', ja: '既知の展開を組み合わせる方法', kana: 'きちのてんかいをくみあわせるほうほう' },
    knowledge: ['calc.taylor.k.theorem'],
    formula: R`\begin{gathered}f(x)=\sum a_kx^k,\ g(x)=\sum b_kx^k\\\Longrightarrow\ f(x)g(x)=\sum_{n}\Bigl(\sum_{k=0}^{n}a_kb_{n-k}\Bigr)x^n\end{gathered}`,
    conditions: [R`各展开式在 $x=0$ 附近成立；展开式唯一，所以组合结果就是所求展开。`],
    scenarios: [R`$e^x\sin x$、$e^{\sin x}$、$\dfrac{\sin x}{1-x}$ 等不方便逐次求导的函数。`],
    steps: [R`各因子分别展开到所需阶数。`, R`乘积：只保留次数不超过目标阶数的项。`, R`合成：把内层展开式代入外层展开式，舍去高次项。`],
    pitfalls: [R`每个因子都要展开到目标阶数；低估阶数会漏项。`],
    exercises: [
      {
        id: 'calc.taylor.combination.ex1',
        difficulty: '中',
        question: {
          zh: R`写出 $e^{x}\sin x$ 的 Maclaurin 展开到 $x^3$ 项。`,
          ja: R`$e^{x}\sin x$ をマクローリン展開し，$x^3$ の項まで求めよ。`,
          en: R`Expand $e^{x}\sin x$ in a Maclaurin series up to the $x^3$ term.`,
        },
        answer: R`e^{x}\sin x=x+x^2+\frac{x^3}{3}+\cdots`,
        idea: R`两个展开式相乘，只保留 3 次以下的项。`,
        solution: [
          { math: R`\left(1+x+\frac{x^2}{2}+\cdots\right)\left(x-\frac{x^3}{6}+\cdots\right)` },
          { math: R`\begin{aligned}&=x+x^2+\left(\frac12-\frac16\right)x^3+\cdots\\&=x+x^2+\frac13x^3+\cdots\end{aligned}` },
        ],
        pitfalls: [R`$x^3$ 项来自 $\dfrac{x^2}{2}\cdot x$ 与 $1\cdot\left(-\dfrac{x^3}{6}\right)$ 两部分。`],
        verify: { type: 'equal', lhs: 'series(exp(x)*sin(x), x, 0, 4).removeO()', rhs: 'x+x**2+x**3/3' },
      },
      {
        id: 'calc.taylor.combination.ex2',
        difficulty: '难',
        question: {
          zh: R`写出 $e^{\sin x}$ 的 Maclaurin 展开到 $x^3$ 项。`,
          ja: R`$e^{\sin x}$ をマクローリン展開し，$x^3$ の項まで求めよ。`,
          en: R`Expand $e^{\sin x}$ in a Maclaurin series up to the $x^3$ term.`,
        },
        answer: R`e^{\sin x}=1+x+\frac{x^2}{2}+0\cdot x^3+\cdots`,
        idea: R`令 $u=\sin x=x-\dfrac{x^3}{6}+\cdots$，代入 $e^u=1+u+\dfrac{u^2}{2}+\dfrac{u^3}{6}+\cdots$。`,
        solution: [
          { math: R`u=x-\frac{x^3}{6}+\cdots` },
          { math: R`u^2=x^2+\cdots,\qquad u^3=x^3+\cdots` },
          { math: R`\begin{aligned}e^{\sin x}&=1+\left(x-\frac{x^3}{6}\right)+\frac{x^2}{2}+\frac{x^3}{6}+\cdots\\&=1+x+\frac{x^2}{2}+0\cdot x^3+\cdots\end{aligned}` },
        ],
        pitfalls: [R`$x^3$ 的系数恰好为 0：$-\dfrac16$（来自 $u$）与 $+\dfrac16$（来自 $\dfrac{u^3}{6}$）抵消。`],
        verify: { type: 'equal', lhs: 'series(exp(sin(x)), x, 0, 4).removeO()', rhs: '1+x+x**2/2' },
      },
    ],
  },
  {
    id: 'calc.taylor.approximation',
    name: { zh: '近似计算与误差估计', ja: '近似値の計算と誤差の評価', kana: 'きんじちのけいさんとごさのひょうか' },
    knowledge: ['calc.taylor.k.theorem'],
    formula: R`\begin{gathered}|R_n(x)|=\left|\frac{f^{(n)}(c)}{n!}x^n\right|\le\frac{M}{n!}|x|^n\\\left(|f^{(n)}(t)|\le M\right)\end{gathered}`,
    conditions: [R`在 $0$ 与 $x$ 之间 $|f^{(n)}(t)|\le M$。`],
    scenarios: [R`用多项式近似计算 $\sin0.1$、$e$、$\sqrt{1.1}$ 等，并给出误差上界。`],
    steps: [R`写出到 $n-1$ 次的近似多项式，代入求近似值。`, R`估计 $|f^{(n)}(c)|$ 的上界 $M$。`, R`误差 $\le\dfrac{M}{n!}|x|^n$。`],
    pitfalls: [R`$\sin x$ 展开到 $x^3$ 时，下一非零项是 $x^5$，可以把余项取为 $R_5$，误差更小。`],
    exercises: [
      {
        id: 'calc.taylor.approximation.ex1',
        difficulty: '中',
        question: {
          zh: R`用 $\sin x\approx x-\dfrac{x^3}{6}$ 求 $\sin0.1$ 的近似值，并估计误差。`,
          ja: R`$\sin x\approx x-\dfrac{x^3}{6}$ を用いて $\sin0.1$ の近似値を求め，誤差を評価せよ。`,
          en: R`Use $\sin x\approx x-\dfrac{x^3}{6}$ to approximate $\sin0.1$ and bound the error.`,
        },
        answer: R`\begin{gathered}\sin0.1\approx0.099833\\|\text{误差}|\le\frac{(0.1)^5}{120}<10^{-7}\end{gathered}`,
        idea: R`$x^4$ 项系数为 0，可以用 $R_5$ 估计误差，$|\sin^{(5)}c|=|\cos c|\le1$。`,
        solution: [
          { math: R`\begin{aligned}\sin0.1&\approx0.1-\frac{0.001}{6}\\&=0.1-0.000166\cdots=0.099833\cdots\end{aligned}` },
          { math: R`|R_5|=\left|\frac{\cos c}{5!}(0.1)^5\right|\le\frac{10^{-5}}{120}\approx8.3\times10^{-8}` },
        ],
        pitfalls: [R`真实值 $\sin0.1=0.0998334\cdots$，误差确实小于 $10^{-7}$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'less', lhs: 'Abs(sin(Rational(1,10)) - (Rational(1,10)-Rational(1,6000)))', rhs: 'Rational(1,10)**5/120' },
            { type: 'less', lhs: 'Rational(1,10)**5/120', rhs: '10**(-7)' },
          ],
        },
      },
    ],
  },
];

export const taylorChapter = {
  overview: '平均值定理与 Taylor 定理，以及每一个常用函数的 Maclaurin 展开（各自一张卡）：eˣ、sin、cos、log(1+x)、二项展开、等比级数、arctan；最后是组合展开法与近似计算。用 Taylor 展开求极限见第 1 章。',
  sections: [
    { title: '平均值定理与 Taylor 定理', knowledge: [K.meanValue, K.theorem], formulas: mvtCards },
    { title: '常用函数的 Maclaurin 展开', knowledge: [], formulas: maclaurinCards },
    { title: '展开的应用', knowledge: [], formulas: applyCards },
  ],
};
