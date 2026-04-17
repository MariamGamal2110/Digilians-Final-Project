# Final Project

React JSX project powered by Vite and styled with Tailwind CSS.

## Tech Stack

- React
- React DOM
- Vite
- Tailwind CSS
- PostCSS
- Autoprefixer

## Color Palette

The Tailwind theme includes these semantic color tokens:

- `primary`: `#362706`
- `secondary`: `#464E2E`
- `accent`: `#ACB992`
- `background`: `#E9E5D6`

Example Tailwind utilities:

- `bg-primary`
- `text-secondary`
- `border-accent`
- `bg-background`

## Installation Guide

1. Open a terminal in the project folder:

```bash
cd final-project
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

5. Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```text
final-project/
├─ src/
│  ├─ components/
│  ├─ pages/
│  ├─ App.jsx
│  ├─ index.css
│  └─ main.jsx
├─ tailwind.config.js
├─ postcss.config.js
└─ package.json
```

## Notes

- This project uses JSX only, not TypeScript.
- Tailwind content scanning is configured for `index.html` and all `src/**/*.js` and `src/**/*.jsx` files.
- The app title is set to `Final Project`.
