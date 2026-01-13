import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const SESSION_KEY = "artinovate_typewriter_played";

interface TypewriterLineProps {
  text: string;
  isActive: boolean;
  onComplete?: () => void;
  skipAnimation?: boolean;
  showCursor?: boolean;
}

const TypewriterLine = ({
  text,
  isActive,
  onComplete,
  skipAnimation = false,
  showCursor = false,
}: TypewriterLineProps) => {
  const [displayedText, setDisplayedText] = useState(skipAnimation ? text : "");
  const [cursorVisible, setCursorVisible] = useState(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (skipAnimation || !isActive || hasCompletedRef.current) {
      if (skipAnimation) setDisplayedText(text);
      return;
    }

    setCursorVisible(true);
    let currentIndex = 0;
    const chars = text.split("");

    const typeNextChar = () => {
      if (currentIndex <= chars.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
        const baseSpeed = 80;
        const variance = Math.random() * 20 - 10;
        setTimeout(typeNextChar, baseSpeed + variance);
      } else {
        hasCompletedRef.current = true;
        setCursorVisible(false);
        onComplete?.();
      }
    };

    const startDelay = setTimeout(typeNextChar, 100);
    return () => clearTimeout(startDelay);
  }, [text, isActive, onComplete, skipAnimation]);

  return (
    <span className="relative">
      {/* Invisible text to reserve space */}
      <span className="invisible">{text}</span>
      {/* Visible typed text */}
      <span className="absolute inset-0">{displayedText}</span>
      {/* Cursor */}
      {showCursor && (
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
  );
};

export function HeroSection() {
  const [line1Active, setLine1Active] = useState(false);
  const [line1Done, setLine1Done] = useState(false);
  const [line2Active, setLine2Active] = useState(false);
  const [line2Done, setLine2Done] = useState(false);
  const [showSubhead, setShowSubhead] = useState(false);
  const [showSupporting, setShowSupporting] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem(SESSION_KEY);
    if (hasPlayed) {
      setSkipAnimation(true);
      setLine1Done(true);
      setLine2Done(true);
      setShowSubhead(true);
      setShowSupporting(true);
      setShowCTA(true);
    } else {
      // Start line 1 after container fades in
      const timer = setTimeout(() => setLine1Active(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLine1Complete = () => {
    setLine1Done(true);
    // Micro pause before line 2
    setTimeout(() => setLine2Active(true), 300);
  };

  const handleLine2Complete = () => {
    setLine2Done(true);
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
        <div className="max-w-3xl">
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

          {/* Main headline - fixed two-line lockup */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: skipAnimation ? 0 : 0.4, duration: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6 leading-[0.95]"
          >
            <span className="block">
              <TypewriterLine
                text="AI Powered"
                isActive={line1Active || skipAnimation}
                onComplete={handleLine1Complete}
                skipAnimation={skipAnimation}
                showCursor={!line1Done && line1Active}
              />
            </span>
            <span className="block">
              <TypewriterLine
                text="Websites"
                isActive={line2Active || skipAnimation}
                onComplete={handleLine2Complete}
                skipAnimation={skipAnimation}
                showCursor={!line2Done && line2Active}
              />
            </span>
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
            <Button variant="hero" size="default" className="h-10 px-6 text-sm">
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