// 第 1 章 数列与函数的极限 —— 知识点
const R = String.raw;

export const knowledge = {
  sequence: {
    id: 'calc.limits.k.sequence',
    name: { zh: '数列的极限', ja: '数列の極限', kana: 'すうれつのきょくげん' },
    paragraphs: [
      R`当 $n$ 无限增大时，若 $a_n$ 无限接近某个确定的数 $\alpha$，就说数列 $\{a_n\}$ **收敛**于 $\alpha$，记作 $\displaystyle\lim_{n\to\infty}a_n=\alpha$。`,
      R`不收敛的数列称为**发散**。发散分三种：发散到 $+\infty$（正の無限大に発散）、发散到 $-\infty$，以及既不收敛也不趋于 $\pm\infty$ 的**振动**（振動）。`,
    ],
    definitions: [R`\begin{gathered}\lim_{n\to\infty}a_n=\alpha\iff\\\forall\varepsilon>0,\ \exists N,\ n>N\Rightarrow|a_n-\alpha|<\varepsilon\end{gathered}`],
    conditions: [R`考试以计算为主：$\varepsilon$-$N$ 定义只需理解含义，不要求用它做证明。`],
    theorems: [
      R`收敛数列一定有界；无界数列一定发散。`,
      R`极限的四则运算、夹逼定理、单调有界原理都适用于数列。`,
    ],
    related: ['calc.limits.k.function', 'calc.limits.k.indeterminate'],
  },

  function: {
    id: 'calc.limits.k.function',
    name: { zh: '函数的极限与左右极限', ja: '関数の極限と片側極限', kana: 'かんすうのきょくげんとかたがわきょくげん' },
    paragraphs: [
      R`当 $x$ 无限接近 $a$（但 $x\neq a$）时，若 $f(x)$ 无限接近 $\alpha$，记作 $\displaystyle\lim_{x\to a}f(x)=\alpha$。极限只看 $a$ 附近的值，与 $f(a)$ 本身无关，甚至 $f(a)$ 可以没有定义。`,
      R`只从右侧接近记作 $x\to a+0$（右極限），只从左侧接近记作 $x\to a-0$（左極限）。$a=0$ 时写作 $x\to+0$、$x\to-0$。`,
    ],
    definitions: [R`\begin{gathered}\lim_{x\to a}f(x)=\alpha\\\iff\lim_{x\to a+0}f(x)=\lim_{x\to a-0}f(x)=\alpha\end{gathered}`],
    conditions: [R`左右极限都存在且相等，极限才存在。分段函数、含 $|x|$、含 $e^{1/x}$ 的函数常需分别求左右极限。`],
    theorems: [R`$x\to\pm\infty$ 的极限同样可以定义，常用 $t=-x$ 把 $x\to-\infty$ 化为 $t\to+\infty$。`],
    related: ['calc.limits.k.sequence', 'calc.limits.k.continuity'],
  },

  indeterminate: {
    id: 'calc.limits.k.indeterminate',
    name: { zh: '未定式', ja: '不定形', kana: 'ふていけい' },
    paragraphs: [
      R`直接代入后得到下面 7 种形式时，结果无法直接判断，称为**未定式**（不定形）。需要先变形，再求极限。`,
      R`$\dfrac{1}{0}$ 型、$\dfrac{\infty}{1}$ 型等**不是**未定式：它们直接发散到 $\pm\infty$（注意符号）。`,
    ],
    definitions: [R`\begin{gathered}\frac{0}{0},\ \ \frac{\infty}{\infty},\ \ 0\cdot\infty,\ \ \infty-\infty\\1^{\infty},\ \ 0^{0},\ \ \infty^{0}\end{gathered}`],
    conditions: [],
    theorems: [
      R`$0\cdot\infty$ 可改写为 $\dfrac{0}{1/\infty}$ 或 $\dfrac{\infty}{1/0}$，化为 $\dfrac{0}{0}$ 或 $\dfrac{\infty}{\infty}$。`,
      R`$1^{\infty}$、$0^{0}$、$\infty^{0}$ 三种指数型，取对数后都化为 $0\cdot\infty$。`,
    ],
    related: ['calc.limits.k.infinitesimal'],
  },

  infinitesimal: {
    id: 'calc.limits.k.infinitesimal',
    name: { zh: '无穷小与同值', ja: '無限小と同値', kana: 'むげんしょうとどうち' },
    paragraphs: [
      R`极限为 $0$ 的量称为**无穷小**。若 $\displaystyle\lim\frac{f(x)}{g(x)}=1$，称 $f$ 与 $g$ **同值**（等价），记作 $f(x)\sim g(x)$。`,
      R`若 $\displaystyle\lim\frac{f(x)}{g(x)}=0$，称 $f$ 是比 $g$ 高阶的无穷小，记作 $f(x)=o(g(x))$（Landau 记号）。Taylor 展开中的余项常写成 $o(x^n)$。`,
    ],
    definitions: [R`f(x)\sim g(x)\iff\lim\frac{f(x)}{g(x)}=1`, R`f(x)=o(g(x))\iff\lim\frac{f(x)}{g(x)}=0`],
    conditions: [R`同值替换只能用于**乘、除的因子**，不能直接替换加减式中的某一项。`],
    theorems: [R`若 $f\sim f_1$，$g\sim g_1$，且 $\displaystyle\lim\frac{f_1}{g_1}$ 存在，则 $\displaystyle\lim\frac{f}{g}=\lim\frac{f_1}{g_1}$。`],
    related: ['calc.limits.k.indeterminate'],
  },

  continuity: {
    id: 'calc.limits.k.continuity',
    name: { zh: '函数的连续性', ja: '関数の連続性', kana: 'かんすうのれんぞくせい' },
    paragraphs: [
      R`若 $\displaystyle\lim_{x\to a}f(x)=f(a)$，称 $f$ 在 $x=a$ **连续**。这同时要求三件事：$f(a)$ 有定义、极限存在、二者相等。`,
      R`多项式、有理函数（分母不为 0 处）、指数函数、对数函数、三角函数及其复合，在定义域内都连续，因此可以直接代入求极限。`,
    ],
    definitions: [R`f\text{ 在 }x=a\text{ 连续}\iff\lim_{x\to a}f(x)=f(a)`],
    conditions: [R`闭区间 $[a,b]$ 上连续是中间值定理、最大值最小值定理的前提。`],
    theorems: [
      R`中间值定理：$f$ 在 $[a,b]$ 上连续且 $f(a)\neq f(b)$，则 $f(a)$ 与 $f(b)$ 之间的任何值都能取到。`,
      R`最大值最小值定理：闭区间上的连续函数一定有最大值和最小值。`,
    ],
    related: ['calc.limits.k.function'],
  },
};
