import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/planetwander/',
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    host: "0.0.0.0", // Explicitly bind to all network interfaces
    port: 5173, // Dev server port
  },
  preview: {
    host: "0.0.0.0", // Explicitly bind for preview mode
    port: 4173, // Preview server port
  }
})