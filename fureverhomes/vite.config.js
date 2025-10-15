import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  root: '.', // current folder
  build: {
    outDir: 'static/js', // output goes to Django static folder
    rollupOptions: {
      input: 'index.html', // Vite entry HTML
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
});
