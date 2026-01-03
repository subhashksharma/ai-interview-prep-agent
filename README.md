# Career Buddy

A modern, responsive landing page template built with Next.js, Tailwind CSS, and Radix UI — designed to showcase AI-powered products and services with smooth animations and a clean UI.

## Live Demo

## Tech Stack

- **Framework:** Next.js
- **Styling:** Tailwind CSS
- **UI components:** Radix UI
- **Animations:** Framer Motion
- **Language:** TypeScript

## Prerequisites

- Node.js v18 or newer
- pnpm (recommended) or npm / yarn

## Quick start (local)

1. Clone this repo and install dependencies:

```bash
git clone https://github.com/subhashksharma/ai-interview-prep-agent.git ai-interview-prep
cd ai-interview-prep
npm install
# or: npm install
```

2. Run the development server:

```bash
npm dev
# or: npm run dev
```

3. Open `http://localhost:3000` in your browser.

## Build & preview (production)

```bash
pnpm build
pnpm start    # or: npm run build && npm run start
```

## Common scripts

- `dev` — start local Next.js dev server
- `build` — build for production
- `start` — run production server (after build)

Check `package.json` for the exact script names used in this repository.

## Environment & Tailwind

- Tailwind is configured via `tailwind.config.ts` and used across the app.
- If you update Tailwind config or global CSS, restart the dev server to see changes.

## Deployment

Recommended: Deploy to Vercel for optimal Next.js support. You can also use Netlify or other hosting providers.

### GitHub Pages (static export)

This project can be exported as a static site and published to GitHub Pages. Changes added in this repo:

- `next.config.mjs` includes `output: 'export'` and reads optional `NEXT_PUBLIC_BASE_PATH` / `NEXT_PUBLIC_ASSET_PREFIX`.
- A GitHub Actions workflow is added at `.github/workflows/deploy-gh-pages.yml` to build and publish the `out/` folder to the `gh-pages` branch.

Steps to verify locally and publish manually:

1. Build static files locally (produces `out/`):

```bash
# install deps (pnpm recommended)
pnpm install

# If you're hosting as a project Pages site (https://<user>.github.io/<repo>/), set these env vars
# replacing <repo> with your repository name:
# NEXT_PUBLIC_BASE_PATH=/<repo> NEXT_PUBLIC_ASSET_PREFIX=/<repo> npm run build

# Otherwise, run the standard build:
npm run build
```

2. The static files will be in the `out/` folder. You can:

- Push the contents of `out/` to a branch/folder that GitHub Pages will serve (for example, the `gh-pages` branch or the `docs/` folder on `main`).
- Or use the provided GitHub Actions workflow which will automatically build and publish `out/` to `gh-pages` when you push to `main` or manually trigger the workflow.

3. Configure GitHub Pages in your repository settings: Settings → Pages → Build and deployment → Source → select the branch (`gh-pages`) and folder (`root`) or choose the branch/folder you used.

Notes:

- If you host under a repository subpath (e.g. `https://<user>.github.io/<repo>/`), set `NEXT_PUBLIC_BASE_PATH` and `NEXT_PUBLIC_ASSET_PREFIX` before building.
- The GitHub Actions workflow sets those env vars automatically to `/${{ github.event.repository.name }}` during CI so exported assets work on project Pages.

## Contributing

- Fork the repo, create a feature branch, and open a pull request.
- Keep changes focused and include a short description of what you changed.

## License & Author

See repository metadata for license information.

Author: Subhash Kumar Sharma
