

# Performance Optimization Plan

## Current Bottlenecks Identified

1. **Render-blocking fonts**: Google Fonts loaded via `@import` in CSS (blocks rendering) AND duplicated — Inter and IBM Plex Mono each imported twice
2. **No code splitting**: All pages (About, Insights, Contact, InsightDetail) bundled into one chunk instead of lazy-loaded
3. **Hero images not optimized**: Four large JPGs (`hero-home.jpg`, `hero-about.jpg`, etc.) loaded eagerly as static imports with no `loading="lazy"`, no `fetchpriority`, no sizing hints
4. **ScrollPath on every page**: Continuous scroll-linked framer-motion animations running on a fixed sidebar — adds JS overhead even when not visible on mobile
5. **Voiceflow widget loaded immediately**: External script injected on mount without deferral
6. **Insight card images**: `loading="eager"` explicitly set on insight featured images (line 88 of Insights.tsx)
7. **Excessive framer-motion animation variants**: Every section uses `whileInView` with individual delays — many intersection observers active simultaneously

## Implementation Plan

### 1. Fix font loading (index.html + index.css)
- Remove the two `@import url(...)` lines from `index.css` (render-blocking)
- Keep the existing `<link rel="preconnect">` tags in `index.html`
- Add `<link rel="preload" as="style">` for Google Fonts with `display=swap` (already in the URL)
- Remove duplicate font imports (Inter and IBM Plex Mono each appear twice in CSS)

### 2. Lazy-load routes (App.tsx)
- Convert all page imports to `React.lazy()` with `Suspense` fallback
- This splits About, Insights, InsightDetail, Contact, and NotFound into separate chunks

### 3. Optimize hero images (HeroSection, PageHero)
- Add `loading="lazy"` and `decoding="async"` to PageHero images (below-fold on sub-pages)
- Add `fetchpriority="high"` to the home hero image only (above-fold LCP element)
- Add explicit `width` and `height` attributes to prevent layout shift

### 4. Fix insight card images (Insights.tsx)
- Change `loading="eager"` to `loading="lazy"` on featured images (they're below the fold)

### 5. Defer Voiceflow widget (ChatWidget.tsx)
- Delay script injection by ~3 seconds after page load using `requestIdleCallback` with a `setTimeout` fallback
- This keeps the widget working identically but unblocks initial render

### 6. Optimize ScrollPath (ScrollPath.tsx)
- Already hidden on mobile via CSS (`hidden lg:block`), but the JS still runs
- Add an early return based on a media query check to skip all scroll tracking on mobile/tablet

### 7. Reduce animation overhead (all section components)
- Add `viewport={{ once: true, amount: 0.1 }}` consistently (some already have `once: true`)
- No visual changes — animations still play once when scrolled into view, just with less observer overhead

## Technical Details

- **Route splitting** uses `React.lazy` + `Suspense` — no new dependencies needed
- **Font preload** moves from CSS `@import` (parser-blocking) to HTML `<link>` (non-blocking)
- **`requestIdleCallback`** defers Voiceflow to browser idle time; falls back to 3s `setTimeout`
- All changes are internal optimizations — zero visual or behavioral changes to the UI

