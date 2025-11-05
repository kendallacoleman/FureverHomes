// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',       // default output folder
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html')
    }
  },
  base: './',             // important for correct relative paths
})