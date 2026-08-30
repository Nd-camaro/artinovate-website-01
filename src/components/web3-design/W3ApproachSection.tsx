import { Link } from "@tanstack/react-router";

const points = [
  {
    title: "You are explaining an unfamiliar business model",
    body: "Most Web3 buyers cannot infer what you do from a category label. The design has to carry an explanation — what the product is, who it serves, and what changes for the buyer — before it carries aesthetics.",
  },
  {
    title: "Two audiences read the same page",
    body: "Technical evaluators want depth, architecture and specifics. Institutional decision-makers want risk, credibility and outcomes. A Web3 site has to serve both without diluting either, usually through layered depth rather than a single flattened message.",
  },
  {
    title: "Trust architecture, not trust badges",
    body: "The category carries a trust deficit. Credibility comes from what a site demonstrates — clarity, accuracy, published thinking, transparent process — not from logos and claims. We treat trust as a structural design problem.",
  },
  {
    title: "The product changes faster than a design cycle",
    body: "By the time a traditional site launches, the roadmap has moved. We build systems and content structures that absorb change instead of design artefacts that must be rebuilt to reflect it.",
  },
  {
    title: "Regulatory language has to stay accurate and readable",
    body: "Compliance-sensitive wording is usually written defensively and reads that way. The craft is keeping the language accurate while still letting a buyer follow the argument.",
  },
  {
    title: "Internal expertise has to become a buyer experience",
    body: "Most teams already hold the insight that would win the deal. The design work is translating it into something a buyer can move through in sequence, rather than a documentation dump.",
  },
];

export function W3ApproachSection() {
  return (
    <section aria-labelledby="w3-approach-heading" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="section-cluster max-w-3xl mx-auto text-center mb-16">
          <span className="label-mono text-primary mb-4 block">Our Approach</span>
          <h2 id="w3-approach-heading" className="section-heading">
            Why Web3 website design requires a different approach
          </h2>
          <p className="text-lg text-muted-foreground mt-6">
            The constraints are not the same as a standard corporate site.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl mx-auto">
          {points.map((point) => (
            <div key={point.title}>
              <h3 className="text-xl font-bold mb-3">{point.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{point.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
