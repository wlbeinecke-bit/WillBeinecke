# Portfolio site

Static HTML/CSS/JS, no build step. Deploys on GitHub Pages from `main`.

- `index.html` the site. Items in `[BRACKETS]` are placeholders to replace with real facts.
- `dashboard.html` build progress, reads `data/progress.json`.
- Preview locally: `python3 -m http.server 8000`, then open http://localhost:8000
- Add `William-Beinecke-Resume.pdf` to the repo root so the resume links work.

## Deploy

1. Create an empty repo on GitHub (no README or license).
2. `git remote add origin https://github.com/<user>/<repo>.git`
3. `git push -u origin main` (use a personal access token as the password)
4. Settings > Pages > Deploy from branch `main`, `/ (root)`.
