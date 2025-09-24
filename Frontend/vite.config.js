
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   base: '/', // Simple base URL that works everywhere
//   build: {
//     outDir: '../dist',
//     emptyOutDir: true
//   }
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    proxy: {
      // Forward /Backend/* calls to Laragon Apache
      "/Backend": {
        target: "http://localhost/IT_Repairs",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/Backend/, "/Backend")
      }
    }
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true
  }
});
// This configuration ensures that API calls to /Backend/* are correctly proxied to the backend server during development.
