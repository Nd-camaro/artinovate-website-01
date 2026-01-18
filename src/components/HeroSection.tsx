import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";
import { useScheduling } from "@/contexts/SchedulingContext";

const SESSION_KEY = "artinovate_typewriter_played";

// Fixed two-line headline for all breakpoints
const HEADLINE_LINE_1 = "Autonomous AI";
const HEADLINE_LINE_2 = "Powered Websites";

interface TypewriterProps {
  lines: string[];
  isActive: boolean;
  onComplete?: () => void;
  skipAnimation?: boolean;
}

const Typewriter = ({
  lines,
  isActive,
  onComplete,
  skipAnimation = false,
}: TypewriterProps) => {
  // Track characters revealed per line for stable two-line rendering
  const [line1Chars, setLine1Chars] = useState(skipAnimation ? lines[0].length : 0);
  const [line2Chars, setLine2Chars] = useState(skipAnimation ? lines[1].length : 0);
  const [showCursor, setShowCursor] = useState(false);
  const [isComplete, setIsComplete] = useState(skipAnimation);
  const hasStartedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  
  // Keep onComplete ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const runTypewriter = useCallback(() => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    
    setShowCursor(true);
    
    const line1 = lines[0];
    const line2 = lines[1];
    const baseSpeed = 60;
    let currentLine = 1;
    let currentChar = 0;
    
    const typeNext = () => {
      if (currentLine === 1) {
        if (currentChar < line1.length) {
          currentChar++;
          setLine1Chars(currentChar);
          const delay = baseSpeed + (Math.random() * 20 - 10);
          setTimeout(typeNext, delay);
        } else {
          // Move to line 2 after a brief pause
          currentLine = 2;
          currentChar = 0;
          setTimeout(typeNext, 180);
        }
      } else {
        if (currentChar < line2.length) {
          currentChar++;
          setLine2Chars(currentChar);
          const delay = baseSpeed + (Math.random() * 20 - 10);
          setTimeout(typeNext, delay);
        } else {
          // Complete
          setShowCursor(false);
          setIsComplete(true);
          onCompleteRef.current?.();
        }
      }
    };
    
    typeNext();
  }, [lines]);

  useEffect(() => {
    if (skipAnimation || !isActive) return;
    runTypewriter();
  }, [isActive, skipAnimation, runTypewriter]);

  // Determine which line the cursor is on
  const cursorOnLine1 = line1Chars < lines[0].length;
  const cursorOnLine2 = !cursorOnLine1 && line2Chars < lines[1].length;

  return (
    <span className="relative inline-block">
      {/* Line 1 - always rendered at full height */}
      <span className="block relative">
        {/* Invisible placeholder for stable width */}
        <span className="invisible" aria-hidden="true">{lines[0]}</span>
        {/* Visible typed text */}
        <span className="absolute inset-0">
          {lines[0].slice(0, line1Chars)}
          {showCursor && cursorOnLine1 && (
            <motion.span
              className="inline-block w-[2px] h-[0.7em] bg-primary/70 ml-0.5 align-middle rounded-sm"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </span>
      </span>
      
      {/* Line 2 - always rendered at full height */}
      <span className="block relative">
        {/* Invisible placeholder for stable width */}
        <span className="invisible" aria-hidden="true">{lines[1]}</span>
        {/* Visible typed text */}
        <span className="absolute inset-0">
          {lines[1].slice(0, line2Chars)}
          {showCursor && cursorOnLine2 && (
            <motion.span
              className="inline-block w-[2px] h-[0.7em] bg-primary/70 ml-0.5 align-middle rounded-sm"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </span>
      </span>
      
      {/* Blinking underline after completion */}
      {isComplete && (
        <motion.span
          className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent rounded-full"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ 
            opacity: 1,
            scaleX: 1 
          }}
          transition={{
            opacity: { duration: 0.4, ease: "easeOut" },
            scaleX: { duration: 0.5, ease: "easeOut" }
          }}
          style={{ transformOrigin: "left" }}
        >
          <motion.span
            className="block w-full h-full bg-accent rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.span>
      )}
    </span>
  );
};

export function HeroSection() {
  const { openScheduler } = useScheduling();
  const [typewriterActive, setTypewriterActive] = useState(false);
  const [typewriterDone, setTypewriterDone] = useState(false);
  const [showSubhead, setShowSubhead] = useState(false);
  const [showSupporting, setShowSupporting] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem(SESSION_KEY);
    if (hasPlayed) {
      setSkipAnimation(true);
      setTypewriterDone(true);
      setShowSubhead(true);
      setShowSupporting(true);
      setShowCTA(true);
    } else {
      // Start typewriter after container fades in
      const timer = setTimeout(() => setTypewriterActive(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleTypewriterComplete = () => {
    setTypewriterDone(true);
    sessionStorage.setItem(SESSION_KEY, "true");
    // Reveal subsequent elements
    setTimeout(() => setShowSubhead(true), 200);
  };

  useEffect(() => {
    if (showSubhead && !skipAnimation) {
      const timer = setTimeout(() => setShowSupporting(true), 400);
      return () => clearTimeout(timer);
    }
  }, [showSubhead, skipAnimation]);

  useEffect(() => {
    if (showSupporting && !skipAnimation) {
      const timer = setTimeout(() => setShowCTA(true), 300);
      return () => clearTimeout(timer);
    }
  }, [showSupporting, skipAnimation]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Hero background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 via-35% to-transparent" />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto px-6 lg:px-12 relative z-20 pt-20"
      >
        <div className="max-w-4xl">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: skipAnimation ? 0 : 0.3, duration: 0.5 }}
          >
            <span className="label-mono text-primary mb-6 block">
              AI Automation Agency
            </span>
          </motion.div>

          {/* Main headline - fixed two lines on all breakpoints */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: skipAnimation ? 0 : 0.4, duration: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[1.05]"
          >
            <Typewriter
              lines={[HEADLINE_LINE_1, HEADLINE_LINE_2]}
              isActive={typewriterActive || skipAnimation}
              onComplete={handleTypewriterComplete}
              skipAnimation={skipAnimation}
            />
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={showSubhead ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground font-light mb-3"
          >
            For Web3 and digital asset organizations.
          </motion.p>

          {/* Supporting line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={showSupporting ? { opacity: 0.7 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-mono text-xs md:text-sm text-primary mb-10"
          >
            Publishes. Engages. Converts. Follows up.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={showCTA ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <Button variant="hero" size="default" className="h-10 px-6 text-sm" onClick={openScheduler}>
              Book a strategy call
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: skipAnimation ? 0.5 : 2.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronDown className="w-4 h-4 scroll-indicator" />
        </a>
      </motion.div>

      {/* Connecting line */}
      <motion.div
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        transition={{ delay: skipAnimation ? 0.5 : 3, duration: 1, ease: "easeOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-primary/0 via-primary to-primary origin-top"
      />
    </section>
  );
}