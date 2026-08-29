# Home Hero Video Background

Replace the static home hero image with the uploaded cyan signal-streams clip, kept as a quiet cinematic underlay behind the existing typewriter headline.

## What the uploaded file is

- 1280x720, 8.0s, 24fps, H.264, ~2.1 MB, plus an unused AAC audio track.
- Visual matches the brand direction: near-black scene, cyan signal streams, abstract infrastructure only.
- First and last frames are close but not identical, so a raw loop shows a faint jump. It needs a crossfade to loop invisibly.

## Encoding work (done in the sandbox, before any code)

1. Strip the audio track entirely (no sound path at all, so mobile autoplay can never be blocked by it).
2. Build a seamless loop: crossfade the last ~0.8s over the opening frames, producing a ~7.2s clip whose end matches its start.
3. Produce three CDN assets:
   - `hero-loop.webm` (VP9) — primary, best quality per byte.
   - `hero-loop.mp4` (H.264 High, faststart, yuv420p) — Safari/iOS fallback.
   - `hero-poster.jpg` — first frame, shown instantly while the video buffers.
4. Upscale is not attempted; 720p is stretched full-width but the source is dark and soft, so at the existing overlay opacity it holds up. Target ~1.5-2.5 MB per file.

## Implementation in the hero

In `src/components/HeroSection.tsx`, the `<img>` underlay is swapped for a `<video>` in the same absolute container, keeping both existing overlay gradients unchanged so text contrast is identical.

- Attributes: `autoPlay muted loop playsInline preload="metadata"` with `poster` set, plus `aria-hidden` and `tabIndex={-1}` (decorative, not announced by screen readers).
- The poster image keeps the current `fetchPriority="high"` behaviour so the first paint is instant and LCP does not regress.
- Fade the video in over ~600ms once `canplay` fires, so there is no flash between poster and first frame.
- `object-cover object-center` with `w-full h-full` for full-bleed responsiveness at every breakpoint.

## Performance and accessibility guards

- Respect `prefers-reduced-motion`: when set, the video never loads and the poster image is rendered instead.
- Skip the video on save-data connections and on `navigator.connection.effectiveType` of `2g`/`slow-2g`, falling back to the poster.
- Pause playback when the hero scrolls out of view (IntersectionObserver) and on tab blur, so it costs nothing while the user reads the rest of the page.
- Mobile: same video, but the poster carries first paint and the video is only attached after mount, so it never competes with the initial render.

## Files touched

- `src/components/HeroSection.tsx` — video underlay + guards.
- `src/assets/hero-loop.webm.asset.json`, `hero-loop.mp4.asset.json`, `hero-poster.jpg.asset.json` — new CDN pointers.
- `src/assets/hero-home.jpg` stays in place (still used as the reduced-motion fallback source is the new poster; the old image is left untouched).

## Verification

Build, then load the home page in a headless browser to confirm the video element is playing, muted, looping, with no console errors, and screenshot the hero at desktop and mobile widths.
