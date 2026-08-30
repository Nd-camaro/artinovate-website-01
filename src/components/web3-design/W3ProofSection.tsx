import { Link } from "@tanstack/react-router";

const proofs = [
  {
    title: "This website is the artifact",
    body: "Server-rendered, fast, and running the same architecture we build for clients. What you are reading is the product, not a rendering of it.",
  },
  {
    title: "The Publish system is live and publishing continuously",
    body: "Our insight library is produced by the same publishing infrastructure we install, operating on our own domain rather than on borrowed platforms.",
  },
  {
    title: "The Engage assistant is on this page",
    body: "The assistant available on this site is the same class of system we deploy. You can ask it about our work and see how it behaves.",
  },
  {
    title: "The Capture flow is the one you would use",
    body: "The strategy-call path on this site is the live capture and routing flow, not a mockup of one.",
  },
];

export function W3ProofSection() {
  return (
    <section aria-labelledby="w3-proof-heading" className="py-24 lg:py-32 bg-card/30">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="section-cluster max-w-3xl mx-auto text-center mb-16">
          <span className="label-mono text-primary mb-4 block">Demonstration Proof</span>
          <h2 id="w3-proof-heading" className="section-heading">
            The system, running in public
          </h2>
          <p className="text-lg text-muted-foreground mt-6">
            This is demonstration proof rather than client case studies: what we build, operating live on our own site so you can inspect it directly.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {proofs.map((proof) => (
            <div key={proof.title} className="border border-border bg-card p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-3">{proof.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{proof.body}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/insights"
            className="text-primary underline underline-offset-4 hover:text-primary/80 font-bold"
          >
            Browse the insight library
          </Link>
        </div>
      </div>
    </section>
  );
}
