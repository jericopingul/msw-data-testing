import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': { target: 'http://my.server/api', changeOrigin: true },
    },
  },
  // @ts-ignore
  test: {
    global: true,
    environment: 'jsdom',
  },
});
