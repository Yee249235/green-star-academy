// 线性代数 第 1～4 章：向量、矩阵、矩阵运算、线性方程组
const R = String.raw;

// ---------------- 第 1 章 向量 ----------------
const KV = {
  vector: {
    id: 'la.vec.k.vector',
    name: { zh: '向量及其运算', ja: 'ベクトルとその演算', kana: 'ベクトルとそのえんざん' },
    paragraphs: [
      R`有大小和方向的量称为**向量**。用分量表示为 $\boldsymbol a=(a_1,a_2,a_3)$；加法、数乘按分量进行。`,
      R`长度 $|\boldsymbol a|=\sqrt{a_1^2+a_2^2+a_3^2}$；长度为 1 的向量称为单位向量。`,
    ],
    definitions: [R`\boldsymbol a+\boldsymbol b=(a_1+b_1,\ a_2+b_2,\ a_3+b_3)`, R`k\boldsymbol a=(ka_1,\ ka_2,\ ka_3)`],
    conditions: [],
    theorems: [R`$\boldsymbol a$ 方向的单位向量为 $\dfrac{\boldsymbol a}{|\boldsymbol a|}$。`],
    related: ['la.vec.k.products'],
  },
  products: {
    id: 'la.vec.k.products',
    name: { zh: '数量积与向量积', ja: '内積と外積', kana: 'ないせきとがいせき' },
    paragraphs: [
      R`**数量积**（内積）$\boldsymbol a\cdot\boldsymbol b$ 是数，用来求夹角、判断垂直。`,
      R`**向量积**（外積）$\boldsymbol a\times\boldsymbol b$ 是向量，与 $\boldsymbol a$、$\boldsymbol b$ 都垂直，长度等于以它们为两边的平行四边形面积。`,
    ],
    definitions: [
      R`\boldsymbol a\cdot\boldsymbol b=a_1b_1+a_2b_2+a_3b_3=|\boldsymbol a||\boldsymbol b|\cos\theta`,
      R`\boldsymbol a\times\boldsymbol b=\begin{pmatrix}a_2b_3-a_3b_2\\a_3b_1-a_1b_3\\a_1b_2-a_2b_1\end{pmatrix}`,
    ],
    conditions: [R`$\boldsymbol a\perp\boldsymbol b\iff\boldsymbol a\cdot\boldsymbol b=0$；$\boldsymbol a\parallel\boldsymbol b\iff\boldsymbol a\times\boldsymbol b=\boldsymbol0$。`],
    theorems: [R`$\boldsymbol b\times\boldsymbol a=-\boldsymbol a\times\boldsymbol b$（反交换）。`],
    related: ['la.vec.k.vector'],
  },
};

const vectorCards = [
  {
    id: 'la.vec.add-scalar',
    name: { zh: '向量的加法与数乘', ja: 'ベクトルの和とスカラー倍', kana: 'ベクトルのわとスカラーばい' },
    knowledge: ['la.vec.k.vector'],
    formula: R`k\boldsymbol a+l\boldsymbol b=(ka_1+lb_1,\ ka_2+lb_2,\ ka_3+lb_3)`,
    conditions: [R`两个向量的维数相同。`],
    scenarios: [R`线性组合的计算。`],
    steps: [R`先数乘，再逐个分量相加。`],
    pitfalls: [R`减法每个分量都要变号。`],
    exercises: [
      {
        id: 'la.vec.add-scalar.ex1',
        difficulty: '易',
        question: {
          zh: R`$\boldsymbol a=(1,2,-1)$，$\boldsymbol b=(2,0,3)$。求 $2\boldsymbol a-\boldsymbol b$。`,
          ja: R`$\boldsymbol a=(1,2,-1)$，$\boldsymbol b=(2,0,3)$ のとき，$2\boldsymbol a-\boldsymbol b$ を求めよ。`,
          en: R`Let $\boldsymbol a=(1,2,-1)$, $\boldsymbol b=(2,0,3)$. Find $2\boldsymbol a-\boldsymbol b$.`,
        },
        answer: R`(0,\ 4,\ -5)`,
        idea: R`逐分量计算。`,
        solution: [{ math: R`\begin{aligned}2\boldsymbol a-\boldsymbol b&=(2-2,\ 4-0,\ -2-3)\\&=(0,\ 4,\ -5)\end{aligned}` }],
        pitfalls: [R`$-2-3=-5$。`],
        verify: { type: 'equal', lhs: '2*Matrix([1,2,-1])-Matrix([2,0,3])', rhs: 'Matrix([0,4,-5])' },
      },
    ],
  },
  {
    id: 'la.vec.length',
    name: { zh: '向量的长度与单位向量', ja: 'ベクトルの大きさと単位ベクトル', kana: 'ベクトルのおおきさとたんいベクトル' },
    knowledge: ['la.vec.k.vector'],
    formula: R`|\boldsymbol a|=\sqrt{a_1^2+a_2^2+a_3^2},\qquad\boldsymbol e=\frac{\boldsymbol a}{|\boldsymbol a|}`,
    conditions: [R`$\boldsymbol a\neq\boldsymbol0$。`],
    scenarios: [R`求距离、单位化（正交化、方向导数中常用）。`],
    steps: [R`平方和开方。`, R`各分量除以长度。`],
    pitfalls: [R`单位向量有两个方向（$\pm$），题目没说时取与 $\boldsymbol a$ 同向。`],
    exercises: [
      {
        id: 'la.vec.length.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\boldsymbol a=(2,-1,2)$ 的长度和同方向的单位向量。`,
          ja: R`$\boldsymbol a=(2,-1,2)$ の大きさと，同じ向きの単位ベクトルを求めよ。`,
          en: R`Find the length of $\boldsymbol a=(2,-1,2)$ and the unit vector in its direction.`,
        },
        answer: R`|\boldsymbol a|=3,\qquad\boldsymbol e=\left(\frac23,\ -\frac13,\ \frac23\right)`,
        idea: R`$4+1+4=9$。`,
        solution: [{ math: R`|\boldsymbol a|=\sqrt{4+1+4}=3,\qquad\boldsymbol e=\frac13(2,-1,2)` }],
        pitfalls: [R`$(-1)^2=1$。`],
        verify: { type: 'equal', lhs: 'Matrix([2,-1,2]).norm()', rhs: '3' },
      },
    ],
  },
  {
    id: 'la.vec.dot',
    name: { zh: '数量积与夹角', ja: '内積となす角', kana: 'ないせきとなすかく' },
    knowledge: ['la.vec.k.products'],
    formula: R`\cos\theta=\frac{\boldsymbol a\cdot\boldsymbol b}{|\boldsymbol a||\boldsymbol b|}\qquad(0\le\theta\le\pi)`,
    conditions: [R`$\boldsymbol a,\boldsymbol b\neq\boldsymbol0$。`],
    scenarios: [R`求夹角、判断垂直、求投影长度。`],
    steps: [R`计算 $\boldsymbol a\cdot\boldsymbol b$。`, R`计算两个长度。`, R`求 $\cos\theta$ 再求 $\theta$。`],
    pitfalls: [R`$\boldsymbol a\cdot\boldsymbol b<0$ 时夹角为钝角。`],
    exercises: [
      {
        id: 'la.vec.dot.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\boldsymbol a=(1,0,1)$ 与 $\boldsymbol b=(0,1,1)$ 的夹角。`,
          ja: R`$\boldsymbol a=(1,0,1)$ と $\boldsymbol b=(0,1,1)$ のなす角を求めよ。`,
          en: R`Find the angle between $\boldsymbol a=(1,0,1)$ and $\boldsymbol b=(0,1,1)$.`,
        },
        answer: R`\theta=\frac{\pi}{3}`,
        idea: R`$\boldsymbol a\cdot\boldsymbol b=1$，$|\boldsymbol a|=|\boldsymbol b|=\sqrt2$。`,
        solution: [{ math: R`\cos\theta=\frac{1}{\sqrt2\cdot\sqrt2}=\frac12\ \Longrightarrow\ \theta=\frac{\pi}{3}` }],
        pitfalls: [R`夹角范围是 $[0,\pi]$。`],
        verify: { type: 'equal', lhs: 'acos(Matrix([1,0,1]).dot(Matrix([0,1,1]))/(Matrix([1,0,1]).norm()*Matrix([0,1,1]).norm()))', rhs: 'pi/3' },
      },
    ],
  },
  {
    id: 'la.vec.cross',
    name: { zh: '向量积（外积）', ja: '外積（ベクトル積）', kana: 'がいせき（ベクトルせき）' },
    knowledge: ['la.vec.k.products'],
    formula: R`\boldsymbol a\times\boldsymbol b=\begin{vmatrix}\boldsymbol e_1&\boldsymbol e_2&\boldsymbol e_3\\a_1&a_2&a_3\\b_1&b_2&b_3\end{vmatrix}`,
    conditions: [R`只对三维向量定义。`],
    scenarios: [R`求与两个向量都垂直的向量（平面的法向量）；求平行四边形、三角形的面积。`],
    steps: [R`按行列式第一行展开（中间项带负号）。`, R`面积 $=|\boldsymbol a\times\boldsymbol b|$，三角形再除以 2。`],
    pitfalls: [R`第二个分量是 $a_3b_1-a_1b_3$，最容易算错符号。`],
    exercises: [
      {
        id: 'la.vec.cross.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\boldsymbol a=(1,2,3)$ 与 $\boldsymbol b=(4,5,6)$ 的向量积，以及以它们为两边的平行四边形面积。`,
          ja: R`$\boldsymbol a=(1,2,3)$，$\boldsymbol b=(4,5,6)$ の外積と，それらが張る平行四辺形の面積を求めよ。`,
          en: R`Find $\boldsymbol a\times\boldsymbol b$ for $\boldsymbol a=(1,2,3)$, $\boldsymbol b=(4,5,6)$, and the area of the parallelogram they span.`,
        },
        answer: R`\boldsymbol a\times\boldsymbol b=(-3,\ 6,\ -3),\qquad S=3\sqrt6`,
        idea: R`按公式逐分量计算。`,
        solution: [
          { math: R`\boldsymbol a\times\boldsymbol b=\begin{pmatrix}2\cdot6-3\cdot5\\3\cdot4-1\cdot6\\1\cdot5-2\cdot4\end{pmatrix}=\begin{pmatrix}-3\\6\\-3\end{pmatrix}` },
          { math: R`S=\sqrt{9+36+9}=\sqrt{54}=3\sqrt6` },
        ],
        pitfalls: [R`检查：$(-3,6,-3)\cdot(1,2,3)=-3+12-9=0$，确实垂直。`],
        verify: { type: 'equal', lhs: 'Matrix([1,2,3]).cross(Matrix([4,5,6]))', rhs: 'Matrix([-3,6,-3])' },
      },
    ],
  },
  {
    id: 'la.vec.line',
    name: { zh: '直线的向量方程', ja: '直線の方程式', kana: 'ちょくせんのほうていしき' },
    knowledge: ['la.vec.k.vector'],
    formula: R`\boldsymbol x=\boldsymbol p+t\boldsymbol d,\qquad\frac{x-p_1}{d_1}=\frac{y-p_2}{d_2}=\frac{z-p_3}{d_3}`,
    conditions: [R`$\boldsymbol p$ 为直线上一点，$\boldsymbol d\neq\boldsymbol0$ 为方向向量。`],
    scenarios: [R`过两点的直线；过一点平行于某向量的直线。`],
    steps: [R`方向向量 $\boldsymbol d=B-A$。`, R`写出参数式或对称式。`],
    pitfalls: [R`对称式中分母为 0 的分量要单独写成 $x=p_1$。`],
    exercises: [
      {
        id: 'la.vec.line.ex1',
        difficulty: '易',
        question: {
          zh: R`求过两点 $A(1,0,2)$、$B(3,1,0)$ 的直线方程。`,
          ja: R`2 点 $A(1,0,2)$，$B(3,1,0)$ を通る直線の方程式を求めよ。`,
          en: R`Find the line through $A(1,0,2)$ and $B(3,1,0)$.`,
        },
        answer: R`\frac{x-1}{2}=\frac{y}{1}=\frac{z-2}{-2}`,
        idea: R`$\boldsymbol d=B-A=(2,1,-2)$。`,
        solution: [{ math: R`(x,y,z)=(1,0,2)+t(2,1,-2)` }, R`消去 $t$ 得对称式。`],
        pitfalls: [R`检查：$t=1$ 时得到点 $B$。`],
        verify: { type: 'equal', lhs: 'Matrix([1,0,2])+1*Matrix([2,1,-2])', rhs: 'Matrix([3,1,0])' },
      },
    ],
  },
  {
    id: 'la.vec.plane',
    name: { zh: '平面的方程', ja: '平面の方程式', kana: 'へいめんのほうていしき' },
    knowledge: ['la.vec.k.products'],
    formula: R`a(x-x_0)+b(y-y_0)+c(z-z_0)=0`,
    conditions: [R`$\boldsymbol n=(a,b,c)$ 为法向量，$(x_0,y_0,z_0)$ 为平面上一点。`],
    scenarios: [R`过三点的平面：法向量取两边向量的向量积。`],
    steps: [R`求两边向量 $\overrightarrow{AB}$、$\overrightarrow{AC}$。`, R`法向量 $\boldsymbol n=\overrightarrow{AB}\times\overrightarrow{AC}$。`, R`代入点法式。`],
    pitfalls: [R`点到平面距离 $d=\dfrac{|ax_1+by_1+cz_1+d_0|}{\sqrt{a^2+b^2+c^2}}$ 也常考。`],
    exercises: [
      {
        id: 'la.vec.plane.ex1',
        difficulty: '易',
        question: {
          zh: R`求过三点 $(1,0,0)$、$(0,2,0)$、$(0,0,3)$ 的平面方程。`,
          ja: R`3 点 $(1,0,0)$，$(0,2,0)$，$(0,0,3)$ を通る平面の方程式を求めよ。`,
          en: R`Find the plane through $(1,0,0)$, $(0,2,0)$, $(0,0,3)$.`,
        },
        answer: R`6x+3y+2z=6`,
        idea: R`$\overrightarrow{AB}=(-1,2,0)$，$\overrightarrow{AC}=(-1,0,3)$。`,
        solution: [
          { math: R`\boldsymbol n=(-1,2,0)\times(-1,0,3)=(6,\ 3,\ 2)` },
          { math: R`6(x-1)+3y+2z=0\ \Longrightarrow\ 6x+3y+2z=6` },
        ],
        pitfalls: [R`截距式 $\dfrac x1+\dfrac y2+\dfrac z3=1$ 两边乘 6 得同一结果。`],
        verify: { type: 'equal', lhs: 'Matrix([-1,2,0]).cross(Matrix([-1,0,3]))', rhs: 'Matrix([6,3,2])' },
      },
    ],
  },
];

export const vectorsChapter = {
  overview: '向量的加法与数乘、长度与单位向量、数量积与夹角、向量积，以及直线与平面的方程。',
  sections: [
    { title: '向量的运算', knowledge: [KV.vector], formulas: vectorCards.slice(0, 2) },
    { title: '数量积、向量积与图形', knowledge: [KV.products], formulas: vectorCards.slice(2) },
  ],
};

// ---------------- 第 2 章 矩阵 ----------------
const KM = {
  matrix: {
    id: 'la.mat.k.matrix',
    name: { zh: '矩阵的定义', ja: '行列の定義', kana: 'ぎょうれつのていぎ' },
    paragraphs: [
      R`$m$ 行 $n$ 列排成的数表称为 $m\times n$ **矩阵**（$(m,n)$ 型行列）。第 $i$ 行第 $j$ 列的数称为 $(i,j)$ **成分**，记作 $a_{ij}$。`,
      R`行数与列数相等的矩阵称为 $n$ 次**方阵**（正方行列）。`,
    ],
    definitions: [R`A=(a_{ij})=\begin{pmatrix}a_{11}&\cdots&a_{1n}\\\vdots&\ddots&\vdots\\a_{m1}&\cdots&a_{mn}\end{pmatrix}`],
    conditions: [R`两个矩阵相等：型相同且对应成分全部相等。`],
    theorems: [],
    related: ['la.mat.k.special'],
  },
  special: {
    id: 'la.mat.k.special',
    name: { zh: '特殊矩阵', ja: 'いろいろな行列', kana: 'いろいろなぎょうれつ' },
    paragraphs: [
      R`**零矩阵** $O$、**单位矩阵** $E$（对角线为 1，其余为 0）、**对角矩阵**、**上三角 / 下三角矩阵**。`,
      R`**对称矩阵**：$A^T=A$；**交代矩阵**（反对称）：$A^T=-A$，对角成分全为 0。`,
    ],
    definitions: [R`A^T=A\ (\text{对称}),\qquad A^T=-A\ (\text{交代})`],
    conditions: [],
    theorems: [R`任何方阵都可唯一分解为对称矩阵与交代矩阵之和：$A=\dfrac{A+A^T}{2}+\dfrac{A-A^T}{2}$。`],
    related: ['la.mat.k.matrix'],
  },
};

const matrixCards = [
  {
    id: 'la.mat.entries',
    name: { zh: '矩阵的型与成分', ja: '行列の型と成分', kana: 'ぎょうれつのかたとせいぶん' },
    knowledge: ['la.mat.k.matrix'],
    formula: R`\begin{gathered}A=(a_{ij})\ :\ m\times n\ \text{型}\\a_{ij}=\text{第}\ i\ \text{行第}\ j\ \text{列}\end{gathered}`,
    conditions: [R`先行后列。`],
    scenarios: [R`由成分的公式写出矩阵。`],
    steps: [R`按 $i$（行）、$j$（列）逐个代入。`],
    pitfalls: [R`$a_{23}$ 是第 2 行第 3 列，不要弄反。`],
    exercises: [
      {
        id: 'la.mat.entries.ex1',
        difficulty: '易',
        question: {
          zh: R`写出 $2\times3$ 矩阵 $A=(a_{ij})$，其中 $a_{ij}=i+2j$。`,
          ja: R`$a_{ij}=i+2j$ で定まる $(2,3)$ 型行列 $A=(a_{ij})$ を書け。`,
          en: R`Write the $2\times3$ matrix $A=(a_{ij})$ with $a_{ij}=i+2j$.`,
        },
        answer: R`A=\begin{pmatrix}3&5&7\\4&6&8\end{pmatrix}`,
        idea: R`第 1 行 $i=1$，第 2 行 $i=2$。`,
        solution: [R`第 1 行：$1+2,\ 1+4,\ 1+6$；第 2 行：$2+2,\ 2+4,\ 2+6$。`],
        pitfalls: [R`$2\times3$ 型是 2 行 3 列。`],
        verify: { type: 'equal', lhs: 'Matrix([[1+2,1+4,1+6],[2+2,2+4,2+6]])', rhs: 'Matrix([[3,5,7],[4,6,8]])' },
      },
    ],
  },
  {
    id: 'la.mat.sym-skew',
    name: { zh: '对称矩阵与交代矩阵的分解', ja: '対称行列と交代行列への分解', kana: 'たいしょうぎょうれつとこうたいぎょうれつへのぶんかい' },
    knowledge: ['la.mat.k.special'],
    formula: R`A=\underbrace{\frac{A+A^T}{2}}_{\text{对称}}+\underbrace{\frac{A-A^T}{2}}_{\text{交代}}`,
    conditions: [R`$A$ 为方阵。`],
    scenarios: [R`二次型中把系数矩阵换成对称矩阵（第 16 章）。`],
    steps: [R`求转置 $A^T$。`, R`分别计算 $\dfrac{A+A^T}{2}$ 与 $\dfrac{A-A^T}{2}$。`],
    pitfalls: [R`交代矩阵的对角成分一定是 0，可用于检查。`],
    exercises: [
      {
        id: 'la.mat.sym-skew.ex1',
        difficulty: '易',
        question: {
          zh: R`把 $A=\begin{pmatrix}1&2\\4&3\end{pmatrix}$ 写成对称矩阵与交代矩阵之和。`,
          ja: R`$A=\begin{pmatrix}1&2\\4&3\end{pmatrix}$ を対称行列と交代行列の和で表せ。`,
          en: R`Write $A=\begin{pmatrix}1&2\\4&3\end{pmatrix}$ as a sum of a symmetric and a skew-symmetric matrix.`,
        },
        answer: R`A=\begin{pmatrix}1&3\\3&3\end{pmatrix}+\begin{pmatrix}0&-1\\1&0\end{pmatrix}`,
        idea: R`$A^T=\begin{pmatrix}1&4\\2&3\end{pmatrix}$。`,
        solution: [
          { math: R`\frac{A+A^T}{2}=\begin{pmatrix}1&3\\3&3\end{pmatrix},\qquad\frac{A-A^T}{2}=\begin{pmatrix}0&-1\\1&0\end{pmatrix}` },
        ],
        pitfalls: [R`$(1,2)$ 成分：$\dfrac{2+4}{2}=3$，$\dfrac{2-4}{2}=-1$。`],
        verify: { type: 'equal', lhs: '(Matrix([[1,2],[4,3]])-Matrix([[1,2],[4,3]]).T)/2', rhs: 'Matrix([[0,-1],[1,0]])' },
      },
    ],
  },
];

export const matricesChapter = {
  overview: '矩阵的型、成分与相等，各种特殊矩阵（零、单位、对角、三角、对称、交代），以及对称 / 交代分解。',
  sections: [{ title: '矩阵', knowledge: [KM.matrix, KM.special], formulas: matrixCards }],
};

// ---------------- 第 3 章 矩阵运算 ----------------
const KO = {
  operations: {
    id: 'la.ops.k.operations',
    name: { zh: '矩阵运算的规律', ja: '行列の演算法則', kana: 'ぎょうれつのえんざんほうそく' },
    paragraphs: [
      R`加法、数乘按成分进行，要求型相同。乘法 $AB$ 要求 $A$ 的列数等于 $B$ 的行数：$(m\times n)(n\times p)=m\times p$。`,
      R`矩阵乘法满足结合律、分配律，但**一般不满足交换律**：$AB\neq BA$。$AB=O$ 也不能推出 $A=O$ 或 $B=O$。`,
    ],
    definitions: [R`(AB)_{ij}=\sum_{k=1}^{n}a_{ik}b_{kj}`],
    conditions: [R`$(A+B)^2=A^2+AB+BA+B^2$，只有 $AB=BA$ 时才等于 $A^2+2AB+B^2$。`],
    theorems: [R`$(AB)^T=B^TA^T$；$\operatorname{tr}(AB)=\operatorname{tr}(BA)$。`],
    related: ['la.mat.k.matrix'],
  },
};

const opsCards = [
  {
    id: 'la.ops.addition',
    name: { zh: '矩阵加法', ja: '行列の和', kana: 'ぎょうれつのわ' },
    knowledge: ['la.ops.k.operations'],
    formula: R`(A+B)_{ij}=a_{ij}+b_{ij}`,
    conditions: [R`$A$、$B$ 型相同。`],
    scenarios: [R`矩阵的线性组合。`],
    steps: [R`对应位置的成分相加。`],
    pitfalls: [R`型不同的矩阵不能相加。`],
    exercises: [
      {
        id: 'la.ops.addition.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\begin{pmatrix}1&2\\3&4\end{pmatrix}+\begin{pmatrix}0&-1\\2&5\end{pmatrix}$。`,
          ja: R`$\begin{pmatrix}1&2\\3&4\end{pmatrix}+\begin{pmatrix}0&-1\\2&5\end{pmatrix}$ を計算せよ。`,
          en: R`Compute $\begin{pmatrix}1&2\\3&4\end{pmatrix}+\begin{pmatrix}0&-1\\2&5\end{pmatrix}$.`,
        },
        answer: R`\begin{pmatrix}1&1\\5&9\end{pmatrix}`,
        idea: R`逐个成分相加。`,
        solution: [{ math: R`\begin{pmatrix}1+0&2-1\\3+2&4+5\end{pmatrix}=\begin{pmatrix}1&1\\5&9\end{pmatrix}` }],
        pitfalls: [R`注意负号成分。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,2],[3,4]])+Matrix([[0,-1],[2,5]])', rhs: 'Matrix([[1,1],[5,9]])' },
      },
    ],
  },
  {
    id: 'la.ops.subtraction',
    name: { zh: '矩阵减法', ja: '行列の差', kana: 'ぎょうれつのさ' },
    knowledge: ['la.ops.k.operations'],
    formula: R`(A-B)_{ij}=a_{ij}-b_{ij}`,
    conditions: [R`$A$、$B$ 型相同。`],
    scenarios: [R`矩阵差、$A-\lambda E$（特征值计算）。`],
    steps: [R`对应位置的成分相减。`],
    pitfalls: [R`减去负数等于加。`],
    exercises: [
      {
        id: 'la.ops.subtraction.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\begin{pmatrix}3&0&-1\\2&1&4\end{pmatrix}-\begin{pmatrix}1&2&3\\0&-1&2\end{pmatrix}$。`,
          ja: R`$\begin{pmatrix}3&0&-1\\2&1&4\end{pmatrix}-\begin{pmatrix}1&2&3\\0&-1&2\end{pmatrix}$ を計算せよ。`,
          en: R`Compute $\begin{pmatrix}3&0&-1\\2&1&4\end{pmatrix}-\begin{pmatrix}1&2&3\\0&-1&2\end{pmatrix}$.`,
        },
        answer: R`\begin{pmatrix}2&-2&-4\\2&2&2\end{pmatrix}`,
        idea: R`逐个成分相减。`,
        solution: [{ math: R`\begin{pmatrix}3-1&0-2&-1-3\\2-0&1+1&4-2\end{pmatrix}=\begin{pmatrix}2&-2&-4\\2&2&2\end{pmatrix}` }],
        pitfalls: [R`$1-(-1)=2$。`],
        verify: { type: 'equal', lhs: 'Matrix([[3,0,-1],[2,1,4]])-Matrix([[1,2,3],[0,-1,2]])', rhs: 'Matrix([[2,-2,-4],[2,2,2]])' },
      },
    ],
  },
  {
    id: 'la.ops.scalar',
    name: { zh: '数乘', ja: 'スカラー倍', kana: 'スカラーばい' },
    knowledge: ['la.ops.k.operations'],
    formula: R`(kA)_{ij}=k\,a_{ij}`,
    conditions: [R`$k$ 为数（标量）。`],
    scenarios: [R`$3A-2B$ 等线性组合；解矩阵的一次方程。`],
    steps: [R`每个成分都乘 $k$。`, R`再做加减。`],
    pitfalls: [R`行列式中 $|kA|=k^n|A|$，与矩阵数乘不同（第 7 章）。`],
    exercises: [
      {
        id: 'la.ops.scalar.ex1',
        difficulty: '易',
        question: {
          zh: R`$A=\begin{pmatrix}1&-1\\2&0\end{pmatrix}$，$B=\begin{pmatrix}0&2\\1&3\end{pmatrix}$。求 $3A-2B$。`,
          ja: R`$A=\begin{pmatrix}1&-1\\2&0\end{pmatrix}$，$B=\begin{pmatrix}0&2\\1&3\end{pmatrix}$ のとき，$3A-2B$ を求めよ。`,
          en: R`For $A=\begin{pmatrix}1&-1\\2&0\end{pmatrix}$, $B=\begin{pmatrix}0&2\\1&3\end{pmatrix}$, find $3A-2B$.`,
        },
        answer: R`\begin{pmatrix}3&-7\\4&-6\end{pmatrix}`,
        idea: R`先数乘再相减。`,
        solution: [{ math: R`\begin{pmatrix}3&-3\\6&0\end{pmatrix}-\begin{pmatrix}0&4\\2&6\end{pmatrix}=\begin{pmatrix}3&-7\\4&-6\end{pmatrix}` }],
        pitfalls: [R`$-3-4=-7$。`],
        verify: { type: 'equal', lhs: '3*Matrix([[1,-1],[2,0]])-2*Matrix([[0,2],[1,3]])', rhs: 'Matrix([[3,-7],[4,-6]])' },
      },
    ],
  },
  {
    id: 'la.ops.multiplication',
    name: { zh: '矩阵乘法', ja: '行列の積', kana: 'ぎょうれつのせき' },
    knowledge: ['la.ops.k.operations'],
    formula: R`\begin{aligned}(AB)_{ij}&=\sum_{k=1}^{n}a_{ik}b_{kj}\\&=(A\ \text{的第}\ i\ \text{行})\cdot(B\ \text{的第}\ j\ \text{列})\end{aligned}`,
    conditions: [R`$A$ 的列数 $=$ $B$ 的行数。`],
    scenarios: [R`所有涉及矩阵乘积的计算。`],
    steps: [R`确认型：$(m\times n)(n\times p)=m\times p$。`, R`第 $i$ 行与第 $j$ 列对应相乘再相加，得到 $(i,j)$ 成分。`],
    pitfalls: [R`$AB$ 与 $BA$ 一般不同，甚至可能只有一个有定义。`],
    exercises: [
      {
        id: 'la.ops.multiplication.ex1',
        difficulty: '易',
        question: {
          zh: R`$A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$，$B=\begin{pmatrix}2&0\\1&-1\end{pmatrix}$。求 $AB$ 与 $BA$。`,
          ja: R`$A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$，$B=\begin{pmatrix}2&0\\1&-1\end{pmatrix}$ のとき，$AB$ と $BA$ を求めよ。`,
          en: R`For $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, $B=\begin{pmatrix}2&0\\1&-1\end{pmatrix}$, compute $AB$ and $BA$.`,
        },
        answer: R`AB=\begin{pmatrix}4&-2\\10&-4\end{pmatrix},\qquad BA=\begin{pmatrix}2&4\\-2&-2\end{pmatrix}`,
        idea: R`行乘列；比较可见 $AB\neq BA$。`,
        solution: [
          { math: R`AB=\begin{pmatrix}2+2&0-2\\6+4&0-4\end{pmatrix}=\begin{pmatrix}4&-2\\10&-4\end{pmatrix}` },
          { math: R`BA=\begin{pmatrix}2&4\\1-3&2-4\end{pmatrix}=\begin{pmatrix}2&4\\-2&-2\end{pmatrix}` },
        ],
        pitfalls: [R`乘法不可交换，顺序不能随意调换。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'Matrix([[1,2],[3,4]])*Matrix([[2,0],[1,-1]])', rhs: 'Matrix([[4,-2],[10,-4]])' },
            { type: 'equal', lhs: 'Matrix([[2,0],[1,-1]])*Matrix([[1,2],[3,4]])', rhs: 'Matrix([[2,4],[-2,-2]])' },
          ],
        },
      },
      {
        id: 'la.ops.multiplication.ex2',
        difficulty: '易',
        question: {
          zh: R`求 $\begin{pmatrix}1&0&2\\-1&3&1\end{pmatrix}\begin{pmatrix}3&1\\2&1\\1&0\end{pmatrix}$。`,
          ja: R`$\begin{pmatrix}1&0&2\\-1&3&1\end{pmatrix}\begin{pmatrix}3&1\\2&1\\1&0\end{pmatrix}$ を計算せよ。`,
          en: R`Compute $\begin{pmatrix}1&0&2\\-1&3&1\end{pmatrix}\begin{pmatrix}3&1\\2&1\\1&0\end{pmatrix}$.`,
        },
        answer: R`\begin{pmatrix}5&1\\4&2\end{pmatrix}`,
        idea: R`$(2\times3)(3\times2)=2\times2$。`,
        solution: [
          { math: R`\begin{pmatrix}3+0+2&1+0+0\\-3+6+1&-1+3+0\end{pmatrix}=\begin{pmatrix}5&1\\4&2\end{pmatrix}` },
        ],
        pitfalls: [R`先确认结果的型。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,0,2],[-1,3,1]])*Matrix([[3,1],[2,1],[1,0]])', rhs: 'Matrix([[5,1],[4,2]])' },
      },
    ],
  },
  {
    id: 'la.ops.transpose',
    name: { zh: '转置矩阵', ja: '転置行列', kana: 'てんちぎょうれつ' },
    knowledge: ['la.ops.k.operations'],
    formula: [R`(A^T)_{ij}=a_{ji}`, R`(AB)^T=B^TA^T`],
    conditions: [R`$m\times n$ 矩阵的转置是 $n\times m$ 矩阵。`],
    scenarios: [R`对称性判断；内积 $\boldsymbol x^T\boldsymbol y$；二次型 $\boldsymbol x^TA\boldsymbol x$。`],
    steps: [R`行变列：第 $i$ 行写成第 $i$ 列。`, R`积的转置要倒序。`],
    pitfalls: [R`$(AB)^T\neq A^TB^T$。`],
    exercises: [
      {
        id: 'la.ops.transpose.ex1',
        difficulty: '易',
        question: {
          zh: R`$A=\begin{pmatrix}1&2\\0&1\end{pmatrix}$，$B=\begin{pmatrix}1&0\\3&1\end{pmatrix}$。验证 $(AB)^T=B^TA^T$。`,
          ja: R`$A=\begin{pmatrix}1&2\\0&1\end{pmatrix}$，$B=\begin{pmatrix}1&0\\3&1\end{pmatrix}$ について，$(AB)^T=B^TA^T$ を確かめよ。`,
          en: R`For $A=\begin{pmatrix}1&2\\0&1\end{pmatrix}$, $B=\begin{pmatrix}1&0\\3&1\end{pmatrix}$, verify $(AB)^T=B^TA^T$.`,
        },
        answer: R`(AB)^T=B^TA^T=\begin{pmatrix}7&3\\2&1\end{pmatrix}`,
        idea: R`两边分别计算。`,
        solution: [
          { math: R`AB=\begin{pmatrix}7&2\\3&1\end{pmatrix},\qquad(AB)^T=\begin{pmatrix}7&3\\2&1\end{pmatrix}` },
          { math: R`B^TA^T=\begin{pmatrix}1&3\\0&1\end{pmatrix}\begin{pmatrix}1&0\\2&1\end{pmatrix}=\begin{pmatrix}7&3\\2&1\end{pmatrix}` },
        ],
        pitfalls: [R`$A^TB^T=\begin{pmatrix}1&0\\5&1\end{pmatrix}$，与 $(AB)^T$ 不同。`],
        verify: { type: 'equal', lhs: '(Matrix([[1,2],[0,1]])*Matrix([[1,0],[3,1]])).T', rhs: 'Matrix([[1,0],[3,1]]).T*Matrix([[1,2],[0,1]]).T' },
      },
    ],
  },
  {
    id: 'la.ops.power',
    name: { zh: '矩阵的幂', ja: '行列の累乗', kana: 'ぎょうれつのるいじょう' },
    knowledge: ['la.ops.k.operations'],
    formula: [R`A^n=\underbrace{AA\cdots A}_{n}`, R`A^2-(\operatorname{tr}A)A+(\det A)E=O`],
    conditions: [R`方阵；第二个公式是 $2\times2$ 矩阵的 Cayley–Hamilton 定理。`],
    scenarios: [R`求 $A^n$：找规律后用归纳法；用 Cayley–Hamilton 降次；对角化（第 13 章）。`],
    steps: [R`算 $A^2$、$A^3$ 找规律，再用数学归纳法证明。`, R`或用 $A^2=(\operatorname{tr}A)A-(\det A)E$ 把高次幂化为 $A$ 与 $E$ 的组合。`],
    pitfalls: [R`$(A^n)_{ij}\neq(a_{ij})^n$。`],
    exercises: [
      {
        id: 'la.ops.power.ex1',
        difficulty: '易',
        question: {
          zh: R`$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$。求 $A^n$。`,
          ja: R`$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$ のとき，$A^n$ を求めよ。`,
          en: R`For $A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$, find $A^n$.`,
        },
        answer: R`A^n=\begin{pmatrix}1&n\\0&1\end{pmatrix}`,
        idea: R`$A^2=\begin{pmatrix}1&2\\0&1\end{pmatrix}$，猜想后归纳证明。`,
        solution: [
          R`$A^2=\begin{pmatrix}1&2\\0&1\end{pmatrix}$，$A^3=\begin{pmatrix}1&3\\0&1\end{pmatrix}$，猜想 $A^n=\begin{pmatrix}1&n\\0&1\end{pmatrix}$。`,
          { math: R`A^{n+1}=\begin{pmatrix}1&n\\0&1\end{pmatrix}\begin{pmatrix}1&1\\0&1\end{pmatrix}=\begin{pmatrix}1&n+1\\0&1\end{pmatrix}` },
          R`由数学归纳法得证。`,
        ],
        pitfalls: [R`答案要附上归纳法的证明。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,1],[0,1]])**7', rhs: 'Matrix([[1,7],[0,1]])' },
      },
      {
        id: 'la.ops.power.ex2',
        difficulty: '中',
        question: {
          zh: R`$A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$。用 Cayley–Hamilton 定理求 $A^3$。`,
          ja: R`$A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$ のとき，ケーリー・ハミルトンの定理を用いて $A^3$ を求めよ。`,
          en: R`For $A=\begin{pmatrix}1&2\\2&1\end{pmatrix}$, use the Cayley–Hamilton theorem to find $A^3$.`,
        },
        answer: R`A^3=7A+6E=\begin{pmatrix}13&14\\14&13\end{pmatrix}`,
        idea: R`$\operatorname{tr}A=2$，$\det A=-3$：$A^2=2A+3E$。`,
        solution: [
          { math: R`A^2-2A-3E=O\ \Longrightarrow\ A^2=2A+3E` },
          { math: R`\begin{aligned}A^3&=2A^2+3A\\&=2(2A+3E)+3A=7A+6E\end{aligned}` },
          { math: R`=\begin{pmatrix}7+6&14\\14&7+6\end{pmatrix}=\begin{pmatrix}13&14\\14&13\end{pmatrix}` },
        ],
        pitfalls: [R`$\det A=1-4=-3$，所以常数项是 $-3E$。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,2],[2,1]])**3', rhs: 'Matrix([[13,14],[14,13]])' },
      },
    ],
  },
  {
    id: 'la.ops.trace',
    name: { zh: '迹', ja: 'トレース', kana: 'トレース' },
    knowledge: ['la.ops.k.operations'],
    formula: [R`\operatorname{tr}A=\sum_{i=1}^{n}a_{ii}`, R`\operatorname{tr}(AB)=\operatorname{tr}(BA)`],
    conditions: [R`方阵。`],
    scenarios: [R`特征值之和 $=\operatorname{tr}A$（第 12 章）；Cayley–Hamilton 公式。`],
    steps: [R`对角成分相加。`],
    pitfalls: [R`$\operatorname{tr}(AB)\neq\operatorname{tr}A\cdot\operatorname{tr}B$。`],
    exercises: [
      {
        id: 'la.ops.trace.ex1',
        difficulty: '易',
        question: {
          zh: R`$A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$，$B=\begin{pmatrix}0&1\\5&2\end{pmatrix}$。求 $\operatorname{tr}(AB)$ 与 $\operatorname{tr}(BA)$。`,
          ja: R`$A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$，$B=\begin{pmatrix}0&1\\5&2\end{pmatrix}$ のとき，$\operatorname{tr}(AB)$ と $\operatorname{tr}(BA)$ を求めよ。`,
          en: R`For $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, $B=\begin{pmatrix}0&1\\5&2\end{pmatrix}$, find $\operatorname{tr}(AB)$ and $\operatorname{tr}(BA)$.`,
        },
        answer: R`\operatorname{tr}(AB)=\operatorname{tr}(BA)=21`,
        idea: R`只需计算对角成分。`,
        solution: [
          { math: R`AB=\begin{pmatrix}10&5\\20&11\end{pmatrix},\qquad BA=\begin{pmatrix}3&4\\11&18\end{pmatrix}` },
          R`$\operatorname{tr}(AB)=10+11=21$，$\operatorname{tr}(BA)=3+18=21$。`,
        ],
        pitfalls: [R`矩阵 $AB\neq BA$，但迹相等。`],
        verify: { type: 'equal', lhs: '(Matrix([[1,2],[3,4]])*Matrix([[0,1],[5,2]])).trace()', rhs: '(Matrix([[0,1],[5,2]])*Matrix([[1,2],[3,4]])).trace()' },
      },
    ],
  },
];

export const matrixOpsChapter = {
  overview: '矩阵的加法、减法、数乘、乘法、转置、幂与迹，每种运算一张卡。重点：乘法不满足交换律。',
  sections: [{ title: '矩阵的运算', knowledge: [KO.operations], formulas: opsCards }],
};

// ---------------- 第 4 章 线性方程组 ----------------
const KS = {
  system: {
    id: 'la.sys.k.system',
    name: { zh: '线性方程组与消元法', ja: '連立一次方程式と掃き出し法', kana: 'れんりついちじほうていしきとはきだしほう' },
    paragraphs: [
      R`线性方程组写成 $A\boldsymbol x=\boldsymbol b$。把**增广矩阵** $(A\mid\boldsymbol b)$ 用行基本变形化为阶梯形（掃き出し法），就能读出解。`,
      R`解只有三种情况：唯一解、无穷多解、无解。`,
    ],
    definitions: [R`A\boldsymbol x=\boldsymbol b\quad\longleftrightarrow\quad(A\mid\boldsymbol b)`],
    conditions: [R`行基本变形不改变方程组的解。`],
    theorems: [
      R`有解 $\iff\operatorname{rank}A=\operatorname{rank}(A\mid\boldsymbol b)$。`,
      R`有解时，自由变量（参数）的个数 $=n-\operatorname{rank}A$（$n$ 为未知数个数）。`,
    ],
    related: ['la.elem.k.rank'],
  },
};

const systemCards = [
  {
    id: 'la.sys.unique',
    name: { zh: '消元法（唯一解）', ja: '掃き出し法（解が一意の場合）', kana: 'はきだしほう' },
    knowledge: ['la.sys.k.system'],
    formula: R`(A\mid\boldsymbol b)\ \xrightarrow{\ \text{行基本变形}\ }\ (E\mid\boldsymbol x)`,
    conditions: [R`$A$ 为正则矩阵（$\det A\neq0$）。`],
    scenarios: [R`未知数个数与方程个数相同、有唯一解的方程组。`],
    steps: [R`写出增广矩阵。`, R`从左到右逐列：选主元，把同列其他行消为 0。`, R`化为 $(E\mid\boldsymbol x)$，读出解。`],
    pitfalls: [R`每一步只用行变形，不要对列做变形。`],
    exercises: [
      {
        id: 'la.sys.unique.ex1',
        difficulty: '易',
        question: {
          zh: R`解方程组 $\begin{cases}x+y+z=6\\2x-y+z=3\\x+2y-z=2\end{cases}$。`,
          ja: R`連立方程式 $\begin{cases}x+y+z=6\\2x-y+z=3\\x+2y-z=2\end{cases}$ を解け。`,
          en: R`Solve $\begin{cases}x+y+z=6\\2x-y+z=3\\x+2y-z=2\end{cases}$.`,
        },
        answer: R`(x,y,z)=(1,2,3)`,
        idea: R`用第 1 行消去下面两行的 $x$。`,
        solution: [
          { math: R`\left(\begin{array}{ccc|c}1&1&1&6\\2&-1&1&3\\1&2&-1&2\end{array}\right)` }, { math: R`\to\left(\begin{array}{ccc|c}1&1&1&6\\0&-3&-1&-9\\0&1&-2&-4\end{array}\right)` },
          { math: R`\to\left(\begin{array}{ccc|c}1&1&1&6\\0&1&-2&-4\\0&0&-7&-21\end{array}\right)` },
          R`$z=3$，$y=-4+2z=2$，$x=6-y-z=1$。`,
        ],
        pitfalls: [R`第二步交换了第 2、3 行，让主元为 1 更好算。`],
        verify: { type: 'equal', lhs: 'linsolve([x+y+z-6, 2*x-y+z-3, x+2*y-z-2], [x, y, z])', rhs: 'FiniteSet((1, 2, 3))' },
      },
    ],
  },
  {
    id: 'la.sys.infinite',
    name: { zh: '无穷多解（参数表示）', ja: '解が無数にある場合（パラメータ表示）', kana: 'かいがむすうにあるばあい' },
    knowledge: ['la.sys.k.system'],
    formula: R`\begin{gathered}\boldsymbol x=\boldsymbol x_0+t_1\boldsymbol v_1+\cdots+t_k\boldsymbol v_k\\(k=n-\operatorname{rank}A)\end{gathered}`,
    conditions: [R`$\operatorname{rank}A=\operatorname{rank}(A\mid\boldsymbol b)<n$。`],
    scenarios: [R`化成阶梯形后，有的列没有主元。`],
    steps: [R`化为行简约阶梯形。`, R`没有主元的列对应的变量设为参数 $t,s,\dots$。`, R`用参数表示主元变量。`],
    pitfalls: [R`参数的选法不唯一，但解集相同；可代回原方程检查。`],
    exercises: [
      {
        id: 'la.sys.infinite.ex1',
        difficulty: '易',
        question: {
          zh: R`解方程组 $\begin{cases}x+2y+z=3\\2x+4y+3z=7\end{cases}$。`,
          ja: R`連立方程式 $\begin{cases}x+2y+z=3\\2x+4y+3z=7\end{cases}$ を解け。`,
          en: R`Solve $\begin{cases}x+2y+z=3\\2x+4y+3z=7\end{cases}$.`,
        },
        answer: R`\begin{gathered}(x,y,z)=(2-2t,\ t,\ 1)\\(t\ \text{为任意实数})\end{gathered}`,
        idea: R`第 2 式 $-2\times$ 第 1 式得 $z=1$。`,
        solution: [
          { math: R`\left(\begin{array}{ccc|c}1&2&1&3\\2&4&3&7\end{array}\right)\to\left(\begin{array}{ccc|c}1&2&0&2\\0&0&1&1\end{array}\right)` },
          R`$y$ 列没有主元，令 $y=t$，则 $x=2-2t$，$z=1$。`,
        ],
        pitfalls: [R`参数个数 $=3-\operatorname{rank}A=3-2=1$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: '(2-2*t)+2*t+1', rhs: '3' },
            { type: 'equal', lhs: '2*(2-2*t)+4*t+3*1', rhs: '7' },
          ],
        },
      },
      {
        id: 'la.sys.infinite.ex2',
        difficulty: '易',
        question: {
          zh: R`解方程组 $\begin{cases}x-y+2z=1\\2x-2y+4z=2\end{cases}$。`,
          ja: R`連立方程式 $\begin{cases}x-y+2z=1\\2x-2y+4z=2\end{cases}$ を解け。`,
          en: R`Solve $\begin{cases}x-y+2z=1\\2x-2y+4z=2\end{cases}$.`,
        },
        answer: R`\begin{gathered}(x,y,z)=(1+s-2t,\ s,\ t)\\(s,t\ \text{为任意实数})\end{gathered}`,
        idea: R`第 2 式是第 1 式的 2 倍，$\operatorname{rank}=1$，有两个参数。`,
        solution: [
          R`实际上只有一个方程 $x-y+2z=1$。令 $y=s$，$z=t$，则 $x=1+s-2t$。`,
          { math: R`\begin{pmatrix}x\\y\\z\end{pmatrix}=\begin{pmatrix}1\\0\\0\end{pmatrix}+s\begin{pmatrix}1\\1\\0\end{pmatrix}+t\begin{pmatrix}-2\\0\\1\end{pmatrix}` },
        ],
        pitfalls: [R`参数个数 $=3-1=2$。`],
        verify: { type: 'equal', lhs: '(1+s-2*t)-s+2*t', rhs: '1' },
      },
    ],
  },
  {
    id: 'la.sys.no-solution',
    name: { zh: '无解的判定', ja: '解をもたない場合', kana: 'かいをもたないばあい' },
    knowledge: ['la.sys.k.system'],
    formula: R`\operatorname{rank}A<\operatorname{rank}(A\mid\boldsymbol b)\iff\text{无解}`,
    conditions: [R`阶梯形中出现 $(0\ 0\ \cdots\ 0\mid c)$，$c\neq0$。`],
    scenarios: [R`方程之间互相矛盾。`],
    steps: [R`化成阶梯形。`, R`看是否出现「左边全 0、右边非 0」的行。`],
    pitfalls: [R`出现 $0=c\ (c\neq0)$ 就立即可以下结论。`],
    exercises: [
      {
        id: 'la.sys.no-solution.ex1',
        difficulty: '易',
        question: {
          zh: R`判断方程组 $\begin{cases}x+y+z=1\\x+2y+3z=2\\2x+3y+4z=4\end{cases}$ 是否有解。`,
          ja: R`連立方程式 $\begin{cases}x+y+z=1\\x+2y+3z=2\\2x+3y+4z=4\end{cases}$ は解をもつか。`,
          en: R`Does $\begin{cases}x+y+z=1\\x+2y+3z=2\\2x+3y+4z=4\end{cases}$ have a solution?`,
        },
        answerText: R`无解。第 3 式 − 第 1 式 − 第 2 式得 $0=1$，矛盾（$\operatorname{rank}A=2<\operatorname{rank}(A\mid\boldsymbol b)=3$）。`,
        idea: R`第 1、2 式相加的左边恰好等于第 3 式的左边。`,
        solution: [
          { math: R`\left(\begin{array}{ccc|c}1&1&1&1\\1&2&3&2\\2&3&4&4\end{array}\right)\to\left(\begin{array}{ccc|c}1&1&1&1\\0&1&2&1\\0&0&0&1\end{array}\right)` },
          R`最后一行表示 $0=1$，矛盾，所以无解。`,
        ],
        pitfalls: [R`$\operatorname{rank}A=2$，$\operatorname{rank}(A\mid\boldsymbol b)=3$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'Matrix([[1,1,1],[1,2,3],[2,3,4]]).rank()', rhs: '2' },
            { type: 'equal', lhs: 'Matrix([[1,1,1,1],[1,2,3,2],[2,3,4,4]]).rank()', rhs: '3' },
          ],
        },
      },
    ],
  },
  {
    id: 'la.sys.homogeneous',
    name: { zh: '齐次方程组的非平凡解', ja: '斉次連立方程式の非自明解', kana: 'せいじれんりつほうていしきのひじめいかい' },
    knowledge: ['la.sys.k.system'],
    formula: R`\begin{gathered}A\boldsymbol x=\boldsymbol0\ \text{有非平凡解}\\\iff\operatorname{rank}A<n\\\iff\det A=0\end{gathered}`,
    conditions: [R`齐次方程组总有平凡解 $\boldsymbol x=\boldsymbol0$。最后一个等价只对方阵 $A$ 成立。`],
    scenarios: [R`判断向量的线性相关、求特征向量、求核。`],
    steps: [R`化为行简约阶梯形（右边全 0 不必写）。`, R`设自由变量为参数，写出解。`],
    pitfalls: [R`答案通常写成「$t\times$ 某向量」的形式。`],
    exercises: [
      {
        id: 'la.sys.homogeneous.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $\begin{cases}x+2y-z=0\\2x+5y+z=0\\x+3y+2z=0\end{cases}$ 的解。`,
          ja: R`$\begin{cases}x+2y-z=0\\2x+5y+z=0\\x+3y+2z=0\end{cases}$ を解け。`,
          en: R`Solve $\begin{cases}x+2y-z=0\\2x+5y+z=0\\x+3y+2z=0\end{cases}$.`,
        },
        answer: R`\begin{pmatrix}x\\y\\z\end{pmatrix}=t\begin{pmatrix}7\\-3\\1\end{pmatrix}\qquad(t\ \text{为任意实数})`,
        idea: R`系数矩阵的行列式为 0，有非平凡解。`,
        solution: [
          { math: R`\begin{pmatrix}1&2&-1\\2&5&1\\1&3&2\end{pmatrix}\to\begin{pmatrix}1&2&-1\\0&1&3\\0&1&3\end{pmatrix}` }, { math: R`\to\begin{pmatrix}1&0&-7\\0&1&3\\0&0&0\end{pmatrix}` },
          R`令 $z=t$：$y=-3t$，$x=7t$。`,
        ],
        pitfalls: [R`检查：$(7,-3,1)$ 代入三个方程都为 0。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,2,-1],[2,5,1],[1,3,2]])*Matrix([7,-3,1])', rhs: 'Matrix([0,0,0])' },
      },
    ],
  },
  {
    id: 'la.sys.parameter',
    name: { zh: '含参数方程组的讨论', ja: 'パラメータを含む連立方程式', kana: 'パラメータをふくむれんりつほうていしき' },
    knowledge: ['la.sys.k.system'],
    formula: R`\begin{gathered}\operatorname{rank}A=\operatorname{rank}(A\mid\boldsymbol b)=n:\ \text{唯一解}\\\operatorname{rank}A=\operatorname{rank}(A\mid\boldsymbol b)<n:\ \text{无穷多解}\\\operatorname{rank}A<\operatorname{rank}(A\mid\boldsymbol b):\ \text{无解}\end{gathered}`,
    conditions: [R`消元时不要用「可能为 0 的式子」去除。`],
    scenarios: [R`题目问「参数取何值时有唯一解 / 无穷多解 / 无解」。`],
    steps: [R`化成阶梯形，最后一行的系数含参数。`, R`按该系数是否为 0 分情况。`, R`系数为 0 时再看右边是否为 0。`],
    pitfalls: [R`方阵时可先算 $\det A$：$\det A\neq0\iff$ 唯一解。`],
    exercises: [
      {
        id: 'la.sys.parameter.ex1',
        difficulty: '中',
        question: {
          zh: R`讨论方程组 $\begin{cases}ax+y=1\\x+ay=1\end{cases}$ 的解。`,
          ja: R`連立方程式 $\begin{cases}ax+y=1\\x+ay=1\end{cases}$ の解を $a$ の値で分類せよ。`,
          en: R`Classify the solutions of $\begin{cases}ax+y=1\\x+ay=1\end{cases}$ according to $a$.`,
        },
        answer: R`\begin{gathered}a\neq\pm1:\ x=y=\frac{1}{a+1}\\a=1:\ x+y=1\ (\text{无穷多解})\\a=-1:\ \text{无解}\end{gathered}`,
        idea: R`$\det A=a^2-1$。`,
        solution: [
          R`$\det A=a^2-1$。$a\neq\pm1$ 时唯一解；由对称性 $x=y$，代入得 $(a+1)x=1$，$x=y=\dfrac{1}{a+1}$。`,
          R`$a=1$：两式都是 $x+y=1$，无穷多解 $(x,y)=(1-t,t)$。`,
          R`$a=-1$：$-x+y=1$ 与 $x-y=1$ 相加得 $0=2$，无解。`,
        ],
        pitfalls: [R`$a=1$ 与 $a=-1$ 的结论不同，要分开讨论。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'Matrix([[a,1],[1,a]]).det()', rhs: 'a**2-1' },
            { type: 'equal', lhs: 'simplify(a/(a+1)+1/(a+1))', rhs: '1' },
          ],
        },
      },
      {
        id: 'la.sys.parameter.ex2',
        difficulty: '中',
        question: {
          zh: R`讨论 $\begin{cases}x+y+z=1\\x+2y+3z=2\\x+3y+az=b\end{cases}$ 的解与 $a,b$ 的关系。`,
          ja: R`$\begin{cases}x+y+z=1\\x+2y+3z=2\\x+3y+az=b\end{cases}$ の解を $a,b$ の値で分類せよ。`,
          en: R`Classify the solutions of $\begin{cases}x+y+z=1\\x+2y+3z=2\\x+3y+az=b\end{cases}$ according to $a,b$.`,
        },
        answer: R`\begin{gathered}a\neq5:\ \text{唯一解}\\a=5,\ b=3:\ \text{无穷多解}\\a=5,\ b\neq3:\ \text{无解}\end{gathered}`,
        idea: R`化为阶梯形后最后一行为 $(0\ 0\ a-5\mid b-3)$。`,
        solution: [
          { math: R`\to\left(\begin{array}{ccc|c}1&1&1&1\\0&1&2&1\\0&2&a-1&b-1\end{array}\right)` }, { math: R`\to\left(\begin{array}{ccc|c}1&1&1&1\\0&1&2&1\\0&0&a-5&b-3\end{array}\right)` },
          R`$a\neq5$：$\operatorname{rank}=3$，唯一解。$a=5$：$b=3$ 时 $\operatorname{rank}A=\operatorname{rank}(A\mid\boldsymbol b)=2$，无穷多解；$b\neq3$ 时无解。`,
        ],
        pitfalls: [R`第三行减去第二行的 2 倍：$(a-1)-4=a-5$，$(b-1)-2=b-3$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'Matrix([[1,1,1],[1,2,3],[1,3,a]]).det()', rhs: 'a-5' },
            { type: 'equal', lhs: 'Matrix([[1,1,1,1],[1,2,3,2],[1,3,5,3]]).rank()', rhs: '2' },
          ],
        },
      },
    ],
  },
];

export const linearSystemsChapter = {
  overview: '用增广矩阵与消元法解线性方程组：唯一解、无穷多解（参数表示）、无解，齐次方程组的非平凡解，以及含参数方程组的讨论。',
  sections: [{ title: '线性方程组', knowledge: [KS.system], formulas: systemCards }],
};
