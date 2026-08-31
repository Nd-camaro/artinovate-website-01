# Insight Article UI: Heading Rhythm + Editorial Tables

Scope: the individual Insight article renderer only (`src/routes/insights/$slug.tsx`). No SEO, content, images, routing, color-token, or other-page changes. Both fixes live in the shared renderer so all current and future articles inherit them.

## 1. League Gothic heading breathing room

Current state: article H1 uses `leading-[1.25] md:leading-[1.2]` and markdown H1/H2 use `leading-[1.3]` with tight `mt/mb` — multi-line condensed headings cluster.

Fixes in `src/routes/insights/$slug.tsx`:
- Article H1: raise line-height to `leading-[1.35] md:leading-[1.3]` and increase bottom margin so multi-line League Gothic wraps breathe like the homepage rhythm.
- Markdown H1: `leading-[1.4]`, larger top/bottom margins.
- Markdown H2: `leading-[1.35]` with more generous `mt`/`mb`.
- H3: modest line-height/margin increase for consistency.
- Font (League Gothic), font sizes, weights, and the H1 > H2 > H3 hierarchy stay exactly as-is. Body typography and the Insights listing page are untouched.

## 2. Premium editorial markdown tables

Current state: ReactMarkdown renders raw `<table>` with no component overrides, so tables inherit cramped browser defaults.

Add component overrides in the existing `components` map in `src/routes/insights/$slug.tsx` (remark-gfm already parses tables):
- `table`: wrapped in a `div` with `overflow-x-auto` (contained horizontal scroll on mobile, never page-level overflow), full width, `border-collapse`, generous vertical margins.
- `thead`/`th`: distinct header row — slightly raised graphite surface, Manrope 700 label styling, subtle bottom border using the semantic border token, restrained `text-primary` (#36F4EE) accent on header text only.
- `td`/`tr`: generous cell padding (px/py scale), top-aligned text (`align-top`), comfortable `leading-relaxed`, subtle row-separator borders (`border-border/50`), alternating/charcoal row surface kept minimal and consistent with the dark theme.
- Column widths: `table-auto` with sensible `min-w` so content dictates widths; no fixed pixel columns.
- All styling via existing semantic tokens (graphite, border, primary, muted-foreground) — no new colors introduced.

## Verification

- Typecheck/build OK.
- Playwright pass at 1280px desktop and 390px mobile on a published article containing a multi-line heading and a 3-column table: confirm heading line-height/spacing visually, table structure (header row, padding, borders, top alignment), and contained horizontal scroll on mobile with zero page-level horizontal overflow (`document.documentElement.scrollWidth <= innerWidth`).
- Spot-check the Insights listing page and homepage remain unchanged.
