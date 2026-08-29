# Revised Architecture: Lovable-Native SSR, No Netlify

Answering the two questions first, then the revised order.

## Q1 — Can this project get real SSR on Lovable?

Yes. This is a Lovable Classic project (Vite 5 + React 18 + React Router + shadcn), which is exactly the eligible input for Lovable's built-in "Migrate to TanStack Start" upgrade. TanStack Start renders on the server, so `/insights/:slug` returns fully-formed HTML — title, description, canonical, `og:*`, `twitter:*` and Article/FAQ JSON-LD all present in the initial response before any JS runs. That satisfies every stated priority: Googlebot, LinkedIn, X, WhatsApp and Slack all get the correct post-specific preview, and no critical metadata depends on client JS.

Mechanically, each route file exposes a `loader` and a `head()`:

```
export const Route = createFileRoute('/insights/$slug')({
  loader: ({ params }) => fetchPost(params.slug),
  head: ({ loaderData }) => ({
    meta: [ title, description, og:*, twitter:* ],
    links: [ canonical ],
    scripts: [ Article JSON-LD, FAQ JSON-LD ],
  }),
})
```

That is a one-for-one, strictly better replacement for `netlify/edge-functions/inject-meta.ts` — same data source (Supabase), same output, but rendered by the framework instead of string-replaced into a shell by a third-party edge runtime.

Prerendering is also available on the same stack for pages that never change per-request, but SSR is the right default here because insight posts come from Supabase and change without a rebuild.

## Q2 — Native server-side redirects?

Yes. TanStack Start supports true HTTP redirects from the server. Throwing `redirect({ to, statusCode: 301 })` from a route's `beforeLoad` during SSR produces a real 301 response with a `Location` header — not a client-side `<Navigate>`. So the 9 legacy insight slugs get proper 301s, equivalent to what `netlify.toml` does today. Client-side `<Navigate>` is dropped from the plan entirely.

Implementation: one route (or a small slug→slug map consulted in the `/insights/$slug` route's `beforeLoad`) that throws a 301 redirect when the incoming slug is in the legacy set. The existing `REDIRECTED_SLUGS` denylist in `scripts/generate-sitemap.mjs` becomes the shared source of truth.

## Revised architecture (end state)

| Concern | Handled by |
|---|---|
| Hosting / build / deploy | Lovable |
| SPA fallback | N/A — server-rendered routes |
| Homepage title, description, canonical, OG, Twitter | `head()` in the index route |
| Organization + Service JSON-LD | `head()` scripts on `__root` / index route |
| Insight post title, description, canonical, OG, Twitter | `head()` in `/insights/$slug`, from the loader's Supabase data |
| Article + FAQ JSON-LD | `head()` scripts in `/insights/$slug` |
| Static-route canonicals (`/about`, `/contact`, `/insights`, `/privacy`) | `head()` per route (replaces both the edge function and `useDocumentHead`) |
| 9 legacy 301s | Server-thrown `redirect(..., 301)` |
| Sitemap | `scripts/generate-sitemap.mjs`, unchanged |
| Netlify | Removed entirely |

## Revised migration order

**Phase 1 — Upgrade the stack (do this first).**
1. Run the TanStack Start migration. It rewrites entry points, converts the 6 routes in `src/App.tsx` to file routes, and carries `index.html`'s head tags, analytics and JSON-LD into `__root.tsx`. Netlify files are left untouched at this stage — nothing is removed until SSR output is verified.
2. Verify the build is green and the app renders as before (hero video, typewriter, glass-cube rotation, scheduling modal, chat widget, Supabase queries).

**Phase 2 — Move metadata into SSR.**
3. Port `/insights/$slug`: loader fetches the post from Supabase; `head()` emits meta_title, meta_description, canonical_url, `og:*`, `twitter:*`, Article JSON-LD and FAQ JSON-LD. Retire `useDocumentHead` on this route and the inline `<script>` JSON-LD currently in `InsightDetail.tsx`.
4. Port `/about`, `/contact`, `/insights`, `/privacy` to `head()` and retire `useDocumentHead` there too (or keep the hook only as a thin fallback — cleaner to remove it).
5. Port the homepage `head()`: this is where the SEO repositioning lands — title `Web3 Website Design Agency | ArtiNovate`, the new meta description, canonical, mirrored OG/Twitter, plus Organization and Service JSON-LD.

**Phase 3 — Redirects.**
6. Implement the 9 legacy slugs as server 301s and confirm each returns `HTTP/1.1 301` with the right `Location` (curl, no JS).

**Phase 4 — Verify, then remove Netlify.**
7. Publish. Verify with `curl` (JS disabled) on `/`, `/insights`, one insight post, and each legacy URL: correct `<title>`, description, canonical, `og:*`, `twitter:*`, JSON-LD in the raw HTML; 301s resolving.
8. Validate one post in Google's Rich Results Test and in LinkedIn/X post inspectors.
9. Only now delete `netlify.toml`, `netlify/edge-functions/inject-meta.ts`, and `public/_redirects`.
10. Re-submit the sitemap in Search Console and request re-indexing of the homepage.

**Phase 5 — Homepage on-page copy.**
11. Apply the on-page semantic work from the earlier SEO plan (ProblemSection heading + supporting paragraph establishing Web3 website design, one supporting line under "One system. Three functions.").

## Risks

- **Migration is the largest change here.** It rewrites entry points, moves to React 19 / Tailwind v4, and flips TypeScript to strict. Expect a build-error pass. It is reversible from chat history.
- **Tailwind v4 visual regressions**: `shadow`/`rounded`/`ring`/`outline-none` scale renames and custom token porting can shift the design subtly. The hero glass-cube CSS, `.section-heading`, `.section-cluster` and `.glass-frag` keyframes in `src/index.css` all need explicit porting into the new `styles.css` and visual verification.
- **Framer Motion and the hero video** run client-side; they need SSR-safety checks (`window`/`sessionStorage` access in `HeroSection.tsx` is already inside effects, which is correct, but must be re-verified).
- **Voiceflow chat widget** injects a script — needs to move into the root route's `scripts` or stay in a client effect.
- **Netlify removal is last on purpose.** Removing it before Phase 4 passes would silently drop post canonicals and previews.
- **Indexing lag**: expect a few weeks for Google to reprocess after the homepage retitle and the SSR switch.

## Recommendation

Run the TanStack Start migration first, then move all metadata into `head()`, then server 301s, then delete Netlify. The homepage SEO repositioning is folded into step 5 rather than done twice.
