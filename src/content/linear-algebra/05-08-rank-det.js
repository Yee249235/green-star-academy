// 线性代数 第 5～8 章：基本变形与秩、逆矩阵、行列式、线性无关与线性相关
const R = String.raw;

// ---------------- 第 5 章 矩阵的基本变形 ----------------
const KE = {
  ops: {
    id: 'la.elem.k.ops',
    name: { zh: '基本变形与阶梯形', ja: '基本変形と階段行列', kana: 'きほんへんけいとかいだんぎょうれつ' },
    paragraphs: [
      R`**行基本变形**有三种：① 交换两行；② 某行乘非零常数；③ 某行加上另一行的常数倍。列基本变形同理。`,
      R`每一行第一个非零成分（主元）的位置逐行向右移的矩阵叫**阶梯形**（階段行列）。主元为 1、主元所在列其他成分全为 0 的阶梯形叫**行简约阶梯形**，它由 $A$ 唯一确定。`,
    ],
    definitions: [],
    conditions: [R`行基本变形 = 左乘基本矩阵；列基本变形 = 右乘基本矩阵。`],
    theorems: [R`基本矩阵都是正则矩阵，它的逆仍是同类基本矩阵。`],
    related: ['la.elem.k.rank'],
  },
  rank: {
    id: 'la.elem.k.rank',
    name: { zh: '矩阵的秩', ja: '行列の階数（ランク）', kana: 'ぎょうれつのかいすう（ランク）' },
    paragraphs: [
      R`把 $A$ 化成阶梯形后**非零行的个数**称为 $A$ 的**秩**，记作 $\rank A$。基本变形不改变秩。`,
      R`秩也等于线性无关的行（列）向量的最大个数，以及不为 0 的子式的最大阶数。`,
    ],
    definitions: [R`\rank A=\text{阶梯形中非零行的个数}`],
    conditions: [R`$A$ 为 $m\times n$ 矩阵时 $\rank A\le\min(m,n)$。`],
    theorems: [R`$n$ 次方阵 $A$：$\rank A=n\iff A$ 正则 $\iff\det A\neq0$。`, R`$\rank A^T=\rank A$。`],
    related: ['la.elem.k.ops', 'la.sys.k.system'],
  },
};

const elemCards = [
  {
    id: 'la.elem.rref',
    name: { zh: '化为行简约阶梯形', ja: '簡約な階段行列への変形', kana: 'かんやくなかいだんぎょうれつへのへんけい' },
    knowledge: ['la.elem.k.ops'],
    formula: R`A\ \xrightarrow{\ \text{行基本变形}\ }\ \text{行简约阶梯形}`,
    conditions: [R`只用行变形。`],
    scenarios: [R`解方程组、求秩、求逆、找极大线性无关组。`],
    steps: [R`从第 1 列起找主元，必要时交换行。`, R`主元化为 1，把同列其他成分消成 0。`, R`对下一列重复。`],
    pitfalls: [R`一次只做一步，写出每一步用的变形，便于检查。`],
    exercises: [
      {
        id: 'la.elem.rref.ex1',
        difficulty: '易',
        question: {
          zh: R`把 $A=\begin{pmatrix}1&2&1\\2&4&3\\1&2&2\end{pmatrix}$ 化为行简约阶梯形。`,
          ja: R`$A=\begin{pmatrix}1&2&1\\2&4&3\\1&2&2\end{pmatrix}$ を簡約な階段行列に変形せよ。`,
          en: R`Reduce $A=\begin{pmatrix}1&2&1\\2&4&3\\1&2&2\end{pmatrix}$ to reduced row echelon form.`,
        },
        answer: R`\begin{pmatrix}1&2&0\\0&0&1\\0&0&0\end{pmatrix}`,
        idea: R`第 2 列没有主元。`,
        solution: [
          { math: R`\xrightarrow{\substack{R_2-2R_1\\R_3-R_1}}\begin{pmatrix}1&2&1\\0&0&1\\0&0&1\end{pmatrix}` },
          { math: R`\xrightarrow{\substack{R_3-R_2\\R_1-R_2}}\begin{pmatrix}1&2&0\\0&0&1\\0&0&0\end{pmatrix}` },
        ],
        pitfalls: [R`主元在第 1、3 列，所以 $\rank A=2$。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,2,1],[2,4,3],[1,2,2]]).rref()[0]', rhs: 'Matrix([[1,2,0],[0,0,1],[0,0,0]])' },
      },
    ],
  },
  {
    id: 'la.elem.rank',
    name: { zh: '求矩阵的秩', ja: '階数の計算', kana: 'かいすうのけいさん' },
    knowledge: ['la.elem.k.rank'],
    formula: R`\rank A=\text{阶梯形中非零行的个数}`,
    conditions: [R`行、列变形都可以用（都不改变秩）。`],
    scenarios: [R`判断方程组的解、向量组的线性相关性。`],
    steps: [R`化为阶梯形（不必化到简约形）。`, R`数非零行。`],
    pitfalls: [R`看到两行成比例可以直接消掉一行。`],
    exercises: [
      {
        id: 'la.elem.rank.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $A=\begin{pmatrix}1&2&3\\2&4&6\\1&0&1\end{pmatrix}$ 的秩。`,
          ja: R`$A=\begin{pmatrix}1&2&3\\2&4&6\\1&0&1\end{pmatrix}$ の階数を求めよ。`,
          en: R`Find the rank of $A=\begin{pmatrix}1&2&3\\2&4&6\\1&0&1\end{pmatrix}$.`,
        },
        answer: R`\rank A=2`,
        idea: R`第 2 行是第 1 行的 2 倍。`,
        solution: [
          { math: R`\to\begin{pmatrix}1&2&3\\0&0&0\\0&-2&-2\end{pmatrix}\to\begin{pmatrix}1&2&3\\0&-2&-2\\0&0&0\end{pmatrix}` },
          R`非零行有 2 行。`,
        ],
        pitfalls: [R`交换行把零行放到最下面。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,2,3],[2,4,6],[1,0,1]]).rank()', rhs: '2' },
      },
      {
        id: 'la.elem.rank.ex2',
        difficulty: '易',
        question: {
          zh: R`求 $A=\begin{pmatrix}1&1&1&1\\1&2&3&4\\2&3&4&5\\3&5&7&9\end{pmatrix}$ 的秩。`,
          ja: R`$A=\begin{pmatrix}1&1&1&1\\1&2&3&4\\2&3&4&5\\3&5&7&9\end{pmatrix}$ の階数を求めよ。`,
          en: R`Find the rank of $A=\begin{pmatrix}1&1&1&1\\1&2&3&4\\2&3&4&5\\3&5&7&9\end{pmatrix}$.`,
        },
        answer: R`\rank A=2`,
        idea: R`用第 1 行消去下面各行的第 1 列。`,
        solution: [
          { math: R`\to\begin{pmatrix}1&1&1&1\\0&1&2&3\\0&1&2&3\\0&2&4&6\end{pmatrix}\to\begin{pmatrix}1&1&1&1\\0&1&2&3\\0&0&0&0\\0&0&0&0\end{pmatrix}` },
        ],
        pitfalls: [R`$R_4-3R_1=(0,2,4,6)$，是第 2 行的 2 倍。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,1,1,1],[1,2,3,4],[2,3,4,5],[3,5,7,9]]).rank()', rhs: '2' },
      },
    ],
  },
  {
    id: 'la.elem.rank-param',
    name: { zh: '含参数矩阵的秩', ja: 'パラメータを含む行列の階数', kana: 'パラメータをふくむぎょうれつのかいすう' },
    knowledge: ['la.elem.k.rank'],
    formula: R`\det A\neq0\iff\rank A=n`,
    conditions: [R`方阵时先算行列式最快。`],
    scenarios: [R`「$a$ 取何值时 $\rank A=1,2,3$」。`],
    steps: [R`求 $\det A$ 并因式分解。`, R`$\det A\neq0$ 时秩为 $n$。`, R`对使 $\det A=0$ 的每个值，代入后再化阶梯形。`],
    pitfalls: [R`不要用含参数的式子去除，除非已确认它不为 0。`],
    exercises: [
      {
        id: 'la.elem.rank-param.ex1',
        difficulty: '中',
        question: {
          zh: R`按 $a$ 的值求 $A=\begin{pmatrix}1&1&a\\1&a&1\\a&1&1\end{pmatrix}$ 的秩。`,
          ja: R`$A=\begin{pmatrix}1&1&a\\1&a&1\\a&1&1\end{pmatrix}$ の階数を $a$ の値で分類せよ。`,
          en: R`Find the rank of $A=\begin{pmatrix}1&1&a\\1&a&1\\a&1&1\end{pmatrix}$ depending on $a$.`,
        },
        answer: R`\rank A=\begin{cases}3&(a\neq1,\ -2)\\1&(a=1)\\2&(a=-2)\end{cases}`,
        idea: R`$\det A=-(a-1)^2(a+2)$。`,
        solution: [
          R`按第 1 行展开并整理：$\det A=-(a-1)^2(a+2)$。`,
          R`$a=1$：三行都是 $(1,1,1)$，秩 1。`,
          R`$a=-2$ 时：`, { math: R`\begin{pmatrix}1&1&-2\\1&-2&1\\-2&1&1\end{pmatrix}\to\begin{pmatrix}1&1&-2\\0&-3&3\\0&0&0\end{pmatrix}` },
          R`所以 $a=-2$ 时秩 2。`,
        ],
        pitfalls: [R`$a=-2$ 时第 3 行 $=-(R_1+R_2)$。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: 'Matrix([[1,1,a],[1,a,1],[a,1,1]]).det()', rhs: '-(a-1)**2*(a+2)' },
            { type: 'equal', lhs: 'Matrix([[1,1,-2],[1,-2,1],[-2,1,1]]).rank()', rhs: '2' },
          ],
        },
      },
    ],
  },
  {
    id: 'la.elem.elementary-matrix',
    name: { zh: '基本矩阵', ja: '基本行列', kana: 'きほんぎょうれつ' },
    knowledge: ['la.elem.k.ops'],
    formula: [R`PA=\bigl(A\ \text{做相应行变形}\bigr)`, R`AP=\bigl(A\ \text{做相应列变形}\bigr)`],
    conditions: [R`$P$ 为对单位矩阵 $E$ 做一次基本变形得到的矩阵。`],
    scenarios: [R`用矩阵乘法表示变形；证明「正则矩阵是基本矩阵之积」。`],
    steps: [R`对 $E$ 做同样的变形得到 $P$。`, R`左乘对应行变形，右乘对应列变形。`],
    pitfalls: [R`「第 $i$ 行加第 $j$ 行的 $c$ 倍」的基本矩阵：$(i,j)$ 成分为 $c$。`],
    exercises: [
      {
        id: 'la.elem.elementary-matrix.ex1',
        difficulty: '易',
        question: {
          zh: R`$P=\begin{pmatrix}1&0\\-3&1\end{pmatrix}$，$A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$。求 $PA$，并说明它对应哪种行变形。`,
          ja: R`$P=\begin{pmatrix}1&0\\-3&1\end{pmatrix}$，$A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$ のとき，$PA$ を求め，どの行基本変形に対応するか答えよ。`,
          en: R`For $P=\begin{pmatrix}1&0\\-3&1\end{pmatrix}$, $A=\begin{pmatrix}1&2\\3&4\end{pmatrix}$, compute $PA$ and state which row operation it represents.`,
        },
        answerText: R`$PA=\begin{pmatrix}1&2\\0&-2\end{pmatrix}$，对应「第 2 行减去第 1 行的 3 倍」。`,
        idea: R`$P$ 是对 $E$ 做 $R_2-3R_1$ 得到的。`,
        solution: [{ math: R`PA=\begin{pmatrix}1&2\\-3+3&-6+4\end{pmatrix}=\begin{pmatrix}1&2\\0&-2\end{pmatrix}` }],
        pitfalls: [R`$AP$ 则是「第 1 列减去第 2 列的 3 倍」。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,0],[-3,1]])*Matrix([[1,2],[3,4]])', rhs: 'Matrix([[1,2],[0,-2]])' },
      },
    ],
  },
];

export const elementaryChapter = {
  overview: '行基本变形、阶梯形与行简约阶梯形、矩阵的秩（含参数的情况）以及基本矩阵。',
  sections: [{ title: '基本变形与秩', knowledge: [KE.ops, KE.rank], formulas: elemCards }],
};

// ---------------- 第 6 章 逆矩阵 ----------------
const KI = {
  inverse: {
    id: 'la.inv.k.inverse',
    name: { zh: '逆矩阵与正则矩阵', ja: '逆行列と正則行列', kana: 'ぎゃくぎょうれつとせいそくぎょうれつ' },
    paragraphs: [
      R`方阵 $A$ 若存在 $X$ 使 $AX=XA=E$，则称 $A$ **正则**（可逆），$X$ 称为**逆矩阵**，记作 $A^{-1}$，且唯一。`,
      R`对方阵，只要 $AX=E$ 就自动有 $XA=E$。`,
    ],
    definitions: [R`AA^{-1}=A^{-1}A=E`],
    conditions: [R`$A$ 正则 $\iff\det A\neq0\iff\rank A=n$。`],
    theorems: [R`$(AB)^{-1}=B^{-1}A^{-1}$，$(A^T)^{-1}=(A^{-1})^T$，$(kA)^{-1}=\dfrac1kA^{-1}$。`],
    related: ['la.elem.k.rank'],
  },
};

const invCards = [
  {
    id: 'la.inv.2x2',
    name: { zh: '二阶矩阵的逆', ja: '2 次正方行列の逆行列', kana: 'にじせいほうぎょうれつのぎゃくぎょうれつ' },
    knowledge: ['la.inv.k.inverse'],
    formula: R`\begin{pmatrix}a&b\\c&d\end{pmatrix}^{-1}=\frac{1}{ad-bc}\begin{pmatrix}d&-b\\-c&a\end{pmatrix}`,
    conditions: [R`$ad-bc\neq0$。`],
    scenarios: [R`所有二阶矩阵的求逆，直接套公式。`],
    steps: [R`算 $ad-bc$。`, R`对角线交换，副对角线变号。`, R`除以 $ad-bc$。`],
    pitfalls: [R`算完用 $AA^{-1}=E$ 检查。`],
    exercises: [
      {
        id: 'la.inv.2x2.ex1',
        difficulty: '易',
        question: {
          zh: R`求 $A=\begin{pmatrix}3&1\\5&2\end{pmatrix}$ 的逆矩阵。`,
          ja: R`$A=\begin{pmatrix}3&1\\5&2\end{pmatrix}$ の逆行列を求めよ。`,
          en: R`Find the inverse of $A=\begin{pmatrix}3&1\\5&2\end{pmatrix}$.`,
        },
        answer: R`A^{-1}=\begin{pmatrix}2&-1\\-5&3\end{pmatrix}`,
        idea: R`$ad-bc=6-5=1$。`,
        solution: [{ math: R`A^{-1}=\frac11\begin{pmatrix}2&-1\\-5&3\end{pmatrix}` }],
        pitfalls: [R`检查：$\begin{pmatrix}3&1\\5&2\end{pmatrix}\begin{pmatrix}2&-1\\-5&3\end{pmatrix}=E$。`],
        verify: { type: 'equal', lhs: 'Matrix([[3,1],[5,2]]).inv()', rhs: 'Matrix([[2,-1],[-5,3]])' },
      },
    ],
  },
  {
    id: 'la.inv.gauss',
    name: { zh: '消元法求逆矩阵', ja: '掃き出し法による逆行列', kana: 'はきだしほうによるぎゃくぎょうれつ' },
    knowledge: ['la.inv.k.inverse'],
    formula: R`(A\mid E)\ \xrightarrow{\ \text{行基本变形}\ }\ (E\mid A^{-1})`,
    conditions: [R`若左半部分无法化为 $E$（出现零行），则 $A$ 不可逆。`],
    scenarios: [R`三阶及以上矩阵求逆。`],
    steps: [R`把 $E$ 并排写在 $A$ 右边。`, R`只用行变形把左半化为 $E$。`, R`右半就是 $A^{-1}$。`],
    pitfalls: [R`不能混用列变形。`],
    exercises: [
      {
        id: 'la.inv.gauss.ex1',
        difficulty: '中',
        question: {
          zh: R`求 $A=\begin{pmatrix}1&0&1\\1&1&0\\0&1&1\end{pmatrix}$ 的逆矩阵。`,
          ja: R`$A=\begin{pmatrix}1&0&1\\1&1&0\\0&1&1\end{pmatrix}$ の逆行列を求めよ。`,
          en: R`Find the inverse of $A=\begin{pmatrix}1&0&1\\1&1&0\\0&1&1\end{pmatrix}$.`,
        },
        answer: R`A^{-1}=\frac12\begin{pmatrix}1&1&-1\\-1&1&1\\1&-1&1\end{pmatrix}`,
        idea: R`$R_2-R_1$，$R_3-R_2$，再回代。`,
        solution: [
          R`$R_2-R_1$：第 2 行变为 $(0,1,-1\mid-1,1,0)$。`,
          R`$R_3-R_2$：第 3 行变为 $(0,0,2\mid1,-1,1)$，再除以 2。`,
          R`$R_2+R_3$，$R_1-R_3$ 回代，得`,
          { math: R`\left(\begin{array}{ccc|ccc}1&0&0&\frac12&\frac12&-\frac12\\[2pt]0&1&0&-\frac12&\frac12&\frac12\\[2pt]0&0&1&\frac12&-\frac12&\frac12\end{array}\right)` },
        ],
        pitfalls: [R`$\det A=2$，所以结果里出现 $\dfrac12$ 是正常的。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,0,1],[1,1,0],[0,1,1]]).inv()', rhs: 'Matrix([[1,1,-1],[-1,1,1],[1,-1,1]])/2' },
      },
    ],
  },
  {
    id: 'la.inv.polynomial',
    name: { zh: '由矩阵多项式求逆', ja: '行列の多項式から逆行列を求める', kana: 'ぎょうれつのたこうしきからぎゃくぎょうれつをもとめる' },
    knowledge: ['la.inv.k.inverse'],
    formula: R`A(\cdots)=E\ \Longrightarrow\ A^{-1}=(\cdots)`,
    conditions: [R`已知 $A$ 满足某个多项式等式，且常数项非零。`],
    scenarios: [R`「$A^2-A-2E=O$，证明 $A$ 可逆并求 $A^{-1}$」型题目。`],
    steps: [R`把常数项移到右边。`, R`左边提出 $A$：$A\cdot(\cdots)=E$。`],
    pitfalls: [R`$A$ 与 $E$ 可交换，所以提取公因子时顺序无关。`],
    exercises: [
      {
        id: 'la.inv.polynomial.ex1',
        difficulty: '中',
        question: {
          zh: R`方阵 $A$ 满足 $A^2-A-2E=O$。证明 $A$ 可逆并用 $A$ 表示 $A^{-1}$。`,
          ja: R`正方行列 $A$ が $A^2-A-2E=O$ を満たすとき，$A$ は正則であることを示し，$A^{-1}$ を $A$ で表せ。`,
          en: R`A square matrix $A$ satisfies $A^2-A-2E=O$. Show that $A$ is invertible and express $A^{-1}$ in terms of $A$.`,
        },
        answer: R`A^{-1}=\frac12(A-E)`,
        idea: R`$A^2-A=2E$。`,
        solution: [{ math: R`A(A-E)=2E\ \Longrightarrow\ A\cdot\tfrac12(A-E)=E` }, R`所以 $A$ 可逆，$A^{-1}=\dfrac12(A-E)$。`],
        pitfalls: [R`例如 $A=\begin{pmatrix}2&0\\0&-1\end{pmatrix}$ 满足条件，可用来检查。`],
        verify: { type: 'equal', lhs: 'Matrix([[2,0],[0,-1]]).inv()', rhs: '(Matrix([[2,0],[0,-1]])-eye(2))/2' },
      },
    ],
  },
  {
    id: 'la.inv.matrix-equation',
    name: { zh: '矩阵方程', ja: '行列方程式', kana: 'ぎょうれつほうていしき' },
    knowledge: ['la.inv.k.inverse'],
    formula: [R`AX=B\ \Longrightarrow\ X=A^{-1}B`, R`XA=B\ \Longrightarrow\ X=BA^{-1}`],
    conditions: [R`$A$ 正则。`],
    scenarios: [R`求满足矩阵等式的未知矩阵。`],
    steps: [R`判断 $A^{-1}$ 应该乘在左边还是右边。`, R`求 $A^{-1}$ 并相乘。`],
    pitfalls: [R`$X=A^{-1}B$ 与 $X=BA^{-1}$ 一般不同。`],
    exercises: [
      {
        id: 'la.inv.matrix-equation.ex1',
        difficulty: '易',
        question: {
          zh: R`解矩阵方程 $\begin{pmatrix}1&2\\1&3\end{pmatrix}X=\begin{pmatrix}1&0\\2&1\end{pmatrix}$。`,
          ja: R`行列方程式 $\begin{pmatrix}1&2\\1&3\end{pmatrix}X=\begin{pmatrix}1&0\\2&1\end{pmatrix}$ を解け。`,
          en: R`Solve $\begin{pmatrix}1&2\\1&3\end{pmatrix}X=\begin{pmatrix}1&0\\2&1\end{pmatrix}$.`,
        },
        answer: R`X=\begin{pmatrix}-1&-2\\1&1\end{pmatrix}`,
        idea: R`$A^{-1}=\begin{pmatrix}3&-2\\-1&1\end{pmatrix}$。`,
        solution: [{ math: R`X=\begin{pmatrix}3&-2\\-1&1\end{pmatrix}\begin{pmatrix}1&0\\2&1\end{pmatrix}=\begin{pmatrix}-1&-2\\1&1\end{pmatrix}` }],
        pitfalls: [R`$A^{-1}$ 必须乘在 $B$ 的左边。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,2],[1,3]]).inv()*Matrix([[1,0],[2,1]])', rhs: 'Matrix([[-1,-2],[1,1]])' },
      },
    ],
  },
];

export const inverseChapter = {
  overview: '逆矩阵与正则矩阵：二阶公式、消元法 $(A\\mid E)\\to(E\\mid A^{-1})$、由矩阵多项式求逆、矩阵方程。',
  sections: [{ title: '逆矩阵', knowledge: [KI.inverse], formulas: invCards }],
};

// ---------------- 第 7 章 行列式 ----------------
const KD = {
  definition: {
    id: 'la.det.k.definition',
    name: { zh: '行列式的定义与性质', ja: '行列式の定義と性質', kana: 'ぎょうれつしきのていぎとせいしつ' },
    paragraphs: [
      R`$n$ 次方阵的行列式是对所有置换 $\sigma$ 求和：每行各取一个、列互不相同的 $n$ 个成分之积，再乘符号 $\operatorname{sgn}\sigma$。`,
      R`计算时主要用性质把它化成三角形，或用余因子展开降阶。`,
    ],
    definitions: [R`\det A=\sum_{\sigma\in S_n}\operatorname{sgn}(\sigma)\,a_{1\sigma(1)}a_{2\sigma(2)}\cdots a_{n\sigma(n)}`],
    conditions: [
      R`交换两行：变号。某行乘 $c$：整体乘 $c$。某行加另一行的倍数：不变。`,
      R`有两行相同或有零行：值为 0。对列也全部成立（$\det A^T=\det A$）。`,
    ],
    theorems: [R`$\det(AB)=\det A\det B$；三角矩阵的行列式 $=$ 对角成分之积。`],
    related: ['la.det.k.cofactor'],
  },
  cofactor: {
    id: 'la.det.k.cofactor',
    name: { zh: '余因子展开', ja: '余因子展開', kana: 'よいんしてんかい' },
    paragraphs: [
      R`去掉第 $i$ 行第 $j$ 列得到的 $n-1$ 阶行列式叫**小行列式** $D_{ij}$；$\tilde a_{ij}=(-1)^{i+j}D_{ij}$ 叫 $(i,j)$ **余因子**。`,
      R`余因子排成的矩阵再转置，得到**余因子矩阵**（伴随矩阵）$\tilde A$。`,
    ],
    definitions: [R`\det A=\sum_{j=1}^{n}a_{ij}\tilde a_{ij}\quad(\text{按第}\ i\ \text{行展开})`],
    conditions: [R`符号按棋盘格：左上角为 $+$，相邻位置交替。`],
    theorems: [R`$A\tilde A=\tilde AA=(\det A)E$，所以 $A^{-1}=\dfrac{1}{\det A}\tilde A$。`],
    related: ['la.det.k.definition', 'la.inv.k.inverse'],
  },
};

const detCards = [
  {
    id: 'la.det.sarrus',
    name: { zh: '二阶、三阶行列式（Sarrus 法则）', ja: '2 次・3 次の行列式（サラスの方法）', kana: 'サラスのほうほう' },
    knowledge: ['la.det.k.definition'],
    formula: [
      R`\begin{vmatrix}a&b\\c&d\end{vmatrix}=ad-bc`,
      R`\begin{aligned}\begin{vmatrix}a_1&a_2&a_3\\b_1&b_2&b_3\\c_1&c_2&c_3\end{vmatrix}&=a_1b_2c_3+a_2b_3c_1+a_3b_1c_2\\&\quad-a_3b_2c_1-a_1b_3c_2-a_2b_1c_3\end{aligned}`,
    ],
    conditions: [R`Sarrus 法则只适用于二阶、三阶。`],
    scenarios: [R`小矩阵直接计算。`],
    steps: [R`右下方向的三条对角线取 $+$。`, R`左下方向的三条取 $-$。`],
    pitfalls: [R`四阶以上不能用 Sarrus 法则。`],
    exercises: [
      {
        id: 'la.det.sarrus.ex1',
        difficulty: '易',
        question: {
          zh: R`计算 $\begin{vmatrix}2&1&3\\1&0&2\\4&1&1\end{vmatrix}$。`,
          ja: R`$\begin{vmatrix}2&1&3\\1&0&2\\4&1&1\end{vmatrix}$ を計算せよ。`,
          en: R`Evaluate $\begin{vmatrix}2&1&3\\1&0&2\\4&1&1\end{vmatrix}$.`,
        },
        answer: R`6`,
        idea: R`按 Sarrus 法则六项。`,
        solution: [
          { math: R`(0+8+3)-(0+4+1)=11-5=6` },
          R`正项：$2\cdot0\cdot1$，$1\cdot2\cdot4$，$3\cdot1\cdot1$；负项：$3\cdot0\cdot4$，$2\cdot2\cdot1$，$1\cdot1\cdot1$。`,
        ],
        pitfalls: [R`含 0 的项直接为 0。`],
        verify: { type: 'equal', lhs: 'Matrix([[2,1,3],[1,0,2],[4,1,1]]).det()', rhs: '6' },
      },
    ],
  },
  {
    id: 'la.det.row-reduce',
    name: { zh: '用性质化为三角形', ja: '性質を使った行列式の計算', kana: 'せいしつをつかったぎょうれつしきのけいさん' },
    knowledge: ['la.det.k.definition'],
    formula: R`\begin{vmatrix}d_1&*&*\\0&d_2&*\\0&0&d_3\end{vmatrix}=d_1d_2d_3`,
    conditions: [R`只用「某行加另一行的倍数」时值不变；交换行要变号。`],
    scenarios: [R`四阶及以上、或成分有规律的行列式。`],
    steps: [R`用第 1 行把第 1 列下方消为 0。`, R`对右下的小块重复。`, R`对角成分相乘，并乘上交换行产生的符号。`],
    pitfalls: [R`某行乘 $c$ 时行列式也乘 $c$，要除回来。`],
    exercises: [
      {
        id: 'la.det.row-reduce.ex1',
        difficulty: '易',
        question: {
          zh: R`计算 $\begin{vmatrix}1&2&3\\2&3&4\\3&4&6\end{vmatrix}$。`,
          ja: R`$\begin{vmatrix}1&2&3\\2&3&4\\3&4&6\end{vmatrix}$ を計算せよ。`,
          en: R`Evaluate $\begin{vmatrix}1&2&3\\2&3&4\\3&4&6\end{vmatrix}$.`,
        },
        answer: R`-1`,
        idea: R`$R_2-2R_1$，$R_3-3R_1$。`,
        solution: [
          { math: R`=\begin{vmatrix}1&2&3\\0&-1&-2\\0&-2&-3\end{vmatrix}=\begin{vmatrix}-1&-2\\-2&-3\end{vmatrix}=3-4=-1` },
        ],
        pitfalls: [R`第 1 列只剩 1 个非零成分，可以直接按第 1 列展开。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,2,3],[2,3,4],[3,4,6]]).det()', rhs: '-1' },
      },
      {
        id: 'la.det.row-reduce.ex2',
        difficulty: '中',
        question: {
          zh: R`计算 $\begin{vmatrix}1&1&1&1\\1&2&2&2\\1&2&3&3\\1&2&3&4\end{vmatrix}$。`,
          ja: R`$\begin{vmatrix}1&1&1&1\\1&2&2&2\\1&2&3&3\\1&2&3&4\end{vmatrix}$ を計算せよ。`,
          en: R`Evaluate $\begin{vmatrix}1&1&1&1\\1&2&2&2\\1&2&3&3\\1&2&3&4\end{vmatrix}$.`,
        },
        answer: R`1`,
        idea: R`从下往上：$R_4-R_3$，$R_3-R_2$，$R_2-R_1$。`,
        solution: [{ math: R`=\begin{vmatrix}1&1&1&1\\0&1&1&1\\0&0&1&1\\0&0&0&1\end{vmatrix}=1` }],
        pitfalls: [R`要从最后一行开始减，否则用到的是已经改过的行。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,1,1,1],[1,2,2,2],[1,2,3,3],[1,2,3,4]]).det()', rhs: '1' },
      },
    ],
  },
  {
    id: 'la.det.cofactor',
    name: { zh: '余因子展开计算', ja: '余因子展開による計算', kana: 'よいんしてんかいによるけいさん' },
    knowledge: ['la.det.k.cofactor'],
    formula: R`\det A=\sum_{j=1}^{n}(-1)^{i+j}a_{ij}D_{ij}`,
    conditions: [R`可以按任意一行或一列展开。`],
    scenarios: [R`某行（列）有很多 0 时。`],
    steps: [R`选 0 最多的行或列。`, R`每个非零成分乘以带符号的小行列式。`],
    pitfalls: [R`符号 $(-1)^{i+j}$ 最容易漏。`],
    exercises: [
      {
        id: 'la.det.cofactor.ex1',
        difficulty: '中',
        question: {
          zh: R`计算 $\begin{vmatrix}2&0&0&1\\1&3&0&0\\0&1&4&0\\0&0&1&5\end{vmatrix}$。`,
          ja: R`$\begin{vmatrix}2&0&0&1\\1&3&0&0\\0&1&4&0\\0&0&1&5\end{vmatrix}$ を計算せよ。`,
          en: R`Evaluate $\begin{vmatrix}2&0&0&1\\1&3&0&0\\0&1&4&0\\0&0&1&5\end{vmatrix}$.`,
        },
        answer: R`119`,
        idea: R`按第 1 行展开，只有两项。`,
        solution: [
          { math: R`=2\begin{vmatrix}3&0&0\\1&4&0\\0&1&5\end{vmatrix}+(-1)^{1+4}\cdot1\cdot\begin{vmatrix}1&3&0\\0&1&4\\0&0&1\end{vmatrix}` },
          { math: R`=2\cdot60-1=119` },
        ],
        pitfalls: [R`两个小行列式都是三角形，直接对角相乘。`],
        verify: { type: 'equal', lhs: 'Matrix([[2,0,0,1],[1,3,0,0],[0,1,4,0],[0,0,1,5]]).det()', rhs: '119' },
      },
    ],
  },
  {
    id: 'la.det.product',
    name: { zh: '积、转置、数乘与逆的行列式', ja: '積・転置・スカラー倍・逆行列の行列式', kana: 'せき・てんち・スカラーばい・ぎゃくぎょうれつのぎょうれつしき' },
    knowledge: ['la.det.k.definition'],
    formula: [R`\det(AB)=\det A\det B`, R`\det A^T=\det A`, R`\det(kA)=k^n\det A`, R`\det A^{-1}=\frac{1}{\det A}`],
    conditions: [R`$A$、$B$ 为 $n$ 次方阵。`],
    scenarios: [R`已知 $\det A$，求相关矩阵的行列式。`],
    steps: [R`把要求的矩阵拆成积、数乘、逆、转置。`, R`逐个套公式。`],
    pitfalls: [R`$\det(kA)=k^n\det A$，不是 $k\det A$；$\det(A+B)\neq\det A+\det B$。`],
    exercises: [
      {
        id: 'la.det.product.ex1',
        difficulty: '易',
        question: {
          zh: R`三阶方阵 $A$ 满足 $\det A=2$。求 $\det(3A)$、$\det(2A^{-1})$、$\det(A^TA)$。`,
          ja: R`3 次正方行列 $A$ が $\det A=2$ を満たすとき，$\det(3A)$，$\det(2A^{-1})$，$\det(A^TA)$ を求めよ。`,
          en: R`A $3\times3$ matrix $A$ has $\det A=2$. Find $\det(3A)$, $\det(2A^{-1})$, $\det(A^TA)$.`,
        },
        answer: R`\begin{gathered}\det(3A)=54\\\det(2A^{-1})=4\\\det(A^TA)=4\end{gathered}`,
        idea: R`$n=3$。`,
        solution: [
          { math: R`\det(3A)=3^3\cdot2=54` },
          { math: R`\det(2A^{-1})=2^3\cdot\frac12=4` },
          { math: R`\det(A^TA)=2\cdot2=4` },
        ],
        pitfalls: [R`数乘的指数是阶数 3。`],
        verify: {
          type: 'all',
          items: [
            { type: 'equal', lhs: '(3*diag(2,1,1)).det()', rhs: '54' },
            { type: 'equal', lhs: '(2*diag(2,1,1).inv()).det()', rhs: '4' },
          ],
        },
      },
    ],
  },
  {
    id: 'la.det.vandermonde',
    name: { zh: '范德蒙德行列式', ja: 'ヴァンデルモンドの行列式', kana: 'ヴァンデルモンドのぎょうれつしき' },
    knowledge: ['la.det.k.definition'],
    formula: R`\begin{vmatrix}1&1&1\\a&b&c\\a^2&b^2&c^2\end{vmatrix}=(b-a)(c-a)(c-b)`,
    conditions: [R`一般地 $n$ 阶为 $\displaystyle\prod_{i<j}(x_j-x_i)$。`],
    scenarios: [R`各行是同一组数的 $0,1,2,\dots$ 次幂。`],
    steps: [R`从最后一行起：$R_k-aR_{k-1}$，第 1 列化为 $(1,0,0)^T$。`, R`各列提出公因子，降为低一阶的范德蒙德行列式。`],
    pitfalls: [R`因子顺序是「后减前」，符号不要弄反。`],
    exercises: [
      {
        id: 'la.det.vandermonde.ex1',
        difficulty: '易',
        question: {
          zh: R`计算 $\begin{vmatrix}1&1&1\\1&2&3\\1&4&9\end{vmatrix}$。`,
          ja: R`$\begin{vmatrix}1&1&1\\1&2&3\\1&4&9\end{vmatrix}$ を計算せよ。`,
          en: R`Evaluate $\begin{vmatrix}1&1&1\\1&2&3\\1&4&9\end{vmatrix}$.`,
        },
        answer: R`2`,
        idea: R`范德蒙德型，$a=1$，$b=2$，$c=3$。`,
        solution: [{ math: R`(2-1)(3-1)(3-2)=2` }],
        pitfalls: [R`这里第 2、3 行是 1 次、2 次幂。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,1,1],[1,2,3],[1,4,9]]).det()', rhs: '2' },
      },
      {
        id: 'la.det.vandermonde.ex2',
        difficulty: '中',
        question: {
          zh: R`证明 $\begin{vmatrix}1&1&1\\a&b&c\\a^2&b^2&c^2\end{vmatrix}=(b-a)(c-a)(c-b)$。`,
          ja: R`$\begin{vmatrix}1&1&1\\a&b&c\\a^2&b^2&c^2\end{vmatrix}=(b-a)(c-a)(c-b)$ を示せ。`,
          en: R`Prove $\begin{vmatrix}1&1&1\\a&b&c\\a^2&b^2&c^2\end{vmatrix}=(b-a)(c-a)(c-b)$.`,
        },
        answerText: R`$R_3-aR_2$，$R_2-aR_1$ 后按第 1 列展开，再从两列分别提出 $b-a$、$c-a$。`,
        idea: R`先消去第 1 列。`,
        solution: [
          { math: R`=\begin{vmatrix}1&1&1\\0&b-a&c-a\\0&b(b-a)&c(c-a)\end{vmatrix}` },
          { math: R`=(b-a)(c-a)\begin{vmatrix}1&1\\b&c\end{vmatrix}=(b-a)(c-a)(c-b)` },
        ],
        pitfalls: [R`必须先做 $R_3-aR_2$，再做 $R_2-aR_1$。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,1,1],[a,b,c],[a**2,b**2,c**2]]).det()', rhs: '(b-a)*(c-a)*(c-b)' },
      },
    ],
  },
  {
    id: 'la.det.adjugate',
    name: { zh: '余因子矩阵求逆', ja: '余因子行列による逆行列', kana: 'よいんしぎょうれつによるぎゃくぎょうれつ' },
    knowledge: ['la.det.k.cofactor'],
    formula: R`A^{-1}=\frac{1}{\det A}\tilde A,\qquad\tilde A=(\tilde a_{ji})`,
    conditions: [R`$\det A\neq0$。注意 $\tilde A$ 的 $(i,j)$ 成分是 $\tilde a_{ji}$（转置）。`],
    scenarios: [R`三阶矩阵求逆；只需要逆矩阵的某一个成分时。`],
    steps: [R`求 9 个余因子（带符号）。`, R`排好后转置。`, R`除以 $\det A$。`],
    pitfalls: [R`忘记转置是最常见的错误。`],
    exercises: [
      {
        id: 'la.det.adjugate.ex1',
        difficulty: '中',
        question: {
          zh: R`用余因子矩阵求 $A=\begin{pmatrix}1&2&0\\0&1&1\\1&0&1\end{pmatrix}$ 的逆矩阵。`,
          ja: R`余因子行列を用いて $A=\begin{pmatrix}1&2&0\\0&1&1\\1&0&1\end{pmatrix}$ の逆行列を求めよ。`,
          en: R`Use the adjugate to find the inverse of $A=\begin{pmatrix}1&2&0\\0&1&1\\1&0&1\end{pmatrix}$.`,
        },
        answer: R`A^{-1}=\frac13\begin{pmatrix}1&-2&2\\1&1&-1\\-1&2&1\end{pmatrix}`,
        idea: R`$\det A=1\cdot1-2\cdot(0-1)=3$。`,
        solution: [
          R`余因子：$\tilde a_{11}=1$，$\tilde a_{12}=1$，$\tilde a_{13}=-1$，$\tilde a_{21}=-2$，$\tilde a_{22}=1$，$\tilde a_{23}=2$，$\tilde a_{31}=2$，$\tilde a_{32}=-1$，$\tilde a_{33}=1$。`,
          { math: R`\tilde A=\begin{pmatrix}1&-2&2\\1&1&-1\\-1&2&1\end{pmatrix}` },
        ],
        pitfalls: [R`检查：$A\tilde A=3E$。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,2,0],[0,1,1],[1,0,1]]).adjugate()', rhs: 'Matrix([[1,-2,2],[1,1,-1],[-1,2,1]])' },
      },
    ],
  },
  {
    id: 'la.det.cramer',
    name: { zh: '克拉默法则', ja: 'クラメルの公式', kana: 'クラメルのこうしき' },
    knowledge: ['la.det.k.cofactor'],
    formula: R`x_j=\frac{\det A_j}{\det A}\qquad(A_j:\ A\ \text{的第}\ j\ \text{列换成}\ \boldsymbol b)`,
    conditions: [R`$A$ 为方阵且 $\det A\neq0$。`],
    scenarios: [R`只求某一个未知数；系数含参数的二元、三元方程组。`],
    steps: [R`算 $\det A$。`, R`把第 $j$ 列换成 $\boldsymbol b$，算 $\det A_j$。`, R`相除。`],
    pitfalls: [R`换的是列，不是行。`],
    exercises: [
      {
        id: 'la.det.cramer.ex1',
        difficulty: '易',
        question: {
          zh: R`用克拉默法则解 $\begin{cases}2x+y=5\\x+3y=5\end{cases}$。`,
          ja: R`クラメルの公式で $\begin{cases}2x+y=5\\x+3y=5\end{cases}$ を解け。`,
          en: R`Solve $\begin{cases}2x+y=5\\x+3y=5\end{cases}$ by Cramer's rule.`,
        },
        answer: R`x=2,\qquad y=1`,
        idea: R`$\det A=6-1=5$。`,
        solution: [
          { math: R`x=\frac{1}{5}\begin{vmatrix}5&1\\5&3\end{vmatrix}=\frac{10}{5}=2` },
          { math: R`y=\frac{1}{5}\begin{vmatrix}2&5\\1&5\end{vmatrix}=\frac{5}{5}=1` },
        ],
        pitfalls: [R`代回检查：$4+1=5$，$2+3=5$。`],
        verify: { type: 'equal', lhs: 'Matrix([[5,1],[5,3]]).det()/Matrix([[2,1],[1,3]]).det()', rhs: '2' },
      },
    ],
  },
];

export const determinantsChapter = {
  overview: '行列式：Sarrus 法则、用性质化三角形、余因子展开、积与数乘的行列式、范德蒙德行列式、余因子矩阵求逆、克拉默法则。',
  sections: [
    { title: '行列式的计算', knowledge: [KD.definition], formulas: [detCards[0], detCards[1], detCards[3], detCards[4]] },
    { title: '余因子与应用', knowledge: [KD.cofactor], formulas: [detCards[2], detCards[5], detCards[6]] },
  ],
};

// ---------------- 第 8 章 线性无关与线性相关 ----------------
const KL = {
  independence: {
    id: 'la.ind.k.independence',
    name: { zh: '线性无关与线性相关', ja: '一次独立と一次従属', kana: 'いちじどくりつといちじじゅうぞく' },
    paragraphs: [
      R`若 $c_1\boldsymbol a_1+\cdots+c_k\boldsymbol a_k=\boldsymbol0$ 只有 $c_1=\cdots=c_k=0$ 这一组解，称向量组**线性无关**（一次独立），否则称**线性相关**（一次従属）。`,
      R`线性相关 $\iff$ 其中某个向量可以由其余向量线性表示。`,
    ],
    definitions: [R`\begin{gathered}c_1\boldsymbol a_1+\cdots+c_k\boldsymbol a_k=\boldsymbol0\\\Longrightarrow\ c_1=\cdots=c_k=0\end{gathered}`],
    conditions: [R`以 $\boldsymbol a_1,\dots,\boldsymbol a_k$ 为列的矩阵记为 $A$：线性无关 $\iff\rank A=k$。`],
    theorems: [R`$n$ 个 $n$ 维向量线性无关 $\iff\det(\boldsymbol a_1\ \cdots\ \boldsymbol a_n)\neq0$。`, R`$n+1$ 个以上的 $n$ 维向量一定线性相关。`],
    related: ['la.elem.k.rank'],
  },
};

const indCards = [
  {
    id: 'la.ind.test',
    name: { zh: '线性无关的判定', ja: '一次独立の判定', kana: 'いちじどくりつのはんてい' },
    knowledge: ['la.ind.k.independence'],
    formula: R`\begin{gathered}\boldsymbol a_1,\dots,\boldsymbol a_n\ \text{线性无关}\\\iff\det(\boldsymbol a_1\ \cdots\ \boldsymbol a_n)\neq0\end{gathered}`,
    conditions: [R`向量个数等于维数时用行列式；否则用秩。`],
    scenarios: [R`判断向量组是否线性无关；相关时求出一组关系式。`],
    steps: [R`把向量作为列排成矩阵。`, R`算行列式或秩。`, R`相关时解齐次方程组求出系数。`],
    pitfalls: [R`说明「线性相关」时最好给出具体的关系式。`],
    exercises: [
      {
        id: 'la.ind.test.ex1',
        difficulty: '易',
        question: {
          zh: R`判断 $(1,1,0)$、$(0,1,1)$、$(1,0,1)$ 是否线性无关。`,
          ja: R`$(1,1,0)$，$(0,1,1)$，$(1,0,1)$ は一次独立か。`,
          en: R`Are $(1,1,0)$, $(0,1,1)$, $(1,0,1)$ linearly independent?`,
        },
        answerText: R`线性无关（行列式 $=2\neq0$）。`,
        idea: R`三个三维向量，用行列式。`,
        solution: [{ math: R`\begin{vmatrix}1&0&1\\1&1&0\\0&1&1\end{vmatrix}=1+1=2\neq0` }],
        pitfalls: [R`作为行排或作为列排，行列式相同。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,0,1],[1,1,0],[0,1,1]]).det()', rhs: '2' },
      },
      {
        id: 'la.ind.test.ex2',
        difficulty: '易',
        question: {
          zh: R`判断 $\boldsymbol a_1=(1,2,3)$、$\boldsymbol a_2=(4,5,6)$、$\boldsymbol a_3=(7,8,9)$ 是否线性无关；若相关，求出一个关系式。`,
          ja: R`$\boldsymbol a_1=(1,2,3)$，$\boldsymbol a_2=(4,5,6)$，$\boldsymbol a_3=(7,8,9)$ は一次独立か。一次従属ならば関係式を一つ求めよ。`,
          en: R`Are $\boldsymbol a_1=(1,2,3)$, $\boldsymbol a_2=(4,5,6)$, $\boldsymbol a_3=(7,8,9)$ independent? If not, find a relation.`,
        },
        answerText: R`线性相关，$\boldsymbol a_1-2\boldsymbol a_2+\boldsymbol a_3=\boldsymbol0$。`,
        idea: R`行列式为 0；解齐次方程组。`,
        solution: [
          { math: R`\begin{pmatrix}1&4&7\\2&5&8\\3&6&9\end{pmatrix}\to\begin{pmatrix}1&0&-1\\0&1&2\\0&0&0\end{pmatrix}` },
          R`$c_3=1$ 时 $c_1=1$，$c_2=-2$。`,
        ],
        pitfalls: [R`检查：$(1-8+7,\ 2-10+8,\ 3-12+9)=(0,0,0)$。`],
        verify: { type: 'equal', lhs: 'Matrix([1,2,3])-2*Matrix([4,5,6])+Matrix([7,8,9])', rhs: 'Matrix([0,0,0])' },
      },
    ],
  },
  {
    id: 'la.ind.combination',
    name: { zh: '线性组合的表示', ja: '一次結合で表す', kana: 'いちじけつごうであらわす' },
    knowledge: ['la.ind.k.independence'],
    formula: R`\begin{gathered}\boldsymbol b=c_1\boldsymbol a_1+\cdots+c_k\boldsymbol a_k\\\iff(\boldsymbol a_1\ \cdots\ \boldsymbol a_k)\boldsymbol c=\boldsymbol b\end{gathered}`,
    conditions: [R`可表示 $\iff$ 该方程组有解。`],
    scenarios: [R`把向量用另一组向量（基）表示。`],
    steps: [R`列出关于 $c_i$ 的方程组。`, R`消元求解。`],
    pitfalls: [R`$\boldsymbol a_i$ 线性无关时表示方式唯一。`],
    exercises: [
      {
        id: 'la.ind.combination.ex1',
        difficulty: '易',
        question: {
          zh: R`把 $\boldsymbol b=(1,3,2)$ 表示为 $\boldsymbol a_1=(1,1,0)$、$\boldsymbol a_2=(0,1,1)$、$\boldsymbol a_3=(1,0,1)$ 的线性组合。`,
          ja: R`$\boldsymbol b=(1,3,2)$ を $\boldsymbol a_1=(1,1,0)$，$\boldsymbol a_2=(0,1,1)$，$\boldsymbol a_3=(1,0,1)$ の一次結合で表せ。`,
          en: R`Express $\boldsymbol b=(1,3,2)$ as a linear combination of $\boldsymbol a_1=(1,1,0)$, $\boldsymbol a_2=(0,1,1)$, $\boldsymbol a_3=(1,0,1)$.`,
        },
        answer: R`\boldsymbol b=\boldsymbol a_1+2\boldsymbol a_2`,
        idea: R`$c_1+c_3=1$，$c_1+c_2=3$，$c_2+c_3=2$。`,
        solution: [R`三式相加：$c_1+c_2+c_3=3$。分别减去各式得 $c_2=2$，$c_3=0$，$c_1=1$。`],
        pitfalls: [R`系数为 0 的项可以不写。`],
        verify: { type: 'equal', lhs: 'Matrix([1,1,0])+2*Matrix([0,1,1])', rhs: 'Matrix([1,3,2])' },
      },
    ],
  },
  {
    id: 'la.ind.maximal',
    name: { zh: '极大线性无关组', ja: '一次独立な最大個数のベクトル', kana: 'いちじどくりつなさいだいこすうのベクトル' },
    knowledge: ['la.ind.k.independence'],
    formula: R`(\boldsymbol a_1\ \cdots\ \boldsymbol a_k)\ \xrightarrow{\ \text{行变形}\ }\ \text{行简约阶梯形}`,
    conditions: [R`行变形不改变列向量之间的线性关系。`],
    scenarios: [R`求向量组的秩、极大线性无关组，并用它表示其余向量。`],
    steps: [R`以向量为列排成矩阵，化为行简约阶梯形。`, R`主元所在列对应的原向量构成极大线性无关组。`, R`非主元列的成分直接给出线性表示的系数。`],
    pitfalls: [R`要取「原来的」向量，不是阶梯形里的列。`],
    exercises: [
      {
        id: 'la.ind.maximal.ex1',
        difficulty: '中',
        question: {
          zh: R`$\boldsymbol a_1=(1,2,1)$，$\boldsymbol a_2=(2,4,2)$，$\boldsymbol a_3=(1,0,1)$，$\boldsymbol a_4=(0,2,0)$。求一个极大线性无关组，并用它表示其余向量。`,
          ja: R`$\boldsymbol a_1=(1,2,1)$，$\boldsymbol a_2=(2,4,2)$，$\boldsymbol a_3=(1,0,1)$，$\boldsymbol a_4=(0,2,0)$ から一次独立な最大個数のベクトルを選び，残りをそれらの一次結合で表せ。`,
          en: R`For $\boldsymbol a_1=(1,2,1)$, $\boldsymbol a_2=(2,4,2)$, $\boldsymbol a_3=(1,0,1)$, $\boldsymbol a_4=(0,2,0)$, find a maximal independent subset and express the others in terms of it.`,
        },
        answerText: R`$\{\boldsymbol a_1,\boldsymbol a_3\}$（秩 2）；$\boldsymbol a_2=2\boldsymbol a_1$，$\boldsymbol a_4=\boldsymbol a_1-\boldsymbol a_3$。`,
        idea: R`列排成矩阵后化为行简约阶梯形。`,
        solution: [
          { math: R`\begin{pmatrix}1&2&1&0\\2&4&0&2\\1&2&1&0\end{pmatrix}\to\begin{pmatrix}1&2&0&1\\0&0&1&-1\\0&0&0&0\end{pmatrix}` },
          R`主元在第 1、3 列；第 2 列 $=(2,0)$ 表示 $\boldsymbol a_2=2\boldsymbol a_1$，第 4 列 $=(1,-1)$ 表示 $\boldsymbol a_4=\boldsymbol a_1-\boldsymbol a_3$。`,
        ],
        pitfalls: [R`检查：$\boldsymbol a_1-\boldsymbol a_3=(0,2,0)=\boldsymbol a_4$。`],
        verify: { type: 'equal', lhs: 'Matrix([[1,2,1,0],[2,4,0,2],[1,2,1,0]]).rref()[0]', rhs: 'Matrix([[1,2,0,1],[0,0,1,-1],[0,0,0,0]])' },
      },
    ],
  },
  {
    id: 'la.ind.param',
    name: { zh: '含参数向量组的相关性', ja: 'パラメータを含むベクトルの一次独立性', kana: 'パラメータをふくむベクトルのいちじどくりつせい' },
    knowledge: ['la.ind.k.independence'],
    formula: R`\det(\boldsymbol a_1\ \cdots\ \boldsymbol a_n)=0\iff\text{线性相关}`,
    conditions: [R`$n$ 个 $n$ 维向量。`],
    scenarios: [R`「$a$ 取何值时线性相关」。`],
    steps: [R`求行列式并因式分解。`, R`令其为 0 解出参数。`],
    pitfalls: [R`因式分解时注意重根。`],
    exercises: [
      {
        id: 'la.ind.param.ex1',
        difficulty: '中',
        question: {
          zh: R`$a$ 取何值时，$(1,1,a)$、$(1,a,1)$、$(a,1,1)$ 线性相关？`,
          ja: R`$(1,1,a)$，$(1,a,1)$，$(a,1,1)$ が一次従属となる $a$ の値を求めよ。`,
          en: R`For which $a$ are $(1,1,a)$, $(1,a,1)$, $(a,1,1)$ linearly dependent?`,
        },
        answer: R`a=1\ \text{或}\ a=-2`,
        idea: R`每行之和都是 $a+2$：把第 2、3 行加到第 1 行，提出 $a+2$。`,
        solution: [
          { math: R`\begin{vmatrix}1&1&a\\1&a&1\\a&1&1\end{vmatrix}=(a+2)\begin{vmatrix}1&1&1\\1&a&1\\a&1&1\end{vmatrix}` },
          { math: R`=(a+2)\begin{vmatrix}1&0&0\\1&a-1&0\\a&1-a&1-a\end{vmatrix}` }, { math: R`=(a+2)(a-1)(1-a)=-(a+2)(a-1)^2` },
        ],
        pitfalls: [R`第二步是各列减去第 1 列。`],
        verify: { type: 'equal', lhs: 'factor(Matrix([[1,1,a],[1,a,1],[a,1,1]]).det())', rhs: '-(a+2)*(a-1)**2' },
      },
    ],
  },
];

export const independenceChapter = {
  overview: '线性无关与线性相关：行列式 / 秩判定、线性组合的表示、极大线性无关组、含参数的情况。',
  sections: [{ title: '线性无关与线性相关', knowledge: [KL.independence], formulas: indCards }],
};
