# Career Buddy

A modern, responsive landing page template built with Next.js, Tailwind CSS, and Radix UI — designed to showcase AI-powered products and services with smooth animations and a clean UI.

## Live Demo

https://codescandy.github.io/ai-agent-landing-page/

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
git clone https://github.com/codescandy/ai-agent-landing-page.git ai-agent
cd ai-agent
pnpm install
# or: npm install
```

2. Run the development server:

```bash
pnpm dev
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

Recommended: Deploy to Vercel for optimal Next.js support. You can also use Netlify or other hosting providers. For GitHub Pages, update `next.config.mjs` with `basePath` and `assetPrefix`.

## Contributing

- Fork the repo, create a feature branch, and open a pull request.
- Keep changes focused and include a short description of what you changed.

## License & Author

See repository metadata for license information.

Author: Subhash Kumar Sharma
