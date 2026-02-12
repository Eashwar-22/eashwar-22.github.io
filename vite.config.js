import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    
    // https://vitejs.dev/config/
    export default defineConfig({
      plugins: [react()],
      // This is the critical line:
      // We set the base path to '/' because this is a root domain.
      base: '/',
    })