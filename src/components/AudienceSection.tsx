import { motion } from "framer-motion";

const audiences = [
  {
    title: "Web3 Founders",
    description: "Launch and scale your digital presence alongside your protocol.",
  },
  {
    title: "Blockchain Operations",
    description: "Teams managing infrastructure need visibility and trust signals.",
  },
  {
    title: "Protocol Administrations",
    description: "Governance and community communications at scale.",
  },
  {
    title: "Digital Asset Enterprises",
    description: "Institutional-grade presence for institutional-grade organizations.",
  },
  {
    title: "DeFi Protocols",
    description: "Build trust and educate users through automated content.",
  },
  {
    title: "NFT & Gaming Studios",
    description: "Engage communities and convert interest into participation.",
  },
];

export function AudienceSection() {
  return (
    <section className="relative py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 lg:pl-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="label-mono text-primary mb-4 block">Who We Serve</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl">
            Built for digital asset organizations
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {audiences.map((audience, index) => (
            <motion.div
              key={audience.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="section-card p-6 h-full hover:border-accent/30 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  {/* Accent line */}
                  <div className="w-1 h-full min-h-[60px] rounded-full bg-gradient-to-b from-primary to-accent opacity-50 group-hover:opacity-100 transition-opacity" />
                  
                  <div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {audience.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {audience.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
