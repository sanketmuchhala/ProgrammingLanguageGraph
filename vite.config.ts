import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ProgrammingLanguageGraph/', // CRITICAL for GitHub Pages
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'cytoscape-vendor': ['cytoscape', 'cytoscape-cose-bilkent'],
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
  },
  publicDir: 'public', // Copies /public/dataset to /dist/dataset
});
