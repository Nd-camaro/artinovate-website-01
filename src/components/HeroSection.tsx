import { useEffect, useState, useRef } from "react";
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
  const fullText = lines.join("\n");
  const [displayedText, setDisplayedText] = useState(skipAnimation ? fullText : "");
  const [cursorVisible, setCursorVisible] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (skipAnimation || !isActive || hasCompletedRef.current) {
      if (skipAnimation) setDisplayedText(fullText);
      return;
    }

    setCursorVisible(true);
    let currentIndex = 0;
    const chars = fullText.split("");

    const typeNextChar = () => {
      if (currentIndex <= chars.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
        
        // Pause slightly longer at line breaks
        const currentChar = chars[currentIndex - 1];
        const baseSpeed = 65;
        const variance = Math.random() * 15 - 7;
        const delay = currentChar === "\n" ? 250 : baseSpeed + variance;
        
        setTimeout(typeNextChar, delay);
      } else {
        hasCompletedRef.current = true;
        setCursorVisible(false);
        onComplete?.();
      }
    };

    const startDelay = setTimeout(typeNextChar, 100);
    return () => clearTimeout(startDelay);
  }, [fullText, isActive, onComplete, skipAnimation]);

  // Split displayed text back into lines
  const displayedLines = displayedText.split("\n");

  return (
    <span className="relative">
      {/* Invisible text to reserve exact space for each line */}
      {lines.map((line, idx) => (
        <span key={`reserve-${idx}`} className="block invisible" aria-hidden="true">
          {line}
        </span>
      ))}
      {/* Visible typed text overlay */}
      <span className="absolute inset-0">
        {displayedLines.map((line, idx) => (
          <span key={`typed-${idx}`} className="block">
            {line}
            {/* Cursor on the last line being typed */}
            {idx === displayedLines.length - 1 && (
              <motion.span
                className="inline-block w-[2px] h-[0.75em] bg-primary/80 ml-0.5 align-middle rounded-sm"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: cursorVisible ? [0.4, 0.8, 0.4] : 0,
                }}
                transition={
                  cursorVisible
                    ? { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
                    : { duration: 0.4, ease: "easeOut" }
                }
              />
            )}
          </span>
        ))}
      </span>
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
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={1080}
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