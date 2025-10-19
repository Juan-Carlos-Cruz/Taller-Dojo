import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    watch: {
      usePolling: true,
      interval: 200,
      ignored: ['**/node_modules/**', '**/.git/**', '**/dist/**']
    }
  }
})
