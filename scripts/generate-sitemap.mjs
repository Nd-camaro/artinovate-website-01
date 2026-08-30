const SUPABASE_URL = "https://nsrnoxsxjmmhfwdrowpp.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5zcm5veHN4am1taGZ3ZHJvd3BwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyNDcwNzEsImV4cCI6MjA4MzgyMzA3MX0.7NicTKI9HCC42NrJAz1gMTahjKN3sBHLk0OHjleWRfk";
const SITE_URL = "https://www.artinovate.com";

import { writeFileSync, existsSync, mkdirSync } from "fs";

const REDIRECTED_SLUGS = new Set([
  "autonomous-ai-powered-website-web3-context",
  "autonomous-ai-powered-web3-website",
  "what-is-autonomous-ai-powered-website-web3",
  "autonomous-ai-website",
  "ai-interpretability-impact-security",
  "ai-model-interpretability-critical-ai-safety",
  "ai-interpretability-legal-requirement",
  "ai-safety-interpretability-cybersecurity",
  "offense-defense-imbalance-ai-cybersecurity",
]);

const staticPages = [
  { path: "/", priority: "1.0" },
  { path: "/web3-website-design", priority: "0.9" },
  { path: "/about", priority: "0.8" },
  { path: "/insights", priority: "0.8" },
  { path: "/contact", priority: "0.8" },
  { path: "/privacy", priority: "0.3" },
];

async function main() {

  // Fetch published posts
  let posts = [];
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/insight_posts?status=eq.published&select=slug,updated_at&order=published_at.desc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );
    posts = await res.json();
    if (!Array.isArray(posts)) posts = [];
    console.log(`Fetched ${posts.length} published posts for sitemap.`);
  } catch (e) {
    console.warn("Failed to fetch posts, generating sitemap with static pages only.", e);
  }

  const urls = staticPages.map(
    (p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  );

  for (const post of posts.filter(p => !REDIRECTED_SLUGS.has(p.slug))) {
    const lastmod = post.updated_at ? post.updated_at.split("T")[0] : null;
    urls.push(`  <url>
    <loc>${SITE_URL}/insights/${post.slug}</loc>
${lastmod ? `    <lastmod>${lastmod}</lastmod>\n` : ""}    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

  // TanStack Start serves static assets from dist/client (Nitro build output)
  const outDir = existsSync("dist/client") ? "dist/client" : existsSync(".output/public") ? ".output/public" : "dist";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(`${outDir}/sitemap.xml`, xml);
  console.log(`sitemap.xml generated successfully in ${outDir}.`);
}

main();
