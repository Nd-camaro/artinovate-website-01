# Typography Swap: League Gothic + Manrope

Replace Inter and IBM Plex Mono with the ArtiNovate brand typography. Nothing else changes — no colors, layouts, spacing, sizes, components, images, icons, animations, or copy.

## Font roles

- **League Gothic** — display headlines and large section headings (h1, section h2, big CTA headings).
- **Manrope Bold (700)** — smaller headings (h3, h4), navigation, buttons, eyebrow/mono labels, and strong UI text.
- **Manrope (400/500)** — body text and supporting copy.

All existing font sizes, weights hierarchy positions, tracking, and line heights stay as they are. Because League Gothic is a condensed face, it simply renders narrower at the same declared sizes — no size values are edited.

## What changes

1. **index.html** — swap the Google Fonts link: load `League Gothic` (400) and `Manrope` (400,500,600,700,800) in place of Inter and IBM Plex Mono. Keep the same preload + noscript pattern.
2. **tailwind.config.ts** — `fontFamily.sans` becomes Manrope + system fallbacks; add a `display` family for League Gothic; `fontFamily.mono` is repointed to Manrope so existing `font-mono` labels render in Manrope Bold rather than a monospace face.
3. **src/index.css**
   - `body` uses Manrope.
   - `h1, h2` use League Gothic (display), keeping their current tracking classes.
   - `h3`–`h6` use Manrope with weight 700.
   - `.font-mono` utility maps to Manrope 700 (letter-spacing and size untouched), so `.label-mono` eyebrows keep their uppercase/tracking-widest look in the new face.
   - Buttons and nav inherit Manrope; button base already uses `font-medium`, which will be nudged to Manrope's 600/700 rendering via the utility class only where the site already declares a weight.
4. **Article prose (InsightDetail)** — the inline heading classes there resolve through the global h1–h4 rules, so they pick up the new fonts automatically; the h1/h2 in article bodies will render League Gothic, h3/h4 Manrope Bold.

No component file needs edits unless a heading is a `div`/`span` rather than a real heading tag. After the CSS change, a pass over Hero, PageHero, CTASection, section headers, Insights cards, Privacy, and Playbook confirms each display heading resolves to League Gothic and everything else to Manrope.

## Verification

- Type-check the project.
- Load `/`, `/about`, `/insights`, an insight detail page, `/contact`, and `/privacy` in a headless browser at desktop (1280), tablet (834), and mobile (390) widths, and read back the computed `font-family` for h1/h2/h3/body/nav/button/label on each to confirm consistency.

## Technical notes

- League Gothic ships a single weight (400); any `font-bold` on a display heading is harmless but will not synthesize extra weight — the headings keep their existing classes regardless.
- Manrope covers 200–800, so all current weights (300 light, 400, 500, 600, 700 bold) map cleanly.
- The `--font` roles live in Tailwind's theme plus the base layer in `src/index.css`, so every page and every shadcn component inherits them with no per-file overrides.
