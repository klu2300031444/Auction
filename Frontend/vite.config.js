import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// If React Fast Refresh (HMR) is causing a runtime error and blank page in
// dev, you can temporarily disable it here to confirm. Production build
// (npm run build && npm run preview) is unaffected.
export default defineConfig({
  plugins: [
    // disable fastRefresh for debugging HMR/react-refresh issues
    react({ fastRefresh: false })
  ],
  server: {
    port: 5175,
    strictPort: true, // Force port 5175, don't auto-increment to 5176
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
})
