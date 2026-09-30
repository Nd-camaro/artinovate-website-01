import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-contact.jpg";
import { Calendar, CheckCircle, ArrowRight, MessageSquare, Target, Compass } from "lucide-react";
import { useScheduling } from "@/contexts/SchedulingContext";
const callBenefits = ["Discuss your current digital presence and operational needs", "Explore how autonomous systems could fit your organization", "Get a clear picture of the build and deployment process"];
const organizationTypes = ["Web3 Protocol / DAO", "Blockchain Operations", "Digital Asset Enterprise", "Crypto Fund / VC", "Tech Startup", "Other"];
const presenceStatus = ["No website yet", "Static website, needs upgrade", "Active site, needs automation", "Complex setup, needs optimization"];
const objectives = ["Launch initial digital presence", "Add AI engagement capabilities", "Implement lead automation", "Full autonomous system build"];
const nextSteps = [{
  icon: MessageSquare,
  title: "Discovery call",
  description: "15-minute conversation to understand your situation and goals."
}, {
  icon: Compass,
  title: "System mapping",
  description: "We map your ideal autonomous digital presence architecture."
}, {
  icon: Target,
  title: "Clear proposal",
  description: "A focused proposal with timeline, scope, and investment."
}];
export default function Contact() {
  const {
    openScheduler
  } = useScheduling();
  const [formData, setFormData] = useState({
    name: "",
    email: ""
    ,company: "",
    message: ""
  });
  const [draftOpened, setDraftOpened] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Website enquiry from ${formData.name.trim()}`;
    const body = `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nCompany or website: ${formData.company.trim() || "Not provided"}\n\nWhat are you looking to build?\n${formData.message.trim()}`;
    window.location.href = `mailto:ndnwankwo01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  };
  return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <main>
        <PageHero image={heroImage} imageAlt="Dark cubic infrastructure with cyan signal routes converging into one illuminated destination" label="Contact" headline="Start with clarity" subheading="From first build to full automation" scrollTarget="#booking" />

        {/* Booking Section */}
        <section id="booking" className="py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto items-start">
              {/* Left: Booking info */}
              <motion.div initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: "-100px"
            }} transition={{
              duration: 0.6
            }}>
                <span className="label-mono text-primary mb-5 block">Strategy Call</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[0.015em] leading-[1.2] mb-7">Book a 15-minute call</h2>
                <p className="text-muted-foreground mb-10 leading-relaxed">Just a short conversation to understand your situation and explore possibilities.</p>

                <ul className="space-y-4 mb-10">
                  {callBenefits.map((benefit, index) => <motion.li key={index} initial={{
                  opacity: 0,
                  x: -20
                }} whileInView={{
                  opacity: 1,
                  x: 0
                }} viewport={{
                  once: true
                }} transition={{
                  duration: 0.4,
                  delay: index * 0.1
                }} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">{benefit}</span>
                    </motion.li>)}
                </ul>

                <Button variant="hero" size="default" className="h-10 px-6 text-sm inline-flex items-center gap-2" onClick={openScheduler}>
                  <Calendar className="w-4 h-4" />
                  Schedule a call
                </Button>

              </motion.div>

              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6, delay: 0.1 }} className="min-w-0">
                <span className="label-mono text-primary mb-5 block">Send a message</span>
                <h2 className="text-3xl md:text-4xl font-bold tracking-[0.015em] leading-[1.2] mb-7">Prefer to write first?</h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">Tell us a little about what you have in mind.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-sm font-bold mb-2">Name</label>
                      <input id="contact-name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full h-12 rounded-md border border-border bg-card px-4 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-bold mb-2">Email</label>
                      <input id="contact-email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full h-12 rounded-md border border-border bg-card px-4 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-company" className="block text-sm font-bold mb-2">Company or Website</label>
                    <input id="contact-company" name="company" type="text" autoComplete="organization" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full h-12 rounded-md border border-border bg-card px-4 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-bold mb-2">What are you looking to build?</label>
                    <textarea id="contact-message" name="message" rows={5} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full rounded-md border border-border bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y" />
                  </div>
                  <Button type="submit" variant="hero" size="default" className="h-10 px-6 text-sm inline-flex items-center gap-2">
                    Send message <ArrowRight className="w-4 h-4" />
                  </Button>
                  {draftOpened && <p role="status" className="text-sm text-muted-foreground">Your email app should open with your message ready to send. Please send it there to complete your enquiry.</p>}
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Reassurance Section - Next Steps */}
        <section className="py-24 lg:py-32 bg-graphite/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial={{
            opacity: 0,
            y: 30
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true,
            margin: "-100px"
          }} transition={{
            duration: 0.6
          }} className="max-w-3xl mx-auto mb-12 section-cluster">
              <span className="label-mono text-primary mb-4 block">What Happens Next</span>
              <h2 className="section-heading">
                A structured path to clarity
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto">
              {nextSteps.map((step, index) => <motion.div key={index} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true,
              margin: "-50px"
            }} transition={{
              duration: 0.5,
              delay: index * 0.15
            }} className="relative">
                  {/* Connector line */}
                  {index < nextSteps.length - 1 && <div className="hidden md:block absolute top-6 left-12 w-[calc(100%+3rem)] h-px bg-gradient-to-r from-primary/50 to-transparent" aria-hidden="true" />}
                  
                  <div className="flex flex-col items-start">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-mono text-xs text-muted-foreground mb-2">Step {index + 1}</span>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </section>

        {/* Final reassurance */}
        <section className="py-16 lg:py-20 bg-background border-t border-border/30">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="max-w-2xl text-center mx-auto">
              <p className="text-muted-foreground">
                The goal isn’t to put more technology in your business. It’s to make the technology you build actually produce something.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

    </div>;
}