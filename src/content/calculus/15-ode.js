// 第 15 章 微分方程基础
const R = String.raw;

const K = {
  basics: {
    id: 'calc.ode.k.basics',
    name: { zh: '微分方程的基本概念', ja: '微分方程式の基本事項', kana: 'びぶんほうていしきのきほんじこう' },
    paragraphs: [
      R`含未知函数的导数的方程称为**微分方程**。方程中最高阶导数的阶数称为**阶**（階数）。`,
      R`含有与阶数个数相同的任意常数的解叫**一般解**（一般解）；由初始条件确定常数后的解叫**特解**（特殊解）。`,
    ],
    definitions: [R`F\left(x,\ y,\ y',\ \dots,\ y^{(n)}\right)=0`],
    conditions: [R`验算方法：把解代回方程，看是否恒成立。`],
    theorems: [],
    related: ['calc.ode.k.linear'],
  },
  linear: {
    id: 'calc.ode.k.linear',
    name: { zh: '线性微分方程与解的结构', ja: '線形微分方程式と解の構造', kana: 'せんけいびぶんほうていしきとかいのこうぞう' },
    paragraphs: [
      R`$y$ 及其导数都以一次形式出现的方程称为**线性**。右边为 0 的叫**齐次**（斉次），否则叫**非齐次**（非斉次）。`,
      R`非齐次方程的一般解 = 齐次方程的一般解 + 非齐次方程的一个特解。`,
    ],
    definitions: [R`y=y_{\text{齐次}}+y_{\text{特解}}`],
    conditions: [R`二阶常系数齐次方程 $y''+py'+qy=0$ 的解由特征方程 $\lambda^2+p\lambda+q=0$ 的根决定。`],
    theorems: [R`齐次线性方程的解的线性组合仍是解（叠加原理）。`],
    related: ['calc.ode.k.basics'],
  },
};

const cards = [
  {
    id: 'calc.ode.separable',
    name: { zh: '变量分离型', ja: '変数分離形', kana: 'へんすうぶんりけい' },
    knowledge: ['calc.ode.k.basics'],
    formula: R`\frac{dy}{dx}=f(x)g(y)\ \Longrightarrow\ \int\frac{dy}{g(y)}=\int f(x)\,dx`,
    conditions: [R`$g(y)\neq0$；$g(y_0)=0$ 的常数解 $y=y_0$ 要另外检查。`],
    scenarios: [R`右边能写成「只含 $x$ 的式子 × 只含 $y$ 的式子」。`],
    steps: [R`把 $y$ 移到左边、$x$ 移到右边。`, R`两边积分（只在一边加常数）。`, R`整理成 $y=\cdots$；用初始条件定常数。`],
    pitfalls: [R`$\log|y|=\cdots+C$ 化为 $y=C'e^{\cdots}$ 时，常数 $C'=\pm e^{C}$（也包含 $0$）。`],
    exercises: [
      {
        id: 'calc.ode.separable.ex1',
        difficulty: '易',
        question: {
          zh: R`解微分方程 $y'=xy$。`,
          ja: R`微分方程式 $y'=xy$ を解け。`,
          en: R`Solve the differential equation $y'=xy$.`,
        },
        answer: R`y=Ce^{\frac{x^2}{2}}\qquad(C\ \text{为任意常数})`,
        idea: R`$\dfrac{dy}{y}=x\,dx$。`,
        solution: [
          { math: R`\int\frac{dy}{y}=\int x\,dx\ \Longrightarrow\ \log|y|=\frac{x^2}{2}+C_1` },
          R`所以 $y=\pm e^{C_1}e^{\frac{x^2}{2}}$，令 $C=\pm e^{C_1}$；$y=0$ 也是解，对应 $C=0$。`,
        ],
        pitfalls: [R`常数解 $y=0$ 被包含在 $C=0$ 中。`],
        verify: { type: 'ode', ode: 'Eq(diff(y(x),x), x*y(x))', solution: 'Eq(y(x), C*exp(x**2/2))' },
      },
      {
        id: 'calc.ode.separable.ex2',
        difficulty: '易',
        question: {
          zh: R`解初值问题 $y'=y^2$，$y(0)=1$。`,
          ja: R`初期値問題 $y'=y^2$，$y(0)=1$ を解け。`,
          en: R`Solve the initial value problem $y'=y^2$, $y(0)=1$.`,
        },
        answer: R`y=\frac{1}{1-x}`,
        idea: R`$\dfrac{dy}{y^2}=dx$。`,
        solution: [
          { math: R`\int\frac{dy}{y^2}=\int dx\ \Longrightarrow\ -\frac1y=x+C` },
          R`$y(0)=1$ 代入得 $C=-1$，所以 $y=\dfrac{1}{1-x}$。`,
        ],
        pitfalls: [R`解在 $x=1$ 处发散，定义区间是 $x<1$。`],
        verify: { type: 'ode', ode: 'Eq(diff(y(x),x), y(x)**2)', solution: 'Eq(y(x), 1/(1-x))' },
      },
    ],
  },
  {
    id: 'calc.ode.homogeneous',
    name: { zh: '齐次型（y′ = f(y/x)）', ja: '同次形', kana: 'どうじけい' },
    knowledge: ['calc.ode.k.basics'],
    formula: R`\frac{dy}{dx}=f\!\left(\frac yx\right)\ \xrightarrow{\ u=\frac yx\ }\ x\frac{du}{dx}=f(u)-u`,
    conditions: [R`右边只依赖 $\dfrac yx$。`],
    scenarios: [R`$y'=\dfrac{x+y}{x}$、$y'=\dfrac{x^2+y^2}{xy}$ 等。`],
    steps: [R`令 $y=ux$，则 $y'=u+xu'$。`, R`代入得变量分离型方程。`, R`解出 $u$ 后换回 $y=ux$。`],
    pitfalls: [R`$y'$ 换成 $u+xu'$，不是 $u'$。`],
    exercises: [
      {
        id: 'calc.ode.homogeneous.ex1',
        difficulty: '中',
        question: {
          zh: R`解微分方程 $y'=\dfrac{x+y}{x}$（$x>0$）。`,
          ja: R`微分方程式 $y'=\dfrac{x+y}{x}$（$x>0$）を解け。`,
          en: R`Solve $y'=\dfrac{x+y}{x}$ for $x>0$.`,
        },
        answer: R`y=x\left(\log x+C\right)`,
        idea: R`$y'=1+\dfrac yx$，令 $u=\dfrac yx$。`,
        solution: [
          { math: R`u+xu'=1+u\ \Longrightarrow\ u'=\frac1x` },
          { math: R`\Longrightarrow\ u=\log x+C` },
          R`所以 $y=ux=x(\log x+C)$。`,
        ],
        pitfalls: [R`这个方程也是一阶线性方程 $y'-\dfrac1xy=1$，两种方法可互相检查。`],
        verify: { type: 'ode', ode: 'Eq(diff(y(x),x), (x+y(x))/x)', solution: 'Eq(y(x), x*(log(x)+C))' },
      },
    ],
  },
  {
    id: 'calc.ode.first-linear',
    name: { zh: '一阶线性微分方程', ja: '1 階線形微分方程式', kana: 'いっかいせんけいびぶんほうていしき' },
    knowledge: ['calc.ode.k.linear'],
    formula: R`\begin{gathered}y'+P(x)y=Q(x)\\y=e^{-\int P\,dx}\left(\int Q\,e^{\int P\,dx}\,dx+C\right)\end{gathered}`,
    conditions: [R`$P$、$Q$ 连续。公式中的不定积分不必加常数（只在最后加一个 $C$）。`],
    scenarios: [R`$y$ 与 $y'$ 都是一次，且系数只依赖 $x$。`],
    steps: [R`化成标准形 $y'+Py=Q$。`, R`求积分因子 $e^{\int P\,dx}$。`, R`代入公式（或常数变易法）。`],
    pitfalls: [R`先把 $y'$ 的系数化为 1。`],
    exercises: [
      {
        id: 'calc.ode.first-linear.ex1',
        difficulty: '易',
        question: {
          zh: R`解微分方程 $y'+y=x$。`,
          ja: R`微分方程式 $y'+y=x$ を解け。`,
          en: R`Solve $y'+y=x$.`,
        },
        answer: R`y=x-1+Ce^{-x}`,
        idea: R`$P=1$，积分因子 $e^{x}$。`,
        solution: [
          { math: R`\left(ye^{x}\right)'=xe^{x}\ \Longrightarrow\ ye^{x}=(x-1)e^{x}+C` },
          R`所以 $y=x-1+Ce^{-x}$。`,
        ],
        pitfalls: [R`$\displaystyle\int xe^xdx=(x-1)e^x$ 用分部积分。`],
        verify: { type: 'ode', ode: 'Eq(diff(y(x),x)+y(x), x)', solution: 'Eq(y(x), x-1+C*exp(-x))' },
      },
      {
        id: 'calc.ode.first-linear.ex2',
        difficulty: '中',
        question: {
          zh: R`解微分方程 $y'-\dfrac{2}{x}y=x^3$（$x>0$）。`,
          ja: R`微分方程式 $y'-\dfrac{2}{x}y=x^3$（$x>0$）を解け。`,
          en: R`Solve $y'-\dfrac{2}{x}y=x^3$ for $x>0$.`,
        },
        answer: R`y=\frac{x^4}{2}+Cx^2`,
        idea: R`$P=-\dfrac2x$，$e^{\int P}=e^{-2\log x}=\dfrac{1}{x^2}$。`,
        solution: [
          { math: R`\left(\frac{y}{x^2}\right)'=x^3\cdot\frac{1}{x^2}=x\ \Longrightarrow\ \frac{y}{x^2}=\frac{x^2}{2}+C` },
          R`所以 $y=\dfrac{x^4}{2}+Cx^2$。`,
        ],
        pitfalls: [R`$e^{-2\log x}=x^{-2}$。`],
        verify: { type: 'ode', ode: 'Eq(diff(y(x),x)-2*y(x)/x, x**3)', solution: 'Eq(y(x), x**4/2+C*x**2)' },
      },
    ],
  },
  {
    id: 'calc.ode.bernoulli',
    name: { zh: 'Bernoulli 方程', ja: 'ベルヌーイの微分方程式', kana: 'ベルヌーイのびぶんほうていしき' },
    knowledge: ['calc.ode.k.linear'],
    formula: R`\begin{gathered}y'+P(x)y=Q(x)y^n\\\xrightarrow{\ u=y^{1-n}\ }\ u'+(1-n)Pu=(1-n)Q\end{gathered}`,
    conditions: [R`$n\neq0,1$。`],
    scenarios: [R`一阶方程中右边含 $y^2$、$y^3$ 等。`],
    steps: [R`两边除以 $y^n$。`, R`令 $u=y^{1-n}$，化为关于 $u$ 的一阶线性方程。`, R`解出 $u$ 再换回 $y$。`],
    pitfalls: [R`$y=0$ 也可能是解。`],
    exercises: [
      {
        id: 'calc.ode.bernoulli.ex1',
        difficulty: '难',
        question: {
          zh: R`解微分方程 $y'+\dfrac{1}{x}y=x^2y^2$（$x>0$）。`,
          ja: R`微分方程式 $y'+\dfrac{1}{x}y=x^2y^2$（$x>0$）を解け。`,
          en: R`Solve $y'+\dfrac{1}{x}y=x^2y^2$ for $x>0$.`,
        },
        answer: R`y=\frac{1}{Cx-\dfrac{x^3}{2}}\qquad(\text{及}\ y=0)`,
        idea: R`$n=2$，令 $u=y^{-1}$。`,
        solution: [
          R`除以 $y^2$：$y^{-2}y'+\dfrac1xy^{-1}=x^2$。令 $u=y^{-1}$，$u'=-y^{-2}y'$：`,
          { math: R`u'-\frac1xu=-x^2` },
          R`积分因子 $\dfrac1x$：$\left(\dfrac ux\right)'=-x$，$\dfrac ux=-\dfrac{x^2}{2}+C$，$u=Cx-\dfrac{x^3}{2}$。`,
        ],
        pitfalls: [R`$u'=-y^{-2}y'$，代入时符号会翻转。`],
        verify: { type: 'ode', ode: 'Eq(diff(y(x),x)+y(x)/x, x**2*y(x)**2)', solution: 'Eq(y(x), 1/(C*x-x**3/2))' },
      },
    ],
  },
  {
    id: 'calc.ode.exact',
    name: { zh: '完全微分方程', ja: '完全微分方程式', kana: 'かんぜんびぶんほうていしき' },
    knowledge: ['calc.ode.k.basics', 'calc.total.k.differentiable'],
    formula: R`\begin{gathered}P\,dx+Q\,dy=0,\quad P_y=Q_x\\\Longrightarrow\ F(x,y)=C,\quad F_x=P,\ F_y=Q\end{gathered}`,
    conditions: [R`$P_y=Q_x$（完全性条件）。`],
    scenarios: [R`方程写成 $P\,dx+Q\,dy=0$ 的形式。`],
    steps: [R`检查 $P_y=Q_x$。`, R`对 $P$ 关于 $x$ 积分：$F=\displaystyle\int P\,dx+g(y)$。`, R`由 $F_y=Q$ 求 $g(y)$。`],
    pitfalls: [R`$g(y)$ 不要漏，它决定只含 $y$ 的项。`],
    exercises: [
      {
        id: 'calc.ode.exact.ex1',
        difficulty: '中',
        question: {
          zh: R`解微分方程 $(2xy+1)\,dx+\left(x^2+2y\right)dy=0$。`,
          ja: R`微分方程式 $(2xy+1)\,dx+\left(x^2+2y\right)dy=0$ を解け。`,
          en: R`Solve $(2xy+1)\,dx+\left(x^2+2y\right)dy=0$.`,
        },
        answer: R`x^2y+x+y^2=C`,
        idea: R`$P_y=2x=Q_x$，是完全微分方程。`,
        solution: [
          { math: R`F=\int(2xy+1)\,dx=x^2y+x+g(y)` },
          { math: R`F_y=x^2+g'(y)=x^2+2y\ \Longrightarrow\ g(y)=y^2` },
          R`所以一般解为 $x^2y+x+y^2=C$。`,
        ],
        pitfalls: [R`检验：对 $F$ 求全微分应恰好回到原方程。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'diff(2*x*y+1, y)', rhs: 'diff(x**2+2*y, x)' },
            { type: 'equal', lhs: 'diff(x**2*y+x+y**2, x)', rhs: '2*x*y+1' },
            { type: 'equal', lhs: 'diff(x**2*y+x+y**2, y)', rhs: 'x**2+2*y' },
          ],
        },
      },
    ],
  },
  {
    id: 'calc.ode.second-homogeneous',
    name: { zh: '二阶常系数齐次线性方程', ja: '定数係数 2 階線形斉次微分方程式', kana: 'ていすうけいすうにかいせんけいせいじびぶんほうていしき' },
    knowledge: ['calc.ode.k.linear'],
    formula: [
      R`y''+py'+qy=0,\qquad\lambda^2+p\lambda+q=0`,
      R`\begin{gathered}\lambda_1\neq\lambda_2\ (\text{实根})\\y=C_1e^{\lambda_1x}+C_2e^{\lambda_2x}\end{gathered}`,
      R`\begin{gathered}\lambda_1=\lambda_2=\lambda\ (\text{重根})\\y=(C_1+C_2x)e^{\lambda x}\end{gathered}`,
      R`\begin{gathered}\lambda=\alpha\pm\beta i\ (\text{虚根})\\y=e^{\alpha x}(C_1\cos\beta x+C_2\sin\beta x)\end{gathered}`,
    ],
    conditions: [R`$p,q$ 为常数。`],
    scenarios: [R`振动、衰减等常系数二阶方程。`],
    steps: [R`写出特征方程，求根。`, R`按根的三种情形写出一般解。`, R`有初始条件时代入求 $C_1,C_2$。`],
    pitfalls: [R`重根时第二个解要乘 $x$。`],
    exercises: [
      {
        id: 'calc.ode.second-homogeneous.ex1',
        difficulty: '易',
        question: {
          zh: R`解微分方程 $y''-3y'+2y=0$。`,
          ja: R`微分方程式 $y''-3y'+2y=0$ を解け。`,
          en: R`Solve $y''-3y'+2y=0$.`,
        },
        answer: R`y=C_1e^{x}+C_2e^{2x}`,
        idea: R`特征方程 $\lambda^2-3\lambda+2=0$，$\lambda=1,2$。`,
        solution: [{ math: R`(\lambda-1)(\lambda-2)=0\ \Longrightarrow\ y=C_1e^{x}+C_2e^{2x}` }],
        pitfalls: [R`两个不同实根：指数函数的线性组合。`],
        verify: { type: 'ode', ode: 'Eq(diff(y(x),x,2)-3*diff(y(x),x)+2*y(x), 0)', solution: 'Eq(y(x), C1*exp(x)+C2*exp(2*x))' },
      },
      {
        id: 'calc.ode.second-homogeneous.ex2',
        difficulty: '易',
        question: {
          zh: R`解微分方程 $y''-4y'+4y=0$。`,
          ja: R`微分方程式 $y''-4y'+4y=0$ を解け。`,
          en: R`Solve $y''-4y'+4y=0$.`,
        },
        answer: R`y=(C_1+C_2x)e^{2x}`,
        idea: R`特征方程有重根 $\lambda=2$。`,
        solution: [{ math: R`(\lambda-2)^2=0\ \Longrightarrow\ y=(C_1+C_2x)e^{2x}` }],
        pitfalls: [R`只写 $Ce^{2x}$ 会少一个独立解。`],
        verify: { type: 'ode', ode: 'Eq(diff(y(x),x,2)-4*diff(y(x),x)+4*y(x), 0)', solution: 'Eq(y(x), (C1+C2*x)*exp(2*x))' },
      },
      {
        id: 'calc.ode.second-homogeneous.ex3',
        difficulty: '易',
        question: {
          zh: R`解微分方程 $y''+2y'+5y=0$。`,
          ja: R`微分方程式 $y''+2y'+5y=0$ を解け。`,
          en: R`Solve $y''+2y'+5y=0$.`,
        },
        answer: R`y=e^{-x}\left(C_1\cos2x+C_2\sin2x\right)`,
        idea: R`特征根 $\lambda=-1\pm2i$。`,
        solution: [
          { math: R`\lambda=\frac{-2\pm\sqrt{4-20}}{2}=-1\pm2i` },
          { math: R`y=e^{-x}\left(C_1\cos2x+C_2\sin2x\right)` },
        ],
        pitfalls: [R`实部 $-1$ 进指数，虚部 $2$ 进三角函数。`],
        verify: { type: 'ode', ode: 'Eq(diff(y(x),x,2)+2*diff(y(x),x)+5*y(x), 0)', solution: 'Eq(y(x), exp(-x)*(C1*cos(2*x)+C2*sin(2*x)))' },
      },
    ],
  },
  {
    id: 'calc.ode.undetermined',
    name: { zh: '二阶非齐次方程（待定系数法）', ja: '未定係数法', kana: 'みていけいすうほう' },
    knowledge: ['calc.ode.k.linear'],
    formula: R`\begin{gathered}y''+py'+qy=R(x)\\y=y_{\text{齐次}}+y_{\text{特解}}\end{gathered}`,
    conditions: [R`$R(x)$ 为多项式、$e^{ax}$、$\sin bx$、$\cos bx$ 及它们的积。`],
    scenarios: [R`右边：多项式 → 设同次多项式；$e^{ax}$ → 设 $Ae^{ax}$；$\sin bx$ → 设 $A\cos bx+B\sin bx$。`],
    steps: [R`先求齐次方程的一般解。`, R`按右边的形式设特解，若与齐次解重复则乘 $x$（重根乘 $x^2$）。`, R`代入比较系数求待定系数。`],
    pitfalls: [R`「共振」：$e^{ax}$ 中的 $a$ 是特征根时，必须设 $Axe^{ax}$。`],
    exercises: [
      {
        id: 'calc.ode.undetermined.ex1',
        difficulty: '中',
        question: {
          zh: R`解微分方程 $y''-3y'+2y=4x$。`,
          ja: R`微分方程式 $y''-3y'+2y=4x$ を解け。`,
          en: R`Solve $y''-3y'+2y=4x$.`,
        },
        answer: R`y=C_1e^{x}+C_2e^{2x}+2x+3`,
        idea: R`设特解 $y_p=ax+b$。`,
        solution: [
          { math: R`y_p''-3y_p'+2y_p=-3a+2ax+2b=4x` },
          R`比较系数：$2a=4$，$-3a+2b=0$，得 $a=2$，$b=3$。加上齐次解即得。`,
        ],
        pitfalls: [R`常数项 $-3a+2b=0$ 不要漏。`],
        verify: { type: 'ode', ode: 'Eq(diff(y(x),x,2)-3*diff(y(x),x)+2*y(x), 4*x)', solution: 'Eq(y(x), C1*exp(x)+C2*exp(2*x)+2*x+3)' },
      },
      {
        id: 'calc.ode.undetermined.ex2',
        difficulty: '中',
        question: {
          zh: R`解微分方程 $y''-y=e^{x}$。`,
          ja: R`微分方程式 $y''-y=e^{x}$ を解け。`,
          en: R`Solve $y''-y=e^{x}$.`,
        },
        answer: R`y=C_1e^{x}+C_2e^{-x}+\frac{x}{2}e^{x}`,
        idea: R`$1$ 是特征根（共振），设 $y_p=Axe^{x}$。`,
        solution: [
          { math: R`y_p'=A(1+x)e^{x},\qquad y_p''=A(2+x)e^{x}` },
          { math: R`y_p''-y_p=2Ae^{x}=e^{x}\ \Longrightarrow\ A=\frac12` },
        ],
        pitfalls: [R`设 $Ae^x$ 代入会得到 $0=e^x$，矛盾；这就是需要乘 $x$ 的原因。`],
        verify: { type: 'ode', ode: 'Eq(diff(y(x),x,2)-y(x), exp(x))', solution: 'Eq(y(x), C1*exp(x)+C2*exp(-x)+x*exp(x)/2)' },
      },
    ],
  },
  {
    id: 'calc.ode.initial-value',
    name: { zh: '初值问题', ja: '初期値問題', kana: 'しょきちもんだい' },
    knowledge: ['calc.ode.k.basics'],
    formula: R`\begin{gathered}y(x_0)=y_0,\quad y'(x_0)=y_1\\\Longrightarrow\ C_1,\ C_2\ \text{唯一确定}\end{gathered}`,
    conditions: [R`$n$ 阶方程需要 $n$ 个初始条件。`],
    scenarios: [R`题目给出 $y(0)$、$y'(0)$ 等条件。`],
    steps: [R`先求一般解。`, R`求导后代入初始条件。`, R`解关于 $C_1,C_2$ 的方程组。`],
    pitfalls: [R`要用一般解求导后再代入 $y'(x_0)$。`],
    exercises: [
      {
        id: 'calc.ode.initial-value.ex1',
        difficulty: '易',
        question: {
          zh: R`解初值问题 $y''+y=0$，$y(0)=1$，$y'(0)=2$。`,
          ja: R`初期値問題 $y''+y=0$，$y(0)=1$，$y'(0)=2$ を解け。`,
          en: R`Solve $y''+y=0$ with $y(0)=1$, $y'(0)=2$.`,
        },
        answer: R`y=\cos x+2\sin x`,
        idea: R`一般解 $y=C_1\cos x+C_2\sin x$。`,
        solution: [
          R`$y(0)=C_1=1$；$y'=-C_1\sin x+C_2\cos x$，$y'(0)=C_2=2$。`,
          { math: R`y=\cos x+2\sin x` },
        ],
        pitfalls: [R`特征根 $\pm i$，实部为 0，所以没有指数因子。`],
        verify: {
          type: 'all',
          items: [
            { type: 'ode', ode: 'Eq(diff(y(x),x,2)+y(x), 0)', solution: 'Eq(y(x), cos(x)+2*sin(x))' },
            { type: 'equal', lhs: '(cos(x)+2*sin(x)).subs(x, 0)', rhs: '1' },
            { type: 'equal', lhs: 'diff(cos(x)+2*sin(x), x).subs(x, 0)', rhs: '2' },
          ],
        },
      },
    ],
  },
];

export const odeChapter = {
  overview: '一阶方程：变量分离型、齐次型、一阶线性、Bernoulli、完全微分方程；二阶常系数线性方程：齐次（三种特征根）、非齐次（待定系数法，含共振）、初值问题。',
  sections: [
    { title: '一阶微分方程', knowledge: [K.basics], formulas: cards.slice(0, 5) },
    { title: '二阶常系数线性方程', knowledge: [K.linear], formulas: cards.slice(5) },
  ],
};
