/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fredoka: ['Fredoka', 'sans-serif'],
      },
      colors: {
        pastel: {
          pink: '#FFB5C2',
          peach: '#FFD9B5',
          yellow: '#FFF9B5',
          mint: '#B5FFD9',
          sky: '#B5D9FF',
          lavender: '#D9B5FF',
        },
      },
    },
  },
  plugins: [],
}