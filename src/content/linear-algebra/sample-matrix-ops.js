// 【示例内容】仅用于阶段二测试翻页与排版，阶段四将替换为正式的数学内容。
export const sampleMatrixOps = {
  sample: true,
  overview: '本章将拆分为矩阵加法、减法、数乘、矩阵乘法、转置、矩阵的幂与迹，每种运算一张公式卡。当前为示例页面。',
  knowledge: [
    {
      id: 'la.matrix-operations.sample-knowledge',
      name: { zh: '示例知识点', ja: 'サンプル知識', kana: 'サンプルちしき' },
      paragraphs: ['线性代数章节与微积分使用同样的卡片结构。'],
      related: ['示例：矩阵的型'],
    },
  ],
  formulas: [
    {
      id: 'la.matrix-operations.sample-a',
      name: { zh: '示例公式卡', ja: 'サンプル公式', kana: 'サンプルこうしき' },
      formulaNote: '公式区：阶段三接入 KaTeX 后显示矩阵。',
      conditions: ['示例适用条件：两个矩阵的型相同。'],
      scenarios: ['示例使用场景。'],
      steps: ['示例计算步骤。'],
      pitfalls: ['示例易错点。'],
      exercises: [
        {
          id: 'la.matrix-operations.sample-a.ex1',
          difficulty: '易',
          question: {
            zh: '【示例题干·中文】线性代数示例题。',
            ja: '【例題・日本語】線形代数のサンプル問題です。',
            en: '[Sample problem · English] A linear algebra sample problem.',
          },
        },
      ],
    },
  ],
};
