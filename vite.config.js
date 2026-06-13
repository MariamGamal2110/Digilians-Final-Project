import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiBaseUrl = env.VITE_API_BASE_URL || 'http://localhost:5000/api'

  return {
    plugins: [react()],
    define: {
      'process.env.API_BASE_URL': JSON.stringify(apiBaseUrl),
    },
  }
})
