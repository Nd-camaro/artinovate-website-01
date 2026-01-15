import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useScheduling } from "@/contexts/SchedulingContext";
export function CTASection() {
  const {
    openScheduler
  } = useScheduling();
  return <section id="contact" className="relative py-32 lg:py-48 bg-background overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
        
        {/* Gradient orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Path termination visual */}
          <motion.div initial={{
          opacity: 0,
          scale: 0
        }} whileInView={{
          opacity: 1,
          scale: 1
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }} className="w-16 h-16 mx-auto mb-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-background" />
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          y: 40
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.8
        }}>
            <span className="label-mono text-primary mb-6 block">Ready to Begin?</span>
            
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[1.1]">
              Turn your digital presence into an{" "}
              <span className="text-gradient">autonomous growth asset</span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Schedule a strategy call to explore how ArtiNovate can build your autonomous digital infrastructure.
            </p>

            <div className="flex justify-center">
              <Button variant="hero" size="xl" className="group" onClick={openScheduler}>
                Book a strategy call
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Trust indicators */}
          
        </div>
      </div>
    </section>;
}