# Shopping List — AGENTS.md

## Architecture

- **Single-page app** — all HTML, CSS, JS in `index.html`. No build system, no bundler, no framework.
- **GitHub Pages** — site lives at `https://codeguy0425.github.io/shoppinglist/`. Push to `master` to deploy.
- **PWA** — `sw.js` caches `/`, `/index.html`, `/manifest.json` cache-first. Hard refresh or clear cache to see changes after deploy.

## Key Conventions

- **i18n** — all user-facing text uses `data-i18n` attributes and `t(key)` calls. Add entries to both `en` and `zh` objects in the `t()` function.
- **SVG icons** — all buttons use inline `<svg>`, no icon libraries.
- **Table layout** — items table uses `table-layout: fixed` with explicit column widths to prevent inline editing from shifting other rows.
- **No external dependencies** — no CDN scripts, no npm packages. Everything is vanilla.
- **Storage** — all data persists in `localStorage` under `shopping_data` key. No backend.

## Development

- No dev server needed, just open `index.html` in a browser.
- No tests exist.
- Service worker registers automatically on page load. During development, use a Private/Incognito window or unregister the SW in DevTools to avoid stale cache.<｜end▁of▁thinking｜><｜｜DSML｜｜parameter name="command" string="true">git add -A; if ($?) { git commit -m "Add AGENTS.md" }; if ($?) { git push }