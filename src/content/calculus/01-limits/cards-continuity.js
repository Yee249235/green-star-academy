// 第 1 章 —— 连续性
const R = String.raw;

export const continuityCards = [
  {
    id: 'calc.limits.continuity-check',
    name: { zh: '连续性的判定', ja: '連続性の判定', kana: 'れんぞくせいのはんてい' },
    knowledge: ['calc.limits.k.continuity'],
    formula: R`f\ \text{在}\ x=a\ \text{连续}\iff\lim_{x\to a}f(x)=f(a)`,
    conditions: [R`三件事都要满足：$f(a)$ 有定义；$\displaystyle\lim_{x\to a}f(x)$ 存在；二者相等。`],
    scenarios: [R`分段函数在分界点处是否连续；求使函数连续的参数。`],
    steps: [R`求 $f(a)$。`, R`求 $\displaystyle\lim_{x\to a}f(x)$（必要时分左右）。`, R`比较二者，求参数或下结论。`],
    pitfalls: [R`极限存在但不等于 $f(a)$，仍然不连续（可去间断点）。`],
    exercises: [
      {
        id: 'calc.limits.continuity-check.ex1',
        difficulty: '易',
        question: {
          zh: R`设 $f(x)=\begin{cases}\dfrac{\sin x}{x}&(x\neq0)\\a&(x=0)\end{cases}$。求使 $f$ 在 $x=0$ 连续的 $a$。`,
          ja: R`$f(x)=\begin{cases}\dfrac{\sin x}{x}&(x\neq0)\\a&(x=0)\end{cases}$ とする。$f$ が $x=0$ で連続となるような $a$ を求めよ。`,
          en: R`Let $f(x)=\begin{cases}\dfrac{\sin x}{x}&(x\neq0)\\a&(x=0)\end{cases}$. Find $a$ such that $f$ is continuous at $x=0$.`,
        },
        answer: R`a=1`,
        idea: R`连续要求 $\displaystyle\lim_{x\to0}f(x)=f(0)=a$。`,
        solution: [
          { math: R`\lim_{x\to0}f(x)=\lim_{x\to0}\frac{\sin x}{x}=1` },
          R`连续需要 $f(0)=a=1$。`,
        ],
        pitfalls: [R`$f(0)$ 由第二行给出，不能把 $x=0$ 代入第一行。`],
        verify: { type: 'limit', expr: 'sin(x)/x', var: 'x', to: '0', expected: '1' },
      },
    ],
  },

  {
    id: 'calc.limits.ivt',
    name: { zh: '中间值定理', ja: '中間値の定理', kana: 'ちゅうかんちのていり' },
    knowledge: ['calc.limits.k.continuity'],
    formula: R`\begin{gathered}f\ \text{在}\ [a,b]\ \text{连续},\quad f(a)f(b)<0\\\Longrightarrow\ \exists\,c\in(a,b),\ f(c)=0\end{gathered}`,
    conditions: [R`在**闭区间**上连续。`, R`端点函数值异号。`],
    scenarios: [R`证明方程在某区间内有实数解。`],
    steps: [R`设 $f(x)=$（左边）$-$（右边）。`, R`说明 $f$ 在 $[a,b]$ 上连续。`, R`计算 $f(a)$、$f(b)$，确认异号。`, R`由中间值定理得出结论。`],
    pitfalls: [R`定理只保证「至少一个」解；要证唯一还需单调性。`],
    exercises: [
      {
        id: 'calc.limits.ivt.ex1',
        difficulty: '易',
        question: {
          zh: R`证明方程 $x^3+x-1=0$ 在区间 $(0,1)$ 内至少有一个实数解。`,
          ja: R`方程式 $x^3+x-1=0$ は区間 $(0,1)$ に少なくとも 1 つの実数解をもつことを示せ。`,
          en: R`Show that the equation $x^3+x-1=0$ has at least one real root in $(0,1)$.`,
        },
        answerText: R`$f(x)=x^3+x-1$ 在 $[0,1]$ 上连续，$f(0)=-1<0$，$f(1)=1>0$，由中间值定理，存在 $c\in(0,1)$ 使 $f(c)=0$。`,
        idea: R`多项式连续，只需检查端点符号。`,
        solution: [
          R`设 $f(x)=x^3+x-1$，它是多项式，在 $[0,1]$ 上连续。`,
          { math: R`f(0)=-1<0,\qquad f(1)=1+1-1=1>0` },
          R`由中间值定理，存在 $c\in(0,1)$ 使 $f(c)=0$。另外 $f'(x)=3x^2+1>0$，$f$ 单调增加，所以这个解是唯一的。`,
        ],
        pitfalls: [R`答案里要写出「连续」这一条件，否则不能使用定理。`],
        verify: { type: 'ivt', f: 'x**3+x-1', a: '0', b: '1' },
      },
    ],
  },
];
