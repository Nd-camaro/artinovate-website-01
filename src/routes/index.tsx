import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

const TITLE = "AI-Powered Digital Presence for Web3 | ArtiNovate";
const DESCRIPTION =
  "AI-powered digital presence for Web3 and digital asset companies. ArtiNovate helps firms publish expertise, engage visitors and capture qualified intent.";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI-Powered Digital Presence",
  description:
    "ArtiNovate builds AI-powered digital presence systems for Web3 and digital asset companies that publish expertise, engage visitors and capture qualified intent.",
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
