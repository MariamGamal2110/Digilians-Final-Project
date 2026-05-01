/** @type {import('tailwindcss').Config} */
export default {
 content: ['./index.html', './src/**/*.{js,jsx}'],
 theme: {
 extend: {
 colors: {
 primary: 'hashtag#2f2a1f',
 secondary: 'hashtag#676b59',
 accent: 'hashtag#7a8b5b',
 background: 'hashtag#f3f4ef',
 surface: 'rgb(var(--surface) / <alpha-value>)',
 'on-surface': 'rgb(var(--on-surface) / <alpha-value>)',
 'surface-container': 'rgb(var(--surface-container) / <alpha-value>)',
 'surface-container-low': 'rgb(var(--surface-container-low) / <alpha-value>)',
 'surface-container-high': 'rgb(var(--surface-container-high) / <alpha-value>)',
 'surface-dim': 'rgb(var(--surface-dim) / <alpha-value>)',
 'outline-variant': 'rgb(var(--outline-variant) / <alpha-value>)',
 'primary-container': 'rgb(var(--primary-container) / <alpha-value>)',
 'on-primary-container': 'rgb(var(--on-primary-container) / <alpha-value>)',
 },
 fontFamily: {
 headline: ['Cairo', 'Segoe UI', 'sans-serif'],
 },
 },
 },
 plugins: [],
}