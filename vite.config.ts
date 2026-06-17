import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Deployed at https://kylson-tech.com/my-portfolio
export default defineConfig({
  base: '/my-portfolio/',
  plugins: [react()],
})
