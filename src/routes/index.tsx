import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

const TITLE = "Web3 Website Design Agency | ArtiNovate";
const DESCRIPTION =
  "Premium Web3 website design for digital asset, tokenization, DeFi and fintech companies. AI-powered digital presence that publishes, engages and captures.";

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
  }),
  component: Index,
});
