import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useScheduling } from "@/contexts/SchedulingContext";
import { CTASection } from "@/components/CTASection";
import { W3ProblemSection } from "@/components/web3-design/W3ProblemSection";
import { W3SystemStack } from "@/components/web3-design/W3SystemStack";
import { W3FunctionsSection } from "@/components/web3-design/W3FunctionsSection";
import { W3AudienceSection } from "@/components/web3-design/W3AudienceSection";
import { W3ApproachSection } from "@/components/web3-design/W3ApproachSection";
import { W3RedesignSection } from "@/components/web3-design/W3RedesignSection";
import { W3ProcessSection } from "@/components/web3-design/W3ProcessSection";
import { W3ProofSection } from "@/components/web3-design/W3ProofSection";
import { W3FaqSection } from "@/components/web3-design/W3FaqSection";
import heroImage from "@/assets/web3-website-design-hero.jpg";

export default function Web3WebsiteDesign() {
  const { openScheduler } = useScheduling();

  return (
    <main className="bg-background text-foreground">
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Abstract dark architectural environment of charcoal cubic forms with electric cyan signal pathways running beneath a translucent surface plane"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            decoding="async"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 via-35% to-transparent" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-20 pt-24 pb-16">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-5xl md:text-7xl lg:text-8xl font-normal tracking-[0.015em] mb-6 leading-[1.1]"
            >
              Web3 Website Design for Companies That Have Outgrown Static Sites
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground font-light mb-10 max-w-2xl"
            >
              ArtiNovate designs premium Web3 websites that operate as digital presence systems — they publish expertise, engage visitors and capture qualified intent.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Button variant="hero" size="default" className="h-10 px-6 text-sm group" onClick={openScheduler}>
                Book a strategy call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button asChild variant="outline" size="default" className="h-10 px-6 text-sm">
                <a href="#system">
                  See how it works
                  <ChevronDown className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <W3ProblemSection />
      <W3SystemStack />
      <W3FunctionsSection />
      <W3AudienceSection />
      <W3ApproachSection />
      <W3RedesignSection />
      <W3ProcessSection />
      <W3ProofSection />
      <W3FaqSection />
      <CTASection />
    </main>
  );
}
