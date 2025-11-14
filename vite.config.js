import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// [https://vitejs.dev/config/](https://vitejs.dev/config/)
export default defineConfig({
  plugins: [react()],
  // Set the base path for GitHub Pages.
  // Since your repo is eashwar-22.github.io, this should be "/"
  base: '/', 
})