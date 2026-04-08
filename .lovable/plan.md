

## SEO Fixes: Sitemap, Denylist, and Canonical Tags

### Fix 1 — Delete `public/sitemap.xml`
Remove the stale static file. The build script generates the correct one at `dist/sitemap.xml`.

### Fix 2 — Add denylist to `scripts/generate-sitemap.mjs`
Insert a `REDIRECTED_SLUGS` set containing the 9 redirected slugs. Filter fetched posts against this set before writing URLs. The `SITE_URL` is already `https://www.artinovate.com` so no domain change needed.

### Fix 3 — Expand `netlify/edge-functions/inject-meta.ts` for static routes
After the homepage block (line 42) and before the `/insights/:slug` block (line 44), add a handler for `/about`, `/contact`, and `/insights`:
- Match `pathname` against a map of `{ "/about": "https://www.artinovate.com/about", ... }`
- Get the response HTML via `context.next()`
- Replace the existing `<link rel="canonical" ...>` with the correct URL
- Return the modified response

No other files are touched. The edge function's homepage and insight-slug logic remain unchanged.

### Files modified
1. **Delete**: `public/sitemap.xml`
2. **Edit**: `scripts/generate-sitemap.mjs` — add slug denylist filter
3. **Edit**: `netlify/edge-functions/inject-meta.ts` — add static route canonical injection

