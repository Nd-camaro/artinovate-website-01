# Homepage Hero Text System + Crystalline Motion

Scope: `src/components/HeroSection.tsx` only (plus small keyframe additions in `src/index.css`). Video background, layout, CTA, spacing and composition stay untouched.

## Copy changes

- Eyebrow: `AI AUTOMATION AGENCY` becomes `AI POWERED`
- Headline: `Digital Presence for` (white, fixed) + rotating cyan term
- Rotating terms: Web3, Digital Assets, Tokenization, Fintech
- Subheading: `Publish. Engage. Capture.`
- The current second line (`For Web3 and digital asset organizations.`) and the mono line (`Publishes. Engages. Captures.`) collapse into the single new subheading, so the hero keeps one supporting line under the headline.

## Motion sequence

1. Eyebrow fades in subtly (existing behaviour, unchanged timing).
2. `Digital Presence for` types in with the existing understated typewriter, no cursor flourish beyond current style.
3. First cyan term resolves into place with the crystalline assemble-in.
4. Subheading slides up ~12px and fades in over ~500ms.
5. Cyan term cycles automatically: hold 2.0s, transition 350ms, repeat.

## Crystalline cube transition

The cyan term renders as a row of per-character spans. On change:

- Out: each character is treated as a small glass block that steps to a slight 3D rotation (rotateX/rotateY within 8-12deg), scales to ~0.94, drops to 0 opacity with a 1-2px cyan refraction shadow. Characters leave on a short staggered ladder (~14ms apart) so the word visibly de-resolves in modular pieces rather than fading as a mass.
- In: the next term's characters arrive on the same stagger, from a mirrored rotation and slight positional offset, snapping to a hard rest state with a controlled easing curve (no bounce, no overshoot).
- Total in+out stays inside 250-450ms. Between transitions the term is a plain, static, fully sharp element with no transform, filter or animation applied.

Explicitly excluded: shatter debris, RGB channel split, scanlines/VHS, shake, heavy blur, neon glow bloom, cyberpunk styling.

## Accessibility and performance

- `prefers-reduced-motion: reduce` disables the typewriter and the cube transition; terms then cross-fade at low opacity delta, or hold the first term if the user's setting is strict.
- Width of the rotating slot is reserved by the longest term (`Digital Assets`) so the headline never reflows between cycles.
- Transitions use transform/opacity only (GPU-composited); no layout-affecting properties animate.

## Technical notes

- Rotation state lives in a `useEffect` interval inside `HeroSection`, gated on the typewriter completing, and cleared on unmount.
- The existing `sessionStorage` skip flag continues to work: on a repeat visit within the session, the typewriter is skipped and the rotation starts immediately.
- Cyan comes from the existing `text-primary` token, no new hex values.
- Character-level keyframes are added to `src/index.css` under `@layer components` alongside the existing hero animation styles.
