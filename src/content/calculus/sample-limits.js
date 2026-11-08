// 【示例内容】仅用于阶段二测试翻页与排版，阶段四将替换为正式的数学内容。
export const sampleLimits = {
  sample: true,
  overview: '本章将拆分为数列极限、函数极限的各种计算方法（直接代入、因式分解、有理化、通分约分、等价无穷小、洛必达、重要极限、Taylor 展开、夹逼定理）以及连续性。当前为示例页面，用来测试翻页和卡片样式。',
  knowledge: [
    {
      id: 'calc.limits.sample-knowledge',
      name: { zh: '示例知识点', ja: 'サンプル知識', kana: 'サンプルちしき' },
      paragraphs: [
        '知识点卡用来理解概念：中文解释、必要的定义、适用条件、相关性质与定理，以及与其他知识点的联系。',
        '这里不放大量例题。计算训练集中在公式卡后面的例题页。',
      ],
      related: ['示例：未定式', '示例：连续性'],
    },
  ],
  formulas: [
    {
      id: 'calc.limits.sample-a',
      name: { zh: '示例公式卡 A', ja: 'サンプル公式 A', kana: 'サンプルこうしき A' },
      formulaNote: '公式区：阶段三接入 KaTeX 后，这里显示教材级排版的公式。',
      conditions: ['适用条件写在这里，例如：0/0 型未定式。', '每条条件单独一行，方便快速扫读。'],
      scenarios: ['使用场景：看到什么样的题目时想到这个公式。'],
      steps: ['第一步：确认题型与条件。', '第二步：套用公式。', '第三步：化简并得出结果。'],
      pitfalls: ['易错点：忘记确认适用条件。'],
      exercises: [
        {
          id: 'calc.limits.sample-a.ex1',
          difficulty: '中',
          question: {
            zh: '【示例题干·中文】这里显示题目的中文版本。',
            ja: '【例題・日本語】ここに問題文の日本語版を表示します。',
            en: '[Sample problem · English] The English version of the problem appears here.',
          },
        },
        {
          id: 'calc.limits.sample-a.ex2',
          difficulty: '中',
          question: {
            zh: '【示例题干·中文】第二道例题，覆盖另一种解题路径。',
            ja: '【例題・日本語】別の解法をカバーする二問目です。',
            en: '[Sample problem · English] A second problem covering another solution path.',
          },
        },
      ],
    },
    {
      id: 'calc.limits.sample-b',
      name: { zh: '示例公式卡 B', ja: 'サンプル公式 B', kana: 'サンプルこうしき B' },
      formulaNote: '公式区：阶段三接入 KaTeX。',
      conditions: ['示例适用条件。'],
      scenarios: ['示例使用场景。'],
      steps: ['示例计算步骤。'],
      pitfalls: ['示例易错点。'],
      exercises: [
        {
          id: 'calc.limits.sample-b.ex1',
          difficulty: '易',
          question: {
            zh: '【示例题干·中文】简单计算只配一道例题。',
            ja: '【例題・日本語】簡単な計算は一問のみです。',
            en: '[Sample problem · English] A simple calculation has a single problem.',
          },
        },
      ],
    },
  ],
};
