import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";

import { ProblemSection } from "@/components/ProblemSection";
import { CoreFunctionsSection } from "@/components/CoreFunctionsSection";
import { SystemFlowSection } from "@/components/SystemFlowSection";
import { AudienceSection } from "@/components/AudienceSection";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navigation />
      
      <main>
        <HeroSection />
        <ProblemSection />
        <CoreFunctionsSection />
        <SystemFlowSection />
        <AudienceSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
