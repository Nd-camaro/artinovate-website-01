

## Move Article JSON-LD from useDocumentHead to Inline JSX

### Problem
The Article JSON-LD is injected client-side via `useDocumentHead`, which runs after render. Crawlers (including Google Rich Results Test) don't execute JS, so they never see the schema.

### Changes (single file: `src/pages/InsightDetail.tsx`)

**1. Remove Article schema from `jsonLd` useMemo (lines 68-108)**
- Keep only FAQ schema logic; pass only `faqSchema` (or `null`) to `useDocumentHead`
- The `articleSchema` variable and its construction are removed from this block

**2. Stop passing Article JSON-LD to useDocumentHead (line 114)**
- `jsonLd` will now only contain FAQ schema (or null), not the Article schema

**3. Add inline `<script>` tag in JSX return (after line 150)**
- Place a `<script type="application/ld+json" dangerouslySetInnerHTML={...} />` immediately after the opening `<div>` wrapper, before `<Navigation />`
- Uses the exact Article schema structure with `insight.title`, `insight.excerpt`, `insight.featured_image_url`, `insight.published_at`, and `insight.slug`
- This renders as static HTML in the DOM, visible to crawlers even without JS execution

### Result
- Article schema appears in the raw HTML response (and in the Netlify Edge Function's rewritten output)
- FAQ schema continues to be injected via `useDocumentHead` (acceptable since it's supplementary)
- No other files change

