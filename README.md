# Green Star Academy

面向日本大学院入试的个人数学学习网站：微分积分与线性代数的公式记忆和计算训练。

网址：https://yee249235.github.io/green-star-academy/

## 开发

```bash
npm install
npm run dev      # 本地预览
npm run build    # 构建到 dist/
```

推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。

## 目录

- `src/content/` 数学内容（每章一个文件，只读）
- `src/views/` 页面与组件
- `src/learning/` 星星、进度、计时等学习逻辑
- `src/data/` 本地偏好与云同步
- `src/styles/` 样式（深色主题、薄荷绿点缀）

## 进度

- [x] 阶段一：需求分析与技术架构
- [x] 阶段二：视觉与页面框架（当前为示例内容）
- [x] 阶段三：公式渲染系统（KaTeX）
- [ ] 阶段四：数学内容系统
- [ ] 阶段五：公式记忆与例题训练
- [ ] 阶段六：星星与学习进度
- [ ] 阶段七：学习计时与云同步
- [ ] 阶段八：全面测试与优化

## 公式书写规范

- 公式统一写成 LaTeX，内容文件里用 ``String.raw`…` `` 包裹，反斜杠只写一次。
- 公式卡的标准公式写在 `formula` 字段（独立公式，可以是数组）。
- 正文、条件、题干中的行内公式用 `$…$`；普通美元符号写 `\$`。
- 长公式写成多行 `aligned` / `gathered`，保证手机上不需要横向滑动。
- `npm run build` 会先运行 `scripts/check-latex.js`，任何一条公式出错，构建和发布都会中止。
