# Insight-detail first-navigation crash — diagnosis

Reproduced in a headless browser against the dev server: load `/insights`, click the first
article card. The page lands on "Something went wrong — An unexpected error occurred".
Clicking "Try again" renders the same article correctly.

## 1. Exact root cause

It is not the loader, not Supabase, not hydration, and not the router shim.

The legacy `useDocumentHead` hook (`src/hooks/useDocumentHead.ts`) is still mounted on the
migrated page components. It imperatively mutates `document.head`: it rewrites `<title>`,
meta tags and the canonical link, **removes every `<script type="application/ld+json">`**,
appends its own, and on cleanup re-appends clones of the ones it removed.

Under TanStack Start those head nodes are rendered by React through `<HeadContent />`
(root `Organization` JSON-LD plus each route's `head()` scripts). React therefore owns those
DOM nodes. When the hook deletes and re-creates them behind React's back, React's fiber tree
still points at the removed nodes. On the next commit — the navigation from `/insights` to
`/insights/$slug`, where the head set changes — React tries to unmount the old `<script>` and
its `removeChild` call fails, which throws inside the commit phase and is caught by the root
`errorComponent`.

Affected pages (all still call the hook while their route file also defines `head()`):
`src/pages/Insights.tsx`, `src/pages/About.tsx`, `src/pages/Contact.tsx`, `src/pages/Privacy.tsx`.
`/insights` is the one that reliably triggers it because it is the common entry point into a
route whose head content differs.

## 2. Error / stack

```text
NotFoundError: Failed to execute 'removeChild' on 'Node':
The node to be removed is not a child of this node.
    at removeChild (react-dom_client.js)
    at commitDeletionEffectsOnFiber
    at recursivelyTraverseDeletionEffects
    at commitMutationEffectsOnFiber
The above error occurred in the <script> component.
React will try to recreate this component tree from scratch using the error boundary
you provided, CatchBoundaryImpl.
Warning: Error in route match: __root__/
```

Preceded in the console by the hook's own logs:
`Removed existing homepage JSON-LD script tags.` / `Injected new FAQ JSON-LD script tag.`

## 3. Why retry succeeds

"Try again" re-renders the route subtree from scratch. By then the Insights page has
unmounted, the hook no longer runs, and React rebuilds the head nodes fresh — so the stale
fiber-to-DOM mismatch is gone. The article data was never the problem; the loader had already
resolved successfully.

## 4. Smallest safe fix

Remove the duplicated client-side head plumbing from the four migrated page components:

- Delete the `useDocumentHead({...})` call and its import from `src/pages/Insights.tsx`,
  `src/pages/About.tsx`, `src/pages/Contact.tsx`, `src/pages/Privacy.tsx`.
- Confirm each corresponding route file (`src/routes/insights/index.tsx`, `about.tsx`,
  `contact.tsx`, `privacy.tsx`) already declares the same title, description, canonical,
  social tags and JSON-LD in its `head()`; add any field that is present in the hook but
  missing from `head()`, so metadata is unchanged.
- Leave `src/hooks/useDocumentHead.ts` on disk (unused) — deleting it is optional cleanup.

No UI change, no generic retry, no error suppression, no loader change.

## 5. Impact

- **SSR metadata:** improves it. `head()` is server-rendered; the hook only ran after
  hydration, so it was invisible to crawlers anyway.
- **Supabase fetching:** untouched — the `/insights/$slug` loader and the Insights list query
  stay exactly as they are.
- **Article SEO:** unchanged, provided the parity check in step 2 is done before removal.
  Titles, descriptions, canonicals, og/twitter tags and JSON-LD continue to be emitted from
  the route `head()` definitions, now in raw server HTML.

## Verification after the fix

- Click through `/insights` → article on first click, no error screen, no console errors.
- Check the same for `/about`, `/contact`, `/privacy`.
- `curl` each route and confirm title, canonical and JSON-LD are still present in raw HTML.
