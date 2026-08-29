# Netlify Dependency Audit — Migration to Lovable-Native Hosting

Audit only. Nothing is changed by this document.

## 1. Current Netlify dependencies

| # | Item | Location |
|---|---|---|
| 1 | Build/publish config | `netlify.toml` `[build]` (`npm run build`, publish `dist`) |
| 2 | Edge function registration | `netlify.toml` `[[edge_functions]]` for `/` and `/insights/*` |
| 3 | Edge function code | `netlify/edge-functions/inject-meta.ts` |
| 4 | 301 redirects | `netlify.toml` — 9 legacy insight slugs |
| 5 | SPA fallback | `public/_redirects` (`/* /index.html 200`) |
| 6 | Headers | None defined anywhere (no `[[headers]]`, no `_headers` file) |
| 7 | Environment variables | None Netlify-specific. Supabase URL and anon key are hardcoded in the edge function and in `scripts/generate-sitemap.mjs`; app vars live in `.env` as `VITE_*` |
| 8 | Deployment-specific logic | Only the sitemap step inside `npm run build` writing `dist/sitemap.xml` — host-agnostic |

## 2. What each one does

- **Edge function, homepage branch**: injects Organization JSON-LD into `/`.
- **Edge function, static routes**: rewrites `<link rel="canonical">` for `/about`, `/contact`, `/insights`.
- **Edge function, insight posts**: fetches the post from Supabase and server-rewrites `<title>`, `meta description`, canonical, strips shell JSON-LD, injects FAQ + Article JSON-LD. This is the only genuinely server-side capability in the project — it is what makes per-post social previews and crawler-visible post titles work without JS.
- **Redirects**: consolidate 9 duplicate/off-topic legacy insight URLs onto canonical posts; the same slugs are also excluded from the sitemap denylist in `scripts/generate-sitemap.mjs`.
- **`public/_redirects`**: SPA deep-link fallback.
- **Client-side head**: `src/hooks/useDocumentHead.ts` already sets title, description, canonical, `og:*`, `twitter:*` and JSON-LD per route on `/about`, `/contact`, `/insights`, `/insights/:slug`, `/privacy`. The homepage currently gets everything from static `index.html`.

## 3. Still required?

| Dependency | Still required |
|---|---|
| `netlify.toml` build block | No — Lovable builds and serves `dist` itself |
| Edge function: homepage Organization JSON-LD | No — can live statically in `index.html` |
| Edge function: static-route canonicals | No — `useDocumentHead` already sets these client-side; Googlebot executes JS |
| Edge function: insight-post meta/JSON-LD | Partly — Googlebot is fine without it, but non-JS social crawlers (LinkedIn, Slack, X, Facebook) will fall back to the sitewide preview |
| 9 x 301 redirects | Yes, functionally — old URLs are indexed and need to keep resolving |
| `public/_redirects` | No — Lovable hosting has built-in SPA fallback (harmless to keep) |
| Headers / env vars | N/A — none exist |

## 4. Lovable-native replacement for each

1. **Homepage SEO (title, description, canonical, OG, Twitter, Organization + Service JSON-LD)** — put all of it statically in `index.html`. This is strictly better than the edge function: it is visible to every crawler including non-JS ones, with no runtime dependency. Service JSON-LD and FAQ JSON-LD are already there; Organization JSON-LD moves in from the edge function.
2. **Static-route canonicals (`/about`, `/contact`, `/insights`)** — already handled by `useDocumentHead`; no work needed beyond confirming each page passes the right `canonicalUrl`.
3. **Insight-post metadata** — `useDocumentHead` in `src/pages/InsightDetail.tsx` already applies title/description/canonical/JSON-LD after data loads. Accepted trade-off: social-preview crawlers see the sitewide preview instead of the per-post one. If per-post social previews are a hard requirement, the clean answer is real SSR by upgrading to Lovable's latest template ([what the upgrade gives you](https://lovable.dev/blog/building-apps-using-tanstack-start)) — not keeping Netlify around for one function.
4. **301 redirects** — Lovable static hosting has no redirect config file. The Lovable-native equivalent is a client-side redirect route: a small route table of the 9 legacy slugs mapped to their canonical slug, rendered by a `<Navigate replace>` in the React Router config. It is a 200-then-JS-redirect rather than a true 301, so Google consolidates more slowly, but the slugs are already excluded from the sitemap and have low link equity. Alternative if a true 301 matters: keep DNS on a redirect-capable layer, or use Cloudflare rules in front of the Lovable domain.
5. **SPA fallback** — drop `public/_redirects` or leave it; Lovable handles it natively.
6. **Sitemap** — unchanged; `scripts/generate-sitemap.mjs` runs in `npm run build` and is host-agnostic.
7. **Supabase keys in the edge function** — disappear with the function. The build script keeps its own copy of the publishable anon key, which is fine.

## 5. Safest migration order

1. Move the Organization JSON-LD from the edge function into `index.html` (additive, no removals).
2. Confirm `/about`, `/contact`, `/insights`, `/privacy` and `/insights/:slug` each set title, description, canonical, OG/Twitter and JSON-LD through `useDocumentHead` — patch any gaps.
3. Add the 9 legacy-slug redirect routes in React Router and verify each resolves to the canonical post.
4. Publish through Lovable and verify live: view-source on `/` and one insight post, check canonical, OG tags, JSON-LD via Rich Results Test, and hit all 9 legacy URLs.
5. Only after step 4 passes: delete `netlify.toml` and `netlify/edge-functions/inject-meta.ts`. Optionally remove `public/_redirects`.
6. Point the custom domain fully at Lovable and re-submit the sitemap in Search Console.

## 6. Risks

- **Social previews for insight posts** (highest-impact): non-JS crawlers lose per-post title/description/image. Mitigation: accept the sitewide preview, or move to SSR.
- **Redirect strength**: JS redirects are weaker than 301s for consolidating the 9 legacy URLs. Low practical risk — they are already out of the sitemap.
- **Canonical rendering**: if a page ships without a `canonicalUrl`, it inherits the homepage canonical from `index.html`, which would mis-attribute the page. Step 2 exists to prevent this.
- **Duplicate JSON-LD**: `useDocumentHead` strips existing JSON-LD when a route supplies its own — moving Organization schema into `index.html` is safe, but verify the homepage does not end up with two Organization blocks.
- **Deployment**: none material — Lovable already builds this project; the `netlify.toml` build block is redundant.
- **Deleting the edge function before verification** would silently drop post canonicals for crawlers, which is why removal is last.

## Recommendation

Netlify is not required. One capability (server-rendered per-post metadata) genuinely degrades; everything else is equal or better handled natively. Proceed with the order above, then return to the homepage SEO repositioning work — which becomes simpler, since all homepage metadata will live in one place (`index.html`).
