# Homepage SEO Repositioning — "Web3 Website Design Agency"

## Goal
Reposition the homepage for the "Web3 website design agency" search category while keeping the visible premium brand positioning and the entire design untouched (hero video, animations, layout, typography, colors, CTA placement all unchanged).

## Current state (verified)
- `src/routes/index.tsx` already carries the new title/description, og/twitter mirrors, and canonical `https://www.artinovate.com/`.
- Organization JSON-LD lives once in `src/routes/__root.tsx`. No Service JSON-LD exists yet.
- `ProblemSection` heading currently reads "Most digital operations lack real infrastructure" and has no supporting paragraph.
- `CoreFunctionsSection` heading is "One system. Three functions." with no supporting line.

## Changes

### 1. Metadata — `src/routes/index.tsx` (mostly already in place)
- Confirm title: `Web3 Website Design Agency | ArtiNovate` and the specified description, mirrored to og:title, og:description, twitter:title, twitter:description.
- Keep the single existing canonical and existing social-image handling unchanged.

### 2. Service JSON-LD — `src/routes/index.tsx` head() `scripts`
Add one homepage-only Service schema:
- `@type: "Service"`, `name: "Premium Web3 Website Design"`
- `description: "ArtiNovate designs AI-powered Web3 websites for digital asset, tokenization, DeFi and fintech companies, combining publishing, visitor engagement and lead capture in one digital presence system."`
- `provider` referencing the existing ArtiNovate Organization via stable `@id` `https://www.artinovate.com/#organization` so it links to — not duplicates — the root Organization block.
- Also update the Organization schema in `src/routes/__root.tsx` to include `"@id": "https://www.artinovate.com/#organization"` (and matching `url` `https://www.artinovate.com`) so both blocks resolve to the same entity.

### 3. ProblemSection — `src/components/ProblemSection.tsx`
- Change heading text to: `Most Web3 websites go quiet after launch` (same `section-heading` styling).
- Add one centered muted paragraph directly beneath the heading (exact copy supplied by user), using the existing `text-muted-foreground leading-relaxed` body style inside the centered cluster. This is the only place the exact phrase "Web3 website design agency" appears in homepage body copy.
- Cards, layout, motion unchanged.

### 4. CoreFunctionsSection — `src/components/CoreFunctionsSection.tsx`
- Add supporting line `A modern Web3 website should do three things on its own:` beneath the heading using the existing supporting-text/muted style.
- Card copy unchanged.

### 5. Untouched
Hero (video, typewriter, crystalline terms, CTAs), SystemFlow, other sections, `/about`, `/contact`, `/insights`, `/privacy`, insight detail pages, fonts, colors, spacing.

## Verification
1. `curl` raw SSR HTML of `/`: new title, description, single canonical, og/twitter tags, exactly one Organization block, one Service block.
2. Exactly one H1 on the homepage.
3. `bun run build` and typecheck pass.
4. Playwright desktop + mobile pass over homepage to confirm hero video/animations/sections render unchanged.
5. Report: metadata changed, structured data changed, visible copy changed, verification results, any issues.
