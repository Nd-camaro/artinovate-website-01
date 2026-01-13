import { motion } from "framer-motion";
import { Globe, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: Globe,
    label: "No Central System",
    title: "No website, no central system",
    description: "Your organization operates without a digital home. No way for partners or investors to verify legitimacy or understand your value proposition.",
  },
  {
    icon: TrendingDown,
    label: "Static Presence",
    title: "Static website, no automation",
    description: "You have a website, but it sits idle. No publishing, no engagement, no qualification, no follow up. Your digital presence is a liability.",
  },
];

export function ProblemSection() {
  return (
    <section id="about" className="relative py-32 bg-graphite">
      {/* Subtle top gradient */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12 lg:pl-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="label-mono text-primary mb-4 block">The Problem</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Most digital operations lack real infrastructure
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="section-card p-8 md:p-10 group hover:border-primary/30 transition-colors duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <problem.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="font-mono text-xs text-accent uppercase tracking-wider mb-2 block">
                    {problem.label}
                  </span>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 tracking-tight">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle bottom gradient */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
