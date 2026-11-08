// 第 5 章 微分法的应用
const R = String.raw;

const K = {
  monotone: {
    id: 'calc.apply.k.monotone',
    name: { zh: '单调性与导数', ja: '関数の増減と導関数', kana: 'かんすうのぞうげんとどうかんすう' },
    paragraphs: [
      R`在区间上 $f'(x)>0$ 则 $f$ 单调增加，$f'(x)<0$ 则单调减少。这是平均值定理的直接推论。`,
      R`把 $f'(x)$ 的符号变化整理成表格，称为**增减表**（増減表），是日本考试中分析函数的标准写法。`,
    ],
    definitions: [R`f'(x)>0\ \Rightarrow\ f\ \nearrow`, R`f'(x)<0\ \Rightarrow\ f\ \searrow`],
    conditions: [R`个别点上 $f'(x)=0$ 不影响单调性（如 $x^3$ 在 $\mathbb{R}$ 上单调增加）。`],
    theorems: [R`利用单调性可以证明不等式：设 $g=$（左边）$-$（右边），证明 $g$ 单调且端点处 $g\ge0$。`],
    related: ['calc.taylor.k.mean-value', 'calc.apply.k.extrema'],
  },
  extrema: {
    id: 'calc.apply.k.extrema',
    name: { zh: '极值', ja: '極値', kana: 'きょくち' },
    paragraphs: [
      R`在 $x=a$ 附近 $f(a)$ 最大，称 $f(a)$ 为**极大值**（極大値）；最小则为**极小值**（極小値）。极值是局部概念，不一定是整个定义域上的最大最小。`,
      R`可微函数在极值点一定有 $f'(a)=0$，但 $f'(a)=0$ 的点（停留点）不一定是极值点。`,
    ],
    definitions: [R`f\ \text{在}\ a\ \text{取极值且可微}\ \Longrightarrow\ f'(a)=0`],
    conditions: [R`不可微的点（如 $|x|$ 在 0）也可能是极值点，要单独检查。`],
    theorems: [
      R`一阶判别：$f'$ 在 $a$ 处由正变负 $\Rightarrow$ 极大；由负变正 $\Rightarrow$ 极小；不变号 $\Rightarrow$ 不是极值。`,
      R`二阶判别：$f'(a)=0$ 且 $f''(a)<0\Rightarrow$ 极大，$f''(a)>0\Rightarrow$ 极小，$f''(a)=0$ 时无法判断。`,
    ],
    related: ['calc.apply.k.monotone'],
  },
  concavity: {
    id: 'calc.apply.k.concavity',
    name: { zh: '凹凸与拐点', ja: '凹凸と変曲点', kana: 'おうとつとへんきょくてん' },
    paragraphs: [
      R`$f''(x)>0$ 的区间上曲线**下凸**（下に凸，图像像碗口朝上）；$f''(x)<0$ 的区间上**上凸**（上に凸）。`,
      R`凹凸改变的点称为**拐点**（変曲点）。`,
    ],
    definitions: [R`f''(x)>0\ \Rightarrow\ \text{下に凸}`, R`f''(x)<0\ \Rightarrow\ \text{上に凸}`],
    conditions: [R`拐点处 $f''(a)=0$（若存在），但 $f''(a)=0$ 不一定是拐点，必须确认 $f''$ 变号。`],
    theorems: [R`下凸的函数图像在切线上方。`],
    related: ['calc.apply.k.extrema'],
  },
  asymptote: {
    id: 'calc.apply.k.asymptote',
    name: { zh: '渐近线', ja: '漸近線', kana: 'ぜんきんせん' },
    paragraphs: [
      R`**竖直渐近线**：$\displaystyle\lim_{x\to a\pm0}f(x)=\pm\infty$ 时，直线 $x=a$。`,
      R`**斜渐近线**（含水平渐近线）：$x\to\pm\infty$ 时 $f(x)-(ax+b)\to0$，直线 $y=ax+b$。`,
    ],
    definitions: [R`a=\lim_{x\to\infty}\frac{f(x)}{x},\qquad b=\lim_{x\to\infty}\bigl(f(x)-ax\bigr)`],
    conditions: [R`$x\to+\infty$ 与 $x\to-\infty$ 要分别检查，两边的渐近线可能不同。`],
    theorems: [R`有理函数：做多项式除法 $f(x)=($商$)+\dfrac{\text{余式}}{\text{除式}}$，商就是斜渐近线。`],
    related: ['calc.limits.k.function'],
  },
};

const cards = [
  {
    id: 'calc.apply.tangent-normal',
    name: { zh: '切线与法线', ja: '接線と法線', kana: 'せっせんとほうせん' },
    knowledge: ['calc.deriv.k.definition'],
    formula: [R`\text{切线：}\ y-f(a)=f'(a)(x-a)`, R`\text{法线：}\ y-f(a)=-\frac{1}{f'(a)}(x-a)`],
    conditions: [R`法线公式要求 $f'(a)\neq0$；$f'(a)=0$ 时法线是 $x=a$。`],
    scenarios: [R`求曲线上某点的切线、法线；求过曲线外一点的切线（设切点）。`],
    steps: [R`求切点坐标 $(a,f(a))$。`, R`求斜率 $f'(a)$。`, R`代入点斜式。`],
    pitfalls: [R`过曲线外一点作切线时，切点未知，要先设切点 $(t,f(t))$ 再解方程。`],
    exercises: [
      {
        id: 'calc.apply.tangent-normal.ex1',
        difficulty: '易',
        question: {
          zh: R`求曲线 $y=x^3-2x$ 在 $x=1$ 处的切线和法线方程。`,
          ja: R`曲線 $y=x^3-2x$ 上の $x=1$ における接線と法線の方程式を求めよ。`,
          en: R`Find the tangent and normal lines to $y=x^3-2x$ at $x=1$.`,
        },
        answer: R`\text{切线：}y=x-2,\qquad\text{法线：}y=-x`,
        idea: R`切点 $(1,-1)$，斜率 $y'(1)=1$。`,
        solution: [
          { math: R`y(1)=1-2=-1` },
          { math: R`y'=3x^2-2,\qquad y'(1)=1` },
          { math: R`\text{切线：}y+1=1\cdot(x-1)\ \Longrightarrow\ y=x-2` },
          { math: R`\text{法线：}y+1=-1\cdot(x-1)\ \Longrightarrow\ y=-x` },
        ],
        pitfalls: [R`法线斜率是 $-\dfrac{1}{f'(a)}$，与切线垂直。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'diff(x**3-2*x, x).subs(x, 1)', rhs: '1' },
            { type: 'equal', lhs: '(x**3-2*x).subs(x, 1)', rhs: '1-2' },
          ],
        },
      },
    ],
  },
  {
    id: 'calc.apply.increase-decrease',
    name: { zh: '增减表（单调区间）', ja: '増減表', kana: 'ぞうげんひょう' },
    knowledge: ['calc.apply.k.monotone'],
    formula: R`f'(x)>0\ \Rightarrow\ \nearrow\qquad f'(x)<0\ \Rightarrow\ \searrow`,
    conditions: [R`在定义域内讨论；注意定义域的端点和不可微点。`],
    scenarios: [R`求单调区间；画图像；求极值的准备工作。`],
    steps: [R`求 $f'(x)$ 并因式分解。`, R`求 $f'(x)=0$ 的点，把定义域分段。`, R`判断每段 $f'(x)$ 的符号，填增减表。`],
    pitfalls: [R`因式分解要彻底，正的因子（如 $e^x$、$x^2+1$）可以直接判正。`],
    exercises: [
      {
        id: 'calc.apply.increase-decrease.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $f(x)=x^3-3x^2-9x+2$ 的单调区间。`,
          ja: R`$f(x)=x^3-3x^2-9x+2$ の増減を調べよ。`,
          en: R`Determine where $f(x)=x^3-3x^2-9x+2$ is increasing or decreasing.`,
        },
        answer: R`\begin{gathered}x<-1,\ x>3\ \text{时单调增加}\\-1<x<3\ \text{时单调减少}\end{gathered}`,
        idea: R`$f'(x)=3(x+1)(x-3)$。`,
        solution: [
          { math: R`f'(x)=3x^2-6x-9=3(x+1)(x-3)` },
          R`增减表：$x<-1$ 时 $f'>0$（↗）；$-1<x<3$ 时 $f'<0$（↘）；$x>3$ 时 $f'>0$（↗）。`,
        ],
        pitfalls: [R`区间端点 $-1$、$3$ 处 $f'=0$，写成闭区间也可以，但不要把整段写反。`],
        verify: { type: 'equal', lhs: 'factor(diff(x**3-3*x**2-9*x+2, x))', rhs: '3*(x+1)*(x-3)' },
      },
    ],
  },
  {
    id: 'calc.apply.extrema-first',
    name: { zh: '极值：一阶导数判别', ja: '極値の判定（第 1 次導関数）', kana: 'きょくちのはんてい（だいいちじどうかんすう）' },
    knowledge: ['calc.apply.k.extrema'],
    formula: R`\begin{gathered}f'\ \text{在}\ a\ \text{处}\ +\to-\ \Rightarrow\ \text{极大}\\f'\ \text{在}\ a\ \text{处}\ -\to+\ \Rightarrow\ \text{极小}\end{gathered}`,
    conditions: [R`$f$ 在 $a$ 处连续。`],
    scenarios: [R`所有求极值的题目都可以用，最可靠。`],
    steps: [R`求停留点（$f'=0$）和不可微点。`, R`在增减表中看 $f'$ 的符号是否改变。`, R`代入求极值。`],
    pitfalls: [R`$f'$ 不变号的停留点不是极值点（如 $x^3$ 在 0）。`],
    exercises: [
      {
        id: 'calc.apply.extrema-first.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $f(x)=xe^{-x}$ 的极值。`,
          ja: R`$f(x)=xe^{-x}$ の極値を求めよ。`,
          en: R`Find the local extrema of $f(x)=xe^{-x}$.`,
        },
        answer: R`x=1\ \text{时取极大值}\ \frac{1}{e}\ \text{（无极小值）}`,
        idea: R`$f'(x)=(1-x)e^{-x}$，$e^{-x}>0$，符号由 $1-x$ 决定。`,
        solution: [
          { math: R`f'(x)=e^{-x}-xe^{-x}=(1-x)e^{-x}` },
          R`$x<1$ 时 $f'>0$，$x>1$ 时 $f'<0$，所以 $x=1$ 处由增变减，取极大值 $f(1)=e^{-1}=\dfrac1e$。`,
        ],
        pitfalls: [R`$(e^{-x})'=-e^{-x}$，积的法则中注意这个负号。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'solve(diff(x*exp(-x), x), x)', rhs: '[1]' },
            { type: 'equal', lhs: '(x*exp(-x)).subs(x, 1)', rhs: 'exp(-1)' },
          ],
        },
      },
    ],
  },
  {
    id: 'calc.apply.extrema-second',
    name: { zh: '极值：二阶导数判别', ja: '極値の判定（第 2 次導関数）', kana: 'きょくちのはんてい（だいにじどうかんすう）' },
    knowledge: ['calc.apply.k.extrema'],
    formula: R`f'(a)=0\ \text{且}\ \begin{cases}f''(a)<0\ \Rightarrow\ \text{极大}\\f''(a)>0\ \Rightarrow\ \text{极小}\\f''(a)=0\ \Rightarrow\ \text{不能判定}\end{cases}`,
    conditions: [R`$f$ 在 $a$ 附近二次可微。`],
    scenarios: [R`停留点较多、增减表不好画时，逐个代入 $f''$ 判断。`],
    steps: [R`求停留点 $f'(a)=0$。`, R`计算 $f''(a)$ 的符号。`, R`$f''(a)=0$ 时回到一阶判别法（看 $f'$ 是否变号）。`],
    pitfalls: [R`$f''(a)=0$ 不代表「不是极值」，例如 $x^4$ 在 0 处 $f''=0$，却是极小。`],
    exercises: [
      {
        id: 'calc.apply.extrema-second.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $f(x)=x^4-4x^3$ 的极值。`,
          ja: R`$f(x)=x^4-4x^3$ の極値を求めよ。`,
          en: R`Find the local extrema of $f(x)=x^4-4x^3$.`,
        },
        answer: R`\begin{gathered}x=3\ \text{时极小值}\ -27\\x=0\ \text{不是极值点}\end{gathered}`,
        idea: R`停留点 $x=0,3$；$x=3$ 用 $f''$ 判定，$x=0$ 时 $f''=0$ 要看 $f'$ 的符号。`,
        solution: [
          { math: R`f'(x)=4x^3-12x^2=4x^2(x-3)` },
          { math: R`f''(x)=12x^2-24x` },
          R`$x=3$：$f''(3)=108-72=36>0$，极小值 $f(3)=81-108=-27$。`,
          R`$x=0$：$f''(0)=0$，不能判定。看 $f'=4x^2(x-3)$：在 $0$ 的两侧都为负（$x^2\ge0$，$x-3<0$），不变号，所以 $x=0$ 不是极值点。`,
        ],
        pitfalls: [R`二阶判别失效时一定要回到一阶判别，不能直接下结论。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'diff(x**4-4*x**3, x, 2).subs(x, 3)', rhs: '36' },
            { type: 'equal', lhs: '(x**4-4*x**3).subs(x, 3)', rhs: '-27' },
            { type: 'equal', lhs: 'factor(diff(x**4-4*x**3, x))', rhs: '4*x**2*(x-3)' },
          ],
        },
      },
    ],
  },
  {
    id: 'calc.apply.max-min',
    name: { zh: '闭区间上的最大值与最小值', ja: '閉区間における最大・最小', kana: 'へいくかんにおけるさいだい・さいしょう' },
    knowledge: ['calc.apply.k.extrema', 'calc.limits.k.continuity'],
    formula: R`\max_{[a,b]}f=\max\bigl\{f(\text{停留点}),\ f(a),\ f(b)\bigr\}`,
    conditions: [R`$f$ 在闭区间 $[a,b]$ 上连续（最大最小值一定存在）。`],
    scenarios: [R`给定区间求最大最小值；应用题（面积、体积最大）。`],
    steps: [R`求区间内的停留点和不可微点。`, R`计算这些点和两端点的函数值。`, R`比较大小。`],
    pitfalls: [R`端点值常常是最大或最小，不能只看极值。`],
    exercises: [
      {
        id: 'calc.apply.max-min.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $f(x)=x^3-3x$ 在区间 $-2\le x\le3$ 上的最大值与最小值。`,
          ja: R`$f(x)=x^3-3x$ の $-2\le x\le3$ における最大値と最小値を求めよ。`,
          en: R`Find the maximum and minimum of $f(x)=x^3-3x$ on $-2\le x\le3$.`,
        },
        answer: R`\begin{gathered}\text{最大值}\ 18\ (x=3)\\\text{最小值}\ -2\ (x=-2,\ 1)\end{gathered}`,
        idea: R`停留点 $x=\pm1$，再加上两个端点。`,
        solution: [
          { math: R`f'(x)=3x^2-3=3(x-1)(x+1)` },
          { math: R`f(-2)=-2,\qquad f(-1)=2` },
          { math: R`f(1)=-2,\qquad f(3)=18` },
          R`比较得最大值 $18$（$x=3$），最小值 $-2$（$x=-2$ 与 $x=1$）。`,
        ],
        pitfalls: [R`最大值出现在端点 $x=3$，而不是极大值点 $x=-1$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: '(x**3-3*x).subs(x, -2)', rhs: '-2' },
            { type: 'equal', lhs: '(x**3-3*x).subs(x, -1)', rhs: '2' },
            { type: 'equal', lhs: '(x**3-3*x).subs(x, 1)', rhs: '-2' },
            { type: 'equal', lhs: '(x**3-3*x).subs(x, 3)', rhs: '18' },
            { type: 'equal', lhs: 'solve(diff(x**3-3*x, x), x)', rhs: '[-1, 1]' },
          ],
        },
      },
    ],
  },
  {
    id: 'calc.apply.concavity',
    name: { zh: '凹凸与拐点的判定', ja: '凹凸と変曲点の判定', kana: 'おうとつとへんきょくてんのはんてい' },
    knowledge: ['calc.apply.k.concavity'],
    formula: [R`f''(x)>0\ \Rightarrow\ \text{下に凸}`, R`f''(x)<0\ \Rightarrow\ \text{上に凸}`],
    conditions: [R`$f$ 二次可微。`],
    scenarios: [R`画图像时确定弯曲方向；求拐点。`],
    steps: [R`求 $f''(x)$ 并因式分解。`, R`列出 $f''$ 的符号表。`, R`$f''$ 变号的点是拐点，代入求坐标。`],
    pitfalls: [R`拐点要写成坐标 $(a,f(a))$，不是只写 $x=a$。`],
    exercises: [
      {
        id: 'calc.apply.concavity.ex1',
        difficulty: '易',
        question: {
          zh: R`求曲线 $y=x^4-6x^2$ 的凹凸区间与拐点。`,
          ja: R`曲線 $y=x^4-6x^2$ の凹凸を調べ，変曲点を求めよ。`,
          en: R`Determine the concavity of $y=x^4-6x^2$ and find its inflection points.`,
        },
        answer: R`\begin{gathered}|x|>1\ \text{下に凸},\quad|x|<1\ \text{上に凸}\\\text{拐点}\ (\pm1,\,-5)\end{gathered}`,
        idea: R`$y''=12(x-1)(x+1)$。`,
        solution: [
          { math: R`y'=4x^3-12x` },
          { math: R`y''=12x^2-12=12(x-1)(x+1)` },
          R`$|x|>1$ 时 $y''>0$（下凸），$|x|<1$ 时 $y''<0$（上凸）。$x=\pm1$ 处变号，$y(\pm1)=1-6=-5$，拐点为 $(\pm1,-5)$。`,
        ],
        pitfalls: [R`偶函数的图像关于 $y$ 轴对称，两个拐点也对称。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'factor(diff(x**4-6*x**2, x, 2))', rhs: '12*(x-1)*(x+1)' },
            { type: 'equal', lhs: '(x**4-6*x**2).subs(x, 1)', rhs: '-5' },
          ],
        },
      },
    ],
  },
  {
    id: 'calc.apply.asymptotes',
    name: { zh: '渐近线的求法', ja: '漸近線の求め方', kana: 'ぜんきんせんのもとめかた' },
    knowledge: ['calc.apply.k.asymptote'],
    formula: [R`a=\lim_{x\to\pm\infty}\frac{f(x)}{x},\qquad b=\lim_{x\to\pm\infty}\bigl(f(x)-ax\bigr)`, R`\lim_{x\to c\pm0}f(x)=\pm\infty\ \Rightarrow\ x=c`],
    conditions: [R`$a$、$b$ 都是有限值时才有斜渐近线 $y=ax+b$；$a=0$ 时为水平渐近线。`],
    scenarios: [R`有理函数、含 $e^{x}$ 或 $\sqrt{\ \ }$ 的函数画图像。`],
    steps: [R`竖直：找分母为 0（或 $\log$ 的真数为 0）的点，求单侧极限。`, R`斜：先求 $a$，再求 $b$；$x\to+\infty$ 与 $x\to-\infty$ 分别求。`],
    pitfalls: [R`有理函数用多项式除法最快。`],
    exercises: [
      {
        id: 'calc.apply.asymptotes.ex1',
        difficulty: '中',
        question: {
          zh: R`求曲线 $y=\dfrac{x^2+1}{x-1}$ 的渐近线。`,
          ja: R`曲線 $y=\dfrac{x^2+1}{x-1}$ の漸近線を求めよ。`,
          en: R`Find the asymptotes of $y=\dfrac{x^2+1}{x-1}$.`,
        },
        answer: R`x=1,\qquad y=x+1`,
        idea: R`多项式除法：$\dfrac{x^2+1}{x-1}=x+1+\dfrac{2}{x-1}$。`,
        solution: [
          { math: R`\frac{x^2+1}{x-1}=x+1+\frac{2}{x-1}` },
          R`$x\to1\pm0$ 时 $\dfrac{2}{x-1}\to\pm\infty$，竖直渐近线 $x=1$。`,
          R`$x\to\pm\infty$ 时 $\dfrac{2}{x-1}\to0$，斜渐近线 $y=x+1$。`,
        ],
        pitfalls: [R`用公式求：$a=\lim\dfrac{f(x)}{x}=1$，$b=\lim(f(x)-x)=\lim\dfrac{x+1}{x-1}=1$，结果一致。`],
        verify: {
          type: 'all',
          items: [
            { type: 'limit', expr: '(x**2+1)/(x-1)/x', var: 'x', to: 'oo', expected: '1' },
            { type: 'limit', expr: '(x**2+1)/(x-1)-x', var: 'x', to: 'oo', expected: '1' },
            { type: 'limit', expr: '(x**2+1)/(x-1)', var: 'x', to: '1', dir: '+', expected: 'oo' },
          ],
        },
      },
    ],
  },
  {
    id: 'calc.apply.graph',
    name: { zh: '函数图像的综合分析', ja: 'グラフの概形', kana: 'グラフのがいけい' },
    knowledge: ['calc.apply.k.monotone', 'calc.apply.k.concavity', 'calc.apply.k.asymptote'],
    formula: R`\begin{gathered}\text{定义域}\to\text{对称性}\\\to f'\ \text{增减}\to f''\ \text{凹凸}\to\text{渐近线}\end{gathered}`,
    conditions: [R`把所有信息汇总到一张增减表（含 $f'$、$f''$ 两行）。`],
    scenarios: [R`「グラフの概形をかけ」类题目。`],
    steps: [R`定义域、奇偶性、与坐标轴的交点。`, R`$f'$：增减与极值。`, R`$f''$：凹凸与拐点。`, R`端点附近和 $\pm\infty$ 的极限、渐近线。`],
    pitfalls: [R`$x\to+0$ 等端点附近的极限常用洛必达法则。`],
    exercises: [
      {
        id: 'calc.apply.graph.ex1',
        difficulty: '中',
        question: {
          zh: R`分析 $y=\dfrac{\log x}{x}$ 的增减、极值、凹凸、拐点和渐近线。`,
          ja: R`$y=\dfrac{\log x}{x}$ の増減，極値，凹凸，変曲点，漸近線を調べよ。`,
          en: R`Analyze $y=\dfrac{\log x}{x}$: monotonicity, extrema, concavity, inflection points and asymptotes.`,
        },
        answer: R`\begin{gathered}x=e\ \text{极大值}\ \frac1e;\quad\text{拐点}\ \left(e^{\frac32},\ \frac{3}{2}e^{-\frac32}\right)\\\text{渐近线}\ x=0,\ y=0\end{gathered}`,
        idea: R`$y'=\dfrac{1-\log x}{x^2}$，$y''=\dfrac{2\log x-3}{x^3}$。`,
        solution: [
          { math: R`y'=\frac{1-\log x}{x^2},\qquad y''=\frac{2\log x-3}{x^3}` },
          R`$0<x<e$ 增加，$x>e$ 减少；极大值 $y(e)=\dfrac1e$。`,
          R`$0<x<e^{\frac32}$ 上凸，$x>e^{\frac32}$ 下凸；拐点 $\left(e^{\frac32},\dfrac32e^{-\frac32}\right)$。`,
          R`$x\to+0$：$\log x\to-\infty$，$y\to-\infty$，竖直渐近线 $x=0$。$x\to\infty$：$\dfrac{\log x}{x}\to0$（洛必达），水平渐近线 $y=0$。`,
        ],
        pitfalls: [R`定义域是 $x>0$，没有 $x<0$ 的部分。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'simplify(diff(log(x)/x, x))', rhs: '(1-log(x))/x**2' },
            { type: 'equal', lhs: 'simplify(diff(log(x)/x, x, 2))', rhs: '(2*log(x)-3)/x**3' },
            { type: 'equal', lhs: '(log(x)/x).subs(x, exp(Rational(3,2)))', rhs: 'Rational(3,2)*exp(-Rational(3,2))' },
            { type: 'limit', expr: 'log(x)/x', var: 'x', to: 'oo', expected: '0' },
          ],
        },
      },
      {
        id: 'calc.apply.graph.ex2',
        difficulty: '中',
        question: {
          zh: R`分析 $y=\dfrac{x}{x^2+1}$ 的增减、极值、拐点和渐近线。`,
          ja: R`$y=\dfrac{x}{x^2+1}$ の増減，極値，変曲点，漸近線を調べよ。`,
          en: R`Analyze $y=\dfrac{x}{x^2+1}$: monotonicity, extrema, inflection points and asymptotes.`,
        },
        answer: R`\begin{gathered}\text{极大}\ \frac12\ (x=1),\quad\text{极小}\ -\frac12\ (x=-1)\\\text{拐点}\ x=0,\ \pm\sqrt3;\quad\text{渐近线}\ y=0\end{gathered}`,
        idea: R`奇函数，图像关于原点对称。`,
        solution: [
          { math: R`y'=\frac{1-x^2}{(x^2+1)^2},\qquad y''=\frac{2x(x^2-3)}{(x^2+1)^3}` },
          R`$|x|<1$ 增加，$|x|>1$ 减少：极大值 $y(1)=\dfrac12$，极小值 $y(-1)=-\dfrac12$。`,
          R`$y''$ 在 $x=0,\pm\sqrt3$ 变号，拐点为 $(0,0)$、$\left(\pm\sqrt3,\pm\dfrac{\sqrt3}{4}\right)$（同号）。`,
          R`$x\to\pm\infty$ 时 $y\to0$，水平渐近线 $y=0$。`,
        ],
        pitfalls: [R`$y(\sqrt3)=\dfrac{\sqrt3}{3+1}=\dfrac{\sqrt3}{4}$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'simplify(diff(x/(x**2+1), x))', rhs: '(1-x**2)/(x**2+1)**2' },
            { type: 'equal', lhs: 'simplify(diff(x/(x**2+1), x, 2))', rhs: '2*x*(x**2-3)/(x**2+1)**3' },
            { type: 'equal', lhs: '(x/(x**2+1)).subs(x, sqrt(3))', rhs: 'sqrt(3)/4' },
          ],
        },
      },
    ],
  },
  {
    id: 'calc.apply.inequality',
    name: { zh: '用单调性证明不等式', ja: '増減を利用した不等式の証明', kana: 'ぞうげんをりようしたふとうしきのしょうめい' },
    knowledge: ['calc.apply.k.monotone'],
    formula: R`\begin{gathered}g(a)\ge0,\quad g'(x)>0\ \ (x>a)\\\Longrightarrow\ g(x)>0\ \ (x>a)\end{gathered}`,
    conditions: [R`$g$ 在 $[a,\infty)$ 上连续，在 $(a,\infty)$ 上可微。`],
    scenarios: [R`证明 $f(x)>h(x)$ 形式的不等式，如 $e^x>1+x$、$\log(1+x)<x$。`],
    steps: [R`设 $g(x)=$（大的一边）$-$（小的一边）。`, R`求 $g'(x)$，判断符号（必要时再求 $g''$）。`, R`由 $g(a)=0$ 与单调性得结论。`],
    pitfalls: [R`$g'$ 的符号不明显时，对 $g'$ 再用一次同样的方法。`],
    exercises: [
      {
        id: 'calc.apply.inequality.ex1',
        difficulty: '中',
        question: {
          zh: R`证明：$x>0$ 时 $x-\dfrac{x^2}{2}<\log(1+x)<x$。`,
          ja: R`$x>0$ のとき，$x-\dfrac{x^2}{2}<\log(1+x)<x$ が成り立つことを示せ。`,
          en: R`Prove that $x-\dfrac{x^2}{2}<\log(1+x)<x$ for $x>0$.`,
        },
        answerText: R`令 $g(x)=x-\log(1+x)$，$h(x)=\log(1+x)-x+\dfrac{x^2}{2}$，二者在 $x=0$ 为 0 且 $x>0$ 时导数为正，所以都为正。`,
        idea: R`左右两个不等式分别设差函数。`,
        solution: [
          { math: R`g(x)=x-\log(1+x)` },
          { math: R`g'(x)=1-\frac{1}{1+x}=\frac{x}{1+x}>0\quad(x>0)` },
          R`$g(0)=0$，$g$ 单调增加，所以 $x>0$ 时 $g(x)>0$，即 $\log(1+x)<x$。`,
          { math: R`h(x)=\log(1+x)-x+\frac{x^2}{2}` },
          { math: R`h'(x)=\frac{1}{1+x}-1+x=\frac{x^2}{1+x}>0` },
          R`$h(0)=0$，同理 $h(x)>0$，即 $x-\dfrac{x^2}{2}<\log(1+x)$。`,
        ],
        pitfalls: [R`$h'(x)$ 通分：$\dfrac{1-(1+x)+x(1+x)}{1+x}=\dfrac{x^2}{1+x}$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'simplify(diff(x-log(1+x), x))', rhs: 'x/(1+x)' },
            { type: 'equal', lhs: 'simplify(diff(log(1+x)-x+x**2/2, x))', rhs: 'x**2/(1+x)' },
          ],
        },
      },
    ],
  },
];

export const applicationsChapter = {
  overview: '用导数分析函数：切线与法线、增减表、极值（一阶、二阶判别）、闭区间上的最大最小、凹凸与拐点、渐近线、图像的综合分析，以及用单调性证明不等式。',
  sections: [
    { title: '切线与增减', knowledge: [K.monotone], formulas: cards.slice(0, 2) },
    { title: '极值与最大最小', knowledge: [K.extrema], formulas: cards.slice(2, 5) },
    { title: '凹凸、渐近线与图像', knowledge: [K.concavity, K.asymptote], formulas: cards.slice(5, 8) },
    { title: '不等式的证明', knowledge: [], formulas: cards.slice(8) },
  ],
};
