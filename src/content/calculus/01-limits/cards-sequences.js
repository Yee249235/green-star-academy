// 第 1 章 —— 基础与数列极限的公式 / 方法卡
const R = String.raw;

export const basicCards = [
  {
    id: 'calc.limits.arith',
    name: { zh: '极限的四则运算', ja: '極限の四則演算', kana: 'きょくげんのしそくえんざん' },
    knowledge: ['calc.limits.k.sequence', 'calc.limits.k.function'],
    formula: R`\begin{aligned}\lim\,(f\pm g)&=\alpha\pm\beta\\\lim\,fg&=\alpha\beta\\\lim\frac{f}{g}&=\frac{\alpha}{\beta}\quad(\beta\neq0)\end{aligned}`,
    conditions: [R`$\lim f=\alpha$、$\lim g=\beta$ 都存在且**有限**。`, R`商的法则要求 $\beta\neq0$。`],
    scenarios: [R`每一部分的极限都能直接求出、且组合后不是未定式时。`],
    steps: [R`把式子拆成几部分，分别求极限。`, R`确认每部分极限有限、分母极限不为 0。`, R`按四则运算组合。`],
    pitfalls: [R`出现 $\infty-\infty$、$\dfrac{0}{0}$ 等未定式时不能直接套用，要先变形。`],
    exercises: [
      {
        id: 'calc.limits.arith.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{n\to\infty}\left(3+\frac{1}{n}\right)\left(2-\frac{1}{n^2}\right)$。`,
          ja: R`極限 $\displaystyle\lim_{n\to\infty}\left(3+\frac{1}{n}\right)\left(2-\frac{1}{n^2}\right)$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{n\to\infty}\left(3+\frac{1}{n}\right)\left(2-\frac{1}{n^2}\right)$.`,
        },
        answer: R`6`,
        idea: R`两个因子的极限都存在且有限，直接用积的法则。`,
        solution: [
          R`$\dfrac{1}{n}\to0$，$\dfrac{1}{n^2}\to0$，所以两个因子分别收敛到 $3$ 和 $2$：`,
          { math: R`\lim_{n\to\infty}\left(3+\frac{1}{n}\right)\left(2-\frac{1}{n^2}\right)=3\cdot2=6` },
        ],
        pitfalls: [R`不要先展开成四项再逐项求，那样更容易出错。`],
        verify: { type: 'limit', expr: '(3+1/n)*(2-1/n**2)', var: 'n', to: 'oo', expected: '6' },
      },
    ],
  },

  {
    id: 'calc.limits.indeterminate-types',
    name: { zh: '未定式的识别与对策', ja: '不定形の判別と対処', kana: 'ふていけいのはんべつとたいしょ' },
    knowledge: ['calc.limits.k.indeterminate'],
    formula: R`\begin{gathered}\frac{0}{0},\ \ \frac{\infty}{\infty},\ \ 0\cdot\infty,\ \ \infty-\infty\\1^{\infty},\ \ 0^{0},\ \ \infty^{0}\end{gathered}`,
    conditions: [R`先把极限点直接代入，看得到的是哪一种形式。`],
    scenarios: [
      R`$\dfrac{0}{0}$：因式分解、有理化、同值无穷小、洛必达、Taylor 展开。`,
      R`$\dfrac{\infty}{\infty}$：分子分母同除最高次项、洛必达。`,
      R`$\infty-\infty$：通分、有理化，化成分式。`,
      R`$0\cdot\infty$：改写成分式，化为 $\dfrac{0}{0}$ 或 $\dfrac{\infty}{\infty}$。`,
      R`$1^{\infty}$、$0^{0}$、$\infty^{0}$：取对数，化为 $0\cdot\infty$。`,
    ],
    steps: [R`代入极限点，判断类型。`, R`按类型选择变形方法（见上面的使用场景）。`, R`变形后不再是未定式时，代入求值。`],
    pitfalls: [R`$\dfrac{1}{0}$、$\dfrac{\infty}{1}$、$0^{\infty}$、$\infty^{\infty}$ 不是未定式，可以直接判断。`],
    exercises: [
      {
        id: 'calc.limits.indeterminate-types.ex1',
        difficulty: '易',
        question: {
          zh: R`判断 $\displaystyle\lim_{x\to\infty}\left(\sqrt{x+1}-\sqrt{x}\right)$ 是哪种未定式，并求其值。`,
          ja: R`$\displaystyle\lim_{x\to\infty}\left(\sqrt{x+1}-\sqrt{x}\right)$ がどの不定形か判定し、その値を求めよ。`,
          en: R`Identify the indeterminate form of $\displaystyle\lim_{x\to\infty}\left(\sqrt{x+1}-\sqrt{x}\right)$ and evaluate it.`,
        },
        answer: R`\infty-\infty\ \text{型},\quad\text{极限值为 }0`,
        idea: R`$\infty-\infty$ 型含根式，用有理化化为分式。`,
        solution: [
          R`代入后两项都趋于 $+\infty$，属于 $\infty-\infty$ 型。分子分母同乘 $\sqrt{x+1}+\sqrt{x}$：`,
          { math: R`\begin{aligned}\sqrt{x+1}-\sqrt{x}&=\frac{(x+1)-x}{\sqrt{x+1}+\sqrt{x}}\\[4pt]&=\frac{1}{\sqrt{x+1}+\sqrt{x}}\end{aligned}` },
          R`分母趋于 $+\infty$，所以极限为 $0$。`,
        ],
        pitfalls: [R`不能写成 $\infty-\infty=0$。这里结果恰好是 0，但 $\sqrt{x^2+x}-x$ 的结果就是 $\dfrac12$。`],
        verify: { type: 'limit', expr: 'sqrt(x+1)-sqrt(x)', var: 'x', to: 'oo', expected: '0' },
      },
    ],
  },
];

export const sequenceCards = [
  {
    id: 'calc.limits.seq-highest-power',
    name: { zh: '同除最高次项（数列）', ja: '最高次の項で割る（数列）', kana: 'さいこうじのこうでわる（すうれつ）' },
    knowledge: ['calc.limits.k.sequence', 'calc.limits.k.indeterminate'],
    formula: R`\lim_{n\to\infty}\frac{a_pn^p+\cdots+a_0}{b_qn^q+\cdots+b_0}=\begin{cases}\dfrac{a_p}{b_q}&(p=q)\\[6pt]0&(p<q)\\[4pt]\pm\infty&(p>q)\end{cases}`,
    conditions: [R`$\dfrac{\infty}{\infty}$ 型的分式，$a_p\neq0$，$b_q\neq0$。`],
    scenarios: [R`分子分母都是 $n$ 的多项式（或含 $\sqrt{n^2+\cdots}$ 这类根式）时。`],
    steps: [R`找出分母的最高次项 $n^q$。`, R`分子、分母同除以 $n^q$。`, R`利用 $\dfrac{1}{n^k}\to0\ (k>0)$ 求极限。`],
    pitfalls: [R`要除以**分母**的最高次项，才能保证分母极限非零。`],
    exercises: [
      {
        id: 'calc.limits.seq-highest-power.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{n\to\infty}\frac{3n^2-2n+1}{2n^2+5}$。`,
          ja: R`極限 $\displaystyle\lim_{n\to\infty}\frac{3n^2-2n+1}{2n^2+5}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{n\to\infty}\frac{3n^2-2n+1}{2n^2+5}$.`,
        },
        answer: R`\frac{3}{2}`,
        idea: R`$\dfrac{\infty}{\infty}$ 型，分子分母同除 $n^2$。`,
        solution: [
          { math: R`\lim_{n\to\infty}\frac{3n^2-2n+1}{2n^2+5}=\lim_{n\to\infty}\frac{3-\dfrac{2}{n}+\dfrac{1}{n^2}}{2+\dfrac{5}{n^2}}=\frac{3}{2}` },
        ],
        pitfalls: [R`只看最高次项系数之比即可，但写答案时要写出同除的过程。`],
        verify: { type: 'limit', expr: '(3*n**2-2*n+1)/(2*n**2+5)', var: 'n', to: 'oo', expected: '3/2' },
      },
    ],
  },

  {
    id: 'calc.limits.seq-rationalize',
    name: { zh: '根式有理化（数列）', ja: '分子の有理化（数列）', kana: 'ぶんしのゆうりか（すうれつ）' },
    knowledge: ['calc.limits.k.sequence', 'calc.limits.k.indeterminate'],
    formula: R`\sqrt{A}-\sqrt{B}=\frac{A-B}{\sqrt{A}+\sqrt{B}}`,
    conditions: [R`含 $\sqrt{\ \ }$ 的 $\infty-\infty$ 型或 $0\cdot\infty$ 型。`],
    scenarios: [R`看到 $\sqrt{n^2+an}-n$、$\sqrt{n+1}-\sqrt{n}$ 这类「两个几乎相等的大数相减」。`],
    steps: [R`分子分母同乘共轭式 $\sqrt{A}+\sqrt{B}$。`, R`分子化简为 $A-B$（根号消失）。`, R`再同除最高次项求极限。`],
    pitfalls: [R`$\sqrt{n^2+1}$ 除以 $n$ 得 $\sqrt{1+\dfrac{1}{n^2}}$，$n$ 进入根号要变成 $n^2$。`],
    exercises: [
      {
        id: 'calc.limits.seq-rationalize.ex1',
        difficulty: '中',
        question: {
          zh: R`求极限 $\displaystyle\lim_{n\to\infty}n\left(\sqrt{n^2+1}-n\right)$。`,
          ja: R`極限 $\displaystyle\lim_{n\to\infty}n\left(\sqrt{n^2+1}-n\right)$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{n\to\infty}n\left(\sqrt{n^2+1}-n\right)$.`,
        },
        answer: R`\frac{1}{2}`,
        idea: R`$\infty\cdot0$ 型，括号内有理化后变成分式，再同除 $n$。`,
        solution: [
          { math: R`\begin{aligned}&n\left(\sqrt{n^2+1}-n\right)\\[2pt]&\quad=\frac{n\left\{(n^2+1)-n^2\right\}}{\sqrt{n^2+1}+n}=\frac{n}{\sqrt{n^2+1}+n}\\[4pt]&\quad=\frac{1}{\sqrt{1+\dfrac{1}{n^2}}+1}\end{aligned}` },
          R`$n\to\infty$ 时分母趋于 $1+1=2$，所以极限为 $\dfrac{1}{2}$。`,
        ],
        pitfalls: [R`有理化后分子只剩 $n\cdot1$，不要漏掉前面的因子 $n$。`],
        verify: { type: 'limit', expr: 'n*(sqrt(n**2+1)-n)', var: 'n', to: 'oo', expected: '1/2' },
      },
    ],
  },

  {
    id: 'calc.limits.seq-squeeze',
    name: { zh: '夹逼定理（数列）', ja: 'はさみうちの原理（数列）', kana: 'はさみうちのげんり（すうれつ）' },
    knowledge: ['calc.limits.k.sequence'],
    formula: R`\begin{gathered}a_n\le c_n\le b_n,\quad\lim_{n\to\infty}a_n=\lim_{n\to\infty}b_n=\alpha\\\Longrightarrow\ \lim_{n\to\infty}c_n=\alpha\end{gathered}`,
    conditions: [R`不等式只需在 $n$ 充分大时成立。`, R`两边的极限必须**相同**。`],
    scenarios: [
      R`含 $\sin n$、$\cos n$、$(-1)^n$ 等有界但不收敛的因子。`,
      R`$\sqrt[n]{a^n+b^n}$ 这类「最大项决定结果」的式子。`,
    ],
    steps: [R`找出 $c_n$ 的上下界（常用 $|\sin n|\le1$、最大项估计）。`, R`分别求上下界的极限。`, R`两者相等时得出结论。`],
    pitfalls: [R`上下界的极限不相等时，夹逼定理不能得出任何结论。`],
    exercises: [
      {
        id: 'calc.limits.seq-squeeze.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{n\to\infty}\frac{\sin n}{n}$。`,
          ja: R`極限 $\displaystyle\lim_{n\to\infty}\frac{\sin n}{n}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{n\to\infty}\frac{\sin n}{n}$.`,
        },
        answer: R`0`,
        idea: R`$\sin n$ 不收敛但有界，用 $|\sin n|\le1$ 夹住。`,
        solution: [
          { math: R`-\frac{1}{n}\le\frac{\sin n}{n}\le\frac{1}{n}` },
          R`两边都趋于 $0$，由夹逼定理，极限为 $0$。`,
        ],
        pitfalls: [R`不能写 $\lim\sin n$，它不存在。`],
        verify: { type: 'limit', expr: 'sin(n)/n', var: 'n', to: 'oo', expected: '0' },
      },
      {
        id: 'calc.limits.seq-squeeze.ex2',
        difficulty: '中',
        question: {
          zh: R`求极限 $\displaystyle\lim_{n\to\infty}\left(2^n+3^n\right)^{\frac{1}{n}}$。`,
          ja: R`極限 $\displaystyle\lim_{n\to\infty}\left(2^n+3^n\right)^{\frac{1}{n}}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{n\to\infty}\left(2^n+3^n\right)^{\frac{1}{n}}$.`,
        },
        answer: R`3`,
        idea: R`括号内由最大项 $3^n$ 主导，用 $3^n\le2^n+3^n\le2\cdot3^n$ 夹住。`,
        solution: [
          { math: R`\begin{gathered}3^n\le2^n+3^n\le2\cdot3^n\\\Longrightarrow\ 3\le\left(2^n+3^n\right)^{\frac1n}\le2^{\frac1n}\cdot3\end{gathered}` },
          R`$n\to\infty$ 时 $2^{\frac1n}\to1$，所以右边趋于 $3$。左右都趋于 $3$，极限为 $3$。`,
        ],
        pitfalls: [R`一般地 $\displaystyle\lim_{n\to\infty}\left(a^n+b^n\right)^{\frac1n}=\max(a,b)$（$a,b>0$），可用来检查答案。`],
        verify: { type: 'limit', expr: '(2**n+3**n)**(1/n)', var: 'n', to: 'oo', expected: '3' },
      },
    ],
  },

  {
    id: 'calc.limits.seq-monotone',
    name: { zh: '单调有界原理', ja: '単調有界数列の収束', kana: 'たんちょうゆうかいすうれつのしゅうそく' },
    knowledge: ['calc.limits.k.sequence'],
    formula: R`\begin{gathered}a_1\le a_2\le\cdots\le a_n\le\cdots\le M\\\Longrightarrow\ \lim_{n\to\infty}a_n\ \text{存在}\end{gathered}`,
    conditions: [R`单调增加且有上界（或单调减少且有下界）。`],
    scenarios: [R`由递推式 $a_{n+1}=f(a_n)$ 给出、无法求出通项的数列。`],
    steps: [
      R`用归纳法或作差证明有界。`,
      R`作差 $a_{n+1}-a_n$（或作商）证明单调。`,
      R`得知极限 $\alpha$ 存在后，对递推式两边取极限：$\alpha=f(\alpha)$，解出 $\alpha$。`,
      R`根据有界性的范围选出正确的根。`,
    ],
    pitfalls: [R`必须先证明极限存在，才能对递推式两边取极限。`, R`解 $\alpha=f(\alpha)$ 可能有多个根，要用范围排除。`],
    exercises: [
      {
        id: 'calc.limits.seq-monotone.ex1',
        difficulty: '中',
        question: {
          zh: R`数列由 $a_1=1$，$a_{n+1}=\dfrac{a_n}{2}+\dfrac{1}{a_n}$ 定义。证明 $\{a_n\}$ 收敛，并求其极限。`,
          ja: R`数列 $\{a_n\}$ を $a_1=1$，$a_{n+1}=\dfrac{a_n}{2}+\dfrac{1}{a_n}$ で定める。$\{a_n\}$ が収束することを示し，その極限を求めよ。`,
          en: R`Define $a_1=1$ and $a_{n+1}=\dfrac{a_n}{2}+\dfrac{1}{a_n}$. Show that $\{a_n\}$ converges and find its limit.`,
        },
        answer: R`\lim_{n\to\infty}a_n=\sqrt{2}`,
        idea: R`$n\ge2$ 起数列有下界 $\sqrt2$ 且单调减少，由单调有界原理收敛。`,
        solution: [
          R`显然 $a_n>0$。由相加相乘平均不等式（相加平均≥相乘平均），当 $n\ge1$：`,
          { math: R`a_{n+1}=\frac{a_n}{2}+\frac{1}{a_n}\ge2\sqrt{\frac{a_n}{2}\cdot\frac{1}{a_n}}=\sqrt{2}` },
          R`所以 $n\ge2$ 时 $a_n\ge\sqrt2$，即 $a_n^2\ge2$。再作差：`,
          { math: R`a_{n+1}-a_n=\frac{1}{a_n}-\frac{a_n}{2}=\frac{2-a_n^2}{2a_n}\le0\quad(n\ge2)` },
          R`故 $\{a_n\}_{n\ge2}$ 单调减少且有下界 $\sqrt2$，极限 $\alpha$ 存在且 $\alpha\ge\sqrt2$。对递推式两边取极限：`,
          { math: R`\alpha=\frac{\alpha}{2}+\frac{1}{\alpha}\ \Longrightarrow\ \alpha^2=2\ \Longrightarrow\ \alpha=\sqrt2` },
        ],
        pitfalls: [R`$a_1=1<\sqrt2$，单调性要从 $n\ge2$ 开始说。`, R`$\alpha=-\sqrt2$ 因 $\alpha\ge\sqrt2$ 而舍去。`],
        verify: { type: 'recurrence', a1: '1', next: 'a/2+1/a', expected: 'sqrt(2)' },
      },
    ],
  },

  {
    id: 'calc.limits.seq-e',
    name: { zh: '重要极限：e 的定义', ja: 'ネイピア数 e の定義', kana: 'ネイピアすう e のていぎ' },
    knowledge: ['calc.limits.k.sequence', 'calc.limits.k.indeterminate'],
    formula: [R`\lim_{n\to\infty}\left(1+\frac{1}{n}\right)^{n}=e`, R`\lim_{n\to\infty}\left(1+\frac{a}{n}\right)^{n}=e^{a}`],
    conditions: [R`$1^{\infty}$ 型：底趋于 $1$，指数趋于 $\infty$。`],
    scenarios: [R`形如 $\left(1+\dfrac{a}{n}\right)^{bn}$ 的数列。`],
    steps: [R`把底整理成 $1+\dfrac{a}{n}$ 的形式。`, R`凑出指数 $\dfrac{n}{a}$：$\left(1+\dfrac{a}{n}\right)^{bn}=\left\{\left(1+\dfrac{a}{n}\right)^{\frac{n}{a}}\right\}^{ab}$。`, R`内层趋于 $e$，结果为 $e^{ab}$。`],
    pitfalls: [R`不能先求底的极限得 $1^{\infty}=1$。`],
    exercises: [
      {
        id: 'calc.limits.seq-e.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{n\to\infty}\left(1+\frac{2}{n}\right)^{3n}$。`,
          ja: R`極限 $\displaystyle\lim_{n\to\infty}\left(1+\frac{2}{n}\right)^{3n}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{n\to\infty}\left(1+\frac{2}{n}\right)^{3n}$.`,
        },
        answer: R`e^{6}`,
        idea: R`$1^{\infty}$ 型，凑成 $\left(1+\dfrac{2}{n}\right)^{\frac{n}{2}}$。`,
        solution: [
          { math: R`\left(1+\frac{2}{n}\right)^{3n}=\left\{\left(1+\frac{2}{n}\right)^{\frac{n}{2}}\right\}^{6}\ \longrightarrow\ e^{6}` },
        ],
        pitfalls: [R`指数是 $3n=\dfrac{n}{2}\cdot6$，不是 $\dfrac{n}{2}\cdot3$。`],
        verify: { type: 'limit', expr: '(1+2/n)**(3*n)', var: 'n', to: 'oo', expected: 'exp(6)' },
      },
    ],
  },

  {
    id: 'calc.limits.seq-geometric',
    name: { zh: '等比数列 rⁿ 的极限', ja: '等比数列の極限', kana: 'とうひすうれつのきょくげん' },
    knowledge: ['calc.limits.k.sequence'],
    formula: R`\lim_{n\to\infty}r^n=\begin{cases}\infty&(r>1)\\1&(r=1)\\0&(|r|<1)\\\text{振动（不存在）}&(r\le-1)\end{cases}`,
    conditions: [R`底 $r$ 是常数。`],
    scenarios: [R`分子分母含多个 $a^n$ 的分式：同除**绝对值最大**的底的 $n$ 次方。`],
    steps: [R`找出绝对值最大的底 $|r|$。`, R`分子分母同除 $r^n$。`, R`其余各项化为 $\left(\dfrac{s}{r}\right)^n\to0$。`],
    pitfalls: [R`$r=-1$ 时 $(-1)^n$ 振动，极限不存在。`, R`题目含参数 $r$ 时，要按 $|r|<1$、$r=1$、$|r|>1$、$r=-1$ 分情况讨论。`],
    exercises: [
      {
        id: 'calc.limits.seq-geometric.ex1',
        difficulty: '易',
        question: {
          zh: R`求极限 $\displaystyle\lim_{n\to\infty}\frac{3^{n+1}+2^n}{3^n-2^n}$。`,
          ja: R`極限 $\displaystyle\lim_{n\to\infty}\frac{3^{n+1}+2^n}{3^n-2^n}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{n\to\infty}\frac{3^{n+1}+2^n}{3^n-2^n}$.`,
        },
        answer: R`3`,
        idea: R`最大的底是 $3$，分子分母同除 $3^n$。`,
        solution: [
          { math: R`\frac{3^{n+1}+2^n}{3^n-2^n}=\frac{3+\left(\dfrac{2}{3}\right)^n}{1-\left(\dfrac{2}{3}\right)^n}\ \longrightarrow\ \frac{3+0}{1-0}=3` },
        ],
        pitfalls: [R`$3^{n+1}\div3^n=3$，不是 $1$。`],
        verify: { type: 'limit', expr: '(3**(n+1)+2**n)/(3**n-2**n)', var: 'n', to: 'oo', expected: '3' },
      },
    ],
  },

  {
    id: 'calc.limits.seq-recurrence',
    name: { zh: '递推数列的极限', ja: '漸化式で定まる数列の極限', kana: 'ぜんかしきでさだまるすうれつのきょくげん' },
    knowledge: ['calc.limits.k.sequence'],
    formula: R`\begin{gathered}a_{n+1}=pa_n+q\ (p\neq1),\quad\alpha=\frac{q}{1-p}\\a_n-\alpha=p^{\,n-1}(a_1-\alpha)\end{gathered}`,
    conditions: [R`一次型：$|p|<1$ 时 $\displaystyle\lim_{n\to\infty}a_n=\alpha$。`, R`非一次型（如 $a_{n+1}=\sqrt{a_n+c}$）：先证有界单调，再解 $\alpha=f(\alpha)$。`],
    scenarios: [R`题目只给出首项和递推式。`],
    steps: [R`求不动点 $\alpha$：解 $\alpha=f(\alpha)$。`, R`一次型：两式相减得 $a_{n+1}-\alpha=p(a_n-\alpha)$，写出通项再求极限。`, R`非一次型：用单调有界原理，或估计 $|a_{n+1}-\alpha|\le k|a_n-\alpha|\ (0<k<1)$。`],
    pitfalls: [R`不动点只是「候选」，必须说明数列确实收敛。`],
    exercises: [
      {
        id: 'calc.limits.seq-recurrence.ex1',
        difficulty: '易',
        question: {
          zh: R`数列由 $a_1=1$，$a_{n+1}=\dfrac{1}{2}a_n+3$ 定义。求通项 $a_n$ 及 $\displaystyle\lim_{n\to\infty}a_n$。`,
          ja: R`数列 $\{a_n\}$ を $a_1=1$，$a_{n+1}=\dfrac{1}{2}a_n+3$ で定める。一般項 $a_n$ と $\displaystyle\lim_{n\to\infty}a_n$ を求めよ。`,
          en: R`Let $a_1=1$ and $a_{n+1}=\dfrac{1}{2}a_n+3$. Find the general term $a_n$ and $\displaystyle\lim_{n\to\infty}a_n$.`,
        },
        answer: R`a_n=6-5\left(\frac{1}{2}\right)^{n-1},\qquad\lim_{n\to\infty}a_n=6`,
        idea: R`一次型递推，先求不动点 $\alpha=6$，再写成等比数列。`,
        solution: [
          R`解 $\alpha=\dfrac12\alpha+3$ 得 $\alpha=6$。两式相减：`,
          { math: R`a_{n+1}-6=\frac{1}{2}\left(a_n-6\right)` },
          R`所以 $\{a_n-6\}$ 是首项 $a_1-6=-5$、公比 $\dfrac12$ 的等比数列：`,
          { math: R`a_n=6-5\left(\frac{1}{2}\right)^{n-1}\ \longrightarrow\ 6\quad(n\to\infty)` },
        ],
        pitfalls: [R`首项是 $a_1-\alpha=-5$，指数是 $n-1$ 不是 $n$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'recurrence', a1: '1', next: 'a/2+3', expected: '6' },
            { type: 'sequence', formula: '6-5*(1/2)**(k-1)', a1: '1', next: 'a/2+3', terms: 8 },
          ],
        },
      },
      {
        id: 'calc.limits.seq-recurrence.ex2',
        difficulty: '中',
        question: {
          zh: R`数列由 $a_1=1$，$a_{n+1}=\sqrt{a_n+6}$ 定义。求 $\displaystyle\lim_{n\to\infty}a_n$。`,
          ja: R`数列 $\{a_n\}$ を $a_1=1$，$a_{n+1}=\sqrt{a_n+6}$ で定める。$\displaystyle\lim_{n\to\infty}a_n$ を求めよ。`,
          en: R`Let $a_1=1$ and $a_{n+1}=\sqrt{a_n+6}$. Find $\displaystyle\lim_{n\to\infty}a_n$.`,
        },
        answer: R`3`,
        idea: R`不动点为 $3$。估计 $|a_{n+1}-3|$ 与 $|a_n-3|$ 的关系，证明收敛。`,
        solution: [
          R`解 $\alpha=\sqrt{\alpha+6}$：$\alpha^2-\alpha-6=0$，$\alpha\ge0$，所以 $\alpha=3$。由 $a_n>0$：`,
          { math: R`\begin{aligned}\left|a_{n+1}-3\right|&=\left|\sqrt{a_n+6}-3\right|=\frac{|a_n-3|}{\sqrt{a_n+6}+3}\\[4pt]&\le\frac{1}{3}\left|a_n-3\right|\end{aligned}` },
          R`反复使用得 $|a_n-3|\le\left(\dfrac13\right)^{n-1}|a_1-3|=2\left(\dfrac13\right)^{n-1}\to0$，所以：`,
          { math: R`\lim_{n\to\infty}a_n=3` },
        ],
        pitfalls: [R`有理化后分母 $\sqrt{a_n+6}+3\ge3$，这一步是收缩比 $\dfrac13$ 的来源。`],
        verify: { type: 'recurrence', a1: '1', next: 'sqrt(a+6)', expected: '3' },
      },
    ],
  },
];
