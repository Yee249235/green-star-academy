// 线性代数 第 9～12 章：向量空间、基底与维数、线性映射、特征值与特征向量
const R = String.raw;

// ---------------- 第 9 章 向量空间 ----------------
const KVS = {
  space: {
    id: 'la.vs.k.space',
    name: { zh: '向量空间与子空间', ja: 'ベクトル空間と部分空間', kana: 'ベクトルくうかんとぶぶんくうかん' },
    paragraphs: [
      R`定义了加法和数乘、并满足交换律、结合律、零元、逆元、分配律等 8 条公理的集合称为**向量空间**（線形空間）。$\R^n$、多项式全体、连续函数全体都是向量空间。`,
      R`向量空间 $V$ 的非空子集 $W$ 若对加法和数乘封闭，则 $W$ 本身也是向量空间，称为**子空间**（部分空間）。`,
    ],
    definitions: [R`\begin{gathered}\boldsymbol a,\boldsymbol b\in W,\ c\in\R\\\Longrightarrow\ \boldsymbol a+\boldsymbol b\in W,\ \ c\boldsymbol a\in W\end{gathered}`],
    conditions: [R`子空间一定包含零向量 $\boldsymbol0$：不含 $\boldsymbol0$ 的集合立即不是子空间。`],
    theorems: [R`齐次方程组 $A\boldsymbol x=\boldsymbol0$ 的解集是子空间；非齐次方程组的解集不是。`],
    related: ['la.vs.k.span'],
  },
  span: {
    id: 'la.vs.k.span',
    name: { zh: '生成的子空间、和与交', ja: '生成される部分空間・和空間・共通部分', kana: 'せいせいされるぶぶんくうかん・わくうかん・きょうつうぶぶん' },
    paragraphs: [
      R`$\boldsymbol a_1,\dots,\boldsymbol a_k$ 的所有线性组合构成的子空间称为它们**生成的子空间**，记作 $\langle\boldsymbol a_1,\dots,\boldsymbol a_k\rangle$。`,
      R`两个子空间的**交** $W_1\cap W_2$ 和**和** $W_1+W_2=\{\boldsymbol w_1+\boldsymbol w_2\}$ 都是子空间；并集一般不是。`,
    ],
    definitions: [R`\langle\boldsymbol a_1,\dots,\boldsymbol a_k\rangle=\{c_1\boldsymbol a_1+\cdots+c_k\boldsymbol a_k\}`],
    conditions: [],
    theorems: [R`$\boldsymbol b\in\langle\boldsymbol a_1,\dots,\boldsymbol a_k\rangle\iff\rank(\boldsymbol a_1\cdots\boldsymbol a_k)=\rank(\boldsymbol a_1\cdots\boldsymbol a_k\ \boldsymbol b)$。`],
    related: ['la.vs.k.space', 'la.ind.k.independence'],
  },
};

const vsCards = [
  {
    id: 'la.vs.subspace',
    name: { zh: '子空间的判定', ja: '部分空間の判定', kana: 'ぶぶんくうかんのはんてい' },
    knowledge: ['la.vs.k.space'],
    formula: R`\begin{gathered}\boldsymbol a,\boldsymbol b\in W\ \Longrightarrow\ \boldsymbol a+\boldsymbol b\in W\\c\in\R,\ \boldsymbol a\in W\ \Longrightarrow\ c\boldsymbol a\in W\end{gathered}`,
    conditions: [R`$W$ 非空（通常先检查 $\boldsymbol0\in W$）。`],
    scenarios: [R`判断用方程或条件给出的集合是否为子空间。`],
    steps: [R`检查 $\boldsymbol0\in W$；不含则直接否定。`, R`任取两个元素验证加法封闭。`, R`验证数乘封闭。`],
    pitfalls: [R`否定时给一个具体的反例即可。`],
    exercises: [
      {
        id: 'la.vs.subspace.ex1',
        difficulty: '易',
        question: {
          zh: R`判断 $\R^3$ 的子集 $W_1=\{(x,y,z)\mid x+2y-z=0\}$ 与 $W_2=\{(x,y,z)\mid x+y=1\}$ 是否为子空间。`,
          ja: R`$\R^3$ の部分集合 $W_1=\{(x,y,z)\mid x+2y-z=0\}$，$W_2=\{(x,y,z)\mid x+y=1\}$ は部分空間か。`,
          en: R`Are $W_1=\{(x,y,z)\mid x+2y-z=0\}$ and $W_2=\{(x,y,z)\mid x+y=1\}$ subspaces of $\R^3$?`,
        },
        answerText: R`$W_1$ 是子空间；$W_2$ 不是（$\boldsymbol0\notin W_2$）。`,
        idea: R`$W_1$ 是齐次方程的解集。`,
        solution: [
          R`$W_1$：若 $\boldsymbol a,\boldsymbol b\in W_1$，则 $(a_1+b_1)+2(a_2+b_2)-(a_3+b_3)=0+0=0$；数乘同理。所以是子空间。`,
          R`$W_2$：$(0,0,0)$ 不满足 $x+y=1$，所以不是子空间。`,
        ],
        pitfalls: [R`「右边不为 0 的一次方程」的解集都不是子空间。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,2,-1]])*(Matrix([1,0,1])+Matrix([0,1,2]))', rhs: 'Matrix([[0]])' },
      },
    ],
  },
  {
    id: 'la.vs.span',
    name: { zh: '是否属于生成的子空间', ja: '生成される部分空間に属するか', kana: 'せいせいされるぶぶんくうかんにぞくするか' },
    knowledge: ['la.vs.k.span'],
    formula: R`\begin{gathered}\boldsymbol b\in\langle\boldsymbol a_1,\dots,\boldsymbol a_k\rangle\\\iff c_1\boldsymbol a_1+\cdots+c_k\boldsymbol a_k=\boldsymbol b\ \text{有解}\end{gathered}`,
    conditions: [R`等价于 $\rank(\boldsymbol a_1\cdots\boldsymbol a_k)=\rank(\boldsymbol a_1\cdots\boldsymbol a_k\ \boldsymbol b)$。`],
    scenarios: [R`判断某向量能否由给定向量线性表示。`],
    steps: [R`列出关于 $c_i$ 的方程组。`, R`消元判断有无解。`],
    pitfalls: [R`方程个数多于未知数时，要检查所有方程，不只是前几个。`],
    exercises: [
      {
        id: 'la.vs.span.ex1',
        difficulty: '易',
        question: {
          zh: R`$W=\langle(1,1,1),\ (0,1,2)\rangle$。判断 $(1,2,3)$ 与 $(1,0,0)$ 是否属于 $W$。`,
          ja: R`$W=\langle(1,1,1),\ (0,1,2)\rangle$ とする。$(1,2,3)$，$(1,0,0)$ は $W$ に属するか。`,
          en: R`Let $W=\langle(1,1,1),\ (0,1,2)\rangle$. Do $(1,2,3)$ and $(1,0,0)$ belong to $W$?`,
        },
        answerText: R`$(1,2,3)=(1,1,1)+(0,1,2)\in W$；$(1,0,0)\notin W$。`,
        idea: R`$c_1(1,1,1)+c_2(0,1,2)=(c_1,\ c_1+c_2,\ c_1+2c_2)$。`,
        solution: [
          R`$(1,2,3)$：$c_1=1$，$c_2=1$，第 3 个分量 $1+2=3$ 成立。`,
          R`$(1,0,0)$：$c_1=1$，$c_2=-1$，第 3 个分量 $1-2=-1\neq0$，矛盾。`,
        ],
        pitfalls: [R`第三个方程是检验条件。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,0,1],[1,1,0],[1,2,0]]).rank()', rhs: '3' },
      },
    ],
  },
  {
    id: 'la.vs.intersection',
    name: { zh: '子空间的交', ja: '部分空間の共通部分', kana: 'ぶぶんくうかんのきょうつうぶぶん' },
    knowledge: ['la.vs.k.span'],
    formula: R`W_1\cap W_2=\{\boldsymbol x\mid\boldsymbol x\in W_1\ \text{且}\ \boldsymbol x\in W_2\}`,
    conditions: [R`用方程给出的子空间：把两组方程联立。`],
    scenarios: [R`求两个平面的交线、两个解空间的公共部分。`],
    steps: [R`两组方程联立。`, R`解齐次方程组，写成生成的形式。`],
    pitfalls: [R`若子空间是用生成元给出的，先把它化成方程形式，或设 $\boldsymbol x=\sum c_i\boldsymbol a_i=\sum d_j\boldsymbol b_j$。`],
    exercises: [
      {
        id: 'la.vs.intersection.ex1',
        difficulty: '易',
        question: {
          zh: R`$W_1=\{x+y+z=0\}$，$W_2=\{x-y=0\}$（$\R^3$ 的子空间）。求 $W_1\cap W_2$。`,
          ja: R`$\R^3$ の部分空間 $W_1=\{x+y+z=0\}$，$W_2=\{x-y=0\}$ について，$W_1\cap W_2$ を求めよ。`,
          en: R`For the subspaces $W_1=\{x+y+z=0\}$, $W_2=\{x-y=0\}$ of $\R^3$, find $W_1\cap W_2$.`,
        },
        answer: R`W_1\cap W_2=\langle(1,1,-2)\rangle`,
        idea: R`联立两个方程。`,
        solution: [R`$y=x$，$z=-x-y=-2x$。令 $x=t$：$(x,y,z)=t(1,1,-2)$。`],
        pitfalls: [R`交是一条过原点的直线，维数为 1。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,1,1],[1,-1,0]])*Matrix([1,1,-2])', rhs: 'Matrix([0,0])' },
      },
    ],
  },
];

export const vectorSpacesChapter = {
  overview: '向量空间与子空间：子空间的判定、生成的子空间（属于判定）、子空间的交与和。',
  sections: [{ title: '向量空间与子空间', knowledge: [KVS.space, KVS.span], formulas: vsCards }],
};

// ---------------- 第 10 章 基底与维数 ----------------
const KB = {
  basis: {
    id: 'la.basis.k.basis',
    name: { zh: '基底、维数与坐标', ja: '基底・次元・座標', kana: 'きてい・じげん・ざひょう' },
    paragraphs: [
      R`$V$ 中线性无关、且生成 $V$ 的向量组称为 $V$ 的**基底**。基底所含向量的个数与基底的取法无关，称为 $V$ 的**维数** $\dim V$。`,
      R`取定基底 $\boldsymbol a_1,\dots,\boldsymbol a_n$ 后，每个 $\boldsymbol x\in V$ 都唯一地写成 $\boldsymbol x=c_1\boldsymbol a_1+\cdots+c_n\boldsymbol a_n$，$(c_1,\dots,c_n)$ 称为**坐标**（成分）。`,
    ],
    definitions: [R`\dim\langle\boldsymbol a_1,\dots,\boldsymbol a_k\rangle=\rank(\boldsymbol a_1\ \cdots\ \boldsymbol a_k)`],
    conditions: [R`$\dim V=n$ 时：$n$ 个线性无关的向量自动成为基底。`],
    theorems: [
      R`齐次方程组的解空间：$\dim\{\boldsymbol x\mid A\boldsymbol x=\boldsymbol0\}=n-\rank A$。`,
      R`维数公式：$\dim(W_1+W_2)=\dim W_1+\dim W_2-\dim(W_1\cap W_2)$。`,
    ],
    related: ['la.ind.k.independence', 'la.vs.k.span'],
  },
};

const basisCards = [
  {
    id: 'la.basis.coordinates',
    name: { zh: '基底的判定与坐标', ja: '基底の判定と座標', kana: 'きていのはんていとざひょう' },
    knowledge: ['la.basis.k.basis'],
    formula: R`\begin{gathered}\boldsymbol x=c_1\boldsymbol a_1+\cdots+c_n\boldsymbol a_n\\\iff\boldsymbol c=(\boldsymbol a_1\ \cdots\ \boldsymbol a_n)^{-1}\boldsymbol x\end{gathered}`,
    conditions: [R`$\det(\boldsymbol a_1\ \cdots\ \boldsymbol a_n)\neq0$ 时 $\boldsymbol a_i$ 是 $\R^n$ 的基底。`],
    scenarios: [R`判断给定向量组是否为基底，并求某向量的坐标。`],
    steps: [R`算行列式确认是基底。`, R`解方程组求坐标。`],
    pitfalls: [R`坐标与基底的顺序有关。`],
    exercises: [
      {
        id: 'la.basis.coordinates.ex1',
        difficulty: '易',
        question: {
          zh: R`证明 $\boldsymbol a_1=(1,1,0)$、$\boldsymbol a_2=(0,1,1)$、$\boldsymbol a_3=(1,0,1)$ 是 $\R^3$ 的基底，并求 $\boldsymbol x=(2,3,1)$ 关于它的坐标。`,
          ja: R`$\boldsymbol a_1=(1,1,0)$，$\boldsymbol a_2=(0,1,1)$，$\boldsymbol a_3=(1,0,1)$ が $\R^3$ の基底であることを示し，$\boldsymbol x=(2,3,1)$ の座標を求めよ。`,
          en: R`Show that $\boldsymbol a_1=(1,1,0)$, $\boldsymbol a_2=(0,1,1)$, $\boldsymbol a_3=(1,0,1)$ form a basis of $\R^3$ and find the coordinates of $\boldsymbol x=(2,3,1)$.`,
        },
        answer: R`(c_1,c_2,c_3)=(2,\ 1,\ 0)`,
        idea: R`行列式 $=2\neq0$。`,
        solution: [
          R`$\det=2\neq0$，所以线性无关，3 个向量构成 $\R^3$ 的基底。`,
          R`$c_1+c_3=2$，$c_1+c_2=3$，$c_2+c_3=1$；三式相加得 $c_1+c_2+c_3=3$，所以 $c_2=1$，$c_3=0$，$c_1=2$。`,
        ],
        pitfalls: [R`检查：$2(1,1,0)+(0,1,1)=(2,3,1)$。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,0,1],[1,1,0],[0,1,1]]).inv()*Matrix([2,3,1])', rhs: 'Matrix([2,1,0])' },
      },
    ],
  },
  {
    id: 'la.basis.span-dimension',
    name: { zh: '生成子空间的基底与维数', ja: '生成される部分空間の基底と次元', kana: 'せいせいされるぶぶんくうかんのきていとじげん' },
    knowledge: ['la.basis.k.basis'],
    formula: R`\dim\langle\boldsymbol a_1,\dots,\boldsymbol a_k\rangle=\rank(\boldsymbol a_1\ \cdots\ \boldsymbol a_k)`,
    conditions: [R`行变形不改变列向量之间的线性关系，所以可以从阶梯形读出哪些列是基底。`],
    scenarios: [R`给出若干生成元，求子空间的一组基底和维数。`],
    steps: [R`以向量为列排成矩阵，化为行简约阶梯形。`, R`主元列对应的原向量就是一组基底。`],
    pitfalls: [R`基底要取原来的向量。`],
    exercises: [
      {
        id: 'la.basis.span-dimension.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $W=\langle(1,0,1,1),\ (0,1,1,0),\ (1,1,2,1),\ (1,-1,0,1)\rangle$ 的一组基底和维数。`,
          ja: R`$W=\langle(1,0,1,1),\ (0,1,1,0),\ (1,1,2,1),\ (1,-1,0,1)\rangle$ の基底と次元を求めよ。`,
          en: R`Find a basis and the dimension of $W=\langle(1,0,1,1),\ (0,1,1,0),\ (1,1,2,1),\ (1,-1,0,1)\rangle$.`,
        },
        answerText: R`基底 $\{(1,0,1,1),\ (0,1,1,0)\}$，$\dim W=2$。`,
        idea: R`第 3 个 $=$ 第 1 个 $+$ 第 2 个，第 4 个 $=$ 第 1 个 $-$ 第 2 个。`,
        solution: [
          { math: R`\begin{pmatrix}1&0&1&1\\0&1&1&-1\\1&1&2&0\\1&0&1&1\end{pmatrix}\to\begin{pmatrix}1&0&1&1\\0&1&1&-1\\0&0&0&0\\0&0&0&0\end{pmatrix}` },
          R`主元在第 1、2 列，所以前两个向量构成基底。`,
        ],
        pitfalls: [R`第 3、4 列 $(1,1)$、$(1,-1)$ 给出线性关系。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,0,1,1],[0,1,1,-1],[1,1,2,0],[1,0,1,1]]).rank()', rhs: '2' },
      },
    ],
  },
  {
    id: 'la.basis.solution-space',
    name: { zh: '解空间的基底与维数', ja: '解空間の基底と次元', kana: 'かいくうかんのきていとじげん' },
    knowledge: ['la.basis.k.basis'],
    formula: R`\dim\{\boldsymbol x\mid A\boldsymbol x=\boldsymbol0\}=n-\rank A`,
    conditions: [R`$n$ 为未知数的个数。`],
    scenarios: [R`求齐次方程组的基本解（基本解系）。`],
    steps: [R`化为行简约阶梯形。`, R`每个自由变量依次取 1、其余取 0，得到一个解向量。`, R`这些解向量构成基底。`],
    pitfalls: [R`基本解的个数必须等于 $n-\rank A$。`],
    exercises: [
      {
        id: 'la.basis.solution-space.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $\begin{cases}x_1+x_2-x_3+x_4=0\\x_1+2x_2+x_3=0\end{cases}$ 的解空间的基底与维数。`,
          ja: R`$\begin{cases}x_1+x_2-x_3+x_4=0\\x_1+2x_2+x_3=0\end{cases}$ の解空間の基底と次元を求めよ。`,
          en: R`Find a basis and the dimension of the solution space of $\begin{cases}x_1+x_2-x_3+x_4=0\\x_1+2x_2+x_3=0\end{cases}$.`,
        },
        answerText: R`基底 $\{(3,-2,1,0),\ (-2,1,0,1)\}$，维数 2。`,
        idea: R`$\rank=2$，自由变量 $x_3,x_4$。`,
        solution: [
          { math: R`\begin{pmatrix}1&1&-1&1\\1&2&1&0\end{pmatrix}\to\begin{pmatrix}1&0&-3&2\\0&1&2&-1\end{pmatrix}` },
          R`$x_1=3x_3-2x_4$，$x_2=-2x_3+x_4$。分别取 $(x_3,x_4)=(1,0)$、$(0,1)$。`,
        ],
        pitfalls: [R`维数 $=4-2=2$。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,1,-1,1],[1,2,1,0]])*Matrix([[3,-2],[-2,1],[1,0],[0,1]])', rhs: 'zeros(2,2)' },
      },
    ],
  },
  {
    id: 'la.basis.dimension-formula',
    name: { zh: '维数公式（和与交）', ja: '次元公式（和空間と共通部分）', kana: 'じげんこうしき' },
    knowledge: ['la.basis.k.basis'],
    formula: R`\begin{aligned}&\dim(W_1+W_2)\\&\quad=\dim W_1+\dim W_2-\dim(W_1\cap W_2)\end{aligned}`,
    conditions: [R`$W_1+W_2=\langle W_1\ \text{的基底},\ W_2\ \text{的基底}\rangle$。`],
    scenarios: [R`已知两个子空间的生成元，求和与交的维数。`],
    steps: [R`把两组生成元合在一起求秩，得 $\dim(W_1+W_2)$。`, R`由维数公式求 $\dim(W_1\cap W_2)$。`, R`需要具体的交时，找同时属于两边的向量。`],
    pitfalls: [R`$\dim(W_1\cup W_2)$ 没有意义，并集一般不是子空间。`],
    exercises: [
      {
        id: 'la.basis.dimension-formula.ex1',
        difficulty: '中',
        question: {
          zh: R`$W_1=\langle(1,1,0),(0,1,1)\rangle$，$W_2=\langle(1,0,1),(1,2,1)\rangle$。求 $\dim(W_1+W_2)$、$\dim(W_1\cap W_2)$ 及 $W_1\cap W_2$。`,
          ja: R`$W_1=\langle(1,1,0),(0,1,1)\rangle$，$W_2=\langle(1,0,1),(1,2,1)\rangle$ について，$\dim(W_1+W_2)$，$\dim(W_1\cap W_2)$ と $W_1\cap W_2$ を求めよ。`,
          en: R`For $W_1=\langle(1,1,0),(0,1,1)\rangle$, $W_2=\langle(1,0,1),(1,2,1)\rangle$, find $\dim(W_1+W_2)$, $\dim(W_1\cap W_2)$ and $W_1\cap W_2$.`,
        },
        answerText: R`$\dim(W_1+W_2)=3$，$\dim(W_1\cap W_2)=1$，$W_1\cap W_2=\langle(1,2,1)\rangle$。`,
        idea: R`$(1,1,0)$、$(0,1,1)$、$(1,0,1)$ 已经线性无关。`,
        solution: [
          R`$\det\bigl((1,1,0),(0,1,1),(1,0,1)\bigr)=2\neq0$，所以 $W_1+W_2=\R^3$，维数 3。`,
          R`两个子空间都是 2 维，$\dim(W_1\cap W_2)=2+2-3=1$。`,
          R`$(1,2,1)=(1,1,0)+(0,1,1)\in W_1$，又 $(1,2,1)\in W_2$，所以 $W_1\cap W_2=\langle(1,2,1)\rangle$。`,
        ],
        pitfalls: [R`交的维数是 1，所以找到一个非零公共向量就够了。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'Matrix([[1,0,1,1],[1,1,0,2],[0,1,1,1]]).rank()', rhs: '3' },
            { type: 'equal', lhs: 'Matrix([1,1,0])+Matrix([0,1,1])', rhs: 'Matrix([1,2,1])' },
          ],
        },
      },
    ],
  },
  {
    id: 'la.basis.change',
    name: { zh: '基变换矩阵', ja: '基底の変換行列', kana: 'きていのへんかんぎょうれつ' },
    knowledge: ['la.basis.k.basis'],
    formula: [R`(\boldsymbol b_1\ \cdots\ \boldsymbol b_n)=(\boldsymbol a_1\ \cdots\ \boldsymbol a_n)P`, R`P=A^{-1}B`],
    conditions: [R`$A=(\boldsymbol a_1\cdots\boldsymbol a_n)$，$B=(\boldsymbol b_1\cdots\boldsymbol b_n)$。`],
    scenarios: [R`从旧基底到新基底的变换；坐标变换 $\boldsymbol c_{\text{旧}}=P\boldsymbol c_{\text{新}}$。`],
    steps: [R`把两组基底排成矩阵 $A$、$B$。`, R`计算 $P=A^{-1}B$（或解 $(A\mid B)\to(E\mid P)$）。`],
    pitfalls: [R`$P$ 的第 $j$ 列是 $\boldsymbol b_j$ 关于旧基底的坐标。`],
    exercises: [
      {
        id: 'la.basis.change.ex1',
        difficulty: '中',
        question: {
          zh: R`求从基底 $\boldsymbol a_1=(1,0)$、$\boldsymbol a_2=(1,1)$ 到基底 $\boldsymbol b_1=(2,1)$、$\boldsymbol b_2=(0,1)$ 的基变换矩阵 $P$。`,
          ja: R`基底 $\boldsymbol a_1=(1,0)$，$\boldsymbol a_2=(1,1)$ から基底 $\boldsymbol b_1=(2,1)$，$\boldsymbol b_2=(0,1)$ への変換行列 $P$ を求めよ。`,
          en: R`Find the change-of-basis matrix $P$ from $\boldsymbol a_1=(1,0)$, $\boldsymbol a_2=(1,1)$ to $\boldsymbol b_1=(2,1)$, $\boldsymbol b_2=(0,1)$.`,
        },
        answer: R`P=\begin{pmatrix}1&-1\\1&1\end{pmatrix}`,
        idea: R`$A^{-1}=\begin{pmatrix}1&-1\\0&1\end{pmatrix}$。`,
        solution: [{ math: R`P=\begin{pmatrix}1&-1\\0&1\end{pmatrix}\begin{pmatrix}2&0\\1&1\end{pmatrix}=\begin{pmatrix}1&-1\\1&1\end{pmatrix}` }],
        pitfalls: [R`检查：$\boldsymbol b_1=\boldsymbol a_1+\boldsymbol a_2$，$\boldsymbol b_2=-\boldsymbol a_1+\boldsymbol a_2$。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,1],[0,1]]).inv()*Matrix([[2,0],[1,1]])', rhs: 'Matrix([[1,-1],[1,1]])' },
      },
    ],
  },
];

export const basisChapter = {
  overview: '基底、维数与坐标：基底的判定与坐标、生成子空间与解空间的基底和维数、维数公式、基变换矩阵。',
  sections: [{ title: '基底与维数', knowledge: [KB.basis], formulas: basisCards }],
};

// ---------------- 第 11 章 线性映射 ----------------
const KLM = {
  map: {
    id: 'la.lmap.k.map',
    name: { zh: '线性映射与表现矩阵', ja: '線形写像と表現行列', kana: 'せんけいしゃぞうとひょうげんぎょうれつ' },
    paragraphs: [
      R`映射 $f:V\to W$ 若满足 $f(\boldsymbol x+\boldsymbol y)=f(\boldsymbol x)+f(\boldsymbol y)$、$f(c\boldsymbol x)=cf(\boldsymbol x)$，称为**线性映射**。$\R^n\to\R^m$ 的线性映射都可以写成 $f(\boldsymbol x)=A\boldsymbol x$。`,
      R`$A$ 的第 $j$ 列就是 $f(\boldsymbol e_j)$。取其他基底时，表现矩阵为 $P^{-1}AP$ 等形式。`,
    ],
    definitions: [R`A=\bigl(f(\boldsymbol e_1)\ \cdots\ f(\boldsymbol e_n)\bigr)`],
    conditions: [R`线性映射一定满足 $f(\boldsymbol0)=\boldsymbol0$。`],
    theorems: [R`合成映射 $g\circ f$ 的表现矩阵为 $BA$（先 $f$ 后 $g$，矩阵从右往左）。`],
    related: ['la.lmap.k.kernel'],
  },
  kernel: {
    id: 'la.lmap.k.kernel',
    name: { zh: '核与像、维数定理', ja: '核と像・次元定理', kana: 'かくとぞう・じげんていり' },
    paragraphs: [
      R`**核** $\Ker f=\{\boldsymbol x\mid f(\boldsymbol x)=\boldsymbol0\}$ 是 $V$ 的子空间；**像** $\Image f=\{f(\boldsymbol x)\}$ 是 $W$ 的子空间。`,
      R`$f(\boldsymbol x)=A\boldsymbol x$ 时，$\Ker f$ 是 $A\boldsymbol x=\boldsymbol0$ 的解空间，$\Image f$ 由 $A$ 的列向量生成。`,
    ],
    definitions: [R`\dim V=\dim\Ker f+\dim\Image f`],
    conditions: [R`$\dim\Image f=\rank A$。`],
    theorems: [R`$f$ 是单射 $\iff\Ker f=\{\boldsymbol0\}$。`],
    related: ['la.lmap.k.map', 'la.basis.k.basis'],
  },
};

const lmapCards = [
  {
    id: 'la.lmap.check',
    name: { zh: '线性映射的判定', ja: '線形写像の判定', kana: 'せんけいしゃぞうのはんてい' },
    knowledge: ['la.lmap.k.map'],
    formula: R`f(c\boldsymbol x+d\boldsymbol y)=cf(\boldsymbol x)+df(\boldsymbol y)`,
    conditions: [R`对任意向量 $\boldsymbol x,\boldsymbol y$ 和任意数 $c,d$ 都成立。`],
    scenarios: [R`判断给定的映射是否为线性映射。`],
    steps: [R`先看 $f(\boldsymbol0)=\boldsymbol0$ 是否成立。`, R`再验证上式；否定时给出反例。`],
    pitfalls: [R`含常数项、平方、乘积的映射都不是线性的。`],
    exercises: [
      {
        id: 'la.lmap.check.ex1',
        difficulty: '易',
        question: {
          zh: R`判断 $f(x,y)=(x+y,\ 2x)$ 与 $g(x,y)=(x+1,\ y)$ 是否为线性映射。`,
          ja: R`$f(x,y)=(x+y,\ 2x)$，$g(x,y)=(x+1,\ y)$ は線形写像か。`,
          en: R`Are $f(x,y)=(x+y,\ 2x)$ and $g(x,y)=(x+1,\ y)$ linear maps?`,
        },
        answerText: R`$f$ 是线性映射（$f(\boldsymbol x)=\begin{pmatrix}1&1\\2&0\end{pmatrix}\boldsymbol x$）；$g$ 不是（$g(0,0)=(1,0)\neq\boldsymbol0$）。`,
        idea: R`能写成矩阵乘法的就是线性映射。`,
        solution: [
          { math: R`f\begin{pmatrix}x\\y\end{pmatrix}=\begin{pmatrix}1&1\\2&0\end{pmatrix}\begin{pmatrix}x\\y\end{pmatrix}` },
          R`$g(0,0)=(1,0)$，不满足 $g(\boldsymbol0)=\boldsymbol0$。`,
        ],
        pitfalls: [R`$g$ 是平移，不是线性映射。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,1],[2,0]])*Matrix([x,y])', rhs: 'Matrix([x+y,2*x])' },
      },
    ],
  },
  {
    id: 'la.lmap.matrix',
    name: { zh: '标准基下的表现矩阵', ja: '標準基底に関する表現行列', kana: 'ひょうじゅんきていにかんするひょうげんぎょうれつ' },
    knowledge: ['la.lmap.k.map'],
    formula: R`A=\bigl(f(\boldsymbol e_1)\ \cdots\ f(\boldsymbol e_n)\bigr)`,
    conditions: [R`$f:\R^n\to\R^m$ 为线性映射，$\boldsymbol e_j$ 为标准基底。`],
    scenarios: [R`由映射的式子写出矩阵。`],
    steps: [R`把每个分量的系数按行写出。`, R`或者依次代入 $\boldsymbol e_j$，结果作为第 $j$ 列。`],
    pitfalls: [R`$\R^3\to\R^2$ 的表现矩阵是 $2\times3$ 型。`],
    exercises: [
      {
        id: 'la.lmap.matrix.ex1',
        difficulty: '易',
        question: {
          zh: R`求线性映射 $f(x,y,z)=(x+2y,\ y-z)$ 的表现矩阵。`,
          ja: R`線形写像 $f(x,y,z)=(x+2y,\ y-z)$ の表現行列を求めよ。`,
          en: R`Find the matrix of the linear map $f(x,y,z)=(x+2y,\ y-z)$.`,
        },
        answer: R`A=\begin{pmatrix}1&2&0\\0&1&-1\end{pmatrix}`,
        idea: R`第 1 行是 $x+2y+0z$ 的系数。`,
        solution: [R`$f(\boldsymbol e_1)=(1,0)$，$f(\boldsymbol e_2)=(2,1)$，$f(\boldsymbol e_3)=(0,-1)$，依次作为列。`],
        pitfalls: [R`没有出现的变量系数为 0。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,2,0],[0,1,-1]])*Matrix([x,y,z])', rhs: 'Matrix([x+2*y,y-z])' },
      },
    ],
  },
  {
    id: 'la.lmap.other-basis',
    name: { zh: '关于其他基底的表现矩阵', ja: '別の基底に関する表現行列', kana: 'べつのきていにかんするひょうげんぎょうれつ' },
    knowledge: ['la.lmap.k.map'],
    formula: R`B=P^{-1}AP\qquad\bigl(P=(\boldsymbol p_1\ \cdots\ \boldsymbol p_n)\bigr)`,
    conditions: [R`$f:\R^n\to\R^n$，在标准基下的矩阵为 $A$，新基底为 $\boldsymbol p_1,\dots,\boldsymbol p_n$。`],
    scenarios: [R`换一组基底后重新写出 $f$ 的矩阵；对角化的本质。`],
    steps: [R`把新基底排成 $P$。`, R`计算 $P^{-1}AP$。`],
    pitfalls: [R`也可以直接求 $f(\boldsymbol p_j)$ 关于 $\boldsymbol p_i$ 的坐标作为第 $j$ 列。`],
    exercises: [
      {
        id: 'la.lmap.other-basis.ex1',
        difficulty: '中',
        question: {
          zh: R`$f(\boldsymbol x)=\begin{pmatrix}1&2\\0&3\end{pmatrix}\boldsymbol x$。求 $f$ 关于基底 $\boldsymbol p_1=(1,0)$、$\boldsymbol p_2=(1,1)$ 的表现矩阵。`,
          ja: R`$f(\boldsymbol x)=\begin{pmatrix}1&2\\0&3\end{pmatrix}\boldsymbol x$ の，基底 $\boldsymbol p_1=(1,0)$，$\boldsymbol p_2=(1,1)$ に関する表現行列を求めよ。`,
          en: R`For $f(\boldsymbol x)=\begin{pmatrix}1&2\\0&3\end{pmatrix}\boldsymbol x$, find its matrix with respect to $\boldsymbol p_1=(1,0)$, $\boldsymbol p_2=(1,1)$.`,
        },
        answer: R`\begin{pmatrix}1&0\\0&3\end{pmatrix}`,
        idea: R`$f(\boldsymbol p_1)=\boldsymbol p_1$，$f(\boldsymbol p_2)=(3,3)=3\boldsymbol p_2$。`,
        solution: [
          { math: R`P^{-1}AP=\begin{pmatrix}1&-1\\0&1\end{pmatrix}\begin{pmatrix}1&3\\0&3\end{pmatrix}=\begin{pmatrix}1&0\\0&3\end{pmatrix}` },
        ],
        pitfalls: [R`$\boldsymbol p_1,\boldsymbol p_2$ 恰好是特征向量，所以结果是对角矩阵。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,1],[0,1]]).inv()*Matrix([[1,2],[0,3]])*Matrix([[1,1],[0,1]])', rhs: 'diag(1,3)' },
      },
    ],
  },
  {
    id: 'la.lmap.kernel-image',
    name: { zh: '核与像的基底', ja: '核と像の基底', kana: 'かくとぞうのきてい' },
    knowledge: ['la.lmap.k.kernel'],
    formula: [R`\Ker f=\{\boldsymbol x\mid A\boldsymbol x=\boldsymbol0\}`, R`\Image f=\langle A\ \text{的列向量}\rangle`],
    conditions: [R`$f(\boldsymbol x)=A\boldsymbol x$。`],
    scenarios: [R`求 $\Ker f$、$\Image f$ 的基底与维数。`],
    steps: [R`把 $A$ 化为行简约阶梯形。`, R`核：解齐次方程组。`, R`像：主元列对应的 $A$ 的原列向量。`],
    pitfalls: [R`像的基底取 $A$ 的原列，不是阶梯形的列。`],
    exercises: [
      {
        id: 'la.lmap.kernel-image.ex1',
        difficulty: '中',
        question: {
          zh: R`$f(\boldsymbol x)=A\boldsymbol x$，$A=\begin{pmatrix}1&2&1\\2&4&3\\1&2&2\end{pmatrix}$。求 $\Ker f$ 与 $\Image f$ 的基底。`,
          ja: R`$A=\begin{pmatrix}1&2&1\\2&4&3\\1&2&2\end{pmatrix}$，$f(\boldsymbol x)=A\boldsymbol x$ について，$\Ker f$ と $\Image f$ の基底を求めよ。`,
          en: R`For $f(\boldsymbol x)=A\boldsymbol x$ with $A=\begin{pmatrix}1&2&1\\2&4&3\\1&2&2\end{pmatrix}$, find bases of $\Ker f$ and $\Image f$.`,
        },
        answerText: R`$\Ker f=\langle(-2,1,0)\rangle$；$\Image f=\langle(1,2,1),\ (1,3,2)\rangle$。`,
        idea: R`行简约阶梯形为 $\begin{pmatrix}1&2&0\\0&0&1\\0&0&0\end{pmatrix}$。`,
        solution: [
          R`核：$x_1=-2x_2$，$x_3=0$，令 $x_2=t$ 得 $t(-2,1,0)$。`,
          R`像：主元在第 1、3 列，取 $A$ 的第 1、3 列。`,
        ],
        pitfalls: [R`检查维数定理：$1+2=3$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'Matrix([[1,2,1],[2,4,3],[1,2,2]])*Matrix([-2,1,0])', rhs: 'Matrix([0,0,0])' },
            { type: 'equal', lhs: 'Matrix([[1,2,1],[2,4,3],[1,2,2]]).rank()', rhs: '2' },
          ],
        },
      },
    ],
  },
  {
    id: 'la.lmap.dimension-theorem',
    name: { zh: '维数定理', ja: '次元定理', kana: 'じげんていり' },
    knowledge: ['la.lmap.k.kernel'],
    formula: R`\dim V=\dim\Ker f+\dim\Image f`,
    conditions: [R`$f:V\to W$ 为线性映射，$V$ 有限维。`],
    scenarios: [R`只问维数时，不必求出基底。`],
    steps: [R`求 $\rank A=\dim\Image f$。`, R`$\dim\Ker f=n-\rank A$。`],
    pitfalls: [R`公式中的 $\dim V$ 是定义域的维数（$A$ 的列数）。`],
    exercises: [
      {
        id: 'la.lmap.dimension-theorem.ex1',
        difficulty: '易',
        question: {
          zh: R`$f:\R^4\to\R^3$，$f(\boldsymbol x)=A\boldsymbol x$，$A=\begin{pmatrix}1&1&-1&1\\1&2&1&0\\2&3&0&1\end{pmatrix}$。求 $\dim\Image f$ 与 $\dim\Ker f$。`,
          ja: R`$A=\begin{pmatrix}1&1&-1&1\\1&2&1&0\\2&3&0&1\end{pmatrix}$ で定まる $f:\R^4\to\R^3$ について，$\dim\Image f$，$\dim\Ker f$ を求めよ。`,
          en: R`For $f:\R^4\to\R^3$ given by $A=\begin{pmatrix}1&1&-1&1\\1&2&1&0\\2&3&0&1\end{pmatrix}$, find $\dim\Image f$ and $\dim\Ker f$.`,
        },
        answer: R`\dim\Image f=2,\qquad\dim\Ker f=2`,
        idea: R`第 3 行 $=$ 第 1 行 $+$ 第 2 行。`,
        solution: [R`$\rank A=2$，所以 $\dim\Image f=2$，$\dim\Ker f=4-2=2$。`],
        pitfalls: [R`定义域是 $\R^4$，用 4 去减。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,1,-1,1],[1,2,1,0],[2,3,0,1]]).rank()', rhs: '2' },
      },
    ],
  },
  {
    id: 'la.lmap.composition',
    name: { zh: '合成映射的表现矩阵', ja: '合成写像の表現行列', kana: 'ごうせいしゃぞうのひょうげんぎょうれつ' },
    knowledge: ['la.lmap.k.map'],
    formula: R`(g\circ f)(\boldsymbol x)=B(A\boldsymbol x)=(BA)\boldsymbol x`,
    conditions: [R`$f$ 的矩阵为 $A$，$g$ 的矩阵为 $B$。`],
    scenarios: [R`连续做两个变换（旋转、投影等）。`],
    steps: [R`分别写出 $A$、$B$。`, R`按「后做的在左」相乘。`],
    pitfalls: [R`$g\circ f$ 对应 $BA$，不是 $AB$。`],
    exercises: [
      {
        id: 'la.lmap.composition.ex1',
        difficulty: '易',
        question: {
          zh: R`$f(x,y)=(x+y,\ y)$，$g(x,y)=(2x,\ x-y)$。求 $g\circ f$ 的表现矩阵。`,
          ja: R`$f(x,y)=(x+y,\ y)$，$g(x,y)=(2x,\ x-y)$ のとき，$g\circ f$ の表現行列を求めよ。`,
          en: R`For $f(x,y)=(x+y,\ y)$ and $g(x,y)=(2x,\ x-y)$, find the matrix of $g\circ f$.`,
        },
        answer: R`\begin{pmatrix}2&2\\1&0\end{pmatrix}`,
        idea: R`$A=\begin{pmatrix}1&1\\0&1\end{pmatrix}$，$B=\begin{pmatrix}2&0\\1&-1\end{pmatrix}$。`,
        solution: [
          { math: R`BA=\begin{pmatrix}2&0\\1&-1\end{pmatrix}\begin{pmatrix}1&1\\0&1\end{pmatrix}=\begin{pmatrix}2&2\\1&0\end{pmatrix}` },
          R`直接代入检查：$g(f(x,y))=g(x+y,y)=(2x+2y,\ x)$。`,
        ],
        pitfalls: [R`$AB=\begin{pmatrix}3&-1\\1&-1\end{pmatrix}$ 是 $f\circ g$ 的矩阵。`],
        verify: { type: 'equal', lhs: 'Matrix([[2,0],[1,-1]])*Matrix([[1,1],[0,1]])', rhs: 'Matrix([[2,2],[1,0]])' },
      },
    ],
  },
];

export const linearMapsChapter = {
  overview: '线性映射：判定、表现矩阵（标准基与其他基底）、核与像、维数定理、合成映射。',
  sections: [
    { title: '线性映射与表现矩阵', knowledge: [KLM.map], formulas: [lmapCards[0], lmapCards[1], lmapCards[2], lmapCards[5]] },
    { title: '核与像', knowledge: [KLM.kernel], formulas: [lmapCards[3], lmapCards[4]] },
  ],
};

// ---------------- 第 12 章 特征值与特征向量 ----------------
const KEI = {
  eigen: {
    id: 'la.eig.k.eigen',
    name: { zh: '特征值与特征向量', ja: '固有値と固有ベクトル', kana: 'こゆうちとこゆうベクトル' },
    paragraphs: [
      R`若 $A\boldsymbol x=\lambda\boldsymbol x$（$\boldsymbol x\neq\boldsymbol0$），称 $\lambda$ 为 $A$ 的**特征值**（固有値），$\boldsymbol x$ 为对应的**特征向量**。`,
      R`$\lambda$ 是特征值 $\iff\det(A-\lambda E)=0$。$\det(\lambda E-A)$ 称为**特征多项式**（固有多項式）。属于 $\lambda$ 的特征向量与 $\boldsymbol0$ 一起构成**特征空间** $W(\lambda)$。`,
    ],
    definitions: [R`A\boldsymbol x=\lambda\boldsymbol x\iff(A-\lambda E)\boldsymbol x=\boldsymbol0`],
    conditions: [R`特征向量必须非零；特征空间 $W(\lambda)$ 的维数 $=n-\rank(A-\lambda E)$。`],
    theorems: [
      R`特征值之和 $=\operatorname{tr}A$，特征值之积 $=\det A$。`,
      R`三角矩阵的特征值就是它的对角成分。`,
      R`不同特征值对应的特征向量线性无关。`,
    ],
    related: ['la.sys.k.system', 'la.det.k.definition'],
  },
};

const eigCards = [
  {
    id: 'la.eig.2x2',
    name: { zh: '二阶矩阵的特征值与特征向量', ja: '2 次正方行列の固有値・固有ベクトル', kana: 'にじせいほうぎょうれつのこゆうち・こゆうベクトル' },
    knowledge: ['la.eig.k.eigen'],
    formula: R`\lambda^2-(\operatorname{tr}A)\lambda+\det A=0`,
    conditions: [R`$A$ 为二阶方阵。`],
    scenarios: [R`求二阶矩阵的特征值、特征向量。`],
    steps: [R`写出特征方程并求根。`, R`对每个 $\lambda$ 解 $(A-\lambda E)\boldsymbol x=\boldsymbol0$。`, R`答案写成 $c\boldsymbol v\ (c\neq0)$。`],
    pitfalls: [R`$A-\lambda E$ 的两行一定成比例，只看一行即可。`],
    exercises: [
      {
        id: 'la.eig.2x2.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$ 的特征值与特征向量。`,
          ja: R`$A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$ の固有値と固有ベクトルを求めよ。`,
          en: R`Find the eigenvalues and eigenvectors of $A=\begin{pmatrix}4&1\\2&3\end{pmatrix}$.`,
        },
        answerText: R`$\lambda=2$：$c\begin{pmatrix}1\\-2\end{pmatrix}$；$\lambda=5$：$c\begin{pmatrix}1\\1\end{pmatrix}$（$c\neq0$）。`,
        idea: R`$\operatorname{tr}A=7$，$\det A=10$。`,
        solution: [
          { math: R`\lambda^2-7\lambda+10=(\lambda-2)(\lambda-5)=0` },
          R`$\lambda=2$：$A-2E=\begin{pmatrix}2&1\\2&1\end{pmatrix}$，$2x+y=0$。`,
          R`$\lambda=5$：$A-5E=\begin{pmatrix}-1&1\\2&-2\end{pmatrix}$，$x=y$。`,
        ],
        pitfalls: [R`检查：$2+5=7=\operatorname{tr}A$，$2\cdot5=10=\det A$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'eigen', matrix: 'Matrix([[4,1],[2,3]])', values: ['2', '5'] },
            { type: 'equal', lhs: 'Matrix([[4,1],[2,3]])*Matrix([1,-2])', rhs: '2*Matrix([1,-2])' },
            { type: 'equal', lhs: 'Matrix([[4,1],[2,3]])*Matrix([1,1])', rhs: '5*Matrix([1,1])' },
          ],
        },
      },
    ],
  },
  {
    id: 'la.eig.3x3',
    name: { zh: '三阶矩阵的特征值与特征空间', ja: '3 次正方行列の固有値・固有空間', kana: 'さんじせいほうぎょうれつのこゆうち・こゆうくうかん' },
    knowledge: ['la.eig.k.eigen'],
    formula: R`\begin{gathered}\det(A-\lambda E)=0\\W(\lambda)=\{\boldsymbol x\mid(A-\lambda E)\boldsymbol x=\boldsymbol0\}\end{gathered}`,
    conditions: [R`$\dim W(\lambda)\le$ 特征值 $\lambda$ 的重数。`],
    scenarios: [R`三阶矩阵；为对角化做准备。`],
    steps: [R`展开 $\det(A-\lambda E)$ 时尽量选 0 多的行列，直接得到因式分解的形式。`, R`对每个特征值求特征空间的基底。`],
    pitfalls: [R`把三次多项式完全展开再因式分解很容易出错。`],
    exercises: [
      {
        id: 'la.eig.3x3.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $A=\begin{pmatrix}2&0&0\\1&2&1\\1&0&3\end{pmatrix}$ 的特征值与各特征空间的基底。`,
          ja: R`$A=\begin{pmatrix}2&0&0\\1&2&1\\1&0&3\end{pmatrix}$ の固有値と各固有空間の基底を求めよ。`,
          en: R`Find the eigenvalues of $A=\begin{pmatrix}2&0&0\\1&2&1\\1&0&3\end{pmatrix}$ and a basis of each eigenspace.`,
        },
        answerText: R`$\lambda=2$（二重）：$W(2)=\langle(0,1,0),\ (-1,0,1)\rangle$；$\lambda=3$：$W(3)=\langle(0,1,1)\rangle$。`,
        idea: R`按第 1 行展开。`,
        solution: [
          { math: R`\begin{aligned}\det(A-\lambda E)&=(2-\lambda)\begin{vmatrix}2-\lambda&1\\0&3-\lambda\end{vmatrix}\\&=(2-\lambda)^2(3-\lambda)\end{aligned}` },
          R`$\lambda=2$：$A-2E$ 的非零行都是 $(1,0,1)$，即 $x+z=0$，$y$ 任意，得两个基底向量。`,
          R`$\lambda=3$：$A-3E=\begin{pmatrix}-1&0&0\\1&-1&1\\1&0&0\end{pmatrix}$，$x=0$，$y=z$。`,
        ],
        pitfalls: [R`$\dim W(2)=3-\rank(A-2E)=3-1=2$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'eigen', matrix: 'Matrix([[2,0,0],[1,2,1],[1,0,3]])', values: ['2', '2', '3'] },
            { type: 'equal', lhs: '(Matrix([[2,0,0],[1,2,1],[1,0,3]])-2*eye(3))*Matrix([[0,-1],[1,0],[0,1]])', rhs: 'zeros(3,2)' },
            { type: 'equal', lhs: 'Matrix([[2,0,0],[1,2,1],[1,0,3]])*Matrix([0,1,1])', rhs: '3*Matrix([0,1,1])' },
          ],
        },
      },
    ],
  },
  {
    id: 'la.eig.triangular',
    name: { zh: '三角矩阵的特征值', ja: '三角行列の固有値', kana: 'さんかくぎょうれつのこゆうち' },
    knowledge: ['la.eig.k.eigen'],
    formula: R`\begin{aligned}&\det(A-\lambda E)\\&\quad=(a_{11}-\lambda)(a_{22}-\lambda)\cdots(a_{nn}-\lambda)\end{aligned}`,
    conditions: [R`$A$ 为上三角或下三角矩阵。`],
    scenarios: [R`一眼读出特征值。`],
    steps: [R`特征值 $=$ 对角成分。`],
    pitfalls: [R`特征向量仍然要解方程求。`],
    exercises: [
      {
        id: 'la.eig.triangular.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $A=\begin{pmatrix}1&4&5\\0&2&6\\0&0&3\end{pmatrix}$ 的特征值，以及 $\lambda=2$ 的特征向量。`,
          ja: R`$A=\begin{pmatrix}1&4&5\\0&2&6\\0&0&3\end{pmatrix}$ の固有値と，$\lambda=2$ に対する固有ベクトルを求めよ。`,
          en: R`Find the eigenvalues of $A=\begin{pmatrix}1&4&5\\0&2&6\\0&0&3\end{pmatrix}$ and an eigenvector for $\lambda=2$.`,
        },
        answerText: R`特征值 $1,2,3$；$\lambda=2$ 的特征向量 $c(4,1,0)\ (c\neq0)$。`,
        idea: R`上三角矩阵。`,
        solution: [
          R`特征值是对角成分 $1,2,3$。`,
          R`$\lambda=2$：$A-2E=\begin{pmatrix}-1&4&5\\0&0&6\\0&0&1\end{pmatrix}$，$z=0$，$x=4y$。`,
        ],
        pitfalls: [R`检查：$A(4,1,0)^T=(8,2,0)^T$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'eigen', matrix: 'Matrix([[1,4,5],[0,2,6],[0,0,3]])', values: ['1', '2', '3'] },
            { type: 'equal', lhs: 'Matrix([[1,4,5],[0,2,6],[0,0,3]])*Matrix([4,1,0])', rhs: '2*Matrix([4,1,0])' },
          ],
        },
      },
    ],
  },
  {
    id: 'la.eig.properties',
    name: { zh: '特征值的性质', ja: '固有値の性質', kana: 'こゆうちのせいしつ' },
    knowledge: ['la.eig.k.eigen'],
    formula: [R`\lambda_1+\cdots+\lambda_n=\operatorname{tr}A,\qquad\lambda_1\cdots\lambda_n=\det A`, R`A\boldsymbol x=\lambda\boldsymbol x\ \Longrightarrow\ p(A)\boldsymbol x=p(\lambda)\boldsymbol x`],
    conditions: [R`特征值按重数计算。$A^{-1}$ 的特征值为 $\dfrac1\lambda$（$A$ 正则时）。`],
    scenarios: [R`已知特征值，求 $\det$、$\operatorname{tr}$ 以及 $A^2$、$A^{-1}$、$A+cE$ 等的特征值。`],
    steps: [R`把要求的矩阵写成 $A$ 的多项式 $p(A)$。`, R`特征值变成 $p(\lambda_i)$。`, R`行列式 $=$ 特征值之积。`],
    pitfalls: [R`$p(A)$ 的行列式要用新的特征值相乘。`],
    exercises: [
      {
        id: 'la.eig.properties.ex1',
        difficulty: '中',
        question: {
          zh: R`三阶方阵 $A$ 的特征值为 $1,2,3$。求 $\det A$、$\operatorname{tr}A$、$A^2-2A$ 的特征值及 $\det(A^2-2A)$。`,
          ja: R`3 次正方行列 $A$ の固有値が $1,2,3$ のとき，$\det A$，$\operatorname{tr}A$，$A^2-2A$ の固有値と $\det(A^2-2A)$ を求めよ。`,
          en: R`A $3\times3$ matrix $A$ has eigenvalues $1,2,3$. Find $\det A$, $\operatorname{tr}A$, the eigenvalues of $A^2-2A$, and $\det(A^2-2A)$.`,
        },
        answerText: R`$\det A=6$，$\operatorname{tr}A=6$；$A^2-2A$ 的特征值为 $-1,0,3$，$\det(A^2-2A)=0$。`,
        idea: R`$p(\lambda)=\lambda^2-2\lambda$。`,
        solution: [R`$p(1)=-1$，$p(2)=0$，$p(3)=3$。有特征值 0，所以行列式为 0。`],
        pitfalls: [R`$\det(A^2-2A)=(-1)\cdot0\cdot3=0$。`],
        verify: { type: 'equal', lhs: '(diag(1,2,3)**2-2*diag(1,2,3)).det()', rhs: '0' },
      },
    ],
  },
  {
    id: 'la.eig.parameter',
    name: { zh: '由特征值确定参数', ja: '固有値からパラメータを決める', kana: 'こゆうちからパラメータをきめる' },
    knowledge: ['la.eig.k.eigen'],
    formula: R`\lambda_0\ \text{是特征值}\iff\det(A-\lambda_0E)=0`,
    conditions: [R`其余特征值可用「和 $=\operatorname{tr}A$、积 $=\det A$」求出。`],
    scenarios: [R`「已知 $\lambda_0$ 是 $A$ 的特征值，求参数及其余特征值」。`],
    steps: [R`代入 $\det(A-\lambda_0E)=0$ 解出参数。`, R`用迹或行列式求其余特征值。`],
    pitfalls: [R`求出参数后最好回代检查。`],
    exercises: [
      {
        id: 'la.eig.parameter.ex1',
        difficulty: '易',
        question: {
          zh: R`$A=\begin{pmatrix}1&a\\2&3\end{pmatrix}$ 有特征值 $5$。求 $a$ 和另一个特征值。`,
          ja: R`$A=\begin{pmatrix}1&a\\2&3\end{pmatrix}$ が固有値 $5$ をもつとき，$a$ と他の固有値を求めよ。`,
          en: R`$A=\begin{pmatrix}1&a\\2&3\end{pmatrix}$ has eigenvalue $5$. Find $a$ and the other eigenvalue.`,
        },
        answer: R`a=4,\qquad\text{另一个特征值}\ -1`,
        idea: R`$\det(A-5E)=0$。`,
        solution: [
          { math: R`\begin{vmatrix}-4&a\\2&-2\end{vmatrix}=8-2a=0\ \Longrightarrow\ a=4` },
          R`$\operatorname{tr}A=4$，所以另一个特征值为 $4-5=-1$。`,
        ],
        pitfalls: [R`也可以用 $\det A=3-2a=-5=5\cdot(-1)$ 检查。`],
        verify: { type: 'eigen', matrix: 'Matrix([[1,4],[2,3]])', values: ['5', '-1'] },
      },
    ],
  },
];

export const eigenChapter = {
  overview: '特征值与特征向量：二阶、三阶矩阵的计算，特征空间，三角矩阵，特征值的性质（迹、行列式、矩阵多项式），由特征值求参数。',
  sections: [{ title: '特征值与特征向量', knowledge: [KEI.eigen], formulas: eigCards }],
};
