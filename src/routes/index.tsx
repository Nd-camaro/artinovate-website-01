import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

const TITLE = "Web3 Website Design Agency | ArtiNovate";
const DESCRIPTION =
  "Premium Web3 website design for digital asset, tokenization, DeFi and fintech companies. AI-powered digital presence that publishes, engages and captures.";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Premium Web3 Website Design",
  description:
    "ArtiNovate designs AI-powered Web3 websites for digital asset, tokenization, DeFi and fintech companies, combining publishing, visitor engagement and lead capture in one digital presence system.",
  provider: { "@id": "https://www.artinovate.com/#organization" },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://www.artinovate.com/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://www.artinovate.com/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(serviceSchema),
      },
    ],
  }),
  component: Index,
});
