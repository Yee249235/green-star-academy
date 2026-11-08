// 线性代数 第 13～16 章：对角化、内积、正交化、二次型
const R = String.raw;

// ---------------- 第 13 章 矩阵的对角化 ----------------
const KDG = {
  diag: {
    id: 'la.diag.k.diag',
    name: { zh: '对角化', ja: '対角化', kana: 'たいかくか' },
    paragraphs: [
      R`若存在正则矩阵 $P$ 使 $P^{-1}AP$ 为对角矩阵，称 $A$ **可对角化**。此时 $P$ 的各列是特征向量，对角成分是对应的特征值（顺序一致）。`,
      R`对角化最常用于求 $A^n$ 和解联立递推式、线性微分方程组。`,
    ],
    definitions: [R`P^{-1}AP=\begin{pmatrix}\lambda_1&&\\&\ddots&\\&&\lambda_n\end{pmatrix}`],
    conditions: [R`$A$ 可对角化 $\iff$ 有 $n$ 个线性无关的特征向量 $\iff$ 每个特征值 $\lambda$ 都满足 $\dim W(\lambda)=$ 重数。`],
    theorems: [R`$n$ 个特征值互不相同时一定可对角化。`, R`$A^n=PD^nP^{-1}$。`],
    related: ['la.eig.k.eigen'],
  },
};

const diagCards = [
  {
    id: 'la.diag.2x2',
    name: { zh: '二阶矩阵的对角化', ja: '2 次正方行列の対角化', kana: 'にじせいほうぎょうれつのたいかくか' },
    knowledge: ['la.diag.k.diag'],
    formula: R`P=(\boldsymbol p_1\ \ \boldsymbol p_2),\qquad P^{-1}AP=\begin{pmatrix}\lambda_1&0\\0&\lambda_2\end{pmatrix}`,
    conditions: [R`$A\boldsymbol p_i=\lambda_i\boldsymbol p_i$，$\boldsymbol p_1,\boldsymbol p_2$ 线性无关。`],
    scenarios: [R`二阶矩阵对角化。`],
    steps: [R`求特征值与特征向量。`, R`特征向量按顺序排成 $P$。`, R`写出 $P^{-1}AP$（不必真的计算乘积）。`],
    pitfalls: [R`$P$ 的列顺序与对角成分的顺序必须一致。`],
    exercises: [
      {
        id: 'la.diag.2x2.ex1',
        difficulty: '易',
        question: {
          zh: R`把 $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$ 对角化。`,
          ja: R`$A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$ を対角化せよ。`,
          en: R`Diagonalize $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$.`,
        },
        answer: R`P=\begin{pmatrix}1&1\\-2&1\end{pmatrix},\qquad P^{-1}AP=\begin{pmatrix}2&0\\0&5\end{pmatrix}`,
        idea: R`第 12 章已求出：$\lambda=2$ 对应 $(1,-2)$，$\lambda=5$ 对应 $(1,1)$。`,
        solution: [R`把两个特征向量依次作为列排成 $P$，$\det P=3\neq0$。`],
        pitfalls: [R`$P$ 不唯一，特征向量的倍数也可以。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,1],[-2,1]]).inv()*Matrix([[4,1],[2,3]])*Matrix([[1,1],[-2,1]])', rhs: 'diag(2,5)' },
      },
    ],
  },
  {
    id: 'la.diag.3x3',
    name: { zh: '有重根时的对角化', ja: '重解をもつ場合の対角化', kana: 'じゅうかいをもつばあいのたいかくか' },
    knowledge: ['la.diag.k.diag'],
    formula: R`\begin{gathered}\dim W(\lambda)=n-\rank(A-\lambda E)\\=\lambda\ \text{的重数}\end{gathered}`,
    conditions: [R`对每个重根检查这一条件。`],
    scenarios: [R`特征多项式有重根的三阶矩阵。`],
    steps: [R`对重根 $\lambda$ 求 $\rank(A-\lambda E)$。`, R`维数等于重数则可对角化，取特征空间的基底作为 $P$ 的列。`],
    pitfalls: [R`单根的特征空间维数一定是 1，不必检查。`],
    exercises: [
      {
        id: 'la.diag.3x3.ex1',
        difficulty: '中',
        question: {
          zh: R`把 $A=\begin{pmatrix}2&0&0\\1&2&1\\1&0&3\end{pmatrix}$ 对角化。`,
          ja: R`$A=\begin{pmatrix}2&0&0\\1&2&1\\1&0&3\end{pmatrix}$ を対角化せよ。`,
          en: R`Diagonalize $A=\begin{pmatrix}2&0&0\\1&2&1\\1&0&3\end{pmatrix}$.`,
        },
        answer: R`\begin{gathered}P=\begin{pmatrix}0&-1&0\\1&0&1\\0&1&1\end{pmatrix}\\P^{-1}AP=\begin{pmatrix}2&0&0\\0&2&0\\0&0&3\end{pmatrix}\end{gathered}`,
        idea: R`第 12 章：$W(2)=\langle(0,1,0),(-1,0,1)\rangle$，$W(3)=\langle(0,1,1)\rangle$。`,
        solution: [R`$\lambda=2$ 是二重根，且 $\dim W(2)=2$，所以可对角化。三个特征向量依次排成 $P$。`],
        pitfalls: [R`$\det P=1\neq0$，确认线性无关。`],
        verify: { type: 'equal', lhs: 'Matrix([[0,-1,0],[1,0,1],[0,1,1]]).inv()*Matrix([[2,0,0],[1,2,1],[1,0,3]])*Matrix([[0,-1,0],[1,0,1],[0,1,1]])', rhs: 'diag(2,2,3)' },
      },
    ],
  },
  {
    id: 'la.diag.criterion',
    name: { zh: '不能对角化的判定', ja: '対角化できない場合の判定', kana: 'たいかくかできないばあいのはんてい' },
    knowledge: ['la.diag.k.diag'],
    formula: R`\dim W(\lambda)<\lambda\ \text{的重数}\ \Longrightarrow\ \text{不能对角化}`,
    conditions: [R`只要有一个特征值不满足，就不能对角化。`],
    scenarios: [R`判断矩阵能否对角化；含参数时求可对角化的条件。`],
    steps: [R`求特征值及重数。`, R`对重根算 $\rank(A-\lambda E)$。`],
    pitfalls: [R`$\begin{pmatrix}\lambda&1\\0&\lambda\end{pmatrix}$ 是不能对角化的典型例子。`],
    exercises: [
      {
        id: 'la.diag.criterion.ex1',
        difficulty: '易',
        question: {
          zh: R`判断 $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ 能否对角化。`,
          ja: R`$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ は対角化可能か。`,
          en: R`Is $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ diagonalizable?`,
        },
        answerText: R`不能。特征值 $1$ 是二重根，但 $\dim W(1)=2-\rank(A-E)=1<2$。`,
        idea: R`$A-E=\begin{pmatrix}0&1\\0&0\end{pmatrix}$，秩为 1。`,
        solution: [R`特征值只有 $1$（二重）。特征向量只有 $c(1,0)$ 一个方向，凑不出 2 个线性无关的特征向量。`],
        pitfalls: [R`特征值有重根不等于不能对角化，要看特征空间的维数。`],
        verify: { type: 'equal', lhs: '(Matrix([[1,1],[0,1]])-eye(2)).rank()', rhs: '1' },
      },
      {
        id: 'la.diag.criterion.ex2',
        difficulty: '中',
        question: {
          zh: R`$A=\begin{pmatrix}2&a&0\\0&2&0\\0&0&1\end{pmatrix}$。求 $A$ 可对角化的条件。`,
          ja: R`$A=\begin{pmatrix}2&a&0\\0&2&0\\0&0&1\end{pmatrix}$ が対角化可能となる条件を求めよ。`,
          en: R`Find the condition for $A=\begin{pmatrix}2&a&0\\0&2&0\\0&0&1\end{pmatrix}$ to be diagonalizable.`,
        },
        answer: R`a=0`,
        idea: R`特征值 $2$（二重）、$1$。`,
        solution: [
          { math: R`A-2E=\begin{pmatrix}0&a&0\\0&0&0\\0&0&-1\end{pmatrix}` },
          R`$a\neq0$ 时秩为 2，$\dim W(2)=1<2$，不能对角化；$a=0$ 时 $A$ 本身就是对角矩阵。`,
        ],
        pitfalls: [R`要对二重根 $\lambda=2$ 检查。`],
        verify: { type: 'equal', lhs: 'Matrix([[0,1,0],[0,0,0],[0,0,-1]]).rank()', rhs: '2' },
      },
    ],
  },
  {
    id: 'la.diag.power',
    name: { zh: '用对角化求矩阵的幂', ja: '対角化による行列の累乗', kana: 'たいかくかによるぎょうれつのるいじょう' },
    knowledge: ['la.diag.k.diag'],
    formula: R`A^n=P\begin{pmatrix}\lambda_1^n&&\\&\ddots&\\&&\lambda_n^n\end{pmatrix}P^{-1}`,
    conditions: [R`$A$ 可对角化。`],
    scenarios: [R`求 $A^n$ 的一般形式。`],
    steps: [R`对角化得到 $P$、$D$。`, R`求 $P^{-1}$。`, R`计算 $PD^nP^{-1}$。`],
    pitfalls: [R`顺序是 $PD^nP^{-1}$，不是 $P^{-1}D^nP$。用 $n=1$ 代回检查。`],
    exercises: [
      {
        id: 'la.diag.power.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$ 的 $A^n$。`,
          ja: R`$A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$ のとき，$A^n$ を求めよ。`,
          en: R`For $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$, find $A^n$.`,
        },
        answer: R`A^n=\frac13\begin{pmatrix}2^n+2\cdot5^n&5^n-2^n\\2\cdot5^n-2^{n+1}&2^{n+1}+5^n\end{pmatrix}`,
        idea: R`$P=\begin{pmatrix}1&1\\-2&1\end{pmatrix}$，$P^{-1}=\dfrac13\begin{pmatrix}1&-1\\2&1\end{pmatrix}$。`,
        solution: [
          { math: R`A^n=\frac13\begin{pmatrix}1&1\\-2&1\end{pmatrix}\begin{pmatrix}2^n&0\\0&5^n\end{pmatrix}\begin{pmatrix}1&-1\\2&1\end{pmatrix}` },
          { math: R`=\frac13\begin{pmatrix}2^n&5^n\\-2^{n+1}&5^n\end{pmatrix}\begin{pmatrix}1&-1\\2&1\end{pmatrix}` },
        ],
        pitfalls: [R`$n=1$：$\dfrac13\begin{pmatrix}12&3\\6&9\end{pmatrix}=A$，正确。`],
        verify: { type: 'equal', lhs: 'Matrix([[4,1],[2,3]])**6', rhs: 'Matrix([[2**6+2*5**6, 5**6-2**6],[2*5**6-2**7, 2**7+5**6]])/3' },
      },
    ],
  },
  {
    id: 'la.diag.recurrence',
    name: { zh: '联立递推式', ja: '連立漸化式', kana: 'れんりつぜんかしき' },
    knowledge: ['la.diag.k.diag'],
    formula: R`\begin{gathered}\begin{pmatrix}a_{n+1}\\b_{n+1}\end{pmatrix}=A\begin{pmatrix}a_n\\b_n\end{pmatrix}\\\Longrightarrow\ \begin{pmatrix}a_n\\b_n\end{pmatrix}=A^{n-1}\begin{pmatrix}a_1\\b_1\end{pmatrix}\end{gathered}`,
    conditions: [R`系数矩阵 $A$ 可对角化。`],
    scenarios: [R`两个数列互相递推。`],
    steps: [R`写成矩阵形式。`, R`用对角化求 $A^{n-1}$。`, R`乘初始向量。`],
    pitfalls: [R`指数是 $n-1$（从 $a_1$ 开始时）。`],
    exercises: [
      {
        id: 'la.diag.recurrence.ex1',
        difficulty: '中',
        question: {
          zh: R`$a_1=1$，$b_1=0$，$a_{n+1}=4a_n+b_n$，$b_{n+1}=2a_n+3b_n$。求 $a_n$、$b_n$。`,
          ja: R`$a_1=1$，$b_1=0$，$a_{n+1}=4a_n+b_n$，$b_{n+1}=2a_n+3b_n$ のとき，$a_n$，$b_n$ を求めよ。`,
          en: R`Given $a_1=1$, $b_1=0$, $a_{n+1}=4a_n+b_n$, $b_{n+1}=2a_n+3b_n$, find $a_n$ and $b_n$.`,
        },
        answer: R`\begin{gathered}a_n=\frac{2^{n-1}+2\cdot5^{n-1}}{3}\\b_n=\frac{2\cdot5^{n-1}-2^n}{3}\end{gathered}`,
        idea: R`系数矩阵就是上一张卡的 $A$，取 $A^{n-1}$ 的第 1 列。`,
        solution: [R`$(a_n,b_n)^T=A^{n-1}(1,0)^T$ 就是 $A^{n-1}$ 的第 1 列，把上一张卡的结果中 $n$ 换成 $n-1$。`],
        pitfalls: [R`检查：$a_2=4$，$b_2=2$；公式给出 $\dfrac{2+10}{3}=4$，$\dfrac{10-4}{3}=2$。`],
        verify: { type: 'equal', lhs: 'Matrix([[4,1],[2,3]])**4*Matrix([1,0])', rhs: 'Matrix([(2**4+2*5**4)/3, (2*5**4-2**5)/3])' },
      },
    ],
  },
];

export const diagonalizationChapter = {
  overview: '矩阵的对角化：二阶、有重根的三阶、不能对角化的判定，以及用对角化求 $A^n$ 与解联立递推式。',
  sections: [{ title: '对角化及其应用', knowledge: [KDG.diag], formulas: diagCards }],
};

// ---------------- 第 14 章 内积 ----------------
const KIP = {
  inner: {
    id: 'la.ip.k.inner',
    name: { zh: '内积与范数', ja: '内積とノルム', kana: 'ないせきとノルム' },
    paragraphs: [
      R`$\R^n$ 的**标准内积** $(\boldsymbol x,\boldsymbol y)=x_1y_1+\cdots+x_ny_n=\boldsymbol x^T\boldsymbol y$。一般地，满足对称性、线性、正定性的运算都称为内积（例如函数空间中的 $\int_a^bf(x)g(x)\,dx$）。`,
      R`**范数**（长度）$\|\boldsymbol x\|=\sqrt{(\boldsymbol x,\boldsymbol x)}$；$(\boldsymbol x,\boldsymbol y)=0$ 时称**正交**。`,
    ],
    definitions: [R`\|\boldsymbol x\|=\sqrt{(\boldsymbol x,\boldsymbol x)},\qquad\cos\theta=\frac{(\boldsymbol x,\boldsymbol y)}{\|\boldsymbol x\|\|\boldsymbol y\|}`],
    conditions: [R`正定性：$(\boldsymbol x,\boldsymbol x)\ge0$，等号仅当 $\boldsymbol x=\boldsymbol0$。`],
    theorems: [
      R`Cauchy–Schwarz：$|(\boldsymbol x,\boldsymbol y)|\le\|\boldsymbol x\|\|\boldsymbol y\|$。`,
      R`三角不等式：$\|\boldsymbol x+\boldsymbol y\|\le\|\boldsymbol x\|+\|\boldsymbol y\|$。`,
    ],
    related: ['la.vec.k.products', 'la.ip.k.complement'],
  },
  complement: {
    id: 'la.ip.k.complement',
    name: { zh: '正交补与正射影', ja: '直交補空間と正射影', kana: 'ちょっこうほくうかんとせいしゃえい' },
    paragraphs: [
      R`与子空间 $W$ 的所有向量正交的向量全体 $W^\perp$ 称为**正交补**，它也是子空间，且 $\dim W+\dim W^\perp=n$。`,
      R`每个 $\boldsymbol x$ 唯一地分解为 $\boldsymbol x=\boldsymbol x_W+\boldsymbol x_{W^\perp}$，$\boldsymbol x_W$ 称为 $\boldsymbol x$ 在 $W$ 上的**正射影**。`,
    ],
    definitions: [R`W^\perp=\{\boldsymbol x\mid(\boldsymbol x,\boldsymbol w)=0\ \ (\forall\boldsymbol w\in W)\}`],
    conditions: [R`$W=\langle\boldsymbol a_1,\dots,\boldsymbol a_k\rangle$ 时，只需与每个 $\boldsymbol a_i$ 正交。`],
    theorems: [],
    related: ['la.ip.k.inner'],
  },
};

const ipCards = [
  {
    id: 'la.ip.standard',
    name: { zh: '标准内积、范数与夹角', ja: '標準内積・ノルム・なす角', kana: 'ひょうじゅんないせき・ノルム・なすかく' },
    knowledge: ['la.ip.k.inner'],
    formula: R`(\boldsymbol x,\boldsymbol y)=\sum_{i=1}^nx_iy_i,\qquad\|\boldsymbol x\|=\sqrt{\sum_{i=1}^nx_i^2}`,
    conditions: [R`$\boldsymbol x,\boldsymbol y\in\R^n$；求夹角时两者都非零。`],
    scenarios: [R`$\R^n$ 中的长度、夹角、正交判定。`],
    steps: [R`对应分量相乘再相加。`, R`代入夹角公式。`],
    pitfalls: [R`四维以上没有「外积」，只能用内积。`],
    exercises: [
      {
        id: 'la.ip.standard.ex1',
        difficulty: '易',
        question: {
          zh: R`$\boldsymbol x=(1,2,2,0)$，$\boldsymbol y=(2,0,1,2)$。求 $(\boldsymbol x,\boldsymbol y)$、$\|\boldsymbol x\|$、$\|\boldsymbol y\|$ 及夹角 $\theta$ 的余弦。`,
          ja: R`$\boldsymbol x=(1,2,2,0)$，$\boldsymbol y=(2,0,1,2)$ について，$(\boldsymbol x,\boldsymbol y)$，$\|\boldsymbol x\|$，$\|\boldsymbol y\|$ となす角 $\theta$ の余弦を求めよ。`,
          en: R`For $\boldsymbol x=(1,2,2,0)$, $\boldsymbol y=(2,0,1,2)$, find $(\boldsymbol x,\boldsymbol y)$, $\|\boldsymbol x\|$, $\|\boldsymbol y\|$ and $\cos\theta$.`,
        },
        answer: R`(\boldsymbol x,\boldsymbol y)=4,\quad\|\boldsymbol x\|=\|\boldsymbol y\|=3,\quad\cos\theta=\frac49`,
        idea: R`$2+0+2+0=4$。`,
        solution: [{ math: R`\|\boldsymbol x\|=\sqrt{1+4+4}=3` }, { math: R`\|\boldsymbol y\|=\sqrt{4+1+4}=3` }, { math: R`\cos\theta=\frac{4}{3\cdot3}=\frac49` }],
        pitfalls: [R`余弦为正，所以是锐角。`],
        verify: { type: 'equal', lhs: 'Matrix([1,2,2,0]).dot(Matrix([2,0,1,2]))/(Matrix([1,2,2,0]).norm()*Matrix([2,0,1,2]).norm())', rhs: 'Rational(4,9)' },
      },
    ],
  },
  {
    id: 'la.ip.projection',
    name: { zh: '向量的正射影', ja: 'ベクトルの正射影', kana: 'ベクトルのせいしゃえい' },
    knowledge: ['la.ip.k.complement'],
    formula: R`\operatorname{proj}_{\boldsymbol a}\boldsymbol b=\frac{(\boldsymbol b,\boldsymbol a)}{\|\boldsymbol a\|^2}\,\boldsymbol a`,
    conditions: [R`$\boldsymbol a\neq\boldsymbol0$。`],
    scenarios: [R`把向量分解为平行分量和垂直分量；Gram–Schmidt 正交化的每一步。`],
    steps: [R`算 $(\boldsymbol b,\boldsymbol a)$ 和 $\|\boldsymbol a\|^2$。`, R`乘以 $\boldsymbol a$。`, R`垂直分量 $=\boldsymbol b-\operatorname{proj}_{\boldsymbol a}\boldsymbol b$。`],
    pitfalls: [R`分母是 $\|\boldsymbol a\|^2$，不开方。`],
    exercises: [
      {
        id: 'la.ip.projection.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\boldsymbol b=(1,2,3)$ 在 $\boldsymbol a=(1,1,0)$ 方向上的正射影，以及垂直分量。`,
          ja: R`$\boldsymbol b=(1,2,3)$ の $\boldsymbol a=(1,1,0)$ への正射影と，それに垂直な成分を求めよ。`,
          en: R`Find the projection of $\boldsymbol b=(1,2,3)$ onto $\boldsymbol a=(1,1,0)$ and the orthogonal component.`,
        },
        answer: R`\operatorname{proj}_{\boldsymbol a}\boldsymbol b=\left(\frac32,\ \frac32,\ 0\right),\qquad\left(-\frac12,\ \frac12,\ 3\right)`,
        idea: R`$(\boldsymbol b,\boldsymbol a)=3$，$\|\boldsymbol a\|^2=2$。`,
        solution: [{ math: R`\frac32(1,1,0)=\left(\frac32,\frac32,0\right)` }, { math: R`\boldsymbol b-\left(\frac32,\frac32,0\right)=\left(-\frac12,\frac12,3\right)` }],
        pitfalls: [R`检查：$\left(-\frac12,\frac12,3\right)\cdot(1,1,0)=0$。`],
        verify: { type: 'equal', lhs: 'Matrix([1,2,3]).dot(Matrix([1,1,0]))/Matrix([1,1,0]).dot(Matrix([1,1,0]))*Matrix([1,1,0])', rhs: 'Matrix([Rational(3,2),Rational(3,2),0])' },
      },
    ],
  },
  {
    id: 'la.ip.complement',
    name: { zh: '求正交补', ja: '直交補空間を求める', kana: 'ちょっこうほくうかんをもとめる' },
    knowledge: ['la.ip.k.complement'],
    formula: R`\begin{gathered}W=\langle\boldsymbol a_1,\dots,\boldsymbol a_k\rangle\\\Longrightarrow\ W^\perp=\{\boldsymbol x\mid A^T\boldsymbol x=\boldsymbol0\}\end{gathered}`,
    conditions: [R`$A=(\boldsymbol a_1\cdots\boldsymbol a_k)$。`],
    scenarios: [R`求子空间的正交补的基底。`],
    steps: [R`把 $\boldsymbol a_i$ 作为行写出方程组 $(\boldsymbol a_i,\boldsymbol x)=0$。`, R`解齐次方程组。`],
    pitfalls: [R`检查维数：$\dim W^\perp=n-\dim W$。`],
    exercises: [
      {
        id: 'la.ip.complement.ex1',
        difficulty: '中',
        question: {
          zh: R`$W=\langle(1,0,1,0),\ (0,1,1,1)\rangle\subset\R^4$。求 $W^\perp$ 的基底。`,
          ja: R`$W=\langle(1,0,1,0),\ (0,1,1,1)\rangle\subset\R^4$ の直交補空間 $W^\perp$ の基底を求めよ。`,
          en: R`Find a basis of $W^\perp$ for $W=\langle(1,0,1,0),\ (0,1,1,1)\rangle\subset\R^4$.`,
        },
        answerText: R`$W^\perp=\langle(-1,-1,1,0),\ (0,-1,0,1)\rangle$。`,
        idea: R`$x_1+x_3=0$，$x_2+x_3+x_4=0$。`,
        solution: [R`令 $x_3=s$，$x_4=t$：$x_1=-s$，$x_2=-s-t$。分别取 $(s,t)=(1,0)$、$(0,1)$。`],
        pitfalls: [R`$\dim W^\perp=4-2=2$。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,0,1,0],[0,1,1,1]])*Matrix([[-1,0],[-1,-1],[1,0],[0,1]])', rhs: 'zeros(2,2)' },
      },
    ],
  },
  {
    id: 'la.ip.function',
    name: { zh: '函数空间的内积', ja: '関数空間の内積', kana: 'かんすうくうかんのないせき' },
    knowledge: ['la.ip.k.inner'],
    formula: [R`(f,g)=\int_{-1}^{1}f(x)g(x)\,dx`, R`\|f\|=\sqrt{\int_{-1}^{1}f(x)^2\,dx}`],
    conditions: [R`积分区间由题目给出。`],
    scenarios: [R`多项式空间中的正交、范数、正交化（Legendre 多项式）。`],
    steps: [R`写出乘积并积分。`, R`奇函数在对称区间上的积分为 0。`],
    pitfalls: [R`范数要开平方。`],
    exercises: [
      {
        id: 'la.ip.function.ex1',
        difficulty: '易',
        question: {
          zh: R`取内积 $(f,g)=\displaystyle\int_{-1}^{1}f(x)g(x)\,dx$。求常数 $a$ 使 $x^2+a$ 与 $1$ 正交，并求 $\|x\|$。`,
          ja: R`内積 $(f,g)=\displaystyle\int_{-1}^{1}f(x)g(x)\,dx$ に関して，$x^2+a$ が $1$ と直交する $a$ を求めよ。また $\|x\|$ を求めよ。`,
          en: R`With $(f,g)=\displaystyle\int_{-1}^{1}f(x)g(x)\,dx$, find $a$ such that $x^2+a$ is orthogonal to $1$, and find $\|x\|$.`,
        },
        answer: R`a=-\frac13,\qquad\|x\|=\sqrt{\frac23}=\frac{\sqrt6}{3}`,
        idea: R`$\displaystyle\int_{-1}^1x^2dx=\frac23$。`,
        solution: [{ math: R`\int_{-1}^{1}(x^2+a)\,dx=\frac23+2a=0\ \Longrightarrow\ a=-\frac13` }, { math: R`\|x\|^2=\int_{-1}^{1}x^2\,dx=\frac23` }],
        pitfalls: [R`$x$ 与 $1$ 正交：$\int_{-1}^1x\,dx=0$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'integrate(x**2-Rational(1,3), (x,-1,1))', rhs: '0' },
            { type: 'equal', lhs: 'sqrt(integrate(x**2, (x,-1,1)))', rhs: 'sqrt(6)/3' },
          ],
        },
      },
    ],
  },
  {
    id: 'la.ip.cauchy-schwarz',
    name: { zh: 'Cauchy–Schwarz 不等式的应用', ja: 'シュワルツの不等式の応用', kana: 'シュワルツのふとうしきのおうよう' },
    knowledge: ['la.ip.k.inner'],
    formula: R`(\boldsymbol x,\boldsymbol y)^2\le\|\boldsymbol x\|^2\|\boldsymbol y\|^2`,
    conditions: [R`等号成立 $\iff\boldsymbol x,\boldsymbol y$ 线性相关（平行）。`],
    scenarios: [R`证明形如 $(\sum a_ib_i)^2\le\sum a_i^2\sum b_i^2$ 的不等式；求最大最小值。`],
    steps: [R`选取合适的两个向量。`, R`代入不等式。`, R`写出等号成立条件。`],
    pitfalls: [R`选向量是关键，常取 $(1,1,\dots,1)$。`],
    exercises: [
      {
        id: 'la.ip.cauchy-schwarz.ex1',
        difficulty: '中',
        question: {
          zh: R`证明 $(a+b+c)^2\le3(a^2+b^2+c^2)$，并说明等号何时成立。`,
          ja: R`$(a+b+c)^2\le3(a^2+b^2+c^2)$ を示し，等号成立条件を述べよ。`,
          en: R`Prove $(a+b+c)^2\le3(a^2+b^2+c^2)$ and state when equality holds.`,
        },
        answerText: R`取 $\boldsymbol x=(a,b,c)$，$\boldsymbol y=(1,1,1)$ 代入 Cauchy–Schwarz 即得。等号成立 $\iff a=b=c$。`,
        idea: R`$(\boldsymbol x,\boldsymbol y)=a+b+c$，$\|\boldsymbol y\|^2=3$。`,
        solution: [
          { math: R`\begin{aligned}(a+b+c)^2&=(\boldsymbol x,\boldsymbol y)^2\le\|\boldsymbol x\|^2\|\boldsymbol y\|^2\\&=3(a^2+b^2+c^2)\end{aligned}` },
          R`等号成立当且仅当 $(a,b,c)$ 与 $(1,1,1)$ 平行，即 $a=b=c$。`,
        ],
        pitfalls: [R`另证：两边之差 $=(a-b)^2+(b-c)^2+(c-a)^2\ge0$。`],
        verify: { type: 'equal', lhs: 'expand(3*(a**2+b**2+c**2)-(a+b+c)**2)', rhs: 'expand((a-b)**2+(b-c)**2+(c-a)**2)' },
      },
    ],
  },
];

export const innerProductChapter = {
  overview: '内积：标准内积、范数与夹角，正射影，正交补，函数空间的内积，Cauchy–Schwarz 不等式。',
  sections: [
    { title: '内积与范数', knowledge: [KIP.inner], formulas: [ipCards[0], ipCards[3], ipCards[4]] },
    { title: '正交补与正射影', knowledge: [KIP.complement], formulas: [ipCards[1], ipCards[2]] },
  ],
};

// ---------------- 第 15 章 正交化 ----------------
const KOR = {
  gs: {
    id: 'la.orth.k.gram-schmidt',
    name: { zh: '正交规范基底与 Gram–Schmidt 正交化', ja: '正規直交基底とグラム・シュミットの直交化法', kana: 'せいきちょっこうきていとグラム・シュミットのちょっこうかほう' },
    paragraphs: [
      R`两两正交且长度都为 1 的基底称为**正规直交基底**（正交规范基底）。关于它的坐标就是内积：$c_i=(\boldsymbol x,\boldsymbol u_i)$。`,
      R`**Gram–Schmidt 正交化**：从任意基底出发，依次减去在已得向量上的正射影，再单位化。`,
    ],
    definitions: [R`\boldsymbol v_k=\boldsymbol a_k-\sum_{i=1}^{k-1}(\boldsymbol a_k,\boldsymbol u_i)\,\boldsymbol u_i,\qquad\boldsymbol u_k=\frac{\boldsymbol v_k}{\|\boldsymbol v_k\|}`],
    conditions: [R`$\boldsymbol a_1,\dots,\boldsymbol a_n$ 线性无关。`],
    theorems: [R`$\langle\boldsymbol u_1,\dots,\boldsymbol u_k\rangle=\langle\boldsymbol a_1,\dots,\boldsymbol a_k\rangle$（每一步生成的子空间不变）。`],
    related: ['la.ip.k.complement', 'la.orth.k.orthogonal-matrix'],
  },
  orthogonalMatrix: {
    id: 'la.orth.k.orthogonal-matrix',
    name: { zh: '正交矩阵', ja: '直交行列', kana: 'ちょっこうぎょうれつ' },
    paragraphs: [
      R`满足 $P^TP=E$ 的方阵称为**正交矩阵**。等价地：$P$ 的列向量（或行向量）构成正规直交基底。`,
      R`正交矩阵保持内积和长度：$(P\boldsymbol x,P\boldsymbol y)=(\boldsymbol x,\boldsymbol y)$。`,
    ],
    definitions: [R`P^TP=E\iff P^{-1}=P^T`],
    conditions: [],
    theorems: [R`$\det P=\pm1$；正交矩阵之积、逆仍是正交矩阵。`],
    related: ['la.orth.k.gram-schmidt'],
  },
};

const orthCards = [
  {
    id: 'la.orth.gram-schmidt',
    name: { zh: 'Gram–Schmidt 正交化（三个向量）', ja: 'グラム・シュミットの直交化法', kana: 'グラム・シュミットのちょっこうかほう' },
    knowledge: ['la.orth.k.gram-schmidt'],
    formula: [
      R`\boldsymbol u_1=\frac{\boldsymbol a_1}{\|\boldsymbol a_1\|}`,
      R`\boldsymbol v_2=\boldsymbol a_2-(\boldsymbol a_2,\boldsymbol u_1)\boldsymbol u_1`,
      R`\boldsymbol v_3=\boldsymbol a_3-(\boldsymbol a_3,\boldsymbol u_1)\boldsymbol u_1-(\boldsymbol a_3,\boldsymbol u_2)\boldsymbol u_2`,
    ],
    conditions: [R`每个 $\boldsymbol v_k$ 都要再除以自己的长度得到 $\boldsymbol u_k$。`],
    scenarios: [R`由给定基底构造正规直交基底；求正交矩阵。`],
    steps: [R`单位化 $\boldsymbol a_1$。`, R`减去射影得 $\boldsymbol v_2$，单位化。`, R`同样处理 $\boldsymbol a_3$。`, R`最后检查两两内积为 0。`],
    pitfalls: [R`计算 $\boldsymbol v_k$ 时可以先把它乘一个正数去掉分母，再单位化，结果不变。`],
    exercises: [
      {
        id: 'la.orth.gram-schmidt.ex1',
        difficulty: '中',
        question: {
          zh: R`把 $\boldsymbol a_1=(1,1,0)$、$\boldsymbol a_2=(1,0,1)$、$\boldsymbol a_3=(0,1,1)$ 用 Gram–Schmidt 法正交化。`,
          ja: R`$\boldsymbol a_1=(1,1,0)$，$\boldsymbol a_2=(1,0,1)$，$\boldsymbol a_3=(0,1,1)$ をグラム・シュミットの方法で正規直交化せよ。`,
          en: R`Apply Gram–Schmidt to $\boldsymbol a_1=(1,1,0)$, $\boldsymbol a_2=(1,0,1)$, $\boldsymbol a_3=(0,1,1)$.`,
        },
        answer: R`\begin{gathered}\boldsymbol u_1=\tfrac{1}{\sqrt2}(1,1,0),\quad\boldsymbol u_2=\tfrac{1}{\sqrt6}(1,-1,2)\\\boldsymbol u_3=\tfrac{1}{\sqrt3}(-1,1,1)\end{gathered}`,
        idea: R`$(\boldsymbol a_2,\boldsymbol u_1)=\dfrac{1}{\sqrt2}$。`,
        solution: [
          { math: R`\boldsymbol v_2=(1,0,1)-\tfrac12(1,1,0)=\tfrac12(1,-1,2)` },
          { math: R`\boldsymbol v_3=(0,1,1)-\tfrac12(1,1,0)-\tfrac16(1,-1,2)` },
          { math: R`=\left(-\tfrac23,\ \tfrac23,\ \tfrac23\right)=\tfrac23(-1,1,1)` },
        ],
        pitfalls: [R`$(\boldsymbol a_3,\boldsymbol u_2)\boldsymbol u_2=\dfrac{1}{\sqrt6}\cdot\dfrac{1}{\sqrt6}(1,-1,2)=\dfrac16(1,-1,2)$。`],
        verify: { type: 'equal', lhs: 'GramSchmidt([Matrix([1,1,0]),Matrix([1,0,1]),Matrix([0,1,1])], True)', rhs: '[Matrix([1,1,0])/sqrt(2), Matrix([1,-1,2])/sqrt(6), Matrix([-1,1,1])/sqrt(3)]' },
      },
    ],
  },
  {
    id: 'la.orth.subspace-basis',
    name: { zh: '子空间的正规直交基底', ja: '部分空間の正規直交基底', kana: 'ぶぶんくうかんのせいきちょっこうきてい' },
    knowledge: ['la.orth.k.gram-schmidt'],
    formula: R`W=\langle\boldsymbol a_1,\boldsymbol a_2\rangle=\langle\boldsymbol u_1,\boldsymbol u_2\rangle`,
    conditions: [R`先确认生成元线性无关（否则先挑出基底）。`],
    scenarios: [R`$\R^4$ 等高维空间中的子空间；平面上的正交基底。`],
    steps: [R`对生成元做 Gram–Schmidt。`],
    pitfalls: [R`算出的向量可以先约去公因子，最后再单位化。`],
    exercises: [
      {
        id: 'la.orth.subspace-basis.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $W=\langle(1,1,1,1),\ (1,2,3,4)\rangle$ 的一组正规直交基底。`,
          ja: R`$W=\langle(1,1,1,1),\ (1,2,3,4)\rangle$ の正規直交基底を一組求めよ。`,
          en: R`Find an orthonormal basis of $W=\langle(1,1,1,1),\ (1,2,3,4)\rangle$.`,
        },
        answer: R`\begin{gathered}\boldsymbol u_1=\tfrac12(1,1,1,1)\\\boldsymbol u_2=\tfrac{1}{2\sqrt5}(-3,-1,1,3)\end{gathered}`,
        idea: R`$(\boldsymbol a_2,\boldsymbol u_1)=\dfrac{10}{2}=5$。`,
        solution: [
          { math: R`\boldsymbol v_2=(1,2,3,4)-\tfrac52(1,1,1,1)=\tfrac12(-3,-1,1,3)` },
          { math: R`\|(-3,-1,1,3)\|=\sqrt{20}=2\sqrt5` },
        ],
        pitfalls: [R`检查：$(-3,-1,1,3)\cdot(1,1,1,1)=0$。`],
        verify: { type: 'equal', lhs: 'GramSchmidt([Matrix([1,1,1,1]),Matrix([1,2,3,4])], True)', rhs: '[Matrix([1,1,1,1])/2, Matrix([-3,-1,1,3])/(2*sqrt(5))]' },
      },
    ],
  },
  {
    id: 'la.orth.orthogonal-matrix',
    name: { zh: '正交矩阵的判定与逆', ja: '直交行列の判定と逆行列', kana: 'ちょっこうぎょうれつのはんていとぎゃくぎょうれつ' },
    knowledge: ['la.orth.k.orthogonal-matrix'],
    formula: R`P^TP=E\ \Longrightarrow\ P^{-1}=P^T`,
    conditions: [R`$P$ 为实方阵。`],
    scenarios: [R`判断矩阵是否正交；快速求正交矩阵的逆。`],
    steps: [R`检查各列长度为 1、两两内积为 0。`, R`逆矩阵就是转置。`],
    pitfalls: [R`各列「正交但不是单位长度」时不是正交矩阵。`],
    exercises: [
      {
        id: 'la.orth.orthogonal-matrix.ex1',
        difficulty: '易',
        question: {
          zh: R`证明 $P=\dfrac13\begin{pmatrix}1&2&2\\2&1&-2\\2&-2&1\end{pmatrix}$ 是正交矩阵，并求 $P^{-1}$。`,
          ja: R`$P=\dfrac13\begin{pmatrix}1&2&2\\2&1&-2\\2&-2&1\end{pmatrix}$ が直交行列であることを示し，$P^{-1}$ を求めよ。`,
          en: R`Show that $P=\dfrac13\begin{pmatrix}1&2&2\\2&1&-2\\2&-2&1\end{pmatrix}$ is orthogonal and find $P^{-1}$.`,
        },
        answerText: R`各列长度为 1、两两正交，所以 $P$ 是正交矩阵；$P$ 对称，所以 $P^{-1}=P^T=P$。`,
        idea: R`列向量长度：$\dfrac13\sqrt{1+4+4}=1$。`,
        solution: [R`第 1、2 列内积：$\dfrac19(2+2-4)=0$；第 1、3 列：$\dfrac19(2-4+2)=0$；第 2、3 列：$\dfrac19(4-2-2)=0$。`],
        pitfalls: [R`$P^2=E$，说明 $P$ 是一个反射。`],
        verify: { type: 'equal', lhs: '(Matrix([[1,2,2],[2,1,-2],[2,-2,1]])/3).T*(Matrix([[1,2,2],[2,1,-2],[2,-2,1]])/3)', rhs: 'eye(3)' },
      },
    ],
  },
  {
    id: 'la.orth.plane-projection',
    name: { zh: '在平面（子空间）上的正射影', ja: '平面（部分空間）への正射影', kana: 'へいめんへのせいしゃえい' },
    knowledge: ['la.orth.k.gram-schmidt'],
    formula: [R`\boldsymbol x_W=\boldsymbol x-\frac{(\boldsymbol x,\boldsymbol n)}{\|\boldsymbol n\|^2}\boldsymbol n\quad(\text{平面}\ W\perp\boldsymbol n)`, R`\boldsymbol x_W=\sum_i(\boldsymbol x,\boldsymbol u_i)\boldsymbol u_i`],
    conditions: [R`第二个公式要求 $\boldsymbol u_i$ 是 $W$ 的正规直交基底。`],
    scenarios: [R`点到平面的最近点、距离。`],
    steps: [R`平面用法向量：减去法向分量。`, R`一般子空间：先求正规直交基底，再求和。`],
    pitfalls: [R`距离 $=\|\boldsymbol x-\boldsymbol x_W\|$。`],
    exercises: [
      {
        id: 'la.orth.plane-projection.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\boldsymbol x=(1,2,3)$ 在平面 $W:x+y+z=0$ 上的正射影，以及 $\boldsymbol x$ 到 $W$ 的距离。`,
          ja: R`$\boldsymbol x=(1,2,3)$ の平面 $W:x+y+z=0$ への正射影と，$\boldsymbol x$ と $W$ の距離を求めよ。`,
          en: R`Find the projection of $\boldsymbol x=(1,2,3)$ onto the plane $W:x+y+z=0$ and the distance from $\boldsymbol x$ to $W$.`,
        },
        answer: R`\boldsymbol x_W=(-1,0,1),\qquad d=2\sqrt3`,
        idea: R`$\boldsymbol n=(1,1,1)$，$(\boldsymbol x,\boldsymbol n)=6$，$\|\boldsymbol n\|^2=3$。`,
        solution: [{ math: R`\boldsymbol x_W=(1,2,3)-2(1,1,1)=(-1,0,1)` }, { math: R`d=\|2(1,1,1)\|=2\sqrt3` }],
        pitfalls: [R`检查：$-1+0+1=0$，确实在平面上。`],
        verify: { type: 'equal', lhs: 'Matrix([1,2,3])-Matrix([1,2,3]).dot(Matrix([1,1,1]))/3*Matrix([1,1,1])', rhs: 'Matrix([-1,0,1])' },
      },
    ],
  },
];

export const orthogonalizationChapter = {
  overview: '正交化：Gram–Schmidt 正交化、子空间的正规直交基底、正交矩阵、在子空间上的正射影。',
  sections: [
    { title: 'Gram–Schmidt 正交化', knowledge: [KOR.gs], formulas: [orthCards[0], orthCards[1], orthCards[3]] },
    { title: '正交矩阵', knowledge: [KOR.orthogonalMatrix], formulas: [orthCards[2]] },
  ],
};

// ---------------- 第 16 章 二次型 ----------------
const KQ = {
  form: {
    id: 'la.qf.k.form',
    name: { zh: '二次型与标准形', ja: '二次形式と標準形', kana: 'にじけいしきとひょうじゅんけい' },
    paragraphs: [
      R`二次型 $q(\boldsymbol x)=\boldsymbol x^TA\boldsymbol x$，$A$ 取为**对称矩阵**：$x_i^2$ 的系数放在对角线，$x_ix_j$ 的系数**平分**放在 $(i,j)$、$(j,i)$ 两处。`,
      R`实对称矩阵一定可以用**正交矩阵**对角化：$P^TAP=\operatorname{diag}(\lambda_1,\dots,\lambda_n)$。令 $\boldsymbol x=P\boldsymbol y$，二次型化为**标准形** $\lambda_1y_1^2+\cdots+\lambda_ny_n^2$。`,
    ],
    definitions: [R`q(\boldsymbol x)=\boldsymbol x^TA\boldsymbol x=\sum_{i,j}a_{ij}x_ix_j\qquad(A^T=A)`],
    conditions: [R`实对称矩阵的特征值都是实数；不同特征值的特征向量互相正交。`],
    theorems: [R`正定（$q(\boldsymbol x)>0,\ \boldsymbol x\neq\boldsymbol0$）$\iff$ 所有特征值 $>0$ $\iff$ 所有顺序主子式 $>0$。`],
    related: ['la.orth.k.orthogonal-matrix', 'la.diag.k.diag'],
  },
};

const qfCards = [
  {
    id: 'la.qf.matrix',
    name: { zh: '二次型的矩阵', ja: '二次形式の行列', kana: 'にじけいしきのぎょうれつ' },
    knowledge: ['la.qf.k.form'],
    formula: R`ax^2+2bxy+cy^2=\begin{pmatrix}x&y\end{pmatrix}\begin{pmatrix}a&b\\b&c\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}`,
    conditions: [R`交叉项系数要除以 2。`],
    scenarios: [R`把二次型写成矩阵形式，所有二次型题目的第一步。`],
    steps: [R`平方项系数写在对角线。`, R`交叉项 $x_ix_j$ 的系数除以 2，填在对称的两个位置。`],
    pitfalls: [R`$4xy$ 对应的成分是 $2$，不是 $4$。`],
    exercises: [
      {
        id: 'la.qf.matrix.ex1',
        difficulty: '易',
        question: {
          zh: R`写出二次型 $q=x^2+4xy+3y^2-2yz+z^2$ 的对称矩阵。`,
          ja: R`二次形式 $q=x^2+4xy+3y^2-2yz+z^2$ を表す対称行列を求めよ。`,
          en: R`Find the symmetric matrix of the quadratic form $q=x^2+4xy+3y^2-2yz+z^2$.`,
        },
        answer: R`A=\begin{pmatrix}1&2&0\\2&3&-1\\0&-1&1\end{pmatrix}`,
        idea: R`$4xy\to2$，$-2yz\to-1$，没有 $xz$ 项 $\to0$。`,
        solution: [R`对角线 $1,3,1$；$(1,2)=(2,1)=2$；$(2,3)=(3,2)=-1$；$(1,3)=(3,1)=0$。`],
        pitfalls: [R`检查：展开 $\boldsymbol x^TA\boldsymbol x$ 回到原式。`],
        verify: { type: 'equal', lhs: '(Matrix([[x,y,z]])*Matrix([[1,2,0],[2,3,-1],[0,-1,1]])*Matrix([x,y,z]))[0]', rhs: 'x**2+4*x*y+3*y**2-2*y*z+z**2' },
      },
    ],
  },
  {
    id: 'la.qf.orthogonal-2x2',
    name: { zh: '正交变换化为标准形（二元）', ja: '直交変換による標準形（2 変数）', kana: 'ちょっこうへんかんによるひょうじゅんけい' },
    knowledge: ['la.qf.k.form'],
    formula: R`\boldsymbol x=P\boldsymbol y\ \Longrightarrow\ q=\lambda_1y_1^2+\lambda_2y_2^2`,
    conditions: [R`$P$ 的列是单位化的特征向量（正交矩阵）。`],
    scenarios: [R`化二次型为标准形；判断二次曲线的类型（椭圆、双曲线）。`],
    steps: [R`写出对称矩阵，求特征值。`, R`求特征向量并单位化，排成 $P$。`, R`写出标准形。`],
    pitfalls: [R`特征向量一定要单位化，否则 $P$ 不是正交矩阵。`],
    exercises: [
      {
        id: 'la.qf.orthogonal-2x2.ex1',
        difficulty: '中',
        question: {
          zh: R`用正交变换把 $q=5x^2+4xy+2y^2$ 化为标准形。`,
          ja: R`直交変換により $q=5x^2+4xy+2y^2$ を標準形に直せ。`,
          en: R`Reduce $q=5x^2+4xy+2y^2$ to standard form by an orthogonal transformation.`,
        },
        answer: R`P=\frac{1}{\sqrt5}\begin{pmatrix}2&-1\\1&2\end{pmatrix},\qquad q=6X^2+Y^2`,
        idea: R`$A=\begin{pmatrix}5&2\\2&2\end{pmatrix}$，$\lambda^2-7\lambda+6=0$。`,
        solution: [
          R`特征值 $6,1$。$\lambda=6$：$-x+2y=0$，取 $(2,1)$；$\lambda=1$：$2x+y=0$，取 $(-1,2)$。`,
          R`单位化后排成 $P$，令 $\begin{pmatrix}x\\y\end{pmatrix}=P\begin{pmatrix}X\\Y\end{pmatrix}$。`,
        ],
        pitfalls: [R`$\det P=1$，是旋转。`],
        verify: { type: 'equal', lhs: '(Matrix([[2,-1],[1,2]])/sqrt(5)).T*Matrix([[5,2],[2,2]])*(Matrix([[2,-1],[1,2]])/sqrt(5))', rhs: 'diag(6,1)' },
      },
    ],
  },
  {
    id: 'la.qf.orthogonal-3x3',
    name: { zh: '正交变换化为标准形（三元）', ja: '直交変換による標準形（3 変数）', kana: 'ちょっこうへんかんによるひょうじゅんけい（さんへんすう）' },
    knowledge: ['la.qf.k.form'],
    formula: R`P^TAP=\begin{pmatrix}\lambda_1&&\\&\lambda_2&\\&&\lambda_3\end{pmatrix}`,
    conditions: [R`重根的特征空间中要再做 Gram–Schmidt 正交化。`],
    scenarios: [R`三元二次型的标准形。`],
    steps: [R`求特征值。`, R`单根：特征向量单位化。`, R`重根：求特征空间的基底，正交化后单位化。`],
    pitfalls: [R`不同特征值的特征向量自动正交，不必再正交化。`],
    exercises: [
      {
        id: 'la.qf.orthogonal-3x3.ex1',
        difficulty: '难',
        question: {
          zh: R`用正交变换把 $q=2x^2+2y^2+2z^2+2xy+2yz+2zx$ 化为标准形。`,
          ja: R`直交変換により $q=2x^2+2y^2+2z^2+2xy+2yz+2zx$ を標準形に直せ。`,
          en: R`Reduce $q=2x^2+2y^2+2z^2+2xy+2yz+2zx$ to standard form by an orthogonal transformation.`,
        },
        answer: R`q=4X^2+Y^2+Z^2`,
        idea: R`$A=\begin{pmatrix}2&1&1\\1&2&1\\1&1&2\end{pmatrix}=E+J$，$J$ 为全 1 矩阵。`,
        solution: [
          R`特征值：$4$（单根）、$1$（二重）。`,
          R`$\lambda=4$：$\boldsymbol u_1=\frac{1}{\sqrt3}(1,1,1)$。`,
          R`$\lambda=1$：$x+y+z=0$，取 $(1,-1,0)$、$(1,1,-2)$（已正交），单位化。`,
          { math: R`P=\begin{pmatrix}\frac{1}{\sqrt3}&\frac{1}{\sqrt2}&\frac{1}{\sqrt6}\\[2pt]\frac{1}{\sqrt3}&-\frac{1}{\sqrt2}&\frac{1}{\sqrt6}\\[2pt]\frac{1}{\sqrt3}&0&-\frac{2}{\sqrt6}\end{pmatrix}` },
        ],
        pitfalls: [R`$(1,-1,0)$ 与 $(1,1,-2)$ 是特意选成正交的；若取 $(1,-1,0)$、$(1,0,-1)$ 则要正交化。`],
        verify: {
          type: 'all',
          items: [
            { type: 'eigen', matrix: 'Matrix([[2,1,1],[1,2,1],[1,1,2]])', values: ['4', '1', '1'] },
            { type: 'equal', lhs: 'Matrix([[1/sqrt(3),1/sqrt(2),1/sqrt(6)],[1/sqrt(3),-1/sqrt(2),1/sqrt(6)],[1/sqrt(3),0,-2/sqrt(6)]]).T*Matrix([[2,1,1],[1,2,1],[1,1,2]])*Matrix([[1/sqrt(3),1/sqrt(2),1/sqrt(6)],[1/sqrt(3),-1/sqrt(2),1/sqrt(6)],[1/sqrt(3),0,-2/sqrt(6)]])', rhs: 'diag(4,1,1)' },
          ],
        },
      },
    ],
  },
  {
    id: 'la.qf.completing-square',
    name: { zh: '配方法化标准形', ja: '平方完成による標準形', kana: 'へいほうかんせいによるひょうじゅんけい' },
    knowledge: ['la.qf.k.form'],
    formula: R`\begin{aligned}&ax^2+2bxy+cy^2\\&\quad=a\left(x+\frac bay\right)^2+\frac{ac-b^2}{a}y^2\end{aligned}`,
    conditions: [R`$a\neq0$。得到的变换一般不是正交变换。`],
    scenarios: [R`只需判断正定性或符号差时，配方比求特征值快。`],
    steps: [R`先把含 $x$ 的项配成完全平方。`, R`再对剩下的变量配方。`],
    pitfalls: [R`配方得到的系数与特征值不同，但正、负、零的个数（符号差）相同（Sylvester 惯性定律）。`],
    exercises: [
      {
        id: 'la.qf.completing-square.ex1',
        difficulty: '易',
        question: {
          zh: R`用配方法把 $q=x^2+2xy+3y^2$ 化为平方和，并判断是否正定。`,
          ja: R`平方完成により $q=x^2+2xy+3y^2$ を平方和で表し，正定値かどうか判定せよ。`,
          en: R`Write $q=x^2+2xy+3y^2$ as a sum of squares by completing the square, and decide whether it is positive definite.`,
        },
        answerText: R`$q=(x+y)^2+2y^2$，正定。`,
        idea: R`$x^2+2xy=(x+y)^2-y^2$。`,
        solution: [{ math: R`q=(x+y)^2-y^2+3y^2=(x+y)^2+2y^2` }, R`两项系数都为正，且 $q=0\iff x+y=0,\ y=0\iff x=y=0$，所以正定。`],
        pitfalls: [R`矩阵 $\begin{pmatrix}1&1\\1&3\end{pmatrix}$ 的顺序主子式 $1,\ 2$ 均为正，结论一致。`],
        verify: { type: 'equal', lhs: 'expand((x+y)**2+2*y**2)', rhs: 'x**2+2*x*y+3*y**2' },
      },
    ],
  },
  {
    id: 'la.qf.definite',
    name: { zh: '正定性的判定（顺序主子式）', ja: '正定値の判定（首座小行列式）', kana: 'せいていちのはんてい（しゅざしょうぎょうれつしき）' },
    knowledge: ['la.qf.k.form'],
    formula: R`\begin{gathered}\text{正定}\iff a_{11}>0,\ \begin{vmatrix}a_{11}&a_{12}\\a_{21}&a_{22}\end{vmatrix}>0\\\dots,\ \det A>0\end{gathered}`,
    conditions: [R`$A$ 为实对称矩阵。负定：顺序主子式符号交替 $-,+,-,\dots$。`],
    scenarios: [R`含参数二次型的正定条件；多元函数极值的判定。`],
    steps: [R`依次计算 1 阶、2 阶、…、$n$ 阶顺序主子式。`, R`全部 $>0$ 则正定；联立不等式求参数范围。`],
    pitfalls: [R`判断「半正定」不能只看顺序主子式，要看所有特征值 $\ge0$。`],
    exercises: [
      {
        id: 'la.qf.definite.ex1',
        difficulty: '中',
        question: {
          zh: R`求使 $q=x^2+2y^2+3z^2+2axy$ 正定的 $a$ 的范围。`,
          ja: R`$q=x^2+2y^2+3z^2+2axy$ が正定値となる $a$ の範囲を求めよ。`,
          en: R`Find the range of $a$ for which $q=x^2+2y^2+3z^2+2axy$ is positive definite.`,
        },
        answer: R`-\sqrt2<a<\sqrt2`,
        idea: R`$A=\begin{pmatrix}1&a&0\\a&2&0\\0&0&3\end{pmatrix}$。`,
        solution: [
          R`顺序主子式：$1>0$，$2-a^2>0$，$\det A=3(2-a^2)>0$。`,
          R`所以 $a^2<2$，即 $-\sqrt2<a<\sqrt2$。`,
        ],
        pitfalls: [R`第 3 个条件与第 2 个等价，不产生新的限制。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,a,0],[a,2,0],[0,0,3]]).det()', rhs: '3*(2-a**2)' },
      },
    ],
  },
  {
    id: 'la.qf.max-min',
    name: { zh: '单位球面上的最大值与最小值', ja: '単位球面上の最大値・最小値', kana: 'たんいきゅうめんじょうのさいだいち・さいしょうち' },
    knowledge: ['la.qf.k.form'],
    formula: R`\min_i\lambda_i\le\boldsymbol x^TA\boldsymbol x\le\max_i\lambda_i\qquad(\|\boldsymbol x\|=1)`,
    conditions: [R`$A$ 为实对称矩阵。最大（小）值在对应的单位特征向量处取得。`],
    scenarios: [R`条件 $x^2+y^2+z^2=1$ 下二次型的最大最小值（也可用拉格朗日乘数法）。`],
    steps: [R`写出对称矩阵，求特征值。`, R`最大特征值是最大值，最小特征值是最小值。`],
    pitfalls: [R`理由：正交变换不改变长度，$q=\sum\lambda_iy_i^2$，$\sum y_i^2=1$。`],
    exercises: [
      {
        id: 'la.qf.max-min.ex1',
        difficulty: '中',
        question: {
          zh: R`在 $x^2+y^2+z^2=1$ 的条件下，求 $q=2x^2+2y^2+2z^2+2xy+2yz+2zx$ 的最大值与最小值。`,
          ja: R`$x^2+y^2+z^2=1$ のもとで，$q=2x^2+2y^2+2z^2+2xy+2yz+2zx$ の最大値と最小値を求めよ。`,
          en: R`Subject to $x^2+y^2+z^2=1$, find the maximum and minimum of $q=2x^2+2y^2+2z^2+2xy+2yz+2zx$.`,
        },
        answerText: R`最大值 $4$（$\boldsymbol x=\pm\frac{1}{\sqrt3}(1,1,1)$），最小值 $1$（$x+y+z=0$ 上的单位向量）。`,
        idea: R`特征值为 $4,1,1$（见「正交变换化为标准形（三元）」）。`,
        solution: [R`标准形 $q=4X^2+Y^2+Z^2$，$X^2+Y^2+Z^2=1$，所以 $1\le q\le4$。`],
        pitfalls: [R`最小值在一整个圆上取得（二重特征值）。`],
        verify: { type: 'equal', lhs: '(Matrix([[1,1,1]])*Matrix([[2,1,1],[1,2,1],[1,1,2]])*Matrix([1,1,1]))[0]/3', rhs: '4' },
      },
    ],
  },
];

export const quadraticFormsChapter = {
  overview: '二次型：对称矩阵表示，正交变换化为标准形（二元、三元），配方法，正定性的判定，单位球面上的最大最小值。',
  sections: [{ title: '二次型', knowledge: [KQ.form], formulas: qfCards }],
};
