/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#362706',
        secondary: '#464E2E',
        accent: '#ACB992',
        background: '#E9E5D6',
      },
    },
  },
  plugins: [],
}
