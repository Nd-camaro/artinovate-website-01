# Homepage SEO Repositioning — Web3 Website Design Agency

Reposition the homepage metadata and first-screen semantic signals for the keyword cluster around "Web3 website design agency", without touching the hero copy, animations, layout, or other sections.

## 1. Metadata (`index.html`)

- `<title>` → `Web3 Website Design Agency | ArtiNovate`
- `<meta name="description">` → `Premium Web3 website design for digital asset, tokenization, DeFi and fintech companies. AI-powered digital presence that publishes, engages and captures.`
- Mirror the same values into `og:title` / `og:description` and `twitter:title` / `twitter:description` (no other social tags added or changed).
- Keep the existing canonical (`https://www.artinovate.com`), the existing FAQ JSON-LD (still valid — the Q&A text stays accurate), and update the `Service` JSON-LD `name`/`description` to reference Web3 website design (e.g. `"name": "Premium Web3 Website Design"` with a description covering digital asset, tokenization, DeFi and fintech firms).

## 2. Edge Function (`netlify/edge-functions/inject-meta.ts`)

- The homepage branch only injects Organization JSON-LD. Update its `description` field to the same category language so the server-rendered structured data matches the new positioning.
- No other edge-function changes (canonical handling, insight-post meta injection untouched).

## 3. On-page semantic signals (homepage body copy — minimal edits)

- **ProblemSection** (first section after hero — this is the "first content immediately after the hero"):
  - H2 stays as-is in structure, but adjust the heading text to establish the category, e.g. `Most Web3 websites go quiet after launch` (League Gothic, centered — existing classes unchanged).
  - Introduce a short supporting paragraph directly under the heading (centered, existing muted style) that states ArtiNovate builds Web3 websites designed to publish, engage and capture rather than remain static — one or two sentences, natural language, mentioning digital asset firms, tokenization platforms, DeFi and fintech companies.
- **CoreFunctionsSection** subheading: add one short supporting line under "One system. Three functions." tying the system to Web3 website design (e.g. "Your Web3 website is designed to do three things on its own:"). No card copy changes.
- **AudienceSection**: the audience cards already cover digital asset enterprises, DeFi, etc. — no changes needed.
- No new sections, no hidden copy, no doorway content, no heading spam — the exact phrase "Web3 website design" appears in the title, meta description, and at most once or twice in body copy.

## 4. Technical verification (no changes expected, confirm only)

- One H1 on the homepage (the hero `motion.h1`) — confirmed in current code; verify after edits.
- One canonical link; homepage branch of the edge function does not inject a second one.
- `robots.txt` and `public/llms.txt` need no changes (homepage positioning is reflected in metadata, not crawl rules).
- Verify build passes and preview renders identically (hero video, typewriter, glass-cube rotation untouched).

## Explicitly out of scope

- No changes to hero copy, eyebrow, rotating terms, subheading, CTA, video, or animations.
- No new sector landing pages, no layout changes, no redesign.
- Other pages (/about, /contact, /insights) keep their existing titles/descriptions.

## Technical details

- Files touched: `index.html`, `netlify/edge-functions/inject-meta.ts`, `src/components/ProblemSection.tsx`, `src/components/CoreFunctionsSection.tsx` (copy-only, using existing classes).
- The new supporting paragraphs reuse the existing `.section-cluster` centered styling and `text-muted-foreground` body style — no new CSS.
