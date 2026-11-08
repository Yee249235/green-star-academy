import { defineConfig } from 'vite';

// GitHub Pages 地址为 https://yee249235.github.io/green-star-academy/
export default defineConfig({
  base: '/green-star-academy/',
  build: {
    outDir: 'dist',
    target: 'es2020',
    rollupOptions: {
      output: {
        // KaTeX 和题库内容各自单独成块：只改内容时，浏览器仍可复用缓存的 KaTeX
        manualChunks(id) {
          if (id.includes('node_modules/katex')) return 'katex';
          if (id.includes('/src/content/')) return 'content';
          return undefined;
        },
      },
    },
  },
});
