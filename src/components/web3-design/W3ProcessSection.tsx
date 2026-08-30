import { motion } from "framer-motion";

const steps = [
  { number: "01", name: "Diagnose", body: "We review the current presence, positioning, traffic paths and where qualified interest is being lost." },
  { number: "02", name: "Define", body: "We agree the explanation, the audiences, the conversion paths and the scope of the system." },
  { number: "03", name: "Design", body: "Structure and interface design for both technical evaluators and institutional decision-makers." },
  { number: "04", name: "Build and integrate", body: "Server-rendered build, publishing infrastructure, assistant and capture flows wired into your stack." },
  { number: "05", name: "Launch", body: "Migration with existing URLs and lead paths preserved, then verification of search and social behaviour." },
  { number: "06", name: "Expand", body: "Optional. Ongoing publishing, assistant tuning and conversion refinement once the system is live." },
];

export function W3ProcessSection() {
  return (
    <section aria-labelledby="w3-process-heading" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="section-cluster max-w-3xl mx-auto text-center mb-16">
          <span className="label-mono text-primary mb-4 block">Process</span>
          <h2 id="w3-process-heading" className="section-heading">
            How the build runs
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div
            className="absolute left-[7px] top-4 bottom-4 w-px bg-gradient-to-b from-primary via-primary/50 to-primary/0"
            aria-hidden="true"
          />
          <div className="space-y-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="relative pl-12"
              >
                <div className="absolute left-0 top-2 w-4 h-4 rounded-full border border-primary bg-background" aria-hidden="true">
                  <div className="absolute inset-1 rounded-full bg-primary" />
                </div>
                <span className="label-mono text-primary block mb-2">{step.number}</span>
                <h3 className="text-xl font-bold mb-2">{step.name}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
