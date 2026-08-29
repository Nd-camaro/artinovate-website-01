# Glass-Cube Break Transition for Hero Rotating Term

Scope: `src/components/HeroSection.tsx` + keyframes in `src/index.css`. Headline copy ("Digital Presence" / "for [Web3]"), video background, layout, CTA and timing rhythm stay as they are.

## The effect

The rotating cyan term (Web3 → Digital Assets → Tokenization → Fintech) no longer glitches as whole characters. Instead, each character visually decomposes into a 2x2 grid of small glass fragments — the word appears to break apart into tiny crystalline cubes that scatter and dissolve, then the next term's fragments fly in and snap together into a sharp, solid word.

### How it renders

- Each character is duplicated into 4 fragment spans, each clipped to one quadrant of the glyph (top-left, top-right, bottom-left, bottom-right) using `clip-path`.
- Between transitions the 4 fragments sit perfectly aligned, so the word looks like one solid, fully sharp element — the fragmentation is invisible at rest.
- On change ("break out"): each fragment gets a slight per-fragment offset (translate a few px outward from the glyph center), a small 3D rotation (rotateX/rotateY within 10-16deg), a brief refractive cyan edge shadow, then drops to 0 opacity. Fragments leave on a short deterministic stagger (per character ~12ms, per quadrant ~20ms) so the break reads as a cascading glass shatter rather than a uniform fade.
- On "assemble in": the next term's fragments arrive from mirrored offsets, blur resolving to zero, snapping into a hard rest state with a controlled ease — no bounce, no overshoot.
- Total transition stays inside ~500-600ms (out ~260ms + in ~300ms); hold time between cycles stays 2s.

## Premium / UX guardrails

- Deterministic pseudo-random offsets (seeded by character index), not `Math.random()` — identical motion every cycle, no jittery chaos.
- Transform, opacity, clip-path and filter only — GPU-composited, no layout reflow; slot width still reserved by the longest term.
- Fragments use the existing `text-primary` cyan; refraction shadow uses `hsl(var(--primary))` plus a faint white edge — no new hex values, no RGB-split cyberpunk look.
- `prefers-reduced-motion: reduce` disables the fragment animation entirely; terms cross-fade statically as today.
- The session-skip behavior is unchanged: repeat visits start rotation immediately.

## Technical notes

- `CrystallineTerm` in `src/components/HeroSection.tsx` renders each character as a positioned container holding 4 clipped copies of the glyph; phase classes (`is-out` / `is-in`) toggle per-fragment animations via CSS custom properties for per-fragment direction/rotation.
- New keyframes (`glass-break-out`, `glass-assemble-in`) added under `@layer components` in `src/index.css`; old `crystal-out`/`crystal-in` keyframes removed.
- Fragment direction/rotation computed from quadrant (top-left scatters up-left, etc.) with a small index-based variance.
