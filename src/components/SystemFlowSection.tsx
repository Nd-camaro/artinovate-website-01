import { motion } from "framer-motion";
import { Map, Cpu, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Map,
    number: "01",
    title: "Strategy & Mapping",
    description: "We analyze your organization, audience, and goals to design a tailored autonomous system.",
  },
  {
    icon: Cpu,
    number: "02",
    title: "AI Infrastructure Build",
    description: "Our team builds your custom AI-powered website with integrated automation workflows.",
  },
  {
    icon: Rocket,
    number: "03",
    title: "Deployment",
    description: "Your autonomous digital presence goes live, immediately beginning to publish, engage, and capture.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Continuous Optimization",
    description: "The system learns and improves over time, with our team monitoring and enhancing performance.",
  },
];

export function SystemFlowSection() {
  return (
    <section id="system" className="relative py-32 bg-graphite overflow-hidden">
      {/* Top transition */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 lg:pl-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="label-mono text-primary mb-4 block">The Process</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
            From strategy to autonomous operation
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-0 right-0 h-px bg-border hidden lg:block" />
          
          <div className="grid lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative"
              >
                {/* Node on timeline */}
                <div className="hidden lg:flex absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>

                {/* Card */}
                <div className="section-card p-6 md:p-8 mt-0 lg:mt-12 h-full group hover:border-primary/30 transition-colors duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-mono text-accent text-lg">{step.number}</span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Arrow to next step */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 text-primary">
                    <svg className="w-8 h-4" viewBox="0 0 32 16" fill="none">
                      <path d="M0 8h28M22 2l6 6-6 6" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom transition */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
