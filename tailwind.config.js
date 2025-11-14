/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // This adds the 'Inter' font we used
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}