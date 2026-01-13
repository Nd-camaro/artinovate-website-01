import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { ScrollPath } from "@/components/ScrollPath";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-insights.jpg";
import { ArrowRight } from "lucide-react";

const categories = [
  { id: "all", label: "All" },
  { id: "automation", label: "Automation" },
  { id: "ai-engagement", label: "AI Engagement" },
  { id: "web3-ops", label: "Web3 Operations" },
  { id: "infrastructure", label: "Digital Infrastructure" },
];

const insights = [
  {
    id: 1,
    category: "automation",
    title: "Why manual content operations don't scale",
    excerpt: "The hidden costs of human-dependent publishing workflows and how autonomous systems change the equation.",
    date: "2026-01-10",
  },
  {
    id: 2,
    category: "ai-engagement",
    title: "Intelligent assistants vs traditional chatbots",
    excerpt: "Understanding the difference between rule-based responses and contextual AI engagement.",
    date: "2026-01-08",
  },
  {
    id: 3,
    category: "web3-ops",
    title: "Digital presence for protocol teams",
    excerpt: "Specific infrastructure requirements for blockchain protocols and decentralized organizations.",
    date: "2026-01-05",
  },
  {
    id: 4,
    category: "infrastructure",
    title: "Building systems that run without you",
    excerpt: "The architectural principles behind truly autonomous digital operations.",
    date: "2026-01-02",
  },
  {
    id: 5,
    category: "automation",
    title: "Lead qualification in an automated world",
    excerpt: "How AI-driven qualification outperforms traditional form-based capture.",
    date: "2025-12-28",
  },
  {
    id: 6,
    category: "ai-engagement",
    title: "The future of visitor engagement",
    excerpt: "Predictive interactions and personalized pathways for every visitor.",
    date: "2025-12-22",
  },
];

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredInsights = activeCategory === "all" 
    ? insights 
    : insights.filter(insight => insight.category === activeCategory);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <ScrollPath />
      
      <main>
        <PageHero 
          image={heroImage}
          label="Insights"
          headline="Insights on AI automation and digital systems"
          subheading="For founders, operators, and decision makers"
          scrollTarget="#content"
        />

        {/* Category Filter */}
        <section id="content" className="py-12 bg-background border-b border-border/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 text-sm font-mono rounded-md transition-all duration-200 ${
                    activeCategory === category.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Insights Grid */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredInsights.map((insight, index) => (
                <motion.article
                  key={insight.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="h-full p-6 border border-border/50 rounded-lg bg-card/20 hover:border-primary/30 hover:bg-card/40 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-xs text-primary uppercase">
                        {categories.find(c => c.id === insight.category)?.label}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(insight.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {insight.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {insight.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Read more <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Inline CTA */}
        <section className="py-16 lg:py-24 bg-graphite/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Want to discuss your specific situation?
              </h2>
              <p className="text-muted-foreground mb-6">
                Book a strategy call to explore how autonomous systems could work for your organization.
              </p>
              <Button variant="hero" size="default" className="h-10 px-6 text-sm">
                Book a strategy call
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 lg:py-20 bg-background border-t border-border/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <span className="label-mono text-primary mb-3 block">Stay Updated</span>
              <h3 className="text-xl font-semibold mb-4">
                Occasional insights on AI automation
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                No spam. Unsubscribe anytime.
              </p>
              <div className="flex gap-3">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 bg-card/50 border border-border/50 rounded-md text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
                <Button variant="minimal" size="default" className="h-10 px-5 text-sm">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
