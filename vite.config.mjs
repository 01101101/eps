import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { join, resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig(() => ({
  root: 'src',
  plugins: [react(), tailwindcss()],
  server: { port: 8080 },
  resolve: {
    alias: {
      '~': resolve(join(import.meta.dirname, 'src')),
    },
  },
  build: {
    outDir: resolve(import.meta.dirname, 'build'),
    emptyOutDir: true,
  },
}));
