import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { PageHero } from "@/components/PageHero";
import { ScrollPath } from "@/components/ScrollPath";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-contact.jpg";
import { Calendar, CheckCircle, ArrowRight, MessageSquare, Target, Compass } from "lucide-react";

const callBenefits = [
  "Discuss your current digital presence and operational needs",
  "Explore how autonomous systems could fit your organization",
  "Get a clear picture of the build and deployment process",
];

const organizationTypes = [
  "Web3 Protocol / DAO",
  "Blockchain Operations",
  "Digital Asset Enterprise",
  "Crypto Fund / VC",
  "Tech Startup",
  "Other",
];

const presenceStatus = [
  "No website yet",
  "Static website, needs upgrade",
  "Active site, needs automation",
  "Complex setup, needs optimization",
];

const objectives = [
  "Launch initial digital presence",
  "Add AI engagement capabilities",
  "Implement lead automation",
  "Full autonomous system build",
];

const nextSteps = [
  { icon: MessageSquare, title: "Discovery call", description: "30-minute conversation to understand your situation and goals." },
  { icon: Compass, title: "System mapping", description: "We map your ideal autonomous digital presence architecture." },
  { icon: Target, title: "Clear proposal", description: "A focused proposal with timeline, scope, and investment." },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    organizationType: "",
    presenceStatus: "",
    objective: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      <ScrollPath />
      
      <main>
        <PageHero 
          image={heroImage}
          label="Contact"
          headline="Start with clarity"
          subheading="From first build to full automation"
          scrollTarget="#booking"
        />

        {/* Booking Section */}
        <section id="booking" className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl">
              {/* Left: Booking info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <span className="label-mono text-primary mb-4 block">Strategy Call</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  Book a 30-minute call
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  No sales pitch. Just a focused conversation to understand your situation and explore possibilities.
                </p>

                <ul className="space-y-4 mb-10">
                  {callBenefits.map((benefit, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>

                <Button variant="hero" size="default" className="h-10 px-6 text-sm inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule a call
                </Button>

                {/* Calendar embed placeholder */}
                <div className="mt-10 p-8 border border-border/30 rounded-lg bg-card/20">
                  <p className="text-sm text-muted-foreground text-center">
                    Calendar integration coming soon
                  </p>
                </div>
              </motion.div>

              {/* Right: Qualification form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="label-mono text-primary mb-4 block">Or tell us about your project</span>
                <h3 className="text-2xl font-bold tracking-tight mb-6">
                  Quick qualification form
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Organization Type */}
                  <div>
                    <label className="block text-sm font-mono text-muted-foreground mb-3">
                      Organization type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {organizationTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, organizationType: type })}
                          className={`px-4 py-3 text-sm text-left rounded-md border transition-all duration-200 ${
                            formData.organizationType === type
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/30"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Digital Presence Status */}
                  <div>
                    <label className="block text-sm font-mono text-muted-foreground mb-3">
                      Current digital presence
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {presenceStatus.map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setFormData({ ...formData, presenceStatus: status })}
                          className={`px-4 py-3 text-sm text-left rounded-md border transition-all duration-200 ${
                            formData.presenceStatus === status
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/30"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Primary Objective */}
                  <div>
                    <label className="block text-sm font-mono text-muted-foreground mb-3">
                      Primary objective
                    </label>
                    <div className="grid grid-cols-1 gap-2">
                      {objectives.map((objective) => (
                        <button
                          key={objective}
                          type="button"
                          onClick={() => setFormData({ ...formData, objective: objective })}
                          className={`px-4 py-3 text-sm text-left rounded-md border transition-all duration-200 ${
                            formData.objective === objective
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border/50 bg-card/30 text-muted-foreground hover:border-primary/30"
                          }`}
                        >
                          {objective}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-mono text-muted-foreground mb-3">
                      Email address
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@organization.com"
                      className="w-full px-4 py-3 bg-card/30 border border-border/50 rounded-md text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    />
                  </div>

                  <Button type="submit" variant="hero" size="default" className="h-10 px-6 text-sm">
                    Submit
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reassurance Section - Next Steps */}
        <section className="py-24 lg:py-32 bg-graphite/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mb-12"
            >
              <span className="label-mono text-primary mb-4 block">What Happens Next</span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                A structured path to clarity
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl">
              {nextSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Connector line */}
                  {index < nextSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent" />
                  )}
                  
                  <div className="flex flex-col items-start">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground mb-2">Step {index + 1}</span>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final reassurance */}
        <section className="py-16 lg:py-20 bg-background border-t border-border/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl text-center mx-auto"
            >
              <p className="text-muted-foreground">
                No fluff. No pressure. Just a clear conversation about building infrastructure that works.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
