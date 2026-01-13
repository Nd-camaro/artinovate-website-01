import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const TypewriterText = ({ text, delay = 0, onComplete }: { text: string; delay?: number; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
          setIsComplete(true);
          onComplete?.();
        }
      }, 40);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay, onComplete]);

  return (
    <span>
      {displayedText}
      {!isComplete && <span className="typewriter-cursor" />}
    </span>
  );
};

export function HeroSection() {
  const [showSubhead, setShowSubhead] = useState(false);
  const [showSupporting, setShowSupporting] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    // Trigger the hero content after logo animation
    const timer = setTimeout(() => setAnimationComplete(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] animate-float" style={{ animationDelay: "-2s" }} />
      
      {/* Logo sweep animation */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "100%", opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute top-1/2 left-0 -translate-y-1/2 z-10"
      >
        <div className="flex items-center gap-4 px-8">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-2xl">A</span>
          </div>
          <span className="text-4xl font-bold tracking-tight text-gradient">ArtiNovate</span>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <span className="label-mono text-primary mb-6 block">AI Automation Agency</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[0.95]"
          >
            <TypewriterText text="Autonomous digital presence" delay={1200} onComplete={() => setShowSubhead(true)} />
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showSubhead ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            onAnimationComplete={() => setTimeout(() => setShowSupporting(true), 300)}
            className="text-xl md:text-2xl text-muted-foreground font-light mb-4"
          >
            For Web3 and digital asset organizations.
          </motion.p>

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showSupporting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            onAnimationComplete={() => setTimeout(() => setShowCTA(true), 500)}
            className="font-mono text-sm md:text-base text-primary mb-12"
          >
            Publishes. Engages. Converts. Follows up.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={showCTA ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Button variant="hero" size="xl">
              Book a strategy call
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="font-mono text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5 scroll-indicator" />
        </a>
      </motion.div>

      {/* Connecting lines starting point */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: 4.5, duration: 1, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-primary/0 via-primary to-primary origin-top"
      />
    </section>
  );
}
