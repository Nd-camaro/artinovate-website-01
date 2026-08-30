import { Link } from "@tanstack/react-router";

const columns = [
  {
    label: "Carry forward",
    items: [
      "Positioning that already resonates with buyers",
      "Messaging equity and language your market recognises",
      "Existing lead paths, tracking and integrations",
      "Search equity from URLs that already rank",
    ],
  },
  {
    label: "Change",
    items: [
      "Clarity of the core explanation",
      "Credibility and trust architecture",
      "Conversion paths for high-intent visitors",
      "A modern, faster, server-rendered experience",
    ],
  },
  {
    label: "Add",
    items: [
      "Publishing infrastructure on your own domain",
      "A contextual assistant for visitor questions",
      "Intent-aware capture and call routing",
      "Search and AI discoverability foundations",
    ],
  },
];

export function W3RedesignSection() {
  return (
    <section aria-labelledby="w3-redesign-heading" className="py-24 lg:py-32 bg-card/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="section-cluster max-w-3xl mx-auto text-center mb-16">
          <span className="label-mono text-primary mb-4 block">Web3 Website Redesign</span>
          <h2 id="w3-redesign-heading" className="section-heading">
            Your company evolved. The presence should catch up.
          </h2>
          <p className="text-lg text-muted-foreground mt-6">
            A redesign is not a restart. We keep what is working and build on it.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {columns.map((col) => (
            <div key={col.label} className="border border-border bg-card p-8 rounded-lg">
              <span className="label-mono text-primary block mb-5">{col.label}</span>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="text-muted-foreground leading-relaxed text-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
