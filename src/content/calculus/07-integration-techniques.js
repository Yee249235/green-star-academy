// 第 7 章 置换积分与部分积分
const R = String.raw;

const K = {
  substitution: {
    id: 'calc.tech.k.substitution',
    name: { zh: '换元积分法', ja: '置換積分法', kana: 'ちかんせきぶんほう' },
    paragraphs: [
      R`链式法则的逆运算。令 $x=g(t)$（或 $t=h(x)$），把 $dx$ 换成 $g'(t)\,dt$，化为关于 $t$ 的积分。`,
      R`定积分换元时，积分上下限要一起换成 $t$ 的值，之后不必再换回 $x$。`,
    ],
    definitions: [R`\int f(x)\,dx=\int f\bigl(g(t)\bigr)g'(t)\,dt`, R`\int_a^bf(x)\,dx=\int_\alpha^\beta f\bigl(g(t)\bigr)g'(t)\,dt`],
    conditions: [R`定积分中 $a=g(\alpha)$，$b=g(\beta)$。`],
    theorems: [R`「凑微分」是最常用的形式：$\displaystyle\int f\bigl(h(x)\bigr)h'(x)\,dx=F\bigl(h(x)\bigr)+C$。`],
    related: ['calc.chain.k.composite', 'calc.int.k.antiderivative'],
  },
  parts: {
    id: 'calc.tech.k.parts',
    name: { zh: '分部积分法', ja: '部分積分法', kana: 'ぶぶんせきぶんほう' },
    paragraphs: [
      R`积的求导法则的逆运算。把被积函数看成 $f\cdot g'$，转化为 $f'\cdot g$ 的积分。`,
      R`选择原则（「对反幂三指」）：$\log$、反三角函数、幂函数适合作 $f$（求导后变简单），指数、三角函数适合作 $g'$（积分后不变复杂）。`,
    ],
    definitions: [R`\int fg'\,dx=fg-\int f'g\,dx`, R`\int_a^bfg'\,dx=\Bigl[fg\Bigr]_a^b-\int_a^bf'g\,dx`],
    conditions: [R`$f$、$g$ 可微且导数连续。`],
    theorems: [R`$\displaystyle\int\log x\,dx$、$\displaystyle\int\arctan x\,dx$ 可看成 $1\cdot\log x$，令 $g'=1$。`],
    related: ['calc.int.k.antiderivative'],
  },
  partialFractions: {
    id: 'calc.tech.k.partial-fractions',
    name: { zh: '部分分式分解', ja: '部分分数分解', kana: 'ぶぶんぶんすうぶんかい' },
    paragraphs: [
      R`把有理函数 $\dfrac{P(x)}{Q(x)}$ 拆成简单分式之和。先确保分子次数低于分母（否则先做多项式除法），再按分母的因式写出待定形式。`,
    ],
    definitions: [R`\frac{P(x)}{(x-a)(x-b)}=\frac{A}{x-a}+\frac{B}{x-b}`, R`\frac{P(x)}{(x-a)^2}=\frac{A}{x-a}+\frac{B}{(x-a)^2}`, R`\begin{aligned}&\frac{P(x)}{(x-a)(x^2+px+q)}\\&\quad=\frac{A}{x-a}+\frac{Bx+C}{x^2+px+q}\end{aligned}`],
    conditions: [R`$x^2+px+q$ 不能再因式分解（判别式 $<0$）。`],
    theorems: [R`求系数：两边同乘分母后代入特殊值（如 $x=a$），或比较系数。`],
    related: ['calc.tech.k.substitution'],
  },
};

const substitutionCards = [
  {
    id: 'calc.tech.substitution',
    name: { zh: '不定积分的换元（凑微分）', ja: '置換積分（不定積分）', kana: 'ちかんせきぶん（ふていせきぶん）' },
    knowledge: ['calc.tech.k.substitution'],
    formula: R`\int f\bigl(h(x)\bigr)h'(x)\,dx=F\bigl(h(x)\bigr)+C`,
    conditions: [R`被积函数中「某个式子的导数」作为因子出现。`],
    scenarios: [R`$xe^{x^2}$、$\sin^3x$、$\dfrac{(\log x)^n}{x}$、$\sin x\cos^nx$ 等。`],
    steps: [R`找出内层 $u=h(x)$，确认 $h'(x)$（或其常数倍）在式中。`, R`换成 $\displaystyle\int f(u)\,du$ 积分。`, R`把 $u$ 换回 $x$。`],
    pitfalls: [R`$\sin^3x$ 这类奇次幂：拆出一个 $\sin x$ 给 $du$，其余用 $\sin^2x=1-\cos^2x$ 换成 $\cos x$。`],
    exercises: [
      {
        id: 'calc.tech.substitution.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\int xe^{x^2}\,dx$。`,
          ja: R`$\displaystyle\int xe^{x^2}\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int xe^{x^2}\,dx$.`,
        },
        answer: R`\frac12e^{x^2}+C`,
        idea: R`$u=x^2$，$du=2x\,dx$。`,
        solution: [{ math: R`\int xe^{x^2}\,dx=\frac12\int e^{u}\,du=\frac12e^{x^2}+C` }],
        pitfalls: [R`$x\,dx=\dfrac12du$，系数 $\dfrac12$ 不要漏。`],
        verify: { type: 'antiderivative', integrand: 'x*exp(x**2)', answer: 'exp(x**2)/2' },
      },
      {
        id: 'calc.tech.substitution.ex2',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\int\sin^3x\,dx$。`,
          ja: R`$\displaystyle\int\sin^3x\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int\sin^3x\,dx$.`,
        },
        answer: R`-\cos x+\frac{\cos^3x}{3}+C`,
        idea: R`$\sin^3x=(1-\cos^2x)\sin x$，令 $u=\cos x$。`,
        solution: [
          R`令 $u=\cos x$，$du=-\sin x\,dx$：`,
          { math: R`\begin{aligned}\int\sin^3x\,dx&=\int(1-\cos^2x)\sin x\,dx\\&=-\int(1-u^2)\,du=-u+\frac{u^3}{3}+C\end{aligned}` },
          R`换回：$-\cos x+\dfrac{\cos^3x}{3}+C$。`,
        ],
        pitfalls: [R`$du=-\sin x\,dx$，注意负号。`],
        verify: { type: 'antiderivative', integrand: 'sin(x)**3', answer: '-cos(x)+cos(x)**3/3' },
      },
    ],
  },
  {
    id: 'calc.tech.definite-substitution',
    name: { zh: '定积分的换元（换限）', ja: '置換積分（定積分）', kana: 'ちかんせきぶん（ていせきぶん）' },
    knowledge: ['calc.tech.k.substitution'],
    formula: R`\int_a^bf\bigl(h(x)\bigr)h'(x)\,dx=\int_{h(a)}^{h(b)}f(u)\,du`,
    conditions: [R`上下限随变量一起换。`],
    scenarios: [R`定积分中出现「式子 × 它的导数」。`],
    steps: [R`设 $u=h(x)$，求 $du$。`, R`把上下限换成 $u=h(a)$、$u=h(b)$。`, R`直接计算关于 $u$ 的定积分。`],
    pitfalls: [R`换了变量就要换上下限；不换上下限就必须先换回 $x$。`],
    exercises: [
      {
        id: 'calc.tech.definite-substitution.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\int_1^{e}\frac{(\log x)^2}{x}\,dx$。`,
          ja: R`$\displaystyle\int_1^{e}\frac{(\log x)^2}{x}\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int_1^{e}\frac{(\log x)^2}{x}\,dx$.`,
        },
        answer: R`\frac{1}{3}`,
        idea: R`$u=\log x$，$du=\dfrac{dx}{x}$；$x:1\to e$ 对应 $u:0\to1$。`,
        solution: [{ math: R`\int_1^{e}\frac{(\log x)^2}{x}\,dx=\int_0^1u^2\,du=\frac13` }],
        pitfalls: [R`$\log e=1$，$\log1=0$。`],
        verify: { type: 'equal', lhs: 'integrate(log(x)**2/x, (x, 1, E))', rhs: 'Rational(1,3)' },
      },
    ],
  },
  {
    id: 'calc.tech.trig-substitution',
    name: { zh: '三角代换', ja: '三角関数による置換', kana: 'さんかくかんすうによるちかん' },
    knowledge: ['calc.tech.k.substitution'],
    formula: R`\begin{aligned}\sqrt{a^2-x^2}&:\ x=a\sin\theta\\\sqrt{a^2+x^2}&:\ x=a\tan\theta\\\sqrt{x^2-a^2}&:\ x=\frac{a}{\cos\theta}\end{aligned}`,
    conditions: [R`$\theta$ 取在使根号能直接开出的范围（如 $-\frac{\pi}{2}\le\theta\le\frac{\pi}{2}$）。`],
    scenarios: [R`含 $\sqrt{a^2-x^2}$、$(a^2+x^2)^{\frac32}$ 等，无法用基本公式时。`],
    steps: [R`按根号类型选代换。`, R`计算 $dx$，用 $1-\sin^2\theta=\cos^2\theta$ 或 $1+\tan^2\theta=\dfrac{1}{\cos^2\theta}$ 去根号。`, R`定积分换上下限。`],
    pitfalls: [R`去根号时要确认 $\cos\theta\ge0$。`],
    exercises: [
      {
        id: 'calc.tech.trig-substitution.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\int_0^{\frac12}\frac{dx}{\left(1-x^2\right)^{\frac32}}$。`,
          ja: R`$\displaystyle\int_0^{\frac12}\frac{dx}{\left(1-x^2\right)^{\frac32}}$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int_0^{\frac12}\frac{dx}{\left(1-x^2\right)^{\frac32}}$.`,
        },
        answer: R`\frac{1}{\sqrt3}=\frac{\sqrt3}{3}`,
        idea: R`$x=\sin\theta$，$\theta:0\to\dfrac{\pi}{6}$。`,
        solution: [
          R`$dx=\cos\theta\,d\theta$，$(1-x^2)^{\frac32}=\cos^3\theta$：`,
          { math: R`\int_0^{\frac{\pi}{6}}\frac{\cos\theta}{\cos^3\theta}\,d\theta=\int_0^{\frac{\pi}{6}}\frac{d\theta}{\cos^2\theta}=\Bigl[\tan\theta\Bigr]_0^{\frac{\pi}{6}}=\frac{1}{\sqrt3}` },
        ],
        pitfalls: [R`$x=\dfrac12$ 对应 $\theta=\dfrac{\pi}{6}$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'antiderivative', integrand: '1/(1-x**2)**Rational(3,2)', answer: 'x/sqrt(1-x**2)' },
            { type: 'equal', lhs: '(x/sqrt(1-x**2)).subs(x, Rational(1,2))', rhs: 'sqrt(3)/3' },
            { type: 'less', lhs: 'Abs(Integral(1/(1-x**2)**Rational(3,2), (x, 0, Rational(1,2))).evalf() - sqrt(3)/3)', rhs: '10**(-12)' },
          ],
        },
      },
      {
        id: 'calc.tech.trig-substitution.ex2',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\int_0^{1}\frac{dx}{\left(1+x^2\right)^{\frac32}}$。`,
          ja: R`$\displaystyle\int_0^{1}\frac{dx}{\left(1+x^2\right)^{\frac32}}$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int_0^{1}\frac{dx}{\left(1+x^2\right)^{\frac32}}$.`,
        },
        answer: R`\frac{\sqrt2}{2}`,
        idea: R`$x=\tan\theta$，$\theta:0\to\dfrac{\pi}{4}$。`,
        solution: [
          R`$dx=\dfrac{d\theta}{\cos^2\theta}$，$1+x^2=\dfrac{1}{\cos^2\theta}$，$(1+x^2)^{\frac32}=\dfrac{1}{\cos^3\theta}$：`,
          { math: R`\int_0^{\frac{\pi}{4}}\cos^3\theta\cdot\frac{d\theta}{\cos^2\theta}=\int_0^{\frac{\pi}{4}}\cos\theta\,d\theta=\frac{\sqrt2}{2}` },
        ],
        pitfalls: [R`$\sin\dfrac{\pi}{4}=\dfrac{\sqrt2}{2}$。`],
        verify: { type: 'equal', lhs: 'integrate(1/(1+x**2)**Rational(3,2), (x, 0, 1))', rhs: 'sqrt(2)/2' },
      },
    ],
  },
];

const partsCards = [
  {
    id: 'calc.tech.parts',
    name: { zh: '分部积分', ja: '部分積分', kana: 'ぶぶんせきぶん' },
    knowledge: ['calc.tech.k.parts'],
    formula: R`\int fg'\,dx=fg-\int f'g\,dx`,
    conditions: [R`选好 $f$（求导变简单）和 $g'$（容易积分）。`],
    scenarios: [R`$x\cos x$、$xe^{x}$、$x^2e^{x}$、$\log x$、$\arctan x$、$x\log x$ 等。`],
    steps: [R`确定 $f$ 与 $g'$，求 $f'$ 与 $g$。`, R`套公式。`, R`剩下的积分若仍是积，可以再用一次。`],
    pitfalls: [R`选反了（如令 $g'=x$、$f=e^x$）会让积分越来越复杂。`],
    exercises: [
      {
        id: 'calc.tech.parts.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\int x\cos x\,dx$。`,
          ja: R`$\displaystyle\int x\cos x\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int x\cos x\,dx$.`,
        },
        answer: R`x\sin x+\cos x+C`,
        idea: R`$f=x$，$g'=\cos x$。`,
        solution: [{ math: R`\begin{aligned}\int x\cos x\,dx&=x\sin x-\int\sin x\,dx\\&=x\sin x+\cos x+C\end{aligned}` }],
        pitfalls: [R`$-\displaystyle\int\sin x\,dx=+\cos x$。`],
        verify: { type: 'antiderivative', integrand: 'x*cos(x)', answer: 'x*sin(x)+cos(x)' },
      },
      {
        id: 'calc.tech.parts.ex2',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\int\arctan x\,dx$。`,
          ja: R`$\displaystyle\int\arctan x\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int\arctan x\,dx$.`,
        },
        answer: R`x\arctan x-\frac12\log\left(1+x^2\right)+C`,
        idea: R`看成 $1\cdot\arctan x$：$f=\arctan x$，$g'=1$。`,
        solution: [
          { math: R`\int\arctan x\,dx=x\arctan x-\int\frac{x}{1+x^2}\,dx` },
          { math: R`=x\arctan x-\frac12\log\left(1+x^2\right)+C` },
        ],
        pitfalls: [R`剩下的积分用 $\dfrac{f'}{f}$ 型。`],
        verify: { type: 'antiderivative', integrand: 'atan(x)', answer: 'x*atan(x)-log(1+x**2)/2' },
      },
    ],
  },
  {
    id: 'calc.tech.parts-cyclic',
    name: { zh: '循环型分部积分', ja: '同形出現型の部分積分', kana: 'どうけいしゅつげんがたのぶぶんせきぶん' },
    knowledge: ['calc.tech.k.parts'],
    formula: R`I=\int e^{ax}\sin bx\,dx\ \Longrightarrow\ I=(\cdots)-kI`,
    conditions: [R`两次分部积分后原积分再次出现。`],
    scenarios: [R`$e^{ax}\sin bx$、$e^{ax}\cos bx$。`],
    steps: [R`设所求积分为 $I$。`, R`连续两次分部积分（两次都让指数函数作 $g'$，或两次都让三角函数作 $g'$）。`, R`得到关于 $I$ 的方程，解出 $I$。`],
    pitfalls: [R`两次的选择必须一致，否则会回到原点得到 $I=I$。`],
    exercises: [
      {
        id: 'calc.tech.parts-cyclic.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\int e^{x}\sin x\,dx$。`,
          ja: R`$\displaystyle\int e^{x}\sin x\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int e^{x}\sin x\,dx$.`,
        },
        answer: R`\frac{e^{x}(\sin x-\cos x)}{2}+C`,
        idea: R`两次都让 $e^x$ 作 $g'$，原积分再次出现。`,
        solution: [
          { math: R`\begin{aligned}I&=e^{x}\sin x-\int e^{x}\cos x\,dx\\&=e^{x}\sin x-\left(e^{x}\cos x+\int e^{x}\sin x\,dx\right)\\&=e^{x}(\sin x-\cos x)-I\end{aligned}` },
          R`所以 $2I=e^{x}(\sin x-\cos x)$，再加常数 $C$。`,
        ],
        pitfalls: [R`第二次分部积分 $\displaystyle\int e^x\cos x\,dx=e^x\cos x+\int e^x\sin x\,dx$（$(\cos x)'=-\sin x$ 带来正号）。`],
        verify: { type: 'antiderivative', integrand: 'exp(x)*sin(x)', answer: 'exp(x)*(sin(x)-cos(x))/2' },
      },
    ],
  },
  {
    id: 'calc.tech.wallis',
    name: { zh: '递推公式与 Wallis 公式', ja: '漸化式とウォリスの公式', kana: 'ぜんかしきとウォリスのこうしき' },
    knowledge: ['calc.tech.k.parts'],
    formula: [R`I_n=\int_0^{\frac{\pi}{2}}\sin^nx\,dx=\int_0^{\frac{\pi}{2}}\cos^nx\,dx`, R`I_n=\frac{n-1}{n}I_{n-2},\quad I_0=\frac{\pi}{2},\quad I_1=1`],
    conditions: [R`$n\ge2$；递推公式由分部积分得到。`],
    scenarios: [R`$\sin^n$、$\cos^n$ 在 $\left[0,\dfrac{\pi}{2}\right]$ 上的积分。`],
    steps: [R`反复用 $I_n=\dfrac{n-1}{n}I_{n-2}$ 降次。`, R`偶数降到 $I_0=\dfrac{\pi}{2}$，奇数降到 $I_1=1$。`],
    pitfalls: [R`偶数结果含 $\dfrac{\pi}{2}$，奇数结果不含 $\pi$。`],
    exercises: [
      {
        id: 'calc.tech.wallis.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\int_0^{\frac{\pi}{2}}\sin^5x\,dx$。`,
          ja: R`$\displaystyle\int_0^{\frac{\pi}{2}}\sin^5x\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int_0^{\frac{\pi}{2}}\sin^5x\,dx$.`,
        },
        answer: R`\frac{8}{15}`,
        idea: R`奇数次：$\dfrac45\cdot\dfrac23\cdot1$。`,
        solution: [{ math: R`I_5=\frac45I_3=\frac45\cdot\frac23I_1=\frac45\cdot\frac23\cdot1=\frac{8}{15}` }],
        pitfalls: [R`奇数次最后乘 $I_1=1$。`],
        verify: { type: 'equal', lhs: 'integrate(sin(x)**5, (x, 0, pi/2))', rhs: 'Rational(8,15)' },
      },
      {
        id: 'calc.tech.wallis.ex2',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\int_0^{\frac{\pi}{2}}\cos^6x\,dx$。`,
          ja: R`$\displaystyle\int_0^{\frac{\pi}{2}}\cos^6x\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int_0^{\frac{\pi}{2}}\cos^6x\,dx$.`,
        },
        answer: R`\frac{5\pi}{32}`,
        idea: R`偶数次：$\dfrac56\cdot\dfrac34\cdot\dfrac12\cdot\dfrac{\pi}{2}$。`,
        solution: [{ math: R`I_6=\frac56\cdot\frac34\cdot\frac12\cdot\frac{\pi}{2}=\frac{15\pi}{96}=\frac{5\pi}{32}` }],
        pitfalls: [R`$\cos^n$ 与 $\sin^n$ 在 $\left[0,\frac{\pi}{2}\right]$ 上的积分相等。`],
        verify: { type: 'equal', lhs: 'integrate(cos(x)**6, (x, 0, pi/2))', rhs: '5*pi/32' },
      },
    ],
  },
];

const rationalCards = [
  {
    id: 'calc.tech.partial-fractions',
    name: { zh: '有理函数的积分（部分分式）', ja: '有理関数の積分（部分分数分解）', kana: 'ゆうりかんすうのせきぶん' },
    knowledge: ['calc.tech.k.partial-fractions'],
    formula: R`\frac{P(x)}{(x-a)(x-b)}=\frac{A}{x-a}+\frac{B}{x-b}`,
    conditions: [R`分子次数 $<$ 分母次数（否则先做多项式除法）。`],
    scenarios: [R`分母能因式分解的分式。`],
    steps: [R`分母因式分解，写出待定形式。`, R`求系数 $A,B,\dots$。`, R`逐项积分：$\dfrac{1}{x-a}\to\log|x-a|$，$\dfrac{x}{x^2+1}\to\frac12\log(x^2+1)$，$\dfrac{1}{x^2+1}\to\arctan x$。`],
    pitfalls: [R`二次不可约因式的分子要设成 $Bx+C$。`],
    exercises: [
      {
        id: 'calc.tech.partial-fractions.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\int\frac{x+5}{(x-1)(x+2)}\,dx$。`,
          ja: R`$\displaystyle\int\frac{x+5}{(x-1)(x+2)}\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int\frac{x+5}{(x-1)(x+2)}\,dx$.`,
        },
        answer: R`2\log|x-1|-\log|x+2|+C`,
        idea: R`$x+5=A(x+2)+B(x-1)$，代入 $x=1$、$x=-2$。`,
        solution: [
          R`$x=1$：$6=3A$，$A=2$；$x=-2$：$3=-3B$，$B=-1$。`,
          { math: R`\begin{aligned}&\int\left(\frac{2}{x-1}-\frac{1}{x+2}\right)dx\\&\quad=2\log|x-1|-\log|x+2|+C\end{aligned}` },
        ],
        pitfalls: [R`代入法比比较系数快。`],
        verify: { type: 'antiderivative', integrand: '(x+5)/((x-1)*(x+2))', answer: '2*log(x-1)-log(x+2)' },
      },
      {
        id: 'calc.tech.partial-fractions.ex2',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\int\frac{dx}{x\left(x^2+1\right)}$。`,
          ja: R`$\displaystyle\int\frac{dx}{x\left(x^2+1\right)}$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int\frac{dx}{x\left(x^2+1\right)}$.`,
        },
        answer: R`\log|x|-\frac12\log\left(x^2+1\right)+C`,
        idea: R`$\dfrac{1}{x(x^2+1)}=\dfrac{A}{x}+\dfrac{Bx+C}{x^2+1}$。`,
        solution: [
          R`$1=A(x^2+1)+(Bx+C)x$。$x=0$ 得 $A=1$；比较 $x^2$、$x$ 的系数：$A+B=0$，$C=0$，所以 $B=-1$。`,
          { math: R`\begin{aligned}&\int\left(\frac1x-\frac{x}{x^2+1}\right)dx\\&\quad=\log|x|-\frac12\log\left(x^2+1\right)+C\end{aligned}` },
        ],
        pitfalls: [R`$x^2+1$ 是不可约因式，分子设成一次式。`],
        verify: { type: 'antiderivative', integrand: '1/(x*(x**2+1))', answer: 'log(x)-log(x**2+1)/2' },
      },
    ],
  },
  {
    id: 'calc.tech.half-angle',
    name: { zh: '三角有理式（t = tan(x/2) 代换）', ja: 'tan(x/2) = t による置換', kana: 'タンジェント 2 ぶんの x イコール t によるちかん' },
    knowledge: ['calc.tech.k.substitution'],
    formula: R`\begin{gathered}t=\tan\frac{x}{2}\\\sin x=\frac{2t}{1+t^2},\qquad\cos x=\frac{1-t^2}{1+t^2}\\dx=\frac{2\,dt}{1+t^2}\end{gathered}`,
    conditions: [R`被积函数是 $\sin x$、$\cos x$ 的有理式。`],
    scenarios: [R`$\dfrac{1}{2+\cos x}$、$\dfrac{1}{1+\sin x}$ 等其他方法不方便时的「万能代换」。`],
    steps: [R`全部换成 $t$ 的式子。`, R`化成 $t$ 的有理函数积分。`, R`把 $t$ 换回 $\tan\dfrac x2$。`],
    pitfalls: [R`计算量大，能用凑微分时优先用凑微分。`],
    exercises: [
      {
        id: 'calc.tech.half-angle.ex1',
        difficulty: '难',
        question: {
          zh: R`求 $\displaystyle\int\frac{dx}{2+\cos x}$。`,
          ja: R`$\displaystyle\int\frac{dx}{2+\cos x}$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int\frac{dx}{2+\cos x}$.`,
        },
        answer: R`\frac{2}{\sqrt3}\arctan\left(\frac{1}{\sqrt3}\tan\frac{x}{2}\right)+C`,
        idea: R`$t=\tan\dfrac x2$ 后化为 $\displaystyle\int\frac{2\,dt}{t^2+3}$。`,
        solution: [
          { math: R`2+\cos x=\frac{2(1+t^2)+1-t^2}{1+t^2}=\frac{t^2+3}{1+t^2}` },
          { math: R`\begin{aligned}\int\frac{1+t^2}{t^2+3}\cdot\frac{2\,dt}{1+t^2}&=\int\frac{2\,dt}{t^2+3}\\&=\frac{2}{\sqrt3}\arctan\frac{t}{\sqrt3}+C\end{aligned}` },
        ],
        pitfalls: [R`最后用 $\displaystyle\int\frac{dt}{t^2+a^2}=\frac1a\arctan\frac ta$，$a=\sqrt3$。`],
        verify: { type: 'antiderivative', integrand: '1/(2+cos(x))', answer: '2/sqrt(3)*atan(tan(x/2)/sqrt(3))' },
      },
    ],
  },
  {
    id: 'calc.tech.irrational',
    name: { zh: '无理函数（√(ax+b) 代换）', ja: '無理関数の積分（√(ax+b) の置換）', kana: 'むりかんすうのせきぶん' },
    knowledge: ['calc.tech.k.substitution'],
    formula: R`t=\sqrt{ax+b}:\quad x=\frac{t^2-b}{a},\quad dx=\frac{2t}{a}\,dt`,
    conditions: [R`根号内是一次式。`],
    scenarios: [R`$x\sqrt{x+1}$、$\dfrac{1}{1+\sqrt x}$、$\dfrac{x}{\sqrt{2x+1}}$ 等。`],
    steps: [R`令 $t=$ 根号整体，解出 $x$ 与 $dx$。`, R`化成 $t$ 的多项式或有理函数积分。`, R`换回 $x$。`],
    pitfalls: [R`$dx$ 也要换成 $t$ 的式子，不能只换被积函数。`],
    exercises: [
      {
        id: 'calc.tech.irrational.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\int x\sqrt{x+1}\,dx$。`,
          ja: R`$\displaystyle\int x\sqrt{x+1}\,dx$ を求めよ。`,
          en: R`Evaluate $\displaystyle\int x\sqrt{x+1}\,dx$.`,
        },
        answer: R`\frac25(x+1)^{\frac52}-\frac23(x+1)^{\frac32}+C`,
        idea: R`$t=\sqrt{x+1}$，$x=t^2-1$，$dx=2t\,dt$。`,
        solution: [
          { math: R`\begin{aligned}\int(t^2-1)\,t\cdot2t\,dt&=2\int\left(t^4-t^2\right)dt\\&=\frac25t^5-\frac23t^3+C\end{aligned}` },
          R`换回 $t=\sqrt{x+1}$ 即得答案。`,
        ],
        pitfalls: [R`也可以写成 $x\sqrt{x+1}=(x+1)^{\frac32}-(x+1)^{\frac12}$ 直接积分，结果相同。`],
        verify: { type: 'antiderivative', integrand: 'x*sqrt(x+1)', answer: '2*(x+1)**Rational(5,2)/5-2*(x+1)**Rational(3,2)/3' },
      },
    ],
  },
];

export const techniquesChapter = {
  overview: '换元积分（凑微分、定积分换限、三角代换）、分部积分（含循环型、递推公式与 Wallis 公式）、有理函数（部分分式）、三角有理式（tan(x/2) 代换）与无理函数的积分。',
  sections: [
    { title: '换元积分', knowledge: [K.substitution], formulas: substitutionCards },
    { title: '分部积分', knowledge: [K.parts], formulas: partsCards },
    { title: '有理函数、三角有理式与无理函数', knowledge: [K.partialFractions], formulas: rationalCards },
  ],
};
