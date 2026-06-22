import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Deployed at https://samsham07.github.io/
export default defineConfig({
  base: '/',
  plugins: [react()],
})
