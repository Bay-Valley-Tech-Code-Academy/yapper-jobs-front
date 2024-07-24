import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/delete-user': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
      },
      '/delete': {
        target: 'http://localhost:3000', 
        changeOrigin: true,
      },
    },
  },
});
