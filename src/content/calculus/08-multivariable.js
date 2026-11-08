// 第 8 章 多变量函数
const R = String.raw;

const K = {
  function2: {
    id: 'calc.multi.k.function',
    name: { zh: '二元函数与定义域', ja: '2 変数関数と定義域', kana: 'にへんすうかんすうとていぎいき' },
    paragraphs: [
      R`对平面区域 $D$ 中的每个点 $(x,y)$ 对应一个实数 $z=f(x,y)$，称为二元函数，$D$ 为**定义域**（定義域）。图像 $z=f(x,y)$ 一般是空间中的曲面。`,
      R`定义域由根号内 $\ge0$、分母 $\neq0$、$\log$ 的真数 $>0$ 等条件决定，常画成平面上的区域。`,
    ],
    definitions: [R`z=f(x,y),\qquad(x,y)\in D\subset\mathbb{R}^2`],
    conditions: [R`等高线 $f(x,y)=c$ 有助于理解曲面的形状。`],
    theorems: [],
    related: ['calc.multi.k.limit'],
  },
  limit: {
    id: 'calc.multi.k.limit',
    name: { zh: '二元函数的极限与连续', ja: '2 変数関数の極限と連続性', kana: 'にへんすうかんすうのきょくげんとれんぞくせい' },
    paragraphs: [
      R`$(x,y)$ 以**任何方式**接近 $(a,b)$ 时 $f(x,y)$ 都接近 $\alpha$，才称极限为 $\alpha$。一元函数只有左右两个方向，二元函数有无穷多条路径。`,
      R`若 $\displaystyle\lim_{(x,y)\to(a,b)}f(x,y)=f(a,b)$，称 $f$ 在 $(a,b)$ 连续。`,
    ],
    definitions: [R`\begin{gathered}\lim_{(x,y)\to(a,b)}f(x,y)=\alpha\\\iff\lim_{\rho\to0}|f(x,y)-\alpha|=0\\\left(\rho=\sqrt{(x-a)^2+(y-b)^2}\right)\end{gathered}`],
    conditions: [R`证明极限**不存在**：找两条路径得到不同的值。证明极限**存在**：用极坐标或不等式把 $|f-\alpha|$ 夹到 0。`],
    theorems: [R`极坐标 $x=r\cos\theta$，$y=r\sin\theta$：若 $|f-\alpha|\le g(r)$ 且 $g(r)\to0$（与 $\theta$ 无关），则极限为 $\alpha$。`],
    related: ['calc.limits.k.function', 'calc.multi.k.function'],
  },
};

const cards = [
  {
    id: 'calc.multi.domain',
    name: { zh: '二元函数的定义域', ja: '定義域の図示', kana: 'ていぎいきのずし' },
    knowledge: ['calc.multi.k.function'],
    formula: R`\begin{gathered}\sqrt{g}\ :\ g\ge0,\qquad\log g\ :\ g>0\\\frac1g\ :\ g\neq0\end{gathered}`,
    conditions: [R`各部分的条件同时成立（取交集）。`],
    scenarios: [R`「定義域を図示せよ」类题目。`],
    steps: [R`列出每个部分的条件。`, R`化成 $x,y$ 的不等式。`, R`在平面上画出交集，注明边界是否包含。`],
    pitfalls: [R`边界包含与否要写清楚：$\ge$ 用实线，$>$ 用虚线。`],
    exercises: [
      {
        id: 'calc.multi.domain.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $f(x,y)=\sqrt{1-x^2-y^2}+\log y$ 的定义域。`,
          ja: R`$f(x,y)=\sqrt{1-x^2-y^2}+\log y$ の定義域を求めよ。`,
          en: R`Find the domain of $f(x,y)=\sqrt{1-x^2-y^2}+\log y$.`,
        },
        answer: R`D=\left\{(x,y)\ \middle|\ x^2+y^2\le1,\ y>0\right\}`,
        idea: R`根号：$1-x^2-y^2\ge0$；对数：$y>0$。`,
        solution: [
          R`$1-x^2-y^2\ge0\iff x^2+y^2\le1$（单位圆盘，含圆周）；$y>0$（上半平面，不含 $x$ 轴）。`,
          R`定义域是单位圆盘的上半部分：圆弧包含，$x$ 轴上的直径不包含。`,
        ],
        pitfalls: [R`$y=0$ 的点使 $\log y$ 无定义，必须排除。`],
        verifyNote: '定义域由不等式直接得出，无数值计算。',
      },
    ],
  },
  {
    id: 'calc.multi.path',
    name: { zh: '路径法：判断极限不存在', ja: '近づき方による極限の非存在', kana: 'ちかづきかたによるきょくげんのひそんざい' },
    knowledge: ['calc.multi.k.limit'],
    formula: R`\begin{gathered}y=mx\ \text{上的极限依赖于}\ m\\\Longrightarrow\ \lim_{(x,y)\to(0,0)}f(x,y)\ \text{不存在}\end{gathered}`,
    conditions: [R`只要找到两条路径得到不同的值，就能证明不存在。`],
    scenarios: [R`分子分母次数相同的分式，如 $\dfrac{xy}{x^2+y^2}$、$\dfrac{x^2-y^2}{x^2+y^2}$。`],
    steps: [R`沿直线 $y=mx$ 代入，求一元极限。`, R`若结果含 $m$，取两个不同的 $m$ 即得矛盾。`, R`直线不够时，试 $y=mx^2$ 等曲线。`],
    pitfalls: [R`所有直线上极限相同，也不能说明极限存在（例：$\dfrac{x^2y}{x^4+y^2}$ 沿 $y=x^2$ 得 $\frac12$）。`],
    exercises: [
      {
        id: 'calc.multi.path.ex1',
        difficulty: '易',
        question: {
          zh: R`证明 $\displaystyle\lim_{(x,y)\to(0,0)}\frac{xy}{x^2+y^2}$ 不存在。`,
          ja: R`$\displaystyle\lim_{(x,y)\to(0,0)}\frac{xy}{x^2+y^2}$ が存在しないことを示せ。`,
          en: R`Show that $\displaystyle\lim_{(x,y)\to(0,0)}\frac{xy}{x^2+y^2}$ does not exist.`,
        },
        answerText: R`沿 $y=mx$ 时极限为 $\dfrac{m}{1+m^2}$，随 $m$ 改变（如 $m=0$ 得 $0$，$m=1$ 得 $\dfrac12$），所以极限不存在。`,
        idea: R`沿直线 $y=mx$ 代入。`,
        solution: [
          { math: R`\frac{x\cdot mx}{x^2+m^2x^2}=\frac{m}{1+m^2}\qquad(x\neq0)` },
          R`$m=0$（沿 $x$ 轴）得 $0$，$m=1$（沿 $y=x$）得 $\dfrac12$，两者不同，所以极限不存在。`,
        ],
        pitfalls: [R`结论要写出两条具体路径和对应的值。`],
        verify: { type: 'equal', lhs: 'simplify((x*y/(x**2+y**2)).subs(y, m*x))', rhs: 'm/(1+m**2)' },
      },
    ],
  },
  {
    id: 'calc.multi.polar',
    name: { zh: '极坐标法求二元极限', ja: '極座標による極限の計算', kana: 'きょくざひょうによるきょくげんのけいさん' },
    knowledge: ['calc.multi.k.limit'],
    formula: R`\begin{gathered}x=r\cos\theta,\quad y=r\sin\theta\\|f-\alpha|\le g(r)\to0\ \Longrightarrow\ \lim f=\alpha\end{gathered}`,
    conditions: [R`上界 $g(r)$ 不能依赖 $\theta$。`],
    scenarios: [R`分子次数高于分母次数的分式，如 $\dfrac{x^2y}{x^2+y^2}$、$\dfrac{x^3}{x^2+y^2}$。`],
    steps: [R`代入极坐标，分母 $x^2+y^2=r^2$。`, R`化简后用 $|\cos\theta|\le1$、$|\sin\theta|\le1$ 估计。`, R`令 $r\to0$。`],
    pitfalls: [R`化简结果若含 $\theta$ 且不趋于 0（如 $\cos\theta\sin\theta$），说明极限不存在。`],
    exercises: [
      {
        id: 'calc.multi.polar.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\lim_{(x,y)\to(0,0)}\frac{x^2y}{x^2+y^2}$。`,
          ja: R`$\displaystyle\lim_{(x,y)\to(0,0)}\frac{x^2y}{x^2+y^2}$ を求めよ。`,
          en: R`Find $\displaystyle\lim_{(x,y)\to(0,0)}\frac{x^2y}{x^2+y^2}$.`,
        },
        answer: R`0`,
        idea: R`极坐标代入后分母约去 $r^2$，剩下 $r\cos^2\theta\sin\theta$。`,
        solution: [
          { math: R`\begin{aligned}\left|\frac{x^2y}{x^2+y^2}\right|&=\left|\frac{r^3\cos^2\theta\sin\theta}{r^2}\right|\\&=r\left|\cos^2\theta\sin\theta\right|\le r\end{aligned}` },
          R`$r\to0$ 时上界 $r\to0$，所以极限为 $0$。`,
        ],
        pitfalls: [R`上界 $r$ 与 $\theta$ 无关，这一点必须写出。`],
        verify: { type: 'equal', lhs: 'simplify((x**2*y/(x**2+y**2)).subs(x, r*cos(theta)).subs(y, r*sin(theta)))', rhs: 'r*cos(theta)**2*sin(theta)' },
      },
    ],
  },
  {
    id: 'calc.multi.continuity',
    name: { zh: '二元函数连续性的判定', ja: '2 変数関数の連続性の判定', kana: 'にへんすうかんすうのれんぞくせいのはんてい' },
    knowledge: ['calc.multi.k.limit'],
    formula: R`\begin{gathered}f\ \text{在}\ (a,b)\ \text{连续}\\\iff\lim_{(x,y)\to(a,b)}f(x,y)=f(a,b)\end{gathered}`,
    conditions: [R`分段定义的函数在「特殊点」处要用极限的定义判断。`],
    scenarios: [R`$f(x,y)=\begin{cases}\cdots&(x,y)\neq(0,0)\\0&(x,y)=(0,0)\end{cases}$ 型的题目。`],
    steps: [R`求 $(x,y)\to(0,0)$ 的极限（路径法或极坐标法）。`, R`与定义值 $f(0,0)$ 比较。`],
    pitfalls: [R`极限不存在或不等于定义值，都是不连续。`],
    exercises: [
      {
        id: 'calc.multi.continuity.ex1',
        difficulty: '中',
        question: {
          zh: R`设 $f(x,y)=\dfrac{xy}{\sqrt{x^2+y^2}}\ \bigl((x,y)\neq(0,0)\bigr)$，$f(0,0)=0$。判断 $f$ 在原点是否连续。`,
          ja: R`$f(x,y)=\dfrac{xy}{\sqrt{x^2+y^2}}\ \bigl((x,y)\neq(0,0)\bigr)$，$f(0,0)=0$ とする。$f$ は原点で連続か。`,
          en: R`Let $f(x,y)=\dfrac{xy}{\sqrt{x^2+y^2}}$ for $(x,y)\neq(0,0)$ and $f(0,0)=0$. Is $f$ continuous at the origin?`,
        },
        answerText: R`连续。$|f(x,y)|\le r\to0=f(0,0)$。`,
        idea: R`极坐标：$|f|=r|\cos\theta\sin\theta|\le r$。`,
        solution: [
          { math: R`\begin{aligned}|f(x,y)|&=\frac{r^2|\cos\theta\sin\theta|}{r}\\&=r\,|\cos\theta\sin\theta|\le r\ \longrightarrow\ 0\end{aligned}` },
          R`极限为 $0=f(0,0)$，所以 $f$ 在原点连续。`,
        ],
        pitfalls: [R`与 $\dfrac{xy}{x^2+y^2}$（不连续）比较：分母开方后次数降低，极限就存在了。`],
        verify: { type: 'equal', lhs: 'simplify((x*y/sqrt(x**2+y**2)).subs(x, r*cos(theta)).subs(y, r*sin(theta)))', rhs: 'r*cos(theta)*sin(theta)' },
      },
    ],
  },
];

export const multivariableChapter = {
  overview: '二元函数的定义域、二元极限（路径法判断不存在、极坐标法求极限）与连续性。偏导数从第 9 章开始。',
  sections: [
    { title: '二元函数', knowledge: [K.function2], formulas: cards.slice(0, 1) },
    { title: '极限与连续', knowledge: [K.limit], formulas: cards.slice(1) },
  ],
};
