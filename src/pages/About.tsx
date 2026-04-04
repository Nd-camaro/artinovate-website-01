import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { useDocumentHead } from "@/hooks/useDocumentHead";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-about.jpg";
import { Layers, Server, Cpu, Zap } from "lucide-react";

const philosophyPoints = [
  "Digital presence is operational infrastructure, not decoration.",
  "Every website should work autonomously, 24/7.",
  "Systems scale. Manual processes don't.",
  "Clarity first. Complexity where necessary.",
];

const audienceSegments = [
  {
    title: "First-time builders",
    description: "Organizations launching their first professional digital presence with automation built in from day one."
  },
  {
    title: "Operations & administrations",
    description: "Teams managing digital assets, protocols, or platforms that need reliable, scalable infrastructure."
  },
  {
    title: "Enterprises seeking reliability",
    description: "Established organizations upgrading from static sites to intelligent, self-operating systems."
  },
];

const principles = [
  { icon: Layers, label: "Infrastructure before aesthetics", description: "The system works first. Then it looks exceptional." },
  { icon: Server, label: "Systems before pages", description: "Every component serves the whole. No isolated elements." },
  { icon: Cpu, label: "Automation before manual effort", description: "What can be automated, will be automated." },
  { icon: Zap, label: "Clarity before features", description: "Simple systems outperform complicated ones." },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      
      <main>
        <PageHero 
          image={heroImage}
          label="About ArtiNovate"
          headline="Infrastructure for modern digital operations"
          subheading="Built from zero or upgraded for scale"
          scrollTarget="#philosophy"
        />

        {/* Philosophy Section */}
        <section id="philosophy" className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl"
            >
              <span className="label-mono text-primary mb-4 block">Philosophy</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">
                Digital presence is operational infrastructure
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {philosophyPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 border border-border/50 rounded-lg bg-card/30"
                >
                  <p className="text-muted-foreground leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Who We Serve Section */}
        <section className="py-24 lg:py-32 bg-graphite/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-12"
            >
              <span className="label-mono text-primary mb-4 block">Who We Serve</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Organizations that value reliability
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl">
              {audienceSegments.map((segment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group"
                >
                  <div className="h-full p-6 border border-border/50 rounded-lg bg-card/20 hover:border-primary/30 transition-colors">
                    <h3 className="text-lg font-semibold mb-3 text-foreground">{segment.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{segment.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Operating Principles Section */}
        <section className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-12"
            >
              <span className="label-mono text-primary mb-4 block">Operating Principles</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                How we build systems
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {principles.map((principle, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex gap-4 p-6 border border-border/50 rounded-lg bg-card/30"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <principle.icon className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-mono text-sm text-foreground mb-2">{principle.label}</h3>
                    <p className="text-sm text-muted-foreground">{principle.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 lg:py-32 bg-graphite/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
                Ready to build infrastructure that works?
              </h2>
              <Button variant="hero" size="default" className="h-10 px-6 text-sm">
                Start a conversation
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
