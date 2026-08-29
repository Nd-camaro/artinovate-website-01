# Finish SSR Migration — Minimal Completion Path

## Goal
Complete the already-executed TanStack Start migration with the fewest remaining edits. No refactoring, no redesign, no optional cleanup.

## Current state
- Build: OK (latest log entry clean). Typecheck: 0 errors. Dev server: 200.
- All routes migrated, SSR metadata live, 301 redirects verified, sitemap serving.
- Nothing is currently blocking the preview.

## Remaining steps (in order)

1. **Fix FAQ schema source** — `parseFaqSchema` reads `post.faq_json_ld`, but that column does not exist in `insight_posts`. Point it at the real FAQ column (or remove the branch if no FAQ data exists in the table). One small edit in `src/routes/insights/$slug.tsx`.
2. **Finish verification gates** — probe `/contact`, a 404 URL, and a detail page end-to-end; check runtime errors log for hydration issues.
3. **Flip the deploy pipeline** — write `.lovable/project.json` (`tanstack_start_ts_current`) and record migration completion.
4. **Remove Netlify artifacts** — delete `netlify/`, `netlify.toml`, `public/_redirects` after the above pass.

## Explicitly out of scope
- Any component redesign or copy changes
- Dependency upgrades beyond what the migration requires
- Native TanStack rewrite of compat-shim imports (optional follow-up)
