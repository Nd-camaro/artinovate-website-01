import type { Context } from "https://edge.netlify.com";

const SUPABASE_URL = "https://nsrnoxsxjmmhfwdrowpp.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcm5veHN4am1taGZ3ZHJvd3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNDcwNzEsImV4cCI6MjA4MzgyMzA3MX0.7NicTKI9HCC42NrJAz1gMTahjKN3sBHLk0OHjleWRfk";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default async function handler(req: Request, context: Context) {
  const url = new URL(req.url);
  const segments = url.pathname.split("/").filter(Boolean);

  // Extract slug from /insights/:slug
  if (segments.length < 2 || segments[0] !== "insights") {
    return context.next();
  }
  const slug = segments[1];

  // Fetch post from Supabase
  const apiUrl = `${SUPABASE_URL}/rest/v1/insight_posts?slug=eq.${encodeURIComponent(slug)}&status=eq.published&select=meta_title,meta_description,canonical_url,faq_json_ld&limit=1`;

  let post: any = null;
  try {
    const res = await fetch(apiUrl, {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      post = data[0];
    }
  } catch {
    // Fall through to default HTML
  }

  if (!post) {
    return context.next();
  }

  // Get the original response (the SPA index.html)
  const response = await context.next();
  let html = await response.text();

  // Replace <title>
  if (post.meta_title) {
    html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(post.meta_title)}</title>`);
  }

  // Replace <meta name="description">
  if (post.meta_description) {
    html = html.replace(
      /<meta\s+name="description"\s+content="[^"]*"/,
      `<meta name="description" content="${escapeHtml(post.meta_description)}"`
    );
  }

  // Replace <link rel="canonical">
  if (post.canonical_url) {
    html = html.replace(
      /<link\s+rel="canonical"\s+href="[^"]*"/,
      `<link rel="canonical" href="${escapeHtml(post.canonical_url)}"`
    );
  }

  // Replace JSON-LD script tags
  if (post.faq_json_ld) {
    const jsonLd = typeof post.faq_json_ld === "string" ? post.faq_json_ld : JSON.stringify(post.faq_json_ld);
    // Remove existing JSON-LD scripts and inject the post-specific one
    html = html.replace(/<script\s+type="application\/ld\+json">[^<]*<\/script>/g, "");
    html = html.replace(
      "</head>",
      `<script type="application/ld+json">${jsonLd}</script>\n</head>`
    );
  }

  return new Response(html, {
    status: response.status,
    headers: response.headers,
  });
}
