import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useScheduling } from "@/contexts/SchedulingContext";
import { PageHero } from "@/components/PageHero";
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
      <PageHero
        image={heroImage}
        imageAlt="Abstract dark architectural environment of charcoal cubic forms with electric cyan signal pathways running beneath a translucent surface plane"
        headline="Web3 Website Design for Companies That Have Outgrown Static Sites"
        subheading="ArtiNovate designs premium Web3 websites that operate as digital presence systems — they publish expertise, engage visitors and capture qualified intent."
        scrollTarget="#system"
        actions={
          <>
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
          </>
        }
      />

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
