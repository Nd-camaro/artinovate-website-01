import { createFileRoute } from "@tanstack/react-router";
import Insights from "@/pages/Insights";

const TITLE = "Web3 AI Automation Insights | ArtiNovate";
const DESCRIPTION =
  "Insights on AI automation, autonomous digital presence systems, and Web3 digital strategy from ArtiNovate.";

const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "ArtiNovate Insights",
  description: DESCRIPTION,
  url: "https://www.artinovate.com/insights",
  isPartOf: {
    "@type": "WebSite",
    name: "ArtiNovate",
    url: "https://www.artinovate.com",
  },
};

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://www.artinovate.com/insights" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://www.artinovate.com/insights" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(collectionPageSchema),
      },
    ],
  }),
  component: Insights,
});
