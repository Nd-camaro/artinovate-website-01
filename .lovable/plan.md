# Internal-Page Hero System, Hero Art Direction, Typography Fixes

Three scoped tasks. No redesign, no SEO/schema/routing/pricing/positioning changes, #36F4EE stays canonical.

## 1. Standardize the internal-page hero scale

Today `/insights`, `/about` and `/contact` already share the `PageHero` component (min-height 70vh), while `/web3-website-design` has its own hand-rolled hero section (also ~70vh, but with larger padding, CTA buttons and a wider content block) — which is why it reads too close to the homepage.

Approach: make `PageHero` the single internal-page hero system and move the Web3 page onto it.

Shared frame (applied to all four pages):
- Height: fixed internal scale (roughly 52–56vh desktop, min ~420px; ~46vh mobile) — clearly below the homepage flagship hero.
- Content bounds: same container and a single `max-w-3xl` text column, same left alignment, same top offset below the nav.
- Vertical rhythm: same eyebrow → headline → subheading → CTA spacing scale on every page.
- Headline scale: one internal-page size step (smaller than the homepage hero, larger than section headings), same responsive steps everywhere.
- Same image treatment: overlay + bottom gradient blend, same crop behaviour.
- Same transition spacing into the following section, and the same optional scroll indicator / connector line.

Per-page flexibility kept: each page supplies its own eyebrow, headline, subheading, artwork, and optionally an actions slot. `PageHero` gains an optional `actions` prop so the Web3 page keeps its "Book a strategy call" + "See how it works" buttons inside the standardized frame.

Explicitly unchanged: the homepage `HeroSection` (video, animation, typography, CTAs, height) and individual Insight article pages, which keep their editorial header + featured-image layout.

## 2. Page-specific hero artwork (same visual universe)

Generated only after step 1 lands, so each image is produced for the confirmed crop and text-safe zone.

- Aspect/crop target: wide cinematic frame matching the new hero box, with composition weighted right and the left ~45% kept as quiet negative space for the headline column.
- Locked direction for all four: deep charcoal / near-black, matte stone, dark anodized metal, restrained smoked glass, modular cubic infrastructure, controlled #36F4EE signal, low-key cinematic lighting, high material realism, strong negative space. No SaaS illustration, blue-purple gradients, cyberpunk, coins, blockchain symbols, robots, handshakes, node graphs, dashboards, people, or any text/logos in the artwork.
- Distinct scenes:
  - Web3 Website Design — a refined façade/surface plane with deeper autonomous infrastructure visibly operating behind and beneath it.
  - Insights — structured signal streams accumulating into an ordered architectural repository; research and owned knowledge, not a data centre.
  - About — architectural forms emerging/assembling out of darkness; foundation and construction, contemplative and timeless.
  - Contact — multiple controlled pathways converging into one refined illuminated destination point.
- Each gets a descriptive alt text; existing homepage and Insight article imagery untouched.

## 3. Two League Gothic typography fixes

A. Individual Insight article headings (`src/routes/insights/$slug.tsx` only)
- Article H1 and the markdown H1/H2 render in League Gothic and are currently tight (`leading-tight`, small top/bottom margins), so multi-line headings cluster.
- Increase line-height on the article H1 and markdown H1/H2, and open up their top/bottom margins so headings breathe like the homepage rhythm. Keep font sizes, condensed character and the H1 > H2 > H3 hierarchy; verify mobile readability.
- Insights listing typography untouched.

B. "Book a 15-minute call" heading (Contact strategy-call block)
- Increase line-height and the spacing between the STRATEGY CALL eyebrow, the heading and the supporting paragraph. Scoped to that heading only; font size and surrounding layout unchanged.

## Verification

Playwright pass at desktop and mobile: homepage still reads as the flagship hero; the four internal pages share one hero hierarchy; Insight articles keep their editorial structure; both typography fixes confirmed; no metadata, schema, sitemap, nav or routing changes.
