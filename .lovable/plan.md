# ArtiNovate UI & Design System Snapshot

Read-only inventory of the current implementation. No changes proposed.

## 1. Design tokens (src/index.css `:root`, HSL)

| Token | Value | Approx hex |
| --- | --- | --- |
| --background | 0 0% 4% | #0A0A0A |
| --foreground | 0 0% 95% | #F2F2F2 |
| --card / --popover | 0 0% 7% | #121212 |
| --primary / --accent / --ring / --accent-cyan / --electric-cyan | 187 100% 42% | #00B8D6 |
| --primary-foreground | 0 0% 100% | #FFFFFF |
| --accent-foreground | 0 0% 4% | #0A0A0A |
| --secondary | 0 0% 12% | #1F1F1F |
| --secondary-foreground | 0 0% 85% | #D9D9D9 |
| --muted | 0 0% 10% | #1A1A1A |
| --muted-foreground | 0 0% 55% | #8C8C8C |
| --border / --input | 0 0% 15% | #262626 |
| --destructive | 0 84.2% 60.2% | #EF4444 |
| --carbon | 0 0% 4% | #0A0A0A |
| --graphite | 0 0% 10% | #1A1A1A |
| --graphite-light | 0 0% 14% | #242424 |
| --pale-grey | 0 0% 85% | #D9D9D9 |
| --signal-blue | 216 100% 50% | #0066FF |
| --radius | 0.5rem (lg 8px, md 6px, sm 4px) | — |

Sidebar tokens also defined (`--sidebar-*`, background 0 0% 7%, primary 216 100% 50%). Palette is dark-only; `darkMode: ["class"]` is configured but no second theme block exists.

Gradients and shadows:
- `--gradient-glow`: linear-gradient(135deg, hsl(216 100% 50% / .2), hsl(187 100% 42% / .2))
- `--gradient-path`: linear-gradient(180deg, hsl(216 100% 50%), hsl(187 100% 42%))
- `--gradient-card`: linear-gradient(145deg, hsl(0 0% 10%), hsl(0 0% 7%))
- `--shadow-glow`: 0 0 60px -15px hsl(216 100% 50% / .3)
- `--shadow-subtle`: 0 4px 30px -10px hsl(0 0% 0% / .5)

## 2. Typography

Fonts loaded in index.html via Google Fonts (preload + noscript fallback): Inter 300/400/500/600/700, IBM Plex Mono 400/500/600.
- Body: Inter, `font-sans`, antialiased.
- h1–h6: Inter with `tracking-tight` (-0.025em).
- `.font-mono` / `font-mono`: IBM Plex Mono.

Hierarchy in use:
- Home H1: `text-4xl md:text-6xl lg:text-7xl` (36/60/72px), font-bold, `tracking-tighter` (-0.05em), `leading-[1.05]`.
- PageHero H1 (About/Contact/Insights): `text-3xl md:text-5xl lg:text-6xl` (30/48/60px), font-bold, tracking-tighter, leading-[0.95].
- Article H1: `text-3xl md:text-4xl lg:text-5xl`, font-bold, tracking-tight, leading-tight.
- Section H2: `text-3xl md:text-5xl` (home) or `text-3xl md:text-4xl` (inner pages), font-bold, tracking-tight, often `max-w-2xl`.
- Card H3: `text-lg`–`text-xl`, font-semibold, tracking-tight.
- Body: `text-sm` (cards) or base 16px, `text-muted-foreground`, `leading-relaxed` (1.625).
- Hero subhead: `text-lg md:text-xl`, font-light, muted.
- Eyebrow `.label-mono`: `font-mono text-xs uppercase tracking-widest text-muted-foreground`, usually overridden to `text-primary` with `mb-4 block`.
- Numeric labels ("01"–"04"): font-mono text-xs uppercase tracking-widest, `text-accent`.
- Footer meta/copyright: `text-xs text-muted-foreground`.
- Insight prose: h1 3xl bold, h2 2xl semibold, h3 xl semibold, h4 lg medium; paragraphs `text-base leading-relaxed text-secondary-foreground mb-6`.

## 3. Buttons (src/components/ui/button.tsx, CVA)

Base: `inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-all duration-300`, focus ring 2px `--ring` + 2px offset, disabled opacity 50, svg 16px.

Variants: default, destructive, outline, secondary, ghost, link, plus custom `hero` (bg-primary, font-medium, tracking-wide, `.btn-glow`, hover scale 1.02 / active 0.98), `minimal` (transparent, border-border, hover primary border + text), `cyan` (bg-accent + btn-glow).
Sizes: default h-10 px-4 py-2 · sm h-9 px-3 · lg h-12 px-8 text-base · xl h-14 rounded-lg px-10 text-lg · icon 40x40.
`.btn-glow`: box-shadow `--shadow-glow`; hover `0 0 80px -10px hsl(accent/.5)` + translateY(-2px).
Common usage: `variant="hero" size="default" className="h-10 px-6 text-sm"`; CTASection uses `size="xl"` with an ArrowRight that shifts +4px on hover.

## 4. Layout and spacing

- Tailwind container: centered, 2rem padding, max `2xl: 1400px`.
- Standard wrapper on every section: `container mx-auto px-6 lg:px-12` (24px / 48px). Home sections add `lg:pl-32` (128px left inset).
- Content widths: hero copy `max-w-4xl`; headings `max-w-2xl`/`max-w-3xl`; grids `max-w-4xl`–`max-w-6xl`; article body `max-w-3xl`.
- Vertical rhythm: home sections `py-32` (128px), CTA `py-32 lg:py-48`, inner pages `py-24 lg:py-32`, Insights `py-16 lg:py-24`, footer `py-16`.
- Header block to grid: `mb-16`; eyebrow `mb-4`; card padding `p-6 md:p-8` (Problem cards `p-8 md:p-10`).
- Grid gaps: 4 (Audience), 6 (CoreFunctions, Insights), 8 (Problem, SystemFlow, About), 12–16 (Contact, Footer columns).
- Page shell: `min-h-screen bg-background text-foreground overflow-x-hidden` → Navigation, main, Footer.

## 5. Breakpoints and responsive behavior

Tailwind defaults: sm 640 · md 768 · lg 1024 · xl 1280 · container 2xl 1400.
- Nav: desktop links `hidden md:flex`, hamburger `md:hidden`, bar h-16 → lg:h-20, logo h-9 → md:h-11.
- Grids: Audience/CoreFunctions `sm:grid-cols-2 lg:grid-cols-3`; Problem/About `md:grid-cols-2`; SystemFlow `lg:grid-cols-4` (timeline line, nodes, arrows render only at lg); Insights `md:grid-cols-2 lg:grid-cols-3`; Contact booking `lg:grid-cols-2`; Footer `md:grid-cols-3`.
- Hero: `min-h-screen`, image `object-cover object-top`, content `pt-20`; CTA row `flex-col sm:flex-row`.
- Scheduling modal: full-screen on mobile, `md:max-h-[90vh] md:max-w-2xl lg:max-w-3xl`.

## 6. Component inventory

- **Navigation** — fixed, z-50, transparent until scrollY > 50 then `bg-background/60 backdrop-blur-xl border-b border-border/30` (500ms). Links text-sm muted → foreground with animated 1px primary underline (w-0 → w-full, 300ms); active route shows full underline. Mobile: height-accordion panel, `bg-background/95 backdrop-blur-xl`, text-base links.
- **HeroSection** — background jpg + `bg-background/40` overlay + upward background gradient; typewriter H1 (65ms/char ±7, 250ms pause at line break, sessionStorage key `artinovate_typewriter_played` skips replay) with 2px blinking primary cursor; staged reveals (subhead 200ms → supporting line 400ms → CTA 300ms); ChevronDown scroll indicator and 1px vertical gradient line (h-20).
- **PageHero** — reusable: `min-h-[70vh]`, lazy image, `bg-background/50` + gradient, optional label/subheading/scroll target, 1px h-16 connector line.
- **Section cards** — `.section-card`: `--gradient-card` background, `border border-border/50 rounded-lg`; hover `border-primary/30`, some with `-translate-y-1` and gradient washes.
- **ProblemSection** — 2 cards on `bg-graphite`, 56px `rounded-lg bg-primary/10` icon tiles, mono label, 128px gradient fades top and bottom.
- **CoreFunctionsSection** — 3 cards (Publish / Engage / Capture), 48px gradient icon tiles scaling 1.1 on hover, 01–03 mono index, hover gradient wash + corner accent.
- **SystemFlowSection** — 4-step timeline on `bg-graphite`: 1px border line, 32px circular nodes (border-2 primary, 12px inner dot), SVG chevron arrows between steps.
- **AudienceSection** — 6 cards each with a 4px vertical primary→accent bar (opacity 50 → 100 on hover).
- **CTASection** — grid pattern at opacity 20, two blurred orbs (800px primary/5 blur-150px; 400px accent/5 blur-100px), 64px gradient circle, H2 up to `text-7xl` with a `.text-gradient` span, `Button variant="hero" size="xl"`.
- **Footer** — `bg-graphite`, top border, 3-column grid (brand + logo h-10, Navigation, Legal), mono uppercase column headings, bottom bar with copyright and LinkedIn SVG. Clicking a link for the current route opens the scheduler (/contact) or smooth-scrolls to top.
- **SchedulingModal** — global Calendly iframe modal: `bg-black/60` overlay, panel `bg-graphite border border-primary/20 rounded-[16px] shadow-xl`, spinner loading state, ESC and overlay close, body scroll lock, external fallback link.
- **ChatWidget** — Voiceflow embed present but gated off via `SHOW_CHAT_WIDGET = false`.
- **Forms** — only the Insights newsletter input renders: `px-4 py-2 bg-card/50 border border-border/50 rounded-md text-sm`, focus `border-primary/50`, paired with a `minimal` button. Contact page defines form state and option arrays, but the qualification form block is not rendered.
- **shadcn/ui** — full library under `src/components/ui`; Toaster, Sonner, and TooltipProvider mounted app-wide.

## 7. Pages and section order

- `/` — Hero → Problem → Core Functions → System Flow → Audience → CTA → Footer.
- `/about` — PageHero → Philosophy → Who We Serve (3-col) → Operating Principles (2-col) → CTA "Start a conversation" (opens scheduler).
- `/insights` — PageHero → post grid (16:9 image, mono category, date, hover lift + image scale) → CTA band → newsletter block.
- `/insights/:slug` — article layout at `max-w-3xl` with a custom prose renderer.
- `/contact` — PageHero → booking section (benefit list + scheduler button) → "What Happens Next" 3 steps → closing reassurance band.
- `/privacy` — typography-only policy page.
- `/playbook` — file exists; route and nav link are commented out.
- `*` — NotFound.
- Routing: Index eager, all others `React.lazy` with a blank `min-h-screen bg-background` fallback; `ScrollToTop` on route change.

## 8. Animation and interaction

- framer-motion is the primary library. Dominant pattern: `initial={{opacity:0, y:30–60}}` → `whileInView`, `viewport={{once:true, margin:"-50px"/"-100px"}}`, duration 0.5–0.8s, stagger `delay: index * 0.08–0.15`.
- Nav header slides in (y:-100 → 0, 0.6s, 0.5s delay). Mobile menu uses AnimatePresence height accordion.
- CSS keyframes: `blink` (cursor), `pulse-ring` (2s), `scroll-bounce` (2s), `line-draw`.
- Tailwind keyframes/animations: fade-in .6s, fade-in-up .8s, slide-in-right 1s, sweep 1.5s, draw-line 2s, glow-pulse 3s infinite, float 4s infinite, accordion up/down .2s.
- Hover states: border → primary/30, card translateY(-1), icon scale 1.1, image scale 1.05, underline grow, arrow translate-x, btn-glow shadow expansion.
- `html { scroll-behavior: smooth }`; utilities `.transition-smooth` (500ms) and `.transition-fast` (200ms).

## 9. Images, icons, assets

- `src/assets`: artinovate-logo.png, hero-home.jpg, hero-about.jpg, hero-contact.jpg, hero-insights.jpg, plus three playbook asset pointers (unused while the route is off).
- Hero images declared 1920x1080, `object-cover object-top`; home hero `fetchPriority="high"`, other heroes `loading="lazy"`; all `decoding="async"`.
- Icons: lucide-react (FileText, MessageSquare, Target, Map, Cpu, Rocket, BarChart3, Globe, TrendingDown, ChevronDown, ArrowRight, Menu, X, Calendar, CheckCircle, Compass, Loader2, ExternalLink); inline SVG for LinkedIn and timeline arrows.
- Favicon/manifest: `/arti-icon-v2.png`, `/manifest.json`. OG/Twitter image hosted on Google Cloud Storage.

## 10. Recurring patterns

1. Mono uppercase eyebrow in primary + large bold H2 + `mb-16` gap.
2. `.section-card` grid: icon tile, mono index, semibold H3, muted `text-sm leading-relaxed` body.
3. Alternating `bg-background` / `bg-graphite` (or `/30`) sections with 128px gradient fades at the edges.
4. `container mx-auto px-6 lg:px-12` everywhere, with `lg:pl-32` on home sections.
5. Single CTA throughout: "Book a strategy call" / "Schedule a call" opening the Calendly modal via `SchedulingContext`.
6. Cyan #00B8D6 used only for accents, labels, icons, hover borders, and gradient lines.

