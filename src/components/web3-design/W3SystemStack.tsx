import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const layers = [
  {
    label: "Surface",
    title: "Premium Web3 website design and build",
    body: "A fast, server-rendered site designed for institutional credibility — clear positioning, considered typography and an experience that matches how sophisticated the company actually is.",
  },
  {
    label: "Layer 01",
    title: "Publishing infrastructure",
    body: "A structured system for turning internal expertise into published articles on your own domain, continuously rather than in occasional bursts.",
  },
  {
    label: "Layer 02",
    title: "Contextual visitor engagement",
    body: "An assistant that understands your products and documentation, so visitors can ask questions and get accurate answers without waiting on your team.",
  },
  {
    label: "Layer 03",
    title: "Capture and call routing",
    body: "Intent-aware conversion paths that route serious visitors into the right conversation, with scheduling built into the site rather than bolted on.",
  },
];

export function W3SystemStack() {
  return (
    <section id="system" aria-labelledby="w3-system-heading" className="py-24 lg:py-32 bg-card/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="section-cluster max-w-3xl mx-auto text-center mb-16">
          <span className="label-mono text-primary mb-4 block">What We Build</span>
          <h2 id="w3-system-heading" className="section-heading">
            The website is the surface of a larger system
          </h2>
          <p className="text-lg text-muted-foreground mt-6">
            We design and build the site first, then extend it with the infrastructure that keeps it working after launch.
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div
            className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-primary via-primary/60 to-primary/0"
            aria-hidden="true"
          />
          <div className="space-y-6">
            {layers.map((layer, i) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-16"
              >
                <div
                  className="absolute left-[17px] top-6 w-3 h-3 rounded-full bg-primary"
                  aria-hidden="true"
                />
                <div className="border border-border bg-card p-8 rounded-lg">
                  <span className="label-mono text-primary block mb-3">{layer.label}</span>
                  <h3 className="text-xl font-bold mb-3">{layer.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{layer.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <Link
            to="/insights/$slug"
            params={{ slug: "what-is-ai-content-engine-vs-blog" }}
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Read the insight: What an AI content engine actually is
          </Link>
        </div>
      </div>
    </section>
  );
}
