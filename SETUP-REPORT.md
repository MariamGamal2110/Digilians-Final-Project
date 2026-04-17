# Final Project Setup Report

## Summary

- Created a new Vite React JSX project in `final-project`.
- Installed React, React DOM, Vite, Tailwind CSS, PostCSS, and Autoprefixer.
- Configured Tailwind CSS content scanning and semantic color tokens.
- Replaced the default starter with a minimal verification screen that uses the configured Tailwind palette.
- Verified the project builds successfully and the dev server starts at `http://127.0.0.1:4173/`.

## Tailwind Color Mapping

- `primary`: `#362706`
- `secondary`: `#464E2E`
- `accent`: `#ACB992`
- `background`: `#E9E5D6`

## Key Files

- `tailwind.config.js`: Tailwind content globs and semantic color palette.
- `postcss.config.js`: Tailwind CSS and Autoprefixer PostCSS plugins.
- `src/index.css`: Tailwind directives and global base styles.
- `src/App.jsx`: Minimal starter screen that verifies semantic Tailwind utilities.
- `src/main.jsx`: Imports the global stylesheet and mounts the React app.
- `index.html`: Updated app title to `Final Project`.
- Removed unused Vite starter assets and boilerplate CSS.

## Commands

```bash
npm install
npm run dev
npm run build
```
