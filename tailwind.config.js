/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2f2a1f',
        secondary: '#676b59',
        accent: '#7a8b5b',
        background: '#f3f4ef',
      },
      fontFamily: {
        headline: ['Cairo', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}