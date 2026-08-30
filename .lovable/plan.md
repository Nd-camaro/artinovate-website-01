# Web3 Website Design — Commercial Pillar Page

A new flagship page at `/web3-website-design` that captures buyer-intent search for Web3 website design and redesign, then reframes the buyer toward ArtiNovate's Publish / Engage / Capture model. Built on the existing TanStack Start SSR architecture and the locked ArtiNovate visual system. No redesign of existing pages.

## 1. Search intent and keyword strategy (validated with Semrush, US database, this turn)

Intent: commercial investigation — a Web3, digital asset, tokenization, DeFi or fintech company deciding who should build or rebuild their website.

Semrush data (database: `us`; volume = estimated monthly searches; KD = keyword difficulty; intent inferred from term wording, Semrush intent labels are not exposed through the built-in tools):

| Keyword | Volume | KD | CPC | Intent |
|---|---|---|---|---|
| web3 design agency | 140/mo | 2 | $0 | commercial |
| crypto web design agency | 110/mo | 17 | $0 | commercial |
| crypto web design | 40/mo | 50 | $0 | commercial |
| crypto website design | 30/mo | 0 | $0 | commercial |
| blockchain website design | 30/mo | 0 | $0 | commercial |
| web3 website development | 30/mo | 0 | $0 | commercial |
| web3 web design agency | 20/mo | 0 | $0 | commercial |
| blockchain web design agency | 20/mo | 0 | $0 | commercial |
| crypto website development | 20/mo | 0 | $0 | commercial |
| web3 website design | 10/mo | 0 | $3.99 | commercial |
| web3 website design agency | 10/mo | 0 | $0 | commercial |
| digital asset website design | 0/mo | 0 | $0 | commercial |
| web3 website redesign | no data | — | — | — |
| tokenization website design | no data | — | — | — |
| defi website design | no data | — | — | — |

Adjacent head terms checked for context: web3 development company 720/mo KD 17, web3 marketing agency 720/mo KD 14, web3 agency 260/mo KD 18.

Stated limitations: the built-in Semrush tools return volume, CPC, competition and KD only — they do not expose Semrush's intent classification or close-variant lists for these terms. `serp_analysis` for "web3 website design" returned no SERP data (volume too low to be tracked), so no ranking-competitor list is available for the exact head term. Three terms above have no data at all in the US database; treat them as effectively zero-volume and use them only as on-page semantic language, never as targets.

**Revised targeting decision (data-led, not plan-led):**

- Primary target: **web3 design agency** (140/mo, KD 2) — the highest-volume, lowest-difficulty commercially-intended term in the cluster.
- Co-primary exact-match: **web3 website design** — near-zero volume but the highest commercial signal in the set (only term with a real CPC, $3.99) and the phrase buyers type when they specifically want a site built. It stays in the H1 and URL.
- Strong supporting: crypto web design agency, crypto website design, blockchain website design, web3 website development, web3 web design agency, blockchain web design agency, crypto website development.
- Semantic-only (no measurable volume): web3 website redesign, tokenization website design, DeFi website design, digital asset website design. Covered through natural section language (redesign section, audience section, FAQ) — never as repeated exact-match blocks.

The whole cluster is low-volume and very low-difficulty, so this remains a high-intent capture page and cluster hub rather than a volume play. Its commercial value is intent quality plus consolidating the existing 30+ Web3/AI insight articles.

## 2–5. URL, metadata, H1

- URL: `https://www.artinovate.com/web3-website-design` (unchanged — matches the exact-match commercial phrase and reads cleanly)
- SEO title (58 chars): `Web3 Website Design & Web3 Design Agency | ArtiNovate` — leads with the exact-match phrase, carries the highest-volume primary term, and no longer duplicates the homepage title pattern
- Meta description (154 chars): `Premium Web3 website design and redesign for digital asset, tokenization, DeFi and fintech companies — sites that publish, engage visitors and capture intent.`
- H1: `Web3 Website Design for Companies That Have Outgrown a Static Site`
- Canonical: self-referencing, leaf route only. og:url matches.


## 6–10. Section architecture

Each section answers one buyer question, in narrative order.

**1. Hero** — Category positioning. Label `WEB3 WEBSITE DESIGN`, H1 as above, one-line support: ArtiNovate designs premium Web3 websites that operate as digital presence systems — they publish expertise, engage visitors and capture qualified intent. Primary CTA `Book a strategy call` (opens the existing scheduling modal), secondary `See how it works` (anchor scroll to the system section). Visual: existing `PageHero` pattern with a newly generated cinematic hero still (see "Hero visual" below) — image, not video, to protect LCP. Motion: the existing fade/rise sequence only.

**2. Buyer problem — "Websites go stale the moment they launch"** — Commercially grounded: strategy shifts, products evolve, regulation moves, founder expertise gets published on other platforms, visitors leave with unanswered questions, high-intent traffic lands on static pages with weak conversion paths, the site stops reflecting how sophisticated the company has become. Three to four short cards, no prose walls. Visual: existing `ProblemSection` card language — bordered dark surfaces, muted copy, one cyan accent per card.

**3. What ArtiNovate builds** — Website first, because that's what they searched for. Premium Web3 website design and build, then the four extensions: publishing infrastructure, contextual visitor engagement, intelligent capture and call routing, search and AI discoverability. Message: the website is the visible surface of a broader operating system. Visual: a layered stack diagram — website surface on top, three system layers beneath connected by cyan pathways. Motion: layers fade in on scroll with a small stagger, `whileInView` once.

**4. Publish / Engage / Capture** — One business outcome each. Publish: the site continuously accumulates useful expertise, search visibility and owned-domain authority. Engage: visitors can understand complex products and ask contextual questions without waiting on someone internally. Capture: high-intent visitors are guided to the right conversion path or a booked conversation. Visual/pattern: reuse `CoreFunctionsSection`'s numbered 01/02/03 block treatment for consistency with the homepage.

**5. Who it is for** — One paragraph plus a restrained list: Web3 companies, digital asset firms, tokenization and RWA platforms, DeFi protocols, exchanges and trading businesses, institutional digital asset companies, and fintechs entering digital assets. Compact, single pass, no per-audience keyword blocks.

**6. Why Web3 website design requires a different approach** — The expertise section and the strongest differentiator. Original point of view on: explaining unfamiliar business models to buyers who are not all technical; designing for two audiences at once (technical evaluators and institutional decision-makers); trust and credibility architecture in a category with a trust deficit; products that change faster than a design cycle; regulatory language that must be accurate without becoming unreadable; translating deep internal expertise into an experience a buyer can actually follow. Written as genuine guidance. Visual: editorial two-column at desktop, single column mobile, generous negative space, no illustration.

**7. Redesign path** — For companies that already have a site and have outgrown it. Framing: your company evolved; the presence needs to catch up. Themes: preserve positioning, messaging equity and existing lead paths; improve clarity, authority and conversion; modernize the experience; add Publish, Engage and Capture around the redesigned presence. Visual: quiet "carry forward / change / add" three-column ledger, no before-after mockups.

**8. Process** — Six restrained steps: Diagnose, Define, Design, Build and integrate, Launch, Expand (optional). Visual: reuse the `SystemFlowSection` connected-step pattern with the existing cyan pathway line.

**9. Proof — demonstration, not claims** — See section "Proof strategy" below.

**10. FAQ** — Accordion (existing `ui/accordion`), progressive disclosure. Questions: What makes Web3 website design different? What's included? How much does a Web3 website cost? How long does a redesign take? Can you redesign an existing website? Does every site include Publish, Engage and Capture? Can the system work with our existing infrastructure? Pricing answer verbatim in substance: the full Publish, Engage and Capture system starts at $5,000 for a standard implementation; pricing increases with complexity, integrations, content requirements and custom functionality; reduced-scope or phased implementations can be scoped separately. Not framed as a flat fee or a ceiling.

**11. Final CTA** — Reuse `CTASection` styling: single restrained conversion block, one primary action `Book a strategy call`, one supporting line. No urgency devices.

## 11. CTA strategy

Three intentional CTA moments only: hero (primary + anchor secondary), after Publish/Engage/Capture (a single inline text link to book), and the final CTA section. All primary CTAs open the existing `useScheduling()` modal. No sticky bars, no repeated buttons between every section.

## 12. Internal-link strategy

Outbound from this page (contextual, varied anchor text, ~5–7 links total):

- Problem / different-approach sections → `credibility-architecture-building-institutional-trust-web3`, `website-impact-crypto-startup-credibility-investors`
- Publish → `web3-startups-build-authority-ai-publishing`, `what-is-ai-content-engine-vs-blog`
- Engage → `ai-chat-assistants-improve-visitor-engagement-web3-projects`
- Capture → `ai-lead-capture-system-how-it-works`, `lead-generation-digital-asset-consulting-firms`
- Hub link to `/insights`

Inbound: add one contextual link from the homepage (inside `CoreFunctionsSection` or the audience section body copy — a text link, not a new CTA button), and a link from `/about`. Navigation: recommend adding `Web3 Website Design` as a nav item between Home and About — flagged for your approval rather than done silently. Future Web3-website insight articles should link back here with varied anchors (e.g. "Web3 website design", "our approach to Web3 website redesign", "how we build Web3 sites").

## 13. Structured data

- `Service` JSON-LD on this route: name "Web3 Website Design and Development", `areaServed`, `serviceType`, `provider: { "@id": "https://www.artinovate.com/#organization" }` — reusing the same Organization entity as `__root.tsx` and the homepage.
- `BreadcrumbList`: Home → Web3 Website Design.
- `FAQPage`: recommended only because the FAQ answers are genuinely on-page, visible and non-promotional; if any answer ends up truncated or hidden behind interaction beyond the accordion, drop it. No `Offer`/price schema — the $5,000 figure is a starting point, not a fixed price, and marking it up would misrepresent it.
- No `Review`, `AggregateRating` or `Organization` duplication.

## 14–15. Components

Reuse as-is: `Navigation`, `Footer`, `PageHero`, `CTASection`, `ui/accordion`, `Button` (`hero`/`xl` variants), `useScheduling()`, existing `.section-heading` / `.section-cluster` / `.label-mono` type classes, existing framer-motion `whileInView` pattern.

New, all scoped under `src/components/web3-design/` and used only by this page: `W3ProblemSection`, `W3SystemStack`, `W3FunctionsSection`, `W3AudienceSection`, `W3ApproachSection`, `W3RedesignSection`, `W3ProcessSection`, `W3ProofSection`, `W3FaqSection`. No global CSS or token changes.

### Brand cyan

Every cyan on this page comes from the existing semantic tokens — `text-primary`, `bg-primary`, `border-primary`, `--accent-cyan` — never a hardcoded hex. Noted discrepancy for your call, flagged not changed: the token in `src/styles.css` is currently `--primary: 187 100% 42%` (≈ `#00B0D4`) and its comment reads "Accent Cyan - Unified accent color #0A82CD", while you state the brand cyan is `#36F4EE`. Retuning the global token to `#36F4EE` would restyle the whole site, so it is out of scope here; this page will simply inherit whatever the token holds, staying visually consistent either way. The generated hero image uses `#36F4EE` as its light source, which reads correctly over the dark background regardless.

### Hero visual

One new generated asset, wide cinematic, in the locked ArtiNovate visual language: a dark architectural digital environment of monolithic charcoal cubic forms, modular planes, matte-black and dark-anodized surfaces, with controlled electric-cyan `#36F4EE` signal pathways flowing through and beneath a refined website-like front structure — implying the visible site is only the surface of a deeper system that publishes, engages and captures. Composition weighted center-right/right with strong negative space for the headline, restrained low-key cinematic lighting, subtle smoked-glass depth, premium material realism, institutional high-trust mood. Excluded: people, robots, coins, blockchain symbols, dashboards, UI screenshots, network-node clichés, cyberpunk styling, blue-purple gradients, text, logos, watermarks. Saved to `src/assets/`, imported directly, descriptive alt text.

## 16. Proof strategy

Audit result: the project contains no client logos, testimonials, case studies, metrics or award claims anywhere in the codebase — so none can be used. The proof section will be demonstration proof, explicitly framed as such:

- This website as the working artifact — server-rendered, fast, publishing continuously, engaging via the assistant, capturing via the strategy-call flow.
- The published insight library as evidence of the publishing system operating (link to `/insights`, no traffic or ranking claims).
- System architecture transparency — what gets built and how the three functions connect.
- The live assistant as an interactive demonstration.
- A short honest line distinguishing demonstration proof from client case studies.

No invented clients, results, conversion rates, traffic figures, team size or experience claims.

## 17. Mobile / responsive

Single column below `md`; multi-column grids collapse in source order. Hero H1 steps 5xl → 7xl → 8xl matching existing pages. Tap targets ≥44px. Process flow renders as a vertical stack on mobile with the cyan connector running vertically. FAQ accordion is mobile-first. No horizontal scroll; test at 375px, 768px, 1280px, 1920px.

## 18. Accessibility

One H1, then a clean H2 per section and H3 for sub-items. Semantic `section` with `aria-labelledby`. Accordion uses the existing accessible Radix primitive. Contrast: white/muted text on `#0B0D10`/`#161A20` verified ≥4.5:1; cyan `#0A82CD` used for accents and links, never as small body text on dark without a contrast check. Visible keyboard focus retained. Every `whileInView` animation respects `prefers-reduced-motion`. Hero image has descriptive alt; decorative diagram elements `aria-hidden`.

## 19. Performance / Core Web Vitals

Static hero image (no video) with explicit width/height and `fetchPriority="high"`; all below-fold imagery lazy. No new fonts, no new global CSS. Motion is transform/opacity only, `once: true`. No layout shift from the accordion (height animated by the existing primitive). Page ships as its own route chunk via existing code splitting.

## 20. Files and routes touched

- New `src/routes/web3-website-design.tsx` — `head()` with title, description, canonical, og/twitter, Service + BreadcrumbList + FAQPage JSON-LD
- New `src/pages/Web3WebsiteDesign.tsx` — page composition
- New `src/components/web3-design/*.tsx` — nine section components
- New hero asset in `src/assets/`
- `src/components/Navigation.tsx` — new nav item (pending your approval)
- `src/pages/Index.tsx` or `CoreFunctionsSection.tsx` — one contextual internal link
- `src/pages/About.tsx` — one contextual internal link
- `scripts/generate-sitemap.mjs` — add the new static route
- `src/routeTree.gen.ts` regenerates automatically

## 21. Risks

- Thin-page risk if copy stays generic — mitigated by the approach and redesign sections carrying real expertise.
- FAQPage schema misuse — only added if answers are fully visible on-page.
- Nav crowding at five items on mobile — verified at 375px before shipping.
- Cannibalization with the homepage, which now targets "Web3 website design agency" — resolved by keeping the homepage brand/system-led and this page service/buyer-led, with distinct titles and one-directional internal linking.
- Pricing sensitivity — the $5,000 line stays a starting point in copy and is excluded from schema.

## 22. Verification checklist

1. `curl` the route: title, description, canonical, og/twitter and all JSON-LD present in raw SSR HTML.
2. Exactly one H1; heading order H1 → H2 → H3 with no skips.
3. JSON-LD validates; `Service.provider.@id` matches the root Organization `@id`.
4. Canonical and og:url both self-reference `https://www.artinovate.com/web3-website-design`.
5. All internal links resolve (no 404s, no redirected insight slugs).
6. Sitemap includes the new URL after build.
7. Primary CTAs open the scheduling modal; the secondary CTA anchors correctly.
8. Playwright screenshots at 375 / 768 / 1280 / 1920 — no overflow, no console errors.
9. `prefers-reduced-motion: reduce` disables entrance motion.
10. Keyboard pass: focus visible through nav, CTAs and accordion.
11. `bun run build` and typecheck pass with zero errors.
12. Homepage and About links render and point to the new page.
13. No fabricated proof anywhere in the final copy.
