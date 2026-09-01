# Fix Hero Video Playback on Mobile

The home hero video plays on desktop but stays frozen on the poster on mobile. Diagnosis:

## Root cause

1. **React `muted` prop quirk (primary cause).** React renders the `muted` JSX prop as an HTML attribute but does NOT set the element's `.muted` IDL property. iOS Safari and Chrome mobile only allow autoplay when the *property* is `true`. Desktop browsers are more lenient with the attribute, which is why desktop plays and mobile doesn't.
2. **`preload="metadata"`.** Mobile browsers defer fetching video data, so `canplay` may fire very late (or the video sits paused at frame 0). The seamless crossfade loop asset is fine — the problem is playback never starts, not the loop itself.
3. Autoplay is triggered only via `autoPlay` + IntersectionObserver `el.play()`; the observer does run, but the play() promise is rejected because of cause #1.

## Fix (in `src/components/HeroSection.tsx`, `HeroVideoBackground` only)

1. Set `el.muted = true` explicitly on the element before calling `play()` (ref callback / effect), and call `el.play()` with the rejection swallowed.
2. Change `preload="metadata"` to `preload="auto"` so mobile buffers enough to start and the loop seam is never visible.
3. Add `disablePictureInPicture` and keep `playsInline`/`loop`/`aria-hidden` unchanged.
4. Keep all existing guards untouched: reduced-motion, save-data/2G fallback to poster, pause when off-screen or tab hidden, poster-first paint (LCP), fade-in on `canplay`.

No other files change. Desktop behaviour is preserved (same seamless loop); mobile now autoplays the same loop.

## Verification

- Build check.
- Headless browser at mobile viewport (375px) and desktop: confirm `video.paused === false`, `muted === true`, no console errors, and screenshot the hero showing motion frames.
