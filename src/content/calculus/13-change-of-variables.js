// 第 13 章 变量变换
const R = String.raw;

const K = {
  jacobian: {
    id: 'calc.cov.k.jacobian',
    name: { zh: 'Jacobi 行列式与变量变换', ja: 'ヤコビアンと変数変換', kana: 'ヤコビアンとへんすうへんかん' },
    paragraphs: [
      R`变换 $x=x(u,v)$，$y=y(u,v)$ 把 $uv$ 平面的区域 $E$ 映到 $xy$ 平面的 $D$。小面积元按 Jacobi 行列式的绝对值伸缩。`,
    ],
    definitions: [
      R`J=\frac{\partial(x,y)}{\partial(u,v)}=\begin{vmatrix}x_u&x_v\\y_u&y_v\end{vmatrix}`,
      R`\begin{aligned}&\iint_Df(x,y)\,dx\,dy\\&\quad=\iint_Ef\bigl(x(u,v),y(u,v)\bigr)\,|J|\,du\,dv\end{aligned}`,
    ],
    conditions: [R`变换是一一对应、$C^1$ 级，$J\neq0$（边界上可以为 0）。`],
    theorems: [
      R`极坐标：$|J|=r$；柱坐标：$|J|=r$；球坐标：$|J|=\rho^2\sin\varphi$。`,
      R`$\dfrac{\partial(x,y)}{\partial(u,v)}=1\Big/\dfrac{\partial(u,v)}{\partial(x,y)}$：已知 $u,v$ 用 $x,y$ 表示时可直接求倒数。`,
    ],
    related: ['calc.mult.k.double'],
  },
};

const cards = [
  {
    id: 'calc.cov.jacobian',
    name: { zh: 'Jacobi 行列式的计算', ja: 'ヤコビアンの計算', kana: 'ヤコビアンのけいさん' },
    knowledge: ['calc.cov.k.jacobian'],
    formula: R`\frac{\partial(x,y)}{\partial(u,v)}=x_uy_v-x_vy_u`,
    conditions: [R`变换积分时取绝对值 $|J|$。`],
    scenarios: [R`任何二重积分的变量变换。`],
    steps: [R`把 $x,y$ 写成 $u,v$ 的函数（或用倒数关系）。`, R`求四个偏导数。`, R`计算行列式并取绝对值。`],
    pitfalls: [R`忘记取绝对值会使面积变成负数。`],
    exercises: [
      {
        id: 'calc.cov.jacobian.ex1',
        difficulty: '易',
        question: {
          zh: R`变换 $u=x+y$，$v=x-y$。求 $\dfrac{\partial(x,y)}{\partial(u,v)}$。`,
          ja: R`変換 $u=x+y$，$v=x-y$ について，$\dfrac{\partial(x,y)}{\partial(u,v)}$ を求めよ。`,
          en: R`For $u=x+y$, $v=x-y$, find $\dfrac{\partial(x,y)}{\partial(u,v)}$.`,
        },
        answer: R`-\frac{1}{2}\qquad\left(|J|=\frac12\right)`,
        idea: R`$x=\dfrac{u+v}{2}$，$y=\dfrac{u-v}{2}$。`,
        solution: [{ math: R`\begin{vmatrix}\frac12&\frac12\\[2pt]\frac12&-\frac12\end{vmatrix}=-\frac14-\frac14=-\frac12` }],
        pitfalls: [R`也可以算 $\dfrac{\partial(u,v)}{\partial(x,y)}=-2$ 再取倒数。`],
        verify: { type: 'equal', lhs: 'Matrix([[diff((u+v)/2, u), diff((u+v)/2, v)], [diff((u-v)/2, u), diff((u-v)/2, v)]]).det()', rhs: '-Rational(1,2)' },
      },
    ],
  },
  {
    id: 'calc.cov.polar',
    name: { zh: '极坐标变换', ja: '極座標変換', kana: 'きょくざひょうへんかん' },
    knowledge: ['calc.cov.k.jacobian'],
    formula: R`\begin{gathered}x=r\cos\theta,\quad y=r\sin\theta\\dx\,dy=r\,dr\,d\theta\end{gathered}`,
    conditions: [R`$r\ge0$；别漏掉面积元中的 $r$。`],
    scenarios: [R`区域是圆、扇形、圆环；被积函数含 $x^2+y^2$。`],
    steps: [R`用 $r,\theta$ 描述区域。`, R`代入被积函数，乘 $r$。`, R`按 $r$、$\theta$ 积分。`],
    pitfalls: [R`偏心圆 $(x-1)^2+y^2\le1$：$r\le2\cos\theta$，$-\frac{\pi}{2}\le\theta\le\frac{\pi}{2}$。`],
    exercises: [
      {
        id: 'calc.cov.polar.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\displaystyle\iint_De^{-(x^2+y^2)}\,dx\,dy$，$D=\{x^2+y^2\le1\}$。`,
          ja: R`$D=\{x^2+y^2\le1\}$ のとき，$\displaystyle\iint_De^{-(x^2+y^2)}\,dx\,dy$ を求めよ。`,
          en: R`Evaluate $\displaystyle\iint_De^{-(x^2+y^2)}\,dx\,dy$ over $D=\{x^2+y^2\le1\}$.`,
        },
        answer: R`\pi\left(1-\frac{1}{e}\right)`,
        idea: R`$x^2+y^2=r^2$，$0\le r\le1$，$0\le\theta\le2\pi$。`,
        solution: [
          { math: R`\begin{aligned}\int_0^{2\pi}\!\!\int_0^1e^{-r^2}r\,dr\,d\theta&=2\pi\Bigl[-\frac12e^{-r^2}\Bigr]_0^1\\&=\pi\left(1-e^{-1}\right)\end{aligned}` },
        ],
        pitfalls: [R`面积元的 $r$ 恰好使 $e^{-r^2}$ 可以积分。`],
        verify: { type: 'equal', lhs: 'integrate(exp(-r**2)*r, (r, 0, 1), (theta, 0, 2*pi))', rhs: 'pi*(1-exp(-1))' },
      },
      {
        id: 'calc.cov.polar.ex2',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\iint_Dx\,dx\,dy$，$D=\{x^2+y^2\le2x\}$。`,
          ja: R`$D=\{x^2+y^2\le2x\}$ のとき，$\displaystyle\iint_Dx\,dx\,dy$ を求めよ。`,
          en: R`Evaluate $\displaystyle\iint_Dx\,dx\,dy$ over $D=\{x^2+y^2\le2x\}$.`,
        },
        answer: R`\pi`,
        idea: R`$r^2\le2r\cos\theta\iff r\le2\cos\theta$，$-\frac{\pi}{2}\le\theta\le\frac{\pi}{2}$。`,
        solution: [
          { math: R`\int_{-\frac{\pi}{2}}^{\frac{\pi}{2}}\!\!\int_0^{2\cos\theta}r\cos\theta\cdot r\,dr\,d\theta=\int_{-\frac{\pi}{2}}^{\frac{\pi}{2}}\frac{8}{3}\cos^4\theta\,d\theta` },
          { math: R`=\frac{16}{3}\int_0^{\frac{\pi}{2}}\cos^4\theta\,d\theta=\frac{16}{3}\cdot\frac{3\pi}{16}=\pi` },
        ],
        pitfalls: [R`检查：$D$ 是圆心 $(1,0)$、半径 1 的圆，$\displaystyle\iint x=$ 面积 $\pi\times$ 重心 $x$ 坐标 $1=\pi$。`],
        verify: { type: 'equal', lhs: 'integrate(r**2*cos(theta), (r, 0, 2*cos(theta)), (theta, -pi/2, pi/2))', rhs: 'pi' },
      },
    ],
  },
  {
    id: 'calc.cov.linear',
    name: { zh: '一次变换', ja: '1 次変換による置換', kana: 'いちじへんかんによるちかん' },
    knowledge: ['calc.cov.k.jacobian'],
    formula: R`\begin{gathered}u=ax+by,\quad v=cx+dy\\dx\,dy=\frac{du\,dv}{|ad-bc|}\end{gathered}`,
    conditions: [R`$ad-bc\neq0$。`],
    scenarios: [R`区域由 $x+y$、$x-y$ 等一次式的不等式给出（平行四边形）。`],
    steps: [R`令 $u,v$ 为区域边界中的一次式。`, R`求 $|J|=\dfrac{1}{|ad-bc|}$。`, R`在 $uv$ 平面的矩形上积分。`],
    pitfalls: [R`$|J|$ 是 $\dfrac{\partial(u,v)}{\partial(x,y)}$ 的倒数，不是它本身。`],
    exercises: [
      {
        id: 'calc.cov.linear.ex1',
        difficulty: '中',
        question: {
          zh: R`$D=\{|x+y|\le1,\ |x-y|\le1\}$。求 $\displaystyle\iint_D(x+y)^2\,dx\,dy$。`,
          ja: R`$D=\{|x+y|\le1,\ |x-y|\le1\}$ のとき，$\displaystyle\iint_D(x+y)^2\,dx\,dy$ を求めよ。`,
          en: R`Let $D=\{|x+y|\le1,\ |x-y|\le1\}$. Evaluate $\displaystyle\iint_D(x+y)^2\,dx\,dy$.`,
        },
        answer: R`\frac{2}{3}`,
        idea: R`$u=x+y$，$v=x-y$，$|J|=\dfrac12$，区域变为正方形 $[-1,1]^2$。`,
        solution: [{ math: R`\int_{-1}^{1}\!\!\int_{-1}^{1}u^2\cdot\frac12\,du\,dv=\frac12\cdot\frac23\cdot2=\frac23` }],
        pitfalls: [R`$\displaystyle\int_{-1}^1u^2du=\frac23$，$\displaystyle\int_{-1}^1dv=2$。`],
        verify: { type: 'equal', lhs: 'integrate(u**2/2, (u, -1, 1), (v, -1, 1))', rhs: 'Rational(2,3)' },
      },
    ],
  },
  {
    id: 'calc.cov.cylindrical',
    name: { zh: '柱坐标', ja: '円柱座標', kana: 'えんちゅうざひょう' },
    knowledge: ['calc.cov.k.jacobian', 'calc.mult.k.triple'],
    formula: R`\begin{gathered}x=r\cos\theta,\quad y=r\sin\theta,\quad z=z\\dx\,dy\,dz=r\,dr\,d\theta\,dz\end{gathered}`,
    conditions: [R`适合关于 $z$ 轴旋转对称的区域。`],
    scenarios: [R`圆柱、圆锥、旋转抛物面围成的立体。`],
    steps: [R`$z$ 的范围由上下曲面决定（用 $r$ 表示）。`, R`$r,\theta$ 描述投影区域。`, R`乘 $r$ 积分。`],
    pitfalls: [R`$x^2+y^2=r^2$，不要写成 $r$。`],
    exercises: [
      {
        id: 'calc.cov.cylindrical.ex1',
        difficulty: '易',
        question: {
          zh: R`求旋转抛物面 $z=x^2+y^2$ 与平面 $z=1$ 围成的立体的体积。`,
          ja: R`回転放物面 $z=x^2+y^2$ と平面 $z=1$ で囲まれた立体の体積を求めよ。`,
          en: R`Find the volume enclosed by $z=x^2+y^2$ and the plane $z=1$.`,
        },
        answer: R`\frac{\pi}{2}`,
        idea: R`$r^2\le z\le1$，$0\le r\le1$。`,
        solution: [{ math: R`\begin{aligned}V&=\int_0^{2\pi}\!\!\int_0^1(1-r^2)\,r\,dr\,d\theta\\&=2\pi\left(\frac12-\frac14\right)=\frac{\pi}{2}\end{aligned}` }],
        pitfalls: [R`高度是 $1-r^2$（上减下）。`],
        verify: { type: 'equal', lhs: 'integrate((1-r**2)*r, (r, 0, 1), (theta, 0, 2*pi))', rhs: 'pi/2' },
      },
    ],
  },
  {
    id: 'calc.cov.spherical',
    name: { zh: '球坐标', ja: '極座標（3 次元）・球座標', kana: 'きゅうざひょう' },
    knowledge: ['calc.cov.k.jacobian', 'calc.mult.k.triple'],
    formula: R`\begin{gathered}x=\rho\sin\varphi\cos\theta,\quad y=\rho\sin\varphi\sin\theta\\z=\rho\cos\varphi\\dx\,dy\,dz=\rho^2\sin\varphi\,d\rho\,d\varphi\,d\theta\end{gathered}`,
    conditions: [R`$0\le\varphi\le\pi$（与 $z$ 轴正向的夹角），$0\le\theta\le2\pi$。`],
    scenarios: [R`球、球壳上的积分；被积函数含 $x^2+y^2+z^2$。`],
    steps: [R`$x^2+y^2+z^2=\rho^2$。`, R`确定 $\rho,\varphi,\theta$ 的范围。`, R`乘 $\rho^2\sin\varphi$ 积分；三个变量常可分离。`],
    pitfalls: [R`各教材 $\varphi$、$\theta$ 的记号可能互换，要以面积元 $\rho^2\sin(\text{与 } z \text{ 轴的夹角})$ 为准。`],
    exercises: [
      {
        id: 'calc.cov.spherical.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $\displaystyle\iiint_V\left(x^2+y^2+z^2\right)dx\,dy\,dz$，$V$ 为单位球 $x^2+y^2+z^2\le1$。`,
          ja: R`$V$ を単位球 $x^2+y^2+z^2\le1$ とするとき，$\displaystyle\iiint_V\left(x^2+y^2+z^2\right)dx\,dy\,dz$ を求めよ。`,
          en: R`Evaluate $\displaystyle\iiint_V\left(x^2+y^2+z^2\right)dx\,dy\,dz$ over the unit ball.`,
        },
        answer: R`\frac{4\pi}{5}`,
        idea: R`被积函数 $=\rho^2$，三个积分分离。`,
        solution: [{ math: R`\int_0^{2\pi}d\theta\int_0^{\pi}\sin\varphi\,d\varphi\int_0^1\rho^4\,d\rho=2\pi\cdot2\cdot\frac15=\frac{4\pi}{5}` }],
        pitfalls: [R`$\displaystyle\int_0^\pi\sin\varphi\,d\varphi=2$。`],
        verify: { type: 'equal', lhs: 'integrate(rho**4*sin(phi), (rho, 0, 1), (phi, 0, pi), (theta, 0, 2*pi))', rhs: '4*pi/5' },
      },
    ],
  },
];

export const changeOfVariablesChapter = {
  overview: 'Jacobi 行列式与重积分的变量变换：极坐标、一次变换、柱坐标、球坐标。',
  sections: [{ title: '变量变换', knowledge: [K.jacobian], formulas: cards }],
};
