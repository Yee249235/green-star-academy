// 第 11 章 多变量函数的极值
const R = String.raw;

const K = {
  extrema: {
    id: 'calc.ext.k.extrema',
    name: { zh: '二元函数的极值与 Hesse 判别', ja: '2 変数関数の極値とヘッセ行列', kana: 'にへんすうかんすうのきょくちとヘッセぎょうれつ' },
    paragraphs: [
      R`可微函数在极值点处 $f_x=f_y=0$，这样的点称为**停留点**（停留点・臨界点）。停留点是否为极值由二阶偏导数（Hesse 矩阵）判断。`,
      R`判别式 $D=f_{xx}f_{yy}-f_{xy}^2$ 就是 Hesse 矩阵的行列式。`,
    ],
    definitions: [R`H=\begin{pmatrix}f_{xx}&f_{xy}\\f_{xy}&f_{yy}\end{pmatrix}`, R`D=\det H=f_{xx}f_{yy}-f_{xy}^2`],
    conditions: [R`$f$ 为 $C^2$ 级。`],
    theorems: [
      R`$D>0$ 且 $f_{xx}>0$：极小；$D>0$ 且 $f_{xx}<0$：极大。`,
      R`$D<0$：不是极值（鞍点）。$D=0$：不能判定，要另外分析。`,
    ],
    related: ['calc.apply.k.extrema', 'calc.partial.k.higher'],
  },
  constrained: {
    id: 'calc.ext.k.constrained',
    name: { zh: '条件极值（Lagrange 乘数法）', ja: '条件付き極値（ラグランジュの未定乗数法）', kana: 'じょうけんつききょくち' },
    paragraphs: [
      R`在约束 $g(x,y)=0$ 下求 $f(x,y)$ 的极值。极值点处 $\nabla f$ 与 $\nabla g$ 平行，即存在 $\lambda$ 使 $\nabla f=\lambda\nabla g$。`,
      R`约束曲线是有界闭集（如圆、椭圆）时，最大最小值一定存在，比较候选点的函数值即可。`,
    ],
    definitions: [R`\begin{cases}f_x=\lambda g_x\\f_y=\lambda g_y\\g(x,y)=0\end{cases}`],
    conditions: [R`在候选点处 $\nabla g\neq\boldsymbol 0$。`],
    theorems: [R`三变量、多个约束时同样成立：$\nabla f=\lambda\nabla g+\mu\nabla h$。`],
    related: ['calc.partial.k.gradient', 'calc.ext.k.extrema'],
  },
};

const cards = [
  {
    id: 'calc.ext.stationary',
    name: { zh: '求停留点', ja: '停留点の求め方', kana: 'ていりゅうてんのもとめかた' },
    knowledge: ['calc.ext.k.extrema'],
    formula: R`f_x(x,y)=0,\qquad f_y(x,y)=0`,
    conditions: [R`可微函数的极值点一定是停留点。`],
    scenarios: [R`所有二元函数极值题的第一步。`],
    steps: [R`求 $f_x$、$f_y$。`, R`解联立方程，常用：一式解出一个变量代入另一式；或两式相减、因式分解。`, R`列出所有解，不要漏。`],
    pitfalls: [R`因式分解时不要随意约去可能为 0 的因子。`],
    exercises: [
      {
        id: 'calc.ext.stationary.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $f(x,y)=x^3+y^3-3xy$ 的停留点。`,
          ja: R`$f(x,y)=x^3+y^3-3xy$ の停留点を求めよ。`,
          en: R`Find the stationary points of $f(x,y)=x^3+y^3-3xy$.`,
        },
        answer: R`(0,0),\ (1,1)`,
        idea: R`$y=x^2$ 代入 $x=y^2$。`,
        solution: [
          { math: R`f_x=3x^2-3y=0,\qquad f_y=3y^2-3x=0` },
          R`由第一式 $y=x^2$，代入第二式：$x^4=x$，$x(x^3-1)=0$，$x=0$ 或 $x=1$。对应 $y=0$、$y=1$。`,
        ],
        pitfalls: [R`$x^3=1$ 在实数范围只有 $x=1$。`],
        verify: { type: 'equal', lhs: 'solve([diff(x**3+y**3-3*x*y, x), diff(x**3+y**3-3*x*y, y)], [x, y], dict=False)', rhs: '[(0, 0), (1, 1)]' },
      },
    ],
  },
  {
    id: 'calc.ext.hessian',
    name: { zh: 'Hesse 判别法', ja: 'ヘッセ行列による極値判定', kana: 'ヘッセぎょうれつによるきょくちはんてい' },
    knowledge: ['calc.ext.k.extrema'],
    formula: [R`D=f_{xx}f_{yy}-f_{xy}^2`, R`\begin{cases}D>0,\ f_{xx}>0&\text{极小}\\D>0,\ f_{xx}<0&\text{极大}\\D<0&\text{鞍点}\\D=0&\text{不能判定}\end{cases}`],
    conditions: [R`在停留点处计算。`],
    scenarios: [R`二元函数的极值。`],
    steps: [R`求停留点。`, R`计算二阶偏导数，在每个停留点求 $D$。`, R`按符号判断；$D=0$ 时另行分析（看附近的函数值）。`],
    pitfalls: [R`$D>0$ 时还要看 $f_{xx}$ 的符号；$D<0$ 时直接是鞍点。`],
    exercises: [
      {
        id: 'calc.ext.hessian.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $f(x,y)=x^3+y^3-3xy$ 的极值。`,
          ja: R`$f(x,y)=x^3+y^3-3xy$ の極値を求めよ。`,
          en: R`Find the local extrema of $f(x,y)=x^3+y^3-3xy$.`,
        },
        answer: R`(1,1)\ \text{处极小值}\ -1;\quad(0,0)\ \text{为鞍点}`,
        idea: R`停留点 $(0,0)$、$(1,1)$；$f_{xx}=6x$，$f_{yy}=6y$，$f_{xy}=-3$。`,
        solution: [
          { math: R`D=36xy-9` },
          R`$(1,1)$：$D=27>0$，$f_{xx}=6>0$，极小值 $f(1,1)=1+1-3=-1$。`,
          R`$(0,0)$：$D=-9<0$，鞍点，不是极值。`,
        ],
        pitfalls: [R`停留点不一定是极值点：$(0,0)$ 就是鞍点。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: '(diff(x**3+y**3-3*x*y, x, 2)*diff(x**3+y**3-3*x*y, y, 2)-diff(x**3+y**3-3*x*y, x, y)**2).subs(x, 1).subs(y, 1)', rhs: '27' },
            { type: 'equal', lhs: '(x**3+y**3-3*x*y).subs(x, 1).subs(y, 1)', rhs: '-1' },
            { type: 'equal', lhs: '(diff(x**3+y**3-3*x*y, x, 2)*diff(x**3+y**3-3*x*y, y, 2)-diff(x**3+y**3-3*x*y, x, y)**2).subs(x, 0).subs(y, 0)', rhs: '-9' },
          ],
        },
      },
      {
        id: 'calc.ext.hessian.ex2',
        difficulty: '易',
        question: {
          zh: R`求 $f(x,y)=x^2+xy+y^2-3x$ 的极值。`,
          ja: R`$f(x,y)=x^2+xy+y^2-3x$ の極値を求めよ。`,
          en: R`Find the local extrema of $f(x,y)=x^2+xy+y^2-3x$.`,
        },
        answer: R`(2,-1)\ \text{处极小值}\ -3`,
        idea: R`停留点由一次方程组给出。`,
        solution: [
          { math: R`f_x=2x+y-3=0,\qquad f_y=x+2y=0` },
          { math: R`\Longrightarrow\ (x,y)=(2,-1)` },
          { math: R`f_{xx}=2,\quad f_{xy}=1,\quad f_{yy}=2` },
          { math: R`D=4-1=3>0` },
          R`$D>0$，$f_{xx}>0$，极小值 $f(2,-1)=4-2+1-6=-3$。`,
        ],
        pitfalls: [R`二次函数的 Hesse 矩阵是常数矩阵。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'solve([2*x+y-3, x+2*y], [x, y], dict=False)', rhs: '{x: 2, y: -1}' },
            { type: 'equal', lhs: '(x**2+x*y+y**2-3*x).subs(x, 2).subs(y, -1)', rhs: '-3' },
          ],
        },
      },
      {
        id: 'calc.ext.hessian.ex3',
        difficulty: '中',
        question: {
          zh: R`判断 $f(x,y)=x^4+y^4$ 在原点是否取极值。`,
          ja: R`$f(x,y)=x^4+y^4$ は原点で極値をとるか調べよ。`,
          en: R`Does $f(x,y)=x^4+y^4$ have a local extremum at the origin?`,
        },
        answerText: R`$D=0$，Hesse 判别不能判定；但 $(x,y)\neq(0,0)$ 时 $f(x,y)>0=f(0,0)$，所以原点处取极小值 $0$。`,
        idea: R`$D=0$ 时直接比较附近的函数值。`,
        solution: [
          R`$f_{xx}=12x^2$，$f_{yy}=12y^2$，$f_{xy}=0$，原点处 $D=0$，不能用 Hesse 判别。`,
          R`对任意 $(x,y)\neq(0,0)$，$f(x,y)=x^4+y^4>0=f(0,0)$，所以原点是（严格）极小点，极小值 $0$。`,
        ],
        pitfalls: [R`对比 $x^4-y^4$：同样 $D=0$，但沿 $y$ 轴取负值，是鞍点。`],
        verify: { type: 'equal', lhs: '(diff(x**4+y**4, x, 2)*diff(x**4+y**4, y, 2)-diff(x**4+y**4, x, y)**2).subs(x, 0).subs(y, 0)', rhs: '0' },
      },
    ],
  },
  {
    id: 'calc.ext.lagrange',
    name: { zh: 'Lagrange 乘数法', ja: 'ラグランジュの未定乗数法', kana: 'ラグランジュのみていじょうすうほう' },
    knowledge: ['calc.ext.k.constrained'],
    formula: R`\nabla f=\lambda\nabla g,\qquad g(x,y)=0`,
    conditions: [R`候选点处 $\nabla g\neq\boldsymbol0$；约束集合有界闭时最大最小存在。`],
    scenarios: [R`在圆、椭圆、平面等约束下求最大最小。`],
    steps: [R`写出 $f_x=\lambda g_x$，$f_y=\lambda g_y$，$g=0$。`, R`消去 $\lambda$（常用两式相比或相乘）。`, R`求出所有候选点，比较函数值。`],
    pitfalls: [R`Lagrange 条件只给出「候选点」，最后要比较函数值决定最大、最小。`],
    exercises: [
      {
        id: 'calc.ext.lagrange.ex1',
        difficulty: '中',
        question: {
          zh: R`在条件 $x^2+y^2=2$ 下，求 $f(x,y)=xy$ 的最大值与最小值。`,
          ja: R`$x^2+y^2=2$ のもとで，$f(x,y)=xy$ の最大値と最小値を求めよ。`,
          en: R`Find the maximum and minimum of $f(x,y)=xy$ subject to $x^2+y^2=2$.`,
        },
        answer: R`\begin{gathered}\text{最大值}\ 1\ \bigl(\pm(1,1)\bigr)\\\text{最小值}\ -1\ \bigl(\pm(1,-1)\bigr)\end{gathered}`,
        idea: R`$y=2\lambda x$，$x=2\lambda y$，得 $x^2=y^2$。`,
        solution: [
          { math: R`y=2\lambda x,\qquad x=2\lambda y` },
          R`两式相乘得 $xy=4\lambda^2xy$。若 $xy=0$，则由约束 $f=0$；否则 $\lambda^2=\frac14$，$y=\pm x$，代入约束得 $x^2=1$。`,
          R`候选点 $(\pm1,\pm1)$：$xy=1$ 或 $-1$。比较得最大值 $1$，最小值 $-1$。`,
        ],
        pitfalls: [R`也可以用参数 $x=\sqrt2\cos\theta$，$y=\sqrt2\sin\theta$：$xy=\sin2\theta$，结果相同。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'maximum(2*cos(t)*sin(t), t, Interval(0, 2*pi))', rhs: '1' },
            { type: 'equal', lhs: 'minimum(2*cos(t)*sin(t), t, Interval(0, 2*pi))', rhs: '-1' },
          ],
        },
      },
      {
        id: 'calc.ext.lagrange.ex2',
        difficulty: '中',
        question: {
          zh: R`在平面 $x+2y+3z=14$ 上，求 $x^2+y^2+z^2$ 的最小值。`,
          ja: R`平面 $x+2y+3z=14$ 上で，$x^2+y^2+z^2$ の最小値を求めよ。`,
          en: R`Find the minimum of $x^2+y^2+z^2$ on the plane $x+2y+3z=14$.`,
        },
        answer: R`\text{最小值}\ 14\quad\bigl((x,y,z)=(1,2,3)\bigr)`,
        idea: R`$2x=\lambda$，$2y=2\lambda$，$2z=3\lambda$，即 $(x,y,z)=\dfrac{\lambda}{2}(1,2,3)$。`,
        solution: [
          R`由 Lagrange 条件 $(x,y,z)=\dfrac\lambda2(1,2,3)$，代入约束：$\dfrac\lambda2(1+4+9)=14$，$\lambda=2$。`,
          { math: R`(x,y,z)=(1,2,3),\qquad x^2+y^2+z^2=14` },
        ],
        pitfalls: [R`几何意义：原点到平面距离的平方 $\left(\dfrac{14}{\sqrt{14}}\right)^2=14$，可以用来检查。`],
        verify: { type: 'equal', lhs: '14**2/(1**2+2**2+3**2)', rhs: '1**2+2**2+3**2' },
      },
    ],
  },
  {
    id: 'calc.ext.closed-region',
    name: { zh: '有界闭区域上的最大最小', ja: '有界閉領域における最大・最小', kana: 'ゆうかいへいりょういきにおけるさいだい・さいしょう' },
    knowledge: ['calc.ext.k.extrema', 'calc.ext.k.constrained'],
    formula: R`\begin{gathered}\max_D f=\max\bigl\{\text{内部停留点的值},\\\text{边界上的最大值}\bigr\}\end{gathered}`,
    conditions: [R`$D$ 有界闭，$f$ 连续：最大最小一定存在。`],
    scenarios: [R`圆盘、三角形、矩形区域上的最大最小。`],
    steps: [R`求内部的停留点与函数值。`, R`边界：用参数或代入化为一元问题（或 Lagrange）。`, R`比较所有候选值。`],
    pitfalls: [R`不需要判断内部停留点是否为极值，直接参与比较即可。`],
    exercises: [
      {
        id: 'calc.ext.closed-region.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $f(x,y)=x^2+y^2-2x$ 在 $x^2+y^2\le4$ 上的最大值与最小值。`,
          ja: R`$f(x,y)=x^2+y^2-2x$ の $x^2+y^2\le4$ における最大値と最小値を求めよ。`,
          en: R`Find the maximum and minimum of $f(x,y)=x^2+y^2-2x$ on $x^2+y^2\le4$.`,
        },
        answer: R`\begin{gathered}\text{最大值}\ 8\ \bigl((-2,0)\bigr)\\\text{最小值}\ -1\ \bigl((1,0)\bigr)\end{gathered}`,
        idea: R`内部停留点 $(1,0)$；边界上 $x^2+y^2=4$，$f=4-2x$。`,
        solution: [
          R`内部：$f_x=2x-2=0$，$f_y=2y=0$，得 $(1,0)$，$f=-1$。`,
          R`边界：$f=4-2x$，$-2\le x\le2$，最大 $8$（$x=-2$），最小 $0$（$x=2$）。`,
          R`比较 $-1$、$8$、$0$：最大值 $8$，最小值 $-1$。`,
        ],
        pitfalls: [R`$f=(x-1)^2+y^2-1$，几何意义是到点 $(1,0)$ 距离的平方减 1，可以检查结果。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: '(x**2+y**2-2*x).subs(x, 1).subs(y, 0)', rhs: '-1' },
            { type: 'equal', lhs: 'maximum(4-2*x, x, Interval(-2, 2))', rhs: '8' },
            { type: 'equal', lhs: 'minimum(4-2*x, x, Interval(-2, 2))', rhs: '0' },
          ],
        },
      },
    ],
  },
];

export const extremaChapter = {
  overview: '二元函数的极值：求停留点、Hesse 判别法（含鞍点与不能判定的情形），条件极值（Lagrange 乘数法），以及有界闭区域上的最大最小。',
  sections: [
    { title: '极值与 Hesse 判别', knowledge: [K.extrema], formulas: cards.slice(0, 2) },
    { title: '条件极值与最大最小', knowledge: [K.constrained], formulas: cards.slice(2) },
  ],
};
