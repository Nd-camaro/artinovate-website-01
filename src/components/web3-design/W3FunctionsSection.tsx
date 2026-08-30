import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { useScheduling } from "@/contexts/SchedulingContext";

const functions = [
  {
    number: "01",
    name: "Publish",
    body: "The site continuously accumulates useful expertise, search visibility and authority on a domain you own.",
    link: {
      slug: "web3-startups-build-authority-ai-publishing",
      label: "how Web3 companies build authority through publishing",
    },
  },
  {
    number: "02",
    name: "Engage",
    body: "Visitors can understand complex products and ask contextual questions without waiting on someone internally.",
    link: {
      slug: "ai-chat-assistants-improve-visitor-engagement-web3-projects",
      label: "how assistants improve visitor engagement",
    },
  },
  {
    number: "03",
    name: "Capture",
    body: "High-intent visitors are guided to the right conversion path or a booked conversation instead of exiting.",
    link: {
      slug: "ai-lead-capture-system-how-it-works",
      label: "how the capture system works",
    },
  },
];

export function W3FunctionsSection() {
  const { openScheduler } = useScheduling();

  return (
    <section aria-labelledby="w3-functions-heading" className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="section-cluster max-w-3xl mx-auto text-center mb-16">
          <span className="label-mono text-primary mb-4 block">Business Outcomes</span>
          <h2 id="w3-functions-heading" className="section-heading">
            Publish. Engage. Capture.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {functions.map((fn, i) => (
            <motion.div
              key={fn.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className="label-mono text-primary block mb-4">{fn.number}</span>
              <h3 className="text-2xl font-bold mb-4">{fn.name}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">{fn.body}</p>
              <Link
                to="/insights/$slug"
                params={{ slug: fn.link.slug }}
                className="text-sm text-primary underline underline-offset-4 hover:text-primary/80"
              >
                {fn.link.label}
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-14">
          <button
            type="button"
            onClick={openScheduler}
            className="text-primary underline underline-offset-4 hover:text-primary/80 font-bold"
          >
            Book a strategy call to see how this would work for your company
          </button>
        </div>
      </div>
    </section>
  );
}
