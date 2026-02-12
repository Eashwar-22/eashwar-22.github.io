/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: '#18181b', // zinc-950
        secondary: '#71717a', // zinc-500
        background: '#ffffff',
        surface: '#fafafa', // zinc-50
      }
    },
  },
  plugins: [],
}