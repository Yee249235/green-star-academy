// 第 9 章 偏微分
const R = String.raw;

const K = {
  partial: {
    id: 'calc.partial.k.partial',
    name: { zh: '偏导数', ja: '偏微分係数と偏導関数', kana: 'へんびぶんけいすうとへんどうかんすう' },
    paragraphs: [
      R`固定 $y$，只把 $f(x,y)$ 看成 $x$ 的函数求导，得到对 $x$ 的**偏导数** $f_x=\dfrac{\partial f}{\partial x}$；同样固定 $x$ 得到 $f_y$。`,
      R`计算时把其他变量当作常数，一元函数的所有求导公式都可以直接用。`,
    ],
    definitions: [R`f_x(a,b)=\lim_{h\to0}\frac{f(a+h,b)-f(a,b)}{h}`],
    conditions: [R`偏导数存在不保证连续，也不保证全微分可能（第 10 章）。`],
    theorems: [],
    related: ['calc.deriv.k.definition', 'calc.partial.k.higher'],
  },
  higher: {
    id: 'calc.partial.k.higher',
    name: { zh: '高阶偏导数与求导顺序', ja: '高次偏導関数と偏微分の順序', kana: 'こうじへんどうかんすうとへんびぶんのじゅんじょ' },
    paragraphs: [
      R`对偏导数再求偏导得到二阶偏导数 $f_{xx},f_{xy},f_{yx},f_{yy}$。$f_{xy}$ 表示先对 $x$ 再对 $y$ 求导，即 $\dfrac{\partial^2f}{\partial y\,\partial x}$。`,
    ],
    definitions: [R`f_{xy}=\frac{\partial}{\partial y}\left(\frac{\partial f}{\partial x}\right)=\frac{\partial^2f}{\partial y\,\partial x}`],
    conditions: [R`**Schwarz 定理**：$f_{xy}$、$f_{yx}$ 都连续（$C^2$ 级）时 $f_{xy}=f_{yx}$。考试中的函数基本都满足。`],
    theorems: [R`可以用 $f_{xy}=f_{yx}$ 检查计算。`],
    related: ['calc.partial.k.partial'],
  },
  chain: {
    id: 'calc.partial.k.chain',
    name: { zh: '多变量的链式法则', ja: '合成関数の偏微分', kana: 'ごうせいかんすうのへんびぶん' },
    paragraphs: [
      R`$z=f(x,y)$ 中的 $x,y$ 又是别的变量的函数时，$z$ 对新变量求导要沿着「所有路径」相加：每条路径上的导数相乘。`,
    ],
    definitions: [R`\frac{dz}{dt}=f_x\frac{dx}{dt}+f_y\frac{dy}{dt}`, R`\frac{\partial z}{\partial u}=f_x\frac{\partial x}{\partial u}+f_y\frac{\partial y}{\partial u}`],
    conditions: [R`$f$ 全微分可能（$C^1$ 级即可），内层函数可微。`],
    theorems: [R`画「变量树」：$z\to(x,y)\to(u,v)$，从 $z$ 到 $u$ 的每条路径各贡献一项。`],
    related: ['calc.partial.k.partial', 'calc.chain.k.composite'],
  },
  gradient: {
    id: 'calc.partial.k.gradient',
    name: { zh: '梯度与方向导数', ja: '勾配と方向微分係数', kana: 'こうばいとほうこうびぶんけいすう' },
    paragraphs: [
      R`**梯度** $\nabla f=(f_x,f_y)$ 指向函数增长最快的方向，其长度就是最大增长率。`,
      R`沿单位向量 $\boldsymbol{e}=(e_1,e_2)$ 的**方向导数**等于梯度与 $\boldsymbol{e}$ 的内积。`,
    ],
    definitions: [R`\nabla f=\left(f_x,\ f_y\right)`, R`D_{\boldsymbol e}f=\nabla f\cdot\boldsymbol e=f_xe_1+f_ye_2`],
    conditions: [R`方向向量必须先化成单位向量。`],
    theorems: [R`梯度与等高线 $f(x,y)=c$ 垂直。`],
    related: ['calc.partial.k.partial'],
  },
};

const basicCards = [
  {
    id: 'calc.partial.compute',
    name: { zh: '偏导数的计算', ja: '偏導関数の計算', kana: 'へんどうかんすうのけいさん' },
    knowledge: ['calc.partial.k.partial'],
    formula: [R`f_x=\frac{\partial f}{\partial x}\quad(y\ \text{视为常数})`, R`f_y=\frac{\partial f}{\partial y}\quad(x\ \text{视为常数})`],
    conditions: [R`在定义域内计算。`],
    scenarios: [R`所有偏微分题的第一步。`],
    steps: [R`对 $x$ 求偏导：把 $y$ 当常数。`, R`对 $y$ 求偏导：把 $x$ 当常数。`, R`含 $xy$ 的复合部分要用链式法则。`],
    pitfalls: [R`$(e^{xy})_x=ye^{xy}$：内层 $xy$ 对 $x$ 的偏导是 $y$。`],
    exercises: [
      {
        id: 'calc.partial.compute.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $f(x,y)=x^2y^3+e^{xy}$ 的偏导数 $f_x$、$f_y$。`,
          ja: R`$f(x,y)=x^2y^3+e^{xy}$ の偏導関数 $f_x$，$f_y$ を求めよ。`,
          en: R`Find $f_x$ and $f_y$ for $f(x,y)=x^2y^3+e^{xy}$.`,
        },
        answer: R`f_x=2xy^3+ye^{xy},\qquad f_y=3x^2y^2+xe^{xy}`,
        idea: R`分别把另一个变量看作常数。`,
        solution: [
          { math: R`f_x=2x\cdot y^3+e^{xy}\cdot y=2xy^3+ye^{xy}` },
          { math: R`f_y=x^2\cdot3y^2+e^{xy}\cdot x=3x^2y^2+xe^{xy}` },
        ],
        pitfalls: [R`$e^{xy}$ 对 $y$ 的偏导多一个因子 $x$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'diff(x**2*y**3+exp(x*y), x)', rhs: '2*x*y**3+y*exp(x*y)' },
            { type: 'equal', lhs: 'diff(x**2*y**3+exp(x*y), y)', rhs: '3*x**2*y**2+x*exp(x*y)' },
          ],
        },
      },
    ],
  },
  {
    id: 'calc.partial.higher',
    name: { zh: '高阶偏导数', ja: '高次偏導関数', kana: 'こうじへんどうかんすう' },
    knowledge: ['calc.partial.k.higher'],
    formula: R`f_{xy}=f_{yx}\qquad(f\ \text{为}\ C^2\ \text{级})`,
    conditions: [R`二阶偏导数连续。`],
    scenarios: [R`求 $f_{xx}$、$f_{xy}$、$f_{yy}$（极值判定、Laplace 方程等都要用）。`],
    steps: [R`先求一阶偏导数并化简。`, R`再分别对 $x$、$y$ 求偏导。`, R`用 $f_{xy}=f_{yx}$ 检查。`],
    pitfalls: [R`一阶偏导数先化简，可以减少二阶的计算量。`],
    exercises: [
      {
        id: 'calc.partial.higher.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $f(x,y)=e^{x}\sin y+x^2y$ 的二阶偏导数 $f_{xx},f_{xy},f_{yy}$。`,
          ja: R`$f(x,y)=e^{x}\sin y+x^2y$ の第 2 次偏導関数 $f_{xx},f_{xy},f_{yy}$ を求めよ。`,
          en: R`Find the second partial derivatives $f_{xx},f_{xy},f_{yy}$ of $f(x,y)=e^{x}\sin y+x^2y$.`,
        },
        answer: R`\begin{gathered}f_{xx}=e^{x}\sin y+2y,\qquad f_{yy}=-e^{x}\sin y\\f_{xy}=f_{yx}=e^{x}\cos y+2x\end{gathered}`,
        idea: R`先求 $f_x=e^x\sin y+2xy$，$f_y=e^x\cos y+x^2$。`,
        solution: [
          { math: R`f_x=e^{x}\sin y+2xy,\qquad f_y=e^{x}\cos y+x^2` },
          { math: R`f_{xx}=e^{x}\sin y+2y,\qquad f_{yy}=-e^{x}\sin y` },
          { math: R`f_{xy}=(f_x)_y=e^{x}\cos y+2x=(f_y)_x=f_{yx}` },
        ],
        pitfalls: [R`$(\cos y)_y=-\sin y$，$f_{yy}$ 带负号。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'diff(exp(x)*sin(y)+x**2*y, x, 2)', rhs: 'exp(x)*sin(y)+2*y' },
            { type: 'equal', lhs: 'diff(exp(x)*sin(y)+x**2*y, x, y)', rhs: 'exp(x)*cos(y)+2*x' },
            { type: 'equal', lhs: 'diff(exp(x)*sin(y)+x**2*y, y, 2)', rhs: '-exp(x)*sin(y)' },
          ],
        },
      },
    ],
  },
];

const chainCards = [
  {
    id: 'calc.partial.chain-t',
    name: { zh: '链式法则：z = f(x(t), y(t))', ja: '合成関数の微分 z = f(x(t), y(t))', kana: 'ごうせいかんすうのびぶん' },
    knowledge: ['calc.partial.k.chain'],
    formula: R`\frac{dz}{dt}=\frac{\partial z}{\partial x}\frac{dx}{dt}+\frac{\partial z}{\partial y}\frac{dy}{dt}`,
    conditions: [R`$f$ 为 $C^1$ 级，$x(t)$、$y(t)$ 可微。`],
    scenarios: [R`沿曲线 $(x(t),y(t))$ 的变化率；最后只剩一个变量 $t$。`],
    steps: [R`求 $f_x$、$f_y$。`, R`求 $x'(t)$、$y'(t)$。`, R`代入公式，把 $x,y$ 换成 $t$ 的式子。`],
    pitfalls: [R`结果中不要残留 $x,y$（除非题目允许）。`],
    exercises: [
      {
        id: 'calc.partial.chain-t.ex1',
        difficulty: '易',
        question: {
          zh: R`$z=x^2y$，$x=\cos t$，$y=\sin t$。求 $\dfrac{dz}{dt}$。`,
          ja: R`$z=x^2y$，$x=\cos t$，$y=\sin t$ のとき，$\dfrac{dz}{dt}$ を求めよ。`,
          en: R`Let $z=x^2y$, $x=\cos t$, $y=\sin t$. Find $\dfrac{dz}{dt}$.`,
        },
        answer: R`\frac{dz}{dt}=\cos^3t-2\sin^2t\cos t`,
        idea: R`$z_x=2xy$，$z_y=x^2$，$x'=-\sin t$，$y'=\cos t$。`,
        solution: [
          { math: R`\frac{dz}{dt}=2xy\cdot(-\sin t)+x^2\cdot\cos t` },
          { math: R`=-2\cos t\sin^2t+\cos^3t` },
        ],
        pitfalls: [R`可以用直接代入 $z=\cos^2t\sin t$ 再对 $t$ 求导来检查。`],
        verify: { type: 'equal', lhs: 'diff(cos(t)**2*sin(t), t)', rhs: 'cos(t)**3-2*sin(t)**2*cos(t)' },
      },
    ],
  },
  {
    id: 'calc.partial.chain-uv',
    name: { zh: '链式法则：z = f(x(u,v), y(u,v))', ja: '合成関数の偏微分 z = f(x(u,v), y(u,v))', kana: 'ごうせいかんすうのへんびぶん' },
    knowledge: ['calc.partial.k.chain'],
    formula: [R`\frac{\partial z}{\partial u}=\frac{\partial z}{\partial x}\frac{\partial x}{\partial u}+\frac{\partial z}{\partial y}\frac{\partial y}{\partial u}`, R`\frac{\partial z}{\partial v}=\frac{\partial z}{\partial x}\frac{\partial x}{\partial v}+\frac{\partial z}{\partial y}\frac{\partial y}{\partial v}`],
    conditions: [R`$f$ 为 $C^1$ 级，$x,y$ 对 $u,v$ 可偏微分。`],
    scenarios: [R`变量变换（极坐标、$u=x+y$ 等）下改写偏微分；证明偏微分恒等式。`],
    steps: [R`画变量树 $z\to(x,y)\to(u,v)$。`, R`对每个新变量，沿两条路径各写一项。`, R`具体函数时代入化简；抽象函数时保留 $f_x$、$f_y$。`],
    pitfalls: [R`$f_x$ 本身也是 $x,y$ 的函数；求二阶时对它还要再用一次链式法则。`],
    exercises: [
      {
        id: 'calc.partial.chain-uv.ex1',
        difficulty: '易',
        question: {
          zh: R`$z=e^{u}\sin v$，$u=xy$，$v=x+y$。求 $\dfrac{\partial z}{\partial x}$。`,
          ja: R`$z=e^{u}\sin v$，$u=xy$，$v=x+y$ のとき，$\dfrac{\partial z}{\partial x}$ を求めよ。`,
          en: R`Let $z=e^{u}\sin v$, $u=xy$, $v=x+y$. Find $\dfrac{\partial z}{\partial x}$.`,
        },
        answer: R`\frac{\partial z}{\partial x}=e^{xy}\bigl\{y\sin(x+y)+\cos(x+y)\bigr\}`,
        idea: R`$z\to(u,v)\to x$：$u_x=y$，$v_x=1$。`,
        solution: [
          { math: R`\frac{\partial z}{\partial x}=e^{u}\sin v\cdot y+e^{u}\cos v\cdot1` },
          { math: R`=e^{xy}\bigl\{y\sin(x+y)+\cos(x+y)\bigr\}` },
        ],
        pitfalls: [R`最后要把 $u,v$ 换回 $x,y$。`],
        verify: { type: 'equal', lhs: 'diff(exp(x*y)*sin(x+y), x)', rhs: 'exp(x*y)*(y*sin(x+y)+cos(x+y))' },
      },
      {
        id: 'calc.partial.chain-uv.ex2',
        difficulty: '中',
        question: {
          zh: R`$z=f(x,y)$，$x=r\cos\theta$，$y=r\sin\theta$。证明 $z_r^2+\dfrac{1}{r^2}z_\theta^2=f_x^2+f_y^2$。`,
          ja: R`$z=f(x,y)$，$x=r\cos\theta$，$y=r\sin\theta$ のとき，$z_r^2+\dfrac{1}{r^2}z_\theta^2=f_x^2+f_y^2$ を示せ。`,
          en: R`Let $z=f(x,y)$ with $x=r\cos\theta$, $y=r\sin\theta$. Show $z_r^2+\dfrac{1}{r^2}z_\theta^2=f_x^2+f_y^2$.`,
        },
        answerText: R`由 $z_r=f_x\cos\theta+f_y\sin\theta$，$z_\theta=-rf_x\sin\theta+rf_y\cos\theta$，平方相加后交叉项抵消即得。`,
        idea: R`先用链式法则求 $z_r$、$z_\theta$，再平方相加。`,
        solution: [
          { math: R`z_r=f_x\cos\theta+f_y\sin\theta` },
          { math: R`z_\theta=-rf_x\sin\theta+rf_y\cos\theta` },
          { math: R`\begin{aligned}&z_r^2+\frac{1}{r^2}z_\theta^2\\&=f_x^2(\cos^2\theta+\sin^2\theta)+f_y^2(\sin^2\theta+\cos^2\theta)\\&=f_x^2+f_y^2\end{aligned}` },
          R`交叉项 $2f_xf_y\cos\theta\sin\theta$ 与 $-2f_xf_y\sin\theta\cos\theta$ 相互抵消。`,
        ],
        pitfalls: [R`$\dfrac{\partial x}{\partial\theta}=-r\sin\theta$，有因子 $r$，所以 $z_\theta^2$ 要除以 $r^2$。`],
        verify: {
          type: 'equal',
          lhs: 'simplify(diff((x**3+x*y**2).subs(x, r*cos(theta)).subs(y, r*sin(theta)), r)**2 + diff((x**3+x*y**2).subs(x, r*cos(theta)).subs(y, r*sin(theta)), theta)**2/r**2)',
          rhs: 'simplify(((3*x**2+y**2)**2+(2*x*y)**2).subs(x, r*cos(theta)).subs(y, r*sin(theta)))',
        },
      },
    ],
  },
  {
    id: 'calc.partial.laplacian-polar',
    name: { zh: '极坐标下的 Laplace 算子', ja: '極座標におけるラプラシアン', kana: 'きょくざひょうにおけるラプラシアン' },
    knowledge: ['calc.partial.k.chain', 'calc.partial.k.higher'],
    formula: R`f_{xx}+f_{yy}=z_{rr}+\frac1rz_r+\frac{1}{r^2}z_{\theta\theta}`,
    conditions: [R`$f$ 为 $C^2$ 级，$r>0$。`],
    scenarios: [R`只依赖 $r=\sqrt{x^2+y^2}$ 的函数（径向函数）；证明调和函数（$\Delta f=0$）。`],
    steps: [R`径向函数 $z=g(r)$：$\Delta f=g''(r)+\dfrac1rg'(r)$。`, R`一般情况：用链式法则求二阶偏导，或直接引用公式。`],
    pitfalls: [R`第二项系数是 $\dfrac1r$，第三项是 $\dfrac{1}{r^2}$。`],
    exercises: [
      {
        id: 'calc.partial.laplacian-polar.ex1',
        difficulty: '中',
        question: {
          zh: R`证明 $f(x,y)=\log\left(x^2+y^2\right)$ 满足 $f_{xx}+f_{yy}=0$（$(x,y)\neq(0,0)$）。`,
          ja: R`$f(x,y)=\log\left(x^2+y^2\right)$ は $f_{xx}+f_{yy}=0$ を満たすことを示せ（$(x,y)\neq(0,0)$）。`,
          en: R`Show that $f(x,y)=\log\left(x^2+y^2\right)$ satisfies $f_{xx}+f_{yy}=0$ for $(x,y)\neq(0,0)$.`,
        },
        answerText: R`极坐标下 $f=2\log r$，$z_{rr}+\dfrac1rz_r=-\dfrac{2}{r^2}+\dfrac{2}{r^2}=0$，且 $z_{\theta\theta}=0$。`,
        idea: R`$f$ 只依赖 $r$：$f=\log r^2=2\log r$。`,
        solution: [
          { math: R`z=2\log r,\qquad z_r=\frac2r` },
          { math: R`z_{rr}=-\frac{2}{r^2},\qquad z_{\theta\theta}=0` },
          { math: R`f_{xx}+f_{yy}=-\frac{2}{r^2}+\frac1r\cdot\frac2r+0=0` },
        ],
        pitfalls: [R`直接在直角坐标下计算也可以：$f_{xx}=\dfrac{2(y^2-x^2)}{(x^2+y^2)^2}$，$f_{yy}=\dfrac{2(x^2-y^2)}{(x^2+y^2)^2}$。`],
        verify: { type: 'equal', lhs: 'simplify(diff(log(x**2+y**2), x, 2)+diff(log(x**2+y**2), y, 2))', rhs: '0' },
      },
    ],
  },
  {
    id: 'calc.partial.implicit',
    name: { zh: '隐函数定理与求导', ja: '陰関数定理', kana: 'いんかんすうていり' },
    knowledge: ['calc.partial.k.partial'],
    formula: R`F(x,y)=0,\ F_y\neq0\ \Longrightarrow\ \frac{dy}{dx}=-\frac{F_x}{F_y}`,
    conditions: [R`$F$ 为 $C^1$ 级，在该点 $F_y\neq0$。`],
    scenarios: [R`方程确定的曲线的切线斜率；第 11 章条件极值的理论基础。`],
    steps: [R`把方程写成 $F(x,y)=0$。`, R`求 $F_x$、$F_y$。`, R`代入公式。`],
    pitfalls: [R`公式里有负号；不要写成 $\dfrac{F_y}{F_x}$。`],
    exercises: [
      {
        id: 'calc.partial.implicit.ex1',
        difficulty: '易',
        question: {
          zh: R`曲线 $x^3+y^3-3xy=0$ 上求 $\dfrac{dy}{dx}$。`,
          ja: R`曲線 $x^3+y^3-3xy=0$ について $\dfrac{dy}{dx}$ を求めよ。`,
          en: R`For the curve $x^3+y^3-3xy=0$, find $\dfrac{dy}{dx}$.`,
        },
        answer: R`\frac{dy}{dx}=\frac{y-x^2}{y^2-x}\qquad(y^2\neq x)`,
        idea: R`$F_x=3x^2-3y$，$F_y=3y^2-3x$。`,
        solution: [{ math: R`\frac{dy}{dx}=-\frac{3x^2-3y}{3y^2-3x}=\frac{y-x^2}{y^2-x}` }],
        pitfalls: [R`$F_y=0$ 的点（$y^2=x$）处公式不能用。`],
        verify: { type: 'equal', lhs: 'idiff(x**3+y**3-3*x*y, y, x)', rhs: '(y-x**2)/(y**2-x)' },
      },
    ],
  },
  {
    id: 'calc.partial.gradient',
    name: { zh: '梯度与方向导数', ja: '勾配と方向微分', kana: 'こうばいとほうこうびぶん' },
    knowledge: ['calc.partial.k.gradient'],
    formula: R`D_{\boldsymbol e}f=\nabla f\cdot\boldsymbol e=f_xe_1+f_ye_2\qquad(|\boldsymbol e|=1)`,
    conditions: [R`$f$ 全微分可能；$\boldsymbol e$ 是单位向量。`],
    scenarios: [R`沿指定方向的变化率；增长最快的方向与最大变化率 $|\nabla f|$。`],
    steps: [R`求梯度并代入点。`, R`把方向向量化成单位向量。`, R`取内积。`],
    pitfalls: [R`方向 $(3,4)$ 的单位向量是 $\left(\frac35,\frac45\right)$。`],
    exercises: [
      {
        id: 'calc.partial.gradient.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $f(x,y)=x^2+3xy$ 在点 $(1,2)$ 处沿向量 $(3,4)$ 方向的方向导数。`,
          ja: R`$f(x,y)=x^2+3xy$ の点 $(1,2)$ におけるベクトル $(3,4)$ 方向の方向微分係数を求めよ。`,
          en: R`Find the directional derivative of $f(x,y)=x^2+3xy$ at $(1,2)$ in the direction of $(3,4)$.`,
        },
        answer: R`\frac{36}{5}`,
        idea: R`$\nabla f(1,2)=(8,3)$，单位向量 $\left(\frac35,\frac45\right)$。`,
        solution: [
          { math: R`\nabla f=(2x+3y,\ 3x),\qquad\nabla f(1,2)=(8,\ 3)` },
          { math: R`D_{\boldsymbol e}f=8\cdot\frac35+3\cdot\frac45=\frac{24+12}{5}=\frac{36}{5}` },
        ],
        pitfalls: [R`直接用 $(3,4)$ 而不单位化会得到 $36$。`],
        verify: { type: 'equal', lhs: '(diff(x**2+3*x*y, x)*Rational(3,5)+diff(x**2+3*x*y, y)*Rational(4,5)).subs(x, 1).subs(y, 2)', rhs: 'Rational(36,5)' },
      },
    ],
  },
  {
    id: 'calc.partial.taylor2',
    name: { zh: '二元函数的 Taylor 展开', ja: '2 変数関数のテイラー展開', kana: 'にへんすうかんすうのテイラーてんかい' },
    knowledge: ['calc.partial.k.higher'],
    formula: R`\begin{aligned}&f(a+h,b+k)\\&\quad=f+hf_x+kf_y\\&\qquad+\frac12\left(h^2f_{xx}+2hkf_{xy}+k^2f_{yy}\right)\\&\qquad+\cdots\end{aligned}`,
    conditions: [R`右边的 $f$ 及其偏导数都在 $(a,b)$ 处取值；$f$ 为 $C^3$ 级。`],
    scenarios: [R`二次近似；第 11 章用二次项判断极值（Hesse 矩阵的来源）。`],
    steps: [R`计算 $(a,b)$ 处的一阶、二阶偏导数。`, R`代入公式（$h=x-a$，$k=y-b$）。`, R`也可以把一元的展开式组合起来。`],
    pitfalls: [R`交叉项系数是 $2hk\cdot\dfrac12=hk$，不要漏掉 2。`],
    exercises: [
      {
        id: 'calc.partial.taylor2.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $f(x,y)=e^{x}\cos y$ 在原点展开到二次项。`,
          ja: R`$f(x,y)=e^{x}\cos y$ を原点のまわりで 2 次の項までテイラー展開せよ。`,
          en: R`Expand $f(x,y)=e^{x}\cos y$ about the origin up to second-order terms.`,
        },
        answer: R`e^{x}\cos y=1+x+\frac12\left(x^2-y^2\right)+\cdots`,
        idea: R`把 $e^x$ 与 $\cos y$ 的展开相乘最快。`,
        solution: [
          { math: R`\begin{aligned}&\left(1+x+\frac{x^2}{2}+\cdots\right)\left(1-\frac{y^2}{2}+\cdots\right)\\&\quad=1+x+\frac{x^2}{2}-\frac{y^2}{2}+\cdots\end{aligned}` },
          R`用公式检查：$f=1$，$f_x=1$，$f_y=0$，$f_{xx}=1$，$f_{xy}=0$，$f_{yy}=-1$。`,
        ],
        pitfalls: [R`二次项只保留次数之和 $\le2$ 的项。`],
        verify: { type: 'equal', lhs: 'series(exp(t*x)*cos(t*y), t, 0, 3).removeO().subs(t, 1)', rhs: '1+x+(x**2-y**2)/2' },
      },
    ],
  },
];

export const partialChapter = {
  overview: '偏导数与高阶偏导数、多变量链式法则（含极坐标下的变换）、隐函数定理、梯度与方向导数、二元 Taylor 展开。',
  sections: [
    { title: '偏导数', knowledge: [K.partial, K.higher], formulas: basicCards },
    { title: '链式法则与隐函数', knowledge: [K.chain], formulas: chainCards.slice(0, 4) },
    { title: '梯度与 Taylor 展开', knowledge: [K.gradient], formulas: chainCards.slice(4) },
  ],
};
