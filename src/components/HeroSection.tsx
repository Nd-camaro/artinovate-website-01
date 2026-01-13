import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const SESSION_KEY = "artinovate_typewriter_played";

const TypewriterText = ({
  text,
  delay = 0,
  onComplete,
  skipAnimation = false
}: {
  text: string;
  delay?: number;
  onComplete?: () => void;
  skipAnimation?: boolean;
}) => {
  const [displayedText, setDisplayedText] = useState(skipAnimation ? text : "");
  const [cursorOpacity, setCursorOpacity] = useState(skipAnimation ? 0 : 1);
  const [isTyping, setIsTyping] = useState(!skipAnimation);
  const [isReady, setIsReady] = useState(skipAnimation);
  const containerRef = useRef<HTMLSpanElement>(null);
  const animationStartedRef = useRef(false);

  // Use layout effect to measure and set container dimensions before paint
  useLayoutEffect(() => {
    if (skipAnimation || !containerRef.current) {
      setIsReady(true);
      return;
    }
    // Container already has the full text invisibly rendered for measurement
    // Mark as ready immediately since CSS handles the layout
    setIsReady(true);
  }, [skipAnimation]);

  useEffect(() => {
    if (skipAnimation) {
      onComplete?.();
      return;
    }

    // Prevent re-running if already started
    if (animationStartedRef.current) return;
    if (!isReady) return;

    animationStartedRef.current = true;

    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      const chars = text.split("");
      
      const typeNextChar = () => {
        if (currentIndex <= chars.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
          
          // Consistent, smooth typing speed
          const baseSpeed = 55;
          const variance = Math.random() * 20 - 10;
          setTimeout(typeNextChar, baseSpeed + variance);
        } else {
          // Typing complete - fade out cursor gracefully
          setIsTyping(false);
          setTimeout(() => {
            setCursorOpacity(0);
            setTimeout(() => {
              onComplete?.();
            }, 300);
          }, 600);
        }
      };
      
      typeNextChar();
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, delay, onComplete, skipAnimation, isReady]);

  return (
    <span ref={containerRef} className="relative inline">
      {/* Invisible text to establish layout - prevents reflow */}
      <span 
        className="invisible" 
        aria-hidden="true"
        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
      >
        {text}
      </span>
      {/* Visible typed text overlaid on top */}
      <span 
        className="absolute left-0 top-0"
        style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
      >
        {displayedText}
        {(isTyping || cursorOpacity > 0) && (
          <motion.span 
            className="inline-block w-[2px] h-[0.85em] bg-primary ml-0.5 align-middle rounded-sm"
            initial={{ opacity: 1 }}
            animate={{ 
              opacity: isTyping ? [1, 0.4, 1] : cursorOpacity,
            }}
            transition={isTyping ? {
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut"
            } : {
              duration: 0.4,
              ease: "easeOut"
            }}
          />
        )}
      </span>
    </span>
  );
};

export function HeroSection() {
  const [showSubhead, setShowSubhead] = useState(false);
  const [showSupporting, setShowSupporting] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    // Only run once
    if (initRef.current) return;
    initRef.current = true;

    // Check if animation has already played this session
    const hasPlayed = sessionStorage.getItem(SESSION_KEY);
    if (hasPlayed) {
      setSkipAnimation(true);
      setShowSubhead(true);
      setShowSupporting(true);
      setShowCTA(true);
    }
  }, []);

  const handleTypewriterComplete = () => {
    if (!skipAnimation) {
      sessionStorage.setItem(SESSION_KEY, "true");
    }
    setTimeout(() => setShowSubhead(true), 100);
  };
  return <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hero background image with overlay */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="" className="w-full h-full object-cover object-top" />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-background/40" />
        {/* Bottom gradient blend - slow, smooth, invisible transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 via-35% to-transparent" />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-6 lg:px-12 relative z-20 pt-20">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.div initial={{
          opacity: 0,
          y: 10
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: skipAnimation ? 0 : 0.3,
          duration: 0.5
        }}>
            <span className="label-mono text-primary mb-6 block">AI Automation Agency</span>
          </motion.div>

          {/* Main headline with typewriter */}
          <motion.h1 initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: skipAnimation ? 0 : 0.5,
          duration: 0.4
        }} className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[0.95]">
            <TypewriterText text="Autonomous Digital Presence" delay={skipAnimation ? 0 : 700} onComplete={handleTypewriterComplete} skipAnimation={skipAnimation} />
          </motion.h1>

          {/* Subheading - slides up softly */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={showSubhead ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          ease: "easeOut"
        }} onAnimationComplete={() => {
          if (showSubhead) setTimeout(() => setShowSupporting(true), 200);
        }} className="text-lg md:text-xl text-muted-foreground font-light mb-3">
            For Web3 and digital asset organizations.
          </motion.p>

          {/* Supporting line - fades in at reduced opacity */}
          <motion.p initial={{
          opacity: 0
        }} animate={showSupporting ? {
          opacity: 0.7
        } : {}} transition={{
          duration: 0.6
        }} onAnimationComplete={() => {
          if (showSupporting) setTimeout(() => setShowCTA(true), 300);
        }} className="font-mono text-xs md:text-sm text-primary mb-10">
            Publishes. Engages. Converts. Follows up.
          </motion.p>

          {/* CTA Buttons - left aligned, reduced size */}
          <motion.div initial={{
          opacity: 0,
          y: 15
        }} animate={showCTA ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.6,
          ease: "easeOut"
        }} className="flex flex-col sm:flex-row items-start gap-4">
            <Button variant="hero" size="default" className="h-10 px-6 text-sm">
              Book a strategy call
            </Button>
            
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      delay: skipAnimation ? 0.5 : 3,
      duration: 1
    }} className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <a href="#about" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          
          <ChevronDown className="w-4 h-4 scroll-indicator" />
        </a>
      </motion.div>

      {/* Connecting line starting point */}
      <motion.div initial={{
      opacity: 0,
      scaleY: 0
    }} animate={{
      opacity: 1,
      scaleY: 1
    }} transition={{
      delay: skipAnimation ? 0.5 : 3.5,
      duration: 1,
      ease: "easeOut"
    }} className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-primary/0 via-primary to-primary origin-top" />
    </section>;
}