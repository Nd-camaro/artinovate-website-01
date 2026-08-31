# Insight Article Renderer: Heading Rhythm + Robust Editorial Tables

Scope: the shared individual-Insight article renderer only (`src/routes/insights/$slug.tsx`, the `ReactMarkdown` components map that every article uses). No article content, SEO, featured images, routing, global colors, or other-page changes. Insights listing and homepage untouched.

## 1. League Gothic heading breathing room

Current: article H1 at `leading-[1.25]/[1.2]`, markdown H1/H2 at `leading-[1.3]` — multi-line condensed headings cluster.

In `src/routes/insights/$slug.tsx` only:
- Article H1: line-height up to `leading-[1.35] md:leading-[1.3]`, slightly larger bottom margin.
- Markdown H1 → `leading-[1.4]`; H2 → `leading-[1.35]`; H3 → `leading-[1.4]`, each with more generous `mt`/`mb` so wrapped League Gothic headings breathe like the homepage rhythm.
- League Gothic, font sizes, weights, and H1 > H2 > H3 hierarchy unchanged. Body typography untouched.

## 2. Robust dynamic markdown tables (any column count)

Add `table`, `thead`, `tbody`, `tr`, `th`, `td` overrides to the existing ReactMarkdown `components` map (remark-gfm already parses tables). Styling must work for any valid table shape, not just the current 3-column example:

Structure & responsiveness:
- Table wrapped in a `div.overflow-x-auto` with a subtle border/rounded container — wide tables scroll horizontally *inside* the wrapper; page-level horizontal overflow is impossible (verify `scrollWidth <= innerWidth`).
- `table` uses `w-full` + `min-w` floor on cells (e.g. `min-w-[10rem]` on `td/th`) so columns are never squeezed into unreadability — below the floor the wrapper scrolls instead.
- Content-driven widths: `table-auto`, no fixed pixel columns; narrow tables fit naturally, wide ones scroll.
- Long URLs / unbroken strings: `break-words` (`overflow-wrap: anywhere` on cells) so long tokens wrap instead of blowing out the layout.
- Semantic table structure preserved (real table/thead/tbody/tr/th/td elements).

Editorial dark styling (existing semantic tokens only, no new colors):
- Header row: raised graphite surface, Manrope 700 uppercase-ish label treatment, subtle bottom border, restrained `text-primary` (#36F4EE) accent on header cells only.
- Body cells: generous padding, `align-top`, `leading-relaxed` for comfortable wrapping.
- Row separation: subtle `border-border/50` row dividers; faint graphite tint on alternate rows at most.
- Comfortable vertical margins around the whole table block.

## Verification

- Build OK.
- Playwright at 1280px and 390px on a live published article with a multi-line heading and the 3-column table (e.g. the advisory-firms infrastructure article): confirm heading rhythm, header hierarchy, padding, top alignment, contained scroll, no page-level overflow.
- Also exercise a synthetic wide/long-content case (e.g. inject a 5–6 column table with a long unbroken URL via the page DOM or a test post) to confirm the scroll wrapper and `break-words` behavior without squeezing.
- Spot-check Insights listing and homepage unchanged.
