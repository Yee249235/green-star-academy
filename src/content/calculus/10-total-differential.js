// 第 10 章 全微分
const R = String.raw;

const K = {
  differentiable: {
    id: 'calc.total.k.differentiable',
    name: { zh: '全微分可能性', ja: '全微分可能性', kana: 'ぜんびぶんかのうせい' },
    paragraphs: [
      R`若函数增量能用一次式近似，且误差是比距离 $\rho=\sqrt{h^2+k^2}$ 高阶的无穷小，称 $f$ 在该点**全微分可能**（可微）。此时一次式的系数就是偏导数。`,
      R`关系：$C^1$ 级（偏导数连续）$\Rightarrow$ 全微分可能 $\Rightarrow$ 连续且偏导数存在。反向都不成立。`,
    ],
    definitions: [R`\begin{aligned}&f(a+h,b+k)-f(a,b)\\&\quad=f_x(a,b)h+f_y(a,b)k+o(\rho)\end{aligned}`, R`\rho=\sqrt{h^2+k^2}`],
    conditions: [R`判断方法：计算 $\displaystyle\lim_{\rho\to0}\frac{f(a+h,b+k)-f(a,b)-f_xh-f_yk}{\rho}$ 是否为 $0$。`],
    theorems: [R`全微分 $dz=f_x\,dx+f_y\,dy$ 是切平面的增量，用于近似计算与误差估计。`],
    related: ['calc.partial.k.partial', 'calc.deriv.k.differential'],
  },
};

const cards = [
  {
    id: 'calc.total.check',
    name: { zh: '全微分可能性的判定', ja: '全微分可能性の判定', kana: 'ぜんびぶんかのうせいのはんてい' },
    knowledge: ['calc.total.k.differentiable'],
    formula: R`\begin{gathered}\lim_{(h,k)\to(0,0)}\frac{\Delta f-f_xh-f_yk}{\sqrt{h^2+k^2}}=0\\\Delta f=f(a+h,b+k)-f(a,b)\end{gathered}`,
    conditions: [R`先求出 $f_x(a,b)$、$f_y(a,b)$（特殊点处用定义）。`],
    scenarios: [R`分段定义的函数在原点处是否全微分可能。`],
    steps: [R`用定义求 $f_x(0,0)$、$f_y(0,0)$。`, R`写出上式的分子，除以 $\rho$。`, R`用极坐标或路径判断极限是否为 0。`],
    pitfalls: [R`偏导数存在不代表全微分可能，一定要检查这个极限。`],
    exercises: [
      {
        id: 'calc.total.check.ex1',
        difficulty: '中',
        question: {
          zh: R`判断 $f(x,y)=\sqrt{|xy|}$ 在原点是否全微分可能。`,
          ja: R`$f(x,y)=\sqrt{|xy|}$ は原点で全微分可能か調べよ。`,
          en: R`Is $f(x,y)=\sqrt{|xy|}$ differentiable at the origin?`,
        },
        answerText: R`不可能。$f_x(0,0)=f_y(0,0)=0$，但沿 $k=h$ 时 $\dfrac{f(h,k)}{\rho}=\dfrac{1}{\sqrt2}\not\to0$。`,
        idea: R`偏导数都是 0，判断 $\dfrac{f(h,k)}{\sqrt{h^2+k^2}}$ 是否趋于 0。`,
        solution: [
          R`$f(h,0)=0$，所以 $f_x(0,0)=\displaystyle\lim_{h\to0}\frac{0}{h}=0$；同理 $f_y(0,0)=0$。`,
          { math: R`\frac{f(h,k)-0-0-0}{\sqrt{h^2+k^2}}=\frac{\sqrt{|hk|}}{\sqrt{h^2+k^2}}` },
          R`沿 $k=h$：值为 $\dfrac{|h|}{\sqrt2|h|}=\dfrac{1}{\sqrt2}$，不趋于 0，所以不是全微分可能。`,
        ],
        pitfalls: [R`这是「偏导数存在且连续，但不可微」的典型反例（$f$ 在原点连续）。`],
        verify: { type: 'equal', lhs: 'simplify((sqrt(Abs(x*y))/sqrt(x**2+y**2)).subs(y, x))', rhs: 'sqrt(2)/2' },
      },
    ],
  },
  {
    id: 'calc.total.dz',
    name: { zh: '全微分 dz 的计算', ja: '全微分 dz の計算', kana: 'ぜんびぶん dz のけいさん' },
    knowledge: ['calc.total.k.differentiable'],
    formula: R`dz=\frac{\partial z}{\partial x}\,dx+\frac{\partial z}{\partial y}\,dy`,
    conditions: [R`$f$ 全微分可能（$C^1$ 级即可）。`],
    scenarios: [R`求全微分；三变量 $du=u_xdx+u_ydy+u_zdz$ 同理。`],
    steps: [R`分别求偏导数。`, R`写成 $dz=f_x\,dx+f_y\,dy$。`],
    pitfalls: [R`不要写成 $dz=f_x+f_y$，要带上 $dx$、$dy$。`],
    exercises: [
      {
        id: 'calc.total.dz.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $z=x^2y+\log y$ 的全微分。`,
          ja: R`$z=x^2y+\log y$ の全微分を求めよ。`,
          en: R`Find the total differential of $z=x^2y+\log y$.`,
        },
        answer: R`dz=2xy\,dx+\left(x^2+\frac1y\right)dy`,
        idea: R`$z_x=2xy$，$z_y=x^2+\dfrac1y$。`,
        solution: [{ math: R`dz=2xy\,dx+\left(x^2+\frac1y\right)dy` }],
        pitfalls: [R`$\log y$ 对 $x$ 的偏导为 $0$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'diff(x**2*y+log(y), x)', rhs: '2*x*y' },
            { type: 'equal', lhs: 'diff(x**2*y+log(y), y)', rhs: 'x**2+1/y' },
          ],
        },
      },
    ],
  },
  {
    id: 'calc.total.tangent-plane',
    name: { zh: '切平面与法线', ja: '接平面と法線', kana: 'せつへいめんとほうせん' },
    knowledge: ['calc.total.k.differentiable'],
    formula: [R`z-c=f_x(a,b)(x-a)+f_y(a,b)(y-b)`, R`\frac{x-a}{f_x}=\frac{y-b}{f_y}=\frac{z-c}{-1}`],
    conditions: [R`$c=f(a,b)$；曲面 $F(x,y,z)=0$ 时法向量为 $(F_x,F_y,F_z)$。`],
    scenarios: [R`求曲面在某点的切平面、法线。`],
    steps: [R`求切点 $(a,b,c)$。`, R`求 $f_x(a,b)$、$f_y(a,b)$。`, R`代入切平面公式；法线方向向量 $(f_x,f_y,-1)$。`],
    pitfalls: [R`法线方程中分母为 0 时，写成「$x=a$ 且 $\cdots$」的形式。`],
    exercises: [
      {
        id: 'calc.total.tangent-plane.ex1',
        difficulty: '易',
        question: {
          zh: R`求曲面 $z=x^2+y^2$ 在点 $(1,2,5)$ 处的切平面与法线方程。`,
          ja: R`曲面 $z=x^2+y^2$ 上の点 $(1,2,5)$ における接平面と法線の方程式を求めよ。`,
          en: R`Find the tangent plane and normal line to $z=x^2+y^2$ at $(1,2,5)$.`,
        },
        answer: R`\begin{gathered}\text{切平面：}z=2x+4y-5\\\text{法线：}\frac{x-1}{2}=\frac{y-2}{4}=\frac{z-5}{-1}\end{gathered}`,
        idea: R`$f_x(1,2)=2$，$f_y(1,2)=4$。`,
        solution: [
          { math: R`\begin{gathered}z-5=2(x-1)+4(y-2)\\\Longrightarrow\ z=2x+4y-5\end{gathered}` },
          R`法向量 $(2,4,-1)$，法线为 $\dfrac{x-1}{2}=\dfrac{y-2}{4}=\dfrac{z-5}{-1}$。`,
        ],
        pitfalls: [R`法向量的 $z$ 分量是 $-1$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'diff(x**2+y**2, x).subs(x, 1)', rhs: '2' },
            { type: 'equal', lhs: 'diff(x**2+y**2, y).subs(y, 2)', rhs: '4' },
            { type: 'equal', lhs: '5+2*(x-1)+4*(y-2)', rhs: '2*x+4*y-5' },
          ],
        },
      },
    ],
  },
  {
    id: 'calc.total.approximation',
    name: { zh: '全微分的近似计算', ja: '全微分による近似計算', kana: 'ぜんびぶんによるきんじけいさん' },
    knowledge: ['calc.total.k.differentiable'],
    formula: R`\begin{aligned}&f(a+h,b+k)\\&\quad\approx f(a,b)+f_x(a,b)h+f_y(a,b)k\end{aligned}`,
    conditions: [R`$h$、$k$ 足够小。`],
    scenarios: [R`估算 $\sqrt{3.02^2+3.97^2}$ 这类数值；测量误差的传播。`],
    steps: [R`选好容易计算的基准点 $(a,b)$。`, R`求偏导数在基准点的值。`, R`代入公式。`],
    pitfalls: [R`$h$、$k$ 带符号：$3.97=4-0.03$，$k=-0.03$。`],
    exercises: [
      {
        id: 'calc.total.approximation.ex1',
        difficulty: '中',
        question: {
          zh: R`用全微分求 $\sqrt{(3.02)^2+(3.97)^2}$ 的近似值。`,
          ja: R`全微分を用いて $\sqrt{(3.02)^2+(3.97)^2}$ の近似値を求めよ。`,
          en: R`Use the total differential to approximate $\sqrt{(3.02)^2+(3.97)^2}$.`,
        },
        answer: R`\approx4.988`,
        idea: R`$f=\sqrt{x^2+y^2}$，基准点 $(3,4)$，$f=5$。`,
        solution: [
          { math: R`f_x=\frac{x}{\sqrt{x^2+y^2}}=\frac35,\qquad f_y=\frac{y}{\sqrt{x^2+y^2}}=\frac45` },
          { math: R`\begin{aligned}f&\approx5+\frac35(0.02)+\frac45(-0.03)\\&=5-0.012=4.988\end{aligned}` },
        ],
        pitfalls: [R`真实值约 $4.98808$，近似非常好。`],
        verify: { type: 'less', lhs: 'Abs(sqrt(Rational(302,100)**2+Rational(397,100)**2) - Rational(4988,1000))', rhs: '10**(-3)' },
      },
    ],
  },
];

export const totalDifferentialChapter = {
  overview: '全微分可能性的定义与判定、全微分 dz、曲面的切平面与法线、全微分的近似计算。',
  sections: [{ title: '全微分', knowledge: [K.differentiable], formulas: cards }],
};
