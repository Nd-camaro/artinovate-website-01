

## Update Article JSON-LD in InsightDetail.tsx

The Article JSON-LD already exists in `src/pages/InsightDetail.tsx` (lines 71-96) and is dynamically injected via `useDocumentHead`. Two small adjustments are needed to match the requested spec exactly:

### Changes (single file: `src/pages/InsightDetail.tsx`)

1. **Line 78**: Change `"dateModified"` from `insight.updated_at || "2026-04-04"` to `insight.published_at || ""`
2. **Line 82**: Change author URL from `"https://artinovate.com"` to `"https://www.artinovate.com"`
3. **Line 94**: Change mainEntityOfPage `@id` from `` `https://artinovate.com/insights/...` `` to `` `https://www.artinovate.com/insights/...` ``

No other files need editing. The schema is already template-driven — every published post automatically gets its own Article JSON-LD with the correct headline, description, image, and dates.

