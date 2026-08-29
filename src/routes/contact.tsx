import { createFileRoute } from "@tanstack/react-router";
import Contact from "@/pages/Contact";

const TITLE = "Contact ArtiNovate | Book a Strategy Call";
const DESCRIPTION =
  "Book a strategy call with ArtiNovate to discuss autonomous AI-powered digital presence systems for your Web3 organization.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://www.artinovate.com/contact" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://www.artinovate.com/contact" }],
  }),
  component: Contact,
});
