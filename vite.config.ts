import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Deployed as a GitHub Pages user-site at https://samsham.github.io/
// (root path), so `base` stays '/' in both dev and prod.
export default defineConfig({
  base: '/',
  plugins: [react()],
})
