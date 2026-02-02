import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Configuración para desplegar en GitHub Pages (base y build)
  base : '/PaginaOpel/',
  build: {
    outDir : 'docs'
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://www.ies-azarquiel.es/paco/apiopel',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
