import { motion } from "framer-motion";
import { FileText, MessageSquare, Target } from "lucide-react";

const functions = [
  {
    icon: FileText,
    title: "Publish",
    description: "AI generates and publishes authoritative content that establishes thought leadership and attracts organic traffic.",
    accent: "from-primary/20 to-primary/5",
  },
  {
    icon: MessageSquare,
    title: "Engage",
    description: "Intelligent assistants interact with visitors 24/7, answering questions and guiding them through your ecosystem.",
    accent: "from-accent/20 to-accent/5",
  },
  {
    icon: Target,
    title: "Capture",
    description: "Qualified leads are captured automatically. Every visitor interaction routes into a structured system, ready for a real conversation.",
    accent: "from-primary/20 to-primary/5",
  },
];

export function CoreFunctionsSection() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 lg:pl-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center lg:text-left"
        >
          <span className="label-mono text-primary mb-4 block">System Overview</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
            One system. Three functions.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {functions.map((func, index) => (
            <motion.div
              key={func.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="section-card h-full p-6 md:p-8 relative overflow-hidden hover:border-primary/30 transition-all duration-500">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${func.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <func.icon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Label */}
                  <span className="font-mono text-xs text-accent uppercase tracking-widest mb-2 block">
                    0{index + 1}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mb-3 tracking-tight">
                    {func.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {func.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
