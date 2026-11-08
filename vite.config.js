import { defineConfig } from 'vite';

// GitHub Pages 地址为 https://yee249235.github.io/green-star-academy/
export default defineConfig({
  base: '/green-star-academy/',
  build: {
    outDir: 'dist',
    target: 'es2020',
  },
});
