import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' để thư mục dist chạy được ở bất kỳ đường dẫn nào (GitHub Pages, Netlify, thư mục con...)
export default defineConfig({
  base: './',
  plugins: [react()],
});
