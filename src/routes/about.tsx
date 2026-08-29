import { createFileRoute } from "@tanstack/react-router";
import About from "@/pages/About";

const TITLE = "About ArtiNovate | AI Automation Agency for Web3";
const DESCRIPTION =
  "Learn about ArtiNovate's infrastructure-first approach to building autonomous AI-powered digital presence systems for Web3 and blockchain organizations.";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ArtiNovate",
  url: "https://www.artinovate.com",
  description:
    "ArtiNovate builds autonomous AI-powered digital presence systems for Web3 and digital asset organizations.",
  sameAs: ["https://www.linkedin.com/company/artinovate-aaa/"],
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://www.artinovate.com/about" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://www.artinovate.com/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(organizationSchema),
      },
    ],
  }),
  component: About,
});
