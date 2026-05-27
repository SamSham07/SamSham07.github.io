import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// `base` is '/MyProfile/' in production so assets resolve under
// https://samsham07.github.io/MyProfile/, and '/' in dev for `vite`.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/MyProfile/' : '/',
  plugins: [react()],
}))
