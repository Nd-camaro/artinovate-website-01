import { motion } from "framer-motion";

const cards = [
  {
    title: "The site stops reflecting the company",
    body: "Strategy shifts, products evolve and regulation moves. The website stays where it was on launch day, describing a business that no longer exists.",
  },
  {
    title: "Expertise gets published everywhere else",
    body: "Founder and team insight ends up on social platforms and third-party media, building authority on domains you do not own.",
  },
  {
    title: "Visitors leave with questions unanswered",
    body: "Complex products need explanation. A static page cannot respond, so evaluation stalls the moment a visitor needs more than the page shows.",
  },
  {
    title: "High intent lands on a weak conversion path",
    body: "Qualified visitors arrive, read, and exit. Nothing guides them to the right next step or a booked conversation.",
  },
];

export function W3ProblemSection() {
  return (
    <section id="problem" aria-labelledby="w3-problem-heading" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="section-cluster max-w-3xl mx-auto text-center mb-16">
          <span className="label-mono text-primary mb-4 block">The Buyer Problem</span>
          <h2 id="w3-problem-heading" className="section-heading">
            Websites go stale the moment they launch
          </h2>
          <p className="text-lg text-muted-foreground mt-6">
            Most Web3 websites are built once and then quietly fall behind the company they represent.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border border-border bg-card p-8 rounded-lg"
            >
              <div className="w-8 h-px bg-primary mb-6" aria-hidden="true" />
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
