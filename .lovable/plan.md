

## Dynamic Sitemap Generation

### Overview
Create a Node.js build script that fetches all published post slugs from Supabase and generates a complete `sitemap.xml` including both static pages and dynamic insight post URLs. The script runs automatically after every Vite build.

### Changes

**1. Create `scripts/generate-sitemap.mjs`**
- Fetch published posts from Supabase REST API (slug + updated_at)
- Generate sitemap XML with static pages (/, /about, /insights, /contact) plus dynamic `/insights/[slug]` entries
- Use each post's `updated_at` as `lastmod`, priority 0.6, changefreq weekly
- Write output to `dist/sitemap.xml`

**2. Update `package.json` build script**
- Change `"build"` from `"vite build"` to `"vite build && node scripts/generate-sitemap.mjs"`

**3. Remove `public/sitemap.xml`**
- No longer needed since sitemap is generated at build time into `dist/`

### Technical Details
- The script uses the Supabase REST API directly with `fetch` (no extra dependencies needed)
- The anon key and URL are read from the `.env` file or hardcoded since they're public
- The `netlify.toml` build command already points to `npm run build`, so no changes needed there

