# Scheduling Modal: Heading Spacing + Faster Calendly Load

## 1. "Schedule a strategy call" heading spacing
The League Gothic heading in the booking popup sits too tight at its current size.

- Add slight letter-spacing (`tracking-wide`, ~0.02em) to the modal H2 in `src/components/SchedulingModal.tsx`, matching the open tracking already used on League Gothic headings elsewhere on the site.
- Font, size, weight, and line-height stay exactly as they are.

## 2. Calendly load speed
Today the Calendly iframe is only created the moment the popup opens, so every click pays the full load from scratch (DNS, connection, Calendly's app, availability data).

Changes:
- **Keep the iframe alive after first open** — once the popup has been opened once, the iframe stays mounted in the background (hidden when the popup is closed). Every subsequent open is effectively instant, since Calendly is already loaded.
- **Preconnect to Calendly** — add `<link rel="preconnect">` and `dns-prefetch` for `calendly.com` in the shared root head, so the browser warms the connection before the user ever clicks.
- **Eager loading hints** on the iframe (`loading="eager"`, high fetch priority).

Result: first open typically renders in roughly 1–2 seconds (Calendly's own servers set the floor — we can't go below their response time), and every later open is near-instant.

## Files touched
- `src/components/SchedulingModal.tsx` — heading tracking, persistent iframe, loading hints
- `src/routes/__root.tsx` — Calendly preconnect links in the shared head

Nothing else changes: no copy, colors, layout, or other pages.
