# Shudhanshu Jaiswal — Portfolio

A minimal, editorial portfolio site built with Vite, React, TypeScript, and Tailwind CSS. Designed for deployment to [GitHub Pages](https://shudhanshu097.github.io/).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build

```bash
npm run build
npm run preview
```

## Editing content

All site copy lives in `src/content.ts`. Update text, links, projects, and skills there without touching component code.

Add your resume PDF to `public/resume.pdf` — the Hero links to `/resume.pdf`.

## Deploy to GitHub Pages

This project is configured for a **user site** at `shudhanshu097.github.io` with `base: '/'` in `vite.config.ts`.

### First-time setup

1. Push this repo to `github.com/shudhanshu097/shudhanshu097.github.io` (or your chosen repo).
2. In the repo **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main` — the workflow in `.github/workflows/deploy.yml` builds and deploys automatically.

### Project site (subpath)

If deploying to a project repo instead (e.g. `github.com/shudhanshu097/portfolio`), update `base` in `vite.config.ts`:

```ts
base: '/portfolio/',
```

## Tech stack

- Vite + React 18 + TypeScript
- Tailwind CSS v4
- Framer Motion
- Lenis (smooth scroll)
- Lucide React (icons)

## Project structure

```
src/
  content.ts          # All editable site content
  components/         # Section components
  hooks/              # useReducedMotion, etc.
```

## License

Personal portfolio — all rights reserved.
