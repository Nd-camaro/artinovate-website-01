import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const w3Faqs = [
  {
    q: "What makes Web3 website design different?",
    a: "The buyer usually needs the business model explained before they can evaluate it, two very different audiences read the same page, the category carries a trust deficit, and the product changes faster than a traditional design cycle. Web3 website design is therefore an explanation and credibility problem as much as a visual one.",
  },
  {
    q: "What is included in a Web3 website design project?",
    a: "Positioning and structure work, interface design, a fast server-rendered build, and integration of the surrounding system: publishing infrastructure, a contextual visitor assistant, and intent-aware capture with call routing. Search and AI discoverability foundations are part of the build rather than an add-on.",
  },
  {
    q: "How much does a Web3 website cost?",
    a: "The full Publish, Engage and Capture system starts at $5,000 for a standard implementation. Pricing increases with complexity, integrations, content requirements and custom functionality. Reduced-scope or phased implementations can be scoped separately.",
  },
  {
    q: "How long does a Web3 website redesign take?",
    a: "It depends on scope, content readiness and how many systems need integrating. Diagnose and define usually move quickly; design and build take the bulk of the timeline. We agree a schedule during the define stage rather than quoting a fixed number up front.",
  },
  {
    q: "Can you redesign an existing website?",
    a: "Yes. A redesign preserves positioning, messaging equity, existing lead paths and search equity where they are working, then improves clarity, credibility and conversion and adds the publishing, engagement and capture layers around the redesigned presence.",
  },
  {
    q: "Does every site include Publish, Engage and Capture?",
    a: "The website can be built on its own, and the three functions can be added in phases. We recommend the full system because a site that only exists is the problem most companies are trying to solve, but the sequence is yours to choose.",
  },
  {
    q: "Can the system work with our existing infrastructure?",
    a: "Usually, yes. We integrate with existing analytics, CRM, scheduling and documentation sources rather than replacing them. Where a tool cannot be integrated cleanly, we say so during the diagnose stage.",
  },
];

export function W3FaqSection() {
  return (
    <section aria-labelledby="w3-faq-heading" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="section-cluster max-w-3xl mx-auto text-center mb-12">
          <span className="label-mono text-primary mb-4 block">FAQ</span>
          <h2 id="w3-faq-heading" className="section-heading">
            Common questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {w3Faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-lg font-bold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
