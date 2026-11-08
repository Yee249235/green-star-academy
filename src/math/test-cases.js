// 公式测试页的内容。所有等式的数值结果都已用 SymPy 验算。
// 构建期校验脚本也会检查这里的每一条（expectError 的除外）。
export const mathTestGroups = [
  {
    title: '分数与根号',
    items: [
      { id: 'frac', tex: String.raw`\frac{a+b}{c-d},\qquad \dfrac{1}{1+\dfrac{1}{x}}` },
      { id: 'sqrt', tex: String.raw`\sqrt{x^2+y^2},\qquad \sqrt[3]{1+x},\qquad \frac{1}{\sqrt{1-x^2}}` },
    ],
  },
  {
    title: '上下标与幂次',
    items: [{ id: 'scripts', tex: String.raw`a_{ij}^{(k)},\qquad e^{-x^2},\qquad x^{\frac{1}{3}},\qquad 2^{2^n}` }],
  },
  {
    title: '极限',
    items: [
      { id: 'lim-sin', tex: String.raw`\lim_{x\to 0}\frac{\sin x}{x}=1` },
      { id: 'lim-e', tex: String.raw`\lim_{n\to\infty}\left(1+\frac{1}{n}\right)^{n}=e` },
      { id: 'lim-xlogx', tex: String.raw`\lim_{x\to +0}x\log x=0` },
    ],
  },
  {
    title: '导数',
    items: [
      { id: 'deriv', tex: String.raw`\frac{d}{dx}\arctan x=\frac{1}{1+x^2}` },
      { id: 'deriv-higher', tex: String.raw`f''(x),\qquad f^{(n)}(x),\qquad \frac{d^2y}{dx^2}` },
    ],
  },
  {
    title: '偏导数',
    items: [
      { id: 'partial-mixed', tex: String.raw`\frac{\partial^2 f}{\partial x\,\partial y}=\frac{\partial^2 f}{\partial y\,\partial x}` },
      {
        id: 'partial-chain',
        tex: String.raw`\frac{\partial z}{\partial u}=\frac{\partial z}{\partial x}\frac{\partial x}{\partial u}+\frac{\partial z}{\partial y}\frac{\partial y}{\partial u}`,
      },
    ],
  },
  {
    title: '积分',
    items: [
      { id: 'int-power', tex: String.raw`\int x^{\alpha}\,dx=\frac{x^{\alpha+1}}{\alpha+1}+C\qquad(\alpha\neq-1)` },
      { id: 'int-sin2', tex: String.raw`\int_0^{\pi/2}\sin^2 x\,dx=\frac{\pi}{4}` },
      { id: 'int-gauss', tex: String.raw`\int_0^{\infty}e^{-x^2}\,dx=\frac{\sqrt{\pi}}{2}` },
    ],
  },
  {
    title: '重积分',
    items: [
      {
        id: 'iint-polar',
        tex: String.raw`\begin{aligned}&\iint_D (x^2+y^2)\,dx\,dy\\&\qquad=\int_0^{2\pi}\!\!\int_0^{1} r^2\cdot r\,dr\,d\theta=\frac{\pi}{2}\end{aligned}`,
      },
      { id: 'iint-domain', tex: String.raw`D=\{(x,y)\mid x^2+y^2\le 1\}` },
      { id: 'iiint', tex: String.raw`\iiint_V f(x,y,z)\,dx\,dy\,dz` },
    ],
  },
  {
    title: '求和',
    items: [
      { id: 'sum-sq', tex: String.raw`\sum_{k=1}^{n}k^2=\frac{n(n+1)(2n+1)}{6}` },
      { id: 'sum-exp', tex: String.raw`\sum_{n=0}^{\infty}\frac{x^n}{n!}=e^x` },
    ],
  },
  {
    title: '矩阵',
    items: [
      {
        id: 'matmul',
        tex: String.raw`\begin{pmatrix}1&2\\3&4\end{pmatrix}\begin{pmatrix}5&6\\7&8\end{pmatrix}=\begin{pmatrix}19&22\\43&50\end{pmatrix}`,
      },
      {
        id: 'augmented',
        tex: String.raw`\left(\begin{array}{ccc|c}1&2&-1&3\\2&-1&1&1\\1&1&1&6\end{array}\right)`,
      },
    ],
  },
  {
    title: '行列式',
    items: [
      { id: 'det3', tex: String.raw`\begin{vmatrix}1&2&3\\4&5&6\\7&8&10\end{vmatrix}=-3` },
      { id: 'det-prod', tex: String.raw`\det(AB)=\det A\,\det B` },
      {
        id: 'jacobian',
        tex: String.raw`\frac{\partial(x,y)}{\partial(r,\theta)}=\begin{vmatrix}\cos\theta&-r\sin\theta\\\sin\theta&r\cos\theta\end{vmatrix}=r`,
      },
      {
        id: 'eigen',
        tex: String.raw`\begin{aligned}\det(A-\lambda E)&=\begin{vmatrix}2-\lambda&1\\1&2-\lambda\end{vmatrix}\\&=(\lambda-1)(\lambda-3)\end{aligned}`,
      },
    ],
  },
  {
    title: 'Taylor 展开',
    items: [
      {
        id: 'taylor',
        tex: String.raw`\begin{gathered}f(x)=\sum_{k=0}^{n-1}\frac{f^{(k)}(a)}{k!}(x-a)^k+R_n(x)\\R_n(x)=\frac{f^{(n)}(c)}{n!}(x-a)^n\end{gathered}`,
      },
      {
        id: 'maclaurin-exp',
        tex: String.raw`\begin{aligned}e^x&=1+x+\frac{x^2}{2!}+\cdots+\frac{x^{n-1}}{(n-1)!}\\&\qquad+\frac{e^{\theta x}}{n!}x^n\quad(0<\theta<1)\end{aligned}`,
      },
    ],
  },
  {
    title: '多行推导（等号对齐）',
    items: [
      {
        id: 'aligned',
        tex: String.raw`\begin{aligned}\lim_{x\to0}\frac{e^x-1-x}{x^2}&\overset{\text{洛必达}}{=}\lim_{x\to0}\frac{e^x-1}{2x}\\[10pt]&\overset{\text{洛必达}}{=}\lim_{x\to0}\frac{e^x}{2}\\[10pt]&=\frac{1}{2}\end{aligned}`,
      },
    ],
  },
  {
    title: '分段函数',
    items: [
      {
        id: 'cases',
        tex: String.raw`f(x)=\begin{cases}x\sin\dfrac{1}{x}&(x\neq0)\\[4pt]0&(x=0)\end{cases}`,
      },
    ],
  },
  {
    title: '长公式（手机宽度测试）',
    items: [
      {
        id: 'binomial5',
        tex: String.raw`\begin{aligned}(a+b)^5&=a^5+5a^4b+10a^3b^2\\&\qquad+10a^2b^3+5ab^4+b^5\end{aligned}`,
      },
      {
        id: 'maclaurin-log',
        tex: String.raw`\begin{aligned}\log(1+x)&=x-\frac{x^2}{2}+\frac{x^3}{3}-\frac{x^4}{4}+\cdots\\&\qquad+(-1)^{n-1}\frac{x^n}{n}+\cdots\end{aligned}`,
      },
      {
        id: 'scroll-demo',
        note: '故意不拆行的长公式：手机上只在公式框内左右滑动，不会翻页，也不会撑宽整个页面。',
        tex: String.raw`\log(1+x)=x-\frac{x^2}{2}+\frac{x^3}{3}-\frac{x^4}{4}+\cdots+(-1)^{n-1}\frac{x^n}{n}+\cdots`,
      },
      { id: 'det4', tex: String.raw`\begin{vmatrix}1&0&2&-1\\3&1&0&2\\-1&2&1&0\\2&-1&3&1\end{vmatrix}=43` },
    ],
  },
];

// 正文中的行内公式
export const mathTestInline = [
  String.raw`当 $x\to 0$ 时，$\sin x\sim x$，$1-\cos x\sim \dfrac{x^2}{2}$，$\log(1+x)\sim x$。`,
  String.raw`若 $\lim_{x\to a}f(x)=\lim_{x\to a}g(x)=0$，且 $\lim_{x\to a}\dfrac{f'(x)}{g'(x)}$ 存在，则可用洛必达法则。`,
  String.raw`矩阵 $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$ 的行列式为 $\det A=-2$。`,
];

// 故意写错的公式：演示网页上的兜底显示（校验脚本会跳过这一条）
export const mathTestBroken = { id: 'broken', tex: String.raw`\frac{1}{`, expectError: true };
