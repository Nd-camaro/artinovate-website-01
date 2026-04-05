

## Update Netlify Edge Function to Inject Article JSON-LD Server-Side

### Problem
The edge function currently fetches only `meta_title`, `meta_description`, `canonical_url`, and `faq_json_ld`. It does not inject the Article JSON-LD schema, so crawlers that don't execute JavaScript miss it entirely.

### Changes (single file: `netlify/edge-functions/inject-meta.ts`)

**1. Expand the Supabase `select` query (line 26)**
Add `title`, `excerpt`, `featured_image_url`, `published_at`, `slug` to the selected fields so we have data to build the Article schema.

**2. Build and inject Article JSON-LD (after line 81)**
Construct the Article schema object using fetched post data and inject it as an additional `<script type="application/ld+json">` tag before `</head>`, alongside the existing FAQ schema injection. The schema matches the exact structure already used in the React component:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.featured_image_url,
  "datePublished": post.published_at,
  "dateModified": post.published_at,
  "author": { "@type": "Organization", "name": "ArtiNovate", "url": "https://www.artinovate.com" },
  "publisher": { "@type": "Organization", "name": "ArtiNovate", "logo": { "@type": "ImageObject", "url": "https://artinovate.com/assets/artinovate-logo-BsiajO-W.png" } },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://www.artinovate.com/insights/{slug}" }
}
```

**3. Restructure the JSON-LD injection block (lines 73-82)**
- Still strip existing JSON-LD tags from the SPA shell
- Inject FAQ schema if present
- Always inject Article schema (since we have the post data at this point)
- Both go before `</head>`

### Result
Crawlers and Google Rich Results Test will see the Article JSON-LD in the raw HTML response without any JavaScript execution needed. The client-side inline script in InsightDetail.tsx remains as a fallback for direct SPA navigation.

