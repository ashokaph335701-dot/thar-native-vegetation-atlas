import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name]-v${Date.now()}.js`,
        chunkFileNames: `assets/[name]-v${Date.now()}.js`,
        assetFileNames: `assets/[name]-v${Date.now()}[extname]`
      }
    }
  },
  server: {
    port: 3000,
    host: true
  }
});
