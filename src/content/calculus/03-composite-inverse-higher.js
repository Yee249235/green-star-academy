// 第 3 章 合成函数、逆函数、高阶导数
const R = String.raw;

const K = {
  composite: {
    id: 'calc.chain.k.composite',
    name: { zh: '复合函数', ja: '合成関数', kana: 'ごうせいかんすう' },
    paragraphs: [
      R`$y=f(u)$，$u=g(x)$ 时，$y=f(g(x))$ 称为 $f$ 与 $g$ 的**复合函数**（合成関数），记作 $(f\circ g)(x)$。`,
      R`求导时把「外层函数」和「内层函数」分开：外层对内层求导，再乘内层对 $x$ 的导数。`,
    ],
    definitions: [R`\frac{dy}{dx}=\frac{dy}{du}\cdot\frac{du}{dx}`],
    conditions: [R`$g$ 在 $x$ 可微，$f$ 在 $u=g(x)$ 可微。`],
    theorems: [R`多层复合时逐层相乘：$\dfrac{dy}{dx}=\dfrac{dy}{du}\cdot\dfrac{du}{dv}\cdot\dfrac{dv}{dx}$。`],
    related: ['calc.deriv.k.definition'],
  },
  inverse: {
    id: 'calc.chain.k.inverse',
    name: { zh: '反函数', ja: '逆関数', kana: 'ぎゃくかんすう' },
    paragraphs: [
      R`$y=f(x)$ 单调时，对每个 $y$ 只有一个 $x$ 与之对应，由此得到的函数 $x=f^{-1}(y)$ 称为**反函数**（逆関数）。图像关于直线 $y=x$ 对称。`,
      R`反三角函数 $\arcsin$、$\arccos$、$\arctan$ 都是在限定区间上取的反函数（主值）。`,
    ],
    definitions: [R`\frac{dx}{dy}=\frac{1}{\dfrac{dy}{dx}}\qquad\left(\frac{dy}{dx}\neq0\right)`],
    conditions: [R`$f$ 在区间上连续、严格单调且 $f'(x)\neq0$。`],
    theorems: [R`$\left(f^{-1}\right)'(b)=\dfrac{1}{f'(a)}$，其中 $b=f(a)$。`],
    related: ['calc.chain.k.composite'],
  },
  higher: {
    id: 'calc.chain.k.higher',
    name: { zh: '高阶导数', ja: '高次導関数', kana: 'こうじどうかんすう' },
    paragraphs: [
      R`对导函数再求导得到二阶导数 $f''(x)$，一般地 $n$ 次求导得到 $n$ 阶导数 $f^{(n)}(x)$，也写作 $\dfrac{d^ny}{dx^n}$。`,
      R`求 $n$ 阶导数的常用方法：先算 1～3 阶找规律再写一般式；拆成部分分式；用 Leibniz 公式。`,
    ],
    definitions: [R`f^{(n)}(x)=\frac{d}{dx}f^{(n-1)}(x),\qquad f^{(0)}(x)=f(x)`],
    conditions: [R`$n$ 阶导数存在且连续的函数称为 $C^n$ 级函数。`],
    theorems: [R`$n$ 阶导数是线性的：$(af+bg)^{(n)}=af^{(n)}+bg^{(n)}$。`],
    related: ['calc.deriv.k.definition'],
  },
};

const chainCards = [
  {
    id: 'calc.chain.chain-rule',
    name: { zh: '链式法则（复合函数求导）', ja: '合成関数の微分法', kana: 'ごうせいかんすうのびぶんほう' },
    knowledge: ['calc.chain.k.composite'],
    formula: R`\bigl\{f(g(x))\bigr\}'=f'(g(x))\,g'(x)`,
    conditions: [R`内外两层都可微。`],
    scenarios: [R`$\sin(x^2+1)$、$e^{-x^2}$、$\sqrt{1+x^2}$、$\log(\cdots)$ 等「函数里面套着式子」。`],
    steps: [R`找出内层 $u=g(x)$。`, R`外层对 $u$ 求导（内层原样保留）。`, R`乘上内层的导数 $g'(x)$。`],
    pitfalls: [R`最常见的错误是漏乘内层导数。`, R`$\left(\log f(x)\right)'=\dfrac{f'(x)}{f(x)}$ 是链式法则的特例，非常常用。`],
    exercises: [
      {
        id: 'calc.chain.chain-rule.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $y=\sin\left(x^2+1\right)$ 的导数。`,
          ja: R`$y=\sin\left(x^2+1\right)$ を微分せよ。`,
          en: R`Differentiate $y=\sin\left(x^2+1\right)$.`,
        },
        answer: R`y'=2x\cos\left(x^2+1\right)`,
        idea: R`外层 $\sin u$，内层 $u=x^2+1$。`,
        solution: [{ math: R`y'=\cos\left(x^2+1\right)\cdot\left(x^2+1\right)'=2x\cos\left(x^2+1\right)` }],
        pitfalls: [R`不要写成 $\cos(2x)$：外层求导时内层原样保留。`],
        verify: { type: 'equal', lhs: 'diff(sin(x**2+1), x)', rhs: '2*x*cos(x**2+1)' },
      },
      {
        id: 'calc.chain.chain-rule.ex2',
        difficulty: '中',
        question: {
          zh: R`求 $y=\log\left(x+\sqrt{x^2+1}\right)$ 的导数。`,
          ja: R`$y=\log\left(x+\sqrt{x^2+1}\right)$ を微分せよ。`,
          en: R`Differentiate $y=\log\left(x+\sqrt{x^2+1}\right)$.`,
        },
        answer: R`y'=\frac{1}{\sqrt{x^2+1}}`,
        idea: R`$(\log u)'=\dfrac{u'}{u}$，其中 $\left(\sqrt{x^2+1}\right)'$ 再用一次链式法则。`,
        solution: [
          { math: R`u'=1+\frac{2x}{2\sqrt{x^2+1}}=\frac{\sqrt{x^2+1}+x}{\sqrt{x^2+1}}` },
          { math: R`\begin{aligned}y'=\frac{u'}{u}&=\frac{\sqrt{x^2+1}+x}{\sqrt{x^2+1}}\cdot\frac{1}{x+\sqrt{x^2+1}}\\[4pt]&=\frac{1}{\sqrt{x^2+1}}\end{aligned}` },
        ],
        pitfalls: [R`这个结果说明 $\displaystyle\int\frac{dx}{\sqrt{x^2+1}}=\log\left(x+\sqrt{x^2+1}\right)+C$，第 6 章会用到。`],
        verify: { type: 'equal', lhs: 'diff(log(x+sqrt(x**2+1)), x)', rhs: '1/sqrt(x**2+1)' },
      },
    ],
  },
  {
    id: 'calc.chain.inverse-derivative',
    name: { zh: '反函数的求导', ja: '逆関数の微分法', kana: 'ぎゃくかんすうのびぶんほう' },
    knowledge: ['calc.chain.k.inverse'],
    formula: R`\left(f^{-1}\right)'(b)=\frac{1}{f'(a)}\qquad(b=f(a))`,
    conditions: [R`$f$ 单调、可微，且 $f'(a)\neq0$。`],
    scenarios: [R`反函数写不出显式表达式时，求它在某点的导数。`],
    steps: [R`由 $f(a)=b$ 找出对应的 $a$。`, R`计算 $f'(a)$。`, R`取倒数。`],
    pitfalls: [R`是 $f'(a)$ 的倒数，不是 $f'(b)$ 的倒数。`],
    exercises: [
      {
        id: 'calc.chain.inverse-derivative.ex1',
        difficulty: '中',
        question: {
          zh: R`设 $f(x)=x^3+x$，$g$ 为 $f$ 的反函数。求 $g'(2)$。`,
          ja: R`$f(x)=x^3+x$ の逆関数を $g$ とする。$g'(2)$ を求めよ。`,
          en: R`Let $g$ be the inverse function of $f(x)=x^3+x$. Find $g'(2)$.`,
        },
        answer: R`g'(2)=\frac{1}{4}`,
        idea: R`$f(1)=2$，所以 $g'(2)=\dfrac{1}{f'(1)}$。`,
        solution: [
          R`$f'(x)=3x^2+1>0$，$f$ 单调增加，反函数存在。由 $f(1)=1+1=2$ 得 $a=1$：`,
          { math: R`g'(2)=\frac{1}{f'(1)}=\frac{1}{3+1}=\frac{1}{4}` },
        ],
        pitfalls: [R`不需要求出 $g$ 的表达式（三次方程的反函数很难写）。`],
        verify: { type: 'equal', lhs: '1/diff(x**3+x, x).subs(x, 1)', rhs: 'Rational(1,4)' },
      },
    ],
  },
  {
    id: 'calc.chain.log-differentiation',
    name: { zh: '对数求导法', ja: '対数微分法', kana: 'たいすうびぶんほう' },
    knowledge: ['calc.chain.k.composite'],
    formula: R`\frac{y'}{y}=\bigl(\log|y|\bigr)'\quad\Longrightarrow\quad y'=y\,\bigl(\log|y|\bigr)'`,
    conditions: [R`$y\neq0$ 的点。`],
    scenarios: [R`幂指函数 $x^x$、$x^{\sin x}$；多个因子的积、商、幂。`],
    steps: [R`两边取对数，把积、商、幂化成和、差、倍数。`, R`两边对 $x$ 求导，左边是 $\dfrac{y'}{y}$。`, R`两边乘 $y$。`],
    pitfalls: [R`$x^x$ 既不是幂函数也不是指数函数，不能套 $(x^n)'$ 或 $(a^x)'$。`],
    exercises: [
      {
        id: 'calc.chain.log-differentiation.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $y=x^{x}$（$x>0$）的导数。`,
          ja: R`$y=x^{x}$（$x>0$）を微分せよ。`,
          en: R`Differentiate $y=x^{x}$ for $x>0$.`,
        },
        answer: R`y'=x^{x}\left(\log x+1\right)`,
        idea: R`取对数：$\log y=x\log x$。`,
        solution: [
          { math: R`\log y=x\log x\ \Longrightarrow\ \frac{y'}{y}=\log x+1` },
          { math: R`y'=x^{x}\left(\log x+1\right)` },
        ],
        pitfalls: [R`也可以写成 $x^x=e^{x\log x}$ 再用链式法则，结果相同。`],
        verify: { type: 'equal', lhs: 'diff(x**x, x)', rhs: 'x**x*(log(x)+1)' },
      },
      {
        id: 'calc.chain.log-differentiation.ex2',
        difficulty: '中',
        question: {
          zh: R`求 $y=\dfrac{(x+1)^2(x-2)^3}{(x+3)^4}$ 的导数（用 $y$ 表示即可）。`,
          ja: R`$y=\dfrac{(x+1)^2(x-2)^3}{(x+3)^4}$ を微分せよ（$y$ を用いて表してよい）。`,
          en: R`Differentiate $y=\dfrac{(x+1)^2(x-2)^3}{(x+3)^4}$ (you may express the answer using $y$).`,
        },
        answer: R`y'=y\left(\frac{2}{x+1}+\frac{3}{x-2}-\frac{4}{x+3}\right)`,
        idea: R`积、商、幂较多，取对数化成和差。`,
        solution: [
          { math: R`\begin{aligned}\log|y|=\ &2\log|x+1|+3\log|x-2|\\&-4\log|x+3|\end{aligned}` },
          { math: R`\frac{y'}{y}=\frac{2}{x+1}+\frac{3}{x-2}-\frac{4}{x+3}` },
          R`两边乘 $y$ 即得。`,
        ],
        pitfalls: [R`取绝对值后再取对数，可以不必讨论正负。`],
        verify: {
          type: 'equal',
          lhs: 'diff((x+1)**2*(x-2)**3/(x+3)**4, x)',
          rhs: '(x+1)**2*(x-2)**3/(x+3)**4*(2/(x+1)+3/(x-2)-4/(x+3))',
        },
      },
    ],
  },
  {
    id: 'calc.chain.implicit',
    name: { zh: '隐函数求导（一元）', ja: '陰関数の微分', kana: 'いんかんすうのびぶん' },
    knowledge: ['calc.chain.k.composite'],
    formula: R`\frac{d}{dx}\,g(y)=g'(y)\,\frac{dy}{dx}`,
    conditions: [R`方程 $F(x,y)=0$ 在该点附近确定了 $y$ 是 $x$ 的可微函数。`],
    scenarios: [R`曲线由方程给出，如圆 $x^2+y^2=r^2$、$x^3+y^3=3xy$；求切线斜率。`],
    steps: [R`方程两边对 $x$ 求导，含 $y$ 的项用链式法则（乘 $y'$）。`, R`解出 $y'$。`, R`代入点的坐标。`],
    pitfalls: [R`$(y^2)'=2yy'$，不是 $2y$。`, R`第 9 章会用偏导数给出公式 $\dfrac{dy}{dx}=-\dfrac{F_x}{F_y}$。`],
    exercises: [
      {
        id: 'calc.chain.implicit.ex1',
        difficulty: '易',
        question: {
          zh: R`求圆 $x^2+y^2=25$ 在点 $(3,4)$ 处的 $\dfrac{dy}{dx}$ 以及切线方程。`,
          ja: R`円 $x^2+y^2=25$ 上の点 $(3,4)$ における $\dfrac{dy}{dx}$ と接線の方程式を求めよ。`,
          en: R`For the circle $x^2+y^2=25$, find $\dfrac{dy}{dx}$ and the tangent line at $(3,4)$.`,
        },
        answer: R`\frac{dy}{dx}=-\frac{3}{4},\qquad y=-\frac{3}{4}x+\frac{25}{4}`,
        idea: R`两边对 $x$ 求导，$y^2$ 的导数是 $2yy'$。`,
        solution: [
          { math: R`2x+2y\,y'=0\ \Longrightarrow\ y'=-\frac{x}{y}=-\frac{3}{4}` },
          { math: R`y-4=-\frac{3}{4}(x-3)\ \Longrightarrow\ y=-\frac{3}{4}x+\frac{25}{4}` },
        ],
        pitfalls: [R`切线方程也可以写成 $3x+4y=25$（圆的切线公式 $x_0x+y_0y=r^2$）。`],
        verify: { type: 'equal', lhs: 'idiff(x**2+y**2-25, y, x).subs(x, 3).subs(y, 4)', rhs: '-Rational(3,4)' },
      },
    ],
  },
  {
    id: 'calc.chain.parametric',
    name: { zh: '参数方程求导', ja: '媒介変数表示された関数の微分', kana: 'ばいかいへんすうひょうじされたかんすうのびぶん' },
    knowledge: ['calc.chain.k.composite', 'calc.chain.k.higher'],
    formula: [R`\frac{dy}{dx}=\frac{\dfrac{dy}{dt}}{\dfrac{dx}{dt}}`, R`\frac{d^2y}{dx^2}=\frac{\dfrac{d}{dt}\!\left(\dfrac{dy}{dx}\right)}{\dfrac{dx}{dt}}`],
    conditions: [R`$\dfrac{dx}{dt}\neq0$。`],
    scenarios: [R`曲线由 $x=x(t)$，$y=y(t)$ 给出，如摆线、椭圆、星形线。`],
    steps: [R`分别求 $\dfrac{dx}{dt}$、$\dfrac{dy}{dt}$，相除得一阶导数（仍是 $t$ 的函数）。`, R`二阶：把一阶导数对 $t$ 求导，**再除以** $\dfrac{dx}{dt}$。`],
    pitfalls: [R`二阶导数不是 $\dfrac{y''(t)}{x''(t)}$。`],
    exercises: [
      {
        id: 'calc.chain.parametric.ex1',
        difficulty: '中',
        question: {
          zh: R`对摆线 $x=t-\sin t$，$y=1-\cos t$（$0<t<2\pi$），求 $\dfrac{dy}{dx}$ 与 $\dfrac{d^2y}{dx^2}$。`,
          ja: R`サイクロイド $x=t-\sin t$，$y=1-\cos t$（$0<t<2\pi$）について，$\dfrac{dy}{dx}$ と $\dfrac{d^2y}{dx^2}$ を求めよ。`,
          en: R`For the cycloid $x=t-\sin t$, $y=1-\cos t$ ($0<t<2\pi$), find $\dfrac{dy}{dx}$ and $\dfrac{d^2y}{dx^2}$.`,
        },
        answer: R`\frac{dy}{dx}=\frac{\sin t}{1-\cos t},\qquad\frac{d^2y}{dx^2}=-\frac{1}{(1-\cos t)^2}`,
        idea: R`一阶用比值公式；二阶对 $t$ 求导后再除以 $\dfrac{dx}{dt}$。`,
        solution: [
          { math: R`\frac{dx}{dt}=1-\cos t,\qquad\frac{dy}{dt}=\sin t` },
          { math: R`\frac{dy}{dx}=\frac{\sin t}{1-\cos t}` },
          { math: R`\begin{aligned}\frac{d}{dt}\left(\frac{\sin t}{1-\cos t}\right)&=\frac{\cos t(1-\cos t)-\sin t\cdot\sin t}{(1-\cos t)^2}\\[4pt]&=\frac{\cos t-1}{(1-\cos t)^2}=-\frac{1}{1-\cos t}\end{aligned}` },
          { math: R`\frac{d^2y}{dx^2}=-\frac{1}{1-\cos t}\cdot\frac{1}{1-\cos t}=-\frac{1}{(1-\cos t)^2}` },
        ],
        pitfalls: [R`$\cos^2t+\sin^2t=1$ 用于化简分子。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'diff(1-cos(t),t)/diff(t-sin(t),t)', rhs: 'sin(t)/(1-cos(t))' },
            { type: 'equal', lhs: 'diff(sin(t)/(1-cos(t)),t)/diff(t-sin(t),t)', rhs: '-1/(1-cos(t))**2' },
          ],
        },
      },
    ],
  },
];

const higherCards = [
  {
    id: 'calc.chain.nth-derivatives',
    name: { zh: '常见函数的 n 阶导数', ja: '基本的な関数の第 n 次導関数', kana: 'きほんてきなかんすうのだい n じどうかんすう' },
    knowledge: ['calc.chain.k.higher'],
    formula: R`\begin{aligned}\left(e^{ax}\right)^{(n)}&=a^{n}e^{ax}\\(\sin x)^{(n)}&=\sin\left(x+\frac{n\pi}{2}\right)\\(\cos x)^{(n)}&=\cos\left(x+\frac{n\pi}{2}\right)\\\left(\frac{1}{x+a}\right)^{(n)}&=\frac{(-1)^{n}n!}{(x+a)^{n+1}}\\\bigl(\log(1+x)\bigr)^{(n)}&=\frac{(-1)^{n-1}(n-1)!}{(1+x)^{n}}\end{aligned}`,
    conditions: [R`$n\ge1$ 的自然数。`],
    scenarios: [R`求 $f^{(n)}(x)$ 的一般式；有理函数先拆成部分分式。`],
    steps: [R`化成上面几种基本形式（部分分式、倍角公式等）。`, R`逐项套公式。`, R`验证 $n=1$ 时与直接求导一致。`],
    pitfalls: [R`$\sin ax$ 的 $n$ 阶导数要乘 $a^n$：$a^n\sin\left(ax+\dfrac{n\pi}{2}\right)$。`],
    exercises: [
      {
        id: 'calc.chain.nth-derivatives.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $y=\dfrac{1}{x^2-1}$ 的 $n$ 阶导数。`,
          ja: R`$y=\dfrac{1}{x^2-1}$ の第 $n$ 次導関数を求めよ。`,
          en: R`Find the $n$-th derivative of $y=\dfrac{1}{x^2-1}$.`,
        },
        answer: R`\begin{aligned}y^{(n)}=\ &\frac{(-1)^{n}n!}{2}\\&\times\left\{\frac{1}{(x-1)^{n+1}}-\frac{1}{(x+1)^{n+1}}\right\}\end{aligned}`,
        idea: R`先拆成部分分式，再用 $\left(\dfrac{1}{x+a}\right)^{(n)}$ 的公式。`,
        solution: [
          { math: R`\frac{1}{x^2-1}=\frac{1}{2}\left(\frac{1}{x-1}-\frac{1}{x+1}\right)` },
          { math: R`y^{(n)}=\frac{1}{2}\left\{\frac{(-1)^{n}n!}{(x-1)^{n+1}}-\frac{(-1)^{n}n!}{(x+1)^{n+1}}\right\}` },
        ],
        pitfalls: [R`部分分式的系数 $\dfrac12$ 来自 $\dfrac{1}{x-1}-\dfrac{1}{x+1}=\dfrac{2}{x^2-1}$。`],
        verify: {
          type: 'equal',
          lhs: 'diff(1/(x**2-1), x, 4)',
          rhs: '(-1)**4*factorial(4)/2*(1/(x-1)**5-1/(x+1)**5)',
        },
      },
      {
        id: 'calc.chain.nth-derivatives.ex2',
        difficulty: '易',
        question: {
          zh: R`求 $y=\sin2x$ 的 $n$ 阶导数。`,
          ja: R`$y=\sin2x$ の第 $n$ 次導関数を求めよ。`,
          en: R`Find the $n$-th derivative of $y=\sin2x$.`,
        },
        answer: R`y^{(n)}=2^{n}\sin\left(2x+\frac{n\pi}{2}\right)`,
        idea: R`每求导一次：乘 2，并且相位加 $\dfrac{\pi}{2}$。`,
        solution: [
          { math: R`y'=2\cos2x=2\sin\left(2x+\frac{\pi}{2}\right)` },
          R`每求一次导，系数乘 $2$、角度加 $\dfrac{\pi}{2}$，由归纳法得：`,
          { math: R`y^{(n)}=2^{n}\sin\left(2x+\frac{n\pi}{2}\right)` },
        ],
        pitfalls: [R`系数是 $2^n$，不是 $2n$。`],
        verify: { type: 'equal', lhs: 'diff(sin(2*x), x, 5)', rhs: '2**5*sin(2*x+5*pi/2)' },
      },
    ],
  },
  {
    id: 'calc.chain.leibniz',
    name: { zh: 'Leibniz 公式', ja: 'ライプニッツの公式', kana: 'ライプニッツのこうしき' },
    knowledge: ['calc.chain.k.higher'],
    formula: R`(fg)^{(n)}=\sum_{k=0}^{n}\binom{n}{k}f^{(n-k)}g^{(k)}`,
    conditions: [R`$f$、$g$ 都 $n$ 次可微。$\dbinom{n}{k}={}_n\mathrm{C}_k$。`],
    scenarios: [R`积的高阶导数，其中一个因子是多项式（求导几次后变成 0）。`],
    steps: [R`让多项式因子作 $g$（它的高阶导数很快为 0）。`, R`只写出非零的几项。`, R`代入 $f^{(n-k)}$ 的一般式。`],
    pitfalls: [R`形式与二项式定理相同，系数是组合数。`],
    exercises: [
      {
        id: 'calc.chain.leibniz.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $y=x^2e^{x}$ 的 $n$ 阶导数。`,
          ja: R`$y=x^2e^{x}$ の第 $n$ 次導関数を求めよ。`,
          en: R`Find the $n$-th derivative of $y=x^2e^{x}$.`,
        },
        answer: R`y^{(n)}=\left\{x^2+2nx+n(n-1)\right\}e^{x}`,
        idea: R`$g=x^2$ 的三阶以上导数为 $0$，只剩三项。`,
        solution: [
          { math: R`\begin{aligned}y^{(n)}&=\binom{n}{0}e^{x}x^2+\binom{n}{1}e^{x}\cdot2x+\binom{n}{2}e^{x}\cdot2\\[4pt]&=\left\{x^2+2nx+n(n-1)\right\}e^{x}\end{aligned}` },
        ],
        pitfalls: [R`$\dbinom{n}{2}\cdot2=n(n-1)$。`],
        verify: { type: 'equal', lhs: 'diff(x**2*exp(x), x, 5)', rhs: '(x**2+10*x+20)*exp(x)' },
      },
      {
        id: 'calc.chain.leibniz.ex2',
        difficulty: '中',
        question: {
          zh: R`求 $y=x\sin x$ 的 $n$ 阶导数。`,
          ja: R`$y=x\sin x$ の第 $n$ 次導関数を求めよ。`,
          en: R`Find the $n$-th derivative of $y=x\sin x$.`,
        },
        answer: R`\begin{aligned}y^{(n)}=\ &x\sin\left(x+\frac{n\pi}{2}\right)\\&+n\sin\left(x+\frac{(n-1)\pi}{2}\right)\end{aligned}`,
        idea: R`$g=x$，只有 $k=0,1$ 两项。`,
        solution: [
          { math: R`\begin{aligned}y^{(n)}&=\binom{n}{0}(\sin x)^{(n)}\,x+\binom{n}{1}(\sin x)^{(n-1)}\cdot1\\[4pt]&=x\sin\left(x+\frac{n\pi}{2}\right)+n\sin\left(x+\frac{(n-1)\pi}{2}\right)\end{aligned}` },
        ],
        pitfalls: [R`第二项是 $(n-1)$ 阶导数，相位是 $\dfrac{(n-1)\pi}{2}$。`],
        verify: { type: 'equal', lhs: 'diff(x*sin(x), x, 6)', rhs: 'x*sin(x+3*pi)+6*sin(x+5*pi/2)' },
      },
    ],
  },
];

export const compositeChapter = {
  overview: '复合函数的链式法则、反函数的导数、对数求导法、隐函数与参数方程的求导，以及高阶导数：常见函数的 n 阶导数和 Leibniz 公式。',
  sections: [
    { title: '复合函数与反函数的求导', knowledge: [K.composite, K.inverse], formulas: chainCards },
    { title: '高阶导数', knowledge: [K.higher], formulas: higherCards },
  ],
};
