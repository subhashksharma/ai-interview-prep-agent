# 🚀 GitHub Pages Deployment Guide

## Current Setup

Your Next.js app is configured for **GitHub Pages** deployment using:

- **Static Export**: `output: 'export'` in next.config.mjs
- **Automated Deployment**: GitHub Actions workflow
- **Hosting Path**: `docs/` folder on `main` branch

## 📋 One-Time Setup (Do This First!)

### 1. Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/docs`
4. Click **Save**

### 2. Verify Repository Settings

Your repository name is used in the URL:

```
https://subhashksharma.github.io/ai-interview-prep-agent/
```

If you want a cleaner URL like `https://subhashksharma.github.io/`, rename your repository to `subhashksharma.github.io`

## 🔄 Deployment Process

### Automatic Deployment

Every push to `main` branch automatically:

1. ✅ Installs dependencies
2. ✅ Builds the Next.js app with proper base paths
3. ✅ Exports static files to `out/`
4. ✅ Copies to `docs/` folder
5. ✅ Commits and pushes to `main`
6. ✅ GitHub Pages serves from `docs/`

### Manual Deployment

Trigger manually from GitHub:

1. Go to **Actions** tab
2. Select **Build and Deploy to GitHub Pages**
3. Click **Run workflow**

## 🔧 Local Testing

Test the production build locally:

```bash
# Build with GitHub Pages configuration
NEXT_PUBLIC_BASE_PATH=/ai-interview-prep-agent NEXT_PUBLIC_ASSET_PREFIX=/ai-interview-prep-agent npm run build

# Serve the built files
npx serve out
```

## 🐛 Troubleshooting

### Build Fails

1. **Check Node version**: Workflow uses Node 20

   ```bash
   node --version  # Should be 18+ locally
   ```

2. **Check for TypeScript errors**:

   ```bash
   npm run build
   ```

3. **Check Actions logs**: Go to GitHub **Actions** tab

### Site Not Loading

1. **Verify GitHub Pages is enabled** (Settings → Pages)
2. **Check docs/ folder exists** in your repository
3. **Wait 1-2 minutes** after deployment for changes to appear
4. **Clear browser cache**: Hard refresh (Cmd+Shift+R)

### Assets Not Loading (404 errors)

If images/CSS/JS fail to load:

- Ensure `basePath` and `assetPrefix` are set in next.config.mjs
- Check that environment variables are passed in GitHub Actions

### CSS/Styling Issues

If Tailwind styles are missing:

```bash
# Rebuild with production environment
NODE_ENV=production npm run build
```

## 📁 Important Files

- `.github/workflows/deploy-gh-pages.yml` - Deployment workflow
- `next.config.mjs` - Next.js configuration for static export
- `public/.nojekyll` - Prevents Jekyll processing
- `docs/` - **Auto-generated** (don't edit manually!)

## 🎯 Next Steps

1. **Push to main**:

   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. **Monitor deployment**:

   - Go to **Actions** tab on GitHub
   - Watch the workflow run
   - Should complete in ~2-3 minutes

3. **Visit your site**:

   ```
   https://subhashksharma.github.io/ai-interview-prep-agent/
   ```

4. **Optional**: Set up custom domain in Settings → Pages

## ⚠️ Important Notes

- The `docs/` folder is **auto-generated** - never edit manually
- Workflow includes `[skip ci]` to prevent infinite loops
- Static export means no API routes or server-side features
- All routes are pre-rendered at build time

## 🔐 Permissions

The workflow needs `contents: write` permission (already configured).
If deployment fails with permission errors:

1. Go to Settings → Actions → General
2. Under "Workflow permissions", select "Read and write permissions"
3. Save and re-run the workflow

---

**Need help?** Check the Actions logs for detailed error messages.
