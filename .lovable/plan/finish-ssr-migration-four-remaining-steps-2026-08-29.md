# Finish SSR Migration — Four Remaining Steps

## Current state
Build OK, typecheck clean (0 errors), dev server 200. Nothing is blocking the preview. All routes, SSR metadata, 301 redirects and the sitemap are already live.

## Step 1 — Fix the FAQ schema source
Inspected `insight_posts`: it has no FAQ column (columns are author_id, canonical_url, content, created_at, excerpt, featured_image_alt, featured_image_url, id, meta_description, meta_title, published_at, reading_time, slug, status, target_keyword, title, topic_id, updated_at).

Action in `src/routes/insights/$slug.tsx`:
- Drop the `faq_json_ld` field from the local `InsightPost` interface
- Delete the `parseFaqSchema` helper and its call in `head()`
- Article JSON-LD stays exactly as-is

No database change, no fabricated FAQ data.

## Step 2 — Remaining verification
- Probe `/contact` (200, correct SSR title/canonical)
- Probe a 404 URL and assert the HTTP status is a real **404** (not a Not Found page returning 200). The current `src/routes/$.tsx` splat renders the NotFound component with a 200 status, so as part of this step: remove the splat route and register `notFoundComponent` on `__root.tsx` (which returns true 404 status for unmatched URLs), then re-probe.
- Probe one insight detail page end-to-end (200, Article JSON-LD present)
- Read runtime/console logs for hydration errors
- Re-run `bun run build` and `tsc --noEmit`

## Step 3 — Flip the pipeline
Only if every check passes: write `.lovable/project.json` with `{"schemaVersion": 1, "template": "tanstack_start_ts_current"}`, read it back, and record migration completion.

## Step 4 — Remove Netlify
Only after Step 3: delete `netlify/`, `netlify.toml`, `public/_redirects`.

## Out of scope
No refactors, redesigns, copy changes, dependency upgrades, compat-shim rewrites, Supabase schema changes, new features, or cleanup beyond the four steps above.
