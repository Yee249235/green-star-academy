// 第 12 章 重积分
const R = String.raw;

const K = {
  double: {
    id: 'calc.mult.k.double',
    name: { zh: '二重积分与累次积分', ja: '2 重積分と累次積分', kana: 'にじゅうせきぶんとるいじせきぶん' },
    paragraphs: [
      R`二重积分 $\displaystyle\iint_Df(x,y)\,dx\,dy$ 是平面区域 $D$ 上的 Riemann 和的极限；$f\ge0$ 时表示曲面 $z=f(x,y)$ 下方的体积。`,
      R`计算时化为**累次积分**：先对一个变量积分（另一个视为常数），再对另一个变量积分（Fubini 定理）。`,
    ],
    definitions: [
      R`\begin{aligned}&\text{纵线型：}\ \iint_Df\,dx\,dy\\&\quad=\int_a^b\left(\int_{\varphi_1(x)}^{\varphi_2(x)}f(x,y)\,dy\right)dx\end{aligned}`,
      R`\begin{aligned}&\text{横线型：}\ \iint_Df\,dx\,dy\\&\quad=\int_c^d\left(\int_{\psi_1(y)}^{\psi_2(y)}f(x,y)\,dx\right)dy\end{aligned}`,
    ],
    conditions: [R`$f$ 在有界闭区域 $D$ 上连续。`],
    theorems: [R`矩形区域且 $f(x,y)=g(x)h(y)$ 时：$\displaystyle\iint=\int g\,dx\cdot\int h\,dy$。`],
    related: ['calc.int.k.definite', 'calc.mult.k.triple'],
  },
  triple: {
    id: 'calc.mult.k.triple',
    name: { zh: '三重积分', ja: '3 重積分', kana: 'さんじゅうせきぶん' },
    paragraphs: [
      R`空间区域 $V$ 上的积分。按「先 $z$、再 $y$、最后 $x$」等顺序化为三次累次积分；被积函数为 1 时就是 $V$ 的体积。`,
    ],
    definitions: [R`\begin{aligned}&\iiint_Vf\,dx\,dy\,dz\\&\quad=\iint_D\left(\int_{\varphi_1(x,y)}^{\varphi_2(x,y)}f\,dz\right)dx\,dy\end{aligned}`],
    conditions: [R`$D$ 是 $V$ 在 $xy$ 平面上的投影。`],
    theorems: [R`球、圆柱、圆锥等区域通常换成球坐标或柱坐标（第 13 章）。`],
    related: ['calc.mult.k.double'],
  },
};

const cards = [
  {
    id: 'calc.mult.rectangle',
    name: { zh: '矩形区域的累次积分', ja: '長方形領域での累次積分', kana: 'ちょうほうけいりょういきでのるいじせきぶん' },
    knowledge: ['calc.mult.k.double'],
    formula: R`\iint_{[a,b]\times[c,d]}f\,dx\,dy=\int_a^b\!\!\int_c^df(x,y)\,dy\,dx`,
    conditions: [R`积分上下限都是常数，顺序可以任意交换。`],
    scenarios: [R`区域是矩形 $a\le x\le b$，$c\le y\le d$。`],
    steps: [R`选一个变量先积分（另一个当常数）。`, R`再积分另一个变量。`, R`可分离时分别积分再相乘。`],
    pitfalls: [R`内层积分时把外层变量当常数，不要对它求原函数。`],
    exercises: [
      {
        id: 'calc.mult.rectangle.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\iint_Dxy^2\,dx\,dy$，$D=\{0\le x\le1,\ 0\le y\le2\}$。`,
          ja: R`$\displaystyle\iint_Dxy^2\,dx\,dy$，$D=\{0\le x\le1,\ 0\le y\le2\}$ を求めよ。`,
          en: R`Evaluate $\displaystyle\iint_Dxy^2\,dx\,dy$ over $D=\{0\le x\le1,\ 0\le y\le2\}$.`,
        },
        answer: R`\frac{4}{3}`,
        idea: R`被积函数可分离：$x\cdot y^2$。`,
        solution: [{ math: R`\int_0^1x\,dx\cdot\int_0^2y^2\,dy=\frac12\cdot\frac83=\frac43` }],
        pitfalls: [R`只有矩形区域才能这样拆成乘积。`],
        verify: { type: 'equal', lhs: 'integrate(x*y**2, (y, 0, 2), (x, 0, 1))', rhs: 'Rational(4,3)' },
      },
    ],
  },
  {
    id: 'calc.mult.general-region',
    name: { zh: '一般区域（纵线型、横线型）', ja: '縦線領域・横線領域での累次積分', kana: 'じゅうせんりょういき・おうせんりょういき' },
    knowledge: ['calc.mult.k.double'],
    formula: R`\iint_Df\,dx\,dy=\int_a^b\left(\int_{\varphi_1(x)}^{\varphi_2(x)}f\,dy\right)dx`,
    conditions: [R`$D=\{a\le x\le b,\ \varphi_1(x)\le y\le\varphi_2(x)\}$。`],
    scenarios: [R`区域由曲线围成，如 $y=x^2$ 与 $y=x$ 之间。`],
    steps: [R`画出区域，求交点。`, R`决定外层变量的范围（常数），内层变量的范围（外层变量的函数）。`, R`由内向外积分。`],
    pitfalls: [R`内层积分的上下限可以含外层变量，外层积分的上下限必须是常数。`],
    exercises: [
      {
        id: 'calc.mult.general-region.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\iint_Dxy\,dx\,dy$，$D$ 是 $y=x^2$ 与 $y=x$ 围成的区域。`,
          ja: R`$y=x^2$ と $y=x$ で囲まれた領域を $D$ とするとき，$\displaystyle\iint_Dxy\,dx\,dy$ を求めよ。`,
          en: R`Let $D$ be the region bounded by $y=x^2$ and $y=x$. Evaluate $\displaystyle\iint_Dxy\,dx\,dy$.`,
        },
        answer: R`\frac{1}{24}`,
        idea: R`$D=\{0\le x\le1,\ x^2\le y\le x\}$。`,
        solution: [
          { math: R`\int_0^1x\left[\frac{y^2}{2}\right]_{x^2}^{x}dx=\frac12\int_0^1\left(x^3-x^5\right)dx` },
          { math: R`=\frac12\left(\frac14-\frac16\right)=\frac{1}{24}` },
        ],
        pitfalls: [R`$0\le x\le1$ 时 $x^2\le x$，所以下限是 $x^2$。`],
        verify: { type: 'equal', lhs: 'integrate(x*y, (y, x**2, x), (x, 0, 1))', rhs: 'Rational(1,24)' },
      },
    ],
  },
  {
    id: 'calc.mult.change-order',
    name: { zh: '交换积分顺序', ja: '積分順序の変更', kana: 'せきぶんじゅんじょのへんこう' },
    knowledge: ['calc.mult.k.double'],
    formula: R`\int_0^1\!\!\int_x^1f\,dy\,dx=\int_0^1\!\!\int_0^yf\,dx\,dy`,
    conditions: [R`两种写法描述的是同一个区域。`],
    scenarios: [R`内层积分求不出原函数（如 $e^{y^2}$、$\sin x^2$、$\dfrac{1}{1+y^3}$）。`],
    steps: [R`由原来的上下限画出区域 $D$。`, R`改成另一种方向描述 $D$。`, R`按新顺序积分。`],
    pitfalls: [R`一定要画图，不能只把上下限对调。`],
    exercises: [
      {
        id: 'calc.mult.change-order.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\int_0^1\!\!\int_x^1e^{y^2}\,dy\,dx$。`,
          ja: R`$\displaystyle\int_0^1\!\!\int_x^1e^{y^2}\,dy\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int_0^1\!\!\int_x^1e^{y^2}\,dy\,dx$.`,
        },
        answer: R`\frac{e-1}{2}`,
        idea: R`$e^{y^2}$ 对 $y$ 无法积分；区域 $0\le x\le y\le1$，改为先对 $x$ 积分。`,
        solution: [
          R`区域：$0\le x\le1$，$x\le y\le1$，即 $0\le y\le1$，$0\le x\le y$。`,
          { math: R`\begin{aligned}\int_0^1\!\!\int_0^ye^{y^2}\,dx\,dy&=\int_0^1ye^{y^2}\,dy\\&=\Bigl[\frac12e^{y^2}\Bigr]_0^1=\frac{e-1}{2}\end{aligned}` },
        ],
        pitfalls: [R`交换后内层对 $x$ 积分得 $y$，正好凑出 $ye^{y^2}$。`],
        verify: { type: 'equal', lhs: 'integrate(exp(y**2), (x, 0, y), (y, 0, 1))', rhs: '(E-1)/2' },
      },
      {
        id: 'calc.mult.change-order.ex2',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\int_0^4\!\!\int_{\sqrt{x}}^{2}\frac{dy\,dx}{1+y^3}$。`,
          ja: R`$\displaystyle\int_0^4\!\!\int_{\sqrt{x}}^{2}\frac{dy\,dx}{1+y^3}$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int_0^4\!\!\int_{\sqrt{x}}^{2}\frac{dy\,dx}{1+y^3}$.`,
        },
        answer: R`\frac{2}{3}\log3`,
        idea: R`区域 $0\le x\le y^2$，$0\le y\le2$。`,
        solution: [
          { math: R`\int_0^2\!\!\int_0^{y^2}\frac{dx\,dy}{1+y^3}=\int_0^2\frac{y^2}{1+y^3}\,dy` },
          { math: R`=\Bigl[\frac13\log(1+y^3)\Bigr]_0^2=\frac13\log9=\frac23\log3` },
        ],
        pitfalls: [R`$\sqrt x\le y\iff x\le y^2$（$x,y\ge0$）。`],
        verify: { type: 'equal', lhs: 'integrate(1/(1+y**3), (x, 0, y**2), (y, 0, 2))', rhs: '2*log(3)/3' },
      },
    ],
  },
  {
    id: 'calc.mult.triple',
    name: { zh: '三重积分的计算', ja: '3 重積分の計算', kana: 'さんじゅうせきぶんのけいさん' },
    knowledge: ['calc.mult.k.triple'],
    formula: R`\iiint_Vf\,dV=\int_a^b\!\!\int_{\varphi_1(x)}^{\varphi_2(x)}\!\!\int_{\psi_1(x,y)}^{\psi_2(x,y)}f\,dz\,dy\,dx`,
    conditions: [R`由内向外，每层的上下限只能依赖外层的变量。`],
    scenarios: [R`四面体、长方体、柱体等区域上的积分。`],
    steps: [R`确定 $z$ 的范围（由上下两个曲面）。`, R`投影到 $xy$ 平面得 $D$，再写成二重积分。`],
    pitfalls: [R`四面体 $x+y+z\le1$：$0\le z\le1-x-y$，$0\le y\le1-x$，$0\le x\le1$。`],
    exercises: [
      {
        id: 'calc.mult.triple.ex1',
        difficulty: '中',
        question: {
          zh: R`$V=\{x,y,z\ge0,\ x+y+z\le1\}$。求 $\displaystyle\iiint_Vz\,dx\,dy\,dz$。`,
          ja: R`$V=\{x,y,z\ge0,\ x+y+z\le1\}$ のとき，$\displaystyle\iiint_Vz\,dx\,dy\,dz$ を求めよ。`,
          en: R`Let $V=\{x,y,z\ge0,\ x+y+z\le1\}$. Evaluate $\displaystyle\iiint_Vz\,dx\,dy\,dz$.`,
        },
        answer: R`\frac{1}{24}`,
        idea: R`先对 $z$：$\displaystyle\int_0^{1-x-y}z\,dz=\frac{(1-x-y)^2}{2}$。`,
        solution: [
          { math: R`\begin{aligned}\int_0^1\!\!\int_0^{1-x}\frac{(1-x-y)^2}{2}\,dy\,dx&=\int_0^1\frac{(1-x)^3}{6}\,dx\\&=\frac{1}{24}\end{aligned}` },
        ],
        pitfalls: [R`对 $y$ 积分时 $1-x$ 是常数：$\displaystyle\int_0^{1-x}(1-x-y)^2dy=\frac{(1-x)^3}{3}$。`],
        verify: { type: 'equal', lhs: 'integrate(z, (z, 0, 1-x-y), (y, 0, 1-x), (x, 0, 1))', rhs: 'Rational(1,24)' },
      },
    ],
  },
  {
    id: 'calc.mult.volume',
    name: { zh: '用重积分求体积', ja: '重積分による体積', kana: 'じゅうせきぶんによるたいせき' },
    knowledge: ['calc.mult.k.double'],
    formula: R`V=\iint_D\bigl\{f(x,y)-g(x,y)\bigr\}\,dx\,dy`,
    conditions: [R`在 $D$ 上 $f\ge g$（上曲面减下曲面）。`],
    scenarios: [R`两个曲面之间的立体体积。`],
    steps: [R`确定上下曲面。`, R`求立体在 $xy$ 平面上的投影 $D$。`, R`积分「上 − 下」。`],
    pitfalls: [R`投影区域由两曲面的交线决定。`],
    exercises: [
      {
        id: 'calc.mult.volume.ex1',
        difficulty: '易',
        question: {
          zh: R`求平面 $x+y+z=1$ 与三个坐标平面围成的四面体的体积。`,
          ja: R`平面 $x+y+z=1$ と 3 つの座標平面で囲まれた四面体の体積を求めよ。`,
          en: R`Find the volume of the tetrahedron bounded by $x+y+z=1$ and the three coordinate planes.`,
        },
        answer: R`\frac{1}{6}`,
        idea: R`上曲面 $z=1-x-y$，下曲面 $z=0$，$D$ 为三角形。`,
        solution: [{ math: R`\begin{aligned}V&=\int_0^1\!\!\int_0^{1-x}(1-x-y)\,dy\,dx\\&=\int_0^1\frac{(1-x)^2}{2}\,dx=\frac16\end{aligned}` }],
        pitfalls: [R`检查：底面积 $\frac12\times$ 高 $1\times\frac13=\frac16$。`],
        verify: { type: 'equal', lhs: 'integrate(1-x-y, (y, 0, 1-x), (x, 0, 1))', rhs: 'Rational(1,6)' },
      },
    ],
  },
  {
    id: 'calc.mult.surface-area',
    name: { zh: '曲面面积', ja: '曲面積', kana: 'きょくめんせき' },
    knowledge: ['calc.mult.k.double'],
    formula: R`S=\iint_D\sqrt{1+f_x^{\,2}+f_y^{\,2}}\,dx\,dy`,
    conditions: [R`曲面 $z=f(x,y)$，$(x,y)\in D$；$f_x$、$f_y$ 连续。`],
    scenarios: [R`求曲面 $z=f(x,y)$ 在区域 $D$ 上方部分的面积；被积函数只含 $x^2+y^2$ 时配合极坐标。`],
    steps: [R`求 $f_x$、$f_y$。`, R`写出 $\sqrt{1+f_x^2+f_y^2}$。`, R`按区域形状选坐标（圆形区域用极坐标，别忘雅可比 $r$）。`],
    pitfalls: [R`$\displaystyle\int\sqrt{1+kr^2}\,r\,dr=\frac{(1+kr^2)^{3/2}}{3k}$ 经常用到。`, R`圆心不在原点时，极坐标要以圆心为中心。`],
    exercises: [
      {
        id: 'calc.mult.surface-area.ex1',
        difficulty: '中',
        question: {
          zh: R`求抛物面 $z=x^2+y^2$ 在圆 $x^2+y^2\le1$ 上方部分的面积。`,
          ja: R`放物面 $z=x^2+y^2$ のうち，円 $x^2+y^2\le1$ の上にある部分の曲面積を求めよ。`,
          en: R`Find the area of the part of the paraboloid $z=x^2+y^2$ above the disk $x^2+y^2\le1$.`,
        },
        answer: R`\frac{\pi}{6}\left(5\sqrt5-1\right)`,
        idea: R`$f_x=2x$，$f_y=2y$，被积函数 $\sqrt{1+4(x^2+y^2)}$，换极坐标。`,
        solution: [
          { math: R`S=\iint_D\sqrt{1+4x^2+4y^2}\,dx\,dy=\int_0^{2\pi}\!\!\int_0^1\sqrt{1+4r^2}\,r\,dr\,d\theta` },
          { math: R`=2\pi\left[\frac{(1+4r^2)^{3/2}}{12}\right]_0^1=\frac{\pi}{6}\left(5\sqrt5-1\right)` },
        ],
        pitfalls: [R`极坐标的 $r$（雅可比）不能漏。`],
        verify: { type: 'equal', lhs: 'integrate(integrate(sqrt(1+4*r**2)*r, (r,0,1)), (theta,0,2*pi))', rhs: 'pi*(5*sqrt(5)-1)/6' },
      },
    ],
  },
];

export const multipleIntegralsChapter = {
  overview: '二重积分化为累次积分（矩形区域、纵线型 / 横线型区域）、交换积分顺序、三重积分以及用重积分求体积与曲面面积。极坐标等变量变换在第 13 章。',
  sections: [
    { title: '二重积分', knowledge: [K.double], formulas: cards.slice(0, 3) },
    { title: '三重积分、体积与曲面面积', knowledge: [K.triple], formulas: cards.slice(3) },
  ],
};
