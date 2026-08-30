import { createFileRoute } from "@tanstack/react-router";
import Web3WebsiteDesign from "@/pages/Web3WebsiteDesign";
import { w3Faqs } from "@/components/web3-design/W3FaqSection";

const URL = "https://www.artinovate.com/web3-website-design";
const TITLE = "Web3 Website Design & Web3 Design Agency | ArtiNovate";
const DESCRIPTION =
  "Premium Web3 website design and redesign for digital asset, tokenization, DeFi and fintech companies — sites that publish, engage visitors and capture intent.";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web3 Website Design and Development",
  serviceType: "Web3 website design, development and redesign",
  areaServed: "Global",
  description:
    "ArtiNovate designs, builds and redesigns Web3 websites for digital asset, tokenization, DeFi and fintech companies, extending them with publishing, visitor engagement and lead capture.",
  provider: { "@id": "https://www.artinovate.com/#organization" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.artinovate.com/" },
    { "@type": "ListItem", position: 2, name: "Web3 Website Design", item: URL },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: w3Faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export const Route = createFileRoute("/web3-website-design")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(serviceSchema) },
      { type: "application/ld+json", children: JSON.stringify(breadcrumbSchema) },
      { type: "application/ld+json", children: JSON.stringify(faqSchema) },
    ],
  }),
  component: Web3WebsiteDesign,
});
